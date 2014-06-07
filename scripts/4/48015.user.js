// ==UserScript==
// @name          vwClanlister
// @namespace     facebook
// @description   See a single list of all your clan members
// @version       0.2
// @include       http://apps.facebook.com/vampiresgame/*
// @include       http://apps.new.facebook.com/vampiresgame/*
// ==/UserScript==

// Script details for use within the script
var SCRIPT = {
	url: 'http://userscripts.org/scripts/show/48015',
	version: '0.2',
	name: 'vampiresgame',
	appID: 'app25287267406',
	presentationurl: 'http://userscripts.org/scripts/show/48015'
};

// v0.1: initial release (02/05/2009)
// v0.2: bug fixes       (30/05/2009 @ 2am)
//  FIX: will now display all clan members regardless of page count
//  FIX: faster searching
//  ADD: now shows the page number being loaded in the title bar (progress)
//  ADD: sorting of columns (Vamp Name/Real Name/Level) [Level still needs some work]
//  ADD: will now load the level and Vamp type once the list is completely loaded (Thanx for the request Krista)

document.getElementsByPartialAttribute = function(attr,cl) {
  var retnode = [];
  var myAttReg = new RegExp(cl);
  var elem = this.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
    var atts = elem[i].getAttribute(attr);
    if (myAttReg.test(atts)) retnode.push(elem[i]);
  }
  return retnode;
};

function member(name,vampname,picurl,gifturl,userid,giftimg) {
  this.name = name;
  this.vampname = vampname;
  this.picurl = picurl;
  this.gifturl = gifturl;
  this.uid = userid;
  this.vwurl = 'http://apps.facebook.com/vampiresgame/stats.php?user='+userid;
  this.fburl = 'http://www.facebook.com/profile.php?id='+userid;
  this.giftimg = giftimg;
  this.level = null;
  this.ajax = null;
}
function retStats(){
  this.level = null;
  this.skill = null;
  this.won = null;
  this.lost = null;
}

var sortorder = null;
var clanMembers = new Array();
if(location.href.indexOf(SCRIPT.name+'/group.php')!=-1){readList();}

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars(custom) {
  var vars=[],hash;var url;
  if(custom!=null){url=custom;}else{url=window.location.href;}
  var hashes=url.slice(url.indexOf('?')+1).split('&');
  for(var i=0;i<hashes.length;i++){
      hash=hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]]=hash[1];
  }
  return vars;
}

var parentDiv;
var divHeight;
var uList;
var br;
function readList() {
  // We only want to continue on the right pages...
  if(location.href.indexOf(SCRIPT.name+'/group.php')==-1){return;}
  window.name="ClanLister";
  var hvars=getUrlVars();
  var rex='/group.php.*?([0-9]{1,})';
  var links=document.getElementsByPartialAttribute('href',rex);
  var nextP;
  for (var i=0;i<links.length;i++){
    if((links[i].innerHTML.indexOf('Next') != -1)){
        nextP = links[i];
    }
  }
  if (nextP == null) {
    // We are on the last page, and the Next link, is not actually a link anymore...
    nextP = document.getElementsByPartialAttribute('class','next')[0];
  }

  if ((hvars['pageno'] == null) && (location.href.indexOf(SCRIPT.name+'/group.php') != -1)) {
    // We are on the Group Page, but not the full list. Simply add a link
    var url = 'http://apps.facebook.com/'+SCRIPT.name+'/group.php?pageno=fulllist';
    if (nextP != null) {
      br = nextP.nextSibling;
      var spl = document.createTextNode(' | ');
      nextP.parentNode.insertBefore(spl, nextP.nextSibling);
      var a = document.createElement('a');
      a.href = url;
      a.innerHTML = "Full List";
      spl.parentNode.insertBefore(a, spl.nextSibling);
    }
  } else if ((hvars['pageno'] == 'fulllist') && (location.href.indexOf(SCRIPT.name+'/group.php'))) {
    // We are on the full list page. Do your magic!
    var list = document.getElementsByTagName('ul');
    for (var x = 0; x < list.length; x++) {
      if (list[x].className.indexOf('requests') != -1){
        uList = list[x];
        parentDiv = uList.parentNode;
        break;
      }
    }
    divHeight = uList.parentNode.style.height;
    uList.parentNode.removeChild(uList);

    var span = document.createElement('span');
    span.appendChild(document.createTextNode('Search: '));
    var tb = document.createElement('input');
    tb.type = 'text';
    tb.id = 'searchHighlighting';
    tb.style.width = '100px';
    XBrowserAddHandler(tb,'keyup',function(e) { highlightText(); });
    span.appendChild(tb);
    var noscratch = document.getElementsByPartialAttribute('class','noscratch');
    noscratch[0].parentNode.insertBefore(span,noscratch[0].parentNode.lastChild.previousSibling);
    span.setAttribute('style','padding: 0 10px; position: absolute; right: 0px;')

    var tbl = document.createElement('table');
    tbl.id = "tblClanMembers";
    parentDiv.appendChild(tbl);
    AddHeader();

    readAJAX(1);
  }
}

