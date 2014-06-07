// ==UserScript==
// @name           Kinopolis - uebersichtlicher
// @namespace      Woems
// @include        http://www.kinopolis.de/bn/programm_wochenansicht*
// ==/UserScript==


/******** BASE FUNCTIONS ********/
function $(ID) {return document.getElementById(ID)}
// XPath
function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}
function $x(p, context) {
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function loop(xpath, func, rootdir) {
	xpath = document.evaluate(xpath, rootdir || document, null, 6, null);
	var I = xpath.snapshotLength;
	while(--I>=0) func(xpath.snapshotItem(I));
}
// Edit Nodes
function createElement(type, attributes, append){
  var node = document.createElement(type);
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) try { node[attr]=attributes[attr]; } catch(e) { node.setAttribute(attr, attributes[attr]); }
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function insertBefore(newNode, node) { return node.parentNode.insertBefore(newNode, node); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
// Position
function PosX(Node) { var ONL=Node.offsetLeft; var P = Node.offsetParent; while (P) { ONL+=P.offsetLeft; P = P.offsetParent; } return ONL; }
function PosY(Node) { var ONL=Node.offsetTop; var P = Node.offsetParent; while (P) { ONL+=P.offsetTop; P = P.offsetParent; } return ONL; }
function PosXY(obj) { var p = { x:0, y:0 }; do { p.x += obj.offsetLeft; p.y += obj.offsetTop; } while (obj = obj.offsetParent); return p; }
// Timer
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
// Save
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
// XHTML
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } });}
function head(url, cb) { GM_xmlhttpRequest({ method: "HEAD", url: url, onload: function(xhr) { cb(xhr.finalUrl, xhr.responseText, xhr.responseHeaders, xhr); } }); }
// Text
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
// Array
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
//function css(style) { GM_setStyle(style); }
css=GM_addStyle;
//GM_log=function (){}
/********************************/

//css("#wUebersicht { background-color:red; }");
//css("#wUebersicht div.buttons { opacity: 0.7; background-color:white; position:relative; top:-140px; left:-100px; width:112px; }");
//css("#wUebersicht div { display:inline; }");
css("#wUebersicht div.wThumb { float:left; width:112px; border:1px solid gray; padding: 1px; margin: 2px;  }"); //height:200px;
css("#wUebersichtUnsort div.wThumb { float:left; width:112px; border:1px solid gray; padding: 1px; margin: 2px;  }"); //height:200px;
css("wbutton { background-color:white; display:block; padding: 2px 5px 2px 5px; margin: 1px 2px 1px 2px; border:1px solid black; float:left; cursor:pointer; text-align:center; width:40px; overflow:hidden; }");
css("wbutton:hover { background-color:lightgray; }");
css(".wThumb[seen=true] wbutton.seen { background-color:yellow; }");
css(".wThumb[del=true] wbutton.del { background-color:red; }");
css(".wThumb[cool=true] wbutton.cool { background-color:green; }");
css(".wThumb[newseen=true] wbutton.seen { background-color:yellow; }");
css(".wThumb[newdel=true] wbutton.del { background-color:red; }");
css(".wThumb[newcool=true] wbutton.cool { background-color:green; }");
css(".wThumb[newseen] wbutton.seen { border:1px solid green; }");
css(".wThumb[newdel] wbutton.del { border:1px solid green; }");
css(".wThumb[newcool] wbutton.cool { border:1px solid green; }");
//css(".wThumb[newseen], .wThumb[newdel], .wThumb[newcool] { opacity:0.5; }");
css(".onlycool .wThumb[seen=true] { display:none }");
css(".onlycool .wThumb[del=true] { display:none }");

css(".wThumb[alter] { background-color:#777; }");
css(".wThumb[alter=\"0\"] { background-color:white; }");
css(".wThumb[alter=\"1\"] { background-color:lightgreen; }");
css(".wThumb[alter=\"2\"] { background-color:#FFA; }");
css(".wThumb[alter=\"3\"] { background-color:#FAA; }");
css(".wThumb[alter=\"4\"] { background-color:#AAA; }");

//css("div.wButton:first-letter { font-weight:bold; color:red; }");

function Fill(text,len,fillchar)
{
  var tmp="";
  for (var i=0; i<len-text.toString().length; i++)
    tmp+=fillchar;
  return tmp+text;
}
function DatePrint(d)
{
   return Fill(d.getDate(),2,"0")+"."+Fill(d.getMonth()+1,2,"0")+"."+d.getFullYear();
}

