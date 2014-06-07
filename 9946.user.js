// ==UserScript==
// @name          Easy Scrap
// @author	  Sergio Abreu (Portuguese version) | Bean (English Version Translation)
// @description   Makes the Link Dead and Bypasses the Captcha Challenge!
// @include       http://www.orkut.com/Scrapbook.aspx*
// @include       http://www.orkut.com/CommMsgPost.aspx*
// ==/UserScript==


function doEasyScrap(){

 if(self != top) return;
 
 if(!document.getElementById('captchaTextbox')){
  var bt = document.createElement('span')
  bt.innerHTML = "Disable Links";
  bt.setAttribute("style", "cursor:pointer");

  if(location.href.indexOf('ook.aspx') > -1){

  bt.setAttribute("onclick", "var tx = document.getElementById('scrapText'); scr= tx.scrollTop; var x = tx.value; x = x.replace(/:\\/\\/\/gi, '&#58;\/\/');" + 
 	"x = x.replace(/www\\./gi, 'www&#46;'); tx.value = x; tx.scrollTop = scr;");

  document.getElementById('countBody').parentNode.parentNode.appendChild(document.createTextNode(" | "));
  document.getElementById('countBody').parentNode.parentNode.appendChild(bt);
  }
  else if(location.href.indexOf('ost.aspx') > -1){

  bt.setAttribute("onclick", "var x = document.getElementById('messageBody').value; x = x.replace(/:\\/\\/\/gi, '&#58;\/\/');" + 
 	"x = x.replace(/www\./gi, 'www&#46;'); document.getElementById('messageBody').value = x;");

  document.getElementById('charCount').parentNode.parentNode.appendChild(document.createTextNode(" | "));
  document.getElementById('charCount').parentNode.parentNode.appendChild(bt);
  }
 }
 else
 {
  
 }
}

doEasyScrap();