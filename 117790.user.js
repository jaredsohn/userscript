// ------------------------------------------------------
// Global variables
// ------------------------------------------------------

// ==UserScript==
// @name        Mafia測試中文化
// @description 社團訊息及常用的LINK
// @namespace   Mw 黑幫
// @version 0.1.0.1 
// @include     http://www.facebook.com/*
// @exclude     http://apps.facebook.com/*
// @exclude     http://www.facebook.com/extern/*
// @exclude     http://www.facebook.com/connect/*
// @exclude     http://www.facebook.com/plugins/*
// @exclude     http://www.facebook.com/login.php*
// @exclude     http://facebook.mafiawars.com/mwfb/*
// ==/UserScript==

var version         : '0.6.0.2 ≋TGMW≋',
    name            : 'FB MafiaWars Addon',
    tag             : 'FBMafiaWarsAddon_',
    url             : 'http://userscripts.org/scripts/show/105612',
    meta_url        : 'http://userscripts.org/scripts/source/105612.meta.js',
    plugin_url      : 'http://dascript.bravehost.com/MafiaWars/chrome/FBMWAddonPlugin.crx',
    check_interval  : 4,
    chrome_plugin   : 'llfmkjppmncfcgdebajkjnopgodlcaoe' 
};

var scriptAppInfo2 = {
        appUnframe: 'http://facebook.mafiawars.zynga.com/mwfb/index.php?skip_req_frame=1&mwcom=1'
};
    //var defaultRootMenu = [
        {name:'<center><div style="color: orange;">CONFIGURATION</center></div>',            'click': Configuration                                  }, 
        {name:'-',                                                                                                 'line' : true             },
        {name:'<center><div style="color: green;">韓舍 <img src="http://mwfb.static.zgncdn.com/mwfb/graphics/clan_chat/clantools_chat_greennotif_sm.png" height=14 /></center></div>',        'click': FanPage,        'main': true               },
        {name:'<center><div style="color: green;">韓舍禮物分享區 <img src="http://mwfb.static.zgncdn.com/mwfb/graphics/clan_chat/clantools_chat_greennotif_sm.png" height=14 /></center></div>',        'click': EMI,        'main': true               },
        {name:'-',                        'line' : true                                      },
        {name:'<img src="http://userscripts.org/images/script_icon.png" height=16 /> 每日E-mail Bonus',        'click': DailyBonus,        'main': true               },
        {name:'<img src="http://userscripts.org/images/script_icon.png" height=16 /> 快速補血',          'click': QuickHealer                                    },
        {name:'<img src="http://userscripts.org/images/script_icon.png" height=16 /> UN-FRAME MW',          'click': unframe                             },
        {name:'<img src="http://userscripts.org/images/script_icon.png" height=16 />家族打王',          'click': BossFight                             },
        {name:'<img src="http://userscripts.org/images/script_icon.png" height=16 /> Assassin-a-Nator',          'click': AssassinANator                                    },
        {name:'<img src="http://userscripts.org/images/script_icon.png" height=16 /> 搶劫',          'click': RobberBGBeta                                    },
        {name:'<img src="http://userscripts.org/images/script_icon.png" height=16 /> 刷 Job',          'click': RepeatJob                                    },
        {name:'<img src="http://userscripts.org/images/script_icon.png" height=16 />刷Job 巴西.芝加哥',          'click': RJB                                    },
        {name:'<img src="http://userscripts.org/images/script_icon.png" height=16 />送禮',          'click': Chucker                                    }
    ];

// initial ui element
$("#inner_page").before( '<table id="c2_win" class="messages" style="margin-bottom: 5px;"><tbody>'
  +'<tr><td class="message_body" colspan="5">Ice Maker  (多分頁版)</td></tr>'
  +'<tr>'
  +'  <td style="width:100px;">Status: </td>'
  +'  <td><span id="c2_field_status"></span></td>'
  +'  <td style="width:170px; align: right;">'
  +'    <a id="c2_btn_startstop" class="sexy_button_new medium white"><span><span id="c2_field_ststop">-</span></span></a>'
  +'    <a id="c2_btn_close"     class="sexy_button_new medium white"><span><span>Close</span></span></a>'
  +'  </td>'
  +'</tr>'
  +'<tr>'
  +'  <td>Client Spool: </td>'
  +'  <td><span id="c2_field_client"></span></td>'
  +'  <td style="width:170px; align: right;">'
  +'    <a id="c2_btn_addclient" class="sexy_button_new medium white"><span><span>Add Client</span></span></a>'
  +'  </td>'
  +'</tr>'
  +'<tr>'
  +'  <td colspan="3">Log:<br />'
  +'    <textarea id="c2_field_log" rows="15" style="vertical-align:top; width:95%; background-color:black; color:white; white-space:nowrap; overflow:scroll; overflow-x:scroll; overflow-y:scroll;"></textarea>'
  +'  </td>'
  +'</tr>'
  +'</tbody></table>' );
    return false;
})();