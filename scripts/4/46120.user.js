// ==UserScript==
// @name         Alert flashvars
// @namespace    SeanSchricker
// @description  Alert the flashvars of each swf embedded in a page. 
// @version      1.0
// @date         2009-4-07
// @creator      Sean Schricker
// @include      *
// ==/UserScript==

function alertflashvars(){
	var messages=[];
	
	// start off by getting the embeds 
	var de=document.embeds;
	for(var i=0;i<de.length;i++){
		messages.push(
			'==========='+de[i].id+'======================================\n'
			+de[i].getAttribute('flashvars').replace(/=/g,'\t\t').replace(/&amp;|&/g,'\n')
		);
	}

	// next, grab the object elements 
	var obs=document.getElementsByTagName('object')
	for(var i=0;i<obs.length;i++){
		if(obs[i].type!="application/x-shockwave-flash"){continue};
		for(var j=0;j<obs[i].childNodes.length;j++){
			var param=obs[i].childNodes[j];
			if(param.name!='flashvars'){continue};
			messages.push(
				'==========='+obs[i].id+'======================================\n'
				+param.getAttribute('value').replace(/=/g,'\t\t').replace(/&amp;|&/g,'\n')
			)
		}
	}

	alert(messages.join('\n\n'))
}
GM_registerMenuCommand( "Alert flashvars", alertflashvars );
