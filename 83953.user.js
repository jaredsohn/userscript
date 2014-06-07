// ==UserScript==
// @name           OGame - Chat Alliance D.V.Y.
// @author         ACS - ogame.fr - io
// @include        http://*ogame.*/game/index.php?page=*
// ==/UserScript==

// Version 1.1
      var url = location.href;
      var server = url.match(/[a-z0-9]{4,10}\.ogame\.[a-z]{2,4}/gi);
	  var chat = "";


// chatbox_top  87594
 
	  
	  var sbival = GM_getValue("sbival_"+server);
	  
	  
	if( typeof(sbival) == 'undefined')
	{
	sbival = "87594";
	GM_setValue("sbival_"+server, "87594");
	}
	    

	sbi = "http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox="+sbival;


	



	  var pos = GM_getValue("pos_"+server);
	  var swi = GM_getValue("swi_"+server);

	  
		if( typeof(pos) == 'undefined')
	{
		pos = "on";
		GM_setValue("pos_"+server, "on");
	}

	
		if( typeof(swi) == 'undefined')
	{
		swi = "1";
		GM_setValue("swi_"+server, "1");
	}

	
	
	
	
	
    var newFlag = document.createElement("reload2"); // On crï¿½e un nouvelle ï¿½lï¿½ment div
    newFlag.setAttribute("style", "position:relative; right:-85px;  top:-60px" );
    var inner =
	"<img width='25px' height='25px' title='Changer de Channel de Shoutbox' src='http://www.critiq.fr/dl/image/chan.png' id='reload3' />"+
	"<img width='25px' height='25px' title='Affiche/Masque la ShoutBox Lmdb' src='http://www.critiq.fr/dl/image/onoff.png' id='reload2' />"+
	"<img width='25px' height='25px' title='Intervertit de droite Ã  gauche la Shoutbox Lmdb' src='http://www.critiq.fr/dl/image/switch.png' id='switch' /><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	inner += sbival;
    
	newFlag.setAttribute('id', 'toto33');
	newFlag.innerHTML = inner;	
	box = document.getElementById("clearAdvice");
	box.appendChild(newFlag); 

  
		
    document.getElementById("reload2").addEventListener("click", test, true);
	document.getElementById("reload3").addEventListener("click", switchchan, true);
	document.getElementById("switch").addEventListener("click", switchaffichage, true);


	if (pos == "on")
	{
	AffichageChat()
	}


	
	
	
function AffichageChat() {
	
	var element = document.getElementById('rechts');  //Pour permuter l'image
    var p = document.createElement("div");
  
   swi = GM_getValue("swi_"+server);
   chat = "";
   
 if (swi == "1")
 {
  
  if(screen.width >= 1600)
		{
		chat =  '<iframe src='+sbi+' width="300" height="650" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:absolute; right:-302px; top:100px; width: 305px; height: 651px; allowtransparency="true";');
		}
		else if(screen.width == 1024)
		{
		 chat =  '<iframe src='+sbi+' width="140" height="380" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:relative;display:block; right:850px; top:120px; width: 136px; height: 500px; allowtransparency="true";');
		}
		else
		{
		 chat =  '<iframe src='+sbi+' width="130" height="650" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:absolute; right:-133px; top:100px; width: 136px; height: 651px; allowtransparency="true";');
		}
 }
 else
 {
  
  if(screen.width >= 1600)
		{
		chat =  '<iframe src='+sbi+' width="300" height="650" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:absolute; left:-302px; top:100px; width: 305px; height: 651px; allowtransparency="true";');
		}
	else if(screen.width == 1024)
		{
		chat =  '<iframe src='+sbi+' width="145" height="590" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:relative; left:0px; top:50px; width: 141px; height: 651px; allowtransparency="true";');
		} 
		else
		{
		chat =  '<iframe src='+sbi+' width="135" height="650" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:absolute; left:-133px; top:100px; width: 141px; height: 651px; allowtransparency="true";');
		} 
 }
 
  p.innerHTML = chat;
  p.setAttribute('id', 'toto');
  element.appendChild(p);

};





function test() {

  var element22 = document.getElementById("toto");  //Pour permuter l'image
	
	if (pos == "on")
	{
	pos = "off";
	GM_setValue("pos_"+server, "off");
	element22.parentNode.removeChild(element22);
   	}
	else
	{
	pos = "on";
	GM_setValue("pos_"+server, "on");
	AffichageChat()
	}

  };


  
  function switchaffichage() {

	swi = GM_getValue("swi_"+server);

	var element22 = document.getElementById("toto");  //Pour permuter l'image
	element22.parentNode.removeChild(element22);

	
	if (swi == "1")
	{
	swi = "2";
	GM_setValue("swi_"+server, "2");
   	}
	else
	{
	swi = "1";
	GM_setValue("swi_"+server, "1");
	}
	AffichageChat()

  };



  function switchchan() {

	
    sbival = prompt('Changer votre numÃ©ro de shoutbox ?',sbival);
	GM_setValue("sbival_"+server, sbival);
    sbi = "http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox="+sbival;
	
    var element22 = document.getElementById("toto");  
	element22.parentNode.removeChild(element22);
    AffichageChat()	



    var element33 = document.getElementById("toto33");  //Pour permuter l'image
	element33.parentNode.removeChild(element33);

	
	newFlag = document.createElement("reload2"); // On crï¿½e un nouvelle ï¿½lï¿½ment div
    newFlag.setAttribute("style", "position:relative; right:-85px;  top:-60px" );
    var inner =
	"<img width='25px' height='25px' title='Changer de Channel de Shoutbox' src='http://www.critiq.fr/dl/image/chan.png' id='reload3' />"+
	"<img width='25px' height='25px' title='Affiche/Masque la ShoutBox Lmdb' src='http://www.critiq.fr/dl/image/onoff.png' id='reload2' />"+
	"<img width='25px' height='25px' title='Intervertit de droite Ã  gauche la Shoutbox Lmdb' src='http://www.critiq.fr/dl/image/switch.png' id='switch' /><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	inner += sbival;

	newFlag.setAttribute('id', 'toto33');
	newFlag.innerHTML = inner;	
	box = document.getElementById("clearAdvice");
	box.appendChild(newFlag); 

	document.getElementById("reload2").addEventListener("click", test, true);
	document.getElementById("reload3").addEventListener("click", switchchan, true);
	document.getElementById("switch").addEventListener("click", switchaffichage, true);
 
	 
  };


