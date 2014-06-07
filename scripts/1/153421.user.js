// ==UserScript==
// @name           4chan ExpandAll
// @namespace      ThePetr
// @description    Expands/Contracts/Toggles all images at once in a thread/overview
// @include        http://boards.4chan.org/*
// @version        1.0
// ==/UserScript==

window.addEventListener("load", createBar, false);
window.addEventListener("load", checkLoad, false);
function checkLoad(){
    var t = setInterval(function() {
    if (document.readyState === "complete") {
        makeBarFixed();
        createEventListeners();
        clearInterval(t);
    }
    }, 1000);
}
function createEventListeners(){
    window.addEventListener("resize",makeBarFixed,false);
    document.getElementById("expandAll").addEventListener("dblclick", fExpandAll, false);//had to make it double click, otherwise toggleAll also ran this one... for some reason
    document.getElementById("toggleAll").addEventListener("click", fToggleAll, false);
}
function createBar(){
	//create the elements_________________________________________________
    var a = document.createElement("div");
    var b= document.createElement("div");
    //--------------------------------------------------------------------
    //set the outerHTML___________________________________________________
	a.appendChild(b);
    a.setAttribute("id", "expandAllWrapper");
	b.setAttribute("id", "expandAll");
	b.innerHTML="&nbsp;<a id='expandAll' href='javascript: void(0);'>[Expand All]</a>&nbsp;<a id='toggleAll' href='javascript:void(1);'>[Toggle All]]</a>&nbsp;";	
    //--------------------------------------------------------------------
	//style_______________________________________________________________
    a.style.float="right";
    b.style.height="20px";
	b.style.background="#FFE";
	b.style.styleposition="fixed";
	b.style.margin="-25px 0 0 0";
	b.style.opacity="0.68";
	b.style.textAlign="right";
	document.getElementById("boardNavDesktop").style.margin="25px 0 0 0";
    //--------------------------------------------------------------------
	document.body.insertBefore(a,document.getElementById("id_css")); //insert the created elements in the page
	//====================================================================
    
}
function makeBarFixed(){
    document.getElementById("expandAll").style.position=""
    var t=setInterval(function(){document.getElementById("expandAll").style.position="fixed";window.clearInterval(t);},250);
}

function fToggleAll(){
	var a = document.getElementsByClassName("fileThumb");
    
	for(i=0;i<a.length;i++){
		if(a[i].parentNode.className.split(" ").length!=2){
			cImageExpansion.expand(a[i].firstChild);     
		}else{
			//cImageExpansion.contract(a[i].lastChild);
            a[i].parentNode.className="file";
            !cMain.tid;
            cConfig.threadHiding;
            a[i].className="fileThumb";
            a[i].firstChild.style.display = "";
            a[i].removeChild(a[i].lastChild);
        }
        
	}
}
function fExpandAll(){
	var a = document.getElementsByClassName("fileThumb");
	for(i=0;i<a.length;i++){
		if(a[i].parentNode.className.split(" ").length!=2){
            cImageExpansion.expand(a[i].childNodes[0]);         
		}
	}
    console.log("went by it this mofo");
}

