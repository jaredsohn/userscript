// ==UserScript==
// @name           REALTOR.ca Total Room Size
// @namespace      realtor.ca
// @description    Calculates and shows the total square metres for each room and displays the total. 
// @include        http://www.realtor.ca/propertyDetails.aspx?*
// @include        http://www.realtor.ca/PropertyDetails.aspx?*
// @include        http://mls.ca/propertyDetails.aspx?*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    
    var sizes = Array()
    
    $('td.PropDetailsSpecValue span').each(function (i, e) {
      if (e.getAttribute('ismeasurement') == "True") {
        var spl = e.text.split(/[mx ]+/)
        var area = parseFloat(spl[0]) * parseFloat(spl[1])
        sizes[area] = true
        e.innerHTML = e.innerHTML + "<br/><i>" + Math.round(area * 100) / 100 + " sq m</i>"
      }
    })

    // Often the same room is listed multiple times (Living + Dining Room).
    // It's possible you will have two bedrooms that are the exact same size,
    // but in general making this assumption leads to better estimates.
    var total = 0.0  
    for (var s in sizes) {
      total += parseFloat(s)
    }
    
    
    var totalDisp = Math.round(total * 100) / 100
    var totalDispFt = Math.round((total * 10.7639104) * 100) / 100
    $('#_ctl0_elBuildingDetails_lblRoomSpecifications').append(" " + totalDisp + " sq m (" + totalDispFt + " sq. ft)")
}