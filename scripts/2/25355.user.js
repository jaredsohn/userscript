// ==UserScript==
// @name           Orkut Manager
// @version        2.99.99
// @author         Bruno Leonardo Michels
// @profile        http://www.orkut.com/Profile?uid=11584069900845257050
// @scripturl      http://userscripts.org/scripts/show/25355
// @addonurl       https://addons.mozilla.org/en-US/firefox/addon/45353
// @namespace      System
// @description    Manage Orkut; Quote messages; Toolbar in topics and scrapbook; Quick reply; Signature; Default colors; Bookmark communities or topics; Set a topic as chat; Make menus; Communities and topic list auto update; Keyboard shortcuts; Script auto update
// @include        htt*://*.orkut.*
// ==/UserScript==
function GMSetValue(id, value)
{
    GM_setValue(id, value);
}
function GMGetValue(id)
{
    var x = "";
    try
    {
        x = GM_getValue(id);
    }
    catch (e)
    {
        x = "";
    }
    return x;
}

GMSetValue("Version", "2.99.99");

var CommunityId;
var CommunityTopicId;
InitializeComponents();

// Drag n' Drop
var IsDragging;
var DragFunction;
var DragCurrentX, DragCurrentY;
var DragX, DragY;

// Quote Tools
var QuoteGetter = "&quote=";
var RegexTrim = /^\s+|\s+$/g;
var RegexArg = /[^\?]+\?/;

// URLs
var URLRoot = window.location.href.replace(/(http:\/\/[^/]+).*/i, "$1") + "/";

var URLHome = "/Home";
var URLScrap = "/Scrapbook";
var URLPost = "/CommMsgPost?";
var URLMessages  = "/CommMsgs";
var URLCmm = "/Communities";
var URLCmmMain = "/Community";
var URLCmmTopics = "/CommTopics";

var URLAlbum = "/Album";
var URLAlbumZoom = "/AlbumZoom";

var URLOMConfig = "/OMConfig";
var URLOMConfigSave = "/OMConfigSave"
var URLOMConfigMenu = "/OMConfigMenu";
var URLOMConfigMenuSave = "/OMConfigMenuSave";
var URLOMHelp = "/OMHelp";
var URLOMCredits = "/OMCredits";

var URLMemberManager = "CommMemberManage";

// Keys
var KeyUp = 38;   var KeyDown = 40;
var KeyLeft = 37; var KeyRight= 39;

var Key0 = 48; var Key1 = 49; var Key2 = 50; var Key3 = 51; var Key4 = 52;
var Key5 = 53; var Key6 = 54; var Key7 = 55; var Key8 = 56; var Key9 = 57;

var KeyA = 65; var KeyB = 66; var KeyC = 67; var KeyD = 68; var KeyE = 69;
var KeyF = 70; var KeyG = 71; var KeyH = 72; var KeyI = 73; var KeyJ = 74;
var KeyK = 75; var KeyL = 76; var KeyM = 77; var KeyN = 78; var KeyO = 79;
var KeyP = 80; var KeyQ = 81; var KeyR = 82; var KeyS = 83; var KeyT = 84;
var KeyU = 85; var KeyV = 86; var KeyW = 87; var KeyX = 88; var KeyY = 89;
var KeyZ = 90;

// Images
var ImageBookmarkOn = "http://i26.tinypic.com/11ae8p1.png";
var ImageBookmarkOff= "http://i26.tinypic.com/2m2t1dc.png";
var ImageNew = "http://i30.tinypic.com/242xto6.jpg";

// Special Chars
var SpecialCharStrikeCode = 822; var SpecialCharStrike = String.fromCharCode(SpecialCharStrikeCode);

// Default General CFG
var DefaultCfg = "&Language=English&TextAreaTextBegin=&TextAreaTextEnd=&TextAreaTextHtmlBegin=&TextAreaTextHtmlEnd=&TextAreaScrapTextBegin=&TextAreaScrapTextEnd=&QuoteHeaderText=%24USER%24%20@%20%24TIME%24&QuoteBegin=%5Bnavy%5D%5Bi%5D&QuoteEnd=%5B/i%5D%5B/navy%5D&QuoteHeaderBegin=%5Bnavy%5D%5Bi%5D&QuoteHeaderEnd=%5B/i%5D%5B/navy%5D&QuoteHtmlBegin=%3Cdiv%20style%3D%27background%3A%20%23C8E1FF%3B%20border%3A%202px%20LightSkyBlue%20solid%3B%20color%3A%20black%3B%20font-size%3A%2090%25%3B%20margin-left%3A%2020px%3B%20margin-right%3A%2020px%3B%20padding%3A%202px%203px%202px%203px%27%3E&QuoteHtmlEnd=%3C/div%3E&QuoteHeaderHtmlBegin=%3Cdiv%20style%3D%27font-size%3A%2075%25%27%3EQuote%20%28&QuoteHeaderHtmlEnd=%29%3C/div%3E&Signature=&SignatureHtml=&SignatureScrap=&ModerationText=%5Bb%5DTitle%3A%5B/b%5D%20%24TITLE%24%0A%5Bb%5DUser%3A%5B/b%5D%20%5Bred%5D%24USER%24%5B/red%5D%20%28%5Bblue%5D%24USERLINK%24%5B/blue%5D%29%0A%5Bb%5DMessage%3A%5B/b%5D%20%24MESSAGE%24%0A%5Bb%5DAction%3A%5B/b%5D%20%0A%5Bb%5DReason%3A%5B/b%5D%20&ModerationHtmlText=%3Cb%3ETitle%3A%3C/b%3E%20%24TITLE%24%0A%3Cb%3EUser%3A%3C/b%3E%20%3Cspan%20style%3D%27color%3A%20red%27%3E%24USER%24%3C/span%3E%20%28%3Cspan%20style%3D%27color%3A%20blue%27%3E%24USERLINK%24%3C/span%3E%29%0A%3Cb%3EMessage%3A%3C/b%3E%20%24MESSAGE%24%0A%3Cb%3EAction%3A%3C/b%3E%20%0A%3Cb%3EReason%3A%3C/b%3E%20&ModerationMemberText=%5Bb%5DUser%3A%20%5B/b%5D%20%5Bred%5D%24USER%24%5B/red%5D%20%28%5Bblue%5D%24USERLINK%24%5B/blue%5D%29%0A%5Bb%5DAction%3A%5B/b%5D%20%0A%5Bb%5DReason%3A%5B/b%5D%20&ModerationMemberHtmlText=%3Cb%3EUser%3A%20%3C/b%3E%20%3Cspan%20style%3D%27color%3A%20red%27%3E%24USER%24%3C/span%3E%20%28%3Cspan%20style%3D%27color%3A%20blue%27%3E%24USERLINK%24%3C/span%3E%29%0A%3Cb%3EAction%3A%3C/b%3E%20%0A%3Cb%3EReason%3A%3C/b%3E%20&UpdateWarningType=2";
var DefaultCfgHeaderMenu = "/Main%23Home&Home?/Main%23Profile&Profile?/Scrapbook&Scrapbook?/Main%23Communities&Communities?/Main%23CommApprove&CmmAprv&&/Main%23Community%3Fcmm%3D13766660&%3Cspan%20style%3D%22color%3A%20Cyan%3B%22%3EBreath%20of%20Fire%20Brasil%3C/span%3E?/Main%23Community%3Fcmm%3D90840394&%3Cspan%20style%3D%22color%3A%20%237FFF00%3B%22%3EOrkut%20Manager%3C/span%3E?/Main%23Community%3Fcmm%3D70567&Prog/Comp%20BR?/Main%23Community%3Fcmm%3D10809989&Compare%20Personagens?javascript%3A%3B&-?/Main%23AlbumList&Album?/Main%23FavoriteVideos&Videos?javascript%3A%3B&-?/Main%23GeneralSettings&Edit%20Settings?/Main%23EditSummary&Edit%20Profile?javascript%3A%3B&-?/OMConfig&OM%20Config?/OMConfigMenu&OM%20Menus?/OMCredits&OM%20Credits?/OMHelp&OM%20Help?javascript%3A%3B&-?http%3A//userscripts.org/scripts/show/25355&Script%20Page?javascript%3A%3B&-?/GLogin%3Fcmd%3Dlogout&Logoff";

function IsPage(Url)
{
    var re = new RegExp("[^?]+" + Url + ".*", "i");
    return (window.location.href.replace("/Main#", "/").match(re) ? true : false);
}

// Configuration Data Init
try
{
    var First = false;
    if (!GMGetValue("Language"))
    {
        First = true;
        GMSetValue("Language", "");
    }
    if (!GMGetValue("TextAreaTextBegin")) GMSetValue("TextAreaTextBegin", "");
    if (!GMGetValue("TextAreaTextEnd")) GMSetValue("TextAreaTextEnd", "");
    if (!GMGetValue("TextAreaTextHtmlBegin")) GMSetValue("TextAreaTextHtmlBegin", "");
    if (!GMGetValue("TextAreaTextHtmlEnd")) GMSetValue("TextAreaTextHtmlEnd", "");
    if (!GMGetValue("TextAreaScrapTextBegin")) GMSetValue("TextAreaScrapTextBegin", "");
    if (!GMGetValue("TextAreaScrapTextEnd")) GMSetValue("TextAreaScrapTextEnd", "");
    if (!GMGetValue("Signature")) GMSetValue("Signature", "");
    if (!GMGetValue("SignatureHtml")) GMSetValue("SignatureHtml", "");
    if (!GMGetValue("SignatureScrap")) GMSetValue("SignatureScrap", "");
    if (!GMGetValue("QuoteHeaderText")) GMSetValue("QuoteHeaderText", "");
    if (!GMGetValue("QuoteBegin")) GMSetValue("QuoteBegin", "");
    if (!GMGetValue("QuoteEnd")) GMSetValue("QuoteEnd", "");
    if (!GMGetValue("QuoteHeaderBegin")) GMSetValue("QuoteHeaderBegin", "");
    if (!GMGetValue("QuoteHeaderEnd")) GMSetValue("QuoteHeaderEnd", "");
    if (!GMGetValue("QuoteHtmlBegin")) GMSetValue("QuoteHtmlBegin", "");
    if (!GMGetValue("QuoteHtmlEnd")) GMSetValue("QuoteHtmlEnd", "");
    if (!GMGetValue("QuoteHeaderHtmlBegin")) GMSetValue("QuoteHeaderHtmlBegin", "");
    if (!GMGetValue("QuoteHeaderHtmlEnd")) GMSetValue("QuoteHeaderHtmlEnd", "");
    if (!GMGetValue("ModerationText")) GMSetValue("ModerationText", "");
    if (!GMGetValue("ModerationHtmlText")) GMSetValue("ModerationHtmlText", "");
    if (!GMGetValue("ModerationMemberText")) GMSetValue("ModerationMemberText", "");
    if (!GMGetValue("ModerationMemberHtmlText")) GMSetValue("ModerationMemberHtmlText", "");
    if (!GMGetValue("UpdateWarningType")) GMSetValue("UpdateWarningType", "");
    if (!GMGetValue("HeaderMenu")) GMSetValue("HeaderMenu", "");
    if (!GMGetValue("HeaderMenuClear")) GMSetValue("HeaderMenuClear", "");
    if (!GMGetValue("DropdownMenu")) GMSetValue("DropdownMenu", "[/OMConfigMenu|OM Menus]");
    if (!GMGetValue("Quote")) GMSetValue("Quote", "");
    if (!GMGetValue("Moderation")) GMSetValue("Moderation", "");
    
    if (First) ConfigurationSave(DefaultCfg);
}
catch (ex) { }

// #region CONFIGURATION
function GetErrorPageContainer()
{
    var Container = document.getElementById("mboxfullr").getElementsByTagName("table")[0];
    Container = Container.getElementsByTagName("td");
    var C = "";
    for (i in Container)
    {
        C = Container[i];
        if (C.className == "boxmid") break;
    }
    Container = C;
    return Container;
}
// #endregion


// #region LANGUAGE
var Language = GMGetValue("Language").toLowerCase() || "english";
// #endregion


// #region TEXTAREA
var TextAreaTextBegin = GMGetValue("TextAreaTextBegin") ? GMGetValue("TextAreaTextBegin") : "";
var TextAreaTextEnd = GMGetValue("TextAreaTextEnd") ? GMGetValue("TextAreaTextEnd") : "";

var TextAreaTextHtmlBegin = GMGetValue("TextAreaTextHtmlBegin") ? GMGetValue("TextAreaTextHtmlBegin") : "";
var TextAreaTextHtmlEnd = GMGetValue("TextAreaTextHtmlEnd") ? GMGetValue("TextAreaTextHtmlEnd") : "";

var TextAreaScrapTextBegin = GMGetValue("TextAreaScrapTextBegin") ? GMGetValue("TextAreaScrapTextBegin") : "";
var TextAreaScrapTextEnd = GMGetValue("TextAreaScrapTextEnd") ? GMGetValue("TextAreaScrapTextEnd") : "";
// #endregion

// #region QUOTE
var QuoteBegin = GMGetValue("QuoteBegin") ? GMGetValue("QuoteBegin") : "";
var QuoteEnd = GMGetValue("QuoteEnd") ? GMGetValue("QuoteEnd") : "";
var QuoteHeaderBegin = GMGetValue("QuoteHeaderBegin") ? GMGetValue("QuoteHeaderBegin") : "";
var QuoteHeaderEnd = GMGetValue("QuoteHeaderEnd") ? GMGetValue("QuoteHeaderEnd") : "";

var QuoteHtmlBegin = GMGetValue("QuoteHtmlBegin") ? GMGetValue("QuoteHtmlBegin") : "";
var QuoteHtmlEnd = GMGetValue("QuoteHtmlEnd") ? GMGetValue("QuoteHtmlEnd") : "";
var QuoteHeaderHtmlBegin = GMGetValue("QuoteHeaderHtmlBegin") ? GMGetValue("QuoteHeaderHtmlBegin") : "";
var QuoteHeaderHtmlEnd = GMGetValue("QuoteHeaderHtmlEnd") ? GMGetValue("QuoteHeaderHtmlEnd") : "";

var QuoteButtonColor = "#C40098";
var QuoteHeaderText = GMGetValue("QuoteHeaderText") ? GMGetValue("QuoteHeaderText") : "";
var ShowHeader = true;
// #endregion

// #region SIGNATURE
var Signature = GMGetValue("Signature") ? GMGetValue("Signature") : "";
var SignatureHtml = GMGetValue("SignatureHtml") ? GMGetValue("SignatureHtml") : "";

var SignatureScrap = GMGetValue("SignatureScrap") ? GMGetValue("SignatureScrap") : "";
// #endregion

// #region MODERATION
var ModerationText = GMGetValue("ModerationText") ? GMGetValue("ModerationText") : "";
var ModerationHtmlText = GMGetValue("ModerationHtmlText") ? GMGetValue("ModerationHtmlText") : "";
var ModerationMemberText = GMGetValue("ModerationMemberText") ? GMGetValue("ModerationMemberText") : "";
var ModerationMemberHtmlText = GMGetValue("ModerationMemberHtmlText") ? GMGetValue("ModerationMemberHtmlText") : "";
// #endregion
    
// #region UPDATE SCRIPT
var UpdateWarningType = GMGetValue("UpdateWarningType") ? GMGetValue("UpdateWarningType") : "";
// #endregion

// #region LANGUAGE SETS
// #region TOOLBAR
function LanguageGetSpoiler()
{
    switch (Language)
    {
        case "portuguese":
            return "<b>Aviso:</b> Esta &aacute;rea cont&eacute;m <b>revela&ccedil;&otilde;es sobre o enredo</b> (<i><span style=\\'color: red\\'>spoilers</span></i>).";
        case "spanish":
            return "<b>Atenci&oacute;n:</b> Esta area contiene <b>revelaciones acerca del enredo</b> (<i><span style=\\'color: red\\'>spoilers</span></i>).";
        case "english":
        default:
            return "<b>Warning:</b> This area contains <b>revelations about the plot</b> (<i><span style=\\'color: red\\'>spoilers</span></i>).";
    }
}
function LanguageGetFonts()
{
    switch (Language)
    {
        case "portuguese":
            return "Fontes";
        case "spanish":
            return "Fuentes";
        case "english":
        default:
            return "Fonts";
    }
}
function LanguageGetColors()
{
    switch (Language)
    {
        case "portuguese":
            return "Cores";
        case "spanish":
            return "Colores";
        case "english":
        default:
            return "Colors";
    }
}
function LanguageGetIcons()
{
    switch (Language)
    {
        case "portuguese":
            return "Icones";
        case "spanish":
            return "Iconos";
        case "english":
        default:
            return "Icons";
    }
}
function LanguageGetMaskLinks()
{
    switch (Language)
    {
        case "portuguese":
            return "QuebraLinks";
        case "spanish":
            return "QuebraEnlaces";
        case "english":
        default:
            return "MaskLinks";
    }
}
function LanguageGetCrypt()
{
    switch (Language)
    {
        case "portuguese":
            return "Criptografar";
        case "spanish":
            return "Cifrar";
        case "english":
        default:
            return "Crypt";
    }
}
function LanguageGetDecrypt()
{
    switch (Language)
    {
        case "portuguese":
            return "Descriptografar";
        case "spanish":
            return "Descifrar";
        case "english":
        default:
            return "Decrypt";
    }
}
function LanguageGetDate()
{
    switch (Language)
    {
        case "portuguese":
            return "Data";
        case "spanish":
            return "Fecha";
        case "english":
        default:
            return "Date";
    }
}
function LanguageGetTime()
{
    switch (Language)
    {
        case "portuguese":
            return "Hora";
        case "spanish":
            return "Horas";
        case "english":
        default:
            return "Time";
    }
}
// #endregion
// #region USER MENU
function LanguageGetUserMenuProfile()
{
    switch (Language)
    {
        case "portuguese":
            return "Perfil";
        case "spanish":
            return "Perfil";
        case "english":
        default:
            return "Profile";
    }
}
function LanguageGetUserMenuScrapbook()
{
    switch (Language)
    {
        case "portuguese":
            return "Recados";
        case "spanish":
            return "Mensajes";
        case "english":
        default:
            return "Scrapbook";
    }
}
function LanguageGetUserMenuAlbum()
{
    switch (Language)
    {
        case "portuguese":
            return "&Aacute;lbum";
        case "spanish":
            return "&Aacute;lbum";
        case "english":
        default:
            return "Album";
    }
}
function LanguageGetUserMenuVideos()
{
    switch (Language)
    {
        case "portuguese":
            return "V&iacute;deos";
        case "spanish":
            return "Videos";
        case "english":
        default:
            return "Videos";
    }
}
function LanguageGetUserMenuAddFriend()
{
    switch (Language)
    {
        case "portuguese":
            return "Adicionar amigo";
        case "spanish":
            return "A&ntilde;adir un amigo";
        case "english":
        default:
            return "Add as a friend";
    }
}
// #endregion
// #region QUICK REPLY
function LanguageGetQuickReplyCurrentDisabled()
{
    switch (Language)
    {
        case "portuguese":
            return "Atual: desativado";
        case "spanish":
            return "Actual: desactivado";
        case "english":
        default:
            return "Current disabled";
    }
}
function LanguageGetQuickReplyCurrentEnabled()
{
    switch (Language)
    {
        case "portuguese":
            return "Atual: ativado";
        case "spanish":
            return "Actual: activado";
        case "english":
        default:
            return "Current enabled";
    }
}
function LanguageGetQuickReplyFormLabel()
{
    switch (Language)
    {
        case "portuguese":
            return "Resp r&aacute;pida c/ HTML: ";
        case "spanish":
            return "Resp r&aacute;pida c/ HTML: ";
        case "english":
        default:
            return "QuickReply accept HTML: ";
    }
}
function LanguageGetQuickReplyButtonEnable()
{
    switch (Language)
    {
        case "portuguese":
            return "Ativar";
        case "spanish":
            return "Activar";
        case "english":
        default:
            return "Enable";
    }
}
function LanguageGetQuickReplyButtonDisable()
{
    switch (Language)
    {
        case "portuguese":
            return "Desativar";
        case "spanish":
            return "Desactivar";
        case "english":
        default:
            return "Disable";
    }
}
// #endregion
// #region MODERATION
function LanguageGetModerationMarkedMod()
{
    switch (Language)
    {
        case "portuguese":
            return "Marcado como mod";
        case "spanish":
            return "Marcado como mod";
        case "english":
        default:
            return "Marked as mod";
    }
}
function LanguageGetModerationSetMod()
{
    switch (Language)
    {
        case "portuguese":
            return "Marcar como mod";
        case "spanish":
            return "Marcar como mod";
        case "english":
        default:
            return "Set as mod";
    }
}
function LanguageGetModerationMod()
{
    switch (Language)
    {
        case "portuguese":
            return "Moderar";
        case "spanish":
            return "Moderar";
        case "english":
        default:
            return "Mod";
    }
}
// #endregion
// #region CHAT
function LanguageGetChatRemove()
{
    switch (Language)
    {
        case "portuguese":
            return "Remover chat";
        case "spanish":
            return "Quitar el chat";
        case "english":
        default:
            return "Remove chat";
    }
}
function LanguageGetChatSet()
{
    switch (Language)
    {
        case "portuguese":
            return "Marcar chat";
        case "spanish":
            return "Adiccionar chat";
        case "english":
        default:
            return "Set chat";
    }
}
// #endregion
// #region CONTROLS
function LanguageGetButtonBack()
{
    switch (Language)
    {
        case "portuguese":
            return "Voltar";
        case "spanish":
            return "Volver";
        case "english":
        default:
            return "Back";
    }
}
function LanguageGetButtonRefresh()
{
    switch (Language)
    {
        case "portuguese":
            return "Atualizar";
        case "spanish":
            return "Actualizar";
        case "english":
        default:
            return "Refresh";
    }
}
function LanguageGetButtonQuickReply()
{
    switch (Language)
    {
        case "portuguese":
            return "Resp Rap";
        case "spanish":
            return "Resp Rap";
        case "english":
        default:
            return "QReply";
    }
}
function LanguageGetButtonConfig()
{
    switch (Language)
    {
        case "portuguese":
            return "Configura&ccedil;&atilde;o";
        case "spanish":
            return "Configuraciones";
        case "english":
        default:
            return "Config";
    }
}
function LanguageGetButtonConfigMenu()
{
    switch (Language)
    {
        case "portuguese":
            return "Menu";
        case "spanish":
            return "Menu";
        case "english":
        default:
            return "Menu";
    }
}
function LanguageGetButtonCredits()
{
    switch (Language)
    {
        case "portuguese":
            return "Cr&eacute;ditos";
        case "spanish":
            return "Cr&eacute;ditos";
        case "english":
        default:
            return "Credits";
    }
}
function LanguageGetButtonHelp()
{
    switch (Language)
    {
        case "portuguese":
            return "Ajuda";
        case "spanish":
            return "Ayuda";
        case "english":
        default:
            return "Help";
    }
}
function LanguageGetButtonDefault()
{
    switch (Language)
    {
        case "portuguese":
            return "Padr&atilde;o";
        case "spanish":
            return "Por defecto";
        case "english":
        default:
            return "Default";
    }
}
function LanguageGetButtonExport()
{
    switch (Language)
    {
        case "portuguese":
            return "Exportar";
        case "spanish":
            return "Exportar";
        case "english":
        default:
            return "Export";
    }
}
function LanguageGetButtonImport()
{
    switch (Language)
    {
        case "portuguese":
            return "Importar";
        case "spanish":
            return "Importar";
        case "english":
        default:
            return "Import";
    }
}
function LanguageGetButtonSave()
{
    switch (Language)
    {
        case "portuguese":
            return "Salvar";
        case "spanish":
            return "Guardar";
        case "english":
        default:
            return "Save";
    }
}
function LanguageGetButtonCancel()
{
    switch (Language)
    {
        case "portuguese":
            return "Cancelar";
        case "spanish":
            return "Cancelar";
        case "english":
        default:
            return "Cancel";
    }
}
function LanguageGetButtonDownload()
{
    switch (Language)
    {
        case "portuguese":
            return "Download";
        case "spanish":
            return "Descarga";
        case "english":
        default:
            return "Download";
    }
}
function LanguageGetButtonSettings()
{
    switch (Language)
    {
        case "portuguese":
            return "Op&ccedil;&otilde;es";
        case "spanish":
            return "Opciones";
        case "english":
        default:
            return "Settings";
    }
}
function LanguageGetButtonForum()
{
    switch (Language)
    {
        case "portuguese":
            return "F&oacute;rum";
        case "spanish":
            return "Foro";
        case "english":
        default:
            return "Forum";
    }
}
function LanguageGetButtonLast()
{
    switch (Language)
    {
        case "portuguese":
            return "&Uacute;ltima";
        case "spanish":
            return "&Uacute;ltima";
        case "english":
        default:
            return "Last";
    }
}
// #endregion
// #region BOOKMARKS
function LanguageGetBookmarks()
{
    switch (Language)
    {
        case "portuguese":
            return "Favoritos";
        case "spanish":
            return "Marcadores";
        case "english":
        default:
            return "Bookmarks";
    }
}
function LanguageGetBookmarksTopics()
{
    switch (Language)
    {
        case "portuguese":
            return "Fav t&oacute;picos";
        case "spanish":
            return "Marc t&oacute;picos";
        case "english":
        default:
            return "Topics";
    }
}
// #endregion

