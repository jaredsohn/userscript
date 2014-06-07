// ==UserScript==
// @name           Reddit - account switcher
// @namespace      http://reddit.com
// @description    Switch between multiple accounts
// @include        http://*.reddit.com/*
// ==/UserScript==

function GM_wait() {  
  jq = navigator.appVersion.search("Safari") != -1 ? jQuery : unsafeWindow.jQuery;
  if(typeof jq == 'undefined'){
    window.setTimeout(GM_wait,100);
  } else {
    $ = jq;
    init();
  }
}
GM_wait();

function init() {

  var users = [
// ["username", "password"],
 
  ];

  if ( users.length == 0 ) {
    alert("Reddit Account Switcher\n\nYou don't appear to have set any accounts to switch between.\nPlease edit the script around line 21 to add them.");
  };
    
  if ( $("form[action='/logout']").length == 0 || users.length == 0 ) { return true; };
  
  if($("#user_switch").length == 0){
    var string = "<span class='separator'>|</span>Change user: <select id='user_switch' class='spacer' style='font-size:10px;'>";
    for (var i=0; i < users.length; i++) {
      selected = "";
      if ( $(".user").text().split("(")[0].trim() == users[i][0]) { selected = ' selected="selected"'; };
      string = string + "<option"+selected+">"+users[i][0]+"</option>";
    };
    string = string + "</select><image id='user_switch_spinner' style='margin:0 0 -4px 5px; display:none;' src='http://squidcdn.s3.amazonaws.com/images/ajax-loader-spinner.gif'/>";
    $("#header-bottom-right").append(string);
  };

  $("#user_switch").change(function(el){
    for (var i=0; i < users.length; i++) { if(users[i][0] == $(this).val()){ user = users[i]; }; };    
    
    $("#user_switch_spinner").show();
    $.post("/logout", $(".logout:eq(0)").serialize(), function(){
      $.post("/post/login", { user: user[0], passwd: user[1] }, function(){
        window.location.reload();
      });
    });
    
  });
  
}