// ==UserScript==
// @name       Twitter Navigation and Feed Cleaner
// @namespace  http://xpherio.info
// @version    0.4
// @description  A cleaned up navigation bar for Twitter.
// @match      *twitter.com/*
// @copyright  2012 Xpherio
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==
var version = 0.4;
var active1;
var active2;
var active3;
var active4;
var a1;
var a2;
var a3;
var a4;
var url = window.location.pathname;
var flipView = GM_getValue("flipFeed");
var filename = url.substring(url.lastIndexOf('/')+1);
$("li.profile").attr("id","my_profile");
$("#my_profile").children("a").attr("id","link_profile_id");
var username = $("#link_profile_id").attr("href");
//alert(filename);
function asg(){
    $(".js-recommended-followers").prepend("<div class='js-account-summary account-summary js-actionable-user' data-user-id='347874368' data-feedback-token='94'><div class='content'><a class='account-group js-recommend-link js-user-profile-link user-thumb' href='/aerhx' data-user-id='275251053'><img class='avatar js-action-profile-avatar ' src='http://api.twitter.com/1/users/profile_image?screen_name=aerhx&size=bigger'><span class='account-group-inner js-action-profile-name' data-user-id='275251053'><b class='fullname'>Jake Andre&oslash;li</b><span>‏ </span><span class='username'><s>@</s><span class='js-username'>aerhx</span></span></span></a><small class='metadata social-context'>The app creator.</small><span class='user-actions not-following' data-user-id='275251053'><a href='#' class='follow-link'><span class='link-text follow-text'>Follow</span><span class='link-text unfollow-text'>Unfollow</span><span class='link-text cancel-text'>Cancel</span></a></span></div></div>");
}
function SetValue(theName,theValue){
    GM_setValue(theName,theValue);
}
function asGet(theName){
    GM_getValue(theName);
}
function flipmyfeed(){
    if(!GM_getValue("flipped") || GM_getValue("flipped") == "off"){
        GM_setValue("flipped","on");
    } else {
        GM_setValue("flipped","off");
    }
    window.location.reload();
}
if(filename == ''){
    setTimeout(function (){ asg(); }, 5000);
    //Home is selected
    active1 = 'active';
    a1 = 'uohk';
    
    $(".home-tweet-box").attr("id","home-tweet-box");
    if(GM_getValue("flipped") == "on"){
    $(".dashboard").attr("id","dashboard-sidebar").css("float","right").css("margin-left","10px");
    $("#timeline").css("float","left");
    }
    $("[href='/settings/account']").parent("li").append("<li><a href='#' id='fmf03'>Flip Feed</a></li>");
    document.getElementById('fmf03').addEventListener("click", function(){ flipmyfeed(); } , false); 
   // GM_setValue("test", "a");
   // alert(GM_getValue("test"));
} else if(filename == 'connect') {
    //Connect is selected
    active2 = 'active';
    a2 = 'uohk';
} else if(filename == 'discover') {
    //Discover is selected
    active3 = 'active'; 
    a3 = 'uohk';
} else if('/'+filename == username){
    active4 = 'active';
    a4 = 'uohk';
    //We don't detect when a user goes to /profile/lists for example
}
// the guts of this userscript
var asz = '<ul class="nav js-global-actions" id="global-actions">';
var logo = '<li class="home"><a class="js-hover js-nav" href="/"><i class="bird-topbar-etched bird2" style="margin-top: -3px; margin-right: 0; margin-left: 0;"></i></a></li>';
var akx = '<li id="global-nav-home" class="home '+active1+'" data-global-action="home"><a class="js-hover js-nav '+a1+'" href="/" data-component-term="home_nav" data-nav="home" style="width: 21px;"><i class="nav-home"></i></a></li>';
var asx = '<li class="people '+active2+' '+a2+'" data-global-action="connect"><a class="js-hover js-nav '+a2+'" href="/i/connect" data-component-term="connect_nav" data-nav="connect" style="width: 21px;"><i class="nav-people"></i></a></li>';
var baj = '<li class="topics '+active3+'" data-global-action="discover"><a class="js-hover js-nav '+a3+'" href="/i/discover" data-component-term="discover_nav" data-nav="discover" style="width: 21px;"><i class="nav-topics"></i></a></li>';
//var jkf = '<textarea>'+username;
var jkf = '<li class="profile '+active4+'" data-global-action="profile"><a class="js-hover js-nav '+a4+'" href="'+username+'" data-component-term="profile_nav" data-nav="profile" style="width: 21px;"><i class="nav-me"></i></a></li>';

$("body").append("<style>.bird-topbar-etched { float: none; position: static; display: none; } .bird2{ display: block; } .global-nav { background-image: none; } .uohk { background-image: none; background: #444343; } ._timestamp { display: none; }</style>");
document.getElementById('search-query').style.width='100px';
document.getElementById('search-query-hint').style.width='100px';
document.getElementById('user-dropdown-toggle').innerHTML = '<span class="new-wrapper" title="Settings"><i class="nav-session"></i></span>';
document.getElementById('user-dropdown-toggle').style.width='21px';
document.getElementById('global-actions').innerHTML=asz+logo+akx+asx+baj+jkf;
$(".topbar").attr("id","NAVYBAR");
$(".topbar").attr("ondblclick","if(document.getElementById('NAVYBAR').style.position=='static'){ document.getElementById('NAVYBAR').style.position='fixed' } else { document.getElementById('NAVYBAR').style.position='static' } ");
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");