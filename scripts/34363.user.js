// ==UserScript==
// @name           Daily Kos Comment Highlighter / Filters
// @namespace      gmonkeyfilter
// @description    Highlights/Filters comments on Daily Kos stories
// @include        http://www.dailykos.com/story/*
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var defaultShowTop25=false;
var defaultShowTop10=false;
var defaultShowTop5=false;

var $=window.jQuery;
window.jQuery.noConflict();
$(document).ready(function(){

        var arRecs=new Array();
				$(".cx span a").each(function(){
        var recs=$(this).text().split('+')[0];
        arRecs.push(parseInt(recs));
				});
        arRecs.sort(function (a, b) {return a - b;});
        var top25=arRecs[Math.floor(arRecs.length*.75)]
        var top10=arRecs[Math.floor(arRecs.length*.9)]
        var top5=arRecs[Math.floor(arRecs.length*.95)]
        var top2=arRecs[Math.floor(arRecs.length*.98)]
        
        $(".cx span a").each(function(){
        var recs=$(this).text().split('+')[0];
        var numrecs=parseInt(recs);
          var newbgcolor='';
          if(numrecs>=top25)newbgcolor='#FFFFcc';
          if(numrecs>=top10)newbgcolor='#FFFF99';
          if(numrecs>=top5)newbgcolor='#FFFF66';
          if(numrecs>=top2)newbgcolor='#FFDD66';
          if(newbgcolor!=''){
            $(this).parents("div.cx").css({backgroundColor: newbgcolor});
            }
        });

        //add filter links to top of comments section
        function hideBelow(threshold,showprompt){
           
						$(".cx span a").each(function(){
        			var recs=$(this).text().split('+')[0];
        			var numrecs=parseInt(recs);
        			if(numrecs<threshold){
								$(this).parents("div.cx").hide();
							}
						})
						$("#filterstatusdiv").html("*Filtered*");
				}
        var filterlink=document.createElement("a");
        filterlink.href="javascript:void(0)";
        $("#cDForm").append(filterlink);
        $(filterlink).click(function(){hideBelow(top25,true)});
        $(filterlink).html("Top 25% ");
        
        filterlink=document.createElement("a");
        filterlink.href="javascript:void(0)";
        $("#cDForm").append(filterlink);
        $(filterlink).click(function(){hideBelow(top10,true)});
        $(filterlink).html("Top 10% ");
        
        filterlink=document.createElement("a");
        filterlink.href="javascript:void(0)";
        $("#cDForm").append(filterlink);
        $(filterlink).click(function(){hideBelow(top5,true)});
        $(filterlink).html("Top 5% ");

        filterlink=document.createElement("a");
        filterlink.href="javascript:void(0)";
        $("#cDForm").append(filterlink);
        $(filterlink).click(function(){$(".cx span a").each(function(){
	         $(this).parents("div.cx").show();
				})
				$("#filterstatusdiv").html("");
				});
        $(filterlink).html("Show All ");
        
        filterstatusdiv=document.createElement("div");
        filterstatusdiv.id="filterstatusdiv";
        $("#cDForm").append(filterstatusdiv);
				
				if(defaultShowTop5)hideBelow(top5);
				if(defaultShowTop10)hideBelow(top10);
				if(defaultShowTop25)hideBelow(top25);

});

