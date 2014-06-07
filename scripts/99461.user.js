// ==UserScript==
// @name           Game Summary
// @namespace      Deep Route
// @include        http://deeproute.com/deeproute/default.asp?js=loggerinc&viewpbp=*
// @include        http://deeproute.com/deeproute/?js=loggerinc&viewpbp=*
// ==/UserScript==

var teamabbr=[], stats=[], stats_saved=[], counter=0, run=0;

function backupStats() {
  for (var x=0; x<2; x++)
     for (var y=0; y<stats[x].length; y++)
       stats_saved[x][y]=stats[x][y];
}

function restoreStats() {
  for (var x=0; x<2; x++)
     for (var y=0; y<stats[x].length; y++)
       stats[x][y]=stats_saved[x][y];
}


function findAbbr(inabbr) {
  for (var x=0; x<teamabbr.length; x++)
    if (teamabbr[x]==inabbr) return x;

  return -1;
}

function clean(innum) {
  var outnum= Math.round(parseFloat(innum)*100.0) / 100.0;
  return outnum;
}

function addtr(intable, incol, isBold, colspan) {

  var tr1 = document.createElement("tr"), color;
  intable.appendChild(tr1);

  if (colspan>0 || isBold==1) color='#66FF66';
  else if (counter++%2==0) color='#FFFFDD';
  else color='#EEFFFF';

  for (var x=0; x<incol.length; x++) {

    var td1 = document.createElement("td");
    if (colspan>0 && x==colspan-2) {
      td1.setAttribute('colspan', colspan-1);
    }
    td1.setAttribute('align','center');
    var newDiv = document.createElement('div');
    newDiv.innerHTML=incol[x];
    td1.appendChild(newDiv);
    if (isBold || x==0) td1.setAttribute('style', 'font-weight: bold;');
    td1.setAttribute('bgcolor', color);

    tr1.appendChild(td1);
    if (colspan>0 && x==colspan-2) break;
  }

}

function constructCols(inname, str1, str2) {

  var cols=[];
  cols[0]=inname;
  cols[1]=str1;
  cols[2]=str2;
  return cols;
}


function getPercStr(num1, num2) {
  var perc;

  if (num2==0) perc="N/A";
  else perc=(Math.round( parseFloat(num1)*100.0 / parseFloat(num2) )).toString()+"%";

  return perc;
}

function getAvgStr(num1, num2) {
  var avg;

  if (num2==0) avg="N/A";
  else avg=(Math.round( parseFloat(num1)*100.0 / parseFloat(num2) ) / 100.0 ).toString() + " yd";

  return avg;
}


function PassStr(num1, num2) {

  return num1.toString() + "/" + num2.toString() + " (" + getPercStr(num1, num2) + ")";
}


