// ==UserScript==
// @name		    二维码生成助手
// @namespace	http://lmbj.net
// @description   生成当前页面url的二维码，供手机扫描访问或分享
// @include         *
// @updateURL   https://userscripts.org/scripts/source/483156.meta.js
// @downloadURL https://userscripts.org/scripts/source/483156.user.js
// @version		0.1 
// ==/UserScript==

var scripts = [
    'https://gist.githubusercontent.com/laomo/11282313/raw/jquery.min.js',
    'https://gist.githubusercontent.com/laomo/11282313/raw/jquery.qrcode.min.js'
];

var numScripts = scripts.length, loadedScripts = 0;

function main() {
    jQuery.noConflict(); // if window.$ has been used by other libs
}

GM_addStyle('#output {position: fixed;    top: 50px;    right: 50px; }');

for (var i = 0; i < numScripts; i++) {
    var script = document.createElement("script");
    script.setAttribute("src", scripts[i]);
    script.addEventListener('load', function() {
        loadedScripts += 1;
        if (loadedScripts < numScripts) {
            return;
        }
        var script = document.createElement("script");
        script.textContent = "(" + main.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
    console.log(script);
}

var output = document.createElement("div");
output.id = "output";
output.style = "position: fixed;    top: 50px;    right: 50px; ";

var btn = document.createElement("input");
btn.type = "button";
btn.id="qrcodebtn";
btn.value ="扫码分享";
btn.addEventListener("click", function() {
    jQuery(function(){jQuery('#output').qrcode({
        width: 200,
        height: 200,
        text: window.location.href
    })});
    jQuery('#qrcodebtn').hide();
}, false);
output.appendChild(btn);
document.body.appendChild(output);