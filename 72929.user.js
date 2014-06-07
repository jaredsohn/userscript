// ==UserScript==
// @name           Show Exact Duplicates
// @namespace      stackoverflow
// @include        http://stackoverflow.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// @exclude        http://*/reputation
// ==/UserScript==

(function(){
	var start=function(){
		var E = $("div.post-menu a[id^='close-question-']");
		E.unbind("click").click(function() {
			vote.close(E);
			$.getJSON('/posts/existing-close-duplicate-questions/'+E.attr("id").replace(/\D+/,''),function(d){
				if(d.length>0){
					s='';for(i in d) s+='<a  href="'+d[i].url+'">'+(/(.{1,100})(.*)/.test(d[i].title) && RegExp.$1 + (RegExp.$2?" ...":""))+'</a><br/>';
					window.dialogtimer=setInterval(function(){
						if(vote.close_reasons ){ // && !vote.closeVotesRemainingToday
							$(".close-desc:first").html($(s));
							vote.close_reasons[0].description=s;
							clearTimeout(window.dialogtimer);
						}
					},500);
				}
			});
		});
	};

	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + start + ")();";
	document.body.appendChild(script);
})();
