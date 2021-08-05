import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor( private recipeService: RecipeService) { }

  ngOnInit() {
    //set up listener, so on recipeSelected event get informed of any changes, use subscribe method
    //use recieved data from subscribe and pass onto selectedRecipe Prop in this component which can then be passed on to recipesDetail template using property binding 
    this.recipeService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe
        }
      );
  }



}
