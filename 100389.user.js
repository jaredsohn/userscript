// ==UserScript==
// @name	Fix CAG Spoilers
// @namespace	FixCAGSpoilers
// @version	1.0
// @description	Fixes the CAG spoiler buttons to show and hide spoilers
// @include	http://*.cheapassgamer.com/forums/*
// @include	http://cheapassgamer.com/forums/*
// ==/UserScript==

 function handleClick() {
	 if (this.parentNode.parentNode.getElementsByTagName('span')[1].getElementsByTagName('span')[0].style.display != '') {this.parentNode.parentNode.getElementsByTagName('span')[1].getElementsByTagName('span')[0].style.display = '';this.innerText = '';this.value = 'Hide';}else {this.parentNode.parentNode.getElementsByTagName('span')[1].getElementsByTagName('span')[0].style.display = 'none';this.innerText = '';this.value = 'Show';}
 }

var allInputs = document.getElementsByTagName("input");

for (var i = 0; i < allInputs.length; i++) {
  if (allInputs[i].getAttribute("type") == "button"){
    if (allInputs[i].getAttribute("value") == "Show Spoiler"){
      allInputs[i].removeAttribute("onclick");
      allInputs[i].addEventListener("click", handleClick, false);
    }
  }
}