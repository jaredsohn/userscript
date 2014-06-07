// ==UserScript==
// @name       OGame:DefenceHelper
// @namespace  http://userscripts.org/scripts/show/166186
// @version    0.1.5
// @include    http://*.ogame.*/game/index.php?*page=defense*
// @copyright  2012+, mazzay
// ==/UserScript==

(function (window, undefined) { 
    var w =(typeof unsafeWindow != undefined) ? unsafeWindow :  window;
    var $ = jQuery = w.jQuery;
    if (w.self != w.top ) { return; }
    if ( !$ ){ return; }
    
    var document = w.document;
    var localStorage = w.localStorage;
    var url = document.location.href;
    
    var percent = 0.75;
    var bonchev = {401: 0.00061904761904761900, 402: 0.00030952380952380900, 403: 0.00035714285714285700, 404: 0.00009219858685714290, 406: 0.00005065855600000000};
    
    var lang = getMetaContent("ogame-language");
    var L = {       
        unattended : "Hours Unattended",
    };
    
    switch (lang) {     
        case "ru":  L.unattended = "Часов простоя";  break;   
    }
    
    var localObj;  // StoreObject
    localObj = JSON.parse(  localStorage.getItem( prefix() ) );
    if (localObj == null) {
        localObj = {};
        localObj.time = 6;
    }
    
    drawLabels();
    
    var divStyle  = "position: absolute; left: 480px; margin:4px; height:18px; width:150px; "; //background-color: red;
    var selectStyle = "visibility: visible; border:none;";
    var spanStyle = "color: #6f9fc8; padding-right:5px";
    
    var div = $("<div/>").attr("style", divStyle);
    var span = $("<span/>").text(L.unattended).attr("style", spanStyle);
    var select = $("<select/>").attr("style", selectStyle)
    .append( $('<option value="6">6</option>') )
    .append( $('<option value="8">8</option>') )
    .append( $('<option value="10">10</option>') )
    .append( $('<option value="12">12</option>') )
    .append( $('<option value="14">14</option>') )
    .append( $('<option value="16">16</option>') )
    .append( $('<option value="18">18</option>') )
    .append( $('<option value="24">24</option>') );
    
    $(select).change(function () {
        var selected = $("select option:selected").first();
        if (selected.length > 0) {
            localObj.time = selected.val();
            localStorage.setItem(prefix(), JSON.stringify(localObj));
            resource = calcRes(localObj.time);
            drawLabels();
        }
    }).change();
    
    $("#buttonz .header").prepend(div.append(span).append(select));
    $(select).find("[value="+localObj.time+"]").first().attr("selected", "selected");
    
    function drawLabels() {
        var labelStyle  = "position: relative; float: right; top: 38px;  width: 52px; padding-right: 10px; font-size: 11px; text-align: right; background-color:rgba(18, 23, 28, 0.7);";
        $("#defensebuilding a.detail_button").each( function(){
            var def = $(this).attr("ref");
            var val = $(this).find(".ecke .level").first().clone().children().remove().end().text().trim().replace(/\./g,'');
            if (val.indexOf('|') > -1) { val = val.split("|").slice(1); } // OGame Timer
            
            var need = calcDefence(parseInt(def), parseInt(val));
            $(this).find(".defhelper").first().remove();
            if (need > 0) { $(this).append( $("<span/>").addClass("defhelper").text(need).attr("style", labelStyle) ); }
            
        });   
    } 
    
    function calcDefence(type, value){
        var need = Math.floor( bonchev[type] * calcRes(localObj.time) * percent ) - value;
        return need > 0 ? need : 0;
    }
    
    function calcRes(time ) {
        var result = 0;
        var resourceTickers = [w.resourceTickerMetal, w.resourceTickerCrystal, w.resourceTickerDeuterium];
        for (var i = 0; i < 3; i++) { result += resourceTickers[i].production * 60 * 60 * time; }
        return result;
    }
    
    function prefix() {
        var tag = "OGA_DEFHELPER";
        var uni = getMetaContent("ogame-universe");
        var pid = getMetaContent("ogame-player-id");
        return tag + '_' + uni + '_' + pid;
    }
    
    function getMetaContent(name) { 
        var metas = document.getElementsByTagName('meta'); 
        for (var i = 0; i < metas.length; i++) { 
            if (metas[i].getAttribute("name") == name) { 
                return metas[i].getAttribute("content"); 
            } 
        } 
        return "";
    } 
    
})(window);
