import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;

  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor( private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    //store subscription to listen for item to be edited and populate form with it
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          ///set edit to true and extract index
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          ///populate form with selected item to be edited... passed in from template
          console.log(this.editedItem.unit);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            unit: this.editedItem.unit,
          })
        }
    );
  }

  //pass ngForm to func
  onAddItem( form: NgForm ){
    console.log(form)
    //extract values from td form
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount, value.unit);
    ///if we are editing an existing ingredient call approp method
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {///otherwise addIngredient
      //call on logic from service and pass the element we extracted, and emit event
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
  }

  
  onDelete() {
    //pass index to func
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }

  //allow user to clear the form
  onClear() {
    this.slForm.reset()
    this.editMode = false;
  }

}


//this.shoppingListService.ingredientsChanged.emit(newIngredient);
// @Output() ingredientAdded = new EventEmitter<Ingredient>();
// this.ingredientAdded.emit(newIngredient);