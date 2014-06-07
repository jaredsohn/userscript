// <![CDATA[
// ==UserScript==
// @name           Vishnu's YouTube Enhancer
// @fullname       Vishnu's YouTube Enhancer
// @author         Vishnu from Sri SaiNagar, Thuraipakkam, Chennai, India!
// @version        2008-12-14
// @licence        (cc) by-nc
// @namespace      http://userscripts.org/scripts/show/33042
// @description    Download Link + Quality Selector + Rollover Preview + Media Controller
// @include        http://*.youtube.*/*
// @include        http://youtube.*/*
// ==/UserScript==

// fmt=0  -> flv:  320x240 (flv1) / mp3 1.0 22KHz
// fmt=5  -> flv:  320x240 (flv1) / mp3 1.0 22KHz
// fmt=6  -> flv:  480x360 (flv1) / mp3 1.0 44KHz
// fmt=13 -> 3gp:  176x144 (mpg4) / ??? 2.0  8KHz
// fmt=17 -> 3gp:  176x144 (mpg4) / ??? 1.0 22KHz
// fmt=18 -> mp4:  480x360 (H264) / AAC 2.0 44KHz
// fmt=22 -> mp4: 1280x720 (H264) / AAC 2.0 44KHz
// fmt=34 -> flv:  320x180 (flv?) / ??? 2.0 44KHz
// fmt=35 -> flv:  640x380 (flv?) / ??? 2.0 44KHz

