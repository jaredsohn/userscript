// ==UserScript==
// @name           PremierLeague graphs
// @namespace      *
// @description    Show point, ownership graphs on mouseover
// @include        http://uk.premiership.fantasysports.yahoo.com/football/*
// ==/UserScript==

/*
When a user mouses ove the mini graph, show the big graph near it -- then make it disappear after moving the mouse.
The graphs are the same path for each player, just with a different player id, which we can get from the link around the img. 

We'll create 1 div, and just change the img's src as appropriate.

*/

var g,
i, // loop counter
imgs, // array of all image tags
img, // shorthand for specific img dealing with in loop
matcher, // regex to set RegExp
p_id; // player id

//create a div to hold the graphs.  The position of the mini graph is relatively constant, but the y is not.
g=document.createElement("div");
g.setAttribute('style', 'z-index:100;position:relative; right:-300px;width:640px;height:0px;');
// height =0 otherwise the top of the page (and thus page length gets bigger
g.id="imgs";
g.innerHTML="<img id='imgown' src=''><img id='imgpts' src=''>";
document.body.insertBefore(g, document.body.firstChild);
// div is now on the page

var imgs=document.getElementsByTagName('img');
// cycle through imgs to find the small graphs, and insert mouse over events
for (i=0; i<imgs.length;i++){
	img=imgs[i];	
	if(img.src=="http://us.i1.yimg.com/us.yimg.com/i/spo/perfsmall.gif" ){
		href=img.parentNode.href;
		matcher=href.match(/(\/football\/players\/)(\d*)/);
		p_id=RegExp.$2;
		img.setAttribute('onmouseover', 'javascript:document.getElementById("imgown").src="http://uk.premiership.fantasysports.yahoo.com/football/players/'+p_id+'/owned.png";document.getElementById("imgpts").src="http://uk.premiership.fantasysports.yahoo.com/football/players/'+p_id+'/points.png";document.getElementById("imgs").style.top="'+(imgs[i].y-250)+'px";document.getElementById("imgs").style.display="";');
		img.setAttribute('onmouseout','javascript:document.getElementById("imgs").style.display="none";')		
	}
}


