// ==UserScript==
// @name           travi piac
// @namespace      travi piac
// @description    travi piac
// @include        http://*.travian.*/build.php?id=25
// ==/UserScript

  if(document.getElementById("lright1").lastChild.rows.length>1){
    falvak=new Array();
    txt="<select name=dname>";
    for(i=0;i<document.getElementById("lright1").lastChild.rows.length;i++){
      obj=document.getElementById("lright1").lastChild.rows[i]
      falvak[i]=obj.childNodes[0].lastChild.textContent;
      txt+="<option value='"+falvak[i]+"'>"+falvak[i]+"</option>";
    }
    txt+="<option onClick=\"this.value=this.innerHTML=prompt('Írd be a nevét!\n write the name!')\">Nincs a listában/No in list</option>"
    txt+="</select>"
    document.getElementsByName("dname")[0].parentNode.innerHTML="<span class=\"f135 b\">Falu:</span>\n\n"+txt
  }