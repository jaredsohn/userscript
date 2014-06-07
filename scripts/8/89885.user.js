// ==UserScript==
// @name Graphical Scheduler
// @namespace https://sites.google.com/site/kinalibangon/ventures/javascript/graphical-scheduler
// @description My.IIT Graphical Scheduler for COR
// @include http://x4150my.msuiit.edu.ph/my/student/cor.php
// @include https://x4150my.msuiit.edu.ph/my/student/cor.php
// @include x4150my.msuiit.edu.ph/my/student/cor.php
// @include www.x4150my.msuiit.edu.ph/my/student/cor.php
// @include http://www.x4150my.msuiit.edu.ph/my/student/cor.php
// @version 1.1.7
// ==/UserScript==

// subject/course counters.
var showSetting = "section";
var afterLoad = false;
var buttonListenerAdded = false;

window.addEventListener("load", function(e) {
    injectCss();
    doMonkey();
    //if (buttonListenerAdded==false){
    //    addButtonListener();
    //    buttonListenerAdded=true;
    //}
}, false);

function appendStyle(styleCode) {
var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = styleCode;
  } else {
    styleElement.appendChild(document.createTextNode(styleCode));
  }
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}

//function addButtonListener(){
//  var button = document.getElementById("greasemonkeyButton");
//  button.addEventListener('click', doMonkey, true);
//}
 
