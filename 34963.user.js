// ==UserScript==
// @name            Hatena User Icon Enlarger
// @namespace       http://www.hatena.ne.jp/r-west/
// @author          r-west
// @include         http://*.hatena.ne.jp/*
// @description     see http://d.hatena.ne.jp/r-west/20081004/ . Based on 'Enlarge HatenaBookmark Icons http://www.nobodyplace.com/mutter/2008/03/26/112249.php'
// ==/UserScript==
(function(){
 var reg_prof_s= new RegExp().compile('(http://www\.hatena\.ne\.jp/users/)?[^/]+/[^/]+/profile(_s)?\.gif');
 var a= document.getElementsByTagName('img');
 for (i=0; i<a.length; i++) {
  l = a[i].getAttribute('class');
  if (l != 'hatena-id-icon') {
   if (!reg_prof_s.test(a[i].getAttribute('src')||'')) {
    continue;
   }
  }

  if (a[i].getAttribute('onmouseover') || a[i].getAttribute('onmouseout')) {
   continue;//TODO?: Should not give up. these should be kept in the handlers after bellow.
  }

  a[i].setAttribute('onmouseover', 
      "var s=64;var o='profile_s.gif';var n='profile.gif';e=this;"
     +"var o_size=e.getAttribute('width');var o_src=e.getAttribute('src').match(/[^/]+$/)[0];"
     +"e.setAttribute('width',s);e.setAttribute('height',s);e.setAttribute('src',e.getAttribute('src').replace(o,n));"
     +"var _w='\"width\"';var _h='\"height\"';var _src='\"src\"';var _n='\"'+n+'\"';var _o_src='\"'+o_src+'\"';"
     +"e.setAttribute('onmouseout','"
         +"var s=('+o_size+'||16);e=this;"
         +"e.setAttribute('+_w+',s);e.setAttribute('+_h+',s);e.setAttribute('+_src+',e.getAttribute('+_src+').replace('+_n+','+_o_src+'));"
         +"');"
     );
 }
})();
