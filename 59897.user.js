// ==UserScript==
// @name           IBM Inotes Contacts in Gmail
// @namespace      www.eliezer.com.br
// @author         Eliezer Rodrigues
// @description    Integrate contacts search from Lotus IBM Inotes in gmail
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @version        0.5.1
// Change : 0.5.1 - Fix bug to add inotes button - create  method removeInotesButton
//	    0.5   - Fix Google Gmail Greasemonkey API problem 
//          0.4   - Fix minor bugs 
// ==/UserScript==


InotesContacts = {
	
	startDefaultParams: function(){
		InotesContacts.inotesBox = false;
		InotesContacts.inotesTo = false;
		InotesContacts.listeningForAddButton = false;
		unsafeWindow.clearInterval(InotesContacts.listeningGmail);

		//DEBUG options
		InotesContacts.debug.log = false; 
		InotesContacts.debug.responseInotesPosts = false;

		InotesContacts.config = {};
		InotesContacts.config.domain = ""; //Define your domain here (ex.: inotes.yourdomain.com)
		InotesContacts.config.user = "";   // Set your username
		InotesContacts.config.password = ""; //Set your password
		InotesContacts.config.listeningTime = 500;

	},
	
	init: function(){
		if(unsafeWindow.gmonkey){
			log('Start IBM Inotes Contacts')
			InotesContacts.startDefaultParams();
			InotesContacts.startGmonkey();
		}
	},
	
	startGmonkey: function(){
		unsafeWindow.gmonkey.load('1.0', function(gmail){
			InotesContacts.gmail = gmail;
			InotesContacts.listeningGmailPage();
		});
	},
	
	listeningGmailPage: function(){
		log('Start listeningGmailPage');
		try {
			
			InotesContacts.listeningForAddButton = true;
			
			unsafeWindow.addEventListener('unload', function() {	
				log('Stop listeningGmailPage');
				InotesContacts.startDefaultParams();
			}, true);				

			InotesContacts.listeningGmail = unsafeWindow.setInterval(function() {
				if(InotesContacts.listeningForAddButton) {
					InotesContacts.addInotesButtonGmail()
				}
			}, InotesContacts.config.listeningTime);
			
		} catch(e) {
			log("Fail to execute listeningGmailPage() " + e);
			InotesContacts.startDefaultParams();
		}	
	},
	
	addInotesButtonGmail: function(target){
		log("Add inotes button");
		
		InotesContacts.removeInotesButton();
		
		var target = InotesContacts.findTargetAddInotesButton();
		
		if(target == null){
			log("WARN: ignore add inotes button: target == null");
			return;			
		}

		try {
			target.parentNode.insertBefore(InotesContacts.createGmailButtonInotes(), target);
		} catch(e) {
			log('Fail to add inotes button\n'+e);
		}
	
	},
	
	findTargetAddInotesButton: function(){
		log("Find target for add inotes button")
		return InotesContacts.findFirstElementXpath("//div[@role='navigation']/div/span");
	},
	
	getGmailDocument: function(){
		return InotesContacts.gmail.getCanvasElement().ownerDocument;
	},
	
	createGmailButtonInotes: function(){

		if(!InotesContacts.inotesButton){
			InotesContacts.inotesButton = unsafeWindow.document.createElement("div");
			InotesContacts.inotesButton.style.display = "inline-block";
			InotesContacts.inotesButton.style.position = "relative";
			InotesContacts.inotesButton.id = "inotesButton";
						
			var span = unsafeWindow.document.createElement("span");
			span.style.fontSize = '12px';
			span.style.backgroundColor = 'transparent';
			span.style.color = '#1C51A8';
			span.style.textDecoration = 'underline';
			span.style.cursor = 'pointer';
			span.appendChild(unsafeWindow.document.createTextNode('Inotes'));
			span.onclick = function(){
				if(InotesContacts.inotesTo){
					InotesContacts.removeInotesTo();
				}else{
					InotesContacts.authenticateInotes();
				}
			}
			InotesContacts.inotesButton.appendChild(span);
		}
		return InotesContacts.inotesButton;	
	},
	
	removeInotesButton: function(){
		log('remove inotesButton')
		try{
			var btn = InotesContacts.getGmailDocument().getElementById("inotesButton");
			var parent = btn.parentNode;
			if(parent){
				parent.removeChild(btn);
			}
			InotesContacts.inotesButton = false;
		}catch(e){ 
			//ignore error
		}
	},

	addInotesGmailTo: function(){
		try {
			log("Add inotes box search.\n");
			var trFrom = null;
			
			var target = InotesContacts.findFirstElementXpath("//select[@name='from']");
	
			if(target == null){
				target = InotesContacts.findFirstElementXpath("//td/div/span[contains(.,'@gmail.com>')]");
				trFrom = target.parentNode.parentNode.parentNode;
			}else{
				trFrom = target.parentNode.parentNode;
			}
			
			trFrom.parentNode.insertBefore(InotesContacts.createInotesTo(), trFrom.nextSibling);
		} catch(e) {
			log("Fail to add inotes 'TO' search.\n"+e)
		}
	},
	
	findFirstElementXpath: function(xpath){
		log("Find element with xpath = " + xpath);
		var doc = InotesContacts.getGmailDocument();
		var result = doc.evaluate( xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE , null );
		return result.snapshotItem(0);
	},
	
	createInotesTo: function(){
		log("Create inotes 'TO' search.\n");
		InotesContacts.inotesTo = unsafeWindow.document.createElement("tr");
			var td1 = unsafeWindow.document.createElement("td");
				td1.align = 'right';
				td1.style.fontSize = '12px'
				td1.style.fontWeight = 'bold';
				td1.appendChild(unsafeWindow.document.createTextNode("Inotes:"));
			InotesContacts.inotesTo.appendChild(td1);
				
			var td2 = unsafeWindow.document.createElement("td");
			td2.appendChild(InotesContacts.createInotesBox());
			InotesContacts.inotesTo.appendChild(td2);
			
		return InotesContacts.inotesTo;
	},
	
	removeInotesTo: function(){
		log("remove inotesTo");
		var parent = InotesContacts.inotesTo.parentNode;
		if(parent){
			parent.removeChild(InotesContacts.inotesTo);
		}
		InotesContacts.inotesTo = false;
	},
	
	createInotesBox: function(){
		log("Create inotes box");
		InotesContacts.inotesBox = unsafeWindow.document.createElement("div");
		InotesContacts.inotesBox.id = 'inotes_box';
		//InotesContacts.inotesBox.style.display = 'inline';
		//InotesContacts.inotesBox.style.marginLeft = 2;
		//InotesContacts.inotesBox.style.backgroundColor = 'white';
		//InotesContacts.inotesBox.style.border = '1px solid red';
		InotesContacts.inotesBox.appendChild(InotesContacts.createInputSearch());
		return InotesContacts.inotesBox;
	},

	createInputSearch: function(){
		log("Create input search inotes")
		InotesContacts.inotesBox.inputSearch = unsafeWindow.document.createElement("input");
		InotesContacts.inotesBox.inputSearch.id ='inotes_input_search';
		InotesContacts.inotesBox.inputSearch.style.fontSize = '12px'
		InotesContacts.inotesBox.inputSearch.style.width = '100%';
		InotesContacts.inotesBox.inputSearch.type = 'text';
		InotesContacts.inotesBox.inputSearch.addEventListener('keypress', function(event){ 
				if ((window.event ? event.keyCode : event.which) == 13){
					InotesContacts.searchContactInotes(this.value);
				}
			}, true);
		//TODO not work
		InotesContacts.inotesBox.inputSearch.focus()
		
		return InotesContacts.inotesBox.inputSearch;
	},
	
	authenticateInotes: function(){
		log("Post form autenticate inotes domain")
		
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "https://"+InotesContacts.config.domain+"/webredir.nsf?Login",
		  data: "username="+InotesContacts.config.user+"&password="+InotesContacts.config.password,
		  headers: {
		    "Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {

			if(InotesContacts.debug.responseInotesPosts){
				log(response.responseText);
			}
			if(response.responseText.search(/OpenDatabase/g) > 0){
				InotesContacts.addInotesGmailTo();
			}else if(response.responseText.search(/Change/g) > 0){
				alert("Ops!! Password exprired");
			}else{
				alert("Ops!! Fail to authenticate");
			}
		  }
		});
	},
	
	searchContactInotes: function(nameSearch){
		log("Post searchContactInotes inotes domain");
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "https://"+InotesContacts.config.domain+"/mail/"+InotesContacts.config.user+".nsf/iNotes/Proxy/?EditDocument&Form=s_ValidationXml&charset=UTF-8",
		  data: "VAL_NameEntries="+nameSearch+"&VAL_Type=1",
		  headers: {
		    "Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {
			//TODO check auth
			
			if(InotesContacts.debug.responseInotesPosts){
				log(response.responseText);
			}
			
			InotesContacts.createListResult(InotesContacts.parseResultXMLContactsInotes(response.responseText));
		  }
		});
	},
	
	parseResultXMLContactsInotes: function(xml){
	
		var parser=new DOMParser();
		var doc = parser.parseFromString(xml,"text/xml");
		var xpath= "//entrydata[@name='server']//entrydata[@name='fullName'] | //entrydata[@name='server']//entrydata[@name='internetAddress']"

		var resultXML = doc.evaluate( xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

		var result = Array();
		var regex = new RegExp(".*CN=(.*)/O.+$")
		var i=0; 

		while ( (entry = resultXML.snapshotItem(i) ) !=null ){ 
			var emailFinal = (resultXML.snapshotItem(i+1).textContent).replace('\n',"");
			var nameFinal = entry.textContent;
			
			if(emailFinal.length > 0 ){
				try{
					nameFinal = regex.exec(entry.textContent)[1];
				}catch(e){
					log("WARN: fail to format name = "+nameFinal);
				}
				result.push({ name: "\""+nameFinal+"\"", email: emailFinal});
			}else{
				log("WARN: email not found. Skip contact = "+nameFinal);
			}
			i=i+2 
		}

		return result;
	},
	
	createListResult: function(contatsArray){
		var ul = unsafeWindow.document.createElement("ul");
		ul.style.margin = 0;
		ul.style.padding = 0;
		for(var i = 0; i < contatsArray.length; i++){
			var li = unsafeWindow.document.createElement("li");
			li.style.fontSize = '12px';
			li.style.cursor = 'pointer';
			li.style.listStyleType = 'none';
			li.style.margin = 8;
			li.style.padding = 8;
			li.onmouseover = function(){
				this.style.backgroundColor = '#C0C0C0';
			}
			li.onmouseout  = function(){ 
				this.style.backgroundColor = '';
			}
			li.onmousedown = function() {
				InotesContacts.addEmailToField(this.innerHTML)
				InotesContacts.removeResultBox();
			}
			
			li.appendChild(unsafeWindow.document.createTextNode(contatsArray[i].name+" <"+contatsArray[i].email+">"))
			ul.appendChild(li)
		}
		InotesContacts.createResultBox();
		InotesContacts.inotesBox.result.appendChild(ul);

	},
	
	createResultBox: function(){
		log("Create result box");
		if(InotesContacts.inotesBox.result){
			InotesContacts.inotesBox.result.innerHTML = "";
			return
		}
		
		log("Create result inotes box");
		InotesContacts.inotesBox.result = unsafeWindow.document.createElement("div");
		InotesContacts.inotesBox.result.id = 'result_inotes_box';
		InotesContacts.inotesBox.result.style.zIndex = '9999';
		InotesContacts.inotesBox.result.style.position = 'absolute';
		InotesContacts.inotesBox.result.style.width = '50%';
		InotesContacts.inotesBox.result.style.height = 'auto';
		InotesContacts.inotesBox.result.style.backgroundColor = 'white';
		InotesContacts.inotesBox.result.style.border = '1px solid black';
		InotesContacts.inotesBox.result.style.padding = '0';
				
		InotesContacts.inotesBox.appendChild(InotesContacts.inotesBox.result);
		
	},
	
	removeResultBox: function(){
		if(InotesContacts.inotesBox.result){
			log("Remove result box");
			var parent = InotesContacts.inotesBox.result.parentNode;
			parent.removeChild(InotesContacts.inotesBox.result);
			InotesContacts.inotesBox.result = false;
		}
	},
	
	addEmailToField: function(contact){
		try {
			log("Add contact gmail 'TO' field :)");
			var to = InotesContacts.findFirstElementXpath( "//textarea[@name='to']");
	
			to.value = to.value + ((to.value.length > 0) ? ", ": "") + contact.replace("&lt;","<").replace("&gt;", ">");
		} catch(e) {
			log("Fail to add contact 'TO' field.\n"+e)
		}
	},
}

InotesContacts.debug = {};

function log(message){
	if(InotesContacts.debug.log){
		GM_log(message);
	}
}
	
window.addEventListener("load", InotesContacts.init, false);