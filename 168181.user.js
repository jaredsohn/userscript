// ==UserScript==
// @name       OGame Miner's Heaven
// @namespace  http://userscripts.org/scripts/show/168181
// @version    2.8
// @description  Enhances OGame with useful additions for Miners
// @copyright  2012+, YamiNoSensei
// @license GNU Lesser General Public License (LGPL)
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @include        http://*.ogame.*/game/index.php*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       unsafeWindow
// @updateURL   https://userscripts.org/scripts/source/168181.user.js
// @downlloadURL   https://userscripts.org/scripts/source/168181.user.js
// ==/UserScript==

var nRessourceBarIntervalID = -1;
var nMessagesTimeoutID  = -1;

var sOldMetalValue = "";
var sOldCrystalValue = "";
var sOldDeuteriumValue = "";
var nInitialResourceHeight = -1;
var oPlBuilTimeIntervalMap = {};
var oTimeUnits = {
    w : unsafeWindow.LocalizationStrings.timeunits.short.week,
    d : unsafeWindow.LocalizationStrings.timeunits.short.day,
    h : unsafeWindow.LocalizationStrings.timeunits.short.hour,
    m : unsafeWindow.LocalizationStrings.timeunits.short.minute,
    s : unsafeWindow.LocalizationStrings.timeunits.short.second
};


if (navigator.userAgent.search('Firefox/') > -1) { 
    this.$ = this.jQuery = jQuery.noConflict(true);
}

$(document).ready(function() {

    OGameMinersHeaven_hlpTimeStrToSecs();
    
    //Clear resource caches on page load
    GM_deleteValue('OMH_RES_DATA');
    
    //Initialize (Register script, setup settings menu etc)
    OGameMinersHeaven_init();
    
    //Fetch initial values
    nInitialResourceHeight = $("#metal_box").height();
    
    //Resource Bar
    window.clearInterval(nRessourceBarIntervalID);
    nRessourceBarIntervalID = window.setInterval(OGameMinersHeaven_RessourceBar,500);
    
    //PlanetList
    OGameMinersHeaven_PlanetList();
    
    //Hide DIVs
    OGameMinersHeaven_hideDIVs();
    
    
    //Load messages 
    if (GM_getValue('ogh_messages_autoload')=='1') {
        OGameMinersHeaven_LoadMessages();
        
        $(document).bind("DOMNodeInserted",function() {
            window.clearTimeout(nMessagesTimeoutID);
            nMessagesTimeoutID = window.setTimeout(OGameMinersHeaven_LoadMessages,250);
        });
    }
});

/**
 * The settings menu for OGH and the "button" to the left
 */
