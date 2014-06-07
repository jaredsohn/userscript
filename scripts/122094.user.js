// ==UserScript==
// @name           WoD-Discoveries
// @namespace      http://www.darkblade.de/files/WoD/wod-discoveries.user.js
// @description    Displays a list of the items found/damaged/used during dungeon exploration in a table format
// @include        http*://*.world-of-dungeons.net/wod/spiel/*dungeon/report.php*
// @include        http*://*.net/wod/spiel/*dungeon/report.php*
// ==/UserScript==
// *************************************************************
// *** WoD-Funde V. 2.0, Stand 29.Dec.2011                   ***
// *** Dieses Script ist Freeware                            ***
// *** Wer es verbessern will, moege dies tun, aber bitte    ***
// *** nicht meinen Namen entfernen.                         ***
// *** Danke! Christian Raeuschel                            ***
// *************************************************************
// *** Translated and upgraded by Darkblade                  ***
// *** thanks to Never for the support :)                    ***
// *************************************************************

var version = "2.0";
stand = "29.12.2011";

var Helden = new Array();
function Helden() {}

function Held() {}
function Item() {}

var ItemsGefunden = new Array();
function ItemsGefunden() {}

/* damit gefunden VGs und NonVGs getrennt ausgegeben werden koennen: */
//Array fuer gefundene VGs
var ItemsGefundenVGs = new Array();
function ItemsGefundenVGs() {}
//Array fuer gefundene Non-VGs
var ItemsGefundenNonVGs = new Array();
function ItemsGefundenNonVGs() {}

/*das gleiche nochmal fuer verlorene Items: */
var ItemsVerloren = new Array();
//Array fuer verlorene VGs
var ItemsVerlorenVGs = new Array();
function ItemsVerlorenVGs() {}
//Array fuer verlorene Non-VGs
var ItemsVerlorenNonVGs = new Array();
function ItemsVerlorenNonVGs() {}

var ItemsUniques = new Array();
function ItemsUniques() {}

var ItemsBeschaedigt = new Array();
function ItemsBeschaedigt() {}

var ItemsVerwendetVGs = new Array();
function ItemsVerwendetVGs() {}

var gold = {
  zahl: 0,
  bild:  "data:image/gif;base64,R0lGODlhCwAKANUAAPj8%2BEBEQKCgiJiISGhcGDAsIFhYUPj48OjUiMCsQGhgMIB4UOjo2LicWIhwMEhEGFBQQOjcuHBcKNDEkIBwQMjIuKikeDg4GBgUENjImODUqFhQIDg0EEg4GHhoMDAoEAAAAJCIOCggCFBIGDgwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAALAAoAAAZYQEBAIBgQCoBk0nA4IBIKZXJxYDQcDykAwog0JFGpITKhSCYVC%2BECwFgyi4VG890AFogBp9PQCDwfICEJEhweGghYHQAcGxciCmQOGyNJICAAFwMUDx8kQQA7"

  }

var lang = 'en';
var skin = document.getElementsByTagName('link')[2].href.match(/skin[0-9-]+/i)[0];
//alert(skin);
  
function WODFunde_istGegenstandsseite()
/**********************************************************************
 *  testet, ob wir uns auf der Gegenstandsseite befinden oder nicht   *
 **********************************************************************/
{
   var result = false;
   var heading = document.getElementsByTagName("h1")[0];
   var text = heading.firstChild.data;

   if (text.indexOf("Gegenst") !== -1) result = true;
   if ( lang == 'en' && text.indexOf("item") !== -1) result = true;
	
   return result;
}


function WODFunde_HeldenErmitteln()
/**********************************************************************
 * Ermittelt die Namen der Helden und schriebt diese ins Helden-Array *
 * k.A. wozu das noch gut ist :)                                      *
 * ist doch zu etwas gut: wird bei beschaedigten Items anagezeigt     *
 **********************************************************************/
{
  var header = document.getElementsByTagName("h2");
  var anzahl = document.getElementsByTagName("h2").length-1;
  for (var i=1; i<=anzahl; i++)
  {
    var held = new Held();
    held.name = header[i].getElementsByTagName("a")[0].firstChild.data;
    Helden.push(held);
  }
}


function WODFunde_ItemsKumulieren(Itemliste)
/*********************************************************************************
 * addiert die Anwendungen fuer VGs auf und verkuerzt die Itemliste entsprechend *
 *********************************************************************************/
{
   for (i=0; i<Itemliste.length; i++)
   {
     for (var j=i+1; j<Itemliste.length; j++)
     {
       if (Itemliste[i].name == Itemliste[j].name)
       {
         Itemliste[i].anw=Itemliste[i].anw*1+Itemliste[j].anw*1;     //*1 wg. String->Zahl
         Itemliste[i].anz++;
         Itemliste.splice([j],1);
         j=j-1;  //weil 1 Item entfernt wurde
       }
     }
   }
  
  //kleine kosmetische Korrektur...
  for (i=0; i<Itemliste.length; i++)
  {
     if (Itemliste[i].anw == 0) Itemliste[i].anw = "";
  }
  
}

function ItemlisteSortieren(Itemliste)
/****************************************************
 *   Sortierfunktion fuer die Itemlisten            *
 ****************************************************/
{
  Itemliste.sort(sortItemName);
}

function sortItemName(Item_1, Item_2)
{
   if (Item_1.name > Item_2.name)
   {
      return 1;
   }
   else if (Item_1.name < Item_2.name)
   {
      return -1;
   }
   return 0;
}


