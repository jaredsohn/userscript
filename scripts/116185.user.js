// ==UserScript==
// @id             keep_sina_weibo_old_version
// @name           Sina weibo keep old version
// @description    For visiting http://weibo.com, to keep the web not jump to new version, no 3 columns, no bottom right chat list.
// @author         Evan JIANG
// @homepage       http://userscripts.org/scripts/show/83584
// @version        2011.10.23
// @icon           http://www.sinaimg.cn/blog/developer/wiki/48x48.png
// @include        http://weibo.com/*
// ==/UserScript==

if (4 == getCookie('wvr')) {
    setCookie('wvr',3,30,'/','.weibo.com',false);
    self.location='http://weibo.com';
}

 
function getCookie( name ) {
    var start = document.cookie.indexOf( name + "=" );
    var len = start + name.length + 1;
    if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
        return null;
    }
    if ( start == -1 ) return null;
    var end = document.cookie.indexOf( ';', len );
    if ( end == -1 ) end = document.cookie.length;
    return unescape( document.cookie.substring( len, end ) );
}

function setCookie( name, value, expires, path, domain, secure ) {
    var today = new Date();
    today.setTime( today.getTime() );
    if ( expires ) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date( today.getTime() + (expires) );
    document.cookie = name+'='+escape( value ) +
        ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
        ( ( path ) ? ';path=' + path : '' ) +
        ( ( domain ) ? ';domain=' + domain : '' ) +
        ( ( secure ) ? ';secure' : '' );
}
