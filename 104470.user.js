// ==UserScript==
// @name           OnlineTVRecorder - Direkt Download Links
// @namespace      Woems
// @include        http://otr.datenkeller.at*
// @include        http://www.otr-files.de*
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
// ** get("",function (Url, Text, Header, xhr) {}); **
// Text
function trim(text) { return text.replace(/(^\s*|\s*$)/g,""); }
// Array
function uniq(array) { var last=""; return array.filter(function (e) { if (e!=last && e!='') { last=e; return true; } else { last=e; return false; } }); }
function Object2HTMLTable(obj) { var rows=""; for (var i in obj) rows+="<tr><td><b>"+i+":</b></td><td>"+obj[i]+"</td></tr>"; return "<table>"+rows+"</table>"; }
function aa(obj) { alert(uneval(obj)); }
function ga(obj) { GM_log(uneval(obj)); }
function getParam(key) { var a=location.search.match(/([^?=&]+)=([^?=&]+)/g); var r={}; for (var i in a) if (a.hasOwnProperty(i)) { var m=a[i].match(/([^?=&]+)=([^?=&]+)/); r[m[1]]=m[2]; } return (key)?r[key]:r; }
function getHost() { return location.host; } // hash, host, hostname, href, pathname, port, protocol, search
//GM_log=function (){}
/********************************/

function closeTab(){
  //window.focus();
  //location.href="about:blank";
  document.title="close...in 10 sec";
  //GM_log("Top: "+top+"\nParent"+parent+"TopWindow: "+top.window+"\nParentWindow"+parent.window+"\nWindow: "+window);
  Timeout(function () {
    //try { GM_log("top.location.href..."); top.location.href="about:blank"; } catch(e) { GM_log("top.location.href: "+e); }
    //try { GM_log("top.document.title..."); top.document.title="close"; } catch(e) { GM_log("top.document.title: "+e); }
    //try { GM_log("top.window.close()..."); top.window.close(); } catch(e) { GM_log("top.window.close(): "+e); }
    try { document.title="closed!"; window.close(); } catch(e) { GM_log("window.close(): "+e); }
  }, 10000);
}


/*
Interval(function () {
  //GM_log("RUN");
  $x('//a[contains(@href,".otrkey")]').forEach(function (e) {
    //GM_log("OTR:\nIndex: "+e.href.indexOf("otr")+"\nLink: "+e.href);
    if (e.href.indexOf("otr")!=0)
    {
      e.href="otr://"+e.href;
      e.style.color="green";
    }
  });
}, 10000);
*/

Timeout(function () {
switch(location.host)
{
  case 'www.onlinetvrecorder.com': onlinetvrecorder(); break;
  case 'www.otrkeyfinder.com': otrkeyfinder(); break;
  case 'otr-download.de': otrdownloadde(); break;
  case 'otr.datenkeller.at': datenkellerat(); break;
  case 'www.otr-files.de': otrfilesde(); break;
  case 'mirror-verbund.com':
  case 'www.mirror-verbund.com': mirrorverbundcom(); break;
  case 'mirror.human-evo.de': mirrorhumanevode(); break;
  case 'www.otrking.com': otrkingcom(); break;
  case 'super-otr.de': superotrde(); break;
  case 'home.privatotrmirror.de': homeprivatotrmirrorde(); break;
  case 'otr.2x.to': otr2xto(); break;
  case 'otrkeys.net': otrkeysnet(); break;
  default: alert("OTR-DirektLink: "+location.host); GM_log("OTR-DirektLink: "+location.host+"\n"+location.href); break;
}
}, 4000);

function onlinetvrecorder()
{
  if (getParam("aktion")=="dl2")
  {
    if ($xs("id('tdhome_sub_mirror')[@class='td2']"))
    {
      unsafeWindow.showSubSubArea('mirror');
      unsafeWindow.loadMirrorTab();
    }
  }
  if (getParam("aktion")=="list" && getParam("showonly")=="recordings")
  {
    Timeout(function () {
      location.href="http://www.onlinetvrecorder.com/index.php?aktion=list&showonly=recordings&orderby=time";
    },10*60*1000);

    var AktiveDownloads=deserialize("AktiveDownloads",{});
    var NewAktiveDownloads={};
    for (DL in AktiveDownloads)
       if (AktiveDownloads[DL] > Math.floor((new Date()).getTime()/1000/60))
           NewAktiveDownloads[DL]=AktiveDownloads[DL];
    serialize("AktiveDownloads",NewAktiveDownloads);

    try { unsafeWindow.markCheckbox("decoded"); } catch(e) {}
    /*/ // AKTIVE DOWNLOADS HERUNTERLADEN
    get("http://localhost:10025/get/downloads/currentcount",function (Url, Text, Header, xhr) {
      //alert("Anzahl Downloads: "+Text);
      var Anz=Text*1;
      if (Anz <= 3)
      {
        var Anzahl=1;
        $x("//tr[td/table/tbody/tr/td[1]/div/a/nobr[text()='Continue to download']]").forEach(function (e) {
          var AktiveDownloads=deserialize("AktiveDownloads",{});
          var DownloadTitel=$xs("./td[3]/div//span",e).textContent;
          var DownloadLink=$xs(".//a[nobr[text()='Continue to download']]",e).href;
          if (!AktiveDownloads[DownloadTitel] && Anzahl>0)
          {
            Anzahl-=1;
            GM_openInTab(DownloadLink);
            AktiveDownloads[DownloadTitel]=Math.floor((new Date()).getTime()/1000/60 + 4*60); //minuten
            serialize("AktiveDownloads",AktiveDownloads);
          }
        });
      }
    });
    /**/
  }
}

