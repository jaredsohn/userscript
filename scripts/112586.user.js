// vim:foldmethod=marker
// ==UserScript==
// @name           sengokuixa-moko
// @description    戦国IXA用ツール（Firefox + Greasemonkey or Scriptish用） ver 1.8.6.216.20110904
// @version        1.8.6.216.20110904
// @namespace      sengokuixa-ponpoko
// @author         w24.mouri.ne1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @include        http://*.sengokuixa.jp/*
// @match          http://*.sengokuixa.jp/*
// ==/UserScript==

// http://www1.ocn.ne.jp/~hatt/3gkb/
// ↑を参考にしました。

/*
* 2011.09.04
*   + 地図: 敵拠点ダブルクリックで報告書の挙動を修正
*   + 拠点: 合戦報告書のリンクを復活
* 2011.09.03
*   + 全編成: グループアイコン右クリック時に逆順に変わらなかったのを修正。
*   + Scriptish で動作確認
* 2011.09.02
*   + プログレスバーをカウント表示可能に。
*   + 部隊の戦闘力データを表示するようにした。
*   + 新秘境一括に対応。
*   + 全解散のパフォーマンスアップ。
* 2011.09.01
*   コードベース http://jsfiddle.net/RvLb2/1/ （火狐ちらし改）
*/

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function Moko_addJQuery(callback) {
    if (typeof(unsafeWindow.tb_init)!='undefined') {tb_init = unsafeWindow.tb_init;}
    if (typeof(unsafeWindow.jQuery)!='undefined') {
        //そもそもなぜ、@requireでjQueryを読み込んでいるかというと、これを使わないと駄目な機能があるため(200枚表示など)。
        //はじめから読み込まれている1.3.2だと正規表現云々のエラーが発生する。
        //1.3.2から1.4.4まではGreasemonkeyで@requireするとエラーが発生するため、使えない。
        //ただ、1.5.2を使うようにすると、attrが動かない場合があるので以下のように。1.5.2以降で直っていると良いんだけど…

    // XXX FIX ---- BEGIN ----//{{{
    if (jQuery.fn.jquery == '1.5.2') {
      jQuery.extend({
        attrFn: {
                  val: true,
        css: true,
        html: true,
        text: true,
        data: true,
        width: true,
        height: true,
        offset: true
                },

        attr: function( elem, name, value, pass ) {
                // don't get/set attributes on text, comment and attribute nodes
                if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || elem.nodeType === 2 ) {
                  return undefined;
                }

                if ( pass && name in jQuery.attrFn ) {
                  return jQuery(elem)[name](value);
                }

                var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc( elem ),
                    // Whether we are setting (or getting)
                    set = value !== undefined;

                // Try to normalize/fix the name
                name = notxml && jQuery.props[ name ] || name;

                // Only do all the following if this is a node (faster for style)
                if ( elem.nodeType === 1 ) {
                  // These attributes require special treatment
                  var special = /^(?:href|src|style)$/.test( name );

                  // Safari mis-reports the default selected property of an option
                  // Accessing the parent's selectedIndex property fixes it
                  if ( name === "selected" && !jQuery.support.optSelected ) {
                    var parent = elem.parentNode;
                    if ( parent ) {
                      parent.selectedIndex;

                      // Make sure that it also works with optgroups, see #5701
                      if ( parent.parentNode ) {
                        parent.parentNode.selectedIndex;
                      }
                    }
                  }

                  // If applicable, access the attribute via the DOM 0 way
                  // 'in' checks fail in Blackberry 4.7 #6931
                  var elemexists = false;
                  try {
                    elemexists = (name in elem || elem[ name ] !== undefined);
                  } catch(e) {
                  }
                  if ( elemexists && notxml && !special ) {
                    if ( set ) {
                      // We can't allow the type property to be changed (since it causes problems in IE)
                      if ( name === "type" && rtype.test( elem.nodeName ) && elem.parentNode ) {
                        jQuery.error( "type property can't be changed" );
                      }

                      if ( value === null ) {
                        if ( elem.nodeType === 1 ) {
                          elem.removeAttribute( name );
                        }

                      } else {
                        elem[ name ] = value;
                      }
                    }

                    // browsers index elements by id/name on forms, give priority to attributes.
                    if ( jQuery.nodeName( elem, "form" ) && elem.getAttributeNode(name) ) {
                      return elem.getAttributeNode( name ).nodeValue;
                    }

                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    if ( name === "tabIndex" ) {
                      var attributeNode = elem.getAttributeNode( "tabIndex" );

                      return attributeNode && attributeNode.specified ?
                        attributeNode.value :
                        rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                        0 :
                        undefined;
                    }

                    return elem[ name ];
                  }

                  if ( !jQuery.support.style && notxml && name === "style" ) {
                    if ( set ) {
                      elem.style.cssText = "" + value;
                    }

                    return elem.style.cssText;
                  }

                  if ( set ) {
                    // convert the value to a string (all browsers do this but IE) see #1070
                    elem.setAttribute( name, "" + value );
                  }

                  // Ensure that missing attributes return undefined
                  // Blackberry 4.7 returns "" from getAttribute #6938
                  if ( !elem.attributes[ name ] && (elem.hasAttribute && !elem.hasAttribute( name )) ) {
                    return undefined;
                  }

                  var attr = !jQuery.support.hrefNormalized && notxml && special ?
                    // Some attributes require a special call on IE
                    elem.getAttribute( name, 2 ) :
                    elem.getAttribute( name );

                  // Non-existent attributes return null, we normalize to undefined
                  return attr === null ? undefined : attr;
                }
                // Handle everything which isn't a DOM element node
                if ( set ) {
                  elem[ name ] = value;
                }
                return elem[ name ];
              }
      });
    }
    // XXX FIX ---- END ----//}}}

        //jQuery = unsafeWindow.jQuery;
        callback(unsafeWindow.jQuery);
    }
    //else {//{{{
    //    var script = document.createElement("script");
    //    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js");
    //    script.addEventListener('load', function() {
    //        //var script2 = document.createElement("script");
    //        //script2.setAttribute("src", "http://autobahn.tablesorter.com/jquery.tablesorter.min.js");
    //        //script2.addEventListener('load', function() {
    //        var script3 = document.createElement("script");
    //        script3.textContent = "(" + callback.toString() + ")(jQuery);";
    //        document.body.appendChild(script3);
    //        //}, false);
    //        //document.body.appendChild(script2);
    //    }, false);
    //    document.body.appendChild(script);
    //    var link = document.createElement("link");
    //    link.setAttribute("rel","stylesheet");
    //    link.setAttribute("type","text/css");
    //    link.setAttribute("href","http://www.jj-midi.com/ixa-kaizou2.css");
    //    document.body.appendChild(link);
    //}//}}}
}

