// ==UserScript==
// @name resouces queue
// @author Jacky-Q
// @version 0.03
// @include http://*.travian.cn/dorf1*
// ==/UserScript==

var wood = document.getElementById("lrpr").childNodes[3].childNodes[1];
var text;
/*var text = wood.childNodes[2].childNodes[4].firstChild.firstChild.nodeValue;
*/
r1 = GM_getValue("r1") == null?29:GM_getValue("r1");
r2 = GM_getValue("r2") == null?31:GM_getValue("r2");
r3 = GM_getValue("r3") == null?23:GM_getValue("r3");
r4 = GM_getValue("r4") == null?19:GM_getValue("r4");
displayText();
function getText(){
  text = "";
/*
  n1 = wood.childNodes[0].childNodes[3].firstChild.nodeValue.substring(0,2);
  n2 = wood.childNodes[2].childNodes[3].firstChild.nodeValue.substring(0,2);
  n3 = wood.childNodes[4].childNodes[3].firstChild.nodeValue.substring(0,2);
  n4 = wood.childNodes[6].childNodes[3].firstChild.nodeValue.substring(0,2);
*/  
n1 = "<img src='/img/un/r/1.gif' />";
  n2 = "<img src='/img/un/r/2.gif' />";
  n3 = "<img src='/img/un/r/3.gif' />";
  n4 = "<img src='/img/un/r/4.gif' />";
  s1 = wood.childNodes[0].childNodes[4].firstChild.firstChild.nodeValue/r1;
  s2 = wood.childNodes[2].childNodes[4].firstChild.firstChild.nodeValue/r2;
  s3 = wood.childNodes[4].childNodes[4].firstChild.firstChild.nodeValue/r3;
  s4 = wood.childNodes[6].childNodes[4].firstChild.firstChild.nodeValue/r4;
//  alert(r1+":"+r2+":"+r3+":"+r4);
  var n=new Array(n1,n2,n3,n4);
  var s=new Array(s1,s2,s3,s4);

  for(var i=s.length-1;i>0;i--){
    for(var j=0;j<i;j++){
      if (s[j+1]<s[j]){
        var temp=n[j];
        n[j]=n[j+1];
        n[j+1]=temp;
        temp=s[j];
        s[j]=s[j+1];
        s[j+1]=temp;      
      }
    } 
  }

  for each (var ss in n)
    text+=ss+"|";
  return text;
}
function displayText(){
  if(document.getElementById("rq") != null)
    document.getElementById("lrpr").removeChild(document.getElementById("rq"));
  var rq=document.createElement("DIV");
  rq.id = "rq";
  rq.innerHTML=getText();
  document.getElementById("lrpr").appendChild(rq);
}
function setRatio(){
  message = window.prompt("请按木材、泥土、铁块、粮食的顺序设定资源比例，以\":\"号隔开");
  var ratio=message.split(':');
  r1 = ratio[0]/1;
  r2 = ratio[1]/1;
  r3 = ratio[2]/1;
  r4 = ratio[3]/1;
  GM_setValue("r1",r1);
  GM_setValue("r2",r2);    
  GM_setValue("r3",r3);
  GM_setValue("r4",r4);
  displayText();
}
GM_registerMenuCommand("set resource ratio",setRatio);
