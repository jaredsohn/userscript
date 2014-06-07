// Ornagai Dictionary
// version 1.3.1
// 2010-04-26
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
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "ornagai dictionary", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Ornagai Dictionary
// @namespace     http://www.ornagai.com
// @description   Ornagai Dictionary select text
// @exclude       
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
           letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
        //alert($); // check if the dollar (jquery) function works
        //alert($().jquery); // check jQuery version
       $("body").mousedown(function(){
        	$("#ornagai").html("");
        	$("#ornagai").fadeOut("fast");
        });
        
        /*$("body").mouseup(function(kmouse){
        	$("#ornagai").html('Searching...');
        	show_ornagai(getSelected());
        	$("#ornagai").css({left:kmouse.pageX+15, top:kmouse.pageY+15});
        	$("#ornagai").fadeIn("fast");
        });
        */
        $("body").dblclick(function(kmouse){
        
        $("#ornagai").css({left:kmouse.pageX+15, top:kmouse.pageY+15});
        $("#ornagai").fadeIn("fast");
        	$("#ornagai").html('Searching...');
        	show_ornagai(getSelected());
        	
        	
        });
        
        $("body").mouseup(function(kmouse){
	        select_txt=getSelected();
	        if(select_txt!="")
	        {
	        	$("#ornagai").css({left:kmouse.pageX+15, top:kmouse.pageY+15});
		        $("#ornagai").fadeIn("fast");
		        	$("#ornagai").html('Searching...');
		        	show_ornagai(getSelected());
		     }
        	
        	
        });
        
    }

function getSelected() {
    if(window.getSelection) { return window.getSelection(); }
        else if(document.getSelection) { return document.getSelection(); }
                    else {
                            var selection = document.selection && document.selection.createRange();
                            if(selection.text) { return selection.text; }
                return false;
            }
            return false;
        }
 
 function show_ornagai(text)
 {
 	
 	query='select * from json where url="http://www.ornagai.com/index.php/api/word/q/'+text+'/format/json"';
 	
 	var url = "http://query.yahooapis.com/v1/public/yql?q="+encodeURIComponent(query)+"&format=json&callback=?";
 	
 	 $.getJSON(url,function(data){
 	 	if(data.query.results!=null)
 	 	{
 	 		if(data.query.results.json.json!= undefined)
 	 		{
	 	 		$("#ornagai").html(data.query.results.json.json.word[0]+"<br/>"+data.query.results.json.json.state[0]+"<br/>"+data.query.results.json.json.def[0]);
	 	 	}
	 	 	else
	 	 	{
	 	 		$("#ornagai").html("Not Found");
	 	 	}
	 	 }
	 	 else
	 	 {
	 	 	$("#ornagai").html("Not Found");
	 	 }
	 	
 	 });
 }
 
 function addHTML (html) {
   if (document.all)
     document.body.insertAdjacentHTML('beforeEnd', html);
   else if (document.createRange) {
     var range = document.createRange();
     range.setStartAfter(document.body.lastChild);
     var docFrag = range.createContextualFragment(html);
     document.body.appendChild(docFrag);
   }
   else if (document.layers) {
     var l = new Layer(window.innerWidth);
     l.document.open();
     l.document.write(html);
     l.document.close();
     l.top = document.height;
     document.height += l.document.height;
     l.visibility = 'show';
   }
 }
 
 addHTML("<div style='display:none;border:1px solid #333;position: absolute;opacity: 0.9;padding:10px;font-size:16px;font-family: Zawgyi-one;z-index:99999; background-color:#FEFEEE;' id='ornagai'></div>");
 ///
 