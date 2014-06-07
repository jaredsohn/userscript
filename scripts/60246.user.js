// ==UserScript==
// @name           GFWed短链接自动还原
// @version        1.5
// @namespace      dengsa
// @include        https://twitter.com/*
// @include        https://www.twitter.com/*
// ==/UserScript==

(function(){

	if (document.getElementById('timeline')) {

		document.getElementById('timeline').addEventListener('click', function(e) {

			e = e || window.event;
			var t = e.target || e.srcElement;

			if (t.tagName == 'A' && t.getAttribute('rel') == 'nofollow') {

				e.stopPropagation();
				e.preventDefault();

				if (/(?:bit.ly|j.mp|htxt.it)\/.+/i.test(t.href)) {

					var loader = document.createElement('img');
					loader.src = 'data:image/x-gif;base64,R0lGODlhDgAOAIQAAJyanMzOzLS2tOzu7KyqrNza3MTGxPz6/KSipLy+vPT29LSytOTi5JyenNTW1Ly6vPTy9KyurNze3MzKzPz+/KSmpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAUACwAAAAADgAOAAAFWSAljmRJQQN6mGMAvMZABOwCD++zjg6AAIaTbUIiAAYS4qmBGCkAAtGO8jiKntFSwioyQkSFgAKBmLoWCkoBYAySBIAGYx1Pkw4BhIMOSLAoBwcDgwNTfyQhACH5BAkKAA8ALAAAAAAOAA4AhJyanMzOzLS2tOzq7KyqrNza3MTCxPT29KSipNTW1Ly+vPTy9LSytOTi5MzKzPz+/JyenNTS1Ly6vOzu7KyurNze3MTGxPz6/KSmpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVe4COKTjWeaAIIA3omBAAgl/sYsmwdSj2qhEkAcwkAAqfY5DEwLSCI0QHAcCkAy8dUYAUsRrHvovC4ICC+RwSgeEgYBwnAcroIGg0ZBEBJnxh6Fn4nBwYQbTYnA4gjIQAh+QQJCgALACwAAAAADgAOAIScmpzMzszs6uy0srT09vTc3ty8vrysqqzU1tT08vS8urz8/vykoqTs7uy0trT8+vzk5uTExsSsrqzc2twAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFVeAijqJQkOjyJMHxpAtyADQQpAY9DDVBIoBDY9EAMBCo2XBRiBAahhEBMMABEqKpw7pcKASPwE3FAKAKM+TDAYigJDpDWfIiCWq0SB1lcDS6MAlIMCEAIfkECQoAFAAsAAAAAA4ADgCEnJqczM7MtLa07O7srKqs3N7cxMbE/Pr8pKKk1NbUvL689Pb0tLK0nJ6c1NLUvLq89PL0rK6s5ObkzMrM/P78pKak3NrcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABVggJY5kWR6LSSYEABAB5Uik4jKC29Ji8g4iSAvAo7SAooKLOLIUVoHABCI6OK6OwwiCpCyWhtGhgdBSDi5E6pwLixZkQOOhQAAiZq/iMLHLDXkmA10qhSIhACH5BAkKAA0ALAAAAAAOAA4AhJyanMzOzLS2tOzq7KyqrMTCxPT29Nze3KSipNTW1Ly+vPTy9MzKzPz+/JyenLy6vOzu7LSytMTGxPz6/OTm5KSmpNza3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVZYCOOZFlOhkkmBAAQgVq4keAKU7lIkLhEgJhoAsuNDA5EQNGQuCoH0aDgcFkWLoAi2hjYXg2GBOFYlCwEyigAiKQaE8nAOLI5HgoE+BTQAxwSKiMQPYKGIiEAOw==';
					loader.style.verticalAlign = 'middle';
					t.parentNode.insertBefore(loader, t);

					GM_xmlhttpRequest({
						method: "GET",
						url: 'http://api.longurl.org/v2/expand?format=json&url=' + t.href,
						onload: function(response) {


							var obj = JSON.parse(response.responseText);
							t.href = obj['long-url'];
							t.innerHTML = obj['long-url'];

							t.parentNode.removeChild(loader);

							GM_openInTab(t.href);
						}
					});
				}
				else {
					GM_openInTab(t.href);
				}
			}
		}, false);
	}
})();