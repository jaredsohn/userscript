// ==UserScript==
// @name           Linkify Google Search Results
// @namespace      @namespace Andrew Basta
// @description    When you mouseover the green url below google search results, the url is linkified 
// @include        http://www.google.co*/*
// ==/UserScript==

//User variables
var indent = 1;			//set to 0 for no indentation animation
var marginPix = 8;		//number of pixels to indent
var marginCount = 10;	//number of steps that are run to complete indentation
var whiteSpaces = 2;	//number of whitespaces that show up between the links
var linkColor = "green";	//change to "default" if you're using a custom style and prefer to keep the native color,
							//or if you're not using a custom style but prefer blue links..or change to whatever you want.
var boldRoot = 1;		// set to 0 for no bold on the root domain of the url lists
var splitOnLoad = 0;	// set to 1 to split all the urls on pageload

//fadeInMargin Adapted from www.hesido.com 
function fadeInMargin (element){
	if (element.intFunction)
		window.clearInterval(element.intFunction);
	var count = 0;
	element.intFunction = window.setInterval(
		function() {
			element.currentWidth = easeInOut(0, marginPix, marginCount, count, 0.5);
			element.style.marginLeft = element.currentWidth+"px";
			count++;
			if (count > marginCount) {
				window.clearInterval(element.intFunction);
			}
		}
	, 5);
}

//fadeOutMargin Adapted from www.hesido.com 
function fadeOutMargin (element){
	if (element.intFunction)
		window.clearInterval(element.intFunction);
	var count = 0;
	element.intFunction = window.setInterval(
		function() {
			element.currentWidth = easeInOut(marginPix, 0, marginCount, count, 0.5);
			element.style.marginLeft = element.currentWidth+"px";
			count++;
			if (count > marginCount) {
				window.clearInterval(element.intFunction);
			}
		}
	, 8);
}

//Generic Animation Step Value Generator By www.hesido.com 
function easeInOut(minValue,maxValue,totalSteps,actualStep,powr) { 
    var delta = maxValue - minValue; 
    var stepp = minValue+(Math.pow(((1 / totalSteps) * actualStep), powr) * delta); 
    return Math.ceil(stepp) 
} 

function hover(event) { 
	var linkText = [];
	var count = 0;

	this.innerHTML = "";
	for (var i=0; i<linkListText[this.id].length; i++) {
		if (linkListText[this.id][i] != "...") {
			if (linkColor == "default")	this.innerHTML = this.innerHTML.concat("<a href=http://", linkListURL[this.id][i], ">",linkListText[this.id][i],"/</a>");
			else if ((i==0) && (boldRoot==1)) this.innerHTML = this.innerHTML.concat("<em><a href=http://", linkListURL[this.id][i], " style=color:", linkColor, ">",linkListText[this.id][i],"/</a></em>");
			else this.innerHTML = this.innerHTML.concat("<a href=http://", linkListURL[this.id][i], " style=color:", linkColor, ">",linkListText[this.id][i],"/</a>");
			
			for (var j=0; j<whiteSpaces; j++) {
				this.innerHTML = this.innerHTML.concat("&nbsp");
			}
		}
		else break;
	}		
	this.removeEventListener('mouseover', hover, false);
	this.addEventListener('mouseout', leave, false);
	if (indent)	fadeInMargin(this);
}

function splitAll() {
	var linkText = [];
	var count = 0;
	
	for (var i=0; i<linkList.length; i++) {
		linkList[i].innerHTML = "";
		for (var j=0; j<linkListText[linkList[i].id].length; j++) {
			if (linkListText[linkList[i].id][j] != "...") {
				if (linkColor == "default")	linkList[i].innerHTML = linkList[i].innerHTML.concat("<a href=http://", linkListURL[linkList[i].id][j], ">",linkListText[linkList[i].id][j],"/</a>");
				else if ((j==0) && (boldRoot==1)) linkList[i].innerHTML = linkList[i].innerHTML.concat("<em><a href=http://", linkListURL[linkList[i].id][j], " style=color:", linkColor, ">",linkListText[linkList[i].id][j],"/</a></em>");
				else linkList[i].innerHTML = linkList[i].innerHTML.concat("<a href=http://", linkListURL[linkList[i].id][j], " style=color:", linkColor, ">",linkListText[linkList[i].id][j],"/</a>");
				
				for (var k=0; k<whiteSpaces; k++) {
					linkList[i].innerHTML = linkList[i].innerHTML.concat("&nbsp");
				}
			}
			else break;
		}
	}
}


//contains from mike hall, brainjar.com
function contains(a, b) {
  // Return true if node a contains node b.
  while (b.parentNode)
    if ((b = b.parentNode) == a)
      return true;
  return false;
}

