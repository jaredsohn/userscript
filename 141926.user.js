// ==UserScript==
// @name           YT-TagBack
// @namespace      Vivre
// @author         Vivre
// @copyright      2012+, Vivre
// @licence        Free for personal and/or non-commercial use
// @description    Reinsert tags into meta-description on yt video pages
// @version        20.12.2012 v07
// @website        http://userscripts.org/scripts/show/141926
// @include        http://www.youtube.com/watch*
// @include        https://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        https://youtube.com/watch*
// ==/UserScript==
version = "20.12.2012 v07";


// ************************************
// 
// Aim of this script is to reinsert the video meta tags 
// into the video description on yt watch pages. 
// 
// Since mid august '12 they've been hidden and a small 
// amount would be available from the html source header.
// 
// But often the videos do have much more tags which this 
// script derives from the videos description data file.
// 
// enjoy ~ V
// 
// ************************************
// 
// v04 complete reworked method now grabbing
// the tags from injected script-code.
// Previous api-data had been removed!
// 
// ************************************


var head=document.getElementsByTagName('head')[0];
if(!head) return;

// exclude iframe?

// *************** settings **************
// 
var linkTags = 1 ;	// set to 0 for plain tags, to 1 for clickable search-link-tags

var callTags = 0 ;	// set to 1 to activate additional button
// 
// ***************************************



// +++++ additional callTags button

// optional simple (customizable!) button to call the tags into alert-popup for easy copying


if(callTags) {
	body = document.body;
	puh = document.createElement("button");
	puh.setAttribute('id','but5');
	puh.setAttribute('style','color:linen\; background-color:green\; z-index:99999');
	puh.style.position = "absolute";	// "relative" "fixed" (keep in sight) 
	puh.style.opacity= 0.8;
	puh.style.top = "43px";
//	puh.style.left = "641px";
	puh.style.right = "121px";
	puh.innerHTML = 'call Tags';
	puh.addEventListener("click", showTags, true);
	body.insertBefore(puh, body.firstChild);
}
function showTags(){alert('Tags to copy : \n\n' + vidTallP);};



// +++++ main script


var vidTall = "";

function getTags(){ 

	var stgSc = document.querySelectorAll("script");

	for (var i=0; i<stgSc.length; i++) {
	strFo = stgSc[i].textContent.toString();

		if (strFo.match(/\"keywords\":/)) {
//		vidTall = strFo.split('keywords\": ')[1].split(' \"cr\":')[0];
		vidTall = strFo.split('keywords\": ')[1].split(', \"')[0];
		vidTall = vidTall.replace(/\,/g, ' ');
		vidTall = eval(vidTall);
		vidTallP = vidTall;	// preserve plainTags


		// change the tags into yt-search-links 
		if(linkTags) {
		vidTall = vidTall.split(" ");
		for (var j = 0; j < vidTall.length; j++) { 
			vidTL = "<a href=\"results?search_query=" +vidTall[j]+ "\" target=\"_blank\">" +vidTall[j]+ "</a> ";
			vidTall[j] = vidTall[j].replace(vidTall[j], vidTL);
			};
		vidTall = vidTall.toString().replace(/\,/g, " ");
		};


		var tagLine = '<h4>Tags:</h4>' + '<p style="font-weight:normal;">' + vidTall + '</p>';

try {		if (document.getElementsByTagName("body")[0].classList.contains("bwpScript")) {
			document.getElementById("watch-metadata").innerHTML += tagLine;
		} else {
			document.getElementById('watch-description-extras').innerHTML += tagLine;
		};
}  catch(ex) {};
		}
	}
};
getTags();





debug("Reached end of script");
// End of script
