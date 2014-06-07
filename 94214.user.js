// ==UserScript==
// @name          Test for cMath
// @version       0.0.1
// @include       *cmath*
// ==/UserScript==

(function() 
{
  var aArray = document.getElementsByTagName("a");
  for(var i = 0; i < aArray.length; i++) 
  {
    var href = aArray[i].href;
    if (/^javascript:file_download/.test(href))
    {
      var bt = href.replace(/.*bt=(\d+).*/, '$1');
      var rn = href.replace(/.*rn=(\d+).*/, '$1');
      var sn = href.replace(/.*sn=(\d+).*/, '$1');
      var t = (new Date()).getTime();
      var url = "http://cmath.co.kr/cmath2/bbs/bbs_download.php?bt=" + bt +
        "&rn=" + rn +
        "&sn=" + sn +
        "&t=" + t;
      aArray[i].href = url;
    }
  }
})();