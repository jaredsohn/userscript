    // Die Stämme Erweiterung
    // version 1.0
    //
    // --------------------------------------------------------------------
    // This is a Greasemonkey user script.
    //
    // To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
    // Then restart Firefox and revisit this script.
    // Under Tools, there will be a new menu item to "Install User Script".
   // Accept the default configuration and install.
   //
  // To uninstall, go to Tools/Manage User Scripts,
  // select "Die Staemme Features", and click Uninstall.
   // --------------------------------------------------------------------
   // ==UserScript==
   // @name           bla
   // @namespace      http://userscripts.org/scripts/show/11786
   // @description    Fuegt eine Schnell-Leiste hinzu
   // @include        http://de10.ds.ignames.net/*
   // @version        1.0
   // ==/UserScript==
  
   var my_menu_css = '.my_menu ul {padding: 0; margin: 0; list-style: none; background-color: #F1EBDD; }'+
                       '.my_menu li {float: left; position: relative; display: block; padding-right: 10px; background-color: #F1EBDD; height: 17px; }'+
                       '.my_menu li:hover {background-color: #C7B999; }'+
                       '.my_menu li ul {display: none; position: absolute; left: 0; top: 17px; z-index: 10}'+
                       '.my_menu li:hover ul { display: block; width: 150px;}'+
                       '.my_menu li:hover ul li {display: block; height: 17px; width: 100%; }'+
                       '.my_menu li ul li {border-width: 1px; border-style: solid; border-color: #804000;}'+
                       '.my_menu a { color: #804000; font-weight: bold; height: 17px; display: block; width: 100%; }'+
                       '.my_menu img {    border: 0; }'+
                       '.del_link {color: #FF0000; font-weight: bold}'+
                       '.spy_link {display: none}'+
                     '.kommentar {font-size: 10px; color: #804000;}';
                      
   GM_addStyle(my_menu_css);
  
   function getUrlParam(param) //Parameter aus der URL holen
   {
       var url_params = location.search.substr(1);
       var params = url_params.split('&');
       for (var i=0; i<params.length; i++)
       {
           if (params[i].indexOf(param) >= 0)
           {
               return params[i];
           }
       }
  return "";
  }
  
  //Neuen Link (inkl. Bild) für das Menü erstellen
  function createLinkNode(href_p,img_p,text_p,target_p)
  {   
       var li = document.createElement("li");
       var link = document.createElement("a");
       link.href = href_p;
      
       var text = document.createTextNode(text_p);
      
       if (img_p != "")
       {
           var img = document.createElement("img");
           var src = document.createAttribute("src");
         src.nodeValue = img_p;
         img.setAttributeNode(src);
         link.appendChild(img);
       }
    
     if (target_p != "")
     {
         link.target = target_p;
     }
    
     link.appendChild(text);
    
     li.appendChild(link);
    
     return li;
 }

   //Funktion zur Erweiterung des Marktplatz-Links
   function expandMarketLink(market_link)
   {
       var submenu = document.createElement("ul");
       var eigene_angeb = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=own_offer","","Eigene Angeb.","");
     var fremde_angeb = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=other_offer","","Fremde Angeb.","");
     var status = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market&mode=traders","","Haendlerstatus","");
     submenu.appendChild(eigene_angeb);
     submenu.appendChild(fremde_angeb);
     submenu.appendChild(status);
     market_link.appendChild(submenu);
     return market_link;
 }
  
   //Funktion zur Erweiterung des Versammlungsplatz-Links
   function expandPlaceLink(vers_platz_link)
   {
       var submenu = document.createElement("ul");
      var truppen = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place&mode=units","","Truppen","");
      var sim = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place&mode=sim","","Simulator","");
      submenu.appendChild(truppen);
      submenu.appendChild(sim);
      vers_platz_link.appendChild(submenu);
      return vers_platz_link;
  }
 
  //Menüs erstellen und einfügen
  if (window.location.href.indexOf("game.php") >= 0)
  {   
      //Schnellleiste erstellen und einfügen
      createMenubar();
  }
 
  function createMenubar()
  {
      var main_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=main","graphic/buildings/main.png","Hauptgebaeude","");
      var kaserne_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=barracks","graphic/buildings/barracks.png","Kaserne","");
      var stall_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=stable","graphic/buildings/stable.png","Stall","");
      var werkstatt_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=garage","graphic/buildings/garage.png","Werkstatt","");
      var marktplatz_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=market","graphic/buildings/market.png","Marktplatz","");
      var vers_platz_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=place","graphic/buildings/place.png","Versammlungsplatz","");
      var adelshof_link = createLinkNode("game.php?"+getUrlParam("village")+"&screen=snob","graphic/buildings/snob.png","Adelshof","");
	  var stamm_link = createLinkNode("http://benni33.redio.de/TK-Forum/dsforum1.1.10/","http://benni33.redio.de/TK-Forum/dsforum1.1.10/ds_isnewerpost.php?user=2&pass=xxx","Forum","");
 
      //Marktplatz-Links erweitern (Dropdown)
      marktplatz_link = expandMarketLink(marktplatz_link);
 
      //Versammlungsplatz erweitern
      vers_platz_link = expandPlaceLink(vers_platz_link);
 
      //Menü-Div erstelle und Style setzen
      var divnode = document.createElement("div");
      var ulnode = document.createElement("ul");
      var stylenode = document.createAttribute("class");
      stylenode.nodeValue = "my_menu";
      divnode.setAttributeNode(stylenode);
 
      //Links in das Menü einfügen
      ulnode.appendChild(main_link);
      ulnode.appendChild(kaserne_link);
      ulnode.appendChild(stall_link);
      ulnode.appendChild(werkstatt_link);
      ulnode.appendChild(adelshof_link);
      ulnode.appendChild(vers_platz_link);
      ulnode.appendChild(marktplatz_link);
      ulnode.appendChild(stamm_link);

      divnode.appendChild(ulnode);
 
      //Schnellleiste im Dokument einfügen
      document.getElementsByTagName("table")[0].appendChild(divnode);
  }