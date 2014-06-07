// ==UserScript==
// @name           RS_Bundle [a rapidshare helper] with premium zone tweaks [dec08]
// @namespace      #Alex S
// @description    Descriptor's famous script.... revived! Now with premium zone autodownload!!
// @include        http://*.rapidshare.com/*
// @include        http://rapidshare.com/*
// @version        0.0.1
// ==/UserScript==

// coded from rs_bundle by avg, just added some premium features

//CONFIGURABLE OPTIONS =============================
var autoStart=true;
var PremiumZone=true;
//=======================================//ENDCONFIG

var single=function(x){return document.evaluate(x,document,null,9,null).singleNodeValue},
    downBtn=single("//input[@src='/img2/download_file.jpg']"),
    $=function(x){return document.getElementById(x)},
    uw=unsafeWindow,
    kill=function(el){try{el.parentNode.removeChild(el)}catch(e){}};
    if(PremiumZone)    freeBtn=single("//input[@value='Premium user']");
    else freeBtn=single("//input[@value='Free user']");
    

if(freeBtn)
	freeBtn.click();   // auto-choose free (premium) button
else if(downBtn && PremiumZone)
   downBtn.click();
else
{
	var base=uw.fc.toSource(),
            dlCode=eval(base.match(/tt = ("[^]+");/)[1]),  // get download mirrors
	    timeLeft=parseInt(single("//script").innerHTML.match(/c=(\d+)/)[1]),
            h1=single("//div[@id='inhaltbox']/h1");
	uw.fc=null;                // erase native timer
	$("dl").innerHTML=dlCode;    // show download form
	$("p1").style.display="";    // enabled premium mirror selection option
	var timer=setInterval(function(){                            //start counter
		document.title="["+(timeLeft--)+"] rapidshare";
		h1.innerHTML=timeLeft+" seconds left";
		if (timeLeft==0) {
			document.title="Ready! [Rapidshare]";
			clearInterval(timer);
			if (autoStart) {
				document.title="starting download! [rapidshare]";
				single("//form[@name='dlf']").submit();
			}
		}
	},1000);
}
