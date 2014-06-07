//-----------------------------------------------------------------------------
// [WoD] BBCode generator
// Version 1.7, 2012-03-10
//
// Script aimed at players of World Of Dungeons. Generates BBCode for in game forum from the content of the current page
//
// A new button will appear at the left side of each page (below menu).
// Pressing this button will generate BBCode representation of current page and append it at the bottom of the page.
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// Changelog
// 1.7.1
// - world-of-dungeons.fr was not takent into account
// 1.7
// - internal optimizations regarding performance (many thanks to Finargol for pointing in right direction)
//
// 1.6
// - now displaying <input> and <textarea> tag texts and images
// - added ignore/don't display handling for bunch of html tags (which are probably not used by wod, but just to be safe)
//
// 1.5
// - now displaying selected option inside <select> tag
//
// 1.4
// - label instead of span by the checkboxes
// - shortened all titles, english, french and croatian are ok, waiting for somebody who knows other languages to tell me if it is ok
// - changed internal representation of localized strings to ease maintenance
// - internal reorganization
// - moved "BBCode create" button to the bottom of central part of the page (it confused some other scripts when placed on top, plus some users said it doesn't suit them when placed on top)
// - added encodeuri to url handling to handle international characters in uris
// - added Finargol to contributor list (thanks for useful input and testing on french server)
//
// 1.3
// - included french translation and allowed all wod sites to use since should not depend on language used.
// - added some translations (based on Google translate, corrections most welcome!!!)
// - changed place where button and options are located to be consistent in popup pages where menu tree on left does not exist
// - now handling urls without href
// - fixed some minor formatting issues (newlines and tabs inside text)
//
// 1.2
// - included font color and size in item, hero, group, monster, etc tags
// - fixed problem with forum post ids
// - added handling for monuments
// - after code is created page is positioned at the beginning of created bbcode
// - created BBCode placed inside text area box for easier copying
//
// 1.1 
// - changed how font size, family and size are handled
// - added checkboxes so user can decide whether to include font size, family and size into BBCode created (plain text works better with various skins)
// - added anonymous function around code so not to polute, or interact with, global namespace
//
// 1.0 
// - initial release
//-----------------------------------------------------------------------------


// ==UserScript==
// @name           [WOD] BBCode Generator
// @namespace      tomy
// @description    Generates BBCode for in game forum from the content of the current page
// @include        http*://*.world-of-dungeons.*
// @version        1.7.1
// @contributor    Finargol, Atchoum
// @author         Tomy
// @copyright      2010+, Tomy (Fixed by Atchoum)
// ==/UserScript==

(function() {

//-----------------------------------------------------------------------------
// auxiliary functions
//-----------------------------------------------------------------------------

// Usage: dump(object)
function dump(object, pad){
    var indent = "\t";
    if (!pad) pad = '';
    var out = '';
    if (object == undefined) {
        out += "undefined";
    } else if (object.constructor == Array) {
        out += '[\n';
        for (var i = 0; i < object.length; ++i) {
            out += pad + indent + '[' + i + '] = ' + dump(object[i], pad + indent) + '\n';
        }
        out += pad + ']';
    } else if (object.constructor == Object || typeof object == 'object') {
        out += '{\n';
        for (var i in object) {
            if (typeof object[i] != 'function')
                out += pad + indent + i + ': ' + dump(object[i], pad + indent) + '\n';
        }
        out += pad + '}';
    } else {
        out += object;
    }
    return out;
}

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) == 0;
};

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.removeRight = function(suffix) {
    if (!this.endsWith(suffix)) return String(this);
    return String(this).substring(0, this.length - suffix.length);
};

String.prototype.removeLeft = function(prefix) {
    if (!this.startsWith(prefix)) return String(this);
    return String(this).substring(prefix.length);
};

function StyleCollection1(styleArray) {
	this.styleArray = styleArray;
}

StyleCollection1.prototype.getStyle = function(styleProp) {
	return this.styleArray[styleProp];
}

function StyleCollection2(styleObj) {
	this.styleObj = styleObj;
}

StyleCollection2.prototype.getStyle = function(styleProp) {
	return this.styleObj.getPropertyValue(styleProp);
}

function getStyleCollection(x)
{
    if (x.currentStyle)
        return new StyleCollection1(x.currentStyle);
    else if (window.getComputedStyle) {
        return new StyleCollection2(document.defaultView.getComputedStyle(x,null));
    } 
	
	return undefined;
}

