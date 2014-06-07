// ==UserScript==
// @name       FreeCycleMap
// @namespace  http://userscript.farmanimal.com/
// @version    0.1
// @description  enter something useful
// @match      http://groups.freecycle.org/*/posts/*
// @copyright  2012+, dk
// ==/UserScript==

function addJQuery(callback) {
    
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?sensor=false";
    var head = document.getElementsByTagName("head")[0];
    (head || document.body).appendChild(script);
    
    script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// ====================
// == ACTION NEEDED ===
// edit "myLoc" to your location
// ====================

function main(){
    $(document).ready(function() {
        var myLoc = "Chicago, IL 60608, USA";
        var elem = $("tr>th:contains('Location')").parent().children().eq(1);
        var destLoc = elem.text().replace("&","and");
        //var destText = destLoc.parent().text().replace('Location','').trim();
        $.getJSON("http://maps.googleapis.com/maps/api/distancematrix/json?origins="+myLoc+"&destinations="+destLoc+"&mode=driving&sensor=false", function(data){
            elem.html(elem.html()+
                      "<br/><a href='https://maps.google.com/maps?saddr="+myLoc+"&daddr="+destLoc+"'>"+
                      data.rows[0].elements[0].distance.text + " - " + data.rows[0].elements[0].duration.text+
                      "</a><div id=map style='height: 10px; width: 10px' >");
            
// THIS DOESN'T WORK, I just leave it here for now!!!!
            setTimeout(function(){
                var map;
                var geocoder;
                
                geocoder = new google.maps.Geocoder();
                var myOptions = {
                    zoom: 8,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: true
                };
                map = new google.maps.Map(document.getElementById("map"), myOptions);
                
                var address = "chicago";
                geocoder.geocode({
                    'address': address
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                        
                    } else {
                        alert("Geocode was not successful for the following reason: " + status);
                    }
                });
            }, 1000);
        });
    });
}
// load jQuery and execute the main function
addJQuery(main);

