import { Recipe } from "./recipes.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      "Nasi Goreng",
      "Ini nasi goreng enak",
      "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/quick-spicy-nasi-goreng.jpg?itok=tkL7Dx5q",
      [
        new Ingredient('Nasi', 1),
        new Ingredient('Ayam', 3),
        new Ingredient('Kecap', 2)
      ]
    ),
    new Recipe(
      "Bakpau",
      "Bakpau bulet",
      "https://i.ytimg.com/vi/j1lrD8tZDgs/hqdefault.jpg",
      [
        new Ingredient('Daging', 1),
        new Ingredient('Bumbu', 2),
        new Ingredient('Pewarna', 4)]
    ),
    new Recipe(
      "Tahu Bulet",
      "Tahu bulet dadakan",
      "http://resepcaramemasak.info/wp-content/uploads/2017/04/resep-tahu-bulat.jpg",
      [
        new Ingredient('Tahu', 2),
        new Ingredient('Mecin', 5)
      ]
    ),
  ]

  constructor(private shoppingListService: ShoppingListService) {}

  recipeSelected = new EventEmitter<Recipe>()
  recipeChanged = new EventEmitter<Recipe[]>()

  getRecipes() {
    return this.recipes.slice()
  }

  getRecipeById(id: number) {
    return this.recipes[id]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.emit(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe
    this.recipeChanged.emit(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipeChanged.emit(this.recipes.slice())
  }
}