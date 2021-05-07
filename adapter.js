"use strict";
/**
 * The Target defines the domain-specific interface used by the client code.
 */
class Car {
    request() {
        return 'Carro: solo puede andar en ciudad';
    }
}
/**
 * The Adaptee contains some useful behavior, but its interface is incompatible
 * with the existing client code. The Adaptee needs some adaptation before the
 * client code can use it.
 */
class Adaptee {
    specificRequest() {
        return 'subir el carro para adaptarlo que navegue en barco';
    }
}
/**
 * The Adapter makes the Adaptee's interface compatible with the Target's
 * interface.
 */
class Adapter extends Car {
    constructor(adaptee) {
        super();
        this.adaptee = adaptee;
    }
    request() {
        // const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: Carro adaptado `;
    }
}
/**
 * The client code supports all classes that follow the Target interface.
 */
function clientCode(target) {
    console.log(target.request());
}
console.log('Client: carro no puedo llevarlo por el mar');
const target = new Car();
clientCode(target);
console.log('');
const adaptee = new Adaptee();
console.log('Persona:  solución para llevar por mar');
console.log(`Adaptee: ${adaptee.specificRequest()}`);
console.log('');
console.log('Client:  subir el carro');
const adapter = new Adapter(adaptee);
clientCode(adapter);