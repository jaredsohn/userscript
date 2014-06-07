// ==UserScript==
// @name           Bungie.net Tweaks [Mk.II]
// @namespace      DavidJCobb
// @description    Various tweaks for Bungie.net. V1.0.36.
// @include        http://*.bungie.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

// v1.0.36
// updates to be released:
//    1.0.36  Workaround for Coup 5 functionality that destroys 
//            certain DOM alterations.
//
// TODO:
//  - HideUser: Automate the process of attaching a Checkbutton 
//    Dialog Widget to a group of checkboxes; syncing its state 
//    to their states (checked if all checked, unchecked if any 
//    unchecked); (un)check all functionality; etc..
//  - Checkbutton Dialog Widget: Make it so that the location of 
//    its popup menu is scripted, such that it never overflows outside 
//    of the closest block formatting context.

// <JQUERYFIXES>
// Sauce: http://jsfiddle.net/JFsht/1/
(function($){
    // include this fix to make jQuery work in Firefox 4 + Greasemonkey or Scriptish
    // mozMatchesSelector fix by Kambfhase
    if(!$('<div>').is('div')&&$('<div>')[0].mozMatchesSelector)
        $.find.matchesSelector=function(node,expr){
            try{return node.mozMatchesSelector(expr)}catch(e){}
            return $.find(expr,null,null,[node]).length>0
        }
})(jQuery);
// </JQUERYFIXES>

// <JQUERY>
jQuery.expr[":"]["no-children"] = function(n){return !n.children.length}; // :empty includes text nodes, this doesn't.
jQuery.fn.able = function(v,n){return this[["removeA","a"][+!!v]+"ttr"]((n||"disabled"),(v===void 0?void 0:n||"disabled"))}; // 1 = sets attr, 2 = unsets
// </JQUERY>

function padNumber(n,l){n=""+n;while(n.length<l)n="0"+n;return n};
function URL(s){var A=document.createElement("a");A.href=s;return({hash:A.hash,hostname:A.hostname,href:A.href,pathname:A.pathname,port:A.port,protocol:A.protocol,search:A.search})}

function $_GET(vName,url){var i=0,s=(url||location).search.replace(/^\?|(&)&+/g,"$1").split("&"),sl=s.length;for(;i<sl;i++){s[i]=s[i].split("=");if(s[i][0]==vName)return s[i][1]}}
function $_GETHASH(vName,url){var u,s=unsafeWindow.document.documentURI;s=decodeURIComponent(s.substr(s.indexOf("#")+1));if(url&&url.hash!=u)s=decodeURIComponent(url.hash.substring(1));var i=0,s=s.replace(/(&)&+/g,"$1").split("&"),sl=s.length;for(;i<sl;i++){s[i]=s[i].split("=");if(s[i][0]==vName)return s[i][1]}}

function GM_unwrap(x){if(!x)return x;if(!x.jquery)return x.wrappedJSObject||x;var a=$.makeArray(x),i=0,al=a.length;for(;i<al;i++)a[i]=GM_unwrap(a[i]);return $(a)}
function GM_runUnsafe(f){location.href="javascript:void(("+encodeURIComponent(f)+")());"}

// <SYNC-VALUES>
Sync =
   {
      cache: {},
      altered: function(name){if(this.cache[name]===void 0||this.cache[name]!=GM_getValue(name))return !!1;return !!0},
      load: function(name,default_value){return this.cache[name]=GM_getValue(name,default_value)},
      getFromCache: function(name,default_value){return this.cache[name]!==void 0?this.cache[name]:default_value},
      save: function(name, value, overwrite_if_desync){if(this.altered(name)&&!overwrite_if_desync)return !!0;GM_setValue(name,this.cache[name]=value);return !!1}
   };
// </SYNC-VALUES>

// <MODALS>
function BNetDialog(d){var u,d=d||{},EC,E,ED,L,LD,i,a;this.id=BNetDialog.list.push(this)-1;this.modal=d.modal||d.blocking||!1;this.dynamic_size=d.dynamic_size||d.dynamic||!1;if(E=d.events){ED=d.event_data||{};for(i in E){L=E[i]||[];LD=ED[i]||[];if(L.call)L=[L];for(a=0;a<L.length;a++)$(this).bind(i,(LD[a]||{}),L[a])}}this._createNode(d)}
BNetDialog.prototype =
   {
      _createNode:
         function(d){
            var d=d||{},instance=this;
            this.node=$("<iframe class='"+BNetDialog.DIALOG_CLASS+"' data-dialog-id='"+this.id+"'></iframe>");
            if(this.modal)
               this.node.addClass("modal");
            this.node[0].addEventListener("load",function(){instance._isReady(d)},!!1);
            document.body.appendChild(this.node[0])
         },
      _isReady:
         function(d) {
            var CD=this.node[0].contentDocument,CDB=$(CD.body);

            if(this.dynamic_size)
               CDB.addClass("dynamic");

            CDB.html("<i></i><i></i><i></i><i></i><div></div>");
            $("<style></style>").appendTo(CDB).html("\
html{overflow:hidden} /* because Greasemonkey screws up body.offsetWidth in IFRAMEs otherwise */\n\
body{position:relative;width:638px;padding:0;margin:0;border:1px solid #404040;background:rgba(0,0,0,.85);color:#BBB;font:12px/15px Arial,Helvetica,sans-serif}\n\
   body>i{position:absolute;display:block;width:62px;height:59px;background-image:url(http://www.bungie.net/images/reachStats/sprite_glowCorners_62_59.png)}\n\
   body>i:first-child{left:-1px;top:-1px;background-position:left top}\n\
   body>i:first-child+i{right:-1px;top:-1px;background-position:right top}\n\
   body>i:first-child+i+i{left:-1px;bottom:-1px;background-position:left bottom}\n\
   body>i:first-child+i+i+i{right:-1px;bottom:-1px;background-position:right bottom}\n\
   body>div{position:relative;max-width:700px;max-height:500px;height:214px;padding:1em 19px;overflow:auto} /* 1em should be 12px here */\n\
   body.dynamic>div{height:auto}\n\
      body>div>h1{margin:0 0 10px 0;color:#FFF;font-size:2em;line-height:1.25em}\n\
      ul.form-list{list-style:none;padding:0;margin:0}\n\
      ul.form-list>li{border-top:1px solid rgba(0,0,0,.2)}\n\
      ul.form-list>li:first-child{border-top:0}\n\
         ul.form-list>li>label.major-field{display:inline-block;margin-bottom:.25em;font-size:1.1em;font-weight:bold}\n\
         ul.form-list>li>input[type=checkbox]{vertical-align:middle}\n\
         ul.form-list>li>input[type=checkbox]+label{vertical-align:middle}\n\
         ul.form-list>li>input[type=text]{vertical-align:middle}\n\
         ul.form-list>li>input[type=text].whole-line{display:block;width:100%}\n\
         ul.form-list>li>ul.form-list{margin-left:2em}\n\
      ul.form-list.major-fields+ul.form-list.minor-fields{margin-top:.5em;border-top:1px solid #404040;padding-top:.5em}\n\
      ul.form-list.separated{margin:.5em 0;border:0 solid #404040;border-width:1px 0;padding:.5em 0}\n\
      ul.form-buttons{list-style:none;padding:0;margin:5px 0;text-align:center}\n\
         ul.form-buttons>li{display:inline;padding:0 5px}\n\
      body>div>ul.form-buttons:last-child{margin:1em 0 0 0}");

            this._bodyNode=CDB;
            this.contentNode=CDB.find("div");
            if(d.title)this.contentNode.append("<h1>"+d.title+"</h1>");
            var H=d.height||240,W=d.width||640;
            this.node.attr("data-loaded","true").css("height", d.height+"px").css("width", d.width+"px");
            $(this).trigger("ModalInitialized")
         },
      show:
         function() {
            if(this.modal&&$("."+BNetDialog.DIALOG_CLASS+".modal.show").length)
               return;
            if(this.node.hasClass("show"))
               return;
            var E=jQuery.Event("ModalShow");
            $(this).trigger(E);
            if(E.isDefaultPrevented())
               return;
            this.node.add(BNetDialog.fade).addClass("show");
            $(this).trigger("AfterModalShow")[0].reposition()
         },
      hide:
         function() {
            if(!this.node.hasClass("show"))
               return;
            var E=jQuery.Event("ModalHide")
            $(this).trigger(E);
            if(E.isDefaultPrevented())
               return;
            this.node.removeClass("show");
            if(!$("."+BNetDialog.DIALOG_CLASS+".show").length)
               BNetDialog.fade.removeClass("show");
            $(this).trigger("AfterModalHide")
         },
      kill:
         function() {
            if(!this.node)
               return;
            $(this).triggerHandler("ModalKill");
            this.node.remove();
            delete this.node;
            BNetDialog.list[this.id]=null;
            if(!$("."+BNetDialog.DIALOG_CLASS+".show").length)
               BNetDialog.fade.removeClass("show")
         },
      reposition:
         function() {
            var N=this.node,B=this._bodyNode,C=this.contentNode,P;
            if(!N.hasClass("show"))
               return;
            if(B.hasClass("dynamic")){
               B.css("width","auto").css("height","auto");
               N.css("width",B.outerWidth()+"px").css("height",B.outerHeight()+"px").css("margin-top", N.height()/-2+"px").css("margin-left", N.width()/-2+"px");
               return
            }
            P=function(n){return [n.outerWidth()-n.width(),n.outerHeight()-n.height()]};
            N.css("margin-top",N.height()/-2+"px").css("margin-left",N.width()/-2+"px");
            B.css("width",N.width()-P(B)[0]+"px").css("height",N.height()-P(B)[1]);
            C.css("width",B.width()-P(C)[0]+"px").css("height",B.height()-P(C)[1]+"px")
         }
   };
$.extend(BNetDialog,
   {
      DIALOG_CLASS: "DJCBNetTweaksDialog",
      list: {length:0,push:Array.prototype.push},
      fade: $("<div id='DJCBNetTweaksDialogFade'></div>").appendTo(document.body),
      getDialog: function(n){if(n.jquery)n=n[0];if(n.tagName.toLowerCase()!="iframe")n=n.ownerDocument.defaultView.frameElement;return this.list[Number($(n).attr("data-dialog-id"))]}
   }
);
// v-- block focus on the page if a modal dialog is open
$("body>div:not(#DJCBNetTweaksDialogFade)").bind("click dblclick focus keydown keypress keyup",function(e){var MN=$("iframe.DJCBNetTweaksDialog.modal.show");if(!MN.length)return !0;var CD=GM_unwrap(MN[0].contentDocument),B=CD.body,I=$(B).find("*[tabindex],input:not(:hidden)").eq(0);if(I.length){e.preventDefault();e.stopPropagation();I.focus();return !1;}return !0});
GM_addStyle("\
iframe.DJCBNetTweaksDialog{position:fixed;z-index:18002;left:50%;top:50%;width:0;height:0;padding:0;margin:0;border:0}\n\
iframe.DJCBNetTweaksDialog[data-loaded]{display:none}\n\
iframe.DJCBNetTweaksDialog.show{display:-moz-initial;width:640px;height:240px;margin:-100px -320px}\n\
#DJCBNetTweaksDialogFade{position:fixed;z-index:18001;display:none;left:0;top:0;width:100%;height:100%;padding:0;margin:0;border:0;background:rgba(0,0,0,.4)}\n\
#DJCBNetTweaksDialogFade.show{display:block}");
// </MODALS>

// <WIDGETS_V2>
// <make> returns a wrapper object for the widget. 
// All widgets should have a <afterAppend> method, 
// which should be called immediately after the 
// element is added to the DOM. Widgets don't have 
// to DO anything in that method, but you should 
// call it so that those that need it, have it.
BNetWidget =
   {
      types: {},
      addType: function(name,func,css){this.types[name]=func;func._css=css;func._list=[]},
      make:
         function(dialog,wType,data) {
            var N,B=dialog._bodyNode,data=data||{};
            if(!dialog.node[0].contentDocument.getElementById("widget-style-"+wType.toLowerCase()))
               $("<style></style>").attr("id","widget-style-"+wType.toLowerCase()).appendTo(B).html(this.types[wType]._css);
            data.dialog = dialog;
            N=new this.types[wType](data);
            N.id=this.types[wType]._list.push(N);
            $(N).trigger("OnAfterCreate");
            return N;
         },
      get:
         function(a, b) { // id , type ; OR: node inside of widget , undefined
            if(a.nodeName||a.jquery){
               var wNode=$(a).closest("div.DJCBNetWidget");
               return this.types[wNode.attr("data-widget-type")]._list[wNode.attr("data-widget-id")]
            }
            if((!a&&a!==0)||!b)
               return null;
            return this.types[b]._list[a]
         }
   };