function OGameMinersHeaven_init() {   
	//Init settings to defaults if not set already
    OGameMinersHeaven_hlpSetSettingsToDefaults();

    //Register in "Scripts" List
    $("#oGameVersionCheckData").append('<span style="display:none"><span>Miner\'s Heaven</span><span></span><span>http://userscripts.org/scripts/show/168181</span><span>false</span></span>');

    //Add button
    $("#menuTableTools").append('<li id="ogame-miners-heaven-btn"><a class="menubutton" href="javascript:void(0)"><span class="textlabel">Miner\'s Heaven</span></a></li>');
    
    //Add options page (container)
    $("#contentWrapper").prepend('<div style="display:none;" id="ogame-miners-heaven-settings"> </div>');
    
    //Build options page
    $("#ogame-miners-heaven-settings").append(
        '<form id="ogame-miners-heaven-settings-form" onsubmit="return false;">' 
        +'<div style="background-image: url(http://gf1.geo.gfsrv.net/cdn63/10e31cd5234445e4084558ea3506ea.gif); background-attachment: scroll; background-color: transparent; height: 28px; margin-top: 8px; position: relative; text-align: center; background-position: 0px 0px; background-repeat: no-repeat no-repeat;">'
        +'<div style="font-weight: 700; font-style: normal; font-variant: normal; font-size: 12px; line-height: 23px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(111, 159, 200); padding-top: 3px;">Resource Bar</div>'
        +'</div>'        
        + '<div style="background-image: url(http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif); background-attachment: scroll; background-color: transparent; color: rgb(132, 132, 132); margin: 0px; padding: 17px 10px; width: 100%; text-align: left; background-position: 5px 0px; background-repeat: no-repeat repeat;">'
    	+ '<p>'
        + '<input type="checkbox" name="ogh_rb_showcapacity" id="ogh_rb_showcapacity"/>'
        + '<label for="#ogh_rb_showcapacity">Show storage capacity</label>'
        + '</p>'
        + '<p>'
        + '<input type="checkbox" name="ogh_rb_showremaining" id="ogh_rb_showremaining"/>'
        + '<label for="#ogh_rb_showremaining">Show remaining time until storage is full</label>'
        + '</p>'
        + '</div>'
        
        +'<div style="background-image: url(http://gf1.geo.gfsrv.net/cdn63/10e31cd5234445e4084558ea3506ea.gif); background-attachment: scroll; background-color: transparent; height: 28px; margin-top: 8px; position: relative; text-align: center; background-position: 0px 0px; background-repeat: no-repeat no-repeat;">'
        +'<div style="font-weight: 700; font-style: normal; font-variant: normal; font-size: 12px; line-height: 23px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(111, 159, 200); padding-top: 3px;">Planet List</div>'
        +'</div>'        
        + '<div style="background-image: url(http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif); background-attachment: scroll; background-color: transparent; color: rgb(132, 132, 132); margin: 0px; padding: 17px 10px; width: 100%; text-align: left; background-position: 5px 0px; background-repeat: no-repeat repeat;">'
    	+ '<p>'
        + '<input type="checkbox" name="ogh_pl_showsize" id="ogh_pl_showsize"/>'
        + '<label for="#ogh_pl_showsize">Show planet\'s size</label>'
        + '<br/>'
        + '<input type="checkbox" id="ogh_pl_rembuildingtime" name"ogh_pl_rembuildingtime"/>'
        + '<label for="#ogh_pl_rembuildingtime">Show remaining building time (EXPERIMENTAL)</label>'
        + '<br/>'
        + '<label for="#ogh_pl_ordering">Planet ordering: </label>'
        + '<select name="ogh_pl_ordering" id="ogh_pl_ordering">'
        + '<option value="1">OGame Default Order</option>'
        + '<option value="2">By coordinates</option>'
        + '<option value="3">By name</option>'
        + '</select>'
        + '</p>'
        + '</div>'
        
        +'<div style="background-image: url(http://gf1.geo.gfsrv.net/cdn63/10e31cd5234445e4084558ea3506ea.gif); background-attachment: scroll; background-color: transparent; height: 28px; margin-top: 8px; position: relative; text-align: center; background-position: 0px 0px; background-repeat: no-repeat no-repeat;">'
        +'<div style="font-weight: 700; font-style: normal; font-variant: normal; font-size: 12px; line-height: 23px; font-family: Verdana, Arial, Helvetica, sans-serif; color: rgb(111, 159, 200); padding-top: 3px;">Messages</div>'
        +'</div>'        
        + '<div style="background-image: url(http://gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif); background-attachment: scroll; background-color: transparent; color: rgb(132, 132, 132); margin: 0px; padding: 17px 10px; width: 100%; text-align: left; background-position: 5px 0px; background-repeat: no-repeat repeat;">'
    	
        + '<p>'
        + '<input type="checkbox" name="ogh_messages_autoload" id="ogh_messages_autoload"/>'
        + '<label for="#ogh_messages_autoload">Display message\'s content directly below subject</label>'
        + '</p>'
        
        + '</div>'
    	
        + '<div style="background-image: url(http://gf1.geo.gfsrv.net/cdn30/aa3e8edec0a2681915b3c9c6795e6f.gif); background-attachment: scroll; background-color: transparent; height: 17px; background-position: 2px 0px; background-repeat: no-repeat no-repeat;"> </div>'
        
        + '<p style="padding-left:10px;margin-top:10px;">'
        + '<input type="submit" value="OK" id="ogame-miners-settings-btnSave"/>'
        + '<input type="submit" value="Reset to defaults" id="ogame-miners-settings-btnResetToDefaults"/>'
        + '<input type="reset" value="Cancel" id="ogame-miners-settings-btnCancel"/>'
        + '</p>'
        
        + '</form>'
    );
    
    
    
    //Apply CSS to controls
    $("#ogame-miners-settings-btnCancel, #ogame-miners-settings-btnResetToDefaults, #ogame-miners-settings-btnSave").addClass('btn_blue').css({
        'color': 'white', 'cursor':'pointer', 'margin-right':'10px'
    });
    $("#ogh_pl_ordering").css({'visibility':'visible'});
    
    //Add click listener for Cancel Button on option page
    $("#ogame-miners-settings-btnCancel").click(function() {
        location.reload();
    });
    
    //Add click listener for Reset To Defaults Button on option page
    $("#ogame-miners-settings-btnResetToDefaults").click(function() {
    	OGameMinersHeaven_hlpSetSettingsToDefaults(true);
        location.reload();
    });
    
    //Add click listener for Save Settings Button on option page
    $("#ogame-miners-settings-btnSave").click(function() {        
		GM_setValue('ogh_rb_showcapacity', $('#ogh_rb_showcapacity').is(':checked') ? '1' : '0');
        GM_setValue('ogh_rb_showremaining', $('#ogh_rb_showremaining').is(':checked') ? '1' : '0');
        GM_setValue('ogh_pl_showsize', $('#ogh_pl_showsize').is(':checked') ? '1' : '0');
        GM_setValue('ogh_messages_autoload', $('#ogh_messages_autoload').is(':checked') ? '1' : '0');
        GM_setValue('ogh_pl_ordering',$("#ogh_pl_ordering option:selected").val());
        GM_setValue('ogh_pl_rembuildingtime', $('#ogh_pl_rembuildingtime').is(':checked') ? '1' : '0');
        location.reload();
    });
    
    //Add button click listener for settings (left)
    $("#ogame-miners-heaven-btn").click(function() {
        $("#inhalt").css('display', $("#ogame-miners-heaven-settings").css('display'));
        $("#ogame-miners-heaven-settings").toggle();
        if ($("#ogame-miners-heaven-settings").css('display')=='block') {
            //Load settings from storage
            $("#ogh_rb_showcapacity").attr('checked', GM_getValue('ogh_rb_showcapacity')=='1');
            $("#ogh_rb_showremaining").attr('checked', GM_getValue('ogh_rb_showremaining')=='1');
            $("#ogh_pl_showsize").attr('checked', GM_getValue('ogh_pl_showsize')=='1');
            $("#ogh_messages_autoload").attr('checked', GM_getValue('ogh_messages_autoload')=='1'); 
            $('#ogh_pl_ordering option[value="' + GM_getValue('ogh_pl_ordering') + '"]').prop('selected', true);
            $("#ogh_pl_rembuildingtime").attr('checked', GM_getValue('ogh_pl_rembuildingtime')=='1'); 
            
        }
    });    
}

