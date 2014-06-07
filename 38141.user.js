// ==UserScript==
// @name           Liste des inscrits à une sortie
// @namespace      http://nantes.onvasortir.com
// @description    Produit une liste des inscrits (c) ovs Nantes 2009 1.1.2
// @description    Changelog : Passage sur 3 colonnes par Martial
// @description    1.1.2
// @description    Ajout des nombres d'invités
// @include        http://*.onvasortir.com/*.html
// ==/UserScript==

function getTablesByClass(classe)
{
   var LesTables = document.getElementsByTagName('table');
   var resultats = new Array();
   for(var i=0; i<LesTables.length; i++)
		if(LesTables[i].className == classe)
			 resultats.push(LesTables[i]);
   return resultats;
}


function greaderPrint(entry) {
   var disp_setting = "toolbar=yes,location=no,directories=yes,menubar=yes,"; 
   disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25"; 
   if (!entry) {
	  alert("Please select one entry first");
   }
   else {
	  var content = entry.innerHTML;
	  var docprint = window.open("about:blank","","");
	  var style = 'ins { text-decoration:none; }' 
		 + '* {font-size:8pt; }'
		 + '.entry-actions { display:none; }'
		 + '#scroll-filler { display:none; }'
		 + '.entry-title-go-to { display:none; }';
	  
	  docprint.document.write('<head>');
	  docprint.document.write('<title>');
	  docprint.document.write('Liste des inscrits');
	  docprint.document.write('</title>');
	  docprint.document.write('<style type="text/css">' + style + '</style>');
	  docprint.document.write('<body>');
	  docprint.document.write(content);
	  docprint.document.close(); 
	  docprint.focus(); 
	  docprint.print();
   }
}
var Titre =document.createElement("div")
var images = document.getElementsByTagName('img')

for (var i = 0; i < images.length; i++) {
	if (images[i].src.indexOf('sortie_')>0)
	{
	 var titre = images[i].parentNode.getElementsByTagName('h1')
	 Titre=titre[0].innerHTML;
	}
}

var Matable = document.getElementById('derniersinscrits');
if (Matable) {
//GM_log (Matable.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.innerHTML);
var o = Matable.parentNode.parentNode.getElementsByTagName("td");
var newBody = 
'<html>' + '<head>' + '<title>Liste des participants</title>' +
'<style type="text/css">'+
'h1 {font-size: 150%}'+
'h2 {font-size: 130%}'+
'p {font-size: 100%}'+
'</style>'+
'<script type="text/javascript">'+
' function resize(img){if(img.height>100){img.style.width = parseInt(img.width * 100 / img.height);img.style.height = 100;}img.style.position = "static";img.style.visibility = "visible";} '+
' var photos=true;'+
'    function show_hide_column(col_no, do_show) {'+
'     var stl;'+
'     if (do_show)'+
'     {stl = "table-cell"}'+
'     else'+
'     {stl = "none";}'+
'     var tbl  = document.getElementById("liste_inscrits");'+
'     var rows = tbl.getElementsByTagName("tr");'+
'     for (var row=0; row<rows.length;row++) {'+
'       var cels = rows[row].getElementsByTagName("td");'+
' 	  if (cels.length>2)'+
'       cels[col_no].style.display=stl;'+
' 	  if (cels.length>4)'+
'       cels[5].style.display=stl;'+
' 	  if (cels.length>7)'+
'       cels[8].style.display=stl;'+
' 	  cels = rows[row].getElementsByTagName("th");'+
' 	  if (cels.length>2)'+
'       {cels[col_no].style.display=stl;}'+
'     }'+
' 	photos =!photos;'+
'   }'+
' var listeatt=true;'+
'   function show_hide_table(id_tbl, do_show) {'+
'     var stl;'+
'     if (do_show)'+
'     {stl = "table"}'+
'     else'+
'     {stl = "none";}'+
'     var tbl  = document.getElementById(id_tbl);'+
'       tbl.style.display=stl;'+
' 	  listeatt =!listeatt;'+
'   }'+

'</script>'+
 '</head>' +'<body>' +
'<center><h1>Liste des inscrits pour : '+Titre+'</h1></center>' +
//'<center><p><h2>'+DateSortie+'</h2></p></center>' +
'<center><table border="1" id="liste_inscrits">'+
'<tr ><b><TD width="35"><A onclick="javascript:show_hide_column(\'2\',!photos)"> Présent (O/N)</a></TD><TD width="75">Pseudo<br/>Prénom</TD><TD width="150">photos</TD> <TD width="35">Présent (O/N)</TD><TD width="75">Pseudo<br/>Prénom</TD><TD width="150">photos</TD> <TD width="35">Présent (O/N)</TD><TD width="75">Pseudo<br/>Prénom</TD><TD width="150">photos</TD></b></tr>';
var nombre=0
var ligne=0
for(var i=0;i<=o.length-1;i++)
     {
       if(o[i].align=="left")
       {
		    var oAnchors = o[i].getElementsByTagName("a");
		    if (oAnchors.length>0) {
		    var onmouse = oAnchors[0].getAttribute("onmouseover");
		    var reg=new RegExp("font+", "g");
		    var tableau=onmouse.split(reg);
		    var regp=new RegExp("[< >]+", "g");
		    var tableaup=tableau[1].split(regp);
		    var Prenom =tableaup[2]
			var p=tableau[0].indexOf('<img') ;
			var Img ="Pas de photo :(";
			if (p>0)
			{
			 Img = tableau[0].substring(p,p+tableau[0].substring(p+1).indexOf('<')).replace('src=\\','src=').replace('g\\','g')+' onload="resize(this)" style="position: absolute; visibility: hidden;" >';
			}
		    var Nom = oAnchors[0].getElementsByTagName("font")[0].innerHTML;
		    if(typeof(o[i].lastChild.innerHTML) != "undefined")
		    Nom+=" "+o[i].lastChild.innerHTML.toString();
			if(ligne<1){
				newBody +='<tr '+(nombre++%2==0?'bgcolor="#ccffcc"':'')+'>';
			}
			newBody +='<td>..</td><td>'+Nom+'<br/><br/>'+Prenom+'</td><td>'+Img+'</td>';
			ligne++;
			if(ligne>2){
				ligne=0;
				newBody +='</tr>';
			}
//		   	 newBody +='<tr '+(nombre++%2==0?'bgcolor="#ccffcc"':'')+'><td> </td><td>'+Nom+'</td><td>'+Prenom+'</td><td>'+Img+'</td></tr>';
//			GM_log ('<tr '+(nombre++%2==0?'bgcolor="#ccffcc"':'')+'><td> </td><td>'+Nom+'</td><td>'+Prenom+'</td><td>'+Img+'</td></tr>');
		   }
   	}
  }
 }
