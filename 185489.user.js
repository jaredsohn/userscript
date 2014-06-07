// ==UserScript==
// @name        Yahoo Hong Kong AD remover
// @namespace   www.nightrail.com
// @description Remove advertisement
// @include     https://hk.yahoo.com/
// @version     2.1
// ==/UserScript==


function remove(id){
    var elem = document.getElementById(id);
    if (typeof elem != "undefined" && elem != null){
    	elem.parentNode.removeChild(elem);
    }
}

function emptyNode(id){
	var elem = document.getElementById(id);
	if (typeof elem != "undefined" && elem != null){
    	elem.innerHTML = "";
    }
}

function emptyByClass(className){
    var cusid_ele = document.getElementsByClassName(className);
	for (var i = 0; i < cusid_ele.length; ++i){
    	var elem = cusid_ele[i];  
    	if (typeof elem != "undefined" && elem != null){
    		elem.innerHTML = "";
    	}
    }
}
    

// Left float AD
remove("newlogo_bubble_160x225_div");

// bottom AD
//remove("adbn_UMU");
emptyNode("tglBox");


// Under mail AD
remove("pa_ad");
remove("ad_cont2");

// Search box AD
remove("searchbox_ad");

// left panel top AD
remove("video_around_trough");
emptyNode("ysm-ad");
emptyNode("eu");
//remove("mntl1");
//remove("mntl1");
emptyByClass("mantlectnr");

// middle panel AD
remove("ad_cont1");
//remove("aboveads");
remove("video_blog");
remove("ad_cont3");
remove("nwssponsor_ctnr");

