// ==UserScript==
// @name           musicmp3 download booster
// @namespace      musicmp3.spb.ru
// @description    механизация закачки треков с сайта musicmp3.spb.ru
// @include        http://musicmp3.spb.ru/a*
// @include        http://musicmp3spb.org/a*
// @author         trespassersW
// @source http://userscripts.org/scripts/show/112384
// @version 1.3
// @created 2011-10-26
// @updated 2014-03-26
// @grant GM_log
// @grant GM_xmlhttpRequest
// @grant GM_addStyle
//
/* StartHistory
  1.3 2014/03/29 works in FF28+ 
  1.2.2d 2011-10-26
  - ссылка для поиска обложки на discogs.org
v 1.2.2 2011-09-27 
  - cosmetic changes
v 1.2.1 2011-09-16
  - аффтар освоил X-тропинки 
  - ¿wtf? вместо треков _первого_ CD _многотомного_ альбома иногда
    получаем с сервера tempfile.ru ссылки на двухсотмегабайтый 
    никомунайухненужный файл mp3.rar -- загадка природы.. 1й диск 
    приходится качать по-старинке :[[
 
v 1.1.3 2011-09-12
   - ссылка для поиска обложки на амазоне
   - кнопка пауза/продожить
   - срипт прописывает в хтмл-тег *title* ссылок строчки вида:
     artist\year_album\<nn>_<trackname>  - для треков
     artist\year_album\cover     - для обложек
     - зачем:
       в dTa  ставим [Renamimng Mask:]  *title*.*ext*
       Start! - и всё качается в нужное место.. 
      ¿wtf? работает только при вызове пункта меню [Down Them All!],
         иначе ([save link with dTa] || [dTa oneCkick]) вместо *title* вставляется пустая строка..
         претензии - https://bugs.downthemall.net/  :((

v 1.1.2 2011-09-09 
   добавление прямой ссылки на картинку c обложкой в высоком разрешении

v 1.1.1 2011-09-07
   - v 1.1.1
EndHistory */
// @icon data:image/gif;base64,R0lGODlhMAAmAOMPADYvN2AlKpYYGE1DQp01LmxmVLFWVYyEYIqGis2QkKWkcNKoqMrHyuTDw/Tq6v///yH5BAEKAA8ALAAAAAAwACYAAAT+EIEp6QTo3Z3v+xWCDJiGVdMHKOzasgrwwDQGf1rrTnqd0z0Wouai4XY72IrH+gExyZhs9rwEBy2J5Fb0RaHdZ1D52HJfuw/QGVO+pLUMUPFbttRKEdP43rcac3VMU0RwYm2GRQGBaWl1bIg1QUVYayFlFCpNKhcdG2BmAIssAZ84p6g3qKusOwIwAQKysh+zsw2zMLYLtbYCDgmzdQIBBSy+vb6zF768ygS2Ca4ClbHCD8rZytjayy25CgO2yd3Z3OXT1AoH1gLksgbltMrBto5lLOK058K+0Mjb/sm6B0OfO37zom3bFs9bDG6jAMhq8M6dr3rjGNq7IyviPoTTFhUCRNZwIEcBKwa0q4gQYz+SGx/KwmLw4EKRGWE6nOJAQQFkIFveHFcS5Z0HDGIAHSrLZUKiMQEYMIDlpy0HQS8ypVXUVYADA3DZorjVaUioxEp9G8BO7K2sOF8SNfZkrC+yI2eZBYmAbt1bd+Hq3brIFgElcW3mbbp1hYADB2TBSsxS6+LHCgx/K1c58VlZBzKziJdPXufBl7H48vlAoDKKD6bKNhB79oLZU0H69ZnhwwJlvFgJF77NQQEEwYcrX45qG/Pn0D80mE49uvXr2HFEAAA7
// ==/UserScript==

var _='_';  // вставлять____вместо_непечатных_букв
//  _='';   // амнеэтивашипатчоркининужны

