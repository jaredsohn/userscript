// ==UserScript==
// @name          Alert Input Names Values Types
// @namespace     http://tabulas.com/~dodozhang21
// @description   Prompt all the input fields names & values on the page in textareas. It is specially tuned for Quick Test Pro.
// @include       http://tabulas.com
// ==/UserScript==

(function(){
	// exclude input types
	var exclude = new Array("hidden");
	var front_text = 'Browser("name:=KFC Colonel\'s Scholars.*").Page("micClass:=Page").';
	//front_text = 'IE.';
	var showValuesOnly = 0; // show only the ones with values for QTP

	// QTP conversion
	var QTP = new Array("WebEdit", "WebCheckBox", "WebButton", "WebButton", "WebRadioGroup", "WebList", "WebEdit", "WebEdit", "WebButton");
	var QTPtypes = new Array("text", "checkbox", "submit", "button", "radio", "select", "textarea", "password", "reset");

	var l = document.getElementsByTagName("form");
	var m = null;
	var n = null;
	var o = null;
	var preName = "";

	var uim = "";
	var cand = null;
	var dummy = null;
	var inputNames = "==Field Names==\n";
	var inputValues = "==Field Values==\n";
	var inputTypes = "==Field Types==\n";
	var inputQTPs = "'==QTP Inputs==\n";
	var sQTP = "";


	var i = 0;
	for(i = 0; i < l.length; i++) { // for each form obj
		for(j = 0; j < l[i].length; j++) {
			m = l[i];
			n = m[j];

			

			if(inputName = n.getAttribute('name')) {
				inputType = n.getAttribute('type');
				//alert(inputType);
				//if(inputType != null && inputType.search('hidden') < 0) {
					o = n.toString();
					if(inputType == null) {
						if(o.search('HTMLSelectElement') >= 0)
							inputType = 'select';
						else if(o.search('HTMLTextAreaElement'))
							inputType = 'textarea';
						else
							inputType = 'text';
					}
					inputValue = n.getAttribute('value');
					if(inputValue == null)
						inputValue = n.value;

					inputNames += inputName + "\n";
					inputValues += inputValue + "\n";
					inputTypes += inputType + "\n";

					if(!(inputType == "radio" && preName == inputName)) {
						verb = "Set";
						QTPweb_thing = "";

						for(z = 0; z < QTPtypes.length; z++) {
							if(inputType.search(QTPtypes[z]) >= 0) {
								QTPweb_thing = QTP[z];
								break;
							}
						}

						// if the web_thing is found
						if(QTPweb_thing != "") {
							if(inputType == 'select' || inputType == 'radio')
								verb = "Select";

							if(inputType == 'checkbox') {
								sQTP = "(\"value:=" + inputValue + "\").Set \"ON\"\n";
							} else {
								sQTP = "(\"name:=" + inputName + "\")." + verb + " \"" + inputValue + "\"\n";
							}

							if(showValuesOnly == 1) {
								if(inputValue != null && inputValue != "") {
									if(inputType == 'checkbox') {
										if(n.checked)
											inputQTPs += front_text + QTPweb_thing + sQTP;
									} else {
										inputQTPs += front_text + QTPweb_thing + sQTP;
									}
								}
							} else {
								if(inputType == 'checkbox') {
									if(n.getAttribute('checked') == true)
										inputQTPs += front_text + QTPweb_thing + sQTP;
								} else {
									inputQTPs += front_text + QTPweb_thing + sQTP;
								}
							}
						
						} // end of QTPweb_thing
						//inputQTPs += n + "\n";
					}
					preName = inputName;
				//}
			}
		}
	}


	if(inputNames != null) {
		var textN = document.createElement("textarea");
		textN.setAttribute("style", "width: 33%");
		textN.setAttribute("rows", "8");
		textN.value = inputNames;
		var textV = document.createElement("textarea");
		textV.setAttribute("style", "width: 33%");
		textV.setAttribute("rows", "8");
		textV.value = inputValues;
		var textT = document.createElement("textarea");
		textT.setAttribute("style", "width: 30%");
		textT.setAttribute("rows", "8");
		textT.value = inputTypes;

		var brA = document.createElement("br");

		var textQTP = document.createElement("textarea");
		textQTP.setAttribute("style", "width: 66%");
		textQTP.setAttribute("rows", "8");
		textQTP.value = inputQTPs;

		var hideLink = document.createElement("input");
		hideLink.setAttribute("type", "button");
		hideLink.setAttribute("style", "position: absolute; right: 3%; bottom: 5%;");
		hideLink.setAttribute("onclick", "document.getElementById('dodosStuff').style.display = 'none';document.getElementById('dodo_show_button').style.display = 'block';return false");
		hideLink.setAttribute("value", "Hide this");

		var showLink = document.createElement("input");
		showLink.setAttribute("type", "button");
		showLink.setAttribute("style", "position: absolute; top: 0; left: 0; display: none;");
		showLink.setAttribute("id", "dodo_show_button");
		showLink.setAttribute("onclick", "document.getElementById('dodosStuff').style.display = 'block';document.getElementById('dodo_show_button').style.display = 'none';return false");
		showLink.setAttribute("value", "Show");


		var divA = document.createElement("div");
		divA.setAttribute("id", "dodosStuff");
		divA.setAttribute("style", "position: absolute; top: 0px; left: 0px; width: 95%; z-index: 10000000; background-color: white; border: 1px solid black; border-top: 0; border-left: 0; padding: 0 0 10px 0");
		
		
		divA.appendChild(textN);
		divA.appendChild(textV);
		divA.appendChild(textT);
		divA.appendChild(brA);
		divA.appendChild(textQTP);
		
		divA.appendChild(hideLink);

		document.body.appendChild(divA);
		document.body.appendChild(showLink);
	}
	
})();
