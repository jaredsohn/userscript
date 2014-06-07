// ==UserScript==
// @name           MU_Bundle - A Megaupload Helper [Revived]
// @description    Instantly auto-start and download the files, and captcha is easier to fill out!
// @namespace      #avg
// @version        0.2.9
// @include        http://*megaupload.com/?d=*
// ==/UserScript==
// Like RS_Bundle, coded from scratch, but based off Descriptor's awesome scripts.
// This is the original MU_Bundle: http://userscripts.org/scripts/show/10420

document = unsafeWindow.document;
const cooks = ["__utma", "__utmb", "__utmc", "__utmz", "mc_popt"];
for(var i = cooks.length - 1; i>=0; --i)
	document.cookie = cooks[i] + "=" + ";domain=megaupload.com;expires=Thu, 01-Jan-1970 00:00:01 GMT";


var pass=false, hitEnter=false;

function handle(e) {
	if(good || (!lastGood || !/^[A-z\d]{4}$/.test(this.value)) && !pass)
		return;
	if(pass && !hitEnter)
		return;
	if(!pass)
		this.value=this.value.toUpperCase();
	this.style.backgroundColor="black";
	this.style.color="white";
	this.style.fontWeight="bold";
	GM_xmlhttpRequest({
		url : location.href,
		method : "POST",
		headers : {
			Cookie : "user=MBDJYIOTVYUNMNXB-GNWP6ERXVCYE77J",
			"Content-Type" : "application/x-www-form-urlencoded",
			"User-Agent" : "Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1; InfoPath.2; MEGAUPLOAD 2.0)" // possible foreign hack
		},
		onload : function(A) {
			try {
				location.href=A.responseText.match(/oadlink"><a href="([^"]+)/)[1];
				good=true;
				info.innerHTML="Success! Downloading file...";
			} catch(e) {
				captcha.style.backgroundColor="white";
				captcha.style.color="black";
				captcha.style.fontWeight="";
				info.innerHTML="Either you entered the captcha/password wrong, or there was an error with the server. Please re-type the code to try again!";
			}
		},
		data : basics + captcha.value
	});
}

GM_addStyle("body {background:url(http://wwwstatic.megaupload.com/gui2/download.jpg)!important;background-repeat:repeat-x !important;}");

var $=function(A) {return document.getElementById(A)},
    single=function(A,B) {return document.evaluate(A,B||document,null,9,null).singleNodeValue},
    lastGood=false,
    good=false,
    info,
    basics;
var captcha=$("captchafield");

var main=$("main");
var o1=single("./div[2]/div/div[2]",main),
o2=single("./div[2]/div/div[3]",main);

o2.style.left="20px";
o2.style.top="115px";
document.body.innerHTML="";
document.body.appendChild(o1);
document.body.appendChild(o2);

var dl=single("./a", o2);
info=document.createElement("div");
info.style.fontWeight="bold";
info.style.fontSize="18px";


if (captcha) {
	single("//td[@width='100']/img").height=100;
 	basics = "captchacode="+single("//input[@name='captchacode']").value +
           "&megavar="+single("//input[@name='megavar']").value +"&captcha=";
	info.innerHTML="In order to download this file, simply fill out the captcha correctly as shown.";
	o2.replaceChild(info,dl);
} else {
	pass=true;
	basics="filepassword=";
	captcha = $("filepassword");
	captcha.type="text";
	info.innerHTML="To download this file, type the password... then press ENTER!";
	o2.appendChild(info);
}
function isValidKey(A) {
	if(A >= 96 && A <= 105) // numeric 1-9
		return 1;
	return (A >= 65 && A <= 90) || // A-z
	       (A >= 48 && A <= 57);   // 1-9
}

function isValidInput(A) {
	return (A >= 37 && A <= 40) ||  // arrow keys
	A == 8 || // backspace
	A == 46; // delete
}

  captcha.addEventListener("keydown", function(A){
  	hitEnter=A.keyCode==13;
  	if(A.ctrlKey) {
  		lastGood=false;
  		return;
  	}
  	var stuff=0;
  	if(!pass && (stuff=isValidKey(A.keyCode))) {
  		if(this.selectionStart==3 && this.value.length>=4) {
  			A.preventDefault();
  			this.value=this.value.substring(0,3)+ (stuff===1 ? A.keyCode - 96 : String.fromCharCode(A.keyCode));
  		}
  		lastGood=true;
  		return;
  	} else {
  		lastGood=pass ? true : false;
  	}
  	if(pass || isValidInput(A.keyCode) || isValidKey(A.keyCode)) {
  	} else {
		A.preventDefault();
	}
  },false);
  captcha.addEventListener("keyup", handle, false);

  document.title="MU | "+single("//font[2]").textContent;

  captcha.value = "";
  captcha.focus();