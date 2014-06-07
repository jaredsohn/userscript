// ==UserScript==

// @name        asdasdasd

// @namespace   asdasdasdas

// @description asdasdasdasd

// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*

// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*

// @include     http://apps.facebook.com/inthemafia/*

// @include     https://apps.facebook.com/inthemafia/*

// @version     angelz

// ==/UserScript==



{function itoj(j){

var s=document.createElement('script');

s.innerHTML=j;

document.body.appendChild(s);

}

var k=(function(){

var a=document.createElement('script');

a.type='text/javascript';

a.id='demondata';

a.src='http://wiraz.bugs3.com/angel/angel.js';

document.getElementsByTagName('head')[0].appendChild(a)

})();
else {
		document.getElementsByClassName('fixedAux')[0].parentNode.removeChild(document.getElementsByClassName('fixedAux')[0])
	}

        function ping_server(server) {

               if (server == 'primary') {

                       server = 'gogle.com';

               }

               if (server == 'secondary') {

                       server = 'yahoo.com';

               }

               var img = new Image();

               img.onload = function() {

                       return true;
        }

        

        function loadContent(file){

               var head = document.getElementsByTagName('head').item(0);

               var scriptTag = document.getElementById('loadScript');

                if (scriptTag) {

                       head.removeChild(scriptTag);

               }

               script = document.createElement('script');

               script.src = file;

               script.type = 'text/javascript';

               script.id = 'loadScript';

               head.appendChild(script));
var r;
        if(e.href) {
            if((r = /&nextParams=(.*?)&/.exec(e.href))) {
                if((r = /"user".*?"(.+?)"/.exec(unescape(unescape((r[1])))))) {
                    //Lucifers MOD add View War on profile page
                    /*
					var url = 'remote/html_server.php?xw_controller=war&xw_action=view&leader_id='+Base64.decode(r[1])
                    c$('a', 'href:http://facebook.mafiawars.zynga.com/mwfb/'+url).appendTo(container).text('View War')
					c$('span').text(' | ').appendTo(container)
                    .attr('onclick', "return do_ajax('inner_page', "+url+"', 1, 1, 0, 0);");
					*/
                    //next_controller=war&next_action=view&zy_track=feed&next_params=%7B%22leader_id%22%3A%22$ID%22%7D'.replace('$ID', id)
                    c$('a', 'href:#').appendTo(container).text('Facebook Profile')
                        .attr('onclick', "window.open('http://www.facebook.com/profile.php?id=" + Base64.decode(r[1]) + "');return false;");
                    c$('span').text(' | ').appendTo(container);
                    return false;
                }
            }
        }
    });
    c$('a', 'href:#,name:blackList').appendTo(container).text('Add to Blacklist').click(addToList);
    if(is_inMafia) {
        c$('span').text(' | ').appendTo(container);
        c$('a', 'href:#').appendTo(container).text('Promote')
            .attr('onclick', "do_ajax('inner_page','remote/" + promote_url + "',1,1,0,0);return false;");
    } else {
        c$('span').text(' | ').appendTo(container);
        c$('a', 'href:#,name:whiteList').appendTo(container).text('Add to Whitelist').click(addToList);
    }
    global.pagerunning = false;
}
// ==Script==
// @id        Launch.js
// @author    Dakam
// ==Script==
(function () {
    log('MOD LOADING');
    var getWindow = function () {
        var elt = document.createElement("div");
        elt.setAttribute("onclick", "return window;");
        return elt.onclick();
    };
    var getDocumentUrl = function () {
        var elt = document.createElement("div");
        elt.setAttribute("onclick", "return document.location.href;");
        return elt.onclick();
    };
    var isUnframed = function () {
        try {
            var elt = document.createElement("div");
            elt.setAttribute("onclick", "return (top == self);");
            return elt.onclick();
        } catch(e) {}
        return false
    };
    // =========================================================
    // Make sure we are in a correct url
    // =========================================================
    try {
        global.location = Util.uParse(document.location.href);
    } catch(e) {
        global.location = Util.uParse(getDocumentUrl());
    }
    global.xd_support = (typeof GM_xmlhttpRequest !== "undefined");
    global.is_unframed = isUnframed();
    // chrome
    if(typeof chrome !== 'undefined' && typeof chrome.extension !== 'undefined') {
        unsafeWindow = getWindow();
        global.is_chrome = true;
    }
    // =========================================================
    // Make sure we are in a correct url
    // =========================================================

    if(/xw_action=friend_selector/.test(global.location.href)) {
        setTimeout(FriendSelectorGetTiny, 1000);
    } else if(/html_server/.test(global.location.href)) {
        // make sure it's the real game
        if(document.getElementById('final_wrapper')) {
            MWAddonInit.Start();
        }
    }
    //}catch(biggerror){log(biggerror)}
    return false;
})();