// YouTube URL: http://[lang].youtube.com/watch?v=[video_id] &fmt=[selected_fmt]
// YouTube download link: http://[lang].youtube.com/get_video?video_id=[video_id]&t=[t_id]&fmt=[download_fmt]
( function() {
// Constants (Config)
const ROLLOVER_DELAY_INIT = 200; // Initial delay
const ROLLOVER_DELAY_LOAD =  50; // Small delay for testing if all images is loaded
const ROLLOVER_DELAY_CONT = 800; // Normal delay of the rollover

// Constants (Not important)
const WATCH_MORE_FROM    = 'watch-channel-vids-body';     // To add a load event in change_link()
const WATCH_RELATED_VIDS = 'watch-related-vids-body';     // To add a load event in change_link()
const PLAYLIST_PANEL     = 'playlist-panel';              // To add a load event in change_link()
const WATCH_SEARCH_RES   = 'watch_search_results';        // To add a load event in change_link()
const WATCH_PROMOTED     = 'watch-promoted-container';    // Used to remove the parent
const WATCH_QUAL_SETTING = 'watch-video-quality-setting'; // Used to remove it
const DEFAULT_LANG_BOX   = 'default-language-box';        // Used to remove it
const WATCH_URL_FIELD    = 'watch-url-field';             // Add fmt

// Constants (Better to have)
const WATCH_PLAYER_DIV   = 'watch-player-div'; // Used to retrieve the Video Embed if not found
const WATCH_RATINGS_VIEW = 'watch-main-area';  // Used to append the Quality Selector

// Constants (Important)
const WATCH_TITLE_DIV = 'watch-vid-title'; // Div id of the video title
const YT_PLAYER_EMBED = 'movie_player';    // Default Video Embed id


//*************************************** Languages support **********************************************//
function get_text_DL(lang,variable) {
  switch(variable) {
    case "dlink": switch (lang) {
        // from Youtube Setting or Youtube URL (15 Languages actually)
        case "zh-CN": return "&#19979;&#36733;";
        case "zh-TW": return "&#19979;&#36617;";
        case "ja": return "&#12480;&#12454;&#12531;&#12525;&#12540;&#12489;";
        case "ko": return "&#45796;&#50868;&#47196;&#46300;";
        case "de": return "Herunterladen";
        default: // Default is set to English
        case "en": case "en-GB": return "Download";
        case "es": case "es-MX": return "Descargar";
        case "fr": return "T&#233;l&#233;charger";
        case "it": return "Scaricare";
        case "nl": return "Downloaden";
        case "pl": return "Pobra&#263;";
        case "pt": return "Baixar";
        case "ru": return "&#1089;&#1082;&#1072;&#1095;&#1072;&#1090;&#1100;";
        // from Browser Setting...
        case "ar": return "&#1578;&#1581;&#1605;&#1610;&#1604;";
    }
    case "menu": switch (lang) {
        case "zh-CN": return "&#36873;&#39033;";
        case "zh-TW": return "&#36984;&#38917;";
        case "ja": return "&#12458;&#12503;&#12471;&#12519;&#12531;";
        case "ko": return "&#50741;&#49496;";
        case "de": return "Optionen";
        default:
        case "en": case "en-GB": return "Options";
        case "es": case "es-MX": return "Opciones";
        case "fr": return "Options";
        case "it": return "Opzioni";
        case "nl": return "Opties";
        case "pl": return "Opcje";
        case "pt": return "Op&#231;&#245;es";
        case "ru": return "&#1042;&#1072;&#1088;&#1080;&#1072;&#1085;&#1090;&#1086;&#1074;";
        case "ar": return "&#1582;&#1610;&#1575;&#1585;&#1575;&#1578;";
    }
    case "qual1": switch (lang) {
        case "zh-CN": return "1: &#38598;&#19979;&#36733;&#38142;&#25509;&#21040;&#21516;&#19968;&#36136;&#37327;&#30340;&#35270;&#39057;&#35266;&#30475;";
        case "zh-TW": return "1: &#38598;&#19979;&#36617;&#37832;&#25509;&#21040;&#21516;&#19968;&#36074;&#37327;&#30340;&#35222;&#38971;&#35264;&#30475;";
        case "ja": return "1: &#12480;&#12454;&#12531;&#12525;&#12540;&#12489;&#12522;&#12531;&#12463;&#12434;&#35373;&#23450;&#12377;&#12427;&#12398;&#38322;&#35239;&#12289;&#12499;&#12487;&#12458;&#12398;&#21697;&#36074;&#12392;&#21516;&#12376;";
        case "ko": return "1: &#49444;&#51221; &#45796;&#50868;&#47196;&#46300; &#47553;&#53356;&#47484; &#48380; &#48708;&#46356;&#50724;&#51032; &#54408;&#51656;&#51008; &#46041;&#51068;";
        case "de": return "1: Gesetzte Downloadverbindung zur gleichen Qualit&#228;t des gesehenen Videos";
        default:
        case "en": case "en-GB": return "1: Set download link to the same Quality of the viewed video";
        case "es": case "es-MX": return "1: Acoplamiento de la transferencia directa a la misma calidad del v&#237;deo visto";
        case "fr": return "1: Lien de t&#233;l&#233;chargement vers la vid&#233;o de m&#234;me qualit&#233; que celle affich&#233;";
        case "it": return "1: Impostare link per scaricare la stessa qualit&#224; dei video visualizzati";
        case "nl": return "1: Stel download link naar dezelfde kwaliteit van de video bekeken";
        case "pl": return "1: Ustaw link do pobierania takiej samej jako&#347;ci na ogl&#261;dany film wideo";
        case "pt": return "1: Liga&#231;&#227;o ajustada de transfer&#234;ncia &#224; mesma qualidade do v&#237;deo visto";
        case "ru": return "1: &#1059;&#1089;&#1090;&#1072;&#1085;&#1086;&#1074;&#1080;&#1090;&#1100; &#1089;&#1089;&#1099;&#1083;&#1082;&#1091; &#1085;&#1072; &#1090;&#1086;&#1090; &#1078;&#1077; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1072; &#1088;&#1072;&#1089;&#1089;&#1084;&#1072;&#1090;&#1088;&#1080;&#1074;&#1072;&#1077;&#1090;&#1089;&#1103; &#1074;&#1080;&#1076;&#1077;&#1086;";
        case "ar": return "1: &#1578;&#1581;&#1605;&#1610;&#1604; &#1606;&#1601;&#1587; &#1606;&#1608;&#1593;&#1610;&#1577; &#1605;&#1604;&#1601; &#1575;&#1604;&#1601;&#1610;&#1583;&#1610;&#1608; &#1575;&#1604;&#1581;&#1575;&#1604;&#1610;&#1607;";
    }
    case "qual2": switch (lang) {
        case "zh-CN": return "2: &#38598;&#19979;&#36733;&#38142;&#25509;&#21040;&#19968;&#20010;&#39640;&#21697;&#36136;&#30340;&#35270;&#39057;&#25991;&#20214;&#65288;&#30340;FLV&#25110;&#30340;MP4&#65289;";
        case "zh-TW": return "2: &#38598;&#19979;&#36617;&#37832;&#25509;&#21040;&#19968;&#20491;&#39640;&#21697;&#36074;&#30340;&#35222;&#38971;&#25991;&#20214;&#65288;&#30340;FLV&#25110;&#30340;MP4&#65289;";
        case "ja": return "2: &#39640;&#21697;&#36074;&#12398;&#12499;&#12487;&#12458;&#12501;&#12449;&#12452;&#12523;&#65288;FLV&#12398;&#12458;&#12524;&#12468;&#12531;&#12398;MP4&#65289;&#12395;&#35373;&#23450;&#12480;&#12454;&#12531;&#12525;&#12540;&#12489;&#12522;&#12531;&#12463;";
        case "ko": return "2: &#45458;&#51008; &#54408;&#51656;&#51032; &#48708;&#46356;&#50724; &#54028;&#51068; (&#45824;&#54620; FLV &#46608;&#45716;&#45716; MP4)&#47196; &#49444;&#51221; &#45796;&#50868;&#47196;&#46300; &#47553;&#53356;";
        case "de": return "2: Gesetzte Downloadverbindung zu einer videoakte der Qualit&#228;ts (FLV oder MP4)";
        default:
        case "en": case "en-GB": return "2: Set download link to a High Quality video file (FLV or MP4)";
        case "es": case "es-MX": return "2: Acoplamiento de la transferencia directa a un archivo video de la alta calidad (FLV o MP4)";
        case "fr": return "2: Lien de t&#233;l&#233;chargement vers la vid&#233;o en haute qualit&#233; (FLV ou MP4)";
        case "it": return "2: Impostare il download link ad un alta qualit&#224; di file video (FLV o MP4)";
        case "nl": return "2: Stel download link naar een High Quality video bestand (of MP4 FLV)";
        case "pl": return "2: Ustaw link do wysokiej jako&#347;ci plik&#243;w wideo (MP4 lub FLV)";
        case "pt": return "2: Liga&#231;&#227;o ajustada de transfer&#234;ncia a uma lima video da alta qualidade (FLV ou MP4)";

        case "ru": return "2: &#1059;&#1089;&#1090;&#1072;&#1085;&#1086;&#1074;&#1082;&#1072; &#1089;&#1077;&#1090;&#1080; &#1089;&#1074;&#1103;&#1079;&#1080; &#1089; &#1074;&#1099;&#1089;&#1086;&#1082;&#1080;&#1084; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086;&#1084; &#1074;&#1080;&#1076;&#1077;&#1086; &#1092;&#1072;&#1081;&#1083;&#1086;&#1074; (FLV &#1080;&#1083;&#1080; MP4)";
        case "ar": return "2: &#1578;&#1581;&#1605;&#1610;&#1604; &#1580;&#1608;&#1583;&#1577; &#1593;&#1575;&#1604;&#1610;&#1577; &#1604;&#1605;&#1604;&#1601; &#1575;&#1604;&#1601;&#1610;&#1583;&#1610;&#1608; &#1576;&#1589;&#1610;&#1594;&#1577; (FLV &#1571;&#1608; MP4)";
    }
    case "qual3": switch (lang) {
        case "zh-CN": return "3: &#38598;&#19979;&#36733;&#38142;&#25509;&#21040;&#19968;&#20010;&#39640;&#21697;&#36136;&#30340;MP4&#35270;&#39057;&#25991;&#20214;";
        case "zh-TW": return "3: &#38598;&#19979;&#36617;&#37832;&#25509;&#21040;&#19968;&#20491;&#39640;&#21697;&#36074;&#30340;MP4&#35222;&#38971;&#25991;&#20214;";
        case "ja": return "3: &#12399;&#12289;&#39640;&#21697;&#36074;&#12398;&#12499;&#12487;&#12458;&#12434;&#35373;&#23450;&#12377;&#12427;&#12398;MP4&#12501;&#12449;&#12452;&#12523;&#12398;&#12480;&#12454;&#12531;&#12525;&#12540;&#12489;&#12522;&#12531;&#12463;";
        case "ko": return "3: a&#45716; MP4 &#44256;&#54408;&#51656; &#46041;&#50689;&#49345;&#51004;&#47196; &#49444;&#51221; &#54028;&#51068; &#45796;&#50868;&#47196;&#46300; &#47553;&#53356;";
        case "de": return "3: Gesetzte Downloadverbindung zu einer videoakte der Qualit&#228;ts MP4";
        default:
        case "en": case "en-GB": return "3: Set download link to a MP4 High Quality video file";
        case "es": case "es-MX": return "3: Acoplamiento de la transferencia directa a un archivo video de la alta calidad MP4";
        case "fr": return "3: Lien de t&#233;l&#233;chargement vers la vid&#233;o en MP4 de haute qualit&#233;";
        case "it": return "3: Impostare il download link a un MP4 alta qualit&#224; di file video";
        case "nl": return "3: Stel download link naar een MP4 High Quality video bestand";
        case "pl": return "3: Ustaw link do pobrania MP4 wysokiej jako&#347;ci plik&#243;w wideo";
        case "pt": return "3: Liga&#231;&#227;o ajustada de transfer&#234;ncia a uma lima video da alta qualidade MP4";
        case "ru": return "3: &#1059;&#1089;&#1090;&#1072;&#1085;&#1086;&#1074;&#1080;&#1090;&#1100; &#1089;&#1089;&#1099;&#1083;&#1082;&#1091; &#1085;&#1072; MP4 &#1074;&#1099;&#1089;&#1086;&#1082;&#1086;&#1075;&#1086; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1072; &#1074;&#1080;&#1076;&#1077;&#1086;-&#1092;&#1072;&#1081;&#1083;";
        case "ar": return "3: &#1578;&#1581;&#1605;&#1610;&#1604; &#1575;&#1604;&#1605;&#1604;&#1601; &#1576;&#1580;&#1608;&#1583;&#1577; &#1593;&#1575;&#1604;&#1610;&#1577; &#1576;&#1589;&#1610;&#1594;&#1577; MP4";
    }
    case "auto1": switch (lang) {
        case "zh-CN": return "1: &#25163;&#20876;";
        case "zh-TW": return "1: &#25163;&#20874;";
        case "ja": return "1: &#12510;&#12491;&#12517;&#12450;&#12523;";
        case "ko": return "1: &#47588;&#45684;&#50620;";
        case "de": return "1: Manueller Start";
        default:
        case "en": case "en-GB": return "1: Set Autoplay to OFF";
        case "es": case "es-MX": return "1: Comienzo manual";
        case "fr": return "1: D&#233;marrage manuel";
        case "it": return "1: Avviamento manuale";
        case "nl": return "1: Zet autoplay uit";
        case "pl": return "1: Podr&#281;cznik";
        case "pt": return "1: Arranque manual";
        case "ru": return "1: &#1056;&#1091;&#1082;&#1086;&#1074;&#1086;&#1076;&#1089;&#1090;&#1074;&#1086;";
        case "ar": return "1: &#1578;&#1588;&#1594;&#1610;&#1604; &#1578;&#1604;&#1602;&#1575;&#1574;&#1610; &#1610;&#1593;&#1605;&#1604;";
    }
    case "auto2": switch (lang) {
        default:
        case "en": case "en-GB": return "2: Set Autoplay to Buffering";
        case "fr": return "2: Mise en buffer";
    }
    case "auto3": switch (lang) {
        case "zh-CN": return "3: &#33258;&#21160;";
        case "zh-TW": return "3: &#33258;&#21205;";
        case "ja": return "3: &#33258;&#21205;&#36215;&#21205;";
        case "ko": return "3: &#51088;&#46041;";
        case "de": return "3: Automatischer Start";
        default:
        case "en": case "en-GB": return "3: Set Autoplay to ON";
        case "es": case "es-MX": return "3: Comienzo autom&#225;tico";
        case "fr": return "3: D&#233;marrage automatique";
        case "it": return "3: Avviamento automatico";
        case "nl": return "3: Zet autoplay aan";
        case "pl": return "3: automatyczne rozpocz&#281;cie";
        case "pt": return "3: Arranque autom&#225;tico";
        case "ru": return "3: &#1040;&#1074;&#1090;&#1086;&#1084;&#1072;&#1090;&#1080;&#1095;&#1077;&#1089;&#1082;&#1080;&#1081; &#1087;&#1091;&#1089;&#1082;";
        case "ar": return "3: &#1578;&#1588;&#1594;&#1610;&#1604; &#1578;&#1604;&#1602;&#1575;&#1574;&#1610; &#1604;&#1575;&#1610;&#1593;&#1605;&#1604;";
    }
  }
  return "";
}
function get_text_QS(lang,variable) {
  switch(variable) {
    case "link1": switch (lang) {
        case "zh-CN": return "&#26597;&#30475;&#20302;&#36136;&#37327; (flv)";
        case "zh-TW": return "&#26597;&#30475;&#20302;&#36074;&#37327; (flv)";
        case "ja": return "&#23550;&#35937;&#20302;&#21697;&#36074; (flv)";
        case "ko": return "&#51200;&#44032;&#50640; &#54408;&#51656;&#48372;&#44592; (flv)";
        case "de": return "Ansicht in niedrige Qualit&#228;t (flv)";
        default:
        case "en": case "en-GB": return "View in Low Quality (flv)";
        case "es": case "es-MX": return "Visi&#243;n en la baja calidad (flv)";
        case "fr": return "Voir en Basse Qualit&#233; (flv)";
        case "it": return "Visualizza in bassa qualit&#224; (flv)";
        case "nl": return "Bekijk in lage kwaliteit (flv)";
        case "pl": return "Widok w niskiej jako&#347;ci (flv)";
        case "pt": return "Vista na m&#225; qualidade (flv)";
        case "ru": return "&#1055;&#1086;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1089; &#1085;&#1080;&#1079;&#1082;&#1080;&#1084; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086;&#1084; (flv)";
        case "ar": return "&#1593;&#1585;&#1590; &#1580;&#1608;&#1583;&#1577; &#1605;&#1606;&#1582;&#1601;&#1590;&#1577; (flv)";
    }
    case "link2": switch (lang) {
        case "zh-CN": return "&#35266;&#39640;&#21697;&#36136; (flv)";
        case "zh-TW": return "&#35264;&#39640;&#21697;&#36074; (flv)";
        case "ja": return "&#39640;&#21697;&#36074;&#34920;&#31034; (flv)";
        case "ko": return "&#48372;&#44592;&#50640; &#54408;&#51656; &#45458;&#51008; (flv)";
        case "de": return "Ansicht in hoher Qualit&#228;t (flv)";
        default:
        case "en": case "en-GB": return "View in High Quality (flv)";
        case "es": case "es-MX": return "Visi&#243;n en la alta calidad (flv)";
        case "fr": return "Voir en Haute Qualit&#233; (flv)";
        case "it": return "Visualizza in alta qualit&#224; (flv)";
        case "nl": return "Bekijk in hoge kwaliteit (flv)";
        case "pl": return "Widok w wysokiej jako&#347;ci (flv)";
        case "pt": return "Vista na alta qualidade (flv)";
        case "ru": return "&#1055;&#1086;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1089; &#1074;&#1099;&#1089;&#1086;&#1082;&#1080;&#1084; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086;&#1084; (flv))";
        case "ar": return "&#1593;&#1585;&#1590; &#1580;&#1608;&#1583;&#1577; &#1593;&#1575;&#1604;&#1610;&#1607; (flv)";
    }
    case "link3": switch (lang) {
        case "zh-CN": return "&#35266;&#39640;&#21697;&#36136; (mp4)";
        case "zh-TW": return "&#35264;&#39640;&#21697;&#36074; (mp4)";
        case "ja": return "&#39640;&#21697;&#36074;&#34920;&#31034; (mp4)";
        case "ko": return "&#48372;&#44592;&#50640; &#54408;&#51656; &#45458;&#51008; (mp4)";
        case "de": return "Ansicht in hoher Qualit&#228;t (mp4)";
        default:
        case "en": case "en-GB": return "View in High Quality (mp4)";
        case "es": case "es-MX": return "Visi&#243;n en la alta calidad (mp4)";
        case "fr": return "Voir en Haute Qualit&#233; (mp4)";
        case "it": return "Visualizza in alta qualit&#224; (mp4)";
        case "nl": return "Bekijk in hoge kwaliteit (mp4)";
        case "pl": return "Widok w wysokiej jako&#347;ci (mp4)";
        case "pt": return "Vista na alta qualidade (mp4)";
        case "ru": return "&#1055;&#1086;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1089; &#1074;&#1099;&#1089;&#1086;&#1082;&#1080;&#1084; &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1086;&#1084; (mp4)";
        case "ar": return "&#1593;&#1585;&#1590; &#1580;&#1608;&#1583;&#1577; &#1593;&#1575;&#1604;&#1610;&#1607; (mp4)";
    }
    case "link4": switch (lang) {
        case "zh-CN": return "&#26816;&#35270;HD&#36136;&#37327; (mp4)";
        case "zh-TW": return "&#27298;&#35222;HD&#36074;&#37327; (mp4)";
        case "ja": return "HD&#12391;&#12398;&#34920;&#31034;&#21697;&#36074; (mp4)";
        case "ko": return "HD&#50640;&#49436; &#54408;&#51656; &#54217;&#44032;&#48372;&#44592; (mp4)";
        case "de": return "Ansicht in HD-Qualit&#228;t (mp4)";
        default:
        case "en": case "en-GB": return "View in HD Quality (mp4)";
        case "es": case "es-MX": return "Visi&#243;n en la HD calidad (mp4)";
        case "fr": return "Voir en Qualit&#233; HD (mp4)";
        case "it": return "Visualizza in qualit&#224; HD (mp4)";
        case "nl": return "Bekijk in HD kwaliteit (mp4)";
        case "pl": return "Wy&#347;wietl w jako&#347;ci HD (mp4)";
        case "pt": return "Ver na qualidade HD (mp4)";
        case "ru": return "&#1055;&#1086;&#1089;&#1084;&#1086;&#1090;&#1088;&#1077;&#1090;&#1100; &#1074; HD &#1082;&#1072;&#1095;&#1077;&#1089;&#1090;&#1074;&#1072; (mp4)";
        case "ar": return "&#1585;&#1571;&#1610; &#1601;&#1610; &#1606;&#1608;&#1593;&#1610;&#1577; HD (mp4)"
    }
  }
  return "";
}
function get_text_MC(lang,variable) {
  switch(variable) {
    case "stepback": switch (lang) {
        case "zh-CN": return "&#36864;&#21518;&#19968;&#27493;";
        case "zh-TW": return "&#36864;&#24460;&#19968;&#27493;";
        case "ja": return "&#24460;&#36864;";
        case "ko": return "&#46244;&#47196; &#47932;&#47084;&#49436;";
        case "de": return "Schritt zur&#252;ck";
        default:
        case "en": case "en-GB": return "Step back";
        case "es": case "es-MX": return "Paso atr&#225;s";
        case "fr": return "Pas arri&#232;re";
        case "it": return "Passo indietro";
        case "nl": return "Stap terug";
        case "pl": return "Krok wstecz";
        case "pt": return "Passo para tr&#225;s";
        case "ru": return "&#1096;&#1072;&#1075; &#1085;&#1072;&#1079;&#1072;&#1076;";
        case "ar": return "&#1582;&#1591;&#1608;&#1577; &#1573;&#1604;&#1609; &#1575;&#1604;&#1608;&#1585;&#1575;&#1569;";
    }
    case "stop": switch (lang) {
        case "zh-CN": return "&#20572;&#27490;";
        case "zh-TW": return "&#20572;&#27490;";
        case "ja": return "&#20572;&#27490;&#12377;&#12427;";
        case "ko": return "&#47688;&#52628;&#45796;";
        case "de": return "Erlass";
        default:
        case "en": case "en-GB": return "Stop";
        case "es": case "es-MX": return "Paro";
        case "fr": return "Arr&#234;t";
        case "it": return "Arresto";
        case "nl": return "Stop";
        case "pl": return "Zatrzyma&#263;";
        case "pt": return "Ac&#243;rd&#227;o";
        case "ru": return "&#1054;&#1089;&#1090;&#1072;&#1085;&#1086;&#1074;&#1082;&#1072;";
        case "ar": return "&#1578;&#1608;&#1602;&#1601;";
    }
    case "step": switch (lang) {
        case "zh-CN": return "&#21521;&#21069;&#36808;&#20986;&#30340;&#19968;&#27493;";
        case "zh-TW": return "&#21521;&#21069;&#36993;&#20986;&#30340;&#19968;&#27493;";
        case "ja": return "&#19968;&#27497;&#21069;&#36914;";
        case "ko": return "&#50526;&#51004;&#47196;";
        case "de": return "Schritt nach vorn";
        default:
        case "en": case "en-GB": return "Step forward";
        case "es": case "es-MX": return "Paso adelante";
        case "fr": return "Pas avant";
        case "it": return "Passo in avanti";
        case "nl": return "Stap voorwaarts";
        case "pl": return "Krok naprz&#243;d";
        case "pt": return "Passo em frente";
        case "ru": return "&#1096;&#1072;&#1075; &#1074;&#1087;&#1077;&#1088;&#1077;&#1076;";
        case "ar": return "&#1582;&#1591;&#1608;&#1577; &#1573;&#1604;&#1609; &#1575;&#1604;&#1571;&#1605;&#1575;&#1605;";
    }
    case "play": switch (lang) {
        case "zh-CN": return "&#35835; / &#37325;&#26032;&#21551;&#21160;";
        case "zh-TW": return "&#35712; / &#37325;&#26032;&#21855;&#21205;";
        case "ja": return "&#35501;&#21462;&#12426; / &#20877;&#36215;&#21205;";
        case "ko": return "&#51069;&#44592; / &#45796;&#49884; &#49884;&#51089;";
        case "de": return "Lesen / ankurbeln";
        default:
        case "en": case "en-GB": return "Play / Revive";
        case "es": case "es-MX": return "Leer / Reactivar";
        case "fr": return "Lire / Relancer";
        case "it": return "Giochi / Faccia rivivere";
        case "nl": return "Lees / Restart";
        case "pl": return "Odczyt / Uruchom";
        case "pt": return "Ler / relan&#231;ar";
        case "ru": return "&#1055;&#1088;&#1086;&#1095;&#1080;&#1090;&#1072;&#1090;&#1100; / &#1055;&#1077;&#1088;&#1077;&#1079;&#1072;&#1075;&#1088;&#1091;&#1079;&#1082;&#1072;";
        case "ar": return "&#1578;&#1588;&#1594;&#1610;&#1604; / &#1575;&#1587;&#1578;&#1574;&#1606;&#1575;&#1601;";
    }
    case "pause": switch (lang) {
        case "zh-CN": return "&#20241;&#24687;";
        case "zh-TW": return "&#20241;&#24687;";
        case "ja": return "&#22730;&#12377;";
        case "ko": return "&#55092;&#49885;";
        case "de": return "Pause";
        default:
        case "en": case "en-GB": return "Pause";
        case "es": case "es-MX": return "Pausa";
        case "fr": return "Pause";
        case "it": return "Pausa";
        case "nl": return "Pauze";
        case "pl": return "Z&#322;ama&#263;";
        case "pt": return "Pausa";
        case "ru": return "&#1055;&#1077;&#1088;&#1077;&#1088;&#1099;&#1074;";
        case "ar": return "&#1575;&#1610;&#1602;&#1575;&#1601; &#1605;&#1572;&#1602;&#1578;";
    }
    case "begin": switch (lang) {
        case "zh-CN": return "&#24320;&#22987;";
        case "zh-TW": return "&#38283;&#22987;";
        case "ja": return "&#38283;&#22987;&#12377;&#12427;";
        case "ko": return "&#49884;&#51089;";
        case "de": return "Beginn";
        default:
        case "en": case "en-GB": return "Begin";
        case "es": case "es-MX": return "Comience";
        case "fr": return "D&#233;but";
        case "it": return "Cominci";
        case "nl": return "Beginnen";
        case "pl": return "Zacz&#261;&#263;";
        case "pt": return "Comece";
        case "ru": return "&#1053;&#1072;&#1095;&#1072;&#1090;&#1100;";
        case "ar": return "&#1610;&#1576;&#1583;&#1571;";
    }
    case "loop": switch (lang) {
        case "zh-CN": return "&#29615;";
        case "zh-TW": return "&#29872;";
        case "ja": return "&#12523;&#12540;&#12503;";
        case "ko": return "&#47336;&#54532;";
        case "de": return "Schleife";
        default:
        case "en": case "en-GB": return "Loop";
        case "es": case "es-MX": return "Lazo";
        case "fr": return "En boucle";
        case "it": return "Ciclo";
        case "nl": return "Loop";
        case "pl": return "P&#281;tla";
        case "pt": return "La&#231;o";
        case "ru": return "&#1055;&#1077;&#1090;&#1083;&#1103;";
        case "ar": return "&#1575;&#1604;&#1578;&#1601;&#1575;&#1601;";
    }
    case "rewind": switch (lang) {
        case "zh-CN": return "&#20498;&#24102;";
        case "zh-TW": return "&#20498;&#24118;";
        case "ja": return "&#24059;&#12365;&#25147;&#12375;";
        case "ko": return "&#46104;&#44048;&#44592;";
        case "de": return "R&#252;ckspulen";
        default:
        case "en": case "en-GB": return "Rewind";
        case "es": case "es-MX": return "Rebobinado";
        case "fr": return "Retour arri&#232;re";
        case "it": return "Riavvolgere";
        case "nl": return "Rewind";
        case "pl": return "Rewind";
        case "pt": return "Rebobina&#231;&#227;o";
        case "ru": return "&#1055;&#1077;&#1088;&#1077;&#1084;&#1086;&#1090;&#1082;&#1072;";
        case "ar": return "&#1585;&#1580;&#1608;&#1593;";
    }
    case "end": switch (lang) {
        case "zh-CN": return "&#23436;";
        case "zh-TW": return "&#23436;";
        case "ja": return "&#32066;&#12431;&#12426;";
        case "ko": return "&#45149;";
        case "de": return "Ende";
        default:
        case "en": case "en-GB": return "End";
        case "es": case "es-MX": return "Final";
        case "fr": return "Fin";
        case "it": return "Fine";
        case "nl": return "Eindigen";
        case "pl": return "Koniec";
        case "pt": return "Fim";
        case "ru": return "&#1050;&#1086;&#1085;&#1077;&#1094;";
        case "ar": return "&#1575;&#1604;&#1606;&#1607;&#1575;&#1610;&#1577;";
    }
    case "kill": switch (lang) {
        case "zh-CN": return "&#21452;&#20987;&#26432;&#23475;&#32593;&#27969;&#21644;&#25773;&#25918;&#22120;";
        case "zh-TW": return "&#38617;&#25802;&#27578;&#23475;&#32178;&#27969;&#21644;&#25773;&#25918;&#22120;";
        case "ja": return "&#12480;&#12502;&#12523;&#12463;&#12522;&#12483;&#12463;&#12377;&#12427;&#12392;&#12289; NetStream&#12392;&#12399;&#12289;&#12503;&#12524;&#12540;&#12516;&#12540;&#12434;&#27578;&#12377;&#12383;&#12417;&#12395;";
        case "ko": return "NetStream&#51012; &#45908;&#48660; &#53364;&#47533;&#54616;&#44256; &#54540;&#47112;&#51060;&#50612;&#47484; &#51453;&#51060;&#44256;";
        case "de": return "Doppeltes Klicken, zum des NetStream und des Spielers zu t&#246;ten";
        default:
        case "en": case "en-GB": return "Double click to kill the NetStream and the player";
        case "es": case "es-MX": return "Tecleo doble para matar el NetStream y al jugador";
        case "fr": return "Double click pour stopper le NetStream et le lecteur Vid&#233;o";
        case "it": return "Fare doppio clic su di uccidere il NetStream e il giocatore";
        case "nl": return "Dubbelklik tot de dood van de NetStream en de speler";
        case "pl": return "Dwukrotnie kliknij, aby zabi&#263; NetStream i odtwarzacz";
        case "pt": return "Clique dobro para matar o NetStream e o jogador";
        case "ru": return "&#1044;&#1074;&#1072;&#1078;&#1076;&#1099; &#1097;&#1077;&#1083;&#1082;&#1085;&#1080;&#1090;&#1077; &#1091;&#1073;&#1080;&#1090;&#1100; NetStream &#1080; &#1080;&#1075;&#1088;&#1086;&#1082;";
        case "ar": return "&#1575;&#1606;&#1602;&#1585; &#1606;&#1602;&#1585;&#1607; &#1605;&#1586;&#1583;&#1608;&#1580;&#1607; &#1604;&#1575;&#1610;&#1602;&#1575;&#1601; &#1575;&#1604;&#1593;&#1585;&#1590;";
    }
    case "embed": switch (lang) {
        case "zh-CN": return "Embed &#38142;&#25509;";
        case "zh-TW": return "Embed &#37832;&#25509;";
        case "ja": return "Embed &#12522;&#12531;&#12463;";
        case "ko": return "Embed &#47553;&#53356;";
        case "de": return "Embed Verbindung";
        default:
        case "en": case "en-GB": return "Embed Link";
        case "es": case "es-MX": return "Acoplamiento de Embed";
        case "fr": return "Lien Embed";
        case "it": return "Collegamento di Embed";
        case "nl": return "Embed Koppelen";
        case "pl": return "Embed &#321;&#261;cze";
        case "pt": return "Ligação de Embed";
        case "ru": return "Embed &#1057;&#1089;&#1099;&#1083;&#1082;&#1072;";
        case "ar": return "&#1601;&#1578;&#1581; &#1601;&#1610; &#1604;&#1587;&#1575;&#1606; &#1580;&#1583;&#1610;&#1583;";
    }
    case "fscr": switch (lang) {
        case "zh-CN": return "&#20840;&#23631;&#38142;&#25509;";
        case "zh-TW": return "&#20840;&#23631;&#37832;&#25509;";
        case "ja": return "&#12501;&#12523;&#12473;&#12463;&#12522;&#12540;&#12531;&#12398;&#12522;&#12531;&#12463;";
        case "ko": return "&#51204;&#52404; &#47553;&#53356;";
        case "de": return "Auf dem ganzen Bildschirmverbindung";
        default:
        case "en": case "en-GB": return "Fullscreen Link";
        case "es": case "es-MX": return "Acoplamiento de plena pantalla";
        case "fr": return "Lien plein &#233;cran";
        case "it": return "Collegamento a schermo pieno";
        case "nl": return "Fullscreen Link";
        case "pl": return "Link do fullscreen";
        case "pt": return "Liga&#231;&#227;o da tela cheia";
        case "ru": return "Fullscreen &#1089;&#1089;&#1099;&#1083;&#1082;&#1072;";
        case "ar": return "&#1605;&#1604;&#1569; &#1575;&#1604;&#1588;&#1575;&#1588;&#1577;";
    }
  }
  return "";
}


//***************************************** Page settings ************************************************//
// Get youtube locale (for languages support)
function get_page_lang() {
  //== Use Mozilla browser language when youtube don't support it...
  var lang=String.substr(window.navigator.language,0,2);
  if(lang=="ar") { return lang; } // Arabic (ar)

  //== via watch page
  var language=unsafeWindow.ytLocale;
  if(isDefined(language)) {
    language=language.replace(/_/,"-");
    var languages=unsafeWindow.gUILanguages;
    if(isDefined(languages)) {
      var languages_nb=languages.length;
      for(h=0;h<languages_nb;h++) {
        if(languages[h][0]==language) {
          var lang=languages[h][0];
          GM_setValue("Youtube_Download_Locale_Setting",lang);
          return lang;
        }
      }
      language=String.substr(language,0,2);
      for(h=0;h<languages_nb;h++) {
        if(languages[h][0]==language) {
          var lang=languages[h][0];
          GM_setValue("Youtube_Download_Locale_Setting",lang);
          return lang;
        }
      }
    }
  }
  //== via hostname ?
  /*var language=window.location.host.match(/^(\w+?)\.youtube\.\w+$/i);
  if(language!=null) { lang=language[1].toLowerCase(); return lang; }*/
  //== via old watch page setting
  lang=GM_getValue("Youtube_Download_Locale_Setting","www");
  return lang;
}

function get_page_fmt() {
  var selected_fmt=window.location.search.match(/[?&]fmt=(\d*)/i);
  if(selected_fmt==null) { selected_fmt=0; } else { selected_fmt=selected_fmt[1]; }
  if(!(isPositiveInteger(selected_fmt))) { selected_fmt=0; }
  return(selected_fmt);
}


function check_on_youtube() {
  if(window.location.host.match(/^\w+?\.youtube\.\w+$/i)) { return 1; }
  return 0;
}
function check_on_watchpage() {
  if(window.location.pathname.match(/^\/watch$/i)) { return 1; }
  return 0;
}
function check_on_youtubewatchpage() {
  return check_on_youtube() && check_on_watchpage();
}

//************************************************************
//***** Download Link ****************************************
//************************************************************
function clean_filename(filename) {
  // Clean filename (UNICODE Method)
  //filename = filename.replace(/\ /g,String.fromCharCode(65279));
  filename = filename.replace(/\:/g,String.fromCharCode(65306));
  filename = filename.replace(/\\/g,String.fromCharCode(65340));
  filename = filename.replace(/\//g,String.fromCharCode(65295));
  filename = filename.replace(/\</g,String.fromCharCode(65308));
  filename = filename.replace(/\>/g,String.fromCharCode(65310));
  filename = filename.replace(/\*/g,String.fromCharCode(65290));
  filename = filename.replace(/\?/g,String.fromCharCode(65311));
  filename = filename.replace(/\"/g,String.fromCharCode(65282));
  filename = filename.replace(/\|/g,String.fromCharCode(65372));
  // Clean filename (Underline Method)
  //filename = filename.replace(/[\:\\\/\<\>\?\*\"\|]/g, "_");
  return filename;
}

function add_ext(filename,fmt) {
  if(fmt==13 || fmt==17) { return(filename+".3gp"); }
  if(fmt==18 || fmt==22) { return(filename+".mp4"); }
  return(filename+".flv");
}

function url_fmt(fmt) {
  if(fmt==0) { return(""); }
  return("&fmt="+fmt);
}

function get_dl_fmt(fmt,fmt_map,quality_setting) {
  var wide=(unsafeWindow.isWidescreen==true);
  var dl_fmt=fmt;
  if(fmt_map=='') { fmt_map=0; }
  switch(quality_setting) {
    case 1:
      if(fmt_map==0) { dl_fmt=0; } // If no fmt_map, then the displayed video is LQ-FLV1
      break;
    case 2:
      dl_fmt=fmt_map; // Set the quality to the one detected in the fmt_map 
      break;
    case 3:
      dl_fmt=18; // Default -> Set HQ-MPG4
      if(fmt_map==22) { dl_fmt=22; } // HD-MPG4 detected in the fmt_map -> Set HD-MPG4
      if((fmt!=18) && (fmt_map>0) && (wide)) { dl_fmt=22; } // Wide with fmt_map -> Set HD-MPG4
      if((fmt==22) && (fmt_map==0)) { dl_fmt=18; } // No HD-MPG4 -> Set HQ-MPG4
      if((fmt==18) && (fmt_map==0)) { dl_fmt= 6; } // No HQ-MPG4 -> Set HQ-FLV1
      break;
  }
  return dl_fmt;
}

function add_dl_qual_links(page_lang, selected_fmt) {
  var wvt = document.getElementById(WATCH_TITLE_DIV);
  if(!(wvt)) { show_alert('Download Link Disabled : "'+WATCH_TITLE_DIV+'" not found'); return; }
  var playerEmbed = document.getElementById(YT_PLAYER_EMBED);
  var flashvars='';
  if(playerEmbed) { // Get flashvars from the embed video
    flashvars = playerEmbed.getAttribute('flashvars');
  } else { // Get flashvars from the fullscreen link
    flashvars = get_fullscreenURL();
  }
  if(!flashvars) { show_alert('Download Link Disabled : "flashvars" not found'); return; }

  var Options_title = HtmlUnicodeDecode(get_text_DL(page_lang,"menu"));

  var t_id      = flashvars.match(/\&t=([^(\&|$)]*)/i)[1];
  var video_id  = flashvars.match(/video_id=([^(\&|$)]*)/i)[1];
  var video_url = window.location.protocol+'//'+window.location.host+'/get_video?video_id='+video_id+'&t='+t_id;

  // Retrieve fmt
  var fmt_map      = flashvars.match(/fmt_map\=(\d*)/i);
  var download_fmt = get_dl_fmt(selected_fmt,fmt_map[1],GM_getValue("Youtube_Download_Quality_Setting",2));

  // === Add the download link and the filename ready to copy
  // Retrieve filename
  var filename = clean_filename(wvt.getElementsByTagName("*")[0].textContent);
  if(filename.length<1) {filename="video";}

  // Insert the new element code
  var newElement = document.createElement('div');
  newElement.setAttribute('style','margin:6px 0 6px 0;');
  var newElement1 = document.createElement('div');
  newElement1.setAttribute('style','position:absolute;');
  newElement.appendChild(newElement1);
  var newElement2 = document.createElement('table');
  newElement2.setAttribute('class','vListBox');
  newElement2.setAttribute('style','width:100%; padding:0;');
  var newElement2tr = document.createElement('tr');
  var newElement2td1 = document.createElement('td');
  newElement2td1.setAttribute('style','width:18px; padding-left:2px;');
  newElement2td1.setAttribute('lang','fr');
  var newElement2td1Div = document.createElement('div');
  newElement2td1Div.setAttribute('title',Options_title);
  newElement2td1Div.setAttribute('style','line-height:18px;font-size:18px;cursor:pointer; color:#6666FF !important; background:#F8E0E0 !important; border: 1px solid #DDDDDD !important; margin:-2px;');
  newElement2td1Div.textContent=String.fromCharCode(10070);
  user_select(newElement2td1,'none');
  newElement2td1.appendChild(newElement2td1Div);
  newElement2tr.appendChild(newElement2td1);
  var newElement2td2 = document.createElement('td');
  newElement2td2.setAttribute('style','width:auto; padding:0 3px 0 5px; white-space:nowrap;');
  var newElement2td2A = document.createElement('a');
  newElement2td2A.setAttribute('target','_blank');
  newElement2td2A.setAttribute('class','hLink');
  newElement2td2A.setAttribute('title',filename);
  newElement2td2A.setAttribute('href',video_url+url_fmt(download_fmt));
  newElement2td2A.textContent=HtmlUnicodeDecode(get_text_DL(page_lang,"dlink"));
  newElement2td2.appendChild(newElement2td2A);
  user_select(newElement2td2,'none');
  newElement2tr.appendChild(newElement2td2);
  var newElement2td3 = document.createElement('td');
  newElement2td3.setAttribute('style','width:100%;');
  var newElement2td3Div = document.createElement('div');
  var newElement2td3Input = document.createElement('input');
  newElement2td3Input.setAttribute('style','border:0; width:500px; background:inherit !important; color:inherit !important;');
  newElement2td3Input.setAttribute('type','text');
  newElement2td3Input.setAttribute('readonly','readonly');
  newElement2td3Input.setAttribute('onClick','this.focus();this.select();');
  newElement2td3Input.setAttribute('value',add_ext(filename,download_fmt));
  //user_select(newElement2td3Input,'all');
  newElement2td3Div.appendChild(newElement2td3Input);
  newElement2td3.appendChild(newElement2td3Div);
  newElement2tr.appendChild(newElement2td3);
  newElement2.appendChild(newElement2tr);
  newElement.appendChild(newElement2);
  wvt.parentNode.insertBefore(newElement, wvt);
  // Resize the inputbox
  newElement2td3Input.style.width=newElement2td3Input.parentNode.clientWidth+"px";

  return Array(newElement1,newElement2td1);
}

function set_quality(quality, download_link_table, selected_fmt) {
  // Set new quality value
  GM_setValue("Youtube_Download_Quality_Setting",quality);

  // Retrieve fmt
  var download_fmt=0;
  var playerEmbed = document.getElementById(YT_PLAYER_EMBED);
  var flashvars='';
  if(playerEmbed) { // Get flashvars from the embed video
    flashvars = playerEmbed.getAttribute('flashvars');
  } else { // Get flashvars from the fullscreen link
    flashvars = get_fullscreenURL();
  }
  if(flashvars) {
    var fmt_map  = flashvars.match(/fmt_map\=(\d*)/i);
    download_fmt = get_dl_fmt(selected_fmt,fmt_map[1],quality);
  }

  // Change download link
  var linkdl = download_link_table.getElementsByTagName('a')[0];
  if (linkdl) {
    var linktext = linkdl.href.replace(/(\&?fmt\=\d+)/gi,"");
    linkdl.href=linktext+url_fmt(download_fmt);
  }

  // Change filename
  var YDF = download_link_table.getElementsByTagName('input')[0];
  if (YDF) {
    var filename= YDF.value.match(/^(.*)\.[\w\d]{3,4}$/);
    if(filename!=null) { YDF.value=add_ext(filename[1],download_fmt); }
  }
}

function menu_quality(quality_menu, quality) {
  // Change the position of the ">" in the menu box and close it
  if(quality_menu) {
    var div_Elem=quality_menu.getElementsByTagName("div");
    div_Elem[0].style.visibility="hidden";
    div_Elem[1].style.visibility="hidden";
    div_Elem[2].style.visibility="hidden";
    div_Elem[quality-1].style.visibility="visible";
  }
}

function menu_autoplay(autoplay_menu, select) {
  // Change the position of the ">" in the menu box and close it
  if(autoplay_menu) {
    var div_Elem=autoplay_menu.getElementsByTagName("div");
    div_Elem[0].style.visibility="hidden";
    div_Elem[1].style.visibility="hidden";
    div_Elem[2].style.visibility="hidden";
    div_Elem[select].style.visibility="visible";
  }
}

function event_setQuality(quality_select, selected_fmt) {
  var quality=quality_select.value;
  var quality_menu=quality_select.parentNode;
  switch (quality) {
    case 1: case 2: case 3:
      menu_quality(quality_menu, quality);
      set_quality(quality, quality_menu.parentNode.parentNode.nextSibling, selected_fmt);
      quality_menu.parentNode.style.display="none";
  }
}

function event_autoplay(autoplay_select) {
  var select=autoplay_select.value;
  var autoplay_menu=autoplay_select.parentNode;
  switch (select) {
    case 0: case 1: case 2:
      menu_autoplay(autoplay_menu, select);
      GM_setValue("Youtube_Download_Autoplay_Setting",select);
      autoplay_menu.parentNode.style.display="none";
  }
}

function make_options_menu(page_lang, selected_fmt, posMenuelem, OpenMenuElem) {
  if(posMenuelem && OpenMenuElem) {
    //== Make a menubox for Quality setting
    var MenuElem = document.createElement('div');
    MenuElem.setAttribute("style", "display:none; position: absolute; z-index: 99; margin:0; padding:0; width: 890px;");

    var arrow = document.createElement('div')
    arrow.setAttribute('style','float:left; width:1em; font-weight:bold; color:#000000 !important;');
    arrow.textContent='>';

    var u1_Elem = document.createElement('ul');
    u1_Elem.setAttribute("style","float:left; list-style-type:none; cursor:pointer; margin:1px; padding:0; border: 1px solid black !important; background-color: #DDDDFF;width:540px;");
    var li_Elem1=new Array();
    for(var h=0;h<=2;h++) {
      li_Elem1[h] = document.createElement('li');
      li_Elem1[h].setAttribute("style","margin:0; padding:5px; color:#000000 !important;");
      li_Elem1[h].appendChild(arrow.cloneNode(true));
      li_Elem1[h].appendChild(document.createTextNode(HtmlUnicodeDecode(get_text_DL(page_lang,"qual"+(h+1)))));
      li_Elem1[h].addEventListener('mouseover' , function() { this.style.backgroundColor="#CCCCFF"; }, true);
      li_Elem1[h].addEventListener('mouseout'  , function() { this.style.backgroundColor=""; }, true);
      li_Elem1[h].setAttribute('value',h+1);
      li_Elem1[h].addEventListener('click'     , function() { event_setQuality(this, selected_fmt); }, true);
      u1_Elem.appendChild(li_Elem1[h]);
    }
    MenuElem.appendChild(u1_Elem);

    //== Make a menubox for autostart
    var u2_Elem = document.createElement('ul');
    u2_Elem.setAttribute("style","float:left; list-style-type:none; cursor:pointer; margin:1px; padding:0; border: 1px solid black !important; background-color: #FFDDDD; width:340px;");
    var li_Elem2=new Array();
    for(var h=0;h<=2;h++) {
      li_Elem2[h] = document.createElement('li');
      li_Elem2[h].setAttribute("style","margin:0; padding:5px; color:#000000 !important;");
      if(h<2) { li_Elem2[h].appendChild(arrow.cloneNode(true)); } else { li_Elem2[h].appendChild(arrow); }
      li_Elem2[h].appendChild(document.createTextNode(HtmlUnicodeDecode(get_text_DL(page_lang,"auto"+(h+1)))));
      li_Elem2[h].addEventListener('mouseover' , function() { this.style.backgroundColor="#FFCCCC"; }, true);
      li_Elem2[h].addEventListener('mouseout'  , function() { this.style.backgroundColor=""; }, true);
      li_Elem2[h].setAttribute('value',h);
      li_Elem2[h].addEventListener('click'     , function() { event_autoplay(this); }, true);
      u2_Elem.appendChild(li_Elem2[h]);
    }
    MenuElem.appendChild(u2_Elem);

    // Select position of the menubox on top of the button
    user_select(MenuElem,'none');
    posMenuelem.appendChild(MenuElem);
    MenuElem.style.left = "-1px";
    MenuElem.style.top  = (1-getHeight(MenuElem))+"px";

    //== Make the openbutton to link to the menubox (with display update of the autoplay setting)
    OpenMenuElem.addEventListener('click', function() { menu_autoplay(u2_Elem, GM_getValue("Youtube_Download_Autoplay_Setting",2)); swap_display(MenuElem); }, true);

    // Update the menubox from the setting
    menu_quality (u1_Elem, GM_getValue("Youtube_Download_Quality_Setting" ,2));
    menu_autoplay(u2_Elem, GM_getValue("Youtube_Download_Autoplay_Setting",2));
  }
}

//** === Download Link === **//
function add_download_link(page_lang, selected_fmt) {
  if(check_on_youtubewatchpage()) {
    els=add_dl_qual_links(page_lang, selected_fmt);
    if(els) { make_options_menu(page_lang, selected_fmt, els[0], els[1]); }
  }
}

//************************************************************
//***** Quality Selector *************************************
//************************************************************
function add_quality_selector(page_lang, selected_fmt) {
  if(!check_on_youtubewatchpage()) { return; }
  var playerEmbed = document.getElementById(YT_PLAYER_EMBED);
  var wrv=document.getElementById(WATCH_RATINGS_VIEW);
  if(!wrv && playerEmbed) { wrv=playerEmbed.parentNode.nextSibling; }
  if(!wrv) { show_alert('Quality Selector Disabled : "'+WATCH_RATINGS_VIEW+'" and "'+YT_PLAYER_EMBED+'" not found'); return; }

  var lgref=640;

  // Delete the original video quality setting switch (Cosmetic change)
  remove_watch_element(WATCH_QUAL_SETTING);

  // Clean URL
  var vurl = window.location.href;
  //vurl=vurl.replace(/\#$/,"");
  vurl=vurl.replace(/\&?fmt\=\d+(\&|$)/gi,"");
  vurl=vurl.replace(/\&?feature\=(channel|relate|user|search)[^(\&|$)]*/gi,"");

  // fmt_map ?
  var fmt_map=1;
  var playerEmbed = document.getElementById(YT_PLAYER_EMBED);
  var flashvars='';
  if(playerEmbed) { // Get flashvars from the embed video
    flashvars = playerEmbed.getAttribute('flashvars');
  } else { // Get flashvars from the fullscreen link
    flashvars = get_fullscreenURL();
  }
  if(flashvars) { fmt_map=(flashvars.search(/fmt_map\=\d+/i)>=0); }

  // Create links
  var link1=null; var link2=null; var link3=null; var link4=null;
  if(selected_fmt!=0) {
    link1=document.createElement("a");
    link1.setAttribute('class','hLink');
    link1.setAttribute('href',vurl+url_fmt(0));
  } else { link1=document.createElement("span"); link1.style.setProperty('color','inherit','important'); }
  if(selected_fmt!=6)  {
    link2=document.createElement("a");
    link2.setAttribute('class','hLink');
    link2.setAttribute('href',vurl+url_fmt(6));
  } else { link2=document.createElement("span"); link2.style.setProperty('color','inherit','important'); }
  if(selected_fmt!=18) {
    link3=document.createElement("a");
    link3.setAttribute('class','hLink');
    link3.setAttribute('href',vurl+url_fmt(18));
  } else { link3=document.createElement("span"); link3.style.setProperty('color','inherit','important'); }
  if(selected_fmt!=22) {
    link4=document.createElement("a");
    link4.setAttribute('class','hLink');
    link4.setAttribute('href',vurl+url_fmt(22));
  } else { link4=document.createElement("span"); link4.style.setProperty('color','inherit','important'); }

  link1.textContent = HtmlUnicodeDecode(get_text_QS(page_lang,"link1"));
  link2.textContent = HtmlUnicodeDecode(get_text_QS(page_lang,"link2"));
  link3.textContent = HtmlUnicodeDecode(get_text_QS(page_lang,"link3"));
  link4.textContent = HtmlUnicodeDecode(get_text_QS(page_lang,"link4"));

  link1.style.setProperty('font-weight','normal','important');
  link2.style.setProperty('font-weight','normal','important');
  link3.style.setProperty('font-weight','normal','important');
  link4.style.setProperty('font-weight','normal','important');
  if((selected_fmt== 0) || (!fmt_map)) { link1.style.setProperty('font-weight','bold','important'); }
  if((selected_fmt== 6) &&  (fmt_map)) { link2.style.setProperty('font-weight','bold','important'); }
  if((selected_fmt==18) &&  (fmt_map)) { link3.style.setProperty('font-weight','bold','important'); }
  if((selected_fmt==22) &&  (fmt_map)) { link4.style.setProperty('font-weight','bold','important'); }

  // Add the Quality Video links
  var newElement = document.createElement('div');
  newElement.setAttribute('style','width:'+lgref+'px; margin:10px 0 10px 0;');
  var table = document.createElement('table');
  table.setAttribute('class','vListBox');
  table.setAttribute('style','text-align:center; width:'+lgref+'px; color:#880000 !important;');
  newElement.appendChild(table);
  var tr1 = document.createElement('tr');
  tr1.setAttribute('style','color:inherit !important; border-bottom: 1px solid red;');
  table.appendChild(tr1);
  var td1 = document.createElement('td'); td1.appendChild(link1); tr1.appendChild(td1);
  td1.setAttribute('style','color:inherit !important');
  var td2 = document.createElement('td'); td2.appendChild(link3); tr1.appendChild(td2);
  td2.setAttribute('style','color:inherit !important');

  var tr2 = document.createElement('tr');
  tr2.setAttribute('style','color:inherit !important');
  table.appendChild(tr2);
  var td3 = document.createElement('td'); td3.appendChild(link2); tr2.appendChild(td3);
  td3.setAttribute('style','color:inherit !important');
  var td4 = document.createElement('td'); td4.appendChild(link4); tr2.appendChild(td4);
  td4.setAttribute('style','color:inherit !important');
  user_select(newElement,'none');
  wrv.parentNode.insertBefore(newElement, wrv);
}

//******************************
//*** Image Preview Rollover ***
//******************************
var image_state=new Array;
var image_count=new Array;
var image_cache=new Array;

function change_image(element)  {
  const MAX_IMG=3;
  const colorlist=["#CC88FF","#CC0000","#00AA00","#0000DD"];
  var idvideo=element.getAttribute('qlicon');
  if(!idvideo) { return; }

  image_count[idvideo]=(image_count[idvideo] % 3)+1;

  if(isUndefined(image_cache[idvideo])) {
    var url_img=element.getAttribute('src');
    var imgpath=url_img.match(/^(.*\/).*?(\.jpg)$/i);
    if(!imgpath) { return; }

    image_cache[idvideo]=new Array;
    image_cache[idvideo][0]=false;
    for(var h=1;h<=MAX_IMG;h++) {
      url_img=imgpath[1]+h+imgpath[2];
      image_cache[idvideo][h]=new Image();
      image_cache[idvideo][h].src=url_img;
    }
  }

  if(!(image_cache[idvideo][0])) {
    var nbcomplete=0;
    for(var h=1;h<=MAX_IMG;h++) { if (image_cache[idvideo][h].complete == true) { nbcomplete++; } }
    if(nbcomplete==0) {
      image_count[idvideo]=0;
    } else {
      if(nbcomplete>=MAX_IMG) {
        image_cache[idvideo][0]=true;
      } else {
        while (image_cache[idvideo][image_count[idvideo]].complete != true) { image_count[idvideo]=(image_count[idvideo] % 3)+1; }
      }
    }
  }

  element.style.borderColor="#F0F0F0";
  if(element.className=='vimg50') { element.parentNode.parentNode.style.borderColor=colorlist[image_count[idvideo]]; }
  else { element.parentNode.parentNode.parentNode.style.borderColor=colorlist[image_count[idvideo]]; }


  if(image_count[idvideo]>0) {
    element.src=image_cache[idvideo][image_count[idvideo]].src;
    if(image_state[idvideo]) { image_state[idvideo]=setTimeout( function() { change_image(element); }, ROLLOVER_DELAY_CONT); }
  } else {
    if(image_state[idvideo]) { image_state[idvideo]=setTimeout( function() { change_image(element); }, ROLLOVER_DELAY_LOAD); }
  }
}

function start_rollover_event() {
  var elImg=this;
  var idvideo=elImg.getAttribute('qlicon');
  if(!idvideo) { return; }
  if(!(image_state[idvideo])) { image_state[idvideo]=setTimeout( function() { change_image(elImg); }, ROLLOVER_DELAY_INIT); }
}

function stop_rollover_event() {
  var elImg=this;
  var idvideo=elImg.getAttribute('qlicon');
  if(!idvideo) { return; }
  image_state[idvideo]=clearTimeout(image_state[idvideo]);
}

function bind_image_preview_rollover(elImg) {
  var idvideo=elImg.getAttribute('qlicon');
  if(!idvideo) {
    var imgpath=elImg.getAttribute('src');
    if(!imgpath) { return; }
    var temp=imgpath.match(/^.*\/(.*?)\/default\.jpg$/);
    if(!temp) { return; }
    idvideo=temp[1];
    elImg.setAttribute('qlicon',idvideo);
  }
  if(idvideo) {
    elImg.setAttribute('title',''); // Clear title
    if(isUndefined(image_state[idvideo])) { image_state[idvideo]=0; }
    if(isUndefined(image_count[idvideo])) { image_count[idvideo]=0; }
    elImg.addEventListener('mouseover' , start_rollover_event, true);
    elImg.addEventListener('mouseout'  , stop_rollover_event , true);
  }
}

function image_preview_rollover(element) {
  if(!(element)) { return; }
  var links=null;
  try { links=document.evaluate('.//img[@src]',element,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { links=null; }
  if(links) {
    var links_lg=links.snapshotLength;
    for(var h=0;h<links_lg;h++) {
      var image=links.snapshotItem(h);
      if(image) { bind_image_preview_rollover(image); }
    }
    return;
  }
  try { links=element.getElementsByTagName("img"); } catch(err) { links=null; }
  if(links) {
    var links_nb=links.length;
    for(var h=0;h<links_nb;h++) {
      var image=links[h];
      if(image) { bind_image_preview_rollover(image); }
   }
    return;
  }
  var msg="image_preview_rollover: Impossible to get links (XPath and getElementsByTagName failed)";
  if(arguments.callee.getlink_fail) { show_alert(msg,0); }
  else { arguments.callee.getlink_fail=1; show_alert(msg,1); }
}

//**********************
//*** change_links() ***
//**********************
function clean_link_and_add_fmt(link,fmt) {
  // Clean URL
  //link=link.replace(/\#$/,'');
  link=link.replace(/\&?fmt\=\d+(\&|$)/gi,'');
  link=link.replace(/\&?search\=[^(\&|$)]*/gi,'');
  link=link.replace(/\&?feature\=(channel|relate|user|search)[^(\&|$)]*/gi,'');
  // Add fmt to URL
  return link+url_fmt(fmt);
}

function change_links_with_fmt(element,fmt) {
  if(!(element)) { return; }
  var links=null;
  try { links=document.evaluate('.//a[@href]',element,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { links=null; }
  if(links) {
    var links_lg=links.snapshotLength;
    for(var h=0;h<links_lg;h++) {
      var link=links.snapshotItem(h).href;
      if(link.match(/youtube\.\w+\/watch\?/i)) { links.snapshotItem(h).href=clean_link_and_add_fmt(link,fmt); }
    }
    return;
  }
  try { links=element.getElementsByTagName("a"); } catch(err) { links=null; }
  if(links) {
    var links_nb=links.length;
    for(var h=0;h<links_nb;h++) {
      var link=links[h].href;
      if(link.match(/youtube\.\w+\/watch\?/i)) { links[h].href=clean_link_and_add_fmt(link,fmt); }
    }
    return;
  }
  var msg="change_links: Impossible to get links (XPath and getElementsByTagName failed)";
  if(arguments.callee.getlink_fail) { show_alert(msg,0); }
  else { arguments.callee.getlink_fail=1; show_alert(msg,1); }
}

function change_links_event() {
  var el=this;
  var fmt=GM_getValue("Youtube_Download_fmt",0);
  change_links_with_fmt(el,fmt);
  image_preview_rollover(el);
}

//** === change_links & image_preview_rollover === **//
function change_links(selected_fmt) {
  var last_fmt=GM_getValue("Youtube_Download_fmt",0);
  if(check_on_youtubewatchpage()) { //== Watch pages
    if(last_fmt!=0) {
      var wurl=window.location.href;
      // Link from the Flash player ? (NR=1)
      if (wurl.search(/[?&]NR\=\d+/i)>=0) {
        wurl=wurl.replace(/\&?NR\=\d+(\&|$)/gi,'');
        wurl=clean_link_and_add_fmt(wurl,last_fmt);
        window.location.replace(wurl);
        return;
      }
    }
    GM_setValue("Youtube_Download_fmt",selected_fmt);
    // Add fmt to watch-url-field
    var wuf=document.getElementById(WATCH_URL_FIELD);
    if(wuf) { wuf.setAttribute('value',clean_link_and_add_fmt(wuf.getAttribute('value'),selected_fmt)); }
    // Change all links in the page
    change_links_with_fmt(window.document.body, selected_fmt);
    // Change links of User videos after loading it
    var wmf=document.getElementById(WATCH_MORE_FROM);
    if(wmf)  { image_preview_rollover(wmf);  wmf.addEventListener ('load', change_links_event, true); }
    // Change links of Related videos box after loading it
    var wrvb=document.getElementById(WATCH_RELATED_VIDS);
    if(wrvb) { image_preview_rollover(wrvb); wrvb.addEventListener('load', change_links_event, true); }
    // Change links of Search box after loading it
    var wsr=document.getElementById(WATCH_SEARCH_RES);
    if(wsr)  { image_preview_rollover(wsr);  wsr.addEventListener ('load', change_links_event, true); }
    // Playlist panel support
    var plst=document.getElementById(PLAYLIST_PANEL);
    if(plst) { image_preview_rollover(plst); plst.addEventListener('load', change_links_event, true); }
  } else { //== Other pages
    // Change all links in the page
    if(last_fmt!=0) { change_links_with_fmt(window.document.body, last_fmt); }
    // == Youtube
    if(check_on_youtube()) { image_preview_rollover(window.document.body); }
  }
}

//************************************************************
//***** Media Controller *************************************
//************************************************************

function get_movie_player(ytplayer_name) {
  if(!ytplayer_name) { ytplayer_name=YT_PLAYER_EMBED; } 
  ytplayer=unsafeWindow.document.getElementById(ytplayer_name);
  if(!ytplayer) {
    var msg='Media Controller warning : "'+ytplayer_name+'" not found';
    if(arguments.callee.movie_player_fail) { show_alert(msg,0); }
    else { arguments.callee.movie_player_fail=1; show_alert(msg); }
  }
  return ytplayer;
}

// N/A (-2), unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5). 
function get_player_state(ytplayer) {
  var state=-1; try { state=ytplayer.getPlayerState(); } catch(err) { state=-2; }
  if(state==-2) {
    show_alert('Media Controller warning : "'+ytplayer.id+'" state not available',0);
    if(ytplayer.getAttribute('mc_embedtype')==1) {
      // Check allowscriptaccess (must be 'always')
      var allowScript=ytplayer.getAttribute('allowscriptaccess');
      if(!(allowScript) || !(allowScript.match(/^always$/i))) {
        ytplayer.setAttribute('allowscriptaccess','always');
        show_alert('Media Controller Notice: Reloading the player "'+ytplayer.id+'" to allow script access');
        player_revive(ytplayer.id); // Revive it...
      }
    }
  }
  return state;
}

// §§§ Step back §§§
var player_Step_back_timerid=new Array;
function player_stepback(ytplayer_name) {
  if(player_Step_back_timerid[ytplayer_name]) { return; }
  function player_stepback_check(ytplayer_name,frame_cursor,new_frame_cursor) {
    player_Step_back_timerid[ytplayer_name]=null;
    var ytplayer=get_movie_player(ytplayer_name);
    if(ytplayer) {
      var state=get_player_state(ytplayer);
      if(state!=0 && state<2) { return; }
      cur_frame_cursor=ytplayer.getCurrentTime();
      if(cur_frame_cursor<frame_cursor) { return; }
      new_frame_cursor=new_frame_cursor-0.05; if(new_frame_cursor<0) { new_frame_cursor=0; }
      ytplayer.seekTo(new_frame_cursor,0);
      if(new_frame_cursor<=0) { return; }
      if(frame_cursor-new_frame_cursor>1) { return; } // Test for the Loading-start of the video
      player_Step_back_timerid[ytplayer_name]=window.setTimeout( function() { player_stepback_check(ytplayer_name,frame_cursor,new_frame_cursor); }, 50);
    }
  }
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state<0) { return; }
    ytplayer.pauseVideo();
    state=get_player_state(ytplayer);
    if(state!=0 && state<2) { return; }
    frame_cursor=ytplayer.getCurrentTime();
    if(frame_cursor<=0) { return; }
    new_frame_cursor=frame_cursor-0.05; if(new_frame_cursor<0) { new_frame_cursor=0; }
    ytplayer.seekTo(new_frame_cursor,0);
    if(new_frame_cursor<=0) { return; }
    player_Step_back_timerid[ytplayer_name]=window.setTimeout( function() { player_stepback_check(ytplayer_name,frame_cursor,new_frame_cursor); }, 50);
  }
}

// §§§ Stop §§§
function player_stop(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state==-1) { window.setTimeout( function() { player_stop(); }, 50); return; }
    if(state<0 || state>3) { return; }
    ytplayer.pauseVideo(); ytplayer.seekTo(0,1); player_pause(ytplayer_name);
  }
}

// §§§ Step §§§
function player_frame(ytplayer_name) {
  var frame_cursor=0;
  var ytplayer=get_movie_player(ytplayer_name);

  function player_frame_pause(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state<=0) { return; }
    var new_pos=ytplayer.getCurrentTime();
    //show_alert(frame_cursor+"/"+new_pos,0);
    if(new_pos==frame_cursor || state==3) {
      window.setTimeout( function() { player_frame_pause(ytplayer); }, 2);
      return;
    }
    ytplayer.pauseVideo(ytplayer.id);
  }

  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state<=0 || state==3) { return; }
    frame_cursor=ytplayer.getCurrentTime();
    ytplayer.playVideo(ytplayer_name);
    player_frame_pause(ytplayer);
  }
}

// §§§ Play §§§
function player_play(ytplayer_name) {
  if(player_killed[ytplayer_name]==1) { player_revive(ytplayer_name); return; }
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state==-1) { window.setTimeout( function() { player_play(); }, 50); return; }
    if(state<0) { return; }
    ytplayer.playVideo();
  }
}
// Revive the player
var player_killed=new Array;
function player_revive(ytplayer_name) {
  var ytplayer = document.getElementById(ytplayer_name);
  if(!(ytplayer)) { show_alert('Revive Failed : "'+ytplayer_name+'" not found'); return; }

  // Make autoplay on
  if(ytplayer.getAttribute('mc_embedtype')==1) {
    var flashvars = ytplayer.getAttribute('flashvars');
    var autoplay  = flashvars.match(/autoplay\=(\d+)/i);
    if(autoplay) { flashvars=flashvars.replace(/autoplay\=\d+/i,"autoplay=1"); }
    else { flashvars=flashvars+'&autoplay=1'; }
    ytplayer.setAttribute('flashvars',flashvars);
  } else { // mc_embedtype==2
    var srcvars = ytplayer.getAttribute('src');
    var autoplay  = srcvars.match(/autoplay\=(\d+)/i);
    if(autoplay) { srcvars=srcvars.replace(/autoplay\=\d+/i,"autoplay=1"); }
    else { srcvars=srcvars+'&autoplay=1'; }
    ytplayer.setAttribute('src',srcvars);
  }

  // Revive the video player
  flushNode(ytplayer);
  player_killed[ytplayer_name]=0;

  // Test if a loop is set
  player_check_limit(ytplayer_name);
}

