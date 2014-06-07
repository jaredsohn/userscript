scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           Ellhnikh Agora
// @namespace      pantaparty.co.uk/ereploads
// @description    Topo8etei mia ellhnikh shmaia dipla se ka8e epixeirhsh ellhnikou endiaferontos.
// @source         http://userscripts.org/scripts/show/69745/
// @identifier     http://userscripts.org/scripts/source/69745.user.js
// @version        1.2.15
// @date           2010-04-13
// @author         Iaswn,eHIGDevs
// @include        http://www.pantaparty.co.uk/ereploads
// @include        http://www.erepublik.com/*/market/*
// @require        http://www.pantaparty.co.uk/ereploads/updater.php?id=69745
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below
//--------------------------LICENSE INFORMATION--------------------------
//
//  This script is is distributed under:
//  The terms of the GNU General Public License <http://www.gnu.org/licenses/>
//  For more see below GNU GPL STATEMENT  
//  
//
//-----------------------------BUGS & REPORTS----------------------------
//
//  Gia opoiodhpote problhma/parapono mporeite na epikoinwnhsete 
//  eite mpainontas sto site mas (http://www.pantaparty.co.uk) eite
//  me to Ellhniko Ypourgeio Emporiou (http://www.erepublik.com/en/organization/2771767)
//  Gia na dhlwsete thn epixeirhsh sas symplhrwste th forma toy Ypourgeiou
//  (http://tinyurl.com/yjzv2ak)h bash enhmerwnetai ka8e 48 wres!
//  To Report a bug or any other issue you can visit our website (http://www.pantaparty.co.uk)
//
//--------------------------DETAILS & FEATURES----------------------------
//
//  To paron script 8a isxyei kai 8a einai egkyro gia oso diasthma 
//  to Ypourgeio Emporiou 8a synthrei mia bash me oles tis epixeirhseis
//  Ellhnikwn symferontwn pou drasthriopoiountai sthn Ellhnikh Agora.
//  O ka8e epixeirhmatias ofeilei na enhmerwsei to Ypourgeio efoson poylhsei 
//  thn epixeirhsh toy.
//  Oses epixeirhseis DEN briskontai sth bash tou Ypourgeiou de 8a exoun to 
//  pronomio na emfanizetai h Ellhnikh shmaia dipla sto onoma tous sthn agora.
//  
//  Gia nees ekdoseis 8a enhmerwneste eite apo to Ypourgeio Emporiou eite apo
//  thn efhmerida mas <http://www.erepublik.com/en/newspaper/post-it1-221724/1>
//  kai to site mas <http://www.pantaparty.co.uk/>
// 
//  #############Special thanks to my friend gkl for his help.##############
//
//----------------------------GNU GPL STATEMENT------------------------------
//
//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   any later version.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.
//
//   You should have received a copy of the GNU General Public License
//   along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
//----------------------------------------------------------------------------
//
//**************************************Ellhnikh Agora*******************************************

document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
}; 
document.insertAfter = function(newElement,targetElement) {
var parent = targetElement.parentNode;

if(parent.lastchild == targetElement) {

parent.appendChild(newElement);
} else {

parent.insertBefore(newElement, targetElement.nextSibling);
}
 };
