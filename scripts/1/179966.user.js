// ==UserScript==
// @name           OGame - Shoutbox alliance bsg
// @author         Esterly - ogame
// @include        http://*ogame.*/game/index.php?page=*
// ==/UserScript==

// Version 1.1
      var url = location.href;
      var server = url.match(/[a-z0-9]{4,10}\.ogame\.[a-z]{2,4}/gi);
	  var chat = "";


// chatbox_top  85901
 
	  
	  var sbival = GM_getValue("sbival_"+server);
	  
	  
	if( typeof(sbival) == 'undefined')
	{
	sbival = "85901";
	GM_setValue("sbival_"+server, "85901");
	}
	    

	sbi = "http://battlestar-galactica-75-c.shost.ca/phpBB3/shout_popup.php?s=0";


	



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

	
	
	
	
	
    var newFlag = document.createElement("reload2"); // On cr�e un nouvelle �l�ment div
    newFlag.setAttribute("style", "position:relative; right:-10px;  top: 750px" );
    var inner =
	"<img width='100px' height='100px' title='Affiche/Masque la ShoutBox' src='http://battlestar-galactica-75-c.shost.ca/phpBB3/images/shoutbox/panel/shout-open.png' id='reload2' />";
    
	newFlag.setAttribute('id', 'toto33');
	newFlag.innerHTML = inner;	
	box = document.getElementById("clearAdvice");
	box.appendChild(newFlag); 

  
		
    document.getElementById("reload2").addEventListener("click", test, true);
	document.getElementById("reload3").addEventListener("click", test2, true);


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
		chat =  '<iframe src='+sbi+' width="850" height="600" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:relative;display:block; right: 750px; top: 380px; width: 0px; height: 0px; allowtransparency="true";');
		}
		else if(screen.width == 1024)
		{
		 chat =  '<iframe src='+sbi+' width="850" height="600" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:relative;display:block; right: 750px; top: 380px; width: 0px; height: 0px; allowtransparency="true";');
		}
		else
		{
		 chat =  '<iframe src='+sbi+' width="850" height="600" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:relative; right: 750px; top: 380px; width: 0px; height: 0px; allowtransparency="true";');
		}
 }
 else
 {
  
  if(screen.width >= 1600)
		{
		chat =  '<iframe src='+sbi+' width="300" height="650" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:relative;display:block; left:0px; top: 0px; width: 0px; height: 0px; allowtransparency="true";');
		}
	else if(screen.width == 1024)
		{
		chat =  '<iframe src='+sbi+' width="145" height="590" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:relative; left:0px; top: 0px; width: 0px; height: 0px; allowtransparency="true";');
		} 
		else
		{
		chat =  '<iframe src='+sbi+' width="145" height="650" frameborder="0" allowtransparency="true"></iframe>';
		p.setAttribute('style', 'position:relative; left:0px; top:100px; width: 0px; height: 0px; allowtransparency="true";');
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

	
    sbival = prompt('Changer votre numéro de shoutbox ?',sbival);
	GM_setValue("sbival_"+server, sbival);
    sbi = "http://www.i-tchat.com/shoutbox/shoutbox.php?idShoutbox="+sbival;
	
    var element22 = document.getElementById("toto");  
	element22.parentNode.removeChild(element22);
    AffichageChat()	



    var element33 = document.getElementById("toto33");  //Pour permuter l'image
	element33.parentNode.removeChild(element33);

	
	newFlag = document.createElement("reload2"); // On cr�e un nouvelle �l�ment div
    newFlag.setAttribute("style", "position:relative; right:-85px;  top:-60px" );
    var inner =
	"<img width='25px' height='25px' title='Changer de Channel de Shoutbox' src='http://www.critiq.fr/dl/image/chan.png' id='reload3' />"+
	"<img width='25px' height='25px' title='Affiche/Masque la ShoutBox Lmdb' src='http://www.critiq.fr/dl/image/onoff.png' id='reload2' />"+
	"<img width='25px' height='25px' title='Intervertit de droite à gauche la Shoutbox Lmdb' src='http://www.critiq.fr/dl/image/switch.png' id='switch' /><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	inner += sbival;

	newFlag.setAttribute('id', 'toto33');
	newFlag.innerHTML = inner;	
	box = document.getElementById("clearAdvice");
	box.appendChild(newFlag); 

	document.getElementById("reload2").addEventListener("click", test, true);
	document.getElementById("reload3").addEventListener("click", switchchan, true);
	document.getElementById("switch").addEventListener("click", switchaffichage, true);
 
	 
  };

