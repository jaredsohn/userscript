// ==UserScript==
// @name        stuff
// @namespace   amazon.awwwjay
// @include     http://*/explorer/index.html
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @resource    JQueryUI_CSS    http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_getResourceText
// @grant       GM_addStyle
// ==/UserScript==


this.$ = this.jQuery = jQuery.noConflict(true);
console.log("jquery ver: "+jQuery.fn.jquery)
console.log("jquery ui ver: "+jQuery.ui.version)
var cssTxt  = GM_getResourceText("JQueryUI_CSS");
var menuCss = "#feedback { font-size: 1.4em; } #templateList .ui-selecting { background: #FECA40; } #templateList .ui-selected { background: #F39814; color: white;} #templateList { list-style-type: none; margin: 0; padding: 0; width: 100%; text-align: center} #templateList li { margin: 3px; padding: 0.4em; font-size: 1.0em; height: 18px; }"

GM_addStyle (cssTxt);
GM_addStyle (menuCss);
var inited = GM_getValue("inited")
if (!inited){
    var username =  prompt("What's your username?")
    console.log("Saving username: "+ GM_setValue("username", username))
    GM_setValue("inited", true)
}
else{
    username = GM_getValue("username")
}

attachUI()

function attachUI(){
    console.log("Attaching UI")
    var buttons = '<div id="templateButtons"></div>'
    var saveButton = '<button id="save-button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" style="align: center;"><span class="ui-button-text">Save Template</span></button>'
    var loadButton = '<button id="load-button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" style="align: center;"><span class="ui-button-text">Load Template</span></button>'
    var setDefButton = '<button id="setdef-button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" style="align: center;"><span class="ui-button-text">Set As Default Template</span></button>'
    var deleteButton = '<button id="delete-button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" style="align: center;"><span class="ui-button-text">Delete Template</span></button>'
    buttons = $(buttons).append(saveButton).append(loadButton).append(setDefButton).append(deleteButton)
    $('.operations').find('a').click(function(){postpone(function(){loadTemplates(true)})})
    $('input[type="submit"]').click(regenRequestId)
    var templateListHtml = "<div id='templateListContainer'> <ol id='templateList'><h3>Templates</h3></ol></div>"
    $('body').prepend(templateListHtml)
    var tlist =  $('#templateListContainer')
    tlist.css({
        "width":"200",
        "font-size":"0.8em",
        "margin":"0 auto",
        "right": "0",
        "position": "fixed"
        })
    $('#templateListContainer').append(buttons)
    $('#save-button').click(saveTemplate)
    $('#load-button').click(loadTemplate)
    $('#setdef-button').click(setDefaultTemplate)
    $('#delete-button').click(deleteTemplate)
        
    $('#save-button').css({
        "width":"100%",
        "font-size":"0.8em",
        "margin":"0 auto"
        })
    $('#load-button').css({
        "width":"100%",
        "font-size":"0.8em",
        "margin":"0 auto"
        })
    $('#setdef-button').css({
        "width":"100%",
        "font-size":"0.8em",
        "margin":"0 auto"
        })
    $('#delete-button').css({
        "width":"100%",
        "font-size":"0.8em",
        "margin":"0 auto"
        })
}

function getCurrentProtocol(){
    return $('.protocol').find('input:checked').val()
}
function getCurrentTextArea(){
    var currProtocol = getCurrentProtocol()
    var textarea = $('.operation.current').find('textarea.'+currProtocol).filter(textAreaFilterFunc);
    return textarea
}
function getSelectedTemplate(){
    return $('.ui-widget-content.ui-selectee.ui-selected').text()
}
function getTemplateMap(){
    console.log("Getting template map for current operation")
    var currProtocol = getCurrentProtocol()
    var templateId = $('.operation.current').attr('id') + ":" + currProtocol;
    console.log("Loading with key: "+templateId)
    var templateMap =  GM_getValue(templateId)
    console.log("Got template map: "+templateMap)
    if(templateMap != null){
        templateMap = JSON.parse(templateMap)
    }
    else{
        templateMap = {}
    }
    console.log("Returning "+templateMap)
    return templateMap
}

