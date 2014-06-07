// ==UserScript==
// @name		MSPA: Clean
// @namespace	http://userscripts.org/scripts/show/156550
// @version		0.2.5
// @include		http://*mspaintadventures.com/*
// @include		http://*mspfanventures.com/*
// @copyright	2013, impliedFibre
// ==/UserScript==
var style = 1;
if(window.location.href.indexOf("mspaintadventures.com/trickster.php") > -1) {style = 3;}
if(window.location.href.indexOf("mspaintadventures.com/cascade.php") > -1) {style = 2;}
if(window.location.href.indexOf("mspaintadventures.com/sbahj.php") > -1) {style = -1;}
if(window.location.href.indexOf("mspaintadventures.com/scratch.php") > -1) {style = -2;}
if(window.location.href.indexOf("mspaintadventures.com/sweetbroandhellajeff/") > -1) {style = 0.1;}
if(window.location.href.indexOf("mspaintadventures.com/ACT6ACT5ACT1x2COMBO.php") > -1) {style = 0.2;}
if(window.location.href.indexOf("mspfanventures.com") > -1) {style = 0.3;}
if(style >= 1){
	if(style <= 2){
		document.body.innerHTML = document.body.innerHTML.replace('background="images/bannerframe.png"','id="banner"');
    }                                                          
    if(style == 3){
		document.body.innerHTML = document.body.innerHTML.replace('background="http://mspaintadventures.com/images/trickster_sitegraphics/bannerframe2.gif"','id="banner"');
	}
    document.body.innerHTML = document.body.innerHTML.replace('width="950" height="110"','width="950" height="13"');
    document.body.innerHTML = document.body.innerHTML.replace('width="208" height="100%"','id="sponsor" width="208" height="100%"');
    document.body.innerHTML = document.body.innerHTML.replace('table width="454" height="100%"','table width="676" height="100%"');
    document.body.innerHTML = document.body.innerHTML.replace('<img src="images/merchandise.png" alt=""><br>','<div id="merch"><img src="images/merchandise.png" alt=""><br>');
    var bannerdel = document.getElementById("banner");
    var sponsordel = document.getElementById("sponsor");
    var merchdel = document.getElementById("merch");
    bannerdel.parentNode.removeChild(bannerdel);
    sponsordel.parentNode.removeChild(sponsordel);
    merchdel.parentNode.removeChild(merchdel);
	if(style == 2){
        document.body.innerHTML = document.body.innerHTML.replace('width="950" height="110" valign="middle"','id="bannerii"');
        var banneriidel = document.getElementById("bannerii");
		banneriidel.parentNode.removeChild(banneriidel);
    }  
}
if(style < 0){
	var scratchsponsorsdel = document.getElementById("scratchsponsors");
	scratchsponsorsdel.parentNode.removeChild(scratchsponsorsdel); 
	if(style == -1){
		document.body.innerHTML = document.body.innerHTML.replace('<img src="images/mspalogo_sbahj.jpg" border="0">',"");
		document.body.innerHTML = document.body.innerHTML.replace('<img src="http://www.mspaintadventures.com/images/PSbooktwobanner.gif" border="0">',"");
		document.body.innerHTML = document.body.innerHTML.replace('<a href="http://www.topatoco.com/merchant.mvc?Screen=CTGY&amp;Store_Code=TO&amp;Category_Code=MSPA" target="_blank">','<div id="scratchmerch"><a href="http://www.topatoco.com/merchant.mvc?Screen=CTGY&amp;Store_Code=TO&amp;Category_Code=MSPA" target="_blank">');
		document.body.innerHTML = document.body.innerHTML.replace('<img src="images/v2_banner_music.gif" border="0">','</div>');
	}
	if(style == -2){
		document.body.innerHTML = document.body.innerHTML.replace('<img src="images/v2_mspalogo_scratch.gif" border="0">',"");
		document.body.innerHTML = document.body.innerHTML.replace('<img src="http://www.mspaintadventures.com/images/PSbooktwobanner.gif" border="0">',"");
		document.body.innerHTML = document.body.innerHTML.replace('<a href="http://www.topatoco.com/merchant.mvc?Screen=CTGY&amp;Store_Code=TO&amp;Category_Code=MSPA" target="_blank">','<div id="scratchmerch"><a href="http://www.topatoco.com/merchant.mvc?Screen=CTGY&amp;Store_Code=TO&amp;Category_Code=MSPA" target="_blank">');
		document.body.innerHTML = document.body.innerHTML.replace('<img src="images/v3_banner2_store1.gif" border="0">','</div>');
	}
	document.body.innerHTML = document.body.innerHTML.replace('<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#0e4603">','<table width="290" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#0e4603">');
	document.body.innerHTML = document.body.innerHTML.replace(/<!-- Beginning of Project Wonderful ad code: -->/g,'<div id=scratchsponsors>');
	document.body.innerHTML = document.body.innerHTML.replace(/<!-- End of Project Wonderful ad code\. -->/g,'</div>');
	var scratchmerchdel = document.getElementById("scratchmerch");
	var scratchsponsorsdel = document.getElementById("scratchsponsors");
	scratchmerchdel.parentNode.removeChild(scratchmerchdel);
	scratchsponsorsdel.parentNode.removeChild(scratchsponsorsdel);
}
if(style == 0.1){
	if(window.location.href.indexOf("comoc.php") > -1)
		{
		document.body.innerHTML = document.body.innerHTML.replace('<table width="100%" border="0" align="center" cellpadding="40" cellspacing="0">','<div id="ponography"><table>');
		document.body.innerHTML = document.body.innerHTML.replace('<table width="600" border="0" align="center" cellpadding="0" cellspacing="0">','</div><table width="600" border="0" align="center" cellpadding="0" cellspacing="0">');
		var ponographydel = document.getElementById("ponography");
		ponographydel.parentNode.removeChild(ponographydel);
		}
	else
		{
        window.location.href="comoc.php";
        }
}
if(style == 0.2){
	document.body.innerHTML = document.body.innerHTML.replace('background="images/bannerframeX2.png"','id="banner"');
	document.body.innerHTML = document.body.innerHTML.replace('td width="189" bgcolor="c6c6c6" valign="top"','td id="sponsor"');
    var bannerdel = document.getElementById("banner");
    var sponsordel = document.getElementById("sponsor");
    bannerdel.parentNode.removeChild(bannerdel);
    sponsordel.parentNode.removeChild(sponsordel);
    document.body.innerHTML = document.body.innerHTML.replace('width="1660" height="110"','width="1660" height="13"');
    document.body.innerHTML = document.body.innerHTML.replace('width="208" height="100%"','width="13" height="100%" bgcolor="c6c6c6"');
	for (var i=0;i<2;i++)
    {
	    document.body.innerHTML = document.body.innerHTML.replace('table width="454" height="100%"','table width="566" height="100%"');
	    document.body.innerHTML = document.body.innerHTML.replace('<img src="images/merchandise.png" alt=""><br>','<div id="merch"><img src="images/merchandise.png" alt=""><br>');
    	var merchdel = document.getElementById("merch");
    	merchdel.parentNode.removeChild(merchdel);
    }
	
}
if(style == 0.3){
	var blockingdel = document.getElementById("stopblocking");
	var logodel = document.getElementById("mspalogo");
	blockingdel.parentNode.removeChild(blockingdel);
	logodel.parentNode.removeChild(logodel);
}