// ==UserScript==
// @name            Experts Exchange unRot13
// @namespace       http://userscripts.org/scripts/edit_src/11421
// @description     Experts Exchange - Break Rot13
// @include         http://www.experts-exchange.com/*
// ==/UserScript=

/*
 * Blatantly stolen with minimal care and minimal attribution from 
 * http://userscripts.org/scripts/review/10747
 * and http://jsfromhell.com/string/rot13
 * I'm sure this makes me a bad person.
 * Doesn't do HTML entities correctly, but still renders the text quite
 * readable.  Unlike Sathya288's original script, this doesn't rely on
 * an external site.
 *
 * If desired, here are Sathya's original headers:
 * //
 * // ==UserScript==
 * // @name            Expert Exchange
 * // @namespace       http://sathya.hasno.homepage
 * // @description     Experts Exchange - read the unreadable. Based on the tip http://gnuvince.net/?p=399
 * // @include         http://www.experts-exchange.com/*
 * // ==/UserScript=
 */

window.Opensourcify = new OpenSource();

function OpenSource(){
var elems = document.getElementsByTagName("div");

for(var i =0; i< elems.length; i++){
 var elem = elems[i];
 if( elem.className == "answerBody quoted"){
 if( elem.getAttribute("id") == "intelliTxt"){
 elem.innerHTML = elem.innerHTML.replace(/[a-zA-Z]/g, function(c){
 return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
 });
 }
 }
 else if( elem.className == "blur")
 elem.className = "seethru";
 else if(elem.className == "hasMouseOver"){
 elem.onmouseover = {};
 elem.onmouseout = {};
 elem.setAttribute("onmouseover", "");
 elem.setAttribute("onmouseout", "");
 }
}
}