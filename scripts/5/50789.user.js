// ==UserScript==
// @name           forum ordering
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum_main.pl
// ==/UserScript==

var GMSTR="FORUMRANK", custom=0, allforum, origSet=[];

function getElementsByClassName(classname, par)
{
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
}


function getID(instring) 
{
  var isTeam=0, ptr1, ptr2, str, id;

  ptr1 = instring.indexOf("forum_id=", 0);

  if (ptr1<0) {
    ptr1 = instring.indexOf("team_id=", 0);
    isTeam=1;
  }

  ptr2 = instring.indexOf("\"", ptr1);
  if (isTeam==0)
    str = instring.substring(ptr1+9, ptr2);
  else
    str = instring.substring(ptr1+8, ptr2);

  id = parseInt(str);
  if (isTeam) id=-id;

  return id;
}


function getRankList(idlist) 
{
  var ranklist = [], done=0, tmp=[];

  for (var i=0; i<idlist.length; i++) {
    str = GMSTR + idlist[i].toString();
    rank = GM_getValue(str);
    if (rank==null) rank=i;
    ranklist[i] = rank;
  }

  return ranklist;
}



function getRank(idlist) 
{
  var ranklist = [], done=0, tmp=[], start, ret=[];

  for (var i=0; i<idlist.length; i++) {
    str = GMSTR + idlist[i].toString();
    rank = GM_getValue(str);
    if (rank==null) rank=i;
    ranklist[i] = rank;
  }

  while (done==0) {
    done=1;
    for (var i=0; i<ranklist.length; i++) {
      for (var j=i+1; j<ranklist.length; j++) 
        if (ranklist[i] == ranklist[j && ranklist[i]>=0]) {
           for (var x=0; x<ranklist.length; x++) 
             if (ranklist[x] > ranklist[j]) ranklist[x]++;
           ranklist[j]++;
           done=0;
           break;
        }
      
      if (done==0) break;
    }
  }

  for (var i=0; i<ranklist.length; i++)
    tmp[i] = i;

  for (var i=0; i<tmp.length; i++)
    for (var j=i+1; j<tmp.length; j++) 
      if (ranklist[tmp[i]] < ranklist[tmp[j]]) {
         var t = tmp[i];
         tmp[i] = tmp[j];
         tmp[j] = t;
      }

  for (start=tmp.length-1; start>=0; start--)
    if (ranklist[tmp[start]]>=0) break;

  for (var i=0; i<=start; i++) {
    ranklist[tmp[i]]=start-i;
    ret[ret.length] = tmp[i];
  }

  for (var i=0; i<idlist.length; i++) 
    if (ranklist[i]>=0) {
      str = GMSTR + idlist[i].toString();
      GM_setValue(str, ranklist[i]);
    }

  return ret;
}


function moveUp()
{
  var myid = this.id, myidptr=-1, str;
  var forumptr = this.parentNode.parentNode.parentNode;
  var list = getElementsByClassName('alternating_color2 forum', forumptr), idlist=[], title, id, ranklist;

  for (var i=0; i<list.length; i++) {

    title = getElementsByClassName('title', list[i]);
    id = getID(title[0].innerHTML);
    if (parseInt(myid) == id) myidptr=i;
    idlist[i] = id;
  } 

  ranklist = getRankList(idlist);

  if (myidptr >= 0 && ranklist[myidptr] > 0) 
    for (var i=0; i<list.length; i++)
      if (ranklist[i] == ranklist[myidptr] - 1) {
        str = GMSTR + idlist[myidptr].toString();
        GM_setValue(str, ranklist[i]);
        str = GMSTR + idlist[i].toString();
        GM_setValue(str, ++ranklist[i]);
        break;
      }

  orderForum(forumptr);
}


function moveDown()
{
  var myid = this.id, myidptr=-1, str;
  var forumptr = this.parentNode.parentNode.parentNode;
  var list = getElementsByClassName('alternating_color2 forum', forumptr), idlist=[], title, id, ranklist;

  for (var i=0; i<list.length; i++) {

    title = getElementsByClassName('title', list[i]);
    id = getID(title[0].innerHTML);
    if (parseInt(myid) == id) myidptr=i;
    idlist[i] = id;
  } 

  ranklist = getRankList(idlist);

  if (myidptr >= 0 && ranklist[myidptr] < list.length-1) 
    for (var i=0; i<list.length; i++)
      if (ranklist[i] == ranklist[myidptr] + 1) {
        str = GMSTR + idlist[myidptr].toString();
        GM_setValue(str, ranklist[i]);
        str = GMSTR + idlist[i].toString();
        GM_setValue(str, --ranklist[i]);
        break;
      }

  orderForum(forumptr);
}


function Hide()
{
  var myid = this.id, myidptr=-1, str;
  var forumptr = this.parentNode.parentNode.parentNode;
  var list = getElementsByClassName('alternating_color2 forum', forumptr), title, id;

  for (var i=0; i<list.length; i++) {
    title = getElementsByClassName('title', list[i]);
    id = getID(title[0].innerHTML);
    if (parseInt(myid) == id) {
      str = GMSTR + id.toString();
      GM_setValue(str, -1);
      break;
    }
  }

  orderForum(forumptr);
}


