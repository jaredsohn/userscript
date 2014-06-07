// ==UserScript== 
// @name Nar.TV Shit-Remover
// @description Stop da fucken timer on Nar.TV aka Yildiz.TV
// @include http://*.nar.tv/?act=dvr*
// @include http://nar.tv/?act=dvr*
// @include http://*.yildiz.tv/?act=dvr*
// @include http://yildiz.tv/?act=dvr*
// @version     2.0
// @licence     GNU General Public License version 3 or any later version; https://www.gnu.org/licenses/gpl-3.0.html
// ==/UserScript==

unsafeWindow.onbeforeunload = function(e){
  var e = e || window.event;
  // For IE and Firefox (prior to 4)
  if (e){
    e.returnValue = 'Do you want to leave this page?';
  }
  // For Safari and Chrome
  return "Do you want to leave this page?";
};

var pattern=/=expired/g;
docScripts=document.getElementsByTagName('script');
for ( i=0; i<docScripts.length; i++ )
{
	var result=pattern.test(docScripts[i].textContent);
	if (result)
	{
		docScripts[i].parentNode.removeChild(docScripts[i]);
	}
}

var vucut = document.getElementsByTagName('BODY')[0];
var benimscript = document.createElement("script");
benimscript.setAttribute('id', 'bizim_script');
benimscript.type = "text/javascript";
benimscript.textContent = 
			    "<!--" + "\r\n"
+ "if (interval) {" + "\r\n"
+ "clearInterval(interval);" + "\r\n"
+ "}" + "\r\n"
+ "" + "\r\n"
+ "$(document).ready(function() {" + "\r\n"
+ "function showTimer() { }" + "\r\n"
+ "function initTimer(data, ajax) { }" + "\r\n"
+ "});" + "\r\n"
+ "function timeOut(){" + "\r\n"
+ "// do nothing. timeout is not accepted." + "\r\n"
+ "}" + "\r\n"
//			  + "alert('bzzztt');" + "\r\n" // for testing
			  + "// -->" + "\r\n";
			vucut.appendChild(benimscript);

var timer_loading_elem = document.getElementById('timer_loading');
if (timer_loading_elem) {
timer_loading_elem.parentNode.removeChild(timer_loading_elem);
}

var timer_cont_elem = document.getElementById('timer_cont');
if (timer_cont_elem) {
timer_cont_elem.parentNode.removeChild(timer_cont_elem);
}