cImageExpansion = {expand: function(a) {
        var b, c;
        cConfig.imageHover && (b = document.getElementById("image-hover")) && document.body.removeChild(b);
        c = a.parentNode.getAttribute("href");
        if ("pdf" != c.slice(-3))
            if (a.setAttribute("data-expanding", "1"), b = document.createElement("img"), b.alt = "Image", b.className = "fitToPage", b.setAttribute("src", c), b.style.display = "none", a.parentNode.appendChild(b), cUA.hasCORS)
                a.style.opacity = "0.75", this.timeout = cImageExpansion.checkLoadStart(b, a);
            else
                this.onLoadStart(b, a)
    },contract: function(a) {
        var b, c;
        clearTimeout(this.timeout);
        c = a.parentNode;
        b = c.parentNode.parentNode;
        c.parentNode.className="file";
        !cMain.tid
        cConfig.threadHiding 
        c.className="fileThumb";
        c.firstChild.style.display = "";
        c.removeChild(a);
        b.offsetTop < window.pageYOffset 
        b.scrollIntoView();
    },toggle: function(a) {
        a.hasAttribute("data-md5") ? a.hasAttribute("data-expanding") || cImageExpansion.expand(a) : cImageExpansion.contract(a)
    },onLoadStart: function(a, b) {
        b.removeAttribute("data-expanding");
        b.parentNode.parentNode.className=b.parentNode.parentNode.className+" image-expanded";
        
        !cMain.tid 
        cConfig.threadHiding 
        b.parentNode.className=b.parentNode.className+" image-expanded-anti";
        
        a.style.display = "";
        b.style.display = "none"
    },checkLoadStart: function(a, b) {
        if (a.naturalWidth)
            cImageExpansion.onLoadStart(a, b), b.style.opacity = "";
        else
            return setTimeout(cImageExpansion.checkLoadStart, 15, a, b)
    },onExpanded: function() {
        this.onload = this.onerror = null;
        this.style.opacity = 1;
        this.className=this.className+" fitToPage";
    }
}
cConfig = {quotePreview: !0,backlinks: !0,quickReply: !0,threadUpdater: !0,threadHiding: !0,pageTitle: !0,hideGlobalMsg: !0,threadWatcher: !1,imageExpansion: !1,threadExpansion: !1,imageSearch: !1,reportButton: !1,localTime: !1,topPageNav: !1,stickyNav: !1,keyBinds: !1,inlineQuotes: !1,filter: !1,revealSpoilers: !1,replyHiding: !1,imageHover: !1,threadStats: !1,IDColor: !1,downloadFile: !1,embedYouTube: !1,embedSoundCloud: !1,customCSS: !1,hideStubs: !1,compactThreads: !1,dropDownNav: !1,fixedThreadWatcher: !1,persistentQR: !1,disableAll: !1,load: function() {
        (storage = localStorage.getItem("4chan-settings")) ? (storage = JSON.parse(storage)) : cMain.firstRun = !0
    },loadFromURL: function() {
        var a, b;
        a = location.hash.split("=", 2);
        if ("#cfg" == a[0])
            try {
                return b = JSON.parse(decodeURIComponent(a[1])), history.replaceState(null, "", location.href.split("#", 1)[0]), cConfig.save(), b.filters && localStorage.setItem("4chan-filters", b.filters), b.css && localStorage.setItem("4chan-css", b.css), !0
            } catch (c) {
                console.log(c)
            }
        return !1
    },toURL: function() {
        var a, b = {};
        b.settings = localStorage.getItem("4chan-settings");
        if (a = localStorage.getItem("4chan-filters"))
            b.filters = a;
        if (a = localStorage.getItem("4chan-css"))
            b.css = a;
        return encodeURIComponent(JSON.stringify(b))
    },save: function() {
        localStorage.setItem("4chan-settings", JSON.stringify(cConfig))
    }
}         
cUA = {init: function() {
        document.head = document.head ||document.getElementsByTagName("head")[0];
        this.isOpera = "[object Opera]" == Object.prototype.toString.call(window.opera);
        this.hasCORS = "withCredentials" in new XMLHttpRequest;
        this.hasFormData = "FormData" in 
        window;
        var a;
        try {
            new window.CustomEvent("e"), a = !0
        } catch (b) {
            a = !1
        }
        this.hasCustomEventCtor = a
    }}