function GetAJAX(){var xmlHTTP=null;
  try{xmlHTTP=new XMLHttpRequest();}catch(e){
    try{xmlHTTP=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){
      try{xmlHTTP=new ActiveXObject("Microsoft.XMLHTTP");}catch(e){
        alert("Your browser does not support AJAX!");
        return null;
  }}}
  return xmlHTTP;
}

var cDiv;
var cPage;
function readAJAX(tPage) {
  ajax = GetAJAX();
  if(ajax==null){return;}
  if(tPage=='done'){
    // This is where we want to sort the list and add the items to the table
    document.title='Loading Table';
    clanMembers.sort(compare);
    for (var i=0;i<clanMembers.length;i++) {
      var m = clanMembers[i];
      AddRow(m.name,m.vampname,m.picurl,m.gifturl,m.uid,m.giftimg,i);
    }
    var tbl = document.getElementById('tblClanMembers');
    tbl.className = 'requests clearfix';
    tbl.style.height = screen.height * 0.7;
    document.title='Clan Members';
    setTimeout(function() {getStats4Africa();},3000);
    return;
  }
  document.title = "Loading: Page "+tPage;
  var url = 'http://apps.facebook.com/vampiresgame/group.php?page='+tPage;
  if (cDiv == null) { cDiv = document.getElementById('Users'); }
  ajax.onreadystatechange = readStateChange;
  ajax.open("GET", url, true);
  ajax.send(null);
}

function readStateChange() {
  if (ajax.readyState == 4) {
    var retVal = ajax.responseText;
    var p = document.createElement('p');
    p.innerHTML = retVal;
    var spans = p.getElementsByTagName('ul');
    for(var x=0;x<spans.length;x++){
      var atts = spans[x].className;
      if(atts.indexOf('requests')!=-1){
        uList = spans[x];
        parentDiv = uList.parentNode;
        var uname = null;
        var vname = null;
        var uid = null;
        var ilink = null;
        var glink = null;
        var ulink = null;
        var gimg = null;
        if (spans[x].innerHTML != null) {
          var lis = spans[x].getElementsByTagName('li');
          for (var l=0;l<lis.length;l++) {
            var div = lis[l].getElementsByTagName('div');
            if (div.length >= 3) {
              var names = div[0].getElementsByTagName('a')[0].innerHTML.split('<br>aka ');
              uname = names[0];
              vname = names[1];
              ulink = div[0].getElementsByTagName('a')[0].href;
              ilink = div[1].getElementsByTagName('img')[0].src;
              uid = div[1].getElementsByTagName('img')[0].getAttribute('uid');
              glink = div[2].getElementsByTagName('a')[0].href;
              gimg = div[2].getElementsByTagName('img')[0].src;
              if (uid != null) {
                var m = new member(uname,vname,ilink,glink,uid,gimg)
                clanMembers.splice(0,0,m);
              }
            }
          }
        }
      }
    }
    // call the readAJAX function again
    var next; var current;
    var retnode=[];
    var elem = p.getElementsByTagName('span');
    for(var i=0;i<elem.length;i++){
      var atts = elem[i].getAttribute('class');
      if (atts=='next'){
        next=elem[i];
      }
      if (atts=='current'){
        current=elem[i];
      }
    }
    if(next==null){
      var cpage=current.innerHTML;
      var re = new RegExp("&nbsp;","g");
      cpage=parseInt(cpage.replace(re,""));
      cpage++;
      //if(cpage==2){cpage='done';}
      readAJAX(cpage);
    }else{readAJAX('done');}
  }
}

