// ==UserScript==
// @name           Resident Evil.NET 中文化
// @namespace      http://snake570.pixnet.net
// @description    瀏覽 RESIDENT EVIL.NET 時，將大部分英文資料繁體中文化！
// @include        http://www.residentevil.net/*
// @include        https://www.residentevil.net/*
// @include		   http://account.capcom.com/*
// @include		   https://account.capcom.com/*
// @exclude        http://userscripts.org/scripts/review/*
// @exclude		   https://account.capcom.com/sc/terms_of_service.html
// @exclude		   http://account.capcom.com/sc/terms_of_service.html
// @copyright      JoeSimmons
// @version        121015v2
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=41369
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
//範例：'被替換的字' : '要顯示的字',
//【主選單翻譯】

'Stats And Configurations' : '統計和配置', 
'Videos' : '視頻',
'Users' : '用戶',
'Groups' : '群組',
'Advertisement' : '廣告',
'Templates And Players' : '模板和播放器',
'Plugin Manager' : '插件管理器',
'Tool Box' : '工具箱',
'Collections' : '收藏',
'Photos' : '照片',


//【子選單翻譯tats And Configurations】

'Reports & Stats' : '報告&統計',
'Website Configurations' : '網站配置',
'Email Settings' : 'Email 設定',
'Language Settings' : '語言設定',
'Add New Phrases' : '增新短語',
'Manage Pages' : '管理頁面',
'Manage Comments' : '管理評論',










//【子選單翻譯Videos】

'Videos Manager' : '視頻管理',
'Manage Categories' : '管理類別',
'List Flagged Videos' : '列出標記的影片',
'Upload Videos' : '上傳視頻',
'List Inactive Videos' : '列出無效視頻',

//【子選單翻譯Users】

'Manage Members' : '管理成員',
'Add Member' : '增加成員',
'Manage categories' : '管理類別',
'Search Members' : '用戶級別',
'Search Members' : '搜尋成員',
'Inactive Only' : '無效唯一',
'Active Only' : '有效唯一',
'Reported Users' : '用戶報告',
'Mass Email' : '群發郵件',

//【子選單翻譯Groups】

'Add Group' : '增加群組',
'Manage Groups' : '管理群組',
'Manage Categories' : '管理類別',
'View Inactive Groups' : '查看無效群組',
'View Reported Groups' : '查看群組報告',

//【子選單翻譯Advertisement】
'Manage Advertisments' : '管理廣告',
'Manage Placements' : '管理展示位置',

//【子選單翻譯Templates And Players】

'Templates Manager' : '管理板模',
'Templates Editor' : '編輯板模',
'Players Manager' : '管理播放器',
'Player Settings' : '播放器設定',

//【子選單翻譯Plugin Manager】

//'Plugin Manager' : '群發郵件',




//【子選單翻譯Tool Box】

'PHP Info' : 'PHP 資訊',
'View online users' : '查看在線用戶',
'Server Modules Info' : '服務模組訊息',
'Conversion Queue Manager' : '轉換佇列管理',
'ReIndexer' : '重整索引',
'Conversion Lab α' : '轉換實驗',
'Repair video duration' : '維修視屏持續時間',
'Maintenance' : '維護保養',

//【子選單翻譯Collections】

'Manage Collections' : '收藏管理',
'Manage Categories' : '管理類別',
'Flagged Collections': '標記集合',

//【子選單翻譯Photos】

'Photo Manager': '照片管理',
'Flagged Photos': '照片標記',
'Orphan Photos': '群發郵件',
'Photo Settings': '照片設定',
'Watermark Settings': '浮水印設置',
'Recreate Thumbs': '重建相片',

//【子頁面翻譯】

'Members': '會員',
'Active ': '啟用',
//'Flagged: '標記',
'Processing': '處理',



};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}

$('#domain').change(function() {

    if (!this.sendToServer) { // some expando property I made up
    	var that = this;
    	this.sendToServer = setTimeout(function(that) {
    		// use "that" as a reference to your element that fired the onchange.
    		// Do your AJAX call here
    		that.sendToServer = undefined;
    	}, yourTimeoutTimeInMillis)
    }
    else {
    	clearTimeout(this.sendToServer);
    }
});
