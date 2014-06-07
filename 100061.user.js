// ==UserScript==
// @author              Mark Greenway
// @name                Google Reader Instapaper
// @namespace          http://google.com/reader/userscript
// @description           Removes all the whitespace from Google Reader and just gives you the news
// @include             http://google.com/reader/*
// @include             http://*.google.com/reader/*
// @include             https://google.com/reader/*
// @include             https://*.google.com/reader/*
// @include             https://google.co.uk/reader/*
// @include             https://*.google.co.uk/reader/*
// ==/UserScript==
// Google Reader Minimalistic
// Mark Greenway http://userscripts.org/users/314166

(function() {

 function GRT_key(event) {
   element = event.target;
   elementName = element.nodeName.toLowerCase();
   if (elementName == "input") {
     typing = (element.type == "text" || element.type == "password");
   } else {
     typing = (elementName == "textarea");
   }
   if (typing) return true;
   if (String.fromCharCode(event.which)=="W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
     readLater();
     try {
       event.preventDefault();
     } catch (e) {
     }
     return false;
   }
   return true;
 }

 document.addEventListener("keydown", GRT_key, false); 
 
function readLater() {
javascript:function%20iprl5(){var%20d=document,z=d.createElement('scr'+'ipt'),b=d.body,l=d.location;try{if(!b)throw(0);d.title='(Saving...)%20'+d.title;z.setAttribute('src',l.protocol+'//www.instapaper.com/j/Q4S9WoecDdN8?u='+encodeURIComponent(l.href)+'&t='+(new%20Date().getTime()));b.appendChild(z);}catch(e){alert('Please%20wait%20until%20the%20page%20has%20loaded.');}}iprl5();void(0)
}

 })();
