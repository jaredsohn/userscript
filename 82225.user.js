// ==UserScript==
// @name           Test ADD
// @author         EMWI
// @description     ADD ALL
// ==/UserScript==

/* Changes
    1.03    Change the url we're looking for in the worker window
            Only use IDs when clicking the X to add to skip list
    1.02    Continue on errors after just a couple tries
    1.01    Added link to add non-mafia player to skip list
*/
javascript:(//)
    function () {
        var version='AddAll 1.03',
            last_url = null,
            app_url = 'http://apps.facebook.com/inthemafia/',
            add_url = app_url + 'status_invite.php?from=',
            recruit_url = app_url + 'index.php?xw_controller=recruit&xw_action=view&xw_city',
            mw_url = app_url + 'index.php?xw_controller=stats&xw_action=view&user=',
            fb_url = 'http://www.facebook.com/profile.php?id=',
            friends_added = 0,
            friends = null,
            first = true,
            wait = 0,
            skip = "",
            skiplist = "",
            mwtools_div = $('mwtools'),
            mwtools_win,
            inter, timer,
            running_html =
                '<style type="text/css">'+
                    '.messages img{margin:0 3px}'+
                    '.messages iframe{border:0;visibility:hidden}'+
                    '#pl{display:none}'+
                '</style>'+
                '<table class="messages">'+
                    '<tr>'+
                        '<td width="20%"><a href="http://vern.com/mwtools/">Vern\'s MW Tools</a></td>'+
                        '<td class="title">'+version+'</td>'+
                        '<td style="text-align:right">'+
                            '<a href="#" id="pa"><img src="http://vern.com/mwtools/pa.gif" alt="" title="Pause" width="14" height="14"></a>'+
                            '<a href="#" id="pl"><img src="http://vern.com/mwtools/pl.gif" alt="" title="Play" width="14" height="14"></a>'+
                            '<a href="#" id="cl"><img src="http://vern.com/mwtools/cl.gif" alt="" title="Close" width="14" height="14"></a>'+
                            '<form name="mwtform">'+
                                '<input type="hidden" name="go" id="go" value="1">'+
                            '</form>'+
                        '</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td valign="top">Friends Added:</td>'+
                        '<td id="friends_added"></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td valign="top">Friends to try:</td>'+
                        '<td id="friends_left" colspan="2"></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td valign="top">Status:</td>'+
                        '<td id="status" colspan="2"></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td valign="top">Log:</td>'+
                        '<td id="log" colspan="2"></td>'+
                    '</tr>'+
                '</table>',
            config_html;
        wait = MWT.readCookie('mwtaa_wait');
        skip = MWT.readCookie('mwtaa_skip');
        if (wait) wait=wait.replace(/[^0-9]/g,'');
        if (skip) skip=skip.replace(/\\n/g,"\n");
        if ((wait == null) || (wait.length == 0)) wait = 0;
        if ((skip == null) || (skip.length == 0)) skip = "";
        config_html =
            '<style type="text/css">'+
                '.messages img{margin:0 3px}'+
                '.instructions{color:#999}'+
            '</style>'+
            '<form name="mwtform">'+
                '<input type="hidden" name="go" id="go" value="1">'+
                '<table class="messages">'+
                    '<tr>'+
                        '<td colspan="3" class="title" width="66%">'+version+' Configuration</td>'+
                        '<td style="text-align:right;font-size:0.8em">'+
                            '<a href="http://vern.com/mwtools/">Vern\'s MW Tools</a>'+
                            '<a href="#" id="cl"><img src="http://vern.com/mwtools/cl.gif" title="Close" width="14" height="14"></a>'+
                        '</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td width="12%">Wait: </td>'+
                        '<td width="10%">'+
                            '<input type="text" name="wait" id="wait" size="6" value="'+wait+'">'+
                        '</td>'+
                        '<td colspan="2"> The delay between requests in seconds.</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>Skip List:</td>'+
                        '<td colspan="3"><textarea name="skip" id="skip" class="instructions" rows="10" cols="50">'+
                            'Enter in this box a list of your friends that '+
                            'you do not wish to add (maybe because they do '+
                            'not play).\n'+
                            'Enter an ID and (optional) Name, one per line.\n'+
                            'Lines that do not begin with a number will be discareded.\n'+
                            '\n'+
                            'Examples:\n'+
                            '2342442345,Bob Dobolina\n'+
                            '1478921278 Joe Cool\n'+
                            '7898798343\n'+
                        '</textarea></td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td></td>'+
                        '<td>'+
                            '<a class="sexy_button" id="start">Start</a>'+
                        '</td>'+
                    '</tr>'+
                '</table>'+
            '</form>';


        mwtools_div.innerHTML = config_html;
        $("cl").onclick=function(e) { // close
            $("app10979261223_content_row").removeChild($("mwtools"));
            return false;
        }
        if (skip && skip.length>0) {
            $("skip").value = skip;
            $("skip").style.color="#000";
        } else {
            $("skip").onfocus=function(e) {
                $("skip").value="";
                $("skip").style.color="#000";
                $("skip").onfocus=null;
            }
        }
        $("start").onclick=function(e) {
            var i,m;
            wait = document.mwtform.wait.value;
            skip = document.mwtform.skip.value;
            skip = skip.replace(/\n/g,"\\n");
            if (/^Enter in this box/.test(skip)) { skip = ""; }
            MWT.createCookie("mwtaa_wait",wait);
            MWT.createCookie("mwtaa_skip",skip);
            skiplist=",";
            for (i=0; i<skip.split("\\n").length; i++) {
                if (m=/^([0-9]+)/.exec(skip.split("\\n")[i])) {
                    skiplist+=m[1]+",";
                }
            }
            // Replace config page with running page
            mwtools_div.innerHTML=running_html;
            $("pl").style.display = "none";
            $("cl").onclick=function(e) { // close
                try { mwtools_win.close(); } catch(err) { }
                $("app10979261223_content_row").removeChild($("mwtools"));
                return false;
            }
            $("pa").onclick=function(e) { // pause
                document.mwtform.go.value = 0;
                $("pa").style.display = 'none';
                $("pl").style.display = 'inline';
                return false;
            }
            $("pl").onclick=function(e) { // play
                document.mwtform.go.value = 1;
                $("pl").style.display = 'none';
                $("pa").style.display = 'inline';
                MWT.status('Resuming: ' + MWT.resume_msg);
                winRequest(worker_loaded,last_url);
                return false;
            }
            MWT.log('Found ' + friends.length + ' friends not yet in your mafia');
            request_next();
            return false;
        }

        function extra_status() {
            $('friends_added').innerHTML = friends_added;
            $('friends_left').innerHTML = friends.length;
        }

        function fblink() {
            return '<a href="' + fb_url + friends[0].id + '">' + friends[0].name + '</a>';
        }

        function mwlink(s) {
            return '<a href="' + mw_url + friends[0].id + '">' + s + '</a>';
        }

        function skiplink() {
            return '<a href="#" onclick="'+
                'var skip = MWT.readCookie(\'mwtaa_skip\');'+
                'skip+=\'\\\\n'+friends[0].id+'\';'+
                'MWT.createCookie(\'mwtaa_skip\',skip);'+
                'this.style.display=\'none\';'+
                'return false;">'+
                '<img src="http://vern.com/mwtools/cl.gif" '+
                'width="14" height="14" title="Add '+friends[0].id+
                ' to the Skip List"></a>';
        }

        function winRequest(doOnLoad,url) {
            if (document.mwtform.go.value == 1) {
                timer = setTimeout(function(){//)
                    MWT.log("Error: Cannot get response from worker window.");
                    clearInterval(inter);
                },60000);
                inter = setInterval(function() {//)
                    try {
                        if (new RegExp(app_url).test(mwtools_win.location)) {
                            mwtools_win.onload=doOnLoad;
                        }
                    }
                    catch(err) { }
                },500);
                // close the win before opening a new one
                //try { mwtools_win.close(); } catch(err) { }
                //mwtools_win=window.open(url,"mwtools_win","width=1,height=1,toolbar=0,directories=0,menubar=0,scrollbars=1,resizable=1");
                mwtools_win=window.open(url,"mwtools_win","width=1,height=1,toolbar=0,directories=0,menubar=0,scrollbars=1,resizable=1");
            } else {
                MWT.resume_msg=$("status").innerHTML;
                MWT.status("Paused");
            }
            return url;
        }

        function winRetry(tries,message,doOnLoad,url) {
            if (MWT.retries>tries) {
                MWT.status(message+'; not retrying, skipping '+fblink()+'.');
                MWT.retries = 0;
                friends = friends.slice(1);
                request_next();
            } else {
                setTimeout(function(){
                    MWT.retries++;
                    MWT.log(message+'; retry #'+MWT.retries+'...');
                    winRequest(doOnLoad,url);
                },3000);
            }
        }

        function request_next() {
            function f () {
                MWT.status('Adding ' + fblink() + '...',extra_status);
                last_url=winRequest(worker_loaded,add_url+friends[0].id);
            }
            if (friends.length > 0) {
                if (new RegExp(","+friends[0].id+",").test(skiplist)) {
                    MWT.log("Skipped "+fblink()+".");
                    friends = friends.slice(1);
                    request_next();
                    return;
                }
                if (first || wait == 0) {
                    first = false;
                    f();
                } else {
                    MWT.pausing(wait,f);
                }
            } else {
                try { mwtools_win.close(); } catch(err) { }
                MWT.status('All done',extra_status);
                MWT.log('');
            }
        }

        function worker_loaded(e) {
            // clear the timers
            clearInterval(inter);
            clearTimeout(timer);

            e=e||window.event;
            var m=[], s;
            try {
                s = e.currentTarget.document.getElementById("app10979261223_inner_page").innerHTML;
            }
            catch(err) {
                s = e.currentTarget.document.body.innerHTML;
            }
            if (m = /You have added (.*?) to your mafia/.exec(s)) {
                friends_added++;
                MWT.log('Added '+fblink()+' AKA '+mwlink(m[1])+'.');
            } else if (m = /You are already part of (.*?)\'s mafia/.exec(s)) {
                MWT.log('Already added '+fblink()+' AKA '+mwlink(m[1])+'.');
            } else if (/Error while loading page/.test(s)) {
                MWT.pausing(20,'Mafia Wars is having problems',
                    function(){winRequest(worker_loaded,last_url);});
            } else if (/app10979261223/.test(s)) {
                MWT.log(friends[0].id+" "+fblink()+' does not seem to play Mafia Wars. '+skiplink());
            } else {
                winRetry(2,'Unknown response',worker_loaded,last_url);
                return;
            }

            MWT.retries = 0;
            friends = friends.slice(1);
            request_next();
        }

        function begin() {
            var xpath = "//div[@class='unselected_list']//label[@class='clearfix']",
                results = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
                i = 0,
                res;
            friends = [];
            while ((res = results.snapshotItem(i)) != null) {
                friends[friends.length] = {'id': res.firstChild.value, 'name': res.lastChild.innerHTML};
                //  console.log('ID:   ' + res.firstChild.value);
                //  console.log('Name: ' + res.lastChild.innerHTML);
                i++;
            }
            if (i == 0) {
                mwtools_div.innerHTML=running_html;
                $("cl").onclick=function(e) { // close
                    $("app10979261223_content_row").removeChild($("mwtools"));
                    return false;
                }
                $("pl").style.display = 'none';
                $("pa").style.display = 'none';

                MWT.status('I can\'t find any friends to add.  Did you run this bookmarklet from <a href="' + recruit_url + '">the recruit page</a>?');
            }
            //    MWT.log('Got friend list');
        }

        //status('Getting friend list');
        //request(recruit_url);

        begin();

    } ()
