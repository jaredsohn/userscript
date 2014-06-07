// ==UserScript==
// @name           	Find1 Upsales Extensions
// @version 		0.12
// @namespace      	http://userscripts.org/users/malako
// @description    	Extra funktioner för Upsales
// @include        	https://crm.upsales.com/professional/application/topMenu.jsp
// @include        	https://crm.upsales.com/professional/application/order/manageOrderProducts.jsp?orderId=*
// @require        	https://code.jquery.com/jquery-2.1.0.min.js
// @require        	https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js
// @grant    		GM_info
// @grant       	GM_setValue
// @grant       	GM_xmlhttpRequest
// @run-at 			document-end
// @license        	GNU GENERAL PUBLIC LICENSE
// @agreement      	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// ==/UserScript==

var name 	= "Find1 Upsales Extensions";
var version = "0.12";

//var f1Host = "https://localhost:44300";
var f1Host = "https://jobb.find1.se";
var supportMail = 'mr@find1.se';

var reloadLoginFrameCount = 0;

console.log("=== " + window.location.href + " ===");
console.log(console.log(jQuery));
console.log("=== END === ");

function GM_main($) {
    console.log("Main function");

    var url = window.location.href;
    var description =name + ' ' + version + '\n\n';
	description += '• Skapa offert från affärsmöjlighet\n';

    // Order/Opportunity
    var token = 'https://crm.upsales.com/professional/application/order/manageOrderProducts.jsp?orderId=';
    if (url.indexOf(token) != -1) {
        var opportunity = ($(".formframeworkPanelStandardTitle").text().indexOf("Hantera Affärsmöjlighet") != -1);
        console.log("Affärsmöjlighet: " + opportunity);
        var orderId = url.replace(token, "");
        orderId = orderId.substr(0, orderId.indexOf("&"));
        var input = '<a href="' + f1Host + '/Admin/Quotation/Wizard?orderId=' + (orderId) + (opportunity ? '&opportunity=true' : '') + '" target="_blank"><input type="button" value="Find1 Offert"></a>';
        $(".formframeworkFormTopActions").prepend(input);
    }

    // Main
    token = "https://crm.upsales.com/professional/application/topMenu.jsp";
    if (url.indexOf(token) != -1) {
        addGlobalStyle('#find1-monkey-version { position:relative; top:6px; color:#eee; font-size:12px; font-weight:bold; display:inline-block; margin-right:40px; margin-left:5px; }');
        addGlobalStyle('#find1-monkey-about img { margin-right:5px; }');
        $("#supportandfeedback").prepend('<a href="#" id="f1-about" style="cursor:help;"><img alt="" src="data:image/png;base64,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" /><span id="find1-monkey-version">' +version + '</span></a>');
		$("#f1-about").click(function() {
            alert(description);
        });
    }
}

var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css';
document.getElementsByTagName("head")[0].appendChild(link);

if (typeof jQuery === "function") {
    console.log("Running with local copy of jQuery!");
    GM_main(jQuery);
}
else {
    console.log("fetching jQuery from some 3rd-party server.");
    add_jQuery(GM_main, "1.11.0");
}

function add_jQuery(callbackFn, jqVersion) {
    var jqVersion = jqVersion || "1.11.0";
    var D = document;
    var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    var scriptNode = D.createElement('script');

    scriptNode.addEventListener("load", function () {
        var scriptNode = D.createElement("script");
        scriptNode.textContent = 'var gm_jQuery  = jQuery.noConflict (true);\n' + '(' + callbackFn.toString() + ')(gm_jQuery);';
        targ.appendChild(scriptNode);
    }, false);
    targ.appendChild(scriptNode);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
