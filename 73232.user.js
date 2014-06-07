// ==UserScript==
// @name           Google Maps 
// @namespace      GoogleMaps
// @description    Auto Input address for Google Maps. Jose Alejandro Garcia 2010
// @include        http://maps.google.c*
// ==/UserScript==

/* Source: http://jehiah.cz/archive/firing-javascript-events-properly */
function fireEvent(obj,evt){                    
                    var fireOnThis = obj;
                    if( document.createEvent ) {                          
                        var evObj = document.createEvent('MouseEvents');
                        evObj.initEvent( evt, true, false );
                        fireOnThis.dispatchEvent(evObj);
                    } else if( document.createEventObject ) {
                        fireOnThis.fireEvent('on'+evt);
                    }
			}		


/*Executes after page is loaded*/
window.addEventListener("load", function(e) 
{
		var address 			= "555 Test Address";
		var getDirectionsLink 		= 'd_launch';
		var startAddressInputBox 	= 'd_d';
		var endAddressInputBox 		= 'd_daddr';
		
        link = document.getElementById(getDirectionsLink);
		fireEvent(link,"click");
		
		document.getElementById(startAddressInputBox).value=address;
        document.getElementById(endAddressInputBox).focus();
		
}, false);             