// §§§ Pause §§§
function player_pause(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state==-1 || state==3) { window.setTimeout( function() { player_pause(ytplayer_name); }, 50); return; }
    if(state<=0) { return; }
    ytplayer.pauseVideo();
  }
}


// §§§ Begin §§§
function player_memo(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(get_player_state(ytplayer)<-1) { return; }
  var bt_state=document.getElementById(ytplayer_name+'-Memo_state');
  if(ytplayer && bt_state) {
    if(get_player_state(ytplayer)<=0) {
      bt_state.style.display="none";
      bt_state.setAttribute('value',0);
      return;
    }
    if(bt_state.style.display=="none") {
      var new_pos=ytplayer.getCurrentTime();
      ytplayer.seekTo(new_pos,1); // Get real seek time
      new_pos=ytplayer.getCurrentTime();
      if(new_pos<0) { new_pos=0; }
      bt_state.style.display="block";
      bt_state.setAttribute('value',new_pos.toString());
    } else {
      bt_state.style.display="none";
      bt_state.setAttribute('value',0);
    }
  }
}

// §§§ Loop §§§
function player_loop(ytplayer_name) {
  var bt_state=document.getElementById(ytplayer_name+'-Loop_state');
  if(bt_state) {
    if(bt_state.style.display=="none") {
      var ytplayer=get_movie_player(ytplayer_name);
      if(!ytplayer) { return; }
      if(get_player_state(ytplayer)<-1) { return; }
      bt_state.style.display="block";
      player_check_limit(ytplayer_name);
    } else {
      bt_state.style.display="none";
    }
  }
}

