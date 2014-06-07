// ==UserScript==
// @name           fbzw uni script
// @description    uni script for facebook zedwars modified from hobowars uni script
// @include        http://www.zedwars.com/fb/university.php*
// ==/UserScript==

// If a stat is trained, continue to train that stat until you run out of awake, or money
var auto = 1; //0=disabled, 1=enabled;

var links, imgs, maxElement;

var  contents = document.getElementById("content");

if(contents){
	if(contents.textContent.match('Your goal is to.*')){

		var tables = contents.getElementsByTagName("table");
		links = tables[0].getElementsByTagName("a");
		imgs = tables[1].getElementsByTagName("img");

		if(links.length<8||imgs.length<16){
			return;
		}else if(auto && links.length>9){
			var hint= contents.getElementsByTagName("font")[0].textContent;
			var hint1= contents.getElementsByTagName("font")[1].textContent;
			var link = links[8].href;
			link = link.substring(0,link.length-3);
			if(hint1.match('You do not.*')){
				return;
			}else if(hint.match('.*speed')){
				location.href = link + 'spd';
				return;
			}else if(hint.match('.*power')){
				location.href = link + 'pow';
				return;
			}else if(hint.match('.*strength')){
				location.href = link + 'str';
				return;
			}else if(hint.match('.*intelligence')){
				location.href = link + 'int';
				return;
			}
		}
		
		var info = tables[0].rows[0].cells[1];

		maxElement = document.createElement("b");
		info.insertBefore(maxElement, info.firstChild);

		info.appendChild(document.createTextNode("\u2022 "));

		var solveLink = document.createElement("a");
		solveLink.innerHTML='<a href=#>Solve</a>';
		solveLink.addEventListener("click", solve, true);
		info.appendChild(solveLink);
	}
}

function solve() {

	var isValid= links && (links.length>=8) && imgs && (imgs.length>=16) && maxElement;
	if(!isValid){
		return;
	}

	var dots = Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0); // index = c+r*4

	for(var i=0;i<16;++i){
		if(imgs[i].src.match(".*uni1.gif")){
			dots[i]=2;
		}else if(imgs[i].src.match(".*uni0.gif")){
			dots[i]=1;
		}
	}

	var m = Array(0,0,0,0,0,0,0,0,0);//moves : col left=0 right=3, rows top=4 bottom=7
	var bm = Array(0,0,0,0,0,0,0,0,0);//best moves : col left=0 right=3, rows top=4 bottom=7
	var points, moves, maxPoints = 0, minMoves = 0;
	var g, y, p, r, c;
	for(m[0] = 0; m[0] < 3; ++m[0]) {
		for(m[1] = 0; m[1] < 3; ++m[1]) {
			for(m[2] = 0; m[2] < 3; ++m[2]) {
				for(m[3] = 0; m[3] < 3; ++m[3]) {

					for(r=0;r<4;++r){ //optimization for setting m[4-7]
						points=0;
						for(c=0,g=0,y=0;c<4;++c){
							t = (dots[c+r*4] + m[c])%3;
							points += t;
							g += (t==2);
							y += (t==1);
						}
						if(points>4){
							m[r+4] = (g==1?1:0);
						}else{
							m[r+4] = (y>1?1:2);
						}
					}

					points=0;
					for(c=0; c<4; ++c) {  
						for(r=0; r<4; ++r){
							points += (dots[c+r*4] + m[r+4] + m[c])%3;
						}
					}
					
					moves = m[0]+m[1]+m[2]+m[3]+m[4]+m[5]+m[6]+m[7];
					if((points > maxPoints) || (points == maxPoints && moves < minMoves)) {
						minMoves = moves;
						maxPoints = points;
						for(var i=0;i<8;++i){
							bm[i]= m[i];
						}
					}
				}
			}
		}
	}

	for(var i=0;i<8;++i){
		links[i].innerHTML = "<b>"+(bm[i]==0?"\u2022":bm[i])+"</b>";
	}


	maxElement.innerHTML='Max Points: <font size = "2" color = '+(maxPoints-16>11?'#006600':'#ff0000')+'> '+(maxPoints-16)+'</font>';

}