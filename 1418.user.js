// ==UserScript==
// @name          Wikipedia Animate
// @namespace     http://phiffer.org/greasemonkey/
// @description	  Animates page modifications between two specific edit points
// @include       *action=history*
// ==/UserScript==

(

function() {
    
    function animate() {
        
        if (!document.getElementById('bodyContent')) {
            return;
        }
        
        var url = '' + window.location;
        this.diff_url = 'http://dev.phiffer.org/diff/';
        this.base_url = url.substr(0, url.indexOf('&'));
        this.hostname = url.substr(7, url.indexOf('/', 8) - 7);
        
        this.add_buttons();
        this.add_options();
        this.add_css();
        
    }
    
    animate.prototype.add_buttons = function() {
        
        // Create the animate buttons
        var button1 = document.createElement('input');
        button1.className = 'historysubmit';
        button1.style.marginLeft = '5px';
        button1.setAttribute('type', 'button');
        button1.value = 'Animate changes';
        button1.onclick = function() { animate.start(); }
        button1.setAttribute('id', 'animate_button1');
        
        var button2 = button1.cloneNode(true);
        button2.onclick = function() { animate.start(); }
        button2.setAttribute('id', 'animate_button2');
        
        // Add the buttons to the page
        var history = document.getElementById('pagehistory');
        history.parentNode.insertBefore(button1, history);
        history.parentNode.appendChild(document.createTextNode(' '));
        history.parentNode.appendChild(button2);
    }
    
    animate.prototype.add_options = function() {
        
        // Create the options box
        var toolbox = document.getElementById('p-tb');
        var options = document.createElement('div');
        options.className = 'portlet';
        
        options.innerHTML = '<h5>animate options</h5><div class="pBody"><ul>' +
                            
                            // Range selection
                            '<li>Animate over:' +
                            '<div><input type="radio" name="animate_range" id="animate_range_selected" value="selected" checked="checked"/> Selected</div>' +
                            '<div><input type="radio" name="animate_range" id="animate_range_all" value="all"/> All versions</div>' +
                            '<div><input type="checkbox" id="animate_skip_minor"/> Skip minor edits</div>' +
                            
                            // Diffs
                            '</li><li>Highlight diffs:' +
                            '<div><input type="radio" name="animate_diff" id="animate_diff_yes" value="yes" checked="checked"/> Yes</div>' +
                            '<div><input type="radio" name="animate_diff" id="animate_diff_no" value="no"/> No</div>' +
                            
                            // Speed
                            '</li><li>Animate speed:' +
                            '<div>Pause <input type="text" id="animate_delay" value="0.5" size="3" style="font-size: 10px" onblur="animate.option(this);"/> sec</div>' +
                            
                            // Info
                            '</li><li>Include info:' +
                            '<div><input type="checkbox" id="animate_info_date" checked="checked"/> Date/time</div>' +
                            '<div><input type="checkbox" id="animate_info_author" checked="checked"/> Author</div>' +
                            '<div><input type="checkbox" id="animate_info_summary" checked="checked"/> Change summary</div>' +
                            '</li></ul></div>';
                            
        toolbox.parentNode.appendChild(options);
    }
    
    animate.prototype.add_css = function() {
        
        // Add some CSS formatting rules for diffs
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = 'ins.diff { display: inline; background-color: #CFC; font-weight: bold; } ' +
                          'del.diff { background-color: #FFA; display: inline; } ' +
                          '#animate_main { width: 100%; position: relative; } ' +
                          '#animate_controls { position: absolute; top: 0; left: 0; background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAA8CAYAAACuGnCAAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABnSURBVHjaYvz///9NBjTAxIAFjAqOCo4KDl7Bf0D8H4rBgAWIvwExIxIGC36G6oBLgAQ/oakEC75HspAJJvgOm/a3uAQZkSSY8KrEEES2iAnm+I/Y3PkJ6ka4ICOwWOOA+RkmCBBgAIPPFd35TefZAAAAAElFTkSuQmCC) repeat-x; width: 100%; } ' +
                          '#animate_controls span.text { background: #FFF; } ' +
                          '#animate_main div.content { position: absolute; top: 60px; display: none; } ' +
                          '#animate_button { float: left; margin-left: 0; margin-top: 5px; width: 50px; } ' +
                          '#animate_scrubber { position: relative; width: 402px; height: 11px; border: 1px solid #AAA; background: #F5F5F5; float: left; margin: 8px; } ' +
                          '#animate_load_progress { position: absolute; top: 1px; left: 1px; background: #E1E1E1; height: 9px; width: 5px; visibility: hidden; } ' +
                          '#animate_playhead { position: absolute; left: 1px; top: 1px; cursor: pointer; background: transparent url(data:image/gif;base64,R0lGODlhCQAJAIAAAP///wAAACH5BAEAAAAALAAAAAAJAAkAAAIRhBGnwYrcDJxvwkplPtchVQAAOw==) no-repeat; height: 9px; width: 9px; } ' +
                          '#animate_status { font: 10px verdana, sans-serif; float: left; margin-top: 8px; } ' +
                          '#animate_info { font-size: 10px; margin: 0 0 20px 58px; }';
        head.appendChild(style);
    }
    
    animate.prototype.start = function() {
        
        // Initialize variables
        this.urls = new Array();
        this.info = new Array();
        this.pages = new Array();
        this.activity = new Array();
        this.activity_max = 0;
        this.num_loaded = 0;
        this.pos = 0;
        this.interval = -1;
        this.prev = -1;
        this.status = 1;  /* Status codes:
                             0: history
                             1: loading
                             2: playing
                             3: paused
                             4: playhead scrub */
        
        var history = document.getElementById('pagehistory');
        var items = history.getElementsByTagName('li');
        
        // Cache the current history view
        var bodyContent = document.getElementById('bodyContent');
        this.history_content = this.mediawiki_content(bodyContent.innerHTML);
        
        // Check whether to animate over all article revisions
        if (document.getElementById('animate_range_all').checked) {
            
            // Check to see if the current history page already contains every revision 
            var last_row = items[items.length - 1];
            var last_links = last_row.getElementsByTagName('a');
            var first_row = items[0];
            var first_links = first_row.getElementsByTagName('a');
            
            // The first and last list items each lack a 'last' and 'cur' link, respectively
            if (last_links[1].firstChild.nodeValue == 'last' ||
                first_links[0].firstChild.nodeValue == 'cur') {
                this.get_full_history();
                return;
            } else {
                first_row.getElementsByTagName('input')[1].checked = true;
                last_row.getElementsByTagName('input')[0].checked = true;
            }
        }
        this.parse_history();
        this.setup_markup();
        this.start_loading();

    }
    
    animate.prototype.get_full_history = function() {
        
        // Disable the animate buttons while we load
        var button1 = document.getElementById('animate_button1');
        button1.value = 'Loading...';
        button1.setAttribute('disabled', 'disabled');
        
        var button2 = document.getElementById('animate_button2');
        button2.value = 'Loading...';
        button2.setAttribute('disabled', 'disabled');
        
        // Load in the full history
        var request = new XMLHttpRequest();
        request.open('GET', this.base_url + '&action=history&limit=5000&offset=0', true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                
                var content = animate.mediawiki_content(request.responseText);
                document.getElementById('bodyContent').innerHTML = content;
                
                var history = document.getElementById('pagehistory');
                var items = history.getElementsByTagName('li');
                var inputs = items[items.length - 1].getElementsByTagName('input');
                inputs[0].checked = true;
                
                animate.parse_history();
                animate.setup_markup();
                animate.start_loading();
            }
        }
        request.send(null);
    }
    
    animate.prototype.parse_history = function() {
        
        var history = document.getElementById('pagehistory');
        var items = history.getElementsByTagName('li');
        var skip_minor = document.getElementById('animate_skip_minor').checked;
        var found_start = false;
        
        for (var i = 0; i < items.length; i++) {
            
            var radios = items[i].getElementsByTagName('input');
            var skip = false;
            
            // Skip this revision if it's been labeled 'minor'
            if (skip_minor) {
                var spans = items[i].getElementsByTagName('span');
                for (var j = 0; j < spans.length; j++) {
                    if (spans[j].className == 'minor') {
                        skip = true;
                    }
                }
            }
            
            if (radios[1] && radios[1].checked) {
                var links = items[i].getElementsByTagName('a');
                if (links[0].firstChild.nodeValue != 'cur' && !skip) {
                    this.urls.unshift(links[1].getAttribute('href'));
                    this.info.unshift(this.parse_info(items[i], 1));
                } else if (!skip) {
                    this.urls.unshift(links[2].getAttribute('href'));
                    this.info.unshift(this.parse_info(items[i], 2));
                }
                found_start = true;
            } else if (radios[0] && radios[0].checked) {
                var links = items[i].getElementsByTagName('a');
                if (links[1].firstChild.nodeValue != 'last' && !skip) {
                    this.urls.unshift(links[1].getAttribute('href'));
                    this.info.unshift(this.parse_info(items[i], 1));
                } else if (!skip) {
                    this.urls.unshift(links[2].getAttribute('href'));
                    this.info.unshift(this.parse_info(items[i], 2));
                }
                break;
            } else if (found_start && !skip) {
                var links = items[i].getElementsByTagName('a');
                this.urls.unshift(links[2].getAttribute('href'));
                this.info.unshift(this.parse_info(items[i], 2));
            }
        }
    }
    
    animate.prototype.setup_markup = function() {
        
        this.add_nav_link();
        
        var content = '<div id="animate_main">' +
                      '<div id="animate_controls">' +
                      '<input type="button" value="Pause" class="historysubmit" id="animate_button"/> ' +
                      '<div id="animate_scrubber">' +
                      '<div id="animate_load_progress"></div>' +
                      '<div id="animate_playhead"></div></div>' +
                      '<div id="animate_status">Loading...</div>' +
                      '<br style="clear: both;"/>' +
                      '<div id="animate_info"></div>' +
                      '</div></div>';
        document.getElementById('bodyContent').innerHTML = content;
        document.getElementById('bodyContent').style.height = '250px';
        
        this.content = 1;
        
        var playhead = document.getElementById('animate_playhead');
        playhead.onmousedown = function(e) { animate.playhead(e); return false; }
        
        var button = document.getElementById('animate_button');
        button.onclick = function() { animate.button(); }
        
        var body = document.getElementsByTagName('body').item(0);
        body.onmouseup = function(e) { animate.mouseup(e); }
        body.onmousemove = function(e) { animate.mousemove(e); }
        
        var top = 0;
        var curr = document.getElementById('animate_main');
        while (curr.offsetParent) {
            top += curr.offsetTop;
            curr = curr.offsetParent;
        }
        this.scroll_origin = top;
        
        setInterval('document.animate.check_scroll();', 50);
    }
    
    animate.prototype.add_nav_link = function() {
        var history_nav = document.getElementById('ca-history');
        history_nav.className = '';
        history_nav.getElementsByTagName('a').item(0).onclick = function() {
            animate.status = 0;
            document.getElementById('bodyContent').innerHTML = animate.history_content;
            histrowinit();
            this.parentNode.className = 'selected';
            
            var animate_nav = document.getElementById('animate_nav');
            this.parentNode.parentNode.removeChild(animate_nav);
            document.getElementById('animate_button1').onclick = function() { animate.start(); }
            document.getElementById('animate_button2').onclick = function() { animate.start(); }
            return false;
        }
        
        var animate_nav = document.createElement('li');
        var link = animate_nav.appendChild(document.createElement('a'));
        animate_nav.id = 'animate_nav';
        link.appendChild(document.createTextNode('animate'));
        link.setAttribute('href', '#');
        link.onclick = function() {
            return false;
        }
        animate_nav.className = 'selected';
        history_nav.parentNode.appendChild(animate_nav);
    }
    
    animate.prototype.start_loading = function() {
        var url = 'http://' + this.hostname + this.urls[0];
        
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                document.animate.loaded(request);
            }
        }
        request.send(null);
    }
    
    animate.prototype.parse_info = function(item, l) {
        var info = '';
        var links = item.getElementsByTagName('a');
        
        if (document.getElementById('animate_info_date').checked) {
            var href = links.item(l).getAttribute('href');
            var text = links.item(l).firstChild.nodeValue;
            info += '<a href="' + href + '">' + text + '</a> ';
        }
        if (document.getElementById('animate_info_author').checked) {
            var href = links.item(l + 1).getAttribute('href');
            var text = links.item(l + 1).firstChild.nodeValue;
            info += 'by <a href="' + href + '">' + text + '</a> ';
        }
        if (document.getElementById('animate_info_summary').checked) {
            var em = item.getElementsByTagName('em');
            if (em.length == 1) {
                info += '&nbsp;&nbsp;&nbsp;' + em.item(0).innerHTML;
            }
        }
        
        info = '<span class="text">' + info + '</span>';
        
        return info;
    }
    
    animate.prototype.loaded = function(details) {
        
        var content = this.mediawiki_content(details.responseText);
        this.pages[this.pages.length] = content;
        
        if (this.num_loaded > 0 && document.getElementById('animate_diff_yes').checked) {
            content = diffString(this.pages[this.num_loaded - 1], content);
        }
        
        var frame = document.createElement('div');
        var main = document.getElementById('animate_main');
        var controls = document.getElementById('animate_controls');
        
        main.insertBefore(frame, controls);
        frame.innerHTML = content;
        frame.className = 'content';
        frame.setAttribute('id', 'frame' + this.num_loaded);
        
        var load_progress = document.getElementById('animate_load_progress');
        load_progress.style.width = 5 + (395 * this.num_loaded / (this.urls.length - 1)) + 'px';
        load_progress.style.visibility = 'visible';
        
        if (this.num_loaded > 0 && document.getElementById('animate_diff_yes').checked) {
            
            var activity = 0;
            
            // Check for added content
            var b_list = frame.getElementsByTagName('b');
            for (var i = 0; i < b_list.length; i++) {
                if (b_list[i].className == 'diff') {
                    activity++;
                }
            }
            
            // Check for deleted content
            var s_list = frame.getElementsByTagName('s');
            for (var i = 0; i < s_list.length; i++) {
                if (s_list[i].className == 'diff') {
                    activity++;
                }
            }
            var id = this.activity.length;
            this.activity[id] = activity;
            
            var a = document.createElement('div');
            document.getElementById('animate_load_progress').appendChild(a);
            a.setAttribute('id', 'animate_activity' + id);
            a.style.position = 'absolute';
            a.style.left = (395 * (this.num_loaded - 1) / (this.urls.length - 1)) + 'px';
            a.style.width = (395 / (this.urls.length - 1)) + 'px';
            
            if (this.num_loaded == 1) {
                a.style.width = parseFloat(a.style.width) + 5 + 'px';
            } else {
                a.style.left = parseFloat(a.style.left) + 5 + 'px';
            }
            
            a.style.height = '9px';
            a.style.top = '0px';
            
            if (this.activity_max == 0) {
                if (activity == 0) {
                    var digit = 225;
                } else {
                    this.activity_max = activity;
                    var digit = 153;
                }
                a.style.background = 'rgb(' + digit + ',' + digit + ',' + digit + ')';
            } else {
                if (activity > this.activity_max) {
                    this.activity_max = activity;
                    this.normalize_activity();
                } else {
                    var digit = parseInt(225 - 72 * activity / this.activity_max);
                    a.style.background = 'rgb(' + digit + ',' + digit + ',' + digit + ')';
                }
            }
            
            
        }
        
        if (this.status == 1) {
            this.swap_content(this.num_loaded);
            var playhead = document.getElementById('animate_playhead');
            playhead.style.left = 1 + (390 * this.num_loaded / (this.urls.length - 1)) + 'px';
            this.set_info(this.num_loaded);
            this.pos = this.num_loaded;
        }
        
        this.num_loaded++;
        
        if (this.num_loaded < this.urls.length &&
            this.status != 0) {
            var url = 'http://' + this.hostname + this.urls[this.num_loaded];
            
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    document.animate.loaded(request);
                }
            }
            request.send(null);
            
        } else if (this.num_loaded == this.urls.length) {
            this.pause();
        }
    }
    
    animate.prototype.normalize_activity = function() {
        
        for (var i = 0; i < this.activity.length; i++) {
            var a = document.getElementById('animate_activity' + i);
            var digit = parseInt(225 - 72 * this.activity[i] / this.activity_max);
            a.style.background = 'rgb(' + digit + ',' + digit + ',' + digit + ')';
        }
        
    }
    
    animate.prototype.button = function() {
        if (this.status == 3) {
            this.play();
        } else {
            this.pause();
        }
    }
    
    animate.prototype.play = function() {
        
        this.status = 2;
        var button = document.getElementById('animate_button').value = 'Pause';
        
        if (this.pos + 1 == this.urls.length) {
            var playhead = document.getElementById('animate_playhead');
            playhead.style.left = '1px';
            this.pos = 0;
        }
        
        this.show_frame(this.pos);
        
        var delay = Math.round(parseFloat(document.getElementById('animate_delay').value) * 1000);
        this.interval = setInterval('document.animate.show_frame();', delay);
    }
    
    animate.prototype.pause = function() {
        
        this.status = 3;
        var button = document.getElementById('animate_button').value = 'Pause';
        
        if (this.interval != -1) {
            clearInterval(this.interval);
        }
    }
    
    animate.prototype.show_frame = function(num) {
        
        if (this.status == 0 || this.status == 3) {
            return;
        }
        
        // If not scrubbing
        if (this.status != 4) {
            var num = this.pos;
            var playhead = document.getElementById('animate_playhead');
            playhead.style.left = 1 + (390 * num / (this.urls.length - 1)) + 'px';
        }
        
        this.swap_content(num);
        this.set_info(num);
        
        if (this.status == 2) {
            if (this.pos + 1 >= this.pages.length) {
                this.pause();
            } else {
                this.pos++;
            }
        }
        
    }
    
    animate.prototype.set_info = function(num) {
        
        document.getElementById('animate_info').innerHTML = this.info[num];
        
        var prev = (num > 0) ? '<a href="#" onclick="animate.prev_frame(); return false;" accesskey="p">&larr;</a> ' : '&larr; ';
        var frame = (num + 1) + ' / ' + this.urls.length;
        var next = (num < this.urls.length - 1) ? ' <a href="#" onclick="animate.next_frame(); return false;" accesskey="nw">&rarr;</a>' : ' &rarr;';
        document.getElementById('animate_status').innerHTML = '<span class="text">' + prev + frame + next + '</span>';
        
    }
    
    animate.prototype.playhead = function(e) {
        this.status = 4;
        return false;
    }
    
    animate.prototype.prev_frame = function() {
        this.pos--;
        this.show_frame(this.pos);
        this.status = 3;
    }
    
    animate.prototype.next_frame = function() {
        if (this.pos + 1 < this.num_loaded) {
            this.pos++;
            this.show_frame(this.pos);
            this.status = 3;
        }
    }
    
    animate.prototype.mousemove = function(e) {
        
        // Make sure the user has clicked on the playhead
        if (animate.status != 4) {
            return;
        }
        
        var scrubber = document.getElementById('animate_scrubber');
        var left = 0;
        var curr = scrubber;
        while (curr.offsetParent) {
            left += curr.offsetLeft;
            curr = curr.offsetParent;
        }
        
        var playhead = document.getElementById('animate_playhead');
        var x = e.pageX - left - 5;
        
        if (x > 391) {
            x = 391;
        } else if (x < 1) {
            x = 1;
        }
        
        var load_progress = document.getElementById('animate_load_progress');
        if (x > parseInt(load_progress.style.width - 5)) {
            x = parseInt(load_progress.style.width - 5);
        }
        
        playhead.style.left = x + 'px';
        
        var snap = Math.floor((x - 1) * (animate.urls.length - 1) / 390);
        if (snap != animate.pos) {
            animate.pos = snap;
            animate.show_frame(snap);
        }
        
    }
    
    animate.prototype.mouseup = function(e) {
        
        if (animate.status != 4) {
            return;
        }
        
        var scrubber = document.getElementById('animate_scrubber');
        var left = 0;
        var curr = scrubber;
        while (curr.offsetParent) {
            left += curr.offsetLeft;
            curr = curr.offsetParent;
        }
        
        var playhead = document.getElementById('animate_playhead');
        var x = e.pageX - left - 5;
        
        if (x > 391) {
            x = 391;
        } else if (x < 1) {
            x = 1;
        }
        
        var load_progress = document.getElementById('animate_load_progress');
        if (x > parseInt(load_progress.style.width)) {
            x = parseInt(load_progress.style.width);
        }
        
        var snap = Math.floor((x - 1) * (animate.urls.length - 1) / 390);
        if (snap != animate.pos) {
            animate.pos = snap;
            animate.show_frame(snap);
        }
        animate.status = 3;
        
    }
    
    animate.prototype.option = function(input) {
        
    }
    
    animate.prototype.swap_content = function(num) {
        
        var frame = document.getElementById('frame' + num);
        frame.style.display = 'block';
        
        var height = parseInt(frame.offsetHeight) + 60;
        document.getElementById('bodyContent').style.height = height + 'px';    
        
        if (this.prev != -1) {
            var prev = document.getElementById('frame' + this.prev);
            prev.style.display = 'none';
        }
        
        this.prev = num;
    }
    
    animate.prototype.mediawiki_content = function(text) {
        text = '' + text;
        var start = text.indexOf('<!-- start content -->');
        var end = text.indexOf('<!-- end content -->');
        return text.substr(start, end - start);
    }
    
    animate.prototype.check_scroll = function() {
        var controls = document.getElementById('animate_controls');
        if (self.pageYOffset > this.scroll_origin) {
            controls.style.top = (self.pageYOffset - this.scroll_origin) + 'px';
        } else {
            controls.style.top = 0;
        }
    }
    
    var animate = new animate();
    document.animate = animate;
    
    // JavaScript diff code thanks to John Resig (http://ejohn.org)
    // http://ejohn.org/files/jsdiff.js
    function diffString( o, n ) {
		var out = diff( o.split(/\s+/), n.split(/\s+/) );
		var str = "";
	
		for ( var i = 0; i < out.n.length - 1; i++ ) {
			if ( out.n[i].text == null ) {
				if ( out.n[i].indexOf('"') == -1 && out.n[i].indexOf('<') == -1 && out.n[i].indexOf('=') == -1 )
					str += "<b style='background:#E6FFE6;' class='diff'> " + out.n[i] +"</b>";
				else
					str += " " + out.n[i];
			} else {
				var pre = "";
				if ( out.n[i].text.indexOf('"') == -1 && out.n[i].text.indexOf('<') == -1 && out.n[i].text.indexOf('=') == -1 ) {
					
					var n = out.n[i].row + 1;
					while ( n < out.o.length && out.o[n].text == null ) {
						if ( out.o[n].indexOf('"') == -1 && out.o[n].indexOf('<') == -1 && out.o[n].indexOf(':') == -1 && out.o[n].indexOf(';') == -1 && out.o[n].indexOf('=') == -1 )
							pre += " <s style='background:#FFE6E6;' class='diff'>" + out.o[n] +" </s>";
						n++;
					}
				}
				str += " " + out.n[i].text + pre;
			}
		}
		
		return str;
	}
	
	function diff( o, n ) {
		var ns = new Array();
		var os = new Array();
		
		for ( var i = 0; i < n.length; i++ ) {
			if ( ns[ n[i] ] == null )
				ns[ n[i] ] = { rows: new Array(), o: null };
			ns[ n[i] ].rows.push( i );
		}
		
		for ( var i = 0; i < o.length; i++ ) {
			if ( os[ o[i] ] == null )
				os[ o[i] ] = { rows: new Array(), n: null };
			os[ o[i] ].rows.push( i );
		}
		
		for ( var i in ns ) {
			if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
				n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
				o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
			}
		}
		
		for ( var i = 0; i < n.length - 1; i++ ) {
			if ( n[i].text != null && n[i+1].text == null && o[ n[i].row + 1 ].text == null && 
					 n[i+1] == o[ n[i].row + 1 ] ) {
				n[i+1] = { text: n[i+1], row: n[i].row + 1 };
				o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
			}
		}
		
		for ( var i = n.length - 1; i > 0; i-- ) {
			if ( n[i].text != null && n[i-1].text == null && o[ n[i].row - 1 ].text == null && 
					 n[i-1] == o[ n[i].row - 1 ] ) {
				n[i-1] = { text: n[i-1], row: n[i].row - 1 };
				o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
			}
		}
		
		return { o: o, n: n };
	}
    
}

)();
