// ==UserScript==
// @name        Ultoo New 3in1 Script [3G Users]
//@description works on sms.ultoo.com with Faster & New ultoo 3in1 script methodd
// @namespace  ultoo
// @include     http://sms.ultoo.com/home.php*
// @include     http://sms.ultoo.com/AnswereIt.php*
// @include     http://sms.ultoo.com/poll.php*
// @include     http://sms.ultoo.com/mywallet.php*
// @include     http://sms.ultoo.com/AnswereItGraph.php*
// @include     http://sms.ultoo.com/PollCompletion.php*
// @include     http://sms.ultoo.com/AICompletion.php*
// @include     http://sms.ultoo.com/PollResult.php*
// @include     http://sms.ultoo.com/middleAdPoll.php*
// @include     http://sms.ultoo.com/PollCompleted.php*
// @include     http://sms.ultoo.com/QuestionSaved.php*
// @include     http://sms.ultoo.com/msgSent.php*
// @include     http://sms.ultoo.com/middleAdSendSms.php*
// @include     http://sms.ultoo.com/relogin.php*
// @include     http://sms.ultoo.com/index.php*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// @version     5.05.2013
// @updateURL		http://userscripts.org/scripts/source/162368.meta.js
// @downloadURL		http://userscripts.org/scripts/source/162368.user.js
// @author         Gambler_No.1
// @icon           http://bitthief.ethz.ch/images/bt167.png
// @licence        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
$(function(){

var path = window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;
if(url.search(pattern)==0)
{
setInterval(function () {alert("Click on options and select---Allow Popups for sms.ultoo.com---at Top Right corner of this page for superfast earning");}, 5000);	
        window.location.href=url.replace("mywallet","AnswereIt");
        window.open('http://sms.ultoo.com/poll.php');
}
/*
var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;
if(url.search(pattern)==0)
{
	window.location.href=url.replace("home","AnswereIt");
}
*/

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

var path = window.location.pathname;

if (path == "/poll.php")
{
  var rand = computeRandom();
  var opt = "AnchorId_"+rand;
  ImplementClass(opt);
  document.form1.submit();
setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",110);
}
function computeRandom()
{
return Math.round(Math.random() * (4-1) + 1);
}

pattern=/^http:\/\/sms.ultoo.com\/PollResult.php/g;

if(url.search(pattern)==0)
{
	var link = $(".poll_result_gbg a:last").attr('href');
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}

	var link2 = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link2) != "undefined")
	{
		window.location.href = link2;
	}
}

pattern=/^http:\/\/sms.ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	var link = $("img[src='images/submit_now.jpg']").parent().attr("href");
	if(typeof(link) != "undefined")
	{
		window.location.href = link;
	}
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	if(document.getElementsByTagName('font')[0]!=undefined)
	{
//	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
	window.location.href=url.replace("PollCompleted", "home");
//        window.open('http://sms.ultoo.com/home.php');
	}
	else
	{
		document.getElementsByName('PollUserName')[0].value="RAJ";
		document.getElementsByName('PollUserQuestion')[0].value="What's the longest amount of time you've spent at a restaurant..? & Me only "+Math.floor((Math.random() * 100000) + 1)+"seconds";
document.getElementById('OptionId1').value=Math.floor((Math.random() * 100000) + 10);
document.getElementById('OptionId2').value=Math.floor((Math.random() * 50000) + 2);
document.getElementById('OptionId3').value=Math.floor((Math.random() * 8000) + 1);
		document.getElementById('OptionId4').value="Can't say"
		document.form1.submit();

	}
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
//	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
	window.location.href ="http://sms.ultoo.com/home.php?zxcoiesesscd=";
        window.open('http://sms.ultoo.com/home.php');
}

//AnswereIt

pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
	var options="may 5;chennai;hockey;salman;cook;pawan bansal;liv tyler;gayle;jaya prada;india;euro;abn;salman khan;yamuna;koorma;kolkata;akshay kumar;25;cricket;aamir khan;basel;paris;tabu;dubai;chennai;sun;tehran;lions;2005;dmk;kambli;pinging;chota bheem;osama;1990;nancy;tyres;edwin fumble;police;9xm;web editor;indrajit;kaka;good;piddu;honda;4;craber;fusion;akon;"
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));

if(document.getElementsByClassName('inputtxt')[0].style.display=='')
{
document.getElementsByClassName('inputtxt')[0].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[1].style.display=='')
{
document.getElementsByClassName('inputtxt')[1].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[2].style.display=='')
{
document.getElementsByClassName('inputtxt')[2].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[3].style.display=='')
{
document.getElementsByClassName('inputtxt')[3].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[4].style.display=='')
{
document.getElementsByClassName('inputtxt')[4].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[5].style.display=='')
{
document.getElementsByClassName('inputtxt')[5].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[6].style.display=='')
{
document.getElementsByClassName('inputtxt')[6].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[7].style.display=='')
{
document.getElementsByClassName('inputtxt')[7].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[8].style.display=='')
{
document.getElementsByClassName('inputtxt')[8].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[9].style.display=='')
{
document.getElementsByClassName('inputtxt')[9].value=options.split(";")[qno-1];
}
else if(document.getElementsByClassName('inputtxt')[10].style.display=='')
{
document.getElementsByClassName('inputtxt')[10].value=options.split(";")[qno-1];
}

document.getElementsByTagName('input')[5].click();
document.getElementsByTagName('input')[6].click();
document.getElementsByTagName('input')[7].click();
document.getElementsByTagName('input')[8].click();
document.getElementsByTagName('input')[9].click();
document.getElementsByTagName('input')[10].click();
document.getElementsByTagName('input')[11].click();
//document.getElementsByTagName('input')[12].click();
setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",260);
}

//Messages

var pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
if(document.getElementsByClassName('boxfieldcontent')[0].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[0].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[1].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[1].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[2].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[2].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[3].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[3].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[4].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[4].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[5].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[5].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[6].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[6].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[7].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[7].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[8].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[8].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[9].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[9].value=90164*****;
}
else if(document.getElementsByClassName('boxfieldcontent')[10].style.display=='')
{
document.getElementsByClassName('boxfieldcontent')[10].value=90164*****;
}

