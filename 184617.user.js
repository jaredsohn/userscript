// ==UserScript==
// @name        Allocine
// @namespace   http://userscripts.org/users/540298
// @include     http://www.allocine.fr/seance/*
// @version     1
// @grant       none
// ==/UserScript==


var myFilmList = document.getElementsByClassName("datablock w-shareyourshowtime");
var dataMovie;
// boucle pour chaque film présenté
for (var i = 0; i < myFilmList.length; i++){
    // need to split the data-movie attribute to get the "genre"
    dataMovie = myFilmList[i].getAttribute("data-movie");
    dataMovie = dataMovie.split(",");
    
    for (var j in dataMovie){
        if(dataMovie[j].indexOf("genre") != -1){
            //alert(dataMovie[j]);
            if((dataMovie[j].indexOf("Thriller") != -1)||(dataMovie[j].indexOf("Action") != -1)||(dataMovie[j].indexOf("Science fiction") != -1)){
                myFilmList[i].setAttribute("style","background-color: #880000; border: #00FF00; border-style: ridge; border-width: 5px;"); //background-color: red;
            }            
            else if((dataMovie[j].indexOf("Animation") != -1)||(dataMovie[j].indexOf("Aventure") != -1)){
                myFilmList[i].setAttribute("style","border: #0000FF; border-style: ridge; border-width: 5px;"); //gris
            }
            else if((dataMovie[j].indexOf("Drame") != -1)||(dataMovie[j].indexOf("Comédie dramatique") != -1)){
                myFilmList[i].setAttribute("style","background-color: #444444; border: #000000; border-style: ridge; border-width: 5px;"); //gris
            }
            else if((dataMovie[j].indexOf("Romance") != -1)||(dataMovie[j].indexOf("Comédie") != -1)){
                myFilmList[i].setAttribute("style","border: #FF0000; border-style: ridge; border-width: 5px;"); //gris
            }
        }
    }
}
