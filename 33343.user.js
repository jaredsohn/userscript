// ==UserScript==
// @name           Google Direct Downloads
// @namespace      http://www.dalohe.com
// @description    Search in sites of direct downloads
// @include        http://www.google.*
// ==/UserScript==

var gddMisBusquedas = new Array(new Array("megaupload","megaupload.com/"),
                             new Array("badongo","badongo.com/file/"),
                             new Array("rapidshare","rapidshare.com/files"),
                             new Array("mediafire","mediafire.com/?"),
                             new Array("gigasize","gigasize.com/get.php"),
                             new Array("seriesyonkis","seriesyonkis.com/"),
                             new Array("filefactory","filefactory.com/file/"),
                             new Array("filefront","files.filefront.com"),
                             new Array("megashares","megashares.com/?"),
                             new Array("turboupload","d.turboupload.com/"),
                             new Array("multiply","multiply.com/music"),
                             new Array("sendspace","sendspace.com/file/"));

function gddBusquedasDirectas() {
  var checkDirectas = document.getElementsByName("checkDirectas");
  //var busqueda = '                                                                                                                                                                                                  ';
  var busqueda = '';
  for(j=0;j<150;j++) {
    busqueda += ' ';
  }
  var primero = true;
  for(i=0;i<checkDirectas.length;i++) {
    if(checkDirectas[i].checked){
      //alert(i);
      if(!primero) {
        busqueda += '|';
      } 
      busqueda += '"' + gddMisBusquedas[i][1] + '"';
      primero = false;
    }
  }
  document.getElementsByName("q")[0].value += busqueda;
  document.getElementsByName("f")[0].submit();
}

function gddTodoNada(todo) {
  //alert("hola:" + todo);
  var checkDirectas = document.getElementsByName("checkDirectas"); 
  for(i=0;i<checkDirectas.length;i++) {
    checkDirectas[i].checked = todo;
  }
}

function gddAnadirBusquedas() {

  var eleTbodyg = document.getElementsByName("f")[0].firstChild.firstChild;
  var eleTrg = document.createElement('tr');
  var eletdg = document.createElement('td');
  eletdg.align ="center";
  eletdg.setAttribute("colspan",'3');
  eletdg.id = "nuevoEspacio";
  eleTbodyg.appendChild(eleTrg);
  eleTrg.appendChild(eletdg);
  
  
  var eleTablap = document.createElement('table');
  eleTablap.style.border = "1px solid  C9D7F1";
  var eleTbodyp = document.createElement('tbody');
  eleTbodyp.style.fontSize = "12px";
  eletdg.appendChild(document.createElement('br'));
  eletdg.appendChild(eleTablap);
  eleTablap.appendChild(eleTbodyp);
  
  var i = 0;
  while(i < gddMisBusquedas.length) {
    var eleTrp = document.createElement('tr');
    eleTbodyp.appendChild(eleTrp);
    for (j=0;j<3;j++) {
      var eletdp = document.createElement('td');
      eleTrp.appendChild(eletdp);
      if (i < (gddMisBusquedas.length-3)) {
        var elecheckp = document.createElement('input');
        elecheckp.type = "checkbox";
        elecheckp.name = "checkDirectas";
        eletdp.appendChild(elecheckp);
        eletdp.appendChild(document.createTextNode(gddMisBusquedas[i][0]));
      } else {
        if ((i+3) == gddMisBusquedas.length || (i+2) == gddMisBusquedas.length) {
          eletdp.style.textAlign = "center"; 
          var eleLinkp = document.createElement('a');
          eleLinkp.style.color = "#0000EE";
          eleLinkp.href = "#";
          var texto = "todos";
          if((i+2) == gddMisBusquedas.length) {
            var texto = "ninguno";
            eleLinkp.addEventListener("click",function(){gddTodoNada(false);}, false);          
          } else {
            eleLinkp.addEventListener("click",function(){gddTodoNada(true);}, false);        
          }
          eleLinkp.appendChild(document.createTextNode(texto));
          eletdp.appendChild(eleLinkp);
          
        } else if ((i+1) == gddMisBusquedas.length) {
          eletdp.style.textAlign = "right"; 
          var eleBoton = document.createElement('input');
          eleBoton.type= "button";
          eleBoton.value = "Buscar"
          eleBoton.addEventListener("click", gddBusquedasDirectas, false);
          eletdp.appendChild(eleBoton);
        } 
      }
      i++;    
    }
  }
}
gddAnadirBusquedas();
 
