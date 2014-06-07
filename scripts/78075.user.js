// ==UserScript==
// @name           Remove All Favorites
// @namespace      stackoverflow
// @include        http://*.com/users/*?tab=preferences*
// @exclude        */reputation
// ==/UserScript==

(function(){
	var start=function(){
		id=$("a")[0].href.replace(/\D+/,'');
		window.get_favorites=function(){
			$("#removeFav").attr("disabled",true);
			$.get("/api/userfavorites.html?page=1&pagesize=50&sort=votes&userid="+id+"&"+(new Date()),function(data){
				post_ids=[];
				$(data).find("input[type=hidden]").each(function(){
					post_ids.push($(this)[0].value);
				});
				if(!post_ids.length) return false;
				remove_bookmark();
			});
		}
		counter=0;
		window.remove_bookmark=function(){
			if(post_ids.length>0){
				$.post("/posts/"+post_ids.pop()+"/vote/5",{fkey:preffkey});
				setTimeout(remove_bookmark,700);
				$("#removeFav").attr("value","Removed : "+ ++counter);
			}else{
				get_favorites();
			}
		};
		$('<div class="module"><h4>Favorites</h4><input type="button" value="Remove All Favorites" onclick="get_favorites();" id="removeFav"></div>').insertAfter($("#optInEmail").parent());
	};

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + start + ")();";
	document.body.appendChild(script);
})();