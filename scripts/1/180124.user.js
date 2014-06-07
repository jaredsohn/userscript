// ==UserScript==
// @name        IRBulkEdit
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @namespace   tc
// @include     http://tpdb.cxo.name/exec/tpdb/*
// @version     1
// @grant       none
// ==/UserScript==

//alert("Here!");
tcSetAttr("input", "__9", "size", 60);
addLinks();

function tcSetAttr(tag, pattern, attribute, value)
{
	var $ = unsafeWindow.jQuery;					// get access to jQuery()
	var debug = false;
	var selEnd = tag+'[name$="' + pattern + '"]';
	
	if(debug) {
		alert("selEnd: " + selEnd + "\r" + $(selEnd).attr("id") + ": " + $(selEnd).val());
	}
	$(selEnd).attr(attribute, value);
}

function addLinks()
{
//		http://generator.cxo.name/exec/inputmask.pl?sid=3a5f49dc1d60fc614f7215a3974f1229&bart_id=4&justopened=1&id=21690403&dad=1&state=view&Sprache=2&mode=main#$
	$( "tr:gt(2)" ).each(function( index ) {
//		$( this ).find( "td:eq(0)" ).css( "color", "red" );
		var id = $( this ).find( "td:eq(0)" ).html();
		var isId = /^\d+$/;

		if(isId.test(id)) {
			var lnk = id.link(
							"/exec/inputmask.pl" + window.location.search					//	?sid=" + sid 
							+ "&bart_id=4&justopened=1&id=" + id
							+ "&dad=1&state=view&Sprache=2&mode=main#$"
			);
//			alert(lnk);
			$( this ).find( "td:eq(0)" ).html(lnk);			// replace the ID text with a link
			$( this ).find( "a" ).attr("target","_blank");	// make the link open in a new tab
		}
/*
*/
		$( this ).find( "td:eq(1)" ).css( "font-size", "10px" );
		$( this ).find( "td:eq(3)" ).css( "font-size", "12px" );
		$( this ).find( "td:eq(4)" ).css( "font-size", "12px" );
	});
}


// console: $('input[name$="__9"]').attr('width',"300px")
// $('input[name$="__9"]').attr('width',"300px").attr("size",60)
//$('input[name$="__9"]').attr('width',"300px").attr("size",60)