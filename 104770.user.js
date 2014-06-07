// ==UserScript==

// @name           Opciones de mensajes extendidas

// @namespace      Tomado de foxgame

// @description    Responder a mensajes

// @include        http://*.ogame.*/game/index.php?page=*

// ==/UserScript==



if (document && !foxgame2_isMessagesUrl(document.location.href)) return;
	if (!foxgame2_GetBooleanPref("foxgameHighlight",true)) return;

	if (foxgame2_Debug) alert("Estamos privados");
	
	try {
		foxgame2_listaHighlights.load();

		for (var i = foxgame2_listaHighlights.data.length-1; i >= 0 ; i--)
		{
			var ele = foxgame2_listaHighlights.data[i];
			switch(ele.type){
				case "CC":
					foxgame2_HLCC(document,ele);
					break;
				case "PM":
					foxgame2_HLPM(document,ele);
					break;
				case "SpyReport":
					foxgame2_HLSpyRep(document,ele);
					break;
				case "SpyAlert":
					foxgame2_HLSpyAlert(document,ele);
					break;
				case "Missile":
					foxgame2_HLMissile(document,ele);
					break;
			}
		}
	} catch (e) {
		foxgame2_debug(e);
	}
}

//*****************************************************************************************
function foxgame2_HLPM(document,ele) {
	try {

		var path = '//table/tbody/tr/th[4]/child::a/img[@alt!=""]';
		var obj = foxgame2_eval(path,document);
		var others = ele.other.split('~');

		for (var i = 0; i < obj.snapshotLength; i++)
		{				
			var obj2 = obj.snapshotItem(i).parentNode.parentNode.parentNode;
			var tok = 1;
			var modo = foxgame2_parseInt(others[0]);
			if (modo % 2 == 1) {
				var searchFrom = others[tok].split('\n');
				var text = obj2.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nodeValue;
				if (!foxgame2_findAny(text,searchFrom))
						continue;
				tok++;
			}
			modo = (modo - (modo % 2))/2;
			if (modo % 2 == 1) {
				var searchText = others[tok].split('\n');
				var td = obj2.nextSibling.nextSibling.firstChild.nextSibling.nextSibling;
				var text = td.innerHTML;
				if (!foxgame2_findAny(text,searchText))
					continue;
				tok++;
			}
			modo = (modo - (modo % 2))/2;
			if (modo % 2 == 1) {
				var searchAbout = others[tok].split('\n');
				var text = obj2.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nodeValue;
				if (!foxgame2_findAny(text,searchAbout))
						continue;
				tok++;
			}

			//HL Nodes
			var nodes = obj2.childNodes;			
			for (var j = 0; j < nodes.length; j++) {
				if (nodes[j].nodeName != "#text")
					nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
			}
			nodes = obj2.nextSibling.nextSibling.childNodes;
			for (var j = 0; j < nodes.length; j++) {
				if (nodes[j].nodeName != "#text")
					nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
			}

		}

	} catch (e) {
		foxgame2_debug(e);
	}
}

