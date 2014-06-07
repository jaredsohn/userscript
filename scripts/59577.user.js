// ==UserScript==
// @name           htlr-mod für fhz-skin@ilias3.vobs.at
// @namespace      yox
// @include        *ilias3.vobs.at/*
// ==/UserScript==
var style = 'body{background-color:#FCFDFF !important;}div.ilMainHeader{background-image:url("data:image/png;base64,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") !important;background-repeat:no-repeat !important;background-position:top right !important;}div.il_MainMenuBar{background-color:#08d !important;border-top:1px #158 solid !important;border-bottom:1px #158 solid !important;}ul.il_MainMenuButtonsLeft{border-bottom:1px #158 solid !important;}li.MMActive{background-color:#08d !important;border-color:#158 #158 #08d !important;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;}a.MMInactive,a.MMInactive:visited{background-color:#E4F2FF !important;border:1px #AFC0CF solid !important;border-bottom:none !important;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;}a.MMInactive:hover{color:#FFF !important;margin-top:1px !important;height:16px !important;background-color:#08d !important;border:1px #158 solid !important;border-bottom:1px #08d solid !important;}table.il_Locator{margin-top:2px !important;background-color:#08d !important;}ul.il_Tab{border-bottom:1px solid #158 !important;}div.il_Tab{margin-left:5px !important;}li.tabactive{border-color:#158 #158 #fff !important;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;margin-top:0 !important;z-index:2 !important;}a.tabinactive{background-color:#F7FBFF !important;border:1px solid #AFC0CF !important;border-bottom:none !important;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;z-index:10 !important;}li.tabinactive{border-bottom:1px solid #158 !important;margin-top:0 !important;z-index:10 !important;}li.tabinactive:hover{border-bottom:1px solid #fff !important;margin-top:1px !important;}a.tabinactive:hover{background-color:#fff !important;border:1px solid #158 !important;border-bottom:none !important;}div.il_ColumnLayout{border-bottom:1px solid #158 !important;border-left:1px solid #158 !important;border-top:1px solid #158 !important;margin-top:-1px !important;-moz-border-radius-topleft:5px;-moz-border-radius-bottomleft:5px;}th.il_BlockHeader{background-color:#009CE2 !important;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;}.tblrow1{background-color:#F0F7FF !important;}.tblfooter{background-color:#BFE0FF !important;}a[href*="showFeedUrl"]{display:none !important;}th.il_BlockHeaderBig{font-size:14pt !important;}th.il_ContainerBlockHeader{padding-right:5px !important;font-size:14pt !important;}.small .il_LocatorLink:link,.small .il_LocatorLink:visited{color:#1E4799 !important;}div.il_Footer{background-image:none !important;margin-top:-12px !important;}div.il_Footer a{font-size:8pt;}.tblrow2,table.std{background-color:#E0F0FF !important;}';

//für class abfragen
document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
for (var i = 0; i < elem.length; i++) {
var classes = elem[i].className;
if (myclass.test(classes)) retnode.push(elem[i]);
}
return retnode;
}; 

//cookie management
var Cookies = {
    init: function () {
        var allCookies = document.cookie.split('; ');
        for (var i=0;i<allCookies.length;i++) {
            var cookiePair = allCookies[i].split('=');
            this[cookiePair[0]] = cookiePair[1];
        }
    },
    create: function (name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
        this[name] = value;
    },
    erase: function (name) {
        this.create(name,'',-1);
        this[name] = undefined;
    }
};
Cookies.init();

//bei logout id löschen
if((location.href.toLowerCase().indexOf("logout")) != -1) {
    Cookies.create("use_mod", "no", 2);
}

//modstop
if((location.href.toLowerCase().indexOf("stopmod")) != -1) {
    Cookies.create("use_mod", "no", 2);
}

//modstart
if((location.href.toLowerCase().indexOf("activatemod")) != -1) {
    Cookies.create("use_mod", "yes", 2);
}

//auf fhz style prüfen
if(document.getElementsByTagName("link")[0].getAttribute("href").indexOf("fhz") != -1) {
    if(Cookies["use_mod"] == "yes") {
        
        //style einschalten
        document.getElementsByTagName("head")[0].innerHTML = document.getElementsByTagName("head")[0].innerHTML + "<style type='text/css'>" + style + "</style>";

        //kaputte seiten reparieren
        if(document.getElementsByClassName("il_MainMenuBar").length == 0) {
            var toedit = document.getElementsByTagName("body")[0].innerHTML;
            toedit = "<div class='il_MainMenuBar'></div>" + document.getElementsByTagName("body")[0].innerHTML;
            toedit = toedit.replace('<table class="il_ColumnLayout">', "<div class='il_ColumnLayout'><div style='margin-left:15px; clear:both;'></div><table class='il_ColumnLayout'>");
            toedit = toedit.replace('<div class="il_Footer">', '</div><div class="il_Footer">');
            document.getElementsByTagName("body")[0].innerHTML = toedit;
            toedit = false;
        }
        
        document.getElementsByClassName("il_Footer")[0].innerHTML = "design © fhz<br /><a href='" + location.href + "&amp;stopmod=true'>htlr-mod</a> © david beinder<br />" + document.getElementsByClassName("il_Footer")[0].innerHTML;
        
    } else { // else use_mod
        document.getElementsByClassName("il_Footer")[0].innerHTML = document.getElementsByClassName("il_Footer")[0].innerHTML + "<br /><a href='" + location.href + "&amp;activatemod=true'>aktiviere htlr-mod</a>";
    }
}