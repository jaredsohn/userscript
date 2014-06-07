// ==UserScript==
// @name           Ress Prohibed
// @version        1.0
// @author         
// @namespace      
// @description    Script 
// @include        http://*.looki.*
// éàè
// ==/UserScript==

// Active ou non le log
var LOG_LEVEL = 1; // 0 = inactif, 1 = actif

// Page actuelle
var myLocation = document.location.href;
var c_url = document.location.href;
var c_host = document.location.hostname;// c_url.substr(7);
var c_server = c_host.substr(0, c_host.indexOf('.'));
var c_lang = c_host.substr(-3);
c_lang = c_lang.substr(c_lang.indexOf('.')+1);
var c_page = c_url.substr(7+c_host.length);
var c_prefix = c_server+'.'+c_lang;

// Affiche la page courante
//bLog( myLocation );


//--------------------------------------------------------------------------
//************* PAGE Galaxie ***************/
if (myLocation.indexOf("/galaxy_overview.php?") != -1)
{
 // Affiche sous forme de tableau, les infos de la page galaxie
 infoGalaxy();
}
//--------------------------------------------------------------------------



//--------------------------------------------------------------------------
// Mise à jour de la place restant dans les soutes lors d'un pillage
if (myLocation.indexOf("/fleet_cargo.php?") != -1)
{
 pillageFacile();
}
//--------------------------------------------------------------------------



//--------------------------------------------------------------------------
// Affiche les ressources disponibles sur une planète lorsqu'une flotte est en orbite
// Page de la planète
if (myLocation.indexOf("/planet_info.php?") != -1)
{
 var valeur = document.getElementById( "contentClip" ).innerHTML;
 var debut = valeur.indexOf( "fleet_id=" );
 while( debut > 0 )
 {
   var fin = valeur.indexOf( "&amp", debut);
   var fleet_id = valeur.substring( debut+9 , fin);     
   var api = 'http://polaris.eu2.looki.fr/fleet/fleet_cargo.php?fleet_id=' + fleet_id;
   GM_xmlhttpRequest( { method: "GET",  url: api,  onload: function(response)  { espionRessourcesParse(response );  } } );
   
   debut = valeur.indexOf( "fleet_id=", debut + 9 );
   
 } 
 // Troupes 
 var api = 'http://polaris.eu2.looki.fr/fleet/fleet_troop.php?fleet_id=' + fleet_id;
 GM_xmlhttpRequest( { method: "GET",  url: api,  onload: function(response)  { espionTroupesParse(response );  } } );
}
//--------------------------------------------------------------------------


//--------------------------------------------------------------------------
// Page configuration : ajout du PHPSESSID
if (myLocation.indexOf("/settings_overview.php?area=options") != -1)
{

 var phpid = readCookie("PHPSESSID");
 document.getElementById( "layer_site_content" ).innerHTML += "<div>PHPSESSID : " + phpid + "</div>";  
}
//--------------------------------------------------------------------------



//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
if ( (myLocation.indexOf("/fleet_overview.php") != -1)  )
{
tDiv = parent.document.getElementById("layer_overview");
if ( tDiv == null )               
 tDiv = document.getElementById("layer_overview");
if ( tDiv == null && parent.parent ) 
 tDiv = parent.parent.document.getElementById("layer_overview");

   activePlanet = tDiv.getElementsByTagName("td");
   for ( i = 0 ; i < activePlanet.length ; i++) 
   {
    cookie = trim( activePlanet[i].innerHTML );
     
    valeur = readCookie( cookie );
	if( valeur != "" )
      activePlanet[i].innerHTML = str_replace2( valeur, "%20", " " );
   }
}

if ( myLocation.indexOf("/commander_select.php") != -1)
{
tDiv = parent.document.getElementById("layer_site_content");
if ( tDiv == null )               
 tDiv = document.getElementById("layer_site_content");
if ( tDiv == null && parent.parent ) 
 tDiv = parent.parent.document.getElementById("layer_site_content");

   activePlanet = tDiv.getElementsByTagName("font");
   for ( i = 0 ; i < activePlanet.length ; i++) 
   {

    cookie = trim( activePlanet[i].innerHTML );
 
    valeur = readCookie( cookie );
	if( valeur != "" )
      activePlanet[i].innerHTML = str_replace2( valeur, "%20", " " );
   }
}


if (myLocation.indexOf("/commander_info.php") != -1)
{
 MaFiche();
}
function MaFiche() 
{

    var a = Array();

    prefixpts = '/html/body/div[2]/div/div/div/center';
    prefixright = '/html/body/div[2]/div/div/div[2]';
    id_td = 4;

    player = $x(prefixright+'/table/tbody/tr[2]/td[4]')[0].innerHTML;

//    if (player.toLowerCase() != GM_getValue(c_prefix+'user','').toLowerCase()) return;

//    a['Titre'] = $x(prefixright+'/table/tbody/tr[3]/td[4]')[0].innerHTML;
// a['Race'] = $x(prefixright+'/table/tbody/tr[4]/td[4]')[0].innerHTML;

    a['Commerce'] = $x(prefixright+'/table[2]/tbody/tr[2]/td[3]')[0].innerHTML;
    a['Recherche'] = $x(prefixright+'/table[2]/tbody/tr[4]/td[3]')[0].innerHTML;
    a['Combat'] = $x(prefixright+'/table[2]/tbody/tr[6]/td[3]')[0].innerHTML;
    a['Construction'] = $x(prefixright+'/table[2]/tbody/tr[8]/td[3]')[0].innerHTML;
    a['Economie'] = $x(prefixright+'/table[2]/tbody/tr[10]/td[3]')[0].innerHTML;
    a['Navigation'] = $x(prefixright+'/table[2]/tbody/tr[12]/td[3]')[0].innerHTML;
/*
    a['GameGrade'] = $x(prefixpts)[0].innerHTML;
    i = a['GameGrade'].indexOf('>')+1;
    j = a['GameGrade'].indexOf('<', i);
    a['GameGrade'] = a['GameGrade'].substr(i, j-i);

    a['POINTS'] = $x(prefixpts+'/table/tbody/tr[4]/td['+id_td+']/b')[0].innerHTML;
    a['pts_architecte'] = $x(prefixpts+'/table/tbody/tr[6]/td['+id_td+']')[0].innerHTML;
    a['pts_mineur'] = $x(prefixpts+'/table/tbody/tr[7]/td['+id_td+']')[0].innerHTML;
    a['pts_science'] = $x(prefixpts+'/table/tbody/tr[8]/td['+id_td+']')[0].innerHTML;
    a['pts_commercant'] = $x(prefixpts+'/table/tbody/tr[9]/td['+id_td+']')[0].innerHTML;
    a['pts_amiral'] = $x(prefixpts+'/table/tbody/tr[10]/td['+id_td+']')[0].innerHTML;
    a['pts_guerrier'] = $x(prefixpts+'/table/tbody/tr[11]/td['+id_td+']')[0].innerHTML;
*/
    var titre = "";
    var lastValue = 0;
	for (var caract in a )
	{
      var value = Number( a[ caract ] );
	  if( value > lastValue )
      {
        lastValue = a[ caract ];
		titre = caract;  
	  }
    }
    if( titre != "" )
    {
     titre = player + " " + a[ titre ] + titre.substring(0,4);
     //bLog( player + " " + a[titre] + caract.substring(0,3) );
     setCookie( player, titre, 90);
    }
}

