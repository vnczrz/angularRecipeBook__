import { NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes/recipes-detail/recipes-detail.component";
import { RecipesItemComponent } from "./recipes/recipes-list/recipes-item/recipes-item.component";
import { RecipesResolverService } from "./recipes/recipes-resolver.service";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

//array of js objects consisting of routes... { path, component }
const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipesComponent,
        children: [
            { path:'', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            //:id can refer to position in recipes array
            { path: ':id', component: RecipesDetailComponent, resolve: [RecipesResolverService] },
            { path:':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent,
        children: []
    },
    { path: 'auth', component: AuthComponent}
]

@NgModule(
    {
        imports: [RouterModule.forRoot(appRoutes)],
        exports: [RouterModule]
    }
)

export class AppRoutingModule {

}