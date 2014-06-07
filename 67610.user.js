// ==UserScript==
// @name           User Dictionary 
// @version        0.1
// @namespace      http://ce.sharif.edu
// @include        http://*
// @include        file:///
// @description    Dictionary script for CE students
// ==/UserScript==

if (isLoaded()) { 
	window.addEventListener('keydown', keyHandler, false);
}	
function keyHandler(event) {
	if(event.which == 81 && event.ctrlKey) {
		getSelectedText(); 
		return false; 
	} 
	// Ctrl+Z for logouting 
	if(event.which == 90 && event.ctrlKey) {
		if(hasUser){
			hasUser=false;
			isLogged=false;
			var tmp=GM_getValue('userDic');
			GM_setValue('userDic','');
			GM_setValue('passDic','');
			showMessage('user '+ tmp + ' has been logged out!');
			tmp='';
		}
	}
  return false;
}
function isLoaded() {
	return document.getElementsByTagName("body")[0];
}
var xmlhttp;
var xmlhttpdict;
var user="";
var pass="";
var isLogged=false;
var hasUser=false;
function userLog(){
	user=document.getElementById('userid').value;
	pass=document.getElementById('passid').value;
	showUser(user,pass);
}
function showUser(user,pass){
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://213.233.168.21/~stu85110237/dic/web/ceLogin.php',
        headers: {
        'Content-type':'application/x-www-form-urlencoded',
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        data:'username='+user+'&password='+pass,
                        
        onload: function(responseDetails) {
			x=responseDetails.responseText;
			if(x==1){
				var theBody = document.getElementsByTagName('body')[0];
				if (document.getElementById('loginformDiv'))
					deleteLoginForm();
				hasUser=true;
				isLogged=true;
				GM_setValue('userDic',user);
				GM_setValue('passDic',pass);
	
				getTranslated();
			}
			else{
				insertLoginForm();
				alert("user/pass mismatch");
				}
				isLogged=false;
		}			
    });


/*
	xmlhttp=new XMLHttpRequest();
	var url="http://localhost/dictionary/userlogin.php";
	param="user="+user;
	param=param+"&pass="+pass;
	xmlhttp.onreadystatechange=stateChanged;
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
	xmlhttp.send(param);*/
	
	
}
var doDebug = true;

var txt = '';
function getSelectedText(){
	var user=GM_getValue('userDic','');
	var pass=GM_getValue('passDic','');
	
	if (document.getSelection){
		txt = document.getSelection();
		enword=txt;
	}
	if(user=='' && pass==''){
		hasUser=false;
		isLogged=false;
	}
	else
		hasUser=true;
	if(!hasUser){
		insertLoginForm();
		return false;
	}
	if(hasUser){
		showUser(user,pass);	
		getTranslated();
		return false;
	}
}

function getTranslated(){
	GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://translate.google.com/translate_a/t',
        headers: {
        'Content-type':'application/x-www-form-urlencoded',
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        data:'client=t&text='+txt+'&sl=en&tl=fa',
                        
        onload: function(responseDetails) {
			x=trans(responseDetails.responseText);
			meaning=x;
			showBubbleTranslate(x);
		}			
    });
	txt='';
	
}

var CloseBubble;
var MessageBubble;
function trans(s){
	s = s.substring(24, s.length);
   while (s.substring(s.length-4, s.length) != 'orig'){
        s = s.substring(0,s.length-1);
    }
	s=s.substring(0,s.length-7);	
    return s;	
}


function showMessage(txt){
	var topoffset ;
	if( self.innerHeight ) {
	topoffset = self.innerHeight-50;
	}else{
	topoffset  = 600;
	}
	if (document.getElementById('bubbletranslateDiv'))
		deleteBubbleTranslate();
	var bubbleform="<div id=\"MessageID\" style=\"position:absolute; top: "+ topoffset +"px; right: 100px; height: 20px;\">"+
		"<span id=\"MessageSpan\" class=\"MessageForm\">"+
		"<label>"+txt+"</label></span></div>";
	 var theBody = document.getElementsByTagName('body')[0];
	 theBody.innerHTML=theBody.innerHTML+bubbleform;
	 
	MessageBubble=document.getElementById("MessageID");
	MessageBubble.addEventListener("click", deleteMessage, false);
	
}
function deleteMessage(){
	  var bub = document.getElementById('MessageID');
	  var parent = bub.parentNode;
	  parent.removeChild(bub);

}

function showBubbleTranslate(word){	
	var topoffset ;
	if( self.innerHeight ) {
	topoffset = self.innerHeight-50;
	}else{
	topoffset  = 600;
	}
	if (document.getElementById('MessageID'))
		deleteMessage();

	var bubbleform="<div id=\"bubbletranslateDiv\" style=\"position:absolute; top: "+ topoffset +"px; right: 100px; height: 20px;\">"+
		"<span id=\"loginformSpan\" class=\"loginform\">"+
		"<label>"+word+"</label><div id=\"bubbleDivid\">ok</div><div id=\"Addid\">Add</div></span></div>";
	if (document.getElementById('bubbletranslateDiv'))
		deleteBubbleTranslate();
	 var theBody = document.getElementsByTagName('body')[0];
	 theBody.innerHTML=theBody.innerHTML+bubbleform;
	 
	CloseBubble=document.getElementById("bubbleDivid");
	CloseBubble.addEventListener("click", deleteBubbleTranslate, false);

	AddWord=document.getElementById("Addid");
	AddWord.addEventListener("click", insert, false);
}

var AddWord;
var enword;
var meaning;
function insert(){
	GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://213.233.168.21/~stu85110237/dic/web/wordInsert.php',
        headers: {
        'Content-type':'application/x-www-form-urlencoded',
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        data:'user='+user+'&word='+enword+'&meaning='+meaning+'&srcLang=en&destLang=fa',
                        
        onload: function(s) {
			meaning='';
			enword='';
			deleteBubbleTranslate();
		}			
    });

}

function deleteBubbleTranslate(){
	  var bub = document.getElementById('bubbletranslateDiv');
	  var parent = bub.parentNode;
	  parent.removeChild(bub);

}

var LoginBotton;
var CancelBotton;
function insertLoginForm(){
	var logform="<div id=\"loginformDiv\" style=\"position:absolute; top: 100px; right: 100px; height: 275px;\">"+
		"<span id=\"loginformSpan\" class=\"loginform\">"+
		"<label>User ID: </label><input type=\"text\" name=\"user\" value=\""+user+"\" id=\"userid\"><br/>"+
		
		"<label>Password: </label><input type=\"password\" name=\"pass\" value=\""+pass+"\" id=\"passid\"><br/>"+
		"<input type=\"button\" id=\"Loginid\" value=\"Login\" />"+
		"<input type=\"button\" id=\"Cancelid\" value=\"Cancel\" />"+
		"</span></div>";
		
	if (!document.getElementById('loginformDiv')){
		var theBody = document.getElementsByTagName('body')[0];
		theBody.innerHTML=theBody.innerHTML+logform;

		LoginBotton=document.getElementById("Loginid");
		LoginBotton.addEventListener("click", userLog, false);


		CancelBotton=document.getElementById("Cancelid");
		CancelBotton.addEventListener("click", deleteLoginForm, false);

	 }
}

function deleteLoginForm(){
  var log = document.getElementById('loginformDiv');
  var parent = log.parentNode;
  parent.removeChild(log);
  CancelBotton='';
  LoginBotton='';
}
