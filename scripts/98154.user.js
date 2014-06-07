// ==UserScript==
// @name          RS_Bundle
// @namespace     http://gmscripts.bigsleep.net/
// @description   Rapidshare Free service helper (v2.6.5)
// @version       2.6.5
// @timestamp     1213852804593
// @homepage      http://userscripts.org/scripts/show/9116
// @include       http://*.rapidshare.tld/*
// @include       http://rapidshare.tld/*
// @include       http://*.rapidsafe.net/*
// @include       http://rapidsafe.net/*
// @include       http://link-protector.com/*
// @exclude       http://rapidshare.tld/users/*
// ==/UserScript==

/* --------------------------------------------------------------------
    This is a Greasemonkey user script.

  To install in Firefox [http://www.getfirefox.com/]
  Install the Greasemonkey extension: http://www.greasespot.net/

  To install in SeaMonkey [http://www.seamonkey-project.org/]
  Install the Greasemonkey-Mod extension:
    http://xsidebar.mozdev.org/modifiedmisc.html#greasemonkey

  If you saved this script to your computer use File -> Open File
    or go to http://userscripts.org/scripts/show/9116 and Install Script

  --------------------------------------------------------------------- */

// Option - Store_Prefs - see UserPrefs below

// - If alerts are off then window can steal focus instead (sometimes)
// * this has no effect on tabs
var stealFocus = true;

// -- Language --
// For text added by this script, English "en", German "de",
//  Polish "pl", French "fr"
//var User_Language = "de";
var User_Language = window.navigator.language;
// * Set in about:config - general.useragent.locale or change them here
// -> See also: Bug 285267 - http://bugzilla.mozilla.org/show_bug.cgi?id=285267

// The language of the Rapidshare webpage
// * currently English "en" or German "de" - example...
//var RS_Language = "de";
var RS_Language = window.navigator.language;
// Language test - set to true for an alert showing your language setting
var Language_Test = false;

// -- New text added to the page --
// - Only edit parts in quotes - but not <keywords> , and do not break quoted lines
var HelpText = { lang: "en" }; // default when User_Language not supported
HelpText.en = {
  ready: "Download ticket ready",
  button: "create link",
  ticket: "Download ticket ready at <future>",
  noslots: "Leave this page open, it will go back in 2 minutes",
  code: "waiting for captcha code",
  nocode: "You must enter the captcha code first!",
  link: "Download Link",
  head: "RS_Bundle Help:",
  enter: "Type in the \"captcha\" code, then press Enter",
  click: [
      "Copy the above link, or use ALT+Click if your download manager suports it.",
      "If you Left-Click the link the download will fail" +
          " if it gets passed to a download manager.",
      "If this links to an image then you can click as you would normally.",
      ],
  addr: "Try waiting longer before trying to download another file",
  wait: [
      "Leave this page open and you will be alerted at <future>" +
          " when you can download from this IP again.", // 1) if alert
      "Leave this page open, it will go back and reload at <future>" +
          " when you can download from this IP again.", // 2) if no alert
      "To upload a file while waiting, select \"Home\" from the Rapidshare menu.",
      ],
  again: "Wait time over, you can download again.",
};
// Deutsch - thanks to freibooter and Automat1kkk
HelpText.de = {
  ready: "Download-Ticket steht bereit",
  button: "Link erstellen",
  ticket: "Download-Ticket bereit um <future>",
  noslots: "Wenn du diese Seite geöffnet hältst, dann springt sie zurück und lädt neu um 2 Minuten",
  code: "warte auf die Eingabe des \"Captcha\"-Codes",
  nocode: "Bitte zuerst den \"Captcha\"-Code eingeben!",
  link: "Download-Link",
  head: "RS_Bundle Hilfe:",
  enter: "Den \"Captcha\"-Code eingeben und dann mit der ENTER-Taste bestätigen",
  click: [
      "Kopiere den obigen Link oder verwende (Alt)-Klick," +
          " wenn dein Downloadmanager dies erlaubt.",
      "Wenn du den Link mit einem Links-Klick an deinen Downloadmanager übergibst," +
          " kann das den Download verhindern.",
      "Wenn dieser Link auf ein Bild zeigt," +
          " kannst du ihn wie üblich anklicken und das Bild anzeigen lassen.",
      ],
  addr: "Versuchen, länger zu warten, bevor Sie versuchen, eine andere Akte zu downloaden",
  wait: [
      "Wenn du diese Seite geöffnet hältst, erhälst du eine Meldung," +
          " um <future>, wenn du wieder downloaden kannst.",
      "Wenn du diese Seite geöffnet hältst, dann springt sie zurück und lädt neu," +
          " um <future>, wenn du wieder downloaden kannst.",
      "Um eine Datei hochzuladen während du wartest, wähle \"Home\" im Rapidshare Menü.",
      ],
  again: "Die Wartezeitzeit ist vorüber, du kann jetzt wieder downloaden.",
};
// Polski - thanks to matrixik
HelpText.pl = {
  ready: "Pobieranie gotowe",
  button: "stwórz link",
  ticket: "Pobieranie b\u0119dzie gotowe o <future>",
  noslots: "Zostaw t\u0105 stron\u0119 otwart\u0105, zostanie ona cofni\u0119ta do poprzedniej strony za 2 min.",
  code: "wpisz kod",
  nocode: "Najpierw wpisz kod!",
  link: "Link pobierania",
  head: "RS_Bundle Pomoc:",
  enter: "Wpisz wy\u015Bwietlony kod i wci\u015Bnij Enter.",
  click: [
      "Skopiuj powy\u017Cszy link lub przytrzymaj ALT i kliknij go," +
          " je\u017Celi twój mened\u017Cer pobierania to obs\u0142uguje.",
      "Je\u015Bli klikniesz lewym przyciskiem \u015Bci\u0105ganie zawiedzie je\u015Bli" +
          " ju\u017C przekaza\u0142e\u015B pobieranie do mened\u017Cera pobierania.",
      "Je\u015Bli to jest link do obrazu mo\u017Cesz klikn\u0105\u0107 normalnie.",
      ],
  addr: "Spróbuj poczeka\u0107 d\u0142u\u017Cej zanim" +
            " b\u0119dziesz \u015Bci\u0105ga\u0142 kolejny plik.",
  wait: [
      "Zostaw t\u0105 stron\u0119 otwart\u0105, zostaniesz powiadomiony o <future>" +
          " kiedy znowu b\u0119dziesz móg\u0142 \u015Bci\u0105ga\u0107 z tego IP.",
      "Zostaw t\u0105 stron\u0119 otwart\u0105, od\u015Bwie\u017Cy si\u0119 o <future>" +
          " kiedy znowu b\u0119dziesz móg\u0142 \u015Bci\u0105ga\u0107 z tego IP.",
      "Aby za\u0142adowa\u0107 plik w czasie czekania, wybierz \"Home\" z Rapidshare menu.",
      ],
  again: "Czas czekania si\u0119 sko\u0144czy\u0142, znowu mo\u017Cesz pobiera\u0107 pliki",
};
// French - thanks to papoo
HelpText.fr = {
  ready: "Téléchargement prêt",
  button: "Créez un lien",
  ticket: "Téléchargement prêt à <future>",
  noslots: "Laissez cette page ouverte, cela reviendra dans 2 minutes",
  code: "dans l'attente du code captcha",
  nocode: "Vous devez entrer le code captcha en premier",
  link: "Lien de téléchargement",
  head: "Aide de RS_Bundle:",
  enter: "Inscrivez le code \"captcha\", puis appuyez sur Entrer",
  click: [
      "Copiez le lien ci-dessus, Ou utilisez ALT+Click si votre gestionnaire" +
          " de téléchargement le supporte.",
      "Si vous faite un clic gauche sur le lien, le téléchargement échouera" +
          " Si il est passé à un gestionnaire de téléchargement.",
      "Si cela pointe vers une image vous pouvez cliquer comme vous" +
          " le feriez normalement.",
      ],
  addr: "Essayez d'attendre plus longtemps avant de tenter de télécharger un autre fichier",
  wait: [
      "Laissez cette page ouverte et vous serez alerté dans <future>" +
          " Quand vous pourrez télécharger à partir de cette adresse IP de nouveau.",
      "Laissez cette page ouverte, en arrière plan, elle sera rechargée à <future>" +
          " Quand vous pourrez télécharger à partir de cette adresse IP de nouveau.",
      "Pour télécharger un fichier en attente, sélectionnez \"Home\" dans le menu Rapidshare.",
      ],
  again: "A la fin du décompte, vous pourrez télécharger de nouveau.",
};