cMain = {init: function() {
        var a;
        document.addEventListener("DOMContentLoaded", cMain.run, !1);
        cMain.now = Date.now();
        UA.init();
        Config.load();
        cMain.firstRun && Config.loadFromURL() && (cMain.firstRun = !1);
        cMain.firstRun && /Mobile|Android|Dolfin|Opera Mobi/.test(navigator.userAgent) && (Config.disableAll = !0);
        cMain.stylesheet = (cMain.stylesheet = cMain.getCookie(style_group)) ? cMain.stylesheet.toLowerCase().replace(/ /g, "_") : "nws_style" == style_group ? "yotsuba_new" : "yotsuba_b_new";
        cMain.passEnabled = cMain.getCookie("pass_enabled");
        QR.noCaptcha = QR.noCaptcha || cMain.passEnabled;
        cMain.initIcons();
        cMain.addCSS();
        cMain.type = style_group.split("_")[0];
        a = location.pathname.split(/\//);
        cMain.board = a[1];
        cMain.tid = a[3];
        Config.IDColor && IDColor.init();
        Config.customCSS && CustomCSS.init();
        Config.keyBinds && Keybinds.init();
        UA.hasCustomEventCtor && document.dispatchEvent(new CustomEvent("4chancMainInit"))
    },run: function() {
        document.removeEventListener("DOMContentLoaded", cMain.run, !1);
        document.addEventListener("click", cMain.onclick, !1);
        $.id("settingsWindowLink").addEventListener("click", SettingsMenu.toggle, !1);
        $.id("settingsWindowLinkBot").addEventListener("click", SettingsMenu.toggle, !1);
        $.id("settingsWindowLinkMobile").addEventListener("click", SettingsMenu.toggle, !1);
        if (!Config.disableAll) {
            if (Config.dropDownNav)
                $.id("boardNavDesktop").style.display = "none", $.id("boardNavDesktopFoot").style.display = "none", $.removeClass($.id("boardNavMobile"), "mobile");
            else if (cMain.firstRun)
                cMain.onFirstRun();
            $.addClass(document.body, cMain.stylesheet);
            $.addClass(document.body, cMain.type);
            Config.compactThreads && $.addClass(document.body, "compact");
            if (Config.quotePreview || Config.imageHover || Config.filter)
                thread = $.id("delform"), thread.addEventListener("mouseover", cMain.onThreadMouseOver, !1), thread.addEventListener("mouseout", cMain.onThreadMouseOut, !1);
            Config.hideGlobalMsg && cMain.initGlobalMessage();
            Config.stickyNav && cMain.setStickyNav();
            Config.threadExpansion && ThreadExpansion.init();
            Config.threadWatcher && ThreadWatcher.init();
            Config.filter && Filter.init();
            (Config.embedSoundCloud || Config.embedYouTube) && Media.init();
            Config.replyHiding && ReplyHiding.init();
            Config.threadStats && cMain.tid && ThreadStats.init();
            Parser.init();
            cMain.tid ? (cMain.threadClosed = !document.forms.post, cMain.threadSticky = !!$.cls("stickyIcon", $.id("pi" + cMain.tid))[0], Config.pageTitle && cMain.setTitle(), Parser.parseThread(cMain.tid), Config.threadUpdater && ThreadUpdater.init()) : (Config.topPageNav && cMain.setPageNav(), Config.threadHiding ? (ThreadHiding.init(), Parser.parseBoard(), ThreadHiding.purge()) : Parser.parseBoard());
            Config.quickReply && QR.init();
            Media.active && Media.finalize();
            Config.replyHiding && ReplyHiding.purge();
            Config.quotePreview && QuotePreview.init()
        }
    },onFirstRun: function() {
        var a, b;
        if (a = $.id("settingsWindowLink"))
            b = document.createElement("div"), b.id = "first-run", b.innerHTML = "Click me!", a.parentNode.appendChild(b)
    },setThreadState: function(a, b) {
        var c, d, e, f;
        f = a.charAt(0).toUpperCase() + a.slice(1);
        b ? (c = $.cls("postNum", $.id("pi" + cMain.tid))[0], d = document.createElement("img"), d.className = a + "Icon retina", d.title = f, d.src = cMain.icons2[a], "sticky" == a && (e = $.cls("closedIcon", c)[0]) ? (c.insertBefore(d, e), c.insertBefore(document.createTextNode(" "), e)) : (c.appendChild(document.createTextNode(" ")), c.appendChild(d))) : (d = $.cls(a + "Icon", $.id("pi" + cMain.tid))[0], d.parentNode.removeChild(d.previousSibling), d.parentNode.removeChild(d));
        cMain["thread" + f] = b
    },icons: {up: "arrow_up.png",down: "arrow_down.png",download: "arrow_down2.png",refresh: "refresh.png",cross: "cross.png",gis: "gis.png",iqdb: "iqdb.png",minus: "post_expand_minus.png",plus: "post_expand_plus.png",rotate: "post_expand_rotate.gif",quote: "quote.png",report: "report.png",notwatched: "watch_thread_off.png",watched: "watch_thread_on.png",help: "question.png"},icons2: {closed: "closed.gif",sticky: "sticky.gif",trash: "trash.gif"},initIcons: function() {
        var a, b;
        b = "//static.4chan.org/image/";
        if (2 <= window.devicePixelRatio) {
            for (a in cMain.icons)
                cMain.icons[a] = cMain.icons[a].replace(".", "@2x.");
            for (a in cMain.icons2)
                cMain.icons2[a] = cMain.icons2[a].replace(".", "@2x.")
        }
        for (a in cMain.icons2)
            cMain.icons2[a] = b + cMain.icons2[a];
        b += "buttons/" + {yotsuba_new: "futaba/",futaba_new: "futaba/",yotsuba_b_new: "burichan/",burichan_new: "burichan/",tomorrow: "tomorrow/",photon: "photon/"}[cMain.stylesheet];
        for (a in cMain.icons)
            cMain.icons[a] = b + cMain.icons[a]
    },setPageNav: function() {
        var a, b;
        b = document.createElement("div");
        b.setAttribute("data-shiftkey", "1");
        b.setAttribute("data-trackpos", "TN-position");
        b.className = "topPageNav";
        Config["TN-position"] ? b.style.cssText = Config["TN-position"] : (b.style.left = "10px", b.style.top = "50px");
        a = $.cls("pagelist")[0].cloneNode(!0);
        b.appendChild(a);
        Draggable.set(a);
        document.body.appendChild(b)
    },initGlobalMessage: function() {
        var a, b, c;
        if ((a = $.id("globalMessage")) && a.textContent)
            a.nextElementSibling.style.clear = "both", b = document.createElement("img"), b.id = "toggleMsgBtn", b.className = "extButton", b.setAttribute("data-cmd", "toggleMsg"), b.alt = "Toggle", b.title = "Toggle announcement", (c = localStorage.getItem("4chan-msg")) && (cMain.msgHash = $.hash(a.textContent)) == c ? (a.style.display = "none", b.style.opacity = "0.5", b.src = cMain.icons.plus) : b.src = cMain.icons.minus, a.parentNode.insertBefore(b, a)
    },toggleGlobalMessage: function() {
        var a, b;
        a = $.id("globalMessage");
        b = $.id("toggleMsgBtn");
        "none" == a.style.display ? (a.style.display = "", b.src = cMain.icons.minus, b.style.opacity = "1", localStorage.removeItem("4chan-msg")) : (a.style.display = "none", b.src = cMain.icons.plus, b.style.opacity = "0.5", localStorage.setItem("4chan-msg", cMain.msgHash || $.hash(a.textContent)))
    },setStickyNav: function() {
        var a, b;
        a = document.createElement("div");
        a.id = "stickyNav";
        a.className = "extPanel reply";
        a.setAttribute("data-shiftkey", "1");
        a.setAttribute("data-trackpos", "SN-position");
        Config["SN-position"] ? a.style.cssText = Config["SN-position"] : (a.style.right = "10px", a.style.top = "50px");
        b = document.createElement("div");
        b.innerHTML = '<img class="pointer" src="' + cMain.icons.up + '" data-cmd="totop" alt="\u25b2" title="Top"><img class="pointer" src="' + cMain.icons.down + '" data-cmd="tobottom" alt="\u25bc" title="Bottom">';
        Draggable.set(b);
        a.appendChild(b);
        document.body.appendChild(a)
    },setTitle: function() {
        var a, b;
        if (!(a = $.cls("subject", $.id("pi" + cMain.tid))[0].textContent))
            (a = $.id("m" + cMain.tid).innerHTML) ? (b = document.createElement("span"), b.innerHTML = a.replace(/<br>/g, " "), a = b.textContent.slice(0, 50)) : a = "No." + cMain.tid;
        document.title = "/" + cMain.board + "/ - " + a
    },getCookie: function(a) {
        var b, c, d;
        d = a + "=";
        c = document.cookie.split(";");
        for (a = 0; b = c[a]; ++a) {
            for (; " " == b.charAt(0); )
                b = b.substring(1, b.length);
            if (0 == b.indexOf(d))
                return decodeURIComponent(b.substring(d.length, b.length))
        }
        return null
    },onclick: function(a) {
        var b, c;
        if ((b = a.target) != document)
            if (c = b.getAttribute("data-cmd"))
                switch (id = b.getAttribute("data-id"), c) {
                    case "update":
                        a.preventDefault();
                        ThreadUpdater.forceUpdate();
                        break;
                    case "auto":
                        ThreadUpdater.toggleAuto();
                        break;
                    case "totop":
                    case "tobottom":
                        a.shiftKey || (location.href = "#" + c.slice(2));
                        break;
                    case "hide":
                        ThreadHiding.toggle(id);
                        break;
                    case "watch":
                        ThreadWatcher.toggle(id);
                        break;
                    case "hide-r":
                        ReplyHiding.toggle(id);
                        break;
                    case "expand":
                        ThreadExpansion.toggle(id);
                        break;
                    case "report":
                        cMain.reportPost(id);
                        break;
                    case "delete":
                        cMain.deletePost(id);
                        break;
                    case "toggleMsg":
                        cMain.toggleGlobalMessage();
                        break;
                    case "settings-toggle":
                        SettingsMenu.toggle();
                        break;
                    case "settings-save":
                        SettingsMenu.save();
                        break;
                    case "keybinds-open":
                        Keybinds.open();
                        break;
                    case "filters-open":
                        Filter.open();
                        break;
                    case "css-open":
                        CustomCSS.open();
                        break;
                    case "settings-export":
                        SettingsMenu.showExport();
                        break;
                    case "export-close":
                        SettingsMenu.closeExport()
                }
            else
                Config.disableAll || (QR.enabled && "Quote this post" == b.title ? (a.preventDefault(), c = cMain.tid || b.parentNode.parentNode.parentNode.parentNode.parentNode.id.slice(1), QR.show(c), QR.quotePost(!a.ctrlKey && b.textContent)) : Config.imageExpansion && 1 == a.which && b.parentNode && $.hasClass(b.parentNode, "fileThumb") && "A" == b.parentNode.nodeName && !$.hasClass(b.parentNode, "deleted") ? (a.preventDefault(), cImageExpansion.toggle(b)) : Config.inlineQuotes && 1 == a.which && $.hasClass(b, "quotelink") ? a.shiftKey ? (a.preventDefault(), location = b.href) : Parser.inlineQuote(b, a) : Config.threadExpansion && (b.parentNode && $.hasClass(b.parentNode, "abbr")) && (a.preventDefault(), ThreadExpansion.expandComment(b)))
    },onThreadMouseOver: function(a) {
        var b = a.target;
        Config.quotePreview && $.hasClass(b, "quotelink") && !$.hasClass(b, "deadlink") ? QuotePreview.resolve(a.target) : Config.imageHover && b.hasAttribute("data-md5") && !$.hasClass(b.parentNode, "deleted") ? ImageHover.show(b) : Config.filter && b.hasAttribute("data-filtered") && QuotePreview.show(b, b.href ? b.parentNode.parentNode.parentNode : b.parentNode.parentNode)
    },onThreadMouseOut: function(a) {
        a = a.target;
        Config.quotePreview && $.hasClass(a, "quotelink") ? QuotePreview.remove(a) : Config.imageHover && a.hasAttribute("data-md5") ? ImageHover.hide() : Config.filter && a.hasAttribute("data-filtered") && QuotePreview.remove(a)
    },reportPost: function(a) {
        window.open("https://sys.4chan.org/" + cMain.board + "/imgboard.php?mode=report&no=" + a, Date.now(), "toolbar=0,scrollbars=0,location=0,status=1,menubar=0,resizable=1,width=600,height=170")
    },linkToThread: function(a, b, c) {
        return "//" + location.host + "/" + (b || cMain.board) + "/res/" + a + (0 < c ? "#p" + c : "")
    },addCSS: function() {
        var a;
        a = document.createElement("style");
        a.setAttribute("type", "text/css");
        a.textContent = '.extButton.threadHideButton {  float: left;  margin-right: 5px;  margin-top: -1px;}.extButton.replyHideButton {  margin-top: 1px;}div.op > span .postHideButtonCollapsed {  margin-right: 1px;}.dropDownNav #boardNavMobile, {  display: block !important;}.extPanel {  border: 1px solid rgba(0, 0, 0, 0.20);}.tomorrow .extPanel {  border: 1px solid #111;}.extButton,img.pointer {  width: 18px;  height: 18px;}.extControls {  display: inline;  margin-left: 5px;}.extButton {  cursor: pointer;  margin-bottom: -4px;}.trashIcon {  width: 16px;  height: 16px;  margin-bottom: -2px;  margin-left: 5px;}.threadUpdateStatus {  margin-left: 0.5ex;}.futaba_new .stub,.burichan_new .stub {  line-height: 1;  padding-bottom: 1px;}.stub .extControls,.stub .wbtn,.stub input {  display: none;}.stub .threadHideButton {  float: none;  margin-right: 2px;}div.post div.postInfo {  width: auto;  display: inline;}.right {  float: right;}.center {  display: block;  margin: auto;}.pointer {  cursor: pointer;}.drag {  cursor: move !important;  user-select: none !important;  -moz-user-select: none !important;  -webkit-user-select: none !important;}#quickReply {  display: block;  position: fixed;  padding: 2px;  font-size: 10pt;}#qrHeader {  text-align: center;  margin-bottom: 1px;  padding: 0;  height: 18px;  line-height: 18px;}#qrClose {  float: right;}#qrForm > div {  clear: both;}#quickReply input[type="text"],#quickReply textarea,#quickReply #recaptcha_response_field {  border: 1px solid #aaa;  font-family: arial,helvetica,sans-serif;  font-size: 10pt;  outline: medium none;  width: 296px;  padding: 2px;  margin: 0 0 1px 0;}#quickReply textarea {  min-width: 296px;  float: left;}#quickReply input:-moz-placeholder,#quickReply textarea:-moz-placeholder {  color: #aaa !important;}#quickReply input[type="submit"] {  width: 83px;  margin: 0;  font-size: 10pt;  float: left;}#quickReply #qrCapField {  display: block;  margin-top: 1px;}#qrCaptcha {  width: 300px;  height: 53px;  cursor: pointer;  border: 1px solid #aaa;  display: block;}#quickReply input.presubmit {  margin-right: 1px;  width: 212px;  float: left;}#qrFile {  width: 215px;  margin-right: 5px;}.yotsuba_new #qrFile {  color:black;}#qrSpoiler {  display: inline;}#qrError {  width: 292px;  display: none;  font-family: monospace;  background-color: #E62020;  font-size: 12px;  color: white;  padding: 3px 5px;  text-shadow: 0 1px rgba(0, 0, 0, 0.20);}#qrError a {  color: white;}#twHeader {  font-weight: bold;  text-align: center;  height: 17px;}.futaba_new #twHeader,.burichan_new #twHeader {  line-height: 1;}#twPrune {  margin-left: 3px;  margin-top: -1px;}#threadWatcher {  max-width: 265px;  display: block;  position: absolute;  padding: 3px;}#watchList {  margin: 0;  padding: 0;  user-select: none;  -moz-user-select: none;  -webkit-user-select: none;}#watchList li:first-child {  margin-top: 3px;  padding-top: 2px;  border-top: 1px solid rgba(0, 0, 0, 0.20);}.photon #watchList li:first-child {  border-top: 1px solid #ccc;}.yotsuba_new #watchList li:first-child {  border-top: 1px solid #d9bfb7;}.yotsuba_b_new #watchList li:first-child {  border-top: 1px solid #b7c5d9;}.tomorrow #watchList li:first-child {  border-top: 1px solid #111;}#watchList a {  text-decoration: none;}#watchList li {  overflow: hidden;  white-space: nowrap;  text-overflow: ellipsis;}.fitToPage {  width: 100%;  max-width: 100%;}div.post div.image-expanded {  display: table;}div.op div.file .image-expanded-anti {  margin-left: -3px;}#quote-preview {  display: block;  position: absolute;  padding: 3px 6px 6px 3px;  margin: 0;}#quote-preview .dateTime {  white-space: nowrap;}.yotsuba_new #quote-preview.highlight,.yotsuba_b_new #quote-preview.highlight {  border-width: 1px 2px 2px 1px !important;  border-style: solid !important;}.yotsuba_new #quote-preview.highlight {  border-color: #D99F91 !important;}.yotsuba_b_new #quote-preview.highlight {  border-color: #BA9DBF !important;}.yotsuba_b_new .highlight-anti,.burichan_new .highlight-anti {  border-width: 1px !important;  background-color: #bfa6ba !important;}.yotsuba_new .highlight-anti,.futaba_new .highlight-anti {  background-color: #e8a690 !important;}.tomorrow .highlight-anti {  background-color: #111 !important;  border-color: #111;}.photon .highlight-anti {  background-color: #bbb !important;}#quote-preview .trashIcon,#quote-preview .inlined,#quote-preview .extButton,#quote-preview .extControls {  display: none;}.hasNewReplies {  font-weight: bold;}.deadlink {  text-decoration: line-through !important;}div.backlink {  font-size: 0.8em !important;  display: inline;  padding: 0;  padding-left: 5px;}.backlink span {  padding: 0;}.burichan_new .backlink a,.yotsuba_b_new .backlink a {  color: #34345C !important;}.expbtn {  margin-right: 3px;  margin-left: 2px;}.tCollapsed .rExpanded {  display: none;}#stickyNav {  position: fixed;  font-size: 0;}#stickyNav img {  vertical-align: middle;}.tu-error {  color: red;}.topPageNav {  position: absolute;}.yotsuba_b_new .topPageNav {  border-top: 1px solid rgba(255, 255, 255, 0.25);  border-left: 1px solid rgba(255, 255, 255, 0.25);}.newPostsMarker:not(#quote-preview) {  box-shadow: 0 3px red;}#toggleMsgBtn {  float: left;  margin-bottom: 6px;}.panelHeader {  font-weight: bold;  font-size: 16px;  text-align: center;  margin-bottom: 5px;  margin-top: 5px;  padding-bottom: 5px;  border-bottom: 1px solid rgba(0, 0, 0, 0.20);}.yotsuba_new .panelHeader {  border-bottom: 1px solid #d9bfb7;}.yotsuba_b_new .panelHeader {  border-bottom: 1px solid #b7c5d9;}.tomorrow .panelHeader {  border-bottom: 1px solid #111;}.panelHeader span {  position: absolute;  right: 5px;  top: 5px;}.UIPanel {  position: fixed;  line-height: 14px;  font-size: 14px;  top: 0;  left: 0;  width: 100%;  height: 100%;  background-color: rgba(0, 0, 0, 0.25);  z-index: 9002;}.UIPanel:after {  display: inline-block;  height: 100%;  vertical-align: middle;  content: "";}.UIPanel > div {  -moz-box-sizing: border-box;  box-sizing: border-box;  display: inline-block;  height: auto;  max-height: 100%;  position: relative;  width: 400px;  left: 50%;  margin-left: -200px;  overflow: auto;  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);  vertical-align: middle;}.UIPanel input[type="text"],.UIPanel textarea {  border: 1px solid #AAA;  outline: none;}.UIPanel .center {  margin-bottom: 5px;}.UIPanel button {  display: inline-block;  margin-right: 5px;}.UIPanel code {  background-color: #eee;  color: #000000;  padding: 1px 4px;  font-size: 12px;}.UIPanel ul {  list-style: none;  padding: 0 0 10px 0;  margin: 0;}.UIPanel .export-field {  width: 385px;}#settingsMenu label input {  margin-right: 5px;}.tomorrow #settingsMenu ul {  border-bottom: 1px solid #282a2e;}.settings-cat {  font-weight: bold;  padding-left: 5px;  margin: 10px 0 5px 0;}#customCSSMenu textarea {  display: block;  max-width: 100%;  min-width: 100%;  -moz-box-sizing: border-box;  box-sizing: border-box;  height: 200px;  margin: 0 0 5px;}#customCSSMenu .right,#settingsMenu .right {  margin-top: 2px;}#settingsMenu label {  display: inline-block;  user-select: none;  -moz-user-select: none;  -webkit-user-select: none;}#filtersHelp > div {  width: 600px;  left: 50%;  margin-left: -300px;}#filtersHelp h4 {  font-size: 15px;  margin: 20px 0 0 10px;}#filtersHelp h4:before {  content: "\u00bb";  margin-right: 3px;}#filtersHelp ul {  padding: 0;  margin: 10px;}#filtersHelp li {  padding: 3px 0;  list-style: none;}#filtersMenu table {  width: 100%;}#filtersMenu th {  font-size: 12px;}#filtersMenu tbody {  text-align: center;}#filtersMenu select,#filtersMenu .fPattern,#filtersMenu .fColor {  padding: 1px;  font-size: 11px;}#filtersMenu select {  width: 85px;}#filtersMenu tfoot td {  padding-top: 10px;}#keybindsHelp li {  padding: 3px 5px;}.fPattern {  width: 150px;}.fColor {  width: 60px;}.fDel {  font-size: 16px;}.filter-preview {  cursor: default;  margin-left: 3px;}#quote-preview iframe,#quote-preview .filter-preview {  display: none;}.post-hidden .extButton,.post-hidden:not(#quote-preview) .postInfo {  opacity: 0.5;}.post-hidden:not(.thread) .postInfo {  padding-left: 5px;}.post-hidden:not(#quote-preview) input,.post-hidden:not(#quote-preview) .replyContainer,.post-hidden:not(#quote-preview) .summary,.post-hidden:not(#quote-preview) .op .file,.post-hidden:not(#quote-preview) .file,.post-hidden .wbtn,.post-hidden .postNum span,.post-hidden:not(#quote-preview) .backlink,div.post-hidden:not(#quote-preview) div.file,div.post-hidden:not(#quote-preview) blockquote.postMessage {  display: none;}#first-run {  border-radius: 5px;  margin-top: 5px;  margin-left: -7px;  padding: 2px 5px;  position: absolute;  font-weight: bold;}.yotsuba_new #first-run,.futaba_new #first-run {  color: #800000;  background-color: #F0E0D6;  border: 2px solid #D9BFB7;}.yotsuba_b_new #first-run,.burichan_new #first-run {  color: #000;  background-color: #D6DAF0;  border: 2px solid #B7C5D9;}.tomorrow #first-run {  color: #C5C8C6;  background-color: #282A2E;  border: 2px solid #111;}.photon #first-run {  color: #333;  background-color: #ddd;  border: 2px solid #ccc;}#first-run:before {  content: "";  border-width: 0 6px 6px;  border-style: solid;  left: 50%;  margin-left: -6px;  position: absolute;  width: 0;  height: 0;  top: -6px;}.yotsuba_new #first-run:before,.futaba_new #first-run:before {  border-color: #D9BFB7 transparent;}.yotsuba_b_new #first-run:before,.burichan_new #first-run:before {  border-color: #B7C5D9 transparent;}.tomorrow #first-run:before {  border-color: #111 transparent;}.photon #first-run:before {  border-color: #ccc transparent;}#first-run:after {  content: "";  border-width: 0 4px 4px;  top: -4px;  display: block;  left: 50%;  margin-left: -4px;  position: absolute;  width: 0;  height: 0;}.yotsuba_new #first-run:after,.futaba_new #first-run:after {  border-color: #F0E0D6 transparent;  border-style: solid;}.yotsuba_b_new #first-run:after,.burichan_new #first-run:after {  border-color: #D6DAF0 transparent;  border-style: solid;}.tomorrow #first-run:after {  border-color: #282A2E transparent;  border-style: solid;}.photon #first-run:after {  border-color: #DDD transparent;  border-style: solid;}.fitToScreen {  position: fixed;  max-width: 100%;  max-height: 100%;  top: 0px;  right: 0px;}.thread-stats {  float: right;}.compact .thread {  max-width: 75%;}.dotted {  text-decoration: none;  border-bottom: 1px dashed;}.inlined .extControls {  display: none;}.linkfade {  opacity: 0.5;}#quote-preview .linkfade {  opacity: 1.0;}kbd {  background-color: #f7f7f7;  color: black;  border: 1px solid #ccc;  border-radius: 3px 3px 3px 3px;  box-shadow: 0 1px 0 #ccc, 0 0 0 2px #fff inset;  font-family: monospace;  font-size: 11px;  line-height: 1.4;  padding: 0 5px;}.deleted {  opacity: 0.66;}';
        document.head.appendChild(a)
    }
}