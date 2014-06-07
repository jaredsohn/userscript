// ==UserScript==
// @name        Resort Disqus Comments, newest/best thread first, works in AVClub.
// @description Disqus "newest first" or "best rating" only sorts by the top of the thread. Use this script to sort by the newest/best comment anywhere in the thread. Based on "Flat Disqus Comments", http://userscripts.org/scripts/show/98362
// @version     0.3
// @downloadURL http://userscripts.org/scripts/source/160818.user.js
// @updateURL   http://userscripts.org/scripts/source/160818.meta.js
// @namespace   http://xresortdisqus.example.com
// @include     http*
// @grant       GM_registerMenuCommand
// ==/UserScript==

///////////////////////////////////////////////////////////////////////
// Disqus "newest first" or "best rating" only sorts by the top of the thread.
// Use this script to sort by the newest/best comment anywhere in the thread.
// Also adds the age or rating to the top of each thread, in blue text.
// and highlights in blue the newest/best value within the thread.
// Works in AVClub at least.
// http://userscripts.org/scripts/show/160818
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Does nothing unless you click "Resort Disqus!" in the
// Greasemonkey menu "User Script Commands".
///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
// Change log
///////////////////////////////////////////////////////////////////////
// Version 0.3 (2013/05)
//   New features
//     * Sort by Newest First, or by Best Rating.
//     * Highlight the newest/best value in blue text.  
//     * Script update notifications should happen now (this was actually in ver 0.2)    
//     * Simplify DOM code.
//   Issues:
//     * Previous issues 2 through 7 are not fixed.
//     * In previous issues, subsitute "newest/best" for "most recent";
//       "Newest first/Best rating" for "Newest first"; and
//       "age/rating text" for "age text".
// Version 0.2.1 (2013/05)
//   Bug fix
//     * Turn debug off!
// Version 0.2 (2013/05)
//   New features
//     * Works on first through last page of comments.
//     * More information in the alert when done.
//     * Alerts if the script fails, usually.
//   Issues:
//     Previous issues 2 through 5 are also not fixed.
//     7. Sorting is only within each page of comments.
//        For example, the most recent comment could still be nested on the
//        last page, because that is how Disqus sorts.
//     6. Skips any nested comments at the top of a page. No comments are
//        skipped on the first page, because that page starts unnested.
// Version 0.1 (2013/02)
//   Issues:
//     5. Comments must already be sorted by "Newest first".
//     4. If you leave a comment, it will *seem* to go to the wrong thread.
//        But it actually went to the right thread.
//     3. Similarly, after you leave a comment, this script may not work
//        until you reload the page.
//     2. If you run the script twice, the age text at the top of each
//        thread (in blue text) is duplicated.
//     1. Only works on first page of comments.
///////////////////////////////////////////////////////////////////////


GM_registerMenuCommand("Resort Disqus!", ResortDisqus, "r");
// This line may cause a false error when using the script editor.


