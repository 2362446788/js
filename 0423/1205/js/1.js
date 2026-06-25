/*
 在内置类原型上自定义（或扩展）属性方法，供其实例调取使用
   [优势]
   + 操作起来更贴近于“原生”的操作  例如：arr.unique() 而不是之前的 unique(arr)
   + 方法中的this一般都是当前类的实例，直接去操作即可(不需要额外判断数据的类型)
   + 可以实现链式写法：方法执行完返回的结果，“依然是当前类的实例”，这样就可以继续调用其它的方法进行操作了
   + ...
   [特殊]
   + 我们自己扩展的方法，最好设置前缀，例如：myXxx，这样可以防止自己写的方法覆盖了内置的属性方法，导致不可控的BUG
 */

/* Array.prototype.myUnique = function myUnique() {
    // this->实例arr
    return Array.from(new Set(this));
};
let arr = [1, 3, 2, 3, 2, 1, 2, 3, 4, 5, 2, 1, 2, 3, 4, 5];
arr = arr.myUnique().sort((a, b) => a - b);
console.log(arr); */

/* const unique = function unique(arr) {
    // 首先应该校验传递arr值，类型的合法性
    return Array.from(new Set(arr));
};
let arr = [1, 3, 2, 3, 2, 1, 2, 3, 4, 5, 2, 1, 2, 3, 4, 5];
arr = unique(arr);
arr.sort((a, b) => a - b);
console.log(arr); */

//=========================
// Object.prototype.hasOwnProperty：用来检测是否为私有属性  
//   语法：[对象].hasOwnProperty([属性])
//   检测[属性]是否为[对象]的私有属性，是返回TRUE，不是则返回FALSE；只看私有中有没有(和公有是否存在没关系)；

// in操作符
//   语法：[属性] in [对象]
//   检测[属性]是否率属于这个[对象]，不论公有还是私有，只要能访问到这个属性，则结果就是TRUE

/* // 面试题：在Object.prototype.hasPubProperty，用户来检测当前属性是否为对象的公有属性（无关私有中是否存在）
Object.prototype.hasPubProperty = function hasPubProperty(attr) {
    // this->obj要处理的对象  attr->'toString'要检测的属性
    // 思路：跳过私有属性的查找，直接在公有属性中查找，看看是否存在
    // Object.getPrototypeOf([实例对象])：获取当前实例对象的原型对象(或者获取“实例对象.__proto__”)
    let proto = Object.getPrototypeOf(this);
    while (proto) {
        if (proto.hasOwnProperty(attr)) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
    /!* // 思路：是对象的属性，而且还不是私有的属性，这样只能是公有属性了
    // 问题：如果attr即是私有的属性，也是公有的属性，基于这种方案检测结果是false
    return (attr in this) && !this.hasOwnProperty(attr); *!/
};
let obj = {
    name: 'zhufeng',
    age: 13,
    toString() { }
};
console.log(obj.hasPubProperty('toString')); //true */


/* // 私有属性还是公有属性本身就是相对的概念：自己堆内存中的是私有属性，基于__proto__查找的是“相对自己”公有属性
let arr = [10, 20];
// arr.push(30); //arr首先找自己私有的属性，发现没有push方法，则默认基于__proto__去Array.prototype上找；所以它是找到Array.prototype.push方法，把其执行「this->arr 实参->30」；而push方法执行的作用，就是给arr(this)的末尾追加新的内容30，并且让数组长度累加1，返回新增后数组长度！！
console.log(arr.hasOwnProperty('push')); //false
console.log(Array.prototype.hasOwnProperty('push')); //true
console.log('push' in arr); //true */


//=========================
// 基于Class语法，设置的原型上的公共方法（或者静态私有方法）都是不可枚举的属性；但是基于 xxx=xxx 这种写法，设置的属性是可枚举的；
// 基于Class语法创造的构造函数，是不能当做普通函数执行的 Uncaught TypeError: Class constructor Modal cannot be invoked without 'new'
class Modal {
    // 构造函数体：两种写法都是给实例设置私有的属性方法
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.sum = function () { };
    }
    z = 10;
    sum = () => { };

    // 在原型对象上设置供实例调用的“公共方法”「基于Class语法，无法向原型上直接设置公有属性」
    getX() { console.log(this.x); }
    getY() { console.log(this.y); }

    // 把其作为普通对象，设置静态私有属性方法
    static n = 200;
    static setNumber(n) { this.n += n; }
}
// 向原型扩展公共属性
Modal.prototype.name = "zhufeng";

let m = new Modal(10, 20);
console.log(m);

/* function Modal(x, y) {
    // 构造函数体 this->实例
    // 这里是给实例设置的私有属性方法
    this.x = x;
    this.y = y;
}
//把Modal作为构造函数，在其原型对象上设置供实例调用的公共属性方法
Modal.prototype.z = 10;
Modal.prototype.getX = function () {
    console.log(this.x);
}
Modal.prototype.getY = function () {
    console.log(this.y);
}
//把Modal作为普通对象，设置的静态私有属性方法
Modal.n = 200;
Modal.setNumber = function (n) {
    this.n = n;
};
let m = new Model(10, 20); */