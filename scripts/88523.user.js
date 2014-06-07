// ==UserScript==
// @name		The Colorless Chat Enhancement Pack
// @include		http://thecolorless.net/chat/*
// @include		http://thecolorless.net/chat
// ==/UserScript==
//-------------------------------------------------------------- 
//-------------------------------------------------------------- 
//The Colorless Chat Enhancement Pack, v 1.0
//-------------------------------------------------------------- 
//Current as of Thur, Sep 6260, 1993 
//--------------------------------------------------------------
//-------------------------------------------------------------- 
//Chat Message Append Script, for use with The Colorless Chat, v 1.1
//
//Written by Cloud - http://thecolorless.net/user/cloud
//-------------------------------------------------------------- 
//OVERVIEW:
//This script flips the Comet Chat on http://www.thecolorless.net/chat,
//as to help with reading the chat when used with the custom CSS. 
//Additionally, it automatically displays a message notifying users of
//the functionality, because someone is BOUND to misunderstand.
//-------------------------------------------------------------- 
//TODO:
//-Anything that is asked, I guess
//-bug fixes, if any
//--------------------------------------------------------------
//Current as of Thur, Sep 6260, 1993 
//-------------------------------------------------------------- 
//-------------------------------------------------------------- 
//Custom Stylesheet for use with The Colorless Chat, v 1.0
//
//Original Style by Eugene Rochko - http://eugenrochko.net/
//Custom edited by Jesse Hamilton - http://acostoss.co.cc
//
//If you have any questions, comments or suggestions, drop me a
//line at acostoss@gmail.com, http://twitter.com/acostoss,
//or on thecolorless.net/user/acostoss
//-------------------------------------------------------------- 
//OVERVIEW:
//This custom CSS remedies a multitude of problems that are to be
//had with The Colorless chat, such as left-aligning posts, 
//removing the images from posts, widening the box to the width
//of the entire screen, moving the post box to the bottom, as well
//as a multitude of other problems not worth mentioning.
//-------------------------------------------------------------- 
//TODO:
//-Anything that is asked
//-Fix any bugs
//-General cleanup
//-Un-Un-reimplement the @username" feature, sans lag
//-------------------------------------------------------------- 
//RECENT CHANGES:
//-Flip the chat, so that it updates at the bottom (JS provided by Cloud)
//-Un-Reimplimented the "@username" feature, lag problems
//-Made red brighter
//-Widened the "sendie", your chat input box
//-Moved the updates underneath the sendie, centered
//-Lifted the sendie up, as to not have it obscured in Chrome
//-General bug fixes
//-General code cleanup, nearing completion
//-------------------------------------------------------------- 
//Current as of Thur, Sep 6260, 1993 
//--------------------------------------------------------------
//This work is licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
//http://creativecommons.org/licenses/by-nc-sa/3.0/
//--------------------------------------------------------------

//Cloud's Append Script
// v1.2 
// todo-acostoss-hand cursor for .myheart
// remove @
// chrome heart can be click now for the @
// fix bug switching not permanent
// switch to avatar/switch to hearts rotate
// alias nick highlighting for Firefox
//-----
// updated with heart and switch avatar 
// heart class is myheart
var unsafeWindow=this['unsafeWindow'] || window;
var switchMode=document.createElement("a");
switchMode.id="switchAvatar";
switchMode.innerText=switchMode.innerHTML="Switch to avatar";
switchMode.href='javascript:if(typeof imgAvatarBool=="undefined"){imgAvatarBool=false;};imgAvatarBool=!imgAvatarBool;$(".avatar").toggle(imgAvatarBool);$(".myheart").toggle(!imgAvatarBool);if(imgAvatarBool){$("#switchAvatar").html("Switch to hearts");}else{$("#switchAvatar").html("Switch to avatar")};void(0);';
document.getElementById("name-area").appendChild(switchMode);	

