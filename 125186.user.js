// ==UserScript==
// @name           Collapse Submission by Default
// @namespace      net.fa
// @include        http://www.furaffinity.net/view/*
// @include        https://www.furaffinity.net/view/*
// ==/UserScript==

var runOnce = false;
var targetElement = null;

function main() {
	var alt1Elements = document.getElementsByClassName("alt1");
	
	for(var i=0;i<alt1Elements.length;i++) {
		var thisElement = alt1Elements[i];
		if(thisElement.getAttribute("align") != "left") {
			continue;
		} else {
			if(thisElement.innerHTML.indexOf("File type: ") < 0) {
				continue;
			}
			targetElement = thisElement;
			thisElement.style.display = "none";

			var clickToExpand = document.createElement("a");
			clickToExpand.innerHTML = "<div align='center'><font size='+2' color='red'>Click to expand</font></div>";
			clickToExpand.href = "#";
			clickToExpand.addEventListener("click", function(e) {
				targetElement.style.display = "";
				this.style.display = "none";			
			}, false);

			thisElement.parentNode.appendChild(clickToExpand);
			runOnce = true;
		}	
	}
}

document.addEventListener("DOMContentLoaded", function(e) { 
	if(!runOnce)
		main(); 
}, false);
