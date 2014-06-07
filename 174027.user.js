// ==UserScript==
// @name        aumentalogo
// @namespace   aumenta logo teste
// @include     http://trophymanager.com/club/
// @version     1
// ==/UserScript==


if (location.href.indexOf("/club/") != -1){

    var tagLogo = document.getElementsByClassName("club_logo")[0];
    var novoLogo = document.createElement("img");
    novoLogo.setAttribute("src", "/pics/club_logos/1521237_140.png?img=38e36f4bdf5497bcf9f1fdd4fb9af42a");
    novoLogo.setAttribute("class","club_logo");
    novoLogo.setAttribute("style", "height:110%; position:absolute;left:31.5%; top:-15px; ");
    tagLogo.appendChild(novoLogo);
   
    //tagLogo.innerHTML="TEXTO SEM SENTIDO";
    //tagLogo.setAttribute();
    document.appendChild(tagLogo);

}