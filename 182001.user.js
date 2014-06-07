// ==UserScript==
// @name       V1 TeamRoom Fixes
// @namespace  http://v1.addmorevalue.se/VersionOne/
// @version    0.2
// @description  enter something useful
// @match      http://v1.addmorevalue.se/VersionOne/TeamRoom.mvc/Show/*
// @copyright  2013+, Magnus Karlsson, 
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==


// Settings:
var minimized_height = "30px";
var animation_speed = 200;
var minimize_delay = 777;
var maximize_delay = 333;



// *************************************************************************************************
// Code for maximize/minimize **********************************************************************
// *************************************************************************************************

var current_status = "minimized";

function makeSureFullHeight()
{
    $(".window").height($(".panels").height()-46);
}

function maximize()
{
    current_status = "maximized";
    $(".panel-wrapper").animate({top:"156px"},animation_speed);
}

function minimize()
{
    current_status = "minimized";
    $(".panel-wrapper").animate({top:minimized_height},animation_speed);
    setTimeout(function(){
        makeSureFullHeight();
    },animation_speed);
}

function auto_toggle()
{
    return $("#auto_toggle_maxmin").is(":checked");
}

function set_auto_toggle( val )
{
    if( val == true )
    {
        $("#auto_toggle_maxmin").attr("checked","checked");
    }
    else 
    {
        $("#auto_toggle_maxmin").removeAttr("checked");
    }
        
}


$(".panel-wrapper").css("top",minimized_height);


// Creating the button bar
var button_bar = $("<div id=\"button_bar\"></div>");
$("body").append(button_bar);
button_bar.css("position","fixed");
button_bar.css("top","2px");
button_bar.css("left","250px");
button_bar.css("z-index","999");
button_bar.append($("<input type=\"button\" id=\"toggle_maxmin\" value=\"Toggle minimize/maximize\">"));
button_bar.append($("<input type=\"checkbox\" id=\"auto_toggle_maxmin\" checked=\"checked\" style=\"margin-left: 8px\">"));
button_bar.append($("<label for=\"auto_toggle_maxmin\">Toggle automatically</label>").css("font-size","12px").css("padding-left","3px"));



var focus = ".panel-wrapper";

function event_header(){
    if( focus != ".header" )
    {
        focus = ".header";
        if( auto_toggle() )
        {
            setTimeout(function(){
                if( focus == ".header" )
                {
                    maximize();
                }
            },maximize_delay);
        }
    }
}

$(".top-bar-actions").hover(event_header);
$(".header").hover(event_header);


$(".panel-wrapper").hover(function(){
    if( focus != ".panel-wrapper" )
    {
        focus = ".panel-wrapper";
        if( auto_toggle() )
        {
            setTimeout(function(){
                if( focus == ".panel-wrapper" )
                {
                    minimize();
                }
            },minimize_delay);
        }
    }
});

$("#toggle_maxmin").click(function(){
    set_auto_toggle( false );
    if( current_status == "minimized" )
    {
        maximize();
    }
    else 
    {
        minimize();
    }
});


// *************************************************************************************************
// Code for add task button and floating column names **********************************************
// *************************************************************************************************

waitForKeyElements ('.taskboard', OnTaskboardTableLoaded);

function OnTaskboardTableLoaded() 
{
    //alert('now');
    
    AddTaskButtons();
    AddFloatingColumns();
    
    $( window ).resize(function()
    {
        $('#floatingHeader').remove();
        AddFloatingColumns();
    });
}

// *************************************************************************************************
// Code for add task button ************************************************************************
// *************************************************************************************************

function AddTaskButtons()
{
    var userStoryRows = $('.taskboard').find("tr[rowid^='Story:']");
    AddButtons(userStoryRows);
    
    var defectRows = $('.taskboard').find("tr[rowid^='Defect:']");
    AddButtons(defectRows);
}

function AddButtons(rows)
{
    $.each(rows, function (i, item) {
        var row = rows.eq(i);
        var tasks = row.find('td.status');
        
        var task = tasks.eq(0);            
        AddButton(task);
    });
}

function AddButton(taskItem)
{
    taskItem.append('<button class="btnAddTask">+</button>');
    
    var btn = taskItem.find('.btnAddTask');
    btn.css('position', 'relative');
    btn.css('float', 'right');
    
    btn.css('-moz-border-radius', 50);
	btn.css('border-radius', 50);
    
    btn.css('background', 'white');
    
    $('.btnAddTask').click(function (event) 
	{
        var row = $(event.target).parent().parent();
        var rowid = row.attr('rowid');

        url = 'http://v1.addmorevalue.se/VersionOne/Default.aspx?Page=Widgets/Lists/Planning/WorkitemPlanning/TaskTestList/Controls/AddTask&AssetContext=' + rowid + '&Bubble=' + rowid;
        
        window.open(url, 'new task', "width=800, height=600");
    });
}

function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}

// *************************************************************************************************
// Code for floating column names ******************************************************************
// *************************************************************************************************

function AddFloatingColumns()
{
	var table = $('.taskboard');
    var tbody = table.find("tbody").eq(0);
    var headerRow = table.find("tr[class='header']");
    var tds = headerRow.find('td');
    
    var floatingHeaders = '<div id="floatingHeader" style="background-color:#fff;position:fixed;bottom:0;">';
    
    $.each(tds, function (i, td) 
    {
        var tdWidth = tds.eq(i).width();
        var tdHeight = tds.eq(i).height();
        
        var divText = tds.eq(i).html();
        
        var nextDiv = '<div style="'
        	+ 'background-color:#262626;'
        	+ 'color:#fff;'
        	+ 'float:left;'
        	+ 'width:' + tdWidth + 'px;'
        	+ 'height:' + tdHeight + 'px;'
        	
        	+ 'padding-top: 5px;'
			+ 'padding-bottom: 5px;'
        
        	+ 'display:table-cell;'
        	+ 'vertical-align:middle;'
        	+ 'text-align:center;'
        
        	+ 'margin-right:2px;';
        
        if(i == 0)
        {
            nextDiv += 'padding: .4em;';
        }
        
        nextDiv += '">' + divText + '</div>';
        
        floatingHeaders += nextDiv;
    });
    
    floatingHeaders += '</div>';
    
    tbody.append(floatingHeaders);
}