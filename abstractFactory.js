"use strict";
/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the Concrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 */
class Sillas {
    createProductA() {
        return new SillaModerna();
    }
    createProductB() {
        return new SillaVictoriana();
    }
}
/**
 * Each Concrete Factory has a corresponding product variant.
 */
class Sofas {
    createProductA() {
        return new SofaModerno();
    }
    createProductB() {
        return new SofaVictoriano();
    }
}
/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class SillaModerna {
    usefulFunctionA() {
        return 'Silla moderna';
    }
}
class SofaModerno {
    usefulFunctionA() {
        return 'sofa Moderno';
    }
}
/**
 * These Concrete Products are created by corresponding Concrete Factories.
 */
class SillaVictoriana {
    usefulFunctionB() {
        return 'Silla Victoriana';
    }
    /**
     * The variant, Product B1, is only able to work correctly with the variant,
     * Product A1. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     */
    anotherUsefulFunctionB(collaborator) {
        const result = collaborator.usefulFunctionA();
        return ` ${result}`;
    }
}
class SofaVictoriano {
    usefulFunctionB() {
        return 'Sofa Victoriano';
    }
    /**
     * The variant, Product B2, is only able to work correctly with the variant,
     * Product A2. Nevertheless, it accepts any instance of AbstractProductA as
     * an argument.
     */
    anotherUsefulFunctionB(collaborator) {
        const result = collaborator.usefulFunctionA();
        return ` ${result}`;
    }
}
/**
 * The client code works with factories and products only through abstract
 * types: AbstractFactory and AbstractProduct. This lets you pass any factory or
 * product subclass to the client code without breaking it.
 */
function clientCode(factory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();
    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}
/**
 * The client code can work with any concrete factory class.
 */
console.log('Familia de sillas');
clientCode(new Sillas());
console.log('');
console.log('Familia de sofas');
clientCode(new Sofas());