//*****************************************************************************************
function foxgame2_HLSpyRep(document,ele) {
	try {
		var path='//td[@colspan="3"][@class="b"]/table[@width="400"][1]/tbody/tr[2]';
		var others = ele.other.split('~');
		var obj = foxgame2_eval(path,document);

		var modo = foxgame2_parseInt(others[0]);
		for (var i = 0; i < obj.snapshotLength; i++)
		{		
			var obj2 = obj.snapshotItem(i).parentNode.parentNode.parentNode.parentNode;
			var modoTemp = modo;
			if (modoTemp >= 4) {
				var path1 = './td[2]/table[3]/tbody/tr[1]';
				var path2 = './td[2]/table[3]/tbody/tr[2]';
				if (foxgame2_evalnode(path1,document,obj2).snapshotLength == 0 || foxgame2_evalnode(path2,document,obj2).snapshotLength > 0)
					continue;
				modoTemp -= 4;
			} 
			if (modoTemp >= 2) {
				var path1 = './td[2]/table[4]/tbody/tr[1]';
				var path2 = './td[2]/table[4]/tbody/tr[2]';
				if (foxgame2_evalnode(path1,document,obj2).snapshotLength == 0 || foxgame2_evalnode(path2,document,obj2).snapshotLength > 0)
					continue;
				modoTemp -= 2;
			}
			if (modoTemp >= 1) {
				var tr2 = obj.snapshotItem(i);
				var metal = tr2.firstChild.nextSibling.innerHTML;
				var cristal = tr2.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
				var deut = tr2.nextSibling.nextSibling.firstChild.nextSibling.innerHTML;
				var total = foxgame2_parseInt(metal) + foxgame2_parseInt(cristal) + foxgame2_parseInt(deut);
				switch(others[2]) {
					case "Metal":
						if (foxgame2_parseInt(others[1]) > foxgame2_parseInt(metal))
							continue;
						break;
					case "Cristal":
						if (foxgame2_parseInt(others[1]) > foxgame2_parseInt(cristal))
							continue;
						break;
					case "Deuterio":
						if (foxgame2_parseInt(others[1]) > foxgame2_parseInt(deut))
							continue;
						break;
					case "Total":
						if (foxgame2_parseInt(others[1]) > total)
							continue;
						break;
				}
			}

			//HL Nodes
			var nodes = obj2.previousSibling.previousSibling.childNodes;			
			for (var j = 0; j < nodes.length; j++) {
				if (nodes[j].nodeName != "#text")
					nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
			}
			nodes = obj2.childNodes;
			for (var j = 0; j < nodes.length; j++) {
				if (nodes[j].nodeName != "#text")
					nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
			}
		}
	} catch (e) {
		foxgame2_debug(e);
	}
}

//*****************************************************************************************
function foxgame2_HLSpyAlert(document,ele) {
	try {
		var path = '//span[@class="espionagereport"]';
      	var obj = foxgame2_eval(path,document);
      	if (obj.snapshotLength == 0) return;
      	for (var i = 0; i < obj.snapshotLength; i++)
      	{
         		var obj2 = obj.snapshotItem(i).parentNode.parentNode;
         		tr2 = obj2.nextSibling.nextSibling;
         		var tr3 = foxgame2_evalnode('.//table/tbody/tr[1]',document,tr2);
         		if (tr3.snapshotLength == 0) {
            		var nodes = obj2.childNodes;
            		for (var j = 0; j < nodes.length; j++) {
               			if (nodes[j].nodeName != "#text")
                  			nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
            		}
            		nodes = obj2.nextSibling.nextSibling.childNodes;
            		for (var j = 0; j < nodes.length; j++) {
               			if (nodes[j].nodeName != "#text")
                  			nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
            		}
         		}
	     	}
   	} catch (e) {
      	foxgame2_debug(e);
   	}
}

//*****************************************************************************************
function foxgame2_HLMissile(document,ele) {
	try {
    		var path = '//table/tbody/tr/td[@colspan="3"][@class="b"]/table[@width=400]';
      	var obj = foxgame2_eval(path,document);
      	if (obj.snapshotLength == 0) return;
      	for (var i = 0; i < obj.snapshotLength; i++)
      	{
         		var obj2 = obj.snapshotItem(i).parentNode.parentNode;
         		tr2 = obj2.previousSibling.previousSibling;
         		var tr3 = foxgame2_evalnode('.//th[4]/child::span[@class="espionagereport"]',document,tr2);
         		if (tr3.snapshotLength == 0) {
            		var nodes = tr2.childNodes;
            		for (var j = 0; j < nodes.length; j++) {
               			if (nodes[j].nodeName != "#text")
                  			nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
            		}
            		nodes = obj2.childNodes;
            		for (var j = 0; j < nodes.length; j++) {
               			if (nodes[j].nodeName != "#text")
                  			nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
            		}
         		}
      	}
	} catch (e) {
      foxgame2_debug(e);
   }
}

