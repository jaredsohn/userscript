// ==UserScript==
// @name        Phone Number to Local Time
// @namespace   http://userscripts.org/users/dstjacques
// @description Phone Number to Local Time
// @include     *
// @version     1
// ==/UserScript==

function getSelection()
{
   var text = "";
   if (window.getSelection)
   {
      text = window.getSelection();
   }
   else if (document.getSelection)
   {
      text = document.getSelection();
   }
   else return;

   return text;
}

function localTimeFinder()
{
   var selection = new String(getSelection());

   var phoneNumber = new RegExp("[0-9]{3}[^0-9]*[0-9]{3}[^0-9]*[0-9]{4}");

   var rawNumber = phoneNumber.exec(selection);

   var digitNumber = rawNumber[0].replace(new RegExp('[^0-9]','g'),'');

   if(digitNumber == "")
   {
      return;
   }

   var areaCode = digitNumber.substring(0, 3);
   var areaCodeURL = "http://www.areacodelocations.info/" + areaCode[0] + "/" + areaCode + ".html";

   GM_xmlhttpRequest({
      method: "GET",
      url: areaCodeURL,
      onload: function(response) {
         var responseHTML = response.responseText;
         var localTimePattern = new RegExp('<div id="time">([^!]+)</div>');
         var localTimeDivHTML = localTimePattern.exec(responseHTML)[1]
         var localTime = localTimeDivHTML.replace(/^\s+|\s+$/g,"");
         alert(localTime);
      }
   });
}

document.addEventListener ("mouseup", function () { localTimeFinder() }, false);
