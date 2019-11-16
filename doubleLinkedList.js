class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  __str = () => {
    return `{${this.key}: ${this.value}}`;
  };
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
      this.head.prev = null;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
      this.head.prev = null;
    }

    this.size += 1;
    return node;
  }

  //* 从尾部添加
  __add_tail(node) {
    if (!this.tail) {
      this.head = node;
      this.tail = node;
      this.tail.next = null;
      this.head.prev = null;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
      this.tail.next = null;
    }

    this.size += 1;
    return node;
  }

  //* 删除头部节点
  __del_head() {
    if (!this.head) return;

    const node = this.head;
    if (node.next) {
      this.head = node.next;
      this.head.prev = null;
    } else {
      // 链表内只有一个节点
      this.tail = null;
      this.head = null;
    }
    this.size -= 1;
    return node;
  }

  //* 删除尾部节点
  __del_tail() {
    if (!this.tail) return;

    const node = this.tail;
    if (node.prev) {
      this.tail = node.prev;
      this.tail.next = null;
    } else {
      this.tail = null;
      this.head = null;
    }
    this.size -= 1;
    return node;
  }

  //* 删除链表内任意节点
  __remove(node) {
    // 如果没传参数，默认删除尾部节点
    if (!node) {
      node = this.tail;
    }

    if (node === this.tail) {
      this.__del_tail();
    } else if (node === this.head) {
      this.__del_head();
    } else {
      //* 删除的是中间节点
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    this.size -= 1;
    return node;
  }

  find(node) {
    let current = this.head;
    while (current !== node) {
      current = current.next;
    }
    return current;
  }

  //* 弹出头部节点
  pop() {
    return this.__del_head();
  }

  //* 往尾部添加节点
  push(node) {
    return this.__add_tail(node);
  }

  //* 往头部添加节点
  unshift(node) {
    return this.__add_head(node);
  }

  remove(node = null) {
    return this.__remove(node);
  }

  print() {
    let p = this.head;
    let line = '';
    while (p) {
      line += p.__str();
      p = p.next;
      if (p) { line += ' => '; }
    }
    console.log(line);
  }
}

const nodes = [new Node(1, 1), new Node(1, 2), new Node(1, 3), new Node(1, 4)];

const list = new DoubleLinkedList();

// list.__add_head(nodes[1]);
// list.print();
// list.__add_head(nodes[0]);
// list.print();
// list.__add_tail(nodes[2]);
// list.print();
// list.__add_tail(nodes[3]);
// list.print();

list.push(nodes[1]);
list.print();
list.unshift(nodes[0]);
list.print();
list.push(nodes[2]);
list.print();
list.push(nodes[3]);
list.print();
list.remove();
list.print();
list.pop();
list.print();
list.remove();
list.print();
