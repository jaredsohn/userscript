// ==UserScript==
// @name          Flickr Photo Page Enhancer
// @description	  Generates html to easily copy'n paste thumbnail & description.
// @namespace     http://www.rhyley.org/gm/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*

// Based upon the original by Fabricio Zuardi (http://www.mamata.com.br/greasemonkey/)
// By Jason Rhyley (jason AT rhyley DOT org)
// ==/UserScript==

(function() {

	//if a photo page
	if (document.getElementById("button-bar")) { 

/*	function sizeExists(url) {
		return GM_xmlhttpRequest({
			url: url,
			method: "HEAD",
			onload: function(response) {
				if (response.statusText.indexOf('502') < 0 && response.responseHeaders.indexOf('Content-Length: 0') < 0 && response.responseHeaders.indexOf('Content-Length: 3386') < 0) {
					alert (response.responseHeaders +"\n"+url); return true; }
				else return false;
			}
		});
	}
*/
	function genUrl(sz,url){
		return url.replace("_m.",""+sz+".");
	}
	
	function doPPEsetup() {
		pid = location.pathname.split('/')[3];
		uURI = document.evaluate("//link[contains(@rel,'image_src')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href;

		sizeurls = new Array('s','t','m','r','z','b','o'); 
		sizedesc = new Array('s','t','m','r','z','b','o'); 
		sizeurls['s'] = genUrl('_s',uURI); 		sizedesc['s'] = "Square";
		sizeurls['t'] = genUrl('_t',uURI);		sizedesc['t'] = "Thumb";
		sizeurls['m'] = uURI;				sizedesc['m'] = "Small";
		sizeurls['r'] = genUrl('',uURI);		sizedesc['r'] = "Med 500";
		sizeurls['z'] = genUrl('_z',uURI);		sizedesc['z'] = "Med 640";
		sizeurls['b'] = genUrl('_b',uURI);		sizedesc['b'] = "Large";
		sizeurls['o'] = genUrl('_o',uURI);		sizedesc['o'] = "Original";
		

		var containerA = document.createElement("div");
		containerA.setAttribute("class","photo-sidebar-additional-info");
		containerA.innerHTML += '<h4>Sizes</h4> ';
		var containerA1 = document.createElement("div");
		containerA1.innerHTML += 'Links: <a href="' + sizeurls['s'] + '">' + sizedesc['s'] + '</a>, ';
		containerA1.innerHTML += '<a href="' + sizeurls['t'] + '">' + sizedesc['t'] + '</a>, ';
		containerA1.innerHTML += '<a href="' + sizeurls['m'] + '">' + sizedesc['m'] + '</a>, ';
		containerA1.innerHTML += '<a href="' + sizeurls['r'] + '">' + sizedesc['r'] + '</a>, ';
		containerA1.innerHTML += '<a href="' + sizeurls['z'] + '">' + sizedesc['z'] + '</a>, ';
		containerA1.innerHTML += '<a href="' + sizeurls['b'] + '">' + sizedesc['b'] + '</a>, ';
		containerA1.innerHTML += '<a href="' + sizeurls['o'] + '">' + sizedesc['o'] + '</a>,  ';


		//This next bit inserts a 'Copy HTML' link which shows a textarea
		//with the thumbnail & description suitble for copy & paste.
		var containerA2 = document.createElement("div");
		containerA.innerHTML += '<span id="showHide">Show Quicklink</span>: '+
			'<a id="thLink" href="javascript:showQuick(0)" style="text-decoration:none">Thumbnail</a>, ' +
			'<a id="smLink" href="javascript:showQuick(1)" style="text-decoration:none">Small</a>, ' +
			'<a id="sqLink" href="javascript:showQuick(2)" style="text-decoration:none">Square</a>';

		containerA.innerHTML += '<textarea rows="6" cols="26" id="texty" style="display:none">';

		//get various attributes of the image for use in the generated HTML 
		if (document.getElementById("title_div" + pid)) 
			ptitle = document.getElementById("title_div" + pid).innerHTML;
			else ptitle = 'Flickr - photo sharing!';

		if (document.getElementById("description_div" + pid) && document.getElementById("description_div" + pid).innerHTML != "&nbsp;")
			pdescription = ' ' + document.getElementById("description_div" + pid).innerHTML;
			else pdescription = '';

		pOwnerName = location.pathname.split('/')[2];
		(pOwnerName.indexOf('@') != -1) ? pOwnerName = '' : pOwnerName = ', by ' + pOwnerName;

		imglink = '<a title="' + ptitle + pOwnerName + '" href="' + document.location + '">'
		unsafeWindow.thumb_html = imglink + '<img src="' + sizeurls['t'] + '"></a> ' + pdescription;
		unsafeWindow.small_html = imglink + '<img src="' + sizeurls['m'] + '"></a> ' + pdescription;
		unsafeWindow.squar_html = imglink + '<img src="' + sizeurls['s'] + '"></a> ' + pdescription;

		containerA.appendChild(containerA1);
		containerA.appendChild(containerA2);
		var sc = document.getElementById("sidecar");
		sc.appendChild(containerA);
		sc.appendChild(containerA);
		sc.appendChild(containerA);

	} // end PPEsetup()
	
	unsafeWindow.showQuick = function (size){			// By request from striatic 
		texty = document.getElementById("texty");
		texty.style['display'] = 'block';
		if (size == 0) {
			texty.value = unsafeWindow.thumb_html;
			unsafeWindow.setWeight("thLink",'bold');
			unsafeWindow.setWeight("smLink",'normal');
			unsafeWindow.setWeight("sqLink",'normal');
		} else if (size == 1) {
			texty.value = unsafeWindow.small_html;
			unsafeWindow.setWeight("thLink",'normal');
			unsafeWindow.setWeight("smLink",'bold');
			unsafeWindow.setWeight("sqLink",'normal');
		} else if (size == 2) {
			texty.value = unsafeWindow.squar_html;
			unsafeWindow.setWeight("thLink",'normal');
			unsafeWindow.setWeight("smLink",'normal');
			unsafeWindow.setWeight("sqLink",'bold');
		}
		texty.select();
		document.getElementById("showHide").innerHTML = '<a href="javascript:hideQuick()" style="text-decoration:none">[Hide Quicklink]</a>'
	}

	unsafeWindow.hideQuick = function (){
		texty = document.getElementById("texty");
		texty.style['display'] = 'none';
		unsafeWindow.setWeight("thLink",'normal');
		unsafeWindow.setWeight("smLink",'normal');
		unsafeWindow.setWeight("sqLink",'normal');
		document.getElementById("showHide").innerHTML = 'Show Quickink';
	}
	
	unsafeWindow.setWeight = function (what,weight) {
		document.getElementById(what).setAttribute('style','text-decoration:none;font-weight:' + weight );
	}

	doPPEsetup()
}
//close if a photo page

})();