//*****************************************************************************************
function foxgame2_HLCC(document,ele) {
	try {
		var path='//table/tbody/tr/th[3]';
		var others = ele.other.split('~');
		var obj = foxgame2_eval(path,document);

		for (var i = 0; i < obj.snapshotLength; i++)
		{		
			var from = obj.snapshotItem(i).innerHTML;
			if (from.stripHTMLEntities().trim() == "")	//Fix for ogame.com.pt 
				from = obj.snapshotItem(i).nextSibling.innerHTML;
			var found = from.match(/\[.*\]/);
			if (!found) continue;
			if (foxgame2_isCoord(found[0])) continue;
			
			switch(others[0]){
				case '1':
				case '3':
					var searchFrom = others[1];
					var td = obj.snapshotItem(i).parentNode.nextSibling.nextSibling.firstChild.nextSibling.nextSibling;
					var text = td.firstChild.nodeValue;
					if (text.search(searchFrom) == -1)
						continue;
					if (others[0] == '1')
						break;
				case '2':
					if (others[0] == '2')
						var searchText = others[1];
					else
						var searchText = others[2];
					var td = obj.snapshotItem(i).parentNode.nextSibling.nextSibling.firstChild.nextSibling.nextSibling;
					var text = td.firstChild.nextSibling.nextSibling.nodeValue;
					if (text.search(searchText) == -1)
						continue;
				break;
			}

			//HL node
			var obj2 = obj.snapshotItem(i).parentNode;
			var nodes = obj2.childNodes;			
			for (var j = 0; j < nodes.length; j++) {
				if (nodes[j].nodeName != "#text")
					nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
			}
			nodes = obj2.nextSibling.nextSibling.childNodes;
			for (var j = 0; j < nodes.length; j++) {
				if (nodes[j].nodeName != "#text")
					nodes[j].setAttribute("style", "background-color : "+ele.color+"; background-image : none;");
			}
		}
	} catch (e) {
		foxgame2_debug(e);
	}
}

//*****************************************************************************************
function foxgame2_replicateOptions(document) {

	if (document && !foxgame2_isMessagesUrl(document.location.href)) return;
		
	try {
		if (foxgame2_GetBooleanPref("foxgameReplicateSpyReportOptions",false)) 
		{

			var path = '//table/tbody/tr/th/input[@name="fullreports"]';
			var row = foxgame2_eval(path,document);
			if (row.snapshotLength == 0) return;
			row = row.snapshotItem(0).parentNode.parentNode;
			var row2 = row.cloneNode(true);
			row.firstChild.nextSibling.firstChild.setAttribute("id","fullreports");
			row.firstChild.nextSibling.firstChild.setAttribute("onchange","document.getElementById('fullreports2').checked=this.checked");

			row2.firstChild.nextSibling.firstChild.setAttribute("name","fullreports2");
			row2.firstChild.nextSibling.firstChild.setAttribute("id","fullreports2");
			row2.firstChild.nextSibling.firstChild.setAttribute("onchange","document.getElementById('fullreports').checked=this.checked");
			row.parentNode.insertBefore(row2,row.parentNode.firstChild);

		} 
		if (foxgame2_GetBooleanPref("foxgameReplicateDeleteOptions",true)) 
		{

			var path = '//table/tbody/tr/th/select[@name="deletemessages"]';
			var row = foxgame2_eval(path,document);
			if (row.snapshotLength == 0) return;
			row = row.snapshotItem(0).parentNode.parentNode;
			var row2 = row.cloneNode(true);
			row.firstChild.nextSibling.firstChild.nextSibling.setAttribute("id","deletemessages");
			row.firstChild.nextSibling.firstChild.nextSibling.setAttribute("onchange","document.getElementById('deletemessages2').options[this.selectedIndex].selected='true'");
	
			row2.firstChild.nextSibling.firstChild.nextSibling.setAttribute("name","deletemessages2");
			row2.firstChild.nextSibling.firstChild.nextSibling.setAttribute("id","deletemessages2");
			row2.firstChild.nextSibling.firstChild.nextSibling.setAttribute("onchange","document.getElementById('deletemessages').options[this.selectedIndex].selected='true'");
			row.parentNode.insertBefore(row2,row.parentNode.firstChild);		
		}
		//Recolocamos el formulario para que el arbol tenga una estructura correcta
	
		var table = foxgame2_eval( 
			'//table[@width="519"]', document)
		if (table.snapshotLength == 0) return;
		table = table.snapshotItem(0);
		var form = foxgame2_eval (
			'//form[starts-with(@action,"index.php?page=messages")]', document);
		if (form.snapshotLength == 0) return;
		form = form.snapshotItem(0);
		form.parentNode.removeChild(form);
		table.parentNode.insertBefore(form,table);
		table.parentNode.removeChild(table);
		form.appendChild(table);
	} catch (e) {
		foxgame2_debug(e);
	}
}

