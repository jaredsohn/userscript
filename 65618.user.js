// ==UserScript==
// @name Lepra pyani captcha
// @namespace http://leprosorium.ru
// @include http://leprosorium.ru/comments/*
// @include http://*.leprosorium.ru/comments/*
// @include http://leprosorium.ru/my/inbox/*
// @include http://leprosorium.ru/asylum/
// ==/UserScript==

function insertAfter(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}
function remove(el)
{
	el.parentNode.removeChild(el);
}

var yarr = document.getElementById("js-post-yarrr");
if(!yarr){
	yarr = document.querySelector("input[name='dopost']");
}
var my_yarr = document.createElement("img");

my_yarr.src = "http://img.dirty.ru/lepro/yarrr.gif";
my_yarr.addEventListener("click", function() {
	var comment = document.getElementById("comment_textarea");
	var sober = document.createElement("div");
	var checkbox = document.createElement("input");

	sober.align = "right"
	checkbox.type = "checkbox";
	checkbox.addEventListener('click', function(e) {
		if(e.target.checked){
			var realy_sober = document.createElement("div");
			var inner_div = document.createElement("div");
			var checkbox2 = document.createElement("input");

			realy_sober.align = "right";
			checkbox2.type = "checkbox";
			inner_div.innerHTML = "Я <b>действительно</b> трезвый";
			checkbox2.addEventListener('click', function() {
				var fair = document.createElement("div");
				var radio1 = document.createElement("input");
				var radio2 = document.createElement("input");
				var irony = document.createElement("span");
				var submit = function(){
					document.getElementById("comments-form").submit();
					remove(fair);
					remove(realy_sober);
					remove(sober);
				}
		
				fair.align = "right";
				radio1.type = "radio";
				radio2.type = "radio";
				radio1.addEventListener('click', submit, false);
				radio2.addEventListener('click', submit, false);				
				irony.className = "irony";
				irony.appendChild(document.createTextNode("Честно-честно!"));
				fair.appendChild(radio1);
				fair.appendChild(document.createTextNode("Честно-честно!"));
				fair.appendChild(radio2);
				fair.appendChild(irony);
				insertAfter(fair, realy_sober);
			}, false);
			inner_div.appendChild(checkbox2);
			realy_sober.appendChild(inner_div);
			insertAfter(realy_sober, sober);
		}
	}, false);
	sober.appendChild(document.createTextNode("Я уже протрезвел"));
	sober.appendChild(checkbox);
	if(location.href !== "http://leprosorium.ru/asylum/"){
		insertAfter(sober, comment);	
	} else {
		insertAfter(sober, document.querySelector("hr"));
	}
}, true);
insertAfter(my_yarr, yarr);
yarr.style.display = "none";
