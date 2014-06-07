// -*- coding: UTF-8; indent-tabs-mode:nil; tab-width:4 -*-
// ==UserScript==
// @name           Parempi IRC-Galleria
// @namespace      http://elovirta.com/greasemonkey
// @description    Lisää IRC-Galleriaan uusia ominaisuuksia. Versio 3.1.0
// @include        http://irc-galleria.net/*
// ==/UserScript==

// Constants -------------------------------------------------------------------

var BASE = "http://irc-galleria.net/";

var PARAM_COUNT = "visitor_count";
var PARAM_DEBUG = "debug";
var PARAM_INTERVAL = "interval";
var PARAM_EDITOR = "editor";
var PARAM_ACTIONS = "actions";
var PARAM_PRETTYLINKS = "pretty_links";

var ID_CHANNELACTIONS = "channelactions";
var ID_PROFILEACTIONS = "profileactions";
var ID_COMMENTFIELD = "commentfield";
var ID_VISITORLIST = "visitorlist";
var ID_INDEXMYPICTURE = "indexmypicture";
var ID_PROFILEVISITORLIST = "profilevisitorlist";
var ID_BROWSEVISITORS = "browsevisitors";
var ID_PROFMSN = "profmsn";
var ID_MAINMENU = "mainmenu";
var ID_MMINDEX = "mmindex";
var ID_MMNEWCOMMENTS = "mmnewcomments";
var ID_MMNEWCHANNELCOMMENTS = "mmnewchannelcomments";
var ID_MMOWN = "mmown";
var ID_SETTINGS = "settings";
var ID_CMSETTINGMISC = "cmsettingmisc";

var CLASS_SELECTED = "selected";
var CLASS_SMALLBOX = "smallbox";
var CLASS_TITLE = "title";
var CLASS_CONTENT = "content";
var CLASS_INNERBORDER = "innerborder";
var CLASS_OUTERBORDER = "outerborder";
var CLASS_TOOL_LINK = "tool_link";
var CLASS_SETTING = "setting";
var CLASS_HELPLINK = "helplink";
var CLASS_TEXT = "text";

var ELEMENT_A = "a";
var ELEMENT_DIV = "div";
var ELEMENT_FORM = "form";
var ELEMENT_IMG = "img";
var ELEMENT_INPUT = "input";
var ELEMENT_H3 = "h3";
var ELEMENT_LABEL = "label";
var ELEMENT_LI = "li";
var ELEMENT_P = "p";
var ELEMENT_SPAN = "span";
var ELEMENT_TR = "tr";
var ELEMENT_UL = "ul";

