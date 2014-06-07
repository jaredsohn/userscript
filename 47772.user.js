// ==UserScript==
// @name           ranking size
// @namespace      pbr
// @include        http://goallineblitz.com/game/player_awards.pl?player_id=*
// @copyright      2009, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.06.11
// ==/UserScript==

var ranks = new Array();
do {
	var boxes = document.getElementsByClassName("player_rank_box");
	//console.log(boxes.length);
	var nlen = boxes[0].firstChild.innerHTML.length;
	nlen = nlen * 77/3;
	nlen = nlen.toFixed(0);
	nlen = Math.max(nlen, 77);

	boxes[0].setAttribute("style","width:"+(nlen)+"px");
	boxes[0].style.backgroundRepeat = "repeat-x";
	boxes[0].style.backgroundImage = "url(http://img197.imageshack.us/img197/9513/skillpointsboxcenter.png)";
	boxes[0].style.align = "center";

	var r = boxes[0].parentNode.removeChild(boxes[0]);
	ranks.push(r);
} while (boxes.length > 0);


var cont = document.getElementsByClassName("content_container")[1];
var blank = cont.removeChild(cont.getElementsByClassName("clear")[0]);
while (ranks.length > 0) {
	var span = document.createElement("span");
	span.appendChild(ranks.shift());
	cont.appendChild(span);
}
cont.appendChild(blank);

var ranks = document.getElementsByClassName("player_rank_box");
for (var i=0; i<ranks.length; i++) {
    ranks[i].style.marginTop = "0px";
    ranks[i].style.marginLeft = "0px";
    ranks[i].style.marginRight = "0px";

    var parent = ranks[i].parentNode;
	var left = document.createElement("div");
    left.setAttribute("style","float: left");
	left.style.width = "8px";
	left.style.height = "77px";
	left.style.backgroundImage = "url(http://img413.imageshack.us/img413/9877/skillpointsboxleft.png)";

	var right = document.createElement("span");
    right.setAttribute("style","float: left; align: right;");
	right.style.backgroundImage = "url(http://img198.imageshack.us/img198/9230/skillpointsboxright.png)";
	right.style.width = "8px";
	right.style.height = "77px";
    if (i == 6) {
        left.style.clear = "left";
    }
    right.style.marginRight = "3px";
    
    parent.insertBefore(left, ranks[i]);
    parent.insertBefore(right, ranks[i].nextSibling);
}




