// ==UserScript==
// @name          ek$i sozluk ileri mallar surusu
// @author        shultays
// @version       1.0
// @description	  ileri derecede mal oldugunu dusundugunuz yazarlari ekleyebileceginiz boylece o sahislarin entrylerini bile gormeyi engelleyen liste
// @include       *sourtimes.org/show.asp*
// @include       *sourtimes.org/info.asp*
// @include       *sourtimes.org/cc.asp*
// ==/UserScript==


mallar = GM_getValue("mallar");
if(mallar == undefined){
  mallar = ""
}

if(location.pathname.search('show.asp') != -1) {
var divler, divimiz;
divler = document.evaluate(
  "//div[@class='aul']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

txt_array = new Array();

var n = 0;

var gizliler = new Array();
var gizlimesajlar = new Array();

for (var i = 0; i < divler.snapshotLength; i++) {
  divimiz = divler.snapshotItem(i);
  txt = divimiz.innerHTML;
  yazarimiz = txt.split("</a>")[0].split(">")[1];
  txt_array = txt.split("&v=-1");
  txt_array = txt_array[0].split("vote.asp?id=")
  idmiz = txt_array[txt_array.length-1];
  if(txt.search("vote.asp") > -1){
    if(mallar.search(yazarimiz) != -1){
       var gizlivar = 1;
       gizliler.push(divimiz.parentNode.getAttribute("id"));
       gizlimesajlar.push(divimiz.parentNode.innerHTML);
       divimiz.parentNode.innerHTML = "<div id='" + divimiz.parentNode.getAttribute("id").replace("d","m") + "' style='visibility:hidden'>ileri mal mesaji - <a href='#' onclick='javascript:ac("+n+");'>mesaji ac</a></div>" ;
       n++;
    }
  } 
}

if(n > 0){

var newscript = document.createElement('script');
var txt = "";

txt += "var gizliler = new Array("+n+");";
txt += "var gizlimesajlar = new Array("+n+");";

for(var i=0;i<n;i++){
  txt += "gizliler["+i+"] = \"" + gizliler[i] + "\";";
  txt += "gizlimesajlar["+i+"] = \"" + escape(gizlimesajlar[i]) + "\";";
}
txt += "function ac(n) { document.getElementById(gizliler[n]).innerHTML = unescape(gizlimesajlar[n]);}";
newscript.innerHTML = txt;
document.body.insertBefore(newscript,document.body.firstChild);
}

}


if(location.pathname.search('info.asp') != -1){

  var inputs = document.getElementsByTagName("input");
  var malvar = -1;
  for(var i=0;i<inputs.length;i++){
    if(inputs[i].getAttribute("value") == "mal"){
      malvar = i;
      break;
    }
  }
  if(malvar != -1){
  
     var ilerimalbtn = '\n<input type="button" class="but" value="ileri mal" title="ileri mallar surusune ekle" onclick=\'location.href=location.href + "&ilerimal"\' />'
     inputs[malvar].parentNode.innerHTML += ilerimalbtn;

     if(location.href.search("&ilerimal") != -1){
       var mal = inputs[malvar].parentNode.nextSibling.innerHTML;
       if(mallar.search(mal) == -1){
         mallar += mal + ", ";
         alert(mal + " nickli mali basariyla ileri mallar surusune eklediniz.");
       }else{
         mallar = mallar.replace(mal + ", ","");
         alert(mal + " nickli mali ileri mallar surusunden cikardiniz.");
       }
       GM_setValue("mallar",mallar);
     }
  }
  
}


if(location.pathname.search('cc.asp') != -1){
  if(location.href.search('sec=ml') != -1){
    var frm = document.getElementsByTagName("form")[0];
    var malarray = mallar.split(", ");
    var txt = "<br>ileri mallar surusu ("+(malarray.length-1) + ")<br><br>";
    for(var i=0;i<malarray.length;i++){
      txt += "  <a href='javascript:oi(\""+malarray[i]+"\");'>"+malarray[i]+"</a><br>";
    }
    var mydiv = document.createElement("div");
    mydiv.innerHTML = txt;
    frm.parentNode.insertBefore(mydiv,frm.nextSibling);

  }
}