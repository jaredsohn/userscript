// ==UserScript==
// @name       Youtube Tools
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require    http://netdna.bootstrapcdn.com/twitter-bootstrap/2.1.0/js/bootstrap.min.js
// @resource   bootstrapcss http://netdna.bootstrapcdn.com/twitter-bootstrap/2.1.0/css/bootstrap-combined.min.css
// @version    0.5
// @match      http*://www.youtube.*
// @copyright  2012+, Highfredo
// ==/UserScript==

o ={
    HTML_TAG : "video",
    HTML_CONTAINER_TAG : ".html5-video-container",
    HTML_PLAYER_ID : "#movie_player-html5",
    WATCH_PLAYER: "#watch-player",
    FLASH_TAG : "embed"
}

/**
 * SCALE
 */

function isHtml5(){
    return $(o.FLASH_TAG).length==0;
}

function getScaleXY(jelement){
    var rawcss = jelement.css("-moz-transform");
    
    if(rawcss != 'none'){//has transform
        var medidas = new RegExp("\\(.+?\\)").exec(rawcss)[0];        // matrix(-1, 0, 0, 1, 0, 0)
        medidas = medidas.substring(1, medidas.length-1).split(","); 
        GM_log(medidas);
        return [medidas[0], medidas[3]]; // x, y
    } else{
        return [1,1];
    }
}

function scaleElement(jelement, valuex, valuey){   
    CSS = {
        "-moz-transform": "matrix("+parseFloat(valuex).toFixed(4)+",0,0,"+parseFloat(valuey).toFixed(4)+",0,0)" //para futuras versiones en distintos navegadores mejor asi
    }
    jelement.css(CSS);
}

function flip(){
    var jelement;
    if(isHtml5()){
        jelement = $(o.HTML_TAG);
    } else{    
        jelement = $(o.FLASH_TAG);
    }
    
    var scale = getScaleXY(jelement);
    scaleElement(jelement, -scale[0], scale[1]); 
}

function franjas(){ //solo html5
    var scalex = getScaleXY($(o.HTML_TAG))[0];
    GM_log(scalex);
    if(Math.abs(scalex) == 1){
        GM_log("Bandas quitando");
        var x_container = $(o.HTML_CONTAINER_TAG).width();
        var y_container = $(o.HTML_CONTAINER_TAG).height();

        var x_video = $(o.HTML_TAG).width();
        var y_video = $(o.HTML_TAG).height();

        var x_scale = (scalex>=1) ? x_container/x_video : -x_container/x_video;
        var y_scale = y_container/y_video;

        scaleElement($(o.HTML_TAG), x_scale, y_scale);   
        GM_log("Bandas quitadas: " + x_container+"/"+y_container  + " - "  + x_video+"/"+y_video + " - "  + x_scale+"/"+y_scale);
    } else{
        GM_log("Bandas restaurando: ");
        var x = (scalex>=1) ? 1 : -1;
        GM_log(x);
        scaleElement($(o.HTML_TAG), x, 1);
    }
}
 

function handleVideoStyleEvent(e){
    if (e.attrName === 'style') {
        GM_log('prevValue: ' + e.prevValue + '\nnewValue:  ' + e.newValue);    
        if(new RegExp("transform").test(e.prevValue) && new RegExp("transform").test(e.newValue) == false){ //has lost transform
            var aux = $("<div>");
            aux[0].style.cssText = e.prevValue;
            var xy = getScaleXY(aux);
            scaleElement($(o.HTML_TAG), xy[0], xy[1]);
        }      
    }
}



/**
 * QUALITY
 */

function replaceAll(txt, replace, with_this) {
    return txt.replace(new RegExp(replace, 'g'),with_this);
}

function getPlayerConfig(){
    var raw = $("script:contains('playerConfig')").html();
    var strplayerConfig =  new RegExp("{.+?};").exec(raw)[0];
    strplayerConfig = strplayerConfig.substring(0, strplayerConfig.length -1);
    
    return jQuery.parseJSON( strplayerConfig );
}

function getQualities(playerConfig){  //itag to readable quality
    var rawQ = playerConfig.args.fmt_list;
    var rawQs = rawQ.split(",");
    var Qs = new Array();
    
    jQuery.each(rawQs , function(index, value){
        var aux = value.split("\/");
        Qs[aux[0]] = aux[1]; //"itag" : dimension
    });
    
    
    return Qs;
}

function getURLs(playerConfig){//este es un tipo, segun tengo entendido hay 3 tipos
    var fmtMap = replaceAll(playerConfig.args.url_encoded_fmt_stream_map,"\u0026","&");   
    var rawURLs = unescape(fmtMap).split("url=");
    
    var URLs = new Array();
    var Qs = getQualities(playerConfig);
    
    jQuery.each(rawURLs, function(index, value){
        if(index!=0){ //fix, index 0 no contiene nada
            var splited =  value.split("&type=");
            var typeAndQ = splited[1].split("&");
            
            URLs[index-1] = {
                url: splited[0],
                type: typeAndQ[0].split(";")[0].replace("video/", ""),
                quality: Qs[typeAndQ[1].replace("itag=", "").replace(",", "")]
            }
        }
    });    
    
    return URLs;
}


