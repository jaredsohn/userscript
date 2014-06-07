// ==UserScript==
// @name        personel package data
// @namespace   DeepRoute
// @include     http://deeproute.com/deeproute/?js=weekbyweek*
// @include     http://deeproute.com/deeproute/default.asp?js=weekbyweek*
// @version     2
// ==/UserScript==

var teamlist=[];
var abbrlist=[];

var teams=[];
var abbrs=[];

var teamID=[], links=[], readcount=0, readtarget=1, packageStats=[], packageYards=[], sumPackageStats=[], sumDownStats=[]; 

function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*"); // node list of every element under par (document, presumably the scedule page?) 
   for(var i=0,j=els.length; i<j; i++){ // while i is less than the number of elements under par 
      if(re.test(els[i].className)){ // if an element includes "team_checkbox", push the element into a. 
         a.push(els[i]);
      }
   }
   return a;
};

function isTeam(inteam) { // return 1 if inteam is a team name, 0 otherwise 
  for (var x=0; x<teams.length; x++)
    if (teams[x] == inteam) return 1;
  return 0;
};

function isAbbr(inabbr) {
  for (var x=0; x<abbrs.length; x++) { 
    if (abbrs[x] == inabbr) { 
    	return 1; 
    }
  }
  return 0;
};

function isID(inid) {
  for (var x=0; x<teamID.length; x++) 
    if (teamID[x]==inid) return 1;
  return 0;
};

function getDistToGo(inTogo, inEndToGo) {
	var distToGo=0; 
	if (inTogo=="inches") {
		distToGo=0.1; 
	} else if (inTogo=="Foot~") {
		distToGo=0.17; 
	} else if (inTogo=="< 1") {
		distToGo=0.67; 
	} else {
		distToGo=parseInt(inTogo);
		if (distToGo == NaN) {
			return -1; 
		}
	}
	if (inEndToGo=="+") {
		distToGo+=0.25; 
	} else if (inEndToGo=="-") {
		distToGo-=0.25; 
	}
	return distToGo; 
}

function getPkgid(inPkg) {
	var pkgid=-1; 
	if (inPkg=="H F T 1 2") {
		pkgid=0; 
	} else if (inPkg=="H F T t 1") {
		pkgid=1; 
	} else if (inPkg=="H T t 1 2") {
		pkgid=2; 
	} else if (inPkg=="H F 1 2 3") {
		pkgid=3; 
	} else if (inPkg=="H T 1 2 3") {
		pkgid=4; 
	} else if (inPkg=="H 1 2 3 4") {
		pkgid=5; 
	} else if (inPkg=="T 1 2 3 4") {
		pkgid=6; 
	} else if (inPkg=="1 2 3 4 5") {
		pkgid=7; 
	}
	return pkgid; 
}

function checkRunPass(run, pass, pkgid, downDistID, yards, isSuccess) {
    packageStats[downDistID][pkgid][pass][0]++; 
    packageStats[downDistID][pkgid][pass][1]+=yards; 
    packageStats[downDistID][pkgid][pass][2]+=isSuccess; 
    return; 
} // */

/* old function: 
function checkRunPass(run, pass, pkgid, downDistID, yards) {
  if (run==1) {
      packageStats[downDistID][pkgid][0]++; 
      packageYards[downDistID][pkgid][0]+=yards; 
    } else if (pass==1) {
      packageStats[downDistID][pkgid][1]++; 
      packageYards[downDistID][pkgid][1]+=yards; 
    }
    return; 
} // */

function getSuccess(yards, distToGo, down, isTouchdown) {
  var isSuccess=-1; 
  if (isTouchdown==1) {
    return 1; 
  }
  if (down=="1st") {
    if (yards >= (distToGo*0.4)) {
      return 1;  
    } else {
      return 0; 
    }
  } else if (down=="2nd") {
    if (yards >= (distToGo*0.6)) {
      return 1; 
    } else {
      return 0; 
    }
  } else if (down=="3rd" || down=="4th") {
    if (yards >= distToGo) {
      return 1; 
    } else {
      return 0; 
    }
  }
  return isSuccess; 
}

