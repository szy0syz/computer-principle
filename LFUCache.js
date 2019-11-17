const { Node, DoubleLinkedList } = require('./doubleLinkedList');

class LFUNode extends Node {
  constructor(key, value) {
    super(key, value);
    this.freq = 0;
  }
}

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;
    this.map = {};
    // 保存 key:频率  value:频率对应的双向链表
    this.freq_map = {}
  }

  // 更新节点频率的操作
  __update_freq(node) {
    let freq = node.freq;

    //* $删除操作：从对应频率map中提出对应节点
    node = this.freq_map[freq].remove(node);
    //* 如果提了以后对应链表为空，就删除链表
    if (this.freq_map[freq].size ===0) {
      delete this.freq_map[freq];
    }

    //* $更新操作
    freq += 1;
    node.freq = freq;
    if (!(freq in this.freq_map)) {
      //* 看频率map有没链表，没有就新建
      this.freq_map[freq] = new DoubleLinkedList()
    }
    this.freq_map[freq].push(node);
  }

  get(key) {
    if (!(key in this.map)) return -1;

    const node = this.map[key];
    this.__update_freq(node);
    return node.value;
  }

  put(key, value) {
    if (this.capacity === 0) return;

    //* 缓存命中
    if (key in this.map) {
      const node = this.map.get(key);
      node.value = value;
      this.__update_freq(node);
    } else {
      //* 缓存没命中
      //* 缓存满了没，没满直接新增
      if (this.capacity === this.size) {
        const min_freq = Math.min(...Object.keys(this.freq_map));
        const node = this.freq_map[min_freq].pop();
        delete this.map[node.key];
        this.size -= 1;
      }
      const node = new LFUNode(key, value);
      node.freq = 1;
      this.map[key] = node;
      //* 再次判断节点频率是否在频率映射表里，不在就创新新的双向链表
      if (!(node.freq in this.freq_map)) {
        this.freq_map[node.freq] = new DoubleLinkedList();
      }
      this.freq_map[node.freq].push(node);
      this.size += 1;
    }
  }

  print() {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
    for (const key in this.freq_map) {
      if (this.freq_map.hasOwnProperty(key)) {
        const value = this.freq_map[key];
        console.log('Freq =', key);
        this.freq_map[key].print();
      }
    }
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');
  }
}

// ~~~test~~~~
const cache = new LFUCache(2);
cache.put(1,1);
cache.print();
cache.put(2,2);
cache.print();
console.log(cache.get(1));
cache.print();
cache.put(3,3);
cache.print();
console.log(cache.get(2));
cache.print();
console.log(cache.get(3));
cache.print();
cache.put(4,4);
cache.print();
console.log(cache.get(1));
cache.print();
console.log(cache.get(3));
cache.print();
console.log(cache.get(4));
cache.print();
