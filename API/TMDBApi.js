// ----------TMDBApi.js---------
//C'est une très bonne pratique de séparer la logique API du reste de l'application. Pour cela, on va créer un nouveau dossier et un nouveau fichier avec tous nos appels API. Créer un dossier API à la racine de votre projet et, à l'intérieur de celui-ci, un fichier TMDBApi.js.

const API_TOKEN = "180fd47bdfed927432c5dd86424757fa";

//Définir les fonctions avec  export  pour que l'on puisse l'utiliser dans nos components
//Ici, on appelle notre URL de recherche avec, en paramètre, le token et le texte recherché.
//.then() =  convertit la réponse de notre API en JSON et la retourne.
//.catch() = En cas d'erreur, on passe automatiquement dans le  catch  et on affiche une erreur à l'écran.

export function getFilmsFromApiWithSearchedText(text, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text +
    "&page=" +
    page;
  // -----fetch----
  // = librairie JS - pour tous les  appels réseaux -- équivalente à Axios - fetch est deja installée
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}
// ------ image du film --------
//creer une fonction pour récupérer l'url de la photo (name)
// car dans l'api on a donc le nom de l'image ( "poster_path"), mais cela s'arrête là. Il nous manque tout le début de l'URL.
// On va donc créer une fonction pour construire l'URL d'une image -l'url est sur la documentation de l'api

export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}
// -------- détail du film --------
// récupérer et afficher le détail d'un film
//===> creer une nouvelle fonction d'api
export function getFilmDetailFromApi(id) {
  // construire l'url pour appeler le détail d'un film -- fetch permet de réaliser l'appel api
  const url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=" +
    API_TOKEN +
    "&language=fr";
  return fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error));
}
