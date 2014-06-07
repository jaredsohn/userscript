//SET @include to the url of your jira server followed by *
// http://jira.example.com:8080/*
// ==UserScript==
// @name           JIRA
// @namespace      JIRA
// @include        http://blah/*
// ==/UserScript==

var links = document.getElementsByClassName('iKey');
var hrefs = new Array();

var size = links.length;
for(i = 0; i < size; i++)
{
	hrefs[i] = links[i].getAttribute('href');
	links[i].setAttribute('href', 'javascript:void(0);');
	links[i].setAttribute('rel', hrefs[i]);
	links[i].addEventListener('click', function(e){
		w({url:this.getAttribute('rel')});
		e.preventDefault();
	}, 
	true);
}

function w( wObj )
{
	var screen_height 	= window.screen.availHeight;
	var screen_width 	= window.screen.availWidth;
	var width  			= screen_width / 2;
	var height			= screen_height / 2;
	var left_point 		= parseInt(screen_width/2)-(width/2); 
	var top_point 		= parseInt(screen_height/2)-(height/2);
	var rand = Math.floor(Math.random()*11);
	win = window.open(wObj.url,"win"+rand.toString(),"width="+width+",height="+height+",top="+top_point+",left="+left_point+",toolbars=0,location=0,statusbar=0,resizable=1,scrollbars=1");
}