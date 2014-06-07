// ==UserScript==
// @name           Travian minimum requirements calc
// @namespace      http://d.hatena.ne.jp/Uchimata/
// @description    Find a clock icon and Click
// @include        http://*.travian.*/build.php*
// @version        1.0.0
// ==/UserScript==
//
// last modified: 2009/06/22 18:41
// histry : http://twitter.g.hatena.ne.jp/Uchimata/20090622/1245663696
//


(function(opt) { addEventListener('load', function(){

  function calc(target){
    var now = [$('l4'),$('l3'),$('l2'),$('l1')];
    var grow = now.map(function(s){
      return s.title-0;
    });
    var max = now.map(function(s){
      return s.textContent.match(/\d+$/)-0;
    });
    now = now.map(function(s){
      return s.textContent.match(/^\d+/)-0;
    });
    var line = $x('.//img[contains(@class,"r")]', target.parentNode).map(function(s){
      return s.nextSibling ? s.nextSibling.nodeValue.match(/\d+/)-0 : null;
    }).filter(function(i){ return i !== null }); if (line.length > 4) line.pop();

    var time = 1, training, clock;
    if (typeof target._input == 'object') time = target._input.value;
    else if (training = $x('//form/table/tbody/tr[.//input[@type="text"]]')) {
      training.forEach(function(s){
        if ((clock = $x('.//img[@class="clock"]', s)) && clock.filter(function(s){ return s==this }, target).length) {
          var input = $x('.//input[@type="text"]', s)[0];
          time = input.value; target._input = input;

          input.addEventListener('keyup', function(){ time_calc([target]) }, false);
          input.addEventListener('change', function(){ time_calc([target]) }, false);
        }
      });
    }
    if ((time+"").match(/\D/) || time < 1) time = 1;
    var need = line.map(function(s,i){
      return s*time - now[i]
    });
    var f = need.filter(function(s){ return s > 0 }).length;

    if (!f) return null;

    var ma = $x('.//td[@class="required"]//img[contains(@class,"r")]').map(function(s){
      return '<img width="15" height="10" title="' + s.title + '" class="' + s.className + '" src="' + s.src + '">'
    }); if (ma.length > 4) ma.pop();
    var a = need[0]+need[1]+need[2]+need[3],
        b = grow[0]+grow[1]+grow[2]+grow[3],
        t = (a > 0 ? a/b : 0), tt=[], aa=[], bb=[], wgrow=[],
        trade = [], tr;

    for (var i=0;i<=3;i++) {
      tt[i] = now[i]+Math.floor(grow[i]*t);
      wgrow[i] = tt[i]-line[i]*time;
      if (wgrow[i] > 0) aa.push(i);
      else if (wgrow[i] < 0) bb.push(i);
    }
    aa.sort(function(n,m){
      return wgrow[m]-wgrow[n]
    })

    for (var i=0,n=aa[i];i<aa.length;n=aa[++i]) {
      for (var ii=0,m=bb[ii];ii<bb.length;m=bb[++ii]) {
        if (!wgrow[m]) continue;
        tr = Math.abs(wgrow[n]) >= Math.abs(wgrow[m]) ? Math.abs(wgrow[m]) : Math.abs(wgrow[n]);
        wgrow[n] -= tr;
        wgrow[m] += tr;
        if (tr) trade.push([ma[n],ma[m],tr]);
      }
    }

    return { time: t, trade: trade };
  }

  function time_calc(target){
    if (!target || opt.all) target = clock;
    target.forEach(function(s){
      var parent = s.parentNode;
      var t = calc(s);
      var tc = $x('.//table[@class="timecalc"]', parent);
      if (!t) {
        if (tc) tc[0].parentNode.removeChild(tc[0]);
      }
      else {
        var list = t.trade.map(function(s){
          return '<td>' + s[0] + ' → ' + s[1] + '</td><td align="right">' + s[2] + '</td></tr>';
        });
        tc = tc ? tc[0] : document.createElement('table');
        tc.className = 'timecalc';
        tc.innerHTML = '<tr><td rowspan="' + list.length + '" valign="top">最短時間 '
                       + Math.floor(t.time)+':'+((i=Math.floor((t.time-Math.floor(t.time))*60))<10?"0"+i:i)
                       + ' で完了するには</td>' + list.join('<tr>');
        if (!tc.parentNode) parent.appendChild(tc);
      }
    });
  }

  function $(id, doc) {
    return (doc || document).getElementById(id);
  }

  function $x(exp, context) {
    if (!context) context = document;
    var doc = context.ownerDocument || context;
      var resolver = function (prefix) {
        var o = document.createNSResolver(context)(prefix);
        return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
      }
    var exp = doc.createExpression(exp, resolver);

/*
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch (result.resultType) {
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
*/
        var result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for (var i = 0, len = result.snapshotLength; i < len ; i++) {
          ret.push(result.snapshotItem(i));
        }
        return len != 0 ? ret : null;
/*
      }
    }
    return null;
*/
  }

  var clock = $x('//img[@class="clock"]');

  if (!clock) return;

  GM_addStyle(<><![CDATA[
  	table.timecalc { width: auto; }
	table.timecalc td { color: rgb(0, 0, 0); font-size: 8pt; padding: 0 5px; }
	img.clock { cursor: pointer; }
]]></>);

  clock.forEach(function(s){
    s.className = 'clock';
    s.addEventListener('click', function(){ time_calc([s]) }, false)
  });

  time_calc();

}, false); })({ all: false })
