// ==UserScript==
// @name        Google Search: Back to the Basics
// @namespace   newcrackcity.fm
// @description	Wide results, cleaner interface, search filters, customizable menu bar, no redirects, etc... More to be done.
// @include     https://www.google.com/*
// @include     http://www.google.com/*
// @version     0.1b
// ==/UserScript==

(function(){ 

//Customize Google Bar
var divContainingOrderedList = document.getElementById('gbz');
var orderedList = document.getElementById("gbz").getElementsByTagName("ol")[0];
	divContainingOrderedList.removeChild(orderedList);
var newOrderedList = document.createElement("ol");
	newOrderedList.setAttribute("class", "gbtc");
	
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://www.google.com/"><span class="gbtb2"></span><span class="gbts">Search</span></a></li>';
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://mail.google.com"><span class="gbtb2"></span><span class="gbts">GMail</span></a></li>';
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://reader.google.com/"><span class="gbtb2"></span><span class="gbts">Reader</span></a></li>';
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://www.maps.google.com/"><span class="gbtb2"></span><span class="gbts">Maps</span></a></li>';
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="http://www.books.google.com/"><span class="gbtb2"></span><span class="gbts">Books</span></a></li>';	
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="http://scholar.google.ca/maps?hl=fr&tab=wl"><span class="gbtb2"></span><span class="gbts">Scholar</span></a></li>';	
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://images.google.com/"><span class="gbtb2"></span><span class="gbts">Images</span></a></li>';
	newOrderedList.innerHTML += '<li class=gbt><a target="_blank" class="gbzt" href="https://news.google.com"><span class="gbtb2"></span><span class="gbts">News</span></a></li>';

	// Add the OL to the DOM
	divContainingOrderedList.appendChild(newOrderedList);

//Disable Autocomplete
var checkInterval;
var goodChecksCount = 0;
var usingAutoComplete = false;
	checkInterval = window.setInterval(exterminateGoogleAnnoyances, 10);
	
function exterminateGoogleAnnoyances() {
	var inputs = document.getElementsByTagName('input');
		for (var i in inputs) 
		{
			if (inputs[i].name == "q") 
			{
				// Check if our change stuck
				if (inputs[i].getAttribute("autocomplete") == "on") 
				{
					// Finally, Google is neutered
					goodChecksCount++;			
					if (goodChecksCount == 10) {
						clearInterval(checkInterval);
					}
				} 
				else 
				{
					// Replace search textbox with one that doesn't have any event listeners
					var newNode = inputs[i].cloneNode(false);
					
					newNode.setAttribute("autocomplete", "on");
					newNode.onkeyup = onKeyUpHandler;
					newNode.oninput = onInputHandler;
					
					inputs[i].parentNode.appendChild(newNode);
					inputs[i].parentNode.removeChild(inputs[i]);
				}
				
				break;
			}
		}
	}
	
	function onInputHandler(e) 
	{
	//	console.log(e, e.cancelBubble);
		usingAutoComplete = !(e.cancelBubble == false);
	}
	
	function onKeyUpHandler(e) 
	{
	//	console.log(e, usingAutoComplete);
		if( usingAutoComplete == false && e.keyCode == 13)
			document.forms[0].submit();
		usingAutoComplete = false;
	}
	
//Auto-toggle sidebar
document.getElementsByClassName("tbpc")[0].click();

//-------------------------------------------------------------------------------------------------------//
	//Search Bar Date Filter
	var btn = document.getElementsByName("btnG")[0];
		if (!btn)
		{
			return;
		}
		document.getElementById("gbu").setAttribute("style", "padding-top:0");
		
		var btnDiv = btn.parentNode;	
		btnDiv.setAttribute("style", "white-space:nowrap");
		btnDiv.parentNode.parentNode.setAttribute("style", "padding-right:220px");
		
		var selected = decodeURIComponent(location.search).match(/tbs=qdr:([a-z])([0-9]+)/) || [];
		
		var selNum = document.createElement("select");
		selNum.appendChild(document.createElement("option"));
		
		for (var i = 1; i < 60;) 
		{
			var opt = document.createElement("option");
			opt.appendChild(document.createTextNode(i));
			
			if (i == selected[2]) 
			{
				opt.selected = true;
			}
			selNum.appendChild(opt);
			
			if (i < 10) {
				i++;
			} else {
				i += 10;	
			}
		}
		
		btnDiv.appendChild(selNum);
		
		var selUnit = document.createElement("select");
		var units = {}, suffix = "";
		
		if (navigator.language == "ja") {
			units = { s: "秒", n: "分", h: "時間", d: "日", w: "週間", m: "ヶ月", y: "年" };
			suffix = " 以内";
		} else {
			units = { s: "second", n: "minute", h: "hour", d: "day", w: "week", m: "month", y: "year" };
			suffix = "(s)";
		}
		
		for (var val in units) 
		{
			opt = document.createElement("option");
			opt.setAttribute("value", val);
			opt.appendChild(document.createTextNode(units[val] + suffix));
			if (val == selected[1]) 
			{
				opt.selected = true;
			}		
			selUnit.appendChild(opt);
		}
		
		if (!selected[1]) {
			selUnit.selectedIndex = 5;	
		}
		
		btnDiv.appendChild(selUnit);
		
		btn.addEventListener("click", function() 
		{
			if (!selNum.selectedIndex && !selected) 
			{
				return;	
			}
			
			var url = "/search?q=";
			url += encodeURIComponent(document.getElementsByName("q")[0].value);
				
			if (selNum.selectedIndex) 
			{
				var qdr = "qdr:" + selUnit.options[selUnit.selectedIndex].value;
				qdr += selNum.options[selNum.selectedIndex].text;
				url += "&tbs=" + qdr;
			}
			
			url += location.href.match(/&tbm=[a-z]+/) || "";
			
			url += location.href.match(/&hl=[-a-z]+/i) || "";
			
			url += location.href.match(/&lr=lang_[-a-z]+/i) || "";
			
			setTimeout(function() { location.href = url; }, 500);
			
			var hdn = document.createElement("input");
			hdn.setAttribute("name", "tbs");
			hdn.setAttribute("type", "hidden");
			hdn.value = qdr;
			btnDiv.appendChild(hdn);
		}, false);
		
		
//-------------------------------------------------------------------------------------------------------//

//Auto-disable SS and increase result output to 100
var slshchk = window.content.location.href.toString();
var hchk = window.content.location.host.toString();
var urlexp = new RegExp(/\/$/);

	if ((!hchk.match(/^trends/i)) && (!hchk.match(/^mail/i))) 
	{
		if ((slshchk.indexOf("\?") != -1) && (slshchk.search("safe=") == -1) && (!slshchk.match(urlexp))) 
		{
			window.content.location.replace(slshchk+"&safe=off&num=100");
		}
		else if ((slshchk.search("safe=") != -1) && (slshchk.search("safe=off") == -1)) 
		{
			var isolurl = slshchk.split("safe=")[1].split("&")[0];
			slshchk = slshchk.replace("safe=" + isolurl, "safe=off&num=100");
			window.content.location.replace(slshchk);
		}
	}	


//-------------------------------------------------------------------------------------------------------//
		
	//Wider results; removal of preview pane; reinstate cache links.
	var css = "#cnt #center_col, #cnt #foot, #cnt, .ab_center_col {width:1020px;!important}\n#ires .s{max-width:442em;}.vspib, .vspii {display: none;} .vshid {display: inline; margin-left:7px;}\n #mbEnd {display:none;} .rhsvw {display:none;} #tads, #tadsb, #tadsto {display:none;} .c.rhsvw{position:absolute;}#rhs {display:none!important;}"
		if (typeof GM_addStyle != "undefined" )  
			{
				GM_addStyle(css);
			} 
		else if (typeof PRO_addStyle != "undefined") {
			PRO_addStyle(css);
		} else if (typeof addStyle != "undefined") {
			addStyle(css);
		} else 
			{
				var heads = document.getElementsByTagName("head");
				if (heads.length > 0) {
					var node = document.createElement("style");
					node.type = "text/css";
					node.appendChild(document.createTextNode(css));
					heads[0].appendChild(node); 
			}
		}
	
//-------------------------------------------------------------------------------------------------------//

//Redirect URLs stripped from results
//THANKS http://userscripts.org/scripts/show/140872
// == == == Detect added nodes / attach event listeners == == ==
	if (document.body){
	  // Clean results
	  checkNode(document.body);
	  // Watch for changes that could be new instant or AJAX search results
	  var MutOb, chgMon, i, httpels, opts;
	  var MutOb = (window.MutationObserver) ? window.MutationObserver : window.WebKitMutationObserver; // Requires Firefox 14 or later
	  if (MutOb){
		chgMon = new MutOb(function(mutationSet){
		  mutationSet.forEach(function(mutation){
			for (i=0; i<mutation.addedNodes.length; i++){
			  if (mutation.addedNodes[i].nodeType == 1){
				checkNode(mutation.addedNodes[i]);
			  }
			}
		  });
		});
		// attach chgMon to document.body
		opts = {childList: true, subtree: true};
		chgMon.observe(document.body, opts);
	  }
	}
	
	function checkNode(el){
	  if (el.nodeName == "LI") var liels = [el];
	  else var liels = el.querySelectorAll('li');
	  if (liels.length > 0){
		var i, ael;
		for (var i=0; i<liels.length; i++){
		  var ael = liels[i].querySelector("h3 a"); // Format of Web results
		  if (ael){
			//GM_log("Before: "+ael.outerHTML);
			if(ael.hasAttribute("onmousedown")) ael.removeAttribute("onmousedown");
			//GM_log("After: "+ael.outerHTML);
		  }
		}
	  }
	}


//-------------------------------------------------------------------------------------------------------//

//Filter results
//THANKS http://0-oo.net/log/category/greasemonkey/google-instant-url-filter/
	var SCRIPT_NAME = "Google Instant URL Filter";
		
		function setButtonStyle(btn, label, onclick) {
			btn.style.padding = "2px";
			btn.style.cursor = "pointer";
			btn.textContent = label;
			btn.addEventListener("click", onclick, false);
		}
		
		var btn = document.body.appendChild(document.createElement("button"));
		btn.style.position = "absolute";
		btn.style.right = "200px";
		btn.style.top = "55px";
		btn.style.zIndex = 1000;
		
		// Edit URL list
		setButtonStyle(btn, "URL Filter", function() {
			var con = document.body.appendChild(document.createElement("div"));
			con.style.position = "fixed";
			con.style.right = 0;
			con.style.top = "35px";
			con.style.zIndex = 1000;
			con.style.padding = "1px 2px";
			con.style.backgroundColor = "#ccc";
			con.style.border = "solid 1px #666";
			con.style.borderRadius = "10px";
			con.style.textAlign = "center";
			
			function append(name) { 
				return con.appendChild(document.createElement(name));
			}
			
			append("b").textContent = "[" + SCRIPT_NAME + "] URL list";
			append("br");
			
			var ta = append("textarea");
			ta.cols = 50;
			ta.rows = 25;
			ta.value = GM_getValue("urls") || "";
			
			append("br");
			
			setButtonStyle(append("button"), "Cancel", function() {
				document.body.removeChild(con);
			});
			
			setButtonStyle(append("button"), "Save", function() {
				GM_setValue("urls", ta.value.trim());
				location.reload();
			});
		});
		
		var urls = GM_getValue("urls");
		
			if (!urls) {
			return;
		}
		
		urls = urls.replace(/([.?])/g, "\\$1").replace(/\*/g, ".*").replace(/\n/g, "|");
		
		try {
			var regex = new RegExp(urls);
		} catch (e) {
			alert(SCRIPT_NAME + ": Invalid URLs");
			return;
		}
		
		var getElementById = document.getElementById;
		
		setInterval(function() {	// Watching the result page
			var rso = getElementById("rso");
			
			if (!rso || rso.filtered) {
				return;
			}
		
			rso.filtered = true;
			var results = rso.getElementsByTagName("li");
			
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				var link = result.getElementsByTagName("a")[0];
				
				if (link && link.href.match(regex)) {
					link.style.color = "#ccc";
					
					var ems = link.getElementsByTagName("em");	// Keywords
					
					for (var j = 0; j < ems.length; j++) {
						ems[j].style.color = "inherit";
					}
					
					var spans = result.getElementsByTagName("span");	// e.g. "[PDF]"
					
					for (var k = 0; k < spans.length; k++) {
						spans[k].style.color = "#ccc";
					}
					
					var div = result.getElementsByClassName("s")[0];
					
					if (div) {
						div.style.display = "none";
					}
				}
			}
		}, 100);
})();



