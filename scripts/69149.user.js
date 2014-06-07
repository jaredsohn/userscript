// ==UserScript==
// @name           Ikariam Signature
// @namespace      http://www.colonial-fleet.nl
// @author	   JosDaBosS
// @description    Adds a personal signature to your messages.
// @include        http://s*.ikariam.*/index.php?view=sendIKMessage*
// @include        http://s*.ikariam.*/index.php?view=options*
// @version        0.1
// ==/UserScript==

var version = "0.1";
var page = document.getElementsByTagName('body')[0].id;
var lang = {
		 defaultSignature: 'Message signature',
         saveconfig: 'Save'
};

function getIkaDomain(s) {
   var spl = s.toLowerCase().split(".");
   return (spl[1] != 'ikariam' ? spl[1] : spl[spl.length - 1]);
}

function getIkaServer(s) {
   return s.toLowerCase().split(".")[0];
}

var serDom = '.' + getIkaServer(top.location.host) + '.' + getIkaDomain(top.location.host);
var defaultSignature = GM_getValue('defaultSignature' + serDom,"");

getElementsByClass = function (inElement, className) {
   var all = inElement.getElementsByTagName('*');
   var elements = [];
   for (var e = 0; e < all.length; e++) {
      if (all[e].className == className) {
         elements[elements.length] = all[e];
      }
   }
   return elements;
};

if (document.getElementsByTagName('body')[0].id=="options"){
   var newElement = document.createElement("form");
   newElement.setAttribute('id', 'optionSignature');
   newElement.innerHTML =
      "<div class='contentBox01h'>" +
         "<h3 class='header'>" +
            "<a href='http://userscripts.org/scripts/show/69149' target='_blank'>Signature v " + version + "</a>" +
         "</h3>" +
         "<div class='content'>" +
            "<table cellpadding='0' cellspacing='0'>" +
               "<tbody>" +
                  "<tr>" +
                     "<th id='defaultSignature'>" + lang.defaultSignature + "</th>" +
						"<td><TEXTAREA NAME='' ROWS='10' COLS='40' id='defaultSignatureValue'>" + defaultSignature + "</TEXTAREA></td>" +
                  "</tr>" +
               "</tbody>" +
            "</table>" +
            "<div class='centerButton'>" +
               "<input class='button' id='saveSignatureOptions' value='" + lang.saveconfig + "'>" +
            "</div>" +
         "</div>" +
         "<div class='footer'></div>" +
      "</div>";

   document.getElementById('mainview').insertBefore(newElement, document.getElementById('vacationMode'));

   //Add button event
   document.getElementById('saveSignatureOptions').addEventListener('click', function ()
   {
      GM_setValue('defaultSignature' + serDom, document.getElementById('defaultSignatureValue').value);
      //change text to option page
      document.getElementById('defaultSignature').innerHTML = lang.defaultSignature;
      document.getElementById('defaultSignatureValue').focus();
   }, false);
}

if(document.getElementsByTagName('body')[0].id=="sendIKMessage" && defaultSignature!="") {
      document.getElementById('text').value = "\n\n" + defaultSignature + document.getElementById('text').value;
	  document.getElementById('text').setSelectionRange(0,0);
	  document.getElementById('text').focus();
}