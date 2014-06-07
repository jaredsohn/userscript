// ==UserScript==
// @name       Ema_Cursos_ITA
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  ayuda en la validación de cursos
// @include    http://*
// @copyright  2012+, Ismael
// @run-at     document-end
// ==/UserScript==

const ita = "http://administradores.emagister.it/administradores/curso/edit?";

//preposiciones en todos los idiomas
const prep = new Array (" Nello", " Nelle ", " Alla ", " Ed " , " Di ", " Dei ", " D' ", " A "," Da ", " In ", " Con ", " Su ", " Per ", " Tra ", " Fra ", " I ", " Lo ", " La ", " Gli ", " Le ", " L' ", " Uno ", " Del "," Una ", " Un' ", " A "," Ante "," Bajo "," Cabe "," Con "," Contra "," De "," Desde "," En "," Entre "," Hacia "," Hasta "," Para "," Por "," SegÃÂÃÂºn "," Della ", " Dello ", " Segun "," Sin "," So "," Sobre "," Tras ", " After ", " At ", " Behind ", " Beneath ", " Between ", " By ", " Except ", " From ", " Into ", " And ", " Near ", " Off ", " Over ", " Through ", " Until ", " Under ", " Upon ", " Without ", " Above ", " Among ", " Before ", " Below ", " Beside ", " But ", " Down ", " For ", " In ", " Like ", " Of ", " On ", " Since ", " Throughout ", " To ", " Up ", " With ", " Aus ", " Bei ", " Mit ", " Nach ", " Seit ", " Von ", " Zu ", " Durch ", " FÃÂÃÂ¼r ", " Ohne ", " Um ", " Gegen ", " Trotz ", " WÃÂÃÂ¤hrend ", " Wegen ", " An ", " Auf ", " Hinter ", " In ", " Neben ", " ÃÂÃÂber ", " Unter ", " Vor ", " Zwischen ", " El ", " La ", " Los ", " Las ", " Un ", " Una ", " Unos ", " Unas ", " The ", " Der ", " Die ", " Das "," Einer ", " Eine ", " Ein "," Eins "," Einige "," Wenige ", " ÃÂÃÂ ", " En ", " Au ", " Aux ", " Chez ", " Dans ", " DerriÃÂÃÂ¨re ", " Devant ", " E ", " Entre ", " Derriere ", " Le ", " La "," Les "," Un "," Une "," Des ", " Y ");

const sigla = new Array("Ecm","ecm","Osa","Oss","Rspp","Rls","Accp","Haccp","Ohsas"," Uni "," En ","Iso","Pnl","Ccna","Mysql","Cs4","Cs5","Cs6"," It ","Mba","Ip","Pmi","Caf","2D","3D","Prl","Itil","Cctt","Pmp","Uk"," Sig ","Fv","Cd","Pdf","Xp"," Unid ","Ue","Sap","Aspp","Ecdl","Php"," Asp ","Css", "osa","oss","rspp","rls","accp","haccp","ohsas"," uni "," en ","iso","pnl","ccna","mysql","cs4","cs5","cs6"," it ","mba","ip","pmi","caf","2d","3d","prl","itil","cctt","pmp","uk"," sig ","fv","cd","pdf","xp"," unid ","ue","sap","aspp","ecdl","php"," asp ","css");

//ObtenciÃÂÃÂ³n de la URL de la pagina en la que estamos entrando
var dire = document.URL;
dire = dire.slice(0,63);

//Verifica si estamos entrando en el administrador de cursos

