import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  
  recipe: Recipe;
  id: number;
  
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit( ) {

    //subscribe so we can change dynamically and react to changing id
    this.route.params
      .subscribe(
        //fetch id and store it
          (params: Params) => {
            //cast id from route onto id prop which we can use to identify recipe
            this.id = +params['id']
            //fetch recipe
            this.recipe = this.recipeService.getRecipe(this.id);
          }
      );

      //subscribe so when deleted page is updated

  }

  //pass ingredients[] to recipe service
  onAddToShoppingList() {
    //access recipe service which will then in turn access shoppinglist service and pass ingredients of recipe
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
      
  }

  onEditRecipe(){
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDeleteRecipe(){
    //pass id we extracted from route
    this.recipeService.deleteRecipe(this.id);
    //navigate away when finished
    this.router.navigate(['/recipes']);
  }

}
