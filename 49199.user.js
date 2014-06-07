// ==UserScript==
// @name        RMLS mapper
// @version     1.3
// @author	Kees Cook
// @author	Brandon Philips
// @namespace   git://ifup.org/philips/rmls-mapper.git
// @description Overrides the global function "MGS_ShowMap_Ex" to use Google maps
// @include     http://*.rmlsweb.com/*
// @include     https://*.rmlsweb.com/*
// @license     GNU General Public License
// ==/UserScript==

//(function() {

window.addEventListener(
    'load', 
    function() {

    div = document.createElement('div');
    div.innerHTML = '<script language="javascript">'+
'function MGS_ShowMap_Ex(filename, serv)'+
'{'+
'    var re = new RegExp("address=([^&]+),([^&]+)");'+
'    var m = re.exec(filename);'+
'    if (m == null) {'+
'        alert("Could not find address in ShowMap URL");'+
'    } else {'+
//'        alert("Found ["+m[1]+"] ["+m[2]+"]");'+
'        var GoogleWin = window.open("http://maps.google.com/?t=h&q="+m[1]+"+"+m[2],"rmlsGoogleWin","width=800,height=750,scrollbars=1");'+
'        if (GoogleWin) GoogleWin.focus();'+
'        var PortlandWin = window.open("http://portlandmaps.com/parse_results.cfm?query="+m[1],"rmlsPortlandWin","width=800,height=750,scrollbars=1");'+
'        if (PortlandWin) PortlandWin.focus();'+
'    }'+
'}'+
'</script>';
    document.body.appendChild(div);

},
    true);

//});
