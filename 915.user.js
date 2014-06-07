// ==UserScript==
// @name          Dilbert Lite
// @namespace     http://www.dilbert.com/
// @description	  Removes unnecessary ads from Dilbert
// @include       http://www.dilbert.com/
// ==/UserScript==

(function() {
  window.addEventListener("load", function(e) {
	// Removes the top ad
	var bodyNode = document.getElementsByTagName("body");
	var tableNodes = document.getElementsByTagName("table");
	bodyNode[0].removeChild(tableNodes[0]);

	// Removes the feature row
	var tdNodes = document.getElementsByTagName("td");
	for(i=1;i<tdNodes.length;i++){
		if(tdNodes[i].getAttribute('background') == "/comics/dilbert/images/current_features_inside_bg_duh.gif"){
			parent = tdNodes[i].parentNode;
			grandparent = parent.parentNode;
			grandparent.removeChild(parent);
		}
	} 
	
	


	addStripBorder();
	removeSideAd();

  }, false);

function addStripBorder() {
	// Add side border to strip row
	var imgNodes = document.getElementsByTagName("img");
	for(i=1;i<imgNodes.length;i++){
		if ((imgNodes[i].alt) && (imgNodes[i].alt.match("Today's Comic"))) {
			var counter = 7;
			superparent = imgNodes[i];
			while (counter > 0) {
				superparent = superparent.parentNode;
				counter--;
			}
			superparent.style.border = "2px solid red";
// '<TD WIDTH="9" BACKGROUND="/comics/dilbert/images/current_features_border_right2.gif" ROWSPAN="2"><IMG SRC="/comics/dilbert/images/current_features_border_corner_top_right2.gif" WIDTH="9" HEIGHT="10" BORDER="0" ALT=""><BR><IMG SRC="/comics/dilbert/images/current_features_border_right2.gif" WIDTH="9" HEIGHT="20" ALT="" BORDER="0"></TD>';

			newTD = document.createElement('td');
			newTD.setAttribute('width', '9');
			newTD.style.background = 'url(/comics/dilbert/images/current_features_border_right2.gif) repeat-y';

//			newIMG_1 = document.createElement('img');
//			newIMG_1.setAttribute('src', "/comics/dilbert/images/current_features_border_corner_top_right2.gif");
//			newIMG_1.setAttribute('width', '9');
//			newIMG_1.setAttribute('height', '10');
//			newIMG_1.setAttribute('border', '0');
//			newTD.appendChild(newIMG_1);
//
//			newBR = document.createElement('br');
//			newTD.appendChild(newBR);

			newIMG_2 = document.createElement('img');
			newIMG_2.setAttribute('src', "/comics/dilbert/images/current_features_border_corner_top_right2.gif");
			newIMG_2.setAttribute('width', '9');
			newIMG_2.setAttribute('height', '20');
			newIMG_2.setAttribute('border', '0');
			newTD.appendChild(newIMG_2);

			superparent.appendChild(newTD);
		}
	}
}

function removeSideAd() {
	var imgNodes = document.getElementsByTagName("img"); 
	for(i=1;i<imgNodes.length;i++){
		if(imgNodes[i].alt.match("Advertisement")){
			parent = imgNodes[i].parentNode;
			grandparent = parent.parentNode;
			grandparent.removeChild(parent);
		}
	} 
}

}
)();
