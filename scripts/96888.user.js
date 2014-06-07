// ==UserScript==
// @name			Pardus Quick Universe Switcher
// @version			v2
// @namespace		marnick.leau@skynet.be
// @description		Allows you to quickly switch between Orion, Artemis and Pegasus.
// @icon			http://www.majhost.com/gallery/Faziri/Pardus/Scripts/icon.png
// @include			http*://*.pardus.at/msgframe.php
// @grant			
// ==/UserScript==

// <!-- User variables -->

// <!-- End of user variables -->

// <!-- Standard variables -->

var scriptname = "Pardus Quick Universe Switcher";
var scriptversion = 1;
var imghost = "http://s1135.photobucket.com/albums/m626/TheRealFaziri/";
var datahost = "http://dl.dropbox.com/u/3357590/GM%20Scripts/";
var imgpath = scriptname.replace(/Pardus /g,"Pardus/").replace(/ /g,"%20") + "/";
var datapath = scriptname.replace(/ /g,"_").toLowerCase() + "/";

// <!-- End of standard variables -->

if (location.href.indexOf("/msgframe.php") !== -1) {
	var uni = document.getElementById('universe');
	var uniName = uni.src.match(/orion|artemis|pegasus/)[0];
	
	function createPic(name) {
		var uniPic = document.createElement('img');
		uniPic.setAttribute('onclick',"parent.location.href='http://www.pardus.at/index.php?section=account_play&universe=" + name.charAt(0).toUpperCase() + name.substring(1,name.length) + "'");
		uniPic.src = "http://static.pardus.at/various/universes/" + name + "_16x16.png";
		uniPic.setAttribute('style',"width: 13px; height: 13px; border: 0; vertical-align: middle;");
		uniPic.title = "Quickly switch over to " + name.charAt(0).toUpperCase() + name.substring(1,name.length);
		return uniPic;
	}

	if (uniName === "orion") {
		uni.parentNode.insertBefore(createPic("pegasus"),uni.nextSibling);
		uni.parentNode.insertBefore(document.createTextNode(" "),uni.nextSibling);
		
		uni.parentNode.insertBefore(createPic("artemis"),uni.nextSibling);
		uni.parentNode.insertBefore(document.createTextNode(" "),uni.nextSibling);
	}
	else {
		if (uniName === "artemis") {
			uni.parentNode.insertBefore(createPic("orion"),uni);
			uni.parentNode.insertBefore(document.createTextNode(" "),uni);
			
			uni.parentNode.insertBefore(createPic("pegasus"),uni.nextSibling);
			uni.parentNode.insertBefore(document.createTextNode(" "),uni.nextSibling);
		}
		else {
			if (uniName === "pegasus") {
				uni.parentNode.insertBefore(createPic("orion"),uni);
				uni.parentNode.insertBefore(document.createTextNode(" "),uni);
				
				uni.parentNode.insertBefore(createPic("artemis"),uni);
				uni.parentNode.insertBefore(document.createTextNode(" "),uni);
			}
		}
	}
}