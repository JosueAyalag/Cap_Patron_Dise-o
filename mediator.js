"use strict";
/**
 * Concrete Mediators implement cooperative behavior by coordinating several
 * components.
 */
class ConcreteMediator {
    constructor(c1, c2) {
        this.component1 = c1;
        this.component1.setMediator(this);
        this.component2 = c2;
        this.component2.setMediator(this);
    }
    notify(sender, event) {
        if (event === 'A') {
            console.log('Mediator empieza operacion suma y sigue con la siguiente operacion');
            this.component2.doC();
        }
        if (event === 'D') {
            console.log('Mediator empieza con operacion dividir  y sigue con la siguiente operacion');
            this.component1.doB();
            this.component2.doC();
        }
    }
}
/**
 * The Base Component provides the basic functionality of storing a mediator's
 * instance inside component objects.
 */
class BaseComponent {
    constructor(mediator = null) {
        this.mediator = mediator;
    }
    setMediator(mediator) {
        this.mediator = mediator;
    }
}
/**
 * Concrete Components implement various functionality. They don't depend on
 * other components. They also don't depend on any concrete mediator classes.
 */
class Component1 extends BaseComponent {
    doA() {
        console.log('Component 1 suma dos numeros');
        this.mediator.notify(this, 'A');
    }
    doB() {
        console.log('Component 1 resta dos numeros');
        this.mediator.notify(this, 'B');
    }
}
class Component2 extends BaseComponent {
    doC() {
        console.log('Component 2 multiplica dos numeros');
        this.mediator.notify(this, 'C');
    }
    doD() {
        console.log('Component 2 divide dos numeros');
        this.mediator.notify(this, 'D');
    }
}
/**
 * The client code.
 */
const c1 = new Component1();
const c2 = new Component2();
const mediator = new ConcreteMediator(c1, c2);
console.log('Client activa operacion 1 .');
c1.doA();
console.log('');
console.log('Client activa operacion 2');
c2.doD();