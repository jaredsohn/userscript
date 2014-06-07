// ==UserScript==
// @name            LogMyTaskTimePercent
// @author          darkyndy
// @description     LogMyTask update summary with percent time
// @include         http://logmytask.com/summary*
// @include         http://www.logmytask.com/summary*
// @include         http://logmytask.com/reports*
// @include         http://www.logmytask.com/reports*
// @version         1.2
// @namespace       darkyndy.com/LogMyTasktimepercent
// ==/UserScript==

/*
Last Version Change Log:
(version 1.2)
- added timePercent for reports
*/

//default script setting
var reloadTimer = 7000;
var loadingElement = document.getElementById('progressIndicator');

function testElementReady(){
  if(loadingElement.style.display === "none"){
    var addedTimePercentTooltip = document.getElementById('addedTimePercentTooltip');
    var tooltipElement = document.evaluate("//td[@id='WzBoDyI']/p[@class='task-time-spent']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    //console.log("tooltip count = "+tooltipElement.snapshotLength);
    if(tooltipElement.snapshotLength !== 0 && !addedTimePercentTooltip){
      for(var i=0;i<tooltipElement.snapshotLength;i++){
        var timeValue = tooltipElement.snapshotItem(i).innerHTML;
        var newTime = returnTime(timeValue);
        tooltipElement.snapshotItem(i).innerHTML = " <span id=\"addedTimePercentTooltip\">"+newTime+"</span> "+timeValue;
      }
    }
    
    var taskContents = document.evaluate("//div[@class and contains(@class, 'taskcontent')]/p", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    //console.log('Found '+taskContents.snapshotLength+' extended nodes');
    var addedTimePercentExtended = document.getElementById('addedTimePercentExtended');
    if(taskContents.snapshotLength !== 0 && !addedTimePercentExtended){
      for(var i=0;i<taskContents.snapshotLength;i++){
        var timeValue = taskContents.snapshotItem(i).innerHTML;
        var newTime = returnTime(timeValue);
        //console.log(taskContents.snapshotItem(i).innerHTML);
        taskContents.snapshotItem(i).innerHTML = " <span id=\"addedTimePercentExtended\">"+newTime+"</span> "+taskContents.snapshotItem(i).innerHTML;
      }
    }
    var tableRows = document.evaluate("//tr[@id and contains(@class, 'div_legend_normal')]/td[3]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    //console.log('Found '+tableRows.snapshotLength+' tr nodes');
    var addedTimePercent = document.getElementById('addedTimePercent');
    if(tableRows.snapshotLength !== 0 && !addedTimePercent){
      for(var i=0;i<tableRows.snapshotLength;i++){
        //var timeValue = tableRows.snapshotItem(i).lastChild.innerHTML;
        var timeValue = tableRows.snapshotItem(i).innerHTML;
        //console.log('initial time is '+timeValue);
        var newTime = returnTime(timeValue);
        tableRows.snapshotItem(i).innerHTML = " <span id=\"addedTimePercent\" style=\"color:#D70000\">"+newTime+"</span> "+tableRows.snapshotItem(i).innerHTML;
      }
    }
    
    var reportRows = document.evaluate("//div[@id='divTable']/table/tbody/tr/td[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    //console.log('Found '+reportRows.snapshotLength+' tr nodes');
    var addedTimePercentReport = document.getElementById('addedTimePercentReport');
    if(reportRows.snapshotLength !== 0 && !addedTimePercentReport){
      for(var i=0;i<reportRows.snapshotLength;i++){
        //var timeValue = reportRows.snapshotItem(i).lastChild.innerHTML;
        var timeValue = reportRows.snapshotItem(i).innerHTML;
        //console.log('initial time is '+timeValue);
        var newTime = returnTime(timeValue);
        reportRows.snapshotItem(i).innerHTML = " <span id=\"addedTimePercentReport\" style=\"color:#D70000\">"+newTime+"</span> "+reportRows.snapshotItem(i).innerHTML;
      }
    }
  }
  else{
    //myTimer = setTimeout(function(){testElementReady();}, reloadTimer);
  }
  myTimer = setTimeout(function(){testElementReady();}, reloadTimer);
}

function returnTime(oldTime){
  //console.log('initial time is '+oldTime);
  var timeRegHour = new RegExp("hr", "gmi");
  var timeReg = new RegExp("([0-9]+)hr ([0-9]+)min", "gmi");
  var timeRez = 2;
  var hourValue = 0;
  var minValue = 0;
  if(!oldTime.match(timeRegHour)){
    var timeReg = new RegExp("([0-9]+)min", "gmi");
    timeRez = 1;
  }
  if(oldTime.match(timeReg)){
    var rezReg = timeReg.exec(oldTime);
    if(timeRez === 2){
      hourValue = rezReg[1];
      minValue = rezReg[2];
    }
    else{
      minValue = rezReg[1];
    }
  }
  minValue = Math.round(minValue*100/60).toString();
  if(minValue.length === 1){
    minValue = "0"+minValue;
  }
  
  var finalTime = hourValue.toString()+"."+minValue;
  return finalTime;
}

var myTimer = setTimeout(function(){testElementReady();}, 2);