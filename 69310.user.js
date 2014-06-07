// ==UserScript==
// @name           OWLito
// @namespace      http://www.ludoholic.com/greasemonkey
// @description    A helper script for JeffyJeff's OnLine Want List Generator (OLWLG)
// @include        http://bgg.activityclub.org/olwlg/*
// @grant       none
//
// Author:  Ed Mittelstedt, email: bugladen !at! GMail
//
// Fixes:	Ryan Osborn
//          
//
// Features:
//      MyWants Page
//          * A checkbox is injected into the first cell of each row and first cell of each column.  Checking these special checkboxes will check the entire row or entire column.
//          * A hover window replaces the OWL click window for game information, by hovering the mouse over the first cell of each column or the first cell of each row.
//          * Firefox Users: Table Height:[+][-] controls exist on OWLito toolbar to increase or decrease the height of the table 
//
// v1.3.3
//      Release Date:   Apr.24.2013
//      - Fix: Update to work with latest version of OLWLG (Ryan Osborn)
//
// v1.3.2
//      Release Date:   Sep.20.2011
//      - Fix: Checkboxes are no longer injected into dummy rows
//      - Fix: Dummy cells are no longer checked when checking the entire column
//
// v1.3.1
//      Release Date:   Sep.15.2011
//      - Fix: OWLito can now work with OLWLG again.  
//      - Fix: Handling of checkbox toggling with new version of OLWLG
//
// v1.3
//      Release Date:   Jan.17.2011
//      - Feature: Firefox Users: Table height resizing code now gets its initial value from actual table height rather than an arbitrary hard-coded value
//      - Feature: Check boxes for each row now float, eliminating the need to add more height to each row.
//
// v1.2
//      Release Date:   Feb.26.2010 
//      - Feature: Firefox Users: Modified OWLito toolbar to step increase and decrease the height of the table with Table Height:[+][-]
//      - Feature: Prettified hover window with OWLito purple, a caption bar, and a close button.
//
// v1.1
//      Release Date:   Feb.25.2010 
//      - Feature: Firefox Users: Added [Table Height++] link on OWLito toolbar to step increase the height of the table
//      - Fix: Added support for Opera browers

