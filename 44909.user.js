// ==UserScript==
// @name           Mob Wars Invite Mobsters
// @namespace      MobWarsInviteMobsters
// @include        http://apps.facebook.com/mobwars/mob/
// @include        http://apps.facebook.com/mobwars/fight/
// ==/UserScript==

if (document.location == "http://apps.facebook.com/mobwars/mob/"){
	try{
		var div = document.getElementById("app8743457343_selected_list").parentNode.parentNode;
		div.innerHTML = "";
		for(var item in unsafeWindow.a8743457343_friendNames){
			if (eval(GM_getValue("TDK_AddMeNot", '[]')).toString().indexOf(item) != -1) continue;
			var checkbox = document.createElement("input");
			var span = document.createElement("span");
			var link = document.createElement("a");
			span.addEventListener("click", remove, true);
			span.innerHTML = unsafeWindow.a8743457343_friendNames[item] + ' <a>[remove]</a><input type="hidden" value="' + item + '"/><br/>';
			checkbox.value = item;
			checkbox.type = "checkbox";
			checkbox.name = "tdkInvites";
			div.appendChild(checkbox);
			div.appendChild(span);
		}
		var button = document.createElement("input");
		button.value = "Send Mob Wars Invitation";
		button.className = "inputbutton request_form_submit";
		button.type = "button";
		button.id = "tdkSend";
		button.addEventListener("click", sendInvites, true);
		div.appendChild(button);

		var buttonAll = document.createElement("input");
		buttonAll.value = "Check All";
		buttonAll.className = "inputbutton";
		buttonAll.type = "button";
		buttonAll.addEventListener("click", checkAll, true);
		div.appendChild(buttonAll);
	} catch(e){GM_log("Error in mob page main: " + e.message);}
}	else if (document.location == "http://apps.facebook.com/mobwars/fight/"){
	try {
		for (var i in document.getElementsByName("target_id")){
			var input = document.getElementsByName("target_id")[i];
			var cell = input.parentNode.parentNode.parentNode.firstChild.nextSibling;
			var mobLevel = parseInt(cell.innerHTML.match(/, Level ([0-9]+)/)[1]);
			var maxMobSize = (mobLevel < 50) ? 500 : ((mobLevel - 50) * 2) + 500;
			var currentMobSize = parseInt(input.parentNode.parentNode.parentNode.childNodes[3].innerHTML);
			if (maxMobSize > currentMobSize){
				var span = document.createElement("span");
				span.innerHTML = ' <a>[Add Friend]</a><input type="hidden" id="' + input.value + '" value="' + input.value + '"/>';
				span.addEventListener("click", addFriend, true);
				cell.appendChild(span);
			}
		}
		var div = document.createElement("div");
		div.id = "tdkAddMeDiv";
		div.style.display = "none";
		div.innerHTML = '<iframe name="tdkAddMeFrame" width="100%" height="300px" />';
		document.body.appendChild(div);
	} catch(e){GM_log("Error in fight page main: " + e.message);}
}


var requestsPending = new Array();
function sendInvites(){
	try{
		var checkboxes = document.getElementsByName("tdkInvites");
		var button = document.getElementById("tdkSend");
		for (var i in checkboxes){
			if (checkboxes[i].checked){
				requestsPending.push("http://apps.facebook.com/mobwars/mob/do.php?join_id=" + checkboxes[i].value);
			}
		}
		button.value = "Sending: " + requestsPending.length + " requests left.";
		sendNextRequest();
	} catch(e){GM_log("Error in sendInvites: " + e.message);}
}

function sendNextRequest(){
	try{
		var button = document.getElementById("tdkSend");
		if (requestsPending.length > 0){
			var url = requestsPending.pop();
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: {
					'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.6 (.NET CLR 3.5.30729)',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {
					if(responseDetails.responseText.indexOf("Are You Human?") > -1){
						//captcha(url);
					} else {
						button.value = "Sending: " + requestsPending.length + " requests left.";
						if (requestsPending.length <= 0)
							window.location.reload();
						else
							sendNextRequest();
					}
				},
				onerror: function(responseDetails) {
					button.value = "Sending: " + requestsPending.length + " requests left. Error.";
					if (requestsPending.length <= 0)
						window.location.reload();
				}
			});
		} else window.location.reload();
	} catch(e){GM_log("Error in sendNextRequest: " + e.message);}
}

function checkAll(){
	try{
		var checkboxes = document.getElementsByName("tdkInvites");
		for (var i in checkboxes)
			checkboxes[i].checked = true;
	} catch(e){GM_log("Error in checkAll: " + e.message);}
}

function remove(){
	try{
		if (confirm("Are you sure?")){
			var checkboxes = document.getElementsByName("tdkInvites");
			var list = eval(GM_getValue("TDK_AddMeNot", '[]'));
			list.push(this.childNodes[2].value);
			GM_setValue("TDK_AddMeNot", uneval(list));
			for (var i in checkboxes){
				if (checkboxes[i].value == this.childNodes[2].value){
					checkboxes[i].parentNode.removeChild(checkboxes[i]);
					break;
				}
			}
			this.innerHTML = "";
		}
	} catch(e){GM_log("Error in remove: " + e.message);}
}

function captcha(url){
	try{
		closeCaptcha();
		var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.height = "100%";
		div.style.width = "100%";
		div.id = "TDK_CaptchaDiv";
		div.innerHTML = pageHTML;
		var frame = document.createElement("iframe");
		frame.style.height = "100%";
		frame.style.width = "100%";
		frame.src = url;
		div.appendChild(frame);
		var button = document.createElement("input");
		button.type = "button";
		button.value = "close";
		button.addEventListener("click", closeCaptcha, true);
		div.appendChild(button);
	} catch(e){GM_log("Error in captcha: " + e.message);}
}

function closeCaptcha(){
	try{
		if (document.getElementById("TDK_CaptchaDiv") != null)
			document.body.removeChild(document.getElementById("TDK_CaptchaDiv"));
	} catch(e){GM_log("Error in closeCaptcha: " + e.message);}
}

var addingID;
var isBusy = false;
function addFriend(){
	try{
		if (isBusy){
			alert("Page is loading, please wait.");
			return;
		}
		if (this.childNodes[2] != null){
			isBusy = true;
			addingID = this.childNodes[2].value;
			this.childNodes[1].innerHTML = "[Adding Friend]";
			document.getElementsByName("tdkAddMeFrame")[0].src = "http://www.facebook.com/addfriend.php?id=" + addingID;
			document.getElementsByName("tdkAddMeFrame")[0].addEventListener("load", addFriendSubmit, true);
		} else setFriendAdded();
	} catch(e){GM_log("Error in addFriend: " + e.message);}
}

function addFriendSubmit(){
	try{
		if (document.getElementsByName("tdkAddMeFrame")[0].contentDocument.body.innerHTML.indexOf("as a friend") > -1){
			document.getElementsByName("tdkAddMeFrame")[0].contentDocument.getElementById("message").value = "Mobwars";
			document.getElementsByName("tdkAddMeFrame")[0].contentDocument.forms[1].submit();
			document.getElementsByName("tdkAddMeFrame")[0].addEventListener("load", setFriendAdded, true);
		} else setFriendAdded();
	} catch(e){GM_log("Error in addFriendSubmit: " + e.message);}
}

function setFriendAdded(){
	try{
		isBusy = false;
		document.getElementById(addingID).parentNode.innerHTML = " [Friend added]";
	} catch(e){GM_log("Error in setFriendAdded: " + e.message);}
}