function deleteTemplate(){
    var templateName = getSelectedTemplate()
    var templateMap = getTemplateMap()
    
    if(templateMap != null && templateName != null){
        delete templateMap[templateName]
        if(templateMap["defaultName"] == templateName){
            delete templateMap["default"]
        }
    }
    persistTemplateMap(templateMap)
    loadTemplates(false)
}
function getCurrentTextArea(){
    var currProtocol = getCurrentProtocol()
    var textarea = $('.operation.current').find('textarea.'+currProtocol).filter(textAreaFilterFunc);
    return textarea
}

function setDefaultTemplate(){
    var selectedTemplateName = getSelectedTemplate()
    console.log("Setting "+selectedTemplateName+" as the default")
    var templateMap = getTemplateMap()
    if(templateMap != null){
        templateMap["default"] = templateMap[selectedTemplateName]
        templateMap["defaultName"] = selectedTemplateName
        persistTemplateMap(templateMap)
    }
    else{
        console.log("No template map exists, cannot save default")
    }
}

function persistTemplateMap(templateMap){
    var currProtocol = getCurrentProtocol()
    var templateId = $('.operation.current').attr('id') + ":" + currProtocol;
    templateMap = JSON.stringify(templateMap)
    console.log("Storing template map: "+templateMap)
    GM_setValue(templateId, templateMap)
}

function resetTemplateList(){
    var tlist = $('#templateList').empty()
    tlist.append('<h3>Templates</h3>')
}

function saveTemplate(){
    console.log("Saving template")
    var templateMap = getTemplateMap()
    if(templateMap == null || typeof templateMap != "object"){
        templateMap = {};
    }
    
    var templateName = getSelectedTemplate()
    console.log("Got templateName: "+templateName)
    if(templateName == null || templateName.length < 1){
        console.log("templateName is null, need user input: ")
        templateName =  prompt("Enter a name for this template")
        if(templateName == null){
            return
        }
    }
    console.log("Using templateName: "+templateName)
    templateMap[templateName] = getCurrentTextArea().val()
    persistTemplateMap(templateMap)
    loadTemplates(false)
}

function loadTemplate(){
    var templateName = getSelectedTemplate()
    console.log("Loading selected template with name: "+templateName)
    var templateMap = getTemplateMap()
    console.log("Got template map: "+templateMap)
    if(templateName != null && templateMap != null){
        getCurrentTextArea().val(templateMap[templateName])
		regenRequestId()
    }
}

function loadTemplates(loadDefault){
    console.log("Loading templates")
    resetTemplateList()
    var templateMap = getTemplateMap()
    console.log("Got template map: "+templateMap)
    var keys = Object.keys(templateMap)
    var content = ""
    $.each( keys, function( i, currentElement ) {
        if(keys[i] != "default" && keys[i] != "defaultName"){
            content += "<li class='ui-widget-content'>"+keys[i]+"</li>"
        }
	})
	$('#templateList').append(content)
	$('#templateList').bind( "mousedown", function ( e ) {
        e.metaKey = true;
    } ).selectable    ({
          selected: function(event, ui) {
                $(ui.selected).siblings().removeClass("ui-selected");
          }
    });

	if(loadDefault){
		var defTemplateText = templateMap["default"]
		if(defTemplateText != null){
		   getCurrentTextArea().val(defTemplateText)
		}
	}
	regenRequestId()
}

function insertArg(text, arg, value){
    var index = text.indexOf("RequestId")
    if(index > 0 && text[index-1]=='"'){
        index +=  arg.length + 1
        while(text[index] != '"'){
            index += 1
        }
        index += 1
        var start = index
        while(text[index] != '"'){
            index += 1   
        }
        var end = index
        return text.substr(0, start) + value + text.substr(end)
    }
    else{
        return text
    }
}
function regenRequestId(){
    var textarea = $('.operation.current').find('textarea.'+getCurrentProtocol()).filter(textAreaFilterFunc);
    var text = insertArg(textarea.val(), "RequestId", generateRequestId())
    textarea.val(text);
}
function generateRequestId(){
     return "amzn1.fc.v1.common.request-id.v1.fctest."+$('.operation.current').attr('id')+"."+username+"."+Math.random()*10000+"."+Math.random()*10000+"."+Math.random()*10000
}

function textAreaFilterFunc( index ){
    return $(this).css('position') != 'absolute';
}

function postpone(func){
    window.setTimeout(func,500);
}
