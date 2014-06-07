// Version 1
// mis � jour le :
// 16 mai 2008.
// Cr�er le : 
// 16 mai 2008.
// HotKeys4Vbulletin
// papoo
//
// ==UserScript==
// @name         HotKeys4PhpBB
// @description  des raccourcis clavier pour n'importe quel forum PhpBB  .
// @include        */viewtopic.php*
// @include        */viewforum.php*

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

window.location.href = "posting.php?mode=newtopic&f=" + F ;
} //end Function

//================= R�pondre � un post ============================
function Reponse()
{
var text = window.location.href ;
var maReg = new RegExp( "viewtopic.php"+"[?]", "gi") ;
var resultat = text.replace( maReg, "posting.php?mode=reply&" ) ;
window.location.href = resultat ;
}//end Function

//================= Posts Sans Reponse ============================
function PostsSansReponse() 
{
window.location.href = "search.php?search_id=unanswered";
}

//================= Recherche des Nouveaux Posts ============================
function NouveauxPosts() 
{
window.location.href = "search.php?search_id=newposts";
}//end Function

//================= Les variables pour les touches du claviers ============================

var B_KEY = 66;
var C_KEY = 67;
var F_KEY = 70;
var H_KEY = 72;

//================= Les fonctions pour chaques combinaison de touches ============================

function keyPressed(e) {
    // Pressez  CTRL, maj, C pour cr�er un nouveau post

    if( e.ctrlKey && e.shiftKey && e.keyCode == C_KEY ){
        NouveauPost();
    }
    // Pressez  CTRL, maj, F pour r�pondre � un post

    if( e.ctrlKey && e.shiftKey && e.keyCode == F_KEY ){  
        Reponse();
    }
    // Pressez  CTRL, maj, B pour rechercher les posts du jour
    
     if( e.ctrlKey && e.shiftKey && e.keyCode == B_KEY ){     
    PostsSansReponse();
    }
    // Pressez  CTRL, maj, H pour rechercher les nouveaux posts
    
    if( e.ctrlKey && e.shiftKey && e.keyCode == H_KEY ){     
    NouveauxPosts();
    }
   } //end Function
                 
//================= Attente des touches press�es ============================
window.addEventListener('keydown', keyPressed, false);
