// ==UserScript==
// @name       Plurk Helper
// @version    0.13
// @description  Plurk helper functions to enhance web Plurk UI.
// @include    http://www.plurk.com/*
// @copyright  2011+, Skyer
// @author     Skyer
// Reference : http://userscripts.org/scripts/review/112835
// ver 0.1  (2011/9/16)  * First version.
// ver 0.2  (2011/9/17)  * Add FireFox support.
// ver 0.3  (2011/9/20)  * Support account name for the keyword. Ex: http://www.plurk.com/off60, you can assign off60 for blockList item.
// ver 0.4  (2011/11/01) * Change to Safari extension format. Remove blockList. It will be added outside.
// ver 0.5  (2011/11/04) * Fix error in FF && Chrome
// ver 0.6  (2011/11/05) * Add UI in Plurk. Click Muter in Plurk title to show setting.
// ver 0.7  (2011/11/09) * Name changed. Add Favor function. You can add plurk to favor. The favor is saving in local, and is different than like for Plurk function.
// ver 0.8  (2011/11/09) * The mute will auto refresh to unmute. Fix javascript error.
// ver 0.9  (2011/11/15) * Add import/export. Change some code flow.
// ver 0.10 (2011/11/17) * Add delete favor in settings. Change to use localStorage.
// ver 0.11 (2011/11/17) * Fix JS error in Chrome.
// ver 0.12 (2012/6/05)  * Fix JS error in Chrome. ($dp not found)
// ver 0.13 (2012/7/18)  * Add: Search keyword in Plurk text. Now keyword searching will apply in Name, ID, Text.
// ==/UserScript==

ver = "V13";

myWindow = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;

(function(){
    if (window.top === window) {
        var css = document.createElement('link');
        css.href = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/base/jquery-ui.css';
        css.type = 'text/css';
        css.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(css);
        onJQCSSLoaded();
    }
})();

function onJQCSSLoaded() {
    var jq = document.createElement('script');
    jq.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.js';
    jq.addEventListener('load', onJQLoaded, true);
    document.getElementsByTagName('head')[0].appendChild(jq);    
}

function onJQLoaded() {
    // Patch the jQuery function to avoid js error in Plurk.
    // Plurk overwrite the nodeName property to a function in window.
    myWindow.jQuery.acceptData = function(elem) {
        if ( elem.nodeName ) {
            var jq = typeof myWindow.jq != 'undefined' ? myWindow.jq : myWindow.jQuery;
            var match = typeof elem.nodeName != 'string' ? false : jq.noData[ elem.nodeName.toLowerCase() ];

            if ( match ) {
                return !(match === true || elem.getAttribute("classid") !== match);
            }
        }

        return true;
    }

    var jq = document.createElement('script');
    jq.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.js';
    jq.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(jq);
    jq.addEventListener("load", onJQUILoaded, true);
}

function onJQUILoaded() {
    myWindow.jq = myWindow.jQuery.noConflict(true);

    globalsetting = undefined;
    
    try {
        globalsetting = JSON.parse(localStorage.gmgetsetting);
    } catch (e) {
        ;
    }
    
    if (globalsetting == undefined)
        globalsetting = {};

    injectMuter(myWindow.jq);
    myWindow.setTimeout(doRTE, 100, myWindow.jq);        
}

function updateLocalStorage() {
    localStorage.gmgetsetting = JSON.stringify(globalsetting);
}

GM_getValue = function(key) {
    return globalsetting[key];
};

GM_setValue = function(key, value) {
    globalsetting[key] = value;
    updateLocalStorage();
};

function fetchKeywords(keyword, ui) {
    if (typeof keyword == 'undefined' || keyword.length <= 0) return;
    var arr = keyword.split(",");
    var list = document.getElementById("keywords");
    outSideBlockList = [];
    for (var i=0; i<arr.length; ++i) {
        if (arr[i].length > 0) {
            if (ui) {
                var option = document.createElement("option");
                option.text = arr[i];
                list.add(option, null);
            }
            outSideBlockList.push(arr[i]);
        }
    }
}