function AddHeader() {
  var tbl = document.getElementById('tblClanMembers');
  tbl.style.cellSpacing = "0";
  var tr = document.createElement('tr');
  var th;

  tr.setAttribute('style','background:#400;borderBottom:1px solid #FFF;');

  // Index
  th = document.createElement('th');
  th.innerHTML = "#";
  tr.appendChild(th);

  // Image
  th = document.createElement('th');
  th.innerHTML = "Pic";
  tr.appendChild(th);

  // Vamp name
  th = document.createElement('th');
  th.innerHTML = '<a href="#" title="Sort by Vamp Name">Vamp Name</a>';
  XBrowserAddHandler(th,'click', function(e) {sortTable('vamp');});
  tr.appendChild(th);

  // Real Name
  th = document.createElement('th');
  th.innerHTML = '<a href="#" title="Sort by Real Name">Real Name</a>';
  XBrowserAddHandler(th,'click', function(e) {sortTable('name');});
  tr.appendChild(th);

  // Gift
  th = document.createElement('th');
  th.innerHTML = "Gift!";
  tr.appendChild(th);

  // Stats
  th = document.createElement('th');
  th.innerHTML = '<a href="#" title="Sort by Level">Stats</a>';
  XBrowserAddHandler(th,'click', function(e) {sortTable('stats');});
  tr.appendChild(th);

  tbl.appendChild(tr);
}

function AddRow(realname,vampname,imgurl,gifturl,userid,giftimg,rownumber,level) {
  var tbl = document.getElementById('tblClanMembers');
  var lastRow = tbl.rows.length;
  // if there's no header row in the table, then iteration = lastRow + 1
  var iteration = lastRow + 1;
  var row = tbl.insertRow(lastRow);
  row.id = 'tr' + rownumber;


  // Index
  var cellVamp = row.insertCell(0);
  cellVamp.style.width="5%";
  var c = document.createTextNode(lastRow);
  cellVamp.appendChild(c);

  // Img URL
  var cellIMG = row.insertCell(1);
  cellIMG.style.width="40px";
  var img = document.createElement('img');
  img.src = imgurl;
  img.style.height = '35px';
  img.style.width = '35px';
  cellIMG.appendChild(img);

  // Vamp Name
  var cellVamp = row.insertCell(2);
  cellVamp.style.width="25%";
  var a = document.createElement('a');
  a.href = 'http://apps.facebook.com/vampiresgame/stats.php?user='+userid;
  a.innerHTML = vampname;
  cellVamp.appendChild(a);

  // Real Name cell
  var cellName = row.insertCell(3);
  var a = document.createElement('a');
  a.href = 'http://www.facebook.com/profile.php?id='+userid;
  a.innerHTML = realname;
  cellName.appendChild(a);

  // Gift URL
  var cellGift = row.insertCell(4);
  cellGift.style.width="10%";
  var a = document.createElement('a');
  a.href = gifturl;
  var img = '<img src="'+giftimg+'" />';
  a.innerHTML = img;
  cellGift.appendChild(a);

  //Stats
  var cellStats = row.insertCell(5);
  cellStats.id = 'user_stats_cell'+userid;
  cellStats.style.width="15%";
  if(level==null){
    var a = document.createTextNode('loading...');
  }else{
    var a = document.createTextNode(level);
  }
  cellStats.appendChild(a);
};

function getStats4Africa() {
  for(var i=0;i<clanMembers.length;i++){
    getStats(clanMembers[i]);
  }
}

