// ==UserScript==
// @name		UserScript Numerizador Plus!
// @namespace	        Juampi_Mix
// @description	        Añade numeradores de scripts a userscripts.org.
// @include		http://userscripts.org/*
// @exclude		http://userscripts.org/users/*/comments*
// @exclude		http://userscripts.org/users/*/post*
// @exclude		http://userscripts.org/home/comments*
// @exclude		http://userscripts.org/home/posts*
// @exclude		http://userscripts.org/home/scripts*
// @exclude		http://userscripts.org/topics/*
// @exclude		http://userscripts.org/posts*
// @exclude             http://userscripts.org/scripts/diff/
// @version		1.20
// @require             http://userscripts.org/scripts/source/60663.user.js
// @history             1.20 Añadido un exlcuido que se me paso en el codigo.
// @history             1.10 Agregada informacion para el actualizador.
// @history             1.00 creacion del script.
 
// ==/UserScript==

function getDOC(url,callback){
	var req=new XMLHttpRequest();
	req.open('GET',url,true);
	req.onreadystatechange=function (responseDetails) {
		if(req.readyState != 4 || req.status != 200) return;

		var doc = document.implementation.createDocument('', '', null),
			html = document.createElement('html'),
			body = document.createElement('body');
		body.innerHTML=/<\s*body[^>]*>((?:.|\s)+?)<\s*\/body\s*>/mi.exec(req.responseText)[1];
		doc.appendChild(html);
		html.appendChild(body);
		callback(doc);
		return;
	}
	req.send(null);
}

var userscriptsOrgTableRowNum={};
userscriptsOrgTableRowNum.run=function(){
	var tbls=[];
	var page=document.evaluate("//div[contains(@class,'pagination')]/span[contains(@class,'current')]",document,null,9,null).singleNodeValue;
	if(page){
		page=page.innerHTML.replace(/,/, '', 'g')*1;
		var tbl=document.evaluate("//div[@id='content' or @id='main']//table[contains(@class,'wide')]",document,null,9,null).singleNodeValue;
		if(!tbl) return;
		tbls.push(tbl);
	}
	else {
		page=1;
		var tbl=document.evaluate("//div[@id='content' or @id='main']//table[contains(@class,'wide')]",document,null,7,null);
		if(!tbl) return;
		for(var i=0;i<tbl.snapshotLength;i++){
			tbls.push(tbl.snapshotItem(i));
		}
	}

	var itemsPerPg,
		isLastPg=document.evaluate("//div[contains(@class,'pagination')]/span[contains(@class,'next_page') and contains(@class,'disabled')]",document,null,9,null).singleNodeValue;
	if(isLastPg){

		var usoTblRowLstPg=GM_getValue("usoTblRowLstPg","").split(';');
		if (usoTblRowLstPg[0] == window.location.pathname) {
			itemsPerPg=usoTblRowLstPg[1];
		}
		else {
			var prevPgURL = document.evaluate("//a[contains(@rel,'prev')]", document, null, 9, null).singleNodeValue;
			if (prevPgURL) {
				getDOC(prevPgURL.href, function(doc){
					return userscriptsOrgTableRowNum.partII(doc, tbls, page);
				});
				return;
			}
		}
	}

	userscriptsOrgTableRowNum.partII(false,tbls,page,itemsPerPg);
}
userscriptsOrgTableRowNum.partII=function(doc,tbls,page,itemsPerPg){
	if(!itemsPerPg) {
		var itemsPerPg;
		if(doc){
			var usoTblRowLstPg=GM_getValue("usoTblRowLstPg","").split(';');
			if(usoTblRowLstPg[0]!=window.location.pathname){
				itemsPerPg = doc.evaluate("count(//table[contains(@class,'wide')]//tr[not(@id) or @id!='scripts-total']/td[1])", doc, null, 1, null).numberValue;
			}
			else{
				itemsPerPg=usoTblRowLstPg[1];
			}
		}
	}
	var tblIndex=0,trsNoTotal,trs,tr,newTD;
	for(;tblIndex<tbls.length;tblIndex++){
		trs=document.evaluate(".//tr",tbls[tblIndex],null,7,null);
		trsNoTotal=document.evaluate("count(.//tr[not(@id) or @id!='scripts-total']/td[1])",tbls[tblIndex],null,1,null).numberValue;
		if(!itemsPerPg) itemsPerPg=trsNoTotal;
		for(var i=0;i<trs.snapshotLength;i++){
			tr=trs.snapshotItem(i);
			if(i!=0){
				newTD=document.createElement('td');
				if(i<=trsNoTotal) newTD.innerHTML = (((page - 1) * itemsPerPg) + i) + '.';
				else newTD.innerHTML="&nbsp;";
			}
			else{
				newTD=document.createElement('th');
				newTD.innerHTML='&nbsp;';
			}
			tr.insertBefore(newTD,tr.childNodes[0]);
		}
	}
	if(tbls.length==1){
		GM_setValue("usoTblRowLstPg",window.location.pathname+";"+itemsPerPg);
	}
}
userscriptsOrgTableRowNum.run();


ScriptUpdater.check(61689, '1.20');
ScriptUpdater.forceNotice(61689, '1.20');
ScriptUpdater.forceCheck(61689, '1.20');
function handleReturnedVersion(v) {
}
ScriptUpdater.check(61689, "1.20", handleReturnedVersion);
