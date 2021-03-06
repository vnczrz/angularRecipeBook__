import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

//import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  //property for cross app coms to provide selected recipe, subject 
  //recipeSelected = new Subject<Recipe>();

  //subject that will emit new observable when we change the array of recipes
  recipesChanged = new Subject<Recipe[]>();


  //manage recipes here in service
  //array of recipes
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Broccoli Pesto Pasta', 
  //     'Bright broccoli pesto pasta that’s as healthy as it is delicious.', 
  //     'https://images.themodernproper.com/billowy-turkey/production/posts/Broccoli-Pesto-Pasta-5.jpg?w=1800&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1599766610&s=81a79cf2b1e96c983fce8164d3c45705',
  //     [
  //       new Ingredient('Cooked pasta of your choice, pasta water reserved', 1, 'lb'),
  //       new Ingredient('Broccoli Florets', 4, 'cups'),
  //       new Ingredient('Basil leaves, lightly packed', 2, 'cups'),
  //       new Ingredient('Garlic Cloves', 2, 'qty'),
  //       new Ingredient('Pine Nuts', .25, 'cup'),
  //       new Ingredient('Extra virgin olive oil', 1, 'cup'),
  //       new Ingredient('Salt', .5, 'tsp'),
  //       new Ingredient('Parmigiano-reggiano, grated', 1, 'cup')
  //     ]),
  //   new Recipe(
  //     'Lemon Chicken', 
  //     'Our easy lemon chicken recipe shines with a sunny, lemony zing. Garlic and herbs—plus a glug of white wine—mean that these juicy, tender chicken breasts are as delicious as they are healthy.', 
  //     'https://images.themodernproper.com/billowy-turkey/production/posts/2019/Lemon-Chicken-5.jpg?w=1800&auto=compress%2Cformat&fit=crop&fp-x=0.5&fp-y=0.5&dm=1599769356&s=a9b28b40c644bf769b7a1e0905a70a3b', 
  //     [
  //       new Ingredient('Boneless chicken breasts (roughly 2.5 lbs)', 4, 'qty'),
  //       new Ingredient('Olive Oil', 2, 'cups'),
  //       new Ingredient('Oregano, dried', 2, 'tsp'),
  //       new Ingredient('Thyme, dried', 2, 'tsp'),
  //       new Ingredient('Garlic Powder', 2, 'tsp'),
  //       new Ingredient('Salt, divided', 2, 'tsp'),
  //       new Ingredient('Black Pepper', .5, 'tsp'),
  //       new Ingredient('Dry White Wine', .5, 'cup'),
  //       new Ingredient('Minced Garlic(6 cloves)', 2, 'tbsp'),
  //       new Ingredient('Lemon Zest', 1, 'tbsp'),
  //       new Ingredient('Lemon Juice', 2, 'tbsp'),
  //       new Ingredient('Brown Sugar', 1, 'tbsp')
  //     ])
  // ];

  private recipes: Recipe[] = []

  constructor( private shoppingListService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    //make sure to call subject to inform all interested components we have made a change
    this.recipesChanged.next(this.recipes.slice());
  }

  //return array of recipes
  getRecipes(){
    //use .slice() to return a copy of the array, not reference
    return this.recipes.slice();
  }
  
  //return single recipe by index
  getRecipe(index: number) {
    //return recipe at index of id
    return this.recipes.slice()[index];
  }


  //method to access shopping list service
  addIngredientsToShoppingList( ingredients : Ingredient[]) {
    //reach out to slservice and call addingredients()
    this.shoppingListService.addIngredients(ingredients)
  }

  //addRecipe
  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    //emit subject to 
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] =  newRecipe;
    //emit new data using subject
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    //delete items from array
    this.recipes.splice(index, 1);

    //emit new value to observables
    this.recipesChanged.next(this.recipes.slice());
  }

}
