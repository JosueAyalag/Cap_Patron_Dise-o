"use strict";
/**
 * The Originator holds some important state that may change over time. It also
 * defines a method for saving the state inside a memento and another method for
 * restoring the state from it.
 */
class Originator {
    constructor(state) {
        this.state = state;
        console.log(`Originator: version de software 1.0`);
    }
    /**
     * The Originator's business logic may affect its internal state. Therefore,
     * the client should backup the state before launching methods of the
     * business logic via the save() method.
     */
    doSomething() {
        console.log('Originator: Estoy realizando cambios importantes');
        this.state = this.generateRandomString(30);
        console.log(`Originator: mi version cambio a : ${this.state}`);
    }
    generateRandomString(length = 10) {
        const charSet = '12345678910';
        return Array
            .apply(null, { length })
            .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
            .join('');
    }
    /**
     * Saves the current state inside a memento.
     */
    save() {
        return new ConcreteMemento(this.state);
    }
    /**
     * Restores the Originator's state from a memento object.
     */
    restore(memento) {
        this.state = memento.getState();
        console.log(`Originator: Mi version es:  ${this.state}`);
    }
}
/**
 * The Concrete Memento contains the infrastructure for storing the Originator's
 * state.
 */
class ConcreteMemento {
    constructor(state) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    /**
     * The Originator uses this method when restoring its state.
     */
    getState() {
        return this.state;
    }
    /**
     * The rest of the methods are used by the Caretaker to display metadata.
     */
    getName() {
        return `${this.date} / (${this.state.substr(0, 9)}...)`;
    }
    getDate() {
        return this.date;
    }
}
/**
 * The Caretaker doesn't depend on the Concrete Memento class. Therefore, it
 * doesn't have access to the originator's state, stored inside the memento. It
 * works with all mementos via the base Memento interface.
 */
class Caretaker {
    constructor(originator) {
        this.mementos = [];
        this.originator = originator;
    }
    backup() {
        console.log('\nCaretake: Guardando version...');
        this.mementos.push(this.originator.save());
    }
    undo() {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();
        console.log(`Caretaker: Restaurando: ${memento.getName()}`);
        this.originator.restore(memento);
    }
    showHistory() {
        console.log('Caretaker: lista de copias guardadas');
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}
/**
 * Client code.
 */
const originator = new Originator('Super-duper-super-puper-super.');
const caretaker = new Caretaker(originator);
caretaker.backup();
originator.doSomething();
caretaker.backup();
originator.doSomething();
caretaker.backup();
originator.doSomething();
console.log('');
caretaker.showHistory();
console.log('\nClient: regresar a otra version');
caretaker.undo();
console.log('\nClient: una mas\n');
caretaker.undo();
