/*
现有一个POST接口：https://xxx.com/students，每次请求只能返回10个学生的课程成绩，如下：
[
    { name: '张三', score: 99, time: '2021-12-22' },
    { name: '李四', score: 60, time: '2021-12-12' },
    { name: '王五', score: 77, time: '2021-11-08' },
    ...
]
该接口有一定概率请求失败，不可忽略，Response Status Code 500，Body为空
要求：
实现一个函数，总共需获得100个成绩大于90分，且时间在2021年12月03日之后的学生的课程成绩，并按各自成绩从大到小排列返回（可直接使用fetch 或axios）

提示：
浏览器最多可以有6个并行的网络请求
尽可能在更短的时间内，运行完成得到结果
尽可能用最少的请求次数
*/

/* 模拟数据请求的办法 */
const fetchStudents = function fetchStudents() {
  return new Promise((resolve) => {
    // 1. 用 AbortController 代替 axios 的 CancelToken
    const controller = new AbortController();
    const signal = controller.signal;

    // 2. 用 fetch 封装请求函数
    const query = async () => {
      const response = await fetch("https://xxx.com/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: null, // 接口 body 为空
        signal, // 绑定取消信号
      });
      // fetch 不会把 500 等状态视为异常，需要手动判断
      if (!response.ok) {
        throw new Error(`Status ${response.status}`);
      }
      return response.json();
    };

    let works = new Array(6).fill(null),
      values = [],
      flag = false;

    works.forEach(() => {
      const next = async () => {
        // 如果已经拿到足够数据，或者请求已被取消，直接退出
        if (flag || signal.aborted) return;

        if (values.length >= 100) {
          // 3. 按成绩从大到小排序（原代码缺少这一步）
          values.sort((a, b) => b.score - a.score);
          resolve(values.slice(0, 100));
          controller.abort(); // 取消还在进行中的请求
          flag = true;
          return;
        }

        try {
          let data = await query();
          data = data.filter((item) => {
            return (
              item.score >= 90 && new Date(item.time) > new Date("2021-12-03")
            );
          });
          values = values.concat(data);
        } catch (_) {
          // 忽略请求失败（500、网络错误、主动取消等）
          // 被取消时 fetch 会抛出 AbortError，这里一并忽略
        }
        next(); // 无论成功或失败，都继续尝试获取更多数据
      };
      next();
    });
  });
};