function getStyle(x,styleProp)
{
    var styles = getStyleCollection(x);
	if (styles != undefined) return styles.getStyle(styleProp);
	else return undefined;
}

function removeLastChild(node) 
{
	node.removeChild(node.lastChild);
}

function DebugMsg(Data)
{
    if (DEBUG)
        alert(dump(Data));
}

//-----------------------------------------------------------------------------
// "global" variables
//-----------------------------------------------------------------------------

var DEBUG = true;
var VER = "1.7.1";
var LOCAL_VAR_NAME = "WOD_BBCode_Creator_Script";

var Result = undefined;
var ButtonTable = undefined;
var KeyButton = null;
var MainContent = undefined;

var CheckBoxes = ["clr", "sz", "fnt"];

var DefaultSize = undefined;
var DefaultFont = undefined;
var DefaultColor = undefined;
var DefaultLinkColor = undefined;

// en fr de it es pl hr
var Contents = {
    "en" : {
          Button_Name            : "Create BBCode"
        , BBCode_Header          : "BBCode"
        , Copyright              : "Created with BBCode Generator"
        , Include_Color          : "color"
        , Include_Size           : "font size"
        , Include_Font           : "font"
    },
    "fr" : {
          Button_Name            : "Créer BBCode"                                           
        , BBCode_Header          : "BBCode"                                                 
        , Copyright              : "Créé avec BBCode Generator"                             
        , Include_Color          : "couleur"                                                
        , Include_Size           : "taille du texte"                                        
        , Include_Font           : "police"                                                 
    },
    "de" : {
          Button_Name            : "BBCode erstellen"                                       
        , BBCode_Header          : "BBCode"                                                 
        , Copyright              : "Erstellt mit BBCode Generator"                          
        , Include_Color          : "Farbe"                     
        , Include_Size           : "Schriftgröße"              
        , Include_Font           : "Schriftart"                
    },
    "it" : {
          Button_Name            : "Crea BBCode"                                            
        , BBCode_Header          : "BBCode"                                                 
        , Copyright              : "Creato con BBCode Generator"                            
        , Include_Color          : "colore"                      
        , Include_Size           : "dimensioni dei caratteri"  
        , Include_Font           : "font"                        
    },
    "es" : {
          Button_Name            : "Crear BBCode"                                           
        , BBCode_Header          : "BBCode"                                                 
        , Copyright              : "Creado con el BBCode Generator"                         
        , Include_Color          : "color"                     
        , Include_Size           : "el tama&ntilde;o de fuente"          
        , Include_Font           : "fuente"                
    },
    "pl" : {
          Button_Name            : "Tworzenie BBCode"                                       
        , BBCode_Header          : "BBCode"                                                 
        , Copyright              : "Stworzony z BBCode Generator"                           
        , Include_Color          : "kolorze"                 
        , Include_Size           : "rozmiar czcionki"   
        , Include_Font           : "font"              
    },
    "hr" : {
          Button_Name            : "Napravi BBKod"
        , BBCode_Header          : "BBKod"
        , Copyright              : "Napravljeno sa BBCode Generator-om"
        , Include_Color          : "boja"
        , Include_Size           : "veli&#269;ina fonta"
        , Include_Font           : "font"
    }
}; 

var Ignored = ["script", "noscript", "textarea", "#comment", "area", "caption", "col", "colgroup", "frame", "frameset", "iframe", "map", "noframes", "noscript", "object", "param", "script"];
var NotDisplayed = ["select", "sup", "sub", "tbody", "thead", "tfoot", "form", "div", "span", "#text", "br", "font", "label", "textarea", "abbr", "acronym", "address", "applet", "bdo", "big", "blockquote", "button", "center", "cite", "code", "dfn", "fieldset", "kbd", "label", "legend", "optgroup", "q", "samp", "small", "tt", "var", "dl"];
var NoEnd = ["p", "li", "hr", "dd"];
var NameChange = {ul:"list", ol:"list", dir:"list", menu:"list", dt:"list", dd:"*", li:"*", a:"url", strike:"s", strong:"b", del:"s", ins:"u"};
var NewLineBefore = ["h1", "h2", "h3", "h4", "h5", "li", "br"];
var NewLineAfter = ["tr"];

