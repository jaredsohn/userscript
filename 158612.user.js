// ==UserScript==
// @name        Tumblr-Prevent c interrupts
// @namespace   http://userscripts.org/users/429210
// @description Prevents c interrupts to enable back button.
// @include     http://www.tumblr.com/*
// @version     1
// ==/UserScript==


var source = '$$("a").each(function(a){'+"\n"+
			 '	if(a.readAttribute("href")!=null && a.readAttribute("href").match(/^\\//)!=null){'+"\n"+
			 '		Event.observe(a, "click", function(event){'+"\n"+
			 '			Event.stop(event);'+"\n"+
			 '			document.location = a.readAttribute("href");'+"\n"+
			 '		});	'+"\n"+
			 '	}'+"\n"+
			 '});';;

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var addthis = document.createTextNode(source);
script.appendChild(addthis);
document.body.appendChild(script);