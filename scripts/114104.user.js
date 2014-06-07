// ==UserScript==
// @name           appinn plugin sina webo
// @namespace      caoglish
// @include        http://www.appinn.com/
// @include        *
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.js
// ==/UserScript==

$('#socmt').parent().append($('#socmt').clone());


GM_xmlhttpRequest({
  method: "get",
  url: "http://weibo.com/appinncom",
  onload: function(response) {
    $('[id=socmt]').last()
		.append('<h4 class="nw">新浪微薄</h4>')
		.append($(response.responseText)
						.find('.rt')
						.remove()
						.end()
						.find('#profileL'));
  }
});
