// ==UserScript==
// @author         Marcelo Adamatti  
// @version        0.0.1
// @name           IMDB em portugues
// @namespace      http://adamatti.googlepages.com
// @description    IMDB em portugues
// @include        http://portuguese.imdb.com/mymovies/*
// @scriptsource   http://userscripts.org/scripts/source/37244.user.js
// ==/UserScript==
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Use AKAS http://portuguese.imdb.com 
function getTitleIMDB(text){
	var link = "";
	
	if (text.substr(0,1)=='"'){		
		debug('getTitleIMDB: using ": ' + text);
		link = document.evaluate("//td[@class='standard']/a[contains(@href,'title')][text()='" + text + "']/@href", document,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; //    /title/tt0898266/
	} else {
		debug("getTitleIMDB: using ': " + text);
		link = document.evaluate("//td[@class='standard']/a[contains(@href,'title')][text()=\"" + text + "\"]/@href", document,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; //    /title/tt0898266/
	}
	if (link!=null){
		GM_xmlhttpRequest({
			key: text,
		    method: 'GET',
			url: 'http://portuguese.imdb.com' + link.textContent + 'releaseinfo#akas',
			headers: {
		        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		        'Accept': 'application/atom+xml,application/xml,text/xml'
		    },
			onload: function(response) {
				log(this.key);
				
				//Create a HTML Node
				var xml = document.createElement("xml");
				xml.innerHTML = response.responseText;
				
				var title = document.evaluate("//td[contains(text(),'Brazil')]/parent::*[count(td)=2]/td[1]",xml,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (title==null) title = document.evaluate("//td[contains(text(),'Portugal')]/parent::*[count(td)=2]/td[1]",xml,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (title==null) title = document.evaluate("//td[contains(text(),'USA')]/parent::*[count(td)=2]/td[1]",xml,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				//if (title==null) title = document.evaluate("//td[contains(text(),'International')]/parent::*/td[1]",xml,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (title==null) title = document.evaluate("//td[contains(text(),'English title')]/parent::*[count(td)=2]/td[1]",xml,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				
				if (title!=null) {
					var newTitle = title.textContent;
					
					setTitleName(this.key, newTitle);
					
					//SAVE
					log('Store ' + this.key);
					GM_setValue(this.key, newTitle);

				} else {
					GM_setValue(this.key,""); //NEVER TRY AGAIN
				}
			}
		});
	} else {
		log('Link null ' + text);
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function debug(msg){
	//GM_log('######## DEBUG ######## ' + msg);
}
function log (msg){
	//GM_log(GM_getValue('log.enable'));
	if (GM_getValue('log.enable',false)){
		GM_log(msg);
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
GM_registerMenuCommand('Enable Log', function(){
	GM_setValue('log.enable',true);
});
GM_registerMenuCommand('Disable Log', function(){
	GM_setValue('log.enable',false);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setTitleName(key, newTitle) {
	try {
		//GET THE REAL REFERENCE
		var real = "";
		if (key.substr(0,1)=='"'){
			debug('setTitleName: using ": ' + key);
			real = document.evaluate("//td[@class='standard']/a[contains(@href,'title')][text()='" + key + "']",document,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		} else {
			debug("setTitleName: using ': " + key);
			real = document.evaluate("//td[@class='standard']/a[contains(@href,'title')][text()=\"" + key + "\"]",document,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;		
		}
	
		//CREATE A RESULT  TAG 
		var tag = document.createElement("b");
		tag.innerHTML = '<br>' + newTitle;
		real.parentNode.noWrap=true;
		real.parentNode.appendChild(tag);
	} catch(e) {
		log("ERROR " + e);
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
debug('Loaded!');
//USE SNAPSHOT TO CHANGE THE HTML
var headings = document.evaluate("//td[@class='standard']/a[contains(@href,'title')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for ( var i=0 ; i < headings.snapshotLength; i++){
	var node = headings.snapshotItem(i);
	var key = node.textContent; 
	var def = null; 	
	var newTitle = GM_getValue(key, def);
	if (newTitle!=def) {
		setTitleName(key, newTitle);
		log('Retrieve ' + key);
	}else {
		try {
			getTitleIMDB(key);
		} catch (e){
			log('Error in ' + key + ': ' + e);
		}
	}	
}
