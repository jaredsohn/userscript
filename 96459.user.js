// ==UserScript==
// @name           ranking
// @namespace      deeproute
// @include        http://deeproute.com/deeproute/default.asp?js=weekbyweek&*
// @include        http://deeproute.com/deeproute/?js=weekbyweek&*
// ==/UserScript==

var team=[], oppid=[], record=[], sos=[], rating=[], oldrating=[], sosrank=[], run=0, counter=0;

function findTeamID(inname)
{
  for (var x=0; x<team.length; x++)
    if (team[x] == inname) return x;
  return -1;
}

function getSOSRank(id) {
  for (var x=0; x<sosrank.length; x++)
    if (sosrank[x]==id) return x+1;
  return -1;
}

function creatediv(str, idattr)
{
  var tmp = document.createElement('div');
  tmp.setAttribute("id", idattr);
  tmp.innerHTML = str;
  return tmp;
}

function ranking() {

  var win, loss, tie, total, target, str;

  run=1;

  for (var x=0; x<team.length; x++)
    rating[x]=oldrating[x]=sos[x]=0.0;

  for (var x=0; x<team.length; x++) {
    win=loss=tie=0;
    for (var y=0; y<record[x].length; y++)
      if (record[x][y]==1) win++;
      else if (record[x][y]==-1) loss++;
      else tie++;

    oldrating[x]=parseFloat(1.0 + win)/parseFloat(win+loss+tie+2);
  }

  while (calc() == 0) ;

  var order=new Array(team.length);
  for (var x=0; x<team.length; x++)
    order[x]=sosrank[x]=x;

  for (var x=0; x<team.length; x++)
    for (var y=x+1; y<team.length; y++)
      if (rating[order[x]] < rating[order[y]]) {
         var tmp=order[x];
         order[x]=order[y];
         order[y]=tmp;
      }

  for (var x=0; x<team.length; x++)
    for (var y=x+1; y<team.length; y++)
      if (sos[sosrank[x]] < sos[sosrank[y]]) {
         var tmp=sosrank[x];
         sosrank[x]=sosrank[y];
         sosrank[y]=tmp;
      }


  var newDiv1 = creatediv("(Rank).......(W-L-T).......(S.O.S)..............(Rating).......(Team Name)", "ranking0");
  target = document.getElementById('rank_button_table');
  if (target) target.parentNode.insertBefore(newDiv1, target.nextSibling);

  for (var x=0; x<team.length; x++) {

    win=loss=tie=0;
    for (var y=0; y<record[order[x]].length; y++)
      if (record[order[x]][y]==1) win++;
      else if (record[order[x]][y]==-1) loss++;
      else tie++;

    var val0=parseInt(parseFloat(sos[order[x]])*10000.0);
    val0=parseFloat(val0) / 100.0;
    var val1=parseInt(parseFloat(rating[order[x]])*10000.0);
    val1=parseFloat(val1) / 100.0;

    if (x<9) str="[0" + (x+1).toString() + "]...........";
    else str="[" + (x+1).toString() + "]...........";

    str+=win.toString()+"-"+loss.toString()+"-"+tie.toString();
    if (win<10 && loss<10 && tie<10) str+="..";
    str+="........."+val0.toString()+" (#"+(getSOSRank(order[x])).toString()+")";
    for (var y=0; y<5-val0.toString().length+2-(getSOSRank(order[x])).toString().length; y++) str+="..";
    str+="........"+val1.toString();
    for (var y=0; y<5-val1.toString().length; y++) str+="..";
    str+="........"+team[order[x]];


    var newDiv = creatediv(str, "ranking"+(x+1).toString());
    target = document.getElementById("ranking" + x);
    if (target) target.parentNode.insertBefore(newDiv, target.nextSibling);
  }
}

