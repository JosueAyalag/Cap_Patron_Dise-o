"use strict";
/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 */
class ConcreteBuilder1 {
    /**
     * A fresh builder instance should contain a blank product object, which is
     * used in further assembly.
     */
    constructor() {
        this.reset();
    }
    reset() {
        this.product = new Product1();
    }
    /**
     * All production steps work with the same product instance.
     */
    Garage() {
        this.product.parts.push('Garage');
    }
    Piscina() {
        this.product.parts.push('Piscina');
    }
    Arboles() {
        this.product.parts.push('Arboles');
    }
    /**
     * Concrete Builders are supposed to provide their own methods for
     * retrieving results. That's because various types of builders may create
     * entirely different products that don't follow the same interface.
     * Therefore, such methods cannot be declared in the base Builder interface
     * (at least in a statically typed programming language).
     *
     * Usually, after returning the end result to the client, a builder instance
     * is expected to be ready to start producing another product. That's why
     * it's a usual practice to call the reset method at the end of the
     * `getProduct` method body. However, this behavior is not mandatory, and
     * you can make your builders wait for an explicit reset call from the
     * client code before disposing of the previous result.
     */
    getProduct() {
        const result = this.product;
        this.reset();
        return result;
    }
}
/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 */
class Product1 {
    constructor() {
        this.parts = [];
    }
    listParts() {
        console.log(`Partes de casa: ${this.parts.join(', ')}\n`);
    }
}
/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 */
class Director {
    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     */
    setBuilder(builder) {
        this.builder = builder;
    }
    /**
     * The Director can construct several product variations using the same
     * building steps.
     */
    buildMinimalViableProduct() {
        this.builder.Garage();
    }
    buildFullFeaturedProduct() {
        this.builder.Garage();
        this.builder.Piscina();
        this.builder.Arboles();
    }
}
/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */
function clientCode(director) {
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);
    console.log('Casa Tradicional');
    director.buildMinimalViableProduct();
    builder.getProduct().listParts();
    console.log('Casa completa');
    director.buildFullFeaturedProduct();
    builder.getProduct().listParts();
    // Remember, the Builder pattern can be used without a Director class.
    console.log('Casa personalizada');
    builder.Garage();
    builder.Arboles();
    builder.getProduct().listParts();
}
const director = new Director();
clientCode(director);