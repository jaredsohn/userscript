// ==UserScript==
// @name           nextDebug
// ==/UserScript==

javascript:void(function($){ 
  $('form').append('<input type="hidden" name="isDebug" value="1">');
  $('a').each(function(){ 
    var $this = $(this); 
    var url = $this.attr('href') || ''; 
    var split = url.split('#');
    url = split[0] + (split[0].indexOf('?') == -1 ? '?' : '&') + 'isDebug=1';
    if (split.length > 1) url += '#' + split[1]; 
    $this.attr('href',url); 
  }); 
})(jQuery);