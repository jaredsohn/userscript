// ==UserScript==
// @name           Rep Cap Status
// @namespace      stackoverflow
// @description    Calculate reputation gain or loss for today on user profiles and links to Jon's ReputationTracker
// @include        http://meta.stackoverflow.com/users/*
// @include        http://stackoverflow.com/users/*
// @include        http://superuser.com/users/*
// @include        http://serverfault.com/users/*
// @include        http://*.stackexchange.com/users/*
// @exclude        */reputation
// ==/UserScript==

(function(){
	var start=function(){
		if(!/users\/(\d+)\/?(?:[^\/]+)?$/.test(location.href)) return;;
		n=new Date(),t=Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()),u=RegExp.$1;
		$.getJSON('/users/rep-graph/'+u+"/"+t+"/"+n.getTime(),function(d) {
			r=a=0,b={stackoverflow:'so',superuser:'su',serverfault:'sf'};
			for(i in d){
				r+=d[i].Gain+d[i].Loss;
				if(!d[i].IsQ && d[i].Gain%10==5)a+=15;
			}
			v=r-a;
			$("#hlinks-custom").append('<span class="lsep">|</span><a target="RepTracker" href="http://csharpindepth.com/StackOverflow/ReputationTracker.aspx?showzero=true&'+(/:\/\/([^.]+)\./.test(location.href) && b[RegExp.$1] || RegExp.$1)+'='+u+'"> today: '+r+' ('+v+')</a>');
		});
	};

	if(window.$){
		start();
	}else{
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.textContent = "(" + start + ")();";
		document.body.appendChild(script);
	}
})();
