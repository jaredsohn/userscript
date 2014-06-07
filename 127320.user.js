// ==UserScript==
// @name           Pro Bowl roster
// @namespace      DeepRoute
// @include        http://deeproute.com/deeproute/?js=weekbyweek&*
// @include        http://deeproute.com/deeproute/default.asp?js=weekbyweek&*
// ==/UserScript==

var team=[], teamID=[], conf1=[], conf2=[], run=0, currptr=0, year, league, stats=[2], readphase=0;

function probowl() {

  var input=document.body.innerHTML, ptr1, ptr2, ptr3;

  stats[0]=[];
  stats[1]=[];
  ptr1=input.indexOf("imonyear", 0);
  ptr2=input.indexOf("value=\"", ptr1);
  ptr3=input.indexOf("\"", ptr2+7);
  if (ptr1<0 || ptr2<0 || ptr3<0) { alert("Missing data, reload page......"); return;  }
  year=input.substring(ptr2+7, ptr3);

  ptr1=input.indexOf("imonlg", 0);
  ptr2=input.indexOf("value=\"", ptr1);
  ptr3=input.indexOf("\"", ptr2+7);
  if (ptr1<0 || ptr2<0 || ptr3<0) { alert("Missing data, reload page......"); return; }
  league=input.substring(ptr2+7, ptr3);


  run=1;

  var target = document.getElementById('probowl_button_table');
  var newDiv = document.createElement('div');
  newDiv.setAttribute("id", "probowl_readcount");
  newDiv.innerHTML='0 of ' + teamID.length + ' teams';
  if (target) target.parentNode.insertBefore(newDiv, target.nextSibling);

  readplayerstats();
}

function FindPlayer(instats, inname, inteam, inpos) {

  for (var x=0; x<instats.length; x++)
    if (instats[x][0][0]==inname && instats[x][0][1]==inteam && instats[x][0][2]==inpos)
      return x;
  return -1;
}

