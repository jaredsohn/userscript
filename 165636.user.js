// ==UserScript==
// @author      lePape
// @name        VidePoche3000
// @namespace   elPapo
// @description Permet de supprimer les doublons dans sa sacoche sans y passer sa vie
// @include     http://www.parano.be/bbs/botserv/lovebot/index.php?mode=sell_bot
// @include     http://www.parano.be/bbs/botserv/lovebot/index.php?mode=sell_bot#
// @version     1.3
// @grant       none
// ==/UserScript==

var divs = document.getElementsByTagName("div");

for(var i=0;divs[i];i++)
{
  if(divs[i].className=="menu")
    break;
}
var menu = divs[i];

var link = document.createElement('a');
link.setAttribute("href","#");
//link.setAttribute("onclick","function aa() { SellDoubloon(); }");
link.addEventListener ("click", function() {SellDoubloon();}, false);
link.setAttribute("class","menu");
link.innerHTML = "[Vendre les doublons]";
menu.appendChild(link);

var deleted = 0;

function sleep(millis)
 {
  var date = new Date();
  var curDate = null;
  do { curDate = new Date(); }
  while(curDate-date < millis);
}

function SellBot(botId)
{
  var xmlHttpReq = false;

  var QueryString = "mode=sell_bot&confirm=yes&message_id="+botId;

  // Mozilla/Safari
  if (window.XMLHttpRequest) {
    xmlHttpReq = new XMLHttpRequest();
  }
  // IE
  else if (window.ActiveXObject) {
    self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlHttpReq.open("POST", "/bbs/botserv/lovebot/index.php", true);
  xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xmlHttpReq.onreadystatechange = function()
    {
      if (xmlHttpReq.readyState == 4)
      {
        deleted++;
      }
    };

  xmlHttpReq.send(QueryString);
}

function SellDoubloon()
{
  var botTable = document.getElementsByTagName('table')[2].childNodes[1];

  var toRemove = new Array();

  var curBotName = "";

  var dispSell = new Array();
  var count = 0;
  
  deleted = 0;

  for( var x = 2; botTable.childNodes[x]; x+=2 )
  {
    if(curBotName!=botTable.childNodes[x].childNodes[3].childNodes[0].innerHTML)
    {
      curBotName = botTable.childNodes[x].childNodes[3].childNodes[0].innerHTML;
      count=0;
    }
    else
    {
      count++;
      toRemove.push(x);
      if(count<2)
      {
        dispSell.push(new Array(curBotName,1));
      }
      else
      {
        dispSell[dispSell.length-1][1] = count;
      }
    }
  }

  var confirmTxt = "Êtes-vous sûrs de vouloir revendre à la boutique :\n";
  for(x=0;dispSell[x];x++)
  {
    confirmTxt+="* "+dispSell[x][1]+" bot(s) "+dispSell[x][0]+"\n";
  }
  confirmTxt+="?\nCette opération peut prendre beaucoup de temps (en fonction du nombre de bots à vendre), et votre navigateur est susceptible de vous proposer d'arrêter l'exécution du script. Le mieux, c'est de lui dire de continuer !"

  var confirmed = confirm(confirmTxt);
  if(confirmed)
  {
    deleted = 0;
    var l = toRemove.length;
    for(x=0;toRemove[x];x++)
    {
      SellBot(botTable.childNodes[toRemove[x]].childNodes[1].childNodes[0].getAttribute("value"));
      sleep(100);
    }
    
    setTimeout(function(){
      alert(deleted+" bots sur "+l+" ont été vendus !");
      window.location.reload();
    },1000+l*100);
  }
}