function WODFunde_ItemsErmitteln()
/*****************************************************************************
 * Ermittelt die gefundenen Items und schreibt diese ins Array ItemsGefunden *
 *           die verlorenen Items und schreibt diese ins Array ItemsVerloren *
 * Summiert das insgesamt gefundene Gold                                     *
 *****************************************************************************/
{
  function WODFunde_Tabelle_auswerten(tabelle, flag)
  /**********************************************************************
   *  tabelle: gefundene Items eines Helden. Flag: bewusslos true/false *
   **********************************************************************/
  {
      var rows = nextTag.getElementsByTagName("tr");
      var icon;

      for (var i=1; i < rows.length; i++)
      {
        var item = new Item();
        item.link = rows[i].getElementsByTagName("td")[1].innerHTML;
        //ItemLinks von Zustandsgrafiken befreien, dabei Veredelungsgrafiken drin lassen:
        anz_icons = rows[i].getElementsByTagName("td")[1].getElementsByTagName("img").length;
        if (anz_icons>0)
        {
          for (j=0; j<anz_icons; j++)
          {
              icon = rows[i].getElementsByTagName("td")[1].getElementsByTagName("img")[j].getAttribute("src");
              if (icon.search(/gem_/) ==-1 || icon.search(/gem_0.gif/) !==-1) icon="";
          }
        }

        if ( item.link.search(/<a/) !== -1)
           item.link = item.link.slice(item.link.search(/<a/),item.link.length);

        //Test, ob Zeile SK-Meldung ist ..
        var Ergebnis_SK = item.link.search(/Schatzkammer.+/);
		if (lang == 'en')
		{
			Ergebnis_SK = item.link.search(/treasure vault.+/);			
		}		
        //... wenn nicht, auswerten und einsortieren
        if (Ergebnis_SK == -1)
        {
           item.name = rows[i].getElementsByTagName("a")[0].firstChild.data;        
           //Bei unzerstoerbaren Items sind HP und Anw null, daher ...
           if (rows[i].cells[2].firstChild !==null) item.hp = rows[i].cells[2].firstChild.data;
           if (rows[i].cells[4].firstChild !==null) item.anw = rows[i].cells[4].firstChild.data;
  
           item.anz = 1;

           // wenn es sich um ein VG handelt, Zahl der Anw. ermitteln
           if (item.anw.search("/") !== -1) 
		   {
		      item.vg=true;
			  item.anw=parseInt(item.anw.slice(0,item.anw.search("/")));
		   }
		   else
		   {
		     item.vg=false;
		   }

           //in das passende Array anhaengen
           if (flag == false) //Char ist nicht bewusstlos...
           {
             if (item.vg == true) //es handelt sich um ein VG
			 {
			   ItemsGefundenVGs.push(item);
    		 }
			 else
			 {
			   ItemsGefundenNonVGs.push(item);
			 }			   
           }

           if (flag == true)  //Char ist bewusstlos...
           {
             if (item.vg == true) //es handelt sich um ein VG
			 {
			   ItemsVerlorenVGs.push(item);
    		 }
			 else
			 {
			   ItemsVerlorenNonVGs.push(item);
			 }			   
           }
         } //nicht in Schatzkammer
      } //rows
  } // function WODFunde_Tabelle_auswerten


  function WODFunde_paragraph_auswerten(paragraph)
  /**********************************************************************
   *  paragraph: Gold, Meldungen, bewusstlos etc                           *
   **********************************************************************/
  {
  var result;
    if (paragraph.search(/bewusstlos.+/) !== -1)
        result = "bewusstlos";
    if (lang == 'en' && paragraph.search(/unconscious.+/) !== -1)
        result = "bewusstlos";	
		
    //hat ... Gold gefunden oder zu viele Items im Rucksack
    if ( (paragraph.search(/hat/) !== -1) || (paragraph.search(/has/) !== -1) )
    {
      //Meldung != Rucksack voll...
      if (lang == 'en' && paragraph.search(/found/) !== -1 )
	  {
		 //Meldung != Rucksack voll...
		 if (paragraph.search(/pack/) == -1 )
		 //Goldbetrag rausparsen und aufsummieren
		 gold.zahl = gold.zahl + parseInt(paragraph.slice(paragraph.search(/found/)+4, paragraph.length));
	  }		 
    }
    return result;

  }//function WODFunde_paragraph_auswerten(paragraph)



  /**********************************************************************
   *  ab hier eigentlich Auswertung                                     *
   **********************************************************************/
  var anzahl = document.getElementsByTagName("h3").length;
  var bewusstlosflag;
  var gezaehlt;
  var heldnr; 
  
  for (var i=1; i<=anzahl-1; i+=2)
  {
    heldnr = (i-1)/2;
    bewusstlosflag = false;
    gezaehlt = false;

    var heading = document.getElementsByTagName("h3")[i];
    var nextTag = heading.nextSibling.nextSibling;

    for (var j=0; j<heading.parentNode.getElementsByTagName("p").length; j++)
    {
      paragraph = nextTag.parentNode.getElementsByTagName("p")[j].firstChild.data;
      Meldung = WODFunde_paragraph_auswerten(paragraph);

      if (Meldung == "bewusstlos")
      {
        bewusstlosflag = true;
        Helden[heldnr].bewusstlos = true;
      }
      else
      {
        Helden[heldnr].bewusstlos = false;
      }

      if (gezaehlt == false)
      {           
           if (heading.parentNode.getElementsByTagName("table").length > 0)
              WODFunde_Tabelle_auswerten(heading.parentNode.getElementsByTagName("table")[0], bewusstlosflag);
              //WODFunde_Tabelle_auswerten(heading.parentNode.getElementsByTagName("table")[0], bewusstlosflag, Helden[heldenzaehler].name);
           gezaehlt = true;
      }
//    alert(Helden[heldnr].bewusstlos);

    }//for .. Absaetze
  } //for..Helden
} //WODFunde_ItemsErmitteln()


