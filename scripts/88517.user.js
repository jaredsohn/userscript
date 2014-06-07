// ==UserScript==
// @name           Facemon Bot
// @namespace      Facemon
// @description    Facemon Auto Battle (Thanks to yiehyieh)
// @author	       Atreiu
// @include        http://apps.facebook.com/facemon/*
// ==/UserScript==

var startdt = document.title;
var tstate = 1;
var wl = window.location.toString();

function getStat(n) {
	var q = document.evaluate( '//div[@class="barre"]', document, null, XPathResult.ANY_TYPE, null );
	var i=0;
	for(i=0;i<=n;i++) { 
		var thisNode = q.iterateNext(); 
	}
	return thisNode.textContent.slice(0,thisNode.textContent.indexOf("/"));
}

function getVars(namevar) {
	if (wl.indexOf(namevar+"=")==-1) {
		return null;
	} else {
		var param = namevar+"=";
		var value = wl.slice(wl.indexOf(param)+param.length);
		if(value.indexOf("&")!=-1) {
			return value.slice(0,value.indexOf("&"));
		}else{
			return value;
		}
	}
}

function orbpopup() {
	var q = document.evaluate('//a[@href="#"]', document, null, XPathResult.ANY_TYPE, null);
	for(i=0;i<=10;i++) {
		var thisNode = q.iterateNext();
	}
	if(thisNode.textContent.indexOf("Facemon")!=-1) {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		thisNode.dispatchEvent(evt);
		return true;
	}else{
		return false;
	}
}

if (getVars("rmin")==null || getVars("comin")==null) {
	var q = document.evaluate( '//form[@id="app314039636110_phrase_form"]', document, null, XPathResult.ANY_TYPE, null );
	var thisNode = q.iterateNext();
	if (thisNode!=null) {
		var str=thisNode.textContent;
	}else{
		var str="0";
	}
	if (str.indexOf("prochain combat")==-1) {
		var rmin = (Math.floor(Math.random()*(45-10+1)))+10;
	}else{
		var rmin = 05;
	}
	var comin = (Math.floor(Math.random()*(55-46+1)))+46;
} else {
	var rmin = getVars("rmin");
	var comin = getVars("comin");
}