mmp3={ 
  ix: -1,  ax:0, trackno:0
 ,s: [], ls: [], lx: [], lref: '', file: '', robocod: '' 
 ,cover:[]  ,button: 0   ,err: []
 ,albums: []
 ,screenshot: 0
 ,Start:  function(){
    var m= this;
    var artist='unknown', year='1900', album='album';
    if(m.ix!=-1){ return;}
    m.ix=0;
    m.button.className="dmpause";
//    m.button.href="javascript:mmp3.Pause()";
    m.button.href="javascript:void(0)";
    m.button.addEventListener('click',function(){mmp3.Pause()},false)
    m.button.title="пауза";
    try{
      var t=getElByX('//div[@id="cntCenter"]/h1');
      if(t) artist=t.textContent;
      t=artist.split(' ');t.pop();artist=t.join(' ');
      for(var i=0; i<m.albums.length; i++){
        var L=m.albums[i].album;
        var url=getElByX('..//img[@class="cntCover"]',L);
        url= url? url.src: 0;
        //_log ("url: "+url);
        var e=buildEl("a",{target: "_blank", 
          'class': "dmtrack"},'&diams;');
          var s=L.textContent;
          var h=((s.replace(/^\n+/,'')).replace(/\n+$/,'')).split(/\n/);
          year=h.pop(); album=h.join(' ').replace(/\s*\(CD.*?\)/,'');
          _log(album);
          s =artist.rulat()+'\\'+year+'_'+album.rulat();
          m.cover.push(s);
          e.title=s+'\\cover';
          var amz, dog, hr;
          hr=amazon+escape(artist+' '+album);
          amz=buildEl("a",
           {href: hr, 'class':'dmamaz', target: '_blank',
            title:'поиск диска на amazon.com'},'&nbsp;');
          hr=escape((artist+ ' - '+album).replace(/\s+/g,'+'));
          hr='http://www.discogs.com/search?q='+hr+'&btn=&type=all';
          //_log(hr);
          dog=buildEl("a",
           {href: hr, 'class': 'dmdogs', target: '_blank',
            title:'поиск диска на discogs.com'},'&nbsp;');
          if(url){  
            var h=url.split('/');  h.push('f'+h.pop()); url=h.join('/'); 
            e.href=url;     L.appendChild(e);
          }
          L.appendChild(dog);
          L.appendChild(amz);
       }
    }catch(err){
      _log ('error buildig cover title\n'+err.message); 
      m.err.push(err);
    }
    setTimeout(m.onTimer1,dmTout);
  }
 ,Pause: function(){
     var m=this;
     if(m.screenshot) return;
     m.screenshot=m.ix+1;
     _log ("pause pressed "+m.ix);
 }
 ,Resume: function(){
     var m=this;
      if(m.button.className!="dmresum") return;
      m.button.className="dmpause";
//      m.button.href="javascript:mmp3.Pause()";
    m.button.href="javascript:void(0)";
    m.button.addEventListener('click',function(){mmp3.Pause()},false)
      m.button.title="пауза";
      _log ("resumed at "+m.ix);
      m.screenshot=0;
      setTimeout(m.onTimer1,dmTout);
 }
 ,onTimer1: function(){
    //_log ('ix:'+m.ix+(m.ix>=0?' stat'+m.lstat[m.ix]:' ?'));
    if(m.ix>=m.ls.length) return;
    var myA=buildEl("a",{"class":"dmwheel",title:'ждём ссылку..',
      target:"_self",href:"#"},"&uarr;");
    var pn=m.ls[m.ix].parentNode;
    m.href=pn.childNodes[1].href;
    pn.insertBefore(myA, pn.childNodes[0] );
    if(m.screenshot == m.ix+0.5 )  return; //!!!
    getURL(m.href,m.onLoad1);
  }
 ,onLoad1: function(s){
    var r=s.match(/action="\/file\/\d+/g);
    if(r){
      r=r[r.length-1].match(/\/file\/\d+/);
      m.ls[m.ix].parentNode.childNodes[0].href="http://tempfile.ru"+r[0];
      m.file=r+'';
//name="robot_code" value=53e1..3bc7" 
      r=s.match(/robot_code.+?value="([a-f0-9]{8,})/)
      if(r && r[1]){
        m.robocod=r[1];
        setTimeout(m.onTimer2,dmTout);
      }else _log ('get fail2');
    }else _log ('get fail1');
  }
 ,onTimer2: function(){
       //_log ('posting');
      postURL(m.file,m.onLoad2,m.robocod);
  }
 ,onLoad2: function(s){
//http://tempfile.ru/download/058..33b
//        m.Load2=s; //wtf? id'ntkno --  ask admin@tempfile.ru
      var r= s.match(/http:\/\/tempfile\.ru\/download\/[0-9a-f]{16,}/);
      if(!r){
         _log ('плохой ответ на пост');
      }
      m.ref=r?r[r.length-1]+'':"#";
      //_log (r);
      setTimeout(m.onTimer3,dmTout);
  }
 ,onTimer3: function(){
       if(m.screenshot && m.ix>=m.screenshot )  return;
       var p=m.ls[m.ix].parentNode.childNodes[0];
       if(m.ref !='#' ){
         if(m.ix>0 && 
            m.lx[m.ix] > m.lx[m.ix-1]+3 // другой альбом?
          )
        { m.ax++; m.trackno=0; //(Math.floor(m.trackno/100)+1)*100; 
        }
         p.className="dmtrack";
         p.innerHTML=dmchar;
         try{
         var tit=m.ls[m.ix].textContent;
         m.ls[m.ix].innerHTML='<small>'+(++m.trackno)+'.'+'</small>'+tit;
         /*m.ls[m.ix].textContent= */
         p.title=m.cover[m.ax]+'\\'+zearos(m.trackno,2)+'_'+
           tit.rulat()
         }catch(err){
           _log ('error building track title\n'+err.message); 
           m.err.push();
         }
       } 
       p.href=m.ref;
      if(++m.ix>=m.ls.length){ 
        m.button.parentNode.removeChild(m.button);
        return; 
      }
      if(m.ix!=m.screenshot)
       setTimeout(m.onTimer1,dmTout);
      else{
        m.button.className="dmresum";
//        m.button.href="javascript:mmp3.Resume()";
    m.button.href="javascript:void(0)";
    m.button.addEventListener('click',function(){mmp3.Resume()},false)
        m.button.title="продолжить";
        GM_log("paused at "+m.ix);
      }        
  }   
} 
//
const dmrules=
 'a.Name{color: #04c !important}'+
 'a.Name:hover{color: #019 !important}' +
 'a.Name:visited{color: #c40 !important}' +
 'a.Name:visited:hover{color: #910 !important}' +
 'div.albSong div a.Name {width: 240px !important}' +
 '*[class^="dm"]{ text-decoration:none; font-style: normal; font-weight: lighter}' +
 '*[class^="dm"]:hover{text-decoration:underline}' +
 '.dmtrack{font-size: .8em }' +
 '';
const dmicons={
 wheel:
'.dmwheel:before{content:url(data:image/gif;base64,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)}'
,track:
'.dmtrack:before{content:url(data:image/gif;base64,R0lGODlhDgAOAMZXAA5Vfw5VgA5Xgg9Xgw9YhBBYgw9ZhhFZhBNZgQ9ahw9aiBZZfxJahBVaghdafxhafhVbgxxaexdbghtcfypdcCVeeCVfeS9fbyZhfBJpnhhtn0dmY0xoYSBxnilzmDh2jUJ3hlZ3cEt5f096fFF6e3J3VVp7dV98cWV9bWx9ZWd+a2d+bG1/Z25/Z3B/ZXmBXoKDWIWDVoaDVomEU4yEUZmHSJyHRqqHN6SIQKWJQKmJPZOQWrOLNraMNLiMMr+NLcWNJ8KOK8iPJ82QI9iSHOCTFfaXBvacDvefEfegE+2iHvemG/eoHvipIPevKPiwKfiyLPrBQ/vQV/vTW/zfbf3icf3oef///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+BihjKWRUYQAh+QQBCgB/ACwAAAAADgAOAAAHfYB/gn8DCRATEgkDg4wGHSIrJB4EjIMGHyoxLCCUlX8GIzA4MyYFnn8MKDZBOS4Ipw0vPUU/MgunDjRDR0Q1D4wAAgoYOkZRSD4WCgQBggMZJzxJU01BLRqdggQhPktVT0IpB54RN0xWUEAVp38XSlROG+yCHFIl84M7FJWBADs=)}'
,start:
'.dmstart:after{content:url(data:image/gif;base64,R0lGODlhDgAOAMZgABYWFhcXFxgYFxgYGBkZGRoaGhsbGyAgICIiIjw8PD4+Pj8/P0BAQEBBQUJCQkRDQ0VFRUZGRklJSUpKSkxMTU1NTU5OTlBQUFFRUVFSUVRSVFNTU1RUVFZWVldXV1hZWV1bW15eXl9fX2ppamxsanNzc3V1dX5+fn9+foKDg4ODg4SEhIeGhpGRkZCSkJOTkZSUk5aWl5ubm5ycnKCgoKGgoaGhoaKioqOio6Ojo6ioqKysrK2sra6trbGvr6+xsbCxsLKysrKys7SysrOzs7S2tLa2tLe3uLi4uL29vb6+vr+/v8HBw8TExMbGxs3Ly83Nzc7OzM/Ozs/Pz9LQ0NLS0tLS09TU1NfV19nZ2dvb29vb3dzc29/f3+Dg4OLh4f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+BEdJTVAAIfkEAQoAfwAsAAAAAA4ADgAAB4+Af4KDhIWDDRMfHhIKhn8VKDI5NTAmEYUVLj5FREA7NioQgwwpQUkAF0dDPDQlCYIUN0pNAgEBFkY9L6J/IUJOTwMEBAMHJzcZgiJIUFcFBcMIKzocghY/VVnPBR1TTTiXfw4tUlsGIF5aVkwsC4MbO1hfXl1cUTcVhRszTVVUSzEwOIKggcQIDA8cKRwUCAA7)}'
,pause:
'.dmpause:after{content:url(data:image/gif;base64,R0lGODlhDgAOAMZeAB4eHiAgICAgISIiIiMjIyMkIyQkJCUlJTw8PD4+Pj8/P0BAQEBBQUJCQkRDQ0VFRUZGRklJSUpJSUpKSkxMTU1NTU5OTlBQUFFRUVFSUVJSVFRSVFNTU1RUVFdXV1hZWVpaWlxcXF5eXl9fX2ppamxsanNzc3V1dX9+foKDg4ODg4eGhpGRkZCSkJOTkZSUk5aWl5ubm5ycnKCgoKGgoaGhoaKioqOio6Ojo6ioqKysrK6trbGvr6+xsbCxsLKysrKys7Ozs7S2tLa2tbe3uLi4uLu7u76+vr+/v8HBw8LCw8TExMbGxs3Nzc7OzM7Ozc/OztLQ0NHR0dLS0tfV19fY19na2tzc29vd3d7e4N/f3+Dg4OLh4ePi4v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+BEdJTVAAIfkEAQoAfwAsAAAAAA4ADgAAB5GAf4KDhIWDDBMfHhEJhn8VKDE4NC8nEIUVLTxCQT46NSoPgwspPxgXRkQSEDMmCIIUNkcCAUxKAQA7LqJ/IkBMAwRSTwMBQzYZgiNFTQUGVlUEA0c5HYIWPVMHB1lYBwZLN5d/DSxQICFdWx4aSSsKgxw6VFxbWldONhWFHDJLU1GQwMDg6MGGEiQwOHDEcFAgADs=)}'
,resum:
'.dmresum:after{content:url(data:image/gif;base64,R0lGODlhDgAOAHcAACH5BAEAAGUALAAAAAAOAA4AhxQUFBUUFBUVFRYWFiEhISQkJCUlJSkpKS8vLzU1NTY2Nk9PT1FRUVJSUlVWVVZWVllZWVtbW1xdXV5eXl9fX2JiYmNjY2VlZmhoaGpqam1tbW5ubm9ub3FvcXFxb3JxcnJycnNzc3R0dHl5eXp5en59fYGCgoKCgoWFhYaFhYmJiYqKiouLi4uMjIyMjI2NjY6Ojo+Rj5CQkJKSkJKTk5OTkpOTk5SUlJWVlpqampubm5qcnJycnZ+fn6CgoKGhoaKhoqKioqampqenp6urq62srK6wsLCurrGxsbGxsrKysrO1s7W1s7W1tLe3t7e3uL29vb6+vb6+vsDAwsPDw8XFxcXHxcnJy83Ny8zMzM7NzdHPz9DQ0NHR0dbU1tbX1tjZ2dvb2t7e3t/f3+Hg4P//8EB/LAT1jAAAFAAAAQAAUgAAAAEVGvGeEHgkkAT1oAT1fAAAAATzHAAElwT1XDkEjzaIMP///zaIKjegEwAAAEB/LAUC9AAABxUB4AAAAAAAAAAAAAAAB3tkwATzuDepmEB/LAUC9AAABxUB4AT0qEB/LAAAAP/WIAT1jFvsVlvsXvFuHfFvCgEU/QAAUgAAAAEVGvGeEHgbkAT2SAT2JPG1/QAAUgAAAAEVGvGeEHgbkAT2aAT2RBQUFRUVFRYWFiEhISQkJCUlJSkpKS8vLzU1NTY2Nk9PT1FRUVJSUlVWVVZWVllZWVtbW11dXF5eXl9fX2JiYmNjY2ZlZWhoaGpqam1tbW5ubm9ub3FvcW9xcXJxcnJycnNzc3R0dHl5eXp5en19foKCgYKCgoWFhYWFhomJiYqKiouLi4yMi4yMjI2NjY6Ojo+Rj5CQkJCSkpOTkpKTk5OTk5SUlJaVlZqampubm5ycmp2cnJ+fn6CgoKGhoaKhoqKioqampqenp6urq6ysrbCwrq6usLGxsbKxsbKysrO1s/GGk/G2NAgU/QAAAAABAAT1gAAAAvG2EvGGk/G2NAgU/QAAAAABAAT1oAAAAvG2EvG1/QT1nAihAMsIHEiw4MAWFiREqLDCYJkMJXIE+VBDBIWCGWIcWaIEwAgfJyYMZGECiZAFBAQEINEDhAqBF35AaYDAxQAUTIrMuFimQpIqBWxwmWElSpMfDgRacJLFQA4wX2gUgDIEgkAMRrpAUMBjRwIGVIBUEAhDhpYrEQ4cePBkSooXA0EQ8UJmjJgwWH5oKBhCB5UuW6TgAOHwRgcPHDbYcMh4YEAAOw==)}'
,amaz:
'.dmamaz:after{content:url(data:image/gif;base64,R0lGODlhDQAMAMZGAAAAAAECAgIDAwcJCQwNDRESEhQVFRYYGB8gICQlJSwtLTAxMTIzM0pLS1BQUFFRUVJSUldYWGVmZmhpaWxsbHJzc4GBgYSFhYuLi5GSkZydnf+mALKysrS1tf+vIv+xJ8W5pf+2K/+6QP++TP/BTf/BUcfHx//GZP/GZcvMzP/HZ//JZP/Jb//LcNDS0v/Qe//Rff/Shf/Thf/VjOPh3f/hsP/juOvq6v/pxv/ryf/ry+3t7f/v1//06Pb3+Pj4+P/57v/78//9+//+/f/+/v///v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+CShjKWFtYXpvbgAh+QQBCgB/ACwAAAAADQAMAAAHbYB/RoOEhX+Cgz8WCwkUN4SIRhcAFBMAFZCEOyYcEgIPmYMcAwoNAhChRggFLhoBDqkRAAYHBAw0QEGCM0Y+GRgpHSAxLCSCLyI9hUY2PCGCQisbHycqKB4yODWIRDowJSMtOUZDRoeFRemQf4EAOw==)}'
,discogs:
'.dmdogs:after{content:url(data:image/gif;base64,R0lGODlhEAAQAMZ7AAAAAAEBAQIBAQICAAgICAkJCQ0NDQ8PDxEREREREhISExMTFBQUFBUVFR0dHR8fHx8gKiEhIiEhIyAhLCIjJCcpMSsrLSorNC0tLS0tLy0uMC4vMC8vMDEyMzIyMzIzNTMzMzIzNjMzNDU1NTc3Nzs7Ozs7PTw8PDw9Pjw9Pz4/QD4/QT9AQkBBREFBQktGA0pHAkNDQ0RFR0RGSEdISkhJSklKTUlLTEpLTlNQA0lLWUtMTVZRA01OUFNTU1ZWVltbW11ea19fX2hkJ2ZnaXFrJWpqbG9vb3V1dXZ1dnZ2dnh4eHd4g3l5eXp6enx8fH5+fn5/f39/f4CBgoGBgYSEhJqQAoiIipySBYqKioyNjaGXBaWZA6SaBZCRm6WaC6abDKicBZiZmqChorKtaK2trbu3eNvLB9zMB9zNAt7PB8XGx+LTBOHTCOXWB9LS0/bkBfflBfjlB/jmB9na2vnnCPrnCNvb3ProCObm5/Lz8////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAAQABAAAAe1gH+Cgk4kDRExTYOLf1QHAJAZMhYqWYxCkJkdNjNrZUCDVZmZIS1RelMST4IGo5AXOm9XKTcbf1KuMFtfZF4tNCgKSiejL211cWxFEwsCACMOo1h2amhzXKMN0ZlWcmpneGEDmQwlAAEIEENpcHhuPKMgTgkmNC1MZmBdOa5Ifxw4VhihE6SCKwAEBEGhQCSPGBYfDi4Z9GPMnR41RLjywUjLDg00PGQq4I+RoCQuHhjAcIRRIAA7)}'
};
var _log= console.log; //GM_log
const amazon= 'http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dpopular&field-keywords=';

const dmchar ='&#9834;' //'&darr;'

const dmTout =100;
/////////////// main( :)
/* подсветка еще-не и уже скачанных треков */

var m=mmp3;
try{
  GM_addStyle(dmrules);
  for each(var  r in dmicons) GM_addStyle(r);
  var list=getElsByX('//div[@class="cntAlbumMusician"]/div[@class="albSong"]');
  if(!list.length) throw "no albums - "+location.href.split('.spb.ru').pop();
  for(var i=0;i<list.length;i++){
    var alb=getElByX( '..//div[@class="Name"]', list[i] );
    _log (alb.textContent);
    m.albums.push({ album: alb, tracks: list[i] });
  }

/**/
for( var L, k=document.links.length,i=0; i<k; i++){
    L=document.links[i];
    if(L&& L.href && L.href.indexOf("download")>0
         //L.title && L.title.indexOf(Cka4)==0   
     && L.className=="Name" ){
       L.target = "_blank";
       m.ls.push(L); m.lx.push(i);
       //_log ('links['+i+'] '+L.textContent);
     }
}
/**/
if(m.ls.length){ // есть чё качать?
  m.button=buildEl('a', {'title':'получить прямые ссылки'
//  ,'class':'dmstart', 'href': 'javascript:mmp3.Start()'},'Ссылки' );
  ,'class':'dmstart', 'href': 'javascript:void(0)'},'Ссылки' );
  var e=document.createElement("li");
  m.button.addEventListener('click',function(e){m.Start()},false)
  e.appendChild(m.button);
  $("cntZakl").appendChild(e);
} 
}catch(err){sayE(err)}

/////////////// end of main( :)
/**/
function getURL(address, cb){
    GM_xmlhttpRequest({
        method :"GET",
        url :address,//+"?"+Math.random(),
        onload :function(xhr) {cb(xhr.responseText);}
    });
    //_log ('get');
}
function postURL (d,cb,co){
  var p={ 
      method : "POST",
      data : "robot_code="+co,
      url : "http://tempfile.ru"+d ,
      headers: { "Content-type": "application/x-www-form-urlencoded"
     },
     onload : function(xhr) {cb(xhr.responseText)}
     }
    GM_xmlhttpRequest(p);
    //_log ('post');
}

function sayE(err){
 var e=err.message ? err.message : err;
 _log (e); 
 m.err.push();
}

function zearos(n,d){//ins lEAding ZeROeS
 var r=n.toString();
 while(r.length<d) r='0'+r;
 return r;
}
String.prototype.rulat= function(){
  const rabc={
   'а':"а", 'б':"b", 'в':"v", 'г':"g", 'д':"d", 'е':"e"
,  'ё':"yo", 'ж':"zh", 'з':"z", 'и':"i", 'й':"j", 'к':"k"
,  'л':"l", 'м':"m", 'н':"n", 'о':"о", 'п':"p", 'р':"r"
,  'с':"s", 'т':"t", 'у':"u", 'ф':"f", 'х':"x", 'ц':"ts"
,  'ч':"ch", 'ш':"sh", 'щ':"shh", 'ъ':"'", 'ы':"y", 'ь':"'"
,  'э':"e", 'ю':"yu", 'я':"уа", 'А':"А", 'Б':"B", 'В':"V"
,  'Г':"G", 'Д':"D", 'Е':"E", 'Ё':"Yo", 'Ж':"Zh", 'З':"Z"
,  'И':"I", 'Й':"J", 'К':"K", 'Л':"L", 'М':"M", 'Н':"N"
,  'О':"О", 'П':"P", 'Р':"R", 'С':"S", 'Т':"T", 'У':"U"
,  'Ф':"F", 'Х':"H", 'Ц':"Ts", 'Ч':"Ch", 'Ш':"Sh", 'Щ':"Shh"
,  'Ъ':"`", 'Ы':"Y", 'Ь':"`", 'Э':"E", 'Ю':"Yu", 'Я':"Ya"
,  ' ':"_", '@':"_", '?':"_", '*':"_",  '/':"_", '\\':"_"
,  ':':"_", '.':"_", '<':"_", '>':"_", '"':"_"
  };
  for (var c, a=this.split(''), lat='', k=a.length, i=0; i<k; i++)
    lat+=(c=rabc[a[i]]) ? c : a[i];
  lat=lat.replace(/__+/g,'_').replace(/^_/,'').replace(/_$/,'');
  return lat.replace(/_/g,_);
}
// thanx to mungushume for code below
function getElByX(XPath, contextNode){
    var a = document.evaluate(XPath, (contextNode || document), 
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return (a.snapshotLength ? a.snapshotItem(0) : null);
};

function getElsByX(XPath, contextNode){
    var ret=[], i=0;
    var a = document.evaluate(XPath, (contextNode || document), 
    null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    while(a.snapshotItem(i))
      ret.push(a.snapshotItem(i++));
    return ret;
};
function $(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}
function buildEl(type, atArr, inner){
    var e = document.createElement(type);
    for (var at in atArr)
      atArr.hasOwnProperty(at)&&
        e.setAttribute(at, atArr[at]);
    if(inner)
        e.innerHTML = inner;
    return e;
};
/** /
function insAfter(n,e){
  if(e.nextElementSibling){
   e.parentNode.insertBefore(n,c.nextElementSibling);
  }else{
   e.parentNode.appendChild(n);
  } 
}
function insBefore(n,e){
   e.parentNode.insertBefore(n,e);
}
/**/