// v1.0.2
//      Release Date:   Feb.22.2010
//      - Fix: Removed $ link as JeffyJeff added it to the OLWLG core
//
// v1.0.1
//      Release Date:   Feb.19.2010
//      - Fix: Made popups sticky, and gave them a timeout of 1.5 seconds
//      - Fix: Moved OWLito bar to the top and made it less pronounced
//      - Fix: OWlito bar now displays what is going on during load
//      - Fix: Script now avoids "script is taking too long" dialogs
//      - Fix: Better formatting of the first and second cell in each row
//
// v1.0
//      Initial Release
//
// ==/UserScript==

    var owlitoVersion = "v1.3.3";
    var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
    var isOpera = navigator.userAgent.indexOf("Opera") != -1;
    var isChrome = navigator.userAgent.indexOf('Chrome') != -1;

    
    //Arrays used to track various ids of rows and columns
    var mineIndexArray = Array();
    var mineIDArray = Array();


    //Are we in the MyWants page?
    var inMyWantsPage = window.location.href.indexOf("mywants.cgi") != -1;


    //If we are in the MyWants page, execute this
    if (inMyWantsPage)
    {
        // Inject empty style element into the DOM
        //var styles = document.createElement('style');
        //styles.id = 'OWLITO_Styles';
        //styles.type = 'text/css';
        //document.getElementsByTagName('head')[0].appendChild(styles);

        
        // Inject empty script element into the DOM
        var functions = document.createElement('script');
        functions.id = 'OWLITO_Functions';
        functions.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(functions);


        // Inject jQuery into the DOM
        var GM_JQ = document.createElement('script');
        GM_JQ.src = 'http://code.jquery.com/jquery-latest.js';
        GM_JQ.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(GM_JQ);


        // Inject overlibmws into the DOM
        var overlib = document.createElement('script');
        overlib.src = 'http://www.ludoholic.com/scripts/overlib/overlibmws.js';
        overlib.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(overlib);


        waitForScriptsLoad();

    }


    
    // Check if jQuery's and overlib is loaded.  If not, wait and check again
    function waitForScriptsLoad() 
    {
        var scriptWindow = (typeof unsafeWindow == "undefined" ? window : unsafeWindow);
        
        if(typeof scriptWindow.jQuery == 'undefined' || typeof scriptWindow.overlib == 'undefined') 
        //if (scriptWindow.jQuery == null || scriptWindow.overlib == null)
            window.setTimeout(waitForScriptsLoad,100); 
        else 
        {
            $ = scriptWindow.jQuery; 

            //Inject the DIV for overlib
            $("body").prepend('<div id="overDiv" style="position:absolute; visibility:hidden; z-index:1000"></div>');

            //Call the main function depending on the page we are in
            if (inMyWantsPage)
                myWantsMain();
        }
    }


    


    function myWantsMain() 
    {
        //Inject the functions needed by OWLito into the DOM
        InjectMyWantsHTML();


        //Remove the GameDesc DIV
        $("#gamedesc").remove();

        
        //Inject the OWLito toolbar into the DOM
        var code = '<div id="owlitoBar" style="color:purple; font-size:10pt">' +
            'OWLito ' + owlitoVersion;

        if (isFirefox)
            code += '&nbsp;&nbsp;&nbsp;Table Height:[<a style="font-size:12pt; text-decoration:none" href="javascript:OWLITO_IncreaseHeight()">+</a>][<a style="font-size:12pt; text-decoration:none" href="javascript:OWLITO_DecreaseHeight()">-</a>]';

        code += '&nbsp;&nbsp;&nbsp;<span id="owlitoMessage" style="font-size:10pt; font-weight:bold;">Injecting check boxes into each column...</span>' +
        '</div>';

        $("#table").before($(code));

        window.setTimeout(myWantsStep1, 200); 
    }



    function myWantsStep1()
    {
        //Find out which columns are valid by extracting the item# from them.  If this is a dummy column, then it will not contain an item#
        $("#wants thead th[id]").each(function(i)
        {
            var id = $(this).attr("id").substr(2);
            if (IsNumeric(id))
            {
                mineIndexArray.push(i);
                mineIDArray.push(id);
            }
        });

        //Now go through the array and inject the column headers with checkbox and mouse events
        do
        {
            var index = mineIndexArray.shift();
            var id = mineIDArray.shift();

            var closeimg = '<img src="http://www.ludoholic.com/greasemonkey/exit.gif" alt="Click to Close" width="12" height="11" border="0">';
            var th = $("#wants thead th[id]").eq(index);
            th.attr("onmouseover", CreateHoverWindow(id));
            th.attr("onmouseout", "nd(1500);");
            th.removeAttr("onclick");
            th.append("<div style='margin-top:10px'><input class='owlito' type='checkbox' id='chkAll" + id + "' onclick='OWLITO_CheckColumn(event, \"" + id + "\");' /></div>");
        }
        while (mineIndexArray.length > 0);


        $("#owlitoMessage").text("Injecting check boxes into each row...");
        window.setTimeout(myWantsStep2, 200); 
    }


    function myWantsStep2()
    {
        //Get the IDs of the rows that will need checkbox injecting
        $("#wants tbody tr[id][class!=ondummy]").each(function()
        { 
            var id = $(this).attr("id").substr(2);
            mineIDArray.push(id);
        });

        
        //Inject the rows with the checkbox
        do
        {
            var id = mineIDArray.shift();

            var td = $("#wants tbody tr[id=gn" + id + "] td:nth-child(2)");
            td.append("<div style='float:right'><input class='owlito' type='checkbox' id='chkAll" + id + "' onclick='OWLITO_CheckRow(event, \"" + id + "\");' /></div>");
        }
        while (mineIDArray.length > 0);

        $("#owlitoMessage").text("Injecting mouse events into each row...");
        window.setTimeout(myWantsStep3, 200); 
    }




    function myWantsStep3()
    {   
        //Get the IDs of the rows that will need mouse event injecting
        $("#wants tbody tr[id]").each(function()
        {
           var id = $(this).attr("id");
            id = id.substr(2);
            mineIDArray.push(id);
        });

        
        //Inject the rows with mouse events
        do
        {
            var id = mineIDArray.shift();

            var td = $("tr[id=gn" + id + "] td:first-child");

            var closeimg = '<img src="http://www.ludoholic.com/greasemonkey/exit.gif" alt="Click to Close" width="12" height="11" border="0">';
            td.attr("onmouseover", CreateHoverWindow(id));
            td.attr("onmouseout", "nd(1500);");
            td.removeAttr("onclick");
        }
        while (mineIDArray.length > 0);

        $("#owlitoMessage").text("Finishing Up...");
        window.setTimeout(myWantsStep4, 200); 
        
        
        
        //Finally remove the GameDesc DIV
        $("#gamedesc").remove();
    }




    function myWantsStep4()
    {

        //Increase the size of the table
        //$("#wants tbody").css("height", "700px");
        
        //Clear the message
        $("#owlitoMessage").text("");
    }




    function InjectMyWantsHTML()
    {
        //var styles = $("#OWLITO_Styles");
        //styles.append("");


        var functions = $("#OWLITO_Functions");

        var height = $("#wants tbody").css("height");
        height = height.slice(0, height.length - 2);

        functions.append(

            'var tableHeight = ' + height + ';' +

            'function OWLITO_CheckColumn(event, id)' +
			'{' +
			'	var valChecked = $("#chkAll" + id).prop("checked");' +
			'	if (valChecked == false)' +
			' 		$("#wants tbody tr[id][class!=ondummy] input[value$=" + id + "]").prop("checked", false);'+
			'	else'+
			'		$("#wants tbody tr[id][class!=ondummy] input[value$=" + id + "]").prop("checked", true);'+
			'	clicked(null, false);' +
			'	event.cancelBubble = true;' +
			'}' +



			'function OWLITO_CheckRow(event, id)' +
			'{' +
			'	var valChecked = $("#chkAll" + id).prop("checked");' +
			'	if (valChecked == false)' +
			'		$("#gn" + id + " td[class!=isdummy] input[value^=" + id + "]").prop("checked", false);'+
			'	else'+
			'		$("#gn" + id + " td[class!=isdummy] input[value^=" + id + "]").prop("checked", true);'+
			' 	clicked(null, false);' +
			'	event.cancelBubble = true;' +
			'}' +


            'function OWLITO_IncreaseHeight()' +
            '{' +
            '   tableHeight += 100;' +
            '   $("#wants tbody").css("height", tableHeight + "px");'+
            '}' +



            'function OWLITO_DecreaseHeight()' +
            '{' +
            '   tableHeight -= 100;' +
            '   $("#wants tbody").css("height", tableHeight + "px");'+
            '}'             

        );
    }



    //Hover window injection
    function CreateHoverWindow(id)
    {
        var closeimg = '<img src="http://www.ludoholic.com/greasemonkey/exit.gif" alt="Click to Close" width="12" height="11" border="0">';
        var text = "return overlib(desc" + id + ", " +
            "CAPTION, ' ', " +
            "CLOSECLICK, " + 
            "CLOSETEXT, '" + closeimg + "', " +
            "WRAP, " +
            "STICKY, " +
            "CGCOLOR, 'purple', " +
            "TEXTSIZE, 3, " +
            "WRAPMAX, 800, " + 
            "OFFSETX, 10, " +
            "OFFSETY, 10);";

        return text;
    }



    //Utility function
    function IsNumeric(sText)
    {
       var ValidChars = "0123456789.";
       var IsNumber=true;
       var Char;

     
        for (i = 0; i < sText.length && IsNumber == true; i++) 
        { 
            Char = sText.charAt(i); 
            if (ValidChars.indexOf(Char) == -1) 
                IsNumber = false;
        }

        return IsNumber;       
   }
