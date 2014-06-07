// ==UserScript==
// @name          Scrapbook Searcher - Orkut Search tool for Scrapbooks & Communities
// @namespace     http://sequence-points.blogspot.com
// @description	  Searches through orkut scrapbooks,community messages and community threads for strings,user names and dates
// @include       http://www.orkut.com/*
// @author        Ramprabhu
// ==/UserScript==

var remdiv = ' function RemoveAllRows() {';
remdiv+='   var prev = -1,main;';
remdiv+='    var trTags = parent.frames[0].document.getElementsByTagName(\'tr\');';
remdiv+='    for(var i = 0;i < trTags.length;i++) {';
remdiv+='     if(trTags[i].hasAttribute(\'class\') && trTags[i].getAttribute(\'class\').match(/row/))';
remdiv+='     { ';
remdiv+='      if(trTags[i].getElementsByTagName(\'div\')[0]) {main = trTags[i].parentNode; }';
remdiv+='         trTags[i].parentNode.removeChild(trTags[i]); i--;';
remdiv+='      } ';
remdiv+='    } ';
remdiv+='    n = parent.frames[0].document.createElement(\'tr\'); ';
remdiv+='    n.innerHTML = \'<d><div><z></z></div></d>\'; ';
remdiv+='    n.setAttribute(\'class\',\'row\'); main.appendChild(n);';
remdiv+=' } ';

var movediv = ' function MoveRows() { ';
movediv +='    var frdoc = parent.frames[0].document;';
movediv +='    var cdoc = parent.frames[1].document;';
movediv +='    var trTags = frdoc.getElementsByTagName(\'tr\');';
movediv +='    var lastpar = null;';
movediv +='    for(var i = 0;i<trTags.length;i++) {';
movediv +='      if(trTags[i].hasAttribute(\'class\') && trTags[i].getAttribute(\'class\').match(/row/) && trTags[i].getElementsByTagName(\'div\')[0])';
movediv +='      {';
movediv +='        lastpar = trTags[i]; ';
movediv +='      }';
movediv +='    }';
movediv +='    trTags = cdoc.getElementsByTagName(\'tr\'); ';
movediv +='    for(var i = 0;i<trTags.length;i++) {';
movediv +='      if(trTags[i].hasAttribute(\'class\') && trTags[i].getAttribute(\'class\').match(/row/) && trTags[i].getElementsByTagName(\'div\')[0])';
movediv +='      {';
movediv +='          ent = trTags[i].cloneNode(true);';
movediv +='          lastpar.parentNode.appendChild(ent);';
movediv +='          trTags[i].parentNode.removeChild(trTags[i]);';
movediv +='          lastpar = ent;';
movediv +='       }';
movediv +='    }';
movediv +=' }';

window.addEventListener("unload",function(e){
  if(parent.name.indexOf('ScrpSrchMagicBabe') >= 0 && window.name == 'maindisp' && parent.name.indexOf('reload') == -1) {
      parent.name = 'killed' + parent.name;
  }
}
,false);

CommMsgs = 0;
Scrapbook = 0;
CommTopics = 0;

ScrapbookSearcher();

