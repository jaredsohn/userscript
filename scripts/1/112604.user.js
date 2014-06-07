// ==UserScript==
// @name           تلميح Google إجابات
// @namespace      http://userscripts.org/users/Hamza7
// @description    يعرض تلميحا يحوي محتوى السؤال الممرّر عليه بالفأرة
// @include        http://ejabat.google.com/ejabat/*
// @require        http://code.jquery.com/jquery.min.js
// @resource       loading http://i54.tinypic.com/eqp6ye.gif
// @version        1.0
// @author         Hamza Abbad
// @license        GNU General Public License
// ==/UserScript==
/*Credits:This script uses jQuery and HTMLtoContext: devnull69's function (http://www.codingforums.com/showpost.php?p=1130006&postcount=4)*/
$.ajaxSetup({async:false});
function HTMLtoContext(responseText) {
   // create documentType
   var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
   // create new HTML document
   var doc = document.implementation.createDocument("", "", dt);
   // create new documentElement = <html> element
   var newDocumentElement = doc.createElement("html");

   // strip off everything before and after the innerHTML of the <html> element in responseText
   var beginPos = responseText.toLowerCase().indexOf('<html');
   beginPos = responseText.toLowerCase().indexOf('>', beginPos)+1;
   var endPos = responseText.toLowerCase().indexOf('</html');
   
   responseText = responseText.substring(beginPos, endPos);

   // assign innerHTML to new documentElement
   newDocumentElement.innerHTML = responseText;
   
   // append documentElement to HTML document
   doc.appendChild(newDocumentElement);

   return doc;
}
var أسئلة=$("a.wpiqCSS","div.wpr2ctgaCSS,div.wttpmtCSS,div.wfmtrCSS");
var عنصر_حاوي=document.createElement("div");
أسئلة.wrap(عنصر_حاوي);
أسئلة.parent().hover(عرض,اخفاء);
function اتصال(عنصر){
var حاوي_نص=document.createElement("p");
$(حاوي_نص).css({maxHeight:"300px",maxWidth:"415px",border:"1px dashed Cyan",borderTop:"3px solid SkyBlue",borderRight:"2px solid DeepSkyBlue",padding:"3px",position:"relative",top:"5px",right:"0px",overflow:"auto"});
$(عنصر).after(حاوي_نص);
$(حاوي_نص).html("<img src='"+GM_getResourceURL('loading')+"' alt='تحميل...' title='تحميل...'/> تحميل محتوى السؤال...");
عرض.call(عنصر.parentNode);
var استجابة=$.get(عنصر.href);
var مستند=HTMLtoContext(استجابة.responseText);
$(حاوي_نص).html($(مستند).find(".wpcpdCSS").html());
}
function عرض(){
var حاوي_نص=$(this).children("a").next("p").get(0);
if(حاوي_نص!=null)$(حاوي_نص).fadeIn(250);
else اتصال($(this).children("a").get(0));
}
function اخفاء(){
var حاوي_نص=$(this).children("a").next("p").get(0);
$(حاوي_نص).fadeOut(250);
}