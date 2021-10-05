import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  //providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;

  // constructor( private recipeService: RecipeService) { }
  constructor( private router: Router, private route: ActivatedRoute) { }

  ngOnInit() { }
 
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route}); 
  }



}
