// Version 1.2
// mis à jour le :
// 14 mai 2008.
// Créer le : 
// 7 mai 2008.
// HotKeys4Vbulletin
// papoo
//
// ==UserScript==
// @name         HotKeys4Vbulletin
// @description  des raccourcis clavier pour n'importe quel forum vbulletin  .
// @include        */forum/index.php*
// @include        */forumdisplay.php*
// @include        */showthread.php*
// @include        */showpost.php*
// @include        */search.php*
// @include        *verycoollinks.net*
// ==/UserScript==
//================= Nouveau Post ============================
function NouveauPost()
{
var TabLinks=document.links;
var TabX= new Array();
for(i=0;TabLinks[i];i++){
							 if(TabLinks[i].href.indexOf("php?f=")>-1){
							 var maReg = new RegExp( "[= &|#]+", "g") ;
							      TabX.push(TabLinks[i].href.split(maReg)[1]);
							      }// end If
							 }//end for (i=0
							 var TabX1 = TabX.reverse();
							 var F = TabX1.slice(0,1);

window.location.href = "newthread.php?do=newthread&f=" + F ;
} //end Function

//================= Répondre à un post ============================
function Reponse()
{
var text = window.location.href ;
var maReg = new RegExp( "show.*\.php"+"[?]", "gi") ;
var resultat = text.replace( maReg, "newreply.php?do=newreply&noquote=1&" ) ;
window.location.href = resultat ;
}//end Function

//================= Posts Du Jour ============================
function PostsDuJour() 
{
window.location.href = "search.php?do=getdaily";
}

//================= Recherche des Nouveaux Posts ============================
function NouveauxPosts() 
{
window.location.href = "search.php?do=getnew";
}//end Function

//================= Les variables pour les touches du claviers ============================

var B_KEY = 66;
var C_KEY = 67;
var F_KEY = 70;
var H_KEY = 72;

//================= Les fonctions pour chaques combinaison de touches ============================

function keyPressed(e) {
    // Pressez  CTRL, maj, C pour créer un nouveau post

    if( e.ctrlKey && e.shiftKey && e.keyCode == C_KEY ){
        NouveauPost();
    }
    // Pressez  CTRL, maj, F pour répondre Ó un post

    if( e.ctrlKey && e.shiftKey && e.keyCode == F_KEY ){  
        Reponse();
    }
    // Pressez  CTRL, maj, B pour rechercher les posts du jour
    
     if( e.ctrlKey && e.shiftKey && e.keyCode == B_KEY ){     
    PostsDuJour();
    }
    // Pressez  CTRL, maj, H pour rechercher les nouveaux posts
    
    if( e.ctrlKey && e.shiftKey && e.keyCode == H_KEY ){     
    NouveauxPosts();
    }
   } //end Function
                 
//================= Attente des touches pressées ============================
window.addEventListener('keydown', keyPressed, false);
