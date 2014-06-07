// ==UserScript==
// @name           ToodleDo - Past due date
// @namespace      toodledo
// @description    Improve visibility of past due tasks
// @include        *toodledo.com/index.php*
// ==/UserScript==
// v1.1 Add some colors
// v1.0 Initial release

var delayMax=7;		// after delayMax days past due date, size won't increase
var sizeDelayMax=4;	// maximum size

var today=new Date().getTime()/1000;
var colors=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");

var td=document.getElementsByTagName("input");

for (i=0; i<td.length; i++) {
	var element=td[i];
	// element as an id ?
	if ( element.id ) {
		// element is a task title
		if ( element.id.indexOf("tild")!=-1 ) {
			var id=element.id.substr(4);
			if (document.getElementById("cald"+id)){
				// retrieve the date
				var date=document.getElementById("cald"+id).getAttribute("time");
				// if it's a past date... increase size!
				if (date!=0 && date<today) {
					var delta=(today-date)/(3600*24);
					if (delta>delayMax) delta=delayMax;

					// increase size
					var newsize=(0.9+(sizeDelayMax-0.9)*delta/delayMax);
					element.style.fontSize=newsize+"em";

					// change background
					var red=(delta>delayMax/2)?15:Math.floor(30*delta/delayMax);
					var green=(delta<delayMax/2)?15:Math.floor(30-30*delta/delayMax);
					element.style.background="#"+colors[red]+colors[green]+"0";
					element.style.color="#000";
				}
			}
		}
	}
}