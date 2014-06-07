(function () {

// ==UserScript==
// @name           Userscripts Comments Fix
// @namespace      sizzlemctwizzle
// @description    Packed full of features that make using Userscripts.org easier!
// @copyright      2008+, sizzlemctwizzle (http://userscripts.org/users/27715)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license        (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version        2.3.6.1esr1
// @icon           https://www.gravatar.com/avatar/8603ded5ba12590f2231b13d5c07c45b?r=PG&s=48&default=identicon

// @contributor Aquilax (http://userscripts.org/users/28612/)
// @contributor Avindra V.G. (http://userscripts.org/users/61251/)
// @contributor Marti Martz (http://userscripts.org/users/37004/)

//@require        http://sizzlemctwizzle.com/24464.js
//@require        https://secure.dune.net/usocheckup/24464.js?maxage=7

// @include        http://userscripts.org:8080/forums/*/topics/*
// @include        http://userscripts.org:8080/scripts/show/*
// @include        http://userscripts.org:8080/scripts/edit/*
// @include        http://userscripts.org:8080/scripts/issues/*
// @include        http://userscripts.org:8080/topics/*
// @include        http://userscripts.org:8080/guides/*
// @include        http://userscripts.org:8080/reviews/*
// @include        http://userscripts.org:8080/articles/*
// @include        http://userscripts.org:8080/messages/*

// @include        http://userscripts.org/forums/*/topics/*
// @include        http://userscripts.org/scripts/show/*
// @include        http://userscripts.org/scripts/edit/*
// @include        http://userscripts.org/scripts/issues/*
// @include        http://userscripts.org/topics/*
// @include        http://userscripts.org/guides/*
// @include        http://userscripts.org/reviews/*
// @include        http://userscripts.org/articles/*
// @include        http://userscripts.org/messages/*

// @include        https://userscripts.org/forums/*/topics/*
// @include        https://userscripts.org/scripts/show/*
// @include        https://userscripts.org/scripts/edit/*
// @include        https://userscripts.org/scripts/issues/*
// @include        https://userscripts.org/topics/*
// @include        https://userscripts.org/guides/*
// @include        https://userscripts.org/reviews/*
// @include        https://userscripts.org/articles/*
// @include        https://userscripts.org/messages/*

//@updateURL      https://userscripts.org/scripts/source/24464.meta.js
//@installURL     https://userscripts.org/scripts/source/24464.user.js
//@downloadURL    https://userscripts.org/scripts/source/24464.user.js

// @updateURL      http://userscripts.org:8080/scripts/source/24464.meta.js
// @installURL     http://userscripts.org:8080/scripts/source/24464.user.js
// @downloadURL    http://userscripts.org:8080/scripts/source/24464.user.js

// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_log
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant unsafeWindow

// ==/UserScript==

  // ====== Start Helper Functions =======

  // GM_addStyle if not available
  if (typeof GM_addStyle === 'undefined') {
    GM_addStyle = function (css) {
      var head = document.head || document.getElementsByTagName('head')[0], style = create('style', {});
      if (!head)
        return;
      style.type = 'text/css';
      style.media = 'screen, projection';
      try {
        style.innerHTML = css
      }
      catch (x) {
        style.innerText = css
      }
      head.appendChild(style);
    };
  }

  /**
  *  Smart XPath Function
  */
  function $x(x, t, r) {
    if (t && t.tagName)
      var h = r, r = t, t = h;

    var d = r ? r.ownerDocument || r : r = document, p;

    switch (t) {
      case XPathResult.NUMBER_TYPE:
        p = 'numberValue';
        break;

      case XPathResult.STRING_TYPE:
        p = 'stringValue';
        break;

      case XPathResult.BOOLEAN_TYPE:
        p = 'booleanValue';
        break;

      case XPathResult.ANY_UNORDERED_NODE_TYPE:
      case XPathResult.FIRST_ORDERED_NODE_TYPE:
        p = 'singleNodeValue';
        break;

      default:
          return d.evaluate(x, r, null, t || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
  }

  // Optional shortcut functions I like
  function $x1(x, r) { return $x(x, XPathResult.FIRST_ORDERED_NODE_TYPE , r) }

  function $xb(x, r) { return $x(x, XPathResult.BOOLEAN_TYPE, r) }

  // A robust and universal forEach
  function forEach(lst, cb) {
    if (!lst)
      return;
    if (lst.snapshotItem)
      for (var i = 0, len = lst.snapshotLength; i < len; ++i)
        cb(lst.snapshotItem(i), i, lst);
    else if (lst.iterateNext) {
      var item, next = lst.iterateNext;
      while (item = next())
        cb(item, lst);
    }
    else if (typeof lst.length != 'undefined')
      for (var i = 0, len = lst.length; i < len; ++i)
        cb(lst[i], i, lst);
    else if (typeof lst == "object")
      for (var i in lst)
        cb(lst[i], i, lst);
  }

  // Insert an element after another
  function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}

  // A really cool element creation funtion by avg and JoeSimmons, and modified by me
  function create() {
    switch(arguments.length) {
      case 1:
        var A = document.createTextNode(arguments[0]);
        break;
      default:
        var
            A = document.createElement(arguments[0]),
            B = arguments[1]
        ;
        for (var b in B) {
          if (b.indexOf("on") == 0)
            A.addEventListener(b.substring(2), B[b], false);
          else if (",style,accesskey,id,name,src,href,which".indexOf("," + b.toLowerCase()) != -1)
            A.setAttribute(b, B[b]);
          else
              A[b] = B[b];
        }
        for (var i = 2, len = arguments.length; i < len; ++i)
          A.appendChild(arguments[i]);
    }
    return A;
  }
  // Remove an element
  function remove(element1) { element1.parentNode.removeChild(element1); }

  // Get element by id
  function $(element2) { return document.getElementById(element2); }

  // Get elements by classname
  function $c(element3, root) { return (root||document).getElementsByClassName(element3); }

  function xhr(url, callback, data) {
    if (location.protocol.match(/^https:/i) && url.match(/^http:\/\/userscripts(?::\d{1,5})?\.org\//i))
      url = url.replace(/^http:/i, "https:");

    GM_xmlhttpRequest({
      method: (data) ? 'POST' : 'GET',
      url: url,
      headers: (data) ? { 'Content-type': 'application/x-www-form-urlencoded' } : null,
      data: (data) ? data : null,
      onload: function (res) {
        if (res.status == 200)
          callback(res.responseText);
      }
    });
  }

  // Turn text into a document and pass it to a callback function
  function makeDoc(txt, cb) {
    var
        dt =
        document.implementation.createDocumentType(
          "html",
          "-//W3C//DTD HTML 4.01 Transitional//EN",
          "http://www.w3.org/TR/html4/loose.dtd"
        ),
        doc = document.implementation.createDocument('', '', dt),
        html = doc.createElement('html')
    ;

    html.innerHTML = txt;
    doc.appendChild(html);
    cb(doc);
  }

  // ======== End Helper Functions =========

  GM_addStyle(
      "pre, code { white-space:pre-wrap !important; } a.quick_shortcut, a.quick_shortcut:visited { font-size: 12px !important; font-weight:bold !important; color: #fff !important; width: 10px !important; } a.example_link:hover { color: #00f !important; } .editbox table { padding: 0 !important; margin: 0 !important; } .spammer .photo, .spammer .role, .spammer .utility, .spammer .useragent, .spammer .entry-content { display: none !important; }"
  );

  init();

  function usoEscaper(code) {
    var correct = {'b' : 'strong', 'i' : 'em', 'u' : 'ins', 's' : 'del'};
    return code.replace(/<(code|pre)>((?:.|\s)*?)<\/\1>/gmi, function (str, tag, raw) {
        return "<"+tag+">"+recursEscape(raw.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,'&quot;').replace(/'/g, "&#39;")).replace(/(\\)?\[url(?:(=.*?))?\]((?:.|\s)*?)\[\/url\]/gmi, function (str, $1, $2, $3){return $1 ? '[url'+$2+']'+$3+'[/url]' : '<a'+($2.length?' href="'+$2.substr(1,$2.length)+'"':'')+'>'+$3+'</a>'})+"</"+tag+">";
    }).replace(/<\/blockquote>\n/gi, "</blockquote>").replace(/<\s*(\/)?\s*(b|i|u|s)\s*>/gi, function (str, $1, $2) { return '<'+$1+correct[$2]+'>' });
  }

  function usoUnEscaper(code) {
    return code.replace(/<(code|pre)>((?:.|\s)*?)<\/\1>/gmi, function (str, tag, raw) {
      return "<"+tag+">"+recursUnEscapeTags(recursUnEscapeBB(raw.replace(/\[url(?:=(.*?)){0,1}\]((?:.|\s)*?)\[\/url\]/gmi, function (str, m1, m2){return '\\[url'+(m1.length?'=':'')+m1+']'+m2+'[\/url]'})).replace(/<a\s*(?:[^>]+href=(".*?)")?>((?:.|\s)*?)<\/a>/gmi, function (str, $1, $2){return '[url'+($1.length?'=':'')+$1.substr(1,$1.length)+']'+$2+'[\/url]'})).replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g, "'").replace(/&amp;/g,'&')+"</"+tag+">";
      }).replace(/<\/blockquote>(?!\n)/gi, "</blockquote>\n");
  }

  function recursEscape(code) {
    if (/\[\s*([^\]]+)\s*[^\]]*\][^\[]*\[\s*\/\s*\1\s*\]/i.test(code)) {
      return code.replace(/(\\)?\[(sub|sup|strong|em|ins|del|b|i|u|s|big|small|h\d+)\]((?:.|\s)+?)\[\/\2\]/gmi, function (str, $1, $2, $3) { return $1 ? "["+$2+"]"+recursEscape($3)+"[/"+$2+"]" : "<"+$2+">"+recursEscape($3)+"</"+$2+">"});
    }
    else
      return code;
  }

  function recursUnEscapeBB(code) {
    if (/\[\s*([^\]]+)\s*[^\]]*\][^\[]*\[\s*\/\s*\1\s*\]/i.test(code))
      return code.replace(/\[(sub|sup|strong|em|ins|del|b|i|u|s|big|small|h\d+)\]((?:.|\s)+?)\[\/\1\]/gmi, function (reg, $1, $2) { return "\\["+$1+"]"+recursUnEscapeBB($2)+"[\/"+$1+"]" });
    else
      return code;
  }

  function recursUnEscapeTags(code) {
    if (/<\s*([^>]+)\s*[^>]*>[^<]*<\s*\/\s*\1\s*>/i.test(code))
      return code.replace(/<(sub|sup|strong|em|ins|del|b|i|u|s|big|small|h\d+)>((?:.|\s)*?)<\/\1>/gmi, function (reg, $1, $2) { return "["+$1+"]"+recursUnEscapeTags($2)+"[\/"+$1+"]" });
    else
      return code;
  }

  function init() {
    addFormsSubmissionEventListener(document);
    addEventListener("unload",revertTextAreas,false);
    document.addEventListener("DOMNodeInserted", function (e) {
      addFormsSubmissionEventListener(e.relatedNode);
    },false);
    unsafeWindow.revertTextAreas=revertTextAreas;
  }

  function addFormsSubmissionEventListener(node) {
    var array1=node.getElementsByTagName("FORM");
    for (var num1 = 0; num1 < array1.length; num1++) {
      var form1 = array1[num1];
      var text1 = form1.getAttribute("onsubmit");
      if (text1 == null) text1="";
      if (text1.indexOf("replaceCodeBlocks") == -1) {
        var text2=text1.indexOf("ajax")!=-1 ? "; revertTextAreas();" : "";
        form1.setAttribute("onsubmit","replaceCodeBlocks(this); " + text1 + text2);
      }

      var array2=form1.getElementsByTagName("TEXTAREA");

      for (var num2 = 0; num2 < array2.length; num2++) {
        var textarea1=array2[num2];
        if (textarea1.getAttribute('reverted')) continue;
        if (!/\/scripts\/edit\//.test(document.URL) && !/\/(guides|reviews)\/\d+\/edit/.test(document.URL)){
          textarea1.setAttribute('cols', '66');
          textarea1.setAttribute('rows', '15');
          textarea1.setAttribute('style', 'height:100%;');
          textarea1.parentNode.setAttribute('width', '55%');
          textarea1.parentNode.setAttribute('height', '100%');
        }
        textarea1.addEventListener("keydown", function (e) {
          if ((navigator.userAgent.match('Macintosh')) ? e.ctrlKey && !e.altKey : e.altKey && !e.ctrlKey)
          shortcuts(e, this);
        }, false);

        if (textarea1.originalValue==null) {
          var text2 = usoUnEscaper((textarea1.textContent) ? textarea1.textContent : textarea1.value);
          textarea1.setAttribute('reverted', 'true');

          if (textarea1.textContent)
            textarea1.textContent = text2;
          else
            textarea1.value = text2;

          textarea1.originalValue = text2;
        }
      }
    }
  }

  unsafeWindow.replaceCodeBlocks = function (form) {
    var array1=form.getElementsByTagName("TEXTAREA");

    for (var num1 = 0; num1 < array1.length; num1++) {
      var textarea1=array1[num1];
      var text1=textarea1.value;
      textarea1.originalValue = text1;
      textarea1.value = usoEscaper(text1);
      if (textarea1.getAttribute('reverted'))
        textarea1.removeAttribute('reverted');
    }
  }

  function revertTextAreas(e) {
    var array1=document.getElementsByTagName("TEXTAREA");
    for (var num1 = 0; num1 < array1.length; num1++) {
      var textarea1=array1[num1];
      if (textarea1.originalValue) textarea1.value=textarea1.originalValue;
    }
  }

  function inCodeBlock(before, selected, after) {
    if (selected.match(/<\/{0,1}(code|pre)>/i))
      return false;

    var temp,
        b4Blocks = (temp=before.match(/<(code|pre)>(?:.|\s)*?<\/\1>/gmi)) ? temp.length : 0,
        b4OpenTags = (temp=before.match(/<(?:code|pre)>/gi)) ? temp.length : 0;

    if (b4OpenTags <= b4Blocks)
      return false;

    var afBlocks = (temp=after.match(/<(code|pre)>(?:.|\s)*?<\/\1>/gmi)) ? temp.length : 0,
        afCloseTags = (temp=after.match(/<\/(?:code|pre)>/gi)) ? temp.length : 0;

    return afCloseTags > afBlocks;
  }

  // Shortcut code inspired by avg's script: http://userscripts.org/scripts/version/34094/39469.user.js?
  function shortcuts(e, box) {
    var x=box.selectionStart,y=box.selectionEnd;
    var before = (box.value).substring(0,x);
    var selected=(box.value).substring(x,y);
    var after = (box.value).substring(y, (box.value).length);
    var tag, length;

    // The activate key is ctrl on mac and alt on everything else
    if (inCodeBlock(before, selected, after)) {
      switch((e.keyCode)?e.keyCode:e) {
        case 66: case 'b':tag="[strong]"+selected+"[/strong]";break;
        case 73: case 'i':tag="[em]"+selected+"[/em]";break;
        case 85: case 'u':tag="[ins]"+selected+"[/ins]";break;
        case 83: case 's':tag="[del]"+selected+"[/del]";break;
        case 65: case 'a':tag="[url=]"+selected+"[/url]";break;
        case 72:tag="[h4]"+selected+"[/h4]";break;
        case 76: case 'l':if (y-x>0) tag='[url='+((h=prompt('What do you want to link "'+selected+'" to?').replace(/^https?:\/\/userscripts\.org(?::\d{1,5})?/i, ""))?h:'')+']'+selected+'[/url]';break;
      }
    }
    else {
      switch((e.keyCode)?e.keyCode:e) {
        case 67: case 'c':tag="<code>"+selected+"</code>";break;
        case 80: case 'p':tag="<pre>"+selected+"</pre>";break;
        case 66: case 'b':tag="<strong>"+selected+"</strong>";break;
        case 73: case 'i':tag="<em>"+selected+"</em>";break;
        case 85: case 'u':tag="<ins>"+selected+"</ins>";break;
        case 81: case 'q':tag="<blockquote>"+selected+"</blockquote>";break;
        case 83: case 's':tag="<del>"+selected+"</del>";break;
        case 65: case 'a':tag="<a href=\"\">"+selected+"</a>";break;
        case 88: case 'x':tag="<img src=\""+selected+"\" />";break;
        case 72:tag="<h4>"+selected+"</h4>";break;
        case 76: case 'l':if (y-x>0) tag='<a href="'+((h=prompt('What do you want to link "'+selected+'" to?').replace(/^https?:\/\/userscripts\.org(?::\d{1,5})?/i, ""))?h:'')+'">'+selected+'</a>';break;
      }
    }
    if (tag) {
      var topScroll = box.scrollTop;
      box.value = before+tag+after;
      length = (y-x == 0) ? before.length + ((tag.length - 1) / 2) : y + tag.length;
      box.setSelectionRange(length, length);
      box.focus();
      box.scrollTop = topScroll;
      if (e.keyCode) e.preventDefault();
    }
  }

  // One-click quoting
  function quote_handle(e) {
  e.preventDefault();
  if ($('spam_manager'))
    return;

  var post_hentry = $x1('./ancestor::tr[contains(@class, "post hentry")]', e.target),
      post_id = post_hentry.id.split('row-')[1],
      user = $c('fn', post_hentry)[0].getElementsByTagName('a')[0],
      userName = user.getAttribute('text'),
      userUrl = '/users/'+user.getAttribute('user_id'),
      body = $("post-body-"+post_id),
      quoted = (select=window.getSelection()) && (select.focusNode) && (isPost(select, body.id)) ?
                selectHTML(select, body) : body.innerHTML;

    if ( $("reply").getAttribute('style').match("display: none;") && ($("edit").offsetHeight > 0) && $("edit_post_body") )
      box = $("edit_post_body");
    else {
      box = $("post_body");

      // Reply needs to be opened
      if ($("reply").offsetHeight == 0) {
        $("reply").style.display = "block";
        $("post_body").value = '';
        if (!$xb(".//a[@class='quick_shortcut']", $('reply')))
        attachElements('reply'); // diff
        lengthenPage($('reply')); // diff
      }
    }

    box.focus();
    if (location.pathname.match(/^\/topics\/9/i)) {
      quoted = '<blockquote><strong>'+userName+'</strong>&nbsp;<a href="' +
        location.pathname+location.search+'#posts-'+post_id+'">wrote</a>:\n' +
        usoUnEscaper(quoted.replace(/^(<p>\s*<\/p>)/g,'').replace(/^(\s*<br>\s*)*\s*/,'').replace(/^\s*/,'').replace(/<pre>((?:.|\s)*?)<\/pre>/gmi,function (str,p1){return'<pre>'+p1.replace(/\n/g,'<br>')+'</pre>'}).replace(/\n/g, '').replace(/<!--((?:.|\n)*)-->/, '').replace(/<br>/g, '\n').replace(/<p>/g, '').replace(/<\/p>/g, "\n").replace(/^\s+|\s+$/g, '').replace(/ {2,}/g,' ')) +
        '</blockquote>\n'; // diff
    }
    else {
      quoted = '<blockquote><strong><a href="'+userUrl+'">'+userName+'</a></strong>&nbsp;<a href="' +
        location.pathname+location.search+'#posts-'+post_id+'">wrote</a>:\n' +
        usoUnEscaper(quoted.replace(/^(<p>\s*<\/p>)/g,'').replace(/^(\s*<br>\s*)*\s*/,'').replace(/^\s*/,'').replace(/<pre>((?:.|\s)*?)<\/pre>/gmi,function (str,p1){return'<pre>'+p1.replace(/\n/g,'<br>')+'</pre>'}).replace(/\n/g, '').replace(/<!--((?:.|\n)*)-->/, '').replace(/<br>/g, '\n').replace(/<p>/g, '').replace(/<\/p>/g, "\n").replace(/^\s+|\s+$/g, '').replace(/ {2,}/g,' ')) +
        '</blockquote>\n'; // diff
    }

    if (box.value == '') {
      box.value = quoted;
      box.scrollTop = box.scrollHeight;
    }
    else {
      var x, y;
      if ((y = box.selectionEnd) - (x = box.selectionStart) == 0) { // insert quote at cursor
        box.value = (box.value).substring(0, x) + quoted + '\n' + (box.value).substring(y, (box.value).length);
        var len = ((box.value).substring(0, x) + quoted).length
        box.setSelectionRange(len, len);
      }
      else { // append quote
        if (/\n$/.test(box.value))
          box.value = box.value.replace(/\n+$/,'');
        box.value += quoted;
        box.scrollTop = box.scrollHeight;
      }
    }
  }

  function send_spam(reportStr) {
    xhr("/topics/9/posts",
          function () {
            GM_setValue("spam_reports", "([])");
            $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";
          },
          "authenticity_token=" + encodeURIComponent(unsafeWindow.auth_token) +
          "&post%5Bbody%5D="+encodeURIComponent(reportStr)+"&commit=Post+reply"
    );
  }

  function edit_report(i) {
    var manDiv = $('reply').cloneNode(true);
    manDiv.id = 'spam_editor';
    manDiv.style.display = 'block';
    document.body.appendChild(manDiv);
    var saveBtn = $x1('.//input[@name="commit"]', manDiv);
    saveBtn.type = 'button';
    saveBtn.value = 'Save Report';
    saveBtn.setAttribute('spam_i', i);
    saveBtn.addEventListener("click",
      function (e) {
        var reports = eval(GM_getValue("spam_reports", "([])"));
        reports[e.target.getAttribute('spam_i')] = usoEscaper($x1('./ancestor::div[@class="editbox"]//textarea[@id="post_body"]', e.target).value);
        GM_setValue("spam_reports", uneval(reports));
        var box = $x1('./ancestor::div[@class="editbox"]', e.target);
        remove(box);
        lengthenPage(box);
        spam_manager();
      },false);
    var box = $x1('.//textarea[@id="post_body"]', manDiv);
    box.addEventListener("keydown", function (e) {
      if ((window.navigator.userAgent.match('Macintosh')) ? e.ctrlKey && !e.altKey : e.altKey && !e.ctrlKey)
        shortcuts(e, this); } ,false);

    box.value = usoUnEscaper(eval(GM_getValue("spam_reports", "([])"))[i]);
    $x1('.//text()[contains(., "cancel")]/..',
        manDiv).parentNode.addEventListener("click",
          function (e) {
            var box = $x1('./ancestor::div[@class="editbox"]', e.target);
            remove(box);
            lengthenPage(box);
            spam_manager();
          },false);
    $x1('.//input[@id="editBtn"]', manDiv).addEventListener("click", function (e) {
      editPost(e.target.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0]);
      e.preventDefault();
    } , false);
    $x1('.//input[@id="previewBtn"]', manDiv).addEventListener("click", function (e) {
        var box = e.target.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0];
        xhr('/posts/preview', function (html) {
          previewPost(html, box)
        },
        'body=' + encodeURIComponent(usoEscaper(box.value)));
        e.preventDefault();
      }, false);

    forEach($c('quick_shortcut', manDiv), function (link) {
      link.addEventListener("click",
          function (e) {
            var box = $x1("./ancestor::tbody//textarea", e.target);
            shortcuts(e.target.textContent, box);
            e.preventDefault();
          },false);
    });
  }

  function spam_manager() {
    if ($('spam_manager')) return;
    window.warnUser = true;
    var reports = eval(GM_getValue("spam_reports", "([])"));
    //if (reports.length > 0)
    //send_spam(reports.join("<hr />"));
    $('reply').style.display = 'none';
    $('edit').style.display = 'none';
    var manDiv = $('reply').cloneNode(true);
    manDiv.id = 'spam_manager';
    manDiv.style.display = 'block';
    document.body.appendChild(manDiv);
    var crap_holder = $c('crap_holder', manDiv)[0];
    crap_holder.id = 'spam_crap_holder';
    GM_addStyle('#spam_manager { max-height: 40% !important; overflow: auto !important; }' +
                '#spam_manager .crap_holder { font-size:16px !important; width: 100% !important; } #spam_manager ' +
                '#spam_crap_holder a { color: #FFF; } .edit_report, .delete_report { color: #FF3030 !important; } ' +
                '.report_conflict { color: #7FFF00 !important; }');
    var new_content = '<h5>Report Manager</h5><h5>You have <span id="total_spam">'+reports.length +
                      '</span> total report'+(reports.length==1?'':'s')+' stored.</h5>';
    forEach(reports, function (report, i) {
      new_content += '<h5>' + report.replace(/\n/g, '<br />') + ' | <a href="#" class="edit_report" id="edit_report_' +
                    i + '">edit report</a> - <a href="#" class="delete_report" id="delete_report_' + i +
                    '">delete report</a> </h5>';
    });
    crap_holder.innerHTML = new_content;
    forEach($c('edit_report', manDiv), function (link) {
        link.addEventListener("click",
          function (e) {
            remove($('spam_manager'));
            edit_report(e.target.id.split('edit_report_')[1]);
            e.preventDefault();
          }, false);
      });
    forEach($c('delete_report', manDiv), function (link) {
        link.addEventListener("click",
          function (e) {
            window.warnUser = true;
            var reports = eval(GM_getValue("spam_reports", "([])"));
            reports.splice(e.target.id.split('delete_report_')[1], 1);
            remove(e.target.parentNode);
            GM_setValue("spam_reports", uneval(reports));
            $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";
            $('total_spam').textContent = reports.length;
            e.preventDefault();

            // Simulate mouse click close and reopen to attempt to fix a problem with logic
            var ev = document.createEvent("HTMLEvents");
            ev.initEvent("click", true, true);
            $x1(".//a[.='Close']", $('spam_manager')).dispatchEvent(ev);
            spam_manager();
          }, false);
      });
    remove($x1('.//textarea[@id="post_body"]', manDiv).parentNode);
    var previewBtn = $x1('.//input[@id="previewBtn"]', manDiv);
    if (previewBtn) {
      remove($x1('.//span[@id="preview_spacer"]', manDiv));
      remove(previewBtn);
    }
    var saveBtn = $x1('.//input[@name="commit"]', manDiv);
    saveBtn.type = 'button';
    saveBtn.value = 'Submit Reports';
    saveBtn.addEventListener("click",
      function (e) {
        var box = $x1('./ancestor::div[@class="editbox"]', e.target);
        var reports = eval(GM_getValue("spam_reports", "([])"));
        if (reports.length > 0 && window.warnUser) {
          xhr('/topics/9.rss', function (text) {
            var conflict = false;
            var xmlDoc = new DOMParser().parseFromString(text, 'text/xml');
            forEach(reports, function (report, i) {
                var matches = /<a[^>]+href=["|'].*\/users\/(\d+).*['|"][^>]*>/.exec(report);
                if (matches && matches.length >= 2) {
                  var reg = new RegExp('\/users\/'+matches[1], 'i');

                  forEach(xmlDoc.getElementsByTagName('item'), function (post) {
                      if ($('report_conflict_'+i)) return;
                      if (reg.test(post.getElementsByTagName('description')[0].textContent)) {
                        conflict = true;
                        insertAfter(create('span', {},
                            create(' - '),
                            create('a', {
                              href: '/posts/' + post.getElementsByTagName('guid')[0].textContent.split(':')[2],
                              id: 'report_conflict_'+i,
                              target: '_blank',
                              className: 'report_conflict',
                              textContent: 'conflict detected!',
                        })), $('delete_report_'+i));
                      }
                  });
                }
            });
            if (conflict) {
              window.warnUser = false;
              alert("One or more of your reports has already been submitted. Please recheck your reports and submit again.");
            }
            else {
              send_spam(reports.join("\n\n<hr />"));
              remove(box);
              lengthenPage(box);
            }
          });
        }
        else if (reports.length > 0 && !window.warnUser) {
          send_spam(reports.join("\n\n<hr />"));
          remove(box);
          lengthenPage(box);
        }
    },false);
    var cancelBtn = $x1('.//text()[contains(., "cancel")]/..', manDiv);
    cancelBtn.textContent = 'Close';
    cancelBtn.addEventListener("click",
      function (e) {
        var box = $x1('./ancestor::div[@class="editbox"]', e.target);
        remove(box);
        lengthenPage(box);
      },false);
  }

  // One-click spam reporting by Avg http://userscripts.org/scripts/show/47097
  function report_handle(e) {
    e.preventDefault();
    var l=$x1('.//span[@class="fn"]/a', e.target.parentNode.parentNode);
    if (!l) {
      var btn=e.target;
      e.target.disabled=true;
      var report = '<a href="' + window.location.pathname + '">Empty topic</a>';
      var reports = eval(GM_getValue("spam_reports", "([])"));
      for each (var r in reports)
        if (r.match('<a href="' + window.location.pathname + '">Empty topic</a>')) {
          insertAfter(create('span',{ textContent: 'Duplicate Report!',
                  style: btn.getAttribute('style') + ' font-weight: normal', className: btn.className }), btn);
          remove(btn);
          return;
        }
      reports.push(report);

      GM_setValue("spam_reports", uneval(reports));
      $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";

      insertAfter(create('span',{ textContent: 'Report Saved!',
              style: btn.getAttribute('style') + ' font-weight: normal', className: btn.className }), btn);
      remove(btn);
    }
    else {
      var spammerLink = '/users/'+l.getAttribute('user_id');
      var spammer = l.getAttribute('text');
      var post=$x1('.//a[@rel="bookmark"]', e.target.parentNode.parentNode);
      var btn=e.target;
      e.target.disabled=true;
      var report="<a href=\""+spammerLink+"\">"+spammer+"</a> posted <a href=\""+post.pathname+post.search+post.hash+"\">this spam</a>.";
      var reports = eval(GM_getValue("spam_reports", "([])"));
      for each (var r in reports)
        if (r.match("<a href=\""+spammerLink+"\">"+spammer+"</a> posted ")) {
          insertAfter(create('span',{ textContent: 'Duplicate Report!',
                  style: btn.getAttribute('style') + ' font-weight: normal', className: btn.className }), btn);
          remove(btn);
          return;
        }
      reports.push(report);

      GM_setValue("spam_reports", uneval(reports));
      $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";

      insertAfter(create('span',{ textContent: 'Report Saved!',
              style: btn.getAttribute('style') + ' font-weight: normal', className: btn.className }), btn);
      remove(btn);
    }


    $('spam_crap_holder').appendChild(create('h5', {}, create('span', {
          innerHTML: report.replace(/\n/g, '<br />')}),
        create(' | '),
        create('a', {href: '#',
              id: 'edit_report_'+(reports.length-1),
              className: 'edit_report',
              textContent: 'edit report',
              onclick: function (e) {
                remove($('spam_manager'));
                edit_report(e.target.id.split('edit_report_')[1]);
                e.preventDefault();
            }}),
        create(' - '),
        create('a', {href: '#',
              id: 'delete_report_'+(reports.length-1),
              className: 'delete_report',
              textContent: 'delete report',
              onclick: function (e) {
                var reports = eval(GM_getValue("spam_reports", "([])"));
                reports.splice(e.target.id.split('delete_report_')[1], 1);
                remove(e.target.parentNode);
                GM_setValue("spam_reports", uneval(reports));
                $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";
                $('total_spam').textContent = reports.length;
                e.preventDefault();

                // Simulate mouse click close and reopen to attempt to fix a problem with logic
                var ev = document.createEvent("HTMLEvents");
                ev.initEvent("click", true, true);
                $x1(".//a[.='Close']", $('spam_manager')).dispatchEvent(ev);
                spam_manager();
            }})
        ));
    $('total_spam').textContent = reports.length;
  }

  // Edit MM
  function report_handle_comments(e) {
    e.preventDefault();
    var l=$x1('.//a[@user_id]', e.target.parentNode.nextSibling.nextSibling);
    var spammerLink = '/users/'+l.getAttribute('user_id');
    var spammer = l.getAttribute('text');
    var post=$x1('.//a[starts-with(@name,"comment-")]', e.target.parentNode.parentNode);
    var btn=e.target;
    e.target.disabled=true;
    var report="<a href=\""+spammerLink+"\">"+spammer+"</a> posted <a href=\""+post.pathname+post.search+"#"+post.getAttribute("name")+"\">this spam</a>.";
    var reports = eval(GM_getValue("spam_reports", "([])"));
    for each (var r in reports)
      if (r.match("<a href=\""+spammerLink+"\">"+spammer+"</a> posted ")) {
        insertAfter(create('span',{ textContent: 'Duplicate Report!',
                style: btn.getAttribute('style') + ' font-weight: normal', className: btn.className }), btn);
        remove(btn);
        return;
      }
    reports.push(report);

    GM_setValue("spam_reports", uneval(reports));
    $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";

    insertAfter(create('span',{ textContent: 'Report Saved!',
            style: btn.getAttribute('style') + ' font-weight: normal', className: btn.className }), btn);
    remove(btn);
    $('spam_crap_holder').appendChild(create('h5', {}, create('span', {
          innerHTML: report.replace(/\n/g, '<br />')}),
        create(' | '),
        create('a', {href: '#',
              id: 'edit_report_'+(reports.length-1),
              className: 'edit_report',
              textContent: 'edit report',
              onclick: function (e) {
                remove($('spam_manager'));
                edit_report(e.target.id.split('edit_report_')[1]);
                e.preventDefault();
            }}),
        create(' - '),
        create('a', {href: '#',
              id: 'delete_report_'+(reports.length-1),
              className: 'delete_report',
              textContent: 'delete report',
              onclick: function (e) {
                var reports = eval(GM_getValue("spam_reports", "([])"));
                reports.splice(e.target.id.split('delete_report_')[1], 1);
                remove(e.target.parentNode);
                GM_setValue("spam_reports", uneval(reports));
                $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";
                $('total_spam').textContent = reports.length;
                e.preventDefault();

                // Simulate mouse click close and reopen to attempt to fix a problem with logic
                var ev = document.createEvent("HTMLEvents");
                ev.initEvent("click", true, true);
                $x1(".//a[.='Close']", $('spam_manager')).dispatchEvent(ev);
                spam_manager();
            }})
        ));
    $('total_spam').textContent = reports.length;
  }

  function report_handle_review(e) {
    e.preventDefault();
    var l=$x1('.//a', e.target.parentNode.parentNode.parentNode);
    var spammerLink = '/users/'+l.getAttribute('user_id');
    var spammer = l.textContent;
    var post=$x1('.//a', e.target.parentNode.parentNode);
    var btn=e.target;
    e.target.disabled=true;
    var report="<a href=\""+spammerLink+"\">"+spammer+"</a> posted <a href=\""+post.pathname+post.search+post.hash+"\">this spam</a>.";
    var reports = eval(GM_getValue("spam_reports", "([])"));
    for each (var r in reports)
      if (r.match("<a href=\""+spammerLink+"\">"+spammer+"</a> posted ")) {
        insertAfter(create('span',{ textContent: 'Duplicate Report!',
                style: btn.getAttribute('style') + ' font-weight: normal', className: btn.className }), btn);
        remove(btn);
        return;
      }
    reports.push(report);

    GM_setValue("spam_reports", uneval(reports));
    $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";

    insertAfter(create('span',{ textContent: 'Report Saved!',
            style: btn.getAttribute('style') + ' font-weight: normal', className: btn.className }), btn);
    remove(btn);
    $('spam_crap_holder').appendChild(create('h5', {}, create('span', {
          innerHTML: report.replace(/\n/g, '<br />')}),
        create(' | '),
        create('a', {href: '#',
              id: 'edit_report_'+(reports.length-1),
              className: 'edit_report',
              textContent: 'edit report',
              onclick: function (e) {
                remove($('spam_manager'));
                edit_report(e.target.id.split('edit_report_')[1]);
                e.preventDefault();
            }}),
        create(' - '),
        create('a', {href: '#',
              id: 'delete_report_'+(reports.length-1),
              className: 'delete_report',
              textContent: 'delete report',
              onclick: function (e) {
                var reports = eval(GM_getValue("spam_reports", "([])"));
                $('total_spam').textContent = reports.length;
                reports.splice(parseInt(e.target.id.split('delete_report_')[1]), 1);
                remove(e.target.parentNode);
                GM_setValue("spam_reports", uneval(reports));
                $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";

                $('total_spam').textContent = reports.length;
                e.preventDefault();

                // Simulate mouse click close and reopen to attempt to fix a problem with logic
                var ev = document.createEvent("HTMLEvents");
                ev.initEvent("click", true, true);
                $x1(".//a[.='Close']", $('spam_manager')).dispatchEvent(ev);
                spam_manager();
            }})
        ));
    $('total_spam').textContent = reports.length;
  }
  // /Edit MM

  // One click post deleting by Avg http://userscripts.org/scripts/show/53970
  function delete_handle(e) {
    e.preventDefault();
    var post = e.target.parentNode.parentNode.parentNode;
    if (confirm("Delete this post?"))
      xhr(location.pathname + "/posts/" + post.id.match(/\d+/)[0],
          function () { remove(post) },
          "_method=delete&authenticity_token="+encodeURIComponent(unsafeWindow.auth_token)
      );
  }


  function lengthenPage(what) { if (!$('drag_reply')) document.documentElement.style.height = (window.height + what.offsetHeight - $('footer').offsetHeight) + "px"; }

  function createElements() {
  $('tempPreviewHolder').appendChild(
      create('input', {
          id: 'previewBtn',
          type: 'button',
          value: 'Preview',
          title: 'Inline preview',
          onclick: function (e) {
              box = e.target.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0];
              xhr('/posts/preview', function (html) {
                  previewPost(html, box)
              },
        'body=' + encodeURIComponent(usoEscaper(box.value)));
              e.preventDefault();
          }
      }));
      $('tempPreviewHolder').appendChild(create('input', {
          id: 'editBtn',
          type: 'button',
          value: 'Edit',
          title: 'Continue editing',
          onclick: function (e) {
              editPost(e.target.parentNode.parentNode.parentNode.getElementsByTagName("textarea")[0]);
              e.preventDefault();
          }
      }));
      $('tempPreviewHolder').appendChild(create("span", {
          id: 'preview_spacer',
          innerHTML: '&nbsp;'
      }));
      $('tempPreviewHolder').appendChild(create('table', {
          id: 'post_preview',
          className: 'posts',
          style: 'width:100%;background-color:#FFF;display:none;overflow-y: auto;max-height: 280px;',
      },
      create('tr', {
          className: 'post hentry',
          width: '100%'
      },
      create('td', {
          className: 'body entry-content',
          id: 'preview_body',
          width: '100%'
      }))));
  }

  // Toggle functions
  function previewPost(html, box) {
    box.style.display = "none";
    $x1('./ancestor::div[@class="editbox"]//*[@id="post_preview"]', box).style.display = "block";
    $x1('./ancestor::div[@class="editbox"]//*[@id="preview_body"]', box).innerHTML = html.replace(/\n{2,}/g, '<br>');
    $x1('./ancestor::div[@class="editbox"]//*[@id="previewBtn"]', box).style.display = "none";
    $x1('./ancestor::div[@class="editbox"]//*[@id="editBtn"]', box).style.display = "inline";
  }
  function editPost(box) {
    box.style.display = "block";
    $x1('./ancestor::div[@class="editbox"]//*[@id="post_preview"]', box).style.display = "none";
    $x1('./ancestor::div[@class="editbox"]//*[@id="preview_body"]', box).innerHTML = '';
    $x1('./ancestor::div[@class="editbox"]//*[@id="previewBtn"]', box).style.display = "inline";
    $x1('./ancestor::div[@class="editbox"]//*[@id="editBtn"]', box).style.display = "none";
  }

  // Get the HTML from a selected area of a post
  function selectHTML(sel, body) {
    var range = sel.getRangeAt(0),
        holder = create('div', {}),
        parent = range.commonAncestorContainer,
        tag_queue = [];

    // Build the tag creation queue
    for (var node = parent; node.id ? node.id != body.id : true; node = node.parentNode) {
      if (node.tagName && node.attributes) {
        var atts = node.attributes,
            thisTag = [],
            thisAtts = {},
            auth_link,
            wrote_link;

        thisTag.push(node.tagName.toLowerCase());

        for (var i = 0, len=atts.length; i< len; ++i)
          thisAtts[atts[i].name] = atts[i].value;

        thisTag.push(thisAtts);

        if (node.tagName == "BLOCKQUOTE" &&
            (auth_link=$x1('./strong/a[1]', node)) &&
            (/^https?:\/\/userscripts\.org(?::\d{1,5})?\/users\/[^\/]+/.test(auth_link.href))) {
              var xtra = {};
              xtra.auth = [auth_link.textContent, auth_link.pathname];

              if ( (wrote_link=$x1('./a[1]', node)) &&
                  (/^https?:\/\/userscripts\.org(?::\d{1,5})?\/topics\/\d+.*(#posts-\d+)?/.test(wrote_link.href)) )
                    xtra.wrote = wrote_link.pathname+wrote_link.search+wrote_link.hash;

              thisTag.push(xtra);
        }

        tag_queue.push(thisTag);
      }
    }

    var lastNode = holder;

    // Build the wrapper elements
    if (tag_queue.length > 0)
      for (var i = tag_queue.length - 1; i >= 0; --i) {
        var newNode = create(tag_queue[i][0], tag_queue[i][1]),
            xtra = tag_queue[i][2];

        if (xtra) { // Append nested quote attribution
          newNode.appendChild(create('strong', {innerHTML:'<a href="'+xtra.auth[1]+'">'+xtra.auth[0]+'</a>'}));
          newNode.innerHTML += '&nbsp;';
          newNode.appendChild(xtra.wrote ? create('a', {href:xtra.wrote, textContent:'wrote'}) : create('wrote'));
          newNode.appendChild(create(':'));
          newNode.appendChild(create('br', {}));
        }

        lastNode.appendChild(newNode);
        lastNode = newNode;
      }

    lastNode.appendChild(range.cloneContents()); // Append the actual quoted HTML

    range.detach(); // Free the range now that we're done with it
    return holder.innerHTML
  }

  function isPost(sel, id) {
    return sel.getRangeAt(0).commonAncestorContainer.tagName != "TBODY" && $xb('./ancestor::*[@id="'+id+'"]', sel.focusNode);
  }

  function saveBlacklist(payload) {
    var ids = JSON.parse(payload),
        whitelist = JSON.parse(GM_getValue('whitelist', '[]')),
        blacklist = [];
    forEach(ids, function (id) {
        if (whitelist.indexOf(id) == -1)
          blacklist.push(id);
    });
    GM_setValue('blacklist', JSON.stringify(blacklist));

    if ($xb("//a[contains(@class,'utility')]/child::text()[.='Reply to topic' or .='Add a comment']"))
      forEach($x('//td[@class="author vcard"]//span[@class="role"]'),
        function (role) {
          var userid = role.getElementsByTagName('a')[0].href.match(/\/users\/(\d+)\//i)[1],
            movement = $x1('./ancestor::tr[contains(@class,"post hentry")]//td[@class="uso_movement"]', role);
          if (blacklist.indexOf(userid) != -1)
            minimizeSpam(userid, role, movement);
      });
  }

  function syncBlacklist() {
    if (new Date().getTime() > (+GM_getValue('lastsynced', 0) + 1000*60*30)) {
//       xhr('http://sizzlemctwizzle.com/spamreport/', saveBlacklist);
    }
  }

  function createReplyForm(doc) {
    var form = $x1('//form[@id="new_message"]', doc);
    if (!form)
      window.location.href += '/reply';
    else
      $('reply_holder_div').appendChild(form);
  }

  function quotePM(doc) {
    if (doc) createReplyForm(doc);
    var select,
      quoted = (select=window.getSelection()) && (select.focusNode) && (isPost(select, 'PMbody')) ?
        selectHTML(select, $('PMbody')) : $('PMbody').innerHTML,
      box = $('message_body');

    quoted = '<blockquote>' +
      usoUnEscaper(quoted.replace(/^(<p>\s*<\/p>)/g,'').replace(/^(\s*<br>\s*)*\s*/,'').replace(/^\s*/,'').replace(/<pre>((?:.|\s)*?)<\/pre>/gmi,function (str,p1) { return'<pre>'+p1.replace(/\n/g,'<br>')+'</pre>'}).replace(/\n/g, '').replace(/<!--((?:.|\n)*)-->/, '').replace(/<br>/g, '\n').replace(/<p>/g, '').replace(/<\/p>/g, "\n").replace(/^\s+|\s+$/g, '').replace(/ {2,}/g,' '))
      + '</blockquote>';

    if (!box) {
      /**
       * TODO: Perhaps add some safe persistent storage at some point to be
       * able to do quote with First Party Only cookies enabled instead of
       * just returning.
       */
      return;
    }

    box.focus();

    if (box.value == '') {
      box.value = quoted;
      box.scrollTop = box.scrollHeight;
    }
    else {
      var x, y;
      if ( (y=box.selectionEnd) - (x=box.selectionStart) == 0 ) { // insert quote at cursor
        box.value = (box.value).substring(0, x) + quoted + '\n' + (box.value).substring(y, (box.value).length);
        var len = ((box.value).substring(0, x) + quoted).length
        box.setSelectionRange(len, len);
      }
      else { // append quote
        if (/\n$/.test(box.value))
          box.value = box.value.replace(/\n+$/,'');
        box.value += quoted;
        box.scrollTop = box.scrollHeight;
      }
    }
  }

  function attachElements(type) {
    if ($('spam_manager')) {
      var checker=setInterval(function (){
          if (!/display:\s*none\s*;?/i.test($(type).getAttribute('style'))) {
            clearInterval(checker);
            $(type).style.display = 'none';
          }
      }, 200);
      return;
    }
    $(type).appendChild(create('span',{className:'commentFixEditboxLoaded'}));

    var checker=setInterval(function (){
        var box, submit;
        if (type!='edit'||!$xb('./span[@class="commentFixEditboxLoaded"]', $(type))) {
    clearInterval(checker);

    // Preview Setup
    submit=$x1(".//input[@name='commit']", $(type));
    box = $(type).getElementsByTagName("textarea")[0];
    if (!$('post_preview')) createElements();
    insertAfter($('previewBtn'), submit);
    insertAfter($('preview_spacer'), submit);
    insertAfter($('editBtn'), $('previewBtn'));
    insertAfter($('post_preview'), box);
    editPost(box);
    // End Preview

    if ($(type).offsetHeight>0) lengthenPage($(type));
    var topTd, bottomTd, deleteBtn, cancel, span, cross, tbody;

    if (topTd=$x1('.//h5/child::text()[contains(., "Presentational HTML allowed")]/ancestor::td', $(type))) {
            topTd.className += " crap_holder";
      tbody=topTd.parentNode.parentNode;
      bottomTd=tbody.getElementsByTagName("tr")[1].getElementsByTagName("td")[0];

      if (deleteBtn=$x1('.//a[@class="utility"]/child::text()[contains(., "delete post")]', $(type))) {
        cancel = $x1('.//a/child::text()[contains(., "cancel")]', $(type)).parentNode;
        span = cancel.parentNode;
        span.appendChild(document.createTextNode(" or "));
        deleteBtn.parentNode.setAttribute('style', 'float:none;display:inline;');
        deleteBtn.parentNode.addEventListener("click", function () { lengthenPage($('edit')); },false);
        cancel.addEventListener("click", function () { lengthenPage($('edit')); },false);
        span.parentNode.insertBefore(deleteBtn.parentNode, span.nextSibling);
      }

      var markdown = $x1('.//input[@id="post_markdown"]', $(type));
      if (markdown) {
        var markdownH5 = markdown.parentNode;
        markdownH5.parentNode.parentNode.appendChild(markdownH5); // Scoot this somewhere else out of harms way
      }

            // Fucking massive block of HTML below :(
      topTd.innerHTML =
        [
          '<h5>Presentational HTML allowed for Posting Code</h5>',

          '<h5>Use <code>&lt;code&gt;</code> for inline code and <code>&lt;pre&gt;</code> for code blocks.</h5>',

          '<h5>Shortcuts</h5>',

          '<h5>Highlight text and press <code>' + ((navigator.userAgent.match('Macintosh')) ? 'Ctrl' : 'Alt') + ' +&hellip;</code>',

          '<table style="font-weight: normal; font-size: 10px;">',
            '<tr style="padding: 0;" valign="top">',
              '<td style="padding: 0; padding-right: 20px;">',
                '<code><a href="#" class="quick_shortcut">c</a></code> - <code style="background-color: #eee; border-top-color: #333; border-top-style: none; border-top-width: 0; color:#000;">&lt;code&gt; block</code>',
              '</td>',
              '<td style="padding:0;">',
                '<code><a href="#" class="quick_shortcut">p</a></code> - <pre style="padding: 0; display: inline; color:#000; background-color: #eee; border-bottom-color: #ccc; border-bottom-style: solid; border-bottom-width: 1px; border-left-color: #ddd; border-left-style: solid; border-left-width: 3px; border-top-color: #ccc">&lt;pre&gt; block</pre>',
              '</td>',
            '</tr>',
            '<tr style="padding: 0;">',
              '<td style="padding: 0;">',
                '<code><a href="#" class="quick_shortcut">q</a></code> - <blockquote style="padding: 0 !important; display: inline; background-color: #efc; border-bottom-color: #cda; border-bottom-style: solid; border-bottom-width: 1px; border-left-color: #9a7; border-left-style: solid; border-left-width: 3px; border-top-color: #cda; margin: 0; color:#000;">&lt;blockquote&gt;</blockquote>',
              '</td>',
              '<td style="padding: 0;">',
                '<code><a href="#" class="quick_shortcut">b</a></code> - <strong>bold</strong>',
              '</td>',
            '</tr>',

            '<tr style="padding: 0;">',
              '<td style="padding: 0;">',
                '<code><a href="#" class="quick_shortcut">i</a></code> - <em>italics</em>',
              '</td>',
              '<td style="padding: 0;">',
                '<code><a href="#" class="quick_shortcut">u</a></code> - <ins>underline</ins>',
              '</td>',
            '</tr>',
            '<tr style="padding: 0;">',
              '<td style="padding: 0;">',
                  '<code><a href="#" class="quick_shortcut">s</a></code> - <del style="color: #fff;">strikethrough</del>',
              '</td>',
              '<td style="padding: 0;">',
                '<code><a href="#" class="quick_shortcut">l</a></code> - <a href="javascript:void(0);" class="example_link">linking</a> (prompt)',
              '</td>',
            '</tr>',
            '<tr style="padding: 0;">',
              '<td style="padding: 1px;">',
                '<code><a href="#" class="quick_shortcut">a</a></code> - &lt;a href=&quot;&quot;&gt;<a href="javascript:void(0);" class="example_link">link</a>&lt;/a&gt;',
              '</td>',
              '<td style="padding: 0;">',
                '<code><a href="#" class="quick_shortcut">x</a></code> - &lt;img src=&quot;<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAbtJREFUKBUFwT2LVGcYANAzz7x7790PXVgZZRBNNsTKBEwVFHsryzSJhZWpUwT8E/6GIKlCSJNSSMQfEAiBNMoSUizLsMyqa3b3zsx7n8k5o+e//vEsM765WGXXVwAAAACaQjv2Q0nx6OH9G5O2bUeiAAAAgEWSw8ovv715XC4W2TZtO/rx1Vu9uVOv7V87ttW8UzPNP3T+frNry23FFd9/9bEhY1SWlVEUI/Qxsz851nX/etd/UGs1bjfsfzT1z8GOveaKTKDAGhFh6VhTTpycv7eqvX5YquiazsXiSHQhJVKBRATrZepzZVF756veMqt1IpYyq3EJCQiQhNCaODvbRmOZ1aoOROPi9LLt5roSIxIokIjC5bzucDZzqT2ytRNqVGfzTbPZ1PTSJ0oAUBLWRITtZmJa7zj886XdnUNq2ugnbt56ZKedqusEUCDxev6tmikzfbo4du/GTYmDo5kXp09lplwnXoBCCjz44jsA489OnP831x395eq9J74eNwAACpAAYNjcM2zuWUxuAQAgQOlKvJfD7p1rX4IEAAAA1GFlHLEuG2M//fz7wd3VkJ8DAAAAwDgoI8//B4twvpH2WzVrAAAAAElFTkSuQmCC" />&quot; /&gt;',
              '</td>',
            '</tr>',
            '<tr>',
              '<td colspan="2" style="padding-bottom: 0; padding-top: 0;">',
                '&hellip;or click the links above.',
              '</td>',
            '</tr>',
          '</table>',

              (
                type == "reply" && /^\/topics\//.test(location.pathname)
                    ? [
              '<h5 style="align: right; text-align: right;">',
                'Auto-watch topics you reply to: <input type="checkbox" id="autowatch_enabled" />',
              '</h5>'

                      ].join("")

                    :
            ''
            )

        ].join("")
      ;

      if (markdown) {
        if (type == "reply" && /^\/topics\//.test(location.pathname))
          topTd.insertBefore(markdownH5, topTd.lastChild);
        else
          topTd.appendChild(markdownH5);

        var wikipedia = '<a href="http://www.wikipedia.org/wiki/Markdown">Markdown</a>';
        if (markdown.nextSibling.nextSibling)
          markdown.nextSibling.nextSibling.innerHTML = wikipedia;
        else if (markdown.nextSibling)
          markdown.nextSibling.innerHTML = wikipedia;


        if (markdown.checked)
          $('previewBtn').disabled = true;
        else
          $('previewBtn').disabled = false;
      }

      forEach($c('quick_shortcut'), function (link) {
          link.addEventListener("click", function (e) {
              var box = $x1("./ancestor::tbody//textarea", e.target);
              shortcuts(e.target.textContent, box);
              e.preventDefault();
          },false);
        });

      if (markdown) {
        markdown.addEventListener("click", function (e) {
          if (e.target.checked)
            $('previewBtn').disabled = true;
          else
            $('previewBtn').disabled = false;
        }, false);
      }

      if ($('autowatch_enabled') && /^https?:\/\/userscripts\.org(?::\d{1,5})?\/topics\//.test(window.location.href)) {
        var watch_checkbox = $('autowatch_enabled');
        watch_checkbox.checked = GM_getValue('autowatch_enabled', true);
        watch_checkbox.addEventListener("click",
          function () {
            GM_setValue('autowatch_enabled', watch_checkbox.checked);
        }, false);
        var button = $x1('//div[@id="reply"]//input[@name="commit"]');
        button.setAttribute("type", "button");
        button.addEventListener('click',  function () {
            if (!GM_getValue('autowatch_enabled', true)
                || $('monitor_checkbox').checked) {
              var box = $x1('.//textarea[1]', $('reply'));
              box.value = usoEscaper(box.value);
              $x1('//div[@id="reply"]//form[1]').submit();
              return;
            }
            xhr('/topics/' + location.pathname.match(/topics\/(\d+)/)[1] + '/monitorships', // NOTE: What is this url?
                function () {
                  var box = $x1('.//textarea[1]', $('reply'));
                  box.value = usoEscaper(box.value);
                  $x1('.//form[1]', $('reply')).submit();
                },
                'authenticity_token=' + encodeURIComponent(unsafeWindow.auth_token));
        }, false);
        $('reply').getElementsByTagName("textarea")[0].setAttribute('rows', '16');
      }

      topTd.setAttribute('width', '45%');
      if (cross=$x1(".//img[@alt='Cross']/..", tbody)) remove(cross);

      if (type=='edit') {
        $x1('.//input[@name="commit"]',
      $('edit')).addEventListener("click", function (e) {
            $('edit').style.display = 'none';
            lengthenPage($('edit'));
          }, false);
      }
      else {
        $x1('.//text()[contains(., "cancel")]/..',
      $('reply')).parentNode.addEventListener("click",
                function (e) {
                                                var box = $x1('./ancestor::div[@class="editbox"]', e.target);
                  box.style.display = 'none';
                  lengthenPage(box);
                  $('post_body').value = '';
                },false);
      }
    }
        }
      },10);
  }

  function minimizeSpam(userid, role, movement) {
    var showLink;
    movement.appendChild(create(' | '));
    movement.appendChild((showLink=create('a', { textContent: 'Show Post',
        href: '#',
        style: 'align:left;',
        onclick: function (e) {
          e.preventDefault();
          var link = e.target;
          var blacklist = JSON.parse(GM_getValue('blacklist', '[]'));
          var id = link.getAttribute('userid');
          var index = blacklist.indexOf(id);
          if (link.textContent == "Show Post") {
            if (index != -1) {
              blacklist.splice(index, 1);
              GM_setValue('blacklist', JSON.stringify(blacklist));
            }
            link.textContent = "Hide Post";
            $x1('./ancestor::tr[contains(@class,"post hentry")]', link).classList.remove('spammer');
          }
          else {
            if (index == -1) {
              blacklist.push(id);
              GM_setValue('blacklist', JSON.stringify(blacklist));
            }
            link.textContent = "Show Post";
            $x1('./ancestor::tr[contains(@class,"post hentry")]', link).classList.add('spammer');
          }
    }})));
    showLink.setAttribute('userid', userid);
    $x1('./ancestor::tr[contains(@class,"post hentry")]', role).classList.add('spammer');
  }

  if ($('reply'))
    GM_registerMenuCommand("Open Report Manager!", function () {
        spam_manager();
    });

  var blacklist = JSON.parse(GM_getValue('blacklist', '[]'));
  var replyPMLink = $x1('//p[@class="controls"]/a/child::text()[.="reply"]/..');
  //var blacklist = ["27715"];
  if ($xb("//a[contains(@class,'utility')]/child::text()[.='Reply to topic' or .='Add a comment']")) {

    // Create Spam Reports "Dashboard" entity
    insertAfter(create("li", {},
    create('a', {
      textContent: eval(GM_getValue("spam_reports", "([])")).length + " Reports",
      href: "#",
      onclick: function (e) {
        spam_manager();
        e.preventDefault();
      }
    })
    ), $x1(".//ul[@class='login_status']", $('top')).firstChild);

    window.addEventListener("focus", function () {
      $x1(".//ul[@class='login_status']//a[contains(.,' Reports')]", $('top')).textContent = eval(GM_getValue("spam_reports", "([])")).length + " Reports";
    }, false);


    var replyCount = 0;
    forEach($x('//td[@class="author vcard"]//span[@class="role"]'),
      function (role) {
        replyCount++;

              var userid = $x1('.//a[@user_id]', role.parentNode).getAttribute('user_id');
        var editLink, deleteLink, movement;
        if (editLink=$x1(".//span[@class='edit']", role.parentNode)) {
          deleteLink = create('a',
            {href: '#',
            className: 'utility',
            textContent: 'Delete post',
            style: 'display: block; clear: both; color: #666; padding-top: 3px;',
            onclick: function (e) { delete_handle(e); }});
          insertAfter(deleteLink, editLink);
          var temp = role;
          role = deleteLink;
        }
        else {
          insertAfter(create('a',
            {href: '#',
            className: 'utility',
            textContent: 'Report Spam',
            style: 'display: block; clear: both; padding-bottom: 3px;',
                              onclick: function (e) { if (!$('spam_manager')) spam_manager(); report_handle(e); }}), role);
        }

        insertAfter(create('a', {href: '#',
                    className: 'utility',
                    textContent: 'Quote',
                          style: 'display: block; clear: both; padding-top: 3px;'+(editLink?' color: #666;':''),
                          onclick: function (e) { quote_handle(e); }}), role);

        role = (temp||role);
        role.parentNode.style.height = "100%";
        role.parentNode.insertBefore((movement=create('td', {style:'width: 100%;height: 100%; vertical-align:bottom; float:left; padding-left:0; margin-left:0; margin-bottom:0;padding-bottom:0;padding-top:0;margin-top:0;', className: 'uso_movement'},
                create('a', {href: '#top',
                textContent: '\u2b06',
                style: 'font-size:14px;align:left;'}),
                create(' '),
                create('a', {href: '#footer',
                textContent: '\u2b07',
                style: 'font-size:14px;align:left;'}))),
            role.parentNode.firstChild);
              if (blacklist.indexOf(userid) != -1)
                minimizeSpam(userid, role, movement);
      });

    if (replyCount == 0 && window.location.pathname.match(/\/topics\/\d+\/?$/i)) {
      var utility = $x1("//a[contains(@class,'utility')]/child::text()[.='Reply to topic']").parentNode.parentNode;
      utility.appendChild(create(' | '));
      utility.appendChild(create('a', {
          href: '#',
          className: "utility",
          textContent: 'Report as empty',
          onclick: function (e) { if (!$('spam_manager')) spam_manager(); report_handle(e); }}));
    }

  // Edit MM
    var temp;
    if ((temp = $x1('//span[@class="rate"]')))
      temp.appendChild(create('a',
        {href: '#',
          className: 'utility spam',
          textContent: 'Report Spam',
                            onclick: function (e) { if (!$('spam_manager')) spam_manager(); report_handle_review(e); }
        }));

    forEach($x('//div[@class="author"]//em'),
      function (role) {
              var userid = $x1('.//a[@user_id]', role.parentNode).getAttribute('user_id');
        var editLink, movement, temp;

        if (editLink=$x1(".//a[@class='utility edit']", role.parentNode.parentNode))
          ;
        else {
          temp = $x1('div[@class="actions"]', role.parentNode.parentNode);
          temp.appendChild(create('a',
            {href: '#',
              className: 'utility spam',
              textContent: 'Report Spam',
                                onclick: function (e) { if (!$('spam_manager')) spam_manager(); report_handle_comments(e); }
            }), role);
        }

        role.parentNode.insertBefore((movement=create('span', {className: 'uso_movement'},
                create('a', {href: '#top',
                textContent: '\u2b06',
                style: 'font-size:14px;align:left;'}),
                create(' '),
                create('a', {href: '#footer',
                textContent: '\u2b07',
                style: 'font-size:14px;align:left;'}))),
            role.parentNode.firstChild);

              if (blacklist.indexOf(userid) != -1)
                minimizeSpam(userid, role, movement);
      });
  // /Edit MM

    window.height = window.innerHeight + window.scrollMaxY;
    forEach($x('//a[contains(@class,"utility")]/child::text()[.="Edit post" or .="Reply to topic" or .="Add a comment" or .="Edit"]'),
      function (node) {
        node.parentNode.addEventListener('click', function (e) {
            attachElements(e.target.textContent.replace(/ (to topic|post)/, '').replace(/(.*comment)/, 'reply').toLowerCase());
            e.preventDefault();
          },false);
      });

    // A couple of style fixes for preview
    GM_addStyle("#preview_body pre  { width: 95% !important; white-space:pre-wrap !important; } #preview_body code { background-color: rgb(238, 238, 238) !important; } #preview_body blockquote  { min-width: 500px !important; margin-right: 5px !important; padding-top: 1px !important; padding-bottom: 1px !important; }");

    // Create a holder for the elements
    document.body.appendChild(create('div',{id:"tempPreviewHolder", style:"display: none;"}));

    // Put the elements in the starting position
    if (starting=$('new_topic')||$('reply')) attachElements(starting.id);

  }
  else if (replyPMLink) {
    replyPMLink.setAttribute('href', '#');
    replyPMLink.parentNode.appendChild(create(' | '));
    var quoteLink = replyPMLink.cloneNode(true);
    quoteLink.textContent = 'quote';
    replyPMLink.parentNode.appendChild(quoteLink);
    $x1('//div[@class="message_full recieved"]//div[@class="body"]').setAttribute('id', 'PMbody');
    quoteLink.addEventListener('click', function (e) {
        if (!$('reply_holder_div') && !$('new_message')) {
          var spacer = create('div', { style: 'height: 10px;width:100%;border-bottom:1px solid #ccc;' });
          var holder = create('div', { id: 'reply_holder_div', style: 'margin-left: 200px;clear:both;' }, spacer);
          $x1('//li[@class="full"]').appendChild(holder);
          xhr(window.location.href + '/reply', function (txt) { makeDoc(txt, quotePM); });
        }
        else
          quotePM();
        e.preventDefault();
    }, false);
    replyPMLink.addEventListener('click', function (e) {
        if (!$('reply_holder_div')) {
          var spacer = create('div', { style: 'height: 10px;width:100%;border-bottom:1px solid #ccc;' });
          var holder = create('div', { id: 'reply_holder_div', style: 'margin-left: 200px;clear:both;' }, spacer);
          $x1('//li[@class="full"]').appendChild(holder);
          xhr(window.location.href + '/reply', function (txt) { makeDoc(txt, createReplyForm); });
        }
        e.preventDefault();
    }, false);
  }

})();
