// ==UserScript==
// @name       Forum Hub
// @namespace  http://hub.zetabin.com
// @version    1
// @description  Chrome-like new tab page for ZetaBoards forums
// @match      http://*/*
// @copyright  2012+, Viral
// ==/UserScript==

window.addEventListener("load", function(e) {

    var links = document.getElementsByTagName("link");
    var links_len = links.length;
    var board_type = 0; // 1 = ZB, 0 = unknown
    var url = location.href;
    var board_url = "";
    
    for(l=0;l<links_len;l++){
        zb = !!links[l].href.match(/^http\:\/\/[w|s]\d{1,2}.zetaboards.com\/c\/\d+\/\d+\/css.css$/);
        if(zb === true){
            board_type = 1;
            break;
        }
    }
    
    if(board_type == 1){
        var scripts = document.getElementsByTagName("script");
        var script_length = scripts.length;
        for(s=0;s<script_length;s++){
            url_test = scripts[s].innerHTML.match(/main_url = "(.*)"/);
            if(!!url_test === true){ // checking for main_url variable
                board_url = url_test[1];
                board_name = board_url;
                nav_li = document.getElementById("nav").getElementsByTagName("li");
                nav_li_len = nav_li.length;
                outer_loop:
                for(n=0;n<nav_li_len;n++){
                	anchors = nav_li[n].getElementsByTagName("a");
                	anchors_len = anchors.length;
                	for(a=0;a<anchors_len;a++){
                		if(anchors[a].href == board_url + "index/"){
                			board_name = anchors[a].innerHTML;
                			break outer_loop;
                		}
                	}
                }
                board_type = 1;
                break;
            } else {
                board_type = 0;
            }
        }
    }
        
    if(board_type != 0){
	
		// JSON CALL
		
		function json_p(url){
			script = document.createElement("script");
			script.setAttribute("src",url);
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		
		// JSON CALL
		
		// CALL BACK FOR HIT_COUNT
		
		unsafeWindow.hit_count = function(response){
			logged_in = response.logged_in;
			switch(logged_in * 1){
				case 0: // not logged in
					var wrap = document.getElementById("wrap");
					var hub = document.createElement("div");
					hub.setAttribute("id","hub");
					hub.innerHTML = '<div style="width:75%;margin:auto;margin-bottom:5px;margin-top:5px;"><table><tbody><tr><th>FORUM HUB</th></tr><tr><td>You are not logged in to the <a href="http://hub.zetabin.com">Forum Hub</a> service. If you do not log in we cannot update  your most visited forums list! </td></tr><tr><td class="c_foot"></td></tr></tbody></table></div>';
					wrap.insertBefore(hub,wrap.childNodes[0]);
					break;
				case 1: // logged in
					// Nothing needs to be done - hit count already updated!
					break;
				default: // Error!
					break;
			}
		}
		
		// CALL BACK FOR HIT_COUNT
		
		// CALL BACK FOR LOGIN
		
		unsafeWindow.login = function(response){
			logged_in = response.logged_in;
			if(logged_in == 1){
				hub = document.getElementById("hub");
				hub.parentNode.removeChild(hub);
			} else {
				user = document.getElementById("hub_user");
				pass = document.getElementById("hub_pass");
				user.value = "";
				pass.value = "";
				user.focus();
			}
		}
		
		// CALL BACK FOR LOGIN
	
		json_p("http://hub.zetabin.com/hit_count.php?t="+(new Date().getTime())+"&callback=hit_count&name="+encodeURIComponent(board_name)+"&url="+encodeURIComponent(board_url));
        
    }
    
}, false);
