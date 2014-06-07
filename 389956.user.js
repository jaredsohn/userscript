// ==UserScript==
// @name        Customer Track Services Plugin
// @namespace   customertrackinc.com
// @description Prepopulate ORL Fields
// @icon	http://internal.customertrack.net/images/tinylogo.png
// @include     https://www.openroadlending.com/Apply.aspx*
// @include     http://internal.customertrack.net/qv2.php*
// @version     1.1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var doTheAjaxThingCt = true;

if(document.getElementById("latest_CT_Greasemonkey_Script11")){
	document.getElementById("latest_CT_Greasemonkey_Script11").style.background = "white";
	document.getElementById("latest_CT_Greasemonkey_Script11").innerHTML = "<B>CT Services Plugin Status: </b>OK - Version 1.1";
}else{

	document.body.style.background = "white";
	document.getElementById('ctl00_TopMenu_T872C6B14002_Menu1').innerHTML = "";
	document.getElementById('Header').style.background = "white";
	document.getElementById('Header').style.color = "black";
	document.getElementById('Header').style.height = "auto";
	document.getElementById('Header').style.backgroundRepeat = "no-repeat";
	document.getElementById('Header').style.backgroundPosition="bottom left"; 
	document.getElementById('Header').style.padding = "1em";
	document.getElementById('Header').style.textAlign = "center";
	document.getElementById('SuperLinks').innerHTML = "";
	document.getElementById('SideBar').innerHTML = "";
	document.getElementById('Logo').innerHTML = "";
	document.getElementById('TagLine').innerHTML = "";
	document.getElementById('LP_DIV_1368197056862').style.display = "none";
	
	var boxes = document.getElementsByClassName('sfContentBlock'),
	i = boxes.length;
	while(i--) {
		boxes[i].style.display = "none;";
	}

	var all=document.getElementsByTagName("h1");
	for (var i=0, max=all.length; i < max; i++) {
		all[i].style.display = "none";
	}
	
	var all=document.getElementsByTagName("h2");
	for (var i=0, max=all.length; i < max; i++) {
		all[i].style.display = "none";
	}

	var all=document.getElementsByTagName("p");
	all[0].style.display="none";
	
	all[1].innerHTML="<B>READ DISCLAIMER:</B> BY AGREEING TO SUBMIT THIS APPLICATION, YOU AUTHORIZE OPENROAD LENDING AND CERTAIN THIRD-PARTY LENDERS AND PARTNERS TO OBTAIN SUCH ADDITIONAL INFORMATION AS MAY BE REQUIRED, INCLUDING CREDIT REPORTS, IN ORDER TO PROCESS YOUR APPLICATION. YOU ALSO AGREE TO RECEIVE ALL LOAN DOCUMENTS, WHICH MAY CONTAIN PERSONAL INFORMATION RELATED TO YOUR APPLICATION, ELECTRONICALLY AS WELL AS RELATED COMMUNICATIONS THROUGH EMAIL, PRE-RECORDED CALLS AND VOICEMAILS TO YOUR TELEPHONE OR CELL PHONE. THE TERMS AND CONDITIONS OF THE APPLICATION ARE DISCLOSED MORE FULLY AT WWW.OPENROADLENDING.COM. BY SUBMITTING THIS APPLICATION YOU ARE AGREEING TO THOSE TERMS AND CONDITIONS.";
	var all=document.getElementsByTagName("div");
	all[19].style.display="none";
	
	document.getElementById('SecurityNotice').style.display = "none";

	//Move Shit to the overlay div
	var overlay = document.createElement("div");
	var overlayStyles = "background-color: #fff; opacity: .7; filter: alpha(opacity=70); position: absolute; top: 0; left: 0;min-width: 100%; min-height: 100%;z-index: 999999;";
	overlay.setAttribute("id","overlay");
	overlay.setAttribute("style", overlayStyles);
	document.getElementById('form1').appendChild(overlay);
	overlay.innerHTML = '<div style="margin:.5em 0; padding:.5em; position:absolute; top:0; left:0;"><a style="display:inline-block;" href="customertrackinc.com"><img style="display:inline-block;" src="http://internal.customertrack.net/images/tinylogo.png" /></a></div>';
	document.getElementById('overlay').innerHTML +=  '<div style="position:fixed;top:8px;right:8px;"><div style="background:#53B8FF;z-index:99999;padding:.5em; margin:.5em;color:white;" id="ajaxresponsehack">Waiting...</div><div style="display:none; background:#53B8FF;z-index:99999;padding:.5em; margin:.5em;color:white;" id="ajaxSeshStat"></div></div>';
	document.getElementById('overlay').innerHTML += "<div id='BodyContent_ctl00_ctl00_divInfo_CT' style='width:90%; margin:2em auto;'></div>";
	var oldbody = document.getElementById("BodyContent_ctl00_ctl00_divInfo");
	document.getElementById('BodyContent_ctl00_ctl00_divInfo_CT').innerHTML = oldbody.innerHTML;
	oldbody.innerHTML="";


	
	
	function addEventHandler(elem,eventType,handler) {
		if (elem.addEventListener)
			elem.addEventListener (eventType,handler,false);
		else if (elem.attachEvent)
			elem.attachEvent ('on'+eventType,handler); 
	}


	function selectItemByValue(elmnt, value){
		for(var i=0; i < elmnt.options.length; i++){
			if(elmnt.options[i].value === value) {
				elmnt.selectedIndex = i;
				break;
			}
		}
	}

	function zipajax(){	
		var Zipzz = document.getElementById("BodyContent_ctl00_ctl00_txtZip1").value;
		var xipurl = "http://internal.customertrack.net/validatezip.php?zip="+Zipzz;
		GM_xmlhttpRequest({
			method: "GET",
			url: xipurl,
			onload: function(response) {
				var parzer = new DOMParser();
				var domz = parzer.parseFromString(response.responseText, "application/xml");
				var cityctt = domz.getElementsByTagName('city')[0].firstChild.nodeValue;
				var statectt = domz.getElementsByTagName('state')[0].firstChild.nodeValue;								
				document.getElementById('BodyContent_ctl00_ctl00_txtCity1').value = cityctt;
				selectItemByValue(document.getElementById('BodyContent_ctl00_ctl00_ddlState1'),statectt);
			}
		});
	}


	function startAjax(){
		setTimeout(function(){
			var param1ct = document.getElementById('BodyContent_ctl00_ctl00_txtFirstName1').value;
			var param2ct = document.getElementById('BodyContent_ctl00_ctl00_txtLastName1').value;
			var param3ct = document.getElementById('BodyContent_ctl00_ctl00_txtStreetAddress1').value;
			var param4ct = document.getElementById('BodyContent_ctl00_ctl00_txtOfferCode').value;
			var urlct = "http://internal.customertrack.net/orl_ajaxhandler.php?fname="+param1ct+"&lname="+param2ct+"&addr="+param3ct+"&promocode="+param4ct;
			GM_xmlhttpRequest({
				method: "GET",
				url: urlct,
				onload: function(response) {
					var parser = new DOMParser();
					var dom = parser.parseFromString(response.responseText,
					"application/xml");
					var statusct = dom.getElementsByTagName('status')[0].firstChild.nodeValue;
					var fnamect = dom.getElementsByTagName('fname')[0].firstChild.nodeValue;
					var addrct = dom.getElementsByTagName('addr')[0].firstChild.nodeValue;
					var lnamect = dom.getElementsByTagName('lname')[0].firstChild.nodeValue;
					var cityct = dom.getElementsByTagName('city')[0].firstChild.nodeValue;
					var statect = dom.getElementsByTagName('street')[0].firstChild.nodeValue;
					var zipct = dom.getElementsByTagName('zip')[0].firstChild.nodeValue;
					var promocode = dom.getElementsByTagName('promocode')[0].firstChild.nodeValue;

					document.getElementById("ajaxresponsehack").innerHTML=statusct;
					if(statusct == "Bingo" && doTheAjaxThingCt){
						doTheAjaxThingCt = false;
						document.getElementById('ajaxresponsehack').innerHTML = "<img src='http://pbs.twimg.com/profile_images/378800000386646442/053beabf5612d07359246d2d7688872f_normal.png' /><h2>User found, perhaps?</h2>";
						var ctFoundConfirmMessage = "USER FOUND..\n\n"+fnamect+" "+lnamect+"\n"+addrct+"\n"+cityct+", "+statect+"\n"+zipct+"\n\nIf this is the correct customer, click OK to populate, or click Cancel to cancel..";
						fillOrNotCt = confirm(ctFoundConfirmMessage);
						if(fillOrNotCt){
							document.getElementById('BodyContent_ctl00_ctl00_txtFirstName1').value = fnamect;
							document.getElementById('BodyContent_ctl00_ctl00_txtLastName1').value = lnamect;
							document.getElementById('BodyContent_ctl00_ctl00_txtOfferCode').value = promocode;
							document.getElementById('BodyContent_ctl00_ctl00_txtStreetAddress1').value = addrct;
							var existingZipValue = document.getElementById('BodyContent_ctl00_ctl00_txtZip1').value;
							if(existingZipValue != zipct && existingZipValue != ""){
								var ctConflictConfirm = "The customer's Zip Code does not match the one in the system.\n\n To keep the zip code as "+existingZipValue+", click cancel.\n\nTo update the Zip to "+zipct+", press 'OK'";
								var askWhichToPopulate = confirm(ctConflictConfirm);
								if(askWhichToPopulate){
									document.getElementById('BodyContent_ctl00_ctl00_txtZip1').value = zipct;
									zipajax();
								}
							}else if(existingZipValue == ""){
								document.getElementById('BodyContent_ctl00_ctl00_txtZip1').value = zipct;
								zipajax();
							}
						}
					}
				}
			});
		},200);
	}

	
	function saveSeshStuff(url){
		var saveSeshString = "http://internal.customertrack.net/orl_save_sesh.php?";
		var inputs=document.getElementsByTagName("input");
		for (var i=0, max=inputs.length; i < max; i++) {
			if(inputs[i].type == "text"){
				saveSeshString += inputs[i].id+"="+inputs[i].value+"&";
			}
		}
		//window.alert(saveSeshString);
		GM_xmlhttpRequest({
			method: "GET",
			url: saveSeshString,
			onload: function(response) {
				document.getElementById('ajaxSeshStat').innerHTML = "Sesh Saved";
				document.getElementById('ajaxSeshStat').style.display = "block";
				setTimeout(function(){
					document.getElementById('ajaxSeshStat').style.display = "none";
				},2000);
			}
		});
	}

	
	function loadthatFuckinShit(){
		//window.alert("function called");
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://internal.customertrack.net/orl_get_sesh.php",
			onload: function(response) {
				var obj = JSON.parse(response.responseText);
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						//alert(key + " = " + obj[key]);
						if(document.getElementById(key)){
							document.getElementById(key).value = obj[key];
						}
					}
				}
				document.getElementById('ajaxSeshStat').innerHTML = "Sesh Loaded";
				document.getElementById('ajaxSeshStat').style.display = "block";
				setTimeout(function(){
					document.getElementById('ajaxSeshStat').style.display = "none";
				},2000);
			}
		});
	}
	
	function checkForSeshStuff(){
		//window.alert("check sesh called");
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://internal.customertrack.net/orl_get_sesh.php",
			onload: function(response) {
				//window.alert(response.responseText);
				var obj = JSON.parse(response.responseText);
				
				var countObjs = 0;
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						//alert(key + " -> " + obj[key]);
						countObjs++;
					}
				}
				
				if(obj.BodyContent_ctl00_ctl00_txtFirstName1 && obj.BodyContent_ctl00_ctl00_txtCity1){
					document.getElementById('ajaxSeshStat').style.display = "block";
					var ctbutton = document.createElement("input");
					ctbutton.setAttribute("type", "button");
					ctbutton.setAttribute("value", "Populate "+countObjs+" Fields");
					ctbutton.setAttribute("id", "ct_pp_btn");
					ctbutton.addEventListener("click", function() {
						loadthatFuckinShit();
					}, false);
					document.getElementById('ajaxSeshStat').appendChild(ctbutton);
				}
			}
		});
	}
	
	var inputs=document.getElementsByTagName("input");
	for (var i=0, max=inputs.length; i < max; i++) {
		addEventHandler(inputs[i],"blur",saveSeshStuff);
	}
	
	
	var first_name_field = document.getElementById('BodyContent_ctl00_ctl00_txtFirstName1');
	var last_name_field = document.getElementById('BodyContent_ctl00_ctl00_txtLastName1');
	var address_field = document.getElementById('BodyContent_ctl00_ctl00_txtStreetAddress1');
	var zip_field = document.getElementById('BodyContent_ctl00_ctl00_txtZip1');
	var promo_code_field = document.getElementById('BodyContent_ctl00_ctl00_txtOfferCode');
	var zipFromPromptCt = prompt("May I have your zip code, please?","90210");
	zip_field.value = zipFromPromptCt;
	zipajax();
	addEventHandler(promo_code_field,"keyup",startAjax);
	addEventHandler(first_name_field,"keyup",startAjax);
	addEventHandler(last_name_field,"keyup",startAjax);
	addEventHandler(address_field,"keyup",startAjax);
	addEventHandler(zip_field,"keyup",zipajax);
	checkForSeshStuff();
}