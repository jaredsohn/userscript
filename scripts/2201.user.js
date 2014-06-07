// Script to look up and create a popup image
// When a reaper item # is found inside forum postings
// version 0.7 Beta!!
// 2011-8-22
// Copyright (c) 2005, Daniel Joyce
// Parts of header (c)2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Reaper Forums SKU # -> Image Lookup Script
// @namespace     http://www.minifanaddict.com/reaper/forums
// @description   Hilight a reaper sku # anywhere on Reapermini.com, and it will popup a image of the fig.
// @include       http://www.reapermini.com/*
// @include       http://reapermini.com/*
// ==/UserScript==

// Version Info
// 0.5 Beta: First working version
// 0.6 Beta: Fixed bug by improving regex, where query would return a figure and it's parts for sale from
// the Reaper store. Used to select the first match, but this doesn't work.
// 0.7 Beta: Updated to work on new Reaper forum / website

// Data for table that pops up
window.skuImageTable = 
    "<table style='width:auto;background-color:transparent;'>\n"+
    "<tr style='border: none;'>\n" +
"	<td style='text-align:center;'>!title!</td><td style='text-align: right'><span id='close_!win_id!'>[X]</span></td> \n"+
"</tr> \n"+
"<tr style='border: none;'> \n"+
"	<td colspan='2' style='text-align: center;'><img src='!img_url!'></td> \n"+
"</tr> \n"+
"<tr style='border: none;'> \n"+
"	<td colspan='2' style='text-align: center;'><a href='#' onClick='javascript:window.open(&quot;!store_link!&quot;);'>Jump to Store<a></td> \n"+
"</tr>\n"+
"</table>\n";

// Using a closure to wrap the window id, so the
// returned close function has the proper id handle
window.buildCloseFunction = function(win_id){
    function closureFunction(e){
        // get the old table and delete it if it exists
        var div = document.getElementById(win_id);
        e.preventDefault();
        e.stopPropagation();
        window.getSelection().removeAllRanges();
        if ( div != null ){
            document.body.removeChild(div);
        }
    }
    return closureFunction;
};

window.lookupSkuImage = function(event){
    var winNumber = event.timeStamp;
    //alert(winNumber);
    var win_id = 'sku_img_lookup_' + winNumber;
    // Get selection positions
    var left = event.clientX + window.pageXOffset;
    var top = event.clientY + window.pageYOffset;
    //alert(""+window.pageXOffset+":"+window.pageYOffset);

    // Regex for pulling out a number of 4-5 digits
    //alert('caught event!');
    var skuNumRX = /(\d{4,5})/g;

    // Get the text selection
    var selText = window.getSelection().toString();
    window.getSelection().removeAllRanges();

    // Find a number inside it.
    var match = selText.match(skuNumRX);
    //alert(match[0]);

    // If we have a match, try and do a lookup...
    if (match.length > 0){

        // Start the XMLHTTP request, submitting the number to the reaper
        // store search page.
        var dataTxt = null;
        var m = match[0];
        if (m.length < 5){
            m = "0"+m;
        }

        try{
            //alert('Start Request');
            var req = new XMLHttpRequest();
            req.overrideMimeType("text/plain");
            var reqstr = 'http://www.reapermini.com/OnlineStore/'+m+"/sku-down/"+m;
            req.open('GET',reqstr,false);
            req.send('');
            dataTxt = req.responseText;
            //alert(dataTxt);
        }catch(e){
            alert(e);
        }


        //var matches = dataTxt.match(/<a href=product.php\?productid=\d+&cat=\d+&page=\d+><img src="(.*?)" width=70 alt=.*? border=0><BR>See details<\/a>\n<\/td>\n<td valign=top>\n<a href=product.php(\?productid=\d+&cat=\d+&page=\d+)><font class=ProductTitle>(\d{5} : .*)<\/font><\/a>/);
        //var img_url = matches[1];
        //var title = matches[3];
        //var store_link = matches[2];

        var title = dataTxt.match(/(\d{5}:\s.*?)</)[1];
        //alert(title);
        var img_url = dataTxt.match(/div id="gallery_detail"><img src="(.*?)" class="gimage"/m)[1];
        //alert(img_url);
        //var store_link 	= dataTxt.match(/<a href=product.php(\?productid=.+&cat=.+&page=.+?)/)[1];
        //alert(store_link);

        var table = skuImageTable;
        table = table.replace(/!win_id!/g,win_id)
        table = table.replace('!title!',title);
        table = table.replace('!img_url!',img_url);
        table = table.replace('!store_link!',"http://www.reapermini.com/OnlineStore/"+m+"/sku-down/"+m);

        // Add it to the document to display
        var newDiv = document.createElement('div');
        newDiv.innerHTML = table;
        newDiv.style.top = ''+top+'px';
        newDiv.style.left = ''+left+'px';
        newDiv.style.position = 'absolute';
        newDiv.style.border = '1px solid black';
        newDiv.style.borderRadius = '16px';
        newDiv.style.backgroundColor = '#FAFBFC';
        newDiv.style.boxShadow = '0px 0px 6px black';
        newDiv.style.padding = '5px';
        //newTbl.style.backgroundColor = '#FAFBFC';
        //newTbl.style.border = '1px solid black';
        //newTbl.style.borderRadius = '16px';
        //newTbl.style.width = 'auto';
        newDiv.id = win_id;

        document.body.appendChild(newDiv);
        var span = document.getElementById("close_"+win_id);
        // provide a function that contains a closure of the win_id
        f = buildCloseFunction(win_id);
        span.addEventListener('click',f,false);

        // Keep from getting weird click behaviours if the lookup was successful
        event.stopPropagation();
        event.preventDefault();
    }
};

// This will be hooked up to a eventlistener,
// And will be called on the mouseUp event
// After a possible mouseup event has occured.
document.addEventListener('mouseup',lookupSkuImage,false);