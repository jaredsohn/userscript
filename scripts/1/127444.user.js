// ==UserScript==
// @name           Next/Prev Gestures
// @namespace      http://userscripts.org/users/107435
// @description    Makes furaffinity.net compatible with next/previous gestures fo navigation
// @include        http://www.furaffinity.net/browse/*
// @include        http://www.furaffinity.net/gallery/*
// @include        https://www.furaffinity.net/browse/*
// @include        https://www.furaffinity.net/gallery/*
// ==/UserScript==

var next = document.createElement('a');                                                                                                       
next.setAttribute('href', "javascript:document.forms[2].submit();");                                                                          
next.innerHTML = "Next Page";                                                                                                                 
                                                                                                                                              
var prev = document.createElement('a');                                                                                                       
prev.setAttribute('href', "javascript:document.forms[1].submit();");                                                                          
prev.innerHTML = "Previous Page";                                                                                                             
                                                                                                                                              
var parent = document.getElementById( "browse" );                                                                                             
if(parent==null) parent = document.getElementById( "gallery" );                                                                               
                                                                                                                                              
parent.appendChild( prev );                                                                                                                   
parent.appendChild( next );
