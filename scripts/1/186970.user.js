// ==UserScript==
// @name            DogeCoin beautifier
// @version         0.2
// @author          frdmn
// @description     Such ComicSans. Wow.
// @match		    *://*/*
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
 
var xpathResult = document.evaluate("(//text()[contains(., 'dogecoin')])[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var node=xpathResult.singleNodeValue;
if (node!=null) {
    addGlobalStyle(' \
		@-webkit-keyframes color { \
            0% { color:#f00; } \
            20% { color:#ff0; } \
            40% { color:#f0f; } \
            60% { color:#0ff; } \
            80% { color:#00f; } \
            95% { color:#0f0; } \
            100% { color:#f00; } \
		} \
		@keyframes color { \
            0% { color:#f00; } \
            20% { color:#ff0; } \
            40% { color:#f0f; } \
            60% { color:#0ff; } \
            80% { color:#00f; } \
            95% { color:#0f0; } \
            100% { color:#f00; } \
        } \
	');

    addGlobalStyle(' \
		* { \
            font-family: "Comic sans MS", sans-serif !important; \
        } \
	');
    
    addGlobalStyle (' \
		h1,h2,h3,h4,h5,h6 { \
            -webkit-animation: color 5s; \
            -webkit-animation-iteration-count: infinite; \
            -webkit-animation-timing-function: linear; \
            animation: color 5s; \
            animation-iteration-count: infinite; \
            animation-timing-function: linear; \
        } \
        h1 { \
            -webkit-animation-delay: -0.5s; animation-delay: -0.5s; \
        } \
        h2 { \
            -webkit-animation-delay: -1s; animation-delay: -1s; \
        } \
        h3 { \
            -webkit-animation-delay: -1.5s; animation-delay: -1.5s; \
        } \
        h4 { \
            -webkit-animation-delay: -2s; \ animation-delay: -2s; \
        } \
        h5 { \
            -webkit-animation-delay: -2.5s; animation-delay: -2.5s; \
        } \
        h6 { \
            -webkit-animation-delay: -3s; animation-delay: -3s; \
        } \
	');
}