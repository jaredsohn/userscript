// ==UserScript==
// @name           Hide Quick Reply while Editing
// @namespace      what.cd
// @include        https://ssl.what.cd/forums.php?action=viewthread*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('a').each( function(k)
{
  if( $(this).text() == '[Edit]' )
  {
    var postID = $(this).attr('href').replace('#post','');
    var f = this.getAttribute('onclick');
    $(this).click( function() { eval('extraEditCalls('+postID+'); '+f); } );
  }
} );

function extraEditCalls( postID )
{
  $('#quickpostform').hide();
  $('#bar'+postID+' > input').click( function(){ $('#quickpostform').show(); } );
}
