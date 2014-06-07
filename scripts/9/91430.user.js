// ==UserScript==
// @name           greader-haiku-hatena
// @namespace      tag:neoteny.sakura.ne.jp,2009
// @description    はてなハイクをGoogle-Readerで読む人のために
// @include        https://www.google.tld/reader/view/*
// @include        http://www.google.tld/reader/view/*
// ==/UserScript==
(function(){

   var IMG_HAIKU = "data:image/gif;base64,"+
     "R0lGODlhEAAQAPcAAKROTNSqrMSChOzW1LRmZOTCxPzu9NSalMR2dPTi5LxubLRiXNy2tMyO"+
     "jLxqZOTKzNyurOza3LxmZPz%2B%2FNSipPTq7LxiZNySjOTOzHUA6CUAEncAAEUeh3UAlCUA"+
     "0ncAdgAg8wDsJAASAQAA60gFgPIA6LAAEgMAAEgBIPIA7LAAEgMAAAAg8wAAJAAQAQAA6wAP"+
     "AAAAAAAAAAAAALj%2FEub%2FABL%2FAAD%2FABH8DSXoAOcSAHYAAAAgBQDsAB8SAAAAAADM"+
     "BgDoAAASAAAAAEBCAPI8ALDSAAN2AFDzDJUkALwBAAPrAAAeFAAAAAAAAAAAAAAgkADsAQAS"+
     "AAAAAAAFJgAAZQAAbQAAdgAgxAAA4AAQ%2FQAAfwD8AADo8AAS%2FQAAfwAuAABnAB9pAABm"+
     "AFAAQ5UAOrwAXAMAVQB4cwDqZQAScgAAcxFeXxI8jFzS6pV2dhHzRQAkHHMBXADrlcMAAAAA"+
     "AAAAAAAAAJsAAI0AAOcAAHYAAFXwIBLqQlwSI5UAAAAAAAAAQAAAIwAAADgIvJUA6LwAEgMA"+
     "AAEdEAAACQAAtwAAAUgAGJUA6bwAEgMAAPDAieZg%2FRJx6QB2dupAxWboeCUSpHcA41Br%2"+
     "FpW1%2F7xt%2FwN2%2F3AcX2bojCUS6ncAdjQAkAAApAAA58AAdugAIOcBQhIAIwAAAG9lkY"+
     "gmhufn6nZ2dgAchQDoHR8SXAAAlQBPAAAgAADnAAB2AEhAAJXoALwSAAMAAAAAAAABAAAAAA"+
     "AAAGVlMCYmAOfnAHZ2AAAAAQEAAAAAAAAAACDh%2BADp6BASEgAAAP8MAf%2BhAP9PAP8AAF"+
     "hQyOcA%2BxIAEgAAAMNEiZHp%2FdIS6XYAdvMiNSQmcgHnpOt24w9w%2FgC9%2FwBP%2FwAA"+
     "%2Fx6ckQDIhgBP6gAAdiAAiOwBgRIAQgAAAAVAIADoQgASIwAAAAEAAAABAAAAAAAAACBD4Q"+
     "Am6RDnEgB2APwB5%2BgAJRIA5wAAdgEA6QAAHQAAXAB2lUP85zroJQAS5%2F8AdgUuagBncQ"+
     "BpSABmACH5BAAAAAAALAAAAAAQABAABwihACcIHEiwoMALFxokXKgQYQMJAh8qkCBhogMJBD"+
     "AqAHAwowICHxUoiCBAggOOEy4ocCAAggUHBCBMSEDg5EGMCSY0mNhgZkaUOyVEmEChpgUIAk"+
     "CivEBRQAGRIC28lAC0IkaKEw8YqLn0o4SdEyU8mGCBwNKKCiZUQLAgwAQGFc9mpEDwQVmbOi"+
     "fqPcAgqdWzeq0G3ihwI4DDiBMfNsiYYEAAOw%3D%3D";

   var IMG_PROGRESS =
     "data:image/gif;base64,R0lGODlhEAAQAPIAAP%2F%2F%2F8d8d%2FHf3tWdmsd8d9yuq%"+
     "2BO%2BvObGxCH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYW"+
     "QuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroU"+
     "mcG2LmDEwnHQLVsYOd2mBzkYDAdKa%2BdIAAAh%2BQQJCgAAACwAAAAAEAAQAAADNAi63P5O"+
     "jCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoA"+
     "AAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ"+
     "7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUh"+
     "DAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo%2FIpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAz"+
     "IIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo%2FIpFKSAAAh"+
     "%2BQQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2"+
     "G7sDX3lQGBMLAJibufbSlKAAAh%2BQQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu"+
     "2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAA"+
     "AAMyCLrc%2FjDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkA"+
     "AAOwAAAAAAAAAAAA%3D%3D";


   function getCurrentEntry() {
     return findNode(document, '//div[@id="current-entry"]');
   }

   function getCurrentEntryURL() {
     var currentEntry = findNode(
       document,
       '//div[@id="current-entry"]//a[@class="entry-title-link"][@href]'
     );
     return currentEntry ? currentEntry.href : null;
   }


   var InputMode = false;
   var ReplyForms = {};

   var Dialog = document.createElement('div');
   Dialog.style.cssText = [
     "position:fixed",
     "top:10px",
     "left:10px",
     "padding:10px",
     "background:#C99",
     "color:#FFF",
     "text-align:center",
     "-moz-border-radius:10px",
     "opacity:0.85",
     "font-size:300%",
     "display:none",
     "z-index:65536"
   ].join(";");
   document.body.appendChild(Dialog);
   var HideDialog = null;

   var dialog = function(msg, msec){
     msec = msec || 1000;
     if(HideDialog) clearTimeout(HideDialog);
     Dialog.innerHTML = "";
     Dialog.appendChild(document.createTextNode(msg));
     Dialog.style.display = "block";
     if(msec > 0){
       HideDialog = setTimeout(
         function(){
           HideDialog = null;
           Dialog.style.display = 'none';
         },
         msec);
     }
   };



   function findNode(root, xpath) {
	 try{
	   var result =
         document.evaluate(xpath, root, null,
                           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	   return result.snapshotItem(0);
	 }catch(e){
	   return null;
	 }
   }



   function withHTML(url, cont){
     GM_xmlhttpRequest(
       {
         url: url,
         method: 'GET',
         onload: function(res){
           var div = document.createElement('div');
           div.innerHTML = res.responseText.
             replace(/.*?<body[^>]*>/,'').
             replace(/<\/body.*/,'');
           cont(div);
         },
         onerror: function(res){
         }
       }
     );
   }

   function withHaikuEntry(url, cont){
     withHTML(
       url,
       function(div){
         var match = url.match(/([^\/]+)$/);
         var entry = {
           id:          match[1],
           url:         url,
           user:        null,
           profileIcon: null,
           body:        null,
           inReplyTo:   null,
           replies:     []
         };

         var body      = findNode(div, './/div[@class="entry"]');
         var icon      = findNode(body, './/img[@class="proflie-image"]');
         var repTo     = findNode(body,
                                  './/a[./img[@class="icon-reply-link"]]');
         var user      = findNode(body, './/span[@class="username"]/a');
         var timestamp = findNode(body, '//span[@class="timestamp"]/a');
         var title     = findNode(body, './/h2[@class="title"]/a');

         entry.body      = body.cloneNode(true);
         entry.keyword   = title.firstChild.data;
         entry.content   = findNode(body, './/div[@class="body"]');
         entry.user      = user.firstChild.data;
         entry.timestamp = timestamp.firstChild.data;

         if(repTo){
           repTo = repTo.cloneNode(true);
           var href = repTo.getAttribute("href");
           repTo.href = "http://h.hatena.ne.jp" + href;
           repTo.target = "_blank";
           findNode(repTo,'.//img').src =
             'http://h.hatena.ne.jp/images/icon-replylink.gif';
           entry.inReplyTo = repTo;
         }


         var reps = findNode(body, './/span[@class="replies"]');
         if(reps){
           var replinks = reps.getElementsByTagName('a');
           if(replinks){
             Array.prototype.forEach.apply(
               replinks,[
                 function(a){
                   a = a.cloneNode(true);
                   var href = a.getAttribute("href");
                   a.href = "http://h.hatena.ne.jp" + href;
                   a.target = "_blank";
                   entry.replies.push(a);
                 }
               ]
             );
           }
         }

         cont(entry);
       }
     );

   }



   var HATENA_ID = null;

   function iconURI(userid){
     return ( "http://www.st-hatena.com/users/" +
              userid.substring(0,2) + "/" +
              userid + "/profile.gif" );
   }


   function submitHaiku(data, handler){
     var body = (
       function(){
         var buf = [];
         for(var f in data){
           buf.push(encodeURIComponent(f)+'='+
                    encodeURIComponent(data[f]));
         }
         return buf.join("&");
       }
     )();

     GM_xmlhttpRequest(
       {
         url: "http://h.hatena.ne.jp/api/statuses/update.json",
         method: 'POST',
         headers: { "Content-Type": "application/x-www-form-urlencoded" },
         data: body,

         onload: function(res){
           if(res.status < 300){
             handler.onload(res);
           } else {
             handler.onerror(res);
           }
         },

         onerror: function(res){
           handler.onerror(res);
         }
       }
     );
   }

   function initField(input){
     input.addEventListener(
       'focus', function(){
         setTimeout( function(){InputMode = true;}, 10 );
       }, false
     );

     input.addEventListener( 'blur' , function(){ InputMode = false; }, false );
   }


   var TopForm = (
     function(){

       var container = document.createElement('div');
       container.innerHTML = <>
           <a href="javascript:undefined"
             style="    display:block;
             text-decoration: none;
                   font-size: 8px;
                      margin: 0px 0px 0px auto;
                  text-align: left;
                     display: table;
                       color: #FFF;
              letter-spacing: 2px;
                 font-weight: 900;"
            class="toggle-haiku-form"
                ><img src={IMG_HAIKU} style="border:none" /></a>
           <div class="haiku-top-form" style="display:none;">
             <div style="display:table-cell;
                         padding: 5px;
                         vertical-align: middle;"
                ><img class="profile-icon" width="32" height="32" /></div>
             <div style="display:table-cell">
               <label>keyword
                 <input type="text" name="keyword" size="40"
                       style="
                         background: rgba(255,255,255,1);
                       "
                     /></label>
               <textarea class="entry-body" name="body"
                         style="font-size:12px;
                               width: 40em;
                               height: 8em;
                               background: rgba(255,255,255,1);
                               margin: 1ex 0px;
                               display:block;">
               </textarea>
               <input type="button" value="haiku!" name="submit"
                      style="
                             border: solid #ABC 1px;
                             background: #FFF;
                            " />
         <!--
            <div class="haiku-viewer"
                 style="margin-top: 1em;
                         -moz-border-radius: 10px;
                         border-radius: 10px;
                         padding: 5px;
                         background: rgba(255,255,255,1);
                       "></div>
         -->
            </div>
           </div>
         </>;

       var toggle  = findNode(container,".//a[@class='toggle-haiku-form']");
       var forms   = findNode(container,".//div[@class='haiku-top-form']");
       var keyword = findNode(container,".//input[@name='keyword']");
       var status  = findNode(container,".//textarea[@name='body']");
       var submit  = findNode(container,".//input[@name='submit']");
       var icon    = findNode(container,".//img[@class='profile-icon']");
//       var hviewer = findNode(container,".//div[@class='haiku-viewer']");

       initField(keyword);
       initField(status);
       
       var hideForms = function(){
         forms.style.display = 'none';
         status.blur();
         keyword.blur();
       };

       var clearForms = function(){
           keyword.value = '';
           status.value = '';
       };

       submit.addEventListener(
         'click',
         function(ev){
           submitHaiku(
             {
               keyword: keyword.value,
               status: status.value
             },
             {
               onload: function(){
                 clearForms();
                 hideForms();
                 dialog('success!!');
               },
               onerror: function(res){
                 dialog('failed!! ' + res.responseText);
               }
             }
           );
           clearForms();
           hideForms();
         },
         false
       );

       container.style.cssText = [
         "position: fixed",
         "top: 30px",
         "z-index: 65536;",
         "right: 0px",
         "padding: 10px",
         "-moz-border-radius: 10px 0px 0px 10px",
         "border-radius: 10px 0px 0px 10px",
         "background-color: rgba(180,100,100,0.8)",
         "border: solid rgba(204,153,153,1) 1px",
         "color: #FFF"
       ].join(";");

       document.body.appendChild(container);
       toggle.addEventListener(
         'click',
         function(ev){
           forms.style.display = {
             table: 'none',
             none: 'table'
           }[forms.style.display];
         },
         false
       );

       return {
         container: container,
//         viewer: hviewer,
         setUserId: function(userid){
           icon.src = iconURI(userid);
         },
         setKeyword: function(val){
           keyword.value = val;
         },
         setStatus: function(val){
           status.value = val;
         },
         clear: clearForms,
         show: function(){
           forms.style.display = 'table';
           status.focus();
         },
         hide: hideForms
       };
     }
   )();

   (
     function(){
       withHTML(
         "http://www.hatena.ne.jp/", function(div){
           var idlink =
             findNode(div,
                      ".//ul[@class='menu']//li[@class='welcome']//a");
           if(idlink){
             HATENA_ID = idlink.firstChild.data;
             TopForm.setUserId(HATENA_ID);
             dialog("You are id:" + HATENA_ID + ".");
           } else {
             dialog("You do not login to Hatena.");
           }
         }
       );       
     }
   )();







   window.addEventListener(
     'keydown',
     function(ev){
       var curl = getCurrentEntryURL();

       if(InputMode){
         switch(ev.keyCode){

         case 82: //R
           if(!(ev.ctrlKey && ev.altKey)) break;
           if(!(curl &&
                curl.match(/^https?:\/\/h\.hatena\.(?:ne\.jp|com)/))) break;
           if(!ReplyForms[curl]) break;
           ReplyForms[curl].hide();
           ev.stopPropagation();
           return false;
           break;
           
         case 85: //U
           if(!(ev.ctrlKey)) break;
         case 27:
           TopForm.hide();
         }
         ev.stopPropagation();
         return false;
       }

       switch(ev.keyCode){

       case 82: //R
         if(!(ev.ctrlKey && ev.altKey)) break;
         if(!(curl &&
              curl.match(/^https?:\/\/h\.hatena\.(?:ne\.jp|com)/))) break;
         if(!ReplyForms[curl]) break;
         ReplyForms[curl].show();
         ev.stopPropagation();
         return false;
         break;

       case 83: //S
         if(!(ev.altKey && ev.ctrlKey)) break;
         var cent = getCurrentEntry();
         if(cent){
           var starButton =
             findNode(cent,'.//img[@class="hatena-star-add-button"]');
           if(starButton){
             var clickEvent = document.createEvent("MouseEvents");
             clickEvent.initMouseEvent(
               "click", true, true, window,
               0, 0, 0, 0, 0, false, false, false, false, 0, null
             );
             starButton.dispatchEvent(clickEvent);
             ev.stopPropagation();
             return false;
           }
         }
         break;

       case 85: //U
         if(!(ev.ctrlKey)) break;
         InputMode = true;
         TopForm.show();
         if(curl && curl.match(/^https?:\/\/h\.hatena\.(?:ne\.jp|com)/)){
           var titleNode = findNode(getCurrentEntry(),
                                   './/h2[@class="entry-title"]//a');
           var keyword = titleNode.firstChild.data;
           TopForm.setKeyword(keyword);
         }
         ev.stopPropagation();
         return false;
         break;
         }
       return true;
     },
     true
   );


   function insertProfileIcon(entry, userid){
     var title = findNode( entry, './/h2[@class="entry-title"]');
     var icon_uri = iconURI(userid);
     var icon    = new Image();
     icon.src = icon_uri;
     var haiku   = new Image();
     haiku.src   = IMG_HAIKU;
     var titleLink = findNode( title, ".//a");
     var keyword   = titleLink.firstChild.data;

     var haikuButton = document.createElement('a');
     haikuButton.href = 'javascript:undefined;';
     haikuButton.style.border = 'none';
     haikuButton.appendChild(haiku);
     haikuButton.addEventListener(
       'click',
       function(){
         TopForm.setKeyword(keyword);
         TopForm.show();
       },
       false
     );
     title.appendChild(haikuButton);
     title.insertBefore(icon, title.firstChild);
   };



   function buildReplyForm(spec){
     var keyword = spec.keyword;
     var entryId = spec.id;
     var replyform =
       <>
       <a href="javascript:undefined"
          style="    display:block;
             text-decoration: none;
                   font-size: 8px;
                      margin: 0px 0px 0px auto;
                  text-align: center;
                       width: 5em;
                       color: #FFF;
              letter-spacing: 2px;
                 font-weight: 900;
                  background: #C99;
          -moz-border-radius: 4px;
               border-radius: 4px;
                     padding: 2px;"
            class="toggle-haiku-form">reply</a
       ><form style="display:none;">
       <textarea class="entry-body" name="body"
                 style="font-size:12px;
                        width: 99%;
                        height: 8em;
                        display:block;">
       </textarea>
       <input type="button" value="haiku!"
              style="
                     border: solid #ABC 1px;
                     background: #FFF;
                    " />
       </form>
       </>;
     var replyContainer = document.createElement('div');
     replyContainer.innerHTML = replyform;
     replyContainer.style.margin = '1ex';
     var toggle = findNode(replyContainer, './/a[@class="toggle-haiku-form"]');
     var form   = findNode(replyContainer, './/form');
     var button = findNode(replyContainer, './/input[@value="haiku!"]');
     var status = findNode(replyContainer, './/textarea[@name="body"]');
     initField(status);

     toggle.addEventListener(
       'click',
       function(ev){
         form.style.display = {none: 'block',
                               block: 'none'}[form.style.display] || 'block';
         if(form.style.display == 'block'){
           status.focus();
         }
       },
       false
     );

     "click keydown keyup keypress".split(/\s+/).forEach(
       function(ev){
         replyContainer.addEventListener(
           ev,
           function(ev){
             ev.stopPropagation();
           },
           false
         );
       }
     );

     button.addEventListener(
       'click',
       function(ev){

         var data = {
           keyword: keyword,
           in_reply_to_status_id: entryId,
           status: status.value
         };

         submitHaiku(
           data,
           {
             onload: function(){
               status.value = '';
               form.style.display = 'none';
               dialog('success');
             },
             onerrror: function(res){
               dialog('failed!! ' + res.responseText);
             }
           }
         );

       },
       false
     );

     return {
       container: replyContainer,
       show: function(){
         form.style.display = 'block';
         status.focus();
       },
       hide: function(){
         form.style.display = 'none';
         status.blur();
       }
     };
   }

   var buildReplyBranch = function(url){
     var selfContainer = document.createElement('div');
     selfContainer.className = 'haiku-reply-branch';
     var progress = new Image();
     progress.src = IMG_PROGRESS;
     container.appendChild(selfContainer);
     selfContainer.appendChild(progress);
     withHaikuEntry(
       url,
       function(entry){
         progress.style.display = 'none';
         var repsPane = document.createElement('div');
         selfContainer.appendChild(repsPane);

         entry.replies.forEach(
           function(a){
             var url = a.href;
             a.href  = 'javascript:undefined';
             a.addEventListener(
               'click',
               function(ev){
                 var branch = buildReplyBranch(url);
               },
               false
             );
             repsPane.appendChild(a);
           }
         );
       }
     );
     return selfContainer;
   };


   // TODO insertReplyTreeWidget を仕上げる
   var insertReplyTreeWidget = function(entry, url){
     var grbody = findNode(entry,
                           './/div[@class="entry-body"]');
     var progress = new Image();
     progress.src = IMG_PROGRESS;
     grbody.insertBefore(progress, grbody.firstChild);
     withHaikuEntry(
       url,
       function(entry){
         progress.style.display = 'none';
         if(entry.inReplyTo){
           grbody.insertBefore(entry.inReplyTo,  grbody.firstChild);
         }
         var repsPane = document.createElement('div');
         grbody.appendChild(repsPane);


         entry.replies.forEach(
           function(a){
             var url = a.href;
             a.href  = 'javascript:undefined';
             var branch = null;
             a.addEventListener(
               'click',
               function(ev){
                 if(!branch){
                   branch = buildReplyBranch(url);
                   repsPane.appendChild(branch);
                 }
                 branch.displya.style = 'block';
               },
               false
             );
             repsPane.appendChild(a);
           }
         );
       }
     );
   };



   var MARKNAME = 'hatena-haiku-done';
   (function (){
      var entries = null;
      var l        = 0;
      try{
        entries = document.getElementById('entries').childNodes;
        l = entries.length;
      }catch(e){

      }

      for(var i=0; i<l; i++){
        var entry = entries[i];
        if(entry.getAttribute(MARKNAME)) continue;
        entry.setAttribute(MARKNAME, 'done');
        var entryURL = findNode( entry, 
                                 './/div[@class="entry-main"] '+
                                 '//a[@class="entry-original" or'+
                                 ' @class="entry-title-link"]/@href' );

        if(!entryURL) continue;

        var match = String(entryURL.value).match(
            /^https?:\/\/h\.hatena\.(?:ne\.jp|com)\/([^\/]+)\/(.*)/
        );
        if(!match) continue;
        var userid  = match[1];
        var entryId = match[2];

        insertProfileIcon(entry, userid);

        var entryTitleLinkNode =
          findNode( entry, './/a[@class="entry-title-link"]' );
        var cardContent =
          findNode( entry, './/div[@class="card-content"]');
        var keyword = entryTitleLinkNode.firstChild.data;
        var replyForm =  buildReplyForm(
          {
            url:     entryURL.value,
            keyword: keyword,
            id:      entryId
          }
        );
        cardContent.appendChild( replyForm.container );
        ReplyForms[entryURL.value] = replyForm;

        insertReplyTreeWidget(entry, entryURL.value);

      }

      setTimeout(arguments.callee, 10);
    })();

   
})();
