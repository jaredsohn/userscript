// ==UserScript==
// @name		IMDB My Movies
// @description	Adds Movies to IMDB My Movies.
// @version 	1.4
// @date		30/8/2008
// @lastupdate	19/8/2010
// @namespace	arifulbd.wordpress.com
// @author 		Md. Ariful Islam
// @include	http://www.imdb.com/*
// @include	http://imdb.com/*
// @include	http://*.imdb.com/*
// ==/UserScript==

/* Adds movies with imdb movie links to your imdb my movies. It can be enabled for any website 
containing imdb movie links. It adds the link without leaving the page using ajax. 
 It's a very useful tool for those who like to keep record of their  watched or favorite films in imdb. */

var links=document.links;

for (i=0;i<links.length;i++){
	var m=links[i].href.match(/tt(\d+)\/$/);
	if (m && links[i].textContent != ""){
		var movieId=m[1];
		var myLink="http://www.imdb.com/mymovies/list?pending&add="+movieId;
		var myElement=document.createElement("a");
		myElement.setAttribute("href",myLink);
		myElement.setAttribute("target","_blank");
		myElement.innerHTML=" [+]";
		myElement.addEventListener("click",function(event){event.stopPropagation();	event.preventDefault();addLink(this);},false);
		links[i].parentNode.insertBefore(myElement,links[i].nextSibling);
	}
}

function addLink(myElement){
	myElement.innerHTML=" [Adding...]";
	GM_xmlhttpRequest({method:"GET",url:myElement.href,
		onload:function(result) {
			if (result.responseText.indexOf('Register at IMDb.com')!=-1){
				alert('You are not logged in!\nPlease log in to IMDb.com first.');	
				myElement.innerHTML =" [+]";
			}
			else{			
				myElement.parentNode.removeChild(myElement);
			}	
		}
		,
		onerror:function(result) {
			alert('Error Occured!\nSorry, The movie was not added.');
			myElement.innerHTML =" [+]";
		}		
	});	
}

function showRating(currLink){
	for (i=currLink;i<links.length;i++) {
		var m=links[i].href.match(/(\/title\/tt\d+\/$)/);
		if (m && links[i].textContent != "") {
			GM_xmlhttpRequest({method: 'get',url:'http://m.imdb.com'+m[1],
				onload: function (i){return function(result) {				
					rating = result.responseText.match(/<strong>(\d+[\.,]\d)<\/strong>/);					
					var myElement=document.createElement("b");
					myElement.innerHTML = (rating ? " [" + rating[1] + "/10] " : " [??/10] ");
					links[i].parentNode.insertBefore(myElement,links[i].nextSibling);					
					showRating(++i);
				}}(i),
				onerror:function (i){return function(result) {
					showRating(++i);
				}}(i)
			});
			break;
		}
	}
}

GM_registerMenuCommand('Show Ratings', function() {
	showRating(0);
});