function WODFunde_UniquesErmitteln()
/*******************************************************************************************
 * Ermittelt die im Dunni eingesammelten Uniques und schreibt diese ins Array ItemsUniques *
  ******************************************************************************************/
{
  var anzahl = ItemsGefunden.length;
  for (var i = 0; i < ItemsGefunden.length; i++)
  {
  if ( ItemsGefunden[i].link.search(/item_unique/) !== -1)
     { 
//alert(ItemsGefunden[i].name);
//alert(ItemsGefunden[i].link);
       ItemsUniques.push(ItemsGefunden[i]);
       ItemsGefunden.splice([i],1);
       anzahl--;  //weil 1 Item entfernt wurde
       i--;  //wenn mehr als 1 Unique hintereinander steht wird sonst eins uebersprungen
     }
  }
}


function WODFunde_ItemsBeschaedigt_ermitteln()
/**************************************************************************************
 * Ermittelt die im Dunni beschaedigten und schreibt diese ins Array ItemsBeschaedigt *
  *************************************************************************************/
{
   var anzahl = document.getElementsByTagName("h3").length;
   var heldenzaehler;
   heldenzaehler = 0;

   for (var i=0; i<=anzahl-2; i+=2)
   {
     var heading = document.getElementsByTagName("h3")[i];
     var nextTag = heading.nextSibling.nextSibling;

     var rows = nextTag.getElementsByTagName("tr");

     for (var j=1; j < rows.length; j++)
     //Zeilen in Angelegte Gegenst.
      {
        if (rows[j].cells[3].firstChild !== null)
        // nur falls beschaedigt...
        {
          var item = new Item();

          item.link = rows[j].getElementsByTagName("td")[1].innerHTML;
          //ItemLinks von Zustandsgrafiken befreien:
          if ( item.link.search(/<a/) !== -1)
              item.link = item.link.slice(item.link.search(/<a/),item.link.length);
          item.name = rows[j].getElementsByTagName("a")[0].firstChild.data;
          item.hp = rows[j].cells[2].firstChild.data;
          item.dhp = rows[j].cells[3].firstChild.data;
          item.besitzer = Helden[heldenzaehler].name;
          ItemsBeschaedigt.push(item);
        } // nur falls beschaedigt...
      }//Zeilen

    heldenzaehler++;
    } //Helden
}  // WODFunde_ItemsBeschaedigt_ermitteln()


function WODFunde_ItemsVerwendetVGs_ermitteln()
/**************************************************************************************
 * Ermittelt die im Dunni verwendeten VGs und schreibt diese ins Array ItemsVerwendetVGs       *
  *************************************************************************************/
{
   var anzahl = document.getElementsByTagName("h3").length;

   for (var i=0; i<=anzahl-2; i+=2)
   {
     var heading = document.getElementsByTagName("h3")[i];
     var nextTag = heading.nextSibling.nextSibling;

     var rows = nextTag.getElementsByTagName("tr");

     for (var j=1; j < rows.length; j++)
     //Zeilen in Angelegte Gegenst.
      {
        if (rows[j].cells[4].firstChild !== "")
        // nur falls verwendet...
        {
          if (rows[j].cells[4].firstChild.data.search(/-/) !== -1)
          {
              var item = new Item();
              item.link = rows[j].getElementsByTagName("td")[1].innerHTML;
              if ( item.link.search(/<a/) !== -1)
                   item.link = item.link.slice(item.link.search(/<a/),item.link.length);
              if (item.link.indexOf("rep_destroyed item_destroyed") !== -1)
                {
                    item.link = item.link.replace(/rep_destroyed item_destroyed/g, "");
                 }
              item.name = rows[j].getElementsByTagName("a")[0].firstChild.data;
              item.anw = rows[j].cells[4].firstChild.data;
              item.anw = item.anw.slice(item.anw.search(/-/), item.anw.length-1);
              item.anz = 1;
          ItemsVerwendetVGs.push(item);
          }
         }
      }  // nur falls beschaedigt...
    }  //Zeilen
}  // WODFunde_ItemsBeschaedigt_ermitteln()


function WODFunde_readKonfig()
/**********************************************************************
*  liest gespeicherte GM_Cookies ein. Rueckgabe: KonfigObjekt         *
**********************************************************************/
{
   var konfig = new Konfig();
   function Konfig()
   {
     /*Cookies auswerten*/
     this.anzeigen = GM_getValue("anzeigen");
     this.check_g = GM_getValue("check_g");
     this.check_v = GM_getValue("check_v");
     this.check_b = GM_getValue("check_b");
     this.check_u = GM_getValue("check_u");
     this.check_vgs = GM_getValue("check_vgs");
     this.check_h = GM_getValue("check_h");
     this.modus = GM_getValue("modus");
     this.fontsize = GM_getValue("fontsize");

     /*Voreinstellungen*/
     if (typeof(this.anzeigen) == "undefined") this.anzeigen = true;
     if (typeof(this.check_g) == "undefined") this.check_g = true;
     if (typeof(this.check_v) == "undefined") this.check_v = true;
     if (typeof(this.check_b) == "undefined") this.check_b = true;
     if (typeof(this.check_vgs) == "undefined") this.check_vgs = true;
     if (typeof(this.check_h) == "undefined") this.check_h = true;
     if (typeof(this.check_u) == "undefined") this.check_u = true;
     if (typeof(this.modus) == "undefined") this.modus = 0;
     if (typeof(this.fontsize) == "undefined") this.fontsize = 80;
   }
   return konfig;

}