// CSS styles for link and help text
function addHelpStyle(){
  var styles = [
    ".rsbundleFileNotFound, .rsbundleDownloading, " +
        ".rsbundleNoSlots { color: red !important; background: yellow }",
    "#rsbundleLinkP, #rsbundleHelpDiv { text-align: center; margin-left: auto; margin-right: auto; }",
    "/*#rsbundleHelpDiv p { text-align: left; margin-left: 1em; }*/",
    "#rsbundleLinkP span { color: rgb(36, 81, 133); background: rgb(255, 255, 255); }",
    "#rsbundleGetLink { color:green !important; background: silver !important }",
    "#rsbundleHelpDiv { color: rgb(102, 102, 102); background: rgb(255, 255, 255); }",
    "#rsbundleHelpDiv p { color: rgb(0, 0, 0) !important; background: rgb(255, 255, 255); }",
    "#rsbundleFutureP { color: red !important }",
    "#rsbundleGetLink { font-weight: bold; font-size: 1.1em }",
    "#rsbundleLinkP span, #rsbundleGetLink { padding: 0.5em; }",
    "#rsbundleHelpDiv { width: 500px; padding: 0.4em }",
    "#rsbundleLinkP span { margin: auto; border: solid rgb(185, 210, 227) 2px; -moz-border-radius: 8px; }",
    "#rsbundleGetLink { -moz-border-radius: 2px; }",
    "#rsbundleHelpDiv { border: solid silver 2px; -moz-border-radius: 5px }",
    "/* To hide help text remove comments or add to Stylish */",
    "/*#rsbundleHelpDiv { display: none }*/",
    "#rsbundleSavMirror { width: 12em }",
    "/* To always show mirror save button remove comments or add to Stylish */",
    "/*#rsbundleSavMirror { display: block !important }*/",
  ];
  GM_addStyle(styles.join("\n"));
}

/* -- Preference defaults --
 * storePrefs
 *- Allow preferences to be stored in userPref config (true or false)
 ** if set to false before loading a rapidshare site it will not write to prefs
 These do nothing unless storePrefs: false,
 * freeSubmit
 *- Auto-click "Free" submit button (true or false)
 * showAlerts
 *- Show "ready" pop-up alerts (true or false)
 * timerInTitle
 *- Show "wait" timer in title (true or false)
 * createLink
 *- Create "Download Link" link (true or false)
 * autoDownload
 *- Automatically start downloading when timer is 0 (true or false)
 * message: messages displayed in preference manager
 * debug: display debugging message in Error Console */
var UserPrefs = {
  storePrefs: true,
  autoDownload: false,
  freeSubmit: false,
  showAlerts: true,
  createLink: true,
  timerInTitle: true,
  message: {
    autoDownload: "Enable Auto-Download",
    freeSubmit: "Auto-click the Free download button",
    showAlerts: "Show the Download Ready alerts",
    createLink: "Create the download manager Download Link",
    timerInTitle: "Show the Wait Timer in window title",
  },
  debug: false
};

// - Globals -

// free = Free download button value
// clock = var in timer script - first var in <script> or this if no match
// dfname = download form name - used when form search fails
// ddivid = dl form parent id - extracted from timer code
// captcha = captcha text input name (not used)
// string = hidden actionastring (new .com site code)
var RS_Code = { com: {  free: "Free", clock: "c", dfname: "dl", ddivid: "dl", captcha: "accesscode", string: "actionstring" },
    de: { free: "Free", clock: "c", dfname: "dl", ddivid: "dl", captcha: "captcha" } };

// default language is English
var RS_Text = { lang: "en" };
// IP-Adresse 100.100.100.100, You have reached the download limit,
// Too many users downloading right now.
// Download-Ticket nicht bereit (Download ticket is not ready)
RS_Text.en = {
  addr: " IP-address ",
  wait: {
      com: " Alternatively you can wait <num> minute",
      de: " (Or wait <num> minute" },
  noslots: "Too many users",
  notyet: "Download-Ticket not ready",
  you: "You",
};
RS_Text.de = {
  addr: " IP-Adresse ",
  wait: {
      com: " Alternativ können Sie <num> Minute",
      de: " (Or wait <num> minute" },
  noslots: "Zu viele Benutzer",
  notyet: "Download-Ticket nicht bereit",
  you: "Du",
};

// for testing only
var DeBug = false;

/* Check for update
  Define three values in script metadata header
   @homepage for the script homepage
   @timestamp value of javascript:(Date.now())
   @version is optional, will be displayed in message
  timestamp must be duplicated below
  Script source must be defined below
  Script name used in message is RS_Bundle
  updateEntity.header can be "Last-Modified" or "Etag"
   For userscripts.org, default updateEntity.header is "Etag"
   If UserPrefs.storePrefs=false the update header is not used,
   else if the update header matches timestamp is not checked
  userscripts.org returns Etag for "view source" ?format=txt */
