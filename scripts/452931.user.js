// ==UserScript==
// @name			Ask.fm Auto Like ask fm By HuZz97
// @namespace       @HuZz97
// @version			3.0
// @copyright		http://ask.fm/HuZz97
// @description		Auto Like Ask.fm 25 likes 
// @author			(http://fb.com/HuZz97)
// @include		http://ask.fm/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/138450/large.gif?1342345458
// @updateURL  https://userscripts.org/scripts/source/170110.meta.js
// Ask.fm Auto Like ask fm By Dyft
// Version 3.0
// Igraet @HuZz97  
 // fb.com/dan.sterovsky
// ==/UserScript==
// ==Profile==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like1');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 1.00;
	div.style.bottom = "+95px";
	div.style.left = "+5.9px";
	div.style.backgroundColor = "#ffffff";
	div.style.padding = "2px";
	div.innerHTML = "<center> <a href='/HuZz97' title='HuZz97 ? '><img src=''  align='absmiddle' /></a>"

	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
        div2.style.width = "125px";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+65px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#FFFFFF";
	div2.style.border = "1px solid #555";
	div2.style.padding = "2px";
	div2.innerHTML = "<center> <a href='http://fb.com/dan.sterovsky' title='HuZz97 '><img src=''  align='absmiddle' /></a> "
	
	div3 = document.createElement("div");
	div3.style.position = "fixed";
	div3.style.top = "37px";
	div3.style.left = "-3px";
	div3.style.padding = "2px";
	div3.innerHTML = "<center> <a href='/HuZz97' title='Fysira ?'><img src='http://static.tumblr.com/yu2orom/P2Vlyxtt7/j-566.png'  align='absmiddle' /></a> "
	
	body.appendChild(div);
	body.appendChild(div2);
	body.appendChild(div3);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center> <a href='http://fb.com/dan.sterovsky' title=':D ? '><img src='http://im33.gulfup.com/8XpXY.png'  align='absmiddle' /></a>"
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<a onclick='spoiler()' title='25 likes'> 25 likes &raquo;</a>"
		}
	}
	};
}

// ==============
// ==Like All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like2');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "125px"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+42px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#FFFFFF";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&nbsp;<a onclick='OtomatisLike()'><img src='http://im34.gulfup.com/ZMwRQ.png'  align='absmiddle' /></a>&nbsp;"
	
	body.appendChild(div);
	
	unsafeWindow.OtomatisLike = function() {
		document.getElementsByClassName("submit-button-more")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		document.getElementsByClassName("like hintable")[0].click();
		

		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like") >= 0)
				if(buttons[i].getAttribute("name") == "likern false;")
					buttons[i].click();
		}
		
	};
}

var thisScriptVersion = GM_info.script.version;
//Date-Objects
var time = new Date();
//Firefox doesn't allow toString() with URLs
var isfirefox = false;
//Update-Check
var update_avaible = false;
    function showUpdate() {
    if (update_avaible==true) {
    if (document.getElementsByClassName("adremoverupdateinfo")[0]!=null) {
         document.getElementsByClassName("adremoverupdateinfo")[0].style.display="block";
        }
    if (document.getElementsByClassName("adremoverupdateinfo")[1]!=null) {
         document.getElementsByClassName("adremoverupdateinfo")[1].style.display="block";
        }
} else {
    if (document.getElementsByClassName("adremoverupdateinfo")[0]!=null) {
         document.getElementsByClassName("adremoverupdateinfo")[0].style.display="none";
        }
    if (document.getElementsByClassName("adremoverupdateinfo")[1]!=null) {
        document.getElementsByClassName("adremoverupdateinfo")[1].style.display="none";
        }
}
    }
document.undoPlaceholderRemoval = function(info1) {
    for (var o = 0;o<document.elements_array_optimized.length;o++) {
     document.elements_array_optimized[o].style.display="block"; 
        console.log("Undo placeholder removal: [class] "+ document.elements_array_optimized[o].className + " [id] "+ document.elements_array_optimized[o].getAttribute("id") + " [element] "+document.elements_array_optimized[o]);
    }
    document.getElementById("adremover_undo_link").innerHTML=info1;
    document.getElementById("adremover_undo_link").setAttribute("href","#");
};
function handleContent() {
   if (xmlHttpObject.readyState == 4) {
        var thisScriptVersion = GM_info.script.version;
        var currentVersion = parseFloat(xmlHttpObject.responseText.substr( xmlHttpObject.responseText.search(/@version/) + 12, 3));
	if (currentVersion > thisScriptVersion){
        update_avaible = true;
        showUpdate();
        GM_setValue("updateAvaible_AR","true");
    } else {
        update_avaible = false;
        GM_setValue("updateAvaible_AR","false");
    }
GM_setValue("lastUpdateDay_AR",t_time.getDay());    
}
}
function testForForbiddenKeywords(words) {
    var h_Regexp = new RegExp("ead|add|oad|pad|advanced|grad");
    if (words.search(h_Regexp)>-1) {
     return true;   
    } else {
     return false;   
    }
    
}
function getElementsByClassNames(pattern) {
  if (typeof pattern == 'string') {
      pattern = new RegExp(pattern);
  }
  var el, els = document.body.getElementsByTagName('*');
  var elements = [];
  var i = els.length;

  while (i--){
    el = els[i];
    if (el.className && pattern.test(el.className.toLowerCase()) && testForForbiddenKeywords(el.className)==false){
      elements.push(el);
    }
  }
  return elements;
}

