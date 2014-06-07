// ==UserScript==
// @name           Filtrar artículos en Mercadolibre
// @description    Filtra Artículos de mercadolibre según el título del artículo
// @include        http://*.mercadolibre.*/*
// Es necesario editar la variable ignorar para actualizar los filtros.
// 
// ==/UserScript==
var ignora = ["manual","aprend","curso","formulas","biblia","oido espia","grasa","imagenes para","planos","diet","ejercicio","papel","origami","informacion","muscul","amatista","topacio","opalo","diamante","esmeralda","turmelina","jaspe","granate","aventurina","carnelio","onix","rubi","piedra","quilate","moneda","billete","estria","contorno de ojos","reduce","blanque","resultados","acne","arrugas","mancha","gastritis","colitis","ulcera","estría","terapia","alcachofa","estres","rico","secreto","anillo de compromiso","globoflexia","repara","receta","diet","celuli","varice","várice","gana dinero","ebook","e-book","e - book","carta astral","pagina","significado de","ritual","atrae","gana","ley de","guia","Carátulas Para Tus Canciones"];

// Script update Checker by Jarett http://userscripts.org/scripts/show/20145
var SUC_script_num = 86003;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
// end of script update checker

var restr =ignora[0];
for (var x = 1;x<=ignora.length-1;x++){
	restr = restr+"|"+ignora[x];
}

//http://snipplr.com/view/1696/get-elements-by-class-name/
function getElementsByClassName(classname, node) {
if(!node) node = document.getElementsByTagName("body")[0];
var a = [];
var re = new RegExp('\\b' + classname + '\\b');
var els = node.getElementsByTagName("*");
for(var i=0,j=els.length; i<j; i++)
if(re.test(els[i].className))a.push(els[i]);
return a;
}

function ignorar(){
	var articulos=getElementsByClassName("article");
	re = new RegExp('.*?'+ restr,["i"]);
	for (x=0;x<=articulos.length-1;x++){
		if(re.test(articulos[x].getElementsByTagName('h3')[0].innerHTML)){
			articulos[x].parentNode.removeChild(articulos[x]);
		}
	}
	
}
function noads(){
	if (document.getElementById("mclicsWop")!=null) {document.getElementById("mclicsWop").parentNode.removeChild(document.getElementById("mclicsWop"));}
	if (document.getElementById("mclicsSkycrapper")!=null) {document.getElementById("mclicsSkycrapper").parentNode.removeChild(document.getElementById("mclicsSkycrapper"));}
	if (document.getElementById("mclicsBottom")!=null) {document.getElementById("mclicsBottom").parentNode.removeChild(document.getElementById("mclicsBottom"));}
	if (document.getElementsByClassName("trackImage")[0]!=null) {document.getElementsByClassName("trackImage")[0].parentNode.removeChild(document.getElementsByClassName("trackImage")[0]);}
}
noads();
ignorar();