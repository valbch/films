// creation du reduceur pour gérer les films favoris = ------toggleFavorite-----

// 1 / ---- State initial ----
//Le state initial est la définition du state par défaut de votre reducer.
//créer le state initial, dans lequel on va initialiser une variable favoritesFilm
const initialState = { favoritesFilm: [] };
// initialiser le state (en orange) du réduceur avec le state initial:
// quand on va appeler la premiere fois le reducer toogleFavorite son state sera nul et donc initialisé avec avec la valeur de  initialState donc  un tableau vide : favoritesFilm:

const toggleFavorite = (state = initialState, action) => {
  let nextState;
  // 2/ ---- Gestion des types d'action ----
  // gérer une action  TOGGLE_FAVORITE  dans notre reducer
  // 3 /  ----- Traitement d'une action -----
  // A FAIRE :
  // - Ajouter un film aux favoris s'il n'est pas présent dans les films favoris
  // - Supprimer un film des favoris s'il est présent dans les films favoris
  // - Retourner le nouveau state avec les films favoris mis à jour

  switch (action.type) {
    // le reducer ne va gérer qu'une seule action : "TOGGLE_FAVORITE"
    // c'est cette action qui va se charger de savoir si il faut ajouter ou supprimer un film des favoris :
    case "TOGGLE_FAVORITE":
      // pour verifier si un film fait déjà parti de nos favoris, on va utiliser la fonction findIndex():
      const favoriteFilmIndex = state.favoritesFilm.findIndex(
        // rappel findIndex()= retourne l'index de l'élément dans le tableau s'il existe, sinon elle renvoie -1.
        item => item.id === action.value.id
      );
      // si favoriteFilmIndex n'est pas égale à -1 cela veut dire que le film est déjà présent dans mes favoris --> on va donc faire sa suppression :
      if (favoriteFilmIndex !== -1) {
        //suppression du film si il est déja dans la liste
        // pour supprimer le film de nos favoris on va utiliser la fonction filter() - attention à ne pas modifier le state directement - principe immuable en faisant une copie :
        // A FAIRE :
        // - On initialise un nouvel objet  nextState  avec une copie du state  ...state .
        // - Puis, on redéfinit les films favoris de l'objet  nextState  avec un tableau qui correspond aux films favoris du  state ,  auquel on a enlevé le film à l'index spécifié (fonction  filter ).
        nextState = {
          ...state,

          favoritesFilm: state.favoritesFilm.filter(
            //si l'index n'est pas égale  favoriteFilmIndex alors on garde le film
            (item, index) => index !== favoriteFilmIndex
            //
          )
        };
        // si le film n'est pas dans la liste - si favoriteFilmIndex vaut - 1, on va ajouter le film  à la liste:
      } else {
        // ajouter le film si il n'est pas dans la liste
        nextState = {
          ...state,
          // dans favoritesFilm on va concaténé les film de notre state actuel avec celui dans action.value :
          favoritesFilm: [...state.favoritesFilm, action.value]
          // ex du modele reducter ==> value: action.value
        };
      }
      // renvoyer nextState si il ne vaut pas undefined et si il vaut undefined, il faut renvoyer state
      // || = ou
      return nextState || state;
    default:
      return state;
  }
};
// ne pas oublier d'exporter le reducer pour pouvoir l'utiliser partout dans l'application
export default toggleFavorite;
