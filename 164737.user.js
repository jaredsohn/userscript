// ==UserScript==
// @name           Fitbit - Weight logging tweaks
// @namespace      http://www.fitbit.com
// @description    Moves weight input to top of page and sets input focus
// @include        http://fitbit.com/*
// @include        http://*.fitbit.com/*
// @version $Revision: 0.0.1 $
// @date    $Date: 2013/04/11 10:30:00 $
// @author Carsten Ringe <carsten@kopis.de>
// ==/UserScript==

$(document).ready(function() {
  $('.mainModules > section:last').prependTo($('.content'));
  $('#weightInput').focus();
});