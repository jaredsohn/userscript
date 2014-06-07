// ==UserScript==
// @name          Toggle Scrollbars
// @namespace     http://www.mrated.com/
// @description	  Ctrl-click to toggle scrollbars.
// @include       *
// ==/UserScript==

// Author: Michael Soutar, m@mrated.com - 20 December 2005
// Version: 1.0

(function() 
{

    function hideScrlStatus(){
        window.scrlstatus.style.display = "none";
    }

    //toggle scrollbars on and off when mouse click event is fired while ctrl key is pressed
    function checkClicks(e) {
    
        if (e.ctrlKey){
		    window.scrollbars.visible = !window.scrollbars.visible;

		    if(window.scrollbars.visible){
		        window.scrlstatus.innerHTML = "Scroll ON";
		    }else{
		        window.scrlstatus.innerHTML = "Scroll OFF";
		    }

       	    window.scrlstatus.style.left = (e.pageX - 70).toString(10) + 'px';
    		window.scrlstatus.style.top  = (e.pageY - 16).toString(10) + 'px';
		    window.scrlstatus.style.display = "inline";

		    window.setTimeout(hideScrlStatus, 1000);
		    //window.scrlstatus.style.display = "none";
	    } else {
		    hideScrlStatus();
	    }
    }

    window.addEventListener('mouseup', checkClicks, true);

	function startService()
	{
	    var scrlstatus = document.createElement("div");
	    scrlstatus.style.position = "absolute";
	    scrlstatus.style.border = "1px solid #888888";
	    scrlstatus.style.height = "16px";
	    scrlstatus.style.width = "70px";
	    scrlstatus.style.backgroundColor = "#FFFFCC";
	    scrlstatus.style.padding = "2px";
	    scrlstatus.style.MozBorderRadius = "5px";
	    scrlstatus.style.font = "arial";
	    scrlstatus.style.fontSize = "12px";
	    scrlstatus.style.color = "#888888";
	    scrlstatus.style.textAlign = "center";
	    scrlstatus.style.zIndex = "100";
	    scrlstatus.style.display = "none";
	    
	    window.scrlstatus = scrlstatus;
	    document.body.insertBefore(window.scrlstatus, document.body.firstChild);
	}
	
	startService();
	
})();


