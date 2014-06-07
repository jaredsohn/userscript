// ==UserScript==
// @name          Google Noise Reduction
// @namespace     http://exoego.net/
// @description   Domainname-based filtering for Google's search results.
// @include       http://www.google.tld/search*
// @include       http://www.google.tld/webhp*
// @include       http://www.google.tld/#hl*
// @include       http://www.google.tld/
// @include       http://www.bing.com/search*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// @version       0.2.9
// ==/UserScript==

(function(w, $){ // window, jQuery

/*    Setting
=============================================================================*/
var FilterDefault = [
    // "swik.net",
    // "pastebin.ca",
    // "search.yahoo.com",
]//

var SITEINFO = [
    {
        url:         "http://www\.google\.(?:[^.]+|[^.]{2,3}\.[^.]{2,3})/(?:search|#hl|webhp)*",
        linkNode:    "li h3 a.l", //"#res li.g h3 a.l",
        depthOfMeta: "2"
    }
    ,{
        url:         "http://www\.bing\.com/search*",
        linkNode:    "li h3 a",
        depthOfMeta: "2"
    }
]

/*===========================================================================*/

function launchGNR(list){//
    if (!(SITEINFO instanceof Array)) return; // initialized
    filterInit();
    if (SITEINFO instanceof Array){
        var count = 0;
        var tid = setInterval(function(){
            filterInit();
            if (SITEINFO instanceof Array) {
                if (count++ > 20) {
                    clearInterval(tid);
                }
            } else {
                clearInterval(tid);
                success();
            }
        }, 500);

        w.addEventListener("hashchange",function(){
            setTimeout(function(){
                if (SITEINFO instanceof Array) return;
                clearInterval(tid);
                $(SITEINFO.linkNode).each(function(index, node){
                    Filter.check(node); // google
                });
            }, 500);
        },false);
    } else {
        success()
    }

    function success(){
        GM_addStyle(style);

        Filter.init();
        Dialog.init();

        $(SITEINFO.linkNode).each(function(index, node){
            Filter.check(node);
        });

        if(window.AutoPagerize.addFilter)
            window.AutoPagerize.addFilter(function(page) {
                var autopagerize_linkNode = SITEINFO.linkNode.replace(/^\S+/,"");
                $(autopagerize_linkNode, page).each(function(index, node){
                       Filter.check(node);
                });
            });
    }
    function filterInit() {
        for (var i=0, len=list.length; i < len; ++i) {
            var reg = list[i].url.replace(".","\.").replace("*", "(?:.*)");
            if (location.href.match(reg) == null) {
                log("no match: " + reg);
            }
            else if ($(list[i].linkNode).length === 0) {
                warn("link not found: " + reg);
            }
            else {
                log("filter found:" + reg);
                SITEINFO = list[i];
                SITEINFO.depthOfLink = depthOfRepeatingUnit($(SITEINFO.linkNode));
                break;
            }
        }
    }
}

/*===========================================================================*/

var Dialog = {
    init: function(){
        var self = this;
        this.header = $('<h1>' + Lexicon["Click to remove filter"] + '</h1>');
        this.list   = $('<ul/>');
        this.buttonCancel  = $('<input/>')
            .attr({ type:"button", id:"GNR_cancel", value:Lexicon.closeDialog })
            .click(function(){ self.close(); });
        this.buttonSave = $('<input/>')
            .attr({ type:"button", id:"GNR_save", value:Lexicon.saveEdit })
            .click(function(){ self.saveEdit(); })
        this.title   = $('<input/>')
            .attr({type:"button", id:"GNR_title", value:Lexicon["View All Filters"] })
            .click(function(){ self.openInEditMode(); });
        this.footer  = $('<p/>')
            .append(this.title, this.buttonSave, this.buttonCancel);
        this.wrapper = $('<div/>').attr({id:'GNR_dialog'})
            .append(this.header, this.list, this.footer)
            .appendTo("body")
            .hover(function(){ // in
                w.clearTimeout(self.timer);
            },function(){ // out
                self.timer = w.setTimeout(function(){ self.close() },
                    /*self.isEditMode ? 5000 :*/ 5000)
            });
        $('<a id="GNR_open_editor" href="#"/>').text("Noise Reduction")
            .appendTo("body").click(function(){ self.openInEditMode() });
        GM_registerMenuCommand(Lexicon.commandName, function(){
            Dialog.openInEditMode();
        });
    },
    timer: 0,
    isEditMode: false,
    open: function(buttonLink){
        if (this.isEditMode) {
            this.quitEditMode();
        }
        var pos = $(buttonLink).position();
        this.wrapper.css({
            left: pos.left  + "px",
            top:  (pos.top+ this.wrapper.height()  )  + "px"
        }).show();
    },
    close: function(){
        if (this.isEditMode) this.quitEditMode();
        w.clearTimeout(this.time);
        this.wrapper.fadeOut("fast");
    },
    update: function(elmAddButton, domains) {
        var keys = domains.map(function(key){
            var li = $("<li />")
                    .attr({data:key}).html(key)
                    .click(function(){
                        Filter.add( this.getAttribute("data") );
                        Filter.save();
                        $(getLinkBlock(elmAddButton, SITEINFO.depthOfMeta)).remove();
                    Dialog.close();
                })[0];
            return li;
        });
        this.list.empty().append(keys)
    },
    saveEdit: function(){
        this.list.find("li.remove").each(function(index, elm){
            Filter.remove(elm.innerHTML)
        })
        Filter.save();
        this.close();
    },
    quitEditMode: function(){
        this.isEditMode = false;
        this.list.unbind("click");
        this.wrapper.fadeOut(function(){ Dialog.wrapper.removeClass("editMode") });
    },
    openInEditMode: function(){
        this.wrapper.hide();
        this.isEditMode = true;
        var tmp = [];
        for(var key in Filter.data) if (Filter.data.hasOwnProperty(key)) {
            tmp.push(key)
        }
        tmp = tmp.sort().map(function(item){ return "<li>"+item+"</li>"; }).join("");
        this.list.html(tmp).click(function(e){
            var item = e.originalTarget || null;
            if (!item || item.nodeName !== "LI") return;
            $(item).toggleClass("remove");
        })
        this.wrapper.css({top:"24px"}).addClass("editMode").show();
    }
}

/*===========================================================================*/
var Filter = {
    data:{},
    add: function(item){
        this.data[item] = true;
        this.save();
    },
    remove: function(item){
        if (this.data[item]) delete this.data[item];
    },
    save: function(){
        GM_setValue("blackList", this.data.toSource());
    },
    init: function(){
        var self = this;
        this.data = eval(GM_getValue("blackList")) || {};
        if (FilterDefault instanceof Array) {
            FilterDefault.forEach(function(item){
                if(typeof item === "string")
                    self.add(item)
            })
        }
    },
    check: function(link){
        var domains = listupDomain(link);
        if (domains.length === 0) return;
        var self = this;
        var linkBlock = getLinkBlock(link, SITEINFO.depthOfLink);
        if (domains.some(function(key){ return self.data[key]; })) {
            $(linkBlock).remove();
            return;
        }

        var addToGNR = $("<a />").attr({
            "class": "GNR_filter_this_site",
            href:"javascript:"
        }).append(Lexicon.addToGNR).click(function(){
            Dialog.update(this, domains);
            Dialog.open(this);
            return false;
        });
        $(link).after(addToGNR);
     }
}

function getLinkBlock(node, num){
    for (var i=0, num=+num; i<num; ++i) node = node.parentNode;
    return node;
}

/*===========================================================================*/
var ccSLD = /^(?:net?|com?|gov?|org?|ac|edu?|gr)$/;

function listupDomain(link) {
    if (link && link.tagName === "A") {
        var host = link.hostname;
        var path = link.pathname.split("/")[1];
        var subs = host.split(".");
        subs.pop(); // remove TLD (com, jp, net, ...)
        if (ccSLD.test(subs[subs.length-1])) subs.pop(); // remove ccSLD( co, ne, ac, ...)

        for (var i=0, urls=[host], limit=subs.length - 1; i<limit; ++i)
            urls.push( urls[i].replace(subs[i]+".", "") );

        if (path) urls.unshift(host+"/"+path);
        return urls;
    } else {
        warn("can't list up domains". link);
        return [];
    }
}

var style = <><![CDATA[
#GNR_dialog {
color             : #fff;
background        : url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEUAAACnej3aAAAAAXRSTlPM0jRW/QAAAAxJREFUeJxjYBjcAAAAoAABsAZiGAAAAABJRU5ErkJggg==");
position          : absolute;
top               : 50px;
display           : none;
left              : 25%;
-moz-border-radius: 4px;
z-index           : 99999995;
padding           : 5px 10px 10px 10px;
}
#GNR_dialog.editMode{
top  : 50px;
left : 10px !important;
right: 10px !important;
}
#GNR_dialog h1 {
display      : none;
font-size    : 16px;
border-bottom: 1px solid #666;
}
#GNR_dialog.editMode h1 {
display: block;
}
#GNR_dialog ul {
padding: 0 10px 0 0;
margin : 0;
}
#GNR_dialog.editMode ul {
-moz-column-gap  : 10px;
-moz-column-width: 14em;
}
#GNR_dialog li {
font-size : 16px;
padding   : 0;
margin    : 3px 0;
cursor    : pointer;
list-style: none;
overflow  : hidden;
}
#GNR_dialog.editMode li {
font-size:14px;
}
#GNR_dialog li.remove {
color:#666;
}
#GNR_dialog li:hover {
color          : #ff0;
text-decoration: underline;
overflow       : visible;
}
#GNR_dialog li.remove:hover {
color: #aa0;
}
#GNR_dialog p {
text-align: right;
margin    : 5px 0 0;
}
#GNR_dialog input[type="button"] {
background : transparent;
font-size  : 15px;
border     : 1px solid #ccc;
-moz-border-radius:4px;
color      : #fff;
padding    : 1px 10px;
cursor     : pointer;
margin-left: 10px;
}
#GNR_dialog input[type="button"]:hover {
background: #555;
border    : 1px solid #fff;
}
#GNR_dialog.editMode #GNR_save {display: inline;}
#GNR_dialog.editMode #GNR_title,
#GNR_save {display: none;}


