// ==UserScript==
// @name       Bitcurex Wpierdol
// @namespace  http://redtube.org/
// @version    8.8
// @description  zesralem sie
// @match      https://pln.bitcurex.com/*
// @copyright  2012+, You
// ==/UserScript==
var sex = document.getElementsByTagName("span")[0];
document.body.removeChild(sex);

var wrapper = document.getElementById("content");
var contentdiv = document.createElement("div");


contentdiv.innerHTML =
    "<h2>Kalkulator</h2> \
Before:<input type=\"Text\" id=\"before\" ></input> \
After:<input type=\"Text\" id=\"after\" > </input> \
Amount:<input type=\"Text\" id=\"amount\" > </input> </br>\
 <div id=\"result\">0</div>"
 wrapper.appendChild(contentdiv);
 


    
 var before = document.getElementById("before");
 var after = document.getElementById("after");
 var amount = document.getElementById("amount");
 var result = document.getElementById("result");
  before.onkeyup = textChange;
  after.onkeyup = textChange;
  amount.onkeyup = textChange;
 
 
 
function textChange() {
      // console.log("gowno");
    if( ! isNumber(before.value) || ! isNumber(after.value) || ! isNumber(amount.value) ) {
        result.innerHTML = "0";
        return;
         }

    var beforenum = parseFloat(before.value);
    var afternum = parseFloat(after.value);
    var amountnum = parseFloat(amount.value);
    
     //console.log(beforenum+ " " + afternum+ " " + amountnum);
    var resultnum = ((afternum*0.996) - (beforenum*1.004)) * amountnum;
    console.log(resultnum);
     console.log(result.toString());
    result.innerHTML = resultnum.toString();
    
}


function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}