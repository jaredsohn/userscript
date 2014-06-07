//Code Developed by Manak Kapoor. Facebook Screenshot Haven
// ==UserScript==
// @name          fb Screenshot Haven
// @description   Modify any random posts on Facebook with a simple keyboard shortcut(Ctrl-E), just like you would on microsoft Word.
// @version                1.0.1
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
//Please contact manak.kapoor@gmail.com for more information.
/*
 * This work is licensed under a Creative Commons
 * Attribution-NonCommercial-NoDerivs 3.0 Unported License
 * http://creativecommons.org/licenses/by-nc-nd/3.0/
 *
 * UNLESS OTHERWISE MUTUALLY AGREED BY THE PARTIES IN WRITING,
 * LICENSOR OFFERS THE WORK AS-IS AND MAKES NO REPRESENTATIONS
 * OR WARRANTIES OF ANY KIND CONCERNING THE WORK, EXPRESS, IMPLIED,
 * STATUTORY OR OTHERWISE, INCLUDING, WITHOUT LIMITATION, WARRANTIES
 * OF TITLE, MERCHANTIBILITY, FITNESS FOR A PARTICULAR PURPOSE,
 * NONINFRINGEMENT, OR THE ABSENCE OF LATENT OR OTHER DEFECTS,
 * ACCURACY, OR THE PRESENCE OF ABSENCE OF ERRORS, WHETHER OR NOT
 * DISCOVERABLE. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF
 * IMPLIED WARRANTIES, SO SUCH EXCLUSION MAY NOT APPLY TO YOU.
 * EXCEPT TO THE EXTENT REQUIRED BY APPLICABLE LAW, IN NO EVENT
 * WILL LICENSOR BE LIABLE TO YOU ON ANY LEGAL THEORY FOR ANY SPECIAL,
 * INCIDENTAL, CONSEQUENTIAL, PUNITIVE OR EXEMPLARY DAMAGES ARISING
 * OUT OF THIS LICENSE OR THE USE OF THE WORK, EVEN IF LICENSOR HAS
 * BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
 */
//javascript:var s=document.createElement("script");s.src="http://localhost:84/editable.js";s.type="text/javascript";document.getElementsByTagName("body")[0].appendChild(s);
document.getElementsByTagName("body")[0].setAttribute("spellcheck","false");
var isOn=false;
var isCtrl = false;
document.keyup=function(e) {
    if(e.which == 17) 
	isCtrl=false;
}
document.onkeydown=function(e){
    if(e.which == 17) 
	isCtrl=true;
    if(e.which == 69 && isCtrl == true) {
		isCtrl=false;
		if(isOn==false)
		{
		alert("Facebook ScreenShot HavenMode is now On! Press Ctrl-E again to Turn it off!");
        document.body.contentEditable='true'; 
		document.designMode='on';
	
		isOn=true;
			}
			else
			{
					alert("Take your screenshot! Facebook ScreenShot HavenMode is now Off! Press Ctrl-E again to Turn it on!");
		document.body.contentEditable='false'; 
		document.designMode='off';
		isOn=false;
			}
		return false;
    }
}

