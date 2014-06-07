// ==UserScript==

// @name          What.CD Wiki Search Bar
// @description   Adds a "Wiki" search bar to the list at the top of the page.
// @include       https://ssl.what.cd/*
// @include	  https://www.what.cd/*
// @include	  https://what.cd/*
// ==/UserScript==

alert("AAAAAAAH");

document.getElementById("searchbar_requests").innerHTML += "\
<li id=\"searchbar_wiki\">\
<span class=\"hidden\">Wiki:</span>\
<form class=\"search_form\" name=\"wiki\" action=\"wiki.php\" method=\"get\">\
<input name=\"action\" value=\"search\" type=\"hidden\"></input>\
<input onfocus=\"if (this.value == 'Wiki') this.value='';\" onblur=\"if (this.value == '') this.value='Wiki';\" value=\"Wiki\" name=\"search\" size=\"20\" type=\"text\" id=\"wikisearch\"></input>\
<input value=\"Search\" class=\"hidden\" type=\"submit\"></input>\
</form>\
</li>\
";


