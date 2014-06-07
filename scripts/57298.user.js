// ==UserScript==
// @name           GetPlurkUsersFriendList
// @namespace      www.plurk.com
// @description    This can get Plurk Page User's Friend/Fans/Following List
// @include        http://www.plurk.com/*
// @version        0.3
// ==/UserScript==
// 這是個非常簡單的DEMO,沒有太多判斷及頁面處理,
// 只是為了用以展示PLURK的相關個人交友訊息資料有多麼的公開
// 安裝後,在PLURK登入狀態下進入到想查詢USER的PLURK頁面,
// 不管他的河道是公開還是隱藏,也不管是否利用CSS將好友/粉絲區塊移除隱藏.
// 只要點擊河道左上方"My Friends(我的朋友)",
// 就會在畫面中跳出交友狀態視窗,第一個頁面出現的內容是自己帳號的好友,
// 不過當再次切換"Friends(朋友)"標籤下的頁面標籤就會看到結果
// "Mutual Friends(互為好友)"        =>顯示當前頁面USER的所有好友
// "People I Follow(我追蹤的使用者)"  =>顯示當前頁面USER的所有追蹤帳號
// "My fans(我的粉絲)"               =>顯示當前頁面USER的所有粉絲


if(document.getElementById('top_login')){ 
    GM_setValue('UUID',unsafeWindow.GLOBAL.page_user.uid);	
    GM_setValue('FANSNUM',unsafeWindow.GLOBAL.page_user.num_of_fans);
    GM_setValue('FRIENDSNUM',unsafeWindow.GLOBAL.page_user.num_of_friends);
}
unsafeWindow.friend_list.user_id= GM_getValue('UUID','');
unsafeWindow.fan_list.user_id= GM_getValue('UUID','');
unsafeWindow.following_list.user_id= GM_getValue('UUID','');
unsafeWindow.friend_list.item_count = GM_getValue('FRIENDSNUM','');
unsafeWindow.fan_list.item_count = GM_getValue('FANSNUM','');
unsafeWindow.following_list.item_count = 100000;