function doMonkey(){   
    if (showSetting == "section") showSetting = "subject"
    else if (showSetting == "subject") showSetting = "showall"
    else if (showSetting == "showall") showSetting = "section"
    
    var subjects = new Array();
    var subjecCount = 0;
    
    // important iterators. :)
    var days=new Array("Sun","M","T","W","Th","F","Sa");
    var days_SPELLED=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday");
    var percentage = 730 / (days.length + 1);
    //days[-1]='<input id="greasemonkeyButton" type="button" value="Toggle" />';
    days_SPELLED[-1]="Time";
    days[-1]="Time";
    //days_SPELLED[-1]='<input id="greasemonkeyButton" type="button" value="Toggle" />';
    var hemis = new Array("AM", "PM");
    var timeframe = new Array(  "07:00AM-09:00AM",
                                "07:30AM-09:00AM",
                                "09:00AM-10:30AM",
                                "10:30AM-12:00PM",
                                "12:00AM-01:30PM",
                                "12:30PM-01:30PM",
                                "01:00PM-02:00PM",
                                "01:30PM-03:00PM",
                                "03:00PM-04:30PM",
                                "04:30PM-06:00PM",
                                "04:30PM-06:30PM",
                                "06:00PM-07:30PM",
                                "07:30PM-09:00PM");
    
    // etirate throught the document object model starting
    // from the id'ed content-body towards the table that
    // contains the relevant data.
    var mybody, rightcol, contendiv, scheduleTable;        
    mybody = document.getElementById("content-body");
    rightcol = mybody.firstChild.nextSibling.nextSibling.nextSibling;
    contendiv = rightcol.firstChild.nextSibling.nextSibling.nextSibling;
    if (afterLoad==false) scheduleTable = contendiv.firstChild.nextSibling.nextSibling.nextSibling;
    else if (afterLoad==true){
        scheduleTable.removeChild(scheduleTable.previousSibling);
        scheduleTable = contendiv.firstChild.nextSibling.nextSibling.nextSibling.nextSibling;
        GM_log(scheduleTable.innerHTML);
        return false;
    }
    
    // get the subject information from the document model and put it in the subject
    // object. also check for lab's that have no name as class code. L is affixed to unnamed labs.
    for (var i = 1; i < scheduleTable.rows.length; i++){
        subject = new Object();
        subject.code = scheduleTable.rows[i].cells[0].innerHTML.replace("&nbsp;","");
        if (subject.code == ''){
            prevSubject = new Object();
            prevSubject = subjects[i-1];
            subject.code =  prevSubject.code + "L";
        }
        subject.section = scheduleTable.rows[i].cells[1].innerHTML.replace("&nbsp;","");
        subject.description = scheduleTable.rows[i].cells[2].innerHTML.replace("&nbsp;","");
        subject.days = scheduleTable.rows[i].cells[3].innerHTML.replace("&nbsp;","");
        subject.time = scheduleTable.rows[i].cells[4].innerHTML.replace("&nbsp;","");
        subject.room = scheduleTable.rows[i].cells[5].innerHTML.replace("&nbsp;","");
        subject.grade = scheduleTable.rows[i].cells[6].innerHTML.replace("&nbsp;","");
        subject.compl = scheduleTable.rows[i].cells[7].innerHTML.replace("&nbsp;","");
        subject.begin = subject.time.substring(0,7); //get rid of the zeroes in the first character
        if ( subject.begin[0]=='0') subject.begin = subject.begin.substring(1,subject.begin.length);
        subject.end = subject.time.substring(8,15);  //get rid of the zeroes in the first character
        if ( subject.end[0]=='0') subject.end = subject.end.substring(1,subject.end.length);
        subjects[i] = subject;
    }
    
    // container of the arrays of subjects taken each day
    // hence this will be like a double dimension array.
    var weekday = new Array();
    
    // get the days of which every course is taken
    // for example if, TThF then put it in the
    // proper index at weekday array.
    for (var day = 0; day < days.length; day++){
        var subjectCountOfTheDay = 0;
        var subjectsOfTheDay = new Array();
        for (var i = 1; i < scheduleTable.rows.length; i++){
            subject = new Object();
            subject = subjects[i];
            if (subject.days.indexOf(days[day]) > -1) {
                if (days[day] == "T"){
                    var tFound = subject.days.indexOf(days[day]);
                    if (subject.days.indexOf("Th", tFound + 1) > -1){
                        subjectsOfTheDay[subjectCountOfTheDay] = subject;
                        subjectCountOfTheDay++;
                    }
                    else {
                        if (subject.days.indexOf("Th") < 0){
                            subjectsOfTheDay[subjectCountOfTheDay] = subject;
                            subjectCountOfTheDay++;
                        }    
                    }
                }
                else {
                    subjectsOfTheDay[subjectCountOfTheDay] = subject;
                    subjectCountOfTheDay++;
                }
            }
        }
        weekday[day] = subjectsOfTheDay;
    }
    
    var myDay = new Array();
    
    for (var day = 0; day < days.length; day++){
        
        var x;
        var subjectsOfTheDay = new Array();
        var subjectsofMyDay = new Array();
        subjectsOfTheDay = weekday[day];
        for (x in subjectsOfTheDay){
            subject = new Object();
            subject = subjectsOfTheDay[x];
           
            
            // add timeframes to subject
            var totalSubjTimeFrames = 0;
            var subjTimeFrames = new Array();
            var exactMatch = false;
            for (i=0; i<timeframe.length; i++){
                if (timeframe[i]==subject.time){
                    subjTimeFrames[totalSubjTimeFrames]=timeframe[i];
                    
                    totalSubjTimeFrames++;
                    exactMatch = true;
                    break;
                }
            }
            if (exactMatch==false){
                for (i=0; i<timeframe.length; i++){
                    if(timeframe[i].substring(0,7)==subject.time.substring(0,7)){
                        subjTimeFrames[totalSubjTimeFrames]=timeframe[i];
                        
                        totalSubjTimeFrames++;
                    }
                    else if(timeframe[i].substring(8,15)==subject.time.substring(8,15)){
                        subjTimeFrames[totalSubjTimeFrames]=timeframe[i];
                        
                        totalSubjTimeFrames++;
                    }
                }
            }
            subject.timecells=subjTimeFrames;
            subjectsOfTheDay[x] = subject;
            subjectsofMyDay[x] = subject;
        }
        myDay[day] =  subjectsofMyDay;
    }
    
    newTable = document.createElement("div");
    var innerCode = "<table id= \"mySchedule\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"730\" class=\"mytable\" style=\"margin-bottom:0; border-bottom:none\">";
    
    innerCode = innerCode + "<tbody><tr>";
    
    for (var day = -1; day < days.length; day++){
        innerCode = innerCode + "<th width=\"" + percentage + "\" align=\"center\">" + days_SPELLED[day] + "</th>";
    }
    innerCode = innerCode + "</tr>";
    
    for (var t=0; t<timeframe.length;t++){
        //GM_log("begin " + timeframe[t]);
        innerCode = innerCode + "<tr>";
        innerCode = innerCode + "<td width=\"" + percentage + "\" align=\"center\">" + timeframe[t] + "</td>";
        for (var d=0; d<days.length;d++){
            //GM_log("day " + days[d]);
            var resfound = false;
            var mySubjs = myDay[d];
            for (var s=0; s<mySubjs.length;s++){
                subject = new Object();
                subject = mySubjs[s];
                var subjTimes = subject.timecells;
                for (var st=0; st<subjTimes.length;st++){
                    if (subjTimes[st] == timeframe[t]){
                        resfound=true;
                        //GM_log("subject " + subject.code);
                        if (showSetting=="section") innerCode = innerCode + "<td width=\"" + percentage + "\" align=\"center\">" + subject.section + "</td>"
                        else if(showSetting=="subject") {
                            if (subjHover(subject).length > 0) {
                                innerCode = innerCode + wrapTableItem(subject.code, subjHover(subject), percentage);
                            }
                            else {
                                innerCode = innerCode + wrapTableItem(subject.code, "No info.", percentage);
                            }
                        }
                        else if(showSetting=="showall") innerCode = innerCode + "<td width=\"" + percentage + "\" align=\"center\">" + subject.code + subject.section + ' ' + ' (' + subject.room + ")</td>"
                        break;
                    }
                }
                if (resfound==true){
                    break;
                }
            }
            if (resfound==false) {
                //GM_log("subject " + "none");
                innerCode = innerCode + "<td width=\"" + percentage + "\" align=\"center\"> </td>";
            }
        }
        //GM_log("end " + timeframe[t]);
        innerCode = innerCode + "</tr>";
    }
    
    
     // begin presentation layer
    innerCode = innerCode + "<tr><td colspan=\"8\"><center><a href=\"http://sites.google.com/site/kinalibangon/ventures/javascript/graphical-scheduler\" target=\"_blank\">Open Source Product by Kinalibangon Software</a></center></td></tr>"
    innerCode =innerCode + "</tbody></table>";
    if (afterLoad==false){
        newTable.innerHTML = innerCode;
        newTable.DOCUMENT_NODE
        contendiv.insertBefore(newTable,scheduleTable);
    }
    else{
        
        newTable.innerHTML = innerCode;
        newTable.DOCUMENT_NODE
        contendiv.insertBefore(newTable,scheduleTable);
    }
    
    afterLoad=true;
    return true;
}

