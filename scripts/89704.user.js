// Este script tenta permitir "colar" a linha digitável de um boleto
// nos sites do Banco do Brasil e do Bradesco.
//
// Copyright (c) 2010, Ricardo Mendonça Ferreira (ric@mpcnet.com.br)
// Modificado por David Vieira (davidhsv@gmail.com) -> correção do banco do brasil e melhoria de usabilidade
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Baixar videos no Eu vou passar
// @description   
// @namespace     http://userscripts.org/scripts/show/70853
// @include       http://www.euvoupassar.com.br/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @version       2010.11.03
// ==/UserScript==
//
// --------------------------------------------------------------------
// --------------------------------------------------------------------
//
// History:
// --------
// 2010.03.08  1a. versão
// 2010.03.11  Agora funciona também ao pagar boleto pela poupança no BB
//

// Thanks to Shog9 for this idea for making the script work in both
// Chrome and Firefox:
// http://meta.stackoverflow.com/questions/46562
function with_jquery(f) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = "(" + f.toString() + ")(jQuery)";
  document.body.appendChild(script);
};

with_jquery(function($) {
        
      $(document).ready(function(){
                    //alert('a1');
		    $("li.mp4 a").each(function(){ $(this).attr("href",getURL($(this)[0].getAttributeNode('onclick').value));$(this).removeAttr('onclick');});
                    //alert($("li.mp4 a").size());
	    });

function getURL(value) {
  var re = new RegExp("http://.*.mp4");
  var s = "";
  var m = re.exec(value);
  if (m == null) {
    alert("No match");
  } else {
    //s = "Match at position " + m.index + ":\n";
    for (i = 0; i < m.length; i++) {
      s = s + m[i];
    }
    //alert(s);
  }
  return s;
};
    
});