//////////////////
function ResortDisqus() {
   
  var debug= false;
  // if (debug) alert('Resorting Disqus, newest/best thread first...');
  if (debug) unsafeWindow.console.clear();

  ////////////////////////////////////////////////////////////////////
  // Need the user to have the comments to be already sorted
  // "by newest first", otherwise nesting will be wrong.
  ////////////////////////////////////////////////////////////////////
  var currentsort= document.getElementById('dsq-sort-select');
  if (! currentsort) {
    alert('Not a Disqus comment page?');
    return;
  }
  var csort= currentsort.value;
  switch (csort) {
  case 'newest':
    break;
  case 'best':
    break;
  default:  
    if (debug) unsafeWindow.console.log('currentsort=' + csort);
    alert('Please "Sort by newest first" or "Sort by best rating" and try again');
    return;
  }
  
  ////////////////////////////////////////////////////////////////////
  // Code from "Flat Disqus Comments" to get the comment list.
  ////////////////////////////////////////////////////////////////////
  // var oldul = document.getElementById('dsq-comments');

  ////////////////////////////////////////////////////////////////////
  // Disqus after the first page produces a noncompliant DOM with
  // a duplicate element <ul id="dsq-comments">.
  // Use a helper function to get the last matching element.
  ////////////////////////////////////////////////////////////////////
  var oldul= get_last_element_by_tagname_and_tolerant_id('ul', 'dsq-comments', debug);

  if (! oldul) {
    alert('Cannot get Disqus comments.');
    return;
  }

  var sorted = Array();
  var allComments = document.evaluate(
      "//li[starts-with(@class, 'dsq-comment ')]",
      oldul,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
  );

  ////////////////////////////////////////////////////////////////////
  // Now get info to sort by and display.
  ////////////////////////////////////////////////////////////////////

  var cmax= 0;  // In each thread, find the newest/best comment.
  var cpromptmax= '';
  // Newest will have the highest comment id assigned by Disqus.
  // Best will have the highest parsed value 'clike'.
  
  var started= -1;  // First index we can sort.
  var dfndct= 0; // debug only
  var dsts= '';  // debug only
  var dthreadct= 0; // debug only

  for (var i=0; i < allComments.snapshotLength; i++) {
    // Note "Flat Disqus Comments" uses allComments.snapshotLength-1 for some reason.
  
    // Copy each dsq-comment li element. Note the Disqus ul list is not nested.
    var cnode= allComments.snapshotItem(i).cloneNode(true);
  
    /////////////////////////////////////////////////////////////////////
    // Get the comment depth from the cnode class names.
    /////////////////////////////////////////////////////////////////////
    // Example:
    //   <li id="dsq-comment-818301055"
    //    data-dsq-comment-id="818301055"
    //    class="dsq-comment dsq-clearfix dsq-depth2 "
    //    style="margin-left:80px;">
    // Note all this stuff is created by Disqus js,
    // so it's not in the html view-source.
    /////////////////////////////////////////////////////////////////////
        
    var m= cnode.className.match(/\bdsq-depth(\d+)\b/);
    if (! m) {
       alert('ERROR: no dsq-depth');
       return;
    }
    var cdepth= m[1];
    
    ///////////////////////////////////////////////////////////////////
    // The first page of comments always starts with depth==0,
    // but subseqent pages may not.
    // Skip any nested stuff (depth > 0) at the top,
    // because there we don't have the full tree.
    ///////////////////////////////////////////////////////////////////
        
    if (started == -1) {
        if (cdepth==0) {
            // Found first full tree.
            // On the first page, it's always i==0.
            // On other pages it *may* be greater.
            started= i;
        }
    }
           
    if (started == -1) {
        // if (debug) unsafeWindow.console.log("SKIP: " + i);
        
    } else {
        if (cdepth==0) {
        // At the top of a thread, so reset the max comment id.
            if (! set_last_thread_props(sorted, cmax, cpromptmax, csort)) {
                alert('ERROR: cannot set props');
                return;
            }    
            cmax= 0;
            cpromptmax= '';
            if (debug) {
                dthreadct++;
            }
        }

        var cid= cnode.getAttribute('data-dsq-comment-id');
        if (! cid) {
            alert('ERROR: cannot get comment id');
            return;
        }
            
        /////////////////////////////////////////////////////////////////////////
        // Could just sort by the data-dsq-comment-id, but want the nice prompts,
        // such as "42 minutes ago". Have to parse the DOM for that.
        ///////////////////////////////////////////////////////////////////////
            
        if (! set_xflatcs(cnode)) {
            alert('ERROR: links not found');
            return;
        }

        var cprompt;
        var cval= 0;
        switch (csort) {
        case 'newest':
            cprompt= cnode.xflatcage.textContent.trim();
            cval= +cid;  // + makes it int
            break
        case 'best':
            cprompt= cnode.xflatclike.textContent.trim().replace(/\s+/, ' ');
            if (m= cprompt.match(/^(\d+) Like/)) {
                cval= m[1];
                cval= +cval; // + makes it int
            }
            break;
        default:
            return;
        }
        // if (debug) unsafeWindow.console.log("i=" + i + ", cval=" + cval);


        ////////////////////////////////////////////////////////
        // Start assigning data to the cnode, with a "xflatc*" namespace
        ////////////////////////////////////////////////////////
        // Assign an age/rating prompt to the top of each thread.
        // It reflects the newest/best comment anywhere in the thread,
        // and will be shown in blue text.
        // Example: "42 minutes"
        ////////////////////////////////////////////////////////
           
        cnode.xflatcpromptshow= cdepth==0 ? cprompt : '';   // Only top of thread gets a prompt.
        cnode.xflatcprompt= cprompt;
        cnode.xflatcmax= cmax;                          // Every node gets the common thread max value, for sorting.
                                                        // Value will change.
        cnode.xflatcdepth= cdepth;                      // Every node gets a depth.

        ////////////////////////////////////////////////////////            
        // Go ahead and put the node on the stack.
        ////////////////////////////////////////////////////////            
        sorted.push(cnode);

        if (cval > cmax) {
            // Found newest/best comment.
            // Always true for top comment, since reset cmax=0, see above.
            if (debug) unsafeWindow.console.log("found max comment, i=" + i + ", cval=" + cval + ", was=" + cmax + ", dthread=" + dthreadct);
            cmax= cval;
            cpromptmax= cprompt;
        }
    }
  }

  if (! set_last_thread_props(sorted, cmax, cpromptmax, csort)) {
    alert('ERROR: cannot set last props');
    return;
  }

  var allct= allComments.snapshotLength;
  
  if (sorted.length) {
  
    if (debug) unsafeWindow.console.log("len=" + sorted.length + ", starting at " + started + " of " + allct);

    // sorted.sort(byCommentId);  // "Flat Disqus Comments" sorts by comment id.
    sorted.sort(byCmax);  // Sort by thread max val
  
    for (var i=0; i<sorted.length; i++) {
        // sorted[i].style.marginLeft='0px';  // "Flat Disqus Comments" flattens the display.
  
        /////////////////////////////////////////////////////////////////////////////////
        // Complicated non-jQuery way to add blue text prompt to the top of the thread.
        /////////////////////////////////////////////////////////////////////////////////
        var cprompt= sorted[i].xflatcpromptshow;
        if (cprompt) {
            var tprompt;
            switch(csort) {
            case 'newest':
                tprompt= "Newest: " + cprompt;
                break;
            case 'best':
                tprompt= "Best: " + cprompt;
                break;
            }
            var newElement = document.createElement('p');
            
            newElement.setAttribute('style', 'float: right; color: blue;');
            var newContent = document.createTextNode(tprompt);
            newElement.appendChild(newContent);
            var theFirstChild = sorted[i].firstChild;
            sorted[i].insertBefore(newElement, theFirstChild);
        }
    
        try {    
            /////////////////////////////////////////////////////
            // OK, back to "Flat Disqus Comments" logic!
            // But need the offset 'started'.
            /////////////////////////////////////////////////////
            oldul.replaceChild(sorted[i], allComments.snapshotItem(i + started));
        } catch(e) {
            if (debug) unsafeWindow.console.log(e);
            alert('ERROR: cannot replace element at i=' + i);
            return;
        }
    }
    
    var note;
    if (started) {
        var s= started==1 ? '' : 's';
        note= ' (skipped the first ' + started + ' nested comment' + s + ' of ' + allct + ' total)';
    } else {
        var s= allct==1 ? '' : 's';
        note= ' (' + allct + ' total comment' + s + ')';
    }
    alert('Resorted Disqus, ' + csort + ' thread first' + note + '.');
    
  } else {
  
    var s= allct==1 ? '' : 's';
    alert('Not resorting Disqus, all ' + allct + ' comment' + s + ' are nested.');
    
  }
}