function getStats(cmObj) {
  // Loads the Stats page for the specified user, and displays the results
  // Main Stats URL       http://apps.facebook.com/vampiresgame/stats.php?user=uid
  // Offensive Stats URL: http://apps.facebook.com/vampiresgame/stats.php?stattab=offense&user=uid
  // Defensive Stats URL: http://apps.facebook.com/vampiresgame/stats.php?stattab=defense&user=uid
  // Movement  Stats URL: http://apps.facebook.com/vampiresgame/stats.php?stattab=movement&user=uid
  var url = 'http://apps.facebook.com/vampiresgame/stats.php?user='+cmObj.uid;
  cmObj.ajaxObj = GetAJAX();
  if(cmObj.ajaxObj==null){return;}
  cmObj.ajaxObj.onreadystatechange = function statsRead() {
    if (cmObj.ajaxObj.readyState == 4) {
      var retVal = cmObj.ajaxObj.responseText;
      var p = document.createElement('p');
      p.innerHTML = retVal;
      var stats = '&nbsp;';

      var elem = p.getElementsByTagName('span');
      for(var i=0;i<elem.length;i++){
        var atts = elem[i].getAttribute('class');
        if (atts=='name'){
          stats = elem[i].parentNode.nextSibling.textContent;
          stats = stats.replace('", level ','');
          document.getElementById('user_stats_cell'+cmObj.uid).innerHTML = stats;
          cmObj.level = stats;
        }
      }
    }
  };
  cmObj.ajaxObj.open("GET", url, true);
  cmObj.ajaxObj.send(null);
}


function XBrowserAddHandler(target,eventName,handlerName) {
    if ( target.addEventListener ) {
      target.addEventListener(eventName, handlerName, false);
    } else if ( target.attachEvent ) {
      target.attachEvent("on" + eventName, handlerName);
    } else {
      target["on" + eventName] = handlerName;
    }
}

function highlightText() {
  var tbl = document.getElementById('tblClanMembers');
  if (tbl == null) return;

  var tb = document.getElementById('searchHighlighting');
  var scrolled = false;
  var searchText = tb.value;
  var trs = tbl.getElementsByTagName('tr');
  for (var r=0;r<trs.length;r++) {
    trs[r].bgColor = '';
  }

  for (var r=0;r<clanMembers.length;r++) {
    var m = clanMembers[r].name+' '+clanMembers[r].vampname+' '+clanMembers[r].uid;

    if((m.toLowerCase().indexOf(searchText.toLowerCase())!=-1)&&(searchText!="")) {
      // Highlight Row
      document.getElementById('tr'+r).bgColor = '#400';
      if (scrolled == false) {
        scrolled = true;
        trs[r].scrollIntoView();
        tb.scrollIntoView();
      }
    }
  }
}

//*****************************************************************************
// Function to be used for Array sorting
//*****************************************************************************
function compare(a, b) {
  var col1;
  var col2;
  if(sortorder==null||sortorder=='vamp') {
    col1=a.vampname;
    col2=b.vampname;
  }else if(sortorder=='name'){
    col1=a.name;
    col2=b.name;
  }else if(sortorder=='stats'){
    if(a.level==null){a.level='0 0';}
    if(b.level==null){b.level='0 0';}
    col1=a.level.substring(0,a.level.indexOf(' '));
    col2=b.level.substring(0,b.level.indexOf(' '));
  }
	if (col1.toLowerCase() < col2.toLowerCase()) {
    return -1;
	} else {
    return 1;
  }
	return 0;
};
function sortTable(col){
  clearTable();
  sortorder=col;
  clanMembers.sort(compare);
  for (var i=0;i<clanMembers.length;i++) {
    var m = clanMembers[i];
    AddRow(m.name,m.vampname,m.picurl,m.gifturl,m.uid,m.giftimg,i,m.level);
  }
}
function clearTable() {
  var tbl = document.getElementById('tblClanMembers');
  if (tbl == null) return;
  for(var i=tbl.rows.length-1;i>0;i--){
    tbl.deleteRow(i);
  }
}