function initFavorList(favor) {
    if (typeof favor == 'undefined' || favor.length == 0) {
        favorcontainer = {};
        return;
    }

    favor = unescape(favor);
    favorcontainer = JSON.parse(favor);
    myWindow.jq('div#tab2 tbody tr').detach();
    var tbody = myWindow.jq('div#tab2 tbody');
    var i = 0;
    for (var k in favorcontainer) {
        var item = favorcontainer[k];
        var twiclass = (i++) % 2 ? 'twilight1' : 'twilight2';
        tbody.append('<tr class="'+twiclass+'"><td align="left">'+item.name+'</td><td><a target="_blank" href="'+item.link+'">'+item.text+'</a></td><td align="right"><a href="#" id="delFavor_'+k+'">X</a></td></tr>');
    }    

    myWindow.jq('#tab2 a[id*=delFavor]').click(function(){
        var id = myWindow.jq(this).attr('id').split('_')[1];
        delete favorcontainer[id];
        initFavorList(escape(JSON.stringify(favorcontainer)));
        updateFavor();
        updateLocalStorage();
    });
}

function updateFavor() {
    GM_setValue('favor', escape(JSON.stringify(favorcontainer)));
}

function getEncodedId(id) {
    return (parseInt(id.substring(1, id.length), 10)).toString(36);
}

function updateSetting() {
    var list = document.getElementById("keywords"); 
    var setting = ""; 
    for (var i=0; i<list.length; ++i) { 
        setting = setting + "," + list.options[i].text; 
    } 
    if (setting.length > 0) 
        setting = setting.substring(1, setting.length); 
    GM_setValue('mutersetting', setting);
}

function initEventListener() {
    var $ = myWindow.jq;
    $('button#add').click(function(){
        var list = document.getElementById("keywords"); 
        var input = document.getElementById("keyword"); 
        var option = document.createElement("option"); 
        option.text = input.value; 
        list.add(option, null); 
        updateSetting();
    });
    $('button#delkeys').click(function(){
        var list = document.getElementById("keywords"); 
        var index = list.selectedIndex; 
        if (index == -1) return; 
        list.remove(index); 
        updateSetting(); 
    });
    $('button#close').click(function(){
        myWindow.jq('#shelpersetting').css({'display':'none'});
    });

    $('#plurkmuter').click(function(){
        $('#mutertab').tabs();
        myWindow.jq('#shelpersetting').css('display', '');
    });

    $('#clearFavor').click(function() {
        favorcontainer = {};
        $('div#tab2 tbody tr').detach(); 
        updateFavor();
    });

    $('button#edit').click(function() {
        var result = window.prompt("Export / Import helper settings.", JSON.stringify(globalsetting));
        var parsed = undefined;
        try {
            parsed = JSON.parse(result);
        } catch (exception) {
            parsed = undefined;
        }

        if (typeof parsed != 'undefined') {
            globalsetting = parsed;
            updateLocalStorage();
        }
    });
}

function hackPlurk() {
    var $ = myWindow.jq;
    myWindow.renderManagerOrig = myWindow.Plurks._renderManager;
    myWindow.Plurks._renderManager = function(a) {
        myWindow.renderManagerOrig(a);

        var id = getEncodedId(myWindow.$dp.hover_div.id);
        var heart = (id in favorcontainer) ? '♥' : '♡';
        $('.manager').append('<a id="pfavor" href="#" class="action">'+heart+'Favor</a>');
        $('#pfavor').click(function() {
            var cdiv = myWindow.$dp.hover_div;
            var id = getEncodedId(cdiv.id);

            if (id in favorcontainer) {
                delete favorcontainer[id];
                initFavorList(escape(JSON.stringify(favorcontainer)));
                $('.manager a#pfavor').text('♡Favor');
            } else {
                var link = 'http://www.plurk.com/p/'+id;
                var name = $('div#'+cdiv.id+' a.name').text();
                var text = $('div#'+cdiv.id+' div.text_holder').text();
                var item = {'link':link, 'name':name, 'text':text};
                favorcontainer[id] = item;
                $('.manager a#pfavor').text('♥Favor');
                initFavorList(escape(JSON.stringify(favorcontainer)));
            }

            setTimeout(function(){
                updateFavor();
            }, 100);

            return false;
        });
    };
}

