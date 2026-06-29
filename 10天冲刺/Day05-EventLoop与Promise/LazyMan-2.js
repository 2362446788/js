/*
  实现一个LazyMan，可以按照以下方式调用:
    LazyMan(“Hank”)输出:
    Hi! This is Hank!

    LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
    Hi! This is Hank!
    //等待10秒..
    Wake up after 10
    Eat dinner~

    LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
    Hi This is Hank!
    Eat dinner~
    Eat supper~

    LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
    //等待5秒
    Wake up after 5
    Hi This is Hank!
    Eat supper
 */
// 思路：
// 1. 使用一个队列来保存每次执行的函数
// 2. 每一个函数都需要返回 this，才能实现链式调用
// 3. sleep 的话需要做到使用 promise 结合 settimeout 来实现
// 4. 如何触发队列里面的任务呢？
//    4-1. 可以在每次执行任务的时候去触发下一次任务执行
//    4-2（当前实现）. 也可以在任务都加入到队列中后，使用递归调用一次性清空队列
//      想要一次性清空队列，还能够暂停执行，只有通过 promise 来处理，因此 sleep 需要返回 promise

class _LazyMan {
  constructor(name) {
    // 队列保存每次的任务
    this.queue = [];
    // 初始化的时候也需要添加一个任务，打印当前名字
    this.push(() => {
      console.log(`Hi This is ${name}!`);
    });
    // 清空队列
    // 使用每次执行任务然后触发下一个任务执行
    queueMicrotask(() => {
      this.run();
    });
  }
  run() {
    // 递归调用队列中的数据
    // 递归到哪一项
    let index = 0;
    let next = async () => {
      // 递归出口
      if (index >= this.queue.length) return;
      // 获取一项后将index++指向下一项
      let task = this.queue[index++];
      // 因为sleep返回的是promise，因此可以使用promise的then方法
      // let promise = task();
      // Promise.resolve(promise).then(() => {
      //   // 上一个 promise 成功后继续递归调用下一个
      //   next();
      // });
      // 使用 await 更方便
      await task();
      next();
    };
    next();
  }
  eat(food) {
    this.push(() => {
      console.log(`Eat ${food}`);
    });
    // 返回this才能进行链式调用
    return this;
  }
  sleep(time) {
    this.push(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${time}`);
          resolve();
        }, time * 1000);
      });
    });
    return this;
  }
  sleepFirst(time) {
    this.unshift(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${time}`);
          resolve();
        }, time * 1000);
      });
    });
    return this;
  }
  // 往队首添加任务
  unshift(task) {
    this.queue.unshift(task);
  }
  // 往队列末尾添加任务
  push(task) {
    this.queue.push(task);
  }
}

const LazyMan = (name) => {
  return new _LazyMan(name);
};

// LazyMan("Hank");
LazyMan("Hank").sleep(2).eat("dinner");
// LazyMan("Hank").eat("dinner").eat("supper");
// LazyMan("Hank").eat("dinner").sleepFirst(2);