function getElementsByIdNames(pattern){
  if (typeof pattern == 'string') {
      pattern = new RegExp(pattern);
  }
  var el, els = document.body.getElementsByTagName('*');
  var elements = [];
  var i = els.length;

  while (i--){
    el = els[i];
    if (el.getAttribute("id") && pattern.test(el.getAttribute("id").toLowerCase()) && testForForbiddenKeywords(el.getAttribute("id"))==false){
      elements.push(el);
    }
  }
  return elements;
}

if (navigator.userAgent.toLowerCase().indexOf("firefox")>-1) {
isfirefox = true;       
}
//Keywords
if (isfirefox==false) {
var keyurls = ["atdmt.com/MRT","cdn.movad.net/","redintelligence.net/request","ads.adtiger.de/ad","ads.newtentionassets.net/asset","hosting.adjug.com/AdJug","adclient.uimserv.net/html.ng","creativeproxy.uimserv.net/?LogoutAdProxy","a.ligatus.com/timeout","2mdn.net/","track.adform.net/ad","hosting.adjug.com/Ad","ad4mat.de/ads","zanox-affiliate.de/ppc","ads.bluelithium.com/iframe","pagead2.googlesyndication.com/simgad","ads.tlvmedia.com/st?ad","ad.xtendmedia.com/st?ad","zanox-affiliate.de/ppc","content.yieldmanager.edgesuite.net/atoms","network.adsmarket.com/ceas","ad.doubleclick.net/adi",".ib.adnxs.com/if?","adserver.freenet.de/Ads","i.ligatus.com/com_ms","a.ligatus.com/timeout.php","ds.serving-sys.com/BurstingRes","tags.qservz.com/ct_adi","ads.newtentionassets.net/asset","image.adjug.com/Advertiser","tags.qservz.com/ct_adi","googleads.g.doubleclick.net/pagead","content-result-ads","ads.newtention.net/ads","hosting.adjug.com/AdJugSearch","uk-ads.openx.net","tag.admeld.com/imp/iframe","ad.ad-srv.net/request_content.php"];
}
var keywords = ["googleafc","brandbox","pyv","adcont","beacon","watch-channel-brand-div","watch-pyv-vid","ad_","_ad","adv","ad1","-ad","ad-","watch-pyv-vid","adifr","promotion","advert","promos","adBox","rwidesky","watch-channel-brand-div","_ads","ads_","feed-pyv-container","tvcap","promoted","adform","adbox","contentad","adcloud","werbung","billboardContainer","medrec","contad","adsky","headad","aswift_","adcontainer","topad","adwrapper","eyecatcher","adspecial","banner","adholder","hpad","sponsored","adframe","adform","adbox","sky","skylayer","commercial","superlayer","adsense","banner","footerad","commercial","skyscraper","adsense","sgad"];
var removed_embed_urls = [];
var removed_items = [];
var removed_img_urls = [];
var removed_iframe_urls = [];
var elements_array = [];
document.elements_array_optimized = [];
time = time.getMilliseconds();
var allembeds = 0;
var allads = 0;
var allimgs = 0;
var alliframes = 0;
var allplaceholders = 0;
//Ids
var ak_el;
for(var i = 0;i < keywords.length;i++) {
    ak_el = getElementsByIdNames(keywords[i]);
    for (var i2 = 0;i2<ak_el.length;i2++) {
    if (ak_el[i2]) {
        ak_el[i2].style.display="none";
        elements_array.push(ak_el[i2]);
        removed_items.push(" #" + ak_el[i2].getAttribute("id"));
        allads++;
    } }
}
//Classes
var ak_el2;
for(var k = 0;k < keywords.length;k++) {
    ak_el2 = getElementsByClassNames(keywords[k]);
    if (ak_el2) {
    for (var j = 0;j < ak_el2.length;j++) {
    if (ak_el2[j]) {
        ak_el2[j].style.display="none";
        elements_array.push(ak_el2[j]);
        removed_items.push(" ." + ak_el2[j].className);
        allads++;
    } } } 
}    
if (isfirefox==false) {
//Embeds
for (var a = 0;a < document.getElementsByTagName("embed").length;a++) {
    for (var b = 0;b < keyurls.length;b++) {
        if (document.getElementsByTagName("embed")[a] && document.getElementsByTagName("embed")[a].getAttribute("src")!=undefined && document.getElementsByTagName("embed")[a].getAttribute("src").length>5 && document.getElementsByTagName("embed")[a].getAttribute("src").toString().length>5 && document.getElementsByTagName("embed")[a].getAttribute("src").toString().indexOf(keyurls[b])>=0) {
            removed_embed_urls.push(document.getElementsByTagName("embed")[a].getAttribute("src"));
            document.getElementsByTagName("embed")[a].parentNode.removeChild(document.getElementsByTagName("embed")[a]);
            allembeds++;
        } }
}
//Iframes
for (var c = 0;c < document.getElementsByTagName("iframe").length;c++) {
    if (document.getElementsByTagName("iframe").length>0) {
    for (var d = 0;d < keyurls.length;d++) {
        if (document.getElementsByTagName("iframe")[c].getAttribute("src")!=null && document.getElementsByTagName("iframe")[c].getAttribute("src")!=undefined && document.getElementsByTagName("iframe")[c].getAttribute("src").length>5 && document.getElementsByTagName("iframe")[c].getAttribute("src").toString().length>5 && document.getElementsByTagName("iframe")[c].getAttribute("src").toString().indexOf(keyurls[d])>=0) {
            removed_iframe_urls.push(document.getElementsByTagName("iframe")[c].getAttribute("src"));
            document.getElementsByTagName("iframe")[c].parentNode.removeChild(document.getElementsByTagName("iframe")[c]);
            alliframes++;
        } } }
}
//Imgs
for(var f = 0;f < document.getElementsByTagName("img").length;f++) {
for(var h = 0;h < keyurls.length;h++) {
	if(document.getElementsByTagName("img")[f].getAttribute("src")!=null && document.getElementsByTagName("img")[f].getAttribute("src").indexOf(keyurls[h])>-1) { 
		document.getElementsByTagName("img")[f].style.display="none";
        removed_img_urls.push(document.getElementsByTagName("img")[f].getAttribute("src"));
        allimgs++;
        } } 
} 
}
var optic = false;
if (allads>0 || allembeds>0 || allimgs>0 || alliframes>0) {
for (var i = 0;i<elements_array.length;i++) {
if (elements_array[i].parentNode  && elements_array[i].parentNode.children.length<2 && elements_array[i].parentNode.children.length<5) {
elements_array[i].parentNode.style.display="none";   
optic = true;
document.elements_array_optimized.push(elements_array[i].parentNode);
allplaceholders++;
}
if (elements_array[i].parentNode && elements_array[i].parentNode.parentNode && (elements_array[i].parentNode.parentNode.children && elements_array[i].parentNode.parentNode.childNodes.length<4 && ((elements_array[i].parentNode.parentNode.children[0] && elements_array[i].parentNode.parentNode.children[0].nodeName=="SCRIPT") || (elements_array[i].parentNode.parentNode.children[1] && elements_array[i].parentNode.parentNode.children[1].nodeName=="SCRIPT")))) {
 elements_array[i].parentNode.parentNode.style.display="none";
optic = true;
document.elements_array_optimized.push(elements_array[i].parentNode.parentNode);
allplaceholders++;
}
if (elements_array[i].parentNode && elements_array[i].parentNode.parentNode && elements_array[i].parentNode.parentNode.parentNode && (elements_array[i].parentNode.parentNode.parentNode.children && elements_array[i].parentNode.parentNode.parentNode.childNodes.length<5 && ((elements_array[i].parentNode.parentNode.parentNode.children[0] && elements_array[i].parentNode.parentNode.parentNode.children[0].nodeName=="SCRIPT") || (elements_array[i].parentNode.parentNode.parentNode.children[1] && elements_array[i].parentNode.parentNode.parentNode.children[1].nodeName=="SCRIPT")))) {
elements_array[i].parentNode.parentNode.parentNode.style.display="none";
optic = true;
document.elements_array_optimized.push(elements_array[i].parentNode.parentNode.parentNode);
allplaceholders++;
}    
if (elements_array[i].parentNode && elements_array[i].parentNode.parentNode && elements_array[i].parentNode.parentNode.parentNode && elements_array[i].parentNode.parentNode.parentNode.parentNode && (elements_array[i].parentNode.parentNode.parentNode.parentNode.children && elements_array[i].parentNode.parentNode.parentNode.parentNode.childNodes.length<6 && ((elements_array[i].parentNode.parentNode.parentNode.parentNode.children[0] && elements_array[i].parentNode.parentNode.parentNode.parentNode.children[0].nodeName=="SCRIPT") || (elements_array[i].parentNode.parentNode.parentNode.parentNode.children[1] && elements_array[i].parentNode.parentNode.parentNode.parentNode.children[1].nodeName=="SCRIPT")))) {
elements_array[i].parentNode.parentNode.parentNode.parentNode.style.display="none";
document.elements_array_optimized.push(elements_array[i].parentNode.parentNode.parentNode.parentNode);
optic = true;
allplaceholders++;
}   
}
    


}// JavaScript Document// JavaScript Document