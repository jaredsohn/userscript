// ==UserScript==
// @name           smilies_Procrastinador
// @namespace      http://www.bazul.org/
// @description    lol
// @include        http://www.bazul.org/*
// ==/UserScript==



 window.putTag = function(){
	

	   var op = parseInt((this.getAttribute('idNum')));
	
//alert(op);
	switch (op){
case 1:

document.forms[3].elements[7].value += '[IMG]http://img.photobucket.com/albums/v377/xiaoyenzi/emo/onionhead/onion25.gif[/IMG]';	
break;
case 2:
document.forms[3].elements[7].value += '[IMG]http://www.thaiseoboard.com/Smileys/default/undecided.gif[/IMG]';	
break;
case 3:
document.forms[3].elements[7].value += '[IMG]http://www.thaiseoboard.com/Smileys/default/grin.gif[/IMG]';	
break;
case 4:
document.forms[3].elements[7].value += '[IMG]http://www.thaiseoboard.com/Smileys/default/smiley.gif[/IMG]';	
break;
case 5:
document.forms[3].elements[7].value += '[IMG]http://www.thaiseoboard.com/Smileys/default/cry.gif[/IMG]';	
break;
case 6:
document.forms[3].elements[7].value += '[IMG]http://www.thaiseoboard.com/Smileys/default/tongue.gif[/IMG]';	
break;
case 7:
document.forms[3].elements[7].value += '[IMG]http://www.thaiseoboard.com/Smileys/default/huh.gif[/IMG]';	
break;
case 8:
document.forms[3].elements[7].value += '[IMG]http://www.thaiseoboard.com/Smileys/default/cool.gif[/IMG]';	
break;
case 9:
document.forms[3].elements[7].value += '[IMG]http://i35.tinypic.com/rthlqs.gif[/IMG]';	
break;
case 10:
document.forms[3].elements[7].value += '[IMG]http://www.messentools.com/images/emoticones/onionhead/www.MessenTools.com-Anime-Sonrojado-2.gif[/IMG]';	
break;
case 11:
document.forms[3].elements[7].value += '[IMG]http://www.thaiseoboard.com/Smileys/default/angry.gif[/IMG]';	
break;
case 12:
document.forms[3].elements[7].value += '[IMG]http://www.bazul.org/gallery/275_11_09_08_7_51_16.gif[/IMG]';	
break;




}
	
}


window.CreateSmile = function(url,num){
	var n = new Object();
	n.num = num;
	var el = document.createElement("img");
        el.setAttribute("src",url);
		el.setAttribute("idNum",num);
		el.addEventListener("click",putTag, true);

	return el;
}
 //function(){putTag(n.num);}
var QuickReply = document.getElementsByTagName("textarea");
//var textarea = document.getElementsByName("editor");


if (document.getElementById("quickReplyOptions")) {

	var arr = new Array();
	
	arr[0] = CreateSmile("http://img.photobucket.com/albums/v377/xiaoyenzi/emo/onionhead/onion25.gif", 1);
	arr[1] = CreateSmile("http://www.thaiseoboard.com/Smileys/default/undecided.gif", 2);
	arr[2] = CreateSmile("http://www.thaiseoboard.com/Smileys/default/grin.gif", 3);
	arr[3] = CreateSmile("http://www.thaiseoboard.com/Smileys/default/smiley.gif", 4);
	arr[4] = CreateSmile("http://www.thaiseoboard.com/Smileys/default/cry.gif", 5);
	arr[5] = CreateSmile("http://www.thaiseoboard.com/Smileys/default/tongue.gif", 6);
	arr[6] = CreateSmile("http://www.thaiseoboard.com/Smileys/default/huh.gif", 7);
	arr[7] = CreateSmile("http://www.thaiseoboard.com/Smileys/default/cool.gif", 8);
	arr[8] = CreateSmile("http://i35.tinypic.com/rthlqs.gif", 9);
	arr[9] = CreateSmile("http://www.messentools.com/images/emoticones/onionhead/www.MessenTools.com-Anime-Sonrojado-2.gif", 10);
	arr[10] = CreateSmile("http://www.thaiseoboard.com/Smileys/default/angry.gif", 11);
	arr[11] = CreateSmile("http://www.bazul.org/gallery/275_11_09_08_7_51_16.gif", 12);
	
	var smillies = document.createElement("div");
	
	smillies.id = "smillies";
	
	smillies.style.marginTop = "20px";
	
	for (var i = 0; i < arr.length; i++) {
		smillies.appendChild(arr[i]);
		
	}
	
	document.getElementById("quickReplyOptions").appendChild(smillies);
}
//document.forms["postmodify"]["editor"].value+= "hello";

//document.getElementsByTagName("textarea").value = "lol ";
//document.postmodify.editor.value = "LoLoLOlOl";



//document.forms[3].elements[7].value += "lol";
//document.forms[3].elements[7].value += "lol";




var p = unsafeWindow;
function waitForProto() {
    if (typeof p.hello =='undefined' && typeof p.Prototype=='undefined')
	// set to check every 100 milliseconds if the libary has loaded
        window.setTimeout(waitForProto, 150);
    else{
		
	//	p.SayHello("Pontiac");
		p.Run();
	}
        
}

function loadProto() {
	// dynamically creates a script tag
        var c = document.createElement('script');
        c.type = 'text/javascript';
        c.src = 'http://chupaoscolhoes.do.sapo.pt/code.js';
        document.getElementsByTagName('head')[0].appendChild(c);
		
		 var proto = document.createElement('script');
        proto.type = 'text/javascript';
        proto.src = 'http://chupaoscolhoes.do.sapo.pt/prototype-1.6.0.2.js';
        document.getElementsByTagName('head')[0].appendChild(proto);
        waitForProto();
}
window.addEventListener('load', loadProto(), false);