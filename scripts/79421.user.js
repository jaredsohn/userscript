
/*
// ==UserScript==
//
// @author      Aarsvaars
// @email	no@email.com
// @namespace	http://userscripts.org/
// @name	Travian autoload
// @description	Troep- en dorpgegevens automatisch uploaden
// @include     *user.php*
// @include     *dorf.php?edit=*
//
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @exclude     s*.travia*.*
// @version     0.1
// ==/UserScript==
*/

//window.predefined_server ="";

	//get the z of the cell having the x,y coordinates
			
	function xy2id(x, y) {return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));};

	//Inverse function for xy2id(x,y) => id2xy(vid) - fr3nchlover.
	function id2xy(vid) {
		var arrXY = new Array;
		arrXY[0] = (vid%801?(vid%801)-401:400);
		arrXY[1] = 400 - (vid - 401 - arrXY[0]) / 801;
		return arrXY;
	}


function _log(level, msg) {
		GM_log(msg);
}
function xpath(query, object) {
	if(!object) var object = document;
	return document.evaluate(query, object, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

	
function collectdata(server){
	servidor=prompt("What's the server url where you play?\nEx: http://speed.travian.pt\nhttp://s7.travian.co.uk\nhttp://s5.travian.us", GM_getValue("trav_server", "http://s3.travian.nl;"));
		if (servidor!=null)
		{
			GM_setValue("trav_server", servidor);
			GM_setValue(window.location.hostname, window.location.hostname);
		}
	return true;
}


	

if ((window.location.href.match(/user/)=="user")){
	//user.php
	
	function village_center(){
	if (GM_getValue(window.location.hostname, "nope")!=window.location.hostname || GM_getValue("trav_server", "nonono")=="nonono"){
		collectdata();
		}
		if (GM_getValue(window.location.hostname, "nope")==window.location.hostname || GM_getValue("trav_server", "")!=""){
	
			document.getElementsByName('truppen_regex')[0].value="Obtaining data";
			var time=0;
			var trying=0;
			//for (var i=0;document.getElementsByName('my_villages')[0].options.length!=i;i++){
				//var coords=document.getElementsByName('my_villages')[0].options[i].value;
				_log(1, "travian actualizer: gettingcoords");
				
				var coordsx=document.getElementsByName('x1')[0].value;
				var coordsy=document.getElementsByName('y1')[0].value;
				
				
				_log(1, "travian actualizer: coords="+coordsx+"|"+coordsy);
				//coords=coords.split(",");
				//alert(coords[0]+"|"+coords[1]);
				//_log(1, "travian actualizer: aldeia "+i+":"+coords[0]+', '+coords[1]+'/'+xy2id(coords[0],coords[1]));	
				
				_log(1, "travian actualizer: "+coordsx+', '+coordsy+'/'+xy2id(coordsx,coordsy));	
				
				//var z=xy2id(coords[0],coords[1]);
				
				var z=xy2id(coordsx,coordsy);
				
				//alert("httprequest\\n"+GM_getValue('trav_server')+'/build.php?newdid='+z+"&gid=16&j");
				
					GM_xmlhttpRequest({
						method: 'GET',
						url: GM_getValue('trav_server')+'/build.php?newdid='+z+'&gid=16&j',
						headers: {
							'User-agent': 'Mozilla/3.0'
						},
						onerror: function(response){
							document.getElementsByName('truppen_regex')[0].value='Error:'+response.status+' texto:'+response.statusText ;
							
						},
						
						onload: function(response) {
						
						//alert('Yepy!:'+response.status+' texto:'+response.statusText);
						
							if(response.status==200){
								var dados_tropas=response.responseText;
							}else{
								var dados_tropas=response.status+ " \n"+response.statusText;
							}
								_log(1, 'travian actualizer: dados usados:\\n'+dados_tropas);
								document.getElementsByName('truppen_regex')[0].value=dados_tropas;
								alert('done');
	
						}	
					})
			


		}else{alert('fail');}
		
		
	};
	
				
				/* Create link to activate script*/
		var xpathRes = xpath("//input[@type='submit']");
		if(xpathRes.snapshotLength < 0) 
			_log(1, "this is not it")
		

				var oLink = document.createElement("input");
				oLink.id = "auto";
				oLink.value ="Auto copy";
				oLink.title = "Auto copy data village center data";
				oLink.class ="submit";
				oLink.type="button";
				//oLink.href = "#";
				oLink.addEventListener('click',	village_center, false);
	
				//_log(3, "........" + xpathRes.snapshotItem(0).parentNode.innerHTML);
		var oPar = xpathRes.snapshotItem(0).parentNode;
		oPar.innerHTML += " | ";
		oPar.appendChild(oLink);
		
		/* Create link to activate script*/
		
} else if (window.location.href.match(/dorf/)=="dorf"){
//dorf.php

	function requestAll() {
	
		if (GM_getValue(window.location.hostname, "nope")!=window.location.hostname || GM_getValue("trav_server", "nonono")=="nonono"){
		collectdata();
		}
		if (GM_getValue(window.location.hostname, "nope")==window.location.hostname || GM_getValue("trav_server", "")!=""){
						
			
			document.getElementsByName('village_regex')[0].value="Obtaining data";
					//Request1
					GM_xmlhttpRequest({
						method: 'GET',
						url: GM_getValue('trav_server')+'/build.php?gid=12&j',
						headers: {
							'User-agent': 'Mozilla/3.0'
						},
						onerror: function(response){
							document.getElementsByName('village_regex')[0].value='Error:'+response.status+' texto:'+response.statusText;
							
						},
						
						onload: function(response) {
						
						//alert('Yepy!:'+response.status+' texto:'+response.statusText);
						
							if(response.status==200){
								var dados_villages=response.responseText;
								
								document.getElementsByName('village_regex')[0].value=dados_villages;
								
								_log(1, "request1: Done");
								
								//Request2
								GM_xmlhttpRequest({
								method: 'GET',
								url: GM_getValue('trav_server')+'/build.php?gid=13&j',
								headers: {
									'User-agent': 'Mozilla/3.0'
								},
								onerror: function(response){
									document.getElementsByName('village_regex')[0].value='Error:'+response.status+' texto:'+response.statusText;
									
								},
								
								onload: function(response) {
								
								//alert('Yepy!:'+response.status+' texto:'+response.statusText);
								
									if(response.status==200){
									dados_villages=response.responseText;
									
									document.getElementsByName('village_regex')[0].value+=dados_villages;
									
									_log(1, "request2: Done");
									
								//Request3
								GM_xmlhttpRequest({
								method: 'GET',
								url: GM_getValue('trav_server')+'/build.php?gid=14&j',
								headers: {
									'User-agent': 'Mozilla/3.0'
								},
								onerror: function(response){
									document.getElementsByName('village_regex')[0].value='Error:'+response.status+' texto:'+response.statusText;
									
								},
								
								onload: function(response) {
								
								//alert('Yepy!:'+response.status+' texto:'+response.statusText);
								
									if(response.status==200){
									dados_villages=response.responseText;
									
									document.getElementsByName('village_regex')[0].value+=dados_villages;
									
									_log(1, "request3: Done");
									
								//Request4
								GM_xmlhttpRequest({
								method: 'GET',
								url: GM_getValue('trav_server')+'/build.php?gid=25&j',
								headers: {
									'User-agent': 'Mozilla/3.0'
								},
								onerror: function(response){
									document.getElementsByName('village_regex')[0].value='Error:'+response.status+' texto:'+response.statusText;
									
								},
								
								onload: function(response) {
								
								//alert('Yepy!:'+response.status+' texto:'+response.statusText);
								
									if(response.status==200){
									dados_villages=response.responseText;
									
									document.getElementsByName('village_regex')[0].value+=dados_villages;
									
									_log(1, "request4: Done");
									
								//Request5
								GM_xmlhttpRequest({
								method: 'GET',
								url: GM_getValue('trav_server')+'/build.php?gid=26&j',
								headers: {
									'User-agent': 'Mozilla/3.0'
								},
								onerror: function(response){
									document.getElementsByName('village_regex')[0].value='Error:'+response.status+' texto:'+response.statusText;
									
								},
								
								onload: function(response) {
								
								//alert('Yepy!:'+response.status+' texto:'+response.statusText);
								
									if(response.status==200){
									dados_villages=response.responseText;
									
									document.getElementsByName('village_regex')[0].value+=dados_villages;
									
									_log(1, "request5: Done");
									
								//Request6
								GM_xmlhttpRequest({
								method: 'GET',
								url: GM_getValue('trav_server')+'/dorf2.php',
								headers: {
									'User-agent': 'Mozilla/3.0'
								},
								onerror: function(response){
									document.getElementsByName('village_regex')[0].value='Error:'+response.status+' texto:'+response.statusText;
									
								},
								
								onload: function(response) {
								
								//alert('Yepy!:'+response.status+' texto:'+response.statusText);
								
									if(response.status==200){
									dados_villages=response.responseText;
									
									_log(1, "request6: Done");
									//alert(dados_villages);
									
						//_log(1, 'travian actualizer: dados usados:\\n'+dados_villages);

					document.getElementsByName('village_regex')[0].value+=dados_villages;
					alert('done');
					
					
							}else{
								var dados_villages='Error:'+response.status+' texto:'+response.statusText;
							}

	
						}	
					})
							}else{
								var dados_villages='Error:'+response.status+' texto:'+response.statusText;
							}

	
						}	
					})
							}else{
								var dados_villages='Error:'+response.status+' texto:'+response.statusText;
							}

	
						}	
					})
							}else{
								var dados_villages='Error:'+response.status+' texto:'+response.statusText;
							}

	
						}	
					})
							}else{
								var dados_villages='Error:'+response.status+' texto:'+response.statusText;
							}

	
						}	
					})
							}else{
								var dados_villages='Error:'+response.status+' texto:'+response.statusText;
							}

	
						}	
					})
			
					
					

			
			
			
			
			
		}else{alert('fail');}
	};
	

	/* Create link to activate script*/
	var xpathRes = xpath("//span[@id='tra_auto']");
	if(xpathRes.snapshotLength < 0) 
			_log(1, "this is not it")
		

			var oLink = document.createElement("input");
			oLink.id = "auto";
			oLink.value ="Autofill this one";
			oLink.title = "copy data from travian";
			oLink.class ="submit";
			oLink.type="button";
			//oLink.href = "#";
			oLink.addEventListener('click',	requestAll, false);
	
				//_log(3, "........" + xpathRes.snapshotItem(0).parentNode.innerHTML);
		var oPar = xpathRes.snapshotItem(0).parentNode;
		//oPar.innerHTML += " | ";
		oPar.appendChild(oLink);
		
	/* Create link to activate script*/
	



}
	
var menu=function() {
	
	var servidor=prompt("What's the server url where you play?\nEx: http://speed.travian.pt\nhttp://s7.travian.co.uk\nhttp://s5.travian.us", GM_getValue("trav_server", "http://s3.travian.nl"));

	if (servidor!=null)
	{
		GM_setValue("trav_server", servidor);
		GM_setValue(window.location.hostname, window.location.hostname);
		alert('done');
	}
}
GM_registerMenuCommand("Resave data", menu);

