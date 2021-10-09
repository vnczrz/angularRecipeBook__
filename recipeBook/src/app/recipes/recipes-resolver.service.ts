import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";

import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(
        private dataStorageService: DataStorageService,
        private recipes: RecipeService
        ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //return an observable that will yield an array of recipes... if this resolved then we can load the route.
        ///acts like a guard that makes sure shit is cool(resolved) before u can go through

        //first check if we have recipes
        const recipes = this.recipes.getRecipes();
        /// if array is empy then run resolve logic.
        if (recipes.length === 0) { 
            return this.dataStorageService.fetchRecipes();
        } else {
            ///otherwise just return recipes
            return recipes;
        }


    }

}