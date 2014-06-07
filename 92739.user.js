// ==UserScript==
// @name           Epuls.pl Emotikony
// @author		   Cinasek
// @namespace      Epuls.pl Emotikony
// @description    Epuls.pl Emotikony
// @include        http://www.forum.toproste.pl/n*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var $j = jQuery.noConflict();

$j('.panel:first div:first-child .fieldset:last').html('<legend>Emotikony by Wiceps</legend><div id="wic" style="padding: 3px;">');
//$j('#wic');

var emoty = [
		'http://img2.epuls.pl/images/smilies/icon_smile.gif',
		'http://img2.epuls.pl/images/smilies/icon_wink.gif',
		'http://img2.epuls.pl/images/smilies/icon_lol.gif',
		'http://img2.epuls.pl/images/smilies/icon_horny.gif',
		'ttp://img2.epuls.pl/images/smilies/icon_insomnia.gif',
		'http://img2.epuls.pl/images/smilies/icon_peace.gif',
		'http://img2.epuls.pl/images/smilies/icon_divided.gif',
		'http://img2.epuls.pl/images/smilies/icon_giggle.gif',
		'http://img2.epuls.pl/images/smilies/icon_phew.gif',
		'http://img2.epuls.pl/images/smilies/icon_whistle.gif',
		'http://img2.epuls.pl/images/smilies/icon_whip.gif',
		'http://img2.epuls.pl/images/smilies/icon_poke.gif',
		'http://img2.epuls.pl/images/smilies/icon_pray.gif',
		'http://img2.epuls.pl/images/smilies/icon_sex2.gif',
		'http://img2.epuls.pl/images/smilies/icon_weed.gif',
		'http://img2.epuls.pl/images/smilies/icon_hehe.gif',
		'http://img2.epuls.pl/images/smilies/icon_finger2.gif',
		'http://img2.epuls.pl/images/smilies/icon_finger.gif',
		'http://img2.epuls.pl/images/smilies/icon_dollar.gif',
		'http://img2.epuls.pl/images/smilies/icon_stress.gif',
		'http://img2.epuls.pl/images/smilies/icon_divine.gif',	
		'http://img2.epuls.pl/images/smilies/icon_cheers.gif',
		'http://img2.epuls.pl/images/smilies/icon_cheek.gif',
		'http://img2.epuls.pl/images/smilies/icon_crown.gif'
];

$j(emoty).each(function(i,v){
	$j('#wic').append('<img src='+v+'>');
});

$j('#wic > img').live('click', function(){
	//alert(this.src);
	$j('#vB_Editor_001_textarea').val($j('#vB_Editor_001_textarea').val()+'[img]'+this.src+'[/img]');