function getFormatTag(type){
    if(type.indexOf("mp4")!=-1 || type.indexOf("webm")!=-1){
        return "video";
    } else if(type.indexOf("flv")!=-1 || type.indexOf("3gpp")!=-1){
        return "embed";
    } else { 
        alert("formato no soportado");
        return null;
    }
}

function Switch(url, type){
    var tag = getFormatTag(type);
    if(tag == "video"){
        $(o.HTML_PLAYER_ID).removeAttr("hidden");
        $(o.FLASH_TAG).remove();
        $(o.HTML_TAG).attr("src", url);
        $(o.HTML_TAG).attr("type", "video/"+type);
        $(o.HTML_TAG).attr("autoplay", "autoplay");
    } else{
        $(o.HTML_PLAYER_ID).attr("hidden", ""); //en este punto tengo que quitar las opciones exclusibas de html5 como quitar las franjas negras
        $(o.HTML_TAG)[0].removeAttribute("autoplay");
        $(o.HTML_TAG)[0].pause();
        $("<embed>",{
            src: url,
            type: "video/"+type
        }).appendTo(o.WATCH_PLAYER);  
    }
}

/**
 *DOWNLOAD
 */
function downloadCurrent(){
    var url = $("embed").attr("src");
    if(!url){
       url = $("video").attr("src");
    }
    GM_openInTab(url);
}

/**
 *  AUTOLOOP
 */
function autoloop(){
    if($(o.HTML_TAG).attr("loop")){
        $(o.HTML_TAG).removeAttr("loop");
    } else{
        $(o.HTML_TAG).attr("loop", "loop");
    }
}


/** 
 *  GUI
 */
GM_addStyle(".toggle { color: red }");
function toggleClass(jelement){
    jelement.toggleClass("toggle");    
}


function createContainer(){
    var b = $("<span>", { //BUTTONS CONTAINER
        'class': "yt-uix-button-group btn-group"//,
        //id: "flipContainer"
    });
    return b;
}

function createFlipButton(){
    var b = $("<button>", {  //FLIP
        'class': "start yt-uix-button yt-uix-button-default",
        id: "flipButton",
        title: "",
        click: function(){flip(); toggleClass($(this))}
    });    
    $("<span>", {
        'class': "yt-uix-button-content",
        id: "flipText",
        text: "Flip Video!"
    }).appendTo(b); 
    
    return b;
}

function createBandasButton(){
    var b = $("<button>", {  //BANDAS
        'class': "start yt-uix-button yt-uix-button-default",
        id: "bandasButton",
        title: "",
        click: function(){franjas(); toggleClass($(this))}
    });    
    $("<span>", {
        'class': "yt-uix-button-content",
        id: "bandasText",
        text: "Bandas"
    }).appendTo(b); 
    
    return b;
}

function createLoopButton(){
    var b = $("<button>", {  //LOOP
        'class': "start yt-uix-button yt-uix-button-default",
        id: "loopButton",
        title: "",
        click: function(){autoloop(); toggleClass($(this))}
    });    
    $("<span>", {
        'class': "yt-uix-button-content",
        id: "loopText",
        text: "Loop Video"
    }).appendTo(b); 
    
    return b;
}

function createDownloadButton(){
    var b = $("<button>", {  //DOWNLOAD
        'class': "start yt-uix-button yt-uix-button-default",
        id: "downloadButton",
        title: "En la ventana que se abra -> click derecho -> guargar como",
        click: function(){downloadCurrent();}
    });    
    $("<span>", {
        'class': "yt-uix-button-content",
        id: "downloadText",
        text: "Descargar"
    }).appendTo(b); 
    
    return b;
}

function createSelectFormat(arrayUrls){ //agregar a otro container 
    $("#watch-headline-user-info").css("overflow", "visible");//para que se vea el menu
    
    var span = $("<span>", {
        'class': "btn-group"
    });    
    $("<button>", {
        'class': "dropdown-toggle start yt-uix-button yt-uix-button-default",
        'data-toggle': "dropdown",
        title: "experimental",
        text: "Forzar formato."
    }).appendTo(span);
  
    var ul = $("<ul>", {
        'class': "dropdown-menu",
        style: "margin-top: -17px; margin-left: 107px;"//BUG, TODO: flash se pone por encima
    }).appendTo(span); 

    $.each(arrayUrls, function(index, value){
        var li = $("<li>");
        $("<a>", {
            text: (index+1)+": "+value.type+" - "+value.quality,
            click: function(){Switch(value.url, value.type)}
        }).appendTo(li);  
        
        li.appendTo(ul)
    });
    
    return span;
}


function generateGUI(){ //only html5 video supported
    GM_addStyle(GM_getResourceText("bootstrapcss"));
    $(o.HTML_TAG)[0].addEventListener('DOMAttrModified', handleVideoStyleEvent, false);
    
    var cont = createContainer();
    createFlipButton().appendTo(cont);
    createBandasButton().appendTo(cont);
    createLoopButton().appendTo(cont);
    createDownloadButton().appendTo(cont);
    createSelectFormat(getURLs(getPlayerConfig())).appendTo(cont);
    cont.appendTo("#watch-headline-user-info");
}


generateGUI();