//*****************************************************************************************
function foxgame2_addSignature(document) {

	if (document && !foxgame2_isWriteMessagesUrl(document.location.href) && !foxgame2_isWriteCircularUrl) return;
	if (!foxgame2_GetBooleanPref("foxgameMessageSignature",true)) return;
	
	try {
		var path = '//textarea[@name="text"]';
		var obj = foxgame2_eval(path,document);
		try {
			var signature = foxgame2_PrefsBranch.getCharPref("foxgameMessageSignatureText");
		} catch(e) { var signature ="";}

		if (obj.snapshotLength == 0) return;
		obj = obj.snapshotItem(0);
		obj.value = signature;
	} catch(e) {
		foxgame2_debug(e);
	}
}

//*****************************************************************************************
function foxgame2_simLinks(document) {

	if (document && !foxgame2_isMessagesUrl(document.location.href) && !foxgame2_isMessageUrl(document.location.href)) return;
	if (!foxgame2_GetBooleanPref("foxgameSpeedSimLink",false) && !foxgame2_GetBooleanPref("foxgameDragoSimLink",false)) return;

	try {
		var speedLang = foxgame2_findLang(document,foxgame2_server_lang2);
		var dragoLang = foxgame2_findLang(document,foxgame2_server_lang);
		var speed = foxgame2_GetBooleanPref("foxgameSpeedSimLink",false);
		var drago = foxgame2_GetBooleanPref("foxgameDragoSimLink",false);
		
		foxgame2_addJavaScript(document,"chrome://foxgame2/content/resources/js/foxgame_addSims.js");
		var func = "";		
		if (foxgame2_isMessagesUrl(document.location.href))
			func = "foxgame2_initSimMessages";
		else if (foxgame2_isMessageUrl(document.location.href))
			func = "foxgame2_initSimMessage";
		foxgame2_loadJs(document,func+"('"+speedLang+"',"+speed+",'"+dragoLang+"',"+drago+")");
		
	} catch (e) {
		foxgame2_debug(e);
	}
}

//*****************************************************************************************
function foxgame2_addRaid2(document) {

	if (document && !foxgame2_isMessagesUrl(document.location.href)) return;
	if (!foxgame2_GetBooleanPref("foxgameAddRaid",true)) return;
	
	try {
		var size = foxgame2_parseInt(foxgame2_PrefsBranch.getCharPref("foxgameAddRaidSize"));
	} catch(e) { var size = 25000;}
	
	foxgame2_addJavaScript(document,"chrome://foxgame2/content/resources/js/foxgame_addRaid.js");		
	foxgame2_loadJs(document,"foxgame_initRaid ('"+size+"','"+foxgame2_messages.GetStringFromName("foxgame.inner.Total")+"','"+foxgame2_messages.GetStringFromName("foxgame.inner.Raid")+"')");	
}

