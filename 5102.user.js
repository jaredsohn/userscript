// ==UserScript==
// @name           		Userscripts.org autologin
// @namespace      		http://www.lysator.liu.se/~jhs/userscript
// @description    		Logs in automagically on userscripts.org
// @include        		http://www.userscripts.org/*
// @include        		http://userscripts.org/*
// ==/UserScript==

function getset( form, name, query )
{
  var input;
  if( !(input = form.elements.namedItem( name )) )
    return false;
  if( !(input.value = GM_getValue( name, '' )) )
    GM_setValue( name, input.value = prompt( query ) );
  return true;
}

var f = document.forms, i, login;
for( i=0; i<f.length; i++ )
  if( f[i].action.match( 'login$' ) )
    if( getset( f[i], 'user_login', 'User name?' ) &&
	getset( f[i], 'user_password', 'Password?' ) &&
	(login = f[i].elements.namedItem( 'login' )) )
      return login.click();
