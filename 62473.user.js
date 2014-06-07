// ==UserScript==
// @name           Twitter to eRepublic
// @namespace      www.erepublik.com
// @description    twitter to eRepublic
// @version        1.01b
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/ru
// ==/UserScript==
var twitterTarget = "battle_orders";
var twitterName = "RFL_orders"; // ID твиттера
var twitterCount = 2; // количество сообщений
var options = 	{enableLinks: true,
		ignoreReplies: true,
		clearContents: true,
		template: '%text% <br> <div align="right"><a href="http://twitter.com/%user_screen_name%/statuses/%id%/">%time%</a></div>'
				}	
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://twitter.com/statuses/user_timeline/'+twitterName+'.json?count='+twitterCount,
	onload:function(response){
        //Retrieve and truncate string
		var obj = eval ('(' + response.responseText + ')');

		latest=document.getElementById('latestnews');
		twitt_el = document.createElement("div");
		twitt_el.setAttribute("id", twitterTarget);
		twitt_el.innerHTML = "Loading...";
		latest.parentNode.insertBefore(twitt_el, latest);
		
        // private shortcuts
		String.prototype.linkify = function() {
			return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function(m) {
				return m.link(m);
			}).replace(/@[A-Za-z0-9]+/g, function(m) {
				return '<a href="http://twitter.com/' + m.substr(1) + '">' + m + '</a>';
			});
		};
		
        function node(e) {
            return document.createElement(e);
        }
        
        function text(t) {
            return document.createTextNode(t);
        }
		
		function relative_time(time_value) {
			var values = time_value.split(" ");
			time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
			var parsed_date = Date.parse(time_value);
			var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
			var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
			delta = delta + (relative_to.getTimezoneOffset() * 60);

			var r = '';
			if (delta < 60) {
				r = 'less than a minute ago';
			} else if(delta < 120) {
				r = 'about a minute ago';
			} else if(delta < (45*60)) {
				r = (parseInt(delta / 60)).toString() + ' minutes ago';
			} else if(delta < (2*90*60)) { // 2* because sometimes read 1 hours ago
				r = 'about an hour ago';
			} else if(delta < (24*60*60)) {
				r = 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
			} else if(delta < (48*60*60)) {
				r = '1 day ago';
			} else {
				r = (parseInt(delta / 86400)).toString() + ' days ago';
			}

			return r;
		}
		
		function getTwitterData(orig) {
			var data = orig, i;
			for (i in orig.user) {
				data['user_' + i] = orig.user[i];
			}
			
			data.time = relative_time(orig.created_at);
			
			return data;
		}	
		

        var target = document.getElementById(twitterTarget);
        var data = null;
        var ul = node('ul'), li, statusSpan, timeSpan, i, font;
        
        for (i = 0; i < twitterCount; i++) {
            data = getTwitterData(obj[i]);
            // if we requested frieds, mangle the object in to match timelines - future feature - not sure if it's worth while
            /*if (obj[i].screen_name) {
                obj[i].user = obj[i];
                obj[i].created_at = obj[i].status.created_at;
                obj[i].text = obj[i].status.text;
            }*/           
            
            if (options.ignoreReplies && obj[i].text.substr(0, 1) == '@') {
                continue; // skip
            }
            
            li = node('li');
			font = node('font');
			font.setAttribute("color", '#737373');
			if (i == 0) {
				font.setAttribute("size", '+1');
			};
			
			
            
            if (options.template) {
                li.innerHTML = options.template.replace(/%([a-z_\-\.]*)%/ig, function (m, l) {
                    var r = data[l] + "" || "";
                    if (l == 'text' && options.enableLinks) r = r.linkify();
                    return r;
                });
            } else {
                statusSpan = node('span');
                statusSpan.className = 'twitterStatus';
                timeSpan = node('span');
                timeSpan.className = 'twitterTime';
				brSpan = node('br');
                statusSpan.innerHTML = obj[i].text; // forces the entities to be converted correctly

                if (options.enableLinks == true) {
                    statusSpan.innerHTML = statusSpan.innerHTML.linkify();
                }

                timeSpan.innerHTML = relative_time(obj[i].created_at);

                if (options.prefix) {
                    var s = node('span');
                    s.className = 'twitterPrefix';
                    s.innerHTML = options.prefix.replace(/%(.*?)%/g, function (m, l) {
                        return obj[i].user[l];
                    });
                    li.appendChild(s);
                    li.appendChild(text(' ')); // spacer :-(
                }

                li.appendChild(statusSpan);
				li.appendChild(brSpan);
                li.appendChild(timeSpan);
            }
			if (i == 0) {
				b = node('li');
				b.appendChild(li);
				li=b;
			}
			font.appendChild(li);
			
            ul.appendChild(font);
			ul.appendChild(node("hr"));
			
        }

        if (options.clearContents) {
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
        }

        target.appendChild(ul);
		}	
	}
);