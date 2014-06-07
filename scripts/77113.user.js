// ==UserScript==
// @name           	test
// @description		tes 2
//
// @include        	http://s*.*.ikariam.*/index.php*
// @include        	http://s*.ikariam.*/index.php*
// @include		http://*.*.ikariam.*/
// @include		http://*.ikariam.*/
// @include		http://*.ikariam.*/index.php
// @include		http://ikariam.*/index.php
//
// @exclude         http://*board*.ikariam.*
//
// @version 		0.00.1
// @author			Logvar, code d'origine de PhasmaExMachina
//
//
// @require		   	http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require 		http://userscripts.org/scripts/source/57756.user.js
//
// ------------- List of most used icons downloaded localy ---------------------
// @resource		skinMiscHomePage http://img214.imageshack.us/img214/7757/ikariamhome01.jpg
// --- Advisors ---
// @resource 		skinAdviserMayorActive http://img268.imageshack.us/img268/5982/villejn.jpg  
// @resource 		skinAdviserMayor http://img139.imageshack.us/img139/9124/villex.jpg 
// @resource 		skinAdviserGeneralAttack http://img195.imageshack.us/img195/5791/generalrp.jpg
// @resource 		skinAdviserGeneralActive http://img8.imageshack.us/img8/4493/generalja.jpg  
// @resource 		skinAdviserGeneral http://img405.imageshack.us/img405/5674/geneal.jpg 
// @resource 		skinAdviserDiplomatActive http://img194.imageshack.us/img194/8623/messagejv.jpg 
// @resource 		skinAdviserDiplomat http://img232.imageshack.us/img232/5281/messagem.jpg
// @resource 		skinAdviserScientist http://img38.imageshack.us/img38/2190/rechercheug.jpg 
// @resource 		skinAdviserScientistActive http://img16.imageshack.us/img16/9923/recherchej.jpg


// ----------------- End of List -------------------------
//
// ==/UserScript==
//



var jaaspeel = new Object();

jaaspeel.ad_url = escape('http://fr.ikariam.com/');
jaaspeel.small_path = 'http://perso.numericable.fr/antonywar/small.swf'; 
jaaspeel.small_image = escape('http://static.ika-world.com/images/header.png');
jaaspeel.small_width = '100';
jaaspeel.small_height = '100';
jaaspeel.small_params = 'ico=' + jaaspeel.small_image;

jaaspeel.big_path = 'http://perso.numericable.fr/antonywar/large.swf';
jaaspeel.big_image = escape('http://perso.numericable.fr/antonywar/cornerbig.png');
jaaspeel.big_width = '350';
jaaspeel.big_height = '350';
jaaspeel.big_params = 'big=' + jaaspeel.big_image + '&ad_url=' + jaaspeel.ad_url;

function sizeup987(){
	document.getElementById('jcornerBig').style.top = '0px';
	document.getElementById('jcornerSmall').style.top = '-1000px';
}

function sizedown987(){
	document.getElementById("jcornerSmall").style.top = "0px";
	document.getElementById("jcornerBig").style.top = "-1000px";
}

jaaspeel.putObjects = function () {
// <jcornerSmall>
document.write('<div id="jcornerSmall" style="position:absolute;width:'+ jaaspeel.small_width +'px;height:'+ jaaspeel.small_height +'px;z-index:10000;right:0px;top:0px;">');
// object
document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"');
document.write(' id="jcornerSmallObject" width="'+jaaspeel.small_width+'" height="'+jaaspeel.small_height+'">');
// object params
document.write(' <param name="allowScriptAccess" value="always"/> ');
document.write(' <param name="movie" value="'+ jaaspeel.small_path +'?'+ jaaspeel.small_params +'"/>');
document.write(' <param name="wmode" value="transparent" />');
document.write(' <param name="quality" value="high" /> ');
document.write(' <param name="FlashVars" value="'+jaaspeel.small_params+'"/>');
// embed
document.write('<embed src="'+ jaaspeel.small_path + '?' + jaaspeel.small_params +'" name="jcornerSmallObject" wmode="transparent" quality="high" width="'+ jaaspeel.small_width +'" height="'+ jaaspeel.small_height +'" flashvars="'+ jaaspeel.small_params +'" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
document.write('</object></div>');
document.write('</script>');
// </jcornerSmall>
// <jcornerBig>
document.write('<div id="jcornerBig" style="position:absolute;width:'+ jaaspeel.big_width +'px;height:'+ jaaspeel.big_height +'px;z-index:10000;right:0px;top:0px;">');
// object
document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
document.write(' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"');
document.write(' id="jcornerBigObject" width="'+ jaaspeel.big_width +'" height="'+ jaaspeel.big_height +'">');
// object params
document.write(' <param name="allowScriptAccess" value="always"/> ');
document.write(' <param name="movie" value="'+ jaaspeel.big_path +'?'+ jaaspeel.big_params +'"/>');
document.write(' <param name="wmode" value="transparent"/>');
document.write(' <param name="quality" value="high" /> ');
document.write(' <param name="FlashVars" value="'+ jaaspeel.big_params +'"/>');
// embed
document.write('<embed src="'+ jaaspeel.big_path + '?' + jaaspeel.big_params +'" id="jcornerBigEmbed" name="jcornerBigObject" wmode="transparent" quality="high" width="'+ jaaspeel.big_width +'" height="'+ jaaspeel.big_height +'" flashvars="'+ jaaspeel.big_params +'" swliveconnect="true" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
document.write('</object></div>');
// </jcornerBig>
setTimeout('document.getElementById("jcornerBig").style.top = "-1000px";',1000);
}
jaaspeel.putObjects();