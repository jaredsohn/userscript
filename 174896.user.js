// ==UserScript==
// @name            Penner Punkte Checker
// @namespace       By Bluesamy (http://bluesamy.npage.de/)
// @description     Zeigt den Punktestand eines oder mehrer Penner an.
// @include         http://*pennergame.de*
// @include         http://*berlin.pennergame.de*
// @include         http://*reloaded.pennergame.de*
// @exclude         http://*pennergame.de/login*
// @exclude         http://*pennergame.de/logout*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var apiurl = 'http://berlin.pennergame.de/dev/api/';
  var mediaurl = 'http://mediaberlin.pennergame.de/img/';
  var pgurl = 'http://berlin.pennergame.de/';
  var sigurl = 'http://imgberlin.pennergame.de/cache/bl_DE/signaturen/';
}
else if(document.location.href.indexOf('reloaded.pennergame.de/')>=0) {
  var apiurl = 'http://reloaded.pennergame.de/dev/api/';
  var mediaurl = 'http://mediareloaded.pennergame.de/img/';
  var pgurl = 'http://reloaded.pennergame.de/';
  var sigurl = 'http://imgreloaded.pennergame.de/cache/rl_DE/signaturen/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var apiurl = 'http://www.pennergame.de/dev/api/';
  var mediaurl = 'http://media.pennergame.de/img/';
  var pgurl = 'http://www.pennergame.de/';
  var sigurl = 'http://img.pennergame.de/cache/de_DE/signaturen/';
};

var content = document.getElementById('provocation_area');

  var mytable = document.createElement('tieritemA');
  mytable.innerHTML = "<span style='font-size:medium'><b>Penner Punkte Checker</b></span>";
  mytable.bgColor = "black";
  content.appendChild(mytable);




var neu = document.getElementsByTagName("body")[0];
SubmitButtonHTML = '<input type="button" name="allesswitsch" id="allesswitsch" value="einstellungen" />';
var newp = document.createElement("tr");
newp.innerHTML = '<br><b><font color="white">Optionen Penner</font></b><div name="fenster"</div>';			
var newli = document.createElement("li");
newli.appendChild(newp);
newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
neu.appendChild(newli);

	


document.getElementsByName('allesswitsch')[0].addEventListener('click', function weinkaufen () {
	document.getElementsByName("fenster")[0].innerHTML = ''
	+'<table width="100%" style="border-color:#000000; border:5px; border-style:groove; color:#ffffff " cellspacing="0"><tr>'
	+'<th colspan="4" style="border-bottom: 5px groove;">Settingbereich Penner Punkte Checker by Bluesamy</th></tr>'
	+'<tr><td colspan="2" style="border-bottom: 5px groove;">'
	+'<h2>Uncle Sam is watching </h2>'
	+'Pennernamen1 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'Pennernamen2 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'Pennernamen3 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'Pennernamen4 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'Pennernamen5 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'Pennernamen6 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'Pennernamen7 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'Pennernamen8 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'Pennernamen9 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'Pennernamen10 : <input type="text" name="pennernamen" id="pennernamen" value=""><br>'
	+'<input type="button" name="datenspeichern" id="datenspeichern" value="Alle eingaben Speichern und schliessen" /><br>'
	+'<br><br><br>Penner unter spezieller Beobachtung'
	+'</td></tr></table>';

	for(i=0;i<=9;i++){
		document.getElementsByName("pennernamen")[i].value = GM_getValue("namen"+i);
	
	}
	document.getElementsByName('datenspeichern')[0].addEventListener('click', function save_spenden () {
		for(i=0;i<=9;i++){
			GM_setValue("namen"+i, document.getElementsByName("pennernamen")[i].value);
		
		}
		alert("Uncle Sam says thank you")
		window.location.reload();
},false);
},false);



var bot1 = document.getElementById("provocation_area");
var newp = document.createElement("li");
bot1.appendChild(newp);
newp.innerHTML += ''
	+'<center><select name=\"pennername\">'
	+'<option value=\"0\">'+GM_getValue("namen0")+'</option>'
	+'<option value=\"1\">'+GM_getValue("namen1")+'</option>'
	+'<option value=\"2\">'+GM_getValue("namen2")+'</option>'
	+'<option value=\"3\">'+GM_getValue("namen3")+'</option>'
	+'<option value=\"4\">'+GM_getValue("namen4")+'</option>'
	+'<option value=\"5\">'+GM_getValue("namen5")+'</option>'
	+'<option value=\"6\">'+GM_getValue("namen6")+'</option>'
	+'<option value=\"7\">'+GM_getValue("namen7")+'</option>'
	+'<option value=\"8\">'+GM_getValue("namen8")+'</option>'
	+'<option value=\"9\">'+GM_getValue("namen9")+'</option></select>'
	+'<input type="button" id="go"  name="go" value="Penner suchen" ></center>' ;

	document.getElementsByName('go')[0].addEventListener('click', function weinkaufen () {
	was = document.getElementsByName('pennername')[0].value;

	
function start(){



var name = GM_getValue("namen"+was)

    GM_xmlhttpRequest({
      method: 'GET',
      url: ''+apiurl+'user.getname.xml?name=' + name,
      onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

        var name = dom.getElementsByTagName('name')[0].textContent;
        var id = dom.getElementsByTagName('id')[0].textContent;
        var punkte = dom.getElementsByTagName('points')[0].textContent;
        var platz = dom.getElementsByTagName('position')[0].textContent;

       


        GM_xmlhttpRequest({
  		    method: 'GET',
	  	    url: ''+pgurl+'/profil/id:'+id+'/',
		      onload: function(responseDetails) {
			      var profil = responseDetails.responseText;
			
			      var stadtteil3 = profil.split('Stadtteil')[1];
			      var stadtteil2 = stadtteil3.split('">')[1];
		        var stadtteil = stadtteil2.split('<')[0];
  			var suche = profil.search("Ist gerade Online");
	  		if (suche != -1) {
		  	  online = "<img src='http://static.pennergame.de/img/pv4/icons/on.png'></img>";
			      }
			      else {
			  online = "<img src='http://i48.tinypic.com/n33d4w.png'></img>";
			      };
			var suche = profil.search("befindet sich im Urlaub!");
           if (suche != -1)
           suche = profil.indexOf("messages/write/?to=" + id, suche)!=-1?-1:1;
           
            if (suche != -1) {
                var urlaub ="<img src='http://static.pennergame.de/img/pv4/icons/on.png'></img>";
                
            }
            else {
                var urlaub ="<img src='http://i48.tinypic.com/n33d4w.png'></img>";
                
            };


var content = document.getElementById('provocation_area');


var mytable = document.createElement('table');
mytable.innerHTML = "<span style='font-size:medium'>"
+"<font style=\"color:green; font-size:100%;\"><b><b>Name:<font style=\"color:red; font-size:100%;\"><b>  "+name+"  "
+"<font style=\"color:green; font-size:100%;\"><b><b>Punkte:<font style=\"color:red; font-size:100%;\"><b>  "+punkte+"  "
+"<font style=\"color:green; font-size:100%;\"><b>Ist Online: "+online+"</b></span> "
+"<font style=\"color:green; font-size:130%;\"><b>Ist im Urlaub: "+urlaub+"</b></span>";





  mytable.bgColor = "black";
  content.appendChild(mytable);


			    }
			  });

}});
}

window.setTimeout(start, 1000);
 }
 ,false);






 
 


  