function wrapTableItem(text, hover, percentage){
    return "<td width=\"" + percentage + "\" align=\"center\"><a class=\"info_hovering\">" + text + "<span class=\"hovering\">" + hover+ "</span></a></td>";
}

function subjHover(subj){
    subject = new Object();
    subject = subj;
    var retVal = "";
    if (subject.description.length > 1) retVal = retVal + "Description: <strong>" + subject.description + "</strong><br>";
    if (subject.section.length > 1) retVal = retVal + "Section: <strong>" + subject.section + "</strong><br>";
    if (subject.room.length > 1) retVal = retVal + "Room: <strong>" + subject.room + "</strong>";
    return retVal;
} 

function injectCss(width){
    var info = "a.info_hovering{position:relative; z-index:24; background-color:#FFFFFF; color:#4F6B72; text-decoration:none}";
    var info_hover = "a.info_hovering:hover{z-index:25; background-color:#D2EBEF}";
    var info_span = "a.info_hovering span.hovering{display: none}";
    var info_hover_span ="a.info_hovering:hover span.hovering{ display:block; position:absolute; top:2em; left:2em; width:20em; border:1px solid #D2EBEF; background-color:#FFFFFF; color:#4F6B72; text-align: left;-moz-box-shadow:0 0 10px #8F1A1A;-webkit-box-shadow:0 0 10px #8F1A1A}";
    
    appendStyle(info);
    appendStyle(info_hover);
    appendStyle(info_span);
    appendStyle(info_hover_span);
    
    return true;
}