// 模拟异步任务：传入延迟时间，返回延迟后的值
const mockTask = (delay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (delay === 1003) reject(delay);
      resolve(delay);
    }, delay);
  });

const tasks = [
  () => mockTask(1001),
  () => mockTask(1002),
  () => mockTask(1003),
  () => mockTask(1004),
  () => mockTask(1005),
];

const promiseLimit = async (tasks, limit) => {
  // 使用工作区来控制并发数量，几个limit就创建几个工作区
  // 每个工作区只能同时触发一个task，当task执行完后去任务中找任务来执行
  // 如果任务都执行完了就返回成功的promise
  // 记录取出的是哪个任务
  let index = 0;
  // 执行的结果
  let results = [];
  // 实现worker函数调用
  const worker = async () => {
    while (index < tasks.length) {
      let curIndex = index;
      let task = tasks[index];
      index++;
      let value = await task();
      results[curIndex] = value;
    }
  };
  // 工作区
  let workNum = Math.min(tasks.length, limit);
  // let works = Array.from({ length: workNum }, () => worker());
  // 面试中可以写下面的写法，方便记住，然后没问题后可以抽离出去
  let works = Array.from({ length: workNum }, async () => {
    while (index < tasks.length) {
      let curIndex = index;
      let task = tasks[index];
      index++;
      let value = await task();
      results[curIndex] = value;
    }
  });
  await Promise.all(works);
  return results;
};

promiseLimit(tasks, 2).then((result) => {
  console.log("并发执行完成", result);
});
