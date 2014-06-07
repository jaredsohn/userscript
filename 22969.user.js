// ==UserScript==
// @name           OkCupid auto-close markup tag
// @namespace      http://userscripts.org/users/45613/scripts
// @description     Automatically closes any unclosed markup tags on submission.  Only looks at those allowed by OKCupid (bold, italics).  Also, it doesn't magically know where you *meant* to close - it just adds enough closing tags to match the number of opening tags you entered.  This means that it can't fix your post if you broke it, but subsequent comments will not be harmed by your typo or omission.  TODO: 1) add something to look for common mispelins of the closing tags; 2) deal with the tags as an array instead of hard-coding them.  Thanks to Johan Sundström (http://userscripts.org/users/326) for assistance.  You might check out his collection of scripts, and in addition, there's http://zzyzx.xyzzy.googlepages.com/okcupidhacks
// @include        http://www.okcupid.com/*
// ==/UserScript==

// ==UserScript==
// @name           OkCupid auto-close markup tag
// @namespace      http://userscripts.org/users/45613/scripts
// @description     Automatically closes any unclosed markup tags on submission.  Only looks at those allowed by OKCupid (bold, italics).  Also, it doesn't magically know where you *meant* to close - it just adds enough closing tags to match the number of opening tags you entered.  This means that it can't fix your post if you broke it, but subsequent comments will not be harmed by your typo or omission.  TODO: 1) add something to look for common mispelins of the closing tags; 2) deal with the tags as an array instead of hard-coding them.  Thanks to Johan Sundström (http://userscripts.org/users/326) for assistance.  You might check out his collection of scripts, and in addition, there's http://zzyzx.xyzzy.googlepages.com/okcupidhacks
// @include        http://www.okcupid.com/*
// ==/UserScript==


var addComment = unsafeWindow.addComment;

function findCount(findTarget, text) 
{
    var idx=0;
    var count=0;
    while ((idx != -1) && (idx <= text.value.length)) {
        idx = text.value.indexOf (findTarget, idx);
	if (idx != -1) { // Found one
	    count ++;
	    idx += findTarget.length;
	}
    }
    return count;
}
var diagStr="";

function closeTag(tagChar, tagCharName, text) {
   var tagStringOpen="<" + tagChar + ">";
   var tagStringClose="</" + tagChar + ">";
   var opens=findCount(tagStringOpen, text);
   var closes=findCount(tagStringClose, text);
   if (opens > closes) {
       if (diagStr.length > 0) diagStr += "; and ";
       diagStr += (opens - closes) + " " + tagCharName;
       for (var ii=0; ii < (opens - closes); ii++) {
           text.value += tagStringClose;
       }
   }
}



unsafeWindow.addComment = function closeTags(id) {
  var form = document.forms.namedItem(id);
  var text = form.elements.namedItem("text");
  closeTag("b", "bold", text);
  closeTag("i", "italic", text);
  if (diagStr.length > 0) { // Your slate has been cleaned
      text.value += "<p>\n-- Slate cleaned: autoclosed " + diagStr + " tag(s).\n";
      // This confirmation is a nice idea, but it seems to conflict with OKCupid.
      //      if (!confirm("Found "+ diagStr + " unclosed tag(s); Hit OK to have them autoclosed, Cancel to post with broken tags."))
      //          return;
  }
  diagStr="";
  addComment(id);
}

