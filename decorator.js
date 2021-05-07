"use strict";
/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
class ConcreteComponent {
    operation() {
        return 'soy un mensaje de texto';
    }
}
/**
 * The base Decorator class follows the same interface as the other components.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped component and the means to initialize
 * it.
 */
class Decorator {
    constructor(component) {
        this.component = component;
    }
    /**
     * The Decorator delegates all work to the wrapped component.
     */
    operation() {
        return this.component.operation();
    }
}
/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class mensajeTexto extends Decorator {
    /**
     * Decorators may call parent implementation of the operation, instead of
     * calling the wrapped object directly. This approach simplifies extension
     * of decorator classes.
     */
    operation() {
        return `soy una imagen(${super.operation()})`;
    }
}
/**
 * Decorators can execute their behavior either before or after the call to a
 * wrapped object.
 */
class mensajeTexto2 extends Decorator {
    operation() {
        return `soy un emoji(${super.operation()})`;
    }
}
/**
 * The client code works with all objects using the Component interface. This
 * way it can stay independent of the concrete classes of components it works
 * with.
 */
function clientCode(component) {
    // ...
    console.log(`RESULT: ${component.operation()}`);
    // ...
}
/**
 * This way the client code can support both simple components...
 */
const simple = new ConcreteComponent();
console.log('Soy un mensaje de texto');
clientCode(simple);
console.log('');
/**
 * ...as well as decorated ones.
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 */
const decorator1 = new mensajeTexto(simple);
const decorator2 = new mensajeTexto2(decorator1);
console.log('ahora soy un mensaje de texto pero decorado');
clientCode(decorator2);
