// ==UserScript==
// @name           SJ Episoden Flash
// @description    Speichert deine zuletzt gesehene Folge
// @include        http://serienjunkies.org/*
// @exclude        http://serienjunkies.org/
// ==/UserScript==

x = GM_getValue('x', '10px');
y = GM_getValue('y', '10px');

GM_addStyle("#box { line-height:13px;font-weight:bold;font-size:0.8em;left:"+x+";top:"+y+";text-align:center !important;opacity:0.75;color:#436472 !important;font-family:Arial, Times, Times New Roman, sans-serif !important;z-Index:10;position:fixed;width:40px;height:30px;margin-left:auto;margin-right:auto;display:block;visibility:visible;-moz-user-select:none;}");
GM_addStyle("#Input { color:#8A3207; font-size:150%;line-height:0px; -moz-user-select:none; }");
GM_addStyle(".bttn_pl { color:#3E6D8E;background-color:transparent;border:0px;font-size:150%;cursor:pointer;}");
GM_addStyle(".bttn_mi { color:#3E6D8E;background-color:transparent;border:0px;font-size:150%;cursor:pointer;}");

var serLink  = location.href;
var serLink2 = serLink.split("/");
var serNm    = serLink2[4];

whLnk = GM_getValue(serNm, 0);


function setEpisodeHi(){
whLnk = GM_getValue(serNm, 0);
var whLnkHi = (whLnk + 1);
GM_setValue(serNm, whLnkHi);

     var nEpi = document.getElementById("Input");
     nEpi.firstChild.nodeValue = whLnkHi;
}
function setEpisodeLo(){
whLnk = GM_getValue(serNm, 0);
if (!whLnk){
var whLnkLo = 0;
}else{
var whLnkLo = (whLnk - 1);
GM_setValue(serNm, whLnkLo);

     var nEpi = document.getElementById("Input");
     nEpi.firstChild.nodeValue = whLnkLo;
}
}

                            var table = '';
				table += "<table align='center' style='border:1px solid #436472;background-color:#d0e7f1'><tr><td style='background-color:#fff;color:#436472;-moz-user-select:none;cursor:move;'>Folge</td></tr>";
                                table += "<tr><td><input type='button' style='' class='bttn_pl' type='button' id='bttn_pl' value='^'></td></tr><tr><td id='Input'>"+whLnk+"</td></tr><tr><td><input type='button' class='bttn_mi' id='bttn_mi' value='v'></td></tr>";
				table += "</table>";
				div1 = document.createElement('div');
				div1.id = 'box';
				div1.style.display = "none";
				div1.innerHTML = table;
                                document.body.appendChild(div1);
                                document.getElementById('box').style.display='block';
				document.getElementById('bttn_pl').addEventListener('click', setEpisodeHi,false);
				document.getElementById('bttn_mi').addEventListener('click', setEpisodeLo,false);


function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener)
		obj.addEventListener(evt,fn,false);
	else if (obj.attachEvent)
		obj.attachEvent('on'+evt,fn);
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener)
		obj.removeEventListener(evt,fn,false);
	else if (obj.detachEvent)
		obj.detachEvent('on'+evt,fn);
}


// the dragDrop object

dragDrop = {
	initialMouseX: undefined,
	initialMouseY: undefined,
	startX: undefined,
	startY: undefined,
	draggedObject: undefined,
	
	initElement: function (element) {
		if (typeof element == 'string')
			element = document.getElementById(element);
                addEventSimple(element,'mousedown',dragDrop.startDragMouse);

	},

	startDragMouse: function (e) {
		dragDrop.startDrag(this);
		var evt = e || window.event;
		dragDrop.initialMouseX = evt.clientX;
		dragDrop.initialMouseY = evt.clientY;
		addEventSimple(document,'mousemove',dragDrop.dragMouse);
		addEventSimple(document,'mouseup',dragDrop.releaseElement);
		return false;
	},

	startDrag: function (obj) {
		if (dragDrop.draggedObject)
			dragDrop.releaseElement();
		dragDrop.startX = obj.offsetLeft;
		dragDrop.startY = obj.offsetTop;
		dragDrop.draggedObject = obj;
		obj.className += ' dragged';
	},
	dragMouse: function (e) {
		var evt = e || window.event;
		var dX = evt.clientX - dragDrop.initialMouseX;
		var dY = evt.clientY - dragDrop.initialMouseY;
		dragDrop.setPosition(dX,dY);
		return false;
	},
	setPosition: function (dx,dy) {
		dragDrop.draggedObject.style.left = dragDrop.startX + dx + 'px';
		dragDrop.draggedObject.style.top = dragDrop.startY + dy + 'px';
        },

	releaseElement: function() {
		removeEventSimple(document,'mousemove',dragDrop.dragMouse);
		removeEventSimple(document,'mouseup',dragDrop.releaseElement);
		dragDrop.draggedObject.className = dragDrop.draggedObject.className.replace(/dragged/,'');
		dragDrop.draggedObject = null;
                var x = document.getElementById('box').style.left;
                var y = document.getElementById('box').style.top;
                if(!x==''){
                GM_setValue('x', x);
                GM_setValue('y', y);
	}

} }


dragDrop.initElement(div1);
