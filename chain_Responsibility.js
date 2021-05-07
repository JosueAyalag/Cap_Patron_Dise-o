"use strict";
/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
class AbstractHandler {
    setNext(handler) {
        this.nextHandler = handler;
        // Returning a handler from here will let us link handlers in a
        // convenient way like this:
        // monkey.setNext(squirrel).setNext(dog);
        return handler;
    }
    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}
/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
class Alumno1 extends AbstractHandler {
    handle(request) {
        if (request === 'suma') {
            return `Alumno1: yo hago la  ${request}.`;
        }
        return super.handle(request);
    }
}
class Alumno2 extends AbstractHandler {
    handle(request) {
        if (request === 'resta') {
            return `Alumno2: yo hago la suma ${request}.`;
        }
        return super.handle(request);
    }
}
class Alumno3 extends AbstractHandler {
    handle(request) {
        if (request === 'division') {
            return `Alumno3: yo hago la division ${request}.`;
        }
        return super.handle(request);
    }
}
/**
 * The client code is usually suited to work with a single handler. In most
 * cases, it is not even aware that the handler is part of a chain.
 */
function clientCode(handler) {
    const operaciones = ['suma', 'resta', 'dividir'];
    for (const operacion of operaciones) {
        console.log(`Client: Quien me ayuda a resolver esta ${operacion}?`);
        const result = handler.handle(operacion);
        if (result) {
            console.log(`  ${result}`);
        }
        else {
            console.log(`  ${operacion} se dejo pasar.`);
        }
    }
}
/**
 * The other part of the client code constructs the actual chain.
 */
const alumno1 = new Alumno1();
const alumno2 = new Alumno2();
const alumno3 = new Alumno3();
alumno1.setNext(alumno2).setNext(alumno3);
/**
 * The client should be able to send a request to any handler, not just the
 * first one in the chain.
 */
console.log('Chain: Realizar operaciones aritmetica\n');
clientCode(alumno1);
console.log('');
console.log('Subchain: Realizar operaciones aritmetica\n');
clientCode(alumno2);