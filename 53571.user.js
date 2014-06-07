// ==UserScript==

// @name RTtab

// @namespace killerbunny13666@gmail.com

// @description A tab for Cabose1995

// @include http://roosterteeth.com/*

// @include http:http://*.roosterteeth.com/*

// ==/UserScript==



(function()

{



//title for new tab's header

var tabtitle = "Forum";

//link for tab's header

var titlelink = "http://rvb.roosterteeth.com/forum/";



//tab dropdown entries

//use relative links to stay with this subdomain! (prevents the switching of your theme)

//external links work as well!

var item0 = "Forum Games";

var item0link = "http://rvb.roosterteeth.com/forum/forum.php?fid=27";
var item1 = "Sponsor";

var item1link = "http://rvb.roosterteeth.com/forum/forum.php?fid=101";

var item2 = "Red vs Blue";

var item2link = "http://rvb.roosterteeth.com/forum/forum.php?fid=2";



//DON'T TOUCH ANYTHING BELOW THIS LINE!!!

//--------------------------------------------------------------------------------------------------------------------------//



//cuts off the end of the list of tabs, allowing us to directly insert our new tab

var tabs = document.getElementById("sddm");

var arr = tabs.innerHTML.split("");

var idx = tabs.innerHTML.length-5;

arr.splice(idx,5);

tabs.innerHTML = arr.join("");



//remove the "href="+titlelink+" portion if you wish for the tab header to do nothing.

tabs.innerHTML += "<li><a class='tabRoot' id='mlink8' href="+titlelink+" onmouseover='mopen(\"8\");' onmouseout='mclosetime();'>"+tabtitle+"</a>"+

"<div id='m8' class='hold' style='border: 0pt none ; background: transparent none repeat scroll 0% 0%; padding-top: 0px; z-index: 210; width: 150px; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; outline-color: -moz-use-text-color; outline-style: none; outline-width: 0pt;' onmouseover='mcancelclosetime()'>"+

"<div style='visibility: inherit; position: static; z-index: 220;' onmouseover='mcancelclosetime()' onmouseout='mclosetime()'>"+



//here's where we put our dropdown items into the tab

//if you really want more items, just add variables up above named as "item4" and "item4link",

//and then copy/paste one of the following lines, changing the digits to match your new dropdown item
"<a href="+item0link+">"+item0+"</a>"+

"<a href="+item1link+">"+item1+"</a>"+

"<a href="+item2link+">"+item2+"</a>"+



//close out the list item

"<span class='redBar'></span>"+

"</div>"+

"</div>"+

"</li></ul>";



}

)(); 