function slowOpenInTab(linklist)
{
  if (linklist.length==0) { return; } //closeTab();
  link=linklist.shift();

  host="http://"+link.textContent+"*";
  var hosts=deserialize("hosts",{});
  if (!hosts[host]) hosts[host]=0;
  hosts[host]++;
  //GM_log(uneval(hosts))
  serialize("hosts",hosts);
  link.style.color="green";
  GM_openInTab(link.href);
  Timeout(function () { slowOpenInTab(linklist); },1*60*1000);
}

function otrkeyfinder()
{
  if (location.pathname=="/otr/frame2.php")
  {
    if ($xs("//tr[td[text()='DivX']]/td/a"))
      GM_openInTab($xs("//tr[td[text()='DivX']]/td/a").href);
    else if ($x("//a[contains(@href,'/index.php?page=goto_mirror')]").length>0)// && confirm("Links öffnen?"))
      //$x("//a[contains(@href,'/index.php?page=goto_mirror')]").forEach(function (a) { GM_openInTab(a.href); });
      slowOpenInTab($x("//a[contains(@href,'/index.php?page=goto_mirror')]"));
  } else if (location.pathname=="/index.php")
  {
    if ($x("//div[@class='searchMirrors']//a[@name='extern']").length>0)// && confirm("Links öffnen?"))
    {
      //$x("//div[@class='searchMirrors']//a[@name='extern']").forEach(function (a) { GM_openInTab(a.href); });
      slowOpenInTab($x("//div[@class='searchMirrors']//a[@name='extern']"));
    } else if ($xs('//a/span[text()="Go to mirror"]'))
    {
      location.href=$xs('//a[span[text()="Go to mirror"]]').href;  
    }
  } else GM_log(location.host+": "+location.pathname);
}

function datenkellerat()
{
  if ($xs("id('reqFile')//a[text()='Download']")) // indexseite
  {
    var dl=$xs("id('reqFile')//a[text()='Download']").getAttribute("onclick").match(/'([^\']+)'/)[1];
    GM_openInTab("http://"+location.host+dl);
    closeTab();
  } else if ($xs("//a[text()='Hier'][contains(@onclick,'startCount')]"))
  {
    var click=$xs("//a[text()='Hier'][contains(@onclick,'startCount')]").getAttribute("onclick");
    var sC=click.match(/startCount\(([^,]*), ([^,]*), '([^,]*)', '([^,]*)', '([^,]*)'\)/)
    unsafeWindow.startCount(sC[1],sC[2],sC[3],sC[4],sC[5]);
    Timeout(datenkellerat, 4000);
  } else if ($xs("//a[text()='Download Link']"))
  {
    var dllink=$xs("//a[text()='Download Link']");
    //location.href="otr://"+dllink.href;
    // ** Download startet automatisch. "location.href=dllink.href;" nicht nötig **
    closeTab();
  } else if ($xs("//font[contains(text(),'3 Download Links pro Stunde')]"))
  {
    closeTab();
  } else Timeout(datenkellerat, 2000);
}

function otrdownloadde()
{
  if ($xs("id('now')/a[contains(@onclick,'dl_popup(')]")) // indexseite
  {
    var dlid=$xs("id('now')/a[contains(@onclick,'dl_popup(')]").getAttribute("onclick").match(/'([0-9]+)'/)[1];
    unsafeWindow.dl_popup(dlid);
    closeTab();
  } else if ($xs("//a[contains(@onclick,'dl_popup_start_download(')]")) // DL after Waiting
  {
    var dlid=$xs("//a[contains(@onclick,'dl_popup_start_download(')]").getAttribute("onclick").match(/'([a-z0-9]+)'/)[1];
    unsafeWindow.dl_popup_start_download(dlid);
    closeTab();
  } else if ($xs("//a[b[text()='Highspeed Download']]"))
  {
    location.href=$xs("//a[b[text()='Highspeed Download']]").href;
  } else if ($xs("//a[text()='Warten auf einen Highspeedslot']"))
  {
    location.href="javascript:"+$xs("//a[text()='Warten auf einen Highspeedslot']").getAttribute('onclick');
    closeTab();
  } else if ($xs("id('now2')/b[contains(text(),'Leider können Sie keinen Highspeed Download benutzen')]"))
  {
    closeTab();
  } else if ($('numberCountdown'))
  {
    if ($xs("id('numberCountdown')/b/u/a"))
    {
      //location.href="otr://"+$xs("id('numberCountdown')/b/u/a").href;
      location.href=$xs("id('numberCountdown')/b/u/a").href;
      closeTab();
    } else Timeout(otrdownloadde,4000);
  }
}

