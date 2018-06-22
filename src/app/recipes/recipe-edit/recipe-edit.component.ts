import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode: boolean = false
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = params['id'] != null;
      console.log(this.editMode)
      this.initForm()
    })
  }

  private initForm() {
    let data = {
      name: '',
      imagePath: '',
      description: '',
      ingredients: new FormArray([])
    }
    if(this.editMode) {
      let editData = this.recipeService.getRecipeById(this.id)
      data.name = editData.name
      data.description = editData.description
      data.imagePath = editData.imagePath
      if (editData['ingredients']) {
        editData.ingredients.map(ingredient => {
          data.ingredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[1-9]*$/)
            ])
          }))
        })
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(data.name, Validators.required),
      imagePath: new FormControl(data.imagePath, Validators.required),
      description: new FormControl(data.description, Validators.required),
      ingredients: data.ingredients
    })
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[1-9]*$/)
      ])
    }))
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['recipeForm']
    // )
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
  }
}
