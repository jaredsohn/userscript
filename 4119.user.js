// ==UserScript==
// @name          MyYahoo Photo Cheater
// @description   Shows the description and full sized image for Yahoo photo thumbnails on a myYahoo page.
// @include       *
// ==/UserScript==

tipobj = document.createElement("div");
tipobj.style.position = 'absolute';
tipobj.style.backgroundColor = 'white';
tipobj.style.width = '200px';
tipobj.style.padding = '3px';
tipobj.style.border = '1px solid red';
tipobj.style.textAlign = 'left';
tipobj.style.display = 'none';
textNode = document.createTextNode("");
tipobj.appendChild(textNode);
document.body.appendChild(tipobj);

		var offsetxpoint=20 //Customize x offset of tooltip
		var offsetypoint=0 //Customize y offset of tooltip
		var ie=document.all
		var ns6=document.getElementById && !document.all
		var enabletip=false

function ietruebody()
{
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

function positiontip(e)
{
	var curX=(ns6)?e.pageX : event.clientX+ietruebody().scrollLeft;
	var curY=(ns6)?e.pageY : event.clientY+ietruebody().scrollTop;
	//Find out how close the mouse is to the corner of the window
	var rightedge=ie&&!window.opera? ietruebody().clientWidth-event.clientX-offsetxpoint : window.innerWidth-e.clientX-offsetxpoint-20
	var bottomedge=ie&&!window.opera? ietruebody().clientHeight-event.clientY-offsetypoint : window.innerHeight-e.clientY-offsetypoint-20
	
	var leftedge=(offsetxpoint<0)? offsetxpoint*(-1) : -1000
	
	//if the horizontal distance isn't enough to accomodate the width of the context menu
	if (rightedge<tipobj.offsetWidth)
	//move the horizontal position of the menu to the left by it's width
	tipobj.style.left=ie? ietruebody().scrollLeft+event.clientX-tipobj.offsetWidth+"px" : window.pageXOffset+e.clientX-tipobj.offsetWidth+"px"
	else if (curX<leftedge)
	tipobj.style.left="5px"
	else
	//position the horizontal position of the menu where the mouse is positioned
	tipobj.style.left=curX+offsetxpoint+"px"
	
	//same concept with the vertical position
	if (bottomedge<tipobj.offsetHeight)
	tipobj.style.top=ie? ietruebody().scrollTop+event.clientY-tipobj.offsetHeight-offsetypoint+"px" : window.pageYOffset+e.clientY-tipobj.offsetHeight-offsetypoint+"px"
	else
	tipobj.style.top=curY+offsetypoint+"px"
	tipobj.style.visibility="visible"
}

document.addEventListener('mousemove', positiontip, true);

////////////////////////////////////////////////////////////////////////////////////



images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) 
{
	if(images[i].parentNode.href && images[i].parentNode.href.indexOf('story.news.yahoo.com') > 0)
	{
	   images[i].style.borderWidth = '2px';
	   images[i].style.borderColor = 'red';
	   images[i].addEventListener('mouseover', showHoverBox, false);
	   images[i].addEventListener('mouseout', hideHoverBox, false);
	}
}

function showHoverBox()
{
	if(this.alt)
	{
		textNode.nodeValue = this.alt;
		tipobj.style.display = 'block';
	}

	//alert(this.parentNode.href);
	getTheStuff(this.parentNode.href);
}

function hideHoverBox()
{
	tipobj.style.display = 'none';
}


function addPicture(pictureHTML)
{
	x=1;
	while(tipobj.childNodes[x])
		tipobj.removeChild(tipobj.childNodes[x]);
		
	pictureNode = document.createElement("div");
	pictureNode.innerHTML = pictureHTML;
	pictureNode.style.position = 'absolute';
	pictureNode.style.top = '-1px';
	pictureNode.style.left = '208px';
	tipobj.appendChild(pictureNode);
}

var cache = new Array();

iCounter = 0;////////////////
function getTheStuff(linkAddress)
{
	x=1;
	while(tipobj.childNodes[x])
		tipobj.removeChild(tipobj.childNodes[x]);
		
	if(cache[linkAddress] && cache[linkAddress] != 'nope')
	{
		addPicture(cache[linkAddress]);
	}
	else
	{
		GM_xmlhttpRequest({
		    method: 'GET',
		    url: linkAddress,
		    headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application/atom+xml,application/xml,text/xml',
		    },
		    onload: function(responseDetails)
		    {
		    	   str = responseDetails.responseText;
		    		startString = '<div id="photo">';
					start = str.indexOf(startString) + startString.length;
					if(start > 0)
					{
						rest = str.substring(start);
						end = rest.indexOf('<\/div>');
						pictureHTML = str.substring(start, start+end);
		    	  		cache[linkAddress] = pictureHTML;
		    	  		addPicture(pictureHTML);
					}
					else
					{
		    	  		cache[linkAddress] = 'nope';
		    	  	}
		    }
		});
	}
	iCounter++;////////////////
}