//*****************************************************************************************
function foxgame2_addRaid(document) {

	if (document && !foxgame2_isMessageUrl(document.location.href)) return;
	if (!foxgame2_GetBooleanPref("foxgameAddRaid",true)) return;
	
	try {
			var size = foxgame2_parseInt(foxgame2_PrefsBranch.getCharPref("foxgameAddRaidSize"));
	} catch(e) { var size = 25000;}
	try {
		var td = foxgame2_eval('//tr[@class="areadetail"]//td[@class="item"]/following-sibling::td[1]', document);	

		if (td.snapshotLength === 0)
			return;
		var res, text, total, total2;
		total = 0;
		total2 = new Array();			
		for (var i = 0; i < td.snapshotLength-1; i++) {
			res = foxgame2_parseInt(td.snapshotItem(i).innerHTML.trim());
			total += res;
			total2[i] = res;
		}
		td = td.snapshotItem(0);
		total2 = foxgame2_calcMinFleet(total2[0]/2, total2[1]/2, total2[2]/2, size); 
		var tr = td.parentNode.cloneNode(true);
		tr.cells[0].innerHTML = foxgame2_messages.GetStringFromName("foxgame.inner.Total");
		tr.cells[1].innerHTML = foxgame2_NumberFormat(total);
		tr.cells[2].innerHTML = foxgame2_messages.GetStringFromName("foxgame.inner.Raid");
		tr.cells[3].innerHTML = foxgame2_NumberFormat(total2);
		td.parentNode.parentNode.appendChild(tr);
	} catch (e) {
		foxgame2_debug(e);
	}
}

