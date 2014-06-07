// ==UserScript==
// @name           Tempo MSL fix
// @namespace      temosocalmsl
// @description    FIxes issue with frames on Tempo SocalMLS
// @include        http://www.tempo.socalmls.com/
// ==/UserScript==

window.addEventListener('load',  function()
{
try
{
	// Check if you are at the transport page
	if (document.getElementById('main') != null)
	{
	    document.getElementById('main').height = "1200px";
	}
	if (document.getElementById('trTop') != null) {
	    document.getElementById('trTop').height = "500px";
	}
}
catch(er){
	alert("Something...\n" + er);
}
},
	true);