/**
 * Autload message body
 */ 
function OGameMinersHeaven_LoadMessages() {
    if ($("#messageContent .entry")[0] && location.toString().search('page=messages')>-1) {
        if (GM_getValue('ogh_messages_autoload')=='1') {
            var bUpdated = false;
    		$("#messageContent .entry").each(function() {
                var oCurEntry = $(this);
                if (!oCurEntry.hasClass('omh-msg-processed')) {
                    $(".from, .check, .date, .actions",oCurEntry).css('vertical-align','top');
                    $(".subject",oCurEntry).append('<p class="ogame-message-enhancer-body" style="font-weight:normal"><img alt="" src="data:image/gif;base64,R0lGODlhEAAQAPIAAC02Q4SEhEFIUmxvcoSEhGJlaldbYlFXXiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" style="float:left;margin-right:10px;"/><strong>Laden...</strong></p>');
                    $("p.ogame-message-enhancer-body", oCurEntry).load($(".subject a.overlay", oCurEntry).attr("href") + " .note",null,function(responseText, textStatus, XMLHttpRequest){
                        if ($(".note div",$(this))[1]) {
                            $(".note div:gt(1)",$(this)).remove();
                        }
                    });
                    //Neue Nachricht Klasse entfernen (Sie ist ja quasi gelesen)
                    $(this).removeClass('new');
                    if (!$(this).hasClass('alt')) {
                        $(this).addClass('alt');
                    }
                    $(this).addClass('omh-msg-processed');
    				bUpdated = true;
                }
                $(this).unbind('DOMNodeInserted');
            });
    		if (bUpdated) {
                //Briefumschlag update
                window.setTimeout(function(){
                    $("#new_msg_count").load("/index.php?page=messages&actionMode=12&ajax=1 #new_msg_count", {actionMode:12,ajax:1}, function data() {
                    $(this).replaceWith(data);
                })},500);
                window.clearTimeout(nMessagesTimeoutID);
    		}
		}
        else {
            window.clearTimeout(nMessagesTimeoutID);
        }
        
    }
	else {
    	window.clearTimeout(nMessagesTimeoutID);
    }
}



/**
 * Resource Bar related addtions
 */
