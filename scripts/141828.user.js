//
// ==UserScript==
// @name          HWM cyfral strength
// @description   cyfral strength
// @version       0.03
// @include       http://www.heroeswm.ru/home.php
// @include       http://www.heroeswm.ru/pl_info.php?*
// @include       http://www.heroeswm.ru/inventory.php
// @include       http://www.lordswm.com/home.php
// @include       http://www.lordswm.com/pl_info.php?*
// @include       http://www.lordswm.com/inventory.php
// ==/UserScript==


var url = 'http://www.heroeswm.ru/' ;
var url_cur = location.href ;
var item_hard_regexp = /: (\d+)\/(\d+)/
var item_name_regexp = /uid=(\d+)/
var item_id_regexp = /pull_off=(\d+)/

var colors = { 'full':     { 'background': '#008000', 'color': '#FFFFFF', 'border': '#000000'}, 
	       'slightly': { 'background': '#0000FF', 'color': '#FFFFFF', 'border': '#000000'}, 
	       'used':     { 'background': '#FFFF00', 'color': '#000000', 'border': '#000000'}, 
	       'worn':     { 'background': '#FF0000', 'color': '#FFFFFF', 'border': '#000000'}, 
	       'broken':   { 'background': '#000000', 'color': '#FFFFFF', 'border': '#000000'} };

//	       'worn':     { 'background': '#FFCCCC', 'color': '#000000', 'border': '#000000'}, 
//	       'broken':   { 'background': '#FF0000', 'color': '#FFFFFF', 'border': '#FFFFFF'} };
//#eecd59

var newStyle = document.createElement('style');
newStyle.type = 'text/css';
newStyle.innerHTML = '' +
'.subnav ul {z-index:100;}';
document.getElementsByTagName('head')[0].appendChild(newStyle);

