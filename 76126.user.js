// ==UserScript==
// @name Lepra show percent of "+"
// @namespace http://leprosorium.ru
// @include http://*.leprosorium.ru/*
// @include http://leprosorium.ru/*
// ==/UserScript==

function addPercent(){
	plus = Number(document.querySelector(".kgb_plus_users h4").innerHTML.replace("плюсов — ", ""));
	minus = Number(document.querySelector(".kgb_minus_users h4").innerHTML.replace("минусов — ", ""));
	total = plus + minus;
	header = document.querySelector(".kgb_header");
	
	if(header){
		header.appendChild(document.createTextNode("(" + Math.round(plus/total*100) + "%)"));
	}
}

ratings = document.querySelectorAll(".rating");
for(var i = 0, n = ratings.length; i < n; i += 1){
	ratings[i].addEventListener('click', function(e){
		function doAfterLoad(){
			if(document.getElementById("kgb") && 
			   document.getElementById("kgb").style.display !== "none"){
				addPercent();
			} else {
				setTimeout(doAfterLoad, 0);
			}
		}
		doAfterLoad();
	});
}