var IMG_PLUS = "data:image/gif,GIF87a%15%00%18%00%C6P%005Ok6Pk6Pl7Ql8Rm9Sn%3ATo%3BTo%3BUp%3CUp%3CUq%3DVr%3DWr%3EWr%3EXs%3FXt%40Yt%40ZuAZuBZtB%5BvC%5CwC%5DxD%5DwD%5DxD%5EyE%5EyF%5ExD_zE_zE_%7BG_xE%60%7BF%60%7CFa%7CGa%7DHb%7EJb%7BHc%7EIc%7FKc%7CId%7FMd%7EMe%7FNe%7ENf%80Pg%7FQh%81Qh%82Qi%81Qi%82Ri%83Rj%85Tk%84Uk%83Ul%85Tm%85Vm%85Vn%86Vn%87Xn%86%5Bq%88%5Ds%8A_t%8B%60u%8Cbw%8Dcw%8Dbx%8Fdz%90ez%91%80%92%A5%82%94%A7%82%95%A7%84%97%AA%8E%9F%B0%8F%A0%B1%90%A1%B2%96%A6%B7%96%A7%B7%AA%B9%C6%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%B8%C5%D1%2C%00%00%00%00%15%00%18%00%00%07%EE%80B%29%83%27%27%83%87%86%88%87%29A%24%26%24%8E%91%90%8F%8F%91%95%40%23%99%21%9B%9C%9D%9E%99%3F%22%22%9E%21%244%24%A4%9C%3E%1E%AC%1C%AE%1C%1D8I8%1D%B0%AF%1C%20%20%3D%19%BC%16%BE%16%19%3BL%3A%19%C0%BF%16%1A%19%3C%BF%14%CD%14%159L7%15%CF%CE%14%BE6%CE%12%17057END752%18%12%E7%CD/%11%EB%10%2AGKLMOMLLH%2B%10%F9%EB%2C%0F%FD%0E%12-%60%CC%18%D2d%C8%8C%19-%248X%D8%AF%04%83%87%0B%22.%60%10cI%0C%88%12%272%D8%A0%A0c%82%8F%1F%5D%28q%01%B2d%C7%09%07R%1AX%B9%12%85%11%14%2Cc%A6lP%A0%A6%CD%9A%09%3E%24%B8%C9%13%01%81%9F%03%82%0A%1DJ%F4%27%81%00H%93%2A%5D%BAT%00%80%A7P%A3J%9DJ%B5%AA%D5%ABX%B3j%DD%CA%B5%AB%D7%AD%81%00%00%3B";
var IMG_MINUS = "data:image/gif,GIF89a%15%00%18%00%C4%00%000Hh8Ph0PhH%60x%40Xp8Pp%40%60x8Xp%40XxH%60%80Xh%80Ph%80%90%A0%B0%80%90%A0Xp%80Xp%88%60p%88%88%98%A8%88%A0%B0%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%21%F9%04%01%00%00%13%00%2C%00%00%00%00%15%00%18%00%00%05t%204%8Cdi%9A%E2%A9%9E%90%E1%BEp%1C%3Fr%5D%3FH%AE%EF%BC%EE%E2%BD%60O%A1%23%18%8F%C8dn%91%5C8%15%CE%28%A2%89%1C4%24%0CF%24%CBh%0C%92%83%83%F8%40HD%1D%D1%04a%2C%1E%14%DE%F0%B8%5C%8E%98%DB%ED%84%80%7E%CF%EF%F7%0B%7E%81%81%80z%02%86%87%86%01%88%89%85%8B%8E%8F%86%00%92%93%94%95%96%97%98%99%9A%9B%9C%9D%9E%9F%A0%A1%9E%21%00%3B";
var IMG_THROBBER_WIN = "chrome://global/skin/throbber/Throbber-small.gif";
var IMG_THROBBER_OSX = "chrome://global/skin/icons/loading_16.gif";

