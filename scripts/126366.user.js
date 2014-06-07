// ==UserScript==
// @name           网易新闻和谐指数
// @namespace      mybeky
// @include        http://*.163.com/*
// ==/UserScript==

(function() {
	var comment_link = document.getElementById('endpageUrl1');
	if (comment_link) {
        var comment_url = comment_link.href;
        var m_url = comment_url.replace(/comment.*?163/, 'comment.3g.163') 
		GM_xmlhttpRequest({
			method: "GET",
			url: m_url,
            onload: function(response) {
                var content = response.responseText;
                var _ = content.match(/评论共(\d+)条 显示(\d+)条/);
                if (_) {
                    var total = _[1];
                    var show = _[2];
                    var p = (total == 0) ? 1 : show / total;
                    var percent_text = (100 - p * 100).toFixed(2);
                    comment_link.innerHTML += ' (' + percent_text + '%)';
                }
            }
		});
	}
})();
