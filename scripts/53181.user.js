// ==UserScript==
// @name           Trevor's Twitter Fixer
// @namespace      http://trevorbramble.com/
// @description    Fix twitter.com UI annoyances
// @include        http://twitter.com/*
// ==/UserScript==

function collapse( element )
{
  if ( element === undefined ) return;

  var classes = element.getAttribute('class');
  classes += ' collapsed';

  element.setAttribute('class', classes);
}

function collapse_collapsibles( collapsibles )
{
  for ( var i = 0; i < collapsibles.length; i++ )
    collapse( collapsibles[i] );
}

function get_collapsibles()
{
  return document.getElementsByClassName('collapsible');
}

function get_babblers()
{
  var babblers = Array();

  babblers.push( document.getElementById('recommended_users') );

  var promotions = get_promotions();

  for ( var i = 0; i < promotions.length; i++ )
    babblers.push( promotions[i] );

  return babblers;
}

function get_decorations()
{
  var decorations = Array();

  decorations.push( get_that_one_rogue_hrule() );

  return decorations;
}

function get_that_one_rogue_hrule()
{
  var hrules = document.getElementsByTagName('hr');

  for ( var i = 0; i < hrules.length; i++ )
    if ( hrules[i].parentNode.id == 'side' )
      return hrules[i];
}

function get_promotions()
{
  return document.getElementsByClassName('promotion');
}

function hide( element )
{
  if ( element === undefined ) return;

  var style = element.getAttribute('style');
  style += ';display:none';

  element.setAttribute('style',style);
}

function hide_babblers( babblers )
{
  for ( var i = 0; i < babblers.length; i++ )
    hide( babblers[i] );
}

function hide_decorations( decorations )
{
  for ( var i = 0; i < decorations.length; i++ )
    hide( decorations[i] );
}

collapse_collapsibles( get_collapsibles() );

hide_babblers( get_babblers() );

hide_decorations( get_decorations() );