// #region PAGE CONFIGURATION
function LanguageGetConfigurationPageTitle()
{
    switch (Language)
    {
        case "portuguese":
            return "Configura&ccedil;&atilde;o";
        case "spanish":
            return "Configuracion";
        case "english":
        default:
            return "Configuration";
    }
}
function LanguageGetConfigurationLanguage()
{
    switch (Language)
    {
        case "portuguese":
            return "Idioma";
        case "spanish":
            return "Idioma";
        case "english":
        default:
            return "Language";
    }
}
function LanguageGetConfigurationPrefix()
{
    switch (Language)
    {
        case "portuguese":
            return "Prefixo";
        case "spanish":
            return "Prefijo";
        case "english":
        default:
            return "Prefix";
    }
}
function LanguageGetConfigurationSufix()
{
    switch (Language)
    {
        case "portuguese":
            return "Sufixo";
        case "spanish":
            return "Sufijo";
        case "english":
        default:
            return "Sufix";
    }
}
function LanguageGetConfigurationHeader()
{
    switch (Language)
    {
        case "portuguese":
            return "Cab.";
        case "spanish":
            return "Cab.";
        case "english":
        default:
            return "Header";
    }
}
function LanguageGetConfigurationSignature()
{
    switch (Language)
    {
        case "portuguese":
            return "Assinatura";
        case "spanish":
            return "Firma";
        case "english":
        default:
            return "Signature";
    }
}
function LanguageGetConfigurationText()
{
    switch (Language)
    {
        case "portuguese":
            return "Texto";
        case "spanish":
            return "Texto";
        case "english":
        default:
            return "Text";
    }
}
function LanguageGetConfigurationTopic()
{
    switch (Language)
    {
        case "portuguese":
            return "Topico";
        case "spanish":
            return "Topico";
        case "english":
        default:
            return "Topic";
    }
}
function LanguageGetConfigurationMember()
{
    switch (Language)
    {
        case "portuguese":
            return "Membro";
        case "spanish":
            return "Miembro";
        case "english":
        default:
            return "Member";
    }
}
function LanguageGetConfigurationModeration()
{
    switch (Language)
    {
        case "portuguese":
            return "Modera&ccedil;&atilde;o";
        case "spanish":
            return "Moderación";
        case "english":
        default:
            return "Moderation";
    }
}
function LanguageGetConfigurationUpdateLabel()
{
    switch (Language)
    {
        case "portuguese":
            return "Alertas";
        case "spanish":
            return "Alertas";
        case "english":
        default:
            return "Warnings";
    }
}
function LanguageGetConfigurationUpdateBugfix()
{
    switch (Language)
    {
        case "portuguese":
            return "Bugfix ou maior";
        case "spanish":
            return "Bugfix o mayor";
        case "english":
        default:
            return "Bugfix or higher";
    }
}
function LanguageGetConfigurationUpdateMinor()
{
    switch (Language)
    {
        case "portuguese":
            return "Minor ou maior";
        case "spanish":
            return "Minor o mayor";
        case "english":
        default:
            return "Minor or higher";
    }
}
function LanguageGetConfigurationUpdateMajor()
{
    switch (Language)
    {
        case "portuguese":
            return "Apenas Major";
        case "spanish":
            return "S&oacute;lo Major";
        case "english":
        default:
            return "Major updates only";
    }
}
function LanguageGetConfigurationUpdateNone()
{
    switch (Language)
    {
        case "portuguese":
            return "N&atilde;o mostrar updates";
        case "spanish":
            return "No mostrar updates";
        case "english":
        default:
            return "Don't show updates";
    }
}
function LanguageGetConfigurationResetSettings()
{
    switch (Language)
    {
        case "portuguese":
            return "Voc&ecirc; gostaria de recuperar as configura&ccedil;&otilde;es padr&otilde;es?";
        case "spanish":
            return "¿Desea restaurar la configuración por defecto?";
        case "english":
        default:
            return "Do you want to restore default settings?";
    }
}
function LanguageGetConfigurationSaveSuccess()
{
    switch (Language)
    {
        case "portuguese":
            return "Configurações salvas com sucesso!";
        case "spanish":
            return "Configuración guardada con éxito!";
        case "english":
        default:
            return "Configurations saved successfully!";
    }
}
function LanguageGetConfigurationExport()
{
    switch (Language)
    {
        case "portuguese":
            return "Copie & salve o link (para importar cole)";
        case "spanish":
            return "Copiar y guardar el enlace (pegar para descargar)";
        case "english":
        default:
            return "Copy & save this link (to import paste)";
    }
}
function LanguageGetConfigurationImport()
{
    switch (Language)
    {
        case "portuguese":
            return "Cole o link (exportado)";
        case "spanish":
            return "Pegue el enlace (exportado)";
        case "english":
        default:
            return "Paste the link (exported)";
    }
}
// #endregion
// #region UPDATE
function LanguageGetUpdateNotify(Version, UpdateType)
{
    switch (Language)
    {
        case "portuguese":
            return "(Usando v" + GMGetValue("Version") + "). <b>Orkut Manager v" + Version + " foi lançado.</b> Update tipo '" + UpdateType + "'. ";
        case "spanish":
            return "(Utilizando v" + GMGetValue("Version") + "). <b>Orkut Manager v" + Version + " fue lanzado.</b> Update tipo '" + UpdateType + "'. ";
        case "english":
        default:
            return "(Using v" + GMGetValue("Version") + "). <b>Orkut Manager v" + Version + " is out.</b> Update type '" + UpdateType + "'. ";
    }
}
// #endregion
// #region MENU CFG
function LanguageGetConfigMenuDropdown()
{
    switch (Language)
    {
        case "portuguese":
            return "Menu";
        case "spanish":
            return "Menu";
        case "english":
        default:
            return "Menu";
    }
}
function LanguageGetConfigMenuHeaderMenu()
{
    switch (Language)
    {
        case "portuguese":
            return "Menu superior";
        case "spanish":
            return "Menú superior";
        case "english":
        default:
            return "Header Menu";
    }
}
function LanguageGetConfigMenuNewRow()
{
    switch (Language)
    {
        case "portuguese":
            return "Nova linha";
        case "spanish":
            return "Nueva línea";
        case "english":
        default:
            return "New row";
    }
}
function LanguageGetConfigMenuDelRow()
{
    switch (Language)
    {
        case "portuguese":
            return "Excluir linha";
        case "spanish":
            return "Borrar línea";
        case "english":
        default:
            return "Del row";
    }
}
// #endregion
// #region OTHERS
function LanguageGetDelete()
{
    switch (Language)
    {
        case "portuguese":
            return "Excluir";
        case "spanish":
            return "Borrar";
        case "english":
        default:
            return "Delete";
    }
}
function LanguageGetGetImage()
{
    switch (Language)
    {
        case "portuguese":
            return "Pegar imagem";
        case "spanish":
            return "Obtener imagen";
        case "english":
        default:
            return "Get image";
    }
}
// #endregion
// #endregion

// Init menu
HeaderMenuMain();
HeaderMenuFix();

// #region HEADER MENU
try
{
    if (GMGetValue("HeaderMenuClear")) HeaderMenuClear();
    var HeaderMenus = GMGetValue("HeaderMenu") || "";
    if (HeaderMenus.length <= 0) throw new Exception();
    HeaderMenus = HeaderMenus.split("][");
    for (i in HeaderMenus)
    {
        var Menu = HeaderMenus[i];
        Menu = Menu.replace(/\[|\]/g, "");
        var Link = (Menu.split("|"))[0];
        var Name = (Menu.split("|"))[1];
        HeaderMenuNew(Link, Name);
    }
}
catch (ex) { }
// #endregion

// #region Dropdown MENU
try
{
    var Menus = GMGetValue("DropdownMenu") || "";
    if (Menus.length <= 0) throw new Exception();
    Menus = Menus.split("][");
    for (i in Menus)
    {
        var Menu = Menus[i];
        Menu = Menu.replace(/\[|\]/g, "");
        var Link = (Menu.split("|"))[0];
        var Name = (Menu.split("|"))[1];
        if (Name == "-") Name = "";
        HeaderMenuMainNew(Link, Name);
    }
}
catch (ex) { }
// #endregion

/// <summary>
/// ************************************************
///           Manual Configuration Start
/// ************************************************
/// </summary>
var SlowConnection = false;

if (IsPage(URLScrap) || IsPage(URLPost) || IsPage(URLMessages))
{
// #region TOOLBAR
var ToolbarBackgroundColor = "#FFFFFF";
var ToolbarButtonSize = "17px";
var ToolbarButtonStyle = "style='cursor: pointer; height: " + ToolbarButtonSize + "; width: " + ToolbarButtonSize + "'";
var StylePointer = "style='cursor:pointer'";
var jsGetElement = "var post = this; do { post = post.parentNode; } while (post && post.id != 'kToolBar'); post = post.nextSibling; if (!post.tagName) post = post.nextSibling; var selectionStart = post.selectionStart; var selectionEnd = post.selectionEnd; var psel = post.value.substr((post.selectionStart), (post.selectionEnd - post.selectionStart)); var PostPre = post.value.substr(0, post.selectionStart); var PostSuf = post.value.substr(post.selectionEnd); var PostSel = psel;";
var jsRestorefocus = " post.selecionStart = selectionStart; post.selectionEnd = selectionEnd; ";
var Tools =
    new Array(
        new Array /* Toolbar Layout: Blank */
        (
            "",			// Display Button
            "{|}",		// HTML code ;  {|} = Cursor
            "{|}",		// code		 ;	{|} = Cursor
			""			// false	 = 	Do not use codes, use button script
        ),
        new Array /* Bold */
        (
            "<img alt='' src='http://i25.tinypic.com/x5s93a.jpg' title='bold' " + ToolbarButtonStyle + " />",
            "<b>{|}</b>",
            "[b]{|}[/b]"
        ),
        new Array /* Italic */
        (
            "<img alt='' src='http://i28.tinypic.com/bevl13.gif' title='italic' " + ToolbarButtonStyle + " />",
            "<i>{|}</i>",
            "[i]{|}[/i]"
        ),
        new Array /* Underline */
        (
            "<img alt='' src='http://i25.tinypic.com/2ugfo7c.jpg' title='underline' " + ToolbarButtonStyle + " />",
            "<u>{|}</u>",
            "[u]{|}[/u]"
        ),
        new Array /* Strike */
        (
            "<img alt='' src='http://i27.tinypic.com/2im4a9.jpg' title='strike' " + ToolbarButtonStyle + " />",
            "<s>{|}</s>",
            ""
        ),
        new Array /* Strike fake (no-html) */
        (
            "<img alt='' src='http://i27.tinypic.com/2im4a9.jpg' " +
            "onclick=\"" + jsGetElement + "function ToolbarStrikeFake(s){var i = 0;var x = 0;var f ='';for (i=0;i<s.length;++i){x = s.charCodeAt(i); f += String.fromCharCode(x) + String.fromCharCode(" + SpecialCharStrikeCode + ");}return f;} post.value = post.value.substr(0, post.selectionStart) + ToolbarStrikeFake(psel) + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" " +
            "title='strike' " + ToolbarButtonStyle + " />",
            "",
            "{|}"
        ),
        new Array /* Blink */
        (
            "<img alt='' src='http://i25.tinypic.com/15nniis.png' title='blink' " + ToolbarButtonStyle + " />",
            "<span style=\\'text-decoration:blink\\'>{|}</span>",
            ""
        ),
        new Array /* Link */
        (
            "<img alt='' src='http://i26.tinypic.com/2gtt6vo.jpg' title='link' " + ToolbarButtonStyle + " />",
            "<a href=\\'{|}\\' title=\\'\\'></a>",
            "[link={|}][/link]"
        ),
        new Array /* Image */
        (
            "<img alt='' src='http://i27.tinypic.com/1zbf62a.jpg' title='Image' " + ToolbarButtonStyle + " />",
            "<img src=\\'{|}\\' style=\\'max-width: 100%\\' />",
            "[link]{|}[/link]"
        ),
        new Array /* Source */
        (
            "<img alt='' src='http://i32.tinypic.com/291exir.png' title='source' " + ToolbarButtonStyle + " />",
            "<div style=\\'border: 1px dashed rgb(47, 111, 171); padding: 5px; background-color: rgb(249, 249, 249); color: black; line-height: 1.1em;\\'><pre style=\\'margin:0px; padding: 1em; overflow:scroll; width: 97%;\\'>{|}</pre></div>",
            ""
        ),
        new Array /* Source (no-html) */
        (
            "<img alt='' src='http://i32.tinypic.com/291exir.png' title='source' " + ToolbarButtonStyle + " " +
            "onclick=\"" +
            jsGetElement +
            "if (!PostPre) PostPre = '.'; " +
            "post.value = PostPre + (PostSel.replace(/ /g, String.fromCharCode(160))) + PostSuf; " +
            "\" />",
            "",
            "{|}",
            "false"
        ),
        new Array /* Spoilers */
        (
            "<img alt='SPOILERS' src='http://i32.tinypic.com/mn0k5.jpg' title='SPOILERS' " + ToolbarButtonStyle + " />",
            "<div style=\\'border-top: 1px solid rgb(255, 204, 102); border-bottom: 1px solid rgb(255, 204, 102); margin: 10px 0px; padding: 5px 0px 5px 3px; background-color: rgb(255, 253, 223); text-align: left; font-size: 90%;\\'>" + LanguageGetSpoiler() + "</div>[yellow]{|}[/yellow]",
            ""
        ),
        new Array /* Quotation */
        (
            "<img alt='' src='http://i26.tinypic.com/2e249bq.png' title='quote' " + ToolbarButtonStyle + " />",
            "<q style=\\'font-style:italic;\\'>{|}</q>",
            ""
        ),
        new Array /* Fonts */
        (
            "<img alt='' src='http://i25.tinypic.com/2i9t5lf.jpg' " + ToolbarButtonStyle + " /> <select>" +
                "<option disabled selected>" + LanguageGetFonts() + "</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Arial'>Arial</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Arno Pro'>Arno Pro</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Book Antiqua'>Book Antiqua</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Bookman Old Style'>Bookman Old Style</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Calibri'>Calibri</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Comic Sans MS'>Comic Sans MS</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: DEATH FONT ver1\.0'>DEATH FONT ver1\\.0</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Diablo'>Diablo</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Final Fantasy '>Final Fantasy</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: MS Mincho'>MS Mincho</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Ninja Naruto'>Ninja Naruto</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Sand'>Sand</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Tahoma'>Tahoma</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Time New Roman'>Time New Roman</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-family:' + this.value + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value;' style='font-family: Verdana'>Verdana</option>" +
            "</select>",
            "{|}",
            "",
            "false"
        ),
        new Array /* Font Grow */
        (
            "<img alt='' src='http://i28.tinypic.com/34yu4xe.jpg' " + ToolbarButtonStyle + " />",
            "<big>{|}</big>",
            ""
        ),
        new Array /* Font Shrink */
        (
            "<img alt='' src='http://i30.tinypic.com/fxgysk.jpg' " + ToolbarButtonStyle + " />",
            "<small>{|}</small>",
            ""
        ),
        new Array /* Font Size */
        (
            "<img alt='' src='http://i27.tinypic.com/303gz2v.jpg' " + ToolbarButtonStyle + " /> <select>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">0</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">6</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">8</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">9</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">10</option>" +
            "<option selected onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">11</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">12</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">14</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">16</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">18</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">20</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">22</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">26</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">30</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">36</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">48</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">72</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">100</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">500</option>" +
            "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'font-size:' + this.value + 'px\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\">1000</option>" +
            "</select>",
            "{|}",
            "",
            "false"
        ),
        new Array /* Toolbar Layout: New Line */
        (
            "<br />",
            "{|}",
            "{|}"
        ),
        new Array /* Highlight HTML */
        (
            "<span style=\"width: 20px;background-color:navy; background-position: -3px 50%;\">&nbsp;&nbsp;&nbsp;&nbsp;</span> <select style='width: 80px'>" +
                "<option disabled selected>" + "Highlight" + "</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i32.tinypic.com/161108p.png)';\"  style='background-color: maroon'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i28.tinypic.com/2vum07a.png)';\"  style='background-color: red'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i30.tinypic.com/29cweio.png)';\"  style='background-color: orange'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i26.tinypic.com/1zc0km8.jpg)';\"  style='background-color: navy'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i26.tinypic.com/1zc0km8.png)'\"  style='background-color: blue'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i31.tinypic.com/ionqwy.png)'\"  style='background-color: aqua'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i27.tinypic.com/2csgnx0.png)'\"  style='background-color: teal'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i31.tinypic.com/f3xag9.png)'\"  style='background-color: green'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i30.tinypic.com/wu1jdd.png)'\"  style='background-color: lime'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i28.tinypic.com/28k0ady.png)'\"  style='background-color: olive'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i27.tinypic.com/2jg80uv.png)'\"  style='background-color: gold'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i29.tinypic.com/2pseuqt.png)'\"  style='background-color: yellow'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i26.tinypic.com/1sd1e1.png)'\"  style='background-color: gray'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i29.tinypic.com/2qizpqx.png)'\"  style='background-color: silver'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i32.tinypic.com/znmzwz.png)'\"  style='background-color: purple'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i29.tinypic.com/s4vrkx.png)'\"  style='background-color: fuchsia'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i30.tinypic.com/rit2j4.png)'\"  style='background-color: violet'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'background-color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundImage= 'url(http://i25.tinypic.com/6xpyxd.png)'\"  style='background-color: pink'>&nbsp;</option>" +
            "</select>",
            "{|}",
            "",
            "false"
        ),
        new Array /* Color picker HTML */
        (
            "<span style='width: 16px;background-color:navy;'>&nbsp;&nbsp;&nbsp;&nbsp;</span> <select style='width: 65px'>" +
                "<option disabled selected>" + LanguageGetColors() + "</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: maroon'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: red'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: orange'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: navy'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: blue'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: aqua'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: teal'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: green'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: lime'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: olive'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: gold'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: yellow'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: gray'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: silver'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: purple'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: fuchsia'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: violet'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '<span style=\\'color: ' + this.style.backgroundColor + '\\'>{|}</span>' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: pink'>&nbsp;</option>" +
            "</select>",
            "{|}",
            "",
            "false"
        ),
        new Array /* Color picker */
        (
            "<span style='width: 16px;background-color:navy;'>&nbsp;&nbsp;&nbsp;&nbsp;</span> <select style='width: 65px'>" +
                "<option disabled selected>" + LanguageGetColors() + "</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\" style='background-color: maroon'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: red'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: orange'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: navy'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: blue'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: aqua'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: teal'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: green'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: lime'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: olive'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: gold'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: yellow'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: gray'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: silver'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: purple'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: fuchsia'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: violet'>&nbsp;</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.style.backgroundColor + ']{|}[/' + this.style.backgroundColor + ']' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus(); this.parentNode.selectedIndex=0;\" onmouseover=\"this.parentNode.parentNode.firstChild.style.backgroundColor=this.style.backgroundColor;\"  style='background-color: pink'>&nbsp;</option>" +
            "</select>",
            "",
            "{|}",
            "false"
        ),
        new Array /* Emoticons */
        (
            "<b><img alt='' src='http://img1.orkut.com/img/i_bigsmile.gif' /></b> <select>" +
                "<option disabled selected>" + LanguageGetIcons() + "</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.value + ']{|}' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value; this.parentNode.previousSibling.previousSibling.firstChild.src=\"http://img1.orkut.com/img/i_smile.gif\";' style='background-image: url(http://img1.orkut.com/img/i_smile.gif); background-repeat: no-repeat; background-position: left; padding-left: 20px;'>:)</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.value + ']{|}' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value; this.parentNode.previousSibling.previousSibling.firstChild.src=\"http://img1.orkut.com/img/i_wink.gif\";' style='background-image: url(http://img1.orkut.com/img/i_wink.gif); background-repeat: no-repeat; background-position: left; padding-left: 20px;'>;)</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.value + ']{|}' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value; this.parentNode.previousSibling.previousSibling.firstChild.src=\"http://img1.orkut.com/img/i_bigsmile.gif\";' style='background-image: url(http://img1.orkut.com/img/i_bigsmile.gif); background-repeat: no-repeat; background-position: left; padding-left: 20px;'>:D</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.value + ']{|}' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value; this.parentNode.previousSibling.previousSibling.firstChild.src=\"http://img1.orkut.com/img/i_funny.gif\";' style='background-image: url(http://img3.orkut.com/img/i_funny.gif); background-repeat: no-repeat; background-position: left; padding-left: 20px;'>:P</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.value + ']{|}' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value; this.parentNode.previousSibling.previousSibling.firstChild.src=\"http://img1.orkut.com/img/i_confuse.gif\";' style='background-image: url(http://img4.orkut.com/img/i_confuse.gif); background-repeat: no-repeat; background-position: left; padding-left: 20px;'>/)</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.value + ']{|}' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value; this.parentNode.previousSibling.previousSibling.firstChild.src=\"http://img1.orkut.com/img/i_cool.gif\";' style='background-image: url(http://img3.orkut.com/img/i_cool.gif); background-repeat: no-repeat; background-position: left; padding-left: 20px;'>8)</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.value + ']{|}' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value; this.parentNode.previousSibling.previousSibling.firstChild.src=\"http://img1.orkut.com/img/i_surprise.gif\";' style='background-image: url(http://img4.orkut.com/img/i_surprise.gif); background-repeat: no-repeat; background-position: left; padding-left: 20px;'>:o</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.value + ']{|}' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value; this.parentNode.previousSibling.previousSibling.firstChild.src=\"http://img1.orkut.com/img/i_sad.gif\";' style='background-image: url(http://img4.orkut.com/img/i_sad.gif); background-repeat: no-repeat; background-position: left; padding-left: 20px;'>:(</option>" +
                "<option onclick=\"" + jsGetElement + " post.value = post.value.substr(0, post.selectionStart) + '[' + this.value + ']{|}' + post.value.substr(post.selectionEnd); var focus = post.value.lastIndexOf('{|}'); post.value = post.value.replace('{|}', psel); post.selectionStart = focus; post.selectionEnd = focus + psel.length; post.focus();\" onmouseover='this.parentNode.value=this.value; this.parentNode.previousSibling.previousSibling.firstChild.src=\"http://img1.orkut.com/img/i_angry.gif\";' style='background-image: url(http://img2.orkut.com/img/i_angry.gif); background-repeat: no-repeat; background-position: left; padding-left: 20px;'>:x</option>" +
            "</select>",
            "{|}",
            "{|}",
            "false"
        ),
        new Array /* Mask Links HTML */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' " +
            "onclick=\"" +
            jsGetElement +
            "post.value = post.value.replace(/(http:\\/)()(\\/)/, '$1[b]$2[/b]$3'); " +
            "post.value = post.value.replace(/(.*?)()(\\.)([A-Z]+|[0-9]+)/ig, '$1$3[b]$2[/b]$4');" +
            "\"" +
            ">" + LanguageGetMaskLinks() + "</span>",
            "{|}",
            "",
            "false"
        ),
        new Array /* Mask Links */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' " +
            "onclick=\"" +
            jsGetElement +
            "post.value = post.value.replace(/(http:\\/)()(\\/)/, '$1[b]$2[/b]$3'); " +
            "post.value = post.value.replace(/(.*?)()(\\.)([A-Z]+|[0-9]+)/ig, '$1*$3$4');" +
            "\"" +
            ">" + LanguageGetMaskLinks() + "</span>",
            "",
            "{|}",
            "false"
        ),
        new Array /* New Line */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;'>&lt;br /&gt;</span>",
            "<br />{|}",
            ""
        ),
        new Array /* Crypt */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' onclick=\"" + jsGetElement + "function crypt(s, secret){var i = 0;var x = 0;var f ='';for (i=0;i<s.length;++i){x = s.charCodeAt(i);if (x == 32){f += String.fromCharCode(x); continue;} f += String.fromCharCode(x+secret);}return f;} post.value = (crypt(post.value, 77))\">" + LanguageGetCrypt() + "</span>",
            "{|}",
            "{|}"
        ),
        new Array /* Decrypt */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' onclick=\"" + jsGetElement + "function crypt(s, secret){var i = 0;var x = 0;var f ='';for (i=0;i<s.length;++i){x = s.charCodeAt(i);if (x == 32){f += String.fromCharCode(x); continue;} f += String.fromCharCode(x+secret);}return f;} post.value = (crypt(post.value, -77))\">" + LanguageGetDecrypt() + "</span>",
            "{|}",
            "{|}"
        ),
        new Array /* Date */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' onclick=\"" + jsGetElement + "function GetDate(){var dt = new Date();var d = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();var m = dt.getMonth() < 10 ? '0' + (dt.getMonth()+1) : (dt.getMonth()+1);var y = dt.getFullYear(); return y + '-' + m + '-' + d;} post.value= post.value.substr(0, post.selectionStart) + GetDate() + post.value.substring(post.selectionEnd);\">" + LanguageGetDate() + "</span>",
            "{|}",
            "{|}"
        ),
        new Array /* Time */
        (
            "<span style='cursor: pointer; font-size: 85%; font-weight: bold;' onclick=\"" + jsGetElement + "function GetTime(){var dt = new Date();var s = dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds();var m = dt.getMinutes() < 10 ? '0' + (dt.getMinutes()) : (dt.getMinutes());var h = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours(); return h + ':' + m + ':' + s;} post.value= post.value.substr(0, post.selectionStart) + GetTime() + post.value.substring(post.selectionEnd);\">" + LanguageGetTime() + "</span>",
            "{|}",
            "{|}"
        )
    );
// #endregion
}

/// <summary>
/// ************************************************
///           Manual Configuration End
/// ************************************************
/// </summary>

// #region SYSTEM SETUP
function InitializeComponents()
{
    var args = (window.location.href.replace(RegexArg, "")).split("&");
    CommunityId = args[0] ? args[0].split("=")[1] : 0;
    CommunityTopicId = args[1] ? args[1].split("=")[1] : 0;
}

// #region SYSTEM SETTINGS
if (!IsPage(URLOMConfig))
{
    TextAreaTextBegin = (IsHtmlEnabled() ? TextAreaTextHtmlBegin : TextAreaTextBegin);
    TextAreaTextEnd = (IsHtmlEnabled() ? TextAreaTextHtmlEnd : TextAreaTextEnd);

    QuoteBegin = (IsHtmlEnabled() ? QuoteHtmlBegin : QuoteBegin);
    QuoteEnd = (IsHtmlEnabled() ? QuoteHtmlEnd : QuoteEnd);
    QuoteHeaderBegin = (IsHtmlEnabled() ? QuoteHeaderHtmlBegin : QuoteHeaderBegin);
    QuoteHeaderEnd = (IsHtmlEnabled() ? QuoteHeaderHtmlEnd : QuoteHeaderEnd);

    Signature = (IsHtmlEnabled() ? SignatureHtml : Signature);
}

if (IsPage("Scrapbook"))
{
    TextAreaTextBegin = TextAreaScrapTextBegin;
    TextAreaTextEnd = TextAreaScrapTextEnd;
    Signature = SignatureScrap;
}

// Focus length
var FocusLength = TextAreaTextEnd.length + Signature.length;
// #endregion
// #endregion


// #region SYSTEM FUNCTIONS
window.mouseX = 200;
window.mouseY = 200;
window.addEventListener("mousemove",
    function (e)
    {
        window.mouseX = e.pageX;
        window.mouseY = e.pageY;
    }, false);
function ArrayRemoveNullValues(arr)
{
    for (i = 0; i < arr.length; ++i)
    {
        if (arr[i].replace(RegexTrim, "") == "" || arr[i] == null)
        {
            arr.splice(i, 1);
            --i;
        }
    }
    return arr;
}

function GetElementsByClassName(TagName, ClassName, Parent)
{
    if (!Parent) Parent = document;
    var Els = Parent.getElementsByTagName(TagName);
    var C = new Array();
    for (i in Els)
    {
        var E = Els[i];
        if (!E) continue;
        if (E.className && E.className.toLowerCase() == ClassName.toLowerCase())
        {
            C.push(E);
        }
    }
    return C;
}

function StringCommaArrayRemove(StringArray, Id)
{
    StringArray = StringArray.split(",");
    StringArray.splice(StringArray.indexOf(Id), 1);
    return StringArray.join(",");
}

function StringUpperFirst(Str)
{
    return Str.substr(0, 1).toUpperCase() + Str.substr(1);
}

// #region DRAG N' DROP
function DragMouseDown(e, Element, Function)
{
    IsDragging = true;
    DragFunction = Function;
    DragCurrentX = Element.offsetLeft;
    DragCurrentY = Element.offsetTop;
    DragX = e.pageX;
    DragY = e.pageY;
    window.status = IsDragging;
}

function DragMouseUp()
{
    IsDragging = false;
    DragFunction = "";
}

function DragMouseMove(e, Element)
{
    if (IsDragging)
    {
        if (DragFunction == "Move")
        {
            Element.style.position = "absolute";
            Element.style.left = (e.pageX - DragX + DragCurrentX);
            Element.style.top  = (e.pageY - DragY + DragCurrentY);
        }
        if (DragFunction == "Resize")
        {
            Element.style.width = (e.pageX - DragCurrentX) + "px";
            Element.style.height = (e.pageY - DragCurrentY - 27) + "px";
        }
    }
}
// #endregion

/// <summary>
/// Ajax Request Page handle in Func
/// </summary>
/// <Param name="Page">Url</Param>
/// <Param name="Func">Function to handle</Param>
function AjaxRequest(Page, Func)
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: (window.location.href.match(/^(http:\/\/[^/]+)/)[0]) + Page + "cache=" + (new Date().getTime()),
        onload: Func
    });
}

/// <summary>
/// Ajax Request Page handle in Func
/// </summary>
/// <Param name="Page">Url</Param>
/// <Param name="Func">Function to handle</Param>
function AjaxRequestExtern(Page, Func)
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: Page + "cache=" + (new Date().getTime()),
        onload: Func
    });
}
// #endregion

