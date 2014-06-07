// ==UserScript==
// @name           4chan emoticons
// @author		   Wiceps
// @namespace      4chanemoticons
// @description    4chan emoticons
// @include        http://www.forum.toproste.pl*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var $j = jQuery.noConflict();



var add = 
'<fieldset title="Komixx Emotikony"><legend>4chan emoticons</legend>'+
	'<table cellpadding="4" cellspacing="0" border="0" align="center">'+
		'<tr align="center" valign="bottom">'+
			'<td><img src="http://i55.tinypic.com/2i87nus.jpg" border="0" class="inlineimg komixx" /></td>'+
		'</tr>'+
		'<tr align="center" valign="bottom">'+
			'<td><img src="http://i53.tinypic.com/25pkb3a.jpg" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://i56.tinypic.com/34dqzhe.jpg" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://i51.tinypic.com/oqbpqh.jpg" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img203.imageshack.us/img203/6097/face1284388481byjottost.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img704.imageshack.us/img704/2603/face1284388393bymatrix1.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img337.imageshack.us/img337/423/face1284295152byszymek1.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img707.imageshack.us/img707/9397/face1284053282bykubsone.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img338.imageshack.us/img338/8095/face1283960698bygutekgo.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img215.imageshack.us/img215/3918/face1283802673bycysiu69.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img816.imageshack.us/img816/8812/face1283509271bytabokth.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img816.imageshack.us/img816/6223/face1283009154bytabokth.jpg" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img812.imageshack.us/img812/5639/face1282902183bytabokth.png" border="0" class="inlineimg komixx" /></td>'+
		'</tr>'+
	'</table>'+
'</fieldset>';
	

$j('.controlbar:last').append(add);

$j('.komixx').click(function(){
	$j('#vB_Editor_001_textarea').val($j('#vB_Editor_001_textarea').val()+'[img]'+this.src+'[/img]');
});