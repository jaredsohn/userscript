// ==UserScript==
// @name           PhpBB Thread Blocker
// @namespace      ForceProjectX.com
// @description    Hide unwanted PHPBB Threads 
// @author         Force Project X (ForceProjectX.com)
// @version        1.1.1
// @include        http://www.phpbb.com/comunity
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


//global vars
var fpxTH_preferences;
var _EditDivIsHidden=true;

const DEBUG = false;
const ERROR_TITLE = "Thread Blocker Error::\n";
const HIDE_THREAD_IMAGE_LOCATION = "http://www.interactivebrokers.com/images/common/red_x.gif";
const HIDE_THREAD_IMAGE_CLASS = "fpxphpbbthx";
const EDIT_HIDDEN_LINK_TEXT = "Edit Hidden Threads";
const EDIT_HIDDEN_LINK = "DispHiddenEditor";
const EDIT_HIDDEN_LINK_CLASS = "fpxphpbbthedit";
const REOMOVE_THREAD_FROM_HIDDEN_LIST_CLASS="fpxthremlinklist";
const LOCATION_TO_ADD_EDIT_LINK_AFTER = "div.forumbg";

const THREADID_TITLE_SEPERATOR = "||||";


jOut(GM_listValues());

jQuery(document).ready(function() {
	try{
	jOut("Ready");
    if (jQuery("body#phpbb").length != 1){
		jOut("Error: Not a PHPBB Forum");
        return false;
    }
    
	//init vars
	jOut("init JQuery");
    var $j = jQuery.noConflict();
	var prefname="fpxTH_preferences" + jQuery(document).attr("domain");
    var regexThread = /t=(\d+)/;
	var regexForum = /f=(\d+)/;

	//load prefs
	jOut("loading prefs");
    fpxTH_preferences = eval(GM_getValue(prefname,{hiddenTopics:{}}));
    jOut(fpxTH_preferences.hiddenTopics.toSource());

    //parse forums 
	jOut("Seeking Thread Links");
    $j("li.row").each(function(){
		try{
			//get thread and forum id
			var threadID = $j(this).find("a.topictitle").attr("href").match(regexThread); 
			var forumID = $j(this).find("a.topictitle").attr("href").match(regexForum); 
			if (fpxTH_preferences.hiddenTopics[threadID[1]]){
				//the user has requested that this thread be hidden
				$j(this).hide();
			} else {
				//thread should be shown, so just add hide thread icon
				$j(this).find("dt").css("position","relative").append("<div style='position:absolute;top:0px;right:0px;'><a class='"+HIDE_THREAD_IMAGE_CLASS+"' href='" + 
				threadID[1] + THREADID_TITLE_SEPERATOR + forumID[1]
				+ "'><img src='"+HIDE_THREAD_IMAGE_LOCATION+"'></img></a></div>");
			}
		}catch(err){
			//this error is only likely encountered if there are sub-forums
			jOut("LinkError:(probably a forum not a thread):::\n "+err.toSource());
		}
    });
	
	//add hidden threads editor
										//nasty hack to get the last element, skips the announcements group
	$j(LOCATION_TO_ADD_EDIT_LINK_AFTER).eq($j(LOCATION_TO_ADD_EDIT_LINK_AFTER).length - 1).after("<div class='fpxphpbbthshow'>"+
							"<a class='"+EDIT_HIDDEN_LINK_CLASS+"' href='" + EDIT_HIDDEN_LINK + "'>"+EDIT_HIDDEN_LINK_TEXT+"</a>"+
							"<div class='fpxphpbbthshowdivInner' style='display: none;'>"+
							"<hr><ul class='fpxphpbbthshowInner'>"+
							 HiddenListToHTML(fpxTH_preferences.hiddenTopics)+
							"</ul></div></div><hr>"
	);
	//hide the new div
	//$j(LOCATION_TO_ADD_EDIT_LINK_AFTER).find("div.fpxphpbbthshowdivInner").hide();
	
	//function for edit threads button
	$j("a."+EDIT_HIDDEN_LINK_CLASS).click(function(e){
        try
		{
			if(_EditDivIsHidden){
            $j(this).parents("div").find("div.fpxphpbbthshowdivInner").show("slow");		
			_EditDivIsHidden=false;
			
            //fpxTH_preferences.hiddenTopics[$j(this).attr("href")] = $j(this).parents("li").find("a.topictitle").text();
            //GM_setValue("fpxTH_preferences" + jQuery(document).attr("domain"), fpxTH_preferences.toSource());
			}else{
				//hide the edit threads window
				_EditDivIsHidden=true;
				$j(this).parents("div").find("div.fpxphpbbthshowdivInner").hide("slow");	
			}

        } catch (err){GM_log(ERROR_TITLE+err.toSource());}
        return false;
    });


	//function for removing threads from hidden list
    $j("a."+REOMOVE_THREAD_FROM_HIDDEN_LIST_CLASS).click(function(e){
        try{
			//hide the object element
			$j(this).parents("li").hide("slow");
			//get the forum and thread id
			var id=$j(this).attr("href");
			//remove offenting thread object
            delete fpxTH_preferences.hiddenTopics[id];
			//save resulting array
            GM_setValue("fpxTH_preferences" + jQuery(document).attr("domain"), fpxTH_preferences.toSource());

        } catch (err){GM_log(ERROR_TITLE+err.toSource());}
        return false;
    });
	
	//function for hide button
    $j("a."+HIDE_THREAD_IMAGE_CLASS).click(function(e){
        try{
			//get the forum and thread ids from button (thread|forum);
			var ids=$j(this).attr("href").split(THREADID_TITLE_SEPERATOR);
            $j(this).parents("li").hide("slow");
			
			jOut(ids[0]+"::"+$j(this).parents("li").find("a.topictitle").text());
            fpxTH_preferences.hiddenTopics[ids[0]] = ids[1]+THREADID_TITLE_SEPERATOR+$j(this).parents("li").find("a.topictitle").text();
            GM_setValue("fpxTH_preferences" + jQuery(document).attr("domain"), fpxTH_preferences.toSource());

        } catch (err){GM_log(ERROR_TITLE+err.toSource());}
        return false;
    });
	} catch (err){GM_log(ERROR_TITLE + err.toSource());}
});

function HiddenListToHTML(list){
	var output="";
	//alert(list.substring(1,list.length-1));
	//var input=new Array(list.substring(1,list.length-1));
	//alert(input[0]);
	var i=0;
	for(var x in list){
		var y=list[x].split(THREADID_TITLE_SEPERATOR);
		if(true){
			output+="<li class='";
			output+=(i%2==0)?"row bg1'>":"row bg2'>";
			output+="<a class='"+REOMOVE_THREAD_FROM_HIDDEN_LIST_CLASS+"' href='"+x+"'><strong><b>Forum #:</b></strong>"+x+" <strong><b>Thread ID:</b></strong> "+y[0]+" <strong><b>Thread Title:</b></strong> "+y[1]+"  <em>(click to remove from hidden threads list)<em></a>"
			output+="</li>";
		}else{
		}
		i++;
	}
	if(i==0){
		return "<li class='row bg1'><p>No hidden threads to display</p></li>";
		}else{
	return output;
	}
}

function jOut(msg){
	if (DEBUG){
		GM_log(msg);
	}
}