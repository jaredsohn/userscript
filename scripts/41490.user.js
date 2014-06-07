// ==UserScript==
// @author        rikuo
// @name          SBM Pie chart
// @namespace     http://d.hatena.ne.jp/rikuo/
// @description   Social bookmark pie chart is added to the Hatena bookmark
// @include       http://b.hatena.ne.jp/entry/*
// ==/UserScript==
//

//cf. SBM Common API http://creazy.net/2008/07/sbm_common_api.html

//---  pie chart (true / false)--------------

var pie_chart = true ;

//-------------------------------------------

(function() {

  var _doc = document,
  BUC = e('bookmarked_user');

  if(!BUC)return;
  if(BUC.childNodes[1].textContent.replace(/\s+/g, '')
       == 'ページ作者様の希望によりブックマークの一覧は非表示に設定されています。(この機能について)')return;

  var piewidth = '420',
  pieheight = '140',
  piesize = piewidth + 'x' + pieheight,
  SBMlist = ['hatena','delicious','livedoor','yahoo','buzzurl','fc2','nifty','pookmark'];

  get_SBMcount(_doc.getElementsByTagName('h2')[0].firstChild.href.replace(/#/,'%23'));

  function get_SBMcount(entryurl) {
    var url = 'http://labs.creazy.net/sbm/counter/json?callback=setSBMchart&url=' + entryurl;
    GM_xmlhttpRequest({
        method : "GET",
        url : url,
        onload : function (response) {
            eval(response.responseText);
        },
      });
  }

  function setSBMchart(item) {
    if(item == null)return;

    var df = document.createDocumentFragment(),
    tbody = makexpath(_doc, 'id("entryinfo")/div[@class="curvebox-color-body"]/table/tbody').snapshotItem(0),
    tr = c('tr'),
    th = c('th'),
    td = c('td');
    df.appendChild(tr);
    th.textContent = '他のブックマーク:';
    td.id = 'sbm_piechart_block';
    var block = df.firstChild;
    block.appendChild(th);
    block.appendChild(td);

    var bookmarkcount = { 'hatena' : item.hatena.count },
    bookmarkname = encodeURIComponent(item.hatena.name + ':' + item.hatena.count);
    for(var i = 1,sl=SBMlist.length; i<sl ; ++i){
      var sbmdata = item[SBMlist[i]];
      var icon = c('img');
      icon.src = sbmdata.ico;
      var count = c('a');
      count.title = sbmdata.name;
      count.href = sbmdata.url;
      count.textContent = ' ' + sbmdata.count;
      bookmarkcount[SBMlist[i]] = sbmdata.count;
      if(sbmdata.count!='0'){
        bookmarkname += '|' + encodeURIComponent(sbmdata.name + ':' + sbmdata.count);
      }
      block.childNodes[1].appendChild(count);
      var l = block.childNodes[1].childNodes[i-1];
      l.insertBefore(icon,l.firstChild);
    }

    if(pie_chart){
      var result = sortObj(bookmarkcount),
      s = 0;

      for(var i in result){
        s += result[i];
      }
      s = s / 100;
      var piepart = (result['hatena'] / s).toFixed(3);
      for(var i = 1,sl = SBMlist.length; i < sl; ++i){
        if(result[SBMlist[i]]){
          piepart += ',' + (result[SBMlist[i]] / s).toFixed(3);
        }
      }

      var pieURL = 'http://chart.apis.google.com/chart?chs=' + piesize + '&chd=t:' + piepart 
           + '&cht=p&chl=' + bookmarkname +'&chf=bg,s,F7F9FD';
      var pie = c('img');
      pie.id = 'sbm_pie';
      pie.src = pieURL;
      pie.width = piewidth;
      pie.height = pieheight;
      pie.title = '各ソーシャルブックマークの割合';
      block.childNodes[1].appendChild(pie);
    }
    tbody.appendChild(df);
  }

  GM_addStyle(<><![CDATA[
    #sbm_piechart_block a{
      color: #555;
      text-decoration: none;
      margin-right: 8px;
    }
    #sbm_piechart_block a:hover{
      border-bottom: 1px solid #555;
    }
    img#sbm_pie{
      display: block;
    }
  ]]></>);

//cf.http://d.hatena.ne.jp/susie-t/20060817/1155780229

  function sortObj(obj){
    var ary = new Array();
    for(var i in obj){
      ary.push({key:i, value:obj[i]});
    }
    ary = ary.sort(sortFunc);
    var ret = new Object();
    for(var i = 0,ar=ary.length; i < ar; ++i){
      ret[ary[i].key] = ary[i].value;
    }
    return ret;
  
    function sortFunc(left, right){
      var a = left['value'], b = right['value'];
        a = parseFloat(a);
        b = parseFloat(b);
        return a > b ? -1 : a < b ? 1 : 0;
    }
  }

  function c(tag_name) {
    return _doc.createElement(tag_name);
  }

  function e(id) {
    return _doc.getElementById(id);
  }

  function makexpath(context, query){
    return _doc.evaluate(
      query, context, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
    )
  }

})();
