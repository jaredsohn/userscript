// ==UserScript==
// @name           DS - DualForum المعرب:الملوك
// @namespace      Die Stämme
// @author         Original: still80; Opera Version: c1b1se
// @description    ReadMarker für Dual Account
// @version        0.0.12
// @license        MIT License
//     
// @include         http://ae*.tribalwars.ae/*
// @include        http://*.plemiona.pl/*
// @include        http://*.voyna-plemyon.ru/*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==


/*
changelog
v0.0.1 - initial release
v0.0.2 - opera support, an dieser Stelle ein Dankeschoen an Hypix fuer die Bereitstellung seiner storage klasse
v0.0.3 - overview
v0.0.4 - Komplette Überarbeitung für Opera 10.61
v0.0.5 - "Forum als gelesen Markieren" Funktion (blauer Punkt)
v0.0.6 - Bugfix
v0.0.7 - Post sind nur gelesen, wenn man sie wirklich gesehen hat
v0.0.8 - Threads werden nur gelesen markiert, wenn sie wirklich ganz gelesen wurden
v0.0.9 - Performance verbessert; Auswahlmöglichkeiten für Icons
v0.0.10 - Bugfix
v0.0.11 - Bugfix: Kompatibilität zu DS Duke & Forum Assistant Script
v0.0.12 - Bugfix: Fehlermeldung bei Geschlossenen Threads
*/


// Standard Icons. Hier nichts verändern, im Script ist ein Interface zum Ändern der Icons eingebaut:
var green = "/graphic/dots/green.png?1";
var red = "/graphic/dots/red.png?1";
var blue = "/graphic/dots/blue.png?1";

var green_threads = "/graphic/dots/green.png?1";
var red_threads = "/graphic/dots/red.png?1";
var blue_markread = "/graphic/dots/blue.png?1";


