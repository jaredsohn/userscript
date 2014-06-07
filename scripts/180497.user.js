// ==UserScript==
// @id             DirectoryBrowser
// @name           Directory Browser
// @version        1.0.42
// @namespace      
// @author         Jjaejunks
// @description    Explorer-like browser for web based directory lists (Directory Index pages).
// @include        http://*/*
// @include        https://*/*
// @run-at         document-start
// ==/UserScript==

/*
Notes:
- Currently support TABLE, PRE, and UL based directory lists.
- Pages that doesn't comply to HTML coding standard, are not supported.
  e.g.: TR/TH/TD tags without the TABLE tag. Or.. LI without UL.
- Pages that are significantly customized are not supported even though TABLE, PRE or UL based list is used.
- Page styles are optimized for Opera v12.
- Tested on Opera v12 and Firefox v20 (with Scriptish). Not tested on Microsoft Internet Explorer.

Know Issues:
- Directory loading may never complete if the process is interrupted or the connection got
  broken by whatever cause. This is circumvented by using a configurable timeout which by default is 30 seconds.
  When it timed out, it will prompt to wait another 30 seconds or cancel the loading process.
- Some web pages are not marked with the correct encoding, or even marked with the incorrect encoding.
  In this case, the tree node labels may not display the correct text even though the web browser encoding view
  has been set to the correct encoding.
- Directory list loading can be noticeably slow if the list contains more than 1000 entries.

Version History:

v1.0.42:
- Fixed script initialization error if under Firefox.

v1.0.41:
- Fixed selected tree node highlight was not shown.

v1.0.40:
- Fixed incorrect highlighting of non browseable directory tree node.

v1.0.39:
- Fixed broken Size column value parser.
- Auto hide Description/Type column if not used in any entries of initial directory list.

v1.0.38:
- Fixed program crash if page contains links that were not encoded with UTF-8.

v1.0.37:
- Fixed broken footer server information layout if it contains elements.
- Fixed truncated directory entry names are not restored for some directory list format variant.
- Try to fix bad link to parent directory.
- Add "Parent Directory" entry to directory list if not present and if in subdirectory.
- Also update document title when changing directory.

v1.0.33:
- Fixed tree node labels still shows garbled characters for UTF-8 encoded path.
- Made parsing of PRE-formatted directory list entry field more flexible.
- Added detection for broken encoding of Chinese/Japanese/Korean month names.
- Added page detection error handling for pages that was interrupted when being loaded.

v1.0.29:
- Fixed URL path handling.

v1.0.28:
- Fixed directory path handling was mixed between escaped and unescaped.
- Changed PRE-formatted directory lists initial detection to be less strict.
- Always reset directory list's scroll position after changing directory.

v1.0.26:
- Fixed errorneous navigation if there are identical directory names across different directories.
- Fixed parsing error on PRE-formatted directory list's Size field values.
- Added buttons to show/hide the date, size, and description/type columns (configurable).
- Mark and disable directory entry and tree node if not browseable or not accessible.
- Remove "Parent Directory" entry from root directory list, if any.

v1.0.22:
- Made sure the tree node selection is fully visible when changing directory.
- Added toltip on header for current path.

v1.0.21:
- Changed parsing of PRE-formatted directory list entries to be less strict.
- Fixed URL decoding may fail if it contains characters that are not valid for URL.
- Fixed LiteSpeed directory entries are detected as files.

v1.0.18:
- Added support for PRE-formatted ngix directory list.
- Added support for lighttpd-style TABLE directory list.
- Show busy screen if page is being setup for the first time and show message if directory list format is not supported.
- Changed date text parsing to be much less strict in order to support any date format and locale.
- Fixed path and directory name of tree view node labels and tooltips may not be fully decoded.

v1.0.14:
- Added support for PRE-formatted Apace directory list without icon column. Generic icons will be used.
- Changed to always reconstruct file/directory name display, if truncated.
- Changed tree node label tooltip to display decoded URL.
- Fixed tree node button function got broken in v1.0.8 update.
- Fixed tree view horizontal scroller won't display when needed.
- Fixed subsequent waiting for data to load didn't set a new timer.

v1.0.10:
- Added support for UL based Apache directory lists.
- Fixed previous v1.0.8 update broke some codes. (oops...)

v1.0.8:
- Added support for tweaked Apache directory lists.
- Fixed path error if page URL is opened from root.
- Fixed freeze/hung-up if subsequent network requests fails.

v1.0.5:
- Added support for PREformatted Apache directory list (old Apache).
- Fixed tree node selection always changed to the node being collapsed.
- Minor UI improvements and fixes.

v1.0.2:
- Fixed directory list detection for pages that don't have a footer (the ADDRESS tag that hold the server
  information).
- Additional server information will be retrieved in background from the "Server" HTTP response header and
  if any, the "X-Powered-By" header also.
- Fixed table may get too wide due to long file/directory name not being broken into multiple lines.

v1.0.0:
- Initial release.
*/

