// ==UserScript==
// @name HírTV Video Helper
// @description Helps playing HírTV videos on Mac computers
// @author segabor
// @namespace me.segabor
// @version 0.1
// @include	http://www.hirtv.hu/?tPath=/view/videoview&videoview_id=*&sp=Video
// @include	http://www.hirtv.hu/?tPath=/view/videoview/hirado&sp=Video
// ==/UserScript==

/**
 * Find movie url
 */
var vidObj = document.getElementsByTagName("OBJECT")[0];
var k;
var pa = vidObj.getElementsByTagName("PARAM");
var mov_url; // url pointing to movie
for(k=0; k<pa.length; k++) {
	var p = pa[k];
	if (p.name == "URL") {
		mov_url = p.value;
		break;
	}
}
/// alert(mov_url);

var mov_width = vidObj.width;
var mov_height = vidObj.height;
var parentNode = vidObj.parentNode;


/**
 * Create new media elements
 */
try {
	var new_obj = document.createElement("OBJECT");
	new_obj.setAttribute("id", "mediaPlayer");
	new_obj.setAttribute("width", mov_width);
	new_obj.setAttribute("height", mov_height);
	new_obj.setAttribute("classid", "CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95");
	new_obj.setAttribute("codebase", "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701");
	new_obj.setAttribute("type", "application/x-oleobject");

	parentNode.replaceChild(new_obj, vidObj);
	
	// param items
	var param = document.createElement("PARAM");
	param.setAttribute("name", "fileName");
	param.setAttribute("value", mov_url);
	new_obj.appendChild(param);

	param = document.createElement("PARAM");
	param.setAttribute("name", "animationatStart");
	param.setAttribute("value", "true");
	new_obj.appendChild(param);
	
	param = document.createElement("PARAM");
	param.setAttribute("name", "autoStart");
	param.setAttribute("value", "true");
	new_obj.appendChild(param);

	param = document.createElement("PARAM");
	param.setAttribute("name", "showControls");
	param.setAttribute("value", "true");
	new_obj.appendChild(param);

	var emb = document.createElement("EMBED");
	emb.setAttribute("type", "application/x-mplayer2");
	emb.setAttribute("pluginspage", "http://microsoft.com/windows/mediaplayer/en/download/");
	emb.setAttribute("name", "mediaPlayer");
	emb.setAttribute("src", mov_url);
	emb.setAttribute("width", mov_width);
	emb.setAttribute("height", mov_height);
	emb.setAttribute("autostart", "true");
	new_obj.appendChild(emb);
} catch(e) {
	alert(e);
}
