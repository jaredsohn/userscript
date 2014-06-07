// ==UserScript==
// @name           dump-off count
// @namespace      DeepRoute
// @include        http://deeproute.com/deeproute/?js=weekbyweek*
// @include        http://deeproute.com/deeproute/default.asp?js=weekbyweek*
// ==/UserScript==

var teamlist=[];
var abbrlist=[];

var teams=[];
var abbrs=[];

var teamID=[], links=[], readcount=0, readtarget=1, stats=[];

function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

function isTeam(inteam) {
  for (var x=0; x<teams.length; x++)
    if (teams[x] == inteam) return 1;
  return 0;
};

function isAbbr(inabbr) {
  for (var x=0; x<abbrs.length; x++)
    if (abbrs[x] == inabbr) return 1;
  return 0;
};

function isID(inid) {
  for (var x=0; x<teamID.length; x++) 
    if (teamID[x]==inid) return 1;
  return 0;
};


function parsePBP(intext) {
  var ptr1=0, ptr2, ptr3, ptr4, ptr5, package, form, play, abbr, yard, yard2, comp, scramble, int, down, togo, penalty, tmp=0, endptr, dumpoff, preptr=0;
  var pkgid, formid, playid, index, pass, att, tmparr;

  readcount++;
  newDiv = document.getElementById('scout_count');
  newDiv.innerHTML=readcount.toString() + ' of ' + readtarget + ' games';

  while (1) {
    tmp++;
    ptr2=intext.indexOf("Offensive Package Was", ptr1);
    if (ptr2<0) break;
    endptr=ptr2;
    ptr3=intext.lastIndexOf("<span style='font-size:13;'>", ptr2);
    ptr4=intext.indexOf("ouchdown", ptr3);
   if (ptr4>ptr3 && ptr4 < ptr2) {
         endptr=ptr3;
         ptr3=intext.lastIndexOf("<span style='font-size:13;'>", endptr-5);
    }
    ptr4=intext.indexOf("<b>", ptr3);
    ptr5=intext.indexOf("</b>", ptr4+3);
    abbr=intext.substring(ptr4+3, ptr5);

    ptr4=intext.indexOf("a gain of", ptr3);
    if (ptr4!=-1 && ptr4<endptr) ptr5=ptr4;
    else {
      ptr4=intext.indexOf("a LOSS of", ptr3);
      if (ptr4!=-1 && ptr4<endptr) ptr5=ptr4;
      else {
        ptr4=intext.indexOf("gains", ptr3);
        if (ptr4!=-1 && ptr4<endptr) ptr5=ptr4;
        else {
          ptr4=intext.indexOf("loses", ptr3);
          if (ptr4!=-1 && ptr4<endptr) ptr5=ptr4;
          else ptr5=-1;     
        }
      }
    }  
    if (ptr5!=-1) {
      ptr4=intext.indexOf("class='supza'>", ptr5);
      if (ptr4!=-1 && ptr4<endptr) {
        ptr5=intext.indexOf("</span>", ptr4+14);
        yard=intext.substring(ptr4+14, ptr5);
        ptr4=intext.indexOf("class='supz'>", ptr5);
        ptr5=intext.indexOf("</span>", ptr4+13);
        yard2=intext.substring(ptr4+13, ptr5);
        yard=parseInt(yard) + parseInt(yard2)/100;
      }
      else yard=0;
    }
    else yard=0;

    ptr4=intext.indexOf("penalty", ptr3);
    if (ptr4!=-1 && ptr4<endptr) penalty=1;
    else penalty=0;

    ptr4=intext.indexOf("dump it off", preptr);
    if (ptr4!=-1 && ptr4<endptr) dumpoff=1;
    else dumpoff=0;

    pass=0;
    ptr4=intext.indexOf(" pass ", ptr3);
    if (ptr4!=-1 && ptr4<endptr) pass=1;

    ptr4=intext.indexOf(" throwing ", ptr3);
    if (ptr4!=-1 && ptr4<endptr) pass=1;

    ptr4=intext.indexOf("threw the ball away", ptr3);
    if (ptr4!=-1 && ptr4<endptr) pass=1;

    ptr4=intext.indexOf(" Pass by", ptr3);
    if (ptr4!=-1 && ptr4<endptr) pass=1;
    if (pass==0 && scramble==1) pass=1;

    if (pass) att=1; else att=0;
    if (scramble) att=0;
    ptr4=intext.indexOf("SACKED", ptr3);
    if (ptr4!=-1 && ptr4<endptr) { att=0; pass=1; }

    if (isAbbr(abbr) && !penalty && pass==1) {


       stats[0][0]++;
       stats[0][1]=parseFloat(stats[0][1])+yard;
       if (yard>=15) stats[0][2]++;
       if (yard>=25) stats[0][3]++;
       if (yard>=25) stats[0][4]++;

       if (dumpoff) {
         stats[1][0]++;
         stats[1][1]=parseFloat(stats[1][1])+yard;
         if (yard>=15) stats[1][2]++;
         if (yard>=25) stats[1][3]++;
         if (yard>=35) stats[1][4]++;
       }
       else {
         stats[2][0]++;
         stats[2][1]=parseFloat(stats[2][1])+yard;
         if (yard>=15) stats[2][2]++;
         if (yard>=25) stats[2][3]++;
         if (yard>=35) stats[2][4]++;
       }
    }

    ptr1=ptr2+21;
    preptr=endptr;
  }

  if (readcount<readtarget) readLog();
  else {
       var perc11=parseFloat(Math.round( parseFloat(stats[0][2])*1000.0 / parseFloat(stats[0][0]) ) ) / 10.0;
       var perc12=parseFloat(Math.round( parseFloat(stats[0][3])*1000.0 / parseFloat(stats[0][0]) ) ) / 10.0;
       var perc13=parseFloat(Math.round( parseFloat(stats[0][4])*1000.0 / parseFloat(stats[0][0]) ) ) / 10.0;
       var perc21=parseFloat(Math.round( parseFloat(stats[1][2])*1000.0 / parseFloat(stats[1][0]) ) ) / 10.0;
       var perc22=parseFloat(Math.round( parseFloat(stats[1][3])*1000.0 / parseFloat(stats[1][0]) ) ) / 10.0;
       var perc23=parseFloat(Math.round( parseFloat(stats[1][4])*1000.0 / parseFloat(stats[1][0]) ) ) / 10.0;
       var perc31=parseFloat(Math.round( parseFloat(stats[2][2])*1000.0 / parseFloat(stats[2][0]) ) ) / 10.0;
       var perc32=parseFloat(Math.round( parseFloat(stats[2][3])*1000.0 / parseFloat(stats[2][0]) ) ) / 10.0;
       var perc33=parseFloat(Math.round( parseFloat(stats[2][4])*1000.0 / parseFloat(stats[2][0]) ) ) / 10.0;

       var avg=parseFloat(Math.round( parseFloat(stats[0][1])*10.0 / parseFloat(stats[0][0]) ) ) / 10.0;
       var avg2=parseFloat(Math.round( parseFloat(stats[1][1])*10.0 / parseFloat(stats[1][0]) ) ) / 10.0;
       var avg3=parseFloat(Math.round( parseFloat(stats[2][1])*10.0 / parseFloat(stats[2][0]) ) ) / 10.0;

       newDiv = document.getElementById('scout_count');
       newDiv.innerHTML="[1] Total play count: <b>" + stats[0][0] + "</b>, avg: <b>" + avg + "</b>, 15+ yard: <b>" + stats[0][2] + "</b> (" + perc11 + "%)"+ ", 25+ yard: <b>" + stats[0][3] + "</b> (" + perc12 + "%)" + ", 35+ yard: <b>" + stats[0][4] + "</b> (" + perc13 + "%)"+ 
                                           "<br>[2] Dump-off play count: <b>" + stats[1][0] + "</b>, avg: <b>" + avg2 + "</b>, 15+ yard: <b>" + stats[1][2] + "</b> (" + perc21 + "%)"+ ", 25+ yard: <b>" + stats[1][3] + "</b> (" + perc22 + "%)"  + ", 35+ yard: <b>" + stats[1][4] + "</b> (" + perc23 + "%)"+ 
                                           "<br>[3] Regular pass count: <b>" + stats[2][0] + "</b>, avg: <b>" + avg3 + "</b>, 15+ yard: <b>" + stats[2][2] + "</b> (" + perc31 + "%)" + ", 25+ yard: <b>" + stats[2][3]+ "</b> (" + perc32 + "%)" + ", 35+ yard: <b>" + stats[2][4] + "</b> (" + perc33 + "%)" ;
  }
};


