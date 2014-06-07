// ==UserScript==
// @name         EmbedGithubFile
// @description  Add an embed action on github repository. Like gist
// @id           me.zilliox.EmbedGithubFile
// @homepageURL  http://userscripts.org/scripts/show/121119
// @supportURL   http://userscripts.org/scripts/discuss/121119
// @updateURL    http://userscripts.org/scripts/source/121119.meta.js
// @version      2012.02.27
// @author       tzilliox
// @namespace    http://zilliox.me
// @include      *github.com/*
// ==/UserScript==

(function(){
	var execute = function(){
		setInterval( function() {
				var raw = $('#raw-url');
				if ( raw.length > 0 && ! raw.parents('ul').hasClass('embeded') ) {
					raw.parents('ul').append( '<li><a class="minibutton btn-raw grouped-button bigger lighter" onclick="this.style.display=\'none\';this.nextSibling.style.display=\'\';this.nextSibling.childNodes[0].select();"><span><span class="icon"></span>Embed</span></a><div style="width:180px;display:none;"><input type="text" value="&lt;script src=&quot;http://gist-it.appspot.com/github' + raw.attr('href') + '&quot;&gt;&lt;/script&gt;" style="width:170px;position:absolute;" onblur="this.parentNode.style.display=\'none\';this.parentNode.previousSibling.style.display=\'\';"></div></li>').addClass('embeded');
				}
			}, 1000
		);
	};
	var script = document.createElement("script");
	script.innerHTML = '(' + execute.toString() + ')();';
	document.head.appendChild(script);
})();