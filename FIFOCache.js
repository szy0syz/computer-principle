const { Node, DoubleLinkedList } = require('./doubleLinkedList');

class FIFOCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.map = {}; //* 保存key和node的关系
    this.list = new DoubleLinkedList(this.capacity);
  }

  get(key) {
    if (!(key in this.map)) {
      return -1;
    } else {
      const node = this.map[key];
      return node.value;
    }
  }

  put(key, value) {
    // 这个缓存没用容量，不能缓存东西
    if (this.capacity === 0) return;
    // 判断key是否已在缓存中
    if (key in this.map) {
      const node = this.map[key];
      this.list.remove(node);
      node.value = value;
      this.list.push(node);
    } else {
      //* 默认淘汰最先进入列表的节点
      // 如果key不在缓存中，先判断缓存是否已满
      if (this.size === this.capacity) {
        // 如果已满，先弹出头部节点
        const node = this.list.pop();
        // 从对象中删除属性
        delete this.map[`${node.key}`];
        this.size -= 1;
      }
      // 可以开始新增节点
      const node = new Node(key, value);
      this.list.push(node);
      this.map[key] = node;
      this.size += 1;
    }
  }

  print() {
    this.list.print();
  }
}

const cache = new FIFOCache(2);
cache.put(1, 1);
cache.print();
cache.put(2, 2);
cache.print();
console.log(cache.get(1)); // => 1
cache.put(3, 3);
cache.print();
console.log(cache.get(2));
cache.put(4, 4);
cache.print();
console.log(cache.get(1));
