// ==UserScript==
// @name       RTM additional search options
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Adds flexible search criteria to the left nav, when using A Bit Better RTM (e.g., week to date)
// @match      *://www.rememberthemilk.com/home/*
// @copyright  2012+, You
// ==/UserScript==

function javascriptFromFilter(listFilter)
{
    return "javascript:document.getElementById('listFilter').value = '" + listFilter + "'; control.updateListFilter(); return false;"
}

function addListSeparate(listName, listFilter)
{
    var zlist = $('#zlist');
    var zNode = document.createElement ('li');
    var count = overviewList.getFilteredList("(" + listFilter + ") and (status:incomplete)").length;
    zNode.innerHTML = '<a href="" onclick="' + javascriptFromFilter(listFilter) + '" >' + listName + ' (' + count + ')</a>'; // javascript:WeekToDate()" >Week to Date</a>';
    zNode.setAttribute ('class', 'xtab_smartlist');
    zNode.setAttribute ('smartlist', 'true');
    zlist.append (zNode);
}

function loadLists()
{
    var lst = $('#listtabs');
    var par = lst.parent();
    var zNode = document.createElement ('div');
    zNode.setAttribute ('class', 'taskcloudcontent');
    zNode.setAttribute ('style', 'padding-left: 0px;');
    
    var zNode2 = document.createElement ('ul');
    zNode2.setAttribute ('class', 'abr-listtabs ui-sortable');
    zNode2.setAttribute ('id', 'zlist');
    zNode.appendChild(zNode2);
    par.append (zNode);
    
    addListSeparate("Week To Date", WeekToDate());
    addListSeparate("Last Week", LastWeek());
    addListSeparate("2 Weeks Ago", TwoWeeksAgo());
    addListSeparate("3 Weeks Ago", ThreeWeeksAgo());
    addListSeparate("Month To Date", MonthToDate());
    addListSeparate("Last Month", LastMonth());
    addListSeparate("2 Months Ago", TwoMonthsAgo());
    addListSeparate("3 Months Ago", ThreeMonthsAgo());
    addListSeparate("4 Months Ago", FourMonthsAgo());
    addListSeparate("5 Months Ago", FiveMonthsAgo());
    addListSeparate("6 Months Ago", SixMonthsAgo());
    addListSeparate("7 Months Ago", SevenMonthsAgo());
}



function dateToString(date)
{ 
   return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
}

function WeekToDate()
{
    startDateRange = new Date(); 
    startDateRange.setDate(startDateRange.getDate() - startDateRange.getDay()); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:tomorrow'; 
    startDateRange = null;
    return searchStr;
}

function LastWeek()
{
    startDateRange = new Date(); 
    startDateRange.setDate(startDateRange.getDate() - startDateRange.getDay() - 7); 
    endDateRange = new Date(); 
    endDateRange.setDate(endDateRange.getDate() - endDateRange.getDay() + 1); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function TwoWeeksAgo()
{
    startDateRange = new Date(); 
    startDateRange.setDate(startDateRange.getDate() - startDateRange.getDay() - 14); 
    endDateRange = new Date(); 
    endDateRange.setDate(endDateRange.getDate() - endDateRange.getDay() - 6); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function ThreeWeeksAgo()
{
    startDateRange = new Date(); 
    startDateRange.setDate(startDateRange.getDate() - startDateRange.getDay() - 21); 
    endDateRange = new Date(); 
    endDateRange.setDate(endDateRange.getDate() - endDateRange.getDay() - 13); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function MonthToDate()
{
    startDateRange = new Date(); 
    startDateRange.setDate(0)
    endDateRange = new Date(); 
    endDateRange.setDate(endDateRange.getDate() - endDateRange.getDay() + 1); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:tomorrow';
    //document.getElementById("listFilter").value = searchStr; 
    //control.updateListFilter(); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function LastMonth()
{
    startDateRange = new Date(); 
    startDateRange.setDate(0); 
    startDateRange.setDate(0); 
    endDateRange = new Date(); 
    endDateRange.setDate(1); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function TwoMonthsAgo()
{
    startDateRange = new Date(); 
    startDateRange.setDate(0); 
    startDateRange.setDate(0);
    startDateRange.setDate(0); 
    endDateRange = new Date();
    endDateRange.setDate(0); 
    endDateRange.setDate(1); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function ThreeMonthsAgo()
{
    startDateRange = new Date(); 
    startDateRange.setDate(0); 
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    endDateRange = new Date();
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(1); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function FourMonthsAgo()
{
    startDateRange = new Date(); 
    startDateRange.setDate(0); 
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    endDateRange = new Date();
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(1); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function FiveMonthsAgo()
{
    startDateRange = new Date(); 
    startDateRange.setDate(0); 
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    endDateRange = new Date();
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(1); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function SixMonthsAgo()
{
    startDateRange = new Date(); 
    startDateRange.setDate(0); 
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    endDateRange = new Date();
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(0); 
    endDateRange.setDate(1); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

function SevenMonthsAgo()
{
    startDateRange = new Date(); 
    startDateRange.setDate(0); 
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    startDateRange.setDate(0);
    endDateRange = new Date();
    endDateRange.setDate(0); 
    endDateRange.setDate(0);
    endDateRange.setDate(0);
    endDateRange.setDate(0);
    endDateRange.setDate(0);
    endDateRange.setDate(0); 
    endDateRange.setDate(1); 
    searchStr = 'dueAfter:' + dateToString(startDateRange) + ' and dueBefore:' + dateToString(endDateRange); 
    startDateRange = null; 
    endDateRange = null;
    return searchStr;
}

window.setTimeout(function(){loadLists();},1000);