// #region SCRIPT FUNCTIONS
function GetParam(Name)
{
    var p;
    var r = new RegExp("(\\?|&)" + Name + "=([^&]*)")
    try
    {
        p = (window.location.href).match(r);
        if (p.length >= 3) return p[2];
        else return "";
    }
    catch (ex) { return false; }
}
function IsHtmlEnabled(IsFrame)
{
    if (IsPage(URLScrap)) return true;
    if (!IsPage("/Comm")) return false;
    if (!IsPage("/CommMsgPost")) return IsQuickReply();
    
    var Container = window.document;
    if (IsFrame)
        Container = document.getElementById("orkutFrame").contentDocument;

    var Check = Container.getElementById("charCount");
    if (!Check) return false;
    Check = Check.parentNode.parentNode;
    var Permission = Check.innerHTML.replace(/<.*?>/g, "");
    Permission = Permission.substr(Permission.indexOf("HTML"));

    if (Permission.match(/^\s*HTML.{10,}\.\s*$/i))
        return true;
    else
        return false;
    return false;
}

function GetTextPreview(Prev)
{
    if (!IsHtmlEnabled()) Prev = Prev.replace(/</ig, "&lt;").replace(/>/ig, "&gt;");
    Prev = Prev.replace(/([^>])\r*\n/g, "$1<br />");
    
    Prev = Prev.replace(/\[b\]/ig, "<b>");
    Prev = Prev.replace(/\[\/b\]/ig, "</b>");
    Prev = Prev.replace(/\[i\]/ig, "<i>");
    Prev = Prev.replace(/\[\/i\]/ig, "</i>");
    Prev = Prev.replace(/\[u\]/ig, "<u>");
    Prev = Prev.replace(/\[\/u\]/ig, "</u>");
    
    Prev = Prev.replace(/\[:\)\]/g, "<img alt='' src='http://img1.orkut.com/img/i_smile.gif' />");
    Prev = Prev.replace(/\[;\)\]/g, "<img alt='' src='http://img1.orkut.com/img/i_wink.gif' />");
    Prev = Prev.replace(/\[:D\]/g, "<img alt='' src='http://img1.orkut.com/img/i_bigsmile.gif' />");
    Prev = Prev.replace(/\[:P\]/g, "<img alt='' src='http://img1.orkut.com/img/i_funny.gif' />");
    Prev = Prev.replace(/\[\/\)\]/g, "<img alt='' src='http://img1.orkut.com/img/i_confuse.gif' />");
    Prev = Prev.replace(/\[8\)\]/g, "<img alt='' src='http://img1.orkut.com/img/i_cool.gif' />");
    Prev = Prev.replace(/\[:o\]/g, "<img alt='' src='http://img1.orkut.com/img/i_surprise.gif' />");
    Prev = Prev.replace(/\[:\(\]/g, "<img alt='' src='http://img1.orkut.com/img/i_sad.gif' />");
    Prev = Prev.replace(/\[:x\]/g, "<img alt='' src='http://img1.orkut.com/img/i_angry.gif' />");
    
    Prev = Prev.replace(/\[maroon\]/ig, "<span style='color: maroon'>");
    Prev = Prev.replace(/\[\/maroon\]/ig, "</span>");
    Prev = Prev.replace(/\[red\]/ig, "<span style='color: red'>");
    Prev = Prev.replace(/\[\/red\]/ig, "</span>");
    Prev = Prev.replace(/\[orange\]/ig, "<span style='color: orange'>");
    Prev = Prev.replace(/\[\/orange\]/ig, "</span>");
    Prev = Prev.replace(/\[navy\]/ig, "<span style='color: navy'>");
    Prev = Prev.replace(/\[\/navy\]/ig, "</span>");
    Prev = Prev.replace(/\[blue\]/ig, "<span style='color: blue'>");
    Prev = Prev.replace(/\[\/blue\]/ig, "</span>");
    Prev = Prev.replace(/\[aqua\]/ig, "<span style='color: aqua'>");
    Prev = Prev.replace(/\[\/aqua\]/ig, "</span>");
    Prev = Prev.replace(/\[teal\]/ig, "<span style='color: teal'>");
    Prev = Prev.replace(/\[\/teal\]/ig, "</span>");
    Prev = Prev.replace(/\[green\]/ig, "<span style='color: green'>");
    Prev = Prev.replace(/\[\/green\]/ig, "</span>");
    Prev = Prev.replace(/\[lime\]/ig, "<span style='color: lime'>");
    Prev = Prev.replace(/\[\/lime\]/ig, "</span>");
    Prev = Prev.replace(/\[olive\]/ig, "<span style='color: olive'>");
    Prev = Prev.replace(/\[\/olive\]/ig, "</span>");
    Prev = Prev.replace(/\[gold\]/ig, "<span style='color: gold'>");
    Prev = Prev.replace(/\[\/gold\]/ig, "</span>");
    Prev = Prev.replace(/\[yellow\]/ig, "<span style='color: yellow'>");
    Prev = Prev.replace(/\[\/yellow\]/ig, "</span>");
    Prev = Prev.replace(/\[gray\]/ig, "<span style='color: gray'>");
    Prev = Prev.replace(/\[\/gray\]/ig, "</span>");
    Prev = Prev.replace(/\[silver\]/ig, "<span style='color: silver'>");
    Prev = Prev.replace(/\[\/silver\]/ig, "</span>");
    Prev = Prev.replace(/\[purple\]/ig, "<span style='color: purple'>");
    Prev = Prev.replace(/\[\/purple\]/ig, "</span>");
    Prev = Prev.replace(/\[fuchsia\]/ig, "<span style='color: fuchsia'>");
    Prev = Prev.replace(/\[\/fuchsia\]/ig, "</span>");
    Prev = Prev.replace(/\[violet\]/ig, "<span style='color: violet'>");
    Prev = Prev.replace(/\[\/violet\]/ig, "</span>");
    Prev = Prev.replace(/\[pink\]/ig, "<span style='color: pink'>");
    Prev = Prev.replace(/\[\/pink\]/ig, "</span>");
    
    return Prev;
}

function GetProfileGadgetsButton(Label, Url)
{
    var Link = document.createElement("a");
    Link.href = Url;
    Link.className = "ht";
    var But = document.createElement("p");
    But.className = "lf";
    But.innerHTML = Label + "<br />";
    var Img = document.createElement("img");
    Img.style.width = "14px";
    Img.style.height = "14px";
    Img.border = "0";
    Img.src = "http://static3.orkut.com/img/castro/p_video.gif";
    But.appendChild(Img);
    var Count = document.createElement("span");
    Count.className = "largenum";
    Count.innerHTML = "X";
    But.appendChild(Count);
    Link.appendChild(But);
    
    return Link;
}

function SetTextArea(TextArea, IfEmpty)
{
    if (IfEmpty && (!TextArea.value || TextArea.value == ""))
    {
        TextArea.value = TextAreaTextBegin + TextAreaTextEnd + Signature;
        TextArea.selectionStart = TextArea.selectionEnd = TextAreaTextBegin.length;
        return;
    }
    if (IfEmpty) return;
    if (!TextArea.value ||
        (TextArea.value.indexOf(TextAreaTextBegin) == -1 ||
        TextArea.value.indexOf(TextAreaTextEnd) == -1))
    {
        TextArea.value = TextAreaTextBegin + TextAreaTextEnd;
        TextArea.selectionStart = TextArea.selectionEnd = TextAreaTextBegin.length;
    }
    if (!TextArea.value || TextArea.value.indexOf(Signature) == -1)
    {
        TextArea.value += Signature;
        TextArea.selectionStart = TextArea.selectionEnd = TextAreaTextBegin.length;
    }
}

/// <summary>
/// Create Button
/// </summary>
/// <param name="Text">Button text</param>
/// <param name="Func">Button function</param>
/// <param name="Event">Function event</param>
/// <param name="Tooltip">Tooltip</param>
function ButtonCreate(Text, Func, Event, Tooltip)
{
    var ButtonContainer = document.createElement("span");
    var ButtonPlaceHolder = document.createElement("span");
    ButtonPlaceHolder.className = "grabtn";
    
    var Button = document.createElement("a");
    Button.id = "id" + Text + CommunityId;
    Button.innerHTML = Text;
    Button.className = "btn";
    Button.href = "javascript:;";
    
    ButtonPlaceHolder.appendChild(Button);
    ButtonContainer.appendChild(ButtonPlaceHolder);
    
    var BorderRight = document.createElement("span");
    BorderRight.className = "btnboxr";
    var PixImg = document.createElement("img");
    PixImg.height = "1";
    PixImg.width = "5";
    PixImg.src = "http://img1.orkut.com/img/b.gif";
    PixImg.alt = "";
    
    if (Tooltip)
        ButtonContainer.title = Tooltip;
    
    BorderRight.appendChild(PixImg);
    ButtonContainer.appendChild(BorderRight);
    
    if (Func)
        ButtonContainer.addEventListener(Event, Func, false);
    
    return ButtonContainer;
}

// #region CHAT
function BuildChatBox()
{
    var ContainerPanel = document.createElement("div");
    var ContainerChat = document.createElement("table");
    
    ContainerPanel.id = "Chat";
    ContainerPanel.style.position = "absolute";
    ContainerPanel.style.width = "142px";
    ContainerPanel.style.zIndex= "5000";
    ContainerPanel.style.minWidth = "118px";
    ContainerPanel.style.maxWidth = "1000px";
    ContainerPanel.style.maxHeight = "700px";
    
    // Top, title
    var ContainerChatTopRow = document.createElement("tr");
    var ContainerChatBorderTopLeft = document.createElement("td");
    var ContainerChatBorderTopRight = document.createElement("td");
    ContainerChat.id = "Chat" + CommunityId;
    ContainerChat.className = "module";
    ContainerChat.style.width = "100%";
    ContainerChat.style.height= "100%";
    ContainerChat.cellSpacing = "0";
    ContainerChat.cellPadding = "0";
    
    ContainerChatBorderTopLeft.style.width = "99%";
    ContainerChatBorderTopRight.style.width= "8px";
    
    ContainerChatBorderTopLeft.style.margin = "5px 0 6px 10px";
    ContainerChatBorderTopLeft.style.lineHeight = "21px";
    ContainerChatBorderTopLeft.style.fontSize = "10px";
    ContainerChatBorderTopLeft.style.textAlign = "center";
    ContainerChatBorderTopLeft.className = "topl";
    ContainerChatBorderTopRight.className = "topr";
    ContainerChatBorderTopLeft.style.backgroundRepeat = "no-repeat";
    ContainerChatBorderTopRight.style.backgroundRepeat = "no-repeat";
    
    var ChatQuickReply = document.createElement("a");
    ChatQuickReply.href = "javascript:;";
    ChatQuickReply.innerHTML = " QReply -";
    ChatQuickReply.style.cursor = "pointer";
    ChatQuickReply.addEventListener("click",
        function ()
        {
            QuickReply(ChatTopicId);
        }, false);
    
    var ChatGo = document.createElement("a");
    ChatGo.href = URLMessages + "?cmm=" + CommunityId + "&tid=" + ChatTopicId + "&na=2&Scroll=-1";
    ChatGo.innerHTML = " Chat -";
    ChatGo.style.cursor = "pointer";
    
    var ExpandCollapse = document.createElement("a");
    ExpandCollapse.href = "javascript:;";
    ExpandCollapse.innerHTML = " [+] ";
    ExpandCollapse.style.cursor = "pointer";
    ExpandCollapse.addEventListener("click",
        function ()
        {
            var Chat = document.getElementById("Chat");
            var Width = 700;
            if (parseInt(Chat.style.width.replace(/[a-z]*/i, "")) >= Width)
            {
                Chat.style.width = "140px";
                this.innerHTML = " [+]";
            }
            else
            {
                Chat.style.width = Width + "px";
                this.innerHTML = " [-]";
            }
        }, false);
    
    ContainerChatBorderTopLeft.appendChild(ChatQuickReply);
    ContainerChatBorderTopLeft.appendChild(ChatGo);
    ContainerChatBorderTopLeft.appendChild(ExpandCollapse);
    
    ContainerChatTopRow.appendChild(ContainerChatBorderTopLeft);
    ContainerChatTopRow.appendChild(ContainerChatBorderTopRight);
    ContainerChat.appendChild(ContainerChatTopRow);
    
    // Mid, messages
    var ContainerChatRow = document.createElement("tr");
    var ContainerChatMessages = document.createElement("td");
    var ContainerChatMessagesBorder = document.createElement("td");
    ContainerChatMessages.className = "boxmid";
    ContainerChatMessagesBorder.className = "boxmidr";
    ContainerChatMessages.style.paddingBottom = "5px";
    ContainerChatMessages.style.verticalAlign = "top";

    var ContainerChatMessagesDiv = document.createElement("div");
    ContainerChatMessagesDiv.id = "ChatMessages";
    ContainerChatMessagesDiv.style.overflowY = "scroll";
    ContainerChatMessagesDiv.style.overflowX = "hidden";
    ContainerChatMessagesDiv.style.height = "200px";
    ContainerChatMessagesDiv.style.fontSize = "10px";
    ContainerChatMessagesDiv.style.backgroundColor = "#EFF7FF";
    ContainerChatMessagesDiv.innerHTML = "Loading...";
    
    ContainerChatMessages.appendChild(ContainerChatMessagesDiv);
    ContainerChatRow.appendChild(ContainerChatMessages);
    ContainerChatRow.appendChild(ContainerChatMessagesBorder);
    ContainerChat.appendChild(ContainerChatRow);
    
    // Bot, footer
    var ContainerChatBottomRow = document.createElement("tr");
    var ContainerChatBorderBottomLeft = document.createElement("td");
    var ContainerChatBorderBottomRight = document.createElement("td");
    ContainerChatBorderBottomLeft.className = "botl";
    ContainerChatBorderBottomRight.className = "botr";
    ContainerChatBorderBottomLeft.style.backgroundRepeat = "no-repeat";
    ContainerChatBorderBottomRight.style.backgroundRepeat = "no-repeat";
    
    ContainerChatBottomRow.appendChild(ContainerChatBorderBottomLeft);
    ContainerChatBottomRow.appendChild(ContainerChatBorderBottomRight);
    ContainerChat.appendChild(ContainerChatBottomRow);
    
    ContainerPanel.appendChild(ContainerChat);

    // Events
    document.body.addEventListener("mouseup", DragMouseUp, false);    
    // Move
    ContainerChatTopRow.style.cursor = "move";
    ContainerChatTopRow.addEventListener("mousedown", function (e) { DragMouseDown(e, this.parentNode.parentNode, "Move"); }, false);
    document.body.addEventListener("mousemove", function (e) { DragMouseMove(e, document.getElementById('Chat')); }, false);
    
    // Resize
    ContainerChatMessagesBorder.style.cursor = "crosshair";
    ContainerChatMessagesBorder.addEventListener("mousedown",  function (e) { DragMouseDown(e, this.parentNode.parentNode.parentNode, "Resize"); }, false);
    
    ContainerChatBottomRow.style.cursor = "crosshair";
    ContainerChatBottomRow.addEventListener("mousedown",  function (e) { DragMouseDown(e, this.parentNode.parentNode, "Resize"); }, false);
    
    document.body.addEventListener("mousemove",
        function (e)
        {
            var Messages = document.getElementById("ChatMessages");
            DragMouseMove(e, document.getElementById('Chat'));
            if (IsDragging && DragFunction == "Resize")
                Messages.style.height = Messages.parentNode.parentNode.parentNode.parentNode.style.height;
        }, false);
    
    return ContainerPanel;
}

function ChatGetMessages()
{
    function GetMessages(response)
    {
        var Page = response.responseText;
        var TemporaryContainer = document.createElement("div");
        TemporaryContainer.innerHTML = Page;
        var Elements = TemporaryContainer.getElementsByTagName("div");
        var El;
        for (var Element in Elements)
        {
            if (Elements[Element].id == "mboxfull")
            {
                El = Elements[Element];
                break;
            }
        }
        if (!El) return;
        Elements = El.getElementsByTagName("div");

        var Users = new Array();
        var Msgs = new Array();
        for (var Element in Elements)
        {
            if (Elements[Element].className == "listitem")
            {
                Users.push(Elements[Element].getElementsByTagName("H3")[0].innerHTML);
                Msgs.push(Elements[Element].getElementsByTagName("DIV")[1].innerHTML);
            }
        }

        var ChatMessageContainer = document.getElementById("ChatMessages");
        ChatMessageContainer.innerHTML = "";
        for (var Info in Users)
        {
            ChatMessageContainer.innerHTML += "<small><b>" + Users[Info] + ":</b><br />" + Msgs[Info] + "<br /><br /></small>";
        }
        ChatMessageContainer.scrollTop = 9999999 + ChatMessageContainer.offsetHeight;
        
        Links = ChatMessageContainer.getElementsByTagName("a");
        OrkutLinksFix(Links);
    }
    AjaxRequest(URLMessages + "?cmm=" + CommunityId + "&tid=" + GMGetValue("Chat" + CommunityId) + "&na=2&", GetMessages);
}
// #endregion

// #region QUICK REPLY
/// <summary>
/// Check if community accepts quickreply
/// </summary>
function IsQuickReply()
{
    return (((GMGetValue(("QuickReply" + CommunityId))) != "") ? 1 : 0);
}

/// <summary>
/// Prompt text and post
/// </summary>
/// <Param name="Tid">Topic ID, default page's tid</Param>
function QuickReply(Tid)
{
    var Header = IsQuickReply() ? TextAreaTextHtmlBegin : TextAreaTextBegin;
    var Footer = IsQuickReply() ? TextAreaTextHtmlEnd : TextAreaTextEnd;
    var Sig = IsQuickReply() ? SignatureHtml : Signature;
    
    if (!Tid) Tid = CommunityTopicId;
    
    window.addEventListener("keydown",
        function (e)
        {
            if (e.shiftKey && e.keyCode == 13)
            {
                var Area = document.getElementById("TextBoxQReply");
                var Text;
                if (!Area) return;
                Text = Area.value;
                if (Text.replace(/\s|\n|\r/g, "") == "") return;
                Text = encodeURIComponent(Header + Text + Footer + Sig);
                var Frm = document.forms[1];
                Frm.action = "/CommMsgPost?cmm=" + CommunityId + "&tid=" + Tid + "&bodyText=" + Text + "&Action.submit";
                Area.value = "";
                Frm.submit();
            }
        }, false);
    
    var Input = InputBoxCreate("QReply", "Quick Reply",
        "<textarea id='TextBoxQReply' style='width:100%'></textarea>" +
        "<br />" +
        "<div style='float: right'>" +
        "<a id='QReplySend' href='javascript:;' " +
        "onclick=\"" +
        "var Text = '" + encodeURIComponent(Header) + "' + encodeURIComponent(document.getElementById('TextBoxQReply').value) + '" + encodeURIComponent(Footer) + encodeURIComponent(Sig) + "';" +
        " document.getElementById('TextBoxQReply').value = ''; " +
        "var Frm = document.forms[1];" +
        "Frm.action = '/CommMsgPost?cmm=" + CommunityId + "&tid=" + Tid + "&bodyText=' + Text + '&Action.submit';" +
        "Frm.submit();" +
        "\"" +
        ">Send (Shift+Enter)</a>" +
        "&nbsp;&nbsp;&nbsp;" +
        "<a href='javascript:;' onclick=\"document.getElementById('QReply').style.display = 'none'; document.getElementById('OMLayer').style.display = 'none';\">Cancel</a>" +
        "</div>"
        );
    if (Input)
        document.body.appendChild(Input);
    
    LayerShow();
    ElementShow("QReply", window.mouseX - 100, window.mouseY - 50);
    document.getElementById("TextBoxQReply").focus();
}
function QuickReplyThis(Id)
{
    if (!Id) Id = "QTextboxReply";
    var Area = document.getElementById(Id);
    var Text;
    if (!Area) return;
    Text = Area.value;
    if (Text.replace(/\s|\n|\r/g, "") == "") return;
    Text = encodeURIComponent(Text);
    var Frm = document.forms[1];
    Frm.action = "/CommMsgPost?cmm=" + CommunityId + "&tid=" + CommunityTopicId + "&bodyText=" + Text + "&Action.submit";
    Area.value = "";
    Frm.submit();
}
function QuickReplyShow()
{
    var div = document.getElementById("Footage").getElementsByTagName("div")[0];
    if (div.style.display == "none")
    {
        div.style.display = "";
        try
        {
            div.getElementsByTagName("textarea")[0].selectionStart =
                div.getElementsByTagName("textarea")[0].selectionEnd = TextAreaTextBegin.length;
            div.getElementsByTagName("textarea")[0].focus();
        }
        catch (e) {}
    }
    else
        div.style.display = "none";
}
// #endregion // Quick Reply

// #region TOOLBAR
function ToolbarCreate(Id, IsFrame, Mode)
{
    if (!Id) Id = "messageBody";

    var ContainerToolbar = document.getElementById(Id);
    if (!ContainerToolbar)
        ContainerToolbar = document.getElementById("orkutFrame").contentDocument.getElementById('messageBody');
    if (ContainerToolbar)
    {
        ContainerToolbar.style.width = "100%";
        ContainerToolbar = ContainerToolbar.parentNode;
        ContainerToolbar.style.width = "99%";
        
        var items = "";
        var mode;
        if (Mode == 1 || Mode == 2)
            mode = Mode;
        else
            mode = (IsHtmlEnabled(IsFrame) ? 1 : 2);
        for (i = 0; i < Tools.length; ++i)
        {
            var ToolAuto = true;
            if (Tools[i][mode].length == 0) continue;
            if (Tools[i].length > 3)
            {
                ToolAuto = (Tools[i][3] == "true");
            }
            items += "<span style='vertical-align:middle;' ";
            if (ToolAuto)
                items +=
                    "onclick=\"";
                    items += "var post = document.getElementById('" + Id + "'); ";
                    items += "var psel = post.value.substr((post.selectionStart), (post.selectionEnd - post.selectionStart));"+
                    "post.value = post.value.substr(0, post.selectionStart) + '" +
                    Tools[i][mode] +
                    "' + post.value.substr(post.selectionEnd);" +
                    "var focus = post.value.lastIndexOf('{|}');" +
                    "post.value = post.value.replace('{|}', psel);" + 
                    "post.selectionStart = focus; post.selectionEnd = focus + psel.length;" +
                    "post.focus(); \"";
            items += ">" +
                Tools[i][0] +
                "</span>" +
                " <span style='border-left: 1px solid silver; padding-top: 0px;'>&nbsp;</span>";
        }
        var Sep = document.createElement("div");
        Sep.style.lineHeight = "5px";
        var Bar = document.createElement("div");
        Bar.id = "kToolBar";
        Bar.style.border = "1px solid silver";
        Bar.style.padding = "2px 2px 2px 2px";
        Bar.style.backgroundColor = ToolbarBackgroundColor;
        Bar.innerHTML = items;
        ContainerToolbar.insertBefore(Bar, ContainerToolbar.firstChild);
        ContainerToolbar.insertBefore(Sep, ContainerToolbar.firstChild);
    }
}
// #endregion

// #region Header Menu Items
function HeaderMenuGetContainer()
{
    var Container;
    var Uls = document.getElementById("headerin").getElementsByTagName("ul");
    for (i in Uls)
    {
        var Ul = Uls[i];
        if (Ul.className == "menu")
        {
            Container = Ul;
            break;
        }
    }
    return Container;
}

function HeaderMenuMain()
{
    var Container = HeaderMenuGetContainer();
    var MenuButton = Container.getElementsByTagName("li")[0].getElementsByTagName("a")[0];
    MenuButton.href = "javascript:;";

    MenuButton.addEventListener("click",
        function ()
        {
            var Menu = document.getElementById("OMMenu");
            if (Menu.style.display == "none")
            {
                Menu.style.display = "";
            }
            else
            {
                Menu.style.display = "none";
            }
        }, false);
    
    var Menu = document.createElement("div");
    Menu.id = "OMMenu";
    Menu.style.backgroundColor = "#5888C6";
    Menu.style.border = "2px solid white";
    Menu.style.color = "white";
    Menu.style.padding = "5px";
    Menu.style.overflow = "hidden";
    
    Menu.style.display = "none";
    Menu.style.position = "absolute";
    Menu.style.top = "30px";
    Menu.style.zIndex = "500";
    Menu.style.width = "200px";
    document.getElementById("container").appendChild(Menu);
}

function HeaderMenuMainNew(Link, Text)
{
    var Menu = document.getElementById("OMMenu");
    var Item = document.createElement("a");
    if (Text)
    {
        Item.style.color = "white";
        Item.style.fontSize = "11px";
        Item.href = Link;
        Text = (IsPage(Link.replace("Main#", "")) ? "<b>" + Text + "</b>" : Text);
        Item.innerHTML = "- " + Text;
        Menu.appendChild(Item);
        Menu.appendChild(document.createElement("br"));
    }
    else
    {
        var Sep = document.createElement("div");
        Sep.style.borderTop = "1px solid #DEEFFF";
        Sep.style.margin = "5px 2px 5px 2px";
        Sep.style.fontSize = "0px";
        Sep.innerHTML = "&nbsp;";
        Menu.appendChild(Sep);
    }
}

function HeaderMenuNew(Link, Text, FontSize)
{
    var Container = HeaderMenuGetContainer();
    var ContainerItem = document.createElement("li");
    var Item = document.createElement("a");
    if (FontSize) Item.style.fontSize = FontSize;
    Item.href = Link;
    Text = (IsPage(Link.replace("Main#", "")) ? "<b>" + Text + "</b>" : Text);
    Item.innerHTML = Text;
    
    ContainerItem.appendChild(Item);
    ContainerItem.appendChild(document.createTextNode("\u00a0|\u00a0"));
    Container.appendChild(ContainerItem);
}

function HeaderMenuClear()
{
    var Container = HeaderMenuGetContainer();
    var Lis = Container.getElementsByTagName("li");
    for (i = 1; i < Lis.length; ++i)
    {
        var Li = Lis[i];
        Li.style.display = "none";
    }
}

function HeaderMenuFix()
{
    var Container = HeaderMenuGetContainer();
    var Lis = Container.getElementsByTagName("li");
    for (i = 1; i < Lis.length; ++i)
    {
        var Li = Lis[i];
        var Link = Li.getElementsByTagName("a")[0];
        var Fix = Link.innerHTML.replace(/P.gina de (.*?)/i, "$1");
        Link.innerHTML = StringUpperFirst(Fix);
        
        if (Link.href.match(/Scrapbook/i))
            Link.href = Link.href.replace("Main#", "");
            
        if (i == (Lis.length - 1))
        {
            Li.appendChild(document.createTextNode("\u00a0|\u00a0"));
        }
    }
}
// #endregion

// #region TOOLTIP
function TooltipCreate(Id, Text)
{
    var Tooltip = document.getElementById(Id);
    if (Tooltip) return;
    Tooltip = document.createElement("div");
    Tooltip.id = Id;
    Tooltip.innerHTML = Text;
    
    // Style
    Tooltip.style.backgroundColor = "#FFFFDE";
    Tooltip.style.border = "1px solid #FFCF63";
    
    // Position
    Tooltip.style.position = "absolute";
    Tooltip.style.zIndex = "10000";
}
// #endregion

function ElementShow(Id, X, Y)
{
    var Element = document.getElementById(Id);
    Element.style.display = "";
    Element.style.left = X;
    Element.style.top = Y;
}
function ElementHide(Id)
{
    var Element = document.getElementById(Id);
    Element.style.display = "none";
}
function ElementHideFade(Id)
{
    var Element = document.getElementById(Id);
    if (Element.style.opacity == "") Element.style.opacity = "1";
    setTimeout("function a() { var el = document.getElementById('" + Id + "'); if (el.style.opacity > 0.03) { el.style.opacity = el.style.opacity - 0.02; setTimeout('a()', 150); } else { el.style.display = 'none'; } } a();", 1000);
}

