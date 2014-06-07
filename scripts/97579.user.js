// ==UserScript==
// @name           Reputations for Today
// @namespace      stackoverflow
// @description    Reputations for Today
// @include        http://*stackoverflow.com/*
// @include        http://*superuser.com/*
// @include        http://*serverfault.com/*
// @include        http://*.stackexchange.com/*
// @exclude        */reputation
// ==/UserScript==

(function(){
  var start=function(){
    var now=new Date(),today=+Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()),users=[];
    var find_reputation = function(){
      var user = users.shift();
      if(!user) return;
      var user_id = user.attr("href").match(/\d+/)[0];
      $.getJSON('/users/rep-graph/'+user_id+"/"+today+"/"+now.getTime(),function(d) {
        var r=a=0,b={stackoverflow:'so',superuser:'su',serverfault:'sf'};
        for(var i in d){
          r+=d[i].Gain+d[i].Loss;
          if(!d[i].IsQ && d[i].Gain%10==5)a+=15;
        }
        var v=r-a;
        if(r){
          user.parent().append('<br/><sup style="font-size:75%;float:left;"><a target="RepTracker" href="http://csharpindepth.com/StackOverflow/ReputationTracker.aspx?showzero=true&'+(/:\/\/([^.]+)\./.test(location.href) && b[RegExp.$1] || RegExp.$1)+'='+user_id+'">'+r+(r>v?' ('+v+')':'')+'</a></sup>');
        }
      });
      setTimeout(find_reputation, 500);
    }
    $(".user-details>a").each(function(){
      users.push($(this));
    });
    find_reputation();
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