/*
 * LiveJournal Thread Expander with Expand All
 * version 0.92b
 * 2009-05-05
 * imc@livejournal.com
 * Released under the GPL license
 * http://www.gnu.org/copyleft/gpl.html
 *
 * 0.92b 2010-06-30 imc
 * - one-line change when LJ broke the JSdisabled detection hack
 * - one-line change to fix another "return" to "exit" (Opera friendliness)
 * 0.92 2009-05-05 imc
 * - update for dreamwidth.org's default style
 * - minor fixes to make more Opera-friendly
 * 0.90 2008-04-04 imc
 * - initial release

 */
// ==UserScript==
// @name LJ Thread Expander
// @namespace http://imc.livejournal.com/182062.html
// @description Expands collapsed LiveJournal threads in place - with Expand All
// @include http://*.livejournal.com/*
// @include http://*.dreamwidth.org/*
// ==/UserScript==

/* Experimental feature: don't handle nested frames (e.g. the ads).
   However, this means you can't embed your journal in a frameset. */
if (window != window.parent) exit;

/* unsafeWindow is a GreaseMonkey variable that gives you access to
   the document's original window object.  If it's not defined
   (Opera?) then try defaulting back to the original window. */
var myWindow;
if (typeof unsafeWindow == "undefined") myWindow = window;
else myWindow = unsafeWindow;

/* This is a hack to find out if JavaScript is disabled:
   test a core function that LiveJournal adds to all its pages */
var JSdisabled = (typeof myWindow.finite == "undefined");

/* Need the "LJ_cmtinfo" meta-info from the original comment page */
if (JSdisabled) myWindow.LJ_cmtinfo = getLJcmtinfo(document);
var info = myWindow.LJ_cmtinfo;
if (info == undefined) exit;

/* used later for copyIndent function */
var needIndent=1;
   
/* First find out whether LiveJournal has put Expand links on */
var allExpand = xpath("//a[contains(@onClick,'Expander')]");

/* If it has, fix them up - if not, create them */
makeExpandLinks(info);

/* If the page now has any Expand links, add an Expand All */
if (allExpand.length) addExpandAll();

/* That's all, except the function definitions... */

/* getLJcmtinfo(context)
 * If JavaScript is disabled, this function searches through the
 * page's scripts to find the one that sets the LJ_cmtinfo variable,
 * executes it and returns the result.  The context argument is
 * either the main window or the window of an iframe containing an
 * on-demand loaded comment thread.
 */
function getLJcmtinfo(context) {
   var scripts = context.getElementsByTagName('script');
   for (var i = scripts.length - 1; i >= 0; --i) {
      var src=scripts[i].innerHTML;
      if (/var LJ_cmtinfo/.test(src)) {
         eval(src);
         if (typeof LJ_cmtinfo != "undefined") return LJ_cmtinfo;
      }
   }
   my_log("Failed to find a script which sets LJ_cmtinfo");
   return undefined;
}

/* makeExpandLinks(info,root,expID)
 * This function is called (a) on the main page to fix up or create
 * Expand links for all comments, or (b) for each subsequently loaded
 * comment to fix up the Expand link on that comment.  In the latter
 * case, the caller checks to see that it does indeed need an Expand
 * link, and the expID is its talk ID.  In the former case, the
 * function is called with only one parameter; and in addition to
 * creating Expand links this function will record them in the
 * allExpand variable.
 *
 * If Expand links are already present and JavaScript is enabled in
 * the browser, this function does nothing.  If JavaScript is
 * disabled, it adds an event listener to each existing link.
 * If Expand links are not present then this function adds them.
 */