if(document.location.href.indexOf("forum.php") != -1) {


    // Storage-Klasse
    // Autor: Hypix
    // Zur freien Verwendung
    function Storage(prefix,forceGM)
    {
        var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1
        var win = gm ? unsafeWindow : window;
        var ls = false;
        var intGetValue;
        var intSetValue;
        var prefix = prefix;
        try {
            ls = typeof(win.localStorage) != "undefined";
        } catch(e) {}
        if( !ls && !gm )
            throw("Keine geeignete Speichermöglichgkeit gefunden");
        if( forceGM && gm || !ls)
        {
            if( gm )
            {
                prefix = prefix + "_" + document.location.host.split('.')[0];
                intSetValue = function(key,value)
                {
                    GM_setValue(prefix+"_"+key,value);
                };
                intGetValue = function(key,defaultValue)
                {
                    return GM_getValue(prefix+"_" + key, defaultValue);
                }
                this.deleteValue = function(key)
                {
                    GM_deleteValue(prefix+"_"+key);
                }
                this.listValues = function(re)
                {
                    var allkeys = GM_listValues();
                    var serverKeys = [];
                    var rePrefix = new RegExp("^"+prefix+"_(.*)");
                    if( typeof(re) != "undefined" )
                        var reKey = new RegExp(re);
                    for( var i = 0; i < allkeys.length; i++ )
                    {
                        var res = allkeys[i].match(rePrefix);
                        if( res )
                        {
                            if( reKey )
                            {
                                res = res[1].match(reKey);
                                if( res )
                                    serverKeys.push(res);
                            }
                            else
                                serverKeys.push(res[1]);
                        }
                    }
                    return serverKeys;
                }
            }
        }
        else if( ls )
        {
            intSetValue = function(key,value)
            {
                localStorage.setItem(prefix+"_"+key, value );
            };
            intGetValue = function(key,defaultValue)
            {
                var value = localStorage.getItem(prefix+"_"+key);
                if( value )
                    return value;
                else
                    return defaultValue;
            };
            this.deleteValue = function(key)
            {
                localStorage.removeItem(prefix+"_"+key);
            }
            this.listValues = function(re)
            {
                var keys = [];
                var rePrefix = new RegExp("^"+prefix+"_(.*)$");
                if( typeof(re) != "undefined")
                    var reKey = new RegExp(re);
                for( var i = 0; i < win.localStorage.length; i++ )
                {
                    var res = localStorage.key(i).match(rePrefix);
                    if( res )
                    {
                        if( reKey )
                        {
                            res = res[1].match(reKey);
                            if( res )
                                keys.push(res);
                        }
                        else
                            keys.push(res[1]);
                    }
                }
                return keys;
            }
        }
        this.clear = function(re)
        {
            var keys = this.listValues(re);
            for( var i = 0; i < keys.length; i++ )
                this.deleteValue(keys[i]);
        }
        this.setValue = function(key,value)
        {
            switch( typeof(value) )
            {
                case "object":
                case "function":
                    intSetValue(key,"j"+JSON.stringify(value));
                    break;
                case "number":
                    intSetValue(key,"n"+value);
                    break;
                case "boolean":
                    intSetValue(key,"b" + (value ? 1 : 0));
                    break;
                case "string":
                    intSetValue(key,"s" + value );
                    break;
                case "undefined":
                    intSetValue(key,"u");
                    break;
            }
        }
        this.getValue = function(key,defaultValue)
        {
            var str = intGetValue(key);
            if( typeof(str) != "undefined" )
            {
                switch( str[0] )
                {
                    case "j":
                        return JSON.parse(str.substring(1));
                    case "n":
                        return parseFloat(str.substring(1));
                    case "b":
                        return str[1] == "1";
                    case "s":
                        return str.substring(1);
                    default:
                        this.deleteValue(key);
                }
            }
            return defaultValue;
        }
        this.getString = function(key)
        {
            return intGetValue(key);
        }
        this.setString = function(key,value)
        {
            intSetValue(key,value);
        }
    }

    // Ende Storage-Klasse




    // Functions

    // Set all threads in a forum read
    function markForumRead() {
        // Threads
        var vis = document.getElementsByClassName("vis");
        var tds = vis[0].getElementsByTagName("td");

        var data_threads = storage.getValue("ds_dualforum_threads");
        data_threads = data_threads?data_threads:'';

        for(var i = 0; i < tds.length; i++) {
            if(!tds[i].getElementsByTagName('img')[0] || tds[i].getElementsByTagName('img')[0].src.indexOf(green_threads) != -1) {
                continue; // Skip everything without a red (unread) image
            }

            var thread_id = tds[i].getElementsByTagName('a')[0].href.match(/thread_id=([0-9]+)/)[1];

            var span = tds[i+2];

            var pid = span.innerHTML.match(/id=([0-9]+)/)[1];

            var arr = [false,pid,'day','month','hour','minutes'];

            arr = extractDateTime(arr,span.innerHTML);

            // Pattern: #tid.pid.day-month.hour:minutes#
            if(data_threads[data_threads.length-1] == '#') {
                data_threads += thread_id + '.' + arr[1] + '.' + arr[2] + '-' + arr[3] + '.' + arr[4] + ':' + arr[5] + '#';
            }
            else {
                data_threads += '#' + thread_id + '.' + arr[1] + '.' + arr[2] + '-' + arr[3] + '.' + arr[4] + ':' + arr[5] + '#';
            }

            tds[i].getElementsByTagName('img')[0].src = green_threads;
        }
        storage.setValue("ds_dualforum_threads", data_threads);
    }

    Array.prototype.compare = function(arr2) {
        if(this.length != arr2.length)
            return false;
        for(var i = 0; i < this.length; i++)
        {
            if(this[i] != arr2[i])
                return false;
        }	 
        return true;

    };


    function parseInteger(str) {
        var re = '';
        for(var i = 0,add = false; i < str.length; i++) {  
            if(!add && str[i] != '0')
                add = true; 
            if(add)
                re += str[i]			  
        }
        return parseInt(re);
    }


    // Get date and time of a post
    function extractDateTime(arr,html) {
        var date = html.match(/am ([0-9]+)\.([0-9]+)\.([0-9]*) um ([0-9]+)\:([0-9]+) Uhr/);
        if(!date && html.indexOf('heute um') != -1) {
            var date = html.match(/heute um ([0-9]+)\:([0-9]+) Uhr/);
            var d = new Date();
            arr[2] = parseInt(d.getDate());
            arr[3] = parseInt(d.getMonth()+1);
            arr[4] = parseInteger(date[1]);
            arr[5] = parseInteger(date[2]);
        }    
        else {
            var d = new Date();
            arr[2] = parseInteger(date[1]);
            arr[3] = parseInteger(date[2]);
            arr[4] = parseInteger(date[4]);
            arr[5] = parseInteger(date[5]);
        }
        return arr;
    }

    function rel_top(e)
    {
        var y = 0;
        while(e)
            y += e.offsetTop + e.clientTop,e = e.offsetParent;
        return y;
    }


    function save_settings() {
        var $ = function (id) {
            return document.getElementById(id).value;
        };
        var settings = [$('new_green'),$('new_red'),$('new_blue'),$('new_green_threads'),$('new_red_threads'), $('new_blue_markread')];
        for(var i = 0; i < settings.length; i++) {
            if(settings[i] == '') 
                settings[i] = standard[i];
        }
        storage.setValue("ds_dualforum_settings", JSON.stringify(settings));
        alert('تـم حفظ التغييرات');	
        document.location.reload();
    }


    function show_settings(ev) {
        var table = document.createElement('table');
        table.setAttribute('style','position:absolute; top:10px; left:10px; background:#F1EBDD; paddind:5px; border:2px Black outset;');
        table.setAttribute('id','dualforum_settings');	
        table.innerHTML = '<tr><th>القياسية</th><th>اخبار</th><th>جديد</th><th></th></tr>'+
        '<tr><td colspan="4"> </td></tr>'+		
        '<tr><th colspan="4">الردود/Posts</th></tr>'+		
        '<tr><td><img src="'+standard[0]+'"</td><td><img src="'+green+'"</td><td><input type="text" id="new_green" value="'+green+'" /></td><td>Gelesen</td></tr>'+
        '<tr><td><img src="'+standard[1]+'"</td><td><img src="'+red+'"</td><td><input type="text" id="new_red"   value="'+red+'" /></td><td>تجاهل من قبل السكربت</td></tr>'+
        '<tr><td><img src="'+standard[2]+'"</td><td><img src="'+blue+'"</td><td><input type="text" id="new_blue" value="'+blue+'" /></td><td>معترف بها من قبل السكربت على النحو</td></tr>'+
        '<tr><th colspan="4">الموضوع</th></tr>'+	
        '<tr><td><img src="'+standard[3]+'"</td><td><img src="'+green_threads+'"</td><td><input type="text" id="new_green_threads" value="'+green_threads+'" /></td><td> موضوع يوجد به زوآر <td></tr>'+
        '<tr><td><img src="'+standard[4]+'"</td><td><img src="'+red_threads+'"</td><td><input type="text" id="new_red_threads" value="'+red_threads+'" /></td>موضوع لايوجـد به زوآر<ttd></tr>'+
        '<tr><th colspan="4">المنتديات</th></tr>'+		
        '<tr><td><img src="'+standard[5]+'"</td><td><img src="'+blue_markread+'"</td><td><input type="text" id="new_blue_markread" value="'+blue_markread+'" /></td>المواضيع<ttd></tr>';  	
        document.body.appendChild(table);
        var tr = document.createElement('tr')
        table.appendChild(tr);
        var th = document.createElement('th');
        th.setAttribute('colspan',4);
        tr.appendChild(th);
        var input0 = document.createElement('input');
        th.appendChild(input0);
        input0.setAttribute('type','button');
        input0.setAttribute('value','حفظ وإغلاق');
        input0.addEventListener('click',save_settings,false);	
	
        var input2 = document.createElement('input');
        th.appendChild(input2);
        input2.setAttribute('type','button');
        input2.setAttribute('value','الغاء');
        input2.addEventListener('click',function() {
            document.getElementById('dualforum_settings').parentNode.removeChild(document.getElementById('dualforum_settings'));
        },false);

        window.scrollTo(0,0); 

        var insertSrcIntoTextfeld = function() {
            this.parentNode.parentNode.getElementsByTagName('input')[0].value = this.src;
        }
        var elist = document.getElementById('dualforum_settings').getElementsByTagName('img');
        for(var i = 0; i < elist.length; i++)
        {
            elist[i].setAttribute('title','Klicken zum Einfügen');
            elist[i].addEventListener('click',insertSrcIntoTextfeld,false);
        }
    }


    // Server
    var prefix = document.location.href.match(/http\:\/\/([a-z]+[0-9]+)\./)[1];


    // Load Settings
    var standard = [green,red,blue,green_threads,red_threads,blue_markread];
    var storage = new Storage(prefix,false);
    var settings = storage.getValue("ds_dualforum_settings");
    if(settings) {
        settings = JSON.parse(settings);
        if(settings.length == 6) {
            green = settings[0];
            red = settings[1];
            blue = settings[2];
            green_threads = settings[3];
            red_threads = settings[4];
            blue_markread = settings[5];
        }		
    }



    // Handle Thread
    if (document.location.href.match("screen=view_thread&thread")) {


        document.getElementsByTagName('h2')[0].addEventListener('click',function() {
            document.location.reload();
        },false);

        // Get Posts
        var data_posts = storage.getValue("ds_dualforum_posts");
        data_posts = data_posts?data_posts:'';

        var posts = document.getElementsByClassName('post');

        // Lastpage?
        var table = posts[posts.length-1].nextSibling.nextSibling;
        var result = table.innerHTML.match(/\<b\>\&gt\;([0-9]+)\&lt\;\<\/b\>\n\<\/td\>/);
        var lastpage = result?true:false;

        var threadread = true;
	
        // Current Thread
        if(lastpage) {    // Mark Thread read on last page
            var lastpost = posts[posts.length-1];
            lastpost.id = 'lastpost';

            var data_threads = storage.getValue("ds_dualforum_threads");
            data_threads = data_threads?data_threads:'';

            var thread_id = document.location.href.match(/thread_id=([0-9]+)/)[1];

            var span = lastpost.getElementsByTagName('span')[0];
            var pid = span.innerHTML.match(/id=([0-9]+)/)[1];

            var arr = [false,pid,'day','month','hour','minutes'];

            arr = extractDateTime(arr,span.innerHTML);
		
            var matches = data_threads.match(new RegExp('\#' + thread_id + '\.([0-9]+)\.([0-9]+)-([0-9]+).([0-9]+):([0-9]+)\#'));
            if(!matches) {
                threadread = false;
            }
            else {
                arr[0] = matches[0];
		
                if(!arr.compare(matches)) {
                    threadread = false;
                }
            }
            storage.setValue("ds_dualforum_threads", data_threads);
        }

        // Posts in the current thread
        var redPosts = [];
	
        for (i = 0; i < posts.length; i++ ) {
            if(!posts[i].getElementsByTagName('span')[1])
                continue;

			var matches = posts[i].getElementsByTagName('span')[1].innerHTML.match(/quote_id=([0-9]+)/);		
			if(!matches)
            {
				if(!posts[i].getElementsByTagName('span')[2])  // Closed Thread without quote link
				{	
                    continue;
	            }				
				else 
				{
				    var matches = posts[i].getElementsByTagName('span')[2].innerHTML.match(/quote_id=([0-9]+)/); // Duke and Forum Assistant added a span
                }				
			}				
            var post_id = matches[1];
		
            // Pattern: #56426#21256#456456#
            var hasread = true;
            if(data_posts.indexOf('#' + post_id + '#') == -1) {
                hasread = false;
                redPosts.push(posts[i]);
            }	
		
            var img = document.createElement("img");
            img.src = hasread ? green : red;
            posts[i].getElementsByTagName('span')[0].insertBefore(img, posts[i].getElementsByTagName('span')[0].firstChild);
		
            if(hasread && threadread == false && posts[i].id == 'lastpost')
                redPosts.push(posts[i]);		
        }


        // Posts in the current thread
        if(redPosts[0]) {
	    
            window.setInterval(function() {
	
                // Get Posts
                data_posts = -1;
	
                for (i = 0; i < redPosts.length; i++ ) {
                    if(!redPosts[i] || !redPosts[i].getElementsByTagName('span')[1])
                        continue;
						
						
                    if(rel_top(redPosts[i]) < window.innerHeight+window.pageYOffset)	
                    { // Mark Red	
                        if(data_posts === -1) { // Load Data, if not loaded yet
                            var data_posts = storage.getValue("ds_dualforum_posts");
                            data_posts = data_posts?data_posts:'';
                        }

                        // ID
   				        var matches = redPosts[i].getElementsByTagName('span')[1].innerHTML.match(/quote_id=([0-9]+)/);				
			            if(!matches)
                        {
				            if(!redPosts[i].getElementsByTagName('span')[2])  // Closed Thread without quote link
				            {	
                                continue;
	                        }				
				            else 
				            {
				                var matches = redPosts[i].getElementsByTagName('span')[2].innerHTML.match(/quote_id=([0-9]+)/);	// Duke and Forum Assistant added a span
                            } 						
		
				        }			
                        var post_id = matches[1];	  
		  
                        // append to data
                        if(data_posts[data_posts.length-1] == '#')
                            data_posts += post_id + '#';
                        else
                            data_posts += '#' + post_id + '#';	

                        // Blue dot
                        var img = redPosts[i].getElementsByTagName('img')[0];
                        img.src = blue;

			
                        if(redPosts[i].id && redPosts[i].id == 'lastpost') {
                            // Mark Thread read  
					
                            var lastpost = redPosts[i];

                            var data_threads = storage.getValue("ds_dualforum_threads");
                            data_threads = data_threads?data_threads:'';

                            var thread_id = document.location.href.match(/thread_id=([0-9]+)/)[1];

                            var span = lastpost.getElementsByTagName('span')[0];
                            var pid = span.innerHTML.match(/id=([0-9]+)/)[1];

                            var arr = [false,pid,'day','month','hour','minutes'];

                            arr = extractDateTime(arr,span.innerHTML);

                            var threadread = true;
		
                            var matches = data_threads.match(new RegExp('\#' + thread_id + '\.([0-9]+)\.([0-9]+)-([0-9]+).([0-9]+):([0-9]+)\#'));
                            if(!matches) {
                                // Pattern: #tid.pid.day-month.hour:minutes#
                                if(data_threads[data_threads.length-1] == '#') {
                                    data_threads += thread_id + '.' + arr[1] + '.' + arr[2] + '-' + arr[3] + '.' + arr[4] + ':' + arr[5] + '#';
                                }
                                else {
                                    data_threads += '#' + thread_id + '.' + arr[1] + '.' + arr[2] + '-' + arr[3] + '.' + arr[4] + ':' + arr[5] + '#';
                                }

                            }
                            else {
                                arr[0] = matches[0];
		
                                if(!arr.compare(matches)) {
                                    // Delete old Entry:
                                    data_threads = data_threads.replace(new RegExp('\#' + thread_id + '\.([0-9]+)\.([0-9]+)-([0-9]+).([0-9]+):([0-9]+)\#'),'#');	
			
                                    // Pattern: #tid.pid.day-month.hour:minutes#
                                    if(data_threads[data_threads.length-1] == '#') {
                                        data_threads += thread_id + '.' + arr[1] + '.' + arr[2] + '-' + arr[3] + '.' + arr[4] + ':' + arr[5] + '#';
                                    }
                                    else {
                                        data_threads += '#' + thread_id + '.' + arr[1] + '.' + arr[2] + '-' + arr[3] + '.' + arr[4] + ':' + arr[5] + '#';
                                    }
                                }
                            }
                            storage.setValue("ds_dualforum_threads", data_threads);		
	
                        }

                        // we dont need to check it again
                        delete(redPosts[i]);					
                    }	 
                }
	
                if(data_posts !== -1)
                    storage.setValue("ds_dualforum_posts", data_posts);
            },300);
        }

	
    }



    // Handle Forum
    else if (document.location.href.match("screen=view_forum&forum_id=") || document.location.href.match(/forum\.php\?$/)) {

        // Threads
        var vis = document.getElementsByClassName("vis");
        var tds = vis[0].getElementsByTagName("td");

        var data_threads = storage.getValue("ds_dualforum_threads");
        data_threads = data_threads?data_threads:'';

        for(var i = 0; i < tds.length; i++) {
            if(!tds[i].getElementsByTagName('a')[0] || tds[i].getElementsByTagName('a')[0].href.indexOf('thread_id=') == -1) {
                continue;
            }

            var thread_id = tds[i].getElementsByTagName('a')[0].href.match(/thread_id=([0-9]+)/)[1];

            var hasread = true;
            // Pattern: #tid.pid.day-month.hour:minutes#
            var matches = data_threads.match(new RegExp('\#' + thread_id + '\.([0-9]+)\.([0-9]+)-([0-9]+).([0-9]+):([0-9]+)\#'));

            if(!matches) {
                hasread = false;
            }
            else {
                var pid = tds[i+2].innerHTML.match(/id=([0-9]+)/)[1];

                var arr    = [matches[0],pid,'day','month','hour','minutes'];

                arr = extractDateTime(arr,tds[i+2].innerHTML);
		
			
                if(arr.compare(matches)) {
                    hasread = true;
                }
                else {
                    hasread = false;
                }
            }

            var img = document.createElement("img");
            img.src = (hasread) ? green_threads : red_threads;
            tds[i].insertBefore(img,tds[i].firstChild);
        }

        // Mark Forum read
        var img = document.createElement("img");
        img.src = blue_markread;
        img.alt = 'جميـع الموآضيع في المنتدى مقروءة';
        img.title = img.alt;
        img.addEventListener('click',markForumRead,false);

        var th = vis[0].getElementsByTagName('th')[0];
        th.insertBefore(document.createTextNode(' '),th.firstChild);
        th.insertBefore(img,th.firstChild);
    }

    if(document.location.href.match(/forum\.php/)) {
        var a = document.createElement("a");
        a.href = '#';
        a.appendChild(document.createTextNode('من تعـريب اخوكـم الملوك-xXxMAXxXx'));
        a.align = 'center';
        a.addEventListener('click',show_settings,false);
    
        var p = document.createElement("p");
        p.align = 'center';
        p.appendChild(a);
        document.body.appendChild(p);
    }

}