var IgnoredImages = [
      "http://skins.world-of-dungeons.net/skins/finals/skin-2/images/icons/reset.gif"
    , "http://skins.world-of-dungeons.net/skins/finals/skin-2/images/icons/steigern_disabled.gif"
    , "http://skins.world-of-dungeons.net/skins/finals/skin-2/images/icons/undo_steigern_enabled.gif"
    , "http://skins.world-of-dungeons.net/skins/finals/skin-2/images/icons/steigern_enabled.gif"
    , "http://skins.world-of-dungeons.net/skins/finals/skin-2/images/icons/inf.gif" 
    , "http://skins.world-of-dungeons.net/skins/finals/skin-2/images/page/spacer.gif"
]

var SpecialURLs = [
      { url:"/wod/spiel/hero/item.php", bbcode:"item" } 
    , { url:"/wod/spiel/hero/skill.php", bbcode:"skill" } 
    , { url:"/wod/spiel/hero/profile.php", bbcode:"hero" } 
    , { url:"/wod/spiel/hero/class.php", bbcode:"class" } 
    , { url:"/wod/spiel/profiles/player.php", bbcode:"player" } 
    , { url:"/wod/spiel/dungeon/group.php", bbcode:"group" } 
    , { url:"/wod/spiel/clan/clan.php", bbcode:"clan" } 
    , { url:"/wod/spiel/help/npc.php", bbcode:"monster" } 
    , { url:"/wod/spiel/clan/item.php", bbcode:"monument" } 
];

//-----------------------------------------------------------------------------
// "initialization" functions
//-----------------------------------------------------------------------------

function Main()
{
    // Language selection
    if (GetLocalContents() == null) return;

    // Add buttons
    KeyButton = Init(Contents.Button_Name, OnCreateBB);
    if (KeyButton == null) return;
}

function Init(ButtonText, ButtonFunct)
{
    MainContent = undefined;

    var newButton = null;
    var main_body = document.getElementById("main_content");
    if (main_body != null && main_body != undefined) 
        MainContent = main_body;
    else {
        var allDivs = document.getElementsByTagName("div");
        for (var i = 0; i < allDivs.length; ++i)
            if (allDivs[i].className == "gadget main_content popup")
                MainContent = allDivs[i];
    }
    
    if (MainContent != undefined) {
        var allInputs = MainContent.getElementsByTagName("div");
        for (var i = 0; i < allInputs.length; ++i)
        {
            if (allInputs[i].className == "gadget_body popup" || allInputs[i].className == "gadget_body")
            {
                ButtonTable = document.createElement("table");
                ButtonTable.setAttribute("width", "100%");

                var hrTR = document.createElement("tr");
                ButtonTable.appendChild(hrTR);
                var hrTD = document.createElement("td");
                hrTD.setAttribute("colspan", "2");
                hrTR.appendChild(hrTD);
                var hr = document.createElement("hr");
                hrTD.appendChild(hr);

                var newTR = document.createElement("tr");
                ButtonTable.appendChild(newTR);
                var buttonTD = document.createElement("td");
                newTR.appendChild(buttonTD);
                newButton = document.createElement("input");
                newButton.setAttribute("type", "button");
                newButton.setAttribute("class", "button");
                newButton.setAttribute("value", ButtonText);
                newButton.addEventListener("click", ButtonFunct, false);
                buttonTD.appendChild(newButton);
                var checkTD = document.createElement("td");
                checkTD.setAttribute("width", "100%");
                checkTD.setAttribute("align", "left");
                newTR.appendChild(checkTD);
                for (var j = 0; j < CheckBoxes.length; ++j) {
                    var checkbox = document.createElement("input");
                    checkbox.addEventListener("click", UpdateSettings, false);
                    checkbox.setAttribute("type", "checkbox");
                    checkbox.setAttribute("id", LOCAL_VAR_NAME + CheckBoxes[j]);
                    if (GM_getValue(LOCAL_VAR_NAME + CheckBoxes[j], true))
                        checkbox.setAttribute("checked", "checked");
                    checkTD.appendChild(checkbox);

                    var text = undefined;
                    if (CheckBoxes[j] == "clr")
                        text = Contents.Include_Color;
                    else if (CheckBoxes[j] == "sz")
                        text = Contents.Include_Size;
                    else if (CheckBoxes[j] == "fnt")
                        text = Contents.Include_Font;
                    
                    var label = document.createElement("label");
                    label.setAttribute("for", LOCAL_VAR_NAME + CheckBoxes[j]);
                    label.innerHTML = text.replace(" ", "&nbsp;") + "&nbsp;";
                    checkTD.appendChild(label);
                }

                allInputs[i].appendChild(ButtonTable);
            }
        }
    }
    
    return newButton;
}