newBody +='</table></center>';

// Inscrit en liste d'attente 
var Attente = getTablesByClass('Pad1Color2');
if (Attente) {
	var Att = Attente[0].parentNode.getElementsByTagName("td");
	GM_log ('Att.length :'+Att.length);
	GM_log ('Att[1].align'+Att[1].align)
	if (Att[1].align=="left"){
//	if (Att.length>0){
		newBody +='<center><h1><a onclick="javascript:show_hide_table(\'liste_attente\',!listeatt)">Liste d attente</a></h1><table border="1" id="liste_attente">';
		newBody +='<tr ><b><TD width="35"> Présent (O/N)</TD><TD width="75">Pseudo<br/>Prénom</TD><TD width="150">photos</TD> <TD width="35">Présent (O/N)</TD><TD width="75">Pseudo<br/>Prénom</TD><TD width="150">photos</TD> <TD width="35">Présent (O/N)</TD><TD width="75">Pseudo<br/>Prénom</TD><TD width="150">photos</TD></b></tr>';
		var nombre=0;
		var ligne=0;
		for(var i=0;i<=Att.length-1;i++)
		{
				var AttAnchors = Att[i].getElementsByTagName("a");
				if (AttAnchors.length>0) {
					var onmouse = AttAnchors[0].getAttribute("onmouseover");
					var reg=new RegExp("font+", "g");
					var tableau=onmouse.split(reg);
					var regp=new RegExp("[< >]+", "g");
					var tableaup=tableau[1].split(regp);
					var Prenom =tableaup[2]
					var p=tableau[0].indexOf('<img') ;
					var Img ="Pas de photo :(";
					if (p>0)
					{
						Img = tableau[0].substring(p,p+tableau[0].substring(p+1).indexOf('<')).replace('src=\\','src=').replace('g\\','g')+' onload="resize(this)" style="position: absolute; visibility: hidden;" >';
					}
					var Nom = AttAnchors[0].getElementsByTagName("font")[0].innerHTML;
					if(typeof(Att[i].lastChild.innerHTML) != "undefined")
					Nom+=" "+Att[i].lastChild.innerHTML.toString();
					if(ligne<1){
						newBody +='<tr '+(nombre++%2==0?'bgcolor="#ccffcc"':'')+'>';
					}
					newBody +='<td>..</td><td>'+Nom+'<br/><br/>'+Prenom+'</td><td>'+Img+'</td>';
					ligne++;
					if(ligne>2){
						ligne=0;
						newBody +='</tr>';
					}
				}
		}
	}	
	newBody +='</table></center>';	
}
//--- fin des inscrit en liste d'attente 
newBody +='</body>' +'</html>';

var PageAImprimer = document;
PageAImprimer.innerHTML = newBody; 

var bouton= document.createElement("div");
bouton.innerHTML='<div><form name="Affichage liste"><center><input type="button" value="Imprimer la liste des inscrits"> </center></form></div>'; 
bouton.addEventListener("click", function() { greaderPrint(PageAImprimer) }, false);

var oA = document.getElementsByTagName("a");
for(var i=0;i<=oA.length-1;i++)
{
 if(oA[i].name=="commfirst") 
 {
  oA[i].parentNode.insertBefore(bouton, oA[i]);
  break;
 }
}
