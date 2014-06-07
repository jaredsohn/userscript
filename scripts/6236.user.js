// ==UserScript== 
// @name Flyne's Autofill 
// @namespace http://flyne.monkey.googlepages.com/ 
// @description Save multiple passwords for one login form.
// @include * 
// @version 0.3~
// ==/UserScript==

(function() { 



var version = 0.3

var date = new Date()
if(date.getDay() == 1 && GM_getValue('checked', 0) == 0) {
  GM_xmlhttpRequest({
    method:"GET",
    url: "http://userscripts.org/scripts/source/6236",
    headers:{
      "User-Agent":"monkeyagent",
      "Accept":"text/monkey,text/xml",
      },
    onload:function(details) {
      scriptsource = details.responseText;
      checkforupdates();
    }
  });
}
if(date.getDay() != 5)
  GM_setValue('checked', 0)

function checkforupdates() {
  var curversion = scriptsource.split("@version ")[1].split('~')[0]
  if(curversion != version && GM_getValue('checked', 0) == 0) {
    alert("A new version of Flyne's Autofill is available.")
    if(confirm("Download now?")) {
      GM_openInTab('http://userscripts.org/scripts/show/6236')
    }
  }
  GM_setValue('checked', 1)
}





var formnum;
var inputnum;
var textinnum = -5;
var itworked = 0;
var allforms = document.getElementsByTagName('form');

function addtocookie() {
  if(confirm("Are you sure you wish to save this username/password combination for Flyne's Autofill?")){
    GM_setValue(formel.getElementsByTagName('input')[textinnum].value.toLowerCase(),formel.getElementsByTagName('input')[inputnum].value)
  }
}

function killcookie() {
  if(confirm("Are you sure you wish to delete this username and the password associated with it from Flyne's Autofill?")){
    GM_setValue(formel.getElementsByTagName('input')[textinnum].value.toLowerCase(),"@%#$")
  }
}




for(x1=0; x1<allforms.length; x1++) {
  var tmpinputs = allforms[x1].getElementsByTagName('input');
  for(x2=0; x2<tmpinputs.length; x2++) {
    if(tmpinputs[x2].type=='text') {
      textinnum = x2;
    }
    if(tmpinputs[x2].type=='password' && textinnum != -5) {
      formnum = x1;
      inputnum = x2;
      itworked = 1;
      x1 = allforms.length;
      x2 = tmpinputs.length;
    }
  }
}
if(itworked == 1) {
  var formel = document.getElementsByTagName('form')[formnum];
  var plusbutton = formel.appendChild(document.createElement('input'));
  plusbutton.type="button"
  plusbutton.value="+"
  plusbutton.addEventListener("click", addtocookie, true)
  var minusbutton = formel.appendChild(document.createElement('input'));
  minusbutton.type="button"
  minusbutton.value="-"
  minusbutton.addEventListener("click", killcookie, true)
}




   // Function to check and modify values
function modifyText() {  
  formel.getElementsByTagName('input')[textinnum].value = formel.getElementsByTagName('input')[textinnum].value.toLowerCase();
  if(GM_getValue(formel.getElementsByTagName('input')[textinnum].value.toLowerCase(), "@%#$") != "@%#$") {
    var t2 = formel.getElementsByTagName('input')[inputnum];
    t2.value = GM_getValue(formel.getElementsByTagName('input')[textinnum].value.toLowerCase())  
  }    
}
 
// Function to add event listener

  var el = formel.getElementsByTagName('input')[textinnum]; 
  el.addEventListener("blur", modifyText, false); 
  el.addEventListener("change", modifyText, false); 

})();