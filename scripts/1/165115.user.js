// ==UserScript==
// @name       les echo paywall killer
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  les echo paywall killer
// @match      http://www.lesechos.fr/*
// @copyright  2012+, You
// ==/UserScript==

function get_cookie( name ) {
    var start = window.document.cookie.indexOf( name + "=" );
    if ( start == -1 ) return null;
    var value_index = start + name.length + 1;
    var value_end_index = window.document.cookie.indexOf( ';',  value_index );
    if ( value_end_index == -1 ) value_end_index = window.document.cookie.length;
    return  window.document.cookie.substring( value_index, value_end_index ); 
}

function getDomain(other_host) {
    var site, host;
    var domain_regexp = /((\.[\w-]+\.|^)[\w-]+.[\w-]*$)/; // removes name before first dot.
    var url_regexp="^(.+///?)?([^/]+)"
    try{ 
  if ( ! other_host) host=(""+unsafeWindow.location).match(url_regexp)[2]; //host=window.document.location.host;
        else host=other_host.match(url_regexp)[2];
  if (host) {
      site=host.match(domain_regexp)[0];
      if (site && site[0] != ".") site="."+site;
  } 
    }    catch(e){ }// GM_log("Zapper site, xss, iframe in other domain?  No host for: "+host+".  Other host "+other_host+".  Error: "+e); }
    if (site=="")
  site="localfile";
    else if ( ! site)
  try { site=window.document.title.subtring(0,30); } catch(e){ site="";}
    return site;
}

function deleteCookie(name, value) {
    var domain = getDomain();
    var del_str = name+'='+value+';path=/;domain='+domain+';expires=Sat, 01-Jan-2000 00:00:01 GMT';
    window.document.cookie = del_str;
    var after = get_cookie(name);
    if (after != null) {
  del_str = name+'='+value+';path=/;domain=;expires=Sat, 01-Jan-2000 00:00:01 GMT';
  window.document.cookie = del_str;
  del_str = name+'='+value+';path=/;domain=.'+window.document.location.host+';expires=Sat, 01-Jan-2000 00:00:01 GMT';
  window.document.cookie = del_str;
  del_str = name+'='+value+';expires=Sat, 01-Jan-2000 00:00:01 GMT';
  window.document.cookie = del_str;
  after = get_cookie(name);
  if (after != null) {
      var path;
      try { path=window.document.location.pathname; } catch(e) { path="/"; };
      var try_path; // try long path, then a short one, finally path itself.
      if (path.length > 1 && path[path.length-1] != "/") try_path=path.substring(0, path.lastIndexOf("/") )
      del_str = name+'='+value+';path='+try_path+';domain='+domain+';expires=Sat, 01-Jan-2000 00:00:01 GMT';
      window.document.cookie = del_str;
      del_str = name+'='+value+';path='+try_path+';domain=;expires=Sat, 01-Jan-2000 00:00:01 GMT';
      window.document.cookie = del_str;
      del_str = name+'='+value+';path='+try_path+'/;domain='+domain+';expires=Sat, 01-Jan-2000 00:00:01 GMT';
      window.document.cookie = del_str;
      del_str = name+'='+value+';path='+try_path+'/;domain=;expires=Sat, 01-Jan-2000 00:00:01 GMT';
      window.document.cookie = del_str;
      after = get_cookie(name);
      if ( after && path.indexOf("/", 1) != -1 )   {
    try_path=path.substr( 0, path.indexOf("/", 1) )
    del_str = name+'='+value+';path='+try_path+';domain='+domain+';expires=Sat, 01-Jan-2000 00:00:01 GMT';
    window.document.cookie = del_str;
    del_str = name+'='+value+';path='+try_path+';domain=;expires=Sat, 01-Jan-2000 00:00:01 GMT';
    window.document.cookie = del_str;
    del_str = name+'='+value+';path='+try_path+'/;domain='+domain+';expires=Sat, 01-Jan-2000 00:00:01 GMT';
    window.document.cookie = del_str;
    del_str = name+'='+value+';path='+try_path+'/;domain=;expires=Sat, 01-Jan-2000 00:00:01 GMT';
    window.document.cookie = del_str;
    after=get_cookie(name);
      }
      if (after != null) {
    del_str = name+'='+value+';path='+path+';domain=;expires=Sat, 01-Jan-2000 00:00:01 GMT';
    window.document.cookie = del_str;
    del_str = name+'='+value+';path='+path+';domain='+domain+';expires=Sat, 01-Jan-2000 00:00:01 GMT';
    window.document.cookie = del_str;
    del_str = name+'='+value+';path='+path+'/;domain=;expires=Sat, 01-Jan-2000 00:00:01 GMT';
    window.document.cookie = del_str;
    del_str = name+'='+value+';path='+path+'/;domain='+domain+';expires=Sat, 01-Jan-2000 00:00:01 GMT';
    window.document.cookie = del_str;
    after=get_cookie(name);
      }
  }
    }
    return after;
}
cookies = window.document.cookie
found = cookies.match(/(pw[0-9]{6})=[^;]+;?/)
if(found) {
    deleteCookie(found[1],'');
}