function showboxscore(intext) {

  var currptr, endptr, delay=0, currid=0, elapsed=0, stop=0, interception=0, lossyard=0, scramble, complete, yard, dumpoff, attyard;
  var throwaway, negatt, plays=0, oldid=0, fumble=0, returnyard=0, sackyard, FG, penalty, pyard, down, prevdown, oldid2, check=0;
  var dropped, ptr0, inplayPenalty, toAdd, addsec, adddown, sacked, posplay=0, skip, tmp1, tmp2, puntyard, ptr1, ptr2, ptr3, ptr4, ptr5;
  var rollback, nextptr;

  if (run==1) return;
  run=1;

  for (var x=0; x<2; x++) {
    var tmp=new Array(67);
    for (var y=0; y<67; y++)
      tmp[y]=0;
    stats[x]=tmp;

    var tmp=new Array(67);
    for (var y=0; y<67; y++)
      tmp[y]=0;
    stats_saved[x]=tmp;

  }

  endptr=intext.indexOf("><b>End of game");
  currptr=intext.indexOf("</b> wins the flip");


  while (1) {

    plays++;
    lossyard=yard=complete=scramble=dumpoff=attyard=throwaway=negatt=dropped=inplayPenalty=toAdd=0;
    rollback=addsec=sacked=skip=0;

    ptr0=intext.indexOf("was allowed to run off", currptr);
    ptr1=intext.indexOf("The play required ", currptr);
    ptr2=intext.indexOf(" return time took ", currptr);

    if ((ptr1<0 || ptr1>endptr) && (ptr2<0 || ptr2>endptr)) { stop=1; ptr1=endptr; }

    if (stop==0 && ((ptr1<0 || ptr1>endptr) || (ptr2>=0 && ptr2<endptr && ptr2<ptr1))) ptr1=ptr2;

    if ((ptr0>=0 && ptr0<endptr) && (stop==1 || ptr0<ptr1)) {
      ptr2=intext.lastIndexOf(">", ptr0);
      ptr3=intext.indexOf(" seconds", ptr2);
      toAdd=1;
      addsec=parseInt(intext.substring(ptr2+1, ptr3));
      ptr1=ptr0;
      stop=0;
    }

    ptr2=intext.indexOf("was returned ", currptr);
    if (ptr2>=0 && ptr2<ptr1) {
       ptr3=intext.indexOf(" yards", ptr2+13);
       returnyard=parseInt(intext.substring(ptr2+13, ptr3));
    }      

    ptr2=intext.indexOf("2 Point Conversion", currptr);
    if (ptr2>=0 && ptr2<ptr1) {
         skip=1;
         currptr=intext.lastIndexOf("2 Point Conversion", ptr1);
    }

    ptr2=intext.indexOf("Hold up.. there's a flag on the previous play", currptr);
    ptr3=intext.indexOf("Intentional Grounding", currptr);

    if ((ptr2>=0 && ptr2<ptr1) && (ptr3<0 || ptr3>ptr1)) inplayPenalty=1;

    ptr2=intext.indexOf("yard penalty", currptr);
    ptr3=intext.indexOf("Intentional Grounding", currptr);

    if ((ptr2>=0 && ptr2<ptr1) || (ptr3>=0 && ptr3<ptr1)) {
      if (ptr2>=0 && ptr2<ptr1) {
         ptr4=intext.lastIndexOf("supza", ptr2);
         nextptr=ptr2;
      }
      else {
         ptr4=intext.indexOf("supza", ptr3);
         nextptr=ptr3;
      }
      ptr5=intext.indexOf("</span>", ptr4+7);
      pyard=parseFloat(intext.substring(ptr4+7, ptr5));
      ptr4=intext.indexOf("supz", ptr5+6);
      ptr5=intext.indexOf("</span>", ptr4+6);
      pyard+=parseFloat(intext.substring(ptr4+6, ptr5)) / 100.0;

      ptr3=intext.indexOf("<b>declined</b>", currptr);

      if (ptr3<0 || ptr3>ptr1) {
  
        if (inplayPenalty==1) {
            tmp1=stats[0][42];
            tmp2=stats[1][42];
            restoreStats();
            stats[0][42]=tmp1;
            stats[1][42]=tmp2;
            rollback=1;
        }

        ptr3=intext.indexOf("on the defense", currptr);
        ptr4=intext.indexOf("on the DEFENSE", currptr);
        ptr5=intext.indexOf("Defensive Pass Interference", currptr);

        if ((ptr3>=0 && ptr3<ptr1) || (ptr4>=0 && ptr4<ptr1) || (ptr5>=0 && ptr5<ptr1)) {
          stats[1-currid][20]++;
          stats[1-currid][50]=parseFloat(stats[1-currid][50]) + parseFloat(pyard);
          stats[1-currid][22]++;
          stats[1-currid][52]=parseFloat(stats[1-currid][52]) + parseFloat(pyard);
        }

        ptr3=intext.indexOf("on the offense", currptr);
        ptr4=intext.indexOf("on the OFFENSE", currptr);
        ptr5=intext.indexOf("Intentional Grounding", currptr);

        if ((ptr3>=0 && ptr3<ptr1) || (ptr4>=0 && ptr4<ptr1) || (ptr5>=0 && ptr5<ptr1)) {
          stats[currid][20]++;
          stats[currid][50]=parseFloat(stats[currid][50]) + parseFloat(pyard);
          stats[currid][21]++;
          stats[currid][51]=parseFloat(stats[currid][51]) + parseFloat(pyard);
        }

        if (nextptr-currptr < ptr1-nextptr) currptr=nextptr;
     }       
   }

    if (toAdd==1)  stats[currid][42]+=parseInt(addsec);


   ptr2=intext.indexOf("Punt by ", currptr);
   if (ptr2>=0 && ptr2<ptr1) {

      stats[currid][56]++;

      ptr3=intext.indexOf("BLOCKED ", ptr2);
      if (ptr3>=0 && ptr3<ptr1) {
          stats[currid][59]++;
     }
      else {
           ptr4=intext.indexOf("supza", ptr2);
           ptr5=intext.indexOf("</span>", ptr4+7);
           puntyard=parseFloat(intext.substring(ptr4+7, ptr5));
           ptr4=intext.indexOf("supz", ptr5+6);
           ptr5=intext.indexOf("</span>", ptr4+6);
           puntyard+=parseFloat(intext.substring(ptr4+6, ptr5)) / 100.0;

           stats[currid][57]=parseFloat(stats[currid][57]) + parseFloat(puntyard);
           stats[currid][58]=parseFloat(stats[currid][58]) + parseFloat(puntyard);

           ptr3=intext.indexOf("no return", ptr5);
           if (ptr3>=0 && ptr3<ptr1) 
              stats[currid][64]++;

           ptr4=intext.indexOf("touchback", ptr5);
           if (ptr4>=0 && ptr4<ptr1) {
              stats[currid][63]++;
              stats[currid][58]=parseFloat(stats[currid][58]) - 20.0;
           }

           if ((ptr3<0 || ptr3>ptr1) && (ptr4<0 || ptr4>ptr1)) {
              ptr4=intext.indexOf("supza", ptr5);
              ptr5=intext.indexOf("</span>", ptr4+7);
              puntyard=parseFloat(intext.substring(ptr4+7, ptr5));
              ptr4=intext.indexOf("supz", ptr5+6);
              ptr5=intext.indexOf("</span>", ptr4+6);
              puntyard+=parseFloat(intext.substring(ptr4+6, ptr5)) / 100.0;
              stats[currid][58]=parseFloat(stats[currid][58]) - parseFloat(puntyard);
           }
           else ptr5=ptr3;

           ptr2=intext.indexOf("<span style=\"font-size:13", ptr5);
           if (ptr2>0 && ptr2<endptr) {
              ptr3=intext.indexOf("; ", ptr2);
              if (ptr3>0 && ptr3<endptr) {
                   ptr4=intext.indexOf(" ", ptr3+2);
                   if (intext.substring(ptr3+2, ptr4) == "Own") {
                        ptr3=intext.indexOf(")", ptr4+1);
                        if (ptr3>0 && ptr3<endptr) {
                             puntyard=parseInt(intext.substring(ptr4+1, ptr3));
                             if (puntyard<=10) stats[currid][62]++;
                             if (puntyard<=5) stats[currid][61]++;
                             if (puntyard<=1) stats[currid][60]++;
                        }
                   }
              }
           }

      }
   }

    if (interception) {
      interception=0;
      stats[currid][30]+=returnyard;
      returnyard=0;
      ptr2=intext.indexOf(" seconds", ptr1+18);
      elapsed=parseInt(intext.substring(ptr1+18, ptr2));
      stats[1-currid][42]+=elapsed;
    }
    else if (stop==0) {

      ptr2=intext.indexOf("is returned by", currptr);
      ptr3=intext.indexOf("no return", currptr);
      ptr4=intext.indexOf("ouchback", currptr);
      ptr5=intext.indexOf("ickoff by", currptr);

      if ((ptr2>=0 && ptr2<ptr1) || (ptr3>=0 && ptr3<ptr1) || (ptr4>=0 && ptr4<ptr1 && (ptr5<0 || ptr5>ptr1))) {
        if (delay==1) stats[1-currid][42]+=elapsed;
        delay=1;
      }
      else {
        ptr2=intext.lastIndexOf("<span style=\"font-size:13", ptr1);
        if (ptr2>=0 && ptr2<ptr1) {
           ptr3=intext.indexOf("<b>", ptr2);
           ptr4=intext.indexOf("</b>", ptr3+3);
           currid=findAbbr(intext.substring(ptr3+3, ptr4));
        }
        if (delay==1) {
          delay=0;
          stats[currid][42]+=elapsed;
        }

        if (fumble) {
          fumble=0;
          if (currid != oldid) {
            stats[oldid][32]++;
            stats[oldid][33]+=returnyard;
            returnyard=0;
          }
        }
 
      }

      ptr2=intext.indexOf(" seconds", ptr1+18);
      elapsed=parseInt(intext.substring(ptr1+18, ptr2));

      ptr2=intext.indexOf("<b>(", currptr);
      down=parseInt(intext.substring(ptr2+4, ptr2+5));

      if (check==1) {
        if (down!=prevdown || currid!=oldid2) check=0;

        if (down!=prevdown && down==1 && currid==oldid2) {
          if (prevdown==3) stats[currid][24]++;
          if (prevdown==4) stats[currid][26]++;
        }

      }

      ptr3=intext.indexOf("The ball is snapped to", currptr);

      if (check==1 && (ptr3<0 || ptr3>ptr1)) {
        check=0;
        if (down==3) stats[currid][23]--;
        if (down==4) stats[currid][25]--;
      }

      if (check==0 && ptr3>=0 && ptr3<ptr1 && down>=3) {
        prevdown=down;
        check=1;
        oldid2=currid;
        adddown=down;
        if (down==3) stats[currid][23]++;
        if (down==4) stats[currid][25]++;
      }

      ptr3=intext.indexOf("ouchdown", currptr);
      if (check==1 && ptr3>=0 && ptr3<ptr1) {
            check=0;           
           if (down==3) stats[currid][24]++;
           if (down==4) stats[currid][26]++;
      }

      backupStats();

      if (delay==0) {

        if (!toAdd) stats[currid][42]+=elapsed;
        posplay=0;

        ptr3=intext.indexOf(" gains", currptr);
        if (ptr3<0 || ptr3>ptr1) 
          ptr3=intext.indexOf("runs for", currptr);
        if (ptr3<0 || ptr3>ptr1)
          ptr3=intext.indexOf("a gain of", currptr);
        if (ptr3<0 || ptr3>ptr1)
          ptr3=intext.indexOf("loses", currptr);
        if (ptr3<0 || ptr3>ptr1)
          ptr3=intext.indexOf("gaining ", currptr);
        if (ptr3<0 || ptr3>ptr1)
          ptr3=intext.indexOf("losing ", currptr);
        if (ptr3<0 || ptr3>ptr1)
          ptr3=intext.indexOf("a LOSS of", currptr);

        if (ptr3>=0 && ptr3<ptr1) {
           ptr4=intext.indexOf("supza", ptr3);
           ptr5=intext.indexOf("</span>", ptr4+7);
           yard=parseFloat(intext.substring(ptr4+7, ptr5));
           if (intext.substring(ptr4+7, ptr4+8) == '-') lossyard=1;
           if (lossyard) yard*=-1.0;
           ptr4=intext.indexOf("supz", ptr5+6);
           ptr5=intext.indexOf("</span>", ptr4+6);
           yard+=parseFloat(intext.substring(ptr4+6, ptr5)) / 100.0;
        }
        else { yard=0; }

        ptr2=intext.indexOf(" scrambles", currptr);
        if ((ptr2>=0 && ptr2<ptr1)) {
          stats[currid][43]++;
          stats[currid][44]=parseFloat(stats[currid][44]) + parseFloat(yard) * (lossyard ? -1.0 : 1.0);
          scramble=1;
        }

        ptr2=intext.indexOf("SACKED", currptr);

        if ((ptr2>=0 && ptr2<ptr1)) {

          sacked=1;
          ptr3=intext.indexOf(" scrambles", currptr);
          if ((ptr3>=0 && ptr3<ptr1)) {
             stats[currid][48]++;
             sackyard=parseFloat(yard);
             stats[currid][49]=parseFloat(stats[currid][49]) + sackyard;
          }
          else {
            ptr4=intext.indexOf("supza", ptr2);
            ptr5=intext.indexOf("</span>", ptr4+7);
            sackyard=parseFloat(intext.substring(ptr4+7, ptr5));
            ptr4=intext.indexOf("supz", ptr5+6);
            ptr5=intext.indexOf("</span>", ptr4+6);
            sackyard+=parseFloat(intext.substring(ptr4+6, ptr5)) / 100.0;
          }
          stats[currid][27]++;
          stats[currid][28]=parseFloat(stats[currid][28]) + sackyard;
        }

        ptr2=intext.indexOf("spikes the ball", currptr);
        if (ptr2>=0 && ptr2<ptr1) {
            stats[currid][0]++;
            stats[currid][65]++;
        }


        ptr2=intext.indexOf("has the quarterback take a knee", currptr);
        if (ptr2>=0 && ptr2<ptr1) {
            stats[currid][13]++;
            stats[currid][14]-=1.0;
            stats[currid][54]++;
        }

        ptr2=intext.indexOf("Handoff to", currptr);
        ptr3=intext.indexOf("keeps it and", currptr);

        if ((ptr2>=0 && ptr2<ptr1) || (ptr3>=0 && ptr3<ptr1) || (scramble==1 && sacked==0)) {

           if (yard>0 && lossyard==0) posplay=1;

           stats[currid][13]++;
           stats[currid][14]=parseFloat(stats[currid][14])+parseFloat(yard)*(lossyard ? -1.0 : 1.0);
           if (lossyard) {
             stats[currid][15]++;
           }
           else {
             if (yard<4.0) stats[currid][16]++;
             else if (yard<8.0) stats[currid][17]++;
             else if (yard<15.0) stats[currid][18]++;
             else stats[currid][19]++;
           }

        }

        ptr2=intext.indexOf("<b>AMAZING</b> catch", currptr);
        ptr3=intext.indexOf(" throwing ", currptr);
        ptr4=intext.indexOf("threw the ball away", currptr);
        ptr5=intext.indexOf(" Pass by", currptr);

        if (scramble==0 && sacked==0 && ((ptr2>=0 && ptr2<ptr1) || (ptr3>=0 && ptr3<ptr1) || (ptr4>=0 && ptr4<ptr1) || (ptr5>=0 && ptr5<ptr1)) ) {

           if (ptr4>=0 && ptr4<ptr1) throwaway=1;

           ptr2=intext.indexOf("DROPPED", currptr);
           if (ptr2>=0 && ptr2<ptr1) {
             stats[currid][53]++;
             dropped=1;
           }

           ptr2=intext.indexOf("yard(s) downfield", currptr);

           if (ptr2>=0 && ptr2<ptr1) {

             ptr4=intext.lastIndexOf("supza", ptr2);
             ptr5=intext.indexOf("</span>", ptr4+7);
             attyard=parseFloat(intext.substring(ptr4+7, ptr5));
             if (intext.substring(ptr4+7, ptr4+8) == '-') negatt=1;
             if (negatt) attyard*=-1.0;
             ptr4=intext.indexOf("supz", ptr5+6);
             ptr5=intext.indexOf("</span>", ptr4+6);
             attyard+=parseFloat(intext.substring(ptr4+6, ptr5)) / 100.0;
           }

           ptr2=intext.indexOf("INCOMPLETE", currptr);
           ptr3=intext.indexOf("incomplete", currptr);
           ptr4=intext.indexOf("INTERCEPTED", currptr);

           if (ptr4>=0 && ptr4<ptr1) {
             interception=1;
             stats[currid][29]++;
           }

           if ((ptr2>=0 && ptr2<ptr1) || (ptr3>=0 && ptr3<ptr1) || (ptr4>=0 && ptr4<ptr1) || dropped==1 || interception==1 || throwaway==1) complete=0;
           else complete=1;

           ptr2=intext.indexOf("dump it off", currptr);
           if (ptr2>=0 && ptr2<ptr1) dumpoff=1;

           if (lossyard==1) stats[currid][55]++;

           stats[currid][0]++;
           if (dropped==0) 
             if (throwaway) stats[currid][47]++;
             else if (negatt) stats[currid][3]++;
             else if (attyard<7.0) stats[currid][4]++;
             else if (attyard<15.0) stats[currid][5]++;
             else if (attyard<35.0) stats[currid][6]++;
             else stats[currid][7]++;

           if (complete==1) {
             stats[currid][1]++;
             stats[currid][2]=parseFloat(stats[currid][2])+parseFloat(yard)*(lossyard ? -1.0 : 1.0);
             if (dropped==0)
               if (negatt) stats[currid][8]++;
               else if (attyard<7.0) stats[currid][9]++;
               else if (attyard<15.0) stats[currid][10]++;
               else if (attyard<35.0) stats[currid][11]++;
               else stats[currid][12]++;
           }

           if (dumpoff==1) {
             stats[currid][45]++;
             if (complete==1) stats[currid][46]=parseFloat(stats[currid][46])+parseFloat(yard)*(lossyard ? -1.0 : 1.0); 
           }

        }

        ptr2=intext.indexOf("FUMBLE!  Recovered", currptr);

        if (ptr2>=0 && ptr2<ptr1) {
          stats[currid][31]++;
          oldid=currid;
          fumble=1;
        }

        ptr2=intext.indexOf("fumble on the handoff", currptr);
        ptr3=intext.indexOf("fumble on the snap", currptr);

        if ((ptr2>=0 && ptr2<ptr1) || (ptr3>=0 && ptr3<ptr1)) {
           stats[currid][13]++;
           stats[currid][16]++;
        }
        
        ptr2=intext.indexOf("field goal attempt", currptr);
        if ((ptr2>=0 && ptr2<ptr1)) {
          ptr4=intext.lastIndexOf("supza", ptr2);
          ptr5=intext.indexOf("</span>", ptr4+7);
          FG=parseFloat(intext.substring(ptr4+7, ptr5));
          ptr4=intext.indexOf("supz", ptr5+6);
          ptr5=intext.indexOf("</span>", ptr4+6);
          FG+=parseFloat(intext.substring(ptr4+6, ptr5)) / 100.0;


          if (FG<30) stats[currid][34]++;
          else if (FG<40) stats[currid][36]++;
          else if (FG<50) stats[currid][38]++;
          else stats[currid][40]++;

          ptr3=intext.indexOf("is good", ptr2);
          if (ptr3>=0 && ptr3<ptr1) {          
            if (FG<30) stats[currid][35]++;
            else if (FG<40) stats[currid][37]++;
            else if (FG<50) stats[currid][39]++;
            else stats[currid][41]++;
          }
          ptr3=intext.indexOf("was BLOCKED", ptr2);
          if (ptr3>=0 && ptr3<ptr1) {          
              stats[currid][66]++;
          }

        }


      }
    }

    if (stop==1) break;
    currptr=ptr1+18;
  }

  for (var x=0; x<2; x++)
    for (var y=0; y<stats[x].length; y++)
      stats[x][y]=clean(stats[x][y]);

  var target = document.getElementById('summary_button_table'), outtable = document.createElement("table");
  outtable.setAttribute("border","1");
  outtable.setAttribute("cellspacing","0");
  outtable.setAttribute('style','width: 100%');
  outtable.setAttribute('id',"summary table");

  var cols=[], perc1, perc2;
  cols[0]="Game Summary";
  cols[1]=teamabbr[0];
  cols[2]=teamabbr[1];

  addtr(outtable, cols, 1, 0);
  var min0=parseInt(stats[0][42] / 60), sec0=stats[0][42] % 60, min1=parseInt(stats[1][42]/60), sec1=stats[1][42]%60;
  addtr(outtable, constructCols("Time of Possession", min0.toString()+ " min " + sec0.toString() + " sec", min1.toString()+ " min " + sec1.toString() + " sec"), 0, 0);
  addtr(outtable, constructCols("Net Yard", clean(stats[0][2]+stats[0][14]).toString()+" yd", clean(stats[1][2]+stats[1][14]).toString()+" yd"), 0, 0);
  addtr(outtable, constructCols("Pass", "", ""), 1, 3);
  addtr(outtable, constructCols("Total Passing Yards", stats[0][2].toString()+" yd", stats[1][2].toString()+" yd"), 0, 0);
  addtr(outtable, constructCols("Total Pass Attempts", stats[0][0], stats[1][0]), 0, 0);
  addtr(outtable, constructCols("Total Pass Completions", stats[0][1], stats[1][1]), 0, 0);
  addtr(outtable, constructCols("Completion Percentage", getPercStr(stats[0][1], stats[0][0]), getPercStr(stats[1][1], stats[1][0])), 0, 0);
  addtr(outtable, constructCols("Yard per Attempt", getAvgStr(stats[0][2], stats[0][0]), getAvgStr(stats[1][2], stats[1][0])), 0, 0);
  addtr(outtable, constructCols("Yard per Completion", getAvgStr(stats[0][2], stats[0][1]), getAvgStr(stats[1][2], stats[1][1])), 0, 0);  
  addtr(outtable, constructCols("Rush", "", ""), 1, 3);
  addtr(outtable, constructCols("Total Rush Yards", stats[0][14].toString()+" yd", stats[1][14].toString()+" yd"), 0, 0);
  addtr(outtable, constructCols("Total Rushes", stats[0][13].toString(), stats[1][13].toString()), 0, 0);
  addtr(outtable, constructCols("Yard per Carry", getAvgStr(stats[0][14], stats[0][13]), getAvgStr(stats[1][14], stats[1][13])), 0, 0);  
  addtr(outtable, constructCols("Pass Breakdown", "", ""), 1, 3);
  addtr(outtable, constructCols("QB spike", stats[0][65], stats[1][65]), 0, 0);
  addtr(outtable, constructCols("Pass dropped", stats[0][53].toString(), stats[1][53].toString()), 0, 0);
  addtr(outtable, constructCols("Throw away", stats[0][47].toString(), stats[1][47].toString()), 0, 0);
  addtr(outtable, constructCols("Pass to behind LOS (<0 yd)", PassStr(stats[0][8], stats[0][3]), PassStr(stats[1][8], stats[1][3])), 0, 0);
  addtr(outtable, constructCols("Short pass (0-7 yd)", PassStr(stats[0][9],stats[0][4]), PassStr(stats[1][9], stats[1][4])), 0, 0);
  addtr(outtable, constructCols("Medium pass (7-15 yd)", PassStr(stats[0][10], stats[0][5]), PassStr(stats[1][10],stats[1][5])), 0, 0);
  addtr(outtable, constructCols("Long  pass (15-35 yd)", PassStr(stats[0][11], stats[0][6]), PassStr(stats[1][11],stats[1][6])), 0, 0);
  addtr(outtable, constructCols("Very long  pass (35+ yd)", PassStr(stats[0][12], stats[0][7]), PassStr(stats[1][12],stats[1][7])), 0, 0);
  addtr(outtable, constructCols("Rush Detail", "", ""), 1, 3);
  addtr(outtable, constructCols("QB Kneels", stats[0][54], stats[1][54]), 0, 0);
  addtr(outtable, constructCols("Rushes for negative yards (<0 yd)", stats[0][15], stats[1][15]), 0, 0);
  addtr(outtable, constructCols("Rushes for short gain (0-4 yd)", stats[0][16], stats[1][16]), 0, 0);
  addtr(outtable, constructCols("Rushes for medium gain (4-8 yd)", stats[0][17], stats[1][17]), 0, 0);
  addtr(outtable, constructCols("Rushes for big gain (8-15 yd)", stats[0][18], stats[1][18]), 0, 0);
  addtr(outtable, constructCols("Rushes for huge gain (15+ yd)", stats[0][19], stats[1][19]), 0, 0);
  addtr(outtable, constructCols("3rd down", "", ""), 1, 3);
  addtr(outtable, constructCols("3rd down conversion", PassStr(stats[0][24], stats[0][23]), PassStr(stats[1][24], stats[1][23])), 0, 0);
  addtr(outtable, constructCols("4th down", "", ""), 1, 3);
  addtr(outtable, constructCols("4th down conversion", PassStr(stats[0][26], stats[0][25]), PassStr(stats[1][26], stats[1][25])), 0, 0);
  addtr(outtable, constructCols("Scramble", "", ""), 1, 3);
  addtr(outtable, constructCols("Scrambles", stats[0][43].toString(), stats[1][43].toString()), 0, 0);
  addtr(outtable, constructCols("Scramble yard", stats[0][44].toString() + " yd", stats[1][44].toString() + " yd"), 0, 0);
  addtr(outtable, constructCols("Yard per Scramble", getAvgStr(stats[0][44], stats[0][43]), getAvgStr(stats[1][44], stats[1][43])), 0, 0);  
  addtr(outtable, constructCols("Dump Off", "", ""), 1, 3);
  addtr(outtable, constructCols("Dump-offs", stats[0][45].toString(), stats[1][45].toString()), 0, 0);
  addtr(outtable, constructCols("Dump-off yard", stats[0][46].toString() + " yd", stats[1][46].toString() + " yd"), 0, 0);
  addtr(outtable, constructCols("Yard per Dump-off", getAvgStr(stats[0][46], stats[0][45]), getAvgStr(stats[1][46], stats[1][45])), 0, 0);  
  addtr(outtable, constructCols("Sack", "", ""), 1, 3);
  addtr(outtable, constructCols("Total sacks allowed", stats[0][27].toString(), stats[1][27].toString()), 0, 0);
  addtr(outtable, constructCols("Yard Lost", stats[0][28].toString() + " yd", stats[1][28].toString() + " yd"), 0, 0);
  addtr(outtable, constructCols("Sacked while scrambling", stats[0][48].toString(), stats[1][48].toString()), 0, 0);
  addtr(outtable, constructCols("Yard Lost", stats[0][49].toString() + " yd", stats[1][49].toString() + " yd"), 0, 0);
  addtr(outtable, constructCols("Interception", "", ""), 1, 3);
  addtr(outtable, constructCols("Pass intercepted", stats[0][29].toString(), stats[1][29].toString()), 0, 0);
  addtr(outtable, constructCols("Opp Int Returned yard", stats[0][30].toString() + " yd", stats[1][30].toString() + " yd"), 0, 0);
  addtr(outtable, constructCols("Fumble", "", ""), 1, 3);
  addtr(outtable, constructCols("Fumbles", stats[0][31].toString(), stats[1][31].toString()), 0, 0);
  addtr(outtable, constructCols("Fumble Lost", stats[0][32].toString(), stats[1][32].toString()), 0, 0);
  addtr(outtable, constructCols("Opp Fumble Returned yard", stats[0][33].toString() + " yd", stats[1][33].toString() + " yd"), 0, 0);
  addtr(outtable, constructCols("Tackle for loss", "", ""), 1, 3);
  addtr(outtable, constructCols("Tackles for loss", clean(stats[1][15]+stats[1][55]), clean(stats[0][15]+stats[0][55])), 0, 0);
  addtr(outtable, constructCols("Tackles for loss - pass play", stats[1][55], stats[0][55]), 0, 0);
  addtr(outtable, constructCols("Tackles for loss - rush play", stats[1][15], stats[0][15]), 0, 0);
  var fgatt0=stats[0][34]+stats[0][36]+stats[0][38]+stats[0][40];
  var fgatt1=stats[1][34]+stats[1][36]+stats[1][38]+stats[1][40];
  var fgmade0=stats[0][35]+stats[0][37]+stats[0][39]+stats[0][41];
  var fgmade1=stats[1][35]+stats[1][37]+stats[1][39]+stats[1][41];
  addtr(outtable, constructCols("Field Goal", "", ""), 1, 3);
  addtr(outtable, constructCols("Field Goal Attempt", fgatt0.toString(), fgatt1.toString()), 0, 0);
  addtr(outtable, constructCols("Field Goal Made", fgmade0.toString(), fgmade1.toString()), 0, 0);
  addtr(outtable, constructCols("Field Goal Percentage", getPercStr(fgmade0, fgatt0), getPercStr(fgmade1, fgatt1)), 0, 0);
  addtr(outtable, constructCols("Field Goal Blocked", stats[0][66], stats[1][66]), 0, 0);
  addtr(outtable, constructCols("Field Goal Breakdown", "", ""), 1, 3);
  addtr(outtable, constructCols("FG: < 30 yd", PassStr(stats[0][35],stats[0][34]), PassStr(stats[1][35], stats[1][34])), 0, 0);
  addtr(outtable, constructCols("FG: 30-40yd", PassStr(stats[0][37],stats[0][36]), PassStr(stats[1][37], stats[1][36])), 0, 0);
  addtr(outtable, constructCols("FG: 40-50 yd", PassStr(stats[0][39],stats[0][38]), PassStr(stats[1][39], stats[1][38])), 0, 0);
  addtr(outtable, constructCols("FG: 50+ yd", PassStr(stats[0][41],stats[0][40]), PassStr(stats[1][41], stats[1][40])), 0, 0);
  addtr(outtable, constructCols("Punting", "", ""), 1, 3);
  addtr(outtable, constructCols("Punts", stats[0][56], stats[1][56]), 0, 0);
  addtr(outtable, constructCols("Punt yard", stats[0][57].toString() + " yd", stats[1][57].toString() + " yd"), 0, 0);
  addtr(outtable, constructCols("Yard per Punt", getAvgStr(stats[0][57], stats[0][56]), getAvgStr(stats[1][57], stats[1][56])), 0, 0);  
  addtr(outtable, constructCols("Punt net yard", stats[0][58].toString() + " yd", stats[1][58].toString() + " yd"), 0, 0);
  addtr(outtable, constructCols("Net yard per Punt", getAvgStr(stats[0][58], stats[0][56]), getAvgStr(stats[1][58], stats[1][56])), 0, 0);  
  addtr(outtable, constructCols("Punting breakdown", "", ""), 1, 3);
  addtr(outtable, constructCols("Punt Blocked", stats[0][59], stats[1][59]), 0, 0);
  addtr(outtable, constructCols("Touchback", stats[0][63], stats[1][63]), 0, 0);
  addtr(outtable, constructCols("No return (exclude touchback)", stats[0][64], stats[1][64]), 0, 0);
  addtr(outtable, constructCols("Inside 1", stats[0][60], stats[1][60]), 0, 0);
  addtr(outtable, constructCols("Inside 5", stats[0][61], stats[1][61]), 0, 0);
  addtr(outtable, constructCols("Inside 10", stats[0][62], stats[1][62]), 0, 0);
  addtr(outtable, constructCols("Penalty", "", ""), 1, 3);
  addtr(outtable, constructCols("Total penalties", stats[0][20].toString(), stats[1][20].toString()), 0, 0);
  addtr(outtable, constructCols("Total penalty yards", stats[0][50].toString()+" yd", stats[1][50].toString()+" yd"), 0, 0);
  addtr(outtable, constructCols("Penalty breakdown", "", ""), 1, 3);
  addtr(outtable, constructCols("Offensive penalties", stats[0][21].toString(), stats[1][21].toString()), 0, 0);
  addtr(outtable, constructCols("Offensive penalty yards", stats[0][51].toString()+" yd", stats[1][51].toString()+" yd"), 0, 0);
  addtr(outtable, constructCols("Defensive penalties", stats[0][22].toString(), stats[1][22].toString()), 0, 0);
  addtr(outtable, constructCols("Defensive penalty yards", stats[0][52].toString()+" yd", stats[1][52].toString()+" yd"), 0, 0);

  target.parentNode.insertBefore(outtable, target.nextSibling);


}

