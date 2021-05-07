"use strict";
/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Singleton {
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    constructor() { }
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    someBusinessLogic() {
        // ...
    }
}
/**
 * The client code.
 */
function hermanos() {
    const gemelo1 = Singleton.getInstance();
    const gemelo2 = Singleton.getInstance();
    if (gemelo1 === gemelo2) {
        console.log('Los hermanos tienen los mismos rasgos faciales');
    }
    else {
        console.log('los hermanos tienen diferentes rasgos faciales');
    }
}
hermanos();