function trim (myString)
{
return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
} 

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}


function str_replace(a, b, str) {
    return str_replace2(str, a, b);
}
function str_replace2(SRs, SRt, SRu) {
  /*
  **  Replace a token in a string
  **    s  string to be processed
  **    t  token to be found and removed
  **    u  token to be inserted
  **  returns new String
  */
  SRRi = SRs.indexOf(SRt);
  SRRr = '';
  if (SRRi == -1) return SRs;
  SRRr += SRs.substring(0,SRRi) + SRu;
  if ( SRRi + SRt.length < SRs.length)
    SRRr += str_replace2(SRs.substring(SRRi + SRt.length, SRs.length), SRt, SRu);
  return SRRr;
}

function $x() {
    var x='',          // default values
    node=document,
    type=0,
    fix=true,
    i=0,
    toAr=function(xp){      // XPathResult to array
        var _final=[], next;
        while(next=xp.iterateNext(),next)
            _final.push(next);
        return _final
    },
    cur;
    while (cur=arguments[i++],cur)      // argument handler
        switch(typeof cur) {
            case "string":
                x+=(x=='') ? cur : " | " + cur;
                continue;
            case "number":
                type=cur;
                continue;
            case "object":
                node=cur;
                continue;
            case "boolean":
                fix=cur;
                continue;
        }
    if (fix) {      // array conversion logic
        if (type==6) type=4;
        if (type==7) type=5;
    }
    if (!/^\//.test(x)) x="//"+x;         	 // selection mistake helper
    if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
    var temp=document.evaluate(x,node,null,type,null); //evaluate!
    if (fix)
        switch(type) {                              // automatically return special type
            case 1:
                return temp.numberValue;
            case 2:
                return temp.stringValue;
            case 3:
                return temp.booleanValue;
            case 8:
                return temp.singleNodeValue;
            case 9:
                return temp.singleNodeValue;
        }
    return fix ? toAr(temp) : temp;
}




//************************** MAIN ****************/

var myLangArray =         [["Vaisseaux disponibles","Ressources","Titane","Cuivre","Fer","Aluminium","Mercure","Silicium ","Uranium","Krypton","Azote","Hydrog�ne", "Asteroiden", "Champs de d�bris "], // These words must be as they appear in EU2 or else functionality is lost."Free Ships" is seen on the EU2 Fleets screen. Its the second tab's name. "Resources" is seen when loading/unloading cargo at a planet. Its the first tab name. The element names are best to be retrieved from an asteroid or wreckage screen. Because, that is where they are used here.
                                                                ["Chat","Main","Roids","Wreckages","Wormhole","Search","Options"], // eu2b Buttons
                                                                ["Total Asteroids","Total Wreckages","Total Wormholes","Total Results"], // Totals
                                                               //["Objets","Syst�me solaires","Plan�tes","Flottes","Ast�ro�des","�paves","trous de ver", "se tenir<br>au courant", "Aller �", "Syst�me solaire", "Ce syst�me solaire n'est pas dans la base de donn�es!"], // eu2b Main screen words
                                                                ["Objects","Star Systems","Planets","Fleets","Asteroids","Wreckages","Wormholes", "Keep<br>Current", "Goto", "Star System", "Ce syst�me solaire n'est pas dans la base"],
                                                                ["Total","espace libre", "mins (ou", "h)", "pour tout récolter","", "res"], // eu2b words added to EU2 Collect screen
                                                                ["Vaisseaux disponibles a", "Ressources �", "empty", "Asc", "Dec", "Reload", "load:", "ms", "Aucun", "pas d`info", "Ast�ro�de", "Champs de d�bris"], // Other words used
                                                                ["Supprimer","Delete all planets from database.This will reset the Star System count.","Delete all Fleets from the database.","Delete all Asteroids from the database.","Delete all Wreckages from the database.","Delete all Wormholes from the database.","Click OK to Delete All the"/*,"Save Database on each view of a Star System. (eu2b already saves Database when you close EU2, checking this feature will slow down script load-time when viewing a Star System. However, the Database is more protected from crashes.)"*/]]; // All those words on the eu2b options screen




//************************** FMAIN ****************/



// AJOUTE UNE ETOILE A COTE DE LA PLANETE ACTIVE */
var activePlanet = null;
var piCount = -1;
var tC,i;

//if( parent.document != null )
{
// Récupère le DIV des plan�tes
tDiv = parent.document.getElementById("layer_planet");
if ( tDiv == null )               
 tDiv = document.getElementById("layer_planet");
if ( tDiv == null && parent.parent ) 
 tDiv = parent.parent.document.getElementById("layer_planet");

if ( tDiv != null ) 
{
    piCount = 0;

    // Recue�re la planete active
    activePlanet = tDiv.getElementsByTagName("img");
    for ( i = 0 ; i < activePlanet.length ; i++) 
    {
       coord = GM_getValue( activePlanet[i].title, "" );
       if( coord != "" ) activePlanet[i].title = activePlanet[i].title + " (" + coord + ")";
                   tC = activePlanet[i].getAttribute("class");
                   if ( tC == "planet_inactive" ) piCount++;
                   else if ( tC == "planet_active" ) break;
    }
    if ( i < activePlanet.length ) 
    {
                   activePlanet = activePlanet[i].title;
                   GM_setValue("activePlanet",activePlanet);
                   GM_setValue("piCount", piCount);
    } 
    else 
    {
                               var tj = "parent\img\class>";
                               for ( var i  = 0 ; i < activePlanet.length ; i++) tj += activePlanet[i].getAttribute("class") + ",";
                               activePlanet = GM_getValue("activePlanet","");
                               piCount = GM_getValue("piCount",-1);
                               bLog("Error in active planet, found the layer but not the active planet! Loaded activePlanet from GM>" + activePlanet + "<\n-" + tj);
                }
} 
else 
{
                activePlanet = GM_getValue("activePlanet","");
                piCount = GM_getValue("piCount",-1);
                bLog("Didnt find layer_planet. Loaded activePlanet from GM>" + activePlanet + "<");
}

if ( piCount > -1  && tDiv != null ) 
{
                tDiv2 = parent.document.getElementById("myStar");
                if (tDiv2 == null) document.getElementById("myStar");
                if (tDiv2 == null && parent.parent ) parent.parent.document.getElementById("myStar");
                if (tDiv2 != null ) tDiv2.parentNode.removeChild(tDiv2);
                tDiv.innerHTML += "<div id='myStar' style='position: absolute;font-weight: bold;font-size:22px;top: 14px;left: " + (5 + piCount*20) + "px;color:yellow'>*</div>";
} 
else bLog ("Either, piCount is less than zero>" + piCount + "<\nor tDiv is null>" + tDiv + "<");
}
//************* FIN DE AJOUTE UNE ETOILE A COTE DE LA PLANETE ACTIVE ***************/




//************* PAGE BUNKER ***************/
if ( myLocation.indexOf('bunker_overview') != -1 && myLocation.indexOf( "component" ) ==-1 &&  myLocation.indexOf( "autoload" ) ==-1 )
{
 // Recupere la capacit� du bunker
  var bunker_amount_max = unsafeWindow.bunker_amount_max;

  // Recupere le nombre de ressource dans le bunker
  var bunker_amount = unsafeWindow.bunker_amount_before;


  // Ajoute un bouton pour tout mettre dans le bunker
  AddBunkerButtonSetAll();

 
/*
  bunker_amount = BunkerSetAll( "bunkerdiff_titanium_show", "bunkerdiff_titanium", "res_titanium_show", bunker_amount, bunker_amount_max  );
  bunker_amount = BunkerSetAll( "bunkerdiff_nitrogen_show", "bunkerdiff_nitrogen", "res_nitrogen_show", bunker_amount, bunker_amount_max  );
  bunker_amount = BunkerSetAll( "bunkerdiff_iron_show", "bunkerdiff_iron", "res_iron_show", bunker_amount, bunker_amount_max  );  
  bunker_amount = BunkerSetAll( "bunkerdiff_hydrogen_show", "bunkerdiff_hydrogen", "res_hydrogen_show", bunker_amount, bunker_amount_max  );  
  bunker_amount = BunkerSetAll( "bunkerdiff_copper_show", "bunkerdiff_copper", "res_copper_show" , bunker_amount, bunker_amount_max  );  
  bunker_amount = BunkerSetAll( "bunkerdiff_aluminium_show", "bunkerdiff_aluminium", "res_aluminium_show", bunker_amount, bunker_amount_max  ); 
  bunker_amount = BunkerSetAll( "bunkerdiff_silicon_show", "bunkerdiff_silicon", "res_silicon_show", bunker_amount, bunker_amount_max  );
  bunker_amount = BunkerSetAll( "bunkerdiff_uranium_show", "bunkerdiff_uranium", "res_uranium_show", bunker_amount, bunker_amount_max  );
  bunker_amount = BunkerSetAll( "bunkerdiff_krypton_show", "bunkerdiff_krypton", "res_krypton_show", bunker_amount, bunker_amount_max  );
  bunker_amount = BunkerSetAll( "bunkerdiff_mercury_show", "bunkerdiff_mercury", "res_mercury_show", bunker_amount, bunker_amount_max  );
*/

}
//************* FIN PAGE BUNKER ***************/




//************* PAGE RECHERCHE ***************/
if ( myLocation.indexOf('technology_overview') != -1  ) 
{
 var lsc = document.getElementById("layer_site_content");

 var fwListe = lsc.getElementsByClassName("font_grey");
 if( fwListe != null && fwListe.length > 0 )
 {
	  
	 for ( i = 1 ; i < fwListe.length ; i+=2 )
	 {
	  var tech = TechToString( fwListe[i].innerHTML );
	  fwListe[i].innerHTML = tech;  
	 }
	
	 fwListe = lsc.getElementsByClassName("font_white");
	 tempEcoule = fwListe[1].innerHTML.toLowerCase();
	 niveau = fwListe[2].innerHTML.toLowerCase();
	
	 lsc = document.getElementById("layer_overview");
	 fw = lsc.getElementsByClassName("font_white");
	 message = fw[3].innerHTML;
	
	 var percentMin = 0;
	 var percentMax = 100;
	 
	 // Traduit le message d'avancement en pourcentage
	 if( message.indexOf( "La recherche de la nouvelle technologie vient" ) != -1 )  
	 { percentMin = 0; percentMax = 2.6; }
	 else if( message.indexOf( "Les premiers pas sont toujours les plus difficiles." ) != -1 )  
	 { percentMin = 2.6; percentMax = 5.2; }
	 else if( message.indexOf( "Mise " ) != -1 )  
	 { percentMin = 5.2; percentMax = 11; }
	 else if( message.indexOf( "Nous sommes en phase de conception" ) != -1 )  
	 { percentMin = 11; percentMax = 16; }
	 else if( message.indexOf( "Nous avons subi" ) != -1 )  
	 { percentMin = 16; percentMax = 21; }
	 else if( message.indexOf( "Nous avons pass" ) != -1 )  
	 { percentMin = 21; percentMax = 26; }
	 else if( message.indexOf( "Nous avons r" ) != -1 )  
	 { percentMin = 26; percentMax = 32; }
	 else if( message.indexOf( "Il a fallu faire de nombreuses modifications" ) != -1 )  
	 { percentMin = 32; percentMax = 37; }
	 else if( message.indexOf( "Nous en avons termin" ) != -1 )  
	 { percentMin = 37; percentMax = 42; }
	 else if( message.indexOf( "Le premier test a " ) != -1 )  
	 { percentMin = 42; percentMax = 47; }
	 else if( message.indexOf( "Nous sommes" ) != -1 )  
	 { percentMin = 47; percentMax = 53; }
	 else if( message.indexOf( "Plus de la moiti" ) != -1 )  
	 { percentMin = 53; percentMax = 58; }
	 else if( message.indexOf( "Malgr" ) != -1 )  
	 { percentMin = 58; percentMax = 63; }
	 else if( message.indexOf( "Nous avons plusieurs" ) != -1 )  
	 { percentMin = 63; percentMax = 68; }
	 else if( message.indexOf( "Aucun problr" ) != -1 )  
	 { percentMin = 68; percentMax = 74; }
	 else if( message.indexOf( "Le sprint final vient de commencer" ) != -1 )  
	 { percentMin = 74; percentMax = 79; }
	 else if( message.indexOf( "Les derniers tests" ) != -1 )  
	 { percentMin = 79; percentMax = 84; }
	 else if( message.indexOf( "La majeure partie des recherches" ) != -1 )  
	 { percentMin = 84; percentMax = 89; }
	 else if( message.indexOf( "Nos scientifiques continuent de travailler" ) != -1 )  
	 { percentMin = 89; percentMax = 95; }
	 else if( message.indexOf( "Bient" ) != -1 )  
	 { percentMin = 95; percentMax = 99; }
	 else if( message.indexOf( "Nos travaux de recherche vont aboutir" ) != -1 )  
	 { percentMin = 99; percentMax = 100; }
	
													var production = unsafeWindow.production;
													var tempEcoule = production[ production.length -1 ];
													var minutes = tempEcoule / 60;
	 var finEstimeeMin = ( percentMin > 0 ? Math.floor( 100 * minutes / percentMin ) : "0" );
	 var minutesRestantesMin = finEstimeeMin - minutes;
	 var finEstimeeMax = ( percentMax > 0 ? Math.floor( 100 * minutes / percentMax ) : "0" );
	 var minutesRestantesMax = finEstimeeMax - minutes;            
	 var tempsRestantMin = MinutesToTime( minutesRestantesMin );
	 var tempsRestantMax = MinutesToTime( minutesRestantesMax );
	
	 var d = new Date();
	 d.setTime( d.getTime() + ( minutesRestantesMin * 60 * 1000) );
	 dateEstimeeMin = FormatDate( d );
	 
	 d = new Date();
	 d.setTime( d.getTime() + ( minutesRestantesMax * 60 * 1000) );
	 dateEstimeeMax = FormatDate( d );
	
	 fw[3].innerHTML = percentMin + "% - " + percentMax + "% " + message + "<br/><br/>" + "Restant : " + tempsRestantMax + " - " + tempsRestantMin + "<br/>Fin :" + dateEstimeeMax + " - " + dateEstimeeMin;
   }
}

//************* FIN DE : PAGE RECHERCHE ***************/





// Ajoute le nom de la planète sur la page flotte
if ( myLocation.indexOf('fleet_overview') != -1 && activePlanet != null && activePlanet != "" ) 
{
 tDiv = document.body.getElementsByClassName("tab_active");
 if ( tDiv != null ) 
 {
  for ( var i in tDiv ) 
  {
   if ( tDiv[i].innerHTML == myLangArray[0][0] ) 
	  tDiv[i].innerHTML = myLangArray[5][0] + " <span style=\"color:#FFFFFF\">" + activePlanet + "</span>";
  }
                                                               }
// tDiv.replace( "document.location.href='?area=ship;","document.location.href='?area=ship&elementorder=name;");                


 tDiv = document.body.getElementsByClassName("tab_inactive");
 if ( tDiv != null ) 
 {                                                                             
  for ( var i in tDiv ) 
  {
   if ( tDiv[i].innerHTML == myLangArray[0][0] ) 
	 tDiv[i].innerHTML = "<a onclick=\"document.location.href='?area=ship&elementorder=name\">" + myLangArray[5][0] + " <span style=\"color:#FFFFFF\">" + activePlanet + "</span></a>";
  }
 }
}
//************* FIN De : PAGE FLOTTE : Ajoute le nom de la plan�te ***************/




//************* PAGE RECOLTE ***************/
if (myLocation.indexOf("/fleet_collect.php?") != -1)
{
   var lsc = document.getElementById("layer_site_content");
   var fpb = lsc.getElementsByClassName("font_pink_bold");
   var fw = lsc.getElementsByClassName("font_white");
   var orbType = "";
   if ( fpb.length > 2 ) {
				   orbType = fpb[0].innerHTML.toLowerCase();
				   if ( orbType.indexOf("ast") != -1 ) orbType = "Asteroids";
				   else if ( orbType.indexOf("bris") != -1 ) orbType = "Débris";
				   else orbType = "";
				   bLog("fleet_collect>type>" + orbType + "<");
   }
   if ( orbType != "" ) {
	   var i;
	   var res = 0;
	   var resType;
	   var resAmount;
	   var toolString = "";
	   for ( i = 0 ;  (i+1 < fw.length) && (fw[i].innerHTML.indexOf(";") != -1)  ; i += 2 ){
		   resType = fw[i].innerHTML.split(";")[2];
		   switch ( resType ) {
			  case myLangArray[0][2]:  resType = "Ti";	break;
			  case myLangArray[0][3]:  resType = "Cu"; break;
			  case myLangArray[0][4]:  resType = "Fe"; break;
			  case myLangArray[0][5]:  resType = "Al"; break;
			  case myLangArray[0][6]:  resType = "Hg"; break;
			  case myLangArray[0][7]:  resType = "Si"; break;
			  case myLangArray[0][8]:  resType = "U";	break;
			  case myLangArray[0][9]:  resType = "Kr"; break;
			  case myLangArray[0][10]: resType = "N"; break;
			  case myLangArray[0][11]: resType = "H"; break;
			  default:  
				resType = "--";
        		bLog("fleet_collect>unknown resType>" + resType + "<");
		   }
		   resAmount = parseInt(fw[i+1].innerHTML);
		   res += resAmount;
		   
		   if ( i > 3 && i % 4 == 0) toolString += "<br>";
		   else if ( i > 0 ) toolString += ", ";
		   toolString += resType + ":" + addCommas(resAmount);
}

i += 2;
var factor = fw[i].innerHTML.split(" ")[0].slice(1);
if ( factor.indexOf(".") != -1 ) factor = parseFloat(factor) * 1000;
else factor = parseInt(factor);
var total = Math.round((res/factor)*100)/100;
var cargo = fw[i+2].innerHTML.split("/");
cargo = parseInt(cargo[1]) - parseInt(cargo[0]);
var totalc = Math.round((cargo/factor)*100)/100;
bLog("\nres>" + res + "<\ntotal>" + total + "<\nfactor>" + factor + "<\ncargo>" + cargo + "<");
var theParent = fw[i-2].parentNode.parentNode;
theParent.innerHTML += '<tr><td><img src="http://static.empireuniverse2.de/empty.gif" height="1" width="20"></td><td class="font_white" valign="top"><img src="' + lsc.firstChild.firstChild.src + '" height="10">&nbsp;&nbsp;' + myLangArray[4][0] + '</td><td><img src="http://static.empireuniverse2.de/empty.gif" height="1" width="20"></td><td class="font_white">' + res +  '&emsp;=&nbsp;' + total + ' ' + myLangArray[4][2] + ' ' + (Math.round((total/60)*100)/100) + ' ' + myLangArray[4][3] + ' ' + myLangArray[4][4] + '</td></tr><br>';
var theParent = fw[i+2].parentNode.parentNode;
theParent.innerHTML += '<tr><td><img src="http://static.empireuniverse2.de/empty.gif" height="1" width="20"></td><td class="font_white" valign="top">' + myLangArray[4][1] + '</td><td><img src="http://static.empireuniverse2.de/empty.gif" height="1" width="20"></td><td class="font_white">' + cargo + '&emsp;=&nbsp;' + totalc + ' ' + myLangArray[4][2] + ' ' + (Math.round((totalc/60)*100)/100) + ' ' + myLangArray[4][3] + ' ' + myLangArray[4][5] + '</td></tr>';
fw = document.getElementsByName("f_amount");
for ( var i in fw ) fw[i].parentNode.innerHTML += "(" + (parseInt(fw[i].value)*factor) + " " + myLangArray[4][6] + ")";
   }
}




//************* FIN DE PAGE RECOLTE ***************/





//--------------------------------------------------------------------------
// Fonctions
//--------------------------------------------------------------------------

// Affiche un log
function bLog(tString) 
{
  // Test le niveau de détail
  if ( LOG_LEVEL == 1 ) 
     GM_log (tString);
}


// Ajoute une virgule
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
													  x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}


