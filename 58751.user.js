// ==UserScript==
// @name           Toggle all releases
// @description    Shift click maximize/minimize buttons to toggle display of all the releases in the edit search page at the same time
// @version        2010-07-12_1432
// @author         Tristan "jesus2099" Daniel (http://j2.ions.fr)
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
//
// @include        http://musicbrainz.org/mod/search/results.html*

// ==/UserScript==

(function () {

window.addEventListener("load", function(e) {

	var imgs = document.getElementsByTagName("img");
	var toggles = new Array();

	for(i=0; i < imgs.length; i++) {
		if (imgs[i].getAttribute("alt") == "Toggle release") {
			toggles.push(imgs[i]);
			imgs[i].addEventListener("click", function(e){
				if (e.shiftKey) {
					for(j=0; j < toggles.length; j++) {
						if (srcElement(e) != toggles[j] ) {
							fireEvent(toggles[j].parentNode, "click");
						}
					}
				}
			}, false)
		}
	}

	function srcElement(e) {// http://www.quirksmode.org/js/events_properties.html
		var srce;
		if (!e) var e = window.event;
		if (e.target) srce = e.target;
		else if (e.srcElement) srce = e.srcElement;
		if (srce.nodeType == 3) // defeat Safari bug
			srce = srce.parentNode;
		return srce;
	}

	function fireEvent(element,event){// http://jehiah.cz/archive/firing-javascript-events-properly 3 lines just to do "obj.click()" ¬_¬ Firefox is so dumb
	    if (document.createEventObject){
	        // dispatch for IE
	        var evt = document.createEventObject();
	        return element.fireEvent('on'+event,evt)
	    }
	    else{
	        // dispatch for firefox + others
	        var evt = document.createEvent("HTMLEvents");
	        evt.initEvent(event, true, true ); // event type,bubbling,cancelable
	        return !element.dispatchEvent(evt);
	    }
	}

}, false);//onload

})();