switch (getVars("status")) {
	case "care" :
		if (getStat(2)>9) {
			var feed = 0
		}else{
			var feed = 10-Math.floor(getStat(2));
		}
		var gigot = Math.floor(feed/5);
		feed = feed-gigot*5;
		var steak = Math.floor(feed/3);
		feed = feed-steak*3;
		var banane = Math.floor(feed/2);
		feed = feed-banane*2;
		var pomme = Math.floor(feed/1);
		feed = feed-pomme*1;
		document.location = "http://apps.facebook.com/facemon/index.php?status=buyfeed&pomme="+pomme+"&banane="+banane+"&steak="+steak+"&gigot="+gigot+"&rmin="+rmin+"&comin="+comin;
	break;
	case "buyfeed" :
		if (getVars("pomme")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=buyfeed&action=acheter&item=1&amount="+getVars("pomme")+"&pomme=0&banane="+getVars("banane")+"&steak="+getVars("steak")+"&gigot="+getVars("gigot")+"&rmin="+rmin+"&comin="+comin;
		}else if (getVars("banane")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=buyfeed&action=acheter&item=2&amount="+getVars("banane")+"&pomme="+getVars("pomme")+"&banane=0&steak="+getVars("steak")+"&gigot="+getVars("gigot")+"&rmin="+rmin+"&comin="+comin;
		}else if (getVars("steak")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=buyfeed&action=acheter&item=3&amount="+getVars("steak")+"&pomme="+getVars("pomme")+"&banane="+getVars("banane")+"&steak=0&gigot="+getVars("gigot")+"&rmin="+rmin+"&comin="+comin;
		}else if(getVars("gigot")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=buyfeed&action=acheter&item=8&amount="+getVars("gigot")+"&pomme="+getVars("pomme")+"&banane="+getVars("banane")+"&steak="+getVars("steak")+"&gigot=0"+"&rmin="+rmin+"&comin="+comin;
		}else{
			document.location = "http://apps.facebook.com/facemon/index.php?status=stfeed"+"&rmin="+rmin+"&comin="+comin;
		}
	break;
	case "stfeed" :
		if (getStat(2)>9) {
			var feed = 0
		}else{
			var feed = 10-Math.floor(getStat(2));
		}
		var gigot = Math.floor(feed/5);
		feed = feed-gigot*5;
		var steak = Math.floor(feed/3);
		feed = feed-steak*3;
		var banane = Math.floor(feed/2);
		feed = feed-banane*2;
		var pomme = Math.floor(feed/1);
		feed = feed-pomme*1;
		document.location = "http://apps.facebook.com/facemon/index.php?action=reveiller&status=feed&pomme="+pomme+"&banane="+banane+"&steak="+steak+"&gigot="+gigot+"&rmin="+rmin+"&comin="+comin;
	break;
	case "feed" :
		if (getVars("pomme")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=feed&action=nourrir&aliment=1&amount="+getVars("pomme")+"&pomme=0&banane="+getVars("banane")+"&steak="+getVars("steak")+"&gigot="+getVars("gigot")+"&rmin="+rmin+"&comin="+comin;
		}else if (getVars("banane")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=feed&action=nourrir&aliment=2&amount="+getVars("banane")+"&pomme="+getVars("pomme")+"&banane=0&steak="+getVars("steak")+"&gigot="+getVars("gigot")+"&rmin="+rmin+"&comin="+comin;
		}else if (getVars("steak")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=feed&action=nourrir&aliment=3&amount="+getVars("steak")+"&pomme="+getVars("pomme")+"&banane="+getVars("banane")+"&steak=0&gigot="+getVars("gigot")+"&rmin="+rmin+"&comin="+comin;
		}else if(getVars("gigot")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=feed&action=nourrir&aliment=8&amount="+getVars("gigot")+"&pomme="+getVars("pomme")+"&banane="+getVars("banane")+"&steak="+getVars("steak")+"&gigot=0"+"&rmin="+rmin+"&comin="+comin;
		}else{
			document.location = "http://apps.facebook.com/facemon/index.php?action=dormir&status=onclean"+"&rmin="+rmin+"&comin="+comin;
		}
	break;
	case "onclean" :
		if (getStat(4)>9) {
			var clean = 0
		}else{
			var clean = 10-Math.floor(getStat(4));
		}
		var tuyeau = Math.floor(clean/4);
		clean = clean-tuyeau*4;
		var balai = Math.floor(clean/2);
		clean = clean-balai*2;
		var eponge = Math.floor(clean/1);
		clean = clean-eponge*1;
		document.location = "http://apps.facebook.com/facemon/index.php?status=buyclean&eponge="+eponge+"&balai="+balai+"&tuyeau="+tuyeau+"&rmin="+rmin+"&comin="+comin;
	break;
	case "buyclean" :
		if (getVars("eponge")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=buyclean&action=acheter&item=4&amount="+getVars("eponge")+"&eponge=0&balai="+getVars("balai")+"&tuyeau="+getVars("tuyeau")+"&rmin="+rmin+"&comin="+comin;
		}else if (getVars("balai")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=buyclean&action=acheter&item=5&amount="+getVars("balai")+"&eponge="+getVars("eponge")+"&balai=0&tuyeau="+getVars("tuyeau")+"&rmin="+rmin+"&comin="+comin;
		}else if (getVars("tuyeau")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=buyclean&action=acheter&item=12&amount="+getVars("tuyeau")+"&eponge="+getVars("eponge")+"&balai="+getVars("balai")+"&tuyeau=0"+"&rmin="+rmin+"&comin="+comin;
		}else{
			document.location = "http://apps.facebook.com/facemon/index.php?status=stclean"+"&rmin="+rmin+"&comin="+comin;
		}
	break;
	case "stclean" :
		if (getStat(4)>9) {
			var clean = 0
		}else{
			var clean = 10-Math.floor(getStat(4));
		}
		var tuyeau = Math.floor(clean/4);
		clean = clean-tuyeau*4;
		var balai = Math.floor(clean/2);
		clean = clean-balai*2;
		var eponge = Math.floor(clean/1);
		clean = clean-eponge*1;
		document.location = "http://apps.facebook.com/facemon/index.php?status=clean&eponge="+eponge+"&balai="+balai+"&tuyeau="+tuyeau+"&rmin="+rmin+"&comin="+comin;
	break;
	case "clean" :
		if (getVars("eponge")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=clean&action=nettoyer&item=4&amount="+getVars("eponge")+"&eponge=0&balai="+getVars("balai")+"&tuyeau="+getVars("tuyeau")+"&rmin="+rmin+"&comin="+comin;
		}else if (getVars("balai")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=clean&action=nettoyer&item=5&amount="+getVars("balai")+"&eponge="+getVars("eponge")+"&balai=0&tuyeau="+getVars("tuyeau")+"&rmin="+rmin+"&comin="+comin;
		}else if (getVars("tuyeau")!=0) {
			document.location = "http://apps.facebook.com/facemon/index.php?status=clean&action=nettoyer&item=12&amount="+getVars("tuyeau")+"&eponge="+getVars("eponge")+"&balai="+getVars("balai")+"&tuyeau=0"+"&rmin="+rmin+"&comin="+comin;
		}else{
			document.location = "http://apps.facebook.com/facemon/index.php"+"?rmin="+rmin+"&comin="+comin;
		}
	break;
}