function WODFunde_setCSS(tag)
{
	var rahmenaussen 		= "1px solid black";
	var rahmeninnen			= "1px solid #000000"; 
	var hgkopf				= "#111111";
	var hggerade 			= "#222222";
	var hgungerade 			= "#111111";
	
	if(skin !== "skin-1")
	{
		hgkopf = "#111111";
		hggerade = "#222222";
		hgungerade = "#111111";
	}
	else
	{
		hgkopf = "#F0F0F0";
		hggerade = "#C8C8C8";
		hgungerade = "#F0F0F0";
	}
	
	var fontsize = meineKonfig.fontsize+"%";


	var contTop = 65;
	var contRight = 12;

  if (tag.className == "container")
  {
      tag.style.cssFloat = "center";
      tag.style.border = rahmenaussen;
	  if(skin !== "skin-1")
	  {
		tag.style.backgroundColor = "#000000";
	  }
	  else
	  {
		tag.style.backgroundColor = "#ffffff";
	  }
      tag.style.padding = "10px";
      tag.style.verticalAlign = "top";
      if (meineKonfig.modus == 1)
      {
        tag.style.top = "65px";
        tag.style.right = "12px";
        tag.style.position = "absolute";
      }
  }

  if (tag.className == "gesammeltItDiv")
  {
      tag.style.border = rahmenaussen;
      tag.style.cssFloat = "left";
      tag.style.padding = "0px";
      tag.style.verticalAlign = "top";
      tag.style.top = "1px";
      tag.style.left = "1px";
  }

  if (tag.className == "HeldenDiv")
  {
      tag.style.border = rahmenaussen;
      tag.style.cssFloat = "left";
      tag.style.padding = "0px";
      tag.style.verticalAlign = "top";
      tag.style.top = "1px";
      tag.style.left = "1px";
  }

  if (tag.className == "zurueck")
  {
      tag.style.fontSize = fontsize;
      tag.style.marginTop = "-15px";
  }


  if (tag.className == "kopf")
  {
      tag.style.backgroundColor = hgkopf;
      tag.style.border = rahmeninnen;
      tag.style.borderCollapse = "collapse";
      tag.style.fontSize = fontsize;
  }

  if (tag.className == "heldenkopf")
  {
        tag.style.textAlign="left";
        tag.style.fontSize = fontsize;
        tag.style.fontWeight = "bold";
        tag.style.marginTop = "5px";
        tag.style.marginBottom = "0px";
		tag.style.marginLeft = "5px";
  }


  if (tag.className == "helden")
  {
      tag.style.textAlign="left";
      tag.style.fontSize = fontsize;
      tag.style.padding = "5px";
	  tag.style.borderStyle="solid";
	  tag.style.borderWidth="2px";
	  tag.style.borderColor="green";
  }

  if (tag.className == "helden_bewusstlos")
  {
      tag.style.textAlign="left";
      tag.style.fontSize = fontsize;
      tag.style.padding = "5px";
	  tag.style.borderStyle="solid";
	  tag.style.borderWidth="2px";
	  tag.style.borderColor="red";
  }

  if (tag.className == "items_g")
  {
      tag.style.textAlign="left";
      tag.style.border = rahmeninnen;	  
      tag.style.fontSize = fontsize;
	  tag.style.backgroundColor = hggerade;;
  }	
  if (tag.className == "items_u")
  {
      tag.style.textAlign="left";
      tag.style.border = rahmeninnen;
      tag.style.fontSize = fontsize;
	  tag.style.backgroundColor=hgungerade;
  }	

  if (tag.className == "anw_g")
  {
      tag.style.textAlign="right";
      tag.style.border = rahmeninnen;
      tag.style.fontSize = fontsize;
	  tag.style.backgroundColor=hggerade;
  }

  if (tag.className == "anw_u")
  {
      tag.style.textAlign="right";
      tag.style.border = rahmeninnen;
      tag.style.fontSize = fontsize;
	  tag.style.backgroundColor=hgungerade;
  }
  
  if (tag.className == "gold")
  {
        tag.style.textAlign="left";
        tag.style.fontSize = fontsize;
        tag.style.fontWeight = "bold";
  }

  if (tag.className == "text")
  {
        tag.style.textAlign="left";
        tag.style.fontSize = fontsize;
  }

  if (tag.className == "konfig")
  {
        tag.style.backgroundColor = hgkopf;
        tag.style.textAlign="left";
        //tag.style.fontSize = fontsize;
        tag.style.fontSize = "80%";
        tag.style.border = "1px solid";
  }

  if (tag.className == "konfigtable")
  {
        tag.style.textAlign="center";
        tag.style.padding = "10px";
  }

  if (tag.className == "itemtable_0")
  {
        tag.style.textAlign="center";
        tag.style.padding = "10px";
		tag.style.backgroundColor="red";
  }
  
  if (tag.className == "itemtable_1")
  {
        tag.style.textAlign="center";
        tag.style.padding = "10px";
  } 

}    //function WODFunde_setCSS(tag)


