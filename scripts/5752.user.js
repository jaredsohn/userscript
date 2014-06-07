// ==UserScript==
// @name		 textareaBackup
// @include      http://*
// @namespace    tomo_snowbug
// ==/UserScript==
// Notes:
// textareaBackup ver 0.1
// created by tomo_snowbug at 2006/10/1
// description: backup editting textarea contents to cookie.
//


(function()  {
	
	//settings
	var backupInterval = 10; //in sec.
	var backupKey = "__textAreaBackupKey__" //cookie's store key.
	var backupTxtareaId = "___backupDataTextarea___";
	var backupBaseDivId = "___backupBaseDiv___";

	//for debug.
	function debug(msg) {
		GM_log(msg+" ["+ new Date() +"]");
	}
	
	//initialize backupScript.
	function initBackupTextareaContents() {
		if(!getTargetTextarea()) {
			debug("not found textarea. exit!");
			return;
		}
		var backData = getCookie(backupKey);
		if(backData) {
			debug("found backup data!");
			var flagForViewBackup = confirm("\u30d0\u30c3\u30af\u30a2\u30c3\u30d7\u3055\u308c\u305f\u30c7\u30fc\u30bf\u3092\u78ba\u8a8d\u3057\u307e\u3059\u304b\uff1f");
			if(flagForViewBackup) {
				showBackupData(backData);
			}
		}
		setTimeout("backupTextareaContents()",backupInterval*1000);
	}
	
	//register backupScript to unsafewindow
	unsafeWindow.backupTextareaContents = function() {
		debug("call backup function");
		//get target Textarea.
		var target = getTargetTextarea();
		setCookie(backupKey,target.value);	
		//call back.
		setTimeout("backupTextareaContents()",backupInterval*1000);
	}
	
	//show backupdata window.
	function showBackupData(backData) {
		debug("view backup data:"+backData);
		var nowWidth = window.innerWidth;
		var nowHeight = window.innerHeight;
		
		//base div
		var backDiv = document.createElement("div");
		backDiv.setAttribute("id",backupBaseDivId);
		bstyle = backDiv.style;
		bstyle.position = "absolute";
		bstyle.top = "10px";
		bstyle.right = "10px";
		bstyle.width = (nowWidth / 2) + "px";
		bstyle.height = nowHeight -10 + "px";
		bstyle.backgroundColor = "whitesmoke";
		bstyle.border = "2px outset gray";
		
		//title bar
		var title = document.createElement("p");
		title.innerHTML = "\u30d0\u30c3\u30af\u30a2\u30c3\u30d7\u3055\u308c\u305f\u30c7\u30fc\u30bf";
		tstyle = title.style;
		tstyle.color = "white";
		tstyle.margin = "0px";
		tstyle.padding = "0.2em 0em";
		tstyle.fontStyle = "bold";
		tstyle.textAlign = "center";
		tstyle.backgroundColor = "crimson";
		
		//buttons div
		var buttonsDiv = document.createElement("div");
		bdstyle = buttonsDiv.style;
		bdstyle.textAlign = "right";
		bdstyle.padding = "0.1em 0em";
		
		//close button
		var closeB = createButtonElement();
		closeB.value = "\u9589\u3058\u308b";
		closeB.addEventListener("click", closeBackupWindow, true);
		
		//restore button
		var restoreB = createButtonElement();
		restoreB.value = "\u5fa9\u5143\u3059\u308b";
		restoreB.addEventListener("click", restoreData, true);
		
		//data textarea
		var data = document.createElement("textarea");
		data.setAttribute("id",backupTxtareaId);
		dstyle = data.style;
		dstyle.backgroundColor = "white";
		dstyle.color = "gray";
		dstyle.width = "100%";
		dstyle.height = "80%";
		data.innerHTML = backData;

		//append elements
		buttonsDiv.appendChild(closeB);
		buttonsDiv.appendChild(restoreB);
		backDiv.appendChild(title);
		backDiv.appendChild(buttonsDiv);
		backDiv.appendChild(data);
		top.document.body.appendChild(backDiv);
	}

	function createButtonElement(){
		var button = document.createElement("input");
		button.setAttribute("type","button");
		button.style.backgroundColor = "silver";
		return button;
	}
		
	function closeBackupWindow(){
		document.getElementById(backupBaseDivId).style.display = "none";
	}

	function restoreData(){
		var flag = confirm("\u30d0\u30c3\u30af\u30a2\u30c3\u30d7\u3055\u308c\u305f\u30c7\u30fc\u30bf\u3092\u5fa9\u5143\u3057\u307e\u3059\u304b\uff1f");
		if(flag) {
			var target = getTargetTextarea();
			target.value = document.getElementById(backupTxtareaId).value;
			closeBackupWindow();
		}
	}
	
	function getTargetTextarea() {
		var txt = self.document.getElementsByTagName("textarea");
		debug("found "+ txt.length +" textarea")
		for(var i=0; i<txt.length; i++) {
			//return textarea that first displayed. 
			//debug("found textarea. computed.display="+window.getComputedStyle(txt[i],"").getPropertyValue("display"));
			if(window.getComputedStyle(txt[i],"").getPropertyValue("display") != "none"
				|| txt[i].getAttribute("id") != backupTxtareaId	){
				return txt[i];
			}
		}
		return null;
	}
	
	function getCookie(key) {
		var start,end;
		var tmp = document.cookie + ";" ;
		var Keyposition=tmp.indexOf(key,0);
		if(Keyposition!=-1) {
			tmp=tmp.substring(Keyposition, tmp.length);
			start=tmp.indexOf("=",0)+1;
			end=tmp.indexOf(";",start);
			tmp2= unescape(tmp.substring(start,end));
			if (tmp2.substr(0,1)==" ") {
				tmp2 = tmp2.substr(1,tmp2.length);
			}
			return tmp2;
		}
		else {
		return null;
		}
	}
	
	function setCookie(key,val) {
		var temp =key+"="+escape(val)+"; ";
		temp+="expires="+getCookieExpireDate();
		document.cookie=temp;
	}
	
	function getCookieExpireDate() {
		expireDate = new Date();
		expireDate.setFullYear(parseInt(expireDate.getFullYear()) + 1);
		exp = expireDate.toGMTString();
		return exp;
	}


	//main().
	initBackupTextareaContents();
})();

