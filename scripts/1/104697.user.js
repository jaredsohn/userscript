// ==UserScript==
// @name           GE 5 day average
// @namespace      GE5DAVG
// @description    Runescape Grand Exchance history with 5 day average line
// @include        http://services.runescape.com/m=itemdb_rs*viewitem.ws*
// ==/UserScript==
// Author:         Latogato   http://userscripts.org/users/233916
// Last change:    2011.06.26

function Input_avgday(){
	avgday=parseInt(prompt("Set day average",GM_getValue("avgday",avgday)));
	if (avgday>0) { GM_setValue("avgday",avgday); }	
}

if (GM_getValue("avgday") == null) GM_setValue("avgday",5);
var avgday=parseInt(GM_getValue("avgday",5));
GM_registerMenuCommand("GE5DAVG|Set average day", Input_avgday);

// script "warning" message and X-day average legend
var maxcoldays=document.body.innerHTML.substr(document.body.innerHTML.search("Grand Exchange History for the Last")+36,3).replace(/ /g,"");
document.body.innerHTML = document.body.innerHTML.replace("Grand Exchange History for the Last "+maxcoldays+" Days", "GE History for the Last "+maxcoldays+" Days - manipulated by GE5DAVG");
document.body.innerHTML = document.body.innerHTML.replace("Daily average","Daily average<\/div><div class=\"legend_bar inner_brown_box\"><div class=\"legend_box\" style=\"background: #EF21D6\"><\/div>"+avgday+"-day average");
maxcoldays=parseInt(maxcoldays);
	
// cut out legend word for better page format
document.body.innerHTML = document.body.innerHTML.replace("<div class=\"subheader\">Legend</div>","");

// get GE image object
var graph_cell = document.getElementById('item_graph_image').getElementsByTagName('tr')[0].getElementsByTagName('td')[1];
var geimg = graph_cell.firstChild;

// get GE image object image data with cross-domain call
GM_xmlhttpRequest({method: 'GET', 
	url: geimg.src,
	overrideMimeType: 'text/plain; charset=x-user-defined', 
	onload: 
	function(getimgdata)
	{
		// get GE image data
		imgdata='';
		for ( var i = 0, il = getimgdata.responseText.length; i < il; i++ )
			imgdata += String.fromCharCode( ( getimgdata.responseText[ i ].charCodeAt(0) & 0xff ) );
		imgdata = btoa(imgdata);
		
		//function to replace the image object with a drawable canvas after the image has been loaded with imgdata
		geimg.addEventListener( 'load', function() {

			var canvas = document.createElement('canvas');
			canvas.width=geimg.width;
			canvas.height=geimg.height;
			canvas.getContext("2d").drawImage(geimg,0,0);
			
			graph_cell.removeChild(geimg);
			graph_cell.appendChild(canvas);
					
			var ctx = canvas.getContext('2d');
			var canvasdata = ctx.getImageData(0, 0, canvas.width, canvas.height);
			
			var xarr=new Array(); var yarr=new Array(); var actcolday=0; var graphwidth=canvas.width-11;
			while (actcolday<=maxcoldays) {

				// search for daily columns
				x=Math.floor(graphwidth*actcolday/maxcoldays)+3;

				whilecolday=actcolday;			// default while condition
				while (whilecolday==actcolday){	// repeat if missed the daily line
				
					var y=0; var pix = (x + y * canvas.width) * 4;

					// search daily line pixel
					while (canvasdata.data[pix]!=239 && y<canvas.height) {
						y=y+1; var pix = (x + y * canvas.width) * 4 
					}

					if (y<canvas.height || x==Math.floor(graphwidth*actcolday/(maxcoldays)+3)-5) { //found or after 5 miss give up
				
						// possibly the daily line width is more than one pixel
						y2=y;  var pix = (x + y2 * canvas.width) * 4;
						while (canvasdata.data[pix]==239 && y<canvas.height) {
							y2=y2+1; var pix = (x + y2 * canvas.width) * 4
						}
				
						// calcualted daily line
						y=Math.round((y2-1+y)/2);
				
						// daily line coordinate
						xarr[actcolday]=x;
						yarr[actcolday]=y;
						actcolday++;
					}
					else x--; // somehow missed the daily line (mostly at the end of the graph or new items with few days only)
				}
				
			}

			// draw X days avg line
			skipdays=0; while (yarr[skipdays]==canvas.height) skipdays++; // skip days without daily line
			y=0; for ( var i= skipdays; i<avgday+skipdays; i++) y=y+yarr[i];
			
			ctx.lineWidth=2; ctx.strokeStyle='rgb(239,33,214)'; ctx.beginPath();
			ctx.moveTo(xarr[avgday+skipdays-1], Math.round(y/avgday));

			for (var n=avgday+skipdays; n<=maxcoldays; n++){
				y=0; for ( var i= n-avgday+1; i<=n; i++) y=y+yarr[i];
				ctx.lineTo(xarr[n], Math.round(y/avgday));
			}
			ctx.stroke();
			
		}, false ); 
			
		//load GE image again (cross domain workaround) and replace with a canvas after loaded
		geimg.src = 'data:image/gif;base64,' + imgdata; 
	}
});