// ==UserScript==
// @id             www.edu.xunta.es/programacions@cafi
// @name           Subir recursos á ferramenta de programacions
// @version        1.0
// @namespace      http://www.edu.xunta.es/web/cafi
// @author         Jose Manuel Pidre
// @description    Facilita subir recursos a ferramenta de programacions. Optimizado para Firefox
// @require  *
// @include        https://www.edu.xunta.es/fprofe/procesaMatricula.do*
// @run-at         document-end
// ==/UserScript==

function botonprogramacions(){


var plantilla = 'Título: "".\nDescrición: .\nDuración:  horas\nContexto da actividade: .\nLicenza: Creative Commons BY-NC-SA (recoñecemento - non comercial - compartir igual).';
var button = document.createElement('button');
    button.setAttribute('type','submit');
    button.setAttribute('onclick','alerta()');
    button.appendChild(document.createTextNode('Nome ficheiro'));
    document.cargarRecursosForm.appendChild(button);
if (document.cargarRecursosForm.descricion.value.length < plantilla.length)
	{
    document.cargarRecursosForm.descricion.value = plantilla;
     }

} //fin proba

var scriptCode = new Array();
scriptCode.push('function alerta(){');
scriptCode.push('if ((document.cargarRecursosForm.descricion.value.length > 154)&&(document.cargarRecursosForm.cicloFormativo.value.length>1)&&(document.cargarRecursosForm.moduloProfesional.value.length>1)&&(document.cargarRecursosForm.tipoRecurso.value>0))');
scriptCode.push('	{');
scriptCode.push('		var nome_ficheiro = document.cargarRecursosForm.cicloFormativo.value + "_" + document.cargarRecursosForm.moduloProfesional.value;');
scriptCode.push('		var str = document.cargarRecursosForm.descricion.value;');
scriptCode.push('		var titulos = str.substring(1,str.indexOf("Descrici")).match(/"([^"]*)"/);');
scriptCode.push('		var title = titulos[1].split(" ");');
scriptCode.push('		var titulo = "";');
scriptCode.push('		var n = str.match(/UD(\d+)/);');
scriptCode.push('		var m = str.match(/A(\d+)/);');
scriptCode.push('		var nx = "xx";');
scriptCode.push('		if (n) { ');
scriptCode.push('			nx = n[1];');
scriptCode.push('			} ');
scriptCode.push('		var ny = "yy";');
scriptCode.push('		if (m) { ny = m[1];}');
scriptCode.push('		for (var i=0;i<title.length;i++) {');
/* scriptCode.push('	   		if  ((title[i].match(/^UD\d+/gi)) || (title[i].match(/^A\d+/gi))) continue;');
scriptCode.push('		if  (title[i].match(/^UD(\d+)/)) {');
scriptCode.push('				var nn = title[i].match(/^UD(\d+)/));');
scriptCode.push('				var nx = nn[1];');
scriptCode.push('			} else if  (title[i].match(/^A(\d+)/)) {');
scriptCode.push('				var nn = title[i].match(/^A(\d+)/));');
scriptCode.push('				var ny = nn[1];');
scriptCode.push('				} else ');
*/ scriptCode.push('				 titulo +="_"+title[i].substring(0,4);}');
scriptCode.push('		var n = document.cargarRecursosForm.tipoRecurso.value;');
scriptCode.push('		if (n == 1)');
scriptCode.push('			nome_ficheiro += "_V000000" + titulo + ".pdf";');
scriptCode.push('		if (n == 2) {');
scriptCode.push('			nome_ficheiro += "_V00"+ nx + "00" + titulo + ".pdf";');
scriptCode.push('			}');
scriptCode.push('		if (n == 3) {');
scriptCode.push('			nome_ficheiro += "_V00"+nx+ny+"_UD"+nx+titulo ;');
scriptCode.push('			}');
scriptCode.push('		if (n == 9) {');
scriptCode.push('			nome_ficheiro += "_V99" + (""+Math.random()).substring(2,6) + titulo;');
scriptCode.push('			}');
scriptCode.push('   } else nome_ficheiro="Por favor, cubra todos os datos";');
scriptCode.push(' window.prompt ("Pulse Ctrl+C para copiar", nome_ficheiro); //window.alert(nome_ficheiro);');
scriptCode.push('recarga(this);');
scriptCode.push('}');
var scriptalerta = "\n"+scriptCode.join("\n")+"\n";
scriptCode.length = 0;
var inject = document.createElement("script");
inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(" + botonprogramacions + ")()"+scriptalerta));
document.body.appendChild(inject);