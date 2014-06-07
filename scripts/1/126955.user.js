// ==UserScript==
// @name    animeka
// @author      spaghi
// @include     http://www.animeka.com/animes/*
// @include     http://animeka.com/animes/*
// @exclude		http://www.animeka.com/animes/detail/*
// @exclude		http://animeka.com/animes/detail/*
// ==/UserScript==

var nbAnimes = document.getElementsByClassName("animeslegend").length;
for (i=0;i<=nbAnimes-1;i++) {
	chargePage(i);
}
function chargePage (i) {
	var elem = document.getElementsByClassName("animeslegend")[i];
	elem.style.background = "url(http://www.animeka.com/_img/cache/animes/animesbg.gif)";
	var elemTr = elem.parentNode.previousSibling.firstChild.getElementsByTagName("tbody")[1].firstChild;
	elemTr.lastChild.previousSibling.width = "400px";
	elemTr.innerHTML += '<td rowspan="6"  valign="top" ><div class="statz" >'+
							'<canvas width="10" height="10"></canvas><canvas width="10" height="10"></canvas>'+
							'<br><canvas width="10" height="10"></canvas></div></td>';
	var elemHref = elem.getElementsByTagName("a");
	var indexHref = document.getElementsByClassName("animestitle")[i].firstChild.href;
	if (elemHref[2]) {
		var reg = /[\d]+/;
		var imageUrl = "http://www.animeka.com/animes/" + reg.exec(elemHref[2].href) + ".png";
		draw(imageUrl, 0, i, -1, -5, 95, 15);
		draw(imageUrl, 1, i, -1, -20, 95, 15);
		draw(imageUrl, 2, i, -102, -20, 272, 78);
	}
	elem.innerHTML += '<div style="float:left; height:100%;"><div style="position:relative;top:20%;">'+
					'<input value="'+unescape("D%E9tails%20%u2193")+'" type="submit" class="inputz" style="vertical-align:middle;">'+
					'<img src="http://forum-images.hardware.fr/icones/mm/wait.gif" align="right" style="display:none;" class="imgz"></div></div>';
	document.getElementsByClassName("inputz")[i].addEventListener("click", function() {
		if (!document.getElementById("cont_"+i)) {
			chargeDetail(i, indexHref); 
		} else if (document.getElementById("cont_"+i) && document.getElementById("cont_"+i).style.display=="none") {
			document.getElementById("cont_"+i).style.display="block";
			this.value = unescape("D%E9tails%20%u2191");
		} else {
			document.getElementById("cont_"+i).style.display="none";
			this.value = unescape("D%E9tails%20%u2193")
		}
	}, false);
	var chargeDetail = function (i, indexHref) {
		document.getElementsByClassName("imgz")[i].style.display = "block";
		GM_xmlhttpRequest({
			method: 'POST',
			url: indexHref,
			onload: function (responseDetails) {
				if (responseDetails.status == 200) {					
					document.getElementsByClassName("imgz")[i].style.display = "none";
					document.getElementsByClassName("inputz")[i].value = unescape("D%E9tails%20%u2191");
					var doc = document.createElement("div");
					doc.innerHTML = responseDetails.responseText;
					doc = doc.getElementsByClassName("animesindex")[1].firstChild;
					doc.id = "cont_" + i;
					doc.style.width = "100%";
					var subTitle;
					while (subTitle = doc.getElementsByClassName("animessubtitle")[0]) {
						subTitle.style.fontWeight = "bold";
						subTitle.style.color = "brown";
						subTitle.className = "animestxt";
						
					}
					while (doc.lastChild.firstChild.textContent != "Avis des visiteurs") doc.removeChild(doc.lastChild);
					doc.removeChild(doc.lastChild);
					var elemTbody = document.getElementsByClassName("animeslegend")[i].parentNode.parentNode;
					elemTbody.appendChild(doc);
				}
			}
			//onreadystatechange: function(){}
		});
	}
}
function draw(imageUrl, y, i, xPos, yPos, wPos, hPos) {
	var statz = document.getElementsByClassName("statz")[i];
	var canvas = statz.getElementsByTagName("canvas")[y];
	canvas.width = wPos;
	canvas.height = hPos;
	var ctx = canvas.getContext("2d");
	var img = new Image();
	img.src = imageUrl;
	img.addEventListener("load", function() {
		ctx.drawImage(img, xPos, yPos);
	}, false);
}
