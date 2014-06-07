// ==UserScript==
// @name           Google Direct Downloads
// @namespace      http://www.google.com
// @description    Search in sites of direct downloads
// @include        http://www.google.*
// @include		http://*.google.*
// ==/UserScript==

var searchCheckList = new Array(new Array("Megaupload","site:megaupload.com"),
                             new Array("Badongo","site:badongo.com"),
                             new Array("Rapidshare","site:rapidshare.com"),
                             new Array("Mediafire","site:mediafire.com"),
                             new Array("Gigasize","site:gigasize.com"),
                             new Array("Seriesyonkis","site:seriesyonkis.com"),
                             new Array("Filefactory","site:filefactory.com"),
                             new Array("Multiply","multiply.com/music"),
                             new Array("Filefront","site:files.filefront.com"),
                             new Array("Megashares","site:megashares.com"),
                             new Array("Turboupload","d.turboupload.com/"),
                             new Array("Sendspace","sendspace.com/file/"));

function LinkSearch() {
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
      busqueda += ' ' + searchCheckList[i][1] + ' ';
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
  while(i < searchCheckList.length) {
    var eleTrp = document.createElement('tr');
    eleTbodyp.appendChild(eleTrp);
    for (j=0;j<3;j++) {
      var eletdp = document.createElement('td');
      eleTrp.appendChild(eletdp);
      if (i < (searchCheckList.length-3)) {
        var elecheckp = document.createElement('input');
        elecheckp.type = "checkbox";
        elecheckp.name = "checkDirectas";
        eletdp.appendChild(elecheckp);
        eletdp.appendChild(document.createTextNode(searchCheckList[i][0]));
      } else {
        if ((i+3) == searchCheckList.length || (i+2) == searchCheckList.length) {
          eletdp.style.textAlign = "center"; 
          var eleLinkp = document.createElement('a');
          eleLinkp.style.color = "#0000cc";
          eleLinkp.href = "#";
          var texto = "Select All";
          if((i+2) == searchCheckList.length) {
            var texto = "Unselect All";
            eleLinkp.addEventListener("click",function(){gddTodoNada(false);}, false);          
          } else {
            eleLinkp.addEventListener("click",function(){gddTodoNada(true);}, false);        
          }
          eleLinkp.appendChild(document.createTextNode(texto));
          eletdp.appendChild(eleLinkp);
          
        } else if ((i+1) == searchCheckList.length) {
          eletdp.style.textAlign = "right"; 
          var eleBoton = document.createElement('input');
          eleBoton.type= "button";
          eleBoton.value = "Search Links"
          eleBoton.addEventListener("click", LinkSearch, false);
          eletdp.appendChild(eleBoton);
        } 
      }
      i++;    
    }
  }
}
gddAnadirBusquedas();