// ==UserScript==
// @name           pixiv tag collector
// @namespace      http://wazly.blog87.fc2.com/
// @version        1.2.3
// @description    pixivのタグ巡りを快適に Easy browsing with your favorite tags on pixiv.
// @include        http://www.pixiv.net/*
// @require        https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// ==/UserScript==

/*
GM_config
    Copyright 2009-2013, GM_config Contributors All rights reserved.

pixiv tag collector
    Copyright (c) 2014 Wazly
    Released under the MIT License.
    http://opensource.org/licenses/mit-license.php
*/

(function($){
function optWin() {
    GM_config.open();
}
GM_config.init('pixiv tag collector の設定', {
    'pixivCompleteTags': {
        'section': ['登録タグ　<span style="color:#FFFCEB">左</span>：完全一致検索用　<span style="color:#FFF5EE">右</span>：部分一致/AND/OR/マイナス検索用'],
        'label': '',
        'type': 'textarea',
        cols: 60,
        rows: 20,
        'default': ''
    },
    'pixivPartialTags': {
        'label': '',
        'type': 'textarea',
        cols: 60,
        rows: 20,
        'default': ''
    },
    'pixivHideCompleteTags': {
        'label': '・完全一致タグリストを表示しない',
        'type': 'checkbox',
        'default': false
    },
    'pixivHidePartialTags': {
        'label': '・部分一致タグリストを表示しない',
        'type': 'checkbox',
        'default': false
    },
    'pixivApplyToAll': {
        'label': '・pixiv内のあらゆるページにタグリストを表示する',
        'type': 'checkbox',
        'default': false
    },
    'pixivMouseover': {
        'label': '・折りたたみ式にし、マウスオーバーで展開する',
        'type': 'checkbox',
        'default': false
    },
    'pixivOpenInNewTab': {
        'label': '・個別イラストページへのリンクは常に新しいタブで開く',
        'type': 'checkbox',
        'default': false
    },
    'pixivReloadPage': {
        'label': '・このダイアログを閉じたとき、ページを再読み込みする（新しい設定をすぐに反映させる）',
        'type': 'checkbox',
        'default': false
    }
},
"#GM_config_field_pixivCompleteTags{ float: left; width: 50%; }" +
"#GM_config_field_pixivPartialTags{ width: 50%; }" +
".config_var{ font-size:14px !important; font-weight: normal !important; margin:auto !important; }" +
"textarea{ font-size:12px !important; line-height: 1.4 !important }" +
"textarea#GM_config_field_pixivCompleteTags:hover, textarea#GM_config_field_pixivCompleteTags:focus{ background: #FFFCEB !important }" +
"textarea#GM_config_field_pixivPartialTags:hover, textarea#GM_config_field_pixivPartialTags:focus{ background: #FFF5EE !important }", {
    open: function(){
    },
    save: function(){
		
		var pattern = /(-{2,})+(\d{1,})$/;
    
        GM_config.set("pixivCompleteTags", GM_config.get("pixivCompleteTags").replace(/\n{2,}/g, '\n'));
        GM_config.set("pixivCompleteTags", GM_config.get("pixivCompleteTags").replace(/[ 　]|^\n|\n$/g, ''));
        GM_config.set("pixivPartialTags", GM_config.get("pixivPartialTags").replace(/[ 　]{1,}/g, ' '));
        GM_config.set("pixivPartialTags", GM_config.get("pixivPartialTags").replace(/\n{2,}/g, '\n'));
        GM_config.set("pixivPartialTags", GM_config.get("pixivPartialTags").replace(/^\n|\n$/g, ''));
        
        var pixivPartialTags = GM_config.get("pixivPartialTags").split('\n');
        var pixivCompleteTags = GM_config.get("pixivCompleteTags").split('\n');
        var tmpNode1 = document.createDocumentFragment();
        var tmpNode2 = document.createDocumentFragment();
        var newDivNode1 = document.createElement('div');
        var newDivNode2 = document.createElement('div');
        var newDivNode3 = document.createElement('div');
        var newSpanNode1 = document.createElement('span');
        var newSpanNode2 = document.createElement('span');
        newDivNode1.className = 'pixiv_tag_collector partial';
        newDivNode2.className = 'pixiv_tag_collector complete';
        newSpanNode1.className = 'mouse_event';
        newSpanNode2.className = 'mouse_event';
        if (GM_config.get("pixivMouseover")) {
            newSpanNode1.style.display = 'none';
            newSpanNode2.style.display = 'none';
        }
        
        for (var i = 0; i < pixivCompleteTags.length; i++) {
            var newANode = document.createElement('a');
            newANode.href = 'http://www.pixiv.net/search.php?s_mode=s_tag_full&word=' + encodeURIComponent(pixivCompleteTags[i]);
            newANode.appendChild(document.createTextNode(pixivCompleteTags[i]));
            tmpNode2.appendChild(newANode);
        }
        
        newSpanNode2.appendChild(tmpNode2);
        newDivNode2.appendChild(newSpanNode2);
        
        for (var i = 0; i < pixivPartialTags.length; i++) {
            var newANode = document.createElement('a');
            newANode.href = 'http://www.pixiv.net/search.php?word=' + encodeURIComponent(pixivPartialTags[i]).replace(/%20/g, '+').replace(pattern, '').replace(/[+-]$/,'') + '&s_mode=s_tag';
			if (pixivPartialTags[i].match(pattern)) {
				newANode.appendChild(document.createTextNode('【' + ((RegExp.$2 < pixivPartialTags[i].length - RegExp.lastMatch.length　+ 1) ? pixivPartialTags[i].slice(0, RegExp.$2) + '...】' : pixivPartialTags[i].slice(0, - RegExp.lastMatch.length - 1) + '】')));
			}
			else {
            	newANode.appendChild(document.createTextNode('【' + pixivPartialTags[i] + '】'));
			}
            tmpNode1.appendChild(newANode);
        }
        
        newSpanNode1.appendChild(tmpNode1);
        newDivNode1.appendChild(newSpanNode1);
        
        newDivNode3.appendChild(newDivNode2);
        newDivNode3.appendChild(newDivNode1);
        
        GM_setValue("pixivTagCollectorDom", newDivNode3.innerHTML);
        GM_setValue("pixivTagListDisplay", "block");
        
        if (GM_config.get("pixivReloadPage")) {
            location.reload();
        }
    }
});
GM_registerMenuCommand('pixiv tag collector', optWin);
GM_addStyle('#GM_config{ opacity: 0.8 !important; border: none !important; -moz-box-shadow: 0 0 10px rgb(0,0,0) !important;}' +
'#GM_config:hover{ opacity: 1 !important; }' +
'.complete{ border: 1px solid #B7B7B7; -moz-border-radius: 4px; background-color: #FFFCEB; padding: 4px; margin-bottom: 12px; }' +
'.partial{ border: 1px solid #B7B7B7; -moz-border-radius: 4px; background-color: #FFF5EE; padding: 4px; margin-bottom: 12px; }' +
'.pixiv_tag_collector a{margin: 0 12px 4px 0; white-space: nowrap; color: #258FB8 !important;}' +
'.pixiv_tag_collector a:hover{background-color: transparent !important;}');
if (GM_config.get("pixivHideCompleteTags")) {
    GM_addStyle('.complete{ display: none !important; }');
}
if (GM_config.get("pixivHidePartialTags")) {
    GM_addStyle('.partial{ display: none !important; }');
}


document.addEventListener("keydown", function(e){
    if (e.ctrlKey && e.keyCode == 81) {
        if ($('.tag_lists:first').css('display') == 'none') {
			$('.tag_lists').css('display', 'block');
            GM_setValue("pixivTagListDisplay", "block");
        }
        else {
			$('.tag_lists').css('display', 'none');
            GM_setValue("pixivTagListDisplay", "none");
        }
    }
}, true);

function addCollectedPixivTags(node){
    function createToAdd(targetNode){
        /*insert tag lists*/
        var newDivNode = document.createElement('div');
        newDivNode.className = 'tag_lists';
        newDivNode.style.display = GM_getValue("pixivTagListDisplay");
        newDivNode.style.overflow = 'hidden';
        newDivNode.innerHTML = GM_getValue('pixivTagCollectorDom');
        targetNode.snapshotItem(0).parentNode.insertBefore(newDivNode, targetNode.snapshotItem(0));
		$reg = $('<a/>',{
			'href': 'javascript:void(0)',
			'text': '[[タグリスト編集]]'
			}
		);
		$reg.clone().bind('click', function(){GM_config.open();}).appendTo('div.complete:last > span');
		$reg.clone().bind('click', function(){GM_config.open();}).appendTo('div.partial:last > span');
        
        if (GM_config.get("pixivMouseover")) {
            newDivNode.style.width = '10%';
            newDivNode.style.margin = '0 20px 0 20px';
            var tagLists = node.getElementsByClassName('tag_lists').item(0);
            tagLists.addEventListener("mouseover", function(){
                GM_addStyle('.mouse_event: display inline;')
                node.getElementsByClassName('mouse_event').item(0).style.display = 'inline';
                node.getElementsByClassName('mouse_event').item(1).style.display = 'inline';
                tagLists.style.width = '';
                tagLists.style.margin = '0 20px 0 20px';
            }, true);
            tagLists.addEventListener("mouseout", function(){
                node.getElementsByClassName('mouse_event').item(0).style.display = 'none';
                node.getElementsByClassName('mouse_event').item(1).style.display = 'none';
                tagLists.style.width = '10%';
            }, true);
        }
    }
    
    var xpath;
    var targetNode;
    
	xpath = (node == document) ? './/section[@class="column-search-result"]' : './/li[contains(concat(" ",normalize-space(@class)," "), " image ")]';
    targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (targetNode.snapshotLength > 0) {
        createToAdd(targetNode);
    }
    else 
        if (GM_config.get("pixivApplyToAll")) {
            xpath = './/div[contains(concat(" ",normalize-space(@class)," "), " contents-east ")]';
            targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (targetNode.snapshotLength > 0) {
                createToAdd(targetNode);
            }
            else {
                xpath = './/div[contains(concat(" ",normalize-space(@class)," "), " work-detail-unit ")]';
                targetNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                if (targetNode.snapshotLength > 0) {
                    createToAdd(targetNode);
                }
            }
        }
    
    if (GM_config.get("pixivOpenInNewTab")) {
        xpath = './/a[contains(@href, "member_illust.php?mode=medium")]'
        toMediumNode = document.evaluate(xpath, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (toMediumNode.snapshotLength > 0) {
            for (var i = 0; i < toMediumNode.snapshotLength; i++) {
                toMediumNode.snapshotItem(i).target = "_blank";
            }
        }
    }
}

/*AutoPagerize*/
document.addEventListener('GM_AutoPagerizeNextPageLoaded', function(e){
	unsafeWindow.pixiv.scrollView.add('.ui-scroll-view', e.target);
},false);
document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(e){
    addCollectedPixivTags(e.target);
}, false);

addCollectedPixivTags(document);
})(unsafeWindow.jQuery);