var checkUpdate = {
  // Same as metadata @timestamp
  timestamp: 1213852804593,
  // Source of script which contains time stamp
  source: "http://userscripts.org/scripts/review/9116?format=txt",
  handleEvent: function(){
      /* Start update check */
      var xhrheaders = {
          'User-Agent': navigator.userAgent + " Greasemonkey (checkUpdate)",
          'Referer': this.source,
          'Connection': 'close'
        };
      var updateEntity = {header: "Etag", value: undefined}
      if(UserPrefs.storePrefs && GM_getValue){
        try{
          updateEntity.value = GM_getValue('updateEntity');
        }catch(e){
          logit("GM_getValue('updateEntity') thew an exception: " +
              e.name + "; " + e.message);
        }
        if(updateEntity.value){
          [, updateEntity.header, updateEntity.value] = updateEntity.value
              .match(/^(\S+?):\s+(\S.*)$/);
          switch(updateEntity.header){
            case "Etag":
              xhrheaders['If-None-Match'] = updateEntity.value;
              break;
            case "Last-Modified":
              xhrheaders['If-Modified-Since'] = updateEntity.value;
          }
        }
        logit("Header: "+updateEntity.header+", Value: "+updateEntity.value);
      }
      GM_xmlhttpRequest({
          method: "HEAD",
          url: this.source,
          headers: xhrheaders,
          onreadystatechange: function(details) {
              checkUpdate.parseHeaders.call(checkUpdate, details, updateEntity); },
        });
    },
  parseHeaders: function(response, header){
      if(response.readyState == 4){
        logit(response.responseHeaders);
        if(response.status >= 400){ alert("Error: File Not Found"); return; }
        logit(response.status +" "+ response.statusText);
        if(header.value &&
            /\sStatus: 304 Not Modified\b/.test(response.responseHeaders)){
          alert("RS_Bundle is up to date");
          return;
        }
        var re = new RegExp("^(" + header.header + ":\\s+.*?)\\s*$", "m");
        var matched = response.responseHeaders.match(re);
        header.value = (matched)? matched[1]: "";
        logit("Matched "+header.header+" value: " + header.value);
        GM_xmlhttpRequest({
            method: "GET",
            url: this.source,
            headers: {
              'User-Agent': navigator.userAgent+ " Greasemonkey (checkUpdate)",
              'Referer': this.source,
              'Connection': 'close',
              'Pragma': 'no-cache',
              'Cache-Control': 'no-cache',
              'Range': 'bytes=0-511'
            },
            onload: function(xhr) {
              checkUpdate.parseText(xhr.responseText, header.value);
            }
          });
      }
    },
  parseText: function(respText, header){
      // Script name for message adding new version
      var meta = {name: "RS_Bundle "};
      meta.time = respText.match(/^\/\/\s@timestamp\s+(\d+)\s*$/m);
      if(!meta.time){
        logit("@timestamp not found in: " + respText);
        return;
      }
      meta.ver = respText.match(/^\/\/\s@version\s+(\S+)\s*$/m);
      if(meta.ver) meta.name += meta.ver[1];
      if(meta.time[1] > this.timestamp){
        header = "";
        meta.loc = respText.match(/^\/\/\s@homepage\s+(\S+)\s*$/m);
        var updated = new Date(parseInt(meta.time[1], 10));
        var confirmText = "Script has been Updated\n" +
            meta.name + " - is available\n" +
            updated.toLocaleDateString() +", "+ updated.toLocaleTimeString();
        if(!meta.loc){ alert(confirmText) }
        else if( confirm(
            confirmText + "\nClick OK to open script homepage in new tab" ) )
        { GM_openInTab(meta.loc[1]) }
      }else{
        alert(meta.name + " - Not Updated");
      }
      if(UserPrefs.storePrefs && GM_setValue){
        GM_setValue('updateEntity', header);
        logit("Header saved: " + header);
      }
    },
}
/* Tools -> Greasemonkey -> User Script Commands... -> RS_Bundle check for update */
if(GM_registerMenuCommand){ GM_registerMenuCommand( "RS_Bundle check for update",
    function(){ checkUpdate.handleEvent() } );
}

// - Functions -

// Show ticket timer, show alert, etc
function WaitForTicket(clock){
  ad_elms.help.p = document.createElement("p");
  ad_elms.link.span = document.createElement("span");
  ad_elms.link.time = document.createElement("b");
  rs_elms.time = 0;
  if(clock){
    rs_elms.time = unsafeWindow[clock];
    logit("time left: " + rs_elms.time + " seconds");
  }
  // Skip if no timer or timer is 0
  if(rs_elms.time == 0){ return CreateDownloadLink(); }
  var future = new Date();
  future.setTime(future.getTime() + (rs_elms.time * 1000) + 500); // ! add 500
  HelpText[HelpText.lang].ticket = HelpText[HelpText.lang].ticket
      .replace("<future>", future.toLocaleTimeString());
  AddHelpText("ticket", ad_elms.link.span);
  ad_elms.link.span.appendChild(ad_elms.link.time);
  // save title
  var rstitle = document.title;
  // show actual time left
  uTimer = setInterval(updateCount, 1000);
  function updateCount(){
    rs_elms.time = (future - Date.now()) / 1000;
    rs_elms.time = rs_elms.time.toFixed(0);
    if(rs_elms.time <= 0){
      document.title = "Ticket ready : " + rstitle;
      ad_elms.link.time.textContent = "";
      if(!rs_elms.form) return;
      // enable submit button
      rs_elms.button.disabled = false;
      clearInterval(uTimer);
      // auto-download
      if(UserPrefs.autoDownload && rs_elms.input.value.length > 1){
        logit("Auto-downloading");
        if(!UserPrefs.createLink){
          rs_elms.form.submit();
        }else if(document.getElementById("rsbundleGetLink")){
          location.href = ad_elms.link.link.href;
        }
        return;
      }
      if(UserPrefs.showAlerts){ alert(AddHelpText("ready")) }
      else if(stealFocus){ self.focus() }
      return;
    }
    if(UserPrefs.timerInTitle){
      document.title = "[ " + rs_elms.time + " ] " + rstitle;
    }
    if(!UserPrefs.createLink && rs_elms.button){
      // disable submit button
      rs_elms.button.disabled = true;
    }
    ad_elms.link.time.textContent = " [" + rs_elms.time + "]";
  }
  unsafeWindow[clock] = 0;
  // Add ticket ready time element
  ad_elms.help.future = document.createElement("div");
  ad_elms.help.future.id = "rsbundleFutureP";
  ad_elms.help.future.textContent = AddHelpText("ticket");
  // there may a 1-second delay after setting timer
  setTimeout(CreateDownloadLink, 1001);
  return false;
}