function WODFunde_ausgabe()
/*******************************
 * Der Name ist Programm       *
 *******************************/
{
  function WODFunde_HeldenAnker_setzen()
  {
     var header = document.getElementsByTagName("h2");
     var anzahl = document.getElementsByTagName("h2").length-1;
     for (var i=1; i<=anzahl; i++)
     {
       var anker=document.createElement("a");
           anker.name = header[i].getElementsByTagName("a")[0].firstChild.data;
       header[i].parentNode.insertBefore(anker, header[i]);
     }
  }

  function WODFunde_HeldenJumps_anzeigen(HeldenArray)
  {
    var neuTable = document.createElement("table");
    var neuTBody = document.createElement("tbody");

        neuZeile = document.createElement("tr");

    for (i=0; i<HeldenArray.length; i++)
    {
      neuZelle = document.createElement("td");
      var inhalt = document.createTextNode(HeldenArray[i].name);
      var internLink = document.createElement("a");
          internLink.href = "#"+HeldenArray[i].name;
          internLink.appendChild(inhalt);
      neuZelle.appendChild(internLink);
      neuZeile.appendChild(neuZelle);
	
		if (HeldenArray[i].bewusstlos == true)
			neuZelle.className="helden_bewusstlos";
		else
			neuZelle.className="helden";

        WODFunde_setCSS(neuZelle);
    }
    neuTBody.appendChild(neuZeile);

    neuTable.appendChild(neuTBody);
    return neuTable;
  }

  function WODFunde_interneLinks_anzeigen(Heldnr)
  /***************************************************************
  *  (zum Anfang) als Div zurueckgegeben                         *
  ****************************************************************/
  {
	divi = document.createElement("div");
    var inhalt = document.createTextNode("  (Return to top)  ");
    var intLink = document.createElement("a");
        intLink.href = "#anfang";
        intLink.appendChild(inhalt);
    divi.appendChild(intLink);
	
	if (Heldnr < Helden.length-1)
	{
	  var inhalt = document.createTextNode("  (next)  ");
      var intLink = document.createElement("a");
        intLink.href = "#"+Helden[Heldnr+1].name;
        intLink.appendChild(inhalt);
      divi.appendChild(intLink);
	} 
	
	if (Heldnr > 0)
	{
	  var inhalt = document.createTextNode("  (previous)  ");
      var intLink = document.createElement("a");
        intLink.href = "#"+Helden[Heldnr-1].name;
        intLink.appendChild(inhalt);
      divi.appendChild(intLink);
	} 
	
    divi.className="back";
    WODFunde_setCSS(divi);
    return divi;
  }


  function WODFunde_Items_anzeigen(ItemArray)
  /**************************************************************
  *  uebergebenes ItemArray als Tabelle zurueckgegeben          *
  ***************************************************************/
  {
	//alert(ItemArray[ItemArray.length-1].name);
	var neuTable = document.createElement("table");
     var neuTBody = document.createElement("tbody");
		neuZeile = document.createElement("tr");
		//1. Spalte bei Uniques weglassen
		if (ItemArray[ItemArray.length-1].name !== "zzdummyUniques")
		{
			neuZelle = document.createElement("th");
			neuZelle.className="kopf";
			WODFunde_setCSS(neuZelle);
			if (ItemArray[ItemArray.length-1].name == "zzdummyBeschaedigt")
				inhalt = document.createTextNode("HP");
			else
				if (ItemArray[ItemArray.length-1].name !== "zzdummyUniques")
					inhalt = document.createTextNode("Uses");
				else
					inhalt = document.createTextNode("");

			neuZelle.appendChild(inhalt);
			neuZeile.appendChild(neuZelle);
		}
		neuZelle = document.createElement("th");
        neuZelle.className="kopf";
        WODFunde_setCSS(neuZelle);

        if (ItemArray[ItemArray.length-1].name == "zzdummyGefunden")
              text = "items found: ";
        if (ItemArray[ItemArray.length-1].name == "zzdummyUniques")
              text = "uniques found: ";
        if (ItemArray[ItemArray.length-1].name == "zzdummyVerloren")
              text = "items lost: ";
        if (ItemArray[ItemArray.length-1].name == "zzdummyBeschaedigt")
              text = "items damaged: ";
        if (ItemArray[ItemArray.length-1].name == "zzdummyVGs")
              text = "items used: ";
		
		inhalt = document.createTextNode(text + (ItemArray.length-1));
	    neuZelle.appendChild(inhalt);
        neuZeile.appendChild(neuZelle);
		neuTBody.appendChild(neuZeile);

		//fuer jedes Item eine Zeile
        for (var i=0; i<ItemArray.length-1; i++)
        {
			neuZeile = document.createElement("tr");
			//1. Spalte bei Uniques weglassen
			if (ItemArray[ItemArray.length-1].name !== "zzdummyUniques")
			{
				neuZelle = document.createElement("td");
                if (i % 2 == 0)
				{
					neuZelle.className="anw_g";
					WODFunde_setCSS(neuZelle);
				}
				else
				{
					neuZelle.className="anw_u";
					WODFunde_setCSS(neuZelle);
				}

                if (ItemArray[ItemArray.length-1].name == "zzdummyBeschaedigt")
                   inhalt = document.createTextNode(ItemArray[i].hp + " " +  ItemArray[i].dhp);
                
                if (ItemArray[ItemArray.length-1].name == "zzdummyUniques")
                   inhalt = document.createTextNode(ItemArray[i].anw);

                if (ItemArray[ItemArray.length-1].name == "zzdummyGefunden")
                   inhalt = document.createTextNode(ItemArray[i].anw);

                if (ItemArray[ItemArray.length-1].name == "zzdummyVerloren")
                   inhalt = document.createTextNode(ItemArray[i].anw);
                
				if (ItemArray[ItemArray.length-1].name == "zzdummyVGs")
                   inhalt = document.createTextNode(ItemArray[i].anw);

                  neuZelle.appendChild(inhalt);
                  neuZeile.appendChild(neuZelle);
			}
			neuZelle = document.createElement("td");
			if (i % 2 == 0) //gerade Zeile
			{
				neuZelle.className="items_g";
				WODFunde_setCSS(neuZelle);
			}
			else
			{
				neuZelle.className="items_u";
				WODFunde_setCSS(neuZelle);
			}
			if (ItemArray[i].anz > 1) neuZelle.innerHTML=ItemArray[i].link + " " + "("+ItemArray[i].anz+"x)";
            else	if (ItemArray[ItemArray.length-1].name == "zzdummyBeschaedigt")
						neuZelle.innerHTML=ItemArray[i].link + " (" + ItemArray[i].besitzer + ")";
					else neuZelle.innerHTML=ItemArray[i].link;

			neuZeile.appendChild(neuZelle);
            neuZeile.appendChild(neuZelle);
            neuTBody.appendChild(neuZeile);
		}
		neuTable.appendChild(neuTBody);
		return neuTable;
   }

  /********  Gesamtcontainer ******************/
  var gesamtDiv = document.createElement("div");
      gesamtDiv.className = "container";
      WODFunde_setCSS(gesamtDiv);

      var DivTable = document.createElement("table");
      var DivTBody = document.createElement("tbody");

      var DivZ0 = document.createElement("tr");
        var DivZ0S1 = document.createElement("td");

      var DivZ1 = document.createElement("tr");
        var DivZ1S1 = document.createElement("td");

      var DivZ2 = document.createElement("tr");
        var DivZ2S1 = document.createElement("td");

      var DivZ3 = document.createElement("tr");
        var DivZ3S1 = document.createElement("td");

      var DivZ4 = document.createElement("tr");
        var DivZ4S1 = document.createElement("td");


           /******** Div HeldenJumps ******************/
     if (meineKonfig.check_h !== false)
     {
          neudiv = document.createElement("div");

          var anker=document.createElement("a");
              anker.name = "anfang";
          neudiv.appendChild(anker);

          WODFunde_HeldenAnker_setzen();
          var header = document.getElementsByTagName("h2");
          var anzahl = document.getElementsByTagName("h2").length-1;
          for (var i=1; i<=anzahl; i++)
          {
             header[i].parentNode.insertBefore(WODFunde_interneLinks_anzeigen(i-1), header[i].nextSibling);
          }
		  
		  var durch=0;
		  for (i=0; i<Helden.length;i++)
		  {
		    if (Helden[i].bewusstlos==false)
			   durch++;
		  }

          hinweis = document.createElement("p");
          var text = "Jump to hero ("+durch+" survivors, "+ (Helden.length-durch) +" failed)";
          hinweis.appendChild(document.createTextNode(text));
          hinweis.className="heldenkopf";
          WODFunde_setCSS(hinweis);
          neudiv.appendChild(hinweis);

          neudiv.appendChild(WODFunde_HeldenJumps_anzeigen(Helden));
          neudiv.className="HeldenDiv";
          WODFunde_setCSS(neudiv);

          DivZ0S1.appendChild(neudiv);
          DivZ0.appendChild(DivZ0S1);
          DivTBody.appendChild(DivZ0);
     }
          /*********** Zeilen fuer leere Tabellen ************/
          hinweis = document.createElement("p");

	  if  (ItemsGefunden.length==1)

 	  {	
            hinweis.appendChild(document.createTextNode(" no items were found.   "));
          }
	  if  (ItemsUniques.length==1)

 	  {	
            hinweis.appendChild(document.createTextNode(" no uniques were found.   "));
          }
	  if  (ItemsBeschaedigt.length==1)

 	  {	
 
           hinweis.appendChild(document.createTextNode(" no items were damaged.   "));
	  }
	  if  (ItemsVerloren.length==1)

 	  {	
            hinweis.appendChild(document.createTextNode(" no items were lost.   "));
          }
	  if  (ItemsVerwendetVGs.length==1)

 	  {	
            hinweis.appendChild(document.createTextNode(" no items were used.   "));
          }
          hinweis.className="gold";
          WODFunde_setCSS(hinweis);
          DivZ2S1.appendChild(hinweis);
          DivZ2.appendChild(DivZ2S1);
          DivTBody.appendChild(DivZ2);

         /******** Div gesammelte Items ******************/
    if  (ItemsGefunden.length > 1)

    {	
     if (meineKonfig.check_g !== false)
     {
          neudiv = document.createElement("div");
          neudiv.appendChild(WODFunde_Items_anzeigen(ItemsGefunden));
          neudiv.className="gesammeltItDiv";
          WODFunde_setCSS(neudiv);
          DivZ3S1.appendChild(neudiv);
          DivZ3.appendChild(DivZ3S1);
          DivTBody.appendChild(DivZ3);
     }
    }

          /******** Div Uniques gesondert ******************/
    if  (ItemsUniques.length > 1)

    {	
     if (meineKonfig.check_u !== false)
     {
          neudiv = document.createElement("div");
          neudiv.appendChild(WODFunde_Items_anzeigen(ItemsUniques));
          neudiv.className="gesammeltItDiv";
          WODFunde_setCSS(neudiv);
          DivZ3S1.appendChild(neudiv);
          DivZ3.appendChild(DivZ3S1);
          DivTBody.appendChild(DivZ3);
     }
    }
          /******** Div verlorene Items ******************/
    if  (ItemsVerloren.length > 1)

    {	
     if (meineKonfig.check_v !== false)
     {
          neudiv = document.createElement("div");
          neudiv.appendChild(WODFunde_Items_anzeigen(ItemsVerloren));
          neudiv.className="gesammeltItDiv";
          WODFunde_setCSS(neudiv);
          DivZ3S1.appendChild(neudiv);
          DivZ3.appendChild(DivZ3S1);
          DivTBody.appendChild(DivZ3);
     }
    }
        /******** Div verwendete VGs ******************/
    if  (ItemsVerwendetVGs.length > 1)

    {	
     if (meineKonfig.check_vgs !== false)
     {
          neudiv = document.createElement("div");
          neudiv.appendChild(WODFunde_Items_anzeigen(ItemsVerwendetVGs));
          neudiv.className="gesammeltItDiv";
          WODFunde_setCSS(neudiv);
          DivZ3S1.appendChild(neudiv);
          DivZ3.appendChild(DivZ3S1);
          DivTBody.appendChild(DivZ3);
     }
    }
          /******** Div beschaedigte Items ******************/
   if  (ItemsBeschaedigt.length > 1)

   {	
     if (meineKonfig.check_b !== false)
     {
          neudiv = document.createElement("div");
          neudiv.appendChild(WODFunde_Items_anzeigen(ItemsBeschaedigt));
          neudiv.className="gesammeltItDiv";
          WODFunde_setCSS(neudiv);
          DivZ3S1.appendChild(neudiv);
          DivZ3.appendChild(DivZ3S1);
          DivTBody.appendChild(DivZ3);
     }
   }      
         /********* Div Konfig_anzeigen_Button ***************/
        i = document.createElement("input");
        i.type = "button";
        i.className = "button";
        if (meineKonfig.anzeigen == true) i.value = "Hide configuration";
        if (meineKonfig.anzeigen == false) i.value = "Show configuration";
        i.addEventListener('click', function wod_funde_store_config()
                                    {
                                         elements = gesamtDiv.getElementsByTagName("input");
										 if (meineKonfig.anzeigen == true ) 
										 {
											var text = "The configuration will be hidden. Please reload the page!";
                                           GM_setValue("anzeigen", false);
                                         } 
 					 
										 if (meineKonfig.anzeigen == false ) 
										 {
											var text = "The configuration will be displayed. Please reload the page!";
                                        	GM_setValue("anzeigen", true);
										 }
										 var form = document.forms['the_form'];
		                                         form.elements['items[0]'].value = 'items found';
		                                         form.elements['items[0]'].type = 'hidden';
		                                         form.submit();				
                                    } , true);

          //DivKonfigzelle.appendChild(i);
          DivZ4S1.appendChild(i);
          hinweis = document.createElement("p");
          DivZ4.appendChild(DivZ4S1);
          DivTBody.appendChild(DivZ4);
  
          if (meineKonfig.anzeigen == true)
          {
            /******** Div Hinweis*******************************/
            hinweis = document.createElement("p");
            var text = "Notice: Usage items are only listed once, the uses total is added up.";
            hinweis.appendChild(document.createTextNode(text));
            hinweis.className="text";
            WODFunde_setCSS(hinweis);
            DivZ4S1.appendChild(hinweis);
            DivZ4.appendChild(DivZ4S1);
            DivTBody.appendChild(DivZ4);
          }

   DivTable.appendChild(DivTBody);
   gesamtDiv.appendChild(DivTable);

if (meineKonfig.anzeigen == true)
{

 /****** KonfigBereich **********/
  var KonfigDiv = document.createElement("div");
      KonfigDiv.className = "konfig";
      WODFunde_setCSS(KonfigDiv);

     t = document.createElement("p");
     t.appendChild(document.createTextNode("WoD-Discovery Configuration (reload after saving!)"));
     KonfigDiv.appendChild(t);

  var DivKonfigTable = document.createElement("table");
      DivKonfigTable.className = "konfigtable";
      WODFunde_setCSS(DivKonfigTable);
  var DivKonfigTBody = document.createElement("tbody");
  var DivKonfigZeile = document.createElement("tr");

  var DivKonfigzelle = document.createElement("td");
        i = document.createElement("input");
        i.type = "checkbox";
        i.checked = meineKonfig.check_g;
        DivKonfigzelle.appendChild(i);
     DivKonfigzelle.appendChild(document.createTextNode("show items found"));       //elements[1]
   DivKonfigZeile.appendChild(DivKonfigzelle);

     DivKonfigzelle = document.createElement("td");
        i = document.createElement("input");
        i.type = "checkbox";
        i.checked = meineKonfig.check_v;
        DivKonfigzelle.appendChild(i);
     DivKonfigzelle.appendChild(document.createTextNode("show lost items"));       //elements[2]
   DivKonfigZeile.appendChild(DivKonfigzelle);

   DivKonfigzelle = document.createElement("td");
        i = document.createElement("input");
        i.type = "checkbox";
        i.checked = meineKonfig.check_vgs;
        DivKonfigzelle.appendChild(i);
     DivKonfigzelle.appendChild(document.createTextNode("show used items"));       //elements[3]
   DivKonfigZeile.appendChild(DivKonfigzelle);

   DivKonfigzelle = document.createElement("td");
        i = document.createElement("input");
        i.type = "checkbox";
        i.checked = meineKonfig.check_b;
        DivKonfigzelle.appendChild(i);
     DivKonfigzelle.appendChild(document.createTextNode("show damaged items"));       //elements[4]
   DivKonfigZeile.appendChild(DivKonfigzelle);

   DivKonfigzelle = document.createElement("td");
        i = document.createElement("input");
        i.type = "checkbox";
        i.checked = meineKonfig.check_u;
        DivKonfigzelle.appendChild(i);
     DivKonfigzelle.appendChild(document.createTextNode("display uniques separately"));       //elements[5]
   DivKonfigZeile.appendChild(DivKonfigzelle);

   DivKonfigzelle = document.createElement("td");
        i = document.createElement("input");
        i.type = "checkbox";
        i.checked = meineKonfig.check_h;
        DivKonfigzelle.appendChild(i);
     DivKonfigzelle.appendChild(document.createTextNode("Jump to hero"));    //elements[6]
   DivKonfigZeile.appendChild(DivKonfigzelle);

  
  DivKonfigTBody.appendChild(DivKonfigZeile);

   DivKonfigZeile = document.createElement("tr");
     DivKonfigzelle = document.createElement("td");
     DivKonfigzelle.setAttribute("colspan","2");

        DivKonfigzelle.appendChild(document.createTextNode("Display mode:"));	         //elements[7]
        i = document.createElement("input");
        i.type = "radio";
        i.name = "modus";
        i.value = 0;
        if (meineKonfig.modus == 0) i.checked = true;	

        DivKonfigzelle.appendChild(i);
        DivKonfigzelle.appendChild(document.createTextNode("integrated"));		       //elements[8]
        i = document.createElement("input");
        i.type = "radio";
        i.name = "modus";
        i.value = 1;
        if (meineKonfig.modus == 1) i.checked = true;
        DivKonfigzelle.appendChild(i);
        DivKonfigzelle.appendChild(document.createTextNode("top right"));
   DivKonfigZeile.appendChild(DivKonfigzelle);

       DivKonfigzelle = document.createElement("td");
         DivKonfigzelle.appendChild(document.createTextNode("Font size: "));          //elements[9]	
         i = document.createElement("input");
         i.type = "text";
         i.value = meineKonfig.fontsize;
         i.size=3;
        DivKonfigzelle.appendChild(i);
     DivKonfigzelle.appendChild(document.createTextNode("%"));
   DivKonfigZeile.appendChild(DivKonfigzelle);
  DivKonfigTBody.appendChild(DivKonfigZeile);

     DivKonfigZeile = document.createElement("tr");
     DivKonfigzelle = document.createElement("td");
     DivKonfigZeile.appendChild(DivKonfigzelle);

     DivKonfigzelle = document.createElement("td");
        i = document.createElement("input");
        i.type = "button";
        i.className = "button";
        i.value = "Save settings";
        i.addEventListener('click', function wod_funde_store_config()
                                     {
					 elements = gesamtDiv.getElementsByTagName("input");

                                         GM_setValue("check_g", elements[1].checked);
                                         GM_setValue("check_v", elements[2].checked);
                                         GM_setValue("check_vgs", elements[3].checked);
                                         GM_setValue("check_b", elements[4].checked);
										 GM_setValue("check_u", elements[5].checked);
                                         GM_setValue("check_h", elements[6].checked);

                                         if (elements[7].checked) GM_setValue("modus", elements[7].value);
                                         if (elements[8].checked) GM_setValue("modus", elements[8].value);

                                         GM_setValue("fontsize", elements[9].value);
                                         //location.reload();
                                    } , true);

     DivKonfigzelle.appendChild(i);
   DivKonfigZeile.appendChild(DivKonfigzelle);
  DivKonfigTBody.appendChild(DivKonfigZeile);


    DivKonfigTable.appendChild(DivKonfigTBody);
    KonfigDiv.appendChild(DivKonfigTable);
  gesamtDiv.appendChild(KonfigDiv);
  /****** ENDE KonfigBereich **********/
} //if meinekonfig.anzeigen


  hinweis = document.createElement("p");
  text = document.createTextNode("This version was translated by Darkblade");
  hinweis.appendChild(text);
  hinweis.className="text";
  WODFunde_setCSS(hinweis);
  gesamtDiv.appendChild(hinweis);


//  var heading = document.getElementsByTagName("h1")[0];
  var headings = document.getElementsByTagName("h2");
  headings[0].parentNode.insertBefore(gesamtDiv, headings[0].nextSibling);

  if (meineKonfig.modus == 0) // Im integrierten Modus Standard-Buttons oben anzeigen
  {
   t = document.createElement("p");
     // bersicht-Button //
      i = document.createElement("input");
        i.type = "submit";
        i.name = "";
        i.value = "summary";
        i.className = "button";
        t.appendChild(i);
        t.appendChild(document.createTextNode("    "));

      // Statistik-Button //
      i = document.createElement("input");
        i.type = "submit";
        i.name = "stats[0]";
        i.value = "statistics";
        i.className = "button";
        t.appendChild(i);
        t.appendChild(document.createTextNode("    "));

      // Gegenstnde-Button //
      i = document.createElement("input");
        i.type = "submit";
        i.name = "items[0]";
        i.value = "items found";
        i.className = "button_disabled";
        t.appendChild(i);
        t.appendChild(document.createTextNode("    "));

      // Bericht-Button //
      i = document.createElement("input");
        i.type = "submit";
        i.name = "details[0]";
        i.value = "details";
        i.className = "button";
        t.appendChild(i);

    headings[1].parentNode.insertBefore(t, headings[1].previousSibling);
   } // Standard-Buttons oben anzeigen

} //function WODFunde_ausgabe()

