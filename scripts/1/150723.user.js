// ==UserScript==
// @name       Plurk Mobile Ajax
// @namespace    PlurkMAjax
// @version    0.1.5
// @description  Browse plurk response by ajax.
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include    http://plurk.com/m/*
// @include    http://www.plurk.com/m/*
// @include    http://www.plurk.com/m
// ==/UserScript==
// 
//  changelog:
//
//  - 0.1.5:
//    Add loading progress bar and collapse link.
//  - 0.1.4:
//    Fix bugs that script will be loaded mrepeatedly.
//  - 0.1.3:
//    Only show unread plurk extend-bar.
//  - 0.1.2:
//    Add a bar to expand response more convenient.
//    Add url pattern to match plurk domain.

//Plurk Mobile Viewer
var showLoading = function()
{
  var msg = document.querySelector('div#_LOADING_');
  
  if (!msg)
  {
    msg = document.createElement('div');
    msg.innerHTML='loading';
    msg.id='_LOADING_';
    msg.style.position = 'absolute';
    msg.style.top = '5px';
    msg.style.right = '5px';
    msg.style.border='2px solid #aaa';
    msg.style.padding='10px';
    msg.style.fontFamily='monospace';
    msg.style.background='#333';
    msg.style.color='#fff';
    document.body.appendChild(msg);
  }
  
  return msg;
};
$msg = showLoading();

function addjQuery(){
  if (typeof jQuery != 'undefined') return 1;
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"); 
  script.onload = on_jquery_ready;
  document.body.appendChild(script);
  return 0;
} 
$jquery_loaded = addjQuery();
if (typeof $plurk_mobile_complete == 'undefined')
  $plurk_mobile_complete = 0;

function on_jquery_ready()
{
    console.log('read flag = ' + $plurk_mobile_complete);
  if ($plurk_mobile_complete) 
    return true;

  var onDOMNodeInserted = function(e)
  {
    var $target = $(e.target);
    if ($target.has('a.r'))
    {
      appendAjaxNode($target.find('a.r'));
    }
  };

  var appendAjaxNode = function(anchor)
  {
    var COLLAPSE_COLOR = '#CF682F',
        READ_COLOR = '#AAA',
        EXPAND_COLOR = '#AAA';
    var isUnread = false, BAR_COLOR;
    //check if not 0 response
    if (/^0 /.test($.trim($(anchor).text())))
      return;

    isUnread = /B/.test($(anchor).parent().prop('nodeName'));
    COLLAPSE_COLOR = isUnread ? COLLAPSE_COLOR : EXPAND_COLOR;

    //bind click event listener
    var $plurk = $(anchor).closest('.plurk');
    var extend = $("<a>+</a>").addClass('extend r');
    var bar = $("<div></div>").appendTo($plurk).toggle(isUnread).addClass('extend');
    var $ex_content = $("<div></div>")
      .append("<progress class='loading' style='width:100px;' alt='loading...'></progress>")
      .append("<div class='response_list' style='border-left:30px solid #aaa;'></div>")
      .append("<a class=collapse style='display:none; cursor:pointer; font-size:10px;'>collapse</a>")
      .addClass('extend_content')
      .css({'margin':'1em'})
      .hide().appendTo($plurk);

    extend.css({"cursor": "pointer"});
    $(anchor).before(extend);
    bar.css({"cursor": "pointer", "clear":"both", "height":"10px", "width":"100%", "background": COLLAPSE_COLOR});
    $('.extend', $plurk).click(function(e) {
      var url = $(anchor).attr('href');
      $(".response_list", $ex_content).load(url + ' div.response', function complete(){
        $(".loading", $ex_content).hide();
        $(".collapse", $ex_content).show();
      });
      var $a_collapse = $(".collapse", $ex_content);
      $a_collapse.off().click(function(){
        $ex_content.hide();
        extend.text('+');
        //$a_collapse.hide();
      });

      var is_content_visible = $ex_content.toggle().is(':visible');
      extend.text(is_content_visible ? '-' : '+');
      bar.css({"background": (is_content_visible ? EXPAND_COLOR : COLLAPSE_COLOR)});
    });
  };

  document.addEventListener('DOMNodeInserted', onDOMNodeInserted, false);

  $('a.r').each(function(index,data)
  {
    appendAjaxNode(data);
  });
  $($msg).remove();

  console.log('set flag');
  $plurk_mobile_complete = 1;
  if (typeof $plurk_mobile_complete != 'undefined')
    console.log('set flag = ' + $plurk_mobile_complete);

};

if ($jquery_loaded === 1)
{
  console.log('on_jquery_ready');
  on_jquery_ready();
};

