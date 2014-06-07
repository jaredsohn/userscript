// ==UserScript==
// @name           ETI Image Transload 2013
// @description    Transloads images from web sites onto ETI
// @include        *
// @exclude        http://endoftheinter.net*
// @exclude        https://endoftheinter.net*
// @exclude        http://*.endoftheinter.net*
// @exclude        https://*.endoftheinter.net* 
// @require        http://userscripts.org/scripts/source/69456.user.js 
// @history        1.1 Release
// @history        1.0 First version
// ==/UserScript==

if (!("contextMenu" in document.documentElement &&
      "HTMLMenuItemElement" in window)) return;

var body = document.body;
body.addEventListener("contextmenu", initMenu, false);

var menu = body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-ETI-transload" type="context">\
                    <menuitem label="Transload to ETI"\
icon="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAKSSP/IJ8d/yqxHv/j6ef//////1xYRv8AAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFxYRv+Ggof/paSt/8LFyv/Cxcr/XFhG/1xYRv9cWEb/XFhG/1xYRv8AAAAAAAAAAAAAAAAAAAAAAAAAAFxYRv+Ggof/paSt/8XGzv/Cxcr/wsXK/8LFy\
v/Cxcr/wsXK/8LFyv/Cxcr/XFhG/1xYRv8AAAAAAAAAAAAAAACGgof/paSt/8LFyv/j6ef/wsXK/wpJI/8KSSP/Ckkj/8LFyv/Cxcr/wsXK/8LFyv8KSSP/Ckkj/wAAAAAAAAAAhoKH/8LFyv/j6ef/wsXK/wpJI\
/8gnx3/IJ8d/yCfHf8KSSP/Ckkj/wpJI/8KSSP/IJ8d/yCfHf8KSSP/AAAAAIaCh//j6ef/wsXK/wpJI/8gnx3/IJ8d/yCfHf8gnx3/IJ8d/yCfHf8gnx3/IJ8d/yCfHf8gnx3/IJ8d/wpJI/+Ggof/paSt/wpJI\
/8gnx3/IJ8d/yCfHf8gnx3/IJ8d/yCfHf8gnx3/IJ8d/yCfHf8gnx3/IJ8d/yqxHv8KSSP/hoKH/6Wkrf8KSSP/KrEe/yCfHf8gnx3/IJ8d/yCfHf8gnx3/IJ8d/yCfHf8gnx3/IJ8d/yqxHv8sxin/Ckkj/yt0K\
f8PhAf/LMYp/yqxHv8gnx3/IJ8d/yCfHf8gnx3/IJ8d/yCgHf8gnx3/Ckkj/yqxHv8KSSP/M9w0/wpJI/8KSSP/D4QH/yzGKf8sxin/KrEe/yCfHf8gnx3/IJ8d/yCfHf8gnx3/Ckkj/yqxHv8sxin/M9w0/wpJI\
/8AAAAAAARL/wpJI/8z3DT/M9w0/wpJI/8KSSP/Ckkj/yCfHf8foBz/KrEe/yqxHv8qsR7/LMYp/zPcNP8KSSP/AAAAAAAAAAAKSSP/IJ8d/zPcNP8z3DT/LMYp/yzGKf8KSSP/Ckkj/wpJI/8KSSP/Ckkj/wpJI\
/8KSSP/AAAAAAAAAAAAAAAACkkj/yCfHf//////AAAA/yzGKf8sxin/LMYp/yCfHf//////AAAA/wpJI/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSSP/Ckkj/wpJI/8KSSP/LMYp/yzGKf8KSSP/Ckkj/wpJI\
/8KSSMOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApJI/8gnx3/KrEe/yzGKf8sxin/LMYp/wpJI/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkkj/wpJI/8KSSP/Ckkj/wpJI\
/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/90coAfZz4ABwkJAANleQABb20AAHBwAAAucAAAbnQAAGljAAF0LgABZW2AA3JhgA8va8APPgrgPwk88H9yYQ=="></menuitem>\
                  </menu>';

document.querySelector("#userscript-ETI-transload menuitem")
        .addEventListener("click", transload_pre, false);

function initMenu(aEvent) {
  // Executed when user right click on web page body
  // aEvent.target is the element you right click on
  var node = aEvent.target;
  var item = document.querySelector("#userscript-ETI-transload menuitem");
  if (node.localName == "img") {
    body.setAttribute("contextmenu", "userscript-ETI-transload");
    item.setAttribute("imageURL", node.src);
  } else {
    body.removeAttribute("contextmenu");
    item.removeAttribute("imageURL");
  }
}

function transload_pre(aEvent) {
	var imageURL = aEvent.target.getAttribute("imageURL");
	if (imageURL.indexOf("data:") == 0) {
		alert('That\'s a data-URI, not a hosted image. Sorry');
		return;
	};
	var dims=findpos(aEvent.target.parentNode.previousSibling);
	var div = document.createElement('div');
	dims.x -= 3; dims.y -= 3;
	var style = 'position: absolute; left: {x}px; top: {y}px; height: {h}px; width: {w}px; z-index: 1000;'.supplant(dims);
	div.setAttribute('style', style);
	div.setAttribute('value', imageURL);
	document.body.appendChild(div);
	document.body.style.cursor = 'wait';
    transload(div);
	div.parentNode.removeChild(div);
}

function transload (dom) {
  var href = dom.getAttribute('value');
  BinaryRes.get({url: href, callback: transload_got});
}
function transload_got (resp) {
  filename = (resp.finalUrl.split('/') || ['something.jpg']).pop();
  filename = filename.replace(/[\/\?<>\\:\*\|”]/g,'');
  BinaryRes.post({
    url: 'http://u.endoftheinter.net/u.php',
    callback: transload_posted,
    data: {
      file: {
        value: BinaryRes._clean(resp.responseText),
        filename: filename,
        type: BinaryRes.guessType(resp.responseText)
      }
    }
  });
}

function transload_posted (resp) {
  document.body.style.cursor = 'default';
  var html = document.createElement('html');
  html.innerHTML = resp.responseText;
  var value = html.getElementsByClassName('img')[0].getElementsByTagName('input')[0].value;
  prompt('Image',value);
}

function findpos (element) {
  var d = {x:0,y:0};
  d.h = element.offsetHeight;
  d.w = element.offsetWidth;
  do {
    d.x += element.offsetLeft;
    d.y += element.offsetTop;
  } while (element = element.offsetParent);

  return d;
}
String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};