function OGameMinersHeaven_RessourceBar() {
    var sCurMetalValue = $.trim($("#metal_box .value").text());
    var sCurCrystalValue = $.trim($("#crystal_box .value").text());
    var sCurDeuteriumValue = $.trim($("#deuterium_box .value").text());
    
    //Fetch storgae capacity if not cached for cur page
    if (!GM_getValue('OMH_RES_DATA')) {
        $.ajax('index.php?page=fetchResources&ajax=1', {
            async:false, dataType:"json", success:function(data,xhr) {
                if (data) {
                    if (data.metal && data.crystal && data.deuterium) {
                        GM_setValue('OMH_RES_DATA',JSON.stringify(data));
                    }
                }
            }
        });
    }

    var oResData= JSON.parse(GM_getValue('OMH_RES_DATA'));
    var sThousandSeparator = unsafeWindow.LocalizationStrings.thousandSeperator;
        
    //Update resource bar
    if (sCurMetalValue != sOldMetalValue || sCurCrystalValue != sOldCrystalValue || sCurDeuteriumValue != sOldDeuteriumValue) {
        if (sCurMetalValue != sOldMetalValue) {
            sOldMetalValue = sCurMetalValue;
            //Metall - Kapazität
            var nMetalCap = oResData.metal.resources.max;
            if (GM_getValue('ogh_rb_showcapacity')=='1') {
                if ($("#deuterium_box .ogame-miners-heaven-rb-capacity")[0]) {
                    $("#metal_box .ogame-miners-heaven-rb-capacity").text('(Max: '+nMetalCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sThousandSeparator)+')');
                }
                else {
                    $("#metal_box").append('<span class="ogame-miners-heaven-rb-capacity">(Max: '+nMetalCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sThousandSeparator)+')</span>');
                }
            }
            //Metall - Restdauer bis voll
            if (GM_getValue('ogh_rb_showremaining')=='1') {
                var nMetalProd = oResData.metal.resources.production;
                var nCurMetal = parseInt(sCurMetalValue.split(sThousandSeparator).join(""));
                var nRemMetalTime = parseInt((nMetalCap - nCurMetal) / nMetalProd);
                var sRemMetalTime = OGameMinersHeaven_hlpSec2Str(nRemMetalTime);
                
                if ($("#metal_box .ogame-miners-heaven-rb-duration")[0]) {
                    $("#metal_box .ogame-miners-heaven-rb-duration").html(sRemMetalTime);
                }
                else {
                    $("#metal_box").append('<div class="ogame-miners-heaven-rb-duration">'+sRemMetalTime+'</div>');
            }
            }
            
        }
        if (sCurCrystalValue != sOldCrystalValue) {
            sOldCrystalValue = sCurCrystalValue;
            var nCrystalCap = oResData.crystal.resources.max;
            //Kristall - Kapazität
            if (GM_getValue('ogh_rb_showcapacity')=='1') {
                if ($("#crystal_box .ogame-miners-heaven-rb-capacity")[0]) {
                    $("#crystal_box .ogame-miners-heaven-rb-capacity").text('(Max: '+nCrystalCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sThousandSeparator)+')');
                }
                else {
                    $("#crystal_box").append('<span class="ogame-miners-heaven-rb-capacity">(Max: '+nCrystalCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sThousandSeparator)+')</span>');
                }
            }
            //Kristall - Restdauer bis voll
            if (GM_getValue('ogh_rb_showremaining')=='1') {
                var nCrystalProd = oResData.crystal.resources.production;
                var nCurCrystal = parseInt(sCurCrystalValue.split(sThousandSeparator).join(""));
                var nRemCrystalTime = parseInt((nCrystalCap - nCurCrystal) / nCrystalProd);
                var sRemCrystalTime = OGameMinersHeaven_hlpSec2Str(nRemCrystalTime);
                if ($("#crystal_box .ogame-miners-heaven-rb-duration")[0]) {
                    $("#crystal_box .ogame-miners-heaven-rb-duration").html(sRemCrystalTime);
                }
                else {
                    $("#crystal_box").append('<div class="ogame-miners-heaven-rb-duration">'+sRemCrystalTime+'</div>');
                }
            }
            
        }
        if (sCurDeuteriumValue != sOldDeuteriumValue) {
            sOldDeuteriumValue = sCurDeuteriumValue;
            var nDeuteriumCap = oResData.deuterium.resources.max;
            //Deuterium - Kapazität
            if (GM_getValue('ogh_rb_showcapacity')=='1') {
                if ($("#deuterium_box .ogame-miners-heaven-rb-capacity")[0]) {
                    $("#deuterium_box .ogame-miners-heaven-rb-capacity").text('(Max: '+nDeuteriumCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sThousandSeparator)+')');
                }
                else {
                    $("#deuterium_box").append('<span class="ogame-miners-heaven-rb-capacity">(Max: '+nDeuteriumCap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sThousandSeparator)+')</span>');
                }
            }
            //Deuterium - Restdauer bis voll
            if (GM_getValue('ogh_rb_showremaining')=='1') {
                var nDeuteriumProd = oResData.deuterium.resources.production;
                var nCurDeuterium = parseInt(sCurDeuteriumValue.split(sThousandSeparator).join(""));
                var nRemDeuteriumTime = parseInt((nDeuteriumCap - nCurDeuterium) / nDeuteriumProd);
                var sRemDeuteriumTime = OGameMinersHeaven_hlpSec2Str(nRemDeuteriumTime);
                if ($("#deuterium_box .ogame-miners-heaven-rb-duration")[0]) {
                    $("#deuterium_box .ogame-miners-heaven-rb-duration").html(sRemDeuteriumTime);
                }
                else {
                    $("#deuterium_box").append('<div class="ogame-miners-heaven-rb-duration">'+sRemDeuteriumTime+'</div>');
                }
            }
        }
                
        //inject "br" element between resource icon and value
        $("#resources .resourceIcon").each(function() {
            $("br",$(this).parent()).remove();
            $(this).replaceWith($(this).clone().wrap("<p>").parent().html()+"<br/>");
        });
        
        //Apply some css to patch style to fit with newly added elements
        //and style newlny added elements
        $("#resources .value").css('display:block');
        $(".ogame-miners-heaven-rb-capacity").css(
            {'display':'block','white-space':'nowrap','font-size':'8px'}
        );
        if ($("#metal_box").height() == nInitialResourceHeight) {
            $("#metal_box").height((nInitialResourceHeight + $(".ogame-miners-heaven-rb-capacity:eq(0)").height()) + "px");
            $("#crystal_box").height($("#metal_box").height());
            $("#deuterium_box").height($("#metal_box").height());
        }
        //apply some css
        $(".ogame-miners-heaven-rb-duration").css({'text-align':'left','position': 'relative','top':'-70px','left': '70px','font-size':'8px'});
        $(".ogame-miners-heaven-rb-duration p").css({'margin':'0','padding':'0'});
        $("#metal_box .ogame-miners-heaven-rb-duration,#metal_box .ogame-miners-heaven-rb-capacity").css({'color':$("#deuterium_box .value").css('color')});
        $("#crystal_box .ogame-miners-heaven-rb-duration, #crystal_box .ogame-miners-heaven-rb-capacity").css({'color':$("#deuterium_box .value").css('color')});
        $("#deuterium_box .ogame-miners-heaven-rb-duration, #deuterium_box .ogame-miners-heaven-rb-capacity").css({'color':$("#deuterium_box .value").css('color')});
    }
}