function selection(pos, players) {

  var list=[], score;

  for (var x=0; x<players.length; x++) {

    if (players[x][0][2] == pos) {

      if (pos=="QB") {
        score=parseFloat(players[x][0][7])/18.0 + parseFloat(players[x][0][12])*10.1 - parseFloat(players[x][0][13])*8.5 -
              parseFloat(players[x][0][15])*1.5 + parseFloat(players[x][0][9]) /10 + parseFloat(players[x][0][17])*2 +
              parseFloat(players[x][0][8])*3 + (parseFloat(players[x][0][17]) < 80 ? -1000 : 0) + (parseFloat(players[x][0][17]) > 99.9 ? +200 : 0) +
              (parseFloat(players[x][0][7]) < 150 ? -300000 : 0) - parseFloat(players[x][0][33])*4.1;
        players[x][0][3]=parseFloat(score)*parseFloat(players[x][0][11]);
       }
      else if (pos=="RB")
        players[x][0][3]=parseFloat(players[x][0][23])/10 + parseFloat(players[x][0][26])*6.0 + parseFloat(players[x][0][37])*0.25 -
                      parseFloat(players[x][0][34])*0.25 + parseFloat(players[x][0][27])* 1.0 + parseFloat(players[x][0][43])/10 +
                      parseFloat(players[x][0][44])* 6.0 - parseFloat(players[x][0][40])* 1.1 - parseFloat(players[x][0][33])*3;
      else if (pos=="FB")
        players[x][0][3]=parseFloat(players[x][0][23])/10 + parseFloat(players[x][0][26])*5.0 + parseFloat(players[x][0][37])*0.50 -
                      parseFloat(players[x][0][34])*2.5 + parseFloat(players[x][0][27])* 2.0 + parseFloat(players[x][0][43]) / 10 +
                      parseFloat(players[x][0][44])* 5.0 - parseFloat(players[x][0][40])* 2.1 - parseFloat(players[x][0][33])*4;
      else if (pos=="WR")
        players[x][0][3]=parseFloat(players[x][0][43])/9.5 + parseFloat(players[x][0][44]) * 8.2 + parseFloat(players[x][0][46]) * 0.15 +
                       parseFloat(players[x][0][39]) * 1.5 - parseFloat(players[x][0][40]) * 3 - parseFloat(players[x][0][50]) * 4.2;
      else if (pos=="TE")
        players[x][0][3]=parseFloat(players[x][0][43])/10.0 + parseFloat(players[x][0][44]) * 6.0 + parseFloat(players[x][0][46]) * 0.25 -
                      parseFloat(players[x][0][40]) *1.8 - parseFloat(players[x][0][50]) * 3.2 - parseFloat(players[x][2][21]) * 2.2 +
                      parseFloat(players[x][0][37]) * .4 + parseFloat(players[x][2][22]) * parseFloat(players[x][2][23]) / 200.0;
      else if (pos=="C")
        players[x][0][3]= parseFloat(players[x][2][17])* (parseFloat(players[x][2][23])-7.5) / 10.0 +
                          (1.0 - parseFloat(players[x][2][20]) * 10.0 / 100.0) * (parseFloat(players[x][2][18])-300.0) / 9.0 +
                          parseFloat(players[x][2][17])/8.0 + (players[x][2][17] < 150 ? -10000 : 0) + (players[x][2][18] < 150 ? -10000 : 0) -
                          parseFloat(players[x][2][21]) * 2.2 - parseFloat(players[x][2][19]) * 3.2;
      else if (pos=="G")
        players[x][0][3]= parseFloat(players[x][2][17])* (parseFloat(players[x][2][23])-7.5) / 10.0 +
                          (1.0 - parseFloat(players[x][2][20]) * 20.0 / 100.0) * (parseFloat(players[x][2][18])-300.0) / 9.0 +
                          parseFloat(players[x][2][17])/8.0 + (players[x][2][17] < 150 ? -10000 : 0) + (players[x][2][18] < 150 ? -10000 : 0) +
                          (players[x][2][22] < 30 ? -10000 : 0) - parseFloat(players[x][2][21]) * 2.2 - parseFloat(players[x][2][19]) * 3.2;
      else if (pos=="T")
        players[x][0][3]= (parseFloat(players[x][2][17])-100.0) * (parseFloat(players[x][2][23])-6.7) / 10.0 +
                          (1.0 - parseFloat(players[x][2][20]) * 35.0 / 100.0) * (parseFloat(players[x][2][18])-300.0) / 5.0 +
                          parseFloat(players[x][2][17])/8.0 + (players[x][2][17] < 150 ? -10000 : 0) + (players[x][2][18] < 150 ? -10000 : 0) +
                          (players[x][2][22] < 30 ? -10000 : 0) - parseFloat(players[x][2][21]) * 2.2 - parseFloat(players[x][2][19]) * 5.2;
      else if (pos=="DE")
        players[x][0][3]= parseFloat(players[x][1][8]) * 0.5 + parseFloat(players[x][1][11]) * 10.5 + parseFloat(players[x][1][9])* 4.0 +
                          parseFloat(players[x][1][15])* 6.0 + parseFloat(players[x][1][21]) * 6.0 + parseFloat(players[x][1][18]) * 6.0 +
                          parseFloat(players[x][1][19]) * 4.8 + parseFloat(players[x][1][17]) * 10.0 - parseFloat(players[x][1][10]) * 3.0;
      else if (pos=="DT")
        players[x][0][3]= parseFloat(players[x][1][8]) * 0.8 + parseFloat(players[x][1][11]) * 10.5 + parseFloat(players[x][1][9])* 4.5 +
                          parseFloat(players[x][1][15])* 6.0 + parseFloat(players[x][1][21]) * 6.0 + parseFloat(players[x][1][18]) * 6.0 +
                          parseFloat(players[x][1][19]) * 4.8 + parseFloat(players[x][1][17]) * 10.0 - parseFloat(players[x][1][10]) * 3.0;
      else if (pos=="LB")
        players[x][0][3]= parseFloat(players[x][1][8]) * 0.6 + parseFloat(players[x][1][11]) * 10.5 + parseFloat(players[x][1][9])* 3.5 +
                          parseFloat(players[x][1][15])* 6.0 + parseFloat(players[x][1][21]) * 6.0 + parseFloat(players[x][1][18]) * 6.0 +
                          parseFloat(players[x][1][13])* 1 + parseFloat(players[x][1][14])* 2.0 - parseFloat(players[x][1][22])* 5.0 +
                          parseFloat(players[x][1][19]) * 4.8 + parseFloat(players[x][1][17]) * 8.0 - parseFloat(players[x][1][10]) * 4.5;
      else if (pos=="CB")
        players[x][0][3]= parseFloat(players[x][1][8]) * 0.15 + parseFloat(players[x][1][11]) * 1.8 + parseFloat(players[x][1][9])* 1.5 +
                          parseFloat(players[x][1][15])* 4.0 + parseFloat(players[x][1][21]) * 5.0 + parseFloat(players[x][1][18]) * 3.0 +
                          parseFloat(players[x][1][13]) + parseFloat(players[x][1][14])* 2.0 - parseFloat(players[x][1][22])* 5.0 +
                          parseFloat(players[x][1][19]) * 2.1 + parseFloat(players[x][1][17]) * 5.0 - parseFloat(players[x][1][10]) * 5.5;
      else if (pos=="S")
        players[x][0][3]= parseFloat(players[x][1][8]) * 0.55 + parseFloat(players[x][1][11]) * 8.5 + parseFloat(players[x][1][9])* 5.5 +
                          parseFloat(players[x][1][15])* 6.0 + parseFloat(players[x][1][21]) * 6.0 + parseFloat(players[x][1][18]) * 6.0 +
                          parseFloat(players[x][1][13])* .75 + parseFloat(players[x][1][14])* 2.0 - parseFloat(players[x][1][22])* 5.0 +
                          parseFloat(players[x][1][19]) * 4.8 + parseFloat(players[x][1][17]) * 6.0 - parseFloat(players[x][1][10]) * 3.5;
      else if (pos=="K")
        players[x][0][3]= parseFloat(players[x][3][5]) / 2.0 - (parseFloat(players[x][3][6])-parseFloat(players[x][3][5])) * 5.0 +
                          parseFloat(players[x][3][8]) * 3.0 - (parseFloat(players[x][3][9])-parseFloat(players[x][3][8])) * 3.5 +
                          (parseFloat(players[x][3][11]) - 40.0)*1.1;
      else if (pos=="P")
        players[x][0][3]= parseFloat(players[x][3][22]) / 200.0 + parseFloat(players[x][3][16]) * 1.2 + parseFloat(players[x][3][19]) * 4.0 +
                          parseFloat(players[x][3][20]) * 7.0;

      list[list.length]=players[x];
    }
    else if (pos=="KRET") {
      players[x][0][3]= parseFloat(players[x][2][7]) * 4.0 + parseFloat(players[x][2][6]) / 2.0 - (parseInt(players[x][2][6]) <= 15)* 1000.0
                        + parseFloat(players[x][2][8]) * 3.5;
      list[list.length]=players[x];
    }
    else if (pos=="PRET") {
      players[x][0][3]= parseFloat(players[x][2][11]) * 17.0 + parseFloat(players[x][2][10]) / 2.0 - (parseInt(players[x][2][10]) <= 15)* 1000.0
                        + parseFloat(players[x][2][12]) * 3.5;
      list[list.length]=players[x];
    }

  }

  for (var x=0; x<list.length; x++)
    for (var y=x+1; y<list.length; y++)
      if (list[x][0][3] < list[y][0][3]) {
         var tmp=list[x];
         list[x]=list[y];
         list[y]=tmp;
      }

  if (list.length>0) {

    var target = document.getElementById('probowl_button_table'), newdiv;

    if (pos=="QB")
      for (var x=0; x<3; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> ATT: <b>" + list[x][0][6] + "</b>, CMP: <b>" + list[x][0][7] +
                         "</b>, PCT: <b>" + list[x][0][8] + "</b>, YRD: <b>" + list[x][0][9] + "</b>, TD: <b>" + list[x][0][12] +
                         "</b>, INT: <b>" + list[x][0][13] +"</b>, RATE: <b>" + list[x][0][17] + "</b>, SACK: <b>" + list[x][0][15] +
                         "</b>, PYPC: <b>" + list[x][0][11] +"</b>" + "</b>, FMBL: <b>" + list[x][0][33] +"</b>","QB"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="RB")
      for (var x=0; x<3; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> Rush: <b>" + list[x][0][22] +
                         "</b>, YRD: <b>" + list[x][0][23] + "</b>, YPC: <b>" + list[x][0][24] + "</b>, Rush TD: <b>" + list[x][0][26] +
                         "</b>, Loss: <b>" + list[x][0][34] +    "</b>, Brkn Tckl: <b>" + list[x][0][27] +
                         "</b>, FMBL: <b>" + list[x][0][33] + "</b>, REC: <b>" + list[x][0][37] + "</b>, DRP: <b>" + list[x][0][40] +
                         "</b>, YRD: <b>" + list[x][0][43] + "</b>, REC TD: <b>" + list[x][0][44] + "</b>","RB"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="FB")
      for (var x=0; x<1; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> Rush: <b>" + list[x][0][22] +
                         "</b>, YRD: <b>" + list[x][0][23] + "</b>, YPC: <b>" + list[x][0][24] + "</b>, Rush TD: <b>" + list[x][0][26] +
                         "</b>, Loss: <b>" + list[x][0][34] +    "</b>, Brkn Tckl: <b>" + list[x][0][27] +
                         "</b>, FMBL: <b>" + list[x][0][33] +"</b>, REC: <b>" + list[x][0][37] + "</b>, DRP: <b>" + list[x][0][40] +
                         "</b>, YRD: <b>" + list[x][0][43] + "</b>, REC TD: <b>" + list[x][0][44] + "</b>","FB"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="WR")
      for (var x=0; x<4; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> REC: <b>" + list[x][0][37] +
                         "</b>, TGT: <b>" + list[x][0][38] + "</b>, DRP: <b>" + list[x][0][40] + "</b>, YPC: <b>" + list[x][0][41] +
                         "</b>, YRD: <b>" + list[x][0][43] + "</b>, TD: <b>" + list[x][0][44] + "</b>, CTCH PCT: <b>" + list[x][0][39] +
                         "</b>, YAC: <b>" + list[x][0][46] + "</b>, FMBL: " + list[x][0][50] + "</b>","WR"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
   else if (pos=="TE")
      for (var x=0; x<2; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> REC: <b>" + list[x][0][37] +
                         "</b>, TGT: <b>" + list[x][0][38] + "</b>, DRP: <b>" + list[x][0][40] + "</b>, YPC: <b>" + list[x][0][41] +
                         "</b>, YRD: <b>" + list[x][0][43] + "</b>, TD: <b>" + list[x][0][44] + "</b>, YAC: <b>" + list[x][0][46] +
                         "</b>, FMBL: <b>" + list[x][0][50] + "</b>, ORP: <b>" + list[x][2][17] + "</b>, RBLK: <b>" + list[x][2][22] +
                         "</b>, GRADE: <b>" + list[x][2][23] + "</b>, F-Starts: <b>" + list[x][2][21] + "</b>", "TE"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="C")
      for (var x=0; x<2; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> OPP: <b>" + list[x][2][18] +
                         "</b>, SkAl: <b>" + list[x][2][19] + "</b>, PCT: <b>" + list[x][2][20] +
                         "</b>, ORP: <b>" + list[x][2][17] + "</b>, F Start: <b>" + list[x][2][21] +
                         "</b>, RBLK: <b>" + list[x][2][22] + "</b>, GRADE: <b>" + list[x][2][23] + "</b>", "C"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="G")
      for (var x=0; x<3; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> OPP: <b>" + list[x][2][18] +
                         "</b>, SkAl: <b>" + list[x][2][19] + "</b>, PCT: <b>" + list[x][2][20] +
                         "</b>, F Start: <b>" + list[x][2][21] + "</b>, ORP: <b>" + list[x][2][17] +
                         "</b>, RBLK: <b>" + list[x][2][22] + "</b>, GRADE: <b>" + list[x][2][23] + "</b>", "G"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="T")
      for (var x=0; x<3; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> OPP: <b>" + list[x][2][18] +
                         "</b>, SkAl: <b>" + list[x][2][19] + "</b>, PCT: <b>" + list[x][2][20] +
                         "</b>, ORP: <b>" + list[x][2][17] +  "</b>, F Start: <b>" + list[x][2][21] +
                         "</b>, RBLK: <b>" + list[x][2][22] + "</b>, GRADE: <b>" + list[x][2][23] + "</b>", "T"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="DE")
      for (var x=0; x<3; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> TCK: <b>" + list[x][1][8] +
                         "</b>, MTCK: <b>" + list[x][1][10] + "</b>, TFL: <b>" + list[x][1][9] +
                         "</b>, SACK: <b>" + list[x][1][11] + "</b>, PDEF: <b>" + list[x][1][14] + "</b>, INT: <b>" + list[x][1][15] +
                         "</b>, FFUM: <b>" + list[x][1][18] + "</b>, FREC: <b>" + list[x][1][19] +
                         "</b>, FTD: <b>" + list[x][1][21] + "</b>, Pen: <b>" + list[x][1][22] +"</b>", "DE"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="DT")
      for (var x=0; x<3; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> TCK: <b>" + list[x][1][8] +
                         "</b>, MTCK: <b>" + list[x][1][10] + "</b>, TFL: <b>" + list[x][1][9] +
                         "</b>, SACK: <b>" + list[x][1][11] + "</b>, PDEF: <b>" + list[x][1][14] + "</b>, INT: <b>" + list[x][1][15] +
                         "</b>, FFUM: <b>" + list[x][1][18] + "</b>, FREC: <b>" + list[x][1][19] +
                         "</b>, FTD: <b>" + list[x][1][21] + "</b>, Pen: <b>" + list[x][1][22] +"</b>", "DT"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="LB")
      for (var x=0; x<4; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> TCK: <b>" + list[x][1][8] +
                         "</b>, MTCK: <b>" + list[x][1][10] + "</b>, TFL: <b>" + list[x][1][9] +
                         "</b>, SACK: <b>" + list[x][1][11] + "</b>, PDEF: <b>" + list[x][1][14] + "</b>, INT: <b>" + list[x][1][15] +
                          "</b>, GCOV: <b>" + list[x][1][13] +  "</b>, ITD: <b>" + list[x][1][17] +
                         "</b>, FFUM: <b>" + list[x][1][18] + "</b>, FREC: <b>" + list[x][1][19] +
                         "</b>, FTD: <b>" + list[x][1][21] + "</b>, Pen: <b>" + list[x][1][22] +"</b>", "LB"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="CB")
      for (var x=0; x<4; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> TCK: <b>" + list[x][1][8] +
                        "</b>, MTCK: <b>" + list[x][1][10] + "</b>, TFL: <b>" + list[x][1][9] +
                         "</b>, SACK: <b>" + list[x][1][11] + "</b>, PDEF: <b>" + list[x][1][14] + "</b>, INT: <b>" + list[x][1][15] +
                          "</b>, GCOV: <b>" + list[x][1][13] +  "</b>, ITD: <b>" + list[x][1][17] +
                         "</b>, FFUM: <b>" + list[x][1][18] + "</b>, FREC: <b>" + list[x][1][19] +
                         "</b>, FTD: <b>" + list[x][1][21] + "</b>, Pen: <b>" + list[x][1][22] +"</b>", "CB"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="S")
      for (var x=0; x<3; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> TCK: <b>" + list[x][1][8] +
                        "</b>, MTCK: <b>" + list[x][1][10] + "</b>, TFL: <b>" + list[x][1][9] +
                         "</b>, SACK: <b>" + list[x][1][11] + "</b>, PDEF: <b>" + list[x][1][14] + "</b>, INT: <b>" + list[x][1][15] +
                          "</b>, GCOV: <b>" + list[x][1][13] +  "</b>, ITD: <b>" + list[x][1][17] +
                         "</b>, FFUM: <b>" + list[x][1][18] + "</b>, FREC: <b>" + list[x][1][19] +
                         "</b>, FTD: <b>" + list[x][1][21] + "</b>, Pen: <b>" + list[x][1][22] +"</b>", "S"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="K")
      for (var x=0; x<1; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> XPM: <b>" + list[x][3][5] + "</b>, XPA: <b>"+ list[x][3][6]+
                         "</b>, XPCT: <b>" + list[x][3][7] + "</b>, FG: <b>"+ list[x][3][8] + "</b>, FGA: <b>" + list[x][3][9] +
                         "</b>, FPCT: <b>" + list[x][3][10] + "</b>, LONG: <b>" + list[x][3][11] +  "</b>", "K"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="P")
      for (var x=0; x<1; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> PUNT: <b>" + list[x][3][14] + "</b>, YRD: <b>" + list[x][3][15]+
                         "</b>, AVG: <b>" + list[x][3][16] + "</b>, NET: <b>" + list[x][3][17] + "</b>, IN20: <b>" + list[x][3][19] +
                         "</b>, IN5: <b>" + list[x][3][20] + "</b>, NET YRD: <b>" + list[x][3][22] + "</b>", "P"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="KRET")
      for (var x=0; x<1; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> KRET: <b>" + list[x][2][6] + "</b>, KAVG: <b>" + list[x][2][7] +
                         "</b>, KOTD: <b>" + list[x][2][8] + "</b>", "KRET"+x);
        target.parentNode.insertBefore(newdiv, target);
      }
    else if (pos=="PRET")
      for (var x=0; x<1; x++) {
        newdiv=creatediv("<b>"+list[x][0][0] + " - " + list[x][0][1] + "</b> PRET: <b>" + list[x][2][10] + "</b>, PAVG: <b>" + list[x][2][11] +
                         "</b>, PTD: <b>" + list[x][2][12] + "</b>", "KRET"+x);
        target.parentNode.insertBefore(newdiv, target);
      }

  }

}


