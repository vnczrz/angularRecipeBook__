import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode= false;
  recipeForm: FormGroup;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService : RecipeService) { }

  ngOnInit(){
    //retrieve route id and store in prop
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          //check if theres an id aka if it is a new recipe or not to decide whether we are in new or edit more
          this.editMode = params['id'] != null;
          //init form when params change...bc indicates we reloaded page
          this.initForm();
        }
      )

  }

  onSubmit() {
    console.log(this.recipeForm);
    //pass recipeFOrm obj as arg
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  ///add new form control to array of form controls
  //clicking triggers function which adds new formControl(line) and we then populate it
  onAddIngredient(){
    //cast formarray
    //push new formarray bc we have three controls
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
                                  Validators.required,
                                  Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)//regex
                                  ]),
        'unit': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    //navigate up one level
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get controls() { // a getter
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  //init form function to populate forms
  private initForm() {
    let recipeName ='';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    ///if we are editing.. populate form with data from retrieved recipe
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      //check if we have ingredients
      if (recipe['ingredients']) {
        //if so loop through array and push each iter on to new formarray
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                                        Validators.required,
                                        Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/)//regex
                                        ]),
              'unit': new FormControl(ingredient.unit, Validators.required)
            })
          );
        }
      }
    }
    //populate form
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}