function ScrapbookSearcher() {


stopSearch = 0;
nextref = "";

buttonname = '';

if(document.location.href.indexOf('Scrapbook.aspx') >= 0) { Scrapbook = 1; buttonname = 'Search Scrapbook';}
else if(document.location.href.indexOf('CommTopics.aspx') >=0) { CommTopics = 1; buttonname = 'Search Threads';}
else if(document.location.href.indexOf('CommMsgs.aspx') >= 0) { CommMsgs = 1; buttonname = 'Search Messages';}
else { return;}

if(parent.name.indexOf('killed') != -1 ) { stopSearch = 1; }

AddSearchBox();

if(stopSearch == 1){ return; }

trTags=document.getElementsByTagName('tr');


if(parent.name.indexOf('reload') >= 0){ parent.name = parent.name.split('reload')[1];}

if(window.name.indexOf('ScrpSrchMagicBabe') >= 0) {

  var src = '';
  if(document.location.href.match(/(.*)pageSize=(\d+)(.*)/)) {
     src = RegExp.$1 + 'pageSize=30' + RegExp.$3;
  }
  else {
    src = document.location.href + '&na=&nst=&nid=&pageSize=30';
  }

  frms = document.createElement('frameset');
  var strFrs =  '<frameset rows="100%,*"><frame name="maindisp" src=\''+ src +'\' scrollbar=no>';
      strFrs += '<frame name="cache" src="" noresize></frameset>';
  frms.innerHTML = strFrs;
  document.getElementsByTagName('html')[0].insertBefore(frms,document.body);
  document.getElementsByTagName('html')[0].removeChild(document.body);
  window.name = 'firstload' + window.name;
  window.frames[0].document.location.href = src;

  return;


}

if(parent.name.indexOf('ScrpSrchMagicBabe') >=0 ) {

  form = document.getElementsByTagName('form');
  for(var i = 0;i< form.length;i++) {
    if(form[i].innerHTML.match(/(.+)preview(.+)/)) { form[i].parentNode.removeChild(form[i]) }
  }
}

if(parent.name.indexOf('firstload') >=0 ) {


    var paren,node = null;;
    for(var i = 0;i < trTags.length;i++) {
     if(trTags[i].hasAttribute('class') && trTags[i].getAttribute('class').match(/row/))
      {
            paren = trTags[i].parentNode;
            break;
       }
    }


   var anc = document.getElementsByTagName('a');
   for(var j = 0;j < anc.length;j++) {
      if(anc[j].textContent.match(/(first|last|next|previous)/i)) {
          anc[j].parentNode.removeChild(anc[j]);
          j = j - 1;
       }
   }

   var children = paren.childNodes;
   var lastchild = null;

   for(var i = 0;i < children.length;i++) {
      if(!children[i].innerHTML){continue;}

      lastchild = children[i];

      if(children[i].innerHTML.match(/delete(.*)selected(.*)/i)){
          if(children[i].innerHTML.indexOf('changePageSize') >=0) {
              var sel = children[i].getElementsByTagName('select');
              if(sel[0].nextSibling != null) { lastchild = sel[0].nextSibling; }
              sel[0].parentNode.removeChild(sel[0]);
              i = i - 1;
          }
          continue;
      }
      if(children[i].innerHTML.match(/Select(.*)All(.*)/i)){
         continue;
      }


      if(children[i].nodeName == 'TR' || children.nodeName == 'tr') {
         if(children[i].hasAttribute('class') && children[i].getAttribute('class').match(/row/))
         {
            if(children[i].nextSibling != null ) {
               lastchild = children[i].nextSibling;
            }
            if( Scrapbook == 1) {
                children[i].parentNode.removeChild(children[i].nextSibling.nextSibling);
                children[i].parentNode.removeChild(children[i]);

                i = i - 2;
            }
            else {
                children[i].parentNode.removeChild(children[i]);
                i = i - 1;
            }
         }
      }

    }

    node = document.createElement('tr');
    node.innerHTML = '<d><div><z></z></div></d>';
    node.setAttribute('class','row');
    paren.insertBefore(node,lastchild);

    magicnext = document.createElement('magicnext');
    magicnext.setAttribute('id','magicnextId');
    magicnext.setAttribute('style','display:none');
    document.body.appendChild(magicnext);

    parent.name = parent.name.split('firstload')[1];
    parent.frames[1].document.location.href = document.location.href;
    return;
}

user = 0,dateq = 0;
userN = "",dates = 0;

ret = SearchParse();

if( ret == 2)
{
    AddSearchOver();
    return ;

}

if(ret == 4) { return; }

l = 0;
trTags = document.getElementsByTagName('tr');
for(i = 0;i<trTags.length;i++) {
  if(trTags[i].hasAttribute('class') && trTags[i].getAttribute('class').match(/row/))
  {
    l++;
  }
}


anc = document.getElementsByTagName('a');
for(var i = 0;i<anc.length;i++) {

  if(anc[i].textContent.indexOf('next') >= 0) {
     nextref = anc[i].href;

  }
}


if(nextref.length) {
if(nextref.match(/pageSize/) == null) {
    nextref += '&pageSize=30';
}
else if( nextref.match(/(.*)pageSize=(\d+)(.*)/) == null ) {
    nextref = RegExp.$1 + '&pageSize=30' + RegExp.$3;
}
}


if(window.name == 'cache')
{


  // Race Condition!!! If change occurs after the GetElementById in previous instance
  // magicnext will not change so on resume this page is reloaded!!!!
  ChangeDocLocationtoNext(null);

  frdoc = parent.frames[0].document;
  tTags = frdoc.getElementsByTagName('tr');
  var m = 0;
  var lastpar = null;

  magicnext = frdoc.getElementById('magicnextId');
  if(magicnext) {
    magicnext.textContent = nextref;
  }

  for(i = 0;i<tTags.length;i++) {
   if(tTags[i].hasAttribute('class') && tTags[i].getAttribute('class').match(/row/))
   {
      if(Scrapbook == 1) {
          if(!tTags[i].getElementsByTagName('div')[0]) {
              continue;
          }
      }

      m++;
      lastpar = tTags[i];
    }
  }


    if((m + l ) == l)
    {
        if(nextref == '') {
          AddSearchOver();
          return;
        }
        ChangeDocLocationtoNext(nextref);
    }
    else {
      var parenNode = lastpar.parentNode;
      var ent;
      for(i = 0;i<trTags.length;i++) {

      if(trTags[i].hasAttribute('class') && trTags[i].getAttribute('class').match(/row/))
       {

          ent = trTags[i].cloneNode(true);
          parenNode.insertBefore(ent,lastpar.nextSibling);
          trTags[i].parentNode.removeChild(trTags[i]);
          i = i - 1;
          lastpar = ent;
          m++;
        }

        if(m == 31) {
            id = frdoc.getElementById('MagicBut');
            id.textContent = 'SearchMore';
            break;
       }
      }

      if(m == 31) {
          ;
       }
       else {

          if(nextref == '') {
             AddSearchOver();
             return;
          }
             ChangeDocLocationtoNext(nextref);
          }
    }

}
else if(window.name == 'maindisp'){

        if(nextref == '') {
          AddSearchOver();
          return;
        }

      parent.frames[1].document.location.href = nextref;
}

return;

/////////////////////////////////////////////////////////////////////////////

function AddSearchOver()
{

    frdoc = parent.frames[0].document;
    // Race Condition!!!!!
    if(frdoc.getElementById('MagicBut').textContent == 'Continue') {
       return;
    }
    over = frdoc.createElement('font');
    over.innerHTML = '<font color="red" font-size="15pt"><br><br>SearchOver</font>';

    elm = frdoc.getElementById('MagicBut');
    elm.parentNode.appendChild(over);
    elm.parentNode.removeChild(elm);

}

function ChangeDocLocationtoNext( nextrf ) {

    frdoc = parent.frames[0].document;
    // Race Condition!!!!!
    if(frdoc.getElementById('MagicBut').textContent == 'Continue' || nextrf == null) {
       return;
    }

    document.location.href = nextrf;
}
function AddSearchBox() {

  var divElement = document.createElement('div');
  var scriptStr='';
	scriptStr+='function searchScrap() {';
  scriptStr+='var searchText=document.getElementById(\'searchText\').value;';
  scriptStr+='if(searchText=="") { alert("Please enter a search text!"); return; }';
  scriptStr+='var hr = \'ScrpSrchMagicBabe\'; hr += document.getElementById(\'searchText\').value;if(parent.name.indexOf(\'ScrpSrchMagicBabe\') >=0){parent.name = \'reload\' + hr;parent.location.href = document.location.href;}else {window.open(document.location.href,hr,\'width=800,height=900,scrollbars=yes,menubar=yes,resizable=yes\'); }';
	scriptStr+='}  ';

  scriptStr+=' function DOSomethin() { ';
  scriptStr+='   if(document.getElementById(\'MagicBut\').textContent == \'StopSearch\'){ ';
  scriptStr+='      parent.frames[1].stop();parent.frames[0].stop();document.getElementById(\'MagicBut\').textContent = \'Continue\';return; ';
  scriptStr+='    }';
  scriptStr+='   if(document.getElementById(\'MagicBut\').textContent == \'Continue\'){ ';
  scriptStr+='      next = parent.frames[0].document.getElementById(\'magicnextId\').textContent; ';
  scriptStr+='      if(next && next.length) { ';
  scriptStr+='      parent.frames[1].document.location.href = next; } else { parent.frames[1].location.reload(); } ';
  scriptStr+='      parent.frames[0].document.getElementById(\'MagicBut\').textContent =\'StopSearch\';return ';
  scriptStr+='  } ';
  scriptStr+='  RemoveAllRows();MoveRows();';
  scriptStr+='  parent.frames[0].document.getElementById(\'MagicBut\').textContent =\'StopSearch\';anc = parent.frames[1].document.getElementsByTagName(\'a\');';
  scriptStr+='  for(var i = 0;i<anc.length;i++) {if(anc[i].textContent.indexOf(\'next\')>=0){parent.frames[1].document.location.href = anc[i].href;}}}';

  scriptStr+='  function enter(e) {if(e.which == 13)searchScrap();return;} ';
  scriptStr+= remdiv + movediv;


  scriptStr+=' function help() { ';
  scriptStr+='var Cwindow = window.open("","Orkut Search Help",\'width=500,height=610,scrollbars=no,menubar=no,resizable=no\');';
  scriptStr+='Cwindow.document.body.innerHTML = \'<body style="background-color:#D4DDED">';
  scriptStr+='<p align="center"><font size\="5pt" align\="center">Orkut Searcher Help</font><img src="http://images3.orkut.com/img/tr10.gif"/></p>';
  scriptStr+='<p style="background-color:#C9D6EB"><br><b>user:</b><font color\="#762300">username</font> <font >  - Search for all entries from the given username<br>Give the username within " [double quote ] if it contains space</font>';
  scriptStr+='<br><font color="blue">Ex - user:Ram</font> will search for all entries from ram Ram rAm abcdram ramcb cbramab...';
  scriptStr+='<p style="background-color:#BFD0EA"><b>sdate:</b><font color\="#762300">mm/dd/yyyy</font><font>  - Search for all entries after the given date</font></font>';
  scriptStr+='<br><font color="blue">Ex - sdate:11/01/2006 or sdate:11/1/2006</font> will search for all entries starting from November 1st 2006 till the end ';
  scriptStr+='</p><p style="background-color:#C9D6EB"><br><b>edate:</b><font color\="#762300">mm/dd/yyyy</font><font>   - Search for all entries before the given date</font>';
  scriptStr+='<br><font color="blue">Ex - edate:11/01/2006 or edate:11/1/2006</font> will search for all entries from beginning till November 1st 2006  ';
  scriptStr+='</p><p style="background-color:#BFD0EA"><b>exact:</b><font>  Do a case sensitive search and match usernames exactly and fully';
  scriptStr+='<br><font color="blue">Ex - exact: user:Ram</font> will search for all entries from Ram only and users like ram rAm are ignored';
  scriptStr+='</p><p style="background-color:#C9D6EB">Ofcourse give any keyword and get all entries with the given word in the entry. The word wil be highlighted in <font color="red">red</font></font>';
  scriptStr+='<br><font color="blue">Ex - Hello</font> will search for entries having hello hElLo heLLO hihelloty ';
  scriptStr+='<br>Like user names <font color="blue">Hello exact: </font> will search for all entries having the word Hello and entries like helloe hElLo halhello are ignored';
  scriptStr+='</p><b>Tip</b> - Search for <b>http:\/</b> if you wish to search all entries with links in them';
  scriptStr+='<br><p align="right"><font size="2pt"><b>Disclainer:</b>This search tool is not endorsed by Orkut or Google </font></p> ';
  scriptStr+='</body>\';';
  scriptStr+='Cwindow.document.body.setAttribute(\'style\',\'background-color:#D4DDED\');} ';


	var scriptElement=document.createElement('script');
	scriptElement.language='Javascript';
	scriptElement.innerHTML=scriptStr;
	document.getElementsByTagName('head')[0].appendChild(scriptElement);
  var str='';
	str+='  <table class="panel" border="0" cellpadding="0" cellspacing="0" width="100%" >';
	str+='  <tr><td class="panel">';
	str+='  <table align="center">';
	str+='  <tr>';
	str+='  <td>';
	str+='  <input id="searchText" name="searchText" type="text" size="40" class="textbox" value="" onKeyPress="enter(event)">';
	str+='  <\/td>';
	str+='  <td>';
	str+='  <table class="btn" border="0" cellpadding="0" cellspacing="0" onmouseover="this.className=\'btnHover\'" onmouseout="this.className=\'btn\'">';
	str+='  <tr style="cursor: pointer;" onclick="searchScrap();">';
	str+='  <td><img src="http:\/\/images3.orkut.com\/img\/bl.gif" alt="" \/><\/td>';
	str+='  <td nowrap style="background: url(http:\/\/images3.orkut.com\/img\/bm.gif)">';
	str+=   buttonname;
  str+=' </td> ';
	str+=' <img src="http:\/\/images3.orkut.com\/img\/br.gif" alt="" \/>';
	str+='  <\/td>';
	str+='  <\/tr>';
  str+='  <\/table>';
  str+=' <tr align="center"><td><table class="btn" border="0" cellpadding="0" cellspacing="0" onmouseover="this.className=\'btnHover\'" onmouseout="this.className=\'btn\'">';
  str+=' <tr style="cursor: pointer;" onclick="help();">';
	str+=' <img src="http:\/\/images3.orkut.com\/img\/bl.gif" alt="" \/>';
	str+='  <td nowrap style="background: url(http:\/\/images3.orkut.com\/img\/bm.gif)">';
  str+='  Watz that new box above ??</td>';
	str+=' <img src="http:\/\/images3.orkut.com\/img\/br.gif" alt="" \/>';
  str+=' </tr> </table></td></tr>';
 	str+='  <\/td>';
	str+='  <\/tr>';

	str+='  <\/table>';

  if(parent.name.indexOf('ScrpSrchMagicBabe') >= 0 && parent.name.indexOf('killed') == -1) {
      str+='  <br><table align="center"><td valign="top" align="center"><button onclick="DOSomethin()" id="MagicBut">StopSearch</button></td></table>';
  }
	str+='  <\/td><\/tr>';
	str+='  <\/table>';
	str+='  <img src="img/b.gif" alt="" height="10" width="10" />';
	divElement.setAttribute('id','scrapbookSearch');
	divElement.innerHTML=str;

  if(document.getElementsByTagName('table').item(2)) {
  if( document.getElementsByTagName('table').item(2).innerHTML.indexOf('searchScrap') == -1 ) {
  	document.body.insertBefore(divElement,document.getElementsByTagName('table').item(2));
  }
  }

}

/////////////////////////////////////////////////////////////////////////

function SearchParse() {

if(parent.name.indexOf('ScrpSrchMagicBabe') >= 0)
{


	var searchText = parent.name.split('ScrpSrchMagicBabe')[1];
  var rgstr = "(\\d\+)/(\\d\+)/(\\d\{4\})(.*)";
  var startD = "",endD = "",exact = 0,dates = 0;


  if(searchText.indexOf('exact:') >= 0)
  {
    exact = 1;
    var r = new RegExp('(.*)exact:(.*)');
    r.exec(searchText);
    searchText = RegExp.$1 + RegExp.$2;
  }
  if(searchText.indexOf('user:"') >= 0)
  {
      user = 1;
      var r = new RegExp('(.*)user:"(.*)"(.*)');
      r.exec(searchText);
      userN = RegExp.$2;
      searchText = RegExp.$1 + RegExp.$3;
  }
  else
  if(searchText.indexOf('user:') >= 0)
  {
     user = 1;
     var r = new RegExp("(.*)user:(\\S+)(.*)");
     r.exec(searchText);
     userN = RegExp.$2;
     searchText = RegExp.$1 + RegExp.$3;
   }

  if(searchText.indexOf('edate:') >= 0)
  {
	    rg = new RegExp('(.*)edate:' + rgstr);
      rg.exec(searchText);
      endD = (RegExp.$2+'\/'+RegExp.$3+'\/'+RegExp.$4);
      searchText = RegExp.$1 + RegExp.$5;
      dateq = 1;

      if(searchText.indexOf('sdate:') >= 0)
      {
	       rg = new RegExp('(.*)sdate:' + rgstr);
         rg.exec(searchText);
         startD = (RegExp.$2+'\/'+RegExp.$3+'\/'+RegExp.$4);
         searchText = RegExp.$1 + RegExp.$5;

      }
      else
      {
         startD = '00\/00\/0000';
      }

  }
  else
  {
      endD = '12\/31\/9999';
      if(searchText.indexOf('sdate:') >= 0)
      {
         dateq = 1;
	       rg = new RegExp('(\S*)sdate:' + rgstr);
         rg.exec(searchText);
         startD = (RegExp.$2+'\/'+RegExp.$3+'\/'+RegExp.$4);
         searchText = RegExp.$1 + RegExp.$5;
      }
      else
      {
         startD = '00\/00\/0000';
      }
  }

	var rg = new RegExp("(\W*)(\\d\\d|\\d)/(\\d\\d|\\d)/(\\d\+)","m");

  if(startD.match(rg)) {
    mm = RegExp.$2;
    dd = RegExp.$3;

    if(mm > 12 || dd > 31 ) {
      alert('Invalid Date given for Start Date..Quitting');
      parent.close();
      return;
    }
    if((RegExp.$2).length == 1) {
        mm = '0' + RegExp.$2;
    }
    if((RegExp.$3).length == 1) {
        dd = '0' + RegExp.$3;
    }
    startD = mm + '\/' + dd + '\/' + RegExp.$4;
  }

  if(endD.match(rg)) {
    mm = RegExp.$2;
    dd = RegExp.$3;

    if(mm > 12 || dd > 31 ) {
      alert('Invalid Date given for End Date..Quitting');
      parent.close();
      return;
    }

    if((RegExp.$2).length == 1) {
        mm = '0' + RegExp.$2;
    }
    if((RegExp.$3).length == 1) {
        dd = '0' + RegExp.$3;
    }
    endD = mm + '\/' + dd + '\/' + RegExp.$4;
  }

  searchText = searchText.replace(/^\s+/g,'');
  searchText = searchText.replace(/\s+$/g,'');



  if(startD > endD)
  {
     var temp = startD;
     startD = endD;
     endD = startD;
  }


 	for(var i=0;i<trTags.length;i++)
  {

	  if(trTags[i].hasAttribute('class') && trTags[i].getAttribute('class').match(/row/))
    {
 	     if(dateq == 1)
	     {
          var tdn = trTags[i].getElementsByTagName('td');
          var da;
          for(var x = 0;x < tdn.length;x++)
          {
     				var rg = new RegExp("(\W*)(\\d\\d|\\d)/(\\d\\d|\\d)/(\\d\+)","m");
     				if(tdn[x].textContent.match(rg))
      			{
              mm = RegExp.$2;
              dd = RegExp.$3;

              if((RegExp.$2).length == 1) {
                 mm = '0' + RegExp.$2;
              }
              if((RegExp.$3).length == 1) {
                 dd = '0' + RegExp.$3;
              }

              da = (mm+'\/'+dd+'\/'+RegExp.$4);
         	    if(da < startD || da > endD )
    			    {
    		        trTags[i].parentNode.removeChild(trTags[i]);i = i-1;
    		        break;
    			    }
    			    else {dates++;break;}
            } //reg
          } //for
        } //dateq
     } //div
  } //for

  if(dateq == 1 && dates == 0 )
  {
   if( CommMsgs != 1 ) {
      if(da < startD) {
         return 2;
      }
   }
   else {
      if(da > endD) {
          return 2;
       }
   }
  }
  trTags=document.getElementsByTagName('tr');
  usr = new RegExp(userN,'i');
  txtr = new RegExp(searchText,'i');
  found = 0;

  if((searchText != '' && CommTopics == 1) || user == 1) {
 	for(var i=0;i<trTags.length;i++)
  {
    if(trTags[i].hasAttribute('class') && trTags[i].getAttribute('class').indexOf('row') >= 0)
    {
       anc = trTags[i].getElementsByTagName('a');
       if(searchText != '' && CommTopics == 1)
       {

          if(exact == 0) {
            if(anc[0].textContent.match(txtr)) {
              found = 1;
            }
          }
          else
          {
            if(anc[0].textContent == searchText){
               found = 1;
            }
          }
       }
  		 if(user == 1)
   		 {
         found = 0;
         for(var j = 0;j < anc.length;j++)
         {
           if(CommTopics == 1) {
               if(j != 1) {
                  continue;
               }
               if(j > 1) {
                  break;
               }
           }
           if(exact == 0) {
   	         if(anc[j].textContent.match(usr))
             {
 		  		     found = 1;
               break;
  	         }
           }
           else {
             if(anc[j].textContent == userN) {

               found = 1;
               break;
             }
           }
          }
     	  }
        if(found == 0) {
		        trTags[i].parentNode.removeChild(trTags[i]);i = i - 1;
          }
          found = 0;
      }
   }
   }
   trTags=document.getElementsByTagName('tr');
   if(searchText != "" && CommTopics == 0)
   {
      var found = 0;
      var rg;
      if(exact == 0) {
         rg = new RegExp('('+searchText+')','im');
      }
      else { rg = new RegExp('('+searchText+')'); }

      for(i = 0;i<trTags.length;i++) {
      if(trTags[i].hasAttribute('class') && trTags[i].getAttribute('class').match(/row/))
	    {

         if(Scrapbook == 1) {
             if(!trTags[i].getElementsByTagName('div')[0]){ continue; }
             child = trTags[i].getElementsByTagName('div')[0].childNodes;
         }
         else {
             if(CommMsgs == 1 ) {
                child = trTags[i].getElementsByTagName('td');
              }
         }
         for(var z = 0;z < child.length;z++) {
	  		 if(child[z].textContent.match(rg))
		  	 {
            text = RegExp.$1;
            subchild =   child[z].childNodes;
            for(var y = 0;y < subchild.length;y++) {
       	  		 if(subchild[y].textContent.match(rg)) {
                 text = RegExp.$1;
                 if(subchild[y].nodeName == 'a' || subchild[y].nodeName == 'A') {
                      if(subchild[y].getAttribute('href').match(/Profile\.aspx/)) {
                          continue;
                       }
                   }
                  var splitted=subchild[y].textContent.split(rg);
	  				      var finalString = '';
                  cl = document.createElement('font');
                  sib = subchild[y].nextSibling;
   	  			    	for(var k=0;k<splitted.length-1;k += 2)
	  	  			    {
		 		  		      finalString += splitted[k]+'<font color="red"><b>'+text+'</b></font>';
					        }
                  finalString+=splitted[k];
                  cl.innerHTML = finalString;
                  if(subchild[y].nodeName == 'a' || subchild[y].nodeName == 'A') {
                      subchild[y].removeChild(subchild[y].firstChild);
                      subchild[y].appendChild(cl);
                  } else {
                    child[z].removeChild(subchild[y]);
                    child[z].insertBefore(cl,sib);
                  }
                  found = 1;
               }
             }
             if(subchild.length == 0) {
                if(child[z].parentNode.nodeName == 'a' || child[z].nodeName == 'A') {
                  continue;
                }

                cl = document.createElement('font');
                sib = child[z].nextSibling;
                var splitted=child[z].textContent.split(rg);
					      var finalString = '';

   				    	for(var k=0;k<splitted.length-1;k += 2)
	  			    	{
		 				      finalString += splitted[k]+'<font color="red"><b>'+text+'</b></font>';
					      }
 					      finalString+=splitted[k];

                cl.innerHTML = finalString;
                var p = child[z].parentNode;
                p.removeChild(child[z]);
                p.insertBefore(cl,sib);
                found = 1;

             }
            }
          }
          if(found == 0) {
             trTags[i].parentNode.removeChild(trTags[i]);i = i - 1;
          }
          found = 0;
          }
        }
       }

      return 0;
    }
    return 4;
} /// SearchParse



}








