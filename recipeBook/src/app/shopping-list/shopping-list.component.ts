import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

import { Ingredient } from '../shared/ingredient.model';



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor( private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients();

    //set up listener, so on ingredientsChanged event get informed of any changes, use subscribe method
    //use recieved data from subscribe set ingredients Prop to data recieved
    this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

}
