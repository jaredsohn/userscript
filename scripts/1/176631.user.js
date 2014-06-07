// ==UserScript==
//
//Displayable Name of your script 
// @name           Redmine GUI
//
// brief description
// @description    Polish the Redmine GUI, removes useless columns that I don't need. Please update the include to add your local redmine address. Original source code from: http://userscripts.org/scripts/source/114555.user.js
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://userscripts.org/users/thangtran/
//
// Your name, userscript userid link (optional)   
// @author         ThangTran (http://userscripts.org/users/thangtran/) 
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       http://userscripts.org/users/thangtran/
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        https://10.8.0.25/*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        http://code.jquery.com/jquery-2.0.3.min.js
//
// @history        1.0 first version
//
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
	'body,#wrapper,#main{background-color:#fff}'+
    'a, a:link, a:visited {color: #4d213b; font-size: 10px}'+
	'a:hover, a:active {color: #DD4B39; outline:none;}'+
	'#content{box-shadow:12px 0 18px -13px #aaa , -1px 0 1px -6px #fff;}'+
	'#top-menu{margin:0 0 5px;padding:5px 18px 2px;color:#333;}'+
	'#top-menu{background-color:#575757 !important; color:#fff; }'+
	'#top-menu a{color:#fff;font-weight:normal;text-decoration:none;margin-right: 15px;}'+
	'#top-menu #loggedas{color:#aaa;}'+
	'#header{background-color: #f1f1f1;color:#666;border-bottom: 1px solid #E4E4E4;margin:0 0 15px;height:35px;}'+
	'#header:hover{opacity:1;}'+
	'#header img,#header h1{display: none;}'+
	'#quick-search{}'+
	'#quick-search input, #quick-search select{border: 1px solid #E4E4E4; background-color: rgba(255,255,255,1) }'+
	'#quick-search select{ -moz-border-radius: 0 5px 5px 0; padding: 1px 2px 2px; border-left:1px solid #ccc;}'+
	'#quick-search,#quick-search a{color: #f1f1f1;}'+
	'#quick-search a{display:none;}'+
	'#quick-search #q{margin-right:-4px;-moz-border-radius: 5px 0 0 5px;}'+
	'#main-menu{top: 6px;left:17px;}'+
	'#main-menu li a { background: -moz-linear-gradient(center top , #F5F5F5, #F1F1F1) repeat scroll 0 0 transparent !important; -moz-border-radius: 2px; border: 1px solid rgba(0, 0, 0, 0.1);color:#666;font-size:10px; }'+
	'#main-menu li a:hover,#main-menu li a.selected {background:#fff; text-decoration: none;border: 1px solid rgba(0, 0, 0, 0.5);color:#000;}'+
	'h1, h2, h3, h4{font-family: "Century Gothic", "Tw Cen MT", Futura, "URW Gothic L", Arial, sans-serif;}'+
	'#header h1{font-family:"Century Gothic", "Tw Cen MT", Futura, "URW Gothic L", Arial, sans-serif; text-transform:uppercase; margin:0 0 0 10px;font-size:21px;font-weight:normal;color:#464646;text-shadow:0 1px 0 #fff;}'+
	'#sidebar a{ text-decoration: none; padding: 5px 10px; display: block;font-size:11px;}'+
	'#sidebar a:hover{ -moz-border-radius: 5px; background: #eeeeee;}'+
	'#sidebar h3{ color: #DD4B39;margin:10px 0 5px 10px;}'+
	'#sidebar p{margin-left:10px;}'+
	'#sidebar br{line-height: 0; }'+
	'#login-form table{ background-color: #fff; border: 1px solid #ccc; -moz-border-radius: 5px;}'+
	'#sidebar input[type="checkbox"]{float:left; margin-top: 7px;}'+
	'#sidebar label{margin-left:10px;display:block; line-height:24px;}'+
	'div.issue{border: 0 none; background: #fff;}'+
	'#content, #main.nosidebar #content{border: 0 none; }'+
	'#content h2{color:#444;}'+
	'#main.nosidebar #content{box-shadow: none !important;}'+
	'.box{background-color: #fff; border:0 none;}'+
	'.nodata,.warning{background-color:#eee !important;border:1px solid #ccc !important;color:#666 !important;}'+
	'.gantt,.calendar,.news,.help,.other-formats,#watchers_form{display:none !important;}'+
	'#main-menu li a.new-issue{background:#DD4B39 !important;color:#fff !important;position:absolute;right:-70px;}'+
	'#footer{display:none;}'+
	'fieldset.collapsible{border:0 none;}'+
	'fieldset.collapsed{float:left; opacity:.7;}'+
	'fieldset.collapsed:hover{ opacity:1;}'+
	'.contextual{opacity:.5;}'+
	'.contextual:hover{opacity:1;}'+
	'.buttons a{opacity:.5;}'+
	'.buttons a:hover{opacity:1;}'+
	'table.list thead th{border:0 none;}'+
	'table.list{border:0 none;}'+
	'table.list tbody td, table.list tbody tr:hover td{border:0 none; border-bottom:1px solid #E4E4E4;}'+
	'tbody tr{border-bottom:1px solid #E4E4E4;}'+
	'table.list tbody tr:hover{background-color:#f1f1f1;}'+
	'.context-menu-selection,.context-menu-selection:hover{background-color: #b5ddf7 !important;color:#333 !important;}'+
	'.context-menu-selection a, .context-menu-selection a:hover{color:#333 !important;}'+
	'div.wiki ul.toc {background: #eee; }'+
	'div.flash.notice {border-radius: 0 0 5px 5px;box-shadow: 0 0 5px #000;left: 42%;position: absolute;top: -10px;}' + 
        
    'table.list thead tr th[title*="Updated"] {display: none;}' + 
    'table.list thead tr th[title*="Start date"] {display: none;}' + 
    'table.list thead tr th[title*="Due date"] {display: none;}' + 
    'table.list thead tr th[title*="Estimated time"] {display: none;}' + 
    'table.list thead tr th[title*="Category"] {display: none;}' + 
    '.updated_on, .start_date, .due_date, .estimated_hours, .category {display: none;}'
);