function GetLocalContents()
{
    function GetLanguage()
    {
        var langText = null;
        var allMetas = document.getElementsByTagName("meta");
        for (var i = 0; i < allMetas.length; ++i)
        {
            if (allMetas[i].httpEquiv == "Content-Language")
            {
                langText = allMetas[i].content;
                break;
            }
        }
        return langText;
    }

    var lang = GetLanguage();
    if (lang == null)
        return null;

    if (Contents instanceof Object)
    {
        Contents = Contents[lang];    
        return Contents;
    }
    else
        return null;
}

//-----------------------------------------------------------------------------
// "functionality" functions
//-----------------------------------------------------------------------------

function UpdateSettings() 
{
    for (var i = 0; i < CheckBoxes.length; ++i) {
        GM_setValue(LOCAL_VAR_NAME + CheckBoxes[i], document.getElementById(LOCAL_VAR_NAME + CheckBoxes[i]).checked);
    }
}

function CreateResult() 
{
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "gadget_body");
    Result = document.createElement("textarea");
    Result.setAttribute("readonly", "true");
    Result.setAttribute("rows", 50);
    Result.setAttribute("cols", 110);
    Result.setAttribute("onmouseover", "attachResizer(this)");
    newDiv.appendChild(Result);
    MainContent.appendChild(newDiv);
}

function OnCreateBB()
{
    try    {
        if (this.className == "button_disabled")
            return;
        else
            this.className = "button_disabled";

        if (DefaultSize == undefined) {
            var span = document.createElement("span");
            span.setAttribute("class", "body");
            MainContent.appendChild(span);
			var styles = getFontProps(span);
            DefaultSize = styles.size;
            DefaultFont = styles.font;
            DefaultColor = styles.color;
            MainContent.removeChild(span);
            var link = document.createElement("a");
            link.setAttribute("href", "#");
            link.innerHTML = "test link";
            DefaultLinkColor = getLinkColor(getStyleCollection(link));
        }
        
        if (Result != undefined) {
			removeLastChild(Result.parentNode.parentNode.parentNode);
        }
        
        var ButtonParent = undefined;
        if (ButtonTable != undefined) {
            ButtonParent = ButtonTable.parentNode;
            ButtonParent.removeChild(ButtonTable);
        }

        var hints = undefined;
        var hints_parent = undefined;
        var allInputs = document.getElementsByTagName("div");
        for (var i = 0; i < allInputs.length; ++i)
        {
            if (allInputs[i].className == "hints on" || allInputs[i].className == "hints off") {
                hints = allInputs[i];
            }
        }
        
        if (hints != undefined) {
            hints_parent = hints.parentNode;
            hints_parent.removeChild(hints);
        }
        
        var text = CreateBB(MainContent, "", "", "");

        if (hints != undefined) {
            hints_parent.appendChild(hints);
        }
        
        if (ButtonParent != undefined) {
            ButtonParent.appendChild(ButtonTable);
        } 

        CreateResult();
        Result.innerHTML = "[url=http://userscripts.org/scripts/show/95465][size=9]" + Contents.Copyright + " v" + VER + "[/size][/url]\r\n" + text;

        if (KeyButton.className == "button_disabled")
            KeyButton.className = "button";
    } catch (e) {
        alert("OnCreateBB(): " + e);
    }
}

function GetName(name) {
    if (NameChange.hasOwnProperty(name)) {
        name = NameChange[name];
    }
    return name;
}

