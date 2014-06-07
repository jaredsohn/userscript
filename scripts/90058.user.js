// ==UserScript==
// @name           Lubie kosy mame
// @author		   Devil Murder
// @include        http://www.forum.steamots.pl*
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
			'<td><img src="http://img826.imageshack.us/img826/9526/platkorzercaa.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
		'<tr align="center" valign="bottom">'+
			'<td><img src="http://img835.imageshack.us/img835/7929/tfua.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img203.imageshack.us/img203/9520/alea.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img209.imageshack.us/img209/56/dresa.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img222.imageshack.us/img222/5585/facepalma.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
		
		'<tr align="center" valign="bottom">'+
			'<td><img src="http://img219.imageshack.us/img219/8694/fuckyeaa.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img222.imageshack.us/img222/670/fuua.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img830.imageshack.us/img830/9582/ideaa.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
		'<tr align="center" valign="bottom">'+
			'<td><img src="http://img230.imageshack.us/img230/236/angryc.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img155.imageshack.us/img155/8545/ayfkmc.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img99.imageshack.us/img99/1525/bobrfacec.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
				'<tr align="center" valign="bottom">'+
			'<td><img src="http://img177.imageshack.us/img177/9358/coolc.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img252.imageshack.us/img252/5923/cryingc.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img408.imageshack.us/img408/5219/facelampc.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
				'<tr align="center" valign="bottom">'+
			'<td><img src="http://img842.imageshack.us/img842/3830/facepalmcu.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img299.imageshack.us/img299/7333/failcm.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img209.imageshack.us/img209/4967/fuckyeac.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
				'<tr align="center" valign="bottom">'+
			'<td><img src="http://img840.imageshack.us/img840/1503/fuu2c.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img137.imageshack.us/img137/2699/fuuc.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img830.imageshack.us/img830/2863/happyfacec.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
				'<tr align="center" valign="bottom">'+
			'<td><img src="http://img375.imageshack.us/img375/5809/hmmck.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img153.imageshack.us/img153/3146/hyperragemanc.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img707.imageshack.us/img707/83/ideact.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
				'<tr align="center" valign="bottom">'+
			'<td><img src="http://img524.imageshack.us/img524/8832/kujonc.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img59.imageshack.us/img59/7131/kurrrrc.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img230.imageshack.us/img230/8195/lolfacec.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
				'<tr align="center" valign="bottom">'+
			'<td><img src="http://img87.imageshack.us/img87/11/megafacepalmc.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img176.imageshack.us/img176/4419/nervousc.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img689.imageshack.us/img689/9955/niewinnyc.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
				'<tr align="center" valign="bottom">'+
			'<td><img src="http://img89.imageshack.us/img89/8630/ojciecc.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img844.imageshack.us/img844/3268/pokerfacec.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img218.imageshack.us/img218/705/ragecatc.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
						'<tr align="center" valign="bottom">'+
			'<td><img src="http://img440.imageshack.us/img440/5914/screwyouc.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img340.imageshack.us/img340/3200/synekc.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img89.imageshack.us/img89/4876/trollfacec.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
						'<tr align="center" valign="bottom">'+
			'<td><img src="http://img704.imageshack.us/img704/4084/uczen2c.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img221.imageshack.us/img221/5033/weec.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img827.imageshack.us/img827/3852/wowcc.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
			'<tr align="center" valign="bottom">'+
			'<td><img src="http://img844.imageshack.us/img844/6877/wtfcv.png" border="0" class="inlineimg komixx" /></td>'+
			'<td><img src="http://img219.imageshack.us/img219/8866/zalamkac.png" border="0" class="inlineimg komixx" /></td>'+
			
			'<td><img src="http://img831.imageshack.us/img831/6553/alec.png" border="0" class="inlineimg komixx" /></td>'+
			
		'</tr>'+
		
		
					'<tr align="center" valign="bottom">'+
			'<td><img src="http://img202.imageshack.us/img202/9321/aaacy.png" border="0" class="inlineimg komixx" /></td>'+
			
			
		'</tr>'+

		
	'</table>'+
'</fieldset>';
	

$j('.controlbar:last').append(add);

$j('.komixx').click(function(){
	$j('#vB_Editor_001_textarea').val($j('#vB_Editor_001_textarea').val()+'[img]'+this.src+'[/img]');
});