// entry point
$(document).ready(function ()
{    
    // run replacements
    ReplaceTracker();
    ReplacePriority();
    ReplaceLongStatus();    
    ReplaceAssignee();
    
    // add more functionalities
    AddPopupForIssueSubject();
    
    // reorder rows
    ReorderRows();
});

// replace Tracker, for example: "User Story" -> "US"
function ReplaceTracker()
{
    $(".tracker").each(function ()
    {
        // get text
        var container = $(this);
        var text = container.text();
        
        // cases
        if (text == "Task")
        {
            container.html("<img src='https://cdn1.iconfinder.com/data/icons/gnome-desktop-icons-png/PNG/64/Gnome-Task-Due-64.png' height='16'>");
        }
        if (text == "Bug")
        {
            container.html("<img src='http://upload.wikimedia.org/wikipedia/commons/3/3f/Crystal_Project_bug.png' height='16'>");
        }
        if (text == "User Story")
        {
            container.text("US");
        }
    });
}

// replace Priority, change background color based on priority level
function ReplacePriority()
{
    $(".priority").each(function ()
    {
        // get text
        var container = $(this);
        var text = container.text();
        
        // cases
        if (text == "High")
        {
            container.css("background-color", "red").css("color", "white");
        }
        if (text == "Normal")
        {
            // no change
        }
        if (text == "Low")
        {
            container.css("background-color", "lightgray").css("color", "gray");
        }
    });
}


// replace long status text into shorter ones, for example: "Ready to test" -> "Test"
function ReplaceLongStatus()
{
    $(".status").each(function ()
    {
        // get text
        var container = $(this);
        var text = container.text();
        
        // cases
        if (text == "Ready to test")
        {
            container.text("-> Test").css("background-color", "lime");
        }
        if (text == "New")
        {
            // no change
        }
        if (text == "In Progress")
        {
            container.text("Progress").css("background-color", "yellow");
        }
        if (text == "Tested and Reviewed")
        {
            container.text("OK").parents("tr:first").css("color", "lightgray");
            container.text("OK").parents("tr:first").find("a").css("color", "lightgray");
        }
    });
}

// replace long Assignee names, for example: "Maria Arcelita Pagtabunan" --> "Ace"
function ReplaceAssignee()
{
    $(".assigned_to").each(function ()
    {
        // get text
        var container = $(this);
        var text = container.text();
        
        // cases
        if (text == "Phuc Truong")
        {
            container.text("Phuc");
        }
        if (text == "Phuoc Thai")
        {
            container.text("Phuoc");
        }
        if (text == "Thien Ly")
        {
            container.text("Thien");
        }
        if (text == "Vinh Nguyen")
        {
            container.text("Vinh");
        }
        if (text == "Thang Tran")
        {
            container.text("Thang");
        }
        if (text == "Maria Arcelita Pagtabunan")
        {
            container.text("Ace");
        }  
        if (text == "Ferdinand Dungan")
        {
            container.text("Macoy");
        }          
        if (text == "Lisa Wong")
        {
            container.text("Lisa");
        }   
    });
}

