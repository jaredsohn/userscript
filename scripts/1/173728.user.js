// ==UserScript==
// @name          Copyprivate-LGL
// @description   Allow you to copy your private messages in LGL. Information must be free.
// @include       http://www.loups-garous-en-ligne.com/jeu/index.php*
// ==/UserScript==

// Juste un petit hack, pas besoin d'être propre
function rectifLibreInfo()
{
    var perso = document.getElementsByClassName("canal_perso");
    for (var i = 0; i < perso.length; ++i)
    {
        perso[i].removeAttribute("class");
        perso[i].style.color = "blue";
    }
}

setInterval(rectifLibreInfo, 1000);
