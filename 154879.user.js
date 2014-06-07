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

var newStyle = document.createElement('style');
newStyle.type = 'text/css';
newStyle.innerHTML = '' +
'div[id^="slot"]{'
   +'overflow: hidden;'
   +'width: 50px;'
   +'height: 50px;'
   +'margin: 0;'
   +'padding: 0;'
+'}'
+'div[id^="slot"] img {'
   +'display: block;'
+'}'
+'div[id^="slot"] a img {'
   +'-webkit-transition: all 0.2s linear;'
   +'-moz-transition: all 0.2s linear;'
   +'-o-transition: all 0.2s linear;'
   +'-ms-transition: all 0.2s linear;'
   +'transition: all 0.2s linear;'
+'}'
+'div[id^="slot"]:hover a img {'
   +'-webkit-transform: scale(1.1,1.1);'
   +'-moz-transform: scale(1.1,1.1);'
   +'-o-transform: scale(1.1,1.1);'
   +'-ms-transform: scale(1.1,1.1);'
   +'transform: scale(1.1,1.1);'
   +'opacity:0.9;'
+'}'
+'div[id^="slot"] a{'
   +'text-decoration: none;'
+'}'
+'.cyfral_bar_wrap {'
        +'width:15px; '
        +'margin:-1px 0 0 -1px;'
        +'border:1px solid #BCA071;'
        +'position: absolute;'
        +'background-color: #65541B;'
        +'-webkit-box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.53);'
        +'-moz-box-shadow:    1px 1px 1px rgba(0, 0, 0, 0.53);'
        +'box-shadow:         1px 1px 1px rgba(0, 0, 0, 0.53);'
        +'background-image: -moz-linear-gradient(#65541B, #8C7526 50%, #65541B);'
        +'z-index: 1;'
        +'text-decoration: none !important;'
        +'}'
    +'.progress_bar {'
        +'height: 15px;'
        +'z-index: 1;'
        +'float: left;'
        +'text-decoration: none !important;'
        +'background-color: #8C7526;'
        +'-moz-box-shadow: inset 0 0 1px #ddd;'
        +'background-image: -moz-linear-gradient(#E1E266 10%, #74611f 30%, #74611f 71%, #848738 90%);'
        +'background: #4c4c4c;'
        +'background: -moz-linear-gradient(top,  #4c4c4c 0%, #595959 12%, #666666 25%, #474747 39%, #2c2c2c 50%, #000000 51%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%);'
        +'background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#4c4c4c), color-stop(12%,#595959), color-stop(25%,#666666), color-stop(39%,#474747), color-stop(50%,#2c2c2c), color-stop(51%,#000000), color-stop(60%,#111111), color-stop(76%,#2b2b2b), color-stop(91%,#1c1c1c), color-stop(100%,#131313));'
        +'background: -webkit-linear-gradient(top,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%);'
        +'background: -o-linear-gradient(top,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%);'
        +'background: -ms-linear-gradient(top,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%);'
        +'background: linear-gradient(to bottom,  #4c4c4c 0%,#595959 12%,#666666 25%,#474747 39%,#2c2c2c 50%,#000000 51%,#111111 60%,#2b2b2b 76%,#1c1c1c 91%,#131313 100%);'
        +'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#4c4c4c", endColorstr="#131313",GradientType=0 );'
        +'opacity: 0.9;'
        +'-moz-transition: all 1s ease;'
        +'-moz-animation-duration: 1s;'
        +'-moz-animation-name: slidein;'
        +'}'
     +'@-moz-keyframes slidein {from {width: 100%}}'
     +'.bar:hover {-moz-animation: animate-stripes 3s linear infinite;}'
     +'@-moz-keyframes animate-stripes {0% {background-position: 0 0;} 100% {background-position:0 22px;}}'
     +'.cyfral_bar{'
        +'color: #BCA071;'
        +'margin: -1px 0 0 -2px;'
        +'padding: 1px;'
        +'font-size: 10px;'
        +'text-align: center;'
        +'text-decoration: none !important;'
        +'cursor: pointer;'
        +'z-index: 2;'
        +'position: absolute;'
        +'text-decoration: none;'
        +'text-shadow: 1px 1px 1px rgba(0,0,0, 0.8);'
        +'height: 15px;'
        +'width: 15px;'
        +'-ms-transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;'
      +'}'
'div #breadcrumbs,#breadcrumbs li.subnav  {z-index:100 !important;}';
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
        var cyfral = Math.round(p[1] * 100 / p[2]);	
		if (p) {
	  
		d = document.createElement( 'div' );
		d.innerHTML = "<div class=\"cyfral_bar_wrap\">"+
                        "<div class=\"cyfral_bar\">"+ p[1] +"</div>"+
                        "<div class=\"progress_bar\" style=\"width:"+ cyfral +"%\"></div>"+        
                     "</div>"; 

		el.parentNode.insertBefore( d , el ) ;
		}
	}
    }
    if (unsafeWindow.arts_fud) {
      var length = unsafeWindow.arts_fud.length;
      for (i = 0; i < length; i++) {
  	  var p = item_hard_regexp.exec( unsafeWindow.arts_fd_none[i] ) ;
      var cyfral = Math.round(p[1] * 100 / p[2]);

	  var str = "<div class=\"cyfral_bar_wrap\">"+
                        "<div class=\"cyfral_bar\">"+ p[1] +"</div>"+
                        "<div class=\"progress_bar\" style=\"width:"+ cyfral +"%\"></div>"+        
                     "</div>"; 
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
        var cyfral = Math.round(p[1] * 100 / p[2]);
		if (p) {
			d = document.createElement( 'div' );
			d.innerHTML = "<div class=\"cyfral_bar_wrap\">"+
                        "<div class=\"cyfral_bar\">"+ p[1] +"</div>"+
                        "<div class=\"progress_bar\" style=\"width:"+ cyfral +"%\"></div>"+        
                     "</div>";

			el.parentNode.insertBefore( d , el ) ;
		}
	}
}

function getI(xpath,elem){return document.evaluate(xpath,(!elem?document:elem),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}
function $( id ) { return document.getElementById( id ); }