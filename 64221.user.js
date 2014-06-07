// ==UserScript==
// @name					Ikariam Unit Accuracy Tooltip
// @namespace			Ikariam-Unit-Accuracy-Tooltip
// @description		Just a tooltip to show accuracy when mouse moved over the accuracy bar
// @include				http://s*.ikariam.*/*view=shipdescription*
// @include				http://s*.ikariam.*/*view=unitdescription*
// @exclude				http://s*.ikariam.*/*oldView=shipdescription*
// @exclude				http://s*.ikariam.*/*oldView=unitdescription*
// @author				salomone
// @version				0.1.0
// ==/UserScript==

$ = document.getElementById;
var trimTextFromAccuracy = new RegExp('[\\d]*%', 'g');

function addEvent(obj, evType, fn, bubble)	{
	if (obj.addEventListener)	{
		obj.addEventListener(evType, fn, bubble);
		return true;
	} 
	else if (obj.attachEvent)	{
		var r = obj.attachEvent('on'+evType, fn);
		return r;
	} 
	else {
		return false;
	}
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}


function findPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}	while (obj = obj.offsetParent);		
	}
	return [curleft,curtop];	
}

function showInfoBox(event)	{
	try	{		
		var trg = event.currentTarget;						
		var trgStyleWith = trimTextFromAccuracy.exec( trg.getElementsByTagName('div')[0].style.width );				
		if ( trgStyleWith == null )	{
			return;
		}
		var position = findPos(trg);		
		var infoBox = document.getElementById('myInfoBox');
		infoBox.style.left = (position[0]+152)+'px';
		infoBox.style.top = (position[1])+'px';					
		infoBox.innerHTML = trgStyleWith;
		infoBox.style.display = "block";									
		
	}
	catch ( err )	{
		GM_log( err );
	}
}

function hideInfoBox()	{
	document.getElementById('myInfoBox').style.display = "none";
}

GM_addStyle("#myInfoBox { " +
	"background-image: none; position: absolute; background-color: #fff; display: none; border: 1px solid #be8d53; " +
	"border-top: 4px solid #be8d53; background-color: #fdf7dd; z-index: 10000; color: #612d04; padding: 0; text-align: left; " +
	" }");


var infoBox = document.createElement('div');
infoBox.setAttribute('id','myInfoBox');
document.body.appendChild(infoBox);

//var accuracyDivs = $x("//*[@class='weapon']/div[@class='damageFocusContainer']/div[@class='damageFocus']");
var accuracyDivs = $x("//*[@class='weapon']/div[@class='damageFocusContainer']");
var i = 0;
var accuracyDiv = null;
while ( i != accuracyDivs.length )	{
	accuracyDiv = accuracyDivs[i++];	
	addEvent( accuracyDiv, 'mouseover', function(event){showInfoBox(event);}, false );
	addEvent( accuracyDiv, 'mouseout', function(){hideInfoBox();}, false );
}