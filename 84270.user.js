// ==UserScript==
// @name           Company Market Info
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://economy.erepublik.com/*/market/company/*
// ==/UserScript==

// Based on playerTooltips by Tei
// http://userscripts.org/scripts/show/56665

/*  ******************** FUNCTIONS  ********************  */

function $(nameEntity){
	return document.getElementById(nameEntity);
}


function dc(nameEntity){
	return document.createElement(nameEntity);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function moveInfo(coords) {
   X = coords.pageX;
   Y = coords.pageY;
   if (document.getElementById('tooltip')) {
      document.getElementById('tooltip').setAttribute('style', 'left:' + (X + 20) + 'px; top:' + (Y - 50) + 'px');
   }
}

function removeInfo(img) {
      if (document.getElementById('tooltip')) {
      body.removeChild(document.getElementById('tooltip'));
      window.clearTimeout(timeoutid);
      window.clearTimeout(timeoutid2);
   }
}



function left( cadena, corte) { var partes = cadena.split(corte); return partes[0] };

function rigth( cadena, corte) { 
	var partes = cadena.split(corte); 
	if (partes.length<1) return ""; 
	
	if (partes.length>1) {
		return partes[partes.length-1];
	}	
	
	return partes[1]; 	
};

function fetchProfile(id) 
{
    GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://api.erepublik.com/v2/feeds/companies/'+escape(id)+'.json',
            onload:function(response)
            {
				// todo think about bad request -
				try {
					var profile = eval('(' + response.responseText + ')')
					
					var link = document.getElementById("profilelink_"+id);

					if (!link)
						return;
					
					
					link.setAttribute("profile",profile.toSource());
					
					addEventListeners(link);
					
					/*
					var cr = "\r \n \13 &#13; &#xD; &#xA;  " +String.fromCharCode(0xD);
					


					
					*/
					
				} catch(err) {
					//	should enter removible line ---
					//removeFromArray(id) 
					GM_log("error script:"+err);
				}
            }
        }
    );
}







function addStyles() {
   //Add styles to the site header
   head = document.getElementsByTagName('head')[0];
   style = head.appendChild(document.createElement('style'));
   style.setAttribute('type','text/css');
   style.appendChild(document.createTextNode('#tooltip{background-color: #ddd; -moz-border-radius: 5px; min-height: 50px; min-width: 50px; max-width: 200px; z-index: 100; position: absolute; border: 2px solid #ddd; padding: 5px; opacity: 0.95;}'));
   style.appendChild(document.createTextNode('.tooltipheader{font-weight: bold; line-height: 150%;}'));
   style.appendChild(document.createTextNode('#tooltip > a{font-size: 75%; color: white; font-family: verdana, sans-serif !important;}'));
   style.appendChild(document.createTextNode('#imgurl{display:none;}'));
}

function addEventListeners(item) {   
    item.addEventListener('mouseover', function(){showInfo(this)} ,false);
    item.addEventListener('mousemove', function(e){moveInfo(e)} ,false);
    item.addEventListener('mouseout', function(){removeInfo(this)} ,false);
    item.setAttribute('title','');
}

function showInfo(link) {
   //Extract information from alt-attribute
   var profile = eval( link.getAttribute('profile') );


   //DEBUG: are all information extracted correctly?
   //alert(imgrating + "\n" + imgtags + "\n" + imgscore + "\n" + imguser);

   body = document.getElementsByTagName('body')[0];

   //if an old tooltip still exists, remove it first
   if (document.getElementById('tooltip')) {
      body.removeChild(document.getElementById('tooltip'));
      window.clearTimeout(timeoutid);
   }

   //add tooltip and information
   tooltip = body.appendChild(document.createElement('div'));
   
   tooltip.setAttribute('id', 'tooltip');
var quantity = 0;
//   +profile.marketplace_offers[0].quantity+
if (profile.marketplace_offers){
var junk = profile.marketplace_offers;

for(var i=0; i < junk.length; i++) {
quantity = quantity + junk[i].quantity;
}


}

var export = "";

for (var i = 0; i < profile.export_licenses.length; i++) {
export += profile.export_licenses[i].country.name +" ";
}

   var div = dc("div");
   
   div.innerHTML = "<table style='width:100%'>"+
			"<tr><td style='color:#444'>Location: </td><td align='left'> &nbsp; "+ profile.country.name + "</td></tr><tr><td style='color:#444'>Region: </td><td align='left'> &nbsp; "+ profile.region.name + "</td></tr><tr><td style='color:#444'>Products: </td><td align='left'> &nbsp; "+ profile.stock + "</td></tr><tr><td style='color:#444'>RM's: </td><td align='left'> &nbsp; "+ profile.raw_materials_in_stock + "</td></tr><tr><td style='color:#444'>Emp's: </td><td align='left'> &nbsp; "+ profile.employees.length + "</td></tr><tr><td style='color:#444'>Licenses: </td><td align='left'> &nbsp; "+ export + "</td></tr></table>";

   
   tooltip.appendChild( div );
   
   timeoutid = window.setTimeout(function() {removeInfo()}, 60000);
   
}






/*  ********************  PROCESS   ******************** */

addStyles();



var links = document.getElementsByTagName('a');

for( var t=0;t<links.length;t++){
	
	var link = links[t];
			
	if (!link)
		continue;
	
	var classname = link.getAttribute("class");
	var inner = link.innerHTML;
	var title = link.getAttribute("title")				
	var url = link.getAttribute("href");	
	
	GM_log("url: ("+url+"),inner:"+inner);
	if ( url ) {
		var isNormalLinkProfile = (classname == "noborder");


	
		if ( isNormalLinkProfile ) {
			var id = rigth( url, "/");
			
			link.setAttribute("id","profilelink_" +id);
			fetchProfile(id);

}
	}
	


}