function injectMuter($) {
    $('#top_bar td').append('<a id="plurkmuter" href="#" class="item">SHelper'+ver+'</a>');
    $('head').append('<style>.twilight1 {background-color: #FFFFFF;} .twilight2 {background-color: #EEEEEE;}</style>');
    $('body').append(
        '<div id="shelpersetting" style="color: #000000; position:absolute; top:100px; left:100px; background-color:#FFFFFF; width: 500px; height: 400px; z-index: 5000; display: none;">' +
        '<div id="mutertab" style="height:350px; overflow: auto; ">' +
        '<ul><li><a href="#mutersetting"><span>Muter</span></a></li>' +
        '<li><a href="#tab2"><span>Favor</span></a></li></ul>' +
        '<div id="mutersetting">' +
        '<p>Auto mute plurks with matched keywords</p>' +
        '<form>' +
        'Keyword: <input name="keyword" id="keyword" /> <button name="add" id="add" type="button">Add</button>' +
        '<button name="delkey" id="delkeys" type="button">Delete</button><br>' +
        '<select name="keywords" id="keywords" multiple="multiple" size="10" width="300" style="width: 300px;"></select> <br>' +
        '</form>' +
        '</div>' + 
        '<div id="tab2">' +
        '<table><thead><tr><th width="100px">Name</th><th width="350px">Title</th><th></th>&nbsp;</tr></thead><tbody></tbody></table>' +
        '<br><button id="clearFavor" type="button">Clear</button>' +
        '</div>' +
        '</div>' +
        '<button name="close" id="close" type="button">Close</button>' +
        '<button id="edit" type="button">Export/Import</button>' +
        '&nbsp;&nbsp;&nbsp;&nbsp;by Skyer 2011' +
        '</div>');

    initEventListener();

    hackPlurk();

    fetchKeywords(GM_getValue('mutersetting'), true);
    initFavorList(GM_getValue('favor'));
}

function doRTE($) {
    var blockList = typeof outSideBlockList == 'undefined' ? undefined : outSideBlockList;
    if (typeof blockList == 'undefined') {
        myWindow.setTimeout(doRTE, 2000, $);
        return;
    }

    function do_match(text) {
        for (k=0;k<=blockList.length;k++) {
            var keyword = blockList[ k ];
            var r = text && text.match( keyword ); // XXX: rule here.
            if( r && r[0].length > 0) {
                // console.debug( 'match:' , r);
                return 1;
            }
        }
        return 0;
    }
        
    function set_mute(pid,v) {
        $.ajax({
            type: "POST",
            url: "/TimeLine/setMutePlurk",
            data: "plurk_id=" + pid + "&value=" + v,
            success: function(msg){
                console.log( "muted: " + pid + ", " + msg  );
            }
        });
    }
        
    if ($('.plurk')) {
        $('.plurk').each(function() {
            var me = $(this);
            var plurk = me.get(0).id.match( /p(\d+)/ );
            if (plurk) {
                var plurk_id = plurk[1];
                var nameObj = me.find('.name');
                var titleObj = me.find('.text_holder');
                var urlName = nameObj.attr('href');
                var textName = nameObj.html();
                var title = titleObj.html();
                var muted = me.get(0).className;
                if ( (do_match( urlName ) || do_match( textName ) || do_match(title)) && !muted.match('muted')) {
                    console.log('Mute ' + plurk_id + ', ' + textName + " (" + urlName + ")");
                    set_mute( plurk_id , 2 );
                    me.addClass('muted');
                    myWindow.$dp.mute_link.innerText = myWindow._('unmute');
                    myWindow.PlurkMetaData.muted[plurk_id] = true;
                    myWindow.$plurks['p'+plurk_id].obj.is_unread = 2;
                }
            }
        });
    }
            
    window.setTimeout(doRTE, 2000, $);
}