var HEADERS = { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey' };

var REGEXP_PERSONAL = /<li id="mmnewcomments">(.+?<span class="placeholder">(\d)+<\/span>.+?)<\/li>/;
var REGEXP_GROUP = /<li id="mmnewchannelcomments">(.+?<span class="placeholder">(\d)+<\/span>.+?)<\/li>/;

var MAX_COMMENT_LENGTH = 500;

// Variables -------------------------------------------------------------------

var firstCheck = true;
var checking = false;
var checkerCounter = 0;
var checkerTimer = 0; 

var debug = false;

var commentTextarea;
var commentLength;

// Objects ---------------------------------------------------------------------

/**
 * Comments.
 */
function Comments(personal, group, personalHtml, groupHtml) {
    this.personal = personal;
    this.group = group;
    this.personalHtml = personalHtml;
    this.groupHtml = groupHtml;
}

/**
 * Widget for visitor list.
 */
var VisitorListWidget = {
    parameterName: PARAM_COUNT,
    title: "N\u00e4ytett\u00e4v\u00e4n vieraslistan pituus",
    description: "Etusivulla n\u00e4ytett\u00e4v\u00e4n vieraslistan pituus. Laita arvoksi nolla jos et halua vieraslistaa etusivulle.",
    readSetting: function (input) {
        GM_setValue(PARAM_COUNT, parseInt(input.value));
    },
    visitorlist: undefined,
    count: undefined,
    addWidget: function () {
        var widget = this;
        widget.count = GM_getValue(PARAM_COUNT);        
        var entryPoint = document.getElementById(ID_INDEXMYPICTURE);
        if (entryPoint !== null && widget.count > 0) {
            widget.visitorlist = createSidebarBox(entryPoint, ID_PROFILEVISITORLIST, ID_VISITORLIST, "Vieraslista", true);
            GM_xmlhttpRequest({
                method: 'GET',
                url: BASE + 'visitorlist.php',
                headers: HEADERS,
                onload: function (responseDetails) {
                    VisitorListWidget.requestHandler(responseDetails, widget);
                }
            });
        } 
    },
    requestHandler: function (responseDetails, widget) {
        if (responseDetails.status === 200) {
            widget.visitorlist.innerHTML = responseDetails.responseText;
            var visitors = widget.visitorlist.getElementsByTagName(ELEMENT_A);
            if (visitors.length > widget.count) {
                var last = visitors[widget.count - 1];
                while (last.nodeName.toLowerCase() !== ELEMENT_TR) {
                    last = last.parentNode;
                }
                while (last.nextSibling !== null) {
                    last.parentNode.removeChild(last.nextSibling);
                }                       
            }
            //entryPoint.parentNode.insertBefore(profilevisitorlist, entryPoint);
            var browsevisitors = document.createElement(ELEMENT_DIV);
            browsevisitors.id = ID_BROWSEVISITORS;
            browsevisitors.className = CLASS_TOOL_LINK;
            widget.visitorlist.parentNode.appendChild(browsevisitors);
            var browse = document.createElement(ELEMENT_A);
            browse.href = "browse.php?search=visitors";
            browsevisitors.appendChild(browse);
            browse.appendChild(document.createTextNode("Selaa vierailijoiden kuvia"));
        }
    }
};

/**
 * Widget for Last.fm recently played tracks.
 */
/*
var LastfmWidget = {
    parameterName: PARAM_LASTFM,
    LASTFM_TITLE_LENGTH: 21,
    title: "Last.fm soittolista",
    description: "N\u00e4yt\u00e4 Last.fm soittolista profiilisivuilla.",
    readSetting: function (input) {
        GM_setValue(PARAM_LASTFM, input.checked);
    },
    visitorlist: undefined,
    addWidget: function () {
        var widget = this;
        var proflastfm = document.getElementById(ID_PROFLASTFM);
        if (proflastfm !== null) {
            var entryPoint = document.getElementById("profilecommunities");
            widget.visitorlist = createSidebarBox(entryPoint, "profilelastfmlist", "lastfmlist", "Soittolista", true, false);
            var a = proflastfm.getElementsByTagName(ELEMENT_A)[0];
            var user = a.firstChild.data;
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://ws.audioscrobbler.com/1.0/user/' + user + '/recenttracks.xml',
                headers: HEADERS,
                onload: function (responseDetails) {
                    LastfmWidget.requestHandler(responseDetails, widget);
                }
            });   
        }
    },
    requestHandler: function (responseDetails, widget) {
        if (responseDetails.status === 200) {
            var parser = new DOMParser();
            var rss = parser.parseFromString(responseDetails.responseText, "application/xml");
            while (widget.visitorlist.firstChild) {
                widget.visitorlist.removeChild(widget.visitorlist.firstChild);
            }
            var list = document.createElement("div");
            list.className = "channellist";
            list.style.padding = "10px 0 10px 0";
            var items = rss.getElementsByTagName("track");
            for (var item = 0; item < items.length; item++) {
                var artist = getElementValue(items[item], "artist");
                var track = getElementValue(items[item], "name");
                var url =  getElementValue(items[item], "url");
                var streamable = items[item].getAttribute("streamable") == "true";
                var title = artist + " - " + track;
                var span = document.createElement("div");
                //span.className = "profcommunity";
                span.style.whiteSpace = "nowrap";
                span.title = title;
                if (title.length > LastfmWidget.LASTFM_TITLE_LENGTH) {
                    title = title.substring(0, LastfmWidget.LASTFM_TITLE_LENGTH + 1) + "...";
                }
                var a = document.createElement("a");
                a.href = url;
                a.appendChild(document.createTextNode(title));
                span.appendChild(a);
                list.appendChild(span);
            }
            widget.visitorlist.appendChild(list);                    
        }
    }
};
*/

// Utility functions -----------------------------------------------------------

/**
 * Test if user is logged in.
 */
function loggedIn() {
    return document.getElementById(ID_MMOWN) !== null;
}

/**
 * Test if string starts with another string.
 */
function starsWith(str, start) {
    return str.substring(0, start.length) === start;
}

/**
 * Get string value of an Element.
 */
function getElementValue(parent, name) {
    var elements = parent.getElementsByTagName(name);
    if (elements.length > 0) {
        return elements[0].firstChild.data;
    }
    return undefined;
}

// Page functions --------------------------------------------------------------

/**
 * Common actions for all pages.
 */
function allPages() {
    window.setInterval(checkNewComments, GM_getValue(PARAM_INTERVAL) * 1000);
}

/**
 * Pretty-print link URLs.
 */
function changeLinks() {
  var regex = new RegExp("^http://.+\\.wikipedia\\.org/wiki/(.+)(#.*)?$");
  var as = document.getElementsByTagName("a");
  var match;
  for (var i = 0; i < as.length; i++) {
    if ((match = regex.exec(as[i].href)) !== null) {
      as[i].firstChild.data = match[1].replace(/_/g, " ");
    }
  }  
}

/**
 * Change comment field.
 */
function commentablePages() {
    if (!GM_getValue(PARAM_EDITOR)) {
        return;
    }
    if (document.getElementById("commentfield")) {
        var comment = document.getElementById("commentfield");
        commentTextarea = document.createElement("textarea");
        commentTextarea.className = comment.className;
        commentTextarea.style.width = comment.offsetWidth + "px";
        commentTextarea.rows = 1;
        commentTextarea.style.height = "15px";
        commentTextarea.name = comment.name;
        comment.id = "xcommentfield";
        commentTextarea.id = "commentfield";
        var td = comment.parentNode.parentNode.parentNode.firstChild;
        while (td) {
            if (td.nodeType === 1) {
                td.style.verticalAlign = "top";
            }
            td = td.nextSibling;
        }
        
        addEventListener("keyup", lengthLimiter, true);
        addEventListener("change", lengthLimiter, true);

        commentLength = document.createElement("div");
        commentLength.style.display = "none";
        commentLength.appendChild(document.createTextNode(commentTextarea.value.length + "/" + MAX_COMMENT_LENGTH));
        document.getElementById("submit").parentNode.appendChild(commentLength);
        
        addEventListener("focus", function (event) {
            if (event.target.rows === 1) {
                event.target.rows = 10;
                commentTextarea.style.height = "";
                commentLength.style.display = "block";
            }
        }, true);
        addEventListener("blur", function (event) {
            if (event.target.rows !== 1 && event.target.value === ""){
                event.target.rows = 1;
                commentTextarea.style.height = "15px";
                commentLength.style.display = "none";
            }
        }, true);
        
        comment.parentNode.appendChild(commentTextarea);
        comment.parentNode.removeChild(comment);
    }
}

/**
 * Limit comment length.
 */
function lengthLimiter(event) {
    if (commentTextarea.value.length > MAX_COMMENT_LENGTH) {
        commentTextarea.value = commentTextarea.value.substr(0, MAX_COMMENT_LENGTH);
    }
    commentLength.firstChild.data = commentTextarea.value.length + "/" + MAX_COMMENT_LENGTH;
}


/**
 * Front page.
 */
function frontPage() {
    if (loggedIn()) {
        VisitorListWidget.addWidget();
    }
}

/**
 * Create sidebar box.
 */
function createSidebarBox(entryPoint, id, innerId, header, throbber, help) {
    if (throbber === undefined) {
        throbber = false;
    }
    if (help === undefined) {
        help = true;
    }
    var smallbox = document.createElement(ELEMENT_DIV);
    smallbox.id = id;
    smallbox.className = CLASS_SMALLBOX;
    var outerborder = document.createElement(ELEMENT_DIV);
    outerborder.className = CLASS_OUTERBORDER;
    smallbox.appendChild(outerborder);
    //title
    var title = document.createElement(ELEMENT_DIV);
    title.style.position = "relative";
    title.className = CLASS_TITLE;
    outerborder.appendChild(title);
    var h3 = document.createElement(ELEMENT_H3);
    title.appendChild(h3);
    h3.appendChild(document.createTextNode(header));
    if (help) {
        var helplink = document.createElement(ELEMENT_A);
        helplink.className = CLASS_HELPLINK;            
        helplink.setAttribute("onclick", "Infobox.showPositionedHelpBox(this, '" + id + "'); return false");
        helplink.href = "#";
        title.appendChild(helplink);
    }
    // content
    var content = document.createElement(ELEMENT_DIV);
    content.className = CLASS_CONTENT;
    outerborder.appendChild(content);
    // innerborder
    var innerborder = document.createElement(ELEMENT_DIV);
    innerborder.className = CLASS_INNERBORDER;
    content.appendChild(innerborder);
    var visitorlist = document.createElement(ELEMENT_DIV);
    visitorlist.id = innerId;
    if (throbber) {
        var loadIcon = document.createElement(ELEMENT_IMG);
        loadIcon.src = window.navigator.platform.substring(0, 3) === "Mac"
                       ? IMG_THROBBER_OSX
                       : IMG_THROBBER_WIN;
        visitorlist.appendChild(loadIcon);
    }
    innerborder.appendChild(visitorlist);
    entryPoint.parentNode.insertBefore(smallbox, entryPoint);
    return visitorlist;
}

/**
 * Retrieves IRC-Galleria front page and checks if new comments have arrived.
 */
function checkNewComments() {
    if (checking || firstCheck) {
        firstCheck = false;
        return;
    }
    checking = true;
    if (debug) {
        checkerCounter++;
        checkerTimer = new Date();
    }
    GM_xmlhttpRequest({
        method: 'GET',
        url: BASE + 'index.php',
        headers: HEADERS,
        onload: function (responseDetails) {
            if (responseDetails.status === 200) {
                var comments = parseIndexPage(responseDetails.responseText);
                displayNewComments(comments);
            }
            checking = false;
        }
    });
}

/**
 * @type Comments
 */
function parseIndexPage(text) {
    var personal = 0;
    var group = 0;
    var personalHtml = "";
    var groupHtml = "";
        
    var pResult = REGEXP_PERSONAL.exec(text);
    if (pResult !== null) {
        personalHtml = pResult[1];
        personal = parseInt(pResult[2]);
    }
    var cResult = REGEXP_GROUP.exec(text);
    if (cResult !== null) {
        groupHtml = cResult[1];
        group = parseInt(cResult[2]);
    }    
    return new Comments(personal, group, personalHtml, groupHtml);
}

/**
 * Display new comments in page.
 */
function displayNewComments(com) {
    var title = document.title;
    var prefix = "";
    if (title.substring(0, 2) === "* ") {
        title = title.substring(2);
    }
    setNewCommentsBlock(ID_MMNEWCHANNELCOMMENTS, com.groupHtml);
    if (!isNaN(com.group) && com.group !== 0) {
        prefix = "* ";
    }
    setNewCommentsBlock(ID_MMNEWCOMMENTS, com.personalHtml);
    if (!isNaN(com.personal) && com.personal !== 0) {
        prefix = "* ";
    } 
    document.title = prefix + title;
    
    if (debug) {
        var end = new Date();
        var elapsed = end.getTime() - checkerTimer;
        GM_log("Checked for comments: " + com.group + "/" + com.personal + ", check number " + checkerCounter + ", interval " + elapsed + "s");
    }
}

/**
 * Set comment block in header.
 */
function setNewCommentsBlock(id, contents) {
    var li = document.getElementById(id);
    if (li === null) {
        var parent = document.getElementById(ID_MAINMENU);
        parent = parent.getElementsByTagName(ELEMENT_UL)[0];
        li = document.createElement(ELEMENT_LI);
        li.id = id;
        parent.insertBefore(li, document.getElementById(ID_MMINDEX));
    }
    li.innerHTML = contents;
} 

/**
 * Profile page.
 */
function profilePage() {
    addHideControl(ID_PROFILEACTIONS);
    /*
    var profmsn = document.getElementById(ID_PROFMSN);
    if (profmsn !== null) {
        var span = profmsn.getElementsByTagName(ELEMENT_SPAN)[0];
        var a = document.createElement(ELEMENT_A);
        a.href = "msnim:chat?contact=" + span.firstChild.data;
        var text = span.removeChild(span.firstChild);
        a.appendChild(text);
        span.appendChild(a);
    }
    */
}

/**
 * Channel page.
 */
function channelPage() {
    addHideControl(ID_CHANNELACTIONS);
}

// -- Settings -----------------------------------------------------------------

/**
 * Setting page.
 */
function settingsPage() {
    var settings = [VisitorListWidget, CommentFieldSetting, ActionsWidgetSetting, PrettyLinksSetting];
    var es = document.getElementById(ID_SETTINGS).getElementsByTagName(ELEMENT_FORM);
    if (es.length > 0) {
        var formElement = es[0];
        var ps = formElement.getElementsByTagName(ELEMENT_P);
        if (es.length > 0) {
            var but = ps[ps.length - 1];
            var settingsTitle = document.createElement("h4");
            settingsTitle.appendChild(document.createTextNode("Parempi IRC-Galleria"));
            but.parentNode.insertBefore(settingsTitle, but);
            var references = [];
            for (var i = 0; i < settings.length; i++) {
                references[references.length] = addSetting(settings[i].parameterName, settings[i].title, settings[i].description, but);
            }
            formElement.addEventListener("submit", function (event) {
                for (var j = 0; j < settings.length; j++) {
                    settings[j].readSetting.call(this, references[j]);
                }
                return true;
            }, false);
        }
    }
}

var CommentFieldSetting = {
    parameterName: PARAM_EDITOR,
    title: "Suuri kommenttikentt\u00e4",
    description: "Suurentaa kommenttikent\u00e4n niin että koko kirjoitettava kommenttiteksti on n\u00e4kyviss\u00e4.",
    readSetting: function (input) {
        GM_setValue(PARAM_EDITOR, input.checked);
    }
};
var ActionsWidgetSetting = {
    parameterName: PARAM_ACTIONS,
    title: "Pienenn\u00e4 Toiminnot-laatikko",
    description: "Piilota Toiminnot-laatikon sis\u00e4lt\u00f6, voit n\u00e4ytt\u00e4\u00e4 sis\u00e4ll\u00f6n painamalla plus-nappulaa.",
    readSetting: function (input) {
        GM_setValue(PARAM_ACTIONS, input.checked);
    }
};
var PrettyLinksSetting = {
    parameterName: PARAM_PRETTYLINKS,
    title: "Siisti linkkiteksti",
    description: "Muuta linkkiteksti esim. \"http://en.wikipedia.org/wiki/Social_network_service\" muotoon \"Social network service\".",
    readSetting: function (input) {
        GM_setValue(PARAM_PRETTYLINKS, input.checked);
    }
};

/**
 * Add setting to settings page.
 */ 
function addSetting(name, title, description, ref) {
    var setting = document.createElement(ELEMENT_P);
    setting.className = CLASS_SETTING;
    var label = document.createElement(ELEMENT_LABEL);
    setting.appendChild(label);
    var input = document.createElement(ELEMENT_INPUT);
    input.className = CLASS_TEXT;
    var value = GM_getValue(name);
    switch (typeof value) {
    case "number":
        input.type = "text";
        input.value = String(value);
        input.size = 2;
        break;
    case "boolean":
        input.type = "checkbox";
        input.checked = value;
        break;
    }
    label.appendChild(input);
    var titleText = document.createTextNode(" " + title);
    label.appendChild(titleText);
    ref.parentNode.insertBefore(setting, ref);
    var content = document.createElement(ELEMENT_P);
    var descriptionText = document.createTextNode(description);
    content.appendChild(descriptionText);
    ref.parentNode.insertBefore(content, ref);
    return input;
}

// Actions methods -------------------------------------------------------------

function addHideControl(id) {
    if (!GM_getValue(PARAM_ACTIONS)) {
        return;
    }
    var box = document.getElementById(id);
    if (box) {
        var divs = box.getElementsByTagName(ELEMENT_DIV);
        var head = divs[1];
        var content = divs[2];
        var control = document.createElement("a");
        control.className = CLASS_HELPLINK + " plus";
        control.style.background = "url(" + IMG_PLUS + ")";
        control.addEventListener("click", function (event) {
            switchControl(event, content);
            return false;
        }, false);
        head.appendChild(control);
        content.style.display = "none";
    }
}

function switchControl(event, content) {
    var control = event.target;
    if (control.className === CLASS_HELPLINK + " plus") {
        control.style.backgroundImage = "url(" + IMG_MINUS + ")";
        content.style.display = "block";
        control.className = CLASS_HELPLINK + " minus";
    } else {
        control.style.backgroundImage = "url(" + IMG_PLUS + ")";
        content.style.display = "none";
        control.className = CLASS_HELPLINK + " plus";
    }
}

// Main ------------------------------------------------------------------------

function init() {
    if (GM_getValue(PARAM_COUNT) === undefined) {
        GM_setValue(PARAM_COUNT, 5);
    }
    if (GM_getValue(PARAM_INTERVAL) === undefined) {
        GM_setValue(PARAM_INTERVAL, 120);
    }
    if (GM_getValue(PARAM_EDITOR) === undefined) {
        GM_setValue(PARAM_EDITOR, true);
    }
    if (GM_getValue(PARAM_ACTIONS) === undefined) {
        GM_setValue(PARAM_ACTIONS, true);
    }
    if (GM_getValue(PARAM_DEBUG) === undefined) {
        GM_setValue(PARAM_DEBUG, false);
    }
    if (GM_getValue(PARAM_PRETTYLINKS) === undefined) {
        GM_setValue(PARAM_PRETTYLINKS, true);
    }    
    debug = GM_getValue(PARAM_DEBUG);
}

function run() {
    allPages();
    var loc = String(window.location);
    if (loc === BASE || loc === BASE + "index.php") {
        frontPage();
    } else if (starsWith(loc, BASE + "view.php")) {
        profilePage();
    } else if (starsWith(loc, BASE + "channel.php")) {
        channelPage();
    } else if (loc === BASE + "settings.php?page=misc" ||
            (loc === BASE + "settings.php" &&
                document.getElementById(ID_CMSETTINGMISC).className === CLASS_SELECTED)) {
        settingsPage();
    }
    commentablePages();
    if (GM_getValue(PARAM_PRETTYLINKS)) {
      changeLinks();
    }
}

// -- Process ----------------------------------------------------------------

(function () {
    init();
    run();
})();