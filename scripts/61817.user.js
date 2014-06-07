// ==UserScript==
// @name metBB_showImages
// @description Show pictures in threads along with a full-size pop-up on click.
// @include http://www.metallicabb.com/index.php?showtopic*
// @include http://metallicabb.com/index.php?showtopic*
// @include http://www.metallicabb.com/index.php?app=forums&module=post&section=post&do=reply_post*
// @include http://metallicabb.com/index.php?app=forums&module=post&section=post&do=reply_post*
// ==/UserScript==

showImages()
function showImages()
{
addGlobalStyle('.nxtBtn{display:inline-block;padding:4px 8px;margin:4px;border:1px solid #444444;-moz-border-radius:4px;cursor:pointer;}.nxtBtn:hover{background:-moz-linear-gradient(#444444, #333333 50%, #000000 50%, #333333) repeat scroll 0 0 transparent;border:1px solid #777777;}');
addGlobalStyle('.largepicDiv{z-index:5000;border-width:1px;border-style:solid;border-color:#aaaaaa #666666 #666666 #aaaaaa;background-color:#000000;}.counter{float:right;padding:4px 8px;margin:4px}');
var myArray=new Array();
	var links=document.getElementsByTagName('a');
	for (i=1;i<links.length;i++)
	{
		var isjpg=links[i].href.indexOf('.jpg');
		var ispng=links[i].href.indexOf('.png');
		var isjpeg=links[i].href.indexOf('.jpeg');
		var isgif=links[i].href.indexOf('.gif');
		if (isjpg==-1 && ispng==-1 && isjpeg==-1 && isgif==-1)
		{
		}
		else
		{
			var href=links[i].href;
			var the_char=href.charAt(href.length-1);
			if (the_char=="/")
			{
				href=href.substring(0, href.length-1);
			}
			if(myArray.indexOf(href)== -1) myArray.push(href);
			var parent=links[i].parentNode;
			var tdparent=parent.parentNode;
			links[i].id=i;
			links[i].addEventListener('mouseover', function() {highlightPic(this.id)},false)
			links[i].addEventListener('mouseout', function() {unhighlightPic(this.id)},false)
			var pic=document.createElement('img');
			pic.style.border="1px solid #87B8D7";
			pic.title="Click for full-size view";
			pic.id=i+"pic";
			pic.style.maxHeight="250px";
			pic.style.maxWidth="300px";
			pic.style.padding="2px";
			pic.style.margin="2px";
			pic.src=href;
			pic.style.cursor="pointer";
			pic.addEventListener('click', function() {zoomIn(this.id,myArray)},false)
			pic.addEventListener('error', function() {errorPic(this.id,myArray)},false)
			if (!document.getElementById(tdparent.id+"break"))
			{
				var brk=document.createElement('br');
				brk.id=tdparent.id+"break";
				parent.appendChild(brk);
				parent.appendChild(document.createElement('br'));
			}
			parent.appendChild(pic);
		}
	}
}

function removeByElement(id,myArray)
{
	var element=document.getElementById(id);
	var arrayElement=element.src;
	for(var i=0; i<myArray.length;i++ )
	{
	if(myArray[i]==arrayElement)
		
		{
			myArray.splice(i,1);
		}
	}
}

function highlightPic(i)
{
	var high=document.getElementById(i+"pic");
	high.style.padding="1px";
	high.style.border="2px solid #87B8D7";
}

function unhighlightPic(i)
{
	var high=document.getElementById(i+"pic");
	high.style.padding="2px";
	high.style.border="1px solid #87B8D7";
}

