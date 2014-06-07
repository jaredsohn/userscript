// ==UserScript==
// @name           gondola
// @namespace      forum.gondola.hu
// @description    gondola redesign 2.0
// @include        http://forum.gondola.hu/*
// @version        1.2
// ==/UserScript==
var defBG = GM_getValue('defBG', "#bebebe");
var defC1 = GM_getValue('defC1', "#939b9b");
var defC2 = GM_getValue('defC2', "#c1cdcd");
var defC3 = GM_getValue('defC3', "#00688B");
function showPostPreview(source, destID) {
	var sourceValue = source.replace(/[\n]/g,"!!-!!");
	var dest = document.getElementById(destID);
	search = [
		/\[b\](.*?)\[\/b\]/ig,
		/\[i\](.*?)\[\/i\]/ig,
		/\[s\](.*?)\[\/s\]/ig,
		/\[sub\](.*?)\[\/sub\]/ig,
		/\[sup\](.*?)\[\/sup\]/ig,
		/\[quote\](.*?)\[\/quote\]/ig,
	    /\[code\](.*?)\[\/code\]/ig,
		/\[img\](.*?)\[\/img\]/ig,
		/\:\)/ig,
		/\:\(/ig,
		/\:o/ig,
		/\:D/ig,
		/\;\)/ig,
		/\:eek\:/ig,
		/\:p/ig,
		/\:cool\:/ig,
		/\:rolleyes\:/ig,
		/\:mad\:/ig,
		/\:confused\:/ig,
		/\[url=([\w]+?:\/\/[^ \\"\n\r\t<]*?)\](.*?)\[\/url\]/ig
		];

	replace = [
			"<b>$1</b>",
			"<em>$1</em>",
			"<del>$1</del>",
			"<sub>$1</sub>",
			"<sup>$1</sup>",
			"<blockquote><font size='1' face='Verdana, Helvetica, sans-serif'>Idézet:<hr>$1<hr></font></blockquote>",
			"<blockquote><font size='1' face='Verdana, Helvetica, sans-serif'>code:<pre><hr>$1<hr></font></pre></blockquote>",
            "<img src=\"$1\"></img>",
            "<img src=http://forum.gondola.hu//smile.gif></img>",
            "<img src=http://forum.gondola.hu//frown.gif></img>",
            "<img src=http://forum.gondola.hu//redface.gif></img>",
            "<img src=http://forum.gondola.hu//biggrin.gif></img>",
            "<img src=http://forum.gondola.hu//wink.gif></img>",
			"<img src=http://forum.gondola.hu//eek.gif></img>",
			"<img src=http://forum.gondola.hu//tongue.gif></img>",
			"<img src=http://forum.gondola.hu//cool.gif></img>",
			"<img src=http://forum.gondola.hu//rolleyes.gif></img>",
			"<img src=http://forum.gondola.hu//mad.gif></img>",
			"<img src=http://forum.gondola.hu//confused.gif></img>",
            "<a href=\"$1\">$2</a>"
			];
	for(i = search.length-1; i >= 0; i--)
	{
	     sourceValue = sourceValue.replace(search[i], replace[i]);
	}
	var _str='<head><meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-2"><head>'+
                 '<hr><center style={font-size:20px;color:white;background-color:red;}>'+
                 '--- E L Ő N É Z E T --- (kattints a bezáráshoz)</center><hr><font face="verdana" size=2>';

	dest.innerHTML = _str+sourceValue.replace(/!!-!!/g, "<br /></font>");
}


function $id(id_node) {
  return(document.getElementById(id_node));
}

function xp(_exp, t, n) {
 var exp = _exp || "//*";                  // XPath Expression
 var type = t || 6;                        // XPath type (e.g., 6=unordered node snapshot)
 var node = n || document;                 // XPath search node (only for advanced users; research it)
 return type==9 ? document.evaluate(exp, node, null, 9, null).singleNodeValue:
 document.evaluate(exp, node, null, type, null);
}

function reMake() {
 var allTD, thisTD;

 allTD = xp('//*[@bgColor="#dceffd" or @bgColor="#ffffff" or @bgColor="#355b8c"]');
 for (var i=allTD.snapshotLength-1;i>=0; i--) {
     thisTD = allTD.snapshotItem(i);
     switch (thisTD.bgColor) {
	case "#dceffd": {
 			  thisTD.bgColor=erteke("defC1");
			  break;
			}
	case "#ffffff": {
			  thisTD.bgColor=erteke("defC2");
			  break;
			}
	case "#355b8c": {
			  thisTD.bgColor=erteke("defC3");
			  break;
			}
	}
 }
 //removeId(xp('//td[@valign="top" and @align="left"]').snapshotItem(0));
 if (window.location.href!="http://forum.gondola.hu/cgi-bin/ultimatebb.cgi") {
    thisTD = xp('//br');
    removeId(thisTD.snapshotItem(0));
    removeId(thisTD.snapshotItem(1));
    removeId(thisTD.snapshotItem(3));
    removeId(thisTD.snapshotItem(4));
 } else {
    removeId(xp("//html/body/center[2]/p/table").snapshotItem(0));
    xp("//html/body/center[2]/table/tbody/tr/td/b/font").snapshotItem(0).style.color=defC3;
 }
}

function removeId(id_node){
 var n, t = typeof id_node;
 if(t=='object'||t=='string') {
    n = t == 'object' ? id_node : $id(id_node);
    n.parentNode.removeChild(n);
    return true;
 }
 else {return false;}
}

function elozo(aLink) {
  if (!document._clickTarget) { return; }
  myurl= document._clickTarget.toString();
  GM_xmlhttpRequest({
    method: 'GET',
    url: myurl, // aLink.href,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function x(resp) {
              overlay.innerHTML = resp.responseText;
	      overlay.style.top=window.scrollY+20;
	      overlay.style.left=(window.innerWidth-(window.innerWidth*0.9))/2;
	      Effect.Appear('overlay');
    }
 });
}

function mouseout(event) {
    document._clickTarget = null;
    if (document._autoclickTimeoutID) {
	window.clearTimeout(document._autoclickTimeoutID);
    }
}

function mouseover(event) {
    document._clickTarget = event.currentTarget;
    document._autoclickTimeoutID = window.setTimeout(elozo, 750);
}


function eloz_valasz() {
 var aLinkek, aLink;
 aLinkek = xp('//a[contains(@href,"z_get") or contains(@href,"get_profile")]');
 for (var i = 0; i < aLinkek.snapshotLength; i++) {
     aLink = aLinkek.snapshotItem(i);
     aLink.addEventListener('mouseover',mouseover, false);
     aLink.addEventListener('mouseout',mouseout, false);
 }
}

function sokOldal() {
 var allTD, thisTD;
 allTD = xp("//a[contains(@href,'&p=')]");
 for (var i = 0; i < allTD.snapshotLength; i++) {
     thisTD = allTD.snapshotItem(i);
     if ((parseInt(thisTD.textContent)%38)==0) {			// ha sok temaoldal van
	  newBR = document.createElement('br');
	  thisTD.insertBefore(newBR, thisTD.nextSibiling);
	}
 }
}

function imgResize() {
 var ratio, imagewidth, imageheight, state, newwin;
 ratio = 0.5;
 imagewidth = window.innerWidth-100;
 imageheight = window.innerHeight-100;
 var getImages = xp("//img[not(contains(@src,'gondola'))]");
 for(i=getImages.snapshotLength-1;i>=0; i--){
     gI = getImages.snapshotItem(i);
     if (gI.offsetWidth > imagewidth && gI.offsetHeight > imageheight) {
 	var newwidth = parseInt(gI.offsetWidth * ratio);
	var newheight = parseInt(gI.offsetHeight * ratio);
	gI.setAttribute('width',newwidth);
	gI.setAttribute('height',newheight);
	toggle(gI);toggle(gI);
     }
 }
}

function toggle(id_node) {
 var n, t = typeof id_node;
 if(t=='object'||t=='string') {
    n = t == 'object' ? id_node : $id(id_node);
    n.style.display == "none" ? n.style.display = "" : n.style.display = "none";
    return true;
 }
 else {return false;}
}

function erteke(checked_name) {
 if($id(checked_name)) { return $id(checked_name).value; }
 else { return false; }
}

function szin_doboz() {
 Effect.DropOut('config');
 return true;
}

function save_options() {
 GM_setValue("defBG", erteke("defBG"));
 GM_setValue("defC1", erteke("defC1"));
 GM_setValue("defC2", erteke("defC2"));
 GM_setValue("defC3", erteke("defC3"));
 szin_doboz();
 document.location.reload();
 return true;
}

function addStyle() {
GM_addStyle("body { background-color: "+defBG+" !important;}"+
			"blockquote { padding: 2px !important; width:90%; align:justify; color:darkred; }"+
			"a:link { color:#292970 !important;}"+
            "a:visited { color:#292970;font-weight:bold}"+
            "a:hover { color:red; text-decoration:none;}"+
            "a:active { color:red; text-decoration:none;}"+
            "input { background-color: white !important; }"+
            "input { color: black !important; }"+
            "input { padding: 2px; border: 1px solid; -moz-border-radius: 7px !important; }"+
            "textarea { background-color: #c1cdcd !important; }"+
            "textarea { color: black !important; }"+
            "textarea { padding: 2px; border: 1px solid; -moz-border-radius: 7px !important; width:700; }"+
            "option { background-color: #939B9B !important; }"+
            "option { color: black !important; }"+
            "option { -moz-border-radius: 6px !important; }"+
            "select { background-color: #939B9B !important; }"+
            "select { color: black !important; }"+
            "select { padding: 3px; border: 1px solid; -moz-border-radius: 7px !important; }");
GM_addStyle(""+"input[type=submit], button {"
              +"color: #000 !important;"
              +"background: #DCDCDC url(\"data:image/png;base64,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\") repeat-x !important;"
              +"border: 1px solid #A4A4A4 !important;"
              +"padding: 2px 8px 2px 8px !important;"
              +"font-size: 13px !important;"
              +"margin: 1px !important;"
              +"-moz-border-radius-topright: 3px !important;"
              +"-moz-border-radius-topleft: 3px !important;"
              +"-moz-border-radius-bottomright: 3px !important;"
              +"-moz-border-radius-bottomleft: 3px !important;"
              +"}"
              +"input[type=submit]:hover, button:hover {"
              +"background: #A8DBF8 url(\"data:image/png;base64,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\") repeat-x !important;"
              +"border: 1px solid #3781B0 !important;"
              +"}"
);
}


var a = document.createElement("button");
 a.type = "button";
 a.addEventListener("click", function(){Effect.Appear('config');}, false);
 a.appendChild(document.createTextNode("színek"));

if (window.location.href=='http://forum.gondola.hu/cgi-bin/ultimatebb.cgi') {
 document.getElementsByTagName("font")[2].appendChild(document.createTextNode(' | '));
 document.getElementsByTagName("font")[2].appendChild(a);
}
// szindoboz
var box = document.createElement("div");
box.setAttribute("style", "text-align:left; opacity:0.90; background-color:#eee; position:fixed; top:10px; right:10px; padding:10px; font-size:10px; color:#000; z-index:99; border: 2px ridge #000; display:none;");
box.setAttribute("id", "config");

box.innerHTML = "<table>"+
                "<tr bgColor="+defBG+"><td>Oldal háttere:</td><td><input type=\"text\" id=\"defBG\" value=" +defBG+"></input></td></tr>"+
				"<tr bgColor="+defC1+"><td>1. szín:</td><td><input type=\"text\" id=\"defC1\" value=" +defC1+"></input></td></tr>"+
				"<tr bgColor="+defC2+"><td>2. szín:</td><td><input type=\"text\" id=\"defC2\" value=" +defC2+"></input></td></tr>"+
				"<tr bgColor="+defC3+"><td>3. szín:</td><td><input type=\"text\" id=\"defC3\" value=" +defC3+"></input></td></tr>"+
				"</table><br>";
var save = document.createElement("input");
save.type="submit";
save.value="Ment";
save.addEventListener("click", save_options, false);
save.setAttribute("style", "float:left;");
box.appendChild(save);

var close = document.createElement("input");
close.type="submit";
close.value="Mégsem";
close.setAttribute("style", "float:right;");
close.addEventListener("click", szin_doboz, false);
box.appendChild(close);
document.body.appendChild(box);



document.title=document.title+' .:: tweaked by r00t ::.';
toggle(xp("//img[@src='http://forum.gondola.hu//bbtitle.gif']").snapshotItem(0));
var scripts = [
    'http://script.aculo.us/prototype.js',
    'http://script.aculo.us/effects.js',
    'http://script.aculo.us/controls.js'
];
for (var i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}
window.addEventListener('load', function(event) {
    Effect = unsafeWindow['Effect'];

}, 'false');

var overlay = document.createElement("div");
overlay.setAttribute('id','overlay');

with (overlay.style) {
 id="overlay";
 position = "absolute";
 top = "10";
 left = "10";
 width  = "90%";
 background = defC2;
 opacity = "0.95";
 padding = "5px";
 border = "5px ridge "+defC3;
 display = "none";
}

overlay.addEventListener("click", function () {
 Effect.Puff('overlay');
 overlay.innerHtml="";
}, false);
document.body.appendChild(overlay);

unsafeWindow.tagIt = function (tagOpen,tagClose) {

  var ta = unsafeWindow.textArea[0];
  var st = ta.scrollTop;
  if (ta.selectionStart | ta.selectionStart == 0) {
    if (ta.selectionEnd > ta.value.length) { ta.selectionEnd = ta.value.length; }
    var firstPos = ta.selectionStart;
    var secondPos = ta.selectionEnd+tagOpen.length;
    ta.value=ta.value.slice(0,firstPos)+tagOpen+ta.value.slice(firstPos);
    ta.value=ta.value.slice(0,secondPos)+tagClose+ta.value.slice(secondPos);
    ta.selectionStart = firstPos+tagOpen.length;
    ta.selectionEnd = secondPos;
    ta.scrollTop=st;
  }
}

unsafeWindow.linkIt = function () {
  var myLink = prompt("Kérem a linket:","http://");
  var name = prompt("Kérem a link nevét:");
  if (myLink != null) {
    unsafeWindow.tagIt('[url=' +myLink+ ']' +name+ '[/url]','');
  }
}

unsafeWindow.eMailIt = function () {
  var myEMail = prompt("Kérem az e-mail címet:","");
  var addr = prompt("Kérem a link nevét:");
  if (myEMail != null) {
    unsafeWindow.tagIt('[email=' +myEMail+ ']' +addr+ '[/email]','');
  }
}

unsafeWindow.linkImg = function () {
  var myImg = prompt("Kérem a kép linkjét:","http://");
  if (myImg != null) {
    unsafeWindow.tagIt('[img]' +myImg+ '[/img]','');
  }
}

unsafeWindow.bigGreen = function (alink) {
  unsafeWindow.tagIt('[img]'+alink+ '[/img]','');
}

unsafeWindow.quoteIt = function () {
    var myQuote = prompt("Quote:","");
    unsafeWindow.tagIt('[quote' +myQuote+ ']','' +name+ '[/quote]' );
}

function hozzaszolas() {
	var taa=xp("//textarea",9);
	if (taa) {
	 var nevek=["Félkövér","Dőlt","Idézet","Kód","Link ...","Link","Kép","Em@il"];
	 var js=["javascript:tagIt('[b]','[/b]')",
			 "javascript:tagIt('[i]','[/i]')",
			 "javascript:tagIt('[quote]','[/quote]')",
			 "javascript:tagIt('[code]','[/code]')",
			 "javascript:linkIt()",
			 "javascript:tagIt('[url]','[/url]')",
			 "javascript:linkImg()",
			 "javascript:eMailIt()"]
	 var smilik = ["http://forum.gondola.hu//smile.gif",
				   "http://forum.gondola.hu//frown.gif",
			  	   "http://forum.gondola.hu//redface.gif",
				   "http://forum.gondola.hu//biggrin.gif",
				   "http://forum.gondola.hu//wink.gif",
				   "http://forum.gondola.hu//eek.gif",
				   "http://forum.gondola.hu//tongue.gif",
				   "http://forum.gondola.hu//cool.gif",
				   "http://forum.gondola.hu//rolleyes.gif",
				   "http://forum.gondola.hu//mad.gif",
				   "http://forum.gondola.hu//confused.gif"]
	 var js2=["javascript:tagIt(':)','')",
			  "javascript:tagIt(':(','')",
			  "javascript:tagIt(':o','')",
			  "javascript:tagIt(':D','')",
			  "javascript:tagIt(';)','')",
			  "javascript:tagIt(':eek:','')",
			  "javascript:tagIt(':p','')",
			  "javascript:tagIt(':cool:','')",
			  "javascript:tagIt(':rolleyes:','')",
			  "javascript:tagIt(':mad:','')",
			  "javascript:tagIt(':confused:','')"]
			
	 var preview = document.createElement("button");
	 preview.type="button";
	 preview.value="Megnéz";
	 preview.appendChild(document.createTextNode("Előnézet"));
	 preview.addEventListener("click", function(){
			  overlay.style.top=window.scrollY+20;
			  overlay.style.left=(window.innerWidth-(window.innerWidth*0.9))/2;
			  Effect.Appear('overlay');
			  showPostPreview(taa.value,'overlay');

	 }, false);
	 xp("//input[@value='Mehet' or @value='Új téma']",9).parentNode.appendChild(preview);
	 unsafeWindow.textArea = new Array();unsafeWindow.textArea = new Array();
	 unsafeWindow.textArea[0] = taa;
	 var accessBar = document.createElement("div");
	 accessBar.setAttribute('style','');
	 for (i=0; i<nevek.length; i++) {
		var bB = document.createElement("button");
		bB.type="button";
		bB.appendChild(document.createTextNode(nevek[i]));
		bB.setAttribute('onclick',js[i]);
		accessBar.appendChild(bB);
	 } 
//	 taa.parentNode.insertBefore(accessBar, taa);
//	 var accessBar = document.createElement("div");
//	 accessBar.setAttribute('style','');
	 for (i=0; i<smilik.length; i++) {
		var bB = document.createElement("img");
		bB.src=smilik[i];
		bB.setAttribute('onclick',js2[i]);
		accessBar.appendChild(bB);
		accessBar.appendChild(document.createTextNode(" "));
	 } 
	 taa.parentNode.insertBefore(accessBar, taa);
	}
	var taw=xp("//td[@nowrap]",9);
	if (taw) {
		taw.removeAttribute("nowrap");
	}
		
}

function elonezetek() {
  var tubeSpan;
  var rex = new RegExp("http://(www.youtube.com/watch?)", "i");
  
  var links = xp("//a[@target='_blank' and not(contains(@href,'get_profile')) and not(contains(@href,'ubb_code_page'))]");
  for (var i = 0; i < links.snapshotLength; i++) {
    var link = links.snapshotItem(i);
    if (rex.test(link.href)) {
		tubeSpan = document.createElement("span");
		link.id = "youtubelink" + String[i];
		tubeSpan.innerHTML = '<br /><br /><object width="425" height="344"><param name="movie" value="http://www.youtube.com/v/' + link.href.split('?v=')[1] + '&hl=en&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/' + link.href.split('?v=')[1] + '&hl=en&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object><br />'
		link.appendChild(tubeSpan);
    } else {
    if(link.hasAttribute("onmousedown")) link.removeAttribute("onmousedown");
	var pLink = link.parentNode.insertBefore(document.createElement("a"),link.nextSibling)
    pLink.href = link.href;
    pLink.title = "Megtekint";
    pLink.style.marginLeft = "1em";
    pLink.addEventListener("click", function(e) {
      e.preventDefault();
      var pOpen = "data:image/png;base64,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";
      var pClosed = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gMAhEXEFiQTN0AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEUElEQVRIx+2VfWiVZRjGf895zznb+XZnO3MfLjdN5ipJU9f8mEQ2DEvRkkGZRSFbQS0SnQphEKmzUCEInFBSaAvmX4F9QGUFliHOjnOz2ubZjudLznt2djZ3tvecve/TPyZSuk3or+j687m5ubie+76uG/7HXUBMVrzSf1UamXFMQmCxKJitVopLSsXdkpj+/tAXispvz3TI2COPyYryMnJbDnE1YyecsTNqySecGJXhcFTe2iPhsAQp4eSUSk6f88vkiIbFlsfFb76jae8b2LQxXnlqG38UlZGrSOZXlLB+9UoenFfSWGATRyXUAGeAIeA+AdfuSPL9L+elOpKlL5Lkp3OXKCgtZ2Oklyfe301ybhWnPjuLYTKRjEe5cPYH1q1ewfIFsyme4bgMVAFbBBy/nRIFQE0mGjq6eteFB9NcHojhnTWXJStWkVm4nMLus/j851B0jcElNbhcuYxeH+H37k42HnjrCyVwZTlwSsCuSQd/8WKnDAxO8PnPnbhnz0PTwa4olOR78KhBntu6ASWjcaTlOJdKZmFCY85vfrbt24HQ9WHgfgGhSQdvspjJGjre/DxszhxcXgdmu0JidIieGS6+fPF1FH2CDa1v47Bb8LltbP7kA4Suo+7d756M4CbJA1VVAn2MmR4rPoeJPIeCw2kld4YDi9uBv34z/YseprS3m/VftbHy01aKBvq4vrQG7YUt0/fJ5Z4B2RuJ0j+UwuotRlrtSEyMo6NIA18kzNPPrEUYBiaTQAL+j46xePOzYlo+SarDDfk5VhaW38OqBVUU5QisI4OQULGpKq5UipyZPoLbd2HOZjBpGgMvN1D2aO20zGgGyCtwH030h1utGNikzj0eB+XefHLMNrT0GNnsOFdjAwyHB242+rx56VBqyH5XsZKIXpNS1xmVBqnRUbT0OIaWIZuBoeEElsgAq5uaEIaBkNIwzGbTj0eO8GsyyazSUurr68WUJKqqNmQzeqthUQAdK5w3tMxiXShMiAmK6x6Pm7u6fdd3N+Pc/+6bwDuBijkcWvckpcXFuFwuqqurqa6uFnfMroKCgqPWHHOdYkwkhW6QzeqLMVkwEHiOHU+bu7p9enl5Mv3qa6ihsAe4UBG4QuXp0yQSCaLRKB0dHbS1tcl4PN4y7RS+EX5lQBeQCywV4I9EIlLp7KRwzZqJrM1m3rpsGc758/F4PBQWFuJyuaisrKS2tlbcNoVvg1bABbQI8ANYrdZGsWhR+3BTk9kyNsaBVIpgMIiqqsRiMVKpFH19fZw4cUJOqUTC88DHN5Q8JCDzVy0Wiw0q4+Mfeurqtlt6eujZs4cdfj8ejwen04nb7aasrIyampo7K5EwEzgM6MBLtxIAFBUVeU0u19fJgwcBjHv37Rs+tHMnmqYRDAZJJpMEAgHsdvukKk7eOETvTfWfI42NUoJMr10r4/F4S3Nzs9y0aZNsb2+X/+odD4VC/9iq/x7+BAq3zfFjyBmuAAAAAElFTkSuQmCC";
      this.firstChild.src = this.firstChild.src == pOpen ? pClosed : pOpen;
      this.title = this.title == "Megtekint"?"BezĂˇr":"Megtekint";
      this.nextSibling.style.display = this.nextSibling.style.display == "none" ? "" : "none";
      if (!this.nextSibling.hasAttribute("src"))
        this.nextSibling.src = this.previousSibling.href;
    }, false);

    var img = pLink.appendChild(document.createElement("img"));
    img.alt = "preview";
    img.border = "none";
    img.align = "absmiddle";
    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gMAhETG6suUFEAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAFPklEQVRIx52VTW8b1xWGn3PvzPBD/JAomanM+kNNa/mjQIsmttXUQQskqZEC9S7+Cc6iP6D9B41qdOdNDO+8MZqVuzZQOIumSFO1SAK1NWBLlp1ItkiRokianJl7TxYUWdlS0KYHuDO4ZwbnPe95zz1XvPcoQzMiqI52fvgUsFi89wigmiIKajyoQWyEqI5jHGSBIpg9DlWHiCACzgnGGhQQETyCmhAUvAioEvLfLTA4dJjjbqa6CyZYo2NGiMECDkF3/7MI/4uJagKqIHb4kiGvdqdHo7GlPu5jRAhDSxBFlIoFyWcj1AqappgwC9g9ZT4AxLs+GIN3YGzIyhcbuvpwHS+WbL6EZPM458iElpmpMjnjoN9mZrIgQShIkAUMIrJbAT1AEwGXeGyY4e4nn2pzZ0CYm+Kjj5d4tF7nYauPmhAjnqxVTs4d5tIbF/hBpXDFxvH1Umgxe4LLc80zYuIHiETc/XhJ6zsJ979s8ue/fs5M7TgnTpymfKhCbqIAJgCX0txc5+9/ucsv3/gJr716gpmMlVAYdp/IgSCBiNBobV15vFHnyY7j32sb1Oa/zw/PLpAxERO6Rei36ccGtQGz1Ume1A7zpw8/5GcLp96NU0cY2q9lMRTed/js8xVd2Ur540efUTr2PQYO8tZyeLpMIDGSCKIRT3odNpMehgHZbptfvfMLpq2TUiGH7LIxxuxnghhMGJD4AZXpKcJChsgGSJLQ6LZwGSVMLKQxPhOQz2aZCCKyEjOdi2TryzUtF4+Kqo7F3yd8JzXUjh6Xfz3+RF8qR9gJw8BaklTAZIhDJXCGMAVrDZNW6Gw84vLbP+XxP+/p5KGJcalGuuwDsTbEWMeZ40fJROustp6Qr8yiuTyKoY/DqicnhvZWndAmvP3z13n46T/Iu4RTZ34sezvrwHOSqNJp7FxJet33B6psuZTV+jaN9jMGMYg6MoGlXMgxM10iGezwxco95qozzM/NcehbNXHOY63lRbDx3qvSb/V4tt3SFM+2S+mmirFZMkGOQe8ZSdLn0cZD+t02cdzl3Ks/ojI52WzUN6dOzZ8RdsdLmqYEQbDvzEiqiusP6LS2VZ2jq57tbpdBr48fxCQxtNoNEo0JQsNLh6b57tzLHzxYffzORn2Te8vLfLtW4+LFi1IqlfbpIiLIwDss0NpqXkli974Ph2Mwgr/5QfyKE0tqHLlc5gO8f9Mn6VS1WpM4Tvjt736v9c11arOzFItFzp07x9mzZ+U/E33YccYOJw/TlenrUSZ4y/q0Kc6TJO4VTIhHiCRqaqLfwZk7YKnXG++FYcDrry2w+uABjUaD9fV1lpaWuHXrltbr9fcAnHNDIFVFvUfMcPomSYJ3ntSleO8JgmC8RIR2u0W3+0xVlUqlIrdv39abN29y7NgxyuUy1WqVYrHI/Pw8Fy5cEFUlUNUxgPeeMAwhhAyZ5yh773HOUSxOkiTuXe/9m41GQy9duiTZbFZv3LjB7Ows3nu899y/f5+1tTW9fPmyiPd+3A1mF2zvWFDVsX+UiIjw9OnTLWvt9SRJfp3P52V5eVkXFxcpl8sUCgVKpRJHjhxhYWEBIyIYY8YzZ5T5aO31723LarVaMcbccc4BMD8//9bVq1cZDAasra3RbDZZWVkhn89jRgFezP4g/3NtKcLU1NSdQqEgvV5PkyT5w8TEBNeuXVs8ffo0jUaD8+fPc/LkyWG5vontPc0jVp1Oh3a7rZlMZrFUKv0miqIXLy3/jQD2BhcRnHMY8/z1q6o45wjDcKjh/8PkRaCvs9H3rwCFceIfNpYNHgAAAABJRU5ErkJggg==";

    var iframe = link.parentNode.insertBefore(document.createElement("iframe"),pLink.nextSibling);
    iframe.style.display = "none";
    iframe.width = "100%";
    iframe.height = "350";
    iframe.appendChild(document.createTextNode(""));
    }
  }
}
addStyle();
reMake();
imgResize();
sokOldal();
elonezetek();
eloz_valasz();
hozzaszolas();