// 模拟异步任务：传入延迟时间，返回延迟后的值
const mockTask = (delay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // if (delay === 1003) reject(delay);
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

// 使用计数来实现
// 初始化时创建limit个任务执行，然后在任务执行的过程中去监测是否有任务完成，有的话就继续取任务出来执行
// 执行任务的时候将计数+1，执行完之后将计数-1
// 判断是否所有的数据都取出来执行完毕（使用index来和任务长度比较）
// 最后需要增加一个promise作为判断依据，然后把resolve暴露出去，这样能够在结束条件（队列取光了并且正在执行的任务为0）的时候resolve
class TaskSchedule {
  constructor(tasks, limit) {
    // 保存传递进来的数据
    this.tasks = tasks;
    this.limit = limit;
    // 计数，不超过 limit
    this.count = 0;
    // 每次取的task的位置
    this.index = 0;
    // 存放最后的结果
    this.results = [];
    // 使用promise来记录最终的完成
    this.resolve = null;
    this.promise = new Promise((resolve) => (this.resolve = resolve));
  }
  // 触发初始执行
  run() {
    // 启动 limit 个并发
    for (let i = 0; i < this.limit; i++) {
      this.next();
    }
  }
  async next() {
    // 若已完成所有任务且无进行中的任务，则 resolve
    if (this.count === 0 && this.index >= this.tasks.length) {
      this.resolve(this.results);
      return;
    }
    // 满足当前并发的数量不超过limit并且队列中还有值
    if (this.count < this.limit && this.index < this.tasks.length) {
      this.count++;
      let task = this.tasks[this.index];
      let curIndex = this.index;
      this.index++;
      let result = await task();
      this.results[curIndex] = result;
      // 执行完毕之后将count--
      this.count--;
      // 然后再继续执行next
      this.next();
    }
  }
}

class TaskSchedule1 {
  constructor(tasks, limit) {
    this.tasks = tasks;
    this.limit = limit;
    this.results = [];
    this.index = 0;
    this.running = 0;
    this.resolve = null;
    this.promise = new Promise((resolve) => (this.resolve = resolve));
  }
  run() {
    for (let i = 0; i < this.limit; i++) {
      this.next();
    }
  }
  async next() {
    if (this.index >= this.tasks.length && this.running === 0) {
      this.resolve(this.results);
      return;
    }
    if (this.index < this.tasks.length && this.running < this.limit) {
      this.running++;
      let task = this.tasks[this.index];
      let curIndex = this.index;
      this.index++;
      try {
        let value = await task();
        this.results[curIndex] = value;
      } catch (_) {
        this.results[curIndex] = null;
      }
      this.running--;
      this.next();
    }
  }
}

const promiseLimit = (tasks, limit) => {
  let schedule = new TaskSchedule(tasks, limit);
  schedule.run();
  return schedule.promise;
};

promiseLimit(tasks, 1).then((result) => {
  console.log("并发执行完成", result);
});
