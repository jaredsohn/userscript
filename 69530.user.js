// ==UserScript==
// @name           MHA Data Assistant Loader 
// @namespace      mostlyharmlessalliance.com
// @description    Automatically sends data to MHAsWAR nation parser
// @include        http://*cybernations.net/*
// ==/UserScript==


var version = 1.0; // 2.20.2010
var home = "http://testingniu.x10hosting.com/comms/MHAsWAR/";

/**
* Change log:
*
* v1.0
* Nothing yet
*/
 
var aaswitch = GM_getValue("aaswitch");

var serverTime = document.getElementById('table25').tBodies[0].rows[0].cells[2].lastChild;

var stylenode = document.createElement('style');
stylenode.innerHTML = '#cnacontent { border-collapse: collapse; padding: 4px;  } ' +
 '#cnacontent {}'+
 '#cnahidden {padding: 2px}'+
 '#cnawrapper input { width: 80px; font-size:85%; padding: 0; border: 1px #000080 solid; margin:0 }'+
 '#cnasubmit {color: #FFFFFF; background: #000080; cursor:pointer; border:groove 1px #000; font-family: Verdana, arial, san-serif; font-size: 10px; font-weight: bold; padding: 1px 2px; }' +
 '#cnaheader {background: #000080; height: 18px; width: 100%; color: #FFFFFF; font-weight: bold; font-size: 11px}'+
 '#cnaheader a {color:#80ffa0}' +
 '#cnawrapper {font-family: Verdana, arial, san-serif; color: #333333; }'+
 '#cnawrapper td {FONT-SIZE: 10px; }'+
 '#cnawrapper form { margin: 0; padding: 0}'+
 '#cnaversion {font-weight:normal; font-size:70%; float:right}';
document.body.appendChild(stylenode);

var newnode = document.createElement('div');
newnode.setAttribute('id', 'cnawrapper');
newnode.style.height = '71px';
newnode.style.width = '600px';
newnode.style.border = '2px #000080 Solid';
newnode.style.backgroundColor = '#FFFFFF';
newnode.innerHTML =
 '<div align="left" id=cnaheader>&nbsp;:. MHAsWAR Assitant <span id=cnaversion></span></div>'+
 '<div id=cnalogin style="display:none"></div>'+
 '<div id=cnacontent><table width=100%><tr><td width=45%><span id=cnastatus></span></td>'+
 '<td width=45%><span id=cnacontact>Contacting MHAsWAR Assistant ...</span><br>Overwrite AA: <a href=# id=warpeacea>' + (aaswitch ? 'YES' : 'NO') + '</a><br>' +
 '<a href="' + home + 'admincp.php?mode=3" target=cna>MHA CN Assistant</a><span id=cnaspeciallink></span></td></tr></table></div>';
 /*'<a href=# id=cnahide style="font-size:80%">Hide content</a></div>' +
 '<div id=cnahidden style="display:none"><a href=# id=cnashow style="font-size:80%">Show content</a></div>' ;*/
/*newnode.style.position = 'absolute';
newnode.style.top = '4px';
newnode.style.left = '20px';
document.body.appendChild(newnode);*/
var cell = o('table25').tBodies[0].rows[0].cells[1];
cell.style.height = '75px';
cell.innerHTML = '';
cell.appendChild(newnode);

if(!GM_xmlhttpRequest){
	newnode.innerHTML = 'No GM_xmlhttpRequest!';
} else {
	docnalogin();
	document.getElementById('warpeacea').addEventListener("click", function(){
		var node = document.getElementById('warpeacea');
		GM_setValue('aaswitch', aaswitch = (node.innerHTML == 'NO') ? 1 : 0);  	
		node.innerHTML = (node.innerHTML == 'NO') ? 'YES' : 'NO';
	  }, false)
	/*document.getElementById('cnahide').addEventListener("click", function(){
		o('cnacontent').style.display = 'none'; o('cnahidden').style.display = '';
	}, false);
	document.getElementById('cnashow').addEventListener("click", function(){
		o('cnahidden').style.display = 'none'; o('cnacontent').style.display = '';
	}, false);*/
}
function docnalogin(){
	if(document.body.innerHTML.match(/>:\.\nPrivate Nation Messages<\/font>/)){
		cnalogincallback({responseText:'Logged in (my own nation)'});
		return;
	}
	var data = (o('f1')) ? 'username=' + o('f1').value + '&password=' + o('f2').value : 'ajax=1';
	GM_xmlhttpRequest({
		url: home + 'index.php',
		method: 'POST',
		data:data,
		headers:{ 'Content-type': 'application/x-www-form-urlencoded'},
		onload: cnalogincallback,
		onerror: function(responseDetails){ o('cnawrapper').innerHTML = 'Error '+responseDetails.status; }
	});
}

