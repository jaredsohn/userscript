// ==UserScript==
// @name           XWHOIS FlagFox autolookup
// @namespace      seabreeze.tk
// @description    Allows you to add xwhois.nl lookups to automated bookmarklets and/or addons. Example for FlagFox: http://xwhois.nl/?autolookupURL={baseDomainName}
// @include        http://xwhois.nl/?autolookupURL=*
// ==/UserScript==
var _location_parameters=window.location.href.split('?')[1];
_location_parameters=_location_parameters.split('&');
var location_parameters=[];

for(i=0;i<_location_parameters.length;i++){
	location_parameters[(_location_parameters[i].split('=')[0])]=_location_parameters[i].split('=')[1];	
}

var URLbox=document.getElementById('ContentPlaceHolder1_DomainnameTextBox');
var URLform=document.getElementById('form1');
var URLlookup=document.getElementById('ContentPlaceHolder1_LookupButton');

if(window.location.href.indexOf('#FlagFoxLookup')==-1){
	if(URLbox!=null){
		if(location_parameters['autolookupURL'].toString().length>0){
			URLbox.value=location_parameters['autolookupURL'];
			if(URLlookup!=null){
				URLlookup.click();
			}
		}
	}
}
