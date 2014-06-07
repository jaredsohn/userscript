// ==UserScript==
// @name          GrepomapsJumper
// @namespace
// @description   grepolismaps - Link zu grepolis
// @version       0.1
// @include       http://*.grepolismaps.org/*
// @include		  http://*.grepolis.com/game/map*
// ==/UserScript==

// Teil 1 - grepolismaps

if (window.location.hostname.indexOf("grepolismaps") >0 )
{
	scriptEl=document.createElement("script");
	scriptEl.setAttribute('type','text/javascript');
	scriptEl.setAttribute("id","gtio_script");
	scriptEl.appendChild(document.createTextNode("\
		zoom=1;\
		document.onmousemove = gtio_update_coord;\
		\
		function gtio_update_title(x,y,c)\
		{\
			var title=document.title;\
			title=title.replace(/\\(.*/, '');\
			if (x==-1)\
				document.title=title;\
			else\
				document.title=title+' ('+x+','+y+')  '+c;\
		};\
		function gtio_update_coord(event)\
		{\
			x = event.pageX;\
			y = event.pageY;\
			map=document.getElementById('map');\
			a=getPosition(map);\
			if (y<a.y || x<a.x || x>(a.x+1000) || y>(a.y+1000))\
			{\
				gtio_update_title(-1,-1);\
			}\
			else\
			{\
				imgx=x-a.x;\
				imgy=y-a.y;\
				gamex=imgx*width/1000+leftx;\
				gamey=imgy*width/1000+uppery;\
				\
				var x1=400;\
				var x2=700;\
				var xTiles=9;\
				var xChars='ABCDEFGHIKLMNOPQRSTUVWXYZ';\
				\
				var y1=500;\
				var y2=800;\
				var yTiles=9;\
				\
				x=gamex;\
				y=gamey;\
				\
				var quadrXSize,quadrYSize;\
				quadrXSize=(x2-x1)/xTiles;\
				quadrYSize=(y2-y1)/yTiles;\
				\
				var coords,dx,xPos;\
				if (x<x1 || x>x2 || y<y1 || y>y2)\
				{\
					coords='[??]';\
				}\
				else\
				{\
					dx=x-x1;\
					xPos=Math.floor(dx/quadrXSize);\
					coords=xChars[xPos];\
					dy=y-y1;\
					yPos=Math.floor(dy/quadrYSize)+1;\
					coords='['+xChars[xPos]+yPos+']';\
				}\
				gtio_update_title(Math.floor(gamex),Math.floor(gamey),coords);\
			}\
		}\
		function getPosition(element)\
		 {\
		   var elem=element,tagname='',x=0,y=0;\
		   while ((typeof(elem)=='object')&&(typeof(elem.tagName)!='undefined'))\
		   {\
			 y+=elem.offsetTop;\
			 x+=elem.offsetLeft;\
			 tagname=elem.tagName.toUpperCase();\
			 if (tagname=='BODY')\
			   elem=0;\
			 if (typeof(elem)=='object')\
			   if (typeof(elem.offsetParent)=='object')\
				 elem=elem.offsetParent;\
		   }\
		   position=new Object();\
		   position.x=x;\
		   position.y=y;\
		   return position;\
		 }\
		 function gtio_jump(event)\
		 {\
			if (event.button==0)\
			{\
				map=document.getElementById('map');\
				a=getPosition(map);\
				x = event.pageX;\
				y = event.pageY;\
				map=document.getElementById('map');\
				a=getPosition(map);\
				if (y<a.y || x<a.x || x>(a.x+1000) || y>(a.y+1000))\
				{\
					gtio_update_title(-1,-1);\
				}\
				else\
				{\
					imgx=x-a.x;\
					imgy=y-a.y;\
					gamex=imgx*width/1000+leftx;\
					gamey=imgy*width/1000+uppery;\
					window.open('http://'+world+'.grepolis.com/game/map?gtio_jump_to_x='+gamex+'&gtio_jump_to_y='+gamey,'bla');\
				}\
			 }\
		 };\
		 document.getElementById('map').onmousedown=gtio_jump;\
		 (function()\
		 {\
			el=document.evaluate(\
				\"//form[@id='settingsForm']/select/option[@selected='selected']\",\
				document,\
				null,\
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,\
				null);\
			zoom=el.snapshotItem(0).getAttribute('value');\
			midx=document.getElementById('settingsCenterX').value;\
			midy=document.getElementById('settingsCenterY').value;\
			if (zoom==32)\
				width=32;\
			else if (zoom==16)\
				width=64;\
			else if (zoom==8)\
				width=128;\
			else if (zoom==4)\
				width=256;\
			else if (zoom==2)\
				width=512;\
			else if (zoom==1)\
				width=1024;\
			leftx=midx-(width/2);\
			uppery=midy-(width/2);\
			world=window.location.hostname.replace(/http/,'');\
			world=world.replace(/.grepolismaps.org/,'');\
		 })();\
		"));// ie may needs (null == scriptEl.canHaveChildren || scriptEl.canHaveChildren) ? scriptEl.text = txt;
		
	document.body.appendChild(scriptEl);
}

// Teil 1 - grepolis

if (window.location.hostname.indexOf("grepolis.com") >0 )
{
	var search=window.location.search;
	var x=/^.*gtio_jump_to_x=([0-9]+).*/.exec(search);
	var y=/^.*gtio_jump_to_y=([0-9]+).*/.exec(search);
	if (x && y)
	{
		var scriptEl = document.createElement("script");
		scriptEl.setAttribute('type','text/javascript');
		scriptEl.appendChild(document.createTextNode("\
			function gtio_jump()\
			{\
				WMap.jumpToPos("+x[1]+","+y[1]+");\
			};\
			(function()\
			{\
					window.setTimeout(gtio_jump, 10);\
			})();\
		"));// ie may needs (null == scriptEl.canHaveChildren || scriptEl.canHaveChildren) ? scriptEl.text = txt;
		document.body.appendChild(scriptEl);
	}
}