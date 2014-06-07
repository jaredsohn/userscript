// ==UserScript==
// @name           Google more from site
// @namespace      koshiua.userscripts.org
// @description    Add "More" link to every google search result with "additional results from site" functionality. It will restrict the search to a certain domain.
// @include        http://www.google.tld/search*
// ==/UserScript==

// If you wish to see set of search forms for every domain
// then try googss (http://userscripts.org/scripts/show/32651)

if (document.location.href.match(/\bsite(?:%3A|\:)/)) {
	//alert("Already on specific site");
	return;
}

var li = document.getElementsByTagName('li');

for(var i=0; i<li.length; i++){
	var cites = li[i].getElementsByTagName('cite');
	if(!cites.length){
		//console.log(i);
		continue;
	}

	var sitestr = cites[0].innerHTML
		.replace(/<\/?b>/gi , "")
		.replace(/<span class="bc">(\S+) .+/ , "$1")
		.replace(/^\w+:\/\// , "")
		.replace(/\/.*/ , "");

	var shortened = sitestr.replace(/www.(.*)/ , "$1");
	//shortened = shortened.replace(/(.*?)\.\w+$/ , "$1");

	// Our link
	var a = document.createElement("a");
	a.innerHTML = 'More';
	a.href = '#';
	a.title = 'More from ' + shortened;
	(function(domain){
		a.addEventListener('click', function(evt){clickHandler(domain, evt)}, false);
	})(sitestr);

	// This is existed span with helper links
	var container = li[i].getElementsByClassName('gl');
	if(!container.length){  // Not found? probably error
		console.log('Helper span not found for ' + i);
		continue;
	}
	// First element can be "translate this page"
	container[container.length-1].appendChild(document.createTextNode(' - '));
	container[container.length-1].appendChild(a);
}

function clickHandler (domain, evt){
	var inputs = document.getElementsByName('q');
	inputs[0].value = "site:"+ domain +' '+ inputs[0].value;
	document.forms[0].submit();

	//stopPropagation();
	evt.preventDefault();
}

