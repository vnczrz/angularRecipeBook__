import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //when ingredients are changed we emit next to send a new value 
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  
  //array of recipes
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5, 'qty'),
    new Ingredient('Oranges', 3, 'qty'),
    new Ingredient('Bananas', 2, 'qty'),
  ];

  constructor() { }

  ///get array of ingredients
  getIngredients() {
    //use slice to return ref
    return this.ingredients.slice();
  }

  ///getter func for single ingredient
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  //access ingredients array here in service and push recieved arg on to list
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient); 
    //emit event with ingredient[] value...shopping-list component has listener waiting for it
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    //possible solution is to loop through list of ingredients and call addingredient method each time
    for ( let ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
  }
    ///alt solution
    // //use spread operator which allows us to turn an array of elements into a list of elements '...'
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;

    //emit new value to observables
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    //delete items from array
    this.ingredients.splice(index, 1);

    //emit new value to observables
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  

}
