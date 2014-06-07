// ==UserScript==
// @name        Jira Plugin Name Clipper
// @namespace   http://mra.tzo.net
// @description Creates Link in page to offer Plugin Names with a prompt 
// @include     *
// @require     http://code.jquery.com/jquery-1.7.2.min.js
// @version     1.2
// ==/UserScript==
//
$(function (){
  if (location.href.indexOf('/plugins/servlet/upm#manage')==-1) {
    return;
  }
  $('#main-nav').after('<a href="#" id="jira-plugin-clipper">Clip Plugin Names</a>');
  var oo=$('#jira-plugin-clipper').bind('click',function (){
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
    prompt('Jira Plugin Name Clipper',s);
  });
}
);
