// ==UserScript==
// @name           Remove deviantART Advertisements
// @namespace      Apelsin
// @description    Removes ads from deviantART. Keep It Simple, Stupid. This one uses Ockham's Razor as opposed to all of the other ones which don't even work anymore.
// @include        http://*.deviantart.com
// @include        http://*.deviantart.com/
// @include        http://*.deviantart.com/*
// ==/UserScript==

function get_search_elements(class_targets, id_targets, gminame_targets) {
	var tags=document.getElementsByTagName("*");
	var matching = new Array();
	for(i=0; i<tags.length; i++) {
		var x = false;
		//For some reason the following code doesn't like to
		//encapsulate into another function, and thus I've written
		//out all of the loops which handle big fat string compar-
		//isons. (I had tried to encapsulate these and only got as
		//far as Firefox crashing on me. Regardless, this works:
		for(j=0; j<class_targets.length; j++) {
			if(tags[i].className.indexOf(class_targets[j])!=-1) {
				matching.push(x=tags[i]);
				break;
			}
		}
		if(x)continue;
		for(j=0; j<id_targets.length; j++) {
			if(tags[i].id.indexOf(id_targets[j])!=-1) {
				matching.push(x=tags[i]);
				break;
			}
		}
		if(x)continue;
		for(j=0; j<id_targets.length; j++) {
			if(tags[i].getAttribute('gmi-name')) {
				if(tags[i].getAttribute('gmi-name').indexOf(gminame_targets[j])!=-1) {
					matching.push(x=tags[i]);
					break;
				}
			}
		}
	}
	return matching;
}

function Remove_deviantART_Advertisements() {
	var classes = ["ad-blocking-makes-fella-sad", "ad-blocking-makes-fella-confused", "squareBrowsead", "sleekadbubble", "gallery-admaster", "adzone messages", "adso-magnifico", "btf_right_", "google_ads"];
	var ids = ["google_ads"];
	var gminames = ["ad_zone"];
	var to_remove = new Array();
	to_remove = get_search_elements(classes, ids, gminames);
	console.log("!");
	for(i = 0; i < to_remove.length; i++) {
		element = to_remove[i];
		element.parentNode.removeChild(element);
	}
}

Remove_deviantART_Advertisements();