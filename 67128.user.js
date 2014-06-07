// ==UserScript==
// @name          FB Detagger
// @namespace     http://localhost/
// @description   remove user tags in facebook photos
// @include       http://www.facebook.com/*
// ==/UserScript==

function setupDetagger(thisWindow) {
	//alert("go!!");
	// test che verifica se la pagina è l'album
	var myHash =  thisWindow.location.hash;
	var myURL  =  thisWindow.location.href;
	if (myHash=="" || myHash=="#") myHash =  thisWindow.location.href;
	var myPattern_face = /www.facebook.com/;
	var myPattern_photos = /v=photos/;
	if (!myPattern_face.test(myURL) || !myPattern_photos.test(myHash)){
		// alert("Non sei sulla pagina giusta");
		return -1;
	}
	
	var thisDocument = thisWindow.document;
	
	// Ricerca della tabella delle foto taggate
	var myTable = null;
	var tables  = thisDocument.getElementsByTagName('table');
	for (var i=0; i<tables.length; i++){
		if (tables[i].className=="UIPhotoGrid_Table"){
			myTable = tables[i];
			//alert("tabella trovata");
		}
	}
	
	// Non c'è la tabella quindi non fa niente
	if (myTable==null) return 0;
	
	var ids = campiURL(thisDocument.getElementById("top_bar_pic").href, ["viewas", "id"]);
	if (ids[0]!=ids[1]) {
		// alert("Non sei sulla pagina giusta");
		return -1;
	}
	
	// test setupDetagger gia' eseguito
	if ( thisDocument.getElementById("myRemoveButton")!=null) return 1;
	
	// Variabili iniziali
	var post_form_id =  thisDocument.getElementById("post_form_id").value;

	var vm_txt = thisDocument.documentElement.innerHTML;
	var fb_dtsg= vm_txt.match("fb_dtsg:\"([^\"]+)\",")[1];
	//var fb_dtsg =  thisDocument.getElementById("fb_dtsg").value;
	var name = escape(thisDocument.getElementById("profile_name").textContent);
	var pid = "";
	var id = "";
	var uid = "";
	
	// Dati da passare alla post fissi
	var dataF = "&name=" + name +
	            "&action=remove" + 
	            "&post_form_id=" + post_form_id + 
	            "&fb_dtsg=" + fb_dtsg +
	            "&post_form_id_source=AsyncRequest";			
	// alert(dataF);
	
	// Accesso <tbody> 
	var tBodyChilds = myTable.childNodes;
	var myTbody;
	for (var i=0; i<tBodyChilds.length; i++){
		if (tBodyChilds[i].tagName=="TBODY"){
			myTbody = tBodyChilds[i];	
			//alert("tbody trovato");
		}
	}
	
	// Accesso <tr>
	var myTrChilds = myTbody.childNodes;
	var cell;
	var data;
	var myIndex = 0;
	// Accesso ai vari <td>
		// scorro riga
	for (var i=0; i<myTrChilds.length; i++){
		if (myTrChilds[i].tagName=="TR"){
			//alert("primo for");
				// scorro colonna
			for (var j=0; j<myTrChilds[i].childNodes.length; j++){
				//alert("secondo for");
				cell = myTrChilds[i].childNodes[j];
				if (cell.tagName=="TD"){
					//alert("dentro");
					var params = campiURL(cell.childNodes[0].href, ["pid", "id", "subj"]);
					pid = params[0];
					id  = params[1];
					uid = params[2];
					
					data =  "pid=" + pid + "&id=" + id + "&subject=" + uid + dataF;
					//alert(data);
					var myCheckBox= thisDocument.createElement("input");
					myCheckBox.type="checkbox";
					//myCheckBox.name="myCheckBox"+myIndex;
					myCheckBox.id="myCheckBox"+myIndex;
					myCheckBox.value =data;
					// Aggiunta checkbox
					cell.appendChild(myCheckBox);
					myIndex++;
				}
			}
		}
	}
	// Aggiunta pulsante Rimuovi dopo myTable
	var myRemoveButton =  thisDocument.createElement("a");
	// myRemoveButton.name="myRemoveButton";
	myRemoveButton.id="myRemoveButton";
	myRemoveButton.textContent="Remove Tag";
	myRemoveButton.href="javascript: removeDetagger("+myIndex+");";
	myTable.parentNode.insertBefore(myRemoveButton,myTable);
	// Aggiunta pulsante Selezione tutto
	var mySelectAllButton =  thisDocument.createElement("a");
	mySelectAllButton.id="mySelectAllButton";
	mySelectAllButton.textContent="Select All";
	mySelectAllButton.href="javascript: selectDetagger("+myIndex+"); ";
	
	
	var myScriptCode =  thisDocument.createElement("script");
	myScriptCode.type = "text/javascript";
	myScriptCode.textContent = '\n'+
	'function removeDetagger(num) { \n'+
	'	for(var i=0; i<num; i++) { \n'+
	'		var myChecked = document.getElementById("myCheckBox"+i);  \n'+
	'		if (myChecked==null){ break;} \n'+
	'		if (myChecked.checked==true){  \n'+
	'			var data = myChecked.value;  \n'+
	'			var requestRemove = new XMLHttpRequest();  \n'+
	'			requestRemove.open("POST", "http://www.facebook.com/ajax/photo_tagging_ajax.php?__a=1", false);  \n'+
	'			requestRemove.setRequestHeader("Connection", "close");  \n'+
	'			requestRemove.setRequestHeader("Origin", "http://www.facebook.com");  \n'+
	'			requestRemove.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");  \n'+
	'			requestRemove.setRequestHeader("Referer" , "http://www.facebook.com/home.php");  \n'+
	'			requestRemove.setRequestHeader("Content-Length", data.length);  \n'+
	'			requestRemove.setRequestHeader("Pragma", "no-cache");  \n'+
	'			requestRemove.setRequestHeader("Cache-Control", "no-cache");  \n'+
	'			requestRemove.send(data);  \n'+
	'		}  \n'+
	'	}  \n'+
	'	alert("Detag is Done"); \n'+
	'	location.href="http://www.facebook.com/profile.php?v=photos&ref=profile"; \n'+
	'}; \n'+
	'function selectDetagger(num) { \n'+
	'	for(var i=0; i<num; i++) { \n'+
	'		var myChecked = document.getElementById("myCheckBox"+i); \n'+
	'		if (myChecked==null){ break;} \n'+
	'		myChecked.checked=true; \n'+
	'	} \n'+
	'}; \n';
	
	myTable.parentNode.insertBefore(myScriptCode, myRemoveButton);
	myTable.parentNode.appendChild(mySelectAllButton);
	   // Evita il ridimensionamento del div
	var myDiv =  thisDocument.getElementById("photos_of_wrapper");
	myDiv.setAttribute("style","");
	myDiv.childNodes[0].setAttribute("style","");
	return 0;
};

function campiURL(url, listParams) {
	var params = url.split("?")[1].split("&");
	var listValue = new Array(listParams.length);
	for (var k=0;k<params.length;k++) { 
		var value = params[k].split("=");
		for (i=0; i<listParams.length; i++) {
			if (value[0]==listParams[i])  {
				listValue[i] = value[1];
				break;
			}
		}
	}
	return listValue;
};

// Ripetere azione ogni tot milli secondi con guardia
setInterval(function() { 
	setupDetagger(window);
}, 2000);