// ==UserScript==
// @name           Bandenprofil v2.9[fixed by basti1012] fuer pennergame 4.0
// @namespace      11235813[Bande:DABEI]
// @description    Zeigt auch Promille an. Punktemarkierung: Gr?n= Kannste angreifen. Rot=kann dich angreifen, du ihn aber nicht.
// @include        *pennergame.de/profil/bande:*
// @exclude *belin.pennergame*
// ==/UserScript==


GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('<a href="/profil/id:')[2];
			var userid = text1.split('/">')[0];

			var userp = content.split('src="http://www.pennergame.de/headline/')[2];
			var userpoints = userp.split('/?size=34"')[0];

      GM_setValue("userid",userid);
      var angriffmax = Math.floor(userpoints*1.5);
      var angriffmin = Math.floor(userpoints*0.8);
      
      GM_setValue("angriffmax",angriffmax);
      GM_setValue("angriffmin",angriffmin);
      GM_setValue("userpoints",userpoints);

}});

var siglink = 'http://inodes.pennergame.de/de_DE/signaturen/';
var table = document.getElementsByTagName("table")[2];
var tr = table.getElementsByTagName("tr");
    


for (var x = 0; x <= tr.length; x++) {
  var text1 = tr[x].getElementsByTagName("td")[1].innerHTML.split('/profil/id:')[1];
  tr[x].getElementsByTagName("td")[1].style.width = '100px';
  tr[x].style.valign = "middle";
    var id = text1.split('/"')[0];

  var points =tr[x].getElementsByTagName('td')[2].textContent;
  var maxatt = Math.floor(points*1.5);
  var minatt = Math.floor(points*0.8);
  if (maxatt>=GM_getValue("userpoints") && minatt<=GM_getValue("userpoints")) {
    tr[x].getElementsByTagName('td')[2].style.color = "#DF3918"; 
    }
    if (GM_getValue("angriffmax")>points && GM_getValue("angriffmin") < points) {
    tr[x].getElementsByTagName('td')[2].style.color = "#99CC00"; 
    }

  Geldladen(id,x);
}




