// ==UserScript==
// @name           ifs-xvideos
// @namespace      ifly2sky
// @description    Save As FLV Viedo at www.xvideos.com
// @include        http://www.xvideos.com/video*
// ==/UserScript==

function get_xpath2(xpath_expr){var nodes = [];var ssnodes = document.evaluate(xpath_expr, document, null, 7, null);  for (var i = 0 ; i < ssnodes.snapshotLength; i++){ nodes.push(ssnodes.snapshotItem(i));}  return nodes;}
function rmads(ads) {for (var i = 0; i < ads.length; i++) { var x = get_xpath2(ads[i]); for (var j = 0; j < x.length; j++) { x[j].style.cssText='display:none'; } }}

function remap() 
{
	var ads = [
	'//table[@width="950"]/tbody/tr/td[2]',
	'//div/table[@width="930"][@height="244"]'
	]
	rmads(ads);
}

function saveas_video() 
{
	var flv = document.getElementById("flash-player-embed");
	var flvVars= flv.getAttribute("flashvars");
	flvVars = decodeURIComponent(flvVars.substring(flvVars.lastIndexOf("flv_url=")+8));

	var as = document.createElement('a');
	as.setAttribute('href', flvVars);
	as.setAttribute('target', '_blank');
	as.setAttribute('alt', 'Use RightClick and Save As...');
	as.innerHTML = '<font color=white>Save As FLV Video</font>';
	flv.parentNode.insertBefore(as,flv.parent);
}

/////////// Run //////////
remap();
saveas_video();
