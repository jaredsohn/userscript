// ==UserScript==
// @name       soundcloud download
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description used to download the songs in sound cloud
// @match      https://soundcloud.com/*
// @require  http://code.jquery.com/jquery-latest.js
// @copyright  2012+, You
// ==/UserScript==
    
// first write it in here. then move to extension. get your own client id.
// for different pages. one for list of them one for only one page. difference: class="sound single" in single page. <ul class="stream__list soundList ">
// notice set is an special case.
window.setTimeout(function(){
 
    if($(".sound.single:not(.playlist)").length >0){
    	setupSingle();
    }
    if($("ul.soundList").length>0){
    	setupMulti();
    }
	
    if($(".sound.single").length>0 && $("ul.trackList__list").length>0){
    	setupTracks();
    }
},3000);
// setup the single playing page.
function setupSingle(){
    var downloadButton = document.createElement("button");
    $(downloadButton).attr("class","sc-button sc-button-medium sc-button-download").html("Download");
    $(downloadButton).click(function(){
        download(document.URL);
    } );
    $(".sc-button-group.sc-button-group-medium:first").append(downloadButton);
}
// setup page with list of songs
function setupMulti(){
    
    $("ul.soundList>li").each(
        function (){
            // alert($(this));
        	var url =preprocessURL($(this).find("a.soundTitle__title").attr("href"));
            if(url.toLowerCase().indexOf("/sets/")>=0) return;
            var downloadButton = document.createElement("button");
  			$(downloadButton).attr("class","sc-button sc-button-small sc-button-download").html("Download");
    		$(downloadButton).click(function(){
        	download(url);
    		} );
            $(this).find("div.sc-button-group.sc-button-group-small:first").append(downloadButton);
        }
    );
}
// setup the related songs in single song page and setup album page.
function setupTracks(){
        $("ul.trackList__list>li").each(
        function (){
        	var url =preprocessURL($(this).find("a.soundTitle__title").attr("href"));
          //  alert(url);
            if(url.toLowerCase().indexOf("/sets/")>=0) return;
           
            var downloadButton = document.createElement("button");
  			$(downloadButton).attr("class","sc-button sc-button-download sc-button-small sc-button-icon sc-button-responsive").html("download");
    		$(downloadButton).click(function(){
        	download(url);
    		} );
            $(this).find("div.sc-button-group.sc-button-group-small:first").append(downloadButton);
        }
    );
    
}
function download(url){
    //alert("https://api.soundcloud.com/resolve.json?url="+url.split("?")[0]+"&client_id=a9e6a1676a3385e7a4f40bdaeab87edb");
    $.ajax({ 
        url:"https://api.soundcloud.com/resolve.json?url="+url+"&client_id=a9e6a1676a3385e7a4f40bdaeab87edb",
        success: function(result){
        //alert(result.stream_url);
    		window.location = result.stream_url+"?client_id=a9e6a1676a3385e7a4f40bdaeab87edb";
    	}
       
    });
}
function preprocessURL(url){
   if((url.match("^/"))){
            	url = "https://soundcloud.com"+url;
            }
    else if(!url.match("^http")){
    	url = document.URL+url;
    }
    return url.split("?")[0];
}
