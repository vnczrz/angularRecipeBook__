import { Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  //recipe is passed down using property binding from parent component from ngfor and bound using property binding
  @Input() recipe: Recipe;

  //@Output() recipeSelected = new EventEmitter<void>();

  constructor( private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  onSelected()  {
    //call method recipeService that will pass data of recipe we selected by using event emitter from service
    this.recipeService.recipeSelected.emit(this.recipe);
  }
  
}

//this.recipeSelected.emit();