(function(){
 function init(){
  var a,b,c,d,e,olderr=onerror,ready,styleCols=[];
  var body=document.body,header,options=document.createElement("DIV"),list,table,rows,footer,tree=document.createElement("DIV"),info,stats;
  var treeNodeSelected,busyScreen=document.createElement("DIV"),busyText=document.createElement("DIV");
  var seq,path=getPathName(location.href),xhr=new XMLHttpRequest(),timer=0,xhrbg=new XMLHttpRequest(),ae=document.createElement("A");

  //******************************configurations
  //timeout for data loading. default is 30 seconds.
  var timeout=30*1000;
  //default Date column visibility
  var showDate=true;
  //default Size column visibility
  var showSize=true;
  //default Description/Type column visibility
  var showDescType=true;
  //parent directory icon
  var iconParent="data:image/gif;base64,R0lGODlhFAAWAMIAAP///8z//5mZmWZmZjMzMwAAAAAAAAAAACH+TlRoaXMgYXJ0IGlzIGluIHRoZSBwdWJsaWMgZG9tYWluLiBLZXZpbiBIdWdoZXMsIGtldmluaEBlaXQuY29tLCBTZXB0ZW1iZXIgMTk5NQAh+QQBAAABACwAAAAAFAAWAAADSxi63P4jEPJqEDNTu6LO3PVpnDdOFnaCkHQGBTcqRRxuWG0v+5LrNUZQ8QPqeMakkaZsFihOpyDajMCoOoJAGNVWkt7QVfzokc+LBAA7";
  //generic folder icon
  var iconFolder="data:image/gif;base64,R0lGODlhFAAWAMIAAP/////Mmcz//5lmMzMzMwAAAAAAAAAAACH+TlRoaXMgYXJ0IGlzIGluIHRoZSBwdWJsaWMgZG9tYWluLiBLZXZpbiBIdWdoZXMsIGtldmluaEBlaXQuY29tLCBTZXB0ZW1iZXIgMTk5NQAh+QQBAAACACwAAAAAFAAWAAADVCi63P4wyklZufjOErrvRcR9ZKYpxUB6aokGQyzHKxyO9RoTV54PPJyPBewNSUXhcWc8soJOIjTaSVJhVphWxd3CeILUbDwmgMPmtHrNIyxM8Iw7AQA7";
  //generic file icon
  var iconFile="data:image/gif;base64,R0lGODlhFAAWAMIAAP///8z//5mZmTMzMwAAAAAAAAAAAAAAACH+TlRoaXMgYXJ0IGlzIGluIHRoZSBwdWJsaWMgZG9tYWluLiBLZXZpbiBIdWdoZXMsIGtldmluaEBlaXQuY29tLCBTZXB0ZW1iZXIgMTk5NQAh+QQBAAABACwAAAAAFAAWAAADUDi6vPEwDECrnSO+aTvPEddVIriN1wWJKDG48IlSRG0T8kwJvIBLOkvvxwoCfDnjkaisIIHNZdL4LAarUSm0iY12uUwvcdArm3mvyG3N/iUAADs=";

  //******************************networkings
  function jsErrorHandler(msg,url,ln){
   if(onerror===jsErrorHandler) onerror=olderr;
   if(!ready) showBusyScreen(false);
  }

  function xhrRequest(url,onsuccess,onfail,ontimeout,method){
   var xhr=this;this.url=url;
   function waiter(){
    xhr.ontimeout();
   }
   if(this.blocked){
    if(!this.background){
     alert("Local XMLHTTPRequest is disallowed by web browser.\nPlease reload this page if the web browser setting has been changed.");
    }
    return;
   }
   this.onreadystatechange=xhrHandler;this.onsuccess=onsuccess;this.onfail=onfail;this.ontimeout=ontimeout;
   this.open(method||"GET",url);this.send();
   if(ontimeout) timer=setTimeout(waiter,timeout);
   if(!this.background) showLoadingScreen();
  }
  function xhrHandler(){
   var a,b,c;
   if(this.readyState!==4)return;
   clearTimeout(timer);timer=0;
   if((this.status>0)&&(this.status<400)){//success
    if(this.onsuccess){
     if(!this.background){
      a=this.responseText;b=a.search(/<\/head>/i);
      if(b<0)b=0;
      ae.href=this.url;c={head:document.createElement("DIV"),body:document.createElement("DIV"),location:ae};
      c.head.innerHTML=a.substr(0,b);c.body.innerHTML=a.substr(b+7);c.title=c.head.querySelector("title");
      if(c.title) c.title=c.title.textContent;
     }
     this.onsuccess(c);
    }
   }else{//error
    this.blocked=!this.status&&(location.protocol==="file:");
    if(this.onfail) this.onfail();
   }
   if(!this.background) showBusyScreen(false);
  }
  function xhrInit(xhr){
   xhr.onreadystatechange=xhrHandler;xhr.Request=xhrRequest;timer=0;
  }
  xhrInit(xhr);xhrInit(xhrbg);xhrbg.background=true;
  busyScreen.id="busyScreen";busyText.id="busyText";

  //******************************document processors and parsers
  function getPathName(url){
   var a=(/https?:\/\/[^/]+(\/[^?#]*)/).exec(url);
   return a[1];
  }
  function parentPath(path){
   return path.substr(0,path.lastIndexOf("/",path.length-2)+1);
  }
  function getDocInfo(doc){
   var a=doc.body,b,c,d,sq=[],docpath=getPathName(doc.location.href),docparpath=parentPath(docpath),maxcols=0,z;
   if(!a||!(/^Index of \//).test(doc.title))return;
   a=a.children;
   function newEntry(tagname){
    function toString(){
     return this.tag;
    }
    return {tag:tagname,toString:toString};
   }
   function checkHeader(ele,entry){
    if((/^Index of \//).test(ele.textContent)){
     ele.id="header";sq.header=ele;return ele;
    }else return;
   }
   function fixLink(ele){
    //restore full name of truncated file/directory name.
    //also convert ngix "../" parent directory label to "Parent Directory".
    //convert relative URL to absolute.
    //return true if link points to parent directory.
    var a;
    if(ele&&(ele.tagName==="A")){
     a=ele.textContent;
     if(a){
      if((a[a.length-1]===">")||(a.substr(-3)==="...")){
       a=ele.href.match(/\/([^/]+)\/?$/);
       if(a) ele.textContent=unescape(a[1]);
      }else if(a==="../") ele.textContent="Parent Directory";
     }
     a=ele.attributes["href"].value;
     if(!(/^(https?:\/\/|\/)/).test(a)&&(a!=="/"))ele.attributes["href"].value=docpath+a;
     return ele.pathname===parentPath(docpath);
    }
   }
   function shortSizeValue(s){
    var a=parseInt(s);
    if(isNaN(a)){
     return s;
    }else if(a>=1073741824){
     return (a/1073741824).toFixed(0)+"G";
    }else if(a>=1048576){
     return (a/1048576).toFixed(0)+"M";
    }else if(a>=1000){
     return (a/1024).toFixed(0)+"K";
    }else return s;
   }
   function getIconInfo(parpath,path){
    var d,e,f;
    if(path.charAt(path.length-1)!=="/"){//file
     d=iconFile;e="File";f=e;
    }else{//directory
     if(path===parpath){//parent directory
      d=iconParent;e="[]";f="Parent Directory";
     }else{//subdirectory
      d=iconFolder;e="[DIR]";f="Directory";
     }
    }
    return {src:d,alt:e,title:f};
   }
   function addParentDirEntry(tbl){
    var a,b=parentPath(doc.location.pathname),c,d,e,f;
    if(tbl.rows.length>1){
     e=tbl.rows[1].cells[1].children[0];
     if((e.textContent.trim().toLowerCase()==="parent directory")&&(e.pathname!==b)) e.pathname=b;
    }
    if((docparpath!==docpath)&&((tbl.rows.length===1)||(e.pathname!==b))){
     c='<td><img /></td><td><a href="'+e+'">Parent Directory</a></td>';
     for(a=0;a<tbl.rows[0].cells.length-2;a++) c+="<td></td>";
     d=tbl.insertRow(1);d.innerHTML=c;f=d.cells[0].children[0];f.src=iconParent;f.alt="[]";f.title="Parent Directory";
    }
   }
   function checkTable(ele,entry){
    var a,b=-1,c,d,e,f,rows=ele.rows,z;
    if(rows.length)try{
     a=rows[0].cells;
     if(a.length>3){
      if(a[1].children[0]&&(a[0].children[0].tagName==="IMG")&&(a[1].textContent==="Name")&&(a[2].textContent==="Last modified")&&(a[3].textContent==="Size")){
       b=1; //Apache standard/tweaked
      }else if((a[0].textContent==="Name")&&(a[1].textContent==="Last Modified")&&(a[2].textContent==="Size")&&(a[3].textContent==="Type")){
       b=0; //lighttpd standard
      }
      if(b<0) return;
      ele.id="table";entry.result=a[c];
      //remove lower horizontal lines in table, if any
      a=rows[rows.length-1].children[0];
      if(a&&a.children[0]&&a.children[0].tagName==="HR")ele.deleteRow(rows.length-1);
      //remove upper horizontal lines in table, if any
      a=rows[1].children[0];
      if(a&&a.children[0]&&a.children[0].tagName==="HR")ele.deleteRow(1);
      //fix truncated file/directory labels
      if(!b){//if lighttpd
       //add icon column
       e=parentPath(docpath);
       a=document.createElement("TH");a.innerHTML='<img />';rows[0].insertBefore(a,rows[0].cells[0]);
       //normalize table
       ele.attributes.removeNamedItem("CELLPADDING");ele.attributes.removeNamedItem("CELLSPACING");
       //move header row from THEAD into TBODY
       if(rows[0].parentNode.tagName==="THEAD"){
        if(ele.tBodies[0].rows.length){
         ele.tBodies[0].insertBefore(rows[0],ele.tBodies[0].rows[0]);
        }else ele.tBodies[0].appendChild(rows[0]);
       }
      }
      for(a=rows.length-1;a>0;a--)try{
       f=rows[a].cells;
       if(fixLink(f[b].children[0])&&(docpath==="/")){
        ele.deleteRow(a);continue;
       }
       if(!b){//add icon column if lighttpd
        c=getIconInfo(e,f[b].children[0].pathname);
        d=rows[a].insertCell(0);d.innerHTML='<img src="'+c.src+'" alt="'+c.alt+'" title="'+c.title+'" />';
       }
       if(!ready){
        if((f.length>maxcols)&&f[f.length-1].textContent.trim()){
         maxcols=f.length;
        }else if(f.length-1>maxcols) maxcols=f.length-1;
       }
      }catch(z){
       if(a===(rows.length-1)){
        console.log("[Directory Browser] Bad table row index "+a+".");ele.deleteRow(a);
       }else return;
      }
      addParentDirEntry(ele);sq.table=ele;return ele;
     }
    }catch(z){}
   }
   function checkFooter(ele,entry){
    ele.id="footer";sq.footer=ele;return ele;
   }
   function checkPre(ele,entry){
    var a,b,c,d,e,f,g,i=ele.children,j=i.length,l,r,hi,hh,fls=[],ff,ffp,z;
    if(j<2) return;
    hi=i[0].tagName==="IMG"?1:0;a=i[hi];
    if(a){
     hh=a.textContent.toLowerCase()==="name";
    }else hh=false;
    l=ele.innerHTML.split("\n");
    if(!l.length) return;
    if(hh){//has header
     //parse header. ignore 1st hr.
     while(true){
      if(!a)return;
      if(a.tagName!=="A"){
       if(fls.length){
        break;
       }else return;
      }
      b=a.textContent.trim();
      switch(b.toLowerCase()){
       case "name":
        fls.push([b,"\\s*(<a[^>]+>[^>]+>)","\\s*(<a[^>]+>[^>]+>)"]);break;
       case "last modified":
        fls.push([b,"\\s*(<a[^>]+>[^>]+>)","\\s*([0-9]{2}[-/][^-/\\s]{2,6}[-/][0-9]{4}\\s[0-9]{2}:[0-9]{2}|[^-/\\s]{2,6}[-/][0-9]{2}[-/][0-9]{4}\\s[0-9]{2}:[0-9]{2}|[0-9]{4}[-/][^-/\\s]{2,6}[-/][0-9]{2}\\s[0-9]{2}:[0-9]{2}|\\s{16,20})"]);break;
       case "size":
        fls.si=fls.push([b,"\\s*(<a[^>]+>[^>]+>)","\\s*([0-9.]+[kmg]|[0-9.]{1,3}|-)"]);break;
       case "description":
       case "type":
        fls.push([b,"\\s*(<a[^>]+>[^>]+>)","(.*)"]);b="";break;
       default:
        b="";break;
      }
      if(!b)break;
      a=a.nextElementSibling;
     }
     if(!fls.length||(fls[0][0].toLowerCase()!=="name"))return;
     if(hi){
      fls.unshift(["","\\s*(<img[^>]+>)","\\s*(<img[^>]+>)"]);
      if(fls.si)fls.si++;
     }
     a=fls.reduce(function(p,c){
      return p+c[1];
     },"");
     a=new RegExp("^"+a+"(.*)$","i");
     a=a.exec(l[0]);
     if(!a) return;
     a.shift();b=(/^\s*<hr>(.*)$/).exec(a.pop());
     if(b){
      l[0]=b.pop();
     }else{
      l.shift();
      if(!l.length) return;
      b=(/^<hr>(.*)$/).exec(l[0]);
      if(b){
       l[0]=b.pop();
       if(!l[0]) l.shift();
      }else l.shift();
     }
    }else{//no header. e.g.: ngix standard (name,date,size)
     hi=0;fls.push(["Name","\\s*(<a[^>]+>[^>]+>)","\\s*(<a[^>]+>[^>]+>)"]);
     fls.push(["Last modified","\\s*(<a[^>]+>[^>]+>)","\\s*([0-9]{2}[-/][^-/\\s]{2,6}[-/][0-9]{4}\\s[0-9]{2}:[0-9]{2}|[^-/\\s]{2,6}[-/][0-9]{2}[-/][0-9]{4}\\s[0-9]{2}:[0-9]{2}|[0-9]{4}[-/][^-/\\s]{2,6}[-/][0-9]{2}\\s[0-9]{2}:[0-9]{2}|\\s{16,20})"]);
     fls.si=fls.push(["Size","\\s*(<a[^>]+>[^>]+>)","\\s*([0-9]+[kmg]?|-)"]);
     ffp=/^\s*(<a href="..\/">..\/<\/a>)\s*$/;
    }
    ff=fls.reduce(function(p,c){
     return p+c[2];
    },"");
    ff=new RegExp("^"+ff+"\\s*$","i");
    r=document.createElement("TABLE");r.id="table";r.orgtag="PRE";
    b=r.insertRow(-1);
    b.innerHTML=(hi?"":"<th><img /></th>")+fls.reduce(function(prev,curr){
     return prev+"<th>"+curr[0]+"</th>";
    },"");
    //parse entries
    e=parentPath(docpath);
    for(i=0;i<l.length;i++)try{
     if(!l[i]||(l[i]==="<hr>")) break; //2nd hr: no more entries
     b=ff.exec(l[i]);
     if(!b){
      if(!ffp) return;
      b=ffp.exec(l[i]);
      if(b) b=["",b[1],"","-",""];
     }
     c=(/(.*)<hr>$/).exec(b[b.length-1]);
     if(c) b[b.length-1]=c[1];
     if(fls.si){
      //convert byte value to kilo/mega/giga
      b[fls.si]=shortSizeValue(b[fls.si]);
     }
     //generate entry html
     c=hi?"":"<td><img /></td>";
     for(j=1;j<b.length;j++){
      c+="<td>"+b[j]+"</td>";
     }
     d=r.insertRow(-1);d.innerHTML=c;f=d.cells;
     if(fls.si<(3+hi))f[fls.si-1].style.width="5ex";
     if(fixLink(f[1].children[0])&&(docpath==="/")){
      r.deleteRow(d.rowIndex);continue;
     }
     if(!ready){
      if((f.length>maxcols)&&f[f.length-1].textContent.trim()){
        maxcols=f.length;
      }else if(f.length-1>maxcols) maxcols=f.length-1;
     }
     if(!hi){
      c=getIconInfo(e,f[1].children[0].pathname);f=f[0].children[0];f.src=c.src;f.alt=c.alt;f.title=c.title;
     }
    }catch(z){
     if(i===(l.length-1)){
      console.log("[Directory Browser] Bad preformatted list index "+i+".");
     }else return;
    }
    addParentDirEntry(r);entry.table=r;sq.table=r;return ele;
   }
   function checkUl(ele,entry){
    var a,b,c,d,i,f,l=ele.children,r,z;
    b=l.length>5?5:l.length;
    if(!b) return;
    for(a=0;a<b;a++){//check up to 5 entries
     if((l[a].childNodes.length!==1)||(l[a].children.length!==1)||(l[a].children[0].tagName!=="A")) return;
    }
    //Apache UL-list: name
    r=document.createElement("TABLE");r.id="table";r.orgtag="UL";a="<tr><th><img /></th><th>Name</th></tr>";
    //import entries
    b=parentPath(docpath);
    for(i=0;i<l.length;i++)try{
     c=l[i].children[0];
     if(fixLink(c)&&(docpath==="/")) continue;
     d=getIconInfo(b,c.pathname);
     a+='<tr><td><img src="'+d.src+'" alt="'+d.alt+'" title="'+d.title+'" /></td><td>'+c.outerHTML+'</td></tr>';
    }catch(z){
     if(i===(l.length-1)){
      console.log("[Directory Browser] Bad list index "+i+".");
     }else return;
    }
    r.innerHTML=a;addParentDirEntry(r);entry.table=r;sq.table=r;return ele;
   }
   function checkDiv(ele,entry){
    if(ele.children.length===1){//check for table
     if((ele.firstElementChild.tagName!=="TABLE")||!checkTable(ele.firstElementChild,entry)) return;
     entry.table=sq.table;return ele;
    }else if(sq.length){//check for footer
     if(!sq[sq.length-1].table||!ele.firstChild||!ele.firstChild.data) return;
     var a=document.createElement("ADDRESS");a.id="footer";a.textContent=ele.textContent;ele.replaceChild(a,ele.firstChild);
     entry.footer=a;sq.footer=a;return ele;
    }
   }
   function dummyCheck(ele,entry){
    return ele;
   }
   var db={
    "H1":{check:checkHeader},
    "TABLE":{check:checkTable},
    "ADDRESS":{check:checkFooter},
    "PRE":{check:checkPre},
    "UL":{check:checkUl},
    "H2":{check:checkHeader},
    "DIV":{check:checkDiv},
   };
   for(b=0;b<a.length;b++){
    if(a[b].attributes["px"]) continue;
    if(a[b].id==="busyScreen") break;
    c=db[a[b].tagName];
    if(c){
     d=newEntry(a[b].tagName);
     if(c.check&&(d.result=c.check(a[b],d))) sq.push(d);
    }
   }
   a=sq.toString();
   if(seq){
    if(a!==seq)return;
   }else{
    seq=a;window.dirSeq=a;
   }
   switch(a){
    case "H1,TABLE,ADDRESS":  //Apache TABLE( tr(td(img(icon)),td(a(name)),td(date),td(size)[,td(description)]) )
    case "H1,TABLE":
    case "H1,PRE,ADDRESS":    //Apache/ngix PRE( [img(icon),]a(name),date,size[,description] )
    case "H1,PRE":
    case "H1,UL,ADDRESS":     //Apache UL( li(a(name)) )
    case "H1,UL":
    case "H2,DIV,DIV":        //lighttpd DIV(TABLE( tr(td(a(name)),td(date),td(size),td(type)) ))
     if(table) break;
     //initial setup
     header=sq.header;options.id="options";
     if(sq.table.rows[0].cells.length>2){
      options.innerHTML='<span class="down" title="Show/hide Date column" idx="0">Date</span><span class="down" title="Show/hide Size column" idx="1">Size</span>'+(sq.table.rows[0].cells.length>4?'<span class="down" title="Show/hide Description/Type column" idx="2">D/T</span>':'');
      for(b=0;b<options.childElementCount;b++){
       options.children[b].onclick=optionClick;
      }
      if((maxcols===4)&&(maxcols<sq.table.rows[0].cells.length)){
       setTimeout(function(){
        options.children[options.childElementCount-1].click();
       },0);
      }
     }
     tree.id="tree";table=sq.table;list.appendChild(table);
     if(!sq.footer){//has no footer
      c={result:document.createElement("ADDRESS")};c.result.id="footer";sq.footer=c.result;sq.push(c);
     }
     footer=sq.footer;
     info=document.createElement("DIV");info.id="info";info.innerHTML=footer.innerHTML;info.title=footer.textContent.trim();
     for(b=footer.childNodes.length-1;b>0;b--)footer.removeChild(footer.childNodes[b]);
     if(footer.firstChild){//footer has text
      footer.replaceChild(info,footer.firstChild);
     }else footer.appendChild(info);
     stats=document.createElement("SPAN");stats.id="stats";footer.appendChild(stats);
     b=busyScreen.parentNode;body.innerHTML="";
     body.appendChild(header);body.appendChild(options);body.appendChild(list);body.appendChild(tree);body.appendChild(footer);
     showBusyScreen(b);
     break;
    default:
     return;
   }
   return sq;
  }

  function processDocument(treeNode,doc){
   var b=getDocInfo(doc),c=treeNode.children;
   if(b){
    treeNode.table=b.table;b.table.treeNode=treeNode;updateTree(b.table,treeNode.label.path,treeNode,treeNode.level);
    treeNode.button.textContent=treeNode.childElementCount>2?"-":"";treeNode.classList.remove("collapsed");
    treeNode.button.title=treeNode.childElementCount>2?"":"This directory has no subdirectory.";return b.table;
   }else setTimeout(function(){
    disableNode(treeNode,"Directory is not browseable or is not using supported format.");
    showErrorScreen("Directory is not browseable or<br />is not using supported format.");
   },0);
  }
  function decode2(uri){
   var z;
   try{
    return decodeURIComponent(uri);
   }catch(z){
    return unescape(uri);
   }
  }
  function makeTreeNode(path,caption,level,expanded,partial){
   var a=document.createElement("DIV"),b=document.createElement("SPAN"),c=document.createElement("SPAN");
   if(!caption){
    caption=path.split("/");caption=decode2(caption[caption.length-2]);
   }
   a.level=level;
   if(!expanded&&!partial)a.className="collapsed";
   if(partial){
    a.className="partial";b.title="This directory is reference only. Click to load directory data.";
   }
   if(!level)a.style.marginLeft="2px";
   b.className="button";b.textContent=partial?"?":(expanded?"-":"+");b.onclick=treeNodeButtonClick;
   b.treeNode=a;a.button=a.appendChild(b);
   c.textContent="\xa0";a.appendChild(c);c=document.createElement("SPAN");
   c.className="label";c.textContent=caption;c.path=path;c.title=decode2(path);c.onclick=treeNodeLabelClick;
   c.treeNode=a;a.label=a.appendChild(c);
   return a;
  }
  function updateTree(table,path,node,level,expanded){
   var a,b,c=0,d,e,f,h=0,i,rows=table.rows,sn;
   if(node.classList.contains("partial"))sn=node.children[3];
   for(i=1;i<rows.length;i++){
    f=rows[i];
    if(f.cells.length<2)continue;
    f.label=f.cells[1].children[0];a=f.cells[0].children[0];
    if(a.tagName==="A") a=a.children[0];
    a=a.src;d=a.substr(0,5)==="data:"?a:a.substr(a.lastIndexOf("/")+1);
    switch(d){
     case "folder.gif":
     case "folder.png":
     case iconFolder:
      if(sn&&(f.label.pathname===sn.label.path)&&(f.label.pathname!==parentPath(f.label.pathname))){
       node.classList.remove("partial");e=node.appendChild(sn);sn=null;
      }else e=node.appendChild(makeTreeNode(f.label.pathname,"",level+1,expanded));
      e.tableRow=f;f.label.treeNode=e;f.label.onclick=tableLabelClick;c++;break;
     case "back.gif":
     case "back.png":
     case iconParent:
      f.label.treeNode=node.parentNode;f.label.onclick=tableLabelClick;break;
     default:
      h++;break;
    }
   }
   table.dirs=c;table.files=h;
   if(!c)node.children[0].textContent="";
  }

  //******************************helpers
  function showBusyScreen(show){
   if(show){
    if(!busyScreen.parentNode){
     body.appendChild(busyScreen);body.appendChild(busyText);busyScreen.focus();
    }
   }else if(busyScreen.parentNode){
    body.removeChild(busyText);body.removeChild(busyScreen);
   }
  }
  function showErrorScreen(msg){
    busyText.style.cssText="left:35%;right:35%;font-size:16pt;color:#f00";busyText.innerHTML=msg;showBusyScreen(true);
    setTimeout(showBusyScreen,2500);
  }
  function showLoadingScreen(){
    busyText.style.cssText="";busyText.textContent="Loading...";showBusyScreen(true);
  }
  function timedOut(){
   clearTimeout(timer);timer=0;
   if(confirm("Timeout while loading directory data.\nDo you want to wait another minute?")){
    timer=setTimeout(timedOut,timeout);
   }else{
    this.abort();showBusyScreen(false);
   }
  }
  function disableNode(node,msg){
   node.button.onclick=null;node.button.style.cssText="cursor:default;background:#c00";
   node.button.textContent="";node.button.title=msg;
   node.label.onclick=null;node.label.style.cssText="cursor:default;color:#c00";
   node.label.title+=" ("+msg+")";
   if(!node.tableRow)return;
   node.tableRow.label.onclick=function(){return false};
   node.tableRow.style.background="#fcc";node.tableRow.title=msg;
  }
  function loadFail(){
   if(this.status>0){
    if(this.status===404){
     disableNode(xhr.node,"This directory is not accessible");
    }else alert("HTTP error code "+this.status+(this.statustext?"\n"+this.statustext:""));
   }else if(this.blocked){
    alert("Local XMLHTTPRequest is disallowed by web browser.");
   }else alert("Connection failed.");
  }
  function get(path,onsuccess,node){
   if(xhr.blocked){
    alert("Local XMLHTTPRequest is disallowed by web browser.\nPlease reload this page if the web browser setting has been changed.");
    return;
   }
   xhr.node=node;xhr.Request(path,onsuccess,loadFail,timedOut);showLoadingScreen();
  }

  //******************************UI handlers
  function optionClick(ev){
   ev=ev.target;
   var i=parseInt(ev.attributes["idx"].value);
   if(ev.className){
    styleCols[i].display="none";ev.className="";
   }else{
    styleCols[i].display="";ev.className="down";
   }
  }
  function treeNodeButtonClick(ev){
   var a=ev.target,b;
   if(!a.textContent)return;
   if(a.treeNode.classList.contains("collapsed")||a.treeNode.classList.contains("partial")){//expand/reread
    if(a.treeNode.table){//table already loaded
     if(a.treeNode.childElementCount>2){//has child nodes
      a.textContent="-";a.treeNode.classList.remove("collapsed");
     }
    }else{//table not yet loaded
     get(a.treeNode.label.path,function(doc){
      processDocument(a.treeNode,doc);
     },a.treeNode);
    }
   }else{//collapse
    a.textContent="+";a.treeNode.classList.add("collapsed");b=treeNodeSelected;
    while(b.id===""){//only update selection if it's a children of clicked node
     if(b===a.treeNode){
      treeNodeSelect(a.treeNode,true);break;
     }
     b=b.parentNode;
    }
   }
  }
  function treeNodeSelect(treeNode,dontScroll){
   function fmtnum(n){
    var a=n.toString(),b=a.length-3;
    while(b>0){
     a=a.substr(0,b)+","+a.substr(b,999);b=b-3;
    }
    return a;
   }
   function useTable(){
    var cl,ot;
    list.replaceChild(treeNode.table,table);table=treeNode.table;rows=table.rows;list.scrollTop=0;
    if(treeNodeSelected)treeNodeSelected.classList.remove("selected");
    treeNodeSelected=treeNode;treeNode.classList.add("selected");
    if(!dontScroll){//make tree node selection visible
     if(treeNodeSelected.offsetTop<tree.scrollTop){//partial/off-view above
      tree.scrollTop=treeNodeSelected.offsetTop;
     }else if((treeNodeSelected.offsetTop+20)>(tree.scrollTop+tree.clientHeight)){//partial/off-view below
      tree.scrollTop=(treeNodeSelected.offsetTop+20)-tree.clientHeight;
     }
    }
    document.title="Index of "+treeNode.label.title;
    header.textContent=document.title;header.title=header.textContent;path=treeNode.label.path;
    stats.textContent=fmtnum(table.dirs)+" director"+(table.dirs>1?"ies":"y")+", "+fmtnum(table.files)+" file"+(table.files>1?"s":"");
   }
   if((treeNode.id==="tree")||treeNode.classList.contains("selected"))return;
   if(treeNode.table){//table already loaded
    useTable();
   }else{//table not yet loaded
    get(treeNode.label.path,function(doc){
     if(processDocument(treeNode,doc)){
      treeNode.classList.remove("partial");useTable();
     }
    },treeNode);
   }
  }
  function treeNodeLabelClick(ev){
   treeNodeSelect(ev.target.treeNode);
  }
  function tableLabelClick(ev){
   ev.stopPropagation();ev.preventDefault();ev=ev.target;
   if(!ev.treeNode.tableRow)ev.treeNode.tableRow=ev.parentNode.parentNode;
   treeNodeSelect(ev.treeNode);
  }

  //******************************initialization
  if(!(/^index of \//i).test(document.title)) return;
  //add initial CSS
  a=document.createElement("STYLE");a.id="explorerStyle";
  a.textContent="\
#busyScreen{position:fixed;left:0;top:0;right:0;bottom:0;opacity:0;background:#000}\
#busyText{position:fixed;left:40%;right:40%;top:40%;padding:1em 0;background:#000;text-align:center;color:#ff0;font-size:24pt;font-weight:bold}\
";
  document.head.appendChild(a);showLoadingScreen();
  setTimeout(function(){
   //create table container (the scroller)
   list=document.createElement("DIV");list.id="list";
   //get document info
   if(!getDocInfo(document)){
    showErrorScreen("Directory list format is not supported");return;
   }
   //get server info in background
   xhrbg.Request("/",function(){
    var a=this.getResponseHeader("Server"),b=this.getResponseHeader("X-Powered-By"),c=info.textContent;
    if(a){
     a=a.trim();
     if(c.indexOf(a)>=0) a="";
    }else a="";
    if(b){
     b=b.trim();
     if(c.indexOf(b)>=0) b="";
    }else b="";
    a+=a?(b?"; "+b:""):b;
    if(a){
     if(c){c+=(c?" ":"")+"["+a+"]";
     }else c=a;
    }
    info.textContent=c;info.title=info.textContent;
   },null,null,"HEAD");
   //remove all external styles
   a=document.head.children;
   for(b=a.length-1;b>=0;b--){
    if((a[b].tagName=="LINK")&&(a[b].rel.toLowerCase()==="stylesheet")){
     document.head.removeChild(a[b]);
    }
   }
   //remove all original styles
   a=document.styleSheets;
   for(b=a.length-2;b>=0;b--){
    a[b].ownerNode.parentNode.removeChild(a[b].ownerNode);
   }
   //add remaining CSS
   a=a[0].ownerNode;
   a.textContent="\
body{margin:0;height:100%;background:#fff;font-size:16px}\
#header{position:fixed;left:2px;top:2px;right:2px;margin:0;overflow:hidden;background:#ccc;padding:0 2px;font-size:16px;white-space:nowrap;text-overflow:ellipsis}\
#options{position:fixed;right:2px;top:2px}\
#options span{display:inline-block;margin-left:4px;border:1px outset#fff;padding:0 3px;line-height:15px;cursor:pointer;background:#d0d0d0}\
#options span.down{border:1px inset#fff;background:#00d000}\
#options span:hover{color:#fff}\
#list{position:fixed;left:30%;top:22px;right:2px;bottom:20px;margin-left:7px;border:1px solid;overflow-y:auto}\
#table{width:100%}\
#table tr:nth-child(2n+1){background:#eee}\
#table tr:first-child{background:#ccc}\
#table tr:first-child~tr:hover{background:#ddf}\
#table th:nth-child(3),#table th:nth-child(4){white-space:nowrap}\
#table td:first-child{width:20px;vertical-align:middle}\
#table td:nth-child(2){word-wrap:break-word}\
#table td:nth-child(3),#table td:nth-child(4){text-align:right;white-space:nowrap;font-family:monospace;font-size:13px}\
#table td:nth-child(3){width:23ex}\
#table td:nth-child(4){width:5ex}\
#table img{width:20px;height:22px}\
#tree{position:fixed;left:2px;top:22px;bottom:20px;border:1px solid;width:30%;overflow:auto;background:#eee}\
#tree div{margin:0px 0px 0px 15px;white-space:nowrap}\
#tree .collapsed{height:20px}\
#tree .collapsed>div{display:none}\
#tree span{display:inline-block}\
#tree .button{width:12px;height:12px;overflow:hidden;background:#999;color:#fff;text-align:center;font-size:17px;line-height:10px;font-weight:bold}\
#tree .button,#tree .label{cursor:pointer}\
#tree .partial>.button{font-size:13px}\
#tree .button+span{margin-top:2px;width:2px;padding:0 0 1px 0;visibility:hidden}\
#tree .label{position:absolute;margin-top:2px;padding:0 2px 1px 2px}\
#tree .label:hover{background:#ddf}\
#tree .selected>.label{background:#00b;color:#fff}\
#footer {position:fixed;left:2px;right:2px;bottom:2px;background:#ccc;font-size:14px}\
#info {position:fixed;left:4px;right:26%;margin-right:3ex;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\
#stats {float:right;margin-right:2px;width:26%;text-align:right}\
"+a.textContent+"\
#table th:nth-child(3),#table td:nth-child(3){"+(showDate?"":"display:none")+"}\
#table th:nth-child(4),#table td:nth-child(4){"+(showSize?"":"display:none")+"}\
#table th:nth-child(5),#table td:nth-child(5){"+(showDescType?"":"display:none")+"}\
";
   header.style.right=(options.offsetWidth+2)+"px";b=document.styleSheets[0].cssRules;
   styleCols.push(b[b.length-3].style);styleCols.push(b[b.length-2].style);styleCols.push(b[b.length-1].style);
   //init tree
   a=path.substr(1,path.length).split("/");c=tree.appendChild(makeTreeNode("/","/ (root)",0,false,true));
   if(a.length&&a[a.length-1])a.splice(a.length-1,1);
   for(b=0;b<a.length;b++){
    if(!a[b])break;
    d="/";
    for(e=0;e<=b;e++)d+=a[e]+"/";
    c=c.appendChild(makeTreeNode(d,"",b+1,false,true));
   }
   c.button.textContent="-";c.button.title="";c.classList.remove("partial");c.table=table;table.treeNode=c;
   updateTree(table,d||"/",c,b+1);treeNodeSelect(c);ready=true;showBusyScreen(false);
   if(onerror===jsErrorHandler) onerror=olderr;
  });
 }

 addEventListener("DOMContentLoaded",init,false);
})();
