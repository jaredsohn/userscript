// ==UserScript==
// @name           plug.dj enhanced room score
// @namespace      
// @description   
// @include        *plug.dj/*/*
// @version 1.2
// @grant none
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
	unsafeWindow.jQuery('#meta-frame').css('height','592');
	unsafeWindow.jQuery('#meta-frame').css('z-index','100');
	unsafeWindow.jQuery('#meta-frame').css('overflow','hidden');
    //unsafeWindow.jQuery("#media-meta").append("<div id='global-users' style='position:absolute; top:760px;  width:1200px; font-size:10px; left:" + left + "'></div>");
    unsafeWindow.jQuery("#media-meta").append("<div id='woots' style='background: url(\"http://plug.dj/_/static/images/score_meta_positive.d294bbf1.png\") no-repeat scroll 10px 3px transparent; position:relative; top:236px; margin-bottom: 10px; width:317px; font-size:10px; padding-left:30px;'></div>");
    unsafeWindow.jQuery("#media-meta").append("<div id='mehs' style='background: url(\"http://plug.dj/_/static/images/score_meta_negative.4d264fee.png\") no-repeat scroll 10px 3px transparent; position:relative; top:236px; margin-bottom: 10px; width:317px; font-size:10px; padding-left:30px;'></div>");
	unsafeWindow.jQuery("#media-meta").append("<div id='curates' style='background: url(\"http://plug.dj/_/static/images/score_meta_curate.2d21301a.png\") no-repeat scroll 10px 3px transparent; position:relative; top:236px; margin-bottom: 10px; width:317px; font-size:10px; padding-left:30px;'></div>");
    unsafeWindow.jQuery("#meta-frame").append("<div id='button_score_expand' style='z-index:100; cursor: pointer; background: url(\"http://plug.dj/_/static/images/ButtonChatCollapse1.33c20e26.png\") repeat scroll 0 0 transparent; bottom: 1px; float: left; height: 30px; position: absolute; right: 1px; width: 30px;'></div>");
	unsafeWindow.API.addEventListener(unsafeWindow.API.VOTE_UPDATE, updateWoots);
    unsafeWindow.API.addEventListener(unsafeWindow.API.USER_JOIN, updateDJs);
    unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_ADVANCE, clear);
	unsafeWindow.API.addEventListener(unsafeWindow.API.CURATE_UPDATE, updateCurates);
	//unsafeWindow.API.addEventListener(unsafeWindow.API.ROOM_SCORE_UPDATE, updateCurates);
	setTimeout(updateCurates_init,1000);
    updateDJs();
    updateWoots();
	unsafeWindow.jQuery('#button_score_expand').toggle(function(){
    $("#meta-frame").animate({height:277},200);
	$("#button_score_expand").css('background-image','url(\"http://plug.dj/_/static/images/ButtonChatExpand1.dce03b3d.png\"');
  },function(){
    $("#meta-frame").animate({height:592},200);
	$("#button_score_expand").css('background-image','url(\"http://plug.dj/_/static/images/ButtonChatCollapse1.33c20e26.png\"');
  });
}

function updateCurates(obj)
{
	if ($('#curates').is(':empty')){
		comma=""
		}
		else
		{
		comma=", "
	}
	if(obj.user.relationship >= 2) {
				unsafeWindow.jQuery("#curates").append(comma + '<span style="color:#c1e320">' + obj.user.username + '</span> ')
			}
			else
			{
				unsafeWindow.jQuery("#curates").append(comma + obj.user.username);
			}
}

function updateCurates_init(){
	curates=new Array()
	i = unsafeWindow.API.getUsers();
    for(a in i){
		if (i[a].curated == true) {
		if(i[a].relationship >= 2) {
				curates.push('<span style="color:#c1e320">' + i[a].username + '</span>')
			}
			else
			{
				curates.push(i[a].username)
			}
		}
	}
	string=curates.join(', ');
    unsafeWindow.jQuery("#curates").html(string);
}
function updateWoots(){
    woots=new Array()
    mehs=new Array()
    i = unsafeWindow.API.getUsers();
    for(a in i){
        if (i[a].vote == 1) {
			if(i[a].relationship >= 2) {
				woots.push('<span style="color:#c1e320">' + i[a].username + '</span>')
			}
			else
			{
				woots.push(i[a].username)
			}
		}
        if (i[a].vote == -1) {
			if(i[a].relationship >= 2) {
				mehs.push('<span style="color:#c1e320">' + i[a].username + '</span>')
			}
			else
			{
				mehs.push(i[a].username)
			}
		}
    }
    string=woots.join(', ');
    unsafeWindow.jQuery("#woots").html(string);
    string=mehs.join(', ');
    unsafeWindow.jQuery("#mehs").html(string);
}

function clear(){
    unsafeWindow.jQuery("#woots").html('');
    unsafeWindow.jQuery("#mehs").html('');
	unsafeWindow.jQuery("#curates").html('');
 }

    
unsafeWindow.$(window).resize(function(){
	left=unsafeWindow.jQuery('#footer-container').css('left');
    unsafeWindow.jQuery("body").css("left",left);
    unsafeWindow.jQuery("body").css("left",left);
    unsafeWindow.jQuery("body").css("left",left);
})