function calc() {
  var win, loss, tie, sum, diff=0.0;

  for (var x=0; x<team.length; x++) {
    sum=0.0;
    for (var y=0; y<oppid[x].length; y++) {
      sum+=parseFloat(oldrating[oppid[x][y]-1]);
    }
    sos[x]=parseFloat(sum) / parseFloat(oppid[x].length);
  }

  for (var x=0; x<team.length; x++) {
    win=loss=tie=0;
    for (var y=0; y<record[x].length; y++)
      if (record[x][y]==1) win++;
      else if (record[x][y]==-1) loss++;
      else tie++;
    total=win+loss+tie;

    var rw=parseFloat(win-loss)/2.0 + sos[x]*parseFloat(total);
    rating[x]=parseFloat(rw+1)/parseFloat(total+2);
  }

  for (var x=0; x<team.length; x++) {
    diff += parseFloat(Math.abs(rating[x] - oldrating[x]));
  }

  if (diff < 0.0001) return 1;

  for (var x=0; x<team.length; x++)
    oldrating[x]=rating[x];

  return 0;
}

window.setTimeout( function() {

  var input=document.body.innerHTML, ptr1, ptr2, ptr3, startptr, endptr, id, name, id2, score1, score2;

  ptr1=input.indexOf("\"teaminfo\"", 0);
  if (ptr1<0) ptr1=input.indexOf("teaminfo ", 0);
  endptr=input.indexOf("hidden", ptr1+8);
  endptr=input.indexOf("hidden", ptr1+8);

  while (1) {
     ptr2=input.indexOf("!", ptr1);
     if (ptr2>endptr || ptr2<0) break;
     ptr3=input.indexOf("^", ptr2+1);
     id=parseInt(input.substring(ptr2+1, ptr3));
     ptr2=input.indexOf("^", ptr3+1);
     name=input.substring(ptr3+1, ptr2);
     team[id-1]=name;
     ptr1=ptr2;
  }

  for (var x=0; x<team.length; x++) {
    record[x]=[];
    oppid[x]=[];
  }


  ptr1=startptr=input.indexOf("\"type-X\"", endptr);
  endptr=input.indexOf("\"type-P\"", ptr1+7);
  if (endptr==-1) endptr=input.indexOf("\"type-R\"", ptr1+7);



  while (1) {
    ptr2=input.indexOf("Y!", ptr1);
    if (ptr2>endptr || ptr2<startptr) break;
    ptr3=input.indexOf("^", ptr2+2);
    id=parseInt(input.substring(ptr2+2, ptr3));
    ptr2=input.indexOf("^", ptr3+1);
    id2=parseInt(input.substring(ptr3+1, ptr2));
    ptr3=input.indexOf("^", ptr2+1);
    score1=parseInt(input.substring(ptr2+1, ptr3));
    ptr2=input.indexOf("^", ptr3+1);
    score2=parseInt(input.substring(ptr3+1, ptr2));


    record[id-1][record[id-1].length]=(score1 > score2) ? 1 : ((score1 < score2) ? -1 : 0);
    oppid[id-1][oppid[id-1].length]=id2;
    record[id2-1][record[id2-1].length]=(score1 < score2) ? 1 : ((score1 > score2) ? -1 : 0);
    oppid[id2-1][oppid[id2-1].length]=id;
    ptr1=ptr2;
  }

  for (ptr1=ptr2=0; ptr2<record.length; ptr2++) {
    if (ptr1!=record[ptr2].length) 
      if (ptr1==0) ptr1=record[ptr2].length;
      else if (ptr1<record[ptr2].length) ptr1=record[ptr2].length;
  }

  if (ptr1==0) run=1;

  var target = document.getElementById('imonstatus');
  var buttontable = document.createElement('table');
  buttontable.setAttribute('cellspacing', '0');
  buttontable.setAttribute('cellpadding', '0');
  buttontable.setAttribute('id', 'rank_button_table');

  var newtr=document.createElement('tr');
  buttontable.appendChild(newtr);
  var newtd1 = document.createElement('td');
  newtd1.setAttribute('colspan', '10');
  var newDiv2 = document.createElement('div');
  newDiv2.align = 'center';
  newDiv2.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Ranking">'; 
  newDiv2.addEventListener('click', function() { if (run==0) ranking(); }, true);
  newtd1.appendChild(newDiv2);
  newtr.appendChild(newtd1);

  if (target) target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(buttontable, 
                                                                target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling);
}, 100);