/**
 * Hide annyoing DIVs
 */
function OGameMinersHeaven_hideDIVs() {
    //Hide annoying divs
    $('#banner_skyscraper').css({'display':'none'});
    $('.adviceWrapper').css({'display':'none'});
}

/**
 * Planet List Extensions
 **/
function OGameMinersHeaven_PlanetList() {   
   var bUpdated = false;
        
    //Planet size (Diameter / Fields)
    if (GM_getValue('ogh_pl_showsize')=='1') {
        $('#planetList div[class*="planet"]').each(function() {
            var oCurEntry = $(this);
            if (!$(".ogh-pl-size",oCurEntry)[0]) {
                //Do some Magic
                var sPlanetDetailsURL = location.toString().replace(/page=[^&]+/,'page=overview').replace(/cp=[^&]+/,'')+"&cp="+oCurEntry.attr("id").replace("planet-","");
                if (GM_getValue("diamater:"+oCurEntry.attr("id"))) {
                    if (GM_getValue("diamater:"+oCurEntry.attr("id")).search("&#x00D8;")!=0) {
                        GM_deleteValue("diamater:"+oCurEntry.attr("id"));
                        $("a:first-child",oCurEntry).append('<br/><span class="ogh-pl-size">&#x00D8;: <strong>Laden...</strong></span>');
                        $.get(sPlanetDetailsURL, function(data) {
                            var sDiameterLabel = "&#x00D8;:";
                            var sDiameterSize = data.replace(/[\s\S]*textContent\[1\]="([^"]+)"[\s\S]*/g,"$1").replace(/\\\//g,"/");
                            var sDiameterHTML = sDiameterLabel + " " + sDiameterSize;
                            $(".ogh-pl-size", oCurEntry).empty().html(sDiameterHTML);                       
                            GM_setValue("diamater:"+oCurEntry.attr("id"),sDiameterHTML);
                        });
                        
                    }
                    else {
                        $("a:first-child",oCurEntry).append('<span class="ogh-pl-size">' + GM_getValue("diamater:"+oCurEntry.attr("id")) + '</span>');
                    }
                }
                else {
                    $("a:first-child",oCurEntry).append('<span class="ogh-pl-size">&#x00D8;: <strong>Laden...</strong></span>');
                    $.get(sPlanetDetailsURL, function(data) {
                        var sDiameterLabel = "&#x00D8;:";
                        var sDiameterSize = data.replace(/[\s\S]*textContent\[1\]="([^"]+)"[\s\S]*/g,"$1").replace(/\\\//g,"/");
                        var sDiameterHTML = sDiameterLabel + " " + sDiameterSize;
                        $(".ogh-pl-size", oCurEntry).empty().html(sDiameterHTML);                       
                        GM_setValue("diamater:"+oCurEntry.attr("id"),sDiameterHTML);
                    });
                }
                $(".ogh-pl-size", oCurEntry).css({'font-size':'11px','display':'block','color':'white','text-align':'left'});
                oCurEntry.height((oCurEntry.height() + $(".ogh-pl-size", oCurEntry).height()) + "px");
                bUpdated = true;
            }
        });
    }
    
    
    
    //Remaining building time for planet
    
    var fPLItemUpdater = function(oCurEntry) {
        var sBuildTimeID = 'buildtime-'+oCurEntry.attr("id").replace("planet-","");
             GM_deleteValue("buildtime:"+oCurEntry.attr("id"));
             var fUpdateRemTime = function() {
                 var sRemTimeLabel = "&#x231A;:";
                 GM_setValue("buildtime:"+oCurEntry.attr("id"),'' + (parseInt(GM_getValue("buildtime:"+oCurEntry.attr("id"))) -1));
                 var sRemTimeValue = GM_getValue("buildtime:"+oCurEntry.attr("id"));
                 if (parseInt(sRemTimeValue)<0) {
                     sRemTimeValue = '0';
                 }
                 var sRemTimeHtml = sRemTimeLabel + " " + OGameMinersHeaven_hlpSec2Str(parseInt(sRemTimeValue)).replace(/<p>/g,"").replace(/<\/p>/g,' ');
                 $(".ogh-pl-rembuildingtime", oCurEntry).empty().html(sRemTimeHtml);  
                 if (parseInt(sRemTimeValue)<=0) {
                     window.clearInterval(oPlBuilTimeIntervalMap[oCurEntry.attr("id")]);
                     GM_deleteValue('buildtime:'+oCurEntry.attr("id"));
                     $(".icon_wrench", oCurEntry).remove();
                 }
             }
             if ($(".icon_wrench", oCurEntry)[0]) {
                 //Nur wenn überhaupt wes im bau ist (Icon da)
                 var sPlanetDetailsURL = location.toString().replace(/page=[^&]+/,'page=overview').replace(/cp=[^&]+/,'')+"&cp="+oCurEntry.attr("id").replace("planet-","");
                 $("a:first-child",oCurEntry).append('<span class="ogh-pl-rembuildingtime">&#x231A;: <span id="'+sBuildTimeID+'"><strong>Laden...</strong></span></span>');
                     $.get(sPlanetDetailsURL, function(data) {
                        var sRemTimeLabel = "&#x231A;:";
                        var sRemTimeValue = data.replace(/[\s\S]*new baulisteCountdown\(getElementByIdWithCache\("Countdown"\),(\d+),[\s\S]*/g,"$1").replace(/\\\//g,"/");
                        if (!sRemTimeValue) {
                            sRemTimeValue = '0';
                        } 
                        GM_setValue("buildtime:"+oCurEntry.attr("id"),sRemTimeValue);
                        fUpdateRemTime();
                        window.clearInterval(oPlBuilTimeIntervalMap[oCurEntry.attr("id")]);
                     	oPlBuilTimeIntervalMap[oCurEntry.attr("id")] = window.setInterval(fUpdateRemTime,1000);
                     });
             }
             else {
                 $(".ogh-pl-rembuildingtime",oCurEntry).remove();
                 GM_deleteValue("buildtime:"+oCurEntry.attr("id"));
             }
             
             $(".ogh-pl-rembuildingtime", oCurEntry).css({'font-size':'11px','display':'block','color':'white','text-align':'left'});
             oCurEntry.height((oCurEntry.height() + $(".ogh-pl-rembuildingtime", oCurEntry).height()) + "px");
    }
    
    if (GM_getValue("ogh_pl_rembuildingtime")=='1') {
        $('#planetList div[class*="planet"]').each(function() {
            fPLItemUpdater($(this));
			bUpdated = true;
        });
        $('#planetList div[class*="planet"]:has(a.active)').each(function() {
           	var sPlanetDetailsURL = location.toString().replace(/cp=[^&]+/,'')+"&cp="+$(this).attr("id").replace("planet-","");
            window.setTimeout(function(){$.get(sPlanetDetailsURL, function(data) {})},1000);
            bUpdated = true;
        });
    }
    
    //Ordering 
    if (GM_getValue('ogh_pl_ordering')=='2') {
        //order by coordinates
        $('#planetList div[class*="planet"]').sortElements(function(a,b){
            var sCoords1 = $(".planet-koords",$(a)).text().replace(/[\[\]\s]/g,'');
            var sCoords2 = $(".planet-koords",$(b)).text().replace(/[\[\]\s]/g,'');
            var oRegExpCoords = new RegExp("^\[(\d{1,2})\:\(\d{1,3})\:(\d{1,2})\]$");
            var sG1 = sCoords1.replace(/(\d{1,2}):(\d{1,3}):(\d{1,2})/g,"$1");
            if (sG1.length==1) {
                sG1 = "0" + sG1;
            }
            var sS1 = sCoords1.replace(/(\d{1,2}):(\d{1,3}):(\d{1,2})/g,"$2");
            if (sS1.length==2) {
                sS1 = "0" + sS1;
            }
            else if (sS1.length==1) {
                sS1 = "00" + sS1;
            }
            var sP1 = sCoords1.replace(/(\d{1,2}):(\d{1,3}):(\d{1,2})/g,"$3");
            if (sP1.length==1) {
                sP1 = "0" + sP1;
            }
           	var sG2 = sCoords2.replace(/(\d{1,2}):(\d{1,3}):(\d{1,2})/g,"$1");
            if (sG2.length==1) {
                sG2 = "0" + sG2;
            }
            var sS2 = sCoords2.replace(/(\d{1,2}):(\d{1,3}):(\d{1,2})/g,"$2");
            if (sS2.length==2) {
                sS2 = "0" + sS2;
            }
            else if (sS2.length==1) {
                sS2 = "00" + sS2;
            }
            var sP2 = sCoords2.replace(/(\d{1,2}):(\d{1,3}):(\d{1,2})/g,"$3");
            if (sP2.length==1) {
                sP2 = "0" + sP2;
            }
            sCoords1 = sG1 + sS1 + sP1;
            sCoords2 = sG2 + sS2 + sP2;
            return sCoords1 > sCoords2 ? 1 : -1;
        });
    }
    else if (GM_getValue('ogh_pl_ordering')=='3') {
        //order by name
        $('#planetList div[class*="planet"]').sortElements(function(a,b){
        	var sName1 = $.trim($(".planet-name",$(a)).text()) + $.trim($(a).attr('id'));
            var sName2 = $.trim($(".planet-name",$(b)).text()) + $.trim($(b).attr('id'));
            return sName1.toLowerCase() > sName2.toLowerCase() ? 1 : -1;
        });
    }
        
        
    //Nicht mehr vorhandene Planeten aus dem Cache löschen
    if (bUpdated) {  
        var aCachedKeys = GM_listValues();
        if (aCachedKeys) {
            for (var i=(aCachedKeys.length-1); i>=0; i--) {
                var sPlanetID = aCachedKeys[i].replace(/^[^:]+:(.*)$/,"$1");
                if (!$("#"+sPlanetID)[0]) {
                    GM_deleteValue(aCachedKeys[i]);
                }
            }
        }
    } 
    
}


///////////////////////// HELPER  FUNCTIONS  //////////////////////////////

/**
 * Sets settings to defaults
 * @param {Boolean} bDoReset Overrides settings with their default values even if they're set already. Otherwise they're only set to default if they're not set.
 */
function OGameMinersHeaven_hlpSetSettingsToDefaults(bDoReset) {
    if (typeof(bDoReset)!='boolean') {
        bDoReset = false;
    }
    if (bDoReset) {
        GM_deleteValue('ogh_rb_showcapacity'),
        GM_deleteValue('ogh_rb_showremaining');
        GM_deleteValue('ogh_rb_showremaining');
        GM_deleteValue('ogh_messages_autoload');
        GM_deleteValue('ogh_pl_ordering');
    }
    
    //Set defaults for settings (enable everything)
    if (!GM_getValue('ogh_rb_showcapacity')) {
        GM_setValue('ogh_rb_showcapacity','1')
    }
    if (!GM_getValue('ogh_rb_showremaining')) {
        GM_setValue('ogh_rb_showremaining','1')
    }
    if (!GM_getValue('ogh_pl_showsize')) {
        GM_setValue('ogh_pl_showsize','1')
    }
    if (!GM_getValue('ogh_messages_autoload')) {
        GM_setValue('ogh_messages_autoload','1')
    }
    if (!GM_getValue('ogh_pl_ordering')) {
        GM_setValue('ogh_pl_ordering','1')
    }
    if (!GM_getValue('ogh_pl_rembuildingtime')) {
        GM_setValue('ogh_pl_rembuildingtime','0');
    }
    
}


/**
 * Helper funtion to convert a number of seconds in to a string of format <p>5w</p><p>4d</p><p>3h</p>2m<p>1s</p>
 * @param {Number} nSecs Number of seconds
 * @returns {String} 
 **/
function OGameMinersHeaven_hlpSec2Str(nSecs) {
    var sRes = "";
    //w
    if (nSecs > 604800) {
		sRes += "<p>"+Math.floor(nSecs/604800) + oTimeUnits.w + "</p>";
        nSecs = nSecs % 604800;
    }
    else {
        sRes += "<p>0"+oTimeUnits.w+"</p>";
    }
    //d
    if (nSecs > 86400) {
		sRes += "<p>" + Math.floor(nSecs/86400) + oTimeUnits.d + "</p>";
        nSecs = nSecs % 86400;
    }
    else {
        sRes += "<p>0"+oTimeUnits.d+"</p>";
    }
    //h
    if (nSecs > 3600) {
		sRes += "<p>" + Math.floor(nSecs/3600) + oTimeUnits.h + "</p>";
        nSecs = nSecs % 3600;
    }
    else {
        sRes += "<p>0"+oTimeUnits.h+"</p>";
    }
    //m
    if (nSecs > 60) {
		sRes += "<p>" + Math.floor(nSecs/60) + oTimeUnits.m + "</p>";
        nSecs = nSecs % 60;
    }
    else {
        sRes += "<p>0"+oTimeUnits.m+"</p>";
    }
    //s
    if (nSecs <0) {
        nSecs = 0;
    }
    sRes += "<p>"+ nSecs + oTimeUnits.s + "</p>";
    return sRes;
}

/**
 * @param {String} sTimeStr Time String in the form "1w 1d 1h 12m 12s" (Each fraction is optional)
 * @returns {Number} The amount of time str as seconds or -1 if param is not string
 */
function OGameMinersHeaven_hlpTimeStrToSecs(sTimeStr) {
    var nRes = -1;
    if (typeof(sTimeStr)=='string') {
        s = s.replace(/<\/?p>/g,"");
        var oRegEx = new RegExp("\\s*((\\d+)" + oTimeUnits.w + ")?"+"\\s*((\\d+)" + oTimeUnits.d + ")?"+"\\s*((\\d+)" + oTimeUnits.h + ")?"+"\\s*((\\d+)" + oTimeUnits.m + ")?"+"\\s*((\\d+)" + oTimeUnits.s + ")?\\s*","gmi");
        var oRegExRes = oRegEx.exec(s);
        var nW = (oRegExRes[2] ? parseInt(oRegExRes[2]) : 0) * 7 * 24 * 60 * 60;
        var nD = (oRegExRes[4] ? parseInt(oRegExRes[4]) : 0) * 24 * 60 * 60;
        var nH = (oRegExRes[6] ? parseInt(oRegExRes[6]) : 0) * 60 * 60;
        var nM = (oRegExRes[8] ? parseInt(oRegExRes[8]) : 0) * 60;
        var nS = oRegExRes[10] ? parseInt(oRegExRes[10]) : 0;
        nRes = nW + nD + nH + nM + nS;
    }
    return nRes;
}


///////////////////////////////////////// JQuery Extension /////////////////////////////////////////

/**
 * jQuery.fn.sortElements
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){
 
    var sort = [].sort;
 
    return function(comparator, getSortable) {
 
        getSortable = getSortable || function(){return this;};
 
        var placements = this.map(function(){
 
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
 
                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
 
            return function() {
 
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
 
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
 
            };
 
        });
 
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
 
    };
 
})();