function readLog() {

  GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://deeproute.com/deeproute/default.asp?js=loggerinc&viewpbp=' + links[readcount],
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(detail) {
          parsePBP(detail.responseText);
      },
    });
}


function startReadLog() {

  if (readcount>=readtarget) return;

  readtarget=links.length;
  //readcount=8;

  var target = document.getElementById('scout_button_table');
  var newDiv = document.createElement('div');
  newDiv.setAttribute("id", "scout_count");
  newDiv.innerHTML='0 of ' + readtarget + ' games';
  if (target) target.parentNode.insertBefore(newDiv, target.nextSibling);

  readLog();
};


function parseStanding(intext)
{
  var ptr1=0, ptr2, ptr3, ptr4, name, abbr;

  while (ptr1>=0) {
      ptr2=intext.indexOf("class=sbu", ptr1);
      if (ptr2<0) break;
      ptr3=intext.indexOf("<b>", ptr2);
      ptr4=intext.indexOf("<br>", ptr3);
      name=intext.substring(ptr3+3, ptr4) + ' ';
      ptr3=intext.indexOf("</b>", ptr4+4);
      name+=intext.substring(ptr4+4, ptr3);

      ptr2=intext.indexOf("class=norm>", ptr3);
      ptr3=intext.indexOf("</a>", ptr2+11);
      abbr=intext.substring(ptr2+11, ptr3);

      teamlist[teamlist.length]=name;
      abbrlist[abbrlist.length]=abbr;
     ptr1=ptr3+4;
  }
   
   startFunc();
}