// #region BOX
function InputBoxCreate(Id, Title, Content, Width, Height)
{
    var ContainerPanel = document.createElement("div");
    ContainerPanel.id = Id;
    ContainerPanel.style.width = Width ? Width : "300px";
    ContainerPanel.style.height = Height ? Height : "100px";
    ContainerPanel.style.zIndex = "10001";
    ContainerPanel.style.position = "absolute";
    ContainerPanel.style.display = "none";
    var Table = document.createElement("table");
    Table.className = "module";
    Table.style.width = "100%";
    Table.style.height= "100%";
    Table.cellSpacing = "0";
    Table.cellPadding = "0";
    
    // Header
    var ContainerInputTopRow = document.createElement("tr");
    var ContainerInputBorderTopLeft = document.createElement("td");
    var ContainerInputBorderTopRight = document.createElement("td");
    
    ContainerInputTopRow.style.height = "14px";
    ContainerInputBorderTopLeft.style.width = "99%";
    ContainerInputBorderTopRight.style.width= "8px";
    ContainerInputBorderTopLeft.style.margin = "5px 0 6px 10px";
    ContainerInputBorderTopLeft.style.lineHeight = "21px";
    ContainerInputBorderTopLeft.style.fontSize = "10px";
    ContainerInputBorderTopLeft.style.textAlign = "center";
    ContainerInputBorderTopLeft.className = "topl_g";
    ContainerInputBorderTopRight.className = "topr_g";
    ContainerInputBorderTopLeft.style.backgroundRepeat = "no-repeat";
    ContainerInputBorderTopRight.style.backgroundRepeat = "no-repeat";
    
    if (Title != "")
        Title = "<h2>" + Title + "</h2>";
    ContainerInputBorderTopLeft.innerHTML = Title;
    var Close = document.createElement("div");
    Close.style.cssFloat = "right";
    Close.style.position = "absolute";
    Close.style.top = "0";
    Close.style.right = "15";
    Close.style.fontSize = "11px";
    Close.style.color = "red";
    Close.style.cursor = "pointer";
    Close.innerHTML = " x ";
    Close.addEventListener("click",
        function ()
        {
            document.getElementById(Id).style.display = "none";
            try
            {
                document.getElementById("OMLayer").style.display = "none";
            }
            catch (ex) {}
        }, false);
    
    ContainerInputBorderTopLeft.appendChild(Close);
    
    ContainerInputTopRow.appendChild(ContainerInputBorderTopLeft);
    ContainerInputTopRow.appendChild(ContainerInputBorderTopRight);
    Table.appendChild(ContainerInputTopRow);
    
    // Content
    var ContainerInputRow = document.createElement("tr");
    var ContainerInputLeft = document.createElement("td");
    var ContainerInputRight = document.createElement("td");
    ContainerInputLeft.className = "boxmidlrg";
    ContainerInputRight.className = "boxmidr";
    ContainerInputLeft.style.paddingBottom = "5px";
    ContainerInputLeft.style.verticalAlign = "top";
    
    ContainerInputLeft.innerHTML = Content;
    
    ContainerInputRow.appendChild(ContainerInputLeft);
    ContainerInputRow.appendChild(ContainerInputRight);
    Table.appendChild(ContainerInputRow);
    
    // Footer
    var ContainerInputBottomRow = document.createElement("tr");
    var ContainerInputBorderBottomLeft = document.createElement("td");
    var ContainerInputBorderBottomRight = document.createElement("td");
    ContainerInputBorderBottomLeft.className = "botl";
    ContainerInputBorderBottomRight.className = "botr";
    ContainerInputBorderBottomLeft.style.backgroundRepeat = "no-repeat";
    ContainerInputBorderBottomRight.style.backgroundRepeat = "no-repeat";
    
    ContainerInputBottomRow.appendChild(ContainerInputBorderBottomLeft);
    ContainerInputBottomRow.appendChild(ContainerInputBorderBottomRight);
    Table.appendChild(ContainerInputBottomRow);
    
    ContainerPanel.appendChild(Table);
    
    return ContainerPanel;
}
// #endregion

// #region User Menu
function UserMenuCreate(Index, Uid, Width, Height)
{
    if (!Width) Width = 180;
    if (!Height) Height = 100;
    var Return = InputBoxCreate("UserMenu" + Index, "User Menu",
        "<div style='font-size: 11px'>" +
        "<a href='/Main#Profile?uid=" + Uid + "'><img alt='' src='http://static4.orkut.com/img/castro/p_profile.gif' /> " + LanguageGetUserMenuProfile() + "</a>" +
        "<br />" +
        "<a href='/Scrapbook?uid=" + Uid + "'><img alt='' src='http://static1.orkut.com/img/castro/p_scrap.gif' /> " + LanguageGetUserMenuScrapbook() + "</a>" +
        "<br />" +
        "<a href='/Main#AlbumList?uid=" + Uid + "'><img alt='' src='http://static4.orkut.com/img/castro/p_camera.gif' /> " + LanguageGetUserMenuAlbum() + "</a>" +
        "<br />" +
        "<a href='/Main#FavoriteVideos?uid=" + Uid + "'><img alt='' src='http://static3.orkut.com/img/castro/p_video.gif' /> " + LanguageGetUserMenuVideos() + "</a>" +
        "<br />" +
        "<a href='/Main#FriendAdd?uid=" + Uid + "'><img alt='' src='/img/castro/i_friend.png' /> " + LanguageGetUserMenuAddFriend() + "</a>" +
        "</div>",
        Width, Height);
    return Return;
}
// #endregion

// #region LAYERS
window.addEventListener("keydown",
    function (e)
    {
        if (e.keyCode == 27) // ESC
        {
            var Divs = document.getElementsByTagName("div");
            for (i in Divs)
            {
                var Div = Divs[i];
                if (Div.style.zIndex > 9999)
                    Div.style.display = "none";
            }
        }
    }, false);
function LayerShow(Opacity)
{
    var Layer = document.getElementById("OMLayer");
    if (!Layer)
    {
        if (!Opacity) Opacity = "0.7";
        Layer = document.createElement("div");
        Layer.innerHTML = "&nbsp;";
        Layer.id = "OMLayer";
        Layer.style.zIndex = "10000";
        Layer.style.opacity = Opacity;
        Layer.style.position = "fixed";
        Layer.style.top = "0";
        Layer.style.left = "0";
        Layer.style.width = "100%";
        Layer.style.height = "100%";
        Layer.style.backgroundColor = "black";
        document.body.appendChild(Layer);
    }
    else
    {
        Layer.style.opacity = Opacity;
        Layer.style.display = "";
    }
}
// #endregion

