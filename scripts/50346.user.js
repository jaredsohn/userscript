// ==UserScript==
// @name           Goloci_Rate_Helper
// @namespace      Goloci
// @description    Hilft dem Benutzer beim bewerten der Online-User
// @include        http://www.goloci.de/*
// ==/UserScript==

var Zeit = 1; //Sekundenzahl bis zum Seitenwechsel.


















/** Ab hier nichts mehr ändern! **/
var sTime = Zeit*1000;
var OP = false;

(function() {
	var loc = document.location.href;
	
	function process() {
		var online_user = getOnlineUser();
		makeIt(online_user,0,1);
	}
	
	function makeIt(arr,i,a) {
		if(i<arr.length-1) {
			if(a==1) {
				console.debug("Erster Durchlauf");
				location.href = arr[i];
				setTimeout(function() {makeIt(arr,i+1,2);}, sTime);
			} else if(a==2) {
				console.debug("Zweiter Durchlauf");
				var reg = /\/index\.php\?action=userrate_form&user_id=[0-9]+&plpc=[a-z0-9]+/i;
				var rate_site = reg.exec(opener.document.body.innerHTML.replace(/&amp;/gi,"&"));
				opener.location.href = "http://www.goloci.de" + rate_site;
				setTimeout(function() {makeIt(arr,i+1,0);}, sTime);
			} else {
				if(document.getElementById('tmp_rate').innerHTML=="1") {
					document.getElementById('tmp_rate').innerHTML="0";
					console.debug("Bewertet!");
					setTimeout(function() {makeIt(arr,i+1,1);}, sTime);
				} else {
					//modifyForm();
					console.debug("Warten...   " + document.getElementById('tmp_rate').innerHTML);
					setTimeout(function() {makeIt(arr,i,0);}, sTime);
				}
			}
		} else {
			alert("Ende");
		}
	}
	function getOnlineUser() {
		//var reg = /javascript:view_member\(([0-9]+)\);/gi
		var retVal = document.getElementsByTagName("body")[0].innerHTML.match(/javascript:view_member\([0-9]+\);/gi);
		//for(i=0;i<retVal.length;i++) {
		//	console.debug(retVal[i]);
		//	retVal[i] = reg.exec(retVal[i])[1];
		//}
		return retVal.sort(random);
	}
	
	function random(a,b)	{
		return Math.random()-Math.random()
	}
	
   function startScript() {
      var w = document.createElement("span");
		var w_style = document.createAttribute("style");
		var w_id = document.createAttribute("id");
		w_style.nodeValue = "border: 3px dashed black; background-color: #CCCCCC; position: fixed; top: 50px; left: 75px;";
		w_id.nodeValue = "view_win";
		w.setAttributeNode(w_style);
		w.setAttributeNode(w_id);
		//w.innerHTML = "";
		var txt = document.createTextNode("Goloci-Rate-Helper starten");
		var b = document.createElement("button");
		var b_type = document.createAttribute("type");
		var b_id = document.createAttribute("id");
		b_type.nodeValue = "button";
		b_id.nodeValue = "pbutton"
		b.setAttributeNode(b_type);
		b.setAttributeNode(b_id);
		b.appendChild(txt);
		_eventPanel = b;
		_eventPanel.addEventListener("click", process, true );
		w.appendChild(b);		
		
		var tmp_rate_txt = document.createTextNode("0");
		var tmp_rate = document.createElement("div");
		var tmp_rate_style = document.createAttribute("style");
		var tmp_rate_id = document.createAttribute("id");
		tmp_rate_style.nodeValue = "display: none;";
		tmp_rate_id.nodeValue = "tmp_rate";
		tmp_rate.setAttributeNode(tmp_rate_style);
		tmp_rate.setAttributeNode(tmp_rate_id);
		tmp_rate.appendChild(tmp_rate_txt);
		
		document.getElementsByTagName("body")[0].appendChild(w);
		document.getElementsByTagName("body")[0].appendChild(tmp_rate);
   }
	
	function modifyForm() {
		for(i=1; i<=10; i++) {
			document.getElementsByName('frm_' + i)[0].parentNode.addEventListener("click", function() {if(typeof(online_list)=="undefined") {var online_list = window.open('','online_list');} online_list.document.getElementById('tmp_rate').innerHTML = '1';}, true);
		}
	}
	
	if(loc.indexOf("userrate")!=-1) {
		setTimeout(function(){modifyForm();},200);
	} else if(loc.indexOf("online_list")!=-1){
		startScript();
		OP = true;
	}
	
})();