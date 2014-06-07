// ==UserScript==
// @name           Twitter to eRepublik
// @namespace      www.erepublik.com
// @description    twitter to eRepublik
// @version        1.0
// @include        http://www.erepublik.com/en
// @include        http://www.erepublik.com/ru
// ==/UserScript==
var twitterTarget = "battle_orders";
var twitterName = "eABOC"; // ID твиттера
var twitterCount = 3; // количество сообщений
var twimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAP6SURBVEjH1VVdTFtlGOZGL3ZhjBd6OX7UGUzEZYuJize6mBlaHP6wDseiDDdBBkvImBOmTDf6cxq6lnb8dKDAClQoDggbHQzaMmhHVyDICqvIViwDWgSMRjaynvP4fifVZFGzxsyoF0++fqfveZ7nfb/3e08MgJh/EjH/qkBssiKDoI+TqtxxEpV/o0QpeaACiW+WBeMlSsQRMorNfJJMu0a/y7dsqX7ogQjES5V8glSJ5Px6ElGI6468+tuUzUTsa4rYSJbbSXSWcIfgp31CVAIUmMicv7DXAOOFSWgtI3jqdQ7P7dIi8/N2JvwzxfRSjJBSYBI+OWPHtswqnva/0PPHohF4ngD5WSd0nV4YuqbQ6fIzEsRLVXj2LQ02paqhI2E9/V9i8qDRNo2tGQYmMhjtIdc9mcIJlsszUH/thaZ9EtbRW8hWduHV3Dqcc97ECfMY8qqc+EB/GcX1wyg83YdYiWI96jYlN9Nb9+jDjJg7N4myjutodc6iZ2we8pZvcLjWjfxqFyrOezHhX0bb0AwTEMhcBeHR+wpQ0CMkcltW1CJ0uANQtnlR2jpBzsdR1DASEXDC7QvBH/wJZ/t8OFjWDdZ99O5yVK1GgfvZeXSRQE3PNI43j+OYaRQf1XlQUDOMg5VOWAZvoGVgBhVd1/BKTm2Y4tcJsmjIX6YWDb9zrJVvG/KjpHEMxeT8KJEz94eoPB+eHsT7OgfeLetHY/+3SEhRMYE08Qwo/Q7aNLN6/Ql5PoHPOtkuNNlniPQqCr9gcIvOGXluxRAO6AeQecqGLK1dFGDZEp4QBehHZ+QBOxgboZpwioR/SJCq+ILyXtT1+nDI6BIJfwPrHOacke8n9xqLB90uH5qtY+zm8/d0ET3wUlp48b1KfnN6+d0kme5uamGTYOq/Drl5FAfKHWIb5hgIRMpWti8wOtHq8GH2VgiLi4tYWVlBnsKCp3dyrnsEyPHDzPFLWVV8U78PZ7q9OG66in2Udoa6T6xtpsZGe7tYBrZ+2jCMhaUVrK6uIhQKYWlpCTdn57FpJ8eqkfiHe8BqRlhL2q0LV3aM40iNE2+ftEIm70G6shd7uEui2F5CScMVBOYXRdJgMIiFhQUsk/vdRxrodnPX/nIWRXp+imovFBntULWMIK3UKgqllV7ELvlFFBoHcMP/Pebm5hAIBH4vTfaJr/BMqvpH4thw32FHQVp26Nuza3iu+Qo+Mw0j1+DAPk0f2mzjIjFzzUoz5JlCcq5RIOdr9M7jUY9rCt5GV36ETcvN6bpw2sdm5HDnYbrggdUxCnUtZXX4S4FqLtBYN7Nz/FufTHY/CFUk9B1hmUb2ncQ31Ou0Tkbmzcb/7jf5fyHwK+skIo+04e5gAAAAAElFTkSuQmCC';
var twimgold = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADdcAAA3XAUIom3gAAALwSURBVEiJ1ZW7T5NhFMZddHAwxEFHTdycnN2Mo7NxcXX1X9FoYnTjFlogAVpugQLlUigUyiW9AW1AExIotMTEWCC03/H5vemXoALWRAaHJ9/lfb/nOec557zfNTO7dpW4UnInUKlULkRzc/NL4X1LS0tC+Kz7Z5ftPw+XLra3txdFbCK24eHhWkdHR0X37zo7O6//EwGR1xAIhUJOhGtfX9+R3qX0fL+e5VPhi3AskOWDhgS08SGkitZSqZQtLy9ba2urKQsbHR1F+JvWI4IXDoe9ubk56+7urun5u3C7EYFHCCQSCVtdXbW1tTXL5/OQGFnJPmtra3PCrC0sLFgul7NgMIhIrCGLtLFZUXsbGxu2srLihLa2tmxiYsJ6e3ttc3PTFhcXbWZmxqampmx+ft7d67OThgTqInlFVYXYF4F4e3vbksmkYU0sFnNZ7O7uGsFgm/BBaGpE4JZwNDQ05BUKBWcJxEtLSy5iX2BnZ8cODg4sm81aNBq1eveVG2o1bXxFPRBIp9POFjyPx+M2OzvrbCHy9fV1l0lPT08Vm4QXjZA/EarMAdZQdMjPRj89PW2Tk5OuNmSg6BF47mqgm5AQwK9zyF8LtUgk4tEhRAwgJnLI/QJjC0CAbIW7vkC4/oLCRIVPwhuhxKARXSaTcWRnATFrkBM9daGNsZCgfuoivchQlK6urlogEDjVMJ0ODAx4REMxIYAIQh88kwW+F4tFV+DDw0MbHx9nIOO/CtwgYiYRUiYXn0mZD/DWt8AHNSiVSo6UK9jb23PTzinw2xzgmVBR9FU6AZ9HRkY4FmxsbMwBMQA5UUNK5Pv7+1Yul21wcBCB9IVnUb3nc7LLI33sQcQXAvjPQCFAxL41rOno+Krvb/7xsNOmtxRd/Vzzex7f/TaEmKjJgAnXseEpco7yOw0f19r8WEgipMJXSR8B6kNhadf+/n6IPWUcpI5//T+oCzUJH4UCoy/CY1lxomu2ft7cu+z7q/8n//cCPwAHocFRI9hxqwAAAABJRU5ErkJggg==';
var options = 	{enableLinks: true,
		ignoreReplies: true,
		clearContents: true,
		template: '<span>%text%</span><em><a href="http://twitter.com/%user_screen_name%/status/%id%/">%time%</a></em>'
}


