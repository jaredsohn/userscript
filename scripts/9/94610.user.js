// ==UserScript==   
// @name            ReplacementText
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.0
// @description     Replaces text you choose with a replacement of your choosing. ie. "<3" with "?"
// @include         http://www.kongregate.com/games/*/*
// @homepage        
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
var r = function(){return eval("("+GM_getValue("skyreplacements", "{ }")+")")};
var stringit = function(a){var i="{ ";for(var d in a){i += '"' + d.replace(/"/g,'\\"') + '":"' + String(a[d]).replace(/"/g,'\\"') + '",'}return i.substring(0, i.length - 1) + " }"};
unsafeWindow.holodeck.addOutgoingMessageFilter(function(m,n){for(var i in r()){m=m.replace(new RegExp(i,"g"),r()[i]);}n(m);})
GM_registerMenuCommand("Add replacement text (ie. faces)", function(){
var k = r();
var i = prompt("What text do you want to replace?");
if (!i) return;
var j = prompt("What do you want to replace it with?\n(Empty to delete replacement)", k[i] || i);
if (j) k[i] = j; else delete k[i];
GM_setValue("skyreplacements", stringit(k))
});
}, 1250);
}