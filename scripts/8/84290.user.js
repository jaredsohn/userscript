// ==UserScript==
// @name           FC Bayern FIX
// @namespace      http://boeckler.org/greasemonkey
// @include        http://www.fcbayern.telekom.de/*
// @include        http://www.fcbayern.t-home.de/*
// @include        http://www.fcbayern.t-com.de/*
// @include        http://*.fcbayern.de/*
// ==/UserScript==

// copyright by Andreas Boeckler, andy@boeckler.org

var $ = null;
var myWindow = null;
var ownJQuery = false;

function $x() {
  var x='';
  var node=document;
  var type=0;
  var fix=true;
  var i=0;
  var cur;
    
  function toArray(xp) {
    var final=[], next;
    while (next=xp.iterateNext()) {
      final.push(next);
    }
    return final;
  }
  
  while (cur=arguments[i++]) {
    switch (typeof cur) {
      case "string": x+=(x=='') ? cur : " | " + cur; continue;
      case "number": type=cur; continue;
      case "object": node=cur; continue;
      case "boolean": fix=cur; continue;
    }
  }
  
  if (fix) {
    if (type==6) type=4;
    if (type==7) type=5;
  }
  
  // selection mistake helper
  if (!/^\//.test(x)) x="//"+x;

  // context mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;

  var result=document.evaluate(x, node, null, type, null);
  if (fix) {
    // automatically return special type
    switch (type) {
      case 1: return result.numberValue;
      case 2: return result.stringValue;
      case 3: return result.booleanValue;
      case 8:
      case 9: return result.singleNodeValue;
    }
  }

  return fix ? toArray(result) : result;
}
var greasekit = false;
(function() {
     if (typeof unsafeWindow == 'undefined') {
         greasekit = true;
         myWindow = window;
     }
     else {
         myWindow = unsafeWindow['window'];
     }
     if(typeof myWindow.jQuery == 'undefined') {
         ownJQuery = true;
         var userCSS = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/blitzer/jquery-ui.css';
         var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
         GM_JQ = document.createElement('script');
         
         GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
         GM_JQ.type = 'text/javascript';
         GM_JQ.async = true;
         var GM_JQUI = document.createElement('script');
         GM_JQUI.src=  'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.2/jquery-ui.min.js';
         GM_JQUI.type = 'text/javascript';
         GM_JQUI.async = true;
         var GM_CSS = document.createElement('link');
         GM_CSS.rel = 'stylesheet';
         GM_CSS.href = userCSS;
         GM_CSS.async = true;
         GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
         GM_Head.insertBefore(GM_JQUI, GM_Head.firstChild);
         GM_Head.insertBefore(GM_CSS, GM_Head.firstChild);
     }
     GM_wait();
})();

function GM_wait() {
    if (typeof myWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = myWindow.jQuery;
        if(ownJQuery) $.noConflict();
        $(doIt);
    }
}

function fixCommunityLink() {
    var fcb_sid = myWindow.fcb_sid;
    var link = $('a[title="Community"]');
    if(link.length > 0 ) {
        link.removeAttr('onclick');
        var href = link.attr('href');
        //var regex = /window.open.*fcb_sid=([^']*)/;
        //var m = regex.exec(href);
        //if(m) {
            //fcb_sid = m[1];
            var url = 'http://community.fcbayern.de/forum/?fcb_sid=' + fcb_sid;
            link.attr('href',url);
        //}
    }
}
function fixLogin() {
    var actionUrl = "/de/login_form.php";
    var form = $('<form action="'+actionUrl+'" method="post" style="float:left">' +
                 '<input type="hidden" value="true" name="authorize">' + 
                 '<label style="color:white">User:</label><input type="text" name="USERNAME" size="9" class="hundret">' +
                 '<label style="color:white">Pass:</label><input type="password" name="PASSWORD" size="9" class="hundret">' +
                 '<input type="submit" value="Submit" style="display:none"></form>');

    var oldButton = $('a.btn_login');
    var fcb_sid = myWindow.fcb_sid;
    if(oldButton.length>0 && true) {
        var doSubmit = function(evt) {
            evt.preventDefault();
            $.post(actionUrl, form.serialize(), function() {
                       // einmal aufrufen, wg cookie
                       $.get('http://community.fcbayern.de/index.php?target=forum&fcb_sid='+fcb_sid, function(data) {
                                 myWindow.location.reload();
                             });
                   });
        };
        oldButton.before(form);
        oldButton.unbind();
        oldButton.removeAttr('rel');
        oldButton.click(doSubmit);
        form.submit(doSubmit);
    }
}

function fixCommunity() {
    $('a.forum_link').unbind();
    $('a.footer_link').button().removeClass('footer_link');
    $('input[type="submit"]').attr('class','').button();
    $('input[type="button"]').each(function() {
                                       var value = $(this).val().replace(/ /g,'');
                                       $(this).val(value);
                                       $(this).attr('style','');
                                       $(this).attr('class','').button();
                                   });
    $('.mods a').button();
    // erstmal die Navi
    var navigation = $('td.mods[align="right"]:last') || [];
    if(navigation.length>0) {
        var insertPoint = $x('/html/body/table/tbody/tr/td/table[4]/tbody/tr/td/a');
        var newNav = $('<div class="ui-state-default" style="float:right">' + navigation.html() + '</div>');
        newNav.find('table').remove();
        var current = newNav.find('b');
        if(current.length>0) {
            current.after($('<a class="ui-state-active"/>').text(current.text()).button());
            current.remove();
        }
        $(insertPoint).after(newNav);
    }
    // 
    var comments = $x('/html/body/table/tbody/tr/td/table[4]/tbody/tr/td/table') || [];
    if(comments.length>0) {
        $.each(comments, function(index, table) {
                   var trs = $(table).find('tr');
                   var toggleTr = trs[0];
                   var hideTr = trs[1];
                   $(toggleTr).css({'background-color': '#eee', 'cursor':'pointer'});
                   $(toggleTr).click(function() { $(hideTr).toggle(); });
               });
    }
}

function doIt() {
    myWindow.xt_click = function() {};
    fixCommunityLink();
    fixLogin();
    if($('link[rel="help"]').length>0) { // forum
        fixCommunity();
    }
}

