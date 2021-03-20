/**
 * @constructor
 * @desc Queue 队列，支持最大并发数配置
 * @params {Object} opts 配置项
 *          limit  最大并发数
 */
class Queue {
  constructor(opts = {}) {
    const { limit } = opts;
    this._queue = []; // 队列数组
    this._conut = 0; // 记录出队执行中数量
    this.limit = limit || undefined;
  }

  /**
   * @des 入队
   * @param {Array<Function> | Function} elements 入队任务,函数数组 或 单一函数
   */
  enqueue(elements) {
    if (!Array.isArray(elements)) elements = [elements];
    while (elements.length) {
      const element = elements.shift();
      this._queue.push(async () => {
        this._conut++;
        await element();
        this._conut--;
        this.dequeue();
      });
    }
    this.dequeue();
  }
  // 出队
  dequeue() {
    // 空队列 或达到最大限制数返回
    // console.log(this._conut === this.limit);
    if (this._conut === this.limit || this.isEmpty()) return;

    // 执行出队任务
    this._queue.shift()();
    this.dequeue();
  }
  // 清空队列
  clear() {
    this._queue = [];
  }
  // 队列是否为空
  isEmpty() {
    return this._queue.length === 0;
  }
  // 当前队列长度
  size() {
    return this._queue.length;
  }
}

let fn1 = async () => {
  console.log("fn1::::::");
  await new Promise((res, rej) => {
    setTimeout(res, 5000, "p1--resolve");
  }).then((res) => {
    console.log(res);
  });
};
let fn2 = async () => {
  console.log("fn2::::::");
  await new Promise((res, rej) => {
    setTimeout(res, 5000, "p2--resolve");
  }).then((res) => {
    console.log(res);
  });
};
let fn3 = async () => {
  console.log("fn3::::::");
  await new Promise((res, rej) => {
    setTimeout(res, 5000, "p3--resolve");
  }).then((res) => {
    console.log(res);
  });
};
let fn4 = async () => {
  console.log("fn4:::::::::::::");
  await new Promise((res, rej) => {
    setTimeout(res, 5000, "p4--resolve");
  }).then((res) => {
    console.log(res);
  });
};
let fn5 = async () => {
  console.log("fn5::::::");
  await new Promise((res, rej) => {
    setTimeout(res, 5000, "p5--resolve");
  }).then((res) => {
    console.log(res);
  });
};
let fn6 = async () => {
  console.log("fn6:::::::::");
  await new Promise((res, rej) => {
    setTimeout(res, 5000, "p6--resolve");
  }).then((res) => {
    console.log(res);
  });
};

let que = new Queue({ limit: 3 });
que.enqueue([fn1, fn2, fn3, fn4, fn5, fn6]);