// for chrome - bypass sandbox by append to dom, then call onLoad to override pressMessage
// cannot use addEventListener - sandbox only see methods here for chrome
// cannot use setTimeout since won't see method in unless in text
// so got to code in href to make method exists in dom then call it
if(this["chrome"]){
window.setTimeout("window.location=document.getElementById('flip-text').href",0)

var input=document.createElement("a");
input.style.display='none';
input.id="flip-text";
input.innerText="";

// compress, replaced all ' to \'
input.href='javascript:var unsafeWindow=this["unsafeWindow"]||window;var theChatArea=this["chrome"]?$("#chat-area"):unsafeWindow.$("#chat-area");unsafeWindow.$(".myheart").live("click",function(){u_n=unsafeWindow.$(this).siblings(".username").text();bb=unsafeWindow.$("#sendie");bb.val(bb.val()+""+u_n+" ").focus()});var imgAvatarBool=false;var oldFunction=unsafeWindow.pressMessage;unsafeWindow.pressMessage=function(msg){var type=msg.type;var nickname=unsafeWindow.stripslashes(msg.nickname);var timestamp=msg.timestamp;var content=unsafeWindow.stripslashes(msg.text);var color=msg.color;if(type=="message"){var reply="";if(!unsafeWindow.anon_name){var o_u=unsafeWindow.readCookie("nickname").toLowerCase();var t_c=content.toLowerCase();if(t_c.search(o_u)!==-1||t_c.search(decodeURIComponent(o_u))!==-1){reply=" is_reply";}}if(imgAvatarBool){var imgVisible="inline";var heartVisible="none";}else{var imgVisible="none";var heartVisible="inline";}var message="<div class=\'message "+color+reply+"\'><div class=user><img src=\'/images/avatars/"+color+".png\' width=64 height=64 class=avatar alt=\'"+timestamp+"\' style=\'display:"+imgVisible+"\'/>"+"<a style=\'display:"+heartVisible+"\' class=myheart >&#9829;</a>"+"<a class=username target=_blank href=\'/user/"+nickname+"\'>"+nickname+"</a></div><div class=blurb><p>"+content+"</p></div></div>";theChatArea.append(message);window.scrollTo(0,document.body.scrollHeight);}else{return oldFunction(msg);}};theChatArea.append("<div class=message>Note: You are using the flipping script so latest msg appear from below</div><br />");';
document.getElementById("name-area").appendChild(input);	
	
}else{	
 flip();
// only for firefox save glow, chrome sandbox make it difficult to implement	
// alifor glowing 
var glowAliasTxt=document.createElement("input");
glowAliasTxt.id="glowAliasTxt";
if(unsafeWindow.readCookie("glowAlias") != null){
 glowAliasTxt.value=unsafeWindow.readCookie("glowAlias");
}
document.getElementById("name-area").appendChild(glowAliasTxt);	
// alias saving
// eventListener only can see local method?	
var glowAliasSave=document.createElement("input");
glowAliasSave.type="button";
glowAliasSave.id="glowAliasSave";
glowAliasSave.value="Save";
document.getElementById("name-area").appendChild(glowAliasSave);	
	
glowAliasSave.addEventListener("click",function(){
	unsafeWindow.createCookie("glowAlias",document.getElementById("glowAliasTxt").value);
	alert("Alias Saved\n " + unsafeWindow.readCookie("glowAlias"));void(0);},false);	
// usage help
var glowAliasHelp=document.createElement("input");
glowAliasHelp.type="button";
glowAliasHelp.id="glowAliasHelp";
glowAliasHelp.value="?";
document.getElementById("name-area").appendChild(glowAliasHelp);	
	
glowAliasHelp.addEventListener("click",function(){	
	alert("Save aliases besides your username to glow in chat (case insensitive).\nEg. acostoss,momo,jesse\nAnd the chat glow if either name is present in the chat message.");void(0);},false);	
}


