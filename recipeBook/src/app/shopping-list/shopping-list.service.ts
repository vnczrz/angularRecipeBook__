import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //when ingredients are changed we emit an event with an ARRAY of ingredients
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  //array of recipes
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5, 'qty'),
    new Ingredient('Oranges', 3, 'qty'),
    new Ingredient('Bananas', 2, 'qty'),
  ];

  constructor() { }

  getIngredients() {
    //use slice to return ref
    return this.ingredients.slice();
  }

  //access ingredients array here in service and push recieved arg on to list
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient); 
    //emit event with ingredient[] value...shopping-list component has listener waiting for it
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    //possible solution is to loop through list of ingredients and call addingredient method each time
    for ( let ingredient of ingredients) {
      this.addIngredient(ingredient);
    }

    ///alt solution
    // //use spread operator which allows us to turn an array of elements into a list of elements '...'
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());

  }

}
