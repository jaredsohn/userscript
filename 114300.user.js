// ==UserScript==
// @name           Salta publicidad instersticial de periódicos españoles
// @namespace      PeridicosInstersticial
// @description     Salta publicidad instersticial de periódicos españoles
// @include        http://www.elmundo.es
// @include        http://www.elmundo.es/
// @include        http://www.marca.com
// @include        http://www.marca.com/
// @include        http://www.publico.es
// @include        http://www.publico.es/
// @include        http://www.as.com
// @include        http://www.as.com/
// ==/UserScript==
try
{
		//dominio="http://www.elmundo.es";		
		function GetMeta()
		{
				var meta = document.getElementsByTagName("meta");
					var theURL="";

					if(meta.length!=0)
					{

						for (i=0; i<meta.length; i++)
						{
						
							if(meta[i].attributes["HTTP-EQUIV"]!=null && meta[i].attributes["HTTP-EQUIV"].value.toLowerCase()=="refresh")
							{	
							
								theContent=meta[i].attributes["CONTENT"].value;					
								var posini=theContent.indexOf("URL=")+4;
								theURL=theContent.substr(posini);
			
								document.location.href=dominio+theURL;
								break;
							}
						}
					}
					else
					{
						return false;
					}
		}
		var dominio="";

		if(document.location.href.indexOf("elmundo.es")>-1 || document.location.href.indexOf("marca.com")>-1)
		{
						try
						{
					if(typeof unsafeWindow.continua_destino == 'function') {
							
					// function exists, so we can now call it
						
							unsafeWindow.continua_destino();
					
							
					}
					}
						catch(e){}
					if(!GetMeta())			
					{

							if(document.location.href.indexOf("elmundo.es")>-1)
							{


												var capa = document.getElementsByClassName('saltar');

												if(capa.length != 0){
														
															var capaContenedora=capa[0];
															var elHref=capaContenedora.children[0];
															var valorhref=elHref.attributes["href"].value;
															var posini=valorhref.indexOf("'")+1;
															var posfin=valorhref.length-posini-3;
															theURL=valorhref.substr(posini,posfin);			
															document.location.href=dominio+theURL;
														
		 
												}
												
												
												
							}

					}
		}
		else if(document.location.href.indexOf("publico.es")>-1)
		{
					if(document.getElementById('pubinterstitial')!=null){			
							document.getElementById('pubinterstitial').style.display="none";
							document.getElementById('pubinterstitial').style.visibility="hidden";					
							document.getElementById('supercontenedor').style.visibility = 'visible';
					}
		}
		else if(document.location.href.indexOf("as.com")>-1)
		{		
			var dvOAS_Vodafone_vdf_inter_lsa87o=document.getElementById('OAS_displaybox');						
			dvOAS_Vodafone_vdf_inter_lsa87o.style.display="none";
			dvOAS_Vodafone_vdf_inter_lsa87o.parentNode.removeChild(dvOAS_Vodafone_vdf_inter_lsa87o);									
		}

}
catch(e){
//alert(e);
}
