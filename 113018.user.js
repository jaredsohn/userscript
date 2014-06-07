// ==UserScript==
// @name           DS - Clickable Midimap
// @namespace      DS
// @author	   still80
// @description    offers a nonPA clickable midimap (a non-castrated minimap)
// @include        http://de*.die-staemme.de/game.php*screen=map*
// @include        http://de*.die-staemme.de/game.php*screen=place*
// @exclude	   http://de*.die-staemme.de/game.php*screen=place*mode=call
// ==/UserScript==

/*
changelog
v0.0.1 - proof of concept
v0.0.2 - initial release
v0.0.3 - fix arrival time
*/

var zoomlevel = 2.5;
var lowestunit = 30;

var midimapactive = false;

// creates the magnifier on the map
function magnify(div, element, rel_x, rel_y, mpos_x, mpos_y ) {
	if(!document.getElementById('magnifier')) {
		var magnifier = document.createElement('div');
		magnifier.id = 'magnifier';
		magnifier.setAttribute('style', 'position:absolute; width:60px; height:60px;border: 2px solid #000;overflow: hidden;');
		var crossh = document.createElement('div');
		crossh.id = 'crossh';
		crossh.setAttribute('style', 'position:absolute; top: 29px; left: 29px; width:3px; height:3px;border: 1px solid red;overflow: hidden;');
		var ftext = document.createElement('span');
		ftext.id = 'ftext';
		ftext.setAttribute('style', 'position:absolute; top: 4px; left: 2px; overflow: hidden;font-weight: bold;color:#000;');
		var magnifier_img = document.createElement('img');
		magnifier_img.id = 'magnifier_img';
		magnifier_img.src = element.src;
		magnifier_img.width = parseInt(element.width)*zoomlevel;
		magnifier_img.height = parseInt(element.height)*zoomlevel;
	} else {
		var magnifier = document.getElementById('magnifier');
		var magnifier_img = document.getElementById('magnifier_img');
	}
	//pos div relative to the mousepointer
	magnifier.style.left = (rel_x+mpos_x+10)+"px";
	magnifier.style.top = (rel_y+mpos_y+10)+"px"; 

	//use margins to scroll zoomed image
	magnifier_img.style.marginLeft = '-'+(mpos_x*zoomlevel-34)+'px';
	magnifier_img.style.marginTop = '-'+(mpos_y*zoomlevel-31)+'px';

	if(!document.getElementById('magnifier')) {
		magnifier.appendChild(magnifier_img);
		magnifier.appendChild(crossh);
		magnifier.appendChild(ftext);
		div.appendChild(magnifier);
	}
	if(document.getElementById('ftext')) document.getElementById('ftext').innerHTML = target_x + '|' + target_y;
}

function mousemove(evt, div, mapimg, xofs, yofs, homexy, xmagoffset, ymagoffset, span) {
	mpos_x = evt.offsetX?(event.offsetX-100):evt.pageX-mapimg.offsetLeft-100;
	mpos_y = evt.offsetY?(event.offsetY-101):evt.pageY-mapimg.offsetTop-101;
	target_x = parseInt(xofs)+(Math.ceil((mpos_x)/5)-1);
	target_y = parseInt(yofs)+(Math.ceil((mpos_y)/5)-1);

	runtime = Math.sqrt( (Math.pow( Math.abs(homexy[0]-target_x), 2 ) + Math.pow( Math.abs(homexy[1]-target_y) , 2 )) )* lowestunit;
	servertime = document.getElementById('serverTime').innerHTML;
	serverdate = document.getElementById('serverDate').innerHTML;
	serverdate = serverdate.substring(3,5) + '/' + serverdate.substring(0,2) + '/' + serverdate.substring(6);//ds-date is an wild mixture of date formats
	server = new Date(serverdate + ' ' + servertime);
	arrivedate = new Date(server.getTime() + (runtime*60000));

	span.setAttribute('style', (arrivedate.getHours()>=0 && arrivedate.getHours()<8)?'color:red;':'color:black;');
	span.innerHTML=arrivedate.toLocaleString();
	magnify(div,mapimg,xmagoffset,ymagoffset,mpos_x,mpos_y);
}

function mouseclick(evt, mapimg, xofs, yofs) {
	mpos_x = evt.offsetX?(event.offsetX-100):evt.pageX-mapimg.offsetLeft-100;
	mpos_y = evt.offsetY?(event.offsetY-101):evt.pageY-mapimg.offsetTop-101;
	target_x = parseInt(xofs)+(Math.ceil((mpos_x)/5)-1);
	target_y = parseInt(yofs)+(Math.ceil((mpos_y)/5)-1);
	window.open('game.php?screen=place&x='+target_x+'&y='+target_y);
}

