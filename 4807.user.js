// ==UserScript==
// @name          Torrentspy Cleaner Delux
// @author        Alien_scum
// @include    http://torrentspy.com/*
// @include    http://*.torrentspy.com/*
// @include    http://ts.searching.com/*
// @description    Cleans up Torrentspy.com by removing extraneous visual elements widens search results and add google style did you mean to search
// ==/UserScript==

function al(s){if(window==window.top) {GM_log(s);alert(s);}};

function $x(xpath) { 
  xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2//$3').replace(/([^.])\.([\w-]*)/g,'$1[@class="$2"]').replace(/#([\w-]*)/g,'[@id="$1"]').replace(/\/\[/g,'/*[');
  //al(xpath);
  var got=document.evaluate(xpath,document,null,null,null), result=[];
  while(next=got.iterateNext()) result.push(next);
  return result;
}

function $(x){return $x(x)[0]}

//do something for every result of an xpath
function forall(xpath,f) { 
  var results=document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i=0; i<results.snapshotLength; i++) f(results.snapshotItem(i));
}

//remove dom element;
function del(node) {if (node) node.parentNode.removeChild(node);}

// firefox creates alot of random useless empty text nodes;
// i get rid of them (mostly as a result of lazy coding)
forall("//text()",function(node){ if(!/[^\n\r\t\v]/.test(node.nodeValue)) del(node);});

//get rid of alot of the ads right here
del($("#fiSearchForm"));
del($("#col-right"));

$x("//div[starts-with(@class,'adspace')] | .list/tbody/tr[count(child::td)=1] | //td/a[@target='_new'] | .content/iframe | .content/p/iframe | #search/div/a/img | #shirts | #jobs").forEach(del);

if($(".f_button")) $(".f_button").setAttribute('src',"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAZCAMAAAB5GOwQAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAwUExURViQx8XFxXKdzV+TyXCczWWYy/n5+ePj42qZy9LS0v39/fDw8DmQvTqSwDBynTqRvz8qRPkAAAELSURBVHjajJQBkoMgDEVjqEBCCPe/7X5QWztdlTcjRHgwEAVS1TgJVIIt2R8JUrpPGtmdN158CTl3n2L0/Joge4JPmDxP4Qyfood1itCnp+LhGyw0H8FXh0sq0OkMC9KlC4KCuvCp6z+9qPQRa9iCEn70Zg2MorFGaoS8IUBbVG5vdt1OsIqNNPfATJQ/fRd6X/06p6+q1QwfGz8H1ofgVsd8iRlWk7FVsXu9LUk1SbXGUeOC7f7oW17sXB982q2d9Hcmr9lnZ9/fa39qr49oBHtRPQ89uUG4Y/SaL5uO41EfMaehx5IkPB8+4m7HridZJpA09OFPkMbhw7VRMOCZMo62Dn+GfnH8CTAA/7UoGJPQ7ZUAAAAASUVORK5CYII=");

if($('form')) $('form').setAttribute('method','get');

var url=window.location.href;