// §§§ Rewind §§§
function player_rewind(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(ytplayer) {
    var state=get_player_state(ytplayer);
    if(state<0) { return; }
    var memo_pos=0;
    var memo_state=document.getElementById(ytplayer_name+'-Memo_state');
    if(memo_state) { memo_pos=parseFloat(memo_state.getAttribute('value'),9); }
    var player_pos=ytplayer.getCurrentTime();
    if(memo_pos>=player_pos) {
      ytplayer.seekTo(0,1);
    } else {
      ytplayer.seekTo(memo_pos,1);
    }
  }
}

// §§§ End §§§
function player_limit(ytplayer_name) {
  var ytplayer=get_movie_player(ytplayer_name);
  if(get_player_state(ytplayer)<-1) { return; }
  var bt_state=document.getElementById(ytplayer_name+'-Limit_state');
  if(ytplayer && bt_state) {
    if(get_player_state(ytplayer)<0) {
      bt_state.style.display="none";
      bt_state.setAttribute('value',0);
      return;
    }
    if(bt_state.style.display=="none") {
      var new_pos=ytplayer.getCurrentTime();
      if(new_pos<0) { new_pos=0; }
      bt_state.style.display="block";
      bt_state.setAttribute('value',new_pos.toString());
      player_check_limit(ytplayer_name);
    } else {
      bt_state.style.display="none";
      bt_state.setAttribute('value',0);
    }
  }
}

