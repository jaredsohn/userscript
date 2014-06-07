// ==UserScript==
// @name           KA - AO
// @namespace      http://kebrus.deviantart.com/
// @description    you use you win
// @include        http://s*.kingsage*/*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var KA_href = window.location.href;

var village = xpath("//table//td/a[contains(@href,'premium')]");
if(village.snapshotLength > 0){village = village.snapshotItem(0).href;} else { village = "";}
    village = /village=(\d+)/.exec(village);
if(village != null){ village = RegExp.$1; } else { village = 0; }

GM_log(KA_href);

if(KA_href.indexOf("&s=build_main") > -1){
	var stack_KA = GM_getValue(("stack_KA"+village), "");
	GM_log(stack_KA);
	
	var tabelaEMPzona = xpath("//div[contains(@class,'mainBuild')] | //table[@class='borderlist']/tbody/tr/td[@class='shadow']/../../..").snapshotItem(0);
	var tabelaEMP = document.createElement('table');
		tabelaEMP.className = "borderlist";
	
	if(stack_KA.length > 0){
		var stackElems = stack_KA.split(",");
		var allbuttons = xpath("//div[contains(@class,'mainBuild')]/div[@class='box']/div[@class='button']/a[contains(@href,'a=build')]");
		
		var checkmax = xpath("//div//table[@class='borderlist']//td[@colspan='5']/a[contains(@href,'premium')]");
		if(checkmax.snapshotLength == 0){
			for(var i = 0; i < allbuttons.snapshotLength; i++){
				var nextelem = "build="+ stackElems[0].substr(2);
				if(allbuttons.snapshotItem(i).href.match(nextelem)){
					stackElems.splice(0,1);
					GM_log("before: "+stackElems+" | "+i);
	            	stack_KA = stackElems.join(",");
	            	GM_log("after:"+stack_KA);
	            	GM_setValue(("stack_KA"+village), stack_KA);
	            	window.location.href = allbuttons.snapshotItem(i).href;
	            	break;
				}
			}
		}
		tabelaEMP.innerHTML = "<tr><th>KA-AO: Seguintes construções</th><th><a id='cancelall' href='javascript: var cancel;'><b>[Cancelar tudo]</b></a></th></tr>";
		for(var i=0;i < stackElems.length; i++){
			//GM_log(stackElems[i]);
			tabelaEMP.innerHTML += "<tr><td><img src='http://"+window.location.host+"/img/buildings/"+stackElems[i].substr(2)+".png'> "+getNameAndLevel(stackElems[i].substr(2))+"</td><td><a id='"+i+"remove' href='javascript: var remove;'>cancelar</a></td></tr>";
		}
		tabelaEMPzona.parentNode.insertBefore(tabelaEMP, tabelaEMPzona);
		document.getElementById("cancelall").addEventListener("click", cancelall, false);
		for(var i=0;i < stackElems.length; i++){
		document.getElementById(i+"remove").addEventListener("click", remove, false);
		}
	
	var startT = parseInt(GM_getValue("startRA",5));
	var endT = parseInt(GM_getValue("endRA",10));
	
	var timerand = Math.floor(((Math.random()*(endT-startT))+startT)*60000);
	
	GM_log(startT+" | "+endT+" | "+timerand);
	
	var body_RA = document.getElementsByTagName('body')[0];
    var reload_RA = document.createElement('script');
        reload_RA.type = 'text/javascript';
        reload_RA.innerHTML = "setTimeout(' window.location.href=window.location.href' ,"+timerand+");";
        body_RA.appendChild(reload_RA);
        
    var stend = document.createElement('table');
    	stend.className = "borderlist";
        stend.innerHTML = "<tr><th colspan='2'>Intervalo de tempo de refresh (mins):</th></tr><tr><td><input size='3' type='text' id='startRA' value='"+startT+"'> - <input size='3' type='text' id='endRA' value='"+endT+"'></td><td><input type='button' id='subRA' value='Alterar'></td></tr>";
        tabelaEMPzona.parentNode.insertBefore(stend, tabelaEMPzona.nextSibling);
		
	document.getElementById("subRA").addEventListener("click", updateinter, false);
	} else {
		tabelaEMP.innerHTML = "<tr><th>KA-AO: Sem construções na fila.</th></tr>";
		tabelaEMPzona.parentNode.insertBefore(tabelaEMP, tabelaEMPzona);
	}

	var allBuilds = xpath("//div[contains(@class,'mainBuild')]/div[@class='box']/div[@class='image']/img | //td[@class='shadow']/table[@class='noborder']//table[@cellspacing='0']/tbody/tr/td[@class='nowrap'][1]/img");
	var allIds = xpath("//div[contains(@class,'mainBuild')]/div[@class='box']/div[@class='name']/a | //td[@class='shadow']/table[@class='noborder']//table[@cellspacing='0']/tbody/tr/td[@class='nowrap'][1]/a");
	var currentId;
	for(var i = 0; i < allBuilds.snapshotLength; i++){
		
		currentId = /build_(\w+)/.exec(allIds.snapshotItem(i).href);
    if(currentId != null){ currentId = RegExp.$1; } else { currentId = "none"; }
		
		var linker = document.createElement('a');
				linker.innerHTML = "<img src='"+allBuilds.snapshotItem(i).src+"'>";
				linker.id = "KA"+currentId;
				linker.href = "javascript: var temp;";
		allBuilds.snapshotItem(i).parentNode.replaceChild(linker, allBuilds.snapshotItem(i));
		document.getElementById("KA"+currentId).addEventListener("click", saver, false);
	}
	
}

function saver(){
	
	var stack_KA = GM_getValue(("stack_KA"+village),"");
    if(stack_KA.length > 1){
        stack_KA += ","+this.id;
        } else {
        stack_KA = this.id;
        }
	GM_setValue(("stack_KA"+village), stack_KA);
	window.location = window.location;
}
function cancelall(){
	GM_setValue(("stack_KA"+village), "");
	window.location = window.location;
}

function updateinter(){
    GM_setValue("startRA", document.getElementById("startRA").value);
    GM_setValue("endRA", document.getElementById("endRA").value);
    window.location.href = window.location.href;
}

function getNameAndLevel(idname){
	var	temp1 = xpath("//div[contains(@class,'mainBuild')]/div/div[@class='name']/a[contains(@href,'build_"+idname+"')]/.. | //td[@class='shadow']/table//td[1]/a[contains(@href,'build_"+idname+"')]/..").snapshotItem(0).innerHTML;
	var temp2 = / (\d+)/.exec(temp1);
	if(temp2 != null){ temp2 = parseInt(RegExp.$1); } else { temp2 = 0; }
	temp = /.+>(.+)<\/.+\((\D+) (\d+)/.exec(temp1);
	GM_log(RegExp.$1+" | "+RegExp.$2+" | "+RegExp.$3);
    if(temp != null){ 
    	if((window[idname+"lvl"]) == undefined){
    		window[idname+"lvl"] = (parseInt(RegExp.$3));
    	} else {
    		window[idname+"lvl"]++;
    	}
    	temp = RegExp.$1+" ("+RegExp.$2+" "+(window[idname+"lvl"]+1)+")"; 
    } else { temp = /.+>(.+)<\//.exec(temp1); temp = RegExp.$1; }
	return temp;
}

function remove(){
	var stack_KA = GM_getValue(("stack_KA"+village),"");
        stack_KA = stack_KA.split(",");
        stack_KA.splice(parseInt(this.id),1);
        stack_KA = stack_KA.join(",");
    GM_setValue(("stack_KA"+village), stack_KA);    
    window.location = window.location;
}