// ==UserScript==
// @name gp-Units Jumper
// @namespace http://ths-netz.dyndns.org/~davidmichaelis/userscripts/
// @description Laesst Seiten der Vertretungsplaene von gp-Units manuell umblaettern
// @author davmic
// @version v0.0.0.0.0.1pre-alpha (vorlaeufiger Dauerzustand)
// ==/UserScript==

  var prevKey=37; // Tastencode fuer die vorige Seite (37 = linke Pfeiltaste)
  var nextKey=39; // Tastencode fuer die naechste Seite (39 = rechte Pfeiltaste)
  // Um einen Tastencode zu ermitteln, beide Werte auf bspw. 0 setzen und weiter unten bei
  //alert(pressedKey); die // wegmachen, dann Script aufrufen und Taste druecken
  
  var storeMethod=0;
  // Bei 0 werden Werte (momentan nur die letzte Seite) per GM_setValue abgespeichert und
  // per GM_getValue ausgelesen, was manchmal aus irgendwelchen Gruenden nicht funktioniert.
  // Bei 1 wird in Cookies gespeichert
  // Bei 2 wird sessionStorage benutzt

    ///// ///////// ////// //// /////////// /////////////////
   //DIE FOLGENDEN ZEILEN SIND TECHNISCHER SCHNICK-SCHNACK//
  ///// ///////// ////// //// /////////// /////////////////
  function changePage(e){
    // Gedrueckte Taste ermitteln
    if(!e)
      e=window.event;
    if(e.which)
      var pressedKey=e.which;
    else if(e.keyCode)
      var pressedKey=e.keyCode;

    if(pressedKey==nextKey){           // Falls die Taste fuer die naechste Seite gedrueckt wurde
      location.replace(nextPageURL()); // naechste Seite aufrufen (logisch, ne?)
    }
    else if(pressedKey==prevKey&&validPage(previousPageURL())){ // Dasgleiche wie oben, nur fuer die vorherige
      location.replace(previousPageURL());
    }
    else{
      //alert(pressedKey); // Hiervon war weiter oben die Rede (Z. 11-12)
    }
  }

  function nextPageURL(){ // URL im Weiterleitungsmetatag ermitteln
    var metaTags=document.getElementsByTagName("meta");
    for(var i=0;i<metaTags.length;++i)
      if(metaTags[i].getAttribute("http-equiv")=="refresh")
        return metaTags[i].getAttribute("content").match(/subst_[0-9]{3}\.htm/i);
  }

  function previousPageURL(){
    if(currentPageNum()==1){ // In den jeweiligen Seiten ist immer nur die naechste, nie die vorherige Seitenzahl gespeichert. Bei Seite 1 zurueckzublaettern wird deshalb problematisch.
      if(storeMethod===1){
        return document.cookie.match(/subst_[0-9]{3}\.htm/i); // Die hoechste Seitenzahl, die auf Seite 1 verweist, und somit die letzte ist, sollte hier gespeichert worden sein.
      }
      else if(storeMethod===0){
        return GM_getValue("maxPage");
      }
      else if(storeMethod===2){
        return sessionStorage.maxPage;
      }
    }
    return "subst_"+addLeadingZeros(currentPageNum()-1)+".htm";
  }

  function currentPageURL(){
    return location.href.match(/subst_[0-9]{3}\.htm/i)+"";
  }

  function currentPageNum(){
    return (/subst_([0-9]{3})\.htm/i.exec(location.href)[1]*1);
  }

  function addLeadingZeros(number){
    number+="";
    while(number.length<3)
      number="0"+number;
    return number;
  }

  function updateMaxPage(){ // Letzte Seite,
    if(nextPageURL()=="subst_001.htm"){ // die die letzte ist, weil sie auf Seite 1 verweist,
      if(storeMethod===1)}
        document.cookie="maxPage="+currentPageURL(); // abspeichern, um bei der ersten Seite zur letzten zurueckblaettern zu koennen.
      }
      else if(storeMethod===0){
        GM_setValue("maxPage",currentPageURL());
      }
      else if(storeMethod===2){
        sessionStorage.maxPage=currentPageURL();
      }
    }
  }
  
  function validPage(page){
    return /subst_[0-9]{3}\.htm/.test(page);
  }
  
  if(validPage(location.href)){
    window.addEventListener("load",updateMaxPage,false);
    document.addEventListener("keypress",changePage,false);
    if(top!=self)top.location.replace(self.location.href);
  }