//*****************************************************************************************
function foxgame2_calcMinFleet(metal, crystal, deut, size) {
	
	var  total2 = (metal + crystal + deut)/size;
	if (Math.round(total2) != total2)
		total2 = Math.round(total2) + 1;
	var ok = false;
	do {
		var auxMetal = metal;
		var auxCrystal = crystal;
		var totalSize = total2 * size;
		var maxMetal = Math.floor(totalSize/3);
		if (maxMetal > auxMetal) {
			totalSize = totalSize - auxMetal;
			auxMetal = 0;
		} else {
			totalSize = totalSize - maxMetal;
			auxMetal = auxMetal - maxMetal;
		}			
		var maxCrystal = Math.floor(totalSize/2);
		if (maxCrystal > auxCrystal) {
			totalSize = totalSize - auxCrystal;
			auxCrystal = 0;
		} else {
			totalSize = totalSize - maxCrystal;
			auxCrystal = auxCrystal - maxCrystal;
		}
		if (totalSize > deut) {
			totalSize = totalSize - deut;			
		} else {
			total2++; //Not enough space for all deut.
			continue;
		}
		var maxMetal = Math.floor(totalSize/2);
		if (maxMetal > auxMetal) {
			totalSize = totalSize - auxMetal;
			auxMetal = 0;
		} else {
			total2++; //Not enough space for all metal.
			continue;
		}			
		if (totalSize > auxCrystal) {
			totalSize = totalSize - auxCrystal;
			auxCrystal = 0;
			ok = true;
		} else {
			total2++; //Not enough space for all crystal.
			continue;
		}		
	} while (!ok);
	return total2;
}
//*****************************************************************************************
// Code from SA
//*****************************************************************************************	
function foxgame2_fastReply(document){
  	if (!document) return;  // no url check
  	if (document && !foxgame2_isMessageUrl(document.location.href)) return;

	if (!foxgame2_GetBooleanPref("foxgameFastReply",false))
		return;
	try {		
		var div = foxgame2_eval('//div[@class="note"]',document);
		if (div.snapshotLength == 0)
			return;
		var noteDiv = div.snapshotItem(0);
		
		var insertForm = true;
		var insertCode = false;
		var player = "", subject = "";			
		var div2 = foxgame2_eval('//div[starts-with(@class,"answerHeadline")]',document);
		if (div2.snapshotLength != 0) {
			insertForm = false;
			insertCode = true;
		}			
		var table = foxgame2_eval('//div[@class="infohead"]/table',document);
		if (table.snapshotLength == 0)
			insertForm = false;
		else {
			table = table.snapshotItem(0);
			player = table.rows[0].cells[1].textContent.trim();
			subject = table.rows[2].cells[1].textContent.trim();
			if (player.indexOf("[") == -1)
				insertForm = false;
		}
		var session = foxgame2_getHashProperty(document.location.href,'session');
		if (insertForm) { //Circ modifications
			insertCode = true;	
			div = noteDiv.parentNode;
			div.className = "textWrapperSmall";
			div = div.parentNode;
			newDiv = document.createElement("div");		
			newDiv.innerHTML = '<div class="answerHeadline open"><span id="Replytype">'+foxgame2_messages.GetStringFromName("foxgame.inner.CircMsg") + '</span>' +
			'&nbsp;&nbsp;&nbsp;&nbsp;<span id="ButtonReply">['+foxgame2_messages.GetStringFromName("foxgame.inner.PMReply")+']</span>' +
			'&nbsp;&nbsp;&nbsp;&nbsp;<span id="ButtonQuote">['+foxgame2_messages.GetStringFromName("foxgame.inner.Quote")+']</span>' +
			'<a id="openCloseForm" href="#"></a></div>';
			newDiv.innerHTML += '<div id="answerForm" class="textWrapperSmall">' +
			'<form target="_parent" method="post" action="index.php?page=networkkommunikation&session='+session+'&empfaenger=0" name="asdf">' +
			'<input type="hidden" name="empfaenger" value="0"></input>'+
			'<div class="answerText"><textarea tabindex="3" name="text" class="mailnew" onkeyup="javascript:cntchar(2000)"></textarea><input type="hidden" name="betreff" value="RE:'+subject+'" /></div>' + 
   			'<div class="answerText"><div class="fleft count textBeefy">(<span id="cntChars">0</span> / 2000)</div>' + 
			'<div class="fleft buttonbox"><input tabindex="4" name="submitMail" type="submit" class="button188" value="'+foxgame2_messages.GetStringFromName("foxgame.inner.Send")+'" /></div><br class="clearfloat" />' +
			'</div></form></div>';
			div.appendChild(newDiv);
		} else if (insertCode) { //PM modifications			
			div2.snapshotItem(0).innerHTML = '<span id="Replytype">'+foxgame2_messages.GetStringFromName("foxgame.inner.PMMsg") + '</span>' +
			'&nbsp;&nbsp;&nbsp;&nbsp;<span id="ButtonReply">['+foxgame2_messages.GetStringFromName("foxgame.inner.CircReply")+']</span>' +
			'<a id="openCloseForm" href="#"></a>';
		}
		if (insertCode) { //Insert js code
			var from = "";
			if (!insertForm) {
				var form = foxgame2_eval('//div[@id="answerForm"]//form',document);
				if (form.snapshotLength != 0)
					from = foxgame2_getHashProperty(form.snapshotItem(0).action,'to');			
			} else {
				var subject = noteDiv.firstChild.textContent.trim();
				from = foxgame2_getAllyPIN(document, subject);
				if (from != null)
					from = from[0];
			}
			var message = foxgame2_getHashProperty(document.location.href,'msg_id');			
			foxgame2_addJavaScript(document,"chrome://foxgame2/content/resources/js/foxgame_fastReply.js");
			foxgame2_loadJs(document,"foxgame2_initReplys('"+session+"','"+from+"','"+message+"','"+foxgame2_messages.GetStringFromName("foxgame.inner.PMMsg")+"','"+foxgame2_messages.GetStringFromName("foxgame.inner.CircMsg")+
				"','"+foxgame2_messages.GetStringFromName("foxgame.inner.PMReply")+"','"+foxgame2_messages.GetStringFromName("foxgame.inner.CircReply")+"','"+foxgame2_messages.GetStringFromName("foxgame.inner.Quote")+"','"+foxgame2_messages.GetStringFromName("foxgame.inner.Clear")+"');");
			if (!insertForm) 
				foxgame2_loadJs(document,"foxgame2_modifyForm();");
		}				
	} catch (e) {
		foxgame2_debug(e);
	}
}

