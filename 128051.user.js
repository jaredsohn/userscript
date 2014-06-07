// ==UserScript==
// @name           SNIPER
// @namespace      FCE SNIPER
// @description    hitting
// @exclude        http://facebook.com
// ==/UserScript==




window.onload = setTimeout(hitt, 1000);


function hitt(){

//heal();

var divs = document.body.getElementsByTagName("div");
var i;
var count =0;
var scint;
var scinte;
var sum = 0;
for (i=0; i < divs.length; i++) 
{

var classn = divs[i].className;

if (classn == 'supporters-box-name-txt3')
{
if (divs[i+1].innerHTML == "")
{

var sc = divs[i+2].innerHTML;

if (sc)
{

sc = sc.split(">");

scint = sc[1].split("<");
scinte = scint[0].split(' ').join('');
sum = sum+scinte;
if (scinte > 0)
{

simulateClick(divs[i]);

}


}





}
}
}

var rep = document.getElementById("total_rep1").innerHTML;


//reload();
setTimeout(hitt, 500);

//sum = sum.split("0").join("");

//if (sum == "")
//{

//setTimeout(window.location.reload, 2000);	

//}

}








function simulateClick(button) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var cb = button; 
  var canceled = !cb.dispatchEvent(evt);
  if(canceled) {
    // A handler called preventDefault
    alert("canceled");
	}

}





//
