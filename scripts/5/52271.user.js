// ==UserScript==
// @name           GLB - View forum images
// @namespace      Swagger J
// @description    Display forum images as actual images
// @version        1.1
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

var imgs = new Array(), imglinks = new Array(), linknodes = new Array(), links = new Array();
var imgindex = new Array();
var ext = new Array( 'jpg', 'bmp', 'gif', 'jpeg', 'png');


linknodes = document.evaluate(
		 '//a[@href]',
		 document,
		 null,
		 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		 null);

for ( var i=0; i<linknodes.snapshotLength; i++)
{
	links[i] = String(linknodes.snapshotItem(i));
}

var i=0, j=0, k=0;
for ( i=0; i<links.length; i++)
{
	if( links[i].indexOf( 'http://' ) >=0 )
	{
		for( k=0; k<ext.length; k++)
		{
			var slice = links[i].slice( links[i].length - 4, links[i].length);
			var slice = slice.toLowerCase();
			if( slice.indexOf( ext[k]) >= 0)
			{
				imglinks[j] = links[i];
				imgindex[j] = i;
				j++;
			}
		}	
	}
	
}

for( var i=0; i<imglinks.length; i++)
{
	var image = new Image()
	image.src = imglinks[i];
	var w = image.width;
	var resize = 0;
	
		function checkWidth(){
		if( w>=500)
		{
			w=500
			resize = 1;
		}
	}
	
	checkWidth();
	
	var lnk = linknodes.snapshotItem(imgindex[i]);
	var pic = document.createElement("img");

	if( resize == 0)
	{
		pic.innerHTML = '<br><a target="_blank" href="' + imglinks[i] + '"><img width = "' + w + '" src="' + imglinks[i] + '"/></a><br>';
	}
	else
	{
		pic.innerHTML = ' <text style="font-family:Times;font-variant:small-caps"><b>(Resized)</b></text><br><a target="_blank" href="' + imglinks[i] + '"><img width = "' + w + '" src="' + imglinks[i] + '"/></a><br>';
	}
	if(lnk)
	{
			lnk.parentNode.insertBefore( pic, lnk.nextSibling);
	}
	
}

