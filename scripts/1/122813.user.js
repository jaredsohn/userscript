// ==UserScript==
// @name           Denemee Scripti
// @version        3.53
// @namespace      Deneme
// @description    Kingdoms of Camelot-2012-Turkce
// @include        *kingdomsofcamelot.com/*main_src.php*
// @include        *kingdomsofcamelot.com/*standAlone.php*
// @include        *kingdomsofcamelot.com/*acceptToken_src.php*
// @include	   *kingdomsofcamelot.com/*helpFriend_src.php*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *facebook.com/connect/uiserver.php*
// @include	   *kabam.com/*
// ==/UserScript==



// Copyright (C) 2009-2012 Ilya S. Lyubinskiy. All rights reserved. See license.txt


// ***** vars ******************************************************************

var popup_window_dragging;
var popup_window_function;
var popup_window_target;
var popup_window_x;
var popup_window_y;
var popup_window_zIndex = 10000;


// ***** show ******************************************************************

function popup_window_show(selector, args)
{
  var obj = $(selector);

  var parent = args.parent ? $(args.parent) : null;
  var pos    = args.pos    ?   args.pos     : null;
  var width  = args.width  ?   args.width   : null;
  var x      = args.x      ?   args.x       : 0;
  var y      = args.y      ?   args.y       : 0;

  obj.show();

  if (width)
  obj.css( 'width', width);
  obj.css('zIndex', popup_window_zIndex++);

  if (pos == 'tag-right-down'     ) { x += parent.position().left+parent.outerWidth()*1-obj.outerWidth()*0; y += parent.position().top+parent.outerHeight()*0-obj.outerHeight()*0; }
  if (pos == 'tag-right-up'       ) { x += parent.position().left+parent.outerWidth()*1-obj.outerWidth()*0; y += parent.position().top+parent.outerHeight()*1-obj.outerHeight()*1; }
  if (pos == 'tag-left-down'      ) { x += parent.position().left+parent.outerWidth()*0-obj.outerWidth()*1; y += parent.position().top+parent.outerHeight()*0-obj.outerHeight()*0; }
  if (pos == 'tag-left-up'        ) { x += parent.position().left+parent.outerWidth()*0-obj.outerWidth()*1; y += parent.position().top+parent.outerHeight()*1-obj.outerHeight()*1; }
  if (pos == 'tag-bottom-right'   ) { x += parent.position().left+parent.outerWidth()*0-obj.outerWidth()*0; y += parent.position().top+parent.outerHeight()*1-obj.outerHeight()*0; }
  if (pos == 'tag-bottom-left'    ) { x += parent.position().left+parent.outerWidth()*1-obj.outerWidth()*1; y += parent.position().top+parent.outerHeight()*1-obj.outerHeight()*0; }
  if (pos == 'tag-top-right'      ) { x += parent.position().left+parent.outerWidth()*0-obj.outerWidth()*0; y += parent.position().top+parent.outerHeight()*0-obj.outerHeight()*1; }
  if (pos == 'tag-top-left'       ) { x += parent.position().left+parent.outerWidth()*1-obj.outerWidth()*1; y += parent.position().top+parent.outerHeight()*0-obj.outerHeight()*1; }

  if (pos == 'window-center'      ) { x += $(document).scrollLeft()+($(window).width()-obj.width())*1/2; y += $(document).scrollTop()+($(window).height()-obj.height())*1/2; }
  if (pos == 'window-left-top'    ) { x += $(document).scrollLeft()+($(window).width()-obj.width())*0/2; y += $(document).scrollTop()+($(window).height()-obj.height())*0/2; }
  if (pos == 'window-left-bottom' ) { x += $(document).scrollLeft()+($(window).width()-obj.width())*0/2; y += $(document).scrollTop()+($(window).height()-obj.height())*2/2; }
  if (pos == 'window-right-top'   ) { x += $(document).scrollLeft()+($(window).width()-obj.width())*2/2; y += $(document).scrollTop()+($(window).height()-obj.height())*0/2; }
  if (pos == 'window-right-bottom') { x += $(document).scrollLeft()+($(window).width()-obj.width())*2/2; y += $(document).scrollTop()+($(window).height()-obj.height())*2/2; }

  obj.css('left', x+'px');
  obj.css( 'top', y+'px');

  obj.find('.popup_window_css_head img').click    (click);
  obj.find('.popup_window_css_head    ').mousedown(mousedown);
                             $(document).mousemove(mousemove);
                             $(document).mouseup  (mouseup);

  // ***** click *****

  function click(e) { obj.hide(); }

  // ***** mousedown *****

  function mousedown(e)
  {
    if ( popup_window_dragging || e.which != 1) return;

                         popup_window_dragging = true;
                         popup_window_target   = obj;
    if ( $.browser.msie) popup_window_function = document.onselectstart;
    if (!$.browser.msie) popup_window_function = document.onmousedown;
    if ( $.browser.msie)                         document.onselectstart = function() { return false; };
    if (!$.browser.msie)                         document.onmousedown   = function() { return false; };

    popup_window_x = e.pageX;
    popup_window_y = e.pageY;
  }

  // ***** mousemove *****

  function mousemove(e)
  {
    if (!popup_window_dragging) return;

    popup_window_target.offset({left : popup_window_target.offset().left+e.pageX-popup_window_x,
                                top  : popup_window_target.offset().top +e.pageY-popup_window_y});

    popup_window_x = e.pageX;
    popup_window_y = e.pageY;
  }

  // ***** mouseup *****

  function mouseup(e)
  {
    if (!popup_window_dragging) return;

                                                  popup_window_dragging = false;
    if ( $.browser.msie) document.onselectstart = popup_window_function;
    if (!$.browser.msie) document.onmousedown   = popup_window_function;
  }


}