//home page needs extra work so check for it
if (window.location=="http://www.torrentspy.com/" | window.location=="http://www.torrentspy.com/default.asp" | window.location=="http://torrentspy.com" | window.location=="http://torrentspy.com/default.asp" ) {
  GM_addStyle("#page {min-height: 100px ! important; height: 205px ! important;}");
  GM_addStyle("body {background-position: 50% 90px; !important}");
  GM_addStyle("#page {background-position: 50% -10px ! important;}");
  GM_addStyle("#footer {width: 950px; height: 29px; left: +6px; background-position: -6px 0px; position:absolute; top:205px ! important;}");
  GM_addStyle("#container {background: none !important;}");
  GM_addStyle(".content {visibility: hidden !important;}");
  GM_addStyle("#search {margin-left: 150px !important;}");
  GM_addStyle("#topper {background: #406EA1; width 100%; height:100px;}");
  
  document.body.insertBefore(document.createElement('div'),document.body.firstChild).id='topper'
  
  $x(".ShoutFrameBody | .sub-cols | //div[starts-with(@class,'sw')] | .content").forEach(del);

} else { //the other pages aslo need work

  GM_addStyle("body {background-position: 50% -10px ! important;}");
  GM_addStyle("#page, #container{background-position: 50% -10px ! important;}");
  GM_addStyle("#search {margin-left: 80px !important;}");
  GM_addStyle(".content table.list {width: 900px ! important;}");
  GM_addStyle(".content table.details {width: 900px ! important;}");
  GM_addStyle(".content table.file {width: 900px ! important;}");
  GM_addStyle(".content {margin-bottom: -45px ! important;}");
  GM_addStyle("#prefs {position:absolute; left:765px; width: 100 px; top: 215px; font-size: 16px;}");

  //link images to directly to torrents
  $x(".list//a[img]").forEach(function(im) {im.href = im.href.replace(/\/torrent\/([^\/]+)\/.*$/, "/download.asp?id=$1");});
  

//some stuff only for search result
//  remove ugly web search box
//  google "did you mean?"
//  lengthen names and cat from rss


  if (url.indexOf("http://www.torrentspy.com/search")>-1) {
    var td = $("td");
    if (td) {
      tr=td.parentNode;
      rss=tr.childNodes[0].childNodes[6];
      td=tr.childNodes[1];
      //alert(escape(tr.childNodes[2].nodeValue));
      td.replaceChild(rss,td.childNodes[0]);
      del(tr.childNodes[0].childNodes[3]);
      del(tr.childNodes[0].childNodes[3]);
      del(tr.childNodes[0].childNodes[3]);
    }
    var dls = $("table");
    var dig = $(".content/h2");
    dig.parentNode.replaceChild(dls,dig);
    
    query=url.slice(url.indexOf('query')+6);
    p=query.indexOf('&');
    if(p>-1) query=query.slice(0,p);
    
    GM_xmlhttpRequest({
      method: 'get',
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Content-type': 'application/x-www-form-urlencoded'
      },
      url: 'http://www.google.com/search?q='+query,
      onload:function(result) {
        var dym = result.responseText;
        p=dym.indexOf('<font color=#cc0000 class=p>Did you mean: </font>');
        if (p>-1){
          dym = dym.slice(p);
          dym = dym.slice(0,dym.indexOf('</a>'));
          tar = dym.slice(dym.indexOf('q=')+2);
          tar = tar.slice(0,tar.indexOf('&'));
          beg = dym.slice(0,dym.indexOf('href')+5);
          end = dym.slice(dym.indexOf('href'));
          end = end.slice(end.indexOf(' class'));
      
          dym = beg+'/search?query='+tar+end;
    
          var logo = document.createElement("div");
          logo.innerHTML = dym;
          var dls = $("#search");
          if (dls) dls.appendChild(logo);
      }
      }
  });

  //forall('//table[@class="list"]//tr[2]',del);
  // fill up the wider table using mouse over

  var title;
  var cat;
  var sp;
  var names = $x("//td/a/font/b");
  var cats2 = $x("//tr/td[2]/a[2]");
  for (var i = 0; (name=names[i])&&(cat2=cats2[i]); i++) {
    title = name.parentNode.parentNode.title;;
    cat=cat2.title;
    //hide all fake torrents
    if (/x_fake/.test(cat)) {
      del(cat2.parentNode.parentNode);
    } else {
      if (cat.length>25) cat=cat.slice(0,25)+'...';
      if (title.length>60) title=title.slice(0,60)+'...';
      name.innerHTML=title;
      cat2.innerHTML=cat;
    }
  }
   alt=0; //fix alternating colours
   $x(".list/*/tr").forEach(function(tr){tr.setAttribute('class',alt?'alt':'');alt=1-alt;});
   }; //end of search only stuff;

  //change profile page
   if (url.indexOf("/profile.asp")>-1) {
     del($("#AutoNumber1//hr"));

     $x(".list/tbody/tr/td/a/font").forEach(function(lnk) {
       lnk=lnk.parentNode;
       ed=lnk.cloneNode(true);
       ed.innerHTML='edit';
       lnk.parentNode.insertBefore(ed,lnk.previousSibling.previousSibling);
       lnk.href = lnk.href.replace(/profile.asp\?mode=edittorrent&id=/, "torrent/")+'/';
     });
   };
//back to normal stuff for whole site

  function makeSelect(name, opts, current) {  
    var sel = document.createElement("select");
    sel.setAttribute("name", name);
    sel.setAttribute("style", "font-size: 9px");
    sel.setAttribute("style","width: 170px");
    var inner = "";
  
    for (var i = 1; i < opts.length; i++) {
      var op = opts[i].replace("Yes", 1).replace("No", 0);
      inner += "<option value=" + op + (op == current ? " selected" : "") + ">" + opts[0] + ": " + opts[i] + "</option>";
    }
    sel.innerHTML = inner;
    sel.addEventListener("change", function(e) {
      var cookie = document.cookie.match(/preferences=([^;]+)/)[1];
      cookie = cookie.replace(new RegExp("(" + e.target.name + "=)[^&]+"), "$1" + e.target.options[e.target.selectedIndex].value);
      document.cookie = "preferences=" + cookie;
      GM_xmlhttpRequest({
      method: 'POST', 
          url: 'http://www.torrentspy.com/preferences.asp', 
        headers: {'Content-type' : 'application/x-www-form-urlencoded'},
        data: cookie + "&submit=Submit%20Preferences",
        onload : function(r) { window.location.reload(); }
      });
    }, true);
    return sel;
  }

  var selects = ["pagesize", "sortby", "seederexcl", "detailed"];
  var values =  [
      ["Result Size", "50", "100", "200                    "], 
      ["Sort by", "Name", "Date", "Category", "Seeders", "Downloaders"],
      ["Exclude Dead", "No", "Yes"],
      ["2 Line Result", "No", "Yes"]
          ];

  var cookies = document.cookie.match(/preferences=([^;]+)/);
  if (cookies == null) {
    cookies = "pagesize=50&sortby=Name&seederexcl=0&detailed=0";
    document.cookie = "preferences=" + cookies;
  } else {
    cookies = cookies[1];
  };

  var logo = document.createElement("div");
  logo.id='prefs';
  logo.innerHTML = '<b>Preferences</b> <p>';

  for (var j = 0; j < 4 ; j++) {
    logo.appendChild(makeSelect(selects[j], values[j], cookies.match(selects[j] + "=([^&]+)")[1]));
  }

  targ= document.getElementById('search-nav');
  if (targ) {
      targ.parentNode.insertBefore(logo, targ);
  }

  
  $x(".meta").forEach(del);
};
