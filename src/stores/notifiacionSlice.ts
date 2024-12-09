import {StateCreator} from 'zustand'
import { FavoriteSliceType } from './favoriteSlice'


type Notification = {
    text: string,
    error: boolean,
    show: boolean
}

export type NotificationSliceType = {
    notification: Notification,
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
    hiddenNotification: () => void

}

export const createNotificationSlice:  StateCreator<NotificationSliceType & FavoriteSliceType, [],
[], NotificationSliceType> = (set,get) => ({
notification: {
    text: '',
    error: false,
    show: false
},
showNotification: (payload) => {
    set({
        notification: {
            text: payload.text,
            error: payload.error,
            show: true
        }
    })
    setTimeout(() => {
        get().hiddenNotification()
    },5000);
},
hiddenNotification: () => {
    set({
        notification: {
            text: '',
            error: false,
            show: false
        },
    })
}
})