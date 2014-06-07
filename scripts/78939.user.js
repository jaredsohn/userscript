// ==UserScript==
// @name           shareua.com helper
// @namespace      script
// @include        http://shareua.com/*
// ==/UserScript==

var a=document.getElementById('free_form');
if (a){a.submit()}
var b=document.getElementById('i-input')
if (b){b.focus()}
var c=document.getElementById('fileLink')
if (c){
	var cont=document.getElementById('container');
	 if(cont){cont.parentNode.removeChild(cont);}

	var cont2=document.getElementById('footer');
	 if(cont2){cont2.parentNode.removeChild(cont2);}

	var countdown = 61;
	var l=0;
	var now   = Date.parse(new Date());
	var ready = Date.parse(new Date (now + countdown  * 1000));
	setInterval(function()
	 {
	  var sec = ( ready - Date.parse(new Date()) )/1000;

	  if(sec > 0){ document.title = sec + " seconds left";} 
	else
	  {
	   document.title='Download ready';
	   if(l==0){
		        var d1=document.createElement('div')
			d1.innerHTML='<style>#wrapper{background: url("http://shareua.com/i/top-bg.gif0") repeat-x scroll 2px 33px transparent;}</style><br />Your links:<br />'+c.href+'<br /><br /><a href="'+c.href+'">'+c.href+'</a><br />';
			c.parentNode.insertBefore(d1, c.nextSibling);
			document.location.href = c.href;
			l++;
		   }
	  }
         },1000);
       c.setAttribute('onclick','disabled_by_Black_Sun');
      }
