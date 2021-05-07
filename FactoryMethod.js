"use strict";
/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
class Creator {
    /**
     * Also note that, despite its name, the Creator's primary responsibility is
     * not creating products. Usually, it contains some core business logic that
     * relies on Product objects, returned by the factory method. Subclasses can
     * indirectly change that business logic by overriding the factory method
     * and returning a different type of product from it.
     */
    someOperation() {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        return `Transporte ${product.operation()}`;
    }
}
/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class terrestre extends Creator {
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     */
    factoryMethod() {
        return new Truck();
    }
}
class Maritimo extends Creator {
    factoryMethod() {
        return new Ship();
    }
}
class Aereo extends Creator {
    factoryMethod() {
        return new Airplane();
    }
}
/**
 * Concrete Products provide various implementations of the Product interface.
 */
class Truck {
    operation() {
        return '{Truck}';
    }
}
class Ship {
    operation() {
        return '{Ship}';
    }
}
class Airplane {
    operation() {
        return '{Airplane}';
    }
}
/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 */
function clientCode(creator) {
    // ...
    // console.log('Client: ');
    console.log(creator.someOperation());
    // ...
}
/**
 * The Application picks a creator's type depending on the configuration or
 * environment.
 */
console.log('App: enviado por terrestre');
clientCode(new terrestre());
console.log('');
console.log('App: enviado por Mar');
clientCode(new Maritimo());
console.log('');
console.log('App: enivado Aereo');
clientCode(new Aereo());