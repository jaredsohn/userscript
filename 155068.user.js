// ==UserScript==
// @name        Table2CSV
// @namespace   en.wikipedia.org
// @include     http://en.wikipedia.org/wiki/*
// @version     1
// @grant       none
// ==/UserScript==

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
            do_JQuery();
        }
    }
    
// Check for numeric value


    function isNumber(n) {
		return n.match(/^[\d]+[\d\,\.]*$/);
    }    
    
    function do_JQuery() {
        div_csv = $('<div/>').css("background-color","#FDFAD0");
        header = $('<h4/>').text("Data").attr("class","Table2CSVHeader"); 
        btn_csv = $('<a/>')
            .text('CSV')
            .click(function () { 
                    no_columns = $(this).parent().find("input").val();
                    arr = $(this).parent().find("tr");
					for (i = 0; i < arr.length; i++){
					  $(arr[i]).html($(arr[i]).html().replace(/<br>/g,'</td><td>')); 					
					}
                    console.log("Number of rows: " + arr.length);
                    html = "";
					prev_val = "";
                    for (i = 0; i < arr.length; i++){    
                        arr2 = $(arr[i]).find("td");
                        html = html + "<br>";
                        if ( isNumber(no_columns) ) {
                            len = parseInt(no_columns);
                        } else {
                            len = arr2.length;
                        }                        
                        for (j = 0; j < len; j++){ 
							if ($(arr2[j]).find("a").length > 0) {
                               val = $(arr2[j]).text();
						    } else {     
	                           val = $(arr2[j]).text();
							}
							val = val.replace(/\[\d*\]/g, "");	// Filter out footnotes
                            if ( !isNumber(val) )
                            {
								  if (val == "" && j == 0) {
									val = prev_val
							      } else {
                                    val = "\"" + val + "\""; 
								  }
                            } else {
							  re = /\,/g;
							  val = val.replace(re, "");
							}
							if (j == 0) {
								prev_val = val;
							}
                            html = html + val + ",";
                        }
						html = html.substring(0,html.length-1);
                    }                    
                    $(this).parent().prev().html(html);
                    $(this).parent().prev().prepend(header);
                });
        $("table").before(div_csv);        
        $('<input/>').attr({ type: 'text', size:'3', value:'*', id: 'no_columns', name: 'no_columns' }).prependTo('table');
        $('<p/>').prependTo('table').text("# Columns: ");
        $("table").prepend(btn_csv);       
    }
