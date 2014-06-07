// ==UserScript==
// @name           WordReference Language Switcher
// @description    Add a switch language link to WordReference.com
// @include        http://www.wordreference.com/*
// ==/UserScript==

try 
{
  // Get current URL and extract the 4 characters corresponding to the dictionary
  var oldurl = location.href;
  var dico = location.href.substr(29,4);

  // Add a link with the opposite dictionary depending on the current one
  switch (dico)
  {
	case "fren":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/fren/,'enfr')
		+ '">Translate from English to French</a></h4><br/>' 
		+ document.getElementById("see_also").innerHTML;
	        break;
	case "enfr":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/enfr/,'fren')
		+ '">Translate from French to English</a></h4><br/>'
		+ document.getElementById("see_also").innerHTML;
		break;
	case "enit":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/fren/,'iten')
		+ '">Translate from Italian to English</a></h4><br/>' 
		+ document.getElementById("see_also").innerHTML;
	        break;
	case "iten":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/enfr/,'enit')
		+ '">Translate from English to Italian</a></h4><br/>'
		+ document.getElementById("see_also").innerHTML;
		break;
	case "enes":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/fren/,'esen')
		+ '">Translate from Spanish to English</a></h4><br/>' 
		+ document.getElementById("see_also").innerHTML;
	        break;
	case "esen":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/enfr/,'enes')
		+ '">Translate from English to Spanish</a></h4><br/>'
		+ document.getElementById("see_also").innerHTML;
		break;
	case "esfr":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/fren/,'fres')
		+ '">Translate from French to Spanish</a></h4><br/>' 
		+ document.getElementById("see_also").innerHTML;
	        break;
	case "fres":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/enfr/,'esfr')
		+ '">Translate from Spanish to French</a></h4><br/>'
		+ document.getElementById("see_also").innerHTML;
		break;
	case "espt":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/fren/,'ptes')
		+ '">Translate from Portuguese to Spanish</a></h4><br/>' 
		+ document.getElementById("see_also").innerHTML;
	        break;
	case "ptes":
		document.getElementById("see_also").innerHTML = '<h4><a href="'
	        + oldurl.replace(/enfr/,'espt')
		+ '">Translate from Spanish to Portuguese</a></h4><br/>'
		+ document.getElementById("see_also").innerHTML;
		break;
	default:
//		alert("An error occured with WordReference Language Switcher.");
		break;
  }
}
catch (e) 
{
//	alert("An error occured with WordReference Language Switcher.");
}


