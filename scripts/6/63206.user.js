// ==UserScript==
// @name           train from facility
// @namespace      http://rapidshare.com
// @include        http://apps.facebook.com/crickettwenty/venue.php?m=1&a=1
// ==/UserScript==


x=document.getElementById('app212195768032_p10');
y=document.getElementById('app212195768032_p9');
z=document.getElementById('app212195768032_p8');
p=document.getElementById('app212195768032_p7');
if(x == null) 
window.location="http://apps.facebook.com/crickettwenty/venue.php?m=1&a=1";
if(z==null){
	i = GM_getValue('FacilityTurn');
	if(i == null) i=0;
	else if(i>=15) i=0;
	
	if(i<3){
	x.selectedIndex = 1;
	y.selectedIndex = 2;
	}
	else if(i<6){
	x.selectedIndex = 3;
	y.selectedIndex = 4;
	}
	else if(i<9){
	x.selectedIndex = 5;
	y.selectedIndex = 7;
	}
	else if(i<12){
	x.selectedIndex = 8;
	y.selectedIndex = 9;
	}
	else if(i<15){
	x.selectedIndex = 10;
	y.selectedIndex = 11;
	}
}
else if(p==null)
{
	i = GM_getValue('FacilityTurn');
	if(i == null) i=0;
	else if(i>=9) i=0;
	
	if(i<3){
	x.selectedIndex = 1;
	y.selectedIndex = 2;
	z.selectedIndex = 3;
	}
	else if(i<6){
	x.selectedIndex = 4;
	y.selectedIndex = 5;
	z.selectedIndex = 8;
	}
	else if(i<9){
	x.selectedIndex = 9;
	y.selectedIndex = 10;
	z.selectedIndex = 11;
	}
	
}
else
{
	i = GM_getValue('FacilityTurn');
	if(i == null) i=0;
	else if(i>=6) i=0;
	if(i<3){
	x.selectedIndex = 1;
	y.selectedIndex = 2;
	z.selectedIndex = 3;
	p.selectedIndex = 4;
	}
	else if(i<6){
	x.selectedIndex = 8;
	y.selectedIndex = 9;
	z.selectedIndex = 10;
	p.selectedIndex = 11;
	}

}


d=document.getElementById('app212195768032_tbuttons');
clickElement(d);
i++;
GM_setValue('FacilityTurn',i);

setTimeout("window.location = 'http://apps.facebook.com/crickettwenty/venue.php?m=1&a=1';",3000);

function clickElement(elt) {
  if (!elt) {
    addToLog('warning Icon', 'BUG DETECTED: Null element passed to clickElement().');
    return;
  }

  // Simulate a mouse click on the element.
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}

