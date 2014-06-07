// ==UserScript==
// @name     Unending BE Addventure Facelift
// @include  http://www.bearchive.com/~addventure/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant    GM_addStyle
// @description Makes the BE Addventure look that little bit nicer.
// @version 1.0
// @namespace ktp
// ==/UserScript==
//Grab a link to the new font.
{
$("head").prepend ( "                \
    <link href='http://fonts.googleapis.com/css?family=PT+Serif' rel='stylesheet' type='text/css'>                       \
" );
}
//Add in the navigation links.
{
$("body").append ( " 																					\
	<div id='navlinks'>																					\
	\[<a href='http://www.bearchive.com/~addventure/game1/trees/index.html'>Index</a>\]<br>				\
	\[<a href='http://www.bearchive.com/~addventure/game1/trees/recent/index.html'>By Date</a>\]<br>	\
	\[<a href='http://www.bearchive.com/~addventure/game1/docs/recents/'>Recents</a>\]					\
	</div> 																								\
" );
}
//Apply the font and pad the sides.
{
GM_addStyle ( "														\
    body {															\
		width:			66%;										\
        min-width:		400px;										\
		margin-right:	auto;										\
		margin-left:	auto;										\
		font-family: 	'PT Serif', 'Georgia', serif; !important;	\
    }																\
" );
}
//Style the navigation links.
{
GM_addStyle ( "										\
	#navlinks {										\
		position:       absolute !important;		\
        top:            0px !important;				\
        right:          0px !important; 			\
		text-align:right							\
	}												\
" );
}
//Remove any stray font face tags so everything's pretty.
{
$("font").attr("face","");
}
//Give links that link to new episodes their own class.  Backlinks too.
{
$("ol li").filter(function(){
    return $(this).text().charAt(0) === '*';
}).addClass('written');
}
{
$("ol li").filter(function(){
    return $(this).text().charAt(0) === '>';
}).addClass('written');
}
//Hightlight links that link to new episodes.
{
GM_addStyle ( "									\
	.written {font-weight: bold}				\
" );
}