if (dire == ita){
//Funcion que modifica el texto transformandolo en formato titulo
	function MaysPrimera(string){
		var arrayWords;
		var returnString = "";
		var len;
		arrayWords = string.split(" ");
		len = arrayWords.length;
		for(i=0;i < len ;i++){
			if(i != (len-1)){
				returnString = returnString+ucFirst(arrayWords[i])+" ";
			}
			else{
				returnString = returnString+ucFirst(arrayWords[i]);
			}
		}
		return returnString = SacameElCase(returnString);
		
	}
    
	//se ocupa de las proposiciones y articulos de todos los idiomas
	function SacameElCase(cadena){
		var pMai, pmin,siglaUP,siglaDOW;
		for(i=0; i<prep.length; i++){
			pMai= prep[i];
			pmin = prep[i].toLowerCase();
			cadena = cadena.replace(new RegExp(pMai,"g"),pmin); //busca todas las prep en la frase y las sostituye con la misma en minuscula
		}
		
		for(i=0; i<sigla.length; i++){
			siglaDOW=sigla[i];
			siglaUP=sigla[i].toUpperCase();
			cadena = cadena.replace(new RegExp(siglaDOW,"g"),siglaUP);
		}
	
		return cadena;
	}
	
	function ucFirst(string){
		return string.substr(0,1).toUpperCase()+string.substr(1,string.length).toLowerCase();
	}
	
	function controlcampos(){
        var permiso_mandar = false;
        if (document.getElementById("titulo").value !=""){
            if(document.getElementById("tipoCurso").selectedIndex != 0){
                    if(document.getElementById("imparticion").selectedIndex != 0){
                        if (document.getElementById("numHorasLectivas").value !=""){
                            if (document.getElementById("programa2").value !=""){
                                //if (evaluachecks()!=0){
                                    permiso_mandar = true;
                                //}
                            }else{permiso_mandar = false;}
                        }else{permiso_mandar = false;}
                    }else{permiso_mandar = false;}
            }else{permiso_mandar = false;}
        }else{permiso_mandar = false;}
        
        return permiso_mandar;
    }
	
	/*function evaluachecks(){
        var n_chekeados=0;
        var snarpa = document.getElementsByName("keywords[]");
        
        for (i=0; i<snarpa.length;i++){
            if (snarpa[i].checked){
                n_chekeados++;
            }
        }
        return n_chekeados;
    }*/
    
    function enviando(estado){
        if(controlcampos()){
            
            var lugar = "ITA";
            var url_curso = document.URL;
            var nombre_curso = document.getElementById("titulo").value;
            var temp = new Array();
            
            temp = url_curso.split("cu_id=");
            var id_curso= temp[1];
            
            setTimeout(function() {
                GM_xmlhttpRequest({
                    method: "POST",
                    url: "http://ematools.giglobaljob.com/validacion.php",
                    data: "nombre_curso="+nombre_curso+"&id_curso="+id_curso+"&url_curso="+url_curso+"&pais="+lugar+"&estado="+estado,
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function(response) {
                    if (response.responseText == 0){
                            window.open("http://ematools.giglobaljob.com/index2.php?nombre_curso="+encodeURI(nombre_curso)+"&id_curso="+encodeURI(id_curso)+"&url_curso="+encodeURI(url_curso)+"&pais="+encodeURI(lugar)+"&estado="+estado, "_blank");
                    }
                    ;},
                    synchronous: true
                });
            },0);
        }
    }
    //*************************************************************************************
    //creo los objetos que corresponden a los botones
    var guardar_validar = document.getElementsByName("submit_guardarvalidar_but")[0];
    var guardar = document.getElementsByName("submit_guardar")[0];
    var eliminar = document.getElementsByName("submit_delete")[0];
    
    //genero los eventos click para los botones de manera que interactuen con Ajax
    guardar_validar.addEventListener("click",function(){return enviando("validado")}, true);
    guardar.addEventListener("click", function(){return enviando("guardado")}, true);
    eliminar.addEventListener("click", function(){return enviando("eliminado")}, true);
    
    //se llenan los campos estandard para agilitar la validaciÃÂÃÂ³n
    
    document.getElementById("titulo").value=MaysPrimera(document.getElementById("titulo").value);

	place = "ITA"
    
    switch(place){
        case "ESP": document.getElementById("codigoAct").selectedIndex =109;
        break;

        case "ITA": document.getElementById("codigoAct").selectedIndex =97;
        break;
        
        case "ING": document.getElementById("codigoAct").selectedIndex =97;
        break;
        
        case "FRA": document.getElementById("codigoAct").selectedIndex =101;
        break;
        
        default: document.getElementById("codigoAct").selectedIndex = 96;
    }
}