// ==UserScript==
// @name           Twitter Cage 1.2
// @namespace      http://www.marcsallent.com/
// @description    Twitter Cage is a GreaseMonkey script that reminds you that your tweets are being actively filtered by Twitter by changing twitter's logo.
// @include        http://twitter.com/*
// @include        http://twitter.*/*
// @include        http://*.twitter.*/*
// @include        https://twitter.com/*
// @include        https://twitter.*/*
// @include        https://*.twitter.*/*
// ==/UserScript==

// Script developed at http://www.marcsallent.com
// JQuery/Greasemonkey implementation by http://joanpiedra.com/jquery/greasemonkey/
/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTOR BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
 * OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
*/
// Do whatever you want with this script but keep the mentions and notes above

//BEGIN - Load jQueryhttp://is.gd/j6G
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
   if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
   else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	ello=$("#logo-search").children("a#logo");
	if(ello.length>0){
		ello.html("<img src='http://img691.imageshack.us/img691/9555/logowithbirdhome.png'>");
	}else{
		ello=$("a#logo");
		if(ello.length>0){
			ello.html("<img src='http://img444.imageshack.us/img444/7423/twittercage.png'>"+ello.html());
			//alert(1);
		}else{
			ello=$("div#logo").children("a");
			//ello.html("<img src='http://img444.imageshack.us/img444/7423/twittercage.png'>"+ello.html());	
			ello.css('background','url("http://img143.imageshack.us/img143/5594/twitterlogoright0.png") no-repeat scroll 20px 9px transparent');
	//ello.css('background','url("http://s.twimg.com/a/1291661299/phoenix/img/twitter_logo_right.png") no-repeat scroll 20px 9px transparent');
		}
	}

}
