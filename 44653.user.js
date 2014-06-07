// ==UserScript==
// @name           Drupal New Comment Navigation Tabajara
// @namespace      http://danillonunes.net
// @include        http://meiobit.com/*
// @include        http://meiobit.com.br/*
// @include        http://*.meiobit.com/*
// @include        http://*.meiobit.com.br/*
// ==/UserScript==

jQuery = unsafeWindow.jQuery;

var npn = 0;
jQuery(".comment-new").css("position", "relative");
jQuery("span.new").each(function() {
  jQuery(this)
    .attr("id", "new-" + npn);
  npn++;
  if (npn != (jQuery("span.new").length))
    jQuery(this)
      .after("<a href='#new-" + npn + "' class='new-prox' title='Próximo novo comentário'>Próximo</a>");
  jQuery(".new-prox").css({
    "position": "absolute",
    "top": "10px",
    "right": "10px"
  });
});