// ==UserScript==
// @name        Swagbucks.com Swag Code Checker
// @description	Will check sc-s.com for new swagbucks.com swag codes, paste them into the form for you, then alert you.  It checks on page load and every 30 minutes while swagbucks.com is open. Shameless self promotion: Use my referal link if you're signing up! http://www.swagbucks.com/refer/johngoner778 or http://www.irazoo.com/ReferedNewUser.aspx?RefBy=johngoner778
// @namespace   
// @include     *swagbucks.com/
// @grant		GM_xmlhttpRequest
// ==/UserScript==


//  Shameless self promotion: Use my referal link if you're signing up! 
// http://www.swagbucks.com/refer/johngoner778 or http://www.irazoo.com/ReferedNewUser.aspx?RefBy=johngoner778

window.addEventListener ("load", localMain(), false);

function localMain(){
 	if (document.location.href.search("swagbucks.com")  != -1){
		checkCode();
		window.setInterval(checkCode,20*60*1000);
	}  else {
	}
}

function simulateClick(obj) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  var canceled = !obj.dispatchEvent(evt);      
}

function checkCode(){
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://sc-s.com",
	  headers: {
		"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
	 //   "Accept": "text/xml"            // If not specified, browser defaults will be used.
	  },
	  onload: function(response) {
		 
		 process(response);

	  }
	});
}

function process(response){

var patt=new RegExp('<td class="value p_code">.+</td>');
var code = patt.exec(response.responseText);

var code2 = new String(code);
code2 = code2.replace('<td class="value p_code">','');
code2 = code2.replace('</td>','');

	if(code2 == null){
	alert('error no code');
	}

	if(getCookie("code") !=code2){
	setCookie("code",code2,365);
	alert("new swag promo code: " + code2);
	document.querySelector('*[id="pcode"]').value = code2;
	}else{
	document.querySelector('*[id="pcode"]').value = code2;
	}

}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
  {
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}