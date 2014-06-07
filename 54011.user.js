// ==UserScript==
// @name           tumblr popup editor
// @description    Popup edit article for tumblr. tumblr用:記事の編集をポップアップで行えます。
// @version        0.2.0
// @namespace      http://www.sharkpp.net/
// @author         Shark++ / sharkpp
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/drafts*
// @include        http://www.tumblr.com/queue*
// @include        http://www.tumblr.com/tumblelog/*
// @exclude        http://www.tumblr.com/tumblelog/*/new/*
// ==/UserScript==

//var renderEditor = "";

function onClickPostEdit(e)
{
  var body = document.getElementsByTagName('body')[0];

  var container = body.appendChild(document.createElement('div'));
  container.id = "popup_editor_container";
  container.style.cssText = "position: absolute; width: 100%; left: 0; top: 0; z-index: 999;";

  var content = container.appendChild(document.createElement('div'));
  content.style.cssText = "position: absolute; width: 90%; left: 5%; top: 5em; z-index: 1;";

  var lightbox = container.appendChild(document.createElement('div'));
  lightbox.style.cssText = "position: absolute; width: 100%; height: " + document.documentElement.scrollHeight + 'px' + "; left: 0; top: 0; background-color: black;";
  lightbox.style.opacity = "0.30";

//  content.innerHTML = '<div ><img src="http://assets.tumblr.com/images/loading.gif" alt="loading" /></div>';

  var req = new XMLHttpRequest();
  req.open('GET', this.href, true);
  req.onreadystatechange = function (aEvt) {
    if(req.readyState == 4) {
      if(req.status == 200)
      {
        lightbox.style.opacity = "0.60";

       // // render editor script load
       // var js = document.createElement('script');
       // js.src     = "http://assets.tumblr.com/javascript/editor.js";
       // js.lang    = "javascript";
       // js.type    = "text/javascript";
       // container.appendChild(js);

        // delete unnecessary element and modify styles
        var text = req.responseText;
        text = text.replace(/^[\s\S]+?(<div id="container">[\s\S]+<\/div>)[\s\S]+/m, '$1');
        text = text.replace(/<div id="header_container">[\s\S]+?(<img[^>]+id="content_top")/m, '$1');
        text = text.replace(/<div id="footer"[\s\S]+?<\/div>/m, '');
        text = text.replace(/(id="content")/, '$1 style="-moz-border-radius: 0; border-radius: 0;"');
        text = text.replace(/(id="content_top")/, '$1 style="display: block;"');
        text = text.replace(/(id="content_bottom")/, '$1 style="display: block;"');
//        var jscode = text.match(/<script.+?>[\s\S]+?<\/script>/g).join("\n").replace(/<script.+?>([\s\S]+?)<\/script>/g, "$1");

        // apply popup
        content.innerHTML = text;

      //  var x = eval(renderEditor);

        // cancel button action modify, page do not change.
        var cancel_button = document.getElementById('cancel_button');
        cancel_button.setAttribute("onclick",
          cancel_button.getAttribute("onclick").replace(
            /location\.href.+?;/,
            "var elm = document.getElementById('popup_editor_container');" +
            "elm.parentNode.removeChild(elm);" +
            "window.scrollTo(window.scrollX, " + window.scrollY + ");"
            ).replace(
            /clear_backup_interval\(\);/, ""
            ));

        // scroll to top
        window.scrollTo(window.scrollX, 0);

//        eval(jscode);
      }
    }
  };
  req.send(null); 

  e.preventDefault();
  e.stopPropagation();
}

(function(){

  var rnd = '?'+Math.round(Math.random()*1000);

  var head = document.getElementsByTagName('head')[0];

  // edit post style load
  var css = document.createElement('link');
  css.href = "http://assets.tumblr.com/stylesheets/compressed/edit_post.css";//+rnd;
  css.type = "text/css";
  css.rel  = "stylesheet";
  head.appendChild(css);

  // edit style load
  var css = document.createElement('link');
  css.href = "http://assets.tumblr.com/stylesheets/compressed/editor.css"+rnd;
  css.type = "text/css";
  css.rel  = "stylesheet";
  head.appendChild(css);

  // editor ui style load
  var css = document.createElement('link');
  css.href = "http://www.tumblr.com/javascript/tiny_mce_3_2_7/themes/advanced/skins/default/ui.css"+rnd;
  css.type = "text/css";
  css.rel  = "stylesheet";
  head.appendChild(css);

//  // render editor script load
//  var js = document.createElement('script');
//  js.src = "http://assets.tumblr.com/javascript/editor.js"+rnd;
//  js.lang= "javascript";
//  js.type= "text/javascript";
//  head.appendChild(js);

  // editor script load
  var js = document.createElement('script');
  js.src = "/javascript/tiny_mce_3_2_7/tiny_mce.js"+rnd;
  js.lang= "javascript";
  js.type= "text/javascript";
  head.appendChild(js);

  // overwrite edit_post.css #contents style
  var items
    = document.evaluate(
      "//div[@id='content']",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

  for(var i = 0; i < items.snapshotLength; i++) {
    var item = items.snapshotItem(i);
    item.style.cssText = "background:#2C4762 none repeat scroll 0 0; padding:20px;";
  }

  // replace edit link
  var items
    = document.evaluate(
      "//div[@class='post_controls']/descendant::a[text()=string('edit')]",
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);

  for(var i = 0; i < items.snapshotLength; i++) {
    var item = items.snapshotItem(i);
    item.addEventListener('click', onClickPostEdit, false);
  }

})();