function flip(){	
var unsafeWindow=this["unsafeWindow"] || window;
var theChatArea = this["chrome"] ? $("#chat-area") : unsafeWindow.$("#chat-area");

unsafeWindow.$(".myheart").live("click",function(){u_n=unsafeWindow.$(this).siblings(".username").text();bb=unsafeWindow.$("#sendie");bb.val(bb.val()+""+u_n+" ").focus()});
var oldFunction = unsafeWindow.pressMessage;
unsafeWindow.pressMessage = function(msg) {
  var type=msg.type;
  var nickname=unsafeWindow.stripslashes(msg.nickname);
  var timestamp=msg.timestamp;
  var content=unsafeWindow.stripslashes(msg.text);
  var color=msg.color;
  //only change message logic
  if(type=="message"){
    var reply="";
    if(!unsafeWindow.anon_name){
      var o_u=unsafeWindow.readCookie("nickname").toLowerCase();
      var t_c=content.toLowerCase();	
	// added to make it glow for non english and names spacing
      if(t_c.search(o_u)!==-1 || t_c.search(decodeURIComponent(o_u)) !== -1  ){
        reply=" is_reply";
      }
      // glow if needed
      if(reply == "" && unsafeWindow.readCookie("glowAlias")){
	 var values = unsafeWindow.readCookie("glowAlias");
	 var aliasData = values.split(",");
	 for(i=0;i<aliasData.length;i++){
	  var o_u=alias=aliasData[i].trim().toLowerCase();
	  if(t_c.search(o_u)!==-1 || t_c.search(decodeURIComponent(o_u)) !== -1  ){
           reply=" is_reply";
          }//end if
	 }// end for
      }//end if
    }
    // var message='<div class="message '+color+reply+'"><div class="user"><img src="/images/avatars/'+color+'.png" width="64" height="64" class="avatar" alt="'+timestamp+'" /><a class="username" target="_blank" href="/user/'+nickname+'">'+nickname+'</a></div><div class="blurb"><p>'+content+'</p></div></div>';            
    if(unsafeWindow.imgAvatarBool){	
     var imgVisible="inline";	    
     var heartVisible="none";	    	    
    }else{
     var imgVisible="none";	    
     var heartVisible="inline";	    	    
    }
    // single quote inside, double quote outside, so easy to replace for chrome version
     var message="<div class='message "+color+reply+"'><div class=user><img src='/images/avatars/"+color+".png' width=64 height=64 class=avatar alt='"+timestamp+"' style='display:"+imgVisible+"'/>"+		    
		    "<a style='display:"+heartVisible+"' class=myheart>&#9829;</a>" +
		    "<a class=username target=_blank href='/user/"+nickname+"'>"+nickname+"</a></div><div class=blurb><p>"+content+"</p></div></div>";            
   theChatArea.append(message);
   //unsafeWindow.damnedEffect();    
   window.scrollTo(0,document.body.scrollHeight);
  }else{	  
   return oldFunction(msg);
  }
};
theChatArea.append("<div class=message>Note: You are using the flipping script so latest msg appear from below</div><br />");
}