////////////////////////////////////////////////////////////////////
// Sorting function.
////////////////////////////////////////////////////////////////////
function byCmax(a, b) {
  return b.xflatcmax - a.xflatcmax;
}



////////////////////////////////////////////////////////////////////
// Workaround function to handle duplicate id's in the DOM.
////////////////////////////////////////////////////////////////////
function get_last_element_by_tagname_and_tolerant_id(tagname, tolerant_id, debug) {
    var elems= document.getElementsByTagName(tagname);
    var len= elems ? elems.length : 0;
    // if (debug) unsafeWindow.console.log("elems: len=" + len);
    if (! len) return;
    var ct_someid= 0;
    var ct_fnd= 0;
    var fnd= false;
    for (var i=0; i<len; i++) {
        var elem= elems[i];    
        var eid= elem.id;    
        if (debug) {
            var aid= elem.getAttribute('id');
            if (! aid) aid= ''; // match type of elem.id
            if (aid != eid) unsafeWindow.console.log("ERROR: eid=" + eid + ", aid=" + aid);
        }
        if (eid) {
            ct_someid++;
            if (eid == tolerant_id) {
                ct_fnd++; 
                fnd= elem; // Want the last matching element, so set 'fnd' until done.
            }
        }
    }
    if (debug) unsafeWindow.console.log("divs: ct_fnd=" + ct_fnd + ", ct_someid=" + ct_someid + ", elems.len=" + len);
    return fnd;
}



