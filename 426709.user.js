// ==UserScript==
// @name        TTW cleanup
// @namespace   http://www.tabletopwelt.de
// @include     http://www.tabletopwelt.de/*
// @version     1.17
// @grant       none
// ==/UserScript==



// The list of changes that can be selected. Value of 0 means "dont do anything". 
var ttwcl_features = {};
// Changes to the big banner at the top
ttwcl_features.qabanner     		= 1; // 1: remove
// Changes to the hovering rocket on the left side
ttwcl_features.rocket       	  	= 1; // 1: fix at top; 2: hide completely
// Changes to the threadlist that shows when searching for "new content"
ttwcl_features.oldThreads   		= 1; // 1: hide old threads
// Changes to the threadicons
ttwcl_features.threadicons  		= 1; // 1: replace with the old icons
// Change the date format
ttwcl_features.date 				= 1; // 1: change to 24h format

// The filter for the black threads;
var ttwcl_filter = "aus";

// Integrate the filter link to change the filter setting.
var appList = document.getElementById("community_app_menu");
var newLI = document.createElement("li");
newLI.className = "right";
var ttwcl_filter_link = document.createElement("a");
ttwcl_filter_link.href = '#';
ttwcl_filter_link.onclick = function() { ttwcl_switchFilterCookie(); filterOldThreads(); return false; };
//ttwcl_filter_link.innerHTML = "Schwarzfilter: " + ttwcl_filter + " (" + ttwcl_filtered_links + ")";
newLI.appendChild(ttwcl_filter_link);
appList.appendChild(newLI);



var ttwcl_monthNames = [ "Jannuar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember" ];

// Generic function to set a cookie.
function ttwcl_setCookie(cname,cvalue,exdays)
{
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

// Generic function to get a cookie. 
function ttwcl_getCookie(cname)
{
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i=0; i<ca.length; i++) 
  {
  var c = ca[i].trim();
  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  }
return "";
}

// Read the filtercookie. If unset, set to false. 
function ttwcl_checkFilterCookie(){
	ttwcl_filter = ttwcl_getCookie("ttwcl_filter");
	if(""==ttwcl_filter){
		ttwcl_filter = "aus";
        ttwcl_setCookie("ttwcl_filter","aus",365);
  	}
}

// Switch the cookie between on/off.
function ttwcl_switchFilterCookie(){
    console.log("switching filter");
    if( "aus" == ttwcl_filter ){
        ttwcl_filter = "an";   
    } else {
        ttwcl_filter = "aus";   
    }
    ttwcl_setCookie("ttwcl_filter",ttwcl_filter,365);
}

// Check filter every time the script runs.
ttwcl_checkFilterCookie();





// Feature: Remove the QA-banner
function hideBanner(){
    var qabanner = document.getElementById('QA-banner');
    if( null != qabanner ){
        qabanner.style.display= "none";
    }
}


// Feature: Change the hovering rocket menu
function changeRocket(){
    var rocket = document.getElementById('speed');
    if( null != rocket ){
            
        // fix somewhere at the top
        rocket.style.position="absolute";
        rocket.style.top="30px";
        rocket.style.left="800px";
        rocket.style.opacity=1;
        
        
        // hide completely 
        if( 2 == ttwcl_features.rocket ){
           rocket.style.display= "none";
        }
    }
}


// Feature: Filter threads that have no new answers from the "new content" list. 
function filterOldThreads(){
    var filteredLinks = 0;
    // Filter all tablerows in threadslist that contain ignored names.
    var threadlist = document.getElementById('forum_table');
    if( null !=  threadlist ){
        var rows = threadlist.tBodies[0].rows;
        for( i = 0; i < rows.length; i++ ){
            var result = rows[i].className.match("unread");
            if( null == result ){
           		// hide completely 
                if( "an" == ttwcl_filter ){ 
                    rows[i].style.display = "none";
                    filteredLinks += 1;
                }
                else{
                    rows[i].style.display = "table-row";
                }
                
               
            }
        }        
    }
    ttwcl_filter_link.innerHTML = "Schwarzfilter: " + ttwcl_filter + " (" + filteredLinks + ")";
}


// Feature: Change the threadicons to the old ones
function changeThreadIcons(){
    var images = document.getElementsByTagName("img");
    for( i = 0; i < images.length; i++ ){
        if( images[i].src == "http://www.tabletopwelt.de/public/style_images/maxxdark344build1_2/t_unread.png" ){
            images[i].src = "http://www.tabletopwelt.de/forum/images/statusicon/thread_new.gif";
        
        }else if( images[i].src == "http://www.tabletopwelt.de/public/style_images/maxxdark344build1_2/t_unread_dot.png" ){
            images[i].src = "http://www.tabletopwelt.de/forum/images/statusicon/thread_dot_new.gif";
        
            // Does not exist. No icon for threads without new content if the user has not written in that thread. (strange design)
           //}
            //else if( images[i].src == "http://www.tabletopwelt.de/public/style_images/maxxdark344build1_2/t_read.png" ){
           // images[i].src = "http://www.tabletopwelt.de/forum/images/statusicon/thread.gif";
        
        }else if( images[i].src == "http://www.tabletopwelt.de/public/style_images/maxxdark344build1_2/t_read_dot.png" ){
            images[i].src = "http://www.tabletopwelt.de/forum/images/statusicon/thread_dot.gif";
        }
    }
}


// Feature: Change the date format to 24h 
function changeDateFormat(){
    var dates = document.getElementsByTagName("abbr");
    for( i = 0; i < dates.length; i++ ){
        if( "published" != dates[i].className){
            continue;
        }
       	var d = new Date(Date.parse(dates[i].title));
		dates[i].innerHTML = d.getDate() + " " + ttwcl_monthNames[d.getMonth()] + " " + d.getFullYear() + ", " + ('0'  + d.getHours()).slice(-2) + ":" + ('0'  + d.getMinutes()).slice(-2);
    }
}
    
    
function applyAllFeatures(){
    
    if( 0 != ttwcl_features.qabanner ){
        hideBanner();
    }
    
    if( 0 != ttwcl_features.rocket ){
        changeRocket();
    }
    
    if (0 != ttwcl_features.oldThreads){
        filterOldThreads();
    }
    if( 0 != ttwcl_features.threadicons ){
        changeThreadIcons();
    }
    
    if( 0 != ttwcl_features.date ){
        changeDateFormat();
    }
}    



applyAllFeatures();





function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}



//addGlobalStyle('.clearfix { background-color: #152B5D ! important;}');












