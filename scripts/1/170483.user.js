// ==UserScript==
// @name          Google Docs Table of Contents Sidebar
// @description   A script that shows left sidebar with table of contents in Google Docs.

// @include       *://docs.google.com/*
// ==/UserScript==

var menutable=document.getElementsByClassName("kix-autogenregionrenderer")[0].innerHTML;
var winheight = document.documentElement.clientHeight;
var sidebarheight = winheight - 205;
var sidebar = document.createElement('div');
sidebar.style.position = 'fixed';
sidebar.style.top = '185px';
sidebar.style.left = '10px';
sidebar.style.padding = '20px 10px 0px 0px';
sidebar.style.overflow = 'auto';
sidebar.style.width = '200px';
sidebar.style.height = sidebarheight + 'px';
sidebar.style.border = '1px solid #D9D9D9';
sidebar.style.backgroundColor = '#FFFFFF';

linksarraysource = document.getElementsByTagName("body")[0].innerHTML;
regexplink = /#heading=\w*.\w*/gi;
linksarray = linksarraysource.match(regexplink);

for (i=0; i<linksarray.length; i++)
{
  var thislink = linksarray[i];
  var atagbegin = '<a href="' + thislink + '">';
  var atagend = '</a>';
  menutable = menutable.replace(/(<span class=[^<>]*?>)(<span style=[^<>]*?>)(.*?)(<\/span><\/span>)/i, '$1<a href="' + thislink + '">$2$3</a>$4');
}

menutable = menutable.replace(/(<span)( style=[^<>]*?)(>)/gi, '$1$3');

sidebar.innerHTML = menutable;
body = document.getElementsByTagName('body')[0];
body.appendChild(sidebar);