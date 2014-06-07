// ==UserScript==
// @name           GLB Home Page Player Box Colours
// @namespace      karma99.GoalLineBlitz
// @description    Chnages the colour of player boxes (requires setting up)
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==

var boxArray = new Array();

// Set up here!
// Add a new line for each player with the following details,
// Player ID, URL of "fade" image, Colour of box as RGB value, ie #FD115D
// put a comma between each one as shown below
// ie, boxArray.push('YourPlayerID,FadeImageURL,#RGBValue');

boxArray.push('119449,http://goallineblitz.com/images/game/design/content_container.gif,#FF00FF'); // Remove this example!

//////////////////////////////////////////////////////////////////////////////////////////////////////////

window.setTimeout(function(){

// Get all Player boxes
var boxes=getElementsByClassName('content_container player_box',document);

for(i=0;i<boxes.length;i++)
{
  // Check each player id
  for(p=0;p<boxArray.length;p++)
  {
    if (boxes[i].innerHTML.indexOf('player_id='+boxArray[p].split(',')[0]+'"')>-1)
    {
      var marg=''; // Retain existing margin if any
      if(boxes[i].getAttribute('style'))
        marg=boxes[i].getAttribute('style');
      boxes[i].setAttribute('style',marg+'background-image:url('+boxArray[p].split(',')[1]+
        ');background-color:'+boxArray[p].split(',')[2]);
    }
  }
}

});

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
	return a;
};