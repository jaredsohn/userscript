// ==UserScript==
// @name       Don't jump with Google - China GFW
// @namespace  http://mr-n.org/
// @version    0.1
// @description  Don't jump with Google China|在中国使用谷歌搜索时，不通过谷歌做跳转，直接访问原始地址，有效的防止点到被墙连接后，导致谷歌段时间内打不开的情况。
// @match      http://www.google.tld/search*
// @copyright  2012+, Mr.N
// ==/UserScript==

( function(){
    var allLinks = document.getElementsByTagName( 'a' );
    for( var i = 0 ; i < allLinks.length ; i++ ){
        if( typeof(allLinks[i].onmousedown) == 'function' ) allLinks[i].removeAttribute( 'onmousedown' );
    }
} )();