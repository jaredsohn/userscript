// ==UserScript==
// @name        Command & Conquer TA Coordinates Utility
// @description Small tool that allow you to copy/paste coords easily
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @include     https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.0.0
// @grant none
// @author zdoom
// @updateURL https://userscripts.org/scripts/source/175773.meta.js
// @downloadURL https://userscripts.org/scripts/source/175773.user.js
// ==/UserScript==

(function()
{
	var injectScript = function()
	{
		var zdoom_contextMenu = {
			mapSize: null,
			isCopyOpen: false,
			isPasteOpen: false,
			copyCont: null,
			pasteCont: null,
			isCopyFocused: false,
			isPaseFocused: false,
			copiedText: ''
		};
		
		createContainer = function()
		{
			var div = document.createElement('div');
			div.style.position = 'absolute';
			div.style.zIndex = '100000';
			div.style.padding = '10px';
			div.style.width = '100px';
			div.style.border = '2px solid #eee';
			div.style.borderRadius = '8px';
			div.style.background = '#222';
			div.style.boxShadow = '3px 3px 3px 0 rgba(0,0,0,0.6)';
			div.style.opacity = 0.85;
			return div;
		};
		
		createCanvas = function(x,y)
		{
			var width = zdoom_contextMenu.mapSize;
			var s = 100 / width, circles = [53, 85, 113, 145, 242];
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			canvas.width = 100;
			canvas.height = 100;
			ctx.scale(s,s);
			
			for (var i = 0; i < circles.length; i++) {
				var r = circles[i] * width / 500;
				ctx.beginPath();
				ctx.arc(500, 500, r, 0, Math.PI * 2, true);
				ctx.lineWidth = (i == 4) ? 1 / s : 0.5 / s;
				ctx.strokeStyle = '#8ce9ef';
				ctx.stroke();
				ctx.closePath();
			}
			
			for(var i = 0; i < 8; i++){
				var r = circles[4] * width / 500;
				var a = (Math.PI * i / 4) - Math.PI / 8;
				ctx.beginPath();
				ctx.moveTo(500,500);
				ctx.lineTo((r * Math.cos(a)) + 500, (r * Math.sin(a)) + 500);
				ctx.lineWidth = 0.5/s;
				ctx.strokeStyle = '#8ce9ef';
				ctx.stroke();
				ctx.closePath();
			}
			
			var grd=ctx.createLinearGradient(x, y-2/s, x, y+2/s);
				grd.addColorStop(0, "#ffc48b");
				grd.addColorStop(1, "#d5a677");
			ctx.beginPath();
			ctx.arc(x, y, 2/s, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fillStyle = grd;
			ctx.fill();
			ctx.lineWidth = 0.5/s;
			ctx.strokeStyle = '#000000';
			ctx.stroke();
			ctx.closePath();
			return canvas;
		};
		
		createButton = function(txt)
		{
			var btn = document.createElement('button');
			btn.style.width = '100px';
			btn.innerHTML = txt;
			btn.style.borderRadius = '5px';
			btn.style.border = '1px solid #666';
			btn.style.fontSize = '10px';
			btn.style.background = '#333';
			btn.style.color = '#aaa';
			btn.style.cursor = 'pointer';
			btn.onmouseover = function()
			{
				this.style.background = '#555';
				this.style.color = '#ddd';
				this.style.border = '1px solid #999';
			}
			btn.onmouseout = function()
			{
				this.style.background = '#333';
				this.style.color = '#aaa';
				this.style.border = '1px solid #666';
			}
			return btn;
		};
		
		
		var onHover = function(event)
		{
			var elm = event.target;
			var tag = elm.tagName;
			var html = elm.innerHTML;
			var x = event.pageX;
			var y = event.pageY;
			if(((tag == 'A') || (tag == 'B') || (tag == 'DIV')) && (html.match(/^\d+:\d+$/)))
			{
				if(zdoom_contextMenu.isCopyOpen) try {document.body.removeChild(zdoom_contextMenu.copyCont)}catch(e){};
				var coords = html.split(':');
				var cont = createContainer();
				var canvas = createCanvas(coords[0], coords[1]);
				var button = createButton('Copy');
				cont.appendChild(canvas);
				cont.appendChild(button);
				cont.style.left = x - 62 + 'px';
				cont.style.top = y - 154 + 'px';
				document.body.appendChild(cont);
				
				zdoom_contextMenu.isCopyOpen = true;
				zdoom_contextMenu.copyCont = cont;
				
				var removeCont = function()
				{
					try
					{
						if(document.body.hasChildNodes(cont)) document.body.removeChild(cont);
						zdoom_contextMenu.isCopyOpen = false;
						zdoom_contextMenu.isCopyFocused = false
						zdoom_contextMenu.copyCont = null;
					}
					catch(e)
					{
						;
					}
				};
				
				cont.onmouseover = function(){zdoom_contextMenu.isCopyFocused = true};
				cont.onmouseout = function(event)
				{
					zdoom_contextMenu.isCopyFocused = false;
					setTimeout(function()
					{
						if(zdoom_contextMenu.isCopyFocused) return;
						removeCont();
						zdoom_contextMenu.isCopyFocused = false;
					}, 50);
				};
				
				button.onclick = function()
				{
					removeCont();
					zdoom_contextMenu.copiedText = html;
				};
				
				elm.onmouseout = function()
				{
					if(!zdoom_contextMenu.isCopyOpen) return;
					var parent = elm;
					setTimeout(function()
					{
						parent.onmouseout = null;
						if(zdoom_contextMenu.isCopyFocused) return;
						removeCont();
					}, 100);
				}
			}
		};
		
		var onRightClick = function(event)
		{
			var elm = event.target;
			var tag = elm.tagName;
			var html = elm.innerHTML;
			var x = event.pageX;
			var y = event.pageY;
			if((tag == 'INPUT') || (tag == 'TEXTAREA'))
			{
				if(zdoom_contextMenu.isPasteOpen)  try {document.body.removeChild(zdoom_contextMenu.pasteCont)}catch(e){};
				var cont = createContainer();
				var button1 = createButton('Paste');
				var button2 = createButton('Pasee BB');
				var text = zdoom_contextMenu.copiedText;
				if(text != '')
				{
					var p = document.createElement('p');
					p.innerHTML = 'Copied text: <br/>' + text;
					p.style.marginBottom = '5px';
					p.style.color = '#aaa';
					p.style.fontFamily = 'tahoma';
					p.style.fontSize = '12px';
					
					cont.appendChild(p);
					cont.appendChild(button1);
					cont.appendChild(button2);
					document.body.appendChild(cont);
					cont.style.left = x - 52 + 'px';
					cont.style.top = y - 120 + 'px';
					
					zdoom_contextMenu.isPasteOpen = true;
					zdoom_contextMenu.pasteCont = cont;
					
					var removeCont = function()
					{
						try
						{
							if(document.body.hasChildNodes(cont)) document.body.removeChild(cont);
							zdoom_contextMenu.isPasteOpen = false;
							zdoom_contextMenu.isPasteFocused = false
							zdoom_contextMenu.pasteCont = null;
						}
						catch(e)
						{
							;
						}
					};
					
					cont.onmouseover = function(){zdoom_contextMenu.isPasteFocused = true};
					cont.onmouseout = function()
					{
						zdoom_contextMenu.isPasteFocused = false;
						setTimeout(function()
						{
							if(zdoom_contextMenu.isPasteFocused) return;
							removeCont();
						}, 50);
					};
					
					button1.onclick = function()
					{
						elm.value = elm.value + text;
						removeCont();
					};
					
					button2.onclick = function()
					{
						elm.value = elm.value + '[coords]' + text + '[/coords]';
						removeCont();
					};
					
					elm.onmouseout = function()
					{
						if(!zdoom_contextMenu.isPasteOpen) return;
						setTimeout(function()
						{
							this.onmouseout = null;
							if(zdoom_contextMenu.isPasteFocused) return;
							removeCont();
						}, 100);
					};
				}
			}
		}
		
		var init_zdoom_contextMenu = function()
		{
			try
			{
				var mapSize = ClientLib.Data.MainData.GetInstance().get_World().get_WorldWidth();
				console.log('waiting for wold map dimensions');
				if(mapSize && typeof(mapSize) == 'number')
				{
					zdoom_contextMenu.mapSize = mapSize;
					document.onmouseover = onHover;
					document.oncontextmenu = onRightClick;
				}
				else
				{
					setTimeout(init_zdoom_contextMenu, 5000);
				}
			}
			catch(e)
			{
				setTimeout(init_zdoom_contextMenu, 5000);
			}
		};
		
		init_zdoom_contextMenu();
	};
	
	function inject()
	{
		var script = document.createElement("script");
			script.innerHTML = "(" + injectScript.toString() + ")();";
			script.type = "text/javascript";
			if (/commandandconquer\.com/i.test(document.domain)) {
				document.getElementsByTagName("head")[0].appendChild(script);
				console.log('injected');
			}
	};
	
	inject();
		
})();