/////////////////////////////////////
function set_last_thread_props(cnodes, cmax, cpromptmax, csort) {
  try {
    if (!cpromptmax) return true;
    // Go up til at the top of the current thread, xflatcdepth=0, and break.
    for (var i=cnodes.length-1; i>=0; i--) {
        // In current thread, assign common cmax, the newest/best val.
        cnodes[i].xflatcmax= cmax;
        if (cnodes[i].xflatcprompt == cpromptmax) {
            var ok= settextcolorhi(cnodes[i], csort);
            if (! ok) return;
        }
        if (cnodes[i].xflatcdepth == 0) {
            // Top of the thread, assign prompt and break.
            cnodes[i].xflatcpromptshow= cpromptmax;
            break;
        }
    }
    return true;
  } catch(e) {
    alert('ERROR: cannot set last thread props');  
  }
}



/////////////////////////////////////
function settextcolorhi(cnode, csort) {
  try {
    var elem= false;
    switch (csort) {
    case 'newest':
        elem= cnode.xflatcage;
        break;
    case 'best':
        elem= cnode.xflatclike; 
        break;
    }
    if (elem) {
        elem.style.color= 'blue';
        return true;
    }    
  } catch(e) {
    alert('ERROR: cannot set text color');
  }   
}



/////////////////////////////////////
function set_xflatcs(cnode) {
  try {
    for (var i = 0; i < cnode.children.length; i++) {
        var cname= cnode.children[i].className;
        if (cname == 'dsq-comment-body') {
            for (var j = 0; j < cnode.children[i].children.length; j++) {
                cname= cnode.children[i].children[j].className;
                // if (cname == 'dsq-comment-message') {
                //     cnode.children[i].children[j].style.color= '#090';
                // }
                if (cname == 'dsq-comment-footer') {
                    for (var k = 0; k < cnode.children[i].children[j].children.length; k++) {
                        cname= cnode.children[i].children[j].children[k].className;
                        if (cname == 'dsq-comment-meta') {
                            // cnode.children[i].children[j].children[k].children[0].style.color= 'blue';
                            cnode.xflatcage= cnode.children[i].children[j].children[k].children[0];
                            if (! cnode.xflatcage) return;
                            cnode.xflatclike= cnode.children[i].children[j].children[k].children[1];
                            if (! cnode.xflatclike) return;
                            return true;
                        }
                    }                    
               }
            }
        }
    }
  } catch(e) {
    alert("ERROR in set_xflatcs");
  }   
}