function CreateBB(node, size, color, font) {
    var text = "";
    var addStart = "";
    var nodeName = node.nodeName.toLowerCase();
    var displayed = (NotDisplayed.indexOf(nodeName) == -1)

    if (nodeName == "a") {
        var url = node.getAttribute("href");
        
        if (url != null) {
            url = url.replace(/\+/g, " ");
            url = url.removeLeft(location.protocol + "//" + location.host);
            
            var name = url.replace(/.*name=/g, "");
            name = decodeURIComponent(name.replace(/&.*/g, ""));
            if (name.startsWith("/wod/spiel/")) 
                name = node.textContent.trim();

            if (url.startsWith("http://world-of-dungeons.net/") || url.startsWith("http://world-of-dungeons.fr/")) {
                url = url.removeLeft("http://world-of-dungeons.net/");
                url = url.removeLeft("http://world-of-dungeons.fr/");
                var type = url.replace(/\/.*/g, "");
                name = url.replace(/.*\//g, "");
                name = decodeURIComponent(name.replace(/&.*/g, ""));
                if (type == "npc") url = "/wod/spiel/help/npc.php";
                else url = "/wod/spiel/hero/" + type + ".php";
            }

            for (var k = 0; k < SpecialURLs.length; ++k) {
                if (url.startsWith(SpecialURLs[k].url))
                    return " [" + SpecialURLs[k].bbcode + ": \"" + name + "\"" + getLinkProps(node) + "] ";
            }
            
            if (url.startsWith("/wod/spiel/forum/viewforum.php") || url.startsWith("/wod/spiel/forum/viewtopic.php")) {
                var topic = url.startsWith("/wod/spiel/forum/viewtopic.php");
                var board = url.replace(/.*board=/g, "");
                board = board.replace(/&.*/g, "");
                var id = url.replace(/.*\.php\?(p)?id=/g, "");
                id = id.replace(/&.*/g, "");
                if (board == "gruppe" || board == "clan") {
                    return " [" + (topic ? "pcom" : "forum") + ":ec_" + board + "_" + id + "|" + node.firstChild.textContent.trim() + "] ";
                } else if (board == "kein") {
                    return " [" + (topic ? "post" : "forum") + ":" + id + "|" + node.firstChild.textContent.trim() + "] ";
                }
            } 

            addStart = "=" + encodeURI(node.getAttribute("href").removeLeft("http://"));
        } else {
            displayed = false;
        }
    } else if (nodeName == "img") {
        var src = node.getAttribute("src");
        var alt = node.getAttribute("alt");
        var height = node.getAttribute("height");
        var width = node.getAttribute("width");
        var align = node.getAttribute("align");
        var valign = node.getAttribute("valign");
        
        if (align == "bottom" || align == "top") align = null;
        if (valign == "left" || valign == "right") valign = null;
        
        if (src == null || IgnoredImages.indexOf(src) != -1)
            return "";
            
        if (src.startsWith("/wod/css/img/") && alt != null)
            return alt;

        var skin = /http:\/\/skins.world-of-dungeons.net\/skins\/finals\/skin-[0-9]*\/images\/icons\/lang\//g;
        var diamond = /http:\/\/skins.world-of-dungeons.net\/skins\/finals\/skin-[0-9]*\/images\/icons\/diamond.gif/g;
        if (src.startsWith("/wod/css/icons/WOD/gems/") || src.match(skin) || src.match(diamond)) {
            src = src.substring(src.lastIndexOf("/") + 1);
            src = src.substring(0, src.lastIndexOf("."));
            if (src.startsWith("gem_")) src = src.replace("em_", "");
            if (src.startsWith("mgem_")) src = src.replace("gem_", "");
            return ":" + src + ":";
        }
            
        return "[img" + ((height != null && width != null) ? ("=" + width + "x" + height) : "") + (align != null ? (" align=" + align) : "") + (valign != null ? (" valign=" + valign) : "") + "]" + src + "[/img]";
    } else if (nodeName == "table") {
        var border = node.getAttribute("border");
        if (border != null) 
            addStart = " border=" + border;
        if (node.getAttribute("class") == "content_table")
            addStart = " border=1";
    } else if (nodeName == "td") {
        var align = node.getAttribute("align");
        var valign = node.getAttribute("valign");
        var colspan = node.getAttribute("colspan");
        var rowspan = node.getAttribute("rowspan");
        if (valign == "baseline") 
            valign = null;

        if (align != null) 
            addStart = " align=" + align;
        if (valign != null) 
            addStart = " valign=" + valign;
        if (colspan != null) 
            addStart = " colspan=" + colspan;
        if (rowspan != null) 
            addStart = " rowspan=" + rowspan;
    } else if (nodeName=="option") {
		if(node.selected)
			return " " + node.textContent + " ";
		else 
			return "";
	} else if (nodeName=="input") {
		var type = node.getAttribute("type");
		if (type=="checkbox" || type == "file" || type == "hidden" || type == "radio" || type == "password")
			return "";

		var value = node.getAttribute("value");
		var url = node.getAttribute("url");
		
		if (value != null && value.trim().length > 0) {
			var text = "";
			var styles = getFontProps(node);
			
            if (styles.color != "") text += "[color=" + styles.color + "]";
            if (styles.size != "") text += "[size=" + styles.size + "]";
            if (styles.font != "") text += "[font=" + styles.font + "]";

            text += " " + value.replace(/[\n\r]/g," ").replace(/\t|^[\t|\s]+|[\t|\s]+$/g, "") + " ";

            if (styles.font != "") text += "[/font]";
            if (styles.size != "") text += "[/size]";
            if (styles.color != "") text += "[/color]";
			
			return text;
		}
		
		if (url != null && url.trim().length > 0) {
			return "[img]" + url + "[/img]";
		}
		
		return "";
	}
    
    if (Ignored.indexOf(nodeName) != -1) return text;

    if (NewLineBefore.indexOf(nodeName) != -1) 
        text += "\r\n";
    
    if (displayed) {
        text += (" [" + GetName(nodeName) + addStart + "]");
    }

    var children = node.childNodes;
    if (children.length > 0) {
		var styles = getFontProps(node);
        for (var j = 0; j < children.length; ++j) {
            text += CreateBB(children[j], styles.size, styles.color, styles.font);
        }
    } else {
        if (node.textContent.trim().length > 0) {
            if (color != "") text += "[color=" + color + "]";
            if (size != "") text += "[size=" + size + "]";
            if (font != "") text += "[font=" + font + "]";

            text += " " + node.textContent.replace(/[\n\r]/g," ").replace(/\t|^[\t|\s]+|[\t|\s]+$/g, "") + " ";

            if (font != "") text += "[/font]";
            if (size != "") text += "[/size]";
            if (color != "") text += "[/color]";
        }
    }


    if (displayed && NoEnd.indexOf(nodeName) == -1) {
        text += ("[/" + GetName(nodeName) +"] ");
    }


    if (NewLineAfter.indexOf(nodeName) != -1) 
        text += "\r\n";

    return text;
}

function getFontProps(node) {
	var styleCollection = getStyleCollection(node);
	return {color:getColor(styleCollection), size:getFontSize(styleCollection), font:getFont(styleCollection)};
}

function getLinkProps(node) {
    var text = "";

    if (node.childNodes.length > 0 && node.firstChild.nodeName.toLowerCase() != "#text")
        node = node.firstChild
    
	var styleCollection = getStyleCollection(node);
    var color = getLinkColor(styleCollection);
    var size = getFontSize(styleCollection);
    if (color != "") text += " color=" + color;
    if (size != "") text += " size=" + size;
    
    return text;
}

function getLinkColor(styleCollection) {
    if (!GM_getValue(LOCAL_VAR_NAME + "clr", true)) return "";
    var txtColor = getItemColor(styleCollection);
    if (txtColor == DefaultLinkColor) txtColor = "";
    return txtColor;
}

function getColor(styleCollection) {
    if (!GM_getValue(LOCAL_VAR_NAME + "clr", true)) return "";
    var txtColor = getItemColor(styleCollection);
    if (txtColor == DefaultColor) txtColor = "";
    return txtColor;
}

function getItemColor(styleCollection) {
    if (styleCollection == undefined) return "";
    
    var txtColor = styleCollection.getStyle("color") // rgb(255,255,255);
    if (txtColor == undefined) return "";
    
    if (txtColor.startsWith("rgb(") && txtColor.endsWith(")")) {
        txtColor = txtColor.substring(4, txtColor.length - 1);
        var colors = txtColor.split(",");
        txtColor = "#" + toHex(colors[0]) + toHex(colors[1]) + toHex(colors[2]);
    }
    return txtColor;
}

function getFontSize(styleCollection) {
    if (!GM_getValue(LOCAL_VAR_NAME + "sz", true) || styleCollection == undefined) return "";

    var size = styleCollection.getStyle("font-size");
    if (size == undefined) size = "";
    size = size.removeRight("px");
    if (size == DefaultSize) size = "";
    return size;
}

function getFont(styleCollection) {
    if (!GM_getValue(LOCAL_VAR_NAME + "fnt", true) || styleCollection == undefined) return "";

    var family = styleCollection.getStyle("font-family");
    if (family == undefined) family = "";
    var comma = family.indexOf(',');
    if (comma != -1) family = family.substring(0, comma);
    if (family == DefaultFont) family = "";
    return family;
}

function toHex(dec) {
    var ret = parseInt(dec, 10).toString(16);
    if (ret.length == 1) ret = "0" + ret;
    return ret;
}

//-----------------------------------------------------------------------------
// "main"
//-----------------------------------------------------------------------------
try {Main();} catch(e) {alert("Main(): " + e);}

})();