function cnalogincallback(responseDetails) {
	obj = o('cnacontact');
	if(responseDetails.responseText.substring(0,9) == 'Logged in'){
		obj.innerHTML = responseDetails.responseText;
		o('cnalogin').style.display = 'none'; o('cnacontent').style.display = '';
		if(!o('cnastatus')){
			var statusnode = document.createElement('span');
			obj.parentNode.appendChild(document.createElement('br'));					
			statusnode.setAttribute('id', 'cnastatus');
			obj.parentNode.appendChild(statusnode);//, obj.nextSibling.nextSibling);
		}
		o('cnastatus').innerHTML = 'Sending data to MHAsWAR Assistant ...';
		var url;
		if (document.location.href.match(/allNations_display_alliances.asp/)){
			url = home + 'admincp.php?mode=3';
			data = 'ajax=1&targets=' + myencode(document.body.innerHTML);
			o('cnaspeciallink').innerHTML = ' &ndash; <a href="' + home + 'admincp.php?mode=3" target=cna>All Nations Display Parser</a>';
		} 
		else {
			o('cnastatus').innerHTML = 'No special action for this page';
			o('cnaspeciallink').innerHTML = '';
			return;
		}
		data += '&peacetime=' + (aaswitch ? 'peace' : 'war');
		GM_xmlhttpRequest({
			url:url,
			method: 'POST',
			data:data,
			headers:{ 'Content-type': 'application/x-www-form-urlencoded'},
			onload: function(responseDetails) {
				var obj = o('cnastatus');
				obj.innerHTML = responseDetails.responseText;
			}
		});
		
		checkVersion();
	} else {
		o('cnacontent').style.display = 'none'; o('cnalogin').style.display = '';
		o('cnalogin').innerHTML = responseDetails.responseText;
		/*o('cnastatus').innerHTML = '<form id=cnaloginform action="javascript:void(0)">User:<input name=f1> Pwd:<input name=f2 type=password><br>'+
			'<input type=submit value=" Log in "></form>';*/
		o('cnaloginform').addEventListener("submit", docnalogin, false)
	}	
}

function checkVersion(){
	var lastupdate = GM_getValue('lastupdate');

	var cnaversion = o('cnaversion');
	if(!cnaversion){
		cnaversion = document.createElement('span');
		cnaversion.id = 'cnaversion';
		o('cnacontact').parentNode.insertBefore(cnaversion, o('cnacontact'));
		o('cnacontact').parentNode.insertBefore(document.createElement('br'), o('cnacontact'));
	}
	cnaversion.innerHTML = lastupdate ? 
		('Last checked for updates ' + Math.floor((new Date() - new Date(lastupdate)) / 60000) + ' min ago. <a id=jsupdatecheck href=#>Check now</a>')
		: '';

	if((!lastupdate) || (new Date() - new Date(lastupdate) > 3600000)){
		GM_setValue('lastupdate', new Date().toString());
		cnaversion.innerHTML = 'Checking for updates (this is version ' + version + ')';
		var url = home + 'cnassistantdataloader.user.js?t=' + new Date().getTime() + '.user.js';
		GM_xmlhttpRequest({
			url: url,
			method: 'GET',
			headers:{'Pragma': 'no-cache', 'Cache-Control':'no-cache'},
			onload: function(responseDetails){
				var newversion = /var version = ([0-9\.]+)/g.exec(responseDetails.responseText);
				if(newversion){
					newversion = 1 * newversion[1];
					if(newversion > version){
						cnaversion.innerHTML = 'New version ' + newversion + ' available <a href="' + url + '">here</a>!';
						cnaversion.style.fontSize = '';
						cnaversion.style.fontWeight = 'bold';
					} else {
						cnaversion.innerHTML = 'No updates (this is version ' + version + ', latest is '+newversion+')';						
					}
				} else cnaversion.innerHTML = 'No version information (this is version ' + version + ')';
				//alert(version + '/' + newversion + '/' + newversion[1] );
			}
		});
	} else {
		o('jsupdatecheck').addEventListener("click", function(){
			GM_setValue('lastupdate', '');
			checkVersion();
		  }, false);
	}
}

function o(s){ return document.getElementById(s); }

function myencode(s){ 
	s = encodeURI(s);
	s = s.replace(/%20/g,'+');
	s = s.replace(/&/g, '%26');
	s = s.replace(/=/g, '%3D');
	s = s.replace(/%C3%A/gi, '%E'); // � hack
	return s;
}