// Ajout d'un lien
function AddLinks( lienPerso )
{         
    // l'ID linkline = la ligne où il y a support / wiki / forum etc...
    var linkline = parent.document.getElementById("linkline");
 
    if ( linkline != null )
    {
        // on rajoute du css ( de la mise en page )
        GM_addStyle(".liensPersos {style='position:absolute; top:18;cursor: pointer; font-size:12px;}");
        linkline.innerHTML += "<br/>" + lienPerso + " ";
    }
}




// Retourne une date formattee
function FormatDate( date )
{
 d = new Date();
 d.setTime( d.getTime() + ( minutesRestantesMax * 60 * 1000) );
 dateEstimeeMax = d.getDate() + "/" + (d.getMonth()+1) + " " + d.getHours() + ":" + d.getMinutes();

 var day = date.getDate();
 var month = date.getMonth() + 1;
 var hour = date.getHours();
 var minute = date.getMinutes();
  
 var res = ( day < 10 ? "0" + day : day ) + "/" + (month < 10 ? "0" + month : month ) + " " + ( hour < 10 ? "0" + hour : hour ) + ":" + ( minute < 10 ? "0" + minute : minute );
 return res;
}


// Convertit des minutes en jours/heures/minutes
function MinutesToTime( minutes )
{   
 var Days = "";
 var Hours = Math.floor(minutes / 60);
 if( Hours > 24 )
 {
   Days = Math.floor( Hours / 24);
   Hours = Math.floor( Days % 24 );
 }
 var Minutes = Math.floor( minutes % 60 );    
 return ( Days > 1 ? Days + "j " : "" ) + ( Hours < 10 ? "0" + Hours : Hours ) + "h" + ( Minutes < 10 ? "0" + Minutes : Minutes) ;
}


