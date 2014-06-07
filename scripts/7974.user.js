// ==UserScript==
// @name           gAttacher
// @namespace      http://www.maloninc.com/greasemonkey/
// @description    Gmail File Attacher by senduit(Ver0.9.2)
// @include        http*://mail.google.*/mail/*
// @include        http*://mail.google.com/a/*
// @include        http://www.senduit.com/
// ==/UserScript==

var label_J = 'senduit.com\u3067\u6DFB\u4ED8'
var label_E = 'Attach by senduit.com'
var JELabel = null;

var subWin = null;
var label  = null;

/* New mail */
showOnlineAttach('at_compose');


/* Draft mail */
showOnlineAttach('at_0');


/* for New and Draft */
function showOnlineAttach(id) {
	if(document.getElementById(id)){
		var attachFileLabel = document.getElementById('at').firstChild.data
		if(attachFileLabel == '\u30D5\u30A1\u30A4\u30EB\u3092\u6DFB\u4ED8'){ /* for japanese */
			label = label_J
		}
		else {  /* for english */
			label = label_E
		}

		var attachComp = document.getElementById(id)
		var divNode = document.createElement('div')
		attachComp.appendChild(divNode)

		var spanNode = document.createElement('span')
		divNode.appendChild(spanNode)

		var textNode = document.createTextNode(label)
		spanNode.appendChild(textNode)
		spanNode.setAttribute('class','lk')
		spanNode.setAttribute('id','onlineAttach')

		spanNode.addEventListener('click', function(spanNode){
			handleOnlineAttach()
		}, true);
	}
}

/* for reply button */
if(document.getElementById('sm_2')){
	JELabel = document.getElementById('sm_2').textContent ;
	showOnlineAttachForReply();
}


function showOnlineAttachForReply() {
	for(i = 0; i < 127; i++){
		if(!document.getElementById('onlineAttach_Re_'+i) && document.getElementById('co_'+i) && document.getElementById('c_3')){
			if(JELabel == '\u8FD4\u4FE1' ){ /* for japanese */
				label = label_J;
			}
			else {  /* for english */
				label = label_E;
			}

			var attachComp = document.getElementById('co_'+i).firstChild.firstChild.firstChild.firstChild;
			var tmpTextNode = document.createTextNode('|')
			attachComp.appendChild(tmpTextNode)
			var spanNode = document.createElement('span')
			attachComp.appendChild(spanNode)

			var textNode = document.createTextNode(label)
			spanNode.appendChild(textNode)
			spanNode.setAttribute('class','lk')
			spanNode.setAttribute('id','onlineAttach_Re_'+i)

			spanNode.addEventListener('click', function(spanNode){
				handleOnlineAttach()
			}, true);
		}
	}
	setTimeout(showOnlineAttachForReply, 500);
}

/* for forward button */
if(document.getElementById('sm_4')){
	JELabel = document.getElementById('sm_2').textContent ;
	showOnlineAttachForForward();
}

function showOnlineAttachForForward() {
	for(i = 0; i < 127; i++){
		if(!document.getElementById('onlineAttach_Fw_'+i) && document.getElementById('co_'+i) && document.getElementById('at')){
			if(JELabel == '\u8FD4\u4FE1' ){ /* for japanese */
				label = label_J;
			}
			else {  /* for english */
				label = label_E;
			}

			var attachComp = document.getElementById('at_'+i)
			var divNode = document.createElement('div')
			attachComp.appendChild(divNode)

			var spanNode = document.createElement('span')
			divNode.appendChild(spanNode)

			var textNode = document.createTextNode(label)
			spanNode.appendChild(textNode)
			spanNode.setAttribute('class','lk')
			spanNode.setAttribute('id','onlineAttach_Fw_'+i)

			spanNode.addEventListener('click', function(spanNode){
				handleOnlineAttach()
			}, true);
		}
	}
	setTimeout(showOnlineAttachForForward, 500);
}


/* open senduit.com */
function handleOnlineAttach() {
	subWin = window.open("http://www.senduit.com/" , "senduit-Gmail" , "width=450,height=580,resizable=no");
	setTimeout(checkSubWindow, 500);
}

/* check closing sunduit.com */
function checkSubWindow() {
	if(!subWin || subWin.closed){

		msgBody = document.getElementById("ta_compose");
		if(msgBody==null){
			msgBody = document.getElementById("ta_1");
		}
		if(msgBody==null){
			msgBody = document.getElementById("ta_0");
		}
		
		if(msgBody){
			attachedUrl = GM_getValue("gattacher_senduit_url");
			msgBody.value = msgBody.value + "\n" + label + ":   <" + attachedUrl +">\n"
		}
	}
	else {
		setTimeout(checkSubWindow, 500);
	}
}

/* for Senduit.com */
if(document.getElementById('download_url')) {
	var downloadUrlComp = document.getElementById('download_url')
	GM_setValue("gattacher_senduit_url", downloadUrlComp.value);
	if(window.name == 'senduit-Gmail') {
		window.close();
	}
}
