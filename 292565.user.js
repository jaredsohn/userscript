// ==UserScript==
// @name            Mirror - 镜像加载文件
// @namespace       http://userscripts.org/users/292565
// @icon            https://cdn2.iconfinder.com/data/icons/eldorado-furniture/40/mirror-128.png
// @description     简单的静态镜像，没有翻墙的日子，就啃啃吧
// @version         1.0.1
// @include         *github.com*
// @updateURL       http://userscripts.org/scripts/source/292565.meta.js
// @downloadURL     http://userscripts.org/scripts/source/292565.user.js
// @grant           none
// ==/UserScript==

(function() {
    // GM_addStyle function is not existed in chrome 27
    var GM_addStyle = GM_addStyle || function(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        document.getElementsByTagName("head")[0].appendChild(style);
    };
    
    
    var loadScript = function (url) {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
		GM_JQ = document.createElement('script');
		GM_JQ.src = url;
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;
		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    };
    
    var loadStyle = function (url) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = url;
        var head = document.getElementsByTagName("head")[0];
        head.insertBefore(link);
    };
    
    var Mirror = [
		{
			hosts: ['github.com'],
			fn: function () {
				loadStyle("http://rose1988c.github.io/Mirror/github/css/1.css");
				loadStyle("http://rose1988c.github.io/Mirror/github/css/2.css");
				
				loadScript("http://rose1988c.github.io/Mirror/github/js/1.js");
				loadScript("http://rose1988c.github.io/Mirror/github/js/2.js");
			}
		}
	];
	var host = location.host;
	for (var i = 0; i < Mirror.length; ++i) {
		for (var j = 0; j < Mirror[i].hosts.length; ++j) {
			if (host.indexOf(Mirror[i].hosts[j]) !== -1) {
				Mirror[i].fn();
				return;
			}
		}
	}

})();