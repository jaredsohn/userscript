// ==UserScript==
// @name           julluminatior
// @namespace      http://juick.com/*
// @include        http://juick.com/*
// @exclude        http://juick.com/last* 
// ==/UserScript==


function off_show_thread(){
		var posts = document.getElementsByClassName('liav');
		for (var i = 0 ; i < posts.length ; i++ ){
			posts[i].firstChild.style.cssText= "background: transparent";
		};
			
};

function on_show_thread(){
	off_show_thread();
	var scl = this.getAttribute("value");
	this.stopPropagation
	var position = this.parentNode.parentNode.id;
	this.parentNode.parentNode.firstChild.style.cssText= "background-color: #000";
	
	var lig = document.getElementsByClassName(scl);
	for (var i=0 ; i < lig.length ; i++ ){
		if ( +lig[i].parentNode.id < +position ) {			
			lig[i].style.cssText= "background-color: #222";	
			}
		else break;
	};
};

function insert_links(){
	var posts = document.getElementsByClassName('liav');
	for (var i = 0 ; i < posts.length ; i++ ){
		var userClass = posts[i].lastChild.getElementsByTagName('a')[0].innerHTML;
		posts[i].firstChild.className = "ju_" + userClass;
		if (typeof posts[i].firstChild.firstChild.href != 'undefined') {
			var thread = document.createElement('a');
			var adrs = posts[i].firstChild.firstChild.innerHTML.replace(/@/, "ju_");
			thread.innerHTML = " / thread  ";
			thread.className = "thread";
			thread.setAttribute("value",adrs);
			posts[i].lastChild.appendChild(thread);
			thread.style.cssText = ' color: #999 ; text-decoration: none; cursor: pointer;';
		
			thread.addEventListener('click', on_show_thread, false);
		}
	else continue;
	};
	
};

window.addEventListener("load", insert_links, false);