// add a popup window for Task subject in Issues list
function AddPopupForIssueSubject()
{
    // append quick view panel to the sidebar
    //$("#sidebar").prepend("<div id='quickview' style='display: none;'><h3>Quick View</h3><div id='quickviewtitle'/><div id='quickviewcontent'/>");
    $("#sidebar").prepend("<div id='quickview' style='display: none;'><h3 id='quickviewtitle'>Quick View</h3><div id='quickviewcontent' style='overflow: scroll; min-height: 50px; max-height: 500px;'/>");

    $(".subject > a").each(function ()
    {
        // get link
        var link = this.href;
        var text = this.text;
    
        // add onmouseenter event
        $(this).parents("tr:first").click(function ()
        {                                                    
            // show container first
            $("#quickview").show();
            $("#quickviewtitle").text(text);
            
            // // if already in cache
            // var cachedContent = getCache(link, null);
            // if (cachedContent !== null)
            // {
                // // load from cache
                // $("#quickviewcontent").html(cachedContent);
                // return;
            // }
            
            // otherwise, load from server            
            $("#quickviewcontent").text("Loading...").load(link + " " + ".issue > .wiki");
            // $("#quickviewcontent").fadeOut().text("Loading...").fadeIn("slow").load(link + " " + ".issue > .wiki", null, function(data)
            // {
                // // add to cache
                // setCache(link, data);                
            // });
        });
    });
}

// reorder rows based on the row content
function ReorderRows()
{
    // get columns index
    var columnIndexId = $("th[title*='#']").index();
    var columnIndexTargetVersion = $("th[title*='Target version']").index();
    // var columnIndexParentTask = $("th[title*='Parent task']").index();
    
    // get all rows
    var rows = $(".list.issues > tbody > tr");
    
    // // for each row
    // for (var i = 0 ; i < rows.length - 1; i++)
    // {
        // for (var j = 1; j < rows.length; j++)
        // {
            // // compare
            // if (CompareRow(rows[i], rows[i+1], columnIndexId, columnIndexTargetVersion))
            // {
                // // swap row
                // SwapRow(rows, i, i+1);
            // }
        // }
    // }
    
    // source: http://stackoverflow.com/questions/2875341/javascript-bubblesort-how-to-improve-its-efficiency
    var swapped;
    do 
    {
        swapped = false;
        for (var i = 0; i < rows.length - 1; i++) 
        {
            if (CompareRow(rows[i], rows[i+1], columnIndexId, columnIndexTargetVersion)) 
            {
                // swap row
                SwapRow(rows, i, i+1);
                swapped = true;
            }
        }
    } 
    while (swapped);
    
    // // group parent tasks
    // if (columnIndexParentTask !== -1)
    // {
        // // for each row
        // for (i = 0; i < rows.length; i++)
        // {
            // // get parent task ID
            // var parentId = rows[i].cells[columnIndexParentTask].innerText.match(/\d+$/);
            
            // // skip if no parent
            // if (parentId === null)
            // {
                // continue;
            // }
            
            // // get parent row
            // var parentRow = $(".id > a:contains('" + parentId + "')").parents("tr:first");
            
            // // move current row after parent row
            // console.log(rows[i]);
            // console.log(parentRow);
            // $(rows[i]).after(parentRow);
            
            // // refresh rows
            // rows = $(".list.issues > tbody > tr");
        // }
    // }
}

// compare 2 rows
function CompareRow(row1, row2, columnIndexId, columnIndexTargetVersion)
{
    // compare target version
    if (columnIndexTargetVersion !== -1)
    {
        var version1 = parseInt(row1.cells[columnIndexTargetVersion].innerText.match(/\d+$/));
        var version2 = parseInt(row2.cells[columnIndexTargetVersion].innerText.match(/\d+$/));
        if (isNaN(version1))
        {
            version1 = -1;
        }  
        if (isNaN(version2))
        {
            version2 = -1;
        }  
        
        if (version1 != version2)
        {            
            return version1 < version2;
        }
    }

    // compare id 
    var id1 = parseInt(row1.cells[columnIndexId].innerText);
    var id2 = parseInt(row2.cells[columnIndexId].innerText);
        
    return id1 < id2;
}

// swap 2 rows
function SwapRow(rows, id1, id2)
{
    // sort on UI
    $(rows[id1]).before($(rows[id2]));
    
    // also sort on the memory list, otherwise incorrect sort will occur
    var temp = rows[id1];
    rows[id1] = rows[id2];
    rows[id2] = temp;
}

// get/set value in the cache
// function setCache(name, value)
// {
    // unsafeWindow.redminegui_cache = unsafeWindow.redminegui_cache || new Array();
    // unsafeWindow.redminegui_cache[name] = value;
// }
// function getCache(name, defaultValue)
// {
    // unsafeWindow.redminegui_cache = unsafeWindow.redminegui_cache || new Array();
    // return unsafeWindow.redminegui_cache[name] === undefined ? defaultValue : unsafeWindow.redminegui_cache[name];
// }