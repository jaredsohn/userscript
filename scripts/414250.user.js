// ==UserScript==
// @name					YBW Hide Threads
// @namespace			DaveRo
// @author				DaveRo
// @version				1.2.1
// @description		Hides specific threads
// @include				http://www.ybw.com/forums/forumdisplay.php*
// @include				http://www.ybw.com/forums/search.php*
// ==/UserScript== 

icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABLFBMVEUAAABEREBEREBEREBEREBEREBEREBEREBEREBEREAzMzAPDw4AAAAAAAAcHBsODg4NDQwCAgIAAAAAAAAAAAAAAAALCwoNDQwRERA8PDgDAwMAAAAAAAAAAAAAAAACAgIyMi8CAgIICAcqKigCAgIAAAAAAAAAAAAAAAAmJiQNDQwZGRgAAAAEBAQ0NDEcHBoAAAAAAAAAAAACAgI3NzQBAQEAAAAAAAAcHBsAAAAAAAAPDw8lJSIAAAAAAAAAAAAEBAQICAgAAAAAAAAODg1AQDwAAAAEBAQAAAAAAAAAAAA6OjcRERASEhEAAAAAAAAAAAAAAAAAAAAFBQQPDw4bGxoKCgoAAAAAAAAAAAAAAAAAAAAAAAACAgINDQwPDw4NDQ0CAgIAAAAAAAB0thQWAAAAZHRSTlMAAQkKAhIUAxofIw9tHT+RjX1+hJ46Do94Hkt7f48igCQhnjFqTHI8MC+gLySWGwiFcTuCIYshmhkjYHQ5DpkZnRIHr5kcExSTKzkffGQqlRACozOPQhZ3bANGRAh0jIiGgXMYyDmQBgAAAAlwSFlzAAAASAAAAEgARslrPgAAAMJJREFUGNNjYMAOGJmYmRiR+CysbKwsEBkwyc7BycXNwMDDy8DCBObz8QsICgmLiDKwszID+WLiEpJS0jKyonLyCmxAFYpKyhwqqgxq6hrsmlrajAw6unoc+gYMhkYMxiackqZmDOYWrOyWVmpGDOzWNhzstnYM9g6ODE7OQD6Hiyu7m509A4O7h6ehkZe+t48vu59/AMjWwCAj22CBkNCw8IhIsLOiomNi4+ITEpOSkV3KwQ7xAxOqT1jALkX4FMQCALY6FpEK5tyQAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDEzLTExLTA3VDE5OjEzOjU2LTA2OjAw5Fy5JgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMy0xMS0wN1QxOToxMzo1Ni0wNjowMJUBAZoAAAAASUVORK5CYII="

