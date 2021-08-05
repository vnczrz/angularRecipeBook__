import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  @Input()  recipe: Recipe;
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit( ) {
  }

  //pass ingredients[] to recipe service
  onAddToShoppingList() {
    //access recipe service which will then in turn access shoppinglist service and pass ingredients of recipe
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
      
  }

}
