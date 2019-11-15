class Node {
  constructor(key,value) {
    this.key = key;
    this.value = value;
    this.prve = null;
    this.next = null;
  }

  __str = () => {
    return `{${this.key}: ${this.value}}`
  }
}

class DoubleLinkedList {
  constructor(capacity = 0xffff) {
    this.capacity = capacity;
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  //* 从头部添加
  __add_head(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      //* head 和 tail 页是Node类的实例
      this.tail.next = null;
      this.head.prve = null;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      this.head.prve = null;
    }

    this.size += 1;
    return node;
  }

  //* 从尾部添加
  __add_tail(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.tail.next = null;
      this.head.prve = null;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
      this.tail.next = null;
    }

    this.size += 1;
    return node;
  }

  find(node) {
    let current = this.head;
    while( current !== node ) {
      current = current.next;
    }
    return current;
  }
}

const nodes = [new Node(1,1), new Node(1,2), new Node(1,3), new Node(1,4)];

const list = new DoubleLinkedList();

list.__add_head(nodes[1]);
list.__add_head(nodes[0]);
list.__add_tail(nodes[2]);
list.__add_tail(nodes[3]);

// console.log(list)
// console.log(list.find(nodes[2]));
