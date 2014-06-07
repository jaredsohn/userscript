// ==UserScript==
// @name           Plurk Life Saver
// @namespace      http://ellab.org/
// @description    Save your life from spending too much time on Plurk
// @include        http://www.plurk.com/user/*
// ==/UserScript==

// History
// Version 1    24-Jun-2008    Initial release to mute all new plurks

var GET_HEADER = {'Referer': document.location.href};
var POST_HEADER = {'Content-Type': 'application/x-www-form-urlencoded', 'Referer': document.location.href};

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function $(id) {
  return document.getElementById(id);
}

function elem(tag, content){
  var ret = document.createElement(tag);

  tag = tag.toUpperCase();
  if (tag == 'BR' || tag == 'INPUT') return ret;

  ret.innerHTML = (content===0 || content)?content:'';
  return ret;
}

function createLayer(id, html, height, top, left, bgcolor, opacity) {
  var resdiv = $(id);
  if (!resdiv) {
    html = html?html:'';
    bgcolor = bgcolor?bgcolor:'#fed';
    top = (top || top===0)?top:80;
    left = (left || left===0)?left:100
    resdiv = elem('div', html);
    resdiv.setAttribute('id', id);
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var resstyle = 'background-color:' + bgcolor + '; z-index: 10000; position:absolute; ' +
                   'border:1px gray solid; padding: 10px; ' +
                   (height?('max-height:' + height + 'px; scroll:auto; '):'') +
                   (opacity?('-moz-opacity: ' + opacity + ';'):'') +
                   'left:' + (scrollX + left) + 'px; top: ' + (scrollY + top) + 'px;';
    resdiv.setAttribute('style', resstyle);
    document.body.appendChild(resdiv);
  }
  else {
    resdiv.innerHTML = html;
    resdiv.style.display = '';
  }

  return resdiv;
}

function trim(str){
  return str.replace(/^\s+|\s+$/g,"");
}

function find(xpath, xpres){
  var ret = document.evaluate(xpath, document, null, xpres, null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

GM_registerMenuCommand('Mute all new plurks', function() {
  var newplurk = find("//div[contains(@class, 'plurk') and contains(@class, 'new')]", XPList);
  var html = '';
  for (var i=0;i<newplurk.snapshotLength;i++) {
    var div = newplurk.snapshotItem(i);
    var id = div.getAttribute('id');
    var name = document.evaluate(".//div[@class='plurk_cnt']//ul[@class='qual_ul_holder']//a[@class='name']", div, null, XPFirst, null).singleNodeValue;
    name = name?trim(name.innerHTML):'Anonymous';
    var qqual = document.evaluate(".//div[@class='plurk_cnt']//li[@class='qqual']", div, null, XPFirst, null).singleNodeValue;
    qqual = qqual?trim(qqual.textContent):'';
    qqual = qqual || 'says'; // use hellotxt will not have qqual
    var text = document.evaluate(".//div[contains(@class, 'text_holder')]", div, null, XPFirst, null).singleNodeValue;
    text = text?trim(text.textContent):'';

    html += "<tr" + (i%2?" style='background-color:#ddd;'":"") + "<td style='padding-right:10px;'>" +
            "<div style='width:300px;overflow:hidden;white-space:nowrap;'>" + name + " " + qqual + " " + text + "</div></td>" +
            "<td><input type='checkbox' checked='checked' value='" + id + "'/></tr>";
  }

  if (!html) {
    alert('No unread plurk');
    return;
  }

  html = "<table id='ellab-plurk-askmute-table' border='0' cellspacing='10' cellpadding='5'>" + html + "</table>";
  var layer = createLayer('ellab-plurk-askmute-dlg', html, 300);

  var menudiv = elem('div');
  menudiv.setAttribute('style', 'text-align:right; margin-top:20px;');

  var cancel = elem('a', 'Cancel');
  cancel.setAttribute('style', 'margin-right:20px; cursor:pointer;');
  cancel.addEventListener('click', function(e) { $('ellab-plurk-askmute-dlg').style.display = 'none'; }, false);
  menudiv.appendChild(cancel);

  var mute = elem('a', 'Mute Selected');
  mute.setAttribute('style', 'cursor:pointer;');
  mute.addEventListener('click', function(e) {
    var inputs = find("//table[@id='ellab-plurk-askmute-table']//input", XPList);
    for (var i = 0; i<inputs.snapshotLength; i++) {
      var input = inputs.snapshotItem(i);
      if (input.checked) {
        var plurk_id = unsafeWindow.$dp[input.value];
        plurk_id = plurk_id?plurk_id.obj.plurk_id:'';
        if (plurk_id) {
          GM_xmlhttpRequest({
            method: 'POST',
            headers: POST_HEADER,
            url: 'http://www.plurk.com/TimeLine/setMutePlurk',
            data: 'plurk_id=' + plurk_id + '&value=1'
          });
        }
      }
    }
    // done, hide it
    $('ellab-plurk-askmute-dlg').style.display = 'none';
  }, false);
  menudiv.appendChild(mute);

  layer.appendChild(menudiv);
});