// ==UserScript==
// @name		Dirty pyani captcha
// @version		0.1
// @namespace	http://dirty.ru/
// @description Мешает писать псто, если ты пьян. По мотивам http://userscripts.org/scripts/show/65618
// @include		http://dirty.ru/comments/*
// @include		http://*.dirty.ru/comments/*
// @include		http://dirty.ru/my/inbox/*
// @include		http://dirty.ru/write/
// @run-at		document-end
// ==/UserScript==

function insertAfter(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
  console.log(node)
  console.log(referenceNode)
}
function remove(el)
{
	el.parentNode.removeChild(el);
	console.log(el)
}

var yarr = document.getElementById("js-post-yarrr");
var subm = "js-comments_reply_form"

if(!yarr){
	yarr = document.querySelector("input[name='imageField']");
	subm = "js-new_inbox_form"
}
if(!yarr){
	yarr = document.querySelector("input[name='dopost']");
	subm = "dopost"
}

console.log(yarr)
console.log(subm)

var my_yarr = document.createElement("img");

my_yarr.src = "http://dirty.ru/i/yarrr.gif";
console.log("my_yarr")
insertAfter(my_yarr, yarr);
yarr.style.display = "none";

my_yarr.addEventListener("click", function() {
	var comment = document.getElementById("comment_textarea");
	var preview = document.querySelector("div[class='write_form_preview ']");
	
	var sober = document.createElement("div");
	var checkbox = document.createElement("input");

	sober.align = "right"
	sober.width = "627px"
	checkbox.type = "checkbox";
	
	sober.appendChild(document.createTextNode("Я уже протрезвел"));
	sober.appendChild(checkbox);
	
	if (subm == "dopost") {
		console.log("sober dopost")
		insertAfter(sober, preview);
	} else {
		console.log("sober")
		insertAfter(sober, comment);
	}
		
	checkbox.addEventListener('click', function(e) {
		if(e.target.checked){
			var realy_sober = document.createElement("div");
			var inner_div = document.createElement("div");
			var checkbox2 = document.createElement("input");

			realy_sober.align = "right";
			realy_sober.width = "627px"
			inner_div.width = "627px"
			checkbox2.type = "checkbox";
			inner_div.innerHTML = "Я <b>действительно</b> трезвый";
						
			inner_div.appendChild(checkbox2);
			realy_sober.appendChild(inner_div);
			console.log("realy_sober")
			insertAfter(realy_sober, sober);
			
			checkbox2.addEventListener('click', function() {
				var fair = document.createElement("div");
				var radio1 = document.createElement("input");
				var radio2 = document.createElement("input");
				var irony = document.createElement("span");
				
				if (subm == "dopost") {
					var submit = function(){
						document.querySelector("input[name='dopost']").click();
						remove(fair);
						remove(realy_sober);
						remove(sober);
					}
				} else {
					var submit = function(){
						document.getElementById(subm).submit();
						remove(fair);
						remove(realy_sober);
						remove(sober);
					}
				}
		
				fair.align = "right";
				fair.width = "627px"
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
				console.log("fair")
				insertAfter(fair, realy_sober);
			}, false);

		}
	}, false);
}, true);