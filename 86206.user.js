// ==UserScript==
// @name           Emotikony kurwha xd
// @author		   Devil Murder
// @include        http://www.forum.toproste.pl*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var $j = jQuery.noConflict();



var add = 
'<fieldset title="Emotikony"><legend>Emotikony</legend>'+
	'<table cellpadding="4" cellspacing="0" border="0" align="center">'+
		'<tr align="center" valign="bottom">'+
			'<td><img src="http://i53.tinypic.com/25pkb3a.jpg" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://i56.tinypic.com/34dqzhe.jpg" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://i51.tinypic.com/oqbpqh.jpg" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
		'<tr align="center" valign="bottom">'+
			'<td><img src="http://img543.imageshack.us/img543/6641/lola9d.jpg" width="50" height="50" border="0"  class="inlineimg komixx" /></td>'+
			'<td><img src="http://img52.imageshack.us/img52/5766/72503917.jpg" width="50" height="50" border="0"  class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
			'<tr align="center" valign="bottom">'+
			'<td><img src="http://img690.imageshack.us/img690/8738/fuckyeaou.jpg" width="50" height="50" border="0"  class="inlineimg komixx" /></td>'+
			'<td><img src="http://img819.imageshack.us/img819/1384/lolgn.jpg" width="50" height="50" border="0"  class="inlineimg komixx" /></td>'+
			
			
						
		'</tr>'+
		
	'</table>'+
'</fieldset>';
	

$j('.controlbar:last').append(add);

$j('.komixx').click(function(){
	$j('#vB_Editor_001_textarea').val($j('#vB_Editor_001_textarea').val()+'[img]'+this.src+'[/img]');
});