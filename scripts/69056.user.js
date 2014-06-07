// ==UserScript==
// @name           anti_kick
// @namespace      Anti_Green
// @include        http://patator.frbb.net/chatbox/chatbox.forum*
// ==/UserScript==

function fini(){
	document.title = oldtittle;
	alert('Finished');
}

function msgpost(){
        msgb.value=msg;
	but.click();
}
var i=0;
var msg="";
var msgb=document.getElementById('message');
var but=document.getElementById('submit_button');
ok=1;

msg = prompt("Message a poster ?");
if(msg != null){
ii = prompt("Nombre de posts ?");
if(ii != null){
	oldtittle = document.title;
	document.title='[Flood] '+oldtittle;
		
	}
	}
	}
	
			for(i=0; i<ii; i++)
			{msgpost();}
			document.title = oldtittle;
		
}
}