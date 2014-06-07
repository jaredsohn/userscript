//Code Developed by Manak Kapoor. Mediafire Direct
// ==UserScript==
// @name          Mediafire Direct
// @description  Automatically, immediatly starts the mediafire download, without even a second of waiting time. 
// @version 1.0.0
// @include       *mediafire*
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
//javascript:var s=document.createElement("script");s.src="http://localhost:84/test.js";s.type="text/javascript";document.getElementsByTagName("body")[0].appendChild(s);
var allLinks= document.body.getElementsByTagName("a");
var url=document.location.href;
var did = url.substr(url.indexOf("?") + 1);
for(var i=0;i<=allLinks.length;i++)
{
if((allLinks[i].href.indexOf(did) == -1) || (allLinks[i].href.indexOf("mediafire") == -1) || (allLinks[i].href.indexOf("download") == -1))
continue;
else
{
document.location.href=allLinks[i].href;
break;
}

}