// Create download link, etc
function CreateDownloadLink(){
  if(ad_elms.help.block){ ad_elms.help.block.removeAttribute("style") }
  var actionstring, mirrorsxr;
  if(rs_elms.dlform){
    rs_elms.form = document.forms.namedItem(rs_elms.dlform);
  }else{
    rs_elms.form = document.getElementById(rs_elms.dldiv).forms[0];
  }
  OutlineElement(rs_elms.form);
  if(rs_elms.dlcode){
    rs_elms.input = rs_elms.form.elements.namedItem(rs_elms.dlcode);
  }else{
    rs_elms.input = getFirstXPathResult("//input[@type='text']", rs_elms.form);
  }
  if(!rs_elms.input){
    GM_log("Error: Could not find the captcha input element");
    // fix for Happy Hour
    rs_elms.input = rs_elms.form.elements[0];
    if(rs_elms.input.value == "") rs_elms.input.value = "0";
    //return true;
  }
  // add focus to captcha box
  focusOn(rs_elms.input);
  // new .com site
  if(TLD == "com"){
    rs_elms.button = getFirstXPathResult("//input[@type='image']", rs_elms.form);
    if(rs_elms.form.elements.namedItem(RS_Code.com.string)){
      actionstring = rs_elms.form.elements.namedItem(RS_Code.com.string).value;
    }
  }else{
    rs_elms.button = getFirstXPathResult("//input[@type='submit']", rs_elms.form);
    actionstring = rs_elms.button.value;
  }
  // set links tabindex
  for(var l=0; document.links.length > l; l++){
    document.links[l].tabIndex = -1;
  }
  rs_elms.input.tabIndex = 3;
  if(UserPrefs.createLink){
    rs_elms.button.type = "hidden";
    var clbutton = document.createElement("input");
    clbutton.type = "submit";
    clbutton.name = "createLink";
    clbutton.tabIndex = 4;
    clbutton.value = AddHelpText("button");
    rs_elms.button.parentNode.insertBefore(clbutton, rs_elms.button);
  }else{
    rs_elms.button.tabIndex = 4;
  }
  // get mirror selections - xpath result
  mirrorsxr = document.evaluate("//input[@type='radio']", rs_elms.form, null, 7, null);
  if(mirrorsxr.snapshotLength){
    var smbutton = document.createElement("button");
    smbutton.type = "button";
    smbutton.tabIndex = 2;
    smbutton.textContent = "Save Mirror Selection";
    smbutton.id = "rsbundleSavMirror";
    smbutton.style.display = "none";
    smbutton.addEventListener("click", SavMirror, false);
    var mirrordefault = GM_getValue("mirror", "none");
    // .com new code - open mirror list
    if(mirrordefault != "none"){
      document.getElementById("p1").style.display = 'block';
    }
    // set events
    var r;
    for(r=0; mirrorsxr.snapshotLength > r; r++){
      // happy hours fix
      mirrorsxr.snapshotItem(r).setAttribute('onclick',
          mirrorsxr.snapshotItem(r).getAttribute('onclick').replace("\\'","'","g") );
      // another RS error
      mirrorsxr.snapshotItem(r).setAttribute('onclick',
          mirrorsxr.snapshotItem(r).getAttribute('onclick').replace("document.dlf","this.form") );
      mirrorsxr.snapshotItem(r).tabIndex = 1;
      if(mirrorsxr.snapshotItem(r).hasAttribute("onclick")){
        var curaction = mirrorsxr.snapshotItem(r).getAttribute("onclick");
        curaction = curaction.match(/http:\/\/[a-z]+\d+(\w+)\./)[1];
        if(curaction == mirrordefault){
          mirrorsxr.snapshotItem(r).click();
        }
        mirrorsxr.snapshotItem(r).addEventListener("click", GetMirror, true);
      }
    }
    r--;
    mirrorsxr.snapshotItem(r).parentNode.appendChild(smbutton);
  }
  AddHelpText("code", ad_elms.link.span);
  AddHelpText("enter", ad_elms.help.p);
  if(ad_elms.help.future){
    ad_elms.link.span.appendChild(ad_elms.link.time);
    ad_elms.link.block.parentNode
        .insertBefore(ad_elms.help.future, ad_elms.link.block);
  }
  rs_elms.form.addEventListener("submit", CreateLink, true);
  // On submit, add captcha code and create the download link
  function CreateLink(e){
    if (rs_elms.input.value == ""){
      e.preventDefault();
      if(document.getElementById("rsbundleGetLink")){
        ad_elms.link.block.replaceChild(ad_elms.link.span, ad_elms.link.link);
      }
      ad_elms.link.span.textContent = AddHelpText("nocode");
      AddHelpText("enter", ad_elms.help.p);
      rs_elms.input.focus();
      return true;
    }
    // done if no link creation
    if(!UserPrefs.createLink){ return true; }
    e.preventDefault(); // Prevent form submission
    var string = "";
    if(TLD == "de"){
      // .de requires this input, but doesn't check the value
      string = rs_elms.button.name + "=" + encodeURIComponent(actionstring) + "&";
    }
    var fullurl = rs_elms.form.action + "?" + string + rs_elms.input.name + "=" + rs_elms.input.value;
    if(!document.getElementById("rsbundleGetLink")){
      ad_elms.link.link = document.createElement("a");
      ad_elms.link.block.replaceChild(ad_elms.link.link, ad_elms.link.span);
    }
    ad_elms.link.link.href = fullurl;
    ad_elms.link.link.id = "rsbundleGetLink";
    ad_elms.link.link.tabIndex = 5;
    ad_elms.link.link.textContent = AddHelpText("link");
    ad_elms.link.link.appendChild(ad_elms.link.time);
    AddHelpText("click", ad_elms.help.p);
    // focus on the link
    focusOn(ad_elms.link.link);
  }
  function GetMirror(e){ // does not update link
    var curaction = this.getAttribute("onclick");
    actionstring = curaction.match(/http:\/\/[^;'"]+/); //"'
    mirrordefault = curaction.match(/http:\/\/[a-z]+\d+(\w+)\./)[1];
    smbutton.textContent = "Save mirror: " + mirrordefault;
    smbutton.style.display = "block";
  }
  function SavMirror(e){
    GM_setValue("mirror", mirrordefault);
    smbutton.textContent = "Mirror: " + mirrordefault + " saved";
    if(rs_elms.input.value == ""){
      focusOn(rs_elms.input);
    }else{
      CreateLink(e);
    }
  }
  return false;
}

// Remove clutter from pages around element (form name or element ID)
function CleanupPage(block){
  // in case this function is run twice
  if(document.getElementById("rsbundleLinkP")){
    GM_log("CleanupPage(\"" + block + "\"): element rsbundleLinkP already written!");
    return;
  }
  testelm = ( document.forms.namedItem(block) )? document.forms.namedItem(block): document.getElementById(block);
  if(!testelm){ return; }
  logit("clean up tagName = " + testelm.tagName);
  // Remove stuff above element, except for filename and menu(0)
  var strng = "preceding-sibling::*[not(starts-with(text(),'" + RS_Text[RS_Text.lang].you + "'))]"
  testelms = document.evaluate(strng, testelm, null, 7, null);
  for(var i=1; testelms.snapshotLength > i; i++){
    testelms.snapshotItem(i).parentNode.removeChild(testelms.snapshotItem(i));
  }
  // Remove stuff below element - removes everything after
  testelms = document.evaluate("following::*", testelm, null, 7, null);
  for(var i=0; testelms.snapshotLength > i; i++){
    testelms.snapshotItem(i).parentNode.removeChild(testelms.snapshotItem(i));
  }
  // Add new html after element
  AddNewContent(testelm);
}

// Add timer for wait time between downloads (minutes)
function DownloadLimitTimer(time){
  // Get rid of upload progress meter - it causes endless error messeges
  if(testelm = getFirstXPathResult("//iframe[contains(@src, 'uploadid')]")){
    testelm.parentNode.removeChild(testelm);
  }
  testelm = document.getElementById(rs_elms.waitdiv);
  // make sure its a block element - in case they change html
  if(testelm.nodeName != "P" && testelm.nodeName != "DIV" ){
    testelm.id = "";
    if(testelm.parentNode.id){ rs_elms.waitdiv = testelm.parentNode.id }
    else{ testelm.parentNode.id = rs_elms.waitdiv }
  }
  OutlineElement(testelm);
  time = time * 60 * 1000;
  var future = new Date();
  future.setTime(future.getTime() + time);
  ad_elms.link.span = document.createElement("span");
  ad_elms.link.span.id = "rsbundleTimer";
  ad_elms.link.span.style.display = "table";
  ad_elms.link.span.appendChild( document.createTextNode("Download available at " + future.toLocaleTimeString()) );
  ad_elms.link.span.appendChild( document.createElement("br") );
  ad_elms.link.time = document.createTextNode("");
  ad_elms.link.span.appendChild(ad_elms.link.time);

  ad_elms.help.p = document.createElement("p");
  // Remove unrelated HelpText item
  var x = (UserPrefs.showAlerts)?1:0;
  if(HelpText[HelpText.lang].wait[x]){
    HelpText[HelpText.lang].wait.splice(x,1)
    // replace <future>
    HelpText[HelpText.lang].wait[0] = HelpText[HelpText.lang].wait[0].replace("<future>",future.toLocaleTimeString());
  }
  AddHelpText("wait", ad_elms.help.p);
  var timer = new Date(time);
  var timestring = "";
  showTimer();
  function showTimer(){
    if(time > 0){
      // Formatted time string
      timestring = timer.toUTCString().match(/([1-9]:)?\d\d:\d\d\s/)[0];
      ad_elms.link.time.textContent = "Remaining time: " + timestring;
      if(UserPrefs.timerInTitle){ document.title = "RS [ " + timestring + "]" }
      time -= 1000;
      timer.setTime(time);
      setTimeout(showTimer, 1000);
    }else{
      // the future is now
      if(UserPrefs.showAlerts){ alert(HelpText[HelpText.lang].again) }
      history.back();
    }
  }
}

// Test post forms for "Free" button or download form - no timer
function TestPostForms(){
  var allpostforms = document.evaluate("//form[@method='post']", document,
      null, 6, null);
  if(allpostforms.snapshotLength){
    for(var i=0; i < allpostforms.snapshotLength; i++){
      var frm = allpostforms.snapshotItem(i);
      // skip any file upload forms
      if(frm.enctype == "multipart/form-data"){ continue; }
      // skip any sign-up form "https://www.paypal.com/cgi-bin/webscr"
      if(frm.action.indexOf(Domain) == -1){ continue; }
      // make sure its not a login form
      if(getFirstXPathResult("//input[@type='password']", frm)){ continue; }
      if(getFirstXPathResult("//input[(@type='submit' and @value) or @type='image']", frm)){
        // look for captcha text input
        testelms = document.evaluate("//input[@type='text']", frm,
            null, 6, null);
        if(testelms.snapshotLength == 1){
          // could be more than one
          logit("post forms["+i+"] input: " + testelms.snapshotItem(0).name);
          rs_elms.dlcode = testelms.snapshotItem(0).name;
          rs_elms.dlform = (frm.name)?frm.name:"RS_dl";
          continue;
        }
        // new .com code
        if(TLD == "com" && getFirstXPathResult("//input[@type='image']", frm)){
        // The RapidShare Happy Hours
        //if(getFirstXPathResult("//input[@type='submit' and starts-with(@value,'Download ')]", frm)){
          logit("post forms["+i+"] submit: " + frm.elements[frm.elements.length -1].value);
          rs_elms.dlcode = "none";
          rs_elms.dlform = (frm.name)?frm.name:"RS_dl";
          continue;
        }
        // else look for Free button
        var button = getFirstXPathResult("//input[@type='submit' and @value='" +
            RS_Code[TLD].free + "']", frm);
        if(button){
          logit("post form [" + i + "] submit name=" + button.name +
              ", value=" + button.value);
          // this creates a JS error if the "Submitting information" warning is enabled
          if(UserPrefs.freeSubmit){ button.click() }
          else{
            button.focus();
            setTimeout(focusOn, 500, button);
          }
          // done if found
          return true;
        }
      }
    }
  }
  // else goto next test
  return false;
}

// test scripts for form writing function
function TestScriptCode(){
  // get all scripts in body
  var scriptnodes = document.evaluate("//body//script", document, null, 6, null);
  if(scriptnodes.snapshotLength){
    // regex finds unescape code
    var reid = /\.getElementById\(\"?(\w[^)\"]*)\"?\)\.innerHTML\s?=\s?unescape\(\'(.+)\'\)/;
    // or form if no escape
    var reide = /\.getElementById\(\"?(\w[^)\"]*)\"?\)\.innerHTML\s?=[\s\S]+?(<form[^>]+name=\"\w+\"[^>]+>)/i;
    // regex finds any var name with a number value
    var rec = /^[\s\S]*?var\s+(\w+)\s*=\s*(\d+)\;/;
    for(var i=0; i < scriptnodes.snapshotLength; i++){
      var code = scriptnodes.snapshotItem(i).textContent;
      // search for unescape code
      var strs = code.match(reid);
      // look for <form if no unescape
      if(!strs){ strs = code.match(reide); }
      if(!strs) continue;
      rs_elms.dldiv = strs[1];
      logit("script writes to element id: '" + strs[1] + "'");
      // assign unescape code to new var
      strs[3] = unescape(strs[2]);
      logit("innerHTML unescape code: '" + strs[3].substring(0,15) + "'");
      // repeat if no form
      if(strs[3].search(/<form[^>]+>/i) == -1){ continue; }
      // get form name
      rs_elms.dlform = strs[3].match(/<form[^>]+\bname\W+(\w+)\b/i)[1];
      logit("form name: '" + rs_elms.dlform + "'");
      var clock = code.match(rec);
      if(clock[1]){
        logit("ticket timer: var " + clock[1] + " = " + clock[2]);
        rs_elms.clock = clock[1];
        break;
      }else{
        logit("no match for ticket timer in code: " + code.substring(0,12) + "...");
        // use predefined var
        if(unsafeWindow[RS_Code[TLD].clock]){ rs_elms.clock = RS_Code[TLD].clock }
      }
    }
  }
}

// Find text for address downloading or wait
function TestErrText(){
  testelms = document.evaluate("//body//*[contains(text(),'" + RS_Text[RS_Text.lang].addr + "')]",
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i=0; i < testelms.snapshotLength; i++){
    if(/\s\d+\.\d+\.\d+\.\d+\s/.test(testelms.snapshotItem(i).textContent)){
      // Get rid of upload progress meter - it causes endless error messeges
      if(testelm = getFirstXPathResult("//iframe[contains(@src, 'uploadid')]")){
        testelm.parentNode.removeChild(testelm);
      }
      testelm = testelms.snapshotItem(i);
      testelm.setAttribute("class","rsbundleDownloading");
      ad_elms.help.p = document.createElement("p");
      ad_elms.link.span = document.createElement("span");
      ad_elms.link.span.textContent = AddHelpText("addr");
      focusOn(testelm);
      if(!testelm.id){ testelm.id = "RS_ip" }
      CleanupPage(testelm.id);
      return true;
    }
  }
  var strng = RS_Text[RS_Text.lang].wait[TLD].match(/(.+)<num>(.+)/);
  // how to make strng[2] match "minute)" or "minutes)"?
  var expr = "//body//text()[contains(.,'" + strng[1] + "') and contains(.,'" + strng[2] + "')]";
  strng[3] = escaped(strng[0]);
  strng[3] = strng[3].replace(/<num>/,"(\\d+)");
  testelms = document.evaluate(expr, document, null, 6, null);
  if(testelms.snapshotLength){ var re = new RegExp(strng[3]) }
  logit("testelms.snapshotLength = " + testelms.snapshotLength);
  for(var i=0; testelms.snapshotLength > i; i++){
    strng[4] = testelms.snapshotItem(i).textContent;
    logit(testelms.snapshotItem(i).nodeName +
        " Content: " + testelms.snapshotItem(i).textContent +
        " Parent: " + testelms.snapshotItem(i).parentNode.nodeName);
    if(rs_elms.waittime = strng[4].match(re)[1]){
      testelm = testelms.snapshotItem(i).parentNode;
      rs_elms.waitstr = strng[3];
      rs_elms.waitdiv = ( testelm.id )? testelm.id: "RS_wt";
      testelm.id = rs_elms.waitdiv;
      testelm.setAttribute("class","rsbundleWait");
      break;
    }
  }
  //Too many users downloading right now. Please try again in two minutes
  testelm = getFirstXPathResult("//body//text()[starts-with(text(),'" +
      RS_Text[RS_Text.lang].noslots + "')]");
  if(testelm){
    logit(testelm.nodeName + " Content: " + testelm.textContent +
        " Parent: " + testelm.parentNode.nodeName);
    testelm = testelm.parentNode;
    testelm.setAttribute("class","rsbundleNoSlots");
    ad_elms.help.p = document.createElement("p");
    ad_elms.link.span = document.createElement("span");
    ad_elms.link.span.textContent = AddHelpText("noslots");
    document.title = "No slots - " + document.title;
    focusOn(testelm);
    if(!testelm.id){ testelm.id = "RS_noslots" }
    setTimeout(history.back, 2000);
    CleanupPage(testelm.id);
  }
  return false;
}

// add help text to element (HelpText catagory [, element object])
function AddHelpText(cat){
  var text = HelpText[HelpText.lang][cat];
  var obj = arguments[1];
  if(typeof text == 'object'){
    if(!obj){ return text.join("\n") }
    obj.textContent = "";
    for(var i=0; i<text.length; i++){
      obj.appendChild(document.createTextNode(text[i]));
      obj.appendChild(document.createElement("br"));
    }
  }else{
    if(!obj){ return text; }
    obj.textContent = text;
  }
}
// add new elements to page after (element node)
function AddNewContent(node){
  if(!node) return;
  // Add padding to bottom of page
  document.body.appendChild(document.createElement("p"));
  logit("add content after tagName = " + node.tagName);
  ad_elms.link.block = document.createElement("p");
  ad_elms.link.block.id = "rsbundleLinkP";
  ad_elms.link.block.appendChild( ad_elms.link.span );
  ad_elms.help.block = document.createElement("div");
  ad_elms.help.block.id = "rsbundleHelpDiv";
  ad_elms.help.block.appendChild( document.createTextNode(AddHelpText("head")) );
  ad_elms.help.block.appendChild( ad_elms.help.p );
  node.parentNode.insertBefore(ad_elms.help.block, node.nextSibling);
  node.parentNode.insertBefore(ad_elms.link.block, node.nextSibling);
  if(GM_addStyle){ addHelpStyle() }
  if(!ad_elms.help.p.textContent){ ad_elms.help.block.style.visibility = "hidden" }
}
// get browser and user language and check if defined (default)
function getNavLang(def){
  var ul = User_Language;
  if(!HelpText[ul]){ ul = ul.substr(0,2) }
  if(HelpText[ul]){ HelpText.lang = ul }
  var rl = RS_Language;
  // - could check for Rapidshare text ...
  // * "Die Zukunft" (The future) or "Der weltweit größte" (The world's biggest)
  if(!RS_Text[rl]){ rl = rl.substr(0,2) }
  if(RS_Text[rl]){ RS_Text.lang = rl }
  else{ RS_Text.lang = def }
  if(Language_Test){
    alert("User language: " + ul + "\n Using language: " + HelpText.lang +
        "\n RS Language: " + rl + "\n Using language: " + RS_Text.lang);
  }
}
// check if user prefs saved
function CheckUserPrefs(){
  if(UserPrefs.storePrefs && GM_getValue){
    for(opt in UserPrefs){
      // prefs we do not save
      if(/^(storePrefs|message)$/.test(opt)) continue;
      //UserPrefs[opt] = getuserpref(opt, UserPrefs[opt]);
      try{
        var curPref = GM_getValue(opt);
      }catch(e){
        GM_log("GM_getValue(\"" + opt + "\") error... " + e.message);
        // waiting for GM_deleteValue
        if(e.name === "NS_ERROR_UNEXPECTED")
            alert("RS_Bundle: Restart browser to clear empty preference");
            break;
      }
      if(curPref === undefined){
        if(opt == "debug") continue;
        // Open Preference Manager
        rsb_createPreferencesForm();
        break;
      }
      UserPrefs[opt] = curPref;
    }
  }
}
// save user prefs
function SaveUserPrefs(){
  if(!GM_setValue) return;
  for(opt in UserPrefs){
    // prefs we do not save
    if(/^(storePrefs|message)$/.test(opt)) continue;
    GM_setValue(opt, UserPrefs[opt]);
  }
}
// get part of domain (hostname) - 1=tld, 2=domain, 3=subdomain
function getDomainPart(s){
  var domparts = domainname.split(".");
  domparts.reverse();
  // for ccTLD - overkill, just for completeness
  if((domparts[2]) && (domparts[0].length == 2 && domparts[1].length <= 3)){
    // ccTLD TLD - not sure of all valid ones
    var re = /(com|org|edu|sch|gov|mod)/;
    if(re.test(domparts[1]) || domparts[1].length == 2){
      domparts[1] = domparts[1] + "." + domparts[0];
      domparts.shift();
    }
  }
  while(domparts[3]){
    domparts[2] = domparts[3] + "." + domparts[2];
    domparts.splice(3,1);
  }
  return domparts[s-1];
}
// focus and scroll (node) into view
function focusOn(node){
  node = node || document.body;
  var realnode = node.wrappedJSObject || node;
  realnode.focus();
  realnode.scrollIntoView(false);
  scrollByLines(1);
}
// Xpath evaluate returns first node value or null (expression [, node])
function getFirstXPathResult(expr){
  var node = (arguments[1])? arguments[1]: document;
  var result = document.evaluate(expr, node, null,  9, null);
  return result.singleNodeValue;
}
//function encodeRE(s) { return s.replace(/[.*+?|(){}[\]\\]/g, '\\$&'); }
// regex escape .[]()?+
function escaped(str) {
  var re = /[.[\]()?+]/g;
  return str.replace(re,"\\$&");
}
// test function - outline (element obj)
function OutlineElement(obj){
  if(DeBug){
    obj.style.borderStyle="solid";
    obj.style.borderWidth="1px";
    obj.style.borderColor="red";
  }
}
// test function - write (message) to log
function logit(msg){
  if(UserPrefs.debug){
    if(logit.caller.name){
      msg=logit.caller.name + ": " + msg
    }
    if(GM_log) GM_log(msg);
  }
}
// Add a style tag, add css and return element
function US_addStyleTag(css){
  var Style = document.createElement('style');
  Style.type = 'text/css';
  if(document.contentType == "application/xhtml+xml"){
    Style.appendChild( document.createCDATASection(css) );
  }else{
    Style.appendChild( document.createTextNode(css) );
  }
  // Return element so properties can be added
  // Note: Mozilla creates head if it doesnt exist (unless XML)
  return (document.getElementsByTagName('head').length)
      ? document.getElementsByTagName('head').item(0).appendChild(Style): null;
}
/* Preferences Manager */

// Function to add user preference form to page
function rsb_createPreferencesForm(){
  if(document.getElementById("rsb_preferencesBox")){
    rsb_removePreferencesForm();
    return;
  }
  var styles = [
      "/* Styles for RS_Bundle preferences form */",
      "#rsb_preferencesBox {",
      "  text-align: center; color: rgb(94, 94, 94); background: rgb(252, 254, 254);",
      "  min-width: 380px; min-height: 260px; padding: 0.4em 0.8em;",
      "  position: fixed; left: 20%; top: 20%; right: auto; bottom: auto; z-index: 99;",
      "  border: 3px outset rgb(156,102,81); -moz-border-radius: 10px;",
      " }",
      "#rsb_preferencesBox p, #rsb_preferencesBox button { color: rgb(21, 21, 21); }",
      "#rsb_preferencesBox label { cursor: pointer; }",
      "#rsb_preferencesBox p { padding: 0.25em; background: rgb(226,230,237); }",
      "#rsb_preferencesBox button { margin-top: 1em; }",
      "#rsb_preferencesSubmit button { margin: 0em 0.2em; }",
      "#rsb_preferencesBox button, .rsb_preferencesInput { font-size: 0.8em; }",
      ".rsb_preferencesInput[name='debug']:checked  { outline: red solid 2px; }",
    ];
  US_addStyleTag("\n" + styles.join("\n") + "\n").id = "rsb_pref_style";
  var preferencesBox = document.createElement('div');
  document.body.appendChild(preferencesBox);
  preferencesBox.id = "rsb_preferencesBox";
  preferencesBox.appendChild(document.createElement('p'))
      .textContent = "Set RS_Bundle preferences here";
  var preferencesForm = document.createElement('form');
  with(preferencesForm){
    setAttribute("onsubmit", "return false;");
    id = "rsb_preferencesForm";
    appendChild(document.createElement('p')).textContent = "- RS_Bundle Script Options -";
    createFormInput(UserPrefs.freeSubmit, "freeSubmit", UserPrefs.message.freeSubmit + " : ");
    appendChild(document.createElement('br'));
    createFormInput(UserPrefs.showAlerts, "showAlerts", UserPrefs.message.showAlerts + " : ");
    appendChild(document.createElement('br'));
    createFormInput(UserPrefs.createLink, "createLink", UserPrefs.message.createLink + " : ");
    appendChild(document.createElement('br'));
    createFormInput(UserPrefs.autoDownload, "autoDownload", UserPrefs.message.autoDownload + " : ");
    appendChild(document.createElement('br'));
    createFormInput(UserPrefs.timerInTitle, "timerInTitle", UserPrefs.message.timerInTitle + " : ");
    // lastchild
    appendChild(document.createElement('div'))
        .appendChild(document.createElement('p'))
        .textContent = "- Save Options - Apply does not save options -";
    var saveButton = document.createElement('button');
    saveButton.type = "button";
    saveButton.textContent = "Save";
    var applyButton = document.createElement('button');
    applyButton.type = "button";
    applyButton.textContent = "Apply";
    var cancelButton = document.createElement('button');
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    lastChild.id = "rsb_preferencesSubmit";
    lastChild.appendChild(saveButton);
    lastChild.appendChild(applyButton);
    lastChild.appendChild(cancelButton);
    appendChild(document.createElement('p'))
        .appendChild(document.createElement('a'))
        .appendChild(document.createTextNode("RS_Bundle"))
        .parentNode.href="http://userscripts.org/scripts/show/9116";
    lastChild.appendChild( document.createTextNode(" " +
          (new Date(checkUpdate.timestamp)).toLocaleDateString()) );
    createFormInput(UserPrefs.debug, "debug", "enable debug mode : ");
    var updateButton = document.createElement('button');
    updateButton.type = "button";
    updateButton.textContent = "Check for Update";
    appendChild(document.createElement('div')).appendChild(updateButton);
  }
  preferencesBox.appendChild(document.createElement('div')).appendChild(preferencesForm);
  saveButton.addEventListener('click', rsb_updatePreferences, true);
  applyButton.addEventListener('click', rsb_updatePreferences, true);
  cancelButton.addEventListener('click', rsb_removePreferencesForm, true);
  updateButton.addEventListener('click', checkUpdate, true);
  preferencesForm.elements[0].focus();
  function createFormInput(pref, prefName, text){
    var elm = document.createElement('input');
    elm.className = "rsb_preferencesInput";
    elm.name = prefName;
    switch(typeof pref){
      case "string":
      case "number":
        elm.value = pref;
        if(arguments[3]) elm.size = arguments[3];
        break;
      case "boolean":
        elm.type = "checkbox";
        elm.checked = pref;
        break;
      case "object":
        elm.type = "radio"; // pref = ["pref value", true]
        elm.value = pref[0]; // preference value
        elm.checked = pref[1]; // true or false
    }
    preferencesForm.appendChild(document.createElement('label')).appendChild(elm);
    elm.parentNode.insertBefore(document.createTextNode(text), elm);
  }
}
// Remove the preferences form
function rsb_removePreferencesForm(evt){
  if(evt){
    // if Cancel button is pressed
    UserPrefs.debug = evt.target.form.elements.namedItem('debug').checked;
    evt.stopPropagation();
  }
  document.getElementsByTagName('head').item(0)
      .removeChild(document.getElementById("rsb_pref_style"));
  document.body.removeChild(document.getElementById("rsb_preferencesBox"));
}
// Update the new preferences
function rsb_updatePreferences(evt){
  evt.stopPropagation();
  evt.preventDefault();
  with(evt.target.form){
    UserPrefs.freeSubmit = elements.namedItem('freeSubmit').checked;
    UserPrefs.showAlerts = elements.namedItem('showAlerts').checked;
    UserPrefs.createLink = elements.namedItem('createLink').checked;
    UserPrefs.autoDownload = elements.namedItem('autoDownload').checked;
    UserPrefs.timerInTitle = elements.namedItem('timerInTitle').checked;
    UserPrefs.debug = elements.namedItem('debug').checked;
  }
  if(evt.target.textContent == "Save" && UserPrefs.storePrefs) SaveUserPrefs();
  rsb_removePreferencesForm();
}
// Tools -> Greasemonkey -> User Script Commands... -> RS_Bundle preferences
if(GM_registerMenuCommand){
  GM_registerMenuCommand( "RS_Bundle preferences", rsb_createPreferencesForm );
}
// end of functions

// globals
var domainname = window.location.hostname;
var Domain = getDomainPart(2);
var TLD = getDomainPart(1);

ISDLPAGE:
if(Domain == "rapidshare"){
  logit("Domain = " + Domain);
  // upload progress iframe pages have no title (or search.indexOf("uploadid"))
  if(!document.title){ return; }
  // Check for "logged out" page, easier than excluding them all
  if(window.location.pathname.substr(1,7) == "cgi-bin"){ return; }
  var testelm, testelms;
  // "File not found." alert
  if(testelm = getFirstXPathResult("//body//script[starts-with(text(), 'alert')]")){
    // Download ticket is not ready
    if( getFirstXPathResult("//body//text()[starts-with(.,'" +
        RS_Text[RS_Text.lang].notyet + "')]") ){
      history.back();
      return;
    }
    // class for style
    testelm.parentNode.setAttribute("class","rsbundleFileNotFound");
    addHelpStyle();
    focusOn(testelm.parentNode);
    break ISDLPAGE;
  }
  // check prefs before clicking Free button
  CheckUserPrefs();
  // Rapidshare sites default to english
  getNavLang("en");
  // for storing element names found
  var rs_elms = {dlform: "", dldiv: "", clock: null};
  // test post forms sets rs_elms.dlcode and rs_elms.dlform
  if(TestPostForms()){ break ISDLPAGE; }
  // object for storing new elements
  var ad_elms = { link: {block: null, span: null, link: null}, help: {block: null}, clock: null};
  if(!rs_elms.dlform){
    // test script code sets rs_elms.dldiv and rs_elms.dlform and rs_elms.clock
    TestScriptCode();
    if(!rs_elms.dldiv){
      // IP-address already downloading
      if(TestErrText()){ break ISDLPAGE; }
    }
  }
  if(rs_elms.waittime){
    DownloadLimitTimer(rs_elms.waittime);
    CleanupPage(rs_elms.waitdiv);
    break ISDLPAGE;
  }
  if(rs_elms.clock){
    if(WaitForTicket(rs_elms.clock)){ break ISDLPAGE; }
    if(document.getElementById("rsbundleLinkP")){
      GM_log("WaitForTicket(clock) returned false but expected true," +
          "rsbundleLinkP element already written!");
      break ISDLPAGE;
    }
    CleanupPage(rs_elms.dldiv);
    ad_elms.help.block.style.visibility = "hidden";
  }else if(rs_elms.dlform){
    if(WaitForTicket(false)){ break ISDLPAGE; }
    if(document.getElementById("rsbundleLinkP")){
      GM_log("WaitForTicket() returned false but expected true," +
          "rsbundleLinkP element already written!");
      break ISDLPAGE;
    }
    CleanupPage(rs_elms.dlform);
  }
// end isdlpage block
}
// for !rapidshare
NOTDLPAGE:
if(Domain != "rapidshare"){
  logit("domain name is: "+domainname);
  var submitform;
  var newlocation;
  // zip past lix page
  if(domainname == "lix.in"){
    // requires captcha - remove support until/unless workaround found
    return;
    if(submitform = getFirstXPathResult("//form[@action='" + window.location.href + "']")){
      getFirstXPathResult("//input[@type='submit']",submitform).click();
    }else if(newlocation = getFirstXPathResult("//iframe[contains(@src, 'rapidshare.') and not(contains(@src, '?uploadid='))]")){
      // this is the old way that worked before
      window.location.replace(newlocation.src);
    }else if(submitform = getFirstXPathResult("//form[contains(@action, 'rapidshare.') and contains(@action, '/files/')]")){
      // they now use server-side instead of iFrame
      newlocation = submitform.action.replace(/http:\/\/\w+\./,"http://");
      window.location.replace(newlocation);
    }
    break NOTDLPAGE;
  }
  // submit rapidsafe form (not tested on rapidsafe.com)
  if(Domain == "rapidsafe"){
    // if(TLD == "com"){ break NOTDLPAGE; }
    if(submitform = getFirstXPathResult("//form[starts-with(@action, 'http://rapidshare.')]")){
      window.location.replace(submitform.action);
    }
    break NOTDLPAGE;
  }
  // zip past link-protector.com page
  if(Domain == "link-protector"){
    if(newlocation = getFirstXPathResult("//iframe[contains(@src, 'rapidshare.') and not(contains(@src, '?uploadid='))]")){
      stop();
      location.replace(newlocation.src);
    }
    break NOTDLPAGE;
  }
  // end notdlpage block - nothing to do
  return;
}
logit("End of script");

/* :: Descriptor :: */

/* Originally based on Jillians "Rapidshare Bundle"
   name: Rapidshare Bundle; userscripts.org script # 5907 */