BNetWidget.types.checkbutton =
   (function(){
      var x =
         function(d) {
            var d=d||{},i,UL;
            d.dialog=d.dialog||{};

            this.node=$('<div class="DJCBNetWidget checkbutton"><input type="button" class="back" value="&nbsp;"><div class="menubutton"><div class="backholder"><input type="button" class="back"></div><a href="#">&#9660;</a></div><input type="checkbox" class="check"><ul></ul></div>');
            this.node[0].id=d.id||"";
            this.node.attr("data-widget-type","checkbutton").find("a").click(this._menuClicked);

            $(document.body).add(d.dialog._bodyNode||"").click({checkbutton:this},this._hideMenuClick);

            if(d.items&&d.items.length)
               this.addMenuItems(d.items);
            else
               this.removeMenuItems([]);

            this.node.children("input.check").click(function(e){return $(BNetWidget.get(this)).trigger(e)});

            $(this).one("OnAfterCreate",this._onAfterCreate);

            delete d;
            delete i;
            delete UL
         };
      x.prototype =
         {
            addMenuItems:
               function(items){ // items == [item, item, ...] where item = [innerHTML, click_handler]
                  var i=0,UL=GM_unwrap(this.node.find("ul"));
                  for(;i<items.length;i++)
                     $("<li></li>").html(items[i][0]).click(items[i][1]).click({checkbutton:this},this._hideMenuAction).appendTo(UL)
                  if(i)
                     this.node.find("div.menubutton").find("input.back").andSelf().removeAttr("disabled");
               },
            removeMenuItems:
               function(items){ // items == [item, item, ...] where item = int_index
                  var i=0,UL=GM_unwrap(this.node.find("ul")),LI=UL.children("li");
                  for(;i<items.length;i++)
                     LI.eq(items[i]).remove();
                  if(!UL.children("li").length)
                     this.node.find("div.menubutton").find("input.back").andSelf().attr("disabled","disabled");
               },
            afterAppend: function(){var N=this.node,B=N.children("input.back"),H=B.height(),OH=B.outerHeight();N.css("height",OH+"px").css("line-height",OH+"px")},
            setState: function(v){this.node.children("input.check").able(v,"checked")},
            _onAfterCreate: function(){this.node.attr("data-widget-id",this.id)},
            _menuClicked:
               function(e) {
                  var N=GM_unwrap($(this).closest("div.DJCBNetWidget"));
                  if(N.children("div.menubutton").attr("disabled")||N.attr("disabled"))
                     return e.preventDefault()&&false;
                  N.children("ul").addClass("show");
                  return e.preventDefault()&&false;
               },
            _hideMenuClick:
               function(e) {
                  var N=GM_unwrap(e.data.checkbutton.node),target=GM_unwrap(e.target);
                  if(N.children("ul").has(target).length)
                     return true;
                  if(N.children("div.menubutton").has(target).length)
                     return e.preventDefault()&&false;
                  N.children("ul").removeClass("show");
                  return true;
               },
            _hideMenuAction: function(e){GM_unwrap(e.data.checkbutton.node).children("ul").removeClass("show")}
         };
      x._list = [];
      x._css = "\
div.checkbutton{position:relative;display:inline-block;padding-right:1em;text-align:left;padding-left:3px}\n\
   div.checkbutton>input.back{position:absolute;z-index:-1;left:0;right:0;width:100%}\n\
   div.checkbutton>div.menubutton{position:absolute;right:0;top:0;bottom:0;padding:0;width:1.4em;height:100%;font-size:.7em}\n\
      div.checkbutton>div.menubutton>div.backholder{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;overflow:hidden}\n\
         div.checkbutton>div.menubutton>div.backholder>.back{position:absolute;top:0;bottom:0;left:0;right:0;width:100%;padding-right:0;padding-left:0}\n\
      div.checkbutton>div.menubutton>a{position:absolute;left:0;right:0;top:0;bottom:0;text-align:center;color:#000!important;text-decoration:none}\n\
   div.checkbutton ul{display:none;position:absolute;right:0;bottom:100%;list-style:none;width:6em;padding:0;margin:0;border:1px solid #777;background:#222;line-height:1.5em}\n\
   div.checkbutton ul.show{display:block!important}\n\
      div.checkbutton li{padding:0 .25em;border-bottom:1px solid #555;cursor:pointer}\n\
      div.checkbutton li:hover{background:#333}\n\
      div.checkbutton li:last-child{border-bottom:1px solid #777}\n\
\n\
div.checkbutton input.check{height:100%;margin-top:0;margin-bottom:0}";
      return x
   })();
// </WIDGETS_V2>

MSAJAXResponseIntercept =
   {
      listeners: [],
      decode: function(d){var u,cS=0,cE,cCL,type,id,content,delimiter="|",items=[];while(cS<d.length){cE=d.indexOf(delimiter,cS);if(cE===-1)break;cCL=parseInt(d.substring(cS,cE),10);if(cCL%1!==0)break;cS=cE+1;cE=d.indexOf(delimiter,cS);if(cE===-1)break;type=d.substring(cS,cE);cS=cE+1;cE=d.indexOf(delimiter,cS);if(cE===-1)break;id=d.substring(cS,cE);cS=cE+1;if(cS+cCL>=d.length)break;content=d.substr(cS,cCL);cS+=cCL;if(d.charAt(cS)!==delimiter)break;cS++;items.push({type:type,id:id,content:content})}return items},
      encode: function(d){var s="",i=0,IL=d.length,ci;for(;i<IL;i++){ci=d[i];s+=[ci.content.length,ci.type,ci.id,ci.content].join("|")+"|"}return s},
      process:
         function(d) {
            var d=this.decode(d),l=this.listeners,i=0,ll=l.length;
            for(;i<ll;i++)
               d=l[i][0].call(l[i][1],d)||d; // return modified data, or nothing if you changed nothing
            return this.encode(d)
         }
   };
try{
   (function(P){
      var orig=P._onFormSubmitCompleted;
      P._onFormSubmitCompleted=
         function(g,f){
            g.DJCInterceptedData=g._xmlHttpRequest.responseText;
            g.DJCInterceptedData=MSAJAXResponseIntercept.process(g.DJCInterceptedData);
            g.get_responseData=function(){return this.DJCInterceptedData};
            orig.call(this,g,f)
         }
   })(unsafeWindow.Telerik.Web.UI.RadAjaxControl.prototype)
}catch(e){}

BNet =
   {
      ENV: {},
      Prefs:
         {
            ENABLE_TOPBAR:			GM_getValue("ENABLE_TOPBAR",			true),
            ENABLE_POST_AUTOCOLLAPSE:		GM_getValue("ENABLE_POST_AUTOCOLLAPSE",		true),
            ENABLE_POST_AUTOCOLLAPSE_BLANKS:	GM_getValue("ENABLE_POST_AUTOCOLLAPSE_BLANKS",	true),
            ENABLE_POST_AUTOCOLLAPSE_LINES:	GM_getValue("ENABLE_POST_AUTOCOLLAPSE_LINES",	true),
            POST_AUTOCOLLAPSE_LINES:		GM_getValue("POST_AUTOCOLLAPSE_LINES",		125),
            ENABLE_POST_AUTOCOLLAPSE_PIXELS:	GM_getValue("ENABLE_POST_AUTOCOLLAPSE_PIXELS",	true),
            POST_AUTOCOLLAPSE_PIXELS:		GM_getValue("POST_AUTOCOLLAPSE_PIXELS",		1000),
            POST_AUTOCOLLAPSE_PIXELS_LINES:	GM_getValue("POST_AUTOCOLLAPSE_PIXELS_LINES",	50),
            ENABLE_POST_LINKS:			GM_getValue("ENABLE_POST_LINKS",		true),
            ENABLE_POST_GAMERTAG_LINKS:		GM_getValue("ENABLE_POST_GAMERTAG_LINKS",	true),
            ENABLE_POST_PERMALINKS:		GM_getValue("ENABLE_POST_PERMALINKS",		true),
            PERMALINK_BELOW_AVATAR:		GM_getValue("PERMALINK_BELOW_AVATAR",		false),
            ENABLE_QUOTE_AUTOLINK:		GM_getValue("ENABLE_QUOTE_AUTOLINK",		false),
            QUOTE_STRIP_PRECEDING_NEWLINE:	GM_getValue("QUOTE_STRIP_PRECEDING_NEWLINE",	false),
            ENABLE_BANNED_POST_PLACEHOLDER:	GM_getValue("ENABLE_BANNED_POST_PLACEHOLDER",	false),
            ENABLE_FILE_GRID_HOVER:		GM_getValue("ENABLE_FILE_GRID_HOVER",		true)
         },
      UserData: // we use this to list names but not to store values.
         {
            QuickLinks: 1,
            HiddenUsers: 1
         },
      _getLivePref:function(name){var u,v=GM_getValue(name);return(v===u)?this.Prefs[name]:v},
      getPref:function(name,live){return live?this._getLivePref(name):this.Prefs[name]}, // if live == true, we get from GM_getvalue; otherwise, we get the value used when the page was loaded
      getJSON:function(){var i,P={};for(i in BNet.Prefs)P[i]=GM_getValue(i);for(i in BNet.UserData)P[i]=GM_getValue(i);return JSON.stringify(P)}, // return JSON of all stored pref values
      setJSON:function(json){var u,i,P=JSON.parse(json);if(!P)return !1;for(i in BNet.Prefs)if(P[i]!=u)GM_setValue(i,P[i]);for(i in BNet.UserData)if(P[i]!=u)GM_setValue(i,P[i]);return !0}, // replace all stored pref values with those from a JSON string
      init:function(){}
   };

