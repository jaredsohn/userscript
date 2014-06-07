// ==UserScript==
// @name           Uwants.com auto sort date descending order
// @namespace      http://www.xanga.com/gandalf__zoro
// @description    autosort forum post by date 
// @include        http://www.uwants.com/forumdisplay.php?fid=*
// ==/UserScript==
function sort()
{ 
  var tar1=document.location.href;
  var re = new RegExp(/(http:\/\/)(www\.)uwants+\.(com)?(\/forumdisplay.php\?fid)+\=+(\d+)$/);
  if (tar1.match(re)) {
     setTimeout("document.location.href += '&filter=0&orderby=dateline&ascdesc=DESC'", 3000 );
  }  
}
sort();