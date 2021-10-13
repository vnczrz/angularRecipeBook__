import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  
  public recipes: Recipe[];
  subscription: Subscription;
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    //subscribe to observable being emitted by recipesChanged = new Subject<Recipe>();
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes : Recipe[]) => {//subject emits recipe obj as obs
          this.recipes = recipes;//pass that into current array of recipes
        }
      ); 
    //on init call method from recipeService to to init list of recipes prop
    this.recipes = this.recipeService.getRecipes();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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