// ==UserScript==
// @name           Star
// @namespace      http://www.outeverywhere.com
// @description    Add a star to your own profile
// @include        http://www.outeverywhere.com/*
// @include        http://www.journalhound.com/*
// ==/UserScript==

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1; 
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
}

var id = getCookie('SNO_ID');
if (id) {

  var anchors = document.getElementsByTagName("a");
  if (anchors) {
  
  var foo = 1
  
    for (var ii = 0; ii < anchors.length; ++ii) {
    
      if (anchors[ii].href.indexOf('who=' + id) >= 0) {

        var images = anchors[ii].parentNode.getElementsByTagName('img');
        if (images) {
          for (var jj = 0; jj < images.length; ++jj) {
            if (images[jj].alt == "member") {
              images[jj].src = '/g/icons/star4.png';
              break;
            }
          }          
        } 
      }
    }
  }
}
