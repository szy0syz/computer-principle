const { Node, DoubleLinkedList } = require('./doubleLinkedList');

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = {};
    this.list = new DoubleLinkedList(this.capacity);
  }

  get(key) {
    //* 如果key在缓存中，将它搬运到链表头
    if (key in this.map) {
      const node = this.map[key];
      this.list.remove(node);
      this.list.unshift(node);
      return node.value;
    } else {
      return -1;
    }
  }
}