function otrfilesde()
{
  if ($xs('//input[@id="Send"][@value="Weiter zum Download Fenster"]')) // indexseite
    $xs('//input[@id="Send"][@value="Weiter zum Download Fenster"]').click();
  if ($("Send"))
    Timeout(otrfilesde, 2000)
  if ($xs("//strong[text()='Download steht automatisch wieder zur Verfügung wenn das 24 Stunden Limit wieder unterschritten wurde. ']"))
    closeTab();
  if ($("Countdown"))
    if ($xs("id('Countdown')/a[contains(@href,'dl-slot')]"))
    {
      //location.href="otr://"+$xs("id('Countdown')/a[contains(@href,'dl-slot')]").href;
      location.href=$xs("id('Countdown')/a[contains(@href,'dl-slot')]").href;
      //closeTab();
    } else Timeout(otrfilesde,2000);
  if ($xs("//a[contains(@href,'dl-slot')]"))
  {
    //location.href="otr://"+$xs("//a[contains(@href,'dl-slot')]").href;
    location.href=$xs("//a[contains(@href,'dl-slot')]").href;
    closeTab();
  }
  else if ($xs("//td[contains(text(),'Limit erreicht')]"))
  {
    closeTab();
  }
  else if ($xs("//td[contains(text(),'Server voll')]"))
  {
    closeTab();
  }
  
}

function mirrorverbundcom()
{
  if ($xs("id('mv_link_show')//a[contains(@onclick,'mvpop_dl(')]"))
  {
     var dl=$xs("id('mv_link_show')//a[contains(@onclick,'mvpop_dl(')]").getAttribute("onclick").match(/'([0-9a-z_]+)'/);
     unsafeWindow.mvpop_dl(dl[1]);
     closeTab();
  }
  else if ($xs("//input[@value='Warteschlange']"))
  {
    $xs("//input[@value='Warteschlange']").click();
    closeTab();
  }
  else if ($xs("//a[contains(@href,'.otrkey')]"))
  {
    //location.href="otr://"+$xs("//a[contains(@href,'.otrkey')]").href;
    location.href=$xs("//a[contains(@href,'.otrkey')]").href;
    closeTab();
  }
  else if ($xs("//a[text()='Download starten']"))
  {
    var attr=$xs("//a[text()='Download starten']").getAttribute('onclick').match(/'([^']*)'/);
    location.href="http://www.mirror-verbund.com/"+attr[1];
  }
  else if ($xs("//b[contains(text(),'Du darfst als Gast max. 2000 MB in 2 Stunde/n herrunterladen! Mehr Infos auf der Startseite')]"))
  {
    closeTab();
  }
  else Timeout(mirrorverbundcom, 10000);
}

function mirrorhumanevode()
{
  if ($xs("//a[text()='download']"))
  {
    closeTab(); // wegen Captcha
    //location.href=$xs("//a[text()='download']").href;
  }
}

function otrkingcom()
{
  if ($xs("//ul/li[@class='na'][@onclick='f(this)']"))
  {
    unsafeWindow.f($xs("//ul/li[@class='na'][@onclick='f(this)']"));
    Interval(function (){
      if ($xs("//a[text()='Direktdownload']"))
      {
        location.href=$xs("//a[text()='Direktdownload']").href;
        unsafeWindow.f($xs("//ul/li[@class='na'][@onclick='f(this)']"));
        closeTab();
      }
    },10000);
  }
}

function superotrde()
{
  if ($xs("id('ddownloadbox')/p/a"))
    location.href=$xs("id('ddownloadbox')/p/a").href;
  else if ($xs("id('ddownloadbox')/a[img[@src='images/download/ddl.png']]"))
  {
    location.href=$xs("id('ddownloadbox')/a[img[@src='images/download/ddl.png']]").href;
    closeTab();
  } else Timeout(superotrde,10000)
}

function homeprivatotrmirrorde()
{
}
function otr2xto()
{
}
function otrkeysnet()
{
}

