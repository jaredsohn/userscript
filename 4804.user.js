// ==UserScript==
// @name        feber.se-fejkremover
// @author 	Coldshark
// @namespace   http://www.feber.se
// @description	Removes all comments containing the word "fejk" in feber site comments.
// @include         http://*.feber.se/*
// ==/UserScript==

(function() {

        elements = document.getElementsByTagName( "tr" );
        var i;
        for( i = 0 ; i < elements.length ; i ++ )
        {
	                if( elements[i].innerHTML.toLowerCase().indexOf("fejk") > -1)
	                {
				
	        		elements[i-1].style.display = "none";
		                elements[i].style.display = "none";
				found = true;
		        }
        }
	
})();