function creatediv(str, idattr)
{
  var tmp = document.createElement('div');
  tmp.setAttribute("id", idattr);
  tmp.innerHTML = str;
  return tmp;
}



function parsePlayerStats(intext) {

  var newDiv = document.getElementById('probowl_readcount'), ptr1, ptr2, ptr3, ptr4, ptr5, startptr, endptr, currteam=team[currptr-1];
  var stop=0, player, pos, tmp0, tmp, val, index, stats_type;
  newDiv.innerHTML=currptr.toString() + ' of ' + teamID.length + ' teams';

  startptr=intext.indexOf("player1", 0);
  endptr=intext.indexOf("nbsp", startptr);

  if (startptr>=0 && endptr>=0 && endptr > startptr) {

      ptr1=startptr;

      while (1) {
        ptr2=intext.indexOf("player", ptr1+6);
        if (ptr2<0 || ptr2 > endptr) {
          stop=1;
          ptr2=endptr;
        }
        ptr3=intext.indexOf("*", ptr1);
        ptr4=intext.indexOf("_", ptr3+1);
        player=intext.substring(ptr3+1, ptr4);
        ptr3=intext.indexOf("*", ptr4+1);
        pos=intext.substring(ptr4+1, ptr3);

        if (currptr-1 < teamID.length/2)
          index=FindPlayer(stats[0], player, currteam, pos);
        else
          index=FindPlayer(stats[1], player, currteam, pos);

        if (index==-1) {
          tmp0=new Array (4);
          for (var z=0; z<4; z++) {
            tmp=new Array (4);
            tmp[0]=player;
            tmp[1]=currteam;
            tmp[2]=pos;
            tmp[3]=0;
            tmp0[z]=tmp;
          }
          tmp=tmp0[readphase];
        }
        else {
          if (currptr-1 < teamID.length/2) tmp=stats[0][index][readphase];
          else tmp=stats[1][index][readphase];
        }

        while (1) {
          ptr4=intext.indexOf("!", ptr3);
          if (ptr4<0 || ptr4 > ptr2) break;
          ptr5=intext.indexOf("^", ptr4+1);
          val=intext.substring(ptr4+1, ptr5);
          tmp[tmp.length]=val;
          ptr3=ptr5;
        }

        if (index==-1) {
          if (currptr-1 < teamID.length/2) stats[0][stats[0].length]=tmp0;
          else stats[1][stats[1].length]=tmp0;
        }

        if (stop==1) break;
        ptr1=ptr2;
      }
  }

  if (readphase<3) {

    if (currptr > teamID.length) {
      var newDiv = document.getElementById('probowl_readcount');
      newDiv.innerHTML='generating Pro Bowl Roster......';
    }

    if (readphase==0) stats_type='d';
    if (readphase==1) stats_type='s';
    if (readphase==2) stats_type='k';

    readphase++;


    GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://deeproute.com/deeproute/?js=myteamstats&myleagueno=' + league + '&myteamno=' + teamID[currptr-1] + '&year=' + year + '&whichone=' + stats_type + '&seasontype=R',
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(detail) {
          parsePlayerStats(detail.responseText);
      },
    });
  }
  else if (currptr < teamID.length) readplayerstats();
  else {

    var newDiv = document.getElementById('probowl_readcount');
    newDiv.innerHTML='&nbsp;';

    for (var x=0; x<2; x++)
      for (var y=0; y<stats[x].length; y++)
        for (var z=0; z<4; z++)
          for (var w=stats[x][y][z].length; w<80; w++)
            stats[x][y][z][w]=0;


    var target = document.getElementById('probowl_button_table'), newdiv;

    for (var x=0; x<2; x++) {

      newdiv=creatediv("&nbsp;", "space"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("&nbsp;", "space0"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("&nbsp;", "space01"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("&nbsp;", "space02"+x);
      target.parentNode.insertBefore(newdiv, target);
      if (x==0) newdiv=creatediv("<b><<<<< AFC/Democratic Conference >>>>></b>", "heading0"+x);
      else  newdiv=creatediv("<b><<<<< NFC/Republic Conference >>>>></b>", "heading0"+x);
      target.parentNode.insertBefore(newdiv, target);

      newdiv=creatediv("&nbsp;", "space1"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Quarterback:", "heading1"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("QB", stats[x]);

      newdiv=creatediv("&nbsp;", "space2"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Running Back:", "heading2"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("RB", stats[x]);

      newdiv=creatediv("&nbsp;", "space3"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Full Back:", "heading3"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("FB", stats[x]);

      newdiv=creatediv("&nbsp;", "space4"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Wide Receiver:", "heading4"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("WR", stats[x]);

      newdiv=creatediv("&nbsp;", "space5"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Tight End:", "heading5"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("TE", stats[x]);

      newdiv=creatediv("&nbsp;", "space6"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Center:", "heading6"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("C", stats[x]);

      newdiv=creatediv("&nbsp;", "space7"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Guard:", "heading7"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("G", stats[x]);

      newdiv=creatediv("&nbsp;", "space8"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Tackle:", "heading8"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("T", stats[x]);

      newdiv=creatediv("&nbsp;", "space9"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Defensive End:", "heading9"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("DE", stats[x]);

      newdiv=creatediv("&nbsp;", "space10"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Defensive Tackle:", "heading10"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("DT", stats[x]);


      newdiv=creatediv("&nbsp;", "space11"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Lineback:", "heading11"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("LB", stats[x]);

      newdiv=creatediv("&nbsp;", "space12"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Cornerback:", "heading12"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("CB", stats[x]);

      newdiv=creatediv("&nbsp;", "space13"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Safety", "heading13"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("S", stats[x]);

      newdiv=creatediv("&nbsp;", "space14"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Kicker", "heading14"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("K", stats[x]);

      newdiv=creatediv("&nbsp;", "space15"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Punter", "heading15"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("P", stats[x]);

      newdiv=creatediv("&nbsp;", "space16"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Kickoff Returner", "heading16"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("KRET", stats[x]);

      newdiv=creatediv("&nbsp;", "space17"+x);
      target.parentNode.insertBefore(newdiv, target);
      newdiv=creatediv("** Punt Returner", "heading17"+x);
      target.parentNode.insertBefore(newdiv, target);
      selection("PRET", stats[x]);
    }

  }


}

function readplayerstats() {

  readphase=0;

  GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://deeproute.com/deeproute/?js=myteamstats&myleagueno=' + league + '&myteamno=' + teamID[currptr++] + '&year=' + year,
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(detail) {
          parsePlayerStats(detail.responseText);
      },
    });

}

window.setTimeout( function() {

  var input=document.body.innerHTML, ptr1, ptr2, ptr3, startptr, endptr, name, id;

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
    teamID[teamID.length]=id;
    team[team.length]=name;
    ptr1=ptr2;
  }

  for (var x=0; x<team.length; x++)
    if (x<team.length/2) conf1[conf1.length]=team[x];
    else conf2[conf2.length]=team[x];

  ptr1=startptr=input.indexOf("\"type-X\"", endptr);
  endptr=input.indexOf("\"type-R\"", ptr1+7);

  var target = document.getElementById('imonstatus');
  var buttontable = document.createElement('table');
  buttontable.setAttribute('cellspacing', '0');
  buttontable.setAttribute('cellpadding', '0');
  buttontable.setAttribute('id', 'probowl_button_table');

  var newtr=document.createElement('tr');
  buttontable.appendChild(newtr);
  var newtd1 = document.createElement('td');
  newtd1.setAttribute('colspan', '10');
  var newDiv2 = document.createElement('div');
  newDiv2.align = 'center';
  newDiv2.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Pro Bowl">';
  newDiv2.addEventListener('click', function() { if (run==0) probowl(); }, true);
  newtd1.appendChild(newDiv2);
  newtr.appendChild(newtd1);

  if (target) target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(buttontable,
                                                                target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling);
}, 300);