// §§§ Kill §§§ (Double click for this one)
function player_freeze(ytplayer_name) {
  if(isUndefined(ytplayer_name)) { arguments.callee.freeze=0; return; }
  if(arguments.callee.freeze==1) {
    var ytplayer=get_movie_player(ytplayer_name);
    if(!ytplayer) { return; }
    if(get_player_state(ytplayer)>=-1) { ytplayer.pauseVideo(); ytplayer.stopVideo(); }
    player_killed[ytplayer_name]=1;
    return;
  }
  arguments.callee.freeze=1; window.setTimeout( function() { player_freeze(); }, 250);
}

// Need a serial of interrupts to check the end of the selection
var player_check_limit_timerid=new Array;
function player_check_limit_routine(ytplayer_name) {
  if(player_killed[ytplayer_name]==1) { return; }
  var ytplayer=get_movie_player(ytplayer_name);
  if(!ytplayer) { return; }

  var M_state=document.getElementById(ytplayer_name+'-Memo_state');
  var L_state=document.getElementById(ytplayer_name+'-Limit_state');
  var Loop_state=document.getElementById(ytplayer_name+'-Loop_state');
  if(L_state && M_state && Loop_state) {
    if(Loop_state.style.display=='none') { return; }

    var state=get_player_state(ytplayer);
    if(state<0) { player_check_limit_timerid[ytplayer_name]=window.setTimeout( function() { player_check_limit_timerid[ytplayer_name]=null; player_check_limit_routine(ytplayer_name); }, 1000); return; }

    var pos=ytplayer.getCurrentTime();
    // Test Infinite buffering
    if(state==3) { // video buffering
      if(pos>ytplayer.getDuration()-0.5) {
        if(ytplayer.getVideoStartBytes()+ytplayer.getVideoBytesLoaded()>=ytplayer.getVideoBytesTotal())
          { state=0; }
      }
    }

    var vmemo=parseFloat(M_state.getAttribute('value'),9);
    var vlimit=parseFloat(L_state.getAttribute('value'),9);
    if((pos>=vlimit && L_state.style.display!='none') || state==0) { ytplayer.seekTo(vmemo,1); if(state==0) { player_play(ytplayer_name); } }

    // On watch page, onMediaControllerPlayerStateChange take care of the video end, so we end here
    if(L_state.style.display=='none' && check_on_youtubewatchpage()) { return; }
    player_check_limit_timerid[ytplayer_name]=window.setTimeout( function() { player_check_limit_timerid[ytplayer_name]=null; player_check_limit_routine(ytplayer_name); }, 50);
    return;
  }
}
function player_check_limit(ytplayer_name) {
  window.clearTimeout(player_check_limit_timerid[ytplayer_name]);
  player_check_limit_routine(ytplayer_name);
}



