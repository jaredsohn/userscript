// ==UserScript==
// @include http://prostor3.gov.si/javni/search?query*
// @name Get coordinates
// @version 3
// ==/UserScript==

function gup(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}


var tbl_obj = document.getElementsByTagName('table')[0];
//tbl_obj.style.display = 'none';
var y = 0;
var x = 0;
var stvrstic = 0;
for (i = 0; i <= 15; i++) {
    try {
        var parcRow = document.getElementsByTagName('tr')[i].innerHTML;

        var k_start = parcRow.indexOf("('parcelni_deli','");
        var k_end = parcRow.indexOf("','parcelni_deli,parcele");
        var xy = parcRow.substring(k_start + 18, k_end)
        var v1 = (xy.indexOf(",") + 1);

        if (v1 == 0) { }
        else {
            stvrstic = stvrstic + 1;
            var v2 = xy.indexOf(",", v1) + 1;
            var v3 = xy.indexOf(",", v2) + 1;
            var v4 = v3 + 7;
            k1 = xy.substring(0, v1 - 1);
            k2 = xy.substring(v1, v2 - 1);
            k3 = xy.substring(v2, v3 - 1);
            k4 = xy.substring(v3, v4);
            var ys = Math.round((k1 * 1 + k3 * 1) / 2)
            var xs = Math.round((k2 * 1 + k4 * 1) / 2)
            y = y + ys
            x = x + xs
        };
    }
    catch (err) { };
};
// alert(x);
y = Math.round(y / stvrstic);
x = Math.round(x / stvrstic);


var kpc = gup("query");
var imeko = gup("imeko");
var ko = kpc.substring(0, kpc.indexOf("%20"));
var parc = kpc.substring(kpc.indexOf("%20") + 3, 15);
var p1_start = kpc.indexOf("%20") + 3;
var p2 = 0
if (kpc.indexOf("/") == -1) { p1 = parc }
else {
    var p1_end = kpc.indexOf("/");
    var p1 = kpc.substring(p1_start, p1_end);
    var p2_start = kpc.indexOf("/");
    p2 = parc.replace(p1 + "/", "");
};

//alert('tralala')
var qs = "?imeko=" + imeko + "&ko=" + ko + "&parc=" + parc + "&p1=" + p1 + "&p2=" + p2 + "&y=" + y + "&x=" + x;


var script_number=112432;

try
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/'+ script_number +'.meta.js?'+new Date().getTime(),
		headers: {'Cache-Control': 'no-cache'},
		onload: function(resp)
		{
			var remote_version;
			
			remote_version=parseInt(/@version\s*(.*?)\s*$/m.exec(resp.responseText)[1]);
			alert('Remote version is: '+ remote_version);
		}
	});
}
catch (err)
{
	alert('An error occurred while checking the version:\n'+ err);
}





window.location = "http://www.steza.net/MozaikGis/MozaikGIS.htm" + qs;

	