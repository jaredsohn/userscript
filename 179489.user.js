// ==UserScript==
// @name Dead Frontier Looting Map by HenlatozCR
// @include http://fairview.deadfrontier.com/onlinezombiemmo/index.php?page=21
// @version 0.5
// ==/UserScript==

var ow = 970;
var cw = window.innerWidth - ow;
var cpos = [ 1, 20 ];
var map = {
	url: "http://images2.wikia.nocookie.net/__cb20130207095110/deadfrontier/images/5/50/DF_Map.jpg",
	sq : 54,
	offsetX: 54,
	offsetY: 2,
	width: 49,
	height: 42,
	marks: []
};

var fit = [ Math.floor((cw - 100) / map.sq), 11 ];

function mapOffsets() {
	return [
		Math.min(map.width - fit[0], Math.max(0,cpos[0] - (1+fit[0])/2)),
		Math.min(map.height - fit[1], Math.max(0,cpos[1] - (1+fit[1])/2))
	];
}

function posRealToMap(pos) {
	var off = mapOffsets();
	return [ pos[0] - off[0], pos[1] - off[1] ];
}

function posMapToReal(pos) {
	var off = mapOffsets();
	return [ pos[0] + off[0], pos[1] + off[1] ];
}

function markSquare(pos,ty) {
	var mpos = posRealToMap(pos);
	var x = (mpos[0]) * map.sq + 1;
	var y = (fit[1] - mpos[1]) * map.sq;
	
	if(ty == "current_pos") {
		map.ctx.strokeStyle = "#ff0000";
		map.ctx.lineWidth = 1;
		map.ctx.strokeRect(x, y, map.sq, map.sq);
	} else if(ty == "cleared") {
		map.ctx.strokeStyle = "#00ff00";
		map.ctx.lineWidth = 1;
		map.ctx.beginPath();
		map.ctx.moveTo(x,y);
		map.ctx.lineTo(x+map.sq,y+map.sq);
		map.ctx.closePath();
		map.ctx.moveTo(x+map.sq,y);
		map.ctx.lineTo(x,y+map.sq);
		map.ctx.closePath();
		map.ctx.stroke();
	}
}

function redraw() {
	var zpos = posMapToReal([0,fit[1]]);
	var 	src_x = map.offsetX + (zpos[0] * map.sq),
			src_y = map.offsetY + (map.height - zpos[1]) * map.sq,
			w = fit[0] * map.sq,
			h = fit[1] * map.sq;
	
	map.ctx.drawImage(map.original, src_x, src_y ,w , h, 51, 0, w, h);
	map.ctx.drawImage(map.original, 0, src_y, 50, fit[1] * map.sq, 0, 0, 50, fit[1] * map.sq);
	map.ctx.drawImage(map.original, src_x, map.original.height - 50, fit[0] * map.sq, 50, 51, fit[1] * map.sq - 1, fit[0] * map.sq, 50);
	markSquare(cpos,"current_pos");

	var mins = posMapToReal([0,0]);
	var maxes = posMapToReal([fit[0],fit[1]]);	
	map.marks.forEach(function(mark) {
		if(mark.pos[0] < maxes[0] && mark.pos[0] > mins[0] && mark.pos[1] < maxes[1] && mark.pos[1] > mins[1]) {
			markSquare(mark.pos,mark.type);
		}
	});
}

function setMapMark(pos,type) {
	map.marks.push({pos: [pos[0],pos[1]], type: type});
	redraw();
}

function clearMapMarks() {
	map.marks = [];
	redraw();
}

// MAIN
function refit() {
	fit = [ Math.floor((cw - 100) / map.sq), 11 ];
	cw = window.innerWidth - ow;
	
	var DFContainer = document.body.getElementsByTagName("table")[0];
	DFContainer.style.position = "absolute";
	DFContainer.style.width = ow+"px";
	DFContainer.style.right = "0px";
	
	map.canvas.width = fit[0] * map.sq + 50;
	map.canvas.height = fit[1] * map.sq + 50;
}

var container = document.createElement("div");
container.setAttribute("id","DFMM");
container.style.position = "absolute";
container.style.top = "200px";
container.style.overflow = "hidden";
container.style.width = cw+"px";
container.style.height = (fit[1] * map.sq + 100) + "px";
document.body.appendChild(container);

var nbut = 0;
function genbutt(nam,cback) {
	var b = document.createElement("input");
	b.setAttribute("type","button");
	b.style.position = "absolute";
	b.style.top = "0px";
	b.style.left = (40 + nbut * 60)+"px";
	b.setAttribute("value",nam);
	b.addEventListener("click", cback , false);
	container.appendChild(b);
	nbut++;
}
genbutt("Atas",function() { if(cpos[1] == map.height) { return; } cpos[1]++; redraw(); });
genbutt("Bawah",function() { if(cpos[1] == 1) { return; } cpos[1]--; redraw(); });
genbutt("Kanan",function() { if(cpos[0] == 1) { return; } cpos[0]--; redraw(); });
genbutt("Kiri",function() { if(cpos[0] == map.width) { return; }  cpos[0]++; redraw(); });
nbut++;
genbutt("Silang",function() { setMapMark(cpos,"cleared"); });
genbutt("Desmarcar",function() { clearMapMarks(); });
nbut++;
genbutt("Ajustar",function() { refit(); redraw(); });

map.original = document.createElement('img');
map.original.src = map.url;
map.original.addEventListener("load", function() { redraw(); }, false);

map.canvas = document.createElement('canvas');
map.canvas.setAttribute("id","DFMMC");
map.canvas.style.position = 'absolute';
map.canvas.style.top = '50px';
map.canvas.style.left = '50px';
container.appendChild(map.canvas);
map.ctx = map.canvas.getContext("2d");

refit();