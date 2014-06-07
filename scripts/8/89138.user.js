scr_meta=<><![CDATA[ 
// ==UserScript==
// @name           eSecretario VBETA
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://*.erepublik.com/*
// @require http://sizzlemctwizzle.com/updater.php?id=89138&days=1
// @version 1.8
// @fecha 21:40 22/12/2010
// ==/UserScript==
]]></>.toString(); 


//--->Variables globales

 urll = top.location;
var rn;
versionobs= "1.8"
//<---Variables globales

//--->Todaspartes

d = new Date();
d1= (d.getDate()+1)


var month=new Array(12);
month[0]="Jan";
month[1]="Feb";
month[2]="Mar";
month[3]="Apr";
month[4]="May";
month[5]="Jun";
month[6]="Jul";
month[7]="Aug";
month[8]="Sep";
month[9]="Oct";
month[10]="Nov";
month[11]="Dec";

d1+=" "+month[d.getMonth()];

d1+=" " + d.getFullYear()

var $j = jQuery.noConflict();


var idpais= document.getElementById("side_bar_natural_currency_id").innerHTML
		//--------->GALLETAS ;)
		
		function egalleta(nombre,valor)
			{
			document.cookie=nombre+ "="+ valor+"; expires = 2 Dec 2020 23:59:59 GMT"
			}
		function egalleta1dia(nombre,valor)
			{
			
			document.cookie=nombre+ "="+ valor+"; expires = "+d1+" 23:59:59 GMT"
			}
		
		function galleta(nombre) 
			{
   			a = document.cookie.substring(document.cookie.indexOf(nombre + '=') + nombre.length + 1,document.cookie.length);
  			if(a.indexOf(';') != -1)a = a.substring(0,a.indexOf(';'))
  			return a; 
			}
			/*egalleta1dia("actualizacion","0")
			var seactualiza=""
			var seactualiza= galleta("actualizacion")
			seactualiza.toString();
			alert(seactualiza)
			if(seactualiza.length>="2"){alert("si")}*/
		//<---------GALLETAS ;)
			

	//-->actualizar
		function str2xml(strXML) {
			var objDOMParser = new DOMParser() ;
			var objDoc = objDOMParser.parseFromString(strXML, "text/xml" ) ;
			return objDoc;
		}
	if(GM_getValue("actualizar","0")=="0"){
	GM_xmlhttpRequest({
			method: "GET",
			url: "http://proyectobladir.co.cc/esecretario/version.php",
			data: "",
			headers: { },
			onload: function(response) {
				
				var xmlcargado=str2xml(response.responseText);
				
				var versionactual=response.responseText
				
				if(versionobs<versionactual){
			if (confirm('Hay una nueva versión de eSecretario('+versionactual+'), Â¿Actualizar?\n\nSi este aviso sigue apareciendo copie el siguiente \nlink en la barra de navegación y presione Enter\n\nhttp://userscripts.org/scripts/source/89138.user.js')) { window.open('http://userscripts.org/scripts/source/89138.user.js'); void('')}
			else{
				if (confirm('¿Desea desactivar la actualización automatica?\n\n\nSe puede volver a activar desde el menÃº información \nde erepublik>Activar actualización automatica de eSecretario.')) {GM_setValue("actualizar","1") }
			}
			}
			}});
	}

	//<--actualizar
	

//<---Todaspartes

//--->Página empleados

