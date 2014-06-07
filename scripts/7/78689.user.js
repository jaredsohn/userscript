// ==UserScript==

// @name           BindassFlooder

// @namespace      http://bindass.com/streetdance/*

// @include        http://bindass.com/streetdance/vote.php
// @include        http://www.bindass.com/streetdance/vote.php
// Rigged by Quadehar

// ==/UserScript==

(function() {

	function PrintVotes() {

    numVotes = GM_getValue("BindassVoteCount", 0);

    var voteCountDiv = document.createElement("div");

    voteCountDiv.innerHTML = "Voted " + numVotes + " times";

    document.getElementsByTagName("body")[0].appendChild(voteCountDiv);

    GM_setValue("BindassVoteCount", numVotes+1);

  }

  function disableAlerts() {

		var scriptCode = new Array();

		scriptCode.push("function doSHOWVOTERESPONSE(responseText){");

		scriptCode.push("	var theForm = document.frmVOTE;");

		scriptCode.push("	doAJAXLOADER('unload');");

		scriptCode.push("	doOVERLAPBACKGROUND('unload');");

		scriptCode.push("	if(Trim(responseText).length > 0){");

		scriptCode.push("		var retVal = responseText.split('|');");

		scriptCode.push("		if(retVal[0].toString() == 'true'){");

		scriptCode.push("			theForm.txtEMAIL_ID.value = '';");

		scriptCode.push("			return false;");

		scriptCode.push("		}else{");

		scriptCode.push("			alert(retVal[1].toString());");

		scriptCode.push("			return false;");

		scriptCode.push("		}");

		scriptCode.push("	}else{");

		scriptCode.push("		alert('An error occured while processing.');");

		scriptCode.push("		return false;");

		scriptCode.push("	}");

		scriptCode.push("}");

		var script = document.createElement('script');    // create the script element

		script.innerHTML = scriptCode.join('\n');         // add the script code to it

		scriptCode.length = 0;

		document.getElementsByTagName('head')[0].appendChild(script); 

	}

	function randomString(length) {

		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

		if (! length) {

			length = Math.floor(Math.random() * chars.length);

		}

		var str = '';

		for (var i = 0; i < length; i++) {

			str += chars[Math.floor(Math.random() * chars.length)];

		}

		return str;

	}

	function doit () {

    PrintVotes();

		disableAlerts();

		listofinputs = document.getElementsByTagName("input");

		for(i=0;i<listofinputs.length;i++) {

			if (listofinputs[i].value == '2') {

				listofinputs[i].checked = true;

			}

		}

		randomEmail = "fanatic"+randomString(3)+"@gmail.com";

		document.getElementById("txtEMAIL_ID").value = randomEmail;

		document.getElementById("btnSUBMITVOTE").click();

		

		setTimeout(refreshPage,5000);

	}

	function refreshPage() {

		location.reload(true);

	}

	setTimeout(doit, 1000);

	

})();
