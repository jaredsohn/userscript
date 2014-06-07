// ==UserScript==
// @name           finalnikesky form filler
// @namespace      poohDA.borec.cz
// @include        http:/*/*
// @include        *vlozitkes*
// @version        0.9
// @author         poohDA@geocaching.cz
// @description    
// ==/UserScript==


//main
var f=-1;
if(document.forms[0].name=='vlozkes'){f=0;}
if(document.forms[1].name=='vlozkes'){f=1;}
//alert(f);
if (f!=-1) {

GM_xmlhttpRequest({
  method: "GET",
  url: "http://os.sweb.cz/geo/geo2.php",
  onload: function(response) {
    var r=  response.responseText;
      //settext("vks2",r.substr(1,2));
      settext2("s2",r.substr(1,2));
      settext2("s3",r.substr(4,6));
      settext2("v2",r.substr(12,2));
      settext2("v3",r.substr(15,6));    
      settext2("gc",r.substr(22,7).trim());
    var k = r.substr(29,10).trim().substr(0,9);
//alert(k);
    var kk="";
      if      (k=="Hlavni me") {kk="1";}
      else if (k=="Stredoces") {kk="2";}
      else if (k=="Jihocesky") {kk="3";}
      else if (k=="Plzensky")  {kk="4";}
      else if (k=="Karlovars") {kk="5";}
      else if (k=="Ustecky k") {kk="6";}
      else if (k=="Liberecky") {kk="7";}
      else if (k=="Kralovehr") {kk="8";}
      else if (k=="Pardubick") {kk="9";}
      else if (k=="Kraj Vyso") {kk="10";}
      else if (k=="Jihomorav") {kk="11";}
      else if (k=="Olomoucky") {kk="12";}
      else if (k=="Moravskos") {kk="13";}
      else if (k=="Zlinsky k") {kk="14";}
      else {kk="";}
      settext2("kraj",kk);    
//focus
     try{document.getElementsByName("captcha")[0].focus();}catch(err){alert(err);}

      //message
    var m = "Vase dnesni kes c. "+r.substr(r.lastIndexOf(' ')+1);
    //alert(m);
    //  document.getElementsByClassName("vkobsah2")[0].innerHTML = m;
    //document.write(r);
    //alert(document.getElementsByClassName("paticka")[0].innerHTML);
      
     try{document.getElementsByName("captcha")[0].focus();}catch(err){alert(err);}
     //try{document.forms[1].elements[9].focus();}catch(err2){}

  }
});
}

function settext(id,txt)
 {
     try{
        var s = document.getElementById(id);
        s.value=txt;
     }catch(err){}
 }

function settext2(name,txt)
 {
     try{
         var s = document.getElementsByName(name)[0];
    //alert(s);
        s.value=txt;
     }catch(err){}
 }

function settext3(name,txt)
 {
     try{
        //alert(name)    ;
         var s = document.getElementsByClassName(name)[0];
        s.value=txt;
     }catch(err){}
 }