// ==UserScript==
// @name        betterBonsai
// @namespace   Bonsai
// @description improve boring Bonsai 
// @include     http://*/cvsqueryform.cgi?*
// @include     http://*/cvsquery.cgi?*
// @version     1.5.1
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @require  	http://userscripts.org/scripts/source/139073.user.js
// @resource  	customCSS http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css

// ==/UserScript==


// last changes
// 1.1.1 -- Replace http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js 
//          with http://userscripts.org/scripts/source/139073.user.js (jQuery datepicker fix)
// 1.1.5 -- Extract functions.
// 1.2   -- Unify tables.
// 1.3   -- Simple user filtering.
// 1.4   -- Switch to date interval option when date intervals changed.
//          Use 3 month interval with min/maxdates.
// 1.5   -- widen/alter date field (add weekday)
// 1.6   -- fix for date interval radio button.

"use strict"	

$(document).ready(function() {

    var pathName = window.location.pathname;        

    if (pathName.match(/cvsqueryform/))
    {
        addCSS();   
        addDatepicker();
        changeUserField();
    }   
    else if (pathName.match(/cvsquery/))
    {        
        unifyTables();
        var user = getParameterByName("whoknew");
        if (user)
        {            
            filterUser(user);
        }
    }
});

function changeUserField()
{
    $("[name=who]").attr("name", "whoknew");
}

function filterUser(user)
{
    var string = "../registry/who.cgi?email=";
        
    $("a[href^=\"" + string + "\"]").not("a[href^=\"" + string + user + "\"]").each(function(){
        $(this).parent().parent().remove();
    });
}

// http://stackoverflow.com/a/901144/381233
function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function unifyTables()
{
    var tbodies = $("table[cellspacing=2][border=]:not(:nth-child(10)) tbody");
    var tables = $("table[cellspacing=2][border=]:not(:nth-child(10))");
    
    // one table to rule them all
    var theTbody = $("table[cellspacing=2][border=]:nth-child(10) tbody");
    var theTable = $("table[cellspacing=2][border=]:nth-child(10)");
    
    // move other tables to master table
    theTable.append(tables.contents());
    theTbody.append(tbodies.contents());

    // keep content, destroy table/tbody
    tables.contents().unwrap();
    tbodies.contents().unwrap();
    
    // widen, alter date
    var dateTH = theTbody.find("th a:contains(\"When\")").parent();
    dateTH.attr("width", "12%");
    theTbody.find("td:nth-child(1)").each(function(){
        // space between date and time wasn't a normal space, so just use date
        var justDate = $(this).text().substring(0, 10);
        var checkinDate = new Date(justDate);                       
        $(this).text(checkinDate.toString().substring(0, 3) + " " + $(this).text());
    });
}

function addDatepicker()
{
    var customDateFormatMin = 'yy-mm-dd 00:00:00';
    var customDateFormatMax = 'yy-mm-dd 23:59:59';

    var nMonths = 3;
       
    
    // didn't work: , changeYear: true, changeMonth: true
    var JSON_mindate = {dateFormat: customDateFormatMin, numberOfMonths: nMonths, 
                        changeMonth: true,
                        changeYear: true,
                        defaultDate: "+1w",
                        onSelect: function( selectedDate ) {         
                            var altDate = new Date(selectedDate);                                                        
                            $( "[name=maxdate]" ).datepicker( "option", "minDate", altDate );
                            selectDateIntervalRadioButton();
                            }
                       };
    var JSON_maxdate = {dateFormat: customDateFormatMax, numberOfMonths: nMonths,
                        changeMonth: true,
                        changeYear: true,
                        defaultDate: "+1w",
                        onSelect: function( selectedDate ) {         
                            var altDate = new Date(selectedDate);                                                        
                            $( "[name=mindate]" ).datepicker( "option", "maxDate", altDate );                            
                            selectDateIntervalRadioButton();    
                            }                        
                        };

    $("[name=mindate]").datepicker(JSON_mindate);
    $("[name=mindate]").click ( function () {
        setTimeout (cleanUpCrappyEventHandling, 100);
    } );
    
    $("[name=maxdate]").datepicker(JSON_maxdate);
    $("[name=maxdate]").click ( function () {
        setTimeout (cleanUpCrappyEventHandling, 100);
    } );    
}
                                              
                                              
function selectDateIntervalRadioButton()
{
    $("[name=date]").prop('checked',true);
}

function addCSS()
{
    var newCSS = GM_getResourceText ("customCSS");
    // make image paths absolute
    newCSS = newCSS.replace(/url\(/g, "url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/")
    //unsafeWindow.console.log(    newCSS);
    GM_addStyle (newCSS);
}

// from http://stackoverflow.com/a/8799665/381233
function cleanUpCrappyEventHandling () {
    //-- Fix base controls.
    var nodesWithBadEvents  = $(
        "div.ui-datepicker td[onclick^='DP'], div.ui-datepicker a[onclick^='DP']"
    );
    nodesWithBadEvents.each ( function () {
        fixNodeEvents ($(this), "click");
    } );

    //-- Fix month and year drop-downs.
    nodesWithBadEvents  = $(
        "div.ui-datepicker select[onchange^='DP']"
    );
    nodesWithBadEvents.each ( function () {
        fixNodeEvents ($(this), "change");
    } );
}

function fixNodeEvents (jNode, eventType) {
    var onName      = "on" + eventType;
    var fubarFunc   = jNode.attr (onName);

    /*--- fubarFunc will typically be like:
        DP_jQuery_1325718069430.datepicker._selectDay('#pickMe',0,2012, this);return false;
    */
    fubarFunc       = fubarFunc.replace (/return\s+\w+;/i, "");

    jNode.removeAttr (onName);
    jNode.bind (eventType, function () {
        eval (fubarFunc);
        cleanUpCrappyEventHandling ();
    } );
}