// -- Style variables --------------------------------------------------------------------------------------------------
GM_addStyle(
  '#battle_orders h4 { clear: both; color: #666666; float: left; font-size: 11px; font-weight: bold; margin-bottom: 5px; margin-top: 5px; }' +
  '#battle_orders ul { clear: both; display: block; float: left; margin-bottom: 10px; }' +
  '#battle_orders li { background-color: #eaf1fa; border-top: 1px solid #cbd9ea; display: block; float: left; padding-left: 10px; position: relative; width: 323px; }' +
  '#battle_orders span { color: #7D7F81; float: left; font-size: 11px; padding-left: 32px; padding-right: 8px; margin-top: 8px; background:url('+twimgold+') no-repeat }' +
  '#battle_orders .order-0 span { color: #315A89; font-weight: bold; background:url('+twimg+') no-repeat }' +
  '#battle_orders em { font-family: "Segoe UI",Segoe,Tahoma,Geneva,sans-serif; font-style: italic; margin: 3px 5px; float:right; font-size: 10px;}' +
	'#battle_orders img { float: left; margin-top: 11px;}' + 
	'#battle_orders .rest { float: left; margin: 5px 0 15px; }' +
	'#battle_orders .rest a { float: left; font-size: 12px; margin-right: 8px; text-decoration: underline; }'
);

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://twitter.com/statuses/user_timeline/'+twitterName+'.json?count='+twitterCount,
	onload:function(response){
    //Retrieve and truncate string
		var obj = eval ('(' + response.responseText + ')');

    function node(e) {
      return document.createElement(e);
    }

    function text(t) {
      return document.createTextNode(t);
    }
    
    function trim (str) {
      str = str.replace(/^\s+/, '');
      for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
          str = str.substring(0, i + 1);
          break;
        }
      }
      return str;
    }

		var latest = document.getElementById('battle_listing');
		var twitt_el = node("div");
		twitt_el.setAttribute("id", twitterTarget);
		twitt_el.setAttribute("style", "float: left;");
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
        var ul = node('ul'), li, statusSpan, timeSpan, i;

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
				li.setAttribute("class", 'order-'+i);

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

      ul.appendChild(li);

      }

        if (options.clearContents) {
            while (target.firstChild) {
                target.removeChild(target.firstChild);
            }
        }

        var h4 = node('h4');
        h4.innerHTML = 'Twitter';
        var rest = node ('div');
        rest.setAttribute("class", 'rest');
        rest.innerHTML = '<a href="http://chat.mibbit.com/index.html?server=irc.rizon.net&channel=%23UAE&nick='+trim(document.getElementsByClassName( 'citizen_name', document.getElementById('miniprofile'))[0].innerHTML).replace(' ','_').replace('.','')+'" target="_blank">IRC</a><a href="http://twitter.com/eABOC" target="_blank">Twitter</a>';
        
        target.appendChild(h4);
        target.appendChild(ul);
        target.appendChild(rest);

        
        
		}
	}
);
