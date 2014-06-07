// ==UserScript==
// @name           MegaVideo Downloader
// @namespace      #aVg
// @description    You can now download videos directly from MegaVideo. Sweet!
// @include        http://www.megavideo.com/?v=*
// @version        0.1.1
// ==/UserScript==
function pad(a) {
	while(a.length < 4)
		a = "0" + a;
	return a;
}
function decrypt(str, key1, key2)
{
	var $1 = [];
	for (var i = 0; i < str.length; ++i)
	{
		$1.push(
			pad(
				Number("0x" + str.charAt(i)).toString(2)
			)
		);
	}
	$1 = $1.join("").split("");
	var $6 = [];
	for (var i = 0; i < 384; ++i)
	{
		key1 = (key1 * 11 + 77213) % 81371;
		key2 = (key2 * 17 + 92717) % 192811;
		$6[i] = (key1 + key2) % 128;
	}
	for (var i = 256; i >= 0; --i)
	{
		var $5 = $6[i];
		var $4 = i % 128;
		var $8 = $1[$5];
		$1[$5] = $1[$4];
		$1[$4] = $8;
	}
	for (var i = 0; i < 128; ++i)
	{
		$1[i] ^= $6[i + 256] & 1;
	}
	var $12 = $1.join("");
	var $7 = [];
	for (var i = 0; i < $12.length; i += 4)
	{
		var $9 = $12.substr(i, 4);
		$7.push($9);
	}
	var out = [];
	for (var i = 0; i < $7.length; ++i)
		out.push(
			parseInt( $7[i], 2).toString(16)
		);
	return out.join("");
}
GM_xmlhttpRequest({
	url : "http://www.megavideo.com/xml/videolink.php?v=" + location.href.match(/\bv=([^&?]+)/i)[1],
	method : "GET",
	onload : function(A) {
		function get(B) {return A.responseText.match(new RegExp("\\b"+B + "=\"([^\"]+)"))[1];}
		var lin = document.createElement("a");
		lin.textContent = "Download this video!";
		lin.setAttribute("style", "border-style: solid; padding: 13px; background: darkBlue none repeat scroll 0% 0%; position: absolute; top: 2px; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: white; font-size: 40px; -moz-border-radius-topleft: 5px; -moz-border-radius-topright: 5px; -moz-border-radius-bottomright: 5px; -moz-border-radius-bottomleft: 5px; border-top-width: 2px; border-right-width: 2px; border-bottom-width: 6px;");
		lin.href = "http://www"+get("s")+".megavideo.com/files/" +decrypt(get("un"), get("k1"), get("k2"))+ "/";
		document.body.appendChild(lin);
	}
});