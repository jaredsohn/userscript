// ==UserScript==
// @name           TriviaQuestions
// @description    Simplifies the editing of questions with !triviamgr by =realillusions
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==


with(unsafeWindow) {
//Global variables anyone? I like to initialize :( don't laugh at me
var IDs= new Array();
var pushID= new Array(1);
var htmlregex= /&lt;&lt;.*&gt;&gt;/g;
var lt = /[^\d\s]/g;
var add = /^\d{0,7}\s?/;
var current = null;
var update = null;
var safeguard = /No tagged questions\.\./;
var args = null;
var opac = 99
prevID = null;


function findID(){

//get question ID's from the Thumbbot and fix them
var oogity = dAmnChats[dAmnChatTab_active].channels.main.chat_el.innerHTML;
if(!safeguard.exec(oogity)){
var testA = htmlregex.exec(oogity);
var fixedstring = testA[0].toString();
fixedstring= fixedstring.replace(lt,"");
IDs = fixedstring.split(" ");
window.setTimeout(startQns,1000);}
else{}
}

function startQns(){
args=="prev"?current=prevID:current = IDs.shift();
if(current==undefined){
alert("No questions to untag!");}
else{
dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg','main',"!triviamgr viewqn "+current);}
}

function untagStuff(){
setTimeout(findID,1500);
makeTagBox();
addClicks();
}

function doThings(){
switch(this.id){
				case 'add':
				var update = prompt("What is the answer to be added?","");
				if(update==null){return false;}
			   dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg','main',"!triviamgr addans "+current+" "+update);	
				break;
					
				case 'del':
				var update = prompt("Which answer do you want to delete?","");
				if(update==null){return false;}
				dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg','main',"!triviamgr delansno "+current+" "+update);

				case 'delno':
				if(update==null){return false;}
				dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg','main',"!triviamgr delans "+current+" "+update);
				break;
			
				case 'qn':
				var update = prompt("What's the new question?","");
				if(update==null){return false;}
				dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg','main',"!triviamgr updqn "+current+" "+update);
				break;
									
				case 'cat':
				var update = prompt("What's the new category?","");
				if(update==null){return false;}
				dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg','main',"!triviamgr updcat "+current+" "+update);
				break;
									
				case 'note':
				var update = prompt("What's the new note?","");
				if(update==null){return false;}
				dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg','main',"!triviamgr updnote "+current+" "+update);
				break;
									
				case 'skip':
				prevID = current;
				IDs.push(current);
				startQns();
				break;
					
				case 'untag':
				prevID=current;
				dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg','main',"!triviamgr untag "+current);
				if(IDs[0]==undefined){current=undefined};
				window.setTimeout(startQns,550);
				break;
		}
}

function makeTagBox(){
var tagbox = document.createElement('div');
tagbox.setAttribute('id','tagbox')
tagbox.setAttribute('style','width:100%;background-color:#A8ADA8;border:none;border-top:1px solid #546359;z-index:999;font-size:15px;text-align:center;');

var titlespan = document.createTextNode('What would you like to change?');

closebox = document.createElement('div');
closebox.setAttribute('style','border:1px solid #546359; font-size: 18px;font-weight:bold;position:absolute; top: 25px; right: 5px;cursor:pointer;');
closebox.onclick = removeTagBox
closebox.innerHTML = "X";

tagbox.appendChild(titlespan);
tagbox.appendChild(closebox);

linkcontainer = document.createElement('div');
linkcontainer.setAttribute('id','linkcontainer');
linkcontainer.setAttribute('style','font-size:10px;cursor:pointer');
tagbox.appendChild(linkcontainer);

link1=document.createElement('a');link1.innerHTML="Add Answer";link1.id='add';
link2=document.createElement('a');link2.innerHTML="Delete By Answer";link2.id="del";
link3=document.createElement('a');link3.innerHTML="Delete By Number";link3.id="delno";
link4=document.createElement('a');link4.innerHTML="Change Question";link4.id="qn";
link5=document.createElement('a');link5.innerHTML="Change Category";link5.id="cat";
link6=document.createElement('a');link6.innerHTML="Change Note";link6.id="note";
link7=document.createElement('a');link7.innerHTML="Skip Question";link7.id="skip";
link8=document.createElement('a');link8.innerHTML="Untag";link8.id="untag";
for(var x=1;x<9;x++){eval("linkcontainer.appendChild(link"+x+")");if(x!=8){linkcontainer.innerHTML += "&nbsp;|&nbsp;"};}


//Append to topic
dAmnChats["chat:Blackhole"].channels.main.topic_el.appendChild(tagbox);
}

function removeTagBox(){
var e = document.getElementById('tagbox');
e.parentNode.removeChild(e);
}

function addClicks(){
var e = document.getElementById('linkcontainer');
for(var x=0;x<e.childNodes.length;x=x+2){
e.childNodes[x].onclick=doThings
}
}


dAmnChat.prototype.Send = dAmnChat_Send;


var aku = [];
dAmnChatInput.prototype.onKey_TS = dAmnChatInput.prototype.onKey;
dAmnChatInput.prototype.onKey = function (e,kc,force) {

var el = this.chatinput_el;
if( kc == 13 && ( force || !this.multiline || e.shiftKey || e.ctrlKey ) ) {
	if( el.value ) {
		if (!e.shiftKey && (this.multiline || !e.ctrlKey) ) {
			var didsmth=false;
			var cmdre = el.value.match( /^\/([a-z]+)([\s\S]*)/m );
			if(cmdre) {var cmd  = cmdre[1].toLowerCase();}
				if(this.cmds[cmd]) {
					if(cmd=='tagged'){
									 dAmnChats[dAmnChatTab_active].channels.main.cr.Send('msg','main',"!triviamgr tagged");									  
									 untagStuff();
									
					}
				}
		}
	}
}




rv = this.onKey_TS.apply(this,arguments);
return rv;

}

dAmnChanChat.prototype.Init_TS = dAmnChanChat.prototype.Init;
dAmnChanChat.prototype.Init = function(cr,name,parent_el) {
	this.Init_TS.apply(this,arguments);
	this.input.cmds["tagged"]=[0,''];
}

dAmn_objForEach(dAmnChats,function(chan){
main=chan.channels.main;
main.Send=dAmnChat_Send;
main.input.cmds['tagged']=[0,''];

});

document.onkeydown = function(event) {
	k = event.which;
	n = event.target.nodeName;
	if ((k==8||k==191||k==192)&&(n=="HTML"||n=="html")) {event.preventDefault();return false;}
	else {return true;}
}
}