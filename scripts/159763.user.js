// ==UserScript==
// @name        Entbannantrag Info
// @namespace   PaveLow45
// @include     *rpg-city.de*page=Thread*
// @include     *cp.rpg-city.de*action=*
// @version     1
// ==/UserScript==

var names = [
  ["Louis_Parker", "YINX"],
  ["Julian_Merker", "Julian Merker"],
  ["Denisi", "Dennis"],
  ["Jayden_Parker", "Jay"],
  ["TuPac", "TwoPac"],
  ["Server", "M4x"]
];

var id;

if(document.URL.search(/.*rpg-city.de.*page=Thread.*/) != -1)
{
	var forum = document.getElementById("main").getElementsByTagName("ul")[0].getElementsByTagName("span")[2].innerHTML;
	if(forum == "Bann Forum")
	{
	  id = unsafeWindow.threadID;
	  var post = document.getElementsByClassName("messageBody")[0];
	  var li = document.createElement("li");
	  li.innerHTML = "<a><img src='http://www.rpg-city.de/wcf/icon/nextS.png'> <span>Info posten</span></a>";
	  li.addEventListener("click", postInfo);
	  post.getElementsByTagName("div")[0].id.search(/postText(\d+)/);
	  document.getElementById("postButtons"+RegExp.$1).appendChild(li);
	}
}
else if(document.URL.search(/.*cp.rpg-city.de.*action=getInfo&id=(.*)&name=(.*)/) != -1)
{
  var id = RegExp.$1;
  var name = RegExp.$2;
  document.getElementsByTagName("a")[2].href.search(/ticket=(.*)/);
  var ticket = RegExp.$1;
  
  var request = new XMLHttpRequest();
  request.open("GET", "http://cp.rpg-city.de?funktion=_user_akte&user="+name+"&ticket="+ticket, false);
  request.send(null);
  
  if(request.responseText.search(/Du kannst dich hier mit deinen Ingame Account Daten einloggen/) != -1)
  {
	alert("Du bist nicht eingeloggt!");
	location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id;
  }
  else
  {
	  var akte = request.responseText.replace(/<[^>]*>/g, "").split("\r\n");
	  var banText = -1;
	  var admin = "";
	  for(var i=akte.length-1;i>=0;i--)
	  {
		if(akte[i].search(/^\[Ban\]/) != -1)
		{
		  akte[i-1].search(/\| (.*) >>$/);
		  admin = RegExp.$1;
		  if(akte[i].search(/i\. ?A\.? ?([^ ]*)$/i) != -1) admin = RegExp.$1;
		  banText = akte[i-1]+" "+akte[i];
		  break;
		}
		else if(akte[i].search(/^\[Timeban\]/) != -1)
		{
		  akte[i-1].search(/\| (.*) >>$/);
		  admin = RegExp.$1;
		  if(akte[i].search(/i\. ?A\.? ?([^ ]*)$/i) != -1) admin = RegExp.$1;
		  banText = akte[i-1]+" "+akte[i];
		  break;
		}
	  }
	  
	  for(var i=0;i<names.length;i++)
	  {
		if(names[i][0] == admin) admin = names[i][1];
	  }
	  
	  if(banText == -1)
	  {
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "http://rpg-city.de/index.php?form=PostQuickAdd&threadID="+id,
		  data: "send=Absenden&text=Hallo "+name+",\nihr Benutzeraccount ist zurzeit nicht gesperrt.\n\nFalls bei Ihnen steht [b]'You are banned from this Server'[/b], dann haben Sie eine gebannte IP erwischt.\nSchauen Sie sich dazu diesen [b][url=http://rpg-city.de/index.php?page=Thread%26amp;threadID=8857]Thread[/url][/b] an und probieren Sie die Möglichkeiten. Falls dies immer noch nicht geholfen hat, wenden Sie sich bitte wieder und ich werde ihre IP zum Entbann eintragen.\n\nViele Grüße,\nPaveLow45",
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id;}
		});
		location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id;
	  }
	  else
	  {
		
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "http://rpg-city.de/index.php?form=PostQuickAdd&threadID="+id,
		  data: "send=Absenden&text=[quote]"+banText+"[/quote]\n@"+admin+": wird sich melden\n\nViele Grüße,\nPaveLow45",
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {location.href = "http://rpg-city.de/index.php?page=Thread&threadID="+id;}
		});
	  }
  }
}

function postInfo()
{
  var msg = post.innerHTML.replace(/<[^>]*>/g, "").split("\n");
  var name = -1;

  for(var i=0;i<msg.length;i++)
  {
    if(msg[i].search(/Name im Spiel: ?(.*)/) != -1)
    {
      name = RegExp.$1;
    }
  }
  if(name == -1)
  {
    alert("Der Name konnte nicht ausgelesen werden");
    return;
  }
  location.href = "http://cp.rpg-city.de/?action=getInfo&id="+id+"&name="+name;
}