if (wl.indexOf("http://apps.facebook.com/facemon/index.php?action=chorbe")!=-1) {
	document.location = "http://apps.facebook.com/facemon/index.php?rmin="+rmin+"&comin="+comin;
}

window.setInterval(function() {
	var d2 = new Date();
	var h = d2.getHours();
	var min2 = d2.getMinutes();
	if(min2<=03) {
		switch(tstate) {
			case 1:
			document.title = startdt + " - Bot running...";
			tstate=2;
			break;
			case 2:
			document.title = startdt + " - Waiting for time reatribution...";
			tstate=1;
			break;
		}
	}else{
		switch(tstate) {
			case 1:
			document.title = startdt + " - Bot running...";
			tstate=2;
			break;
			case 2:
			if (min2>rmin) {
				document.title = startdt + " - Battle already launched";
			}else{
				document.title = startdt + " - Launching battle at "+h+"h"+rmin;
			}
			tstate=3;
			break;
			case 3:
			if (min2>comin) {
				document.title = startdt + " - Orb already changed";
			} else {
				document.title = startdt + " - Changing orb at "+h+"h"+comin;
			}
			tstate=1;
			break;
		}
	}
},3000);


window.setInterval(function() {
	var d = new Date();
	var min = d.getMinutes();
	if(min==03)
	{
		document.location = "http://apps.facebook.com/facemon/index.php?status=care";
	}
	if(min==rmin)
	{
		var q = document.evaluate( '//center[text()=contains(.,"résultat")]', document, null, XPathResult.ANY_TYPE, null );
		var thisNode = q.iterateNext();
		var str=thisNode.textContent;
		var str1=str.replace("Quel est le résultat de ","");
		var str2=str1.replace("?","");
		document.getElementsByName("reponse")[0].value=eval(str2); 
		document.getElementsByName("captcha")[0].parentNode.submit();
	}
	if(min==comin-2) {
		document.location = "http://apps.facebook.com/facemon/index.php?rmin="+rmin+"&comin="+comin;
	}
	if(min==comin-1) {
		orbpopup();
	}
	if(min==comin) {
		var q = document.evaluate( '//div[@id="app314039636110_app_content_1285334695559"]', document, null, XPathResult.ANY_TYPE, null );
		var thisNode = q.iterateNext();
		if(thisNode!=null) {
			var str=thisNode.textContent;
			if(str.indexOf("Enflammée")!=-1 || str.indexOf("Brulante")!=-1 || str.indexOf("de l'Enfer")!=-1) {
				var oid=1;
			}else if(str.indexOf("Vert")!=-1 || str.indexOf("Vampirique")!=-1 || str.indexOf("Létale")!=-1) {
				var oid=2;
			}else if(str.indexOf("électrique")!=-1 || str.indexOf("Electrique")!=-1 || str.indexOf("Etincellant")!=-1) {
				var oid=3;
			}else if(str.indexOf("de Terre")!=-1 || str.indexOf("de Granit")!=-1) {
				var oid=4;
			}else if(str.indexOf("Aquatique")!=-1 || str.indexOf("d'Eau")!=-1 || str.indexOf("des Mers")!=-1) {
				var oid=5;
			}else{
				var oid = (Math.floor(Math.random()*(5-1+1)))+1;
			}
		}else{
			var oid = (Math.floor(Math.random()*(5-1+1)))+1;
		}
		document.location = "http://apps.facebook.com/facemon/index.php?action=chorbe&oid="+oid+"&rmin="+rmin+"&comin="+comin;
	}
}, 60000);