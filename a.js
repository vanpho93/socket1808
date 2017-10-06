const that = this;

const person = {
    name: 'KP',
    age: 30,
    sayHello: function() {
        console.log(this.age);
    }
}

person.sayHello();
