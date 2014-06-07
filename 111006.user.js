// ==UserScript==
// @name           Bungie.net Post Spider
// @namespace      DavidJCobb
// @description    Loops through every post in a thread. You can get a list of all Bungie Employee posts, all Ninja quotes, or you can save the entire thread as an encoded backup. v0.0.0.
// @include        http://*.bungie.net/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js
// ==/UserScript==

// <JQUERY-VERSION-CHECK>
// Check to ensure that users are using the right jQuery version.
// Script will prompt them to reinstall if they aren't.
if ($.fn.jquery != "1.5") {
   var last_logged = GM_getValue("jQueryVersion","");
   if (last_logged && last_logged != $.fn.jquery) {
      GM_setValue("jQueryVersion",$.fn.jquery);
      alert("Userscript alert: Bungie.net PM Tweaks\n\nDue to limitations in Greasemonkey, you must uninstall and reinstall this script in order to update it. Until you do so, the script will not function. I apologize for the inconvenience.\n\n(This dialog won't be shown again, so don't forget!)");
   }
   return;
} else
   GM_setValue("jQueryVersion","");
// </JQUERY-VERSION-CHECK>


// Sauce: http://jsfiddle.net/JFsht/1/
(function($){
    // include this fix to make jQuery work in Firefox 4 + Greasemonkey or Scriptish
    // mozMatchesSelector fix by Kambfhase
    if(!$('<div>').is('div') && $('<div>')[0].mozMatchesSelector){
        $.find.matchesSelector = function( node, expr ) {
            try {
                return node.mozMatchesSelector(expr);
            } catch(e){}
            return $.find(expr, null, null, [node]).length > 0;
        };
    }
})(jQuery);

function URL(s){var A=document.createElement("a");A.href=s;return({hash:A.hash,hostname:A.hostname,href:A.href,pathname:A.pathname,port:A.port,protocol:A.protocol,search:A.search})}

function $_GET(vName,url){var i=0,s=(url||location).search.replace(/^\?|(&)&+/g,"$1").split("&"),sl=s.length;for(;i<sl;i++){s[i]=s[i].split("=");if(s[i][0]==vName)return s[i][1]}}
function $_GETHASH(vName,url){var u;var s=unsafeWindow.document.documentURI;s=decodeURIComponent(s.substr(s.indexOf("#")+1));if(url&&url.hash!=u)s=decodeURIComponent(url.hash.substring(1));var i=0,s=s.replace(/(&)&+/g,"$1").split("&"),sl=s.length;for(;i<sl;i++){s[i]=s[i].split("=");if(s[i][0]==vName)return s[i][1]}}

function GM_unwrap(x){if(!x)return x;if(!x.jquery)return x.wrappedJSObject||XPCNativeWrapper.unwrap(x)||x;var a=$.makeArray(x),i=0,al=a.length;for(;i<al;i++)a[i]=GM_unwrap(a[i]);return $(a)}
function GM_runUnsafe(f){location.href="javascript:void(("+encodeURIComponent(f)+")());"}