if( url_cur == 'http://www.heroeswm.ru/inventory.php' || url_cur == 'http://www.lordswm.com/inventory.php' )
{
    for (var loop = 0; loop < 2; loop++) {
	if (loop == 1) {
		var els = getI( "//img[contains(@src, 'i/transparent.gif')]" ) ;
	} else {
		var els = getI( "//img[contains(@src, 'i/artifacts/')]" ) ;
	}
	var elo = '' ;
	for( var i = 0; i < els.snapshotLength; i++ )
	{
		var el = els.snapshotItem(i);
		an = item_id_regexp.exec( el.href ) ;
		if( an )
		{
			if( elo == an[1])
				continue
			else
				elo = an[1]
		}
		if (el.previousSibling || el.parentNode.previousSibling || el.parentNode.parentNode.previousSibling || (loop > 0 && el.parentNode.parentNode.parentNode.previousSibling)) {
			continue;
		}
		p = item_hard_regexp.exec( el.parentNode.innerHTML ) ;
		if (p) {
		d = document.createElement( 'div' );
		d.innerHTML = p[1] ;
		if (p[1] == p[2]) {
			status = 'full';
		} else if (p[1] == 0) {
			status = 'broken';
		} else if (p[1] / p[2] >= 0.5) {
			status = 'slightly';
		} else if (p[1] / p[2] >= 0.25) {
			status = 'used';
		} else {
			status = 'worn';
		}
		d.style.fontSize = '9px' ;
		d.style.padding = '0px 1px' ;
		d.style.border = '1px solid ' + colors[status]['border'] ;
		d.style.margin = '2px' ;
		d.style.color = colors[status]['color'] ;
		d.style.background = colors[status]['background'] ;
		d.style.position = 'absolute' ;
		el.parentNode.insertBefore( d , el ) ;
		}
	}
    }
    if (unsafeWindow.arts_fud) {
      var length = unsafeWindow.arts_fud.length;
      for (i = 0; i < length; i++) {
  	  var p = item_hard_regexp.exec( unsafeWindow.arts_fd_none[i] ) ;
	  if (p[1] == p[2]) {
		  status = 'full';
	  } else if (p[1] == 0) {
		  status = 'broken';
	  } else if (p[1] / p[2] >= 0.5) {
		  status = 'slightly';
	  } else if (p[1] / p[2] >= 0.25) {
		  status = 'used';
	  } else {
		  status = 'worn';
	  }
	  var str = '<div style="font-size: 9px; padding: 0px 1px; border: 1px solid rgb(' + parseInt(colors[status]['border'].substr(1, 2), 16) + ', ' + parseInt(colors[status]['border'].substr(3, 2), 16) + ', ' + parseInt(colors[status]['border'].substr(5, 2), 16) + '); margin: 2px; color: rgb(' + parseInt(colors[status]['color'].substr(1, 2), 16) + ', ' + parseInt(colors[status]['color'].substr(3, 2), 16) + ', ' + parseInt(colors[status]['color'].substr(5, 2), 16) + '); background: none repeat scroll 0% 0% rgb(' + parseInt(colors[status]['background'].substr(1, 2), 16) + ', ' + parseInt(colors[status]['background'].substr(3, 2), 16) + ', ' + parseInt(colors[status]['background'].substr(5, 2), 16) + '); position: absolute;">' + p[1] + '</div>';
	  if (unsafeWindow.arts_fud[i]) unsafeWindow.arts_fud[i] = str + unsafeWindow.arts_fud[i];
	  if (unsafeWindow.arts_fd_ok[i]) unsafeWindow.arts_fd_ok[i] = str + unsafeWindow.arts_fd_ok[i];
	  if (unsafeWindow.arts_fd_none[i]) unsafeWindow.arts_fd_none[i] = str + unsafeWindow.arts_fd_none[i];
      }
    }
//
//unsafeWindow.arts_fud[0] = "<table border=0 cellpadding=0 cellspacing=0 background='i/artifacts/mif_hhelmet_s.jpg'><tr><td colspan=5><a href='#' onClick='javascript: try_undress(3612647); return false;'><img title='Heavy mithril coif [D7A7F7] &nbsp;Defence: &nbsp;+4 &nbsp;Durability: 12/70' border=0 src='i/transparent.gif' width=50 height=40></a></td></tr><tr><td><a href='#' onClick='javascript: try_undress(3612647); return false;'><img src='i/transparent.gif' border=0 width='10' height='10' title='Heavy mithril coif [D7A7F7] &nbsp;Defence: &nbsp;+4 &nbsp;Durability: 12/70'></a></td><td><a href='#' onClick='javascript: try_undress(3612647); return false;'><img src='i/transparent.gif' border=0 width='10' height='10' title='Heavy mithril coif [D7A7F7] &nbsp;Defence: &nbsp;+4 &nbsp;Durability: 12/70'></a></td><td><a href='#' onClick='javascript: try_undress(3612647); return false;'><img src='i/mods/armor/D3.gif' border=0 width='10' height='10' title='Decrease attack of charging stack 7%'></a></td><td><a href='#' onClick='javascript: try_undress(3612647); return false;'><img src='i/mods/armor/A7.gif' border=0 width='10' height='10' title='Air magic shield 14%'></a></td><td><a href='#' onClick='javascript: try_undress(3612647); return false;'><img src='i/mods/armor/F7.gif' border=0 width='10' height='10' title='Fire magic shield 14%'></a></td></tr></table>";
//unsafeWindow.arts_fd_ok[0] = "<table border=0 cellpadding=0 cellspacing=0 background='i/artifacts/mif_hhelmet_s.jpg'><tr><td colspan=5><a href='#' onClick='javascript: try_dress(3612647); return false;'><img title='Heavy mithril coif [D7A7F7] &nbsp;Defence: &nbsp;+4 &nbsp;Durability: 12/70' border=0 src='i/transparent.gif' width=50 height=40></a></td></tr><tr><td><a href='#' onClick='javascript: try_dress(3612647); return false;'><img src='i/transparent.gif' border=0 width='10' height='10' title='Heavy mithril coif [D7A7F7] &nbsp;Defence: &nbsp;+4 &nbsp;Durability: 12/70'></a></td><td><a href='#' onClick='javascript: try_dress(3612647); return false;'><img src='i/transparent.gif' border=0 width='10' height='10' title='Heavy mithril coif [D7A7F7] &nbsp;Defence: &nbsp;+4 &nbsp;Durability: 12/70'></a></td><td><a href='#' onClick='javascript: try_dress(3612647); return false;'><img src='i/mods/armor/D3.gif' border=0 width='10' height='10' title='Decrease attack of charging stack 7%'></a></td><td><a href='#' onClick='javascript: try_dress(3612647); return false;'><img src='i/mods/armor/A7.gif' border=0 width='10' height='10' title='Air magic shield 14%'></a></td><td><a href='#' onClick='javascript: try_dress(3612647); return false;'><img src='i/mods/armor/F7.gif' border=0 width='10' height='10' title='Fire magic shield 14%'></a></td></tr></table>";
//unsafeWindow.arts_fd_none[0] = "<table border=0 cellpadding=0 cellspacing=0 background='i/artifacts/mif_hhelmet_s.jpg'><tr><td colspan=5><img title='Heavy mithril coif [D7A7F7] &nbsp;Defence: &nbsp;+4 &nbsp;Durability: 12/70' border=0 src='i/transparent.gif' width=50 height=40></td></tr><tr><td><img src='i/transparent.gif' border=0 width='10' height='10' title='Heavy mithril coif [D7A7F7] &nbsp;Defence: &nbsp;+4 &nbsp;Durability: 12/70'></td><td><img src='i/transparent.gif' border=0 width='10' height='10' title='Heavy mithril coif [D7A7F7] &nbsp;Defence: &nbsp;+4 &nbsp;Durability: 12/70'></td><td><img src='i/mods/armor/D3.gif' border=0 width='10' height='10' title='Decrease attack of charging stack 7%'></td><td><img src='i/mods/armor/A7.gif' border=0 width='10' height='10' title='Air magic shield 14%'></td><td><img src='i/mods/armor/F7.gif' border=0 width='10' height='10' title='Fire magic shield 14%'></td></tr></table>";
//unsafeWindow.arts_fud[1] = "<a href='#' onClick='javascript: try_undress(4570920); return false;'><img border=0 title='Beastbane helmet &nbsp;Defence: &nbsp;+3 &nbsp;Knowledge: &nbsp;+1 &nbsp;Initiative: &nbsp;+1% &nbsp;Durability: 15/15' src='i/artifacts/sh/sh_helmet_s.jpg' width=50 height=50  ></a>";
//unsafeWindow.arts_fd_ok[1] = "<a href='#' onClick='javascript: try_dress(4570920); return false;'><img border=0 title='Beastbane helmet &nbsp;Defence: &nbsp;+3 &nbsp;Knowledge: &nbsp;+1 &nbsp;Initiative: &nbsp;+1% &nbsp;Durability: 15/15' src='i/artifacts/sh/sh_helmet_s.jpg' width=50 height=50  ></a>";
//unsafeWindow.arts_fd_none[1] = "<img border=0 title='Beastbane helmet &nbsp;Defence: &nbsp;+3 &nbsp;Knowledge: &nbsp;+1 &nbsp;Initiative: &nbsp;+1% &nbsp;Durability: 15/15' src='i/artifacts/sh/sh_helmet_s.jpg' width=50 height=50  >";
} else
{
	var els = getI( "//a[contains(@href, 'art_info.php')]" ) ;
	var elo = '', status ;
	for( var i = 0; i < els.snapshotLength; i++ )
	{
		var el = els.snapshotItem(i);
		an = item_name_regexp.exec( el.href ) ;
		if( an )
		{
			if( elo == an[1] )
				continue
			else
				elo = an[1]
		}
		p = item_hard_regexp.exec( el.parentNode.innerHTML ) ;
		if (p) {
			d = document.createElement( 'div' );
			d.innerHTML = p[1] ;
			if (p[1] == p[2]) {
				status = 'full';
			} else if (p[1] == 0) {
				status = 'broken';
			} else if (p[1] / p[2] >= 0.5) {
				status = 'slightly';
			} else if (p[1] / p[2] >= 0.25) {
				status = 'used';
			} else {
				status = 'worn';
			}
			d.style.fontSize = '9px' ;
			d.style.padding = '0px 1px' ;
			d.style.border = '1px solid ' + colors[status]['border'] ;
			d.style.margin = '2px' ;
			d.style.color = colors[status]['color'] ;
			d.style.background = colors[status]['background'] ;
			d.style.position = 'absolute' ;
			el.parentNode.insertBefore( d , el ) ;
		}
	}
}

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function $( id ) { return document.getElementById( id ); }