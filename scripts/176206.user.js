// ==UserScript==
// @name		eRepublik Tank Rating
// @version		0.1.2
// @author		Spetsnaz
// @copyright		2013+, Spetsnaz
// @namespace		erepublik_tank_rating
// @description		Shows you the eRepublik tank rating on a profile
// @homepageURL		http://userscripts.org/users/spetsnaz
// @downloadURL		http://userscripts.org/scripts/source/176206.user.js
// @updateURL		http://userscripts.org/scripts/source/176206.meta.js
// @require		http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @include		/^https?:\/\/www\.erepublik\.com\/[a-z]{2,2}\/citizen\/profile\/[0-9]+\/?$/
// @grant		none
// ==/UserScript==
var $jq = jQuery.noConflict();
$jq(window).load(function(){
	var pXP, paXP, pStr, pTI, pHTML, strS, strT, aCUrl, cLang;
	paXP = $jq('div.citizen_experience div p:eq(0)').text().split('/');
	pXP = parseFloat(paXP[0].trim().replace(/,/g, ''));
	pStr = parseFloat($jq('div.citizen_military h4:eq(0)').text().trim().replace(/,/g, ''));
	pTI = (pXP/pStr).toFixed(2);
	aCUrl = $jq(location).attr('pathname').split('/');
	cLang = aCUrl[1];
	
	//Language strings
	//If you want to translate them into your language please send me a message with the translated sentences and which language is it (en, es, etc).
	switch(cLang){
		case 'es'://Spanish
			strS = 'Indicador de Tanqueo';
			strT = 'Mientras m&aacute;s bajo mejor';
		break;
		case 'en'://English
			strS = 'Tank Rating';
			strT = 'The lower the better';
		break;
		default:
			strS = 'Tank Rating';
			strT = 'The lower the better';
	}
	
	pHTML = '\
	<style>\
		#tank_meter {width: 100%; height: 6px; border: solid 1px #e0e0e0; border-radius: 5px; -webkit-border-radius: 5px;}\
		#scale {display: table; width: 100%; padding: 0px 0px 0px 0px; margin: 2px 0px 0px 0px; border: 0px 0px 0px 0px; color: #999; font-weight: bold;}\
		#scale li {width: 10%; display: table-cell; white-space: nowrap; font-size: 8px;}\
	</style>\
	<div class="clear"></div>\
	<div class="citizen_military">\
		<strong>'+strS+'</strong>\
		<h4 style="margin-left:40px">'+pTI+'</h4>\
		<div class="stat">\
			<div style="width: 162px;">\
			<meter id="tank_meter" min=0 low=2 high=4 max=5 optimum=-1 value='+pTI+' title="'+strT+'"></meter>\
				<ul id="scale">\
					<li><span id="scale">0</span></li>\
					<li><span id="scale">1</span></li>\
					<li><span id="scale">2</span></li>\
					<li><span id="scale">3</span></li>\
					<li><span id="scale">4</span></li>\
				</ul>\
			</div>\
		</div>\
	</div>';
	
	$jq('div.citizen_military:eq(1)').css('margin-bottom','2px').after(pHTML);
})