// Dans ce fichier, nous allons utiliser une fonction de la librairie Redux :  createStore  . Vous l'aurez compris, cette fonction permet de créer un store :
import { createStore } from "redux";
// On initialise le store en lui faisant passer notre reducer :
import toggleFavorite from "./Reducers/favoriteReducer";

export default createStore(toggleFavorite);
