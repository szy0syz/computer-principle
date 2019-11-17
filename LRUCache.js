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

  put(key, value) {
    //* 如果节点在缓存中
    if (key in this.map) {
      const node = this.map.get(key);
      this.list.remove(node);
      node.value = value;
      this.list.unshift(node);
    } else {
      const node = new Node(key, value);
      //* 先判断链表size是否已经满了
      if (this.list.size >= this.list.capacity) {
        const tail_node = this.list.remove();
        delete this.map[tail_node.key];
      }
      this.list.unshift(node);
      this.map[key] = node;
    }
  }

  print() {
    this.list.print();
  }
}

// ~~~test~~~
const cache = new LRUCache(2);
cache.put(2,2);
cache.print();
cache.put(1,1);
cache.print();
cache.put(3,3);
cache.print();
console.log(cache.get(1));
cache.print();
console.log(cache.get(2));
cache.print();
console.log(cache.get(3));
cache.print();