// Convertie un message de niveau de tech en nombre de jours
function TechToString( tech )
{
 var res = "";
 switch( tech )
 {
   case "Routine":
    res = "~ 1 heure";
   break;
   case "Tr\350s Facile":
    res = "~ 16 heures";
   break;
   case "Facile":
    res = "~ 24 heures";
   break;
   case "Simple":
    res = "~ 2 jours";
   break;
   case "Moyen":
    res = "~ 4 jours";
   break;
   case "Difficile":
    res = "~ 6 jours";
   break;
   case "Tr\350s difficile":
    res = "~ 10 jours";
   break;
   case "Complexe":
    res = "~ 11 jours";
   break;
   case "D\351fi":
    res = "~ 40 jours";
   break;
   case "Impossible":
    res = "Impossible";
   break;
   default:
   res=tech;
   break;
 }

 return res;

}


// Rempli la case d'une ressource bunker
function BunkerSetAll( bunkerdiff_ress_show, bunkerdiff_ress, res_ress_show, bunker_amount, bunker_amount_max  )
{
 var textbox = document.getElementById( bunkerdiff_ress_show );
 var valeur = (document.getElementById( res_ress_show ).innerHTML).replace(".","");
 
 bunker_amount_max = parseInt(bunker_amount_max );
 bunker_amount = parseInt(bunker_amount );
 valeur = parseInt( valeur );
 var reste =  bunker_amount_max - bunker_amount;
 if( valeur > reste )
 {
  document.getElementById( res_ress_show ).innerHTML = valeur - reste;
  valeur = reste;
 }
 else
  document.getElementById( res_ress_show ).innerHTML = 0;
 textbox.value = valeur; 
 textbox = document.getElementById( bunkerdiff_ress );
 textbox.value = valeur;

 bunker_amount += valeur;

 return bunker_amount;
}

