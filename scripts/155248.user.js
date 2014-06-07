// ==UserScript==
// @name        Kra v6 - Compact (stats)
// @namespace    
// @include     http://www.kraland.org/main.php*
// @version     0.601
// @UpdateVersion 14
// @downloadURL http://userscripts.org/scripts/source/155248.user.js
// @updateURL   http://userscripts.org.nyud.net/scripts/source/155248.meta.js
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @icon		http://www.kramages.org/2/star.gif
// @grant       GM_addStyle
// ==/UserScript==

if(jQuery.type(jQuery('li.on').find('a').html()) != "undefined"){
	lien_portrait = jQuery('.left-box').first().find('.table-counters').find('a').first();
	portrait = jQuery(lien_portrait).find('img');
	lien_pa = jQuery('.left-box').first().find('tr').first().find('td').last().find('a');
	lien_pdv = jQuery('.left-box').first().find('tr').first().next().find('a');
	nat = jQuery('.left-box').first().find('tr').last().find('img').first();
	sex = jQuery('.left-box').first().find('tr').last().find('img').first().next();
	fk = jQuery('.left-box').first().find('tr').last().find('td').last().text();
	
	jQuery('.left-box').first().find('.table-counters').remove();
	jQuery('.left-box').first().attr('id','sidebar-persoV6');
	
	jQuery('#sidebar-persoV6').append(lien_portrait);
	jQuery(lien_portrait).attr('id','sidebar-lien-portrait');

	jQuery('#sidebar-persoV6').append(lien_pa);
	jQuery(lien_pa).append(' PA');
	
	jQuery('#sidebar-persoV6').append(lien_pdv);
	jQuery(lien_pdv).append(' Pdv');
	
	lien_fk = document.createElement('a');
	jQuery(lien_fk).html(fk);
	jQuery(lien_fk).attr('href','http://www.kraland.org/order.php?p1=1100');
	jQuery(lien_fk).attr('onclick',"javascript:OpenOrder('1100','0','0');return false;");
	jQuery(lien_fk).append(' FK');

	span_nat = document.createElement('span');
	jQuery(span_nat).attr('class','bulle');
	span_sex = jQuery(span_nat).clone();
	span_fk = jQuery(span_nat).clone();
	jQuery(span_fk).attr('class','sidebar-persoV6-span');
	span_pdv = jQuery(span_fk).clone();
	span_pa = jQuery(span_fk).clone();
	
	jQuery(span_nat).attr('id','bulle2');
	jQuery(span_sex).append(sex);
	jQuery(span_fk).append(lien_fk);
	jQuery(span_pdv).append(lien_pdv);
	jQuery(span_pa).append(lien_pa);
	
	div = document.createElement('div');
	jQuery(div).attr('id','sidebar-persoV6-div');
	
	jQuery('#sidebar-persoV6').append(span_nat);
	jQuery('#sidebar-persoV6').append(span_sex);
	jQuery(div).append(span_pdv);
	jQuery(div).append(span_fk);
	jQuery(div).append(span_pa);

	jQuery('#sidebar-persoV6').append(div);
	
	GM_addStyle("#left .left-box {background:none;border:none;width:125px;box-shadow:none}");
	GM_addStyle("#sidebar-persoV6 {height:80px;margin-bottom:5px;padding:0!important;position:relative;font-size:10px;}");
	GM_addStyle("#sidebar-lien-portrait {position:absolute;z-index:2}");
	GM_addStyle("#sidebar-lien-portrait img {box-shadow:1px 1px 15px gray;width:80px;height:80px;border-radius:50%;border:2px solid rgb(68,68,68);}");
	GM_addStyle("#sidebar-persoV6-div {position:absolute;top:5px;width:60%;text-align:right;position:absolute;right:0;font-size:10px}");
	GM_addStyle(".sidebar-persoV6-span {background:rgb(230,230,230);border:1px solid rgb(68,68,68)}");
	GM_addStyle(".sidebar-persoV6-span {border-radius:5px;display:block;line-height:12px;padding:0;padding-right:2px;}");
	GM_addStyle("#sidebar-persoV6-div:hover {z-index:5}");
	GM_addStyle(".bulle {height:15px;width:15px;z-index:5;display:block;position:absolute;border:2px solid rgb(68,68,68);background:rgb(230,230,230);padding:2px;border-radius:50%}");
	GM_addStyle(".bulle {left:-5px;top:5px}");
	GM_addStyle("#bulle2 {top:50px;padding:3px;background:url("+jQuery(nat).attr('src')+")center no-repeat rgb(230,230,230) }");
}