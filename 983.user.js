// ==UserScript==
// @name          Orkut Paulinho-Connelly Replacer
// @description	  Replaces the photos of some loser with a random image of the beautiful Jennifer Connelly.
// @namespace     http://www.mamata.com.br/greasemonkey
// @include       http://orkut.com/*
// @include       http://www.orkut.com/*

//by Fabricio Zuardi (http://www.hideout.com.br)
// ==/UserScript==

(function() {
	var connelly_pics = ["http://biografieonline.it/img/bio/Jennifer_Connelly.jpg","http://www.celebrity-exchange.com/celebs/photos39/jennifer-connelly-2.jpg","http://www.djmcc.com/jconn.jpg","http://www.jennifer-connelly-pictures.com/pic32.jpg","http://www.celebrities.pl/jennifer_connelly/jennifer2.jpg","http://web.ukonline.co.uk/jennifer.connelly/scansc/connelly/jc-autoa13.jpg","http://i.imdb.com/Photos/Ss/0315983/CN-162-09.jpg","http://images.orkut.com/images4/mittel/61/12561.jpg","http://images.orkut.com/images8/mittel/61/144361.jpg","http://images.orkut.com/images11/mittel/48/182248.jpg","http://images.orkut.com/images3/mittel/78/902078.jpg"]
	var paulinho_users = ["279340","1699508"] //the number before .jpg of user's photo adjust according to your enemies
	var paulinho_elements = [];
	var connelly_container = document.createElement("div")
	for (var i =0;i<document.images.length;i++){
		for(var j=0;j<paulinho_users.length;j++){
			if(document.images[i].src.indexOf(paulinho_users[j])>-1){
				paulinho_elements.push(document.images[i])
			}
		}
	}
	connelly_container.innerHTML = "<td align=center valign=bottom bgcolor=#BFD0EA class=S><img src='"+connelly_pics[Math.round(Math.random()*connelly_pics.length)]+"' border=0 width=80 height=80></td>"
	for(var i=0;i<paulinho_elements.length;i++){
		paulinho_elements[i].parentNode.parentNode.parentNode.replaceChild(connelly_container, paulinho_elements[i].parentNode.parentNode)
	}
})();