//************* FIN FONCTIONS *******************/



function MajPlaceRestanteDansSoute(maxCargo){
var enCargo = document.getElementById('sum_cargo').innerHTML;
enCargo = nettoyerUnChiffre(enCargo); 
maxCargo = nettoyerUnChiffre(maxCargo);
var r = parseInt(maxCargo) - parseInt(enCargo);
document.getElementsByTagName("td")[4].innerHTML = "<font size='2em' color='#33FF00'>&nbsp;&nbsp;&nbsp;&nbsp;"+r+" chargeables max</font>";
}

function pillageFacile(){
var reg=/(.+) \/ (.+)/;
var xx = document.getElementsByTagName("td")[12].innerHTML.match(reg);
    xx[0].search(reg);
var enCargo = nettoyerUnChiffre(document.getElementById('sum_cargo').innerHTML);
var maxCargo = nettoyerUnChiffre(RegExp.$2);

var r = parseInt(maxCargo) - parseInt(enCargo);
document.getElementsByTagName("td")[4].innerHTML = "<font size='2em' color='#33FF00'>&nbsp;&nbsp;&nbsp;&nbsp;"+r+" chargeables max</font>";

/* var cells = getElementsByClassName("table_entry"); 
for (var i = 0; i < cells.length; i++) { 
   addInfosBas("table_entry"+i+" "+cells[i].innerHTML); 
} */

/* var cells = document.getElementsByTagName("td"); 
for (var i = 0; i < cells.length; i++) { 
   addInfosBas(i+" "+cells[i].innerHTML); 
} */

    // f_amount_titanium_show
    document.getElementById('f_amount_titanium_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_copper_show
    document.getElementById('f_amount_copper_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_iron_show
    document.getElementById('f_amount_iron_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_aluminium_show
    document.getElementById('f_amount_aluminium_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_mercury_show
    document.getElementById('f_amount_mercury_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_silicon_show
    document.getElementById('f_amount_silicon_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_uranium_show
    document.getElementById('f_amount_uranium_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_krypton_show
    document.getElementById('f_amount_krypton_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_nitrogen_show
    document.getElementById('f_amount_nitrogen_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_hydrogen_show
    document.getElementById('f_amount_hydrogen_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
}


// Ajoute un bouton mettant toutes les ressources dans le bunker
function AddBunkerButtonSetAll()
{
var td = document.getElementsByTagName("td"); 
var img = document.getElementsByTagName("img"); 
//var  a = document.getElementsByTagName("td")[18];
//a.innerHTML += "<span style=\"font-size:0.6em\">afficher le total</span><span></span>";
var  b = document.getElementsByTagName("td")[19];
b.innerHTML += "<img class=\"button\" src=\"http://static.empireuniverse2.de/default/fr/default/button/button_1/all/button_default.gif\" onmouseout=\"image_swap('toutdanslebunk','http://static.empireuniverse2.de/default/fr/default/button/button_1/all/button_default.gif')\" onmouseup=\"image_swap('toutdanslebunk','http://static.empireuniverse2.de/default/fr/default/button/button_1/all/button_default.gif')\" onmouseover=\"image_swap('toutdanslebunk','http://static.empireuniverse2.de/default/fr/default/button/button_1/all/button_over.gif')\" onmousedown=\"image_swap('toutdanslebunk','http://static.empireuniverse2.de/default/fr/default/button/button_1/all/button_down.gif')\" id=\"toutdanslebunk\" style=\"visibility: visible;\" border=\"0\">";

    b.addEventListener('click', function()    
     {
       bunker_amount = BunkerSetAll( "bunkerdiff_titanium_show", "bunkerdiff_titanium", "res_titanium_show", bunker_amount, bunker_amount_max  );
	   bunker_amount = BunkerSetAll( "bunkerdiff_nitrogen_show", "bunkerdiff_nitrogen", "res_nitrogen_show", bunker_amount, bunker_amount_max  );
	   bunker_amount = BunkerSetAll( "bunkerdiff_iron_show", "bunkerdiff_iron", "res_iron_show", bunker_amount, bunker_amount_max  );  
	   bunker_amount = BunkerSetAll( "bunkerdiff_hydrogen_show", "bunkerdiff_hydrogen", "res_hydrogen_show", bunker_amount, bunker_amount_max  );  
	   bunker_amount = BunkerSetAll( "bunkerdiff_copper_show", "bunkerdiff_copper", "res_copper_show" , bunker_amount, bunker_amount_max  );  
	   bunker_amount = BunkerSetAll( "bunkerdiff_aluminium_show", "bunkerdiff_aluminium", "res_aluminium_show", bunker_amount, bunker_amount_max  ); 
       bunker_amount = BunkerSetAll( "bunkerdiff_silicon_show", "bunkerdiff_silicon", "res_silicon_show", bunker_amount, bunker_amount_max  );
       bunker_amount = BunkerSetAll( "bunkerdiff_uranium_show", "bunkerdiff_uranium", "res_uranium_show", bunker_amount, bunker_amount_max  );
       bunker_amount = BunkerSetAll( "bunkerdiff_krypton_show", "bunkerdiff_krypton", "res_krypton_show", bunker_amount, bunker_amount_max  );
       bunker_amount = BunkerSetAll( "bunkerdiff_mercury_show", "bunkerdiff_mercury", "res_mercury_show", bunker_amount, bunker_amount_max  );
    }, false);

}
// #######################################################################

// Affiche les ressources disponibles sur une planète dont une flotte est en orbite
function espionRessourcesParse(data)
{

    var page=data.responseText;
    var reg=/;/gi;
    page=page.replace(reg,"\r\n");
    
    var tabRess=new Array();
    reg=/resource\[(\d)\] = '(\w+)'/gi;
    var m = page.match(reg);
    if (m!=null){
        for (var i = 0; i < m.length; i++) {
            m[i].search(reg);            
            tabRess[RegExp.$1]=RegExp.$2;
        }
    }
    var tmpStr="";
    reg=/resource_amount_planet\[(\d)\] = (\d+)/gi;
    var m = page.match(reg);
    if (m!=null){
        tmpStr="<div style='text-align:left;color:white;'>Ressources : ";
        for (var i = 0; i < m.length; i++) 
       {
            m[i].search(reg);            
            var resType = "";
			switch ( tabRess[RegExp.$1] ) 
			{
			  case "titanium":    resType = "Ti"; break;
			  case "copper":    resType = "Cu"; break;
			  case "iron":    resType = "Fe"; break;
			  case "aluminium":    resType = "Al"; break;
			  case "mercury":    resType = "Me"; break;
			  case "silicon":    resType = "Si"; break;
			  case "uranium":    resType = "Ur";  break;
			  case "krypton":    resType = "Kr"; break;
			  case "nitrogen":	  resType = "Az";  break;
			  case "hydrogen":   resType = "Hy";  break;
              default:       
				tmpStr += tabRess[RegExp.$1];
              break;
			} 
            tmpStr += resType + " : " + RegExp.$2 + " - ";
        }
    }
    if( tmpStr != "" )
     document.getElementById("layer_overview").innerHTML = tmpStr + document.getElementById("layer_overview").innerHTML;

}
function espionTroupesParse(data)
{
    var m = data.responseText;
    var reg=/<.[^<>]*>/gi;
    var tmp=m.replace(reg, '  ');
    reg= /Troupes ennemies\s+(\d*[\.\d{3}]*)/;
    var tmpStr="";
    if (tmp.match(reg)) tmpStr="<div style='color:white;'>Troupes : "+RegExp.$1+"</div>";
     
     if( tmpStr != "" )
     document.getElementById("layer_overview").innerHTML = tmpStr + document.getElementById("layer_overview").innerHTML;
}





function nettoyerUnChiffre(x){
x = x.replace(".", ""); 
x = x.replace(".", ""); 
return x;
}

function readCookie(name) 
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return "";
}

function MajPlaceRestanteDansSoute(maxCargo){
var enCargo = document.getElementById('sum_cargo').innerHTML;
enCargo = nettoyerUnChiffre(enCargo); 
maxCargo = nettoyerUnChiffre(maxCargo);
var r = parseInt(maxCargo) - parseInt(enCargo);
document.getElementsByTagName("td")[4].innerHTML = "<font size='2em' color='#33FF00'>&nbsp;&nbsp;&nbsp;&nbsp;"+r+" chargeables max</font>";
}

function pillageFacile(){
var reg=/(.+) \/ (.+)/;
var xx = document.getElementsByTagName("td")[12].innerHTML.match(reg);
    xx[0].search(reg);
var enCargo = nettoyerUnChiffre(document.getElementById('sum_cargo').innerHTML);
var maxCargo = nettoyerUnChiffre(RegExp.$2);

var r = parseInt(maxCargo) - parseInt(enCargo);
document.getElementsByTagName("td")[4].innerHTML = "<font size='2em' color='#33FF00'>&nbsp;&nbsp;&nbsp;&nbsp;"+r+" chargeables max</font>";

/* var cells = getElementsByClassName("table_entry"); 
for (var i = 0; i < cells.length; i++) { 
   addInfosBas("table_entry"+i+" "+cells[i].innerHTML); 
} */

/* var cells = document.getElementsByTagName("td"); 
for (var i = 0; i < cells.length; i++) { 
   addInfosBas(i+" "+cells[i].innerHTML); 
} */

    // f_amount_titanium_show
    document.getElementById('f_amount_titanium_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_copper_show
    document.getElementById('f_amount_copper_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_iron_show
    document.getElementById('f_amount_iron_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_aluminium_show
    document.getElementById('f_amount_aluminium_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_mercury_show
    document.getElementById('f_amount_mercury_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_silicon_show
    document.getElementById('f_amount_silicon_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_uranium_show
    document.getElementById('f_amount_uranium_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_krypton_show
    document.getElementById('f_amount_krypton_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_nitrogen_show
    document.getElementById('f_amount_nitrogen_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
    // f_amount_hydrogen_show
    document.getElementById('f_amount_hydrogen_show').addEventListener('change', function() {
        MajPlaceRestanteDansSoute(nettoyerUnChiffre(maxCargo));
       }, false);
}


function infoGalaxy() {

    var sysId=unsafeWindow.starsystem_id;
    var msg = '<div><font size="1" color="white">Syst&egrave;me solaire n&deg;'+sysId+'</font>';
    var flottes_sys = "";
    var planetes_sys = "";
    var vortex_sys     = "";
    var infos_sys     = "";
    bLog(msg);
    var reg=/starsystem_id = (\d*)/;
    var t = document.documentElement.innerHTML.match(reg);
    var sysID=RegExp.$1;
    
    var tabOrb=new Array();
    for (x in unsafeWindow.orb){
        tabOrb[x]=unsafeWindow.orb[x].split(",");
    }
    for (x in tabOrb){
        if(tabOrb[x][0] == 'fleet'){

            var coordX = parseInt(tabOrb[x][1]) + parseInt(50);
            var coordY = parseInt(tabOrb[x][2]) + parseInt(50);
            var coordZ = parseInt(tabOrb[x][3]) + parseInt(50);
            var coordTot=sysId+":"+coordX+":"+coordY+":"+coordZ;

            if(tabOrb[x][5] != 'enemy' && tabOrb[x][5] != 'npc' && tabOrb[x][5] != 'ga' && tabOrb[x][5] != 'own' && tabOrb[x][5] != 'neutral' && tabOrb[x][5] != 'nap'){
                infos_sys+="<br/><font size='1' color='white'>"+tabOrb[x][5];
            }
            
            // Si derrière soleil
            if((tabOrb[x][1] == 2) && (tabOrb[x][2] >= -1) && (tabOrb[x][2] < 5)){
                if(tabOrb[x][5] == 'enemy'){
                    flottes_sys += "<br/><font color='red' size='1'>Flotte cach&eacute;e ("+coordTot+") - "+tabOrb[x][9]+"</font>";
                } else if (tabOrb[x][5] == 'neutral') {
                    flottes_sys += "<br/><font size='1' color='white'>Flotte cach&eacute;e("+coordTot+") - "+tabOrb[x][9]+"</font>";
                }
            }
            // si en 1:1
            else if((tabOrb[x][1] == -49) && (tabOrb[x][2] >= -49) && (tabOrb[x][2] < -46)){
                if(tabOrb[x][5] == 'enemy'){
                    flottes_sys += "<br/><font color='red' size='1'>Flotte cach&eacute;e ("+coordTot+") - "+tabOrb[x][9]+"</font>";
                } else if (tabOrb[x][5] == 'neutral') {
                    flottes_sys += "<br/><font size='1' color='white'>Flotte cach&eacute;e("+coordTot+") - "+tabOrb[x][9]+"</font>";
                }
            }
            // si en 100:100
            else if((tabOrb[x][1] == 50) && (tabOrb[x][2] >= 48) && (tabOrb[x][2] <= 50)){
                if(tabOrb[x][5] == 'enemy'){
                    flottes_sys += "<br/><font color='red' size='1'>Flotte cach&eacute;e ("+coordTot+") - "+tabOrb[x][9]+"</font>";
                } else if (tabOrb[x][5] == 'neutral') {
                    flottes_sys += "<br/><font size='1' color='white'>Flotte cach&eacute;e("+coordTot+") - "+tabOrb[x][9]+"</font>";
                }
            }
            else{
                if(tabOrb[x][5] == 'enemy'){
                    flottes_sys += "<br/><font color='red' size='1'>("+coordTot+") - "+tabOrb[x][9]+"</font>";
                } else if (tabOrb[x][5] == 'neutral') {
                    flottes_sys += "<br/><font size='1' color='white'>("+coordTot+") - "+tabOrb[x][9]+"</font>";
                } else if(tabOrb[x][5] == 'npc')
					{
                    /*if(tabOrb[x][9].indexOf("espionnage") > 0 && tabOrb[x][9].indexOf("reconnaissance")<0 && tabOrb[x][9].indexOf("attaque")<0){*/

                        flottes_sys += "<br/><font color='orange' size='1'>("+coordTot+") - " + tabOrb[x][9] + "</font>";
                    //}
                }
            }
        }
        var tmpStr="";
        if(tabOrb[x][0].indexOf('hole')>0){
            tmpStr=tabOrb[x][6];
            tmpStr=tmpStr.replace("Cible : ","Vortex vers ");
            tmpStr=tmpStr.replace("(ID système stellaire)","");
            vortex_sys+="<br />"+tmpStr;
        }
        if(tabOrb[x][0]=='planet' && tabOrb[x][6]!=''){
            var coordX = parseInt(tabOrb[x][1]) + parseInt(50);
            var coordY = parseInt(tabOrb[x][2]) + parseInt(50);
            var coordZ = parseInt(tabOrb[x][3]) + parseInt(50);
            var coordTot=sysId+":"+coordX+":"+coordY+":"+coordZ;

            if(tabOrb[x][5]=='neutral' || tabOrb[x][5]=='war'){
                if (tabOrb[x][6].indexOf("6495ed")<=0){    
                    tmpStr="<br/><font size='1' color='white'>("+coordTot+"</font>) - "+tabOrb[x][6];
                }
            }
            planetes_sys+=tmpStr;
        }
    }
    if(flottes_sys !== ""){
        msg += flottes_sys;
    }
    if(vortex_sys !== ""){
        msg += "<br/><font size='1' color='white'>"+vortex_sys+"</font>";
    }
    if(planetes_sys !== ""){
        msg += "<br/><font size='1' color='white'>"+planetes_sys+"</font>";
    }
    if(infos_sys !== ""){
        msg += "<br/><font size='1' color='white'>"+infos_sys+"</font>";
    }
    msg +="</div>";
    //AddToMotd(msg,'<hr/>');
    document.getElementById("layer_galaxy").innerHTML += msg;
    
    //top.document.getElementById("divFlottes").innerHTML = msg;
}
