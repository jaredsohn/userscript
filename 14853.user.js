// ==UserScript==
// @name          ek$i sozluk yazarlara kil olma aparati
// @author        shultays
// @version       1.0
// @description	  kil oldugunuz yazarlarin entrylerine gordugu yerde cok kotu verir.
// @include       *sourtimes.org/show.asp*
// @include       *sourtimes.org/vote.asp*
// ==/UserScript==


killar = GM_getValue("killar");
if(killar == undefined){
  killar = ""
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
for (var i = 0; i < divler.snapshotLength; i++) {
  divimiz = divler.snapshotItem(i);
  txt = divimiz.innerHTML;
  yazarimiz = txt.split("</a>")[0].split(">")[1];
  txt_array = txt.split("&v=-1");
  txt_array = txt_array[0].split("vote.asp?id=")
  idmiz = txt_array[txt_array.length-1];
  if(txt.search("vote.asp") > -1){

    divimiz.innerHTML = ""
    ek = txt.split("</tr>")[0];
    ek += "<td>&nbsp;</td><td id='' onmousedown='md(this)' onmouseup='bn(this)' onmouseover='ov(this)' onmouseout='bn(this)' class='but' onclick='hr(this.childNodes[0])' "
    if(killar.search(yazarimiz) == -1){
      ek += "title='kil ol'><a href='javascript:od(\"vote.asp?id="+idmiz+"&v=-1&kil="+yazarimiz+"\")' class='icon'>&nbsp;>:(&nbsp;</a></td></tr></tbody></table></span>"
    }else{
      ek += "title='affet'><a href='javascript:od(\"vote.asp?id="+idmiz+"&v=-1&kil="+yazarimiz+"\")' class='icon'>&nbsp;:/&nbsp;</a></td></tr></tbody></table></span>"
      divimiz.innerHTML = "<a href = '#' title='sirf killiginizdan bu entry kotulendi.'>* </a> <iframe src='vote.asp?id="+idmiz+"&v=-1' height='1' width='1' frameborder='0' scrolling='no'>" ;
    }
    divimiz.innerHTML += ek;
  }
}
}


if(location.pathname.search('vote.asp') != -1){
  kil_ar = location.href.split("&kil=");
  if(kil_ar.length > 1){
    kil = kil_ar[1].replace("%20"," ");
    if(killar.search(kil) == -1){
      killar += kil + ", ";
      document.getElementsByTagName("div")[0].innerHTML += "<br><br>tebrikler, "+kil+" isimli yazara basariyla kil oldunuz."
    }else{
      killar = killar.replace(kil + ", ","");
      document.getElementsByTagName("div")[0].innerHTML += "<br><br>" +kil+" isimli yazara olan killiginiz geri alindi."
    }
    GM_setValue("killar",killar);
  }
}