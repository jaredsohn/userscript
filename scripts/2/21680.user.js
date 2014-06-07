// ==UserScript==
// @name          ubuntuChile
// @namespace     http://jbz.wikidot.com
// @description   Arregla algunas cositas de ubuntuchile
// @include       http://www.ubuntuchile.com/*
// @include       http://*ubuntuchile.com/*
// @include       http://*ubuntuchile.cl/*
// @include       http://ubuntuchile.cl/*
// ==/UserScript==


// este escript todavia no lo envio a jslint...

function addJS(a){
    var b = document.getElementsByTagName('head')[0];
    if (!b) {
        return;
    }
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.innerHTML = a;
    b.appendChild(c);
}

function getParam(a){
    var b = window.location.href;
    if (a) {
        var c = "[\\?&]" + a + "([^&#]*)";
        var d = new RegExp(c);
        return d.exec(b);
    }
    
}

mejorarTextArea = function(){
  /*
    el principal problema de ubuntuChile era que
    las text areas eran bastantes flaites a si que esto
    lo arregla
	
  */
    var textArea = document.evaluate('//textarea[@class="tbox"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
    var divT;
    
    if (!textArea){return;}
    
    textArea.style.overflow = 'scroll';
    textArea.rows = 10;
    textArea.cols = 100;
    
    
    if (!textArea.id) {
        divT = document.createElement('div');
        divT.innerHTML = "\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/link.png\" alt=\"\" title=\"Insertar enlace: [link]http://misitio.com[/link] ó  [link=http://tusitio.com]Visite Mi Sitio[/link]\" onclick=\"addtext('[link=hyperlink url][/link]')\">\n\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/bold.png\" alt=\"\" title=\"Negrita: [b]Este texto se mostrará en negrita[/b]\" onclick=\"addtext('[b][/b]')\">\n\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/italic.png\" alt=\"\" title=\"Cursiva: [i]Este texto se mostrará en cursiva[/i]\" onclick=\"addtext('[i][/i]')\">\n\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/underline.png\" alt=\"\" title=\"Subrayado: [u]Este texto se mostrará subrayado[/u]\" onclick=\"addtext('[u][/u]')\">\n\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/image.png\" alt=\"\" title=\"Insertar imagen: [img]mi_imagen.jpg[/img]\" onclick=\"addtext('[img][/img]')\">\n\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/center.png\" alt=\"\" title=\"Centrar: [center]Este texto se mostrará centrado[/center]\" onclick=\"addtext('[center][/center]')\">\n\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/left.png\" alt=\"\" title=\"Izquierda: [left]Este texto se mostrará alineado a la izquierda[/left]\" onclick=\"addtext('[left][/left]')\">\n\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/right.png\" alt=\"\" title=\"Derecha: [right]Este texto se mostrará alineado a la Derecha[/right]\" onclick=\"addtext('[right][/right]')\">\n  \n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/blockquote.png\" alt=\"\" title=\"Comillas: [blockquote]Este texto aparecerá entre comillas[/blockquote]\" onclick=\"addtext('[blockquote][/blockquote]')\">\n\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/code.png\" alt=\"\" title=\"Código - texto preformateado: [code]$foo = bah;[/code]\" onclick=\"addtext('[code][/code]')\">\n\n<img class=\"bbcode bbcode_buttons\" style=\"cursor: pointer;\" src=\"../../e107_images/generic/bbcode/list.png\" alt=\"\" title=\"Desordenado: [list]line1*line2*line3[/list] Ordenado: [list=type]line1*line2*line3[/list]\" onclick=\"addtext('[list][/list]')\">\n"
        textArea.parentNode.appendChild(divT)
    }
};


mejorarCambioPagina = function(){
  /*mejora el foro para que puedas ver todas las respuestas en un sola pagina
   de tal manera que no tengas que cargar datos y datos inecesarios
  */
  
  if (!getParam('.')){return ;}
  
  var selectArea = document.evaluate('//select[@class="tbox npdropdown"]',
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                       null)
                            .snapshotItem(0);
    
    if(!selectArea){return ;}
    
    var opt0;
    var optf = [];
    var startPage;
    var i;
    var tableOfPost = document.evaluate('//table[@class="fborder"]',
                                       document,
                                       null,
                                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                       null)
                                .snapshotItem(1);    
    opt0 = selectArea.childNodes
    for(i=0;i<opt0.length;i++){
        if(opt0[i].value){
            optf.push(opt0[i])
            if(opt0[i].selected){
                startPage = optf.length;
            }
            
        }
    }
    
  for (i = startPage;i<optf.length;i++){
    tr = document.createElement('tr');
    td = document.createElement('td');
    in1 = document.createElement('input');
    in2 = document.createElement('input');
    in3 = document.createElement('input');
    
    td.setAttribute('class','finfobar');
    td.setAttribute('colspan','2');
    td.style.textAlign = 'center';
    
    in1.setAttribute('class',"button");
    in1.setAttribute('type',"button");
    in1.setAttribute('value',"Ir a la pagina "+ (i+1) );
    in1.setAttribute('onclick','location.assign("'+ optf[i].value +'")');
    
    in2.setAttribute('class',"button");
    in2.setAttribute('type',"button");
    in2.setAttribute('value',"Mostrar la pagina "+ (i+1) );
    in2.setAttribute('onclick','autoLoadNewPage(this,"'+optf[i].value+'",'+i+')')
    
    in3.setAttribute('type',"hidden");
    in3.setAttribute('value',"0");
    
    
    
    td.appendChild(in1);
    td.appendChild(in2);
    td.appendChild(in3);
    
    
    tr.appendChild(td);
    tableOfPost.lastChild.insertBefore(tr,tableOfPost.lastChild.lastChild);
    }
    
  addJS( // la funcion que se encarga de poner la nueva pagina
    function autoLoadNewPage(obj,url,pag){
      if (obj.nextSibling.value === "0"){
        obj.value = 'Ocutar la pagina ' + (pag+1);
        
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var spinner = document.createElement('img');
        var spn = document.createElement('span');
        
        spn.innerHTML = "cargando contenido"
        spinner.src = "data:image/gif,GIF89a6%007%00%F3%00%00%FF%FF%FF%00%00%00xxx%1C%1C%1C%0E%0E%0E%D8%D8%D8TTT%DC%DC%DC%C4%C4%C4HHH%8A%8A%8A%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%1ACreated%20with%20ajaxload.info%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CC%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9E%25%92%10D%82%A0%A7%C2%CE%84%02%93%08M%BFw%B8%EA%ACD%2F%04%A4%0DA%C5%D9%F1%F3%03%0A%97%9D%5C%91w%2C%18X%86%02F%A6%B3-%0B%03%DA%40%7BQ%05%A9%16%C1%60%20%18%5Du%06%93%80%D6%26%16M%E1%D9%40%94%C4%8BEo4q%25s3u%20%07y%2C%03%07'jl%24%07o%06%8DP%96%97%98%99%9A%9B%9C%9D%9E%1C%8F%87%96%A1%1A%85%2C%A2G%A6%04%A8%14%8A%04%7B%96%AE%B0%17%B2%97%B5%18%AA%AC%3D%B9%A5k%BAC%A4%9F%C2%C3%C4%C5%C6%C7%C8%9B%C1%8E%BE%24%BCrt%23%B7%25%D3%20%D5%D2%7F%22%CF%84%D1%23%CBr%CD%C9%9E%DF%C5%DB%C5%D7%C3%E8%C2%E6%E5%E1%E2%EF%3D%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CE%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%16%06A%18%85Z%16%83%EB%0E%B1%2C%B6%B6k%E8%A2%5E%0F%18%12%DA%88%20%5E%EF%87%F4%1Cj%B6%C1%E1%82H%B8%12%88%A6%E4%C03L-%0A%A3b%24%18%0C%04%26%84%D1%95%05%09zh%92u%9D%08Ao%A5%F5%11t'%0C%F2z%04!o6q%23sFu%83f%86%23jkmZ%1AaBc%92%1CUW%91%97%9C%9D%9E%9F%A0%A1n%8C%97eg%1A%84.%8D%40%A9%04%AB%14%7D%7FM%B1%19%B4%B3%3D%B2%17%AD%AF2%BB%A8%A4%92%A6%BC%A2%C4%C5%C6%C7%C8%C9%CA'%C2)%CDdp%CC%D1%22%B6%25%D5%7C%B8'%D7%1F%BE%26%DD%22%CF%CC%C0%CB%9E%E1%C7%DF%C6%DB%C4%EA%A2%E8%C6%E6%E4%F1'%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CE%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%99%2B%18j%86%02Iy%24%15v%B6%814T%ACUEO%1E%C1%00%CC%9A%C4%B6rMHB%D7D%DD%9B)%CC%23%C3__%D1%01%BB%3E0%3B%07a%06~%7F%85%86%87%88%89%8A%12%08%095%09%08%8B%15%0Ah%0A%19TC%08n%04%91%16qy)%8En%09%17%7C%3D%3F%9Bo%16%A6l%2C%A9%04%17%9F%3F%A2h%A4%B1x%99%9B%9D%92%94b%96%92%13%8D%8F%BB%C0%C5%C6%C7%C8%C9%13%98(%CCp%3C%A0D%D0%23%AC'%D5j%A7%26%D7%5C%D3%26%B2%23%CE%DE%B8%CA%88%E1%C5%DF%C6%DB%C5%EA%C0%E8%C6%E6%E4%F1%26%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CD%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%C94)%8F%CE%17%94%C8%9B%8A%8A5kgg%13%96%B85%2F%08%DC%3B%91%C5%C9%EA%09%7B%23%3DS%EF%A6%7CN%AF%DB%EF%F8%BC%AA%60%A8%19%0A%1Aq%3F%05g%80%17lZ)%7D%3C%04%06%18gC%8C6%8FA%91%92%04%18%88C%8B%3C%8E%99RH%07g%07z%13%07%8B%06%A4%A5%AB%AC%AD%AE'%08%095%09%08%AC%0A%92%0A%23%82%23%08%97%04%B5TF%25%B2%97%09!%90%24%BE5%C7%95%C9%CA!%9A%24%C4%92%C6%D0%A0%25%BD%97%C0y%B7%8C%B9H%BB%15%B1%B3%DB%3F%D1%AB%C8%E8%CD%AB%E7%EC%D7%AF%F0%2B%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CB%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%C94)%8F%CE%17%94%C8%9B%8A%8A5kgg%13%96%B85%2F%08%DC%3B%91%C5%C9%EA%09%7B%23%3DS%EF%A6%7CN%AF%DB%EF%F8%3C%3E%8E%E4_%D8Z*%80%19gH%85%18%87%3F%89%16%83C%8D%18~%3F%91z%94%95%96%97%98%99L%05%065%06%05nR'%05g%A0!%8F%23%9D%3C%04%06%40%5D%26%AB6%AEa%B0%B1%04Wj%25%AA%3C%ADW%A2%19%08%095%09%08%17%07g%07C%0A%B1%0A%C6%AA%06%C9%3F%08%B6%04%C5y%C2%B6%09z%D45%DB%DCz%D8%B1%DAy%D3%B6%D6y%CB%AB%CD%95%C1%C3%E7%22%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CC%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%C94)%8F%CE%17%94%C8%9B%8A%8A5kgg%13%96%B85%2F%08%DC%3B%91%C5%C9%EA%09%7B%23%3DS%EF%A6%7CN%AF%DB%EF%F8%3C%3E%8E%E4_%D8Z*%80%19gH%85%18%87%3F%89%16%83C%8D%18~%3F%91z%94%95%96%97%98%00%08%095%09%08%96%0A%3C5%0A%94%08%A26%9F3R%22%9C%A7%04%093j%20%AE6_A!%B45%B6%5D!%AD%A7%B0n%B2%1F%A6%AE%A9n%AB%22%A1%A2%A4%17%05%065%06%05H%9B%9D%C6%15%05g%D2%94%CF%A2%06%95%B4%DF%AE%95%DC%3C%DE%94%07g%07%96%07%DC%06%EA%99(%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CC%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%C94)%8F%CE%17%94%C8%9B%8A%8A5kgg%13%96%B85%2F%08%DC%3B%91%C5%C9%EA%09%7B%23%3DS%EF%A6%7CN%AF%DB%EF%22D%A2%96%40%E0%2B%0A%3C5%0A%7F%12%08%826~%3Fq%16%7B%88%04%09%8Bj%16%8F6%3Fg%17%955%97A%17%8E%88%919lZ%87%8F%8A%A2R%19%81%82%84%85%86%8E%7D%AE%B2%B3%B4%B5L%05%065%06%05%B3%05g%BCQK%22%B9%82%06N%93%20%95%26%98!%CA_%9D!%C4%3C%C63%C8%1F%07g%07k%A9%23%07%C4%06%DA%B6%1D%8C%B2%A3%B4%CC%B2%E8%AE%E6%B4%E4%E2%EF'%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CC%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1~%88D-%81%D0%B8%60C%80%82WSD9%08%AA%AD9%7B%1D%3FJ-!1%E3%7D%3Bb%5Big%13~%D2%B5u0%14%D6%92I%C5%DA%19%9B%E6%E2%BD%23STVWXaL%85%89%8A%8B%8C%8DW%05%065%06%05%8E%16%05l5%03%94CO%7B%13%91T%06%9Cf%18iC%98%3D%A5b%A7s%17%A0%3C%A2%3Fy7%18%07%A8%03%07Q%9D%1A%07%A0%06%B9%95%C1%C2%C3%C4%C5%C6%C7%1D%BB(%CA%22%B3%9ED%A4%40m'%B7%23%D5%26%D7!%CE'%DB%23%CC%26%DF%C8%89%E1%C2%DD%C4%D9%C3%E8%E5%D1%C5%E4%E2%EF%25%11%00%3B%00%00%00%00%00%00%00%00%00"; //"http://img.squidoo.com/ajax-loader-spinner.gif";
        td.setAttribute('class','finfobar');
        td.setAttribute('colspan','2');
        td.style.textAlign = 'center';
        
        td.appendChild(spinner);
        td.appendChild(document.createElement('br'));
        td.appendChild(spn);
        
        tr.setAttribute('id','JBZ_temp_'+pag)
        
        tr.appendChild(td);
        
        obj.parentNode.parentNode.nextSibling.insertBefore(tr);
        
        obj.nextSibling.value='1';
      }else if (obj.nextSibling.value === "1"){
        obj.value = 'Mostrar la pagina ' + (pag+1);
        obj.nextSibling.value='2';
      }else{
        obj.value = 'Ocutar la pagina ' + (pag+1);
        obj.nextSibling.value='1';
      }
      
    }
  );
}

autoLoadPost = function (){
  /*
   la idea es tratar de que al postear
   automaticamente te lleve a tu respuesta
   y no que se quiede preguntandote como idiota
                     */
  
  if ((new RegExp('.*?/usersettings.php')).exec(window.location.href)){
    /*
     esta parte evita que cuando quieras cambiar de perfil crea que estas redireccionandote
    */
    return;
  }

  var r = document.evaluate('//span[@class="defaulttext"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  var inp = document.evaluate('//input[@name="email_notify"]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null)
    .snapshotItem(0)
    if (r && !inp){
      var spinner = document.createElement('img');
      var Div1 = document.createElement('div');
      var counter = document.createElement('span');
      var opt1;
      var opt2;
      var wTime = 7;
    
      spinner.src = "data:image/gif,GIF89a6%007%00%F3%00%00%FF%FF%FF%00%00%00xxx%1C%1C%1C%0E%0E%0E%D8%D8%D8TTT%DC%DC%DC%C4%C4%C4HHH%8A%8A%8A%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%FE%1ACreated%20with%20ajaxload.info%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CC%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9E%25%92%10D%82%A0%A7%C2%CE%84%02%93%08M%BFw%B8%EA%ACD%2F%04%A4%0DA%C5%D9%F1%F3%03%0A%97%9D%5C%91w%2C%18X%86%02F%A6%B3-%0B%03%DA%40%7BQ%05%A9%16%C1%60%20%18%5Du%06%93%80%D6%26%16M%E1%D9%40%94%C4%8BEo4q%25s3u%20%07y%2C%03%07'jl%24%07o%06%8DP%96%97%98%99%9A%9B%9C%9D%9E%1C%8F%87%96%A1%1A%85%2C%A2G%A6%04%A8%14%8A%04%7B%96%AE%B0%17%B2%97%B5%18%AA%AC%3D%B9%A5k%BAC%A4%9F%C2%C3%C4%C5%C6%C7%C8%9B%C1%8E%BE%24%BCrt%23%B7%25%D3%20%D5%D2%7F%22%CF%84%D1%23%CBr%CD%C9%9E%DF%C5%DB%C5%D7%C3%E8%C2%E6%E5%E1%E2%EF%3D%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CE%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%16%06A%18%85Z%16%83%EB%0E%B1%2C%B6%B6k%E8%A2%5E%0F%18%12%DA%88%20%5E%EF%87%F4%1Cj%B6%C1%E1%82H%B8%12%88%A6%E4%C03L-%0A%A3b%24%18%0C%04%26%84%D1%95%05%09zh%92u%9D%08Ao%A5%F5%11t'%0C%F2z%04!o6q%23sFu%83f%86%23jkmZ%1AaBc%92%1CUW%91%97%9C%9D%9E%9F%A0%A1n%8C%97eg%1A%84.%8D%40%A9%04%AB%14%7D%7FM%B1%19%B4%B3%3D%B2%17%AD%AF2%BB%A8%A4%92%A6%BC%A2%C4%C5%C6%C7%C8%C9%CA'%C2)%CDdp%CC%D1%22%B6%25%D5%7C%B8'%D7%1F%BE%26%DD%22%CF%CC%C0%CB%9E%E1%C7%DF%C6%DB%C4%EA%A2%E8%C6%E6%E4%F1'%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CE%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%99%2B%18j%86%02Iy%24%15v%B6%814T%ACUEO%1E%C1%00%CC%9A%C4%B6rMHB%D7D%DD%9B)%CC%23%C3__%D1%01%BB%3E0%3B%07a%06~%7F%85%86%87%88%89%8A%12%08%095%09%08%8B%15%0Ah%0A%19TC%08n%04%91%16qy)%8En%09%17%7C%3D%3F%9Bo%16%A6l%2C%A9%04%17%9F%3F%A2h%A4%B1x%99%9B%9D%92%94b%96%92%13%8D%8F%BB%C0%C5%C6%C7%C8%C9%13%98(%CCp%3C%A0D%D0%23%AC'%D5j%A7%26%D7%5C%D3%26%B2%23%CE%DE%B8%CA%88%E1%C5%DF%C6%DB%C5%EA%C0%E8%C6%E6%E4%F1%26%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CD%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%C94)%8F%CE%17%94%C8%9B%8A%8A5kgg%13%96%B85%2F%08%DC%3B%91%C5%C9%EA%09%7B%23%3DS%EF%A6%7CN%AF%DB%EF%F8%BC%AA%60%A8%19%0A%1Aq%3F%05g%80%17lZ)%7D%3C%04%06%18gC%8C6%8FA%91%92%04%18%88C%8B%3C%8E%99RH%07g%07z%13%07%8B%06%A4%A5%AB%AC%AD%AE'%08%095%09%08%AC%0A%92%0A%23%82%23%08%97%04%B5TF%25%B2%97%09!%90%24%BE5%C7%95%C9%CA!%9A%24%C4%92%C6%D0%A0%25%BD%97%C0y%B7%8C%B9H%BB%15%B1%B3%DB%3F%D1%AB%C8%E8%CD%AB%E7%EC%D7%AF%F0%2B%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CB%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%C94)%8F%CE%17%94%C8%9B%8A%8A5kgg%13%96%B85%2F%08%DC%3B%91%C5%C9%EA%09%7B%23%3DS%EF%A6%7CN%AF%DB%EF%F8%3C%3E%8E%E4_%D8Z*%80%19gH%85%18%87%3F%89%16%83C%8D%18~%3F%91z%94%95%96%97%98%99L%05%065%06%05nR'%05g%A0!%8F%23%9D%3C%04%06%40%5D%26%AB6%AEa%B0%B1%04Wj%25%AA%3C%ADW%A2%19%08%095%09%08%17%07g%07C%0A%B1%0A%C6%AA%06%C9%3F%08%B6%04%C5y%C2%B6%09z%D45%DB%DCz%D8%B1%DAy%D3%B6%D6y%CB%AB%CD%95%C1%C3%E7%22%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CC%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%C94)%8F%CE%17%94%C8%9B%8A%8A5kgg%13%96%B85%2F%08%DC%3B%91%C5%C9%EA%09%7B%23%3DS%EF%A6%7CN%AF%DB%EF%F8%3C%3E%8E%E4_%D8Z*%80%19gH%85%18%87%3F%89%16%83C%8D%18~%3F%91z%94%95%96%97%98%00%08%095%09%08%96%0A%3C5%0A%94%08%A26%9F3R%22%9C%A7%04%093j%20%AE6_A!%B45%B6%5D!%AD%A7%B0n%B2%1F%A6%AE%A9n%AB%22%A1%A2%A4%17%05%065%06%05H%9B%9D%C6%15%05g%D2%94%CF%A2%06%95%B4%DF%AE%95%DC%3C%DE%94%07g%07%96%07%DC%06%EA%99(%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CC%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1%86%1F%17%0C%C94)%8F%CE%17%94%C8%9B%8A%8A5kgg%13%96%B85%2F%08%DC%3B%91%C5%C9%EA%09%7B%23%3DS%EF%A6%7CN%AF%DB%EF%22D%A2%96%40%E0%2B%0A%3C5%0A%7F%12%08%826~%3Fq%16%7B%88%04%09%8Bj%16%8F6%3Fg%17%955%97A%17%8E%88%919lZ%87%8F%8A%A2R%19%81%82%84%85%86%8E%7D%AE%B2%B3%B4%B5L%05%065%06%05%B3%05g%BCQK%22%B9%82%06N%93%20%95%26%98!%CA_%9D!%C4%3C%C63%C8%1F%07g%07k%A9%23%07%C4%06%DA%B6%1D%8C%B2%A3%B4%CC%B2%E8%AE%E6%B4%E4%E2%EF'%11%00!%F9%04%09%0A%00%00%00%2C%00%00%00%006%007%00%00%04%CC%10%C8I%AB%BD8%EB%CD%BB%FF%60(%8Edi%9Eh%AA%AE%AC0%0C%02%5B%0ADM%C4%B28%D8%C4%90%EB%3C%DF%0FD%B3%E1~%88D-%81%D0%B8%60C%80%82WSD9%08%AA%AD9%7B%1D%3FJ-!1%E3%7D%3Bb%5Big%13~%D2%B5u0%14%D6%92I%C5%DA%19%9B%E6%E2%BD%23STVWXaL%85%89%8A%8B%8C%8DW%05%065%06%05%8E%16%05l5%03%94CO%7B%13%91T%06%9Cf%18iC%98%3D%A5b%A7s%17%A0%3C%A2%3Fy7%18%07%A8%03%07Q%9D%1A%07%A0%06%B9%95%C1%C2%C3%C4%C5%C6%C7%1D%BB(%CA%22%B3%9ED%A4%40m'%B7%23%D5%26%D7!%CE'%DB%23%CC%26%DF%C8%89%E1%C2%DD%C4%D9%C3%E8%E5%D1%C5%E4%E2%EF%25%11%00%3B%00%00%00%00%00%00%00%00%00"; //"http://img.squidoo.com/ajax-loader-spinner.gif";
      counter.innerHTML ="Se volvera a su mensaje en <b id='secsJBZ'>"+wTime+"</b> segundos";
      opt1 = "window.location = '"+r.firstChild.href+"';";
      opt2 = "JBZCNTR--;document.getElementById('secsJBZ').innerHTML = JBZCNTR;window.setTimeout(JBZCTDN,1000);";
      
      Div1.appendChild(spinner);
      Div1.appendChild(counter);
      
      r.appendChild(document.createElement('br'));
      r.appendChild(Div1);
      
      addJS("var JBZCNTR = "+wTime+";function JBZCTDN(){if(JBZCNTR>0){"+opt2+"}else{"+opt1+"}};JBZCTDN();");
      
    }
    
}

noEmailNotify = function (){
  /*
   la idea es que por defecto las notificaciones por email,
   al empezar un nuevo tema, esten apagadas.
  */
  if (getParam('nt.')){
    document.evaluate('//input[@name="email_notify"]',
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null)
    .snapshotItem(0)
    .checked = false;
      
  }    
}


beterPostDisplay = function(){
  /*
    mejora el display de las imagenes
    en el foro, para que este no se descuadre
    cuando alguien agrege imagenes muy grandes
  */
  
  
  var r = document.evaluate('//img[@class="bbcode"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var x;
  var y;
  var item;
  
  for (i=0;i<r.snapshotLength;i++){
    item = r.snapshotItem(i)
    if (item.width>500){
      x = item.width;
      y = item.height;
      item.width = 500;
      item.height = (y/x)*500;
    }
  }
}

mejorarTextArea();
//mejorarCambioPagina();
autoLoadPost();
window.setTimeout(beterPostDisplay,2000);
noEmailNotify();





