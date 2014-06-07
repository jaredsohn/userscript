// ==UserScript==
// @name       MultiTwitchList
// @namespace  com.camillocode
// @version    0.2
// @description  List to save streamers links into multitwitch page
// @match      *.multitwitch.tv/*
// @copyright  2014+, CamilloCode
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

console.log("--start!--");

var container = $('<div id="choose-twitch"></div>').appendTo('body');
var showHideList = $('<div id="show-hide-list">Hide List</div>').appendTo(container);
var streamsContainer = $('<div id="streams-container"></div>').appendTo(container);

container.css(
	{"position": "absolute",
	 "bottom": 0,
	 "left": 0,
	 "background-color": "#777",
     "border": "solid 2px #fff",
     "border-radius": "10px",
     "padding": "5px"
	});

loadStreams();

//css
$("<style type='text/css'> .removeLink{ vertical-align:middle; cursor:pointer;} .streamLink{cursor:pointer;} #show-hide-list{cursor:pointer;}</style>").appendTo("head");

//add new streams
var addToList = $('<div><input id="new-stream" type="text" /><input id="new-stream-btn" type="submit" value="add"/></div>').appendTo(container);
$("#new-stream-btn").on("click",function(){
	var newStream = $("#new-stream").val();
    if(newStream)
    {
        var streams = new Array();
        if(getCookie("_mtList"))
        {
            var streams = getCookie("_mtList").split(',');
        }
        streams.push(newStream);
        setCookie("_mtList",streams,999);
        $("#new-stream").val("");
        console.log("--saved--");
		loadStreams();
    }
});

//remove stream
$(".removeLink").live("click",function(e){
	var stream = $(this).parent().attr("link");
    var streams = new Array();
    if(getCookie("_mtList"))
    {
        var streams = getCookie("_mtList").split(',');
    }
    var index = streams.indexOf(stream);
    streams.splice(index, 1);
    setCookie("_mtList",streams,999);
    console.log("--removed--");
    loadStreams();
    
});

//load stream
$(".streamLink").live("click",function(){
	console.log("--load stream!--");
	var link = $(this).attr("link");
    
    window.location.pathname = window.location.pathname + link + "/";
});

//hide show list
$("#show-hide-list").live("click",function(){
    
    if(streamsContainer.css("display") != "none")
    {
        streamsContainer.hide();
        addToList.hide();
        $(this).html("Show list");
    }
    else
    {
        streamsContainer.show();
        addToList.show();
        $(this).html("Hide list");
    }
});


/*FUNCTIONS
 ***************************/
function loadStreams()
{
    streamsContainer.html("");
	console.log("--get streams--");
    
    var streams = new Array();
    if(getCookie("_mtList"))
    {
        var streams = getCookie("_mtList").split(',');
    }
    console.log(streams);
    //add streams
    for(var i=0; i<streams.length; i++) 
    {
        streamsContainer.append('<div link="'+streams[i]+'"><span class="streamLink" link="'+streams[i]+'" title="load stream">'+streams[i]+'</span>&nbsp&nbsp<img class="removeLink" src="http://findicons.com/files/icons/1689/splashy/16/remove_minus_sign.png" title="remove from list"/></div>');
    }
	console.log("--done--");
    return;
}


function setCookie(cname,cvalue,exdays)
{
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    var domain = "domain=.multitwitch.tv;path=/"
    document.cookie = cname + "=" + cvalue + "; " + expires+ "; " + domain;
}

function getCookie(cname)
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