// <REMOTEDOCUMENT>
function RemoteDocument(d){var u,i,E,ED,a;var d=d||{};d.events=d.events||{};d.event_data=d.event_data||{};var url=this.url=d.url||d.uri||d.src||d.path;this.document=null;this.loaded=false;this.timeout=d.timeout||null;for(i in {DOMContentLoaded:0,error:0}){E=d.events[i];ED=d.event_data[i]||[];if(E){if(E.call)E=[E];for(a=0;a<E.length;a++)$(this).bind(i,(ED[a]||{}),E[a])}}RemoteDocument.requests.queueRequest(this,url,this.timeout)}
RemoteDocument.prototype={_init:function(callback_type,response){if(callback_type=="error"){$(this).trigger("error");return}var d=document.implementation.createDocument("http://www.w3.org/1999/xhtml","html",null);var body=document.createElement("body");body.innerHTML=response.replace(/^[^\b]+?<body[^>]*?>|<\/body>[^\b]+$/gi,"");d.documentElement.appendChild(body);this.document=d;this.loaded=true;$(this).trigger("DOMContentLoaded")}};
$.extend(RemoteDocument,{requests:{_queue:[],_request:null,_timeout:null,queueRequest:function(RD,url,timeout){if(this._queue.push([RD, url, timeout])===1)this._iterate()},_iterate:function(){var RD=this._queue[0][0];var url=this._queue[0][1];var timeout=this._queue[0][2];clearTimeout(this._timeout);this._request=GM_xmlhttpRequest({method:"GET",url:url,onerror:RemoteDocument.requests._onerror,onload:RemoteDocument.requests._onload});if(timeout)this._timeout=setTimeout(function(){RemoteDocument.requests._ontimeout()},timeout);},_onerror:function(r){var RDR=RemoteDocument.requests;RDR._queue[0][0]._init("error",r.responseText||"");RDR._done();},_onload:function(r){var RDR=RemoteDocument.requests;RDR._queue[0][0]._init("load",r.responseText||"");RDR._done()},_ontimeout:function(r){if (!this._request||!this._queue.length)return;this._request.abort();clearTimeout(this._timeout);if (this._queue.length)this._iterate()},_done:function(){this._queue.shift();if(this._queue.length)this._iterate()}}});
// </REMOTEDOCUMENT>