function get_fullscreenURL() {
  var url=unsafeWindow.fullscreenUrl;
  if(url) { return window.location.protocol+"//"+window.location.host+url.toString(); }
  return null;
}

function get_embedURL() {
  var url=unsafeWindow.embedUrl;
  if(url) { return url.toString(); }
  return null;
}

// *********************************************************************************************************** //
// Bind Player Event for the End of video
function bind_movie_player_event() {
  // Only for youtube watch pages
  if(!check_on_youtubewatchpage()) { return; }

  //~~~~~~~~ Startof innerscript ~~~~~~//
  var innerscript = function() {

function check_movie_player() {
  var playerEmbed = document.getElementById('__movie_player');
  if(playerEmbed) { return; }
  var wpd = document.getElementById('__watch-player-div');
  if(!wpd) { return; }
  var temp=null;
  try { temp=wpd.getElementsByTagName("embed"); } catch(err) { temp=null; }
  if(temp && temp[0]) { temp[0].setAttribute('id','__movie_player'); }
}

function check_allowscriptaccess(ytplayer) { // Check for allowscriptaccess (must be 'always')
  allowScript=ytplayer.getAttribute('allowscriptaccess');
  if(!(allowScript) || !(allowScript.match(/^always$/i))) {
    ytplayer.setAttribute('allowscriptaccess','always');
    return 1;
  }
  return 0;
}

function set_autoplay(ytplayer,new_autoplay) {
  var flashvars = ytplayer.getAttribute('flashvars');
  var autoplay=flashvars.match(/autoplay\=(\d+)/i);
  if(new_autoplay=="0") {
    if(!(autoplay)) {
      ytplayer.setAttribute('flashvars',flashvars+'&autoplay=0');
      return 1;
    } else if (autoplay[1]!=0) {
      ytplayer.setAttribute('flashvars',flashvars.replace(/autoplay\=\d+/i,"autoplay=0"));
      return 1;
    }
  } else {
    if(new_autoplay=="1") { // Mode: Buffering at start...
      ytplayer.pauseVideo();
      onMediaControllerPlayerStateChange.Buffering_StopPlayer=true;
    }
    if(autoplay) {
      if(autoplay[1]!=1) {
        ytplayer.setAttribute('flashvars',flashvars.replace(/autoplay\=\d+/i,"autoplay=1"));
        return 1;
      }
    }
  }
  return 0;
}

function check_for_loop(ytplayer) {
  var loop_state=window.document.getElementById('__movie_player-Loop_state');
  if(loop_state.style.display!="none") {
    var memo_state=window.document.getElementById('__movie_player-Memo_state');
    if(memo_state) {
      var memo_pos=parseFloat(memo_state.getAttribute('value'),9);
      ytplayer.seekTo(memo_pos,1);
      window.setTimeout( function() { ytplayer.playVideo(); }, 50);
      return 1;
    }
  }
  return 0;
}

function check_still_buffering() {
  var player=window.document.getElementById('__movie_player');
  if(!player) { return; }
  var state=-1; try { state=player.getPlayerState(); } catch(err) { state=-2; }
  if(state==3) {
    if(player.getCurrentTime()>player.getDuration()-0.5) {
      if(check_for_loop(player)) { return; }
      // Original Youtube Script (if no loop)
      try { handleWatchPagePlayerStateChange(0); } catch(err) {}
    }
  }
}

onMediaControllerPlayerStateChange = function(newState) {
  var player=window.document.getElementById('__movie_player');
  if(!player) { return; }
  if(newState==2) { arguments.callee.Buffering_StopPlayer=false; }
  if((arguments.callee.Buffering_StopPlayer==true) && (newState>=3)) { // Mode: Buffering at start...
    arguments.callee.Buffering_StopPlayer=false;
    if(player.getCurrentTime()<=1) { player.pauseVideo(); player.seekTo(0,1); }
  }
  // Test Infinite buffering
  if(newState==3) { // video is buffering
    if(player.getCurrentTime()>player.getDuration()-0.5) {
      if(player.getVideoStartBytes()+player.getVideoBytesLoaded()>=player.getVideoBytesTotal()) {
        newState=0;
      } else {
        window.setTimeout( function() { check_still_buffering(); }, 1500);
      }
    }
  }
  // Check for Loop
  if(newState==0) { if(check_for_loop(player)) { return; } }
  // Original Youtube Script (if no loop)
  try { handleWatchPagePlayerStateChange(newState); } catch(err) {}
}

function bind_MediaControllerPlayerStateChange() {
  function isUndefined(x) { return x == null && x !== null; }
  check_movie_player();
  var ytplayer=window.document.getElementById('__movie_player');
  if(ytplayer) {
    // Flush to remove the initial event since there no removeEventListener ?
    if(isUndefined(arguments.callee.initialflush)) { arguments.callee.initialflush=0; } // Don't do it since i see no problem :p
    var flush=arguments.callee.initialflush; arguments.callee.initialflush=0;
    flush += check_allowscriptaccess(ytplayer);
    flush += set_autoplay(ytplayer,'__autoplay');
    if(flush) { ytplayer.parentNode.replaceChild(ytplayer.cloneNode(true),ytplayer); }
    var state=-1; try { state=ytplayer.getPlayerState(); } catch(err) { state=-2; }
    if(state<0) { // Still loading the player...
      window.setTimeout( function() { bind_MediaControllerPlayerStateChange(); }, 500);
    } else { // Loaded, so add an event
      ytplayer.addEventListener("onStateChange", "onMediaControllerPlayerStateChange");
    }
  }
}

// Redefine onYouTubePlayerReady (warning: can cause conflict with an other script)
onYouTubePlayerReady = function(playerid) {
  bind_MediaControllerPlayerStateChange();
}
bind_MediaControllerPlayerStateChange();
  } //~~~~~~~ Endof innerscript ~~~~~~~//

  innerscript=innerscript.toString().replace(/__movie_player/g,YT_PLAYER_EMBED)
             .replace(/__watch-player-div/,WATCH_PLAYER_DIV)
             .replace(/__autoplay/,GM_getValue("Youtube_Download_Autoplay_Setting",2));

  var script=document.createElement("script");
  //script.setAttribute('id','Youtube_Enhancer-PlayerStateChange');
  script.setAttribute('type','text/javascript');
  script.textContent="("+innerscript+")();";
  document.body.appendChild(script);
}
// *********************************************************************************************************** //


