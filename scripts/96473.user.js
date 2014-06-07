// ==UserScript==
// @name           letters2image-colors_VersionUnicodeRange
// @namespace      letters2image-colors-VersionUnicodeRange
// @description    exhaustive individual letter substitution: substitution by images. Addition of color in the background and the font. Replace a character by an other, even of an other font. Need some JavaScript and HTML skills to tweak the script, there is no demo. This version, uses Unicode ranges(Chinese friendly), the other simply looks in a list of characters. To use this script you need to setup a site on your desktop that only you can access. Potential uses with people of low eye site (read with out glasses), near blind (increase screen letter density), dyslexics, children learning to read and illiterate people (phonetic alphabet).
// @include        *
// ==/UserScript==

/* How to setup a site on your desktop that only you can access.

download apache
http://www.apache.org/dyn/closer.cgi

setup local site accessible only by you.

setup UNIX
http://www.zaphu.com/2007/08/21/ubuntu-lamp-server-guide-configure-apache-mysql-and-cgi-bin/

setup mickeysoft :P
http://www.thesitewizard.com/apache/install-apache-2-windows.shtml

the default server will be
http://127.0.0.1

Don't put the images in the root folder, you need to put them in a subfolder, for example like this
http://127.0.0.1/img/

images must be put in the site, named after their code point in Unicode.

for example "一" has decimal code point in Unicode of 19968. Thus name of the replacing image will be "19968"

*/

//***********************************variables********************************************
var heightimage = '40'

var linksite ='http://127.0.0.1/img/'


//********************************function definitions***************************************
function choise(char) {
//return 'img src="'+linksite+char.charCodeAt(0)+'" alt="'+char+'" height="'+heightimage+'"/';

//FIXME just rm this and do a universal script
//Chinese
//if('一'<=char && char<='鿿')
tmpchar=char.toLowerCase()
if('a'<=tmpchar && tmpchar<='z')
{

return 'img src="'+linksite+tmpchar+'" alt="'+char+'" height="'+heightimage+'"/';

}
else
{
return char;
}

}

function substitution() {

var alltextnodes = document.evaluate('.//text()[normalize-space(.) != ""]',document.body,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var currentchar ='';

var tmptext='';

for (var j = 0, l = alltextnodes.snapshotLength ; j < l; j++)
   {
   tmptext='';
   for (var i = 0, ll=alltextnodes.snapshotItem(j).data.length; i <ll; i++)
     {
       currentchar=alltextnodes.snapshotItem(j).data[i];
       currentchar=choise(currentchar);
       tmptext=tmptext+currentchar;
     }
   
   alltextnodes.snapshotItem(j).data = tmptext;
   }
}


function rmspecialchar() {

var RawHtml = document.getElementsByTagName('body')[0].innerHTML; 
    
RawHtml = RawHtml.replace(RegExp('','g'),'<');
RawHtml = RawHtml.replace(RegExp('','g'),'>');
    
document.getElementsByTagName('body')[0].innerHTML = RawHtml;

}
//*************************************executions****************************************
substitution();
rmspecialchar();