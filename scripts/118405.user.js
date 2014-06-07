// ==UserScript==
// @version     5.5.3
// @author      LPuNKT
// @date        2013-05-22
// @name        LPuNKTKit
// @namespace   lpunktkit
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_log
// @updateURL      http://userscripts.org/scripts/source/118405.meta.js
// @updateURL      https://userscripts.org/scripts/source/118405.meta.js
// @downloadURL    https://userscripts.org/scripts/source/118405.user.js
// @description Kit de utilidades para oGame Redesign 5
// @icon        http://s3.amazonaws.com/uso_ss/icon/117512/large.png?1325107247
// @include     http://*.ogame.*/game/*
// @include     http://ogame.*/
// @include     http://www.ogame.*/
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

//OgameKit 3.01 -- http://userscripts.org/scripts/show/108998
//Resources in Flight 1.26 -- http://userscripts.org/scripts/show/58079
//Show IPM and Phalanx Range 1.01 -- http://userscripts.org/scripts/show/82029
//Disable Useless Stuff 1.03 -- http://userscripts.org/scripts/show/104181
//Pranger In Header 1.03 -- http://userscripts.org/scripts/show/61874
//Color Flight Slots 1.04 -- http://userscripts.org/scripts/show/73289
//Shortcut Keys 1.27 -- http://userscripts.org/scripts/show/83284
//Current Planet Name On Message Pages 1.01 -- http://userscripts.org/scripts/show/74117
//Fix Action Icons 1.17 -- http://userscripts.org/scripts/show/67948
//Reply Circular Messages 1.03 -- http://userscripts.org/scripts/show/82634
//BBCode -- http://userscripts.org/scripts/show/54537
//Smiles -- http://userscripts.org/scripts/show/54538
//Chat Alianza -- http://userscripts.org/scripts/show/65521
//Color the Message Subjects 1.08 -- http://userscripts.org/scripts/show/86257
//mailColoration -- http://userscripts.org/scripts/show/101703
//Message button in left menu 0.1 -- http://userscripts.org/scripts/show/93205
//Set the Focus Correctly 1.02 -- http://userscripts.org/scripts/show/83850
//Fix the Universe Name in the Pillory 1.04 -- http://userscripts.org/scripts/show/94540
//Planet Navigation Keys 1.06 -- http://userscripts.org/scripts/show/82484
//Compactador Batallas 0.08 -- http://userscripts.org/scripts/show/75647
//Missing Sats 1.05 -- http://userscripts.org/scripts/show/81699
//Fleet Empty Space 1.00 -- http://userscripts.org/scripts/show/103449
//Show Resource Details 1.03 -- http://userscripts.org/scripts/show/84148
//Point Board Link Really to the Forum 1.00 -- http://userscripts.org/scripts/show/85889
//Moons to the Right 1.05 -- http://userscripts.org/scripts/show/71588
//Direct Colonization 1.00 -- http://userscripts.org/scripts/show/83845
//Retarted Star -- http://userscripts.org/scripts/show/74641
//Coordinates Links Fix 1.00 -- http://userscripts.org/scripts/show/118405
//Additional Resource Loading Buttons 1.03 -- http://userscripts.org/scripts/show/81197
//Options in User Name 1.02 -- http://userscripts.org/scripts/show/75283
//Return Fleet Question 1.01 -- http://userscripts.org/scripts/show/111756
//Merchant Warning 1.00 -- http://userscripts.org/scripts/show/83847
//Efficiency Tool 0.1 -- http://userscripts.org/scripts/show/106920
//Small planets -- http://userscripts.org/scripts/show/93656
//Fleet Contents 1.02 -- http://userscripts.org/scripts/show/95547
//Destination Player Name on 3rd Fleet Dispatch Page 1.00 -- http://userscripts.org/scripts/show/119743
//Spy from the Fleet Movement Page 1.05 -- http://userscripts.org/scripts/show/96510
//Short Header 1.03 -- http://userscripts.org/scripts/show/56750
//Highlight Players and Alliances -- http://userscripts.org/scripts/show/50678
//AutoExpoFleet for Raiders (HF) 1.1.3 -- http://userscripts.org/scripts/show/105310

//Cambios:
// Adecuar lista de planetas a la nueva ventana de Mercader
// Corregido reloj en la barra de links
// Mostrar calculadora de comercio solo donde corresponde
// Corregido desactivar advertencia de colonizacion
// Corregido detalles de recursos
// Nombre de jugador contempla puntos de honor, si se usa como acceso a opciones
// Corregido recursos en transito
// Corregido lunas a la derecha
// Corregido BBCode y Smiles
// Corregido compactador de batallas
// Corregido produccion optima
// Corregido tiempo y recursos en hangar
// Corregido llenado de almacenes
// Corregido satelites necesarios
// Corregido Fleet Content
// Mostrar link al Chat en la barra de links
// Ocultacion de robo y/o escombros vacios en el CR
// Corregido Pregunta de retorno de flota
// Corregido iconos de accion
// Corregir teclas rapidas
// Eliminado //require http://sizzlemctwizzle.com/updater.php por no existir ya el dominio
// Corregido fleet slot colored
// Eliminado borde de seleccion de planeta
// Sumado opcion de resaltado de planeta/luna activo
// Coloreado de slots tambien en Galaxy (y resaltado de infos generales de galaxia)
// Corregido deteccion de idioma, universo y pagina
// Corregido calcular tiempo de fabricacion de flotas y defensas
// Corregido rango de misiles y phalanx
// Corregido posicionamiento botones de carga
// Mostrar recursos para desmontar una construccion (excepto terraformer y base lunar)
// Teclas rapidas para los botones de carga de AntiGame
// Eliminado fecha del compactador de batallas para mensajes
// Sumado repartidos automatico de escombros SAC
// Corregido comportamiento por defecto de opciones de configuracion
// Sumado boton donaciones
// Corregido iluminacion de planeta activo

// ToDo:
// Repartidor de SAC automatico RECUPERANDO PERDIDAS
// Corregir smiles para compatibilizarlo con spoiler
// Colores de resalte de jugadores y alianzas configurables (en vista de galaxia)
// Cantidades de resalte de escombros configurables (en vista de galaxia)

const DEBUG_MODE = 0; //0: none; 1: basic; 2: extended; 3: language texts; !=0: errors

const VERSION_LPUNKTKIT = "5.5.3 \u042F";

var strUrl_Script;        const URL_SCRIPT = 'http://userscripts.org/scripts/show/117512';
                          const URL_SCRIPT_T = 'http://userscripts.org/scripts/show/118405';


var strUniverse;

/**
 * Configuracion de las ventanas de configuracion del script
 */
//Default Color Font
var   strColor_LPuNKTKit;        const COLOR_LPUNKTKIT   = "lime";
                                 const COLOR_LPUNKTKIT_T = "aquamarine";

//Available Color Fonts
const arrColorFont = [
                     'Cornflower Blue',
                     'Deep Sky Blue',
                     'Cyan',
                     'Light Blue',
                     'Aquamarine',
                     'Light Green',
                     'Spring Green',
                     'Lime',
                     'LimeGreen',
                     'Yellow Green',
                     'Yellow',
                     'Khaki',
                     'Gold',
                     'Orange',
                     'Tomato',
                     'Chocolate',
                     'Crimson',
                     'Medium Purple',
                     'Dark Magenta',
                     'Fuchsia',
                     'Violet',
                     'Pink',
                     'Lavender',
                     'White',
                     'Silver',
                     'Gray',
                     ];

/**
 * Lenguaje en uso (dependiendo el idioma en opciones se usa uno u otro)
 */
var LANG;       //Textos del idioma

const DEFAULT_LANG = 'en'; //Idioma por defecto

var divClear = '<div style="clear:both;height:4px;"></div>';

var hr       = '<hr style="margin:4px 0;border-top-color:#111;' +
               'border-bottom-color:#444' +
               ';border-width:1px 0;' +
               'border-style:solid;display:block;">';

/**
 * Coloreado de mensajes
 */
var arrColorMessages = new Array();

/**
 * Compactador de batallas
 */
var arrColorBatalla = new Array(); // {CODE}, color, text

/**
*  Datos de flotas/defensas. LoadDatosFlota() lo inicializa.
*/
var arrDatosFlota = new Array(); //S.Name, L.Name, Metal, Cristal, Deuterio, Carga

/**
 * Den, Almacenes, produccion y recursos actuales
 */
var pMetal; var metal;
var pCristal; var cristal;
var pDeuterio; var deuterio;

/**
* Calculo de satelites necesarios
*/
var energyBalance;  //Produccion de energia excedente
var energyProduced; //Produccion de energia total
var energyPerSat;   //Produccion de energia por satelite

/**
* Tecnologia Ionica
*/
var lvlIonica;

/**
* Pagina actual
*/
var strPaginaActual;

/**
 * Opciones
 */
const LINK_NAME_LENGTH = 20;


var show_PayPal;                const SHOW_PAYPAL = true;
var link1_name;                 const LINK1_NAME = 'ToolsForOgame';
var link1_href;                 const LINK1_HREF = 'http://www.toolsforogame.com/';
var link2_name;                 const LINK2_NAME = 'OGame Calc';
var link2_href;                 const LINK2_HREF = 'http://proxyforgame.com/';
var link3_name;                 const LINK3_NAME = 'Infuza';
var link3_href;                 const LINK3_HREF = 'http://www.infuza.com/es/weekly/';
var link4_name;                 const LINK4_NAME = 'OSimulate';
var link4_href;                 const LINK4_HREF = 'http://www.osimulate.com';
var set_Clock_Links;            const SET_CLOCK_LINKS            = true;

var fix_Tooltips;               const FIX_TOOLTIPS               = true;
var show_Fleet_Resources;       const SHOW_FLEET_RESOURCES       = false;
var color_Metal;                const COLOR_METAL                = '#C0C0C0';
var color_Cristal;              const COLOR_CRISTAL              = '#00FFFF';
var color_Deuterio;             const COLOR_DEUTERIO             = '#00FF7F';
var show_Resources_Per_Fleet;   const SHOW_RESOURCES_PER_FLEET   = false;
var show_Empty_Space;           const SHOW_EMPTY_SPACE           = false;
var color_Empty_Space;          const COLOR_EMPTY_SPACE          ='#FFA500';
var show_Color_Flight_Slots;    const SHOW_COLOR_FLIGHT_SLOTS    = false;
var color_Slot_0;               const COLOR_SLOT_0               = '#DC143C';
var color_Slot_1;               const COLOR_SLOT_1               = '#FFA500';
var color_Slot_2;               const COLOR_SLOT_2               = '#FFFF00';
var color_Slot_3;               const COLOR_SLOT_3               = '#00FF7F';

var show_Load_Buttons;          const SHOW_LOAD_BUTTONS          = false;
var show_Return_Fleet_Question; const SHOW_RETURN_FLEET_QUESTION = false;
var remove_Adv;                 const REMOVE_ADV                 = false;
var show_Fleet_Content;         const SHOW_FLEET_CONTENT         = false;
var show_Dest_Player_Name;      const SHOW_DEST_PLAYER_NAME      = false;
var use_Direct_Spy;             const USE_DIRECT_SPY             = false;
var show_Auto_Expo_Fleet;       const SHOW_AUTO_EXPO_FLEET       = false;
var show_No_Escape;             const SHOW_NO_ESCAPE             = false;
var color_No_Escape;            const COLOR_NO_ESCAPE            = '#DC143C';
var color_Escape;               const COLOR_ESCAPE               = '#00FF7F';

var show_Time_Ships_Defenses;   const SHOW_TIME_SHIPS_DEFENSES   = true;
var show_Llenado_Almacenes;     const SHOW_LLENADO_ALMACENES     = true;
var color_M_Warehouse_0;        const COLOR_M_WAREHOUSE_0        = '#FA8072';
var color_C_Warehouse_0;        const COLOR_C_WAREHOUSE_0        = '#90EE90';
var color_D_Warehouse_0;        const COLOR_D_WAREHOUSE_0        = '#87CEFA';
var color_M_Warehouse_80;       const COLOR_M_WAREHOUSE_80       = '#DC143C';
var color_C_Warehouse_80;       const COLOR_C_WAREHOUSE_80       = '#9ACD32';
var color_D_Warehouse_80;       const COLOR_D_WAREHOUSE_80       = '#6495ED';
var color_M_Warehouse_100;      const COLOR_M_WAREHOUSE_100      = '#8B0000';
var color_C_Warehouse_100;      const COLOR_C_WAREHOUSE_100      = '#808000';
var color_D_Warehouse_100;      const COLOR_D_WAREHOUSE_100      = '#4169E1';
var color_M_Den_0;              const COLOR_M_DEN_0              = '#FA8072';
var color_C_Den_0;              const COLOR_C_DEN_0              = '#90EE90';
var color_D_Den_0;              const COLOR_D_DEN_0              = '#87CEFA';
var color_M_Den_80;             const COLOR_M_DEN_80             = '#DC143C';
var color_C_Den_80;             const COLOR_C_DEN_80             = '#9ACD32';
var color_D_Den_80;             const COLOR_D_DEN_80             = '#6495ED';
var color_M_Den_100;            const COLOR_M_DEN_100            = '#8B0000';
var color_C_Den_100;            const COLOR_C_DEN_100            = '#808000';
var color_D_Den_100;            const COLOR_D_DEN_100            = '#4169E1';

var show_Production_Ratio;      const SHOW_PRODUCTION_RATIO      = true;
var show_Resources_Info;        const SHOW_RESOURCES_INFO        = false;
var color_Res_Almacen;          const COLOR_RES_ALMACEN          = '#DAA520';
var color_Res_Den;              const COLOR_RES_DEN              = '#87CEFA';
var color_Res_Prod;             const COLOR_RES_PROD             = '#9ACD32';
var color_Energy_Used;          const COLOR_ENERGY_USED          = '#DC143C';
var show_Daily_Ships_Defenses;  const SHOW_DAILY_SHIPS_DEFENSES  = false;

var show_Uni_Name_In_Pillory;   const SHOW_UNI_NAME_IN_PILLORY   = true;
var disable_Useless_Stuff;      const DISABLE_USELESS_STUFF      = true;
var set_Focus_Correctly;        const SET_FOCUS_CORRECTLY        = true;
var disable_Star;               const DISABLE_STAR               = true;
var fix_Forum_Link;             const FIX_FORUM_LINK             = true;
var use_Short_Header;           const USE_SHORT_HEADER           = true;
var show_Confirm_Trader;        const SHOW_CONFIRM_TRADER        = true;
var show_Trade_Calculator;      const SHOW_TRADE_CALCULATOR      = false;
var show_Pranger_In_Header;     const SHOW_PRANGER_IN_HEADER     = false;
var show_Options_In_UserName;   const SHOW_OPTIONS_IN_USERNAME   = false;

var show_Link_Fixed;            const SHOW_LINK_FIXED            = false;
var highlight_Players;          const HIGHLIGHT_PLAYERS          = false;
var set_Fix_Action_Icons;       const SET_FIX_ACTION_ICONS       = true;

var show_Planet_Nav_Keys;       const SHOW_PLANET_NAV_KEYS       = false;
var show_Moons_Right;           const SHOW_MOONS_RIGHT           = false;
var show_Small_Planets;         const SHOW_SMALL_PLANETS         = false;
var show_Full_Planet;           const SHOW_FULL_PLANET           = false;
var color_Full_Planet_0;        const COLOR_FULL_PLANET_0        = '#DC143C';
var color_Full_Planet_1;        const COLOR_FULL_PLANET_1        = '#FFA500';
var color_Full_Planet_2;        const COLOR_FULL_PLANET_2        = '#FFFF00';
var color_Full_Planet_3;        const COLOR_FULL_PLANET_3        = '#00FF7F';
var show_Planeta_Activo;        const SHOW_PLANETA_ACTIVO        = true;

var show_Sats_Balance;          const SHOW_SATS_BALANCE          = false;
var show_Sats_Terraformer;      const SHOW_SATS_TERRAFORMER      = false;
var show_Sats_Graviton;         const SHOW_SATS_GRAVITON         = false;

var show_Efficiency;            const SHOW_EFFICIENCY            = false;
var show_Range;                 const SHOW_RANGE                 = false;
var show_Demolish;              const SHOW_DEMOLISH              = true;

var show_Shortcuts;             const SHOW_SHORTCUTS             = false;
var show_Key_Everywhere;        const SHOW_KEY_EVERYWHERE        = true;
var show_Key_Mailbox;           const SHOW_KEY_MAILBOX           = true;
var show_Key_Fleet;             const SHOW_KEY_FLEET             = true;
var show_Key_Trader;            const SHOW_KEY_TRADER            = true;

var current_Planet_Name;        const CURRENT_PLANET_NAME        = true;
var reply_CC;                   const REPLY_CC                   = false;
var show_BBCode;                const SHOW_BBCODE                = false;
var show_Smiles;                const SHOW_SMILES                = false;
var show_Message_Button_Left;   const SHOW_MESSAGE_BUTTON_LEFT   = false;
var show_Colored_Messages;      const SHOW_COLORED_MESSAGES      = false;

var show_Compactador_Batallas;  const SHOW_COMPACTADOR_BATALLAS  = false;
var show_Escombros_SAC;         const SHOW_ESCOMBROS_SAC         = true;
var modo_Reparto_SAC;           const MODO_REPARTO_SAC           = 1; // [0 = 'equal' | 1 = 'proportional']
var rec_Perdidas_SAC;           const REC_PERDIDAS_SAC           = false;

// ratio de conversiÃ³n de recursos a metal
var rat_Metal_SAC;              const RAT_METAL_SAC              = 2;
var rat_Cristal_SAC;            const RAT_CRISTAL_SAC            = 1.5;
var rat_Deuterio_SAC;           const RAT_DEUTERIO_SAC           = 1;

// porcentaje de recursos utilizados para obtener el deuterio de perdidas
var prop_Metal_SAC;             const PROP_METAL_SAC             = 60;
var prop_Cristal_SAC;           const PROP_CRISTAL_SAC           = 40;

// ocultar escombros o robos, si son inexexistentes, en CR para CC
var hide_Stolen_CR;             const HIDE_STOLEN_CR             = true;
var hide_Debris_CR;             const HIDE_DEBRIS_CR             = true;

var usar_CR_Friki;              const USAR_CR_FRIKI              = false;
var availCRFriki = false;

var id_Chat;                    const ID_CHAT                    = 0;
var show_Chat;                  const SHOW_CHAT                  = false;
var link_Chat;                  const LINK_CHAT                  = false;

var min_Escombros;              const MIN_ESCOMBROS              = 10000;
var show_Debris;                const SHOW_DEBRIS                = 3;

/**
 * Otros
 */
var unsafe;

if (navigator.userAgent.indexOf('Firefox')>-1)
{
    var FireFox = true;
}
else
{
    var FireFox = false;
}

// Google Chrome & Opera
if(! FireFox)
{
    function GM_getValue(key,defaultVal)
    {
         var retValue = localStorage.getItem(key);

         if ( ! retValue ) return defaultVal;
              return retValue;
    }

    function GM_setValue(key,value)
    {
         localStorage.setItem(key, value);
    }
}

/**
 *  SCRIPT LPuNKTKit
 */
function main()
{
  if (document.location.href.indexOf('ogame') < 0) return;

  getPaginaActual();

  if (DEBUG_MODE > 0) GM_log('main: ' + strPaginaActual);

  if ( (strPaginaActual=="unknown") ||
       (strPaginaActual=="techinfo") ||
       (strPaginaActual=="globalTechtree") ||
       (strPaginaActual=="techtree") ||
       (strPaginaActual=="buddies") ||
       (strPaginaActual=="notices") ||
       (strPaginaActual=="empire"))
  {
    //el script no funciona en estas paginas, por ahora.
    if (DEBUG_MODE > 0) GM_log('main >> Don\'t work pages: ' + strPaginaActual);
  }
  else if ((strPaginaActual=="home") ||
           (strPaginaActual=="combatreport") ||
           (strPaginaActual=="writemessage") ||
           (strPaginaActual=="search") ||
           (strPaginaActual=="pranger"))
  {
    if (DEBUG_MODE > 0) GM_log('main >> loadOptions: ' + strPaginaActual);

    loadOptions();

  }
  else
  {
    if (DEBUG_MODE > 0) GM_log('main >> initialize: ' + strPaginaActual);

    initialize();

    unsafe = window;
    try
    {
      unsafe = unsafeWindow
    }
    catch (e)
    {
    }

    if (((strPaginaActual =='defense') || (strPaginaActual =='shipyard') ||
         (strPaginaActual =='resources')) &&
        (show_Time_Ships_Defenses))
        setInterval(function() {loadResources();calculateTime();}, 500);

    switch (strPaginaActual) {
    case "traderOverview":
         if (DEBUG_MODE > 0) GM_log('main >> case trader: ' + strPaginaActual);

         setInterval( function () {
                         if (window.location.href.indexOf('page=traderResources') > -1) {
                            if (DEBUG_MODE > 0) GM_log('main >> case trader: ' + window.location.href);
                            ConfirmTrader();
                            TradeCalculator();
                         } else {
                            var myDiv = document.getElementById('lpk-Calculator');
                            if (myDiv) myDiv.parentNode.removeChild(myDiv);
                         }
                      }, 1000);

         break;

    case "resourceSettings":
         if (DEBUG_MODE > 0) GM_log('main >> case resourceSettings: ' + strPaginaActual);

         loadProduction();

         addWarehousesGraphic();

         if (EsPlaneta()) {
             addProductionRatio();
             shipsAndDefenses();
         }
         break;

    case "galaxy":

         if (DEBUG_MODE > 0) GM_log('main >> case galaxy: ' + strPaginaActual);

         HighlightPlayers();

         FixActionIcons();

         highlightDebris();

         ColorFlightSlots();

         break;

    case "movement":
         if (DEBUG_MODE > 0) GM_log('main >> case movement: ' + strPaginaActual);

         FixTooltips();

         EmptySpace();

         ResourcesPerFleet();

         ColorFlightSlots();

         ResourcesInFlight();

         ReturnFleetQuestion();

         DirectSpy();

         break;

    case "messages":
         if (DEBUG_MODE > 0) GM_log('main >> case messages: ' + strPaginaActual);

         ColoredSubjects();

         CurrentPlanetNameOnMessagesPages();

         ReplyCircularMessages();

         ColoredHeader();

         CompactadorBatallas();

         break;

/*    case "showmessage":
         if (DEBUG_MODE > 0) GM_log('main >> case showmessage: ' + strPaginaActual);

         ReplyCircularMessages();

         ColoredHeader();

         break;*/

    case "alliance":
         if (DEBUG_MODE > 0) GM_log('main >> case alliance: ' + strPaginaActual);

         ChatAlianza();

         break;

    case "flotten1":
    case "fleet1":
         if (DEBUG_MODE > 0) GM_log('main >> case fleet1: ' + strPaginaActual);

         ColorFlightSlots();
         FleetContents();
         showNoEscape();

         break;

    case "flotten2":
    case 'fleet2':
         if (DEBUG_MODE > 0) GM_log('main >> case fleet2: ' + strPaginaActual);

         FleetContents();

         break;

    case "flotten3":
    case "fleet3":
         if (DEBUG_MODE > 0) GM_log('main >> case fleet3: ' + strPaginaActual);

         DestinationPlayerName();
         QuitarAdvertencia();
         ResourceLoadButtons();
         FleetContents();

         break;

    case "station":
         if (DEBUG_MODE > 0) GM_log('main >> case station: ' + strPaginaActual);

         Efficiency();
         MissingSatsInprove('33');
         ShowIPMandPhalanxRange();
         InfoUnmount();
         DisableUselessStuff();

         break;

    case 'resources':
         if (DEBUG_MODE > 0) GM_log('main >> case resources: ' + strPaginaActual);

         MissingSats();
         InfoUnmount();
         DisableUselessStuff();

         break;

    case 'shipyard':
         if (DEBUG_MODE > 0) GM_log('main >> case shipyard: ' + strPaginaActual);

         MissingSats();
         DisableUselessStuff();

         break;

    case 'defense':
         if (DEBUG_MODE > 0) GM_log('main >> case defense: ' + strPaginaActual);

         ShowIPMandPhalanxRange();

         break;

    case 'research':
         if (DEBUG_MODE > 0) GM_log('main >> case research: ' + strPaginaActual);

         getLvlIonica();
         MissingSatsInprove('199');
         DisableUselessStuff();

         break;

    default:
         if (DEBUG_MODE > 0) GM_log('main >> case default: ' + strPaginaActual);

         break;
    } //switch
  } //else

  UniverseNameInPillory();

  MessageButtonLeft();

  BBCode();

  NewSmiles();

  SmallPlanets();

  ForumLink();

  ResourcesInfo();

  OgameOptionsInUserName();

  PrangerInHeader();

  ShortcutKeys();

  PlanetNavigationKeys();

  FocusCorrectly();

  QuitarEstrella(disable_Star);

  MoonsToRight();

  LinkFixed();

  showLinks();

  ShortHeader();

  AutoExpoFleet();

  ShowFullPlanet();

  PlanetaMoonActivo();

  mouseOverImageSwitch();

//StoreLangPack (LANG_EN, 'EN');
//StoreLangPack (LANG_FR, 'FR');
}

function replaceAll( text, str1, str2 ){
         var command = 'text.replace(/' + str1 + '/gi,\'' + str2 + '\')';
         return eval(command);
}

function extraerNumeroCadena(numero) {
   return numero.replace(/[^\d\.]/g,'');
}

function insertAfter(referenceNode, node){

        if (referenceNode.nextSibling)
            referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling)

        else
            referenceNode.parentNode.appendChild(node);
}

document.getElementsByClassName = function (cl)
{
    if (DEBUG_MODE > 1) GM_log('getElementsByClassName: ' + strPaginaActual);

    var retnode = [];
    var myclass = new RegExp ("\\b" + cl + "\\b");
    var elem = this.getElementsByTagName ("*");

    for (var i = 0; i < elem.length; i++)
    {
       var classes = elem [i].className;
       if (myclass.test (classes))
          retnode.push (elem [i]);
    }
    return retnode;
}

function getElementsByClass(searchClass,node,tag) {

    if (DEBUG_MODE > 1) GM_log('getElementsByClass: ' + strPaginaActual);

    var classElements = new Array();

    if (node == null)
        node = document;

    if (tag == null)
        tag = '*';

    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;

    for (var i = 0, j = 0; i < elsLen; i++) {

         var sep = els[i].className.split(" ");
         var content = false;

         for( var k = 0; k < sep.length; k++){

              if(sep[k] == searchClass)
                 content = true;
         }

         if (els[i].className == searchClass || content) {
             classElements[j] = els[i];
             j++;
         }
    }

    return classElements;
}

function addDots (n)
{
   if (DEBUG_MODE > 1) GM_log('addDots: ' + strPaginaActual);

   n += '';
   var rgx = /(\d+)(\d{3})/;

   while (rgx.test (n))
         n = n.replace (rgx, '$1' + '.' + '$2');

   return n;
}

function trim (myString)
{
         var myNewString = myString.replace(/^\s+/g,'').replace(/\s+$/g,'');

         if (DEBUG_MODE > 1) GM_log('trim: [ ' + myNewString + ' ] ' + strPaginaActual);

         return myNewString;
}

function roundNumber(num, dec) {
  var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
  return result;
}

function setStyleSet (strStyle) {
  try {
      if (DEBUG_MODE > 0) GM_log('setStyleSet: ' + strPaginaActual);

      var myStyle = document.createElement('style');
          myStyle.setAttribute('type', 'text/css');
          myStyle.appendChild(document.createTextNode(strStyle));

      if (window.opera)
          document.body.appendChild(myStyle)
      else
          document.head.appendChild(myStyle);

   } catch(e) {
         if (DEBUG_MODE != 0)  GM_log('setStyleSet [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function mouseOverImageSwitch()
{
    if (DEBUG_MODE > 1) GM_log('mouseOverImageSwitch: ' + strPaginaActual);


    $('img.lpunktkit-micon').bind(
        'mouseenter',
        function(){
            var tempSrc = $(this).attr('src');
            $(this).attr('src', $(this).attr('rel'));
            $(this).attr('rel', tempSrc);
        }
    ).bind(
        'mouseleave',
        function(){
            var tempSrc = $(this).attr('src');
            $(this).attr('src', $(this).attr('rel'));
            $(this).attr('rel', tempSrc);
        }
    );
}

function getPaginaActual()
{
  try {
      var myUrl = window.location + "";
      if (window.location.hostname == myUrl.substring(7).replace(/\//g,"") )
      {
        strPaginaActual = "home";
      }
      else
      {
        //averiguar en que apartado del juego estamos
        partes = myUrl.substring(myUrl.indexOf('?')+1).split("&");
        comienzos = myUrl.substring(0, myUrl.indexOf('?')).split("/");

        if (DEBUG_MODE > 0) GM_log('getPaginaActual: [ ' + partes + ' ]');

        if (comienzos[comienzos.length-1] == "index.php") {
          for (i = 0; i < partes.length; i++) {
               if (partes[i].indexOf('page=') >= 0) {
                   strPaginaActual_2 = partes[i].substring(partes[i].indexOf('=') + 1);
                   strPaginaActual = strPaginaActual_2.split('#')[0];

                   if (DEBUG_MODE > 0) GM_log('getPaginaActual: [ ' + strPaginaActual + ' ]');

                   break;
               }
          }

        } else if (myUrl.indexOf('/game/pranger.php') >= 0)
          strPaginaActual = "pranger";
        else
          strPaginaActual = "unknown";
      }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('getPaginaActual [ERROR]: <' + e + '> ');
   }
}

function getUniverse() {
   try {
         if (document.location.href.indexOf ('/game/index.php?') < 0)
             return;

         if (DEBUG_MODE > 0) GM_log('getUniverse: ' + strPaginaActual);

         var metas = document.getElementsByTagName('META');

         if (! metas) return;

         var i;
         for (i = 0; i < metas.length; i++)
              if (metas[i].getAttribute('NAME') == "ogame-universe")
                  break;

         if (metas[i])
             var strUniv = metas[i].getAttribute('CONTENT').replace(/\./g,'_').toUpperCase()

         else {
             var strUniv = document.location.href.split (/\//) [2];
                 strUniv = strUniv.replace(/\./g,'_').toUpperCase();
         }

         if (DEBUG_MODE > 0) GM_log('getUniverse: [ ' + strUniv + ' ] ' + strPaginaActual);

         return strUniv;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('getUniverse [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function getLanguage() {
   try {
         if (document.location.href.indexOf ('/game/index.php?') < 0)
             return;

         if (DEBUG_MODE > 0) GM_log('getLanguage: ' + strPaginaActual);

         var metas = document.getElementsByTagName('META');

         if (! metas) return;

         var i;
         for (i = 0; i < metas.length; i++)
              if (metas[i].getAttribute('NAME') == "ogame-language")
                  break;

         if (metas[i])
             var strLang = metas[i].getAttribute('CONTENT').toUpperCase()

         else
             var strLang = DEFAULT_LANG;

         if (DEBUG_MODE > 1) GM_log('getLanguage: [ ' + strLang + ' ] ' + strPaginaActual);

         return strLang;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('getLanguage [ERROR]: <' + e + '> ' + strPaginaActual);
   }

}

function getUniSpeed() {
   try {
         if (document.location.href.indexOf ('/game/index.php?') < 0)
             return;

         if (DEBUG_MODE > 0) GM_log('getUniSpeed: ' + strPaginaActual);

         var metas = document.getElementsByTagName('META');

         if (! metas) return;

         var i;
         for (i = 0; i < metas.length; i++)
              if (metas[i].getAttribute('NAME') == "ogame-universe-speed")
                  break;

         if (metas[i])
             var intSpeed = parseInt(metas[i].getAttribute('CONTENT'))

         else
             var intSpeed = 1;

         if (DEBUG_MODE > 1) GM_log('getUniSpeed: [ ' + intSpeed + ' ] ' + strPaginaActual);

         return intSpeed;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('getUniSpeed [ERROR]: <' + e + '> ' + strPaginaActual);
   }

}

function EsPlaneta() {
   try {
         if (document.location.href.indexOf ('/game/index.php?') < 0)
             return;

         if (DEBUG_MODE > 2) GM_log('EsPlaneta: ' + strPaginaActual);

         var metas = document.getElementsByTagName('META');

         if (! metas) return;

         var i;
         for (i = 0; i < metas.length; i++)
              if (metas[i].getAttribute('NAME') == "ogame-planet-type")
                  break;

         if (metas[i]) {
             if (DEBUG_MODE > 2) GM_log('EsPlaneta: [ ' + metas[i].getAttribute('CONTENT') + ' ] ' + strPaginaActual);

             return (metas[i].getAttribute('CONTENT').indexOf('planet')>=0);

         } else {
             if (DEBUG_MODE > 2) GM_log('EsPlaneta: [ DEFAULT false ] ' + strPaginaActual);

             return false;
         }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('EsPlaneta [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * devuelve "session=xxxxxxx"
 */
function getSession()
{
  try {
        if (DEBUG_MODE > 1) GM_log('getSession: ' + strPaginaActual);

        var arrSession = document.getElementsByTagName('ogame-session');

        if (arrSession[0])
        var strSess = 'session=' + arrSession[0].content

        else {
        var myUrl = window.location + "";
           myUrl = myUrl.replace("#","");

        var fragmento = myUrl.substring( myUrl.search("session=") );
        var partes = fragmento.split("&");

        var strSess = partes[0];
        }

        if (DEBUG_MODE > 2) GM_log('getSession: [ ' + strSess + ' ] ' + strPaginaActual);

        return strSess;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('getSession [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


function getVersionOgame() {
   try {
        if (DEBUG_MODE > 1) GM_log('getVersionOgame: ' + strPaginaActual);

        var arrVersion = [0,0,0];

        var oVersion = document.getElementsByName ("ogame-version");

        if (oVersion && (oVersion.length > 0))
        {
            arrVersion = oVersion [0].content.split (".");
        }

        if (DEBUG_MODE > 2) GM_log('getVersionOgame: [ ' + arrVersion + ' ] ' + strPaginaActual);

        return arrVersion;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('getVersionOgame [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function checkVersionOgame() {
   try {
      if (DEBUG_MODE > 1) GM_log('checkVersionOgame: ' + strPaginaActual);

      var oldVersion = false;

      //Comprobar version de oGame
      var arrVersion = getVersionOgame();
      if ( (parseInt(arrVersion[0]) < 2) ||
           ( (parseInt(arrVersion[0]) == 2) &&
             (parseInt(arrVersion[1]) < 3) ))
         oldVersion = true;

      if (DEBUG_MODE > 2) GM_log('checkVersionOgame: [ OldVersion = ' + oldVersion + ' ] ' + strPaginaActual);

      return oldVersion;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('checkVersionOgame [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function getLvlIonica()
{
   try {
        if (strPaginaActual != 'research')
            return;

        if (DEBUG_MODE != 0) GM_log('getLvlIonica: ' + strPaginaActual);

        var theA = document.getElementById('details121');

        if (theA == null)
            return;

        theSpans = theA.getElementsByTagName ("span");

        for (var j = 0; j < theSpans.length; j++)

             if (theSpans [j].className == "textlabel") {
                 var lvlIonica = parseInt (theSpans [j].nextSibling.textContent)

                 break;
             }

        if (DEBUG_MODE > 1) GM_log('getLvlIonica: Tech. Ionica = ' + lvlIonica + ' >> ' + strPaginaActual);

        GM_setValue("level_ionica" + strUniverse, lvlIonica);

   } catch(e) {
        if (DEBUG_MODE != 0) GM_log('getLvlIonica [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function initialize()
{
  if (DEBUG_MODE > 0) GM_log('initialize: ' + strPaginaActual);

  //carga de datos
  loadOptions();

  // Mostrar botones
  addOptions();
}

/**
 * Calcula la produccion por minuto y la carga en las variables globales
 */
function loadProduction()
{
  try {
      if ((strPaginaActual != 'defense') && (strPaginaActual != 'shipyard') &&
          (strPaginaActual != 'resources') && //Satelites balance 0
          (strPaginaActual != 'resourceSettings'))
          return;

      if (DEBUG_MODE > 1) GM_log('loadProduction: ' + strPaginaActual);

      var priTag;
      var ultTag;

      var resourcesText = document.body.innerHTML.substring (
                          document.body.innerHTML.indexOf('function initAjaxResourcebox'),
                          document.body.innerHTML.indexOf('function getAjaxEventbox'));


      // Metal
      var res = resourcesText.substring (
                              resourcesText.indexOf('metal'),
                              resourcesText.indexOf('crystal'));

      var myMatch = res.split('<td>')[3];

      priTag = myMatch.indexOf('>');
      ultTag = myMatch.indexOf('<', priTag);
      myMatch = myMatch.substring(priTag + 1, ultTag);

      pMetal = myMatch.replace(/\./g,"");
      pMetal = parseInt(pMetal);
      pMetal = pMetal/60; //produccion por minuto

      // Cristal
      res = resourcesText.substring (
                          resourcesText.indexOf('crystal'),
                          resourcesText.indexOf('deuterium'));

      myMatch = res.split('<td>')[3];

      priTag = myMatch.indexOf('>');
      ultTag = myMatch.indexOf('<', priTag);
      myMatch = myMatch.substring(priTag + 1, ultTag);

      pCristal = myMatch.replace(/\./g,"");
      pCristal = parseInt(pCristal);
      pCristal = pCristal/60; //produccion por minuto

      // deuterium
      res = resourcesText.substring (
                          resourcesText.indexOf('deuterium'),
                          resourcesText.indexOf('energy'));

      myMatch = res.split('<td>')[3];

      priTag = myMatch.indexOf('>');
      ultTag = myMatch.indexOf('<', priTag);
      myMatch = myMatch.substring(priTag + 1, ultTag);

      pDeuterio = myMatch.replace(/\./g,"");
      pDeuterio = parseInt(pDeuterio);
      pDeuterio = pDeuterio/60; //produccion por minuto

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('loadProduction [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Carga los recursos existentes en las variables globales
 */
function loadResources()
{
  try {
     if ((strPaginaActual != 'defense') && (strPaginaActual != 'shipyard') &&
         (strPaginaActual != 'resources') && //Satelites balance 0
         (strPaginaActual != 'resourceSettings') &&
         (strPaginaActual != 'flotten1') && // No Scape
         (strPaginaActual != 'fleet1') )
         return;

     if (DEBUG_MODE > 1) GM_log('loadResources: ' + strPaginaActual);

     metal = trim( document.getElementById('resources_metal').innerHTML.replace(/\./g,""));
     cristal = trim( document.getElementById('resources_crystal').innerHTML.replace(/\./g,""));
     deuterio = trim( document.getElementById('resources_deuterium').innerHTML.replace(/\./g,""));

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('loadResources [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Agrega los graficos de ocupacion de almacenes en el apartado de recursos
 */
function addWarehousesGraphic()
{
  try {
         if (strPaginaActual != "resourceSettings") return;

         if (! show_Llenado_Almacenes) return;

         if (DEBUG_MODE > 0) GM_log('addWarehouseGraphic: ' + strPaginaActual);

         /**
         * Tiempos de llenado de almacenes
         */
         var tAlmMetal; var tAlmCristal; var tAlmDeuterio;
         var tDenMetal; var tDenCristal; var tDenDeuterio;

         /**
         * Capacidad de almacenes
         */
         var aMetal; var aCristal; var aDeuterio;
         var dMetal; var dCristal; var dDeuterio;

         /**
         * Carga los valores de capacidad de almacenes
         */
         function loadWarehouses()
         {
              try {
                   if (DEBUG_MODE > 1) GM_log('addWarehouseGraphic >> loadWarehouses: ' + strPaginaActual);

                   var priTag;
                   var ultTag;

                   var resourcesText = document.body.innerHTML.substring (
                          document.body.innerHTML.indexOf('function initAjaxResourcebox'),
                          document.body.innerHTML.indexOf('function getAjaxEventbox'));


                   // Metal
                   var res = resourcesText.substring (
                              resourcesText.indexOf('metal'),
                              resourcesText.indexOf('crystal'));

                   var myMatch = res.split('<td>')[2];

                   priTag = myMatch.indexOf('>');
                   ultTag = myMatch.indexOf('<', priTag);
                   myMatch = myMatch.substring(priTag + 1, ultTag);

                   aMetal = myMatch.replace(/\./g,"");
                   aMetal = parseInt(aMetal);

                   // Cristal
                   res = resourcesText.substring (
                              resourcesText.indexOf('crystal'),
                              resourcesText.indexOf('deuterium'));

                   myMatch = res.split('<td>')[2];

                   priTag = myMatch.indexOf('>');
                   ultTag = myMatch.indexOf('<', priTag);
                   myMatch = myMatch.substring(priTag + 1, ultTag);

                   aCristal = myMatch.replace(/\./g,"");
                   aCristal = parseInt(aCristal);

                   // Deuterio
                   res = resourcesText.substring (
                              resourcesText.indexOf('deuterium'),
                              resourcesText.indexOf('energy'));

                   myMatch = res.split('<td>')[2];

                   priTag = myMatch.indexOf('>');
                   ultTag = myMatch.indexOf('<', priTag);
                   myMatch = myMatch.substring(priTag + 1, ultTag);

                   aDeuterio = myMatch.replace(/\./g,"");
                   aDeuterio = parseInt(aDeuterio);

                   if (getVersionOgame()[0] == 3) {
                       dMetal = theMetal[3].substring(theMetal[3].indexOf('>')+1).replace("</span>",'');
                       dMetal = parseInt(dMetal);

                       dCristal = theCristal[3].substring(theCristal[3].indexOf('>')+1).replace("</span>",'');
                       dCristal = parseInt(dCristal);

                       dDeuterio = theDeuterio[3].substring(theDeuterio[3].indexOf('>')+1).replace("</span>",'');
                       dDeuterio = parseInt(dDeuterio);
                   }

              } catch(e) {
                  if (DEBUG_MODE != 0) GM_log('addWarehouseGraphic >> loadWarehouses [ERROR]: <' + e + '> ' + strPaginaActual);
              }
         }

         /**
         * Calcula el tiempo de llenado de los almacenes
         */
         function calculateWarehouses()
         {
              try {
                   if (DEBUG_MODE > 1) GM_log('addWarehouseGraphic >> calculateWarehouses: ' + strPaginaActual);

                   tAlmMetal = ((aMetal - metal)/pMetal)*60/getUniSpeed();
                   tAlmCristal = ((aCristal - cristal)/pCristal)*60/getUniSpeed();
                   tAlmDeuterio = ((aDeuterio - deuterio)/pDeuterio)*60/getUniSpeed();

                   if (getVersionOgame()[0] == 3) {
                       tDenMetal = ((dMetal - metal)/pMetal)*60/getUniSpeed();
                       tDenCristal = ((dCristal - cristal)/pCristal)*60/getUniSpeed();
                       tDenDeuterio = ((dDeuterio - deuterio)/pDeuterio)*60/getUniSpeed();
                   }

              } catch(e) {
                   if (DEBUG_MODE != 0) GM_log('addWarehouseGraphic >> calculateWarehouses [ERROR]: <' + e + '> ' + strPaginaActual);
              }
         }

         function generateDivAlmacen (strRecurso, blnPlaneta, intTAlmacen, strFontColor, strBackColor, dblPorcentaje) {

              var myDiv = document.createElement('div');
                  myDiv.appendChild(document.createTextNode(strRecurso));

              if (blnPlaneta)
                  myDiv.appendChild(document.createTextNode(' (' + secondsToTime(intTAlmacen) + '):'))
              else
                  myDiv.appendChild(document.createTextNode(':'));

              var myDivBack = document.createElement('div');
                  myDivBack.setAttribute('style', 'float:right;width:400px;height:15px;' +
                                                  'border:1px solid ' + strBackColor + ';' +
                                                  'background-color:DarkSlateGray;');

              myDiv.appendChild(myDivBack);

              var myDivFront = document.createElement('div');
                  myDivFront.setAttribute('style', 'background-color:' + strBackColor + ';height:100%;' +
                                                   'width:' + dblPorcentaje + '%;text-align:center;');

              myDivBack.appendChild(myDivFront);

              var mySpan = document.createElement('span');
                  mySpan.setAttribute('style', 'color:' + strFontColor + ';font-weight:bold;');

                  mySpan.appendChild(document.createTextNode(' ' + dblPorcentaje + '%'));

              myDivFront.appendChild(mySpan);

              var divClear = document.createElement('div');
                  divClear.setAttribute('style', 'clear:both;height:4px;');

              myDiv.appendChild(divClear);

              return myDiv;

         }

         loadResources();
         loadWarehouses();
         calculateWarehouses();

         colorM = color_M_Warehouse_0; //'Salmon';
         colorC = color_C_Warehouse_0; //'LightGreen';
         colorD = color_D_Warehouse_0; //'LightSkyBlue'; //"#9C0";

         colorFM = colorFC = colorFD = 'black';

         porcentajeMetal = roundNumber((metal*100)/aMetal,2);
         if (porcentajeMetal>=100) {
           porcentajeMetal=100;
           colorM = color_M_Warehouse_100; //'DarkRed ';//"#C00";
         }
         else if (porcentajeMetal>80)
         {
           colorM = color_M_Warehouse_80; //'crimson';//"#ea8700";
         }

         porcentajeCristal = roundNumber((cristal*100)/aCristal, 2);
         if (porcentajeCristal>=100) {
           porcentajeCristal=100;
           colorC = color_C_Warehouse_100; //'Olive';//"#C00";
         }
         else if (porcentajeCristal>80)
         {
           colorC = color_C_Warehouse_80; //'YellowGreen';//"#ea8700";
         }

         porcentajeDeuterio = roundNumber((deuterio*100)/aDeuterio, 2);
         if (porcentajeDeuterio>=100) {
           porcentajeDeuterio=100;
           colorD = color_D_Warehouse_100; //'RoyalBlue';//"#C00";
         }
         else if (porcentajeDeuterio>80)
         {
           colorD = color_M_Warehouse_80; //'CornflowerBlue';//"#ea8700";
         }

         if (getVersionOgame()[0]==3) {
             colorDM = color_M_Den_0; //'Salmon';
             colorDC = color_C_Den_0; //'LightGreen';
             colorDD = color_D_Den_0; //'LightSkyBlue';

             porcentajeDMetal = roundNumber((metal*100)/dMetal, 2);
             if (porcentajeDMetal>=100) {
                 porcentajeDMetal=100;
                 colorDM = color_M_Den_100; //'DarkRed ';
             }
             else if (porcentajeDMetal>80)
             {
                  colorDM = color_M_Den_80; //'crimson';
             }

             porcentajeDCristal = roundNumber((cristal*100)/dCristal, 2);
             if (porcentajeDCristal>=100) {
                 porcentajeDCristal=100;
                 colorDC = color_C_Den_100; //'Olive';
             }
             else if (porcentajeDCristal>80)
             {
               colorDC = color_C_Den_80; //'YellowGreen';
             }

             porcentajeDDeuterio = roundNumber((deuterio*100)/dDeuterio, 2);
             if (porcentajeDDeuterio>=100) {
                 porcentajeDDeuterio=100;
                 colorDD = color_D_Den_100; //'RoyalBlue';
             }
             else if (porcentajeDDeuterio>80)
             {
                  colorDD = color_D_Den_80; //'CornflowerBlue';
             }
         }

         var objVacation = getElementsByClass('tipsTitleAdvice',document,'a')[0];
         if (objVacation != null) var blnVacation = (objVacation.getAttribute('title').indexOf('Vacation') > -1)
         else var blnVacation = false;

         var blnPlaneta = EsPlaneta() && (! blnVacation);

         var divAlmacenes = document.createElement('div');
             divAlmacenes.setAttribute('style', 'margin:10px auto;width:90%;font-size:10px;' +
                                                'max-width:610px;');

         var divClear = document.createElement('div');
             divClear.setAttribute('style', 'clear:both;height:4px;');

             divAlmacenes.appendChild(divClear);

         var divRight = document.createElement('div');
             divRight.setAttribute('align', 'right');

         divAlmacenes.appendChild(divRight);

         var myFont = document.createElement('font');
             myFont.setAttribute('style', 'color:#FF6600;font-weight:bold;');
             myFont.size = 4;

             myFont.appendChild(document.createTextNode('* ' + LANG.MISC.txt_Warehouses + ' *'));

         divRight.appendChild(myFont);

         divRight.appendChild(divClear.cloneNode(true));
         divRight.appendChild(divClear.cloneNode(true));
         divRight.appendChild(divClear.cloneNode(true));

         divAlmacenes.appendChild(generateDivAlmacen (LANG.SERVER.txt_RES_metal,
                                                      blnPlaneta,
                                                      tAlmMetal,
                                                      colorFM,
                                                      colorM,
                                                      porcentajeMetal));

         divAlmacenes.appendChild(generateDivAlmacen (LANG.SERVER.txt_RES_cristal,
                                                      blnPlaneta,
                                                      tAlmCristal,
                                                      colorFC,
                                                      colorC,
                                                      porcentajeCristal));

         divAlmacenes.appendChild(generateDivAlmacen (LANG.SERVER.txt_RES_deuterio,
                                                      blnPlaneta,
                                                      tAlmDeuterio,
                                                      colorFD,
                                                      colorD,
                                                      porcentajeDeuterio));

         document.getElementsByClassName('mainRS')[0].appendChild(divAlmacenes);

         if ( (getVersionOgame()[0]==3) &&
              ((dMetal > 0) || (dCristal > 0) || (dDeuterio > 0)) )
         {
            var hr = document.createElement('hr');
                hr.setAttribute('style', 'margin:4px 0;border-top-color:#111;' +
                                         'border-bottom-color:#444;' +
                                         'border-width:1px 0;' +
                                         'border-style:solid;display:block;');

                divAlmacenes.appendChild(hr);

                divAlmacenes.appendChild(divClear.cloneNode(true))

            var divRight2 = document.createElement('div');
                divRight2.setAttribute('align', 'right');

            var myFont2 = document.createElement('font');
                myFont2.setAttribute('style', 'color:#FF6600;font-weight:bold;');
                myFont2.size = 4;

                myFont2.appendChild(document.createTextNode('* ' + LANG.MISC.txt_Dens + ' *'));

            divRight2.appendChild(myFont2);

            divAlmacenes.appendChild(divRight2);

            divAlmacenes.appendChild(divClear.cloneNode(true));
            divAlmacenes.appendChild(divClear.cloneNode(true));
            divAlmacenes.appendChild(divClear.cloneNode(true));

            if (dMetal > 0) // Escondite de metal
                divAlmacenes.appendChild(generateDivAlmacen (LANG.SERVER.txt_RES_metal,
                                                             blnPlaneta,
                                                             tDenMetal,
                                                             colorFM,
                                                             colorDM,
                                                             porcentajeDMetal));

            if (dCristal > 0) // Escondite de cristal
                divAlmacenes.appendChild(generateDivAlmacen (LANG.SERVER.txt_RES_cristal,
                                                             blnPlaneta,
                                                             tDenCristal,
                                                             colorFC,
                                                             colorDC,
                                                             porcentajeDCristal));

            if (dDeuterio > 0) // Escondite de deuterio
                divAlmacenes.appendChild(generateDivAlmacen (LANG.SERVER.txt_RES_deuterio,
                                                             blnPlaneta,
                                                             tDenDeuterio,
                                                             colorFD,
                                                             colorDD,
                                                             porcentajeDDeuterio));

            divAlmacenes.appendChild(divClear.cloneNode(true));

         }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('addWarehousesGraphic [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Agrega info de produccion ideal al apartado de recursos
 */
function addProductionRatio()
{
  try {
       if (strPaginaActual != "resourceSettings") return;

       if (! show_Production_Ratio) return;

       if (DEBUG_MODE > 0) GM_log('addProductionRatio: ' + strPaginaActual);

       var colorM = "green"; var colorC = "green"; var colorD = "green";

       // Produccion "ideal" regla 3:2:1
       // tomamos como referencia el metal
       var pMetalIdeal = pMetal;

       var pCristalIdeal;

       if (pMetal > 0)
           pCristalIdeal = (pMetalIdeal/3)*2
       else
           pCristalIdeal = pCristal;

       var pDeuterioIdeal;

       if (pMetal > 0)
           pDeuterioIdeal = pMetalIdeal/3
       else if (pCristal > 0)
           pDeuterioIdeal = pCristalIdeal/2
       else
           pDeuterioIdeal = pDeuterio;

       if (pMetal < pMetalIdeal) colorM = "#D29D00";
       if (pCristal < pCristalIdeal) colorC = "#D29D00";
       if (pDeuterio < pDeuterioIdeal) colorD = "#D29D00";

       var myTr = document.createElement('tr');

       var myTdLabel = document.createElement('td');
           myTdLabel.setAttribute('class', 'label');
           myTdLabel.setAttribute('colspan', 2);
           myTdLabel.setAttribute('style', 'font-size:92%;');

           myTdLabel.appendChild(document.createTextNode(LANG.MISC.txt_prod321 + ':'));

       myTr.appendChild(myTdLabel);

       var myTdUndermark = document.createElement('td');
           myTdUndermark.setAttribute('class', 'undermark');

       var mySpan1 = document.createElement('span');
           mySpan1.setAttribute('style', 'color:' + colorM + ';');
           mySpan1.appendChild(document.createTextNode(addDots(Math.ceil(pMetalIdeal*60))));

       myTdUndermark.appendChild(mySpan1);

       myTr.appendChild(myTdUndermark);

       var myTdUndermark2 = myTdUndermark.cloneNode(false);

       myTr.appendChild(myTdUndermark2);

       var mySpan2 = document.createElement('span');
           mySpan2.setAttribute('style', 'color:' + colorC + ';');
           mySpan2.appendChild(document.createTextNode(addDots(Math.ceil(pCristalIdeal*60))));

       myTdUndermark2.appendChild(mySpan2);

       var myTdUndermark3 = myTdUndermark.cloneNode(false);

       myTr.appendChild(myTdUndermark3);

       var mySpan3 = document.createElement('span');
           mySpan3.setAttribute('style', 'color:' + colorD + ';');
           mySpan3.appendChild(document.createTextNode(addDots(Math.ceil(pDeuterioIdeal*60))));

       myTdUndermark3.appendChild(mySpan3);

       var theTrSummary = getElementsByClass('summary', document, 'tr')[0];

       insertAfter(theTrSummary, myTr);
   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('addProductionRatio [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Calcula numero de naves por dia en funcion de la produccion
 */
function shipsAndDefenses()
{
  try {
        if (strPaginaActual != "resourceSettings") return;

        if (! show_Daily_Ships_Defenses) return;

        if (DEBUG_MODE > 0) GM_log('shipsAndDefensese: ' + strPaginaActual);

        /**
        * Produccion diaria
        */
        var metalAlDia; var cristalAlDia; var deuterioAlDia;

        /**
        * Calcula cuantas unidades de "objeto" se pueden hacer con los recursos diarios
        */
        function perDay(objeto)
        {
             try {
                  if (DEBUG_MODE > 1) GM_log('shipsAndDefensese >> perDay: ' + strPaginaActual);

                  var x = -1;
                  var dia = new Array();
                      dia[0] = (objeto.metal==0) ? -1 : Math.floor(metalAlDia/objeto.metal);
                      dia[1] = (objeto.cristal==0) ? -1 : Math.floor(cristalAlDia/objeto.cristal);
                      dia[2] = (objeto.deuterio==0) ? -1 : Math.floor(deuterioAlDia/objeto.deuterio);

                  for (i=0; i < 3; i++)
                  {
                       if(dia[i] > -1)
                       {
                          if ( (dia[i] < x) || (x==-1) )
                                x = dia[i];
                       }
                  }

                  //podemos hacer x al dia, eso cuanto cuesta en total?
                  objeto.totalMetalDia = objeto.metal*x;
                  objeto.totalCristalDia = objeto.cristal*x;
                  objeto.totalDeuterioDia = objeto.deuterio*x;
                  objeto.alDia = x;

             } catch(e) {
                  if (DEBUG_MODE != 0) GM_log('shipsAndDefensese >> perDay [ERROR]: <' + e + '> ' + strPaginaActual);
             }
        }

        /**
        * Espera 1 segundo antes de calcular nada
        */
        function showDailyUnits (naves,defensas)
        {
             try {
                  if (DEBUG_MODE > 1) GM_log('shipsAndDefensese >> showDailyUnits: ' + strPaginaActual);

                  function showDailyUnitsTable(listaObjetos)
                  {
                       try {
                            if (DEBUG_MODE > 2) GM_log('shipsAndDefensese >> showDailyUnits >> showDailyUnitsTable: ' + strPaginaActual);

//                            var myDiv = document.getElementById('unidadesDiarias');
                                myDiv.style.display = 'none';

                            var myTable = document.createElement('table');
                                myTable.setAttribute('style', 'font-size:10px;');

                            var myTr = document.createElement('tr');

                                myTable.appendChild(myTr);

                            var myTd16 = document.createElement('td');
                                myTd16.setAttribute('width', '16%');

                                myTr.appendChild(myTd16.cloneNode(true));
                                myTr.appendChild(myTd16.cloneNode(true));
                                myTr.appendChild(myTd16.cloneNode(true));
                                myTr.appendChild(myTd16.cloneNode(true));
                                myTr.appendChild(myTd16.cloneNode(true));
                                myTr.appendChild(myTd16.cloneNode(true));

                            var myTr2 = myTr.cloneNode(false);

                                myTable.appendChild(myTr2);

                            var myTd6 = document.createElement('td');
                                myTd6.setAttribute('colspan', '6');

                                myTr2.appendChild(myTd6);

                            var myFont = document.createElement('font');
                                myFont.setAttribute('style', 'color:#FF6600;size=4;font-weight:bold;');

                                myTd6.appendChild(myFont);

                                myFont.appendChild(document.createTextNode('* ' + LANG.MISC.txt_produccionPlanetaria + ' *'));

                                myTd6.appendChild(document.createElement('br'));
                                myTd6.appendChild(document.createElement('br'));

                            var myTr3 = myTr.cloneNode(false);

                                myTable.appendChild(myTr3);

                            var myTd2 = document.createElement('td');
                                myTd2.setAttribute('colspan', '2');

                                myTr3.appendChild(myTd2);

                            var myTdLabel = document.createElement('td');
                                myTdLabel.setAttribute('class', 'label');
                                myTdLabel.appendChild(document.createTextNode(LANG.MISC.txt_produccion));

                                myTr3.appendChild(myTdLabel);

                            var myTd3Label = myTdLabel.cloneNode(false);
                                myTd3Label.setAttribute('colspan', '3');

                                myTr3.appendChild(myTd3Label);

                            var myCenter = document.createElement('center');

                                myTd3Label.appendChild(myCenter);

                                myCenter.appendChild(document.createTextNode(LANG.MISC.txt_excedente));

                            var myTr4 = myTr.cloneNode(false);

                                myTable.appendChild(myTr4);

                            var myTd2Label = myTdLabel.cloneNode(false);
                                myTd2Label.setAttribute('colspan', '2');

                                myTr4.appendChild(myTd2Label);

                                myTdLabel = myTdLabel.cloneNode(false);
                                myTdLabel.appendChild(document.createTextNode(LANG.MISC.txt_porDia));
                                myTr4.appendChild(myTdLabel);

                                myTdLabel = myTdLabel.cloneNode(false);
                                myTdLabel.appendChild(document.createTextNode(LANG.SERVER.txt_RES_metal));
                                myTr4.appendChild(myTdLabel);

                                myTdLabel = myTdLabel.cloneNode(false);
                                myTdLabel.appendChild(document.createTextNode(LANG.SERVER.txt_RES_cristal));
                                myTr4.appendChild(myTdLabel);

                                myTdLabel = myTdLabel.cloneNode(false);
                                myTdLabel.appendChild(document.createTextNode(LANG.SERVER.txt_RES_deuterio));
                                myTr4.appendChild(myTdLabel);

                            var myTdUndermark = document.createElement('td');
                                myTdUndermark.setAttribute('class', 'undermark');

                            for( i = 0; i < listaObjetos.length; i++)
                            {
                                obj = listaObjetos[i];

                                myTr5 = myTr.cloneNode(false);
                                if (i%2 == 0) myTr5.setAttribute('class', 'alt');

                                myTable.appendChild(myTr5);

                                var myTdLabel = myTd2Label.cloneNode(false);
                                    myTdLabel.appendChild(document.createTextNode(obj.nombre));

                                    myTr5.appendChild(myTdLabel);

                                var myTdUndermark = myTdUndermark.cloneNode(false);
                                    myTdUndermark.appendChild(document.createTextNode(obj.alDia));

                                    myTr5.appendChild(myTdUndermark);

                                var myTd = myTd16.cloneNode(false);
                                    myTd.appendChild(document.createTextNode(addDots(metalAlDia-obj.totalMetalDia)));

                                    myTr5.appendChild(myTd);

                                var myTd = myTd16.cloneNode(false);
                                    myTd.appendChild(document.createTextNode(addDots(cristalAlDia-obj.totalCristalDia)));

                                    myTr5.appendChild(myTd);

                                var myTd = myTd16.cloneNode(false);
                                    myTd.appendChild(document.createTextNode(addDots(deuterioAlDia-obj.totalDeuterioDia)));

                                    myTr5.appendChild(myTd);

                            }

                            for (i=(myDiv.childNodes.length-1); i >= 0; i--)
                                 myDiv.removeChild(myDiv.childNodes[i]);

                                myDiv.appendChild(myTable);
                                myDiv.style.display = 'block';

                       } catch(e) {
                            if (DEBUG_MODE != 0)
                                GM_log('shipsAndDefensese >> showDailyUnits >> showDailyUnitsTable [ERROR]: ' +
                                       '<' + e + '> ' + strPaginaActual);
                       }
                  }

                  //creamos el contenedor
                  var divContenedor = document.createElement('div');
                      divContenedor.setAttribute('id', 'contenedor');
                      divContenedor.setAttribute('style', 'width:90%;margin:0 auto;');

                  var theMainRs = getElementsByClass('mainRS', document, 'div')[0];
                      theMainRs.appendChild(divContenedor);

                  //creamos los enlaces para mostrar naves/defensas
                  //link de flota
                  var linkFlota = window.document.createElement('a');
                      linkFlota.setAttribute('href', '#unidadesDiarias');
                      linkFlota.textContent = LANG.MISC.txt_flota;
                      linkFlota.style.color = strColor_LPuNKTKit;
                      linkFlota.style.textDecoration = 'overline';
                      linkFlota.setAttribute('onmouseover', 'this.style.textDecoration="none"');
                      linkFlota.setAttribute('onmouseout', 'this.style.textDecoration="overline"');
                      linkFlota.style.margin = "5px 10px";
                      linkFlota.addEventListener('click',
                                                 function() {showDailyUnitsTable(naves);},
                                                 false);

                  //link de defensa
                  var linkDefensa = window.document.createElement('a');
                      linkDefensa.setAttribute('href', '#unidadesDiarias');
                      linkDefensa.textContent = LANG.MISC.txt_defensa;
                      linkDefensa.style.color = strColor_LPuNKTKit;
                      linkDefensa.style.textDecoration = 'overline';
                      linkDefensa.setAttribute('onmouseover', 'this.style.textDecoration="none"');
                      linkDefensa.setAttribute('onmouseout', 'this.style.textDecoration="overline"');
                      linkDefensa.style.margin = "5px 10px";
                      linkDefensa.addEventListener('click',
                                                   function() {showDailyUnitsTable(defensas);},
                                                   false);

                  divContenedor.appendChild(linkFlota);
                  divContenedor.appendChild(linkDefensa);

                  var myDiv = document.createElement('div');
                      myDiv.setAttribute('id', 'unidadesDiarias');
                      myDiv.setAttribute('style', 'display:none;');

                  divContenedor.appendChild(myDiv);

             } catch(e) {
                  if (DEBUG_MODE != 0) GM_log('shipsAndDefensese >> showDailyUnits [ERROR]: <' + e + '> ' + strPaginaActual);
             }
        }

        LoadDatosFlota(false);

        metalAlDia = pMetal*60*24;
        cristalAlDia = pCristal*60*24;
        deuterioAlDia = pDeuterio*60*24;

        //con estos recursos, que naves podemos hacer?
        var naves = new Array();
        //sondas
        var sonda = new Object;
            sonda.nombre   = arrDatosFlota[12][1]; //LANG.SERVER.txt_SHIP_LG_sonda;
            sonda.metal    = arrDatosFlota[12][2];
            sonda.cristal  = arrDatosFlota[12][3];
            sonda.deuterio = arrDatosFlota[12][4];
        perDay(sonda);
        naves.push(sonda);

        //satelites
        var satelite = new Object;
            satelite.nombre   = arrDatosFlota[13][1];//LANG.SERVER.txt_SHIP_LG_satelite;
            satelite.metal    = arrDatosFlota[13][2];
            satelite.cristal  = arrDatosFlota[13][3];
            satelite.deuterio = arrDatosFlota[13][4];
        perDay(satelite);
        naves.push(satelite);

        //npc
        var npc = new Object;
            npc.nombre   = arrDatosFlota[0][1];//LANG.SERVER.txt_SHIP_LG_npc;
            npc.metal    = arrDatosFlota[0][2];
            npc.cristal  = arrDatosFlota[0][3];
            npc.deuterio = arrDatosFlota[0][4];
        perDay(npc);
        naves.push(npc);

        //ngc
        var ngc = new Object;
            ngc.nombre   = arrDatosFlota[1][1];//LANG.SERVER.txt_SHIP_LG_ngc;
            ngc.metal    = arrDatosFlota[1][2];
            ngc.cristal  = arrDatosFlota[1][3];
            ngc.deuterio = arrDatosFlota[1][4];
        perDay(ngc);
        naves.push(ngc);

        //colonizadores
        var coloniza = new Object;
            coloniza.nombre   = arrDatosFlota[10][1];//LANG.SERVER.txt_SHIP_LG_colonizador;
            coloniza.metal    = arrDatosFlota[10][2];
            coloniza.cristal  = arrDatosFlota[10][3];
            coloniza.deuterio = arrDatosFlota[10][4];
        perDay(coloniza);
        naves.push(coloniza);

        //recicladores
        var reciclador = new Object;
            reciclador.nombre   = arrDatosFlota[11][1];//LANG.SERVER.txt_SHIP_LG_reciclador;
            reciclador.metal    = arrDatosFlota[11][2];
            reciclador.cristal  = arrDatosFlota[11][3];
            reciclador.deuterio = arrDatosFlota[11][4];
        perDay(reciclador);
        naves.push(reciclador);

        //cazas ligeros
        var cl = new Object;
            cl.nombre   = arrDatosFlota[2][1];//LANG.SERVER.txt_SHIP_LG_cl;
            cl.metal    = arrDatosFlota[2][2];
            cl.cristal  = arrDatosFlota[2][3];
            cl.deuterio = arrDatosFlota[2][4];
        perDay(cl);
        naves.push(cl);

        //cazas pesados
        var cp = new Object;
            cp.nombre   = arrDatosFlota[3][1];//LANG.SERVER.txt_SHIP_LG_cp;
            cp.metal    = arrDatosFlota[3][2];
            cp.cristal  = arrDatosFlota[3][3];
            cp.deuterio = arrDatosFlota[3][4];
        perDay(cp);
        naves.push(cp);

        //cruceros
        var crucero = new Object;
            crucero.nombre   = arrDatosFlota[4][1];//LANG.SERVER.txt_SHIP_LG_crucero;
            crucero.metal    = arrDatosFlota[4][2];
            crucero.cristal  = arrDatosFlota[4][3];
            crucero.deuterio = arrDatosFlota[4][4];
        perDay(crucero);
        naves.push(crucero);

        //naves de batalla
        var nb = new Object;
            nb.nombre   = arrDatosFlota[5][1];//LANG.SERVER.txt_SHIP_LG_nb;
            nb.metal    = arrDatosFlota[5][2];
            nb.cristal  = arrDatosFlota[5][3];
            nb.deuterio = arrDatosFlota[5][4];
        perDay(nb);
        naves.push(nb);

        //acorazados
        var acorazado = new Object;
            acorazado.nombre   = arrDatosFlota[6][1];//LANG.SERVER.txt_SHIP_LG_acorazado;
            acorazado.metal    = arrDatosFlota[6][2];
            acorazado.cristal  = arrDatosFlota[6][3];
            acorazado.deuterio = arrDatosFlota[6][4];
        perDay(acorazado);
        naves.push(acorazado);

        //bombarderos
        var bombardero = new Object;
            bombardero.nombre   = arrDatosFlota[7][1];//LANG.SERVER.txt_SHIP_LG_bombardero;
            bombardero.metal    = arrDatosFlota[7][2];
            bombardero.cristal  = arrDatosFlota[7][3];
            bombardero.deuterio = arrDatosFlota[7][4];
        perDay(bombardero);
        naves.push(bombardero);

        //destructores
        var destructor = new Object;
            destructor.nombre   = arrDatosFlota[8][1];//LANG.SERVER.txt_SHIP_LG_destructor;
            destructor.metal    = arrDatosFlota[8][2];
            destructor.cristal  = arrDatosFlota[8][3];
            destructor.deuterio = arrDatosFlota[8][4];
        perDay(destructor);
        naves.push(destructor);

        //estrellas de la muerte
        var edlm = new Object;
            edlm.nombre   = arrDatosFlota[9][1];//LANG.SERVER.txt_SHIP_LG_edlm;
            edlm.metal    = arrDatosFlota[9][2];
            edlm.cristal  = arrDatosFlota[9][3];
            edlm.deuterio = arrDatosFlota[9][4];
        perDay(edlm);
        naves.push(edlm);

        //defensas
        var defensas = new Array();
        //lanzamisiles
        var lanza = new Object;
            lanza.nombre   = arrDatosFlota[14][1];//LANG.SERVER.txt_DEFENSE_LG_lanza;
            lanza.metal    = arrDatosFlota[14][2];
            lanza.cristal  = arrDatosFlota[14][3];
            lanza.deuterio = arrDatosFlota[14][4];
        perDay(lanza);
        defensas.push(lanza);

        //lasers peque
        var laserp = new Object;
            laserp.nombre   = arrDatosFlota[15][1];//LANG.SERVER.txt_DEFENSE_LG_laserp;
            laserp.metal    = arrDatosFlota[15][2];
            laserp.cristal  = arrDatosFlota[15][3];
            laserp.deuterio = arrDatosFlota[15][4];
        perDay(laserp);
        defensas.push(laserp);

        //lasers grandes
        var laserg = new Object;
            laserg.nombre   = arrDatosFlota[16][1];//LANG.SERVER.txt_DEFENSE_LG_laserg;
            laserg.metal    = arrDatosFlota[16][2];
            laserg.cristal  = arrDatosFlota[16][3];
            laserg.deuterio = arrDatosFlota[16][4];
        perDay(laserg);
        defensas.push(laserg);

        //gauss
        var gauss = new Object;
            gauss.nombre   = arrDatosFlota[17][1];//LANG.SERVER.txt_DEFENSE_LG_gauss;
            gauss.metal    = arrDatosFlota[17][2];
            gauss.cristal  = arrDatosFlota[17][3];
            gauss.deuterio = arrDatosFlota[17][4];
        perDay(gauss);
        defensas.push(gauss);

        //ionicos
        var ionico = new Object;
            ionico.nombre   = arrDatosFlota[18][1];//LANG.SERVER.txt_DEFENSE_LG_ionico;
            ionico.metal    = arrDatosFlota[18][2];
            ionico.cristal  = arrDatosFlota[18][3];
            ionico.deuterio = arrDatosFlota[18][4];
        perDay(ionico);
        defensas.push(ionico);

        //plasmas
        var plasma = new Object;
            plasma.nombre   = arrDatosFlota[19][1];//LANG.SERVER.txt_DEFENSE_LG_plasma;
            plasma.metal    = arrDatosFlota[19][2];
            plasma.cristal  = arrDatosFlota[19][3];
            plasma.deuterio = arrDatosFlota[19][4];
        perDay(plasma);
        defensas.push(plasma);

        //misiles interplanetarios
        var mInterplanet = new Object;
            mInterplanet.nombre   = LANG.SERVER.txt_DEFENSE_LG_mInterplanet;
            mInterplanet.metal    = 12500;
            mInterplanet.cristal  = 2500;
            mInterplanet.deuterio = 10000;
        perDay(mInterplanet);
        defensas.push(mInterplanet);

        //misiles intercepcion
        var mIntercep = new Object;
            mIntercep.nombre   = LANG.SERVER.txt_DEFENSE_LG_mIntercep;
            mIntercep.metal    = 8000;
            mIntercep.cristal  = 0;
            mIntercep.deuterio = 2000;
        perDay(mIntercep);
        defensas.push(mIntercep);

        //mostramos resultados
        showDailyUnits(naves,defensas);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('shipsAndDefenses [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function highlightDebris()
{
  try {
         if (strPaginaActual != 'galaxy') return;

         if ( (min_Escombros <= 0) || (show_Debris <= 0) )
            return;

         if (DEBUG_MODE > 0) GM_log('highlightDebris: ' + strPaginaActual);

         var imgDebrisX1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAA" +
                          "AeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQU" +
                          "AAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdw" +
                          "nLpRPAAAAl1JREFUSEvtl2tLG1EQhvMfWqWiiNWqMYbY1lsStgkxx" +
                          "BtpqVBbpUXwJ/mLj/scme3syblFxE8G9svZmXnfeedyNo3G2++1FF" +
                          "hY3W34nsWdY9PsnZm1ryPzbuvIhOzkHJvldmHtNw7GZm/43fq7vlV" +
                          "eoYA4m4f16ukMpjZwyH7187BmL76TX/c1vyQwIBpYB2r2L8z77W6N" +
                          "hEvU9e2eXVsCSWAyg60PXM5GV3dWVuRc6Qyitvi0i8s8YOoUA5Z3H" +
                          "/fH5kOrH7WlVNhkZUzAHGCyXWj2grZLu/97IwuYzs4BRmpfxr2L35" +
                          "aQbsgs4Jw60zTY0Wya5Hb31DsBYWCHIbWJZf3pcDwDrKVlzA5Pr+1" +
                          "8Q7D6IRPONBLSADL48a9iG5pPIVNJWRKW4GRPf0g8sZ1pLt/YcOaT" +
                          "UGcPKd9CCU1DMb2tdzVMfeDUD0VQQAMinbtANIHYNHhrvHk0maknw" +
                          "DoDFkZqb8t7NpwmjPTB5qIxdIatcttQmy8nV3Y7kSnqDH/eBQlgL+" +
                          "BLeyPTnz4pttU7Ty8Q1puwBYzHXYsEX2wVBrLrBxNLTmfImW2+9je" +
                          "DHTGy5hggMsbZN1YAU+/UkkFyGbEsYCtXCcpl4AvO+xSo25Rp4BLQ" +
                          "12w6EMDUeh7wJLBbr1DGOVKLLzVPAvPZksqEjHeK+Eolhiyj2sqMz" +
                          "SRfDLGM8E1dnZSCjhacZMaakK41jda9vDF0KjbMaUgZu/PLUXrWtS" +
                          "hOsNbMdTAfcH/6d85rMfC5GyuJu+dRJGQ/l9Sp3Ux2kvXx+Z/oLn9" +
                          "R4M7oaVWG5PXW+LX+sbg4j22NQnMt5k9MAAAAAElFTkSuQmCC";

         var imgDebrisX5 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAA" +
                          "AeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQU" +
                          "AAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdw" +
                          "nLpRPAAAAl5JREFUSEvtl9lOG0EQRf0PLAKBUEICGGMZkrDY1mDLW" +
                          "GaTiUAKWZQIif/Ov3TmNKqhpt2bEeIplualp6rurVtLjxuN/7+3Um" +
                          "BpY6/he5Z3T0yzd2HefR6Zhe1jE7KTc2zW2oW1/3A4NvvDG+vv+lZ" +
                          "5hQLi/HexqJ7OYGoDh+w3DoY1e/GdfHus+SWBAdHAOlCzf2UWd7o1" +
                          "Ei5R17d7cW8JJIHJDLY+cDkb3T1YWZFzvTOI2uLTLq7zgKlTDFjev" +
                          "f8yNiutftSWUmGTlTEBc4DJdqnZC9qu7j33RhYwnZ0DjNS+jHtX3y" +
                          "0h3ZBZwDl1pmmwo9k0yZ3uuXcCwsAOQ2oTy/rj0XgGWEvLmB2d39v" +
                          "5hmD1QyacaSSkAWTw9U/FNjSfQqaSsiQswcme/pB4YjvTXL6x4cwn" +
                          "oc4eUr6FEpqGYvqr3tUw9YFTPxRBAQ2IdO4C0QRi0+Ct8dbxZKaeA" +
                          "OsMWBipvS3v2XCaMNIHm4vG0Bm2ym1DbT6d3dntRKaoM7x9CBLAXs" +
                          "BX90emP31SbLt3mV4grDdhCxiPuxYJvtwqDGQ3DyeWnM6QM9t87VO" +
                          "DHTGy5hggMsbZN1YAU+/UkkFyGbEsYCtXCcpl4AvO+xSo25Rp4BLQ" +
                          "12w6EMDUeh7wJLBbr1DGOVKLLzVPAvPZksqEjHeL+Eolhiyj2sqMz" +
                          "SRfDLGM8E1dnZSCjhacZMaakK41jda9/mnoVGyY05AydueXo/Sia1" +
                          "GcYK2Z62A+4P7095zXYuBzN1YSd8+jSMh+LqlTu5nsJOuTyx/RXf6" +
                          "qwJ3R06oMyeut8Vv9Y3Fx/gF0xbWWfL5J4QAAAABJRU5ErkJggg%3" +
                          "D%3D";

         var imgDebrisX10 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AA" +
                          "AAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQ" +
                          "UAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABd" +
                          "wnLpRPAAAAlxJREFUSEvtl9lOG0EQRf0PCSiICJEFMMYygbDY1sSW" +
                          "scwmJwoSWwRC4v8/opnTqIaadm+OEE9Ympeeqrq3bi09bjTef2+lw" +
                          "MLKVsP3LG4emmbvxKzujsyH9QMTspNzbJbbhbX/tjc228Pf1t/1rf" +
                          "IKBcTZNEz1dAZTGzhkv/JjWLMX38nlY80vCQyIBtaBmv0z83GjWyP" +
                          "hEnV9uydXlkASmMxg6wOXs9HFg5UVOT93BlFbfNrFeR4wdYoBy7sv" +
                          "P8fmU6sftaVU2GRlTMAcYLJdaPaCtktbL72RBUxn5wAjtS/j3tm1J" +
                          "aQbMgs4p840DXY0mya50T32TkAY2GFIbWJZf98fzwBraRmz/eMrO9" +
                          "8QrH7IhDONhDSADP7cV2xD8ylkKilLwhKc7OkPiSe2M83lGxvOfBL" +
                          "q7CHlWyihaSim/+pdDVMfOPVDERTQgEjnLhBNIDYN3hqvHUxm6gmw" +
                          "zoCFkdrb8p4NpwkjfbC5aAydYavcNtRm5+jCbicyRZ3h34cgAewFf" +
                          "Gl7ZPrTZ8XWe6fpBcJ6E7aA8bhrkeCLrcJA9uvexJLTGXJmm6/9y2" +
                          "BHjKw5BoiMcfaNFcDUO7VkkFxGLAvYylWCchn4gvM+Beo2ZRq4BPQ" +
                          "1mw4EMLWeBzwJ7NYrlHGO1OJLzZPAfLakMiHjzSK+Uokhy6i2MmMz" +
                          "yRdDLCN8U1cnpaCjBSeZsSaka02jdc9vDZ2KDXMaUsbu/HKU/utaF" +
                          "CdYa+Y6mA+4P72b81oMfO7GSuLueRQJ2c8ldWo3k51kfXh6E93lrw" +
                          "rcGT2vypC83hq/1T8WF+cJBPaST/B/YW4AAAAASUVORK5CYII%3D";

         var imgDebrisX100 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AA" +
                          "AAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQ" +
                          "UAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABd" +
                          "wnLpRPAAAAmRJREFUSEvtl9lKI0EUhvMOLowo4oxbjCHquCWhTYgh" +
                          "LiEOCjozLgje+By+edlfSbWnK7VFxCsDfVN9zvn/85+lOpXK9++rF" +
                          "JhZ3Ky4ntmNQ1Vtnaql3z01tXagfHbmHJv5eqbtl/f6aqt7of1t3y" +
                          "IvX0CcXyqqeBqdkQ7ss1/c7pbsje/g+qnkFwUGRALLQNX2uZpeb5Z" +
                          "I2ERt3+bpjSYQBSYz2LrAzVnv6lHLipwLjU7QFp96NkwDpk4hYPPu" +
                          "525f/ai1g7aUCpukjAmYAky2M9WW13Zu8703koDp7Bjw8O5ZS+3Ku" +
                          "HX+VxOSDZkEnFJnmgY7mk2SXG+eOCfAD2wxpDahrFf2+2PAUlrGbP" +
                          "/kRs83BIsfMuFMIyENIJ0/DwVb33waMoWUOWETnOzpDxPP2I41l2t" +
                          "sOHNJKLOHlGuh+KYhG92WuxqmLnDqhyIoIAGRzl4gkkBoGpw1Xj0Y" +
                          "jNUTYJkBCyO2t817NpwkjPTe5qIxZIa1fNtQm53jK72dyBR1upePX" +
                          "gLYG/C5rZ5qj94UW2udxRcI682wBYzHXosEn61lCrK/9gaanMyQM9" +
                          "189SOFHTGS5hggMsbZHisWB8DUO7ZkkNyMWBKwlisH5TJwBed9DNR" +
                          "uyjhwDuhqNhkIYGo9CXgU2K6XL+MUqfGlNNQ8CsxnSywTMt7IwiuV" +
                          "GGYZlVZmaCb5YghlhG/s6qQUdLTBiWYsCcla02jN4X9Fp2LDnPqU0" +
                          "Ts/H6UPXYvGCdaSuQzmAm6P7ie8Fj2fu6GS2HseRXz2E0kd281kZ7" +
                          "I+PPsX3OWfCtzova1Kn7zOGn/VPxYb5xWOuwt9R16/MwAAAABJRU5" +
                          "ErkJggg%3D%3D";
         /**
         * Resalta los escombros grandes
         */
         function setHighlightDebris()
         {
           try {
                if (strPaginaActual != 'galaxy') return;

                if ( (min_Escombros <= 0) ||
                     (show_Debris <= 0) )
                   return;


                if (DEBUG_MODE > 2) GM_log('setHighlightDebris: ' + strPaginaActual);

                var coordenadasActuales = new Array();
                    coordenadasActuales[1] = $('#galaxy_input').val();
                    coordenadasActuales[2] = $('#system_input').val();

                var url = window.location + "";

                    url = url.substring(0, url.search("page"));
                    url = url + "page=fleet1" + ( (parseInt(getVersionOgame()[0])==3) ? '' : '&' + getSession() );

                var theGalaxyTable = document.getElementById('galaxytable');
                var arrTr = getElementsByClass('row', theGalaxyTable, 'tr');

                for (var i = 0; i < arrTr.length; i++) {
                     var theTd = getElementsByClass('debris', arrTr[i], 'td')[0];

                     var theA = getElementsByClass('tipsGalaxy', theTd, 'a')[0];

                     if (theA == null)
                         continue;

                     var debrisId = theA.getAttribute('rel').replace("#debris", "");

                     var theDebrisDiv = document.getElementById('debris' + debrisId);

                     var arrLiDebris = getElementsByClass('debris-content', theDebrisDiv, 'li');

                     var partes = arrLiDebris[0].innerHTML.split(' ');
                     var metDebris = parseInt(partes[1].replace(/\./g,""));

                         partes = arrLiDebris[1].innerHTML.split(' ');
                     var criDebris = parseInt(partes[1].replace(/\./g,""));

                     var contenido = metDebris + criDebris;

                     var imgDebris1 = theA.getElementsByTagName('img')[0];
                     var imgDebris2 = theDebrisDiv.getElementsByTagName('img')[0];

                     var strColor;

                     if (min_Escombros > 0) {

                        if (contenido >= min_Escombros) {

                            if (contenido >= (min_Escombros * 100)) {
                                if (( show_Debris == 1 ) || (show_Debris == 3 )) {
                                   imgDebris1.setAttribute("src", imgDebrisX100);
                                   imgDebris2.setAttribute("src", imgDebrisX100);

                                   strColor = 'white';

                                } else {
                                   theA.removeChild(imgDebris1);

                                   strColor = 'rgb(139,0,139)';
                                }

                            } else if (contenido >= (min_Escombros * 10)) {
                                if (( show_Debris == 1 ) || (show_Debris == 3 )) {
                                   imgDebris1.setAttribute("src", imgDebrisX10);
                                   imgDebris2.setAttribute("src", imgDebrisX10);

                                   strColor = 'white';

                                } else {
                                   theA.removeChild(imgDebris1);

                                   strColor = 'rgb(255,0,255)';
                                }

                            } else if (contenido >= (min_Escombros * 5)) {
                                if (( show_Debris == 1 ) || (show_Debris == 3 )) {
                                   imgDebris1.setAttribute("src", imgDebrisX5);
                                   imgDebris2.setAttribute("src", imgDebrisX5);

                                   strColor = 'white';

                                } else {
                                   theA.removeChild(imgDebris1);

                                   strColor = 'rgb(220,20,60)';
                                }

                            } else {
                                if (( show_Debris == 1 ) || (show_Debris == 3 )) {
                                   imgDebris1.setAttribute("src", imgDebrisX1);
                                   imgDebris2.setAttribute("src", imgDebrisX1);

                                   strColor = 'white';

                                } else {
                                   theA.removeChild(imgDebris1);

                                   strColor = 'rgb(255,145,34)';
                                }
                            }

                        } else {
                            if (( show_Debris == 1 ) || (show_Debris == 3 )) {
                               strColor = 'white';

                            } else {
                               theA.removeChild(imgDebris1);

                               strColor = 'rgb(131,145,156)';
                            }
                        }

                        var myDiv = document.getElementById('lpunktkit-debris' + debrisId);
                        if (myDiv != null) myDiv.parentNode.removeChild(myDiv);

                        if (show_Debris >= 2) {
                             var myDiv = document.createElement('div');
                                 myDiv.setAttribute('id', 'lpunktkit-debris' + debrisId);

                                 if (show_Debris == 3)
                                     myDiv.setAttribute('style', 'position:absolute; top: 0;' +
                                                                 'left:' + theTd.offsetLeft + 'px;' +
                                                                 'width:' + theTd.offsetWidth + 'px;' +
                                                                 'z-order:90;text-align:center;' +
                                                                 'font-weight:bold;color:' + strColor + ';' +
                                                                 'font-size:9px;')
                                 else
                                     if (contenido >= min_Escombros)
                                         myDiv.setAttribute('style', 'position:absolute; top: 0;' +
                                                                 'left:' + theTd.offsetLeft + 'px;' +
                                                                 'width:' + theTd.offsetWidth + 'px;' +
                                                                 'z-order:90;text-align:center;' +
                                                                 'font-weight:bold;color:black;' +
                                                                 'font-size:9px;background-color:' + strColor + ';');


                                 myDiv.appendChild(document.createTextNode(addDots(metDebris)));
                                 myDiv.appendChild(document.createElement('br'));
                                 myDiv.appendChild(document.createTextNode(addDots(criDebris)));

                             theA.appendChild(myDiv);
                        }
                     }
                }

           } catch(e) {
                if (DEBUG_MODE != 0)
                    GM_log('setHighlightDebris [ERROR]: <' + e + '> ' + strPaginaActual);
           }
         }

         setInterval(setHighlightDebris, 500);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('highlightDebris [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


/**
 * Recibe una tabla que contiene la info de la flota en cuestion.
 * Devuelve los valores de los 3 recursos que transporta
 */
function getRecursosFlota(tabla)
{
  try {
        if (DEBUG_MODE > 0) GM_log('getRecursosFlota: ' + strPaginaActual);

        if (show_Empty_Space)
            var recursos = new Array(0,0,0,0)
        else
            var recursos = new Array(0,0,0);

        var i = 0;

        var arrTr = tabla.getElementsByTagName('tr');

        for (var j=0; j < arrTr.length; j++) {
            if (! show_Empty_Space) {
                if (j>=(arrTr.length-3)) {

                    recursos[i] = trim( arrTr[j].getElementsByTagName('td')[1].innerHTML );
                    i++;
                }
            } else {
                if (j>=(arrTr.length-4)) {
                    var theTd = arrTr[j].getElementsByTagName('td')[1];
                    var theFont = theTd.getElementsByTagName('font')[0];
                    if (theFont)
                        recursos[i] = trim( theFont.innerHTML )
                    else
                        recursos[i] = trim( theTd.innerHTML );

                    i++;
                }
            }
        }

        return recursos;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('getRecursosFlota [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Nueva funcion para agregar puntos en los miles y usar formato Ogame
 * (ej: 400k, 3M)
 */
function puntos(numero)
{
  try {
         if (DEBUG_MODE > 1) GM_log('puntos: ' + strPaginaActual);

         var cadena = "";
         numero = parseInt(numero, 10);

         if (numero == 0) return "0";
         //cambiamos 1.000.000 por 1M
         if (numero % 1000000 == 0) cadena = (numero / 1000000) + "M";
         else
         {
           //cambiamos 900.000 por 900k
           if ((numero % 1000 == 0) && (numero < 1000000) ) cadena = (numero/1000) + "k";
           else
           {
             //si no es cifra redonda, agregamos los puntos
             if (numero < 1000) cadena = numero + "";
             else
             {
               unidades = numero % 1000 + "";

               if (numero < 1000000)
               {
                 cadena = Math.floor(numero / 1000) + "." + unidades;
               }
               else
               {
                 millones=Math.floor(numero/1000000);
                 miles=Math.floor((numero-millones*1000000)/1000) + "";

                 if (miles > 0)
                     cadena = millones + "M " + miles + "k"
                 else
                     cadena = millones + "M " + unidades;
               }
             }
           }
         }

         return cadena;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('puntos [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Calcula el tiempo necesario para construir flota/defensas
 */
function calculateTime()
{
   try {
        if ((strPaginaActual !='defense') && (strPaginaActual !='shipyard') &&
            (strPaginaActual !='resources')) //Satelites balance 0
             return;

        if (! show_Time_Ships_Defenses) return;

        if (DEBUG_MODE > 0) GM_log('calculateTime: ' + strPaginaActual);

        existe = $("#costs");

        if (existe.length>0)
        {
            var necesarios=new Array();
                necesarios[0]=0;//metal
                necesarios[1]=0;//cristal
                necesarios[2]=0;//deuterio
                necesarios[3]=0;//energia

            $('#costs #resources li.metal').each(function() {
                palabra = this.title.split(" ");

                palabra[palabra.length-1] = traduce(palabra[palabra.length-1]);

                if (DEBUG_MODE > 1) GM_log('calculateTime: < ' +
                                            palabra[palabra.length-1] + ' [' + palabra[0] + '] > ' +
                                            strPaginaActual);

                switch (palabra[palabra.length-1].toUpperCase()) {
                   case "METAL": necesarios[0] = palabra[0].replace(/\./g,"");
                                                 /*palabra[0].substring(1,
                                                 palabra[0].length).replace(/\./g,"");*/

                                 if (DEBUG_MODE > 1) GM_log('calculateTime: case metal ' +
                                     '[ necesarios[0] = ' + necesarios[0] + ' ] ' + strPaginaActual);

                                 break;

                   case "CRISTAL": necesarios[1] = palabra[0].replace(/\./g,"");
                                                 /*palabra[0].substring(1,
                                                 palabra[0].length).replace(/\./g,"");*/

                                   if (DEBUG_MODE > 1) GM_log('calculateTime: case cristal ' +
                                     '[ necesarios[1] = ' + necesarios[1] + ' ] ' + strPaginaActual);

                                   break;

                   case "DEUTERIO": necesarios[2] = palabra[0].replace(/\./g,"");
                                                 /*palabra[0].substring(1,
                                                 palabra[0].length).replace(/\./g,"");*/

                                    if (DEBUG_MODE > 1) GM_log('calculateTime: case deuterio ' +
                                        '[ necesarios[2] = ' + necesarios[2] + ' ] ' + strPaginaActual);

                                    break;

                   default: necesarios[3] = palabra[0].replace(/\./g,"");
                                                 /*palabra[0].substring(1,
                                                 palabra[0].length).replace(/\./g,"");*/

                            if (DEBUG_MODE > 1) GM_log('calculateTime: case default ' +
                               '[ necesarios[3] = ' + necesarios[3] + ' ] ' + strPaginaActual);

                            break;
                }
            });

            tiempoPorUnidad = timeToSeconds($('#action ul li .time').html());
            if (DEBUG_MODE > 1) GM_log('calculateTime: ' +
                '[ tiempoPorUnidad = ' + tiempoPorUnidad + ' ] ' + strPaginaActual);

            var myP = document.getElementById('lpunktkit-time');
            if (myP != null) myP.parentNode.removeChild(myP);

            if ((strPaginaActual =='defense') || (strPaginaActual =='shipyard')) {
               $('#action ul li ' + (document.getElementById('possibleInTime') ?
                          '#possibleInTime' : '.time')).after('<p id="lpunktkit-time">' +
                          LANG.MISC.txt_tiempoTotal + ": " +
                          '<span style="color:' + strColor_LPuNKTKit +
                          ';font-weight:bold;">' + secondsToTime(0) + '</span></p>')

            } else { // Satelites balance 0
                  var div = document.getElementById('detail');

                  var arrHidden = div.getElementsByTagName('input');

                  var blnFound = false;

                  for (i=0; i < arrHidden.length; i++) {

                      if (arrHidden[i].value == '212')  //Satelites en Recursos
                      {

                         if (arrHidden[i].value == '212') {
                             $('#action ul li ' + (document.getElementById('possibleInTime') ?
                               '#possibleInTime' : '.time')).after('<p id="lpunktkit-time">' +
                               LANG.MISC.txt_tiempoTotal + ": " +
                               '<span style="color:' + strColor_LPuNKTKit +
                               ';font-weight:bold;">' + secondsToTime(0) + '</span></p>')

                         }
                      }
                  }
            }

            entradaUsuario = $('li.enter input').val();

            if (DEBUG_MODE > 1)
                GM_log('calculateTime: ' + '[ entradaUsuario = ' + entradaUsuario + ' ] ' + strPaginaActual);

            if ((parseInt(entradaUsuario) == 0) || (entradaUsuario == ''))
            {
                 $('#lpunktkit-time').html(LANG.MISC.txt_tiempoTotal + ': ' +
                      '<span style="color:' + strColor_LPuNKTKit +
                      ';font-weight:bold;">' + secondsToTime(0) + '</span>');

            for ( i=0; i<3; i++) {
                  var menos = document.getElementById('menos' + i);
                  if (menos) menos.parentNode.removeChild(menos);
            }
            }
            else if (parseInt(entradaUsuario)>0)
            {
                 $('#lpunktkit-time').html(LANG.MISC.txt_tiempoTotal + ': ' +
                      '<span style="color:' + strColor_LPuNKTKit +
                      ';font-weight:bold;">' +
                      secondsToTime(tiempoPorUnidad*entradaUsuario) +
                      '</span>');

            //calculamos cuantos recursos supone hacer esas
            //"x" naves, y lo mostramos
            recursosParaX = new Array();
            color = new Array();

            if (necesarios[0] > 0) //necesitamos metal
            {
               met = necesarios[0]*entradaUsuario;
               recursosParaX.push(met);

               if (DEBUG_MODE > 1)
                   GM_log('calculateTime: ' + '[ met = ' + met + ' ] ' +
                                              '[ metal = ' + metal + ' ] ' + strPaginaActual);

               if (met > metal) color.push("red")
               else color.push("green");
            }

            if (necesarios[1] > 0) //cristal
            {
               cri = necesarios[1]*entradaUsuario;
               recursosParaX.push(cri);

               if (DEBUG_MODE > 1) GM_log('calculateTime: ' +
                   '[ cri = ' + cri + ' ] ' +
                   '[ cristal = ' + cristal + ' ] ' + strPaginaActual);

               if (cri > cristal) color.push("red")
               else color.push("green");
            }

            if (necesarios[2] > 0) //y deuterio
            {
               deu = necesarios[2]*entradaUsuario;
               recursosParaX.push(deu);

               if (DEBUG_MODE > 1) GM_log('calculateTime: ' +
                   '[ deu = ' + deu + ' ] ' +
                   '[ deuterio = ' + deuterio + ' ] ' + strPaginaActual);

               if (deu > deuterio) color.push("red")
               else color.push("green");
            }

            $('#costs #resources li.metal span').each( function (i) {

               //mostramos datos
               if ($('#menos' + i).length != 0)
                  $('#menos' + i).replaceWith( '<p style="font-size:10px;' +
                           'color:' + color[i] + ';" id="menos' + i + '">-' +
                           puntos(recursosParaX[i]) + '</p>' )
               else
                   $(this).after( '<p style="font-size:10px;color:' +
                                  color[i] + ';" id="menos' + i + '">-' +
                                  puntos(recursosParaX[i]) + '</p>' );
            });

            } //if (parseInt(entradaUsuario)>0)

        } //if (existe.length>0)

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('calculateTime [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Inicializa array de colores de mensajes
 */
function LoadColorMessages() {
   try {

       if (DEBUG_MODE > 0) GM_log('loadColorMessages: ' + strPaginaActual);

       arrColorMessages = [

          //Texto                                       //Color
          [LANG.SERVER.txt_MISSION_colorDeploy, '#CCFF66'],
          [LANG.SERVER.txt_MISSION_colorReturn,  '#888833'],
          [LANG.SERVER.txt_MISSION_colorCircularMsg,   '#00FFFF'],
          [LANG.SERVER.txt_MISSION_colorHarvest,  '#EE82EE'],
          [LANG.SERVER.txt_MISSION_colorEspionageReport,  '#CCFFCC'],
          [LANG.SERVER.txt_MISSION_colorEspionageAction, '#FF3300'],
          [LANG.SERVER.txt_MISSION_colorPM,   '#00BFFF'],
          [LANG.SERVER.txt_MISSION_colorArrive,  '#FFFF33'],
          [LANG.SERVER.txt_MISSION_colorExpedition,  '#AAAABB'],
          [LANG.SERVER.txt_MISSION_colorColonize,  '#8080FF'],
          [LANG.SERVER.txt_MISSION_colorForeign, '#008000']

       ];

       if ( GM_getValue('messageColor0' + strUniverse, arrColorMessages[0][1]) == -1 )
       {
            for(var z = 0 ; z < arrColorMessages.length ; z++) {
                GM_setValue('messageText' + z + strUniverse, arrColorMessages[z][0]);
                GM_setValue('messageColor' + z + strUniverse, arrColorMessages[z][1]);
            }

       }
       else
       {
           for(var z = 0 ; z < arrColorMessages.length ; z++)
               if (GM_getValue('messageColor' + z + strUniverse, -1) != -1) {
                   arrColorMessages[z][0] = GM_getValue('messageText' + z + strUniverse,
                                                         arrColorMessages[z][0]);
                   arrColorMessages[z][1] = GM_getValue('messageColor' + z + strUniverse,
                                                         arrColorMessages[z][1]);
               }
       }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('LoadColorMessages [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Inicializa array de tipos de nave/defensa
 */
function LoadDatosFlota(blnFriki) {
  try {
        if (DEBUG_MODE > 0) GM_log('LoadDatosFlota: ' + strPaginaActual);

        if (blnFriki) {
           arrDatosFlota = [
           //S.Name,                              L.Name,                               Metal, Crystal,    Duty,   Cargo
           [LANG.SERVER.txt_CR_SHIP_SH_PCarga,       LANG.CR_FRIKI.txt_SHIP_LG_npc,            2000,    2000,       0,    5000],
           [LANG.SERVER.txt_CR_SHIP_SH_GrCarga,      LANG.CR_FRIKI.txt_SHIP_LG_ngc,            6000,    6000,       0,   25000],
           [LANG.SERVER.txt_CR_SHIP_SH_CLigero,      LANG.CR_FRIKI.txt_SHIP_LG_cl,             3000,    1000,       0,      50],
           [LANG.SERVER.txt_CR_SHIP_SH_CPesado,      LANG.CR_FRIKI.txt_SHIP_LG_cp,             6000,    4000,       0,     100],
           [LANG.SERVER.txt_CR_SHIP_SH_Crucero,      LANG.CR_FRIKI.txt_SHIP_LG_crucero,       20000,    7000,    2000,     800],
           [LANG.SERVER.txt_CR_SHIP_SH_NB,           LANG.CR_FRIKI.txt_SHIP_LG_nb,            45000,   15000,       0,    1500],
           [LANG.SERVER.txt_CR_SHIP_SH_Acoraz,       LANG.CR_FRIKI.txt_SHIP_LG_acorazado,     30000,   40000,   15000,     750],
           [LANG.SERVER.txt_CR_SHIP_SH_Bomb,         LANG.CR_FRIKI.txt_SHIP_LG_bombardero,    50000,   25000,   15000,     500],
           [LANG.SERVER.txt_CR_SHIP_SH_Destruc,      LANG.CR_FRIKI.txt_SHIP_LG_destructor,    60000,   50000,   15000,    2000],
           [LANG.SERVER.txt_CR_SHIP_SH_Edlm,         LANG.CR_FRIKI.txt_SHIP_LG_edlm,        5000000, 4000000, 1000000, 1000000],
           [LANG.SERVER.txt_CR_SHIP_SH_Colony,       LANG.CR_FRIKI.txt_SHIP_LG_colonizador,   10000,   20000,   10000,    7500],
           [LANG.SERVER.txt_CR_SHIP_SH_Recy,         LANG.CR_FRIKI.txt_SHIP_LG_reciclador,    10000,    6000,    2000,   20000],
           [LANG.SERVER.txt_CR_SHIP_SH_Sonda,        LANG.CR_FRIKI.txt_SHIP_LG_sonda,             0,    1000,       0,       0],
           [LANG.SERVER.txt_CR_SHIP_SH_Satelite,     LANG.CR_FRIKI.txt_SHIP_LG_satelite,          0,    2000,     500,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_Lanza,     LANG.CR_FRIKI.txt_DEFENSE_LG_lanza,       2000,       0,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_LPeque,    LANG.CR_FRIKI.txt_DEFENSE_LG_laserp,      1500,     500,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_LGrande,   LANG.CR_FRIKI.txt_DEFENSE_LG_laserg,      6000,    2000,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CGauss,    LANG.CR_FRIKI.txt_DEFENSE_LG_gauss,      20000,   15000,    2000,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CIonico,   LANG.CR_FRIKI.txt_DEFENSE_LG_ionico,      2000,    6000,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CPlasma,   LANG.CR_FRIKI.txt_DEFENSE_LG_plasma,     50000,   50000,   30000,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CupPeque,  LANG.CR_FRIKI.txt_DEFENSE_LG_cupPeque,   10000,   10000,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CupGrande, LANG.CR_FRIKI.txt_DEFENSE_LG_cupGrande,  50000,   50000,       0,       0]
           ];
        } else {
           arrDatosFlota = [
           //S.Name,                              L.Name,                          Metal, Crystal,    Duty,   Cargo
           [LANG.SERVER.txt_CR_SHIP_SH_PCarga,       LANG.SERVER.txt_SHIP_LG_npc,               2000,    2000,       0,    5000],
           [LANG.SERVER.txt_CR_SHIP_SH_GrCarga,      LANG.SERVER.txt_SHIP_LG_ngc,               6000,    6000,       0,   25000],
           [LANG.SERVER.txt_CR_SHIP_SH_CLigero,      LANG.SERVER.txt_SHIP_LG_cl,                3000,    1000,       0,      50],
           [LANG.SERVER.txt_CR_SHIP_SH_CPesado,      LANG.SERVER.txt_SHIP_LG_cp,                6000,    4000,       0,     100],
           [LANG.SERVER.txt_CR_SHIP_SH_Crucero,      LANG.SERVER.txt_SHIP_LG_crucero,          20000,    7000,    2000,     800],
           [LANG.SERVER.txt_CR_SHIP_SH_NB,           LANG.SERVER.txt_SHIP_LG_nb,               45000,   15000,       0,    1500],
           [LANG.SERVER.txt_CR_SHIP_SH_Acoraz,       LANG.SERVER.txt_SHIP_LG_acorazado,        30000,   40000,   15000,     750],
           [LANG.SERVER.txt_CR_SHIP_SH_Bomb,         LANG.SERVER.txt_SHIP_LG_bombardero,       50000,   25000,   15000,     500],
           [LANG.SERVER.txt_CR_SHIP_SH_Destruc,      LANG.SERVER.txt_SHIP_LG_destructor,       60000,   50000,   15000,    2000],
           [LANG.SERVER.txt_CR_SHIP_SH_Edlm,         LANG.SERVER.txt_SHIP_LG_edlm,           5000000, 4000000, 1000000, 1000000],
           [LANG.SERVER.txt_CR_SHIP_SH_Colony,       LANG.SERVER.txt_SHIP_LG_colonizador,      10000,   20000,   10000,    7500],
           [LANG.SERVER.txt_CR_SHIP_SH_Recy,         LANG.SERVER.txt_SHIP_LG_reciclador,       10000,    6000,    2000,   20000],
           [LANG.SERVER.txt_CR_SHIP_SH_Sonda,        LANG.SERVER.txt_SHIP_LG_sonda,                0,    1000,       0,       0],
           [LANG.SERVER.txt_CR_SHIP_SH_Satelite,     LANG.SERVER.txt_SHIP_LG_satelite,             0,    2000,     500,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_Lanza,     LANG.SERVER.txt_DEFENSE_LG_lanza,          2000,       0,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_LPeque,    LANG.SERVER.txt_DEFENSE_LG_laserp,         1500,     500,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_LGrande,   LANG.SERVER.txt_DEFENSE_LG_laserg,         6000,    2000,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CGauss,    LANG.SERVER.txt_DEFENSE_LG_gauss,         20000,   15000,    2000,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CIonico,   LANG.SERVER.txt_DEFENSE_LG_ionico,         2000,    6000,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CPlasma,   LANG.SERVER.txt_DEFENSE_LG_plasma,        50000,   50000,   30000,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CupPeque,  LANG.SERVER.txt_DEFENSE_LG_cupPeque,      10000,   10000,       0,       0],
           [LANG.SERVER.txt_CR_DEFENSE_SH_CupGrande, LANG.SERVER.txt_DEFENSE_LG_cupGrande,     50000,   50000,       0,       0]
           ];
        }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('LoadDatosFlota [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function LoadColoresCR (blnFriki) {

  try {
        if (! show_Compactador_Batallas) return;

        if (DEBUG_MODE > 0) GM_log('LoadColoresCR: ' + strPaginaActual);

        if (blnFriki) {
           arrColorBatalla = [
           [/{COLOR_T1}/gi,   '#FFFFFF', LANG.CR.txt_titles],
           [/{COLOR_A1}/gi,   '#00FF40', LANG.SERVER.txt_CR_attacker],
           [/{COLOR_A2}/gi,   '#00DDDD', LANG.SERVER.txt_CR_attacker + ' - ' + LANG.CR.txt_lostShips],
           [/{COLOR_D1}/gi,   '#ED7010', LANG.SERVER.txt_CR_Defender],
           [/{COLOR_D2}/gi,   '#00DDDD', LANG.SERVER.txt_CR_Defender + ' - ' + LANG.CR.txt_lostShips],
           [/{COLOR_R1}/gi,   '#FFCC66', LANG.CR.txt_lostUnits],
           [/{COLOR_R2}/gi,   '#09A64F', LANG.CR.txt_lossesXRes],
           [/{COLOR_R4}/gi,   '#F0EC64', LANG.MISC.txt_recursos + ' - ' + LANG.CR.txt_stolen],
           [/{COLOR_R3}/gi,   '#FF0000', LANG.CR.txt_debris + ' ' + LANG.SERVER.txt_CR_and + ' ' +
                                         LANG.CR.txt_totLoses],
           [/{COLOR_RA1}/gi,  '#00FF40', LANG.CR.txt_profit + ' - ' + LANG.CR.txt_attHarvest],
           [/{COLOR_RAM1}/gi, '#09A64F', LANG.CR.txt_profit + ' - ' + LANG.CR_FRIKI.txt_RES_metal],
           [/{COLOR_RAC1}/gi, '#09A64F', LANG.CR.txt_profit + ' - ' + LANG.CR_FRIKI.txt_RES_cristal],
           [/{COLOR_RAD1}/gi, '#09A64F', LANG.CR.txt_profit + ' - ' + LANG.CR_FRIKI.txt_RES_deuterio],
           [/{COLOR_RA2}/gi,  '#00DDDD', LANG.CR.txt_profit + ' - ' + LANG.CR.txt_attNoHarvest],
           [/{COLOR_RAM2}/gi, '#00DDDD', LANG.CR.txt_profit + ' - ' + LANG.CR_FRIKI.txt_RES_metal],
           [/{COLOR_RAC2}/gi, '#00DDDD', LANG.CR.txt_profit + ' - ' + LANG.CR_FRIKI.txt_RES_cristal],
           [/{COLOR_RAD2}/gi, '#00DDDD', LANG.CR.txt_profit + ' - ' + LANG.CR_FRIKI.txt_RES_deuterio],
           [/{COLOR_RD}/gi,   '#ED7010', LANG.CR.txt_profit + ' - ' + LANG.CR.txt_defHarvest],
           [/{COLOR_RDM}/gi,  '#ED7010', LANG.CR.txt_profit + ' - ' + LANG.CR_FRIKI.txt_RES_metal],
           [/{COLOR_RDC}/gi,  '#ED7010', LANG.CR.txt_profit + ' - ' + LANG.CR_FRIKI.txt_RES_cristal],
           [/{COLOR_RDD}/gi,  '#ED7010', LANG.CR.txt_profit + ' - ' + LANG.CR_FRIKI.txt_RES_deuterio],
           [/{COLOR_L}/gi,    '#CCFF66', '\u0025 ' + LANG.CR.txt_moon],
           [/{COLOR_IN}/gi,   '#FFFFFF', LANG.CR.txt_others]
           ];
        } else {
           arrColorBatalla = [
           [/{COLOR_T1}/gi,   '#FFFFFF', LANG.CR.txt_titles],
           [/{COLOR_A1}/gi,   '#00FF40', LANG.SERVER.txt_CR_attacker],
           [/{COLOR_A2}/gi,   '#00DDDD', LANG.SERVER.txt_CR_attacker + ' - ' + LANG.CR.txt_lostShips],
           [/{COLOR_D1}/gi,   '#ED7010', LANG.SERVER.txt_CR_Defender],
           [/{COLOR_D2}/gi,   '#00DDDD', LANG.SERVER.txt_CR_Defender + ' - ' + LANG.CR.txt_lostShips],
           [/{COLOR_R1}/gi,   '#FFCC66', LANG.CR.txt_lostUnits],
           [/{COLOR_R2}/gi,   '#09A64F', LANG.CR.txt_lossesXRes],
           [/{COLOR_R4}/gi,   '#F0EC64', LANG.MISC.txt_recursos + ' - ' + LANG.CR.txt_stolen],
           [/{COLOR_R3}/gi,   '#FF0000', LANG.CR.txt_debris + ' ' + LANG.SERVER.txt_CR_and + ' ' +
                                         LANG.CR.txt_totLoses],
           [/{COLOR_RA1}/gi,  '#00FF40', LANG.CR.txt_profit + ' - ' + LANG.CR.txt_attHarvest],
           [/{COLOR_RAM1}/gi, '#09A64F', LANG.CR.txt_profit + ' - ' + LANG.SERVER.txt_RES_metal],
           [/{COLOR_RAC1}/gi, '#09A64F', LANG.CR.txt_profit + ' - ' + LANG.SERVER.txt_RES_cristal],
           [/{COLOR_RAD1}/gi, '#09A64F', LANG.CR.txt_profit + ' - ' + LANG.SERVER.txt_RES_deuterio],
           [/{COLOR_RA2}/gi,  '#00DDDD', LANG.CR.txt_profit + ' - ' + LANG.CR.txt_attNoHarvest],
           [/{COLOR_RAM2}/gi, '#00DDDD', LANG.CR.txt_profit + ' - ' + LANG.SERVER.txt_RES_metal],
           [/{COLOR_RAC2}/gi, '#00DDDD', LANG.CR.txt_profit + ' - ' + LANG.SERVER.txt_RES_cristal],
           [/{COLOR_RAD2}/gi, '#00DDDD', LANG.CR.txt_profit + ' - ' + LANG.SERVER.txt_RES_deuterio],
           [/{COLOR_RD}/gi,   '#ED7010', LANG.CR.txt_profit + ' - ' + LANG.CR.txt_defHarvest],
           [/{COLOR_RDM}/gi,  '#ED7010', LANG.CR.txt_profit + ' - ' + LANG.SERVER.txt_RES_metal],
           [/{COLOR_RDC}/gi,  '#ED7010', LANG.CR.txt_profit + ' - ' + LANG.SERVER.txt_RES_cristal],
           [/{COLOR_RDD}/gi,  '#ED7010', LANG.CR.txt_profit + ' - ' + LANG.SERVER.txt_RES_deuterio],
           [/{COLOR_L}/gi,    '#CCFF66', '\u0025 ' + LANG.CR.txt_moon],
           [/{COLOR_IN}/gi,   '#FFFFFF', LANG.CR.txt_others]
           ];
        }

        if ( GM_getValue('batallaColor0' + strUniverse, arrColorBatalla[0][1]) == -1 )
        {
             for(var z = 0 ; z < arrColorBatalla.length ; z++)
                 GM_setValue('batallaColor' + z + strUniverse, arrColorBatalla[z][1]);

        }
        else
        {
            for(var z = 0 ; z < arrColorBatalla.length ; z++)
                if (GM_getValue('batallaColor' + z + strUniverse, -1) != -1)
                    arrColorBatalla[z][1] = GM_getValue('batallaColor' + z + strUniverse, -1);
        }

        LANG.SERVER.txt_CR_SHIP_SH_PCarga       = GM_getValue("batallaName1" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_PCarga);
        LANG.SERVER.txt_CR_SHIP_SH_GrCarga      = GM_getValue("batallaName2" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_GrCarga);
        LANG.SERVER.txt_CR_SHIP_SH_CLigero      = GM_getValue("batallaName3" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_CLigero);
        LANG.SERVER.txt_CR_SHIP_SH_CPesado      = GM_getValue("batallaName4" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_CPesado);
        LANG.SERVER.txt_CR_SHIP_SH_Crucero      = GM_getValue("batallaName5" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Crucero);
        LANG.SERVER.txt_CR_SHIP_SH_NB           = GM_getValue("batallaName6" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_NB);
        LANG.SERVER.txt_CR_SHIP_SH_Acoraz       = GM_getValue("batallaName7" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Acoraz);
        LANG.SERVER.txt_CR_SHIP_SH_Bomb         = GM_getValue("batallaName8" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Bomb);
        LANG.SERVER.txt_CR_SHIP_SH_Destruc      = GM_getValue("batallaName9" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Destruc);
        LANG.SERVER.txt_CR_SHIP_SH_Edlm         = GM_getValue("batallaName10" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Edlm);
        LANG.SERVER.txt_CR_SHIP_SH_Colony       = GM_getValue("batallaName11" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Colony);
        LANG.SERVER.txt_CR_SHIP_SH_Recy         = GM_getValue("batallaName12" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Recy);
        LANG.SERVER.txt_CR_SHIP_SH_Sonda        = GM_getValue("batallaName13" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Sonda);
        LANG.SERVER.txt_CR_SHIP_SH_Satelite     = GM_getValue("batallaName14" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Satelite);
        LANG.SERVER.txt_CR_DEFENSE_SH_Lanza     = GM_getValue("batallaName15" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_Lanza);
        LANG.SERVER.txt_CR_DEFENSE_SH_LPeque    = GM_getValue("batallaName16" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_LPeque);
        LANG.SERVER.txt_CR_DEFENSE_SH_LGrande   = GM_getValue("batallaName17" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_LGrande);
        LANG.SERVER.txt_CR_DEFENSE_SH_CGauss    = GM_getValue("batallaName18" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CGauss);
        LANG.SERVER.txt_CR_DEFENSE_SH_CIonico   = GM_getValue("batallaName19" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CIonico);
        LANG.SERVER.txt_CR_DEFENSE_SH_CPlasma   = GM_getValue("batallaName20" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CPlasma);
        LANG.SERVER.txt_CR_DEFENSE_SH_CupPeque  = GM_getValue("batallaName21" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CupPeque);
        LANG.SERVER.txt_CR_DEFENSE_SH_CupGrande = GM_getValue("batallaName22" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CupGrande);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('LoadColoresCR [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Opciones del script
 */
function loadOptions()
{
  try {
     if (DEBUG_MODE > 0) GM_log('loadOptions: ' + strPaginaActual);

     strUniverse = getUniverse();

     if (! getLangPack()) {

         //Establecer idioma del script
         switch (getLanguage())
         {
             case 'ES': LANG = LANG_ES;
                        break;

             case 'EN': LANG = LANG_EN;
                        break;

             case 'FR': LANG = LANG_FR;
                        break;

             default:   LANG = LANG_EN;
                        break;
         }
     }

     if ( (LANG.CR_FRIKI.txt_RES_metal) &&
          (trim(LANG.CR_FRIKI.txt_RES_metal).length > 0))
         availCRFriki = true
     else
         availCRFriki = false;

     //Color de la fuente de la cofiguracion del script
     if ( VERSION_LPUNKTKIT.indexOf('\u042F') >= 0 ) {
         strColor_LPuNKTKit    = GM_getValue("strColor_LPuNKTKit" + strUniverse, COLOR_LPUNKTKIT_T);
         strUrl_Script         = URL_SCRIPT_T;
     } else {
         strColor_LPuNKTKit    = GM_getValue("strColor_LPuNKTKit" + strUniverse, COLOR_LPUNKTKIT);
         strUrl_Script         = URL_SCRIPT;
     }

     // Nivel de ionica, para desmontar edificios
     lvlIonica                 = GM_getValue("level_ionica" + strUniverse, 0);

     //Links
     show_PayPal               = GM_getValue("showPayPal" + strUniverse, SHOW_PAYPAL);

     link1_name                = GM_getValue("link1_name" + strUniverse, LINK1_NAME).substring(0, LINK_NAME_LENGTH);
     link1_href                = GM_getValue("link1_href" + strUniverse, LINK1_HREF);

     link2_name                = GM_getValue("link2_name" + strUniverse, LINK2_NAME).substring(0, LINK_NAME_LENGTH);
     link2_href                = GM_getValue("link2_href" + strUniverse, LINK2_HREF);

     link3_name                = GM_getValue("link3_name" + strUniverse, LINK3_NAME).substring(0, LINK_NAME_LENGTH);
     link3_href                = GM_getValue("link3_href" + strUniverse, LINK3_HREF);

     link4_name                = GM_getValue("link4_name" + strUniverse, LINK4_NAME).substring(0, LINK_NAME_LENGTH);
     link4_href                = GM_getValue("link4_href" + strUniverse, LINK4_HREF);

     set_Clock_Links           = GM_getValue("setClockLinks" + strUniverse, SET_CLOCK_LINKS);

     //Opciones
     set_Fix_Action_Icons      = GM_getValue("setFixActionIcons" + strUniverse, SET_FIX_ACTION_ICONS);
     set_Focus_Correctly       = GM_getValue("setFocusCorrectly" + strUniverse, SET_FOCUS_CORRECTLY);
     disable_Useless_Stuff     = GM_getValue("disableUselessStuff" + strUniverse, DISABLE_USELESS_STUFF);
     fix_Forum_Link            = GM_getValue("fixForumLink" + strUniverse, FIX_FORUM_LINK);
     disable_Star              = GM_getValue("disableStar" + strUniverse, DISABLE_STAR);
//     show_Confirm_Trader       = GM_getValue("showConfirmTrader" + strUniverse, SHOW_CONFIRM_TRADER);
     use_Short_Header          = GM_getValue("useShortHeader" + strUniverse, USE_SHORT_HEADER);
     show_Trade_Calculator     = GM_getValue("showTradeCalculator" + strUniverse, SHOW_TRADE_CALCULATOR);

     //Menu superior
     show_Uni_Name_In_Pillory  = GM_getValue("showUniNameInPillory" + strUniverse, SHOW_UNI_NAME_IN_PILLORY);
     show_Pranger_In_Header    = GM_getValue("showPrangerInHeader" + strUniverse, SHOW_PRANGER_IN_HEADER);
     show_Options_In_UserName  = GM_getValue("showOptionsInUserName" + strUniverse, SHOW_OPTIONS_IN_USERNAME);

     // Recursos
     show_Daily_Ships_Defenses = GM_getValue("showDailyShipsDefenses" + strUniverse, SHOW_DAILY_SHIPS_DEFENSES);
     show_Production_Ratio     = GM_getValue("showProductionRatio" + strUniverse, SHOW_PRODUCTION_RATIO);
     show_Llenado_Almacenes    = GM_getValue("showLlenadoAlmacenes" + strUniverse, SHOW_LLENADO_ALMACENES);

     color_M_Warehouse_0       = GM_getValue("colorMWarehouse0" + strUniverse, COLOR_M_WAREHOUSE_0);
     color_C_Warehouse_0       = GM_getValue("colorCWarehouse0" + strUniverse, COLOR_C_WAREHOUSE_0);
     color_D_Warehouse_0       = GM_getValue("colorDWarehouse0" + strUniverse, COLOR_D_WAREHOUSE_0);
     color_M_Warehouse_80      = GM_getValue("colorMWarehouse80" + strUniverse, COLOR_M_WAREHOUSE_80);
     color_C_Warehouse_80      = GM_getValue("colorCWarehouse80" + strUniverse, COLOR_C_WAREHOUSE_80);
     color_D_Warehouse_80      = GM_getValue("colorDWarehouse80" + strUniverse, COLOR_D_WAREHOUSE_80);
     color_M_Warehouse_100     = GM_getValue("colorMWarehouse100" + strUniverse, COLOR_M_WAREHOUSE_100);
     color_C_Warehouse_100     = GM_getValue("colorCWarehouse100" + strUniverse, COLOR_C_WAREHOUSE_100);
     color_D_Warehouse_100     = GM_getValue("colorDWarehouse100" + strUniverse, COLOR_D_WAREHOUSE_100);

     color_M_Den_0             = GM_getValue("colorMDen0" + strUniverse, COLOR_M_DEN_0);
     color_C_Den_0             = GM_getValue("colorCDen0" + strUniverse, COLOR_C_DEN_0);
     color_D_Den_0             = GM_getValue("colorDDen0" + strUniverse, COLOR_D_DEN_0);
     color_M_Den_80            = GM_getValue("colorMDen80" + strUniverse, COLOR_M_DEN_80);
     color_C_Den_80            = GM_getValue("colorCDen80" + strUniverse, COLOR_C_DEN_80);
     color_D_Den_80            = GM_getValue("colorDDen80" + strUniverse, COLOR_D_DEN_80);
     color_M_Den_100           = GM_getValue("colorMDen100" + strUniverse, COLOR_M_DEN_100);
     color_C_Den_100           = GM_getValue("colorCDen100" + strUniverse, COLOR_C_DEN_100);
     color_D_Den_100           = GM_getValue("colorDDen100" + strUniverse, COLOR_D_DEN_100);

     show_Resources_Info       = GM_getValue("showResourcesInfo" + strUniverse, SHOW_RESOURCES_INFO);

     color_Res_Almacen         = GM_getValue("colorResAlmacen" + strUniverse, COLOR_RES_ALMACEN);
     color_Res_Den             = GM_getValue("colorResDen" + strUniverse, COLOR_RES_DEN);
     color_Res_Prod            = GM_getValue("colorResProd" + strUniverse, COLOR_RES_PROD);
     color_Energy_Used         = GM_getValue("colorEnergyUsed" + strUniverse, COLOR_ENERGY_USED);

     //Galaxia
     highlight_Players         = GM_getValue("highlightPlayers" + strUniverse, HIGHLIGHT_PLAYERS);
     show_Link_Fixed           = GM_getValue("showLinkFixed" + strUniverse, SHOW_LINK_FIXED);

     //Planetas
//     show_Planet_Nav_Keys      = GM_getValue("showPlanetNavKeys" + strUniverse, SHOW_PLANET_NAV_KEYS);
     show_Moons_Right          = GM_getValue("showMoonsRight" + strUniverse, SHOW_MOONS_RIGHT);
     show_Small_Planets        = GM_getValue("showSmallPlanets" + strUniverse, SHOW_SMALL_PLANETS);
     show_Full_Planet          = GM_getValue("showFullPlanet" + strUniverse, SHOW_FULL_PLANET);
     color_Full_Planet_0       = GM_getValue("colorFullPlanet" + strUniverse, COLOR_FULL_PLANET_0);
     color_Full_Planet_1       = GM_getValue("colorFullPlanet1" + strUniverse, COLOR_FULL_PLANET_1);
     color_Full_Planet_2       = GM_getValue("colorFullPlanet2" + strUniverse, COLOR_FULL_PLANET_2);
     color_Full_Planet_3       = GM_getValue("colorFullPlanet3" + strUniverse, COLOR_FULL_PLANET_3);
     show_Planeta_Activo       = GM_getValue("showPlanetaActivo" + strUniverse, SHOW_PLANETA_ACTIVO);

     //Informacion
     show_Range                = GM_getValue("showRange" + strUniverse, SHOW_RANGE);
     show_Efficiency           = GM_getValue("showEfficiency" + strUniverse, SHOW_EFFICIENCY);
     show_Time_Ships_Defenses  = GM_getValue("showTimeShipsDefenses" + strUniverse, SHOW_TIME_SHIPS_DEFENSES);
     show_Demolish             = GM_getValue("showDemolish" + strUniverse, SHOW_DEMOLISH);

     //Satelites
     show_Sats_Balance         = GM_getValue("showSatsBalance" + strUniverse, SHOW_SATS_BALANCE);
     show_Sats_Graviton        = GM_getValue("showSatsGraviton" + strUniverse, SHOW_SATS_GRAVITON);
     show_Sats_Terraformer     = GM_getValue("showSatsTerraformer" + strUniverse, SHOW_SATS_TERRAFORMER);

     //Mensajes
     current_Planet_Name       = GM_getValue("currentPlanetName" + strUniverse, CURRENT_PLANET_NAME);
//     reply_CC                  = GM_getValue("replyCC" + strUniverse, REPLY_CC);
     show_Colored_Messages     = GM_getValue("showColoredMessages" + strUniverse, SHOW_COLORED_MESSAGES);
     show_BBCode               = GM_getValue("showBBCode" + strUniverse, SHOW_BBCODE);
     show_Smiles               = GM_getValue("showSmiles" + strUniverse, SHOW_SMILES);
     show_Message_Button_Left  = GM_getValue("showMessageButtonLeft" + strUniverse, SHOW_MESSAGE_BUTTON_LEFT);

     //Compactador
     show_Compactador_Batallas = GM_getValue("showCompactadorBatallas" + strUniverse, SHOW_COMPACTADOR_BATALLAS);
     hide_Stolen_CR            = GM_getValue("hideStolenCR" + strUniverse, HIDE_STOLEN_CR);
     hide_Debris_CR            = GM_getValue("hideDebrisCR" + strUniverse, HIDE_DEBRIS_CR);
     show_Escombros_SAC        = GM_getValue("showEscombrosSAC" + strUniverse, SHOW_ESCOMBROS_SAC);
     modo_Reparto_SAC          = GM_getValue("modoRepartoSAC" + strUniverse, MODO_REPARTO_SAC);
     rec_Perdidas_SAC          = GM_getValue("recPerdidasSAC" + strUniverse, REC_PERDIDAS_SAC);
     rat_Metal_SAC             = GM_getValue("ratMetalSAC" + strUniverse, RAT_METAL_SAC);
     rat_Cristal_SAC           = GM_getValue("ratCristalSAC" + strUniverse, RAT_CRISTAL_SAC);
     rat_Deuterio_SAC          = GM_getValue("ratDeuterioSAC" + strUniverse, RAT_DEUTERIO_SAC);

     if (availCRFriki)
         usar_CR_Friki         = GM_getValue("usarCRFriki" + strUniverse, USAR_CR_FRIKI);

     // Recursos transportados
     fix_Tooltips              = GM_getValue("fixTooltips" + strUniverse, FIX_TOOLTIPS);
     show_Fleet_Resources      = GM_getValue("showFleetResources" + strUniverse, SHOW_FLEET_RESOURCES);
     show_Resources_Per_Fleet  = GM_getValue("showResourcesPerFleet" + strUniverse, SHOW_RESOURCES_PER_FLEET);
     show_Empty_Space          = GM_getValue("showEmptySpace" + strUniverse, SHOW_EMPTY_SPACE);

     color_Metal               = GM_getValue("colorMetal" + strUniverse, COLOR_METAL);
     color_Cristal             = GM_getValue("colorCristal" + strUniverse, COLOR_CRISTAL);
     color_Deuterio            = GM_getValue("colorDeuterio" + strUniverse, COLOR_DEUTERIO);
     color_Empty_Space         = GM_getValue("colorEmptySpace" + strUniverse, COLOR_EMPTY_SPACE);

     // Flota
     show_Color_Flight_Slots   = GM_getValue("showColorFlightSlots" + strUniverse, SHOW_COLOR_FLIGHT_SLOTS);
     color_Slot_0              = GM_getValue("colorSlot0" + strUniverse, COLOR_SLOT_0);
     color_Slot_1              = GM_getValue("colorSlot1" + strUniverse, COLOR_SLOT_1);
     color_Slot_2              = GM_getValue("colorSlot2" + strUniverse, COLOR_SLOT_2);
     color_Slot_3              = GM_getValue("colorSlot3" + strUniverse, COLOR_SLOT_3);

     show_Load_Buttons         = GM_getValue("showLoadButtons" + strUniverse, SHOW_LOAD_BUTTONS);
     remove_Adv                = GM_getValue("removeAdv" + strUniverse, REMOVE_ADV);
     show_Return_Fleet_Question= GM_getValue("showReturnFleetQuestion" + strUniverse, SHOW_RETURN_FLEET_QUESTION);
     show_Fleet_Content        = GM_getValue("showFleetContent" + strUniverse, SHOW_FLEET_CONTENT);
     show_Dest_Player_Name     = GM_getValue("showDestPlayerName" + strUniverse, SHOW_DEST_PLAYER_NAME);
     use_Direct_Spy            = GM_getValue("useDirectSpy" + strUniverse, USE_DIRECT_SPY);
//     show_Auto_Expo_Fleet      = GM_getValue("showAutoExpoFleet" + strUniverse, SHOW_AUTO_EXPO_FLEET);
//     show_No_Escape            = GM_getValue("showNoEscape" + strUniverse, SHOW_NO_ESCAPE);
     color_No_Escape           = GM_getValue("colorNoEscape" + strUniverse, COLOR_NO_ESCAPE);
     color_Escape              = GM_getValue("colorEscape" + strUniverse, COLOR_ESCAPE);

     // Teclas rapidas
     show_Shortcuts            = GM_getValue("showShortcuts" + strUniverse, SHOW_SHORTCUTS);
     show_Key_Everywhere       = GM_getValue("showKeyEverywhere" + strUniverse, SHOW_KEY_EVERYWHERE);
     show_Key_Mailbox          = GM_getValue("showKeyMailbox" + strUniverse, SHOW_KEY_MAILBOX);
     show_Key_Fleet            = GM_getValue("showKeyFleet" + strUniverse, SHOW_KEY_FLEET);
     show_Key_Trader           = GM_getValue("showKeyTrader" + strUniverse, SHOW_KEY_TRADER);

     // Chat de alianza
     show_Chat                 = GM_getValue("showChat" + strUniverse, SHOW_CHAT);
     id_Chat                   = GM_getValue("idChat" + strUniverse, ID_CHAT);
     link_Chat                 = GM_getValue("linkChat" + strUniverse, LINK_CHAT);

     // Resalte de escombros
     min_Escombros             = GM_getValue("minEscombros" + strUniverse, MIN_ESCOMBROS);

     show_Debris               = GM_getValue("showDebris" + strUniverse, SHOW_DEBRIS);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('loadOptions [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Retarted Star
// description    Removes the annoying blinky stars in 1.2.1
function QuitarEstrella(blnQuitar)
{
  try {
       if (! blnQuitar) return;

       if (DEBUG_MODE > 0) GM_log('QuitarEstrella: ' + strPaginaActual);

       var star = document.getElementById('star');
       if (star) star.parentNode.removeChild(star);

       star = document.getElementById('star1');
       if (star) star.parentNode.removeChild(star);

       star = document.getElementById('star2');
       if (star) star.parentNode.removeChild(star);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('QuitarEstrella [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function addOptions()
{
  try {
        if ((strPaginaActual == 'showmessage') ||
            (strPaginaActual == "combatreport") ||
            (strPaginaActual == "writemessage") ||
            (strPaginaActual == "search") ||
            (strPaginaActual == 'buddies'))
            return;

        if (DEBUG_MODE > 0) GM_log('addOptions: ' + strPaginaActual);

        const SIZE_FONT = '10px';

        var strImagen = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAd" +
                        "CAYAAADGgB7AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA" +
                        "AgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpR" +
                        "PAAAAAlwSFlzAAAK6wAACusBgosNWgAAAd1JREFUWEftl11OwzAMx9" +
                        "cCGt26teto99Gxln0IsSNwBV554ZXzcQ6OwBmQOAECZOKwhKxNtiTL" +
                        "EEJU+qupY7u/OFaqeg1yNa9v8dYYvjzBx/sbHbu8jo5PGs/pysOcr4" +
                        "8P+qkRrFhcweRiuamSPFdV9cFn5iObI7ZiuYK8nAMrgDYZBm5AyYB0" +
                        "bQwO/YUxgmXjKWhDoSMGOANTLOB8dmkJplsRWz9SPauKjaezej/ZQr" +
                        "BtXMfn5YLmtgKTNvk+YEIsgqHcgDmCwgX/WrAJbqVtj93c3YNMuGLV" +
                        "nKndaivzYk4blL2s1nPrra3Oi8+yOTGPFRg9yxyCVSEHeWHe/M2gRY" +
                        "NQriqGeVi1WO7maWB28pPDHwOoGJho2zYv+st6TpLH6KtkDFaFkC1K" +
                        "sUg3YNXk2yqq6ftHwEzPJFV1VHk832ftYlcxVdOb2AUI3rtC/M+A7Y" +
                        "A4HJj/vQWgA+F5ngxGtLmrGAMSIXFrNCAOVzEKIFTNpNcUvu4q5gDG" +
                        "biuDdndXX+w9j1UPgtDsW4n/e2GcQCdKIIx6VO0uUSfmanUi4ArJmK" +
                        "u7OSYxLRSZxxxhFHMZ/1diACrJRpCkI4jPBl/qZ1xRP4UoIWJ3Ps4E" +
                        "e33cS4eAYu8warB/Z4MKfALth6dmKmiZygAAAABJRU5ErkJggg%3D%3D";

        var strImagen_on = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAA" +
                        "AAdCAYAAADGgB7AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQU" +
                        "AAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwn" +
                        "LpRPAAAAAlwSFlzAAAK6wAACusBgosNWgAAAd1JREFUWEftl21OwzA" +
                        "MhtcCGt26teto99Gxln0IsSNwDq7EHfjPX87BETgDEidAgEwclpC1y" +
                        "ZZkGUKISq+aOrb7xLFS1WuQq3l9g7fG8OUJPt7f6NjldXR80nhOVx7" +
                        "mfH180E+NYMXiCiYXy02V5Lmqqg8+Mx/ZHLEVyxXk5RxYAbTJMHADS" +
                        "gaka2Nw6C+MESwbT0EbCh0xwBmYYgHns0tLMN2K2PqR6llVbDyd1fv" +
                        "JFoJt4zo+Lxc0txWYtMn3ARNiEQzlBswRFC7414JNcCtte+z27h5kw" +
                        "hWr5kztVluZF3PaoOxltZ5bb211XnyWzYl5rMDoWeYQrAo5yAvz5m8" +
                        "GLRqEclUxzMOqxXI3TwOzk58c/hhAxcBE27Z50V/Wc5I8Rl8lY7Aqh" +
                        "GxRikW6Aasm31ZRTd8/AmZ6Jqmqo8rj+T5rF7uKqZrexC5A8N4V4n8" +
                        "GbAfE4cD87y0AHQjP82Qwos1dxRiQCIlbowFxuIpRAKFqJr2m8HVXM" +
                        "QcwdlsZtLu7+mLveax6EIRm30r83wvjBDpRAmHUo2p3iToxV6sTAVd" +
                        "IxlzdzTGJaaHIPOYIo5jL+L8SA1BJNoIkHUF8NvhSP+OK+ilECRG78" +
                        "3Em2OvjXjoEFHuHUYP9OxtU4BM90fxoQRjWOwAAAABJRU5ErkJggg%" +
                        "3D%3D";


        //insertamos el enlace en el menu izquierdo
        var link = window.document.createElement('a');
            link.setAttribute('href', 'javascript:void(0)');
            link.textContent = 'LPuNKTKit v' + VERSION_LPUNKTKIT;
            link.setAttribute('style', 'color:' + strColor_LPuNKTKit + ';font-size:' + SIZE_FONT);
            link.className = "menubutton";
            link.setAttribute('id', 'lpunktkit-button');
            link.addEventListener('click', showOptions, false);

        var myLi = document.createElement('li');
            myLi.setAttribute('id','lpunktkit-options');

        var myA = document.createElement('a');
            myA.setAttribute('href', strUrl_Script);
            myA.setAttribute('target', '_blank');
            myA.setAttribute('title', 'UserScripts.org \u00bb oGame Redesign: LPuNKTKit');

        var mySpan = document.createElement('span');
            mySpan.setAttribute('class', 'menu_icon');

        var myImg = document.createElement('img');
            myImg.setAttribute('src', strImagen);
            myImg.setAttribute('rel', strImagen_on);
            myImg.setAttribute('class', 'lpunktkit-micon');
            myImg.setAttribute('height', 29);
            myImg.setAttribute('width', 38);

            mySpan.appendChild(myImg);

            myA.appendChild(mySpan);

            myLi.appendChild(myA);
            myLi.appendChild(link);

        var theUl = document.getElementById('menuTableTools');

        var theLi = theUl.firstChild;

        if (theLi != null)
            theUl.insertBefore(myLi, theLi)

        else
            theUl.appendChild(myLi);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('addOptions [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function showOptions()
{
  try {
      if (DEBUG_MODE > 0) GM_log('showOptions: ' + strPaginaActual);

      //si quedo abierta una capa anterior, la borramos.
      var posibleCapaAnterior = $('#lpunktkit-overlay');
      if (posibleCapaAnterior.length) posibleCapaAnterior.remove();

      //insertamos la capa de opciones
      var o = '<div id="lpunktkit-overlay" style="display:none;position:' +
              'absolute;z-index:99;"></div>';
      $('body').prepend(o);
      var overlay = $('#lpunktkit-overlay');
          overlay.css('width', $(window).width() );
          overlay.css('height', $(window).height() );

      //link de cierre
      var aCerrar = window.document.createElement('a');
          aCerrar.setAttribute('href', 'javascript:void(0)');
          aCerrar.setAttribute('class','lpunktkit-cerrar');

          aCerrar.addEventListener('click', hideOptions, false);

      imgCierre = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMA" +
                  "AAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAnFBMVEX////4YWP/dXjyS07/dX" +
                  "j9bXD6a234YWP4XWD2WVv2VFfsOTzoLzHmKSvkISP2VFf0TE/vREftPT/i" +
                  "HB72WVvvREf0TE//hon/gYX/fYD/e33/dXj/cXP9bXD/a236a23/Zmb4YW" +
                  "P4XWD/Wl32WVv/VVj2VFf3VFb0TE/yS072SUvvREfuQELtPT/sOTzrMzXo" +
                  "LzHnLC/mKSvkISPh2jkWAAAANHRSTlMAESIiMzMzMzMzMzMzMzNERERERH" +
                  "d3qv//////////////////////////////////////xnOhPwAAAAlwSFlz" +
                  "AAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcm" +
                  "tzT7MfTgAAAJJJREFUGJVtzNcagjAMBtC498TVZWktFaEVx/u/mx2gXJib" +
                  "Pyf5EoBWders9mOOd6toQgbBgh96wQjRobPkWO79huIj5qPgMt5ycqJCct" +
                  "IYQDCEMVFfAyh8yWjLE0UyN5j9LChl56udR0+dlbnnaV4tajNtAKoyLZ5L" +
                  "N1hroa3fvEzxSHyzudl4+44G2DbfE/hTH+8DDcV0Y3OAAAAAAElFTkSuQmCC";

      aCerrar.setAttribute('style', 'position:absolute;top:0;right:0;width:16px;' +
                                    'height:16px;background:url(' + imgCierre +
                                    ') no-repeat scroll 0 0 transparent');

      var fDonar = document.createElement('form');
          fDonar.setAttribute('action', 'https://www.paypal.com/cgi-bin/webscr');
          fDonar.setAttribute('method','post');
          fDonar.setAttribute('class', 'lpunktkit-donar');
          fDonar.setAttribute('target', '_blank');

      var iDonar = document.createElement('input');
          iDonar.setAttribute('type', 'hidden');
          iDonar.setAttribute('name', 'cmd');
          iDonar.setAttribute('value', '_s-xclick');

      fDonar.appendChild(iDonar);

      iDonar = document.createElement('input');
      iDonar.setAttribute('type', 'hidden');
      iDonar.setAttribute('name', 'encrypted');
      iDonar.setAttribute('value', '-----BEGIN PKCS7-----MIIHLwYJKoZIhvcNAQcEoII' +
                          'HIDCCBxwCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMx' +
                          'CzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwE' +
                          'gYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0cz' +
                          'ERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHB' +
                          'heXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYAN2Qx/bKQLqryD' +
                          'KAnKd1gwHFSWikPROE2flU3VIQZWoUvWy8JCUaSxm7TdUPUF0CsLi' +
                          'Dr4yUt/P/BOsA8Ol+VAINdIJCqjaWlv+S89+Oi0MNmxQxsn0C3dZM' +
                          'fv2gCBymEkcMmtv7Fyeevrs8nWalO0c94xcXg5wav0VnI/CEcbCDE' +
                          'LMAkGBSsOAwIaBQAwgawGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQI' +
                          'NetGbvDPgLuAgYgYpZBXpnCLJ3beHEiGlxhnJTeuq6VavCAwTLEvH' +
                          'TZKXmzSmbWcASsCOV3KpSS669u6pr3rAJd+d6BtZbwiqysv1Wrqrj' +
                          'FaR4Wl2VZQBf7yqoOq3Lw826nIxjdbSSM844eSRjBsp4OHJkaLuhO' +
                          'g+a36vGAVO88QlGDscD1ci4Df6KVtZ3p4WMuaoIIDhzCCA4MwggLs' +
                          'oAMCAQICAQAwDQYJKoZIhvcNAQEFBQAwgY4xCzAJBgNVBAYTAlVTM' +
                          'QswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMB' +
                          'IGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHM' +
                          'xETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBw' +
                          'YXlwYWwuY29tMB4XDTA0MDIxMzEwMTMxNVoXDTM1MDIxMzEwMTMxN' +
                          'VowgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBx' +
                          'MNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzA' +
                          'RBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRww' +
                          'GgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMIGfMA0GCSqGSIb3D' +
                          'QEBAQUAA4GNADCBiQKBgQDBR07d/ETMS1ycjtkpkvjXZe9k+6CieL' +
                          'uLsPumsJ7QC1odNz3sJiCbs2wC0nLE0uLGaEtXynIgRqIddYCHx88' +
                          'pb5HTXv4SZeuv0Rqq4+axW9PLAAATU8w04qqjaSXgbGLP3NmohqM6' +
                          'bV9kZZwZLR/klDaQGo1u9uDb9lr4Yn+rBQIDAQABo4HuMIHrMB0GA' +
                          '1UdDgQWBBSWn3y7xm8XvVk/UtcKG+wQ1mSUazCBuwYDVR0jBIGzMI' +
                          'GwgBSWn3y7xm8XvVk/UtcKG+wQ1mSUa6GBlKSBkTCBjjELMAkGA1U' +
                          'EBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBW' +
                          'aWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2Z' +
                          'V9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQ' +
                          'EWDXJlQHBheXBhbC5jb22CAQAwDAYDVR0TBAUwAwEB/zANBgkqhki' +
                          'G9w0BAQUFAAOBgQCBXzpWmoBa5e9fo6ujionW1hUhPkOBakTr3YCD' +
                          'jbYfvJEiv/2P+IobhOGJr85+XHhN0v4gUkEDI8r2/rNk1m0GA8HKd' +
                          'dvTjyGw/XqXa+LSTlDYkqI8OwR8GEYj4efEtcRpRYBxV8KxAW93YD' +
                          'WzFGvruKnnLbDAF6VR5w/cCMn5hzGCAZowggGWAgEBMIGUMIGOMQs' +
                          'wCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50' +
                          'YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLF' +
                          'ApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSI' +
                          'b3DQEJARYNcmVAcGF5cGFsLmNvbQIBADAJBgUrDgMCGgUAoF0wGAY' +
                          'JKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcN' +
                          'MTMwMjA3MjMzNzI3WjAjBgkqhkiG9w0BCQQxFgQUfHZ4f3K3yiglO' +
                          '/3jBH/A+z7OMRYwDQYJKoZIhvcNAQEBBQAEgYBeW+rO0cRX9JDLJ3' +
                          'IMhuQrzw3dL1jFqoIoDldFRDeuO72WVc+7BCzx5WU0h8YaBSXwD2M' +
                          'xac6V0aIVknSUO0kOkvdcCryKovUJK1QjkoLu6ZDXRuVQz+7RH1Rp' +
                          'gw1+18Y1Rc5s6I5JVy33t7WzuXepa8NAR6890p7cdQSAg/8Z7w==-' +
                          '----END PKCS7-----');

      fDonar.appendChild(iDonar);

      iDonar = document.createElement('input');
      iDonar.setAttribute('type', 'image');
      iDonar.setAttribute('src', 'data:image/gif;base64,R0lGODlhSgAVAPcmAP+sLf7i' +
                          'q/7gpf7ksf7en/+6Tf+vM7+LNv+xOu7bskBedhA+a/+0QN+aLo9/W' +
                          'HBuWxA+aoCQl0BfeXB+f2BhUc+TMn+Jg7+YU76zkZ+HVp6jmX+Nj9' +
                          '7Qre+iKo6Xk56gke+yT/63R3+LiTBUdO7Tm1BdXs4HAkBfd+7ZrH+' +
                          'Khs+VON7MomB0fkBgeq6ojf7HbGBze765o87Bnp6hlf/s0M7Do/7R' +
                          'hb62mjBKWxA7YjBUczBUcv64SmB2gp9+Qs7EqP/89jBTcY6Uif+lN' +
                          'EBedN+dNIBwSa6wov/NgtEQBY6Vjb+OO/7amP++Xf+3RlBpev7UjP' +
                          '/Ti6+QVb++r8+hUs6/mf/05P/CYNEOBc6+lN7Knf7epP+oLH+MjJ6' +
                          'fjVBrfmBmXf/05v/ryf61Rv/ZoCBJbv/it3BoTY6WkP/py//YnyBC' +
                          'X/+vOkBVYP+/Wf63S767qP7WjP65Tf/w2f/FZu/gwv/u0++kMVBsg' +
                          'mB1gP7hqmB4h//uzv7dnv/w2HCAhP7Qf66smf+mLf/boP6/WTBMYf' +
                          '7Jcv+uM//y2yBIba6unv/sz//itv+pNP+yP/7mt/+pJv/15//rzv7' +
                          'pvv/syP/dqv/46v/03//OhP/w0/+/Xv+xOAAzZswAAP+ZMwAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAACH5BAEAACYALAAAAABKABUAAAj/AE0IHGjCk8GDCBMq' +
                          'XMiwocOEBCMONLgoTKSLGC8CAZKxo8ePIEN+tJLGoMSJcyypXMmyp' +
                          'cuXMGPKfGnH00lPfi7p3Mmzp8+fQIMKDYrIJkFPYjIpXcq0qdOnUK' +
                          'NKncrHaMFBlLJq3cqVUoSvEaZ0HUuWa52yaClFMeppktu3cONOgsO' +
                          'pbt09cvPqfXsEz96/k6DY9MRjy6PDiBMr9sBJw6MELTj9OBxjgwcO' +
                          'hznESKBhQ4LDnDdoSJBAEacWmH9Y/qy49WEbPAy+MTSgtu3buHtwq' +
                          'lE7EKcuA3SPWLCA9xdOEkYgH4CCuATkaOzOmMFp+AIUuLMP0ENIjs' +
                          'ExIWwE/xhPvnx5HZzI3+Ak4gOnPwFWcMoTAP2HABDSyxAhI8CJ9CJ' +
                          'wcoN8JwTgnhLmJRjACyGEYJAjDDDwQh8CVGjhhRVyooCFQnDixROc' +
                          'aJHhhpzsMKIAVbCgQBklCqAAJwJ0qEAKLHCSAoYYMuFGhAwYxAYCQ' +
                          'DJARxwEFGmkkRhwMkGRJCQCAQlEcFJkFpzAkOSSV5IAQRAuuKAkAV' +
                          'sSYEGVFpSJwZFHAnIFkGwadIgBcMZpQAF01kmnA5w8cIEUhXDiQAE' +
                          'PcJIBCG1wcgGeGRSA6AV5glCCoFRwUkIBjD6gKBgg2EmnE3LKaZAg' +
                          'AIQq6qikUmAXJzkYEeodONSVgw8AmLCqQqyczNoqJ2twskQRdVEAw' +
                          'Bl2wUrqsKJyMRgkyCar7LIVHODsActC0mwHyDZbLbTIHtBAB9pC0k' +
                          'C33h5AbbTkIsvWEJukq+667Lbr7rvwxitvuo1Y5UkTmuSr77789uv' +
                          'vvwAHLLAmVgnkCRKYJKzwwgw37PDDEEccccETqVHJxRhnrPHGHHfs' +
                          '8ccck0HxUZ6YIcnJKKNMAw0pt+zyyzDHDDMjJp1E8kM456wzQycFBAA7');
      iDonar.setAttribute('border', '0');
      iDonar.setAttribute('name', 'submit');
      iDonar.setAttribute('alt', 'PayPal - The safer, easier way to pay online!');

      fDonar.appendChild(iDonar);

      iDonar = document.createElement('img');
      iDonar.setAttribute('border', '0');
      iDonar.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAA' +
                          'ACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D');
      iDonar.setAttribute('width', '1');
      iDonar.setAttribute('height', '1');

      fDonar.appendChild(iDonar);

      fDonar.setAttribute('style', 'position:absolute;top:0;left:100');

      var intPadding = ((screen.availWidth * 12) / 1280)

      var contenido =  '<br><br><table width=100% height=100%  >' +
                       '<tr valign=top height=100%>' +
                       '<td width=100% align=left>' +
                         '<table border=0 width=100%>' +
                         '<tr valign=top><td width=100%>' +
                            '<div id=hdrSection1>' + LANG.OPTION.txt_fontColor + ' </div>' + divClear +
                            '<table id=bodySection1 class=hidden width=100% ' +
                            'style="border: 1px solid ' + strColor_LPuNKTKit + ' !important;padding:2px;">';

      var strColorSize = 'font-size:' + (screen.availWidth < 1280 ? '9px;' : '11px;');

          contenido += '<tr valign=top><td width=3%></td>';

      var i;

      for ( i = 0; i < arrColorFont.length; i++)
      {
          var strColor = arrColorFont[i].replace(/\ /g, '').toLowerCase();

          contenido += '<td width=32%>' +
                       '<input id="chkColor' + i + '" name="chkColor" type="radio" >' +
                       '<span style="color:' + strColor + ';' + strColorSize + 'font-weight:bold;"> ' +
                       arrColorFont[i] + '</span></input></td>'

          if ( ( ( i + 1 ) % 3) == 0) {
              contenido += '</tr>';

              if (i < (arrColorFont.length-1))
                  contenido += '<tr valign=top><td></td>';
          }
      }

      if ( ( ( i + 1 ) % 3) != 0) contenido += '</tr>';

      contenido +=     '</table>' + hr;

      var intAnchoLinks1 = ((screen.availWidth * 140) / 1280);
      var intAnchoLinks2 = ((screen.availWidth * 460) / 1280);

      var strFontSize = 'font-size:' + (screen.availWidth < 1280 ? '10px;' : '12px;');

      contenido +=     '<table width=100% style="border: 1px solid ' +
                       strColor_LPuNKTKit + ' !important;padding:' + intPadding + 'px;">' +
                       '<tr valign=top><td width=100%>';

      contenido +=     '<div id=hdrSection2>' + LANG.MISC.txt_links + ' </div>' + divClear +
                       '<table cellpadding=0 cellspaccing=0 id=bodySection2 class=" " width=100%>' +
                       '<tr valign=top>' +
                       '<td width=2%></td><td align=left width=22%><input id="link1_name" type="text" value="' + link1_name +
                       '" style="background-color: transparent;color:' + strColor_LPuNKTKit + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';' +
                       'padding:1px;width:' + intAnchoLinks1 + 'px;' + strFontSize + '">' +
                       '</input></td>' +
                       '<td align=right width=76%><input id="link1_href" type="text" value="' + link1_href +
                       '" style="background-color:' +
                       'transparent;color:' + strColor_LPuNKTKit +
                       ';border:solid 1px ' + strColor_LPuNKTKit +
                       ';padding:1px;width:' + intAnchoLinks2 + 'px;' + strFontSize + '">' +
                       '</input>' + divClear + '</td>' +
                       '</tr><tr valign=top>' +
                       '<td></td><td><input id="link2_name" type="text" value="' + link2_name +
                       '" style="background-color: transparent;color:' + strColor_LPuNKTKit + ';' +
                       'border: solid 1px ' + strColor_LPuNKTKit + ';' +
                       'padding:1px;width:' + intAnchoLinks1 + 'px;' + strFontSize + '">' +
                       '</input></td>' +
                       '<td align=right><input id="link2_href" type="text" value="' + link2_href +
                       '" style="background-color:' +
                       'transparent;color:' + strColor_LPuNKTKit +
                       ';border:solid 1px ' + strColor_LPuNKTKit +
                       ';padding:1px;width:' + intAnchoLinks2 + 'px;' + strFontSize + '">' +
                       '</input>' + divClear + '</td>' +
                       '</tr><tr valign=top>' +
                       '<td></td><td><input id="link3_name" type="text" value="' + link3_name +
                       '" style="background-color:' +
                       'transparent;color:' + strColor_LPuNKTKit +
                       ';border:solid 1px ' + strColor_LPuNKTKit +
                       ';padding:1px;width:' + intAnchoLinks1 + 'px;' + strFontSize + '">' +
                       '</input></td>' +
                       '<td align=right><input id="link3_href" type="text" value="' + link3_href +
                       '" style="background-color:' +
                       'transparent;color:' + strColor_LPuNKTKit +
                       ';border:solid 1px ' + strColor_LPuNKTKit +
                       ';padding:1px;width:' + intAnchoLinks2 + 'px;' + strFontSize + '">' +
                       '</input>' + divClear + '</td>' +
                       '</tr><tr valign=top>' +
                       '<td></td><td><input id="link4_name" type="text" value="' + link4_name +
                       '" style="background-color:' +
                       'transparent;color:' + strColor_LPuNKTKit +
                       ';border:solid 1px ' + strColor_LPuNKTKit +
                       ';padding:1px;width:' + intAnchoLinks1 + 'px;' + strFontSize + '">' +
                       '</input></td>' +
                       '<td align=right><input id="link4_href" type="text" value="' + link4_href +
                       '" style="background-color:' +
                       'transparent;color:' + strColor_LPuNKTKit +
                       ';border:solid 1px ' + strColor_LPuNKTKit +
                       ';padding:1px;width:' + intAnchoLinks2 + 'px;' + strFontSize + '">' +
                       '</input></td></tr>' +
                       '<tr><td></td><td align=left colspan=2>' + divClear + divClear +

                       '<table cellpadding=0 cellspaccing=0 width=100%>' +
                       '<tr valign=top>' +
                       '<td width=2%></td><td align=left width=50%>' +
                       '<input type="checkbox" name="set_Clock_Links" id="set_Clock_Links"> ' +
                       LANG.OPTION.txt_setClockLinks + '</td>' +
                       '<td align=left width=50%>' +
                       '<input type="checkbox" name="show_PayPal" id="show_PayPal" > ' +
                       'Mostrar PayPal en la barra de enlaces' + '</td>' +
                       '</tr></table>' +

                       '</td>' +
                       '</tr>' +
                       '</table>' + hr;

      contenido +=     '<div id=hdrSection3>' + LANG.MISC.txt_general + ' </div>' + divClear +
                       '<table id=bodySection3 class=hidden width=100%>' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>';

      contenido +=     '<td width=49%><input type="checkbox" name="set_Focus_Correctly" ' +
                       'id="set_Focus_Correctly" ' + '> ' +
                       LANG.OPTION.txt_setFocusCorrectly + '</td>';

      contenido +=     '<td width=49%><input type="checkbox" name="fix_Forum_Link" ' +
                       'id="fix_Forum_Link" '  + '> ' +
                       LANG.OPTION.txt_fixForumLink + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="disable_Useless_Stuff" ' +
                       'id="disable_Useless_Stuff"> ' +
                       LANG.OPTION.txt_disableUselessStuff + '</td>';

      contenido +=     '<td><input type="checkbox" name="disable_Star" ' +
                       'id="disable_Star" '  + '> ' +
                       LANG.OPTION.txt_disableStar + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="radio" name="show_Confirm_Trader" ' +
                       'id="show_Confirm_Trader" disabled > ' +
                       LANG.OPTION.txt_confirmTrader + '</td>';

      contenido +=     '<td><input type="checkbox" name="use_Short_Header" ' +
                       'id="use_Short_Header" '  + '> ' +
                       LANG.OPTION.txt_useShortHeader + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Uni_Name_In_Pillory" ' +
                       'id="show_Uni_Name_In_Pillory" '  + '> ' +
                       LANG.OPTION.txt_showUniNameInPillory + '</td>';

      contenido +=     '<td><input type="checkbox" name="show_Pranger_In_Header" ' +
                       'id="show_Pranger_In_Header" '  + '> ' +
                       LANG.OPTION.txt_prangerInHeader + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Options_In_UserName" ' +
                       'id="show_Options_In_UserName" '  + '> ' +
                       LANG.OPTION.txt_optionsInUsername + '</td>';

      contenido +=     '<td><input type="checkbox" name="show_Trade_Calculator" ' +
                       'id="show_Trade_Calculator" '  + '> ' +
                       LANG.OPTION.txt_showTradeCalculator + '</td>';

      contenido +=     '</tr></table>' + hr;

      contenido +=     '<div id=hdrSection4>' + LANG.MISC.txt_planet + ' </div>' + divClear +
                       '<table id=bodySection4 class=hidden width=100%>' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Planeta_Activo" ' +
                       'id="show_Planeta_Activo" '  + '> ' +
                       'Resaltar Planeta/Luna Activo' + '</td>';

      contenido +=     '<td width=49%><input type="radio" name="show_Planet_Nav_Keys" disabled ' +
                       'id="show_Planet_Nav_Keys" '  + '> ' +
                       LANG.OPTION.txt_showPlanetNavKeys + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Moons_Right" ' +
                       'id="show_Moons_Right"> ' +
                       LANG.OPTION.txt_moonsToRight + '</td>';

      contenido +=     '<td><input type="checkbox" name="show_Small_Planets" ' +
                       'id="show_Small_Planets" '  + '> ' +
                       LANG.OPTION.txt_smallPlanets + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2><div id=hdrFullPlanet><input type="checkbox" name="show_Full_Planet" ' +
                       'id="show_Full_Planet" '  + '> ' +
                       LANG.OPTION.txt_fullPlanet + ' </div> ';

      contenido +=     '<table border=0 id=bodyFullPlanet class=hidden width=100%>' +
                       '<tr>' +
                       '<td width=2%></td>' +
                       '<td width=24%>0 ' + LANG.MISC.txt_emptyFields + ': </td>' +
                       '<td width=24%><input type="text" name="color_Full_Planet_0" ' +
                       'value="' + color_Full_Planet_0 + '" id="color_Full_Planet_0" ' +
                       'style="background-color:' + color_Full_Planet_0 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td width=2%></td>' +
                       '<td width=24%>1 ' + LANG.MISC.txt_emptyFields + ': </td>' +
                       '<td width=24%><input type="text" name="color_Full_Planet_1" ' +
                       'value="' + color_Full_Planet_1 + '" id="color_Full_Planet_1" ' +
                       'style="background-color:' + color_Full_Planet_1 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '</tr>' +
                       '<tr>' +
                       '<td></td>' +
                       '<td>2 ' + LANG.MISC.txt_emptyFields + ': </td>' +
                       '<td><input type="text" name="color_Full_Planet_2" ' +
                       'value="' + color_Full_Planet_2 + '" id="color_Full_Planet_2" ' +
                       'style="background-color:' + color_Full_Planet_2 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td>3 ' + LANG.MISC.txt_emptyFields + ': </td>' +
                       '<td><input type="text" name="color_Full_Planet_3" ' +
                       'value="' + color_Full_Planet_3 + '" id="color_Full_Planet_3" ' +
                       'style="background-color:' + color_Full_Planet_3 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '</tr>' +
                       '</table>' +
                       '</td>';

      contenido +=     '</tr>' +
                       '</table>' + hr;

      // Informacion
      contenido +=     '<div id=hdrSection5>' + LANG.MISC.txt_instalaciones + ' </div>' + divClear +
                       '<table id=bodySection5 class=hidden border=0 cellpadding=0 cellspacing=0 width=100%  >' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Time_Ships_Defenses" ' +
                       'id="show_Time_Ships_Defenses" '  + '> ' +
                       LANG.OPTION.txt_showTimeShipsDefenses + '</td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Efficiency" ' +
                       'id="show_Efficiency" '  + '> ' +
                       LANG.OPTION.txt_showEfficiency + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Range" ' +
                       'id="show_Range" > ' +
                       LANG.OPTION.txt_showRange + '</td>';

      contenido +=     '<td><input type="checkbox" name="show_Demolish" ' +
                       'id="show_Demolish" > ' +
                       'Mostrar coste demolicion' + '</td>';

      contenido +=     '</tr>' +
                       '</table>' + hr;

      // Galaxia
      contenido +=     '<div id=hdrSection6>' + LANG.MISC.txt_galaxia + ' </div>' + divClear +
                       '<table id=bodySection6 class=hidden border=0 cellpadding=0 cellspacing=0 width=100% height=100%  >' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>';

      contenido +=     '<td width=49%>' +
                       '<input type="checkbox" name="set_Fix_Action_Icons" ' +
                       'id="set_Fix_Action_Icons" '  + '> ' +
                       LANG.OPTION.txt_fixActionButtons + '</td>';

      contenido +=     '<td width=49%><input type="checkbox" name="highlight_Players" ' +
                       'id="highlight_Players" '  + '> ' +
                       LANG.OPTION.txt_highlightPlayers + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Link_Fixed" ' +
                       'id="show_Link_Fixed" '  + '> ' +
                       LANG.OPTION.txt_coordLinksFix + '</td>';

      contenido +=     '<td></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2>' + hr + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';
      // Debris
      contenido +=     '<td colspan=2>' +
                       '<div id=hdrDebris>' + LANG.MISC.txt_debris + ' </div>' + divClear +
                       '<table id=debrisSection class=hidden border=0 width=100%>' +
                       '<tr valign=bottom>';

      var selDebris = new Array();
          selDebris[0] = (show_Debris == 0) ? "selected" : "";
          selDebris[1] = (show_Debris == 1) ? "selected" : "";
          selDebris[2] = (show_Debris == 2) ? "selected" : "";
          selDebris[3] = (show_Debris == 3) ? "selected" : "";

      contenido +=       '<td width=50%>' +
                         LANG.MISC.txt_show +
                         ' <select id="show_Debris" style="border:solid 1px ' + strColor_LPuNKTKit + ';' +
                         'width:150px;color:' + strColor_LPuNKTKit + ';visibility:visible;">' +
                                '<option value=0 ' + selDebris[0] + ' style="color:' + strColor_LPuNKTKit + ';">' +
                                '---</option>'+
                                '<option value=1 ' + selDebris[1] + ' style="color:' + strColor_LPuNKTKit + ';">' +
                                LANG.OPTION.txt_showDebrisIcon + '</option>' +
                                '<option value=2 ' + selDebris[2] + ' style="color:' + strColor_LPuNKTKit + ';">' +
                                LANG.OPTION.txt_showDebris + '</option>' +
                                '<option value=3 ' + selDebris[3] + ' style="color:' + strColor_LPuNKTKit + ';">' +
                                LANG.OPTION.txt_showDebrisIcon + ' + ' + LANG.OPTION.txt_showDebris + '</option>' +
                         '</select>' +
                         '</td>' +
                         '<td><span style="font-size:smaller;">' +
                             ' [ 0x <input type="text" disabled style="width:8px;height:8px;' +
                             'border:1px solid rgb(131,145,156);background-color: rgb(131,145,156);">' +
                             ' \u00bb 1x <input type="text" disabled style="width:8px;height:8px;' +
                             'border:1px solid rgb(255,145,34);background-color: rgb(255,145,34);">' +
                             ' \u00bb 5x <input type="text" disabled style="width:8px;height:8px;' +
                             'border:1px solid rgb(220,20,60);background-color: rgb(220,20,60);">' +
                             ' \u00bb 10x <input type="text" disabled style="width:8px;height:8px;' +
                             'border:1px solid rgb(255,0,255);background-color: rgb(255,0,255);">' +
                             ' \u00bb 100x <input type="text" disabled style="width:8px;height:8px;' +
                             'border:1px solid rgb(139,0,139);background-color: rgb(139,0,139);"> ] ' +
                             '</span>' +
                         '</td>' +
                       '</tr>' +
                       '<tr valign=top>' +
                         '<td>' +
                         LANG.OPTION.txt_minEscombros + ':</td>' +
                         '<td width=50%><input id="min_Escombros" type="text" value="' + min_Escombros +
                         '" style="background-color: transparent;color:' + strColor_LPuNKTKit + ';' +
                         'border:solid 1px ' + strColor_LPuNKTKit + ';' +
                         'padding:1px;width:' + ((screen.availWidth * 150) / 1280) + 'px;' + strFontSize + '">' +
                         '</input></td>' +
                       '</tr>' +
                       '</table>' +
                       '</td>' +
                       '</tr></table>' + hr;

      // Recursos
      contenido +=     '<div id=hdrSection7>' + LANG.MISC.txt_produccion + ' </div>' + divClear +
                       '<table id="bodySection7" class="hidden" border=0 cellpadding=0 cellspacing=0 width=100%  >' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Production_Ratio" ' +
                       'id="show_Production_Ratio" ' + '> ' +
                       LANG.OPTION.txt_showProductionRatio + '</td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Daily_Ships_Defenses" ' +
                       'id="show_Daily_Ships_Defenses" ' + '> ' +
                       LANG.OPTION.txt_showDailyShipsDefenses + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2><div id=hdrFillWarehouse><input type="checkbox" name="show_Llenado_Almacenes" ' +
                       'id="show_Llenado_Almacenes" ' + '> ' +
                       LANG.OPTION.txt_showLlenadoAlmacenes + ' </div>' +
                       '<table id="bodyFillWarehouse" class=hidden border=0 cellpadding=0 cellspacing=0 width=100%>' +
                       '<tr>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2>' + divClear +
                       '<table border=0 width=100%><tr>' +
                       '<td width=2%></td>' +
                       '<td width=98%>' + LANG.OPTION.txt_colorResAlmacen + divClear +
                       '<table border=0 cellpadding=0 cellspacing=0 width=100%>' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>' +
                       '<td width=21%></td>' +
                       '<td width=2%></td>' +
                       '<td width=24%>&gt; 0%</td>' +
                       '<td width=2%></td>' +
                       '<td width=23%>&gt; 80%</td>' +
                       '<td width=2%></td>' +
                       '<td width=24%>100%</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td>' + LANG.SERVER.txt_RES_metal + ':</td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_M_Warehouse_0" ' +
                       'value="' + color_M_Warehouse_0 + '" id="color_M_Warehouse_0" ' +
                       'style="background-color:' + color_M_Warehouse_0 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_M_Warehouse_80" ' +
                       'value="' + color_M_Warehouse_80 + '" id="color_M_Warehouse_80" ' +
                       'style="background-color:' + color_M_Warehouse_80 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_M_Warehouse_100" ' +
                       'value="' + color_M_Warehouse_100 + '" id="color_M_Warehouse_100" ' +
                       'style="background-color:' + color_M_Warehouse_100 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td>' + LANG.SERVER.txt_RES_cristal + ':</td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_C_Warehouse_0" ' +
                       'value="' + color_C_Warehouse_0 + '" id="color_C_Warehouse_0" ' +
                       'style="background-color:' + color_C_Warehouse_0 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_C_Warehouse_80" ' +
                       'value="' + color_C_Warehouse_80 + '" id="color_C_Warehouse_80" ' +
                       'style="background-color:' + color_C_Warehouse_80 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_C_Warehouse_100" ' +
                       'value="' + color_C_Warehouse_100 + '" id="color_C_Warehouse_100" ' +
                       'style="background-color:' + color_C_Warehouse_100 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td>' + LANG.SERVER.txt_RES_deuterio + ':</td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_D_Warehouse_0" ' +
                       'value="' + color_D_Warehouse_0 + '" id="color_D_Warehouse_0" ' +
                       'style="background-color:' + color_D_Warehouse_0 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_D_Warehouse_80" ' +
                       'value="' + color_D_Warehouse_80 + '" id="color_D_Warehouse_80" ' +
                       'style="background-color:' + color_D_Warehouse_80 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_D_Warehouse_100" ' +
                       'value="' + color_D_Warehouse_100 + '" id="color_D_Warehouse_100" ' +
                       'style="background-color:' + color_D_Warehouse_100 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr></table>' + hr;

      contenido +=     LANG.OPTION.txt_colorResDen + divClear +
                       '<table border=0 cellpadding=0 cellspacing=0 width=100%>' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>' +
                       '<td width=21%></td>' +
                       '<td width=2%></td>' +
                       '<td width=24%>&gt; 0%</td>' +
                       '<td width=2%></td>' +
                       '<td width=23%>&gt; 80%</td>' +
                       '<td width=2%></td>' +
                       '<td width=24%>100%</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td>' + LANG.SERVER.txt_RES_metal + ':</td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_M_Den_0" ' +
                       'value="' + color_M_Den_0 + '" id="color_M_Den_0" ' +
                       'style="background-color:' + color_M_Den_0 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_M_Den_80" ' +
                       'value="' + color_M_Den_80 + '" id="color_M_Den_80" ' +
                       'style="background-color:' + color_M_Den_80 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_M_Den_100" ' +
                       'value="' + color_M_Den_100 + '" id="color_M_Den_100" ' +
                       'style="background-color:' + color_M_Den_100 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td>' + LANG.SERVER.txt_RES_cristal + ':</td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_C_Den_0" ' +
                       'value="' + color_C_Den_0 + '" id="color_C_Den_0" ' +
                       'style="background-color:' + color_C_Den_0 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_C_Den_80" ' +
                       'value="' + color_C_Den_80 + '" id="color_C_Den_80" ' +
                       'style="background-color:' + color_C_Den_80 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_C_Den_100" ' +
                       'value="' + color_C_Den_100 + '" id="color_C_Den_100" ' +
                       'style="background-color:' + color_C_Den_100 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td>' + LANG.SERVER.txt_RES_deuterio + ':</td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_D_Warehouse_0" ' +
                       'value="' + color_D_Warehouse_0 + '" id="color_D_Warehouse_0" ' +
                       'style="background-color:' + color_D_Warehouse_0 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_D_Warehouse_80" ' +
                       'value="' + color_D_Warehouse_80 + '" id="color_D_Warehouse_80" ' +
                       'style="background-color:' + color_D_Warehouse_80 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td><input type="text" name="color_D_Warehouse_100" ' +
                       'value="' + color_D_Warehouse_100 + '" id="color_D_Warehouse_100" ' +
                       'style="background-color:' + color_D_Warehouse_100 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr></table>' + hr + '</td>' +
                       '</tr></table></td>' +
                       '</tr></table></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2><div id=hdrResInfo><input type="checkbox" name="show_Resources_Info" ' +
                       'id="show_Resources_Info" ' + '> ' +
                       LANG.OPTION.txt_resourcesInfo + ' </div>' +
                       '<table id="bodyResInfo" class=hidden border=0 cellpadding=0 cellspacing=0 width=100%>' +
                       '<tr>';

      contenido +=     '<td>' + divClear + '</td>';

      contenido +=     '<td colspan=2>' +
                       '<table border=0 width=100%>' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>' +
                       '<td width=24%>' + LANG.OPTION.txt_colorResAlmacen + ':</td>' +
                       '<td width=24%><input type="text" name="color_Res_Almacen" ' +
                       'value="' + color_Res_Almacen + '" id="color_Res_Almacen" ' +
                       'style="background-color:' + color_Res_Almacen + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td width=2%></td>' +
                       '<td width=24%>' + LANG.OPTION.txt_colorResDen + ':</td>' +
                       '<td width=24%><input type="text" name="color_Res_Den" ' +
                       'value="' + color_Res_Den + '" id="color_Res_Den" ' +
                       'style="background-color:' + color_Res_Den + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td>' + LANG.MISC.txt_produccion + ':</td>' +
                       '<td><input type="text" name="color_Res_Prod" ' +
                       'value="' + color_Res_Prod + '" id="color_Res_Prod" ' +
                       'style="background-color:' + color_Res_Prod + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td>' + LANG.OPTION.txt_colorEnergyUsed + ':</td>' +
                       '<td><input type="text" name="color_Energy_Used" ' +
                       'value="' + color_Energy_Used + '" id="color_Energy_Used" ' +
                       'style="background-color:' + color_Energy_Used + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr></table>' +
                       '</td></tr></table></td>';

      contenido +=     '</tr>' +
                       '</table>' + hr;

      // Satelites
      contenido +=     '<div id=hdrSection8>' + LANG.SERVER.txt_SHIP_LG_satelite + ' </div>' + divClear +
                       '<table id=bodySection8 class="hidden" border=0 cellpadding=0 cellspacing=0 width=100%  >' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Sats_Terraformer" ' +
                       'id="show_Sats_Terraformer" '  + '> ' +
                       LANG.OPTION.txt_satTerraformer + '</td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Sats_Graviton" ' +
                       'id="show_Sats_Graviton" '  + '> ' +
                       LANG.OPTION.txt_satGraviton + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Sats_Balance" ' +
                       'id="show_Sats_Balance" '  + '> ' +
                       LANG.OPTION.txt_showMissingSats + '</td>';

      contenido +=     '<td></td>';

      contenido +=     '</tr>' +
                       '</table>' + hr;

      // Messages
      contenido +=     '<div id=hdrSection9>' + LANG.MISC.txt_mensajes + ' </div>' + divClear +
                       '<table id=bodySection9 class="hidden" border=0 cellpadding=0 cellspacing=0 width=100%  >' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Message_Button_Left" ' +
                       'id="show_Message_Button_Left" '  + '> ' +
                       LANG.OPTION.txt_showMessageButtonLeft + '</td>';

      contenido +=     '<td width=49%><input type="checkbox" name="current_Planet_Name" ' +
                       'id="current_Planet_Name" '  + '> ' +
                       LANG.OPTION.txt_planetNameInMsg + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="radio" name="reply_CC" disabled ' +
                       'id="reply_CC" '  + '> ' +
                       LANG.OPTION.txt_replyCircularMsg + '</td>';

      contenido +=     '<td><input type="checkbox" name="show_BBCode" ' +
                       'id="show_BBCode" '  + '> ' +
                       'BBCode' + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Colored_Messages" ' +
                       'id="show_Colored_Messages" '  + '> ' +
                       LANG.OPTION.txt_coloredMessages + ' **</td>';

      contenido +=     '<td><input type="checkbox" name="show_Smiles" ' +
                       'id="show_Smiles" '  + '> ' +
                       LANG.OPTION.txt_useSmiles + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Compactador_Batallas" ' +
                       'id="show_Compactador_Batallas" '  + '> ' +
                       LANG.OPTION.txt_scriptCRName + ' **</td>';

      contenido +=     '<td></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2>' + hr + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2><div id=hdrChatSection>' + LANG.MISC.txt_ChatXat + ' </div>' +
                       '<table id="bodyChatSection" class=hidden border=0 cellpadding=0 cellspacing=0 width=100%>' +
                       '<tr>';

      contenido +=     '<td width=2%>' + divClear + '</td>';

      contenido +=     '<td colspan=2>' +
                       '<table border=0 width=100%>' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>' +
                       '<td width=48%><input type="checkbox" name="show_Chat" ' +
                       'id="show_Chat" '  + '> ' +
                       LANG.OPTION.txt_chkChat + '</td>' +
                       '<td width=2%></td>' +
                       '<td width=48%>' + LANG.OPTION.txt_idChat +
                       ': <input id="id_Chat" type="text" value="' + id_Chat +
                       '" style="background-color: transparent;color:' + strColor_LPuNKTKit + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';' +
                       'padding:1px;width:' + ((screen.availWidth * 150) / 1280) + 'px;' + strFontSize + '">' +
                       '</input></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td><input type="checkbox" name="link_Chat" ' +
                       'id="link_Chat" '  + '> ' +
                       LANG.OPTION.txt_linkChat + '</td>' +
                       '<td></td>';

      contenido +=     '</tr></table>' +
                       '</td></tr></table></td>';

      contenido +=     '</tr>';

      contenido +=     '<tr valign=top>' +
                       '<td></td>' +
                       '<td colspan=2 align=center style="font-size:smaller;">' + hr + '</td>' +
                       '</tr>';

      contenido +=     '<tr valign=top>' +
                       '<td colspan=3 align=center style="font-size:smaller;font-style:italic;">' + LANG.MISC.txt_habSection + '</td>' +
                       '</tr>' +
                       '</table>' + hr;

      //Fleet
      contenido +=     '<div id=hdrSection10>' + LANG.MISC.txt_flota + ' </div>' + divClear +
                       '<table class=hidden id=bodySection10 border=0 cellpadding=0 cellspacing=0 width=100% height=100%  >' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Fleet_Resources" ' +
                       'id="show_Fleet_Resources" '  + '> ' +
                       LANG.OPTION.txt_showFleetResources + '</td>';

      contenido +=     '<td width=49%><input type="checkbox" name="show_Resources_Per_Fleet" ' +
                       'id="show_Resources_Per_Fleet" '  + '> '+
                       LANG.OPTION.txt_showResourcesPerFleet + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2>' + divClear +
                       '<table border=0 width=100%>' +
                       '<tr valign=top>';

      contenido +=     '<td width=2%></td>' +
                       '<td width=24%>' + LANG.SERVER.txt_RES_metal + ':</td>' +
                       '<td width=24%><input type="text" name="color_Metal" ' +
                       'value="' + color_Metal + '" id="color_Metal" ' +
                       'style="background-color:' + color_Metal + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td width=2%></td>' +
                       '<td width=24%>' + LANG.SERVER.txt_RES_cristal + ':</td>' +
                       '<td width=24%><input type="text" name="color_Cristal" ' +
                       'value="' + color_Cristal + '" id="color_Cristal" ' +
                       'style="background-color:' + color_Cristal + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td>' + LANG.SERVER.txt_RES_deuterio + ':</td>' +
                       '<td><input type="text" name="color_Deuterio" ' +
                       'value="' + color_Deuterio + '" id="color_Deuterio" ' +
                       'style="background-color:' + color_Deuterio + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td></td>' +
                       '<td></td>';

      contenido +=     '</tr>' +
                       '<tr><td></td><td colspan=5>' + hr + '</td>';

      contenido +=     '</tr></table></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2><div id=hdrEmptySpace><input type="checkbox" name="show_Empty_Space" ' +
                       'id="show_Empty_Space" '  + '> '+
                       LANG.OPTION.txt_showEmptySpace + ' </div>' +
                       '<table width=100% border=0 id=bodyEmptySpace class=hidden>' +
                       '<tr>';

      contenido +=     '<td width=2%>' + divClear + '</td>' +
                       '<td width=24%>' + LANG.MISC.txt_espacioLibre + ':</td>' +
                       '<td width=24%><input type="text" name="color_Empty_Space" ' +
                       'value="' + color_Empty_Space + '" id="color_Empty_Space" ' +
                       'style="background-color:' + color_Empty_Space + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td width=50%></td>';

      contenido +=     '</tr>' +
                       '<tr><td></td><td colspan=3>' + hr + '</td>';

      contenido +=     '</tr></table></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2><div id="hdrColorSlots"><input type="checkbox" name="show_Color_Flight_Slots" ' +
                       'id="show_Color_Flight_Slots" '  + '> ' +
                       LANG.OPTION.txt_colorFlightSlots + ' </div> ' +
                       '<table border=0 width=100% id=bodyColorSlots class=hidden>' +
                       '<tr>';

      contenido +=     '<td width=2%>' + divClear + '</td>' +
                       '<td width=24%>0 ' + LANG.OPTION.txt_EmptySlot + ':</td>' +
                       '<td width=24%><input type="text" name="color_Slot_0" ' +
                       'value="' + color_Slot_0 + '" id="color_Slot_0" ' +
                       'style="background-color:' + color_Slot_0 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td width=2%></td>' +
                       '<td width=24%>1 ' + LANG.OPTION.txt_EmptySlot + ':</td>' +
                       '<td width=24%><input type="text" name="color_Slot_1" ' +
                       'value="' + color_Slot_1 + '" id="color_Slot_1" ' +
                       'style="background-color:' + color_Slot_1 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>' +
                       '<td>2 ' + LANG.OPTION.txt_EmptySlot + ':</td>' +
                       '<td><input type="text" name="color_Slot_2" ' +
                       'value="' + color_Slot_2 + '" id="color_Slot_2" ' +
                       'style="background-color:' + color_Slot_2 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td></td>' +
                       '<td>+ ' + LANG.OPTION.txt_EmptySlot + ':</td>' +
                       '<td><input type="text" name="color_Slot_3" ' +
                       'value="' + color_Slot_3 + '" id="color_Slot_3" ' +
                       'style="background-color:' + color_Slot_3 + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>';

      contenido +=     '</tr>' +
                       '<tr><td></td><td colspan=5>' + hr + '</td>';

      contenido +=     '</tr></table></td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td colspan=2><div id=hdrNoEscape><input type="radio" name="show_No_Escape" disabled ' +
                       'id="show_No_Escape" '  + '> ' +
                       LANG.OPTION.txt_showNoEscape + ' </div> ';

      contenido +=     '<table border=0 id=bodyNoEscape class=hidden width=100%>' +
                       '<tr>' +
                       '<td width=2%></td>' +
                       '<td width=24%>' + LANG.OPTION.txt_colorNotEnough + ': </td>' +
                       '<td width=24%><input type="text" name="color_No_Escape" ' +
                       'value="' + color_No_Escape + '" id="color_No_Escape" ' +
                       'style="background-color:' + color_No_Escape + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '<td width=2%></td>' +
                       '<td width=24%>' + LANG.OPTION.txt_colorEnough + ': </td>' +
                       '<td width=24%><input type="text" name="color_Escape" ' +
                       'value="' + color_Escape + '" id="color_Escape" ' +
                       'style="background-color:' + color_Escape + ';' +
                       'border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                       strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;"></td>' +
                       '</tr>' +
                       '<tr>' +
                       '<td></td>' +
                       '<td colspan=5>' + hr + '</td>' +
                       '</tr>' +
                       '</table>' +
                       '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="fix_Tooltips" ' +
                       'id="fix_Tooltips" '  + '> ' +
                       LANG.OPTION.txt_fixTooltips + '</td>';

      contenido +=     '<td><input type="checkbox" name="remove_Adv" ' +
                       'id="remove_Adv" '  + '> ' +
                       LANG.OPTION.txt_quitarAdv + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Return_Fleet_Question" ' +
                       'id="show_Return_Fleet_Question" '  + '> ' +
                       LANG.OPTION.txt_returnFleetQuestion + '</td>';

      contenido +=     '<td><input type="checkbox" name="show_Load_Buttons" ' +
                       'id="show_Load_Buttons" '  + '> ' +
                       LANG.OPTION.txt_loadButtons + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="show_Fleet_Content" ' +
                       'id="show_Fleet_Content" '  + '> ' +
                       LANG.OPTION.txt_showFleetContent + '</td>';

      contenido +=     '<td><input type="checkbox" name="show_Dest_Player_Name" ' +
                       'id="show_Dest_Player_Name"> ' +
                       LANG.OPTION.txt_showDestPlayerName + '</td>';

      contenido +=     '</tr>' +
                       '<tr valign=top>';

      contenido +=     '<td></td>';

      contenido +=     '<td><input type="checkbox" name="use_Direct_Spy" ' +
                       'id="use_Direct_Spy"> ' +
                       LANG.OPTION.txt_useDirectSpy + '</td>';

      contenido +=     '<td><input type="radio" name="show_Auto_Expo_Fleet" disabled ' +
                       'id="show_Auto_Expo_Fleet" '  + '> ' +
                       LANG.OPTION.txt_showAutoExpoFleet + '</td>';

      contenido +=     '</tr>' +
                       '</table>' + hr;

      //Shortcuts
      const ANCHO1 = 16;
      const ANCHO2 = 33;

      contenido +=     '<div id=hdrSection11>' + LANG.MISC.txt_usarKeys + ' </div>' + divClear +
                       '<table id=bodySection11 class=hidden border=0 cellspacing=2 cellpadding=0 width=100%>';

      if (show_Shortcuts) cbxValue = "checked"; else cbxValue = "";
      contenido +=    '<tr valign=top><td width=100%><input type="checkbox" name="show_Shortcuts" ' +
                      'id="show_Shortcuts" ' + cbxValue + '> ' +
                      LANG.OPTION.txt_usarKeys + '</td>' +
                      '</tr>' +
                      '<tr><td colspan=2>' + hr +
                      '</td></tr>'

      if (show_Key_Everywhere) cbxValue = "checked"; else cbxValue = "";
      contenido +=    '<tr valign=top><td>' +
                      '<table border=0 cellspaccing=0 cellpadding=0 width=100%>' +
                      '<tr><td width=2%></td><td align=left>' +
                      '<div id=hdrKeyGeneral><input type="checkbox" name="show_Key_Everywhere" ' +
                      'id="show_Key_Everywhere" ' + cbxValue + '> ' +
                      LANG.OPTION.txt_usarGeneral + ' </div></td></tr>' +
                      '<tr><td></td><td>' +
                      '<table width=100% id=keyGeneralSection class=hidden ' +
                      'style="border: 1px solid ' + strColor_LPuNKTKit + ' !important;padding:2px;">' +
                      '<tr><td width=50%>' +
                      LANG.MISC.txt_ogame + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>O</td><td>' + LANG.MISC.txt_general + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-O</td><td>' + LANG.MISC.txt_listaEventos +
                           '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>R</td><td>' + LANG.MISC.txt_recursos + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-R</td><td>' + LANG.MISC.txt_recursosDetalle +
                           '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>C</td><td>' + LANG.MISC.txt_instalaciones + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-C</td><td>' + LANG.MISC.txt_keySalto +
                           '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>E</td><td>' + LANG.MISC.txt_investigaciones + '</td>' +
                           '<td>S</td><td>' + LANG.MISC.txt_hangar + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>D</td><td>' + LANG.MISC.txt_defensa + '</td>' +
                           '<td>G</td><td>' + LANG.MISC.txt_galaxia + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>F</td><td>' + LANG.MISC.txt_flota + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-F</td><td>' + LANG.MISC.txt_movFlota +
                           '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>L</td><td>' + LANG.MISC.txt_alianza + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-L</td><td>' + LANG.MISC.txt_sendCC +
                           '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>B</td><td>' + LANG.MISC.txt_amigos + '</td>' +
                           '<td>T</td><td>' + LANG.MISC.txt_notas + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>K</td><td>' + LANG.MISC.txt_clasificacion + '</td>' +
                           '<td>H</td><td>' + LANG.MISC.txt_buscar + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>M</td><td>' + LANG.MISC.txt_mensajes + '</td>' +
                           '<td></td><td></td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_inicio + '</td>' +
                           '<td>' + LANG.MISC.txt_priPlaneta + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_fin + '</td>' +
                           '<td>' + LANG.MISC.txt_ultPlaneta + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_izquierda + '</td>' +
                           '<td>' + LANG.MISC.txt_antPlaneta + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_derecha + '</td>' +
                           '<td>' + LANG.MISC.txt_sigPlaneta + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_arriba + '</td>' +
                           '<td>' + LANG.MISC.txt_antItem + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_abajo + '</td>' +
                           '<td>' + LANG.MISC.txt_sigItem + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>Ctrl-' + LANG.MISC.txt_izquierda + '</td>' +
                           '<td>' + LANG.MISC.txt_altPlanetaLuna + '</td>' +
                           '<td>Ctrl-' + LANG.MISC.txt_derecha + '</td>' +
                           '<td>' + LANG.MISC.txt_altPlanetaLuna + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>Ctrl-' + LANG.MISC.txt_arriba + '</td>' +
                           '<td>' + LANG.MISC.txt_antCelestial + '</td>' +
                           '<td>Ctrl-' + LANG.MISC.txt_abajo + '</td>' +
                           '<td>' + LANG.MISC.txt_sigCelestial + '</td></tr>' +
                           '</table>' + divClear + divClear +

                      LANG.MISC.txt_keyClasif + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_izquierda + '</td><td>' + LANG.MISC.txt_antPag + '</td>' +
                           '<td>' + LANG.MISC.txt_derecha + '</td><td>' + LANG.MISC.txt_sigPag + '</td>' +
                           '</tr></table>' + divClear;

      contenido +=    '</td></tr></table>' + hr + '</td></tr></table>';

      if (show_Key_Mailbox) cbxValue = "checked"; else cbxValue = "";
      contenido +=    '<table border=0 cellspaccing=0 cellpadding=0 width=100%>' +
                      '<tr><td width=2%></td><td align=left>' +
                      '<div id=hdrKeyMsg><input type="checkbox" name="show_Key_Mailbox" ' +
                      'id="show_Key_Mailbox" ' + cbxValue + '> ' +
                      LANG.OPTION.txt_usarMens + ' </div></td></tr>' +
                      '<tr><td></td><td>' +
                      '<table width=100% id=keyMsgSection class=hidden ' +
                      'style="border: 1px solid ' + strColor_LPuNKTKit + ' !important;padding:2px;">' +
                      '<tr><td>' +
                      LANG.MISC.txt_keyMailbox + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>A</td><td>' + LANG.MISC.txt_allMens + '</td>' +
                           '<td>N</td><td>' + LANG.MISC.txt_borrarSel + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>V</td><td>' + 'Invertir seleccion' + '</td>' +
                           '<td>' + LANG.MISC.txt_borrar + '</td><td>' + LANG.MISC.txt_borrarMens + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_avPag + '</td>' +
                           '<td>' + LANG.MISC.txt_sigPag + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_retPag + '</td>' +
                           '<td>' + LANG.MISC.txt_antPag + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>Ctrl-' + LANG.MISC.txt_inicio + '</td><td>' + LANG.MISC.txt_priPag + '</td>' +
                           '<td>Ctrl-' + LANG.MISC.txt_fin + '</td><td>' + LANG.MISC.txt_ultPag + '</td>' +
                           '</tr>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>2</td><td>' + 'Seleccionar los mensajes circulares' + '</td>' +
                           '<td>3</td><td>' + 'Seleccionar los espionajes recibidos' + '</td>' +
                           '</tr>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>4</td><td>' + 'Seleccionar las batallas' + '</td>' +
                           '<td>5</td><td>' + 'Seleccionar los mensajes privados' + '</td>' +
                           '</tr>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>6</td><td>' + 'Seleccionar los espionajes propios' + '</td>' +
                           '<td>7</td><td>' + 'Seleccionar las expediciones' + '</td>' +
                           '</tr>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>8</td><td>' + 'Seleccionar el resto de mensajes' + '</td>' +
                           '<td></td><td></td>' +
                           '</tr>' +
                           '</table>' + divClear + divClear +

                      LANG.MISC.txt_keyMessage + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_izquierda + '</td><td>' + LANG.MISC.txt_antMens + '</td>' +
                           '<td>' + LANG.MISC.txt_derecha + '</td><td>' + LANG.MISC.txt_sigMens + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_borrar + '</td><td>' + LANG.MISC.txt_delMens + '</td>' +
                           '<td>Esc</td><td>' + LANG.MISC.txt_cerrarMens + '</td></tr>' +
                           '</table>' + divClear;

      contenido +=         '</td></tr></table>' + hr + '</td></tr></table>';

      if (show_Key_Fleet) cbxValue = "checked"; else cbxValue = "";
      contenido +=    '<table border=0 cellspaccing=0 cellpadding=0 width=100%>' +
                      '<tr><td width=2%></td><td align=left>' +
                      '<div id=hdrKeyFleet><input type="checkbox" name="show_Key_Fleet" ' +
                      'id="show_Key_Fleet" ' + cbxValue + '> ' +
                      LANG.OPTION.txt_usarFlota + ' </div></td></tr>' +
                      '<tr><td></td><td>' +
                      '<table width=100% id=keyFleetSection class=hidden ' +
                      'style="border: 1px solid ' + strColor_LPuNKTKit + ' !important;padding:2px;">' +
                      '<tr><td>' +
                      LANG.MISC.txt_key1Flota + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '</tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>A</td><td>' + LANG.MISC.txt_allNaves + '</td>' +
                           '<td>Ctrl + A</td><td>' + 'Sel. mayoria de naves' +
                           ' <span style="color:' + strColor_LPuNKTKit + ';font-size:smaller;">**</span></td>' +
                           '</tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>N</td><td>' + LANG.MISC.txt_borrarSel + '</td>' +
                           '<td>Ctrl + E</td><td>' + LANG.MISC.txt_expedicion +
                           ' <span style="color:' + strColor_LPuNKTKit + ';font-size:smaller;">**</span></td>' +
                           '</tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>Ctrl + R</td><td>' + LANG.MISC.txt_tranportar +
                           ' <span style="color:' + strColor_LPuNKTKit + ';font-size:smaller;">**</span></td>' +
                           '<td>Ctrl + F</td><td>' + 'Fleet Saving' +
                           ' <span style="color:' + strColor_LPuNKTKit + ';font-size:smaller;">**</span></td>' +
                           '</tr></table>' + divClear + divClear +

                      LANG.MISC.txt_key2Flota + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-1</td><td>' + LANG.MISC.txt_velocidad + ' 10%</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-2</td><td>' + LANG.MISC.txt_velocidad + ' 20%</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-3</td><td>' + LANG.MISC.txt_velocidad + ' 30%</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-4</td><td>' + LANG.MISC.txt_velocidad + ' 40%</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-5</td><td>' + LANG.MISC.txt_velocidad + ' 50%</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-6</td><td>' + LANG.MISC.txt_velocidad + ' 60%</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-7</td><td>' + LANG.MISC.txt_velocidad + ' 70%</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-8</td><td>' + LANG.MISC.txt_velocidad + ' 80%</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-9</td><td>' + LANG.MISC.txt_velocidad + ' 90%</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-0</td><td>' + LANG.MISC.txt_velocidad + ' 100%</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-P</td><td>' + LANG.MISC.txt_destPlaneta + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-M</td><td>' + LANG.MISC.txt_destLuna + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-D</td><td>' + LANG.MISC.txt_destEscombros + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-E</td><td>' + LANG.MISC.txt_destExpedicion + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_retroceso + '</td>' +
                           '<td>' + LANG.MISC.txt_volver + '</td><td></td><td></td>' +
                           '</tr></table>' + divClear + divClear +

                      LANG.MISC.txt_key3Flota + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>A</td><td>' + LANG.MISC.txt_allRecursos + '</td>' +
                           '<td>Ctrl + A</td><td>' + 'Sel. mayoria recursos' +
                           ' <span style="color:' + strColor_LPuNKTKit + ';font-size:smaller;">**</span></td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>V</td><td>' + LANG.MISC.txt_recInversos + '</td>' +
                           '<td>Ctrl + V</td><td>' + 'Mayoria rec. orden inverso' +
                           ' <span style="color:' + strColor_LPuNKTKit + ';font-size:smaller;">**</span></td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>N</td><td>' + LANG.MISC.txt_borrarSel + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-M</td><td>' + LANG.MISC.txt_maxMetal + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-K</td><td>' + LANG.MISC.txt_maxCristal + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-D</td><td>' + LANG.MISC.txt_maxDuty + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-E</td><td>' + LANG.MISC.txt_expedicion + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-Z</td><td>' + LANG.MISC.txt_colonizar + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-H</td><td>' + LANG.MISC.txt_reciclar + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-T</td><td>' + LANG.MISC.txt_tranportar + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-P</td><td>' + LANG.MISC.txt_desplegar + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-I</td><td>' + LANG.MISC.txt_espiar + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-N</td><td>' + LANG.MISC.txt_defender + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-A</td><td>' + LANG.MISC.txt_atacar + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-S</td><td>' + LANG.MISC.txt_atacarSAC + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-Y</td><td>' + LANG.MISC.txt_destruir + '</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-1</td><td>' + LANG.MISC.txt_permanecer +
                           ' 1 ' + LANG.MISC.txt_hora + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-2</td><td>' + LANG.MISC.txt_permanecer +
                           ' 2 ' + LANG.MISC.txt_hora + 's</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-3</td><td>' + LANG.MISC.txt_permanecer +
                           ' 3 ' + LANG.MISC.txt_hora + 's</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-4</td><td>' + LANG.MISC.txt_permanecer +
                           ' 4 ' + LANG.MISC.txt_hora + 's</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-5</td><td>' + LANG.MISC.txt_permanecer +
                           ' 5 ' + LANG.MISC.txt_hora + 's</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-6</td><td>' + LANG.MISC.txt_permanecer +
                           ' 6 ' + LANG.MISC.txt_hora + 's</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-7</td><td>' + LANG.MISC.txt_permanecer +
                           ' 7 ' + LANG.MISC.txt_hora + 's</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-8</td><td>' + LANG.MISC.txt_permanecer +
                           ' 8 ' + LANG.MISC.txt_hora + 's</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-9</td><td>' + LANG.MISC.txt_permanecer +
                           ' 9 ' + LANG.MISC.txt_hora + 's</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-0</td><td>' + LANG.MISC.txt_permanecer +
                           ' 10 ' + LANG.MISC.txt_hora + 's</td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-' + LANG.MISC.txt_retroceso + '</td>' +
                           '<td>' + LANG.MISC.txt_volver + '</td><td></td><td></td>' +
                           '</tr></table>' + divClear + divClear +

                      LANG.MISC.txt_keySaltoC + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '</tr>' +
                           '<tr valign=top><td></td><td>A</td><td>' + LANG.MISC.txt_allNaves + '</td>' +
                           '<td>Ctrl + A</td><td>' + 'Sel. mayoria de naves' +
                           ' <span style="color:' + strColor_LPuNKTKit + ';font-size:smaller;">**</span></td>' +
                           '</tr><tr valign=top><td></td>' +
                           '<td>N</td><td>' + LANG.MISC.txt_borrarSel + '</td>' +
                           '<td></td><td></td>' +
                           '</tr></table>' + divClear + divClear +

                      LANG.MISC.txt_keyFlota + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>N</td><td>' + LANG.MISC.txt_recargar + '</td>' +
                           '<td>P</td><td>' + LANG.MISC.txt_expInfo + '</td>' +
                           '</tr></table>' + divClear + divClear +

                      hr + '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="font-size:smaller;">' +
                           '<tr>' +
                           '<td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%></td>' +
                           '<td width=' + ANCHO2 + '%></td>' +
                           '<td width=' + ANCHO1 + '% align=right>** </td>' +
                           '<td width=' + ANCHO2 + '% align=left>' + ' Necesario AntiGame Origin' + '</td>' +
                           '</tr></table>' + divClear;

      contenido +=    '</td></tr></table>' + hr + '</td></tr></table>';

      if (show_Key_Trader) cbxValue = "checked"; else cbxValue = "";
      contenido +=    '<table border=0 cellspaccing=0 cellpadding=0 width=100%>' +
                      '<tr><td width=2%></td><td align=left>' +
                      '<div id=hdrKeyTrd><input type="checkbox" name="show_Key_Trader" ' +
                      'id="show_Key_Trader" ' + cbxValue + '> ' +
                      'Usar en paginas del Mercader' + ' </div></td></tr>' +
                      '<tr><td></td><td>' +
                      '<table width=100% id=keyTrdSection class=hidden ' +
                      'style="border: 1px solid ' + strColor_LPuNKTKit + ' !important;padding:2px;">' +
                      '<tr><td>' +
                      'Subastas' + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-M</td><td>' + 'Cantidad necesaria de metal' + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-K</td><td>' + 'Cantidad necesaria de cristal' + '</td>' +
                           '</tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-D</td><td>' + 'Cantidad necesaria de deuterio' + '</td>' +
                           '<td>N</td><td>' + 'Borrar puja' + '</td>' +
                           '</tr>' +
                           '</table>' + divClear + divClear +

                      'Importacion/Exportacion' + divClear +
                           '<table border=0 cellpadding=2 cellspacing=0 width=100% ' +
                           'style="color:white;font-size:smaller;">' +
                           '<tr style="color:yellow;"><td width=2%></td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td>' +
                           '<td width=' + ANCHO1 + '%>' + LANG.MISC.txt_tecla + '</td>' +
                           '<td width=' + ANCHO2 + '%>' + LANG.MISC.txt_accion + '</td></tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-M</td><td>' + 'Cantidad necesaria de metal' + '</td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-K</td><td>' + 'Cantidad necesaria de cristal' + '</td>' +
                           '</tr>' +
                           '<tr valign=top><td></td>' +
                           '<td>' + LANG.MISC.txt_mayusc + '-D</td><td>' + 'Cantidad necesaria de deuterio' + '</td>' +
                           '<td></td>' +
                           '</tr>' +
                           '</table>' + divClear;

      contenido +=         '</td></tr></table>' + '</td></tr></table>';

      contenido +=    '</td></tr>' +
                      '</table></td></tr></table>' + hr;

      contenido +=     '</td></tr>' +
                       '<tr valign=bottom>' +
                       '<td>' +
                       '      <table border=0 cellspaccing=0 cellpadding=0 width=100% height=100%>' +
                       '      <tr valign=bottom>' +
                       '          <td width=33% align=center id="lpunktkit-default"></td>' +
                       '          <td width=33% align=center id="lpunktkit-saved"></td>' +
                       '          <td width=33% align=center id="lpunktkit-all"></td>' +
                       '      </tr>' +
                       '      </table>' +
                       '</td>' +
                       '</tr></table>';

      contenido += hr + '<div id=hdrSection12>' + LANG.OPTION.txt_coloredMessages + ' </div>' + divClear;

      if (show_Colored_Messages) {
          //Cargamos colores de mensajes y su config
          LoadColorMessages();

          contenido += '<table width=100% id=bodySection12 class=hidden ' +
                       'style="border: 1px solid ' + strColor_LPuNKTKit + ' !important;padding:' + intPadding + 'px;"><tr>' +
                       '<th width=90% align=left>' + LANG.MISC.txt_texto + ': **</th>' +
                       '<th width=10% align=left>' + LANG.MISC.txt_color + ':</th>' +
                       '</tr>';

          var strColorSize = 'font-size:' + (( screen.availWidth < 1280 ) ? '10px;' : '12px;');

          for( var i = 0; i < arrColorMessages.length; i++)
          {
             contenido += '<tr valign=top>' +
                          '<td>' +
                          '<input type="text" name="messageText' + i +
                          '" value="' + arrColorMessages[i][0] + '" id="messageText' + i + '" ' +
                          'style="background-color:transparent;color:' +
                          strColor_LPuNKTKit + ';padding:1px;' + strColorSize +
                          'width:' + (screen.availWidth * 530 / 1280) + 'px;' +
                          'border:solid 1px ' + strColor_LPuNKTKit + ';" ></td>';

             contenido += '<td align=left><input type="text" name="messageColor' + i +
                          '" value="' + arrColorMessages[i][1] + '" id="messageColor' + i +
                          '" style="background-color:' + arrColorMessages[i][1] +
                          ';border:solid 1px ' + strColor_LPuNKTKit + ';padding:1px;' +
                          strColorSize + 'width:' + (screen.availWidth * 80 / 1280) + 'px;">' +
                          '<br></td></tr>';
          }

          contenido +=        '<tr valign=bottom>' +
                          '<td width=100% colspan=2 align=left>' + divClear + '</td>' +
                          '</tr>' +
                          '<tr valign=bottom>' +
                          '<td width=100% colspan=2 align=left style="font-size:smaller;">' +
                          '<i>** ' + LANG.MISC.txt_errorMsg + '</i></td>' +
                          '</tr>' +
                          '</table>';
      }

      contenido +=    hr + '<div id=hdrSection13>' + LANG.OPTION.txt_scriptCRName + ' </div>' + divClear;

      if (show_Compactador_Batallas) {

          //Cargamos colores y textos del CR y su config.
          LoadColoresCR(usar_CR_Friki && availCRFriki);

          LoadDatosFlota( usar_CR_Friki && availCRFriki );

          contenido +=    '<table id=bodySection13 class=hidden border=0 width=100% ' +
                          'style="border: 1px solid ' + strColor_LPuNKTKit + ' !important;padding:' + intPadding + 'px;">' +
                          '<tr>' +
                            '<td width=100%>';

          var strTitSize = 'font-size:' + (screen.availWidth < 1280 ? '12px;' : '14px;');

          var strColorSize = 'font-size:' + (screen.availWidth < 1280 ? '10px;' : '12px;');

          contenido +=     '<table border=0 width=100%>' +
                           '<tr valign=top>';

          contenido +=     '<td width=2%></td>' +
                           '<td width=48%>';

          contenido +=     '<input type="checkbox" name="hide_Stolen_CR" ' +
                           'id="hide_Stolen_CR"> ' +
                           LANG.OPTION.txt_hideStolenCR;

          contenido +=     '</td><td width=2%></td>' +
                           '<td width=48%>';

          contenido +=     '<input type="checkbox" name="hide_Debris_CR" ' +
                           'id="hide_Debris_CR"> ' +
                           LANG.OPTION.txt_hideDebrisCR;

          contenido +=     '</td></tr>' +
                           '<tr valign=top>';

          contenido +=     '<td width=2%></td>' +
                           '<td width=98% colspan=3>';

          if (show_Escombros_SAC) cbxValue = "checked"; else cbxValue = "";

          contenido +=    '<table border=0 cellspaccing=0 cellpadding=0 width=100%>' +
                          '<tr>' +
                          '<td align=left colspan=3>' +
                          '<div id=hdrDebrisSAC>' +
                          '<input type="checkbox" name="show_Escombros_SAC" ' +
                          'id="show_Escombros_SAC" ' + cbxValue + '> ' +
                          'Mostrar reparto de escombros SAC' + ' </div></td>' +
                          '</tr>' +
                          '<tr><td></td>' +
                          '<td><table width=100% id=debrisSACSection class=hidden style="padding:2px;">' +
                          '<tr>' +
                          '<td width=2%></td>' +
                          '<td width=48%><input id="modo_Reparto_SAC0" name="modo_Reparto_SAC" type="radio" > ' +
                          'A partes iguales</input></td>' +
                          '<td width=2%></td>' +
                          '<td width=48%><input id="modo_Reparto_SAC1" name="modo_Reparto_SAC" type="radio" > ' +
                          'Proporcional a lo enviado</input></td>' +
                          '</tr>' +
                          '<tr>' +
                          '<td></td>' +
                          '<td>' +
                               '<table border=0 width=100%>' +
                               '<tr valign=middle>' +
                               '<td width=30% align=center>Ratio: </td>' +
                               '<td width=16% align=center>' +
                               '<input type="text" name="rat_Metal_SAC" ' +
                               'value="' + rat_Metal_SAC + '" id="rat_Metal_SAC" ' +
                               'size="4" style="float:left;margin-left:2px;' +
                               'background-color:' + 'transparent;color:' +
                               strColor_LPuNKTKit + ';border:solid 1px ' +
                               strColor_LPuNKTKit + ';padding:1px;text-align:center;' + strColorSize + '"></td>' +
                               '<td width=1% align=center>:</td>' +
                               '<td width=16% align=center>' +
                               '<input type="text" name="rat_Cristal_SAC" ' +
                               'value="' + rat_Cristal_SAC + '" id="rat_Cristal_SAC" ' +
                               'size="4" style="float:left;margin-left:2px;' +
                               'background-color:' + 'transparent;color:' +
                               strColor_LPuNKTKit + ';border:solid 1px ' +
                               strColor_LPuNKTKit + ';padding:1px;text-align:center;' + strColorSize + '"></td>' +
                               '<td width=1% align=center>:</td>' +
                               '<td width=16% align=center>' +
                               '<input type="text" name="rat_Deuterio_SAC" ' +
                               'value="' + rat_Deuterio_SAC + '" id="rat_Deuterio_SAC" ' +
                               'size="4" style="float:left;margin-left:2px;' +
                               'background-color:' + 'transparent;color:' +
                               strColor_LPuNKTKit + ';border:solid 1px ' +
                               strColor_LPuNKTKit + ';padding:1px;text-align:center;' + strColorSize + '"></td>' +
                               '<td width=20%></td>' +
                               '</tr>' +
                               '</table>' +
                          '</td>' +
                          '<td></td>' +
                          '<td></td>' +
                          '</tr>' +
                          '<tr>' +
                          '<td></td>' +
                          '<td><input id="rec_Perdidas_SAC" name="rec_Perdidas_SAC" type="radio" disabled> ' +
                          'Recuperando perdidas</input></td>' +
                          '</tr>' +
                          '<tr><td></td>' +
                          '<td colspan=3>' + hr + '</td></tr>' +
                          '</table></td>' +
                          '</tr>' +
                          '</td></tr></table></td>';

          contenido +=     '</td></tr>' +
                           '<tr valign=top>';

          contenido +=     '<td width=2%></td>' +
                           '<td>';

          if (availCRFriki) {
              if (usar_CR_Friki)
                  cbxValue = "checked"; else cbxValue = "";

              contenido +=    '<input type="checkbox" name="usar_CR_Friki" ' +
                              'id="usar_CR_Friki" ' + cbxValue + '> ' +
                              LANG.OPTION.txt_usarCRFriki;
          } else {
              contenido +=    '<input type="radio" name="usar_CR_Friki" ' +
                              'id="usar_CR_Friki" disabled style="' + strColorSize + '"> ' +
                              LANG.MISC.txt_notAvailableCRFriki;
          }

          contenido +=     '</td>' +
                           '<td></td>' +
                           '<td></td>' +
                           '</tr></table>';

          contenido +=   divClear + '</td>' +
                        '</tr>' +
                        '<tr valign=top>' +
                            '<td width=100%>' + hr +
                              '<table border=0 width=100%>' +
                              '<tr valign=top>' +
                                  '<td width=45%>' +

                                  '<div id=hdrCRTexto>' + LANG.CR.txt_texts + ' </div>' + divClear +
                                  '<table width=100% id=crTextoSection class=hidden>' +
                                  '<tr>' +
                                    '<th width=70% align=left></th>' +
                                    '<th width=30% align=left>' + LANG.MISC.txt_texto + ': **</th>' +
                                  '</tr>';

          var intBatallaSize = (screen.availWidth * 16 / 1280);


          for (var i = 0; i < arrDatosFlota.length; i++) {

               contenido += '<tr>' +
                           '<td>' + arrDatosFlota[i][1] + ':</td>' +
                           '<td><input type="text" name="batallaName' + (i+1) + '" value="' +
                           arrDatosFlota[i][0] + '" id="batallaName' + (i+1) + '" size="' +
                           intBatallaSize + '" style="float:left;margin-left:2px;' +
                           'background-color:' + 'transparent;color:' +
                           strColor_LPuNKTKit + ';border:solid 1px ' +
                           strColor_LPuNKTKit + ';padding:1px;' + strColorSize + '">' +
                           '</td>' +
                           '</tr>';
          }

          contenido +=     '<tr><td colspan=2>' + hr +
                           '<span style="font-size:smaller;font-style:italic;">** ' +
                           LANG.MISC.txt_errorCR + '</span></td></tr>' +
                           '</table></td>';

          contenido +=  '<td width=1%>' +
                        '</td>' +
                        '<td width=54%>' +
                             '<div id=hdrCRColor>' + LANG.CR.txt_colors + ' </div>' + divClear +
                             '<table id=crColorSection class=hidden width=100%>' +
                             '<tr>' +
                               '<th width=85% align=left></th>' +
                               '<th width=15% align=left>' + LANG.MISC.txt_color + ':</th>' +
                             '</tr>';

          var intColorSize = (screen.availWidth * 80 / 1280 );

          for( var i = 0; i < arrColorBatalla.length; i++)
          {
               contenido += '<tr valign=top>' +
                           '<td align=left><span style="color:' + strColor_LPuNKTKit + '">' +
                           arrColorBatalla[i][2] + '</span>: </td>' +
                           '<td align=right><input type="text" name="batallaColor' + i +
                           '" value="' + arrColorBatalla[i][1] + '" id="batallaColor' + i +
                           '" style="width:' + intColorSize + 'px;' +
                           'background-color:' + arrColorBatalla[i][1] + ';border:solid 1px ' +
                           strColor_LPuNKTKit + ';padding:1px;' + strColorSize + '"><br></td></tr>';
          }

          contenido +=  '</table>' +
                        '</td></tr></table>';
      }

      contenido +=  '</td></tr></table>';

      var guardar = document.createElement("a");
          guardar.appendChild(document.createTextNode(LANG.MISC.txt_guardar));
          guardar.setAttribute('href', 'javascript:void(0)');
          guardar.setAttribute('onmouseover', 'this.style.textDecoration="none"');
          guardar.setAttribute('onmouseout', 'this.style.textDecoration="overline"');
          guardar.addEventListener('click', saveOptions, false);
          guardar.setAttribute('style', 'margin-top:5px;margin-left:' + ((screen.availWidth * 620) / 1280) + 'px;' +
                                        'display:block;color:' + strColor_LPuNKTKit +
                                        ';text-decoration:overline');

      var linkScript = document.createElement('a');
          linkScript.appendChild(
                     document.createTextNode('oGame Redesign: LPuNKTKit v' + VERSION_LPUNKTKIT));
          linkScript.setAttribute('href', strUrl_Script);
          linkScript.setAttribute('target','_blank');
          linkScript.setAttribute('onmouseover', 'this.style.textDecoration="none"');
          linkScript.setAttribute('onmouseout', 'this.style.textDecoration="overline"');
          linkScript.setAttribute('style', 'position:relative;top:22px;' +
                                           'margin-top:5px;margin-left:' + ((screen.availWidth * 0) / 1280) + 'px;' +
                                           'color:' + strColor_LPuNKTKit +
                                           ';text-decoration:overline;font-size:smaller;');

      var opciones = document.createElement("div");
          opciones.id = "lpunktkit-opciones";

      overlay.append(opciones);

      var divOpciones = $('#lpunktkit-opciones');
          divOpciones.css({'position':'relative',
                           'margin': ((screen.availWidth * 50) / 1280) + 'px auto auto' ,
                           'width': ((screen.availWidth * 680) / 1280) + 'px' ,
                           'background-color': 'rgba(0,0,0,0.8)',//'#000',
                           'border':'1px solid ' + strColor_LPuNKTKit,
                           'color':strColor_LPuNKTKit ,
                           'padding': intPadding + 'px' ,
                           'text-align':'left',
                           'font-size': (screen.availWidth < 1280 ? '10px' : '12px')});
          divOpciones.html(contenido);

          divOpciones.append(linkScript);
          divOpciones.append(guardar);

       if ( (trim(LANG.MULTILANGUAGE.txt_langPack).length > 0) &&
           (trim(LANG.MULTILANGUAGE.url_langPack).length > 0) ) {

           var linkLang = document.createElement('a');
               linkLang.appendChild(
                        document.createTextNode(LANG.MULTILANGUAGE.txt_langPack));
               linkLang.setAttribute('href', LANG.MULTILANGUAGE.url_langPack);
               linkLang.setAttribute('target','_blank');
               linkLang.setAttribute('onmouseover', 'this.style.textDecoration="none"');
               linkLang.setAttribute('onmouseout', 'this.style.textDecoration="overline"');
               linkLang.setAttribute('style', 'position:relative;top:-10px;' +
                                     'margin-top:5px;margin-left:' + ((screen.availWidth * 300) / 1280) + 'px;' +
                                     'color:' + strColor_LPuNKTKit +
                                     ';text-decoration:overline;font-size:smaller;');

           divOpciones.append(linkLang);
      }

      var myTd = document.getElementById('lpunktkit-saved');
      var myA = document.createElement('a');
          myA.setAttribute('href','javascript:void(0)');
          myA.setAttribute('style', 'color:' + strColor_LPuNKTKit + ';' +
                           'text-decoration:overline;font-size:smaller;');
          myA.setAttribute('onmouseover', 'this.style.textDecoration="none"');
          myA.setAttribute('onmouseout', 'this.style.textDecoration="overline"');
          myA.addEventListener('click', function () {SelectOptions('Saved');}, false);
          myA.appendChild(document.createTextNode(LANG.MISC.txt_guardado));
          myTd.appendChild(myA);

          myTd = document.getElementById('lpunktkit-default');
          myA = document.createElement('a');
          myA.setAttribute('href','javascript:void(0)');
          myA.setAttribute('style', 'color:' + strColor_LPuNKTKit + ';' +
                           'text-decoration:overline;font-size:smaller;');
          myA.setAttribute('onmouseover', 'this.style.textDecoration="none"');
          myA.setAttribute('onmouseout', 'this.style.textDecoration="overline"');
          myA.addEventListener('click', function () {SelectOptions('Default');}, false);
          myA.appendChild(document.createTextNode(LANG.MISC.txt_defecto));
          myTd.appendChild(myA);

          myTd = document.getElementById('lpunktkit-all');
          myA = document.createElement('a');
          myA.setAttribute('href','javascript:void(0)');
          myA.setAttribute('style', 'color:' + strColor_LPuNKTKit + ';' +
                           'text-decoration: overline;font-size:smaller;');
          myA.setAttribute('onmouseover', 'this.style.textDecoration="none"');
          myA.setAttribute('onmouseout', 'this.style.textDecoration="overline"');
          myA.addEventListener('click', function () {SelectOptions('All');}, false);
          myA.appendChild(document.createTextNode(LANG.MISC.txt_todo));
          myTd.appendChild(myA);

      $('#lpunktkit-opciones').append(fDonar);
      $('#lpunktkit-opciones').append(aCerrar);

      SelectOptions('Saved');

//      overlay.show('slow');
      overlay.show();

      setSection ('hdrSection1', 'bodySection1');
      setSection ('hdrSection2', 'bodySection2');
      setSection ('hdrSection3', 'bodySection3');
      setSection ('hdrSection4', 'bodySection4');
      setSection ('hdrFullPlanet', 'bodyFullPlanet');
      setSection ('hdrSection5', 'bodySection5');
      setSection ('hdrDebris', 'debrisSection');
      setSection ('hdrSection6', 'bodySection6');
      setSection ('hdrSection7', 'bodySection7');
      setSection ('hdrFillWarehouse', 'bodyFillWarehouse');
      setSection ('hdrResInfo', 'bodyResInfo');
      setSection ('hdrSection8', 'bodySection8');
      setSection ('hdrSection9', 'bodySection9');
      setSection ('hdrChatSection', 'bodyChatSection');
      setSection ('hdrSection10', 'bodySection10');
      setSection ('hdrEmptySpace', 'bodyEmptySpace');
      setSection ('hdrColorSlots', 'bodyColorSlots');
      setSection ('hdrNoEscape', 'bodyNoEscape');
      setSection ('hdrSection11', 'bodySection11');
      setSection ('hdrKeyGeneral', 'keyGeneralSection');
      setSection ('hdrKeyMsg', 'keyMsgSection');
      setSection ('hdrKeyFleet', 'keyFleetSection');
      setSection ('hdrKeyTrd', 'keyTrdSection');
      setSection ('hdrSection12', 'bodySection12');
      setSection ('hdrSection13', 'bodySection13');
      setSection ('hdrDebrisSAC', 'debrisSACSection');
      setSection ('hdrCRTexto', 'crTextoSection');
      setSection ('hdrCRColor', 'crColorSection');

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('showOptions [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function setSection(strHeader, strSection) {
         var myDivHeader = document.getElementById(strHeader);

         if (myDivHeader == null) return;

         var mySpan = myDivHeader.getElementsByTagName('span')[0];
         if (mySpan) myDivHeader.removeChild(mySpan);
         mySpan = document.createElement('span');

         var mySection = document.getElementById(strSection);
         if (mySection) {
             if (mySection.getAttribute('class') == 'hidden')
                 mySpan.appendChild(document.createTextNode('[+]'))
             else
                 mySpan.appendChild(document.createTextNode('[-]'));
         }

         myDivHeader.appendChild(mySpan);

         myDivHeader.setAttribute('onmouseover', 'this.style.backgroundColor="rgba(105,105,105, 0.5)"');
         myDivHeader.setAttribute('onmouseout', 'this.style.backgroundColor="rgba(0,0,0,0.8)"');
         myDivHeader.setAttribute('style', 'height:19px;');

         myDivHeader.style.cursor = 'pointer';
         myDivHeader.style.cursor = 'hand';
         myDivHeader.addEventListener('click', function(){showSection(strHeader, strSection);}, false);

}

function showSection(strHeader, strSection) {
         var myDivHeader = document.getElementById(strHeader);

         if (myDivHeader == null) return;

         var mySpan = myDivHeader.getElementsByTagName('span')[0];
         if (mySpan) myDivHeader.removeChild(mySpan);
         mySpan = document.createElement('span');

         myDivHeader.appendChild(mySpan);

         var myDiv = document.getElementById(strSection);
         if (myDiv) {
             if (myDiv.getAttribute('class') == 'hidden') {
                 myDiv.setAttribute('class', ' ');
                 mySpan.appendChild(document.createTextNode('[-]'));

                 intPos = strHeader.indexOf('hdrSection');

                 if ( intPos > -1) {
                      intIndex = parseInt(strHeader.substring(intPos + 10));

                      for (var i = 1; i <= 13; i++) {
                           if (intIndex != i) {
                               var theDivHeader = document.getElementById('hdrSection' + i);

                               if (theDivHeader == null) continue;

                               var theSpan = theDivHeader.getElementsByTagName('span')[0];
                               if (theSpan) theDivHeader.removeChild(theSpan);
                               theSpan = document.createElement('span');

                               theDivHeader.appendChild(theSpan);

                               var theDivBody = document.getElementById('bodySection' + i);
                               if (theDivBody) {
                                   theDivBody.setAttribute('class', 'hidden');
                                   theSpan.appendChild(document.createTextNode('[+]'));
                               }
                           }

                      }
                 }
             }
             else {
                 myDiv.setAttribute('class', 'hidden');
                 mySpan.appendChild(document.createTextNode('[+]'));
             }
         }
}

function SelectOptions (strModo) {
    try {
         if (DEBUG_MODE > 0) GM_log('SelectOptions: ' + strPaginaActual);

         var myDiv = document.getElementById('lpunktkit-opciones');
         var arrInputs = myDiv.getElementsByTagName('input');

         switch (strModo) {
                 case 'Saved':
                              var chkColor;

                              for (colorIndex = 0; colorIndex < arrColorFont.length; colorIndex++) {
                                   var strColor = arrColorFont[colorIndex].replace(/\ /g, '').toLowerCase();

                                   if (strColor == strColor_LPuNKTKit) {
                                       chkColor = 'chkColor' + colorIndex;

                                       break;
                                   }
                              }

                              var chkModoSAC;

                              if (modo_Reparto_SAC == 0) chkModoSAC = 'modo_Reparto_SAC' + 0
                              else chkModoSAC = 'modo_Reparto_SAC' + 1;

                              for ( i = 0; i < arrInputs.length; i++)
                                    try {
                                         if ( arrInputs[i].type == 'checkbox' ) {
                                              arrInputs[i].checked = (eval(arrInputs[i].getAttribute('id')) ? 1 : 0 );

                                         } else if ( arrInputs[i].type == 'text' ) {
                                              var myId = arrInputs[i].getAttribute('id');
                                              if (myId) arrInputs[i].value = eval(myId);

                                         } else if ( arrInputs[i].type == 'radio' ) {
                                              if (arrInputs[i].getAttribute('id') == chkColor)
                                                  arrInputs[i].checked = 1;

                                              if (arrInputs[i].getAttribute('id') == chkModoSAC)
                                                  arrInputs[i].checked = 1;
                                         }

                                    } catch(e) {
                                         if (DEBUG_MODE != 0)
                                             GM_log('SelectOptions (' + strModo + ') [ERROR]: ' +
                                                    '<' + e + '> ' +
                                                    'arrInputs[' + i + '].' + arrInputs[i].type);
                                    }

                              var mySelect = myDiv.getElementsByTagName('select');
                              if (mySelect != null)
                                  for (index = 0; index < mySelect[0].options.length; index++) {
                                       if (index == show_Debris)
                                           mySelect[0].options[index].selected = true
                                       else
                                           mySelect[0].options[index].selected = false;
                                  }

                              break;

                 case 'Default':
                              var chkColor;

                              for (colorIndex = 0; colorIndex < arrColorFont.length; colorIndex++) {
                                   var strColor = arrColorFont[colorIndex].replace(/\ /g, '').toLowerCase();

                                   if (strColor == COLOR_LPUNKTKIT) {
                                       chkColor = 'chkColor' + colorIndex;

                                       break;
                                   }
                              }

                              var chkModoSAC;

                              if (modo_Reparto_SAC == MODO_REPARTO_SAC) chkModoSAC = 'modo_Reparto_SAC' + 0
                              else chkModoSAC = 'modo_Reparto_SAC' + 1;


                              for ( i = 0; i < arrInputs.length; i++)
                                    try {
                                         if ( arrInputs[i].type == 'checkbox' ) {
                                              arrInputs[i].checked = (eval( arrInputs[i].getAttribute('id').toUpperCase() ) ? 1 : 0 );

                                         } else if ( arrInputs[i].type == 'text' ) {
                                              var myId = arrInputs[i].getAttribute('id');
                                              if (myId) arrInputs[i].value = eval(myId.toUpperCase());

                                         } else if ( arrInputs[i].type == 'radio' ) {
                                              if (arrInputs[i].getAttribute('id') == chkColor)
                                                  arrInputs[i].checked = 1;

                                              if (arrInputs[i].getAttribute('id') == chkModoSAC)
                                                  arrInputs[i].checked = 1;
                                         }

                                    } catch(e) {
                                         if (DEBUG_MODE != 0)
                                             GM_log('SelectOptions (' + strModo + ') [ERROR]: ' +
                                                    '<' + e + '> ' +
                                                    'arrInputs[' + i + '].' + arrInputs[i].type);
                                    }

                              var mySelect = myDiv.getElementsByTagName('select');
                              if (mySelect != null)
                                  for (index = 0; index < mySelect[0].options.length; index++) {
                                       if (index == SHOW_DEBRIS)
                                           mySelect[0].options[index].selected = true
                                       else
                                           mySelect[0].options[index].selected = false;
                                  }

                              break;

                 case 'All':
                              for ( i = 0; i < arrInputs.length; i++)
                                    if ( arrInputs[i].type == 'checkbox' )
                                       arrInputs[i].checked = 1;

                              break;
         }

    } catch (e) {
         if (DEBUG_MODE != 0) GM_log('SelectOptions (' + strModo + ') [ERROR]: <' + e + '> ' + strPaginaActual);
    }
}

function hideOptions()
{
  try {
       if (DEBUG_MODE > 0) GM_log('hideOptions: ' + strPaginaActual);

       $('#lpunktkit-overlay').remove();

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('hideOptions [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function saveOptions()
{
  try {
        if (DEBUG_MODE > 0) GM_log('saveOptions: ' + strPaginaActual);

        for(var i = 0 ; i < arrColorFont.length ; i++)
        {
            if ($('#chkColor' + i).is(':checked')) {
               strColor_LPuNKTKit = arrColorFont[i].replace(/\ /g, '').toLowerCase();
               GM_setValue("strColor_LPuNKTKit" + strUniverse, strColor_LPuNKTKit);

               break;

            }
        }

        show_PayPal = $('#show_PayPal').is(':checked');
        GM_setValue("showPayPal" + strUniverse, show_PayPal);

        link1_name = trim($('#link1_name').val()).substring(0, LINK_NAME_LENGTH);
        link1_href = trim($('#link1_href').val());
        GM_setValue("link1_name" + strUniverse, link1_name);
        GM_setValue("link1_href" + strUniverse, link1_href);
        link2_name = trim($('#link2_name').val()).substring(0, LINK_NAME_LENGTH);;
        link2_href = trim($('#link2_href').val());
        GM_setValue("link2_name" + strUniverse, link2_name);
        GM_setValue("link2_href" + strUniverse, link2_href);
        link3_name = trim($('#link3_name').val()).substring(0, LINK_NAME_LENGTH);;
        link3_href = trim($('#link3_href').val());
        GM_setValue("link3_name" + strUniverse, link3_name);
        GM_setValue("link3_href" + strUniverse, link3_href);
        link4_name = trim($('#link4_name').val()).substring(0, LINK_NAME_LENGTH);;
        link4_href = trim($('#link4_href').val());
        GM_setValue("link4_name" + strUniverse, link4_name);
        GM_setValue("link4_href" + strUniverse, link4_href);

        set_Clock_Links = $('#set_Clock_Links').is(':checked');
        GM_setValue("setClockLinks" + strUniverse, set_Clock_Links);

        show_Uni_Name_In_Pillory = $('#show_Uni_Name_In_Pillory').is(':checked');
        GM_setValue("showUniNameInPillory" + strUniverse, show_Uni_Name_In_Pillory);

        show_Time_Ships_Defenses = $('#show_Time_Ships_Defenses').is(':checked');
        GM_setValue("showTimeShipsDefenses" + strUniverse, show_Time_Ships_Defenses);

        show_Daily_Ships_Defenses = $('#show_Daily_Ships_Defenses').is(':checked');
        GM_setValue("showDailyShipsDefenses" + strUniverse, show_Daily_Ships_Defenses);

        show_Production_Ratio = $('#show_Production_Ratio').is(':checked');
        GM_setValue("showProductionRatio" + strUniverse, show_Production_Ratio);

        show_Llenado_Almacenes = $('#show_Llenado_Almacenes').is(':checked');
        GM_setValue("showLlenadoAlmacenes" + strUniverse, show_Llenado_Almacenes);

        color_M_Warehouse_0 = StoreColor ('color_M_Warehouse_0', 'colorMWarehouse0');
        color_C_Warehouse_0 = StoreColor ('color_C_Warehouse_0', 'colorCWarehouse0');
        color_D_Warehouse_0 = StoreColor ('color_D_Warehouse_0', 'colorDWarehouse0');
        color_M_Warehouse_80 = StoreColor ('color_M_Warehouse_80', 'colorMWarehouse80');
        color_C_Warehouse_80 = StoreColor ('color_C_Warehouse_80', 'colorCWarehouse80');
        color_D_Warehouse_80 = StoreColor ('color_D_Warehouse_80', 'colorDWarehouse80');
        color_M_Warehouse_100 = StoreColor ('color_M_Warehouse_100', 'colorMWarehouse100');
        color_C_Warehouse_100 = StoreColor ('color_C_Warehouse_100', 'colorCWarehouse100');
        color_D_Warehouse_100 = StoreColor ('color_D_Warehouse_100', 'colorDWarehouse100');

        color_M_Den_0 = StoreColor ('color_M_Den_0', 'colorMDen0');
        color_C_Den_0 = StoreColor ('color_C_Den_0', 'colorCDen0');
        color_D_Den_0 = StoreColor ('color_D_Den_0', 'colorDDen0');
        color_M_Den_80 = StoreColor ('color_M_Den_80', 'colorMDen80');
        color_C_Den_80 = StoreColor ('color_C_Den_80', 'colorCDen80');
        color_D_Den_80 = StoreColor ('color_D_Den_80', 'colorDDen80');
        color_M_Den_100 = StoreColor ('color_M_Den_100', 'colorMDen100');
        color_C_Den_100 = StoreColor ('color_C_Den_100', 'colorCDen100');
        color_D_Den_100 = StoreColor ('color_D_Den_100', 'colorDDen100');

        set_Fix_Action_Icons = $('#set_Fix_Action_Icons').is(':checked');
        GM_setValue("setFixActionIcons" + strUniverse, set_Fix_Action_Icons);

        highlight_Players = $('#highlight_Players').is(':checked');
        GM_setValue("highlightPlayers" + strUniverse, highlight_Players);

        show_Pranger_In_Header = $('#show_Pranger_In_Header').is(':checked');
        GM_setValue("showPrangerInHeader" + strUniverse, show_Pranger_In_Header);

        show_Options_In_UserName = $('#show_Options_In_UserName').is(':checked');
        GM_setValue("showOptionsInUserName" + strUniverse, show_Options_In_UserName);

        show_Range = $('#show_Range').is(':checked');
        GM_setValue("showRange" + strUniverse, show_Range);

        show_Demolish = $('#show_Demolish').is(':checked');
        GM_setValue("showDemolish" + strUniverse, show_Demolish);

        disable_Useless_Stuff = $('#disable_Useless_Stuff').is(':checked');
        GM_setValue("disableUselessStuff" + strUniverse, disable_Useless_Stuff);

        set_Focus_Correctly = $('#set_Focus_Correctly').is(':checked');
        GM_setValue("setFocusCorrectly" + strUniverse, set_Focus_Correctly);

        use_Short_Header = $('#use_Short_Header').is(':checked');
        GM_setValue("useShortHeader" + strUniverse, use_Short_Header);

        disable_Star = $('#disable_Star').is(':checked');
        GM_setValue("disableStar" + strUniverse, disable_Star);

        show_Planet_Nav_Keys = $('#show_Planet_Nav_Keys').is(':checked');
        GM_setValue("showPlanetNavKeys" + strUniverse, show_Planet_Nav_Keys);

        show_Planeta_Activo = $('#show_Planeta_Activo').is(':checked');
        GM_setValue("showPlanetaActivo" + strUniverse, show_Planeta_Activo);

        show_Trade_Calculator = $('#show_Trade_Calculator').is(':checked');
        GM_setValue("showTradeCalculator" + strUniverse, show_Trade_Calculator);

        show_Sats_Balance = $('#show_Sats_Balance').is(':checked');
        GM_setValue("showSatsBalance" + strUniverse, show_Sats_Balance);

        show_Resources_Info = $('#show_Resources_Info').is(':checked');
        GM_setValue("showResourcesInfo" + strUniverse, show_Resources_Info);

        color_Res_Almacen = StoreColor ('color_Res_Almacen', 'colorResAlmacen');
        color_Res_Den = StoreColor ('color_Res_Den', 'colorResDen');
        color_Res_Prod = StoreColor ('color_Res_Prod', 'colorResProd');
        color_Energy_Used = StoreColor ('color_Energy_Used', 'colorEnergyUsed');

        fix_Forum_Link = $('#fix_Forum_Link').is(':checked');
        GM_setValue("fixForumLink" + strUniverse, fix_Forum_Link);

        show_Moons_Right = $('#show_Moons_Right').is(':checked');
        GM_setValue("showMoonsRight" + strUniverse, show_Moons_Right);

        show_Link_Fixed = $('#show_Link_Fixed').is(':checked');
        GM_setValue("showLinkFixed" + strUniverse, show_Link_Fixed);

        show_Sats_Terraformer = $('#show_Sats_Terraformer').is(':checked');
        GM_setValue("showSatsTerraformer" + strUniverse, show_Sats_Terraformer);

        show_Sats_Graviton = $('#show_Sats_Graviton').is(':checked');
        GM_setValue("showSatsGraviton" + strUniverse, show_Sats_Graviton);

        show_Confirm_Trader = $('#show_Confirm_Trader').is(':checked');
        GM_setValue("showConfirmTrader" + strUniverse, show_Confirm_Trader);

        show_Efficiency = $('#show_Efficiency').is(':checked');
        GM_setValue("showEfficiency" + strUniverse, show_Efficiency);

        show_Small_Planets = $('#show_Small_Planets').is(':checked');
        GM_setValue("showSmallPlanets" + strUniverse, show_Small_Planets);

        show_Full_Planet = $('#show_Full_Planet').is(':checked');
        GM_setValue("showFullPlanet" + strUniverse, show_Full_Planet);

        color_Full_Planet_0 = StoreColor ('color_Full_Planet_0', 'colorFullPlanet');
        color_Full_Planet_1 = StoreColor ('color_Full_Planet_1', 'colorFullPlanet1');
        color_Full_Planet_2 = StoreColor ('color_Full_Planet_2', 'colorFullPlanet2');
        color_Full_Planet_3 = StoreColor ('color_Full_Planet_3', 'colorFullPlanet3');

        show_Compactador_Batallas = $('#show_Compactador_Batallas').is(':checked');
        GM_setValue("showCompactadorBatallas" + strUniverse, show_Compactador_Batallas);

        if (show_Compactador_Batallas)
            saveOptionsCR();

        //Mensajes
        current_Planet_Name = $('#current_Planet_Name').is(':checked');
        GM_setValue("currentPlanetName" + strUniverse, current_Planet_Name);

        reply_CC = $('#reply_CC').is(':checked');
        GM_setValue("replyCC" + strUniverse, reply_CC);

        show_Colored_Messages = $('#show_Colored_Messages').is(':checked');
        GM_setValue("showColoredMessages" + strUniverse, show_Colored_Messages);

        if (show_Colored_Messages)
            saveOptionsMsg();

        show_BBCode = $('#show_BBCode').is(':checked');
        GM_setValue("showBBCode" + strUniverse, show_BBCode);

        show_Smiles = $('#show_Smiles').is(':checked');
        GM_setValue("showSmiles" + strUniverse, show_Smiles);

        show_Message_Button_Left = $('#show_Message_Button_Left').is(':checked');
        GM_setValue("showMessageButtonLeft" + strUniverse, show_Message_Button_Left);

        //Recursos en vuelo
        fix_Tooltips = $('#fix_Tooltips').is(':checked');
        GM_setValue("fixTooltips" + strUniverse, fix_Tooltips);

        show_Fleet_Resources = $('#show_Fleet_Resources').is(':checked');
        GM_setValue("showFleetResources" + strUniverse, show_Fleet_Resources);

        show_Resources_Per_Fleet = $('#show_Resources_Per_Fleet').is(':checked');
        GM_setValue("showResourcesPerFleet" + strUniverse, show_Resources_Per_Fleet);

        show_Empty_Space = $('#show_Empty_Space').is(':checked');
        GM_setValue("showEmptySpace" + strUniverse, show_Empty_Space);

        color_Metal = StoreColor ('color_Metal', 'colorMetal');
        color_Cristal = StoreColor ('color_Cristal', 'colorCristal');
        color_Deuterio = StoreColor ('color_Deuterio', 'colorDeuterio');
        color_Empty_Space = StoreColor ('color_Empty_Space', 'colorEmptySpace');

        //Flota
        show_Color_Flight_Slots = $('#show_Color_Flight_Slots').is(':checked');
        GM_setValue("showColorFlightSlots" + strUniverse, show_Color_Flight_Slots);

        color_Slot_0 = StoreColor ('color_Slot_0', 'colorSlot0');
        color_Slot_1 = StoreColor ('color_Slot_1', 'colorSlot1');
        color_Slot_2 = StoreColor ('color_Slot_2', 'colorSlot2');
        color_Slot_3 = StoreColor ('color_Slot_3', 'colorSlot3');

        show_Load_Buttons = $('#show_Load_Buttons').is(':checked');
        GM_setValue("showLoadButtons" + strUniverse, show_Load_Buttons);

        remove_Adv = $('#remove_Adv').is(':checked');
        GM_setValue("removeAdv" + strUniverse, remove_Adv);

        show_Return_Fleet_Question = $('#show_Return_Fleet_Question').is(':checked');
        GM_setValue("showReturnFleetQuestion" + strUniverse, show_Return_Fleet_Question);

        show_Fleet_Content = $('#show_Fleet_Content').is(':checked');
        GM_setValue("showFleetContent" + strUniverse, show_Fleet_Content);

        show_Dest_Player_Name = $('#show_Dest_Player_Name').is(':checked');
        GM_setValue("showDestPlayerName" + strUniverse, show_Dest_Player_Name);

        use_Direct_Spy = $('#use_Direct_Spy').is(':checked');
        GM_setValue("useDirectSpy" + strUniverse, use_Direct_Spy);

        show_Auto_Expo_Fleet = $('#show_Auto_Expo_Fleet').is(':checked');
        GM_setValue("showAutoExpoFleet" + strUniverse, show_Auto_Expo_Fleet);

        show_No_Escape = $('#show_No_Escape').is(':checked');
        GM_setValue("showNoEscape" + strUniverse, show_No_Escape);

        color_No_Escape = StoreColor ('color_No_Escape', 'colorNoEscape');
        color_Escape = StoreColor ('color_Escape', 'colorEscape');

        //Shortcut keys
        show_Key_Everywhere = $('#show_Key_Everywhere').is(':checked');
        GM_setValue("showKeyEverywhere" + strUniverse, show_Key_Everywhere);

        show_Key_Mailbox = $('#show_Key_Mailbox').is(':checked');
        GM_setValue("showKeyMailbox" + strUniverse, show_Key_Mailbox);

        show_Key_Fleet = $('#show_Key_Fleet').is(':checked');
        GM_setValue("showKeyFleet" + strUniverse, show_Key_Fleet);

        show_Key_Trader = $('#show_Key_Trader').is(':checked');
        GM_setValue("showKeyTrade" + strUniverse, show_Key_Trader);

        if (show_Key_Everywhere || show_Key_Mailbox || show_Key_Fleet || show_Key_Trader)
          show_Shortcuts = $('#show_Shortcuts').is(':checked')
        else
          show_Shortcuts = false;

        GM_setValue("showShortcuts" + strUniverse, show_Shortcuts);

        //Chat
        id_Chat = parseInt($('#id_Chat').val().replace(".",""));
        GM_setValue("idChat" + strUniverse, id_Chat);

        if (id_Chat) {
            show_Chat = $('#show_Chat').is(':checked');
            link_Chat = $('#link_Chat').is(':checked')
        } else {
            show_Chat = false;
            link_Chat = false;
        }

        GM_setValue("showChat" + strUniverse, show_Chat);
        GM_setValue("linkChat" + strUniverse, link_Chat);

        //Debris
        var strMinEscombros = $('#min_Escombros').val().replace(".","");
        min_Escombros = parseInt( (strMinEscombros.length > 0 ? strMinEscombros : '0') );
        GM_setValue("minEscombros" + strUniverse, min_Escombros);

        show_Debris = $("#show_Debris option:selected").attr('value');
        GM_setValue('showDebris' + strUniverse, show_Debris);

        hideOptions();

        document.location.reload(); //recargamos la pagina

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('saveOptions [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function StoreColor (strColorItem, strColorStored) {
    try {
        if (DEBUG_MODE > 2) GM_log('StoreColor: ' + strPaginaActual);

        var objColor = trim($('#' + strColorItem).val());

        if (objColor.indexOf('#') >= 0)
           objColor = objColor.toUpperCase()  //Hexadecimales en MAYUSCULAS
        else
           objColor = objColor.toLowerCase(); //Constantes en minusculas

        GM_setValue(strColorStored + strUniverse, objColor);

        return objColor;

    }
    catch(e) {
        if (DEBUG_MODE != 0) GM_log('StoreColor [ERROR]: <' + e + '> ' + strPaginaActual);
    }
}

function saveOptionsMsg()
{
  try {
        if (DEBUG_MODE > 0) GM_log('saveOptionsMsg: ' + strPaginaActual);

        for(var i=0 ; i < arrColorMessages.length ; i++)
        {
            arrColorMessages[i][1] = StoreColor ('messageColor' + i, 'messageColor' + i)

            // Texto
            arrColorMessages[i][0] = trim(document.getElementById('messageText' + i).value);

            GM_setValue('messageText' + i + strUniverse, arrColorMessages[i][0]);
        }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('saveOptionsMsg [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function saveOptionsCR()
{
  try {
        if (DEBUG_MODE > 0) GM_log('saveOptionsCR: ' + strPaginaActual);

        hide_Stolen_CR = $('#hide_Stolen_CR').is(':checked');
        GM_setValue("hideStolenCR" + strUniverse, hide_Stolen_CR);

        hide_Debris_CR = $('#hide_Debris_CR').is(':checked');
        GM_setValue("hideDebrisCR" + strUniverse, hide_Debris_CR);

        show_Escombros_SAC = $('#show_Escombros_SAC').is(':checked');
        GM_setValue("showEscombrosSAC" + strUniverse, show_Escombros_SAC);

        if ($('#modo_Reparto_SAC' + 0).is(':checked'))
            modo_Reparto_SAC = 0
        else
            modo_Reparto_SAC = 1;

        GM_setValue("modoRepartoSAC" + strUniverse, modo_Reparto_SAC);

        rat_Metal_SAC = $('#rat_Metal_SAC').val().replace(/\,/g,".");
        rat_Metal_SAC = parseFloat( (rat_Metal_SAC.length > 0 ? rat_Metal_SAC : RAT_METAL_SAC) );
        rat_Metal_SAC = (rat_Metal_SAC < RAT_METAL_SAC ? RAT_METAL_SAC : rat_Metal_SAC);
        GM_setValue("ratMetalSAC" + strUniverse, '' + rat_Metal_SAC + '');

        rat_Cristal_SAC = $('#rat_Cristal_SAC').val().replace(/\,/g,".");
        rat_Cristal_SAC = parseFloat( (rat_Cristal_SAC.length > 0 ? rat_Cristal_SAC : RAT_CRISTAL_SAC) );
        rat_Cristal_SAC = (rat_Cristal_SAC < RAT_CRISTAL_SAC ? RAT_CRISTAL_SAC : rat_Cristal_SAC);
        GM_setValue("ratCristalSAC" + strUniverse, '' + rat_Cristal_SAC + '');

        rat_Deuterio_SAC = $('#rat_Deuterio_SAC').val().replace(/\,/g,".");
        rat_Deuterio_SAC = parseFloat( (rat_Deuterio_SAC.length > 0 ? rat_Deuterio_SAC : RAT_DEUTERIO_SAC) );
        rat_Deuterio_SAC = (rat_Deuterio_SAC < RAT_DEUTERIO_SAC ? RAT_DEUTERIO_SAC : rat_Deuterio_SAC);
        GM_setValue("ratDeuterioSAC" + strUniverse, '' + rat_Deuterio_SAC + '');

        usar_CR_Friki = $('#usar_CR_Friki').is(':checked');
        GM_setValue("usarCRFriki" + strUniverse, usar_CR_Friki);

        for(var i=0 ; i < arrColorBatalla.length ; i++)
        {
            arrColorBatalla[i][1] = StoreColor ('batallaColor' + i, 'batallaColor' + i);
        }

        LANG.SERVER.txt_CR_SHIP_SH_PCarga    = trim(document.getElementById("batallaName1").value);
        GM_setValue("batallaName1" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_PCarga);
        LANG.SERVER.txt_CR_SHIP_SH_GrCarga   = trim(document.getElementById("batallaName2").value);
        GM_setValue("batallaName2" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_GrCarga);
        LANG.SERVER.txt_CR_SHIP_SH_CLigero   = trim(document.getElementById("batallaName3").value);
        GM_setValue("batallaName3" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_CLigero);
        LANG.SERVER.txt_CR_SHIP_SH_CPesado   = trim(document.getElementById("batallaName4").value);
        GM_setValue("batallaName4" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_CPesado);
        LANG.SERVER.txt_CR_SHIP_SH_Crucero   = trim(document.getElementById("batallaName5").value);
        GM_setValue("batallaName5" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Crucero);
        LANG.SERVER.txt_CR_SHIP_SH_NB        = trim(document.getElementById("batallaName6").value);
        GM_setValue("batallaName6" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_NB);
        LANG.SERVER.txt_CR_SHIP_SH_Acoraz    = trim(document.getElementById("batallaName7").value);
        GM_setValue("batallaName7" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Acoraz);
        LANG.SERVER.txt_CR_SHIP_SH_Bomb      = trim(document.getElementById("batallaName8").value);
        GM_setValue("batallaName8" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Bomb);
        LANG.SERVER.txt_CR_SHIP_SH_Destruc   = trim(document.getElementById("batallaName9").value);
        GM_setValue("batallaName9" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Destruc);
        LANG.SERVER.txt_CR_SHIP_SH_Edlm      = trim(document.getElementById("batallaName10").value);
        GM_setValue("batallaName10" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Edlm);
        LANG.SERVER.txt_CR_SHIP_SH_Colony    = trim(document.getElementById("batallaName11").value);
        GM_setValue("batallaName11" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Colony);
        LANG.SERVER.txt_CR_SHIP_SH_Recy      = trim(document.getElementById("batallaName12").value);
        GM_setValue("batallaName12" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Recy);
        LANG.SERVER.txt_CR_SHIP_SH_Sonda     = trim(document.getElementById("batallaName13").value);
        GM_setValue("batallaName13" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Sonda);
        LANG.SERVER.txt_CR_SHIP_SH_Satelite  = trim(document.getElementById("batallaName14").value);
        GM_setValue("batallaName14" + strUniverse, LANG.SERVER.txt_CR_SHIP_SH_Satelite);
        LANG.SERVER.txt_CR_DEFENSE_SH_Lanza     = trim(document.getElementById("batallaName15").value);
        GM_setValue("batallaName15" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_Lanza);
        LANG.SERVER.txt_CR_DEFENSE_SH_LPeque    = trim(document.getElementById("batallaName16").value);
        GM_setValue("batallaName16" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_LPeque);
        LANG.SERVER.txt_CR_DEFENSE_SH_LGrande   = trim(document.getElementById("batallaName17").value);
        GM_setValue("batallaName17" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_LGrande);
        LANG.SERVER.txt_CR_DEFENSE_SH_CGauss    = trim(document.getElementById("batallaName18").value);
        GM_setValue("batallaName18" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CGauss);
        LANG.SERVER.txt_CR_DEFENSE_SH_CIonico   = trim(document.getElementById("batallaName19").value);
        GM_setValue("batallaName19" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CIonico);
        LANG.SERVER.txt_CR_DEFENSE_SH_CPlasma   = trim(document.getElementById("batallaName20").value);
        GM_setValue("batallaName20" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CPlasma);
        LANG.SERVER.txt_CR_DEFENSE_SH_CupPeque  = trim(document.getElementById("batallaName21").value);
        GM_setValue("batallaName21" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CupPeque);
        LANG.SERVER.txt_CR_DEFENSE_SH_CupGrande = trim(document.getElementById("batallaName22").value);
        GM_setValue("batallaName22" + strUniverse, LANG.SERVER.txt_CR_DEFENSE_SH_CupGrande);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('saveOptionsCR [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Muestra los links
 */
function showLinks()
{
  try {
         if ((strPaginaActual == 'showmessage') ||
             (strPaginaActual == "combatreport") ||
             (strPaginaActual == "writemessage") ||
             (strPaginaActual == "search") ||
             (strPaginaActual == "buddies"))
             return;

         if ( ( (link1_name.length == 0) || (link1_href.length == 0) ) &&
              ( (link2_name.length == 0) || (link2_href.length == 0) ) &&
              ( (link3_name.length == 0) || (link3_href.length == 0) ) &&
              ( (link4_name.length == 0) || (link4_href.length == 0) ) &&
              ( set_Clock_Links == false ) &&
              ( link_Chat == false ) )
              return;

         if (DEBUG_MODE > 0) GM_log('ShowLinks: ' + strPaginaActual);

         function CrearBarraLinks() {
            try {
                 if (! document.getElementById('siteFooter')) return;

                 if (DEBUG_MODE > 0) GM_log('ShowLinks >> CrearBarraLinks: ' + strPaginaActual);

                 var myBackGround = 'background: transparent url(data:image/png;' +
                                    'base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAATCAYA' +
                                    'AABY4MdjAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv' +
                                    '8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAA' +
                                    'DqYAAAOpgAABdwnLpRPAAAAGJJREFUKFNlyMsOQDAAR' +
                                    'NGRVENbSitBvcL//+OwHjc5m1ut5ST+1d8U635TIaaZ' +
                                    'Cr7PVPAxUSF0IxWMMVSwtqGCc4EK7TcVnI9U6PpEhTB' +
                                    'kKoQ4UWHICxXK8VABleVP2S6qF0CUalKdgTQIAAAAAE' +
                                    'lFTkSuQmCC) repeat-x 0px 0px;';

                 var myDiv = document.createElement('div');
                     myDiv.setAttribute('id', 'lpunktkit-links-div');

                     myDiv.setAttribute('style','background: transparent; height: 0px;text-align:center;' +
                                         'position:fixed;' +
                                         'bottom: ' + ((document.getElementById('siteFooter').offsetHeight * 2 ) - 1) + 'px;' +
                                         'z-index:1;width: 100%;');

                 var myContent = document.createElement('div');
                     myContent.setAttribute('class', 'lpunktkit-links-cont');
                     myContent.setAttribute('style', 'margin: 0px auto;padding-top:0px;width:680px;');

                 myDiv.appendChild(myContent);

                 var myFill = document.createElement('div');
                     myFill.setAttribute('id','lpunktkit-fill');
                     myFill.setAttribute('style', 'width:20px; float: left; height:1px;');
                     myFill.appendChild(document.createTextNode(' '));

                 myContent.appendChild(myFill);

                 var myLinks = document.createElement('div');
                     myLinks.setAttribute('id', 'lpunktkit-links');
                     myLinks.setAttribute('style', 'width: 660px; float: right; text-align: center;' +
                                        myBackGround +
                                        'height:' + ( ( (link1_name.length > 0) && (link1_href.length > 0) ) ||
                                                      ( (link2_name.length > 0) && (link2_href.length > 0) ) ||
                                                      ( (link3_name.length > 0) && (link3_href.length > 0) ) ||
                                                      ( (link4_name.length > 0) && (link4_href.length > 0) ) ||
                                                      set_Clock_Links ||
                                                      ( link_Chat && (id_Chat > 0) )
                                                      ? '19px;' : '0px;'));

                 myContent.appendChild(myLinks);

                 document.getElementById('siteFooter').appendChild(myDiv);

                 if (strPaginaActual != 'research')
                     document.getElementById('inhalt').appendChild(document.createElement('br'));

                 setStyleSet('#lpunktkit-links a:link,' +
                             '#lpunktkit-links a:visited {text-decoration:overline;}' +
                             '#lpunktkit-links a:hover {text-decoration:none;color:' + strColor_LPuNKTKit + ';}' + //#9c0
                             '#lpunktkit-links a:active {text-decoration:overline;}');

                 return true;

            } catch(e) {
                 if (DEBUG_MODE != 0) GM_log('ShowLinks >> CrearBarraLinks [ERROR]: <' + e + '> ' + strPaginaActual);
            }
         }


         function MostrarHora () {
             try {
                  var theLi = getElementsByClass('OGameClock',document,'li')[0];

                  var theSpan = theLi.getElementsByTagName('span');

                  var mySpan = document.getElementById('lpk-clock');
                  if (mySpan == null)
                      anuncio.append('<span id=\'lpk-clock\' style=\'color:' + strColor_LPuNKTKit + ';\'>' +
                                     ' .: ' + theSpan[0].innerHTML + ' :. </span>')
                  else {
                      mySpan.innerHTML = ' .: ' + theSpan[0].innerHTML + ' :. ';
                      mySpan.setAttribute('title', mySpan.innerHTML);
                  }

             } catch (e) {
                  if (DEBUG_MODE != 0) GM_log('ShowLinks >> MostrarHora [ERROR]: <' + e + '> ' + strPaginaActual);
             }
         }

         CrearBarraLinks();

         anuncio = $('#lpunktkit-links');

         //insertamos los links si es que hay alguno
         if ( (link1_name != "" ) && (link1_href != "" ) )
            anuncio.append('<a href="' + link1_href + '" target="_blank">' + link1_name + '</a>');


         if ( (link2_name != "" ) && (link2_href != "" ) )
            anuncio.append('<a href="' + link2_href + '" target="_blank">' + link2_name + '</a>');


         if ( (link3_name != "" ) && (link3_href != "" ) )
            anuncio.append('<a href="' + link3_href + '" target="_blank">' + link3_name + '</a>');

         if ( (link4_name != "" ) && (link4_href != "" ) )
            anuncio.append('<a href="' + link4_href + '" target="_blank">' + link4_name + '</a>');

         if (set_Clock_Links) {
             MostrarHora();
             setInterval(MostrarHora, 1000);
         }

         if ( link_Chat )
            anuncio.append('<a href="http://xat.com/web_gear/chat/go_large.php?id=' + id_Chat + '" target="_blank">' + 'Chat' + '</a>');

         if ( show_PayPal ) {
              anuncio.append('<form action="https://www.paypal.com/cgi-bin/webscr" ' +
                             'method="post" class="lpunktkit-donar" target="_blank">' +
                             '<input type="hidden" name="cmd" value="_s-xclick">' +
                             '<input type="hidden" name="encrypted" ' +
                             'value="-----BEGIN PKCS7-----MIIHLwYJKoZIhvcNAQcEoII' +
                          'HIDCCBxwCAQExggEwMIIBLAIBADCBlDCBjjELMAkGA1UEBhMCVVMx' +
                          'CzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBWaWV3MRQwE' +
                          'gYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2ZV9jZXJ0cz' +
                          'ERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQEWDXJlQHB' +
                          'heXBhbC5jb20CAQAwDQYJKoZIhvcNAQEBBQAEgYAN2Qx/bKQLqryD' +
                          'KAnKd1gwHFSWikPROE2flU3VIQZWoUvWy8JCUaSxm7TdUPUF0CsLi' +
                          'Dr4yUt/P/BOsA8Ol+VAINdIJCqjaWlv+S89+Oi0MNmxQxsn0C3dZM' +
                          'fv2gCBymEkcMmtv7Fyeevrs8nWalO0c94xcXg5wav0VnI/CEcbCDE' +
                          'LMAkGBSsOAwIaBQAwgawGCSqGSIb3DQEHATAUBggqhkiG9w0DBwQI' +
                          'NetGbvDPgLuAgYgYpZBXpnCLJ3beHEiGlxhnJTeuq6VavCAwTLEvH' +
                          'TZKXmzSmbWcASsCOV3KpSS669u6pr3rAJd+d6BtZbwiqysv1Wrqrj' +
                          'FaR4Wl2VZQBf7yqoOq3Lw826nIxjdbSSM844eSRjBsp4OHJkaLuhO' +
                          'g+a36vGAVO88QlGDscD1ci4Df6KVtZ3p4WMuaoIIDhzCCA4MwggLs' +
                          'oAMCAQICAQAwDQYJKoZIhvcNAQEFBQAwgY4xCzAJBgNVBAYTAlVTM' +
                          'QswCQYDVQQIEwJDQTEWMBQGA1UEBxMNTW91bnRhaW4gVmlldzEUMB' +
                          'IGA1UEChMLUGF5UGFsIEluYy4xEzARBgNVBAsUCmxpdmVfY2VydHM' +
                          'xETAPBgNVBAMUCGxpdmVfYXBpMRwwGgYJKoZIhvcNAQkBFg1yZUBw' +
                          'YXlwYWwuY29tMB4XDTA0MDIxMzEwMTMxNVoXDTM1MDIxMzEwMTMxN' +
                          'VowgY4xCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJDQTEWMBQGA1UEBx' +
                          'MNTW91bnRhaW4gVmlldzEUMBIGA1UEChMLUGF5UGFsIEluYy4xEzA' +
                          'RBgNVBAsUCmxpdmVfY2VydHMxETAPBgNVBAMUCGxpdmVfYXBpMRww' +
                          'GgYJKoZIhvcNAQkBFg1yZUBwYXlwYWwuY29tMIGfMA0GCSqGSIb3D' +
                          'QEBAQUAA4GNADCBiQKBgQDBR07d/ETMS1ycjtkpkvjXZe9k+6CieL' +
                          'uLsPumsJ7QC1odNz3sJiCbs2wC0nLE0uLGaEtXynIgRqIddYCHx88' +
                          'pb5HTXv4SZeuv0Rqq4+axW9PLAAATU8w04qqjaSXgbGLP3NmohqM6' +
                          'bV9kZZwZLR/klDaQGo1u9uDb9lr4Yn+rBQIDAQABo4HuMIHrMB0GA' +
                          '1UdDgQWBBSWn3y7xm8XvVk/UtcKG+wQ1mSUazCBuwYDVR0jBIGzMI' +
                          'GwgBSWn3y7xm8XvVk/UtcKG+wQ1mSUa6GBlKSBkTCBjjELMAkGA1U' +
                          'EBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1Nb3VudGFpbiBW' +
                          'aWV3MRQwEgYDVQQKEwtQYXlQYWwgSW5jLjETMBEGA1UECxQKbGl2Z' +
                          'V9jZXJ0czERMA8GA1UEAxQIbGl2ZV9hcGkxHDAaBgkqhkiG9w0BCQ' +
                          'EWDXJlQHBheXBhbC5jb22CAQAwDAYDVR0TBAUwAwEB/zANBgkqhki' +
                          'G9w0BAQUFAAOBgQCBXzpWmoBa5e9fo6ujionW1hUhPkOBakTr3YCD' +
                          'jbYfvJEiv/2P+IobhOGJr85+XHhN0v4gUkEDI8r2/rNk1m0GA8HKd' +
                          'dvTjyGw/XqXa+LSTlDYkqI8OwR8GEYj4efEtcRpRYBxV8KxAW93YD' +
                          'WzFGvruKnnLbDAF6VR5w/cCMn5hzGCAZowggGWAgEBMIGUMIGOMQs' +
                          'wCQYDVQQGEwJVUzELMAkGA1UECBMCQ0ExFjAUBgNVBAcTDU1vdW50' +
                          'YWluIFZpZXcxFDASBgNVBAoTC1BheVBhbCBJbmMuMRMwEQYDVQQLF' +
                          'ApsaXZlX2NlcnRzMREwDwYDVQQDFAhsaXZlX2FwaTEcMBoGCSqGSI' +
                          'b3DQEJARYNcmVAcGF5cGFsLmNvbQIBADAJBgUrDgMCGgUAoF0wGAY' +
                          'JKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcN' +
                          'MTMwMjA3MjMzNzI3WjAjBgkqhkiG9w0BCQQxFgQUfHZ4f3K3yiglO' +
                          '/3jBH/A+z7OMRYwDQYJKoZIhvcNAQEBBQAEgYBeW+rO0cRX9JDLJ3' +
                          'IMhuQrzw3dL1jFqoIoDldFRDeuO72WVc+7BCzx5WU0h8YaBSXwD2M' +
                          'xac6V0aIVknSUO0kOkvdcCryKovUJK1QjkoLu6ZDXRuVQz+7RH1Rp' +
                          'gw1+18Y1Rc5s6I5JVy33t7WzuXepa8NAR6890p7cdQSAg/8Z7w==-' +
                          '----END PKCS7-----">' +
                          '<input type="image" src="data:image/gif;base64,R0lGOD' +
                          'lhSgAVAPcmAP+sLf7iq/7gpf7ksf7en/+6Tf+vM7+LNv+xOu7bskB' +
                          'edhA+a/+0QN+aLo9/WHBuWxA+aoCQl0BfeXB+f2BhUc+TMn+Jg7+Y' +
                          'U76zkZ+HVp6jmX+Nj97Qre+iKo6Xk56gke+yT/63R3+LiTBUdO7Tm' +
                          '1BdXs4HAkBfd+7ZrH+Khs+VON7MomB0fkBgeq6ojf7HbGBze765o8' +
                          '7Bnp6hlf/s0M7Do/7Rhb62mjBKWxA7YjBUczBUcv64SmB2gp9+Qs7' +
                          'EqP/89jBTcY6Uif+lNEBedN+dNIBwSa6wov/NgtEQBY6Vjb+OO/7a' +
                          'mP++Xf+3RlBpev7UjP/Ti6+QVb++r8+hUs6/mf/05P/CYNEOBc6+l' +
                          'N7Knf7epP+oLH+MjJ6fjVBrfmBmXf/05v/ryf61Rv/ZoCBJbv/it3' +
                          'BoTY6WkP/py//YnyBCX/+vOkBVYP+/Wf63S767qP7WjP65Tf/w2f/' +
                          'FZu/gwv/u0++kMVBsgmB1gP7hqmB4h//uzv7dnv/w2HCAhP7Qf66s' +
                          'mf+mLf/boP6/WTBMYf7Jcv+uM//y2yBIba6unv/sz//itv+pNP+yP' +
                          '/7mt/+pJv/15//rzv7pvv/syP/dqv/46v/03//OhP/w0/+/Xv+xOA' +
                          'AzZswAAP+ZMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
                          'AAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACYALAAAAABKABUAAA' +
                          'j/AE0IHGjCk8GDCBMqXMiwocOEBCMONLgoTKSLGC8CAZKxo8ePIEN' +
                          '+tJLGoMSJcyypXMmypcuXMGPKfGnH00lPfi7p3Mmzp8+fQIMKDYrI' +
                          'JkFPYjIpXcq0qdOnUKNKncrHaMFBlLJq3cqVUoSvEaZ0HUuWa52ya' +
                          'ClFMeppktu3cONOgsOpbt09cvPqfXsEz96/k6DY9MRjy6PDiBMr9s' +
                          'BJw6MELTj9OBxjgwcOhznESKBhQ4LDnDdoSJBAEacWmH9Y/qy49WE' +
                          'bPAy+MTSgtu3buHtwqlE7EKcuA3SPWLCA9xdOEkYgH4CCuATkaOzO' +
                          'mMFp+AIUuLMP0ENIjsExIWwE/xhPvnx5HZzI3+Ak4gOnPwFWcMoTA' +
                          'P2HABDSyxAhI8CJ9CJwcoN8JwTgnhLmJRjACyGEYJAjDDDwQh8CVG' +
                          'jhhRVyooCFQnDixROcaJHhhpzsMKIAVbCgQBklCqAAJwJ0qEAKLHC' +
                          'SAoYYMuFGhAwYxAYCQDJARxwEFGmkkRhwMkGRJCQCAQlEcFJkFpzA' +
                          'kOSSV5IAQRAuuKAkAVsSYEGVFpSJwZFHAnIFkGwadIgBcMZpQAF01' +
                          'kmnA5w8cIEUhXDiQAEPcJIBCG1wcgGeGRSA6AV5glCCoFRwUkIBjD' +
                          '6gKBgg2EmnE3LKaZAgAIQq6qikUmAXJzkYEeodONSVgw8AmLCqQqy' +
                          'czNoqJ2twskQRdVEAwBl2wUrqsKJyMRgkyCar7LIVHODsActC0mwH' +
                          'yDZbLbTIHtBAB9pC0kC33h5AbbTkIsvWEJukq+667Lbr7rvwxitvu' +
                          'o1Y5UkTmuSr77789uvvvwAHLLAmVgnkCRKYJKzwwgw37PDDEEcccc' +
                          'ETqVHJxRhnrPHGHHfs8ccck0HxUZ6YIcnJKKNMAw0pt+zyyzDHDDM' +
                          'jJp1E8kM456wzQycFBAA7" border="0" name="submit" ' +
                          'alt="PayPal - The safer, easier way to pay online!">' +
                          '<img border="0" src="data:image/gif;base64,R0lGODlhAQ' +
                          'ABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw%3D%3D" ' +
                          'width="1" height="1" alt="PayPal - LPuNKTKit">' +
                          '</form>');
         }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('showLinks [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// --------------------------------- funciones auxiliares ---------------------------------
/**
 * Convierte una cantidad de segundos en D, H, M y S
 */
function secondsToTime( secs )
{
  try {
         if (DEBUG_MODE > 1) GM_log('secondsToTime: ' + strPaginaActual);

         if (secs==1.7976931348623157E+10308) return LANG.MISC.txt_Infinito;
         else
         {
           if (secs <= 0) return "0s";

           var weeks = Math.floor(secs / (60 * 60 * 24 * 7));

           var divisor_for_days = secs % (60 * 60 * 24 * 7);
           var days  = Math.floor(divisor_for_days / (60 * 60 * 24));

           var divisor_for_hours = secs % (60 * 60 * 24);
           var hours = Math.floor(divisor_for_hours / (60 * 60));

           var divisor_for_minutes = secs % (60 * 60);
           var minutes = Math.floor(divisor_for_minutes / 60);

           var divisor_for_seconds = divisor_for_minutes % 60;
           var seconds = Math.ceil(divisor_for_seconds);

           resultado = "";
           if (weeks > 0) {
               resultado += weeks + "w ";
               if (days > 0) resultado += days + "d ";
               if (hours > 0) resultado += hours + "h ";

           } else if (days > 0) {
               resultado += days + "d ";
               if (hours > 0) resultado += hours + "h ";
               if (minutes > 0) resultado += minutes + "m ";

           } else if (hours > 0) {
               resultado += hours + "h ";
               if (minutes > 0) resultado += minutes + "m ";
               if (seconds > 0) resultado += seconds + "s";

           } else if (minutes > 0) {
               resultado += minutes + "m ";
               if (seconds > 0) resultado += seconds + "s";

           } else if (seconds > 0)
               resultado += seconds + "s";

           return resultado;
         }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('secondsToTime [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Convierte una cadena de texto de tipo: Xh Xm Xs en la cantidad
 * equivalente de segundos
 */
function timeToSeconds( time )
{
  try {
        if (DEBUG_MODE > 1) GM_log('timeToSeconds: ' + strPaginaActual);

        var seconds = 0;
        time = trim(time);
        parts = time.split(" ");

        for ( i = 0; i < parts.length; i++)
        {
          c = parts[i].charAt(parts[i].length-1);
          number = parseInt( parts[i].substring(0,parts[i].length-1), 10);

//          if ((i < (parts.length-1)) && (c == 's')) c = 'w';

          switch (c)
          {
            case 'w' : seconds += (number*60*60*24*7);
                       break;
            case 'd' : seconds += (number*60*60*24);
                       break;
            case 'h' : seconds += (number*60*60);
                       break;
            case 'm' : seconds += (number*60);
                       break;
            case 's' : seconds += number;
                       break;
          }

          if (DEBUG_MODE > 2) GM_log('timeToSeconds: [ ' + seconds + ' ] ' + strPaginaActual)
        }
        return seconds;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('timeToSeconds [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**
 * Traduce a castellano algunas palabras necesarias para el funcionamiento
 */
function traduce(palabra)
{
  try {
     if (DEBUG_MODE > 2) GM_log('traduce: ' + strPaginaActual);

     switch(palabra) {
            case LANG.SERVER.txt_RES_metal:       palabra = LANG_ES.SERVER.txt_RES_metal;
                                          break;

            case LANG.SERVER.txt_RES_cristal:     palabra = LANG_ES.SERVER.txt_RES_cristal;
                                          break;

            case LANG.SERVER.txt_RES_deuterio:    palabra = LANG_ES.SERVER.txt_RES_deuterio;
                                          break;

     }

     return palabra;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('traduce [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

/**************************************************************************
*                                       OTROS SCRIPTS                     *
**************************************************************************/

// name           OGame Redesign: Current Planet Name on Messages Pages
// description    Displays the current planet name on the Messages pages
// namespace      Vesselin
// version        1.01
function CurrentPlanetNameOnMessagesPages()
{
  try {
       if (! current_Planet_Name) return;

       if (DEBUG_MODE > 0) GM_log('CurrentPlanetNameOnMessagePages: ' + strPaginaActual);

       if ((document.location.href.indexOf ('/game/index.php?page=messages') <= -1) &&
           (document.location.href.indexOf ('/game/index.php?page=alliance') <= -1) &&
           (document.location.href.indexOf ('/game/index.php?page=network')  <= -1) &&
           (document.location.href.indexOf ('/game/index.php?page=premium')  <= -1) &&
           (document.location.href.indexOf ('/game/index.php?page=shop')     <= -1) &&
           (document.location.href.indexOf ("/game/index.php?page=traderOverview") <=-1))
           return;

       var metaTag = document.getElementsByName ("ogame-planet-name");
       var planetName = (metaTag && metaTag.length > 0) ?
                         metaTag [0].content :
                         document.getElementById ("selectedPlanetName").textContent;

       // The following "if" is not really necessary but with it this script
       // will work for Opera too
       if ((document.location.href.indexOf ('/game/index.php?page=messages') > -1) ||
           (document.location.href.indexOf ('/game/index.php?page=alliance') > -1) ||
           (document.location.href.indexOf ('/game/index.php?page=network')  > -1) ||
           (document.location.href.indexOf ('/game/index.php?page=premium') > -1) ||
           (document.location.href.indexOf ('/game/index.php?page=shop')  > -1))

           document.getElementById ("planet").getElementsByTagName ("h2")[0].innerHTML +=
                  ' - ' + document.getElementById ("selectedPlanetName").innerHTML;

       else if (document.location.href.indexOf ("/game/index.php?page=traderOverview") >= 0) {
            var myFunc = function ()
            {
                var myHeader = $ ("#header_text h2").text ();
                if (myHeader.indexOf (' - ' + planetName) < 0)
                    $ ("#header_text h2").text (myHeader + ' - ' + planetName);
            }

            $ (document).ready (function ()
            {
               if (unsafe.traderObj.traderId && (unsafe.traderObj.traderId.length > 0))
                   myFunc ();

               $ ("#planet .js_trader").bind ("click.selectTrader", function ()
               {
                  if (unsafe.traderObj.traderId && (unsafe.traderObj.traderId.length > 0))
                      myFunc ();
               });
            });

            $ ("#inhalt").ajaxSuccess (function (e, xhr, settings)
            {
               if (settings.url.indexOf ("page=traderOverview") < 0)
                   return;
               myFunc ();
            });
       }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('CurrentPlanetNameOnMessagePages [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Resources in Flight
// namespace      Vesselin
// version        1.26
function ResourcesInFlight() {
  try {
         if (strPaginaActual != "movement") return;

         if (! show_Fleet_Resources) return;

         if (DEBUG_MODE > 0) GM_log('ResourcesInFlight: ' + strPaginaActual);

         // Settings:
         var colors = [ color_Metal, color_Cristal, color_Deuterio, strColor_LPuNKTKit];
         const below = false; //true;

  const onlyToCurrent = true;
  const inEventList = true;
  const totalStr = "=";
  const titleImg = "data:image/jpg;base64," +
    "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcU" +
    "FhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgo" +
    "KCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUACEDASIA" +
    "AhEBAxEB/8QAGwABAAICAwAAAAAAAAAAAAAAAAYHAQMCBAX/xAArEAACAQMDBAAEBwAAAAAAAAAB" +
    "AgMEBREABhITFCExIjJBURUjQ2GBkbH/xAAXAQEBAQEAAAAAAAAAAAAAAAAEAQID/8QAHBEAAgMB" +
    "AAMAAAAAAAAAAAAAAAECESEDBDEz/9oADAMBAAIRAxEAPwCqdn2O3Wujo6++VUkNJJ1ahZOAJcom" +
    "FSJDjqNydcrkA5GcAEiW1N3tkMdVVDaVY0FOsTNUVFSIiQxAXlCqNwZh6Tnk5yCQDiIistW3rFHe" +
    "7DVyT3rqRU6sKZWiSPgS+RImesCvzYZQDgfc9QbxlrrLt22XLt56BblUVFQskIVmaRhyYsjcsYkc" +
    "jAXB9csDEnrosXhYN3uVooYY6u4We2NBUusa9O6ZKocHDII2OMBiWPHAP9+DSWK0Q3+ottYgldFZ" +
    "zJRTCeKJeR8lwuG4qPi458g41t2Durb9o2Xb/wAbpurcYamVYsOF/LR0eMOWGCOQdcZ+Vjrnddz2" +
    "2us9HbaG21EFPHCyCslgLMFWHpIxUsFduGR4IwzcvGPPGV00jcaUk6IX0E01p7j99NOwLpjay09O" +
    "7zyUVJVmCOQqlVEJFPj6g+/X8atnb+wNrVRSontAZOAVYO6nCI3EsXGJOWTkD3j4R49ktNC7tpYK" +
    "gvRK4np9u1NRWWa30VPWNH1u6aPqz5HL9ZyZDn65bz69eNUbfqqaZpTI5Leck+Sxx7P++Pvppq+O" +
    "2+VsxL6kZ6jaaaaSYo//2Q==";
  const closeImg = "data:image/gif;base64," +
    "R0lGODlhFwAWANUAABYaHgsNEAECAgwQEBUaHRYdHxASFREUFxUYHAoMDhIVFxIUFxETFw4QEhsf" +
    "IxgfIA4RExETFhwhJS2sQBofJAkKDBofIxwgJAkLDRgfIRofIi6xQRsgJRoeIhkdIQgKCxkeIQ8S" +
    "FA4RFBkfIAwPEwkLDBgeIAwODy6tQBASFhgdIBgdIQ8SFhccHw0QEi6vQQ8SFRoeIwwOEBsgJA4Q" +
    "Ew8RFA0PEQAAAQ0PEhsfJC2tQBwgJQAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAXABYAAAb/wIRC" +
    "sWAcDgxGJJJsKg7DYcAQMYRgBph2q2XBUobUclmriSDltHpdu8JCEAhtTq/b4yJRLe5q+BsugTiD" +
    "OH2BgXSAODaMhI6Pji6Mk5SMh5WVMpqbMjYyAwMboIyanpwBAScnmwGhGxsnqLKomgkVGBgluRgn" +
    "L76+FR/CHxXFAgI3ycoCEzrOOs3IysvHycfNz84vE8jSNwIECAQEAAQv2dkvKOMA7R8qLfEtKOfo" +
    "z74F8R77KisrHiZMPMgwMAPBESMeKAQBooOHGDE0SNQAsaJFiw4sOAAxw4FHBzlChqRAMkdJkTlm" +
    "dJjBcsaFCyhjomy5suWOmzh3cNjJISdOGAstZ/gcStSCBAkviSr9SeKohKVKJZAIAgA7";
  const openImg  = "data:image/gif;base64," +
    "R0lGODlhFwAWANUAABYaHgsNEAECAgwQEBUaHRYdHxASFREUFxUYHAoMDhIVFxIUFxETFw4QEhsf" +
    "IxgfIA4RExETFhwhJS2sQBofJAkKDBofIxwgJAkLDRgfIRofIi6xQRsgJRoeIhkdIQgKCxkeIQ8S" +
    "FA4RFBkfIAwPEwkLDBgeIAwODy6tQBASFhgdIBgdIQ8SFhccHw0QEi6vQQ8SFRoeIwwOEBsgJA4Q" +
    "Ew8RFA0PEQAAAQ0PEhsfJC2tQBwgJQAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAXABYAAAb/QJJk" +
    "Rywaj0SJkmRBOo+Xi7L5rM6uM+qRw+U4sbMONkcum8tRsPhMoeTabrNj7piBHBZHbM/v8zWAGnse" +
    "HSAgD4gjIw8ZjYwPJiYeKysqHpctLQUvLzqen58vKJmZKh8AqAQEKJ2goQQAqggEAje2tQITraAT" +
    "ArU3vr+2wwI6E7zCxAIVzB/OHxWc0icYJdUYGBUJMjIB3t8BJxvjAwHcMicn3ufcNu02AwMb8TLu" +
    "7O82+fr5Lv37//xwCBxIsCAOfThcNKDBsF+/Bi4IOmxAESIECDVEiLjIsKPHjzQuhoABI0SNkyhT" +
    "qoQg4mSElxFSGEgBgwXJmzcNlDQQwUAAEwVAFRxQwKBo0ZdFDxxgsABogiAAOw==";
  // Code:
  if (! (typeof PRO_setValue == "function") && (! this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString ().indexOf ("not supported") > -1)))
  {
    this.GM_getValue = function (key, def)
    {
      return localStorage.getItem (key) || def;
    }
    this.GM_setValue = function (key, value)
    {
      return localStorage.setItem (key, value);
    }
    this.GM_deleteValue = function (key)
    {
      return localStorage.removeItem (key);
    }
  }
  if (document.location.href.indexOf ('/game/index.php?page=movement') >= 0)
  {
    var expanded;
    if (typeof GM_setValue == "function") // greasemonkey
      expanded = GM_getValue ("expanded", false) == "true";
    else if (typeof PRO_setValue == "function") // ie7pro
      expanded = PRO_getValue ("expanded", false) == "true";
    else
      expanded = below;
    var div;
    var planetRes = [0, 0, 0];
    var curPlanet = "";
    var curPlanetCoords = "";
    function doTable ()
    {
      function createFontElement (text, color)
      {
        var myFont = document.createElement ("font");
        myFont.color = color;
        var myTextNode = document.createTextNode (text);
        myFont.appendChild (myTextNode);
        return myFont;
      }
      function createCell (row, text, width, alignment, color)
      {
        var myTd = row.insertCell (-1);
        myTd.style.width = width;
        myTd.style.paddingRight = "1em";
        myTd.style.paddingLeft  = "1em";
        myTd.setAttribute ("align", alignment);
        myTd.setAttribute ("nowrap", true);
        if (text.indexOf ("data:image") < 0)
          myTd.appendChild (createFontElement (text, color));
        else
        {
          var myImg = document.createElement ("img");
          myImg.setAttribute ("src", text);
          myTd.appendChild (myImg);
        }
      }
      function addEvent (el, evt, fxn)
      {
        if (el.addEventListener)
          el.addEventListener (evt, fxn, false); // for standards
        else if (el.attachEvent)
          el.attachEvent ("on" + evt, fxn); // for IE
        else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
      }
      var mya;
      var span = document.createElement ("span");
      span.className = "current";

      if ((mya != null) && (mya.onclick != null))
        mya.removeEventListenet ("click", redrawTable, false);

      var mySpan = document.createElement ("span");
      mya = document.createElement ("a");
      mya.setAttribute ("href", "javascript:void(0)");
      var myImg = document.createElement ("img");
      myImg.style.position = "absolute";
      mya.appendChild (myImg);
      mySpan.appendChild (mya);

      if (expanded)
      {
        planetRes [0] = parseInt (document.getElementById ("resources_metal").innerHTML.replace (/\D+/gi, ""));
        planetRes [1] = parseInt (document.getElementById ("resources_crystal").innerHTML.replace (/\D+/gi, ""));
        planetRes [2] = parseInt (document.getElementById ("resources_deuterium").innerHTML.replace (/\D+/gi, ""));
        resInfo [curPlanet] [3] = 0;
        for (var i = 0; i < 3; i++)
        {
          resInfo [curPlanet] [i] = ((onlyToCurrent) ? toPlanet [i] : resInfo [totalStr] [i]) + planetRes [i];
          resInfo [curPlanet] [3] += resInfo [curPlanet] [i];
        }
        var myTable = document.createElement ("table");
        myTable.setAttribute ("border", "2");
        myTable.setAttribute ("bordercolor", "yellow");
        myTable.setAttribute ("rules", "all");
        myTable.setAttribute ("width", "100%");
        var myTr = myTable.insertRow (-1);
        createCell (myTr, titleImg, "24%", "center", colors [3]);
        for (var i = 0; i < 3; i++)
          createCell (myTr, rstrings [i], "19%", "center", colors [i]);
        createCell (myTr, totalStr, "19%", "center", colors [3]);
        myImg.style.left = "96%";
        myImg.style.top = "0%";
        myImg.setAttribute ("src", closeImg);
        myTr.lastChild.setAttribute ("height", "23");
        myTr.lastChild.appendChild (mySpan);
        for (var resIndex in resInfo)
          if (resInfo [resIndex] [3] > 0)
          {
            myTr = myTable.insertRow (-1);
            myText = resIndex;
            if ((resIndex != curPlanet) && (resIndex != totalStr))
              myText += ' (' + addDots (resInfo [resIndex] [4]) + ')';
            createCell (myTr, myText, "24%", "center", (resIndex != totalStr) ? "silver" : colors [3]);
            for (var i = 0; i < 3; i++)
              createCell (myTr, addDots (resInfo [resIndex] [i]), "19%", "right", "silver");
            createCell (myTr, addDots (resInfo [resIndex] [3]), "19%", "right", "silver");
          }
        span.appendChild (myTable);
      }
      else
      {
        span.style.marginLeft = "6px";
        span.style.color = "silver";
        var myImg2 = document.createElement ("img");
        myImg2.setAttribute ("src", titleImg);
        myImg2.style.verticalAlign = "middle";
        span.appendChild (myImg2);
        span.appendChild (createFontElement (": ", colors [3]));
        span.appendChild (createFontElement (rstrings [0], colors [0]));
        span.appendChild (document.createTextNode (" " + addDots (resInfo [totalStr] [0])));
        span.appendChild (document.createTextNode (", "));
        span.appendChild (createFontElement (rstrings [1], colors [1]));
        span.appendChild (document.createTextNode (" " + addDots (resInfo [totalStr] [1])));
        span.appendChild (document.createTextNode (", "));
        span.appendChild (createFontElement (rstrings [2], colors [2]));
        span.appendChild (document.createTextNode (" " + addDots (resInfo [totalStr] [2])));
        span.appendChild (document.createTextNode ("."));
        mySpan.style.cssFloat = "right";
        mySpan.style.styleFloat = "right";
        mySpan.style.marginRight = "28px";
        myImg.style.bottom = "0%";
        myImg.setAttribute ("src", openImg);
        span.appendChild (mySpan);
      }

      div.appendChild (span);

      if (below) {
        document.getElementById ("inhalt").appendChild (div)
      }
      else
      {
        var fleetDetails = document.querySelectorAll (".fleetDetails");
        fleetDetails [0].parentNode.insertBefore (div, fleetDetails [0]);
      }
      addEvent (mya, "click", redrawTable);
    }
    function redrawTable ()
    {
      while (div.hasChildNodes ())
        div.removeChild (div.firstChild);
      div.parentNode.removeChild (div);
      expanded = ! expanded;
      if (typeof GM_setValue == "function") // greasemonkey
        GM_setValue ("expanded", (expanded) ? "true" : "false");
      else if (typeof PRO_setValue == "function") // ie7pro
        PRO_setValue ("expanded", (expanded) ? "true" : "false");
      doTable ();
    }
    function getResName (resName)
    {
      var strReturn;

      var title = document.getElementById (resName + "_box").title;
      if (title.indexOf ("|") >= 0)
        strReturn = (title.substring (0, title.indexOf ("|")).replace (/<[^>]+>/g, ""))
      else
        strReturn = (title.split (/[<>]/) [2]);

      return strReturn;
    }
    if (document.getElementById ("lpk_resourcesInFlight") != null)
      return;
    var resInfo = new Object;
    var directions = new Array ();
    var flightTypes = new Array ();
    var destinations = new Array ();
    var destinationNames = new Array ();
    var origins = new Array ();
    var originNames = new Array ();
    var myRes = new Array (0, 0, 0);
    var allFlights = document.querySelectorAll (".mission");
    for (var i = 0; i < allFlights.length; i++)
    {
      flightTypes [i] = allFlights [i].innerHTML;
      var matches = flightTypes [i].match (/\(.+\)/);
      if (matches != null)
      {
        flightTypes [i] = flightTypes [i].replace (matches [0], "");
        directions [i] = "<";
      }
    }
    allFlights = document.querySelectorAll ("div.route a");
    for (var i = 0; i < allFlights.length; i++)
      directions [i] = ((allFlights [i].className.indexOf ("reverse") < 0) || (allFlights [i].className.indexOf ("fleet_icon_forward") >= 0)) ? ">" : "<";
    allFlights = document.querySelectorAll (".originCoords");
    for (var i = 0; i < allFlights.length; i++)
    {
      origins [i] = allFlights [i].firstChild.innerHTML;
      var mySpans = allFlights [i].parentNode.getElementsByTagName ("span");
      if (mySpans.length < 1)
        originNames [i] = "";
      else
      {
        var mySpan = mySpans [mySpans.length - 1];
        originNames [i] = (mySpan.title == "") ? mySpan.textContent.replace (/^\s+|\s+$/g, "") : mySpan.title.substring (mySpan.title.indexOf ("|") + 1);
      }
      if (typeof (directions [i]) == "undefined")
        directions [i] = ">";
    }
    allFlights = document.querySelectorAll (".destinationCoords");
    for (var i = 0; i < allFlights.length; i++)
      if (directions [i] == "<")
      {
        destinations [i] =  origins [i];
        destinationNames [i] = ((onlyToCurrent) ? "=>" : "+") + originNames [i];
      }
      else
      {
        destinations [i] =  allFlights [i].firstChild.innerHTML;
        var mySpans = allFlights [i].parentNode.getElementsByTagName ("span");
        if (mySpans.length < 2)
          destinationNames [i] = ""
        else
        {
          var mySpan = mySpans [mySpans.length - 2];
          destinationNames [i] = ((onlyToCurrent) ? "=>" : "+") + ((mySpan.title == "") ? mySpan.textContent.replace (/^\s+|\s+$/g, "") : mySpan.title.substring (mySpan.title.indexOf ("|") + 1));
        }
      }
    var flightCargo = new Object;
    allFlights = document.querySelectorAll (".fleetinfo");
    if (allFlights.length > 0)
    {
      for (var i = 0; i < allFlights.length; i++)
      {
        var trs = allFlights [i].getElementsByTagName ("tr");
        var any = false;
        var shipInfos = trs.length;
        if (trs [shipInfos - 1].id == "freeSpace")
          shipInfos--;
        for (var j = 0; j < 3; j++)
        {
          myRes [j] = parseInt (trs [shipInfos - 3 + j].getElementsByTagName ("td") [1].innerHTML.replace (/\D+/gi, ""));
          if (myRes [j] > 0)
            any = true;
        }
        flightCargo [i] = new Array (myRes [0], myRes [1], myRes [2]);
        var type = directions [i] + flightTypes [i];
        if (resInfo [type])
        {
          for (var j = 0; j < 3; j++)
            resInfo [type] [j] += myRes [j];
          if (any)
            resInfo [type] [4] += 1;
        }
        else
          resInfo [type] = new Array (myRes [0], myRes [1], myRes [2], 0, (any) ? 1 : 0);
      }
    }
    else
    {
      allFlights = document.querySelectorAll (".anti_fleetDetails");
      for (var i = 0; i < allFlights.length; i++)
      {
        var trs = allFlights [i].textContent.split (/\n/);
        var any = false;
        var shipInfos = trs.length;
        if (trs [shipInfos - 1].id == "freeSpace")
          shipInfos--;
        for (var j = 0; j < 3; j++)
        {
          myRes [j] = parseInt (trs [shipInfos - 3 + j].replace (/\D+/gi, ""));
          if (myRes [j] > 0)
            any = true;
        }
        flightCargo [i] = new Array (myRes [0], myRes [1], myRes [2]);
        var type = directions [i] + flightTypes [i];
        if (resInfo [type])
        {
          for (var j = 0; j < 3; j++)
            resInfo [type] [j] += myRes [j];
          if (any)
            resInfo [type] [4] += 1;
        }
        else
          resInfo [type] = new Array (myRes [0], myRes [1], myRes [2], 0, (any) ? 1 : 0);
      }
    }
    var rstrings = ["", "", ""];
    rstrings [0] = LANG.SERVER.txt_RES_metal;// getResName ("metal");
    rstrings [1] = LANG.SERVER.txt_RES_cristal;//getResName ("crystal");
    rstrings [2] = LANG.SERVER.txt_RES_deuterio;//getResName ("deuterium");

    var metaTag = document.getElementsByName ("ogame-planet-name");
    var curPlanetName = (metaTag && metaTag.length > 0) ? metaTag [0].content : document.getElementById ("selectedPlanetName").textContent;

    curPlanet = ((onlyToCurrent) ? "=>" : "+") + curPlanetName;
    allFlights = document.querySelectorAll (".planet-koords");
    if (allFlights.length == 1)
      curPlanetCoords = allFlights [0].innerHTML;
    else
    {
      for (var i = 0; i < allFlights.length; i++)
        if ((allFlights [i].parentNode.className.indexOf (" active ") >= 0) ||
            (allFlights [i].className.indexOf ("_active") >= 0))
        {
          curPlanetCoords = allFlights [i].innerHTML;
          break;
        }
    }
    resInfo [totalStr]  = new Array (0, 0, 0, 0, 0);
    resInfo [curPlanet] = new Array (0, 0, 0, 0, 0);
    toPlanet = new Array (0, 0, 0);
    for (var i = 0; i < destinations.length; i++)
      if ((destinations [i] == curPlanetCoords) && (destinationNames [i] == curPlanet))
        for (var j = 0; j < 3; j++)
          toPlanet [j] += flightCargo [i] [j];
    planetRes [0] = parseInt (document.getElementById ("resources_metal").innerHTML.replace (/\D+/gi, ""));
    planetRes [1] = parseInt (document.getElementById ("resources_crystal").innerHTML.replace (/\D+/gi, ""));
    planetRes [2] = parseInt (document.getElementById ("resources_deuterium").innerHTML.replace (/\D+/gi, ""));
    for (var resIndex in resInfo)
      resInfo [resIndex] [3] = 0;
    for (var resIndex in resInfo)
      for (var i = 0; i < 3; i++)
      {
        if (resIndex == curPlanet)
          resInfo [curPlanet] [i] = ((onlyToCurrent) ? toPlanet [i] : resInfo [totalStr] [i]) + planetRes [i];
        else if (resIndex != totalStr)
          resInfo [totalStr] [i] += resInfo [resIndex] [i];
        resInfo [resIndex] [3] += resInfo [resIndex] [i];
      }

    if (resInfo [totalStr] [3] > 0)
    {
      div = document.createElement ("div");
      div.setAttribute ("id", "lpk_resourcesInFlight");
      div.className = "fleetDetails detailsOpened";
      div.style.height = "auto";
      div.style.fontWeight = "bold";
      div.style.lineHeight = "18px";

      doTable ();
    }
  }



   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ResourcesInFlight [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Show IPM and Phalanx Range
// description
// namespace      Vesselin
// version        1.01
function ShowIPMandPhalanxRange() {
  try {
       if (DEBUG_MODE > 0) GM_log('ShowIPMandPhalanxRange: ' + strPaginaActual);

       // The following "if" is not really necessary but with it this script
       // will work for Opera too
       if ((strPaginaActual != 'station') &&
           (strPaginaActual != 'defense'))
           return;

       if (! show_Range) return;

       function setShowRange ()
       {
            if (DEBUG_MODE > 2) GM_log('ShowIPMandPhalanxRange >> setShowRange: ' + strPaginaActual);

            var theSpan = document.getElementsByClassName ("solarSatEnergyInfo");
            if ((theSpan == null) || (theSpan.length < 1))
              return;

            if (theSpan [0].textContent.indexOf ("(") > -1) {

               if (DEBUG_MODE > 2)
                    GM_log('ShowIPMandPhalanxRange >> setShowRange >> ' +
                            theSpan [0].textContent + ': ' + strPaginaActual);

                theSpan[0].innerHTML= theSpan [0].textContent.substring(0,theSpan [0].textContent.indexOf ("(")-1);
            }

            var coverage = parseInt (theSpan [0].textContent.match (/\d+/) [0]);
            var activeA = document.getElementsByClassName ("planetlink active");

            if (activeA.length == 0)
              activeA = document.getElementsByClassName ("planetlink");

            if (activeA.length < 1)
              return;

            var activeSpans = activeA [0].getElementsByTagName ("span");

            if (activeSpans.length < 2)
              return;

            var coords;

            if (activeSpans [1].textContent.indexOf(':') >= 0)
                coords = activeSpans [1].textContent.split (/[\[:]/)
            else
                coords = activeSpans [2].textContent.split (/[\[:]/);

            var galaxy = parseInt (coords [1]);
            var system = parseInt (coords [2]);

            var system1 = system - coverage;
            var system2 = system + coverage;

            if (strPaginaActual == 'station')
            {
              system1++;
              system2--;
            }

            if (system1 < 1)
              system1 = 1;

            if (system2 > 499)
              system2 = 499;

            var range = '<span class=\"lpunktkit_range\" style=\"color:' +
                        strColor_LPuNKTKit + ';\">';

                range += ' (' + galaxy + ':' + system1 + ' - ' + galaxy + ':' + system2 + ')';

                range += '</span>';

            theSpan [0].innerHTML += range;

       }

       if ( ( strPaginaActual == 'defense' ) &&
            ( ! EsPlaneta() ) )
          return;

       setInterval (setShowRange, 500);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ShowIPMandPhalanxRange [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Disable Useless Stuff
// namespace      Vesselin
// version        1.03
function DisableUselessStuff () {
  try {
      if (DEBUG_MODE > 0) GM_log('DisableUselessStuff: ' + strPaginaActual);

      if (! disable_Useless_Stuff) return;

      var theUrl = document.location.href
      var unsafe = window;
      var myA, previousA, mySpans;

      try
      {
         unsafe = unsafeWindow
      }
      catch (e)
      {
      }

      if (! EsPlaneta())
      {
          if (theUrl.indexOf ("/game/index.php?page=resources") >= 0)
          {
              for (var i = 6; i <= 9; i++)
              {
                   var myLi = document.getElementById ("button" + i);
                       myLi.className = "off";
                   var myAs = myLi.getElementsByTagName ("a");

                   for (var j = 0; j < myAs.length; j++)
                   {
                        myA = myAs [j];
                        if (myA.className.indexOf ("fastBuild") >= 0)
                        {
                            myA.style.display = "none";
                            break;
                        }
                   }

              }
          }
          else if (theUrl.indexOf ("page=shipyard") >= 0)
               document.getElementById ("civil").children [5].className = "off";
      else if ((theUrl.indexOf ("page=station") >= 0) &&
               (theUrl.indexOf ("openJumpgate=1") < 0))
      {
               myA = document.getElementById ("details43");

               if (myA == null)
                   return;

               mySpans = myA.getElementsByTagName ("span");

               for (var i = 0; i < mySpans.length; i++)
                    if ((mySpans [i].className == "textlabel") &&
                       (parseInt (mySpans [i].nextSibling.textContent) >= 1))
                    {
                       myA.parentNode.parentNode.parentNode.className = "off";
                       previousA = myA.previousElementSibling;

                       if (previousA && (previousA.className.indexOf ("fastBuild") >= 0))
                           previousA.style.display = "none";

                       break;
                    }
               }
      }
      else if (theUrl.indexOf ('/game/index.php?page=research') >= 0)
      {
           var limits = [["120", 12], /*["121", 5],*/ ["114", 8], /*["122", 7],*/ ["199", 1]];

           for (var i = 0; i < limits.length; i++)
           {
                myA = document.getElementById ("details" + limits [i] [0]);

                if (myA == null)
                    continue;

                mySpans = myA.getElementsByTagName ("span");

                for (var j = 0; j < mySpans.length; j++)

                     if ((mySpans [j].className == "textlabel") &&
                         (parseInt (mySpans [j].nextSibling.textContent) >= limits [i] [1]))
                     {
                         myA.parentNode.parentNode.parentNode.className = "off";
                         previousA = myA.previousElementSibling;

                         if (previousA && (previousA.className.indexOf ("fastBuild") >= 0))
                             previousA.style.display = "none";

                         break;
                     }
           }
      }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('DisableUselessStuff [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Fix the Action Icons
// description    Prevents the shifting of the action icons if no spy icon
//                available and removes the IPM and spy icons and menus
//                if not applicable
// namespace      Vesselin
// version        1.17
function FixActionIcons()
{
  try {
        // The following "if" is not really necessary but with it this script will work for Opera too
        if (document.location.href.indexOf ("/game/index.php?page=galaxy") == -1)
          return;

        if (! set_Fix_Action_Icons) return;

        if (DEBUG_MODE > 0) GM_log('FixActionIcons: ' + strPaginaActual);

        var myFunc = (function ()
        {
            // Check OGame version (must be >= 5):
            var version = $ ("meta[name='ogame-version']");
            if (version.length == 0)
                return;

            version = version.attr ("content");
            if (version === undefined)
                return;

            var versionMajor = version.split (".");
            if (versionMajor.length < 1)
                return;

            versionMajor = parseInt (versionMajor [0], 10);
            if (versionMajor < 5)
                return;

            // Compute the planet relocation price:
            var planetRelocationPrice = 240000;

            // Make the unread messages icon visible:
            var envelope = $ ("#message_alert_box");
            if (envelope.length == 0)
                envelope = $ ("#message_alert_box_default");

            envelope.css ({
                     "position" : "absolute",
                     "left" : "2px",
                     "top" : "-60px"
            });

            $ ("#inhalt").append (envelope);

            // Make the attack sign visible:
            var attackSign = $ ("#attack_alert");

            attackSign.css ({
                       "position" : "absolute",
                       "left" : "600px",
                       "top" : "0px"
            });

            $ ("#inhalt").append (attackSign);

            // Wait until the Galaxy page is fully loaded:
            $ (document).ajaxSuccess (function (e, xhr, settings)
            //$ ("#galaxyContent").ajaxSuccess (function (e, xhr, settings)
            {
               // Fix the class of the flight slots the moment they are filled:
               if (settings.url.indexOf ("page=minifleet") >= 0)
               {
                   /(\d+)\/(\d+)/.exec ($ ("#slotValue").text ());

                   if (parseInt (RegExp.$1) == parseInt (RegExp.$2))
                       $ ("#slotValue").addClass ("overmark")
                   else
                       $ ("#slotValue").removeClass ("overmark");

                   return;
               }

               if (settings.url.indexOf ("page=fetchResources") >= 0)
               {
                   // Make the planet relocation icons inactive and change their tooltips, if there isn't enough DM:
                   eval ("var res = " + xhr.responseText);

                   var darkMatter = res ["darkmatter"] ["resources"] ["actual"];
                   var darkMatterName = res ["darkmatter"] ["string"].
                       replace (res ["darkmatter"] ["resources"] ["actualFormat"] + " ", "");

                   if (darkMatter < planetRelocationPrice)
                   {
                       $ (".planetMoveIcons.planetMoveDefault.tooltip").each (function ()
                       {
                          $ (this)
                             .removeAttr ("onclick")
                             .removeClass ("planetMoveDefault")
                             .addClass ("planetMoveInactive")
                             .attr ("href", document.location.href.replace ("galaxy", "premium") + "&openDetail=1");
                             changeTooltip (this, darkMatterName + " < " + number_format (planetRelocationPrice));
                          });
                       }

                       return;
                   }

                   // Check if the Galaxy page has been loaded:
                   if ((settings.url.indexOf ("page=galaxyContent") < 0) || ($ ("#fleetstatus").length == 0))
                        return;

                   $ ("tr.row").each (function ()
                   {
                      // Get the coordinates of the position (must be done first):
                      var coords = $ (this).find ("span#pos-planet");
                      if (coords.length == 0)
                          return;

                      coords = coords.text ().split (/[\[:\]]/);
                      if (coords.length == 0)
                          return;

                      // Replace the "ghostly" moon picture (if any) with a proper one:
                      var moonPic = $ (this).find ("td.moon a img");
                      if (moonPic.length)
                      {
                          var moonImage = $ (this).find ("td.moon ul.ListImage img");
                          moonPic.attr ("src", (moonImage.length) ?
                                        moonImage.attr ("src") :
                                        "/cdn/img/planets/moon_" + ((parseInt (coords [2], 10) +
                                          parseInt (coords [3], 10)) % 5 + 1).toString () + "_3.gif");
                      }

                      // Add the missing espionage icon or empty space, whichever is appropriate:
                      var firstA = $ (this).find ("td.action a:first");
                      if (firstA.length)
                      {
                          var href = firstA.attr ("href");

                          if ((href != null) && (href.length > 0) && (firstA.find ("span.icon_eye").length == 0))
                               firstA.before (
                                      ($ (this).find ("td.playername").is (".vacation,.noob")) ?
                                      '<a></a>' :
                                      '<a href="javascript:void(0);" onclick="sendShips (6, ' +
                                      coords [1] + ", " + coords [2] + ", " + coords [3] + ', 1); return false;">' +
                                      '<img width="16" height="16" src="data:image/gif;base64,R0lGODlhEAAQAJEDAP/' +
                                      '//1x2i2+JnQAAACH5BAEAAAMALAAAAAAQABAAAAIrXI6Zpu0P4wMUyFohxs4G+h1eIAhAaVboi' +
                                      'Zor67YlvMrtRtv6zvf84EMNCgA7"></a>'
                               );
                      }
                   }
               );
            });
        }).toString ();

        var script = document.createElement ("script");
            script.setAttribute ("type", "application/javascript");
            script.textContent = "(" + myFunc + ") ();";

        document.body.appendChild (script);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('FixActionIcons [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Reply to Circular Messages
// description    Allows the player to reply directly to circular messages.
// namespace      Vesselin
// author         Vesselin Bontchev
// version        1.03
function ReplyCircularMessages ()
{
  try {
       if (DEBUG_MODE > 0) GM_log('ReplyCircularMessages: ' + strPaginaActual);

       if (! reply_CC) return;

       // The following "if" is not really necessary but with it this script
       // will work for Opera too
       if (document.location.href.indexOf ("/game/index.php?page=showmessage") == -1)
         return;

       var wrapperDiv = document.getElementById ("wrapper");

       if (wrapperDiv == null)
       {
         wrapperDiv = document.getElementById ("messagebox");
         if (wrapperDiv == null)
           return;
       }

       var theDivs = wrapperDiv.getElementsByTagName ("div");

       if (theDivs.length < 5)
         return;

       var infoHeadDiv = theDivs [1];
       var showMsgNaviDiv = theDivs [2];
       var theLis = showMsgNaviDiv.getElementsByTagName ("a");

       for (var i = 0; i < theLis.length; i++)
         if (theLis [i].className.indexOf ("answerHeadline") > -1)
           return;

       var textWrapperDiv = theDivs [4];
       var theTable = infoHeadDiv.getElementsByTagName ("table");

       if (theTable.length < 1)
         return;

       if (theTable [0].rows [0].cells [1].textContent.trim ().indexOf("[") == -1)
         return;

       var subject = theTable [0].rows [2].cells [1].textContent.trim ();

       textWrapperDiv.className = "textWrapperSmall";

       var newDiv = document.createElement ("div");

       newDiv.innerHTML =
         '<div id="answerForm" class="textWrapperSmall">' +
           '<form target="_parent" method="post" action="index.php?page=' +
           'networkkommunikation' +
           ( (parseInt(getVersionOgame()[0])==3) ? '' : '&' + getSession() ) +
           '&empfaenger=0" name="asdf">' +
             '<input type="hidden" name="empfaenger" value="0" />' +
             '<div class="answerText">' +
               '<textarea tabindex="3" name="text" class="mailnew" ' +
               'onkeyup="javascript:cntchar(2000)""></textarea>' +
               '<input type="hidden" name="betreff" value="RE:' + subject + '" />' +
             '</div>' +
                '<div class="answerText" stype="padding-left: 0;>' +
               '<div class="fleft count textBeefy">(<span id="cntChars">0</span>' +
               ' / 2000)</div>' +
               '<div class="fleft buttonbox">' +
                 '<input tabindex="4" name="submitMail" type="submit" ' +
                 'class="button188" value="' + LANG.MISC.txt_enviar + '" />' +
               '</div>' +
               '<br class="clearfloat" />' +
             '</div>' +
           '</form>' +
         '</div>';
       wrapperDiv.appendChild (newDiv);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ReplyCircularMessages [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Keyboard Shortcuts
// description    Assigns keyboard shortcuts to various game functions
// namespace      Vesselin
// version        1.27
// author         Vesselin Bontchev
function ShortcutKeys()
{
  try {
        if (DEBUG_MODE > 0) GM_log('ShortcutKeys: ' + strPaginaActual);

        if (! show_Shortcuts) return;

           var theHref = document.location.href;

           // The following "if" is not really necessary but with it this script
           // will work for Opera too
           if ((theHref.indexOf ("/game/index.php?page=")             <  0) ||
               (theHref.indexOf ("/game/index.php?page=notices")      > -1) ||
               (theHref.indexOf ("/game/index.php?page=combatreport") > -1))
             return;

           var unsafe = window;

           try
           {
             unsafe = unsafeWindow
           }
           catch (e)
           {
           }

           var $ = unsafe.$;

           if (! $)
             return;

           function badTarget (e)
           {
             if (DEBUG_MODE > 1) GM_log('ShortcutKeys >> badTarget: ' + strPaginaActual);

             var targ;
             if (! e)
               var e = window.event;

             if (e.target)
               targ = e.target;
             else if (e.srcElement)
               targ = e.srcElement;

             if (targ.nodeType == 3) // defeat Safari bug
               targ = targ.parentNode;

             if ((targ.nodeName == "INPUT") || (targ.nodeName == "TEXTAREA"))
               return true;

             return false;
           }

           function simulateMouseClick (selector)
           {
               if (DEBUG_MODE > 1) GM_log('ShortcutKeys >> simulateMouseClick: ' + strPaginaActual);
               function eventFire (el, etype)
               {
                    if (el.fireEvent)
                    {
                        el.fireEvent ('on' + etype);
                        el [etype] ();
                    }
                    else
                    {
                        var evObj = document.createEvent ('Events');
                            evObj.initEvent (etype, true, false);
                        el.dispatchEvent (evObj);
                    }
               }

               for (var i = 0; i < selector.length; i++)
                    eventFire (selector [i], "click");
           }

           function topWindow ()
           {
               var windowIndex = -1;
               var maxZIndex = 0;

               $ ("div.ui-dialog").each (function (index)
               {
                  var zIndex = parseInt ($ (this).css ("z-index"));

                  if (zIndex > maxZIndex)
                  {
                      maxZIndex = zIndex;
                      windowIndex = index;
                  }
               });

               return (windowIndex < 0) ? null : $ ("div.ui-dialog").eq (windowIndex);
           }

           var oldVersion = checkVersionOgame();

           if (oldVersion)
           {
             rewind      = "rewind.gif";
             fastforward = "fastforward.gif";
             skip        = "skip.gif";
             skipback    = "skip-back.gif";
           }
           else
           {
             rewind      = "3488b556496631d9eec3ce15b768f9.gif";
             fastforward = "dcebd689a4e760f779a1a1b1ab0584.gif";
             skip        = "a6c5c6838009102254ec50807be663.gif";
             skipback    = "c1246af2584e9696edd7111a0d9418.gif";
           }


           if ((theHref.indexOf ("/game/index.php?page=showmessage") >= 0) &&
               (show_Key_Mailbox))
           {
             $ (document).ready (function ()
             {
               setTimeout (function ()
               {
                 $ ("#2,#4").focus ();
                 $ ("#2,#4").blur ();
                 $ (document).keydown (function (e)
                 {
                   if (badTarget (e))
                     return;
                   switch (e.keyCode)
                   {
                     case 27:  // Esc
                          simulateMouseClick ($ (".closeTB"));
                          var sl = window.parent.document.documentElement.scrollLeft;
                          var st = window.parent.document.documentElement.scrollTop;
                          $ ("a:visible:first", window.parent.document).focus ();
                          window.parent.scrollTo (sl, st);
                          return false;
                          break;

                     case 37:  // <-
                          if ($ ("#contentPageNavi").find ("img").eq (1).attr ("src").indexOf (rewind) > -1)
                             window.location = $ ("#contentPageNavi").find ("a:nth-child(2)").attr ("href");
                          return false;
                          break;

                     case 39:  // ->
                          if ($ ("#contentPageNavi").find ("img").eq (2).attr ("src").indexOf (fastforward) > -1)
                             window.location = $ ("#contentPageNavi").find ("a:nth-child(5)").attr ("href");
                          return false;
                          break;

                     case 46:  // Del
                          if ($ ("#2").length > 0)
                              simulateMouseClick ($ ("#2"));
                          else
                              simulateMouseClick ($ ("#4"));
                          return false;
                          break;
                   }
                 });
               }, 200);
             });
             return;
           }
           else if ((theHref.indexOf ("page=jumpgatelayer") > -1) &&
                    (show_Key_Everywhere))
           {
             $ (document).ready (function ()
             {
               setTimeout (function ()
               {
                 $ ("div#jumpgate a").eq (0).focus ();
                 $ ("div#jumpgate a").eq (0).blur ();
                 $ (document).keydown (function (e)
                 {
                   switch (e.keyCode)
                   {
                     case 65:  // "a"
                          if (e.ctrlKey || e.altKey || e.metaKey)
                              break;

                          if (e.shiftKey)
                              simulateMouseClick ($ ("#sendmost"))
                          else
                              simulateMouseClick ($ ("#sendall"));

                          return false;
                          break;

                     case 78:  // "n"
                          if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)
                              break;
                          simulateMouseClick ($ ("span.send_none a"));
                          return false;
                          break;

                     case 27:  // Esc
                          simulateMouseClick ($ ("a.close_details"));
                          var sl = window.parent.document.documentElement.scrollLeft;
                          var st = window.parent.document.documentElement.scrollTop;
                          $ ("a:visible:first", window.parent.document).focus ();
                          window.parent.scrollTo (sl, st);
                          return false;
                          break;
                   }
                 });
               }, 200);
             });
             return;
           }
           else if (theHref.indexOf ("page=phalanx") >= 0)
           {
                $ (document).ready (function ()
                {
                   setTimeout (function ()
                   {
                         $ ("div#phalanxWrap a,close_details").eq (0).focus ();
                         $ ("div#phalanxWrap a,close_details").eq (0).blur ();
                         $ (document).keydown (function (e)
                         {
                            switch (e.keyCode)
                            {
                                    case 27:  // Esc
                                         simulateMouseClick ($ ("a.close_details"));
                                         var sl = window.parent.document.documentElement.scrollLeft;
                                         var st = window.parent.document.documentElement.scrollTop;
                                         $ ("a:visible:first", window.parent.document).focus ();
                                         window.parent.scrollTo (sl, st);
                                         return false;
                                         break;
                            }
                         });
                   }, 200);
                });

                return;
           }

           $ (document).keydown (function (e)
           {
             if (($ ("div").is ("#anti_options_window")) ||
                  ($ ("div").is ("#lpunktkit-overlay")) ||
                 (($ ("div").is ("#TB_window") ||
                   $ ("div").is ("#mo_inputs") ||
                   $ ("div").is (".answerForm") ||
                   $ ("form").is ("#searchForm") ||
                   $ ("form").is ("#planetMaintenance") ||
                   $ ("div").is ("#buddyRequest") ||
                   $ ("div").is (".buddyRequest") ||
                   $ ("body").is ("#writemessage") ||
                   $ ("div").is (".note") ||
                   $ ("div").is (".col") ||
                   $ ("table").is (".createnote") ||
                   $ ("body").is ("#search") ||
                   $ ("body").is ("#showmessage") ||
                  ($ ("div").is ("#VLN_addevent") && ($ ("#VLN_addevent").css ("display") != "none")) ||
                  ($ ("#anti_win").css ("display") == "block") ||
                  (theHref.indexOf ("infocompte=scriptOptions") >= 0) ||
                  (theHref.indexOf ("/game/index.php?page=alliance") >= 0) ||
                  (theHref.indexOf ("/game/index.php?page=networkkommunikation") >= 0) ||
                  (theHref.indexOf ("/game/index.php?page=preferences") >= 0)) && badTarget (e))) {

                  if ($ ("div").is ("#lpunktkit-overlay")) {
                      $ (document).ready (function ()
                      {
                         setTimeout (function ()
                         {
                            $ (document).keydown (function (e)
                            {
                               switch (e.keyCode)
                               {
                                    case 27:  // Esc
                                         hideOptions();
                                         var sl = window.parent.document.documentElement.scrollLeft;
                                         var st = window.parent.document.documentElement.scrollTop;
                                         $ ("a:visible:first", window.parent.document).focus ();
                                         window.parent.scrollTo (sl, st);
                                         return false;
                                         break;
                               }
                            });
                         }, 200);
                      });
                  }

                  return;
             }

             switch (e.keyCode)
             {
               case 8:    // Backspace
                    if (e.ctrlKey || e.altKey || e.metaKey)
                       break;
                    if (e.shiftKey &&
                       ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) ||
                       (theHref.indexOf ("/game/index.php?page=fleet3") > -1)) &&
                       (show_Key_Fleet))
                    {
                       simulateMouseClick ($ ("#back"));
                       return false;
                    }
                    break;

               case 13:  // Enter
                    if (e.ctrlKey || e.altKey || e.metaKey)
                        break;

                    if ((theHref.indexOf ("/game/index.php?page=traderOverview") >= 0) &&
                        (show_Key_Trader))
                    {
                        if (($ ("#div_traderAuctioneer").length > 0) &&
                            ($ ("#div_traderAuctioneer").css ("display") != "none"))
                        {
                            simulateMouseClick ($ ("#div_traderAuctioneer .pay"));
                            return false;
                        }
                        else if (($ ("#div_traderImportExport").length > 0) &&
                                 ($ ("#div_traderImportExport").css ("display") != "none"))
                        {
                             if ($ ("#div_traderImportExport div.bargain_overlay").css ("display") != "none")
                                 simulateMouseClick ($ ("#div_traderImportExport .take"))
                             else
                                 simulateMouseClick ($ ("#div_traderImportExport .pay"));
                             return false;
                        }
                    }
                    break;

               case 27:  // Esc
                    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)
                        break;

                    if ((theHref.indexOf ("/game/index.php?page=fleet1") >= 0) &&
                        (show_Key_Fleet))
                    {
                        if ($ ("a.close_details").length > 0)
                        {
                               simulateMouseClick ($ ("a.close_details"));
                               var sl = window.parent.document.documentElement.scrollLeft;
                               var st = window.parent.document.documentElement.scrollTop;
                               $ ("a:visible:first", window.parent.document).focus ();
                               window.parent.scrollTo (sl, st);
                               return false;
                        }
                    }
                    else if ($ ("span.ui-icon-closethick").length > 0)
                    {
                         var element = topWindow ();
                         if (element)
                         {
                             simulateMouseClick (element.find ("span.ui-icon-closethick"));
                             return false;
                         }
                    }

                    break;

               case 33:  // PgUp
                    if (e.ctrlKey || e.altKey || e.metaKey)
                        break;
                    if (e.shiftKey && (theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                        (show_Key_Mailbox))
                    {
                        if ($ ("img[src*='" + rewind + "']").length)
                            simulateMouseClick ($ ("img[src*='" + rewind + "']").parent ())
                        else
                            simulateMouseClick ($ ("span.icon_rewind").parent ());
                        return false;
                    }

                    break;

               case 34:  // PgDown
                    if (e.ctrlKey || e.altKey || e.metaKey)
                        break;
                    if (e.shiftKey && (theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                        (show_Key_Mailbox))
                    {
                        if ($ ("img[src*='" + fastforward + "']").length)
                            simulateMouseClick ($ ("img[src*='" + fastforward + "']").parent ())
                        else
                            simulateMouseClick ($ ("span.icon_fastforward").parent ());
                        return false;
                    }
                    break;

               case 35:  // End
                    if (e.altKey)
                        break;

                    if (e.shiftKey)
                    {
                        var planetLinks = $ (".planetlink,.moonlink");
                        window.location = planetLinks [planetLinks.length - 1].href;
                        return false;
                    }

                    if (e.ctrlKey && (theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                        (show_Key_Mailbox))
                    {
                        if ($ ("img[src*='" + skip + "']").length)
                            simulateMouseClick ($ ("img[src*='" + skip + "']").parent ())
                        else
                            simulateMouseClick ($ ("span.icon_skip").parent ());
                        return false;
                    }
                    break;

               case 36:  // Home
                    if (e.altKey)
                        break;

                    if (e.shiftKey)
                    {
                        window.location = $ (".planetlink,.moonlink").eq (0).attr ("href");
                        return false;
                    }

                    if (e.ctrlKey && (theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                        (show_Key_Mailbox))
                    {
                        if ($ ("img[src*='" + skipback + "']").length)
                            simulateMouseClick ($ ("img[src*='" + skipback + "']").parent ())
                        else
                            simulateMouseClick ($ ("span.icon_skip_back").parent ());
                        return false;
                    }
                    break;

               case 38:  // UpArrow
               case 40:  // DownArrow
                 if ((e.ctrlKey) && (show_Key_Everywhere))
                 {
                   var activeMoon = -1;
                   $ (".moonlink").each (function (index)
                   {
                      if ($ (this).attr ("class").indexOf ("active") >= 0)
                      {
                             activeMoon = index;
                             return false;
                      }
                   });

                   if (activeMoon >= 0)
                   {
                       var moonLinks = $ (".moonlink");
                       var numMoons = moonLinks.length;

                       if (numMoons < 2)
                           break;

                       window.location = moonLinks [((e.keyCode == 38) ?
                                         (activeMoon + numMoons - 1) :
                                         (activeMoon + 1)) % numMoons].href;
                       return false;
                   }
                   else
                   {
                       var planetLinks = $ (".planetlink");
                       var numPlanets = planetLinks.length;

                       if (numPlanets < 2)
                           break;

                       var activePlanet = planetLinks.index ($ (".planetlink.active"));
                       if (activePlanet >= 0)
                       {
                           window.location = planetLinks [((e.keyCode == 38) ?
                                  (activePlanet + numPlanets - 1) :
                                  (activePlanet + 1)) % numPlanets].href;
                           return false;
                       }
                   }
                 }
                 else if ((e.shiftKey) && (show_Key_Everywhere))
                 {
                      var leftMenu = $ ("#menuTable li a.menubutton");
                      var numButtons = leftMenu.length;
                      var activeButton = leftMenu.index ($ (".selected"));
                      if (activeButton >= 0)
                      {
                          window.location = leftMenu [((e.keyCode == 38) ?
                                                       (activeButton + numButtons - 1) :
                                                       (activeButton + 1)) % numButtons].href;
                          return false;
                      }
                 }
                 break;

               case 37:  // "<-"
               case 39:  // "->"
                 if (e.altKey ||
                    ( badTarget(e) &&
                      ( (theHref.indexOf ("page=fleet3") >= 0) &&
                        (show_Key_Fleet))))
                   break;

                 if ((e.shiftKey) && (show_Key_Everywhere))
                 {
                      var planetLinks = $ (".planetlink,.moonlink");
                      var numPlanets = planetLinks.length;

                      if (numPlanets < 2)
                          break;

                      var activePlanet = planetLinks.index ($ ("#planetList .active"));

                      if (activePlanet >= 0)
                      {
                          window.location = planetLinks [((e.keyCode == 37) ?
                                            (activePlanet + numPlanets - 1) :
                                            (activePlanet + 1)) % numPlanets].href;
                          return false;
                      }
                 }
                 else if ((e.ctrlKey) && (show_Key_Everywhere))
                 {
                      $ (".planetlink,.moonlink").each (function ()
                      {
                         if ($ (this).hasClass ("active"))
                         {
                                if ($ (this).hasClass ("moonlink"))
                                       window.location = $ ("#planetList .active").prev ().attr ("href")
                                else
                                {
                                    if ($ (this).next ().hasClass ("moonlink"))
                                           window.location = $ (this).next ().attr ("href");
                                }

                                return false;
                         }
                      });

                      return false;

                 }
                 else
                 {
                     if ((theHref.indexOf ("/game/index.php?page=statistics") >= 0) &&
                         (show_Key_Everywhere))
                     {
                         var myDiv = $ ("div#paging").eq (0);
                         var myA = myDiv.find ("a");
                         if (myA.length == 2)
                             simulateMouseClick (myA.eq ((e.keyCode == 37) ? 0 : 1));
                         else
                         {
                             if (myDiv.get (0).children [0].tagName.toLowerCase () == "span")
                             {
                                 if (e.keyCode == 39)
                                     simulateMouseClick (myA);
                             }
                             else
                             {
                                 if (e.keyCode == 37)
                                     simulateMouseClick (myA);
                             }
                         }

                         return false;

                     }
                     else if (theHref.indexOf ("/game/index.php?page=highscore") >= 0)
                     {
                        if (e.keyCode == 37)
                            simulateMouseClick ($ ("span.activePager").prev ())
                        else
                            simulateMouseClick ($ ("span.activePager").next ());

                        return false;
                     }
                     else if ( (theHref.indexOf ("/game/index.php?page=messages") >= 0) && (show_Key_Mailbox) )
                     {
                          var element = topWindow ();

                          if (element == null)
                              return false;

                          element = element.find ((e.keyCode == 39) ?
                                    "span.icon_fastforward" :
                                    "span.icon_rewind");

                          if (element.length > 0)
                          {
                              simulateMouseClick (element.parent ());
                              return false;
                          }
                     }
                 }
                 break;

             case 46:  // Del
                  if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey)
                      break;

                  if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                      (show_Key_Mailbox))
                  {
                      if ($ ("li.delete > a").length > 0)
                      {
                          var element = topWindow ();

                          if (element == null)
                              return;

                          simulateMouseClick (element.find ("li.delete > a"));
                          return false;
                      }
                      else if ($ ("li.recall > a").length > 0)
                      {
                           var element = topWindow ();

                           if (element == null)
                               return;

                           simulateMouseClick (element.find ("li.recall > a"));
                           return false;
                      }
                      else
                      {
                           unsafe.mod = ($ ("div#tabs ul#tab-msg li#3").hasClass ("aktiv")) ? 8 : 7;
                           simulateMouseClick ($ (".buttonOK"));
                           return false;
                      }
                  }

                  break;

             case 65:  // "a"
                  if (e.altKey || e.metaKey)
                      break;

                  if (e.shiftKey)
                  {
                      if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                          (show_Key_Fleet))
                      {
                          simulateMouseClick ($ ("#missionButton1"));
                          return false;
                      }
                  }
                  else if ( e.ctrlKey &&
                            show_Key_Fleet )
                  {
                       if ( $("#sendmost").length )
                       {
                            simulateMouseClick ($ ("#sendmost"));
                            return false;

                       } else if ( $ ("a.ago_fleet_loadResource.ago_fleet_mostResource").length ) {
                            simulateMouseClick ($ ("a.min"));

                            simulateMouseClick ($ ("a.ago_fleet_loadResource.ago_fleet_mostResource").eq (0));
                            simulateMouseClick ($ ("a.ago_fleet_loadResource.ago_fleet_mostResource").eq (1));
                            simulateMouseClick ($ ("a.ago_fleet_loadResource.ago_fleet_mostResource").eq (2));
                       }
                  }
                  else
                  {
                      if (($ ("#sendall").length) &&
                          (show_Key_Fleet))
                      {
                          simulateMouseClick ($ ("#sendall"));
                          return false;
                      }
                      else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                               (show_Key_Fleet))
                      {
                           simulateMouseClick ($ ("#allresources"));
                           return false;
                      }
                      else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                               (show_Key_Mailbox))
                      {
                           if ($ ("#checkAll").length > 0)
                               $ (".checker").attr ("checked", true);
                           return false;
                      }
                  }
                  break;

             case 66:  // "b"
                  if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey || ! show_Key_Everywhere)
                      break;

                  simulateMouseClick ($ ("div#bar a[href*='page=buddies']"));
                  return false;
                  break;

             case 67:  // "c"
                  if (e.ctrlKey || e.altKey || e.metaKey)
                      break;

                  if ( e.shiftKey &&
                       show_Key_Everywhere )
                  {
                      if ($ ("a[href*='openJumpgate=1']").length > 0)
                           window.location = $ ("a[href*='openJumpgate=1']").attr ("href")
                      else if ($ ("a[href*='openJumpgate']").length > 0)
                           unsafe.openJumpgate ();
                  }
                  else if (show_Key_Fleet)
                  {
                      if ($ ("a[href*='openJumpgate=1']").length > 0)
                         window.location = $ ("a[href*='page=station']").eq (1).attr ("href")
                      else
                         window.location = $ ("a[href*='page=station']").eq (0).attr ("href");
                  }
                  return false;
                  break;

             case 68:  // "d"
                  if (e.ctrlKey || e.altKey || e.metaKey)
                      break;

                  if (e.shiftKey)
                  {
                      if ((theHref.indexOf ("/game/index.php?page=fleet2") >= 0) && (show_Key_Fleet))
                      {
                           simulateMouseClick ($ ("#dbutton"));
                           return false;
                      }
                      else if ((theHref.indexOf ("/game/index.php?page=fleet3") >= 0) && (show_Key_Fleet))
                      {
                           if ($ ("#deuterium").val () == 0)
                               simulateMouseClick ($ ("a.max").eq (2))
                           else
                               simulateMouseClick ($ ("a.min").eq (2));
                           return false;
                      }
                      else if ((theHref.indexOf ("/game/index.php?page=traderOverview") > -1) && (show_Key_Trader))
                      {
                           if (($ ("#div_traderAuctioneer").length > 0) && ($ ("#div_traderAuctioneer").css ("display") != "none"))
                           {
                                simulateMouseClick ($ ("#div_traderAuctioneer .js_sliderDeuteriumMax"));
                                return false;
                           }
                           else if (($ ("#div_traderImportExport").length > 0) && ($ ("#div_traderImportExport").css ("display") != "none"))
                           {
                                simulateMouseClick ($ ("#div_traderImportExport .js_sliderDeuteriumMax"));
                                return false;
                           }
                      }
                  }
                  else if (show_Key_Everywhere)
                  {
                      window.location = $ ("a[href*='page=defense'].menubutton").attr ("href");
                      return false;
                  }
                  break;

             case 69:  // "e"
                  if (e.altKey || e.metaKey)
                      break;

                  if ((e.ctrlKey) && (show_Key_Fleet))
                  {
                      if (theHref.indexOf ("/game/index.php?page=fleet1") >= 0)
                      {
                          if ( $ ("#ago_fleet_routine_11").length ) {
                             simulateMouseClick ( $ ("#ago_fleet_routine_11") );
                             return false;
                          }
                      }
                  }
                  if ((e.shiftKey) && (show_Key_Fleet))
                  {
                      if (theHref.indexOf ("/game/index.php?page=fleet2") >= 0)
                      {
                          $ ("#position").val (16).keyup ();
                          simulateMouseClick ($ ("#pbutton"));
                          return false;
                      }
                      else if (theHref.indexOf ("/game/index.php?page=fleet3") > -1)
                      {
                          simulateMouseClick ($ ("#missionButton15"));
                          return false;
                      }
                  }
                  else if (show_Key_Everywhere)
                  {
                      window.location = $ ("a[href*='page=research'].menubutton").attr ("href");
                      return false;
                  }
                  break;

             case 70:  // "f"
                  if (e.altKey || e.metaKey || !show_Key_Fleet)
                      break;

                  if (e.ctrlKey)
                  {
                      if (theHref.indexOf ("/game/index.php?page=fleet1") >= 0)
                      {
                          if ( $ ("#ago_fleet_routine_13").length ) {
                             simulateMouseClick ( $ ("#ago_fleet_routine_13") );
                          }
                      }
                  }
                  else if (e.shiftKey)
                      window.location = $ ("a[href*='page=movement']").attr ("href");
                  else
                      window.location = $ ("a[href*='page=fleet1'].menubutton").attr ("href");

                  return false;
                  break;

             case 71:  // "g"
                  if (e.ctrlKey || e.altKey || e.metaKey || !show_Key_Everywhere)
                      break;

                  if (e.shiftKey)
                  {
                      $ ("#galaxy_input").focus ();
                      return false;
                  }
                  else
                  {
                      window.location = $ ("a[href*='page=galaxy'].menubutton").attr ("href");
                      return false;
                  }
                  break;

             case 72:  // "h"
                  if (e.ctrlKey || e.altKey || e.metaKey)
                      break;

                  if (e.shiftKey)
                  {
                      if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                          (show_Key_Fleet))
                      {
                          simulateMouseClick ($ ("#missionButton8"));
                          return false;
                      }
                  }
                  else if (show_Key_Everywhere)
                      simulateMouseClick ($ ("a[href*='page=search']"));

                  return false;
                  break;

             case 73:  // "i"
                  if (e.ctrlKey || e.altKey || e.metaKey)
                      break;

                  if (e.shiftKey)
                  {
                      if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                          (show_Key_Fleet))
                      {
                          simulateMouseClick ($ ("#missionButton6"));
                          return false;
                      }
                  }
                  break;


             case 75:  // "k"
                  if (e.ctrlKey || e.altKey || e.metaKey)
                      break;

                  if ((theHref.indexOf ("/game/index.php?page=fleet3") >= 0) &&
                      (show_Key_Fleet))
                  {
                      if (e.shiftKey)
                      {
                          if ($ ("#crystal").val () == 0)
                             simulateMouseClick ($ ("a.max").eq (1));
                          else
                             simulateMouseClick ($ ("a.min").eq (1));

                          return false;
                      }
                      else
                      {
                          var value = parseInt ($ ("input#metal").val ().replace (/\D/g, ""));
                              value = 10000 * Math.floor (value / 10000);
                          $ ("input#metal").val (value).keyup ();
                          value = parseInt ($ ("input#crystal").val ().replace (/\D/g, ""));
                          value = 10000 * Math.floor (value / 10000);
                          $ ("input#crystal").val (value).keyup ();

                          simulateMouseClick ($ ("a.max").eq (2));

                          value = parseInt ($ ("input#deuterium").val ().replace (/\D/g, ""));

                          if (value > 20000)
                              value -= 20000;

                          value = 10000 * Math.floor (value / 10000);
                          $ ("input#deuterium").val (value).keyup ();
                          return false;
                      }
                  }
                  else if ((theHref.indexOf ("/game/index.php?page=traderOverview") >= 0) && e.shiftKey && show_Key_Trader)
                  {
                       if (($ ("#div_traderAuctioneer").length > 0) &&
                           ($ ("#div_traderAuctioneer").css ("display") != "none"))
                       {
                           simulateMouseClick ($ ("#div_traderAuctioneer .js_sliderCrystalMax"));
                           return false;
                       }
                       else if (($ ("#div_traderImportExport").length > 0) &&
                                ($ ("#div_traderImportExport").css ("display") != "none"))
                       {
                           simulateMouseClick ($ ("#div_traderImportExport .js_sliderCrystalMax"));
                           return false;
                       }
                  }
                  else if ((theHref.indexOf ("/game/index.php?page=fleet1") >= 0) &&
                            e.shiftKey && show_Key_Fleet)
                  {
                       simulateMouseClick ($ (e.target).prev ().children (0));

                       var value = $ (e.target).val ();
                           value = 100 * Math.floor (value / 100);
                       $ (e.target).val (value).keyup ();
                       return false;
                  }
                  else if ((! e.shiftKey) && (show_Key_Everywhere))
                  {
                       if ($ ("a[href*='page=statistics']").length > 0)
                           window.location = $ ("a[href*='page=statistics']").attr ("href")
                       else
                           window.location = $ ("a[href*='page=highscore']").attr ("href");
                       return false;

                  }
                  break;

              case 76:  // "l"
                   if (e.ctrlKey || e.altKey || e.metaKey || !show_Key_Everywhere)
                       break;

                   if (e.shiftKey)
                       window.location = $ ("a[href*='page=alliance&tab=broadcast']").attr ("href")
                   else
                       window.location = $ ("a[href*='page=alliance'].menubutton").attr ("href");
                   return false;

              break;

               case 77:  // "m"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                     break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     simulateMouseClick ($ ("#mbutton"));
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("#metal").val () == 0)
                         simulateMouseClick ($ ("a.max").eq (0));
                     else
                         simulateMouseClick ($ ("a.min").eq (0));

                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=traderOverview") > -1) && (show_Key_Trader))
                   {
                        if (($ ("#div_traderAuctioneer").length > 0) &&
                            ($ ("#div_traderAuctioneer").css ("display") != "none"))
                        {
                            simulateMouseClick ($ ("#div_traderAuctioneer .js_sliderMetalMax"));
                            return false;
                        }
                        else if (($ ("#div_traderImportExport").length > 0) &&
                                 ($ ("#div_traderImportExport").css ("display") != "none"))
                        {
                             simulateMouseClick ($ ("#div_traderImportExport .js_sliderMetalMax"));
                             return false;
                        }
                   }
                 }
                 else
                 {
                   if (show_Key_Everywhere) {
                      if ($ ("#message_alert_box_default").length > 0)
                         window.location = $("#message_alert_box_default").attr("href");
                      else
                          window.location = $("#message_alert_box").attr("href");
                   }
                   return false;
                 }
                 break;

               case 78:  // "n"
                 if (e.ctrlKey || e.altKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                       (show_Key_Fleet))
                   {
                     simulateMouseClick ($ ("#missionButton5"));
                     return false;
                   }
                 }
                 else
                 {
                   if (($ ("span.float_left.send_none > a").length > 0) &&
                       (show_Key_Fleet))
                   {
                     simulateMouseClick ($ ("span.float_left.send_none > a"));
                     return false;
                   }
                   else if (($ ("span.send_none > a").length > 0) &&
                       (show_Key_Fleet))
                   {
                     simulateMouseClick ($ ("span.send_none > a"));
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     simulateMouseClick ($ ("a.min"));
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                            (show_Key_Mailbox))
                   {
                     if ($ ("#checkAll").length > 0)
                       $ (".checker").attr ("checked", false);
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=movement") > -1) &&
                            (show_Key_Fleet))
                   {
                     simulateMouseClick ($ (".reload").children ("a"));
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=traderOverview") >= 0) &&
                           (show_Key_Trader))
                   {
                           if (($ ("#div_traderAuctioneer").css ("display") != "none"))
                           {
                               unsafe.traderObj.resetValues ("#div_traderAuctioneer");
                               return false;
                           }
                           else if ($ ("#div_traderImportExport").css ("display") != "none")
                           {
                                unsafe.traderObj.resetValues ("#div_traderImportExport");
                                return false;
                           }
                   }
                 }
                 break;

               case 79:  // "o"
                    if (e.ctrlKey || e.altKey || e.metaKey || (! show_Key_Everywhere))
                        break;

                    if (e.shiftKey)
                        simulateMouseClick ($ ("#eventboxFilled"))
                    else
                        window.location = $ ("a[href*='page=overview'].menubutton").attr ("href");
                    return false;

                    break;

               case 80:  // "p"
                    if (e.ctrlKey || e.altKey || e.metaKey)
                        break;

                    if ((e.shiftKey) && (show_Key_Fleet))
                    {
                         if (theHref.indexOf ("/game/index.php?page=fleet2") > -1)
                         {
                             simulateMouseClick ($ ("#pbutton"));
                             return false;
                         }
                         else if (theHref.indexOf ("/game/index.php?page=fleet3") > -1)
                         {
                              simulateMouseClick ($ ("#missionButton4"));
                              return false;
                         }
                    }
                    else
                    {
                        if ((theHref.indexOf ("/game/index.php?page=movement") > -1) &&
                            (show_Key_Fleet))
                        {
                            simulateMouseClick ($ (".closeAll").children ("a"));
                            return false;
                        }
                    }
                    break;

               case 82:  // "r"
                 if (e.altKey || e.metaKey)
                   break;

                 if ((e.ctrlKey) && (show_Key_Fleet))
                 {
                      if (theHref.indexOf ("/game/index.php?page=fleet1") >= 0)
                      {
                          if ( $ ("#ago_fleet_routine_12").length )
                             simulateMouseClick ( $ ("#ago_fleet_routine_12") );
                      }
                 }
                 else if (e.shiftKey && show_Key_Everywhere)
                   window.location = $ ("a[href*='page=resourceSettings']").attr ("href");

                 else if (show_Key_Everywhere)
                   window.location = $ ("a[href*='page=resources'].menubutton").attr("href");

                 return false;
                 break;

               case 83:  // "s"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                       (show_Key_Fleet))
                   {
                     simulateMouseClick ($ ("#missionButton2"));
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=galaxy") > -1) &&
                            (show_Key_Everywhere))
                   {
                        $ ("#system_input").focus ();
                        return false;
                   }
                 }
                 else if (show_Key_Everywhere)
                         window.location = $ ("a[href*='page=shipyard'].menubutton").attr("href");

                 return false;
                 break;

               case 84:  // "t"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                       (show_Key_Fleet))
                   {
                     simulateMouseClick ($ ("#missionButton3"));
                     return false;
                   }
                 }
                 else if (show_Key_Everywhere)
                      window.location = $ ("a[href*='page=traderOverview'].menubutton").attr ("href") + "#page=traderAuctioneer";

                 return false;
                 break;

               case 86:  // "v"
                 if (e.shiftKey || e.altKey || e.metaKey)
                   break;

                 if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                     (show_Key_Fleet))
                 {
                   simulateMouseClick ($ ("a.min"));

                   if ((e.ctrlKey) &&
                       ($ ("a.ago_fleet_loadResource.ago_fleet_mostResource").length)) {

                       simulateMouseClick ($ ("a.ago_fleet_loadResource.ago_fleet_mostResource").eq (2));
                       simulateMouseClick ($ ("a.ago_fleet_loadResource.ago_fleet_mostResource").eq (1));
                       simulateMouseClick ($ ("a.ago_fleet_loadResource.ago_fleet_mostResource").eq (0));
                   }
                   else {
                       simulateMouseClick ($ ("a.max").eq (2));
                       simulateMouseClick ($ ("a.max").eq (1));
                       simulateMouseClick ($ ("a.max").eq (0));
                   }
                   return false;
                 }
                 else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                          (show_Key_Mailbox))
                 {
                      $ ("td .checker").each (function ()
                      {
                         $ (this).attr ("checked", ! $ (this).attr ("checked"));
                      });
                      return false;
                 }

                 break;

               case 89:  // "y"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                       (show_Key_Fleet))
                   {
                     simulateMouseClick ($ ("#missionButton9"));
                     return false;
                   }
                 }
                 break;

               case 90:  // "z"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                       (show_Key_Fleet))
                   {
                     simulateMouseClick ($ ("#missionButton7"));
                     return false;
                   }
                 }
                 break;

               case 49:  // "1"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("1").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("1").change ();
                       return false;
                     }
                     else if ($ ("input[name=mission]").val () == "5")
                     {
                       $ ("#holdtimeline select").val ("1").change ();
                       return false;
                     }
                   }
                 }
                 break;

               case 50:  // "2"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("2").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("2").change ();
                       return false;
                     }
                     else if ($ ("input[name=mission]").val () == "5")
                     {
                       $ ("#holdtimeline select").val ("2").change ();
                       return false;
                     }
                   }
                 }
                 else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                          (show_Key_Trader))
                 {
                      $ ("tr.entry").each (function ()
                      {
                         if ($ (this).find ("td.subject a").attr ("href").indexOf ("cat=2") >= 0)
                         {
                                $ (this).find (".checker").attr ("checked", true);
                         }
                      });
                      return false;
                 }
                 break;

               case 51:  // "3"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("3").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("3").change ();
                       return false;
                     }
                     else if ($ ("input[name=mission]").val () == "5")
                     {
                       $ ("#holdtimeline select").val ("4").change ();
                       return false;
                     }
                   }
                 }
                 else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                          (show_Key_Mailbox))
                 {
                    $ ("tr.entry").each (function ()
                    {
                           if ($ (this).find ("td.subject a").attr ("href").indexOf ("cat=4") >= 0)
                           {
                               if ($ (this).find ("td.subject a span").length)
                                   $ (this).find (".checker").attr ("checked", true);
                           }
                    });
                    return false;
                 }
                 break;

               case 52:  // "4"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("4").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("4").change ();
                       return false;
                     }
                     else if ($ ("input[name=mission]").val () == "5")
                     {
                       $ ("#holdtimeline select").val ("8").change ();
                       return false;
                     }
                   }
                 }
                 else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                          (show_Key_Mailbox))
                 {
                          $ ("tr.entry").each (function ()
                          {
                             if ($ (this).find ("td.subject a").attr ("href").indexOf ("cat=5") >= 0)
                             {
                                 $ (this).find (".checker").attr ("checked", true);
                             }
                          });
                          return false;
                 }
                 break;

               case 53:  // "5"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("5").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("5").change ();
                       return false;
                     }
                     else if ($ ("input[name=mission]").val () == "5")
                     {
                       $ ("#holdtimeline select").val ("16").change ();
                       return false;
                     }
                   }
                 }
                 else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                          (show_Key_Mailbox))
                 {
                          $ ("tr.entry").each (function ()
                          {
                             if ($ (this).find ("td.subject a").attr ("href").indexOf ("cat=6") >= 0)
                             {
                                    $ (this).find (".checker").attr ("checked", true);
                             }
                          });
                          return false;
                 }
                 break;

               case 54:  // "6"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("6").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("6").change ();
                       return false;
                     }
                     else if ($ ("input[name=mission]").val () == "5")
                     {
                       $ ("#holdtimeline select").val ("32").change ();
                       return false;
                     }
                   }
                 }
                 else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                          (show_Key_Mailbox))
                 {
                          $ ("tr.entry").each (function ()
                          {
                             var href = $ (this).find ("td.subject a").attr ("href");
                             if ((href.indexOf ("cat=7") >= 0) || (href.indexOf ("javascript") >= 0))
                                  $ (this).find (".checker").attr ("checked", true);
                          });
                          return false;
                 }
                 break;

               case 55:  // "7"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("7").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("7").change ();
                       return false;
                     }
                   }
                 }
                 else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                          (show_Key_Mailbox))
                 {
                          $ ("tr.entry").each (function ()
                          {
                             if ($ (this).find ("td.subject a").attr ("href").indexOf ("cat=8") >= 0)
                             {
                                    $ (this).find (".checker").attr ("checked", true);
                             }
                          });

                          return false;
                 }
                 break;

               case 56:  // "8"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("8").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("8").change ();
                       return false;
                     }
                   }
                 }
                 else if ((theHref.indexOf ("/game/index.php?page=messages") > -1) &&
                          (show_Key_Mailbox))
                 {
                          $ ("tr.entry").each (function ()
                          {
                             if ($ (this).find ("td.subject a").attr ("href").indexOf ("cat=4") >= 0)
                             {
                                    $ (this).find (".checker").attr ("checked", true);
                             }
                          });
                          return false;
                 }
                 break;

               case 57:  // "9"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("9").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("9").change ();
                       return false;
                     }
                   }
                 }
                 break;

               case 48:  // "0"
                 if (e.ctrlKey || e.altKey || e.metaKey)
                   break;

                 if (e.shiftKey)
                 {
                   if ((theHref.indexOf ("/game/index.php?page=fleet2") > -1) &&
                       (show_Key_Fleet))
                   {
                     $ ("#speed").val ("10").change ();
                     return false;
                   }
                   else if ((theHref.indexOf ("/game/index.php?page=fleet3") > -1) &&
                            (show_Key_Fleet))
                   {
                     if ($ ("input[name=mission]").val () == "15")
                     {
                       $ ("#expeditiontimeline select").val ("10").change ();
                       return false;
                     }
                     else if ($ ("input[name=mission]").val () == "5")
                     {
                       $ ("#holdtimeline select").val ("0").change ();
                       return false;
                     }
                   }
                 }
                 break;

             }
             return true;
           });

   } catch(err) {
         if (DEBUG_MODE != 0) GM_log('ShortcutKeys [ERROR]: <' + err + '> ' + strPaginaActual);
   }
}

// name OGame Redesign : Highlight Players
// description OGame : highlight top 300 players, and top 5 alliances, in galaxy view.
// creator Black Cat
function HighlightPlayers(){
  try {
        if (strPaginaActual.indexOf("galaxy") == -1) return;

        if (! highlight_Players) return;

        if (DEBUG_MODE > 0) GM_log('HighLightPlayers: ' + strPaginaActual);

        function setHighlight() {
            var $;
            try { $ = unsafeWindow.$; }
            catch(e) { $ = window.$; }

            try {
                 var rows = document.querySelectorAll("#galaxytable tr.row");

                 if (DEBUG_MODE > 1) GM_log('HighLightPlayers >> setHighlight: [ rows = ' + rows.length + ' ] ' + strPaginaActual);

                 for (var i = 0; i < rows.length; i++) {
                      var objPlayerName = rows[i].querySelector("td.playername");

                      if (objPlayerName) {
                          var theLink = objPlayerName.getElementsByTagName("a")[0];
                          if (theLink && theLink.getAttribute("rel") != null) {
                              var rel_attr = theLink.getAttributeNode("rel").nodeValue;
                              var div = document.querySelector(rel_attr);
                              if (div &&
                                  div.getElementsByClassName("rank")[0] &&
                                  div.getElementsByClassName("rank")[0].getElementsByTagName("a")[0]) {

                                  var rank = parseInt(div.getElementsByClassName("rank")[0].getElementsByTagName("a")[0].textContent);
                                  if (rank > 0 && rank <= 300) {
                                      var GBcolor = (Math.ceil(rank/2) + 15).toString(16).toUpperCase();
                                      var color = "#FF" + GBcolor + GBcolor;
                                      var span = theLink.getElementsByTagName("span")[0];
                                      span.removeAttribute("class");
                                      span.style.color = strColor;
                                  }
                              }
                          }

                          var allytag = rows[i].querySelector("td.allytag");
                          if (allytag) {

                              var span = allytag.getElementsByTagName("span")[0];
                              if (span) {

                                  var theLi = allytag.getElementsByClassName("rank")[0];
                                  var theA = theLi.getElementsByTagName('a')[0];

                                  if (theA) {
                                      var intRank = parseInt(theA.innerHTML.replace(/\D/g, ''));

                                      if (DEBUG_MODE > 1) GM_log('HighLightPlayers >> setHighlight: [ ' +
                                                          span.childNodes[0].nodeValue +
                                                          ' [ rank = ' + intRank + ' ] ] ' +
                                                          strPaginaActual);

                                      if (intRank > 0 && intRank <= 5) {
                                         var GBcolor = (Math.ceil ((intRank * 60)/2) + 15).toString(16).toUpperCase();
                                         var strColor = "#FF" + GBcolor + GBcolor;

                                         span.style.color = strColor;
                                      }
                                  }
                              }
                          }
                      }
                 }

            } catch(e) {
                 if (DEBUG_MODE != 0) GM_log('HighlightPlayers >> setHighlight [ERROR]: <' + e + '> ' + strPaginaActual);
            }
        }

        setInterval (setHighlight, 500);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('HighlightPlayers [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame: Color Flight Slots
// namespace      Vess
// description    Color-codes the number of free/used flight slots:
//                red - none free, yellow - one free, green - more free
// version        1.04
function ColorFlightSlots()
{
  try {
       if (DEBUG_MODE > 0) GM_log('ColorFlightSlots: ' + strPaginaActual);

       if (! show_Color_Flight_Slots) return;

        var strColor0 = color_Slot_0;

        var intFlightDiff1 = 1; //Colorear Naranja
        var strColor1 = color_Slot_1;

        var intFlightDiff2 = 2; //Colorear Amarillo
        var strColor2 = color_Slot_2;

        var strColor3 = color_Slot_3;

        var flights, flightDiff, expDiff, slotColor;
        if (document.location.href.indexOf ("/game/index.php?page=flotten1") > -1)
        {
          var myTR = document.getElementById("content").getElementsByTagName("table")[0].
                     getElementsByTagName("table")[0].getElementsByTagName("tr")[0];

          var myTDs = myTR.getElementsByTagName ("td");

          flights = myTDs [0].textContent.match (/\d+/g);
          flightDiff = parseInt (flights [1]) - parseInt (flights [0]);

          if (flights.length > 2)
            flightDiff += parseInt (flights [2]);

          if (flightDiff <= 0)
            slotColor = strColor0
          else if (flightDiff <= intFlightDiff1)
            slotColor = strColor1
          else if (flightDiff <= intFlightDiff2)
            slotColor = strColor2
          else
            slotColor = strColor3;

          myTDs [0].style.color = slotColor;
          flights = myTDs [1].innerHTML.match (/\d+/g);
          expDiff = parseInt (flights [1]) - parseInt (flights [0]);

          if ((expDiff <= 0) || (flightDiff <= 0))
               slotColor = strColor0
          else if (expDiff <= flightDiff) {
               if ( parseInt (flights [0]) == 0)
                    slotColor = strColor3
               else if (expDiff <= intFlightDiff1)
                    slotColor = strColor1
               else if (expDiff <= intFlightDiff2)
                    slotColor = strColor2
               else
                   slotColor = strColor3;
          }

          myTDs [1].style.color = slotColor;
        }
        else if (document.location.href.indexOf ("/game/index.php?page=fleet1") > -1)
        {
          var myDivs = document.getElementById ("slots").getElementsByTagName ("div");

          if (myDivs [0].className == "fleft tiptipsStandard")
            myDivs [0].className = "fleft tipsStandard";  // Fix a stupid 2.1.3 bug

          flights = myDivs [0].textContent.match (/\d+/g);
          flightDiff = parseInt (flights [1]) - parseInt (flights [0]);

          if (flightDiff <= 0) {
            myDivs [0].style.fontWeight = 'bold';
            slotColor = strColor0;
          } else if (flightDiff <= intFlightDiff1)
            slotColor = strColor1
          else if (flightDiff <= intFlightDiff2)
            slotColor = strColor2
          else
            slotColor = strColor3;

          var mySpans = myDivs [0].getElementsByTagName ("span");
          if (mySpans.length > 1) {
             try {
                  if ( mySpans [1].getAttribute('class').indexOf('overmark') > -1 ) {
                       mySpans [1].style.fontWeight = 'bold';
                       mySpans [1].removeAttribute('class');
                  }

             } catch(e) {
               if (DEBUG_MODE != 0) GM_log('ColorFlightSlots [ERROR]: <' + e + '> ' + strPaginaActual);
             }

            mySpans [1].style.color = slotColor;
          }

          myDivs [0].style.color = slotColor;

          //flights = myDivs [1].textContent.match (/\d+/g);
          flights = myDivs [myDivs.length - 1].textContent.match (/\d+/g);
          expDiff = parseInt (flights [1]) - parseInt (flights [0]);

          if ((expDiff <= 0) || (flightDiff <= 0)) {
               myDivs [1].style.fontWeight = 'bold';
               slotColor = strColor0;
          } else if (expDiff <= flightDiff) {
            if ( parseInt (flights [0]) == 0)
               slotColor = strColor3
            else if (expDiff <= intFlightDiff1)
               slotColor = strColor1
            else if (expDiff <= intFlightDiff2)
               slotColor = strColor2
            else
               slotColor = strColor3;
          }

          //myDivs [1].style.color = slotColor;
          myDivs [myDivs.length - 1].style.color = slotColor;
        }
        else if (document.location.href.indexOf ("/game/index.php?page=movement") > -1)
        {
          var blnAllF = false;
          var blnAllE = false;

          var mySpan = document.getElementsByClassName ("fleetSlots") [0];
          flights = mySpan.textContent.match (/\d+/g);
          flightDiff = parseInt (flights [1]) - parseInt (flights [0]);

          if (flightDiff <= 0) {
            blnAllF = true;
            slotColor = strColor0;
          }
          else if (flightDiff <= intFlightDiff1)
            slotColor = strColor1
          else if (flightDiff <= intFlightDiff2)
            slotColor = strColor2
          else
            slotColor = strColor3;

          mySpan.style.color = slotColor;

          if (blnAllF) {
              mySpan.style.fontWeight = 'bold';
              mySpan.getElementsByTagName ("span") [0].style.color = slotColor;
              mySpan.getElementsByTagName ("span") [1].style.color = slotColor;
          }

          mySpan = document.getElementsByClassName ("expSlots") [0];
          flights = mySpan.textContent.match (/\d+/g);
          expDiff = parseInt (flights [1]) - parseInt (flights [0]);

          if ((expDiff <= 0) || (flightDiff <= 0)) {
               blnAllE = true;
               slotColor = strColor0;
          }
          else if (expDiff <= flightDiff) {
               if ( parseInt (flights [0]) == 0)
                    slotColor = strColor3
               else if (expDiff <= intFlightDiff1)
                    slotColor = strColor1
               else if (expDiff <= intFlightDiff2)
                    slotColor = strColor2
               else
                    slotColor = strColor3;
          }

          mySpan.style.color = slotColor;

          if (blnAllE) {
              mySpan.style.fontWeight = 'bold';
              mySpan.getElementsByTagName ("span") [1].style.color = slotColor;
              mySpan.getElementsByTagName ("span") [0].style.color = slotColor;
          }
        }
        else if (document.location.href.indexOf ("page=galaxy") > -1) {

             function LightInfos() {

               try {

                 var theSpan = document.getElementById('probeValue');

                 if (! theSpan)
                     return;

                 if (parseInt(theSpan.innerHTML) > 0)
                     slotColor = strColor_LPuNKTKit
                 else
                     slotColor = 'crimson';

                 theSpan.style.color = slotColor;
                 theSpan = document.getElementById('probes');
                 theSpan.style.color = slotColor;

                 theSpan = document.getElementById('recyclerValue');
                 if (parseInt(theSpan.innerHTML) > 0)
                     slotColor = strColor_LPuNKTKit
                 else
                     slotColor = 'crimson';

                 theSpan.style.color = slotColor;
                 theSpan = document.getElementById('recycler');
                 theSpan.style.color = slotColor;

                 theSpan = document.getElementById('missileValue');
                 if (parseInt(theSpan.innerHTML) > 0)
                     slotColor = strColor_LPuNKTKit
                 else
                     slotColor = 'crimson';

                 theSpan.style.color = slotColor;
                 theSpan = document.getElementById('rockets');
                 theSpan.style.color = slotColor;

                 var flightUsed = parseInt(document.getElementById('slotUsed').innerHTML);

                 theSpan = document.getElementById('slotValue');

                 var flightSlots = parseInt(theSpan.innerHTML.substring(theSpan.innerHTML.indexOf('/')+7));

                 if (DEBUG_MODE > 1)
                     GM_log('ColorFlightSlots >> LightInfos >> Slots = ' + flightUsed + ' / ' + flightSlots + ': ' + strPaginaActual);

                 flightDiff = flightSlots - flightUsed;

                 if (flightDiff <= 0)
                      slotColor = strColor0
                 else if (flightDiff <= intFlightDiff1)
                      slotColor = strColor1
                 else if (flightDiff <= intFlightDiff2)
                      slotColor = strColor2
                 else
                      slotColor = strColor3;

                 theSpan = document.getElementById('slots');
                 theSpan.style.color = slotColor;

                 theSpan = document.getElementById('slotValue');
                 theSpan.style.color = slotColor;

                 theSpan = document.getElementById('slotUsed');
                 theSpan.style.color = slotColor;

               } catch (e) {
                 if (DEBUG_MODE != 0) GM_log('ColorFlightSlots >> LightInfos [ERROR]: <' + e + '> ' + strPaginaActual);
               }
             }

             setInterval(LightInfos, 800);
        }
        else
          return;

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ColorFlightSlots [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Pranger in Header
// description    Puts a link to the Pranger in the header of the game window
// version        1.03
function PrangerInHeader()
{
  try {
       if (DEBUG_MODE > 0) GM_log('PrangerInHeader: ' + strPaginaActual);

       // The following "if" is not really necessary but with it this script will work for Opera too
       if ((document.location.href.indexOf("/game/index.php?page=")           == -1) ||
           (document.location.href.indexOf("/game/index.php?page=buddies")     > -1) ||
           (document.location.href.indexOf("/game/index.php?page=notices")     > -1) ||
           (document.location.href.indexOf("/game/index.php?page=showmessage") > -1) ||
           (document.location.href.indexOf("/game/index.php?page=search")      > -1))
         return;

      if (! show_Pranger_In_Header) return;

      var div = document.getElementById ("bar");
      if ((div == null) || (div.length < 5))
          return;

      var li4 = div.getElementsByTagName ("li") [4];

      var li = document.createElement ("li");

      var a = document.createElement ("a");
          a.setAttribute ("href", "pranger.php");
          a.setAttribute ("target", "_blank");
          a.appendChild (document.createTextNode (LANG.MISC.txt_pranger));

      var mySpan = document.createElement('span');
          mySpan.setAttribute('id', 'lpunktkit-pranger');

          mySpan.appendChild(a);

      setStyleSet('#lpunktkit-pranger a:link,' +
                  '#lpunktkit-pranger a:visited {text-decoration:none;}' +
                  '#lpunktkit-pranger a:hover {text-decoration:underline;color:' +
                                                       strColor_LPuNKTKit + ';}' +
                  '#lpunktkit-pranger a:active {text-decoration:none;}');

      li.appendChild(mySpan);
      li4.parentNode.insertBefore (li, li4);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('PrangerInHeader [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name    OGame - Chat Alianza
// author  Elwe - ogame.com.es - uniFornax
// Version 1.0
function ChatAlianza(){
  try {
     if (DEBUG_MODE > 0) GM_log('ChatAlianza: ' + strPaginaActual);

     if ((! id_Chat) || (! show_Chat)) return;

     var elemento = document.getElementById('planet');  //para ponerlo en la imagen
     var titulo = document.getElementsByTagName('h2');

     var p = document.createElement("p");

     var chat = '<img style="visibility:hidden;width:0px;height:0px;" border=0 ' +
                'width=0 height=0 src="http://c.gigcount.com/wildfire/IMP/CXNID' +
                '=2000002.0NXC/bT*xJmx*PTEyOTg1ODc*ODM1NzgmcHQ9MTI5ODU4NzYxNjE3' +
                'MSZwPTUzMTUxJmQ9Jmc9MSZvPTA5NWEwZWEzNTc3NzRlNzE5M2Vh/YWYxOGE2N' +
                'WQ1ZDUw.gif" /><embed src="http://www.xatech.com/web_gear/chat' +
                '/chat.swf" quality="high" width="640" height="300" name="chat"' +
                ' FlashVars="id=' + id_Chat + '" align="middle" allowScriptAcces' +
                's="sameDomain" type="application/x-shockwave-flash" pluginspag' +
                'e="http://xat.com/update_flash.shtml" />';

     elemento.setAttribute('style', 'height:346px;background-image:none;');
     p.setAttribute('style', 'margin:0px;');
     p.innerHTML = chat;
     elemento.appendChild(p);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ChatAlianza [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Color Message Subjects
// author         Vesselin
// version        1.08
function ColoredSubjects() {
  try {
       if (DEBUG_MODE > 0) GM_log('ColoredSubjects: ' + strPaginaActual);

       // The following "if" is not really necessary but with it this script
       // will work for Opera too
       if (strPaginaActual != 'messages')
           return;

       if (! show_Colored_Messages) return;

       var myInterval;
       var isIE = (navigator.appName == "Microsoft Internet Explorer");

       LoadColorMessages();

       function colorSubjects ()
       {
             if (DEBUG_MODE > 1) GM_log('ColoredSubjects >> colorSubjects: ' + strPaginaActual);

             var mailz = document.getElementById ("mailz");

             if (mailz == null) return;

             var subjects = getElementsByClass ("subject", mailz, "td");

             for (var i = 0; i < subjects.length; i++)
             {
                  var links = subjects [i].getElementsByTagName ("a");
                  if (links.length < 1) continue;
                  var theLink = links [0];
                  var theHref = links [0].href;

                  if (theHref.indexOf ("cat=2") >= 0)
                      theLink.style.color = arrColorMessages[2][1]

                  else if (theHref.indexOf ("cat=6") >= 0)
                       theLink.style.color = arrColorMessages[6][1]

                  else if (theHref.indexOf ("cat=8") >= 0)
                       theLink.style.color = arrColorMessages[8][1]

                  else {
                      // 0 - Despliegue
                      // 1 - Retorno
                      // 2 - CC
                      // 3 - Escombros
                      // 4 - Espionaje
                      // 5 - Accion de espionaje
                      // 6 - PM
                      // 7 - Llegada
                      // 8 - Expedicion
                      // 9 - Colonizacion

                      var blnFound = false;

                      for (var j=0; j < arrColorMessages.length; j++)
                          if (theLink.textContent.toLowerCase().indexOf(arrColorMessages[j][0]
                                                                .toLowerCase()) >= 0)
                          {
                              theLink.style.color = arrColorMessages[j][1];
                              blnFound = true;
                              break;
                          }

                      if (! blnFound) theLink.style.color = strColor_LPuNKTKit;
                  }
             }

             if (isIE) clearInterval (myInterval);
         }

         if (isIE)
             myInterval = setInterval (colorSubjects, 10)
         else
             document.addEventListener ("DOMNodeInserted", colorSubjects, false);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ColoredSubjects [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function ColoredHeader() {
  try {
       if (DEBUG_MODE > 0) GM_log('ColoredHeader: ' + strPaginaActual);

       // The following "if" is not really necessary but with it this script
       // will work for Opera too
       if (strPaginaActual != 'showmessage')
           return;

       if (! show_Colored_Messages) return;

       //Set color to all the header table
       function setHeaderColor (arrElements, strColor) {
          try {
               if (DEBUG_MODE > 1) GM_log('ColoredHeader >> setHeaderColor: ' + strPaginaActual);

               for (i = 0; i < arrElements.length; i++)
                    arrElements[i].style.color = strColor;

          } catch (e) {
               if (DEBUG_MODE != 0) GM_log('ColoredHeader >> setHeaderColor [ERROR]: <' + e + '> ' + strPaginaActual);
          }
       }

       LoadColorMessages();

       var theDiv = document.getElementsByClassName('infohead')[0];

       if (theDiv == null)
           return;

       var theHeader = theDiv.getElementsByTagName('td');
       if (theHeader == null)
           return;

       // 0 - Despliegue
       // 1 - Retorno
       // 2 - CC
       // 3 - Escombros
       // 4 - Espionaje
       // 5 - Accion de espionaje
       // 6 - PM
       // 7 - Llegada
       // 8 - Expedicion
       // 9 - Colonizacion

       var blnFound = false;

       for (var j=0; j < arrColorMessages.length; j++)
            if (theHeader[2].textContent.toLowerCase().indexOf(arrColorMessages[j][0]
                                                            .toLowerCase()) >= 0)
            {
                 setHeaderColor( theHeader, arrColorMessages[j][1]);

                 blnFound = true;

                 break;
            }

       if (! blnFound) {
           if (document.getElementsByClassName('reply')[0])
               setHeaderColor( theHeader, arrColorMessages[6][1]);
           else
               setHeaderColor( theHeader, strColor_LPuNKTKit);

       }


   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ColoredHeader [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name OGame Redesign : BBCode
// description OGame : BBCode in messages
// creator Black Cat
function BBCode() {

  try {
     if (! show_BBCode) return;

     if (DEBUG_MODE > 0) GM_log('BBCode: ' + strPaginaActual);

     function addBBCode(t,name, value) {
  if (name=="" || (arguments.length > 2 && value=="")) return;
  var message, cnt;
  var div = $(t).parents(".ui-dialog").find(".overlayDiv")[0];
  if (div) {
    message = div.getElementsByTagName("form")[0].text;
    cnt = div.getElementsByClassName("cntChars")[0];
  } else {
    message = document.forms[0].text;
    cnt = document.getElementsByClassName("cntChars")[0];
  }
  var selStart = message.selectionStart, selEnd = message.selectionEnd;
  var startTag = "", endTag = "";
  if (name.indexOf('background')>=0)
    endTag = "[/background]"
  else
    endTag = "[/" + name + "]";

  if (arguments.length > 2) {
    startTag = "[" + name + "=" + value + "]";
  } else {
    if (name == "list") {
      var tags = message.value.substring(0,selStart).match(/\[\/?list\]/gi);
      if (!tags || tags[tags.length-1].substr(1,1) == "/") {
        startTag = "[list]";
      } else {
        endTag = "";
      }
      startTag += "[*]";
    } else if (name == "tooltip") {
      startTag = "[tooltip text=]";
    } else {
      startTag = "[" + name + "]";
    }
  }
  message.value = message.value.substring(0,selStart) + startTag + message.value.substring(selStart,selEnd) + endTag + message.value.substring(selEnd);
  message.setSelectionRange(selStart + startTag.length, selEnd + startTag.length);
  message.focus();
  cnt.textContent = message.textLength;
}

var strFunc = (function(){
  var funcBBCode = function(form,page,showImg) {
    if (!form) return;
    var ta = form.text;
    var div = document.createElement("div");
    div.innerHTML = "<select class='dropdown' style='font-size:10pt;height:1.7em;visibility:visible;' onchange='addBBCode(this,\"font\",this.value);this.selectedIndex=0;'><option value=''>FONT</option><option value='arial' style='font-family:arial,sans-serif'>Arial</option><option value='comic\\ sans\\ ms' style='font-family:\"Comic Sans MS\",cursive'>Comic</option><option value='courier\\ new' style='font-family:\"Courier New\",monospace'>Courier</option><option value='georgia' style='font-family:georgia,serif'>Georgia</option><option value='impact' style='font-family:impact,fantasy'>Impact</option><option value='times\\ new\\ roman' style='font-family:\"Times New Roman\",serif'>Times</option><option value='verdana' style='font-family:verdana,sans-serif'>Verdana</option></select> ";
    div.innerHTML += "<select class='dropdown' style='font-size:10pt;height:1.7em;visibility:visible;' onchange='addBBCode(this,\"size\",this.value);this.selectedIndex=0;'><option value=''>SIZE</option><option value='7' style='font-size:7pt'>tiny</option><option value='10' style='font-size:10pt'>small</option><option value='12' style='font-size:12pt'>normal</option><option value='16' style='font-size:16pt'>big</option><option value='20' style='font-size:20pt'>huge</option></select> ";
    div.innerHTML += "<select class='dropdown' style='font-size:10pt;height:1.7em;visibility:visible;' onchange='addBBCode(this,\"color\",this.value);this.selectedIndex=0;'><option value=''>COLOR</option><option value='black' style='color:black;font-size:9pt'>black</option><option value='silver' style='color:silver;font-size:9pt'>silver</option><option value='gray' style='color:gray;font-size:9pt'>gray</option><option value='maroon' style='color:maroon;font-size:9pt'>maroon</option><option value='#A52A2A' style='color:brown;font-size:9pt'>brown</option><option value='red' style='color:red;font-size:9pt'>red</option><option value='orange' style='color:orange;font-size:9pt'>orange</option><option value='yellow' style='color:yellow;font-size:9pt'>yellow</option><option value='lime' style='color:lime;font-size:9pt'>lime</option><option value='green' style='color:green;font-size:9pt'>green</option><option value='olive' style='color:olive;font-size:9pt'>olive</option><option value='teal' style='color:teal;font-size:9pt'>teal</option><option value='aqua' style='color:aqua;font-size:9pt'>aqua</option><option value='blue' style='color:blue;font-size:9pt'>blue</option><option value='navy' style='color:navy;font-size:9pt'>navy</option><option value='purple' style='color:purple;font-size:9pt'>purple</option><option value='fuchsia' style='color:fuchsia;font-size:9pt'>fuchsia</option><option value='#FFC0CB' style='color:pink;font-size:9pt'>pink</option><option value='white' style='color:white;font-size:9pt'>white</option></select> ";
    if (page == "alliance")
//      div.innerHTML += "<br />";
    div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"b\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAZlBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////39/fu7u7l5eXf39/W1tbMzMzFxcW9vb21tbWtra2lpaWZmZmKioqCgoJ8fHx1dXVfX19VVVUcHBwQEBAAAABvQ4WDAAAAInRSTlMAESIzRFVmd4iZqrv/////////////////////////////erKVdwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAACtSURBVCiRvY3XEsIgFERDsRAN4dJuFNv+/0+KJY6jvOp5WWaXA133C5TBujmYyUI2eo3ttpjG0PMwtBSNwVrbUHq2Y+VLkbDBOTd+KebgTjsich+KvLiAsw+eDuZD8N5RiDEQ1Fu/AtUuporf4+0+UjiiUnJOdMTi2S/gQo57bEpi5kQZryEy54K+ZJ4mzhPEYxD97Rlo/UhgOQ9SKa2kqKkr9TR/Lu7MKUT3J66l/Q2irNMvNQAAAABJRU5ErkJggg==' alt='Bold' title='Bold' border='0' /></a>";
    div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"i\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAY1BMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39/fu7u7n5+fe3t7S0tLMzMzDw8O+vr61tbWvr6+kpKSZmZmQkJB6enpjY2NXV1dTU1M6OjooKCggICAREREAAACW3aPzAAAAIXRSTlMAESIzRGZ3iJmqu//////////////////////////////ewDs2AAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAAJdJREFUKJG10MsSgjAMBVDaIvJKX6FYlcL9/6+UcSPYbrmLLHJmkkyq6qo0aIr9Fhqlfo1hgChACsNYgtvbj1SAeuNIugDdTNAmh3skLNpnoDajtTacQWJy1rnpD2SKlIAXz2dowfbZ94j8OP1ErmS8XUBu8ozj4tWFwAv2OoXjLNFhT/etaI4g1B4plaqVPF8lfsk+cl0+nUwKek1swHwAAAAASUVORK5CYII=' alt='Italic' title='Italic' border='0' /></a>";
    div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"u\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAaVBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4+Pjv7+/n5+ff39/W1tbMzMzFxcW8vLy1tbWtra2mpqacnJyRkZGFhYV/f39mZmZSUlJDQ0MzMzMREREAAAAvziwyAAAAI3RSTlMAESIzRFVmd4iZqrvu/////////////////////////////6saOpIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAtElEQVQokbWR3RaCIBCEQzD/UthFyErT5v0fMr1RIG/7bjjMnDOzC5fLX6hQnerF1M75iS7gW9+cGGqhrkP2a9SPQXe+PEliDJpuIjWub1vORi9pvZj9BLDxc2JIGKM1EX2S+mokJmamZxHpOdyIlQc7hPUF7haNUg0sT5CHsd6tQXYFu56eCHbwzlmIHL33/Sswyi2/FqLeTqhjJMTUe5I2EYiSAvb/ElJKdZAFy4uQ9H1jvp0jEWFcRQbjAAAAAElFTkSuQmCC' alt='Underline' title='Underline' border='0' /></a>";
    div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"s\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAYFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////29vbu7u7m5ube3t7V1dXMzMzCwsKzs7Otra2lpaWZmZmOjo58fHxmZmZRUVFDQ0M7OzszMzMAAABWp2jsAAAAIHRSTlMAESIzRFVmd4iZqu7//////////////////////////5UxFAAAAAAJcEhZcwAACvAAAArwAUKsNJgAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAAAo0lEQVQokbVQ7Q6CMBDjtqEw2MfBmIJK3/8tncYgyBJ/0WS7pM2u7YriENSos/x5au9lhidwG5AR1OxNC7EX9MU4O1a5TXN0DPoVTjfTPLzDzh48oel83NjX2GKpA2OtdS4dny5r8PcFVYgdtJQazIBakqWozA6ihO97vmIlDEPsQSVCjGH8BkurEjSRfluoVW0hpSR6DSXFunwi6TNo9ymH4QksEA2GU5CXhAAAAABJRU5ErkJggg==' alt='Strike through' title='Strike through' border='0' /></a> ";
    div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"align\",\"center\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAAA3NCSVQICAjb4U/gAAAACVBMVEX///////8AAACO9MPsAAAAA3RSTlMA//9EUNYhAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAADNJREFUCJljYMAGmFYBQQMDYygQOCCLNgApRjQxLCoZuBaAKdYAQmYyrFoFpkJDsToEDgBeyRP8DhwWwQAAAABJRU5ErkJggg==' alt='Align center' title='Align center' border='0' /></a> ";
    div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"list\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYAgMAAACdGdVrAAAAA3NCSVQICAjb4U/gAAAACVBMVEX///////8AAACO9MPsAAAAA3RSTlMA//9EUNYhAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAABh0RVh0Q3JlYXRpb24gVGltZQAxNC4xMS4yMDA3+XeAJAAAACVJREFUCJljYEAFDWCSKWHVqlUNDIwTQkNDHRgYHBhwA9prAAMA3f4QUeGCZkAAAAAASUVORK5CYII=' alt='List' title='List' border='0' /></a> ";
    div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"url\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAhFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////4+Pjw8PDm5ube3t7X19fMzMzFxcW8vLy1tbWtra2np6ecnJyUlJSEhIR+fn5zc3NsbGxmZmZXV1dNTU1AQEA5OTkzMzMpKSkVFRUQEBAGBgYAAACU9KEpAAAALHRSTlMAESIzRFVmd4iZqrvM3e7///////////////////////////////////////+D3T4AAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAfdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIDi1aNJ4AAABA0lEQVQokWXR2ZKDIBAFUNFoWAxhs3GNmphl0v//f8NMVSqo/cDDuTTVQJJsqqA021oohiPAJPKtU7Tn89nWYutSK2WVUo91C8PgiwzruoWgVXoR+Qk0lCSe56r10sz8rfVE44ANpg+bURmD2Sq4dN6Ypzbmxb+eU8okWNsZY18i/QQMb8MgnXW1cy5yilqbtrLuOU0zRi6NdUPjqpfgnB2ic4yDewvQjDxLU/JxgqaCRw9+gJGRaMziWvl7OXcP72e6eqHRt7IQCLXH+CcIG4OIt/PND4/vmxT3pobeBv/O+V9peWlrqHeekGO5DP0Ntx6SjJ0kP+w8JGmWpWTvf9GefwHM/BUabF+V+wAAAABJRU5ErkJggg==' alt='Insert link' title='Insert link' border='0' /></a> ";

    if (showImg)
      div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"background image-repeat=no img=\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAABO1BMVEX//////////////73/2Gb+zFj+xVv+xFT+vlL+vFf/vUr/vzX/vTr+tVL/s0r/tEH+sE/+szP/r0X+rUrjp5/+pkn3qEf/pUD/ozz3oUD/nUH/mjr3mjy1pKX/lDyuoaGqn6D5kjv3jjv+izfxjzq0mJWjnJ2emZv/hDP/hDimk5WZlZb0gTaVkZKRjpDsezL5dTLvdyzwcDD4bS6FhIV/f39/f4CBf3/iaTDVWiXbWCXJWCumYEHQUiCsVDSgTzKgTjOHRzNsSkuFQzGWPCJgQ0NcQkN/OS1VQEJSPT9zLidHODtGOTpqMCeKJgZCNDg9NDhgKi08MTRYKSRTKChNJypAKyxRJSpaIyVQJiM0LC5vGQsvKCsnIiQkICEhGhwaFxggFBUWDg4IBwgEBAUFBAUDBQUFAwIAAABu8F9vAAAAaXRSTlMAEf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8HvOsQAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAATNJREFUKJF10llbgkAUgGGjgrECFUIIymxV2jXD9kXDFrS9bAEy0fD//4LOzLRgj35Xw3m5mjORSL86fYp0mJ5hkKU4H4VYHAcHPi6FgaVFoygMCAEMQyyLEC/JBDQqHIeBg7kgKQRmNEXBAgRjJEiyphNYSc3Oi2IyOQLB36Kip+YIGMa6rk1OCGJiNBETyDxLIJ83sjldiY0NMsyQqqp6Kkthd3PjYGd7LyczzPj+Wfn48OikjGGhVrt/eajXby9Pr96e64+kJYBpy6pULMsqPTWbH6XvpgDSFzQHX13jnJYGWKzaVdu2XXqp73C0q9cZgMwNzv25bhd/3a0CLL9C3t8iXMdx3ALAmud5jfCKAqgIUPB9v3t5rVbbBCh+Bv+2GrQDDKa51aNO/8fw20D36/kCJGJ6DPnsRqYAAAAASUVORK5CYII=' alt='Insert image' title='Insert image' border='0' /></a> ";

    div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"player\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAVFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////39/fv7+/n5+ff39/W1tbDw8O1tbWtra2mpqaZmZmUlJSNjY2FhYVTU1NAQEA4ODgAAACdbSmwAAAAHHRSTlMAESIzRFVmd6q7////////////////////////lSG5lgAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAAC4SURBVCiRddHpFoIgEEBhNsMSYlhMjfd/zxhwA+3+Ur4jg0rI/7p4qcvrs3012RkluqEF5SIhNLbLWKQJzg8MaxvUo5UqoIZmiNZqg5zSewV02rLq/dYZwDYv4j1sYJ2v2qHeKoQVnKu3OsCPTQWMGz91wSDIxQAWcClfgVkkJYTJMhLCNME6XrL02SnjXIju+YUxQSeE4JzR/AtpinEUiAxv6PkHUxQ8zaUsd5CkX/o7SMd4HNv/AE/9G3IdzcVWAAAAAElFTkSuQmCC' alt='Player tooltip' title='Player tooltip' border='0' /></a>";
    div.innerHTML += "<a href=\"javascript:void(0);\" onclick='addBBCode(this,\"coordinates\")'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAA3NCSVQICAjb4U/gAAAAQlBMVEX////////v7+/MzMy1tbWqqqqZmZmTk5OLi4uEhIRzc3NqampYWFhTU1NLS0tCQkI6OjozMzMbGxsREREGBgYAAAAE/lzVAAAAFnRSTlMA////////////////////////////VIGNowAAAAlwSFlzAAALEgAACxIB0t1+/AAAAB90RVh0U29mdHdhcmUATWFjcm9tZWRpYSBGaXJld29ya3MgOLVo0ngAAACLSURBVCiRrdLBDoMgEEVRZ5QK2BFR3///agNjW6jYlXf1zImBGLvuMjRLMDZSeJ5SsGewCqItCLKvedYwkQ88lDBrlmehh84MLs0I9Aae4p6e3BccHXEBIedoCv1w7BIMh4XGEkQ/AhsIRd3ygfg+grYakC6U7vX7BmAYG/kGlEdUUHU/NMK/n+GiF1KMHQA/0y61AAAAAElFTkSuQmCC' alt='Coordinates' title='Coordinates' border='0' /></a>";

    div.innerHTML += "<br />";

    var fontDiv = document.getElementsByClassName('markItUpHeader')[0];
    if (fontDiv != null)
        fontDiv.parentNode.insertBefore(div, fontDiv)
    else
        ta.parentNode.insertBefore(div,ta);

    ta.addEventListener(
      "keypress",
      function (e) {
        if (e.which == 32) {
          var selStart = this.selectionStart;
          var startText = this.value.substring(0,selStart);
          if (/\[[a-z][a-z ]*=[^\]]*$/i.test(startText.replace(/\\[\\\]]/g,""))) {
            this.value = startText + "\\ " + this.value.substring(this.selectionEnd);
            selStart += 2;
            this.setSelectionRange(selStart,selStart);
            e.preventDefault();
          }
        }
      },
      false
    );
  }

  if (document.location.href.indexOf("page=messages") != -1) {
    $(document).ajaxSuccess(function(e,xhr,settings){
//    $(".mailWrapper").ajaxSuccess(function(e,xhr,settings){
      if (settings.url.indexOf("page=showmessage") == -1) return;

      $(".overlayDiv > .showmessage").each(function(){
        if (this.getElementsByClassName("melden").length > 0) {
          if ($(this).hasClass("bbcode")) return;
          $(this).addClass("bbcode");

          funcBBCode(this.getElementsByTagName("form")[0],"showmessage",(this.getElementsByClassName("note")[0].getElementsByClassName("newMessage").length == 0));
        }
      });
    });
  } else if (document.location.href.indexOf("page=alliance") != -1) {
//    $("#eins").ajaxSuccess(function(e,xhr,settings){
    $(document).ajaxSuccess(function(e,xhr,settings){
      if (settings.url.indexOf("page=allianceBroadcast") == -1) return;

      funcBBCode(document.forms[0],"alliance",true);
    });
  }

  $(document).ajaxSuccess(function(e,xhr,settings){
//  $("body").ajaxSuccess(function(e,xhr,settings){
    if (settings.url.indexOf("page=writemessage") == -1) return;

    $(".overlayDiv > .writemessage").each(function(){
      if ($(this).hasClass("bbcode")) return;
      $(this).addClass("bbcode");

      funcBBCode(this.getElementsByTagName("form")[0],"writemessage",false);
    });
  });
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = addBBCode.toString() + "\n(" + strFunc + ")();";
document.body.appendChild(script);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('BBCode [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name Ogame Redesign New Smilies
// description Ogame Redesign New Smilies
// creator Black Cat
function NewSmiles(){
  try {
     if (! show_Smiles) return;

     if (DEBUG_MODE > 0) GM_log('NewSmiles: ' + strPaginaActual);

     function addSmiley(t,smiley) {
  var message, cnt;
  var div = $(t).parents(".ui-dialog").find(".overlayDiv")[0];
  if (div) {
    message = div.getElementsByTagName("form")[0].text;
    cnt = div.getElementsByClassName("cntChars")[0];
  } else {
    message = document.forms[0].text;
    cnt = document.getElementsByClassName("cntChars")[0];
  }
  var selStart = message.selectionStart, selEnd = message.selectionEnd;
  var str = " " + smiley;
  var startText = message.value.substring(0,selStart);
  if (/\[[a-z][a-z ]*=[^\]]*$/i.test(startText.replace(/\\[\\\]]/g,""))) {
    str = str.replace(/([ \\\]])/g,"\\$1");
  }
  message.value = startText + str + message.value.substring(selEnd);
  selStart += str.length;
  message.setSelectionRange(selStart,selStart);
  message.focus();
  cnt.textContent = message.textLength;
}

var strFunc = (function(){
  var smilies = new Array();
  smilies.push(new Array(":D","data:image/gif;base64,R0lGODlhDwAPALMAAAAAAP///4uYp52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///yH5BAEAAA8ALAAAAAAPAA8AQARa8EkJap0UgRA294AAPEBTmgyAGMAwUoNrhSIGOI3DLMpKvIDFbFipAVgdTjL0ss0wzl3vcJncTDdGolJwkRi4Rk676ooACpASdKZ+1h8joVBZ05okmmBffUQAADs="));
  smilies.push(new Array(":O","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVtoCSKQFmOpMIsi1kexSAAEvDYtwMoCFDQpIKQMJAJZigA5AFxNBg8AxDQcCybzygBCUAgEoBE4gAwApMuFNoJBZ9rywjTseDBaADrTUl/FWYADFUOOiVjBjKGCosuZWY1BgeSJkZIIyVHmSciIQA7"));
  smilies.push(new Array("?(","data:image/gif;base64,R0lGODlhDwAWAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKbK8IycpJSkrJyktJystKSsvKy0vKy0xKy8xLS8xMTExLS8zLzEzP/78EwoHEwcKChMHBxMKCgcTBwoTGxYIKB8WOioaFQwEFw4KCAgEEggEHAgEJggEMAgEOggECAgSEggSHAgSJggSMAgSOggSCAggEgggHAggJgggMAggOgggCAguEgguHAguJgguMAguOgguCAg8Egg8HAg8Jgg8MAg8Ogg8HxMMIxUOCBIEEhIEHBIEJhIEMBIEOhIECBISEhISHBISJhISMBISOhISCBIgEhIgHBIgJhIgMBIgOhIgCBIuEhIuHBIuJhIuMBIuOhIuCBI8EhI8HBI8JhI8MBI8OhI8JhcQKhkTCBwEEhwEHBwEJhwEMBwEOhwECBwSEhwSHBwSJhwSMBwSOhwSCBwgEhwgHBwgJhwgMBwgOhwgCBwuEhwuHBwuJhwuMBwuOhwuCBw8Ehw8HBw8Jhw8MBw8Ohw8LB0YLyIaCCYEEiYEHCYEJiYEMCYEOiYECCYSEiYSHCYSJiYSMCYSOiYSCCYgEiYgHCYgJiYgMCYgOiYgCCYuEiYuHCYuJiYuMCYuOiYuCCY8EiY8HCY8JiY8MCY8OiY8MiQbNCgdCDAEEjAEHDAEJjAEMDAEOjAECDASEjASHDASJjASMDASOjASCDAgEjAgHDAgJjAgMDAgOjAgCDAuEjAuHDAuJjAuMDAuOjAuCDA8EjA8HDA8KbK8MDA8OjA8NiogOCwkCDoEEjoEHDoEJjoEMDoEOjoECDoSEjoSHDoSJjoSMDoSOjoSCDogEjogHDogJjogMDogOjogCDouEjouHDouJjouMDcwOjouCDo8Ejo8HDo8Jjo8MDo8Ojo8OjAnPDUuAA4AABgAACgAADQANDQAKCgAGBgADg4ADgAAGAAAKAAANAAANAA0KAAoGAAYDgAOAAAOAAAYAAAoAAA0P/78KCgpICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAEAAPoALAAAAAAPABYABwifAPXpmyBQIMGCBwcqVHiQYMKFBgtCfEhRosWLEisixMgRI4CPHzl+lCAhwgMHISUCqEChAkmTDhoAKLiyZUsJEE7GnKkPQMuPFHB+3NlTAsuPLiEMbaBgpNGbJU82YNAUQASSWGHGXFD1QQQIYLVurerggVmzDtIu4Nq0Z1qUIAGw5QmgAcqYDRosAKCgrcC6eRms7euXJl/CVUXGtRgQADs="));
  smilies.push(new Array("8-)","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVqoCSKQFmOpMIsLKMkyFEMAiABT1Q+zlLKNlJhSBjQBDUUAPKAOBouhCEIaDhM2BIhCUAgAInwYQBABpVYFPrpSpxGy1yzp4gVbNnSNQ9gWEtQCiUGNCUJCoiIMGNHeAYHB1lISXBlkzVnIQA7"));
  smilies.push(new Array(";(","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVtoCSKQFmOpMIsrIkcwSAAEvBE5eMs5VHQpILQJCgCSZAHxNFgKBAGIKDhSC6bTwNhVkMgEqaSjIuqhcujEtMJPtaSEeXu6aMBqjb54gkozAAMVA5rCgkwMiUJCothAANjdgYHB41FZCQAlkZHIQA7"));
  smilies.push(new Array("8o","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIsLKMkyFEMAiABT6A/zqIHBRupQDQJjkIS5AFxNFwIgxDQcPycjB+hdkMgEgnTgMZF3UxJcwn7Oo0Aywizp4gFbw5IABBo+vgFNQAMVQ5sCQcGNCUJCo4KJgdjSDcGB5cAQWRlJABHn24SIQA7"));
  smilies.push(new Array(":]","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIAy8IoCXIAgwBIwGM+zmIWN1JhSBjUBDYUAPKAOBovhCEIaDiYTqhCSkgCEIiEOHEwIoNKExqFAzxfidNo+Yg0e9sDEHd9+J0LeQU2AAwNbm8wMzUlCQoKaiZHNwAGB5cGQ0dJcwBIn3ISIQA7"));
  smilies.push(new Array(":(","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA8AQAV0YCSKQFmOpMIsLKMkyFEMAhABD/48zqIggIKNVCgSBjRBDQWA5BwNBgBhGAIaDkgJKgUYCMspMEE+DADKIdOkRt0A3Ndp1Mw9ID0FQGaDO0t4CyUyNQAMWA5xCQcGNCUJCpFsAEhpNwYHmQZFSUt0aEppaiEAOw=="));
  smilies.push(new Array("=)","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIAy8IoCXIAgwBIwBM9ubMAssKNVCgSBjWBDQWAPCCOxgthGAIaDicguqISlkAEIEE+DADKIdOkRuG2Uthp1NQ1fcCDEJd98KA/QTYADFgOVy8ABwY1JQkKAAqSMWZoYAYHM2xKS3SWnHMSIQA7"));
  smilies.push(new Array("X(","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVxoCSKQFmOpMIsi1kexSAAEvBE5QO0AEyThSBhIBPMUACIztFgABCGH6DhUEKYDAWUcHwCEuDEgQg4omqu86iEVSROa2VkCdD6alVd0sGDzQAMVA5tYgYyJQkKCnVuCAcARTQABgeVBkFFZiRlRkZwEiEAOw=="));
  smilies.push(new Array(":)","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVxoCSKQFmOpMIsLKMkyFEMAiABT1Q+zlLKNlJhSBjQBDUUAPKAOBouhCEIaDiYTqhCSkgCEAhAYnwYAJBBpSmNugGersRptMw1e1vg7fooOX0AMjUADFYOcC8HBjQlCQoACpEwZWdeBgcHa5VJdJtoaSEAOw=="));
  smilies.push(new Array(":P","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzG5/kTlCS////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABQALAAAAAAPAA8AQAVzICWKQFmOpMIAy8IoCXIAgwBQwBOVj7OUh8KNVCiaBMghCfKAOBovhGEIaDiYTqhCSrDhEIgEQDKR0JIokkmZLj1fYjaAGWn6tsEb4PooOX8AQTYADFYObzAHBjUlCQoKayY1XgAGBzMSmQBIXiMlnElKIQA7"));
  smilies.push(new Array(";)","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVxoCSKQFmOpMIsLKMkyFEMAiABD/7kSynbpIKQMKAJaigA5AFxNFwIAxDQcCybT0WUgAQgEICE+DAAHIFJExp1AzhdidNI+YgwHQvt72bNlfA+BTUADFUOby8HBjQlCQoACpEwZGZdBgcHapVIc5tnaCEAOw=="));
  smilies.push(new Array(":rolleyes:","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA8AQAVrYCSKQFmOpMIsJaMkZTEIQAQ8JuDkRU0WQMJgJqChAJAHxNFwIQw+QAOp3DmhRgACkegmDgNA0XfMocpMF4xsS5aWLMChZ9vhkID4QdyaOqwAXwAzJQkKh4cJCGBENQAGB3s5RUYjJZRjZCEAOw=="));
  smilies.push(new Array(":baby:","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///5ums6SuuqOtuamyvay1wKu0v4uYp5Whrp6ptZ2otK+4wrC5w7nByre/yHeHmLK7xLzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAAAPAA8AAAVw4CSKQFmO6FRGAFMMJwo4jwM0wKsA4/xINYDhRVjwVL+HMjIcFHmACK3kYJaKiFJDumowSgpBtrWNRLxERWJcYBgMputiXRoUCoCDXg9YZ1UDMAcQhAcACH8qCgR5e4aIRyoLRnGQKSWImTEpKnEpIQA7"));
  smilies.push(new Array(":evil:","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIsLKMkyFEMAiABT/k8zqKUBRupQCQMSoIaCgB5QBwNF8IgBDQcEFPDZCAoAQhEYpw4HAFK1M0kVK+hrsRpxHxEnD1FLHjD5pg9JTI1AAxXDnAvBwY0JQkKkJAwZmhfBgeYBkRIaSSVSYQjIQA7"));
  smilies.push(new Array(":tongue:","data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA8AQAVtYCSKQFmOpAIsLKMkyFEAAhABD/48zqIggNkoWCgQBgOB0jaEPCCOhgthYAIaDidU+jMQajcEImEqJcGoWzk9BERdZCbJaXKYZDa3cwf1xQo1AAxYDm8vBwZJJQkqZWVLNwYHkyZnaCQ0SktyIQA7"));
  smilies.push(new Array(":supa:","data:image/gif;base64,R0lGODlhHgAPANQAAAAAAAAACAAEGAAEHAAILAAIMAAgyAAg0Fj/yOzs//T0//j//////wggGCAgIPj4+AQEBBQ8LPD/+AAEAAgIAAgICAwIAAwMABgYAAwsxDg4OFj/xFz/xGT/tGT/uPT09CH/C05FVFNDQVBFMi4wAwEAAAAh/sJodHRwOi8vd3d3LnJ0bHNvZnQuY29tL2FuaW1hZ2ljLwoKQ3JlYXRlZCB3aXRoIEFuaW1hZ2ljIEdJRiBWIDEuMjJhCmJ5IFJpZ2h0IHRvIExlZnQgU29mdHdhcmUgSW5jLgoKVG8gc3VwcHJlc3MgdGhpcyBtZXNzYWdlIGluIHRoZSByZWdpc3RlcmVkIHZlcnNpb24KdW5jaGVjayAiT3B0aW9ucyB8IEFuaW1hZ2ljIGNvbW1lbnQgZnJhbWUiCgAh+QQJAgAHACwAAAAAHgAPAAAFjuAhjqQInGepruWJvG/KziZsxzQLxDuP04UWorcjDkvBkYAhGPVuUICSKVoCqIciaos6HqxUcDM7ZDCuZnSxeqYS2uNi2tw+e8GE7OIqaMrrdWt9Z3tZAXN+ZWhtgnUBUgAKiGRDiy5HYAwKkAlmfU48XV5fSwwJkHRjTk88JaVnBwYAA6otWywCAwAGByEAIfkECQIABwAsAAAAAB4ADwAABYngIY6kCJxnqa7libxvys4mbMc0C8Q7j+eHwmjXI8YQgJFwJWAIDr2bNNl8lpoAJxHFRSGxzisjKyAyxmf0+Iu2jghts1pNBBNaC7I8e+bXx3ktAX1rWXxoZnwBSSQACoRFhy5IagqMQwlnAk+RXkgHm2cJlyZpbpMwMqBppCYDbkNcKgIDAAYjIQAh+QQJAgAHACwAAAAAHgAPAAAFfuAhjqQInGepriqAvG/KziZsxzTrIifc8zlS4eDaFWPAYU7A2N2eAIaAxow2UFhsoymdVRlXBlccbW6jUxaBGx6PAWcGYQZYWMvl99lOD5C5eVGCYgEAdAp/V4FwYwqGOgliAkZYMUwMCY8reVM/PoaXTTQAA2kmWCQCA5ojIQAh+QQJAgAHACwAAAAAHgAPAAAFdOAhjqQInGepruWJvG/KziZsxzQLxDuP5y1EbzcUAkkARuNmazAAx4Pg+URZk0nBcZp0UBlUb/ZICH/NScIR8Og6kmCAQ9xeB+JnLDgABQIUeHBUcAp9OQAJYA0NV4tgCYY0gi42J2BPUQADWgdXIgIDkSQhACH5BAkCAAcALAAAAAAeAA8AAAVn4CGOpAicZ6mu5Ym8b8rOJmzHNAvEO4/nLQQgIixGdgAgqddgNGDNp1BZAzCsqOt1SkVqHQwwlqv0WsHibbIr/ELSSKrpxNBarzL5aVHH1hd5ehJ9dAwSa3ImdU4ITX2JSwMoJ5I5IQAh+QQJAgAHACwAAAAAHgAPAAAFeOAhjqQIXEBarmyZIhsiA1Zrj4AM6zBwt5TNJuWZAToI38+VRERygEhTuTTpGowGAquVXaomTooBIJtf1CXUYYaYHVDwAappmzVxMLRchsDJeXpJFQxvFVAZcnNJH4VlDh85GIomABKObBIqlCaFDBOeaZwppJs3IQAh+QQJAgAHACwAAAAAHgAPAAAFZ+AhjqQInGepruWJvG/KziZsxzQLxDuP5y0EICIsRnYAIKnXYDRgzadQWQMwrKjrdUpFah0MMJar9FrB4m2yK/xC0kiq6cTQWq8y+WlRx9YXeXoSfXQMEmtyJnVOCE19iUsDKCeSOSEAIfkECQIABwAsAAAAAB4ADwAABXTgIY6kCJxnqa7libxvys4mbMc0C8Q7j+ctRG83FAJJAEbjZmswAMeD4PlEWZNJwXGadFAZVG/2SAh/zUnCEfDoOpJggEPcXgfiZyw4AAUCFHhwVHAKfTkACWANDVeLYAmGNIIuNidgT1EAA1oHVyICA5EkIQAh+QQJAgAHACwAAAAAHgAPAAAFfuAhjqQInGepriqAvG/KziZsxzTrIifc8zlS4eDaFWPAYU7A2N2eAIaAxow2UFhsoymdVRlXBlccbW6jUxaBGx6PAWcGYQZYWMvl99lOD5C5eVGCYgEAdAp/V4FwYwqGOgliAkZYMUwMCY8reVM/PoaXTTQAA2kmWCQCA5ojIQAh+QQJAgAHACwAAAAAHgAPAAAFieAhjqQInGepruWJvG/KziZsxzQLxDuP54fCaNcjxhCAkXAlYAgOvZs02XyWmgAnEcVFIbHOKyMrIDLGZ/T4i7aOCG2zWk0EE1oLsjx75tfHeS0BfWtZfGhmfAFJJAAKhEWHLkhqCoxDCWcCT5FeSAebZwmXJmlukzAyoGmkJgNuQ1wqAgMABiMhADs="));
  smilies.push(new Array(":ra:","data:image/gif;base64,R0lGODlhJwASAPcAAAAAAAAAVQAAqv///wAkAAAkVQAkqgAk/wBJAABJVQBJqgBJ/wBtAABtVQBtqgBt/wCSAACSVQCSqgCS/wC2AAC2VQC2qgC2/wDbAADbVQDbqgDb/wD/AAD/VQD/qgD//yQAACQAVSQAqiQA/yQkACQkVSQkqiQk/yRJACRJVSRJqiRJ/yRtACRtVSRtqiRt/ySSACSSVSSSqiSS/yS2ACS2VSS2qiS2/yTbACTbVSTbqiTb/yT/ACT/VST/qiT//0kAAEkAVUkAqkkA/0kkAEkkVUkkqkkk/0lJAElJVUlJqklJ/0ltAEltVUltqklt/0mSAEmSVUmSqkmS/0m2AEm2VUm2qkm2/0nbAEnbVUnbqknb/0n/AEn/VUn/qkn//20AAG0AVW0Aqm0A/20kAG0kVW0kqm0k/21JAG1JVW1Jqm1J/21tAG1tVW1tqm1t/22SAG2SVW2Sqm2S/222AG22VW22qm22/23bAG3bVW3bqm3b/23/AG3/VW3/qm3//5IAAJIAVZIAqpIA/5IkAJIkVZIkqpIk/5JJAJJJVZJJqpJJ/5JtAJJtVZJtqpJt/5KSAJKSVZKSqpKS/5K2AJK2VZK2qpK2/5LbAJLbVZLbqpLb/5L/AJL/VZL/qpL//7YAALYAVbYAqrYA/7YkALYkVbYkqrYk/7ZJALZJVbZJqrZJ/7ZtALZtVbZtqrZt/7aSALaSVbaSqraS/7a2ALa2Vba2qra2/7bbALbbVbbbqrbb/7b/ALb/Vbb/qrb//9sAANsAVdsAqtsA/9skANskVdskqtsk/9tJANtJVdtJqttJ/9ttANttVdttqttt/9uSANuSVduSqtuS/9u2ANu2Vdu2qtu2/9vbANvbVdvbqtvb/9v/ANv/Vdv/qtv///8AAP8AVf8Aqv8A//8kAP8kVf8kqv8k//9JAP9JVf9Jqv9J//9tAP9tVf9tqv9t//+SAP+SVf+Sqv+S//+2AP+2Vf+2qv+2///bAP/bVf/bqv/b////AP//Vf//qv///yH5BAEAAAMALAAAAAAnABIAQAjEAAcIFAigYMGBCBMqXIgQgBcA//5BjDjRoEWDETNSBAdOoKQ2DEOKHJkQgB+HJx96SQmA5ABJAtvAjFnyy5+LXx6OvAiAY0iHXrx88TP0z0mXA0DS9BiJ4EOeFr+0JDnz502JGSFCnagxa0+fIi8iHTuwoJ+VQQ+S3bmyoE2pQKeOVJp0IF2TOYei9fPHqFSqMKtWHeCwYlaKOhVulVvyKlaKkLtK9gpWcVuuBdOWtKixIMeOdBs6/CP0KVmDa1OrXk0yIAA7"));

  var smiliesHTML = "";
  var funcSmilies = function(form) {
    if (smiliesHTML.length == 0) {
      for (var i = 0; i < smilies.length; i++) {
        smiliesHTML += "<a href=\"javascript:void(0);\" onclick=\"addSmiley(this,'"+smilies[i][0].replace(/'/g,"\\'")+"')\"><img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' /></a> ";
      }
    }

// '
    if (!form) return;
    var div = document.createElement("div");
    div.innerHTML = smiliesHTML;
    div.style.textAlign = "center";
    div.style.height = "100px";
    div.style.overflow = "auto";
    var cell = form.text.parentNode.previousElementSibling;
    if (cell && cell.nodeName.toLowerCase() == "td") {
      div.style.width = "100%";
      cell.appendChild(document.createElement("br"));
      cell.appendChild(document.createElement("br"));
      cell.appendChild(div);
    } else {
      var message = form.text;
      var message_div = message.parentNode;
      var parentDiv = message_div;
      do {
        parentDiv = parentDiv.parentNode;
      }while(parentDiv && parentDiv.nodeName.toLowerCase() != "div");
      parentDiv.style.position = "relative";
      div.style.position = "absolute";
      div.style.width = "110px";
      div.style.marginLeft = "5px";
      div.style.top = "50%";
      div.style.marginTop = "-50px"; // -div.style.height / 2

      if (document.location.href.indexOf("page=alliance") <= -1) {
          message.style.width = "582px";
          message.style.maxWidth = "582px";
      }
      else {
          message.style.width = "482px";
          message.style.maxWidth = "482px";
      }
      message_div.style.marginLeft = "120px";
      message_div.parentNode.insertBefore(div, message_div);
    }
  }

  if (document.location.href.indexOf("page=messages") != -1) {
//    $(".mailWrapper").ajaxSuccess(function(e,xhr,settings){
    $(document).ajaxSuccess(function(e,xhr,settings){
      if (settings.url.indexOf("page=showmessage") == -1) return;

      $(".overlayDiv > .showmessage").each(function(){
        var note = this.getElementsByClassName("note")[0];
        if (note && this.getElementsByClassName("melden").length > 0) {
          if ($(this).hasClass("smilies")) return;
          $(this).addClass("smilies");

          funcSmilies(this.getElementsByTagName("form")[0]);

          var rep_smilies = function(value,index) {
            var pos_less = value.indexOf("<");
            if (pos_less != -1) {
              var pos_more = value.indexOf(">",pos_less+1);
              var tag = value.substring(pos_less,pos_more+1);
              while (tag.match(/</g).length != tag.match(/>/g).length) {
                pos_more = value.indexOf(">",pos_more+1);
                tag = value.substring(pos_less,pos_more+1);
              }
              value = rep_smilies(value.substring(0,pos_less),index) +
                      tag +
                      rep_smilies(value.substring(pos_more+1),index);
            } else {
              for (var i = index; i < smilies.length; i++) {
                var pos = value.search(new RegExp(smilies[i][0].replace(/([[\](){}.+*?^$|-])/g,"\\$1"),"i"));
                if (pos != -1) {
                  value = rep_smilies(value.substring(0,pos),i+1) +
                          "<img src=\""+smilies[i][1]+"\" alt=\""+smilies[i][0]+"\" border='0' />" +
                          rep_smilies(value.substring(pos+smilies[i][0].replace(/\\\\/g,"\\").length),i);
                  break;

                }
              }
            }
            return value;
          }

          var sort_smilies = function(a,b) { return b[0].length-a[0].length; }
          smilies.sort(sort_smilies);

          note.innerHTML = rep_smilies(note.innerHTML,0).replace(/&lt;3/g,"&#x2665;");
        }
      });
    });
  } else if (document.location.href.indexOf("page=alliance") != -1) {
    $(document).ajaxSuccess(function(e,xhr,settings){
//    $("#eins").ajaxSuccess(function(e,xhr,settings){
      if (settings.url.indexOf("page=allianceBroadcast") == -1) return;

      funcSmilies(document.forms[0]);
    });
  }

  $(document).ajaxSuccess(function(e,xhr,settings){
//  $("body").ajaxSuccess(function(e,xhr,settings){
    if (settings.url.indexOf("page=writemessage") == -1) return;

    $(".overlayDiv > .writemessage").each(function(){
      if ($(this).hasClass("smilies")) return;
      $(this).addClass("smilies");

      funcSmilies(this.getElementsByTagName("form")[0]);
    });
  });
}).toString();

var script = document.createElement("script");
script.setAttribute("type","text/javascript");
script.text = addSmiley.toString() + "\n(" + strFunc + ")();";
document.body.appendChild(script);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('NewSmiles [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           Ogame Redesign: Message button in left menu
// version        0.1
// description    Add message button in left menu
function MessageButtonLeft()
{
  try {
         if (! show_Message_Button_Left) return;

         if (DEBUG_MODE > 0) GM_log('MessageButtonLeft: ' + strPaginaActual);

         var unsafe = window;
         try {unsafe = unsafeWindow} catch (e) {}

         var $ = unsafe.$;
         var session = unsafe.session;

         if ( ! $ ) return;

         var arrMessages = new Array();

         arrMessages = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAdCAYAAADGgB7AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAK6wAACusBgosNWgAAAehJREFUWEftl0tOwzAQhpsCKmnTJk1J+gg0pQ8humOFxIILsGXDlvNxDo7AGZA4AQI0eNxOcFM3jh1nR6RfcRzP5PM/jqM4DXa07h7x1Bh9vMHP9xdv2zyOjk8a79HawZyfry/lUyNYuryG88vVrmbsOq/8GLymMbJ7rC9drSGZLYAMKE2GgTtQMqCyfQSH44U2gsWTKZSGwoEYYA3swAQu5leGYGUdMR3H3DNybDKd768nUwgq4zY+mS15biMw6SKvAibEIhjKDpglKJywFbCb23uwqU0lWClN11iSLvg6IKiHp2eoIsojLhGjUopgCISJTcEoFs+VwfhetnWMgHTdy48XwYZJqr/4W26bB6FkTqkAD90nMMrdOnX1dn62+WMAV1EJZY6oxou5t22tr1IhmAqoyLFawFQlzL8csglYBdMFOgSIeWoBs7HREpjTbBKk2RqTzFA268I+AcKeY7pgCoj6wJp/JYAyEI7jqBy2V0oCEiHR2RIQ9TnGAQTXdEtt7a208GB7pXQ7PVWyyvfRddf19L6V+L/nBSF0/RA8v8/V6TF1g0ztrg+ZPNbO1Ntts5g2it3HHJ4fZNL+r8QAVBiPIYzGEJwNNxrEmfxBBH7IROesHQv9++1+NAIUPUPrlfwfrOHAL4rryeT3RN1JAAAAAElFTkSuQmCC",

                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAdCAYAAADGgB7AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAK6wAACusBgosNWgAAAedJREFUWEftl91OgzAUx8fUTDY2GBP2gY65jxh355WJFz6Fj+Dj+Rw+gs9g4pWXi5pjT7eDHeugLeVOkn8opefw6/+UEpwGO1oPT3hqjD7e4Of7i7dtHienZ433aO1gzs3ri3pqBEuXt3B5vdrXjF3nlR+D1zRGdo/1pas1JLMFkAHKZBi4ByUDUu0jOBwvtBEsnkxBGQoHYoA1sCMTuJrfGIKpOmI6jrln5NhkOj9cT6YQVMZdfDJb8txGYNJFXgVMiEUwlB0wS1A4YStgd/ePYFPbSrBSmq6xJF3wdUBQz58bqCLKIy4Ro1KKYAiEiU3BKBbPlcH4XrZzjIB03cuPF8GGSaq/+FtumwehZE6VAR67T2CUu3Xu6u38bPPHAK6iEsocKRsv5t61tb5KhWBlQEWO1QJWVsL8yyGbgFUwXaBjgJinFjAbGy2BOc0mQZqtMckMZbMu7BMg7DmmC1YCUR9Y868EoALhOE6Zw/ZKSUAiJDqrAFGfYxxAcE231NbeSgsPtldKt9MrS1b5Prruup7etxL/97wghK4fguf3uTo9pm6Qqd31IZPH2pl6+20W00ax+5jD84NM2v+VGIAK4zGE0RiCi+FWgziTP4jAD5nonLVjof+w3Y9GgKJnaL2S/4M1HPgFjcNcA//zxawAAAAASUVORK5CYII%3D",

                        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAdCAYAAADGgB7AAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAK6wAACusBgosNWgAAAelJREFUWEftl0tOwzAQhpsCKmnTJk1J+gg0pQ8humOFxIJTcCXuwJ4t5+AInAGJEyBAg8ftBDd149hxdkT6FcfxTD7/4ziK02BH6+4BT43Rxxv8fH/xts3j6Pik8R6tHcz5+fpSPjWCpctrOL9c7WrGrvPKj8FrGiO7x/rS1RqS2QLIgNJkGLgDJQMq20dwOF5oI1g8mUJpKByIAdbADkzgYn5lCFbWEdNxzD0jxybT+f56MoWgMm7jk9mS5zYCky7yKmBCLIKh7IBZgsIJWwG7ub0Hm9pUgpXSdI0l6YKvA4J6fHqGKqI84hIxKqUIhkCY2BSMYvFcGYzvZVvHCEjXvfx4EWyYpPqLv+W2eRBK5pQK8NB9AqPcrVNXb+dnmz8GcBWVUOaIaryYe9vW+ioVgqmAihyrBUxVwvzLIZuAVTBdoEOAmKcWMBsbLYE5zSZBmq0xyQxlsy7sEyDsOaYLpoCoD6z5VwIoA+E4jsphe6UkIBESnS0BUZ9jHEBwTbfU1t5KCw+2V0q301Mlq3wfXXddT+9bif97XhBC1w/B8/tcnR5TN8jU7vqQyWPtTL3dNotpo9h9zOH5QSbt/0oMQIXxGMJoDMHZcKNBnMkfROCHTHTO2rHQv9/uRyNA0TO0Xsn/wRoO/ALnqBzHFWa9twAAAABJRU5ErkJggg%3D%3D"];

         var message_num = document.getElementById('message_alert_box');
         var m_num = 0;

         if (message_num) m_num = message_num.children[0].textContent.replace(/\D/g, '');

         var objButton = $('#menuTable li').eq(1).clone(true);

         objButton.find('.menu_icon')
                   .html('<a href="index.php?page=messages' +
                   ( (parseInt(getVersionOgame()[0])==3) ? '' : '&session=' + session ) +
                   '" target="_self">' +
                   '<img rel="' + arrMessages[2] +
                   '" src="' + ((m_num == 0) ? arrMessages[0] : arrMessages[1]) +
                   '" class="lpunktkit-micon" height="29" width="38"></a>');

         objButton.find('.menubutton')
                   .removeClass('selected')
                   .attr('href', 'index.php?page=messages' +
                   ( (parseInt(getVersionOgame()[0])==3) ? '' : '&session=' + session ))
                   .attr('target', '_self')
                   .find('.textlabel').html(LANG.MISC.txt_mensajes + ': ' + m_num);

         objButton.appendTo('#menuTable');

         message_num = document.getElementById('menuTable');
         if (m_num > 0)
             message_num.children[message_num.childElementCount-1].children[1].className = "menubutton premiumHighligt";

         if (document.location.href.indexOf('page=messages') > -1)
             message_num.children[message_num.childElementCount-1].children[1].className = "menubutton selected";

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('MessageButtonLeft [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Set the Focus Correctly
// description    Fixes som places in the game where the focus isn't set correctly.
// version        1.02
// date           2011-01-03
// author         Vesselin Bontchev
function FocusCorrectly()
{
  try {
         if (! set_Focus_Correctly) return;

         if (DEBUG_MODE > 0) GM_log('FocusCorrectly: ' + strPaginaActual);

         if (document.location.href.indexOf ("/game/index.php?page=search") >= 0)
           setTimeout ("document.getElementsByName ('searchtext') [0].focus ();", 100);

         else if (document.location.href.indexOf ("/game/index.php?page=fleet1") >= 0)
         {
           buttons = document.querySelectorAll ("a.max");
           for (var i = 0; i < buttons.length; i++)
             if (buttons [i].getAttribute ("onclick") != null)
             {
               var input = buttons [i].parentNode.childNodes [3];
               if (input.value)
                 continue
               input.focus ();
               break;
             }
         }
         else if (document.location.href.indexOf ("/game/index.php?page=galaxy") >= 0)
         {
           var focusSet = false;

           function setFocus ()
           {
             if (DEBUG_MODE > 2) GM_log('FocusCorrectly >> focusSet: ' + strPaginaActual);
             theInput = document.getElementById ("anz");
             if (theInput == null)
               focusSet = false;
             else
             {
               if (! focusSet)
               {
                 theInput.focus ();
                 focusSet = true;
               }
               if (theInput.getAttribute ("onkeypress") == null)
               {
                 theInput.setAttribute ("onkeydown",
                   "var keycode; " +
                   "if (event) " +
                     "keycode = window.event.keyCode; " +
                   "else if (e) " +
                     "keycode = e.which; " +
                   "else return true; " +
                   "if (keycode == 13) " +
                   "{ " +
                     "ajaxFormSubmit ('rocketForm', " +
                       "'index.php?page=missileattack_execute" +
                       ( (parseInt(getVersionOgame()[0])==3) ? '' : '&' + getSession()) +
                       "', launchMissiles); " +
                     "return false; "+
                   "} " +
                   "else " +
                     "return true;");
               }
             }
           }
           setInterval (setFocus, 500);
         }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('FocusCorrectly [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Fix the Universe Name in the Pillory
// description    Fixes the universe name in the Pillory.
// author         Vesselin Bontchev
// version        1.04
// date           2011-06-14
function UniverseNameInPillory()
{
  try {
       // The following "if" is not really necessary but with it this script will work for Opera too
       if (strPaginaActual != 'pranger')
         return;

       if (! show_Uni_Name_In_Pillory) return;

       if (DEBUG_MODE > 0) GM_log('UniverseNameInPillory: ' + strPaginaActual);

       var titles = document.getElementsByTagName ("title");

       if (titles.length <= 0)
         return;

       var titleText = titles [0].textContent;
       var master = document.getElementById ("master");

       if (master == null)
         return;

       var myHls = master.childNodes;

       if ((myHls == null) || (myHls.length < 2))
         return;

       var titleSpan = myHls [1].firstChild;

       if (titleSpan == null)
         return;

       var titleSpanText = titleSpan.textContent;
       var titleTextUniNums = titleText.match (/\d+/);

       if (titleTextUniNums.length < 1)
         return;

       var uniNum = titleTextUniNums [0];
       var uniNames = [
                         ["101", "Andromeda"],
                         ["102", "Barym"],
                         ["103", "Capella"],
                         ["104", "Draco"],
                         ["105", "Electra"],
                         ["106", "Fornax"],
                         ["107", "Gemini"],
                         ["108", "Hydra"],
                         ["109", "Io"],
                         ["110", "Jupiter"],
                         ["111", "Kassiopeia"],
                         ["112", "Leo"],
                         ["113", "Mizar"],
                         ["114", "Nekkar"],
                         ["115", "Orion"],
                         ["116", "Pegasus"],
                         ["117", "Quantum"],
                         ["118", "Rigel"],
                         ["119", "Sirius"],
                         ["120", "Taurus"],
                         ["121", "Ursa"],
                         ["122", "Vega"],
                         ["123", "Wasat"],
                         ["124", "Xalynth"],
                         ["125", "Yakini"],
                         ["126", "Zagadra"]
       ];

       for (var i = 0; i < uniNames.length; i++)
         if (uniNum == uniNames [i] [0])
         {
           titles [0].textContent = titleText.replace     (uniNum, uniNames [i] [1]);
           titleSpan.textContent  = titleSpanText.replace (uniNum, uniNames [i] [1]);
           break;

         }

       var theTable = document.getElementsByTagName ("table");

       if (theTable.length < 1)
         return;

       theTable = theTable [0];
       var theLines = theTable.rows;
       var lastPage = theTable.rows.length < 52;  // 50 lines per page, 1 header, 1 paginator
       var paginator = theTable.rows [theTable.rows.length - 1].cells [0];

       if (paginator.innerHTML.replace (/\s+/, "").length > 0)
         return;

       var parts = theUrl.split ("?&site=");
       var site = parts [0];
       var currentPage = (parts.length < 2) ? 1 : parseInt (parts [1]);

       function addButton (link, text)
       {
         if (DEBUG_MODE > 1) GM_log('UniverseNameInPillory >> addButton: ' + strPaginaActual);

         var myA = document.createElement ("a");
             myA.href = link;

         var myButton = document.createElement ("input");
             myButton.type = "button";
             myButton.value = text;

         myA.appendChild (myButton);
         return myA;
       }

       if (currentPage > 1)
       {
         paginator.appendChild (addButton (site + "?&site=1", "<<"));
         paginator.appendChild (document.createTextNode (" "));
         paginator.appendChild (addButton (site + "?&site=" + (currentPage - 1), "<"));
         paginator.appendChild (document.createTextNode (" "));
       }

       var mySpan = document.createElement ("span");
           mySpan.style.fontSize = "20px";
           mySpan.style.verticalAlign = "text-bottom";
           mySpan.appendChild (document.createTextNode (" " + currentPage + " "));

       paginator.appendChild (mySpan);

       if (! lastPage)
       {
         paginator.appendChild (document.createTextNode (" "));
         paginator.appendChild (addButton (site + "?&site=" + (currentPage + 1), ">"));
       }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('UniverseNameInPillory [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Planet Navigation Keys
// description    Adds previous/next planet buttons to the planet selector
// version        1.06
// date           2011-10-19
// author         Vesselin Bontchev
function PlanetNavigationKeys()
{
  try {
         var url = document.location.href;

         // The following "if" is not really necessary but with it this script will work for Opera too
         if ((url.indexOf ("/game/index.php?page=")                < 0) ||
             (url.indexOf ("&openJumpgate=1")                     >= 0) ||
             (url.indexOf ("/game/index.php?page=search")         >= 0) ||
             (url.indexOf ("/game/index.php?page=logout")         >= 0) ||
             (url.indexOf ("/game/index.php?page=buddies")        >= 0) ||
             (url.indexOf ("/game/index.php?page=notices")        >= 0) ||
             (url.indexOf ("/game/index.php?page=payment")        >= 0) ||
             (url.indexOf ("/game/index.php?page=showmessage")    >= 0) ||
//             (url.indexOf ("/game/index.php?page=traderOverview")    >= 0) ||
             (url.indexOf ("/game/index.php?page=searchLayer")    >= 0) ||
             (url.indexOf ("/game/index.php?page=rocketlayer")    >= 0) ||
             (url.indexOf ("/game/index.php?page=globalTechtree") >= 0))
           return;

         if (! show_Planet_Nav_Keys) return;

         if (DEBUG_MODE > 0) GM_log('PlanetNavigationKeys: ' + strPaginaActual);

         const min = "data:image/gif;base64," +
           "R0lGODlhDgALAOYAAN2YJt9yONpTC96iMN+POd+OOd54PN1zNt53Od53O995QN+FOt5xNt5qLd1q" +
           "Ld6cKdxqFt17H9lgE95tMd10M950Nt6bKt92MtpaENxqKtpTDNlZEtxzNuCKQ9tjGN+QO9tbFd93" +
           "N92AIN+CRtx/HN+ESttXE92XJd9vM9pcEN6gLdx1HNtaEt6rMN98Ot2PIdxwLNlUENtmENpVEt5s" +
           "L9ttGttTC918Idx2G918IN55Pd6jMd9wN9tvHNtjFt5tLd94PN5qLtxzMdthFdpnGd1sMOCIQN16" +
           "H9pcEt19It18M9xuHN+kMt+EO9xxFt51NtptGdxyHtlWEt95P95zNt1zN91yNttqFtx3G+CGTd2A" +
           "Jdx5Ht2ANNpWDtx4Hd+VON1+I9+PO9peEdtrGN+SPNpWEttfEt6dKuB/Q9pvHHhBJN+MNv///wAA" +
           "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5" +
           "BAAAAAAALAAAAAAOAAsAAAePgGpkH2EEBWtrh4hfak08AQEMKBM0RUENDj9oRgkGQAlsbE8UoUIX" +
           "Ix1TCgqhOgahCAguWQtVVqEcB6EHFVQhJRAgoTEzoWUmG1IsGTJIGKECGqE2Al1mME4eQxKhYimh" +
           "PkRLSiQ9NWNXoVBpoVErXC9HW1g4XhFgWkk3OSIEag8ATgCwcEbFgB1MBrRQEwgAOw==";

         const max = "data:image/gif;base64," +
           "R0lGODlhDgALAOYAAN2YJt9yONpTC96iMN+POd+OOd54PN1zNt53Od53O995QN+FOt5xNt5qLd1q" +
           "Ld6cKdxqFt17H9lgE95tMd10M950Nt6bKt92MtpaENxqKtpTDNlZEtxzNuCKQ9tjGN+QO9tbFd93" +
           "N92AIN+CRtx/HN+ESttXE92XJd9vM9pcEN6gLdx1HNtaEt6rMN98Ot2PIdxwLNlUENtmENpVEt5s" +
           "L9ttGttTC918Idx2G918IN55Pd6jMd9wN9tvHNtjFt5tLd94PN5qLtxzMdthFdpnGd1sMOCIQN16" +
           "H9pcEt19It18M9xuHN+kMt+EO9xxFt51NtptGdxyHtlWEt95P95zNt1zN91yNttqFtx3G+CGTd2A" +
           "Jdx5Ht2ANNpWDtx4Hd+VON1+I9+PO9peEdtrGN+SPNpWEttfEt6dKuB/Q9pvHHhBJN+MNv///wAA" +
           "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5" +
           "BAAAAAAALAAAAAAOAAsAAAeOgGpfa4QFhQRhH2RqaD8ODUFFNBMoDAEBPE0jF0JsbBRPnglABglG" +
           "WS4ICJ4GOp4KClMdJSFUFQeeBxyeVlULGSxSGyZlnjMxniAQMGZdAjaeGgKeGEgySktEPp4pYp4S" +
           "Qx5OXCtRnmlQnldjNT0kBCI5N0laYBFeOFhbRy9qLQNMdgxQccYCgBMAHqgJBAA7"

         var unsafe = window;
         try
         {
           unsafe = unsafeWindow
         }
         catch (e)
         {
         }

         var divCountColonies = document.getElementById ("countColonies");

         if (divCountColonies == null)
           return;

         var myAs = divCountColonies.parentNode.getElementsByTagName ("a");

         if (myAs.length < 2)
           return;

         var planetLinks = new Array ();
         var planetNames = new Array ();
         var planetCoords = new Array ();
         var activePlanet = -1;
         var j = 0;
         var onMoon = unsafe.resourceTickerMetal ["production"] <= 0;

         for (var i = 0; i < myAs.length; i++)
         {
              var thisA = myAs [i];
              if ((thisA.className.indexOf ("planetlink") > -1) ||
                  (thisA.className.indexOf ("moonlink") > -1))
              {
                  planetLinks.push (thisA);

                  var mySpans = thisA.getElementsByTagName ("span");

                  if (mySpans.length > 0)
                  {
                      planetNames.push (mySpans [0].textContent);
                      planetCoords.push (mySpans [1].textContent);
                  }
                  else
                  {
                      var title = thisA.getAttribute ("title").replace (/\|<b>(.+)<\/b>/i, "$1");
                      planetNames.push (title);
                      planetCoords.push (planetCoords [planetCoords.length - 1]);
                  }

                  if ((thisA.className.indexOf ("active") > -1) && ! onMoon)

                       activePlanet = j;

                  else if ( (thisA.className.indexOf ("moonlink") > -1) &&
                            (i > 0) &&
                            (myAs [i - 1].className.indexOf ("active") > -1) &&
                            onMoon)

                            activePlanet = j;
                  j++;
              }
         }
         var numPlanets = planetLinks.length;

         if ((numPlanets < 2) || (activePlanet < 0))
           return;

         var myCenter = document.createElement ("center");

         function createButton (left)
         {
              if (DEBUG_MODE > 1) GM_log('PlanetNavigationKeys >> createButton: ' + strPaginaActual);

              var index = ((left) ? (activePlanet + numPlanets - 1) :
                                    (activePlanet + 1)) % numPlanets;
              var myA = document.createElement ("a");
              var myImg = document.createElement ("img");

              //myImg.setAttribute ("src", "img/navigation/icon-" + ((left) ? "min" : "max") + "-small.gif");
              myImg.setAttribute ("src", (left) ? min : max);
              myImg.setAttribute ("width", 20);
              myA.appendChild (myImg);
              myA.href = planetLinks [index].href;
              myA.title = "" + planetNames [index] + " " + planetCoords [index];
              myA.className = "tipsStandard";

              return myA;
         }

         myCenter.appendChild (createButton (true));
         myCenter.appendChild (document.createTextNode (" "));
         myCenter.appendChild (createButton (false));

         divCountColonies.appendChild (myCenter);
         divCountColonies.style.display = 'block';

       //  if (numPlanets <= 5) document.getElementsByClassName("smallplanet")[0].setAttribute('style', 'position:relative;top:5px');

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('PlanetNavigationKeys [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// version        0.08
// name           Compactador Batallas
// author         HoChiChaos
// date           2010-05-01
function CompactadorBatallas()
{
   try {
         if ( ( location.href.indexOf('page=messages') < 0 ) &&
              ( location.href.indexOf('page=combatreport') < 0 ) )
            return;

         if (! show_Compactador_Batallas)
             return;

         if (DEBUG_MODE > 0) GM_log('CompactadorBatallas: ' + strPaginaActual);

         //Cargamos colores y textos del CR y su config.
         LoadColoresCR(usar_CR_Friki && availCRFriki);

         //Cargamos datos de naves y defensas
         LoadDatosFlota(usar_CR_Friki && availCRFriki);

         //var compactador = document.createElement('div');

         // jQuery
         var unsafe = (typeof unsafeWindow) != "undefined" ? unsafeWindow : window;
         var $ = unsafe.jQuery;
         if ( !$ ) return;

         //$('body').ajaxSuccess(function(e,xhr,settings){
         $(document).ajaxSuccess(function(e,xhr,settings){
            if(settings.url.indexOf("/game/index.php?page=combatreport") != -1) {
               generarPatron();
            }
         });


         function SAC() {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> SAC: ' + strPaginaActual);

             var lstNombres = new Array();
             var lstFlotas = new Array();

             this.length = function() {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> SAC >> length: ' + strPaginaActual);

                  return lstNombres.length
             }

             this.getNombre = function(n) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> SAC >> getNombre: ' + strPaginaActual);

                  return lstNombres[n];
             }


             this.getFlotas = function(n) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> SAC >> getFlotas: ' + strPaginaActual);

                  var ret = null;

                  if(isNaN(parseInt(n))) {
                     for(var i = 0; i < lstNombres.length; i++) {
                         if(lstNombres[i] == n) ret = lstFlotas[i];

                     }
                  }
                  else {
                        ret = lstFlotas[n];
                  }

                  return ret;
             }


             this.add = function (nombre, idFlota, unidades) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> SAC >> add: ' + strPaginaActual);

                  var insertado = false;

                  for (var i = 0; i < lstNombres.length; i++) {
                       if(lstNombres[i] == nombre) {
                          insertado = true;

                          if(arguments.length == 3)
                             lstFlotas[i].add(idFlota, unidades);
                       }
                  }

                  if(! insertado) {
                     var pos = lstNombres.length;
                     lstNombres[pos] = nombre;
                     lstFlotas[pos] = new Flota();

                     if(arguments.length == 3)
                        lstFlotas[pos].add(idFlota, unidades);
                  }

             }

             this.addSupervivientes = function(s) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> SAC >> addSupervivientes: ' + strPaginaActual);

                  for(var i = 0; i < s.length(); i++) {

                      var nombre = s.getNombre(i);

                      for(var j = 0; j < lstNombres.length; j++){

                          if(lstNombres[j] == nombre)
                             lstFlotas[j].addSupervivientes(s.getFlotas(i));

                      }
                  }
             }


             this.ordenar = function() {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> SAC >> ordenar: ' + strPaginaActual);

                  for(var i = 0; i < lstNombres.length; i++) {
                      lstFlotas[i].ordenar();
                  }
             }


             this.getCostePerdidas = function(id) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> SAC >> getCostePerdidas: ' + strPaginaActual);

                  var ret = [0,0,0, 0]; // metal, cristal, deu, total

                  if(id == -1) {
                     for(var i = 0; i < lstNombres.length; i++) {

                         var coste = lstFlotas[i].getCostePerdidas();
                         ret[0] += coste[0];
                         ret[1] += coste[1];
                         ret[2] += coste[2];
                         ret[3] += coste[3];
                     }
                  }
                  else {
                        var coste = lstFlotas[id].getCostePerdidas();
                        ret[0] += coste[0];
                        ret[1] += coste[1];
                        ret[2] += coste[2];
                        ret[3] += coste[3];
                  }


                  return ret;
             }

         } //function SAC


         function Flota() {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota: ' + strPaginaActual);

             var idNombre = new Array();
             var nombre = new Array();
             var unidades = new Array();
             var perdidas = new Array();

             this.length = function () {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> length: ' + strPaginaActual);

                  return idNombre.length;
             }

             this.getId = function(n) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> getId: ' + strPaginaActual);

                  return idNombre[n];
             }

             this.getNombre = function(n) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> getNombre: ' + strPaginaActual);

                  var id = idNombre[n]
                  var ret = id;

                  for(var i = 0; i < arrDatosFlota.length; i++) {
                      if(id == arrDatosFlota[i][0]) ret = arrDatosFlota[i][1];
                  }

                  return ret;
             }

             this.getUnidades = function(n) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> getUnidades: ' + strPaginaActual);

                  return unidades[n];
             }

             this.getPerdidas = function(n) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> getPerdidas: ' + strPaginaActual);

                  return perdidas[n];
             }

             this.add = function(id, u) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> add: ' + strPaginaActual);

                  var insertado = false;

                  for(var i = 0; i < idNombre.length; i++) {

                      if(idNombre[i] == id) {
                         insertado = true;
                         unidades[i] += parseInt(u);
                         perdidas[i] += parseInt(u);
                      }
                  }

                  if(! insertado) {
                     var pos = idNombre.length;
                     idNombre[pos] = id;
                     nombre[pos] = '';
                     unidades[pos] = parseInt(u);
                     perdidas[pos] = parseInt(u);
                  }
             }

             this.addSupervivientes = function(f) {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> addSupervivientes: ' + strPaginaActual);

                  for(var i = 0; i < f.length(); i++) {

                      for(var j = 0; j < idNombre.length; j++) {

                          if(idNombre[j] == f.getId(i)) {
                             perdidas[j] -= parseInt(f.getUnidades(i));
                          }
                      }
                  }
             }


             this.ordenar = function() {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> ordenar: ' + strPaginaActual);

                  var n_idNombre = new Array();
                  var n_nombre = new Array();
                  var n_unidades = new Array();
                  var n_perdidas = new Array();

                  var contador = 0;

                  for(var i = 0; i < arrDatosFlota.length; i++) {

                      for(var j = 0; j < idNombre.length; j++) {

                          if(idNombre[j] == arrDatosFlota[i][0]) {
                             n_idNombre[contador] = idNombre[j];
                             n_nombre[contador] = arrDatosFlota[i][1];
                             n_unidades[contador] = unidades[j];
                             n_perdidas[contador] = perdidas[j];
                             contador++;
                          }
                      }
                  }

                  idNombre = n_idNombre;
                  nombre = n_nombre;
                  unidades = n_unidades;
                  perdidas = n_perdidas;
             }

             this.getCostePerdidas = function() {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> getCostePerdidas: ' + strPaginaActual);

                  var ret = [0,0,0, 0];

                  for(var i = 0; i < idNombre.length; i++) {

                      for(var j = 0; j < arrDatosFlota.length; j++) {

                          if (idNombre[i] == arrDatosFlota[j][0]) {
                              ret[0] += (perdidas[i] * arrDatosFlota[j][2]);
                              ret[1] += (perdidas[i] * arrDatosFlota[j][3]);
                              ret[2] += (perdidas[i] * arrDatosFlota[j][4]);
                              ret[3] += ((perdidas[i] * arrDatosFlota[j][2]) +
                                         (perdidas[i] * arrDatosFlota[j][3]) +
                                         (perdidas[i] * arrDatosFlota[j][4]));
                          }
                      }
                  }

                  return ret;
             }

             // Devuelve el coste de todas las vaves de un jugador (ratio 2:1.5:1)
             this.getCosteUnidades = function() {
                  if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> Flota >> getCosteUnidades: ' + strPaginaActual);

                  var ret = [0,0,0,0];

                  for(var i = 0; i < idNombre.length; i++) {

                      for(var j = 0; j < arrDatosFlota.length; j++) {

                          if (idNombre[i] == arrDatosFlota[j][0]) {
                              ret[0] = (unidades[i] * arrDatosFlota[j][2] * rat_Metal_SAC);
                              ret[1] = (unidades[i] * arrDatosFlota[j][3] * rat_Cristal_SAC);
                              ret[2] = (unidades[i] * arrDatosFlota[j][4] * rat_Deuterio_SAC);
                              ret[3] += ret[0] + ret[1] + ret[2];

                              if (DEBUG_MODE > 2)
                                  GM_log(idNombre[i] + '(' + unidades[i] + '): ' +
                                         addDots(roundNumber(ret[0], 0)) + ' + ' +
                                         addDots(roundNumber(ret[1], 0)) + ' + ' +
                                         addDots(roundNumber(ret[2], 0)) + ' = ' + addDots(ret[3]));
                          }
                      }
                  }

                  return ret[3];
             }
         } //function Flota

         function getElementsByClass(cls) {
            var itemsfound = new Array;
            var elements = document.getElementsByTagName('*');
            for(var i=0;i<elements.length;i++){
                if(elements[i].className == cls){
                   itemsfound.push(elements[i]);
                }
            }
            return itemsfound;
         }

         function getElementsByClass(searchClass,node,tag) {
            var classElements = new Array();
            if (node == null)
                node = document;
            if (tag == null)
                tag = '*';
            var els = node.getElementsByTagName(tag);
            var elsLen = els.length;

            for (var i = 0, j = 0; i < elsLen; i++) {
                 var sep = els[i].className.split(" ");
                 var content = false;

                 for(var k = 0; k < sep.length; k++){
                     if(sep[k] == searchClass)
                     content = true;
                 }

                 if (els[i].className == searchClass || content) {
                     classElements[j] = els[i];
                     j++;
                 }
            }
            return classElements;
         }

         function mostrarNumero(num) {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> mostrarNumero: ' + strPaginaActual);

             var negativo = false;

             if(parseInt(num) < 0) {
                num = parseInt(num)*-1;
                negativo = true;
             }

             var nNmb = String(parseInt(num));
             var sRes = "";

             for (var j = 0, i = nNmb.length - 1; i >= 0; i--, j++)
                  sRes = nNmb.charAt(i) +
                         ((j > 0) && (j % 3 == 0)? ".": "") +
                         sRes;

             if(negativo) sRes = '-' + sRes;

             return sRes;
         } //function mostrarNumero

         function N(num) {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> N: ' + strPaginaActual);

             var ret = new Array();

             if(typeof num == 'object') {

                for(var i = 0; i < num.length; i++) {

                    ret[i] = mostrarNumero(num[i]);
                }

                return ret;
             }
             else {
                return mostrarNumero(num);
             }
         }//function N

         function codificar(patron, tipo) {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> codificar: ' + strPaginaActual);

             var marcas = new Array();
             var txt_firma = LANG.CR.txt_auto + ' LPuNKTKit [' + VERSION_LPUNKTKIT + ']{NL}';

             switch (tipo) {

             case "HTML":
                         patron = patron.replace(/{COLOR_AU1}/gi, '{COLOR_A1}');
                         patron = patron.replace(/{COLOR_DU1}/gi, '{COLOR_A1}');
                         patron = patron.replace(/{\/COLOR_AU1}/gi, '{/COLOR}');
                         patron = patron.replace(/{\/COLOR_DU1}/gi, '{/COLOR}');

                         marcas = [
                            [/{B}/gi, '<b>'],
                            [/{\/B}/gi, '</b>'],
                            [/{I}/gi, '<i>'],
                            [/{\/I}/gi, '</i>'],
                            [/{NL}/gi, '<br>\n'],
                            [/{CENTER}/gi, '<center>'],
                            [/{\/CENTER}/gi, '</center>'],
                            [/{SIZE_PEQ}/gi, '<font style="font-size:8pt;">'],
                            [/{SIZE_MED}/gi, '<font style="font-size:14pt;">'],
                            [/{SIZE_GRA}/gi, '<font style="font-size:18pt;">'],
                            [/{\/SIZE}/gi, '</font>'],
                            [/{\/COLOR_AU1}/gi, '</font>'],
                            [/{\/COLOR_DU1}/gi, '</font>'],
                            [/{\/COLOR_T}/gi, '</font>'],
                            [/{\/COLOR_O}/gi, '</font>'],
                            [/{\/COLOR}/gi, '</font>']
                         ];

                         patron = '{CENTER}' +  patron + '{/CENTER}';

                         patron = patron.replace(/{ENLACE_SCRIPT}/gi,
                                                 '<a href="' + strUrl_Script + '">' +
                                                 '<font color="' + strColor_LPuNKTKit + '">' +
                                                 txt_firma + '</font></a>');

                         for(var i = 0; i < arrColorBatalla.length; i++)
                             patron = patron.replace(arrColorBatalla[i][0],
                                                     '<font color="' + arrColorBatalla[i][1] + '">');

                         break;

             case "OGame":
                         patron = patron.replace(/{COLOR_AU1}/gi, '{COLOR_A1}');
                         patron = patron.replace(/{COLOR_DU1}/gi, '{COLOR_A1}');
                         patron = patron.replace(/{\/COLOR_AU1}/gi, '{/COLOR}');
                         patron = patron.replace(/{\/COLOR_DU1}/gi, '{/COLOR}');

                          marcas = [
                            [/{B}/gi, '[B]'],
                            [/{\/B}/gi, '[/B]'],
                            [/{I}/gi, '[I]'],
                            [/{\/I}/gi, '[/I]'],
                            [/{NL}/gi, '\n'],
                            [/{CENTER}/gi, '[CENTER]'],
                            [/{\/CENTER}/gi, '[/CENTER]'],
                            [/{SIZE_PEQ}/gi, '[SIZE=10]'],
                            [/{SIZE_MED}/gi, '[SIZE=14]'],
                            [/{SIZE_GRA}/gi, '[SIZE=18]'],
                            [/{\/SIZE}/gi, '[/SIZE]'],
                            [/{\/COLOR_AU1}/gi, '[/COLOR]'],
                            [/{\/COLOR_DU1}/gi, '[/COLOR]'],
                            [/{\/COLOR_T}/gi, '[/COLOR]'],
                            [/{\/COLOR_O}/gi, '[/COLOR]'],
                            [/{\/COLOR}/gi, '[/COLOR]']
                          ];

//                          patron = '{CENTER}' +  patron + '{/CENTER}';

                          patron = patron.replace(/{ENLACE_SCRIPT}/gi,
                                                  '[URL="' + strUrl_Script + '"]' +
                                                  '[COLOR="' + strColor_LPuNKTKit + '"]' +
                                                  txt_firma + '[/COLOR][/URL]');

                          for(var i = 0; i < arrColorBatalla.length; i++)
                              patron = patron.replace(arrColorBatalla[i][0],
                                                      '[COLOR="' + arrColorBatalla[i][1] + '"]');

                          break;

             case "phpBB":
                         patron = patron.replace(/{COLOR_AU1}/gi, '{COLOR_A1}');
                         patron = patron.replace(/{COLOR_DU1}/gi, '{COLOR_A1}');
                         patron = patron.replace(/{\/COLOR_AU1}/gi, '{/COLOR}');
                         patron = patron.replace(/{\/COLOR_DU1}/gi, '{/COLOR}');

                          marcas = [
                            [/{B}/gi, '[B]'],
                            [/{\/B}/gi, '[/B]'],
                            [/{I}/gi, '[I]'],
                            [/{\/I}/gi, '[/I]'],
                            [/{NL}/gi, '\n'],
                            [/{CENTER}/gi, '[CENTER]'],
                            [/{\/CENTER}/gi, '[/CENTER]'],
                            [/{SIZE_PEQ}/gi, '[SIZE=9]'],
                            [/{SIZE_MED}/gi, '[SIZE=14]'],
                            [/{SIZE_GRA}/gi, '[SIZE=18]'],
                            [/{\/SIZE}/gi, '[/SIZE]'],
                            [/{\/COLOR_AU1}/gi, '[/COLOR]'],
                            [/{\/COLOR_DU1}/gi, '[/COLOR]'],
                            [/{\/COLOR_T}/gi, '[/COLOR]'],
                            [/{\/COLOR_O}/gi, '[/COLOR]'],
                            [/{\/COLOR}/gi, '[/COLOR]']
                          ];

//                          patron = '{CENTER}' +  patron + '{/CENTER}';

                          patron = patron.replace(/{ENLACE_SCRIPT}/gi,
                                                  '[URL=' + strUrl_Script + ']' +
                                                  '[COLOR=' + strColor_LPuNKTKit +
                                                  ']' + txt_firma + '[/COLOR][/URL]');

                          for(var i = 0; i < arrColorBatalla.length; i++)
                              patron = patron.replace(arrColorBatalla[i][0],
                                                      '[COLOR=' + arrColorBatalla[i][1] + ']');

                          break;

             case "phpBB3":
                         patron = patron.replace(/{COLOR_AU1}/gi, '{COLOR_A1}');
                         patron = patron.replace(/{COLOR_DU1}/gi, '{COLOR_A1}');
                         patron = patron.replace(/{\/COLOR_AU1}/gi, '{/COLOR}');
                         patron = patron.replace(/{\/COLOR_DU1}/gi, '{/COLOR}');

                         marcas = [
                             [/{B}/gi, '[b]'],
                             [/{\/B}/gi, '[/b]'],
                             [/{I}/gi, '[i]'],
                             [/{\/I}/gi, '[/i]'],
                             [/{NL}/gi, '\n'],
                             [/{CENTER}/gi, '[center]'],
                             [/{\/CENTER}/gi, '[/center]'],
                             [/{SIZE_PEQ}/gi, '[size=90]'],
                             [/{SIZE_MED}/gi, '[size=140]'],
                             [/{SIZE_GRA}/gi, '[size=180]'],
                             [/{\/SIZE}/gi, '[/size]'],
                             [/{\/COLOR_AU1}/gi, '[/color]'],
                             [/{\/COLOR_DU1}/gi, '[/color]'],
                             [/{\/COLOR_T}/gi, '[/color]'],
                             [/{\/COLOR_O}/gi, '[/color]'],
                             [/{\/COLOR}/gi, '[/color]']
                         ];

                         patron = patron.replace(/{ENLACE_SCRIPT}/gi,
                                                   '[URL=' + strUrl_Script + ']' +
                                                   '[COLOR=' + strColor_LPuNKTKit +
                                                   ']' + txt_firma + '[/COLOR][/URL]');

                         for(var i = 0; i < arrColorBatalla.length; i++)
                             patron = patron.replace(arrColorBatalla[i][0],
                                                     '[COLOR=' + arrColorBatalla[i][1] + ']');

                         break;

             case "MESSAGES":
                             marcas = [
                                       [/{B}/gi, '[B]'],
                                       [/{\/B}/gi, '[/B]'],
                                       [/{I}/gi, '[I]'],
                                       [/{\/I}/gi, '[/I]'],
                                       [/{NL}/gi, '\n'],
                                       [/{CENTER}/gi, '[CENTER]'],
                                       [/{\/CENTER}/gi, '[/CENTER]'],
                                       [/{SIZE_PEQ}/gi, '[SIZE=9]'],
                                       [/{SIZE_MED}/gi, '[SIZE=14]'],
                                       [/{SIZE_GRA}/gi, '[SIZE=18]'],
                                       [/{\/SIZE}/gi, '[/SIZE]'],
                                       [/{\/COLOR_T}/gi, ''],
                                       [/{\/COLOR_O}/gi, ''],
                                       [/{\/COLOR}/gi, '[/COLOR]']
                             ];

                             patron = patron.replace(/{ENLACE_SCRIPT}/gi,
                                      '[URL=' + strUrl_Script + ']' +
                                      '[COLOR=lime]' + txt_firma + '[/COLOR][/URL]');

                             patron = patron.replace(/{COLOR_T1}/gi,'');
                             patron = patron.replace(/{COLOR_A1}/gi, '[COLOR=#00FF40]');
                             patron = patron.replace(/{COLOR_AU1}/gi, '');
                             patron = patron.replace(/{\/COLOR_AU1}/gi, '');
                             patron = patron.replace(/{COLOR_A2}/gi, '[COLOR=#00DDDD]');
                             patron = patron.replace(/{COLOR_D1}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_DU1}/gi, '');
                             patron = patron.replace(/{\/COLOR_DU1}/gi, '');
                             patron = patron.replace(/{COLOR_D2}/gi, '[COLOR=#00DDDD]');
                             patron = patron.replace(/{COLOR_R1}/gi, '[COLOR=#F0EC64]');
                             patron = patron.replace(/{COLOR_R2}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_R4}/gi, '[COLOR=#F0EC64]');
                             patron = patron.replace(/{COLOR_R3}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_RA1}/gi, '[COLOR=#00FF40]');
                             patron = patron.replace(/{COLOR_RAM1}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_RAC1}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_RAD1}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_RA2}/gi, '[COLOR=#00DDDD]');
                             patron = patron.replace(/{COLOR_RAM2}/gi, '[COLOR=#00DDDD]');
                             patron = patron.replace(/{COLOR_RAC2}/gi, '[COLOR=#00DDDD]');
                             patron = patron.replace(/{COLOR_RAD2}/gi, '[COLOR=#00DDDD]');
                             patron = patron.replace(/{COLOR_RD}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_RDM}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_RDC}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_RDD}/gi, '[COLOR=#ED7010]');
                             patron = patron.replace(/{COLOR_L}/gi, '[COLOR=#F0EC64]');
                             patron = patron.replace(/{COLOR_IN}/gi, '');

                             break;
             }

             for(var i = 0; i < marcas.length; i++)
                 patron = patron.replace(marcas[i][0],marcas[i][1]);


             return patron;
         } //function codificar

         function getLuna() {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getLuna: ' + strPaginaActual);

             var salida = "";
             var ret = new Array();
             var cresult = document.getElementById('combat_result');
             var str_luna = getElementsByClass('action',cresult)[1].innerHTML.split('<br>');

             if(str_luna.length >= 5) {
                salida =  trim(str_luna[3].replace(/(^s*)|(s*$)/g,""));
             }

             if(str_luna.length == 6) {
                salida += '{NL}' + trim(str_luna[4].replace(/(^s*)|(s*$)/g,""));
             }

             return salida;
         } //function getLuna

         function getEscombros() {
           try {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getEscombros: ' + strPaginaActual);

             var ret = new Array();
             var cresult = document.getElementById('combat_result');
             var str_escombros = getElementsByClass('action',
                                 cresult)[1].innerHTML.split('<br>')[2];
             ret[0] = parseInt(str_escombros.split(LANG.SERVER.txt_CR_and)[0].replace(/\D/g,''));
             ret[1] = parseInt(str_escombros.split(LANG.SERVER.txt_CR_and)[1].replace(/\D/g,''));
             ret[2] = parseInt(ret[0]) + parseInt(ret[1]);

             return ret;

           } catch(e) {
             if (DEBUG_MODE != 0) GM_log('CompactadorBatallas >> getEscombros [ERROR]: < ' + e + '> ' + strPaginaActual);
           }
         } //function getEscombros

         function getCaptura() {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getCaptura: ' + strPaginaActual);

             var ret = [0, 0, 0, 0];

             if(getMensajeConclusion().indexOf(LANG.SERVER.txt_CR_attacker.toLowerCase()) != -1) {
                var cresult = document.getElementById('combat_result');

                var str_captura = getElementsByClass('action',cresult,'p')[0].innerHTML;
                var str_metal = str_captura.substring(str_captura.indexOf(LANG.CR.txt_captured),
                                                      str_captura.toLowerCase().indexOf(LANG.SERVER.txt_RES_metal.toLowerCase()));
                var str_cristal = str_captura.substring(str_captura.indexOf(','),
                                                        str_captura.toLowerCase().indexOf(LANG.SERVER.txt_RES_cristal.toLowerCase()));
                var str_deu = str_captura.substring(str_captura.indexOf(LANG.SERVER.txt_CR_and),
                                                    str_captura.toLowerCase().indexOf(LANG.SERVER.txt_RES_deuterio.toLowerCase()));

                if(str_metal.length == 0) str_metal = '0';
                if(str_cristal.length == 0) str_cristal = '0';
                if(str_deu.length == 0) str_deu = "0";

                ret[0] = parseInt(str_metal.replace(/\D/g,''));
                ret[1] = parseInt(str_cristal.replace(/\D/g,''));
                ret[2] = parseInt(str_deu.replace(/\D/g,''));
                ret[3] = parseInt(ret[0]) + parseInt(ret[1]) + parseInt(ret[2]);
             }

             return ret;
         } //function getCaptura

         function getFecha() {
             try {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getFecha: ' + strPaginaActual);

             var listaMes = [
                               LANG.SERVER.txt_CR_DATE_enero,
                               LANG.SERVER.txt_CR_DATE_febrero,
                               LANG.SERVER.txt_CR_DATE_marzo,
                               LANG.SERVER.txt_CR_DATE_abril,
                               LANG.SERVER.txt_CR_DATE_mayo,
                               LANG.SERVER.txt_CR_DATE_junio,
                               LANG.SERVER.txt_CR_DATE_julio,
                               LANG.SERVER.txt_CR_DATE_agosto,
                               LANG.SERVER.txt_CR_DATE_septiembre,
                               LANG.SERVER.txt_CR_DATE_octubre,
                               LANG.SERVER.txt_CR_DATE_noviembre,
                               LANG.SERVER.txt_CR_DATE_diciembre
                            ];

             var strFecha = getElementsByClass("start");

             if (strFecha.length > 0) {
               strFecha = strFecha[0].innerHTML;
               strFecha = strFecha.substring(strFecha.indexOf('(')+1,
                                             strFecha.indexOf(')'));

               var fecha = strFecha.split(" ")[0];
               var hora = strFecha.split(" ")[1];

               var dia = fecha.split(".")[0];
               var mes = fecha.split(".")[1];
               var anyo = fecha.split(".")[2];

               if (parseInt(mes) == 0)
                   return (dia + ' ' + LANG.CR.txt_De + ' ' + listaMes[mes-1] +
                                 ' ' + LANG.CR.txt_De + ' ' + anyo)
               else
                   return (dia + ' ' + LANG.CR.txt_De + ' ' + listaMes[parseInt(mes)-1] +
                                 ' ' + LANG.CR.txt_De + ' ' + anyo);
             }

             } catch(e) {
               if (DEBUG_MODE > 0) GM_log('CompactadorBatallas >> getFecha [ERROR] : ' + e + ' << ' + strPaginaActual);
             }

         }//function getFecha

         function getMensajeConclusion() {
           try {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getMensajeConclusion: ' + strPaginaActual);

             var ret = '';
             var cresult = document.getElementById('combat_result');
             var str = getElementsByClass('action',cresult,'p')[0].innerHTML;

             if(str.indexOf(LANG.SERVER.txt_CR_attacker.toLowerCase()) != -1)
                ret = LANG.CR.txt_AttWin
             else if(str.indexOf(LANG.SERVER.txt_CR_Defender.toLowerCase()) != -1)
                ret = LANG.CR.txt_DefWin
             else
                ret = LANG.CR.txt_Empate;

             return ret;

           } catch(e) {
             if (DEBUG_MODE != 0) GM_log('CompactadorBatallas >> getMensajeConclusion [ERROR]: ' + e + ' << ' + strPaginaActual);
           }
         } //function getMensajeConclusion

         function calcularRecicladores(escombros) {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> calcularRecicladores: ' + strPaginaActual);

             var ret = 0;

             if(escombros > 0) ret = (parseInt(escombros)/arrDatosFlota[11][5])+1;

             return ret;
         } //function calcularRecicladores

         function getNumRondas() {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getNumRondas: ' + strPaginaActual);

             var ret = getElementsByClass("combat_round").length-1;

             return ret;

         } //function getNumRondas

         function getCuadrosBBCode(txtFecha, patron, txtEscombros, txtPerdidas, profitAtt_0,
                                   profitAtt_1, profitAtt_2, profitAtt_3, txtResto) {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getCuadrosBBCode: ' + strPaginaActual);

             var html = "";

             // cuadros de texto
             html += '<table cellspacing="0" cellpadding="0" width=96%>';
             html += '<tr><td width=48%>';

             // foro ogame
             html += '<b><font color=' + strColor_LPuNKTKit +
                     '>' + LANG.CR.txt_foro + ' OGame:</font></b><br>';
             html += '<textarea id="txtBB" name="txtBB" style="background-color:' +
                     '#1F273C;width:100%;height:100px;border: 2px solid ' +
                     '#FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';

             html += codificar(txtFecha + patron + txtEscombros + txtPerdidas + profitAtt_0 +
                               profitAtt_1 + profitAtt_2 + profitAtt_3 + txtResto, "OGame");
             html += '</textarea><br><br>';
             html += '</td>';

             html += '<td width=4%></td>';

             // foro phpBB
             html += '<td width=48%><b><font color=' + strColor_LPuNKTKit +
                     '>' + LANG.CR.txt_foro + ' phpBB:</font></b><br>';
             html += '<textarea id="txtBB" name="txt_phpBB" style="background-' +
                     'color:#1F273C;width:100%;height:100px;border: 2px solid ' +
                     '#FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
             html += codificar(txtFecha + patron + txtEscombros + txtPerdidas + profitAtt_0 +
                               profitAtt_1 + profitAtt_2 + profitAtt_3 + txtResto, "phpBB");
             html += '</textarea><br><br>';
             html += '</td></tr>';

             // foro phpBB3
             html += '<tr><td><b><font color=' + strColor_LPuNKTKit +
                     '>' + LANG.CR.txt_foro + ' phpBB 3:</font></b><br>';
             html += '<textarea id="txtBB" name="txt_phpBB" style="background-' +
                     'color:#1F273C;width:100%;height:100px;border: 2px solid ' +
                     '#FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
             html += codificar(txtFecha + patron + txtEscombros + txtPerdidas + profitAtt_0 +
                     profitAtt_1 + profitAtt_2 + profitAtt_3 + txtResto, "phpBB3");
             html += '</textarea><br><br>';
             html += '</td>'

             html += '<td></td>';
             // html
             html += '<td><b><font color=' + strColor_LPuNKTKit +
                     '>HTML:</font></b><br>';
             html += '<textarea id="txtBB" name="txt_phpBB" style="background-' +
                     'color:#1F273C;width:100%;height:100px;border: 2px solid ' +
                     '#FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
             html += codificar(txtFecha + patron + txtEscombros + txtPerdidas + profitAtt_0 +
                     profitAtt_1 + profitAtt_2 + profitAtt_3 + txtResto, "HTML");
             html += '</textarea><br><br>';
             html += '</td></tr>';

             // messages
             html += '<tr><td colspan=3>' +
                     '<b><font color=' + strColor_LPuNKTKit + '>MESSAGES:</font></b><br>';
             html += '<textarea id="txtBB" name="txt_phpBB" style="background-' +
                     'color:#1F273C;width:100%;height:60px;border: 2px solid ' +
                     '#FFFFFF;color:#FFFFFF" onFocus="javascript:this.select()">';
             html += codificar(replaceAll( patron, LANG.CR.txt_lost + ' ', '-') + txtEscombros +
                               profitAtt_0 + profitAtt_1 + txtResto, "MESSAGES");

//             html += codificar(patron + txtEscombros +
//                               profitAtt_0 + profitAtt_1 + txtResto, "MESSAGES");
             html += '</textarea><br><br>';
             html += '</td></tr></table>';

             html += '</table>';

             return html;

         } //function getCuadrosBBCode

         function getColumnas(tabla){
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getColumnas: ' + strPaginaActual);

             return tabla.rows[0].cells.length;
         }

         function getFilas(tabla){
            if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getFilas: ' + strPaginaActual);

            return tabla.rows.length;
         }

         function getContenido(tabla, fila, col)
         {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getContenido: ' + strPaginaActual);

             var rowElem = tabla.rows[fila];
             var tdValue = rowElem.cells[col].innerHTML;

             return tdValue;
         }

         function getFlotas(numRonda, ataque) {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> getFlotas: ' + strPaginaActual);

             var ret = new SAC();

             var cround = getElementsByClass("combat_round");
             var maxRondas = cround.length-1;


             if(ronda > maxRondas) return 0 // excede el num de rondas

             // ronda de ataque o defensa
             var idTipoBando = (ataque)? 'round_attacker':'round_defender';

             var ronda = cround[numRonda];

             var rondaBando = getElementsByClass(idTipoBando, ronda)[0];
             var newBack = getElementsByClass("newBack", rondaBando);

             for(var i = 0; i < newBack.length ; i++ ) {
                 var destroyed = getElementsByClass("destroyed", newBack[i])[0];
                 if(typeof destroyed != 'undefined') {
                     var nombre = destroyed.innerHTML;
                     nombre = nombre.replace(LANG.SERVER.txt_CR_theDefender + ' ', '');
                     nombre = nombre.replace(LANG.SERVER.txt_CR_destroyed, '');
                     ret.add(nombre);
                 }
                 else {

                     var nombre = getElementsByClass("name",
                                                     newBack[i])[0].firstChild.textContent;
                     var tabla = newBack[i].getElementsByTagName("TABLE")[0];

                     nombre = nombre.replace(LANG.SERVER.txt_CR_attacker + ' ', '');
                     nombre = nombre.replace(LANG.SERVER.txt_CR_Defender + ' ', '');

                     for(var j = 1; j < getColumnas(tabla); j++) {
                         nave = getContenido(tabla, 0, j);
                         cantidad = getContenido(tabla, 1, j).replace(/\./gi, '');
                         ret.add(nombre, nave, cantidad);
                     }
                 }
             }


             return ret;
         } // function getFlotas

         function actualizar () {
             if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> actualizar: ' + strPaginaActual);

             var codHTML = document.getElementById("codHTML");
             var txtBB = document.getElementById("txtBB");
             var txtInfo = document.getElementById("txtInfo");
             var tipoCodif = document.F1.lstBB.options[document.F1.lstBB.selectedIndex].value;

             txtInfo.innerHTML = 'C\u00f3digo ' + tipoCodif;

             codHTML.innerHTML = codificar(patron, "HTML", document.F1.centrado.checked);
             txtBB.value = codificar(patron, tipoCodif, document.F1.centrado.checked);

         } //function actualizar

         function generarPatron () {
           try {
            if (DEBUG_MODE > 1) GM_log('CompactadorBatallas >> generarPatron: ' + strPaginaActual);

            var patron = '';

            var compactador = document.createElement('div');

            // atacantes
            var lstAtaq = getFlotas(0, true);
            var lstAtaq_final = getFlotas(getNumRondas(), true);
            lstAtaq.addSupervivientes(lstAtaq_final);

            // defensores
            var lstDef = getFlotas(0, false);
            var lstDef_final = getFlotas(getNumRondas(), false);
            lstDef.addSupervivientes(lstDef_final);

            lstAtaq.ordenar();
            lstDef.ordenar();

            var perdidasAtaq = lstAtaq.getCostePerdidas(-1);
            var perdidasDef = lstDef.getCostePerdidas(-1);
            var N_perdidasAtaq = N(perdidasAtaq);
            var N_perdidasDef = N(perdidasDef);

            var txtFecha = '';

            txtFecha += '{COLOR_IN}{SIZE_PEQ}' + LANG.CR.txt_battleDay + ' ' + getFecha() +
                      '{/SIZE}{/COLOR_O}{NL}{NL}';

            patron = '';

            // ATACANTES
            patron += '{COLOR_T1}{B}{SIZE_MED}' + LANG.CR.txt_attackers + ' (' + lstAtaq.length() +
                      '):{/SIZE}{/B}{/COLOR_T}{NL}{NL}';

            var enviadasAtac = new Array();

            for(var i = 0; i < lstAtaq.length(); i++){
                patron += '{COLOR_A1}{B}{SIZE_MED}'+ lstAtaq.getNombre(i) +
                          '{/SIZE}{/B}{/COLOR}{NL}';

                for(var j = 0; j < lstAtaq.getFlotas(i).length(); j++) {

                    var nombre = lstAtaq.getFlotas(i).getNombre(j);
                    var unidades = N(lstAtaq.getFlotas(i).getUnidades(j));
                    var perdidas = N(lstAtaq.getFlotas(i).getPerdidas(j));
                    patron += nombre + " {COLOR_AU1}" + unidades +
                              "{/COLOR_AU1} {COLOR_A2}" + LANG.CR.txt_lost + " " + perdidas +
                              "{/COLOR}{NL}";
                }

                patron += '{NL}';

                enviadasAtac[i] = lstAtaq.getFlotas(i).getCosteUnidades();
//                patron += 'Enviadas: ' + addDots(enviadasAtac[i]) + '{NL}';

                if(lstAtaq.getCostePerdidas(i)[3] != 0) {
                   var coste = N(lstAtaq.getCostePerdidas(i));
                   patron += '{COLOR_T1}' + LANG.CR.txt_loses + ':{/COLOR_T}{COLOR_R1} ' +
                             coste[3] + ' {/COLOR}{COLOR_IN}' + LANG.CR.txt_units +
                             '{/COLOR_O}.{NL}';

                   if (usar_CR_Friki) {
                     patron += '( {I}' +
                               ( coste[0] != 0 ? '{COLOR_R2}' + coste[0] + '{/COLOR} ' +
                               LANG.CR_FRIKI.txt_RES_metal : '') +
                               ( coste[1] != 0 ? ( coste[0] != 0 ? ', ' : '') +
                               '{COLOR_R2}' + coste[1] + '{/COLOR} ' + LANG.CR_FRIKI.txt_RES_cristal : '') +
                               ( coste[2] != 0 ? ( ((coste[0] != 0) || (coste[1] != 0)) ? ', ' : '') +
                               '{COLOR_R2}' + coste[2] + '{/COLOR} ' + LANG.CR_FRIKI.txt_RES_deuterio : '') +
                               '{/I} ){NL}{NL}';
                   } else {
                     patron += '( {I}' +
                               ( coste[0] != 0 ? '{COLOR_R2}' + coste[0] + '{/COLOR} ' +
                               LANG.SERVER.txt_RES_metal : '') +
                               ( coste[1] != 0 ? ( coste[0] != 0 ? ', ' : '') +
                               '{COLOR_R2}' + coste[1] + '{/COLOR} ' + LANG.SERVER.txt_RES_cristal : '') +
                               ( coste[2] != 0 ? ( ((coste[0] != 0) || (coste[1] != 0)) ? ', ' : '') +
                               '{COLOR_R2}' + coste[2] + '{/COLOR} ' + LANG.SERVER.txt_RES_deuterio : '') +
                               '{/I} ){NL}{NL}';
                   }
                }
            }

            // DEFENSOR
            patron += '{COLOR_T1}{B}{SIZE_MED}' + LANG.CR.txt_defenders + ' (' + lstDef.length() +
                      '):{/SIZE}{/B}{/COLOR_T} {NL}{NL}';

            var enviadasDef = new Array();

            for(var i = 0; i < lstDef.length(); i++){
                patron += '{COLOR_D1}{B}{SIZE_MED}'+ lstDef.getNombre(i) +
                          '{/SIZE}{/B}{/COLOR}{NL}';

                for(var j = 0; j < lstDef.getFlotas(i).length(); j++) {

                    var nombre = lstDef.getFlotas(i).getNombre(j);
                    var unidades = N(lstDef.getFlotas(i).getUnidades(j));
                    var perdidas = N(lstDef.getFlotas(i).getPerdidas(j));
                    patron += nombre + " {COLOR_DU1}" +
                              unidades + "{/COLOR_DU1} {COLOR_D2}" + LANG.CR.txt_lost + " " +
                              perdidas +  "{/COLOR}{NL}";
                }

                if(lstDef.getFlotas(i).length() == 0) {
                   patron += "{COLOR_D1}{I}" + LANG.CR.txt_withoutDef + "{/I}{/COLOR}{NL}";
                }

                patron += '{NL}';

                enviadasDef[i] = lstDef.getFlotas(i).getCosteUnidades();
//                patron += 'Enviadas: ' + addDots(enviadasDef[i]) + '{NL}';

                if(lstDef.getCostePerdidas(i)[3] != 0) {
                   var coste = N(lstDef.getCostePerdidas(i));
                   patron += '{COLOR_T1}' + LANG.CR.txt_loses + ':{/COLOR_T}{COLOR_R1} ' +
                             coste[3] + '{/COLOR} {COLOR_IN}' + LANG.CR.txt_units +
                             '{/COLOR_O}.{NL}';

                   if (usar_CR_Friki) {
                     patron += '( {I}' +
                               ( coste[0] != 0 ? '{COLOR_R2}' + coste[0] + '{/COLOR} ' +
                               LANG.CR_FRIKI.txt_RES_metal : '') +
                               ( coste[1] != 0 ? ( coste[0] != 0 ? ', ' : '') +
                               '{COLOR_R2}' + coste[1] + '{/COLOR} ' +
                               LANG.CR_FRIKI.txt_RES_cristal : '') +
                               ( coste[2] != 0 ? ( ((coste[0] != 0) || (coste[1] != 0)) ? ', ' : '') +
                               '{COLOR_R2}' + coste[2] + '{/COLOR} ' +
                               LANG.CR_FRIKI.txt_RES_deuterio : '') +
                               '{/I} ){NL}{NL}';
                   } else {
                     patron += '( {I}' +
                               ( coste[0] != 0 ? '{COLOR_R2}' + coste[0] + '{/COLOR} ' +
                               LANG.SERVER.txt_RES_metal : '') +
                               ( coste[1] != 0 ? ( coste[0] != 0 ? ', ' : '') +
                               '{COLOR_R2}' + coste[1] + '{/COLOR} ' +
                               LANG.SERVER.txt_RES_cristal : '') +
                               ( coste[2] != 0 ? ( ((coste[0] != 0) || (coste[1] != 0)) ? ', ' : '') +
                               '{COLOR_R2}' + coste[2] + '{/COLOR} ' +
                               LANG.SERVER.txt_RES_deuterio : '') +
                               '{/I} ){NL}{NL}';
                   }
                }
            }

            patron += '{NL}{SIZE_MED}{COLOR_T1}{B}' + getMensajeConclusion() +
                      '{/B}{/COLOR_T}{/SIZE}{NL}{NL}';

            // RESUMEN (robos, escombros, perdidas, rentabilidad...)

            var perdidasTotales = new Array();
                perdidasTotales[0] = (perdidasAtaq[0] + perdidasDef[0]);
                perdidasTotales[1] = (perdidasAtaq[1] + perdidasDef[1]);
                perdidasTotales[2] = (perdidasAtaq[2] + perdidasDef[2]);
                perdidasTotales[3] = (perdidasAtaq[0] + perdidasDef[0]) +
                                     (perdidasAtaq[1] + perdidasDef[1]) +
                                     (perdidasAtaq[2] + perdidasDef[2]);

            var N_perdidasTotales = N(perdidasTotales);

            var escombros = getEscombros();
            var N_escombros = N(escombros);

            var captura = getCaptura();
            var N_captura = N(captura);

            // RENTABILIDAD Y PORCENTAJE: ATACANTE CON RECICLAJE
            var renta_ataq_conReci = new Array();
                renta_ataq_conReci[0] = (-1*perdidasAtaq[0])+captura[0]+escombros[0];
                renta_ataq_conReci[1] = (-1*perdidasAtaq[1])+captura[1]+escombros[1];
                renta_ataq_conReci[2] = (-1*perdidasAtaq[2])+captura[2];
                renta_ataq_conReci[3] = (-1*perdidasAtaq[3])+captura[3]+escombros[2];

            var N_renta_ataq_conReci = N(renta_ataq_conReci);

            var p_renta_ataq_conReci = new Array();
                p_renta_ataq_conReci[3] = Math.floor((renta_ataq_conReci[3]/perdidasAtaq[3])*100);
                p_renta_ataq_conReci[0] = Math.floor((renta_ataq_conReci[0]/perdidasAtaq[0])*100);
                p_renta_ataq_conReci[1] = Math.floor((renta_ataq_conReci[1]/perdidasAtaq[1])*100);
                p_renta_ataq_conReci[2] = Math.floor((renta_ataq_conReci[2]/perdidasAtaq[2])*100);

            var p_renta_ataq_conReci = N(p_renta_ataq_conReci);

            // RENTABILIDAD Y PORCENTAJE: ATACANTE SIN RECICLAJE
            var renta_ataq_sinReci = new Array();
                renta_ataq_sinReci[0] = (-1*perdidasAtaq[0])+captura[0];
                renta_ataq_sinReci[1] = (-1*perdidasAtaq[1])+captura[1];
                renta_ataq_sinReci[2] = (-1*perdidasAtaq[2])+captura[2];
                renta_ataq_sinReci[3] = (-1*perdidasAtaq[3])+captura[3];

            var N_renta_ataq_sinReci = N(renta_ataq_sinReci);

            var p_renta_ataq_sinReci = new Array();
                p_renta_ataq_sinReci[3] = Math.floor((renta_ataq_sinReci[3]/perdidasAtaq[3])*100);
                p_renta_ataq_sinReci[0] = Math.floor((renta_ataq_sinReci[0]/perdidasAtaq[0])*100);
                p_renta_ataq_sinReci[1] = Math.floor((renta_ataq_sinReci[1]/perdidasAtaq[1])*100);
                p_renta_ataq_sinReci[2] = Math.floor((renta_ataq_sinReci[2]/perdidasAtaq[2])*100);
                p_renta_ataq_sinReci = N(p_renta_ataq_sinReci);

            // RENTABILIDAD Y PORCENTAJE: DEFENSOR CON RECICLAJE
            var renta_def_conReci = new Array();
                renta_def_conReci[0] = (-1*perdidasDef[0])+escombros[0];
                renta_def_conReci[1] = (-1*perdidasDef[1])+escombros[1];
                renta_def_conReci[2] = (-1*perdidasDef[2]);
                renta_def_conReci[3] = (-1*perdidasDef[3])+escombros[2];

            var N_renta_def_conReci = N(renta_def_conReci);

            var p_renta_def_conReci = new Array();
                p_renta_def_conReci[3] = Math.floor((renta_def_conReci[3]/perdidasDef[3])*100);
                p_renta_def_conReci[0] = Math.floor((renta_def_conReci[0]/perdidasDef[0])*100);
                p_renta_def_conReci[1] = Math.floor((renta_def_conReci[1]/perdidasDef[1])*100);
                p_renta_def_conReci[2] = Math.floor((renta_def_conReci[2]/perdidasDef[2])*100);

                p_renta_def_conReci = N(p_renta_def_conReci);

            if ( ( ! hide_Stolen_CR ) ||
                 ( ( hide_Stolen_CR ) && ( captura[3] > 0 ) ) ) {
                if (usar_CR_Friki) {
                    patron += '{NL}{B}{COLOR_T1}{SIZE_MED}' + LANG.CR.txt_stolen +
                              ':{/SIZE}{/COLOR_T}{/B}{NL}{NL}' +
                              ( captura[0] > 0 ? '{COLOR_R4}{SIZE_MED}' + N_captura[0] +
                              '{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.CR_FRIKI.txt_RES_metal : '') +
                              ( captura[1] > 0 ? ( captura[0] > 0 ? ', ' : '' ) +
                              '{/COLOR_O}{COLOR_R4}{SIZE_MED}' + N_captura[1] +
                              '{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.CR_FRIKI.txt_RES_cristal : '' ) +
                              ( captura[2] > 0 ? ( (captura[0] + captura[1]) > 0 ? ' ' + LANG.SERVER.txt_CR_and : '') +
                              '{/COLOR_O}{COLOR_R4}{SIZE_MED} ' + N_captura[2] +
                              '{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.CR_FRIKI.txt_RES_deuterio + '{/COLOR_O}' : '') +
                              '{NL}{NL}';
                } else {
                    patron += '{NL}{B}{COLOR_T1}{SIZE_MED}' + LANG.CR.txt_stolen +
                              ':{/SIZE}{/COLOR_T}{/B}{NL}{NL}' +
                              ( (captura[0] > 0) || (! hide_Stolen_CR) ? '{COLOR_R4}{SIZE_MED}' + N_captura[0] +
                              '{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.SERVER.txt_RES_metal : '') +
                              ( (captura[1] > 0) || (! hide_Stolen_CR) ?
                              ( ( captura[0] > 0 ) || ( ! hide_Stolen_CR ) ? ', ' : '' ) +
                              '{/COLOR_O}{COLOR_R4}{SIZE_MED}' + N_captura[1] +
                              '{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.SERVER.txt_RES_cristal : '' ) +
                              ( (captura[2] > 0) || (! hide_Stolen_CR) ?
                              ( ( ( (captura[0] + captura[1]) > 0 ) || (! hide_Stolen_CR) ) ? ' ' + LANG.SERVER.txt_CR_and : '') +
                              '{/COLOR_O}{COLOR_R4}{SIZE_MED} ' + N_captura[2] +
                              '{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.SERVER.txt_RES_deuterio + '{/COLOR_O}' : '') +
                              '{NL}{NL}';
                }
            }

            var txtPerdidas = '';

            if ( ( parseInt(N_perdidasAtaq[3]) > 0 ) || ( parseInt(N_perdidasDef[3]) > 0 ) ) {
                 txtPerdidas += '{NL}{COLOR_T1}{SIZE_MED}{B}' + LANG.CR.txt_loses +
                      ': {/B}{/SIZE}{/COLOR_T}{NL}{NL}';

                 if ( parseInt(N_perdidasAtaq[3]) > 0 )
                      txtPerdidas += '{COLOR_T1}' + LANG.CR.txt_attFleet +
                      ':{/COLOR_T} {COLOR_A1}{SIZE_MED}' + N_perdidasAtaq[3] +
                      '{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                 if ( parseInt(N_perdidasDef[3]) > 0 )
                      txtPerdidas += '{COLOR_T1}' + LANG.CR.txt_defFleet + ':{/COLOR_T} {COLOR_D1}{SIZE_MED}' +
                      N_perdidasDef[3] + '{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.CR.txt_units +
                      '.{/COLOR_O}{NL}{NL}';

                 txtPerdidas += '{COLOR_T1}' + LANG.CR.txt_totLoses + ':{/COLOR_T} {B}{COLOR_R1}{SIZE_MED}' +
                      N(perdidasTotales[3]) + '{/SIZE}{/COLOR}{/B}{COLOR_IN} ' + LANG.CR.txt_units +
                      '.{/COLOR_O}{NL}{NL}';
            }

            var txtEscombros = '';

            if ( ( ! hide_Debris_CR ) ||
                 ( ( hide_Debris_CR ) && ( escombros[2] > 0 ) ) ) {
                if (usar_CR_Friki) {
                    txtEscombros += '{NL}{COLOR_T1}{SIZE_MED}{B}' + LANG.CR.txt_debris + ': {/B}{/SIZE}{/COLOR_T}{NL}{NL}' +
                      ( ( ( escombros[0] > 0 ) || ( ! hide_Debris_CR ) ) ?
                      '{COLOR_R3}{SIZE_GRA}{B}' + N_escombros[0] + '{/B}{/SIZE}{/COLOR}' +
                      '{COLOR_IN} ' + LANG.CR_FRIKI.txt_RES_metal : '' ) +
                      ( ( ( escombros[1] > 0 ) || ( ! hide_Debris_CR ) ) ?
                      ( ( ( escombros[0] > 0 ) || ( ! hide_Debris_CR ) ) ? ' ' + LANG.SERVER.txt_CR_and : '' ) +
                      '{/COLOR_O}{COLOR_R3}{SIZE_GRA}{B} ' + N_escombros[1] +
                      '{/B}{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.CR_FRIKI.txt_RES_cristal : '' ) +
                      ' [ {/COLOR_O}{COLOR_R3}' + N(calcularRecicladores(escombros[2])) + '{/COLOR}' +
                      '{COLOR_IN} ' + LANG.CR_FRIKI.txt_recys + ' ]{/COLOR_O}' +
                      '{NL}{NL}';
                } else {
                    txtEscombros += '{NL}{COLOR_T1}{SIZE_MED}{B}' + LANG.CR.txt_debris + ': {/B}{/SIZE}{/COLOR_T}{NL}{NL}' +
                      ( ( ( escombros[0] > 0 ) || ( ! hide_Debris_CR ) ) ?
                      '{COLOR_R3}{SIZE_GRA}{B}' + N_escombros[0] + '{/B}{/SIZE}{/COLOR}' +
                      '{COLOR_IN} ' + LANG.SERVER.txt_RES_metal : '' ) +
                      ( ( ( escombros[1] > 0 ) || ( ! hide_Debris_CR ) ) ?
                      ( ( ( escombros[0] > 0 ) || ( ! hide_Debris_CR ) ) ? ' ' + LANG.SERVER.txt_CR_and : '' ) +
                      '{/COLOR_O}{COLOR_R3}{SIZE_GRA}{B} ' + N_escombros[1] +
                      '{/B}{/SIZE}{/COLOR}{COLOR_IN} ' + LANG.SERVER.txt_RES_cristal : '' ) +
                      ' [ {/COLOR_O}{COLOR_R3}' + N(calcularRecicladores(escombros[2])) + '{/COLOR}' +
                      '{COLOR_IN} ' + LANG.CR.txt_recys + ' ]{/COLOR_O}' +
                      '{NL}{NL}';                }

            }

            var arrProfit = new Array();
                arrProfit[0] = '';
                arrProfit[1] = '';
                arrProfit[2] = '';
                arrProfit[3] = '';

            if ( (escombros[2] > 0) || (captura[3] > 0) ) {

               if (escombros[2] > 0) {
                   arrProfit[0] += '{NL}{COLOR_T1}{SIZE_MED}{B}' + LANG.CR.txt_profit +
                         ': {/B}{/SIZE}{/COLOR_T}{NL}{NL}';

                   arrProfit[1] += '{COLOR_T1}{B}' + LANG.CR.txt_attHarvest +
                         '{/B}:{/COLOR_T} {COLOR_RA1}{B}' + N_renta_ataq_conReci[3] + '{/B} [' +
                         p_renta_ataq_conReci[3] + '%]{/COLOR}{NL}';

                   if (usar_CR_Friki) {
                      arrProfit[1] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_metal + ':{/COLOR_T} {COLOR_RAM1}' +
                         N_renta_ataq_conReci[0] + ' {/COLOR}{COLOR_IN}' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[1] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_cristal + ':{/COLOR_T} {COLOR_RAC1}' +
                         N_renta_ataq_conReci[1] + ' {/COLOR}{COLOR_IN}' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[1] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_deuterio + ':{/COLOR_T} {COLOR_RAD1}' +
                         N_renta_ataq_conReci[2] + ' {/COLOR}{COLOR_IN}' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}{NL}';

                      arrProfit[2] += '{COLOR_T1}{B}' + LANG.CR.txt_attNoHarvest +
                         '{/B}:{/COLOR_T} {COLOR_RA2}{B}' + N_renta_ataq_sinReci[3] +
                         '{/B} [' + p_renta_ataq_sinReci[3] + '%]{/COLOR}{NL}';

                      arrProfit[2] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_metal + ':{/COLOR_T} {COLOR_RAM2}' +
                         N_renta_ataq_sinReci[0] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[2] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_cristal + ':{/COLOR_T} {COLOR_RAC2}' +
                         N_renta_ataq_sinReci[1] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[2] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_deuterio + ':{/COLOR_T} {COLOR_RAD2}' +
                         N_renta_ataq_sinReci[2] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}{NL}';

                      arrProfit[3] += '{COLOR_T1}{B}' + LANG.CR.txt_defHarvest + '{/B}:{/COLOR_T} {COLOR_RD}{B}' +
                         N_renta_def_conReci[3] + '{/B} [' + p_renta_def_conReci[3] +
                         '%]{/COLOR}{NL}';

                      arrProfit[3] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_metal + ':{/COLOR_T} {COLOR_RDM}' +
                         N_renta_def_conReci[0] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[3] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_cristal + ':{/COLOR_T} {COLOR_RDC}' +
                         N_renta_def_conReci[1] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[3] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_deuterio + ':{/COLOR_T} {COLOR_RDD}' +
                         N_renta_def_conReci[2] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}{NL}';
                   } else {
                      arrProfit[1] += '{COLOR_T1}' + LANG.SERVER.txt_RES_metal + ':{/COLOR_T} {COLOR_RAM1}' +
                         N_renta_ataq_conReci[0] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[1] += '{COLOR_T1}' + LANG.SERVER.txt_RES_cristal + ':{/COLOR_T} {COLOR_RAC1}' +
                         N_renta_ataq_conReci[1] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[1] += '{COLOR_T1}' + LANG.SERVER.txt_RES_deuterio + ':{/COLOR_T} {COLOR_RAD1}' +
                         N_renta_ataq_conReci[2] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}{NL}';

                      arrProfit[2] += '{COLOR_T1}{B}' + LANG.CR.txt_attNoHarvest +
                         '{/B}:{/COLOR_T} {COLOR_RA2}{B}' + N_renta_ataq_sinReci[3] +
                         '{/B} [' + p_renta_ataq_sinReci[3] + '%]{/COLOR}{NL}';

                      arrProfit[2] += '{COLOR_T1}' + LANG.SERVER.txt_RES_metal + ':{/COLOR_T} {COLOR_RAM2}' +
                         N_renta_ataq_sinReci[0] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[2] += '{COLOR_T1}' + LANG.SERVER.txt_RES_cristal + ':{/COLOR_T} {COLOR_RAC2}' +
                         N_renta_ataq_sinReci[1] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[2] += '{COLOR_T1}' + LANG.SERVER.txt_RES_deuterio + ':{/COLOR_T} {COLOR_RAD2}' +
                         N_renta_ataq_sinReci[2] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}{NL}';

                      arrProfit[3] += '{COLOR_T1}{B}' + LANG.CR.txt_defHarvest + '{/B}:{/COLOR_T} {COLOR_RD}{B}' +
                         N_renta_def_conReci[3] + '{/B} [' + p_renta_def_conReci[3] +
                         '%]{/COLOR}{NL}';

                      arrProfit[3] += '{COLOR_T1}' + LANG.SERVER.txt_RES_metal + ':{/COLOR_T} {COLOR_RDM}' +
                         N_renta_def_conReci[0] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[3] += '{COLOR_T1}' + LANG.SERVER.txt_RES_cristal + ':{/COLOR_T} {COLOR_RDC}' +
                         N_renta_def_conReci[1] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                      arrProfit[3] += '{COLOR_T1}' + LANG.SERVER.txt_RES_deuterio + ':{/COLOR_T} {COLOR_RDD}' +
                         N_renta_def_conReci[2] + '{/COLOR}{COLOR_IN} ' +
                         LANG.CR.txt_units + '.{/COLOR_O}{NL}{NL}';
                   }
               }
               else {

                   if (parseInt(N_renta_ataq_sinReci[3]) > 0)
                   {
                      arrProfit[0] += '{NL}{COLOR_T1}{SIZE_MED}{B}' + LANG.CR.txt_profit +
                         '{/B}{/SIZE}{/COLOR_T}{NL}{NL}';

                      arrProfit[1] += '{COLOR_T1}{B}' +
                         LANG.CR.txt_attackers + '{/B}:{/COLOR_T} {COLOR_RA1}{B}' +
                         N_renta_ataq_sinReci[3] + '{/B} [' +
                         p_renta_ataq_sinReci[3] + '%]{/COLOR}{NL}';

                      if (usar_CR_Friki) {
                          arrProfit[1] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_metal + ':{/COLOR_T} {COLOR_RAM1}' +
                                    N_renta_ataq_sinReci[0] + '{/COLOR}{COLOR_IN} ' +
                                    LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                          arrProfit[1] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_cristal + ':{/COLOR_T} {COLOR_RAC1}' +
                                    N_renta_ataq_sinReci[1] + '{/COLOR}{COLOR_IN} ' +
                                    LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                          arrProfit[1] += '{COLOR_T1}' + LANG.CR_FRIKI.txt_RES_deuterio + ':{/COLOR_T} {COLOR_RAD1}' +
                                    N_renta_ataq_sinReci[2] + '{/COLOR}{COLOR_IN} ' +
                                    LANG.CR.txt_units + '.{/COLOR_O}{NL}{NL}';

                      } else {
                          arrProfit[1] += '{COLOR_T1}' + LANG.SERVER.txt_RES_metal + ':{/COLOR_T} {COLOR_RAM1}' +
                                    N_renta_ataq_sinReci[0] + '{/COLOR}{COLOR_IN} ' +
                                    LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                          arrProfit[1] += '{COLOR_T1}' + LANG.SERVER.txt_RES_cristal + ':{/COLOR_T} {COLOR_RAC1}' +
                                    N_renta_ataq_sinReci[1] + '{/COLOR}{COLOR_IN} ' +
                                    LANG.CR.txt_units + '.{/COLOR_O}{NL}';

                          arrProfit[1] += '{COLOR_T1}' + LANG.SERVER.txt_RES_deuterio + ':{/COLOR_T} {COLOR_RAD1}' +
                                    N_renta_ataq_sinReci[2] + '{/COLOR}{COLOR_IN} ' +
                                    LANG.CR.txt_units + '.{/COLOR_O}{NL}{NL}';
                      }
                   }
               }
            }

            // si rentabilidad = infinita, lo cambia por MAX
            arrProfit[1] = arrProfit[1].replace(/infinity\%/gi, "Max.");
            arrProfit[1] = arrProfit[1].replace(/NaN\%/gi, "Max.");
            arrProfit[1] = arrProfit[1].replace(/NaN/gi, " 0 ");

            arrProfit[2] = arrProfit[2].replace(/infinity\%/gi, "Max.");
            arrProfit[2] = arrProfit[2].replace(/NaN\%/gi, "Max.");
            arrProfit[2] = arrProfit[2].replace(/NaN/gi, " 0 ");

            arrProfit[3] = arrProfit[3].replace(/infinity\%/gi, "Max.");
            arrProfit[3] = arrProfit[3].replace(/NaN\%/gi, "Max.");
            arrProfit[3] = arrProfit[3].replace(/NaN/gi, " 0 ");

            var txtResto = '';

            if(getLuna().length > 4)
               txtResto += '{NL}{COLOR_L}{SIZE_GRA}' + getLuna() + '{/SIZE}{/COLOR}{NL}{NL}';

            txtResto += '{SIZE_PEQ}{ENLACE_SCRIPT}{/SIZE}';


            // ****************************************************************
            // ***** PATRON MINI **********************************************

            var patronMini = "{COLOR_T1}{B}" + LANG.CR.txt_farming + "{/B} [{/COLOR_T} {COLOR_A1}";

            for(var i = 0; i < lstAtaq.length(); i++){
                patronMini  += (i > 0 ? ' & ' : '') + lstAtaq.getNombre(i) + '';
            }

            patronMini += '{/COLOR}{COLOR_T1} vs {/COLOR_T}{COLOR_D1}';

            for(var i = 0; i < lstDef.length(); i++){
                patronMini += (i > 0 ? ' & ' : '') + lstDef.getNombre(i) + '{/COLOR}';
            }

            if (usar_CR_Friki) {
              patronMini += ' {COLOR_T1}]{NL}{B}' + LANG.CR.txt_attProfit + ':{/B}{/COLOR_T}{COLOR_R4} ' +
                          N_renta_ataq_conReci[0] + ' {/COLOR}{COLOR_IN}' + LANG.CR_FRIKI.txt_RES_metal +
                          ', {/COLOR_O}{COLOR_R4}' + N_renta_ataq_conReci[1] +
                          '{/COLOR}{COLOR_IN} ' + LANG.CR_FRIKI.txt_RES_cristal + ', {/COLOR_O}{COLOR_R4}' +
                          N_renta_ataq_conReci[2] + '{/COLOR}{COLOR_IN} ' +
                          LANG.CR_FRIKI.txt_RES_deuterio + '{/COLOR_O}{NL}';
            } else {
              patronMini += ' {COLOR_T1}]{NL}{B}' + LANG.CR.txt_attProfit + ': {/B}{/COLOR_T}{COLOR_R4}' +
                          N_renta_ataq_conReci[0] + ' {/COLOR}{COLOR_IN}' + LANG.SERVER.txt_RES_metal +
                          ', {/COLOR_O}{COLOR_R4}' + N_renta_ataq_conReci[1] +
                          ' {/COLOR}{COLOR_IN}' + LANG.SERVER.txt_RES_cristal + ', {/COLOR_O}{COLOR_R4}' +
                          N_renta_ataq_conReci[2] + ' {/COLOR}{COLOR_IN}' +
                          LANG.SERVER.txt_RES_deuterio + '{/COLOR_O}{NL}';
            }

            patronMini = patronMini.replace(/NaN/gi, "0");
            // ****************************************************************
            // ***** MOSTRAR **************************************************

            var html = '';

            //cabecera
            html +=  '<div><table border="0" width="100%" style="">';
            html += '<tr><td height="30" bgcolor="#000000" style="border: 2px ' +
                    'solid #000000;">';
            html += '<p align="center"><font style="font-size:12pt;" color="' +
                    strColor_LPuNKTKit + '">';
            html += '<b>' + LANG.OPTION.txt_scriptCRName.toUpperCase() + '<br>' +
                    'LPuNKTKit ' + VERSION_LPUNKTKIT + '</b>';
            html += '</font></p></td></tr></table></div>';

            // ...
            html += '<div style="font-size:14px;font-family:Verdana,sans-serif;">';
            html +=  '<br><center><table border="0" width="90%" style="">';
            html += '<tr><td colspan="2" height="450" bgcolor="#1F273C" ' +
                    'style="border: 2px solid #FFFFFF;"><br><br>'
            html += '<div id="codHTML">' + codificar(txtFecha + patron + txtEscombros + txtPerdidas +
                                           arrProfit[0] + arrProfit[1] + arrProfit[2] + arrProfit[3] + txtResto, 'HTML') + '<br></div>';
            html += '</td></tr>';
            html += '<tr><td><br><center>';

            html += getCuadrosBBCode(txtFecha, patron, txtEscombros, txtPerdidas, arrProfit[0], arrProfit[1], arrProfit[2], arrProfit[3], txtResto);

            html += '</center></td></tr></table></center><br><br>';

            // patron mini
            //cabecera
            html += '<div><table border="0" width="100%" style="">';
            html += '<tr><td colspan="2" height="30" bgcolor="#000000" ' +
                    'style="border: 2px solid #000000;">';
            html += '<p align="center"><font style="font-size:12pt;" color="' +
                    strColor_LPuNKTKit + '">';
            html += '<b>' + LANG.CR.txt_minimal + '<br>' +
                    'LPuNKTKit ' + VERSION_LPUNKTKIT + '</b>';
            html += '</font></p></td></tr></table></div>';

            html += '<div style="font-size:14px;font-family:Verdana,sans-serif;">';
            html += '<br><center><table border="0" width="90%" style="">';
            html += '<tr><td colspan="2" height="80" bgcolor="#1F273C" ' +
                    'style="border: 2px solid #FFFFFF;">'
            html += '<div id="codHTML"><br>' + codificar(patronMini, 'HTML') + '<br></div>';
            html += '</td></tr>';
            html += '<tr><td><br><center>';

            html += getCuadrosBBCode('', patronMini,'','','','','','','');

            html += '</center></td></tr></table></center><br>';

            html += '</div>';

            //****************************************************
            //******** Repartidor de escombros SAC

            if ( ( show_Escombros_SAC ) &&
                 ( ( lstAtaq.length() > 1 ) || ( lstDef.length() > 1 ) ) ) {

               switch (modo_Reparto_SAC) {
                       case 0: // 'equal'
                             html += '<div><table border="0" width="100%" style="">';
                             html += '<tr><td colspan="2" height="30" bgcolor="#000000" ' +
                                     'style="border: 2px solid #000000;">';
                             html += '<p align="center"><font style="font-size:12pt;" color="' +
                                     strColor_LPuNKTKit + '">';
                             html += '<b>' + 'Reparto A PARTES IGUALES de los escombros' + '<br>' +
                                     'LPuNKTKit ' + VERSION_LPUNKTKIT + '</b>';
                             html += '</font></p></td></tr></table></div>';

                             html += '<div style="font-size:14px;font-family:Verdana,sans-serif;">';
                             html += '<br><center>' +
                                     '<table border="0" width="90%" style="">';
                             html += '<tr><td colspan="2" height="80" bgcolor="#1F273C" ' +
                                     'style="border: 2px solid #FFFFFF;">';

                             html += '<div id="repSAC"><br><center>';

                             var strMetal = addDots(roundNumber(escombros[0] / lstAtaq.length(), 0));
                             var strCristal = addDots(roundNumber(escombros[1] / lstAtaq.length(), 0));

                             var patronSAC = '{COLOR_T1}{B}{SIZE_MED}' + 'Reparto de los escombros' + '{NL}' +
                                             'A PARTES IGUALES' + '{/SIZE}{/B}{/COLOR_T}{NL}{NL}';

                             if ( lstAtaq.length() > 1 ) {
                                  patronSAC += '{COLOR_T1}{B}' + LANG.CR.txt_attackers + '{/B}{/COLOR_T}{NL}';

                                  for (i = 0; i < lstAtaq.length(); i++) {
                                       patronSAC += '{COLOR_A1}' + lstAtaq.getNombre(i) + '{/COLOR}{COLOR_IN}: {/COLOR_O}' +
                                                    '{COLOR_R4}' + strMetal + '{/COLOR} ' +
                                                    '{COLOR_IN}' + LANG.SERVER.txt_RES_metal + ', {/COLOR_O}' +
                                                    '{COLOR_R4}' + strCristal + '{/COLOR} ' +
                                                    '{COLOR_IN}' + LANG.SERVER.txt_RES_cristal + '{/COLOR_O}' +
                                                    '{NL}';
                                  }
                             }

                             if ( lstDef.length() > 1 ) {
                                  if ( lstAtaq.length() > 1 ) patronSAC += '{NL}';

                                  strMetal = addDots(roundNumber(escombros[0] / lstDef.length(), 0));
                                  strCristal = addDots(roundNumber(escombros[1] / lstDef.length(), 0));

                                  patronSAC += '{COLOR_T1}{B}' + LANG.CR.txt_defenders + '{/B}{/COLOR_T}{NL}';

                                  for (i = 0; i < lstDef.length(); i++) {
                                       patronSAC += '{COLOR_D1}' + lstDef.getNombre(i) + '{/COLOR}{COLOR_IN}: {/COLOR_O}' +
                                                    '{COLOR_R4}' + strMetal + '{/COLOR} ' +
                                                    '{COLOR_IN}' + LANG.SERVER.txt_RES_metal + ', {/COLOR_O}' +
                                                    '{COLOR_R4}' + strCristal + '{/COLOR} ' +
                                                    '{COLOR_IN}' + LANG.SERVER.txt_RES_cristal + '{/COLOR_O}' +
                                                    '{NL}';

                                  }
                             }

                             patronSAC += '{NL}{SIZE_PEQ}{ENLACE_SCRIPT}{/SIZE}';

                             html += codificar(patronSAC, 'HTML');

                             html += '</center><br></div>';
                             html += '</td></tr>';
                             html += '<tr><td><br><center>';

                             html += getCuadrosBBCode('', patronSAC,'','','','','','','');

                             break;

                       case 1: //'proportional'

                             html += '<div><table border="0" width="100%" style="">';
                             html += '<tr><td colspan="2" height="30" bgcolor="#000000" ' +
                                     'style="border: 2px solid #000000;">';
                             html += '<p align="center"><font style="font-size:12pt;" color="' +
                                     strColor_LPuNKTKit + '">';

                             html += '<b>' + 'Reparto de los escombros PROPORCIONAL A LO ENVIADO' + '<br>' +
                                     'LPuNKTKit ' + VERSION_LPUNKTKIT + '</b>';
                             html += '</font></p></td></tr></table></div>';

                             html += '<div style="font-size:14px;font-family:Verdana,sans-serif;">';
                             html += '<br><center>' +
                                     '<table border="0" width="90%" style="">';
                             html += '<tr><td colspan="2" height="80" bgcolor="#1F273C" ' +
                                     'style="border: 2px solid #FFFFFF;">';

                             html += '<div id="repSAC"><br><center>';

                             var patronSAC = '{COLOR_T1}{B}{SIZE_MED}' +
                                             'Reparto de los escombros' + '{NL}' +
                                             'PROPORCIONAL A LO ENVIADO' + '{/SIZE}{NL}' +
                                             'RATIO ' + rat_Metal_SAC + ':' + rat_Cristal_SAC + ':' + rat_Deuterio_SAC + '{/B}{/COLOR_T}' +
                                             '{NL}{NL}';

                             if ( lstAtaq.length() > 1 ) {
                                  var totEnviadasAtac = 0;

                                  for (i = 0; i < enviadasAtac.length; i++)
                                    totEnviadasAtac += enviadasAtac[i];

                                  patronSAC += '{COLOR_T1}{B}' + LANG.CR.txt_attackers + '{/B}{/COLOR_T}{NL}';

                                  for (i = 0; i < lstAtaq.length(); i++) {
                                       patronSAC += '{COLOR_A1}' + lstAtaq.getNombre(i) + '{/COLOR}{COLOR_IN}: {/COLOR_O}' +
                                                    '{COLOR_R4}' + addDots(roundNumber(escombros[0] * enviadasAtac[i] / totEnviadasAtac, 0)) + '{/COLOR} ' +
                                                    '{COLOR_IN}' + LANG.SERVER.txt_RES_metal + ', {/COLOR_O}' +
                                                    '{COLOR_R4}' + addDots(roundNumber(escombros[1] * enviadasAtac[i] / totEnviadasAtac, 0)) + '{/COLOR} ' +
                                                    '{COLOR_IN}' + LANG.SERVER.txt_RES_cristal + '{/COLOR_O}' +
                                                    '{NL}';
                                  }
                             }

                             if ( lstDef.length() > 1 ) {
                                  if ( lstAtaq.length() > 1 ) patronSAC += '{NL}';

                                  var totEnviadasDef = 0;

                                  for (i = 0; i < enviadasDef.length; i++)
                                       totEnviadasDef += enviadasDef[i];

                                  patronSAC += '{COLOR_T1}{B}' + LANG.CR.txt_defenders + '{/B}{/COLOR_T}{NL}';

                                  for (i = 0; i < lstDef.length(); i++) {
                                       patronSAC += '{COLOR_D1}' + lstDef.getNombre(i) + '{/COLOR}{COLOR_IN}: {/COLOR_O}' +
                                                    '{COLOR_R4}' + addDots(roundNumber(escombros[0] * enviadasDef[i] / totEnviadasDef, 0)) + '{/COLOR} ' +
                                                    '{COLOR_IN}' + LANG.SERVER.txt_RES_metal + ', {/COLOR_O}' +
                                                    '{COLOR_R4}' + addDots(roundNumber(escombros[1] * enviadasDef[i] / totEnviadasDef, 0)) + '{/COLOR} ' +
                                                    '{COLOR_IN}' + LANG.SERVER.txt_RES_cristal + '{/COLOR_O}' +
                                                    '{NL}';
                                  }
                             }

                             patronSAC += '{NL}{SIZE_PEQ}{ENLACE_SCRIPT}{/SIZE}';

                             html += codificar(patronSAC, 'HTML');

                             html += '</center><br></div>';
                             html += '</td></tr>';
                             html += '<tr><td><br><center>';

                             html += getCuadrosBBCode('', patronSAC,'','','','','','','');

                             break;
               }

               html += '</center></td></tr></table></center><br>';

               html += '</div>';
            }

            compactador.innerHTML = html;

            master = getElementsByClass("combatreport")[0];

            compactador.innerHTML = compactador.innerHTML + master.innerHTML;
            master.innerHTML = compactador.innerHTML;
            master.id = "compactado";

           } catch (e) {
             if (DEBUG_MODE != 0) GM_log('CompactadorBatallas >> generarPatron [ERROR]: ' + e + ' << ' + strPaginaActual);
           }
         } // generarPatron

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('CompactadorBatallas [ERROR]: <' + e + '> ' + strPaginaActual);
         DEBUG_MODE = old_debug;
   }
}


// name           OGame Redesign: Fleet Empty Space
// description    Adds information about the available empty cargo space in the tooltip of every fleet on the fleet movement page.
// version        1.00
// date           2011-05-24
// author         Vesselin Bontchev
function EmptySpace()
{
  try {
     // The following "if" is not really necessary but with it this script will work for Opera too
     if ((document.location.href.indexOf ("/game/index.php?page=movement") < 0))
       return;

     if (! show_Empty_Space) return;

     if (DEBUG_MODE > 0) GM_log('EmptySpace: ' + strPaginaActual);

     // SC, LC, LF, HF, CR, BS, CS, RC, BM, DR, DS, BC
     var shipCargoes = [5000, 25000, 50, 100, 800, 1500, 7500, 20000, 500, 2000, 1000000, 750];
     var shipNames = [LANG.SERVER.txt_SHIP_LG_npc, LANG.SERVER.txt_SHIP_LG_ngc, LANG.SERVER.txt_SHIP_LG_cl, LANG.SERVER.txt_SHIP_LG_cp,
                      LANG.SERVER.txt_SHIP_LG_crucero, LANG.SERVER.txt_SHIP_LG_nb, LANG.SERVER.txt_SHIP_LG_colonizador,
                      LANG.SERVER.txt_SHIP_LG_reciclador, LANG.SERVER.txt_SHIP_LG_bombardero,
                      LANG.SERVER.txt_SHIP_LG_destructor, LANG.SERVER.txt_SHIP_LG_edlm, LANG.SERVER.txt_SHIP_LG_acorazado];
     var locaFreeSpace = LANG.MISC.txt_espacioLibre;

     var fleets = document.querySelectorAll ("table.fleetinfo");

     if ((fleets == null) || (fleets.length <= 0))
       return;

     var fleet, i, shipsInfo, shipName, shipNumber, cargoUsed, cargoTotal, emptySpace, myTds, myTr, myTd;

     for (var fleet = 0; fleet < fleets.length; fleet++)
     {
       shipsInfo = fleets [fleet].getElementsByTagName ("tr");

       if (shipsInfo == null)
         continue;

       if (shipsInfo.length < 7)
         continue;

       cargoUsed = 0;

       for (i = shipsInfo.length - 3; i < shipsInfo.length; i++)
       {
         myTds = shipsInfo [i].getElementsByTagName ("td");
         if ((myTds != null) && (myTds.length >= 2) && (myTds [1].className == "value"))
           cargoUsed += parseInt (myTds [1].textContent.replace (/\D+/g, ""));
       }
       cargoTotal = 0;

       for (var i = 1; i < shipsInfo.length - 5; i++)
       {
         myTds = shipsInfo [i].getElementsByTagName ("td");

         if ((myTds == null) && (myTds.length < 2) && (myTds [1].className != "value"))
           continue;

         var shipName   = myTds [0].textContent.replace (/:$/, "");
         var shipNumber = parseInt (myTds [1].textContent.replace (/\D+/g, ""));

         found = false;

         for (j = 0; j < shipNames.length; j++)
           if (shipName == shipNames [j])
           {
             found = true;
             break;
           }

         if (! found)
           continue;  // Unrecognized ship name or a ship that doesn't have cargo space

         cargoTotal += shipCargoes [j] * shipNumber;
       }

       emptySpace = cargoTotal - cargoUsed;
       myTr = document.createElement ("tr");
       myTd = document.createElement ("td");
       myTd.appendChild (document.createTextNode (locaFreeSpace + ":"));
       myTr.appendChild (myTd);
       myTd = document.createElement ("td");
       myTd.className = "value";
       var myFont = document.createElement ("font");
       myFont.color = color_Empty_Space;
       myFont.appendChild (document.createTextNode (addDots (emptySpace)));
       myTd.appendChild (myFont);
       myTr.appendChild (myTd);
       myTr.id = "freeSpace";
       fleets [fleet].getElementsByTagName ("tbody") [0].appendChild (myTr);
     }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('EmptySpace [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// Description: Obtiene la produccion de energia del planeta, asi como la que
//              suministra cada satelite y el excedente de esta.
// Usado por MissingSats y MissingSatsInprove
function getEnergy()
{
  try {

       // The following "if" is not really necessary but with it this script
       // will work for Opera too
       if ((strPaginaActual != 'resources') &&
           (strPaginaActual != 'shipyard') &&
           (strPaginaActual != 'research') &&
           (strPaginaActual != 'station'))
       return;

       if (((! show_Sats_Balance)     &&
            (! show_Sats_Terraformer) &&
            (! show_Sats_Graviton))   ||
           (! EsPlaneta()))
       return;

       if (DEBUG_MODE > 2) GM_log('getEnergy: ' + strPaginaActual);

       var priTag;
       var ultTag;

       var resourcesText = document.body.innerHTML.substring (
                           document.body.innerHTML.indexOf('function initAjaxResourcebox'),
                           document.body.innerHTML.indexOf('function getAjaxEventbox'));


       // Energy
       var resourceTitle = resourcesText.substring (
                           resourcesText.indexOf('energy'),
                           resourcesText.indexOf('darkmatter'));

       var myMatch = resourceTitle.split('<td>');

       priTag = myMatch[2].indexOf('>');
       ultTag = myMatch[2].indexOf('<', priTag);
       energyProduced = myMatch[2].substring(priTag + 1, ultTag);

       energyProduced = parseInt (energyProduced.replace (/\./g, ""));

       var energyBalanceSpan = document.getElementById ("resources_energy");

       if (energyBalanceSpan == null)
         return;

       if ((strPaginaActual == 'resources') || (strPaginaActual == 'shipyard')) {

            energyBalance = parseInt (energyBalanceSpan.textContent.replace (/\./g, ""));

            if (energyBalance >= 0)
                return;
       }

       var activePlanets = document.getElementsByClassName ("planetlink active");

       if ((activePlanets == null) || (typeof (activePlanets) == "undefined"))
         return;

       if (activePlanets.length < 1)
       {
         activePlanets = document.getElementsByClassName ("planetlink");
         if (activePlanets.length != 1)
           return;
       }

       var theNumbers =  activePlanets [0].title.split (/[^\d.-]+/);

       if (theNumbers.length < 2)
         return;

       var maxTemp = parseInt (theNumbers [theNumbers.length - 2]);

       if (DEBUG_MODE != 0) GM_log('Temp. Max: ' + maxTemp + ' | ' + strPaginaActual);

       var engineerBonus = 1.0;
       if (document.getElementById("officers").getElementsByTagName("a")[2].
           getAttribute ("class").indexOf ("tipsTitle on") > -1)
       engineerBonus = 1.1;

       energyPerSat = Math.floor ((maxTemp + 140) / 6 * engineerBonus);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('getEnergy [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Missing Sats
// description    Shows the number of Solar Sats that need to be built, in order
//                to make the energy balance positive.
// namespace      Vesselin
// version        1.05
// date           2010-10-11
function MissingSats()
{
  try {
         // The following "if" is not really necessary but with it this script will work for Opera too
         if ((document.location.href.indexOf ("/game/index.php?page=resources") == -1) &&
             (document.location.href.indexOf ("/game/index.php?page=shipyard")  == -1))
           return;

         if ((! show_Sats_Balance) ||
             (! EsPlaneta()))
         return;

         if (DEBUG_MODE > 1) GM_log('MissingSats: ' + strPaginaActual);

         function showMissingSats ()
         {
           if (DEBUG_MODE > 2) GM_log('MissingSats >> showMissingSats: ' + strPaginaActual);

           var theSpan = getElementsByClass ("solarSatEnergyInfo", document, 'span');

           if (theSpan == null)
             return;

           var mySpan = document.getElementById ("missingSats");

           if (mySpan != null)
             return;

           getEnergy();

           if (DEBUG_MODE > 2) GM_log('MissingSats >> showMissingSats >> Energy produced = ' + energyProduced + ' : ' + strPaginaActual);

           var satsNeeded = Math.ceil (Math.abs (energyBalance) / energyPerSat);

           if (! satsNeeded) return;

           mySpan = document.createElement ("span");
           mySpan.setAttribute ("id", "missingSats");
           mySpan.style.color = strColor_LPuNKTKit;
           mySpan.style.fontWeight = "bold";
           mySpan.style.cursor = "pointer";
           mySpan.style.cursor = "hand";
           mySpan.appendChild (document.createTextNode (" (" + satsNeeded + " Sat.)"));
           mySpan.setAttribute ("onclick", "document.getElementById ('number').value = " + satsNeeded);
           theSpan[0].parentNode.appendChild (mySpan);
         }

         setInterval (showMissingSats, 500);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('MissingSats [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function MissingSatsInprove(tech)
{
  try {
         // The following "if" is not really necessary but with it this script will work for Opera too
         if ( (strPaginaActual != 'station') &&
              (strPaginaActual != 'research'))
           return;

         if ( ( (! show_Sats_Terraformer) && (! show_Sats_Graviton) ) ||
             (! EsPlaneta()))
             return;

         if ( ( (tech == '199') && (! show_Sats_Graviton) ) ||
              ( (tech == '33') && (! show_Sats_Terraformer) ) )
            return;

         if (DEBUG_MODE > 1) GM_log('MissingSatsInprove: ' + strPaginaActual);

         function showMissingSats ()
         {
           if ( ( (! show_Sats_Terraformer) && (! show_Sats_Graviton) ) ||
                (! EsPlaneta()))
               return;

           if ( ( (tech == '199') && (! show_Sats_Graviton) ) ||
              ( (tech == '33') && (! show_Sats_Terraformer) ) )
              return;

           if (DEBUG_MODE > 2) GM_log('MissingSatsInprove >> showMissingSats: ' + strPaginaActual);

           var theDiv = document.getElementById ("description");

           if (theDiv == null)
             return;

           // Comprobar que estamos en la seccion correcta

           // Debe haber un <a href>
           var theA = theDiv.getElementsByTagName('a')[0];
           if (theA == null)
               return;

           // y onClick debe contener techID=33 para Terraformer o tech=199 para Graviton
           if (theA.getAttribute('href').indexOf('techID=' + tech) < 0)
               return;

           //Borramos nuestro span, si ya existiera
           var mySpan = document.getElementById ('lpunktkit-sats');

           if (mySpan != null)
               mySpan.parentNode.removeChild(mySpan);

           var theP = theDiv.getElementsByTagName('p')[0];

           // Obtenemos energia necesaria
           var energyNeeded;

           $('#costs #resources li.metal').each(function() {
                palabra = this.title.split(" ");
                palabra[palabra.length-1] = traduce(palabra[palabra.length-1]);

                if (DEBUG_MODE > 2) GM_log('MissingSatsInprove >> showMissingSats: [ palabra[palabra.length-1] = ' +
                                            palabra[palabra.length-1] + ' ] ' + strPaginaActual);

                switch (palabra[palabra.length-1]) {
                   case "Metal": break;

                   case "Cristal": break;

                   case "Deuterio": break;

                   default: energyNeeded = palabra[0].replace(/\./g,"");

                            if (DEBUG_MODE > 2) GM_log('MissingSatsInprove >> showMissingSats: case default ' +
                               '[ energyNeeded = ' + energyNeeded + ' ] ' + strPaginaActual);

                            break;
                }
            });

           // y el resto de valores de energia
           getEnergy();

           var satsNeeded = Math.ceil((energyNeeded-energyProduced)/energyPerSat);

           if (DEBUG_MODE > 0) GM_log('MissingSatsInprove >>  ' +
                               '[ Energy Needed = ' + energyNeeded + ' | ' +
                               '[ Energy Produced = ' + energyProduced + ' | ' +
                               '[ Energy per Sat = ' + energyPerSat + ' ] ' +
                               'Sats Needed = ' + satsNeeded + ' : ' +
                               strPaginaActual);

           if ((! satsNeeded) ||
               ( satsNeeded <= 0 ) )
               return;

           mySpan = document.createElement ("span");
           mySpan.setAttribute ('id', 'lpunktkit-sats');
           mySpan.appendChild (document.createElement ('br'));
           mySpan.appendChild (document.createTextNode (LANG.MISC.txt_faltaEnergy + ': '));

           var mySpan2 = document.createElement('span');
               mySpan2.style.color = strColor_LPuNKTKit;
               mySpan2.appendChild (document.createTextNode (addDots(energyNeeded-energyProduced)));

           mySpan.appendChild(mySpan2);

           var mySpan3 = document.createElement('span');
               mySpan3.style.color = strColor_LPuNKTKit;
               mySpan3.style.fontWeight = 'bold';
               mySpan3.appendChild (document.createTextNode (" (" + addDots(satsNeeded) + " Sat.)"));

           mySpan.appendChild(mySpan3);

           theP.appendChild (mySpan);
         }

         setInterval (showMissingSats, 500);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('MissingSatsInprove [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Show Resource Details
// description    Shows the details of the top resource boxes near them
// version        1.03
// date           2011-10-21
// author         Vesselin Bontchev
function ResourcesInfo()
{
  try {
         var url = document.location.href;
         // The following "if" is not really necessary but with it this script will work for Opera too
         if ((url.indexOf ("/game/index.php?page=")                   < 0) ||
             (url.indexOf ("/game/index.php?page=search")            >= 0) ||
             (url.indexOf ("/game/index.php?page=logout")            >= 0) ||
             (url.indexOf ("/game/index.php?page=buddies")           >= 0) ||
             (url.indexOf ("/game/index.php?page=notices")           >= 0) ||
             (url.indexOf ("/game/index.php?page=payment")           >= 0) ||
             (url.indexOf ("/game/index.php?page=showmessage")       >= 0) ||
//             (url.indexOf ("/game/index.php?page=traderlayer")       >= 0) ||
             (url.indexOf ("/game/index.php?page=searchLayer")       >= 0) ||
             (url.indexOf ("/game/index.php?page=rocketlayer")       >= 0) ||
             (url.indexOf ("/game/index.php?page=combatreport")      >= 0) ||
             (url.indexOf ("/game/index.php?page=globalTechtree")    >= 0) ||
             (url.indexOf ("/game/index.php?page=allianceBroadcast") >= 0))
           return;

         if (! show_Resources_Info)
             return;

         if (DEBUG_MODE > 0) GM_log('ResourcesInfo: ' + strPaginaActual);

         function showResInfo (resName, resText)
         {
             if ((resName == 'energy') && ( ! EsPlaneta() )) return;

             if (DEBUG_MODE > 1) GM_log('ResourcesInfo >> showResInfo: ' + strPaginaActual);

             var resourceBox = document.getElementById (resName + "_box");
             if ( (resourceBox == null) && (resName != 'honorScore') )
                 return;

             var resourceTitle;
             var myMatch;

             var priTag, ultTag;

             if (resName == 'energy') {
                          resourceTitle = resText.substring (
                                 resText.indexOf('energy'),
                                 resText.indexOf('darkmatter'));

                          myMatch = resourceTitle.split('<td>');

                          myMatch[0] = LANG.SERVER.txt_RES_energia;

                          for (i=1; i < myMatch.length; i++) {
                               priTag = myMatch[i].indexOf('>');
                               ultTag = myMatch[i].indexOf('<', priTag);
                               myMatch[i] = myMatch[i].substring(priTag + 1, ultTag);
                          }

             } else {

                     switch (resName) {
                     case "metal":
                          resourceTitle = resText.substring (
                                 resText.indexOf('metal'),
                                 resText.indexOf('crystal'));

                          myMatch = resourceTitle.split('<td>');

                          myMatch[0] = LANG.SERVER.txt_RES_metal;

                          for (i=1; i < myMatch.length; i++) {
                               priTag = myMatch[i].indexOf('>');
                               ultTag = myMatch[i].indexOf('<', priTag);
                               myMatch[i] = myMatch[i].substring(priTag + 1, ultTag);
                          }

                          break;

                     case "crystal":
                          resourceTitle = resText.substring (
                                 resText.indexOf('crystal'),
                                 resText.indexOf('deuterium'));

                          myMatch = resourceTitle.split('<td>');

                          myMatch[0] = LANG.SERVER.txt_RES_cristal;

                          for (i=1; i < myMatch.length; i++) {
                               priTag = myMatch[i].indexOf('>');
                               ultTag = myMatch[i].indexOf('<', priTag);
                               myMatch[i] = myMatch[i].substring(priTag + 1, ultTag);
                          }

                          break;

                     case "deuterium":
                          resourceTitle = resText.substring (
                                 resText.indexOf('deuterium'),
                                 resText.indexOf('energy'));

                          myMatch = resourceTitle.split('<td>');

                          myMatch[0] = LANG.SERVER.txt_RES_deuterio;

                          for (i=1; i < myMatch.length; i++) {
                               priTag = myMatch[i].indexOf('>');
                               ultTag = myMatch[i].indexOf('<', priTag);
                               myMatch[i] = myMatch[i].substring(priTag + 1, ultTag);
                          }

                          break;
                     }
             }

             if (DEBUG_MODE > 1)
                 GM_log('ResourcesInfo >> showResInfo: ' + resName + ' [' +
                         resourceTitle + '] >> ' + strPaginaActual);

             if (myMatch == null)
                 return;

             var myDiv = document.createElement ("div");
                 myDiv.style.position = "absolute";
                 myDiv.style.width = "48px";
                 myDiv.style.top = "35px";
                 myDiv.style.margin = "-35px 0px 0px 53px";
                 myDiv.style.fontSize = "9px";
                 myDiv.setAttribute ('align', 'right');


             myB = document.createElement ("b");

             var resTitle = "";
                 resTitle = myMatch [0] + ': ';

             myB.appendChild (document.createTextNode (resTitle));  // Res_title
             myB.style.fontSize = "0.9em";

             var mySpan = document.createElement('span');
                 mySpan.style.color = strColor_LPuNKTKit;

                 mySpan.appendChild(myB);

             myDiv.appendChild (mySpan);
             myDiv.appendChild (document.createElement ("br"));

             mySpan = document.createElement ("span");

             if (resName == "energy") {
                 mySpan.style.color = color_Res_Prod;
                 mySpan.setAttribute("Id","energy_produced");

                 mySpan.appendChild (document.createTextNode(addDots(Math.abs(myMatch [2].replace(/\./g,"")))));
             }
             else {
                 mySpan.style.color = color_Res_Almacen;
                 if (myMatch [2].length > 7)
                     mySpan.style.fontSize = "0.9em";

                 mySpan.appendChild (document.createTextNode (addDots(myMatch [2].replace(/\./g,""))));  // Res_storage
             }

             myDiv.appendChild (mySpan);

             if ((resName != "energy") && (parseInt(getVersionOgame()[0]) >= 3) &&
                (myMatch [4]>0) ) {
                  myDiv.appendChild (document.createElement ("br"));

                  mySpan = document.createElement ("span");
                  mySpan.style.color = color_Res_Den;

                  if (myMatch [4].length > 7)
                     mySpan.style.fontSize = "0.9em";

                  mySpan.appendChild (document.createTextNode (addDots(myMatch [4].replace(/\./g,""))));  // Res_den

                  myDiv.appendChild (mySpan);
             }

             myDiv.appendChild (document.createElement ("br"));

             mySpan = document.createElement ("span");
             mySpan.style.color = color_Res_Prod;

             if (resName=="energy") {
                 mySpan.style.color = color_Energy_Used;
                 mySpan.className = "";

                 mySpan.appendChild (document.createTextNode (addDots(Math.abs(myMatch [3].replace(/\./g,"")))));  // Ener_use

                 myDiv.appendChild (mySpan);

             } else {
               if (EsPlaneta()) {
                 if (myMatch [3].length > 7)
                     mySpan.style.fontSize = "0.9em";

                 mySpan.appendChild (document.createTextNode (addDots(Math.abs(myMatch [3].replace(/\./g,"")))));  // Res_prod

                 myDiv.appendChild (mySpan);
               }
             }

             resourceBox.appendChild (myDiv);
         }

         var resourcesText = document.body.innerHTML.substring (
                             document.body.innerHTML.indexOf('function initAjaxResourcebox'),
                             document.body.innerHTML.indexOf('function getAjaxEventbox'));

         showResInfo ("metal", resourcesText);
         showResInfo ("crystal", resourcesText);
         showResInfo ("deuterium", resourcesText);
         showResInfo ("energy", resourcesText);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ResourcesInfo [ERROR]: <' + e + '> ' + strPaginaActual);

   }
}

// name           OGame Redesign: Point Board Link Really to the Forum
// description    Makes the "Board" link in the footer menu point really to the forum instead of to the useless portal.
// version        1.00
// date           2010-08-18
// author         Vesselin Bontchev
function ForumLink()
{
  try {
     // The following "if" is not really necessary but with it this script will
     // work for Opera too
     if ( (document.location.href.indexOf ("page=techinfo") >= 0) ||
          (document.location.href.indexOf ("page=globalTechtree") >= 0) ||
          (document.location.href.indexOf ("page=techtree") >= 0) ||
          (document.location.href.indexOf ("page=buddies") >= 0) ||
          (document.location.href.indexOf ("page=notices") >= 0) ||
          (document.location.href.indexOf ("page=combatreport") >= 0) ||
          (document.location.href.indexOf ("page=writemessage") >= 0) ||
          (document.location.href.indexOf ("page=search") >= 0))
       return;

     if (! fix_Forum_Link) return;

     if (DEBUG_MODE > 0) GM_log('ForumLink: ' + strPaginaActual);

     var footer = document.getElementById ("siteFooter");
     if (footer == null)
       return;
     myAs = footer.getElementsByTagName ("a");

     for (var i in myAs)
     {
       var theA = myAs [i];
       if (theA.href.indexOf ("http://board.") >= 0)
       {
         theA.href += "index.php?page=Index";
         break;
       }
     }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ForumLink [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Moons to the Right
// description    Makes the icon of the moon larger and to the right for easier clicking.
// version        1.05
// date           2011-10-20
// author         Vesselin Bontchev
function MoonsToRight()
{
  try {
       var url = document.location.href;

       // The following "if" is not really necessary but with it this script will work for Opera too
       if ((url.indexOf ("/game/index.php?page=")                   < 0) ||
           (url.indexOf ("/game/index.php?page=search")            >= 0) ||
           (url.indexOf ("/game/index.php?page=logout")            >= 0) ||
           (url.indexOf ("/game/index.php?page=buddies")           >= 0) ||
           (url.indexOf ("/game/index.php?page=notices")           >= 0) ||
           (url.indexOf ("/game/index.php?page=payment")           >= 0) ||
           (url.indexOf ("/game/index.php?page=showmessage")       >= 0) ||
//           (url.indexOf ("/game/index.php?page=traderlayer")       >= 0) ||
           (url.indexOf ("/game/index.php?page=searchLayer")       >= 0) ||
           (url.indexOf ("/game/index.php?page=rocketlayer")       >= 0) ||
           (url.indexOf ("/game/index.php?page=combatreport")      >= 0) ||
           (url.indexOf ("/game/index.php?page=globalTechtree")    >= 0) ||
           (url.indexOf ("/game/index.php?page=allianceBroadcast") >= 0))
         return;

       if (! show_Moons_Right) return;

       if (DEBUG_MODE > 0) GM_log('MoonsToRight: ' + strPaginaActual);

       var moons = document.querySelectorAll ("a.moonlink");
       if (moons.length == 0)
           return;

       for (var i = 0; i < moons.length; i++)
       {
            var thisMoon = moons [i];

            // Solo mover la luna si no la ha movido otro Script
            if (thisMoon.offsetLeft <= -2) {
                thisMoon.style.left = ( $(".planetlink").length > 5 ? "110px" : "95px");
                thisMoon.style.top  = "0px";
            }

            var img = thisMoon.getElementsByTagName ("img") [0];
                img.removeAttribute ("width");
                img.removeAttribute ("height");
                img.style.width  = "25px";
                img.style.height = "25px";
            }

            var wrenches = document.querySelectorAll ("a.constructionIcon");
            for (var i = 0; i < wrenches.length; i++)
            {
                 var thisWrench = wrenches [i];
                     thisWrench.style.left = "5px";
                     thisWrench.style.top  =  "0px";
            }

            wrenches = document.querySelectorAll ("a.constructionIcon Moon");
            for (var i = 0; i < wrenches.length; i++)
            {
                 var thisWrench = wrenches [i];
                     thisWrench.style.left = "132px";

                 if (document.getElementsByClassName ("anti_planets_constructionMoon")[0])
                     thisWrench.style.top  =  "30px"
                 else
                     thisWrench.style.top  =  "25px";
            }

            var alerts = document.querySelectorAll ("a.alert");
            for (var i = 0; i < alerts.length; i++)
            {
                 var thisAlert = alerts [i];
                     thisAlert.style.left = "132px";
                     thisAlert.style.top  =   "8px";
            }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('MoonsToRight [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Direct Colonization
// description    Removes the annoying prompt when trying to colonize without available planet slots.
// version        1.00
// date           2010-08-16
// author         Vesselin Bontchev
function QuitarAdvertencia()
{
  try {
       // The following "if" is not really necessary but with it this script will work for Opera too
       if (document.location.href.indexOf ("/game/index.php?page=fleet3") == -1)
         return;

       if (! remove_Adv) return;

       if (DEBUG_MODE > 0) GM_log('QuitarAdvertencia: ' + strPaginaActual);

       var myScript = document.createElement ("script");
       myScript.setAttribute ("type", "text/javascript");
       myScript.setAttribute ("language", "javascript");
       myScript.text =
         "function trySubmit ()\n" +
         "{\n" +
           "\tif (validated)\n" +
           "\t{\n" +
               '\t\t$ ("#metal").val (getValue ($ ("#metal").val ()));\n' +
               '\t\t$ ("#crystal").val (getValue ($ ("#crystal").val ()));\n' +
               '\t\t$ ("#deuterium").val (getValue ($ ("#deuterium").val ()));\n' +
           "\t\tdocument.sendForm.submit ();\n" +
           "\t}\n" +
         "}";
       document.body.appendChild (myScript);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('QuitarAdvertencia [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Coordinates Links Fix
// description    Fix the coordinates links.
// author         Vesselin Bontchev
// version        1.00
// date           2010-09-16
function LinkFixed()
{
  try {
        var url = document.location.href;

        if ((url.indexOf('showmessage') < 0) &&
            (url.indexOf('movement') < 0) &&
            (url.indexOf('galaxy') < 0)) return;

        if (! show_Link_Fixed) return;

        if (DEBUG_MODE > 0) GM_log('LinkFixed: ' + strPaginaActual);

        var theAs, thisA, theHref, i;

        if ((url.indexOf ("/game/index.php?page=movement")    >= 0) ||
            (url.indexOf ("/game/index.php?page=showmessage") >= 0))
        {
            theAs = document.getElementsByTagName ("a");
            for (i in theAs)
            {
                 thisA = theAs [i];
                 theHref = thisA.href;

                 if (theHref && (theHref.indexOf ("galaxy=") >= 0) &&
                    (theHref.indexOf ("system=") >= 0) &&
                    (theHref.indexOf ("position=") < 0))
                    thisA.href += "&position=" + thisA.textContent.split (/[\[:\]]/) [3];
            }

        } else { //Galaxy
              if (url.indexOf('position=') < 0) return;

              function framedLinks() {
                  try {
                       if (url.indexOf('position=') < 0) return;

                       if (! show_Link_Fixed) return;

                       if (DEBUG_MODE > 1) GM_log('LinkFixed >> framedLinks: ' + strPaginaActual);

                       var partes = url.split('&');

                       var indexRow = parseInt(partes[partes.length-1].replace('position=', ''))-1;

                       if (indexRow < 15) {
                           var inxGalaxy = parseInt(partes[partes.length-3].replace('galaxy=', ''));
                           var inxSystem = parseInt(partes[partes.length-2].replace('system=', ''));

                           if (inxGalaxy != document.getElementById('galaxy_input').value) return;
                           if (inxSystem != document.getElementById('system_input').value) return;

                           var theRow = getElementsByClass('row', document, 'tr')[indexRow];

                           var myStyle = theRow.getAttribute('style');
                           if (myStyle != null) {
                               if (myStyle.indexOf('border:') < 0)
                                   theRow.setAttribute('style', 'border:1px dashed ' + strColor_LPuNKTKit + ';' +
                                                                myStyle)

                               else {
                                   var partes = myStyle.split(';');
                                   for (var i = 0; i < partes.length; i++) {
                                        if (partes[i].indexOf('border:') >= 0 ) {
                                            partes[i] = 'border:1px dashed ' + strColor_LPuNKTKit;

                                            break;
                                        }

                                        if (partes[i].length > 0)
                                            myStyle += partes[i] + ';';
                                   }

                                   theRow.setAttribute('style', myStyle);
                               }

                           } else
                               theRow.setAttribute('style', 'border:1px dashed ' + strColor_LPuNKTKit + ';');
                       }

                  } catch(e) {
                      if (DEBUG_MODE != 0) GM_log('LinkFixed >> framedLinks [ERROR]: <' + e + '> ' + strPaginaActual);
                  }
              }

              framedLinks();
              setInterval(framedLinks,1000);
        }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('LinkFixed [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Additional Resource Loading Buttons
// description    Buttons for "None" and "Reverse order" resource loading on the
//                3rd fleet dispatch page
// author         Vesselin
// version        1.03
// date           2011-10-19
function ResourceLoadButtons()
{
  try {
      // The following "if" is not really necessary but with it this script will
      // work for Opera too
      if (document.location.href.indexOf ("fleet3") == -1)
        return;

      if (! show_Load_Buttons) return;

      if (DEBUG_MODE > 0) GM_log('ResourceLoadButtons: ' + strPaginaActual);

      const ICON_REVERSE_OFF = "data:image/gif;base64," +
        "R0lGODlhIAAgAPcAAJdsIeGSQ+icb/LKruGOQuGIQ9poFy0mHNtyMeSOWqF1F7iAMeGdP9WAOdty" +
        "GuGIUd2ESuGFROGVQctvGiIdFN5wL+GVReupg+GZQjgvF9t2G9ZxKplaAPTUuqhiAN10Mqp0Ifnm" +
        "2uGGQ+GAQ7J+MrF7Ld91ONuBHqJpGOmkevjh0t6ITJ1wGOOKWO69ltuIIeWSYdBwIItoGaN0Mpx0" +
        "GNt9He+6m9JwJNpgFNyMIoxSAOGCQzYxLOGDRTk1MOOOW/np3QkEAOGLQ990NdeBPeCaPOSQXdqF" +
        "ReKKVtpfE+GYRcGGMdyKIZpvKbJoAJ9iAPbczP77+dyRJOCZP9uFINiAPuqsfeCXPdVxJvPMtYdT" +
        "AJVlAOGKVLx+JdJ/NOGPQ59zGKJfAPXXxDw4M9psGOGMRNVdEuWQXvvv5i0oI9uDIN19QeGcQ5Vp" +
        "APbZx5JgAKNqGKBoF6ZxJYVaAO6zktplFeCZO9peE9pnFq98MtyOI9mDQtpkGOKNV55eAN+GTdyE" +
        "R9hcEsCCLOOLWe2xjat3LN+JUNlyLthyLjIuKuGaP+KJVdhyLOKMWeCSP9+BQ+CHURQUFQEBARAL" +
        "ABoWE990N91yNeF+QuWPXeSPXOSPXeF/QtxyM95zNNpjFd10NJdZAN1yNNleE+F/Q+WPXuKKVf/+" +
        "/hwYE5tcAOF9Qtt/HhgYGdt5G9hxLeWRW9diFOOOWZNmAJNiAOF+Qx8TAM5+LslvFuOLWPjk1f32" +
        "8oJNAM5vHemgddyDRv78+uWbV/HCqOKDS/jj1uibafz07993O+idcOWOXOWPXOaUZd+ITvrr4Nhg" +
        "E9yGIN+GM9lxLvC/ouqxfCQaANqDRNpwGZVxF9N/OHpSAI9fGA0HANeDPuGBQ/HIqMduEdOCOOCe" +
        "PNp6HL18H6B0L9+IQzEsJ9lgFNliFIpjANpjFuKLVp53GOB9QeF+QeSOXNlxK91zNadvH9yGSd+Z" +
        "OuB/QtuMItyNIq56J59yLaBzMvfe0NhsFuCXOdhnFdlmFt10Nf///yH5BAAAAAAALAAAAAAgACAA" +
        "Bwj/ACVJCkKwoMGDCBMKlDRJFwdQEEFxmEixosWJEidqoTVQVzdbtiZM2EWyZIyTJ2/EuMGypcoY" +
        "uzgEyYZqZMobWHLq3MCTJyNGz1oFbdUTi5NsQUCtzLmBkTtGh6JGRUC1qtWqUY8mxdJ06lVOYMOK" +
        "HcsJgVZUGxAdoio2lNtQluLKnSvXrVYOhz6EhSv3n99//gL7e2fp77+5Wv18WPxJcOAsf6E49gfZ" +
        "r2TBiRk3HlLJxIW/yxwP+ew3tOPMHxp3NnHLcDHBlVr/fX0aqeJPnzp3NvU32ZDfQ0zw9pusUqXa" +
        "QVClHlKs0pB8f+kYBw7dr/Tp/ob4O/uBuYkh0P66/zE+PbxfN8Cn/77bvdgQY3+J/SYP36/89M6z" +
        "H82mo4L/BH9FEUwnBHbSToADFkigW5yEkQ1/d0Sowl/G3JFEhHdM6JcxonTo4R2BmGEGBw/qkMSF" +
        "vIh34ol3pHheEh6KEqEozJiBSokWnmjDX1ng4KOPO/qVxYon4sAMM684yN+KPmr4zwU/NvkXlFGa" +
        "88orHjyoRRJR8hHFXz14IqYnXoIpJjqe1NEPP1kGoYOYdcRZxw6G9SPnnHX2g4cBBpChT5s6qInH" +
        "oHta8RcufCZqqF+IkuEoNdQAyqejlJIxwF/cVGopptQ44IAGGgBKBqSkeurAMn9ZYaqnqPoVDSus" +
        "1JxQg4NBaKHBp6DmqoEzhunKCq9/qXLCCWrQqgU4siar7LI1qNKssMOqQUUzL7zwBFJaDEsssWqo" +
        "wS233UpLxbjUvsBEDjnUc2MQc5Rb7bvwxmvuuejWo8e9UlwbxDU50FNvPQAHLHDA9+IrxcEHyxKE" +
        "JLTM0YYsb0C8hSwUT7zFFrFcjHEssbTh8cfnSLNQEJOUbPLJKKeM8sKSBAQAOw==";

      const ICON_REVERSE_ON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAAB" +
        "zenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAACx0lEQVR4nL2XMWvbQBTHT06MFRdDp36CuiGBgpc" +
        "MxaQQMnbp4CWhZPGnyNrRY8GLwQQ8BDq4thNPhiwOLZhAMKF4NYSCAx2Nq1qS9Tqc7nT37iSdTaj" +
        "hxx3S/977693TGREAIBnLAnuLaMlnKXH302Br8ZixLAAAQjKWBa9fERh+JjCp/x9GNQKHe9QEsbd" +
        "o8vm3N5xltwR/Ou9ScTrH0twEpp/UaSVIIUddsaS6oH+7H/ioY9n7yEeG26uA26tI15je6RzD0yW" +
        "Bgk2A5LPUAE4oLsRBI06E0RRq6umSQCFH6BZM6kR6GjVJDFdnFHFuQu8kMsAqECXWJFk3gQGKAbd" +
        "XAff6NDUZ/m2qUw1cn0bEBA0WMzmq52yskwxMmyQ2udevgtevwurxRg4a+FqtiY4bsHUVQIm9fhX" +
        "8uy9KSdk9UW+i0xrgFdAk9/pV5YmccVsJmqRLNcArgAy4V2cAniPFXf76qQ2YpIs1oDQhSu79nqK" +
        "HmivVidPp+sioB5jYGbeV/dRtUZLO2MCoRqSTT9dM/u25EthUJ56AbJw2wy0o5EIDjSIH76czbkv" +
        "319XpmNQTDOB3OfDn2iCmumQDtmrAbRRpYwV+FHwxo/cuds10GHHdxW7yFjAxLvHq8UYJlKoTR4F" +
        "pM2xCpQJM1CiC29rXNxkKlqpr7UdjCD8HeAVEsYB/e64Exxoj3de3ErwC/DXUBGULlT8Yz6GBWOA" +
        "0XciyW+KoBpBDDP6LDRazdF3gQ7CYSYmX3RK4gwO9ASzEiN3Oms1U5w4OIobl6C1gBrBDNopz78c" +
        "n1GkrRaPVAYA7LEuoFRAdbsKwLM91jN5zeAXsnW1qIG5RUrCk6+KIuT+KTsJ8lsD3OtELn4v7IwV" +
        "pCwY1oi4QF647N+ChRT9UScay4HCPVuGhJTPRXHsu+McphJ/n+SwtycsXKvh6nM4Ue2ebf57/A7g" +
        "WUZUpB3X7AAAAAElFTkSuQmCC";

      const ICON_NONE_OFF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAYAAABkW" +
        "Oo9AAAACXBIWXMAALiMAAC4jAHM9rsvAAAMBUlEQVR4nJ3WWXBc9ZXH8X/f/XbfpbfbV92SWhu2j" +
        "AV2HK+xMSaGBDJVmaIyWWaepmoqyYQZlsqQIg8ZkjCpwjYYwzAswZa1datbsiVblrVakiUkecEQk" +
        "mACzkKmUkB4mBoDsWQtre7vPMiTqdS80NyHW/+HW7c+Vef/O+cIIVUiNAlTE4QlCV0WJITADAiiQ" +
        "qApKpokEwxIWELCERKukHDE6veOELhCJigkrICKIRQMSUMTCppQUDQVTwQwJUFQXf2nJQkUIRBKH" +
        "PFJH0VI3C4LHtINnpQjPCGbPCuC/ERxORAIcUgK8Iwi87QscVASHFQlntIVntRVHpcEh4IaT+oy+" +
        "5XV8yFD5RlN4WlZ4nldY78S4UVhcSgQ5KDksi9g8aCm87mAhNDkTw6tEIL9UoB+VWdashkLSIwoM" +
        "n2GwZAiMSIEZxSZISnAsCozquuMaBpjprl6VmTGTJ3RoM6gJtMvBEOyYEQIhoVgWJaYkiTOKDJjk" +
        "sGo0OhTQ3xXKNhCfHKoLwsyUpAhSWYwIHFaCE5JggFFYUIITguJEdVgSDMYCgYZNHVO6ypjrs3Zs" +
        "Mu4ZTHmBDljmwwFNQZ1jWHdZEjWGJZ0TkuCEUlwWpM4JSv0CcG4bPKEsPHKgcqaICNF6JNk+jWNU" +
        "VliWFYYUHRGA4JBxWLEDHPatBhwwoz6HhPpSqbq0owkPSZSlUxWVjFdVcVYLMZgyGHQcOhXHPrlM" +
        "MdVlX5JYUgNMSCb9EgSQ7LOk2oYSy0HKgm65QhDUoB+U2NEkRmUVHoUhVOKoD+oM2CFGI6GGUv6j" +
        "KerGa+vZ6JxLVMbb+Hcxk2cvWktM7UNTKdSTFdUMBaL0Re0OG6Y9Oo6/UJmKBBkQDbpVQT9aoB9W" +
        "oigXAbUEYITUpgJIRhQJQaEYFRoDAUMzgVkJnXBtC1xMRVjpraS8aZ1TN2xm/Nf/ypv3P8dLt93H" +
        "1N/dQ9nt2xiZm0drzdU8kqFw6QdYNKVOK8azAqFCcnkjGYypAqG1QAHDBu3nNJrAUFOcZm6AT2hS" +
        "pw2LY6ZDmcNnUk3yli8kpH6Jk7vuos3HzsAb70DyyUWgCWAuTkKFy9w6f4HOL15C+MNa5isTDHsO" +
        "gyFVoN4yjQZCIYYUwOMKDL7zDiOUD45NCYk8orOVDTGWCzGWSfMWTvGWCzKWT/Nz2rSjK9t5NzuL" +
        "3HlxaOU5uahCIulZSgtweISV4HCyurr7Z+2MbluO9O33sxkRZgz8QQTts+EYTPhhBiMhZl0I/y7a" +
        "RMqt/QZWWUiEmEkHmMiEuHlqM+Y7zFZVcdMXQ2/2LOXSw9+l+WPPmCJIiuLC1C6ztWhUfj1byn+6" +
        "SMKQIESfPBHfv7w95jZuoXJprrVsMWrmHSjnI06DHgRJtwwh1QLXSoDGlUU8rrJpOcx5ieY9Dxm/" +
        "Uomq1NM161ldv16XvvM7bw/PsQSBRZXCrA0z1tPHGL6y19j+K//hkvf/xEsLHB9bh4ocP2Xr/Dan" +
        "ruZ2tTEZF0tU8lapuMJJhMRhpJxpqIxnjYcTKUMaCQgkdMMzsbjnEl4TMXjzPqVvFxTxWzDOi5s3" +
        "cbP934Flq6xvFigtFKE937P63u/zKWdO7mw7XP8Yu+9LF+6BMUiS0CpNMe7//gvnN+6g9mbG5mtv" +
        "olZP8nLFR4jSY+ZmMezulNe6V0h6FINphMJJpIVTCcSnKuoYrq2mvNr1jO9bTu/euB7lFhmpQjLr" +
        "PCfXZ28vfceLmzfyOu7tvDm9jv42WM/obCywDwwzxIfPP8SF267k9mbG5lJr2HWTzLlxxlN+ZyLe" +
        "jwjhzDKSb0jBDnNYCaZZCpdxWxVJeera5lZW8eFpg1c2rWb9368n/nlOQoApSV+d+gQb+79Aq9u3" +
        "sDsllu4vH0Xl799P7AIJShR5L8HB7i46y4ufHYD59c0cbG2lnPVKcbTlVzwUzyrOwTLgdqqTEfQZ" +
        "DzlM5xOMpFOMVtXz+T6Bs5t2sSlPbexcLSVFQqsAKws8s6jj3Fu1y5e3b6VV3Zs5uKOHVz80legN" +
        "AcrwMIiK798lUu3383M1k1M3tzEdEMtE+kK+qt9Jn2fpwwbQwmUsT3JgudkQZdt0GZrZIIKeTtEN" +
        "mHRXZkk31THla7DFEuLfFgqUGSOy9/8Z1q23Up2TQ25uio6m9ZyasceClxljhUKLHP1jfP0bNlKr" +
        "i5Fp+fRFbbJBCUOh2ROBE1+LGlI5YQpKAmahUKrpXI4rNIS1jgScemsiJCpiZLdtIE/vHCYpdIyF" +
        "IGVOV5+8J/IblxHc1M1R2rryX12Db3bdrC8cpViYQUW4MPLb5DfuIFMQ4JO36M9HOJwVOMlR6fF0" +
        "dgvFILltKdVqHwDKv8/aFtTPe93NLPIMtcLJShe5/wDD3Fy8yaONdbQt2Y9vRsaGdy5hwIfs0CRY" +
        "hGu/up18p9ZR0e9R6fv0RENciSicTis0eJoHBBqeVBLEhwNKLTZGs03oM1hl6zv0F4dJn9rPW899" +
        "TiLxetcv3FHX3n4EU5s2cTxdWlONtxE38b19O3eS6HwMQtAkRJXX5vm5LYmMnVxcolVaHNU5XBYo" +
        "9XVPz203dI4GlFoCSsccR0yCZu2Kpd8Y5qpb30TWFxNfWGJt194juM7t9CzfQ29mxoZ2rWFmfu+A" +
        "6VFrhVKAPy+vZn8rfW010Tp9OJkI/8HbQvrHBAyRjl91JIELZJKh63RElVpC6sccR06PIvWpE33m" +
        "jq6d94BC6tjcn7+Gu+OD9Jz526G7t7C6J1bGd1zGyP/9giwCi0WC7z9gx/Sua6etqow2WiUTNjkS" +
        "EThSET/M7SsEWrJgraASsbR/wLaHg/RmgqRqUnRs3kH87+5zEJxiQVKzP3xHU793Tc49cXbOf3FP" +
        "Yze+1V+fX6YxdLc6ja1NE/fns/TdlOKlpRDJhIh65ocvQFtjxjsF8qnh7bGtFVo2KYjFqIlGaQj7" +
        "ZJb28A7L70AK4tcK65Qosgfxs4w+vDDdH/rH/hNe54Sc5RYhKUiHwwP0ntLI+31EVoqbDojLlnXp" +
        "CWq0hw16IianxIqyX+Gtke0v4Bmq3Wy6Rj5nbtZuXKFEnCtBIsAH30IH/4XFOEq87B8naU3f8fRu" +
        "+7hWFWUTJ1JS4VFZ8SlM/y/UJ2OqMmBgFoeNB4QtAqFo57KSxGVblflcNzgeT/EUU+nOREkVxWlt" +
        "TJB9gt7KL5+HkqLN9a6VfC1EqywDO9eof/vv0Hu5ga6q6JkPJ2XPIOMZ3LEM+l0dNqiCkcSOv+q6" +
        "sTKGaEhIWgXFpmoTWvY4pRtkQ1btEQjdEcssimXHs9h2PfJJ32O3f15Xn3xCRbffxuKH0PxI/jTe" +
        "/z2eCv9f3sv2do0vV6UXNQgW2XRFXY54Th0xGxyEZuMF6LDc/iR7JQHtQxBeyBENh7ixZhGNqpy1" +
        "NM54ofoSui0uhr5mMlx3+ZYyqXVD5FvrOL4LWvINdZxrKGWnsZ68jelaE069NTG6Eo5ZCtCtCdDt" +
        "CVC5KIGzb5Gi6fSnpDJeCY/MGwcRSpjMmmCZtmgK2Hy07hKe1yiw1PIRBROhgR9fpLOeIQWzyZTE" +
        "6U1aZNLh+lKx+itTXAi7dGTjnOsOkarHyJTHaE5EaIjHibnRcmHdXpdhc4KjfakTLYiQN7TeCQYL" +
        "K+PugHBc2qIE36YTCxIxtPJ+xa5hE1PXKfDj9Li2TQnQrRVWOQqHI6lXLqqXI5WmDSnLLpr4hyvj" +
        "NKdsMglXTKpMG2eQ4fn0BUJ0hs2ySYMWn2dfIVOb8Lm+6ZFvJzSR1XBo5ZCvtKhN+6Q9TVyvkned" +
        "+hMGuSjgt5qlWNVGq0xwfGUSj4RoMuX6K0xydWYZCpkOv0AJ6s1slHB8YTgVFJhKGmQqbTp9oN0J" +
        "yy64kH6EkHyyRDftlW8crYnIcnsNQQPJFT2xV0erXR43A9zKBpnX9zmQEzlgKtw0FZ4xtJ5PmLxj" +
        "KXzlKXxlKVx0DU56Jo8EVI4FJJ5OhjgPxyVg5bMflPwQ9fgMcfkccdmn+WwL2zxUFRmsykQWjlQu" +
        "RZTqMRlQVoI5JDA1ASekHBkQdDUsTQNK6BiKzqGomKqGpYkEwkoRISBI+sYuoqmyoRUFUtI2AGZs" +
        "GriSYKIInBlGVfIJAMBEgFBQCgIOfmJof8DrgstGQouqKMAAAAASUVORK5CYII%3D";

      const ICON_NONE_ON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAYAAABkWO" +
        "o9AAAACXBIWXMAALiMAAC4jAHM9rsvAAAMt0lEQVR4nJ3Y13Pc13XAcf8BjiSit13sLhbYAmDbb3" +
        "vfxaItCkmwiARJkaJAUZEdT2RFnnjGD/bIsT2iNLIMUyRFFSvWKDIBYjsauWgEiA42kTKpLnmiqD" +
        "ixTYIoW755QMYT5wnInblv9+Ez59xzbvlWfoGabxflISkqQPFQEQXFD1CZ93cU521DnJdPeV4Rom" +
        "35SLblUZG7MWU5OUhytiHJ30ZZ7gNICvIQ5+Qgzsmj9MFcynOKEeUUUbatkNyiUpQ5eZQWPkBxUS" +
        "7leTmUFeZSmFNAfqGcb212lObn01qSy49LpZzNVdBdUs7ZIjHdxXJ+XVLJqeIyzpSKOVMq5nSJiD" +
        "Oics6IJZwql9BdWsZJWTndolJeKi7hlXIpZ8QSzojKOV0i4qxIQnepgrcKZLxSKOJUUQW/LKjghy" +
        "IJzcXF5JQWbB6qK3mQblEpY9Iq5kuVjMpEjMpEXJTJGJVKGKmQkpTKGCovJ1lRwWilgtEKBWNyJa" +
        "OSSkYrqpioUjGuUDCqqGJYJuWiTMKwRMwFaTlJmYRZiYhJiZhLYhkTIjkXpCqeLZMgF+VuHirISg" +
        "hLVIzLqkhK5SQqyxiQlzBeIWNKImZELmNcVcWIqpKxGjWj1SqSKgVTWg0zOi3TWg2TNSomalWM1y" +
        "gZVW+sTVbKN+CV5YzIyxhWlDMolzEglTElVfOqWI1WIto8VKGSE5UbGK5UMKhQM6JWMq5SMq2sZV" +
        "KlYEJRy+VaA5c0BiaMAlM2K5c9TubqvEy6Hcy43cy43cy6nEyZTEzoBCa1JiaqjYyrTMRrakgq1Y" +
        "ypNIyqdQwoFFyqqOZ1uZ5qZcXmoWqVgsEqgQlVNSM6LWPaGiaraxmr1jKiVTFuMDJuMDJpdTDj9T" +
        "MbaGS6IchMaztzHbtY3LGXmcZWFhuCzHvrWHT7mbY6SRosJA02hvQCYyoNl2oExrUGhrVqJtQq3l" +
        "Ab0Kq3UEyCSklSZWK+upoJvYZxXTXzNTpmqg0sajUsGmtYsui44XdxrbGehR07WDp6lKvf/z53fv" +
        "osHz77LPPHjzO/bw/X24PcDga45jYza9awaDdwQ2fihlrPnMbAlM7AuF7FVK2aN3VmTNWqzUM1ul" +
        "oSWjMLNTWMGzQMC7VMmk1ctFi5ZDcy73Iy66tjpq2DicNd3Dn9Knz8OWQyLAMpMrByl9T1Ja797C" +
        "eM79/LbHszcw1+JhwWJiw6pgUtIzYjSYuRSZOWab2ON8wujDr95qEOnYZBvYk5Vx3THh9TbjvTTh" +
        "+zbh9zdY3cbA4y29LO1WP/wMdv98LKfbLAWmqVLOuQTrECrKQhm83y+Tt9XN99hCt7Opj3uTe2i9" +
        "PPpN3KtNPGtNPDvNPNWxY7Nq1m81CbtpYBg4kZl59pn59pv4tZXz1z/gALjUEW21q5ffRxrj93gr" +
        "Xlb1gjw/raCrDKnyan4NNP4f4yK2RZIQvffMWt519g8UAnc7tamK9vYM7XxGWvi3mfm2mfn1mXmz" +
        "ctNqy6LUBdJgNDFhtz/gbmAvXMNfhYqG9mqamZpdZ2rjy8l9udx/hi5hKrpFjLpCF1n09/+zbXvv" +
        "c0l556hjvdZ2F9lT8v3wNSrL5/kzvHv8fSvt0sBIMsNrQyW+9jod7HbF2ABa+Pt+xOHMIWUu8S9A" +
        "ybrMx765mtCzAb8LBQ38yV5iDXtu9k6eAB3n/iGVi7R3olBVng3z/nzuNP8d7hR7l68DC3jz9F6t" +
        "oNANYAsit8+S8vcHXffm7s3Mm14A4WmgJcqfczF6jnitfP2zYnTsMWoG5BT9JsZ6muicX6RuYbfC" +
        "w1BLnW0sqNnbtYPHKI959/EbIZSG1Avhoe5MPHn+Tmkf3cPHqIjx57gttnXiFFhjVghRRf9/TyXt" +
        "dx3u3o+BvoQqCB674G3rY6cOp0W4to0upgqSHIUnOQpWA9V4JtXG1v5/ruPdx49Aj/ceo11tfXya" +
        "QhnVnlD2+9xQfHjnPr4MNcObiHD7qO8dGzz5HOrEAGsmn4z7Exbj32JLf27ef69t1caWvhaksDV5" +
        "paudEY5B2bB5dg2ELVWwUG7Q5mG5uZaWlmpq2e+e3bWdq9k6ud+7h57FEIJciQ3Uh7Zp1PXj7Fu1" +
        "2P8d6jh7l1+ADXDj/Cze8+DdllyABrWbj9Hu8e+w7XD3aytGsP8ztbmW9tYKqxiYWGRv7V5sJhFr" +
        "bQ8M1aeo0Cg04nMaeVqEsg4XHRX+dmsCnA0L7tfNofIkOa+1lYZ4Xf/+wXhA7uJtHRSrK1icTD25" +
        "k42kWav3CPLKvZLKvvv8fAoUMMtTbSHwiQ8DtIOI1EbFYuOh2cNlswGrcQUZdgJGw00+e2E3aZiX" +
        "hM9NZ56a/30N9SR6xzL1/2hEmls5CGtfSfWfjlLxjo7CC0J0jf9jaSB3Yw9MghUizDehbW4O7tDx" +
        "ja30mifQMa9lkJeU2EXXZ6PVZeNZhxG03/P2j0/0ATQT/hvW18HY+wTpp0BtLc5/rzzzF6YD8XOt" +
        "pJbu9gdO8OLj/2BOuskMlkIAN/+fD3DB/YQ6K9kYH6ABG/jbDPTMTt4LzXxhsGC27jFlLvNpqIGi" +
        "30eaxEXWZibhM9fg+JgJt4s4/BznY++u1rrKWXSQOwzo0XXmTk4H4u7mlnpKODif17udT1XVZW75" +
        "IGMmT5080Fhh/ZSaK9kcFAgKjPRthvIupx0uez8xvBujWoRzARNZoIeW3E3BZibiPnfW4SfgfxJj" +
        "eDu5q58tOfAOsbxZRe55Nz75DseoShozsZOLCDqaOHuP7zE5BaJZWGLBm+6I+QeLiFeGsdA3V1RP" +
        "2W/4Ha6fPZecNg2lrVuw0GIoKRsMdC3GX6KzTusxNrdDG4s5WLR45BannjjF+9zxez44z//TEmvt" +
        "PJpSc7mT3exeUz3ZBNsZqB5fX7fHzqNP172jey4vcT81mI+EzEXDb6/FZe1xu31vBdej0xwUDIbS" +
        "buMhF3GznvdRHz2ogFbMRamhjtPMLdz95nNbvOGhnufvkJEz/4ARPHjzL55KNMP/VPfHb1MsvpZV" +
        "YB0vcZ6eoi0dFGtN7NgMdL3GMm7DUSc9kIeS28rjdi12m3EFGdlqhB/7+gBs57HSS8FmIBG/FmHw" +
        "NtbXzedw6yq9zNrpMlwzdzs8w8d4ILP/4RnyWGgVVSpCAF/zU9RXL3DqJBH5GAi363h5jbRMRjJO" +
        "q0EvJaeE0nbO325NJqiOh1hF1m4m7jX6Fxj5lonZVEo53BpgCDjxwh9fEHpIG7wH2ycG8Z7v0RgL" +
        "vpNcius/rhHwh3PcGFZg8DjQ7CdU4GXE5ibhNht/A3UKumdgvXPJ2CkMZAr1eg1yEQceno8QlEPX" +
        "Z6vUZ66430NzmINXlJHD9E9s4ScJ8UkMkA2Q10mlX4+mPGfvQ0QzuCDAXsxOsE+vxWYj4zPT6BIY" +
        "uJqEPgnFfgVwYjVq1y81CDWklIYSJhsxG32hmymUk4zAzbXAw4bMQCDpIuJ3MePxc9dVzsOsqtf3" +
        "uT1FefQWqZDPdg9Y98cCFK8ul/JN7QyJjXR8JhJhywc8Hm4KLVTNRl5ILNQr/LRMhp4WStGauyeg" +
        "vv+toqwgo9cYuecxYd550aep0aog4TMZeeczY9cY+VAbeZhNtMyG1msCXAUFuQoZYgw8FmBoKNJI" +
        "IBwj47QwEX/R4bcZ+dsM9K1GUk5qjldx4VYYeaqF1F1KbhJY0eoXoLEVUrxPxOriJh1PCOuZoeh4" +
        "KwVUHCoGZIV8WAxUzMZqTHoSVcb6LPqyfiE4g4DQzW2Uj67Qy5zQx5LUScBqJeEz02LRGLgahJIG" +
        "HWMmhWEnIqiDoUxKxVxCzVPFdTg1oh2wJUWsZvZFUMGrREDDX0mCsJmxXEjLVELUoGzDpCQjXnBS" +
        "UhQUW/uZZhu54Bh55es5rzVg0Ju4GEqYaYoCZqrSXs0HPeqiVk1RHTa4kJanqtKnpMCmImFXGTlp" +
        "8rNRhEW4HKCjlRJSYkKBjUqgjpZYT1MiJ6JecschK1IobMcvotcno0JcRNMiIGKRGjjKilkqhNSd" +
        "hQQcQgZdBWRZ+2jLBeTFyQMGSsJGTWEBJURAQFsZoqhrVK+oRqnlHKqBEVbR6aX1LArvJt/LCmjG" +
        "61ghMGOSdr5ZxVKOmuqeRFtZiXqsp4WSHmdKWEs8oKXq4s57RCyqkqCaeqZJxWVHBSJuKMXMRZuZ" +
        "jXFVJerhDTLSvjRIWEF+QSflUp46RUTnelnH9WleGTbCO/ZAt/T98u0FKWW0BFwUPU5hZQKHoQcc" +
        "k2qnLyKC/KQVxSiLSoGEleAeX5BYjy8ikvzEeWl0tVTi7ivHxKCnIpKsmnqDgPcXEB5bn5SPKKkB" +
        "WUoMx9CGnBQ0iKc6nIz0eVX4C04CFycvPZVqjYNPS/AdhNZfbbDntkAAAAAElFTkSuQmCC";

      const ICON_MOST_OFF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAYAAABkW" +
        "Oo9AAAACXBIWXMAALiMAAC4jAHM9rsvAAALrUlEQVR4nMXYWXBU95XHcT/GwQZEg9CK1EIt1FJr6" +
        "da+sBgm4/FUAgRXzCYJLWhFUnffpVtICAgCSUhiMatT2JWqKechqSRT9tRkJpXKTGEQq1AjtXq9f" +
        "XtRSyBwPMYDNmAg33mg5j3SS07Vebz1/zyc8/vfe98A3vh79t9c//9A248TOPhBDIPbl3Py/UQub" +
        "Mvm3NYcTu9Yw/EqLUdqUzlSu5rju7M4sTOLkV06hqq09NdoGajWcrZ2DWerMji5Q8/w9kw+3J3Hh" +
        "9W5jFTrGN6dzMjOOE7uSGLkpzqEd3UsCLrvR6v43FbC5a5srtr1jFr13BFLuNlu5KY1i2uiji9kH" +
        "ZdlPaNWI6PWAi6LRi5LuVwVMvmiXcvtDh0OazbXOtdww5rLLbmIUUseo3Iu17uyuS6lM2bTM24v5" +
        "E9yOfs/SGXe0KEdOi7bTIxZVuMQ0nCY0/BJuUy16wgI6QTEVHxyKl45Hb+QjU/IwyXl4ZJyUORsw" +
        "lI2wQ4ts7Ieb2caqt2A25KJ26pnwpyOS9LhMifj7UzF3anjtmTkFy26+UNHdum4bDVxVzDg6c7BJ" +
        "evx2wvwCXmolmxUayZ+8XWrlhxUSx5+ax4+q4nJffmoYgnBzlyC5iwUMQu/ZMBtNhDsKsYrm1BsJ" +
        "oJiDhEpj4Aln9tWE79sz5o/9PRuHdekUlw2E96uXJyiHrclF79QQEgsIiQWEZBNBOR8wmI+04KJs" +
        "FCAIlYyaf8nHPb3cMsbmOgwEuwtwy0b8QomvEIhPrkMV2cBAXMhIWsxEaGcSbmST9vz5g89t13LL" +
        "VspHpsRj5yFYjegWAuYtq9HMa/DZ13HlFSCWzaiCrmELfmEzUU4xU380f4z/q1rF1d7tjF5eDOj5" +
        "kIm5GL8XRX4bRUE9m/AZSknIFbiby8jZF6PU9zEr1pM84eefz+FMVsZXtmIX17DbI+RQKcRtbOMg" +
        "HUTPnEjblsZXnsBqpRPSCzCJ63jxv5t8DgA30Xh63F4+GfuHvxHPN1rmbKYCIhleMRSpswlRLs34" +
        "e0oI2h+B5f0Lp82LgB6aUc6zp5KfFIuYXkN00Im94Qiwh0l+DrLCdnW4pfzUO05TNsLmOgsYKx3G" +
        "3+9+Rv4/iF8ex+euGHqN9yxr8MtmohIBczKRahSAT6xAEUsRhXKCVrWMiVt5NP63PlDL+7MYqJnA" +
        "37JRFgyEBUM3BNKCJtLmOvZiM+ShyJm4bHqUewVjB/4McHfnYBns/DiEXz/FURvcLlrC+qR9/Bb8" +
        "5gV8pjuyCQs56FIeShyAQFbKQGxnEn7Rv6lcQHQk7vzudPzHl6xgqBUSshaSESqICCU4mrPItpTS" +
        "NhmQLUXcUd+F8cZGV5+BTyD59/A0zn+2FuH4+D73O0oJNhp4PGBUkKtqwlJBvxyDl57Pp6uQty2c" +
        "sa6N/Jx2wKWaXC3kbHuf8YvrEUVylEtRahSOYpYiCpkEZIMBGQTk9I67vTVwiMVXj3hJc/g2UNun" +
        "TvA2OEq7lg3EJBKuG8zMdu+hr/Y8glLBvxSFl5bDr6uAtz2Em73rOOjNsMCAr8qiwn7JkKWMiJiK" +
        "SGriaBcQEjKZa4rF9WSjb9nE1ftPwHXf8F3D+HV1/DiPg8/O8vEwQ9wCutRxRJmbUbuSTnMmvU8E" +
        "HOICgZCYjZhyUBYzkOVCnB0l/PxPv38ocNV6bjt65m1FjMjFREUjATtJsJyHjOCAZ+lmNu9H/Diy" +
        "m/hL9Pw7Gv4LgLOzxnr2UzQ9g7TUglR0UhYen1T3beZmLYYmZEKiVpNzApG7omFRIVinPsrFgjdl" +
        "YpLLmPGaiJiM+GTcgnYjai2QqJCOd6urUx8PARPH8PLV/D0EcxcYezgZjxCOSFzHlEhlwe9RTitm" +
        "Xi7Cwl0r0URKwnK6whbK7lvLueBpYKouRKn/A6XWhewTMPbk3GJJqYtWaiyAY+YiSJnExTziArlj" +
        "Etb4MlDePnayZMHTB6vJWSrZFYsZE7MZdaaSdiSQaTHiEfKxyeXoAhlBMW1RMxl3Oso5kFnETMdR" +
        "TiFCi7tXcCMHv9JPDeaknHVxzC+N5ZbtcuZbFiOc89yfHtT+MMu/etQ/+szvn/+LTd+e5H/bjDhr" +
        "kpksjYB395VuHcvxlO1GHfNMjx1K/E1JOKsXsnUngScNfG4qzR4qpfiqo1htCGB89tXLWCZNidxq" +
        "ykRT8NinHs1OGpj8NVp8NXE4KvWcKs5F76ZgucPgMd877/C1fZKxncn4KiORWlaiVrzNqGqt5htT" +
        "ECp1jC+7QcE98bjro3FVavBU/M23tof4q1fxLXGOC7uSJs/dGDLKm43J+Gvfwt/3TI81UsJ1moIV" +
        "ccQrlqGoy6db//9FDwLwcs5+MbPy8u/4Iv2AsbrV6LULWK69oeou35ApDGRyZ3L8DclM1kbj7MhE" +
        "Xd9PN49S/HvWYKvfinXm7Sc350zf2jfVi03m1MJ1C8hWKtBqV5KqG4FoT3LCe2Owd+cwR9aSkH5D" +
        "3gehBdReKow97s+RpvS8DZoUKoWMdeawNi2Nwm1ribQtprxmlimGpNx7Y3DX7cUtXYxyt6l3GpN4" +
        "0LNAgK/d2sG15p1BOpXEK6PRanVoDbG42uIR61biacpjav7CvjM+iP433F4GYEXX8LjIK4T1Thas" +
        "/HUp+CvTiDStJpAwyqmalfgaYrD3RyHtyUWteFtwg1vEmxexHhHEhfrFvDifGhrBtdbMgk3xhFti" +
        "iXYoEHZF4+nZSWB1ng8zcmMtWbwn815OC42wdMpePEVvPwaHjn4fWMpTqECZ0M6rpok7rWvxte4j" +
        "EDbcjxtK/DtiyXYEkO4aSnhtqXctabwUX36/KH9m1MYb8lgtiWOuTYN062LCVg1uM3LCFhWMNUUg" +
        "6stAY89h88btHz52c/heQSezsGre/DlLX7dXIJDKCIiZBFs1hBqW8S0NQa3WYPXkkigIwm1PYlgZ" +
        "xJ3pWw+aljAjPZvTmR83xqi7Qnctywn3LkIxbYYp/gWTvPbzPSk4Nmnwdm2Eoc5jdH9FTy+cun1r" +
        "PI/8Oo+z27+kmv2SqYs6QQ6ljMjLEHpfBOXsBy3lIhXWIXfmkpATGW8K4eLTQsI/MNbVnJbyiG6X" +
        "0e0K4FIt4ZQXyzOniUoh5JQupMI2VNxd8ajyKncNGsZPfwuRP4MfAM8hicTPPnXLjwHigjaUrjXE" +
        "49fWoKrKw7vIS2e7mSUg1oCvSncPZLD6cYFfIX2/HQFo/tz8R/QEehJINCrQT22EuVYHN7DSa8P2" +
        "Z+KR0gg0pVEoFvLDVsWjos18MIHL1V4cgUe/Z67PdnM9mfhkZYw05eEejQV389TcB2Iw3c4Cf/Be" +
        "BxH13CqMXn+0AM747nWV4jSbyA8mE5oIJlgfxyhgURCfamoh1cTPJxJ8IAW1a4hcjAe/6E0Rvfru" +
        "Dywlj/1lXJnwIgybMB7VItyJIngoRXMHU9huj+FUF8S4b5E5ga1zBxNxjNo4ELj6vlDu36m4YujR" +
        "qaOZRIcySRyMp3QUDKRoVRmj2cQ7dejHtETOqYj0Ksh0BvD3IiO4KAO7+AalBN6vANJTBzSEDmjJ" +
        "3wqg+BAKrMjGYQH04kMphEd1nJvOJXwsSSmBnI4tUe7gBndGYfjRBm+oWy8QzrU0xn4h9MIDq8me" +
        "jyT+0M5uA+lofbriAyvQjkWy/RwGuoxLerRVGaG1xAc1hK9YOBWvxbPWRPekVzcx/T4h7JRhjNRT" +
        "mjxj6SgnkrDfa6YE3sXEE/C5iRunvgHvOfXcfdsMY6Lpdw+W8zkmVJcw4VEzr/D3aFC7ozk4zqXz" +
        "8TpLKZOmZgcNKIMF6IMm5g4YeDuhSLGP3mHmxc3MHl+I87T65k8tY7JMxU4zhfiOG/C80k51y9uo" +
        "mvXAqDAGz1bVvFhXQqDLSn0d6ZzuF3HYEcmx+tTONeq42RrGgONifQ3xtLfGMdIk47TTVmc2qPlk" +
        "84sBuqXM7gvkSMdqzi4N4H+mngu7cvmbKOeM616hlrTONaSxFBbCsKO5IX9JPt79t9a/wetNVkt5" +
        "gmfWAAAAABJRU5ErkJggg%3D%3D";

      const ICON_MOST_ON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAgCAY" +
        "AAABkWOo9AAAACXBIWXMAALiMAAC4jAHM9rsvAAALY0lEQVR4nMXY2W/b15XA8fw1A/ShadJJ4kU" +
        "LxX3RLmvfJa+J4z22E1vWwl1cfj+SoiiJWux0kjZNk0kdYIoB+tAWzUxjW15krRTXH8kfScnyNpb" +
        "tWrbznQdj5rnSSw9wni7OxQfn4uLg3reAt/6Z+Q/H/xUMNL+Lr/sdxg7vIXRwL2MHywgdLmH0+L8" +
        "invwF7tO/RDixh9CHKsJHtEx8VMz4sd0Ih9/Bd/hdJo7uYeLDojc1BxVMHzUw9bEO/7EihBMf4D7" +
        "2c4SP3mbkwG4GG95nR9DBlrf5s62Smw4js04j1yx67tiquNmv4+6QijsWBddsGv5mM3DNWsl1Szk" +
        "3HGXM2ktZcVWwYDYRsVayaqvm5iUDt/rLmR+oZfaCidkhAzcdRq7ZVcw6dCw46/nB0oJ7fxnbhoZ" +
        "P7OWGw8C8Vcm8XcWcuYyY3UisT8XagJbCgJaURceq3cSK3cSKQ0fEVUTCWURiUE1moJzkBRV5q5H" +
        "VS2Vk7OWkBwzI5nJi/UpSVi2RwWJWzSpilnLu2Bv4qq96+9DxM8X8aKsiMlxFRKxhyVVFSmgkY6n" +
        "lfl8N9/tqyJr3EbftI+KsJTJcQWxYTdKpRbLVsS50Ibv2kXaVk/SYSAwbSAyqWXdUINuM5B0msnY" +
        "DsrOclKOaWXsdv7HsABo+r+T2cCOS0ErEu4/F4Wqi7mbSjlYemNt5ONROwdFO2tVKUmgiKTSS9tQ" +
        "ieRpZdR1kyXWIZXcrc/YKEmMNxIQKMq4q8o5KCo4aMuZyspYKZEctGU8Ttz3N/NZZt33ozDk1y65" +
        "2Ct5Oos46Yt4G4mInaXE/sq2LvL2dzHATkqfhTbqbyTq7WHV9yGygj7/6P+V66ASL0x/x30ItC4E" +
        "G0v5W5OFm7gvd5GzNrDnbSNtayLq7WBR6+cbZuH3olVNqYu5ONrxdpOy1ZHytRL3tLA+3kXZ3k/V" +
        "0khX2IYt15IVGZG8Xkvsk80I/bBbgeQ425+H5da6FOlga7yDqbibn7iTraCdta2dDPEDG3oHs6WV" +
        "FPMB3jvrtQ7/9xEjW282as4F1bz05XxOSv5OErxtJ7ED2NZETTcguDRtiPRn3fu4KF2F+Fp49gq0" +
        "NeB6F1B+YHeth3tdCPthNwdPBmqebvKebNaGHnLuTgrebRKCH7y2V24d+d6aKjL+XNXcTa0IDOX8" +
        "zSf+bDeXRXmKuKu6HqlkXjaz72ogFTiB9/xU8ewYvNuFxFh7Mc238JEvhIyRGu5G9HRSG21gTepD" +
        "FbrL+LtJiB3mxi+RID/9hNW0f+s3ZRmIjh0iLLWQCraQDHST8B0n4D5PydSGPtJH2VpD11ZMMHCH" +
        "1tQ9ebsLLl/Dif+BZjr+N9zE/dpro6AFirmYeBQ9SGO4g5+1BErtIjnQRD7SRDnQQDXXxe/sOoL8" +
        "910Rk9BAJfwupYCvJQDsJ8QCSeJi00EXG1052pI2Yr4uF0U/gaQZePQG2YHON9LeTzPnPshr4mJT" +
        "Yy0bwAFlLM098h5E93UhiN4lAJzFfO6mRLiKhXr6zV20f+tWn9URHe0kHmsgGm8j4W8gJ3awJvRS" +
        "8nUhCO9nJ49wNnoD0LGzKwEN4vcGTP39LRDhPSjxF1nOINd8BMtZmtoIfs2bp4J57P7Knl4z/TWe" +
        "zvl6iwSNcte3g1n/5WR2rY71kA83kgs3kfa2sCx1siPvZ8PeSEA9wY+Qkr+f/CI9z8OIhvCrwKv4" +
        "XIuN9SN6j5IVDPBg5RMJez4NAD+uOTh55D7HhOUDB20Pe34ssdpP3HSQePMrvba3bh05fqGNltId" +
        "soJXCSDs5sZU1byfrYi8ZsYf41DkWvp+AVw9hawse3oPNBHNTF4gGDiMJ7ayPdpLxN5AO1pMNtpB" +
        "yNvIoeJA1oYuc0EnB10lWaCMn9hINfsQ3O4Ker2El0IUsvOlmztPEmruJdaENWezmtngUXqzDTy/" +
        "hFbC1yeIXdhb9B0iJrWyEOsiI1WQCtSRGakj4angU7iFrr2NNaKLgbWRNaCDvaUAWWoiM9PK1pXk" +
        "H0FMmFm11xPs1xIYMrA5qiPeXkhxQEbuk55a1CzbX4NVr+OklN/7wJT/YWonaq1m1lrPYpyIyqGF" +
        "5SMP8kJbFAQ2yzUjy0xLS/WUkL5YgXVKQ6lcQG1Rww2Lkiws1Oxihp0ws2apI9CuJmTWsDimID+5" +
        "FGiwmO6TjzlAzPMvBy7/Di4dsZW9yXdzPnX4dc+dKeBRo4M7p95GseiRnFSuXNETP76EwqEQeUJD" +
        "uKyU9UEqqv4TEUDG3bQZ+fbF2+9Cp0ybm7VXEBxRErUpWLaWsmveSNJeQsei43V/N1o2r8KIAr+7" +
        "BC4lnt37HdVcnKVctC6fe4b7LSPSzvSSGNEhWI6l+JdlBFdKQlsSAlqRZT3xQTcyiZM5h4nd9O+j" +
        "o9JnK/4fGrSpiFgUxi4KkRUVqUE3cUc9fbD0g/QhP4/AyC88kHvzpc+YtNaTNWqT+EjKDClJmDbL" +
        "NQLKviLxFS9psIDFkIGExETXriNlUzA+b+PbSDkbozMlqluz7SA2qyVh0SBYtKbOGtFVPwVZB9JK" +
        "JZWcX112H4eEcPE2/GZ0Ps0hXLhC11xDtV7PuqkSyaMkMlZHp20VhqBTZokGy6EjajMSsWpKOMlZ" +
        "cBq5eKt8JtIoley1pixrZriFr05K26pBtRmSzHtlaScxcxR1zPdkv++DxCmxtvsHem+e2cIglVwu" +
        "L5gpiFj2yXcN9h4Jc//vI1jLSVg0pp5GEXUdqWMWK18TVfuMOjv6kjgVXJSlnGXm3ipxLSdahRHa" +
        "qyVjLyLv0JMxKUp4KbtkrePRHEbYK8PwRbN0HeY4/Ccf4cbiDJW8jKbeJgr2I+8695O0KMk4Vksd" +
        "I3KUj6dWw7K/g3wcrdnKZVMx5K4i7lWQFJVlvKWl3KRm3Esmt4t5oBXFbCav2UlIBE9c9+3i6cBV" +
        "er8PWY3j1mCcL/8n18GlueJpYHtZT8CgoDO8h6yol7daQ9JUTFQzE/ToWRqr52ryDWT9+WsnNQA2" +
        "JkIn0qJ7siIbCqJ6kV4k0YiQR0JPw6Yh5VUiimtvDGm5dPgr5H+D1A/jpCfw9xsZ/hbk93s2cx8j" +
        "6hAlZLCbmLiYbqmAlYGI1VE18vJK7E/Vc3snRjx4r5pqvkkhQTypoQApoKYwZyI2ZSIaMxIIGoiN" +
        "6En41a0E1MW8Zs14D8e8uwpMFeCXB01l4/ld+9NeQvdJEKqAgFywlHzaQm65hNVROLFxFPFzOwlQ" +
        "dvxrQ7+S5XMydYBXJcRO5iXLkoJacX4kc0JAZM5IcNxEb1RMTlWz4S7kfUBD3FLEUMLIw08utyV4" +
        "WJhtJXm4gOVVOZlJHfryYfGgv0qiCREjDakhLctJAalxNJGzi15eKtg8d+3gXd4PlxIJlyOM68hN" +
        "6MgEl0oiS1Lia5ISGRFhPPKAgL+7mcaiEB+EysiElUriC1GQlsaCCiLib/BUDqVAJicB75KcUSGE" +
        "VyUkD0rSJzPSbtdUJPf/26Xvbh4ZO7Gb5cgXx8SJioVLSYS2JcTWpsIbI2B5WJ4qIT6uRJtVkgrs" +
        "pjO4hN1VCMrQbabSE3ISS3EQJj35TznKwiNSMntRkGdKMltTlcpIzVSRnqkhMmpAmtSR/Vcflz/Z" +
        "uH9q//wNuTtcSvaxnIWxgcaqauYlqFqZqWbpiYGFGw9yklpUZE9Gwgci4juXLFcxNaIhPmYhP6Ii" +
        "MqVkc17L0eS3LXzQwP1PFrTE9d6drmZvcx/z0Ppan60l+3sjclTZsx4u3DwXeMvf+jPCxnxE69gs" +
        "mThcROF5M8GQx4bPvMnn2bQJH/4Wx428zdeI9QsfeJ3hege9cCYHjv+Tzz4oYPfEOgZPv4j2zG9+" +
        "5IjzHfs7MxSImzu4ifGY3U5/sYvrMLqZOf4D9yAc7+yT7Z+Y/Gv8L4sc1nS8YXAMAAAAASUVORK5" +
        "CYII%3D";

      function addEvent (el, evt, fxn)
      {
          if (DEBUG_MODE > 1) GM_log('ResourceLoadButtons >> addEvent: ' + strPaginaActual);

          if (el.addEventListener)
              el.addEventListener (evt, fxn, false) // for standards

          else if (el.attachEvent)
              el.attachEvent ("on" + evt, fxn) // for IE

          else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
      }

      var tempWidth, myA, myImg, theA;
      var theDiv = document.getElementById ("loadAllResources");
          theDiv.setAttribute('style', 'z-order: 98;top:0;');
      var theMins = document.getElementsByClassName ("min");
      var myEvent = document.createEvent ("MouseEvents");

          myEvent.initMouseEvent ("click", true, true, window, 0, 0, 0, 0, 0,
                                  false, false, false, false, 0, null);

      if (document.getElementById('noneresources') == null) {
          /* Add a "unload all loaded resources" button */
          myA = document.createElement ("a");
          myImg = document.createElement ("img");
          myImg.setAttribute ("src", ICON_NONE_OFF);
          myImg.setAttribute( 'rel', ICON_NONE_ON);
          myImg.setAttribute ('class', 'lpunktkit-micon');
          myA.appendChild(myImg);
          myA.setAttribute ("href", "javascript:void(0);");
          myA.setAttribute ('id', 'noneResources');
          myA.setAttribute('title', LANG.MISC.txt_borrarSel);

          addEvent (myA, "click", function (e)
          {
              for (var i = 0; i < theMins.length; i++)
              theMins [i].dispatchEvent (myEvent);
          });

          theA = theDiv.getElementsByTagName('a');
          insertAfter( theA[theA.length-1], myA);

      } else {
          /* Add a "load most resources in reverse order" button */
          myA = document.createElement ("a");
          myImg = document.createElement ("img");
          myImg.setAttribute ("src", ICON_MOST_OFF);
          myImg.setAttribute ('rel', ICON_MOST_ON);
          myImg.setAttribute ('class', 'lpunktkit-micon');
          myA.appendChild(myImg);
          myA.setAttribute ("href", "javascript:void(0);");
          myA.setAttribute ('id', 'mostResources');
          myA.setAttribute('title', LANG.MISC.txt_recInversos);

          addEvent (myA, "click", function (e)
          {
              for (var i = 0; i < theMins.length; i++)
                   theMins [i].dispatchEvent (myEvent);

              var theRevMin = document.getElementsByClassName ("ago_fleet_mostResource");

              GM_log(theRevMin.length);
              for (var i = theRevMin.length; i >= 1; i--)
                   theRevMin [i - 1].dispatchEvent (myEvent);
          });

          theA = theDiv.getElementsByTagName('a');
          insertAfter( theA[theA.length-1], myA);
      }

      // Add a "load resources in reverse order" button
      myA = document.createElement ("a");
      myA.setAttribute ("href", "javascript:void(0);");
      myA.setAttribute ('id', 'reverseResources');
      myA.setAttribute('title', LANG.MISC.txt_recInversos);

      addEvent (myA, "click", function (e)
      {
          for (var i = 0; i < theMins.length; i++)
               theMins [i].dispatchEvent (myEvent);

          var theMaxes = document.getElementsByClassName ("max");

          for (var i = theMaxes.length; i >= 1 ; i--)
               theMaxes [i - 1].dispatchEvent (myEvent);
      });

      myImg = document.createElement ("img");
      myImg.setAttribute ("src", ICON_REVERSE_OFF);
      myImg.setAttribute ('rel', ICON_REVERSE_ON);
      myImg.setAttribute ('class', 'lpunktkit-micon');
      myA.appendChild (myImg);

      theA = theDiv.getElementsByTagName('a');
      insertAfter( theA[theA.length-1], myA);

/*      theDiv.getElementsByTagName('a');
      insertAfter( theA[theA.length-1], document.createElement('br'));*/
      insertAfter( myA, document.createElement('br'));

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ResourceLoadButtons [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Options in User Name
// description    Links the user name in the top menu to the options and removes the Options item from the menu
// author         Vesselin
// version        1.02
// date           2011-10-19
function OgameOptionsInUserName()
{
  try {
       var url = document.location.href;

       // The following "if" is not really necessary but with it this script will work for Opera too
       if ((url.indexOf ("/game/index.php?page=") < 0) ||
           (url.indexOf ("search")                >= 0) ||
           (url.indexOf ("logout")                >= 0) ||
           (url.indexOf ("buddies")               >= 0) ||
           (url.indexOf ("notices")               >= 0) ||
           (url.indexOf ("payment")               >= 0) ||
           (url.indexOf ("showmessage")           >= 0) ||
           (url.indexOf ("traderlayer")           >= 0) ||
           (url.indexOf ("searchLayer")           >= 0) ||
           (url.indexOf ("rocketlayer")           >= 0) ||
           (url.indexOf ("combatreport")          >= 0) ||
           (url.indexOf ("globalTechtree")        >= 0) ||
           (url.indexOf ("allianceBroadcast")     >= 0))
           return;

       if (! show_Options_In_UserName) return;

       if (DEBUG_MODE > 0) GM_log('OgameOptionsInUserName: ' + strPaginaActual);

       function addEvent (el, evt, fxn)
       {
           if (el.addEventListener)
               el.addEventListener (evt, fxn, false) // for standards

           else if (el.attachEvent)
               el.attachEvent ("on" + evt, fxn) // for IE

           else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
       }

       var divBar = document.getElementById ("bar");
       var divPlayer = document.getElementById ("playerName");

       if ((divBar == null) || (divPlayer == null))
            return;

       var text;
       var href = "";
       var lis = divBar.getElementsByTagName ("li");

       for (var i = 0; i < lis.length; i++)
       {
            var myLi = lis [i];
            href = myLi.firstChild.href;

            if ((href != null) && (href.indexOf ("page=preferences") >= 0))
            {
                 text = myLi.firstChild.textContent;
                 myLi.parentNode.removeChild (myLi);

                 break;
            }
       }

       if ((href == null) || (href == ""))
            return;

       divBar.style.position = "static";
       divPlayer.style.textAlign = "left";
       divPlayer.style.left = "0px";
       divPlayer.style.width = "150px";
       divPlayer.style.marginLeft = "20px";
       divPlayer.removeChild (divPlayer.firstChild);
       var span = divPlayer.firstChild;

       try {
            divPlayer.removeChild (span);
       } catch(e) {}

       setStyleSet('#playerName a:link,' +
                   '#playerName a:visited {text-decoration:none;}' +
                   '#playerName a:hover {text-decoration:none;color:' + strColor_LPuNKTKit + ';}' + //#9c0
                   '#playerName a:active {text-decoration:none;}');

       var a = document.createElement ("a");
           a.setAttribute ("href", href);
           a.setAttribute ("title", text);
           a.style.textDecoration = "none";

       try {
           a.appendChild (span);
       } catch (e) {}

       // Honor Score //////////////////
       var resourcesText = document.body.innerHTML.substring (
                           document.body.innerHTML.indexOf('function initAjaxResourcebox'),
                           document.body.innerHTML.indexOf('function getAjaxEventbox'));

       var resourceTitle;

       resourceTitle = resourcesText.substring (resourcesText.indexOf("honorScore"),
                                                resourcesText.length);

       resourceTitle = parseInt(resourceTitle.substring(
                                               resourceTitle.indexOf(':') + 1,
                                               resourceTitle.indexOf('}')));

       var myHonorSpan = document.createElement('span');

       if (resourceTitle >= 0)
           myHonorSpan.style.color = '#9ACD32'
       else
           myHonorSpan.style.color = 'crimson';

       myHonorSpan.appendChild(document.createTextNode(addDots(resourceTitle)));

       a.appendChild(myHonorSpan);
       //////////////////////////////////

      var  img = document.createElement ("img");
           img.setAttribute ("src", "data:image/gif;base64," +
        "R0lGODlhEAAQAOZcACc1Q6rK4z5VbGB8mjpPZT5UbERigUFcekVjhExphUVkhENffj1Ycz1WcTxW" +
        "cj1WcEZfejxWcTtPZUVfeUNhgEpngkNhglx5lEBZckVkg0Fac0FadD1Ua5KxyjpOZENgfi9EWpWz" +
        "zI6tyHiWsERhgV55klVyjUVgeYGfuUxmgExohWF8mkZjg198mEllgFZyjURigJCux4qpxGR8k46s" +
        "xVp2kUVgeklnh0pmgUNdeX2ZsVRyk5i30XyatIalwYWjvZSzzIWivD1UbXiWsYmow2F9mk9qhJKy" +
        "zExphEBbeUJffWaEom6Mp1d0kI2rxoyrxYmowmB9mmSCn5m40T5VbT1Xc3GPqjxXc0plgFt6l0ph" +
        "d2B6kgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
        "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5" +
        "BAEAAFwALAAAAAAQABAAQAfFgFwAg4SFhYIPWAGLKQ0RRgE/DxENgxgbJVMaQQE0MQEdlxqDFAYG" +
        "WT4sJAFHBjClBoMeBLQSWjMStASzBIMuOBVWixcmi09AFxWDSQfNi8+LPM2DDAPWA0UDUQMr1ksM" +
        "gyACBQUC4+TlDAIggxzm5joBQlQhW+4CgxMQHdDPJ/o2BiFRkQBKgBYJEjR5xiTBIAc5UIxY9KLG" +
        "oh4OqlwZpGTBByIBnAwJIGKBDCkeB1lQgKBlBgU7bijIsBIBAEGGcg7iEggAOw==");

           img.setAttribute ("align", "absmiddle");
           img.style.opacity = "0.5";
           a.appendChild (img);

      addEvent (a, "mouseover", function () { this.lastChild.style.opacity = "1"; });
      addEvent (a, "mouseout",  function () { this.lastChild.style.opacity = "0.5"; });

      try {
           divPlayer.appendChild (a);
      } catch(e) {}

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('OgameOptionsInUserName [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Return Fleet Question
// description    Asks the user for confirmation before returning a fleet.
// version        1.01
// date           2011-08-31
// author         Vesselin Bontchev
function ReturnFleetQuestion()
{
  try {
      // The following "if" is not really necessary but with it this script will work for Opera too
      if (document.location.href.indexOf ("movement") < 0)
        return;

      if (! show_Return_Fleet_Question) return;

      if (DEBUG_MODE > 0) GM_log('ReturnFleetQuestion: ' + strPaginaActual);

      function getWord (id)
      {
         if (DEBUG_MODE > 1) GM_log('ReturnFleetQuestion >> getWord: ' + strPaginaActual);

         var decisionYes = document.getElementById (id);

         if (decisionYes == null)
             return "";

         var myOnClick = decisionYes.parentNode.getAttribute ("onclick");

         if ((myOnClick == null) || (myOnClick == ""))
             return "";

         var parts = myOnClick.split ("'");

         if (parts.length < 2)
             return "";

         return parts [1];
      }

      function addEvent (el, evt, fxn)
      {
         if (DEBUG_MODE > 1) GM_log('ReturnFleetQuestion >> addEvent: ' + strPaginaActual);

         if (el.addEventListener)
             el.addEventListener (evt, fxn, false) // for standards

         else if (el.attachEvent)
             el.attachEvent ("on" + evt, fxn) // for IE

         else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
      }


      function myIndexOf (myArray, myElement)
      {
         if (DEBUG_MODE > 1) GM_log('ReturnFleetQuestion > myIndexOf: ' + strPaginaActual);

         if (myArray == null)
             return -1;

         for (var i = 0; i < myArray.length; i++)
              if (myArray [i] == myElement)
                  return i;
         return -1;
      }

      function fixTheLink (flight, flightID, enabled)
      {
         if (DEBUG_MODE > 1) GM_log('ReturnFleetQuestion >> fixTheLink: ' + strPaginaActual);

         var theAs = flight.getElementsByTagName ("a");

         if (theAs.length < 1)
             return;

         var myA = theAs [0];
         var url = document.location.href + "&return=" +
                   flight.parentNode.getAttribute ("id").match (/(\d+)/) [1];

             myA.href = "#";
             myA.removeAttribute ("onclick");
             myA.setAttribute ("onclick", "cancelFlight ('" + url + "', '" +
                               questionTitle + "', '" + questionBody + "', " + enabled + ")");

             myA.style.textDecoration = "none";
             myA.getElementsByTagName ("img") [0].style.verticalAlign = "middle";

         var mySpan = document.createElement ("span");
             mySpan.setAttribute ("id", "qMark" + flightID);
             mySpan.style.color = strColor_LPuNKTKit;
             mySpan.style.fontWeight = "bold";
             mySpan.style.cursor = "hand";
             mySpan.style.cursor = "pointer";
             mySpan.style.opacity = (enabled) ? "1.0" : "0.6";
             mySpan.appendChild (document.createTextNode (" ?"));

        flight.appendChild (mySpan);

        addEvent (mySpan, "click", function ()
        {
           var enabled = (this.style.opacity == "1");

           if (enabled)
           {
               turnedOff.push (flightID);
               this.style.opacity = "0.6";
           }
           else
           {
               turnedOff.splice (turnedOff.indexOf (flightID), 1);
               this.style.opacity = "1.0";
           }

           var myA = this.parentNode.getElementsByTagName ("a") [0];
           var newOnClick = myA.getAttribute ("onclick")
                            .replace (/,\s+\w+\)/, ", " + ! enabled + ")");

               myA.removeAttribute ("onclick");
               myA.setAttribute ("onclick", newOnClick);

           localStorage.setItem ("returnFleetOffQs", JSON.stringify (turnedOff));
        });
      }

      if (! (typeof PRO_setValue == "function") &&
            ( ! this.GM_getValue ||
              (this.GM_getValue.toString &&
               this.GM_getValue.toString ().indexOf ("not supported") > -1)))
      {
          this.GM_getValue = function (key, def)
          {
               return localStorage.getItem (key);
          }

          this.GM_setValue = function (key, value)
          {
               return localStorage.setItem (key, value);
          }

          this.GM_deleteValue = function (key)
          {
               return localStorage.deleteItem (key);
          }
      }

      var yesWord = getWord ("errorBoxDecisionYes");
          yesWord = (yesWord.length) ? ("'" + yesWord + "'") : ('yes');

      var noWord  = getWord ("errorBoxDecisionNo");
          noWord  = (noWord.length)  ? ("'" + noWord  + "'") : ('no');

      var myCode = "var theURL;\n" +
                   "function cancelFlight (url, title, question, enabled)\n" +
                   "{\n" +
                          "\ttheURL = url;\n" +
                          "\tif (enabled)\n" +
                                 "\t\terrorBoxDecision (title, '' + question + '', '" +
                                 yesWord + "', '" + noWord + "', returnFlightStart)\n" +
                          "\telse\n" +
                                 "\t\twindow.location.replace (theURL);\n" +
                   "}\n" +

                   "function returnFlightStart ()\n" +
                   "{\n" +
                          "\twindow.location.replace (theURL);\n" +
                          "\tcloseErrorBox ();\n" +
                   "}\n";

      var myScript = document.createElement ("script");
          myScript.setAttribute ("type", "text/javascript");

      if (window.opera)
          myScript.innerText = myCode
      else
          myScript.innerHTML = myCode;

      document.body.appendChild (myScript);

      if (GM_getValue ("ReturnFleetQuestion"))
          GM_deleteValue ("ReturnFleetQuestion");

      var turnedOff = new Array ();
          turnedOff = JSON.parse (localStorage.getItem ("returnFleetOffQs"));

      if (turnedOff == null)
          turnedOff = [];

      var retFlights = document.querySelectorAll ("span.reversal");

      for (var i = 0; i < retFlights.length; i++)
      {
           var flight = retFlights [i];
           var flightID = flight.parentNode.id.match (/(\d+)/) [1];

           if (myIndexOf (turnedOff, flightID) >= 0)
               fixTheLink (flight, flightID, false)
           else
           {
               var questionTitle = flight.parentNode
                   .querySelector ("span.originData span.originCoords a").textContent +
                                   " => " + flight.parentNode.querySelector
                                   ("span.destinationData span.destinationCoords a")
                                   .textContent;

               var questionBody = LANG.MISC.txt_cancelarViaje + "<br>";
               var tableCells = flight.parentNode.querySelectorAll
                                ("span.starStreak div.route div table.fleetinfo tr td");

               for (var j = 0; j < tableCells.length; j += 2)
               {
                    if (tableCells [j].textContent.match (/^\s+$/))
                        break;

                    questionBody += tableCells [j].textContent + " " + tableCells [j + 1]
                                    .textContent.replace (/\s+/g, "") + ", ";
               }

               questionBody = questionBody.replace (/, $/, "");
               fixTheLink (flight, flightID, true);
           }
      }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ReturnFleetQuestion [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name  OGame Redesign: Merchant Warning
// description  Shows a warning if you're about to waste 2.500 DM for a Merchant
// version  1.00
// date        2010-08-17
// author      Vesselin Bontchev
function ConfirmTrader()
{
  try {
       // The following "if" is not really necessary but with it this script
       // will work for Opera too
       if ((strPaginaActual != 'traderOverview') ||
           (document.location.href.indexOf ('page=traderResources') < 0))
         return;

       if (! show_Confirm_Trader) return;

       if (DEBUG_MODE > 0) GM_log('ConfirmTrader: ' + strPaginaActual);

       var onClick, element, warningText;
       for (var i = 1; i <= 3; i++)
       {
            element = $ ("#imageRes_" + i);

            if (element.length <= 0)
                break;

            onClick = element.attr ("onclick");
            if (onClick === undefined)
                break;

            warningText = $ (".costs").text ().trim () + "!";
            element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
       }
       $ ("#inhalt").ajaxComplete (function (e, xhr, settings)
       {
          if (xhr.status != 200)
              return;

          warningText = $ (".costs").text ().trim () + "!";
          if (settings.url.indexOf ("page=traderlayer") >= 0)
          {
              element = $ ("#merchanttable td.tradingRate a.tipsTitle");
              if (element.length)
              {
                  onClick = element.attr ("onclick");

                  if (onClick !== undefined)
                  {
                      element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
                      element = $ ("#merchanttable td.newRate input.buttonTraderNewRate");
                      onClick = element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
                  }
              }

              element = $ ("a.buttonTraderNewRate");

              if (element.length)
              {
                  onClick = element.attr ("onclick");

                  if (onClick !== undefined)
                      element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
              }
          }
          else if (settings.url.indexOf ("page=traderOverview") >= 0)
          {
              for (var i = 1; i <= 3; i++)
              {
                   element = $ ("#imageRes_" + i);
                   if (element.length <= 0)
                       break;

                   onClick = element.attr ("onclick");
                   if (onClick === undefined)
                       break;

                   element.attr ("onclick", onClick.replace (/(callTrader\(\d\))/, "if (confirm ('" + warningText + "')) $1"));
              }
          }
       });

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ConfirmTrader [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Efficiency Tool
// description    Provides some useful efficiency information
// version        0.1
function Efficiency() {
  try {
       if (strPaginaActual != 'station')
           return;

       if (! show_Efficiency) return;

       if (DEBUG_MODE > 1) GM_log('Efficiency: ' + strPaginaActual);

       // get an element via its class name | thx @ marshen for the code
       function getElementsByClass (cName, domNode) {
           if (DEBUG_MODE > 2) GM_log('Efficiency >> getElementsByClass: ' + strPaginaActual);

           if (cName == undefined || cName.length == 0) return;

           if (domNode == undefined) domNode = document;

           if (domNode.getElementsByClassName)
               return domNode.getElementsByClassName(cName);

           // browser doesn't support getElementsByClassName
           cName = " " + cName + " "; // add spaces here so that we won't find
                                      // class "a" in className == "abc"
           var elements = domNode.getElementsByTagName('*');
           var res = new Array();

           for (var i = 0; i < elements.length; i++) {
                var className = " " + elements[i].className + " ";

                if (className.indexOf(cName) > -1) res.push(elements[i]);
           }

           return res;
       }

       function getBuildingLevel(id) {
           if (DEBUG_MODE > 2) GM_log('Efficiency >> getBuildingLevel: ' + strPaginaActual);

           var res = getElementsByClass('station' + id)[0];
               res = getElementsByClass('level', res)[0].innerHTML;
               res = res.match(/\d+/);

           return parseInt(res);
       }

       function oRound(value, dec) {
           if (DEBUG_MODE > 2) GM_log('Efficiency >> oRound: ' + strPaginaActual);

           var res = Math.round(value * Math.pow(10, dec)) / Math.pow(10, dec);

           return res;
       }

       function insertText(e) {
           if (DEBUG_MODE > 2) GM_log('Efficiency >> insertText: ' + strPaginaActual);

           if(e.target.id != 'content') return;

           var RLevel = getBuildingLevel(14);
           var RWLevel = getBuildingLevel(21);
           var NLevel = getBuildingLevel(15);

           var buildingId = getElementsByClass('detail_screen')[0];
               buildingId = buildingId.getElementsByTagName('input')[1].value;

           var timeReduction = '';

           if(buildingId == 14)
              timeReduction = (1 / (RLevel + 2)) / (1 / (RLevel + 1));

           if(buildingId == 15)
              timeReduction = 0.5;

           if(buildingId == 21)
              timeReduction = (1 / (RWLevel + 2)) / (1 / (RWLevel + 1));

           if(timeReduction != '') {
              timeReduction = oRound((1 - timeReduction) * 100, 2);

              var productionText = document.getElementById('action').getElementsByTagName('ul')[0];

              var buildTimeEff = document.createElement('li');
                  buildTimeEff.innerHTML = LANG.MISC.txt_efficiency +
                                           ': <span class="time" style="color:' +
                                           strColor_LPuNKTKit + ';">' +
                                           timeReduction + '%</span>';

                  productionText.appendChild(buildTimeEff);
           }
       }

       document.getElementById('planet').addEventListener('DOMNodeInserted', insertText, false);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('Efficiency [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           small planets
// namespace      marshen
// description    Makes the planets on the navigation to right smaller so that
//                more planets can be viewed on smaller resolutions.
function SmallPlanets() {
  try {
       if (typeof GM_setValue == 'undefined') {
            if (
              strPaginaActual != 'overview' &&
              strPaginaActual != 'resources' &&
              strPaginaActual != 'resourceSettings' &&
              strPaginaActual != 'station' &&
              strPaginaActual != 'traderOverview' &&
              strPaginaActual != 'research' &&
              strPaginaActual != 'shipyard' &&
              strPaginaActual != 'defense' &&
              strPaginaActual != 'fleet1' &&
              strPaginaActual != 'fleet2' &&
              strPaginaActual != 'fleet3' &&
              strPaginaActual != 'movement' &&
              strPaginaActual != 'galaxy' &&
              strPaginaActual != 'alliance' &&
              strPaginaActual != 'premium' &&
              strPaginaActual != 'messages' &&
              strPaginaActual != 'statistics' &&
              strPaginaActual != 'highscore' &&
              strPaginaActual != 'preferences' &&
              strPaginaActual != 'changelog'
            ) return;
       }

       if (! show_Small_Planets) return;

       if (DEBUG_MODE > 0) GM_log('SmallPlanets: ' + strPaginaActual);

       var borderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAAA0" +
                         "CAYAAACO/ApDAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA" +
                         "AgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpR" +
                         "PAAAASBJREFUeF7t0rsRgzAABUHo1TkVOHIFzumVT4ByRheuEtAMvO" +
                         "Bm199/P5brfLfPej8dBd4WeAwt98u4vF3xvQJXgWEIJh5mC8A0W9D/" +
                         "owBMMGQFYMpSGoKJgawATFlKQzAxkBWAKUtpCCYGsgIwZSkNwcRAVg" +
                         "CmLKUhmBjICsCUpTQEEwNZAZiylIZgYiArAFOW0hBMDGQFYMpSGoK" +
                         "JgawATFlKQzAxkBWAKUtpCCYGsgIwZSkNwcRAVgCmLKUhmBjICsCU" +
                         "pTQEEwNZAZiylIZgYiArAFOW0hBMDGQFYMpSGoKJgawATFlKQzAxk" +
                         "BWAKUtpCCYGsgIwZSkNwcRAVgCmLKUhmBjICsCUpTQEEwNZAZiylIZ" +
                         "gYiArAFOW0tCD6QRYbypDJTqdoAAAAABJRU5ErkJggg%3D%3D";

       var myPlanets = document.getElementById("myPlanets");

       setStyleSet ("div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .smallplanet {height:38px;}" +
                    "div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .smallplanet .planetPic{top:4px;}" +
                    "div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .smallplanet a.moonlink{top:" +
                         (document.getElementsByClassName('moonlink')[0].offsetLeft > 10 ? "-10px" : "21px") + ";}" +
                    "div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .smallplanet a.constructionIcon.moon{top:30px;}" +
                    "div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .smallplanet:hover {" +
                        "background-image:url('" + borderImage + "');" +
                        "background-position:left top, left bottom;}");

       // Si esta AntiGame presente y tocando la lista de planetas, adecuarse a ÃƒÆ’Ã‚Â©l
       if ( getElementsByClass('ago_planets_construction_moon', myPlanets, 'span')[0] ||
            getElementsByClass('ago_planets_construction', myPlanets, 'span')[0]) {

               setStyleSet ("div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .smallplanet {height:48px;}" +
                    "div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .ago_planets_construction_moon {top:35px; color:Orange;}" +
                    "div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .ago_planets_construction {color:LightGreen;}" +

                    "div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .smallplanet a.moonlink{top:-10px;}" +
                    "div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .smallplanet a.constructionIcon{top:0px;}" +
                    "div#cutty " + (myPlanets ? "#myPlanets" : "#myWorlds") + " .smallplanet a.constructionIcon.moon{top:35px;}");
       }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('SmallPlanets [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Fleet Contents
// description    Shows the contents of the selected fleet on the second and third fleet dispatch pages
// version        1.02
// date           2011-02-03
// author         Vesselin Bontchev
function FleetContents()
{
  try {
       if ( (strPaginaActual != 'fleet1') &&
            (strPaginaActual != 'fleet2') &&
            (strPaginaActual != 'fleet3') )
            return;

       if (! show_Fleet_Content) return;

       if (DEBUG_MODE > 0) GM_log('FleetContents: ' + strPaginaActual);

       var indices = new Array ();

       var index, name;
       if (strPaginaActual == 'fleet1')
       {
           var myLis = document.querySelectorAll ("div#buttonz li");
           for (i = 0; i < myLis.length; i++)
           {
                var theLi = myLis [i];

                index = theLi.getAttribute ("id").replace ("button", "am");
//                name = theLi.getElementsByTagName ("a") [0].title.replace (/^\|/, "").replace (/\s+\([\d\.]+\)/, "");
                var theA = theLi.getElementsByTagName ("a") [0];
                name = getElementsByClass('textlabel', theA, 'span')[0].innerHTML;

                indices.push (index);
                localStorage.setItem (index, name);
           }
           localStorage.setItem ("shipIndexes", JSON.stringify (indices));
       }
       else if (((strPaginaActual == 'fleet2') || (strPaginaActual == 'fleet3')) && ! document.getElementById ("fleet1"))
       {

            indices = JSON.parse (localStorage.getItem ("shipIndexes"));

            var fleetContents = "";
            var first = true;

            for (var i = 0; i < indices.length; i++)
            {
                 index = indices [i];
                 name = localStorage.getItem (index);
                 var nums = document.getElementsByName (index);

                 if (nums.length > 0)
                 {
                     var numShips = nums [0].value;

                     if (first) {
                         first = false;
                         fleetContents = '    ';
                     } else
                         fleetContents += ", ";

                     fleetContents += name + ": " + addDots (numShips);

                     if (DEBUG_MODE > 1) GM_log('FleetContents: [ ' + fleetContents + ' ] ' + strPaginaActual);
                 }
            }

            fleetContents += ".";

            if (DEBUG_MODE > 1) GM_log('FleetContents: [ ' + fleetContents + ' ] ' + strPaginaActual);

            var myDiv  = document.createElement ("div");
                myDiv.className = "fleetDetails";
                myDiv.style.paddingLeft = "5px";
                myDiv.style.lineHeight = "14px";
                myDiv.style.color = strColor_LPuNKTKit;
                myDiv.style.marginTop = "0";
                myDiv.style.textAlign = 'center';

            myDiv.appendChild (document.createTextNode (fleetContents));

            var buttonz = document.getElementById ("buttonz");
                buttonz.parentNode.insertBefore (myDiv, buttonz);
       }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('FleetContents [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign: Player Name on 3rd Fleet Dispatch Page
// description    Shows the name of the player to whom the target belongs on the 3rd Fleet Dispatch page
// version        1.00
// date           2011-12-05
function DestinationPlayerName()
{
  try {
         // The following "if" is not really necessary but with it this script will work for Opera too
         if (strPaginaActual != 'fleet3')
           return;

         if (! show_Dest_Player_Name) return;

         if (checkVersionOgame()) return;

         if (DEBUG_MODE > 0) GM_log('DestinationPlayerName: ' + strPaginaActual);

         var roundUp = document.getElementById ("roundup");

         if (roundUp == null)
           return;

         var myUL = roundUp.getElementsByTagName ("ul");

         if ((myUL == null) || (myUL.length < 1))
           return;

         myUL = myUL [0];

         var myLIs = myUL.getElementsByTagName ("li");

         if ((myLIs == null) || (myLIs.length < 2))
           return;

         if (getVersionOgame()[0] == 3)
             var mySpans = myLIs [1].getElementsByTagName ("span")
         else
             var mySpans = myLIs [0].getElementsByTagName ("span");

         if ((mySpans == null) || (mySpans.length < 1))
           return;

         var playerName = mySpans [0].title;

         if (playerName == "")
           return;

         var playerText = playerName.substring (playerName.indexOf ("|") + 1, playerName.indexOf (": ") + 2);

         playerName = playerName.substr (playerName.indexOf (": ") + 2);

         if (DEBUG_MODE > 1) GM_log('DestinationPlayerName: [ ' + playerName + ' ] ' + strPaginaActual);

         var mySpan = document.createElement ("span");
             mySpan.className = "value tipsStandard";
             mySpan.style.color = strColor_LPuNKTKit;
             mySpan.appendChild (document.createTextNode (playerName));

         var myLI = document.createElement ("li");
             myLI.appendChild (document.createTextNode (playerText));
             myLI.appendChild (mySpan);

         if (getVersionOgame()[0] == 3)
             myUL.insertBefore (myLI, myLIs [2])
         else
             myUL.insertBefore (myLI, myLIs [1]);

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('DestinationPlayerName [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}


// name           OGame Redesign: Spy from the Fleet Movement Page
// description    Adds an "Espionage" icon to the outgoing attack flights on the fleet movement page
// version        1.05
// date           2011-10-19
// author         Vesselin Bontchev
function DirectSpy()
{
  try {
       // The following "if" is not really necessary but with it this script will work for Opera too
       if (document.location.href.indexOf ("/game/index.php?page=movement") < 0)
         return;

       if (! use_Direct_Spy) return;

       if (DEBUG_MODE > 0) GM_log('use_Direct_Spy: ' + strPaginaActual);

       function addEvent (el, evt, fxn)
       {
         if (DEBUG_MODE > 1) GM_log('use_Direct_Spy >> addEvent: ' + strPaginaActual);

         if (el.addEventListener)
           el.addEventListener (evt, fxn, false); // for standards
         else if (el.attachEvent)
           el.attachEvent ("on" + evt, fxn); // for IE
         else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
       }

       function putSpyButton (flight)
       {
         if (DEBUG_MODE > 1) GM_log('use_Direct_Spy >> putSpyButton: ' + strPaginaActual);

         var fleetSlots = document.querySelector ("div.fleetStatus span.fleetSlots");

         if (parseInt (fleetSlots.querySelector ("span.current").textContent) >=
             parseInt (fleetSlots.querySelector ("span.all").textContent))
           return;

         var isOpened = flight.className.indexOf ("detailsOpened") >= 0;
         var sendMail = flight.querySelector ("span.sendMail");
         var spyButton = flight.querySelector ("span.mySpyButton");
         var mySpan;

         if (sendMail == null)
           return;

         if (spyButton == null)
         {
           var destination = flight.querySelector ("span.destinationData span a");

           if (destination == null)
             return;

           var href = destination.href;
           if (href.indexOf ("position=") < 0)
           {
             var coords = destination.textContent.split (/[:\]]+/);
             if (coords.length >= 3)
               href += "&position=" + coords [2];
           }

           var destImg = flight.querySelector ("span.starStreak div.destination img");

           if (destImg == null)
             return;

           var hasCommander = document.querySelector ("div#officers a img").getAttribute ("src").indexOf ("commander_ikon.gif") >= 0;
           var targetType = (destImg.getAttribute ("src").indexOf ("/moon/") < 0) ? "1" : "3";

           if (hasCommander || (targetType == "1"))
             href += "&planetType=" + targetType + "&doScan=1";
           else
           {
             href += "&type=" + targetType + "&mission=6";
             href = href.replace ("page=galaxy", "page=fleet1");
           }

           var myImg = document.createElement ("img");
               myImg.width = "16";
               myImg.height = "16";
               myImg.src = "data:image/gif;base64,R0lGODlhEAAQAJEDAP///1x2i2+JnQAAACH5BAEAAAMALAAAAAAQABAAAAIrXI6Zpu0P4wMUyFohxs4G+h1eIAhAaVboiZor67YlvMrtRtv6zvf84EMNCgA7";

           var myA = document.createElement ("a");
               myA.target = "_top";
               myA.href= href;
               myA.appendChild (myImg);

           mySpan = document.createElement ("span");
           mySpan.className = "mySpyButton";

           if (isOpened)
           {
             mySpan.style.position = "relative";
             mySpan.style.left = "510px";
             mySpan.style.top = "25px";
             sendMail.style.left = "510px";
             sendMail.style.top = "45px";
           }
           else
           {
             mySpan.style.position = "absolute";
             mySpan.style.left = "603px";
             mySpan.style.top = "3px";
             sendMail.style.left = "";
             sendMail.style.top = "";
           }

           mySpan.appendChild (myA);
           sendMail.parentNode.insertBefore (mySpan, sendMail);
         }
         else
         {
           mySpan = spyButton;
           if (isOpened)
           {
             mySpan.style.position = "relative";
             mySpan.style.left = "510px";
             mySpan.style.top = "25px";
             sendMail.style.left = "510px";
             sendMail.style.top = "45px";
           }
           else
           {
             mySpan.style.position = "absolute";
             mySpan.style.left = "603px";
             mySpan.style.top = "3px";
             sendMail.style.left = "";
             sendMail.style.top = "";
           }
         }
       }

       function putAllSpyButtons (addListener)
       {
         if (DEBUG_MODE > 1) GM_log('use_Direct_Spy >> putAllSpyButtons: ' + strPaginaActual);

         var flights = document.querySelectorAll ("div.fleetDetails");

         for (var i = 0; i < flights.length; i++)
         {
           var flight = flights [i];
           var id = flight.getAttribute ("id");

           if (id == "resourcesInFlight")
             continue;

           var direction = flight.querySelector ("span.starStreak a");

           if ((direction == null) || (direction.className.indexOf ("fleet_icon_reverse") >= 0))
             continue;

           var mission = flight.querySelector ("span.mission");

           if ((mission == null) || (mission.className.indexOf ("hostile") < 0))
             continue;

           putSpyButton (flight);

           if (addListener)
             addEvent (flight.querySelector ("span.openDetails a"), "click", function (e)
             {
               var targ;

               if (! e)
                 var e = window.event;

               if (e.target)
                 targ = e.target;

               else if (e.srcElement)
                 targ = e.srcElement;

               if (targ.nodeType == 3) // defeat Safari bug
                 targ = targ.parentNode;

               putSpyButton (targ.parentNode.parentNode.parentNode);
             });
         }
       }

       putAllSpyButtons (true);

       addEvent (document.querySelector ("span.closeAll a"), "click", function ()
       {
         setTimeout (function ()
         {
           putAllSpyButtons (false);
         }, 0);

       });

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('DirectSpy [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

// name           OGame Redesign : Short Header
// version        1.03
// author         Gollaoum
// description    Minimize the header when is possible.
function ShortHeader() {
  try {
       if (! use_Short_Header) return;

       if (DEBUG_MODE > 0) GM_log('ShortHeader: ' + strPaginaActual);

       function Eval(exp) {
                if (DEBUG_MODE > 1) GM_log('use_Direct_Spy >> Eval: ' + strPaginaActual);
                return document.evaluate(exp, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
       }

       if (Eval('//a[@class="toggleHeader"]') && document.getElementById('planet').getAttribute('class') != 'shortHeader') {
         unsafeWindow.$('#planet').toggleClass('shortHeader');
         unsafeWindow.$(".c-left").toggleClass('shortCorner');
         unsafeWindow.$(".c-right").toggleClass('shortCorner');
         unsafeWindow.changeCookie(Eval('//script[contains(string(),"cookieName")]').innerHTML.match(/cookieName = ['|"]([a-z0-9]{32})['|"]/)[1]);
     // "
       }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('ShortHeader [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function TradeCalculator() {
  try {
       if ((strPaginaActual != 'traderOverview') ||
           (document.location.href.indexOf ('page=traderResources') < 0))
           return;

       if (! show_Trade_Calculator) return;

       if (DEBUG_MODE > 0) GM_log('TraderCalculator: ' + strPaginaActual);

       function generarError() {
           if (DEBUG_MODE > 1)
               GM_log('TraderCalculator >> generarError: ' + strPaginaActual);

           var myTd = document.getElementById('lpunktkit-error');

           var mySpan = myTd.getElementsByTagName('span')[0];
           if (mySpan) mySpan.parentNode.removeChild(mySpan);

           mySpan = document.createElement('span');
           mySpan.appendChild(document.createTextNode('LPuNKTKit Error: ' + LANG.MISC.txt_errorTrade));
           mySpan.setAttribute('style', 'font-size: 10px;color:red;');

           myTd.appendChild(mySpan);
       }

       function calculateRes() {
           if (DEBUG_MODE > 1)
               GM_log('TraderCalculator >> calculateRes: ' + strPaginaActual);

           var intRecurso = parseInt($('#lpunktkit-resVenta').val().replace(/\./g,"").replace(/\,/g,""));
           if ((! intRecurso) || (intRecurso<=0)) {
                generarError();
                return;
           }

           if (DEBUG_MODE > 2)
               GM_log('TraderCalculator >> calculateRes: [ Recurso = ' + intRecurso + ' ] ' + strPaginaActual);

           var dblMetRatio = parseFloat($('#lpunktkit-metRatio').val().replace(/\,/g,"."));

           if ((! dblMetRatio) || (dblMetRatio <= 0)){
                generarError();
                return;
           }

           var dblMetPercent = parseFloat($('#lpunktkit-metPercent').val().replace(/\,/g,"."));

           if ((! dblMetPercent) || (dblMetPercent <= 0) || (dblMetPercent > 100)){
                dblMetPercent = 100;
           }

           if (DEBUG_MODE > 2)
               GM_log('TraderCalculator >> calculateRes: [ Ratio Metal = ' + dblMetRatio + ' ] ' + strPaginaActual);

           var dblCriRatio = parseFloat($('#lpunktkit-criRatio').val().replace(/\,/g,"."));
           if ((! dblCriRatio) || (dblCriRatio <= 0)){
                generarError();
                return;
           }

           var dblCriPercent = parseFloat($('#lpunktkit-criPercent').val().replace(/\,/g,"."));

           if ((! dblCriPercent) || (dblCriPercent <= 0) || (dblCriPercent > 100)){
                dblCriPercent = 100;
           }

           if (DEBUG_MODE > 2)
               GM_log('TraderCalculator >> calculateRes: [ Ratio Cristal = ' + dblCriRatio + ' ] ' + strPaginaActual);

           var dblDeuRatio = parseFloat($('#lpunktkit-deuRatio').val().replace(/\,/g,"."));
           if ((! dblDeuRatio) || (dblDeuRatio <= 0)){
                generarError();
                return;
           }

           var dblDeuPercent = parseFloat($('#lpunktkit-deuPercent').val().replace(/\,/g,"."));

           if ((! dblDeuPercent) || (dblDeuPercent <= 0) || (dblDeuPercent > 100)){
                dblDeuPercent = 100;
           }

           if (DEBUG_MODE > 2)
               GM_log('TraderCalculator >> calculateRes: [ Ratio Deuterio = ' + dblDeuRatio + ' ] ' + strPaginaActual);

           if (DEBUG_MODE > 2)
               GM_log('TraderCalculator >> calculateRes: [ Recurso a vender: ' + $('#lpunktkit-recurso').val() + ' ] ' + strPaginaActual);

           var myTd = document.getElementById('lpunktkit-resMetal');
           var mySpanM = myTd.getElementsByTagName('span')[0];
           if (mySpanM) mySpanM.parentNode.removeChild(mySpanM);

               myTd = document.getElementById('lpunktkit-resCristal');
           var mySpanC = myTd.getElementsByTagName('span')[0];
           if (mySpanC) mySpanC.parentNode.removeChild(mySpanC);

               myTd = document.getElementById('lpunktkit-resDuty');
           var mySpanD = myTd.getElementsByTagName('span')[0];
           if (mySpanD) mySpanD.parentNode.removeChild(mySpanD);

           switch ($('#lpunktkit-recurso').val()) {
              case '-': generarError();
                        return;

              case 'M':
                        if ( ( ( dblCriPercent + dblDeuPercent) > 100 ) &&
                             ( ( dblCriPercent + dblDeuPercent) < 200 ) ) {

                           generarError();
                           return;
                        }

                        mySpanM = document.createElement('span');
                        mySpanM.appendChild(document.createTextNode(0));
                        document.getElementById('lpunktkit-resMetal').appendChild(mySpanM);

                        mySpanC = document.createElement('span');
                        mySpanC.appendChild(document.createTextNode(
                                addDots(
                                        Math.ceil(
                                             (intRecurso / dblMetRatio * dblCriRatio) * dblCriPercent / 100 ))));
                        document.getElementById('lpunktkit-resCristal').appendChild(mySpanC);

                        mySpanD = document.createElement('span');
                        mySpanD.appendChild(document.createTextNode(
                                addDots(
                                        Math.ceil(
                                             (intRecurso / dblMetRatio * dblDeuRatio) * dblDeuPercent / 100 ))));
                        document.getElementById('lpunktkit-resDuty').appendChild(mySpanD);

                        break;

              case 'C':
                        if ( ( ( dblMetPercent + dblDeuPercent) > 100 ) &&
                             ( ( dblMetPercent + dblDeuPercent) < 200 ) ) {

                           generarError();
                           return;
                        }

                        mySpanM = document.createElement('span');
                        mySpanM.appendChild(document.createTextNode(
                                addDots(
                                        Math.ceil(
                                             (intRecurso / dblCriRatio * dblMetRatio) * dblMetPercent / 100 ))));
                        document.getElementById('lpunktkit-resMetal').appendChild(mySpanM);

                        mySpanC = document.createElement('span');
                        mySpanC.appendChild(document.createTextNode(0));
                        document.getElementById('lpunktkit-resCristal').appendChild(mySpanC);

                        mySpanD = document.createElement('span');
                        mySpanD.appendChild(document.createTextNode(
                                addDots(
                                        Math.ceil(
                                             (intRecurso / dblCriRatio * dblDeuRatio) * dblDeuPercent / 100 ))));
                        document.getElementById('lpunktkit-resDuty').appendChild(mySpanD);

                        break;

              case 'D':
                        if ( ( ( dblMetPercent + dblCriPercent) > 100 ) &&
                             ( ( dblMetPercent + dblCriPercent) < 200 ) ) {

                           generarError();
                           return;
                        }

                        mySpanM = document.createElement('span');
                        mySpanM.appendChild(document.createTextNode(
                                addDots(
                                        Math.ceil(
                                             (intRecurso / dblDeuRatio * dblMetRatio) * dblMetPercent / 100 ))));
                        document.getElementById('lpunktkit-resMetal').appendChild(mySpanM);

                        mySpanC = document.createElement('span');
                        mySpanC.appendChild(document.createTextNode(
                                addDots(
                                        Math.ceil(
                                             (intRecurso / dblDeuRatio * dblCriRatio) * dblCriPercent / 100 ))));
                        document.getElementById('lpunktkit-resCristal').appendChild(mySpanC);

                        mySpanD = document.createElement('span');
                        mySpanD.appendChild(document.createTextNode(0));
                        document.getElementById('lpunktkit-resDuty').appendChild(mySpanD);

                        break;
           }

           mySpanM.setAttribute('style', 'font-size: ' + (intFontSize + 3) + 'px;');
           mySpanC.setAttribute('style', 'font-size: ' + (intFontSize + 3) + 'px;');
           mySpanD.setAttribute('style', 'font-size: ' + (intFontSize + 3) + 'px;');

           myTd = document.getElementById('lpunktkit-error');
           var mySpan = myTd.getElementsByTagName('span')[0];
           if (mySpan) mySpan.parentNode.removeChild(mySpan);

           GM_setValue('intRatioM' + strUniverse, '' + dblMetRatio + '');
           GM_setValue('intRatioC' + strUniverse, '' + dblCriRatio + '');
           GM_setValue('intRatioD' + strUniverse, '' + dblDeuRatio + '');
       }

       var intPadding = ((screen.availWidth * 4) / 1280);
       var intWidth = ((screen.availWidth * 70) / 1280);
       var intFontSize = ((screen.availWidth == 1280) ? 12 : 11);

       var myDiv = document.getElementById('lpk-Calculator');
       if (myDiv == null) {
           var myDiv = document.createElement('div');
               myDiv.setAttribute('id', 'lpk-Calculator');
               myDiv.setAttribute('style', 'width: 100%; text-align: center;' +
                                       'color:' + strColor_LPuNKTKit + ';' +
                                       'font-size: ' + intFontSize + 'px;' +
                                       'margin-top: 5px;z-order:99;');

           var intRatioM = GM_getValue('intRatioM' + strUniverse, 3);
           var intRatioC = GM_getValue('intRatioC' + strUniverse, 2);
           var intRatioD = GM_getValue('intRatioD' + strUniverse, 1);

           if (DEBUG_MODE > 2)
               GM_log('TraderCalculator [ Metal = ' + intRatioM + ' ] ' +
                  '[ Cristal = ' + intRatioC + ' ] ' +
                  '[ Deuterio = ' + intRatioD + ' ]');

           var strContenido =
             '<center>' +
             '<table width=99% style="border: 0px solid !important; ' +
             ' background-color: rgba(0,0,0,0.7);" >' +
             '<tr valign=top>' +
             '   <td width=92%>' +
             '      <table width=100% style="border: 1px solid ' + strColor_LPuNKTKit +
             '       !important;padding:' + intPadding + 'px; ' +
             '       background-color: transparent;" >' +
             '      <tr valing=top>' +
             '          <td width=100% align=center>' +
             '             <span style="font-weight: bold; font-size: larger;">' +
                            LANG.OPTION.txt_showTradeCalculator + '</span>' +
             '          </td>' +
             '      </tr>' +
             '      <tr valing=top>' +
             '          <td colspan=2></td>' +
             '      </tr>' +
             '      <tr valing=top>' +
             '          <td width=100% align=center>' +
             '              <table width=80% style="border: 1px solid ' +
             '               #444 !important; ' +
             '               padding:' + intPadding + 'px; ' +
             '               background-color: transparent" >' +
             '              <tr valign=top>' +
             '                  <th width=28%></th>' +
             '                  <th width=18% align=center>' + LANG.SERVER.txt_RES_metal + '</th>' +
             '                  <th width=4% align=center>%</th>' +
             '                  <th width=3% align=center></th>' +
             '                  <th width=18% align=center>' + LANG.SERVER.txt_RES_cristal + '</th>' +
             '                  <th width=4% align=center>%</th>' +
             '                  <th width=3% align=center></th>' +
             '                  <th width=18% align=center>' + LANG.SERVER.txt_RES_deuterio + '</th>' +
             '                  <th width=4% align=center>%</th>' +
             '              </tr>' +
             '              <tr valign=top>' +
             '                  <td><span style="font-weight: bold;">Ratio</span></td>' +
             '                  <td align=center>' +
             '                      <input type="text" id="lpunktkit-metRatio" ' +
             '                       class="lpunktkit-metRatio" value="' + intRatioM + '" ' +
             '                       style="background-color: transparent; ' +
             '                       color: ' + strColor_LPuNKTKit + '; ' +
             '                       border: solid 1px ' + strColor_LPuNKTKit + '; ' +
             '                       padding: 1px; width: ' + intWidth + 'px; ' +
             '                       font-size: ' + intFontSize + 'px; ' +
             '                       text-align: center;">' +
             '                  </td>' +
             '                  <td align=center>' +
             '                      <input type="text" id="lpunktkit-metPercent" ' +
             '                       class="lpunktkit-metPercent" value="100" ' +
             '                       style="background-color: transparent; ' +
             '                       color: ' + strColor_LPuNKTKit + '; ' +
             '                       border: solid 1px ' + strColor_LPuNKTKit + '; ' +
             '                       padding: 1px; width: ' + (intWidth/2) + 'px; ' +
             '                       font-size: ' + intFontSize + 'px; ' +
             '                       text-align: center;">' +
             '                  </td>' +
             '                  <td width=1%></td>' +
             '                  <td align=center>' +
             '                      <input type="text" id="lpunktkit-criRatio" ' +
             '                       class="lpunktkit-criRatio" value="' + intRatioC + '" ' +
             '                       style="background-color: transparent; ' +
             '                       color: ' + strColor_LPuNKTKit + '; ' +
             '                       border: solid 1px ' + strColor_LPuNKTKit + '; ' +
             '                       padding: 1px; width: ' + intWidth + 'px; ' +
             '                       font-size: ' + intFontSize + 'px; ' +
             '                       text-align: center;">' +
             '                  </td>' +
             '                  <td align=center>' +
             '                      <input type="text" id="lpunktkit-criPercent" ' +
             '                       class="lpunktkit-criPercent" value="100" ' +
             '                       style="background-color: transparent; ' +
             '                       color: ' + strColor_LPuNKTKit + '; ' +
             '                       border: solid 1px ' + strColor_LPuNKTKit + '; ' +
             '                       padding: 1px; width: ' + (intWidth/2) + 'px; ' +
             '                       font-size: ' + intFontSize + 'px; ' +
             '                       text-align: center;">' +
             '                  </td>' +
             '                  <td width=1%></td>' +
             '                  <td align=center>' +
             '                      <input type="text" id="lpunktkit-deuRatio" ' +
             '                       class="lpunktkit-deuRatio" value="' + intRatioD + '" ' +
             '                       style="background-color: transparent; ' +
             '                       color: ' + strColor_LPuNKTKit + '; ' +
             '                       border: solid 1px ' + strColor_LPuNKTKit + '; ' +
             '                       padding: 1px; width: ' + intWidth + 'px; ' +
             '                       font-size: ' + intFontSize + 'px; ' +
             '                       text-align: center;">' +
             '                  </td>' +
             '                  <td align=center>' +
             '                      <input type="text" id="lpunktkit-deuPercent" ' +
             '                       class="lpunktkit-deuPercent" value="100" ' +
             '                       style="background-color: transparent; ' +
             '                       color: ' + strColor_LPuNKTKit + '; ' +
             '                       border: solid 1px ' + strColor_LPuNKTKit + '; ' +
             '                       padding: 1px; width: ' + (intWidth/2) + 'px; ' +
             '                       font-size: ' + intFontSize + 'px; ' +
             '                       text-align: center;">' +
             '                  </td>' +
             '              </tr>' +
             '              </table>' +
             '          </td>' +
             '      </tr>' +
             '      <tr valign=top>' +
             '          <td width=100%>' +
             '           <hr style="margin:2px 0;' +
             '            border-top-color:#444;' +
             '            border-bottom-color:' + strColor_LPuNKTKit + ';' +
             '            border-width:1px 0;' +
             '            border-style:solid;' +
             '            display:block;">' +
             '          </td>' +
             '      </tr>' +
             '      <tr valign=top>' +
             '          <td align=center colspan=2>' +
             '              <table width=100% style="border: 1px solid ' +
             '               #444 !important; ' +
             '               padding:' + intPadding + 'px; ' +
             '               background-color: transparent" >' +
             '              <tr valign=top>' +
             '                  <th width=16%></th>' +
             '                  <th width=30%></th>' +
             '                  <th width=18% align=right>' + LANG.SERVER.txt_RES_metal + '</th>' +
             '                  <th width=18% align=right>' + LANG.SERVER.txt_RES_cristal + '</th>' +
             '                  <th width=18% align=right>' + LANG.SERVER.txt_RES_deuterio + '</th>' +
             '              </tr>' +
             '              <tr valign=top>' +
             '                  <td width=46% colspan=2></td>' +
             '                  <td width=54% colspan=3>' +
             '                      <hr style="margin:2px 0;' +
             '                       border-top-color:#444;' +
             '                       border-bottom-color:' + strColor_LPuNKTKit + ';' +
             '                       border-width:1px 0;' +
             '                       border-style:solid;' +
             '                       display:block;">' +
             '                  </td>' +
             '              </tr>' +
             '              <tr valign=middle>' +
             '                  <td align=left>' +
             '                      <span style="font-weight: bold;">' + LANG.MISC.txt_recurso + '</span>' +
             '                  </td>' +
             '                  <td align=center>' +
             '                      <select id="lpunktkit-recurso" style="background-color: transparent; ' +
             '                       color: ' + strColor_LPuNKTKit + '; ' +
             '                       border: solid 1px ' + strColor_LPuNKTKit + '; ' +
             '                       padding: 1px; width: ' + (intWidth * 1.5) + 'px;visibility:visible;">' +
             '                          <option value="-" style="color:' + strColor_LPuNKTKit + ';" selected> --- </option>' +
             '                          <option value="M" style="color:' + strColor_LPuNKTKit + ';" >' + LANG.SERVER.txt_RES_metal + '</option>' +
             '                          <option value="C" style="color:' + strColor_LPuNKTKit + ';" >' + LANG.SERVER.txt_RES_cristal + '</option>' +
             '                          <option value="D" style="color:' + strColor_LPuNKTKit + ';" >' + LANG.SERVER.txt_RES_deuterio + '</option>' +
             '                      </select>&nbsp;' +
             '                      <input type="text" id="lpunktkit-resVenta" ' +
             '                       class="lpunktkit-resVenta" value="0" ' +
             '                       style="background-color: transparent; ' +
             '                       color: ' + strColor_LPuNKTKit + '; ' +
             '                       border: solid 1px ' + strColor_LPuNKTKit + '; ' +
             '                       padding: 1px; width: ' + (intWidth * 1.5) + 'px; ' +
             '                       font-size: ' + intFontSize + 'px; text-align: right;" >' +
             '                  </td>' +
             '                  <td align=right id="lpunktkit-resMetal"><span style="font-size: ' + (intFontSize + 5) + 'px;">0</span></td>' +
             '                  <td align=right id="lpunktkit-resCristal"><span style="font-size: ' + (intFontSize + 5) + 'px;">0</span></td>' +
             '                  <td align=right id="lpunktkit-resDuty"><span style="font-size: ' + (intFontSize + 5) + 'px;">0</span></td>' +
             '              </tr>' +
             '              <tr valign=top>' +
             '                  <td width=46% colspan=2></td>' +
             '                  <td width=54% colspan=3>' +
             '                      <hr style="margin:2px 0;' +
             '                       border-top-color:#444;' +
             '                       border-bottom-color:' + strColor_LPuNKTKit + ';' +
             '                       border-width:1px 0;' +
             '                       border-style:solid;' +
             '                       display:block;">' +
             '                  </td>' +
             '              </tr>' +
             '              </table>' +
             '          </td>' +
             '      </tr>' +
             '      <tr valign=top>' +
             '          <td width=100%>' +
             '              <table border=0 width=100% cellpadding=0 cellspacing=0>' +
             '              <tr valign=middle>' +
             '                  <td width=33%></td>' +
             '                  <td width=33% id="lpunktkit-traderButton" align=center></td>' +
             '                  <td width=33% align=right>' +
             '                      <span style="font-size:smaller;">min: 2:1.5:1 - max: 5:3:1</span>' +
             '                  </td>' +
             '              </tr>' +
             '              </table>' +
             '          </td>' +
             '      </tr>' +
             '      </table>' +
             '   </td>' +
             '   <td width=8%></td>' +
             '</tr>' +
             '<tr valign=top>' +
             '    <td>' +
             '        <table border=0 width=100%>' +
             '        <tr valign=top>' +
             '            <td width=100% id="lpunktkit-error" align=left></td>' +
/*             '            <td width=30% align=right>' +
             '                <span style="font-size:smaller;">min: 2:1.5:1 - max: 5:3:1</span>' +
             '            </td>' +*/
             '        </tr>' +
             '        </table>' +
             '    </td>' +
             '    <td></td>' +
             '</tr>' +
             '</table>' +
             '</center>';

           myDiv.innerHTML = strContenido;

           //document.getElementById('planet').appendChild(myDiv);
           document.getElementById('header_text').appendChild(myDiv);

           var myInput = document.createElement('input');
               myInput.setAttribute('type', 'submit');
               myInput.setAttribute('class', 'button188');
               myInput.setAttribute('value', LANG.MISC.txt_simular);
               myInput.addEventListener('click', calculateRes, false);

           document.getElementById('lpunktkit-traderButton').appendChild(myInput);
       }

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('TradeCalculator [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}

function ResourcesPerFleet() {
    try {
         if (strPaginaActual != 'movement') return;

         if (! show_Resources_Per_Fleet) return;

         if (DEBUG_MODE > 0) GM_log('ResourcesPerFleet: ' + strPaginaActual);

         var arrFleets = getElementsByClass('fleetDetails', document, 'div');

         if (DEBUG_MODE > 1) GM_log(arrFleets.length);

         for (var i = 0; i < arrFleets.length; i++) {
              theSpan = getElementsByClass('starStreak', arrFleets[i], 'span')[0];
              theRoute = getElementsByClass('route', theSpan, 'span')[i];
              theTable = getElementsByClass('fleetinfo', theRoute, 'table')[i];

              var arrRecursos = getRecursosFlota(theTable);

              if (DEBUG_MODE > 1) GM_log ( ' [ ' + i + ' ] ' + arrRecursos);

              var myDiv = document.createElement('div');
                  myDiv.setAttribute('style', 'position:absolute;' +
                                              'top:21px;left:17%;' +
                                              'color:' + strColor_LPuNKTKit + ';' +
                                              'font-size:0.9em;');

              var mySpan = document.createElement('span');
                  mySpan.setAttribute('style', 'color:' + color_Metal + ';');
                  mySpan.appendChild(document.createTextNode(arrRecursos[0]));

                  myDiv.appendChild(mySpan);
                  myDiv.appendChild(document.createTextNode(', '));

                  mySpan = document.createElement('span');
                  mySpan.setAttribute('style', 'color:' + color_Cristal + ';');
                  mySpan.appendChild(document.createTextNode(arrRecursos[1]));

                  myDiv.appendChild(mySpan);
                  myDiv.appendChild(document.createTextNode(', '));

                  mySpan = document.createElement('span');
                  mySpan.setAttribute('style', 'color:' + color_Deuterio + ';');
                  mySpan.appendChild(document.createTextNode(arrRecursos[2]));

                  myDiv.appendChild(mySpan);

/*                  myDiv.appendChild(document.createTextNode(arrRecursos[0] + ", " +
                                                            arrRecursos[1] + ", " +
                                                            arrRecursos[2]));*/

              if (show_Empty_Space) {
                 mySpan = document.createElement('span');
                 mySpan.setAttribute('style', 'color:' + color_Empty_Space + ';');
                 mySpan.appendChild(document.createTextNode(' (-' + arrRecursos[3] + ')'));

                 myDiv.appendChild(mySpan);
              }

              theSpan.appendChild(myDiv);

              try {
                   var divAnti = getElementsByClass('anti_fleetDetails', arrFleets[i], 'div');
                   if (divAnti.length > 0) {
                       var strFleet = divAnti[0].innerHTML.split('<br>')[0];

                       divAnti[0].innerHTML = strFleet;

                       myDiv.style.backgroundColor = 'rgba(0,0,0,0.4)';
                       myDiv.style.top = divAnti[0].offsetTop + divAnti[0].offsetHeight + 4 + 'px';
                   }
              } catch(e) {}
         }

    } catch (e) {
         if (DEBUG_MODE != 0) GM_log('ResourcesPerFleet [ERROR]: <' + e + '> ' + strPaginaActual);
    }
}

function FixTooltips() {
    try {
         if (strPaginaActual != 'movement') return;

         if (! fix_Tooltips) return;

         if (DEBUG_MODE > 0) GM_log('fixTooltips: ' + strPaginaActual);

         setStyleSet('div#cluetip.clue-right-event div#cluetip-outer {width: 250px;}');

    } catch (e) {
         if (DEBUG_MODE != 0) GM_log('fixTooltips [ERROR]: <' + e + '> ' + strPaginaActual);
    }

}


// name           OGame Redesign: AutoExpoFleet for Raider (1HF)
// namespace      8arlock
// description    Auto calc expofleet for Raider (1HF): 140LC+1HF+1DR+1EP/190LC+1HF+1DR+1EP
// version        1.1.3
function AutoExpoFleet()
{
  try {
      if ( (strPaginaActual != 'flotten1') &&
           (strPaginaActual != 'fleet1') &&
           (strPaginaActual != 'research') )
           return;

      if (! show_Auto_Expo_Fleet) return;

      if (DEBUG_MODE > 0) GM_log('AutoExpoFleet: ' + strPaginaActual);

      var icon_expedition = 'data:image/gif;base64,R0lGODlhEQARAPf/ADlYl017yjNQiUVtt0RprUFkpT1foz1foD1dozhZmDdamTZWkzJOhSU8azRQiP///iY+cENnrjxenz1ipC5KgEFjpEJprT9jp0ZknkBnq0dZgkRpqydCeCtEdzZdqGiS1yc/cDNXmz5kpkJwwUt2xjhgo2yMxsfS5jlirUFnsDtiqkJnqV2CwVN2t+/0+TVTj+Pp8X2YzneNs058zDxdnpGnzEJprsrT4UluslJqmkForDJQijpgoi5IfTpfn6y83TNTlcbV7HKGsTNPijhalUBsvElwukNglz5XkYWdxjBHdpmszCM4aUZutEFmrEBmrj1kqUBhoVJ5wEFmqTFbq5alvk9/0DBMhTFOhkJjqDhcnkRnrSlFfEt4w0FpsEFbkThXlPT5+f/+/jdWkf3+/TZUjqK21TFNiFh3rklzvTpfp/7+/SQ8biY+b0Jor0NprlN/zjliqkt7z0tvsVBpmzRRiUBorUFprPr8/EdtsUJoq1WB0SxIfj5jpmGL0jtfnj9krDZhsF5+vTFXoTFUlp2x1EpwtS1PjkBotH+WxDBMgX+b0EFquEduuPb2+lp+xE1zvVJ0rTtcnqizx0x0woCay5Soyjpdmj5foVd9wuzv9j1cmDFZot/k8TZfo3GX2fn5+naY1kJmrE1rpT5jpHye20BlqEprqLzP7TNRjEJmqkNlrUZttLXG50Zut7zL5mWL0bbH6jBMhzNOhs3a78/a7M3X6WGBvClDeDdWlClEeC1FezhMeE95x0VdiCY/dkVelkx70EhutEl2yPL4+TZYnFN7w5mw2zVVkmmLxkJprDRQijVVjzdXj0VprkVqrDZaoTFPiFl2q09+zkhwvcvU6TtdpCtPkjxenf///ZSozI2lzSY9bFF3wEJork18yjphp0NorVF+zSg+cMvU4Tphqkl6z/39/Ep0wkl0wDNXnnWOuzRQiThYmjtfoOju9Iqav/z+/fn8/PLz+D9lqUdts0BoqzZfqFSB0EdlnUdwt4qk0kFnqjxipP///wAAACH5BAEAAP8ALAAAAAARABEAAAj/AP9lWVVOxZZwEdxY8KZDz50Mff5Z0wJtSRI1ESzYefJGlCkRExAYsEejRI1KiNKke5SMmhFWyugZ8OJMwpQ4rtAN++YnVIBelAbw66cvjw8ogmDQKhVAzrQ9cEgsasEDkrA/gFic85ctyKdgVvCJk1JvQrdG7mwwauXvwQM8qD6Ym9GlyQVjqoikKAKL2AMxYVzEi+VnxAAJhiqwoSONkxl/8sgci3GiUyEMv5wVYOIrB6E582pVW2OCSiR4kzQ4qcCNy5lLHgo5yvQK1K1BhxgoIVCgQY8dCTzh0LQv0I93pw4pavOMVINdWHKtA7fNFop72sgh4QNiQxReuiikTcon6cANNMWuyaiCC8IKTOOiMQPT7oC6RJZCYANy5EUHBM1AIMAYCwCQgAKbCKFAArkgUwYHo/wDzBVDLOOAA+zsIEsdDswyCwVf/BMQADs=';

      var shipsNoSat = new Array();
          shipsNoSat.push({id:202, name:"202", n:0, c:0, expo:20});
          shipsNoSat.push({id:203, name:"203", n:0, c:0, expo:60});
          shipsNoSat.push({id:204, name:"204", n:0, c:0, expo:20});
          shipsNoSat.push({id:205, name:"205", n:0, c:0, expo:50});
          shipsNoSat.push({id:206, name:"206", n:0, c:0, expo:135});
          shipsNoSat.push({id:207, name:"207", n:0, c:0, expo:300});
          shipsNoSat.push({id:208, name:"208", n:0, c:0, expo:150});
          shipsNoSat.push({id:209, name:"209", n:0, c:0, expo:80});
          shipsNoSat.push({id:210, name:"210", n:0, c:0, expo:5});
          shipsNoSat.push({id:211, name:"211", n:0, c:0, expo:375});
          shipsNoSat.push({id:213, name:"213", n:0, c:0, expo:550});
          shipsNoSat.push({id:214, name:"214", n:0, c:0, expo:45000});
          shipsNoSat.push({id:215, name:"215", n:0, c:0, expo:350});

      var evalue = 9000;
      var evaluemax = evalue;
      var REng = IEng = GEng = 0;

      function IsMaxExpo() {
          try {
               if (DEBUG_MODE > 1) GM_log('AutoExpoFleet >> IsMaxExpo: ' + strPaginaActual);

               if (document.location.href.indexOf ("/game/index.php?page=flotten1") > -1)
               {
                   var myTR = document.getElementById("content").getElementsByTagName("table")[0].
                              getElementsByTagName("table")[0].getElementsByTagName("tr")[0];

                   var myTDs = myTR.getElementsByTagName ("td");

                   flights = myTDs [0].textContent.match (/\d+/g);
                   flightDiff = parseInt (flights [1]) - parseInt (flights [0]);

                   if (flights.length > 2)
                       flightDiff += parseInt (flights [2]);

                   flights = myTDs [1].innerHTML.match (/\d+/g);
                   expDiff = parseInt (flights [1]) - parseInt (flights [0]);

                   if ((expDiff <= 0) || (flightDiff <= 0)) {
                      if (DEBUG_MODE > 2) GM_log('AutoExpoFleet >> IsMaxExpo: [ TRUE ] ' + strPaginaActual);

                      return true;
                   }
               }
               else if (document.location.href.indexOf ("/game/index.php?page=fleet1") > -1)
               {
                   var myDivs = document.getElementById ("slots").getElementsByTagName ("div");

                   if (myDivs [0].className == "fleft tiptipsStandard")
                       myDivs [0].className = "fleft tipsStandard";  // Fix a stupid 2.1.3 bug

                   flights = myDivs [0].textContent.match (/\d+/g);
                   flightDiff = parseInt (flights [1]) - parseInt (flights [0]);

                   flights = myDivs [1].textContent.match (/\d+/g);
                   expDiff = parseInt (flights [1]) - parseInt (flights [0]);

                   if ((expDiff <= 0) || (flightDiff <= 0)) {
                      if (DEBUG_MODE > 2) GM_log('AutoExpoFleet >> IsMaxExpo: [ TRUE ] ' + strPaginaActual);
                      return true;
                   }

               }

               if (DEBUG_MODE > 2) GM_log('AutoExpoFleet >> IsMaxExpo: [ FALSE ] ' + strPaginaActual);

               return false;

          } catch(e) {

               if (DEBUG_MODE != 0) GM_log('AutoExpoFleet >> IsMaxExpo [ERROR]: <' + e + '> ' + strPaginaActual);

               return true; //Mostramos el enlace si hay error
          }
      }

      function n_getById(o, id) {
          for (var key in o) {
               if (o[key].id == id)
                   return o[key].n;
          }
          return null;
      }

      function c_getById(o, id) {
          for (var key in o) {
               if (o[key].id == id)
                   return o[key].c;
          }
          return null;
      }

      function e_getById(o, id) {
          for (var key in o) {
              if (o[key].id == id)
                 return o[key].expo;
          }
          return null;
      }

      function name_getById(o, id) {
          for (var key in o) {
               if (o[key].id == id)
                  return o[key].name;
          }
          return null;
      }

      function n_setById(o, id, v) {
          for (var key in o) {
              if (o[key].id == id)
                 o[key].n = v;
          }
      }

      function c_setById(o, id, v) {
          for (var key in o) {
               if (o[key].id == id)
                  o[key].c = v;
          }
      }

      function calcUseShip(id, count)
      {
          if (count == null ||
              count > n_getById(shipsNoSat, id))

              count = n_getById(shipsNoSat, id);

          if (evalue - e_getById(shipsNoSat, id) * (count - 1) <= 0)
              count = Math.ceil(evalue / e_getById(shipsNoSat, id));

          if (count > 0) {
              evalue = evalue - e_getById(shipsNoSat, id) * count;
              c_setById(shipsNoSat, id, c_getById(shipsNoSat, id) + count);
              n_setById(shipsNoSat, id, n_getById(shipsNoSat, id) - count);
              return true;
          }

          return false;
      }

      function clearUseShip(id) {
          var old_s = c_getById(shipsNoSat, id);
          n_setById(shipsNoSat, id, n_getById(shipsNoSat, id) + old_s);
          c_setById(shipsNoSat, id, 0);
          evalue = evaluemax - countEvalue();
      }

      function countEvalue()
      {
          var e_val = 0;
          for (var i = 0; i < shipsNoSat.length; i++) {
               e_val += shipsNoSat[i].c * shipsNoSat[i].expo;
          }
          return e_val;
      }

      function fillShips()
      {
          for (var i = 0; i < shipsNoSat.length; i++) {
               var ele = document.getElementById('button' + shipsNoSat[i].id.toString());
               shipsNoSat[i].n     = parseInt(ele.getElementsByClassName('textlabel')[0].
                                              nextSibling.textContent.replace(/\D/g, ''),10);
               shipsNoSat[i].c     = 0;
               shipsNoSat[i].name  = ele.getElementsByClassName('textlabel')[0].textContent;
          }
      }

      function RecalcUseShip()
      {
          clearUseShip(205);
          calcUseShip(205, null);
          clearUseShip(203);
          calcUseShip(203, null);
          clearUseShip(202);
          calcUseShip(202, null);
      }

      function AddHeavyShip()
      {
          if (calcUseShip(213, 1) == false)
              if (calcUseShip(211, 1) == false)
                  if (calcUseShip(215, 1) == false)
                      if (calcUseShip(207, 1) == false)
                          calcUseShip(206, 1);
      }

      function calcExp()
      {
          evaluemax = evalue;

          calcUseShip(210,   1);
          calcUseShip(205,   1);
          AddHeavyShip();
          calcUseShip(203, null);

          var bt_lim0 = (evaluemax == 9000 ?  37 :  48);
          var bt_lim1 = (evaluemax == 9000 ?  72 :  96);
          var bt_lim9 = (evaluemax == 9000 ? 140 : 190);
          var variant = 0;

          if (c_getById(shipsNoSat, 203) >= bt_lim0) variant = 3;
          if (c_getById(shipsNoSat, 203) >= bt_lim1) variant = 2;
          if (c_getById(shipsNoSat, 203) >= bt_lim9) variant = 1;

          switch (variant) {
                  case 1: break;
                  case 2:
                          fillShips();
                          evalue = evaluemax;
                          calcUseShip(210, 1);
                          AddHeavyShip();
                          calcUseShip(203, bt_lim1);
                          if (c_getById(shipsNoSat, 203) < bt_lim1)
                              calcUseShip(202, (bt_lim1-c_getById(shipsNoSat, 203))*5);
                          break;

                  case 3:
                          fillShips();
                          evalue = evaluemax;
                          calcUseShip(210,   1);
                          AddHeavyShip();
                          calcUseShip(203, bt_lim0);

                  default:
                          if (c_getById(shipsNoSat, 203) < bt_lim0)
                              calcUseShip(202, (bt_lim0-c_getById(shipsNoSat, 203))*5);
          }

          calcUseShip(205, null);
          calcUseShip(203, null);
          calcUseShip(202, null);
          calcUseShip(207, null);
          calcUseShip(213, null);
          calcUseShip(211, null);
          calcUseShip(215, null);
          calcUseShip(206, null);
          calcUseShip(204, null);
          calcUseShip(210, null);

          if(evalue > 0)
             RecalcUseShip();
      }

      function fillexpofleet ()
      {
          var text = '<u>ExpoPoints</u>: ' + addDots(countEvalue ()) + ' <br> ';
          var sOncl = 'setMaxIntInput ({ ';
          var name = '';
          for (var i = 0; i < shipsNoSat.length; i++)
          {
               if (shipsNoSat [i].c)
               {
                   sOncl += "'" + shipsNoSat [i].id + "':" + shipsNoSat [i].c + ',';
                   text  += shipsNoSat [i].name + ': ' + addDots(shipsNoSat[i].c) + ', ';
                   name  += shipsNoSat [i].name.substring (0, 1) + shipsNoSat [i].c;
               }
          }
          sOncl = sOncl.substring (0, sOncl.length - 1) + " }); checkShips ('shipsChosen'); document.getElementsByName ('mission') [0].value = 15; document.getElementsByName ('position') [0].value = 16; document.getElementById ('continue').onclick (); return false;";
          return { click:sOncl, title:text, name:name };
      }

      var val = function () {
           this.set = function(key, value) {
              return GM_setValue("lpk_autoexp_" + strUniverse + "_" + key, value);
           }

           this.get = function(key){
              return GM_getValue("lpk_autoexp_" + strUniverse + "_" + key)
           }
      }

      function setDivText(objTd, strTexto) {
           var theTd = document.getElementById('lpk_TD_expofleet');

           if (strTexto.length > 0) {
               theTd.innerHTML = strTexto.substring(0, strTexto.length-2);
               objTd.style.outline = '1px dashed ' + strColor_LPuNKTKit;
           } else {
               theTd.innerHTML = '';
               objTd.style.outline = '1px dotted ' + strColor_LPuNKTKit;
           }
      }

      var technix = new val();

      if (document.location.href.indexOf('page=research') > -1)
      {
          REng = document.getElementById ('details115').children[0].children[0].children[0].nextSibling.textContent;
          IEng = document.getElementById ('details117').children[0].children[0].children[0].nextSibling.textContent;
          GEng = document.getElementById ('details118').children[0].children[0].children[0].nextSibling.textContent;
          technix.set('reng', REng);
          technix.set('ieng', IEng);
          technix.set('geng', GEng);
      }
      if (document.location.href.indexOf('page=fleet1') > -1)
      {
          if ( IsMaxExpo() ) return;

          if (document.getElementById ('lpk_sendexpo')) return;

          REng = technix.get('reng');
          IEng = technix.get('ieng');
          GEng = technix.get('geng');

          setStyleSet ('.lpk_expolink {' +
                    'color: ' + strColor_LPuNKTKit + ' !important;' +
                    'padding:0px 10px;' +
                    'text-decoration: none !important;' +
                    '} ');

          setStyleSet('.lpk_expolink1 {'+
                    'color: ' + strColor_LPuNKTKit + ' !important;' +
                    'padding:0px 10px;' +
                    'text-decoration: none !important;' +
                    '} ');

          var expofleet = document.createElement('div');
              expofleet.innerHTML =  '<table cellspacing="5px" style="' +
                                'position: relative; left: 12px; top: 0px" ' +
                                'width=95%>' +
                                '<tr align="center" valign="middle" style="font-size:smaller;">' +
                                    '<td width=3%><img src="' + icon_expedition + '" id="lpk_sendexpo" ' +
                                          'style="background-color:#3a5f9f; outline: ' +
                                          '1px solid #FFFFFF; height:17px; width:17px"></td>' +
                                    '<td width=1%></td>' +
                                    '<td width=25% style="outline:1px dotted ' + strColor_LPuNKTKit + ';">' +
                                          '<a href="#" id="lpk_eflbut9k">Top1 &lt;5M: 9.000 PE</a>' +
                                    '</td>' +
                                    '<td width=1%></td>' +
                                    '<td width=25% style="outline:1px dotted ' + strColor_LPuNKTKit + ';">' +
                                          '<a href="#" id="lpk_eflbut12k">Top1 &gt;5M: 12.000 PE</a>' +
                                    '</td>' +
                                    '<td width=45%></td>' +
                                '</tr>' +
                                '<tr valign="top" align="left" style="color: ' + strColor_LPuNKTKit + ';font-size: smaller;">' +
                                    '<td colspan=2></td>' +
                                    '<td colspan=4 id=lpk_TD_expofleet></td>' +
                                '</tr>' +
                            '</table>';

          document.getElementById ('buttonz').insertBefore (expofleet, document.getElementById ('allornone'));

          evalue = 9000;
          fillShips ();
          calcExp ();
          var text = fillexpofleet ();
          var element = document.getElementById ("lpk_eflbut9k");
              element.setAttribute ("onclick", text.click);
              element.className = "tipsTitle selected lpk_expolink1";
          element.parentNode.addEventListener("mouseover", function(){setDivText(this, text.title);}, false);
          element.parentNode.addEventListener ("mouseout", function(){setDivText(this, '');},false);

          evalue = 12000;
          fillShips ();
          calcExp ();
          var text2 = fillexpofleet ();
          element = document.getElementById ("lpk_eflbut12k");
          element.setAttribute ("onclick", text2.click);
          element.className = "tipsTitle selected lpk_expolink";
          element.parentNode.addEventListener("mouseover", function(){setDivText(this, text2.title);}, false);
          element.parentNode.addEventListener ("mouseout", function(){setDivText(this, '');},false);
      }

  } catch (e) {
      if (DEBUG_MODE != 0)  GM_log('AutoExpoFleet [ERROR]: <' + e + '> ' + strPaginaActual);
  }
}

function showNoEscape() {
    try {
        if ( (strPaginaActual != 'flotten1') &&
             (strPaginaActual != 'fleet1') )
           return;

        if (! show_No_Escape) return;

        if (DEBUG_MODE > 0) GM_log('showNoScape: ' + strPaginaActual);

        var theDiv = getElementsByClass('fleetStatus', document, 'div')[1];
        var theConsumption = getElementsByClass('fright', theDiv, 'div')[0];
        var theDuty = theConsumption.innerHTML.substring(theConsumption.innerHTML.indexOf('</span>')+7);
            theDuty = parseInt(theDuty.replace(/\./g,''));

        loadResources();

        if (theDuty > deuterio) {
            theConsumption.style.color = color_No_Escape;
            theConsumption.innerHTML += '  (-' + addDots(theDuty - deuterio) + ')';

        } else {
            theConsumption.style.color = color_Escape;
            theConsumption.innerHTML += '  (+' + addDots(deuterio - theDuty) + ')';
        }

  } catch (e) {
      if (DEBUG_MODE != 0)  GM_log('showNoScape [ERROR]: <' + e + '> ' + strPaginaActual);
  }
}

function ShowFullPlanet () {
    try {
         // The following "if" is not really necessary but with it this script will work for Opera too
         if ( (strPaginaActual == 'search') ||
              (strPaginaActual == 'buddies') ||
              (strPaginaActual == 'notices') ||
              (strPaginaActual == 'payment') ||
              (strPaginaActual == 'showmessage') ||
              (strPaginaActual == 'traderlayer') ||
              (strPaginaActual == 'searchLayer') ||
              (strPaginaActual == 'rocketlayer') ||
              (strPaginaActual == 'combatreport') ||
              (strPaginaActual == 'globalTechtree') ||
              (strPaginaActual == 'allianceBroadcast'))
             return;

         if (! show_Full_Planet) return;

         if (DEBUG_MODE > 0) GM_log('ShowFullPlanet: ' + strPaginaActual);

         var theDiv = document.getElementById('myPlanets');

         if (! theDiv)
             theDiv = document.getElementById('myWorlds');

         var arrPlanets = getElementsByClass('smallplanet', theDiv, 'div');

         for (var i=0; i < arrPlanets.length; i++) {
              try {
                   var theA = getElementsByClass('planetlink', arrPlanets[i], 'a')[0];

                   var theTitle = theA.getAttribute('title');

                   if ( (theTitle == null) ||
                        (theTitle.length <= 0) )
                       continue;

                   if (theTitle.indexOf('<span class=\'overmark\' >') > -1) {
                       var theSpan = getElementsByClass('planet-name', arrPlanets[i], 'span')[0];
                           theSpan.style.color = color_Full_Planet_0;

                           theSpan = getElementsByClass('planet-koords', arrPlanets[i], 'span')[0];
                           theSpan.style.color = color_Full_Planet_0;
                   }
                   else {
                       var minPos = theTitle.indexOf('(') + 1;
                       var maxPos = theTitle.indexOf(')');

                       theTitle = theTitle.substring(minPos, maxPos);

                       var minField = parseInt(theTitle.split('/')[0]);
                       var maxField = parseInt(theTitle.split('/')[1]);

                       switch (maxField - minField) {

                       case 0: var theSpan = getElementsByClass('planet-name', arrPlanets[i], 'span')[0];
                                   theSpan.style.color = color_Full_Planet_0;

                                   theSpan = getElementsByClass('planet-koords', arrPlanets[i], 'span')[0];
                                   theSpan.style.color = color_Full_Planet_0;

                               break;

                       case 1: var theSpan = getElementsByClass('planet-name', arrPlanets[i], 'span')[0];
                                   theSpan.style.color = color_Full_Planet_1;

                                   theSpan = getElementsByClass('planet-koords', arrPlanets[i], 'span')[0];
                                   theSpan.style.color = color_Full_Planet_1;

                               break;

                       case 2: var theSpan = getElementsByClass('planet-name', arrPlanets[i], 'span')[0];
                                   theSpan.style.color = color_Full_Planet_2;

                                   theSpan = getElementsByClass('planet-koords', arrPlanets[i], 'span')[0];
                                   theSpan.style.color = color_Full_Planet_2;

                               break;

                       case 3: var theSpan = getElementsByClass('planet-name', arrPlanets[i], 'span')[0];
                                   theSpan.style.color = color_Full_Planet_3;

                                   theSpan = getElementsByClass('planet-koords', arrPlanets[i], 'span')[0];
                                   theSpan.style.color = color_Full_Planet_3;

                               break;
                       }
                   }

              } catch(e) {
                   if (DEBUG_MODE != 0)  GM_log('ShowFullPlanet [ERROR][' + i + ']: <' + e + '> [' + theA.innerHTML + '] ' + strPaginaActual);
              }
         }

  } catch (e) {
      if (DEBUG_MODE != 0)  GM_log('ShowFullPlanet [ERROR]: <' + e + '> ' + strPaginaActual);
  }
}

function PlanetaMoonActivo ()
{
    try {
         // The following "if" is not really necessary but with it this script will work for Opera too
         if ( (strPaginaActual == 'search') ||
              (strPaginaActual == 'buddies') ||
              (strPaginaActual == 'notices') ||
              (strPaginaActual == 'payment') ||
              (strPaginaActual == 'showmessage') ||
              (strPaginaActual == 'traderlayer') ||
              (strPaginaActual == 'searchLayer') ||
              (strPaginaActual == 'rocketlayer') ||
              (strPaginaActual == 'combatreport') ||
              (strPaginaActual == 'globalTechtree') ||
              (strPaginaActual == 'allianceBroadcast'))
             return;

         if (! show_Planeta_Activo) return;

         if (DEBUG_MODE > 0) GM_log('PlanetaMoonActivo: ' + strPaginaActual);

         const IMG_PLANET_ACTIVE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEgAACxIB0t1+/AAAB6tJREFUeF7t3WuymzgQhuGzs1nasLMs7UxIhYRxcRFIILX0uMp/4gv4o1+93XDsfH25SUACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkMFIC//yYpvX963v6zr3/+/1jWt+/v3++5cZ9mqav9X2k3H3WBhNYQMgFIOf1Czh70Cz/voDTYIx2qZcEWgDiDCbA9FJtQT5HBCj2oAFLkCKLtpuRoQBLtGoLtL8zGGctTA+Pz2Y5m1nmx+e5xW3wBHq0RSrEWrDBi//o448MxidAQAHKnwSAsX9dBiiDgzLKjJHaYh0N9GaUgWABxr2r+Yb5ziEBxj0wtmYURukMFnCUgWOBhU06AQQYZcFgk07AmD8GOJ6Fg02CwgKMd8Bgk4CAgKMOHGwSABZw1IUDJC1DUuCberkX1Lz+/4CmnAqen+P2dALgyP4a71Nwg+Tp4j94fy1VGy3VGVyumVSABBwx4DCXgKPZ9uZsZX/7cSZ5ARbmiGUO10pegGLZBDhiw6HdehAWcPQBB0iegsSp3O5mHaeAS8ECju7gWEwCklxIwNEtHCDJhMPc0dfc4TvvmUCsXw6OMeAwtN+ABhxjwQGSq5CYO7qfO/baLUP7CSzsMaY9WCTBIuAYGw6QnEGitRq2tfpsubRaH7CwB3usIfGXvytAwAGOraEdJAskWiut1U4NDN9qsQd7HH1xa2iLgAMcKd9qHBcSrZXWKrEGhmu12IM9Uuwx7rWRxJXjSoie2zd0w1iEPfou5KcWqtRZ5Ox6dPuPs4fZ42YNpFikfQD8GiIAbgJwZp8Ui4QG5CwAj2u/zmrgzCJhATF7KP6z4k95/MwiYQFJ+fCeA6KUGjiyCEAe6m9TDozntAFwd4Bor9oorF4AP2qzYhrEqu/MVuEa2LNIOEDYgz2eMNeeRcIB8kQ43hN0cw1sWQQghVUNtriwhQdEexW3+CIsHFttViyDWO0N5w/XwKdFAPJw4BFWTvv418xhAdFeaa/eAPmzzQpjEIAABCBHuGqFzB8v1cC6zQphEPZgjzfssfWddYC8tCq9eYBtK29BWc8hIQBxwPMOuPyu57e0WQBhELPNRg0ABBjAOKiBMIAY0K+3B1qq/MyWOaT5Fgsg+QcbMNczDAOIg3v94MqsTGZzm9X+zaxgVqhUAwCpFLwVvswK/3SOzQNi/ohRSE8Xaq33n+eQplssgACkFhzzdgGixTLfHNQAQAACkMiA1NSrbWvvftVA0zcrvBW+dg0AxErJlgc1ABCAAAQgWpXarUrU7TMIgzAIgzBI1BW89n4zCIMwCIMwSO2VOOr2GYRBGIRBGCTqCl57vxmEQRiEQRik9kocdfsMwiAMwiAMEnUFr73fDMIgDMIgDFJ7JY66fQZhEAZhEAaJuoLX3u+WDeJXTditpt38aEPt1cn2mzY7QBRo0wVa0x5+Fwsc4DipgeYN8ms+UsgKuVINNP/bvAAxpNdcIAFSaWWqedBtO33RCQGIU73pB1Txl8sqzP8wBZByBx1A6VmGAcQckn5QAVAuqzD/yy1Ayh10AKVnCRADutPHBzUQChBzSPrKxxL5WS3zR4izWHOLBZD8gw6c9AzDAWIOST+4QMjPammvwhiERfIPOnDSMlzbAyAGdYP6Rw2EBUSblbYCMkVeTuv2KpRBAJJ34IGTll9oQJzNSjvIYLiX02d7Fc8gvh9iZnhwbvy0B0AeDNsqfm8Vr5lbF4Bos+IVXs2iT932VnsV0yDaLG3WA+bfskdYQFiERVLNkPK8PXuEBcQpX4CkFH7qc/bsAZAHVJ16UDyvHci7BESb1U6BRYb9qL2KbRDDumG9QAdwZI/wgLAIi+TY68we4QExrAMkB5Aze3QBCIuA5A4kKfboAhAWAcgdQFLs0Q0gLAKSK5Ck2mOappb/f6mL+1bgjMaVkD03LpRD2WPBiEXiFuybi82Y9vhNCUhAcgTb0HD8aci0Wi4g7tTAkK3V56TCIiyyZRH2WJECEpCsIQHH1gkvrZZW63cNaK02AGERFpktwh4Hl0tAMjYk4Ei5lqjVGrbV0lolAMIiY1qEPRLgcJUdHEcW6etvrS4AsfVUJhkDFubIAcU80v08Yu7IAcT32LsGBBy5cCyvZ5LuQAFHKTh+vo95pK95xNxREA5ntsDxQDn1+ZZMEhsW5niBS5DEhAQcL8Ch3QLHi2UWe1NMEgMW5qjNmVPAzZ4Cdiq3Nhyuk4CjlRpsfT+0XG20XFqqhkkBSV1IwNEwHM5wgSNAebazi2zyDjCs0U7NX94TkDwLCTgul2SbLwBKWVCA0WadZ+0VSMpAAo6sMmz/xUC5Bwow2q/tonsIlDRQgFG07GK92QwJULZBmcFIgWP+pRG/NhKr7i/vLVD+QgKMy+UzzgtGBgUY49R5kU86SuuV0kbNf5WrjSpSVv29SY9WYYv+6rSJTxQZFlA0UULj7EQEWEAxTj02/0lbAAYQzZeJHVwnsEBTEp4FgjMYlusTrlOoSQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSCBmAv8B90xnRqstLFYAAAAASUVORK5CYII%3D";

         const IMG_MOON_ACTIVE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAALEgAACxIB0t1+/AAAB4hJREFUeF7t3WGWmzgQhdFe2uxkljLeSZbSS/OEmaZDCAYZBKhUt8/xn8QY8ahP7xXC+OPDHwUoQAEKUIACFKAABShAAQpQgAIUoAAFKEABClCAAhSgAAUoQAEKUIACFKAABShAAQpQgAIUoAAFKEABClCAApkU+PHj78/p6/n463n09fn5z+f09Xw+P5Zej8fjY/rKpLtjbVCBEYSjABzZfgTnFTTjv4/gNCijIfWiQAtAbMEEmF6qLchxRIDiFTRgCVJk0YYZGQqwRKu2QOMdwNiKMD38/+AsWz3L8P9D3+IvuQI9ukUpxCJY8uJfO/zMYMwBAgpQvhUAxut1GaAkByVLj1EasdYaej1KIliAsW81XzPfOSTA2AfGUo/CUTqDBRx14Bhh4SadAAKMumBwk07AGA4DHOfCwU2CwgKMa8DgJgEBAcc9cHCTALCA4144QNIwJEcXw2x/Alwvvuk4v0TccFn1MTTFfUJxV/hq8H/nBST3QSZSNQzGBDBrJjcwAo4YcOhLwHH4KSVZIiInuQAWzhHLOayVXADFuAtwxIZD3DoRFnD0AQdIToIkS05PdZwuAdehJVXR1Fp/iPI5IDkGCTj6ilaL5xMk+yDRdySA46fTufy7gw9w5IBD0w4OC4mF/RAnKYRF35HLPX473/qRdUpEq8Rw6EfAwR23JwBR6wUnime7eNJoJGr9ToloBY4p/Fxkwgc4wLHkjCD5giRNbCi83EmPyYSRPWpxD+6xNiGkdhFwgKPELdNCUiKO94Ao5dNRuIfCf2fyS+ci74jjvWBK5SLcQ8HvmfRKXaTwlr9237ZHHNuAqtRF2q38gpFxD4V+ZLIrcZGCMmz3LUfEsS24Slyk3erfGBn3UOA1JrktFwkLSA1xfAbItlwEIO5p8jXelXu0QgIiXpn5a7r/WswKCUhNcXwW2NZiVjhAuIeCPmNSe+Ui4QA5QxyfCbpXLgIQTbomfayBhWY9FCDilZn+TLdfilmhADlTHJ8NvqWYBRARS8Sa1sAsZoUBRLwyw1/h8vOYBRAOwkFWfoc9DCBXzB72waXmfUgIQMQrhXvl5DWNWQARsUSsWQ2EA+TK2cO+uNU0ZoVwEEWraC+vga/LvQARsUSspRqIAogGnXtc7h6TX6dq3kEAAhCArGB6hzj2CcqxUW/eQRSrYr2tBn72Ic3/3SaO5l3z3jog+g/ucecEOSwYNu0gAAEIQFYQBQhAAAIQWb/Rfq/5iHXn7GHf3GuogaZ7EEWqSO+uAYA0au93F4b9/z85AQQgeqCVGgAIQAACEFleZNpXAxyEg3AQDrJv9jDr0o2DcBAOwkHMhNxwXw1wEA7CQTjIvtnDrEs3DsJBOAgHMRNyw301wEE4CAfhIPtmD7Mu3TgIB+EgHMRMyA331QAH4SAcJKqDeGjDvlmPW9TRrfnvpAOkzokGzD4dASJeiVcrNQAQgAAkMiDDFQTxYF88oFsF3Vp/Ni9AKpxkLrnfJQGiADnNSg1EAMSVLBDfAfH4U9BNLxQOgwMIQACygekdAtlncjCj/MqtRj15od51kQEgCo9LrjfozwhNuj4EyFeDPDboALnLvu13/9rEBdqFA0QfwkUudZGv/iOMg4hZALkKkKl7AOQCu77qxNpPnUkkLCBiVp0CANKGjpN4FcpBAAKQS+CODIjbTkByJiTzeBXOQbgIQM4EZABi/mr+ZsX5AE8VSNPe9PrE6ee+B0DELC5yBihL8SpkxBKzAHIGIEvxKiwgXAQkNSF55R5hAeEiAKkJyCv3AIimPHdTPp7/heZ8hCbcVaxxwGIWF6nhImvxKrSDiFkAqQHIWrwKDwgXAckRSLbcIzwgXAQgRwDZco8uAOEiINkDSYl7dAEIFwHIHkBK3KMbQLgISN6BpNQ9Ho9H2Ku8fwz8HYG8NzlQK+seU2fphw6PKLXgV7jom9I9LB4mdwRwlJud+ASWlzWQMVrN0dGwA2QJkNTRCiSgWEsO4FhIYKIWaL5rQLT6kxBRCyADINxjpX8HSW5IwFFwcUvUSgyJaLVNCBfJCQj32Gbj+x0gyQUJON6Awyo7OJbu3O3qRsQdPCxuoh9JAIu+4xguIOkYEnAcg2PcGiQdQgKOOnAMn6Jp7wsQTXk9NlzZKrw1PIrLguMEOFzZ6sNBwHEiHCCJDQk4LoADJDEhAceFcIAkFiTguAGO6S6jNKcpx+lS7s10fO0+ZfG1fnULHG3AIXK1FblEqra4+G00FhTvhQUcDcPBScARoDzbGSI3uQYYrtFOzb89EpCcCwk43i7JNjcASl1QgNFmnR8aFUjqQAKOQ2XY/sZA2QcKMNqv7aojBEoZKMCoWnaxPmyABCjLoAxglMAxPEzBAxVi1f3bowXKL0iA8Xb55NkgMyjAyFPnVY40S/QqiVHDc6rEqCpl1d+H9Ogq3KK/Om3iiCLDAoomSijPICLAAoo89dj8kbYADCCaLxMDnCowQlMTnhGCLRjG9QnrFGqSAhSgAAUoQAEKUIACFKAABShAAQpQgAIUoAAFKEABClCAAhSgAAUoQAEKUIACFKAABShAAQpQgAIUiKnAv+qBtNlDb5GEAAAAAElFTkSuQmCC";

         var theDiv = document.getElementById('myPlanets');

         if (! theDiv)
             theDiv = document.getElementById('myWorlds');

         theDiv = document.getElementById('planetList');

         var arrPlanets = getElementsByClass('smallplanet', theDiv, 'div');

         for (var i=0; i < arrPlanets.length; i++) {

              if (DEBUG_MODE > 1) GM_log('PlanetaMoonActivo >> [0 , ' + i + '] : ' + strPaginaActual);

              var theA = getElementsByClass('planetlink', arrPlanets[i], 'a')[0];

              if (DEBUG_MODE > 0) GM_log('PlanetaMoonActivo >> ' + theA.getAttribute('class') + ' : ' + strPaginaActual);

              if (theA.getAttribute('class').indexOf('planetlink active') >= 0)
              {
                  var theImg = theA.getElementsByTagName('img')[0];
                      theImg.setAttribute('src', IMG_PLANET_ACTIVE);

                  break;
              }

              if (DEBUG_MODE > 1) GM_log('PlanetaMoonActivo >> [1 , ' + i + '] : ' + strPaginaActual);

              var theA = getElementsByClass('moonlink', arrPlanets[i], 'a');

              if (theA.length > 0) {
                  theA = theA[0];

                  if (DEBUG_MODE > 0) GM_log('PlanetaMoonActivo >> ' + theA.getAttribute('class') + ' : ' + strPaginaActual);

                  if (theA.getAttribute('class').indexOf('moonlink active') >= 0)
                  {
                      var theImg = theA.getElementsByTagName('img')[0];
                          theImg.setAttribute('src', IMG_MOON_ACTIVE);

                      break;
                  }
              }
         }

    } catch (e) {
      if (DEBUG_MODE != 0)  GM_log('PlanetaMoonActivo [ERROR]: <' + e + '> ' + strPaginaActual);
    }
}

// Informacion de desmontaje de edificios
function InfoUnmount()
{
    try {
         function showInfoUnmount () {
           try {
                if (DEBUG_MODE > 1)  GM_log('InfoUnmount >> showInfoUnmount: ' + strPaginaActual);

                if ( strPaginaActual == 'station' ) {
                   if ( EsPlaneta() ) {
                      if ( document.getElementById('station_33_Xlarge') != null )
                         return;
                   } else {
                      if ( document.getElementById('station_41_Xlarge') != null )
                         return;
                   }
                } else {
                   if ( document.getElementById('resources_212_Xlarge') != null )
                      return;
                }

                if ( document.getElementById('action') == null )
                   return;

                if ( document.getElementById('lpk_unmount') != null )
                    return;

                var theContent = document.getElementById('content');
                var theLevel = getElementsByClass('level', theContent, 'span')[0];
                    theLevel = extraerNumeroCadena(theLevel.innerHTML);

                if ( theLevel <= 0 )
                   return;

                var theDiv = document.getElementById('action');

                var theUl = theDiv.getElementsByTagName('li')[0].parentNode;

                var myLi = document.createElement('li');
                    myLi.setAttribute('id', 'lpk_unmount');

                var theLi = getElementsByClass('demolish', document, 'li')[0];
                var theSpan = getElementsByClass('label', theLi, 'span')[0];

                var mySpan = document.createElement('span');
                    mySpan.style.color = 'crimson';
                    mySpan.appendChild(document.createTextNode(trim(theSpan.innerHTML) + ': '));

                myLi.appendChild(mySpan);

                mySpan = document.createElement('span');
                mySpan.style.color = color_Metal;

/*
   1 - Mina de Metal: 60*1,5^(nivel-1) Metal y 15*1,5^(nivel-1) Cristal
   2 - Mina de Cristal: 48*1,6^(nivel-1) Metal y 24*1,6^(nivel-1) Cristal
   3 - Sintetizador de Deuterio: 225*1,5^(nivel-1) Metal y 75*1,5^(Nivel-1) Cristal
   4 - Planta Energia Solar: 75*1,5^(nivel-1) Metal y 30*1,5^(Nivel-1) cristal
   5 - Planta Fusion: 900*1,8^(nivel-1) Metal y 360*1,8^(Nivel-1) cristal y 180*1,8^(Nivel-1) Deuterio
*/

                var theCost;

                try {
                     theCost = getElementsByClass('cost', document, 'span')[0].innerHTML;
                     theCost = theCost.replace(/\./g,'');

                     if (theCost.indexOf('M') >= 0) {
                         theCost = theCost.substring( 0, theCost.indexOf('M') ).replace(/\,/g,'.');
                         theCost = theCost * 1000000;
                     }

                     theCost = theCost.toString().replace(/\./g,'');

                     if ( ( document.getElementById('resources_1_Xlarge') != null ) ||
                          ( document.getElementById('resources_3_Xlarge') != null ) ||
                          ( document.getElementById('resources_4_Xlarge') != null ) )
                          theCost = ( ( ( theCost / (1.5) ) / ( 1.5 ) ) * (1 - (lvlIonica * 0.04))).toFixed(0)

                     else if ( document.getElementById('resources_2_Xlarge') != null )
                          theCost = ( ( ( theCost / (1.6) ) / ( 1.6 ) ) * (1 - (lvlIonica * 0.04))).toFixed(0)

                     else if ( document.getElementById('resources_5_Xlarge') != null )
                          theCost = ( ( ( theCost / (1.8) ) / ( 1.8 ) ) * (1 - (lvlIonica * 0.04))).toFixed(0)

                     else
                         theCost = (theCost / 4) * (1 - (lvlIonica * 0.04) );

                     mySpan.appendChild(document.createTextNode(addDots(theCost) + ' '));
                } catch (e) {};

                myLi.appendChild(mySpan);

                mySpan = document.createElement('span');
                mySpan.style.color = color_Cristal;

                try {
                     theCost = getElementsByClass('cost', document, 'span')[1].innerHTML;
                     theCost = theCost.replace(/\./g,'');

                     if (theCost.indexOf('M') >= 0) {
                         theCost = theCost.substring( 0, theCost.indexOf('M') ).replace(/\,/g,'.');
                         theCost = theCost * 1000000;
                     }

                     theCost = theCost.toString().replace(/\./g,'');

                     if ( ( document.getElementById('resources_1_Xlarge') != null ) ||
                          ( document.getElementById('resources_3_Xlarge') != null ) ||
                          ( document.getElementById('resources_4_Xlarge') != null ) )
                          theCost = ( ( ( theCost / (1.5) ) / ( 1.5 ) ) * (1 - (lvlIonica * 0.04))).toFixed(0)

                     else if ( document.getElementById('resources_2_Xlarge') != null )
                          theCost = ( ( ( theCost / (1.6) ) / ( 1.6 ) ) * (1 - (lvlIonica * 0.04))).toFixed(0)

                     else if ( document.getElementById('resources_5_Xlarge') != null )
                          theCost = ( ( ( theCost / (1.8) ) / ( 1.8 ) ) * (1 - (lvlIonica * 0.04))).toFixed(0)

                     else
                         theCost = (theCost / 4) * (1 - (lvlIonica * 0.04) );

                     mySpan.appendChild(document.createTextNode(addDots(theCost) + ' '));
                } catch (e) {};

                myLi.appendChild(mySpan);

                mySpan = document.createElement('span');
                mySpan.style.color = color_Deuterio;

                try {
                     theCost = getElementsByClass('cost', document, 'span')[2].innerHTML;
                     theCost = theCost.replace(/\./g,'');

                     if (theCost.indexOf('M') >= 0) {
                         theCost = theCost.substring( 0, theCost.indexOf('M') ).replace(/\,/g,'.');
                         theCost = theCost * 1000000;
                     }

                     theCost = theCost.toString().replace(/\./g,'');

                     if ( document.getElementById('resources_5_Xlarge') != null )
                          theCost = ( ( ( theCost / (1.8) ) / ( 1.8 ) ) * (1 - (lvlIonica * 0.04))).toFixed(0)
                     else
                         theCost = (theCost / 4) * (1 - (lvlIonica * 0.04) );

                     mySpan.appendChild(document.createTextNode(addDots(theCost) + ' '));
                } catch (e) {};

                myLi.appendChild(mySpan);

                theUl.appendChild(myLi);

           } catch (e) {
             if (DEBUG_MODE != 0)  GM_log('InfoUnmount >> showInfoUnmount [ERROR]: <' + e + '> ' + strPaginaActual);
           }
         }

         if (DEBUG_MODE != 0)  GM_log('InfoUnmount: Tech. Ionica = ' + lvlIonica + ' >> ' + strPaginaActual);

         if ( ( ( strPaginaActual != 'resources' ) &&
                ( strPaginaActual != 'station' )
              ) ||
              ( lvlIonica == 0 ) )
            return;

         if ( ! show_Demolish )
            return;

         setInterval(showInfoUnmount, 500);

    } catch (e) {
      if (DEBUG_MODE != 0)  GM_log('InfoUnmount [ERROR]: <' + e + '> ' + strPaginaActual);
    }
}

function getLangPack() // getLangPack() (return: true | false )
{
    try {
          if (DEBUG_MODE > 1)  GM_log('getLangPack: ' + strPaginaActual);

          function getLangText () { // getLangText(LANG, '', 'XX')
              try {
                   if (DEBUG_MODE > 2)  GM_log('getLangText: ' + strPaginaActual);

                   for(attribut in arguments[0])
                   {
                       if (typeof arguments[0][attribut] != "object" )
                       {

                           arguments[0][attribut] = localStorage ['LPuNKTKit_' + strUniverse + '_LANG_' +
                                                                 arguments[2] + '_' +
                                                                 attribut + '.' + arguments[1]] || '';

                           if (DEBUG_MODE > 2)
                               GM_log('getLangText >> [ ' + typeof arguments[0][attribut] + ' ] ' +
                                       arguments[2] + '_' +
                                       attribut + '.' + arguments[1] + ' : ' +
                                       arguments[0][attribut]);
                       }
                       else
                       {
                           getLangText(arguments[0][attribut], attribut, arguments[2]);
                       }

                   }
              } catch (e) {
                   if (DEBUG_MODE != 0)  GM_log('getLangText [ERROR]: <' + e + '> ' + strPaginaActual);
              }
          }

          var strLANG = localStorage ['LPuNKTKit_' + strUniverse + '_LANG'] || '';

          if (DEBUG_MODE > 1)  GM_log('getLangPack: [ LANG = ' + strLANG + ' ] ' + strPaginaActual);

          delete localStorage ['LPuNKTKit_' + strUniverse + '_LANG'];

          if (strLANG.length <= 0) return false;

          LANG = LANG_EN;

          getLangText(LANG, '', strLANG);

          return ( strLANG.length > 0 );

    } catch (e) {
          if (DEBUG_MODE != 0)  GM_log('getLangPack [ERROR]: <' + e + '> ' + strPaginaActual);
    }
}

function StoreLangPack(objLang, strLang) // StoreLangPack (LANG_XX, 'XX')
{
    try {
          if (strLang.length <= 0) return false;

          function StoreLangText(objLang, strAtrib, strArg) {
              try {
                   for(attribut in objLang)
                   {
                       if (typeof objLang[attribut] != "object" )
                       {
                           localStorage ['LPuNKTKit_' + strUniverse + '_LANG_' +
                                        strArg + '_' +
                                        attribut + '.' + strAtrib] = objLang[attribut];
                       }
                       else
                       {
                           StoreLangText(objLang[attribut], attribut, strArg);
                       }
                   }
              } catch(e) {
              }
          }

          function getUniverse() {
              try {
                   if (document.location.href.indexOf ('/game/index.php?page=') < 0)
                       return;

                   var metas = document.getElementsByTagName('META');

                   if (! metas) return;

                   var i;
                   for (i = 0; i < metas.length; i++)
                        if (metas[i].getAttribute('NAME') == "ogame-universe")
                            break;

                   if (metas[i])
                       var strUniv = metas[i].getAttribute('CONTENT').replace(/\./g,'_').toUpperCase()

                   else {
                       var strUniv = document.location.href.split (/\//) [2];
                           strUniv = strUniv.replace(/\./g,'_').toUpperCase();
                   }

                   return strUniv;

              } catch(e) {
              }
          }

          var strUniverse = getUniverse();

          localStorage ['LPuNKTKit_' + strUniverse + '_LANG'] = strLang;

          StoreLangText(objLang, '', strLang);

          return true;

    } catch (e) {}
}

/**********************************************************************
 *                            LENGUAJES                               *
 **********************************************************************/
var LANG_ES = {
  MULTILANGUAGE : {
          txt_langPack:'',
          url_langPack:''
  },

  SERVER : { // Textos generados por el servidor

          // Recursos
          txt_RES_metal: 'Metal',
          txt_RES_cristal: 'Cristal',
          txt_RES_deuterio: 'Deuterio',
          txt_RES_energia: 'Energ\u00A1a',

          // Cabecera de mensajes
          txt_MISSION_colorDeploy:'Despliegue de una flota',
          txt_MISSION_colorReturn:'Retorno de una flota',
          txt_MISSION_colorCircularMsg:'Mensaje circular',
          txt_MISSION_colorHarvest:'Informe desde el campo de escombros',
          txt_MISSION_colorEspionageReport:'Reporte de espionaje',
          txt_MISSION_colorEspionageAction:'Acci\u00f3n de espionaje',
          txt_MISSION_colorPM:'Mensaje privado',
          txt_MISSION_colorArrive:'Llegada a un planeta',
          txt_MISSION_colorExpedition:'Resultado de la expedici\u00f3n',
          txt_MISSION_colorColonize:'Informe de colonizaci\u00f3n',
          txt_MISSION_colorForeign: 'Entrega de recursos por flota ajena',

          // EmptySpace y otros
          txt_SHIP_LG_sonda: 'Sonda de espionaje',
          txt_SHIP_LG_satelite: 'Sat\u00e9lite Solar',
          txt_SHIP_LG_npc: 'Nave peque\u00f1a de carga',
          txt_SHIP_LG_ngc: 'Nave grande de carga',
          txt_SHIP_LG_reciclador: 'Reciclador',
          txt_SHIP_LG_cl: 'Cazador ligero',
          txt_SHIP_LG_cp: 'Cazador pesado',
          txt_SHIP_LG_crucero: 'Crucero',
          txt_SHIP_LG_nb: 'Nave de batalla',
          txt_SHIP_LG_acorazado: 'Acorazado',
          txt_SHIP_LG_bombardero: 'Bombardero',
          txt_SHIP_LG_destructor: 'Destructor',
          txt_SHIP_LG_colonizador:'Colonizador',
          txt_SHIP_LG_edlm: 'Estrella de la muerte',

          txt_DEFENSE_LG_lanza: 'Lanzamisiles',
          txt_DEFENSE_LG_laserp: 'L\u00e1ser peque\u00f1o',
          txt_DEFENSE_LG_laserg: 'L\u00e1ser grande',
          txt_DEFENSE_LG_gauss: 'Ca\u00f1\u00f3n gauss',
          txt_DEFENSE_LG_ionico: 'Ca\u00f1\u00f3n i\u00f3nico',
          txt_DEFENSE_LG_plasma: 'Ca\u00f1\u00f3n de plasma',
          txt_DEFENSE_LG_mInterplanet: 'Misiles Interplanetarios',
          txt_DEFENSE_LG_mIntercep: 'Misiles de intercepci\u00f3n',
          txt_DEFENSE_LG_cupPeque:'C\u00fapula peque\u00f1a',
          txt_DEFENSE_LG_cupGrande:'C\u00fapula grande',

          // Informe de batalla

          // Fechas
          txt_CR_DATE_enero:'Enero',
          txt_CR_DATE_febrero:'Febrero',
          txt_CR_DATE_marzo:'Marzo',
          txt_CR_DATE_abril:'Abril',
          txt_CR_DATE_mayo:'Mayo',
          txt_CR_DATE_junio:'Junio',
          txt_CR_DATE_julio:'Julio',
          txt_CR_DATE_agosto:'Agosto',
          txt_CR_DATE_septiembre:'Septiembre',
          txt_CR_DATE_octubre:'Octubre',
          txt_CR_DATE_noviembre:'Noviembre',
          txt_CR_DATE_diciembre:'Diciembre',

          // Nombre corto de naves
          txt_CR_SHIP_SH_PCarga:'P.Carga',
          txt_CR_SHIP_SH_GrCarga:'Gr.Carga',
          txt_CR_SHIP_SH_CLigero:'Cazador L.',
          txt_CR_SHIP_SH_CPesado:'Cazador P.',
          txt_CR_SHIP_SH_Crucero:'Crucero',
          txt_CR_SHIP_SH_NB:'Nave de batalla',
          txt_CR_SHIP_SH_Acoraz:'Acoraz.',
          txt_CR_SHIP_SH_Bomb:'Bombardero',
          txt_CR_SHIP_SH_Destruc:'Destructor',
          txt_CR_SHIP_SH_Edlm:'Est.Muerte',
          txt_CR_SHIP_SH_Colony:'Colonizador',
          txt_CR_SHIP_SH_Recy:'Reciclador.',
          txt_CR_SHIP_SH_Sonda:'Sonda',
          txt_CR_SHIP_SH_Satelite:'Sat\u00e9lite S.',

          // Nombre corto de defensas
          txt_CR_DEFENSE_SH_Lanza:'Misil',
          txt_CR_DEFENSE_SH_LPeque:'L\u00e1ser Peq.',
          txt_CR_DEFENSE_SH_LGrande:'L\u00e1ser Gr.',
          txt_CR_DEFENSE_SH_CGauss:'C.Gauss',
          txt_CR_DEFENSE_SH_CIonico:'C.I\u00f3nico',
          txt_CR_DEFENSE_SH_CPlasma:'C.Plasma',
          txt_CR_DEFENSE_SH_CupPeque:'C\u00fapula Peq.',
          txt_CR_DEFENSE_SH_CupGrande:'C\u00fapula Gr.',

          txt_CR_and:'y',
          txt_CR_attacker:'Atacante',
          txt_CR_Defender:'Defensor',
          txt_CR_Draw:'empate',
          txt_CR_theDefender:'El defensor',
          txt_CR_captured:'captura',
          txt_CR_destroyed:'ha sido destruido.'
  },

  MISC : {
          txt_reciclar: 'Reciclar',
          txt_expedicion:'Expedici\u00f3n',
          txt_colonizar:'Colonizar',
          txt_tranportar:'Transportar',
          txt_desplegar:'Desplegar',
          txt_espiar:'Espiar',
          txt_defender:'Defensa SAC',
          txt_atacarSAC:'Ataque SAC',
          txt_atacar:'Atacar',
          txt_destruir:'Destruir',
          txt_flota: 'Flota',
          txt_defensa: 'Defensas',
          txt_prod321: 'Producci\u00f3n seg\u00fan ratio 3:2:1',
          txt_Infinito: 'Infinito',
          txt_guardar: 'Guardar',
          txt_tiempoTotal: 'Tiempo total',
          txt_porDia: 'Al d\u00eda',
          txt_recursos: 'Recursos',
          txt_produccion: 'Producci\u00f3n',
          txt_produccionPlanetaria: 'Producci\u00f3n estimada en el planeta actual',
          txt_excedente: 'Excedente',
          txt_general:'Visi\u00f3n general',
          txt_listaEventos:'Lista de eventos',
          txt_recursosDetalle:'Par\u00e1metros de recursos',
          txt_instalaciones:'Instalaciones',
          txt_keySalto:'Salto cu\u00e1ntico',
          txt_investigaciones:'Investigaciones',
          txt_hangar:'Hangar',
          txt_galaxia:'Galaxia',
          txt_movFlota:'Movimientos de Flota',
          txt_alianza:'Alianza',
          txt_sendCC:'Enviar Mensaje Circular',
          txt_amigos:'Amigos',
          txt_notas:'Notas',
          txt_clasificacion:'Clasificaci\u00f3n',
          txt_buscar:'Buscar',
          txt_mensajes:'Mensajes',
          txt_priPlaneta:'Primer planeta',
          txt_ultPlaneta:'Ultimo planeta/luna',
          txt_antPlaneta:'Anterior planeta/luna',
          txt_sigPlaneta:'Siguiente planeta/luna',
          txt_antItem:'Opc. anterior del menu izq.',
          txt_sigItem:'Opc. siguiente del menu izq.',
          txt_altPlanetaLuna:'Alternar planeta/luna',
          txt_antCelestial:'Anterior cuerpo celestial del mismo tipo',
          txt_sigCelestial:'Siguiente cuerpo celestial del mismo tipo',
          txt_izquierda:'Izq',
          txt_derecha:'Drcha',
          txt_antPag:'Anterior p\u00e1gina',
          txt_sigPag:'Siguiente p\u00e1gina',
          txt_allNaves:'Seleccionar todas las naves',
          txt_borrarSel:'Borrar selecci\u00f3n',
          txt_allMens:'Seleccionar todos los mensajes visibles',
          txt_borrarMens:'Borrar los mensajes seleccionados',
          txt_priPag:'Primera p\u00e1gina',
          txt_ultPag:'Ultima p\u00e1gina',
          txt_antMens:'Anterior mensaje',
          txt_sigMens:'Siguiente mensaje',
          txt_delMens:'Borrar mensaje',
          txt_cerrarMens:'Cerrar mensaje',
          txt_arriba:'Arriba',
          txt_abajo:'Abajo',
          txt_avPag:'AvPag',
          txt_retPag:'RePag',
          txt_inicio:'Inicio',
          txt_fin:'Fin',
          txt_mayusc:'May\u00fas',
          txt_borrar:'Supr',
          txt_tecla:'Tecla',
          txt_accion:'Acci\u00f3n',
          txt_retroceso:'Back',
          txt_velocidad:'Velocidad',
          txt_destPlaneta:'Destino Planeta',
          txt_destLuna:'Destino Luna',
          txt_destEscombros:'Destino Escombros',
          txt_destExpedicion:'Destino coord. 16',
          txt_volver:'Volver a p\u00e1gina anterior',
          txt_ogame:'En todas partes, salvo en algunas p\u00e1ginas',
          txt_keyClasif:'En la p\u00e1gina de Clasificaciones',
          txt_keySaltoC:'En la p\u00e1gina de Salto cu\u00e1ntico',
          txt_keyMailbox:'En la bandeja de correo',
          txt_keyMessage:'En los mensajes',
          txt_key1Flota:'En la primera p\u00e1gina de flotas',
          txt_key2Flota:'En la segunda p\u00e1gina de flotas',
          txt_key3Flota:'En la tercera p\u00e1gina de flotas',
          txt_keyFlota:'En la p\u00e1gina de movimientos de flota',
          txt_recargar:'Recargar',
          txt_allRecursos:'Seleccionar todos los recursos',
          txt_recInversos:'Cargar recursos en orden inverso',
          txt_maxMetal:'Max/Min Metal',
          txt_maxCristal:'Max/Min Cristal',
          txt_maxDuty:'Max/Min Deuterio',
          txt_permanecer:'Permanecer',
          txt_hora:'hora',
          txt_expInfo:'Expandir/Contraer info. Flota',
          txt_texto:'Texto',
          txt_color:'Color',
          txt_espacioLibre:'Espacio libre',
          txt_enviar:'Enviar',
          txt_cancelarViaje:'\u00bfCancelar la misi\u00f3n?',
          txt_faltaEnergy:'Energ\u00eda restante',
          txt_efficiency:'Reducci\u00f3n de tiempo',
          txt_notAvailableCRFriki:'Lenguaje friki no disponible',
          txt_recurso: 'Recurso',
          txt_simular: 'Simular',
          txt_errorTrade: 'Datos de recursos, o ratios, no validos',
          txt_pranger: 'Infractores',
          txt_defecto: 'Por defecto',
          txt_todo: 'Todo',
          txt_guardado: 'Guardado',
          txt_Warehouses: 'Llenado de almacenes',
          txt_Dens: 'Llenado de escondites',
          txt_errorMsg: 'Tenga cuidado, estos textos identifican el mensaje',
          txt_links: 'Enlaces',
          txt_show: 'Mostrar',
          txt_debris:'Escombros',
          txt_planet: 'Lista de planetas',
          txt_usarKeys: 'Teclas de acceso r\u00e1pido',
          txt_habSection: '** Habilita m\u00e1s opciones de configuraci\u00f3n.',
          txt_errorCR: 'Tenga cuidado, estos textos identifican las flotas y ' +
                       'defensas del informe original',
          txt_emptyFields: 'campos vac\u00edos',
          txt_ChatXat: 'Chat de Xat.com'
  },

  OPTION : {
          txt_showFleetResources: 'Mostrar recursos en viaje',
          txt_minEscombros: 'Tama\u00F1o min. escombros',
          txt_disableUselessStuff: 'Desactivar cosas in\u00fatiles',
          txt_showRange: 'Mostrar rango de Misiles y Phalanx',
          txt_showResourcesPerFleet: 'Mostrar recursos por cada flota',
          txt_usarGeneral:'Usar en p\u00e1ginas comunes',
          txt_usarFlota:'Usar en p\u00e1ginas de flota',
          txt_usarMens:'Usar en p\u00e1ginas de mensajes',
          txt_usarKeys:'Usar Teclas de acceso r\u00e1pido',
          txt_fixActionButtons:'Corregir botones de acci\u00f3n',
          txt_highlightPlayers:'Resaltar jugadores y alianzas',
          txt_colorFlightSlots:'Colorear ranuras de flota',
          txt_prangerInHeader:'Enlace a infractores en la cabecera',
          txt_replyCircularMsg:'Responder Mensajes Circulares',
          txt_planetNameInMsg:'Mostrar planeta actual en mensajes',
          txt_useSmiles:'Smiles',
          txt_chkChat:'Mostrar Chat en la p\u00e1gina de alianza',
          txt_idChat:'Id del chat',
          txt_coloredMessages:'Colorear cabecera de mensajes',
          txt_showMessageButtonLeft:'Bot\u00f3n de mensajes en el men\u00fa izquierdo',
          txt_setFocusCorrectly:'Posicionar el foco correctamente',
          txt_fontColor:'Color de la fuente',
          txt_showPlanetNavKeys:'Botones de navegaci\u00f3n entre planetas',
          txt_showMissingSats:'Mostrar satelites para balance positivo',
          txt_resourcesInfo:'Detalle de producci\u00f3n de recursos',
          txt_showEmptySpace:'Espacio libre en cada flota',
          txt_fixForumLink:'Arreglar enlace al foro',
          txt_moonsToRight:'Lunas a la derecha',
          txt_quitarAdv:'Quitar advertencia de colonizaci\u00f3n',
          txt_backTransparent:'Fondo de ventanas de config. transparente',
          txt_scriptCRName:'Compactador de Batallas',
          txt_disableStar:'Quitar estrella parpadeante',
          txt_coordLinksFix:'Encuadrar coordenadas enlazadas',
          txt_loadButtons:'Botones adicionales de carga',
          txt_optionsInUsername:'Opciones en el nombre de usuario',
          txt_returnFleetQuestion:'Preguntar por retorno de flota',
          txt_satGraviton:'Satelites para Gravit\u00f3n',
          txt_satTerraformer:'Satelites para Terraformer',
          txt_confirmTrader:'Advertencia del comerciante',
          txt_showEfficiency:'Mostrar reducci\u00f3n de tiempo',
          txt_smallPlanets:'Mostrar planetas peque\u00f1os',
          txt_usarCRFriki:'Usar lenguaje friki',
          txt_showFleetContent: 'Mostrar flota en pag. de envio de flota',
          txt_showDestPlayerName: 'Mostrar nombre del jugador destino',
          txt_useDirectSpy: 'Espiar directamente desde movimientos',
          txt_useShortHeader: 'Minimizar cabecera',
          txt_showTradeCalculator: 'Calculadora de comercio',
          txt_showLlenadoAlmacenes: 'Calcular ocupaci\u00f3n de almacenes',
          txt_showProductionRatio: 'Mostrar producci\u00f3n ideal',
          txt_showDailyShipsDefenses: 'Mostrar prod. diaria de flota y defensas',
          txt_showTimeShipsDefenses: 'Calcular tiempo de fabricaci\u00f3n',
          txt_showUniNameInPillory: 'Nombre del universo en el pillory',
          txt_showDebris: 'Cantidad',
          txt_showDebrisIcon: 'Icono',
          txt_fixTooltips:'Corregir anchura de tooltips',
          txt_colorEnergyUsed: 'Energ\u00eda usada',
          txt_colorResAlmacen: 'Almacen',
          txt_colorResDen: 'Escondite',
          txt_EmptySlot: 'espacios vac\u00edos',
          txt_showAutoExpoFleet: 'Selecci\u00f3n autom\u00e1tica de expediciones',
          txt_fullPlanet: 'Colorear planeta lleno',
          txt_showNoEscape: 'Colorear combustible para escape',
          txt_colorEnough:'Suficiente',
          txt_colorNotEnough:'Insuficiente',
          txt_setClockLinks:'Mostrar reloj en la barra de los enlaces',
          txt_linkChat:'Link al chat en la barra de los enlaces',
          txt_hideStolenCR: 'Ocultar robo vac\u00edo',
          txt_hideDebrisCR: 'Ocultar escombros vac\u00edos'
  },

  CR : {
          txt_De:'de',
          txt_AttWin:'\u00a1El atacante ha ganado la batalla!',
          txt_DefWin:'\u00a1El defensor ha ganado la batalla!',
          txt_Empate:'\u00a1La batalla ha terminado en empate!',
          txt_lost:'perdi\u00f3',
          txt_attackers:'Atacantes',
          txt_battleDay:'Batalla del d\u00eda',
          txt_loses:'Perdidas',
          txt_units:'unidades',
          txt_defenders:'Defensores',
          txt_withoutDef:'Sin defensas',
          txt_stolen:'Robo',
          txt_attFleet:'Flota atacante',
          txt_defFleet:'Flota defensora',
          txt_totLoses:'Perdidas TOTALES',
          txt_debris:'Escombros',
          txt_recys:'reciclador(es)',
          txt_profit:'Rentabilidad',
          txt_attHarvest:'Atacantes reciclando',
          txt_attNoHarvest:'Atacantes sin reciclar',
          txt_defHarvest:'Defensores reciclando',
          txt_farming:'Ataque-Granjeo',
          txt_attProfit:'Renta atacante',
          txt_minimal:'COMPACTADO MINIMO',
          txt_foro:'Foro',
          txt_auto:'Compactador autom\u00e1tico de batallas',
          txt_texts:'Textos del informe de batalla',
          txt_colors:'Colores del compactador de batallas',
          txt_lossesXRes:'Perdidas por tipo de recurso',
          txt_lostUnits:'Unidades perdidas',
          txt_titles:'Titulos',
          txt_lostShips:'Naves perdidas',
          txt_moon:'Luna',
          txt_others:'Otros'
  },

  CR_FRIKI : {
          txt_RES_metal: 'Chatarra',
          txt_RES_cristal: 'Cart\u00f3n',
          txt_RES_deuterio: 'Gasofa',

          txt_SHIP_LG_sonda: 'Gorda de espionaje',
          txt_SHIP_LG_satelite: 'Motor de gasofa',
          txt_SHIP_LG_npc: 'Carreta peque\u00f1a de carga',
          txt_SHIP_LG_ngc: 'Cami\u00f3n grande de carga',
          txt_SHIP_LG_reciclador: 'Recicladora',
          txt_SHIP_LG_cl: 'Fragoneta ligera',
          txt_SHIP_LG_cp: 'Fragoneta pesada',
          txt_SHIP_LG_crucero: 'Burrero',
          txt_SHIP_LG_nb: 'Cabra de batalla',
          txt_SHIP_LG_acorazado: 'Navajero',
          txt_SHIP_LG_bombardero: 'Malacatonero',
          txt_SHIP_LG_destructor: 'Farruquito',
          txt_SHIP_LG_edlm: 'Gitanazo de la Muerte',
          txt_SHIP_LG_colonizador: 'Patriarca',

          txt_DEFENSE_LG_lanza: 'Churumbeles',
          txt_DEFENSE_LG_laserp: 'Segurata peque\u00f1o',
          txt_DEFENSE_LG_laserg: 'Segurata grande',
          txt_DEFENSE_LG_gauss: 'Benemeritos',
          txt_DEFENSE_LG_ionico: 'Jenys',
          txt_DEFENSE_LG_plasma: 'Pasma',
          txt_DEFENSE_LG_cupPeque:'Toldo peque\u00f1o de protecci\u00f3n',
          txt_DEFENSE_LG_cupGrande:'Toldo grande de protecci\u00f3n',
          txt_DEFENSE_LG_mInterplanet: 'Jonco interfabelario',
          txt_DEFENSE_LG_mIntercep: 'Jonco de intercepci\u00f3n',

          txt_recys:'recicladora(s)'
  }
};

var LANG_EN = {

  MULTILANGUAGE : {
          txt_langPack:'',
          url_langPack:''
  },

  SERVER : { // Texts generated by each server

            //Resources
            txt_RES_metal: "Metal",
            txt_RES_cristal: "Crystal",
            txt_RES_deuterio: "Deuterium",
            txt_RES_energia: "Energy",

            // Message subjects
            txt_MISSION_colorDeploy:'Fleet deployment',
            txt_MISSION_colorReturn:'Return of a fleet',
            txt_MISSION_colorCircularMsg:'Circular message',
            txt_MISSION_colorHarvest:'Harvesting report',
            txt_MISSION_colorEspionageReport:'Espionage report',
            txt_MISSION_colorEspionageAction:'Espionage Action',
            txt_MISSION_colorPM:'Private message',
            txt_MISSION_colorArrive:'Reaching a planet',
            txt_MISSION_colorExpedition:'Expedition result',
            txt_MISSION_colorColonize:'Colonization report',
            txt_MISSION_colorForeign: 'Resource delivery by foreign fleet',

            //EmptySpace and others
            txt_SHIP_LG_sonda: "Espionage Probe",
            txt_SHIP_LG_satelite: "Solar Satellite",
            txt_SHIP_LG_npc: "Small Cargo",
            txt_SHIP_LG_ngc: "Large Cargo",
            txt_SHIP_LG_reciclador: "Recycler",
            txt_SHIP_LG_cl: "Light Fighter",
            txt_SHIP_LG_cp: "Heavy Fighter",
            txt_SHIP_LG_crucero: "Cruiser",
            txt_SHIP_LG_nb: "Battleship",
            txt_SHIP_LG_acorazado: "Battlecruiser",
            txt_SHIP_LG_bombardero: "Bomber",
            txt_SHIP_LG_destructor: "Destroyer",
            txt_SHIP_LG_colonizador:'Colony Ship',
            txt_SHIP_LG_edlm: "Deathstar",

            txt_DEFENSE_LG_lanza: "Rocket Launcher",
            txt_DEFENSE_LG_laserp: "Light Laser",
            txt_DEFENSE_LG_laserg: "Heavy Laser",
            txt_DEFENSE_LG_gauss: "Gauss Cannon",
            txt_DEFENSE_LG_ionico: "Ion Cannon",
            txt_DEFENSE_LG_plasma: "Plasma Turret",
            txt_DEFENSE_LG_mInterplanet: "Interplanetary Missiles",
            txt_DEFENSE_LG_mIntercep: "Anti-Ballistic Missiles",
            txt_DEFENSE_LG_cupPeque:'Small Shield Dome',
            txt_DEFENSE_LG_cupGrande:'Large Shield Dome',

            // Combat Report

            // Dates
            txt_CR_DATE_enero:'January',
            txt_CR_DATE_febrero:'February',
            txt_CR_DATE_marzo:'March',
            txt_CR_DATE_abril:'April',
            txt_CR_DATE_mayo:'May',
            txt_CR_DATE_junio:'June',
            txt_CR_DATE_julio:'July',
            txt_CR_DATE_agosto:'August',
            txt_CR_DATE_septiembre:'September',
            txt_CR_DATE_octubre:'October',
            txt_CR_DATE_noviembre:'November',
            txt_CR_DATE_diciembre:'December',

            // Ship's short names
            txt_CR_SHIP_SH_PCarga:'S.Cargo',
            txt_CR_SHIP_SH_GrCarga:'H.Cargo',
            txt_CR_SHIP_SH_CLigero:'L.Fighter',
            txt_CR_SHIP_SH_CPesado:'H.Fighter',
            txt_CR_SHIP_SH_Crucero:'Cruiser',
            txt_CR_SHIP_SH_NB:'Battleship',
            txt_CR_SHIP_SH_Acoraz:'Battlecr.',
            txt_CR_SHIP_SH_Bomb:'Bomb.',
            txt_CR_SHIP_SH_Destruc:'Destr.',
            txt_CR_SHIP_SH_Edlm:'Death star',
            txt_CR_SHIP_SH_Colony:'Colonyship',
            txt_CR_SHIP_SH_Recy:'Recyklator',
            txt_CR_SHIP_SH_Sonda:'Esp.Probe',
            txt_CR_SHIP_SH_Satelite:'Sol sat',

            // Defense's short names
            txt_CR_DEFENSE_SH_Lanza:'R.Launcher',
            txt_CR_DEFENSE_SH_LPeque:'L.Laser',
            txt_CR_DEFENSE_SH_LGrande:'T.Laser',
            txt_CR_DEFENSE_SH_CGauss:'Gauss',
            txt_CR_DEFENSE_SH_CIonico:'Ion. K.',
            txt_CR_DEFENSE_SH_CPlasma:'Plazma',
            txt_CR_DEFENSE_SH_CupPeque:'S.Dome',
            txt_CR_DEFENSE_SH_CupGrande:'L.Dome',

            txt_CR_and:'and',
            txt_CR_Defender:'Defender',
            txt_CR_Draw:'draw',
            txt_CR_attacker:'Attacker',
            txt_CR_captured:'He captured',
            txt_CR_theDefender:'Defender',
            txt_CR_destroyed:'destroyed.'
  },

  MISC : {
          txt_reciclar: "Recycle",
          txt_expedicion:'Expedition',
          txt_colonizar:'Colonize',
          txt_tranportar:'Transport',
          txt_desplegar:'Deploy',
          txt_espiar:'Espionage',
          txt_defender:'ACS-Defend',
          txt_atacarSAC:'ACS-Atack',
          txt_atacar:'Attack',
          txt_destruir:'Destroy',
          txt_flota: "Ships",
          txt_defensa: "Defense",
          txt_prod321: "Production compared to 3:2:1 rate",
          txt_Infinito: "Infinity",
          txt_guardar: "Save",
          txt_tiempoTotal: "Total time",
          txt_porDia: "Per day",
          txt_recursos: "Resources",
          txt_produccion: "Production",
          txt_produccionPlanetaria: "Estimated production in the current planet",
          txt_excedente: "Excess",
          txt_general:'Overview',
          txt_listaEventos:'Event list',
          txt_recursosDetalle:'Resource settings',
          txt_instalaciones:'Facilities',
          txt_keySalto:'Jumpgate',
          txt_investigaciones:'Research',
          txt_hangar:'Shipyard',
          txt_galaxia:'Galaxy',
          txt_movFlota:'Fleet movement',
          txt_alianza:'Alliance',
          txt_sendCC:'Send Circular Message',
          txt_amigos:'Buddies',
          txt_notas:'Notes',
          txt_clasificacion:'Ranking',
          txt_buscar:'Search',
          txt_mensajes:'Messages',
          txt_priPlaneta:'First planet',
          txt_ultPlaneta:'Last planet/moon',
          txt_antPlaneta:'Previous planet/moon',
          txt_sigPlaneta:'Next planet/moon',
          txt_antItem:'Prev. item on the left menu',
          txt_sigItem:'Next item on the left menu',
          txt_altPlanetaLuna:'Switches the planet and its moon',
          txt_antCelestial:'Previous celestial body of the same type (planet or moon)',
          txt_sigCelestial:'Next celestial body of the same type (planet or moon)',
          txt_izquierda:'Left',
          txt_derecha:'Right',
          txt_antPag:'Previous page',
          txt_sigPag:'Next page',
          txt_allNaves:'Select all ships',
          txt_borrarSel:'Clear selection',
          txt_allMens:'Select all visible messages',
          txt_borrarMens:'Delete selected messages',
          txt_priPag:'First page',
          txt_ultPag:'Last page',
          txt_antMens:'Previous message',
          txt_sigMens:'Next message',
          txt_delMens:'Delete message',
          txt_cerrarMens:'Close message',
          txt_arriba:'Up',
          txt_abajo:'Down',
          txt_avPag:'PgDn',
          txt_retPag:'PgUp',
          txt_inicio:'Home',
          txt_fin:'End',
          txt_mayusc:'Shift',
          txt_borrar:'Del',
          txt_tecla:'Key',
          txt_accion:'Action',
          txt_retroceso:'BackSp',
          txt_velocidad:'Speed',
          txt_destPlaneta:'Target Planet',
          txt_destLuna:'Target Moon',
          txt_destEscombros:'Target Debris Field',
          txt_destExpedicion:'Target\'s coord. to 16',
          txt_volver:'Return to the previous page',
          txt_ogame:'Everywhere, except on some special pages',
          txt_keyClasif:'On the Ranking',
          txt_keySaltoC:'On the Jumpgate',
          txt_keyMailbox:'On the mailbox',
          txt_keyMessage:'On the messages',
          txt_key1Flota:'On the first fleet dispatch page',
          txt_key2Flota:'On the second fleet dispatch page',
          txt_key3Flota:'On the third fleet dispatch page',
          txt_keyFlota:'On the fleet movement page',
          txt_recargar:'Reload',
          txt_allRecursos:'Select all resources',
          txt_recInversos:'Load resources in reverse order',
          txt_maxMetal:'Max/Min Metal',
          txt_maxCristal:'Max/Min Crystal',
          txt_maxDuty:'Max/Min Deuterium',
          txt_permanecer:'Staying time to',
          txt_hora:'hour',
          txt_expInfo:'Expand/Collapse fleet info.',
          txt_texto:'Text',
          txt_color:'Color',
          txt_espacioLibre:'Available space',
          txt_enviar:'Send',
          txt_cancelarViaje:'Cancel the mission?',
          txt_faltaEnergy:'Energy needed',
          txt_efficiency:'Time reduction',
          txt_notAvailableCRFriki:'Geek language no available',
          txt_recurso: 'Resource',
          txt_simular: 'Simulate',
          txt_errorTrade: 'Resource data, or ratios, are not valid',
          txt_pranger: 'Pranger',
          txt_defecto: 'Default',
          txt_todo: 'All',
          txt_guardado: 'Saved',
          txt_Warehouses: 'Filling of warehouses',
          txt_Dens: 'Filling of underground dens',
          txt_errorMsg: 'Be careful, these texts identify the type of message',
          txt_links: 'Links',
          txt_show: 'Show',
          txt_debris:'Debris',
          txt_planet: 'List of planets',
          txt_usarKeys: 'Shortcut keys',
          txt_habSection: '** Enables more configuration options',
          txt_errorCR: 'Be careful, these texts identify the fleets and ' +
                       'defenses of original report',
          txt_emptyFields: 'empty fields',
          txt_ChatXat: 'Xat.com\'s Chat'
  },

  OPTION : {
        txt_showFleetResources: "Show fleet resources",
        txt_minEscombros: "Min. size of debris",
        txt_disableUselessStuff: "Disable Useless Stuff",
        txt_showRange: "Show IPM and Phalanx Range",
        txt_showResourcesPerFleet: "Show resources for each fleet",
        txt_usarGeneral:'Use in common pages',
        txt_usarFlota:'Use in fleet pages',
        txt_usarMens:'Use in message pages',
        txt_usarKeys:'Use shortcut keys',
        txt_fixActionButtons:'Fix action buttons',
        txt_highlightPlayers:'Highlight players and alliances',
        txt_colorFlightSlots:'Color flight slots',
        txt_prangerInHeader:'Pranger in header',
        txt_replyCircularMsg:'Reply Circular Messages',
        txt_planetNameInMsg:'Show planet name in messages',
        txt_useSmiles:'Smiles',
        txt_chkChat:'Show chat in alliance page',
        txt_idChat:'Id chat',
        txt_coloredMessages:'Color message subjects',
        txt_showMessageButtonLeft:'Message button in left menu',
        txt_setFocusCorrectly:'Set the focus correctly',
        txt_fontColor:'Font color',
        txt_showPlanetNavKeys:'Navigation buttons between planets',
        txt_showMissingSats:'Show missing sats to positive balance',
        txt_resourcesInfo:'Resource production details',
        txt_showEmptySpace:'Free space for each fleet',
        txt_fixForumLink:'Fix forum link',
        txt_quitarAdv:'Remove warning colonization',
        txt_backTransparent:'Transparent background in config. windows',
        txt_scriptCRName:'CR conversor',
        txt_disableStar:'Remove blink star',
        txt_coordLinksFix:'Coordinate frame linked',
        txt_loadButtons:'Additional resource loading buttons',
        txt_optionsInUsername:'oGame options in user name',
        txt_returnFleetQuestion:'Ask for return of fleet',
        txt_satGraviton:'Satellites for Graviton',
        txt_satTerraformer:'Satellites for Terraformer',
        txt_confirmTrader:'Merchant Warning',
        txt_showEfficiency:'Show time reduction',
        txt_smallPlanets:'Show small planets',
        txt_usarCRFriki:'Use geek language',
        txt_showFleetContent: 'Show fleet in dispatch pages of fleet',
        txt_showDestPlayerName: 'Show destination player name',
        txt_useDirectSpy: 'Spy directly from the movement page',
        txt_useShortHeader: 'Short header',
        txt_showTradeCalculator: 'Trade calculator',
        txt_showLlenadoAlmacenes: 'Calculate filling of warehouses',
        txt_showProductionRatio: 'Show ideal production',
        txt_showDailyShipsDefenses: 'Show daily prod. of ships and defenses',
        txt_showTimeShipsDefenses: 'Calculate manufacturing time',
        txt_showUniNameInPillory: 'Universe name in pillory',
        txt_moonsToRight:'Moons to the right',
        txt_showDebris: 'Amount',
        txt_showDebrisIcon: 'Icon',
        txt_fixTooltips:'Fix width of tooltips',
        txt_colorEnergyUsed: 'Energy used',
        txt_colorResAlmacen: 'Warehouse',
        txt_colorResDen: 'Underground den',
        txt_EmptySlot: 'empty slots',
        txt_showAutoExpoFleet: 'Automatic selection of expeditions',
        txt_fullPlanet: 'Coloring full planet',
        txt_showNoEscape: 'Coloring fuel to escape',
        txt_colorEnough:'Enough',
        txt_colorNotEnough:'Not enough',
        txt_setClockLinks:'Show clock in the bar of the links',
        txt_linkChat:'Chat\'s link in the bar of the links',
        txt_hideStolenCR: 'Hide empty theft result',
        txt_hideDebrisCR: 'Hide empty debris field'
  },

  CR : {
        txt_De:'of',
        txt_AttWin:'The attacker has won the battle!',
        txt_DefWin: 'The defender has won the battle!',
        txt_Empate: 'The battle has ended in a draw!',
        txt_lost:'lost',
        txt_attackers:'Attackers',
        txt_battleDay:'Battle of the day',
        txt_loses:'Losses',
        txt_units:'units',
        txt_defenders:'Defenders',
        txt_withoutDef:'Without defenses',
        txt_stolen:'Robbery',
        txt_attFleet:'Attacker\'s fleet',
        txt_defFleet:'Defender\'s fleet',
        txt_totLoses:'TOTAL Losses',
        txt_debris:'Debris',
        txt_recys:'recycler(s)',
        txt_profit:'Profit',
        txt_attHarvest:'Attackers harvesting',
        txt_attNoHarvest:'Attackers without harvest',
        txt_defHarvest:'Defenders harvesting',
        txt_farming:'Attack-Farming',
        txt_attProfit:'Attacker\'s profit',
        txt_minimal:'MINIMUM COMPACTED',
        txt_foro:'Forum',
        txt_auto:'Automatic combat report convertor',
        txt_texts:'Texts of Battle report',
        txt_colors:'Colors of combat report convertor',
        txt_lossesXRes:'Losses for each resource',
        txt_lostUnits:'Lost units',
        txt_titles:'Titles',
        txt_lostShips:'Lost ships',
        txt_moon:'Moon',
        txt_others:'Others'
  },

  CR_FRIKI : {
        txt_RES_metal: ' ',
        txt_RES_cristal: ' ',
        txt_RES_deuterio: ' ',

        txt_SHIP_LG_sonda: ' ',
        txt_SHIP_LG_satelite: ' ',
        txt_SHIP_LG_npc: ' ',
        txt_SHIP_LG_ngc: ' ',
        txt_SHIP_LG_reciclador: ' ',
        txt_SHIP_LG_cl: ' ',
        txt_SHIP_LG_cp: ' ',
        txt_SHIP_LG_crucero: ' ',
        txt_SHIP_LG_nb: ' ',
        txt_SHIP_LG_acorazado: ' ',
        txt_SHIP_LG_bombardero: ' ',
        txt_SHIP_LG_destructor: ' ',
        txt_SHIP_LG_edlm: ' ',
        txt_SHIP_LG_colonizador: ' ',

        txt_DEFENSE_LG_lanza: ' ',
        txt_DEFENSE_LG_laserp: ' ',
        txt_DEFENSE_LG_laserg: ' ',
        txt_DEFENSE_LG_gauss: ' ',
        txt_DEFENSE_LG_ionico: ' ',
        txt_DEFENSE_LG_plasma: ' ',
        txt_DEFENSE_LG_cupPeque:' ',
        txt_DEFENSE_LG_cupGrande:' ',
        txt_DEFENSE_LG_mInterplanet: ' ',
        txt_DEFENSE_LG_mIntercep: ' ',

        txt_recys:' '
  }
};


var LANG_FR = {

  MULTILANGUAGE : {
          txt_langPack:'',
          url_langPack:''
  },

  SERVER : { // Texts generated by each server

        // Resources
        txt_RES_metal: "M\u00e9tal",
        txt_RES_cristal: "Cristal",
        txt_RES_deuterio: "Deut\u00e9rium",
        txt_RES_energia: "Energie",

        // Message subjects
        txt_MISSION_colorDeploy:'Stationnement d\'une flotte',
        txt_MISSION_colorReturn:'Retour d\'une flotte',
        txt_MISSION_colorCircularMsg:'Message circulaire',
        txt_MISSION_colorHarvest:'Rapport d\'exploitation',
        txt_MISSION_colorEspionageReport:'Rapport d\'espionnage',
        txt_MISSION_colorEspionageAction:'Activit\u00e9 d\'espionnage',
        txt_MISSION_colorPM:'Message priv\u00e9',
        txt_MISSION_colorArrive:'Arriv\u00e9e sur une plan\u00e8te',
        txt_MISSION_colorExpedition:'R\u00e9sultat de l\'exp\u00e9dition',
        txt_MISSION_colorColonize:'Rapport de colonisation',
        txt_MISSION_colorForeign:'Les ressources de la flotte \u00e9trang\u00e8re prestation',

        // EmptySpace and others
        txt_SHIP_LG_sonda: "Sonde espionnage",
        txt_SHIP_LG_satelite: "Satellite solaire",
        txt_SHIP_LG_npc: "Petit transporteur",
        txt_SHIP_LG_ngc: "Grand transporteur",
        txt_SHIP_LG_reciclador: "Recycleur",
        txt_SHIP_LG_cl: "Chasseur l\u00e9ger",
        txt_SHIP_LG_cp: "Chasseur lourd",
        txt_SHIP_LG_crucero: "Croiseur",
        txt_SHIP_LG_nb: "Vaisseau de bataille",
        txt_SHIP_LG_acorazado: "Traqueur",
        txt_SHIP_LG_bombardero: "Bombardier",
        txt_SHIP_LG_destructor: "Destructeur",
        txt_SHIP_LG_colonizador:'Colonisateur',
        txt_SHIP_LG_edlm: "\u00c9toile de la mort",

        txt_DEFENSE_LG_lanza: "Lanceur de missiles",
        txt_DEFENSE_LG_laserp: "Artillerie laser l\u00e9g\u00e8re",
        txt_DEFENSE_LG_laserg: "Artillerie laser lourde",
        txt_DEFENSE_LG_gauss: "Canon de Gauss",
        txt_DEFENSE_LG_ionico: "Artillerie \u00e0 ions",
        txt_DEFENSE_LG_plasma: "Lanceur de plasma",
        txt_DEFENSE_LG_mInterplanet: "Missile Interplan\u00e9taire",
        txt_DEFENSE_LG_mIntercep: "Missile d\'interception",
        txt_DEFENSE_LG_cupPeque:'Petit bouclier',
        txt_DEFENSE_LG_cupGrande:'Grand bouclier',

        // Combat Report
        // Dates
        txt_CR_DATE_enero:'Janvier',
        txt_CR_DATE_febrero:'F\u00e9vrier',
        txt_CR_DATE_marzo:'Mars',
        txt_CR_DATE_abril:'Avril',
        txt_CR_DATE_mayo:'Mai',
        txt_CR_DATE_junio:'Juin',
        txt_CR_DATE_julio:'Juillet',
        txt_CR_DATE_agosto:'Ao\u00fbt',
        txt_CR_DATE_septiembre:'Septembre',
        txt_CR_DATE_octubre:'Octobre',
        txt_CR_DATE_noviembre:'Novembre',
        txt_CR_DATE_diciembre:'D\u00e9cembre',

        // Ship's short names
        txt_CR_SHIP_SH_PCarga:'P.transp.',
        txt_CR_SHIP_SH_GrCarga:'G.transp.',
        txt_CR_SHIP_SH_CLigero:'Ch.l\u00e9ger',
        txt_CR_SHIP_SH_CPesado:'Ch.lourd',
        txt_CR_SHIP_SH_Crucero:'Croiseur',
        txt_CR_SHIP_SH_NB:'V.bataille',
        txt_CR_SHIP_SH_Acoraz:'Traqueur',
        txt_CR_SHIP_SH_Bomb:'Bombardier',
        txt_CR_SHIP_SH_Destruc:'Destr.',
        txt_CR_SHIP_SH_Edlm:'RIP',
        txt_CR_SHIP_SH_Colony:'V.colo',
        txt_CR_SHIP_SH_Recy:'Recycleur',
        txt_CR_SHIP_SH_Sonda:'Sonde',
        txt_CR_SHIP_SH_Satelite:'Sat.sol.',

        // Defense's short names
        txt_CR_DEFENSE_SH_Lanza:'Missile',
        txt_CR_DEFENSE_SH_LPeque:'L.l\u00e9ger.',
        txt_CR_DEFENSE_SH_LGrande:'L.lourd',
        txt_CR_DEFENSE_SH_CGauss:'Can.Gauss',
        txt_CR_DEFENSE_SH_CIonico:'Art.ions',
        txt_CR_DEFENSE_SH_CPlasma:'Lanc.plasma',
        txt_CR_DEFENSE_SH_CupPeque:'P.bouclier',
        txt_CR_DEFENSE_SH_CupGrande:'G.bouclier',

        txt_CR_and:'et',
        txt_CR_attacker:'Attaquant',
        txt_CR_Defender:'D\u00e9fenseur',
        txt_CR_Draw:'match nul',
        txt_CR_captured:'gagne',
        txt_CR_theDefender:'Defender',
        txt_CR_destroyed:'d\u00e9truites.'
  } ,

  MISC : {
        txt_reciclar: "Recycler",
        txt_expedicion:'Exp\u00e9dition',
        txt_colonizar:'Coloniser',
        txt_tranportar:'Transports',
        txt_desplegar:'Affichage',
        txt_espiar:'\u00c9pier',
        txt_defender:'D\u00e9fenseur SAC',
        txt_atacarSAC:'Attaque SAC',
        txt_atacar:'Attaque',
        txt_destruir:'D\u00e9truire',
        txt_flota: "Flotte",
        txt_defensa: "D\u00e9fense",
        txt_prod321: "Production compar\u00e9e au rapport 3:2:1",
        txt_Infinito: "Infini",
        txt_guardar: "Sauver",
        txt_tiempoTotal: "Temps total",
        txt_porDia: "Par jour",
        txt_recursos: "Ressources",
        txt_produccion: "Production",
        txt_produccionPlanetaria: "Estimation de la production actuelle de la plan\u00e8te",
        txt_excedente: "Exc\u00e9dentaires",
        txt_general:'Aper\u00e7u',
        txt_listaEventos:'Liste des \u00e9v\u00e8nements',
        txt_recursosDetalle:'Les param\u00e8tres de ressources',
        txt_instalaciones:'Installations',
        txt_keySalto:'Jumpgate',
        txt_investigaciones:'Recherche',
        txt_hangar:'Hangar',
        txt_galaxia:'Galaxy',
        txt_movFlota:'Mouvements de la flotte',
        txt_alianza:'Alliance',
        txt_sendCC:'Envoyer un message circulaire',
        txt_amigos:'Amis',
        txt_notas:'Notes',
        txt_clasificacion:'Classement',
        txt_buscar:'Rechercher',
        txt_mensajes:'Messages',
        txt_priPlaneta:'Premier plan\u00e8te',
        txt_ultPlaneta:'Derni\u00e8re plan\u00e8te/lune',
        txt_antPlaneta:'Plan\u00e8te/lune pr\u00e9c\u00e9dente',
        txt_sigPlaneta:'Suivant la plan\u00e8te/lune',
        txt_antItem:'Article pr\u00e9c\u00e9dent sur le menu de gauche',
        txt_sigItem:'Suivant le point sur le menu de gauche',
        txt_altPlanetaLuna:'Basculer la plan\u00e8te/lune',
        txt_antCelestial:'Pr\u00e9c\u00e9dente corps c\u00e9leste du m\u00eame type ' +
                         '(plan\u00e8te/lune)',
        txt_sigCelestial:'Suivant corps c\u00e9leste du m\u00eame type (plan\u00e8te/lune)',
        txt_izquierda:'Gauche',
        txt_derecha:'Droite',
        txt_antPag:'Page pr\u00e9c\u00e9dente',
        txt_sigPag:'Page suivante',
        txt_allNaves:'S\u00e9lectionnez tous les navires',
        txt_borrarSel:'Effacer la s\u00e9lection',
        txt_allMens:'S\u00e9lectionner tous les messages visibles',
        txt_borrarMens:'Effacer les messages s\u00e9lectionn\u00e9s',
        txt_priPag:'Premi\u00e8re page',
        txt_ultPag:'Derni\u00e8re page',
        txt_antMens:'Message pr\u00e9c\u00e9dente',
        txt_sigMens:'Message suivant',
        txt_delMens:'Supprimer le message',
        txt_cerrarMens:'Fermer le message',
        txt_arriba:'Jusqu\'\u00e0',
        txt_abajo:'Bas',
        txt_avPag:'PgDn',
        txt_retPag:'PgUp',
        txt_inicio:'Init',
        txt_fin:'Fin',
        txt_mayusc:'Majus',
        txt_borrar:'Supp',
        txt_tecla:'Cl\u00e9s',
        txt_accion:'Action',
        txt_retroceso:'BackSp',
        txt_velocidad:'Vitesse',
        txt_destPlaneta:'Destination plan\u00e8te',
        txt_destLuna:'Destination lune',
        txt_destEscombros:'Champ de d\u00e9bris cible',
        txt_destExpedicion:'Destination coord. 16',
        txt_volver:'Retour \u00e0 la page pr\u00e9c\u00e9dente',
        txt_ogame:'Partout, sauf en quelques pages',
        txt_keyClasif:'Sur la page de classement',
        txt_keySaltoC:'Sur la page de Jumpgate',
        txt_keyMailbox:'Sur bo\u00eete',
        txt_keyMessage:'Sur les messages',
        txt_key1Flota:'Sur la page d\'envoi de la premi\u00e8re flotte',
        txt_key2Flota:'Sur la page d\'exp\u00e9dition deuxi\u00e8me flotte',
        txt_key3Flota:'Sur la page d\'exp\u00e9dition troisi\u00e8me flotte',
        txt_keyFlota:'Sur la page mouvement de la flotte',
        txt_recargar:'Recharger',
        txt_allRecursos:'S\u00e9lectionnez toutes les ressources',
        txt_recInversos:'Des ressources de charge dans l\'ordre inverse',
        txt_maxMetal:'Max/Min M\u00e9tal',
        txt_maxCristal:'Max/Min Cristal',
        txt_maxDuty:'Max/Min Deut\u00e9rium',
        txt_permanecer:'Restent',
        txt_hora:'heure',
        txt_expInfo:'D\u00e9velopper/R\u00e9duire renseignements sur le parc',
        txt_texto:'Texte',
        txt_color:'Couleur',
        txt_espacioLibre:'Espace libre',
        txt_enviar:'Envoyer',
        txt_cancelarViaje:'Annuler la mission??',
        txt_faltaEnergy:'\u00c9nergie restante',
        txt_efficiency:'R\u00e9duction du temps',
        txt_notAvailableCRFriki:'Geek langue n\'est pas disponible',
        txt_recurso: 'Ressource',
        txt_simular: 'Simuler',
        txt_errorTrade: 'Les donn\u00e9es de ressources, ou les ratios ne sont pas valables',
        txt_pranger: 'Pilori',
        txt_defecto: 'Par d\u00e9faut',
        txt_todo: 'Tous les',
        txt_guardado: 'Saved',
        txt_Warehouses: 'Remplissage des entrep\u00f4ts',
        txt_Dens: 'Remplissage des tani\u00e8res souterraines',
        txt_errorMsg: 'Attention, ces textes d\'identifier le type de message',
        txt_links: 'Liens',
        txt_show: 'Voir',
        txt_debris:'D\u00e9bris',
        txt_planet: 'Liste des plan\u00e8tes',
        txt_usarKeys:'Touches de raccourcis',
        txt_habSection: '** Active plus options de configuration',
        txt_errorCR: 'Attention, ces textes d\'identifier les flottes et ' +
                     'les d\u00e9fenses du rapport original',
        txt_emptyFields: 'champs vides',
        txt_ChatXat: 'Xat.com discussion'
  },

  OPTION : {
        txt_showFleetResources: "Montrer ressources des flottes",
        txt_minEscombros: "Taille min. d\u00e9bris",
        txt_disableUselessStuff: "D\u00e9sactiver trucs inutiles",
        txt_showRange: "Montrer port\u00e9e des missiles et Phalanx",
        txt_showResourcesPerFleet: "Voir les ressources pour chaque flotte",
        txt_usarGeneral:'Utilisez des pages communes',
        txt_usarFlota:'Utilisez des pages de la flotte',
        txt_usarMens:'Utilisez des pages de messages',
        txt_usarKeys:'Utilisez les touches de raccourcis',
        txt_fixActionButtons:'Fixer les boutons d\'action',
        txt_highlightPlayers:'Mettez en surbrillance et les joueurs des alliances',
        txt_colorFlightSlots:'Cr\u00e9neaux horaires couleur',
        txt_prangerInHeader:'Pranger en t\u00eate',
        txt_replyCircularMsg:'R\u00e9pondre messages circulaire',
        txt_planetNameInMsg:'Afficher le nom de la plan\u00e8te dans les messages',
        txt_useSmiles:'Smiles',
        txt_chkChat:'Montrer discussion',
        txt_idChat:'Id chat',
        txt_coloredMessages:'Coloriage-t\u00eate du message',
        txt_showMessageButtonLeft:'Bouton Message dans le menu gauche',
        txt_setFocusCorrectly:'R\u00e9glez la mise au point correcte',
        txt_fontColor:'Couleur des caract\u00e8res',
        txt_showPlanetNavKeys:'Les boutons de navigation entre les plan\u00e8tes',
        txt_showMissingSats:'Satellites \u00e0 montrer des r\u00e9sultats positifs',
        txt_resourcesInfo:'D\u00e9tails de la ressource',
        txt_showEmptySpace:'L\'espace libre pour chaque flotte',
        txt_fixForumLink:'Fixer un lien du forum',
        txt_quitarAdv:'Retirez la colonisation avertissement',
        txt_backTransparent:'Transparent fen\u00eatres de configuration',
        txt_scriptCRName:'CR Convertisseur',
        txt_disableStar:'Retirer clin \u00e9toiles',
        txt_coordLinksFix:'Cadre des coordonn\u00e9es li\u00e9es',
        txt_loadButtons:'Charge suppl\u00e9mentaire des boutons',
        txt_optionsInUsername:'oGame options au nom de l\'utilisateur',
        txt_returnFleetQuestion:'Demandez pour le retour de la flotte',
        txt_satGraviton:'Satellites pour Graviton',
        txt_satTerraformer:'Satellites pour Terraformeur',
        txt_confirmTrader:'Attention Marchand',
        txt_showEfficiency:'Voir la r\u00e9duction du temps',
        txt_smallPlanets:'Montrer petites plan\u00e8tes',
        txt_usarCRFriki:'Utiliser le langage Geek',
        txt_moonsToRight:'Lunes \u00e0 la droite',
        txt_showFleetContent: 'Voir la flotte dans les pages de l\'exp\u00e9dition de la flotte',
        txt_showDestPlayerName: 'Voir le nom du joueur de destination',
        txt_useDirectSpy: 'Spy directement \u00e0 partir des mouvements',
        txt_useShortHeader: 'T\u00eate courte',
        txt_showTradeCalculator: 'Commerce calculator',
        txt_showLlenadoAlmacenes: 'Calculer le remplissage des entrep\u00f4ts',
        txt_showProductionRatio: 'Montrer production id\u00e9ale',
        txt_showDailyShipsDefenses: 'Montrer la prod. quotidienne des navires et d\u00e9fenses',
        txt_showTimeShipsDefenses: 'Calculer le temps de fabrication',
        txt_showUniNameInPillory: 'Nom univers dans pilori',
        txt_showDebris: 'Montant',
        txt_showDebrisIcon: 'L\'ic\u00f4ne',
        txt_fixTooltips:'Fixer la largeur des infobulles',
        txt_colorEnergyUsed: 'L\'\u00e9nergie utilis\u00e9e',
        txt_colorResAlmacen: 'Entrep\u00f4t',
        txt_colorResDen: 'Tani\u00e8re souterrain',
        txt_EmptySlot: 'emplacements vides',
        txt_showAutoExpoFleet: 'La s\u00e9lection automatique des exp\u00e9ditions',
        txt_fullPlanet: 'Colorant plan\u00e8te pleine',
        txt_showNoEscape: 'Coloriage de carburant pour \u00e9chapper',
        txt_colorEnough:'Assez',
        txt_colorNotEnough:'Ne suffisent',
        txt_setClockLinks:'Afficher l\'horloge dans la barre des liens',
        txt_linkChat:'Chat\'s link in the bar of the links',
        txt_hideStolenCR: 'Masquer le vol \u00e0 main vide',
        txt_hideDebrisCR: 'Masquer le champ de d\u00e9bris vide'
  },

  CR : {
        txt_De:'des',
        txt_AttWin:'L\'attaquant a gagn\u00e9 la bataille!',
        txt_DefWin: 'Le d\u00e9fenseur a remport\u00e9 la bataille!',
        txt_Empate: 'La bataille s\'est termin\u00e9e par un match nul!',
        txt_lost:'perdus',
        txt_attackers:'Attaquants',
        txt_battleDay:'Bataille jours',
        txt_loses:'Pertes',
        txt_units:'unit\u00e9s',
        txt_defenders:'D\u00e9fenseurs',
        txt_withoutDef:'Sans d\u00e9fenses',
        txt_stolen:'Pillage',
        txt_attFleet:'L\'attaquant de la flotte',
        txt_defFleet:'D\u00e9fenseur de la flotte',
        txt_totLoses:'Pertes totales',
        txt_debris:'D\u00e9bris',
        txt_recys:'Recycleur(s)',
        txt_profit:'Profit',
        txt_attHarvest:'Les attaquants de r\u00e9colte',
        txt_attNoHarvest:'Les attaquants, sans r\u00e9colte',
        txt_defHarvest:'D\u00e9fenseurs de r\u00e9colte',
        txt_farming:'Attaque-agriculture',
        txt_attProfit:'Attaquant lucratif',
        txt_minimal:'MINIMUM COMPACT\u00c9',
        txt_foro:'Forum',
        txt_auto:'Automatique convertisseur de rapport de combat',
        txt_texts:'Textes du rapport de bataille',
        txt_colors:'Couleurs du convertisseur de rapport de combat',
        txt_lossesXRes:'Les pertes pour chaque ressource',
        txt_lostUnits:'Unit\u00e9s perdues',
        txt_titles:'Titres',
        txt_lostShips:'Navires perdus',
        txt_moon:'Lune',
        txt_others:'D\'autres'
  },

  CR_FRIKI : {
        txt_RES_metal: ' ',
        txt_RES_cristal: ' ',
        txt_RES_deuterio: ' ',

        txt_SHIP_LG_sonda: ' ',
        txt_SHIP_LG_satelite: ' ',
        txt_SHIP_LG_npc: ' ',
        txt_SHIP_LG_ngc: ' ',
        txt_SHIP_LG_reciclador: ' ',
        txt_SHIP_LG_cl: ' ',
        txt_SHIP_LG_cp: ' ',
        txt_SHIP_LG_crucero: ' ',
        txt_SHIP_LG_nb: ' ',
        txt_SHIP_LG_acorazado: ' ',
        txt_SHIP_LG_bombardero: ' ',
        txt_SHIP_LG_destructor: ' ',
        txt_SHIP_LG_edlm: ' ',
        txt_SHIP_LG_colonizador: ' ',

        txt_DEFENSE_LG_lanza: ' ',
        txt_DEFENSE_LG_laserp: ' ',
        txt_DEFENSE_LG_laserg: ' ',
        txt_DEFENSE_LG_gauss: ' ',
        txt_DEFENSE_LG_ionico: ' ',
        txt_DEFENSE_LG_plasma: ' ',
        txt_DEFENSE_LG_cupPeque:' ',
        txt_DEFENSE_LG_cupGrande:' ',
        txt_DEFENSE_LG_mInterplanet: ' ',
        txt_DEFENSE_LG_mIntercep: ' ',

        txt_recys:' '
  }
};

window.addEventListener('load',main,true);