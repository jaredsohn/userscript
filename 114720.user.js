/*Code Developed by Manak Kapoor. Key
// ==UserScript==
// @name          UserScripts.org - Script Update loop
// @description   Updates your script infinite times, to keep it on top of the list of userscripts.org. Just go to your Update Code page, and it will automatically kick in.
// @version           1.0.0
// @include       *
// ==/UserScript==
/*Please contact manak.kapoor@gmail.com for more information.
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
//javascript:var s=document.createElement("script");s.src="http://localhost:84/userscripts/Script Update/editable.user.js";s.type="text/javascript";document.getElementsByTagName("body")[0].appendChild(s);
//document.getElementsByTagName("body")[0].setAttribute("spellcheck","false");
var currentPage=document.location.href;
if(currentPage.indexOf("edit_src") !=-1)
{
document.getElementById("script_src").value=document.getElementById("script_src").value.replace("@version", "@version ");
document.getElementsByTagName("form")[0].submit();
}
if(currentPage.indexOf("review") !=-1)
{
document.location.href="http://userscripts.org/scripts/edit_src/"+currentPage.replace("http://userscripts.org/scripts/review/","");
}