#GNR_open_editor,
.GNR_filter_this_site {
display           : inline-block;
margin            : 0 0 0 5px;
padding           : 4px 6px;
line-height:1em;
text-decoration   : none;
font-size         : 12px;
border            : 1px solid;
-moz-border-radius: 3px;
background        : #fff;
}
#GNR_open_editor {
position: absolute;
top  : 34px;
right   : 16px;
padding : 3px 6px;
margin  : 0;
z-index:9999;}
#GNR_open_editor:link,
#GNR_open_editor:visited,
.GNR_filter_this_site:link,
.GNR_filter_this_site:visited {
color: #adc3ec;
}

#GNR_open_editor:hover,
#GNR_open_editor:active,
.GNR_filter_this_site:hover,
.GNR_filter_this_site:active {
color: #5c87da !important;
text-decoration   : none;
}
]]></>;

var Lexicon = (function(locale){
    var lang = navigator.language.slice(0,2);
    return locale[lang] || locale["en"];
})({
    ja: {
        addToGNR:    "フィルタ",
        closeDialog: "閉じる",
        commandName: "フィルターを閲覧/編集",
        saveEdit:    "保存",
        "View All Filters": "フィルターを見る",
        "Click to remove filter": "削除したい項目をクリックしてください。"
    },
    en: {
        addToGNR:    "filter",
        closeDialog: "close",
        commandName: "View/Edit filters",
        saveEdit:    "save",
        "View All Filters": "View All Filter",
        "Click to remove filter": "Click an item to remove from filter.",
    }
});

/*    Utility
=============================================================================*/
function log(){ if (w.console) w.console.log.apply(null, arguments) }
function warn(){ if (w.console) w.console.warn.apply(null, arguments) }
function info(){ if (w.console) w.console.info.apply(null, arguments) }

function depthOfRepeatingUnit (anchors) { // @param Nodes
    anchors = Array.prototype.slice.call(anchors);
    var first = anchors[0];
    var rest = anchors.filter(function(e){ return e !== first });
    var nodeName = first.nodeName.toLowerCase();
    var parent = first;
    var nestLevel = 0;
    while (parent = parent.parentNode) {
        ++nestLevel;
        var parentSibling = parent.nextSibling;
        if (parentSibling && parentSibling.nodeType === 1) { // Node.ELEMENT_NODE
            var psAnchors = parentSibling.getElementsByTagName(nodeName);
            for (var i=0; i<psAnchors.length; ++i)
                if (rest[0] == psAnchors[i]) return nestLevel;
        }
    }
    return -1;
}
/*    Main
=============================================================================*/
$(document).ready(function(){
    launchGNR(SITEINFO);
});
return;

})(this.unsafeWindow, this.jQuery)