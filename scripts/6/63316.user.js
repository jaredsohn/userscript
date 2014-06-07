// ==UserScript==
// @name           bangumi2nicojk
// @namespace      jp.nmmr.bangumi2nicojk
// @include        http://epg.2ch.net/tv2chwiki/pukiwiki.php*
// @version 0.2.2
// @update 200912041430
// ==/UserScript==
(function(){
String.prototype.format = function(pattern) {
  var result = this;
  for (var i=0;i<pattern.length;i++) result=result.replace(new RegExp('\\{'+i+'\\}','g'),pattern[i]);
  return result;
}

var jkicon = 'data:image/x-icon;base64,'+
    'AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAEA'+
    'AAAAAABdXV0A6OjoAMzMzAD///8AAAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAABQUFBAQEBAQEBAQEBAUFBQUFBAICAgICAgICAgIEBQUFBAIBAQEBAAABAQEBAgQFBQQBAwMD'+
    'AwAAAwMDAQEEBQUEAwMEBAMAAAMEBAMBBAUFBAQDBAQDAwMDBAQDBAQFBAEBAQMDAwMDAwMDAQEB'+
    'BAQDAwEEAQEBAQICBAMDAwQEAwMEBQQEAQIEBAUEAwMEBQQEBAUFBAQEBAUFBAQEBQUFBQUFBQQB'+
    'AgQFBQUFBQUFBQUFBQQBBAQCBAUFBQUFBQUFBQUEBAICBAQFBQUFBQUFBQUFBAACAAIEBQUFBQUF'+
    'BQUFBQQCAAIABAUFBQUFBQUFBQUFBAQEBAUFBQUFBeAHAADAAwAAgAEAAIABAACAAQAAgAEAAAAA'+
    'AAAAAAAACBAAAIwxAAD8PwAA+B8AAPgfAAD4HwAA+B8AAPw/AAA=';

var twicon = 'data:image/vnd.microsoft.icon;base64,'+
    'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAATExMG5mZmnjJysy/4eLm1u7w89ru8PPa7/D02+Hi5dasrK2i'+
    'NDQzKwAAAAAAAAAAAAAAAAAAAAAAAAAAYWFhNN/f4cb///////7y///22f//89P///PU///z0///'+
    '+OH//////8jIybkgICAVAAAAAAAAAAAAAAAAZmZmJOvs7c7///3//+u4//3Ygf/81HP//NRz//zU'+
    'c//81HH//NV1///wyP/6/P/6fHx8TwAAAAAAAAAAAAAAAMnJypT//////uar//zSbP/8027//NNu'+
    '//zSbf/80m3//NJt//zQZP//5af/+/z9/5ycnV4AAAAAAAAAAHJyciP4+f3h//TW//zTcv/803D/'+
    '/NNx//3YgP/93Iz//dyL//3bif/93ZL///jf//n6/edvb28xAAAAAAAAAACkpaVK+vr8+f/or//8'+
    '0mz//NNu//3dkf//9+f///34///89v///Pb///35//r7/O7FxsZuAAAAAAAAAAAAAAAAsrO0Vvn5'+
    '+fz/5qb//NJs//zSbf/96rn////////////////////////////BwcKvNDQ0FwAAAAAAAAAAAAAA'+
    'ALCxsVb5+fr8/+an//zSbP/8027//eeu//767//++Ov//vjq//746v///PP/+fn6+6Kio5kTExML'+
    'AAAAAAAAAACwsbFW+fn6/P/mp//80m3//NRy//zWef/82ID//Nh///zYf//8133//dqF///22P/3'+
    '+Pvzb29vRAAAAAAAAAAAsLGxVvn5+vz/5qf//NJt//zUc//81HH//NNu//zTbv/8027//NNu//zP'+
    'ZP//5aX//Pz9/5eXmGAAAAAAAAAAALCxsVb5+fr8/+an//zSbf/81HP//NV1//zWeP/81nj//NZ4'+
    '//zVdv/8133///PQ//n6/fKGhoY/AAAAAAAAAACwsbFW+fn6/P/mp//80mz//NNu//zkqP//9uH/'+
    '//jh///23///9t7///vs///////S0tOTW1tbBAAAAAAAAAAAsrO0V/r6+v3/5aX//NFp//zRav/+'+
    '6rn//P7//e7w88T19vmv8/T3s+zt767Y2Nltg4ODDQAAAAAAAAAAAAAAAKampj79/v/z/+/H//zU'+
    'c//81nv///bb//P0+OSHh4gsAAAAAODg4AbFxcUEAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MI7e3u'+
    'pf//////99////nk///////Dw8OFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAJOTkxfW19eI5+nszujp7Mnb29t1dnZ2DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAA8AMAwOABAMDAAWxpwAE+CoABICCAAyAggAMgIIABICCAASAggAEgIIABICCAASAggAMgIIBP'+
    'ICCA/yAgwP8gIA==';

var jkurl = 'http://jk.nicovideo.jp/log/{0}/{1}-{2}';
var jktag = '<a href="{0}" target="_blank"><img src="{1}"/></a>';
var twtag = '<a href="http://twitter.com/?status={0}" target="_blank"><img src="{1}"/></a>'
var channel = {'NHK%C1%ED%B9%E7':'jk1',//NHK総合
    'NHK%B6%B5%B0%E9':'jk2',//NHK教育
    '%C6%FC%CB%DC%A5%C6%A5%EC%A5%D3':'jk4',//日本テレビ
    '%A5%C6%A5%EC%A5%D3%C4%AB%C6%FC':'jk5',//テレビ朝日
    'TBS%A5%C6%A5%EC%A5%D3':'jk6',//TBSテレビ
    '%A5%C6%A5%EC%A5%D3%C5%EC%B5%FE':'jk7',//テレビ東京
    '%A5%D5%A5%B8%A5%C6%A5%EC%A5%D3':'jk8'//フジテレビ
    };

// keyはチャンネル名、データはtdタグとスタート時間と番組名の順
var temp = {'':[]};

function getChannel(url) {
  for (var ch in channel) {
    if (url.indexOf(ch) != -1) {
      return channel[ch];
    }
  }
  return -1;
}

function createAddTag(ch,title,start,end) {
  var url = jkurl.format([ch,start,end]);
  return jktag.format([url,jkicon])+twtag.format([url,twicon])+
    '<form method="GET" action="http://www.google.co.jp/search" accept-charset="utf-8">'+
    '<input type="hidden" value="epg.2ch.net" name="as_sitesearch">'+
    '<input type="text" value="{0}" name="as_q">'.format([title])+
    '<input type="submit" value="他の放送日"></form>';
}
try{
  if (document.getElementsByTagName('ul').length == 0) {//個別ページかどうかの判定
    //番組一覧に追加
    var td = document.getElementsByTagName('td');
    for(var i=0;i<td.length;i++) {
      if (td[i].getAttribute('Valign') == 'top') {
        var a = td[i].getElementsByTagName('a');
        var ch = getChannel(a[0].getAttribute('href'));
        if (ch != -1) {
          var time = a[1].getAttribute('href').split('.tvpi')[0].slice(-12);
          var data = temp[ch];
          if (data != null) {
            data[0].innerHTML=data[0].innerHTML+'<br>'+createAddTag(ch,data[2],data[1],time);
          }
          temp[ch] = [td[i],time,a[0].innerHTML];
        }
      }
    }
  } else {
    //個別ページに追加
    var div = document.getElementById('body');
    var li = div.getElementsByTagName('li');
    var title = li[7].innerHTML;
    var start = li[3].innerHTML.replace(/\W/g,'');
    var end = li[5].innerHTML.replace(/\W/g,'');
    div.innerHTML = createAddTag(getChannel(location.href),title,start,end)+'<br>'+div.innerHTML;
  }
} catch(e) {
  GM_log(e);
}
})()