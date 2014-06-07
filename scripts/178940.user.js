// ==UserScript==
// @name        ASL Smartsign Trigger
// @namespace   https://m3.cip.gatech.edu/d/ogoldbart3/
// @description ASL Test 131018
// @version     23
// @include http://*/*
// @include https://*/*
// @include chrome://*/*
// @grant metadata
// @grant GM_xmlhttpRequest
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


$(document).ready(function() {
	$('body').append('<div id="lightbox" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);text-align:center;z-index:9999"></div>');
    //$('html').prepend('<div id="searchwindow" style="position:fixed;width:15%;height:10%;top:0;right:0;text-align:center;z-index:8888"> <table><tr><td><img src="http://m3.cip.gatech.edu/d/ogoldbart3/w/hosting/c/ssdlogo.JPG" style="vertical-align: top" width="49" height="47"></td><td><textarea id="triggertext" rows="2" cols="20">SMARTSign-Assistant</textarea> <button id="triggerbutton">Trigger</button></td></td></table></div>');
    $('html').prepend('<div id="searchwindow" style="position:fixed;width:15%;height:10%;top:0;right:0;text-align:center;z-index:8888"> <table><tr><td><img src="http://m3.cip.gatech.edu/d/ogoldbart3/w/hosting/c/ssdlogo.JPG" style="vertical-align: top" width="49" height="47"></td><td><textarea id="triggertext" rows="2" cols="20">SMARTSign-Assistant</textarea></td></td></table></div>');
    
    
    $("#triggertext").keyup(function(event){
    if(event.keyCode == 13){
        //$("#triggerbutton").click();
        var t = $("#triggertext").val();
        t = t.replace(/'s/g,"");
        t = t.replace(/'d/g,"");
        t = t.replace(/~ /g," ");
        t = t.replace(/~/g," ");
        t = t.replace(/_/g," ");
        t = t.replace(".", "");
        t = t.replace(",","");
        t = t.replace("!", "");
        t = t.replace("?","");
        t = t.replace(";","");
        t = t.replace(",", "");
        t = t.replace("_","");
        console.log( "testing" );
        console.log( $("#triggertext").val() );
        $("#searchwindow").hide();
        //$("#triggertext").hide();
    	$("#triggertext").val( "" );
        showVideos( t );
        
        //$("#searchwindow").hide();
    }
     
	});
    
    
        
    $("#searchwindow").click(function() {
	    // Gets click
        $("#triggertext").val( "" );
        
    });
    
	//showVideos(document.getElementById(\'triggertext\').value)
	console.log("ex3");


	$("body").dblclick(function() {
	    // Gets clicked on word (or selected text if text is selected)
	    var t = '';
	    var s = window.getSelection();
	    if (s) {
	    	if (s.isCollapsed) //nothing is selected. Only clicked.
	        {
	           
	            s.modify('move', 'forward', 'character');
	            s.modify('move', 'backward', 'word');
	            s.modify('extend', 'forward', 'word');
	           
	            //s.modify('move', 'forward', 'character'); //clear selection
	            console.log("happened " + s.toString() );
	            
	 			t = s.toString();
                t = t.replace(/'s/g,"");
                t = t.replace(/'d/g,"");
		        t = t.replace(/~ /g," ");
                t = t.replace(/~/g," ");
                t = t.replace(/_/g," ");
                t = t.replace(".", "");
                t = t.replace(",","");
    		    t = t.replace(";","");
                t = t.replace("!", "");
                t = t.replace("?","");
                t = t.replace(",", "");
                t = t.replace("_","");
	            
	            s.modify('move', 'forward', 'character'); //clear selection
	        }
	    }
	    console.log('http://smartsign.imtc.gatech.edu/videos?keywords=' + t);

		//Ajax call to database, input = t, fails in function, and won't return data
		//however, data is visible, and succeeded in the GET command when viewed
		//from within browser's network tab of console

		if ( ( t !== "" )&&( t.length <= 100 ) ) {
			var idArray;

            t.replace("~", " ");
            
            showVideos( t );
	        

		}
	});

	$("body").click(function() {
	    // Gets clicked on word (or selected text if text is selected)
	    var t = '';
	    var s = window.getSelection();
	    if (s) {
	    	if (s.isCollapsed) //nothing is selected. Only clicked.
	        {
	           
	        } else {
	        	console.log("not happened " + s.toString() );

	    		t = s.toString();

	            t = t.trim();
                t = t.replace(/'s/g,"");
                t = t.replace(/'d/g,"");
        		t = t.replace(/~ /g," ");
                t = t.replace(/~/g," ");
                t = t.replace(/_/g," ");
                t = t.replace(".", "");
                t = t.replace(",","");
                t = t.replace(";","");
                t = t.replace("!", "");
                t = t.replace("?","");
                t = t.replace(",", "");
                t = t.replace("_","");
            
	        }
	    }
	    console.log('http://smartsign.imtc.gatech.edu/videos?keywords=' + t);

		//Ajax call to database, input = t, fails in function, and won't return data
		//however, data is visible, and succeeded in the GET command when viewed
		//from within browser's network tab of console

		if ( ( t !== "" )&&( t.length <= 100 ) ) {
			var idArray;

            
            t.replace("~", " ");
            
	        showVideos( t );

		}
	});
    
    

});

function showVideos( t ) {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://smartsign.imtc.gatech.edu/videos?keywords=" + t,
        onload: function(response) {
            var data = $.parseJSON(response.responseText);
            
            idArray= new Array(data.length);
            orderedIdArray= new Array(data.length);
            
            
            
            
            for ( var i = 0; i < data.length; i++ ) {
                idArray[i] = '<iframe width="420" height="345" align:right src="http://www.youtube.com/embed/' + data[i]['id'] + '?rel=0"> </iframe>';
                console.log( idArray[i] );
                
            }
            
            console.log( data.length);
            
            var htmlString = '<div style="width:100%;position=absolute;text-align:right"> <div style="position:relative;left:72%;width:420px;text-align:left;">';
            
            
            
            var last = idArray.length - 1;
            var currnumber;
            
            for(var j=0; j<idArray.length; j++) {
                if ( data[j]['keywords'] ) {
                    if ( data[j]['keywords'][ data[j]['keywords'].length - 1 ].charAt(0) == "{" ) {
                        //console.log( data[j]['keywords'][ data[j]['keywords'].length - 1 ] );
                        
                        currnumber = data[j]['keywords'][ data[j]['keywords'].length - 1 ];
                        currnumber = currnumber.slice( 1, currnumber.length - 1 );
                        console.log( currnumber );
                        orderedIdArray[ currnumber ] = idArray[j];
                        //orderedId[ 
                    }
                    else { 
                        console.log( "not found" );
                        orderedIdArray[ last ] = idArray[j];
                        last--;
                    }
                } 
            }
            
            for(var k=0; k<idArray.length; k++) {
            	
                htmlString += orderedIdArray[k];  
            }
                
            $('#lightbox')
            .html(htmlString + '</div></div>')
            .css({"line-height":($(window).height()*0)+"px", "overflow":"auto", "display":"block"})
            .fadeIn('fast')
            .live('click', function() {
                $(this).fadeOut('fast');
                $('#searchwindow').show();
            });
            //console.log( htmlString );
            console.log("running fine");
            console.log("T = " + t);
            
            
            
        	$('#searchwindow').hide();
        }
        
    });
}