function Unhide()
{
  var forumptr = this.nextSibling, forums = getElementsByClassName('forums', document), title, id;
 
  for (var i=0; i<forums.length; i++)
    if (forums[i] == forumptr) 
      for (var j=0; j<origSet[i].length; j++) {
        var str = GMSTR + origSet[i][j].toString();
        var val = GM_getValue(str);
        if (val!=null && val<0) {
          GM_setValue(str, origSet[i].length);

          for (var x=0; x<allforum.length; x++) {
            title = getElementsByClassName('title', allforum[x]);
            id = getID(title[0].innerHTML);
            if (id == origSet[i][j]) forumptr.appendChild(allforum[x]);

          }
        }
      }

  orderForum(forumptr);
}


function removeCustomControl() 
{
  var controls = getElementsByClassName('CustomForumControl', document);
  for (var i=0; i<controls.length; i++)
    controls[i].parentNode.removeChild(controls[i]);
}


function addCustomControl() 
{
  var td, title, list, newtd, forums = getElementsByClassName('forums', document);

  for (x=0; x<forums.length; x++) {

    newDiv = document.createElement('div');
    newDiv.align = 'left';
    newDiv.id = x;
    newDiv.className = 'CustomForumControl';
    newDiv.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; height: 25px" value="UnHide All Forums">'; 
    newDiv.addEventListener('click', Unhide, true);
    forums[x].parentNode.insertBefore(newDiv, forums[x]);

    var header = getElementsByClassName('nonalternating_color forum_head', forums[x]);

    newtd = document.createElement('td');
    newtd.className = 'CustomForumControl';
    newtd.setAttribute('colspan', '1');
    newtd.setAttribute('align','center');
    newtd.innerHTML="custom";
    header[0].appendChild(newtd);
  }

  for (var i=0; i<allforum.length; i++) {
    title = getElementsByClassName('title', allforum[i]);
    id = getID(title[0].innerHTML);

    td = document.createElement('td');
    td.className = 'CustomForumControl';

    newDiv = document.createElement('div');
    newDiv.align = 'center';
    newDiv.id = id;
    newDiv.innerHTML = '<input type="button" style="font-size: 8pt; font-weight: bold; width: 85%; height: 20px" value="UP">'; 
    newDiv.addEventListener('click', moveUp, true);
    td.appendChild(newDiv);

    newDiv = document.createElement('div');
    newDiv.align = 'center';
    newDiv.id = id;
    newDiv.innerHTML = '<input type="button" style="font-size: 8pt; font-weight: bold; width: 85%; height: 20px" value="DOWN">'; 
    newDiv.addEventListener('click', moveDown, true);
    td.appendChild(newDiv);

    newDiv = document.createElement('div');
    newDiv.align = 'center';
    newDiv.id = id;
    newDiv.innerHTML = '<input type="button" style="font-size: 8pt; font-weight: bold; width: 85%; height: 20px" value="HIDE">'; 
    newDiv.addEventListener('click', Hide, true);
    td.appendChild(newDiv);
    allforum[i].appendChild(td);
  }
}


function switchcontrol() 
{
  if (custom==0) addCustomControl();
  else removeCustomControl();

  custom = 1 - custom;
  GM_setValue("ForumCustomControl", custom);
}


function orderForum(ptr)
{
  var list = getElementsByClassName('alternating_color2 forum', ptr), idlist=[], title, id, outlist, first;

  for (var i=0; i<list.length; i++) {
    title = getElementsByClassName('title', list[i]);
    id = getID(title[0].innerHTML);
    idlist[i] = id;
  } 

  outlist = getRank(idlist);

  for (var i=0; i<list.length; i++)
    if (i != outlist[0]) 
      list[i].parentNode.removeChild(list[i]);

  for (var i=outlist.length-1; i>0; i--) 
    list[outlist[0]].parentNode.insertBefore(list[outlist[i]], list[outlist[0]]);
}


window.setTimeout( function() {

  var newDiv, forums = getElementsByClassName('forums', document), title, id;

  allforum = getElementsByClassName('alternating_color2 forum', document);

  for (var i=0; i<forums.length; i++) {
    var list = getElementsByClassName('alternating_color2 forum', forums[i]);
    tmp = new Array(0);

    for (var j=0; j<list.length; j++) {
      title = getElementsByClassName('title', list[j]);
      id = getID(title[0].innerHTML);
      tmp[tmp.length]=id;
    }
    origSet[i] = tmp;
  }

  var footer = document.getElementById('footer');

  newDiv = document.createElement('div');
  newDiv.align = 'left';
  newDiv.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; height: 25px" value="Toggle Custom Forum Control On/Off">'; 
  newDiv.addEventListener('click', switchcontrol, true);
  if (footer) footer.parentNode.insertBefore(newDiv, footer);

  custom = GM_getValue("ForumCustomControl");
  if (custom==null) {
    custom=0;
    GM_setValue("ForumCustomControl", 0);
  }

  if (custom==1) addCustomControl();

  for (var x=0; x<forums.length; x++)
    orderForum(forums[x]);

}, 100);