//Acostoss's Custom CSS
(function() {
var css = "html, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, font, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td {\n	margin: 0;\n	padding: 0;\n	border: 0;\n	outline: 0;\n	font-size: 100%;\n	vertical-align: baseline;\n	background: transparent;\n}\nbody {\n	line-height: 1;\n}\nol, ul {\n	list-style: none;\n}\nblockquote, q {\n	quotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n	content: '';\n	content: none;\n}\n\n\n:focus {\n	outline: 0;\n}\n\n\nins {\n	text-decoration: none;\n}\ndel {\n	text-decoration: line-through;\n}\n\n\ntable {\n	border-collapse: collapse;\n	border-spacing: 0;\n}\n\na img { border: none; }\n\n\n\n\n\nbody {\n    background: #111111 !important;\n    color: #fff !important;\n    line-height: 14px !important;\n    font-size: 12px !important;\n    font-family: Helvetica, Arial, sans-serif !important;\n    overflow: auto !important;\n}\n\ndiv::-webkit-scrollbar {\ndisplay:none !important;\n}\n\ndiv::-webkit-scrollbar-button:start:decrement {\ndisplay:none !important;\n}\n\ndiv::-webkit-scrollbar-button:end:increment {\ndisplay:none !important;\n}\n\ndiv::-webkit-scrollbar-button:vertical:increment {\ndisplay:none !important;\n}\n\ndiv::-webkit-scrollbar-track:enabled {\ndisplay:none !important;\n}\ndiv::-webkit-scrollbar-thumb:vertical {\ndisplay:none !important;\n}\n\ndiv::-webkit-scrollbar-thumb:horizontal {\ndisplay:none !important;\n}\n\n#wrapper {\n    position: relative;\n}\n\n#header {\n    background: #222222  !important;\n    width: 100% !important;\n    height: 60px !important;\n    position: fixed;\n	top: auto !important;\n	bottom: 15px !important;\n    z-index: 100 !important;\n    text-shadow:#fff 0px 0px 0px !important;\n	clear: both !important;\n	float: left !important;\n	padding-bottom:0px !important;\n}\n\n#name-area {\n    overflow: visible;\n    clear: none !important;\n    height: 18px !important;\n    position: relative;\n}\n\n#header a {\n    display: block !important;\n    float: left;\n    margin-right: 5px;\n    color: #999 !important;\n    text-decoration: underline;\n}\n\n#header a:hover {\n    text-decoration: underline !important;\n}\n\n#send-message-area {\n    width: 100% !important;\n}\n\n#name-area{\n	display:inline !important;\n}\n\n#you-are{\n	display:none !important;\n}\n\n#home-link{\n	float:left !important;\n}\n\n#sendie {\n	float:left !important;\n    background: #fff;\n	display:block !important;\n    border: 0px solid #5a5a5a !important;\n    color: #5a5a5a;\n    width: 95% !important;\n    margin-top: 5px;\n    margin-bottom: 5px;\n    -webkit-border-radius: 0px !important;\n    -moz-border-radius: 0px !important;\n    border-radius: 0px !important;\n    font-size: 12px !important;\n    font-weight: 600 !important;\n    font-family: Helvetica, Arial, sans-serif !important;\n    padding: 5px;\n	clear:left !important;\n	margin-left: auto !important;\n	margin-right: auto!important;\n}\n\n#characters-left {\n	display: inline !important;\n	right: 2% !important;\n}\n\n#new-msg-post {\n	display:none !important;\n}\n\n#content {\n    width: 100% !important;\n    margin: 0 auto;\n    position: relative;\n}\n\n#chat-wrap {\n    width: 100% !important;\n    height: 100% !important;\n    overflow: auto !important;\n    overflow-y: scroll;\n    padding-bottom: 85px;\n    background: #111111;\n    z-index: 100;\n    margin: 0 !important;\n    position: relative;\n    z-index: 1;\n	top: 0 !important;\n}\n\n#chat-area {\n    width: 100% !important;\n    overflow: visible;\n    z-index: 100;\n    padding: 0;\n}\n\n.message, .status {\n    clear: none !important;\n    margin-bottom: 10px;\n	display: inline !important;\n    clear: none !important;\n}\n\n.message {\n    background: #111111 !important;\n    background-position: 83px 33px;\n    overflow: hidden;\n    width: auto !important;\n    padding-top: 10px;\n	display: inline !important;\n    clear: right !important;\n	margin-left: 10px !important;\n}\n\n\n.status { \n	margin-bottom: 20px;\n	display: none !important;\n	clear: none !important;\n	}\n\n.user {\n    width: auto !important;\n    line-height: 18px;\n    float: left !important;\n    clear: none !important;\n	display: inline-block !important;\n	clear:left !important;\n}\n\n.user:after{\n	content:\">\" !important;\n	margin-left: 3px !important;\n}\n\n.avatar {\n    width:16px!important;height:16px!important; border: 0px !important;\n     background: #111111 !important;\n	clear: none !important;\n	float:left !important;\n	left: 0 !important;\n	margin-left: 5px !important;\n}\n\n\n.username {\n    display: inline !important;\n    text-align: left !important;\n    position: relative;\n    color: #fff!important;\n    text-decoration: none;\n	float: left !important;\n    clear: none !important;\n	font-size: 120% !important;\n	font-weight: 800 !important;\n	margin-left: 5px !important;\n}\n\n.inline-username {\n    color: #fff;\n    text-decoration: none;\n	clear: left !important;\n}\n\n.message .blurb {\n    display: block !important;\n    margin-left: 0px !important;\n    margin-right: 0;\n    background: #111111 center !important;\n    -moz-border-radius: 0px !important;\n    -webkit-border-radius: 0px !important;\n    border-radius: 0px !important;\n    font-weight: 700 !important;\n    float: left !important;\n    min-height: 1px !important;\n    border: 0px !important;\n    margin-bottom: 0px !important;\n    max-width: 100% !important;\n    padding: 2px !important;\n    text-shadow: rgba(0, 0, 0, 0) 0px 0px 0px !important;\n    white-space: pre-wrap; \n    white-space: -moz-pre-wrap !important; \n    white-space: -pre-wrap; \n    white-space: -o-pre-wrap; \n    word-wrap: break-word; \n	clear: none !important;\n}\n\n.message .blurb:after {\n    display: none !important;\n	clear: none !important;\n}\n\n.message .blurb a { \ncolor: #00aeff !important;\n}\n\n.black a { \ntext-shadow: 0px -1px 0px #777777;\n}\n\n.orange a { \ncolor: #d58f19 !important;\n}\n\n.darkblue a { \ncolor: #3c629b !important;\n}\n\n.blue a { \ncolor: #5d9dc2 !important; \n}\n\n.red a {\ncolor: #bb0000  !important;\n}\n\n.magenta a { \ncolor: #95005c  !important;\n}\n\n.green a { \ncolor: #1d8140  !important;\n}\n\n.grey a { \ncolor: #717171  !important;\n}\n\n.mud_green a { \ncolor: #777137  !important;\n}\n\n.purple a { \ncolor: #3c1773  !important;\n}\n\n.lime_green a { \ncolor: #5ab800  !important;\n}\n\n.is_reply  *{\n    -webkit-box-shadow: 0px 0px 0px #ebebeb !important;\n    -moz-box-shadow: 0px 0px 0px #ebebeb !important;\n    box-shadow: 0px 0px 0px #ebebeb !important;\n	font-size:120% !important;\n}\n\n.is_reply  .blurb{\n		text-shadow: 1px 1px 6px #fff !important;\n}\n\n#notice {\n    background: #2b2b2b;\n    overflow: auto;\n	float: right !important;\n}\n\n#notice #wrapper {\n    width: 1045px;\n    margin: 0 auto;\n}\n\n#notice #content {\n    width: 20% !important;\n    margin: 0 !important;\n	float: right !important;\n    position: relative;\n    text-shadow:#000 0px -1px 1px;\n}\n\n#notice h2 {\n    font-size: 24px;\n    font-family: Arial, Helvetica, 'Helvetica Neue', Verdana, sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    letter-spacing: -1px;\n    margin-bottom: 24px;\n}\n\n#notice p {\n    font-size: 15px;\n    max-width: 400px;\n}\n\n#go-away {\n    position: absolute;\n    top: 24px;\n    right: 130px;\n}\n\n#footer {\n    position: fixed;\n    width: 100% !important;\n    background: #222222 !important;\n    text-align: center !important;\n    color: #999;\n    font-size: 9px;\n    text-transform: uppercase;\n    z-index: 90 !important;\n    padding: 5px !important;\n	height: 10px !important;\n	bottom: 0px !important;\n}\n\n#footer p{\n	z-index: 110 !important;\n	top: auto !important;\n	bottom: 0px !important;\n	text-align: center !important;\n}\n\n#footer a { \ncolor: #bbb \n}\n\n#whois-online {\n    position: fixed !important;\n    left: auto !important;\n    right: 0px !important;\n    top: 0px !important;\n	bottom: auto !important;\n    margin-left: auto !important;\n    margin-right: 0 !important;\n    z-index: 200;\n    padding: 20px;\n	display:hidden !important;\n}\n\n#whois-online-container {\n    background: #111112;\n	position:fixed !important;\n    width: 75px !important;\n	height: auto !important;\n    border: 1px solid #222223;\n    padding: 20px;\n    -webkit-border-radius: 10px;\n    -moz-border-radius: 10px;\n    border-radius: 10px;\n    -webkit-box-shadow: 0px 0px 20px #000000;\n    -moz-box-shadow: 0px 0px 20px #000000;\n    box-shadow: 0px 0px 20px #000000;\n	position: fixed !important;\n    left: auto !important;\n    right: 0px !important;\n    top: 0px !important;\n	bottom: auto !important;\n    margin-left: auto !important;\n    margin-right: 0 !important;\n	float:right !important;\n}\n\n#close-whois-online {\n    color: #cb0419;\n}\n\n#whois-online .inline-username:hover {\n    text-decoration: underline;\n}\n\n.timestamp, #color-change { \ndisplay: inline !important; \n}\n\n#color-select {\n    display: block !important;\n    float: left !important;\n    margin-right: 0px !important;\n    background: #555556;\n    color: #fff;\n    cursor: pointer;\n    text-shadow: none;\n    -webkit-border-radius: 0px !important;\n    -moz-border-radius: 0px !important;\n    border-radius: 0px !important;\n    position: relative !important;\n    left: auto !important;\n    overflow: hidden !important;\n}\n\n#color-select ul{\n	list-style-type: none !important;\n	  display: inline !important;\n	  margin: 0px !important;\n	  padding: 0 !important;\n}\n\n#color-select li {\n    padding: 3px !important;\n    display: hidden !important;\n	float: left !important;\n    background: #555556;\n    text-align: left;\n}\n\n#color-select li:last-child {\n    -webkit-border-top-left-radius: 0px !important;\n    -moz-border-radius-topleft: 0px !important;\n    border-top-left-radius: 0px!important;\n}\n\n#color-select:hover li {\n    display: inline !important;\n}\n\n#color-select li:hover {\n    background-color: #666667;\n}\n\n#color-select #active-color {\n    display: inline !important;\n    padding-right: 0px !important;\n    background: url(\"http://imgur.com/EcmWl.png\") no-repeat center right;\n}\n\n#active-color span {\n    font-weight: bold;\n}\n\n#home-link {\n    margin-left: 5px !important;\n	display: block !important;\n}\n\n.button {\n	display: hidden !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();