function makeExpandLinks(info,root,expID) {
   var localExpands;      // all existing Expand links
   var ismain = false;    // whether this is being called on the main page
   if (!root) {
      root = document;
      ismain = true;             // it is the main page
      localExpands = allExpand;  // Expand links have already been found
   } else {
      // find the existing Expand links for the comment in question
      localExpands = xpath("//a[contains(@onClick,'Expander')]", root);
   }

   /* If there are no Expand links, consider creating them */
   if (localExpands.length==0) {
      var idTest="contains(@id,'ljcmt')";
      if (expID) idTest="@id='ljcmt" + expID + "'";
      else if (!shouldAnyExpand(info))
         return; // no point unless at least one comment is collapsed

      /* find all relevant comments on the page and process them */
      var isUl = false;
      var allReplies = xpath("//div[" + idTest + "]/a[contains(@href, '?thread')] | //span[" + idTest + "]//td//a[contains(@href, '?thread')]", root);
      if (allReplies.length==0) {
         /* This detects the header and footer links in DreamWidth's default style */
         allReplies = xpath("//div[" + idTest + "]//div[@class='footer']//ul/li/a[contains(@href, '?thread')] | //div[" + idTest + "]//div[@class='comment-title']/a[contains(@href, '?thread')]");
         if (allReplies.length>0) isUl=true;
      }
      allReplies.forEach(function(a){
         var doUl=false;
         var url=a.href;
         var id=threadID(url);
         if (id == null) return;
         if (info[id] == null) return; // not a valid ID on this page

         var open = ' (';
         if (info[id].full) {
            /* Non-collapsed comments only get an Expand link if
               they have collapsed children [but if expID is supplied
               then this has already been checked]; it's only
               put next to the link that says "(Thread)", and it
               doesn't have a blank before the opening paren.
               (This is primarily for site-scheme comment threads
               and probably only works in English.) */
            if (a.innerHTML != "Thread") return;
            if (!expID && !shouldExpand(info,id)) return;
            open = '(';
            doUl=isUl;
         }
         /* Now create and add the Expand link between parens.  It
            will be added at the end of whatever structure contains
            the reply link, which is usually the right place. */
         var elt2=document.createElement("A");
         elt2.innerHTML="Expand";
         elt2.href=url;
         elt2.addEventListener("click", clickThread, false);
         if (doUl) {
            /* DreamWidth style has the comment interaction links
               inside an unordered list in the comment footer.
               No parens. */
            var elt1=document.createElement("LI");
            elt1.setAttribute('class','link parent'); /* hack to get a folder icon */
            elt1.appendChild(elt2);
            a.parentNode.parentNode.appendChild(elt1);
         } else {
            var elt1=document.createTextNode(open);
            var elt3=document.createTextNode(')');
            a.parentNode.appendChild(elt1);
            a.parentNode.appendChild(elt2);
            a.parentNode.appendChild(elt3);
         }
         /* and remember it for the main page */
         if (ismain) allExpand.push(elt2);
      });
   }
   /* If Expand links are already present but JavaScript is disabled,
      add an event listener. */
   else if (JSdisabled) {
      localExpands.forEach(function(a){
         a.setAttribute("onclick", ""); // mainly for debugging with JS on
         a.addEventListener("click", clickThread, false);
      });
   }
}

/* shouldAnyExpand(info)
 * Returns 1 if there are any collapsed comments on the page,
 *         0 otherwise.
 */
function shouldAnyExpand(info) {
   for (var id in info) {
      if (/^\d*$/.test(id) && !info[id].full) return 1;
   }
   return 0;
}

/* shouldExpand(info,id)
 * Checks whether a given comment can be expanded
 * Returns 1 if it is collapsed, 2 if it is full but has collapsed children
 *         0 otherwise.
 */
function shouldExpand(info,id) {
   var ans = 0;
   if (!info[id].full) return 1;
   info[id].rc.forEach(function(subid){
      if (ans==0 && info[subid] != null && !info[subid].full) ans=2;
   });
   return ans;
}

/* threadID(url)
 * Extracts the thread ID from the URL of a thread and returns it
 */
function threadID(url) {
   var ids=url.match(/thread=\d+/);
   if (ids == null) return null;
   else return ids[0].substr(7);
}

/* clickThread(event)
 * What happens when you click on an Expand link -
 * namely, accepts the click and calls expandThread.
 */
