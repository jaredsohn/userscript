// ==UserScript==
// @name         Elementool Pro
// @namespace    ELEMENTOOL
// @description  Enhance, improve elementool in various ways.
// @include      http://www.elementool.com/*
// @include      http://elementool.com/*
// @version      0.1
// ==/UserScript==


function xpathForEach(xpath, fn){
  var nodelist = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var item;
  for (var i=0, l=nodelist.snapshotLength; i<l; i++) {
    item = nodelist.snapshotItem(i);
    fn.apply(item, [i, item]);
  }
}


GM_addStyle([
  " #grdReport tr:hover { background:#C9E0FF; cursor:pointer; } ",
  " .ReportRowOdd { background:#F1F6FC; } ",
  " #freezeLayer { display: none !important } ", // disable modal barrier
  " #getebook { display: none !important } " // disable "get e-book" ad.
].join(''));


// clear out *inline* style of odd rows
xpathForEach('//table[@id="grdReport"]//tr[@class="ReportRowOdd"]', function(i, item){
  item.style.backgroundColor = '';
});

// click a row = go to that ticket.
xpathForEach('//table[@id="grdReport"]', function(i, item){
  item.addEventListener('click', function(e){
    //console.log('ticket listing clicked', event);
    e = e || window.event;
    var target = e.originalTarget;
    var tr;
    var depth = 0;
    var maxDepth = 5;
    console.log('ticket listing clicked ', target);
    if(!target || target.nodeName == 'INPUT'){
      return;
    }
    while(target && depth++ < maxDepth){
      if(target.nodeName == "TR" && target.parentNode.nodeName != "THEAD"){
        tr = target;
      }
      target = target.parentNode;
    }
    if(tr && !/commonHeader/.test(tr.className)){
      location.href = tr.getElementsByTagName('a')[0].getAttribute('href');
    }
  }, false);
});

//"Est. Effort (hrs)"
xpathForEach('//table[@id="grdReport"]//tr[contains(@class, "commonHeader")]//td', function(i, headerCell){
  if(/Est. Effort \(hrs\)/.test(headerCell.innerHTML)){
    
    var column = i;
    var total = 0;
    var numColumns = headerCell.parentNode.getElementsByTagName('td').length;
    
    xpathForEach('//table[@id="grdReport"]//td[position()='+(column+1)+']', function(i, item){
      if(i){
        total += parseInt( item.innerHTML ) || 0;
      }
    });
    
    //alert(total);
    
    var tr = document.createElement('tr');
    var tds = [document.createElement('td'), document.createElement('td'), document.createElement('td')];
    tds[0].setAttribute('colspan', column);
    tds[0].setAttribute('align', 'right');
    tds[0].innerHTML = 'total: ';
    tds[1].innerHTML = total;
    tds[2].setAttribute('colspan', numColumns-column);
    
    document.getElementById('grdReport').getElementsByTagName('tbody')[0].appendChild(tr);
    
    tr.appendChild(tds[0]);
    tr.appendChild(tds[1]);
    tr.appendChild(tds[2]);
  }
});
