// ==UserScript==
// @name             YouTubeLite
// @author           Jake McMahon
// @date             May 16, 2006
// @namespace        http://userscripts.org/
// @include          *youtube.com/watch*
// @exclude          
// ==/UserScript==
 
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];	
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style); 
}
///add inline css
addGlobalStyle('#gNavDiv { display: none ! important; }');
addGlobalStyle('#gSubNavDiv { display: none ! important; }');
addGlobalStyle('#actionsAndStatsDiv { display: none ! important; }');
addGlobalStyle('#commentsDiv { display: none ! important; }');
addGlobalStyle('#videoResponseLinkDiv { display: none ! important; }');
addGlobalStyle('#aboutExploreDiv { display: none ! important; }');
addGlobalStyle('#interactDiv { width:100%; text-align:center; margin-top:5% }');
addGlobalStyle('h1 { width:100%; text-align:center; }');
addGlobalStyle('#searchDiv { display: none ! important; }');
addGlobalStyle('#logoTagDiv { display: none ! important; }');
addGlobalStyle('#utilDiv { display: none ! important; }');
addGlobalStyle('#footerDiv { display: none ! important; }');
addGlobalStyle('#sideAdDiv { display: none ! important; }');