//** === Media Controller === **//
function media_controller(page_lang,ytplayer_name,tag) {
  var ytplayer = document.getElementById(ytplayer_name);
  if(!ytplayer) { show_alert('Media Controller Disabled : "'+ytplayer_name+'" not found'); return; }
  ytplayer.setAttribute('mc_embedtype',tag);

  // Media Controller display mode
  var lgref=480;
  var ytplayer_width=ytplayer.getAttribute('width');
  if (check_on_youtubewatchpage()) { lgref=640; ytplayer_width=640; }
  var MC_height=26; var MC_leftB2=167; var MC_topB2=-1; var MC_leftB3=lgref-166;
  if(ytplayer_width<lgref-126) { MC_leftB2=(ytplayer_width-244)/2+117; MC_leftB3=ytplayer_width-30; }
  if(ytplayer_width<300) { MC_leftB2=19; MC_leftB3=145; MC_topB2=26; }

  var yt_p=ytplayer.parentNode; var yt_ns;
  if(yt_p.tagName=="OBJECT") { yt_p.setAttribute('mc_embedtype',3); yt_ns=yt_p.nextSibling; yt_p=yt_p.parentNode; }
  else { yt_ns=ytplayer.nextSibling; }

  mediabar=document.createElement('div');
  //mediabar.setAttribute('id','Media_Controller-'+ytplayer_name);
  mediabar.setAttribute('style','position:relative; width:'+ytplayer_width+'px; margin-bottom:3px; padding-bottom:3px; '
                       +'height:'+(MC_height+MC_topB2-1)+'px; border:0px; font-family:Arial,sans-serif !important; color: #000000 !important;');
  mediabar.setAttribute('lang','fr');

  var loop_display_init='none'; // use 'block' (loop enabled at start) or 'none' (loop disabled at start)

  // === Unicode player buttons ===

  // Stop
  var buttonStopDiv=document.createElement('div');
  buttonStopDiv.setAttribute('style','position:absolute; top:-9px; left:6px; font-size:26px; line-height:38px; color:inherit !important;');
  buttonStopDiv.textContent=String.fromCharCode(9632);

  // Step back
  var buttonDiv1=document.createElement('div');
  buttonDiv1.setAttribute('style','position:absolute; top:0px; left:2px; font-size:18px; line-height:26px; color:inherit !important;');
  buttonDiv1.textContent=String.fromCharCode(9668);
  var buttonDiv2=document.createElement('div');
  buttonDiv2.setAttribute('style','position:absolute; top:0px; left:20px; font-size:12px; line-height:26px; color:inherit !important;');
  buttonDiv2.textContent=String.fromCharCode(9613);
  var buttonStepBackDiv=document.createElement('div');
  buttonStepBackDiv.setAttribute('style','color:inherit !important;');
  buttonStepBackDiv.appendChild(buttonDiv1);
  buttonStepBackDiv.appendChild(buttonDiv2);

  // Step forward
  var buttonDiv1=document.createElement('div');
  buttonDiv1.setAttribute('style','position:absolute; top:0px; left:5px; font-size:12px; line-height:26px; color:inherit !important;');
  buttonDiv1.textContent=String.fromCharCode(9613);
  var buttonDiv2=document.createElement('div');
  buttonDiv2.setAttribute('style','position:absolute; top:0px; left:8px; font-size:18px; line-height:26px; color:inherit !important;');
  buttonDiv2.textContent=String.fromCharCode(9658);
  var buttonStepForwardDiv=document.createElement('div');
  buttonStepForwardDiv.setAttribute('style','color:inherit !important;');
  buttonStepForwardDiv.appendChild(buttonDiv1);
  buttonStepForwardDiv.appendChild(buttonDiv2);

  // Play
  var buttonPlayDiv=document.createElement('div');
  buttonPlayDiv.setAttribute('style','position:absolute; top:-2px; left:5px; font-size:20px; line-height:30px; color:inherit !important;');
  buttonPlayDiv.textContent=String.fromCharCode(9658);

  // Pause
  var buttonDiv1=document.createElement('div');
  buttonDiv1.setAttribute('style','position:absolute; top:3px; left:8px; font-size:16px; line-height:21px; color:inherit !important;');
  buttonDiv1.textContent=String.fromCharCode(9613);
  var buttonDiv2=document.createElement('div');
  buttonDiv2.setAttribute('style','position:absolute; top:3px; left:16px; font-size:16px; line-height:21px; color:inherit !important;');
  buttonDiv2.textContent=String.fromCharCode(9613);
  var buttonPauseDiv=document.createElement('div');
  buttonPauseDiv.setAttribute('style','color:inherit !important;');
  buttonPauseDiv.appendChild(buttonDiv1);
  buttonPauseDiv.appendChild(buttonDiv2);

  // Begin
  var buttonDiv1=document.createElement('div');
  buttonDiv1.setAttribute('style','position:absolute; top:-1px; left:6px; font-size:18px; line-height:28px; z-index:2; color:inherit !important;');
  buttonDiv1.textContent=String.fromCharCode(12302);
  var buttonDiv2=document.createElement('div');
  buttonDiv2.setAttribute('id',ytplayer_name+'-Memo_state');
  buttonDiv2.setAttribute('style','display:none; position:absolute; left:1px; top:1px; width:26px; height:'+(MC_height-2)+'px; z-index:1; background:#FFDD00;');
  buttonDiv2.setAttribute('value',0);
  var buttonBeginDiv=document.createElement('div');
  buttonBeginDiv.setAttribute('style','color:inherit !important;');
  buttonBeginDiv.appendChild(buttonDiv1);
  buttonBeginDiv.appendChild(buttonDiv2);

  // Loop
  var buttonDiv1=document.createElement('div');
  buttonDiv1.setAttribute('style','position:absolute; top:1px; width:35px; left:4px; font-size:42px; line-height:28px; height:26px; text-align:left; z-index:2; color:inherit !important;');
  buttonDiv1.textContent=String.fromCharCode(8617);
  var buttonDiv2=document.createElement('div');
  buttonDiv2.setAttribute('id',ytplayer_name+'-Loop_state');
  buttonDiv2.setAttribute('style','display:'+loop_display_init+'; position:absolute; left:1px; top:1px; width:35px; height:'+(MC_height-2)+'px; z-index:1; background:#BBBBFF;');
  var buttonLoopDiv=document.createElement('div');
  buttonLoopDiv.setAttribute('style','color:inherit !important;');
  buttonLoopDiv.appendChild(buttonDiv1);
  buttonLoopDiv.appendChild(buttonDiv2);

  // Rewind
  var buttonDiv1=document.createElement('div');
  buttonDiv1.setAttribute('style','position:absolute; top:-1px; left:7px; font-size:14px; line-height:25px; color:inherit !important;');
  buttonDiv1.textContent='|';
  var buttonDiv2=document.createElement('div');
  buttonDiv2.setAttribute('style','position:absolute; top:1px; left:9px; font-size:24px; line-height:26px; color:inherit !important;');
  buttonDiv2.textContent=String.fromCharCode(9664);
  var buttonRewindDiv=document.createElement('div');
  buttonRewindDiv.setAttribute('style','color:inherit !important;');
  buttonRewindDiv.appendChild(buttonDiv1);
  buttonRewindDiv.appendChild(buttonDiv2);

  // End
  var buttonDiv1=document.createElement('div');
  buttonDiv1.setAttribute('style','position:absolute; top:-1px; left:14px; font-size:18px; line-height:26px; z-index:2; color:inherit !important;');
  buttonDiv1.textContent=String.fromCharCode(12303);
  var buttonDiv2=document.createElement('div');
  buttonDiv2.setAttribute('id',ytplayer_name+'-Limit_state');
  buttonDiv2.setAttribute('style','display:none; position:absolute; left:1px; top:1px; width:26px; height:'+(MC_height-2)+'px; z-index:1; background:#FFDD00;');
  buttonDiv2.setAttribute('value',0);
  var buttonEndDiv=document.createElement('div');
  buttonEndDiv.setAttribute('style','color:inherit !important;');
  buttonEndDiv.appendChild(buttonDiv1);
  buttonEndDiv.appendChild(buttonDiv2);

  // Kill
  var buttonKillDiv=document.createElement('div');
  buttonKillDiv.setAttribute('style','position:absolute; top:0px; left:2px; font-size:24px; line-height:27px; color:inherit !important;');
  buttonKillDiv.textContent=String.fromCharCode(9760);


  // === Media Controller Bar ===
  // 1st group
  var buttonStop=document.createElement('div');
  buttonStop.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"stop")));
  buttonStop.setAttribute('style','left: 0px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#E8E8E8 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonStop.appendChild(buttonStopDiv);
  buttonStop.addEventListener('mouseover', function() { this.style.setProperty("color", "#E00000", "important"); }, true);
  buttonStop.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonStop.addEventListener('click',     function() { player_stop(ytplayer_name); }, true);
  user_select(buttonStop,'none');
  mediabar.appendChild(buttonStop);

  var buttonStepBack=document.createElement('div');
  buttonStepBack.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"stepback")));
  buttonStepBack.setAttribute('style','left:29px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#E8E8E8 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonStepBack.appendChild(buttonStepBackDiv);
  buttonStepBack.addEventListener('mouseover', function() { this.style.setProperty("color", "#E00000", "important"); }, true);
  buttonStepBack.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonStepBack.addEventListener('click',     function() { player_stepback(ytplayer_name); }, true);
  user_select(buttonStepBack,'none');
  mediabar.appendChild(buttonStepBack);

  var buttonFrame=document.createElement('div');
  buttonFrame.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"step")));
  buttonFrame.setAttribute('style','left:58px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#E8E8E8 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonFrame.appendChild(buttonStepForwardDiv);
  buttonFrame.addEventListener('mouseover', function() { this.style.setProperty("color", "#E00000", "important"); }, true);
  buttonFrame.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonFrame.addEventListener('click',     function() { player_frame(ytplayer_name); }, true);
  user_select(buttonFrame,'none');
  mediabar.appendChild(buttonFrame);

  var buttonPlay=document.createElement('div');
  buttonPlay.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"play")));
  buttonPlay.setAttribute('style','left:87px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#E8E8E8 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonPlay.appendChild(buttonPlayDiv);
  buttonPlay.addEventListener('mouseover', function() { this.style.setProperty("color", "#E00000", "important"); }, true);
  buttonPlay.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonPlay.addEventListener('click',     function() { player_play(ytplayer_name); }, true);
  user_select(buttonPlay,'none');
  mediabar.appendChild(buttonPlay);

  var buttonPause=document.createElement('div');
  buttonPause.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"pause")));
  buttonPause.setAttribute('style','left:116px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#E8E8E8 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonPause.appendChild(buttonPauseDiv);
  buttonPause.addEventListener('mouseover', function() { this.style.setProperty("color", "#E00000", "important"); }, true);
  buttonPause.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonPause.addEventListener('click',     function() { player_pause(ytplayer_name); }, true);
  user_select(buttonPause,'none');
  mediabar.appendChild(buttonPause);


  // 2nd group
  var buttonMemo=document.createElement('div');
  buttonMemo.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"begin")));
  buttonMemo.setAttribute('style','left:'+MC_leftB2+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#E8E8E8 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonMemo.appendChild(buttonBeginDiv);
  buttonMemo.addEventListener('mouseover', function() { this.style.setProperty("color", "#00C040", "important"); }, true);
  buttonMemo.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonMemo.addEventListener('click',     function() { player_memo(ytplayer_name); }, true);
  user_select(buttonMemo,'none');
  mediabar.appendChild(buttonMemo);

  var buttonLoop=document.createElement('div');
  buttonLoop.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"loop")));
  buttonLoop.setAttribute('style','left:'+(MC_leftB2+29)+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:37px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#E8E8E8 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonLoop.appendChild(buttonLoopDiv);
  buttonLoop.addEventListener('mouseover', function() { this.style.setProperty("color", "#00C040", "important"); }, true);
  buttonLoop.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonLoop.addEventListener('click',     function() { player_loop(ytplayer_name); }, true);
  user_select(buttonLoop,'none');
  mediabar.appendChild(buttonLoop);

  var buttonRewind=document.createElement('div');
  buttonRewind.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"rewind")));
  buttonRewind.setAttribute('style','left:'+(MC_leftB2+67)+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#E8E8E8 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonRewind.appendChild(buttonRewindDiv);
  buttonRewind.addEventListener('mouseover', function() { this.style.setProperty("color", "#E00000", "important"); }, true);
  buttonRewind.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonRewind.addEventListener('click',     function() { player_rewind(ytplayer_name); }, true);
  user_select(buttonRewind,'none');
  mediabar.appendChild(buttonRewind);

  var buttonLimit=document.createElement('div');
  buttonLimit.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"end")));
  buttonLimit.setAttribute('style','left:'+(MC_leftB2+96)+'px; top:'+(MC_topB2+1)+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#E8E8E8 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonLimit.appendChild(buttonEndDiv);
  buttonLimit.addEventListener('mouseover', function() { this.style.setProperty("color", "#00C040", "important"); }, true);
  buttonLimit.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonLimit.addEventListener('click',     function() { player_limit(ytplayer_name); }, true);
  user_select(buttonLimit,'none');
  mediabar.appendChild(buttonLimit);


  // 3rd group
  var buttonFreeze=document.createElement('div');
  buttonFreeze.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"kill")));
  buttonFreeze.setAttribute('style','left:'+MC_leftB3+'px; position:absolute; width:28px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#FFF0F0 !important; color:inherit !important; border-top:0; overflow:hidden;');
  buttonFreeze.appendChild(buttonKillDiv);
  buttonFreeze.addEventListener('mouseover', function() { this.style.setProperty("color", "#E00000", "important"); }, true);
  buttonFreeze.addEventListener('mouseout',  function() { this.style.setProperty("color", "inherit", "important"); }, true);
  buttonFreeze.addEventListener('click',     function() { player_freeze(ytplayer_name); }, true);
  user_select(buttonFreeze,'none');
  mediabar.appendChild(buttonFreeze);


  // 4th group
  if(check_on_youtubewatchpage()) {
    var eurl=get_embedURL();
    if(eurl) {
      var buttonEUInner=document.createElement('div');
      buttonEUInner.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"embed")));
      buttonEUInner.setAttribute('style','color:#0000F0; font-size:14px; position:absolute; top:-1px; left:1px; width:38px; text-align:center; line-height:28px; color:#0033CC !important; text-decoration:none !important;');
      buttonEUInner.textContent=String.fromCharCode(10065);

      var buttonEU=document.createElement('div');
      buttonEU.setAttribute('style','left:'+(lgref-108)+'px; position:absolute; width:39px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#F0F0FF !important; border-top:0;');
      buttonEU.appendChild(buttonEUInner);
      buttonEU.addEventListener('mouseover' , function() { this.style.setProperty("background","#E0E0FF",'important'); buttonEUInner.style.setProperty("text-decoration","underline","important"); }, true);
      buttonEU.addEventListener('mouseout'  , function() { this.style.setProperty("background","#F0F0FF",'important'); buttonEUInner.style.setProperty("text-decoration","none","important"); }, true);
      buttonEU.addEventListener('click'     , function() { player_pause(ytplayer_name); }, true);
      user_select(buttonEU,'none');

      var buttonEULink=document.createElement('a');
      buttonEULink.setAttribute('href',eurl);
      buttonEULink.setAttribute('target','_blank');
      buttonEULink.appendChild(buttonEU);
      mediabar.appendChild(buttonEULink);
    } else { show_alert('Media Controller : Global variable for "Embed URL" not found',0); }

    var fsurl=get_fullscreenURL();
    if(fsurl) {
      var buttonFSInner=document.createElement('div');
      buttonFSInner.setAttribute('title',HtmlUnicodeDecode(get_text_MC(page_lang,"fscr")));
      buttonFSInner.setAttribute('style','color:#0000F0; font-size:14px; position:absolute; top:-1px; left:1px; width:60px; text-align:center; line-height:28px; color:#0033CC !important; text-decoration:none !important;');
      buttonFSInner.textContent=String.fromCharCode(8738,8194,8194,8194,10065);

      var buttonFS=document.createElement('div');
      buttonFS.setAttribute('style','left:'+(lgref-68)+'px; position:absolute; width:66px; height:'+MC_height+'px; border: 1px solid #CCCCCC !important; cursor:pointer; background:#F0F0FF !important; border-top:0;');
      buttonFS.appendChild(buttonFSInner);
      buttonFS.addEventListener('mouseover' , function() { this.style.setProperty("background","#E0E0FF",'important'); buttonFSInner.style.setProperty("text-decoration","underline","important"); }, true);
      buttonFS.addEventListener('mouseout'  , function() { this.style.setProperty("background","#F0F0FF",'important'); buttonFSInner.style.setProperty("text-decoration","none","important"); }, true);
      buttonFS.addEventListener('click'     , function() { player_pause(ytplayer_name); }, true);
      user_select(buttonFS,'none');

      var buttonFSLink=document.createElement('a');
      buttonFSLink.setAttribute('href',fsurl);
      buttonFSLink.setAttribute('target','_blank');
      buttonFSLink.appendChild(buttonFS);
      mediabar.appendChild(buttonFSLink);
    } else { show_alert('Media Controller : Global variable for "Fullscreen URL" not found',0); }
  }
  yt_p.insertBefore(mediabar, yt_ns);

  // Horizontal offset fix
  var leftdiff=mediabar.offsetLeft-ytplayer.offsetLeft;
  if(leftdiff!=0) { mediabar.style.left=(-leftdiff)+'px'; }

  // Vertical offset fix
  var ytplayer_height=ytplayer.getAttribute('height');
  var topdiff=mediabar.offsetTop-ytplayer_height-ytplayer.offsetTop;
  if(topdiff!=0) { mediabar.style.top=(-topdiff)+'px'; }

  player_check_limit(ytplayer_name);
}

