import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  id: number

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute) {}
  
  ngOnInit() {
    const id = this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipeById(this.id)
    })

  }

  addToShoppingList() {
    console.log(this.recipe.ingredients)
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }
}
