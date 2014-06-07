// ==UserScript==
// @name            Remove No Bot
// @namespace       JamesTodd
// @include         http://www.like4like.org/user/earn-facebook.php
// ==/UserScript==

function removeElementById( sId )
{
	if( document.getElementById( sId ) != null )
	{
		var banner = document.getElementById( sId );
		banner.parentNode.removeChild( banner );
	}
}

// Veehd Vaudi plugin
removeElementById( "likebutton221" );
removeElementById( "likebutton187" );
removeElementById( "likebutton136" );
removeElementById( "likebutton51" );
removeElementById( "likebutton204" );
removeElementById( "likebutton85" );
removeElementById( "likebutton34" );
removeElementById( "likebutton23" );
removeElementById( "likebutton17" );
removeElementById( "likebutton102" );
removeElementById( "likebutton68" );
removeElementById( "likebutton170" );
removeElementById( "likebutton119" );
removeElementById( "likebutton153" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );
removeElementById( "" );

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://www.like4like.org/img/icon/antibot-top-1.png") {
         ilist[i].src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NjDx4Yi-p54tMwjWarc7hW41f_10j67g_LDQOl6V9TdMRpXG";
    }
}