function clickThread(event) {
   event.preventDefault();
   expandThread(this);
}

/* expandThread(link)
 * Sets off a process to load a thread (either when the Expand link
 * is clicked or when executing Expand All).  The parameter is the
 * link that was clicked on.
 *
 * The link has a href attribute which points to the thread that must
 * be loaded.  It will be put in an invisible iframe appended to the
 * main document so that it can be parsed (then at the end the iframe
 * will be deleted again).  It's done by calling xmlhttpRequest
 * and then stuffing the data into the iframe because this way
 * avoids triggering any JavaScript (or indeed Greasemonkey) on the page.
 * An alternative method would be to just put the URL into the src
 * attribute of the iframe and let it load, but care would have to
 * be taken not to trigger this Greasemonkey script inside the iframe.
 *
 * Calling this function sets the "clicked" attribute of the link
 * to avoid re-executing while the load is in progress.  It is reset
 * (to 2, though that value is not currently used) when the load
 * completes although usually the link will then be superseded by
 * the expanded comment.
 */
function expandThread(link) {
   if (link.getAttribute('clicked')=='1') return;
   var url = link.href.replace(/#.*$/,'');
   var id = threadID(url);
   if (id == null) { // defensive programming
      my_log("expandThread called with no thread ID");
      return;
   }

   /* make the link look clicked-on */
   link.setAttribute('clicked','1');
   link.className = 'thread_loading';
   link.innerHTML=loading();
   link.blur();
   /* create the empty iframe */
   var iframe = document.createElement('iframe');
   iframe.style.display = 'none';
   iframe.style.width = '1px';
   iframe.style.height = '1px';
   document.body.appendChild(iframe);
   /* load the document, put it in the iframe and call copyCommentsFrom on it */
   GM_xmlhttpRequest({method: 'GET', url: url,
      onload: function (responseDetails) {
         iframe.contentDocument.defaultView.document.body.innerHTML = responseDetails.responseText;
         copyCommentsFrom(iframe,link,id);
      }});
}

/* copyCommentsFrom(iframe,caller,parentID)
 * An iframe containing the desired comments has just been loaded -
 * now copy them into the main document.  The "caller" is the Expand
 * link that was clicked on, and the parentID is its talk id.
 *
 * - get the LJ_cmtinfo for comments in the iframe
 * - any comment that's full in the iframe but collapsed in the main
 *   document will be copied across; in addition, the comment that
 *   was clicked on regardless of whether it was collapsed (this makes
 *   the Expand link go away unless the comment had more than 25 direct
 *   replies).
 * - The comments are copied by transferring the innerHTML of the <div>
 *   or <span> that has id=ljcmtxxxxx (where xxxxx is the talk id of the
 *   comment) from the iframe to the main document.
 * - For deep threads, some of the copied comments might need further
 *   expansion, so fix up the Expand link for any full comment that has
 *   collapsed children.  (Comments which are still collapsed will not
 *   be copied across so the original Expand link will still work.  In
 *   addition, the allExpand variable still contains the Expand links
 *   from the old comments and they still work if necessary, though
 *   they are no longer visible on screen.)
 * - in S1 the indentation of nested comments is provided by a dot.gif
 *   image of variable width.  This is dealt with by copyIndent by
 *   setting the about-to-be-copied comment to the same indentation
 *   as the about-to-be-replaced comment.  The needIndent variable was
 *   initialised to true when the document was first loaded but is set to
 *   false by copyIndent if it turns out not to be necessary.
 */

function copyCommentsFrom(iframe,caller,parentID) {
   var subdocument = iframe.contentDocument.defaultView.document;
   var subinfo=getLJcmtinfo(subdocument);
   if (subinfo == undefined) my_log("No LJ_cmtinfo in the iframe");
   else {
      var doExpand = shouldAnyExpand(subinfo); // whether to try to add Expand links
      for (var id in subinfo) if(/^\d*$/.test(id) && info[id] != undefined) {
         if ((subinfo[id].full && !info[id].full) || id==parentID){
            var dest=document.getElementById('ljcmt'+id);
            var src=subdocument.getElementById('ljcmt'+id);
            if (needIndent) copyIndent(src,dest); // from dest to src
            dest.innerHTML = src.innerHTML;
            if (doExpand && shouldExpand(subinfo,id)) makeExpandLinks(subinfo,dest,id);
            info[id].full = 1;
            myWindow.LJ_cmtinfo[id].full = 1; // in case the real LJ Expander gets at it
         }
      }
   }
   /* this link only still exists if something went wrong, but just in
      case, put it back to normal */
   caller.setAttribute('clicked','2');
   caller.className='thread_loaded';
   caller.innerHTML='Expand';
   /* and kill the temporary iframe as it has served its purpose */
   document.body.removeChild(iframe);

   /* Rarely, a comment has more than 25 direct replies.  In this case
      only the first 25 will get expanded and the original comment will
      still have an Expand link.  However, it's pointless clicking on it
      because it will only load the same 25 replies.  The following
      won't stop the user from doing so, but will alert the Expand All
      function that it ought to expand each remaining child thread
      instead of expanding the parent. */
   info[parentID].clicked=true;
   if (info[parentID].rc) info[parentID].rc.forEach(function(subid){
      if (info[subid] != null && !info[subid].full) info[subid].shouldExpand=true;
   });
}

/* findIndent(body)
 * Given the <div> containing a comment, finds a dot.gif inside it
 * or returns undefined.  This is used for setting the indentation of
 * nested comments.
 */
function findIndent(body) {
   var imgs = body.getElementsByTagName('img');
   var img, ok=false;
   for (var i=0; i<imgs.length; i++) {
      img=imgs[i];
      if (/dot\.gif$/.test(img.src)){
         ok=true;
         break;
      }
   }
   if (ok) return img;
   return undefined;
}

/* copyIndent(to,from)
 * Finds the indentation of the "to" and "from" comments and copies
 * the width from one to the other.  This is used for setting the
 * indentation of nested comments.
 * If there is no dot.gif, sets needIndent=0 so this function won't be
 * called again.
 */
function copyIndent(to,from) {
   var fromimg=findIndent(from);
   var toimg=findIndent(to);
   if (fromimg == undefined || toimg == undefined) {
      needIndent=0;
      return;
   }
   toimg.setAttribute('width',fromimg.getAttribute('width'));
}

/* expandAll() - called when someone clicks on the Expand All link
 * - use the list of Expand links recorded at document load time
 * - call expandThread for any comment where shouldExpand returns 2
 *   (except ones which have been expanded already).  This usually
 *   avoids loading many similar bits of the same subthread.
 *   [it fails in this case:
 *     o Full reply
 *       - Full reply
 *         + Collapsed reply
 *       - Collapsed reply
 *    where both full replies will get expanded, but this is unusual
 *    and is still much better than expanding every single comment.]
 * - occasionally the info will indicate that a comment should be
 *   expanded even when shouldExpand does not return 2 (see the
 *   end of copyCommentsFrom).
 */
function expandAll() {
   var count=0;
   allExpand.forEach(function(a){
      var url=a.href;
      var id=threadID(url);
      if (id == null) return;
      else if (info[id].clicked) return;
      else if (info[id].shouldExpand && !info[id].full) {
         info[id].shouldExpand=false;
         expandThread(a);
         count++;
      }
      else if (shouldExpand(info, id)==2){
         expandThread(a);
         count++;
      }
   });
   if (count>0) return;

   /* Occasionally a LiveJournal layout will fail to place Expand links
      on the (full) parent comments that need expanding, so the above
      will finish without actually doing anything.  In that case, set
      shouldExpand on each immediate collapsed child of a full comment 
      instead and try again. */
   /* But first check that there is actually anything to do */
   if (!shouldAnyExpand(info)) return;
   for (var id in info) {
      if(/^\d*$/.test(id) && info[id] != null && info[id].full) {
         if(shouldExpand(info,id)==2) {
            info[id].clicked=true;
            info[id].rc.forEach(function(subid) {
               if (!info[subid].full) {
                  count++;
                  info[subid].shouldExpand=2;
               }
            });
         }
      }
   }
   if (count>0) expandAll();
}

/* addExpandAll()
 * Add an Expand All link to the main page in an appropriate place.
 * Layout dependent - not all layouts implemented yet.
 */
function addExpandAll() {
   var spec="[contains(@href,'?mode=reply')]";
   var links;
   /* DreamWidth default style (somewhat dependent on taste) */
   links=xpath("//ul[@class='entry-interaction-links']/li/a" + spec);
   if (links.length>0) {
      links.forEach(function(a){
         var ul0=a.parentNode.parentNode;
         var li=document.createElement("li");
         li.setAttribute('class','edit_tags'); /* hack to get the folder icon */
         li.appendChild(makeExpandAllLink());
         var ul=document.createElement("ul");
         ul.setAttribute('class','entry-management-links');
         ul.appendChild(li);
         var div=document.createElement("div");
         div.setAttribute('style','text-align:center; font-weight:bold');
         div.appendChild(ul);
         ul0.parentNode.insertBefore(div,ul0.nextSibling);
      });
      return;
   }
   /* Expressive */
   links=xpath("//ul/li/a" + spec);
   if (links.length>0) {
      links.forEach(function(a){
         var li=a.parentNode;
         var elt = document.createElement("li");
         elt.appendChild(makeExpandAllLink());
         li.parentNode.appendChild(elt);
      });
      /* fall through */
   }
   /* Site scheme */
   /* Expressive (via bottom link) */
   links=xpath("//b/a" + spec);
   if (links.length>0) {
      links.forEach(function(a){
         var elt = makeExpandAllLink();
         a.parentNode.insertBefore(elt,a.nextSibling);
         elt = document.createTextNode(', ');
         a.parentNode.insertBefore(elt,a.nextSibling);
      });
      return;
   }
   /* Generator */
   links=xpath("//td/a" + spec);
   if (links.length>0) {
      links.forEach(function(a){
         var td=a.parentNode;
         var elt = document.createElement("td");
         elt.setAttribute('class','comments');
         elt.appendChild(makeExpandAllLink());
         td.parentNode.insertBefore(elt,td);
      });
      return;
   }
}

/* makeExpandAllLink()
 * returns a DOM object which is a link with text "Expand All"
 */
function makeExpandAllLink() {
   var elt = document.createElement("a");
   elt.innerHTML = "Expand all";
   elt.href = "javascript:void(0)";
   elt.addEventListener("click", expandAll, false);
   return elt;
}

/* loading() {
 * Returns an HTML string for the bit that says "Loading...".
 * The data for the spinning image came from the original script
 * by Tim Babych which is released under the GPL; however, it seems
 * to be fairly widespread across the Internet.
 * This doesn't set the link colour to black because the foreground and
 * background colours of the document are unknown.
 */
function loading() {
   return '<style type="text/css">' +
   'a.thread_loading {text-decoration:none; cursor:default; white-space:nowrap;}' +
   'a.thread_loading:hover {text-decoration:none; white-space:nowrap;}' +
   '</style>' +
   '<img border=0 src="data:image/gif;base64,' + 
'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' +
'fySDhGYQdDWGQyUhADs=">' +
   ' Loading&hellip;</span>';
}

/* xpath(path,root)
 * Runs an xpath query on the document or (if specified) on the desired root.
 * Returns the results in an array.
 */
function xpath(path,root) {
   var ans = [];
   if (!root) root = document;
   var xp = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i=xp.snapshotLength; --i>=0; ans.push(xp.snapshotItem(i)));
   return ans;
}

/* Debugging: log a message.  GreaseMonkey supplies GM_log for this; if it's
   not available then just throw the message away. */
function my_log(msg) {
   try
      { GM_log(msg); }
   catch(err) {}
}