// <MODALS>
function BNetDialog(d) {
   var u,d=d||{},EC,E,ED,L,LD,i,a;

   this.id = BNetDialog.list.push(this) - 1;
   this.modal = d.modal || d.blocking || false;
   this.dynamic_size = d.dynamic_size || d.dynamic;

   if (E=d.events) {
      ED = d.event_data||{};
      for(i in E) {
         L = E[i]||[];
         LD = ED[i]||[];
         if (L.call)
            L = [L];
         for(a=0;a<L.length;a++)
            $(this).bind(i,(LD[a]||{}),L[a]);
      }
   }

   this._createNode(d);
}
BNetDialog.prototype =
   {
      _createNode:
         function(d) {
            var d = d || {};
            this.node = $("<iframe class='"+BNetDialog.DIALOG_CLASS+"' data-dialog-id='"+this.id+"'></iframe>");
            if (this.modal)
               this.node.addClass("modal");
            var instance = this;
            this.node[0].addEventListener("load", function(){instance._isReady(d)}, true);
            document.body.appendChild(this.node[0]);
         },
      _isReady:
         function(d) {
            var CD = this.node[0].contentDocument;
            var CDB = $(CD.body);

            if (this.dynamic_size)
               CDB.addClass("dynamic");

            CDB.html("<i></i><i></i><i></i><i></i><div></div>");
            $("<style></style>").appendTo(CDB).html("\
body{position:relative;width:638px;padding:0;margin:0;border:1px solid #404040;background:rgba(0,0,0,.85);color:#BBB;font:12px/15px Arial,Helvetica,sans-serif}\n\
   a:link{color:#71CAEF;text-decoration:none}\n\
   a:visited{text-decoration:none}\n\
   a:active,\n\
   a:hover{color:#FFF;text-decoration:underline}\n\
   body>i{position:absolute;display:block;width:62px;height:59px;background-image:url(http://www.bungie.net/images/reachStats/sprite_glowCorners_62_59.png)}\n\
   body>i:first-child{left:-1px;top:-1px;background-position:left top}\n\
   body>i:first-child+i{right:-1px;top:-1px;background-position:right top}\n\
   body>i:first-child+i+i{left:-1px;bottom:-1px;background-position:left bottom}\n\
   body>i:first-child+i+i+i{right:-1px;bottom:-1px;background-position:right bottom}\n\
   body>div{position:relative;height:214px;padding:1em 19px} /* 1em should be 12px here */\n\
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

            this._bodyNode = CDB;
            this.contentNode = CDB.find("div");

            if (d.title)
               this.contentNode.append("<h1>"+d.title+"</h1>");

            var H = d.height || 240,
                W = d.width  || 640;

            this.node.attr("data-loaded","true").css("height", d.height+"px").css("width", d.width+"px");
            //this.reposition();

            $(this).trigger("ModalInitialized");
         },
      show:
         function() {
            if (this.modal && $("."+BNetDialog.DIALOG_CLASS+".modal.show").length)
               return;
            var E = jQuery.Event("ModalShow");
            $(this).trigger(E);
            if (E.isDefaultPrevented())
               return;
            this.node.addClass("show");
            BNetDialog.fade.addClass("show");
            this.reposition();
         },
      hide:
         function() {
            var E = jQuery.Event("ModalHide");
            $(this).trigger(E);
            if (E.isDefaultPrevented())
               return;
            this.node.removeClass("show");
            if (!$("."+BNetDialog.DIALOG_CLASS+".show").length)
               BNetDialog.fade.removeClass("show");
         },
      kill:
         function() {
            var E = jQuery.Event("ModalKill");
            $(this).trigger(E);
            this.node.remove();
            delete this.node;
            BNetDialog.list[this.id] = null;
            if (!$("."+BNetDialog.DIALOG_CLASS+".show").length)
               BNetDialog.fade.removeClass("show");
         },
      reposition:
         function() {
            var N = this.node, B = this._bodyNode, C = this.contentNode;
            if (!N.hasClass("show"))
               return;
            if (B.hasClass("dynamic")) {
               B.css("width","auto").css("height","auto");
               N.css("width",B.outerWidth()+"px").css("height",B.outerHeight()+"px").css("margin-top", N.height()/-2+"px").css("margin-left", N.width()/-2+"px");
               return;
            }
            var P = function(n){return [n.outerWidth()-n.width(),n.outerHeight()-n.height()]};
            N.css("margin-top", N.height()/-2+"px").css("margin-left", N.width()/-2+"px");
            B.css("width", N.width()-P(B)[0]+"px").css("height", N.height()-P(B)[1]);
            C.css("width", B.width()-P(C)[0]+"px").css("height", B.height()-P(C)[1]+"px");
         }
   };
$.extend(BNetDialog,
   {
      DIALOG_CLASS: "DJCBNetPMTweaksDialog",
      list: {length:0,push:Array.prototype.push},
      fade: $("<div id='DJCBNetPMTweaksDialogFade'></div>").appendTo(document.body),
      getDialog:
         function(n) {
            if (n.tagName.toLowerCase() != "iframe")
               n = n.ownerDocument.defaultView.frameElement;
            return this.list[Number($(n).attr("data-dialog-id"))];
         }
   }
);
// v-- block focus on the page if a modal dialog is open
$("body>div:not(#DJCBNetPMTweaksDialogFade)").bind("click dblclick focus keydown keypress keyup",
   function(e) {
      var MN = $("iframe.DJCBNetPMTweaksDialog.modal.show");
      if (!MN.length)
         return true;
      var CD = GM_unwrap(MN[0].contentDocument), B = CD.body;
      var I = $(B).find("*[tabindex],input:not(:hidden)").eq(0);
      if (I.length) {
         e.preventDefault();
         e.stopPropagation();
         I.focus();
         return false;
      }
      return true;
   }
);
GM_addStyle("\
iframe.DJCBNetPMTweaksDialog{position:fixed;z-index:18002;left:50%;top:50%;width:0;height:0;padding:0;margin:0;border:0}\n\
iframe.DJCBNetPMTweaksDialog[data-loaded]{display:none}\n\
iframe.DJCBNetPMTweaksDialog.show{display:-moz-initial;width:640px;height:240px;margin:-100px -320px}\n\
#DJCBNetPMTweaksDialogFade{position:fixed;z-index:18001;display:none;left:0;top:0;width:100%;height:100%;padding:0;margin:0;border:0;background:rgba(0,0,0,.4)}\n\
#DJCBNetPMTweaksDialogFade.show{display:block}");
// </MODALS>

Spider =
   {
      crawlThread: function(){arguments.callee.go.apply(arguments.callee,arguments)}
   };
$.extend(Spider.crawlThread,
   {
      _queue: [], // thread ID, post check function, callback, current page, last page, found posts, tID validated
      ERROR_BAD_URL: "That URL does not lead to a forum post or thread.",
      go:
         function(tID, check, callback, progress) {
            if (this._queue.push([tID, check, callback, 1, 1, [], false, progress]) === 1)
               this._iterate();
         },
      _validate_thread_id:
         function() {
            var Q = this._queue[0];
            var tID = Q[0];
            var page = Q[3];

            var url = "http://" + location.hostname + "/Forums/posts.aspx?postID=" + tID;
            if (page > 1)
               url += "&postRepeater1-p=" + page;

            GM_xmlhttpRequest(
               {
                  method: "HEAD",
                  url: url,
                  onload:
                     function(response) {
                        if (!response.finalUrl)
                           GM_log("\nBNet Spider: Spider.crawlThread: No finalUrl in the response!");

                        var gUIT = Spider.crawlThread;
                        var fU = URL(response.finalUrl);
                        var ID = $_GET("postID",fU);

                        if (fU.pathname.toLowerCase() != "/forums/posts.aspx")
                           throw "\nThread ID validation: we got redirected to somewhere that isn't a forum thread!";
                        if (ID && ID != gUIT._queue[0][0])
                           gUIT._queue[0][0] = ID;
                        gUIT._queue[0][6] = true;

                        gUIT._iterate();
                     },
                  onerror:
                     function(response) {
                        throw "\nThread ID validation: the XMLHttpRequest failed!";
                     }
               }
            );
         },
      _iterate:
         function() {
            var Q = this._queue[0];
            var tID = Q[0];
            var page = Q[3];

            if (!Q[6])
               return this._validate_thread_id();

            var url = "http://" + location.hostname + "/Forums/posts.aspx?postID=" + tID;
            if (page > 1)
               url += "&postRepeater1-p=" + page;

            this._RD = new RemoteDocument({url:url,events:{DOMContentLoaded:function(){Spider.crawlThread._iteration_response(this)},error:function(){Spider.crawlThread._iterate()}}});
         },
      _wrap_post:
         function(post_node) {
            var O = {}, PN = $(GM_unwrap(post_node));
            var uA = PN.find("a[id$='postControl_skin_usernameLink']"),
                pB = GM_unwrap(PN.find("p[id$='postControl_skin_PostBlock']"));

            O.isBanned = false;
            if (!post_node.children.length || !uA.length) {
               O.isBanned = true;
               return O
            }

            O.post_id = PN.find("a[id$='postControl_skin_hlAnchor']").attr("name") || -1;
            O.user = uA.text();
            O.user_id = uA[0].href.replace(/[^\b]*[?&]memberID=(\d+)(?:&[^\b]*)?$/i,"$1");
            O.date = new Date(PN.find("li.date").text().replace(/\./g,"/"));

            O.isBungieEmployee = pB.attr("style") == "color:#ffd224;";
            O.isForumNinja = pB.attr("style") == "color:#ff9966;";
            O.textContent = pB.html();

            return O
         },
      _iteration_response:
         function(RD) {
            var Q = this._queue[0];
            var tID = Q[0];
            var check = Q[1];
            var callback = Q[2];
            var page = Q[3];
            var last_page = Q[4];
            var matches = Q[5];

            var D=GM_unwrap(RD.document),DID=function(){return D.getElementById.apply(D,arguments)};

            if (!DID("ctl00_mainContent_subjectBar"))
               throw "Not a forum thread page?";

            var LP;
            if (LP = GM_unwrap(DID("ctl00_mainContent_cp1_skin_lastPage")))
               last_page = (LP.className == "nextendoffimg") ? page : LP.href.replace(/[^\b]*[?&]postRepeater1-p=(\d+)(?:&[^\b]*)?$/i,"$1");
            else
               last_page = 1;
            Q[4] = last_page;

            if (!matches.length)
               matches.push(DID("ctl00_mainContent_subjectBar").getElementsByTagName("li")[0].textContent.substring(9));

            var i = 0;
            for(;i<=24;i++) {
               var ctl = (i < 9 ? "0" : "") + (i + 1);
               var post = DID("ctl00_mainContent_postRepeater1_ctl" + ctl + "_ctl00_post_display_container");
               var u_link = DID("ctl00_mainContent_postRepeater1_ctl" + ctl + "_ctl00_postControl_skin_usernameLink");

               if (!post)
                  break;

               if (!post.children.length || !u_link) // hidden post from banned user
                  continue;

               var post_obj = this._wrap_post(post);
               if (!check(post_obj))
                  continue;
               matches.push(post_obj);
            }

            delete this._RD.document;
            delete this._RD;
            delete RD;
            delete DID;
            delete D;

            Q[4] = last_page;
            Q[5] = matches;

            this._iteration_end();
         },
      _iteration_end:
         function() {
            var Q = this._queue;
            Q[0][3]++;
            (Q[0][7]||function(){})(Q[0][3],Q[0][4],Q[0][5].length-1);
            if (Q[0][3] > Q[0][4]) {
               Q[0][2](Q[0][5]);
               Q.shift();
            }
            if (Q.length)
               this._iterate()
         }
   }
);

SpiderProgress =
   {
      bungie: false,
      ninjas: false,
      archive: false,
      check:
         function(post) {
            if (this.archive)
               return true;
            if (this.bungie && post.isBungieEmployee)
               return true;
            if (this.ninjas && post.isForumNinja)
               return true;
            return false;
         },
      progress:
         function(page, last, found) {
            SpiderDialog.progress(page, last, found);
         },
      callback:
         function(results) {
            var thread_title = results[0];
            SpiderDoneDialog.contentNode.find("h2").text(results[0]);
            var UL = SpiderDoneDialog.contentNode.find("ul.results");
            var TB = SpiderDoneDialog.contentNode.find("textarea");
            UL.children().remove();
            var html = "";
            if (this.archive) {
               UL.css("display","none");
               TB.css("display","");
               if (confirm("The spider script found " + (results.length-1) + " posts.\n\nThe archival process involves converting the entire thread -- and all of the data that this script records -- into a single encoded chunk of text data. When a thread has a large number of posts, this process can be extremely slow. The browser may hang for several seconds, several minutes, or indefinitely (forcing you to crash it). Generally, anything over 1000 posts is impractical if not impossible to successfully encode and archive.\n\nAre you sure you want to complete the archival process?\n\nClick \"OK\" to continue the process.\nClick \"Cancel\" to abort."))
                  TB.val(JSON.stringify(results));
            } else {
               UL.css("display","");
               TB.css("display","none");
               for(var i=1;i<results.length;i++) {
                  html += "<li><a href='http://www.bungie.net/Forums/posts.aspx?postID=" + results[i].post_id + "' style='font-weight:bold'>Post #" + results[i].post_id + "</a> by ";
                  if (results[i].isBungieEmployee)
                     html += "Bungie Employee ";
                  if (results[i].isForumNinja)
                     html += "Forum Ninja ";
                  html += "<a href='http://www.bungie.net/Account/Profile.aspx?memberID=" + results[i].user_id + "'>" + results[i].user + "</a></li>";
               }
               GM_unwrap(UL[0]).innerHTML = html;
            }
            SpiderDialog.hide();
            SpiderDialog.progress(-1, -1, -1);
            SpiderDoneDialog.show();
         }
   };

SpiderDialog =
   new BNetDialog(
      {
         title: "BNet Thread Spider",
         events:
            {
               ModalInitialized:
                  function(){
                     var M = SpiderDialog;
                     var CD = M.node[0].contentDocument;
                     var CDB = $(CD.body);

                     M.contentNode.append("\
   <ul class='form-list'>\n\
      <li>\n\
         <label for='thread-path'>Thread URL:</label>\n\
         <input type='text' id='thread-path'> \n\
      </li>\n\
   </ul>\n\
   <ul class='form-list'>\n\
      <li>\n\
         <input type='checkbox' id='archive-all'> \n\
         <label for='archive-all'>Scan and archive all posts in the thread</label>\n\
      </li>\n\
   </ul>\n\
   <hr>\n\
   <ul class='form-list cant-if-archive'>\n\
      <li>\n\
         <input type='checkbox' id='find-bungie'> \n\
         <label for='find-bungie'>Find posts by Bungie employees</label>\n\
      </li>\n\
      <li>\n\
         <input type='checkbox' id='find-ninjas'> \n\
         <label for='find-ninjas'>Find posts by Forum Ninjas</label>\n\
      </li>\n\
   </ul>\n\
   <div id='progress-container'>\n\
      <ul id='form-buttons' class='form-buttons'>\n\
         <li><input type='button' value='Scan Thread'></li>\n\
         <li><input type='button' value='Cancel'></li>\n\
      </ul>\n\
      <div id='progress-bar' style='display:none'>\n\
         <i></i><span>0%</span><span>(page 0 of 0, found 0)</span>\n\
      </div>\n\
   </div>");
                     CD.body.appendChild(document.createElement("style")).innerHTML = "\
body>div>h1{margin:0 0 10px 0;color:#FFF}\n\
   #progress-bar{position:relative;height:1.5em;border:1px solid #000;line-height:1.5em}\n\
      #progress-bar>i{position:absolute;z-index:0;left:0;top:0;bottom:0;background:#0A0}\n\
      #progress-bar>span{position:relative;z-index:0;margin-left:2em;font-weight:bold}\n\
      #progress-bar>span+span{float:right;margin:0 2em 0 0;font-style:italic;font-weight:normal}"

                     M.contentNode.find("[id='archive-all']").click(
                        function(e) {
                           $(this).closest("ul.form-list").siblings("ul.form-list.cant-if-archive").find("input")[ ["removeA","a"][!!this.checked+0] + "ttr" ]("disabled","disabled");
                        }
                     );

                     M.contentNode.find("input[value='Cancel']").click(function(e){BNetDialog.getDialog(this).hide();});

                     M.contentNode.find("input[value='Scan Thread']").click(
                        function(e) {
                           var D = BNetDialog.getDialog(this), cN = D.contentNode;
                           var archive = cN.find("input[id='archive-all']")[0].checked;
                           var sBungie = cN.find("input[id='find-bungie']")[0].checked && !archive;
                           var sNinjas = cN.find("input[id='find-ninjas']")[0].checked && !archive;
                           SpiderProgress.archive = archive;
                           SpiderProgress.bungie = sBungie;
                           SpiderProgress.ninjas = sNinjas;
                           var tURL = cN.find("input[id='thread-path']").val();
                           D.progress(0, 1, 0);
                           Spider.crawlThread($_GET("postID",URL(tURL)), function(post){return SpiderProgress.check(post)}, function(results){SpiderProgress.callback(results)}, function(){SpiderProgress.progress.apply(SpiderProgress,arguments)});
                        }
                     );

                     M.progress =
                        function(page, last_page, found) {
                           if (page < 0 || last_page < 0 || found < 0)
                              return M.contentNode.find("div[id='progress-bar']").css("display","none").siblings("ul[id='forum-buttons']").css("display","");
                           var P = Math.round(page / last_page * 100);
                           M.contentNode.find("div[id='progress-bar']").css("display","").siblings("ul[id='forum-buttons']").css("display","none");
                           M.contentNode.find("div[id='progress-bar']").children("i").css("width", P + "%").next("span").text(P + "%").next("span").text("(page " + page + " of " + last_page + ", found " + found + ")");
                        };
                  }
            }
      }
   );
SpiderDoneDialog =
   new BNetDialog(
      {
         title: "BNet Thread Spider",
         events:
            {
               ModalInitialized:
                  function(){
                     var M = SpiderDoneDialog;
                     var CD = M.node[0].contentDocument;
                     var CDB = $(CD.body);

                     M.contentNode.append("\
   <h2>Thread Title</h2>\n\
   <ul class='results'>\n\
      <li>\n\
         <a href=''>Post ######</a> by Bungie Employee <a href=''>Username</a>\n\
      </li>\n\
   </ul>\n\
   <textarea id='archive-contents' style='display:none'></textarea>\n\
   <hr>\n\
   <ul id='form-buttons' class='form-buttons'>\n\
      <li><input type='button' value='Close'></li>\n\
   </ul>");
                     CD.body.appendChild(document.createElement("style")).innerHTML = "body>div>h1,body>div>h2{margin:0 0 10px 0;color:#FFF}"

                     M.contentNode.find("input[value='Close']").click(function(e){BNetDialog.getDialog(this).hide();});
                  }
            }
      }
   );

GM_registerMenuCommand("BNet Thread Spider",
   function(){
      SpiderDialog.show();
   }
);