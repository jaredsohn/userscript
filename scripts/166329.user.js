// ==UserScript==
// @name           Mostrar PDF No EAD
// @description    Este script mostra em todas as paginas, um link direto para o pdf do documento
// @include        http://www.viannavirtual.com.br/ead/mod/resource/view.php*
// @version        1.1
// @author	   facebook.com/danielctrl
// ==/UserScript==



var x = document.getElementsByTagName("object")[0].data;
var b = document.getElementsByTagName("body")[0];



var node = document.createElement("span");
node.style.position = "fixed";
node.style.right = "15px";
node.style.top = "15px";
node.style.backgroundColor = "#ccc";



var nodeA = document.createElement("a");
nodeA.href = x;
nodeA.innerHTML = "Clique aqui para acessar o PDF";



node.appendChild(nodeA);



b.appendChild(node);