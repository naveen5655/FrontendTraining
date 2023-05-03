'use strict';

/**
 * Class
 * @constructor
 * @param size - size of pizza
 * @param type - type of pizza
 * @throws {PizzaException} - in case of improper use
 */
 class Pizza{
    constructor(size,type){
        if(arguments.length !== 2){
            return new PizzaException(`Required two arguments, given: ${arguments.length}`);
        }
        if(!Pizza.allowedSizes.includes(size) || !Pizza.allowedTypes.includes(type)){
            return new PizzaException('Invalid Type');
        }
        this.extraIngredient = [];
        this.size = size.size;
        this.type = type.type;
        this.price = size.price + type.price;
    }
    addExtraIngredient(ingredient){
        if(arguments.length > 1){
            return new PizzaException('You can add only one ingredient per time');
        }
        if(!Pizza.allowedExtraIngredients.includes(ingredient)){
            return new PizzaException('Invalid Ingredient');
        }
        if(this.extraIngredient.includes(ingredient)){
            return new PizzaException('Duplicate Ingredient');
        }
        this.extraIngredient.push(ingredient);
    }
    removeExtraIngredient(ingredient){
        if(arguments.length > 1){
            return new PizzaException('You can remove only one ingredient per time');
        }
        if(!Pizza.allowedExtraIngredients.includes(ingredient)){
            return new PizzaException('You cannot remove that ingredient');
        }
        if(!this.extraIngredient.includes(ingredient)){
            return new PizzaException('You cannot remove the ingredient that was not added');
        }
        this.extraIngredient.splice(this.extraIngredient[ingredient],1);
    }
    getSize(){
        return `Size: ${this.size}`;
    }
    getPrice(){
        return this.extraIngredient.length
            ? this.extraIngredient.reduce((a, b) => a + b.price, 0) + this.price
            : this.price;
    }
    getPizzaInfo() {
        return `${this.getSize()}, type: ${this.type}; extra ingredients: ${this.extraIngredient
            .map(item => item.ingredient).join(',') || 'none'}; price: ${this.getPrice()} UAH`
    }
    getExtraIngredients(){
        return this.extraIngredient;
    } 

}

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = { size: 'SMALL', price: 25 };
Pizza.SIZE_M = { size: 'MEDIUM', price: 35 };
Pizza.SIZE_L = { size: 'LARGE', price: 50 };

Pizza.TYPE_VEGGIE = { type: 'VEGGIE', price: 25 };
Pizza.TYPE_MARGHERITA = { type: 'MARGHERITA', price: 30 };
Pizza.TYPE_PEPPERONI = { type: 'PEPPERONI', price: 35 };


Pizza.EXTRA_TOMATOES = { extra: 'TOMATOES', price: 4 };
Pizza.EXTRA_CHEESE = { extra: 'CHEESE', price: 3 };
Pizza.EXTRA_MEAT = { extra: 'MEAT', price: 5 };

/* Allowed properties */
Pizza.allowedSizes = [Pizza.SIZE_S, Pizza.SIZE_M, Pizza.SIZE_L];
Pizza.allowedTypes = [Pizza.TYPE_VEGGIE, Pizza.TYPE_MARGHERITA, Pizza.TYPE_PEPPERONI];
Pizza.allowedExtraIngredients = [Pizza.EXTRA_TOMATOES, Pizza.EXTRA_CHEESE, Pizza.EXTRA_MEAT];


/**
 * Provides information about an error while working with a pizza.
 * details are stored in the log property.
 * @constructor
 */
 class PizzaException {
    constructor(log){
        throw new Error(log);
    }
}


/* It should work */ 
// // small pizza, type: veggie
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// // add extra meat
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// // check price
// console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
// // check price
// console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH
// // check pizza size
// console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false
// // remove extra ingredient
// pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
// console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
// console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.

// examples of errors
// let pizza = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type

let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Duplicate ingredient

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_CORN); // => Invalid ingredient