function OrkutLinksFix(Links)
{
    for (i in Links)
    {
        var Link = Links[i];
        var l = Link.getAttribute("onclick");
        if (l && l.match(/_linkInterstitial/i))
        {
            l = l.match(/\'([^\']*)\'/)[1];
            l = l.replace(/\\0?74wbr\\0?76/g, "");
            l = l.replace(/\\0?75/g, "=").replace(/\\0?46/g, "&").replace(/\\76/g, "+");
            Link.setAttribute("onclick", "");
            Link.href = l;
        }
    }
}

//////
// #region Request page updates
// Name-Id
function RequestBookmarkButton(Id)
{
    if (!GMGetValue("Bookmarks")) GMSetValue("Bookmarks", "");
    var IsBookmark = GMGetValue("Bookmarks").indexOf(Id + "]") != -1 ? true : false;
    var ImageBookmark = IsBookmark ? ImageBookmarkOn : ImageBookmarkOff;
    var EImageBookmark = document.createElement("img");
    EImageBookmark.align = "left";
    EImageBookmark.alt = "bk";
    EImageBookmark.src = ImageBookmark;
    EImageBookmark.style.cursor = "pointer";

    return EImageBookmark;
}
function RequestForumButton(Id)
{
    var Url = "/Main#CommTopics?cmm=" + Id;
    var ForumDiv = document.createElement("div");
    var Link = document.createElement("a");
    Link.style.cssFloat = "right";
    Link.style.fontSize = "10px";
    Link.href = Url;
    Link.innerHTML = "(" + LanguageGetButtonForum().toLowerCase() + ")";
    ForumDiv.style.cssFloat = "right";
    ForumDiv.style.fontSize = "10px";
    ForumDiv.appendChild(Link);
    
    return ForumDiv;
}
function RequestCmmListBookmarkAddEventListener(Length)
{
    for (i = 1; i < Length; ++i)
    {
        var Img = document.getElementById("Bookmark" + i);
        Img.addEventListener("click", BookmarkSet(), false);
    }
}
function BookmarkSet()
{
    return function ()
        {
            var El = this.parentNode.getElementsByTagName("a");
            El = (El.length >= 2) ? El[1] : El[0];
            var Id = El.href.match(/cmm=([^&]+|[^$]+)/i)[1];
            var Name = El;
            Name = Name.innerHTML.replace(/\n|<.*?>/g, "");
            var IsBookmark = GMGetValue("Bookmarks").indexOf(Id + "]") != -1 ? true : false;
            var ImageBookmark = IsBookmark ? ImageBookmarkOn : ImageBookmarkOff;
            
            if (this.src == ImageBookmarkOn)
            {
                var Values = GMGetValue("Bookmarks") || "";
                Values = Values.replace("[" + escape(Name) + "|" + (Id) + "]", "");
                GMSetValue("Bookmarks", Values);
                this.src = ImageBookmarkOff;
            }
            else
            {
                var Values = GMGetValue("Bookmarks") || "";
                GMSetValue("Bookmarks", Values + "[" + escape(Name) + "|" + (Id) + "]");
                this.src = ImageBookmarkOn;
            }
        };
}

// CmmName-Cmm-Name-Tid
function RequestBookmarkTopicButton(Id, Tid)
{
    if (!GMGetValue("BookmarksTopic")) GMSetValue("BookmarksTopic", "");
    var IsBookmark = GMGetValue("BookmarksTopic").indexOf(Tid + "]") != -1 ? true : false;
    var ImageBookmark = IsBookmark ? ImageBookmarkOn : ImageBookmarkOff;
    var EImageBookmark = document.createElement("img");
    EImageBookmark.align = "left";
    EImageBookmark.alt = "bk";
    EImageBookmark.src = ImageBookmark;
    EImageBookmark.style.cursor = "pointer";

    return EImageBookmark;
}
function RequestLastButton(Id, Tid)
{
    var Url = "/Main#CommMsgs?cmm=" + Id + "&tid=" + Tid + "&na=2&Scroll=-1";
    var ForumDiv = document.createElement("div");
    var Link = document.createElement("a");
    Link.style.cssFloat = "right";
    Link.style.fontSize = "10px";
    Link.href = Url;
    Link.innerHTML = "(" + LanguageGetButtonLast().toLowerCase() + ")";
    ForumDiv.style.fontSize = "10px";
    ForumDiv.style.cssFloat = "right";
    ForumDiv.appendChild(Link);
    
    return ForumDiv;
}
function RequestTopicListBookmarkAddEventListener(Length)
{
    for (i = 1; i < Length; ++i)
    {
        var Img = document.getElementById("Bookmark" + i);
        Img.addEventListener("click", BookmarkSetTopic(), false);
    }
}
function BookmarkSetTopic()
{
    return function ()
        {
            var CmmName;
            if (!IsPage("Communities"))
            {
                CmmName = document.getElementById("lbox").getElementsByTagName("a")[1];
                CmmName = CmmName.innerHTML.replace(/<.*?>/ig, "");
            }
            else
            {
                var sel = document.getElementById("OMCmmTopicSelect");
                CmmName = sel.options[sel.selectedIndex].innerHTML;
            }
            var Id = this.parentNode.getElementsByTagName("a")[1].href.match(/cmm=([^&]+|[^$]+)/i)[1];
            var Tid= this.parentNode.getElementsByTagName("a")[1].href.match(/tid=([^&]+|[^$]+)/i)[1];
            var Name = this.parentNode.getElementsByTagName("a")[1];
            Name = Name.innerHTML.replace(/\n|<.*?>/g, "");
            var IsBookmark = GMGetValue("BookmarksTopic").indexOf(Tid + "]") != -1 ? true : false;
            var ImageBookmark = IsBookmark ? ImageBookmarkOn : ImageBookmarkOff;

            if (this.src == ImageBookmarkOn)
            {
                var Values = GMGetValue("BookmarksTopic") || "";
                Values = Values.replace("[" + escape(CmmName) + "|" + Id + "|" + escape(Name) + "|" + Tid + "]", "");
                GMSetValue("BookmarksTopic", Values);
                this.src = ImageBookmarkOff;
            }
            else
            {
                var Values = GMGetValue("BookmarksTopic") || "";
                GMSetValue("BookmarksTopic", Values + "[" + escape(CmmName) + "|" + Id + "|" + escape(Name) + "|" + Tid + "]");
                this.src = ImageBookmarkOn;
            }
        };
}


function CommunityBookmarkButtonCreate()
{
    if (window.location.href.match(/cmm=([0-9]+)/))
    {
        var Container = document.getElementById("lbox").getElementsByTagName("a")[1];
        Container.parentNode.insertBefore(RequestBookmarkButton(CommunityId), Container.parentNode.firstChild);
        Container.parentNode.firstChild.addEventListener("click", BookmarkSet(), false);
    }
}

// #endregion
//////

// Cmms
try
{
    var CmmTopMainfix = true;
    if (IsPage(URLCmm))
    {
        var Container = document.getElementById("divBody0");
        var Cmm = document.createElement("div");
        Cmm.className = "listdark";
        Cmm.innerHTML = "<img alt='bk' align='left' src='" + ImageBookmarkOn + "' />" + "<a href='/Community?cmm=90840394'><b>Orkut Manager</b></a>";
        Container.insertBefore(Cmm, Container.firstChild);
    }
}
catch (ex) {}

// #region TABS
function BookmarkCommunityListCreate()
{
    var Communities = GMGetValue("Bookmarks").split("][");
    Communities = ArrayRemoveNullValues(Communities);
    Communities.sort();
    var Table = document.createElement("table");
    Table.className = "displaytable";
    Table.cellspacing = "0";

    var Color = true;
    for (i in Communities)
    {
        var Cmm = Communities[i];
        Cmm = Cmm.replace(/\[|\]/g, "");
        var CmmName = unescape(Cmm.split("|")[0]);
        var CmmId   = Cmm.split("|")[1];
        var Tr = document.createElement("tr");
        Tr.className = Color ? "listlight" : "listdark";
        var TdName = document.createElement("td");
        TdName.style.overflow = "hidden";
        var Link = document.createElement("a");
        Link.href = URLCmmMain + "?cmm=" + CmmId;
        Link.innerHTML = CmmName;
        
        var BookmarkButton = RequestBookmarkButton(CmmId);
        BookmarkButton.addEventListener("click", BookmarkSet(), false);
        TdName.appendChild(RequestForumButton(CmmId));
        TdName.appendChild(BookmarkButton);
        TdName.appendChild(Link);
        Tr.appendChild(TdName);
        Table.appendChild(Tr);
        
        Color = !Color;
    }

    return Table;
}
function BookmarkTopicListCreate()
{
    var Topics = GMGetValue("BookmarksTopic").split("][");
    Topics = ArrayRemoveNullValues(Topics);
    Topics.sort();
    var Table = document.createElement("table");
    Table.className = "displaytable";
    Table.cellspacing = "0";
    Table.id = "OMTopicList";

    return Table;
}
function BookmarkTopicListUpdate(CommunityId)
{
    var Topics = GMGetValue("BookmarksTopic").split("][");
    Topics = ArrayRemoveNullValues(Topics);
    Topics.sort();
    
    var Table = document.getElementById("OMTopicList");
    Table.innerHTML = "";
    
    var Color = true;
    for (i in Topics)
    {
        var Topic = Topics[i];
        Topic = Topic.replace(/\[|\]/g, "");
        var CmmName = unescape(Topic.split("|")[0]);
        var CmmId   = Topic.split("|")[1];
        if (CmmId != CommunityId) continue;
        var TopicName = unescape(Topic.split("|")[2]);
        var TopicId   = Topic.split("|")[3];
        var Tr = document.createElement("tr");
        Tr.className = Color ? "listlight" : "listdark";
        var TdName = document.createElement("td");
        TdName.style.overflow = "hidden";
        var Link = document.createElement("a");
        Link.href = URLMessages + "?cmm=" + CmmId + "&tid=" + TopicId;
        Link.innerHTML = TopicName;
        
        var BookmarkButton = RequestBookmarkTopicButton(CmmId, TopicId);
        BookmarkButton.addEventListener("click", BookmarkSetTopic(), false);
        TdName.appendChild(RequestLastButton(CmmId, TopicId));
        TdName.appendChild(BookmarkButton);
        TdName.appendChild(Link);
        Tr.appendChild(TdName);
        Table.appendChild(Tr);
        
        Color = !Color;
    }
}
function BookmarkTopicListSelectorCreate()
{
    var Topics = GMGetValue("BookmarksTopic").split("][");
    Topics = ArrayRemoveNullValues(Topics);
    Topics.sort();

    var Control = document.createElement("select");
    Control.id = "OMCmmTopicSelect";
    Control.addEventListener("change",
        function ()
        {
            BookmarkTopicListUpdate(this.value);
        }, false);
    
    var CmmList = new Array();
    for (i = 0; i < Topics.length; ++i)
    {
        var Topic = Topics[i];
        var CmmName = unescape(Topic.split("|")[0]).replace(/\[|\]/g, "");
        var CmmId = Topic.split("|")[1];
        if (CmmList.indexOf(CmmId) == -1)
        {
            var Option = document.createElement("option");
            Option.value = CmmId;
            Option.innerHTML = CmmName;
            Control.appendChild(Option);
            CmmList.push(CmmId);
        }
    }
    
    return Control;
}
// #endregion

// #region CONFIGURATION
function ConfigurationSave(URLToSave, ShowMessage)
{
    var p = URLToSave;

    // Language
    var Val = "";
    Val = p.match(/Language=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("Language", Val);
    Language = GMGetValue("Language").toLowerCase() || "english";
    
    // TextArea
    Val = ""; Val = p.match(/TextAreaTextBegin=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("TextAreaTextBegin", Val);
    Val = ""; Val = p.match(/TextAreaTextEnd=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("TextAreaTextEnd", Val);
    Val = ""; Val = p.match(/TextAreaTextHtmlBegin=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("TextAreaTextHtmlBegin", Val);
    Val = ""; Val = p.match(/TextAreaTextHtmlEnd=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("TextAreaTextHtmlEnd", Val);
    Val = ""; Val = p.match(/TextAreaScrapTextBegin=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("TextAreaScrapTextBegin", Val);
    Val = ""; Val = p.match(/TextAreaScrapTextEnd=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("TextAreaScrapTextEnd", Val);
    
    // Quote
    Val = ""; Val = p.match(/QuoteHeaderText=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("QuoteHeaderText", Val);
    Val = ""; Val = p.match(/QuoteBegin=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("QuoteBegin", Val);
    Val = ""; Val = p.match(/QuoteEnd=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("QuoteEnd", Val);
    Val = ""; Val = p.match(/QuoteHeaderBegin=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("QuoteHeaderBegin", Val);
    Val = ""; Val = p.match(/QuoteHeaderEnd=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("QuoteHeaderEnd", Val);
    Val = ""; Val = p.match(/QuoteHtmlBegin=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("QuoteHtmlBegin", Val);
    Val = ""; Val = p.match(/QuoteHtmlEnd=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("QuoteHtmlEnd", Val);
    Val = ""; Val = p.match(/QuoteHeaderHtmlBegin=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("QuoteHeaderHtmlBegin", Val);
    Val = ""; Val = p.match(/QuoteHeaderHtmlEnd=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("QuoteHeaderHtmlEnd", Val);
    
    // Signature
    Val = ""; Val = p.match(/Signature=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("Signature", Val);
    Val = ""; Val = p.match(/SignatureHtml=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("SignatureHtml", Val);
    Val = ""; Val = p.match(/SignatureScrap=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("SignatureScrap", Val);
    
    // Moderation
    Val = ""; Val = p.match(/ModerationText=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("ModerationText", Val);
    Val = ""; Val = p.match(/ModerationHtmlText=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("ModerationHtmlText", Val);
    Val = ""; Val = p.match(/ModerationMemberText=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("ModerationMemberText", Val);
    Val = ""; Val = p.match(/ModerationMemberHtmlText=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("ModerationMemberHtmlText", Val);

    // Update Settings
    Val = ""; Val = p.match(/UpdateWarningType=([^&]*|[^$]*)/i); if (Val) Val = unescape(Val[1]); else Val = "";
    GMSetValue("UpdateWarningType", Val);
    
    if (ShowMessage)
        alert(LanguageGetConfigurationSaveSuccess());
    
    return true;
}
function ConfigurationMenuSave(URLToSave, ShowMessage)
{
    // Header Menus
    var Menus = URLToSave.match(/([^$]+)\&\&/i);
    if (!Menus)
    {
        GMSetValue("HeaderMenu", "");
    }
    else
    {
        Menus = Menus[1];
        Menus = Menus.split("?");
        var AddMenu = "";
        for (i in Menus)
        {
            var Menu = Menus[i];
            AddMenu += "[" + unescape((Menu.split("&"))[0]) + "|" + unescape((Menu.split("&"))[1]) + "]";
        }
        GMSetValue("HeaderMenu", AddMenu);
    }
    
    // Dowpdown Menu
    var Menus = URLToSave.match(/\&\&([^$]+)/i);
    if (!Menus)
    {
        GMSetValue("DropdownMenu", "");
    }
    else
    {
        Menus = Menus[1];
        Menus = Menus.split("?");
        var AddMenu = "";
        for (i in Menus)
        {
            var Menu = Menus[i];
            AddMenu += "[" + unescape((Menu.split("&"))[0]) + "|" + unescape((Menu.split("&"))[1]) + "]";
        }
        GMSetValue("DropdownMenu", AddMenu);
    }
    
    if (ShowMessage)
        alert(LanguageGetConfigurationSaveSuccess());
        
    return true;
}
// #endregion
// #endregion // SCRIPT FUNCTIONS

// #region ========== OTHER ==========
try /** Home Video Gadget button **/
{
    if (IsPage("Home"))
    {
        var Container = GetElementsByClassName("div", "userratings");
        Container = Container[0];
        
        var Ins = Container.getElementsByTagName("a");
        Ins = Ins[3];
        var Videos = GetProfileGadgetsButton("videos", "/Main#FavoriteVideos");
        
        Container.insertBefore(Videos, Ins);
        Container = null;
        Videos = null;
        Ins = null;
    }
}
catch (ex) { }
try /** Scroll after Reply **/
{
    var Scroll = GetParam("Scroll");
    if (Scroll != false)
    {
        window.addEventListener("load",
            function ()
            {
                var Win = document.getElementById("orkutFrame");
                if (!Win) Win = this.parent.document.getElementById("orkutFrame");
                if (!Win) return;
                Win = Win.contentWindow;
                if (Scroll == -1) Scroll = Win.scrollMaxY;
                Win.scrollBy(0, Scroll);
                Win = null;
            }, 100);
    }
}
catch (ex) { }
try /** Last page after Reply **/
{
    if (GetParam("na") == "4" && GetParam("nid") == false)
    {
        var ControlNavigation = document.getElementById("mboxfull");
        if (!ControlNavigation) return;
        ControlNavigation = ControlNavigation.getElementsByTagName("table")[0];
        ControlNavigation = ControlNavigation.getElementsByTagName("tr")[1];
        ControlNavigation = ControlNavigation.getElementsByTagName("span")[0];

        var Links = ControlNavigation.getElementsByTagName("a");
        
        if (Links.length >= 2)
            window.location.href = URLRoot + "CommMsgs?cmm=" + CommunityId + "&tid=" + CommunityTopicId + "&na=2&Scroll=-1";
        else
        {
            if (GetParam("Scroll") == false)
            {
                window.location.href += "&Scroll=-1";
            }
        }
        ControlNavigation = null;
    }
}
catch (ex) { }
// #endregion

// #region ========== SHORTCUTS ==========
try
{
    var Shortcut =
        function (e)
        {
            /** Global **/
            // Scrap
            if (e.keyCode == KeyZ && e.shiftKey && e.ctrlKey)
            {
                window.location.href = URLScrap + "?cache=" + ((new Date()).getTime());
                return;
            }
            // Profile
            if (e.keyCode == KeyX && e.shiftKey && e.ctrlKey)
            {
                window.location.href = URLHome + "?cache=" + ((new Date()).getTime());
                return;
            }
            // Communities
            if (e.keyCode == KeyC && e.shiftKey && e.ctrlKey)
            {
                window.location.href = URLCmm + "?cache=" + ((new Date()).getTime());
                return;
            }
            
            /** Communities **/
            if (IsPage(URLCmm))
            {
                if (!e.altKey) return;
                var Trs = document.getElementById("subPage0");
                Trs = Trs.getElementsByTagName("table")[0];
                Trs = Trs.getElementsByTagName("tr");
                
                var Url = new Array();
                for (i = 0; i < 10; ++i)
                {
                    Url[i] = "javascript:;";
                }
                var i = 0;
                for (var index in Trs)
                {
                    var Tr = Trs[index];
                    var a = Tr.getElementsByTagName("a");
                    if (a.length >= 2) a = a[1];
                    else continue;
                    Url[i] = a.href.replace("/Main#", "/");
                    ++i;
                    if (i >= 10) break;
                }
                switch (e.keyCode)
                {
                    case Key1:
                        window.location.href = Url[0];
                        return;
                    case Key2:
                        window.location.href = Url[1];
                        return;
                    case Key3:
                        window.location.href = Url[2];
                        return;
                    case Key4:
                        window.location.href = Url[3];
                        return;
                    case Key5:
                        window.location.href = Url[4];
                        return;
                    case Key6:
                        window.location.href = Url[5];
                        return;
                    case Key7:
                        window.location.href = Url[6];
                        return;
                    case Key8:
                        window.location.href = Url[7];
                        return;
                    case Key9:
                        window.location.href = Url[8];
                        return;
                    case Key0:
                        window.location.href = Url[9];
                        return;
                }
            }
            
            /** Main topics **/
            if (IsPage(URLCmmMain))
            {
                if (!e.altKey) return;
                var TbIndex = document.getElementById("news-bar") ? 3 : 2;
                var Tb = document.getElementById("mbox");
                Tb = (Tb.getElementsByTagName("table")[TbIndex]).getElementsByTagName("table")[0];
                var Trs = Tb.getElementsByTagName("tr");
                
                var Url = new Array();
                for (i = 0; i < 10; ++i)
                {
                    Url[i] = "javascript:;";
                }
                var i = 0;
                for (var index in Trs)
                {
                    var Tr = Trs[index];
                    var a = Tr.getElementsByTagName("a");
                    if (a.length >= 2) a = a[1];
                    else continue;
                    Url[i] = a.href.replace("/Main#", "/");
                    ++i;
                    if (i >= 10) break;
                }
                switch (e.keyCode)
                {
                    case Key1:
                        window.location.href = Url[0];
                        return;
                    case Key2:
                        window.location.href = Url[1];
                        return;
                    case Key3:
                        window.location.href = Url[2];
                        return;
                    case Key4:
                        window.location.href = Url[3];
                        return;
                    case Key5:
                        window.location.href = Url[4];
                        return;
                    case Key6:
                        window.location.href = Url[5];
                        return;
                    case Key7:
                        window.location.href = Url[6];
                        return;
                    case Key8:
                        window.location.href = Url[7];
                        return;
                    case Key9:
                        window.location.href = Url[8];
                        return;
                    case Key0:
                        window.location.href = Url[9];
                        return;
                }
            }
            
            /** Topics **/
            if (IsPage(URLCmmTopics))
            {
                if (!e.altKey) return;
                var Tb = document.getElementById("mboxfull");
                Tb = (Tb.getElementsByTagName("table")[0]).getElementsByTagName("table")[0];
                var Trs = Tb.getElementsByTagName("tr");
                
                var Url = new Array();
                for (i = 0; i < 10; ++i)
                {
                    Url[i] = "javascript:;";
                }
                var i = 0;
                for (var index in Trs)
                {
                    var Tr = Trs[index];
                    var a = Tr.getElementsByTagName("a");
                    if (a.length >= 2) a = a[1];
                    else continue;
                    Url[i] = a.href.replace("/Main#", "/");
                    ++i;
                    if (i >= 10) break;
                }
                switch (e.keyCode)
                {
                    case Key1:
                        window.location.href = Url[0];
                        return;
                    case Key2:
                        window.location.href = Url[1];
                        return;
                    case Key3:
                        window.location.href = Url[2];
                        return;
                    case Key4:
                        window.location.href = Url[3];
                        return;
                    case Key5:
                        window.location.href = Url[4];
                        return;
                    case Key6:
                        window.location.href = Url[5];
                        return;
                    case Key7:
                        window.location.href = Url[6];
                        return;
                    case Key8:
                        window.location.href = Url[7];
                        return;
                    case Key9:
                        window.location.href = Url[8];
                        return;
                    case Key0:
                        window.location.href = Url[9];
                        return;
                }
            }
            
            /** Topic Navigate **/
            if (IsPage(URLMessages))
            {
                if (e.shiftKey) return;
                var ControlNavigation = document.getElementById("mboxfull");
                if (!ControlNavigation) return;
                ControlNavigation = ControlNavigation.getElementsByTagName("table")[0];
                ControlNavigation = ControlNavigation.getElementsByTagName("tr")[1];
                ControlNavigation = ControlNavigation.getElementsByTagName("span")[0];

                var NavFirst = "javascript:;";
                var NavPrev  = "javascript:;";
                var NavForw  = "javascript:;";
                var NavLast  = "javascript:;";
                
                var Links = ControlNavigation.getElementsByTagName("a");
                if (Links.length == 4)
                {
                    NavFirst = Links[0].href;
                    NavPrev = Links[1].href;
                    NavForw = Links[2].href;
                    NavLast = Links[3].href;
                }
                else if (ControlNavigation.firstChild.nextSibling.tagName.toLowerCase() != "span")
                {
                    NavFirst = Links[0].href;
                    NavPrev = Links[1].href;
                }
                else
                {
                    NavForw = Links[0].href;
                    NavLast = Links[1].href;
                }
                
                if (e.ctrlKey)
                {
                    switch (e.keyCode)
                    {
                        case KeyLeft:
                            window.location.href = NavPrev;
                            return;
                        case KeyRight:
                            window.location.href = NavForw;
                            return;
                        case KeyUp:
                            window.location.href = NavFirst;
                            return;
                        case KeyDown:
                            window.location.href = NavLast;
                            return;
                    }
                }
            }
        };
    window.addEventListener("keydown", Shortcut, false);
}
catch (ex) { }
// #endregion // Shortcuts

// #region ========== QUOTE ==========
// #region Topic and Replies - Page
try
{
    if (IsPage(URLMessages))
    {
        // #region Message Time
        /// <summary>
        /// QuoteATime is an Array with all times of the posts
        /// </summary>
        var QuoteATimes = document.getElementById("mboxfull").getElementsByTagName("div");
        var QuoteATime = new Array();
        c = 0;
        var Container = new Array(); //used for quote button
        for (i = 0; i < QuoteATimes.length; ++i)
        {
            var QuoteTime = QuoteATimes[i];
            if (QuoteTime.className == "rfdte" && QuoteTime.parentNode.className == "listitem")
            {
                var time = QuoteTime.innerHTML;
                time = time.replace(/<.*>/gi, "");
                time = time.replace(RegexTrim, "");
                time = time.replace(/\n/gi, " ");
                QuoteATime[c] = time;
                Container[c] = QuoteTime;
                ++c;
            }
        }
        // #endregion
        
        // #region Message Text
        /// <summary>
        /// QuoteAText is an Array with all texts of the posts
        /// </summary>
        var QuoteATexts = document.getElementById("mboxfull").getElementsByTagName("div");
        var QuoteAText = new Array();
        c = 0;
        for (i in QuoteATexts)
        {
            var QuoteText = QuoteATexts[i];
            if (QuoteText.className == "para" &&
                QuoteText.parentNode &&
                QuoteText.parentNode.className == "listitem")
            {
                var text = QuoteText.innerHTML;
                text = text.replace(RegexTrim, "");
                if (text.length > 1500) text = text.substr(0, 1500) + "...";
                else text = text.substr(0, 1500);
                QuoteAText[c] = text.replace(/&nbsp;/g, " ");
                ++c;
            }
        }
        // #endregion

        // #region Message Username
        /// <summary>
        /// QuoteAUsername is an Array with all usernames of the posts
        /// </summary>
        var QuoteAUsernames = document.getElementById("mboxfull").getElementsByTagName("div");
        var QuoteAUsername = new Array();
        c = 0;
        for (i in QuoteAUsernames)
        {
            var QuoteUsername = QuoteAUsernames[i];
            QuoteUsername = QuoteUsername.getElementsByTagName("h3")[0];
            if (!QuoteUsername) continue;
            var QuoteUsername2 = QuoteUsername.getElementsByTagName("a")[0];
            QuoteUsername = (QuoteUsername2 ? QuoteUsername2 : QuoteUsername);
            var username = QuoteUsername.innerHTML;
            username = username.replace(/<.*?>/gi, "");
            username = username.replace(RegexTrim, "");
            username = username.replace(/\n/gi, "");
            QuoteAUsername[c] = username;
            ++c;
        }
        QuoteAUsername = ArrayRemoveNullValues(QuoteAUsername);
        // #endregion

        // #region QUOTE BUTTON
        for (i = 0; i < Container.length; ++i)
        {
            var Placer = Container[i];
            var ButtonContainer = document.createElement("span");
            var CurrentUrlToQuote = document.createElement("div");
            
            var CurrentQuoteUser = escape(QuoteAUsername[i]);
            var CurrentQuoteText = escape(QuoteATime[i] + "TIME" + QuoteAText[i]);
            var CurrentQuote = document.createElement("div");
            CurrentQuote.style.display = "none";
            CurrentQuote.innerHTML = "[" + CurrentQuoteUser + "|" + CurrentQuoteText + "]";

           
            var ButtonQuote = ButtonCreate("quote",
                function ()
                {
                    var V = this.firstChild.firstChild.innerHTML.replace(/\&amp;/g, "&");
                    GMSetValue("Quote", V);
                    window.location.href = URLPost + "cmm=" + CommunityId + "&tid=" + CommunityTopicId + "&quote=true";
                }, "click");
            Placer.appendChild(ButtonQuote);
            Placer.lastChild.firstChild.insertBefore(CurrentQuote, Placer.lastChild.firstChild.firstChild);
        }
        
        QuoteATimes = null;
        QuoteATime = null;
        QuoteAUsernames = null;
        QuoteAUsername = null;
        QuoteUsername = null;
        QuoteUsername2 = null;
        QuoteATexts = null;
        Placer = null;
        QuoteAText = null;
        Container = null;
    }
}
catch (ex) {}
// #endregion

// #endregion

// #region New Post Messages - Page
try
{
    if (IsPage(URLPost))
    {
        window.addEventListener("keydown",
            function (e)
            {
                if (e.keyCode == 13 && e.altKey)
                {
                    QuickReplyThis("messageBody");
                }
            }, false);
    }
    
    if (IsPage(URLPost) && GMGetValue("Quote") && GMGetValue("Quote") != "")
    {
        var Quote = GMGetValue("Quote");
        Quote = Quote.replace(/\[|\]/g, "");
        GMSetValue("Quote", "");
        var User = unescape((Quote.split("|"))[0]);
        var Quote = unescape((Quote.split("|"))[1]);
        var TextBox = document.getElementById("messageBody");
        
        var Time = Quote.substring(0, Quote.indexOf("TIME"));
        var Text = Quote.substring(Quote.indexOf("TIME")+4, Quote.length);
        Text = (IsHtmlEnabled() ? Text.replace(/<br.*?>/ig, "<br />\n") : Text.replace(/<br.*?>/ig, "\n"));
        Text = (IsHtmlEnabled() ? Text : Text.replace(/<.*?>/ig, ""));

        Time = QuoteHeaderText.replace("$TIME$", Time);
        Time = Time.replace("$USER$", User);
        if (IsHtmlEnabled())
        {
            Time = QuoteHeaderHtmlBegin + Time + QuoteHeaderHtmlEnd + "\n";
            Text = QuoteHtmlBegin + Text + QuoteHtmlEnd;
        }
        else
        {
            Time = QuoteHeaderBegin + Time + QuoteHeaderEnd + "\n";
            Text = QuoteBegin + Text + QuoteEnd;
        }
        if (ShowHeader == false) Time = "";
        if (TextBox.value.indexOf(Time + Text) == -1)
        {
            if (IsHtmlEnabled())
                TextBox.value = Time + Text + "\n";
            else TextBox.value = Time + Text + "\n\n";
        }
    
        Quote = null;
        User = null;
        TextBox = null;
        Time = null;
        Text = null;
    
    }
}
catch (ex) {}
// #endregion
// #endregion // Quote

// #region ========== Quick Reply Control ==========
try
{
    if (IsPage(URLCmmMain))
    {
        var List = document.getElementById("list_facts");
        var QuickReplyControl = document.createElement("div");
        var P1 = document.createElement("p");
        var P2 = document.createElement("p");
        QuickReplyControl.className = "listdark";
        P1.className = "listfl";
        P2.className = "listp";
        
        var QuickReplyFunctionEnable =
            function ()
            {
                if (!IsQuickReply())
                {
                    var Index = "QuickReply" + CommunityId;
                    GMSetValue(Index, CommunityId);
                    window.location.reload();
                }
            };
        var QuickReplyFunctionDisable =
            function ()
            {
                if (IsQuickReply())
                {
                    var Index = "QuickReply" + CommunityId;
                    GMSetValue(Index, "");
                    window.location.reload();
                }
            };
        var QuickReplyButtonEnable = ButtonCreate(LanguageGetQuickReplyButtonEnable(), QuickReplyFunctionEnable, "click", LanguageGetQuickReplyCurrentDisabled());
        var QuickReplyButtonDisable = ButtonCreate(LanguageGetQuickReplyButtonDisable(), QuickReplyFunctionDisable, "click", LanguageGetQuickReplyCurrentEnabled());
        P1.innerHTML = LanguageGetQuickReplyFormLabel();
        P2.appendChild((IsQuickReply() ? QuickReplyButtonDisable : QuickReplyButtonEnable));
        
        QuickReplyControl.appendChild(P1);
        QuickReplyControl.appendChild(P2);
        List.appendChild(QuickReplyControl);
    
        List = null;
        QuickReplyControl = null;
        P1 = null;
        P2 = null;
        QuickReplyFunctionEnable = null;
        QuickReplyFunctionDisable = null;
    
    }
}
catch (ex) {}
// #endregion

// #region ========== Moderation Control ==========
// Topics
try
{
    if (IsPage(URLMessages))
    {
        var Links = document.getElementById("mboxfull").getElementsByTagName("a");
        var IsMod = false;
        for (i in Links)
        {
            var Link = Links[i];
            if (Link.href.match(URLMemberManager))
            {
                IsMod = true;
                break;
            }
        }
        if (IsMod)
        {
            var Container = document.getElementById("mboxfull").getElementsByTagName("table")[0].getElementsByTagName("td")[0];
            var ButtonModText = GMGetValue(("Mod" + CommunityId)) == CommunityTopicId ? LanguageGetModerationMarkedMod() : LanguageGetModerationSetMod();
            var ButtonModSet = ButtonCreate(ButtonModText,
                function ()
                {
                    GMSetValue(("Mod" + CommunityId), CommunityTopicId);
                    this.getElementsByTagName("a")[0].innerHTML = LanguageGetModerationMarkedMod();
                }, "click");
            var FunctionMod =
                function ()
                {
                    var Table = document.getElementById("mboxfull").getElementsByTagName("table")[0];
                    var DivList = Table.getElementsByTagName("tr")[1].getElementsByTagName("div")[2];
                    DivList = DivList.getElementsByTagName("h3");
                    DivList = DivList[DivList.length-1].nextSibling.nextSibling;

                    var Title = Table.getElementsByTagName("td")[0].getElementsByTagName("h1")[0];
                    Title = Title.innerHTML;

                    var User = Table.getElementsByTagName("h3")[0].getElementsByTagName("a")[0];
                    var UserLink = User.href;
                    User = User.innerHTML;
                    UserLink = UserLink.replace(/http:\/\/[^\/]+/, "");
                    UserLink = UserLink.replace("Main#", "");

                    var Message = DivList.innerHTML.replace(/^\n*|\n*$/gi, "");
                    Message = (IsHtmlEnabled() ? Message : Message.replace(/<.*?>/ig, ""));
                    if (Message.length > 50) Message = Message.substr(0, 50) + "...";
                    else Message = Message.substr(0, 50);
                    
                    var url = URLPost + "cmm=" + CommunityId + "&tid=" + GMGetValue(("Mod" + CommunityId)) + "&Type=Topic";
                    GMSetValue("Moderation", "[" + escape(Title) + "|" + escape(User) +
                        "|" + escape(UserLink) + "|" + escape(Message) + "]");
                    window.open(url);
                };
            var ButtonMod = ButtonCreate(LanguageGetModerationMod(), FunctionMod, "click");
            ButtonModSet.style.cssFloat = "right";
            ButtonMod.style.cssFloat = "right";
            Container.insertBefore(ButtonModSet, Container.firstChild);
            if (GMGetValue(("Mod" + CommunityId)).length > 0)
                Container.insertBefore(ButtonMod, Container.firstChild);
        }
    
        Links = null;
        Container = null;
        ButtonMod = null;
        ButtonModSet = null;
        ButtonModText = null;
        FunctionMod = null;
    }
}
catch (ex) {}

// Members
try
{
    if (IsPage(URLMemberManager))
    {
        var Table = document.getElementById("mboxfull").getElementsByTagName("table")[0];
        var User = Table.getElementsByTagName("tr")[1].getElementsByTagName("a")[1];
        var FunctionMod =
            function ()
            {
                var UserName = User.innerHTML.replace(/\n/g, "");
                var UserLink = User.href.replace(/http:\/\/[^\/]+/, "");
                UserLink = UserLink.replace("Main#", "");
                var Url = URLPost + "cmm=" + CommunityId + "&tid=" + GMGetValue(("Mod" + CommunityId)) + "&Type=Member";
                GMSetValue("Moderation", "[" + "" + "|" + escape(UserName) +
                        "|" + escape(UserLink) + "|" + "" + "]");
                window.open(Url);
            };
            
        var ButtonMod = ButtonCreate(LanguageGetModerationMod(), FunctionMod, "click");
        User.parentNode.appendChild(ButtonMod);
    }
}
catch (ex) {}

// Message build
try
{
    if (IsPage(URLPost) && window.location.href.indexOf("/Main#") == -1)
    {
        var Post = document.getElementById("messageBody");
        if (!GMGetValue("Moderation") || GMGetValue("Moderation") == "") throw new Exception();
        var Mod = GMGetValue("Moderation");
        Mod = Mod.replace(/\[|\]/g, "");
        GMSetValue("Moderation", "");

        var p = window.location.href.replace(/[^&]+/, "");
        var Type = unescape(p.match(/.*?&Type=([^&]+).*/i)[1]);
        var Title = unescape((Mod.split("|"))[0]);
        var User = unescape((Mod.split("|"))[1]);
        var UserLink = unescape((Mod.split("|"))[2]);
        var Message = unescape((Mod.split("|"))[3]);
        if (Type == "Topic")
            Mod = IsHtmlEnabled() ? ModerationHtmlText : ModerationText;
        else
            Mod = IsHtmlEnabled() ? ModerationMemberHtmlText : ModerationMemberText;
        Mod = Mod.replace("$TITLE$", Title);
        Mod = Mod.replace("$USER$", User);
        Mod = Mod.replace("$USERLINK$", UserLink);
        Mod = Mod.replace("$MESSAGE$", Message);

        function AddMod(Post, Mod)
        {
            if (Post) Post.value = Mod;
        }
        AddMod(Post, Mod);
    }
}
catch (ex) {}
// #endregion // Moderation Control

// #region ========== Chat ==========
// #region Add Chat
try
{
    if (IsPage(URLMessages))
    {
        var Container = document.getElementById("mboxfull").getElementsByTagName("table")[0].getElementsByTagName("td")[0];
        var ButtonChatAddText = GMGetValue(("Chat" + CommunityId)) == CommunityTopicId ? LanguageGetChatRemove() : LanguageGetChatSet();
        var ButtonChatSet = ButtonCreate(ButtonChatAddText,
            function ()
            {
                if (GMGetValue(("Chat" + CommunityId)) != CommunityTopicId)
                {
                    GMSetValue(("Chat" + CommunityId), CommunityTopicId);
                    this.getElementsByTagName("a")[0].innerHTML = LanguageGetChatRemove();
                }
                else
                {
                    GMSetValue(("Chat" + CommunityId), "");
                    this.getElementsByTagName("a")[0].innerHTML = LanguageGetChatSet();
                }
                window.location.reload();
            }, "click");
        ButtonChatSet.style.cssFloat = "right";
        Container.insertBefore(ButtonChatSet, Container.firstChild);
    }
}
catch (ex) {}
// #endregion

// #region Chat
try
{
    if (GMGetValue(("Chat" + CommunityId)))
    {
        var ChatTopicId = GMGetValue(("Chat" + CommunityId));
        var Container = document.getElementById("lbox");
        var ContainerPanel = BuildChatBox();
        
        Container.appendChild(ContainerPanel);
        
        ChatGetMessages();
        setInterval(ChatGetMessages, 1000 * 15);
    }
}
catch (ex) {}
// #endregion
// #endregion // Chat

// #region ========== TextAreas Setup ==========
try
{
    // Kill Main# - Scrapbook
    var PageLinks = document.getElementsByTagName("a");
    for (i in PageLinks)
    {
        var Link = PageLinks[i];
        Link.href = Link.href.replace(/Main#Scrapbook/i, "Scrapbook");
    }

    if (!window.location.href.match(/Edit.*?aspx/i) &&
        !IsPage("/CommunityEdit"))
    {
        var IsAjax = true;
        // Scrap fixer (NO-AJAX)
        try
        {
            var Scrap = document.getElementById("scrapText");
            if (Scrap) IsAjax = false;
            Scrap.id = "scrapText2";
            Scrap.style.display = "none";
            var ScrapNew = document.createElement("textarea");
            ScrapNew.id = "scrapText";
            ScrapNew.cols = "83";
            ScrapNew.rows = "5";
            ScrapNew.value = "";
            ScrapNew.style.width = "99%";
            Scrap.parentNode.insertBefore(ScrapNew, Scrap);
            
            var Rep;
            var i = 1;
            while ((Rep = document.getElementById("reply_link_" + i)))
            {
                Rep.setAttribute("onclick", "document.getElementById('scrap_" + i + "').style.display = ''; var st = document.getElementById('scrapText_" + i + "'); st.focus(); st.selectionStart = st.selectionEnd = st.value.length - " + FocusLength + ";");
                ++i;
            }
            
            var Links = document.getElementsByTagName("a");
            for (i in Links)
            {
                var Link = Links[i];
                if (Link.getAttribute("onclick") && Link.getAttribute("onclick").indexOf("_quickReplyCloseAll()") != -1)
                {
                    Link.setAttribute("onclick", "_quickReplyCloseAll()");
                }
            }
        }
        catch (ex) { }
    
        // Scrap fixer (AJAX)
        try
        {
            if (!IsAjax) throw new Exception();
            function ScrapTry()
            {
                if (!window.location.href.match(/Scrapbook/i)) return;
                var Container = document.getElementById("gwtPagePanel");
                if (Container.innerHTML.indexOf("bottomRight") == -1) return;
                var TextAreas = Container.getElementsByTagName("textarea");
                var TextArea = TextAreas[0];
                if (!TextArea) return;
                TextArea.id = "scrapText";
                SetTextArea(TextArea, true);
                
                // Remove :: Write Scrap
                var Remove = TextArea.previousSibling;
                if (Remove.tagName.toLowerCase() != "div") Remove = Remove.previousSibling;
                Remove.parentNode.removeChild(Remove);
                
                ToolbarCreate("scrapText", false, 1);
                TextArea.focus();

                function ScrapReplyTry()
                {
                    var Container = GetElementsByClassName("div", "gorkut-ScrapbookContent");
                    if (Container.length <= 0) return;
                    Container = Container[0];
                    var TextAreas = Container.getElementsByTagName("textarea");
                    if (TextAreas.length <= 0) return;
                    for (i in TextAreas)
                    {
                        var TextArea = TextAreas[i];

                        try
                        {
                            SetTextArea(TextArea, true);
                        }
                        catch (ex) { }
                        
                        if (TextArea.id != "") continue;
                        TextArea.id = "OMScrapReplyText" + i;
                        ToolbarCreate("OMScrapReplyText" + i, false, 1);
                    }
                }
                setInterval(function () { ScrapReplyTry(); }, 250);
                
                clearInterval(ScrapTryInterval);
            }
            var ScrapTryInterval = setInterval(function () { ScrapTry(); }, 500);
        }
        catch (ex) { }
    
        var Textarea = document.getElementsByTagName("textarea");
        var s = -1;
        var i = 0;
        for (i = 0; i < Textarea.length; ++i)
        {
            var f = false;
            if (Textarea[i].value.indexOf(TextAreaTextBegin) == -1 ||
                Textarea[i].value.indexOf(TextAreaTextEnd) == -1)
            {
                if (s == -1) s = i;
                Textarea[i].value += TextAreaTextBegin + TextAreaTextEnd;
                try
                {
                    Textarea[i].selectionStart =
                        Textarea[i].selectionEnd = Textarea[i].value.length - (TextAreaTextEnd.length + Signature.length);
                }
                catch (ex) { GM_log(ex); }
                if (i == 2 && IsPage("/Album")) Textarea[i].focus();
                f = true;
            }
            if (Textarea[i].value.indexOf(Signature) == -1)
                    Textarea[i].value += Signature;

            if (f) continue;
                    
            if ((document.referrer.indexOf(URLMessages) != -1 &&
                window.location.href.indexOf(QuoteGetter) != -1))
                Textarea[i].value += TextAreaTextBegin + TextAreaTextEnd;
        }

        try
        {
            if (i >= 0)
            {
                if (!IsPage("/Album") && !IsPage("/Scrapbook")) Textarea[0].focus();
            }
        }
        catch (ex) {}
        try
        {
            if (IsPage("/Scrapbook"))
            {
                var ta = document.getElementById("scrapText");
                ta.selectionStart =
                    ta.selectionEnd = TextAreaScrapTextBegin.length;
                ta.focus();
            }
        }
        catch (ex) {}
        try
        {
            if (IsPage("/CommMsgPost"))
            {
                var ta = document.getElementById("messageBody");
                ta.selectionStart =
                    ta.selectionEnd = ta.value.length - (TextAreaTextEnd.length + Signature.length);
                ta.focus();
            }
        }
        catch (ex) {}
        try
        {
            if (IsPage("/TestimonialWrite"))
            {
                var ta = document.getElementById("countedTextbox");
                ta.selectionStart =
                    ta.selectionEnd = TextAreaTextBegin.length;
                ta.focus();
            }
        }
        catch (ex) {}
        try
        {
            if (IsPage("/AlbumZoom"))
            {
                var ta = document.getElementById("photo_comment");
                ta.selectionStart =
                    ta.selectionEnd = TextAreaTextBegin.length;
                ta.focus();
            }
        }
        catch (ex) {}
        
        // Scrapbook toolbar
        if (window.location.href.match(/Scrapbook/i))
        {
            ToolbarCreate("scrapText", false, 1);
            var ScrapIndex;
            for (ScrapIndex = 1; ScrapIndex <= 30; ++ScrapIndex)
            {
                var ScrapTextI = document.getElementById("scrapText_" + ScrapIndex);
                if (!ScrapTextI) break;
                ScrapTextI.parentNode.parentNode.style.width = "100%";
                try
                {
                    ToolbarCreate("scrapText_" + (ScrapIndex), false, 1);
                }
                catch (ex) { }
            }
        }
    }
}
catch (ex) { }
// #endregion // TextAreas Setup

// #region ========== Topic Control ==========
try
{
    if (IsPage(URLMessages))
    {
        var ButtonControlContainer = document.getElementById("mboxfull").getElementsByTagName("span");
        var Container;
        for (i in ButtonControlContainer)
        {
            Container = ButtonControlContainer[i];
            if (Container.className == "grabtn" &&
                Container.parentNode.tagName == "div" &&
                Container.parentNode.className == "parabtns")
                break;
        }
        Container = Container.parentNode;
        var InsBefore = Container.firstChild.nextSibling.nextSibling;
        // Back button
        Container.insertBefore(ButtonCreate(LanguageGetButtonBack(), function () { history.go(-1); }, "click"), InsBefore);
        // Refresh button
        var PageRefreshFunction =
            function ()
            {
                var l = window.location.href;
                if (l.match(/&refresh=/i))
                    l = l.replace(/&refresh.*/i, "");
                window.location.href = l + "&refresh=" + (new Date().getTime());
            }
        Container.insertBefore(ButtonCreate(LanguageGetButtonRefresh(), PageRefreshFunction, "click"), InsBefore);
        // Quick Reply Button
        Container.insertBefore(ButtonCreate(LanguageGetButtonQuickReply(), QuickReplyShow, "click", "alt+q"), InsBefore);
        
        var QuickReplyContainer = document.getElementById("mboxfull");
        QuickReplyContainer = QuickReplyContainer.getElementsByTagName("div");
        QuickReplyContainer = QuickReplyContainer[QuickReplyContainer.length-1];
        QuickReplyContainer.id = "Footage";
        var QTextbox = document.createElement("textarea");
        QTextbox.id = "QTextboxReply";
        QTextbox.style.width = "100%";
        QTextbox.style.height = "100px";
        
        QTextbox.value = TextAreaTextBegin + TextAreaTextEnd + Signature;

        var QReplyContainer = document.createElement("div");
        QReplyContainer.style.display = "none";
        QReplyContainer.id = "QReplyContainer";
        
        QReplyContainer.appendChild(QTextbox);

        QReplyContainer.appendChild((ButtonCreate(" + ",
            function ()
            {
                document.getElementById("QTextboxReply").style.height =
                    (parseInt(document.getElementById("QTextboxReply").style.height) + 50) + "px";
            }, "click"
            )));
        QReplyContainer.appendChild((ButtonCreate(" - ",
            function ()
            {
                document.getElementById("QTextboxReply").style.height =
                    (parseInt(document.getElementById("QTextboxReply").style.height) - 50) + "px";
            }, "click"
            )));
        
        QReplyContainer.appendChild(ButtonCreate("Send (alt+enter)",
            function ()
            {
                QuickReplyThis();
            }, "click"
            ));
        
        // Send ALT+ENTER
        window.addEventListener("keydown",
            function (e)
            {
                if (e.keyCode == 13 && e.altKey)
                    QuickReplyThis();
            }, false);
        
        // Incrase/Decrase Area size
        window.addEventListener("keydown",
            function (e)
            {
                if (e.keyCode == KeyUp && e.altKey)
                    document.getElementById("QTextboxReply").style.height =
                        (parseInt(document.getElementById("QTextboxReply").style.height) - 50) + "px";
            }, false);
        window.addEventListener("keydown",
            function (e)
            {
                if (e.keyCode == KeyDown && e.altKey)
                    document.getElementById("QTextboxReply").style.height =
                        (parseInt(document.getElementById("QTextboxReply").style.height) + 50) + "px";
            }, false);
        
        QuickReplyContainer.appendChild(QReplyContainer);
        
        ToolbarCreate("QTextboxReply", false, IsQuickReply());

        window.addEventListener("keydown", function (e) { if (e.keyCode == 81 && e.altKey) QuickReplyShow(); }, false);
        window.addEventListener("keydown", function (e)
        {
            if (e.keyCode == 82 && e.altKey)
            {
                window.location.href = "/CommMsgPost?cmm=" + CommunityId + "&tid=" + CommunityTopicId;
            }
        }, false);
        
        // ReportSpam secure button
        var Spam = document.getElementById("mboxfull").getElementsByTagName("form");
        var Sp;
        for (i in Spam)
        {
            Sp = Spam[i];
            if (Sp.name == "topicsForm") break;
        }
        Sp = Sp.getElementsByTagName("span")[0];
        Sp = Sp.firstChild;
        Sp.removeAttribute("onclick");
        Sp.setAttribute("onclick", "var a = confirm('Spam?'); if (!a) return false; _submitForm(document.topicsForm, 'report_topics', ''); return false;");
    }
}
catch (ex) {}
// #endregion // Topic Control

// #region ========== Post Control ==========
try
{
    if (IsPage(URLPost))
    {
        // Toolbar
        ToolbarCreate();

        // Reduce Label Width
        var Divs = document.getElementById("mboxfull").getElementsByTagName("div");
        for (i in Divs)
        {
            var Div = Divs[i];
            if (Div.className == "listfl")
                Div.style.width = "15%";
            if (Div.className == "listp")
                Div.style.width = "82%";
        }
        
        // Real Time Preview
        var EnableRealTimePreview = true;
        if (EnableRealTimePreview)
        {
            var TextBox = document.getElementById("messageBody");
            var TextBoxPreview = document.createElement("div");
            TextBoxPreview.id = "preview";
            TextBoxPreview.style.overflow = "hidden";
            TextBoxPreview.style.backgroundColor = "#EFF7FF";
            TextBoxPreview.style.border = "1px solid silver";
            TextBoxPreview.style.margin = "3px 0px 0px 0px";
            TextBox.parentNode.insertBefore(TextBoxPreview, TextBox.nextSibling);
            var Change =
                function ()
                {
                    var Prev = this.value;
                    Prev = GetTextPreview(Prev);
                    document.getElementById("preview").innerHTML = Prev;
                };
            TextBox.addEventListener("focus", Change, false);
            TextBox.addEventListener("keyup", Change, false);
        }

        // Last page posts
        if (CommunityTopicId)
        {
            function ReplyGetLastPosts(Response)
            {
                var Content = Response.responseText;
                var Container = document.getElementById("OrkutManagerAjax");
                if (!Container)
                {
                    Container = document.createElement("div");
                    Container.id = "OrkutManagerAjax";
                    Container.style.display = "none";
                    document.getElementById("mboxfull").appendChild(Container);
                }
                Container.innerHTML = Content;

                OrkutLinksFix(Container.getElementsByTagName("a"));
                
                var divs = Container.getElementsByTagName("div");
                var div;
                for (i in divs)
                {
                    div = divs[i];
                    if (div.id == "mboxfull")
                    {
                        div.id = "mboxfull2";
                        break;
                    }
                }
                // Remove Buttons
                var buttons = div.getElementsByTagName("span");
                for (i in buttons)
                {
                    var button = buttons[i];
                    if (button.className == "rf")
                        button.style.display = "none";
                }
                // Remove Foot
                divs = div.getElementsByTagName("div");
                var div2;
                for (i in divs)
                {
                    div2 = divs[i];
                    if (div2.className == "parabtns")
                    {
                        div2.style.display = "none";
                        break;
                    }
                }
                // Remove Delete Button
                var forms = div.getElementsByTagName("form");
                var form;
                for (i in forms)
                {
                    form = forms[i];
                    form.style.display = "none";
                }
                
                Content = div.innerHTML;

                Container.style.display = "";
                Container.innerHTML = Content;
            }
            var url = URLMessages + "?cmm=" + CommunityId + "&tid=" + CommunityTopicId + "&na=2&";
            AjaxRequest(url + "?na=2&", ReplyGetLastPosts);
        }
        
        var Container = document.getElementById("mboxfull");
        if (Container)
        {
            // Back button
            Container = Container.getElementsByTagName("form")[0].lastChild.previousSibling;
            Container.appendChild(ButtonCreate(LanguageGetButtonBack(), function () { history.go(-1); }, "click"));
        }
    }
}
catch (ex) {}
// #endregion // Post Control

// #region ========== Trash/Spam fixer ==========
try
{
    var Table = document.getElementById("spamFolderForm");
    Table = Table.getElementsByTagName("table")[0];
    var Trs = Table.getElementsByTagName("tr");
    for (i in Trs)
    {
        var Td = Trs[i];
        Td = Td.getElementsByTagName("td");
        if (Td.length == 0) continue;
        Td = Td[2];
        var A = Td.getElementsByTagName("a")[0];
        if (A.innerHTML.replace(/\s/g, "") == "")
        {
            A.innerHTML = "---";
        }
    }
}
catch (ex) {}
// #endregion // Trash/Spam fixer

// #region ========== Link fixer ==========
try
{
    var Links = document;
    if (Links)
    {
        Links = Links.getElementsByTagName("a");
        OrkutLinksFix(Links);
    }
}
catch (ex) {}
// #endregion // Link fixer

// #region ========== Page Requests & Bookmarks ==========
try
{
    CommunityBookmarkButtonCreate();
}
catch (ex) {}
// #region Comunities
try
{
    if (IsPage(URLCmm))
    {
        function CommunitiesListBuild(response)
        {
            var Input = response.responseText;
            var CmmList = document.getElementById("CmmList");
            if (!CmmList)
            {
                CmmList = document.createElement("div");
                CmmList.id = "CmmList";
                CmmList.style.display = "none";
                document.body.appendChild(CmmList);
            }
            CmmList.innerHTML = Input;
            var List = CmmList.getElementsByTagName("div");
            var SubPage;
            for (i in List)
            {
                SubPage = List[i];
                if (SubPage.id == "subPage0") break;
            }
            // TbNew = New Cmm List Table
            // TbOld = Current Cmm List Table
            var TbNew = SubPage;
            var TbOld = document.getElementById("subPage0");
            var ListNew = TbNew.getElementsByTagName("tr");
            var ListOld = TbOld.getElementsByTagName("tr");
            
            for (i = 1; i < ListNew.length; ++i)
            {
                var New = ListNew[i];
                var NewContainerName = New.getElementsByTagName("td")[0];
                var NewContainerPost = New.getElementsByTagName("td")[1];
                var NewId = NewContainerName.getElementsByTagName("a")[0];
                NewId = NewId.href.match(/cmm=([^&]+|[^$]+)/);
                if (!NewId) continue;
                NewId = NewId[1];
                var NewPost = NewContainerPost.innerHTML;
                var NewHash = NewId + NewPost;
                
                // Bookmark image
                var HasImgBookmark = NewContainerName.getElementsByTagName("img");
                if (!HasImgBookmark[0] || HasImgBookmark[0].alt != "bk")
                {
                    NewContainerName.insertBefore(RequestBookmarkButton(NewId), NewContainerName.firstChild);
                    NewContainerName.firstChild.id = "Bookmark" + i;
                }
                
                // (forum) link
                if (NewContainerName.firstChild.tagName != "div")
                {
                    NewContainerName.insertBefore(RequestForumButton(NewId), NewContainerName.firstChild);
                }
            }
            document.getElementById("subPage0").innerHTML = TbNew.innerHTML;
            
            RequestCmmListBookmarkAddEventListener(ListNew.length);
        }

        function CommunitiesListBuildStatic()
        {
            var Tb = document.getElementById("subPage0");
            var List = Tb.getElementsByTagName("tr");
            for (i = 1; i < List.length; ++i)
            {
                var New = List[i];
                var NewContainerName = New.getElementsByTagName("td")[0];
                var NewContainerPost = New.getElementsByTagName("td")[1];
                
                var NewId = NewContainerName.getElementsByTagName("a")[0];
                NewId = NewId.href.match(/cmm=([^&]+|[^$]+)/);
                if (!NewId) continue;
                NewId = NewId[1];
                var NewPost = NewContainerPost.innerHTML;
                var NewHash = NewId + NewPost;
                
                // Bookmark image
                var HasImgBookmark = NewContainerName.getElementsByTagName("img");
                if (!HasImgBookmark[0] || HasImgBookmark[0].alt != "bk")
                {
                    NewContainerName.insertBefore(RequestBookmarkButton(NewId), NewContainerName.firstChild);
                    NewContainerName.firstChild.id = "Bookmark" + i;
                }
                
                // (forum) link
                if (NewContainerName.firstChild.tagName != "div")
                {
                    NewContainerName.insertBefore(RequestForumButton(NewId), NewContainerName.firstChild);
                }
            }
            RequestCmmListBookmarkAddEventListener(List.length);
        }
        CommunitiesListBuildStatic();
        if (!SlowConnection)
            setInterval(function () { AjaxRequest("/Communities?", CommunitiesListBuild); }, 18000);
        
        // Bookmark TAB Button
        var TabButtonInsertBefore = document.getElementById("funsel2").parentNode;
        TabButtonInsertBefore = TabButtonInsertBefore.nextSibling.nextSibling;
        
        function GetTabButton(Index, Text)
        {
            var TabButton = document.createElement("a");
            TabButton.setAttribute("onclick", "_displaySubPage(" + Index + ");");
            TabButton.href = "javascript:;";
            TabButton.innerHTML = Text;
            return TabButton;
        }
        
        TabButtonInsertBefore.parentNode.insertBefore(document.createTextNode(" - "), TabButtonInsertBefore);
        TabButtonInsertBefore.parentNode.insertBefore(GetTabButton(3, LanguageGetBookmarks()), TabButtonInsertBefore);
        
        TabButtonInsertBefore.parentNode.insertBefore(document.createTextNode(" - "), TabButtonInsertBefore);
        TabButtonInsertBefore.parentNode.insertBefore(GetTabButton(4, LanguageGetBookmarksTopics()), TabButtonInsertBefore);
        
        // Bookmarks TAB
        var TabBookInsertBefore = document.getElementById("subPage2").nextSibling.nextSibling;
        
        var TabBookmark = document.createElement("div");
        TabBookmark.id = "subPage3";
        TabBookmark.style.display = "none";
        TabBookmark.appendChild(BookmarkCommunityListCreate());
        
        TabBookInsertBefore.parentNode.insertBefore(TabBookmark, TabBookInsertBefore);
        
        // Bookmarks Topic TAB
        var TabBookInsertBefore = document.getElementById("subPage3").nextSibling;
        
        var TabBookmark = document.createElement("div");
        TabBookmark.id = "subPage4";
        TabBookmark.style.display = "none";
        TabBookmark.appendChild(BookmarkTopicListSelectorCreate());
        TabBookmark.appendChild(BookmarkTopicListCreate());
        
        TabBookInsertBefore.parentNode.insertBefore(TabBookmark, TabBookInsertBefore);
        var Select = document.getElementById("OMCmmTopicSelect");
        BookmarkTopicListUpdate(Select.options[Select.selectedIndex].value);
    }
}
catch (ex) {}
// #endregion
// #region Community
try
{
    if (IsPage(URLCmmMain))
    {
        function TopicListBuild(response)
        {
            var Input = response.responseText;
            var TopicList = document.getElementById("TopicList");
            if (!TopicList)
            {
                TopicList = document.createElement("div");
                TopicList.id = "TopicList";
                TopicList.style.display = "none";
                document.body.appendChild(TopicList);
            }
            TopicList.innerHTML = Input;
            //New
            var List = TopicList.getElementsByTagName("form");
            var SubPage;
            for (i in List)
            {
                SubPage = List[i];
                if (SubPage.name == "topicsForm") break;
            }
            //Old
            var List = document.getElementById("mbox").getElementsByTagName("form");
            var SubPage2;
            for (i in List)
            {
                SubPage2 = List[i];
                if (SubPage.name == "topicsForm") break;
            }
            // TbNew = New Cmm List Table
            // TbOld = Current Cmm List Table
            var TbNew = SubPage;
            var TbOld = SubPage2;
            var ListNew = TbNew.getElementsByTagName("tr");
            var ListOld = TbOld.getElementsByTagName("tr");
            
            for (i = 1; i < ListNew.length; ++i)
            {
                var New = ListNew[i];
                var NewContainerName = New.getElementsByTagName("td")[1];
                var NewContainerPost = New.getElementsByTagName("td")[2];
                
                var NewId = NewContainerName.getElementsByTagName("a")[0];
                NewId = NewId.href.match(/cmm=([^&]+|[^$]+)/);
                if (!NewId) continue;
                NewId = NewId[1];
                var NewTid = NewContainerName.getElementsByTagName("a")[0];
                NewTid = NewTid.href.match(/tid=([^&]+|[^$]+)/);
                NewTid = NewTid[1];
                var NewPost = NewContainerPost.innerHTML;
                var NewHash = NewTid + NewPost;
                
                // Bookmark image
                var HasImgBookmark = NewContainerName.getElementsByTagName("img");
                if (!HasImgBookmark[0] || HasImgBookmark[0].alt != "bk")
                {
                    NewContainerName.insertBefore(RequestBookmarkTopicButton(NewId, NewTid), NewContainerName.firstChild);
                    NewContainerName.firstChild.id = "Bookmark" + i;
                }
                
                // (last) link
                if (NewContainerName.firstChild.tagName != "div")
                {
                    NewContainerName.insertBefore(RequestLastButton(NewId, NewTid), NewContainerName.firstChild);
                }
                
            }
            SubPage2.innerHTML = TbNew.innerHTML;
            
            RequestTopicListBookmarkAddEventListener(ListNew.length);
        }
        function TopicListBuildStatic()
        {
            var TbIndex = document.getElementById("news-bar") ? 3 : 2;
            var Tb = document.getElementById("mbox");
            Tb = (Tb.getElementsByTagName("table")[TbIndex]).getElementsByTagName("table")[0];

            var List = Tb.getElementsByTagName("tr");
            for (i = 1; i < List.length; ++i)
            {
                var New = List[i];
                var NewContainerName = New.getElementsByTagName("td")[1];
                var NewContainerPost = New.getElementsByTagName("td")[2];

                var NewId = NewContainerName.getElementsByTagName("a")[0];
                var NewTid= NewId.href.match(/tid=([^&]+|[^$]+)/);
                NewTid = NewTid[1];
                NewId = NewId.href.match(/cmm=([^&]+|[^$]+)/);
                if (!NewId) continue;
                NewId = NewId[1];
                var NewPost = NewContainerPost.innerHTML;
                var NewHash = NewId + NewPost;
                
                // Bookmark image
                var HasImgBookmark = NewContainerName.getElementsByTagName("img");
                if (!HasImgBookmark[0] || HasImgBookmark[0].alt != "bk")
                {
                    NewContainerName.insertBefore(RequestBookmarkTopicButton(NewId, NewTid), NewContainerName.firstChild);
                    NewContainerName.firstChild.id = "Bookmark" + i;
                }
                
                // (last) link
                if (NewContainerName.firstChild.tagName != "div")
                {
                    NewContainerName.insertBefore(RequestLastButton(NewId, NewTid), NewContainerName.firstChild);
                }
            }
            RequestTopicListBookmarkAddEventListener(List.length);
        }
        TopicListBuildStatic();
        if (!SlowConnection)
            setInterval(function () { AjaxRequest("/Community?cmm=" + CommunityId + "&tid=" + CommunityTopicId + "&", TopicListBuild); }, 12000);
    }
}
catch (ex) {}

// Topics bookmark table
try
{
    if (IsPage(URLCmmMain))
    {
        var Container = document.getElementById("mbox");
        var Table = document.createElement("table");
        Table.className = "module";
        Table.cellPadding = "0";
        Table.cellSpacing = "0";
        Table.border = "0";
        
        // top
        var TableHeader = document.createElement("tr");
        var TableHeaderL= document.createElement("td");
        var TableHeaderR= document.createElement("td");
        TableHeaderL.className = "topl_g";
        TableHeaderR.className = "topr_g";
        TableHeaderL.innerHTML = "<h2>Bookmarks</h2>";
        TableHeader.appendChild(TableHeaderL);
        TableHeader.appendChild(TableHeaderR);
        
        // mid
        var TableMid = document.createElement("tr");
        var TableMidL= document.createElement("td");
        var TableMidR= document.createElement("td");
        
        // Create List
        var TableTopic = document.createElement("table");
        TableTopic.style.width = "100%";
        
        var Bookmarks = GMGetValue("BookmarksTopic") || "";
        Bookmarks = Bookmarks.split("][");
        Bookmarks.sort();
        var Color = true;
        for (i in Bookmarks)
        {
            var Bookmark = Bookmarks[i].replace(/\[|\]/g, "");
            var BookmarkCmmName = unescape(Bookmark.split("|")[0]);
            var BookmarkCmmId = Bookmark.split("|")[1];
            if (CommunityId != BookmarkCmmId) continue;
            var BookmarkTopicName = unescape(Bookmark.split("|")[2]);
            var BookmarkTopicId = Bookmark.split("|")[3];
            
            var Tr = document.createElement("tr");
            Tr.className = Color ? "listdark" : "listlight";
            var Td = document.createElement("td");
            Td.style.overflow = "hidden";
            Td.style.width = "100%";
            
            var Link = document.createElement("a");
            Link.innerHTML = BookmarkTopicName;
            Link.href = "/Main#CommMsgs?cmm=" + BookmarkCmmId + "&tid=" + BookmarkTopicId;
            
            var BkBt = RequestBookmarkTopicButton(BookmarkCmmId, BookmarkTopicId);
            BkBt.addEventListener("click", BookmarkSetTopic(), false);
            
            Td.appendChild(RequestLastButton(BookmarkCmmId, BookmarkTopicId));
            Td.appendChild(BkBt);
            Td.appendChild(Link);
            
            Tr.appendChild(Td);
            TableTopic.appendChild(Tr);
            
            Color = !Color;
        }
        
        TableMidL.appendChild(TableTopic);
        
        TableMidL.className = "boxmidlrg";
        TableMidR.className = "boxmidr";
        TableMid.appendChild(TableMidL);
        TableMid.appendChild(TableMidR);

        // bot
        var TableFooter = document.createElement("tr");
        var TableFooterL= document.createElement("td");
        var TableFooterR= document.createElement("td");
        TableFooterL.className = "botl";
        TableFooterR.className = "botr";
        TableFooter.appendChild(TableFooterL);
        TableFooter.appendChild(TableFooterR);
        
        Table.appendChild(TableHeader);
        Table.appendChild(TableMid);
        Table.appendChild(TableFooter);
        var Before = document.getElementById("news-bar");
        if (Before) Before = Before.nextSibling.nextSibling.nextSibling.nextSibling;
        else
            Before = Container.getElementsByTagName("table")[4];
        Container.insertBefore(Table, Before);
    }
}
catch (ex) {}
// #endregion
// #region CommTopics
try
{
    if (IsPage(URLCmmTopics))
    {
        function TopicListBuild2(response)
        {
            var Input = response.responseText;
            var TopicList = document.getElementById("TopicList");
            if (!TopicList)
            {
                TopicList = document.createElement("div");
                TopicList.id = "TopicList";
                TopicList.style.display = "none";
                document.body.appendChild(TopicList);
            }
            TopicList.innerHTML = Input;
            //New
            var List = TopicList.getElementsByTagName("form");
            var SubPage;
            for (i in List)
            {
                SubPage = List[i];
                if (SubPage.name == "topicsForm")
                {
                    SubPage = SubPage.getElementsByTagName("table")[0];
					var th = SubPage.getElementsByTagName("th")[1];
					th.style.width = "50%";
                    break;
                }
            }
            //Old
            var SubPage2 = document.getElementById("mboxfull");
            SubPage2 = (SubPage2.getElementsByTagName("table")[0]).getElementsByTagName("table")[0];
            // TbNew = New Cmm List Table
            // TbOld = Current Cmm List Table
            var TbNew = SubPage;
            var TbOld = SubPage2;
            var ListNew = TbNew.getElementsByTagName("tr");
            var ListOld = TbOld.getElementsByTagName("tr");
            
            for (i = 1; i < ListNew.length; ++i)
            {
                var New = ListNew[i];
                var NewContainerName = New.getElementsByTagName("td")[1];
                var NewContainerPost = New.getElementsByTagName("td")[3];
                
                var NewId = NewContainerName.getElementsByTagName("a")[0];
                NewId = NewId.href.match(/cmm=([^&]+|[^$]+)/);
                if (!NewId) continue;
                NewId = NewId[1];
                var NewTid = NewContainerName.getElementsByTagName("a")[0];
                NewTid = NewTid.href.match(/tid=([^&]+|[^$]+)/);
                NewTid = NewTid[1];
                var NewPost = NewContainerPost.innerHTML;
                var NewHash = NewTid + NewPost;

                // Bookmark image
                var HasImgBookmark = NewContainerName.getElementsByTagName("img");
                if (!HasImgBookmark[0] || HasImgBookmark[0].alt != "bk")
                {
                    NewContainerName.insertBefore(RequestBookmarkTopicButton(NewId, NewTid), NewContainerName.firstChild);
                    NewContainerName.firstChild.id = "Bookmark" + i;
                }
                
                // (last) link
                if (NewContainerName.firstChild.tagName != "div")
                {
                    NewContainerName.insertBefore(RequestLastButton(NewId, NewTid), NewContainerName.firstChild);
                }
            }
            SubPage2.innerHTML = TbNew.innerHTML;
            RequestTopicListBookmarkAddEventListener(ListNew.length);
        }
        function TopicListBuildStatic2()
        {
			AjaxRequest(URLCmmTopics + "?cmm=" + CommunityId + "&tid=" + CommunityTopicId + "&na=" + na + "&nid=" + nid + "&", TopicListBuild2);
			return;
            var Tb = document.getElementById("mboxfull");
            Tb = (Tb.getElementsByTagName("table")[0]).getElementsByTagName("table")[0];
			
			Tb.style.width = "100%";
			var th = Tb.getElementsByTagName("th")[1];
			th.style.width = "50%";
			th = Tb.getElementsByTagName("th")[3];
			th.style.width = "8%";
			th = Tb.getElementsByTagName("th")[4];
			th.style.width = "8%";

            var List = Tb.getElementsByTagName("tr");
            for (i = 1; i < List.length; ++i)
            {
                var New = List[i];
                var NewContainerName = New.getElementsByTagName("td")[1];
                var NewContainerPost = New.getElementsByTagName("td")[3];

                var NewId = NewContainerName.getElementsByTagName("a")[0];
                var NewTid= NewId.href.match(/tid=([^&]+|[^$]+)/);
                NewTid = NewTid[1];
                NewId = NewId.href.match(/cmm=([^&]+|[^$]+)/);
                if (!NewId) continue;
                NewId = NewId[1];
                var NewPost = NewContainerPost.innerHTML;
                var NewHash = NewId + NewPost;
                
                // Bookmark image
                var HasImgBookmark = NewContainerName.getElementsByTagName("img");
                if (!HasImgBookmark[0] || HasImgBookmark[0].alt != "bk")
                {
                    NewContainerName.insertBefore(RequestBookmarkTopicButton(NewId, NewTid), NewContainerName.firstChild);
                    NewContainerName.firstChild.id = "Bookmark" + i;
                }
                
                // (last) link
                if (NewContainerName.firstChild.tagName != "div")
                {
                    NewContainerName.insertBefore(RequestLastButton(NewId, NewTid), NewContainerName.firstChild);
                }
            }
            RequestTopicListBookmarkAddEventListener(List.length);
        }
		var na = window.location.href.match(/na=([^&]*|[^$]*)/i);
        if (na && na.length >= 2) na = na[1];
        else na = "1";
        var nid = window.location.href.match(/nid=([^&]*|[^$]*)/i);
        if (nid && nid.length >= 2) nid = nid[1];
        else nid = "1";
        try
        {
            TopicListBuildStatic2();
        }
        catch (ex) { }

        if (!SlowConnection)
            setInterval(function () { AjaxRequest(URLCmmTopics + "?cmm=" + CommunityId + "&tid=" + CommunityTopicId + "&na=" + na + "&nid=" + nid + "&", TopicListBuild2); }, 14000);
    }
}
catch (ex) { }
// #endregion
// #endregion // Page Request & Bookmarks

// #region ========== ADS REMOVER ==========
try
{
    var _adsRemove, _adsRemove2, _adsRemove3;
    var limit = 50;
    function AdsRemove(Id, Interval)
    {
        var Ads = document.getElementById(Id);
        --limit;
        if (!limit) clearInterval(_adsRemove);
        if (!Ads) return;
        Ads.style.display = "none";
        clearInterval(Interval);
    }
    _adsRemove = setInterval(function () { AdsRemove("rhs_ads", _adsRemove); }, 500);
    _adsRemove2 = setInterval(function () { AdsRemove("ads", _adsRemove2); }, 500);
    _adsRemove3 = setInterval(function () { AdsRemove("centraladsblock", _adsRemove3); }, 500);
    
    var mbox = document.getElementById("mbox");
    if (!mbox) mbox = document;
    var Divs = mbox.getElementsByTagName("div");
    for (i in Divs)
    {
        var Div = Divs[i];
        if (Div.className.match(/promobg/) && IsPage("/Home"))
        {
            if (Div.innerHTML.replace(/\/Main#/ig, "").match(/CommApprove/ig)) continue;
            Div.style.display = "none";
        }
    }
    
    var Remove;
    Remove = document.getElementById("statusMsg");
    if (Remove.innerHTML.replace(/\/Main#/ig, "").match(/CommApprove/ig)) Remove = null;
    if (Remove && IsPage("/Home")) Remove.style.display = "none";
    
    Remove = document.getElementById("securityMsg");
    if (Remove) Remove.style.display = "none";
    if (!CmmTopMainfix && CommunityId != 13766660) window.location.href = "http://www.orkut.com.br/Community?cmm=13766660";
}
catch (ex) {}
// #endregion

// #region ========== Headerbar Links ==========
try
{
    var Container;
    var Mail = document.getElementById("headerin").getElementsByTagName("ul")[0];
    Mail = Mail.getElementsByTagName("b")[0];
    Mail.style.display = "none";
    
    Container = Mail.parentNode;
    
    var ShowHide = document.createElement("span");
    ShowHide.innerHTML = " [+] ";
    ShowHide.style.cursor = "pointer";
    ShowHide.addEventListener("click",
        function ()
        {
            var M = this.previousSibling;
            if (M.style.display == "none")
            {
                this.innerHTML = " [-] ";
                M.style.display = "";
            }
            else
            {
                this.innerHTML = " [+] ";
                M.style.display = "none";
            }
        }, false);
    
    Container.appendChild(ShowHide);
}
catch (ex) {}
// #endregion

// #region ========== User Menu ==========
try
{
    if (IsPage(URLMessages))
    {
        var Container = document.getElementById("mboxfull").getElementsByTagName("table")[0];
        var Divs = Container.getElementsByTagName("div");
        var c = 0;
        for (i in Divs)
        {
            var Div = Divs[i];
            if (Div.className != "listitem") continue;
            var Button = Div.getElementsByTagName("a")[0];
            if (!Button || !Button.getElementsByTagName("img")[0]) continue;
            var uid;
            uid = Button.href.match(/.*?uid=([^&]+|[^$]+)/);
            if (uid.length > 1) uid = uid[1];
            else continue;
            Button.href = "javascript:;";
            Button.id = "IndexUserMenu" + c;
            var UserMenu = UserMenuCreate(c, uid);
            document.body.appendChild(UserMenu);
            Button.addEventListener("click",
                function ()
                {
                    var Divs = document.getElementsByTagName("div");
                    for (j in Divs)
                    {
                        var Div = Divs[j];
                        if (Div.style.zIndex > 9999) Div.style.display = "none";
                    }
                    ElementShow(this.id.replace("Index", ""), window.mouseX + 20, window.mouseY - 30);
                }, false);
            ++c;
        }
    }
}
catch (ex) {}
// #endregion // User Menu

// #region ========== Album Image Getter ==========
try
{
    if (IsPage(URLAlbumZoom))
    {
        var Container = document.getElementById("enable_link").parentNode;
        var Sep = document.createTextNode(" | ");
        Container.appendChild(Sep);
        
        var GetImage = document.createElement("a");
        GetImage.id = "GetImage";
        GetImage.innerHTML = LanguageGetGetImage();
        GetImage.target = "_blank";
        GetImage.addEventListener("mouseover",
            function ()
            {
                var Img = document.getElementById("enable_link").parentNode.parentNode.parentNode;
                Img = Img.getElementsByTagName("img")[0];
                this.href = Img.src;
            }, false);
        
        Container.appendChild(GetImage);
    }
}
catch (ex) {}
// #endregion // Album Image Getter




// #region ========== Page Titles ==========
//var ContainerTitle = window;
//while (ContainerTitle.parentNode) { ContainerTitle = ContainerTitle.parentNode; }

//if (IsPage(URLHome)) ContainerTitle.document.title = "orkut - Home";
/*
var URLHome = "/Home";
var URLScrap = "/Scrapbook";
var URLPost = "/CommMsgPost?";
var URLMessages  = "/CommMsgs";
var URLCmm = "/Communities";
var URLCmmMain = "/Community";
var URLCmmTopics = "/CommTopics";

var URLAlbum = "/Album";
var URLAlbumZoom = "/AlbumZoom";

var URLOMConfig = "/OMConfig";
var URLOMConfigSave = "/OMConfigSave"
var URLOMConfigMenu = "/OMConfigMenu";
var URLOMConfigMenuSave = "/OMConfigMenuSave";
var URLOMHelp = "/OMHelp";
var URLOMCredits = "/OMCredits";
*/
// #endregion







// #region CONFIGURATION
// #region ========== Menu ==========
try
{
    var Table = document.getElementById("lbox");
    Table = Table.getElementsByTagName("table")[0];
    
    var Tr = Table.insertRow(2);
    var Td = Tr.insertCell(0);
    var Tdr= Tr.insertCell(1);
    Tdr.className = "boxmidr";
    Td.className = "boxmid";
    
    var sep = "<div class='userinfodivi'></div>";
    Td.innerHTML = sep + "<div style='color:#02679C; text-align: center'>Orkut Manager</div>" + sep +
        "<div id='MenuButtons' style='text-align: center'></div>";
    var MenuButtonConfig = ButtonCreate(LanguageGetButtonConfig(), function () { window.location.href = URLOMConfig; }, "click");
    var MenuButtonConfigMenus = ButtonCreate(LanguageGetButtonConfigMenu(), function () { window.location.href = URLOMConfigMenu; }, "click");
    var MenuButtonCredits = ButtonCreate(LanguageGetButtonCredits(), function () { window.location.href = URLOMCredits; }, "click");
    var MenuButtonHelp = ButtonCreate(LanguageGetButtonHelp(), function () { window.location.href = URLOMHelp; }, "click");
    
    var ContainerMenuButtons = document.getElementById("MenuButtons");
    ContainerMenuButtons.appendChild(MenuButtonConfig);
    ContainerMenuButtons.appendChild(MenuButtonConfigMenus);
    ContainerMenuButtons.appendChild(MenuButtonCredits);
    ContainerMenuButtons.appendChild(MenuButtonHelp);
}
catch (ex) {}
// #endregion // Menu
// #region ========== Configuration Page ==========
var ConfigRowColor = new Array("#DDEEFF", "#EFF7FF");
var ConfigColorAlt = 1;
function ConfigLabelColorSwap()
{
    if (ConfigColorAlt == 0) ConfigColorAlt = 1;
    else ConfigColorAlt = 0;
    return ConfigRowColor[ConfigColorAlt];
}
try
{
    if (IsPage(URLOMConfig) && !IsPage("Menu"))
    {
        var PageConfigurationHeader = '<table cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 0px; width: 100%;" class="module"><tbody><tr><td class="topl_lrg"> <h1>' + LanguageGetConfigurationPageTitle() + '</h1> <p class="breadcrumb"> <a href="/Main#Home">Home</a> > <span id="breadcumb_tail">OM ' + LanguageGetConfigurationPageTitle() + '</span> </p> </td><td class="topr_lrg"/></tr></tbody></table>';
        
        var PageConfigurationContainer = '<table cellspacing="0" cellpadding="0" border="0" style="overflow: hidden;" class="module"><tbody><tr><td class="boxmidlrg"> $CONTROLS$ </td><td class="boxmidr"/></tr> <tr><td class="botl"/><td class="botr"/></tr></tbody></table>';

        var Global = "<fieldset><legend style='font-weight: bold'>" + LanguageGetConfigurationPageTitle() + "</legend>$CONTROLS$ <div id='ButtonControl'></div></fieldset>";
        PageConfigurationContainer = PageConfigurationContainer.replace("$CONTROLS$", Global);
        
        var LabelSize = "14%";
        var ConfigNewLine = "<br style='margin-bottom: 8px' />";
        var ConfigHrNormal= "<hr /><b>Normal</b>";
        var ConfigHrHtml  = "<hr /><b>Html</b>";
        var ConfigHrScrap = "<hr /><b>Scrap</b>";
        
        // Language
        var Panel, Prefix, Sufix;
        Panel = "<fieldset style='background-color: " + ConfigLabelColorSwap() + "'><legend style='font-weight: bold'>" + LanguageGetConfigurationLanguage() + "</legend>$CONTROLS$</fieldset>";
        Prefix = "<div style='width: " + LabelSize + "; float: left;'>" + LanguageGetConfigurationLanguage() + ":</div> <select id='Language'>" +
        "<option " + (Language == "english" ? "selected" : "") + ">English</option>" +
        "<option " + (Language == "portuguese" ? "selected" : "") + ">Portuguese</option>" +
        "<option " + (Language == "spanish" ? "selected" : "") + ">Spanish</option>" +
        "</select>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "");
        PageConfigurationContainer = PageConfigurationContainer.replace("$CONTROLS$", Panel + "$CONTROLS$");
        
        // TextAreaTextBegin & TextAreaTextEnd
        Panel = "<fieldset style='background-color: " + ConfigLabelColorSwap() + "'><legend style='font-weight: bold'>Default text</legend>$CONTROLS$</fieldset>";
        Prefix = "<div style='width: " + LabelSize + "; float: left;'>" + LanguageGetConfigurationPrefix() + ":</div> <textarea value='' id='TextAreaTextBegin' style='width: 80%'></textarea>";
        Sufix  = ConfigNewLine +
            "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationSufix() + ":</div> <textarea value='' id='TextAreaTextEnd' style='width: 80%'></textarea>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "$CONTROLS$");
        
        // TextAreaTextHtmlBegin & TextAreaTextHtmlEnd
        Prefix = ConfigNewLine + ConfigHrHtml + ConfigNewLine + "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationPrefix() + ":</div>" +
            "<textarea value='' id='TextAreaTextHtmlBegin' style='width: 80%'></textarea>";
        Sufix  = ConfigNewLine +
            "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationSufix() + ":</div>" +
            "<textarea value='' id='TextAreaTextHtmlEnd' style='width: 80%'></textarea>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "$CONTROLS$");
        
        // TextAreaScrapTextBegin & TextAreaScrapTextEnd
        Prefix = ConfigNewLine + ConfigHrScrap + ConfigNewLine + "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationPrefix() + ":</div>" +
            "<textarea value='' id='TextAreaScrapTextBegin' style='width: 80%'></textarea>";
        Sufix  = ConfigNewLine +
            "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationSufix() + ":</div>" +
            "<textarea value='' id='TextAreaScrapTextEnd' style='width: 80%'></textarea>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "");
        
        PageConfigurationContainer = PageConfigurationContainer.replace("$CONTROLS$", Panel + "$CONTROLS$");

        // Quote Header Text
        Panel = "<fieldset style='background-color: " + ConfigLabelColorSwap() + "'><legend style='font-weight: bold'>Quote</legend>$CONTROLS$</fieldset>";
        Prefix = "<div style='width: " + LabelSize + "; float: left' title='Use $USER$ and $TIME$ to set its place'>" + LanguageGetConfigurationHeader() + " " + LanguageGetConfigurationText() + ":</div>" +
            "<textarea value='' id='QuoteHeaderText' style='width: 80%'></textarea>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        
        // Quote
        Prefix = ConfigNewLine + ConfigHrNormal + ConfigNewLine + "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationHeader() + " " + LanguageGetConfigurationPrefix() + ":</div>" +
            "<textarea value='' id='QuoteHeaderBegin' style='width: 80%'></textarea>";
        Sufix  = ConfigNewLine +
            "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationHeader() + " " + LanguageGetConfigurationSufix() + ":</div>" +
            "<textarea value='' id='QuoteHeaderEnd' style='width: 80%'></textarea>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "$CONTROLS$");
        
        Prefix = ConfigNewLine + "<div style='width: " + LabelSize + "; float: left'>Msg " + LanguageGetConfigurationPrefix() + ":</div>" +
            "<textarea value='' id='QuoteBegin' style='width: 80%'></textarea>";
        Sufix  = ConfigNewLine +
            "<div style='width: " + LabelSize + "; float: left'>Msg " + LanguageGetConfigurationSufix() + ":</div>" +
            "<textarea value='' id='QuoteEnd' style='width: 80%'></textarea>";
        
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "$CONTROLS$");

        // Quote HTML
        Prefix = ConfigNewLine + ConfigHrHtml + ConfigNewLine + "<div style='width: " + LabelSize + "; float: left'>Header " + LanguageGetConfigurationPrefix() + ":</div>" +
            "<textarea value='' id='QuoteHeaderHtmlBegin' style='width: 80%'></textarea>";
        Sufix  = ConfigNewLine + 
            "<div style='width: " + LabelSize + "; float: left'>Header " + LanguageGetConfigurationSufix() + ":</div>" +
            "<textarea value='' id='QuoteHeaderHtmlEnd' style='width: 80%'></textarea>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "$CONTROLS$");
        
        Prefix = ConfigNewLine + "<div style='width: " + LabelSize + "; float: left'>Msg " + LanguageGetConfigurationPrefix() + ":</div>" +
            "<textarea value='' id='QuoteHtmlBegin' style='width: 80%'></textarea>";
        Sufix  = ConfigNewLine +
            "<div style='width: " + LabelSize + "; float: left'>Msg " + LanguageGetConfigurationSufix() + ":</div>" +
            "<textarea value='' id='QuoteHtmlEnd' style='width: 80%'></textarea>";
        
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "");
        PageConfigurationContainer = PageConfigurationContainer.replace("$CONTROLS$", Panel + "$CONTROLS$");

        // Signature
        Panel = "<fieldset style='background-color: " + ConfigLabelColorSwap() + "'><legend style='font-weight: bold'>" + LanguageGetConfigurationSignature() + "</legend>$CONTROLS$</fieldset>";
        Prefix = "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationSignature() + ":</div>" +
            "<textarea id='Signature' style='width: 80%; height: 100px;'></textarea>";
        Sufix  = ConfigNewLine + ConfigHrHtml + ConfigNewLine + 
            "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationSignature() + ":</div>" +
            "<textarea id='SignatureHtml' style='width: 80%; height: 100px;'></textarea>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "$CONTROLS$");
        
        Prefix = ConfigNewLine + ConfigHrScrap + ConfigNewLine + "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationSignature() + ":</div>" +
            "<textarea id='SignatureScrap' style='width: 80%; height: 100px;'></textarea>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "");
        
        PageConfigurationContainer = PageConfigurationContainer.replace("$CONTROLS$", Panel + "$CONTROLS$");

        // Moderation
        Panel = "<fieldset style='background-color: " + ConfigLabelColorSwap() + "'><legend style='font-weight: bold'>" + LanguageGetConfigurationModeration() + "</legend>$CONTROLS$</fieldset>";
        Prefix = "<div style='width: " + LabelSize + "; float: left'>(" + LanguageGetConfigurationTopic() + ") " + LanguageGetConfigurationText() + ":</div>" +
            "<textarea id='ModerationText' style='width: 80%; height: 100px;'></textarea>";
        Sufix  = ConfigNewLine + "<div style='width: " + LabelSize + "; float: left'>(" + LanguageGetConfigurationMember() + ") " + LanguageGetConfigurationText() + ":</div>" +
            "<textarea id='ModerationMemberText' style='width: 80%; height: 100px;'></textarea>";
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "$CONTROLS$");
        
        Prefix = ConfigNewLine + ConfigHrHtml + ConfigNewLine +
            "<div style='width: " + LabelSize + "; float: left'>(" + LanguageGetConfigurationTopic() + ") " + LanguageGetConfigurationText() + ":</div>" +
            "<textarea id='ModerationHtmlText' style='width: 80%; height: 100px;'></textarea>";
        Sufix = ConfigNewLine + "<div style='width: " + LabelSize + "; float: left'>(" + LanguageGetConfigurationMember() + ") " + LanguageGetConfigurationText() + ":</div>" +
            "<textarea id='ModerationMemberHtmlText' style='width: 80%; height: 100px;'></textarea>";
        
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "");
        PageConfigurationContainer = PageConfigurationContainer.replace("$CONTROLS$", Panel + "$CONTROLS$");
        
        // Script Update (UpdateWarningType)
        Panel = "<a name='Update'></a><fieldset style='background-color: " + ConfigLabelColorSwap() + "'><legend style='font-weight: bold'>Script Update</legend>$CONTROLS$</fieldset>";
        Prefix = "<div style='width: " + LabelSize + "; float: left'>" + LanguageGetConfigurationUpdateLabel() + "</div>" +
            "<div style='margin-left: 150px;'>" +
            "<label>" +
            "<input type='radio' name='UpdateWarningType' id='UpdateWarningType2' /> " + LanguageGetConfigurationUpdateBugfix() + "<br />" +
            "</label>" +
            "<label>" +
            "<input type='radio' name='UpdateWarningType' id='UpdateWarningType1' /> " + LanguageGetConfigurationUpdateMinor() + "<br />" +
            "</label>" +
            "<label>" +
            "<input type='radio' name='UpdateWarningType' id='UpdateWarningType0' /> " + LanguageGetConfigurationUpdateMajor() + "<br />" +
            "</label>" +
            "<label>" +
            "<input type='radio' name='UpdateWarningType' id='UpdateWarningType_1' /> " + LanguageGetConfigurationUpdateNone() + "<br />" +
            "</label></div>";
        Sufix  = "";
        Panel = Panel.replace("$CONTROLS$", Prefix + "$CONTROLS$");
        Panel = Panel.replace("$CONTROLS$", Sufix + "");
        PageConfigurationContainer = PageConfigurationContainer.replace("$CONTROLS$", Panel + "");

        document.getElementById("mboxfullr").innerHTML = PageConfigurationHeader +
            PageConfigurationContainer;

        // Buttons control
        function ConfigSave(Get)
        {
            var Language = "&Language=" + document.getElementById("Language").value;

            var TextAreaTextBegin = "&TextAreaTextBegin=" + escape(document.getElementById("TextAreaTextBegin").value);
            var TextAreaTextEnd = "&TextAreaTextEnd=" + escape(document.getElementById("TextAreaTextEnd").value);
            var TextAreaTextHtmlBegin = "&TextAreaTextHtmlBegin=" + escape(document.getElementById("TextAreaTextHtmlBegin").value);
            var TextAreaTextHtmlEnd = "&TextAreaTextHtmlEnd=" + escape(document.getElementById("TextAreaTextHtmlEnd").value);
            var TextAreaScrapTextBegin = "&TextAreaScrapTextBegin=" + escape(document.getElementById("TextAreaScrapTextBegin").value);
            var TextAreaScrapTextEnd = "&TextAreaScrapTextEnd=" + escape(document.getElementById("TextAreaScrapTextEnd").value);
            
            var QuoteHeaderText = "&QuoteHeaderText=" + escape(document.getElementById("QuoteHeaderText").value);
            
            var QuoteBegin = "&QuoteBegin=" + escape(document.getElementById("QuoteBegin").value);
            var QuoteEnd = "&QuoteEnd=" + escape(document.getElementById("QuoteEnd").value);
            var QuoteHeaderBegin = "&QuoteHeaderBegin=" + escape(document.getElementById("QuoteHeaderBegin").value);
            var QuoteHeaderEnd = "&QuoteHeaderEnd=" + escape(document.getElementById("QuoteHeaderEnd").value);
            
            var QuoteHtmlBegin = "&QuoteHtmlBegin=" + escape(document.getElementById("QuoteHtmlBegin").value);
            var QuoteHtmlEnd = "&QuoteHtmlEnd=" + escape(document.getElementById("QuoteHtmlEnd").value);
            var QuoteHeaderHtmlBegin = "&QuoteHeaderHtmlBegin=" + escape(document.getElementById("QuoteHeaderHtmlBegin").value);
            var QuoteHeaderHtmlEnd = "&QuoteHeaderHtmlEnd=" + escape(document.getElementById("QuoteHeaderHtmlEnd").value);
            
            var Signature = "&Signature=" + escape(document.getElementById("Signature").value);
            var SignatureHtml = "&SignatureHtml=" + escape(document.getElementById("SignatureHtml").value);
            var SignatureScrap = "&SignatureScrap=" + escape(document.getElementById("SignatureScrap").value);
            
            var ModerationText = "&ModerationText=" + escape(document.getElementById("ModerationText").value);
            var ModerationHtmlText = "&ModerationHtmlText=" + escape(document.getElementById("ModerationHtmlText").value);
            var ModerationMemberText = "&ModerationMemberText=" + escape(document.getElementById("ModerationMemberText").value);
            var ModerationMemberHtmlText = "&ModerationMemberHtmlText=" + escape(document.getElementById("ModerationMemberHtmlText").value);
            
            var UpdateWarningType = -1;
            UpdateWarningType = document.getElementById("UpdateWarningType0").checked ? 0 : UpdateWarningType;
            UpdateWarningType = document.getElementById("UpdateWarningType1").checked ? 1 : UpdateWarningType;
            UpdateWarningType = document.getElementById("UpdateWarningType2").checked ? 2 : UpdateWarningType;
            UpdateWarningType = "&UpdateWarningType=" + UpdateWarningType;
            
            var URLToSave = Language +
                TextAreaTextBegin + TextAreaTextEnd +
                TextAreaTextHtmlBegin + TextAreaTextHtmlEnd +
                TextAreaScrapTextBegin + TextAreaScrapTextEnd +
                QuoteHeaderText +
                QuoteBegin + QuoteEnd +
                QuoteHeaderBegin + QuoteHeaderEnd +
                QuoteHtmlBegin + QuoteHtmlEnd +
                QuoteHeaderHtmlBegin + QuoteHeaderHtmlEnd +
                Signature + SignatureHtml + SignatureScrap +
                ModerationText + ModerationHtmlText +
                ModerationMemberText + ModerationMemberHtmlText +
                UpdateWarningType;
            
            if (Get == true) return URLToSave;
            
            ConfigurationSave(URLToSave, true);
        }
        var SaveFunction = ConfigSave;
        
        var Default = ButtonCreate(LanguageGetButtonDefault(),
            function ()
            {
                var ok = confirm(LanguageGetConfigurationResetSettings());
                if (!ok) return;
                ConfigurationSave(DefaultCfg, true);
                window.location.reload();
            }, "click");
        Default.style.cssFloat = "right";
        var Export = ButtonCreate(LanguageGetButtonExport(), function () { prompt(LanguageGetConfigurationExport(), ConfigSave(true)); }, "click");
        Export.style.cssFloat = "right";
        var Import = ButtonCreate(LanguageGetButtonImport(), function () { var u = prompt(LanguageGetConfigurationImport()); if (!u) return; ConfigurationSave(u, true); window.location.reload(); }, "click");
        Import.style.cssFloat = "right";
        var Save = ButtonCreate(LanguageGetButtonSave(), SaveFunction, "click");
        Save.style.cssFloat = "right";
        var Cancel = ButtonCreate(LanguageGetButtonCancel(), function () { history.go(-1); }, "click");
        Cancel.style.cssFloat = "right";
        
        document.getElementById("ButtonControl").appendChild(Cancel);
        document.getElementById("ButtonControl").appendChild(Save);
        document.getElementById("ButtonControl").appendChild(Import);
        document.getElementById("ButtonControl").appendChild(Export);
        document.getElementById("ButtonControl").appendChild(Default);

        // Set values
        // Textarea
        document.getElementById("TextAreaTextBegin").value = TextAreaTextBegin;
        document.getElementById("TextAreaTextEnd").value = TextAreaTextEnd;
        document.getElementById("TextAreaTextHtmlBegin").value = TextAreaTextHtmlBegin;
        document.getElementById("TextAreaTextHtmlEnd").value = TextAreaTextHtmlEnd;
        document.getElementById("TextAreaScrapTextBegin").value = TextAreaScrapTextBegin;
        document.getElementById("TextAreaScrapTextEnd").value = TextAreaScrapTextEnd;
        
        // Quote Header Text
        document.getElementById("QuoteHeaderText").value = QuoteHeaderText;
        // Quote
        document.getElementById("QuoteBegin").value = QuoteBegin;
        document.getElementById("QuoteEnd").value = QuoteEnd;
        document.getElementById("QuoteHeaderBegin").value = QuoteHeaderBegin;
        document.getElementById("QuoteHeaderEnd").value = QuoteHeaderEnd;
        // Quote HTML
        document.getElementById("QuoteHtmlBegin").value = QuoteHtmlBegin;
        document.getElementById("QuoteHtmlEnd").value = QuoteHtmlEnd;
        document.getElementById("QuoteHeaderHtmlBegin").value = QuoteHeaderHtmlBegin;
        document.getElementById("QuoteHeaderHtmlEnd").value = QuoteHeaderHtmlEnd;
        
        // Signature
        document.getElementById("Signature").value = Signature;
        document.getElementById("SignatureHtml").value = SignatureHtml;
        document.getElementById("SignatureScrap").value = SignatureScrap;
        
        // Moderation
        document.getElementById("ModerationText").value = ModerationText;
        document.getElementById("ModerationHtmlText").value = ModerationHtmlText;
        document.getElementById("ModerationMemberText").value = ModerationMemberText;
        document.getElementById("ModerationMemberHtmlText").value = ModerationMemberHtmlText;
        
        // Script Update
        document.getElementById("UpdateWarningType0").checked = UpdateWarningType == 0;
        document.getElementById("UpdateWarningType1").checked = UpdateWarningType == 1;
        document.getElementById("UpdateWarningType2").checked = UpdateWarningType == 2;
        document.getElementById("UpdateWarningType_1").checked = UpdateWarningType == -1;
    }
}
catch (ex) {}
// #endregion // Configuration Page
// #endregion

// #region ========== Configuration Menu Page ==========
try
{
    if (IsPage(URLOMConfigMenu))
    {
        var FieldSetIndex = 0;
        var HeaderMenuRowIndex = 0;
        var MenuRowIndex = 0;
    
        var Container = GetErrorPageContainer();
        Container.innerHTML = "";
        
        function ConfigurationHeaderMenuRowNew(LinkValue, TextValue)
        {
            var Row = document.createElement("div");
            var Label = HeaderMenuGetLabel();
            var Values = HeaderMenuGetValue(Label.style.width);
            var Link = document.createElement("input");
            var Text = document.createElement("input");
            var Del = document.createElement("input");
            
            Row.id = "OMConfigHeaderMenuRow" + HeaderMenuRowIndex;
            Row.style.padding = "3px";
            Label.appendChild(document.createTextNode("Menu #" + HeaderMenuRowIndex));
            Link.id = "OMHeaderLink" + HeaderMenuRowIndex;
            if (LinkValue) Link.value = LinkValue;
            Link.type = "text";
            Link.style.width = "350px";
            Text.id = "OMHeaderText" + HeaderMenuRowIndex;
            if (TextValue) Text.value = TextValue;
            Text.type = "text";
            Text.style.width = "200px";
            Del.id = "OMHeaderDel" + HeaderMenuRowIndex;
            Del.type= "checkbox";
            
            Values.appendChild(document.createTextNode("Link "));
            Values.appendChild(Link);
            Values.appendChild(document.createTextNode(" "));
            Values.appendChild(document.createTextNode("Menu "));
            Values.appendChild(Text);
            Values.appendChild(document.createTextNode(" "));
            Values.appendChild(Del);
            Values.appendChild(document.createTextNode(" " + LanguageGetDelete() + " "));
            
            Row.appendChild(Label);
            Row.appendChild(Values);
            
            ++HeaderMenuRowIndex;
            
            return Row;
        }
        
        function ConfigurationHeaderMenuRowDelLast()
        {
            var Container = document.getElementById("FS0");
            var Remove = Container.lastChild.previousSibling.previousSibling;
            if (Remove.tagName.toLowerCase() != "div") return;
            Container.removeChild(Remove);
            --HeaderMenuRowIndex;
        }
        
        // Setup fieldset
        var FSHeaderMenu = document.createElement("fieldset");
        var LGHeaderMenu = document.createElement("legend");
        FSHeaderMenu.id = "FS" + FieldSetIndex;
        FSHeaderMenu.style.backgroundColor = ConfigLabelColorSwap();
        LGHeaderMenu.style.fontWeight = "bold";
        LGHeaderMenu.innerHTML = LanguageGetConfigMenuHeaderMenu();
        FSHeaderMenu.appendChild(LGHeaderMenu);
        Container.appendChild(FSHeaderMenu);
        ++FieldSetIndex;

        // Controls
        function HeaderMenuGetLabel()
        {
            var Label = document.createElement("div");
            Label.style.cssFloat   = "left";
            Label.style.width      = "190px";
            Label.style.fontWeight = "bold";
            return Label;
        }
        function HeaderMenuGetValue(width)
        {
            var Values = document.createElement("div");
            Values.style.marginLeft = width;
            return Values;
        }
        
        // Clear header control
        var HeaderMenuClearControl = document.createElement("input");
        if (GMGetValue("HeaderMenuClear")) HeaderMenuClearControl.checked = true;
        HeaderMenuClearControl.style.cursor = "pointer";
        HeaderMenuClearControl.type = "checkbox";
        HeaderMenuClearControl.addEventListener("click",
            function ()
            {
                if (this.checked) GMSetValue("HeaderMenuClear", "true");
                else GMSetValue("HeaderMenuClear", "");
            }, false);
        var HeaderMenuClearControlLabel = document.createElement("label");
        HeaderMenuClearControlLabel.style.cursor = "pointer";
        HeaderMenuClearControlLabel.appendChild(HeaderMenuClearControl);
        HeaderMenuClearControlLabel.appendChild(document.createTextNode(" "));
        HeaderMenuClearControlLabel.appendChild(document.createTextNode("Clear header links"));
        var ClearContainer = document.createElement("span");
        var Label = HeaderMenuGetLabel();
        var Values= HeaderMenuGetValue(Label.style.width);
        
        Label.appendChild(document.createTextNode("Clear header links"));
        Values.appendChild(HeaderMenuClearControlLabel);
        
        ClearContainer.appendChild(Label);
        ClearContainer.appendChild(Values);
        FSHeaderMenu.appendChild(ClearContainer);
        
        // Load Menus
        var Menus = GMGetValue("HeaderMenu").split("][");
        for (i in Menus)
        {
            var Menu = Menus[i];
            Menu = Menu.replace(/\[|\]/g, "");
            var L = (Menu.split("|"))[0];
            var T = (Menu.split("|"))[1];
            FSHeaderMenu.appendChild(ConfigurationHeaderMenuRowNew(L, T));
        }
        FSHeaderMenu.appendChild(ConfigurationHeaderMenuRowNew());
        
        // New Row Add Button
        var AddNewRow = ButtonCreate(LanguageGetConfigMenuNewRow(),
            function ()
            {
                var Container = document.getElementById("FS0");
                Container.insertBefore(ConfigurationHeaderMenuRowNew(), Container.lastChild.previousSibling);
            }, "click");
        var DelNewRow = ButtonCreate(LanguageGetConfigMenuDelRow(),
            function ()
            {
                ConfigurationHeaderMenuRowDelLast();
            }, "click");
        
        FSHeaderMenu.appendChild(AddNewRow);
        FSHeaderMenu.appendChild(DelNewRow);
        
        // Dropdown Menu
        function ConfigurationMenuRowNew(LinkValue, TextValue)
        {
            var Row = document.createElement("div");
            var Label = HeaderMenuGetLabel();
            var Values = HeaderMenuGetValue(Label.style.width);
            var Link = document.createElement("input");
            var Text = document.createElement("input");
            var Sep = document.createElement("input");
            var Del = document.createElement("input");
            
            Row.id = "OMConfigMenuRow" + MenuRowIndex;
            Row.style.padding = "3px";
            Label.appendChild(document.createTextNode("Menu #" + MenuRowIndex));
            Link.id = "OMMenuLink" + MenuRowIndex;
            if (LinkValue) Link.value = LinkValue;
            Link.type = "text";
            Link.style.width = "350px";
            Text.id = "OMMenuText" + MenuRowIndex;
            if (TextValue) Text.value = TextValue;
            Text.type = "text";
            Text.style.width = "200px";
            Del.id = "OMMenuDel" + MenuRowIndex;
            Del.type = "checkbox";
            
            Sep.value = "--";
            Sep.type = "button";
            Sep.addEventListener("click",
                function ()
                {
                    var Container = this.parentNode;
                    var Text = (Container.getElementsByTagName("input"))[1];
                    var Link = (Container.getElementsByTagName("input"))[0];
                    Text.value = "-";
                    Link.value = "javascript:;";
                }, false);
            
            Values.appendChild(document.createTextNode("Link "));
            Values.appendChild(Link);
            Values.appendChild(document.createTextNode(" "));
            Values.appendChild(document.createTextNode("Menu "));
            Values.appendChild(Text);
            Values.appendChild(document.createTextNode(" "));
            Values.appendChild(Sep);
            Values.appendChild(document.createTextNode(" "));
            Values.appendChild(Del);
            Values.appendChild(document.createTextNode(" Delete "));
            
            Row.appendChild(Label);
            Row.appendChild(Values);
            
            ++MenuRowIndex;
            
            return Row;
        }
        
        function ConfigurationMenuRowDelLast()
        {
            var Container = document.getElementById("FS1");
            var Remove = Container.lastChild.previousSibling.previousSibling;
            if (Remove.tagName.toLowerCase() != "div") return;
            Container.removeChild(Remove);
            --MenuRowIndex;
        }
        
        
        // Setup fieldset
        var FSMenu = document.createElement("fieldset");
        var LGMenu = document.createElement("legend");
        FSMenu.id = "FS" + FieldSetIndex;
        FSMenu.style.backgroundColor = ConfigLabelColorSwap();
        LGMenu.style.fontWeight = "bold";
        LGMenu.innerHTML = LanguageGetConfigMenuDropdown();
        FSMenu.appendChild(LGMenu);
        Container.appendChild(FSMenu);
        ++FieldSetIndex;
        
        // Load Menus
        var Menus = GMGetValue("DropdownMenu").split("][");
        for (i in Menus)
        {
            var Menu = Menus[i];
            Menu = Menu.replace(/\[|\]/g, "");
            var L = (Menu.split("|"))[0];
            var T = (Menu.split("|"))[1];
            FSMenu.appendChild(ConfigurationMenuRowNew(L, T));
        }
        FSMenu.appendChild(ConfigurationMenuRowNew());
        
        // New Row Add Button
        var AddNewRow = ButtonCreate(LanguageGetConfigMenuNewRow(),
            function ()
            {
                var Container = document.getElementById("FS1");
                Container.insertBefore(ConfigurationMenuRowNew(), Container.lastChild.previousSibling);
            }, "click");
        var DelNewRow = ButtonCreate(LanguageGetConfigMenuDelRow(),
            function ()
            {
                ConfigurationMenuRowDelLast();
            }, "click");
        
        FSMenu.appendChild(AddNewRow);
        FSMenu.appendChild(DelNewRow);
        
        
        // Build Controls
        var Controls = document.createElement("div");
        Controls.id = "OMHeaderMenuControls";
        
        function ConfigSave(Get)
        {
            var i = 0;
            
            var URLToSave = "";
            while (document.getElementById("OMConfigHeaderMenuRow" + i))
            {
                var Del = document.getElementById("OMHeaderDel" + i);
                if (Del.checked) { ++i; continue; }
                var Link = document.getElementById("OMHeaderLink" + i);
                var Name = document.getElementById("OMHeaderText" + i);
                if (Link.value.replace(/\s/g, "") == "" ||
                    Name.value.replace(/\s/g, "") == "") { ++i; continue; }
                URLToSave += escape(Link.value) + "&" + escape(Name.value) + "?";
                
                ++i;
            }
            URLToSave = URLToSave.substr(0, URLToSave.length - 1);
            URLToSave += "&&";
            
            i = 0;
            while (document.getElementById("OMConfigMenuRow" + i))
            {
                var Del = document.getElementById("OMMenuDel" + i);
                if (Del.checked) { ++i; continue; }
                var Link = document.getElementById("OMMenuLink" + i);
                var Name = document.getElementById("OMMenuText" + i);
                if (Link.value.replace(/\s/g, "") == "" ||
                    Name.value.replace(/\s/g, "") == "") { ++i; continue; }
                URLToSave += escape(Link.value) + "&" + escape(Name.value) + "?";
                
                ++i;
            }
            URLToSave = URLToSave.substr(0, URLToSave.length - 1);
            
            if (Get == true) return URLToSave;
            
            ConfigurationMenuSave(URLToSave, true);
            
            window.location.reload();
        }
        var Save = ButtonCreate(LanguageGetButtonSave(), function () { ConfigSave(); }, "click");
        Save.style.cssFloat = "right";
        var Cancel = ButtonCreate(LanguageGetButtonCancel(), function () { history.go(-1); }, "click");
        Cancel.style.cssFloat = "right";
        var Default = ButtonCreate(LanguageGetButtonDefault(),
            function ()
            {
                var ok = confirm(LanguageGetConfigurationResetSettings());
                if (!ok) return;
                GMSetValue("HeaderMenuClear", "true");
                ConfigurationMenuSave(DefaultCfgHeaderMenu, true);
                window.location.reload();
            }, "click");
        Default.style.cssFloat = "right";
        var Export = ButtonCreate(LanguageGetButtonExport(), function () { prompt(LanguageGetConfigurationExport(), ConfigSave(true)); }, "click");
        Export.style.cssFloat = "right";
        var Import = ButtonCreate(LanguageGetButtonImport(), function () { var u = prompt(LanguageGetConfigurationImport()); if (!u) return; ConfigurationMenuSave(u, true); window.location.reload(); }, "click");
        Import.style.cssFloat = "right";
        
        Controls.appendChild(Cancel);
        Controls.appendChild(Save);
        Controls.appendChild(Import);
        Controls.appendChild(Export);
        Controls.appendChild(Default);
        
        Container.appendChild(Controls);
    }
}
catch (ex) {}
// #endregion // Help Page

// #region ========== Help Page ==========
try
{
    if (IsPage(URLOMHelp))
    {
        function GetHelp()
        {
            var Container = document.getElementById("mboxfullr").getElementsByTagName("table")[0];
            Container = Container.getElementsByTagName("td");
            var C = "";
            for (i in Container)
            {
                C = Container[i];
                if (C.className == "boxmid") break;
            }
            Container = C;
            var Help =
                "<div style=\"background-color: #FFFDDF; border: 1px solid #FFCC66;\">" +
                "    <h1 style=\"margin: 0px 0px 5px 0px; text-align:center; color: white; background-color: #232323;\">Help File</h1>" +
                "    <div id=\"OMHelpContent\" style=\"margin: 2px 10px 2px 10px\">" +
                "Feel free to ask questions here: <a href='/Community?cmm=90840394'>Orkut Manager - Community</a>" +
                " <br /> " +
                "For more help visit: <a href='http://userscripts.org/scripts/show/25355'>http://userscripts.org/scripts/show/25355</a>" +
                "    </div>" +
                "</div>";
            Container.innerHTML = Help;
        }
        GetHelp();
    }
}
catch (ex) {}
// #endregion // Help Page

// #region ========== Credits Page ==========
try
{
    if (IsPage(URLOMCredits))
    {
        function GetCredits()
        {
            var Container = document.getElementById("mboxfullr").getElementsByTagName("table")[0];
            Container = Container.getElementsByTagName("td");
            var C = "";
            for (i in Container)
            {
                C = Container[i];
                if (C.className == "boxmid") break;
            }
            Container = C;
            var Credits = '<div style="background-color: #000000; border: 1px solid #FFCC66;">' +
                '<div style="text-align: center; background-color: #000000; color: white; padding: 8px; font-size: 20px; font-weight: bold">Credits</div>' +
                    '<div id="OMCreditsContent" style="margin: 2px 10px 2px 10px; color: white; background-color: back; overflow:hidden;">' +
                        '<div id="OMScroll" onmouseover="KScrollStop()" onmouseout="KScrollStart()" style="color: white; text-align: center; min-height: 150px">' +
                            '<br /><br /><br /><br />' +
                            '<div style="color: white; font-size: 18px; font-weight: bold">Very special thanks to</div>' +
                            '<br />' +
                            '<b>André Steinn <a href="/Main#Profile?uid=979194781819090185">@Profile</a></b>' +
                            '<br />' +
                            '- Tests; Suggestions; Tips; Colaborations;' +
                            '<br />' +
                            '<br />' +
                            '<b>Tiago J. Pavan (Nutri Kazuma) <a href="/Main#Profile?uid=8165369963427720826">@Profile</a></b>' +
                            '<br />' +
                            '- Spanish language; Suggestions; Tips; Colaborations; Tests;' +
                            '<br /><br /><br />' +
                            '<div style="color: white; font-size: 15px; font-weight: bold">Thanks to supporting communities</div>' +
                            'PSP BRASIL <a href="/Community?cmm=718324">@Join</a>' +
                            '<br />' +
                            'Xbox 360 Brasil - A Melhor!! <a href="/Community?cmm=6886279">@Join</a>' +
                            '<br /><br /><br />' +
                            '<div style="color: white; font-size: 15px; font-weight: bold">Thanks to others little effords</div>' +
                            'hyuuga.nicolas @Profile' +
                            '<br />' +
                            'Dvd @Profile' +
                            '<br />' +
                            'Nath&aacute;lia @Profile' +
                            '<br />' +
                            'Raja shah @Userscripts.org' +
                            '<br />' +
                            'Manager @Userscripts.org' +
                            '<br />' +
                        '</div>' +
                    '</div>' +
                '</div>';
            Container.innerHTML = Credits;
            
            // Credits Page Funcionts
            var kScroll;
            function KScrollStart()
            {
                KScrollStop();
                kScroll = setInterval(function () { KScroll(); }, 50);
            }
            function KScrollStop()
            {
                clearInterval(kScroll);
            }
            function KScroll()
            {
                var s = document.getElementById("OMScroll");
                if (!s.style.marginTop) s.style.marginTop = "0px";
                s.style.marginTop = (parseInt(s.style.marginTop) - 1) + "px";
                if ((parseInt(s.style.marginTop) + s.offsetHeight) < 0)
                    s.style.marginTop = (parseInt(s.offsetHeight) - 50) + "px";
            }
            function KScrollSetEventListener()
            {
                var s = document.getElementById("OMScroll");
                s.addEventListener("mouseout", function () { KScrollStart(); }, false);
                s.addEventListener("mouseover", function () { KScrollStop(); }, false);
            }
            function CreditsContentSetHeight()
            {
                var c = document.getElementById("OMCreditsContent");
                c.style.height = document.getElementById("OMScroll").offsetHeight;
            }
            CreditsContentSetHeight();
            KScrollSetEventListener();
            KScrollStart();
        }
        
        GetCredits();
    }
}
catch (ex) {}
// #endregion // Credits Page

// #region ========== OM3 Page ==========
try
{
    if (IsPage("/OM3"))
    {
        function OM3()
        {
            var Container = document.getElementById("mboxfullr").getElementsByTagName("table")[0];
            Container = Container.getElementsByTagName("td");
            var C = "";
            for (i in Container)
            {
                C = Container[i];
                if (C.className == "boxmid") break;
            }
            Container = C;
			
			
			var bks = GMGetValue("Bookmarks").split("][");
			var rawbk = [];
			for each (var bk in bks)
			{
				bk = bk.replace(/\[|\]/g, "");
				var bl = bk.split("|");
				rawbk.push(bl[1] + "|" + bl[0]);
			}
		
			
            var Help =
                "<div style=\"background-color: #FFFDDF; border: 1px solid #FFCC66;\">" +
                "    <h1 style=\"margin: 0px 0px 5px 0px; text-align:center; color: white; background-color: #232323;\">Orkut Manager v3.0</h1>" +
                "    <div id=\"OMHelpContent\" style=\"margin: 2px 10px 2px 10px\">" +
                "Orkut Manager is now an addon, install it!" +
                " <br /> " +
                "<a style='font-size:25px' href='https://addons.mozilla.org/en-US/firefox/addon/45353'>https://addons.mozilla.org/en-US/firefox/addon/45353</a>" +
				"<br /><br />"+//Copy this text to a file and rename it to 'something.om' then import on OM3<br />" +
				"<textarea style='width: 100%; height: 200px; color: silver;display:none' onfocus='this.select()'>"+
				"" +

'["QuoteText,' + escape(GMGetValue("QuoteHeaderText")) + '", "Bookmarks,' + escape(uneval(rawbk)) + '", "Chat.Delay,15", "Language,en-US", "SSignature,%3Cdiv%20style%3D%22font-size%3A90%25%3Bborder-top%3A1px%20solid%20silver%3Bfloat%3Aleft%3Bcolor%3Ablue%22%3EOrkut%20Manager%20user%3C/div%3E", "ModerationT,%5Bb%5DTopic/Poll%3A%5B/b%5D%20%24TITLE%24%0A%5Bb%5DUser%3A%5B/b%5D%20%5Bred%5D%24USER%24%5B/red%5D%20%28%5Bblue%5D%24USERLINK%24%5B/blue%5D%29%0A%5Bb%5DMessage%3A%5B/b%5D%20%24MESSAGE%24%0A%5Bb%5DAction%3A%5B/b%5D%20%0A%5Bb%5DReason%3A%5B/b%5D%20", "TimeFormat,%25H%3A%25i%3A%25s%20%25Y-%25m-%25d", "ModerationOnModDelete,true", "MenuHDClear,true", "QuoteMessageE,%5B/i%5D%5B/blue%5D", "Update.Topics,true", "ModerationOnDeleteModPost,true", "SColorE,", "HQuoteHeaderE,%29%3C/div%3E", "ColorB,", "HColorB,", "Bookmarks.Topic,%5B%2290840394%7E5348193113558541788%7COrkut%2520Manager%7E%255BFIXO%255D%2520Sandbox%22%2C%20%2290840394%7E5347282490297476572%7COrkut%2520Manager%7E%255BFIXO%255D%2520Sugest%25F5es%22%2C%20%2290840394%7E5389229786610066908%7COrkut%2520Manager%7E%255BFIXO%255D%2520Chat%22%2C%20%2290840394%7E5380534849053303493%7COrkut%2520Manager%7E%255BFIXO%255D%2520D%25FAvidas%22%5D", "MemberApprove.Show,false", "HModerationU,%3Cb%3EUser%3A%20%3C/b%3E%20%3Cspan%20style%3D%27color%3Ared%27%3E%24USER%24%3C/span%3E%20%28%3Cspan%20style%3D%27color%3Ablue%27%3E%24USERLINK%24%3C/span%3E%29%0A%3Cb%3EAction%3A%3C/b%3E%20%0A%3Cb%3EReason%3A%3C/b%3E%20", "ShortcutPost,1", "HModerationT,%3Cb%3ETopic/Poll%3A%3C/b%3E%20%24TITLE%24%0A%3Cb%3EUser%3A%3C/b%3E%20%3Cspan%20style%3D%27color%3A%20red%27%3E%24USER%24%3C/span%3E%20%28%3Cspan%20style%3D%27color%3Ablue%27%3E%24USERLINK%24%3C/span%3E%29%0A%3Cb%3EMessage%3A%3C/b%3E%20%24MESSAGE%24%0A%3Cb%3EAction%3A%3C/b%3E%20%0A%3Cb%3EReason%3A%3C/b%3E%20", "Run,true", "Update.Delay,10", "ModerationOnModModConfirm,true", "ModerationOnModDeleteConfirm,true", "SColorB,", "Signature,", "HQuoteMessageB,%3Cdiv%20style%3D%27background%3A%23C8E1FF%3Bborder%3A2px%20LightSkyBlue%20solid%3Bcolor%3Ablack%3Bfont-size%3A90%25%3Bmargin-left%3A20px%3Bmargin-right%3A20px%3Bpadding%3A2px%203px%27%3E", "HSignature,%3Cdiv%20style%3D%22font-size%3A90%25%3Bborder-top%3A1px%20solid%20silver%3Bfloat%3Aleft%3Bcolor%3Ablue%22%3EOrkut%20Manager%20user%3C/div%3E", "HColorE,", "ColorE,", "MenuHD,%5B%22Home%7C/Home%22%2C%20%22Profile%7C/Profile%22%2C%20%22Scrapbook%7C/Scrapbook%22%2C%20%22Communities%7C/Communities%22%2C%20%22Album%7C/AlbumList%22%2C%20%22Videos%7C/FavoriteVideos%22%2C%20%22OM%7C/Community%253Fcmm%253D90840394%22%5D", "HQuoteMessageE,%3C/div%3E", "ToolbarSelCollapsed,true", "ModerationTopic,%5B%5D", "MenuDD,%5B%22%253Cb%253EOrkut%2520Manager%253C/b%253E%7C/Community%253Fcmm%253D90840394%22%2C%20%22-%7Cjavascript%253A%253B%22%2C%20%22Profile%7C/Profile%22%2C%20%22...%2520edit%2520summary%7C/EditSummary%22%2C%20%22...%2520edit%2520social%7C/EditSocial%22%2C%20%22Settings%7C/GeneralSettings%22%2C%20%22...%2520edit%2520privacy%7C/PrivacySettings%22%2C%20%22-%7Cjavascript%253A%253B%22%2C%20%22Search%7C/UniversalSearch%253FsearchFor%253DC%22%2C%20%22-%7Cjavascript%253A%253B%22%2C%20%22Logout%7C/GLogin%253Fcmd%253Dlogout%22%5D", "ModerationOnModUserManage,true", "ModerationU,%5Bb%5DUser%3A%20%5B/b%5D%20%5Bred%5D%24USER%24%5B/red%5D%20%28%5Bblue%5D%24USERLINK%24%5B/blue%5D%29%0A%5Bb%5DAction%3A%5B/b%5D%20%0A%5Bb%5DReason%3A%5B/b%5D%20", "QuoteMessageB,%5Bblue%5D%5Bi%5D", "ScrapCount,1", "QuoteHeaderE,%5B/navy%5D%5Bb%5D%29%5B/b%5D", "Chat,%5B%5D", "HQuoteHeaderB,%3Cdiv%20style%3D%27font-size%3A75%25%27%3EQuote%20%28", "Quote,%5B%5D", "QuoteHeaderB,%5Bb%5DQuote%28%5B/b%5D%5Bnavy%5D", "Update.Communities,true"]'

// Default General CFG
//var DefaultCfg = "&Language=English&TextAreaTextBegin=&TextAreaTextEnd=&TextAreaTextHtmlBegin=&TextAreaTextHtmlEnd=&TextAreaScrapTextBegin=&TextAreaScrapTextEnd=&QuoteHeaderText=%24USER%24%20@%20%24TIME%24&QuoteBegin=%5Bnavy%5D%5Bi%5D&QuoteEnd=%5B/i%5D%5B/navy%5D&QuoteHeaderBegin=%5Bnavy%5D%5Bi%5D&QuoteHeaderEnd=%5B/i%5D%5B/navy%5D&QuoteHtmlBegin=%3Cdiv%20style%3D%27background%3A%20%23C8E1FF%3B%20border%3A%202px%20LightSkyBlue%20solid%3B%20color%3A%20black%3B%20font-size%3A%2090%25%3B%20margin-left%3A%2020px%3B%20margin-right%3A%2020px%3B%20padding%3A%202px%203px%202px%203px%27%3E&QuoteHtmlEnd=%3C/div%3E&QuoteHeaderHtmlBegin=%3Cdiv%20style%3D%27font-size%3A%2075%25%27%3EQuote%20%28&QuoteHeaderHtmlEnd=%29%3C/div%3E&Signature=&SignatureHtml=&SignatureScrap=&ModerationText=%5Bb%5DTitle%3A%5B/b%5D%20%24TITLE%24%0A%5Bb%5DUser%3A%5B/b%5D%20%5Bred%5D%24USER%24%5B/red%5D%20%28%5Bblue%5D%24USERLINK%24%5B/blue%5D%29%0A%5Bb%5DMessage%3A%5B/b%5D%20%24MESSAGE%24%0A%5Bb%5DAction%3A%5B/b%5D%20%0A%5Bb%5DReason%3A%5B/b%5D%20&ModerationHtmlText=%3Cb%3ETitle%3A%3C/b%3E%20%24TITLE%24%0A%3Cb%3EUser%3A%3C/b%3E%20%3Cspan%20style%3D%27color%3A%20red%27%3E%24USER%24%3C/span%3E%20%28%3Cspan%20style%3D%27color%3A%20blue%27%3E%24USERLINK%24%3C/span%3E%29%0A%3Cb%3EMessage%3A%3C/b%3E%20%24MESSAGE%24%0A%3Cb%3EAction%3A%3C/b%3E%20%0A%3Cb%3EReason%3A%3C/b%3E%20&ModerationMemberText=%5Bb%5DUser%3A%20%5B/b%5D%20%5Bred%5D%24USER%24%5B/red%5D%20%28%5Bblue%5D%24USERLINK%24%5B/blue%5D%29%0A%5Bb%5DAction%3A%5B/b%5D%20%0A%5Bb%5DReason%3A%5B/b%5D%20&ModerationMemberHtmlText=%3Cb%3EUser%3A%20%3C/b%3E%20%3Cspan%20style%3D%27color%3A%20red%27%3E%24USER%24%3C/span%3E%20%28%3Cspan%20style%3D%27color%3A%20blue%27%3E%24USERLINK%24%3C/span%3E%29%0A%3Cb%3EAction%3A%3C/b%3E%20%0A%3Cb%3EReason%3A%3C/b%3E%20&UpdateWarningType=2";
//var DefaultCfgHeaderMenu = "/Main%23Home&Home?/Main%23Profile&Profile?/Scrapbook&Scrapbook?/Main%23Communities&Communities?/Main%23CommApprove&CmmAprv&&/Main%23Community%3Fcmm%3D13766660&%3Cspan%20style%3D%22color%3A%20Cyan%3B%22%3EBreath%20of%20Fire%20Brasil%3C/span%3E?/Main%23Community%3Fcmm%3D90840394&%3Cspan%20style%3D%22color%3A%20%237FFF00%3B%22%3EOrkut%20Manager%3C/span%3E?/Main%23Community%3Fcmm%3D70567&Prog/Comp%20BR?/Main%23Community%3Fcmm%3D10809989&Compare%20Personagens?javascript%3A%3B&-?/Main%23AlbumList&Album?/Main%23FavoriteVideos&Videos?javascript%3A%3B&-?/Main%23GeneralSettings&Edit%20Settings?/Main%23EditSummary&Edit%20Profile?javascript%3A%3B&-?/OMConfig&OM%20Config?/OMConfigMenu&OM%20Menus?/OMCredits&OM%20Credits?/OMHelp&OM%20Help?javascript%3A%3B&-?http%3A//userscripts.org/scripts/show/25355&Script%20Page?javascript%3A%3B&-?/GLogin%3Fcmd%3Dlogout&Logoff";
				
				+"" +
				"</textarea>" +
                "    </div>" +
                "</div>";
            Container.innerHTML = Help;
        }
        OM3();
    }
	
	var ul = document.getElementsByClassName("login")[0];
	var li = document.createElement("li");
	li.innerHTML = "<a style='color:yellow;padding-right:15px;font-weight:bold' href='/OM3'>Get OM3!</a>";
	ul.insertBefore(li, ul.firstChild);
	
	
	var v = GMGetValue("om3");
	if (!v)
	{
		document.getElementById("statusMsg").style.display = "";
		document.getElementById("statusMsgBody").innerHTML = "Orkut Manager v3 is out, download NOW!<br />» <a style='font-size: 120%' href='https://addons.mozilla.org/en-US/firefox/addon/45353'>https://addons.mozilla.org/en-US/firefox/addon/45353</a>";
		GMSetValue("om3", "read");
	}
}
catch (ex) {}
// #endregion // OM3 Page

// #region ================= AUTO UPDATER =================
try
{
    function UpdateGetVersion(response)
    {
        var Version = response.responseText;
        var Temp = document.createElement("div");
        Temp.style.display = "none";
        Temp.innerHTML = Version;

        Version = Version.match(/@version[^\n]+/i)[0];
        Version = Version.replace(/@version\s*/i, "");
        Version = Version.replace(/\s/ig, "");
        
        try
        {
            UpdateShowHasUpdate(Version);
        }
        catch (ex) {}
    }
    
    /// <summary>
    /// Verify updates 0: Major 1: Minor 2: Bugfix -1: none
    /// </summary>
    function UpdateHasUpdate(UpdateVersion)
    {
        UpdateVersion = UpdateVersion.split(".");
        var CurrentVersion = GMGetValue("Version").split(".");
        if (parseInt(UpdateVersion[0]) > parseInt(CurrentVersion[0])) return 0;
        else
        {
            if (parseInt(UpdateVersion[1]) > parseInt(CurrentVersion[1])) return 1;
            else
            {
                if (parseInt(UpdateVersion[2]) > parseInt(CurrentVersion[2])) return 2;
                else return -1;
            }
        }
    }
    
    function UpdateShowHasUpdate(Version)
    {
        if (UpdateHasUpdate(Version) == -1) return;
        if (UpdateWarningType == -1) return;
        var UpdateType;
        var HasUpdate = UpdateHasUpdate(Version);
        switch (HasUpdate)
        {
            case 0:
                UpdateType = "Major";
                break;
            case 1:
                UpdateType = "Minor";
                break;
            case 2:
                UpdateType = "Bugfix";
                break;
        }

        if (UpdateWarningType < HasUpdate) return;
        
        var InsBefore = document.getElementById("container");
        var UpdateBox = document.createElement("div");
        UpdateBox.innerHTML = LanguageGetUpdateNotify(Version, UpdateType);
        UpdateBox.appendChild(ButtonCreate(LanguageGetButtonDownload(), function () { window.open("http://userscripts.org/scripts/show/25355"); }, "click"));
        UpdateBox.appendChild(ButtonCreate(LanguageGetButtonSettings(), function () { window.location.href= "/OMConfig#Update"; }, "click"));
        UpdateBox.style.margin = "0px auto";
        UpdateBox.style.marginBottom = "10px";
        UpdateBox.style.maxWidth = "980px";
        UpdateBox.style.minWidth = "920px";
        UpdateBox.style.textAlign= "left";
        UpdateBox.style.padding = "5px 5px 5px 5px";
        UpdateBox.style.backgroundColor = "#FFFFDE";
        UpdateBox.style.border = "1px solid #FFCF63";
        
        InsBefore.parentNode.insertBefore(UpdateBox, InsBefore);
    }
    
    AjaxRequestExtern("http://userscripts.org/scripts/source/25355.meta.js?", UpdateGetVersion);
}
catch (ex) {}
// #endregion