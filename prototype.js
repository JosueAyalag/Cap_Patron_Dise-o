"use strict";
/**
 * The example class that has cloning ability. We'll see how the values of field
 * with different types will be cloned.
 */
class Prototype {
    clone() {
        const clone = Object.create(this);
        clone.component = Object.create(this.component);
        // Cloning an object that has a nested object with backreference
        // requires special treatment. After the cloning is completed, the
        // nested object should point to the cloned object, instead of the
        // original object. Spread operator can be handy for this case.
        clone.circularReference = Object.assign(Object.assign({}, this.circularReference),
         { prototype: Object.assign({}, this) });
        return clone;
    }
}
class ComponentWithBackReference {
    constructor(prototype) {
        this.prototype = prototype;
    }
}
/**
 * The client code.
 */
function clientCode() {
    const pizza = new Prototype();
    pizza.primitive = 245;
    pizza.component = new Date();
    pizza.circularReference = new ComponentWithBackReference(pizza);
    const pizzaclone = pizza.clone();
    if (pizza.primitive === pizzaclone.primitive) {
        console.log('Pizza original');
    }
    else {
        console.log('Pizza original no ha sido clonada');
    }
    if (pizza.component === pizzaclone.component) {
        console.log('No se han clonado los ingredientes');
    }
    else {
        console.log('Se clonaron los ingredientes de pizza');
    }
    if (pizza.circularReference === pizzaclone.circularReference) {
        console.log('No se ha clonado el ingrediente importante');
    }
    else {
        console.log('Se ha clonado el ingrediente importante');
    }
    if (pizza.circularReference.prototype === pizzaclone.circularReference.prototype) {
        console.log('El ingrediente clonado esta vinculado con la pizza original');
    }
    else {
        console.log('El ingrediente clonado esta vinculado a la pizza clonada');
    }
}
clientCode();