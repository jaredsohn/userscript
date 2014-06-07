// ==UserScript==
// @name Travian multi login
// @author  matej505
// @include http://*.travian.*/login.php
// @include http://*.travian.*/login.php?asid=*
// @version 1.0
// @description Script provides quick change of account. Never enter your sitting account long name again.
// ==/UserScript==

//--- Settings ---

	var userIds = [["ghost", "s1"], ["LoginName2", "server"]];
    //example -> var userIds = [["mikrop", "s7"]]; 

//----------------

function changeServer(newserv, httpvars) {

	var thisserv = window.location.href.match(/(\w+).travian./);

	var ln = location.hostname;
	var newln = "http://" +ln.replace(thisserv[1], newserv)+ "/login.php?asid=" +httpvars;

	location.replace(newln);
						
}

function getAsid() {

	var asid = "";
	var va = getHttpGetVars()["asid"];

		if (va != undefined) {
			asid = va;
		}
		
	return asid;

}

function getHttpGetVars() {

	var param = window.location.search.substr(1).split("&"); 
	
	var httpGetVars = new Array(); 
	for(var i=0; i<param.length; i++) {
	
		httpGetVars[param[i].split("=")[0]] = unescape(param[i].split("=")[1]);
		 
	}

	return httpGetVars;

}

(function() {

	var asid = getAsid();
	var lastUserIds = [["LoginName (tr)", null]];
	var trn = getHttpGetVars()["trn"];
	var trs = getHttpGetVars()["trs"];
	
	if (trn != undefined && trs != undefined) { // check httpGetVars[trn,trs]
		lastUserIds = [[trn, trs]];
	}
	
	userIds = userIds.concat(lastUserIds);

	var res = document.evaluate('//div[@class="login"]/form/table/tbody/tr/td[2]/input',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


	var origItem = res.snapshotItem(0);

	var servInfo = document.createElement("span");
	var srvnum = userIds[0][1];
	
	var elmSelect = document.createElement("select");
		elmSelect.setAttribute("name", origItem.name);
		elmSelect.setAttribute("class", "fm fm110");
		
	var arOptions = new Array();
	var userName = null;
	var userIdsLen = userIds.length; 

		for (var i=0; i<userIdsLen; i++) {

			arOptions[i] = document.createElement("option");
			arOptions[i].value = userIds[i][0];
			arOptions[i].id = i;

			var postfix = "";

				if (asid != "") {
				
					if (i == asid) {
					
						arOptions[i].selected = "selected";
						postfix = (i != (userIdsLen - 1)) ? postfix : " (tr)";
						srvnum = userIds[asid][1];
						
					}
				
				}

			arOptions[i].textContent = userIds[i][0] + postfix;

			arOptions[i].addEventListener("mouseover", function() {
				
				var sic = "";
				if (this.id != (userIdsLen - 1)) {
					sic = " Server " + userIds[this.id][1];	
				}
				
				servInfo.textContent = sic;
				
			}, false);

			arOptions[i].addEventListener("click", function() {

				var resLN = document.evaluate("//select[@name='" 
				+origItem.name+ "']//option[@id='" +this.id+ "']",
				document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

				if (resLN.snapshotItem(0).id == (userIdsLen - 1)) { 
				
					var loginName = window.prompt("New travelling loginName (tr)", "");
					
						if (loginName != "" && loginName != null) { // check loginName

							var serverNumber = window.prompt("Server number", "");
							
							if (serverNumber != "" && serverNumber != null) { // check server 
							
								var newserv = "s" + serverNumber;
								var httpvars = this.id +"&trn="+ loginName +"&trs="+ newserv;
								
								return changeServer(newserv, httpvars);
								
							}
								
						}
								
				}
				else {

					return changeServer(userIds[this.id][1], this.id);
					
				}		
	
			}, false);

			elmSelect.appendChild(arOptions[i]);
			
		}
	
	servInfo.textContent = " Server " + srvnum;	
	
	origItem.parentNode.insertBefore(servInfo, origItem.nextSibling);
		
	origItem.parentNode.replaceChild(elmSelect, origItem);
	
})();