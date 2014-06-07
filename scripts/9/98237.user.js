// ==UserScript==
// @name           ymbgaAllowFriend
// @namespace      ymbgaAllowFriend
// @include        http://yahoo-mbga.jp/*
// ==/UserScript==

(function(){
  if(!location.href.match("http://yahoo-mbga\.jp/[0-9]+/friend") ) {
    return;
  }


  if(!GM_getValue("comment") || location.href.match("http://yahoo-mbga\.jp/[0-9]+/friend$")) {
    GM_setValue("comment", prompt("友達希望のコメントを設定してください", "友達になりましょう"));
  }
  if(!GM_getValue("wait_second") || location.href.match("http://yahoo-mbga\.jp/[0-9]+/friend$")) {
    GM_setValue("wait_second", prompt("待機秒数を設定してください(半角)", "20"));
  }

  comment = GM_getValue("comment");
  wait_second = GM_getValue("wait_second");

  second=0;
  var app = new Applicant();
  setInterval(function(){
              init();
            },
            1000);

  function Applicant(){
    this.ptr = 0;
    this.applyAccept = document.evaluate('//*[@id="apply_accept"]',
                                        document,
                                        null,
                                        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                        null );
    this.getPath = function() {
      var path = attribute(this.applyAccept.snapshotItem(this.ptr), "href");
      this.ptr++;
      return path;
    }

    this.allow   =   function (path){
      var action;
      var form;
      var action;
      var textarea;
      var input;
      var httpRequest;
      var doc;
      var query;

      httpRequest = new XMLHttpRequest();
      httpRequest.open('GET', path, false);
      httpRequest.send(null);
      doc = document.documentElement;
      doc.innerHTML = httpRequest.responseText;
      textarea = document.evaluate('//textarea',
                                   doc,
                                   null,
                                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                   null );
      if( 0 < textarea.snapshotLength ) {
        form = document.evaluate('//form',
                                 doc,
                                 null,
                                 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                 null );
        action = attribute(form.snapshotItem(0), "action");
        query = "comment" + "=" + encodeURI(comment);
        input = document.evaluate('//form//input[@type="hidden"]',
                                  doc,
                                  null,
                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                  null );
        for(var i = 0; i < input.snapshotLength; i++)
        {
          query = query + "&" + encodeURI(attribute(input.snapshotItem(i), "name")) + "=" + encodeURI(attribute(input.snapshotItem(i), "value"));
        }
        httpRequest.open('POST', action, false);
        httpRequest.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
        httpRequest.send(query);
      }
      doc.innerHTML = httpRequest.responseText;
      form = document.evaluate('//form',
                               doc,
                               null,
                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                               null );
      action = attribute(form.snapshotItem(0), "action");
      query = "";
      input = document.evaluate('//form//input[@type="hidden"]',
                                doc,
                                null,
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                null );
      for(var i = 0; i < input.snapshotLength; i++)
      {
        query = query + "&" + encodeURI(attribute(input.snapshotItem(i), "name")) + "=" + encodeURI(attribute(input.snapshotItem(i), "value"));
      }
      httpRequest.open('POST', action, false);
      httpRequest.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
      httpRequest.send(query);
      doc.innerHTML = httpRequest.responseText;
    }
  }

  function is_wait(){
    second++;
    if (wait_second < second) {
       second = 0;
       return false;
    } else {
       return true;
    }
  }

  function attribute(node, name){
    if(node == null) {
      return null;
    }
    attributes = node.attributes;
    for(var i = 0; i < attributes.length; i++)
    {
      if(attributes.item(i).nodeName == name) {
        return attributes.item(i).nodeValue;
      }
    }
    return null;
  }

  function init(){
    var path;
    if(is_wait() == false) {
      if(path= app.getPath()) {
        app.allow(path);
      } else {
        location.reload();
      }
    }
  }

})();