function makePlaytypeTableSection(pkgid, downDistID, isPassPlay) {
  var tableSection="<table border='1'> 
    <td>" + packageStats[downDistID][pkgid][isPassPlay][0] + "</td> 
    <td>" + (packageStats[downDistID][pkgid][isPassPlay][1]/packageStats[downDistID][pkgid][isPassPlay][0]) + "</td> 
    <td>" + (packageStats[downDistID][pkgid][isPassPlay][1]/packageStats[downDistID][pkgid][isPassPlay][0])*100 + "</td> 
    </table>";
  return tableSection; 
}

function makeDDPTableSection(pkgid, downDistID) {
  var tableSection="<table border='1'>
    <td>" + makePlaytypeTableSection(pkgid, downDistID, 0) + "</td>
    <td>" + makePlaytypeTableSection(pkgid, downDistID, 1) + "</td>
    </table>"; 
  return tableSection; 
}

function addtr(downDist, downDistID) {
  var tr="<tr> 
    <td> " + downDist + ": </td> 
    <td>" + makeDDPTableSection(0, downDistID) + " </td> 
    <td> " + makeDDPTableSection(1, downDistID) + " </td> 
    <td> " + makeDDPTableSection(2, downDistID) + " </td> 
    <td> " + makeDDPTableSection(3, downDistID) + " </td> 
    <td> " + makeDDPTableSection(4, downDistID) + " </td> 
    <td> " + makeDDPTableSection(5, downDistID) + " </td> 
    <td> " + makeDDPTableSection(6, downDistID) + " </td> 
    <td> " + makeDDPTableSection(7, downDistID) + " </td> 
    </tr>"; 
  return tr; 
}