//>>>>vars2
if (urll.toString().indexOf("employees")!=-1){ 


var $j = jQuery.noConflict();
var currency = $j(".ecur").eq(0).text();
var getJSON = function(jsonstr,key) {
	var index = jsonstr.indexOf(key);
	if(index == -1) {	
		return "";
	}
	var startIndex = index + key.length + 3;
	var endIndex = jsonstr.indexOf("\"" , startIndex);
	if(endIndex == -1) {
		return "";
	}
	return jsonstr.substring(startIndex,endIndex);
};

//<<<<<vARS2



	//---->DENTRO
		//----->datos de compaÃ±ia
		
		var id_0 = $j("#company_header>a").attr("href")
		var id_1 = id_0.split("/")
		id_1.reverse();
		id_1.pop()
		id_1.pop()
		id_1.pop()
		id_1.pop()
		
		apixml= "http://api.erepublik.com/v2/feeds/companies/"+id_1+".xml"
			GM_xmlhttpRequest({
			method: "GET",
			url: apixml,
			data: "",
			headers: { },
			onload: function(response) {
				var xmlcargado=str2xml(response.responseText); 
				calidad= xmlcargado.getElementsByTagName('customization-level')[0].childNodes[0].nodeValue; 
				/*ya no figura en la api industria= xmlcargado.getElementsByTagName('industry')[0].getElementsByTagName('name')[0].childNodes[0].nodeValue; 
				if(industria=="Weapons"){  rn=60}
				if(industria=="Iron"||industria=="Grain"||industria=="Stone"||industria=="Oil"||industria=="Titanium"){  rn=1}
				if(industria=="Food"){rn=6}
				if(industria=="Moving Tickets"){rn=60}
				if(industria=="House"){rn=750}
				if(industria=="Defense System"){rn=3450}
				if(industria=="Hospital"){rn=3450}*/
				
			}
			});
			
				industria= $j(".product_type.tooltip").attr("alt")
				if(industria=="Weapons"){  rn=60}
				if(industria=="Iron"||industria=="Grain"||industria=="Stone"||industria=="Oil"||industria=="Titanium"){  rn=1}
				if(industria=="Food"){rn=6}
				if(industria=="Moving Tickets"){rn=60}
				if(industria=="House"||industria=="Vivienda"){rn=750}
				if(industria=="Defense System"){rn=3450}
				if(industria=="Hospital"){rn=3450}
				
		//<-----datos de compaÃ±ia


		
		//--------->TABLADEARRIBA
		
$j(".biggersection").before("<div id='main_container'></div><br/><br/><br/>");

var tableContent  = "<table border='0' cellpadding='0' style='width:560px'>";
tableContent	 += "<tr>";	
tableContent	 += "<td style='display: table-cell;text-align:right; font-size:11px'>";
tableContent	 += "Precio <br>de venta:";
tableContent	 += "</td>";	
tableContent	 += "<td style='display: table-cell;'class='el_salary'>";	
tableContent	 += "<input type='text' id='sellprice' class='sallary_field'/><span class='ecur'>"+currency+"</span>";
tableContent	 += "<a class='i_edit' onclick='javascript:;' href='javascript:;' id='cambiar_venta'></a>"
tableContent	 += "</td>";		
tableContent	 += "</tr>";	
tableContent	 += "<tr>";	
tableContent	 += "<td style='text-align:right;font-size:11px;display: table-cell;'>";
tableContent	 += "Precio de <br> materia prima:";
tableContent	 += "</td>";	
tableContent	 += "<td style='display: table-cell;'class='el_salary'>";	
tableContent	 += "<input type='text' id='rawprice' class='sallary_field'/><span class='ecur'>"+currency+"</span>";
tableContent	 += "<a class='i_edit' href='javascript:;' onclick='javascript:;' id='cambiar_prima'></a>"
tableContent	 += "</td>";					
tableContent	 += "</tr>";	
tableContent	 += "</table><br/><br>";	


$j("#main_container").append(tableContent);

$j(".eltip tooltip").width(150);
$j(".eltipl").width(150);
$j(".eltipc").width(150);


		//<---------TABLADEARRIBA
	
		preurlcompania=$j(".last>a").attr("href");
		urlcompania= "http://economy.erepublik.com"+preurlcompania
		

function actualizardatos(indice)
			{ 
			
			
 			setTimeout(function() {
                //dentro
        
			
		//>varext
			
			
		//<varext
                var u_prod = $j("#units").html();
	
                var price = $j("#sellprice").val();

                var rwprice = $j("#rawprice").val();
		
                var beneficio = (u_prod * price - (rwprice * (rn*calidad) * u_prod)) - indice;

		
                function redondeo2decimales(numero)
                             {
                        var original=parseFloat(numero);
                        var result=Math.round(original*100)/100 ;
                        return result;
                          }
                var beneficioredondeado = redondeo2decimales(beneficio);
                if(beneficioredondeado >0){
                $j(".eldash").html('<td><img width="2" height="33" alt="" src="http://www.erepublik.com/images/parts/dash.jpg"></td><td><span type="text"style="font-size: 18px; color: green;">&nbsp;'+beneficioredondeado+'</span><br><span>'+currency+'</span></td>');
                }else   {$j(".eldash").html('<td><img width="2" height="33" alt="" src="http://www.erepublik.com/images/parts/dash.jpg"></td><td><span type="text"style="font-size: 18px; color: red;">&nbsp;'+beneficioredondeado+'</span><br><span>'+currency+'</span></td>');
                    }
            },200);
		
			
			}//llave de funcion

	
	
		$j(".el_day.current").mouseenter(function() {actualizardatos(this.parentNode.childNodes[18].childNodes[1].childNodes[1].value);})
		$j(".el_day").mouseenter(function() {actualizardatos(this.parentNode.childNodes[18].childNodes[1].childNodes[1].value);})
		
		$j("#cambiar_venta").click(function(){ 
			var precio=$j("#sellprice").val()
 			egalleta("preciodeventa"+id_1,precio)//-------------------------------------------------------------------------------->
 		});
		$j("#cambiar_prima").click(function(){ 
			var rprecio=$j("#rawprice").val()
 			egalleta('preciodeprima'+id_1,rprecio)//-------------------------------------------------------------------------------->
 		});	
		
		$j("#rawprice").val(galleta('preciodeprima'+id_1))
		$j("#sellprice").val(galleta("preciodeventa"+id_1))
	
	
	
	
	//<----FUERA



}else{



$j("#header").after('<div style="width:400px;position: absolute;top:50%;left:50%;margin-left:-200px;z-index:1;border:1px solid #808080;background-color:#fff; display: none;" id="scriptconfig"><table border="0" cellpadding="0" style="width:400px"><tr><td>&nbsp;&nbsp;&nbsp;<embed width="250" height="28" src="http://www.erepublik.com/flash/delicious.swf" quality="best" flashvars="txt=Configuracion eSecretario&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" class="sIFR-flash" style="width: 250px; height: 28px;"></td><td><a href="javascript:;" style="font-size:18px;"id="ocultarconfig"><b>&nbsp;&nbsp;&nbsp;Ocultar</b></a></td></tr><tr><td><hr width="100%"></td><td><hr width="100%"></td></tr><tr><td>&nbsp;&nbsp;&nbsp;<h2 style="margin-bottom: 1px;" class="biggersection noborder">&nbsp;&nbsp;&nbsp;Opciones</h2></td></tr><tr><td  id="actualizacionauto">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr><tr><td><hr width="100%"></td><td><hr width="100%"></td></tr><tr><td><h2 style="margin-bottom: 1px;" class="biggersection noborder">&nbsp;&nbsp;&nbsp;Información Online</h2></td></tr><tr><td id="noticiasdiv"></td></tr></table></div>');
$j("#ocultarconfig").click(function(){$j("#scriptconfig").hide()})
$j("#menu4>ul").append('<li><a href="http://www.erepublik.com/es/rankings/parties/1/'+idpais+'" rel="nofollow">Lista de Partidos</a></li>')
$j("#menu4>ul").append('<li><a id="mostrarconfig" href="#" rel="nofollow">Mostrar Configuracion de eSecretario</a></li>')
$j("#mostrarconfig").click(function(){$j("#scriptconfig").show()})
$j("#scriptconfig").hide()
if( GM_getValue("actualizar","0")==1){
$j("#actualizacionauto").append('<a id="activaractualizacionautomatica" href="#" rel="nofollow">Activar actualización automatica de eSecretario</a>')
}else{$j("#actualizacionauto").append('<a id="desactivaractualizacionautomatica" href="#" rel="nofollow">Desactivar actualización automatica de eSecretario</a>')}
$j("#activaractualizacionautomatica").click(function(){GM_setValue("actualizar","0")})
$j("#desactivaractualizacionautomatica").click(function(){GM_setValue("actualizar","1")})




}/*else*/if(urll.toString().indexOf("company")!=-1){



}//llave de cerrado
//<---Página empleados

	function str2xml(strXML) {
			var objDOMParser = new DOMParser() ;
			var objDoc = objDOMParser.parseFromString(strXML, "text/xml" ) ;
			return objDoc;
		}
	
	GM_xmlhttpRequest({
			method: "GET",
			url: "http://proyectobladir.co.cc/esecretario/noticias.php",
			data: "",
			headers: { },
			onload: function(response) {
				
				var xmlcargado=str2xml(response.responseText);
				
				//noticias=response.responseText
				$j("#noticiasdiv").html("Desactivado por problemas con el servidor")
				
			
			}});