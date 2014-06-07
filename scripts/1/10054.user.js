// ==UserScript==
// @author	   Julien Gilles
// @name           Google Reader Print Button
// @description    Add two print buttons to Google Reader (one for current entry, one for all entries)
// @include        htt*://www.google.*/reader/view/*
// @version        3.3
// @license:       GPL V3
// ==/UserScript==

function greaderPrint(entry) {
   var disp_setting = "toolbar=yes,location=no,directories=yes,menubar=yes,"; 
   disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25"; 
   if (!entry) {
	  alert("Please select one entry first");
   }
   else {
	  var content = entry.innerHTML;
	  var docprint = window.open("about:blank","","");
	  var style = 'ins { text-decoration:none; }' 
		 + '* {font-size:8pt; }'
		 + '.entry-actions { display:none; }'
		 + '#scroll-filler { display:none; }'
		 + '.entry-title-go-to { display:none; }';
	  
	  docprint.document.write('<head>');
	  docprint.document.write('<title>');
	  docprint.document.write('</title>');
	  docprint.document.write('<style type="text/css">' + style + '</style>');
	  docprint.document.write('<body>');
	  docprint.document.write(content);
	  docprint.document.close(); 
	  docprint.focus(); 
	  docprint.print();
   }
}


function initializePrintButtons() {
   var linksContainer = document.getElementById('viewer-footer');
   
   if (!linksContainer) {
      window.setTimeout(function() { initializePrintButtons() }, 1000);
      return;
   }
   printButton = document.createElement('div');
   printButton.addEventListener("click", function() { greaderPrint(document.getElementById('current-entry')) }, false);

   printButton.innerHTML ='<div role="wairole:button" tabindex="0" class="goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight" id="entries-down"><div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body"><div class="text">Print</div></div></div></div></div></div></div>';

   linksContainer.appendChild(printButton);

   printButton2 = document.createElement('div');
   printButton2.addEventListener("click", function() { greaderPrint(document.getElementById('entries')) }, false);
   printButton2.innerHTML ='<div role="wairole:button" tabindex="0" class="goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight" id="entries-down"><div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body"><div class="text">Print All</div></div></div></div></div></div></div>';
   linksContainer.appendChild(printButton2);

}

initializePrintButtons();