// Environment variables, for detecting various properties of the page
(function() {
   var E=BNet.ENV;

   E.SIGNED_IN			= $("#ctl00_dashboardNav_loggedInNormal").hasClass("signedIn");   
   E.USERNAME			= E.SIGNED_IN?unescape((document.cookie.match("BungieDisplayName=(.*?)(;|$)")||[0,""])[1]):"";
   E.FRIENDS_ONLINE		= E.SIGNED_IN?(+($("#ctl00_dashboardNav_loggedInNormal li.friendsOnline>a").text())||0):0;
   E.NEW_MESSAGES		= E.SIGNED_IN?+($("#ctl00_dashboardNav_loggedInNormal li.messages>a").text()):0;
   E.HAS_UNREAD_MESSAGES	= E.SIGNED_IN&&!!E.NEW_MESSAGES;

   E.VIEWING_INBOX		= !!$("#ctl00_mainContent_messagesPanel").length;
   E.VIEWING_PM			= !!$("#ctl00_mainContent_readMessagePanel").length;

   E.THREAD_ID			= -1;
   E.REPLY_TARGET_ID		= $_GET("postID");

   E.IS_GROUP_PAGE		= !!window.location.href.match(/\/fanclub\/[^\/\\]+\/group\//i);
   E.IS_GROUP_FORUM		= !!window.location.href.match(/\/fanclub\/\d+\/forums\//i);
   E.GROUP_ID			= Number(E.IS_GROUP_FORUM?window.location.href.match(/\/fanclub\/(\d+)\/forums\//i)[1]:( (($("#ctl00_groupForumsLink").attr("href")||"").match(/\/fanclub\/(\d+)\/forums/i)||[0,null])[1]||-1));
   E.GROUP_NAME			= E.IS_GROUP_PAGE?($("div.group_header>h2").text()||window.location.href.match(/\/fanclub\/([^\/\\]+)\/group\//i)[1] ):( E.IS_GROUP_FORUM?$("#ctl00_forumHeader_groupForumsLink").text():"");

   E.VIEWING_FORUM		= window.location.pathname.toLowerCase().indexOf("/forums/topics.aspx")>=0;

   E.REPLYING_TO_TOPIC		= $_GET("postID")&&($_GET("act")=="reply"||$_GET("act")=="edit");
   E.PREVIEW_OWN_REPLY		= !!$("#ctl00_mainContent_postForm_skin_previewPost").length;
   E.EDITING_OWN_REPLY		= $_GET("act")=="edit";
   E.VIEWING_TOPIC		= $_GET("postID")&&!E.REPLYING_TO_TOPIC;
   E.POSTING_NEW_TOPIC		= window.location.pathname.toLowerCase().indexOf("createpost.aspx")>0&&!E.REPLYING_TO_TOPIC;

   if(E.REPLYING_TO_TOPIC)
      E.THREAD_NAME=$("#ctl00_mainContent_postForm_skin_originalPost_skin_topicAnchor,#ctl00_mainContent_postForm_skin_previewPost_skin_topicAnchor").eq(0)[0].nextSibling.nodeValue;

})();

// Tweak options window
BNet.PrefWindow =
   {
      modal:null,modal_ready:false,
      openOptions:
         function(){
            if(!this.modal_ready)return;
            var B=$(this.modal.node[0].contentDocument.body);

            // initialize control states to reflect current values

            // checkbox where checked = true ; drop-downs stored as bools ; strings
            B.find("input:checkbox[name].bool-pref").each(function(){$(this).able(BNet.getPref($(this).attr("name")||$(this).attr("id"),true),"checked")});
            B.find("select[name].bool-pref").each(function(){this.selectedIndex=+(BNet.getPref($(this).attr("name")||$(this).attr("id"),true))});
            B.find("input:text[name].string-pref").each(function(){this.value=BNet.getPref($(this).attr("name")||$(this).attr("id"),true)});

            B.find("input:checkbox[data-sub]").each(function(){BNet.PrefWindow._processSubClick(this)});

            this.modal.show()
         },
      applyOptions:function(d){var u,i;for(i in d)if(BNet.Prefs[i]!==u)GM_setValue(i,(BNet.Prefs[i]=d[i]))},
      closeOptions:function(){this.modal.hide()},
      _processSubClick:function(cbox){var i=0,node,CD=this.modal.node[0].contentDocument,subs=$(cbox).attr("data-sub").split(","),status=cbox.checked&&!$(cbox).attr("disabled");for(;i<subs.length;i++){var node=$(CD.getElementById(subs[i])).able(!status);if(node.attr("data-sub"))arguments.callee.call(this,node[0])}},
      _populateNode:
         function(){
            var M=this.modal,CD=M.node[0].contentDocument,CDB=$(CD.body);

            M.contentNode.append("\
   <ul id='tabs'></ul>\n\
   <ul id='tab-boxes'></ul>\n\
   <ul id='form-buttons' class='form-buttons'>\n\
      <li><input type='button' value='Save Settings'></li>\n\
      <li><input type='button' value='Cancel'></li>\n\
   </ul>");

            CD.body.appendChild(document.createElement("style")).innerHTML = "\
      body>div>h1{margin:0 0 10px 0;color:#FFF}\n\
      #tabs{list-style:none;padding:0;margin:5px 0}\n\
         #tabs>li{display:inline-block;margin-right:5px;background:url('http://www.bungie.net/images/reachStatsNew/bg_glowButton_640.png') bottom left no-repeat}\n\
         #tabs>li.sel{}\n\
            #tabs>li>a{display:block;padding:.25em 1em;background:url('http://www.bungie.net/images/reachStatsNew/bg_glowButton_640.png') top right no-repeat;cursor:pointer;color:#71CAEF;font-size:1.2em}\n\
            #tabs>li.sel>a{cursor:default;color:#FFF}\n\
      #tab-boxes{list-style:none;padding:0;margin:0}\n\
         #tab-boxes>li{display:none;position:relative;height:92px;padding:20px 0;margin:5px 0;overflow-y:auto}\n\
         #tab-boxes>li.sel{display:block}\n\
            #tab-boxes>li>i{position:absolute;z-index:0;display:block;width:50%;height:20px}\n\
            #tab-boxes>li>i:first-child{left:0;top:0;background:url('http://bungie.net/images/games/reach/structure/top.png') top left no-repeat}\n\
            #tab-boxes>li>i:first-child+i{right:0;top:0;background:url('http://bungie.net/images/games/reach/structure/top.png') top right no-repeat}\n\
            #tab-boxes>li>i.bottom{left:0;bottom:0;background:url('http://bungie.net/images/games/reach/structure/bottom.png') top left no-repeat}\n\
            #tab-boxes>li>i.bottom+i{right:0;bottom:0;background:url('http://bungie.net/images/games/reach/structure/bottom.png') top right no-repeat}\n\
            #tab-boxes>li>div{position:relative;z-index:1;height:100%;padding:0 20px;border:0 solid rgba(74,74,74,.67);border-width:0 1px;background:rgba(0,0,0,.5)}";

            function addTab(label,contents){
               var TB,C=CDB.find("#tabs>li").length;
               CDB.find("#tabs").append("<li data-index='" + C + "'><a>"+label+"</a></li>");
               (TB=$("<li data-index='"+C+"'><i></i><i></i><div></div><i class='bottom'></i><i></i></li>")).find("div").append(contents);
               CDB.find("#tab-boxes").append(TB);
               CDB.find("#tabs>li:last-child>a").click(function(e){var P=GM_unwrap(this.parentNode);if($(P).hasClass("sel"))return;var B=this.ownerDocument.body,I=+($(P).attr("data-index"));$(B).find("#tabs>li.sel,#tab-boxes>li.sel").removeClass("sel");$(B).find("#tab-boxes>li").eq(I).add(P).addClass("sel")})
            }

            // <TOPBAR>
            addTab("Topbar",
"<ul class='form-list'>\n\
   <li><input type='checkbox' id='ENABLE_TOPBAR' name='ENABLE_TOPBAR' class='bool-pref'> <label for='ENABLE_TOPBAR'>Enable the topbar</label></li>\n\
</ul>\n\
<ul class='form-list separated'>\n\
   <li>\n\
      You may find these functions useful, as updating a userscript can cause Greasemonkey to lose its saved data. Changes made using these buttons take effect immediately and cannot be undone.<br>\n\
      <input type='button' value='Backup Quick Links'> <input type='button' value='Restore Quick Links'> <input type='button' value='Clear Quick Links'>\n\
   </li>\n\
</ul>");
            $(CD.body).find("input[value='Backup Quick Links']").click(function(e){prompt("This is your raw Quick Links data. Copy it and save it in a file somewhere; you can restore it from that backup later.", GM_getValue("QuickLinks"))});
            $(CD.body).find("input[value='Restore Quick Links']").click(
               function(e){
                  var V=prompt("If you backed up your raw Quick Links data somewhere, you can re-instate it by pasting it here and clicking 'OK'. Leave the textbox blank to cancel.\n\nUsing this feature WILL overwrite your Quick Links. This cannot be undone.", "");
                  if(!V||V.replace(/\s/g,"")=="")
                     return;
                  GM_setValue("QuickLinks",V)
                  alert("Quick Links data has been restored.")
               }
            );
            $(CD.body).find("input[value='Clear Quick Links']").click(
               function(e){
                  if(!confirm("Are you sure you want to completely and totally erase your Quick Links? This operation cannot be undone.\n\nClick \"OK\" to erase your Quick Links.\nClick \"Cancel\" to keep your Quick Links saved."))
                     return;
                  GM_setValue("QuickLinks","")
                  alert("Quick Links data has been deleted.")
               }
            );
            // </TOPBAR>

            // <FORUMS>
            addTab("Forums",
"<ul class='form-list'>\n\
   <li>\n\
      <input type='checkbox' id='ENABLE_POST_LINKS' name='ENABLE_POST_LINKS' class='bool-pref' data-sub='ENABLE_POST_GAMERTAG_LINKS,ENABLE_POST_PERMALINKS'> <label for='ENABLE_POST_LINKS'>Add extra links (Service Records, permalinks, etc.) to posts</label>\n\
      <ul class='form-list'>\n\
         <li><input type='checkbox' id='ENABLE_POST_GAMERTAG_LINKS' name='ENABLE_POST_GAMERTAG_LINKS' class='bool-pref'> <label for='ENABLE_POST_GAMERTAG_LINKS'>Add gamertag-related links</label></li>\n\
         <li>\n\
            <input type='checkbox' id='ENABLE_POST_PERMALINKS' name='ENABLE_POST_PERMALINKS' class='bool-pref' data-sub='PERMALINK_BELOW_AVATAR'>\n\
            Add permalinks, and \n\
            <select id='PERMALINK_BELOW_AVATAR' name='PERMALINK_BELOW_AVATAR' class='bool-pref'>\n\
               <option>show them in the title bar</option>\n\
               <option>show them beneath the avatar</option>\n\
            </select>\n\
         </li>\n\
      </ul>\n\
   </li>\n\
   <li>\n\
      <input type='checkbox' id='ENABLE_POST_AUTOCOLLAPSE' name='ENABLE_POST_AUTOCOLLAPSE' class='bool-pref' data-sub='ENABLE_POST_AUTOCOLLAPSE_LINES,ENABLE_POST_AUTOCOLLAPSE_BLANKS'> <label for='ENABLE_POST_AUTOCOLLAPSE'>Automatically collapse long posts and private messages</label>\n\
      <ul class='form-list'>\n\
         <li>\n\
            <input type='checkbox' id='ENABLE_POST_AUTOCOLLAPSE_LINES' name='ENABLE_POST_AUTOCOLLAPSE_LINES' class='bool-pref' data-sub='POST_AUTOCOLLAPSE_LINES'>\n\
            Autocollapse posts longer than \n\
            <input type='text' id='POST_AUTOCOLLAPSE_LINES' name='POST_AUTOCOLLAPSE_LINES' class='string-pref' size='5'>\n\
            lines\n\
         </li>\n\
         <li><input type='checkbox' id='ENABLE_POST_AUTOCOLLAPSE_BLANKS' name='ENABLE_POST_AUTOCOLLAPSE_BLANKS' class='bool-pref'> <label for='ENABLE_POST_AUTOCOLLAPSE_BLANKS'>Autocollapse posts with more than 20 consecutive line breaks</label></li>\n\
         <li>\n\
            <input type='checkbox' id='ENABLE_POST_AUTOCOLLAPSE_PIXELS' name='ENABLE_POST_AUTOCOLLAPSE_PIXELS' class='bool-pref'>\n\
            Autocollapse posts taller than\n\
            <input type='text' id='POST_AUTOCOLLAPSE_PIXELS' name='POST_AUTOCOLLAPSE_PIXELS' class='string-pref' size='5'>\n\
            pixels with fewer than\n\
            <input type='text' id='POST_AUTOCOLLAPSE_PIXELS_LINES' name='POST_AUTOCOLLAPSE_PIXELS_LINES' class='string-pref' size='5'>\n\
            line breaks\n\
         </li>\n\
      </ul>\n\
   </li>\n\
   <li><input type='checkbox' id='ENABLE_QUOTE_AUTOLINK' name='ENABLE_QUOTE_AUTOLINK' class='bool-pref'> <label for='ENABLE_QUOTE_AUTOLINK'>When quoting, automatically insert a link to the quoted post</label></li>\n\
   <li><input type='checkbox' id='QUOTE_STRIP_PRECEDING_NEWLINE' name='QUOTE_STRIP_PRECEDING_NEWLINE' class='bool-pref'> <label for='QUOTE_STRIP_PRECEDING_NEWLINE'>When quoting, do not add a line break above the quote</label></li>\n\
   <li><input type='checkbox' id='ENABLE_BANNED_POST_PLACEHOLDER' name='ENABLE_BANNED_POST_PLACEHOLDER' class='bool-pref'> <label for='ENABLE_BANNED_POST_PLACEHOLDER'>Show placeholders for hidden posts by banned users</label></li>\n\
</ul>");
            // </FORUMS>

            // <FILES>
            addTab("Files",
"<ul class='form-list'>\n\
   <li><input type='checkbox' id='ENABLE_FILE_GRID_HOVER' name='ENABLE_FILE_GRID_HOVER' class='bool-pref'> <label for='ENABLE_FILE_GRID_HOVER'>When browsing files in grid view, show details on hover</label></li>\n\
</ul>");
            // </FILES>

            // <INFO>
            addTab("About",
"<ul class='form-list'>\n\
   <li>Banned post display inspired by <a href='http://userscripts.org/scripts/show/98567'>dazarobbo's implementation</a>. (I wrote my own code, but he was AFAIK the first to do something like this.)</li>\n\
</ul>");
            // </INFO>

            // <GENERAL>
            addTab("General",
"<ul class='form-list'>\n\
   <li>\n\
      You may find these functions useful, as updating a userscript can sometimes cause Greasemonkey to lose its saved data. Changes made using these buttons take effect immediately and cannot be undone.<br>\n\
      <input type='button' value='Backup All Settings'> <input type='button' value='Restore All Settings'>\n\
   </li>\n\
</ul>");
            $(CD.body).find("input[value='Backup All Settings']").click(function(e){prompt("This is your raw settings data. Copy it and save it in a file somewhere; you can restore it from that backup later.", BNet.getJSON())});
            $(CD.body).find("input[value='Restore All Settings']").click(
               function(e){
                  var V=prompt("If you backed up your raw settings data somewhere, you can re-instate it by pasting it here and clicking 'OK'. Leave the textbox blank to cancel.\n\nUsing this feature WILL overwrite all of your settings. This cannot be undone.", "");
                  if(!V||V.replace(/\s/g,"")=="")
                     return;
                  if(BNet.setJSON(V)){
                     BNet.PrefWindow.openOptions(); // sync the controls to the saved values
                     alert("The raw setting data has been processed and applied.")
                  }
               }
            );
            // </GENERAL>

            $(CD.body).find("#form-buttons>li>input[value='Save Settings']").click(
               function(e){
                  var BNPW=BNet.PrefWindow,CD=this.ownerDocument,d={};

                  // checkbox where checked = true ; drop-downs stored as bools ; strings
                  $(CD.body).find("input:checkbox[name].bool-pref").each(function(){d[$(this).attr("name")||$(this).attr("id")]=this.checked});
                  $(CD.body).find("select[name].bool-pref").each(function(){d[$(this).attr("name")||$(this).attr("id")]=!!Math.max(0,this.selectedIndex)});
                  $(CD.body).find("input:text[name].string-pref").each(function(){d[$(this).attr("name")||$(this).attr("id")]=$(this).val().replace(/\0/g,"")});

                  BNPW.applyOptions(d);
                  BNPW.closeOptions();
                  alert("Your changes will take effect when you reload the page.")
               }
            );

            $(CD.body).find("#form-buttons>li>input[value='Cancel']").click(function(e){BNet.PrefWindow.closeOptions()});
            $(CD.body).find("#tabs>li:first-child,#tab-boxes>li:first-child").addClass("sel");
            $(CD.body).find("input:checkbox[data-sub]").bind("click.subs",function(){BNet.PrefWindow._processSubClick(this)});

            this.modal_ready = true
         },
      init:function(){if(this.modal)return;this.modal=new BNetDialog({title:"Options",modal:true,width:640,height:261,events:{ModalInitialized:function(){BNet.PrefWindow._populateNode()}}})}
   };
GM_registerMenuCommand("Bungie.net Tweaks Options",function(){BNet.PrefWindow.openOptions()});

// General tweaks
$.extend(BNet,
   {
      Topbar:
         {
            HAS_UNREAD_MESSAGES: false,
            init:
               function(){
                  if(!BNet.Prefs.ENABLE_TOPBAR)
                     return;

                  var E=BNet.ENV;

                  if(!E.SIGNED_IN)
                     return;
                  var username=E.USERNAME;
                  if(!username)
                     return;

                  var avatar=$("#ctl00_dashboardNav_navigationMenuList div.imgAvatar>img").attr("src"),num_online_friends=E.FRIENDS_ONLINE,num_new_msgs=E.NEW_MESSAGES;

                  this.node=$("<div id='DJCBNetTopbarWrapper'><div id='DJCBNetTopbar'><ul></ul></div></div>").find("#DJCBNetTopbar");

                  this.node.find("ul")
                     .append(
                        "<li><a href='/Account/Profile.aspx' class='avatar img'><img src='" + avatar + "'></a></li>" +
                        "<li><a href='/Account/Profile.aspx' class='username'>" + username + "</a></li>" +
                        "<li><span>&nbsp;|&nbsp;</span><a class='img' href='/stats/reach/default.aspx' target='_blank'><img src='/images/base_struct_images/search/reach.gif' alt='Reach Service Record'></a></li>" +
                        "<li><span>&nbsp;|&nbsp;</span><a class='img' href='/stats/halo3/default.aspx' target='_blank'><img src='/images/base_struct_images/search/halo3.gif' alt='Halo 3 Service Record'></a></li>" +
                        "<li><span>&nbsp;|&nbsp;</span><a href='/Stats/LiveFriends.aspx' target='_blank'>" + num_online_friends + " friends online</a></li>" +
                        "<li><span>&nbsp;|&nbsp;</span><a href='/Account/Profile.aspx?page=Messages'" + (num_new_msgs>0?" class='bold'":"") + ">" + num_new_msgs + " new message" + (num_new_msgs!=1?"s":"") + "</a></li>"
                     );

                  GM_addStyle("\
#DJCBNetTopbarWrapper{position:fixed;left:0;top:0;width:100%}\n\
   #DJCBNetTopbar{position:relative;z-index:10;width:100%;border-bottom:1px solid rgba(255,255,255,.3);background:rgba(0,0,0,.65);text-align:right}\n\
      #DJCBNetTopbar>ul{list-style:none;padding:.25em 1em;margin:0}\n\
         #DJCBNetTopbar>ul>li{display:inline-block;vertical-align:middle}\n\
            #DJCBNetTopbar>ul>li>*{vertical-align:middle}\n\
            #DJCBNetTopbar>ul>li>a.bold{font-weight:bold}\n\
            #DJCBNetTopbar>ul>li>a.img{display:inline-block}\n\
               #DJCBNetTopbar>ul>li>a.avatar>img{width:18px;height:18px}\n\
            #DJCBNetTopbar>ul>li>a.username{padding-left:1ch}\n\
   #DJCBNetTopbarWrapper>div.quick_links_wrapper{float:left;position:relative;z-index:9001;width:200px;min-height:18px;padding:.25em 1em;background:#000;text-align:left}\n\
      #DJCBNetTopbarWrapper>div.quick_links_wrapper>a{line-height:18px}\n\
      #DJCBNetTopbarWrapper>div.quick_links_wrapper>ul.quick_links{display:none;position:absolute;list-style:none;left:0;top:100%;width:200px;padding:0;margin:0;border:0 solid rgba(255,255,255,.3);border-width:0 1px 1px 0;background:#000}\n\
      #DJCBNetTopbarWrapper>div.quick_links_wrapper.open>a{font-weight:bold!important}\n\
      #DJCBNetTopbarWrapper>div.quick_links_wrapper>ul.quick_links.open{display:block}\n\
         #DJCBNetTopbarWrapper>div.quick_links_wrapper>ul.quick_links>li{position:relative;padding:.25em 1em;border-top:1px solid rgba(255,255,255,.14)}\n\
            #DJCBNetTopbarWrapper>div.quick_links_wrapper>ul.quick_links>li>a.remove{float:right;width:1.25em;height:1.25em;background:rgba(255,255,255,.3);color:#FFF;font-weight:bold;line-height:1.1em;text-align:center;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%}\n\
            #DJCBNetTopbarWrapper>div.quick_links_wrapper>ul.quick_links>li>a.remove:hover{background:rgba(255,255,255,.4);text-decoration:none}\n\
            #DJCBNetTopbarWrapper>div.quick_links_wrapper>ul.quick_links>li>span.grip{display:none;position:absolute;top:0;right:-1px;bottom:0;width:3px;border:1px solid #666;background:#444;cursor:move}\n\
            #DJCBNetTopbarWrapper>div.quick_links_wrapper>ul.quick_links>li:hover>span.grip{display:inline-block}\n\
            #DJCBNetTopbarWrapper>div.quick_links_wrapper>ul.quick_links>li>span.grip:hover{border-color:#888;background:#666}");
                  
                  document.body.appendChild(this.node[0].parentNode);

                  this.QuickLinks.init();

                  this.HAS_UNREAD_MESSAGES=num_new_msgs>0&&(num_new_msgs>1||!$("#ctl00_mainContent_messagesPanel,div.block-b.msglist").length);

                  if(this.HAS_UNREAD_MESSAGES)
                     this.pulsate()
               },
            QuickLinks:
               {
                  node: $(), // div.quick_links_wrapper
                  render:
                     function(i,url,text){
                        var cQLn=$("<li data-quick-link-index='"+i+"'><a href='#' class='remove'>x</a><a class='link'></a><span class='grip' draggable='true'></span></li>");
                        cQLn.find("a.link").attr("href",url).html(text);
                        cQLn.find("a.remove").click(function(e){BNet.Topbar.QuickLinks.remove($(this.parentNode).attr("data-quick-link-index"));e.preventDefault()});
                        this.node.find("ul.quick_links>li:not([data-quick-link-index]):first").before(cQLn)
                     },
                  redrawAll:
                     function(){
                        this.node.find("li[data-quick-link-index]").remove();
                        var i=0,QL=Sync.load("QuickLinks","").split("////"),cQLn; // current Quick Link node
                        if(QL.length==1&&QL[0]=="")QL=[];
                        var QLl=QL.length;
                        for(;i<QLl;i++)
                           if(i % 2!=0)
                              this.render(Math.floor(i/2),QL[i-1],QL[i])
                     },
                  load:
                     function(fail_if_changed){
                        if (!Sync.altered("QuickLinks"))
                           return !!1;
                        else if (fail_if_changed)
                           return !!0;
                        this.node.find("li[data-quick-link-index]").remove();
                        this.redrawAll();
                        return !!1
                     },
                  save: function(data){return Sync.save("QuickLinks",data)},
                  add:
                     function(){
                        var link_href=prompt("URL of the link?\n(Type nothing to cancel.)","");
                        if(!link_href)
                           return;
                        var link_text=prompt("Text of the link?\n(Type nothing to cancel.)","");
                        if(!link_text)
                           return;

                        link_href=link_href.replace(/\/\/\/\//g,"//");
                        link_text=link_text.replace(/\//g,"&#47;");

                        if(Sync.altered("QuickLinks"))
                           return alert("A desync error occurred, so the link couldn't be added. Sorry.\n\nClosing and re-opening the Quick Links menu in this browser tab should re-sync it, and then you can add the menu item.");

                        var QL=Sync.load("QuickLinks","").split("////");
                        if(QL.length==1&&QL[0]=="")QL=[];
                        QL.push(link_href,link_text);

                        if(!Sync.save("QuickLinks",QL.join("////")))
                           return alert("An error occurred and the link could not be added. Sorry.");

                        this.render(QL.length-2,link_href,link_text);

                        alert("Link added.")
                     },
                  remove:
                     function(i){
                        if(!confirm("Are you sure you want to remove this link?\n(Link: \""+this.node.find("ul.quick_links li[data-quick-link-index='"+i+"']>a.link").text()+"\")"))
                           return;

                        if(!this.load(true))
                           return alert("An error occurred and the link could not be removed. Sorry.\n\n(This may be the result of a desync. Synching values across tabs can be tricky in Greasemonkey. Try closing the Quick Links menu, reopening it, and then removing the unwanted menu item.)");

                        var QL=Sync.load("QuickLinks","").split("////");
                        QL.splice(i*2,2);

                        if(!Sync.save("QuickLinks",QL.join("////")))
                           return alert("An error occurred and the link could not be removed. Sorry.");

                        this.redrawAll();

                        alert("Link removed.")
                     },
                  modals:
                     {
                        editAll:
                           new BNetDialog(
                              {
                                 title:"Edit Quick Links",modal:!!1,dynamic_size:!!1,
                                 events:
                                    {
                                       ModalInitialized:
                                          function(){
                                             this.contentNode.append("\
   <div class='table-wrap'><table cellpadding='0' cellspacing='0'>\n\
      <thead><tr><th>Link Text</th><th>Link URL</th><th>Reposition</th></tr></thead>\n\
      <tbody>\n\
         <tr><td><span class='doedit'><input type='button' value='edit'></span><span class='value'>Text</span></td><td><input type='text'></td><td><input type='button' value='\u25b2'><input type='button' value='\u25bc'></td></tr>\n\
      </tbody>\n\
      <tfoot>\n\
         <tr>\n\
            <td><label for='add-box'>Add Link:</label> <input type='text' id='add-link-text' size='20'></td>\n\
            <td><input type='text' id='add-link-url' size='20'></td>\n\
            <td><input type='button' value='Submit'></td>\n\
         </tr>\n\
      </tfoot>\n\
   </table></div>\n\
   <ul class='form-buttons'><li><input type='button' value='Save Changes'></li><li><input type='button' value='Cancel'></li></ul>");
                                             $("<style></style>").appendTo(this._bodyNode).html("\
a:link,a:link:visited,a:link:hover{color:#71CAEF!important}\n\
div.table-wrap{max-height:300px;padding-top:1px;margin-top:1em;border:0 solid #666;border-width:2px 0;overflow-y:auto}\n\
   table{width:100%;border-collapse:collapse;color:#BBB;font:12px/15px Arial,Helvetica,sans-serif}\n\
      table>tbody{max-height:100px;overflow-y:auto}\n\
         table th,\n\
         table td{padding:.25em .5em;border:1px solid #444}\n\
         table th:first-child{width:60%;text-align:left}\n\
         table *+th,\n\
         table *:first-child+*+td{text-align:center}\n\
         table th{background:#181818}\n\
            table td>span.doedit{float:right}\n\
               table td>span.doedit>input.active{font-weight:bold}\n\
            table td>span.value{vertical-align:middle}\n\
            table tbody td>input{width:100%}\n\
            table tbody td:first-child+td+td>input{width:auto!important;max-width:50%}\n\
         table tfoot td:first-child{text-align:right}\n\
            table tfoot td:first-child>label[for='add-box']{float:left}");

                                             this.contentNode.find("table").click(
                                                function(e){
                                                   var T=$(e.target),SV,V;
                                                   if(T.is("input[type='button'][value='edit']")){
                                                      SV=T.closest("td").children("span.value");
                                                      if(T.toggleClass("active").hasClass("active")){
                                                         V=SV.text();
                                                         SV.html("<input type='text'>").children("input").val(V)
                                                      }else{
                                                         V=SV.children("input").val();
                                                         SV.text(V)
                                                      }
                                                   }
                                                }
                                             );

                                             // Up/Down buttons
                                             this.contentNode.find("table").click( // BOTH
                                                function(e){
                                                   var T=$(e.target),TR,xTR,which=-1; // button, row, prev/next button, prev or next?

                                                   if(T.is("input[type='button']"))
                                                      which=$.inArray(T[0].value,["\u25b2","\u25bc"]); // 0 = prev, 1 = next
                                                   if(which<0)
                                                      return;
                                                   var np=which?"next":"prev", pn=which?"prev":"next", ch=which?"\u25bc":"\u25b2", hc=which?"\u25b2":"\u25bc";

                                                   TR=T.closest("tr");
                                                   if(!TR[np]().length||T.attr("disabled"))
                                                      return T.able(1)&&e.preventDefault()&&!!0;
                                                   xTR=TR[np]();
                                                   TR["insert"+["Before","After"][which]](TR[np]());
                                                   T.able(!TR[np]().length);
                                                   T.siblings("input[type='button'][value='"+hc+"']").able(!TR[pn]().length);
                                                   xTR.find("input[type='button'][value='"+ch+"']").able(!xTR[np]().length);
                                                   xTR.find("input[type='button'][value='"+hc+"']").able(!xTR[pn]().length)
                                                }
                                             );

                                             this.contentNode.find("input:button[value=\"Submit\"]").click(
                                                function(){
                                                   var D=BNetDialog.getDialog(this),T=D.contentNode.find("table"),nText=T.find("input#add-link-text").val(),nURL=T.find("input#add-link-url").val();
                                                   T.children("tbody").append("<tr><td><span class='doedit'><input type='button' value='edit'></span><span class='value'>"+nText+"</span></td><td><input type='text'></td><td><input type='button' value='\u25b2'><input type='button' value='\u25bc'></td></tr>");
                                                   T.children("tbody").children("tr:last-child").find("input[type='text']").each(function(i){$(this).val([nURL][i])});
                                                   // TODO: need to update reposition (move link up/down one row) cell
                                                   D.reposition()
                                                }
                                             );
                                             this.contentNode.find("input:button[value=\"Save Changes\"]").click(
                                                function(){
                                                   var D=BNetDialog.getDialog(this),TR=D.contentNode.find("table>tbody>tr");

                                                   var serialized = [];

                                                   TR.each(
                                                      function(){
                                                         $(this).find(">td>span.doedit>input[type='button'][value='edit'].active").click();
                                                         serialized.push(
                                                            $(this).children("td:eq(1)").children("input").val().replace(/\/\/\/\//g,"//"),   // URL
                                                            $(this).children("td:eq(0)").children("span.value").text().replace(/\//g,"&#47;") // Text
                                                         )
                                                      }
                                                   );

                                                   if(!Sync.save("QuickLinks",serialized.join("////"))){
                                                      if(confirm("The Quick Links in some tabs have desynchronized. Changes made in other tabs basically went unnoticed by this tab. Do you wish to overwrite these changes?\n\nPress 'OK' to destroy all changes made in other tabs, and save the changes made in this dialog.\nPress 'Cancel' to abort saving and preserve the changes made elsewhere.")) {
                                                         Sync.save("QuickLinks",serialized.join("////"),true);
                                                         alert("Settings saved successfully.");
                                                         BNet.Topbar.QuickLinks.redrawAll();
                                                         D.hide()
                                                      }
                                                      return
                                                   }else{
                                                      alert("Settings saved successfully.");
                                                      BNet.Topbar.QuickLinks.redrawAll();
                                                      D.hide()
                                                   }
                                                }
                                             );
                                             this.contentNode.find("input:button[value=\"Cancel\"]").click(function(){BNetDialog.getDialog(this).hide()});

                                             this.__writeTable =
                                                function(){
                                                   var i=0,n=$.now(),T=this.contentNode.find("table"),TB=T.children("tbody"),L;
                                                   BNet.Topbar.QuickLinks.load();
                                                   L=Sync.getFromCache("QuickLinks").split("////");
                                                   TB.children().remove();
                                                   for(;i+1<L.length;i+=2){
                                                      TB.append("<tr><td><span class='doedit'><input type='button' value='edit'></span><span class='value'>"+L[i+1]+"</span></td><td><input type='text'></td><td><input type='button' value='\u25b2'><input type='button' value='\u25bc'></td></tr>");
                                                      TB.children("tr:last-child").find("input[type='text']").each(function(TDi){$(this).val([L[i]][TDi])})
                                                   }
                                                };
                                          }
                                    }
                              }
                           )
                     },
                  openEditDialog: function(){this.modals.editAll.__writeTable();this.modals.editAll.show()},
                  init:
                     function() {
                        var QLN=this.node=$("<div class='quick_links_wrapper'><a href='#'>Quick Links</a><ul class='quick_links'></ul></div>");
                        QLN.find("a").click(function(e){BNet.Topbar.QuickLinks.load();$(this).next('ul.quick_links').add(this.parentNode).toggleClass('open');e.preventDefault()});
                        QLN.find("ul.quick_links").append("<li><a href='#' class='addnew'>Add link...</a></li><li><a href='#' class='edit'>Edit links...</a></li>");
                        QLN.find("ul.quick_links>li>a.addnew").click(function(e){BNet.Topbar.QuickLinks.add();e.preventDefault()});
                        QLN.find("ul.quick_links>li>a.edit").click(function(e){BNet.Topbar.QuickLinks.openEditDialog();e.preventDefault()});
                        BNet.Topbar.node.before(QLN);

                        this.redrawAll();

                        // ref: http://hacks.mozilla.org/2009/07/html5-drag-and-drop/
                        QLN.find("ul.quick_links"
                           ).bind("dragstart",function(e){var T=$(e.target);if(!T.attr("draggable"))return true;e.originalEvent.dataTransfer.setData("Text",T.closest("li").attr("data-quick-link-index"));return true}
                           ).bind("dragover",function(e){return !$(e.target).attr("data-quick-link-index")}
                           ).bind(
                              "drop",
                              function(e){
                                 var T=$(e.target);
                                 if(!T.attr("data-quick-link-index"))
                                    return !!1;
                                 var list,drag,drop,drag_index,rearranged_map=[];
                                 var dragged_id=e.originalEvent.dataTransfer.getData("Text");
                                 var dropped_id=T.attr("data-quick-link-index");

                                 list=$("#DJCBNetTopbarWrapper ul.quick_links");
                                 drag=list.children("li[data-quick-link-index="+dragged_id+"]");
                                 drop=list.children("li[data-quick-link-index="+dropped_id+"]");

                                 drag_index=GM_unwrap(drag).index();

                                 drop.after(drag);
                                 if(GM_unwrap(drop).index()!=drag_index)
                                    list.children("li").eq(drag_index).after(drop);

                                 // save the changes
                                 list.children("li[data-quick-link-index]").each(function(i){var T=$(this).find("a.link");T.attr("data-quick-link-index",i);rearranged_map.push(T.attr("href"),T.html())});
                                 rearranged_map=rearranged_map.join("////");
                                 BNet.Topbar.QuickLinks.save(rearranged_map);

                                 e.stopPropagation();
                                 return !!0
                              }
                           )
                     }
               },
            pulsate:
               function() {
                  var current_color=this.node.css("background-color").match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*0?\.65\)/i)||[0,0,0,0];
                  current_color.shift();
                  current_color=[+current_color[0],+current_color[1],+current_color[2]];

                  if(this.pulsate_value){
                     current_color[0]+=8;
                     current_color[1]+=4
                  }else{
                     current_color[0]-=8;
                     current_color[1]-=4
                  }
                  if(current_color[0]>=96||current_color[0]<=0)
                     this.pulsate_value=!this.pulsate_value;

                  this.node.css("background-color","rgba("+current_color.join(",")+",.65)");

                  var timeout=(current_color[0]>0)?100:700
                  setTimeout(function(){BNet.Topbar.pulsate()},timeout)
               }
         },
      init:function(){for(var i in this)if(this[i]&&this[i].init&&typeof this[i].init=="function")this[i].init()}
   }
);

BNet.Messaging =
   {
      MessageInfo:
         function() {
            var BNP = BNet.Prefs;

            var ENABLE_POST_AUTOCOLLAPSE = BNP.ENABLE_POST_AUTOCOLLAPSE;
            var ENABLE_POST_AUTOCOLLAPSE_BLANKS = ENABLE_POST_AUTOCOLLAPSE && BNP.ENABLE_POST_AUTOCOLLAPSE_BLANKS;
            var ENABLE_POST_AUTOCOLLAPSE_LINES = ENABLE_POST_AUTOCOLLAPSE && BNP.ENABLE_POST_AUTOCOLLAPSE_LINES;
            var POST_AUTOCOLLAPSE_LINES = Number(BNP.POST_AUTOCOLLAPSE_LINES) || 125;
            var ENABLE_POST_AUTOCOLLAPSE_PIXELS = ENABLE_POST_AUTOCOLLAPSE && BNP.ENABLE_POST_AUTOCOLLAPSE_PIXELS;
            var POST_AUTOCOLLAPSE_PIXELS = Number(BNP.POST_AUTOCOLLAPSE_PIXELS) || 1000;
            var POST_AUTOCOLLAPSE_PIXELS_LINES = Number(BNP.POST_AUTOCOLLAPSE_PIXELS_LINES) || 50;

            var post_node = $("p#PostBlock.message_text");
            var ridiculous_brs;
            if(ENABLE_POST_AUTOCOLLAPSE_BLANKS)
               ridiculous_brs=post_node.find("br+br").filter(
                  function(){
                     var count=0,P=this;
                     while(P.previousSibling&&count<25) {
                        P=P.previousSibling;
                        if(P.nodeName!="BR"&&P.nodeName!="#text")
                           break;
                        if(P.nodeName=="#text"&&P.nodeValue.replace(/\s/g,"")!="")
                           break;
                        if(P.nodeName=="BR")
                           count++
                     }
                     return count>20
                  }
               );
            else
               ridiculous_brs=$();
            if((ENABLE_POST_AUTOCOLLAPSE_BLANKS&&ridiculous_brs.length)||(ENABLE_POST_AUTOCOLLAPSE_LINES&&post_node.find("br").length>POST_AUTOCOLLAPSE_LINES))
               post_node.addClass("DJCBNT_height_limited_post");
            if(ENABLE_POST_AUTOCOLLAPSE_PIXELS&&post_node.find("br").length<POST_AUTOCOLLAPSE_PIXELS_LINES&&post_node.height()>POST_AUTOCOLLAPSE_PIXELS)
               post_node.addClass("DJCBNT_height_limited_post");

            GM_addStyle("p#PostBlock.message_text.DJCBNT_height_limited_post{width:378px;max-height:200px;padding:8px 8px 0px 2px!important;overflow-y:auto}");
         },
      init:
         function() {
            if(BNet.ENV.VIEWING_PM)this.MessageInfo();
            for(var i in this)if(this[i]&&this[i].init&&typeof this[i].init=="function")this[i].init()
         }
   };

BNet.Forums = {init:function(){for(var i in this)if(this[i]&&this[i].init&&typeof this[i].init=="function")this[i].init()}};

// <REPLYING>
$.extend(BNet.Forums,
   {
      Reply:
         {
            init:
               function(){
                  var E=BNet.ENV;
                  if(E.REPLYING_TO_TOPIC||E.POSTING_NEW_TOPIC)
                     this.Breadcrumb();
                  if(E.REPLYING_TO_TOPIC)
                     MSAJAXResponseIntercept.listeners.push([this.QuoteHacks,this])
               },
            Breadcrumb:
               function() {
                  var E=BNet.ENV,IS_GROUP=E.IS_GROUP_FORUM,GROUP_ID=E.GROUP_ID,THREAD_ID=$_GET("postID");

                  var H2=$("#ctl00_mainColPanel h2:contains(Post to Forum)"); // #myNode>*[>+*...][>+]*:contains() fails due to XPCNativeWrapper dicketry.
                  H2.attr("id","DJCBNT_ReplyBreadcrumbHolder");

                  var html="<ul id='DJCBNT_ReplyBreadcrumb'><li><a href='",banner;
                  if(!IS_GROUP){
                     banner=$("#ctl00_forumHeader_forumTitleLink");
                     html+=banner.attr("href")+"'>"+banner.find("img").attr("alt")+"</a> &gt; </li>"
                  }else{
                     banner=$("#ctl00_forumHeader_groupForumsLink");
                     html+=banner.attr("href")+"'>"+banner.text()+"</a> &gt; </li>"
                  }

                  if(E.REPLYING_TO_TOPIC){
                     html+="<li><a href='http://www.bungie.net/"+(IS_GROUP?"fanclub/"+GROUP_ID+"/Forums/posts.aspx?postID=":"Forums/posts.aspx?postID=");
                     html+=THREAD_ID+"'>"+E.THREAD_NAME+"</a> &gt; </li><li>"+(E.EDITING_POST?"Editing a post":"Posting a reply");
                     if(E.PREVIEW_OWN_REPLY)
                        html+=" (previewing post)";
                     html+="</li></ul>";

                     // Breadcrumb makes this subject display redundant when replying; hide it.
                     $("#ctl00_mainContent_postForm_skin_subjectPanel").css("display","none")
                  }else{
                     html+="<li>Creating a new topic";
                     if(E.PREVIEW_OWN_REPLY)
                        html+=" (previewing post)";
                     html+="</li></ul>"
                  }
                  
                  GM_addStyle("\
#DJCBNT_ReplyBreadcrumbHolder{font-size:12px;font-weight:normal;text-transform:none}\n\
   #DJCBNT_ReplyBreadcrumb{list-style:none;padding:0;margin:0}\n\
      #DJCBNT_ReplyBreadcrumb>li{display:inline}\n\
      #DJCBNT_ReplyBreadcrumb>li:last-child{font-weight:bold}");

                  H2.html(html)
               },
            QuoteHacks:
               function(data){
                  if(!BNet.Prefs.ENABLE_QUOTE_AUTOLINK && !BNet.Prefs.QUOTE_STRIP_PRECEDING_NEWLINE)
                     return data;

                  var threadID=$("#ctl00_mainContent_postForm_skin_originalPost_skin_topicAnchor").attr("name");
                  var postID=$_GET("postID"),
                      old_value=$("#ctl00_mainContent_postForm_skin_body").val()||"";
                  var URL=BNet.ENV.IS_GROUP_FORUM?"http://www.bungie.net/fanclub/"+BNet.ENV.GROUP_ID+"/Forums/posts.aspx?postID=":"http://www.bungie.net/Forums/posts.aspx?postID=";

                  var i=0,dl=data.length;
                  for(var i=0;i<dl;i++){
                     if(data[i].type != "updatePanel")
                        continue;
                     if(!data[i].content.match(/^<textarea name="ctl\d\d\$mainContent\$postForm\$skin\$body"/))
                        continue;

                     var chunk=data[i].content;
                     chunk=chunk.replace(/\r\n/g,"\n").replace(/\r/g,"");

                     var nStart=chunk.replace(/^(<textarea[^>]*?>)[^\b]*/g,"$1"),nEnd=chunk.replace(/[^\b]*(<\/textarea>)$/g,"$1"),nValue=chunk.slice(nStart.length,-nEnd.length);

                     // decode HTML entities that MS AJAX adds
                     var TA=document.createElement("textarea");
                     TA.innerHTML=nValue;
                     nValue=TA.value;

                     var nQuoteBefore=nValue.substring(0,nValue.indexOf(old_value)+old_value.length);
                     if(nValue.indexOf(old_value)<0)
                        nQuoteBefore="";
                     var nQuote=nValue.substring(nQuoteBefore.length);

                     if(BNet.Prefs.ENABLE_QUOTE_AUTOLINK)
                        nQuote=nQuote.replace(/^(\n+\[quote\]\[b\]Posted by\:\[\/b\] [^\n]*)\n+/,"$1 [url="+URL+postID+"](post)[/url]\n");

                     if(BNet.Prefs.QUOTE_STRIP_PRECEDING_NEWLINE)
                        nQuote=nQuote.replace(/^\n+/,"");

                     chunk=nStart+nQuoteBefore+nQuote+nEnd;

                     data[i].content = chunk
                  }
                  return data
               }
         }
   }
);
// </REPLYING>

// <VIEWING-THREAD>
$.extend(BNet.Forums,
   {
      Thread:
         {
            _getPost: function($ID){return this.Post.list[$ID]},
            Post:
               (function(){
                  var x =
                     function Post(d){
                        this.$ID=arguments.callee.list.push(this)-1;

                        this.node=$(GM_unwrap(d.node)); // div.forum_item_outer_shell

                        // for quick reference to related ASP.NET controls on page
                        this.ctl=($(this.node).children("div[id]").attr("id").match(/^ctl00_mainContent_postRepeater1_ctl(\d\d)_/)||[0,""])[1];
                        this.ctlstr="#ctl00_mainContent_postRepeater1_ctl"+this.ctl+"_ctl00_";

                        if($(this.ctlstr+"post_display_container").is(":no-children"))
                           this.is_banned=true;

                        var x=$(this.ctlstr+"postControl_skin_hlAnchor");
                        this.id=this.is_banned?-1:x.attr("name");
                        this.url="http://www.bungie.net/Forums/posts.aspx?postID="+this.id;

                        x=$(this.ctlstr+"postControl_skin_usernameLink");
                        this.author=x.length?x.text():(this.is_banned?"Banned user":"Anonymous User (Deleted)");
                        this.author_id=x.length?$_GET("memberID",URL(x[0].href)):-1;

                        x=$(this.node).find("div.forumpost div.postbody>div.floatingprofile");
 
                        this.gamertag=x.find("a[id$=gamertagLinkFloat]").text()||"";
                        this.has_gamertag=!!x.find("a[id$=gamertagLinkFloat]").attr("href");

                        this.morelist=$("<ul class='DJCBNT_MoreMenu'></ul>").prependTo(x);
                        this.titlelist=$(this.ctlstr+"postControl_skin_author_header");

                        this.message_url=$(this.ctlstr+"postControl_skin_msgUser").attr("href")||"";

                        delete x;

                        this._mutateAvatar()
                     };
                  x.list = [];
                  x.prototype =
                     {
                        addTitleLink:
                           function(text,action,name){ // text of the link , URL to link (string) to or click event listener (function)
                              var L=this.titlelist.append("<li class='author_header_links'><a href='#' class='lolnew'></a></li>").find("a.lolnew").removeClass("lolnew").text(text).attr("data-post-djc-id",this.$ID);
                              var LI=L.closest("li");
                              if((LI.prev().html()||"").replace(/\s/g,"")&&LI.prev().html()!="&nbsp; |&nbsp;")
                                 LI.before("<li class='author_header_links'>&nbsp;|&nbsp;</li>");
                              if(action+""===action)
                                 L.attr("href",action);
                              else
                                 L.click(action);
                              if(name){
                                 this.titlelist.find("li[data-title-link-name="+name+"]").remove();
                                 LI.prev().andSelf().attr("data-title-link-name",name)
                              }
                              return L
                           },
                        removeTitleLink:
                           function(name,text){
                              if(name)
                                 this.titlelist.find("li[data-title-link-name="+name+"]").remove();
                              else if(text)
                                 this.titlelist.find("li>a:contains("+text+")").closest("li").prev().andSelf().remove()
                           },
                        addMoreLink:
                           function(text,action,name){ // text of the link , URL to link (string) to or click event listener (function)
                              var L=this.morelist.append("<li><a href='#' class='lolnew'></a></li>").find("a.lolnew").removeClass("lolnew").text(text).attr("data-post-djc-id",this.$ID);
                              if(action+""===action)
                                 L.attr("href",action);
                              else
                                 L.click(action);
                              if(name){
                                 this.morelist.find("li[data-more-link-name="+name+"]").remove();
                                 L.closest("li").attr("data-more-link-name",name)
                              }
                              this.node.addClass("DJCBNTPost_HasMoreLinks");
                              return L
                           },
                        removeMoreLink: function(name){this.morelist.find("li[data-more-link-name="+name+"]").remove();if(!this.morelist.find("li").length)this.node.removeClass("DJCBNTPost_HasMoreLinks")},
                        addAvatarLink:
                           function(text,action,name,after_index){ // text of the link , URL to link (string) to or click event listener (function)
                              if(!this.avatarlist)
                                 return false;
                              var L=this.avatarlist.append("<li><a href='#' class='lolnew'></a></li>").find("a.lolnew").removeClass("lolnew").text(text).attr("data-post-djc-id",this.$ID);
                              if(after_index)
                                 L.siblings().andSelf().eq(after_index).after(L);
                              if(action+""===action)
                                 L.attr("href",action);
                              else
                                 L.click(action);
                              if(name){
                                 this.avatarlist.find("li[data-more-avatar-name="+name+"]").remove();
                                 L.closest("li").attr("data-more-avatar-name",name)
                              }
                              return L
                           },
                        removeAvatarLink: function(name){if(!this.avatarlist)return !1;this.avatarlist.find("li[data-more-avatar-name="+name+"]").remove()},
                        _mutateAvatar: function(){if(!BNet.Prefs.ENABLE_POST_LINKS)return;this.node.find("div.forumavatar").children("a[id$=avatarProfileLink]").after("<ul class='DJCBNTPost_AvMenu'></ul>");this.avatarlist=this.node.find("ul.DJCBNTPost_AvMenu")}
                     };
                  return x
               })(),
            getPostsByAuthor: function(a){a=a.toLowerCase();var i=0,r=[],PL=this.Post.list;for(;i<PL.length;i++)if(PL[i].author.toLowerCase()==a)r.push(PL[i]);return r},
            init:
               function(){
                  if (!BNet.ENV.VIEWING_TOPIC)
                     return;

                  GM_addStyle("\
ul.DJCBNT_MoreMenu{display:none;list-style:none;height:20px;padding:4px 6px 0 6px;margin:0;border-top:1px dashed #1A1A1A;border-bottom:1px dashed #222}\n\
div.DJCBNTPost_HasMoreLinks ul.DJCBNT_MoreMenu{display:block}\n\
   ul.DJCBNT_MoreMenu>li{display:inline-block!important}\n\
   ul.DJCBNT_MoreMenu>li.right{float:right}\n\
   ul.DJCBNT_MoreMenu>li+li:before{content:\"\\00a0|\\00a0\"}\n\
   ul.DJCBNT_MoreMenu>li+li.right:before{content:\"\"}\n\
   ul.DJCBNT_MoreMenu>li.right+li.right:after{content:\"\\00a0|\\00a0\"}");

                  if(BNet.Prefs.ENABLE_POST_LINKS)
                     GM_addStyle("\
div.forumavatar{float:left;width:90px;margin:4px 0 0 10px;text-align:center;overflow:hidden!important}\n\
   div.forumavatar>a:first-child>img{float:none!important;margin:0!important;border:0!important}\n\
   div.forumavatar>ul.DJCBNTPost_AvMenu{list-style:none;padding:0;margin:0}\n\
      div.forumavatar>ul.DJCBNTPost_AvMenu>li{display:block;margin:2px 0}\n\
         div.forumavatar>ul.DJCBNTPost_AvMenu>li>a{display:block}\n\
         div.forumavatar>ul.DJCBNTPost_AvMenu>li i.fake-img{float:none!important;display:inline-block;width:18px!important;height:18px!important;margin:0!important;font-size:0;color:transparent;text-indent:-999px;overflow:hidden}\n\
         div.forumavatar>ul.DJCBNTPost_AvMenu>li i.fake-img.h3{background:url(/images/base_struct_images/search/halo3.gif)}\n\
         div.forumavatar>ul.DJCBNTPost_AvMenu>li i.fake-img.hr{background:url(/images/base_struct_images/search/reach.gif)}\n\
         div.forumavatar>ul.DJCBNTPost_AvMenu>li i.fake-img.xb{background:url(http://www.xbox.com/Shell/images/favicon.ico) no-repeat bottom center}\n\
      div.forumavatar>ul.DJCBNTPost_AvMenu>li.no-margin{margin:0}\n\
      div.forumavatar>ul.DJCBNTPost_AvMenu>li.side-by-side>a{display:inline-block}"
                     );

                  $("div.forum_item_outer_shell").each(function(){new BNet.Forums.Thread.Post({node:this})})
               }
         }
   }
);
// </VIEWING-THREAD>

// <VIEWING-THREAD> // extras
$.extend(BNet.Forums,
   {
      ThreadGUI:
         {
            init:
               function() {
                  var E=BNet.ENV;
                  if(E.VIEWING_TOPIC){
                     this.PostInfo();
                     this.MarkBannedPosts()
                  }
                  //if (E.REPLYING_TO_TOPIC && !E.PREVIEW_OWN_REPLY && !E.EDITING_OWN_REPLY)
                  //   this.PostInfo();
               },
            PostInfo:
               function() {
                  var i=0,P=BNet.Forums.Thread.Post.list,A,CL;
                  var BNP=BNet.Prefs,BNE=BNet.ENV;
                  if(!BNP.ENABLE_POST_LINKS)
                     return;
                  for(;i<P.length;i++){
                     if(BNP.ENABLE_POST_PERMALINKS){
                        P[i]["add"+["Title","Avatar"][!!BNP.PERMALINK_BELOW_AVATAR+0]+"Link"]("link to this post","#"+P[i].id,"link-to-post");
                        if(!BNP.PERMALINK_BELOW_AVATAR&&P[i].message_url){
                           P[i].addAvatarLink("message user",P[i].message_url,"message-user").attr("id",P[i].ctlstr.substring(1)+"postControl_skin_msgUser");
                           P[i].removeTitleLink(null,"message user")
                        }
                     }
                     if(BNP.ENABLE_POST_GAMERTAG_LINKS&&P[i].has_gamertag){
                        A=P[i].addAvatarLink("placeholder","placeholder","gamertag-links");
                        A.closest("li").addClass("side-by-side").addClass("no-margin");
                        A.replaceWith("\
<a href='http://live.xbox.com/en-US/MyXbox/Profile?GamerTag="+P[i].gamertag+"'><i class='fake-img xb'>Xbox.com Profile</i></a> \
<a href='/Stats/Reach/Default.aspx?player="+P[i].gamertag+"'><i class='fake-img hr'>Reach Service Record</i></a> \
<a href='/Stats/Halo3/Default.aspx?player="+P[i].gamertag+"'><i class='fake-img h3'>Halo 3 Service Record</i></a>")
                     }
                     CL=
                        P[i].addMoreLink(
                           "collapse this post",
                           function(e){
                              var post=$(this).closest("div.postbody").children("p");
                              $(this).text(["expand this post","collapse this post"][+post.hasClass("DJCBNT_height_limited_post")]);
                              post.toggleClass("DJCBNT_height_limited_post");
                              e.preventDefault()
                           },
                           "collapse-post"
                        );
                     P[i].addMoreLink(
                        "make readable",
                        function(e) {
                           var post=$(this).closest("div.postbody").children("p");
                           $(this).text(["revert to normal","make readable"][+post.hasClass("DJCBNT_readable_post")]);
                           post.toggleClass("DJCBNT_readable_post");
                           e.preventDefault()
                        },
                        "readable-post"
                     );

                     var post_node=$(P[i].node).find("div.forumpost div.postbody>p");
                     var ridiculous_brs=BNP.ENABLE_POST_AUTOCOLLAPSE_BLANKS?post_node.find("br + br").filter(function(){var count=0,P=this;while(P.previousSibling&&count<25){P=P.previousSibling;if((P.nodeName!="BR"&&P.nodeName!="#text")||(P.nodeName=="#text"&&P.nodeValue.replace(/\s/g,"")!=""))break;if(P.nodeName=="BR")count++}return count>20}):$();
                     if((BNP.ENABLE_POST_AUTOCOLLAPSE_BLANKS&&ridiculous_brs.length)||(BNP.ENABLE_POST_AUTOCOLLAPSE_LINES&&post_node.find("br").length>BNP.POST_AUTOCOLLAPSE_LINES)||(BNP.ENABLE_POST_AUTOCOLLAPSE_PIXELS&&post_node.find("br").length<BNP.POST_AUTOCOLLAPSE_PIXELS_LINES&&post_node.height()>BNP.POST_AUTOCOLLAPSE_PIXELS))
                        CL.click()
                  }

                  GM_addStyle("\
p.DJCBNT_height_limited_post{max-height:200px;padding:8px 12px 6px 12px!important;margin-bottom:6px;margin-right:4px;background:#111;overflow-y:auto}\n\
p.DJCBNT_readable_post{font-size:1.3em;line-height:1.5em}")
               },
            MarkBannedPosts:
               function(){
                  if(!BNet.Prefs.ENABLE_BANNED_POST_PLACEHOLDER)
                     return;

                  var banned_posts=$("div.forum_item_outer_shell>div[id$=_post_display_container]:no-children"); // *:no-children is custom, remember that
                  banned_posts.each(function(i){$(this).css("display","").addClass("banned-post").append("<span><div class='forumpost'><div class='clear'></div><div class='forumavatar'></div><div class='postbody'><ul class='author_header_block'><li class='login'>Banned user</li></ul><p></p><span class='banneduserlabel'><strong>Moderator Notice:</strong> This user has been blacklisted from this forum. Until the user is removed from the blacklist, all posts this user has made have been hidden, and all topics created by this user have been censored.</span></div><div class='post-actions'></div></div></span>").closest("div.forum_item_outer_shell").andSelf().addClass("banned-post")});

                  GM_addStyle("\
div.forum_item_outer_shell.banned-post{width:100%;border:0 solid #1B1919;border-width:1px 0;background:#1D1C1C}\n\
   div.forum_item_outer_shell>div.banned-post{}\n\
      div.forum_item_outer_shell>div.banned-post div.forumavatar{min-height:90px}\n\
      div.forum_item_outer_shell>div.banned-post ul.author_header_block{background-color:#442424}\n\
      div.forum_item_outer_shell>div.banned-post span.banneduserlabel{color:#BBBBBB}")
               }
         }
   }
);
// </VIEWING-THREAD>

// <VIEWING-FORUM>
$.extend(BNet.Forums,
   {
      ThreadList:
         {
            _getThread: function($ID){return this.Thread.list[$ID]},
            Thread:
               (function() {
                  var x=
                     function Thread(d) {
                        this.$ID=arguments.callee.list.push(this)-1;

                        this.node=$(GM_unwrap(d.node||d.tr));

                        var L=this.node.find(">td:first-child+td>div>h5>a[id$=_hSubject]");
                        this.url=L.attr("href");
                        this.name=L.text();
                        this.replies=parseInt(L.siblings("span[id$=_replyCountLabel]").text());

                        L=this.node.find(">td:first-child+td>div>p").children("a[id$=_hUser],a[id$=_DeletedUserLabel]").eq(0);
                        this.author=L.length?L.text():"Anonymous User (Deleted)";
                        this.author_id=L.length?$_GET("memberID",URL(L[0].href)):0;

                        L=L.siblings("a[id$=_postedBy]");
                        this.last_user=L.length?L.text():"";
                        this.last_user_id=L.length?$_GET("memberID",URL(L[0].href)):-1;

                        var O=this.addOverlay("options");
                        O.addClass("options").append("<a href='#' class='thread'>Thread Name</a><ul><li class='close'><a href='#'>Close Options</a></li></ul>").children("a:first-child").attr("href",this.url).text(this.name).siblings("ul").find(">li>a").attr("data-thread-djc-id",this.$ID).click(function(e){BNet.Forums.ThreadList._getThread($(this).attr("data-thread-djc-id")).hideOptions();e.preventDefault()});
                        this.node.find(">td:first-child>div").append("<a class='DJCBNTOverlay_OpenOptions' href='#'>Tools</a>").find("a.DJCBNTOverlay_OpenOptions").attr("data-thread-djc-id",this.$ID).click(function(e){BNet.Forums.ThreadList._getThread($(this).attr("data-thread-djc-id")).showOptions();e.preventDefault()});

                        delete L;delete O
                     };
                  x.list = [];
                  x.prototype =
                     {
                        addOverlay:
                           function(name){
                              var D=$("<div class='DJCBNTOverlay'></div>");
                              D.attr("data-overlay-name",name);
                              this.node.addClass("DJCBNTOverlayHas").find(">td+td>div").append(D);
                              return D
                           },
                        getOverlay: function(name){return this.node.find("div.DJCBNTOverlay[data-overlay-name="+name+"]")},
                        showOverlay:
                           function(name){
                              var D=this.node.find("div.DJCBNTOverlay[data-overlay-name="+name+"]");
                              if(D.length&&!D.hasClass("on"))
                                 D.addClass("on");
                              if(this.hasActiveOverlay())
                                 this.node.addClass("DJCBNTOverlayOn")
                           },
                        hideOverlay:
                           function(name){
                              var D=this.node.find("div.DJCBNTOverlay[data-overlay-name="+name+"]");
                              if(D.length&&D.hasClass("on"))
                                 D.removeClass("on");
                              if(!this.hasActiveOverlay())
                                 this.node.removeClass("DJCBNTOverlayOn")
                           },
                        hasActiveOverlay: function(){return this.node.find("div.DJCBNTOverlay.on").length},
                        addOption:
                           function(text,action,name){ // text of the link , URL to link (string) to or click event listener (function)
                              var O=this.getOverlay("options");
                              var L=O.find("ul").append("<li><a href='#' class='lolnew'></a></li>").find("a.lolnew").removeClass("lolnew").text(text).attr("data-thread-djc-id",this.$ID);
                              if(action+""===action)
                                 L.href(action);
                              else
                                 L.click(action);
                              if(name)
                                 L.closest("li").attr("data-option-name",name);
                              this.node.addClass("DJCBNTOverlay_HasOptions")
                           },
                        removeOption:
                           function(name){
                              var O=this.getOverlay("options");
                              O.find("li[data-option-name="+name+"]").remove();
                              if(O.find("li").length===1){
                                 this.node.removeClass("DJCBNTOverlay_HasOptions");
                                 this.hideOptions()
                              }
                           },
                        showOptions: function(){this.showOverlay("options")},
                        hideOptions: function(){this.hideOverlay("options")}
                     };
                  return x
               })(),
            getThreadsByAuthor: function(a){a=a.toLowerCase();var i=0,r=[],TL=this.Thread.list;for(;i<TL.length;i++)if(TL[i].author.toLowerCase()==a)r.push(TL[i]);return r},
            init:
               function() {
                  if(!BNet.ENV.VIEWING_FORUM)
                     return;

                  GM_addStyle("\
#ctl00_mainColPanel table.grid tr.DJCBNTOverlay{}\n\
      #ctl00_mainColPanel table.grid tr>td:first-child>div>a.DJCBNTOverlay_OpenOptions{display:none;position:absolute;width:26px;margin-top:-8px;font-size:11px;text-align:center;white-space:pre}\n\
      #ctl00_mainColPanel table.grid tr.DJCBNTOverlay_HasOptions:hover>td:first-child>div>a.DJCBNTOverlay_OpenOptions{display:inline}\n\
      #ctl00_mainColPanel table.grid tr.DJCBNTOverlayOn>td:first-child>div{visibility:hidden}\n\
      #ctl00_mainColPanel table.grid tr.DJCBNTOverlayHas>td+td>div{position:relative}\n\
         #ctl00_mainColPanel table.grid tr>td+td>div>div.DJCBNTOverlay{display:none;position:absolute;left:0;top:0;right:0;bottom:0;margin:-6px -3px -8px -7px}\n\
         #ctl00_mainColPanel table.grid tr>td+td>div>div.DJCBNTOverlay.on{display:block}\n\
         #ctl00_mainColPanel table.grid tr.odd>td+td>div>div.DJCBNTOverlay{background:#363D40}\n\
         #ctl00_mainColPanel table.grid tr.even>td+td>div>div.DJCBNTOverlay{background:#2F3032}\n\
         #ctl00_mainColPanel table.grid tr>td+td>div>div.DJCBNTOverlay.options{padding:6px 3px 8px 7px}\n\
            #ctl00_mainColPanel table.grid tr>td+td>div>div.DJCBNTOverlay.options>a.thread{display:block;padding-bottom:2px;line-height:18px}\n\
            #ctl00_mainColPanel table.grid tr>td+td>div>div.DJCBNTOverlay.options>ul{list-style:none;padding:0;margin:3px 0 0 0}\n\
               #ctl00_mainColPanel table.grid tr>td+td>div>div.DJCBNTOverlay.options>ul>li{display:inline-block}\n\
               #ctl00_mainColPanel table.grid tr>td+td>div>div.DJCBNTOverlay.options>ul>li+li+li:before{content:\"\\00a0|\\00a0\"}\n\
               #ctl00_mainColPanel table.grid tr>td+td>div>div.DJCBNTOverlay.options>ul>li.close{float:right}");

                  $("#ctl00_mainColPanel table.grid tr").each(function(){new BNet.Forums.ThreadList.Thread({node:this})})
               }
         }
   }
);
// </VIEWING-FORUM>


// <HIDEUSER>
BNet.HideUser =
   {
      init:
         function() {
            var E=BNet.ENV;

            this.loadUsers();

            if(E.VIEWING_FORUM){
               GM_addStyle("#ctl00_mainColPanel table.grid tr>td+td>div>div.DJCBNTOverlay.hideuser{left:-36px;line-height:52px;text-align:center}");
               this.hideThreadsInForum()
            }else if(E.VIEWING_TOPIC){
               GM_addStyle("\
div.forum_item_outer_shell.DJCBNTHideUser.hiding{position:relative}\n\
   div.DJCBNTHideUser.hiding>div{display:block!important;visibility:hidden;max-height:101px;overflow:hidden}\n\
   div.DJCBNTHideUser.hiding>ul.spam_collapse_bar+div{max-height:95px}\n\
   div.DJCBNTHideUser>div.DJCBNTHideUser_PostOverlay{display:none;visibility:visible!important;position:absolute;left:0;top:0;right:0;bottom:0;min-width:670px;height:75px;margin:12px 0;border:0 solid #444;border-width:1px 0;background:#000;line-height:75px;text-align:center}\n\
   div.DJCBNTHideUser.hiding>div.DJCBNTHideUser_PostOverlay{display:block}\n\
   div.DJCBNTHideUser.hiding>ul.spam_collapse_bar~div.DJCBNTHideUser_PostOverlay{top:30px}");
               this.hidePostsInThread()
            }
         },
      users: {},
      didWeDesync: function(){return Sync.altered("HiddenUsers")},
      loadUsers:
         function(fail_if_changed){
            var i=0,c,data,dl,N=$.now(),needs_resave;
            if(!this.didWeDesync())
               return !!1;
            else if(fail_if_changed)
               return !!0;
            data=Sync.load("HiddenUsers","");
            this.users={};
            data=data.split("||");
            dl=data.length;
            if(dl===1&&!data[0])
               return !!1;
            for(;i<dl;i++){
               c=data[i].split("|");
               $.extend((this.users[c[0].toLowerCase()]={id:Number(c[1])||0}),JSON.parse(c[2]))
               if(!this.users[c[0].toLowerCase()]._date){
                  this.users[c[0].toLowerCase()]._date = N-10000+i;
                  needs_resave=!!1
               }
            }
            if(needs_resave)
               this.saveUsers();
            return true
         },
      saveUsers: function(){if(this.didWeDesync())return !!0;var i,data="";for(i in this.users){data+=i+"|"+this.users[i].id+"|";delete this.users[i].id;data+=JSON.stringify(this.users[i])+"||"}data=data.substring(0,data.length-2);Sync.save("HiddenUsers",data);return !!1},
      addUser:
         function(name,id,d,dont_nuke_if_empty){
            if(!name)return null;
            if(this.didWeDesync())return !!0;
            name=name.toLowerCase();var d=d||{},U=this.users;

            U[name] =
               {
                  id:id||0,
                  thread:d.thread||false,
                  post:d.post||false,
                  hot_topic:d.hot_topic||d.hot_thread||!!0,
                  _date:$.now()
               };

            if(!dont_nuke_if_empty&&U[name].thread==0&&U[name].post==0&&U[name].hot_topic==!!0) // we're not hiding anything from this user; remove them from the list to speed things up.
               return this.removeUser(name)

            return this.saveUsers()
         },
      removeUser: function(name){if(!name)return null;name=name.toLowerCase();if(!this.users[name])return !0;if(this.didWeDesync())return !1;delete this.users[name];this.saveUsers();return !0},
      removeAllUsers: function(){if(this.didWeDesync())return !1;this.users={};this.saveUsers();return !0},
      isHidden: function(name,type){var i,u=this.users[name]||{};if(!type){for(i in u)if(u[i])return !0;return !1}return u[type]||!1}, // username , "thread"/"post"/"hot_topic"
      modals:
         {
            editUser:
               new BNetDialog(
                  {
                     title:"Edit hide settings for a user",modal:true,dynamic_size:true,
                     events:
                        {
                           ModalInitialized:
                              function(){
                                 this.contentNode.append("\
   Editing settings for <span class='username'>USERNAME</span>...\n\
   <ul class='form-list'>\n\
      <li><input type='checkbox' id='hide-threads'> <label for='hide-threads'>Hide threads by this user</label></li>\n\
      <li><input type='checkbox' id='hide-posts'> <label for='hide-posts'>Hide posts by this user</label></li>\n\
      <li><input type='checkbox' id='hide-hot-topics' disabled> <label for='hide-hot-topics'>Hide hot topics by this user</label> (not yet implemented)</li>\n\
   </ul>\n\
   <ul class='form-buttons'>\n\
      <li><input type='button' value='OK'></li>\n\
      <li><input type='button' value='Cancel'></li>\n\
   </ul>");
                                 $("<style></style>").appendTo(this._bodyNode).html("a:link,a:link:visited,a:link:hover{color:#71CAEF!important}");

                                 this.contentNode.find("input:button[value=\"OK\"]").click(
                                    function(){
                                       var CDB=$(GM_unwrap(this.ownerDocument.body)),d={thread:false,post:false,hot_topic:false},name=CDB.find("span.username").text();
                                       if(CDB.find("input#hide-threads").attr("checked"))
                                          d.thread=true;
                                       if(CDB.find("input#hide-posts").attr("checked"))
                                          d.post=true;
                                       if(CDB.find("input#hide-hot-topics").attr("checked"))
                                          d.hot_topic=true;
                                       if(BNet.HideUser.addUser(name,0,d)){
                                          alert("Your settings for this user have been saved.");
                                          $(BNet.HideUser).trigger({type:"UserSettingsSaved",user:name,params:d})
                                       }else
                                          alert("Couldn't save your settings, as a desync happened across tabs. Refresh the page and try again.");
                                       BNetDialog.getDialog(this).hide()
                                    }
                                 );
                                 $(BNet.HideUser).bind("UserSettingsSaved",function(e){this.Post.setAuthorState(e.user)});
                                 this.contentNode.find("input:button[value=\"Cancel\"]").click(function(){BNetDialog.getDialog(this).hide()});

                                 this.__setFormState=
                                    function(name){
                                       this.contentNode.find("span.username").text(name);
                                       var d={};
                                       if(!BNet.HideUser.users[name])
                                          d={post:false,thread:false,hot_topic:false};
                                       else
                                          $.extend(d,BNet.HideUser.users[name]);
                                       this._bodyNode.find("input#hide-threads").able(d.thread,"checked");
                                       this._bodyNode.find("input#hide-posts").able(d.post,"checked");
                                       this._bodyNode.find("input#hide-hot-topics").able(d.hot_topic,"checked")
                                    }
                              }
                        }
                  }
               ),
            editAll:
               new BNetDialog(
                  {
                     title:"Edit hide settings",modal:true,dynamic_size:true,
                     events:
                        {
                           ModalInitialized:
                              function(){
                                 this.contentNode.append("\
   To remove a user from the list, just uncheck all of their boxes (so that none of \n\
   their stuff is hidden) and the script'll prune them from the list automatically \n\
   when you save.\n\
   <div class='table-wrap'><table cellpadding='0' cellspacing='0'>\n\
      <thead>\n\
         <tr><th colSpan='2'>User</th><th colSpan='2'>Hide</th></tr>\n\
         <tr><th>Name</th><th>Date Hidden</th><th>Posts</th><th>Threads</th></tr>\n\
      </thead>\n\
      <tbody>\n\
         <tr><td>MISSINGNO.</td><td>Unknown</td><td><input type='checkbox'></td><td><input type='checkbox'></td></tr>\n\
      </tbody>\n\
      <tfoot>\n\
         <tr>\n\
            <td colSpan='2'>\n\
               <label for='add-box'>Add User:</label>\n\
               <input type='text' id='add-box' size='20'>\n\
               <input type='button' value='Submit'>\n\
            </td>\n\
            <td></td>\n\
            <td></td>\n\
         </tr>\n\
      </tfoot>\n\
   </table></div>\n\
   <ul class='form-buttons'>\n\
      <li><input type='button' value='Save Changes'></li>\n\
      <li><input type='button' value='Cancel'></li>\n\
   </ul>");
                                 $("<style></style>").appendTo(this._bodyNode).html("\
a:link,a:link:visited,a:link:hover{color:#71CAEF!important}\n\
div.table-wrap{max-height:300px;padding-top:1px;margin-top:1em;border:0 solid #666;border-width:2px 0;overflow-y:auto}\n\
   table{width:100%;border-collapse:collapse;color:#BBB;font:12px/15px Arial,Helvetica,sans-serif}\n\
      table>tbody{max-height:100px;overflow-y:auto}\n\
         table th,\n\
         table td{padding:.25em .5em;border:1px solid #444}\n\
         table th:first-child{width:80%;text-align:left}\n\
         table tr+tr>th:first-child{width:60%}\n\
         table *+th,\n\
         table *+td{padding:.25em 0;text-align:center}\n\
         table th{background:#181818}");

                                 var checkbuttons =
                                    [
                                       BNetWidget.make(
                                          this,
                                          "checkbutton",
                                          {
                                             items:
                                                [
                                                   ["Check all"  , function(){checkbuttons[0].setState(1);BNetDialog.getDialog(checkbuttons[0].node).contentNode.find("div.table-wrap>table>tbody>tr>td:first-child+td+td").each(function(){$(this).children("input").attr("checked","checked")})}],
                                                   ["Uncheck all", function(){checkbuttons[0].setState(0);BNetDialog.getDialog(checkbuttons[0].node).contentNode.find("div.table-wrap>table>tbody>tr>td:first-child+td+td").each(function(){$(this).children("input").removeAttr("checked")})}]
                                                ]
                                          }
                                       ),
                                       BNetWidget.make(
                                          this,
                                          "checkbutton",
                                          {
                                             items:
                                                [
                                                   ["Check all"  , function(){checkbuttons[1].setState(1);BNetDialog.getDialog(checkbuttons[1].node).contentNode.find("div.table-wrap>table>tbody>tr>td:first-child+td+td+td").each(function(){$(this).children("input").attr("checked","checked")})}],
                                                   ["Uncheck all", function(){checkbuttons[1].setState(0);BNetDialog.getDialog(checkbuttons[1].node).contentNode.find("div.table-wrap>table>tbody>tr>td:first-child+td+td+td").each(function(){$(this).children("input").removeAttr("checked")})}]
                                                ]
                                          }
                                       )
                                    ];
                                 this.contentNode.find("div.table-wrap>table>tfoot>tr>td:eq(1)").append(checkbuttons[0].node);
                                 this.contentNode.find("div.table-wrap>table>tfoot>tr>td:eq(2)").append(checkbuttons[1].node);
                                 $(this).one("AfterModalShow",function(e){checkbuttons[0].afterAppend();checkbuttons[1].afterAppend()});

                                 this.contentNode.find("input:button[value=\"Submit\"]").click(
                                    function(){
                                       var d,D=BNetDialog.getDialog(this),T=D.contentNode.find("table"),U=BNet.HideUser.users,name=$(this).siblings("input#add-box").val().toLowerCase().replace(/^\s*|\s*$/g,"");
                                       if(!name.replace(/\s/g,""))
                                          return;
                                       if(BNet.HideUser.users[name])
                                          return;
                                       if(name=="davidjcobb")
                                          alert("Well, that's pretty ungrateful of you. :P");
                                       BNet.HideUser.users[name] = {_date:(d=$.now())};
                                       var dhtml = padNumber(d.getMonth()+1,2)+"/"+padNumber(d.getDate(),2)+"/"+d.getFullYear();
                                       T.children("tbody").append("<tr name='"+name+"'><td>"+name+"</td><td>"+dhtml+"</td><td><input type='checkbox'></td><td><input type='checkbox'></td></tr>");
                                       D.reposition()
                                    }
                                 );
                                 this.contentNode.find("input:button[value=\"Save Changes\"]").click(
                                    function(){
                                       var D=BNetDialog.getDialog(this),TR=D.contentNode.find("table>tbody>tr"),successes=0,failures=0;
                                       TR.each(
                                          function(){
                                             var name=$(this).attr("name").toLowerCase(),d={};
                                             d.post=!!$(GM_unwrap(this)).children("td:first-child+td+td").children("input").attr("checked");
                                             d.thread=!!$(GM_unwrap(this)).children("td:first-child+td+td+td").children("input").attr("checked");
                                             var result=BNet.HideUser.addUser(name,0,d);
                                             if(result)
                                                successes++;
                                             else
                                                failures++
                                          }
                                       );

                                       if(failures&&!successes)
                                          alert("Unable to save your settings; a desync happened across tabs.\n\nRefresh and try to change them again.");
                                       else if(failures&&successes)
                                          alert("Some settings were saved, others weren't.\n\n" + failures + " errors, " + successes + "successes.");
                                       else
                                          alert("Settings saved successfully.");
                                       if (successes)
                                          $(BNet.HideUser).trigger("AllSettingsSaved");
                                       BNetDialog.getDialog(this).hide()
                                    }
                                 );
                                 $(BNet.HideUser).bind("AllSettingsSaved",function(){this.hidePostsInThread()});
                                 this.contentNode.find("input:button[value=\"Cancel\"]").click(function(){BNetDialog.getDialog(this).hide()});

                                 this.__writeTable =
                                    function(){
                                       var n=$.now(),D,c=-1,T=this.contentNode.find("table"),U=BNet.HideUser.users;
                                       T.children("tbody").children().remove();
                                       for(i in U){
                                          c++;
                                          D=new Date(U[i]._date||n-10000+c);
                                          T.children("tbody").append("<tr name='"+i+"'><td>"+i+"</td><td></td><td><input type='checkbox'></td><td><input type='checkbox'></td></tr>");
                                          T.find("tr[name='"+i+"']>td:eq(1)").html(padNumber(D.getMonth()+1,2)+"/"+padNumber(D.getDate(),2)+"/"+D.getFullYear()).attr("name",D.getTime());
                                          T.find("tr[name='"+i+"']>td:eq(2)>input:checkbox").able(U[i].post,"checked");
                                          T.find("tr[name='"+i+"']>td:eq(3)>input:checkbox").able(U[i].thread,"checked")
                                       }
                                    };
                                 GM_registerMenuCommand("Bungie.net Hide Users Options",function(){BNet.HideUser.loadUsers();BNet.HideUser.modals.editAll.__writeTable();BNet.HideUser.modals.editAll.show()})
                              }
                        }
                  }
               )
         },
      Post:
         {
            setState:
               function(wrap,state,show_edit) { // set show_edit = true if something from this user is hidden but posts aren't
                  var u,name=wrap.author.toLowerCase();
                  if(state===u){
                     state=BNet.HideUser.isHidden(name,"post");
                     if(!state&&BNet.HideUser.isHidden(name,false))
                        show_edit=true
                  }
                  if(!state){
                     wrap.removeMoreLink("hideuser-rehide");
                     if(!show_edit)
                        wrap.removeMoreLink("hideuser-edithide");
                     wrap.node.removeClass("DJCBNTHideUser").removeClass("hiding").find("div.DJCBNTHideUser_PostOverlay").remove()
                  }else{
                     wrap.removeMoreLink("hideuser-addhide");
                     this.addHidingOverlay(wrap)
                  }
                  this.addLinks(wrap,state,show_edit)
               },
            setAuthorState:
               function(user,state) { // if state == false, then post is to be non-hidden. if it's undefined, take state from stored prefs.
                  var u,i=0,user=user.toLowerCase(),P=BNet.Forums.Thread.getPostsByAuthor(user),show_edit=false;
                  if(state===u){
                     state=BNet.HideUser.isHidden(user,"post");
                     if(!state&&BNet.HideUser.isHidden(user,false))
                        show_edit=true
                  }
                  for(;i<P.length;i++)
                     this.setState(P[i],state,show_edit)
               },
            stopHide: function(wrap){var HU=BNet.HideUser,a=wrap.author.toLowerCase();HU.removeUser(a);HU.Post.setAuthorState(a)},
            addLinks:
               function(wrap,state,show_edit){ // set show_edit = true if something from this user is hidden but posts aren't
                  if(!state&&!show_edit){
                     if(wrap.author=="Banned user"||wrap.author=="Anonymous User (Deleted)")
                        return;
                     wrap.addMoreLink(
                        "hide this user",
                        function(e) {
                           var P=BNet.Forums.Thread._getPost($(this).attr("data-post-djc-id")),name=P.author.toLowerCase(),MeU=BNet.HideUser.modals.editUser;
                           BNet.HideUser.loadUsers();
                           MeU.__setFormState(name);
                           MeU.show();
                           e.preventDefault()
                        },
                        "hideuser-addhide"
                     ).closest("li").addClass("right")
                  }else{
                     wrap.addMoreLink(
                        "edit hide settings",
                        function(e){
                           var P=BNet.Forums.Thread._getPost($(this).attr("data-post-djc-id")),name=P.author.toLowerCase(),MeU=BNet.HideUser.modals.editUser;
                           BNet.HideUser.loadUsers();
                           MeU.__setFormState(name);
                           MeU.show();
                           e.preventDefault()
                        },
                        "hideuser-edithide"
                     ).closest("li").addClass("right");
                     if(!state)
                        return;
                     wrap.addMoreLink("re-hide post",function(e){$(this).closest("div.forum_item_outer_shell.DJCBNTHideUser").addClass("hiding");e.preventDefault()},"hideuser-rehide").closest("li").addClass("right")
                  }
               },
            addHidingOverlay:
               function(wrap) {
                  if(wrap.node.hasClass("DJCBNTHideUser"))
                     return;
                  wrap.node.addClass("DJCBNTHideUser").addClass("hiding").append("<div class='DJCBNTHideUser_PostOverlay'>This post was written by a user that you have hidden from view. <a href='#'>Click here</a> to unhide the post.</div>")
                     .find("div.DJCBNTHideUser_PostOverlay>a").click(function(e){$(this).closest("div.DJCBNTHideUser.hiding").removeClass("hiding");e.preventDefault()})
               }
         },
      hidePostsInThread: function(){var i=0,P=BNet.Forums.Thread.Post.list;for(;i<P.length;i++)this.Post.setState(P[i])},
      hideThreadsInForum:
         function() {
            var i=0,TL=BNet.Forums.ThreadList.Thread.list,name,O;
            for(;i<TL.length;i++) {
               name=TL[i].author.toLowerCase();
               if(!BNet.HideUser.isHidden(name,"thread"))
                  continue;
               O=TL[i].addOverlay("hideuser");
               O.addClass("hideuser").html("This thread was created by a user that you have hidden from view. <a href='#'>Click here</a> to unhide the thread.")
                  .find("a").attr("data-thread-djc-id",i).click(function(e){BNet.Forums.ThreadList._getThread($(this).attr("data-thread-djc-id")).hideOverlay("hideuser");e.preventDefault()});
               TL[i].addOption(
                  "Re-hide thread",
                  function(e){
                     var T=BNet.Forums.ThreadList._getThread($(this).attr("data-thread-djc-id"));
                     T.hideOptions();
                     T.showOverlay("hideuser");
                     e.preventDefault()
                  },
                  "hideuser-rehide"
               );
               TL[i].addOption(
                  "Stop hiding this user from view",
                  function(e){
                     var T=BNet.Forums.ThreadList._getThread($(this).attr("data-thread-djc-id"));
                     BNet.HideUser.removeUser(T.author.toLowerCase());

                     // v-- unhide other threads by user
                     var TL=BNet.Forums.ThreadList.getThreadsByAuthor(T.author.toLowerCase());
                     for(var i=0;i<TL.length;i++) {
                        TL[i].getOverlay("hideuser").remove();
                        TL[i].removeOption("hideuser-rehide");
                        TL[i].removeOption("hideuser-stophide")
                     }
                     e.preventDefault()
                  },
                  "hideuser-stophide"
               );
               TL[i].showOverlay("hideuser")
            }
         }
   };
// </HIDEUSER>

BNet.ReachFile =
   {
      Browsing:
         {
            GridHoverDetails:
               {

                  // When in the Grid View, hovering over a file shows its information.
                  // The information panel can be a bit unwieldy since it's done with 
                  // CSS. (E.x. it may get in the way if you try to move from one 
                  // thumbnail to another that's directly to the right.) I might tweak 
                  // it in the future.

                  init:
                     function() {
                        if(!BNet.Prefs.ENABLE_FILE_GRID_HOVER)
                           return;

                        GM_addStyle("\
div.fileShareListContainer>ul.fileGridList>li>div>div>a.thumbLink:hover+div.info,\n\
div.fileShareListContainer>ul.fileGridList>li div.info:hover{display:block;z-index:9001;left:100%;bottom:0}\n\
   div.fileShareListContainer>ul.fileGridList>li div.info{}\n\
      div.fileShareListContainer>ul.fileGridList>li div.info>div.content{padding-top:42px!important;padding-bottom:32px!important}\n\
            div.fileShareListContainer>ul.fileGridList>li div.info a.like{float:right}\n\
         div.fileShareListContainer>ul.fileGridList>li div.info h5{background:url(/images/reachStatsNew/bg_10white.png)}\n\
            div.fileShareListContainer>ul.fileGridList>li div.info h5>a{font-weight:bold}\n\
         div.fileShareListContainer>ul.fileGridList>li div.info h5+p{position:absolute;left:0;top:21px;width:100%;height:21px;background:url(/images/reachStatsNew/bg_10white.png);line-height:21px;text-align:left;text-indent:10px}\n\
         div.fileShareListContainer>ul.fileGridList>li div.info p.description{display:block!important;clear:none;margin-top:5px;text-align:left}\n\
         div.fileShareListContainer>ul.fileGridList>li div.info ul.actions{position:absolute;left:0;bottom:0;width:100%;height:22px;background:url(/images/reachStatsNew/bg_10white.png)}\n\
            div.fileShareListContainer>ul.fileGridList>li div.info ul.actions>li{float:left;padding:0 1em;margin:0;vertical-align:middle}\n\
               div.fileShareListContainer>ul.fileGridList>li div.info ul.actions>li a{float:none;padding:0;margin:0}\n\
            div.fileShareListContainer>ul.fileGridList>li div.info ul.actions>li.spam{float:right}")
                     }
               },
            init: function(){for(var i in this)if(this[i]&&this[i].init&&typeof this[i].init=="function")this[i].init()}
         },
      init: function(){for(var i in this)if(this[i]&&this[i].init&&typeof this[i].init=="function")this[i].init()}
   };

BNet.init();

// here for testing, commented out for release:
//unsafeWindow.DJCBNet = BNet;