function ItemDummys_anhaengen()
{
  var item = new Item();
  item.name = "zzdummyUniques";
  item.link = "zzdummyUniques";
  ItemsUniques.push(item);

  var item = new Item();
  item.name = "zzdummyGefunden";
  item.link = "zzdummyGefunden";
  ItemsGefunden.push(item);

  var item = new Item();
  item.name = "zzdummyVerloren";
  item.link = "zzdummyVerloren";
  ItemsVerloren.push(item);

  var item = new Item();
  item.name = "zzdummyBeschaedigt";
  item.link = "zzdummyBeschaedigt";
  ItemsBeschaedigt.push(item);
  
  var item = new Item();
  item.name = "zzdummyVGs";
  item.link = "zzdummyVGs";
  ItemsVerwendetVGs.push(item);
  
 
}

/*********** HAUPTPROGRAMM ******************/
if (WODFunde_istGegenstandsseite())
{
  /*Konfig einlesen*/ 
  var meineKonfig = WODFunde_readKonfig();

  WODFunde_HeldenErmitteln();
  WODFunde_ItemsErmitteln();
  WODFunde_ItemsBeschaedigt_ermitteln();
  WODFunde_ItemsVerwendetVGs_ermitteln();

  ItemlisteSortieren(ItemsGefundenVGs);
  WODFunde_ItemsKumulieren(ItemsGefundenVGs);
  ItemlisteSortieren(ItemsGefundenNonVGs);
  WODFunde_ItemsKumulieren(ItemsGefundenNonVGs);
  //ItemsGefunden zusammenhaengen
  ItemsGefunden = ItemsGefundenNonVGs.concat(ItemsGefundenVGs);

  ItemlisteSortieren(ItemsVerlorenVGs);
  WODFunde_ItemsKumulieren(ItemsVerlorenVGs);
  ItemlisteSortieren(ItemsVerlorenNonVGs);
  WODFunde_ItemsKumulieren(ItemsVerlorenNonVGs);
  //ItemsVerloren zusammenhaengen
  ItemsVerloren = ItemsVerlorenNonVGs.concat(ItemsVerlorenVGs);

  if (meineKonfig.check_u !== false)
  {
    WODFunde_UniquesErmitteln();
  }
  ItemlisteSortieren(ItemsUniques);
  ItemlisteSortieren(ItemsBeschaedigt);
  ItemlisteSortieren(ItemsVerwendetVGs);

  ItemDummys_anhaengen();

  WODFunde_ItemsKumulieren(ItemsVerwendetVGs);

  WODFunde_ausgabe();
}