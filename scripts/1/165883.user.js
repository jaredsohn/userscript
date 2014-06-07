// ==UserScript==
// @name		FetLife Feed Fixer
// @grant		none
// @description	Finer control of what appears in your feed...
// @license		GNU Lesser General Public License; http://www.gnu.org/licenses/lgpl.html
// @version		1.1
// @include		https://fetlife.com/home/v4*
// ==/UserScript==

(function(e){function f(){g?chrome.storage.sync.get(null,function(b){chrome.runtime.lastError instanceof Object?console.log("Loading error: "+chrome.runtime.lastError.message):(a=b||{},j())}):(a=JSON.parse(localStorage.getItem("fetfix")),j())}function j(){for(story in a)if(a.hasOwnProperty(story))for(user in a[story])a[story].hasOwnProperty(user)&&h("#stories",user,story)}function h(b,d,c){b=e("a.fetfix_"+d+"_"+c,b);var f=e(".story .brace div,section",b.closest("tr"));d=a instanceof Object&&a[c]instanceof
Object?!0===a[c][d]:!1;d?(b.text("+"),f.hide()):(b.text("-"),f.show())}var g=-1!=navigator.userAgent.indexOf("Chrome")&&chrome instanceof Object,a={};f();g?chrome.storage.onChanged.addListener(function(){f()}):e(window).bind("storage",function(){f()});e("#stories").bind("DOMNodeInserted",function(b){b=e(b.target);if(b.is("tr")){switch(b.attr("class")){default:return;case "like_created":if(0===e(".story img",b).length)return;case "picture_created":case "wall_post_created":case "status_created":case "comment_created":case "post_comment_created":case "group_comment_created":}var d=
e(".user a",b).attr("href").replace("/users/",""),c=b.attr("class");e(".options",b).prepend(e('<a class="fetfix_'+d+"_"+c+' picto q story_options" style="text-decoration:none;" href="#">?</a>').click(function(){a instanceof Object||(a={});a[c]instanceof Object||(a[c]={});a[c][d]?delete a[c][d]:a[c][d]=!0;g?chrome.storage.sync.set(a):localStorage.setItem("fetfix",JSON.stringify(a));h("#stories",d,c)}));h(b,d,c)}})})(jQuery);