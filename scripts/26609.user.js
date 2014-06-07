// ==UserScript==
// @name           member badges
// @namespace      mbd.scout.com, forums.scout.com
// @include        http://mbd.scout.com/mb.aspx*
// @include        http://forums.scout.com/mb.aspx*
// ==/UserScript==


window.setTimeout( function() {




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


var ftdiv = document.getElementById('forumstable');
var tp = getElementsByClassName('tpmemberstatus', ftdiv);
for(var i=0;i<tp.length;i++) {
	var img = tp[i].getElementsByTagName('img');
	if(img[0] != null) {
		img[0].width = 90;
	}
}

}, 2000);