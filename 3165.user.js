// ==UserScript==
// @name           coComment automatic invocation
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Auto-discovers which pages are configured for coComment, and pulls in the coComment code to track comments you post on blogs everywhere. Updates its configuration daily from the coComment script, so it should stay current with what sites coComment covers without any work on your part after having installed the script. Version 1.1.
// @include        http://*
// @exclude        http://blogger.com/post-*
// @exclude        http://www.blogger.com/post-*
// ==/UserScript==

function set_variable( ccw )
{
  return ccw.replace( /cocomment.webs/g, 'cocomment_webs' );
}

function got_config( http )
{
  var data = http.responseText, cwre, site, sites = [];
  cwre = /cocomment.webs\["[^"]+"\]\s*=(.*?[\]}]);\s*(?=cocomment.webs|var )/g;
  cocomment_webs = {};
  while( site = cwre.exec( data ) ) // populate cocomment_webs:
    try{ eval( set_variable( site[0] ) ); }catch( e ){ /* alert(e); */ };
  for( site in cocomment_webs )
    for( data in cocomment_webs[site] )
      if( !/^(form|id|number|text)$/.test( data ) )
	delete cocomment_webs[site][data];
  // cater for this one too: http://www.cocomment.com/teamblog/?p=21#more-21
  data = cocomment_webs.toSource().replace( /\}\).*?$/, ',"standard-js":' +
        '{id:commentFormID,form:commentFormName,number:commentFormNumber,' +
        'text:"form\\xB0"+commentTextFieldName}})' );
  //eval( 'var x='+ data );
  //for( site in x ) sites.push( site );
  //prompt( data, sites );
  GM_setValue( 'last_poll', now.toString() );
  GM_setValue( 'cocomment_webs', data );
  cocomment_hookup();
}

function cocomment_hookup()
{
  if( cocomment_detectblog() )
  {
    var script = document.createElement( 'script' );
    script.setAttribute( 'type', 'text/javascript' );
    script.src = cocomment_url;
    document.body.appendChild( script );
  }
}

function cocomment_detectblog()
{
  var domain = document.domain.replace(/.*?(?=\w+\.\w+$)/, '').toLowerCase();
  var tryout = cocomment_webs[domain];
  if( tryout ) return check_blog( tryout );
  for( tryout in cocomment_webs )
    if( check_blog( cocomment_webs[tryout] ) )
      return true;
}

function check_blog( hook )
{
  var i, opts;
  if( hook.form )
  {
    opts = hook.form.split( '|' );
    for( i=0; i<opts.length; i++ )
      if( document.forms.namedItem( opts[i] ) )
	return true;
  }
  if( hook.id )
  {
    opts = hook.id.split( '|' );
    for( i=0; i<opts.length; i++ )
      if( document.getElementById( opts[i] ) )
	return true;
  }
  if( hook.number >= 0 )
    for( i=hook.number; i<document.forms.length; i++ )
      if( document.forms[i].elements.namedItem( hook.text.split('\xB0')[1] ) )
	return true;
}

var cocomment_url = 'http://www.cocomment.com/js/cocomment.js';
var commentFormID, commentFormName, commentFormNumber, commentTextFieldName;
try{ eval( 'var cocomment_webs = '+ GM_getValue( 'cocomment_webs', '0' ) ); }
catch(e){ var cocomment_webs = false; }
var now = (new Date).getTime(), last = GM_getValue( 'last_poll', 0 );
if( cocomment_webs && (now - last) < 864e5 ) // only update once a day
  cocomment_hookup();
else
  GM_xmlhttpRequest( { method:'GET', url:cocomment_url, onload:got_config } );