function buildGameList(input) 
{
  var ptr1, ptr2, ptr3, id, id2, name, endptr;

   teams=[];
   abbrs=[];

  var checkbox = getElementsByClassName('team_checkbox', document);

   for (var i=0; i < checkbox.length; i++)
     if (checkbox[i].checked) {
        teams[teams.length]=teamlist[i];
        abbrs[abbrs.length]=abbrlist[i];
     }


  ptr1=input.indexOf("\"teaminfo\"", 0);
  if (ptr1<0) ptr1=input.indexOf("teaminfo ", 0);
  endptr=input.indexOf("hidden", ptr1+8);

  while (1) {
    ptr2=input.indexOf("!", ptr1);
    if (ptr2 > endptr) break;
    ptr3=input.indexOf("^", ptr2+1);
    id=input.substring(ptr2+1, ptr3);
    ptr2=input.indexOf("^", ptr3+1);
    name=input.substring(ptr3+1, ptr2);
    if (isTeam(name)) teamID[teamID.length]=id;
    ptr1=ptr2;
  }

  ptr1=input.indexOf("\"type-X\"", endptr);
  endptr=input.indexOf("\"type-P\"", ptr1+7);
  if (endptr<0)   endptr=input.indexOf("\"topper\"", ptr1+7);


  while (1) {
    ptr2=input.indexOf("Y!", ptr1);
    if (ptr2 > endptr || ptr2<0) break;
    ptr3=input.indexOf("^", ptr2+2);
    id=input.substring(ptr2+2, ptr3);
    ptr2=input.indexOf("^", ptr3+1);
    id2=input.substring(ptr3+1, ptr2);

    if (isID(id) || isID(id2)) {
      ptr3=input.indexOf("^", ptr2+1);
      ptr2=input.indexOf("^", ptr3+1);
      ptr3=input.indexOf("^", ptr2+1);
      links[links.length]=input.substring(ptr2+1, ptr3);
    }

    ptr1=ptr3;
  }
}


