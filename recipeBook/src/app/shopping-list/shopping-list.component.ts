import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';

import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private igChangeSub: Subscription;

  constructor( private shoppingListService: ShoppingListService) { }

  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients();

    //subscribe to observable(subject) from shopping list service
    this.igChangeSub = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  onEditItem(index: number) {
    ///use subject for cross app coms and send this to edit component...emit the value we pass on to the subject
    this.shoppingListService.startedEditing.next(index);
    
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

}
