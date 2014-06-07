// ==UserScript==
// @name		Travian: get tribe names UTILITY
//@description	Get Travian tribe names (Romans, Gauls, Teutons) translated in all languages. This script is just a little utility for developers, not to play Travian game. It works on page http://travutils.com/en/?w=s only.
// @version	0.1
// @author		dbKiller
// @email		user9999@gmail.com
// @date		2008-05-22
// @namespace	travian
// @include	http://travian-utils.com/en/?w=s
// ==/UserScript==


//global
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPOList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;


//launch main function after doc is loaded
window.addEventListener('DOMContentLoaded', onLoad, false);
if (document.body) onLoad();


//main function
function onLoad()
{
	var server = prompt('Server (s1, s2, s3 etc.)', 's1');
	if ( null == server || server == "") {
		return;
	} else {
		//create list-wrapper div
		var listDiv = document.createElement('div');
		listDiv.id = 'listDiv';
		listDiv.style.zIndex = 666;
		listDiv.style.clear = 'both';
		listDiv.style.position = 'absolute';
		listDiv.style.width = '800px';
		listDiv.style.top = '0px';
		listDiv.style.left = '0px';
		listDiv.style.backgroundColor = '#FFFFFF';
		listDiv.style.border = '5px solid red';
		document.body.appendChild(listDiv);
		//create table
		var listTable = document.createElement('table');
		listTable.id = 'listTable';
		listTable.setAttribute('cellspacing', 1);
		listTable.setAttribute('cellpadding', 1);
		listTable.style.width = '100%';
		listTable.style.cssFloat = 'left';
		listTable.style.clear = 'both';
		listTable.style.position = 'relative'; 
		listDiv.appendChild(listTable);
		
		getTravianServersList(server);
	}
}


function getTravianServersList(server)
{
	var servers = xpathEvaluate(document, '//a[@class="b ext"]', XPOList);
	if (servers.snapshotLength > 0) {
		for (i=0; i<=servers.snapshotLength-1; i++) {
			var url = servers.snapshotItem(i).href;
			url = url.replace('www', server)
			url = url+'anmelden.php'
			var country = servers.snapshotItem(i).innerHTML;
			getTribeNames(url, country);
		}
	}
}


function getTribeNames(url, country)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function (responseDetails)
				{
				
					var div = document.createElement('div');
					div.id = 'div_'+url;
					div.innerHTML = responseDetails.responseText; 
					var ansDoc = document.implementation.createDocument('', '', null);
					ansDoc.appendChild(div);
					
					var langExt = url.match(/travian(\.[a-zA-Z]{2,3})+/);
					if (!langExt) {
						langExt = url.match(/travian3(\.[a-zA-Z]{2,3})+/).pop(); 
					} else {
						langExt = url.match(/travian(\.[a-zA-Z]{2,3})+/).pop();
					}
					
					var tribes = xpathEvaluate(ansDoc, '//td[@class="f8"]', XPOList);
					if (tribes.snapshotLength > 0) {
						var romans = tribes.snapshotItem(0).innerHTML;
						var teutons = tribes.snapshotItem(2).innerHTML;
						var gauls = tribes.snapshotItem(5).innerHTML;
						
						var tab = '&nbsp;&nbsp;&nbsp;&nbsp;';
						var txt  =  tab+tab+"case '"+langExt+"': //"+country+"<br>"+
								tab+tab+tab+"langFile['ROMANS'] = '"+romans+"';<br>"+
								tab+tab+tab+"langFile['GAULS'] = '"+gauls+"';<br>"+
								tab+tab+tab+"langFile['TEUTONS'] = '"+teutons+"';<br>"+
								tab+tab+"break;<br>";
						
						if (romans && gauls && teutons) {
							var tr = document.createElement('tr');
							var td = document.createElement('td');
							td.style.width = "800px";
							td.innerHTML = txt;
							tr.appendChild(td);
							document.getElementById('listDiv').appendChild(tr);
						}
					}
				}
	});
}


function xpathEvaluate(doc, xpath, xpres)
{
  var ret = doc.evaluate(xpath, doc, null, xpres, null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