// the guts of this userscript
function Moko_main($) {
    var TOOL_NAME = "戦国IXA用ツール";
    var VERSION_NAME = "戦国IXA用ツール ver 1.8.6";
    var options_grp = {
        all: '全般1',all2: '全般2',chat: 'チャット',deck: '部隊',dungeon: '秘境',map: '地図',
        faci: '内政',unit: '簡易編成',sol: '兵舎',grp: 'グループ',battle: '出陣',};
    var options_param = {
        raid                   : {tag: 'all'    , caption: '敵襲の最上段表示'},
        inside_attack_view     : {tag: 'all'    , caption: '敵襲を枠内に表示'},
        tohankaku              : {tag: 'all'    , caption: 'あらゆる入力欄で全角数字を半角に強制変換'},
        sidebox_change         : {tag: 'all'    , caption: '合戦向けサイドメニュー表示'},
        timeout_countdown      : {tag: 'all'    , caption: 'タイムアウト予想時間カウントダウン'},
        pulldown_menu          : {tag: 'all'    , caption: 'メニューのプルダウン化　砦表示：'}, //add
        toride_count           : {tag: 'all'    , caption: '砦表示'},
        menu_reversal          : {tag: 'all'    , caption: 'メニューと資源バーの位置を逆転表示'},
        non_cardview           : {tag: 'all2'   , caption: 'サイドメニューのカードを非表示'},
        sort_village           : {tag: 'all2'   , caption: 'サイドメニューの所領ソート'},
        place_skip             : {tag: 'all2'   , caption: '該当文字列を含む所領を非表示にする'},
        place_skip_str         : {tag: 'all2'   , caption: 'スキップ文字列'},
        pager_ajax             : {tag: 'all2'   , caption: 'ページャーをAjaxに'},
        ad_sort                : {tag: 'all2'   , caption: '昇順降順'},
        fall_check             : {tag: 'all2'   , caption: '陥落中の表示'},
        chat_mapcood           : {tag: 'chat'   , caption: 'チャット中の座標っぽいものをリンクに'},
        chat_mikire            : {tag: 'chat'   , caption: 'チャットの見切れを修正'},
        chat_linkchg           : {tag: 'chat'   , caption: '「チャット履歴」のリンク先修正'},
        commentListEnemy       : {tag: 'chat'   , caption: 'チャットウィンドウに敵襲状況を表示'},
        toubatsu               : {tag: 'deck'   , caption: '討伐ゲージ時間表示'},
        refillhp               : {tag: 'deck'   , caption: 'HP回復時間表示'},
        def_honjou             : {tag: 'deck'   , caption: '拠点選択のデフォを本城に'},
        deck_check             : {tag: 'deck'   , caption: '拠点選択のデフォを現在の選択拠点に'},
        rank_lock              : {tag: 'deck'   , caption: '一括削除の非活性化'},    //add
        hold_butai             : {tag: 'deck'   , caption: 'お気に入り部隊編成登録'},
        favoriteSort           : {tag: 'deck'   , caption: 'お気に入りソート登録'},
        all_dissolution        : {tag: 'deck'   , caption: '全部隊解散'},
        all_deck_setting       : {tag: 'deck'   , caption: '全部隊配置'},
        unitListDialog         : {tag: 'deck'   , caption: '待機武将一覧をポップ表示'},
        deckGroupImgView       : {tag: 'deck'   , caption: '待機武将一覧にグループアイコン表示'},
        displayUnitPower       : {tag: 'deck'   , caption: '部隊戦闘力を表示'},
        hikyou                 : {tag: 'dungeon', caption: '部隊の自動選択'},
        hikyou_all             : {tag: 'dungeon', caption: '全部隊秘境送り'},
        map_starx              : {tag: 'map'    , caption: '☆リスト表示'},
        map_reg                : {tag: 'map'    , caption: '座標記録リスト表示'},
        map_rightclick         : {tag: 'map'    , caption: '右クリックで地図移動'},
        map_tool               : {tag: 'map'    , caption: '右クリックでツールチップ表示'},
        map_butai_status       : {tag: 'map'    , caption: '部隊行動状況を表示'},
        all_map_status         : {tag: 'map'    , caption: '戦況マップを表示'},
        map_rightdblclick      : {tag: 'map'    , caption: 'ダブルクリックで対象の合戦報告書を表示'},
        prohibitionArea        : {tag: 'map'    , caption: '陣取り禁止区域表示'},
        zoomMap                : {tag: 'map'    , caption: 'カーソル選択対象を拡大表示'},
        panelAttack            : {tag: 'map'    , caption: '攻撃目標をマーク表示'},
        faci_list              : {tag: 'faci'   , caption: 'レベル別施設＆建築中数表示'},
        unit_list_hp           : {tag: 'unit'   , caption: '武将HP表示'},
        unit_list_hp_bgc       : {tag: 'unit'   , caption: '武将のHPが100でない場合は色づけ'},
        unit_list_total        : {tag: 'unit'   , caption: '総兵数表示'},
        unit_list_group        : {tag: 'unit'   , caption: 'グループ機能を使う'},
        unit_list_icon         : {tag: 'unit'   , caption: 'グループ機能使用時にアイコン表示'},
        unit_list_sort_def_grp : {tag: 'unit'   , caption: '強制グループ単位ソート'},
        unit_list_hikyou       : {tag: 'unit'   , caption: '秘境部隊に兵士1セット'},
        unit_list_200          : {tag: 'unit'   , caption: '簡易編成のカード表示を200枚まで表示(※100枚表示不可)'},
        unit_list_max          : {tag: 'unit'   , caption: '簡易編成の補充リンク押下で最大補充'},
        market_maxsoldier      : {tag: 'faci'   , caption: '市での取引後最大作成兵数表示'},
        market_desc            : {tag: 'faci'   , caption: '取引を上部に表示'},    //add
        non_back               : {tag: 'faci'   , caption: '復活するボタンを非表示'},
        map_potential          : {tag: 'faci'   , caption: '空地戦力を表示'},
        facility_selecter      : {tag: 'faci'   , caption: '訓練施設内に他訓練施設リンクを設置'},
        facility_tool          : {tag: 'faci'   , caption: '右クリックで施設操作ツールを表示'},
        facility_tool_WUP      : {tag: 'faci'   , caption: '施設操作ツールにダブルアップ操作を追加'},
        panel_func_change      : {tag: 'faci'   , caption: '機能選択を押しボタン表示'},
        villageListView        : {tag: 'faci'   , caption: '建設状況一覧の表示'},
        facility_maxsoldier    : {tag: 'sol'    , caption: '各兵生産施設で最大作成可能兵数リンク設置'},
        desc_soldier           : {tag: 'sol'    , caption: '上位兵を上段に表示'},
        def_num_of_soldier     : {tag: 'sol'    , caption: 'デフォルトの訓練数'},
        def_kind_soldier       : {tag: 'sol'    , caption: 'デフォルトの兵種'},
        merge_fight_info       : {tag: 'battle' , caption: '合流攻撃検索に出陣確認情報表示'}
    };
    var options = {};
    var OPTION_TAG = 'ixa_moko_options';
    var OPTION_PREFIX = 'ixa_moko_';
    var HPres0 = [18, 19, 20, 21, 23, 25, 27, 29, 31, 34, 37, 40, 43, 46, 49, 52, 56, 60, 64, 68, 72];
    var HPres1 = [90, 93, 96, 99, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150];
    var groups_def = ['','','','','','','','','','','','','','','','',''];
    var groupsx_def = ['#888','#888','#888','#888','#888','#888','#888','#888','#888','#888','#888','#888','#888','#888','#888','#888'];
    ////BEGIN_NOHL
    var groups_img_def = [
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00qV4M.%15%AB%A8%A7%B8%A6r%C3%B4%7CI*%15%FF%FF%FF%E7%DC%9B%DB%CE%91W%3C*%94~SY%3B%1FlWI%88qH%F3%E9%A5P3%1FeI)%AC%99g%81rhs%60T%88%7Bs%9D%96%92%A4%9F%9DeN%3F%89ug%8F%84%7D%7Dc%3EZ%3D*%95%83vfK9%B9%AC%A4%A1%90%85%D0%C8%C3%7DgX%A0%8C%5DqYH%CF%C1%86zi%5E%96%8D%88%5EE4%FF%F7%B0B!%0B%B2%B2%B2%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%83%01%C4%19%19%8F%C8%A4r%C4%01%09%0D%98T%E2D%ADZ%AF%D8S%22%851xR%14%95xL.%9B%C7%A5%94%A739%BB%DF%E2G'e%82%DB%CBi%FAyr*U%EEh)ze%16%01%03%0D%01'%02e%26%12%16x%82ue%13%0D((%0E%10%92b%26%01%00%05%19dy%9Ab%02%05%07%96%0ARV%05%04(%04%01%A0b%A2%93%95%97%24%B7%B8%24%08%96(%0A%17%81%83%9B%01%A7%96%22%96%00(%24%C6%24%82)%B1*%B3%A4%0F%11(%03%C5%C7%C9%CB)%17%7F%C0%9A%0C%0D%07%10%C8(%C6(%C8%CA%C9%0B%A9a%B2%91c%17%0A%1A%00%0A%96%D6%BD(%08%D6%08%BB%08)%DD%D1%A0%01%10!%E2%1E%09%7B(%0E%1C%3C%40P%C4%02I%01%05%94(%C1%80%9C9t%DA%26J%F0f%C6%84El%E9%98%15h%E7.%98%0A%0AZ%3E%9E%CB%96%2C%02%89%00mJ%8EJ%D1%A0%A0%A5%83%D5%12%1Et%60%E9%40%0A%98%8Ec%B6%A4%00%00%81%A6%A0%05%01RtJ*(%01PR%17R%10%10%91%E2%00%82%00%1APDXpp%40%00%06%A1%DE%A1%09%D05%851%02)vE%08%C0%13A%81G2%C9%3ChU.%C5Af%D4%1C%A4%A0vNS%40%15%0Fv.%90%EA*E%3D%B4%E42%3D%85%B6%00%C0W%0AJ%0B%94(%20HB%02%08%10%0A%2C%8AK%A6%82%84n%16Ll%16%ADB%80%04%09%9B9%03%B2%93fC%CC%D5p%12l%F8%90%02%2Cl7%0CR%7C0%10%22%C5%83%2C%C0%B3%3C%E0b%20%08%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00qV4%88qH%5D%1E%19%DB%CE%91%AC%99g%CA%14U%FF%FF%FF%A0%8C%5D%E7%DC%9B%B8%16K%B8%A6rM.%15%9D%18%3C%94%197x%1C(K%20%0F%81%1B-T%1F%14%94~S%C3%B4%7CY%3B%1FeI)%7Dc%3E%89ug%C1%15P%A6%18A%D0%C8%C3o%1C%23%A1%90%85Z%3D*fK9%95%83v%B9%AC%A4%7DgX%F3%E9%A5qYH%8B%1A2%AF%17F%CF%C1%86f%1D%1E%FF%F7%B0B!%0B%D4%14Z%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%83A%F3%19%19%8F%C8%A4r%F4%D1%08%0D%97%94%E0D%ADZ%AF%D8%93%20u1%80R%0C%95xL.%9B%C7%A4%14%C8%039%BB%DF%E2%88'U*%170fL%02%AEJ%D3%C9%05%0F)R%10%05*%18%83)'%24n~uc%09)(%26%13%15%0D*%0D%00%93%04%14%97f%8Ee)%22(%22%16%8C%02%04(%AA%01%02%86e%A0d)%26%93%8A%0C%A2%A4%07%22%15%02%7Bd%B0%05%25%25%B2%93%12%01)%01%AB%A2%22%12)%0E%8F%7D%83%8F%11%89%B3%A3(%01%A3%04)%A9%AA%08%01%0B%8C%D0%7F*%DB%26%26%A3%22%E6%AA%93%B3%EB%AB%1Bb%B0%10Z%92%B4%C8%03%89%83%0A%AA%04%0F%BD%B0bJ%2CP5%C0%02%02%82%E6L%0CP%25%82B%98x%D1%7CiZ%17%60%96%89D%13%15%A4p%25%EE%99%0AT%EED%2CDp%A0%E4%3E%14%00%3CA%1C%A7B%985w(%26%60T%05%C0%23%C0%13%C8%10N8%A8%00%80O%9D%094Uv%14%93a%81%08%11%07%2F%D63Q%F2%C0I%87%BE%22%AAx%40%60%00%05%8B)%06N%020h%C1%00%04%00Z%A1%91%FA%A0%C2%20%AC%16%D6%A53g%CD%D2%D8q%09H%08%C3%BAo%94%D2a%08%16dx%EB%91%9C%5DM%12%B0%9E%9D%24%20*K1%F5%06%0C0V-%A1%DD%13%86%FB%A6%98%C0%D4%82%A0Y%DA%06%110%11%00%1E%DF2%10%06%9DpP%C0A%A20%B6%14%F5Z%D9%F7L%82%12%1C%1B%A5%E8%D0%86%8Fm1%02%3Aphv%9B%8Fi%0E%06B%A4%88%90%A5x%96i%5D%82%00%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%A0%8C%5DG!%13qV4M.%15%E7%DC%9B%C7%17c%FF%FF%FF%97%25%8B%F3%E9%A5%DB%CE%91%8D%26%86L!%1B%AC%99g%88qH%B8%A6r%60%23%3C%5D%1E%19%CA%14U%81%1B-%88%26~%94~SY%3B%1FeI)~%25nK%20%0Fe%23D%89ugQ%22%23%94%197y%25e%B8%16K%5B%224%A6%18A%95%83v%B9%AC%A4fK9%A1%90%85Z%3D*%D0%C8%C3%83%25v%BE%18_%86%1B5%8B%1A2%7DgXx%1C(t%24%5D%C3%B4%7Co%24UT%1F%14%9D%18%3CqYHf%1D%1Ej%24MV%22%2C%AF%17F%CF%C1%86%FF%F7%B0B!%0B%D4%14Z%93'%8F%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%83%C1%14%92%19%8F%C8%A4R%162%09%0D%9A%1CdF%ADZ%AF%D8%19%24%A71%88r1%9DxL.%9B%C7%A9%9Ch%249%BB%DF%85%C3b%94%B3%BD%EF%E4%F8%8E%96%AB%E3%C5%20%1Cvez%7B%7D%83n%203*9%02%039%12%1Eb%85%86~c%116%996%1C%03%00%8F88%04%8E%10(%07%3B%A7%95%88%11%18%7D%AD%0E8%09%03%A07%088%0D%0F%A8%A7%7C%96%3A697%C0%C1%C0%16%A0%007879%19%B9%BB%AA%AC%AD%D09%C5%0C8%08%B1%2F%A8%CDc%5B%D1%D0%B5%9E%00%B39%13%BA%87c9%0C%C2%A0%04%C0%B5%EC%C29'%E5%BC%1CZ03%D2%A0%15%BF8.%015%00k%2C%9B%87H%C7%AAV%A0%18%F49vcA.f%E6%C6x%90%96%E0%15%0E%00%16%1C%84C%90C%C1C%82e%F2Q%C3%E1%80%405P%16%3A%7CL%15%12%94%80Y%00%00P(%F6a%87%02%1A%17%B2E%3C%E7%B2%D8%02%94%1A%01%12%84%8AWC%C08%90d%F2%BD%BC%F8%2F%40%83b%01%06%10%E8%88T%87%84%3E%3D%91%01pp%03%80I%5B%C6%1CVE%F7%15%14%A8%04%14*%04XJS'%2F%163%CD%A2U%FB%A0%83%82%0DOg%05p%8B%C8%C6%00%047%1A%D0U%89%EA%AE%05%A18r%E4d9%A9F%8E%00%19%16%AF%E4%23%40%C0%5E%A4z.x%5C%99kB%0B%1A%E4%40R%E2LZg%09%09%A3K%97%DEP%82D%0E%5C%AAc%3F%C8A%C2%C0%8A%1C%0B%02%EA%DE%CD%5B%F7%02.%06%82%00%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%DB%CE%91%88qH%F3%E9%A5M)%0EeI)d%3B%14%FF%FF%FF%D8%952Y2%11%AC%99g%87V%1DM.%15%EF%A78%E7%DC%9B%C3%B4%7C%B8%A6r%AAq%26Y%3B%1F%92_%20%89ug%E3%9E5Z%3D*%A1%90%85%94~SfK9%95%83v%B9%AC%A4%C1%83%2C%D0%C8%C3%B5z)%7Dc%3E%7DgX%7BM%1AqYH%CF%C1%86%CC%8C%2F%A0%8C%5DqV4%9Eh%23pD%17%FF%F7%B0B!%0B%FB%B0%3B%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%83%81%93%09%19%8F%C8%A42%94%E1%08%0D%93T%E1D%ADZ%AF%D8S!51hR%1D%95xL.%9B%C7%A6%94%06%239%BB%DFb%04%265%82%BF%EB%E54%3D%7FRP%DC%0C%5B%05%07dzxc)%24%01)%0A%26%8E%8F%26'%04%02%01%03%84b%86e)%22(%00%25%9F%A0%A0%02((%01'h)%7Bd%9B%A4%24%AE%A4%0D%AE%B2%24%1E%A7%98%A9%87b%AC(%A9)%A4%22%A9%09%24)'%26%97*%99%AB%9C(%B2%B0%24%0E%A4%09%08y%B8%9A%CB%A0%A4%9E%A0%04%D3%85%D5%CA%A4%BD%BF)%0B%22%09)%26%D4%AA%88%CB%CD(%B1%CB%0F%03%EA%B9*%BB%D8%9D%A1%04%03%7F%A8%EB%BA%CB%A4%F8B!b%00%95%01%11J%20%60%E0%AF%DE%BDO%D9%40%5D%18%15%A0%40C2%1Bv%CD%12a%CE%D52%01%AA%92%E9%0A%F0%40%40%83%14%17%00%04%20%00%40%C00%12%AD%F8%DD%FA%87%C0%5C%04%01%00%16%00%40%F1%A0%04%A9~%00%09H%11%D8pQ%0C%84%05%A3%16%40%13%11%40%E8(%12%3By%1DK%C6%60%C05%98(%22%08%0D%C0%F4%D7%BC%A2%23%06%A2%80%08%20%05%01%02%C2H4%F8%A9%C0%9B%AA%03)v%02C%90J%01%84%02JIuZ%90K%A4%84%5E%1D%18%8C8%06!%C5(%07%0B%DA%BA%CD%25%F8%0D%88T%03%D2%D1%B3S%E6%C01j%15%DAP%DE%5C%A0%82%05F%9B%ED(Ha%C1%C0%87%14%08%B2%A8%CEB%B7K%10%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%F3%E9%A5%9Eh%23M.%15%A0%8C%5DY%3B%1F%B8%A6r%D6%1DXeI)%FF%FF%FF%88qH%F3%92%40%DB%CE%91K%20%0F%E7%DC%9B%B5z)%AAq%26%7Dc%3E%87V%1D%9D%18%3Cx%1C(%94%197T%1F%14d%3B%14%94~S%5D%1E%19%89ug%92_%20%AC%99g%C3%B4%7CY2%11%C1%15P%E3%9E5Z%3D*%B9%AC%A4%D0%C8%C3fK9M)%0E%95%83v%D8%952%AF%17F%A1%90%85%B0f%2C%C1%83%2C%7BM%1A%97K(%EF%A78%A6%18A%B8%16K%CA%820%9C%5E%24%CA%14U%7DgXqYHpD%17qV4%CC%8C%2Ff%1D%1E%8B%1A2%CF%C1%86%FF%F7%B0B!%0B%D4%14Z%FB%B0%3B%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%04BT%A2%19%8F%C8%A4%92V%12%09%11%19%9E%A5F%ADZ%AF%D8%9A%85%97A%84x%0E%9FxL.%9B%C71%5Eh%A49%BB%DF%0ACe%C4%BB%BD%EF%E4x%2F%C7%AB%DF%5B%11%11%01%01%26fz%7B%7Dvo%0F%04%03%036%02*%3E%1F%1F%3E%87%88~o76%3B%9D%07%01%0E%7D)%06%3D%A5%98%8Ac%0F%83%83%11%02%9D%1B%3C%11%24%1C%0B%02%12%A6%A7d%0E%026%BD%BE%9D%05%BD%1B%9D%0B%3C%B8%7C%99b%BB%BE%BF%3B%C1%CC6%C6%A6%C8%A8b%AA%AB%11%3C%9D%03%1D%2C98%02%03%02%13%D3%89%A9%7D%E8%E8%DB%E9%1C%3B%0B%079%A5%D4c5%09%3A%F7%F7%00%3B%00%3A%FA%FC%F8%3A%12%E0%90g%CE%1A%BA%0B%02x%E8%D8%A1C!%C3t%3C%18%B8%20%98L%CC%0DW%00%06%2Cl%B8%B1%00%04%06%14p%E5%22%A3!A%A7%06%0D%1En4%A9%83%00%B9r%15%7DthW%2Ce%01%87%0D%0B%EC%83%07%B3%9A%03%AE%02%3B%B5%ED%18%80%93%07Pw%3CdP%AC%D6%A1%00%80%03%3C%20t%82P%94%87%BE%1D%07N%2C%1D%13%E0%C0%D3%3E%0B%1BD%0C%CB%03%83%CE%1D%04%B4%8E%F4%B1%C2%06%01%12%0C.tJ%90pA'%1E%12%1AA%A8%D0s%CC%87-%3C%06%EC%A3%7Bv%87%D8%3D8%26x%E8%2B%C6%04%8F%04%0B%00l%10%80C%02%83%B3%030%88d%EC%03%06%81%0B%D1*%97%A2%A0%97%C1%8B%CD%5B-%19%A0%90C%C2%E2c8(%BCF%3D%EF%12%EA%DB%22%F9%80%D0%60%1B%B7%EF%1E%18%40%A0%E0%F1%F2%F7%EF%09%3CP%20%98%C1%A3%02%8E%E7%D0%A3K%9F%8E%A3%02%17%04A%00%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%60%23%3C%8D%26%86%FF%FF%FFM.%15Y%3B%1F%B8%A6r%E7%DC%9Bo%24UL!%1Be%23DG!%13t%24%5DeI)%DB%CE%91%83%25vQ%22%23%F3%E9%A5%AC%99g%88qH%5B%224%C3%B4%7C%7Dc%3E%89ugfK9%88%26~%B9%AC%A4%A1%90%85%D0%C8%C3Z%3D*y%25e%95%83v%7DgX%CF%C1%86%A0%8C%5DqV4qYH~%25nj%24M%FF%F7%B0V%22%2CB!%0B%93'%8F%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%81%60%E3%19%19%8F%C8%A4r%E4%D9%08%05%16%D4%E3D%ADZ%AF%D8%D3%03e%11dP%8B%94xL.%9B%C7%25T%E6%928%BB%DFb%C4%05E%82%9B%3B%A5%B09M%1F%3BH%80%81%82%24%07(%15%03%00%7B(%7D)%85%8B%8F%90%8F%11%26%0D%88e%7Cu)%25%0C%20%9D%9E%9F%9D%10%26%94%03zb%98b%1D%91%AB%8B%20%A3%10%04%25d%A8b%01%0A(%08%25%01f(%AE%26%22%0F%BBh%8B%99)%24(%06%11%04%08X%BD%A3%22%B2%B3%C4c%C7%A3%26%11!%D9%DA!%06%A3%12m%D2%8C%8D%0C%D6%22%E6%E7%E6%0D%A3!'%97%D3b%00%15%A3%20(%25%F6%F7%0A%05%94%0C%89%E1%C5'!F%15%40%60%C6%D1%A2~%C3%C493%11BA%16%04(%0AP%18pB%98%A6w%18%90%09%DC%C6%91%C2(%03%FC%12fZ0%C0%9A%04t(%D5%09lw%EA%DD%A6%8F(%12%DC%BB%07%00%85(%86%03%C0%5Dd%E4%E0%D6%22k%96e%E2%BD%1A%10%AD%A5%B8%00%81%C48%98%90%87%D0%C2%02%0A%DC%8933%C1%1C%81E%FAF%C5%92Z%8C*%01%8F%D6%04*%B0h%B4k%99%00i%24%845%40T%D1%D43%0E4%9A%00A%00%A8%3F%3B)N%10%10q5%01Y%91x%03%1C(q%00%C3%9B4%1Ct%E2%B5%F3%80%83%06%14%08%17%BB%A9%A9A%C0%07%5CY2%3F%E4%22%20%08%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%E6%00%00%A6%40%7F%F4%A7%40%F3%E9%A5%94~SqV4%B8%A6r%DB%CE%91%E7%DC%9Bj%24MeI)%7Dc%3E%FF%FF%FFY2%11L!%1B%AC%99g%88qHY%3B%1F%7BM%1At%24%5DQ%22%23G!%13%E3%9E5e%23D%87V%1D%C3%B4%7C%8D%26%86M.%15%B5z)%89ug%C1%83%2C%92_%20%83%25v%B9%AC%A4fK9%D8%952%D0%C8%C3%60%23%3C%A1%90%85%95%83vY7%18%5B%224Z%3D*%EF%A78R.%1Dy%25eq%2CG%C6%834%85.hi%3C%1C%88%26~%5E3%19o%24U%92%3F%5E%9A7%7Cd%3B%14%7DgXqYH%A0%8C%5D%9Eh%23~%25npD%17%CF%C1%86V%22%2CB!%0B%FF%F7%B0%FB%B0%3B%93'%8F%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%07%FF%80%0B%0B%23%268%86%87%88%89%8A8%26%23%82%0B%1C%3F%13%3E%94%95%96%97%98%3E%13%3F%1C%0B%20%3F%12B%A2%A3%A2%19(%3E%1F%A4%AA%A3-%3F%20!%16%24%99%3E%0D%05%06%2B%A9%AB%A3%00%01%0C!%3F%3B%3F%3D%C3%C4%C4%02%40%06%14%BA%A2%BCA%3A%3F%C0%2C%0D%3F%3E%08%D6%D6%0D%3D%40%18%0D%CB%CD%CE%D0%3BB%3F%05%04%93%95%14%DA9%E2%AB%DF%E0%C0B%09%40%C8%C5%3D%C7%EB%ED%01A%FB%EF%3B%3B%0A%F3%A8%A1%D36%80%DD.%7D%FC%FA%CD%C8%01%E4%80%0FR%08%12%40%00E%CA%1D%BFg%C0%2C%60%00%D2%03%9AGh%05%04%24%08%25%C4%E2%C5p%3E%0Cp%CC%C1%B2%A5%83y%02%94%99%3C%09%EC%C7%01%01%0AH%5CC%80%E2%C1%3C%05%3Ej%B8%A8%A0B%C7%06%11%091%EE%90%40%C9%82%90%18%EC%7Ch3%D0%E0%85%8C%01'x%3C%C8%91%20%82%8E%0A%FDT5%200%D1'G%02%04%18%1E%80%A0%0DC%82%02'%F8*(U5!%C7%B1y%F3%06%00)%90%A3%87%83%03%7B%8F9%F0%1ANU%06%04%00%1B%02%26%80%0C%C8%00%C6%40%04%E4%20%90%C0%C3%DCU%0D%06(%D00%B5a%8F%1Cz%07%1CK%A0%23%EC%AA%0C%3Bh%C0%D0%C6%18%C3g%9C%3F%5E%1Ex%C0%E3r%3E%1E%DA%0Ax%06%E2%A0%25%60%20%0Ax%14%CE%17%047%10%C694%24H%EE%40%1E%90%1F%0C.%0C%AF%88%D0%B8%5E%95%9D%EF%FE0%7D%90%9Fq%02%03%18%CEc%A8%FB9%F7%92%08%F7%F10%60%EFnn%20%E2%B7%DB6%C9%00%2F%5E%DD%EA%02%9A6)%02%B2%00%5B%8E9V%80%5E%E6%CD5S%05l%11%60%D6%01%3F%40%C0%40%02*%01%C1%008)X0%D3%3E%1D%D4%16A_%09t%B0%CF%06%0A%F4%A0%80%07A%D8%90B%09%3F%5C%90%D0%8A%FC%A8%10%01%0F%1E%5Et%C1%06AHW%C2%027%40%C7%C3%8E%3C%F6%E8%E3%8F%3C0%C0%C9%02%81%00%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%CF%C1%86%045QM.%15eI)%E7%DC%9B%F3%E9%A5%DB%CE%915%25%19%FF%FF%FF%94~S%1C-5%C3%B4%7C%3D%22%0F))'9%23%14%AC%99g%B8%A6rY%3B%1F%140%3E%7Dc%3E-'%22%88qH%084L%25*%2B%18.9%89ug%95%83v%A1%90%85%D0%C8%C3%0C2G%B9%AC%A4fK9Z%3D*%7DgXqYH%A0%8C%5D%101CqV4!%2C01%26%1DB!%0B%FF%F7%B0%007V%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%04%82%A3%11%19%8F%C8%A4R%A4%E1%08%11%19%D4%E1D%ADZ%AF%D8%D3%01%95AxP%18%95xL.%9B%C7%26%94%E7s9%BB%DFb%C7%07E*%5B%E0%F04%9D%2CAI1%0A~%0D%0E%0E%0D%12%24'('%01dzuh%25%04%23%02(%0B%00%03%03%00%09%94%15%00%13%07%8Cb%8E%8D%25))%06%00%A6%05%02%A6%A8%04%A6%13%0Dh~%8F%A2%A5)%25(%A6%0F%BA%B8(%23%A6%25%B2%A2%B4%A4%C1%BD%23%BD%B9%C0)(%A1*%A3%90%AD%A9)%C9%D3%AF%CD%8D%C5%D2)%03(%05)%0B%AC%BE%C0%06%CE%B3%7Bb%18%14%02%25%11~%10%AA%25%B9%0C(%0F%04%03%A0%C4%E9%24%ED%F3%F3%13L%A5H%F0%AFD%02U%B1%F6%3D%22%11a%84C%87%D8%16%404%F0%D0a%09%0A%0A%C7(0a%E2%02%8A%80)%20%A00q%A2B%8A%07%94%FC%1Cx%14mL%80%03%03%C0%89%A4%D0%11E%AA%02%10%08%0E%60%90qL%07%AA%07%25%C0%3D%88P%01%C5%3C%14%02%C0%09%E4%D53%40%1Af%92%0C%A4%00%F0%20%85%A4%05%02%170%90%D0SA%04T%A6%20%94%90Z%00%2B%AE%83%E1%06(%40%B7P%C0%3BS%C9R%01%60f4%98%BE%9E*%3A%04%82ks*%DD%5B%25LhK'%86D%AF%B9%AF%E6%C2%8D7P0%5B2%86%F9%A6%92h%0A%C5%00S%15%1C%E3Ua%01E%82I%0C%06%94p%9B%60'%83%12%3B%EF%3C%E6C%81%02%06%A7%26HlT%10%C0%82%02%09%CF6%E3%C1%93%06D%9B%DD%C0%0F%80%D8%80b%18%F07%0DPl%40%10%02%85%83%2C%D0%B38%E0%82%20%08%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%E6%00%00qV4%E7%DC%9B%B8%A6reI)%7Dc%3E%94~SM.%15Y%3B%1F%FF%FF%FF%88qHT%1F%14!%2C0o%1C%23%25*%2B%5D%1E%195%25%19%B8%16K%18.9K%20%0F%084Lx%1C(-'%229%23%14%1C-5%89ugV-%1A%C1%15P))'%AC%99g%3D%22%0F%0C2G%D0%C8%C3%B9%AC%A4%95%83v%81%1B-%CA%14U%9D%18%3C%A1%90%85Z%3D*%140%3EfK9%045Q.)0%AF%17FI%2F%1Ak%1E(E1%1E%A6%18A%7DgX%C6%16Y%DB%CE%91'0V%C3%B4%7CqYH%F3%E9%A5%A0%8C%5D1%26%1D%8B%1A2%101Cf%1D%1E%CF%C1%86B!%0B%FF%F7%B0%D4%14Z%007V%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%07%FF%80%08%08%1F!5%86%87%88%89%8A5!%1F%82%08%18%3D%0F8%94%95%96%97%988%0F%3D%18%08%20%3D%11%40%11%15%11%13%40%A7%11%0B%3A)%A7%AD%AE%AD*%3D%20(%0D%A7%0F%3C7%07%3A%17%0B%037%05.%AF%C231%0A(%3D%3A%A7%07%3E%3E4%07%03%05%09%3E%01%2C%C2%AE%C4%3F9%3D%C8%40'%D2%022%CD%CC%3E%3C%3D%16%1E%D6%D8%D9%DB%C9%1B4%01%067%E34%E4%EF%03%C9%D71%3F%FB%DA%C8%13%CB%BF%7C%D8%10%E0%23%9C%0D%1E%3C%12%2C%C8%B7%8F%1F%3Bw%05%C2%DD%B8%C1C%00%00r%DB%2C%B0%3A%A5%AEa%3F%1D%15%06%F4%E0!p%9A%81%8B%09m%24%A8%05%A4%A3Gv%15%0A%DC%08%D0%8C%07%8D%1B%04m%22%7C%D0R_%C3%97%C8%DC%D1%08GCe%0Fy2%3A%2CXp%C2%E5%CF%8F%3A%A41%B3a%83%40%0F%83%04B9%7D%CAN%C7Ef2%06%18%20P%D3%C6%00%1C%0E%18%18p%20b%C4%CFu%C8%FF%1A%14%E0a%A3%A0%8D%A22%0C%14%10H%83%87%01%1B%01n0x%FB%B1%01%C1i%05%00%C8%A0%01%80G%B8q%24%7D%00%D8%E1%60%C0%0E%0Dpux%00%20%60%40%07%02%3C%08Pz%40%D6%86%81%1E%1C%A6M%A4'%40Af%20%BC%26L%B0%80%03%DF%05y%1C%18d%B0!%03%80%EF%BD%3E%06h%F8h%8Dc%0Bz%03%24%08%A8%0A%80%22Y%1E%83%89%A7%2BF%95%80%0C%19%13g%92%23%97%E3%F5%B0%18%10%BE%12%B4%B1M%02%C9%8B%02%BAKgH%E10J%014%AC%FB%20xC%3D%BBW%D84%1C%08%10%0E%A5%3C%1E4%D1%94%C0%0A%DEq%E4%13%09%00%0Cp%1E9%F2%08%10%40%5D%92eP%A0K%24(%40%D2%5E%B8%F8p%C3U%1A%06%20%81w%5B%ED%40RN%F2%DC%20%81%01%07D%E4%C0k%5B%FD%20%A2%0F%07%84%26%CF4t1s%00%04%DA%98%D0%40%8B.r%40%83%049%88%A0%20%84%05%D1%90%C1%08%0E%98PB(%0F%14%BC%F5%13%04%3B0%00%C1%3E%2F0%B0%C3%95WR%00%01%05%3D%94%80%00%0C%3D(%80%E5%98d%969%A6%02%9C%20%10%08%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%F3%E9%A5eI)%B8%A6r%89(%8B%FF%FF%FF%1B4%60M.%15%C3%B4%7C%DB%CE%91%AC%99gL!%1B5%25%19%60%23%3C%18.9t%24%5Dy%25e%8D%26%86%E7%DC%9BG!%13%88qH%94~S%045Qo%24U))'-'%22%89ug%25*%2BfK9Y%3B%1F%88%26~9%23%14%95%83vZ%3D*%A1%90%85%7Dc%3E%83%25v%1C-5%B9%AC%A4%3D%22%0F%D0%C8%C3%7DgX%140%3E!-%3DQ%22%23*%2B4~%25nqYH%101C1%26%1D%CF%C1%86V%22%2Cj%24M%A0%8C%5DqV4%FF%F7%B0B!%0B%93'%8F%007V%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%02%E1%F4q%19%8F%C8%A4%D2%F59%09%09%99%DB%02F%ADZ%AFX%D8%E2%96!%94n%8D%9CxL.%9B%C7%AC%5Bi%A39%BB%DF%85%81bs%7B%BD%EF%E48nv%AB%9B17%18%24%15b%1A%81%0D%84cz%7B%7Dvd%1571%09%01%26%170%91%93%0B9%240*%038%A0%7C~d%0D%016%A7%06%01%93%A7%007%17%064%06%0C%A0%8C%A3c%0B%02%A74%22%006%BD6455%08%BE%01%16%A1%8Dd)%06%BD%07%BE%094%A7%07%116%074%D753%C8%B6%15%1E%B9%027%C4%D76%097%13%BE%0672%0C%10%DB%8E9%175615%91%BE%00%137%1E%F26%02%1C%B3%B4D%BD3A%23%40%8Cj%D4%AA%5D%BB%96%10%40%00m%EE%C64%D8r%10%81%B0%8B5(%20%10%91%CB%06%05%19%01%93%91%B1%17c%E1%C2%5E%08%A2%D9%B8%F1%20%A4-1%241%CATy%83V%ADw0%0F%C6%B8%01%40%800%A6%0A%00%CA%D1%B4)%B0%0C%C9%1B%A7%04%D0%E88a%A8K%9C9%8E%9E%AA%C7%0F%D6%A9%9AO%8D%EADj%83%EAU%A7%11Gn%3D%85%20%06%B1%95%60oj%9D%C7%D5%2B%00%0E%CEV%12%159%E6h%80%1A%12%1EH%B8%91%E0%D4%D5%11Y%15%DD%A0v%40%81%05%0B%1Dp%40x%A0%80BR%09sm%C5%91q%F7%86%03%9B%A0Z%18%98%10%40%02%E0%C0z%208p%90%183%A8%073%1C%B4%8Blg%91%E9%D7%B0%F9%80%D0%E0%1A%B6m%9B%2B%40%84%B8%01%F0%B6o%1C%0Cn%84%20%80%E2%86%02%19%C8%93%2B_%CE%5C%86%02.%04%82%00%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%E6%00%00eI)%DB%CE%91%AC%99g%B8%A6r%88qH%C3%B4%7C%7Dc%3EqV4%FF%FF%FFY%3B%1F%25*%2B%B5z)!%2C0d%3B%14%0C2G%94~SM)%0EY2%11%EF%A78%87V%1D%D8%952%18.9%CC%8C%2F%89ug%E3%9E5I%2F%1A9%23%14%A1%90%85%AAq%26Y7%18Z%3D*%084LeD%22d%40%1B%3D%22%0F%95%83v%C1%83%2C%B9%AC%A45%25%19fK9M.%15%D0%C8%C3U%3D%24%7BM%1A%1C-5%BD%840%140%3E03.%7DgX))'PB%2B-'%22%92_%20%045Q%EB%A8%3C%2FMPqYH%F3%E9%A5%CF%C1%86pD%171%26%1D%A0%8C%5D%9Eh%23%E7%DC%9B%101CB!%0B%FF%F7%B0%007V%FB%B0%3B%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%07%FF%80%08%08)%238%86%87%88%89%8A8%23)%82%08%17A%26%3C%94%95%96%97%98%3C%26A%17%08%25A%2C%0C%15CC%15%221%0C%00%1A3%0E%1F%A4%AF%B0%A4%2FA%25'%0A%40%04%04%1A%3C%009%02A%3AB%0F%09%09%A3%B1%AF76%11'A%40%40%3DB%3F%D1%D2%04%01%C299*%AE%C7%C9D%3EA%CD%CFB%D0%05%3F%02%D0%D1%3D%3D%00%0E%DC6D%DE%E0%CE%D0%C1%3F%3A%3D%0FB%05B%01%22.%EE%F0%E2%85%83%06M%C0%00%03%3F%08%04%91V%20C%3Bd%EF%02~%1B%18M%88E!%03%D4%0D%C8%C1%8F%07%C4%80%F0%26%CE%1B7.%C1%83%02%06%EE%F1%03%A0%80T7%90%02G%06%B3fM%1AG%1D%0C%5CF%84)R%5C%0F%01%02%84p%2C(%04%E7%90%970c2%20%F0%E3%07%C7%A2P%E91%40%9AT%A4%82%7D%169%06%1D%40R%87%8C%9DIc%F2%C0fOZJ%00%03%B8%FE8%D0%C0%02%11%09%0D%FF%0Et%98%20Q%9E%02%03%072X%D3%B1K%81%0Ai%16%7F%40h%00%20%88E%00%18B%CA%1B%02%C4%01%10%00%3D%1C%92%AA%60%00!%BF%1C%04*%0A%81%E0CBLX%8Ek%20k%01%A0%A4P~%16%0D%0C%E8%80A%E41%88%3E%04%04%00%A6O%B3V%1F%AE_'%93%00%E2%07W%1D%40s%A0%B0%08%0E%02%85%DC%B1%BAQ8%00%E0%00%EA%00%0F%0C%07%00%A0%03%C0%02%E4%1F%89X%A0%5E%F3f%B0%1C%D2%04c%3F%BA%93%02%01%1D%99%83%F6%08%E2%FCG%90%1D%3B8%60%A7J%A4%C1i%86A%82%0A!%B0%40q%B3%EC%20%ED%F0%940A%A0%D0%D4F%D6%7DF%5ER%18%24PN4%3A4%95%03%00%06%08u%00%0D%AE%D1%07%8F%04%A5%095%C0%01%03%FC%60%5D%03%E1%25%F0%8D%07%0Ah%18%D0%0A%05%10%10B%02%F7%84%E0%D6v9%80%40B%03%1El%10%04%5Da%C1s%1C%09DL%10A%7F%01-%00%01%07%13%04%B1%01%12%020%04%11%01%7CPF)%E5%94%F0E%C0%09%02%81%00%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00eI)M.%15%AC%99g%DB%CE%91b%20%0FL%20%0C%F3%E9%A5%FF%FF%FFW%20%0EY%3B%1F%7Dc%3E%AC%1D%1A%E7%DC%9B%94~S%E2%1C%22%B8%A6r%8C%1E%15%82%1F%14%A2%1E%19%88qHw%1F%12%D7%1C%20%C3%B4%7C%B7%1D%1C%89ug%B9%AC%A4%95%83v%D0%C8%C3fK9%A1%90%85Z%3D*%7DgXqV4qYH%A0%8C%5D%CF%C1%86%C2%1D%1D%97%1E%17l%1F%11B!%0B%FF%F7%B0%ED%1C%24%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%C0%C3a%A3%09%19%8F%C8%A42%A4%D9%08%0F%98%13%C1D%ADZ%AFX%13%E1%849dN%8B%94xL.%9B%C7%A5S%86%039%BB%DFb%04%E7D%3AW%EAps%9A~.%04%0A%11xc%15%14%26%10%0B%0Eh'%7Ce%0B%09(%03%0D%01%12bu%24%00%0F%22%00%26%8A%8Cd%04%02(%A2%22%01%08%5B%8B%20%A2%16'%9D%82b%17%01%06%90%0D%A2%02'%23%06%23%8F(%20%11%ADd%0E%08%A1%03%7F%22%B5%23%90%01%A2%20%25%BFc%14%A9%C4%08%05%A9(%23%C8%22'%CB%CDb%7B%82%11%00%06%06%0A%20%20%B4%90%13%D8%DA%BC%DC)%DEb%12%00%0C%02%22%22%0C%D6%F5%20%B7(%D9%DB%CE%F1%0A%1A%24%D8%97%AD%01%00%82%EB%989K%01%A1%1A.%14%0C%06%A0%18%A7N%94%82v%EF*U%23XM%042%5B%A30.%12Db%236%93%D6%D6%89%10%E9%A9%E4%A8%7B%23%1E%88%02%80l%84J%96%82%24T%03qO%C09%8D%9A)C.%8C%17s%97%85%09%0A%06*%D0ts%A1%03%13%8BB1%B0%20j%C2%89%02%8B%94%F1%C3I%86D%81%09%13%01%C4%125%D0%C2%08%89%5B%9D%3D%0D%10j%04%00%02%04d%A2H%80%20%80%5C%14%13%B8%A6%B84B%00%80%02%CD%16%04%10%A1%80%40%8A%0B%B7%06%D8%AA%E0%AC%02V%0A%88%C6%2C%A0%00!%91%BBE%04.%90%C9%98%A7%F3eO%9E%E1%A4%F1%D0%26t%1E%02%1E%3A%9C%F0e%DAM%84%13%1D%0E%7C8%81%20%8B%ED%2C%08%B8%1C%08%02%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%B8%A6rM.%15%E7%DC%9B%18M%26%FF%FF%FF%F3%E9%A55.%13%DB%CE%91Y%3B%1F%0CZ.9)%10%94~S%7Dc%3E%04c4%C3%B4%7CeI)%AC%99g%25%40%1E%88qH%08_1%3D%25%0D%1CH%23%89ug-7%18fK9%95%83v%14Q)Z%3D*%D0%C8%C3%A1%90%85)%3B%1B%B9%AC%A4%7DgX%CF%C1%86qYH%A0%8C%5DqV4!D!%10V%2C12%16B!%0B%FF%F7%B0%00h7%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%02%81%93%11%19%8F%C8%A4R%94%E1%08%09%16%94%E1D%ADZ%AF%D8%93%01e!%7CP%03%95xL.%9B%C7%25%D4%07%139%BB%DFb%05%06e%82%DB%CBi%3A9Q%177%C6%09%25%82%7Dfy%84%09%01%08%0A%03%17(%0A%09*%17%24%23%24%01%03%03'ah(zb%26%01)%00%24%0C%05%10%14%09%11%23))%0B%06%01%00%96%9B%9D*%26(%AB%00!%AB%23%9C%AA)%9C%0E)!%14%13b%86c%B5%AB%24%00)%05!%CE%02%AB%CE%D2%01%7D%C6%9E%B6)%24%02%05%0C%0C%01(%BD(%0F%23%DF%17%B2%84%C8%AC%D9%24%CC%10%B9)%23%07)%02%01%1A%E7%C7%D8%0E%F4%EC%AC%CB%D9%F2%05%10hRa%8D%166m%A2V-%F0GB%5E%08%03d%0A%A6%23%01%01%DE%ADw%23%A0%858%11%91%13%BA%83%AA%0A%24%0B%97kc%C7Y%13%2B%AE%0A%85Q%23%C4%7B%D7V%AE%82%D6%2F%99%3C%07(%FE%14%F3%88o%15%B0%7F%03%0FB%00%00%B7%0A%05%02%09%02%24%BC%24%C83f%0A%06%24%A2Je%D8p%D5%03M%12%0F%22%18%C1%95%2B%C6%AE%23%1ET%D8%89%F2%E0%09A%82N%84C%2BHg%D6d%25%22%86s%23%91%1F%89%B8hB%A2%A0%DBT%C5%04%14%12H%0C%23S%01%01%09%04%1C%CF%14%A4U%A2%82N2%03J%D8%E3%3B%EB%8E%9D4%1B%DAX%BEc%60C%07%14%1E6%C3%F1%80%A2%03%01%10%8E%B2%A8%CE%A2%80%0B%81%20%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00eI)H)%14qV4%C3%B4%7C%F3%E9%A5Y%3B%1FE%25%0F%E7%DC%9B%88qH%A0%8C%5D%FF%FF%FFo%5ER%B8%A6rM.%15T9'%7Dc%3E%DB%CE%91K-%19%94~SQ5%22W%3D%2C%60J%3A%5DF5lZM%AC%99g%89ugcN%3FiVHfK9%B9%AC%A4Z%3D*%A1%90%85%95%83v%D0%C8%C3%7DgXqYHfRD%CF%C1%86ZB1N1%1EB!%0B%FF%F7%B0scW%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%85%22%04%1A%19%8F%C8%A4r%04%0A%09%15%19T%E4D%ADZ%AF%D8S%04%95QtP%15%95xL.%9B%C7%26T%87C9%BB%DF%E2%00%07E%82%DB%CBi%FA%FBbY%DC%C5yuf%0Bi%00%11%16((%06%0E%24%0E%0E%17x%89%82c%17%26%06%02%10)%08(%0F%04%25%12(%05%9B'%1Bh%92c%1A%5B%0F%25)%AD)%02(%08%AD%18%12)%04%12%01%A6zb'%09%03%25%04)%07%0F%0D(%01(%03%AD%C9)%09%06%BA%93y(%AC%25%0D%0D%01%05%00%00%9E%07%C2(%A5%80%A7b%15T%06%D3%10%10%0D%0F%B6%08%00%AD%09%13d%81c'%18%25%C0%AE)%03%02%AD%00%09%AD%05%1A%E2%85S1!%11%8AV%25%0C%EEK%81%82%DB%80%5C%02w%89%D9%60%A1%40%AB%03%B0%12%2C%5C%F8%C0%80%09%3F%E0%24%8A%A1%20%CB%15%AB%92%0CR%40%F0d%E8Y%99%00%CB%F0%C5%7C%E5%8F%00%00%0B!'%A9%A8%60%F1b%B0%9A%14%ACZ1%085%EBD%CE1%0B%02%A4D%D8%0E%E8%C5%06%0E%0E%E63%AAB%DE%C8v%12%A6%D5b%C6%8F%C2%84%AC%10%00%988%CAK%A34%A0%0D%18%3CX%86%22%CD%81%02(%1C%80%B4%AAB%C3%09%0A%11%A6%25Z%9A%02%40%81%94%05%C2%B8%2Cs%B6%04%00%08%25J%E2c%40%95%2C%99%B3%10%F4%19h%10%F4%E2%03x%83%C9%18%A8%87%20%C0GK%06%13M%00%E9xL%05%03(%26%40BJBgD%D7%7F%DC%A4%F1%D0%26%B6%9D%08%1E%3E%C4%B5%FD%26%EA%07%05%22%8Ce%19%9E%E5X%97%20%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%A0%8C%5DM.%15%E7%DC%9B%B8%A6r%FF%FF%FF%F3%E9%A5%5BJ%25%94~SS%3C%1C%88qHY%3B%1F%A0%B9l%98%ABc~%82IJ.%13ut%40eI)%DB%CE%91%BA%E3%87%AC%99g%8F%9DZ%89ug%B9%AC%A4%C3%F1%90%C3%B4%7C%95%83vfK9%A1%90%85Z%3D*%B2%D5~%D0%C8%C3mf7%7DgXqV4qYH%87%90R%A9%C7udX.%CF%C1%86%FF%F7%B0B!%0B%CC%FF%99%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%02%C1%93%11%19%8F%C8%A4R%94%F1%08%09%15%94%A1D%ADZ%AF%D8%92%01U!XP%8C%94xL.%9B%C7%23%94E%D38%BB%DFb%84%06E%82%9FI%92s%9An%17_%16%0F%0E%01%60f%7Bun%1D%0C%0D%5B%0A%09%18'%26%01%0Fe%86d%1D%1F%25%08((!%07%03%02'%A1%A1%02%0A%14d%95c%25!%03%26%A0%A2'%05%26%03%00%B4%0A%0Eab%A8)%0B%0E%9B!!%83(%A1%26%9B%9B%10%B1%01m)%BA%25%09%26%CF%D0%26%A1%B1%D0%05%A1%18(%B9%9B%87)%0D%9B%8D%C1%C2%90%9B%01%07%E1%06%DA%7Cc%24%14!%B0%13%B4%A3%B4%D2%02%10%25%DC%BAb%24%EE'%03%BF%A1%11~%0D%08u%A0%C4%A9me%F6%85%F2%C7%2F%E0%AAP(%16%1CT%B7%8E%9F%89x'%04%CC%83%C8m%19B2%0AO%00%D84l%13%00%8E%13%3B%A6%08)%E0%D9%B4g%AE(z%94%B9%92%DF%01%92%E3P%9C%2C%101e%99k%0F%9C%20%14%2B%89%22%40%84%13%07%1C%E4I%A7%12%C5%84h%D2%60%3D%3B%1AJ%01%AE%99%1D%25h*%86%93%18%D7%03%10%0C%5C%60%3A%86%02W%AED7%0D%3C%91%C0%20V4%CE%A0%CA%85%3A!%DB%5B1%0B%B6%9E%DD%CB%D5%C1%08%B2%7D%02%E7%0B%FC%26%0D%07e%84%E1%18%E0%B0%01%C5%A4%C4n%1E%A0%D8%40%00%04%0A%04Y2g%D1%D4%25%08%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%A0%8C%5DqV4G%2B%1A%88qHRA8L6)%FF%FF%FF%E7%DC%9BM.%15eI)%8E%B6%E0%DB%CE%91%93%C1%EFbaf%C3%B4%7C%7Dc%3Er%81%94x%8B%A3Y%3B%1F%5DVW%B8%A6r%94~S%89ughku%7D%96%B2Z%3D*%B9%AC%A4%95%83v%D0%C8%C3%88%AB%D1fK9%AC%99g%A1%90%85%7DgX%F3%E9%A5qYHmv%85%83%A1%C2%CF%C1%86WKH%FF%F7%B0B!%0B%99%CC%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%40%83%81%B3%19%19%8F%C8%A4r%B4%E1%08%0D%96%14%E1D%ADZ%AF%D8%13!e1hR%11%95xL.%9B%C7%A4%94%C6s9%BB%DF%E2%82'U%82%DB%CBiz%19rj%90%14c%18'%17%24%18nyud)%00%00%03)%80*'%03%8D%12%10g%88e%04%26(%22%12T%11'%0E((%03%0D%10%7Fd%98d'%9B%26))%14)%02%00(%AE%02%09%0F%05%0Ch%AF%89*%0A%25%9A%B5%15%08(%0B%26%07%9C%26%26%22%A4%13%BCz*%0C%02%01%01%0B%A3%9C%9C%14%0F%09%26%00%0F%A3%22)%D0%89%1D%8B%00%C9%07%1F%D8%A3%9B%9C%0B%03%03%05%E4h'%02%AD%12%E1(%07%01%A3%0F)%93%9E%89Q5%86U-%80%03%9A%3D%E8%87BB%00%11%15%1A%D0%13%A3%20B%81M%22%0E%98%10%15%8B!%B6%03%E3%06%F6%123-%00%80f%10%07%A0%00%20%20%02%02%07%CB%96%B1%9C%C8%20%05%3B%13%0F(HHQ%C0%DE%AB%9D%93%01%04t%98%A8%E2b%C6%83%93%18)%5D%C7%09%81%2F%82%0D%02t%3B%98%A0%9A5cV%83BRA%90%01%89%8B%B5%08%94%18%2B%CC%04%01%0C%13%20l%E5%3AR%CC%04%02%F7j%9D(%D8JK%02%04a%26%96H%01%B3%99%09%01U%E2%BAJ%60%0C%81%25%91%D1%22%BD%1Cu%2C%263e%CDP8%10%40T%05%84n%14%10%BC%DA%CC%99%B3%40%B6%89%A5%9DHq%22%C2%D8%D3%A8Q%A7j%7B%E7%0E%C1%D6p%D2dh%03%DB%0E%81%0C%20RH%AC%ED%A6A%0A%10%06B%F0%CCB%3CK%01.%06%82%00%00%3B",
        "data:image/gif,GIF89a%1E%00%1E%00%D5%00%00%DB%CE%91%94~S%F3%E9%A5M.%15%E7%DC%9B%C3%B4%7Cua%40%FF%FF%FF%C3%C1%90%5BA%25eI)%B2%AB~J%2B%13%BA%B6%87%B8%A6r%8F%81Z%7Dc%3EY%3B%1F%88qH~kI%98%8BcS6%1C%89ug%AC%99gfK9%D0%C8%C3%A1%90%85%95%83vmV7%B9%AC%A4Z%3D*%A0%96l%7DgX%CF%C1%86%A0%8C%5DqV4qYH%87vR%A9%A1udK.%FF%F7%B0B!%0B%CC%CC%99%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%1E%00%1E%00%00%06%FF%C0%C3!%B3!%19%8F%C8%A4%92%B4%C9%08%0F%96T%E2D%ADZ%AF%D8S%22e9tR%14%95xL.%9B%C7%A5T%0739%BB%DF%E2%0A%26e%82%AB(%A6%85%5D%95%A6%C3%1F%11%0A))%06b%26%25ad%7Duo%25%10((%00%11y)%01%03%85h%83%8C*%0D%0C%83%9F)%23%90%05%9F%17%91%0A%25%99~b%0F%0A!%AF%B0%00%90%04%B0%90(%0E'%AA%9B%9D%A0%83%A2(%22%83%05%02%10%83%A9b%8Bd%26%AE%B0!%B2(%B4%CF%02%03'%08%BAc%0F%06%BD%A1%90%C1%9F%00%02%12%09%D6%7C%9A%86)%22%E9%EA%22%0E%90!%EA%05%B6%23%0F%C8%E6*%0B%A1%23%FA%FA%22%90%00%01%A3%F6%8D%18%40%AF%DC%AA%7B%25%D2%C4%13%40%40%40%80%14%ED%22%0D%3AQ%E2%C3%B51%0DLP%60%20a%167%87%04%08%88%18%D0%E6%E2%BD%5E%11%230%84%10%C0T%A4%01%9B%92%19%1A%60%AB%A6%AD%10%0E%02%F4C%11%E0%98%C1%98M*%18%3CC!%A0%C0No%83%04%F0%F4)S%8C%81%11%22%14%3C*%40%13X%BF%A2%01F%1Cl%AA%02%01%87%14%0A%94B%EB%06%F6Y%08%98%26%BBr%88%20%8B%80%84%08%A3N%18%18%40%00RO%93%0B%18%8C%60(!%C5%89%14%EEr%3D%B5%CB%D4%1E%9F%11%0E%8A%19%C8%08%18%C5%85%5C%08%12%8C%B0%14%D3p%83%04%09%264%10%83%80%C1%80%14%0C%F4tM%08%94%EB%19%04%26%80%BA1%BD%A7Q%0A%0F%25%5B%DBI%E0A%03!%D9p%B4i8%00%22E%85%2C%C0%B3T%E0r%20%08%00%3B"
    ];
    var groups_img_recommand = [
        "data:image/gif,GIF89a%18%00%18%00%91%00%00%FF%FF%FF%00%00%00%FF%FFf%00%00%00%2C%00%00%00%00%18%00%18%00%00%02F%94%8F%A9%2B%E1%0C%D1%8Bt2%AB%9C%DE%1C%9F%DD%04%C6%E3I%22)%86ju%A6(%A5N%AF%D7%D5%F5%D5%8E9%BB%BE%BC%BC%8B%F8f%A9%8F%EDX%82%C1%80%C6%E6%C2%02-%960Q%93%F5%BA%D2)%B7%DC%AE%F7%AB(%00%00%3B",
        "data:image/gif,GIF89a%18%00%18%00%91%00%00%00f%FFf%00%00%FF%FFf%00%00%00%2C%00%00%00%00%18%00%18%00%00%023%94%8F%A9%CB%ED%DF%80%84LZ%AA%EC%C5HO~x%00%18jd)%05%C1)%A4%EAz%BE%2F%2B%ABt%0D%83x%CE%ED1~%93%05g%24%E0%CF%C6J*1%05%00%3B",
        "data:image/gif,GIF89a%18%00%18%00%91%00%00f%00%00%FF%993%FF%FFf%00%00%00%2C%00%00%00%00%18%00%18%00%00%02%3F%94%8F%A9%CB%ED%08b%7CJZ%40%CF%B5Yl%D9%7DF%90m%08I%5D%09%EA%A8k%CA%BDO%2C%B7%A0%C26%F4%09Ox%8F%F9%CDv%23%A0%EF%90c%88%90%A5O%24isv%3C%D2%E9r%3A-%00%00%3B",
        "data:image/gif,GIF89a%18%00%18%00%91%00%00%00%00%00%993%00%FF%FFf%00%00%00%2C%00%00%00%00%18%00%18%00%00%02H%94%8F%A9%CB%ED%0F%01%80-H%BA%82%BD%D8%E8%CFa%1F%18B%A3%26M%9D%E6m%5Dr%C6%A3%23%D7U%7D%960N%DE%BC%CB%F8%A1T%19%A1%0E%C1b%09%94%C3%DB2%D0j%1D%0FI%E83J%832%ADJ%E7%D6%F3%0A%8B%05%05%00%3B",
        "data:image/gif,GIF89a%18%00%18%00%A2%00%00%00%00%00fff%99%00%00%99%99%00%FF%FFf%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%18%00%18%00%00%03bH%BA%DC%FE0%CAIk%1Db%D8'%FA%E6%DA%E6-%A3%95)C%AA%AE%AB3%B2%B0%EAjq%1D%92%02a%07%3C%9F6'_%AAG%EC%DD%14%9E%A2%928%23%2CW9%88%A7C%ADR%23'L%15%C3%3Dqr%D6pu%96%A1%02%00%D1%B0%CBzF%83%3B%E7(%C3%0B%8F%A7%05q%89%189%C6Z%E7%25%1F%11%09%00%3B",
        "data:image/gif,GIF89a%18%00%18%00%A2%00%00f%00%00fff%99f%00%FF%00%00%FF%FFf%00%00%00%00%00%00%00%00%00%2C%00%00%00%00%18%00%18%00%00%034H%BA%DC%FE0%CAI%AB%BDX%8D%91%DB%EE%8D%00%80%0B%20%90%8A%88%12f%13%BCp%2C%C7%EEl%CB%F5%0D%03%3C%DC%F1%23%14P8%24%15%8D%C1%95r%C9l*%12%00%3B",
        "data:image/gif,GIF89a%18%00%18%00%91%00%00%FF%FF%FF%00%00%00%FF%FFf%00%00%00%2C%00%00%00%00%18%00%18%00%00%02N%94%8F%A9%CB%16%DF%9E%0C%0AFjS%96%08%FA%09%82%C7%C4d%0ByR%97%EA%84b%C7%B5%23k%0A%9F%8C%DB%2C%FE%B9%F1%2C%DB%D0v%BA%E0%10%083%22%8B0%8C%D3W%7B%09%1B%CC%D2%CE%24%84%BE%AA)jMC%04%7B%C3%C9%0B%F5%8CNS%0B%00%3B"
    ];
    const IMAGES = {
        rel_interstitial_loading: 'data:image/gif;base64,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%3D%3D',
        bg_status_red: 'data:image/jpeg;base64,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%3D%3D',
        btn_all_departure: 'data:image/png;base64,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',
        mode_jinhari: 'data:image/png;base64,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%3D',
        hd_joinattack: 'data:image/gif;base64,R0lGODlhqgAQAIMAAEAWAKOPfHteSsrArWdGMvLx3VQuGranlI93Y97YxQAAAAAAAAAAAAAAAAAAAAAAACwAAAAAqgAQAAAI/gALCBwo8ADBgwIFDBiYoECChggjRnx4kKLEiAYvajyY8aJChg4hbtSYYOHIgQc6agQAQGRBATABGCBg4ABLmQcCIDSgU6NNBARtCiCIAACChhQPCGA59OTKlhxhLp1Z82bNnk4PFiUgMYCBowNZalxo0wDCBAEEBABAgMBRADHXuiywFKhHAFgLCCWYwADLBDZvEoBpkm9KlQjJyjybdm3bt3GhrkU8lqWBuQOnHmaZUoCBAQOkTq0rEC3KmzeLpr3ZdCABABkLExQbFG5F2HptXxzwGrXdAqGlyiTtEGtg33iXMs0NVS8CmAEw+0Vg4LJEAc89yxwME2hKzgP8/qI2WpCtTJaDgVcX4DIBzoYGWgt0fDjlVrd8y7fmLbJsgNcCAIhSYAeENx55ub0mXnrhxdeQY8AdKBtdtvWFF0HQYXhZWxOKNYBY7gFQm4LooWZWacApJ1NJugn0mlKiKUgYQsehxlWE1i21EHECeQgibeWRaJ5VmeEGmFA58bVUaxYSYJKFCn0nQE6czSZib1TKd8Bg24n4YZURojaAe0MVFVuV/bU4UE97AekiAAu5d2KIVhaA5VpacjmTlzd1VB1BAVDW5GF4imddAtyZiN1fYbWEV1svrnngcKxFR1d8ulW4mJ2ckamfpJYVMFkBbnoq6oVvdvTXo23hNt+k/pgyFZ17v3XFVnCiHaUaQ7AFGECcB4DVaAIIBBtqRLY9Nxhvmzako0O6LRXoeQbhmZt811JokJs29eQXQZH22FKxRW2KULIBKqRgbjlNyFdDBR40pkNEiSgUZ646VOOvLOVVWk4wiccWUryeuJdzDYXm6nQHnzbUt6SKeJpORdVKG2Co8YuqYWlphx7B3cI570WTsiSbe1zdC5urX8rUk3LWBSWarP+5tJZdoyK0VEYBeKfmtR/a5eaHPJl7Klct85SQZXPBGBNcAdRcHlt0yTeyuAe5SdOFKtvkJwFYTeVXzAnNDJdUBIjkV0+vuastRz8LRVOjBwnc0VrNzRS2vkxjuySacjFCVGW5eyKIdZ2nQWUmvvbRW+RlFtYUZslWJcyWX+tGtDPc8v2HXmEwVUSTQQNQNzBIjz80NumUm9jQazeWKxjidCP+WoheP8eXX/vdNOF3EiP0WnR9Xpeviq0Fthrl7j73q0RQDtTy74FBP+VJlB90u9cR13iakxxJrv1N0FuakttLy6acSunp5bFvWX3/u/jgkh8/ssH3eGJmYLtaYALKqRX6LnK++xkwPwccyQAlUsAEOlAjAQEAOw%3D%3D',
        btn_gojinhere: 'data:image/png;base64,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%3D',
        btn_butai_save: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAAAZCAYAAAAmGVxfAAAACXBIWXMAAAsRAAALEQF/ZF+RAAAU1UlEQVR4nO2b+XdVVZbH/Se6VMqF/0Cvsgr1B/2tV3eV1SVjlcFyKHFgnoSEGQzEhCQCCbOgTBnRJDIjCATCpARxQhCZRUHDkLyXl3lk9/7sc897Ny+o1d3Ub5y19rr33TPts/d3D+ec5L777rtPPD322GP36B7dVQrj674w0O6Ve+VulyTAJYBWfbDN6NiBVvm40lH4PUxH9975e7iO58/Rr/W9N+7dG/eXxgrrGbrbGOgBOA+0wx8lGOU9mQ7tbok/oaoPW+LvyRSu4/3nyLe5N+6/dtxkupM+vZ7/FRiIA86DLczkgR2/TpXbfpn2ben5fify9f/XcSu3tsj+7crzDke8852nfd+ZIP+tF4Xm9d8Y14+fzC/1B1VGB3c5OhCa9460NTHP/m13Htf3D8uBbwdC/CfP88/K19a3MyA/7h3kzXsPsO7sSf8fDPQCm6/wjO7Z9Ou0+4Nmo/C7p482JSi5LpmSx/X99m5u+dkx9mxulqP7WuRmTZfcut4lJ45gfU5Q+3c0G4UFZ8LZ3mxU5YWvdZ9oiPjikzap2uWV0iynP293Rqfv+7bp/JsTa9m7tVmuXu6Ub79qlyN71Mp3tarcHD9hOdCHtszHuKe/aDdwev7ow9ieJ36HQfjxvla5+VOXnNF58DT0pd8+3y+gfVvd3MkyMl63NMspXcs3Ovfxg24M5tqzxcnWy9vrHrmYEe10BtUD6NvujItfwoCnXmDb+X6z7CrvSf5b+PlLtGNjs3wY9P3oA7dYiPc4VWjbMm1H+/dcH/rSz4MIAcatQxXg+9IH4v2IKqCt5basW1Mu69eWS3v7bbn0bYecP91h66m90WXU1nrbnuQPgNL/boh123t7221rX3ezS6qrWq2OQt1nR9tM+Hs2Ox72qAJv/NgllXuPWRv6fnmszUC+b5sTtslO13fy0za5oWC5VePm8u0vfNMh577uMLCe+bLd6pkLMABE1guIW4O1UaK1DnRnv26Xb08m+rEewhQg3V0R6EBlun2j4+P6j109kvWLZzpsbOZAzh6UX3/abvMx9rlT7fLj951x2UF8O7gbr6jjVvw6BvzTv/cC27bSZkclzfH3rcVNP/sObS7s+dxW0mRAaW3ulvpIt3kdBINl/XCp0ywVr0EbwLWttEm2aD8YQtBXLnZILNIdF44BQwWKQs2CNzkvcf1ap8Sirp3f6Xx36Vq839N/GSob1pdLwYZyGTVyshToe4eC8UDlMRk5PNXqMjPytS5VqvYfkwfu72ttaXPpwlUbb9SIVPt98nibKRq+SZThacTwydYm6818my9yq0vBHyiwokm+qm6T82evGlg2rCuXN3UuG1PnSy7Uj3htsgOu9jusYAAUF89fi6/tToV+GFldaO4Py5oUbMizyYwEY5yX7uYe0D/F+rEOQIUhAR4iAmXuG3nxsZETMkN2o0ZMVplcM57wcgB0+3sJDISxkIwH/60X2CrWNcl7qxslf25ECpfHZNOGph5Effh36duNsnB2RAqWxqwO2lLUZIJfs7pcmc+XDYFlUvZ+dEzWvVsmF5Xxc6c6zC3vVKa3KVNfahij4DHmpefJU39Mkb/8OcWUU7jOjYHHqj7gLH7tu+U2dpEKxCtkY3GF9OnzsIwbm2a/SworrN+DD/Y1uqxgLAjalxSWa7tUez90sDreh5I9P1/bP2ztKRgOAET5vowZnSp9tM2RQ9UyVt/XKy94RsIdORHeK7l8d/maHNa5ChXUUHFBhRTps98fnrC5R49y4AYEjeoJkcP9agTww7pKiyqM7+ICR77fwQPVanxdGrab5NLZDvn6RLt5qjNq4OjCG+SgQUN78VSn3uvUZ+32/vtHnojLctDAofJoP/e7/9MpcvniNfn+Qod5UTwmevaY8LgI46F8TZMRdTx7gW394gaZP7U2TuvyYvL+u409aONqR4XLXdvMNNd2zaJ6q/9gfaPzbAqIjLl5xmjSoZ488EBfm49F7lVrJF/CC/zu359Qj5FqVo6nQdlO8QoW7YPCvzvfIZFaJ0CAc/DAsbjg+vTpKxMmpMWFW1pSLm/lOkWhaEqxAtDAVuSAOXjwswZS2g0ZPNTeqc/Jzpdx4xyg6HOoqtqU2//poTJwQGJNjz/2pCmmKuAD5eLJjT81EsDBmO8pLxPGp8pgVTjgxju2NDnPTH8PdPqzRspvftPXvK9T1JO6tp5ekbE8gIgIba3dsnf3Jz3aVO2vNh4Y/7cqH9Y4YICbDyBvUM9IBCLqULyBwi9tilVOnZ235dqVDvnsY7cLJXqVremNh5wZCey8s6DewOdx0wtsK+bXy5xxN43SJ9RK3pyIvLswJsUrGnvQ2rwGeTu7XuZNrLV2PH1bJsZt+vMVLPjRfk9Kdla+KcyXhvpuAxnh6cK5a/Kbf+trYYGC1/DC79KFEh5Ruvc2NVc7zfKxaAOOKhMwmXcrrYiDjXcEfORwtbSod8JDFQeCR1GDB/e0dH779skFj8McxUXlBlKAk1xYH+ulMF+40Jc58YReeQDEg8avN1rXbWsDqBhckXowANUn4Ku0pCJOAH1I0hoe+V3CO2GgABkCrFCpygoZYECFGyrMY/1wucMM34O8JDA42lLg5/zpdtuM7apwYXHjqkYDE3hYs6hBVmQ5PHjCw72zICZFyxuNeoFtnYJocXpUZoy6KdlT64xmj7kpSzOiskG9HrQ6NyZvjLslmam1sjyz3upplzvdtV2RFTXUk/xePH9VMtJdHoAlR+u6DCgs7uj+ZvnquAud96sFkx/5gmDHj0mVri5ViiaqnR23ZewYB0AEFS58m6DhMDdnsYxXAKDMKwHwJqqXQyEoGm/Y2tId92zmFQYOjQPh8ceftLa52c6TMEYf9ahDhgw1Pmo0RwT4eESvCDwnAOjudhuM3ByXG+EB/bgeGCgQKi3uyT9lUAhsyAkAjNb0ASMLGxNzu3kdGYAefdLkNTgUIlmjTwHgD8OgrfeCyKGxodsMHsAf/KhZPtO8jZyRHBSjZi7Hb2IsNiclq+ulcEVMSlY2SOGyBgMaeJirAFsyN2oYAAsQOAI74MoM4ZFHEmB7R4EELc+MSZaCacqrN4ymDr8p+XOisjIrJtOGu99Q+vha+zZ/SsR+TxtxU2arV2Rr/emRNvnph05b0FndyeCCv9Ak/5Du2ra/3yAfFMXkqlo3uV3YiyEcS/ZVuIDz9Bdt9sTrGUjUkll8iXqYsEDGj0+z3wBoQpB/4dlcuHQhuTMEFt/W2mtf5qUdRB3KAWiAt1nDXa3mY5cD5VPHd4DJb4Du+zIevMXBVux48G0HBR51oIYyn7v53IgSi/bcPYbHz9GUwqcDfg0GqEPOEwMWjKKpwXlV+ACE9PG8US586zYIn+xXT7WpUXXVYp74qT+59KCfRiIn33KLSIAPAyLXPnG0Vd5+K2JhclVOTGaPviXTRzg8zBlXa9jxePC0aHbU5n3ooYdCYfTNmNH8tDoFW51MfPGGUerLNwy1qzTMMjDfJr10w8CWo14tZ1qd/U5TYJatj8nZM1flguZgJ0+0SuXOJtm7rcmS162ljVK2rkFW5kaUYcfAn3WB3hNQzMMombI0IT1S2Sz1qoB5ulMKu3YKHs0L3wm3wnI8r4yNJU7p3lNam+LyuKI88LwyAARP70261aM1NXabAi+ptyHXxJP4Ami8lwyHXvoAGsYN83f4kMvrLISHPBEg8r/9EQn8ev7w2JZHznf8lQZhDqPybcgvMdbz37QbeCjkl8UBIC3hf9TJ+expdrxq9O81yoFdzaav//yPZ2ycogLXHvBhZOZpAyP7w+9d/x1lhFD1ahomZ46+afiAwAPYmT+lLv4NZ5X/htP1ww8/nADb4jccmMY8W2MNM16vlQkvXJcFMyKydG69LMuol8Xq4QDWTHWR0LjnagxkWTrJFPV67IZWryiT9Dl5ZmGfHHDWU7Ze43pORFZkR6RKF7i5pMHc+cjhk81yKIQGFoWlRiNdcuLjFjl+2OV+fqeE8girHlB4GQ8cgOABGc7fwjkR1urB5L3Ngpz8eE7lwcY7yiP84lk5CiAHot2VAJwebIzFGd9PmiJcOKNe/FirHcvgtah/S+fxcwEQ71Ep5G7M44tfG8BADubZAiMArB6ofPc8eM/GWEcrW6RyR5OBheMZePY7bS+Dy+fbpWxDzDwUBr1iyftW5/NNXzhnu/it2+wM6J+QIfkbm4T1i2OybF7UsDJLw+ecsbUy/oWe2Fk4y2GH0q9fvwTYpr12U0YMqYnTxOdvyFvTopI/uz5OC6fXS+4UzeuG35KRf3PteKYNuyHLNT6fOOx2ljBWsK53fhIuuH2f5CM0202OdRZ6+ss2uXSu3QDJsYKzunJL8qO1ie18OMn3yvd1C3MXm3ezEPeg2wEnvEJqvD8AArTjx6XF6wHuwIEuZAMALJzivSDPjYFxsGloa3NJ/1fHW+XTQ612DMJOL+yN/S53oIHNnXlxE3HlQmfc+/hC4u/XAy8+ZDIvYd/vhCEK3vSL6lbZXtYgRW/XS+XWZuOZHTtyC8vq8N5mKVhRL9nTamVneaPpa/8+B1hkQPoAoFk76QMFh8C6DWynOuzIau3CBlmS7vAwc+QtGZ1SY46KZ6o6pEUzEtih9NggZEyMKHiuy8v9f5JXB9bI3HG6SUiN2mCAzhPf5k+OyNhnrztg/rVG+9aZ11urO1KsKiMIe7heDlif+uMz8qf/SjGy44/gaINCQsvixgeh4FZwgs+51n8/lWJtC1VoeErO2q591xlXXvjsaEgS2PBsgM3nWA5s5fFjEQrhD2X6et5pfzjwKnYOV+WOKgAUvIZDqQ/VYQP6/Gibnex7sJUEmwIHvHID28AAbL74UOULfHnPxnzIx28G4jtvb0hBTsrhLh6rdFWDnZdWbm8xvjkeoj1nfPW6292ztUmWZ9dJ+oRbslJTI25NyK05JvE8sNnpE0Qcf3xFVADUJzTabCpoktWas+XNipoDyk6LyJiU6/La4J9k+OAayZoUMayAHfDSG2wTIvLGmDp5bVCNzBxea789ZU2KSubrUXv6d8A56pnr1odvuVOjFmo5OeacjTyHcyJcMATo/DlVdma+CYgbhcYgocWDfH/RAYmT94z0fBMAhbDEqTz3hdxGeOV5qyeUAZIeYCtJ5HcIkxzEW7nfHZIH+UNdn6jnBHkfIIPYWFzW9ABvBT/eygcH3seOJh504ZddJICjrffIjO2PE3gODM7V8GQD+zt5MKbfDFA8iEjQ3U60PO4Z/e41fOTDbp15uV3hqGGt7hKPqqwunLtq52msu7nRyXBnWZPkzqqThTMjlk+tXRSTvVscMOEfkPmUxG0YnrBTAIB28tN2a8tONH8OIEtgIhkPYaz0Atu8cQq2URGZPcI9w0Rd+hhH/p1nMjH5yqx6KV/XaF7I74ySC+Hwqnqozz9uszM5/xcUXIf4Q1HOdwAjW25Axt1kxfpG2b6xyfoDSMIwQkIQ4eJ3YRyScprPmR53mlWV1TLg6aHx3SlGQU5G4Tpn7Jg0+05oAzDcP5Ia+ItwPBaFKy68XJhQKOW7c+5+FkVzpMNceOw4cPU3NwdGBYmnr+eQlTbmUVvcdV1jLLE+vgNUjkb8vW6HGip3seRS774Vkw1L3HHDnOl5dtXUoMbqr/yKljdYfp6dGrEItWhmVNZoREK+Pl1ILsxPf4BWvLLR8jC8V8b4nvoPYwQn5b/3Ahsgg6a/XGc0a3idzHjVPSHqwu93IiaaPzlqzLAovBwX8SjK/phun/tbKf6igMttDgg5sylY4s7xCpY26O9Gu/74sMxduHOxXLamyXKEZfN0x5zprtI4s+N4BTBUV7XJqRPtdn/nT8N5crm9b4u774UXrnUMEOc7DOjH9ru/0zp70h1oojzuDjEA/giAO9tNGzi8bJDCpS48UXftSqdtHgAGFAueZ7/usPFY28nj7aY8Nk2MCdi5SsJL2sYj2Hz4MQA27VgPBsLauItlPOSFEXJd529QftB87yudgz8+QKZcxOPVyKMIYfxVB94cmTDG7vJmKQ7qs9TbzBlVJ3NG1hkYcjTcrcx0t0B4L/IyZPT9RXfgy/jctyIDjsHeJAqOvjMGwuSdVy+wTX2pLg403n+JfDvACPnvM15xYJw31sXsZQo6LG19foOBD2DxXJ/XIKuyY+aKWWjW6xHJVDdMfF+g/ZbOq7ecgDbLNTSTG8xXS2LcTG1L0slh4XvvNErFuuDqZFWjHShzbwdItpc22/c1CxpsDAg+aA/wACzgKdKQwGm49eMvJkrdCTn5J156ccAjRrRwetR4oj2Gwjy7g79wQdmMQZ0/BGd8vm1V2qLtP1jfZPkOHggjwqC4a+TJb8aEZ/oZveOAjrwwSBuvMNGXe2XWw0k+cs6fHTU5AiB4XbPQyYh+1OPFAApA83pDZzNfc6DLm6Vy1RBcpjxsLnB33fAMSN/OipkcANn0V34eA/67r+PZC2ypL9T2oLQX64z870nPOXr9WfdMbhP+PuUftcZQ+uiES0UIFsMnut+2YF3k1GGMUyuTn9en9auV2SO9S3aC4Bvtprzkxp0beNAFKtCFM1y+mJPmAL5IgblYrZdQwe+5CtBZI+rUyuqsT54CdYkaAf3mp0YsHORMiRioVmbGzHvSLyOw3pnDg/mZW4UHT6QLKG6ZGgWARBH0deFJFTrRjQt/jLs0PdjNax8MZ4m2o++KTEfL36w3A6MuR8cm4c5VnliXH4+QBb+0IXIsz4jZc+GMevs+Tzd0yG3ay06Gc2y9kbh8GGOWrSUBBq8/5I98kRNgpD3rM56D8Vk3Y6e++M9hwNcBwDjY3HmVA9z4v9Uajf3rrfj7hBRHvDOYf/e/PQD9t3C/SX93IPJATQatHzt5XPrRdvJzQZtnEnUTh7oxAXTC2waL49swFcowJ9RpKlDaTkxx/egDeADw1H+ogJ53c/CcFqQO1NGO7xD9PJ8Q35iP9uYVXkXJdaZc3tNeSPSd8qLjwVu48Tos4Q2Yy9KVVxLfmBt+WA/z+LWZTGzdbn2+/bRhIbn+3fE78Vk3P7zQlnltLSkJnXmATApkjM4npiTmcU7DrSfe7pn/PQZCQHNgCwPuXrlX7mbp9d9VYcDdo3t0NymMr/8BkSJsw1+I1NUAAAAASUVORK5CYII%3D',
        btn_all_breakup: 'data:image/png;base64,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%3D%3D',
        btn_all_setting: 'data:image/png;base64,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%3D%3D',
        wait: 'data:image/gif;base64,R0lGODlhEgASAMQaAHl5d66urMXFw3l5dpSUk5WVlKOjoq+vrsbGw6Sko7u7uaWlpbm5t3h4doiIhtLSz4aGhJaWlsbGxNHRzrCwr5SUkqKiobq6uNHRz4eHhf///wAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAaACwAAAAAEgASAAAFaaAmjmRplstyrkmbrCNFaUZtaFF0HvyhWRZNYVgwBY4BEmFJOB1NlYpJoYBpHI7RZXtZZb4ZEbd7AodFDIYVAjFJJCYA4ISoI0hyuUnAF2geDxoDgwMnfBoYiRgaDQ1WiIqPJBMTkpYaIQAh+QQFAAAaACwBAAEAEAAQAAAFY6AmjhpFkSh5rEc6KooWzIG2LOilX3Kd/AnSjjcyGA0oBiNlsZAkEtcoEtEgrghpYVsQeAVSgpig8UpFlQrp8Ug5HCiMHEPK2DOkOR0A0NzxJBMTGnx8GhAQZwOLA2ckDQ0uIQAh+QQFAAAaACwBAAEAEAAQAAAFZKAmjpqikCh5rVc6SpLGthSFIjiiMYx2/AeSYCggBY4B1DB1JD0ertFiocFYMdGENnHFugxgg2YyiYosFhIAkIpEUOs1qUAvkAb4gcbh0BD+BCgNDRoZhhkaFRVmh4hmIxAQLiEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6aJJEoiaxIOj6PJsyCpigopmNyff0X0o43AgZJk0mKwSABAK4RhaJ5PqOH7GHAHUQD4ICm0YiKwCSHI7VYoDLwDClBT5Di8khEY+gbUBAQGgWEBRoWFmYEiwRmJBUVLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo7a85Aoia1YOgKAxraShMKwNk0a4iOkgXBAEhgFqEYjZSQ5HK6RQqHJWDPRi/Zyxbq2Fw0EEhUxGKRIJEWhoArwAulAP5AIeIJmsdAE/gEoFRUaCYYJfoFRBowGZSQWFi4hACH5BAUAABoALAEAAQAQABAAAAVloCaOGgCQKGma6eg42iAP2vOgWZ5pTaNhQAxJtxsFhSQIJDWZkCKR1kgi0RSuBSliiyB4CVKBWKCpVKQiMWmxSCkUqIQ8QbrYLySD3qChUDR3eCQWFhoHhwcaDAxoAY4BaCSOLSEAIfkEBQAAGgAsAQABABAAEAAABWOgJo6a45Aoma1ZOkaRxrYAgBZ4oUGQVtckgpBAGhgHqEol1WiQFgvX6PHQJK4JKWaLMXgNWq7GYpGKJhMShZKSSFCH+IGEqCNIgXxAo1BoBIACKHkaF4YXf4JSh4hmIwwMLiEAIfkEBQAAGgAsAQABABAAEAAABWSgJo5aFJEoWaxFOi6LRsyE5jhooidaVWmZYIZkKBpIwiHJYklBICQKxTUCADSH7IFqtQa+AepgPNB8qaJGg6RQpB4P1GV+IWHuGBK9LpFo8HkkDAwaCIYIGhMTaAKNAmgkjS4hADs%3D',
        panel_rollover_pink: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsRAAALEQF/ZF+RAAABPUlEQVR4nO3bUQ6CMAwGYE/C8TwxKHgYp0ZnYLZbN7Y2uP/hjwka7Wfb8cTJOTc8c+okg3UB6jEvAGCAAQYYYIAB7ifmBQAMMMAAAwwwwP3EvACAAQYYYIABBrifmBcAMMAAHw98n9zZ52/BX+SFz+HBMVwqhwHvQZKpPPb6yOsq62sJtF8HM3CyyB0dTWZ8pzl40x2qUxrokU418M/ozY2gks4Kkw1md24OYtVlaYjOyw4eCpw73rHP+9f1vXpycXjBHybrMFc4hZBMRqvDjkn+Dqe+lBv3VxbmeukqCDtd75TmwDHg7XM9fE+yDhSsAFnnPhzr9MLEY8PVoJAF49oULMKHyd1hAr631irgDZ7qUM7pWqmTamCy87m3lMpINXB07BWRJmAOr/3bJmDLmBcAMMAAAwxwAtzVo3gPOnSIPDelmfwAAAAASUVORK5CYII%3D',
        bg_information_timer: 'data:image/gif;base64,R0lGODlhfAAjAIQAAKeBHuTBHvv2HvTkkvn0ot3Ne/z4rculHvfeHuzciv77uLuUHu3NHv79Hvfsmvv3qeTUgv35sdizHv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAAB8ACMAAAj+ACcIFAgAwMCDCBMqXMiwocOHECNKRFjQ4MSLGDNq3IjwQIOPFT8e4EiypMmMDD5+DABAZQMEI0/KnElTQkqXKhEwQMCz586fOhkIHUqUaICjSJMGkMC0qdOnUKNKnUq1qtUARXtqBcq1qFEGWJWKtUq2rNmzUZMO5dmAAAEHDh4McEBAgVsCD/DqfcD3gQO7du/izduXcOAHdiO8pQv37QC8dAf3FUyX72C7hAnrpYt581zKAwYkyPsUadYGdEP7ravY7WoCimPDrpt3b20FhevijYAb71y/jd8KX205suC7lge/VayAcWe3wY3DjVzatFC2CaAbf6vZsHbdESr+u+YMXreCxJAfO/i8HnhtvtKHV8adPPd74gQSTIcbei7c6kethQBq/ulm4Gy4RaAgXH7lRV9ybik4W2uAjRfadMAJ5qBc6g13V2vBMadXhLqpN92Fc/UHIFbXDZiXcXwdhllti+FVIXqJiahABLUphphj/sXVmGU0hlbjiHHRKBl3P9r1mFufObbff05Zt1YDr901I2K5CVeeiOUhKGFrzK2nH4MvSlbcXXFtFlljbeYlomJocghdigSkuOJ1O6H2Jmy88aYmdNwFhhmPrum1o2yAgtjflNxRJp2SldGoJHqu7eill4yFtmeLfkpJl4KtTWYcnSOeVxhfpE44m3b+6z0ZJXTwtbmdliMe2FuaD4Rn62rrmTnApzu5KKleYBK617IKEomYbJpGul8C7EV22HGJasameErCV6tymy021wFLMWXldVi62RhzvQXnrIPmFaYgptLuJ9pcEHwWGLaEMZYncjEu+VdyT763rYpVWqeTi+fVGNeitE2HoHLhATpbr83+6PBisWYHwXSIYthgnFDS2PCBJEZ6nF1tipYAsWwti+xhSjKK23rgScgqhRznGSR/4dZXmL/SravmkMJBKl67CbyccICg1pfds/C2lmhgVufo47OsOTwlnCS/Gy6szgWaKGRJS/xabg443dS5fSo5taW5PijniLFB++r+i8GCDVnYk52ddpuAsgyleBw31llmd326cFtDh2nedpP1tSPEzDHKIdg4n8hyl7myWV5i+v2bZoFEe9vgAzAPSOLNkVlGn8MVZt4saxAT2jeDSbs1WmZCM+5aj4JGaVmKSh+nWeuQM54khGkOT6SrvC3KYOwXSiyadgP8GNvzwmeL2X7v8s7YkP06AAGAp/VqKHHQd8fshOwqNlrisSLXeWpqru3W7LY5nsRi17vHBEl/BCiA4+KGnB1VajGF2RKrWHM3CUWHU9RiU4pe1L3IAY9lxkFPtf7yndT0LWmBcZu5rMQWQYnIWcHR0KpelRgQ+kZ0/EmS2vxTMP3V50j++4IVkqbUoU3lyQHME1SmQpaXDu4rghGiEG9w9jls+ZBjfDESzpQVtFeJ7jHFOZ+4OsUkKr0Nale6nGAEFTuufciLsTmPr4pGOMdQZnx3glDS4DOYKcbwSEnrj9c+k6YFDmhRoKOV9141qg+VqT/ZSZwQRfc3tU1PM4/RFHCQJhxCPko62SMU8wCjx/9hLY5KQtIAIFCAAkCgaeeD05Mok7bDrWo71kLOcOSynztRxi9GEt0oKZhK2ASnQg5w4Vuadi+kQWpWlEJRrOLUIME8kW+1yZ+9lBZD4LCPKFrhCVcW5hWhsGgoYgnQUaJCrgNIwJ1vQ0tp5CmBcpkLnvYtNGQ4yUnOcprzn+lMylTySc+CGhSfLETAAmjC0IaSBAALsM4BLOLQilr0IQEBADs=',
        panel_attack: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsRAAALEQF/ZF+RAAAB2UlEQVR4nO3bv0rDUBQG8CwuOjtZioNdnQsV6ugDWBB00k1wKIIuToKTFHFx8wVaOrj4CLU4+AwlBRHRUrWWWmuO+VJuTZP+kWJyT8058MFNbnJ7fjdZMtQgorgdIyKJ624g9GhvQMACFrCABSxgAUcn2hsQsIAFLGABC1jA0Yn2Bv4N+HjBoCDDCoyGrMJpoJkUHQiWdrdDySToYMDpVChhA7YS8+NzckTW+trP8coyWXs7ZN3dknV50Z2/vupmyBpswE9z/jQOs9Qq5p1gjHrdyvTma4kYuatTNaldLvXG9dWkb0024Lox48tbMkWfpRsnrdwZeQvXeAvXonD9oDVZg5F2vuBEQbAJCvsSW3TmvkyztykYozA3tWAgVNQTV+D3zIYDbWb3fU97EJo1WL3SgAKuXmvg3BviLdzD/gnfG7O+NPNF6phVesudUy2z6YwdsH0e8w+xJfoolX1gFO4ZtCZrsBuuEEACjmCMjVBBuY9Zgyt2M8PyiOaT6b5z3uPn7AE17I0ZtU5lWsB/GRbgsNBsPh7c6HEZB5qaz8PfZhQ0qN9kBQ4Syg4cBpYNOCwsC3CYWO1gHdHegIAFLGABC1jAAo5OtDcgYAELWMACFnA/OFJ/xfsGT5P1UQyK1z8AAAAASUVORK5CYII=',
        panel_meeting: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsRAAALEQF/ZF+RAAACP0lEQVR4nO3bP2gTYRjH8axaKIhL71ICoku2/lsERa1CtTmzdApFXNpqBVu0o7ZWcbNFqAgtujh1VImUVhCsU5DoJkIVxFqTC22kY7ef7/MkFxpooxbv3vd6T+DL3XvHXd5P3iSQITEACVUsIiV0TyDwtE9AwAIWsIAFLGABRyftExCwgAUsYAELWMDRSfsE9g248KwHfmYUuDohXx97RfuE3QykvaB9Ar8JJGPAW+UHDVtevM5VxlOqadVDLC/dwNavGdUjtT+GkeFT9deq41x1bAy48DmzS/348LZPPWuM+/guA3dlCKUv11D6OoqudlsVR7o3qbatsFua4PQkuOz8eax/u8W5KwOV+xkD/n5hx169OAnbOoirg0k8mT3N6HuTJ7BRGEG5cBP373Tj9cvL+PR+lM85vRY6Ow4hnzuL4moam2u3ufXicOWeJoPnHrfXVnZ7XZ0tKovBcbsZcau5do6whLatA3XgDXfMfHA+d0ahO+Ck7GpxXEy14u5EG0prGZR+XsJC1sHTuXOMTTtHGUv7+Vy3ukeKV5YKBdhbZVo12lJDA0cYVVx1eAWvDB5T5w8zkl4MD+xd7/7o40IP9t4BhKNj3tYD0372+fHafULxGd4JPDme5Dyw9yVF52hMSDpG0Xj7SocC/N8TsAbwv6DLbnrX/MD6Bq6h/1BDcJh+Hv5tjaB+PadRYD+hxoGDwBoDDgprBDhIrHawjrRPQMACFrCABSxgAUcn7RMQsIAFLGABC7geHKm/4v0GxczrUD7nFeoAAAAASUVORK5CYII=',
        panel_backup: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsRAAALEQF/ZF+RAAACLklEQVR4nO3bQWsTQRgG4PwIE3tJ7k2wes2hRrDtDxDjRcGTxIuI60EkyaEHaVJwtVDFk3oQAntviCgoIqyiJqBI6K2an+CpFeZz39lMMDFNNTA7s+53ePkym9ndeWZmF3JIiohyQVIJSc70ACKP8QEwmMEMZjCDGczg5MT4ABjMYAYzmMEMZnByYnwA/w14u/WTdMYqMAa0eyC0Zl60Huy+iCTzoLWA+z9EJLEG/GlPTE3bH1DjgffH8e63ML3vgm7WXWo+9ORnp+aO9ccxRLWtAe+8E1Nz+44X3DFFnQ+C7j32qbrhyWw99anVGdD5Sw6lj2cpv1Sk0mqZjmWyMleuu9R+L+jV5zDPP4bXswaMAU3m/hOfFgMIwEChFk4W6cJlh86slelRy5ftzEL4Harqt7xSphddQW/7Yd58Da9pNRipNcMVxuqhArp+1xuBgUQKp4p07ZYr+6gJwi5QYCQW4Irj0ulgtRBAUOubnpwAbNVSAE8rdLDay2fLcmdIcFCxskhswIsninTuoiMhcqsGtdrwJBxb9upwQvLDrY/vFRrnv+yFiQUYLycgAFbPJiomASjV79nOYDQxaKMPzv39WrF4htUbGaulqlo5FTUJlRvuqI1M9sMqWw/WEQabAP8L+vWXw6MDqw2s0EdlFjhWPw//NrOguu5pFVgn1DpwFFhrwFFhrQBHiTUONhHjA2AwgxnMYAYzmMHJifEBMJjBDGYwgxk8Dk7UX/F+ARUlVVacoI/LAAAAAElFTkSuQmCC'
    }
    ////END_NOHL
    var group_setting = null;var cardname_setting = null;var groups = groups_def;var groupsx = groupsx_def;var groups_img = groups_img_def;var group_index=null;
    if (localStorage.getItem(OPTION_TAG)) {options = secureEvalJSON(localStorage.getItem("ixa_moko_options"));}
    group_setting = {};cardname_setting = {};group_index=[];
    if (localStorage.getItem("ixamoko_group_set")!=null) {group_setting = secureEvalJSON(localStorage.getItem("ixamoko_group_set"));}
    if (localStorage.getItem("ixakaizou_group_index")!=null) {group_index = secureEvalJSON(localStorage.getItem("ixakaizou_group_index"));}
    if (localStorage.getItem('ixamoko_init_groups')) {
        groups = secureEvalJSON(localStorage.getItem('ixamoko_init_groups'));
    } else {
        localStorage.setItem('ixamoko_init_groups', ArraytoJSON(groups));
    }
    if (localStorage.getItem('ixamoko_init_groups_img')) {
        groups_img = secureEvalJSON(localStorage.getItem('ixamoko_init_groups_img'));
    } else {
        localStorage.setItem('ixamoko_init_groups_img', ArraytoJSON(groups_img));
    }
    var setting_dialog_str = '<div id="nowLoadingContent" style="position:absolute;width:220px;height:20px;display:none;z-index:9999;padding:20px;background-color:#fff;border:3px solid #f00;-moz-border-radius:5px;-webkit-border-radius:5px;" class="window">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;しばらくお待ちください<span id="progressCount"></span><br><img src="'+IMAGES.rel_interstitial_loading+'"></div><DIV id="ixamoko_boxes"><DIV id="ixamoko_dialog" style="position:absolute;width:400px;height:360px;display:none;z-index:9999;padding:20px;background-color:#fff;border:3px solid #f00;-moz-border-radius:5px;-webkit-border-radius:5px;" class="window"><B>'+TOOL_NAME+'設定</B> | <A style="color:#000;" href="#" class="close">[ 設定する ]</A><DIV style="border-top:1px solid #000;padding-top:10px;line-height:1.5em;">';
    var changed = false;setting_dialog_str += '<DIV id="ixamoko_set_grp">';var setting_dialog_strxx = '';
    for(var grp in options_grp) {
        var setting_dialog_strx = '';
        if (setting_dialog_strxx=='') {
            setting_dialog_str += '<DIV tabid="'+grp+'" style="cursor:pointer;text-align:center;width:50px;padding:5px;margin:2px;background-color:#aaf;float:left;border:1px solid #000;-moz-border-radius:5px;-webkit-border-radius:5px;">'+options_grp[grp]+'</DIV>';
            setting_dialog_strx = '<DIV style="line-height:2em;display:block;" id="ixamoko_set_tab_'+grp+'">';
        } else {
            setting_dialog_str += '<DIV tabid="'+grp+'" style="cursor:pointer;text-align:center;width:50px;padding:5px;margin:2px;float:left;border:1px solid #000;-moz-border-radius:5px;-webkit-border-radius:5px;">'+options_grp[grp]+'</DIV>';
            setting_dialog_strx = '<DIV style="line-height:2em;display:none;" id="ixamoko_set_tab_'+grp+'">';
        }
        if (grp=='grp') {
            setting_dialog_strx += '<DIV style="height:180px;overflow-y:scroll;">';
            setting_dialog_strx += '<DIV id="ixamoko_grp_list">';
            for(var i=0;i<groups.length;++i) {
                setting_dialog_strx += '<DIV grpid="'+i+'"><IMG width="30" height="30" align="absmiddle" src="'+groups_img[i]+'" /> <INPUT class="ixamoko_icon" style="width:200px;position:relative;top:-10px;" type="text" value="'+groups_img[i]+'" /> <INPUT class="ixamoko_color" style="width:50px;position:relative;top:-10px;" type="text" value="'+groups[i]+'" />';
                setting_dialog_strx += '&nbsp;<INPUT style="position:relative;top:-10px;" type="button" value="設定" class="ixamoko_set_grp_set" />';
                if (i>0) {setting_dialog_strx += '&nbsp;<INPUT style="position:relative;top:-10px;" type="button" value="削除" class="ixamoko_set_grp_del" />';}
                setting_dialog_strx += '</DIV>';
            }
            setting_dialog_strx += '</DIV><INPUT style="" type="button" value="追加" class="ixamoko_set_grp_add" />&nbsp;<INPUT style="" type="button" value="標準に戻す" class="ixamoko_set_grp_default" />&nbsp;<INPUT style="" type="button" value="お勧め" class="ixamoko_set_grp_default2" /></DIV>';
        } else {
            for(var key in options_param) {
                if (options_param[key].tag!=grp) continue;
                if (typeof(options[key])=='undefined') {
                    changed = true;
                    if (key=='rank_lock') {
                        options[key] = 2;
                    } else if (key=='def_kind_soldier') {
                        options[key] = {"1":false,"2":true,"3":false,"4":false,"5":true,"6":false,"7":false,"8":true,"9":false,"10":true,"11":false,"12":false,"13":true,"14":false};
                    } else if (key=='pulldown_menu') {
                        options[key] = false;
                    } else if (key=='map_starx') {
                        options[key] = 2;
                    } else if (key=='def_num_of_soldier') {
                        options[key] = '100';
                    } else if (key=='place_skip_str') {
                        options[key] = '';
                    } else {
                        options[key] = true;
                    }
                }
                if (key=='rank_lock') {
                    setting_dialog_strx += '<INPUT type="checkbox" checked disabled /> '+options_param[key].caption+'<SELECT class="ixamoko_setting" key="'+key+'"><OPTION value="0">非活性化しない</OPTION>';
                    var lock_list = {1: '上以上非活性',2: '特以上非活性',3: '極以上非活性',4: '天のみ非活性'};
                    for(var key2 in lock_list) {
                        if (key2==options[key]) {setting_dialog_strx += '<OPTION value="'+key2+'" SELECTED>'+lock_list[key2]+'</OPTION>';
                        } else {setting_dialog_strx += '<OPTION value="'+key2+'">'+lock_list[key2]+'</OPTION>';}
                    }
                    setting_dialog_strx += '</SELECT><BR />';
                } else if (key=='def_kind_soldier') {
                    setting_dialog_strx += '<INPUT type="checkbox" checked disabled /> '+options_param[key].caption+'<BR />';
                    setting_dialog_strx += '<DIV style="margin-left:10px; height:60px; width:150px; overflow-y:scroll;">';
                    setting_dialog_strx += '<TABLE class="ixamoko_setting" key="'+key+'" width="100px";><TBODY>';
                    var drs_list = {1: '足軽',2: '長槍足軽',3: '武士',4: '弓足軽',5: '長弓兵',6: '弓騎馬',7: '騎馬兵',8: '精鋭騎馬',9: '赤備え',10: '鉄砲足軽',11: '騎馬鉄砲',12: '破城鎚',13: '攻城櫓',14: '大筒兵'};
                    for(var key2 in drs_list) {
                        if (options[key][key2]) {setting_dialog_strx += '<tr><td><input type="checkbox"; checked/></td><td>'+drs_list[key2]+'</td></tr>';
                        } else {setting_dialog_strx += '<tr><td><input type="checkbox"; /></td><td>'+drs_list[key2]+'</td></tr>';}
                    }
                    setting_dialog_strx += '</TBODY></TABLE></DIV><BR/><BR/>';
                } else if (key=='map_starx') {
                    setting_dialog_strx += '<INPUT type="checkbox" checked disabled /> '+options_param[key].caption+'<SELECT class="ixamoko_setting" key="'+key+'"><OPTION value="0">表示しない</OPTION>';
                    var hoshi_list = {1: '★１表示',2: '★２まで表示',3: '★３まで表示',7: '★７を表示',};
                    for(var key2 in hoshi_list) {
                        if (key2==options[key]) {setting_dialog_strx += '<OPTION value="'+key2+'" SELECTED>'+hoshi_list[key2]+'</OPTION>';
                        } else {setting_dialog_strx += '<OPTION value="'+key2+'">'+hoshi_list[key2]+'</OPTION>';}
                    }
                    setting_dialog_strx += '</SELECT><BR />';
                } else if (key=='def_num_of_soldier') {
                    setting_dialog_strx += '<INPUT type="checkbox" checked disabled /> '+options_param[key].caption+'<SELECT class="ixamoko_setting" key="'+key+'"><OPTION value="0">表示しない</OPTION>';
                    var nos_list = {100: '100',200: '200',300: '300',400: '400',500: '500',600: '600',700: '700',800: '800',900: '900',1000: '1000',
                            1500: '1500',2000: '2000',2500: '2500',3000: '3000',};
                    for(var key2 in nos_list) {
                        if (key2==options[key]) {setting_dialog_strx += '<OPTION value="'+key2+'" SELECTED>'+nos_list[key2]+'</OPTION>';
                        } else {setting_dialog_strx += '<OPTION value="'+key2+'">'+nos_list[key2]+'</OPTION>';}
                    }
                    setting_dialog_strx += '</SELECT><BR />';
                } else if (key=='sort_village') {
                    var chk_flg='';
                    if(options[key]){chk_flg='checked';}
                    setting_dialog_strx += '<LABEL style="line-height:2em;"><INPUT type="checkbox" class="ixamoko_setting" key="'+key+'" '+chk_flg+' /> '+options_param[key].caption+'</LABEL><SELECT class="ixamoko_setting" key="ad_sort">';
                    var sort_list = {0: '名前降順',1: '名前昇順'};
                    for(var key2 in sort_list) {
                        if (key2==options['ad_sort']) {setting_dialog_strx += '<OPTION value="'+key2+'" SELECTED>'+sort_list[key2]+'</OPTION>';
                        } else {setting_dialog_strx += '<OPTION value="'+key2+'">'+sort_list[key2]+'</OPTION>';}
                    }
                    setting_dialog_strx += '</SELECT><BR />';
                } else if (key=='place_skip') {
                    var chk_flg='';
                    if(options[key]){chk_flg='checked';}
                    setting_dialog_strx += '<LABEL style="line-height:2em;"><INPUT type="checkbox" class="ixamoko_setting" key="'+key+'" '+chk_flg+' /> '+options_param[key].caption+'</LABEL><BR />非表示にする文字列：<input type=text key="place_skip_str" value="'+options['place_skip_str']+'" class="ixamoko_setting"><BR />';
                } else if (key=='pulldown_menu') {
                    var chk_flg='';
                    if(options[key]){chk_flg='checked';}
                    setting_dialog_strx += '<LABEL style="line-height:2em;"><INPUT type="checkbox" class="ixamoko_setting" key="'+key+'" '+chk_flg+' /> '+options_param[key].caption+'</LABEL><SELECT class="ixamoko_setting" key="toride_count">';
                    var sort_list = {10: '10',20: '20',30: '30'};
                    for(var key2 in sort_list) {
                        if (key2==options['toride_count']) {setting_dialog_strx += '<OPTION value="'+key2+'" SELECTED>'+sort_list[key2]+'</OPTION>';
                        } else {setting_dialog_strx += '<OPTION value="'+key2+'">'+sort_list[key2]+'</OPTION>';}
                    }
                    setting_dialog_strx += '</SELECT><BR />';
                } else if ((key=='ad_sort')||(key=='place_skip_str')||(key=='toride_count')) {
                } else {
                    if (options[key]) {
                        setting_dialog_strx += '<LABEL style="line-height:2em;"><INPUT type="checkbox" class="ixamoko_setting" key="'+key+'" checked /> '+options_param[key].caption+'</LABEL><BR />';
                    } else {
                        setting_dialog_strx += '<LABEL style="line-height:2em;"><INPUT type="checkbox" class="ixamoko_setting" key="'+key+'" /> '+options_param[key].caption+'</LABEL><BR />';
                    }
                }
            }
            if (grp=='all') {
                setting_dialog_strx += '<INPUT id="clear_map_reg" type="button" value="記録した地図をクリア" />';
                setting_dialog_strx += '&nbsp;<INPUT id="clear_grp_reg" type="button" value="記録したグループをクリア" /><BR />';
            }
        }
        setting_dialog_strxx += setting_dialog_strx+'</DIV>';
    }
    setting_dialog_str += '</DIV><DIV style="clear:both;margin-bottom:5px;border-bottom:2px solid #000;"></DIV><DIV>'+setting_dialog_strxx+'</DIV>';
    if (changed) {localStorage.setItem(OPTION_TAG, toJSON(options));}
    setting_dialog_str += '</DIV></DIV><DIV style="position:absolute;z-index:9000;background-color:#000;display:none;" id="ixamoko_mask"></DIV><DIV style="position:absolute;z-index:9000;background-color:#000;display:none;" id="loading_mask"></DIV></DIV>';
    menu_reversal();
    $('BODY').prepend(setting_dialog_str);
    $('#ixamoko_set_grp > DIV').click(function(e) {
        var $this = $(this);
        $('#ixamoko_set_tab_'+$this.attr('tabid')).show().siblings().hide();
        $this.css('backgroundColor', '#aaf').siblings().css('backgroundColor', '');
    });
    $('INPUT.ixamoko_set_grp_set').live('click', function(e) {
        if (confirm('本当に変更して良いですか。')) {
            var $parent = $(this).parent();
            var color = $parent.find('INPUT.ixamoko_color').val();
            var icon = $parent.find('INPUT.ixamoko_icon').val();
            groups[parseInt($parent.attr('grpid'))] = color.replace('"', '%22');
            groups_img[parseInt($parent.attr('grpid'))] = icon.replace('"', '%22');
            $parent.find('IMG').attr('src', icon);
            localStorage.setItem('ixamoko_init_groups', ArraytoJSON(groups));
            localStorage.setItem('ixamoko_init_groups_img', ArraytoJSON(groups_img));
        }
    });
    $('INPUT.ixamoko_set_grp_del').live('click', function(e) {
        if (confirm('本当に削除して良いですか。')) {
            var $parent = $(this).parent();
            var id = parseInt($parent.attr('grpid'));
            groups.splice(id, 1);
            groups_img.splice(id, 1);
            for(var cardid in group_setting) {
                if (group_setting[cardid]==id) {
                    group_setting[cardid] = 0;
                } else if (group_setting[cardid]>id) {
                    --group_setting[cardid];
                }
            }
            localStorage.setItem("ixamoko_group_set", toJSON(group_setting));
            $parent.remove();
            localStorage.setItem('ixamoko_init_groups', ArraytoJSON(groups));
            localStorage.setItem('ixamoko_init_groups_img', ArraytoJSON(groups_img));
        }
    });
    $('INPUT.ixamoko_set_grp_default').click(function(e) {
        if (confirm('本当に標準に戻して良いですか。全てのグループ設定は破棄されます。')) {
            group_setting = {};
            localStorage.setItem("ixamoko_group_set", toJSON(group_setting));
            var html = '';
            for(var i=0;i<groups_def.length;++i) {
                html += '<DIV grpid="'+i+'"><IMG width="30" height="30" align="absmiddle" src="'+groups_img_def[i]+'" /> <INPUT class="ixamoko_icon" style="width:200px;position:relative;top:-10px;" type="text" value="'+groups_img_def[i]+'" /> <INPUT class="ixamoko_color" style="width:50px;position:relative;top:-10px;" type="text" value="'+groups_def[i]+'" />';
                html += '&nbsp;<INPUT style="position:relative;top:-10px;" type="button" value="設定" class="ixamoko_set_grp_set" />';
                if (i>0) {html += '&nbsp;<INPUT style="position:relative;top:-10px;" type="button" value="削除" class="ixamoko_set_grp_del" />';}
                html += '</DIV>';
            }
            $('#ixamoko_grp_list').empty().html(html);
            localStorage.setItem('ixamoko_init_groups', ArraytoJSON(groups_def));
            localStorage.setItem('ixamoko_init_groups_img', ArraytoJSON(groups_img_def));
        }
    });
    $('INPUT.ixamoko_set_grp_default2').click(function(e) {
        if (confirm('本当にお勧めに設定して良いですか。全てのグループ設定は破棄されます。')) {
            group_setting = {};
            group_index = [];
            localStorage.setItem("ixamoko_group_set", toJSON(group_setting));
            localStorage.setItem("ixakaizou_group_index", ArraytoJSON(group_index));
            var html = '';
            for(var i=0;i<groups_def.length;++i) {
                html += '<DIV grpid="'+i+'"><IMG width="30" height="30" align="absmiddle" src="'+groups_img_recommand[i]+'" /> <INPUT class="ixamoko_icon" style="width:200px;position:relative;top:-10px;" type="text" value="'+groups_img_recommand[i]+'" /> <INPUT class="ixamoko_color" style="width:50px;position:relative;top:-10px;" type="text" value="'+groups_def[i]+'" />';
                html += '&nbsp;<INPUT style="position:relative;top:-10px;" type="button" value="設定" class="ixamoko_set_grp_set" />';
                if (i>0) {
                    html += '&nbsp;<INPUT style="position:relative;top:-10px;" type="button" value="削除" class="ixamoko_set_grp_del" />';
                }
                html += '</DIV>';
            }
            $('#ixamoko_grp_list').empty().html(html);
            localStorage.setItem('ixamoko_init_groups', ArraytoJSON(groups_def));
            localStorage.setItem('ixamoko_init_groups_img', ArraytoJSON(groups_img_recommand));
        }
    });
    $('INPUT.ixamoko_set_grp_add').click(function(e) {
        var $list = $('#ixamoko_grp_list');
        var i = $list.find('DIV').get().length;
        var html = '<DIV grpid="'+i+'"><IMG width="30" height="30" align="absmiddle" src="'+groups_img[0]+'" /> <INPUT class="ixamoko_icon" style="width:200px;position:relative;top:-10px;" type="text" value="'+groups_img[0]+'" /> <INPUT class="ixamoko_color" style="width:50px;position:relative;top:-10px;" type="text" value="" />&nbsp;<INPUT style="position:relative;top:-10px;" type="button" value="設定" class="ixamoko_set_grp_set" />&nbsp;<INPUT style="position:relative;top:-10px;" type="button" value="削除" class="ixamoko_set_grp_del" /></DIV>';
        $list.append(html);
        groups[i] = '';
        groups_img[i] = groups_img[0];
        localStorage.setItem('ixamoko_init_groups', ArraytoJSON(groups));
        localStorage.setItem('ixamoko_init_groups_img', ArraytoJSON(groups_img));
    });
    $('#clear_map_reg').click(function(e) {
        var map_list = {};
        localStorage.setItem("map_list", toJSON(map_list));
        alert('Done.');
    });
    $('#clear_grp_reg').click(function(e) {
        var tmp_list = {};
        localStorage.setItem("ixamoko_group_set", toJSON(tmp_list));
        localStorage.setItem("ixamoko_card_name", toJSON(tmp_list));
        alert('Done.');
    });
    $('#sideboxTop').prepend('<DIV class="sideBox"><DIV class="sideBoxHead"><H3 style="padding:5px;">'+TOOL_NAME+'</H3></DIV><DIV class="sideBoxInner" id="mokotool"></DIV></DIV>');
    $('#mokotool').append('<ul id="toollist"></ul><div id="allMapThicbox" style="display:none;"><span id="all_map"></span></div>');
    if (location.pathname=='/world/select_world.php') {
        document.cookie = 'im_st='+getUnixTime()+'; domain=.sengokuixa.jp; path=/;';
    } else if (getCookie('im_st')!=null) {
        localStorage.setItem(OPTION_PREFIX+'starttime', getCookie('im_st'));
        document.cookie = 'im_st=0; expires=Fri, 31-Dec-1999 23:59:59 GMT; domain=.sengokuixa.jp; path=/;';
    }
    allpage_check();
    unit_list_200();
    non_cardview();
    chat_check();
    chat_default_check();
    disp_ToubatsuRestTime(true);
    dungeon_check();
    message_check();
    report_check();
    map_check();
    map_rightdblclick();
    map_rightclick();
    map_butai_status();
    fade_button_check();
    bbs_check();
    reportlist_check();
    trade_default_check();
    user_check();
    village_check();
    facility_check();
    chat_log_check();
    delList_check();
    non_back();
    all_map_status();
    all_check_inbox();
    fightlist();
    merge_fight_info();
    facility_selecter();
    hold_butai();
    unit_list_hikyou();
    send_troop_check();
    all_dissolution();
    all_deck_setting();
    deck_check();
    sort_village();
    ptop_check();
    war_detail_navi();
    facility_tool();
    prohibitionArea();
    panelAttack();
    zoomMap();
    favoriteSort();
    unitListDialog();
    fall_check();
//    unit_list_max();
    panel_func_change();
    map_tool();
    villageListView();
    deckGroupImgView();
    displayUnitPower();

    var br3 = {
        closeTimer : null,
        makeMenu : function(arr,target){
            var submenu = document.createElement('div');
            submenu.id = target;
            submenu.style.position = "absolute";
            submenu.style.zIndex = 200000;
            submenu.style.background = "#000000";
            submenu.style.display = "none";
            $("."+target).append(submenu);
            $(submenu).mouseover(function(){br3.closetimeC();});
            $(submenu).mouseout(function(){br3.closetime();});
            for(var i=0;i<arr.length;++i){
                var a = document.createElement('a');
                a.href = arr[i][0];
                a.innerHTML = arr[i][1];
                a.style.margin = "12px";
                a.style.fontSize = "100%";
                a.style.textIndent = "0px";
                a.style.height = "14px";
                a.style.background = "#000000";
                submenu.appendChild(a);
            }
        },

        makeMapMenu : function(arr,target){
            var c = location.href.match(/c=\d+$/);
            if (c!==null) {c = "&" + c;
            } else {c = "";}
            var submenu = document.createElement('div');
            submenu.id = target;
            submenu.style.position = "absolute";
            submenu.style.zIndex = 200000;
            submenu.style.background = "#000000";
            submenu.style.display = "none";
            submenu.style.width = "235px";
            $("."+target).append(submenu);
            $(submenu).mouseover(function(){br3.closetimeC();});
            $(submenu).mouseout(function(){br3.closetime();});
            for(var i=0;i<4;++i){
                var l = document.createElement('li');
                l.style.background = "#000000";
                l.style.height = arr.length*27.5+"px";
                l.style.width = "55px";
                var dir,x,y;
                switch (i) {
                    case 0:dir = "北東砦";x = 1;y = 1;break;
                    case 1:dir = "南東砦";x = 1;y = -1;break;
                    case 2:dir = "南西砦";x = -1;y = -1;break;
                    case 3:dir = "北西砦";x = -1;y = 1;break;
                }
                for(var j=0;j<arr.length;++j){
                    var a = document.createElement('a');
                    a.href = "/map.php?x="+arr[j][0]*x+"&y="+arr[j][1]*y+c;
                    a.innerHTML = dir + eval(j + 1);
                    a.style.margin = "12px";
                    a.style.fontSize = "100%";
                    a.style.textIndent = "0px";
                    a.style.height = "14px";
                    a.style.width = "50px";
                    a.style.background = "#000000";
                    l.appendChild(a);
                }
                submenu.appendChild(l);
            }
        },
        openMenu : function(obj) {
            br3.closeMenu();
            br3.closetimeC();
            $("#"+obj).toggle();
        },
        closeMenu : function() {
            $("#gnavi01").css('display', "none");
            $("#gnavi02").css('display', "none");
            $("#gnavi03").css('display', "none");
            $("#gnavi05").css('display', "none");
            $("#gnavi07").css('display', "none");
            $("#gnavi08").css('display', "none");
        },
        closetime : function() {
            br3.closeTimer = window.setTimeout(br3.closeMenu, 50);
        },
        closetimeC :function() {
            if(br3.closeTimer) {
                window.clearTimeout(br3.closeTimer);
                br3.closeTimer = null;
            }
        }
    };
    initMenu();
    jQuery.noConflict();
    function proToString(pro) {
        var out = '';
        for(var key in pro){
            if (out!='' ) out += ',';
            out += "'"+key+"':'"+pro[key]+"'";
        }
        return '{' + out + '}';
    }

    function caddDate(baseDate, timetxt) {
        var tim = timetxt.match(/^(\d+):(\d+):(\d+)/);
        if( !tim ) return "";

        var dt = new Date(baseDate.getFullYear(),
                baseDate.getMonth(),
                baseDate.getDate(),
                baseDate.getHours() + parseInt(tim[1],10),
                baseDate.getMinutes() + parseInt(tim[2],10),
                baseDate.getSeconds() + parseInt(tim[3],10) );

        return (dt.getMonth()+1) + "/" + dt.getDate() + " " +
        (dt.getHours()+100).toString().substr(-2)  + ":" +
        (dt.getMinutes()+100).toString().substr(-2)  + ":" +
        (dt.getSeconds()+100).toString().substr(-2);
    }

    function caddDate2(baseDate, timetxt) {
        var tim = timetxt.match(/^(\d+):(\d+):(\d+)/);
        if( !tim ) return "";

        var dt = new Date(baseDate.getFullYear(),
                baseDate.getMonth(),
                baseDate.getDate(),
                baseDate.getHours() + parseInt(tim[1],10),
                baseDate.getMinutes() + parseInt(tim[2],10),
                baseDate.getSeconds() + parseInt(tim[3],10) );

        return (dt.getHours()+100).toString().substr(-2)  + ":" +
        (dt.getMinutes()+100).toString().substr(-2)  + ":" +
        (dt.getSeconds()+100).toString().substr(-2);
    }


    //////////////////////
    //全ページ用: 資源数の横に全部隊へのリンク
    //              簡易編成へのリンク
    //////////////////////
    function allpage_check() {
        if (options['sidebox_change']) {
            var $sidebottom = $('#sideboxBottom');
            var $seisan_div = $sidebottom.find('DIV.sideBox:eq(0)').addClass('last');
            var $kyoten_div = $sidebottom.find('DIV.sideBox:eq(1)');
            var $joutai_div = $sidebottom.find('DIV.sideBox:eq(2)').removeClass('last');
            $joutai_div.after($seisan_div).after($kyoten_div);
            var $sidebox1 = $('#sideboxTop > DIV.sideBox:eq(1)');
            var $sidebox2 = $('#sideboxTop > DIV.sideBox:eq(2)');
            $sidebottom.after($sidebox1).after($sidebox2);
            //$('#sideboxTop > DIV.sideBox:eq(0)').after($sidebottom);
            $('TABLE.situationWorldTable').remove();
            if (options['tohankaku']) {
                $('INPUT[type="text"]').change(function(e) {
                    var $this = $(this);
                    $this.val(toHankaku($this.val()));
                });
            }
        }
        if (options['chat_mapcood']) {
            var cood = new RegExp(/(-?\d+),\s?(-?\d+)/);
            $('.msg > SPAN').each(function() {
                var $this = $(this);
                var msg = $this.text();
                var tmp = null;
                if (tmp=msg.match(cood)) {
                    var tmp2 = '<A style="display:inline;" href="/map.php?x='+tmp[1]+'&y='+tmp[2]+'">'+tmp[0]+'</A>';
                    msg = $('<div>').text(msg).html();
                    msg = msg.replace(tmp[0], tmp2);
                    $this.html(msg);
                }
            });
        }
        $('#status_left').css({width:'900px'}).append('<SPAN class="normal"><A href="/facility/unit_status.php?dmo=all">全部隊</A></SPAN><SPAN class="sep">&nbsp;|&nbsp;</SPAN><SPAN class="normal"><A href="/facility/set_unit_list.php?show_num=100">全編成</A></SPAN><SPAN class="sep">&nbsp;|&nbsp;</SPAN><SPAN class="normal"><A href="/facility/unit_list.php">待機兵</A></SPAN><SPAN class="sep">&nbsp;|&nbsp;</SPAN><SPAN class="normal"><A href="/senkuji/senkuji.php">くじ</A></SPAN><SPAN class="sep">&nbsp;|&nbsp;</SPAN><SPAN class="normal"><A href="/card/trade.php?t=name&k=&s=no&o=a">取引</A></SPAN><SPAN class="sep">&nbsp;|&nbsp;</SPAN><SPAN class="normal"><A href="/union/index.php">合成</A></SPAN><SPAN class="sep">&nbsp;|&nbsp;</SPAN><SPAN class="normal"><A href="#" id="ixamoko_setting">設定</A></SPAN><SPAN class="sep">&nbsp;|&nbsp;</SPAN>');
        $('#ixamoko_setting').click(function(e) {
            var id = '#ixamoko_dialog';
            var maskHeight = $(document).height();
            var maskWidth = $(window).width();
            $('#ixamoko_mask').css({'width':maskWidth,'height':maskHeight}).fadeTo(0 ,0.8).show();
            var winH = $(window).height();
            var winW = $(window).width();
            $(id).css('top',  winH/2-$(id).height()/2).css('left', winW/2-$(id).width()/2).fadeIn(500);
            return false;
        });
        $('#ixamoko_dialog .close').click(function(e) {
            e.preventDefault();
            $('#ixamoko_mask, #ixamoko_dialog').hide();
            $('.ixamoko_setting').each(function() {
                var $this = $(this);
                var key = $this.attr('key');
                if (key=='def_kind_soldier') {
                    var a = $this.find('INPUT[type="checkbox"]');
                    for (i=0;i<a.length;++i) {
                        options[key][i+1] = a[i].checked===true ? true:false;
                    }
                } else if ((key=='map_starx') || (key=='def_num_of_soldier') || (key=='rank_lock') || (key=='ad_sort') || (key=='toride_count')) {
                    options[key] = $this.children(':selected').attr('value'); // なぜ.val()で取れない??
                } else if (key=='place_skip_str') {
                    options[key] = $this.attr('value');
                } else {
                    options[key] = $this.attr('checked')===true ? true:false;
                }
            });
            localStorage.setItem(OPTION_TAG, toJSON(options));
        });
        $('#ixamoko_mask').click(function(e) {
            $(this).hide();
            $('#ixamoko_dialog').hide();
        });
        if (options['commentListEnemy']) {
            comBtnEnemy();
            commentListSelecter();
        }
        if (options['raid']) {
            var $raid = $('IMG.fade[alt="敵襲！"]');
            if ($raid.get().length>0) {
                // 敵襲あり
                var href = $raid.parent().attr('href');
                $('BODY').prepend('<DIV id="ixamoko_raid" style="width:100%;position:fixed;padding:2px;background-color:#f00;z-index:9999;"><MARQUEE scrolldelay="100"><A href="'+href+'">敵襲あり</A></MARQUEE></DIV>');
                $('#ixamoko_raid').click(function(e) {
                    $(this).hide();
                });
            }
        }

        if (options['inside_attack_view']) {
            var $raid = $('IMG.fade[alt="敵襲！"]');
            if ($raid.get().length>0) {
                // 敵襲あり
                var href = $raid.parent().attr('href');
                $('div#status.clearfix').css('background','url('+IMAGES.bg_status_red+')');
                $('span.sep').last().after('<span class="normal"><a href="'+href+'">敵襲</a></span>');
            }
        }

        if (options['commentListEnemy']) {
            var $raid = $('IMG.fade[alt="敵襲！"]');
            if ($raid.get().length>0) {
                enemyCheck();
            }
        }

        if (options['timeout_countdown']) {
            if (localStorage.getItem(OPTION_PREFIX+'starttime')!==null) {
                var totime = (parseInt(localStorage.getItem(OPTION_PREFIX+'starttime'))+3*60*60);
                var sec = totime-getUnixTime();
                if (sec<0) sec = 0;
                var timeText = formatTime(sec);
                var dayText = caddDate2(new Date(), timeText);
                var str = '<p>タイムアウトまで<br>残り <SPAN todo="d30m" totime="'+totime+'" class="ixamoko_countdown">'+timeText+'</SPAN></p>';
/*
                $('BODY').prepend('<DIV style="z-index:9999;width:100%;position:fixed;"><DIV id="ixamoko_sessout" style="cursor:pointer;border:1px solid #000;float:right;width:125px;padding:2px;background-color:#fff;z-index:9999;display:none;">'+str+'</DIV></DIV>');
*/
                $('table.situationTable').after('<div class="information_situ" id="ixamoko_sessout" style="background-image:url(/img/common/sidebar/bg_information.gif);display:none;">'+str+'</div>');
                $('#ixamoko_sessout').click(function(e) {
                    if(confirm('ログアウトしますか？')){
                        location.href='/logout.php';
                        $(this).hide();
                    }
                });
            }
            var countdownTimer = null;
            var countDown = function(nowdate) {
                if (countdownTimer!==null) clearTimeout(countdownTimer);
                $('.ixamoko_countdown').each(function() {
                    var $this = $(this);
                    var totime = parseInt($this.attr('totime'));
                    var todo = $this.attr('todo');
                    var sec = totime - getUnixTime();
                    if (sec<0) sec = 0;
                    var timeText = formatTime(sec);
                    $this.html(timeText);
                    if (sec<600) {
                        $('#ixamoko_sessout').css('background-image','url('+IMAGES.bg_information_timer+')');
                    } else if (sec<1800) {
                        $('#ixamoko_sessout').css('background-image','url("/img/common/sidebar/bg_information.gif")');
                    }
                    if (todo=='d30m' && sec<1800) {
                        $('#ixamoko_sessout').show();
                    }
                });
                countdownTimer = setTimeout(function() {countDown(new Date());}, 1000-new Date().getMilliseconds());
            }
            countDown(new Date());
        }
    }

    function non_cardview() {
        if (!options['non_cardview']) return;
        $('div#sideboxTop').find('div.sideBox').find('h3.sidebox_cardbg').parent().parent().remove();
    }

    //////////////////////
    //地図: ★１と２だけリスト表示
    //////////////////////
    function map_check() {
        if (location.pathname!="/map.php") return;

        // 選択中の所領を判断
        var basedata = $('.basename').find('LI.on > SPAN').attr('title');
        var tmp = basedata.match(/^(.+)\((-?\d+),(-?\d+)\)$/);
        var base_name = tmp[0];
        var base_x = parseInt(tmp[2]);
        var base_y = parseInt(tmp[3]);

        if (options['map_reg']) {
            var maplist_box = $('<DIV id="ixamoko_maplist1">').css({fontSize:'10px',zIndex:1000, overflowY:'scroll', width:'165px', height:'110px', position:'absolute', top:'400px', left:'620px', backgroundColor:'#fff', border:'1px solid #000'});
            $('#ig_mapbox').prepend(maplist_box);
            map_list(base_x, base_y, base_name);
        }

        if (options['map_starx']>0) {
            var status_box = $('<DIV id="ixamoko_maplist2">').css({fontSize:'10px', zIndex:1000, overflowY:'scroll', width:'165px', height:'110px',  position:'absolute', top:'10px', left:'620px', backgroundColor:'#fff', border:'1px solid #000'});
            $('#ig_mapbox').prepend(status_box);
            map_list2(base_x, base_y, base_name);
            $('.ixamoko_regmap').live('click', function(e) {
                location.href = $(this).attr('url');
            }).live('mouseover', function(e) {
                $('AREA[alt="'+$(this).attr('alt')+'"]').trigger('mouseover');
            });
        }
    }
    function map_list(base_x, base_y, base_name) {
        var $maplist_box = $('#ixamoko_maplist1');
        $maplist_box.empty();
        var map_list = {};
        if (localStorage.getItem("map_list")) {
            map_list = secureEvalJSON(localStorage.getItem("map_list"));
        }
        for(var key in map_list) {
            var tmp = key.match(/(-?\d+),(-?\d+)/);

            if (tmp===null) {
                //console.log('tmp null1');
                continue;
            }

            var dist = Math.sqrt(Math.pow(parseInt(tmp[1])-base_x, 2)+Math.pow(parseInt(tmp[2])-base_y, 2));
            dist = Math.floor(dist*10)/10;

            $('<DIV cood="'+key+'" style="cursor:pointer;padding:2px;margin:1px;">[距: '+dist+'] '+map_list[key]+' ('+key+')</DIV>').hover(function(e) {
                $(this).css({backgroundColor:'#aaf'}); // class使いたい
            }, function(e) {
                $(this).css({backgroundColor:''});
            }).click(function(e) {
                var tmp = $(this).attr('cood').match(/(-?\d+),(-?\d+)/);
                if (tmp===null) {
                    //console.log('tmp null2');
                    return;
                }
                location.href = '/map.php?x='+tmp[1]+'&y='+tmp[2];
            }).appendTo($maplist_box);
        }
    }

    function map_list2(base_x, base_y, base_name) {
        var $status_box = $('#ixamoko_maplist2');
        $status_box.empty();

        $status_box.append('<DIV style="background-color:#faf;margin-top:3px;font-weight:bold;">[選択拠点: '+base_name+']</DIV>');

        var HOSHI_SET = [];
        var hoshi = '★';

        if(options['map_starx']!=7) {
            for(var i=0;i<options['map_starx'];++i) {
                HOSHI_SET.push(hoshi);
                hoshi += '★';
            }
        } else {
            hoshi = '★★★★★★★';
            HOSHI_SET.push(hoshi);
        }
        function Tochi(name, dist, url, alt) {
            this.name = name;
            this.dist = dist;
            this.url = url;
            this.alt = alt;
        }
        function cmp_dist(a, b) {
            return a.dist - b.dist;
        }
        for(var i=0;i<HOSHI_SET.length;++i) {
            var hoshi = HOSHI_SET[i];
            var count = 0;
            var tmp2='';
            var Tochis = new Array();
            $('AREA[onmouseover*=", \''+hoshi+'\',"]').each(function() {
                var $this = $(this);
                var tmp = $this.attr('alt').match(/^([^(]+) (-?\d+),(-?\d+)$/);
                if (tmp===null) {
                    //console.log('tmp null3');
                    return;
                }
                var dist = Math.sqrt(Math.pow(parseInt(tmp[2])-base_x, 2)+Math.pow(parseInt(tmp[3])-base_y, 2));
                dist = Math.floor(dist*10)/10;
                if(hoshi=='★★★★★★★') {
                    tmp2='';
                    tmp2=$this.attr("onmouseover").toString();
                    tmp2=tmp2.replace("function onmouseover(event) {\n",'');
                    tmp2=tmp2.replace('  rewrite(','');
                    tmp2=tmp2.replace(' ','');
                    tmp2=tmp2.replace(/'/g,'');
                            tmp2=tmp2.split(',');
                    tmp2='('+tmp2[8].replace(' ','')+tmp2[9]+tmp2[10]+tmp2[11]+')';
                    tmp2=tmp2.replace(/'/g,'');
                            tmp[0]=tmp2+tmp[0];
                }
                Tochis[count++] = new Tochi(tmp[0], dist, $this.attr('href'), $this.attr('alt'));
            });
                    Tochis.sort(cmp_dist);
                    for(var j=0;j<Tochis.length;++j) {
                        if(hoshi=='★★★★★★★') {hoshi='★７';}
                        var $hosiarea = $('<DIV class="ixamoko_regmap" style="cursor:pointer;padding:2px;margin:1px;">'+hoshi+' [距: '+Tochis[j].dist+'] '+Tochis[j].name+'</DIV>').attr('url', Tochis[j].url).attr('alt', Tochis[j].alt).hover(function(e) {
                            $(this).css({backgroundColor:'#aaf'}); // class使いたい
                        }, function(e) {
                            $(this).css({backgroundColor:''});
                        }).appendTo($status_box);
                    }
        }
    }

    function map_rightdblclick() {
        if (location.pathname!="/map.php") return;
        if (!options['map_rightdblclick']) return true;
        var g_click='1';
        var target_html;
        $('AREA[href^="/land.php"]')
        .dblclick(function(e) {
            g_click='2';
            target_html = $(this);
        })
        .click(function(){
            g_click='1';
            target_html = $(this);
            setTimeout(function() {
                if(g_click=='1') {
                    var tmp = target_html.attr('href').match(/land\.php\?(.+)$/);
                    location.href='/land.php?'+tmp[1];
                } else {
                    var tmp = target_html.attr('onmouseover').toString().match(/(?:[^"]|\\.)*/g);
                    var encoded_load_name = tmp[6];
                    var load_name ;
                    //console.log( encoded_load_name );
                    if( /^(?:\\u[0-9A-F]{4}|\\.|[a-zA-Z0-9!"'#$%&().|`@\[\]{};:+*<>,./?_=-])+$/.test(encoded_load_name) ){
                        load_name = eval('"'+ encoded_load_name + '"');
                        location.href='/war/list.php?m=&s=1&name=lord&word='+load_name+'&coord=map&x=&y=';
                    }
                }
            },200);
            return false;
        });
    }

    //////////////////////
    //地図: 右クリックで移動
    //////////////////////
    function map_rightclick() {
        if (typeof(this.ajflag)=='undeifned') {
            this.ajflag = true;
        }
        if (location.pathname!="/map.php") return;
        $('AREA[href^="/land.php"]').live('contextmenu', function(e) {
            if (map_rightclick.ajflag) {
                return false;
            }
            if (!options['map_rightclick']) return true;
            map_rightclick.ajflag  = true;

            var $this = $(this);
            var tmp = $this.attr('href').match(/land\.php\?(.+)$/);
            if (tmp===null) {
                map_rightclick.ajflag = false;
                return true;
            }
            $.ajax({
                url: '/map.php?'+tmp[1],
                        cache: false,
                        dataType: "text",
                        success: function (html){
                var $new_map = $(html).find('#ig_mapbox_container');
                $('#ig_mapbox_container').replaceWith($new_map);

                delete html;
                delete $new_map;
                var basedata = $('.basename').find('LI.on > SPAN').attr('title');
                var tmp = basedata.match(/^([^(]+)\((-?\d+),(-?\d+)\)$/);
                if (tmp===null) {
                    map_rightclick.ajflag = false;
                    return;
                }
                var base_name = tmp[0];
                var base_x = parseInt(tmp[2]);
                var base_y = parseInt(tmp[3]);
                if (options['map_starx']) {
                    map_list2(base_x, base_y, base_name);
                }
                map_rightclick.ajflag = false;
                map_rightdblclick();
                if (options['prohibitionArea']) {
                    prohibitionArea();
                }
                if (options['panelAttack']) {
                    panelAttack();
                }
                if(options['zoomMap']) {
                    zoomMap();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                map_rightclick.ajflag = false;
                //console.log(textStatus);
            }
            });
            return false;
        });
        map_rightclick.ajflag = false;
    }

    function get_map_status(k,i,x,y) {
        if (location.pathname!="/map.php") return;
        var mp = new Array(48);mp[0]=new Array(12,28);mp[1]=new Array(28,12);mp[2]=new Array(12,52);mp[3]=new Array(36,36);mp[4]=new Array(52,12);mp[5]=new Array(12,76);
        mp[6]=new Array(36,60);mp[7]=new Array(60,36);mp[8]=new Array(76,12);mp[9]=new Array(12,100);mp[10]=new Array(36,84);mp[11]=new Array(60,60);
        mp[12]=new Array(84,36);mp[13]=new Array(100,12);mp[14]=new Array(12,124);mp[15]=new Array(36,108);mp[16]=new Array(60,84);mp[17]=new Array(84,60);
        mp[18]=new Array(108,36);mp[19]=new Array(124,12);mp[20]=new Array(12,148);mp[21]=new Array(36,132);mp[22]=new Array(60,108);mp[23]=new Array(84,84);
        mp[24]=new Array(108,60);mp[25]=new Array(132,36);mp[26]=new Array(148,12);mp[27]=new Array(36,156);mp[28]=new Array(60,132);mp[29]=new Array(84,108);
        mp[30]=new Array(108,84);mp[31]=new Array(132,60);mp[32]=new Array(156,36);mp[33]=new Array(60,156);mp[34]=new Array(84,132);mp[35]=new Array(108,108);
        mp[36]=new Array(132,84);mp[37]=new Array(156,60);mp[38]=new Array(84,156);mp[39]=new Array(108,132);mp[40]=new Array(132,108);mp[41]=new Array(156,84);
        mp[42]=new Array(108,156);mp[43]=new Array(132,132);mp[44]=new Array(156,108);mp[45]=new Array(132,156);mp[46]=new Array(156,132);mp[47]=new Array(156,156);

        var p = new Array('hs','ht','ns','nt');
        var j=i;
        var c = k;
        var minus_x = '1';
        var minus_y = '1';
        if(p[c]=='hs') {
            minus_x = '-1';
            minus_y = '1';
        } else if(p[c]=='ht') {
            minus_x = '1';
            minus_y = '1';
        } else if(p[c]=='ns') {
            minus_x = '-1';
            minus_y = '-1';
        } else {
            minus_x = '1';
            minus_y = '-1';
        }
        var t = $('select#target option:selected').val();
        $.ajax({
            url: '/map.php?x='+(x*minus_x)+'&y='+(y*minus_y)+'&type=1&c='+t,
            cache: false,
            dataType: "text",
            success: function (html){
            var num = 0;
            $(html).find('div#ig_mapsAll').find('img').each(function() {
                var $this = $(this);
                var img = $this.get()[0].src;
                if(img.indexOf("stronghold_r_l.png")>0) {num++;}
                if(img.indexOf("stronghold_r_m.png")>0) {num++;}
                if(img.indexOf("stronghold_r_s.png")>0) {num++;}
                if(img.indexOf("stronghold_g_l.png")>0) {num++;}
                if(img.indexOf("stronghold_g_m.png")>0) {num++;}
                if(img.indexOf("stronghold_g_s.png")>0) {num++;}
                if(img.indexOf("stronghold_ga_l.png")>0) {num++;}
                if(img.indexOf("stronghold_ga_m.png")>0) {num++;}
                if(img.indexOf("stronghold_ga_s.png")>0) {num++;}
            });
            j++;
            if(num==0) {
                $('table#act_battle_data').find('td#'+p[c]+j).css('color','#ffffff');
            }else if(num<=4) {
                $('table#act_battle_data').find('td#'+p[c]+j).css('color','#ff9999');
            }else if(num<=9) {
                $('table#act_battle_data').find('td#'+p[c]+j).css('color','#ff6666');
            }else if(num<=14) {
                $('table#act_battle_data').find('td#'+p[c]+j).css('color','#ff4c4c');
            }else{
                $('table#act_battle_data').find('td#'+p[c]+j).css('color','#ff0000');
            }
            if(j>47){j=0;c++;}
            if(c>3){$("input#update_map").attr("disabled",false);return;}
            get_map_status(c,j,(mp[j][0]),(mp[j][1]));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            return false;
        }
        });
    }

    function all_map_status() {
        if (location.pathname!="/map.php") return;
        if (!options['all_map_status']) return;
        $('#mokotool').append('<a href="#TB_inline?height=340&amp;width=265&amp;inlineId=allMapThicbox" class="thickbox" title="戦況マップ" onclick="return false;">戦況マップ</a>');
        $("a.thickbox").live("mousedown",function() {
            tb_init('a.thickbox');
            var tmp = '<div style="top:17px;right:0px;position: absolute;border-collapse: collapse;"><table id="act_battle_data"><tbody>';
            tmp+='<tr><td colspan=14><select id="target"><option value="1">織田</option><option value="2">足利</option><option value="3">武田</option><option value="4">上杉</option><option value="5">徳川</option><option value="6">毛利</option><option value="7">伊達</option><option value="8">北条</option><option value="9">長宗</option><option value="10">島津</option><option value="11">豊臣</option><option value="12">最上</option></select></tr>';
            var x = new Array(7);
            x[0] = new Array('',2,5,9,14,20,27);
            x[1] = new Array(1,4,8,13,19,26,33);
            x[2] = new Array(3,7,12,18,25,32,38);
            x[3] = new Array(6,11,17,24,31,37,42);
            x[4] = new Array(10,16,23,30,36,41,45);
            x[5] = new Array(15,22,29,35,40,44,47);
            x[6] = new Array(21,28,34,39,43,46,48);
            tmp+='<tr><th colspan=7>北西</th><th colspan=7>北東</th></tr>';
            for(i=6;i>=0;i--){
                tmp+='<tr>';
                for(j=6;j>=0;j--) {
                    tmp+='<td id="hs'+x[i][j]+'">'+x[i][j]+'</td>';
                }
                for(j=0;j<7;j++){
                    tmp+='<td id="ht'+x[i][j]+'">'+x[i][j]+'</td>';
                }
                tmp+='</tr>';
            }
            tmp+='<tr><th colspan=7>南西</th><th colspan=7>南東</th></tr>';
            for(i=0;i<7;i++){
                tmp+='<tr>';
                for(j=6;j>=0;j--) {
                    tmp+='<td id="ns'+x[i][j]+'">'+x[i][j]+'</td>';
                }
                for(j=0;j<7;j++){
                    tmp+='<td id="nt'+x[i][j]+'">'+x[i][j]+'</td>';
                }
                tmp+='</tr>';
            }
            tmp+='<tr><td colspan=14>【消沈<<<<font color="#ff4c4c">激戦</font>】<input id="update_map" type=button value="　　現在の戦況を確認する　　"></td></tr></tbody></table></div>';
            $('span#all_map').append(tmp);
            $("input#update_map").live("click",function() {
                $("input#update_map").attr("disabled","disabled");
                get_map_status(0,0,12,28);
            });
        });
    }

    //////////////////////
    //地図: 部隊状況表示
    //////////////////////
    function map_butai_status() {
        if (typeof(this.ajflag)=='undeifned') {
            this.ajflag = true;
        }
        if (location.pathname!="/map.php") return;
        if (!options['map_butai_status']) return;
        var btimer = new Array(5);
        var wtime  = new Array(5);
        $('#act_battle_data').find('th').eq(0).replaceWith('<th>部隊名</th>');
        $('#act_battle_data').find('th').eq(1).replaceWith('<th>&nbsp;&nbsp;&nbsp;&nbsp;状況&nbsp;&nbsp;&nbsp;&nbsp;</th>');
        $('#act_battle_data tbody').find('tr').eq(3).after('<tr><th></th><td></td></tr>');
        $.ajax({
            url: '/facility/unit_status.php?dmo=all',
            cache: false,
            dataType: "text",
            success: function (html){
            var fighter = new Array(5);
            var bomtime = new Array(5);
            for(var i=0;i<5;i++) {
                fighter[i] = $(html).find('div.ig_fight_statusarea').eq(i).find('h3').eq(0).text();
                bomtime[i] = $(html).find('div.ig_fight_statusarea').eq(i).find('div.ig_fight_dotbox table.paneltable.table_fightlist').find('tr').eq(0).find('td').eq(0).find('span').text();
                if(bomtime[i] == ''&&fighter[i]!=''){
                    bomtime[i]='待機';
                }else if(bomtime[i]==''&&fighter[i]==''){
                    fighter[i]='&nbsp;';
                    bomtime[i]='&nbsp;';
                }else{
                    var len = bomtime[i].indexOf('あと');
                    bomtime[i]=bomtime[i].substring(len+2,len+10);
                    var wdate = bomtime[i].split(':');
                    wtime[i] = new Date();
                    wtime[i].setHours(wdate[0]);
                    wtime[i].setMinutes(wdate[1]);
                    wtime[i].setSeconds(wdate[2]);
                    if(btimer[i]){clearInterval(btimer[i]);}
                    if(i==0) {
                        btimer[i]=setInterval(function() {
                            var j=0;
                            wtime[j].setSeconds(wtime[j].getSeconds()-1);
                            $('#act_battle_data tbody').find('span#bt'+j).replaceWith('<span id="bt'+j+'">('+("0"+wtime[j].getHours()).slice(-2)+':'+("0"+wtime[j].getMinutes()).slice(-2)+':'+("0"+wtime[j].getSeconds()).slice(-2)+')</span>');
                            if(wtime[j].getHours()==0&&wtime[j].getMinutes()==0&&wtime[j].getSeconds()==0){clearInterval(btimer[j]);setTimeout(function(){location.href='/map.php';}, 5000);return;}
                        },1000);
                    }else if(i==1) {
                        btimer[i]=setInterval(function() {
                            var j=1;
                            wtime[j].setSeconds(wtime[j].getSeconds()-1);
                            $('#act_battle_data tbody').find('span#bt'+j).replaceWith('<span id="bt'+j+'">('+("0"+wtime[j].getHours()).slice(-2)+':'+("0"+wtime[j].getMinutes()).slice(-2)+':'+("0"+wtime[j].getSeconds()).slice(-2)+')</span>');
                            if(wtime[j].getHours()==0&&wtime[j].getMinutes()==0&&wtime[j].getSeconds()==0){clearInterval(btimer[j]);setTimeout(function(){location.href='/map.php';}, 5000);return;}
                        },1000);
                    }else if(i==2) {
                        btimer[i]=setInterval(function() {
                            var j=2;
                            wtime[j].setSeconds(wtime[j].getSeconds()-1);
                            $('#act_battle_data tbody').find('span#bt'+j).replaceWith('<span id="bt'+j+'">('+("0"+wtime[j].getHours()).slice(-2)+':'+("0"+wtime[j].getMinutes()).slice(-2)+':'+("0"+wtime[j].getSeconds()).slice(-2)+')</span>');
                            if(wtime[j].getHours()==0&&wtime[j].getMinutes()==0&&wtime[j].getSeconds()==0){clearInterval(btimer[j]);setTimeout(function(){location.href='/map.php';}, 5000);return;}
                        },1000);
                    }else if(i==3) {
                        btimer[i]=setInterval(function() {
                            var j=3;
                            wtime[j].setSeconds(wtime[j].getSeconds()-1);
                            $('#act_battle_data tbody').find('span#bt'+j).replaceWith('<span id="bt'+j+'">('+("0"+wtime[j].getHours()).slice(-2)+':'+("0"+wtime[j].getMinutes()).slice(-2)+':'+("0"+wtime[j].getSeconds()).slice(-2)+')</span>');
                            if(wtime[j].getHours()==0&&wtime[j].getMinutes()==0&&wtime[j].getSeconds()==0){clearInterval(btimer[j]);setTimeout(function(){location.href='/map.php';}, 5000);return;}
                        },1000);
                    } else {
                        btimer[i]=setInterval(function() {
                            var j=4;
                            wtime[j].setSeconds(wtime[j].getSeconds()-1);
                            $('#act_battle_data tbody').find('span#bt'+j).replaceWith('<span id="bt'+j+'">('+("0"+wtime[j].getHours()).slice(-2)+':'+("0"+wtime[j].getMinutes()).slice(-2)+':'+("0"+wtime[j].getSeconds()).slice(-2)+')</span>');
                            if(wtime[j].getHours()==0&&wtime[j].getMinutes()==0&&wtime[j].getSeconds()==0){clearInterval(btimer[j]);setTimeout(function(){location.href='/map.php';}, 5000);return;}
                        },1000);
                    }
                    var a = $(html).find('div.ig_fight_statusarea').eq(i).find('div.ig_fight_dotbox table.paneltable.table_fightlist tbody tr.noborder').eq(0).find('img').get()[1].src;
                    var m='';
                    if(a.indexOf('mode_meeting.png')!=-1){m='合流';}
                    if(a.indexOf('mode_return.png')!=-1){m='帰還';}
                    if(a.indexOf('mode_attack.png')!=-1){m='攻撃';}
                    if(a.indexOf('icon_backup.png')!=-1){m='加勢';}
                    bomtime[i]=m;
                }
                fighter[i] = fighter[i].replace('部隊','');
                $('#act_battle_data tbody').find('th').eq(i).replaceWith('<th>'+fighter[i]+'</th>');
                $('#act_battle_data tbody').find('td').eq(i).replaceWith('<td>'+bomtime[i]+'<span id="bt'+i+'"></span></td>');
            }
            return;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            return false;
        }
        });
        return;
    }

    //////////////////////
    //施設の情報：
    //////////////////////
    function facility_check() {
        if (location.pathname!="/facility/facility.php") return;

        var fname = $('DIV.ig_tilesection_detailarea > H3:eq(0) > A').text();
        var soldiertype = {};
        if (options['def_kind_soldier'][1]) {soldiertype['足軽'] = [9, 14, 5, 5];}
        if (options['def_kind_soldier'][2]) {soldiertype['長槍足軽'] = [14, 20, 7, 8];}
        if (options['def_kind_soldier'][3]) {soldiertype['武士'] = [18, 27, 9, 11];}
        if (options['def_kind_soldier'][4]) {soldiertype['弓足軽'] = [14, 9, 5, 5];}
        if (options['def_kind_soldier'][5]) {soldiertype['長弓兵'] = [20, 14, 8, 7];}
        if (options['def_kind_soldier'][6]) {soldiertype['弓騎馬'] = [27, 18, 11, 9];}
        if (options['def_kind_soldier'][7]) {soldiertype['騎馬兵'] = [5, 5, 9, 14];}
        if (options['def_kind_soldier'][8]) {soldiertype['精鋭騎馬'] = [7, 8, 14, 20];}
        if (options['def_kind_soldier'][9]) {soldiertype['赤備え'] = [9, 11, 18, 27];}
        if (options['def_kind_soldier'][10]) {soldiertype['鉄砲足軽'] = [72, 67, 90, 75];}
        if (options['def_kind_soldier'][11]) {soldiertype['騎馬鉄砲'] = [67, 90, 72, 75];}
        if (options['def_kind_soldier'][12]) {soldiertype['破城鎚'] = [14, 7, 11, 9];}
        if (options['def_kind_soldier'][13]) {soldiertype['攻城櫓'] = [22, 16, 11, 14];}
        if (options['def_kind_soldier'][14]) {soldiertype['大筒兵'] = [69, 81, 108, 45];}

        if ((options['market_desc']) && (fname=='市')) {
            var tmp1 = $('DIV.ig_tilesection_mid:eq(0)').clone();
            var tmp2 = $('DIV.ig_tilesection_mid:eq(1)').clone();
            $('DIV.ig_tilesection_mid:eq(0)').replaceWith(tmp2);
            $('DIV.ig_tilesection_mid:eq(1)').replaceWith(tmp1);

        }

        if ((fname=='厩舎') || (fname=='足軽兵舎') || (fname=='弓兵舎') || (fname=='兵器鍛冶')) {
            var wood = parseInt($('#wood').text());
            var stone = parseInt($('#stone').text());
            var iron = parseInt($('#iron').text());
            var rice = parseInt($('#rice').text());

            if (options['desc_soldier']) {
                var line = new Array();
                var count = 0;
                var $targetLoop = $('DIV.ig_tilesection_mid:eq(1) > DIV.ig_tilesection_innermid');
                if ($targetLoop.get().length>0) {
                    $targetLoop.each(function() {
                        line[count++] = $(this);
                    });

                    $('DIV.ig_tilesection_mid:eq(1) > DIV.ig_tilesection_innertop').each(function() {
                        $(this).after(line[--count]);
                    });
                } else {
                    $('DIV.ig_tilesection_mid:eq(1) > DIV.ig_tilesection_innermid2').each(function() {
                        line[count++] = $(this);
                    });

                    $('DIV.ig_tilesection_mid:eq(1) > DIV.ig_tilesection_innertop2').each(function() {
                        $(this).after(line[--count]);
                    });
                }
            }
            if ((options['facility_maxsoldier']) || (options['def_num_of_soldier']!='0')) {
                $('DIV.ig_tilesection_mid DIV.ig_tilesection_detailarea > H3').each(function() {
                    var soltype = $(this).text().slice(1, -1);
                    if (typeof(soldiertype[soltype])!='undefined') {
                        var $parent = $(this).parent();
                        var maxsol = 150000;
                        if ((wood/soldiertype[soltype][0])<maxsol) maxsol = Math.floor(wood/soldiertype[soltype][0]);
                        if ((stone/soldiertype[soltype][1])<maxsol) maxsol = Math.floor(stone/soldiertype[soltype][1]);
                        if ((iron/soldiertype[soltype][2])<maxsol) maxsol = Math.floor(iron/soldiertype[soltype][2]);
                        if ((rice/soldiertype[soltype][3])<maxsol) maxsol = Math.floor(rice/soldiertype[soltype][3]);
                        if (maxsol>=100) {
                            if (options['def_num_of_soldier']!='0') {
                                if (parseInt(options['def_num_of_soldier'])>maxsol) {
                                    $parent.find('INPUT[type="text"]').val(''+maxsol);
                                } else {
                                    $parent.find('INPUT[type="text"]').val(options['def_num_of_soldier']);
                                }
                            }
                            if (options['facility_maxsoldier']) {
                                $parent.find('INPUT[type="submit"]').before('<SPAN value="'+maxsol+'" style="margin-left:-8px;cursor:pointer;" class="ixamoko_maxsol">('+maxsol+')</SPAN>');
                                $('.ixamoko_maxsol').click(function(e) {
                                    $(this).parent().find('INPUT[type="text"]').val($(this).attr('value'));
                                });
                            }
                        }
                    }
                });
            }
        } else if ((options['market_maxsoldier']) && (fname=='市')) {
            var wood = parseInt($('#wood').text());
            var stone = parseInt($('#stone').text());
            var iron = parseInt($('#iron').text());
            var rice = parseInt($('#rice').text());
            var rate = parseInt($('DIV.ig_tilesection_detailarea IMG[alt="取引相場"]').parent().next().find('SPAN').text().substring(0, 2))/100;
            var all = new Array(wood,stone,iron,rice);
            var tmp = '<TABLE style="background-color:#F3F2DE;" class="common_table1 center" width="100%"><TR><TH>複合</TH><TH>兵士</TH><TH>不足</TH><TH>過剰</TH><TH>作成可能</TH></TR>';
            for(var key in soldiertype) {
                var moko = maxsoldier(wood, stone, iron, rice, soldiertype[key][0], soldiertype[key][1], soldiertype[key][2], soldiertype[key][3], rate);
                if (moko.maxsoldier<100) {
                    tmp += '<TR><TD><input type="checkbox" id="'+key+'"></TD><TD>'+key+'</TD><TD>-</TD><TD>-</TD><TD>100未満</TD></TR>';
                } else {
                    tmp += '<TR><TD><input type="checkbox" id="'+key+'"></TD><TD>'+key+'</TD><TD>'+moko.shortage+'</TD><TD>'+moko.excess+'</TD><TD>'+moko.maxsoldier+'</TD></TR>';
                }
            }
            tmp += '<TR><TD colspan=2><div id="merge">-</div></TD><TD id="shortage">-</TD><TD id="excess">-</TD><TD id="maxsoldier">-</TD></TR>';
            tmp += '</TABLE>';
            $('IMG[alt="市での取引"]').after(tmp);

            for(var key in soldiertype) {
                $('input#'+key).click(function() {
                    var tmp2 = '';
                    var wood2 = 0;
                    var stone2 = 0;
                    var iron2 = 0;
                    var rice2 = 0;
                    var checker=0;
                    for(var key in soldiertype) {
                        if($('input#'+key).attr('checked')) {
                            checker++;
                            tmp2+='<div>'+key+'</div>';
                            wood2+=soldiertype[key][0];
                            stone2+=soldiertype[key][1];
                            iron2+=soldiertype[key][2];
                            rice2+=soldiertype[key][3];
                        }
                    }
                    var moko = maxsoldier(wood, stone, iron, rice, wood2, stone2, iron2, rice2, rate);
                    if(checker==0) {
                        tmp2='-';
                        moko.shortage = '-';
                        moko.excess = '-';
                        moko.maxsoldier = '-';
                    }
                    $('div#merge').replaceWith('<div id="merge">'+tmp2+'</div>');
                    $('td#shortage').replaceWith('<TD id="shortage">'+moko.shortage+'</TD>');
                    $('td#excess').replaceWith('<TD id="excess">'+moko.excess+'</TD>');
                    $('td#maxsoldier').replaceWith('<TD id="maxsoldier">'+moko.maxsoldier+'</TD');

                    $('#shortage > span.ixamoko_short').hover(function() {
                        $(this).css({backgroundColor:'#afa', textDecoration:'underline'});
                    }, function() {
                        $(this).css({backgroundColor:'', textDecoration:''});
                    }).click(function(e) {
                        var $this = $(this);
                        $('#select2').val($this.attr('type'));
                        if ($('#tc').val()=='') $('#tc').val($this.attr('value'));
                    });
                    $('#excess > span.ixamoko_excess').hover(function() {
                        $(this).css({backgroundColor:'#afa', textDecoration:'underline'});
                    }, function() {
                        $(this).css({backgroundColor:'', textDecoration:''});
                    }).click(function(e) {
                        var $this = $(this);
                        $('#select').val($this.attr('type'));
                        if ($('#tc').val()=='') $('#tc').val($this.attr('value'));
                    });
                });
            }

            $('SPAN.ixamoko_short').hover(function() {
                $(this).css({backgroundColor:'#afa', textDecoration:'underline'});
            }, function() {
                $(this).css({backgroundColor:'', textDecoration:''});
            }).click(function(e) {
                var $this = $(this);
                $('#select2').val($this.attr('type'));
                if ($('#tc').val()=='') $('#tc').val($this.attr('value'));
            });
            $('SPAN.ixamoko_excess').hover(function() {
                $(this).css({backgroundColor:'#afa', textDecoration:'underline'});
            }, function() {
                $(this).css({backgroundColor:'', textDecoration:''});
            }).click(function(e) {
                var $this = $(this);
                $('#select').val($this.attr('type'));
                if ($('#tc').val()=='') $('#tc').val($this.attr('value'));
            });
        }

        function maxsoldier(a, b, c, d, aa, bb, cc, dd, rate) {
            var cmax = 1500000;
            if ((a/aa)<cmax) cmax = Math.floor(a/aa);
            if ((b/bb)<cmax) cmax = Math.floor(b/bb);
            if ((c/cc)<cmax) cmax = Math.floor(c/cc);
            if ((d/dd)<cmax) cmax = Math.floor(d/dd);
            var i;
            for(i=(cmax+1);i<15000;++i) {
                var shortage = 0;
                var excess = 0;
                if ((i*aa)>a) {
                    shortage += i*aa-a;
                } else {
                    excess += a-i*aa;
                }
                if ((i*bb)>b) {
                    shortage += i*bb-b;
                } else {
                    excess += b-i*bb;
                }
                if ((i*cc)>c) {
                    shortage += i*cc-c;
                } else {
                    excess += c-i*cc;
                }
                if ((i*dd)>d) {
                    shortage += i*dd-d;
                } else {
                    excess += d-i*dd;
                }
                if (excess*rate<shortage) break;
            }
            --i;
            var tmp1 = '[必要 ';
            var tmp1c = 0;
            var tmp1t = null;
            var tmp2 = '[余剰 ';
            if ((i*aa)<a) {
                var tmpx = (a-i*aa);
                tmp2 += ' <SPAN class="ixamoko_excess" type="101" value="'+tmpx+'">木: '+tmpx+'</SPAN>';
            } else {
                var tmpx = Math.ceil((i*aa-a)/rate);
                tmp1 += ' <SPAN class="ixamoko_short" type="101" value="'+tmpx+'">木: '+tmpx+'</SPAN>'
                ++tmp1c;
                tmp1t = 101;
            }
            if ((i*bb)<b) {
                var tmpx = (b-i*bb);
                tmp2 += ' <SPAN class="ixamoko_excess" type="102" value="'+tmpx+'">綿: '+tmpx+'</SPAN>';
            } else {
                var tmpx = Math.ceil((i*bb-b)/rate);
                tmp1 += ' <SPAN class="ixamoko_short" type="102" value="'+tmpx+'">綿: '+tmpx+'</SPAN>';
                ++tmp1c;
                tmp1t = 102;
            }
            if ((i*cc)<c) {
                var tmpx = (c-i*cc);
                tmp2 += ' <SPAN class="ixamoko_excess" type="103" value="'+tmpx+'">鉄: '+tmpx+'</SPAN>';
            } else {
                var tmpx = Math.ceil((i*cc-c)/rate);
                tmp1 += ' <SPAN class="ixamoko_short" type="103" value="'+tmpx+'">鉄: '+tmpx+'</SPAN>';
                ++tmp1c;
                tmp1t = 103;
            }
            if ((i*dd)<d) {
                var tmpx = (d-i*dd);
                tmp2 += ' <SPAN class="ixamoko_excess" type="104" value="'+tmpx+'">糧: '+tmpx+'</SPAN>';
            } else {
                var tmpx = Math.ceil((i*dd-d)/rate);
                tmp1 += ' <SPAN class="ixamoko_short" type="104" value="'+tmpx+'">糧: '+tmpx+'</SPAN>';
                ++tmp1c;
                tmp1t = 104;
            }
            tmp1 += ']';
            tmp2 += ']';
            var moko = {
                    shortage: tmp1,
                    excess: tmp2,
                    maxsoldier: i,
                    shortc: tmp1c,
                    shortt: tmp1t
            }
            return moko;
        }
        after_tohankaku();
    }

    //////////////////////
    //内政：
    //////////////////////
    function village_check() {
        if (location.pathname!="/village.php") return;

        if (options['faci_list']) {
            var MAXLVL = 10;

            var tmp = '';
            for(var i=1;i<MAXLVL;++i) {
                var $count = $('AREA[alt$="LV.'+i+'"]');
                if ($count.get().length>0) {
                    tmp += 'LV.'+i+'施設残: '+$count.get().length+'<BR />';
                }
            }
            var $building = $('.buildStatus');
            var buildingNow = $building.get().length;
            if (buildingNow>0) {
                tmp += '建築中: '+buildingNow+'<BR />';
            }
            $('#mokotool').append('<DIV>'+tmp+'</DIV>');
        }
    }

    function non_back() {
        if (location.pathname!="/village.php") return;
        if (!options['non_back']) return;
        $('div#back_bottom').remove();
    }
    //////////////////////
    //空地戦力：
    //////////////////////
    function map_potential() {
        if (location.pathname!="/facility/send_troop.php" && location.pathname!="/land.php") return;
        if (!options['map_potential']) return;
        var tmp = location.search.match(/x=([-]*\d+).*y=([-]*\d+).*c=(\d+)/);
        if(tmp==null){
            var x = $("*[name=village_x_value]").val();
            var y = $("*[name=village_y_value]").val();
            var c = $('#kyoten').val();
            if(typeof(c)!='undefined'){
                c = c.match(/x=([-]*\d+).*y=([-]*\d+).*c=(\d+)/);
                c=c[3];
                tmp = [,x,y,c];
            }
        }
        if (tmp!=null) {
            const potential_list = {
                    '1000': '★1　[平 1000]<ul><li>×槍245</li><li>×弓185</li><li>◎馬155</li><li>×器203</li></ul>',
                    '0100': '★1　[平 0100]<ul><li>×槍185</li><li>◎弓155</li><li>×馬245</li><li>×器173</li></ul>',
                    '0020': '★2　[鉄 0020]<ul><li>×槍520</li><li>×弓520</li><li>×馬520</li><li>◎器448</li></ul>',
                    '0001': '★2　[平 0001]<ul><li>◎槍370</li><li>×弓550</li><li>×馬430</li><li>◎器370</li></ul>',
                    '2010': '★3　[木 2010]<ul><li>×槍2170</li><li>×弓1210</li><li>◎馬730</li><li>×器1498</li></ul>',
                    '0210': '★3　[綿 0210]<ul><li>×槍1210</li><li>◎弓730</li><li>×馬2170</li><li>×器1018</li></ul>',
                    '0012': '★3　[糧 0012]<ul><li>◎槍730</li><li>×弓2170</li><li>×馬1210</li><li>×器1018</li></ul>',
                    '3010': '★4　[木 3010]<ul><li>×槍4890</li><li>×弓3170</li><li>◎馬2310</li><li>×器3686</li></ul>',
                    '0300': '★4　[綿 0300]<ul><li>×槍3220</li><li>◎弓2210</li><li>×馬5240</li><li>×器2816</li></ul>',
                    '0031': '★4　[鉄 0031]<ul><li>◎計3200</li></ul>',
                    '0003': '★4　[糧 0003]<ul><li>◎槍2320</li><li>×弓5080</li><li>×馬3240</li><li>×器2872</li></ul>',
                    '4011': '★5　[木 4011]<ul><li>×槍17360</li><li>×弓11390</li><li>◎馬6445</li><li>×器12341</li></ul>',
                    '0411': '★5　[綿 0411]<ul><li>×槍11470</li><li>◎弓5985</li><li>×馬17680</li><li>×器8868</li></ul>',
                    '0040': '★5　[鉄 0040]<ul><li>×槍11800</li><li>×弓11800</li><li>×馬11800</li><li>◎器10360</li></ul>',
                    '0005': '★5　[糧 0005]<ul><li>◎槍6370</li><li>×弓17785</li><li>×馬11540</li><li>×器8536</li></ul>',
                    '3223': '★5　[木 3223]<ul><li>×槍15250</li><li>◎弓8050</li><li>×馬12850</li><li>×器10930</li></ul>',
                    '5011': '★6　[木 5011]<ul><li>×槍62250</li><li>×弓31550</li><li>◎馬16200</li><li>×器40760</li></ul>',
                    '0511': '★6　[綿 0511]<ul><li>×槍31960</li><li>◎弓17510</li><li>×馬60860</li><li>×器26180</li></ul>',
                    '1051': '★6　[鉄 1051]<ul><li>◎計61600</li></ul>',
                    '2228': '★6　[糧 2228]<ul><li>◎槍16900</li><li>×弓62500</li><li>×馬32100</li><li>×器26020</li></ul>',
                    '5555': '★7　[山 5555]<ul><li>×槍186700</li><li>×弓94200</li><li>◎馬47950</li><li>×器121950</li></ul>',
                    '1211': '★7　[山 1211]<ul><li>×槍103700</li><li>◎弓57800</li><li>×馬195500</li><li>×器85340</li></ul>',
                    '4450': '★7　[山 4450]<ul><li>◎計104800</li></ul>',
                    '2223': '★7　[山 2223]<ul><li>◎槍46950</li><li>×弓187800</li><li>×馬93900</li><li>×器75120</li></ul>',
            };
            var tiles = new Array();
            tiles['森林'] = '0';
            tiles['綿花'] = '0';
            tiles['鉄鉱山'] = '0';
            tiles['畑'] = '0';

            $.ajax({
                url:'/land.php?x='+tmp[1]+'&y='+tmp[2]+'&c='+tmp[3],
                dataType: "text",
                success: function (html) {
                $(html).find('div[class^="ig_mappanel_tilelist_"]').each(function() {
                    var tmp = $(this).text().match(/\s*(\D+)(\d+)/);
                    if (tmp!==null) {
                        tiles[tmp[1]] = tmp[2];
                    }
                });
                var tiles_text = tiles['森林'] + tiles['綿花'] + tiles['鉄鉱山'] + tiles['畑'];
                if (tiles_text in potential_list) {
                    $('#mokotool').append('<SPAN class="normal">必要攻撃力<BR />'+ potential_list[tiles_text] +'</SPAN>');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(textStatus);
            }
            });
        }
    }

    //////////////////////
    //書状：ナビを上部に
    //////////////////////
    function message_check() {
        if (location.pathname!="/message/detail.php") return;
        var navi = $('.message_footernavi').clone();
        $('.common_box3bottom').prepend(navi);
    }

    //////////////////////
    //報告書：ナビを上部に
    //////////////////////
    function report_check() {
        $('li.gnavi05.iepngfix').find('a').eq(0).replaceWith('<a href="/war/war_situation.php">合戦</a>');
        if (location.pathname!="/report/detail.php") return;
        var navi = $('.report_navi').clone();
        $('.ig_decksection_innermid').prepend(navi);
    }

    //////////////////////
    //同盟掲示板：戻るボタン追加
    //////////////////////
    function bbs_check() {
        if (location.pathname!="/bbs/res_view.php") return;
        var tmp = '<div align="center" style="margin-top:15px; margin-bottom: 15px;"><a href="/bbs/topic_view.php"><img style="opacity: 1;" src="/img/common/btn_back.gif" class="fade" alt="戻る" title="戻る"></a></div>';
        $('DIV[class="common_box3"]').after(tmp);
    }

    //////////////////////
    //部隊：戻るボタン修正
    //////////////////////
    function fade_button_check() {
        if (location.pathname!="/facility/set_unit_list.php" && location.pathname!="/facility/unit_list.php" && location.pathname!="/card/deck_card_delete.php") return;
        $('IMG[alt="戻る"]').attr('style','opacity: 1;').attr('class','fade');
    }

    //////////////////////
    //部隊：簡易兵士編成リンクを100件に
    //////////////////////
    function set_unit_default_check() {
        if (location.pathname!="/card/deck.php" && location.pathname!="/facility/unit_status.php" && location.pathname!="/facility/unit_list.php" && location.pathname!="/card/deck_card_delete.php") return;
        $('A[href="/facility/set_unit_list.php"]').attr('href','/facility/set_unit_list.php?show_num=100');
    }

    //////////////////////
    //チャット：はじめからを100件に
    //////////////////////
    function chat_default_check() {
        $('A[href="/alliance/chat_view.php"]').attr('href','/alliance/chat_view.php?pager_select=100');
    }

    //////////////////////
    //取引：カードナンバー順に
    //////////////////////
    function trade_default_check() {
        $('A[href="/card/trade.php"]').attr('href','/card/trade.php?t=name&k=&s=no&o=a');
    }

    function send_troop_check() {
        if(location.pathname != "/land.php") return;
        tmp=$('a[href^="facility/send_troop.php?x"]').clone();
        $('.ig_mappanel_maindataarea').find('h3').append(tmp);
    }

    //////////////////////
    //犬
    //////////////////////
    function dog_balloon(x, y, n, c, target) {  //x座標, y座標, 画像(1-5), セリフ, afterする対象
        var tmp = '<div style="left: '+(x+210)+'px; top: '+y+'px; position: absolute; z-index: 112;"><img src="./img/lot/img_ixadog0'+n+'.png" width="70%"></div>';
        tmp += '<div style="left: '+(x+203)+'px; top: '+(y+18)+'px; position: absolute; z-index: 110;"><img src="img/common/facility_rollover.png"></div>';
        tmp += '<div style="left: '+(x+10)+'px; top: '+(y+10)+'px; position: absolute; z-index: 112;"><img src="./img/lot/img_ixadog_balloon.png" width="70%"></div>';
        tmp += '<div style="left: '+(x+20)+'px; top: '+(y+20)+'px; position: absolute; z-index: 113; font-weight: bold; padding: 1px; width: 170px; height: 46px; overflow: hidden;">'+c+'</div>';
        $(target).after(tmp);
    }

    //////////////////////
    //ユーザー表示: よく使う所領を登録して地図に表示
    //////////////////////
    function user_check() {
        if ((location.pathname!="/user/")&&(location.pathname!="/land.php")&&(location.pathname!="/war/fight_history.php")&&(location.pathname!="/facility/facility.php")) return;
        var map_list = {};
        if (localStorage.getItem("map_list")) {
            map_list = secureEvalJSON(localStorage.getItem("map_list"));
        }
        if (location.pathname=="/user/") {
            $('DIV.common_box3bottom > TABLE').find('TR.fs14').find('A:eq(1)').each(function() {
                var $this = $(this);
                var mname = $this.parent().parent().find('A:eq(0)').text();
                if (typeof(map_list[$this.text()])=='undefined') {
                    $this.attr('href',$this.attr('href').replace('land.php','map.php'));
                    $this.after('&nbsp;<INPUT mname="'+mname+'" cood="'+$this.text()+'" class="reg_map" type="button" value="ここを記憶" />');
                } else {
                    $this.after('&nbsp;<INPUT mname="'+mname+'" cood="'+$this.text()+'" class="remove_map" type="button" value="ここを忘れる" />');
                }
            });
        } else if (location.pathname=="/land.php") {
            var mname=$('h3:eq(0)').text();
            var code=location.search.replace('?','');
            code=code.split("&");
            code=code[0].replace('x=','')+','+code[1].replace('y=','');
            if (typeof(map_list[code])=='undefined') {
                $('.ig_mappanel_maindataarea').find('h3').append('&nbsp;<INPUT mname="'+mname+'" cood="'+code+'" class="reg_map" type="button" value="ここを記憶" />');
            } else {
                $('.ig_mappanel_maindataarea').find('h3').append('&nbsp;<INPUT mname="'+mname+'" cood="'+code+'" class="remove_map" type="button" value="ここを忘れる" />');
            }
        } else if(location.pathname=="/war/fight_history.php") {
            var cnt=0;
            $('.ig_battle_table').find('tr').each(function(){
                if(cnt==0){
                    $(this).find('th:eq(3)').after('<th>記憶</th>');
                    cnt++;
                } else {
                    var tmp=$(this).find('td:eq(3)').text();
                    var mname=tmp.substring(0,tmp.indexOf("　("));
                    var code=tmp.substring(tmp.indexOf("　("),tmp.indexOf(")"));
                    code=code.replace("　(",'');
                    if (typeof(map_list[code])=='undefined') {
                        $(this).find('td:eq(3)').after('<td><INPUT mname="'+mname+'" cood="'+code+'" class="reg_map" type="button" value="ここを記憶" /></td>');
                    } else {
                        $(this).find('td:eq(3)').after('<td><INPUT mname="'+mname+'" cood="'+code+'" class="remove_map" type="button" value="ここを忘れる" /></td>');
                    }
                    cnt++;
                }
            });
        }
        $('INPUT.reg_map').click(function(e) {
            if (confirm('本当に登録してよいですか')) {
                var $this = $(this);
                var map_list = {};
                if (localStorage.getItem("map_list")) {
                    map_list = secureEvalJSON(localStorage.getItem("map_list"));
                }
                var cood = $this.attr('cood');
                var mname = $this.attr('mname');
                map_list[cood] = mname;
                localStorage.setItem("map_list", toJSON(map_list));
            }
        });
        $('INPUT.remove_map').click(function(e) {
            if (confirm('本当に削除してよいですか')) {
                var $this = $(this);
                if (localStorage.getItem("map_list")) {
                    var map_list = secureEvalJSON(localStorage.getItem("map_list"));
                    var cood = $this.attr('cood');
                    var mname = $this.attr('mname');
                    if (typeof(map_list[cood])!='undefined') {
                        delete map_list[cood];
                        localStorage.setItem("map_list", toJSON(map_list));
                    }
                }
            }
        });
    }

    //////////////////////
    //合戦報告書リンク：
    //////////////////////
    function reportlist_check() {
        switch (location.pathname){
            case "/user/":
                _add_warlist_user(); break;
            case "/land.php":
                _add_warlist_land(); break;
            default: break;
        }
    }
    function _add_warlist_user() {
        //if (location.pathname!="/user/") return;
        $('DIV.common_box3bottom > TABLE').find('a[href^="/message/new.php?user_id="]').eq(0).each(function() {
            var $this = $(this);
            var name = $this.parent().text();
            $this.after('&nbsp;<span style="font-weight: normal;font-size: 12px;"><a href="/war/list.php?m=&s=1&name=lord&word='+name+'&coord=map&x=&y=">[合戦報告書]</a></span>');
        });
        //$('DIV.common_box3bottom > TABLE').find('strong').find('A:eq(0)').each(function() {
        //    var $this = $(this);
        //    var name = $this.parent().text();
        //    $this.after('&nbsp;<span style="font-weight: normal;font-size: 12px;"><a href="/war/list.php?m=&s=1&name=lord&word='+name+'&coord=map&x=&y=">[合戦報告書]</a></span>');
        //});
        $('DIV.common_box3bottom > TABLE').find('DIV.pro4').find('A:eq(0)').each(function() {
            var $this = $(this);
            var name = $this.parent().text();
            $this.after('&nbsp;<span style="font-weight: normal;font-size: 12px;"><a href="/war/list.php?m=&s=1&name=alliance&word='+name+'&coord=map&x=&y=">[合戦報告書]</a></span>');
        });
    }
    function _add_warlist_land() {
        //if (location.pathname!="/land.php") return;
        $('DIV.ig_mappanel_dataarea').find('A[href^="/user/"]').each(function() {
            var $this = $(this);
            var name = $this.text();
            $this.after('&nbsp<a href="/war/list.php?m=&s=1&name=lord&word='+name+'&coord=map&x=&y=">[報]</a>');
        });
        $('DIV.ig_mappanel_dataarea').find('A[href^="/alliance/"]').each(function() {
            var $this = $(this);
            var name = $this.text();
            $this.after('&nbsp<a href="/war/list.php?m=&s=1&name=alliance&word='+name+'&coord=map&x=&y=">[報]</a>');
        });
    }

    //////////////////////
    //チャット履歴：同盟掲示板にリンクをつける
    //////////////////////
    function chat_log_check() {
        if (location.pathname!="/alliance/chat_view.php" && location.pathname!="/bbs/res_view.php") return;
        $('UL[class="clearfix"] > LI:eq(2)').wrap('<a href="/bbs/topic_view.php" style="color: #006600;text-decoration: underline;"></a>');
    }

    //////////////////////
    //チャット：
    //////////////////////
    function chat_check() {
        if (options['chat_linkchg']) $('DIV[class="commentbtn2"] > A:eq(1)').attr('href', '/alliance/chat_view.php');

        if (options['chat_mikire']) {
            $('TD[class="al"]').css({width: '105px', height: '14px'}).find('> A').css({width: '105px', overflow: 'hidden'});
            $('TD[class="msg"] > SPAN').css('width', '230px');

            $('UL[class="commentbtn"] > LI[class="right"] > A, UL[class="commentclose"] > LI:eq(0) > A').click(function(e) {
                setTimeout(function(){
                    $('TD[class="al"]').css({width: '105px', height: '14px'}).find('> A').css({width: '105px', overflow: 'hidden'});
                    $('TD[class="msg"] > SPAN').css('width', '230px');
                }, 500);
            });
        }
    }

    //////////////////////
    //秘境探索：デフォでチェックが入っている、出発ボタンを上にも
    //////////////////////
    function dungeon_check() {
        if(location.pathname != "/facility/dungeon.php" && location.pathname!="/facility/dungeon02.php") return;

        if (options['hikyou']) {
            var tmp = $('INPUT[name="unit_select"]:first').attr('checked', true);
            if (tmp.get().length>0) {
                var dungeon_btn = $('IMG[alt="出発"]').parent().clone().wrap($('<DIV class="center">')).parent();
                $('#dungeon_list_body').after(dungeon_btn);
            }
        }
        var idx = localStorage.getItem(location.hostname + 'dungeon_idx');

        if (idx!=null) {
            $('INPUT[name="dungeon_select"][value="'+idx+'"]').attr('checked', true);
        }
        $('INPUT[name="dungeon_select"]').change(
                function() {
                    localStorage.setItem(location.hostname + 'dungeon_idx', $('INPUT[name="dungeon_select"]:checked').val());
                }, false);
        // change end

        if (options['hikyou_all']) {
            var tmp = '<a href="javascript:void(0)" onclick="return false;" id="send_all"><img src="'+IMAGES.btn_all_departure+'" alt="全部隊出発"></a>';
            $('a[onclick^="submitDungeonForm"]').after(tmp);
            $('#send_all').live('click',function(){
                if(!confirm("選択した内容で秘境探索に全部隊を出陣させます。\nよろしいですか？"))return;
                var unit_array = new Array();
                var i=0;
                $('.ig_decksection_innermid').find('input[name^="unit_select"]').each(function(){
                    unit_array[i] = $(this).attr('value');
                    i++;
                });
                nowLoading();
                send_all_hikyo(unit_array,0,$('INPUT[name="dungeon_select"]:checked').val());
                $('.btnarea').remove();
                $('.center').remove();
            });
        }

        // 新秘境情報を下に
        if(location.pathname =="/facility/dungeon02.php" ){
            $('.dungeon_info')
                .appendTo( $('.ig_decksection_innermid') )
                .css({marginBottom: -20, marginTop: 20})
            ;
        }

    }

    function send_all_hikyo(unit_array,i,d_select) {
        if(unit_array.length <= i) {
            location.href='/facility/dungeon.php';
            return;
        }

        var hikyou_post_url;
        switch ( parseInt( d_select ) ) {
            case 1 : case 2 : case 3 : case 4 :
                hikyou_post_url = '/facility/dungeon.php';
            break;
            case 100 : case 200 :
                hikyou_post_url = '/facility/dungeon02.php';
            break;
            default :
                console.log( 'Invarid HIKYOU number: ' + d_select );
                location.href='/facility/dungeon.php';
                return;
            break;
        }

        var dungeon_select = d_select
        var unit_select = unit_array[i];
        var data = {dungeon_select:dungeon_select,unit_select:unit_select,btn_send:true};
        //console.log( 'Dungeon Number:' + dungeon_select, 'Post URL:'+ hikyou_post_url );
        $.ajax({
            type   : "POST",
            url    : hikyou_post_url,
            data   : data,
            cache  : false,
            success: function (html){
            i++;
            send_all_hikyo(unit_array,i,d_select);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    //////////////////////
    //兵士編成:
    //////////////////////
    function unitList_check() {
        if(location.pathname != "/facility/set_unit_list.php") return;
        var hpstatus = {};
        $('DIV[id^="cardWindow_"]').each(function() {
            var $this = $(this);
            var cid = $this.attr('id').substring(11);
            hpstatus[cid] = $this.find('SPAN.ig_card_status_hp').text();
        });

        var soldiers = {};

        $('SPAN[id^="now_unit_cnt_"]').each(function() {
            var $this = $(this);
            var id_num = $this.attr('id').substring(13);
            var card_id = $('#card_id_arr_'+id_num).val();
            var max = parseInt($this.parent().next('SPAN').text());
            var current = parseInt($this.text());
            var type = $this.parent().prev().prev().attr('alt');
            if (current>0) {
                if (typeof(soldiers[type])=='undefined') {
                    soldiers[type] = current;
                } else {
                    soldiers[type] += current;
                }
            }
            var $pparent = $this.parent().parent().parent();
            if (options['unit_list_hp']) {
                if (typeof(hpstatus[card_id])!='undefined') {
                    $pparent.find('IMG:eq(0)').attr("ALIGN","left");
                    //$pparent.find('A:eq(0)').after('<DIV style="margin-top: 5px; font-size: 11px; width: 100px;">&hearts;'+hpstatus[card_id]+'</DIV>');
                    $pparent.find('A:eq(0) ').after('<DIV style="margin-top: 5px;width:90px;"><span style="color: #e02020;margin-right: 1px;">&hearts;</span><span style="font-size: 11px; ">'+hpstatus[card_id]+'</DIV>');

                    if (options['unit_list_hp_bgc'] && (hpstatus[card_id]!='100/100')) {
                        $pparent.css({backgroundColor:'#aaa'});
                    }
                } else {
                    // $pparent.find('TD:eq(2)').after('<TD>-</TD>');
                }
            }
            if (max==current) {
                $this.css({backgroudColor:'#faa'});
                $pparent.find('TD:eq(5) INPUT').css({backgroundColor:'#fbb'});
            }
        });
        if (options['unit_list_total']) {
            var tmp = '';
            var total = 0;
            for(var key in soldiers) {
                tmp += '<TR><TD>'+key+'</TD><TD>'+soldiers[key]+'</TD></TR>';
                total += soldiers[key];
            }
            tmp += '<TR><TH>合計</TH><TD>'+total+'</TD></TR>';
            if (tmp!='') {
                $('#mokotool').append('<TABLE style="background-color:#F3F2DE;" class="common_table1 center">'+tmp+'</TABLE>');
            }
        }
        var snum = parseInt($('SELECT[name="show_num"]').val());
        if (options['unit_list_group'] && (snum==100)) {
            group_setting = {};
            cardname_setting = {};
            group_index=[];
            if (localStorage.getItem("ixamoko_group_set")!=null) {
                group_setting = secureEvalJSON(localStorage.getItem("ixamoko_group_set"));
            }
            if (localStorage.getItem("ixamoko_card_name")!=null) {
                cardname_setting = secureEvalJSON(localStorage.getItem("ixamoko_card_name"));
            }
            if (localStorage.getItem("ixakaizou_group_index")!=null) {
                group_index = secureEvalJSON(localStorage.getItem("ixakaizou_group_index"));
            }
            var $trth = $('DIV.ig_decksection_innermid > TABLE.common_table1').before('<INPUT type="button" id="ixamoko_reset_grp" value="グループを表示順に覚えなおす" /><SPAN id="ixamoko_reset_grp_result"></SPAN>').find('TR:eq(0)'); //.prepend('<TH><INPUT type="button" value="GRP" id="ixamoko_grp" /></TH>');
            $trth.find('TH:eq(6)').append('<INPUT type="button" value="GRP" id="ixamoko_grp" />');

            $('#ixamoko_reset_grp').click(function(e) {
                var ngroup_setting = {};
                var ngroup_index = [];
                $('SPAN[id^="now_unit_cnt_"]').each(function() {
                    var id_num = $(this).attr('id').substring(13);
                    var card_id = $('#card_id_arr_'+id_num).val();
                    ngroup_setting[card_id] = group_setting[card_id];
                    ngroup_index.push(card_id);
                });
                group_setting = ngroup_setting;
                ngroup_index.reverse();
                group_index = ngroup_index;
                localStorage.setItem('ixamoko_group_set', toJSON(group_setting));
                localStorage.setItem('ixakaizou_group_index', ArraytoJSON(group_index));
                $('#ixamoko_reset_grp_result').html('<SPAN style="color:#000;">Done.</SPAN>');
            });

            $('SPAN[id^="now_unit_cnt_"]').each(function() {
                var $this = $(this);
                var id_num = $this.attr('id').substring(13);
                var card_id = $('#card_id_arr_'+id_num).val();
                var $pparent = $this.parent().parent().parent();
                if (typeof(group_setting[card_id])=='undefined') {
                    group_setting[card_id] = 0;
                }
                cardname_setting[card_id] = $.trim($pparent.find('TD:eq(0) A').text());
                if (typeof(hpstatus[card_id])!='undefined') {
                    if (hpstatus[card_id]=='100/100') {
                        $pparent.css({backgroundColor:groups[group_setting[card_id]]});
                    } else {
                        $pparent.css({backgroundColor:groupsx[group_setting[card_id]]});
                    }
                } else {
                    $pparent.css({backgroundColor:groups[group_setting[card_id]]});
                }
                $pparent.find('IMG:eq(0)').addClass('ixamoko_grp').css({cursor:'pointer'}).attr('cardid', card_id);
                if (options['unit_list_icon']) $pparent.find('IMG:eq(0)').get()[0].src = groups_img[group_setting[card_id]];
            });
            localStorage.setItem('ixamoko_card_name', toJSON(cardname_setting));

            // グループ変更
            $('.ixamoko_grp').live('click', function(e) {
                var $this = $(this);
                var card_id = $this.attr('cardid');

                switch( e.which ){
                    // 左クリック
                    case 1 :
                        ++group_setting[card_id];
                        if (group_setting[card_id]>=groups.length)
                            group_setting[card_id] = 0;
                    break;
                    // 右クリック
                    case 3 :
                        --group_setting[card_id];
                        if (group_setting[card_id] < 0)
                            group_setting[card_id] =groups.length-1;
                    break;
                    default:
                        return false;
                }

                if (typeof(hpstatus[card_id])!='undefined') {
                    if (hpstatus[card_id]=='100/100') {
                        $this.parent().parent().css({backgroundColor:groups[group_setting[card_id]]});
                    } else {
                        $this.parent().parent().css({backgroundColor:groupsx[group_setting[card_id]]});
                    }
                } else {
                    $this.parent().parent().css({backgroundColor:groups[group_setting[card_id]]});
                }
                if (options['unit_list_icon']) $this.get()[0].src = groups_img[group_setting[card_id]];
                localStorage.setItem('ixamoko_group_set', toJSON(group_setting));
                return false;
            });
            // コンテキストメニュー抑止
            $('.ixamoko_grp').live('contextmenu', function(e) { return false });

            $('#ixamoko_grp').click(function(e) {
                for(var i=groups.length-1;i>0;--i) {
                    for(var j=0;j<group_index.length;j++) {
                        if (group_setting[group_index[j]]==i){
                            $trth.after($('IMG[cardid="'+group_index[j]+'"]').parent().parent());
                        }
                    }
                }
            });
            if (options['unit_list_sort_def_grp']) {
                for(var i=groups.length-1;i>0;--i) {
                    for(var j=0;j<group_index.length;j++) {
                        if (group_setting[group_index[j]]==i){
                            $trth.after($('IMG[cardid="'+group_index[j]+'"]').parent().parent());
                        }
                    }
                }
            }
        }
        unit_list_max();
    }

    // ページャーをAJAX仕様のものに置き換える
    function desk_pager_replace() {
        $('UL.pager.cardstock').find('A').each(function() {
            if($(this).attr('title')==''&&$(this).parent().attr('class')!='last') {
                var page = parseInt($('UL.pager.cardstock:eq(0)').find('span').text())-1;
                var npage = '<A class="ixamoko_deckpager" page="'+page+'" href="javascript:void(0);"><</A>';
                $(this).replaceWith(npage);
            } else if($(this).attr('title')=='first page') {
                var npage = '<A class="ixamoko_deckpager" page="1" href="javascript:void(0);"><<</A>';
                $(this).replaceWith(npage);
            } else {
                try {
                    var $this = $(this);
                    var page = parseInt($this.attr('title').substring(1));
                    if (page>0) {
                        var npage = '<A class="ixamoko_deckpager" page="'+page+'" href="javascript:void(0);"> '+page+'</A>';
                        $this.replaceWith(npage);
                    }
                } catch(e) {}
            }
        });
        $('UL.pager.cardstock').find('li.last').find('a').each(function() {
            if($(this).attr('title')=='') {
                var page = parseInt($('UL.pager.cardstock:eq(0)').find('span').text())+1;
                var npage = '<A class="ixamoko_deckpager" page="'+page+'" href="javascript:void(0);">></A>';
                $(this).replaceWith(npage);
            } else if($(this).attr('title')=='last page') {
                //var script = $(this).attr('onclick').toString();
                var script = this.getAttribute('onclick').toString();
                script = script.substring(script.indexOf('"p"'),script.length);
                script = script.split('=');
                script = script[1].split(';');
                script = script[0].replace(/\s|"/g,'');
                var npage = '<A class="ixamoko_deckpager" page="'+script+'" href="javascript:void(0);" id="lastpage">>></A>';
                $(this).replaceWith(npage);
            }
        });
    }

    //////////////////////
    //デッキ: 討伐ゲージ回復時間表示、一番最初の武将を部隊に入れやすく
    //////////////////////
    function disp_ToubatsuRestTime(initFlag) {
        if (typeof(this.ajflag)=='undefined') {
            this.ajflag = false;
        }
        if (initFlag) {
            if(location.pathname != "/card/deck.php"&&location.pathname != "/union/levelup.php"&&location.pathname != "/union/additional.php") return;
            var VILLAGE_OPTION_TAG = 'ixamoko_village_opt';
            if (options['pager_ajax']) {
                desk_pager_replace();
            }

            var data = '';var ano='';var dmo ='';var base_cid ='';var added_cid ='';var union_type='';
            if(location.pathname == "/card/deck.php"){
                ano = $('#assign_form INPUT[name="select_assign_no"]').val();
                dmo = $('#assign_form INPUT[name="deck_mode"]').val();
            } else {
                base_cid = $('#base_cid').val();
                added_cid = $('#added_cid').val();
                union_type = $("*[name=union_type]").val();
            }

            $('A.ixamoko_deckpager').live('click', function(e) {
                if (disp_ToubatsuRestTime.ajflag) return;
                disp_ToubatsuRestTime.ajflag = true;
                var page = $(this).attr('page');
                if(location.pathname == "/card/deck.php"){
                    data = {ano:ano, dmo:dmo, myselect:'', p:page};
                } else {
                    data = {base_cid:base_cid,added_cid:added_cid, union_type:union_type, p:page};
                }
                $.ajax({
                    type: "POST",
                    url: location.pathname,
                    /* data: {p:page}, */
                    /*data: {ano:ano, dmo:dmo, myselect:'', p:page},*/
                    data:data,
                    cache: false,
                    page: page,
                    dataType: "text",
                    success: function (html){
                        var $new_deck = $(html).find('#ig_deckboxInner').find('#deck_file');
                        $('#deck_file').find('#ig_decksection3').replaceWith($new_deck.find('#ig_decksection3'));
                        $('DIV[id^="cardWindow_"]').each(function() {
                            $(this).remove();
                        });
                        $(html).find('DIV[id^="cardWindow_"]').each(function() {
                            $('div#sidebar').after($(this));
                        });
                        tb_init('a.thickbox');
                        desk_pager_replace();
                        $('INPUT[name="p"]').val(this.page);
                        delete html;
                        delete $new_deck;
                        disp_ToubatsuRestTime(false);
                        disp_ToubatsuRestTime.ajflag = false;
                        favoriteSort();
                        deckGroupImgView();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        disp_ToubatsuRestTime.ajflag = false;
                        //console.log(textStatus);
                    }
                });
                return false;
            });

            if (options['def_honjou']) {
                var value = $('#select_village').children(':selected').attr('value'); // なぜ.val()で取れない2??
                if (value=='') $('#select_village > OPTION:eq(1)').attr('selected', true);
            }

            // 「出陣状況」のリンク先を「全部隊」に変更
            $('A[href="/facility/unit_status.php"]').attr('href', '/facility/unit_status.php?dmo=all');

            // 「選択中の部隊へ」を上部に
            var org_card = $('IMG[title="選択中の部隊へ"]:first');
            var card = org_card.parent().clone();
            var bname = org_card.closest('.ig_deck_smallcardarea').find('.ig_deck_smallcard_cardname').text();

            card.children().css({position:'relative', top:'-7px'}).end().prepend('<SPAN style="position:relative;top:-18px;">'+bname+'</SPAN>');

            $('#ig_unitchoice').append('<LI id="add_this"><LI>');
            $('#add_this').append(card);
        }

        if ((options['toubatsu']) || (options['refillhp'])) {
            // 討伐ゲージの回復時間
            var firstf = true;
            $('#ig_deck_smallcardarea_out').find('DIV.ig_deck_smallcardarea').each(function() {
                var $this = $(this);
                if (options['toubatsu']) {
                    var battlegage = $this.find('SPAN.ig_deck_battlepoint2').text();
                    if (battlegage=='') return;
                    var tb = 300 - parseInt(battlegage);

                    if( tb != 0 ) {
                        var timeText = getTime( tb );
                        var dayText = caddDate(new Date(), timeText);
                        var txt = "<DIV>300まで" + timeText + "後(" + dayText + "完了)</DIV>";

                        $this.children(':eq(2)').prepend(txt);
                    }
                }
                if (options['refillhp']) {
                    var currentHPrate = $this.find('TABLE.ig_deck_smallcarddata:eq(0) TR:eq(2) TD').text();
                    var currentHP = parseInt(currentHPrate.substring(0, currentHPrate.indexOf('/')));
                    if (currentHP<100) {
                        var ranklvl = $this.find('TABLE.ig_deck_smallcarddata:eq(0) TR:eq(1) TD').text();
                        var rank = parseInt(ranklvl.substring(1, 2));
                        var lvl = parseInt(ranklvl.substring(3));
                        var timeText = getHPMAXTime(currentHP, rank, lvl);
                        var dayText = caddDate(new Date(), timeText);
                        var txt = "<DIV>HP100まで" + timeText + "後(" + dayText + ")</DIV>";

                        $this.children(':eq(2)').prepend(txt);
                        //alert(internal_lvl);
                    }
                }
            });
            if (options['toubatsu'] && initFlag) {
                $('.ig_deck_maincardarea').find('DIV.battlegage').each(function() {
                    var $this = $(this);
                    var battlegage = $this.find('SPAN.ig_deck_battlepoint').text();

                    if (battlegage=='') return;

                    var bg_value = parseInt(battlegage); //無駄

                    if (bg_value<300) {
                        var tb = 300 - bg_value;

                        var timeText = getTime( tb );
                        var dayText = caddDate(new Date(), timeText);
                        var txt = "<DIV style='position:relative;top:-10px;opacity:0.9;z-index:1000;background-color:#fff;color:#000;'>300まで" + timeText + "後(" + dayText + "完了)</DIV>";
                        $this.prepend(txt);
                    } else {
                        // $('DIV.deck_navi').find('IMG[alt="解散"]').parent().remove();
                        if (bg_value<400) {
                            var tb = 400 - bg_value;

                            var timeText = getTime( tb );
                            var dayText = caddDate(new Date(), timeText);
                            var txt = "<DIV style='position:relative;top:-10px;opacity:0.9;z-index:1000;background-color:#fff;color:#000;'>400まで" + timeText + "後(" + dayText + "完了)</DIV>";
                            $this.prepend(txt);
                        } else if (bg_value<500) {
                            var tb = 500 - parseInt(battlegage);

                            var timeText = getTime( tb );
                            var dayText = caddDate(new Date(), timeText);
                            var txt = "<DIV style='position:relative;top:-10px;opacity:0.9;z-index:1000;background-color:#fff;color:#000;'>500まで" + timeText + "後(" + dayText + "完了)</DIV>";
                            $this.prepend(txt);
                        }
                    }
                });
            }
        }

        function getTime(toubatsu) {
            var tmp = toubatsu * 163;
            var h = Math.floor(tmp / 3600);
            var m = Math.floor((tmp - h*3600 ) / 60 );
            var s = Math.floor(tmp - h*3600 - m*60 );
            var tim = h + ":" +
            (m+100).toString().substr(-2)  + ":" +
            (s+100).toString().substr(-2);
            return tim;
        }
        function getHPMAXTime(currentHP, rank, lv) {
            // 適当
            var rate = 0;
            if (rank>0) {
                rate = (rank-1)*72+HPres1[lv];
            } else {
                rate = HPres0[lv];
            }
            var tmp = rate*(100-currentHP);
            var h = Math.floor(tmp / 3600);
            var m = Math.floor((tmp - h*3600 ) / 60 );
            var s = Math.floor(tmp - h*3600 - m*60 );
            var tim = h + ":" +
            (m+100).toString().substr(-2)  + ":" +
            (s+100).toString().substr(-2);
            return tim;
        }
    }
    function toHankaku(str) {
        str = str.replace(/[０-９]/g, function(str){return String.fromCharCode(str.charCodeAt(0)-65248);});
        str = str.replace(/[ー|－](\d+)/g, '-$1');
        return str;
    }

    // add start
    //////////////////////
    //一括削除：ランク一定以上の非活性、全選択ボタンの追加
    //////////////////////
    function delList_check() {
        if(location.pathname != "/card/deck_card_delete.php") return;

        //checkboxが有効な場合、特以上は非活性に、また一括選択ボタンを追加
        if ($('DIV.ig_decksection_innermid').find('INPUT[name="delete_card_arr[]"]:eq(0)').attr("type") == "checkbox") {

            $('DIV.ig_decksection_innermid').find('tr').each(function() {
                var a = $(this).find('img').attr('alt');

                // 天・極持ってないからSR・URは未確認
                if ((options['rank_lock'] != 0)
                        && (((a == "UC") && (options['rank_lock'] <= 1))
                                || ((a == "R") && (options['rank_lock'] <= 2))
                                || ((a == "SR") && (options['rank_lock'] <= 3))
                                || ((a == "UR") && (options['rank_lock'] <= 4)))) {

                    $(this).find('INPUT[name="delete_card_arr[]"]').attr("disabled","disabled");
                }
            });

            var trth = $('DIV.ig_decksection_innermid').find('TABLE');
            trth.before('<DIV class="left" style="width:640px; margin-left:auto; margin-right:auto;"><INPUT type="button" value="全選択" id="sel_check"/><INPUT type="button" value="全解除" id="unsel_check"/></DIV>');

            $('#sel_check').click(function() {
                $('DIV.ig_decksection_innermid').find('INPUT[name="delete_card_arr[]"]').each(function() {
                    if ($(this).attr("disabled") == false) {
                        $(this).attr("checked", true);
                    }
                });
            });

            $('#unsel_check').click(function() {
                $('DIV.ig_decksection_innermid').find('INPUT[name="delete_card_arr[]"]').each(function() {
                    $(this).attr("checked", false);
                });
            });
        }

    }
    //////////////////////
    //メニュー：
    //////////////////////
    function initMenu() {
        if (!options['pulldown_menu']) return;
        var menu = new Array();

        /*デッキ*/
        menu = [
            ["/card/deck.php","部隊編成"],["/facility/unit_status.php?dmo=all","出陣状況"],["/facility/set_unit_list.php?show_num=100","簡易兵士編成"],
            ["/facility/unit_list.php","待機兵士一覧"],["/card/deck_card_delete.php","カード一括破棄"],["/union/union_history.php","合成履歴"]
        ];
        br3.makeMenu(menu,"gnavi02");
        $(".gnavi02 > A").mouseover(function() {
            br3.openMenu("gnavi02");
        });
        $(".gnavi02 > A").mouseout(function(){
            br3.closetime();
        });

        /*地図*/
        menu = [[12,28],[28,12],[12,52],[36,36],[52,12],[12,76],[36,60],[60,36],[76,12],[12,100]];
        if(options['toride_count']==20) {
            menu = [
                [12,28],[28,12],[12,52],[36,36],[52,12],[12,76],[36,60],[60,36],[76,12],[12,100],
                [36,84],[60,60],[84,36],[100,12],[12,124],[36,108],[60,84],[84,60],[108,36],[124,12]
            ];
        }
        if(options['toride_count']==30) {
            menu = [
                [12,28],[28,12],[12,52],[36,36],[52,12],[12,76],[36,60],[60,36],[76,12],[12,100],
                [36,84],[60,60],[84,36],[100,12],[12,124],[36,108],[60,84],[84,60],[108,36],[124,12],
                [12,148],[36,132],[60,108],[84,84],[108,60],[132,36],[148,12],[36,156],[60,132],[84,108]
            ];
        }
        br3.makeMapMenu(menu,"gnavi03");
        $(".gnavi03 > A").mouseover(function() {br3.openMenu("gnavi03");});
        $(".gnavi03 > A").mouseout(function(){br3.closetime();});

        /*合戦*/
        menu = [
            ["/country/all.php","全国地図"],["/war/war_situation.php","合戦状況"],["/war/war_ranking.php","合戦格付表"],
            ["/war/fight_history.php","敵襲状況"],["/war/list.php","合戦報告書"]
        ];
        br3.makeMenu(menu,"gnavi05");
        $(".gnavi05 > A").mouseover(function() {br3.openMenu("gnavi05");});
        $(".gnavi05 > A").mouseout(function(){br3.closetime();});

        /*同盟*/
        menu = [
            [$(".gnavi07 > A:eq(0)").attr('href'),"同盟情報"],["/alliance/level.php","同盟貢物"],
            ["/bbs/topic_view.php","同盟掲示板"],["/alliance/manage.php","同盟管理"],
            ["/alliance/invite.php","同盟募集"]
        ];
        br3.makeMenu(menu,"gnavi07");
        $(".gnavi07 > A").mouseover(function() {br3.openMenu("gnavi07");});
        $(".gnavi07 > A").mouseout(function(){br3.closetime();});

        /*格付*/
        menu = [["/user/ranking.php?m=","国別格付"],["/user/ranking.php?m=&c=0","全体格付"],["/country/country_ranking.php","天下勢力"]];
        br3.makeMenu(menu,"gnavi08");
        $(".gnavi08 > A").mouseover(function() {br3.openMenu("gnavi08");});
        $(".gnavi08 > A").mouseout(function(){br3.closetime();});
    }

    function all_check_inbox() {
        if(location.pathname != "/message/inbox.php") return;
        $('p.mt10.mb5').prepend('<input type=button value="このページを全件既読にする" id="all_check">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        var tmp='<th width="32" class="w30"><input type=button value="選択" id="select_check"></th>';
        $('.common_table1.center:eq(0)').find('th.w30:eq(0)').replaceWith(tmp);
        $('#all_check').click(function() {
            $("#all_check").attr("disabled","disabled");
            var list = new Array();
            $('td.left.comment_wbr').find('a').each(function() {
                var tmp = new Array();
                tmp[0] = $(this).attr("href");
                list = list.concat(tmp);
            });
            nowLoading();
            all_read(list,0);
        });
        $('#select_check').click(function() {
            $("input[name=chk[]]").attr('checked',true);
        });
    }
    function all_read(list,i) {
        if((list.length < i-1)||(list[i] == undefined)) {
            location.href='inbox.php';
        } else {
            $.ajax({
                type: "POST",
                url: '/message/'+list[i],
                cache: false,
                dataType: "text",
                success: function (html){
                all_read(list,i+1);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(textStatus);
            }
            });
        }
    }

    function fightlist() {
        if(location.pathname != "/facility/unit_status.php") return;
        $('div.ig_decksection_mid').find('table.paneltable.table_fightlist').each(function() {
            if(($(this).find('IMG:eq(3)').attr('src')!='')||($(this).find('IMG:eq(3)').attr('src')!='')) {
                if(($(this).find('IMG:eq(3)').attr('src').indexOf('icon_attack.png')!=-1)||($(this).find('IMG:eq(3)').attr('src').indexOf('mode_attack.png')!=-1)) {
                    if($(this).find('TD:eq(2)').find('span').text()=='-'){
                        $(this).find('IMG:eq(3)').attr('src',IMAGES.mode_jinhari);
                    }
                }
            }
            if(($(this).find('IMG:eq(4)').attr('src')!='')||($(this).find('IMG:eq(4)').attr('src')!='')) {
                if(($(this).find('IMG:eq(4)').attr('src').indexOf('icon_attack.png')!=-1)||($(this).find('IMG:eq(4)').attr('src').indexOf('mode_attack.png')!=-1)) {
                    if($(this).find('TD:eq(2)').find('span').text()=='-'){
                        $(this).find('IMG:eq(4)').attr('src',IMAGES.mode_jinhari);
                    }
                }
            }
        });
    }

    //////////////////////
    //出陣：
    //////////////////////
    function merge_fight_info() {
        if(!options['merge_fight_info']) return;
        if(location.pathname == "/facility/send_troop.php") {
            $('div#ig_gofightboxtitle').find('img').each(function() {
                if($(this).attr('src').indexOf('hd_joinattack.gif')!=-1) {
                    $(this).attr('src', IMAGES.hd_joinattack);
                    $(this).attr('width','160');
                    $(this).attr('height','15');
                    $(this).attr('alt','攻撃か付近の攻撃に合流');
                    return;
                }
            });
        }
        if(location.pathname != "/facility/confluence_list.php") return;
        var vx_value = $('input#village_x_value').attr('value');
        var vy_value = $('input#village_y_value').attr('value');
        var u_select = $('input#unit_select').attr('value');
        var data = {village_x_value:vx_value, village_y_value:vy_value,radio_move_type:302,unit_select:u_select,btn_preview:true};
        var data2 = {village_x_value:vx_value, village_y_value:vy_value,radio_move_type:307,unit_select:u_select,btn_preview:true};
        $.ajax({
            type: "POST",
            url: '/facility/send_troop.php',
            data:data,
            cache: false,
            success: function (html){
            var t_dom = $(html).find('div#ig_gofightconfirmboxtitle').clone();
            $('div#ig_deck_search_box_top.center').before(t_dom);
            $('table.paneltable.table_gofight_conftitle').css('margin-left','auto');
            $('table.paneltable.table_gofight_conftitle').css('margin-right','auto');
            var wth = $('table.paneltable.table_gofight_conftitle').find('th:eq(2)').clone();
            var wtd = $('table.paneltable.table_gofight_conftitle').find('td:eq(2)').clone();
            $('table.paneltable.table_gofight_conftitle').find('tr.noborder').remove();
            $('table.paneltable.table_gofight_conftitle').find('td:eq(1)').after(wth);
            $('table.paneltable.table_gofight_conftitle').find('th:eq(2)').after(wtd);
            $('table.paneltable.table_gofight_conftitle').find('td:last').after('<td><a href="javascript:void(0)" onclick="return false;" id="attack"><img src="/img/localmap/btn_gofighthere.png"></a></td>');
            $('table.paneltable.table_gofight_conftitle').find('td:last').after('<td><a href="javascript:void(0)" onclick="return false;" id="jinhari"><img src="'+IMAGES.btn_gojinhere+'"></a></td>');
            $('#attack').click(function() {
                $.form({
                    type: 'post',
                    url: '/facility/send_troop.php',
                    data: data
                });
            });
            $('#jinhari').click(function() {
                $.form({
                    type: 'post',
                    url: '/facility/send_troop.php',
                    data: data2
                });
            });
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
        $.form = function(s){
            var def = {
                    type: 'get',
                    url: location.href,
                    data: {}
            };
            s = jQuery.extend(true, s, jQuery.extend(true, {}, def, s));
            var form = $('<form>').attr({'method': s.type,'action': s.url}).appendTo(document.body);
            for (var a in s.data) {
                $('<input>').attr({'name': a,'value': s.data[a]}).appendTo(form[0]);
            };
            form[0].submit();
        }
    }

    function facility_selecter() {
        if(!options['facility_selecter']) return;
        if(location.pathname != "/facility/facility.php") return;
        if(($('div.ig_decksection_top').text().indexOf('厩舎')==-1)&&($('div.ig_decksection_top').text().indexOf('弓兵舎')==-1)&&($('div.ig_decksection_top').text().indexOf('足軽兵舎')==-1)&&($('div.ig_decksection_top').text().indexOf('兵器鍛冶')==-1)) return;
        $.ajax({
            type: "POST",
            url: '/village.php',
            cache: false,
            success: function (html){
            var kiba;
            var yari;
            var yumi;
            var kaji;
            $(html).find('map#mapOverlayMap').find('area[title^="厩舎"]').each(function() {
                kiba = '/'+$(this).attr('href');
            });
            $(html).find('map#mapOverlayMap').find('area[title^="足軽兵舎"]').each(function() {
                yari = '/'+$(this).attr('href');
            });
            $(html).find('map#mapOverlayMap').find('area[title^="弓兵舎"]').each(function() {
                yumi = '/'+$(this).attr('href');
            });
            $(html).find('map#mapOverlayMap').find('area[title^="兵器鍛冶"]').each(function() {
                kaji = '/'+$(this).attr('href');
            });
            if(kiba==undefined) kiba='#';
            if(yari==undefined) yari='#';
            if(yumi==undefined) yumi='#';
            if(kaji==undefined) kaji='#';
            var h3link = '<h3><span>施設</span>:[<a href="'+kiba+'">厩舎</a>][<a href="'+yari+'">足軽兵舎</a>][<a href="'+yumi+'">弓兵舎</a>][<a href="'+kaji+'">兵器鍛冶</a>]</h3>';
            $('div.ig_tilesection_mid').eq(0).find('div.ig_tilesection_detailarea').find('h3').replaceWith(h3link);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    function set_deck(list,a,b,c,s_assign_no,w_select_village,flg) {
        var set_squad_id = '';
        var set_assign_id = '';
        var w_deck_mode = $('#deck_mode').attr('value');
        var max_page='';
        var w_null='';
        if(((a>4)||(list[a]=='')||(b>c))&&(!flg)) {
            var w_null = '';
            var data2 = {select_assign_no:s_assign_no,unit_assign_id:w_null,unset_unit_squad_id:w_null,change_unit_squad_id:w_null,dungeon_unit_squad_id:w_null,dungeon_card_id:w_null,dungeon_select:w_null,deck_mode:'nomal',p:'1'};
            $.form({
                type: 'post',
                url: '/card/deck.php',
                data: data2
            });
        } else if(((a>4)||(list[a]=='')||(b>c))&&(flg)) {
            s_assign_no++;
            deck_interval(s_assign_no,flg);
            return;
        }

        $.form = function(s){
            var def = {
                    type: 'get',
                    url: location.href,
                    data: {}
            };
            s = jQuery.extend(true, s, jQuery.extend(true, {}, def, s));
            var form = $('<form>').attr({'method': s.type,'action': s.url}).appendTo(document.body);
            for (var a in s.data) {
                $('<input>').attr({'name': a,'value': s.data[a]}).appendTo(form[0]);
            };
            form[0].submit();
        }

        var data = {select_assign_no:s_assign_no,unit_assign_id:w_null,unset_unit_squad_id:w_null,change_unit_squad_id:w_null,dungeon_unit_squad_id:w_null,dungeon_card_id:w_null,dungeon_select:w_null,deck_mode:'nomal',p:b};

        $.ajax({
            type: "POST",
            url: '/card/deck.php',
            data:data,
            cache: false,
            success: function (html){
            $(html).find('div#ig_decksection3.clearfix').find('div#ig_deck_smallcardarea_out').find('.ig_deck_smallcardimage').each(function() {
                var id=$(this).find('a[href^="#TB_inline"]').attr('href');
                id=id.split('=');
                id=id[3].replace('cardWindow_','');
                if((id==list[a])&&($(this).parent().parent().find('img[title^="選択中の部隊へ"]').attr('src')!=undefined)) {
                    var work_id = $(this).parent().parent().find('a[onclick^="confirmRegist"]').attr('onclick').toString().split(',');
                    set_squad_id = work_id[1].replace('\'','');
                    set_squad_id = set_squad_id.replace('\'','');
                    set_assign_id = work_id[0];
                    return false;
                } else {
                    set_squad_id='';
                }
            });
            if(set_squad_id!='') {
                set_assign_id=set_assign_id.replace("function onclick(event) {\n",'');
                set_assign_id=set_assign_id.replace('  confirmRegist(','');
                set_assign_id=set_assign_id.replace(' ','');
                set_assign_id = set_assign_id.replace('\'','');
                set_assign_id = set_assign_id.replace('\'','');
                var data2 = {target_card:w_null,select_assign_no:s_assign_no,mode:'assign_insert',btn_change_flg:w_null,set_village_id:w_select_village,set_assign_id:set_assign_id,set_squad_id:set_squad_id,deck_mode:'nomal',p:b};
                $.ajax({
                    type: "POST",
                    url: '/card/deck.php',
                    data:data2,
                    cache: false,
                    success: function (html){
                    a++;
                    b=1;
                    set_deck(list,a,b,c,s_assign_no,w_select_village,flg);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    //console.log(textStatus);
                }
                });
            }else{
                b++;
                set_deck(list,a,b,c,s_assign_no,w_select_village,flg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    function deck_setting(card_key) {
        var select_assign_no = $('#select_assign_no').attr('value');
        var set_assign_id=$('#set_assign_id').attr('value');
        var w_select_village = $('#select_village').children(':selected').attr('value');
        var max_page='';
        if(options['pager_ajax']) {
            max_page=$('#lastpage').attr('page');
            if(max_page==undefined) {
                $('.cardstockchange.clearfix').find('a[page^=]').each(function() {
                    max_page=$(this).attr('page');
                });
            }
        } else {
            $('UL.pager.cardstock').find('li.last').find('a').each(function() {
                if($(this).attr('title')=='last page') {
                    var script = $(this).attr('onclick').toString();
                    script = script.substring(script.indexOf('"p"'),script.length);
                    script = script.split('=');
                    script = script[1].split(';');
                    max_page = script[0].replace(/\s|\"/g,'');
                    return false;
                }
            });
            if(max_page==''){
                $('UL.pager.cardstock').find('A').each(function() {
                    var page = parseInt($(this).attr('title').substring(1));
                    if (page>0) {
                        max_page = page;
                    }
                });
            }
        }
        if(max_page==''||max_page==undefined) max_page=1;
        var butai_list = secureEvalJSON(localStorage.getItem("ixakaizou_butai_list_id"));
        var t=butai_list[card_key].split(',');
        var param_list=new Array();
        for(i=1;i<t.length;i++) {
            var tmp=t[i].split(':');
            param_list.push(tmp[1]);
        }
        nowLoading();
        set_deck(param_list,0,1,max_page,select_assign_no,w_select_village,false);
    }

    function deck_all_setting() {
        if($('#select_village2').children(':selected').attr('value')==''){
            alert('部隊の所属が未設定です');
            return;
        }
        var butai_list = {};
        if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
            butai_list = secureEvalJSON(localStorage.getItem("ixakaizou_butai_list_id"));
        }
        var j=0;
        var c=0;
        for(i in butai_list) {
            if($('#d'+c).attr('checked')) {
                j++;
            }
            c++;
        }
        if(j==0) {
            alert('部隊が選択されていません');
            return;
        }
        c=0;
        for(i in butai_list) {
            $('#d'+c).attr("disabled","disabled");
            c++;
        }
        var start_deck=1;
        $('a[onclick^="selectAssignNo"]').each(function(){
            if($(this).text()=='[---新規部隊を作成---]') start_deck++;
        });
        start_deck=5-start_deck;
        $('#butai_all_set').attr("disabled","disabled");
        nowLoading();
        deck_interval(start_deck,true);
    }

    function deck_interval(start_deck,flg) {
        if(start_deck > 3) {
            flg = false;
        }
        var select_assign_no = start_deck;
        var w_select_village = $('#select_village2').children(':selected').attr('value');
        var max_page='';
        if(options['pager_ajax']) {
            max_page=$('#lastpage').attr('page');
            if(max_page==undefined) {
                $('.cardstockchange.clearfix').find('a[page^=]').each(function() {
                    max_page=$(this).attr('page');
                });
            }
        } else {
            $('UL.pager.cardstock').find('li.last').find('a').each(function() {
                if($(this).attr('title')=='last page') {
                    var script = $(this).attr('onclick').toString();
                    script = script.substring(script.indexOf('"p"'),script.length);
                    script = script.split('=');
                    script = script[1].split(';');
                    max_page = script[0].replace(/\s|\"/g,'');
                    return false;
                }
            });
            if(max_page==''){
                $('UL.pager.cardstock').find('A').each(function() {
                    var page = parseInt($(this).attr('title').substring(1));
                    if (page>0) {
                        max_page = page;
                    }
                });
            }
        }
        if(max_page==''||max_page==undefined) max_page=1;
        var butai_list = secureEvalJSON(localStorage.getItem("ixakaizou_butai_list_id"));
        var j = 0;
        var card_key = '';
        for (i in butai_list) {
            if($('#d'+j).attr('checked')) {
                card_key = $('#d'+j).attr('value');
                $('#d'+j).attr('checked',false);
                break;
            }
            j++;
        }
        if(card_key=='') {
            location.href='/card/deck.php';
            return;
        }
        var t=butai_list[card_key].split(',');
        var param_list=new Array();
        for(i=1;i<t.length;i++) {
            var tmp=t[i].split(':');
            param_list.push(tmp[1]);
        }
        set_deck(param_list,0,1,max_page,select_assign_no,w_select_village,flg);
    }

    function re_butai() {
        var tmp = '<span id="all_map"><p id="b_head"></p><table class="common_table1 center" width=100%><tbody>';
        tmp+='<tr><th>選択</th><th>タイプ</th><th>部隊名</th><th>部隊長</th><th>小隊長</th><th>小隊長</th><th>小隊長</th><th></th></tr>';
        var butai_list = {};
        var c=0;
        if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
            butai_list = secureEvalJSON(localStorage.getItem("ixakaizou_butai_list_id"));
            for (i in butai_list) {
                var b_type = '';
                if(butai_list[i][0]==0) {
                    b_type='攻撃部隊';
                } else if(butai_list[i][0]==1) {
                    b_type='防衛部隊';
                } else if(butai_list[i][0]==3) {
                    b_type='秘境部隊';
                } else {
                    b_type='両用部隊';
                }
                tmp+= '<tr><td><input type=checkbox id=d'+c+' value="'+i+'"></td><td>'+b_type+'</td><td>'+i+'</td>';
                var t=butai_list[i].split(',');
                for(j=1;j<5;j++){
                    if(t[j]!=undefined) {
                        var nm = t[j].split(':');
                        tmp+='<td>'+nm[0]+'</td>';
                    } else {
                        tmp+='<td>&nbsp;</td>';
                    }
                }
                tmp+='<td><input class="del_butai" type=button value=消去 id="'+i+'"></td></tr>';
                c++;
            }
        } else {
            tmp+='<tr><td colspan=7>お気に入り部隊は登録されていません</td></tr></tr>';
        }
        tmp+='</tbody></table></span>';
        $('#all_map').replaceWith(tmp);
        tmp = $('.ig_deck_unitdata_assign.deck_wide_select').clone();
        if(tmp.find('#select_village').attr('id')!=undefined){
            tmp.find('#select_village').attr('name','select_village2');
            tmp.find('#select_village').attr('id','select_village2');
            $('#b_head').append(tmp);
            $('#b_head').append('<input type=button value="選択部隊をデッキへセット" id="butai_all_set">');
            $('#butai_all_set').live("click",function() {
                deck_all_setting();
            });
        }
        $('.del_butai').live("click",function() {
            var butai_list = {};
            var butai_list_new = {};
            if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
                butai_list = secureEvalJSON(localStorage.getItem("ixakaizou_butai_list_id"));
            }
            for(i in butai_list) {
                if(i!=$(this).attr('id')) {
                    butai_list_new[i] = butai_list[i];
                }
            }
            localStorage.setItem('ixakaizou_butai_list_id', toJSON(butai_list_new));
            tmp = '<span id="all_map"><p id="b_head"></p><table class="common_table1 center" width=100%><tbody>';
            tmp+='<tr><th>選択</th><th>タイプ</th><th>部隊名</th><th>部隊長</th><th>小隊長</th><th>小隊長</th><th>小隊長</th><th></th></tr>';
            var butai_list = {};
            var c=0;
            if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
                butai_list = secureEvalJSON(localStorage.getItem("ixakaizou_butai_list_id"));
                for (i in butai_list) {
                    var b_type = '';
                    if(butai_list[i][0]==0) {
                        b_type='攻撃部隊';
                    } else if(butai_list[i][0]==1) {
                        b_type='防衛部隊';
                    } else if(butai_list[i][0]==3) {
                        b_type='秘境部隊';
                    } else {
                        b_type='両用部隊';
                    }
                    tmp+= '<tr><td><input type=checkbox id=d'+c+'value="'+i+'"></td><td>'+b_type+'</td><td>'+i+'</td>';
                    var t=butai_list[i].split(',');
                    for(j=1;j<5;j++){
                        if(t[j]!=undefined) {
                            var nm = t[j].split(':');
                            tmp+='<td>'+nm[0]+'</td>';
                        } else {
                            tmp+='<td>&nbsp;</td>';
                        }
                    }
                    tmp+='<td><input class="del_butai" type=button value=消去 id="'+i+'"></td></tr>';
                    c++;
                }
            } else {
                tmp+='<tr><td colspan=7>お気に入り部隊は登録されていません</td></tr></tr>';
            }
            tmp+='</tbody></table></span>';
            $('#all_map').replaceWith(tmp);
            tmp = $('.ig_deck_unitdata_assign.deck_wide_select').clone();
            if(tmp.find('#select_village').attr('id')!=undefined){
                tmp.find('#select_village').attr('name','select_village2');
                tmp.find('#select_village').attr('id','select_village2');
                $('#b_head').append(tmp);
                $('#b_head').append('<input type=button value="選択部隊をデッキへセット" id="butai_all_set">');
                $('#butai_all_set').live("click",function() {
                    deck_all_setting();
                });
            }
        });
    }

    function hold_butai() {
        if(!options['hold_butai']) return;
        if(location.pathname != "/card/deck.php") return;
        if($('#ig_bg_decksection1right.clearfix').find('#ig_deck_unititle.clearfix').find('p:eq(0)').text()=='[------]部隊') {
            var butai_list = {};
            if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
                butai_list = secureEvalJSON(localStorage.getItem("ixakaizou_butai_list_id"));
            } else {
                return;
            }
            $('#ig_bg_decksection1right.clearfix').find('#ig_deck_unititle.clearfix').css('height','95px');
            $('#ig_bg_decksection1right.clearfix').find('#ig_deck_unititle.clearfix').css('font-size','12px');
            $('.deck_navi').css('height','1px');
            var s_0 = '<p style="padding-top: 5px;">攻撃部隊:<select id="s_0" style="font-size:12px"><option>-----選択-----</option>';
            var s_1 = '<p style="padding-top: 5px;">防衛部隊:<select id="s_1" style="font-size:12px"><option>-----選択-----</option>';
            var s_2 = '<p style="padding-top: 5px;">両用部隊:<select id="s_2" style="font-size:12px"><option>-----選択-----</option>';
            var s_3 = '<p style="padding-top: 5px;">秘境部隊:<select id="s_3" style="font-size:12px"><option>-----選択-----</option>';
            for (i in butai_list) {
                if(butai_list[i][0]==0) {
                    s_0 += '<option value="'+i+'">'+i+'</option>';
                } else if(butai_list[i][0]==1) {
                    s_1 += '<option value="'+i+'">'+i+'</option>';
                } else if(butai_list[i][0]==3) {
                    s_3 += '<option value="'+i+'">'+i+'</option>';
                } else {
                    s_2 += '<option value="'+i+'">'+i+'</option>';
                }
            }
            s_0 += '</select><input type=button value="セット" id="set_0"></p>';
            s_1 += '</select><input type=button value="セット" id="set_1"></p>';
            s_2 += '</select><input type=button value="セット" id="set_2"></p>';
            s_3 += '</select><input type=button value="セット" id="set_3"></p>';
            $('#ig_bg_decksection1right.clearfix').find('#ig_deck_unititle.clearfix').find('p:eq(0)').replaceWith(s_0+s_1+s_2+s_3);
            $('#set_0').live("click",function(){
                var s_val = $('#s_0').children(':selected').val();
                if(s_val=='-----選択-----') return;
                deck_setting(s_val);
            });
            $('#set_1').live("click",function(){
                var s_val = $('#s_1').children(':selected').val();
                if(s_val=='-----選択-----') return;
                deck_setting(s_val);
            });
            $('#set_2').live("click",function(){
                var s_val = $('#s_2').children(':selected').val();
                if(s_val=='-----選択-----') return;
                deck_setting(s_val);
            });
            $('#set_3').live("click",function(){
                var s_val = $('#s_3').children(':selected').val();
                if(s_val=='-----選択-----') return;
                deck_setting(s_val);
            });
        } else {
            var butai_nm = $('#ig_bg_decksection1right.clearfix').find('#ig_deck_unititle.clearfix').find('p:eq(0)').text().replace('[','');
            butai_nm = butai_nm.replace(']','');
            var tmp = '<div><font color=#ffffff>部隊名:</font><input type=text value="'+butai_nm+'" maxlength=8 size=15 id="b_name"><select id="b_type"><option value=0>攻撃</option><option value=1>防衛</option><option value=2>両用</option><option value=3>秘境</option></select><a href="javascript:void(0)" onclick="return false;" id="butai_save"><img src="'+IMAGES.btn_butai_save+'"></a></div>';
            $('#ig_bg_decksection1right.clearfix').find('#ig_deckunitdetail').find('img:last').after(tmp);
            $('#butai_save').click(function(){
                var tmp=$('a[href^="/facility/set_unit.php?unit_assign_id"]').attr('href').split('&');
                tmp = tmp[0].split('=');
                butai_save(tmp[1]);
            });
        }
        $('#toollist').append('<li style="margin-left: 6px;padding-bottom: 6px;padding-left: 8px;background: url("/img/common/sidebar/icon_off.gif") no-repeat 0 2px;"><a href="#TB_inline?height=340&amp;width=665&amp;inlineId=allMapThicbox" class="thickbox" title="お気に入り部隊" onclick="return false;">お気に入り部隊</a></li>');
        $("a.thickbox").live("mousedown",function() {
            tb_init('a.thickbox');
            re_butai();
        });
    }

    function butai_save(unit_assign_id) {
        var butai_list = {};
        var b_array = new Array();
        if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
            butai_list = secureEvalJSON(localStorage.getItem("ixakaizou_butai_list_id"));
        }
        b_array.push($('#b_type').children(':selected').val());
        if($('#b_name').val()==''){$('#b_name').attr('value',butai_nm);}

        $.ajax({
            type: "POST",
            url: '/facility/set_unit.php?unit_assign_id='+unit_assign_id,
            cache: false,
            success: function (html){
            $(html).find('a[href^="#TB_inline?"]').each(function() {
                var tmp = $(this).attr('href').split('=');
                tmp = $(this).text()+':'+tmp[3].replace('cardWindow_','');
                b_array.push(tmp);
            });
            butai_list[$('#b_name').val()] = b_array.join(',');
            localStorage.setItem('ixakaizou_butai_list_id', toJSON(butai_list));
            re_butai();
            alert('この部隊を記録しました。');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    function unit_list_hikyou() {
        if(!options['unit_list_hikyou']) return;
        if(!options['hold_butai']) return;
        if(location.pathname != "/facility/set_unit_list.php") return;
        var tmp='&nbsp;&nbsp;<input type=radio name=set_type id=ro1 value=0 checked><label for=ro1>兵士0武将</label>&nbsp;<input type=radio name=set_type id=ro2 value=1><label for=ro2>秘境部隊</label>&nbsp;<input type=button value="兵士をセットする" onclick="return false;" id="hikyou_butai">';
        $('.center.black').find('input:last').after(tmp);
        $('#hikyou_butai').live('click',function(){
            var butai_list = {};
            var card_array = new Array();
            if($('input[name=set_type]:checked').val()=='1'){
                if(localStorage.getItem("ixakaizou_butai_list_id")!=null) {
                    butai_list = secureEvalJSON(localStorage.getItem("ixakaizou_butai_list_id"));
                } else {
                    alert('お気に入り部隊が登録されていません');
                    return;
                }
                var j=0;
                for (i in butai_list) {
                    if(butai_list[i][0]==3) {
                        var t=butai_list[i].split(',');
                        for(c=1;c<5;c++){
                            if(t[c]!=undefined){
                                var tmp=t[c].split(':');
                                t[c]=tmp[0];
                            }
                            card_array[j]=t[c];
                            j++;
                        }
                    }
                }
                if(card_array.length==0) {
                    alert('秘境部隊が登録されていません');
                    return;
                }
            } else {
                var j=0;
                $('input[id^="unit_cnt_text"]').each(function() {
                    if($(this).val()=='0'){
                        card_array[j]=$(this).parent().parent().find('.thickbox').parent().find('input:last').val();
                        j++;
                    }
                });
            }
            var unit_type = '';
            var max_unit = 0;
            $('select[name^="unit_id_select"]').each(function(){
                $(this).children('option').each(function() {
                    if($(this).text()=='なし') return true;
                    var num = $(this).text().substring($(this).text().indexOf("(")+1,$(this).text().indexOf(")"));
                    if(num=='0') return true;
                    if(num > max_unit) {
                        max_unit=num;
                        unit_type=$(this).val();
                    }
                });
                return false;
            });
            if(unit_type=='') {
                alert('待機兵がいません');
                return;
            }
            if(max_unit < card_array.length) {
                alert('待機兵が足りません');
                return;
            }
            $('input[onclick^="postSetUnit"]').each(function(){
                $(this).attr("disabled","disabled");
            });
            $('#hikyou_butai').attr("disabled","disabled");
            nowLoading();
            unit_list_set(card_array,unit_type,0,$('input[name=set_type]:checked').val());
        });
    }

    function unit_list_set(card_array,unit_type,i,radio) {
        if(card_array.length<=i) {
            location.href='/facility/set_unit_list.php?show_num=100';
        }
        var card_id = '';
        if(radio==1) {
            $('.thickbox').each(function(){
                var target = $(this).text().replace(/(^\s+)|(\s+$)/g, "");
                if(target==card_array[i]){
                    if($(this).parent().parent().find('input[id^="unit_cnt_text"]').val()!='0') return true;
                    card_id = $(this).parent().find('input:last').val();
                    return false;
                }
            });
        } else {
            card_id=card_array[i];
        }
        if(card_id) {
            var data = {card_id:card_id,unit_type:unit_type,unit_count:1};
            $.ajax({
                type: "POST",
                url: '/facility/set_unit_list_if.php',
                data:data,
                cache: false,
                success: function (html){
                i++;
                unit_list_set(card_array,unit_type,i);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(textStatus);
            }
            });
        }
    }

    function menu_reversal() {
        if(!options['menu_reversal']) return;
        var tmp = $('#status.clearfix').clone();
        $('#status.clearfix').remove();
        $('#gnavi').prepend(tmp);
    }

    function all_dissolution() {
        if(!options['all_dissolution']) return;
        if(location.pathname != "/card/deck.php") return;
        var tmp = '<li><a href="javascript:void(0);" onclick="return false;" id="deck_dissolution"><img src="'+IMAGES.btn_all_breakup+'" alt="全部隊解散" style="position: relative; top: -4px; "></a></li>';
        $('ul#ig_unitchoice').find('li:last').before(tmp);
        $('#deck_dissolution').live('click',function() {
            if(!confirm("全部隊を解散しますか？\n(解散すると武将は、HPが減った状態で待機へ戻されます)")) return;
            var butaiNum = jQuery('#ig_unitchoice li a[onclick^="selectAssignNo"]')
                .filter(function(v){ return jQuery(this).text() != '[---新規部隊を作成---]' })
                .add('#ig_unitchoice li.now')
                .length
            ;
            nowLoading( butaiNum );
            var p = $('#p').attr('value');
            deck_dissolution(butaiNum-1,'','',p);
        });
    }

    function deck_dissolution(select_assign_no,unit_assign_id,unset_unit_squad_id,p) {
        if(select_assign_no>4 || select_assign_no < 0) {
            location.href='/card/deck.php';
            return;
        }
        var work_id='';
        var w_null='';
        var data = {
            select_assign_no      : select_assign_no,
            unit_assign_id        : unit_assign_id,
            unset_unit_squad_id   : unset_unit_squad_id,
            change_unit_squad_id  : w_null,
            dungeon_unit_squad_id : w_null,
            dungeon_card_id       : w_null,
            dungeon_select        : w_null,
            deck_mode             : 'nomal',
            p                     : p
        };
        $.ajax({
            type: "POST",
            url: '/card/deck.php',
            data:data,
            cache: false,
            success: function (html){
                if($(html).find('img[alt^="解散"]').attr('alt')==undefined) {
                    select_assign_no--;
                    deck_dissolution(select_assign_no,unit_assign_id,unset_unit_squad_id,p);
                    return;
                } else {
                    work_id = $(html).find('img[alt^="解散"]').parent().attr('onclick').toString().split(',');
                }
                unit_assign_id = work_id[0];
                unit_assign_id=unit_assign_id.replace("function onclick(event) {\n",'');
                unit_assign_id=unit_assign_id.replace('confirmUnregist\(','');
                unit_assign_id=unit_assign_id.replace(/\s|'|"/g,'');
                unset_unit_squad_id=work_id[1].replace(/'|"/g,'');
                countUpProgress();
                deck_dissolution(select_assign_no,unit_assign_id,unset_unit_squad_id,p);
                return;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(textStatus);
            }
        });
    }

    function all_deck_setting() {
        if(!options['all_dissolution']) return;
        if(location.pathname != "/card/deck.php") return;
        var tmp = '<li><a href="javascript:void(0);" onclick="return false;" id="all_set"><img src="'+IMAGES.btn_all_setting+'" alt="全部隊配置" style="position: relative; top: -4px; "></a></li>';
        $('ul#ig_unitchoice').find('li:last').before(tmp);
        $('#all_set').live('click',function() {
            if(!confirm("全部隊を配置しますか？\n(現在のソート順で配置可能な武将から順次配置されます)")) return;
            nowLoading();
            deck_all($("body#deck"),0);
        });
    }

    function deck_all(html,no) {
        if(no>4){
            location.href='/card/deck.php';
            return;
        }
        var w_select_village = $('#select_village').children(':selected').attr('value');
        var max_page='';
        if(options['pager_ajax']) {
            max_page=$('#lastpage').attr('page');
            if(max_page==undefined) {
                // この処理では最終ページが取れなさそう
                //$('.cardstockchange.clearfix').find('a[page^=]').each(function() {
                //    max_page=$(this).attr('page');
                //});
                // これならいけるかも...
                max_page = $('.cardstockchange.clearfix ul.pager.cardstock > li:not(.last):last').text();
            }
        } else {
            $('UL.pager.cardstock').find('li.last').find('a').each(function() {
                if($(this).attr('title')=='last page') {
                    var script = $(this).attr('onclick').toString();
                    script = script.substring(script.indexOf('"p"'),script.length);
                    script = script.split('=');
                    script = script[1].split(';');
                    max_page = script[0].replace(/\s|'|"/g,'');
                    return false;
                }
            });
            if(max_page==''){
                $('UL.pager.cardstock').find('A').each(function() {
                    var page = parseInt($(this).attr('title').substring(1));
                    if (page>0) {
                        max_page = page;
                    }
                });
            }
        }
        if(max_page==''||max_page==undefined) max_page=1;
        set_deck_asc(html,1,1,max_page,no,w_select_village);
    }

    function set_deck_asc(tmp,start,index_page,max_page,s_assign_no,w_select_village) {
        var set_squad_id = '';
        var set_assign_id = '';
        var w_null='';
        if((start>4)||(index_page>max_page)) {
            s_assign_no++;
            deck_all(tmp,s_assign_no);
            return;
        }

        var data = {select_assign_no:s_assign_no,
            unit_assign_id        : w_null,
            unset_unit_squad_id   : w_null,
            change_unit_squad_id  : w_null,
            dungeon_unit_squad_id : w_null,
            dungeon_card_id       : w_null,
            dungeon_select        : w_null,
            deck_mode             : 'nomal',
            p                     : index_page
        };

        $.ajax({
            type: "POST",
            url: '/card/deck.php',
            data:data,
            cache: false,
            success: function (html){
            $(html).find('div#ig_decksection3.clearfix').find('div#ig_deck_smallcardarea_out').find('span.ig_deck_smallcard_cardname').each(function() {
                var unit_button_img = $(this).parent().parent().find('img[title^="選択中の部隊へ"]');
                if(unit_button_img.attr('src')!=undefined) {
                    var work_id = unit_button_img.parent().attr('onclick').toString().split(',');
                    //set_squad_id = work_id[1].replace('\'|\"','');
                    //set_squad_id = set_squad_id.replace('\'|\"','');
                    set_squad_id = work_id[1].replace(/\'|\"/g,'');
                    set_assign_id = work_id[0];
                    return false;
                } else {
                    set_squad_id='';
                }
            });
            if(set_squad_id!='') {
                set_assign_id=set_assign_id
                    .replace("function onclick(event) {\n",'')
                    .replace(/^\s*confirmRegist\(/,'')
                    .replace(/\s|\'|\"/g,'')
                ;
                //set_assign_id=set_assign_id.replace(' ','');
                //set_assign_id = set_assign_id.replace('\'|\"','');
                //set_assign_id = set_assign_id.replace('\'|\"','');
                //set_assign_id=set_assign_id.replace(/ /g,'');
                var data2 = {target_card:w_null,
                    select_assign_no : s_assign_no,
                    mode             : 'assign_insert',
                    btn_change_flg   : w_null,
                    set_village_id   : w_select_village,
                    set_assign_id    : set_assign_id,
                    set_squad_id     : set_squad_id,
                    deck_mode        : 'nomal',
                    p                : index_page
                };
                $.ajax({
                    type    : "POST",
                    url     : '/card/deck.php',
                    data    : data2,
                    cache   : false,
                    success : function (html){
                        start++;
                        set_deck_asc(html,start,index_page,max_page,s_assign_no,w_select_village);
                    },
                    error   : function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log(textStatus);
                    }
                });
            }
            else{
                index_page++;
                set_deck_asc(html,start,index_page,max_page,s_assign_no,w_select_village);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    function nowLoading( _initCount ) {
        var id = '#nowLoadingContent';
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
        $('#loading_mask').css({'width':maskWidth,'height':maskHeight}).fadeTo(0 ,0.8).show();
        var winH = $(window).height();
        var winW = $(window).width();
        if( _initCount > 0 ){
            $(id).data('progressCount', 0 );
            $(id).find('#progressCount').append( '（', $('<span>0<span>'), '/'+ _initCount +'）') ;
        }
        $(id).css('top',  winH/2-$(id).height()/2).css('left', winW/2-$(id).width()/2).fadeIn(500);
        return false;
    }

    function countUpProgress(){
        var $progressDiag = $('#nowLoadingContent');
        var cnt = $progressDiag.data('progressCount');
        $progressDiag.data('progressCount',cnt+1);
        $progressDiag.find('#progressCount > span').text( cnt );
    }

    function deck_check() {
        if(!options['deck_check']) return;
        if(location.pathname != "/card/deck.php") return;
        var t=$('#lordSiteArea').text().replace("選択中の拠点:","");
        $('#select_village > option').each(function(){if($(this).text()==t){$(this).attr('selected',true);return false;}});
       // 部隊スキル移動&変更
       $('div[id="deck_skill_display"]').css('margin-top', '100px');
       $('div[id="ig_deckunitdetail"]').css('height', '460px');        
    }

    function sort_village() {
        if(!options['sort_village']) {
            map_potential();
            return;
        }
        var pathname = location.pathname;
        var search = location.search;
        var page = pathname;
        if(search!=''){page+=encodeURIComponent(search);}
        var dejiro = $('.sideBoxHead > h4:eq(1)').text();
        $.ajax({
            type: "POST",
            url: '/user/',
            cache: false,
            success: function (html){
            var village_list = [];
            var place_list = [];
            var tmp = '<div class="sideBoxInner basename"><ul>';
            var tmp2 = '<div class="sideBoxInner basename"><ul>';
            $(html).find('.common_table1.center:eq(0)').find('.fs14').each(function() {
                if($(this).find('td:eq(0)').text()=='領地') return true;
                var nm = $(this).find('a:eq(0)').text().replace(/^\s+|\s+$/g, "");
                var xy = '('+$(this).find('a:eq(1)').text()+')';
                var url = $(this).find('a:eq(0)').attr('href');
                var map_url = $(this).find('a:eq(1)').attr('href');
                if($(this).find('td:eq(0)').text()=='本領') {
                    if(nm==$('#lordSiteArea').text().replace("選択中の拠点:","")) {
                        tmp+='<li class="on"><span title="'+nm+' '+xy+'">'+nm+'</span></li>';
                    } else {
                        tmp+='<li><a href="'+url+'&from=menu&page='+page+'" title="'+nm+' '+xy+'">'+nm+'</a></li>';
                    }
                } else {
                    village_list.push({a:nm,b:url,c:xy,d:map_url});
                }
            });
            if(dejiro=='') {
                tmp2='';
            }
            $(html).find('.common_table1.center:eq(1)').find('.fs14').each(function() {
                if($(this).find('td:eq(0)').text()=='領地') return true;
                var nm = $(this).find('a:eq(0)').text().replace(/^\s+|\s+$/g, "");
                var xy = '('+$(this).find('a:eq(1)').text()+')';
                var url = $(this).find('a:eq(0)').attr('href');
                var map_url = $(this).find('a:eq(1)').attr('href');
                if((options['place_skip'])&&(options['place_skip_str']!='')&&(nm!=$('#lordSiteArea').text().replace("選択中の拠点:",""))) {
                    if(nm.indexOf(options['place_skip_str'])>=0) return true;
                }
                if($(this).find('td:eq(0)').text()=='出城') {
                    if(nm==$('#lordSiteArea').text().replace("選択中の拠点:","")) {
                        tmp2+='<li class="on"><span title="'+nm+' '+xy+'">'+nm+'</span></li>';
                    } else {
                        tmp2+='<li><a href="'+url+'&from=menu&page='+page+'" title="'+nm+' '+xy+'">'+nm+'</a></li>';
                    }
                } else {
                    place_list.push({a:nm,b:url,c:xy,d:map_url});
                }
            });
            if(options['ad_sort']=='1'){
                village_list = asort(village_list,'a');
                place_list = asort(place_list,'a');
            } else {
                village_list = dsort(village_list,'a');
                place_list = dsort(place_list,'a');
            }
            for(i=0;i<village_list.length;i++) {
                if(village_list[i].a==$('#lordSiteArea').text().replace("選択中の拠点:","")) {
                    var kyoten = '<input type="hidden" id="kyoten" value="'+village_list[i].d+'">';
                    $('#lordSiteArea').append(kyoten);
                    tmp+='<li class="on"><span title="'+village_list[i].a+' '+village_list[i].c+'">'+village_list[i].a+'</span></li>';
                } else {
                    tmp+='<li><a href="'+village_list[i].b+'&from=menu&page='+page+'" title="'+village_list[i].a+' '+village_list[i].c+'">'+village_list[i].a+'</a></li>';
                }
            }
            for(i=0;i<place_list.length;i++) {
                if(place_list[i].a==$('#lordSiteArea').text().replace("選択中の拠点:","")) {
                    var kyoten = '<input type="hidden" id="kyoten" value="'+place_list[i].d+'">';
                    $('#lordSiteArea').append(kyoten);
                    tmp2+='<li class="on"><span title="'+place_list[i].a+' '+place_list[i].c+'">'+place_list[i].a+'</span></li>';
                } else {
                    tmp2+='<li><a href="'+place_list[i].b+'&from=menu&page='+page+'" title="'+place_list[i].a+' '+place_list[i].c+'">'+place_list[i].a+'</a></li>';
                }
            }
            if(dejiro=='') {
                tmp2+='</ul></div>';
                $('.sideBoxInner.basename:eq(0)').replaceWith(tmp+tmp2);
            } else {
                tmp+='</ul></div>';
                tmp2+='</ul></div>';
                $('.sideBoxInner.basename:eq(0)').replaceWith(tmp);
                $('.sideBoxInner.basename:eq(1)').replaceWith(tmp2);
            }
            map_potential();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    function ptop_check() {
        if((location.pathname != "/facility/send_troop.php")&&(location.pathname != "/facility/confluence_confirm.php")) return;
        var tmp = $('.btnarea:eq(0)').clone();
        $('#ig_deckheadmenubox').after(tmp);
        $('.btnarea').css('margin-bottom','1px');
    }

    function asort(hash,key){
        hash.sort ( function (b1, b2) { return b1[key] > b2[key] ? 1 : -1; } );
        return hash;
    }

    function dsort(hash,key){
        hash.sort ( function (b1, b2) { return b1[key] > b2[key] ? -1 : 1; } );
        return hash;
    }

    function war_detail_navi() {
        if(location.pathname != "/war/detail.php") return;
        var target_query = location.search.substr(1,location.search.length-1).split("&");
        target_query = target_query[0];
        var back_query = $('a[href^="list.php"]').attr('href');
        $.ajax({
            type: "POST",
            url: '/war/'+back_query,
            cache: false,
            success: function (html){
            var before_query='';
            var after_query='';
            var target_row=0;
            var i=0;
            var max_row=0;
            $(html).find('a[href^="detail.php"]').each(function() {
                if($(this).attr('href').indexOf(target_query)>=0) {
                    target_row=i;
                }
                i++;
                max_row++;
            });
            i=0;
            $(html).find('a[href^="detail.php"]').each(function() {
                if((i==target_row-1)&&(target_row!=0)) {
                    after_query=$(this).attr('href');
                }
                if((i==target_row+1)&&(target_row!=max_row)) {
                    before_query=$(this).attr('href');
                    return false;
                }
                i++;
            });
            war_detail_navi_link(html,before_query,after_query);
            return;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
        });
    }

    function war_detail_navi_link(argHtml,before_query,after_query) {
        var target_href='';
        var t_num = $(argHtml).find('.ig_battle_pagelist').find('span:eq(0)').text();
        if(before_query==''){
            if(t_num!=''){
                t_num++;
                $(argHtml).find('.ig_battle_pagelist').find('a[href^="/war/list.php"]').each(function(){
                    if($(this).text()==t_num) {
                        target_href=$(this).attr('href');
                        return false;
                    }
                });
            }
        } else if(after_query=='') {
            if(t_num!=''){
                t_num--;
                $(argHtml).find('.ig_battle_pagelist').find('a[href^="/war/list.php"]').each(function(){
                    if($(this).text()==t_num) {
                        target_href=$(this).attr('href');
                        return false;
                    }
                });
            }
        } else {
            make_navi(before_query,after_query);
            return;
        }
        if(target_href!=''){
            $.ajax({
                type: "POST",
                url: target_href,
                cache: false,
                success: function (html){
                if(before_query==''){
                    $(html).find('a[href^="detail.php"]').each(function() {
                        before_query=$(this).attr('href');
                        return false;
                    });
                }
                if(after_query==''){
                    $(html).find('a[href^="detail.php"]').each(function() {
                        after_query=$(this).attr('href');
                    });
                }
                make_navi(before_query,after_query);
                return;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
            });
        }else{
            make_navi(before_query,after_query);
            return;
        }
    }

    function make_navi(before_query,after_query) {
        var a_query_page = after_query.substr(1,location.search.length-1).split("&");
        a_query_page=a_query_page[2];
        if((a_query_page==undefined)||(a_query_page=='p=0')) {after_query='';}
        var tmp='<div class="report_navi clearfix">';
        if(before_query==''){tmp+='<div class="leftF"></div>';}else{tmp+='<div class="leftF"><a href="'+before_query+'" style="color: #060;">前の報告書へ</a></div>'}
        if(after_query==''){tmp+='<div class="rightF"></div>';}else{tmp+='<div class="rightF"><a href="'+after_query+'" style="color: #060;">次の報告書へ</a></div>'}
        $('.ig_battle_table').before(tmp);
    }

    function facility_tool() {
        if(!options['facility_tool']) return;
        if(location.pathname != "/village.php") return;
        var tmp = '<div id="tooltip"><ul id="facilityUnit" style="text-align:left"></ul></div>';
        $(document.body).append(tmp);
        $("#tooltip").hide().css({ position: "absolute", backgroundColor: "white", border: "solid 1px darkgray", padding: "3px", zIndex: 999});
        $("#mapOverlayMap area[href]").bind("contextmenu", function(event){openTool(this, event.pageX, event.pageY);event.preventDefault();return false;});
    }
    function openTool(target, x, y) {
        $("#tooltip").css({ left: x + "px", top: y + "px"}).show();
        $(document).unbind("click").one("click", function(){$("#tooltip").hide();});
        $("#facilityUnit").text("").append("<li style='padding:0px 10px'><img src='"+IMAGES.wait+"' style='opacity: 0.6' /></li>");
        $.ajax({
            type: "POST",
            url: '/'+$(target).attr('href'),
            cache: false,
            success: function (html){
            var unit_list=[];
            $(html).find('h3').each(function(){
                if($(this).find('a').text()!=''){
                    var unit = $(this).find('a').text();
                    var lvup = $(this).parent().parent().parent().find('img[alt="この施設をレベルアップする"]').attr('alt');
                    var url = $(this).parent().parent().parent().find('a[href^="build.php"]').attr('href');
                    url=url.replace('&mode=cp','');
                    if(lvup==undefined) {
                        unit_list.push({mod:'c',unit:unit,url:url});
                    } else {
                        unit_list.push({mod:'u',unit:unit,url:url});
                    }
                }
            });
            if(unit_list==undefined) {
                $("#tooltip").hide();
                return;
            } else {
                addUnit(unit_list);
                return;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $("#tooltip").hide();
        }
        });
    }

    function addUnit(unit_list){
        $("#facilityUnit").text("");
        for(i=0;i<unit_list.length;i++) {
            var mod = unit_list[i].mod=='c' ? '建設':'LvUP';
            $('#facilityUnit').append('<li id="fUnit'+i+'" url="'+unit_list[i].url+'" style="color:black; padding:0px 10px; cursor:default">'+mod+'['+unit_list[i].unit+']</li>');
            $('#fUnit'+i).hover(function() {
                $(this).css({color:'white', 'background-color':'blue'});
            }, function() {
                $(this).css({color:'', 'background-color':''});
            }).click(function(e) {
                location.href="/facility/"+$(this).attr('url');
            });
            if(options['facility_tool_WUP']) {
                mod = unit_list[i].mod=='c' ? '建設['+unit_list[i].unit+']＋LvUP':'LvUP['+unit_list[i].unit+']×2';
                $('#facilityUnit').append('<li id="fUnit_opt'+i+'" url="'+unit_list[i].url+'" mod="'+unit_list[i].mod+'"style="color:black; padding:0px 10px; cursor:default">'+mod+'</li>');
                $('#fUnit_opt'+i).hover(function() {
                    $(this).css({color:'white', 'background-color':'blue'});
                }, function() {
                    $(this).css({color:'', 'background-color':''});
                }).click(function(e) {
                    nowLoading();
                    $.ajax({
                        type: "POST",
                        url: "/facility/"+$(this).attr('url'),
                        context:$(this),
                        cache: false,
                        success: function (html){
                            if($(this).attr('mod')=='c') {
                                var tmp = $(this).attr('url');
                                tmp=tmp.substring(tmp.indexOf('x='),tmp.length);
                                location.href="/facility/build.php?"+tmp;
                            } else {
                                location.href="/facility/"+$(this).attr('url');
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                        }
                    });
                });
            }
        }
    }

    function map_tool() {
        if (location.pathname!="/map.php") return;
        if(!options['map_tool']) return;
        if(options['map_rightclick']) return;
        if (typeof(this.ajflag)=='undeifned') {
            this.ajflag = true;
        }
        var tmp = '<div id="tooltip"><ul id="mapUnit" style="text-align:left"></ul></div>';
        $(document.body).append(tmp);
        $("#tooltip").hide().css({ position: "absolute", backgroundColor: "white", border: "solid 1px darkgray", padding: "3px", zIndex: 999});
        $("#mapOverlayMap area[href]").live("contextmenu", function(event){openToolMap(this, event.pageX, event.pageY);event.preventDefault();return false;});
        map_rightclick.ajflag = false;
    }

    function openToolMap(target,x,y) {
        $("#tooltip").css({ left: x + "px", top: y + "px"}).show();
        $(document).unbind("click").one("click", function(){$("#tooltip").hide();});
        $("#mapUnit").text("").append("<li style='padding:0px 10px'><img src='"+IMAGES.wait+"' style='opacity: 0.6' /></li>");
        var tmp = $(target).attr('href').match(/land\.php\?(.+)$/);
        $.ajax({
            type: "POST",
            url: $(target).attr('href'),
            cache: false,
            success: function (html){
                var tool_list=[];
                var url1 = $(html).find('.ig_mappanel_dataarea').find('a:eq(0)').attr('href');
                var url2 = $(html).find('.ig_mappanel_dataarea').find('a:eq(1)').attr('href');
                var nm = $(html).find('.ig_mappanel_dataarea').find('a:eq(0)').text();
                if(url1!==undefined)tool_list.push(url1);
                if(url2!==undefined)tool_list.push(url2);
                if($(html).find('#lordName').text()==nm)tool_list.push(tmp[0]);
                addToolMap(tmp,tool_list);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#tooltip").hide();
            }
        });
    }

    function addToolMap(tmp,tool_list){
        $('#mapUnit').text("");
        $('#mapUnit').append('<li id="mapMove" url="" style="color:black; padding:0px 10px; cursor:default">ここを中心に地図表示</li>');
        $('#mapMove').hover(function() {
            $(this).css({color:'white', 'background-color':'blue'});
        }, function() {
            $(this).css({color:'', 'background-color':''});
        }).click(function(e) {
                if (tmp===null) {
                    map_rightclick.ajflag = false;
                    return true;
                }
                $.ajax({
                        url: '/map.php?'+tmp[1],
                        cache: false,
                        dataType: "text",
                        success: function (html){
                            var $new_map = $(html).find('#ig_mapbox_container');
                            $('#ig_mapbox_container').replaceWith($new_map);

                            delete html;
                            delete $new_map;
                            var basedata = $('.basename').find('LI.on > SPAN').attr('title');
                            var tmp = basedata.match(/^([^(]+)\((-?\d+),(-?\d+)\)$/);
                            if (tmp===null) {
                                map_rightclick.ajflag = false;
                                return;
                            }
                            var base_name = tmp[0];
                            var base_x = parseInt(tmp[2]);
                            var base_y = parseInt(tmp[3]);
                            if (options['map_starx']) {
                                map_list2(base_x, base_y, base_name);
                            }
                            map_rightclick.ajflag = false;
                            map_rightdblclick();
                            if (options['prohibitionArea']) {
                                prohibitionArea();
                            }
                            if (options['panelAttack']) {
                                panelAttack();
                            }
                            if(options['zoomMap']) {
                                zoomMap();
                            }
                            $("#tooltip").hide();
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            map_rightclick.ajflag = false;
                            $("#tooltip").hide();
                            //console.log(textStatus);
                        }
                });
                return false;
        });
        $('#mapUnit').append('<li id="mapAttack" url="'+tmp[1]+'" style="color:black; padding:0px 10px; cursor:default">ここへ部隊出陣</li>');
        $('#mapAttack').hover(function() {
            $(this).css({color:'white', 'background-color':'blue'});
        }, function() {
            $(this).css({color:'', 'background-color':''});
        }).click(function(e) {
            location.href='/facility/send_troop.php?'+tmp[1];
            $("#tooltip").hide();
        });
        if(tool_list.length>0){
            $('#mapUnit').append('<li id="mapProfile" style="color:black; padding:0px 10px; cursor:default">プロフィール</li>');
            $('#mapProfile').hover(function() {
                $(this).css({color:'white', 'background-color':'blue'});
            }, function() {
                $(this).css({color:'', 'background-color':''});
            }).click(function(e) {
                location.href=tool_list[0];
                $("#tooltip").hide();
            });
            $('#mapUnit').append('<li id="mapAlliance" style="color:black; padding:0px 10px; cursor:default">同盟情報</li>');
            $('#mapAlliance').hover(function() {
                $(this).css({color:'white', 'background-color':'blue'});
            }, function() {
                $(this).css({color:'', 'background-color':''});
            }).click(function(e) {
                location.href=tool_list[1];
                $("#tooltip").hide();
            });
            if(tool_list[2]){
                $('#mapUnit').append('<li id="mapRename" style="color:black; padding:0px 10px; cursor:default">名称変更</li>');
                $('#mapRename').hover(function() {
                    $(this).css({color:'white', 'background-color':'blue'});
                }, function() {
                    $(this).css({color:'', 'background-color':''});
                }).click(function(e) {
                    renameArea(tool_list[2]);
                });
            }
        }
    }

    function renameArea(url){
        var req_data={};
        $.ajax({
            type: "POST",
            url: '/user/change/change.php',
            cache: false,
            dataType: "text",
            success: function (html){
                var new_name=null;
                var keys=null;
                req_data['comment']=$(html).find('.profile_edit').val();
                $(html).find('.common_box3bottom').find('a').each(function(){
                    if($(this).attr('href')=='/'+url){
                        new_name=prompt($(this).parent().parent().find('input:eq(0)').val(),"");
                        keys=$(this).parent().parent().find('input:eq(0)').attr('name');
                        return false;
                    }
                });
                if(new_name==null)return;
                $(html).find('.common_box3bottom').find('input').each(function(){
                    req_data[$(this).attr('name')]=$(this).val();
                });
                req_data[keys]=new_name;
                req_data['btn_preview']='確認';
                $.ajax({
                    type: "POST",
                    url: '/user/change/change.php#ptop',
                    data:req_data,
                    cache: false,
                    dataType: "text",
                    success: function (html){
                        delete req_data.btn_preview;
                        req_data['btn_send']='更新';
                        req_data['ssid']=$(html).find('*[name="ssid"]').val();
                        $.ajax({
                            type: "POST",
                            url: '/user/change/change.php#ptop',
                            data:req_data,
                            cache: false,
                            dataType: "text",
                            success: function (html){
                                location.reload();
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                            }
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                    }
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function prohibitionArea(){
        if(!options['prohibitionArea']) return;
        if(location.pathname != "/map.php") return;
        base_area = [
            [12,28],[28,12],[12,52],[36,36],[52,12],[12,76],[36,60],[60,36],[76,12],[12,100],
            [36,84],[60,60],[84,36],[100,12],[12,124],[36,108],[60,84],[84,60],[108,36],[124,12],
            [12,148],[36,132],[60,108],[84,84],[108,60],[132,36],[148,12],[36,156],[60,132],[84,108],
            [108,84],[132,60],[156,36],[60,156],[84,132],[108,108],[132,84],[156,60],[84,156],[108,132],
            [132,108],[156,84],[108,156],[132,132],[156,108],[132,156],[156,132],[156,156]
        ];
        var c = $('#ig_mapbox_container').find('a:eq(0)').attr('href').match(/c=\d+$/);
        for(var i=0;i<4;++i){
            var x,y;
            switch (i) {
            case 0:x=1;y=1;break;
            case 1:x=1;y=-1;break;
            case 2:x=-1;y=-1;break;
            case 3:x=-1;y=1;break;
            }
            for(var j=0;j<base_area.length;++j){
                var url="/land.php?x="+base_area[j][0]*x+"&y="+base_area[j][1]*y+"&"+c;
                if($('area[href="'+url+'"]').attr('alt')!=undefined) {
                    area_loop(base_area[j][0],base_area[j][1],x,y,c);
                    return;
                }
            }
        }
    }
    function area_loop(a,b,x,y,c) {
        for(var z=1;z<4;z++) {
            var xx = new Number(a);
            var yy = new Number(b);
            xx = (xx+z)*x;
            yy = (yy)*y;
            var url="/land.php?x="+xx+"&y="+yy+"&"+c;
            overOperation2(url);
            for(s=1;s<4;s++) {
                var ss=yy+s;
                var url="/land.php?x="+xx+"&y="+ss+"&"+c;
                overOperation2(url);
                ss=yy-s;
                var url="/land.php?x="+xx+"&y="+ss+"&"+c;
                overOperation2(url);
            }
        }
        for(var z=1;z<4;z++) {
            var xx = new Number(a);
            var yy = new Number(b);
            xx = (xx-z)*x;
            yy = (yy)*y;
            var url="/land.php?x="+xx+"&y="+yy+"&"+c;
            overOperation2(url);
            for(s=1;s<4;s++) {
                var ss=yy+s;
                var url="/land.php?x="+xx+"&y="+ss+"&"+c;
                overOperation2(url);
                ss=yy-s;
                var url="/land.php?x="+xx+"&y="+ss+"&"+c;
                overOperation2(url);
            }
        }
        for(var z=1;z<4;z++) {
            var xx = new Number(a);
            var yy = new Number(b);
            xx = (xx)*x;
            yy = (yy+z)*y;
            var url="/land.php?x="+xx+"&y="+yy+"&"+c;
            overOperation2(url);
        }
        for(var z=1;z<4;z++) {
            var xx = new Number(a);
            var yy = new Number(b);
            xx = (xx)*x;
            yy = (yy-z)*y;
            var url="/land.php?x="+xx+"&y="+yy+"&"+c;
            overOperation2(url);
        }
    }

    function overOperation2(url){
        if($('area[href="'+url+'"]').attr('alt')!=undefined) {
            var w_script=$('area[href="'+url+'"]').attr('onmouseover').toString();
            w_script = w_script.substring(w_script.indexOf('overOperation'),w_script.length-2);
            w_script=w_script.replace("overOperation(","");
            w_script=w_script.replace(");","");
            w_script=w_script.replace(/'|"/g,"");
                    w_script=w_script.replace(/\s/g,"");
            w_script=w_script.split(',');
            var tmp=$('img#rollover').clone();
            tmp.attr('src',IMAGES.panel_rollover_pink);
            tmp.attr('id','');
            tmp.css('left',w_script[1]);
            tmp.css('top',w_script[2]);
            $('map#mapOverlayMap').after(tmp);
        }
    }

    function zoomMap() {
        if(!options['zoomMap']) return;
        if(location.pathname != "/map.php") return;
        $('#zoombox').remove();
        var zoom_box = $('<div id="zoombox">').css({fontSize:'10px',zIndex:1000, width:'136px', height:'75px', position:'absolute', top:'100px', left:'10px', padding:'0 0 11px 0'});
        $('#ig_mapbox').prepend(zoom_box);
        zoom_box = $('<div id="zoomboxInner">').css({padding:'5px 7px'});
        $('#zoombox').prepend(zoom_box);
        zoom_box = '<ui><li id="zoomImg"><img src="/img/common/dummy.gif" id="timg"></li></ui>';
        $('#zoomboxInner').prepend(zoom_box);
        $('area').each(function(){
            if($(this).attr('alt').indexOf('空き地')>=0) return true;
            $(this).hover(function(){
                var left = $('img#rollover').css('left');
                var top = $('img#rollover').css('top');
                $('img[class^="mapAll"]').each(function(){
                    var t_left = $(this).css('left');
                    var t_top = $(this).css('top');
                    var w_top = new Number(t_top.replace('px',''));
                    w_top=w_top-2;
                    w_top=w_top+'px';
                    if(((left==t_left)&&(top==t_top))||((left==t_left)&&(top==w_top))) {
                        $('#timg').attr('src',$(this).attr('src'));
                        $('#timg').css('width','105%');
                        return false;
                    }
                });
            },function(){$('#timg').attr('src','/img/common/dummy.gif');$('#timg').css('width','1px');});
        });
    }

    function favoriteSort() {
        if(!options['favoriteSort']) return;
        if(location.pathname != "/card/deck.php"&&location.pathname != "/facility/set_unit_list.php"&&location.pathname != "/union/levelup.php"&&location.pathname != "/union/additional.php") return;
        var favorite ='';
        if(location.pathname == "/facility/set_unit_list.php") {
            favorite = $('<div id="favoritebox">').css({'padding-top':'10px'});
            $('#deck_file').after(favorite);
            favorite = $('<div id="favoritearea">');
        } else {
            favorite = $('<div id="favoritebox">').css({'background':'url(/img/deck/box04_title.png) no-repeat left top','width':'729px','height':'34px','padding':'4px 9px 0px 9px','margin-bottom':'8px','margin-left':'12px'});
            if(location.pathname == "/union/levelup.php"||location.pathname == "/union/additional.php") {
                $('#ig_deck_cardlistmenu.clearfix').after(favorite);
            } else {
                $('#ig_deck_cardlistmenu.clearfix.deck_card_menu').after(favorite);
            }
            favorite = $('<div id="favoritearea">').css({'float':'left','width':'729px','padding-top':'6px'});
        }
        $('#favoritebox').append(favorite);
        favorite = '<div style="float:left"><select id="favoriteselect"></select>&nbsp;&nbsp;&nbsp;&nbsp;<input type=button value="変更する" id="favoriteupdate"></div><div style="float:right"><input type=button value="保存する" id="favoritesave">&nbsp;&nbsp;<input type=button value="削除する" id="favoritedelete"></div>';
        $('#favoritearea').append(favorite);
        $('#favoritesave').click(favoriteSave);
        $('#favoritedelete').click(favoriteDelete);
        $('#favoriteupdate').click(favoriteUpdate);
        favoriteView();
    }

    function favoriteView() {
        var favorite_list = {};
        if(localStorage.getItem("ixakaizou_favorite_list")!=null) {
            favorite_list = secureEvalJSON(localStorage.getItem("ixakaizou_favorite_list"));
        }
        $('#favoriteselect').children().remove();
        $('#favoriteselect').append('<option>----お気に入りソート選択----</option>');
        for (i in favorite_list) {
            var tmp='<option value="'+favorite_list[i]+'">'+i+'</option>';
            $('#favoriteselect').append(tmp);
        }
    }

    function favoriteSave() {
        var favorite_list = {};
        var l_key = '';
        var l_val = new Array();
        if(localStorage.getItem("ixakaizou_favorite_list")!=null) {
            favorite_list = secureEvalJSON(localStorage.getItem("ixakaizou_favorite_list"));
        }
        for(i=0;i<3;i++) {
            l_key+=$('#sort_order_'+i).children(':selected').text()+':';
            l_key+=$('#sort_order_type_'+i).children(':selected').text()+'　';
            l_val.push($('#sort_order_'+i).children(':selected').attr('value'));
            l_val.push($('#sort_order_type_'+i).children(':selected').attr('value'));
        }
        favorite_list[l_key] = l_val.join('/');
        localStorage.setItem('ixakaizou_favorite_list', toJSON(favorite_list));
        favoriteView();
    }

    function favoriteDelete() {
        var favorite_list = {};
        var favorite_list_new = {};
        if(localStorage.getItem("ixakaizou_favorite_list")!=null) {
            favorite_list = secureEvalJSON(localStorage.getItem("ixakaizou_favorite_list"));
        }
        var target=$('#favoriteselect').children(':selected').attr('value');
        if(target==undefined) return;
        for (i in favorite_list) {
            if(favorite_list[i]!=target) {
                favorite_list_new[i] = favorite_list[i];
            }
        }
        localStorage.setItem('ixakaizou_favorite_list', toJSON(favorite_list_new));
        favoriteView();
    }

    function favoriteUpdate() {
        var target=$('#favoriteselect').children(':selected').attr('value');
        if(target==undefined) return;
        target = target.split('/');
        $('#sort_order_0').val(target[0]);
        $('#sort_order_type_0').val(target[1]);
        $('#sort_order_1').val(target[2]);
        $('#sort_order_type_1').val(target[3]);
        $('#sort_order_2').val(target[4]);
        $('#sort_order_type_2').val(target[5]);
        $('input.sortSubmit').trigger("onclick");
    }

    function unitListDialog() {
        if(!options['unitListDialog']) return;
        if(location.pathname != "/card/deck.php") return;
        jQuery.event.special.ready.setup();
        var listdialog = $('<div id="unitlistdialog" style="display:none;"><table id="tb_unit" class="tablesorter" width=100%><thead><tr><th>選択</th><th>No</th><th>ﾚｱ</th><th>名前</th><th>ｺｽﾄ</th><th>Lv</th><th>HP</th><th>指揮兵</th><th>兵種</th><th>攻撃</th><th>防御</th><th>兵法</th><th>槍</th><th>馬</th><th>弓</th><th>器</th></tr></thead><tbody id="tb_unitlist"></tbody></table>');
        var sidemenulink = $('<li style="margin-left: 6px;padding-bottom: 6px;padding-left: 8px;background: url("/img/common/sidebar/icon_off.gif") no-repeat 0 2px;"><a href="#TB_inline?height=440&amp;width=800&amp;inlineId=unitlistdialog" class="thickbox" title="待機武将一覧" onclick="return false;">待機武将一覧</a></li>');
        $('#ig_boxInner.clearfix').append(listdialog);

        $('#toollist').append(sidemenulink);
        $('a.thickbox').live('mousedown',function() {
            $('#tb_unitlist').children().remove();
            var max_page='';
            if(options['pager_ajax']) {
                max_page=$('#lastpage').attr('page');
                if(max_page==undefined) {
                    $('.cardstockchange.clearfix').find('a[page^=]').each(function() {
                        max_page=$(this).attr('page');
                    });
                }
            } else {
                $('UL.pager.cardstock').find('li.last').find('a').each(function() {
                    if($(this).attr('title')=='last page') {
                        var script = $(this).attr('onclick').toString();
                        script = script.substring(script.indexOf('"p"'),script.length);
                        script = script.split('=');
                        script = script[1].split(';');
                        max_page = script[0].replace(/\s|\"/g,'');
                        return false;
                    }
                });
                if(max_page==''){
                    $('UL.pager.cardstock').find('A').each(function() {
                        var page = parseInt($(this).attr('title').substring(1));
                        if (page>0) {
                            max_page = page;
                        }
                    });
                }
            }
            if(max_page==''||max_page==undefined) max_page=1;
            createUnitList(1,max_page);
            tb_init('a.thickbox');
            var select_deck=$('#ig_deck_unititle.clearfix:eq(0)').find('a:eq(0)').attr('href');
            var select_name=$('#ig_deck_unititle.clearfix:eq(0)').text();
            var tmp='<p id="v_head">部隊が選択されていません<input type=button value="総攻防力" id="energy"><span id="power"></span></p>';
            if(select_deck!=undefined) {
                select_deck=select_deck.split('=');
                select_deck=select_deck[1];
                tmp='<p id="v_head">部隊名:'+select_name+'<input type=button value="選択中の部隊へセット" id="set_unitlist"><input type=button value="総攻防力" id="energy"><span id="power"></span><input type="hidden" id="select_deck" value="'+select_deck+'"><input type="hidden" id="maxpage" value="'+max_page+'"></p>';
            }
            $('#v_head').remove();
            $('#tb_unit').before(tmp);
            $('#set_unitlist').live('click',function(){
                unit_set();
            });
            $('#energy').live('click',function() {
                cal_energy();
            });
        });
    }

    function cal_energy() {
        var UnitData = {
                "足軽":{off:11,def:11,mov:15,tp1:"t1",tp2:"t1"},"長槍足軽":{off:16,def:16,mov:16,tp1:"t1",tp2:"t1"},"武士":{off:18,def:18,mov:18,tp1:"t1",tp2:"t3"},
                "弓足軽":{off:10,def:12,mov:16,tp1:"t3",tp2:"t3"},"長弓兵":{off:15,def:17,mov:18,tp1:"t3",tp2:"t3"},"弓騎馬":{off:17,def:19,mov:23,tp1:"t2",tp2:"t3"},
                "騎馬兵":{off:12,def:10,mov:22,tp1:"t2",tp2:"t2"},"精鋭騎馬":{off:17,def:15,mov:23,tp1:"t2",tp2:"t2"},"赤備え":{off:21,def:20,mov:25,tp1:"t1",tp2:"t2"},
                "破城鎚":{off:3,def:8,mov:8,tp1:"t4",tp2:"t4"},"攻城櫓":{off:14,def:5,mov:10,tp1:"t4",tp2:"t4"},"大筒兵":{off:10,def:12,mov:8,tp1:"t3",tp2:"t4"},
                "鉄砲足軽":{off:18,def:26,mov:15,tp1:"t1",tp2:"t4"},"騎馬鉄砲":{off:26,def:18,mov:21,tp1:"t2",tp2:"t4"}
        };
        var rank={SSS:1.20,SS:1.15,S:1.10,A:1.05,B:1,C:0.95,D:0.9,E:0.85,F:0.80};
        var check_list=[];
        $('input[name^="id"]:checked').each(function(){
            var unit=$(this).parent().parent().find('td:eq(8)').text();
            var off=$(this).parent().parent().find('td:eq(9)').text();
            var def=$(this).parent().parent().find('td:eq(10)').text();
            var num=$(this).parent().parent().find('td:eq(7)').text();
            var t1=$(this).parent().parent().find('td:eq(12)').text();
            var t2=$(this).parent().parent().find('td:eq(13)').text();
            var t3=$(this).parent().parent().find('td:eq(14)').text();
            var t4=$(this).parent().parent().find('td:eq(15)').text();
            num = num.substring(0,num.indexOf('/'));
            //t1:槍,t2:馬,t3:弓,t4:器
            check_list.push({unit:unit,off:off,def:def,num:num,t1:t1,t2:t2,t3:t3,t4:t4});
        });
        if(check_list.length==0) {alert('選択されてません');return;}
        else if(check_list.length>4) {alert('選択可能数を超えています(最大4つまで)');return;}
        var o_power=0;
        var d_power=0;
        for(var i=0;i<check_list.length;i++) {
            var r1=rank[(check_list[i])[UnitData[check_list[i].unit].tp1]];
            var r2=rank[(check_list[i])[UnitData[check_list[i].unit].tp2]];
            o_power+=(parseInt(check_list[i].num*UnitData[check_list[i].unit].off)+parseInt(check_list[i].off))*((r1+r2)/2);
            d_power+=(parseInt(check_list[i].num*UnitData[check_list[i].unit].def)+parseInt(check_list[i].def))*((r1+r2)/2);
        }
        var tmp = '　　攻撃力:'+o_power.toFixed(1)+'　　/　　防御力:'+d_power.toFixed(1);
        $('#power').text(tmp);
    }

    function unit_set(){
        var check_list=[];
        $('input[name^="id"]:checked').each(function(){
            check_list.push($(this).attr('value'));
        });
        if(check_list.length==0) {alert('選択されてません');return;}
        else if(check_list.length>3) {alert('選択可能数を超えています(最大3つまで)');return;}
        var select_assign_no=$('#select_assign_no').attr('value');
        var set_assign_id=$('#set_assign_id').attr('value');
        var maxpage=$('#maxpage').attr('value');
        nowLoading();
        setDeck_Id(check_list,0,select_assign_no,set_assign_id,1,maxpage);
    }

    function setDeck_Id(check_list,list_index,select_assign_no,set_assign_id,page_index,maxpage) {
        if((check_list.length<list_index)||(maxpage<page_index)) {
            location.href="/card/deck.php";
            return;
        }
        var w_null='';
        var data = {select_assign_no:select_assign_no,unit_assign_id:w_null,unset_unit_squad_id:w_null,change_unit_squad_id:w_null,dungeon_unit_squad_id:w_null,dungeon_card_id:w_null,dungeon_select:w_null,deck_mode:'nomal',p:page_index};

        $.ajax({
            type: "POST",
            url: '/card/deck.php',
            data:data,
            cache: false,
            success: function (html){
            $(html).find('a[href^="/facility/set_unit.php?card_id='+check_list[list_index]+'&ano=0&p='+page_index+'"]').each(function() {
                if(($(this).parent().parent().find('img[title^="選択中の部隊へ"]').attr('src')!=undefined)) {
                    var work_id = $(this).parent().parent().find('a[onclick^="confirmRegist"]').attr('onclick').toString().split(',');
                    set_squad_id = work_id[1].replace(/\'/g,'');
                            return false;
                } else {
                    set_squad_id='';
                }
            });
                    if(set_squad_id!='') {
                        var data2 = {target_card:w_null,select_assign_no:select_assign_no,mode:'assign_insert',btn_change_flg:w_null,set_village_id:w_null,set_assign_id:set_assign_id,set_squad_id:set_squad_id,deck_mode:'nomal',p:page_index};
                        $.ajax({
                            type: "POST",
                            url: '/card/deck.php',
                            data:data2,
                            cache: false,
                            success: function (html){
                            list_index++;
                            page_index=1;
                            setDeck_Id(check_list,list_index,select_assign_no,set_assign_id,page_index,maxpage);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //console.log(textStatus);
                        }
                        });
                    }else{
                        page_index++;
                        setDeck_Id(check_list,list_index,select_assign_no,set_assign_id,page_index,maxpage);
                    }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    function createUnitList(p,max) {
        var null_w='';
        var data={myselect:null_w,ano:0,dmo:'nomal',p:p};
        $.ajax({
            type: "POST",
            url: '/card/deck.php',
            data:data,
            cache: false,
            success: function (html){
            $(html).find('.ig_deck_smallcardarea.clearfix').each(function(){
                if($(this).find('a[href^="/facility/set_unit.php"]').attr('href')==undefined) return true;
                var no=$(this).find('span.ig_deck_smallcard_cardnumber').text().replace('No.','');
                var r=$(this).find('span.ig_deck_smallcard_cardrarety').text();
                var nm=$(this).find('span.ig_deck_smallcard_cardname').text();
                var c=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(0)').text();
                var lv=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(1)').text();
                var hp=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(2)').text();
                var ucnt=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(3)').text();
                var hs=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(4)').text();
                var hs=$(this).find('table.ig_deck_smallcarddata:eq(0)').find('td:eq(4)').text();
                var at=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(0)').text();
                var df=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(2)').text();
                var hy=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(1)').text();
                var ya=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(4)').text();
                var um=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(5)').text();
                var yu=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(6)').text();
                var ki=$(this).find('table.ig_deck_smallcarddata:eq(1)').find('td:eq(7)').text();
                var id=$(this).find('a[href^="/facility/set_unit.php"]').attr('href').split('=');
                id=id[1].replace('&ano','');
                var tmp='<tr><td><input type=checkbox name="id" value="'+id+'"></td><td>'+no+'</td><td>'+r+'</td><td>'+nm+'</td><td>'+c+'</td><td>'+lv+'</td><td>'+hp+'</td><td>'+ucnt+'</td><td>'+hs+'</td><td>'+at+'</td><td>'+df+'</td><td>'+hy+'</td><td>'+ya+'</td><td>'+um+'</td><td>'+yu+'</td><td>'+ki+'</td></tr>';
                $('#tb_unitlist').append(tmp);
            });
            p++;
            if(p>max) {
                $('#tb_unit').ready(function(){
//                    $('#tb_unit').tablesorter();
                });
                return;
            }else{createUnitList(p,max);}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    function unit_list_200() {
        if(location.pathname != "/facility/set_unit_list.php") return;
        if(!options['unit_list_200']) {unitList_check();return;}
        if($('SELECT[name="show_num"]').val()!=100) {unitList_check();return;}
        if($('a[href^="/facility/set_unit_list.php?show_num=100&p=2"]').text()==''){unitList_check();return;}
        $('ul.pager').remove();
        $.ajax({
            type: "POST",
            url: '/facility/set_unit_list.php?show_num=100&p=2',
            cache: false,
            success: function (html){
            var num=0;
            $(html).find('div[id^="cardWindow"]').each(function() {
                var tmp = $(this).clone();
                $('#sidebar').before(tmp);
            });
            $(html).find('table.common_table1.center.mt10').find('tr').each(function() {
                if(num==0){num++;return true;}
                var tmp = $(this).clone();
                $('table.common_table1.center.mt10').find('tr:last').after(tmp);
            });
            $('a.thickbox').live('mousedown',function() {
                tb_init('a.thickbox');
            });
            after_tohankaku();
            unitList_check();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    function fall_check() {
        if(!options['fall_check']) return;
        if(location.pathname != "/user/") return;
        if($('.common_table1.center').eq(0).find('th:last').text()!='-') {
            $('.common_table1.center').eq(0).find('th:last').after('<th>-</th>');
        } else {
            return;
        }
        var nm=[];
        var tmp=[];
        var ins_point=[];
        $('.common_table1.center').eq(0).find('.fs14').each(function() {
            var $this = $(this);
            switch ($this.find('td:eq(0)').text()) {
                case '本領': case '所領': case '出城': break;
                default: return true;
            }
            nm.push($this.find('a:eq(0)').text().replace(/^\s+|\s+$/g, ""));
            var t = $this.find('a:eq(1)').attr('href').match(/map\.php\?(.+)$/);
            tmp.push(t[1]);
            ins_point.push($this.find('td:last'));
        });
        fall_write(nm,tmp,ins_point,0);
    }

    function fall_write(nm,tmp,ins_point,cnt) {
        if(cnt>nm.length) return;
        $.ajax({
            url: '/map.php?'+tmp[cnt],
            cache: false,
            dataType: "text",
            success: function (html){
                var areas = $(html).find('map#mapOverlayMap > area');
                var imgs = $(html).find('div#ig_mapsAll > img').filter(function(){if($(this).attr('src').indexOf('outside')<0)return $(this);});
                var index = areas.index(areas.filter('[title="' + nm[cnt] + '"]'));
                if (index >= 0 && imgs.eq(index).attr('src').indexOf('fall_capital') > 0) {
                    $(ins_point[cnt]).after("<td><span class='red'>陥落中</span></td>");
                } else {
                    $(ins_point[cnt]).after("<td>&nbsp;</td>");
                }
                cnt++;
                fall_write(nm,tmp,ins_point,cnt);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //console.log(textStatus);
            }
        });
    }

    function after_tohankaku() {
        if (options['tohankaku']) {
            $('INPUT[type="text"]').change(function(e) {
                var $this = $(this);
                $this.val(toHankaku($this.val()));
            });
        }
    }

    function unit_list_max() {
        if(!options['unit_list_max']) return;
        if(location.pathname != "/facility/set_unit_list.php") return;
        $('input[value="変更"]').each(function(){
            var i = $(this).attr('id').replace('btn_change_','');
            $('#unit_set_link'+i).click(function(){
                $('#btn_change_'+i).trigger("onclick");
            });
        });
    }

    function panel_func_change() {
        if(!options['panel_func_change']) return;
        if(location.pathname != "/land.php") return;
        var func_list={};
        $('.ig_mappanel_function_mid').find('br').each(function(){
            $(this).remove();
        });
        $('.ig_mappanel_function_mid').find('img').each(function(){
            func_list[$(this).attr('alt')]=$(this).parent().attr('href');
            $(this).parent().remove();
        });
        var id_num=0;
        for(i in func_list) {
            var obj='<input type="button" id="btn_'+id_num+'" value="'+i+'">';
            $('.ig_mappanel_function_mid').append(obj);
            if((i=='陣を破棄する')||(i=='領地を破棄する')){
                $('#btn_'+id_num).click(function(e){
                    return function() {
                        if(confirm('ここを破棄し、空き地に戻しますか？')){
                            location.href=e.value;
                        }
                    }}({value:func_list[i]}));
            } else if(i=='破棄を中止する'){
                $('#btn_'+id_num).click(function(e){
                    return function() {
                        if(confirm('破棄を中止しますか？')){
                            location.href=e.value;
                        }
                    }}({value:func_list[i]}));
            } else {
                $('#btn_'+id_num).click(function(e){
                    return function() {
                        location.href=e.value;
                    }}({value:func_list[i]}));
            }
            id_num++;
        }
    }

    function comBtnEnemy() {
        var tmp = '<li id="comBtnEnemy"><a href="#" id="Enemy">敵襲</a></li>';
        $('li#comBtnChat').after(tmp);
        $('li#comBtnRecruit').find('a').attr('id','Recruit');
        $('li#comBtnChat').find('a').attr('id','Chat');
        $('#Recruit').click(function(){tabChangeListKaizou('Recruit');});
        $('#Chat').click(function(){tabChangeListKaizou('Chat');});
        $('#Enemy').click(function(){tabChangeListKaizou('Enemy');});
        var tmp2='<div id="commentListEnemy" style="display: none; "><div id="enemyComment"><table style="float:left;width:400px;"><tbody id="enemyLine"><tr><td>&nbsp;&nbsp;現在、該当する状態の部隊はいません</td></tr></tbody></table></div><ul style="float: right;width: 53px;padding: 7px 6px 0 0;"><li style="padding-bottom: 4px;"><a href="#" id="enemyReload"><img src="/img/common/news/btn_comment_reload.gif" alt="敵襲欄を更新" title="敵襲欄を更新" class="fade" style="opacity: 1; "></a></li></ul></div>';
        $('#commentListChat').after(tmp2);
        $('#enemyReload').click(function(){enemyCheck();});
    }

    function enemyCheck() {
        $.ajax({
            url: '/facility/unit_status.php?dmo=enemy',
            cache: false,
            dataType: "text",
            success: function (html){
            $('#enemyLine').children().remove();
            var t = $(html).find('.ig_decksection_innermid').text();
            t=t.replace(/\s/g,'');
            if(t=='現在、該当する状態の部隊はいません'){
                var tmp='<tr><td>&nbsp;&nbsp;現在、該当する状態の部隊はいません</td></tr>';
                $('#enemyLine').append(tmp);
            } else {
                var cnt=0;
                var new_enemy_list=new Array;
                $(html).find('.ig_decksection_innermid').find('.ig_fight_statusarea').each(function(){
                    var enemy_nm = $(this).find('a:eq(0)').text();
                    var enemy_href = $(this).find('a:eq(0)').attr('href');
                    var enemy_time = $(this).find('.paneltable.table_fightlist').find('td:eq(1)').text();
                    enemy_time=enemy_time.substring(0,enemy_time.indexOf('（'));
                    enemy_time = new Date(enemy_time);
                    var yy = enemy_time.getYear();
                    var mm = enemy_time.getMonth() + 1;
                    var dd = enemy_time.getDate();
                    var hh = enemy_time.getHours();
                    var ms = enemy_time.getMinutes();
                    var ss = enemy_time.getSeconds();
                    if (yy < 2000) { yy += 1900; }if (mm < 10) { mm = "0" + mm; }if (dd < 10) { dd = "0" + dd; }
                    if (hh < 10) { hh = "0" + hh; }if (ms < 10) { ms = "0" + ms; }if (ss < 10) { ss = "0" + ss; }
                    enemy_time = mm+'/'+dd+'&nbsp;'+hh+':'+ms+':'+ss+'&nbsp;';
                    var enemy_start = $(this).find('.td_bggray:eq(0)').text();
                    var enemy_start_href=$(this).find('a:eq(1)').attr('href');
                    var player_start = $(this).find('.td_bggray:eq(1)').text();
                    var player_start_href=$(this).find('a:eq(2)').attr('href');
                    var tmp='<tr><td>&nbsp;'+enemy_time+'</td><td><a href="'+enemy_href+'" style="color:#C00;width:100%;">'+enemy_nm+'</a></td><td>の</td><td><a href="'+enemy_start_href+'" style="color:#C00;width:100%;">【'+enemy_start+'】</a></td><td>から</td><td><a href="'+player_start_href+'" style="color:#C00;width:100%;">'+player_start+'</a></td></tr>';
                    if(cnt<4) {
                        $('#enemyLine').append(tmp);
                    }
                    cnt++;
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(textStatus);
        }
        });
    }

    function tabChangeListKaizou(b){
        $("div[id^=commentList]").css("display","none");
        $("#commentNavi li a").css("display","block");
        $("#commentList"+b).css("display","block");
        $("#commentNavi #comBtn"+b+" a").css("display","none");
        if("Chat"==b){
            localStorage.setItem("header_info_type","Chat");
        }else if("Enemy"==b){
            localStorage.setItem("header_info_type","Enemy");
        }else{
            localStorage.setItem("header_info_type","Recruit");
        }
    }

    function commentListSelecter(){
        var target = localStorage.getItem("header_info_type");
        if(target!=undefined){
            tabChangeListKaizou(target);
        }
    }

    function villageListView(){
        if(!options['villageListView']) return;
        jQuery.event.special.ready.setup();
        $('#mokotool').append('<div id="villagelistdialog" style="display:none;"><table class="tablesorter" width=100%><thead><tr><th>名前</th><th>実行中作業</tr></thead><tbody id="tb_villagelist"></tbody></table></div>');
        $('.sideBoxHead > h4').each(function(){
            if($(this).text()!='自国') return false;
            $(this).replaceWith('<h4><a href="#TB_inline?height=400&amp;width=560&amp;inlineId=villagelistdialog" class="thickbox" title="自国" onclick="return false;">自国</a></li>');
            $("a.thickbox").live("mousedown",function() {
                var lastSelect = $(".sideBoxInner.basename").find(".on").text();
                tb_init('a.thickbox');
                $('#tb_villagelist').children().remove();
                $.ajax({
                    url: '/user/',
                    cache: false,
                    dataType: "text",
                    success: function (html){
                        var href_point=[];
                        var ins_point=[];
                        $(html).find('.common_table1.center').find('.fs14').each(function() {
                            switch ($(this).find('td:eq(0)').text()) {
                                case '本領': case '所領': break;
                                default: return true;
                            }
                            var nm = $(this).find('a:eq(0)').text().replace(/^\s+|\s+$/g, "");
                            var href= $(this).find('a:eq(0)').attr('href');
                            var tmp = '<tr><td><a href="'+href+'">'+nm+'</a></td><td style="text-align: left;"></td></tr>';
                            $('#tb_villagelist').append(tmp);
                            href_point.push(href);
                            ins_point.push($('#tb_villagelist').find('tr:last'));
                        });
                        addVillageList(href_point,ins_point,0,lastSelect);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log(textStatus);
                    }
                });
            });
        });
    }

    function addVillageList(href_point,ins_point,i,lastSelect){
        if(href_point.length<=i) {
            //地図の表示サイズタイプと同様にデフォルト所領選択値もサーバサイドで保持されている為、
            //最後にリクエストした所領がサーバで保持される
            //よって、建設状態リストを表示する直前のデフォルト所領選択値を保持しておき
            //最後にそのデフォルト所領へアクセスすることで、デフォルト値を元の値に戻す処理
            $.ajax({
                    url: '/user/',
                    cache: false,
                    dataType: "text",
                    success: function (html){
                        $(html).find('.common_table1.center').find('.fs14').each(function() {
                            if($(this).find('a:eq(0)').text().replace(/^\s+|\s+$/g, "")==lastSelect){
                                var href= $(this).find('a:eq(0)').attr('href');
                                $.ajax({
                                    url: href,
                                    cache: false,
                                    dataType: "text",
                                    success: function (html){
                                        return;
                                    },
                                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    }
                                });
                            }
                        });
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        //console.log(textStatus);
                    }
            });
            return;
        }
        $.ajax({
            url: href_point[i],
            cache: false,
            dataType: "text",
            success: function (html){
                var buildStatus=[];
                var buildTime=[];
                $(html).find('#actionLog').find('.clearfix').find('.buildStatus').each(function(){
                    buildStatus.push($(this).text());
                });
                $(html).find('#actionLog').find('.clearfix').find('.buildTime').each(function(){
                    buildTime.push($(this).text());
                });
                for(j=0;j<buildStatus.length;j++) {
                    ins_point[i].find('td:last').append(buildStatus[j]+'が'+buildTime[j]+'に完了します。<br/>');
                }
                i++;
                addVillageList(href_point,ins_point,i,lastSelect);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function panelAttack() {
        if(!options['panelAttack']) return;
        if(location.pathname != "/map.php") return;
        $.ajax({
            url: '/facility/unit_status.php?dmo=all',
            cache: false,
            dataType: "text",
            success: function (html){
                $(html).find('.ig_fight_statusarea').each(function(){
                    $(this).find('img').each(function(){
                        if($(this).attr('src').indexOf('mode_attack.png') >0) {
                            var href=$(this).parent().parent().parent().find('.td_bggray:eq(1)').find('a:eq(0)').attr('href');
                            href=href.replace('..','');
                            overOperation3(href,IMAGES.panel_attack);
                            return false;
                        }
                        if($(this).attr('src').indexOf('mode_meeting.png') >0) {
                            var href=$(this).parent().parent().parent().find('.td_bggray:eq(1)').find('a:eq(0)').attr('href');
                            href=href.replace('..','');
                            overOperation3(href,IMAGES.panel_meeting);
                            return false;
                        }
                        if($(this).attr('src').indexOf('icon_backup.png') >0) {
                            var href=$(this).parent().parent().parent().find('.td_bggray:eq(1)').find('a:eq(0)').attr('href');
                            href=href.replace('..','');
                            overOperation3(href,IMAGES.panel_meeting);
                            return false;
                        }
                    });
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    }

    function overOperation3(url,img){
        if($('area[href="'+url+'"]').attr('alt')!=undefined) {
            var w_script=$('area[href="'+url+'"]').attr('onmouseover').toString();
            w_script = w_script.substring(w_script.indexOf('overOperation'),w_script.length-2);
            w_script=w_script.replace("overOperation(","");
            w_script=w_script.replace(");","");
            w_script=w_script.replace(/'/g,"");
                    w_script=w_script.replace(/\s/g,"");
            w_script=w_script.split(',');
            var tmp=$('img#rollover').clone();
            tmp.attr('src',img);
            tmp.attr('id','');
            tmp.css('left',w_script[1]);
            tmp.css('top',w_script[2]);
            $('map#mapOverlayMap').after(tmp);
        }
    }

    function deckGroupImgView() {
        if(!options['deckGroupImgView']) return;
        if(location.pathname != "/card/deck.php"&&location.pathname != "/union/levelup.php") return;
        var group_id={};
        if (localStorage.getItem("ixamoko_group_set")!=null) {
            group_id = secureEvalJSON(localStorage.getItem("ixamoko_group_set"));
        } else {
            return;
        }
        $('.ig_deck_smallcardarea.clearfix').each(function(){
            var id=$(this).find('a[href^="#TB_inline"]').attr('href');
            id=id.substring(id.indexOf("cardWindow_"),id.length).replace("cardWindow_",'');
            var tmp='<div style="position: absolute;z-index:4;"><img src="'+groups_img[group_setting[id]]+'"></div>';
            $(this).find('.ig_deck_smallcardimage').prepend(tmp);
        });
    }

    function displayUnitPower() {
        if(!options['displayUnitPower']) return;
        if(location.pathname != "/card/deck.php") return;

        var unitKey = {
            yari1: "足軽"  , yari2: "長槍足軽", yari3: "武士"  , yari4: "国人衆"  ,
            yumi1: "弓足軽", yumi2: "長弓兵"  , yumi3: "弓騎馬", yumi4: "海賊衆",
            kiba1: "騎馬兵", kiba2: "精鋭騎馬", kiba3: "赤備え", kiba4: "母衣衆",
            heiki1: "破城鎚",heiki2:"攻城櫓"  , heiki3:"大筒兵",
            heiki4:"鉄砲足軽", heiki5:"騎馬鉄砲", heiki6:"雑賀衆"
        };

        var UnitData = {
                "足軽"    :{off:11,def:11,mov:15,des: 2,tp1:"t1",tp2:"t1"},"長槍足軽":{off:16,def:16,mov:16,des:2,tp1:"t1",tp2:"t1"},"武士"  :{off:18,def:18,mov:18,des: 2,tp1:"t1",tp2:"t3"},
                "国人衆"  :{off:17,def:13,mov:17,des: 3,tp1:"t1",tp2:"t1"},
                "騎馬兵"  :{off:12,def:10,mov:22,des: 1,tp1:"t2",tp2:"t2"},"精鋭騎馬":{off:17,def:15,mov:23,des:1,tp1:"t2",tp2:"t2"},"赤備え":{off:21,def:20,mov:25,des: 1,tp1:"t1",tp2:"t2"},
                "母衣衆"  :{off:19,def:16,mov:24,des: 2,tp1:"t2",tp2:"t2"},
                "弓足軽"  :{off:10,def:12,mov:16,des: 1,tp1:"t3",tp2:"t3"},"長弓兵"  :{off:15,def:17,mov:18,des:1,tp1:"t3",tp2:"t3"},"弓騎馬":{off:17,def:19,mov:23,des: 1,tp1:"t2",tp2:"t3"},
                "海賊衆"  :{off:16,def:17,mov:20,des: 2,tp1:"t3",tp2:"t3"},
                "破城鎚"  :{off: 3,def:8 ,mov:8 ,des:10,tp1:"t4",tp2:"t4"},"攻城櫓"  :{off:14,def: 5,mov:10,des:7,tp1:"t4",tp2:"t4"},"大筒兵":{off:10,def:12,mov: 8,des:20,tp1:"t3",tp2:"t4"},
                "鉄砲足軽":{off:18,def:26,mov:15,des: 1,tp1:"t1",tp2:"t4"},"騎馬鉄砲":{off:26,def:18,mov:21,des:1,tp1:"t2",tp2:"t4"},
                "雑賀衆"  :{off:23,def:27,mov:18,des: 5,tp1:"t1",tp2:"t4"}
        };
        var rank={sss:1.20,ss:1.15,s:1.10,a:1.05,b:1,c:0.95,d:0.9,e:0.85,f:0.80};

        var attack_power = 0, defense_power = 0, destruct_power = 0 ;
        var movements = [];
        $.each([1,2,3,4,5],function(idx, val){
            $('div[id^="ig_decksection"] #id_deck_card'+val+'_front .parameta_area').each(function(){
                var $this = $(this);
                var stats_att = parseFloat( $this.children('.ig_card_status_att').text() );
                var stats_def = parseFloat( $this.children('.ig_card_status_def').text() );
                var stats_int = parseFloat( $this.children('.ig_card_status_int').text() );
                var sol_no    = parseFloat( $this.find('.commandsol_no span[id^="card_commandsol_cnt_"]').text() );
                var sol_type  = $this.children('.ig_card_cardno + span[id^="card_commandsol_"]').attr('class');
                sol_type = sol_type.replace(/^commandsol_/,'');
                sol_type = unitKey[sol_type];
                var power_seeds = { attack: stats_att, defence: stats_def, interi: stats_int, sol_type: sol_type, sol_no: sol_no };
                var rate = {};
                rate.t1 = rank[ $this.children('.yari').attr('class').replace(/^yari lv_/,"")  ];
                rate.t2 = rank[ $this.children('.kiba').attr('class').replace(/^kiba lv_/,"")  ];
                rate.t3 = rank[ $this.children('.yumi').attr('class').replace(/^yumi lv_/,"")  ];
                rate.t4 = rank[ $this.children('.heiki').attr('class').replace(/^heiki lv_/,"") ];
                var unit_data = UnitData[sol_type];
                var commandRate = ( rate[ unit_data.tp1 ] + rate[ unit_data.tp2 ] ) / 2;
                attack_power  += ( unit_data.off * sol_no + stats_att ) * commandRate ;
                defense_power += ( unit_data.def * sol_no + stats_def ) * commandRate ;
                destruct_power+= ( unit_data.des * sol_no ) ;
                movements.push( unit_data.mov );
                //console.log( '#'+val +', '+  'R:'+commandRate +', '+  '兵:'+sol_no+'(x'+unit_data.off+'/'+unit_data.def+')' +', '+  '将:'+stats_att+'/'+stats_def );
            });
        });

        var movement = Math.min.apply( undefined, movements );

        attack_power  = Math.floor(attack_power );
        defense_power = Math.floor(defense_power);
        var sec_per_sq = ( 3600 / movement );
        var sps_sec = sec_per_sq % 60 ;
        var sps_min = Math.floor( sec_per_sq / 60 );

        var panel = $('#ig_bg_decksection1right #ig_deckunitdetail');
        $('<div style="color:white;">').append('<strong>攻撃：'+ attack_power  +'</strong>').appendTo( panel );
        $('<div style="color:white;">').append('<strong>防御：'+ defense_power +'</strong>').appendTo( panel );
        $('<div style="color:white;">').append('<strong>破壊：'+ destruct_power+'</strong>').appendTo( panel );
        $('<div style="color:white;">').append('<strong>移動：'+ movement + '</strong> （'+ sps_min + '分' + Math.floor(sps_sec) +'秒/<small>マス</small>）').appendTo( panel );
        //console.log( attack_power );

    }

    // add end

    // JSON関連
    // jquey.json-2.2.jsから。MITライセンスに基づき著作権表示を記載します。
    /*
     * jQuery JSON Plugin
     * version: 2.1 (2009-08-14)
     *
     * This document is licensed as free software under the terms of the
     * MIT License: http://www.opensource.org/licenses/mit-license.php
     *
     * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org
     * website's http://www.json.org/json2.js, which proclaims:
     * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
     * I uphold.
     *
     * It is also influenced heavily by MochiKit's serializeJSON, which is
     * copyrighted 2005 by Bob Ippolito.
     */
    var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    var _meta = {'\b': '\\b','\t': '\\t','\n': '\\n','\f': '\\f','\r': '\\r','"' : '\\"','\\': '\\\\'};

    function toJSON(o) {
        if (typeof(JSON) == 'object' && JSON.stringify)return JSON.stringify(o);
        var type = typeof(o);
        if (o === null)return "null";
        if (type == "undefined")return undefined;
        if (type == "number" || type == "boolean")return o + "";
        if (type == "string")return quoteString(o);
        if (type == 'object'){
            if (typeof o.toJSON == "function") return toJSON( o.toJSON() );
            if (o.constructor === Date){
                var month = o.getUTCMonth() + 1;
                if (month < 10) month = '0' + month;
                var day = o.getUTCDate();
                if (day < 10) day = '0' + day;
                var year = o.getUTCFullYear();
                var hours = o.getUTCHours();
                if (hours < 10) hours = '0' + hours;
                var minutes = o.getUTCMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                var seconds = o.getUTCSeconds();
                if (seconds < 10) seconds = '0' + seconds;
                var milli = o.getUTCMilliseconds();
                if (milli < 100) milli = '0' + milli;
                if (milli < 10) milli = '0' + milli;
                return '"' + year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + '.' + milli + 'Z"';
            }
            if (o.constructor === Array) {
                var ret = [];
                for (var i = 0; i < o.length; i++)ret.push( toJSON(o[i]) || "null" );
                return "[" + ret.join(",") + "]";
            }
            var pairs = [];
            for (var k in o) {
                var name;
                var type = typeof k;
                if (type == "number") name = '"' + k + '"';
                else if (type == "string") name = quoteString(k);
                else continue;  //skip non-string or number keys
                if (typeof o[k] == "function") continue;
                var val = toJSON(o[k]);
                pairs.push(name + ":" + val);
            }
            return "{" + pairs.join(", ") + "}";
        }
    };

    function secureEvalJSON(src) {
        if (typeof(JSON) == 'object' && JSON.parse) return JSON.parse(src);
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');

        if (/^[\],:{}\s]*$/.test(filtered)) return eval("(" + src + ")");
        else throw new SyntaxError("Error parsing JSON, source is not valid.");
    };

    function quoteString(string) {
        if (string.match(_escapeable)){
            return '"' + string.replace(_escapeable, function (a) {
                var c = _meta[a];
                if (typeof c === 'string') return c;
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };

    /**
     * Cookie plugin
     *
     * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
     * Dual licensed under the MIT and GPL licenses:
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.gnu.org/licenses/gpl.html
     *
     */
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function getUnixTime() {
        return ~~(new Date/1000);
    }
    function formatTime(sec) {
        var h = Math.floor(sec / 3600);
        var m = Math.floor((sec - h*3600 ) / 60 );
        var s = Math.floor(sec - h*3600 - m*60 );
        var tim = h + ":" +
        (m+100).toString().substr(-2)  + ":" +
        (s+100).toString().substr(-2);
        return tim;
    }
    function ArraytoJSON(src) {
        var tmp = '';
        for(var i=0;i<src.length;++i) {
            if (tmp!='') tmp += ',';
            tmp += '"'+src[i].replace('"', '\"')+'"';
        }
        return '['+tmp+']';
    }
}

// load jQuery and execute the main function
//window.addEventListener("load", Moko_addJQuery(Moko_main), false);
Moko_addJQuery(Moko_main);