var AktuelleFilme=$x("id('contentRegionInner')//div[@class='movieResultItem']").map(function (item,i) {
  return {
    Titel:$xs('div/h3/a',item).textContent.replace('"',"'"),
    Link:$xs('div/h3/a',item).href,
    StartDate:( $xs('.//dd/dl[dt[@class="date"]]/dd',item) || { textContent: DatePrint(new Date()) } ).textContent,
    Img:$xs("div[@class='preSellingMovieListItemHeadline']/a[@class='filmPosterWeekview']/img",item),
    TimeTable:$xs(".//table[@class='movieSchedule']",item),
    Item:item,
    Nr:i,
  };
}).map(function (item) {
  if (item.Titel=="3D: Conan") GM_log(item.Titel+" "+item.StartDate);
  var f = deserialize("Filme",{});
  item.Status = f[item.Titel] || {};
  item.DayDiff = Math.floor((new Date()-new Date(item.StartDate.replace(/(..)\.(..)\.(....)/,"$2 $1, $3 0:00")))/1000/60/60/24);
  item.Img.parentNode.name="img_"+item.Nr;
  item.Today = ((new Date().getDay()+3)%7);
  //item.TimeTableInner=item.TimeTable.innerHTML.replace(/[\n\t]+/g,"");
  item.Time = $x(".//tr[2]/td["+(item.Today+1)+"]/div",item.TimeTable).map(function (e) { return e.textContent.replace(/[^0-9:]/g,""); });
  //item.Time=item.TimeTableToday.map(function (e) { return e.innerHTML.replace(/[\n\t]+/g,""); });//.textContent.replace(/[^0-9:]/g,""); });
  return item;
});

// Array nach Zeit sortieren (AktuelleFilme -> FilmeNachZeit)
var FilmeNachZeit=[];
var w2t={ 0:"Do", 1:"Fr", 2:"Sa", 3:"So", 4:"Mo", 5:"Di", 6:"Mi" };
AktuelleFilme.filter(function (film) {
  for (var week=0; week<7; week++)
    for (var anz=0; anz<film.TimeTable.rows[1].cells[week].children.length; anz++)
    {
      var FilmZeit=film.TimeTable.rows[1].cells[week].children[anz]
      if (FilmZeit.textContent.replace(/[^0-9:]/g,"")!="")
        FilmeNachZeit.push({ Tag:week, Zeit:FilmZeit.textContent.replace(/[^0-9:]/g,""), Film:film, Link:(FilmZeit.getElementsByTagName('a')[0]||{ href:"-leer -"}).href });
    }
});

FilmeNachZeit.sort(function (a,b) { return (a.Tag!=b.Tag) ? a.Tag-b.Tag : a.Zeit.replace(":","")*1-b.Zeit.replace(":","")*1; })

//GM_log("Nach Zeit: "+uneval(FilmeNachZeit));
//GM_log("Nach Zeit sortiert: "+uneval(FilmeNachZeit.sort(function (a,b) { return (a.Tag==b.Tag) ? a.Tag-b.Tag : a.Zeit.replace(":","")*1-b.Zeit.replace(":","")*1; })));
//GM_log("Nach Zeit sortiert: "+uneval(FilmeNachZeit.sort(function (a,b) { return a.Tag-b.Tag; })));

//GM_log("Week: "+(new Date().getDay()));
//GM_log("Week: "+(new Date().getDay()+3)%7+1);
//GM_log("Week: So"+(0+3)%7+" Mo"+(1+3)%7+" Di"+(2+3)%7+" Mi"+(3+3)%7+" Do"+(4+3)%7+" Fr"+(5+3)%7+" Sa"+(6+3)%7);

function data2html(data)
{
  return "<div class=wThumb del='"+data.Status['del']+"' cool='"+data.Status['cool']+"' seen='"+data.Status['seen']+"' alter="+Math.floor(data.DayDiff/7/2+1)+' title="'+data.Titel+'">'+data.DayDiff+' Tage<br>'+Math.floor(data.DayDiff/7+1)+' Wochen<a name=thump_'+data.Nr+" target=_blank href="+ data.Link /* #img_"+data.Nr+"*/ +"><img src="+data.Img.src+"></a><br><wbutton class='seen'>gesehen</wbutton><wbutton class='del'>löschen</wbutton><wbutton class='cool'>cool</wbutton></div>";
}

//GM_log(uneval(images.map(data)));
//GM_log(uneval(AktuelleFilme));

// Nur die nicht coolen Filme //
insertBefore(createElement("div",{ id:"wUebersichtUnsort", className:"onlycool" }),$xs("id('contentRegionInner')//div[@class='wrapperInner']"));
$("wUebersichtUnsort").innerHTML=""+AktuelleFilme.filter(function (e) { return !e.Status['cool']; }).map(data2html).join("")+"<div style='clear:left;'></div>";

