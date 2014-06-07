// ==UserScript==========================================================================================
// @name           AVCI - Otomatik Nakliye
// @author         Nizamettin AVCI
// @date           21.11.2007
// @version        1.0
// @description    Tum somlerdeki madenleri toplar.
// @include        http://uni*.ogame.com.*
// ==/UserScript=========================================================================================

// ==Kullanici Tanimlamalari=============================================================================
// KENDİ OYUN BİLGİLERİNİZİ GİRİYOSUNUZ. MADENLER NEREYE TOPLANICAK.
var evren=5;
var speed=0; // 0:%100 - 1:%90 - 2:%80 .....
var galaxy=0;
var system=000;
var planet=0;
var planettype=1; // 1:söm  2:harabe  3:AY
girme =new Array (0,0,0);  
// girmesini istemediginiz somler Listeden sirayla bu sekilde : 0,1,2,3,4,..
// ==/Kullanici Tanimlamalari============================================================================

// == Filo 1.Asama ===============================================================================================
if(document.baseURI.indexOf("/index.php?page=flotten1") != -1) {
  	var id;
  	var y=0;
	for (i = 202; i < 204; i++) {
		id = "ship"+i;
	    if (document.getElementsByName(id)[0]) {
		   document.getElementsByName(id)[0].value = document.getElementsByName("max" + id)[0].value;
	    }
	}
	for (i=0;i<girme.length;i++){
	  if (document.getElementsByTagName("select")[0][girme[i]].selected==true){
	    y=1;
	  }
	}
	if (y==1){
	  for (i=0;i<document.getElementsByTagName("select")[0].length;i++){
	    if (document.getElementsByTagName("select")[0][i].selected==true){window.location.replace('http://uni'+evren+'.ogame.com.tr' + document.getElementsByTagName("select")[0][i+1].value);break;}
	  }
	}
    if (y==0){
      var s=document.getElementsByTagName('form');
      var k=s.length-1;
      var a=1;
      for (i = 202; i < 204; i++) {
	   	id = "ship"+i;
        if (document.getElementsByName(id)[0]) {document.forms[k].submit();}
        if (document.getElementsByName(id)[0]){a=0;}
	  }
      if (a==1){
	    for (i=0;i<document.getElementsByTagName("select")[0].length;i++){
	      if (document.getElementsByTagName("select")[0][i].selected==true){window.location.replace('http://uni'+evren+'.ogame.com.tr' + document.getElementsByTagName("select")[0][i+1].value);break;}
        }
	  }	
     }	            
}

// == Filo 2.Asama ===============================================================================================
if(document.baseURI.indexOf("/index.php?page=flotten2") != -1) {
	document.getElementsByName("galaxy")[0].value = galaxy;
	document.getElementsByName("system")[0].value = system;
	document.getElementsByName("planet")[0].value = planet;
	document.getElementsByName("planettype")[0].value = planettype;
	document.getElementsByName("speed")[0][speed].selected = true;
    var s=document.getElementsByTagName('form');
    var k=s.length-1;
    document.forms[k].submit();
}

// == Filo 3.Asama ===============================================================================================
if(document.baseURI.indexOf("/index.php?page=flotten3") != -1) {
        document.getElementsByName("order")[3].checked = true;
	document.getElementsByName("resource1")[0].value = document.getElementsByName("thisresource1")[0].value;
	document.getElementsByName("resource2")[0].value = document.getElementsByName("thisresource2")[0].value;
	document.getElementsByName("resource3")[0].value = document.getElementsByName("thisresource3")[0].value;
    var s=document.getElementsByTagName('form');
    var k=s.length-1;
    document.forms[k].submit();
}