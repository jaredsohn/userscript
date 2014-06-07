// ==UserScript==
// @name       Auto mute for Plurk
// @version    0.6
// @description  Auto mute Plurk by keyword.
// @include    http://www.plurk.com/*
// @copyright  2011+, Skyer
// @author     Skyer
// Reference : http://userscripts.org/scripts/review/112835
// ver 0.1 (2011/9/16)  * First version.
// ver 0.2 (2011/9/17)  * Add FireFox support.
// ver 0.3 (2011/9/20)  * Support account name for the keyword. Ex: http://www.plurk.com/off60, you can assign off60 for blockList item.
// ver 0.4 (2011/11/01) * Change to Safari extension format. Remove blockList. It will be added outside.
// ver 0.5 (2011/11/04) * Fix error in FF && Chrome
// ver 0.6 (2011/11/05) * Add UI in Plurk. Click Muter in Plurk title to show setting.
// ==/UserScript==

(function(){
var jq = document.createElement('script');
jq.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js'; //https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(jq);
})();

var myWindow = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;

function waitJQ() {
    if(typeof myWindow.jQuery == 'undefined') {
        myWindow.setTimeout(waitJQ,100);
    } else {
        myWindow.jq = myWindow.jQuery.noConflict(true);
        myWindow.signread = false;
        myWindow.mutesetting = undefined;
        injectMuter(myWindow.jq);
    }
}

waitJQ();

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

function injectMuter($) {
    $('#top_bar td').append('<a id="plurkmuter" href="#" class="item">Muter</a>');
    $('#plurkmuter').click(function(){
        myWindow.jq('#mutersetting').css('display', '');
    });
    $('body').append(
        '<script type="text/javascript">function closeSetting(){window.jq(\'#mutersetting\').css({\'display\':\'none\'});}' +
        '   function updateSetting() {var list = document.getElementById("keywords"); var setting = ""; for (var i=0; i<list.length; ++i) { setting = setting + "," + list.options[i].text; } if (setting.length > 0) setting = setting.substring(1, setting.length); window.mutersetting = setting; window.signread = true;}' +
        '   function onAddClick() {var list = document.getElementById("keywords"); var input = document.getElementById("keyword"); var option = document.createElement("option"); option.text = input.value; list.add(option, null); updateSetting();}' +
        '   function onDelClick() {var list = document.getElementById("keywords"); var index = list.selectedIndex; if (index == -1) return; list.remove(index); updateSetting();} ' +
        '</script>' +
        '<div id="mutersetting" style="color: #000000; position:absolute; top:100px; left:100px; background-color:#FFFFFF; width: 500px; height: 300px; z-index: 5000; overflow: auto; display: none;">' +
        '<p>Auto mute plurk keywords</p>' +
        '<form>' +
        'Keyword: <input name="keyword" id="keyword" /> <button name="add" id="add" type="button" onClick="onAddClick();">Add</button>' +
        '<button name="delkey" id="delkeys" type="button" onClick="onDelClick();">Delete</button><br>' +
        '<select name="keywords" id="keywords" multiple="multiple" size="10" width="300" style="width: 300px;"></select> <br>' +
        '<p>&nbsp;&nbsp;&nbsp;&nbsp;by Skyer 2011</p>' +
        '<button name="close" id="close" type="button" onClick="closeSetting()">Close</button>' +
        '</form>' +
        '</div>');
    console.log('Get Setting: ' + GM_getValue('mutersetting'));
    fetchKeywords(GM_getValue('mutersetting'), true);
    window.setTimeout(doRTE, 100, $);
}

function doRTE($) {
    if (myWindow.signread == true) {
        var setting = myWindow.mutersetting;
        myWindow.signread = false;
        console.log('MuterSetting: ' + setting);
        GM_setValue("mutersetting", setting);
        fetchKeywords(setting, false);
    }

    var blockList = typeof outSideBlockList == 'undefined' ? undefined : outSideBlockList;
    if (typeof blockList == 'undefined') {
        myWindow.setTimeout(doRTE, 2000, $);
        return;
    }


        // No need to set blockList here. It will be set outside.
        //Add custom keywords and user id here!
        //在下面依照格式加入你想過濾的關鍵字或者帳號
        //console.log('blocklist: ' + blockList);
        // if (blockList == undefined) {
        //     blockList = [
        //         'TW_nextmedia', //蘋果日報
        //         'cwyuni',       //酪梨壽司
        //         'off60',        //四小折 
        //         'FuniPhone',    //Fun iPhone
        //         'wan_wan',      //彎彎~
        //         'alvin',        //alvin
        //         'Jojam',        //就醬
        //         'giddens',      //一直說不客氣不客氣的九把刀
        //         'jcms',         //吉米丘
        //     ];
        // }

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
        
    //    console.log('Plurk cnt: ' + $('.plurk').length);
        if ($('.plurk')) {
        $('.plurk').each(function() {
            var me = $(this);
            var plurk = me.get(0).id.match( /p(\d+)/ );
            if (plurk) {
                var plurk_id = plurk[1];
                var nameObj = me.find('.name');
                var urlName = nameObj.attr('href');
                var textName = nameObj.html();
                var muted = me.get(0).className;
    //            console.log('Text: ' + text + ", M: " + muted); 
                if ( (do_match( urlName ) || do_match( textName )) && !muted.match('muted')) {
                    console.log('Mute ' + plurk_id + ', ' + textName + " (" + urlName + ")");
                    set_mute( plurk_id , 2 );
                    me.addClass('muted');
                    myWindow.PlurkMetaData.muted[plurk_id] = true;
                    myWindow.$plurks['p'+plurk_id].obj.is_unread = 2;
                }
            }
        });
        }
            
        window.setTimeout(doRTE, 2000, $);
}