function zoomIn(id,myArray)
{
	var largepicDiv=document.getElementById("largepicDiv");
	if (largepicDiv)
	{
		document.body.removeChild(largepicDiv);
	}
	var largepicDiv=document.createElement('div');		
	largepicDiv.id="largepicDiv";
	largepicDiv.className="largepicDiv";

	var largepic=document.getElementById("largepic");
	if (!largepic)
	{
		var largepic=document.createElement('img');
	}
		var nxt=document.getElementById("nxt");
	if (!nxt)
	{
		var nxt=document.createElement('div');
	}
	var counter=document.getElementById("counter");
	if (!counter)
	{
		var counter=document.createElement('div');
	}
	var br=document.getElementById("largePicBreak");
	if (!br)
	{
		var br=document.createElement('br');
	}
	// var gotoPost=document.getElementById("gotoPost");
	// if (!gotoPost)
	// {
	// var gotoPost=document.createElement('div');
	// }
	// gotoPost.id="gotoPost";
	// gotoPost.className="nxtBtn";
	// gotoPost.innerHTML="go to post";
	// gotoPost.addEventListener('click', function() {ScrollToElement(id)},false)
	br.id="largePicBreak";
	counter.id="counter";
	counter.className="counter";
	var last=myArray.length;
	counter.innerHTML=" (Total "+last+")";
	var index=myArray.indexOf(document.getElementById(id).src);
	counter.innerHTML=" ("+(index+1)+"/"+last+")";
	nxt.id="nxt";
	nxt.className="nxtBtn";
	nxt.innerHTML="Next";
	nxt.addEventListener('click', function() {nextPic(myArray)},false)
	largepic.id="largepic";
	//largepic.style.zIndex=5000;
	//largepic.style.display="none";
	largepic.style.cursor="pointer";
	largepic.style.borderBottom="1px solid #333333";
	largepic.style.padding="1px";
	largepic.title="Click to close";
	largepic.src=document.getElementById(id).src;
	largepic.addEventListener('click', function() {zoomOut(this.id)},false)
	largepic.addEventListener('load', function() {centerImage(this.id)}, false)
	largepicDiv.appendChild(largepic);
	largepicDiv.appendChild(br);
	largepicDiv.appendChild(nxt);
	//largepicDiv.appendChild(gotoPost);
	largepicDiv.appendChild(counter);
	document.body.appendChild(largepicDiv);	
}

function nextPic(myArray)
{
	var largepic=document.getElementById("largepic");
	var chk=largepic.src;
	var last=myArray.length;
	var index=myArray.indexOf(chk);
	var index2=0;
	if(index==last-1)
	{
		largepic.src=myArray[0];
		index2=1;
	}
	else
	{
		index2=index+2;
		largepic.src=myArray[index+1];
	}
	document.getElementById("counter").innerHTML=" ("+(index2)+"/"+last+")";
}

function errorPic(id,myArray)
{
	removeByElement(id,myArray);
	var element=document.getElementById(id);
	element.parentNode.removeChild(element);
}

function centerImage(id)
{
	var scrolledX, scrolledY;
	if( self.pageYoffset )
	{
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	}
	else if(document.documentElement && document.documentElement.scrollTop)
	{
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	}
	else if(document.body)
	{
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}
	var centerX, centerY;
	if( self.innerHeight )
	{
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	}
	else if(document.documentElement && document.documentElement.clientHeight)
	{
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	}
	else if(document.body)
	{
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}
	Xwidth=document.getElementById("largepic").width+6;
	Yheight=document.getElementById("largepic").height+6;
	var leftoffset = scrolledX + (centerX - Xwidth) / 2;
	if (leftoffset<0) leftoffset=0;
	var topoffset = scrolledY + (centerY - Yheight) / 2;
	if (topoffset<0) topoffset=0;
	var r=document.getElementById("largepicDiv").style;
	r.position='absolute';
	r.top = topoffset + 'px';
	r.left = leftoffset + 'px';
	r.display = "inline-block";
}

function zoomOut(id)
{
	document.body.removeChild(document.getElementById("largepicDiv"));
}
function ScrollToElement(id)
{
	var theElement=document.getElementById(id);
	var selectedPosX = 0;
	var selectedPosY = 0;
	while(theElement != null)
	{
		selectedPosX += theElement.offsetLeft;
		selectedPosY += theElement.offsetTop;
		theElement = theElement.offsetParent;
	}
	window.scrollTo(selectedPosX,selectedPosY);
}

function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head)
	{
		return;
	}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}