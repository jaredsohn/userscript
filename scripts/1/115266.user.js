// ==UserScript==
// @name           armory
// @namespace      Wow
// @description    test1
// @include        http://eu.battle.net/wow/en/character*
// ==/UserScript==

	
//Creo sottomenu
var recentLi = document.createElement('li');
recentLi.setAttribute('class', '');
 
//Creo Link
var recentLink = document.createElement('a');

	//Ottento Pg name per creare il link
	var prelink = getElementByClass('name');
	pgname = prelink.childNodes[0].childNodes[0].nodeValue;

	//Ottento Server nameper creare il link
	var server = document.getElementById('profile-info-realm');
	var servername = server.childNodes[0].nodeValue.trim();

recentLink.href = '/wow/en/character/'+servername+'/'+pgname+'/statistic#21:152';
 
//Aggiungo Link al sottomenu
recentLi.appendChild(recentLink);

//Aggiungo testo al Link
var recentLiContent = document.createTextNode('Statistiche Arena');
recentLink.appendChild(recentLiContent);

//la MAGIA: Aggiungo il tutto al menu di Armory
var ega = getElementByClass(' active');
ega.parentNode.insertBefore(recentLi, ega.nextSibling);


			
	
	//#################### 
	/*var elmNewContent = document.createElement('a');
	elmNewContent.href = '/wow/en/character/'+servername+'/'+pgname+'/statistic#21:152';
	elmNewContent.appendChild(document.createTextNode('Statistiche Arena'));
	var elmFoo = getElementByClass('name');
	elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);
	*/
	
	
	
	
	//#######	FUNZIONI	########
	function getElementByClass(objClass){
		var elements =  document.getElementsByTagName('*');
		for (i=0; i<elements.length; i++){
			if (elements[i].className==objClass){
				return elements[i]
			}
		}
	}
	
	
	
	
	
