// ==UserScript==
// @name       Show Ratings Button
// @namespace  http://hackforums.net/
// @version    1.0
// @description  Next to "Thread Rating:" it will say "Show Ratings" and it will show who rated the thread, and how much they rated it.
// @match      http://hackforums.net/*
// @copyright  2012, Koolsami7
// ==/UserScript==
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
loadAndExecute("//code.jquery.com/jquery-1.8.2.min.js", function() {
var parmeters = window.location.search.substring(1)split('?');
var position = parms[0].indexOf('=');
    if (position != -1) {
$('strong[style="float: left; padding-right: 10px;"]').html('<a href=\"showratings.php?tid='+parmameters[0].substring(position+1)+'\">Show Ratings</a> | Thread Rating:');
    }
});