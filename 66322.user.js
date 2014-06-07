// ==UserScript==
// @name           fileManagerfix
// @namespace      qnap
// @include        http://*/cgi-bin/filemanager/filemanager.cgi*
// ==/UserScript==

// Add jQuery
	    var GM_JQ = document.createElement('script');
	    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
	    GM_JQ.type = 'text/javascript';
	    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	 
// Check if jQuery's loaded
	    function GM_wait() 
	    {
	        if(typeof unsafeWindow.jQuery == 'undefined')
                { window.setTimeout(GM_wait,100); }
	   	 else { $ = unsafeWindow.jQuery; letsJQuery(); }
	    }
	    GM_wait();


	 

	 
// All your GM code must be inside this function
	    function letsJQuery()
            {
                pageAll();
                addSelectAll();
            }
            
            function addSelectAll()
            {
                if($("input[type=checkbox]").size()>=1)
                {
                
                $("table.gray-12").append("<span> <input type='checkbox' class='selAll' >Select / Deselect All</span>");
                $(".selAll").click(function(){
                        if ( !$(this).attr("checked"))
                            $("input[type=checkbox]").not(".selAll").removeAttr("checked");
                        else $("input[type=checkbox]").not(".selAll").attr("checked","true");
                    });
                }
            }
            
            function pageAll()
            {
               
              $(".12wbf-alink a,.blue-12 a").each(function()
                    {
                        var attr='href';
                        var theAttr=$(this).attr(attr);
                        theAttr=theAttr.replace('page=1','page=all')
                        $(this).attr(attr,theAttr);
                      
                    });          
            }
     
    
