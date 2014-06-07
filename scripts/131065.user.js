// ==UserScript==
// @name           Global User List
// @namespace      
// @description   
// @include        *plug.dj/*/*
// @version 1
// ==/UserScript==

if(window.navigator.vendor.match(/Google/)) { //yet another chrome-specific code..
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  unsafeWindow = div.onclick();
};

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}


window.onload = function(){
        window.document.body.onload = doThis();
    };

function doThis() {
        if (document.getElementById("current-room-users")) {
            setTimeout(setUp,3000);
            }
}

function updateDJs(){
    i = unsafeWindow.API.getUsers();
    string='Locked in: '
    for(a in i){
        i[a] = i[a].username
    }
    string+= i.join(', ');
    unsafeWindow.jQuery("#global-users").html(string)
}

function setUp(){
    left=unsafeWindow.jQuery('#footer-container').css('left');
    unsafeWindow.jQuery("body").append("<div id='global-users' style='position:absolute; top:760px;  width:1200px; font-size:10px; left:" + left + "'></div>");
    unsafeWindow.jQuery("body").append("<div id='woots' style='position:absolute; top:785px;  width:1200px; font-size:10px; left:" + left + "'></div>");
    unsafeWindow.jQuery("body").append("<div id='mehs' style='position:absolute; top:795px;  width:1200px; font-size:10px; left:" + left + "'></div>");
    unsafeWindow.API.addEventListener(unsafeWindow.API.VOTE_UPDATE, updateWoots);
    unsafeWindow.API.addEventListener(unsafeWindow.API.USER_JOIN, updateDJs);
    unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_ADVANCE, clear);
    updateDJs();
    updateWoots();
}

function updateWoots(){
    woots=new Array()
    mehs=new Array()
    i = unsafeWindow.API.getUsers();
    for(a in i){
        if (i[a].vote == 1) {woots.push(i[a].username)}
        if (i[a].vote == -1) {mehs.push(i[a].username)}
    }
    string='Woots: ' + woots.join(', ');
    unsafeWindow.jQuery("#woots").html(string);
    string='Mehs: ' + mehs.join(', ');
    unsafeWindow.jQuery("#mehs").html(string);
}

function clear(){
    unsafeWindow.jQuery("#woots").html('Woots: ');
    unsafeWindow.jQuery("#mehs").html('Mehs: ');
 }
    
unsafeWindow.$(window).resize(function(){
	left=unsafeWindow.jQuery('#footer-container').css('left');
    unsafeWindow.jQuery("body").css("left",left);
    unsafeWindow.jQuery("body").css("left",left);
    unsafeWindow.jQuery("body").css("left",left);
})
