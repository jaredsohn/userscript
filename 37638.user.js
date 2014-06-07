// ==UserScript==
// @name           RS_Bundle [a rapidshare helper] Revived [feb09]
// @namespace      #avg
// @description    Descriptor's famous script.... revived!
// @include        http://*.rapidshare.tld/*
// @include        http://rapidshare.tld/*
// @version        0.2.3
// ==/UserScript==
function rsScript() {
// coded from scratch, implements various features
// found in http://userscripts.org/scripts/show/9116

//CONFIGURABLE OPTIONS =============================
var autoStart=true,
    name="RS";
//=======================================//ENDCONFIG

var single=function(x){return document.evaluate("//"+x,document,null,9,null).singleNodeValue},
    freeBtn=single("input[@value='Free user']"),
    $=function(x){return document.getElementById(x)},
    verif=single("p[2]/b"),
    wait=false;
if(verif && verif.innerHTML.indexOf("minutes")>-1)
 wait=parseInt(verif.innerHTML.match(/(\d+) minutes/)[1])*60000;
if(freeBtn)
	freeBtn.click();   // auto-choose free button
else {
  if(wait) {
     setTimeout(function(){
       var fake=document.createElement("form"), opt=document.createElement("input");
       opt.name="dl.start";
       opt.value="Free";
       fake.action=location.href;
       fake.method="post";
       fake.appendChild(opt);
       document.body.appendChild(fake);
       fake.submit();
     },wait);
     wait/=1000;
     setInterval(function(){
        document.title="["+name+"] "+(--wait)+" seconds left to wait";
     },1000);
  }
  else {
	var dlCode=eval((fc+"").match(/tt = ("[^]+");/)[1]),  // get download mirrors
	    timeLeft=parseInt(single("script").innerHTML.match(/c=(\d+)/)[1]),
            h1=single("h1");
	fc=null;                // erase native timer
	$("dl").innerHTML=dlCode;    // show download form
	$("p1").style.display="";    // enabled premium mirror selection option
	var timer=setInterval(function(){                            //start counter
		document.title="["+(--timeLeft)+"] "+name;
		h1.innerHTML=timeLeft+" seconds left";
		if (timeLeft==0) {
			document.title="Ready! ["+name+"]";
			clearInterval(timer);
			if (autoStart) {
				document.title="starting download! ["+name+"]";
				single("form[@name='dlf']").submit();
			}
		}
	},1000);
 }
}
}
document.body.appendChild(document.createElement("script")).innerHTML="("+rsScript+")()";
var important=document.getElementById("inhaltbox"), single=function(x){return document.evaluate("//"+x,document,null,9,null).singleNodeValue};
document.body.innerHTML="";
important.style.margin="10px auto";
document.body.appendChild(important);
var crud=new Array(single("h2"));
 crud.push(single("center"));
  for(var i=crud.length;i>=0;i--)
   if(crud[i])
     crud[i].parentNode.removeChild(crud[i]);