import { Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  //recipe and id is passed down using property binding from parent component from ngfor and bound using property binding
  @Input() recipe: Recipe;
  @Input()index: number;

  constructor( ) { }

  ngOnInit(){ }

}
