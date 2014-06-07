// ==UserScript==
// @name           Youtube Blackout
// @description    View Youtube videos unhindered
// @include        http://youtube.com/watch?*
// ==/UserScript==

var SCRIPT = {
	name: "Youtube Blackout",
	namespace: "http://userscripts.org/people/25394",
	description: 'View Youtube videos unhindered',
	source: "http://userscripts.org/scripts/show/9145",
	identifier: "http://userscripts.org/scripts/show/9145.user.js",
	version: "0.1",// version
	date: (new Date(2007, 5, 9))		// update date
			.valueOf()
};


(function(){

function blackout(){
    back=document.createElement('div')
    back.style.backgroundColor="black"
    document.body.appendChild(back)
    back.addEventListener("click", function(){ document.getElementById('movie_player').style.position=''; this.parentNode.removeChild(this)},true);
    back.style.position="fixed"
    back.style.top=0
    back.style.left=0
    back.style.width=window.innerWidth+'px'
    back.style.height=window.innerHeight+'px'
    back.style.opacity=0.9
    mv=document.getElementById('movie_player')
    mv.style.zIndex=5
    mv.style.position="fixed"
    mv.style.top=(window.innerHeight/2-mv.height/2)+'px'
    mv.style.left=(window.innerWidth/2-mv.width/2)+'px'
    
}

a=document.getElementById('movie_player').parentNode.appendChild(document.createElement('a')).appendChild(document.createTextNode('Blackout')).parentNode
a.addEventListener("click", blackout, true);
a.href="#"


})()
//created 5/9/07