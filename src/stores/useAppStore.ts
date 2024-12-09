import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { FavoriteSliceType,createFavoritesSlice } from "./favoriteSlice";
import { NotificationSliceType, createNotificationSlice } from "./notifiacionSlice";

export const useAppStore = create <RecipesSliceType & FavoriteSliceType & NotificationSliceType>() (devtools((...a)=> ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))