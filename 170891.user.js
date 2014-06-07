// ==UserScript==
// @name       AdRemover 6.1
// @version    6.1
// @description  This script removes ads on websites.
// @match      http://*
// @match      https://*
// @include    *
// @exclude    http://www.facebook.com/Jixie.lalabs.Koh*
// @exclude    http://www.amazon.*/*
// @exclude    https://www.google.*/search*
// @downloadURL http://userscripts.org/scripts/show/170628
// @copyright  2013+, ich01
// @namespace Yo'w Oriig Rich Flow Creative This  script
// @updateURL http://userscripts.org/scripts/source/159351.meta.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_*
// ==/UserScript==
var thisScriptVersion = GM_info.script.version;
//Date-Objects
var time = new Date();
//Firefox doesn't allow toString() with URLs
var isfirefox = false;
document.undoPlaceholderRemoval = function(info1) {
    for (var o = 0;o<document.elements_array_optimized.length;o++) {
     document.elements_array_optimized[o].style.display="block"; 
     //Debug: console.log("Undo placeholder removal: [class] "+ document.elements_array_optimized[o].className + " [id] "+ document.elements_array_optimized[o].getAttribute("id") + " [element] "+document.elements_array_optimized[o]);
    }
    document.getElementById("adremover_undo_link").innerHTML=info1;
    document.getElementById("adremover_undo_link").setAttribute("href","#");
};
function testForForbiddenKeywords(words) {
    var h_Regexp = new RegExp("ead|add|oad|pad|advanced|grad|has-custom-banner");
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
//States
var allRemovedAds = GM_getValue("ads_stat",0);
var allRemovedIframes = GM_getValue("iframes_stat",0);
var allRemovedImgs = GM_getValue("imgs_stat",0);
var allRemovedEmbeds = GM_getValue("embeds_stat",0);
//Popup mode
var popupMode = GM_getValue("ar_popupmode",0);
//optic
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
var allelements = allads + allembeds + allimgs + alliframes;   
//Translation
var textes = ["Click for Popup!","Time","xxx","Check for Updates","Images","Items","All","Placeholder removal","successfully done.","unsuccessfully done.","Undo","Undo successful!","Success statistics:","Popup mode:","Mini","Normal","Change"];
if (navigator.language.indexOf("de")>=0) {
textes = ["F&uuml;r Popup klicken!","Zeit","xxx","Auf neue Updates pr&uuml;fen","Bilder","Elemente","Alle","Platzhalter entfernt","erfolgreich durchgef&uuml;hrt.","erfolglos durchgef&uuml;hrt.","R&uuml;ckg&auml;ngig","Erfolgreich!","Erfolgsstatistiken:","Popup-Modus:","Mini","Normal","&Auml;ndern"];
}
//Popup
document.getElementsByTagName("body")[0].appendChild(document.createElement("adremoverpopup"));
var adpopup = document.getElementsByTagName("adremoverpopup")[0];
var left = (window.innerWidth - 500) / 2;
var top = (window.innerHeight - 350) / 2;
adpopup.style.top=top + "px";
adpopup.style.left=left + "px";
adpopup.style.background="rgba(200,200,200,0.9)";
adpopup.style.border="1px black solid";
adpopup.style.position="fixed";
adpopup.style.fontFamily="Arial";
adpopup.style.lineHeight="17px";
adpopup.style.display="none";
adpopup.style.overflow="scroll";
adpopup.innerHTML="<span style='background:rgb(245,233,237);width:96%;position:absolute;padding:7px;font-size:16px;font-weight:bold;color:black !important;'>AdRemover " + thisScriptVersion +"</span><br><br><span style='padding-left:7px;font-size:13px;color:black !important;'><b style='color:black !important;'>"+textes[12]+"</b> Ads[<span id=allremovedads style='color:blue !important;'>"+allRemovedAds+"</span>] Iframes[<span id=allremovediframes style='color:blue !important;'>"+allRemovedIframes+"</span>] Imgs[<span id=allremovedimgs style='color:blue !important;'>"+allRemovedImgs+"</span>] Embeds[<span id=allremovedembeds style='color:blue !important;'>"+allRemovedEmbeds+"</span>] Total[<span id=totalremovedads style='color:blue !important;'>"+(allRemovedAds+allRemovedIframes+allRemovedEmbeds+allRemovedImgs)+"</span>] [<a href=# title=Reset id=reset_ad_counts style='color:black !important;background:yellow !important;'>Reset</a>]</span><br><span style='padding-left:7px;font-size:13px;color:black !important;'><b style='color:black !important;'>"+textes[13]+"</b> <span id=popupmodusstate style='color:black !important;'></span> [<a href=# style='color:black !important;background:yellow !important;' id=changepopupmode>"+textes[16]+"</a>]</span><span style='color:black !important;display:block;padding-left:7px;'><b style='color:black !important;'>Updates:</b> [<a href=http://userscripts.org/scripts/show/159351 style='color:black !important;background:yellow !important;' target=blank>"+textes[3]+"</a>]</span><span id=adremover_popup_content style='color:black !important;overflow:scroll;list-style:none inside;font-size:13px;'></span><span style='position:absolute;top:1px;right:5px;color:black !important;'><button style=\"border:3px outset black;color:black !important;padding-bottom:1px;padding-left:6px;padding-right:6px;padding-top:1px;font-size:14px;border-radius:5px;color:black !important;font-weight:bold;background:white;cursor:pointer;\" onclick=\"document.getElementsByTagName('adremoverpopup')[0].style.display='none'\">Close</button></span>";
if (popupMode==0) {
 document.getElementById("popupmodusstate").innerHTML=textes[15];   
} else {
 document.getElementById("popupmodusstate").innerHTML=textes[14];   
}
document.getElementById("changepopupmode").addEventListener("click",function() {if (GM_getValue("ar_popupmode",0)==0) {GM_setValue("ar_popupmode",1);document.getElementById("popupmodusstate").innerHTML="Mini";}else{GM_setValue("ar_popupmode",0);document.getElementById("popupmodusstate").innerHTML="Normal";}});
adpopup.style.width="500px";
adpopup.style.height="350px";
adpopup.style.zIndex="999999999999";
adpopup.style.borderRadius="3px";
adpopup.style.textAlign="left";
document.getElementById("reset_ad_counts").addEventListener("click",function() {GM_setValue("ads_stat",0);GM_setValue("iframes_stat",0);GM_setValue("imgs_stat",0);GM_setValue("embeds_stat",0);document.getElementById("reset_ad_counts").innerText=textes[11];document.getElementById("allremovedads").innerText="0";document.getElementById("allremovedembeds").innerText="0";document.getElementById("allremovediframes").innerText="0";document.getElementById("allremovedimgs").innerText="0";document.getElementById("totalremovedads").innerHTML="0";});
//Info    
document.getElementsByTagName("body")[0].appendChild(document.createElement("adremover"));
var adrel = document.getElementsByTagName("adremover")[0];
adrel.style.textAlign="left";
adrel.style.lineHeight="12px";
adrel.style.opacity="0.85";
adrel.style.color="black";
adrel.style.position="fixed";
adrel.style.zIndex="9999999999999";
adrel.style.fontSize="11px";
adrel.style.top="0px";
adrel.style.right="0px";
adrel.style.background="rgba(238, 238, 238,0.9)";
adrel.style.borderLeft="2px solid cyan";
adrel.style.borderBottom="2px solid cyan";
adrel.style.boxShadow="cyan -2px 2px 4px 1px";
adrel.style.display="block";
adrel.style.padding="4px";
adrel.style.maxHeight="325px";
adrel.style.maxWidth="300px";
adrel.style.borderBottomLeftRadius="3px";
adrel.style.transition="top 0.75s ease-out";
adrel.style.fontFamily="Arial";
adrel.style.cursor="pointer";  
    var s_embeds2 = "<li style='color:black !important;font-weight:bold;white-space:nowrap;padding-left:7px;'>Embeds ("+ allembeds +")<br>";
var s_items2 = "<br><li style='color:black !important;font-weight:bold;white-space:nowrap;padding-left:7px;'>"+ textes[5] +" ("+ allads + ")<br>";
var s_iframes2 = "<br><li style='color:black !important;font-weight:bold;white-space:nowrap;padding-left:7px;'>Iframes ("+ alliframes + ")<br>";
var s_imgs2 = "<br><li style='color:black !important;font-weight:bold;white-space:nowrap;padding-left:7px;'>Imgs ("+ allimgs + ")<br>";
    var allString = "";
    if (allads>0) {
    allString = allString + "<br> - "+ textes[5] +"("+ allads +")";    
    }
    if (allembeds>0) {
    allString = allString + "<br> - Embeds("+ allembeds +")";    
    }
    if (alliframes>0) {
    allString = allString + "<br> - Iframes("+ alliframes +")";    
    }
    if (allimgs>0) {
    allString = allString + "<br> - Imgs("+ allimgs +")";    
    }
for (var l = 0;l<removed_items.length;l++) {
    s_items2 = s_items2.concat("<span style='font-weight:normal;color:black !important;'>&nbsp;&nbsp;&nbsp;&nbsp;- " + removed_items[l] + "</span><br>");
}
for (var m = 0;m<removed_embed_urls.length;m++) {
    s_embeds2 = s_embeds2.concat("<span style='font-weight:normal;color:black !important;'>&nbsp;&nbsp;&nbsp;&nbsp;- " + removed_embed_urls[m] + "</span><br>");
}
for (var p = 0;p<removed_iframe_urls.length;p++) {
    s_iframes2 = s_iframes2.concat("<span style='font-weight:normal;color:black !important;'>&nbsp;&nbsp;&nbsp;&nbsp;- " + removed_iframe_urls[p] + "</span><br>");
}
    for (var q = 0;q<removed_img_urls.length;q++) {
    s_imgs2 = s_imgs2.concat("<span style='font-weight:normal;color:black !important;'>&nbsp;&nbsp;&nbsp;&nbsp;- " + removed_img_urls[q] + "</span><br>");
}
    var allString2 = "";
    var iscontent = false;
    var allStringo = "";
    var allStringo2 = "";
    if (optic==true) {
        allStringo = "<b style='color:black !important;'>&rarr; "+textes[7]+"</b><br>";    
        allString2 = allString2 + "<li style='white-space:nowrap;color:black !important;padding-left:7px;'><b style='color:black !important;'>"+ textes[7] +":</b> "+ textes[8] +"(<span style='color:blue !important;'>"+ allplaceholders +" "+ textes[5] +"</span>) [<a href='javascript:document.undoPlaceholderRemoval(\""+ textes[11] +"\");' style='color:black !important;background:yellow !important;' id=adremover_undo_link>"+ textes[10] +"</a>]<br>";
    } else { 
        allString2 = allString2 + "<li style='white-space:nowrap;color:black !important;padding-left:7px;'><b style='color:black !important;'>"+ textes[7] +":</b> "+ textes[9] +"<br>";
    }
    if (allads>0) {
    allString2 = allString2 + s_items2;    
    allString2 = allString2 + "<br>";
    GM_setValue("ads_stat",(parseInt(allRemovedAds)+allads));
    }
    if (allembeds>0) {
    allString2 = allString2 + s_embeds2;
    allString2 = allString2 + "<br>";
    iscontent = true;
    GM_setValue("embeds_stat",(parseInt(allRemovedEmbeds)+allembeds));
    }
    if (allimgs>0) {
    allString2 = allString2 + s_imgs2;
    allString2 = allString2 + "<br>";
    GM_setValue("imgs_stat",(parseInt(allRemovedImgs)+allimgs));
    }
    if (alliframes>0) {
    allString2 = allString2 + s_iframes2; 
    GM_setValue("iframes_stat",(parseInt(allRemovedIframess)+alliframes));
    }
document.getElementById("adremover_popup_content").innerHTML=allString2;        
adrel.setAttribute("onclick","document.getElementsByTagName('adremoverpopup')[0].style.display='block'");
var time2 = new Date();
var timesec = time2.getMilliseconds()-time;
if (timesec<0) {
timesec = 1000-(timesec*-1);   
}
if (popupMode==0) {
adrel.innerHTML="<span style='color:black !important;font-size:12px !important;'><b style='font-size:16px !important;color:black !important;'>AdRemover</b><br><b style='color:black !important;'>"+ textes[6] +"("+ allelements +")</b>"+ allString +"<br><br>"+ allStringo + "<b style='color:black !important;'>"+ textes[0] +"</b><br><br>"+ textes[1] +": "+timesec+" milliseconds</span>";
} else {
adrel.innerHTML="<span style=color:black !important;font-weight:bold;font-size:16px !important;>"+(allads+allimgs+allembeds+alliframes)+"</span>";   
}
setTimeout(function() {document.getElementsByTagName("adremover")[0].style.top="-350px";}, 6500);
}