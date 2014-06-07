// ==UserScript==
// @name          KongDark
// @author        Chromeguy
// @version       1.0
// @date          13-Apr-2013
// @namespace     kongdark.kd
// @description   Makes Kong darker
// @include       http://www.kongregate.com*
// @grant         none
// ==/UserScript==
//////////////////////////////////////////////////////////////////////////////////
//
/***********************************************************************************************/
/**  Right-Click anywhere on this page and "Save (Page) As..."                                 */
/**  -------> Choose an easy to find location, like Documents or Desktop                       */
/**  -------> File name: [ kongdark.user.js    ]                                              */
/**  -------> Save As Type: [ All Files         ]                                              */
/**  -------> Click [Save]                                                                     */
/*****                                                                                         */
/**  Make the browser small --> prepare for drag'n'drop                                        */
/**  Firefox: drag & drop on any open page                                                     */
/**  Chrome: drag & drop on Extensions page only "chrome://chrome/extensions/"                 */
/**  - NOT "https://chrome.google.com/webstore/category/extensions?utm_source=chrome-ntp-icon" */
/**  Accept permissions dialogs & enjoy the new chat column.                                   */
/***********************************************************************************************/
//
//////////////////////////////////////////////////////////////////////////////////
//
// VERSION INFO
// 1.0 makes kong darker

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", function() {
	$j = jQuery.noConflict();
	
	function Dbug(message){console.debug('<[KongDark]> '+message);}//console logging
	
	Dbug('darkening page');
	$j(".maincontent").css({'background-color':'#333333'});
	Dbug('done');
});