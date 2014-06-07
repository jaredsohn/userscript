// ==UserScript==
// @name           EasyA2Z
// @namespace      EasyA2Z
// @description    Shop Smart. Save Right.
// @include        http://amazon.com/*
// @include        https://amazon.com/*
// @include        http://www.amazon.com/*
// @include        https://www.amazon.com/*
// ==/UserScript==


//
// Globals
//
const     AFF_ID = 'thesmartbazaar05-20';
const TAG_STRING = '&tag=';
const REF_STRING = '/ref=as_li_tf_tl?';

//
// Regex
//
const   DP_REGEX = /\/(dp|gp)\//;
const  TAG_REGEX = /(tag\=)(.*)/;
const ITEM_REGEX = /\/(\w){10}\//;
const SLASH_REGEX = /\/[^\/]*$/;

function isSubstring( aString, aSubstring ) 
{
  return aString.indexOf( aSubstring ) != -1;
}

function isDetailPage( url ) 
{
  return DP_REGEX.test( url ) && ITEM_REGEX.test( url );
}

var url = window.location.href;

if( ! isSubstring( url, AFF_ID ) && isDetailPage( url ) ) 
{
  if( TAG_REGEX.test( url ) ) 
  {
    window.location.href = url.replace( TAG_REGEX, '$1' + AFF_ID );
  } 
  else if( SLASH_REGEX.test( url ) ) 
  {
    window.location.href = url.replace( SLASH_REGEX, REF_STRING + TAG_STRING + AFF_ID );
  }
}