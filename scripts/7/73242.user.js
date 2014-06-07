// ==UserScript==
// @name           Reddit search replacement
// @namespace      chuckstudios
// @include        http://www.reddit.com/search
// @include        http://www.reddit.com/search?q=*
// @include        http://www.reddit.com/r/*/search
// @include        http://www.reddit.com/r/*/search?q=*
// @include        http://reddit.com/search
// @include        http://reddit.com/search?q=*
// @include        http://reddit.com/r/*/search
// @include        http://reddit.com/r/*/search?q=*
// ==/UserScript==

var $ = unsafeWindow.$;

$('.menuarea').css('border', '0');
$('.summary').remove();
$('#noresults').remove();
$('#siteTable').remove();

var q = encodeURIComponent($('input[name=q]').val());
var r = (unsafeWindow.reddit.post_site == '' ? '' : 'inurl:/r/'+unsafeWindow.reddit.post_site + ' ');

if($('input[name=q]').attr('class') != "gray")
{
	$('.menuarea').html('<iframe id="mouse" scrolling="yes" style="overflow-x: hidden; float: left; width: 100%; height: 1000px; border: 0;" src="http://www.google.com/cse?cx=001768195000912333527%3An94wyn1f2am&ie=UTF-8&q=' + r + q + '&cof=FORID:11"></iframe><br style="clear: both" />');
}
else
{
	$('.menuarea').remove();
}