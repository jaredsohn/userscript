// ==UserScript==
// @name            Telerama Ulysses
// @include         http://cinema.telerama.fr/
// @description     Ajoute les Ulysses dans la liste des films de la page cinÃ©ma du site TÃ©lÃ©rama.fr
// @exclude       
// ==/UserScript==

function closureFunction(objEnCours, semaineAffichage) {
  var  theUrl, theSrc, xmlhttp;
  theUrl = objEnCours.firstChild.href;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET",theUrl,true);
  xmlhttp.onreadystatechange = function() {
    var imgTrouvees,imgEnCours, divEnCours;
    if (xmlhttp.readyState==4) {
      //On va chercher Ulysse
      imgEnCours=document.createElement("img");
      theSrc=xmlhttp.responseText.match(/\/images\/cine\/(Bien|Passable|Bof|Helas)\.gif/g);
      imgEnCours.setAttribute("src",theSrc);
      imgEnCours.setAttribute("border","0");
      imgEnCours.setAttribute("align","left");
      objEnCours.insertBefore(imgEnCours, objEnCours.firstChild);
      //On va chercher le chapeau
      if(xmlhttp.responseText.indexOf("<chapeau>")!=-1){
        divEnCours=document.createElement("div");
        divEnCours.setAttribute("class","v9");
        divEnCours.setAttribute("style","font-weight:bold;");
        divEncours = divEnCours.appendChild(document.createTextNode(xmlhttp.responseText.match(/\<chapeau>([^<]*)<\/chapeau>/)[1].replace(/\ufffd/g,"Ã©")));
        if (semaineAffichage == "0") {
          objEnCours.insertBefore(divEnCours, objEnCours.firstChild.nextSibling.nextSibling);
        } else {
          objEnCours.insertBefore(divEnCours, objEnCours.firstChild.firstChild);
        } 
      }
      //On va chercher la fiche technique
      if(xmlhttp.responseText.indexOf("<fichetech>")!=-1){
        divEnCours=document.createElement("div");
        divEnCours.setAttribute("class","v9");
        var theText=xmlhttp.responseText.match(/\<fichetech>(.*?)<\/fichetech>/)[1];
        theText=theText.replace(/\ufffd/g,"Ã©");
        theText = theText.substr(0,150)+"...";
        
        divEnCours.innerHTML=theText;
        
         if (semaineAffichage == "0") {
          objEnCours.firstChild.nextSibling.removeChild(objEnCours.firstChild.nextSibling.lastChild);
          objEnCours.insertBefore(divEnCours, objEnCours.firstChild.nextSibling.nextSibling);
        } else {
          objEnCours.insertBefore(divEnCours, objEnCours.firstChild.firstChild);
        }
      }
    }
  }
  xmlhttp.send(null);
}


var objTrouves, listeFilms;
//On parse les films de la semaine

objTrouves = document.evaluate(
    '//td[@class="cine"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var dernierFilm = objTrouves.snapshotItem(objTrouves.snapshotLength-1);

//On parse aussi la liste de tous les films pour avoir ceux de la semaine prÃ©cÃ©dente
listeFilms = document.getElementsByName("films_sem")[0];
var theDiv=document.createElement("div");
var theContent;
var semaine=0;
//On Ã©limine ceux de la semaine et les sÃ©parateurs
for (var i = 0; i<listeFilms.childNodes.length; i++) {
  if (listeFilms.childNodes[i].nodeName.toLowerCase() == "option") {
    if (listeFilms.childNodes[i].firstChild.data.indexOf("la semaine dern") != -1) semaine=1;
    if ((listeFilms.childNodes[i].value.indexOf("#") == -1) && (listeFilms.childNodes[i].firstChild.data.indexOf("--") == -1) && semaine == 1) {
      theContent=document.createElement("a");
      theContent.appendChild(document.createTextNode(listeFilms.childNodes[i].firstChild.data));
      theContent.setAttribute("href", listeFilms.childNodes[i].value);
      theContent.setAttribute("style", "font-weight:bold;color:#990000;");
      theTempDiv=document.createElement("div");
      theTempDiv.setAttribute("class", "cine a15");
      theTempDiv.setAttribute("style", "height:70px;display:block;");
      theTempDiv.appendChild(theContent);
      theDiv.appendChild(theTempDiv);
    }
  }
}

//On ajoute la liste des films de la semaine d'avant
dernierFilm.appendChild(document.createElement("br"));
theContent=document.createElement("div");
theContent.setAttribute("style","font-family:Arial;font-weight:bold;size:15px;");
theContent.appendChild(document.createTextNode("Les films de la semaine derniÃ¨re"));
dernierFilm.appendChild(theContent);
dernierFilm.appendChild(document.createElement("br"));
dernierFilm.appendChild(theDiv);

//pour tous les films, on va chercher le petit Ulysse
for (var i = 0; i < objTrouves.snapshotLength; i++) closureFunction(objTrouves.snapshotItem(i), 0);
for (var i = 0; i < dernierFilm.lastChild.childNodes.length; i++) closureFunction(dernierFilm.lastChild.childNodes[i], 1);