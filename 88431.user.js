// ==UserScript==

// @name	Default freecycle posts to offers
// @author	joshua.buzzard

// @description	when click view posts go straight to the Offers tab
// @version	1.0
// @include	http://my.freecycle.org/home/groups

// ==/UserScript==
//grab all the view post links
var viewPosts = document.querySelectorAll("[title='View the Posts']");

//loop over each view link and change from href to onclick
for(var i = 0;i<viewPosts.length;i++){
	var currHref = viewPosts[i].getAttribute("href");
	//appending form to the body
	var form = document.createElement("form");
	//search needs to take a post want to get more results right away
	form.setAttribute("method", "POST");
 
	//setup the form with the proper params
    var includeOffers = document.createElement("input");
    includeOffers.setAttribute("type", "checkbox");
	includeOffers.setAttribute("name", "include_offers");
	includeOffers.setAttribute("id", "include_offers");
	includeOffers.setAttribute("checked", "checked");
        includeOffers.style.display = "none";
	form.appendChild(includeOffers);
	var resultsPer = document.createElement("input");
	resultsPer.setAttribute("type", "hidden");
	resultsPer.setAttribute("name", "resultsperpage");
	resultsPer.setAttribute("id", "resultsperpage");
	resultsPer.setAttribute("value", 50);
	form.appendChild(resultsPer);
	
	form.setAttribute("action", currHref+"/posts/search");
	form.setAttribute("id","freecycleForm"+i);
	form.setAttribute("name","freecycleForm"+i);
 	document.body.appendChild(form);  
	
	viewPosts[i].setAttribute("href","javascript:document.forms.freecycleForm"+i+".submit()");
}

