// ==UserScript==
// @name        Ultoo [23-04-2013] Send Sms,Poll,& Answer it.
// @namespace   Updated All in one
// @description [23 April 2013] This script automate the whole process of ultoo enjoy...
// @include     http://sms.ultoo.com/*
// @include     http://adf.ly/*
// @updateURL		http://userscripts.org/scripts/source/165596.meta.js
// @downloadURL		http://userscripts.org/scripts/source/165596.user.js
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @grant       none
// @version     21.0.7
// ==/UserScript==


$(function()
{

var path=window.location.pathname;
var url=window.location.href;

var pattern=/^http:\/\/sms.ultoo.com\/mywallet.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://adf.ly/NWdGF";
	
}
var pattern=/^http:\/\/adf.ly/g;

if(url.search(pattern)==0){

setInterval(function () {document.getElementById("skip_ad_button").click();}, 2000);}

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
	window.location.href="http://sms.ultoo.com/login.php";
}

pattern=/^http:\/\/sms.ultoo.com\/poll.php/g;

var path=window.location.pathname;

if (path=="/poll.php")
{
    
    var rand=computeRandom();
    var opt="AnchorId_"+rand;
    ImplementClass(opt);
    var mobile=9360299840;
    setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"Its 17th April..."+Math.floor((Math.random() * 10000) + 1)+"'" , SendNow_:"Send Now"}, function(){});},550);
    document.form1.submit();
    
    setTimeout("window.location.href = \"http://sms.ultoo.com/poll.php?zxcoiesesscd=\";",700);
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

	var link2 = $("img[src='images/Submit_Now.jpg']").parent().attr("href");

}

pattern=/^http:\/\/sms.ultoo.com\/middleAdPoll.php/g;

if(url.search(pattern)==0)
{
	window.location.href=url.replace("middleAdPoll","poll");
}

var pattern=/^http:\/\/sms.ultoo.com\/PollCompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://adf.ly/NWdla";
	//window.location.href=url.replace("PollCompletion","home");
}

pattern=/^http:\/\/sms.ultoo.com\/PollCompleted.php/g;

if(url.search(pattern)==0)
{
	document.getElementsByName('PollUserName')[0].value="Vikash";
	document.getElementsByName('PollUserQuestion')[0].value="A u hungry today??";
	document.getElementById('OptionId1').value="a";
	document.getElementById('OptionId2').value="b";
	document.getElementById('OptionId3').value="c";
	document.getElementById('OptionId4').value="d";
	var mobile=9360299840;
	$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"Hello Babe......" , SendNow_:"Send Now"}, function(){});
	document.form1.submit();
}

pattern=/^http:\/\/sms.ultoo.com\/QuestionSaved.php/g;

if(url.search(pattern)==0)
{
	window.location.href="http://adf.ly/NWe4V";
	
}

pattern=/^http:\/\/sms.ultoo.com\/home.php/g;

if(url.search(pattern)==0)
{
	var content=document.getElementsByTagName('font')[0].innerHTML;
	var pat="Dear";

	if(content.search(pat)<0)
	{	
		document.getElementById('MobileNos_').value=9360299840;
		document.getElementById('Message_').value="Hi..., Have a Good Day...! ULtoo '"+Math.floor((Math.random() * 10000) + 1)+"'";
		document.frmSendSms.submit();
		setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",100);	
                  setTimeout("window.location.href = \"http://sms.ultoo.com/home.php?zxcoiesesscd=\";",300);	
	}
	else
	{
		window.location.href ="http://adf.ly/LsiCB";
		//window.location.href ="http://sms.ultoo.com/logout.php?Logout=1";
	}
}

pattern=/^http:\/\/sms.ultoo.com\/AnswereIt.php/g;

if(url.search(pattern)==0)
{
    var options="plays;geet trivedi;vettel;narine;ap;salman;amalpet;rahul dravid;kerry;windows 8;oct 2;rekha;egypt;pune;indra;holland;india;sujata;yen;cricket;raju;1;kate winslet;egypt;anil;idea;me;written;japan;sara;sipra;wanted;irfan khan;chennai;anjali sharma;delhi;laila;anjali sharma;7;keller;lion;1949;usa;divya;capital;jazzy b;rat;sonia;kurma;attenborough;"
	var quesids="7863;7864;7867;7869;7870;7871;7874;7876;7878;7879;7882;7883;7884;7885;7886;7887;7888;7889;7890;7891;7892;7893;7894;7895;7896;8072;8073;8074;8075;8076;8077;8078;8079;8080;8081;8082;8083;8084;8085;8086;8087;8088;8089;8090;8091;8092;8093;8094;8095;8096";
	var cont=document.getElementsByTagName('p')[0].innerHTML;
	var qno=parseInt(cont.substr(17));
	document.getElementsByTagName('input')[0].value=options.split(";")[qno-1];	
	var quesid=quesids.split(";")[qno-1];
	var oid=(parseInt(quesid)*4)-10;
	var qxval=document.getElementsByTagName('input')[0].value;
	var mobile=9360299840;
	$.post("poll.php",{ qxci:qxval , QuestionId:quesid , OptionChecked:"1" , zxcoiesesscd:"" , chalange_field:"" , response_field:"" , OptionId:oid},function(){});
	setTimeout(function(){$.post("home.php",{zxcoiesesscd:"" , MessageLength:"140" , GlobalKeyValue:"1" , chalange_field:"" , response_field:"" , MobileNos_:mobile , Message_:"APRIL FOOL..."+Math.floor((Math.random() * 10000) + 1)+"'" , SendNow_:"Send Now"}, function(){});},750);
	setTimeout("document.getElementsByTagName('input')[2].click();",1200);
	setTimeout("window.location.href = \"http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=\";",2600);
}

pattern=/http:\/\/sms.ultoo.com\/AnswereItGraph.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
         window.location.href = "http://sms.ultoo.com/AnswereIt.php?zxcoiesesscd=";
}

pattern=/http:\/\/sms.ultoo.com\/AICompletion.php/g;

if(url.search(pattern)==0)
{
	window.location.href = "http://adf.ly/LshbD";
}




});
if(url.indexOf("adf")<0)
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