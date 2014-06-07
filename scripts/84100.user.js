// ==UserScript==
// @name           Kazukaze SNAKEOMAN-O-JUTSU
// @namespace      BvS
// @include        http://www.animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

//newsnkbox? where ? is:

//   1  2  3  4  5  6
//  7  8  9 10 11 12 13
// 14 15 16 17 18 19 20
//  21 22 23 24 25 26

//The first bucket is the one you're going to sit on.
var pickBucket = [10, 1,7,14,21,26,20,13,6, 17,2,3,4,5,23, 24,25,22,19,18,16,15,12,11,9,8];

//XPath of the "SNAKEMAN..." title
var xpSnakemanTitle = "/html/body/center/table/tbody/tr/td/table/tbody/tr[2]/td/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr/td/center/font/font/b";
var xpOffer = "/html/body/center/table/tbody/tr/td/table/tbody/tr[2]/td/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/table[2]/tbody/tr/td/table/tbody/tr/td/font[2]/table/tbody/tr/td/form/font/table[7]/tbody/tr/td/b/font";

function selectNextBucket() {
  for(var i in pickBucket) {
    var number = pickBucket[i];
    var b = document.getElementById("newsnkbox"+number);
    if(b == null)
    {
      b = document.getElementById("snakeclick"+number);
    }
    if(b != null)
    {
      b.checked = true;
      return;
    }
  }
}

var state = 0;

function process_event(event) {
  if(event.keyCode==68) { //ENTER is 13, 68 is d
    if(state == 0) { //Bucket pickin' or Offer decidin'
      console.log("Pick bucket");
      document.getElementsByName("picksnake")[0].wrappedJSObject.submit();
    }
    if(state == 1) { //New game startin'
      console.log("New game");
      document.getElementsByName("newsnake")[0].wrappedJSObject.submit();
    }
    
  }
}

window.addEventListener('load', function () {
  var tt = document.evaluate(xpSnakemanTitle, document, null, XPathResult.ANY_TYPE, null).iterateNext();
  if(tt == null || tt.textContent != "SNAKEMAN... OR NO SNAKEMAN")
  {
    return; //We're on the wrong party house page.
  }
  var start = document.getElementsByName("start_snake");
  if(start.length > 0) {
    start[0].checked = true;
    state = 1;
  }
  var choices = document.getElementsByName("snakechoice");
  if(choices.length > 0) {
    var offer = document.evaluate(xpOffer, document, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
    offer = offer.replace(",", "");
    offer = offer.substring(0,offer.length-4);
    
    if(offer > 47000)
    {
      choices[0].checked = true;
    }
    else
    {
      choices[1].checked = true;
    }
    
  }
  else {
    selectNextBucket();
  }
  
  
  window.addEventListener("keyup", process_event, false);
}, true);