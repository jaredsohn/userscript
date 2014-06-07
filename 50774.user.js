
// ==UserScript==
// @name          Itu-Yazar-Engelle
// @description   yazar engelleme aparati
// @include       http://www.itusozluk.com/goster.php/*
// ==/UserScript==


var flag=true;

var engellimi=function(giri){
  if(GM_getValue(giri.childNodes[1].childNodes[0].childNodes[1].innerHTML,false))
    return flag;
  
  
  return !flag;
}

var giriler=document.getElementsByTagName("ol")[0].childNodes;

var i=1;

var engelle=function(){


  GM_setValue(this.parentNode.parentNode.childNodes[0].childNodes[1].innerHTML,true);
  this.parentNode.parentNode.parentNode.style.display="none";
  alert(this.parentNode.parentNode.childNodes[0].childNodes[1].innerHTML+" engellendi");
};

for(i=1;i<giriler.length;i=i+2)
{

  var dugme=document.createElement("input");
  dugme.className="but";
  dugme.type="button";
  dugme.value="!!";
  dugme.title="gozum gormesin";

 dugme.addEventListener("click",engelle,false);

  if(engellimi(giriler[i]))
    giriler[i].style.display="none";
  giriler[i].childNodes[1].childNodes[1].appendChild(dugme);


 

}

