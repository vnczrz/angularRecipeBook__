import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode= false;


  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(){
    //retrieve route id and store in prop
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          //check if theres an id aka if it is a new recipe or not to decide whether we are in new or edit more
          this.editMode = params['id'] != null;
        }
      )

  }

  

}