(function doit(){

	if (location.href.match('screen=place')) {
		//parses the querystring to fill coordinates
	   	var pairs = location.search.substring(1).split('&'); 
	   	for(var i = 0; i < pairs.length; i++) { 
			var val = pairs[i].split('=');
			if (val[0]=='x') document.getElementById('inputx').value=val[1];
			if (val[0]=='y') document.getElementById('inputy').value=val[1];
			//TODO: prefill farmtroup ? customizable ?
		}
	}

	if (location.href.match('screen=map')) {
		//offers an button to show non-castrated minimap
		var farmbutton = document.createElement('input');
		farmbutton.setAttribute('type', 'button');
		farmbutton.setAttribute('value', 'Midimap');

		//debug-span
		var dbgspan = document.createElement('span');
		dbgspan.innerHTML=' no info';

		//village
		var vil_txt = document.getElementById('menu_row2').getElementsByTagName('td')[2].innerHTML;
		if (vil_txt.indexOf('|')==-1) {//PA!! & 'Bonusdoerfer'
			for (i=4; i < document.getElementById('menu_row2').getElementsByTagName('td').length; i++) {
				vil_txt = document.getElementById('menu_row2').getElementsByTagName('td')[i].innerHTML;
				if (vil_txt.indexOf('|')!=-1) break;
			}
		}

		var vil_xy = vil_txt.substring(vil_txt.indexOf('(')+1, vil_txt.indexOf(')')).split('|');

		farmbutton.addEventListener('click', function(evt) {

			if (midimapactive) {
				document.getElementById('midimapdiv').parentNode.removeChild(document.getElementById('midimapdiv'));
				midimapactive = false;
			} else {

				var div = document.createElement('div');
				div.id = 'midimapdiv';
				div.setAttribute('style', 'position:absolute; top:100px; left:100px; width:500px; height:500px;border: 1px solid black;z-Index: 10000;opacity: 0.9;cursor: crosshair;');

				var maps = document.getElementById('minimap').getElementsByTagName('img');

				var mapimages = new Array();
				var xoffset = new Array();
				var yoffset = new Array();
				var canvas = new Array();
				var ctx = new Array();

				for (i=0;i<4;i++) {
					mapimages[i] = document.createElement('img');
					mapimages[i].src=maps[i].src;
					if (i==0) mapimages[i].setAttribute('style', 'position:absolute; top:0px; left:0px; width:250px; height:250px;');
					if (i==1) mapimages[i].setAttribute('style', 'position:absolute; top:250px; left:0px; width:250px; height:250px;');
					if (i==2) mapimages[i].setAttribute('style', 'position:absolute; top:0px; left:250px; width:250px; height:250px;');
					if (i==3) mapimages[i].setAttribute('style', 'position:absolute; top:250px; left:250px; width:250px; height:250px;');
					div.appendChild(mapimages[i]);

					//http://de*.die-staemme.de/page.php?page=topo_image&player_id=***&village_id=***&x=650&y=850&church=1&political=0&key=***&cur=***
					xoffset[i] = mapimages[i].src.substring(mapimages[i].src.indexOf('&x=')+3, mapimages[i].src.indexOf('&y='));
					yoffset[i] = mapimages[i].src.substring(mapimages[i].src.indexOf('&y=')+3).substring(0, mapimages[i].src.substring(mapimages[i].src.indexOf('&y=')+3).indexOf('&'));
					canvas[i] = document.createElement('canvas');
					ctx[i] = canvas[i].getContext('2d');
					ctx[i].drawImage(maps[i], 0, 0);
				}

				/*
				var objImageData = new Array();
				for (i=0; i<4;i++) objImageData[i] = ctx[i].getImageData(0, 0, maps[i].width, maps[i].height);	

				for (...) {
				imgdatapos = (((mpos_x-1) * 4) + ((mpos_y-1) * (250*4)));
				redvalue = objImageData[0].data[imgdatapos];
				if (redvalue==150) { //bb-grey is rgba(150,150,150,x)
				//do magic stuff
				}
				}
				*/

				mapimages[0].addEventListener('click', function(evt) {
					mouseclick(evt, mapimages[0], xoffset[0], yoffset[0]);
				}, false);

				mapimages[1].addEventListener('click', function(evt) {
					mouseclick(evt, mapimages[1], xoffset[1], yoffset[1]);
				}, false);

				mapimages[2].addEventListener('click', function(evt) {
					mouseclick(evt, mapimages[2], xoffset[2], yoffset[2]);
				}, false);

				mapimages[3].addEventListener('click', function(evt) {
					mouseclick(evt, mapimages[3], xoffset[3], yoffset[3]);
				}, false);

				//magnify:
				mapimages[0].addEventListener('mousemove', function(evt) {
					mousemove(evt, div, mapimages[0], xoffset[0], yoffset[0], vil_xy, 0, 0, dbgspan);
				}, false);
				mapimages[0].addEventListener('mouseout', function(evt) {
					if(document.getElementById('magnifier')) div.removeChild(document.getElementById('magnifier'));
				}, false);
				mapimages[1].addEventListener('mousemove', function(evt) {
					mousemove(evt, div, mapimages[1], xoffset[1], yoffset[1], vil_xy, 0, 250, dbgspan);
				}, false);
				mapimages[1].addEventListener('mouseout', function(evt) {
					if(document.getElementById('magnifier')) div.removeChild(document.getElementById('magnifier'));
				}, false);
				mapimages[2].addEventListener('mousemove', function(evt) {
					mousemove(evt, div, mapimages[2], xoffset[2], yoffset[2], vil_xy, 250, 0, dbgspan);
				}, false);
				mapimages[2].addEventListener('mouseout', function(evt) {
					if(document.getElementById('magnifier')) div.removeChild(document.getElementById('magnifier'));
				}, false);
				mapimages[3].addEventListener('mousemove', function(evt) {
					mousemove(evt, div, mapimages[3], xoffset[3], yoffset[3], vil_xy, 250, 250, dbgspan);
				}, false);
				mapimages[3].addEventListener('mouseout', function(evt) {
					if(document.getElementById('magnifier')) div.removeChild(document.getElementById('magnifier'));
				}, false);

				document.body.appendChild(div);
				midimapactive = true;
			}
		}, false);

		var add = document.getElementById('map_config');
		if (add) {add.parentNode.insertBefore(farmbutton,add);add.parentNode.insertBefore(dbgspan,add);}
	}

})();
