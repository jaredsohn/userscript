// ==UserScript==
// @name        LOTS Dump
// @namespace   http://cconoly.com/lots
// @description Gathers riad links from kong chat for http://cconoly.com/lots/ for Legacy of a Thousand Suns
// @include     http://www.kongregate.com/games/5thPlanetGames/legacy-of-a-thousand-suns*
// @version     1.0.4
// @author      cconoly
// ==/UserScript==


function main()
{
console.log('{Lots Gatherer}-Starting');
var currentroom='';  
var isneeded=1;
var dutimeout;
var currentversion=104;

    //ajax and return func for is needed
  var xmlhttpi;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttpi=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttpi=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttpi.onreadystatechange=function()
  {
  if (xmlhttpi.readyState==4 && xmlhttpi.status==200)
    {
    isneeded = xmlhttpi.responseText;
    if (isneeded==0){ dutimeout = setTimeout('checkifneeded()',480000);} else {
    clearTimeout(dutimeout);}
    console.log('{Lots Gatherer}-Is Needed: '+isneeded);
    }
  }
  
  
checkifneeded=function(){
  xmlhttpi.open("GET","http://cconoly.com/lots/isneeded.php?room="+currentroom[0],true);
  xmlhttpi.send(); 
};
  
  
    //ajax and return func for version check
  var xmlhttpv;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttpv=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttpv=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttpv.onreadystatechange=function()
  {
  if (xmlhttpv.readyState==4 && xmlhttpv.status==200)
    {
    if (xmlhttpv.responseText!=currentversion){
    console.log('{Lots Gatherer}-Please upgrade to newest version');
    function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}

var fragment = create('<div style="color:blue;background-color:white;display:block;width:100%;height:22px;font-size:14px;top:0px;text-align:center;">Please update your LoTS Raid Link Gatherer Userscript at <a href="http://userscripts.org/scripts/show/153895" target="_blank">http://userscripts.org/scripts/show/153895</a>. It may not work until you do!</div>');
document.body.insertBefore(fragment, document.body.childNodes[0]);
    
    }
    }
  }
  xmlhttpv.open("GET","http://cconoly.com/lots/versioncheck.php",true);
  xmlhttpv.send();
   
  //ajax for send raid
  var xmlhttp;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }


  
  ChatWindow.prototype.LOTSjoinRoom = ChatWindow.prototype.joinRoom;
  ChatWindow.prototype.joinRoom = function(a)
  {
  currentroom=a.xmpp_name+'';
  if(currentroom.match(/legacy\-of\-a\-thousand\-suns/)){
  currentroom=currentroom.match(/(\d+)(?!.*\d)/);
  checkifneeded();
  }
  this.LOTSjoinRoom(a);
  };

  
	ChatDialogue.prototype.LOTSDumpchat = ChatDialogue.prototype.displayUnsanitizedMessage;
	ChatDialogue.prototype.displayUnsanitizedMessage = function(u, m, a, o)
	{
	var origmessage=m;
	if (!o) { o = {};o['private']=false; o['whisper']=false; }	
	if (!o['private'] && !o['whisper']){
	m=m.replace(/[\r\n]/g,"");
	var message=/^((?:(?!<a[ >]).)*)<a.*? href="((?:(?:https?:\/\/)?(?:www\.)?kongregate\.com)?\/games\/5thPlanetGames\/legacy-of-a-thousand-suns(\?[^"]+))".*?<\/a>((?:(?!<\/?a[ >]).)*(?:<a.*? class="reply_link"[> ].*)?)$/i.exec(m);
	if(message){
	if (isneeded>0){
	setTimeout(function(){xmlhttp.open("GET","http://cconoly.com/lots/addraid.php?version="+currentversion+"&room="+currentroom[0]+"&raidlink="+escape(message[3],true));
  xmlhttp.send();},Math.floor((Math.random()*3000)+1) );
  }
	 }
	 }
	this.LOTSDumpchat(u, origmessage, a, o);
	
	};
}

if (/https?:\/\/www\.kongregate\.com\/games\/5thPlanetGames\/legacy-of-a-thousand-suns.*/i.test(window.location.href))
{
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ main +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}