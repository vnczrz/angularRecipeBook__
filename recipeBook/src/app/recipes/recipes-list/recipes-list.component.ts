import { Component, OnInit } from '@angular/core';


import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  
  public recipes: Recipe[];
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    //on init call method from recipeService to to init list of recipes prop
    this.recipes = this.recipeService.getRecipes();

    console.log(this.recipes)
  }



}



// recipes: Recipe[] = [
//   new Recipe('Test Recipe', 'This is a test', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.616.462.suffix/1537973085542.jpeg'),
//   new Recipe('Test Recipe2', 'This is a test', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.616.462.suffix/1537973085542.jpeg')
// ];

  // onRecipeSelected(recipe: Recipe){
  //   console.log('good')
  //   this.recipeWasSelected.emit(recipe);
  // }

  // @Output() recipeWasSelected = new EventEmitter<Recipe>();