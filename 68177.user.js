// ==UserScript==
// @name           nCore preview
// @namespace      torrent
// @description    A Csatolt képek felirat helyett maga a kép jelenik meg
// @include        http://*ncore.*/letoltes.php*
// ==/UserScript==

function doEvent()
{
  var Id = parseInt(this.href.substring(19));
  var elementId = document.getElementById(Id);
  if (elementId.style.display == "none" && elementId.getAttribute("isOpened") == null)
  {
	  
    elementId.setAttribute("isOpened", "true");
    var kepek = elementId.getElementsByTagName("img");
for (var z = 0; kepek.length;z++) {
	if (kepek[z].getAttribute("src").match("ico_attach.gif")) {
		var ahref = kepek[z].parentNode;
		if (ahref.href.indexOf("kep.php?kep=")!=-1) {
			var kepsrc = ahref.href.replace("kep.php?kep=","ncorekep.php?kep=");
			var keptd = ahref.parentNode;
			

			
		 var keptr = keptd.parentNode;
		 var keptabletbody = keptr.parentNode;
		 var keptable = keptabletbody.parentNode;		  
		 var kepdiv = keptable.parentNode;
		 kepdiv.setAttribute("width","100%");
		 keptd.innerHTML = "<a target='_blank' href='"+kepsrc+"'><img id='kep"+z+"' src='"+kepsrc+"' style='border: none; max-width: 200px;'></a>";
		}else{
		var kepsrc = ahref.href;
		 var keptd = ahref.parentNode;
		 var keptr = keptd.parentNode;
		 var keptabletbody = keptr.parentNode;
		 var keptable = keptabletbody.parentNode;
		 keptable.setAttribute("width","100%");
		 keptable.innerHTML = "<tr><td style='text-align: center;width: 100%;'><a target='_blank' href='"+kepsrc+"'><img src='"+kepsrc+"' style='border: none; max-width: 300px;'></a></td></tr>";
		}
	}
}
    

  }
}



var Tags = document.getElementsByTagName("a");
for (var i=0; i<Tags.length; i++)
{

  if (Tags[i].addEventListener)
  {
    Tags[i].addEventListener("click",doEvent,false);
  }
  else if (Tags[i].attachEvent)
  {
    Tags[i].attachEvent("click",doEvent);
  }
}