window.setTimeout( function() {

    var ptr1=0, ptr2, ptr3, ptr4, ptr5, endptr, abbr, intext=document.body.innerHTML;

    while (1) {
      ptr2=intext.indexOf("Offensive Package Was", ptr1);
      if (ptr2<0) break;
      endptr=ptr2;
      ptr3=intext.lastIndexOf("<span style=\"font-size:13", ptr2);
      ptr4=intext.indexOf("ouchdown", ptr3);
      if (ptr4>ptr3 && ptr4 < ptr2) {
         endptr=ptr3;
         ptr3=intext.lastIndexOf("<span style=\"font-size:13", endptr-5);
      }
      ptr4=intext.indexOf("<b>", ptr3);
      ptr5=intext.indexOf("</b>", ptr4+3);
      abbr=intext.substring(ptr4+3, ptr5);

      if (teamabbr.length==0) {
        teamabbr[0]=abbr;
      }
      else if (teamabbr[0] != abbr) {
        teamabbr[1]=abbr;
        break;
      }

      ptr1=ptr2+21;
    }



    var buttontable = document.createElement('table');
    buttontable.setAttribute('cellspacing', '0');
    buttontable.setAttribute('cellpadding', '0');
    buttontable.setAttribute('id', 'summary_button_table');

    var newtr=document.createElement('tr');
    buttontable.appendChild(newtr);
    var newtd1 = document.createElement('td');
    newtd1.setAttribute('colspan', '2');
    var newDiv2 = document.createElement('div');
    newDiv2.align = 'center';
    newDiv2.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Game Summary">'; 
    newDiv2.addEventListener('click', function() { showboxscore(intext); }, true);
    newtd1.appendChild(newDiv2);
    newtr.appendChild(newtd1);


    var target = document.getElementById('lastplay');
    if (target) target.parentNode.parentNode.insertBefore(buttontable, 
                       target.parentNode);
}
, 100);

