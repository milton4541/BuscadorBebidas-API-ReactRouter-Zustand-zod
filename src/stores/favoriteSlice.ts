import {StateCreator} from 'zustand'
import { Recipe } from '../types'
import { createNotificationSlice, NotificationSliceType } from './notifiacionSlice'

export type FavoriteSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (recipe: Recipe) => void,
    favoriteExist: (id: Recipe['idDrink']) => boolean,
    loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoriteSliceType & NotificationSliceType, [],
 [], FavoriteSliceType> = (set,get,api) => ({
    favorites: [],
    handleClickFavorite: (recipe)=>{
        if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)){
            set({
                favorites: [...get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)]
            })
            createNotificationSlice(set,get,api).showNotification({text: 'Se elimino de favoritos', error:false})
        }else{
            set({
                favorites: [...get().favorites,recipe]
            })
            createNotificationSlice(set,get,api).showNotification({text: 'Se agrego de favoritos', error:false})
        }

        localStorage.setItem('favorites',JSON.stringify(get().favorites))
    },

    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: ()=>{
        const strorage = localStorage.getItem('favorites')
        if(strorage){
            set({
                favorites: JSON.parse(strorage)
            })
        }
    }


})