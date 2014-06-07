// ==UserScript==
// @name        HNS Zoom
// @namespace   https://zornco.com/
// @description Auto-Zoom
// @grant       none
// @include     /^http[s]?:\/\/intranet.support.com\/SDCWorkcenter/SEPortal/xfinity/xssflows/HNS.+Flows\/.+\/widgets.htm/
// @grant       none
// @downloadURL	https://userscripts.org/scripts/source/179147.user.js
// @updateURL	https://userscripts.org/scripts/source/179147.meta.js
// @version     2.0
// ==/UserScript==

/*--- Create a proper unsafeWindow object on browsers where it doesn't exist
    (Chrome, mainly).
    Chrome now defines unsafeWindow, but does not give it the same access to
    a page's javascript that a properly unsafe, unsafeWindow has.
    This code remedies that.
*/
var bGreasemonkeyServiceDefined     = false;

try {
    if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
        bGreasemonkeyServiceDefined = true;
    }
}
catch (err) {
    //Ignore.
}

if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
        var dummyElem   = document.createElement('p');
        dummyElem.setAttribute ('onclick', 'return window;');
        return dummyElem.onclick ();
    } ) ();
}

unsafeWindow['zoom'] = 400;

var script = unsafeWindow.document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js';
    script.type = 'text/javascript';
    unsafeWindow.document.getElementsByTagName("head")[0].appendChild(script);
    script.addEventListener('load', function(){
        unsafeWindow['zoom'] = 400;
        jQuery = unsafeWindow['jQuery'];
        unsafeWindow['$$'] = jQuery.noConflict(true);
            unsafeWindow.setInterval(function(){
                    zoom = eval("window['zoom']");
                    if(parent.viewMgr.sizeLast != zoom)
                        tickSelect(zoom);
                }, 1000);
        unsafeWindow['$$']("body").append(
        "<select id=\"zoomlevel\" style=\"position:absolute;top:400px;left:75px;\" onchange=\"window['zoom']=this.value;\">  <option value=\"500\">500%</option>  <option value=\"450\">450%</option>  <option value=\"400\" selected=\"selected\">400%</option>  <option value=\"350\">350%</option>  <option value=\"300\">300%</option>  <option value=\"250\">250%</option>  <option value=\"200\">200%</option>  <option value=\"150\">150%</option>  <option value=\"100\">100%</option></select>");
    }, false);