//leave adapted from mike hall, brainjar.com
//basically, this makes sure that the link you just moused out of was the last link moused into...
function leave(event) {
	if (window.event) {
		current = this;
		related = window.event.toElement;
	}
	else {
		current = event.currentTarget;
		related = event.relatedTarget;
	}

	if (current != related && !contains(current, related)) {
		this.textContent = linkListOrig[this.id];
		this.removeEventListener('mouseout', leave, false);
		this.addEventListener('mouseover', hover, false);
		if (indent) fadeOutMargin(this);
	}
}

var currentLink;
var linkList = document.getElementsByTagName('cite'); //gets all the green urls
var linkListText = [];	// holds the split text of the green url
var linkListOrig = [];	// holds a copy of the original green url
var linkListURL = [];	// holds the urls of all individual links

for (var i=0; i<linkList.length; i++) {
	//Indices of extraneous clutter, i.e. size of linked document and preceding http:// in green url.  I don't like those.
	var trim0 = linkList[i].textContent.indexOf("://"); 
	var trim1 = linkList[i].textContent.indexOf(" - ");
	var trim2 = linkList[i].textContent.indexOf("/ - ");
	var trim3 = linkList[i].textContent.indexOf("/.../");
	var slashTest = linkList[i].textContent.indexOf("/");

	linkList[i].id = i;

	if(linkList[i].nextSibling != null && slashTest > -1) { //make sure the url has /'s in it..this is where i split it up
		//Trimming the extraneous clutter here...
		if(trim1>-1){
			linkListText[i] = linkList[i].textContent.substring((trim0==-1)?0:(trim0+3),((trim1==(trim2+1))?trim2:trim1));
			linkListOrig[i] = linkList[i].textContent.substring((trim0==-1)?0:(trim0+3),((trim1==(trim2+1))?(trim2+4):(trim1+3)));
			linkListURL[i] = linkList[i].textContent.substring((trim0==-1)?0:(trim0+3),((trim1==(trim2+1))?trim2:trim1));
			}
		else {
			linkListText[i] = linkList[i].textContent;
			linkListOrig[i] = linkList[i].textContent;
			linkListURL[i] = linkList[i].textContent;
		}
		
		if (trim3 > -1) {
			linkListText[i] = linkList[i].textContent.substring(0,trim3);
			linkListOrig[i] = linkList[i].textContent.substring(0,trim3);
			linkListURL[i] = linkList[i].textContent.substring(0,trim3);
		}
		
		linkList[i].textContent = linkListOrig[i];	//Copy the original green url for safekeeping

		linkListText[i] = linkListText[i].split("/"); //Split up the url
		linkListURL[i] = linkListURL[i].split("/");   //Split up the url

		//Concatenate the individual links to new urls...
		for (var j=0; j<linkListURL[i].length; j++)
		{
			if (j>0) {
				if (linkListURL[i][j] != null) linkListURL[i][j] = linkListURL[i][j-1].concat("/",linkListURL[i][j]);
			}
		}

		if(!splitOnLoad) linkList[i].addEventListener('mouseover', hover, false);
	}
	//If there are /'s in the original url, make sure that it's a valid link, and not just green text that google threw in (like for adverts and such)
	else if (slashTest > -1 || (linkList[i].nextSibling != null && linkList[i].nextSibling.tagName ==  "BR")) {
		linkListText[i] = linkList[i].textContent;
		linkListOrig[i] = linkList[i].textContent;
		linkListURL[i] = linkList[i].textContent;
		
		linkList[i].textContent = linkListOrig[i];

		linkListText[i] = linkListText[i].split("/");
		linkListURL[i] = linkListURL[i].split("/");
		
		for (var j=0; j<linkListURL[i].length; j++)
		{
			if (j>0) {
				if (linkListURL[i][j] != null) linkListURL[i][j] = linkListURL[i][j-1].concat("/",linkListURL[i][j]);
			}
		}
		
		if(!splitOnLoad) linkList[i].addEventListener('mouseover', hover, false);
	}
	else {	
		linkListText[i] = linkList[i].textContent;
		linkListOrig[i] = linkList[i].textContent;
		linkListURL[i] = linkList[i].textContent;
		
		linkListText[i] = linkListText[i].split("/");
		linkListURL[i] = linkListURL[i].split("/");
		
		for (var j=0; j<linkListURL[i].length; j++)
		{
			if (j>0) {
				if (linkListURL[i][j] != null) linkListURL[i][j] = linkListURL[i][j-1].concat("/",linkListURL[i][j]);
			}
		}
		
		if(!splitOnLoad) linkList[i].addEventListener('mouseover', hover, false);
	}
}

if(splitOnLoad)	{
	splitAll();
}