function Geldladen(id,x) {
//alert(id);
  GM_xmlhttpRequest({
          method: 'GET',
          url: 'http://www.pennergame.de/dev/api/user.' + id + '.xml',
          onload: function(responseDetails) {
          var parser = new DOMParser();
          var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      try {
           var cash = dom.getElementsByTagName('cash')[0].textContent;
      } catch(err) {
        var cash = -1;
      }
      var name = dom.getElementsByTagName('name')[0].textContent;
      var reg = dom.getElementsByTagName('reg_since')[0].textContent;
      var attref = 'http://www.pennergame.de/fight/?to='+name;
      var newtd = document.createElement('td');
      var newtd1 =document.createElement('td');
      
      newtd1.style.width = "20px";
      var newtd5 = document.createElement('td');

      GM_xmlhttpRequest({
    method: 'GET',
     url: 'http://www.pennergame.de/profil/id:'+id+'/',
        onload: function(responseDetails,id) {
          var content = responseDetails.responseText;

var suche = content.search("Ist gerade Online");
		try{
			if (suche != -1) {
				var online2a = "<img src='http://media.pennergame.de/img/on.gif'></img>";
				}
			else {
				var online2a = "<img src='http://media.pennergame.de/img/off.gif'></img>";
			};
		}catch(e){
			var online2a = '<font style=\"color:black; font-size:100%;\"><b>geloescht</b></font>';
		}


          newtd1.innerHTML = online2a;






      try{
      var location1 = content.split('Stadtteil</strong>')[1];
      var location2 = location1.split('bgcolor="#232323">')[1];
      var location3 = location2.split('</td>')[0];
      }catch(e){
      var location3 ='<font style=\"color:green; font-size:100%;\">Premium</font>';   
}      
         newtd6 = document.createElement('td');
      newtd6.innerHTML='<div align="middle">'+location3+'';   
      tr[x].insertBefore(newtd6, tr[x].getElementsByTagName('td')[4]);
      
      
	try{
    var hausi5 = content.split('margin-top:12px;">')[1];
    var hausi3 = hausi5.split('</div>')[0];

    var hausi4 = hausi3.split('<img src="')[1];
    var hausi2 = hausi4.split('"')[0];

	if(hausi2 == 'http://media.pennergame.de/img/tiere/94826.jpg'){var petname = 'Elefant';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/25834.jpg'){var petname = 'Nashorn';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/14896.jpg'){var petname = 'Eisb&auml;r';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/12536.jpg'){var petname = '&Auml;ffchen';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/43703.jpg'){var petname = 'Tiger';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73953.jpg'){var petname = 'Krokodil';}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/98962.jpg'){var petname  = "Giraffe";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/64220.jpg'){var petname  = "Nilpferd";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/90385.jpg'){var petname  = "Pferd";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/32563.jpg'){var petname  = "Chihuahua";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/62456.jpg'){var petname  = "Cockerspaniel";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/15240.jpg'){var petname  = "Pitbull";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/09051.jpg'){var petname  = "Sch&auml;ferhund";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/48263.jpg'){var petname  = "Adler";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/12758.jpg'){var petname  = "Pudel";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/62474.jpg'){var petname  = "Hausziege";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/61402.jpg'){var petname  = "Schlange";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/89386.jpg'){var petname  = "Falke";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73735.jpg'){var petname  = "Katze";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/21903.jpg'){var petname  = "Frettchen";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/77310.jpg'){var petname  = "Hase";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73684.jpg'){var petname  = "Ratte";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/31451.jpg'){var petname  = "Taube";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/52483.jpg'){var petname  = "Wellensittich";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/73308.jpg'){var petname  = "Hamster";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/11836.jpg'){var petname  = "Maus";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/68930.jpg'){var petname  = "Goldfisch";}
      else if(hausi2 == 'http://media.pennergame.de/img/tiere/00001.jpg'){var petname  = "Kakerlake";}


var suche = content.search("selbsterstelltes Haustier");
if (suche != -1) {




    var hausi55 = content.split('selbsterstelltes Haustier')[2];
    var hausi33 = hausi55.split('Haustier zu erstellen')[0];

    var hausi555 = hausi33.split('<b>')[1];
    var hausi33 = hausi555.split('</b>')[0];


var petname = '<a class="tooltip" href="/premium/"><font style=\"color:green; font-size:100%;\">[Premium]</font><span><b>selbsterstelltes Haustier</b><br>Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <font style=\"color:green; font-size:100%;\"><b>'+hausi33+'</b></font><br><br>Klicke hier um auch Dir ein eigenes Haustier zu erstellen</span></a>';
}
}catch(e){
var petname = '--';}


newtd5.innerHTML = petname;
      

    
      }
      });          
      
      
      var newtd2 = document.createElement('td');
      newtd3 = document.createElement('td');
      newtd3.innerHTML='<div align="middle">';
      newtd3.innerHTML +='<a href="'+attref+'">&oplus;</a></div>';
      newtd2.innerHTML= '<div align="middle">'+reg+'</div>';
    
      
      var newtd4 = document.createElement('td');
      var pskript = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + siglink + id + '.jpg"></div></div>'
      if (cash == -1) {
        var pskript = '<div align = "right" >---</div>';
      }
      newtd4.innerHTML = pskript;
      if (cash >= 15000*100){
        newtd.style.color = "#efab22";
        newtd.style.fontWeight = "bold";
      }
      if (cash >= 30000*100){
        newtd.style.color = "#25ab22";
        newtd.style.fontWeight = "bold";
      }
      if (cash >= 50000*100){
        newtd.style.color = "#ef3422";
        newtd.style.fontWeight = "bold";
      }
      if(cash.length >= 9)
      {
      newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) +""+"</div>";
      }
      else if (cash.length>=6)
      {
      newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + ""+ "</div>";
      }
      else if(cash.length>2)
      {
      newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + "</div>";
      }
      else if(cash.length==2)
      {
      newtd.innerHTML = '<div align="right">&euro;0,' + cash + ""+ "</div>";
      }
      else if(cash== -1)
      {
      newtd.innerHTML = '<div align="right">&euro;n/a</div>';
      }
      else 
      {
      newtd.innerHTML = '<div align="right">&euro;0,0' + cash + ""+ "</div>";
      }
        
        
      tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);
      tr[x].insertBefore(newtd1, tr[x].getElementsByTagName('td')[5]);
      tr[x].insertBefore(newtd5, tr[x].getElementsByTagName('td')[6]);
      tr[x].insertBefore(newtd2, tr[x].getElementsByTagName('td')[7]);
      tr[x].insertBefore(newtd3, tr[x].getElementsByTagName('td')[8]);
      tr[x].insertBefore(newtd4, tr[x].getElementsByTagName('td')[9]);


      
    
      
    }
  });
}


//Fixed
