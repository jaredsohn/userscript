// ==UserScript==
// @id            nidevdev
// @name          CleanEnha
// @version       20140321
// @namespace     http://mirror.enha.kr
// @icon          http://987.photobucket.com/albums/ae353/davin_2010/Blog/kaskus_logo.png
// @author        Nidev, Iterator
// @homepage      http://nidev.bitbucket.org
// @description   Extract orignal wiki title from messed up page. Automatically hide <del> tags.
// @grant         none
// @include       /^http?://mirror.enha.kr/*/
// @include       /^http?://rigvedawiki.net/r1/wiki.php/*/
// @run-at        document-end
// ==/UserScript==

(function(){
    var a=document.getElementsByTagName('a');
    var i=0;
    for(;i<a.length;i++){
        if(!a[i].id && a[i].title && a[i].title !== a[i].innerHTML){
            a[i].innerHTML+='<sup>'+a[i].title+'</sup>';
        }
    }
    var _=document.createElement("style");
    _.type="text/css";
    _.id = "delhider"
    _.innerHTML="del {display: none;}";
    document.body.appendChild(_);
    document.onkeypress = function (e) {
      e = e || window.event;
        if(e.keyCode == 96){
            document.getElementById("delhider").remove();
            console.log(e.keyCode);
          document.onkeypress = null;
        }
  };
})();
