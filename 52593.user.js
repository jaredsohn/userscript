// ==UserScript==
// @name            WassrUserFriendsEraser
// @namespace       http://rilakkuma.moe.hm/
// @description     購読中のユーザーリストを消す
// @include         http://wassr.jp/my/
// @author          betoneto http://wassr.jp/user/betoneto
// @version         0.1
// ==/UserScript==

// ksrのWassrWatchListの補助。WassrWatchListより先に動作させること。

function Erase(){
    var userFriends = document.getElementById("User-Friends");
    userFriends.innerHTML = '';
}

Erase();

