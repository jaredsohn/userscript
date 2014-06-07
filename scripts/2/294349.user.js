// ==UserScript==
// @name       Pogdesign links to ThePirateBay
// @version    0.1
// @description  Add ThePirateBay links to Pogdesign's catalog
// @include        http://*pogdesign.co.uk/cat*
// @copyright  2014, Ivan Cantalice
// ==/UserScript==

function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

var elements = document.querySelectorAll('.ep');

for (var i = 0; i < elements.length; i++) {  
  var currentParagraph = elements[i].getElementsByTagName('p')[0];
  var tpbSearchText = currentParagraph.getElementsByTagName('a')[0].innerText.replace(/'/g, '');
  var epInfo = currentParagraph.getElementsByTagName('a')[1].innerText;
  var matches = epInfo.match(/(\d+) - Ep: (\d+)/);
  if(matches) {
	tpbSearchText += "S" + leftPad(matches[1], 2) + "E" + leftPad(matches[2], 2);	
  } else {
	tpbSearchText += epInfo;
  }  
  console.log(tpbSearchText);
  currentParagraph.innerHTML += "<br /><a href='http://thepiratebay.se/search/" + tpbSearchText + "/0/7/0' target='_blank'>Search in TPB</a>";
}