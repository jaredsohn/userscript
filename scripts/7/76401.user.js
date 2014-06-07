// JavaScript Document
// ==UserScript==
// @name           stratigos help 300
// @autor          fridian
// @description    vazei suntetagmenes sta minimata tou stratigou
// @include        http://s99.gr.ikariam.com/index.php?view=embassyGeneralAttacksToAlly*


// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://cgi.di.uoa.gr/~std05242/javascripts/alpha-coords.min.js

// ==/UserScript==


	/* Add required styles */
	GM_addStyle(
		"#PlayPen textarea { font-family: courier; width:97%; }"	);

	/* Build intial playpen */
	$("#mainview").append(	
		'<div id="PlayPen" class="contentBox01h">' +
			'<h3 class="header">' +
				'fridian\'s generals help' +
			'</h3>' + 
			'<div class="content">' +
				'<textarea rows="5" readonly></textarea>' +
				'<div class="footer"></div>' +
			'</div>' +
		'</div>');

   var wra = $("#servertime").text();
   $("div#PlayPen textarea").append(wra+"\n");
   
   var ids = new Array();
   ids=[];
   var cc=0;
   $("a[href*='island&cityId=']").each(function() {
   
     if(cc == 0)
     {
        cc=1;
     }
     else
     {
       cc=0;
       ids.push($(this).attr('href').substr(
					$(this).attr('href').indexOf('island&cityId=') + 14));
     }
   
   });
   
   var num=-1;
   $("#mainview table.table01 tr.rowRanks").each(function() {
      num++;
      var count = 0;
      $(this).find("td").each(function(){
        count++;
        var text;
        
        if( count == 1 )
        {
           text = $(this).find("div.time").text();
        }
        else
        {
           text = $(this).text();
        }
        $("div#PlayPen textarea").append(text+" ");
        if( count == 1 || count == 2 || count == 3 )
           $("div#PlayPen textarea").append("_ ");
        else if( count == 4 )
          $("div#PlayPen textarea").append("--> ");
        
      });
      
      $("div#PlayPen textarea").append(coords[ids[num]]+"\n");
   });