GM_setValue("miniMe",document.location.href);
GM_setValue("flag","http://www.pantaparty.co.uk/ereploads/egreek_stamp31x32.gif");
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
Array.prototype.has = function(v) { for (i=0;i <this.length;i++) { if (this[i]==v) return true;} return false;}
var oRegExpr = new RegExp(/http:\/\/www.erepublik.com\/en\/market\/country\-[0-9]{2,}\-industry\-([0-9]{1,}).*/);
var oneMatch = GM_getValue("miniMe").match(oRegExpr);
var oneMatch = RegExp.$1;
var txtUrl = "http://www.pantaparty.co.uk/ereploads/" + oneMatch + ".txt";
GM_setValue("miniMe2",txtUrl);
GM_xmlhttpRequest({
    method: 'GET',
    url: GM_getValue("miniMe2"),
    headers: {
	'Accept': 'application/atom+xml,application/xml,text/xml'},
    onload: function(responseDetails) {
	var toCheck = responseDetails.responseText;
	var txtCheck = toCheck.split("\r\n");
	var fText = txtCheck.join();
	GM_setValue("ellada",fText);
    }
});
GM_xmlhttpRequest({
    method: 'GET',
    url: GM_getValue("miniMe"),
    headers: {
	'Accept': 'application/atom+xml,application/xml,text/xml'},
    onload: function(responseDetails) {

	var shmaia = GM_getValue("flag");

	var countryToCheck = GM_getValue("ellada");

	countryToCheck = countryToCheck.substring(0,countryToCheck.length-1);	

	var tt = document.getElementsByClassName("offers");

	tt[0].rows[0].insertCell(0);

	tt[0].rows[0].cells[0].innerHTML="Provider";

	tt[0].rows[0].cells[1].innerHTML="Flag";

	var ma = document.getElementsByClassName("nameholder dotted");

	for (var i=0; i < ma.length; i++){
		var objRegExp = new RegExp("http://www.erepublik.com/en/company/[a-zA-Z0-9-]{2,}-([0-9]{6})");	
		var tTC = ma[i].getAttribute("href");
		var matches = tTC.match(objRegExp);
		var companyID =	RegExp.$1;
		var tdElement = document.createElement('th');
		tdElement.innerHTML = "<th width='10'><img src='http://www.pantaparty.co.uk/ereploads/egreek_stamp31x32.gif'></img></th>";
		var tdElement2 = document.createElement('th');
		var tdElement3 = ma[i].parentNode;
		tdElement2.innerHTML = "Unknown";
		if (countryToCheck.indexOf(companyID) != -1) {
			document.insertAfter(tdElement,tdElement3.parentNode);
		}
		else {
			document.insertAfter(tdElement2,tdElement3.parentNode);
		}
}
}
});
//******************************************END OF Ellhnikh Agora************************************


//**********************************************TOOLTIP START****************************************

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
            url: 'http://api.erepublik.com/v1/feeds/companies/'+escape(id)+'.json',
            onload:function(response)
            {
				try {
					var profile = eval('(' + response.responseText + ')')
					
					var link = document.getElementById("profilelink_"+id);

					if (!link)
						return;
					
					link.setAttribute("profile",profile.toSource());
					
					addEventListeners(link);
					
				} catch(err) {
					
					GM_log("error script:"+err);
				}
            }
        }
    );
}

function addStyles() {
   head = document.getElementsByTagName('head')[0];
   style = head.appendChild(document.createElement('style'));
   style.setAttribute('type','text/css');
   style.appendChild(document.createTextNode('#tooltip{background-color: #7EC3DB; -moz-border-radius: 5px; min-height: 50px; min-width: 50px; max-width: 150px; z-index: 100; position: absolute; border: 2px solid #E9F5FA; padding: 5px; opacity: 0.95;}'));
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

   var profile = eval( link.getAttribute('profile') );

   body = document.getElementsByTagName('body')[0];

   if (document.getElementById('tooltip')) {
      body.removeChild(document.getElementById('tooltip'));
      window.clearTimeout(timeoutid);
   }

   tooltip = body.appendChild(document.createElement('div'));
   
   tooltip.setAttribute('id', 'tooltip');
var quantity = 0;
if (profile.marketplace_offers){
var junk = profile.marketplace_offers;

for(var i=0; i < junk.length; i++) {
quantity = quantity + junk[i].quantity;
}


}

   var div = dc("div");
   
   div.innerHTML = "<table style='width:100%'>"+"<tr><td style='color:#444'>Country: </td><td align='left'> &nbsp; "+ profile.country + "</td></tr>"+"<tr><td style='color:#444'>Region: </td><td align='left'> &nbsp; "+ profile.region + "</td></tr></table>";

   
   tooltip.appendChild( div );
   
   timeoutid = window.setTimeout(function() {removeInfo()}, 60000);
   
}

/* ******************** DATA ******************** */

var url = document.location.href;
var isEmployeesArea = url.match("/company-employees/"); 

var isArticle = url.match("/article/");

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
		var isProfile = url.match("/citizen/profile/");		
		var isNormalLinkProfile = (classname == "nameholder dotted")
		var isEqual = ( inner == title );
	
		if ( isNormalLinkProfile ) {
			var id = rigth( url, "-");
			
			link.setAttribute("id","profilelink_" +id);
			fetchProfile(id);
		}
	}
	


}
// Based to Tei & edited by C@s aka Iaswn
//****************************************UPDATER******************************************
heckScriptForUpdate = {
 id: '69745',
 days: 0, 
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated_'+this.id, 0) == 0) GM_setValue('updated_'+this.id, this.time+'');
    if ( (GM_getValue('updated_'+this.id, 0) != 'off') && (+this.time > (+GM_getValue('updated_'+this.id, 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated_'+this.id, 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
//
//Based to sizzlemctwizzle http://userscripts.org/users/27715