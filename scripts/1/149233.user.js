// ==UserScript==
// @name       Books 24x7 With Columns and Shortcuts
// @version    0.2
// @description  View the book with three columns. Press alt + < for previous page. Press alt + > for next page. I saw this idea on http://userscripts.org/scripts/show/4033 but that version doesn't work.
// @match      *://*.books24x7.com/assetviewer.aspx*
// @copyright  2012+, Rafael Abraham
// ==/UserScript==


   

        
(function(){
  //boilerplate greasemonkey to wait until jQuery is defined... http://stackoverflow.com/questions/2507802/why-is-undefined-when-i-try-to-use-jquery-in-greasemonkey?rq=1
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
  }
  GM_wait();

  function letsJQuery($)
  {
      (function(){
          
          WebFontConfig = {
    google: { families: [ 'Noto+Serif::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
          
         $("#ctl00_ContentPlaceHolder1_ContentAreaUpdatePanel")
            .css({
                "-webkit-column-rule-color":" rgb(36, 35, 35)",
                "-webkit-column-width":" 600px",
                "-webkit-column-count":" 2",
                "-webkit-box-shadow":" 10px 10px rgb(146, 146, 146), -10px -10px rgb(146, 146, 146), 0px 0px 10px 10px rgb(146, 146, 146)",
                "-webkit-column-gap":" 150px",
                "-webkit-column-rule":" rgb(87, 69, 69) dotted 2px",
                "padding":" 20px",
                "border":" black solid 3px",
                "margin":" 40px",
                "font-family":" 'Noto Serif'",
                "-moz-column-rule-color":" rgb(36, 35, 35)",
                "-moz-column-width":" 600px",
                "-moz-column-count":" 2",
                "-moz-box-shadow":" 10px 10px rgb(146, 146, 146), -10px -10px rgb(146, 146, 146), 0px 0px 10px 10px rgb(146, 146, 146)",
                "-moz-column-gap":" 150px",
                "-moz-column-rule":" rgb(87, 69, 69) dotted 2px",
                "column-rule-color":" rgb(36, 35, 35)",
                "column-width":" 600px",
                "column-count":" 2",
                "box-shadow":" 10px 10px rgb(146, 146, 146), -10px -10px rgb(146, 146, 146), 0px 0px 10px 10px rgb(146, 146, 146)",
                "column-gap":" 150px",
                "column-rule":" rgb(87, 69, 69) dotted 2px"
                
                
            });
          $("#ctl00_ContentPlaceHolder1_ContentAreaUpdatePanel p")
            .css({
                "line-height": "1.5em",
                "font-family": "Noto Serif",
                "font-size": "1.5em",
                "color": "#444"
                
            });
          
          
         $("#ctl00_ContentPlaceHolder1_TopProgressControl_PreviousSection").attr("accessKey", "," );
         $("#ctl00_ContentPlaceHolder1_BottomProgressControl_NextSection").attr("accessKey", "." );
          $("#ctl00_ContentPlaceHolder1_ContentAreaUpdatePanel div:nth-child(2)").add( $("#ctl00_ContentPlaceHolder1_ContentAreaUpdatePanel div:nth-last-child(2)").last()).css({"-webkit-column-span": "all",
                                                                                       "padding": "20px 40px 30px 20px"});
         
          $("#HeaderTable").hide();

		$("#MenuTD").hide();
         $("#ctl00_ContentPlaceHolder1_AssetMetaUpdatePanel").before("<div id='myMenu'><div><a title='table of contents' href='#' id='tableOfContentsButton'>Show Table of Contents</a> " +
                                                                     "| <a title='Columns' href='#' id='ColumnsButton'>Remove Columns</a> " +
                                                                    "| <a title='Header' href='#' id='HeaderButton'>Show Header</a></div> </div> <div > <a id='metaMenu' href='#'> X </a> </div>");
          
          $("#myMenu, #metaMenu").css({     "position":" fixed",
			"background":" white",
			"padding":" 10px",
			"padding-right":" 20px",
			"-webkit-box-shadow":" 5px 5px 30px 5px #444",
			"box-shadow":" 5px 5px 30px 5px #444",
			"top":" 0",
   			 "right":" 0"});
          $("#metaMenu").css("padding", "3px");
      
           $("#tableOfContentsButton").click(function(e){
               e.preventDefault();
             $("#MenuTD").toggle(function(){
                  $('#tableOfContentsButton').text(
      				$(this).is(':visible') ? "Hide Table of Contents" : "Show Table of Contents"
                  );
              });
         });
          $("#metaMenu").click(function(e){
              e.preventDefault();
              $("#myMenu").toggle(function(){
                  $('#metaMenu').text(
      				$(this).is(':visible') ? "X" : "+"
                  );
              });
         });
           $("#HeaderButton").click(function(e){
              e.preventDefault();
              $("#HeaderTable").toggle(function(){
                  $('#HeaderButton').text($(this).is(':visible') ? "Hide Header" : "Show Header");
                  $("#container").css("height", $(this).is(':visible') ?  $("#container").data("height") : "");
              });
         });
          $("#ColumnsButton").click(function(e){
              e.preventDefault();
              $me = $("#ctl00_ContentPlaceHolder1_ContentAreaUpdatePanel");
              if($me.css("width") == "700px"){
                  $me.css({"width": "",
                           "margin": "40px"
                          });
                  $(this).text("Remove Columns");
              }
              else{
                  $me.css({"margin": "20px auto",
                           "width": "700px"
                          });
                  $(this).text("Add Columns");
              }
             
             
         });
          $("#container").data("height", $("#container").css("height"));
          $("#container").css("height", "");
          
                               
        })()
  }
})();