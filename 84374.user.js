// ==UserScript==
// @name           RapidLeechAdsRemover
// @namespace      http://userscripts.org/users/85211
// ==/UserScript==

$ = unsafeWindow.jQuery;
                       
if ( $ ) {
  b = $('input[name="link"][type!="hidden"]');

  if (b.size()) {

    x = $('<input type="button" value="=[ Transload File ]=">');
    x.bind('click', function(){
      $(this).parents('form').submit();
    });

    s = b.parents('form').find('input[type="button"]');
    if (!s.size())
      s = b.parents('form').find('input[type="submit"]');

    if (s.size()) {
      s.replaceWith(x);
    } else {
      b.parent().append(x);
    }

    document.title += ' (Patched by [PRAISER])';
    b.parents('form').unblind().removeAttr('onsubmit');

  }       
}