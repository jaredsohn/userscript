// ==UserScript==
// @name       KissAnime Prettify
// @namespace  GothSpace
// @version    0.5
// @description  Script to remove ads and adjust video to page width, included a little control panel with episode info with persistent adjustable position via cookies, option to turn off lights and an align to video player function. Forked from the original Prettify KissAnime i found here: http://userscripts.org/scripts/show/288143
// @match      *kissanime.com/Anime/*/*
// @copyright  gothike
// @require http://code.jquery.com/jquery-latest.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// ==/UserScript==

var video;

function refreshElement(e)
{
    var parent = e.parent();
    e.remove();
    e.appendTo(parent);
}

function scrollToPlayer(){
	$('html, body').animate({
        scrollTop: $("#embedVideo").offset().top
    }, 2000);
}

function alignControls(){
    align = readCookie("controlAlign");
    
    if(align == "right"){
    	$("#dvControls").animate({left:"2%"});
        createCookie("controlAlign","left");
        $("#btnAlignControls").fadeOut().text("Move Right").fadeIn();
    }else if (align == "left"){
    	$("#dvControls").animate({left:"85%"});
        createCookie("controlAlign","right");
        $("#btnAlignControls").fadeOut().text("Move Left").fadeIn();
    }else{
        $("#dvControls").animate({left:"85%"});
        createCookie("controlAlign","right");
        $("#btnAlignControls").fadeOut().text("Move Left").fadeIn();
    }
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function createUI(){
    var leftCtrl = "85%";
    var leftMsg = "Move Left";
    var cookieAlign = readCookie("controlAlign");
    if(cookieAlign == null){
    	createCookie("controlAlign","right");
    }else{
        if(cookieAlign == "left"){
        	leftCtrl = "2%";
            leftMsg = "Move Right";
        }
	}
	$("body").append("<div id='dvControls'></div>");
    $("#dvControls").css({
        "position": "fixed",
        "width": "200px",
        "left": leftCtrl,
        "top": "20px",
        "border":"#CCC solid 1px",
        "background-image": "url(http://kissanime.com/Content/images/tpl_bg.gif)",
        "border-radius": "20px",
        "color":"#FFF",
        "display":"none"
    });
    
    
    var pathArray = window.location.pathname.split( '/' );
    var animeName = pathArray[2];
    animeName = animeName.replace(/-/g," ");
    var episodeNumber = pathArray[3];
    episodeNumber = episodeNumber.replace(/-/g," ");
    var dvAppend = "<center><b>Playing :</b><br/>" + animeName + " - " + episodeNumber;
    var btnNext = $("#btnNext").is(":visible");
    var btnPrevious = $("#btnPrevious").is(":visible");
    dvAppend += "<br/><table style='width:90%'><tr><td align='center' id='tdControls' style='vertical-align:middle;'>";
    if(btnPrevious || btnNext){
        var srcElement = (btnPrevious)?"#btnPrevious":"#btnNext";
        var parentEl = $(srcElement).parent().parent();
        if(btnPrevious){
        	dvAppend+= "<span>Prev </span>"; 
        }
        dvAppend+= $(parentEl).html();
        if(btnNext){
        	 dvAppend+= "<span> Next</span>";
        }
    }
    dvAppend += "</td></tr><tr><td>"
    dvAppend += "<center><button id='btnScrollToPlayer' class='btnWidget'>Align To Player</button><br/></center>";
    dvAppend += "<center><button id='btnAlignControls' class='btnWidget'>"+leftMsg+"</button><br/><br/></center>";
    if(lightCode != null){
    	dvAppend += "<center>"+lightCode+"</center>";
    }
    dvAppend += "<br/></td></tr><tr><td>"
    dvAppend += "<img src='/Content/images/logo.png' style='width:100%' />"
    dvAppend +="</td></tr></table><br/>";
    dvAppend += "</center>";
    $("#dvControls").append(dvAppend).fadeIn("slow");
    
    var lightswitch = $( "#switch" );
    lightswitch.css({
        left:"45%",
        top:"auto",
        display:"inline-block"
    });
    $("#btnScrollToPlayer").click(function(e){
    	scrollToPlayer();
    });
    
    $("#btnAlignControls").click(function(e){
    	alignControls();
    });
    
    scrollToPlayer();
}

function makeVideoAutoHide(){
    //Remove lightswitch
    var lightswitch = $( "#switch" );
    lightCode = lightswitch[0].outerHTML;
    lightswitch.remove();
    
    //Remove ads
    var ads = $( "iframe" );
    ads.remove();
    
    //Remove useless data
    var barcontent = $( ".barContent" );
    var barcontentFirstChild = barcontent.children();
    var childrenLayer2 = barcontentFirstChild.children();
    var childrenToCut = childrenLayer2.slice(1,11);
    childrenToCut.remove();
    
    var qua = $( "#divTextQua" );
    qua.remove();
    
    //Pad the video out
    var dd = $( "#divDownload" );
    dd.css("padding-top", "100px");
    
    var pc = $( ".clear2:eq(2)" );
    pc.css("padding-bottom", "100px");
    
    //Enable Autohide
    var player = $( "#embedVideo" );
    if (player.length == 0) return;
    
    player[0].src = "http://www.youtube.com/get_player?enablejsapi=1&modestbranding=1&autohide=1&version=3";
    
    //Refresh element to force change
    refreshElement(player);
    
    //Resize content to page width and hide other ads, adjust some css
    $(".clear2").css("padding-bottom","10px");
    $(".divCloseBut").hide();
    $("#imgAdsNaru").hide();
    $("#divDownload").css("padding-top","20px");
    $("#centerDivVideo,#divContentVideo,#embedVideo").css({
        width:"100%",
        height:"100%"
    });
    
    var newClasses = "<style type='text/css'>"+
        ".btnWidget {" +
            "-moz-box-shadow:inset 0px 1px 1px 0px #caefab;"+
            "-webkit-box-shadow:inset 0px 1px 1px 0px #caefab;"+
            "box-shadow:inset 0px 1px 1px 0px #caefab;"+
            "background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #77d42a), color-stop(1, #5cb811) );"+
            "background:-moz-linear-gradient( center top, #77d42a 5%, #5cb811 100% );"+
            "filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#77d42a', endColorstr='#5cb811');"+
            "background-color:#77d42a;"+
            "-webkit-border-top-left-radius:20px;"+
            "-moz-border-radius-topleft:20px;"+
            "border-top-left-radius:20px;"+
            "-webkit-border-top-right-radius:20px;"+
            "-moz-border-radius-topright:20px;"+
            "border-top-right-radius:20px;"+
            "-webkit-border-bottom-right-radius:20px;"+
            "-moz-border-radius-bottomright:20px;"+
            "border-bottom-right-radius:20px;"+
            "-webkit-border-bottom-left-radius:20px;"+
            "-moz-border-radius-bottomleft:20px;"+
            "border-bottom-left-radius:20px;"+
            "text-indent:0;"+
            "border:1px solid #268a16;"+
            "display:inline-block;"+
            "color:#306108;"+
            "font-family:Arial;"+
            "font-size:15px;"+
            "font-weight:bold;"+
            "font-style:normal;"+
            "height:30px;"+
            "line-height:30px;"+
            "width:150px;"+
        	"cursor:pointer;"+
            "text-decoration:none;"+
            "text-align:center;"+
            "text-shadow:1px 1px 1px #aade7c;"+
        "}"+
        ".btnWidget:hover {"+
            "background:-webkit-gradient( linear, left top, left bottom, color-stop(0.05, #5cb811), color-stop(1, #77d42a) );"+
            "background:-moz-linear-gradient( center top, #5cb811 5%, #77d42a 100% );"+
            "filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5cb811', endColorstr='#77d42a');"+
            "background-color:#5cb811;"+
        "}.btnWidget:active {"+
            "position:relative;"+
            "top:1px;"+
        "} button:focus{outline:0;}<\/style>";
    
    $("head").append(newClasses);
    createUI();
}

window.onload = function() {
	setTimeout(makeVideoAutoHide, 500);
};