if(document.getElementsByClassName('txtfieldcontent')[0].style.display=='')
{
document.getElementsByTagName('textarea')[0].value="Good morning.1 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByClassName('txtfieldcontent')[1].style.display=='')
{
document.getElementsByTagName('textarea')[1].value="Good morning.1 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[2].style.display=='')
{
document.getElementsByTagName('textarea')[2].value="Good morning.2 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[3].style.display=='')
{
document.getElementsByTagName('textarea')[3].value="Good afternoon. 3,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[4].style.display=='')
{
document.getElementsByTagName('textarea')[4].value="Good night.4 ,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[5].style.display=='')
{
document.getElementsByTagName('textarea')[5].value="Good holiday. 5,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[6].style.display=='')
{
document.getElementsByTagName('textarea')[6].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[7].style.display=='')
{
document.getElementsByTagName('textarea')[7].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[8].style.display=='')
{
document.getElementsByTagName('textarea')[8].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[9].style.display=='')
{
document.getElementsByTagName('textarea')[9].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}
else if(document.getElementsByTagName('textarea')[10].style.display=='')
{
document.getElementsByTagName('textarea')[10].value="Good hello. 6,"+Math.floor((Math.random() * 10000000) + 1);
}

//setInterval(function () {document.getElementById("sendNowbtnDiv").click();}, 100);
document.getElementById("sendNowbtnDiv").click();
setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",310);
	}
	else
	{
		window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	} 
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/poll.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/msgSent.php/g;

if(url.search(pattern)==0)
{
	window.location.href ="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/middleAdSendSms.php/g;
if(url.search(pattern)==0)
{
	window.location.href ="http://sms.ultoo.com/home.php?zxcoiesesscd=";
}

pattern=/^http:\/\/sms.ultoo.com\/index.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/sms.ultoo.com\/SessExpire.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://sms.ultoo.com/logout.php?LogOut=1";
}

pattern=/^http:\/\/sms.ultoo.com\/relogin.php/g;

if(url.search(pattern)==0)
{
	 window.location.href="http://google.com";
         window.open('http://sms.ultoo.com/login.php');
}
});

setTimeout(function(){
   window.location.reload(1);
}, 7000);




var h=location.href;
if (h.indexOf("ultoo")>-1 && h.indexOf("adf")==-1)
{

var time = new Date();
time = time.getMilliseconds();
var info1;
var allads = 0;
var alliframes = 0;
var keyurls = new Array("ads.tlvmedia.com/st?ad","ad.xtendmedia.com/st?ad","zanox-affiliate.de/ppc","content.yieldmanager.edgesuite.net/atoms","network.adsmarket.com/ceas","ad.doubleclick.net/adi",".ib.adnxs.com/if?","adserver.freenet.de/Ads","adclient.uimserv.net/","i.ligatus.com/com_ms","a.ligatus.com/timeout.php","ds.serving-sys.com/BurstingRes","tags.qservz.com/ct_adi","ads.newtentionassets.net/asset","image.adjug.com/Advertiser","tags.qservz.com/ct_adi","googleads.g.doubleclick.net/pagead","content-result-ads","ads.newtention.net/ads","hosting.adjug.com/AdJugSearch","uk-ads.openx.net","tag.admeld.com/imp/iframe","ad.ad-srv.net/request_content.php");
    for(var f = 0;f < document.getElementsByTagName("iframe").length;f++) {
        for(var h = 0;h < keyurls.length;h++) {
            if(document.getElementsByTagName("iframe").length>=1) {    
         for(var a = 0;a < document.getElementsByTagName("img").length;a++) {
        for(var b = 0;b < keyurls.length;b++) {
            if(document.getElementsByTagName("img").length>=1) {
        if(document.getElementsByTagName("img")[a].src.indexOf(keyurls[b])>=0) { 
           var oben = document.getElementsByTagName("img")[a];
           oben.parentNode.removeChild(oben); 
          allads++;
        }
    }
        }
        if(document.getElementsByTagName("iframe")[f].src.indexOf(keyurls[h])>=0) { 
           var oben = document.getElementsByTagName("iframe")[f];
           oben.parentNode.removeChild(oben); 
          alliframes++;
        }
    }
        }
    }

    }
var loc = document.location;
loc = loc.toString();
if (loc.indexOf("site=img")<0) {
var keywords = new Array("forum_ads","feed-pyv-container","google-ads-top","mbEnd","tvcap","ad_unit","promoted-videos","superfullsizebanner","sas_wall","adform-adbox","tvcap","sky","tads","skyscraperRgt","adrechts","contentad_right_col","werbung_top","adcloud_content","werbung","billboardContainer","app_advertising_leaderboard","content-result-ads","ad_sky2","ad_sky","right-ad-sky","right-ad-sky-banner","ads_lb_bottom","ad_content","ad_placement","l_banner","ads_show_if","btf-ad-medrec","atf-ad-medrec","atf-ad-leaderboard","contad","adsky","headad","aswift_3_anchor","aswift_2_anchor","aswift_1_anchor","aswift_0_anchor","adContainerRightCol","topAd","adWrapper728x90","adWrapper300x250","panel-ad-mr","logo-ad","ad-links-content","ad-links","ad-lr","comm-vertleft-adsense","eyecatcher","adv-generic-container","adv-medrect","fullBanner","fullbanner","advWrapper","adSpecial","banner_skyscraper","banner","bottombanner","banner_box","dmpi_adsense","dmpi_adsense_forcontent","adHolder","bannerImage","hpAd","ad-block","join-banner","advertising","yom-ad-iframe","yom-ad","type_ads","type_ads_default","banner-ad","sponsored-ads","adframe","adv-cnt","adform-adbox","adform-adbox-static","sky","spl_ad_plus","paLayer","qcRight","qcSkyLayer","spOasTop","spCommercial","qcSuperLayer","adsense","top-banner","tfs-footerad","full-banner","footerad","Advertisement","ad-ri","ad-container","content_commercial","story-ad-beitragslisten","bannerzone","adv-sky","adv-top","_my_ad","_my_ad2","_my_ad3","_my_ad4","_my_ad5","_my_ad6","post-install-ad","wrapper_iframeContainersgAdLbHp728x90","wrapper_iframeContainersgAdScHp160x600","sgAdLb2Hp728x90","wrapper_iframeContainersgAdLbHp728x90","wrapper_iframeContainersgAdScHp160x600","sgAdLb2Hp728x90","wrapper_iframeContainersgAdLbGp728x90","adbottom","naviad","us_ad","bcadv","skyscraper","ads-google","adsense","ads","gads","ad1","ad","ad-div","sgAd","sgAdLb","webgamechannel_class_banner","adv","advOnsite","advSmallRectangle","advChannel","advChannelTrends");
var ak_el;
for(var i = 0;i < keywords.length;i++) {
    ak_el = document.getElementById(keywords[i]);
    if (ak_el) {
        ak_el.style.display="none";
        allads++;
    }
}
var ak_el2;
for(var k = 0;k < keywords.length;k++) {
    ak_el2 = document.getElementsByClassName(keywords[k]);
    if (ak_el2) {
    for (var j = 0;j < ak_el2.length;j++) {
    if (ak_el2[j]) {
        ak_el2[j].style.display="none";
        allads++;
    }
}
    }
}
}
var loc = document.location.toString();
if (loc.indexOf("joomla.org")>=0) {
document.getElementById("banner").style.display="block";
allads--;    
}
if (allads>0 || alliframes>0) {
if (navigator.language.toLowerCase().indexOf("de")>=0) {
    if (allads>0 && alliframes<=0) {
    info1 = " Anzeigen entfernt";
    } else {
    info1 = " Anzeigen ";    
    }
    info2 = " iframes entfernt!";
} else {
    if (allads>0 && alliframes<=0) {
    info1 = " ads removed ";
    } else {
    info1 = " ads ";    
    }
 info2 = " iframes removed!";
}
var all_cont = "";
    if (allads>0 && alliframes>0) {
     allcont = allads + info1 + "&amp;<br>" + alliframes + info2;   
    } else if (allads>0) {
     all_cont = all_cont + allads + info1;   
    } else if (alliframes>0) {
        all_cont = all_cont + "&amp;<br>" + alliframes + info2;   
    }
document.getElementsByTagName("body")[0].appendChild(document.createElement("adremover"));
var adrel = document.getElementsByTagName("adremover")[0];
adrel.style.textAlign="left";
adrel.style.lineHeight="12px";
adrel.style.color="black";
adrel.style.position="fixed";
adrel.style.zIndex="9999999999999";
adrel.style.fontSize="12px";
adrel.style.top="0px";
adrel.style.right="0px";
adrel.style.background="rgb(238, 238, 238)";
adrel.style.borderLeft="2px solid cyan";
adrel.style.borderBottom="2px solid cyan";
adrel.style.boxShadow="cyan -2px 2px 4px 1px";
adrel.style.display="block";
adrel.style.padding="5px";
adrel.style.maxHeight="90px";
adrel.style.maxWidth="150px";
adrel.style.width="150px";
adrel.style.borderBottomLeftRadius="3px";
adrel.style.transition="top 0.75s ease-out";
var time2 = new Date();
adrel.innerHTML="<span style='color:black !important;font-size:12px !important;color:black !important;'><b style='font-size:14px !important;color:black !important;'>AdRemover</b><br>"+ all_cont +"<br>in "+(time2.getMilliseconds()-time)+" milliseconds</span>";
setTimeout("document.getElementsByTagName('adremover')[0].style.top='-100px'", 6000);
}
}