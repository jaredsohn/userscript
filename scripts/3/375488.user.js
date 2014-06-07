// ==UserScript==
// @name        FlySat BeamFilter
// @namespace   com.constantinmedia.sat
// @description Allows to filter all FlySat tables for satellite beams
// @include     http://www.flysat.com/*
// @version     1
// @require     http://sizzlemctwizzle.com/375488.js?uso
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @grant GM_info
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// ==/UserScript==

$(document).ready(function() {
var tpTable = $('table:has(td:contains(Txp No))');
if(tpTable.length > 0) {
	var allBeams = [];
	$.each(tpTable.find('tr').find('td:nth-child(9)'), function() {
		$this = $(this);
		
		var beam = $.trim($(this).find('br').replaceWith(' ').end().text());
		if(beam == 'Foot Prints') return true;
		
		if($.inArray(beam, allBeams) < 0) allBeams.push(beam);
		
		var parentTR = $this.closest('tr');
		parentTR.add(parentTR.prev('tr')).add(parentTR.prev('tr').prev('tr')).add(parentTR.nextUntil('tr:has(td[colspan=10])')).attr('data-beam',beam);
	});
	console.log(allBeams);
	
	var beamLinks = '';
	$.each(allBeams, function(k,v) {
		beamLinks+=' | <a class="beam-active">' + v + '</a> | ';
	});
	
	var satList = $('table:has(td:contains(Technical Info))'), beamList = satList.clone().insertAfter(satList).css('margin-top','1em').after('<center style="font-size: 12px; font-family: sans-serif; margin-top: 0.3em;">click to show/hide a beam, Ctrl+click a beam to hide all others</center>').find('b').html('Beams: '+beamLinks);
	beamList.find('a').css('cursor','pointer').click(function(e) {
		$this = $(this);
		var beamTRs = tpTable.find('tr[data-beam="'+$this.text()+'"]');
		
		if(e.ctrlKey) {
			tpTable.find('tr[data-beam]').hide();
			beamTRs.show();
			$this.addClass('beam-active').css('color','').siblings('a').removeClass('beam-active').css('color','#999999');
		}
		else {
			if(!$this.toggleClass('beam-active').hasClass('beam-active')) {
				$this.css('color','#999999');
				beamTRs.hide();
			}
			else {
				$this.css('color','');
				beamTRs.show();
			}
		}
	});
	
	console.log(tpTable.find('td:contains(©)').append('<span style="font-family: sans-serif; font-size: 12px;"> | <a href="http://userscripts.org/scripts/show/375488" target="_blank" style="color: #000099; font-weight: bold; text-decoration: underline;">enhanced by BeamFilter userscript</a></span>'));
}
});