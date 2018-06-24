import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[]
  subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()
    this.subscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[]) => this.recipes = recipes)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}