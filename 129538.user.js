// ==UserScript==
// @name       SkyDrive 外链图片地址获取
// @namespace  http://www.kaixincode.com/
// @version    0.1
// @description  enter something useful
// @include        https://skydrive.live.com/*
// @copyright  2012+, You
// @author         starcake
// ==/UserScript==


var cssStyle = "";
cssStyle += "#myNewText,#myNewText2 {margin : 0px 0px 10px 5px; }";
cssStyle += "#newNote00 {color : red; }";
GM_addStyle(cssStyle);

var theboys = document.evaluate("//div[@class='setLeftCol']", document, null, 9, null);
var NewP=document.createElement("div");
NewP.id="newP";

var checkalll=document.createElement("input");
checkalll.type="button";
checkalll.value="获取选中";
checkalll.addEventListener("click", checkAll, false);
NewP.appendChild(checkalll);

theboys.singleNodeValue.parentNode.insertBefore(NewP,theboys.singleNodeValue.nextSibling);

var NewTextArea=document.createElement("textarea");
NewTextArea.id="myNewText";
NewTextArea.rows="2";
NewTextArea.cols="50"
NewTextArea.innerHTML="";
NewTextArea.setAttribute("readonly", "readonly");
NewTextArea.addEventListener("click", function (){this.select();}, false);

theboys.singleNodeValue.parentNode.insertBefore(NewTextArea,theboys.singleNodeValue.nextSibling);

function checkAll(){

    var mystart=document.body.innerHTML.match(/<li class=\"selected t_sel\" style=\"height: 24px; visibility: visible; \">(.*?)<\/li>/g);
    var tempstr="";
    var reg2=new RegExp("<a class=\"et_text fileAction\" href=\"#cid=.*?id=(.*?)\"><span title=\"(.*?)\">(.*?)<\/span><\/a>","gmi");
    for(var i=0;i<mystart.length;i++){
        var tempstr2=mystart[i].match(/<a class=\"et_text fileAction\" href=\"(.*?)\"><span title=\"(.*?)\">.*?<\/span><\/a>/ig);
        tempstr+=tempstr2[0].replace(reg2,"http://storage.live.com/items/$1?filename=$2")+"\r\n\r\n";
    }
        NewTextArea.innerHTML=tempstr;
}
                
 function getElementsByClassName (className) {
   var all = document.all ? document.all : document.getElementsByTagName('*');
   var elements = new Array();
   for (var e = 0; e < all.length; e++) {
     if (all[e].className == className) {
        elements[elements.length] = all[e];
       break;
      }
    }
   return elements;
 }