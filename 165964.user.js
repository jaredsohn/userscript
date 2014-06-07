// ==UserScript==
// @name       GpsGate quick location
// @namespace  http://aphex.lt/
// @version    0.3
// @description  Enter my coordinates from gpsgate to any input field by pressing f2
// @description  Please enable "GPS in Browser" in Franson GpsGate output settings
// @match      *
// @copyright  2013+, Darius Ratkevičius
// @require 	http://code.jquery.com/jquery-latest.js
// @require 	http://localhost:12175/javascript/GpsGate.js
// ==/UserScript==



$(document).ready(function() {
    $('body').keyup(function(event) {
        
        if(event.which==113){  // After pressing F2    
            
            // Check if GpsGate is running
            if (typeof(GpsGate) == 'undefined' || typeof(GpsGate.Client) == 'undefined')
            {
                GM_notification('GpsGate not installed or not started!', null,null,1);
            } else {             	
                
                //GM_notification('Requesting position', 'Quick location',null,1);              
                
                // Send AJAX to GpsGate client
                
                var noCache = '&noCache=' + ((new Date()).getTime().toString().substr(5));
                
                
                GM_xmlhttpRequest({
                    method: "GET",
                    url: "http://localhost:12175/gps/getGpsInfo?jsonp=cb"+noCache,
                    onload: function(response) {
                        eval(response.responseText);
                        
                        /* GM_notification([
                        response.status,
                        response.statusText,
                        response.readyState,
                        response.responseHeaders,
                        response.responseText,
                        response.finalUrl,
                        response
                        ].join("\n"), 'Quick location',null,1);*/
                    }
                });
                
            }
            
        }
    });
    
});

function cb(json)
{
    // Calculate response age in sec
    var d1 = new Date();   
    var d2 = new Date(json.trackPoint.utc);   
    var diff= Math.abs((d1.getTime()-d2.getTime())/1000);    
    
    // show notification
    GM_notification("Data old: "+diff+" sec. \n "+json.trackPoint.position.latitude+' '+json.trackPoint.position.longitude, null,null,1);
    
    // fill in focused element
    $(document.activeElement).val(json.trackPoint.position.latitude+' '+json.trackPoint.position.longitude);      
}