// Nur die coolen Filme //
insertBefore(createElement("div",{ id:"wUebersicht", className:"onlycool" }),$xs("id('contentRegionInner')//div[@class='wrapperInner']"));
$("wUebersicht").innerHTML="<a href=# id=wShowAll>Alles anzeigen</a><br>"+AktuelleFilme.filter(function (e) { return e.Status['cool']; }).map(data2html).join("")+"<div style='clear:left;'></div>";

// Filme nach Uhrzeit //
insertBefore(createElement("div",{ id:"wUhrzeiten" }),$xs("id('contentRegionInner')//div[@class='wrapperInner']"));
$("wUhrzeiten").innerHTML=FilmeNachZeit.filter(function (e) {
  return e.Film.Status['cool'] && !e.Film.Status['seen'] && !e.Film.Status['del'] && (e.Tag==5 || e.Tag==e.Film.Today);
}).map(function (e) {
  var Stunde=e.Zeit.substr(0,2)*1;
  return (19<=Stunde && Stunde<=20?"<b>":"")+w2t[e.Tag]+" "+e.Zeit+" ("+Math.floor(e.Film.DayDiff/7+1)+". Wo)<a href='"+e.Link+"' oldhref='#img_"+e.Film.Nr+"' target=_blank> "+e.Film.Titel+"</a>"+(19<=Stunde && Stunde<=20?"</b>":"");
}).join("<br>");
onClick($("wShowAll"),function (e) {
  $("wUebersicht").className=($("wUebersicht").className=='onlycool')?'':'onlycool';
  $("wUebersichtUnsort").className=($("wUebersichtUnsort").className=='onlycool')?'':'onlycool';
  e.textContent=($("wUebersicht").className=='onlycool')?"Alles anzeigen":"Verstecke unwichtige";
});

/*/
GM_log(uneval($x("id('contentRegionInner')//div[@class='preSellingMovieListItemHeadline']/a[@class='filmPosterWeekview']/img").map(function (img){
  return {
    Titel:     $xs('../../h3/a',img).textContent,
    StartDate: ( $xs('.//dd/dl[4]/dd',img.parentNode.parentNode.parentNode) || { textContent: DatePrint(new Date()) } ).textContent,
    //SD:        new Date(this.StartDate.replace(/(..)\.(..)\.(....)/,"$2 $1, $3 0:00")),
    //DayDiff:   Math.floor((new Date()-SD)/1000/60/60/24),
    img:       img,
    link:      img.parentNode,
  };
}).map(function (Film) { GM_log(uneval(Film)+"\n"+Film.img.src); return Film; })));
/**/

$x("//wbutton[@class='del']").forEach(function (e) { onClick(e,function(b){
  var Titel=b.parentNode.title;
  var f=deserialize("Filme",{});
  if (!f[Titel]) f[Titel]={};
  f[Titel]['del']=!f[Titel]['del'];
  serialize("Filme",f);
  b.parentNode.setAttribute('newdel',f[Titel]['del']);
  b.parentNode.removeAttribute('del');
  //b.parentNode.style.opacity=(f[Titel]['del'])?"0.3":"";
}); });
$x("//wbutton[@class='seen']").forEach(function (e) { onClick(e,function(b){
  var Titel=b.parentNode.title;
  var f=deserialize("Filme",{});
  if (!f[Titel]) f[Titel]={};
  f[Titel]['seen']=!f[Titel]['seen'];
  serialize("Filme",f);
  b.parentNode.setAttribute('newseen',f[Titel]['seen']);
  b.parentNode.removeAttribute('seen');
}); });
$x("//wbutton[@class='cool']").forEach(function (e) { onClick(e,function(b){ 
  var Titel=b.parentNode.title;
  var f=deserialize("Filme",{});
  if (!f[Titel]) f[Titel]={};
  f[Titel]['cool']=!f[Titel]['cool'];
  serialize("Filme",f);
  b.parentNode.setAttribute('newcool',f[Titel]['cool']);
  b.parentNode.removeAttribute('cool');
}); });

/*
$x("id('contentRegionInner')//div[@class='movieResultItem']").forEach(function (movieResultItem){
  GM_log("-");
  //GM_log(movieResultItem.textContent);
  $xs("ul",movieResultItem).style.display="none";
  $xs("div[@class='movieWeeklyResultItemRightCol']",movieResultItem).style.display="none";
  $xs("div/h3[@class='headlineWeekView']",movieResultItem).style.display="none";
});
*/
1


