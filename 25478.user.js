// ==UserScript==
// @name           People counter ajaxified
// @namespace      http://benstabler.com/
// @description    Kudos to Jeremy (http://www.abnormalcy.org/) for the original script.
// @include        http://*nexuswar.com/game/*
// ==/UserScript==

unsafeWindow.ajax.prototype.onStateChange = function() {
		if (this.transport.readyState == 4 && this.transport.status == 200) {
			if (this.onComplete) 
				setTimeout(function(){this.onComplete(this.transport);}.bind(this), 10);
			if (this.update)
        {
          
          setTimeout(function(){
            this.update.innerHTML = this.transport.responseText;
            if(this.update.id == "locdesc")
            {
              var singular_types = new Array;
              singular_types['ally'] = "ally";
              singular_types['neutral'] = "neutral";
              singular_types['faction'] = "factionmate";
              singular_types['hostile'] = "hostile";
              singular_types['enemy'] = "enemy";
              singular_types['friendly'] = "friendly";
              
              var plural_types = new Array;
              plural_types['ally'] = "allies";
              plural_types['neutral'] = "neutrals";
              plural_types['faction'] = "factionmates";
              plural_types['hostile'] = "hostiles";
              plural_types['enemy'] = "enemies";
              plural_types['friendly'] = "friendlies";
              
              var colors = new Array;
              colors['ally'] = "#38B549";
              colors['neutral'] = "#898989";
              colors['faction'] = "#91268F";
              colors['hostile'] = "#CC0000";
              colors['enemy'] = "#000000";
              colors['friendly'] = "#00AEEF";   
              
              p=this.update.getElementsByTagName("p");
              for(x = 0; x < p.length; x++) {
                  if (p[x].innerHTML.match(/^There are (\d+?) others here: /)) {
                      var others = RegExp.$1
                      
                      var types = new Array();
                      
                      function target(level, html)
                      {
                        this.level = parseInt(level);
                        this.html = html;
                      }
                      
                      function sortByLevel(a, b)
                      {
                        var x = a.level; var y = b.level;
                        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                      }
                      
                      s=p[x].getElementsByTagName("span");
                      for(y = 0; y < s.length; y++) {
                        var res = s[y].innerHTML.match(/class=\"(\w+?)\"/g);
                        var type = RegExp.$1;
                        
                        if (type) {
                          res = s[y].innerHTML.match(/a> \(([0-9]+?)\)<im/g);
                          var lvl = RegExp.$1;
                          if(types[type]==undefined)
                            {
                              types[type] = new Array();
                              types[type][0] = new target(lvl, s[y].innerHTML);
                              types[type]['count'] = 1;
                            }
                          else
                            {
                              var id = types[type]['count'];
                              types[type][id] = new target(lvl, s[y].innerHTML);
                              types[type]['count']++;
                            }
                        }
                      }
                      
                      printout = ""; var i = 0;
                      for(var type in types) {
                        if(i == 0) 
                          printout += "(";
                        else
                          printout += ", ";
                        if(types[type]['count'] == 1)
                          printout += "<font color=\"" + colors[type] + "\">1" + " " + singular_types[type] + "</font>";
                        else
                          printout += "<font color=\"" +colors[type] + "\">" + types[type]['count'] + " " + plural_types[type] + "</font>";
                        i++;
                      }
                      if(i > 0)
                        printout += ")";  
                      printout += "</div>";
                      for(var type in types) {
                        printout += "<div>";
                        if(types[type]['count'] == 1)
                          printout += "<font color=\"" + colors[type] + "\">" + " " + singular_types[type] + "</font>: ";
                        else
                          printout += "<font color=\"" +colors[type] + "\">" + plural_types[type] + "</font>: ";
                        
                        types[type].sort(sortByLevel);
                        
                        for(z = 0; z < types[type]['count']; z++)
                        {
                          printout += "<span class=\"nowrap\">"+types[type][z].html+"</span>"+((types[type]['count']>z+1)?", ":".");
                        }
                        printout += "</div>";
                      }
                      
                      p[x].innerHTML = "<div>There are " + s.length + " others here " + printout;
                  }
              }
            }
            }.bind(this), 10);          
          //this.update.innerHTML = this.update;
        }

			this.transport.onreadystatechange = function(){};
		}
}

Function.prototype.bind = function(object) {
	var __method = this;
	return function() {
		return __method.apply(object, arguments);
	}
}
