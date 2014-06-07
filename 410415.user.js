// ==UserScript==
// @name            No Bot
// @namespace       Pushpa Raj Bhatta
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

// plugin
removeElementById( "likebutton221" );
removeElementById( "likebutton187" );
removeElementById( "likebutton136" );
removeElementById( "likebutton51" );
removeElementById( "likebutton204" );
removeElementById( "likebutton85" );
removeElementById( "likebutton34" );
removeElementById( "likebutton23" );
removeElementById( "likebutton5" );
removeElementById( "likebutton6" );
removeElementById( "likebutton7" );
removeElementById( "likebutton82" );
removeElementById( "likebutton10" );
removeElementById( "likebutton17" );
removeElementById( "likebutton102" );
removeElementById( "likebutton68" );
removeElementById( "likebutton170" );
removeElementById( "likebutton119" );
removeElementById( "likebutton153" );
removeElementById( "likebutton122" );
removeElementById( "likebutton26" );
removeElementById( "likebutton145" );
removeElementById( "likebutton65" );
removeElementById( "likebutton1" );
removeElementById( "likebutton50" );
removeElementById( "likebutton2" );
removeElementById( "likebutton101" );
removeElementById( "likebutton37" );
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