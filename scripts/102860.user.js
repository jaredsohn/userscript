// ==UserScript==
// @name           Web Numbr - Hovering data panel
// @description    Displays the graph's value at the current cursor position
// @namespace      LWChris
// @include        http://webnumbr.com/*.graph
// @include        http://webnumbr.com/*.graph.*
// @require        http://userscripts.org/scripts/source/86768.user.js
// ==/UserScript==

var Canvas; var Wid = 0, MsPerPx = 1, Span = 1, Offset = 1; var Points = new Array();
var Edges = new Array(); // 0 = Left, 1 = Top, 2 = Width, 3 = Height
window.div = document.createElement("div");
var divStyle = "position:absolute;text-align:right;cursor:crosshair;display:inline;z-index:100;border:1px solid gray;box-shadow:2px 2px 3px gray;background-color:#FFFFEC;opacity:0.85;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font:8pt Arial;";
window.div.setAttribute("style", divStyle);
d.body.appendChild(window.div);
window.bar = document.createElement("div");
divStyle = "position:absolute;cursor:crosshair;display:inline;z-index:90;width:1px;top:0px;background-color:black;opacity:0.25";
window.bar.setAttribute("style", divStyle);
d.body.appendChild(window.bar);

Expand = function (value) {
	return (value < 10) ? "0"+value : value;
}

Format = function (value) {
	var Int = parseInt(value);
	value = value.toString();
	var D = (value.indexOf(".") > -1) ? value.substring(value.indexOf(".")+1) : "";
	if (Math.abs(Int) >= 10000) {
		var T = Int.toString();
		value = T.substring(0, T.length%3);
		T = T.substring(value.length);
		var C = (value.length > 0) ? "," : "";
		while (T.length > 0) {
			value += C+T.substring(0, 3);
			T = T.substring(3);
			C = ",";
		};
	} else {
		value = Int.toString();
	};
	if (D) {
		value += "." + ((D.length-3) > 0) ? Math.round(parseInt(D)/Math.pow(10, D.length-3)) : D;
	}
	return value;
}

mkDate = function (time) {
	var D = new Date(time*1000);
	return D.getFullYear()+"/"+Expand(D.getMonth()+1)+"/"+Expand(D.getDate())+", "+Expand(D.getHours())+":"+Expand(D.getMinutes());
}

pushFwd = function (m, time, value) {
	var Data = new Array(time, value);
	Points.push(Data);
}

getClosestIndex = function (tryIndex, selTime) {
	var Diff = Math.abs(selTime-Points[tryIndex][0]);
	var LDiff = (tryIndex > 0) ? Math.abs(selTime-Points[tryIndex-1][0]) : Diff+1;
	var RDiff = (tryIndex < Points.length-1) ? Math.abs(selTime-Points[tryIndex+1][0]) : Diff+1;
	if (LDiff < Diff ) {
		var Index = getClosestIndex(tryIndex-1, selTime);
	} else {
		var Index = (RDiff < Diff) ? getClosestIndex(tryIndex+1, selTime) : tryIndex;
	};
	return Index;
}

getData = function (X) {
	var DiffTime = X*MsPerPx;
	var Index = Math.round(X/Edges[2]*(Points.length-1));
	Index = getClosestIndex(Index, DiffTime+Offset);
	var Left = Math.round((parseInt(Points[Index][0])-Offset)/MsPerPx)+Edges[0];
	window.bar.style.left = Left.toString()+"px";
	return mkDate(Points[Index][0])+"<br /><b>"+Format(Points[Index][1])+"</b>";
}

initAll = function () {
	var DataString = STag(Tag("body"), "script", 3).innerHTML;
	DataString = DataString.substring(DataString.lastIndexOf("}}")+5);
	DataString = DataString.substr(0,DataString.lastIndexOf("]]")+1)+",";
	if (DataString != ",") {
		Canvas = Tag("canvas", 1);
		DataString.replace(/\[([0-9]+),([0-9\.-]+)\],/g, pushFwd);
		window.resized();
		window.addEventListener("mouseover", window.resized, true);
		window.addEventListener("mouseout", window.mouseOut, true);
		window.addEventListener("mousemove", window.mouseMove, false);
	};
}

window.resized = function (evt) {
	if (evt != null && evt.target == window.bar) return;
	Canvas = Tag("canvas", 1);
	var S = Class("tickLabels").lastChild.style.width;
	Edges[0] = parseInt(S.substring(0, S.indexOf("px")))+5;
	Edges[1] = 7;
	S = ID("plot").style.width;
	Edges[2] = parseInt(S.substring(0, S.indexOf("px")))-9-Edges[0];
	S = ID("plot").style.height;
	Edges[3] = parseInt(S.substring(0, S.indexOf("px")))-25;
	Canvas.style.cursor = "crosshair";
	Canvas.style.left = Edges[0]+"px";
	Canvas.style.top = Edges[1]+"px";
	Canvas.style.width = Edges[2]+"px";
	Canvas.style.height = Edges[3]+"px";
	window.bar.style.left = Edges[0]+"px";
	window.bar.style.top = Edges[1]+2+"px";
	window.bar.style.height = Edges[3]-3+"px";
	Offset = parseInt(Points[0][0]);
	Span = parseInt(Points[Points.length-1][0])-Offset;
	MsPerPx = Span/Edges[2];
}

window.mouseOut = function (evt) {
	t = evt.target;
	if (! (t == Canvas || t == window.div || t == window.bar)) {
		window.div.style.display = "none";
		window.bar.style.display = "none";
	}
}

window.mouseMove = function (evt) {
	window.event = evt;
	var t = window.event.target;
	if (t != Canvas && t != window.div && t != window.bar) {
		window.div.style.display = "none";
		window.bar.style.display = "none";
		return;
	};
	var X = window.event.clientX+window.scrollX;
	if (t != window.bar) {
		window.div.innerHTML = getData(X-Edges[0]);
	}
	var Wid = (window.div.clientWidth == 0) ? Wid : Math.ceil(window.div.clientWidth/2);
	X -= Wid;
	if (X < Edges[0]) {
		X = Edges[0]
	} else {
		if (X > Edges[0]+Edges[2]-2*Wid) {
			X = Edges[0]+Edges[2]-2*Wid
		};
	};
	Y = window.event.clientY+window.scrollY-48;
	if (Y < Edges[1]) {
		Y+=60;
	};
	window.div.style.left = X.toString()+"px";
	window.div.style.top = Y.toString()+"px";
	window.div.style.display = "inline";
	window.bar.style.display = "inline";
}

window.addEventListener("load", initAll, false);