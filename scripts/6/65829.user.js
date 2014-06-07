// ==UserScript==
// @name           PicShare Geenza Imagehost
// @description    Displays the image only.
// @include        http://picshare.geenza.com/*
// ==/UserScript==

var img;
var frm;

if(hostnameContains('picshare.geenza.com'))
{
  frm = document.getElementById('adlt_frm');
  if(frm)
  {
    document.getElementById('adlt_frm').submit();
  }
  img = document.getElementById('picShare_image_container');
  if(img)
  {
    location.replace(img.src);
  }
}

function hostnameContains(domain)
{
  return location.hostname.match(new RegExp('^(.+\\.)?' + domain.replace('.', '\\.') + '$', 'i'));
}
