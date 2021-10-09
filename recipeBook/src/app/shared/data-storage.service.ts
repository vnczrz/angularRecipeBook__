import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from "../recipes/recipe.model";
import { map, tap }  from "rxjs/operators"

@Injectable(
    {
        providedIn: 'root'
    }
)
export class DataStorageService {
    baseURL = 'https://recipeboo-e220a-default-rtdb.firebaseio.com/'
    fetchedRecipes: Recipe[];

    constructor( private http: HttpClient, private recipes: RecipeService ) { }

    storeRecipes() {
        //retrieve data using recipe service
        const recipes = this.recipes.getRecipes();

        this.http.put(
            (this.baseURL+'recipes.json'), 
            recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        //notify angular of what data type the request will return
        return this.http
            .get<Recipe[]>((this.baseURL+'recipes.json'))
            //map is obervable operator that lets us transform observable data-- Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable. 
            .pipe(
                map(recipes => {
            //map on ln 38 is a js array method that manipulates elements in a js array 
                return recipes.map(recipe => { //take each element in the array and //  return new object and use spread operator to copy all recipe being passed
                    return {
                        ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] // this is a ternary expresion asking does the ingredients prop equal ingredients(is it empty?) if not(:) set it to an empty array
                    }; 
                });
              }),
              tap(recipes => {
                  ///the observable being emitted here has been transformed in to proper type by the pipe() and can now be casted 
                this.recipes.setRecipes(recipes);
              })
            )
            // ///the observable being emitted here has been transformed in to proper type by the pipe() and can now be casted 
            // .subscribe(recipes => {
            //     this.recipes.setRecipes(recipes);
            // });


    }
}