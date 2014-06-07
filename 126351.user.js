// ==UserScript==
// @name           Joy-NSFW
// @namespace      http://joyreactor.ru/user/iCare
// @include        http://joyreactor.ru/*
// ==/UserScript==

(function(){

	var style = document.createElement("style"); 
	style.setAttribute("type","text/css");
	style.innerHTML = ".uhead_share .close-psto{padding: 0 5px; margin:0 1px !important; border-radius: 3px; border: 1px solid transparent; text-decoration:none;} .close-psto:hover{font-weight: bold;  border: 1px solid #972D06;}"
	document.getElementsByTagName("head")[0].appendChild(style);
	
	
	function addLink(post){
		var elem = document.createElement("a");
		elem.setAttribute("class","close-psto");
		elem.setAttribute("href", "#" );
		elem.setAttribute("onclick", "return false;" );
		elem.innerHTML = "X";
		post.querySelector(".uhead_share").appendChild(elem);
		
		
		var callBack = function(){
			var link = post.querySelector(".hidden_link a");
			link && link.onclick && link.onclick(link);
			return false;
		};
		elem.addEventListener("click",callBack );
	}
	var hiddenLinks = document.querySelectorAll(".hidden_link a");
	if(!hiddenLinks || !hiddenLinks.length ){
		return;
	}
	var nodes = document.querySelectorAll(".article");
	for(var i=0,len=nodes.length; i<len; i++){
		addLink(nodes[i]);		
	}
	document.body.addEventListener('DOMNodeInserted', function(e) {
		if(e.target.getAttribute){
			var cls = e.target.getAttribute("class");
			if(cls === "close-psto"){
				return;
			}
			if(cls === "article post-normal"){
				addLink(e.target);
			}
		}		
		
	}, false); 
})();