function check_jsapi(vars) {
  var temp=vars.match(/enablejsapi\=(\d+)/i);
  if(temp) { if(temp[1]!="1") { return vars+temp.replace(/enablejsapi\=\d+/i,'enablejsapi=1'); } }
  else { return vars+'&enablejsapi=1'; }
}

function check_autoplay(vars) {
  if(GM_getValue("Youtube_Download_Autoplay_Setting",2)==0) {
    var temp=vars.match(/autoplay\=(\d+)/i);
    if(temp) { if(temp[1]!="0") { return vars+temp.replace(/enablejsapi\=\d+/i,'autoplay=0'); } }
    else { return vars+'&autoplay=0'; }
  }
  return vars;
}

function bind_player_with_media_controller(page_lang,player,number) {
  if(player.getAttribute('mc_embedtype')) { return; } // Already binded
  var src_name="src"; // EMBED and VIDEO Tag
  if(player.nodeName.toUpperCase()=="OBJECT") { src_name="data"; } // OBJECT Tag
  var player_src=player.getAttribute(src_name);
  if(player_src.match(/^http\:\/\/(\w+\.)?youtube\.com\/\w+\//i)) { // Object Embeded youtube video
    if(!player.id) { player.setAttribute('id','Youtube_movie-'+number); }
    player.setAttribute(src_name,check_autoplay(check_jsapi(player_src)));
    player.setAttribute('allowscriptaccess','always');
    flushNode(player);
    media_controller(page_lang,player.id,2);
  } else if(player_src.match(/^http\:\/\/(\w+\.)?ytimg\.com\//i)) { // Normal youtube video
    if(!player.id) { player.setAttribute('id','Youtube_movie-'+number); }
    var flashvars = player.getAttribute('flashvars');
    if(GM_getValue("Youtube_Download_Autoplay_Setting",2)==0) {
      var autoplay = flashvars.match(/autoplay\=(\d+)/i);
      if(!(autoplay)) {
        player.setAttribute('flashvars',flashvars+'&autoplay=0');
        flushNode(player);
      } else if (autoplay[1]!=0) {
        player.setAttribute('flashvars',flashvars.replace(/autoplay\=\d+/i,"autoplay=0"));
        flushNode(player);
      }
    }
    media_controller(page_lang,player.id,1);
  }
}

function bind_media_players(page_lang) {
  var players=null;
  try { players=document.evaluate('//embed[@src]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); } catch(err) { players=null; }
  if(players) {
    var players_lg=players.snapshotLength;
    for(var h=0;h<players_lg;h++) { bind_player_with_media_controller(page_lang,players.snapshotItem(h),h); }
    return;
  }
  try { players=document.getElementsByTagName("embed"); } catch(err) { players=null; }
  if(players) {
    var players_lg=players.length;
    for(var h=0;h<players_lg;h++) { bind_player_with_media_controller(page_lang,players[h],h); }
    return;
  }
  var msg="Media Controller: Impossible to get media players (XPath and getElementsByTagName failed)";
  show_alert(msg,1);
}

function add_media_controller(page_lang) {
  bind_media_players(page_lang);
}

//************************************** Useful Sub-routines *********************************************//
function remove_watch_element(elementname) {
  if(check_on_youtube()) {
    var el=document.getElementById(elementname);
    if(el) { el.parentNode.removeChild(el); }
  }
}

function remove_watch_parent_element(elementname) {
  if(check_on_youtube()) {
    var el=document.getElementById(elementname);
    if(el) { var elp=el.parentNode; elp.parentNode.removeChild(elp); }
  }
}

function HtmlUnicodeDecode(str) {
  // Change HTML code "&#xxxxx;" to Unicode
  var out="";
  if(str==null) { return(out); }
  var l=str.length;
  for (var i=0; i<l; i++) {
    var ch=str.charAt(i);
    if(ch=='&') {
      var sci=str.indexOf(';',i+1);
      if(sci>0) {
        var entity=str.substring(i+1,sci);
        if(entity.length>1 && entity.charAt(0)=='#') {
          entity=entity.substring(1);
          if(entity.charAt(0).toLowerCase()=='x') { ch=String.fromCharCode(parseInt('0'+entity)); }
          else { ch=String.fromCharCode(parseInt(entity)); }
        }
        i=sci;
      }
    }
    out+=ch;
  }
  return out;
}

function getHeight(element) {
  // All Width and Height properties give 0 on elements with display none,
  // so enable the element temporarily
  var els = element.style;
  var originalVisibility = els.visibility;
  var originalPosition = els.position;
  var originalDisplay = els.display;
  els.visibility = 'hidden';
  els.position = 'absolute';
  els.display = 'block';
  var originalHeight = element.clientHeight;
  els.display = originalDisplay;
  els.position = originalPosition;
  els.visibility = originalVisibility;
  return originalHeight;
}

function isPositiveInteger(value) { return (value.toString().search(/^\d+$/)==0); }

function isDefined(x) { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null; }

function flushNode(el) { el.parentNode.replaceChild(el.cloneNode(true),el); }

function swap_display(element) {
  var els = element.style;
  if(els.display=="none") { els.display="block"; } else { els.display="none"; }
}

function user_select(element,value) {
  var els = element.style;
  if(isDefined(els.userSelect)) {els.userSelect=value;} // CSS3
  else if (isDefined(els.MozUserSelect)) {els.MozUserSelect=value;} // Mozilla
}






function show_alert(msg, force) {
  if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; }
  GM_log('('+arguments.callee.counter+') '+msg);
  if(force==0) { return; }
  // Show a HTML alert box (only for watch pages or if forced)
  if(force==1 || check_on_youtubewatchpage()) {
    warningelem=document.createElement('div');
    warningelem.setAttribute("style","color:#FFFFFF; background:#FF8000; width:auto; text-align:center; font-size:24px; border: 3px solid #CC0088; margin:2px;");
    warningelem.textContent=msg;
    document.body.insertBefore(warningelem, document.body.firstChild);
    //document.body.appendChild(warningelem);
  }
}

//******************************************* Main() *****************************************************//
function mediacontrollermenu() {
  var page_lang="www";
  try { page_lang=get_page_lang();       } catch(err) { show_alert('Initialisation failed: '+err); }
  try { add_media_controller(page_lang); } catch(err) { show_alert('media_controller => '   +err); }
}

function main() {
  // Clear onYouTubePlayerReady
  unsafeWindow.onYouTubePlayerReady=function() {};

  // Bind event for loop and autoplay (YouTube Watch pages only)
  try { bind_movie_player_event(); } catch(err) { show_alert('bind_movie_player_event => '+err); }

  // Get page info
  var page_lang="www"; var page_fmt=0;
  try { page_fmt=get_page_fmt(); page_lang=get_page_lang(); } catch(err) { show_alert('Initialisation failed: '+err); }

  // Miscellaneous (remove unneeded items)
  remove_watch_parent_element(WATCH_PROMOTED);
  remove_watch_element(DEFAULT_LANG_BOX);

  // change_links (part of Quality Selector) (image_preview_rollover included) (change_links must be the first to run)
  try { change_links(page_fmt);                    } catch(err) { show_alert('change_links => '    +err); }
  // Download Link    (YouTube Watch pages only)
  try { add_download_link(page_lang, page_fmt);    } catch(err) { show_alert('download_link => '   +err); }
  // Quality Selector (YouTube Watch pages only)
  try { add_quality_selector(page_lang, page_fmt); } catch(err) { show_alert('quality_selector => '+err); }
  // Media Controller
  try { add_media_controller(page_lang);           } catch(err) { show_alert('media_controller => '+err); }

  // Add menu to rebind Media Controller
  GM_registerMenuCommand("Media Controller - Rebind", mediacontrollermenu );
}
main();

} )();
// ]]>
