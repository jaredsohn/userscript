// ==UserScript==
// @name         Model Mayhem Quick Reference
// @namespace    http://www.modelmayhem.com/2899226
// @description  Parse and cache basic MM data and display quicklinks to user details in a persistent modal
// @match        http://*modelmayhem.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

(function() {
    var Members = (function() {
        var prefix = 'mm-member-';
        
        function read(id) {
            return GM_getValue(prefix + id);
        }
        
        function write(id, data) {
            GM_setValue(prefix + id, data);
        }

        return {
            get : function(id) {
                return read(id);
            },
            
            set : function(id, data) {
                write(id, data);
            }
        };
    }());
    
    function getMemberInfo(page) {
        var id = page.member,
            data;
        
        if (page.view === 'profile') {
            var $container = $('#main_container_content > table > tbody > tr > td:odd'),
                $sidebar = $('#main_container_content > table > tbody > tr > td:even'),
                $info, $name, name, gender, location, age, friends, last_activity;
            
            $name = $($container.find('h1')[0]);
            $info = $name.closest('td');
            data = $info.html().replace(/<h1>.*?<\/h1>/, '').split('<br>');
            gender = data[0].trim();
            age = parseInt(data[1].trim(), 10);
            location = data[2].trim();
            
            // Friends?
            friends = ($container.find('img[title="This member is your friend"]').length > 0) ? true : false;
            
            // Activity
            var $activity = $($sidebar.find('table')[2]), 
                dayTS = 1000 * 60 * 60 * 24,
                days;
            last_activity = new Date($($activity.find('tr')[1]).find('td:odd').text().trim());
            
            // Shoot details
            var $details = $($sidebar.find('table')[1]),
                nudes = $($details.find('tr')[28]).find('td:odd').text() == 'Yes' ? true : false,
                exp = $($details.find('tr')[30]).find('td:odd').text().trim(),
                comp = $($details.find('tr')[32]).find('td:odd').text().trim();
            
            data = { 
                id : id,
                name : $name.text(),
                age : age,
                gender : gender,
                location : location,
                friends : friends,
                active : Math.floor((+new Date() - +last_activity) / dayTS),
                nudes : nudes,
                exp : exp,
                comp : comp
            };
            
            Members.set(id, data);
        } else {
            data = Members.get(id);
        }
        
        return data;
    }
    
    var page = (function(loc) {
        var path = window.location.href.replace(window.location.protocol + '//' + window.location.host, ''),
            mode, id, match;
        
        if (match = path.match(/^\/([\d]+)/)) {
            mode = 'profile';
            id = match[1];
        } else if (match = path.match(/^\/portfolio\/([\d]+)/)) {
            mode = 'portfolio';
            id = match[1];
        } else if (match = path.match(/^\/mystuff\/messages\/message_history\/([\d]+)/)) {
            mode = 'messages';
            id = match[1];
        } else if (match = path.match(/^\/mystuff\/messages\/new_message\/([\d]+)/)) {
            mode = 'messages';
            id = match[1];
        }
        
        if (undefined === id || undefined === mode) {
            return false;
        }
        
        return { member : id, view : mode };
    }(window.location));
    
    var url = (function() {
        var base = window.location.protocol + '//' + window.location.host,
            urls = {
                profile   : base + '/{{id}}',
                portfolio : base + '/portfolio/{{id}}',
                history   : base + '/mystuff/messages/message_history/{{id}}',
                message   : base + '/mystuff/messages/new_message/{{id}}',
                friend    : base + '/mystuff/friends/add_friend/{{id}}'
            }
        
        return function(type, id) {
            if (undefined !== urls[type]) {
                return urls[type].replace('{{id}}', id);
            }
            
            return null;
        };
    }());
    
    // Only process the page if we have been able to parse an associated member from the URL
    if (false !== page) {
	    // Expect jQuery is available
        var $plugin = $('<div id="pnw-plugin-summary" style="border: 1px solid #aaa; padding: 5px; background-color: #fff; position: fixed; top: 0; right: 0; display: none; width: 240px; font-size: 0.8em; line-height: 1.4em;"></div>').appendTo('body'),
            member = getMemberInfo(page),
            out;
        
        if (member.id) {
            out  = '<div>';
            out += '<span style="float: right;">[' + (member.friends ? 'friend' : '<a href="' + url('friend', member.id) + '">add</a>') + ']</span>';
            out += '<a href="' + url('profile', member.id) + '"><b>' + member.name + '</b></a> (<i>' + member.age + '</i>)';
			out += '</div>';
            out += '<div>' + member.location + '</div>';
            out += '<div>Active ';
            if (member.active == 0) {
                out += '<b>today</b>';
            } else if (member.active == 1) {
                out += '<b>yesterday</b>';
            } else {
                out += '<b>' + member.active + '</b> days ago';
            }
            out += '</div>';
            out += '<div>' + member.exp + '</div>';
            out += '<div>Comp: <i>' + member.comp + '</i></div>';
            out += '<div>Does ' + (member.nudes ? '' : '<b>not</b> ') + 'shoot nudes.</div>';
            
            // Links
            var links = {
                'view port' : url('portfolio', member.id),
                'new message' : url('message', member.id),
                'past convos' : url('history', member.id)
            };
            
            out += '<div style="margin-top: 4px; border-top: 1px solid #ccc; padding-top: 4px; text-align: right;">';
            for (var k in links) {
	            out += '<span style="display: inline-block; padding: 0 4px;">[<a href="' + links[k] + '">' + k + '</a>]</span>';
            }
            out += '</div>';
            $plugin.html(out).show();
        }
    }
}());