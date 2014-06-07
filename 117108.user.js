// ==UserScript==
// @name           drnu
// @namespace      marlar
// @include        http://www.dr.dk/TV/se/*
// @include        http://www.dr.dk/tv/se/*
// @include        http://www.dr.dk/bonanza/*/serie/*
// @include        http://www.dr.dk/bonanza/serie/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

if(document.location.href.match(/http:\/\/drnu\.tumblr\.com/)) {
    alert("Du skal ikke klikke på linket. Træk det op på bogmærkelinjen i din browser.");
    exit;
}

if(document.location.href.match(/www.dr.dk\/tv\/?$/i)) {
    alert("Vælg en udsendelse og klik derefter igen på bogmærket");
    exit;
}

if(document.location.href.match(/www.dr.dk\/bonanza\/.*kategori\//i)) {
    alert("Vælg først en underkategori");
    exit;
}

var showType = document.location.href.match(/www.dr.dk\/(tv\/se|bonanza)/i);
if(!showType) {
    if(confirm("Scriptet virker kun på DR TV eller Bonanza.\nØnsker du at gå dertil?\n\nNB: du skal klikke på bogmærket igen når du kommer derhen :-)")) {
        document.location="http://www.dr.dk/tv";
    }
    exit;
}
showType = showType[1];

$("body").prepend($("<style>\
                    .bodymargin {margin-left:237px !important}\
                    .showcb { vertical-align: text-bottom; visibility: hidden}\
                    #showList p { font-size:13px; margin-left:10px; padding:5px 10px; text-indent:-18px; color: white}\
                    #showList select { width: 96px; margin-bottom:5px; }\
                    #showList a { color:yellow }\
                    #makelist  a, #showList .bigbutton  a { font-size: 13px; color:lightblue; font-weight: bold; cursor: pointer; display: block; width:192px; padding:5px; border: 1px solid}\
                    #makelist, #showList .bigbutton, #showWait { margin: 10px 0; font-size: 13px; }\
                    #makelist { margin-top: 27px }\
                    #showoptions, .bigbutton, #showWait { display: none }\
                    #showWait { color: yellow }\
                    #showintro { padding: 2px }\
                    #resultlist { position: fixed; margin: 10%; z-index:99999 }\
                    #resultlist textarea {  border:6px solid silver; padding-top:20px; white-space: nowrap; overflow: auto; width: 100%; height: 100%}\
                    #showclose { right: 0; position:absolute; z-index: 100000; cursor: pointer; margin: -4px 4px 0 0; font-weight:bold; font-size:13px; color:lightblue !important}\
                    #resultlist a { right: 0; position:absolute; z-index: 100000; cursor: pointer; margin: 6px 7px 0 0; font-weight:bold; font-size:13px; color:red}\
                    #autoscan { margin: 5px 0 10px 0}\
                    .bold { font-weight: bold }\
                    .justifywidth { width: 112px; float:left}\
                    </style>"));
$("<img id='dllogo' title='Klik for at åbne programscanneren' src='http://i42.tinypic.com/2iqgymr.png' style='display:none;top:0;position:fixed;left:0;z-index:99999;margin:4px;cursor:pointer'>").prependTo("body").click(function(){
    $("body").toggleClass("bodymargin");
    $("#showList").show();
    $("#dllogo").hide();
    });
var showdata = new Array();
$("body").addClass("bodymargin");
$progDiv = $("<div id='showList'><a id='showclose' title='Luk'>[X]</a>\
             <div id='makelist' title='Scan programmer som kan optages'><a>Start programscanning</a></div>\
             <div class='bold autoscan' title='Scan automatisk når du skifter program\nBemærk: kan gøre programskift trægt!'><input type='checkbox' id='autoscan'> Scan automatisk</div>\
             <div id='showoptions'>\
             <div title='Vælg hvilken kvalitet du foretrækker.'><div class='justifywidth'>Kvalitet </div><select id='showQual'><option value='0'>Bedst</option><option value='1'>God</option><option value='2'>Mindre god</option><option value='3'>Dårligst</option></select></div>\
             <div title='Vælg det maksimale antal programmer som skal scannes for hver serie. Jo større tal, jo langsommere kan browseren føles.'><div class='justifywidth'>Max programmer </div><select id='maxprogs'><option selected>5</option><option>10</option><option>15</option><option>alle</option></select></div>\
             <div id='runbg' title='Kør optagkommandoerne i baggrunden (optag flere på en gang).'><br><input type='checkbox' id='bgmode'> Kør i baggrunden</div>\
             <div title='Quiet mode - vis ikke output undervejs'><input type='checkbox' id='quietmode'> Skjul output fra kommandoen</div>\
             </div>\
             <div class='bigbutton' id='browserdownload' title='Download film direkte i browseren'><a>Hent via browser</a></div>\
             <div class='bigbutton' id='makecmdline' title='Generér kommandolinjer til at copy-paste ind i terminalen'><a>Generér kommandolinje</a></div>\
             <div class='bigbutton' id='showlinks' title='Vis downloadlinks'><a>Vis links</a></div>\
             <h2 id='showWait'>Henter<br>programoversigt...</h2>\
             <div id='showintro'>Dette script genererer kommandolinjer til at optage udsendelser fra DR TV med programmet \
             <b>wget</b> som er standard i Linux, men fås også <a href='http://gnuwin32.sourceforge.net/packages/wget.htm'>til Windows</a>, eller direkte fra browseren. Sidstnævnte er det letteste, men wget giver flere muligheder.<br><br>\
             1) Klik på linket herover for at scanne programmer der kan optages.<br><br>2) Når oversigten er dannet, kan du vælge den kvalitet som ønskes optages. Hvis en ønsket kvalitet ikke er til rådighed, vælges automatisk en anden.<br><br>\
             Du kan også vælge om output fra optageprogrammet skal undertrykkes (quiet) og om der skal optages i baggrunden (dvs. flere udsendelser på en gang).<br><br>\
             3) Vælg tilsidst de programmer der skal optages og tryk på 'Generér kommandolinje' eller 'Hent via browser'<br><br>\
             4) Klik dig evt. frem til andre programmer på DR NU og klik på 'Scan igen'<br><br>\
             <b>5) Respektér DRs ophavsret: Materialet må ikke gengives uden tilladelse jævnfør lov om ophavsret.</b></div>\
            </div>")
    .prependTo("body")
    .css({
        padding: "5px 0 0 5px",
        border: "4px solid lightblue", 
        position: "fixed",
        top:0, left:0,
        zIndex:10000,
        backgroundColor:"#666666",
        fontSize: "13px",
        color:"white",
        width:"225px",
        height:"100%",
        overflow:"auto"
    });

$("#showclose").click(function(){
    $("body").toggleClass("bodymargin");
    $("#showList").hide();
    $("#dllogo").show();
})

if(document.cookie.match(/autoscan=1/)) {
    $("#autoscan").attr("checked","checked");
    scanprogs();
}

$("#autoscan").click(function(){
    var cookieval=0;
    var cookiename = this.id;
    if($(this).is(":checked")) {
        cookieval=1;
        scanprogs();
    }
    var date = new Date();
    date.setDate(date.getDate() + 365)
    document.cookie = cookiename + "=" + cookieval + "; expires=" + date + "; path=/"
})

if(navigator.appVersion.indexOf("Win")!=-1) $("#runbg").hide();
$("<div id='resultlist' style='display:none'><a onclick='document.getElementById(\"resultlist\").style.display=\"none\"'>[X]</a><textarea wrap='off'></textarea></div>").prependTo("body");

$("#resultlist").keyup(function(e) {
  if (e.keyCode == 27) { $(this).hide() }   // esc
});

function getDRNUShows() {
    $.ajaxSetup( { "async": false } );
    $("#showList p").remove();
    if(showType.toLowerCase() == "bonanza") {
        getBonanza();
    }
    else {
        getByProgramCard();
        getBySeriesUrl();
    }
    if( $("#showList p").length==1 ) $("#showList p input:checkbox").attr("checked","1");
    $.ajaxSetup( { "async": true } );
    var ea = 0; $("#maxprogs").parent().click(function(){  ea++;  if(ea % 5 == 0) $(".showcb").prop("checked",1); })
}

function getBonanza() {
    var maxprogs = $("#maxprogs").val();
    if(maxprogs=="alle") maxprogs=999;
    $(".listItem[onclick]").slice(0, maxprogs).each(function() {
        var onclick = $(this).attr("onclick").match(/{.*}/);
        if (onclick) {
            var json = $.parseJSON(onclick[0]);
            var showDate = json.FirstPublished.split("T")[0];
            
            var html = "<p id='prog" + json.AssetId + "'><input class='showcb' type='checkbox'>&nbsp;<b>" + json.Title + " (" + showDate + ")</b><br>" + json.Description + "</p>";
            $progDiv.append(html);
            var medialinks = new Array();
            var qual = 0;
            for (var i = 0; i < json.Files.length; i++) {
                var f = json.Files[i];
                if (f.Type.match(/Video|Audio/)) {
                    var l = f.Location.match(/.*(bonanza.*)/)
                    if (l) {
                        switch (f.Type) {
                            case "VideoHigh": qual = 3; break;
                            case "VideoMid":  qual = 2; break;
                            case "VideoLow":  qual = 1; break;
                            case "Audio":     qual = 0; break;
                        }
                        if(f.Location.match(/mp3$/i))
                            medialinks.push(qual + "::" + l[0]);
                        else
                            medialinks.push(qual + "::" + "http://vodfiles.dr.dk/" + l[1]);
                    }
                }
            }
            medialinks.sort(function(a,b){
                return b.split(/::/)[0]-a.split(/::/)[0];
            });
            showdata["prog"+json.AssetId] = [medialinks, json.Title + "-" + showDate];
        }
    })
}


function getByProgramCard() {
    var resourceUrl = $("script:contains('videoData')").text().match('resource: "(http://www.dr.dk/mu/programcard/expanded/[^"]*)"')[1];
    $.getJSON(resourceUrl, function(data) {
        var showId = "";
        //var showDate = data.publish.split("T")[0];
        var showDate = data.Data[0].PrimaryAssetStartPublish.split("T")[0];
        var html = "<p id='prog" + showId + "'><input class='showcb' type='checkbox'>&nbsp;<b>" + data.Data[0].Title + " (" + showDate + ")</b><br>" + data.Data[0].Description + "</p>";
        $progDiv.append(html);
        var medialinks = new Array();
        var asset="";
        for(var a in data.Data[0].Assets) {
            asset=data.Data[0].Assets[a]
            if(asset.Kind=="VideoResource") {
                break;
            }
        }
        if(!asset) return;
        $.each(asset.Links, function(resource, link) {
            bitrate = link.Bitrate;
            medialinks.push(bitrate + "::" + link.Uri);
            return true;
        });
        medialinks.sort(function(a,b){
            return b.split(/::/)[0]-a.split(/::/)[0];
        });
        showdata["prog"+showId]= [medialinks, data.Data[0].Title + "-" + showDate];
    });
}

function getBySeriesUrl() {
    var serie = document.location.href.match(/http:\/\/www.dr.dk\/TV\/se\/([^\/]+)(\/([^\/]+))?\/?(#!.+)?$/i);
    if(!serie) return;
    var serieUrl = "http://www.dr.dk/nu/api/programseries/" + serie[1] + "/videos";
    var maxprogs = $("#maxprogs").val();
    if(maxprogs=="alle") maxprogs=999;
    $.getJSON(serieUrl, function(data) {
        var moreProgs = "<p style='font-weight:bold;color:#ADD8E6'>Flere programmer i serien</p>";
        if(data.length) $.each(data, function(showId, show) {
            // Method 1
            if(showId < maxprogs) {
                $.getJSON(show.videoResourceUrl, function(resData) {
                    var html = moreProgs + "<p id='prog" + showId + "'><input class='showcb' type='checkbox'>&nbsp;<b>" + show.title + " (" + show.formattedBroadcastTime + ")</b><br>" + show.description + "</p>";
                    moreProgs = "";
                    $progDiv.append(html);
                    var medialinks = new Array();
                    $.each(resData.links, function(resource, link) {
                        bitrate = link.bitrateKbps;
                        medialinks.push(bitrate + "::" + link.uri);
                        return true;
                    });
                    medialinks.sort(function(a,b){
                        return b.split(/::/)[0]-a.split(/::/)[0];
                    });
                    showdata["prog"+showId]= [medialinks, show.title + "-" + show.formattedBroadcastTime];
                });
            }
        })
    });
}

$('#makelist').click(function(){
    scanprogs();
});

$('#makecmdline, #browserdownload, #showlinks').click(function(){
    if($("#showList input.showcb:checked").length==0) {
        alert("Du skal vælge et eller flere programmer på listen");
        return;
    }
    fixFlash();
    var buttonId = this.id;
    var width = $("body").width()-$("#showList").width();
    var height = $(window).height()*0.7;

    var bgmode = $("#bgmode").is(":checked") ? "b" : ""; 
    var quietmode = $("#quietmode").is(":checked") ? "q" : "";
    var dash = bgmode+quietmode!="" ? " -" : "";
    
    var cmdline = "";
    $("#showList input.showcb:checked").parent().each(function(){
        var show = showdata[this.id][0];
        var qual = document.getElementById("showQual").selectedIndex;
        if(qual>show.length-1) qual = show.length-1;
        var rtmpUrl = show[qual].split(/::/)[1];
        var mp4Url = "";
        if(rtmpUrl.match(/bonanza/i))
            mp4Url = rtmpUrl;
        else
            mp4Url = rtmpUrl.replace(/(rtmp|rtsp|http).*[:\/]CMS\//, "http://vodfiles.dr.dk/CMS/").match(/.*?mp4/)[0];
        var match = mp4Url.match(/([^\/\?]*\.(mp4|flv|mp3))/);
        var filnavn = match[1];
        var filename = showdata[this.id][1].replace(/[-, :\?\/"']+/g,"-").replace(/\./g,"").replace(/-*_/,"_") + "." + match[2];
        filename = filename.replace("--","-");
       switch(buttonId) {
        case "showlinks":
            cmdline = cmdline + filename.replace(/\.(flv|mp4)/,"") + "\n" + mp4Url + "\n\n";
            break;
        case "makecmdline":
            cmdline = cmdline + "wget" + dash + bgmode + quietmode + " -O '" + filename + "' '" + mp4Url + "'\n";
            break;
        case "browserdownload":
            if(confirm("Titel: " + showdata[this.id][1] + "\nFilnavn: " + filnavn + "\n\nNår vinduet eller fanebladet med filmen vises, skal du trykke Ctrl-S for at gemme eller bruge menuen Filer > Gem. Derefter kan du lukke vinduet/fanebladet. Hvis du har sat kryds ved flere film, skal du bare vælge de pågældende vinduer/faneblade og trykke Ctrl-S.\n\nTip: Det kan være en god idé at omdøbe filen når du gemmer da navnet ofte er intetsigende."))
                window.open(mp4Url);
            break;
       }
    });
    if(buttonId=="makecmdline" || buttonId=="showlinks") {
        $("#resultlist").width(width).height(height).show();
        $("#resultlist textarea").val(cmdline).focus(function(){this.select()}).focus();
    }
});

function scanprogs() {
    if(showType.toLowerCase() == "bonanza") $("#maxprogs").val("alle");
    $("#showWait").show();
    $("#resultlist,#showoptions,#makecmdline,#showlinks,#browserdownload,#makelist,#showintro,.autoscan").hide();
    $("#makelist a").text("Scan igen");
    $(".showcb").css("visibility","hidden");
    getDRNUShows();
    $("#showWait").hide();
    $("#showoptions,#makecmdline,#showlinks,#browserdownload,#makelist,.autoscan").show();
    $(".showcb").css("visibility","visible");
}

var last_path = document.location.pathname;
var timeout_id;
start();

function start() {
  clearTimeout( timeout_id );
  var path = document.location.pathname;
  if ( path !== last_path ) {
    if($("#showList").is(":visible")  && $("#autoscan").is(":checked")) scanprogs();
    last_path = path;
  }
  timeout_id = setTimeout( start, 1000 );
};

function fixFlash() {
    $('object').each(function(){
        if($(this).find('param[name=wmode]').attr('value') != 'transparent') {
            $(this).prepend('<param name="wmode" value="transparent" />');
            $(this).parent().html($(this).parent().html());
        }
    });
}