function startFunc () 
{
  var input=document.body.innerHTML, ptr1, ptr2, ptr3, id, id2, name, endptr;
  var target = document.getElementById('imonstatus');

  var buttontable = document.createElement('table');
  buttontable.setAttribute('cellspacing', '0');
  buttontable.setAttribute('cellpadding', '0');
  buttontable.setAttribute('id', 'scout_button_table');

  for (var z=0; z<teamlist.length; z++) {

    if (z % 8 ==0) {
       var newtr2=document.createElement('tr');
       buttontable.appendChild(newtr2);
    }

    var newtd2 = document.createElement('td');
    newtd2.setAttribute('align', 'center');
    var newtd3 = document.createElement('td');
    newtd3.setAttribute('align', 'center');

    var checkbox = document.createElement('input');
    checkbox.setAttribute('class', 'team_checkbox');
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("name", "teamlistid");
    checkbox.setAttribute('align', 'center');
    checkbox.setAttribute("teamlistid", z);
    var tmpdiv=document.createElement('div');
    tmpdiv.align='center';
    tmpdiv.innerHTML = '<b>'+teamlist[z]+'</b>';
    newtd2.appendChild(checkbox);
    newtd3.appendChild(tmpdiv);
    newtr2.appendChild(newtd2);
    newtr2.appendChild(newtd3);
  }

  var newtr=document.createElement('tr');
  buttontable.appendChild(newtr);
  var newtd1 = document.createElement('td');
  newtd1.setAttribute('colspan', '2');
  var newDiv2 = document.createElement('div');
  newDiv2.align = 'center';
  newDiv2.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Start">'; 
  newDiv2.addEventListener('click', function() {buildGameList(input); startReadLog(); }, true);
  newtd1.appendChild(newDiv2);
  newtr.appendChild(newtd1);

  var newtd2 = document.createElement('td');
  newtd2.setAttribute('colspan', '2');
  var newDiv3 = document.createElement('div');
  newDiv3.align = 'center';
  newDiv3.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Select all">'; 
  newDiv3.addEventListener('click', function() {var checkbox = getElementsByClassName('team_checkbox', document);  for (var i=0; i < checkbox.length; i++) checkbox[i].checked=true;   }, true);
  newtd2.appendChild(newDiv3);
  newtr.appendChild(newtd2);

  var newtd3 = document.createElement('td');
  newtd3.setAttribute('colspan', '2');
  var newDiv4 = document.createElement('div');
  newDiv4.align = 'center';
  newDiv4.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Clear all">'; 
  newDiv4.addEventListener('click', function() {var checkbox = getElementsByClassName('team_checkbox', document);  for (var i=0; i < checkbox.length; i++) checkbox[i].checked=false;   }, true);
  newtd3.appendChild(newDiv4);
  newtr.appendChild(newtd3);


  if (target) target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(buttontable, 
                                                                target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling);
}


window.setTimeout( function() {

  var input=document.body.innerHTML, ptr1, ptr2, ptr3, year, league;

  stats=new Array(3);

  for (var x=0; x<3; x++) {
    var tmp=new Array(5);
    for (y=0; y<5; y++)
       tmp[y]=0;
    stats[x]=tmp;
  }

  ptr1=input.indexOf("imonyear", 0);
  ptr2=input.indexOf("value=\"", ptr1);
  ptr3=input.indexOf("\"", ptr2+7);
  if (ptr1<0 || ptr2<0 || ptr3<0) { alert("Can't find year"); return;  }
  year=input.substring(ptr2+7, ptr3);

  ptr1=input.indexOf("imonlg", 0);
  ptr2=input.indexOf("value=\"", ptr1);
  ptr3=input.indexOf("\"", ptr2+7);
  if (ptr1<0 || ptr2<0 || ptr3<0) { alert("Can't find league number"); return; }
  league=input.substring(ptr2+7, ptr3);

  GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://deeproute.com/deeproute/?sel=leaguelook&year=' + year + '&myleagueno=' + league,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(detail) {
          parseStanding(detail.responseText);
      },
    });

}, 100);

