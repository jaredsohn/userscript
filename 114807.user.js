// ==UserScript==
// @name           	PasteOnMassUpdate
// @namespace           juarez.bochi@nsn.com
// @include        	https://*online.portal.nokiasiemensnetworks.com/epm/massUpdateLookupDispatch.do
// ==/UserScript==

insertPasteButton();
injectPasteScripts();
			
function insertPasteButton() {
	var inputs = document.getElementsByTagName('input');
	for (cont = 0; cont < inputs.length; cont++) {
		if (inputs[cont].value == 'Populate') {
			pasteBtn = document.createElement('input');
			pasteBtn.name = 'action';
			pasteBtn.value = 'Paste';
			pasteBtn.type = 'submit';
			pasteBtn.title = 'Paste that from Excel';
			pasteBtn.setAttribute('onclick', 'pasteClip(); return false;');
			pasteBtn.setAttribute('style', 'width: 80px;');
			pasteBtn.setAttribute('class', 'ipmSubmitButton');
			inputs[cont].parentNode.appendChild(pasteBtn);
			return true;
		}
	}
}

function injectScript(scriptText) {
	var script = document.createElement('script');
	var text = document.createTextNode(scriptText);
	script.type = 'text/javascript';
	script.appendChild(text);
	document.body.appendChild(script);
	return true;
}

function injectPasteScripts() {
	injectScript("																							\n\
		function getClipboard() {																			\n\
			try {																							\n\
				netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');					\n\
			} catch (e) {																					\n\
				alert('Oops! It looks like your browser does not allow access to clipboard.'); 				\n\
				return '';																					\n\
			}																								\n\
			var clipboard = Components.classes['@mozilla.org/widget/clipboard;1'].getService();				\n\
			if ( clipboard ) clipboard = clipboard.QueryInterface(Components.interfaces.nsIClipboard);		\n\
			var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance();			\n\
			if ( trans )																					\n\
				trans = trans.QueryInterface(Components.interfaces.nsITransferable);						\n\
			if ( trans && clipboard ) {																		\n\
				trans.addDataFlavor('text/unicode');														\n\
				clipboard.getData ( trans, clipboard.kGlobalClipboard);										\n\
				var str = new Object(); 																	\n\
				var strLength = new Object(); 																\n\
				trans.getTransferData('text/unicode',str,strLength); 										\n\
				if (str) str = str.value.QueryInterface(Components.interfaces.nsISupportsString); 			\n\
				if (str) pastetext = str.data.substring(0,strLength.value / 2); 							\n\
				return pastetext;																			\n\
			  }																								\n\
		}																									\n\
		function textToArray(text) {																		\n\
			var rows = text.split('\\n');																	\n\
			for(i = 0; i < rows.length; i++){																\n\
				rows[i] = rows[i].split('\\t');																\n\
			}																								\n\
			return rows;																					\n\
		}																									\n\
		function validClip(clip) {																			\n\
			if (clip.length > 0) {																			\n\
				if (clip[0].length == 21) {																	\n\
					if(clip[0][0] == 'Region' &&  clip[0][20] == 'Notes') {									\n\
						return true;																		\n\
					}																						\n\
				}																							\n\
			}																								\n\
			return false;																					\n\
		}																									\n\
		function getInputByName(strName) {																	\n\
			return document.getElementsByName(strName)[0];													\n\
		}																									\n\
		function updateDate(position, elementName, newdate) {												\n\
			var inputHid = getInputByName('item['+position+'].' + elementName + 'hid');						\n\
			if (inputHid.value != 'DONT_UPDATE') {															\n\
				var input = getInputByName('item['+position+'].' + elementName);							\n\
				if (!newdate)																				\n\
					newdate = '';																			\n\
				if (input.value != newdate) {																\n\
					input.value = newdate;																	\n\
					colorChange(elementName, position);														\n\
				}																							\n\
			}																								\n\
		}																									\n\
		function updateCompany(i, newCompany) {																\n\
			var companyArray = document.getElementsByName('item[' + i +'].completedByCompany')[0];			\n\
			if (companyArray.value != newCompany) {															\n\
				var companyDiv = document.getElementById('item[' + i +'].completedByCompanyDiv');			\n\
				if (!newCompany) {																			\n\
					companyDiv.innerHTML = '&nbsp;&nbsp;';													\n\
					companyArray.value = null;																\n\
				} else {																					\n\
					var index = -1;																			\n\
					var companyObj = document.getElementsByName('completedByCompanyDE')[0];					\n\
					for (var j=0;j<companyObj.options.length;j++) {											\n\
						if(companyObj.options[j].text == newCompany) {										\n\
							index = j;																		\n\
							companyDiv.innerHTML = '&nbsp;&nbsp;' + newCompany;								\n\
							companyArray.value = companyObj.options[index].value;							\n\
							j=companyObj.options.length;													\n\
						}																					\n\
					}																						\n\
					if (index == -1) {																		\n\
						companyDiv.innerHTML = newCompany + ' NOT FOUND!';									\n\
						companyArray.value = null;															\n\
					}																						\n\
				}																							\n\
				colorChangeForCombo('completedByCompany', i);												\n\
			}																								\n\
		}																									\n\
		function pasteClip() {																				\n\
			var clip = textToArray(getClipboard());															\n\
			if (!validClip(clip)) {																			\n\
				alert ('Please follow the steps below to use this button properly:\\n\\n\\t1) Retrieve the results using Query + Export Excel button;\\n\\t2) Make your changes on the Excel file;\\n\\t3) Copy the entire Excel sheet;\\n\\t4) Click this button again.\\n\\n\\nGreasemonkey script by juarez.bochi@nsn.com');								\n\
				return false;																				\n\
			} else {																						\n\
				for (i=0; i<massCheckObject.length; i++) {													\n\
					var wp = getInputByName('item['+ i + '].workPackageid').value;							\n\
					for (j = 1; j < clip.length; j++) {														\n\
						if (wp == clip[j][12]) {		// finds in which row the wp is in the xls sheet	\n\
								updateDate(i, 'completionPlannedDate',  clip[j][13]);						\n\
								updateDate(i, 'completionForecastDate', clip[j][14]);						\n\
								updateDate(i, 'completionActualDate',   clip[j][15]);						\n\
								updateCompany(i, clip[j][17]);  											\n\
								updateDate(i, 'notes',                  clip[j][20]);						\n\
								updateDate(i, 'workAcceptedByNokia',    clip[j][18]);						\n\
								updateDate(i, 'workAcceptedByCustomer', clip[j][19]);						\n\
						}																					\n\
					}																						\n\
				}																							\n\
				alert ('Data from excel has been successfully pasted!\\n\\n\\n\\nGreasemonkey script by juarez.bochi@nsn.com')										\n\
				return true;																				\n\
			}																								\n\
		}																									\n\
		");
}