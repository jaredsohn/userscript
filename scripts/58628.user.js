// ==UserScript==
// @name           JvKeyNavigation
// @namespace
// @description    Permet de naviguer sur jv.com avec le clavier
// @include        http://www.jeuxvideo.com/forums/1-*
// ==/UserScript==

function NouveauPost(forumID)
{
        window.location.href = "http://www.jeuxvideo.com/forums/0-"+forumID+"-0-1-0-1-0-0.htm#form_post";
} //end Function

//================= Répondre à un post ============================
function Reponse(forumID,topicID,pageID)
{
        window.location.href = "http://www.jeuxvideo.com/forums/3-"+forumID+"-"+topicID+"-"+pageID+"-0-1-0-1.htm#form_post" ;

}//end Function


//================= Recherche des Nouveaux Posts ============================
function NouveauxPosts(forumID)
{
        window.location.href = "http://www.jeuxvideo.com/forums/0-"+forumID+"-0-1-0-1-0-0.htm";
}//end Function

//================= Les variables pour les touches du claviers ============================

var B_KEY = 66;
var C_KEY = 67;
var F_KEY = 70;
var H_KEY = 72;
var N_KEY = 78;
var R_KEY = 82;

//================= Les fonctions pour chaques combinaison de touches ============================


function keyPressed(e) {
        var topicURL = window.location.href;
  GM_log('topicURL : '+topicURL);
	var forumID = topicURL.split("forums/1-")[1].split("-")[0];
  GM_log('forumID : '+forumID);

        var topicID = topicURL.split("forums/1-"+forumID+"-")[1].split("-")[0];  
  GM_log('topicID : '+topicID);          
        var pageID = topicURL.split("forums/1-"+forumID+"-"+topicID+"-")[1].split("-")[0]; 
  GM_log('pageID : '+pageID);          

        forumID = parseInt(forumID);
        var pageID  = parseInt(pageID);
        topicID = parseInt(topicID);



       // Pressez  N pour créer un nouveau topic
        if(/* e.ctrlKey && e.shiftKey &&*/ e.keyCode == N_KEY ){
                NouveauPost(forumID);
        }

        // Pressez R pour répondre au topic courant
        if(e.keyCode == R_KEY ){
                Reponse(forumID,topicID,pageID);
        }

        // Pressez F pour aller à l'index du forum
        if(e.keyCode == F_KEY ){
                NouveauxPosts(forumID);
        }
} //end Function


function add_things() {
        window.addEventListener('keydown', keyPressed, false);
}


function main() {
        var url = window.location.href;
        if (url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/1-/)) add_things();
}

main();


