// ==UserScript==
// @name        Mn3njalnik grafi v2
// @namespace   mn3njalnik
// @description Prenovljeni grafi rezultatov anket na Mn3njalniku
// @include     http://www.joker.si/mn3njalnik/index.php?showtopic=*
// @version     1.1.1
// @grant       none
// @require		https://raw.githubusercontent.com/shrx/ChartNew.js/master/ChartNew.js
// ==/UserScript==


var divAnketa = document.getElementsByClassName('poll_question voted');

Array.prototype.rotate = function(n) {
    return this.slice(n, this.length).concat(this.slice(0, n));
}

var i;
var options = {
    scaleFontColor: "#000",
    barValueSpacing: 1,
    scaleShowGridLines : false,
    graphMin : 0
};

for (i = 0; i < divAnketa.length; i++) {

	var glasovi = divAnketa[i].getElementsByClassName('votes');
	var odgovori = divAnketa[i].getElementsByClassName('answer');
	var j;
	var x = [];
	var y = [];
	var lenj = odgovori.length;
	for (j = 0; j < lenj; j++) {
		y[lenj-j-1] = glasovi[j].innerHTML.split("(")[1].split(" ")[0]*1;
		x[lenj-j-1] = odgovori[j].innerHTML+" "+glasovi[j].innerHTML;
	}

	var data = {
		labels : x,
		datasets : [
			{
			fillColor : [ "rgba(88, 125, 229, 0.7)", "rgba(232, 81, 62, 0.7)", "rgba(247, 155, 21, 0.7)", "rgba(114, 177, 39, 0.7)" ].reverse().rotate(4-(x.length % 4)),
			strokeColor : [ "rgb(88, 125, 229)", "rgb(232, 81, 62)", "rgb(247, 155, 21)", "rgb(114, 177, 39)" ].reverse().rotate(4-(x.length % 4)),
			data : y
			}
		]
	};

	var prostor = divAnketa[i].getElementsByTagName('ol')[0];
	prostor.innerHTML = '<canvas id="myChart'+i+'" width="'+Math.min((divAnketa[i].offsetWidth-50),800)+'" height="'+(lenj*15+35)+'"></canvas>';
	var ctx = document.getElementById("myChart"+i).getContext("2d");
	var myNewChart = new Chart(ctx).HorizontalBar(data,options);
}
