// ==UserScript==
// @name        Bamboo Plugin Name Clipper
// @namespace   http://mra.tzo.net
// @description Creates Link in page to offer Plugin Names with a prompt 
// @include     *
// @require     http://code.jquery.com/jquery-1.7.2.min.js
// @version     1
// ==/UserScript==
//
$(function (){
  if (location.href.indexOf('/plugins/servlet/upm')==-1) {
    return;
  }
  var qs='#header nav.local div.primary';
  qs='#main-nav';
  $(qs).append('<li><a href="#" id="bamb-plugin-clipper">Clip Plugin Names</a></li>');
  var oo=$('#bamb-plugin-clipper').bind('click',function (){
    var o=$('h4.upm-plugin-name');
    var s='';
    o.each(function (){
      var i=$(this);
      var n=i.text();
      if (s=='') {
        s=n;
      }else{
        s+="|"+n;
      }
    });
    prompt('Bamboo Plugin Name Clipper',s);
  });
  setInterval(function(){
    var qs='ul#upm-tabs li.upm-selected a#upm-tab-manage';
    if ($(qs).length==0) {
      $('#bamb-plugin-clipper').css('display','none');
    }else{
      $('#bamb-plugin-clipper').css('display','');
    }
  },500);
}
);
