// ==UserScript==
// @name           DrawrClip
// @namespace      http://castor.s26.xrea.com/
// @include        http://drawr.net/*
// @version        0.9.0.20081020
// @author         castor <castor.4bit@gmail.com>
// ==/UserScript==
(function(){
  var icon = 'data:image/gif;base64,'+
    'R0lGODlhEAAwAPcAAK2trebm5s3NzY+Pj1JSUn6AgHd3d////zo6OsPDw7a2tvHx8T8/P9XV1fr6'+
    '+vT09O/v7+3t7f+7dP26dv/t0f/TpP+mQtF2E8eNNf+9cfSTKO2SMKhcEOLHmvjJhP3z4Y5dAP7f'+
    'tP3/9f3/6/z/3vz/1Pr/yKFkCv+Njf/c2/+3uf9mZOA1MtBPmftQTbstKuiryf+hnP/q55MZTf/H'+
    'w//3/P/x9//l9P/d7//T6qclaPOSkfK7f/e8fa2trZQwZ7tYl8g/Ou9uavi6u/ve3JhlH76OQsN4'+
    'KfSoUv/Uqv/t1H+AgI+Pj83Nzebm5oIkTd2vyf/4/OJZVIdeFd7Hn/7/9uWVPP6+e8PDw/zr6Kc2'+
    'Mfzz45xeId+UQfHx8f/y9/nJxfOln/7/7fnfufHJjPr6+tXV1ba2tv/n9P7/4fT09P/f7/7/2O/v'+
    '7//W6v3/ze3t7eKVk+i7he28hK2trYQ3ZalelLNGP9pzbuy8vPXe3I9lKraNS7Z5NueoXffUrvvs'+
    '1n9/f4+Pj83Nzebm5nMqTNOxyP34+8xfWIBeIdrGov7+9teVSfO+g8PDw/jr6JY7Nfry5JFfK9KU'+
    'TPHx8fzy9u/KxuWnof7+7vTevOrIkvr6+tXV1ba2tvro8/7+4/T09Pjg7v792+/v7/bX6f790e3t'+
    '7f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEA'+
    'AAAh+QQJAACnACwAAAAAEAAwAAAI/wBPnToFAACAU6dOnTp16tSpU6dOnQIQQMAAAgUKFChw6tSp'+
    'U6dOnQIgAIABAgcOHChQ4NSpU6dOnQIwwIABBAcOHCiQoMCpU6dOnTpFgAACBAoWHGDAgAGDU6dO'+
    'nTpV4MACBQQaLDhwIAGDU6dOnTpV4MCCBg0aLDhwIAGDU6dOnTpV4MCBBQsWLDhwIAGDU6dOnTpV'+
    '4MCBAwcOHDjgIAGDU6dOnTpV4MCBAwcOHHDgIAGDU6dOnTpV4MCBAwccOHjwIAGDU6dOnTpV4MCB'+
    'Aw4cPHgAIQGDU6dOnTpV4MABBw4eQIAQIQGDU6dOnTpVIEGCBAkSJEiQIAGDU6dOnf86RYABAwYM'+
    'GDBgwIABg1OnTp06derUqVOnTp06derUKYCnTp06dWrOHDmnTp06derUqVOnTp06NQfQHz99+PDh'+
    'w+fUqVOnTp06NedPI0Z9Dhw4wIfPqVOnTp06JccPo0mSDhw4wEcRn1OnTp06dapPH0mSNEU6kChR'+
    'okSnTp06dYrPgUia+mSKdOCAokSnTp06dYrPgUiZMmWKdOCAokSnTp06dYrPgQORIkWKdGCRokSn'+
    'Tp06dYrPgQMHDhw4sAiTokSnTp06dYrPgQMHDixahAmTokSnTp06dYrPgQMHFmHC9OmTokSnTp06'+
    'dYrPgQOLMGH69EmUokSnTp06dYr/z6JFmDB9EiWqlKJEp06dOnWKjyJFihQpUqRIkaJEp06dOnVq'+
    'T6JEiRIlSpQoUaJEp06dOnXq1KlTp06dOnXqFMBTp06dOnXqVJw4cU6dOnXq1KlTp06dOnUqjp48'+
    'eO7YsWPHzqlTp06dOnUqTp44iO4cOHDAjp1Tp06dOnUqDh5EiCAdOHDAjiE7p06dOnXq1J07kCBd'+
    'enSgUKFChU6dOnXqlJ0Djy7dsfTowAFDhU6dOnXqlJ0DjyxZsvTowAFDhU6dOnXqlJ0DBx49evTo'+
    'wCFDhU6dOnXqlJ0DBw4cOHDgUCVDhU6dOnXqlJ0DBw4cOHSoUiVDhU6dOnXqlJ0DaQcOHKpUyZMn'+
    'Q4VOnTp16pSdAwcOVarkyVMoQ4VOnTp16pSdQ4cqVfIUKhQpQ4VOnTp16pQdQ4YMGTJkyJAhQ4VO'+
    'nTp16lSdQoUKFSpUqFChQoVOnTp16tSpU6dOnTp1CuCpU6dOnToVEAA7';

  var clipList = [];
  var openNewWindow = false;
  var showOffset = 0;
  var showItems = 4;
  var imageSize = 80;
  var scrollDelta = 24;
  var scrollInterval = 16;
  var scrollHeight = 0;
  var storeKey = 'cliplist';
  var mode = '';

  function main() {
    var url = String(document.location).replace(/^http:\/\/drawr\.net\//, '');
    if (~url.indexOf("new.php") || !url) {
      mode = 'new';
    } else if (~url.indexOf("show.php")) {
      mode = 'show';
    }
    init();
  }

  function init() {
    loadList();
    initPanel();
    if (mode) {
      initCommands();
    }
    // for AutoPaerize
    scrollHeight = document.documentElement.scrollHeight;
    document.addEventListener('scroll', function() {
      if (scrollHeight < document.documentElement.scrollHeight) {
        scrollHeight = document.documentElement.scrollHeight;
        initCommands();
      }
    }, false);
  }

  function initCommands() {
    switch (mode) {
      case 'new':  initCommandsNew();  break;
      case 'show': initCommandsShow(); break;
    }
  }

  function initCommandsNew() {
    $X("//div[@class='drawr_box']", document.body).each( function(e){ setCommand(e); } );
  }
  function initCommandsShow() {
    var ul = $X("//div[@class='infoBoxLast']/ul", document.body).node();
    var li = document.createElement('li');
    var id = getId(document.body);

    if (ul) {
      li.innerHTML = '&nbsp;';
      li.style.position = 'relative';
      ul.appendChild(li);

      _setCommand(id, li);
    }
  }

  function setCommand(node) {
    var id = getId(node);
    var container = $X("div[@class='drawr_info']", node).node();
    //var container = $X("div[contains(concat(' ',normalize-space(@class),' '),'drawr_info')]",baseNode).node();
    container.style.position = 'relative';

    _setCommand(id, container);
  }

  function _setCommand(id, container) {
    var pos = 0;
    for (var i=0; i<clipList.length; ++i) {
      if (id == clipList[i].id) { pos = -32; break; }
    }
    if (document.getElementById('clipCommand_'+ id)) return;

    var div = document.createElement('div');
    div.setAttribute('id', 'clipCommand_'+ id);
    div.style.cssText = 'position:absolute; top:0; left:0; width:16px; height:16px; '
                      + 'cursor:pointer; background:transparent url('+ icon +') no-repeat 0 '+ pos +'px; '
                      + 'display:block';
    container.appendChild(div);

    div.addEventListener('mouseover', function(){
      var id = this.id.substr(this.id.indexOf('_')+1);
      setCommandState(id, 1);
      //this.style.backgroundPosition = '0px -16px';
    }, true);
    div.addEventListener('mouseout', function(){
      var id = this.id.substr(this.id.indexOf('_')+1);
      setCommandState(id, 0);
      //this.style.backgroundPosition = '0 '+ pos +'px';
    }, true);
    div.addEventListener('click', function(){
      addItem(this.parentNode.parentNode);
    }, true);
  }

  function setCommandState(id, state) {
    var cmd = document.getElementById('clipCommand_'+ id);
    if (!cmd) return;

    if (state == 1) {
      cmd.style.backgroundPosition = '0px -16px';
    } else {
      var pos = 0;
      for (var i=0; i<clipList.length; ++i) {
        if (id == clipList[i].id) { pos = -32; break; }
      }
      cmd.style.backgroundPosition = '0 '+ pos +'px';
    }
  }

  function getId(node) {
    var xpath = "string(descendant::a/@href[starts-with(., 'show.php') or starts-with(.,'actfav.php')])";
    var a  = $X(xpath, node).value() || '';
    var id = /(actfav|show)\.php\?id=(\d+)/.exec(a);

    return (id)? id[2] : '';
  }

  function getUserInfo(node) {
    //var a  = $X("string(descendant::div[@class='drawr_info']/a)", node).node() || '';
    var a = $X("div[@class='drawr_info']/a", node).node() || '';
    if (!a) a = $X("//div[@class='infoBox']/div/ul/li[2]/a/strong", node).node() || '';

    if (a) {
      var user = {
        id: (a.hasAttribute('href')? a : a.parentNode).getAttribute('href').substr(1),
        name: a.innerHTML
      };
      return user;
    }
    return null;
  }

  function getThumbUrl(node) {
    var img  = $X("string(descendant::td/a/img/@src)", node).value() || '';
    if (!img) {
      var _img = $X("//a[@name='draws']/img[1]", document.body).node();
      if (_img) {
        img = _img.getAttribute('src');
        img = img.replace(/(\.[a-z]+)$/, "_150x150$1");
      }
    }
    return img;
  }

  function initPanel() {
    var base = document.createElement('div');
    var div  = document.createElement('div');
    var list = document.createElement('div');
    var prev = document.createElement('div');
    var next = document.createElement('div');
    var header = document.createElement('span');
    var footer = document.createElement('div');
    var body = document.getElementsByTagName('body')[0];

    // init panel
    prev.style.cssText = 'color:#888; border:1px #888 solid; padding:0 2px; margin:2px; text-align:center';
    next.style.cssText = 'color:#888; border:1px #888 solid; padding:0 2px; margin:2px; text-align:center';
    prev.innerHTML = '&#9651;';
    next.innerHTML = '&#9661;';
    header.innerHTML = 'cliped <span id="clipItemCount">'+ clipList.length +'</span> pics.';
    footer.style.cssText = 'text-align:right; padding-right;1em';
    div.style.cssText = 'position:fixed; top:10px; left:10px; display:block; '
                      + 'padding:8px; color:#fff; background-color:#000; -moz-border-radius:8px';
    list.style.cssText = 'overflow:hidden;';
    footer.setAttribute('id', 'clipPageCount');
    list.setAttribute('id', 'clipPanel');

    div.appendChild(header);
    div.appendChild(prev);
    div.appendChild(list);
    div.appendChild(next);
    div.appendChild(footer);
    base.appendChild(div);
    setOpacity(div, 85);
    setOpacity(base, 0);
    body.appendChild(base);

    prev.addEventListener('mouseover', function(){ this.style.backgroundColor = '#642'; }, true);
    next.addEventListener('mouseover', function(){ this.style.backgroundColor = '#642'; }, true);
    prev.addEventListener('mouseout',  function(){ this.style.backgroundColor = '';     }, true);
    next.addEventListener('mouseout',  function(){ this.style.backgroundColor = '';     }, true);
    prev.addEventListener('click',     function(){ scrollPrev(); updatePageCount(); }, true);
    next.addEventListener('click',     function(){ scrollNext(); updatePageCount(); }, true);

    // init message box
    var msg = document.createElement('div');
    msg.style.cssText = 'position:fixed; top:10px; left:10px; display:block; '
                      + 'color:#fff; padding:2px 1em; -moz-border-radius:8px';
    setOpacity(msg, 50);
    msg.setAttribute('id', 'clipMessage');
    body.appendChild(msg);

    // init list
    resizeList();
    initList();

    base.addEventListener('mouseover', function(){ setOpacity(this, 100); }, true);
    base.addEventListener('mouseout',  function(){ setOpacity(this, 0);   }, true);
  }

  function initList() {
    var div   = document.createElement('div');
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var panel = document.getElementById('clipPanel');
    
    tbody.setAttribute('id', 'clipListBody');
    div.setAttribute('id', 'clipListBase');
    div.style.cssText = 'position:relative; top:0; left:0';

    table.appendChild(tbody);
    div.appendChild(table);
    panel.appendChild(div);

    for (var i=0; i<clipList.length; ++i) {
      appendList(clipList[i]);
    }
  }

  function generateListItem(item) {
    var id  = item.id;
    var tr  = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var img = document.createElement('img');
    var div = document.createElement('div');
    var a1  = document.createElement('a');
    var a2  = document.createElement('a');
    a1.href = '/show.php?id='+ item.id;
    a2.href = 'javascript:void(0);';
    img.src = item.thumb;

    if (img.width < img.height) {
      img.width = (img.width * imageSize) / img.height;
      img.height = imageSize;
    } else {
      img.height = (img.height * imageSize) / img.width;
      img.width = imageSize;
    }
    if (openNewWindow) {
      a1.setAttribute('target', '_blank');
    }
    tr.setAttribute('id', 'clipItem'+ item.id);
    td1.style.cssText = 'text-align:center; vertical-align:middle; '
                      + 'background:transparent url(../images/bg_gooddrawr.gif) no-repeat scroll 0 0; '
                      + 'width:'+ imageSize +'px; height:'+ imageSize +'px';
    td2.style.cssText = 'vertical-align:bottom; padding-left:2px';
    a2.innerHTML = '[x]';
    a2.addEventListener('click', function(){ removeItem(null, id); }, true);
    a1.appendChild(img);
    td1.appendChild(a1);
    td2.appendChild(a2);
    tr.appendChild(td1);
    tr.appendChild(td2);

    return tr;
  }

  function appendList(item) {
    var list = document.getElementById('clipListBody');
    var tr = generateListItem(item);

    if (list.firstChild) {
      list.insertBefore(tr, list.firstChild);
    } else {
      list.appendChild(tr);
    }
    updateCount();
  }

  function removeList(id) {
    var target = document.getElementById('clipItem'+ id);
    target.parentNode.removeChild(target);
    updateCount();
  }

  function resizeList() {
    var list = document.getElementById('clipPanel');

    if (clipList.length > showItems) {
      list.style.height = ((imageSize + 2) * showItems) +'px';
    } else {
      list.style.height = ((imageSize + 2) * clipList.length) +'px';
    }
  }

  function updateCount() {
    updateItemCount();
    updatePageCount();
  }

  function updateItemCount() {
    var count = document.getElementById('clipItemCount');
    count.innerHTML = clipList.length;
  }

  function updatePageCount() {
    var count = document.getElementById('clipPageCount');
    var pageMax = Math.ceil(clipList.length / showItems);
    var pageCurrent = (clipList.length > 0)? Math.floor(showOffset + showItems) / showItems : 0;

    count.innerHTML = pageCurrent +'/'+ pageMax;
  }

  function scrollPrev() {
    if (showOffset <= 0) return;

    showOffset = ((showOffset - showItems) < 0)? 0 : (showOffset - showItems);
    var scrollTo = (0 - showOffset * (imageSize + 2));

    scrollList(scrollTo, scrollDelta, scrollInterval);
  }

  function scrollNext() {
    if ((showOffset + showItems) >= clipList.length) return ;

    showOffset += showItems;
    var _scrollDelta =  (0 - scrollDelta);
    var scrollTo = (0 - showOffset * (imageSize + 2));

    scrollList(scrollTo, _scrollDelta, scrollInterval);
  }

  function scrollList(scrollTo, scrollDelta, scrollInterval) {
    var list = document.getElementById('clipListBase');
    var _top = parseInt(list.style.top.replace(/[a-z]/g,''));

    if ( ((scrollDelta < 0) && ((_top + scrollDelta) <  scrollTo) ) ||
         ((scrollDelta > 0) && ((_top + scrollDelta) >= scrollTo) )) {
      list.style.top = scrollTo +'px';
    } else if (scrollDelta != 0) {
      list.style.top = (_top + scrollDelta) +'px';
      setTimeout(function(){ scrollList(scrollTo, scrollDelta, scrollInterval); }, scrollInterval);
    }
  }

  function addItem(node) {
    var id   = getId(node);
    var img  = getThumbUrl(node);
    var user = getUserInfo(node);

    if (!id || !img || !user) return false;
    for (var i=0; i<clipList.length; ++i) {
      if (id == clipList[i].id) return removeItem(node);
    }

    var obj = {
      "id": id,
      "thumb": img
    };
    clipList.push(obj);
    resizeList();
    appendList(obj);
    saveList();
    setCommandState(id, 0);
    popupMessage(user, id);
  }

  function removeItem(node, id) {
    var id = id || getId(node);

    if (!window.confirm('Are you sure want to remove pic id:'+ id +'?')) return;

    for (var i=clipList.length-1; i>=0; --i) {
      if (id == clipList[i].id) {
        clipList.splice(i, 1);
        break;
      }
    }
    removeList(id);
    saveList();
    setCommandState(id, 0);
  }

  function popupMessage(user, id) {
    var msg = document.getElementById('clipMessage');
    msg.innerHTML = 'Clipped pic id:'+ id +'.';
    msg.style.backgroundColor = '#000';
    
    var timer = setTimeout(function() {
      clearMessage(timer);
    }, 3000);
    msg.addEventListener('mouseover', function(e){ clearMessage(timer); }, true);
  }

  function clearMessage(timer) {
    if (!timer) clearTimeout(timer);
    
    var msg = document.getElementById('clipMessage');
    msg.innerHTML = '';
    msg.style.backgroundColor = '';
  }

  function loadList() {
    var value = GM_getValue(storeKey);

    if (typeof value == 'undefined') {
      clipList = [];
    } else {
      clipList = eval('('+ value +')');
    }
  }

  function saveList() {
    GM_setValue(storeKey, clipList.toSource());
  }

  function setOpacity(node, value) {
    node.style.filter = 'alpha(opacity=' + value +')';
    node.style.opacity = value / 100;
    node.style.MozOpacity = value / 100;
  }

  function removeAllChild(target) {
    if (!target) return;
    if (target.firstChild) {
      while (target.firstChild) {
        target.removeChild(target.firstChild);
      }
    }
  }

  function $X(xpath, context) {
    if (!(this instanceof $X)) {
      return new $X(xpath, context);
    }
    this.xpath = xpath;
    this.context = context;
  }
  $X.prototype = {
    evaluate: function() {
      var result = window.document.evaluate(this.xpath, this.context, null, this.type, null);
      switch (result.resultType) {
        case XPathResult.STRING_TYPE:  return result.stringValue;
        case XPathResult.NUMBER_TYPE:  return result.numberValue;
        case XPathResult.BOOELAN_TYPE: return result.booleanValue;
        case XPathResult.FIRST_ORDERED_NODE_TYPE: return result.singleNodeValue;
      }
      return result;
    },
    node: function() {
      this.type = XPathResult.FIRST_ORDERED_NODE_TYPE;
      return this.evaluate();
    },
    value: function() {
      this.type = XPathResult.ANY_TYPE;
      return this.evaluate();
    },
    each: function(func) {
      this.type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
      var result = this.evaluate();
      for (var i=0; i<result.snapshotLength; ++i)
        func(result.snapshotItem(i));
    }
  };

  main();

})();
