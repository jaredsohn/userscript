// ==UserScript==
// @name           GLB PM's In Toolbar II
// @namespace      KMHI - Greasemonkey (props to Branden Guess)
// @description    This places the number of PM's you have in the toolbar next to Inbox. Also puts a div popup on the screen to indicate you have messages.
// @include        http://goallineblitz.com/game/*
// ==/UserScript==

// <td colspan="2" class="inbox_messages"><a href="/game/inbox.pl">Inbox</a> (1 new)</td>
// <td colspan="2" class="inbox_empty"><a href="/game/inbox.pl">Inbox</a> (0 new)</td>

var timeout = 0;

window.setTimeout( function() {
   // create the popup
   var popUpMail = document.createElement('div');
   popUpMail.setAttribute("id","popUpMail");
   popUpMail.setAttribute("style","display:none;");
   popUpMail.addEventListener('click', toggle, false);
   document.body.insertBefore(popUpMail, document.body.firstChild);

   var css = '#popUpMail {position:absolute;left:50%;margin-left:-41px;top:50%;padding-top:30px;' +
      'border:1px solid #000000;background-color:red;color:white;text-align:center;width:80px;height:60px;z-index:9002;}';
      
   addGlobalStyle(css);

   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://goallineblitz.com/game/home.pl',
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(inbox) {
         var re = /<td colspan="2" class="inbox_messages"><a href="\/game\/inbox.pl">Inbox<\/a>(.+)<\/td>/;
         var inboxMessages = inbox.responseText.match(re);
         console.log("inboxMessages = " + inboxMessages);
         if(inboxMessages != null && inboxMessages.length == 2){
            var messages = inboxMessages[1];
            showPopUp(messages);
         }       
      }
   });
},timeout);

function showPopUp(messages){
   // show the messages in the toolbar
   var toolbarItems=getElementsByClassName('toolbar_item',document);
   toolbarItems[4].innerHTML = toolbarItems[4].innerHTML + messages
   
   var popUpMail = document.getElementById("popUpMail");
   popUpMail.innerHTML = messages + ' message(s)';
   // toggle the popup
   toggle();   
}

function toggle() {   
	var popUpMail = document.getElementById("popUpMail");
	if ( popUpMail.style.display == 'none' ){
      popUpMail.style.display = 'block';
   }else{
      popUpMail.innerHTML = '&nbsp;';
      popUpMail.style.display = 'none';
   }
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function getElementsByClassName(classname, par){
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');    	
	var els = par.getElementsByTagName("*"); 
	for(var i=0,j=els.length; i<j; i++){       
		if(re.test(els[i].className)){	
			a.push(els[i]);
		}
	}
	return a;
};