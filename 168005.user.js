// ==UserScript==
// @name           Subtle Rick Roller
// @namespace      *
// @include		   *
// @description    5% chance of redirecting any page to Rick Astley's 1987 classic
// ==/UserScript==

if(Math.random() > 0.95){
	window.location = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}