function parsePBP(intext) {
  var ptr1=0, ptr2, ptr3, ptr4, ptr5, ptr6, ptr7, pkg, form, play, abbr, yard, yard2, comp, scramble, int, incomplete, loss, isTouchdown, isSuccess; 
  var down, togo, distToGo=0, endToGo, gameTime, penalty, tmp=0, endptr, dumpoff, preptr=0;
  var pkgid, formid, playid, downDistID, index, run, handoff, sneak, pass, att, tmparr, sack, startNext;
  var attempts=0, scrambles=0, sacks=0; 

  readcount++;
  newDiv = document.getElementById('scout_count');
  newDiv.innerHTML=readcount.toString() + ' of ' + readtarget + ' games';

  while (1) {
    tmp++; // increment 
    ptr2=intext.indexOf("Offensive Package Was", ptr1); // find next "Offensive Package Was" after ptr1 
    if (ptr2<0) break; // if no more offensive plays, leave 
    endptr=ptr2; 
    ptr3=intext.lastIndexOf("<span style='font-size:13;'>", ptr2); // find start of the final PBP line from this play 
    ptr4=intext.indexOf("ouchdown", ptr3); // find next touchdown after start of the final PBP line 
   if (ptr4>ptr3 && ptr4 < ptr2) { // if the touchdown is after the start of the final PBP line and before the package info
        isTouchdown=1; 
        endptr=ptr3; // endptr becomes the start of the final PBP line 
        ptr3=intext.lastIndexOf("<span style='font-size:13;'>", endptr-5); // sets ptr3 to the final PBP line  
    } // if ptr4>ptr3 ...
    ptr6=intext.lastIndexOf("was the man covering on the play"); 
    if (ptr6!=-1 && ptr6 < endptr) {
      ptr3=intext.lastIndexOf("<span style='font-size:13;'>", ptr3-5);
    }
    pkg=intext.substring(ptr2+29, ptr2+38); // get the personel package 

    startNext=intext.indexOf("<span style='font-size:13;'>", ptr2); // find the first PBP line on the next play (to find penalties)
    ptr4=intext.indexOf("<b>", ptr3); // find location of first bolding on last line 
    ptr5=intext.indexOf("</b>", ptr4+3); // find location of close of first bolding 
    abbr=intext.substring(ptr4+3, ptr5); // get bolded text (offensive team abbr) 

    ptr4=intext.indexOf("<b>", ptr5+4); // find second bolding: quarter and time remaining 
    ptr7=intext.indexOf("</b>", ptr4+3); 
    gameTime=intext.substring(ptr4+3, ptr7); // store string with quarter and time remaining. 

    ptr4=intext.indexOf("<b>", ptr7+4); // third bolding: down and distance
    ptr7=intext.indexOf("</b>", ptr4+3); 
    down=intext.substring(ptr4+4, ptr4+7); // store down ("1st", "2nd", etc)
    ptr7=intext.indexOf(";", ptr4); // find end of distance ("Foot~", "13+", etc)
    togo=intext.substring(ptr4+12, ptr7); // store distance 
    endToGo=intext.substring(ptr7-1, ptr7); // get the final char before the ";", which may or not be a "+" or "-" 

    ptr4=intext.indexOf("a gain of", preptr); // find next "a gain of", if it exists and is before the end move it to ptr5
    loss=0; 
    if (ptr4!=-1 && ptr4<endptr) ptr5=ptr4;
    else {
      ptr4=intext.indexOf("a LOSS of", preptr); // do previous for "a loss of" 
      if (ptr4!=-1 && ptr4<endptr) { ptr5=ptr4; loss=1; }
      else {
        ptr4=intext.indexOf("gains", preptr); // do previous for "gains" 
        if (ptr4!=-1 && ptr4<endptr) ptr5=ptr4;
        else {
          ptr4=intext.indexOf("loses", preptr); // do previous for "loses" 
          if (ptr4!=-1 && ptr4<endptr) { ptr5=ptr4; loss=1; }
          else ptr5=-1; // set ptr to -1 (no loss or gain on the play) 
        } // else 
      } // else 
    } // else  
    if (ptr5!=-1) { // if a play happened 
      ptr4=intext.indexOf("class='supza'>", ptr5); // find tag for yardage 
      if (ptr4!=-1 && ptr4<endptr) { // if yardage happened 
        ptr5=intext.indexOf("</span>", ptr4+14); // find end of yardage tag
        yard=intext.substring(ptr4+14, ptr5); // get full yardage 
        ptr4=intext.indexOf("class='supz'>", ptr5);
        ptr5=intext.indexOf("</span>", ptr4+13);
        yard2=intext.substring(ptr4+13, ptr5); // get decimal yardage 
        if (loss==0) { // combine into one value 
        	yard=parseInt(yard) + parseInt(yard2)/100; 
        } else if (loss==1) {
        	yard= -1 * (parseInt(yard) + parseInt(yard2)/100); 
        } // */
      } // if ptr4!=-1 ... 
      else yard=0;
    } // if ptr5!=-1 
    else yard=0;

    ptr4=intext.indexOf("penalty", preptr); // test if play was a penalty 
    if (ptr4!=-1 && ptr4<startNext) {
      ptr4=intext.indexOf("enalty <b>declined</b>")
      if (ptr4) { 
        penalty=1; 
      }
      else penalty=0; 
    }
    else penalty=0;

    ptr4=intext.indexOf("dump it off", preptr); // test if play was a dumpoff (original preptr)
    if (ptr4!=-1 && ptr4<endptr) dumpoff=1;
    else dumpoff=0;

    ptr4=intext.indexOf("scrambles..", preptr); 
    if (ptr4!=-1 && ptr4<endptr) scramble=1; 
    else scramble=0; 

    pass=0; // test if pass play 
    ptr4=intext.indexOf(" pass ", preptr);
    if (ptr4!=-1 && ptr4<endptr) { 
    	pass=1; 
    }

    ptr4=intext.indexOf(" throwing ", preptr);
    if (ptr4!=-1 && ptr4<endptr) { 
    	pass=1; 
    }

    ptr4=intext.indexOf("threw the ball away", preptr);
    if (ptr4!=-1 && ptr4<endptr) { 
    	pass=1; 
    }

    ptr4=intext.indexOf(" Pass by", preptr);
    if (ptr4!=-1 && ptr4<endptr) { 
    	pass=1; 
    }
    if (pass==0 && scramble==1) pass=1;

    if (pass) att=1; else att=0; 
    if (scramble) att=0;
    ptr4=intext.indexOf("SACKED", preptr); // test if play was a sack 
    if (ptr4!=-1 && ptr4<endptr) { att=0; pass=1; sack=1; } 
    else { sack=0; } 

    run=0; 
    ptr4=intext.indexOf(" Handoff to ", preptr); 
    if (ptr4!=-1 && ptr4<endptr) { run=1; handoff=1; }

    ptr4=intext.indexOf(" keeps it and runs ", preptr); 
    if (ptr4!=-1 && ptr4<endptr) { run=1; sneak=1; }
    if (run==1 && (scramble==1 || sack==1)) { run=0; } // */
   	
   	distToGo=getDistToGo(togo, endToGo); 
    pkgid=getPkgid(pkg); 

    isSuccess=getSuccess(yard, distToGo, down, isTouchdown); 

    if (isAbbr(abbr) && (run==1 || pass==1) && distToGo!=-1 && isSuccess!=-1 && pkgid>=0 && pkgid<=7) { 
    	if (down=="1st") {
    		downDistID=0; 
    		checkRunPass(run, pass, pkgid, downDistID, yard, isSuccess); 
    	} else if (down=="2nd") {
    		if (distToGo>=0 && distToGo<=3) {
    			downDistID=1; 
    		} else if (distToGo>3 && distToGo<=7) {
    			downDistID=2; 
    		} else if (distToGo>7) {
    			downDistID=3; 
    		}
    		checkRunPass(run, pass, pkgid, downDistID, yard, isSuccess); 
    	} else if (down=="3rd" || down=="4th") {
    		if (distToGo>=0 && distToGo<=3) {
    			downDistID=4; 
    		} else if (distToGo>3 && distToGo<=7) {
    			downDistID=5; 
    		} else if (distToGo>7) {
    			downDistID=6; 
    		}
    		checkRunPass(run, pass, pkgid, downDistID, yard, isSuccess); 
    	} 
    } // if isAbbr(abbr) ... 

    isTouchdown=0; 
    ptr1=ptr2+21; 
    preptr=endptr;
  } // while(1) 

  if (readcount<readtarget) readLog();
  	else {

      //var ave1=parseFloat(Math.round( parseFloat(packageYards[0][0][0])*10.0 / parseFloat(packageStats[0][0][0]) ) ) / 10.0;

  		/*for (var y=0; y<7; y++) {
  			for (var z=0; z<2; z++) {
  				for (var x=0; x<8; x++) {
  					sumDownStats[y][z]+=packageStats[y][x][z]; 
  				}
  			}
  		} 

  		for (x=0; x<8; x++) {
  			for (z=0; z<2; z++) {
  				for (y=0; y<7; y++) {
  					sumPackageStats[x][z]+=packageStats[y][x][z]; 
  				}
  			}
  		} // */

    	newDiv = document.getElementById('scout_count');
    	newDiv.innerHTML= 
    	"<table border='1'> <tr> <th> run plays/pass plays </th> <th> HFT12 </th> <th> HFTt1 </th> <th> HTt12 </th> <th> HF123 </th> <th> HT123 </th> <th> H1234 </th> <th> T1234 </th> <th> 12345 </th> <th> total </th>" + "<tr>" +
    	addtr("1st down", 0) + 
      addtr("2nd and 0-3", 1) + 
      addtr("2nd and 3-7", 2) +
      addtr("2nd and 7+", 3) + 
      addtr("3rd/4th and 0-3", 4) +
      addtr("3rd/4th and 3-7", 5) + 
      addtr("3rd/4th and 7+", 6) +
    	"</table>"; 
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
      	ptr2=intext.indexOf("class=norm>", ptr2+11); 
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

  var checkbox = getElementsByClassName('team_checkbox', document); // array of elements including the term "team_checkbox" in the (scedule?) page. 

   for (var i=0; i < checkbox.length; i++) // for each element in checkbox
     if (checkbox[i].checked) {            // if the checkbox for this team is checked 
        teams[teams.length]=teamlist[i];   // add team and team abbreviation to appropriate array 
        abbrs[abbrs.length]=abbrlist[i];
     }


  ptr1=input.indexOf("\"teaminfo\"", 0);            // location of the first occurence of "teaminfo\" in input (the scedule page?) 
  if (ptr1<0) ptr1=input.indexOf("teaminfo ", 0);   // if "teaminfo\" is not there, find first occurence of "teaminfo " in input
  endptr=input.indexOf("hidden", ptr1+8);           // location of "hidden" in input, starting 8 chars after "teaminfo"

  while (1) {
    ptr2=input.indexOf("!", ptr1);  // ptr2 = location of "!" after 'teaminfo' (old ptr2 for later loops) 
    if (ptr2 > endptr) break; // if "!" is after "hidden", break 
    ptr3=input.indexOf("^", ptr2+1);  // ptr3 = location of "^" starting 1 char after "!" 
    id=input.substring(ptr2+1, ptr3); // id = all chars between the "!" and "^" 
    ptr2=input.indexOf("^", ptr3+1);  // ptr2 = location of "^" starting one char after "^" 
    name=input.substring(ptr3+1, ptr2); // name = all chars between "^" and "^" 
    if (isTeam(name)) teamID[teamID.length]=id; // if id is a valid team name, adds id to teamID array 
    ptr1=ptr2;
  }

  ptr1=input.indexOf("\"type-X\"", endptr);   // 
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
  //buttontable.setAttribute('border', '1'); 
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
  newDiv2.addEventListener('click', function() {buildGameList(input); startReadLog(); }, true);                // "Start" button, runs dump-off counter 
  newtd1.appendChild(newDiv2);
  newtr.appendChild(newtd1);

  var newtd2 = document.createElement('td');
  newtd2.setAttribute('colspan', '2');
  var newDiv3 = document.createElement('div');
  newDiv3.align = 'center';
  newDiv3.innerHTML = '<input type="button" style="font-size: 10pt; font-weight: bold; width: 100%; height: 30px" value="Select all">'; 
  newDiv3.addEventListener('click', function() {
      var checkbox = getElementsByClassName('team_checkbox', document);  
      for (var i=0; i < checkbox.length; i++) checkbox[i].checked=true;   
  }, true);
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

  	packageStats=new Array(7); // initialize stat array (1st down, 2nd & short, 2nd & medium, 2nd & long, 3rd/4th & short, 3rd/4th & medium, 3rd/4th & long) 

  	for (var a=0; a<7; a++) { 
    	var pkgs=new Array(8);  // initialize row of packages (HFT12, HFTt1, HTt12, HF123, HT123, H1234, T1234, 12345) 
    	for (b=0; b<8; b++) {
    		var plays=new Array(2); // initialize row of play types (run/pass/unknown)
       	for (var c=0; c<2; c++) {
          var stats=new Array(3); // initialize row of stats (plays, yards, successes) 
          for (var d=0; d<3; d++) {
            stats[d]=0;  // initialize each slot in the array (filled in the ParsePBP function) 

       		}
          plays[c]=stats; 
        }
       	pkgs[b]=plays; 
    	}
    	packageStats[a]=pkgs;  
  	} 

    packageYards=new Array(7)

    for (var x=0; x<7; x++) { 
      var pkgs=new Array(8);  
      for (y=0; y<8; y++) {
        var tmp=new Array(2); 
          for (var z=0; z<2; z++) {
            tmp[z]=0;  
          }
          pkgs[y]=tmp; 
      }
      packageYards[x]=pkgs; 
    }

  	sumPackageStats=new Array(8); 

  	for (var x=0; x<8; x++) {
  		var tmp=new Array(2); 
  		for (y=0; y<2; y++) {
  			tmp[y]=0; 
  		}
  		sumPackageStats[x]=tmp; 
	}

	sumDownStats=new Array(7); 

  	for (var x=0; x<7; x++) {
  		var tmp=new Array(2); 
  		for (y=0; y<2; y++) {
  			tmp[y]=0; 
  		}
  		sumDownStats[x]=tmp; 
	}
    

  ptr1=input.indexOf("imonyear", 0);
  ptr2=input.indexOf("value=\"", ptr1);
  ptr3=input.indexOf("\"", ptr2+7);
    if (ptr1<0 || ptr2<0 || ptr3<0) { alert("Can't find year"); return; }
    // if (ptr1<0 || ptr2<0 || ptr3<0) { alert("Can't find year: ptr1 = " + ptr1 + ", ptr2 = " + ptr2 + ", ptr3 = " + ptr3 + ", first few characters: " + input.substring(0, ptr3+50)); return;  }
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