/* Adds a stylesheet into page */
function addStyleSheet(id, style){
var getHead = document.getElementsByTagName("HEAD")[0];
var cssNode = document.createElement( "style");
cssNode.setAttribute("type", "text/css") ;
cssNode.setAttribute("id", id) ;
var elementStyle= getHead.appendChild(cssNode);
elementStyle.innerHTML=style;
return elementStyle;
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/* Add two alternative stylesheets */
addStyleSheet("HThiddenstyle",".HThidden, .HTunhidebutton {display:none;} .HThidebutton {position:absolute; top:10% ;cursor:pointer;} #HTHstatus {background-color:palegreen;}");
addStyleSheet("HTunhiddenstyle",".HThidebutton {display:none;} .HTunhidebutton {position:absolute; top:10% ;cursor:pointer;} li.HTunhidden .HTunhidebutton {display:none;} #HTHstatus {background-color:orange;}");

document.getElementById("HTunhiddenstyle").disabled=true ; /* Disable the 'unhidden' stylesheet - default case */
	
/* 'Today' is number of days since 1/1/2014 */
today = new Date() ;
today = today.getTime() ;																	/* Millisecs since 1-1-1970 */
today = Math.round(today / (24*60*60*1000)-0.5)-16070  ;	/*days since 1/1/2014 */

/* Check if hiding is on or off */ 
hideflag = localStorage.getItem("HTH") ;									/* Stored hiding on/off flag */
if ((hideflag == undefined)||(hideflag == null)) {				/* absent=on */
	hideflag = "1" ;
}

/* On display class threads hidden/unhidden depending on stored thread number */
threads = document.getElementsByClassName('threadbit') ; 	/* Thread list items */
numhidden = 0
for(var i=0; i<threads.length; i++) {
	thread = threads[i] ;	
	threadnum = thread.id.substring(7) ;										/* Extract thread # */
	threadData = localStorage.getItem("HTT"+threadnum) ;		/* Check if thread # stored */
	if ((threadData != undefined)&&(threadData != null)) {	/* Is it stored = hidden? */
		numhidden++ ;																					/* Count it */
		thread.setAttribute("class", thread.className+" HThidden") ;	/* Add class to hidden threads */		
	}
	else {																									/* Thread not hidden */
		thread.setAttribute("class", thread.className+" HTunhidden") ;	/* Add class to unhidden threads */	
	}
/* Add a hide and an unhide button to all threads - only one is displayed */
	hideButton = document.createElement("img") ;			/* Hide button */
	hideButton.setAttribute("src", icon) ;
	hideButton.setAttribute("onclick", "HTClickHandler("+threadnum+",'h',"+today+");" ) ;	
	hideButton.setAttribute("title", "Hide thread") ;
	hideButton.setAttribute("class", "HThidebutton") ;	
	hideButton.style.right = "0" ;
	insertAfter(thread.childNodes[1].lastElementChild, hideButton) ;
	
	unhideButton = document.createElement("input");		/* Unhide button */ 
	unhideButton.type = "button" ;
	unhideButton.value = "Unhide" ;
	unhideButton.setAttribute("onclick", "HTClickHandler("+threadnum+",'u',"+today+");" ) ;
	unhideButton.setAttribute("title", "Unhide thread") ;	
	unhideButton.setAttribute("class", "HTunhidebutton") ;
	unhideButton.style.right = "0" ;
	insertAfter(thread.childNodes[1].lastElementChild, unhideButton) ;
}

/* Insert the hiding on/off button and hidden thread count at top of page */
statusarea = document.createElement("div") ;							/* Container for hiding button & count */ 
statusarea.style.borderRadius = "5px" ;
statusarea.style.position = "relative" ;
statusarea.style.left = "20%" ;											/* Horiz position of status button/count - edit if req'd */
statusarea.innerHTML = "<img id='HTHbutton' src="+icon+" > <p id='HTHcount' style='position:absolute; top:0px; right:0px' title='Number of hidden threads on this page'>"+numhidden.toString()+"</p>" ;
statusarea.setAttribute("id", "HTHstatus" ) ;	
statusarea.style.width = "30px" ;
statusarea.style.height = "16px" ;

var regex = /forumdisplay/ ;												/* Button positon depends on which page */
if (regex.test(document.location.href)) {
	statusContainer = "above_threadlist" ; 
	}
else {
	statusContainer = "above_searchresults" ; 
	statusarea.style.top = "-10px" ;
	}	
topspace = document.getElementById(statusContainer) ; /* Insert the top button/count */
topspace.appendChild(statusarea) ;

/* Setup click handlers */
hidingButton = document.getElementById('HTHbutton') ;			/* Button turns toggles hiding on/off */
if (hideflag=="1") {																			/* Button colour/action depends on hiding state */
	hidingButton.setAttribute("onclick", "HTClickHandler(null,'U',null);" ) ;		
	hidingButton.setAttribute("title", "Unhide threads") ;
}
else {
	hidingButton.setAttribute("onclick", "HTClickHandler(null,'H',null);" ) ;		
	hidingButton.setAttribute("title", "Hide threads") ;
	document.getElementById("HThiddenstyle").disabled=true ; 		 /* Disable the 'hidden' stylesheet */
	document.getElementById("HTunhiddenstyle").disabled=false ;  /* Enable the 'unhidden' stylesheet */
}
hidingButton.style.cursor = "pointer" ; 

/* Adds script into page */
function addScript(source) {
  var script = document.createElement('script') ;
  script.setAttribute("type", "application/javascript") ;
  script.textContent = source;
  document.head.appendChild(script) ;
} ;

addScript(
/* Onclick handlers for hiding/unhiding a thread & switching hiding on/off */
function HTClickHandler(threadnum,action,today) {
	hidingButton = document.getElementById('HTHbutton') ;
	hidingCount = document.getElementById('HTHcount') ;
	numhidden = parseInt(hidingCount.textContent,10) ;	
	if (action==="h") {															/* Hide? */
		thread = document.getElementById("thread_"+threadnum) ;
		var threadobject = new Object() ;							/* Stored object */
		threadobject.action = "h" ;										/* Action: hide */
		threadobject.date = today ;										/* Date: today */
		localStorage["HTT"+threadnum] = JSON.stringify(threadobject) ;	/* Store hidden thread data */
		numhidden ++ ;																/* Increment displayed hidden count */
		hidingCount.textContent = numhidden.toString() ;	
		thread.setAttribute("class",thread.className.replace("HTunhidden","HThidden"));	/* Set class to hidden */		
	}
	if (action==="u") {															/* unhide? */
		thread = document.getElementById("thread_"+threadnum) ;
		localStorage.removeItem("HTT"+threadnum) ;		/* Delete the stored thread object */
		numhidden -- ;																/* Decrement displayed hidden count */
		hidingCount.textContent = numhidden.toString() ;
		thread.setAttribute("class",thread.className.replace("HThidden","HTunhidden"));	/* Set class to unhidden */			
	}
	if (action==="H") {															/* Turn hiding on */
		localStorage["HTH"] = "1" ;
		document.getElementById("HThiddenstyle").disabled=false ;  								/* Switch stylesheets */
		document.getElementById("HTunhiddenstyle").disabled=true ;
		hidingButton.setAttribute("onclick", "HTClickHandler(null,'U',null);") ;		/* Reset hiding button */		
		hidingButton.setAttribute("title", "Unhide threads") ;		
	}	
	if (action==="U") {															/* Turn hiding off */
		localStorage["HTH"] = "0" ;
		document.getElementById("HThiddenstyle").disabled=true ;
		document.getElementById("HTunhiddenstyle").disabled=false ;
		hidingButton.setAttribute("onclick", "HTClickHandler(null,'H',null);") ;	
		hidingButton.setAttribute("title", "Hide threads") ;					
	}
});
