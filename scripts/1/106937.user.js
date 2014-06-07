// ==UserScript==
// @name       renren_friend_lost
// @namespace  renren_friend_lost
// @version    v1.0
/* @reason
 * 在用戶的人人好友與他解除好友關係時通知他
 * @end
 */
// @match     http://www.renren.com/*
// @author    wonderfuly@gmail.com
// @blog      wong2.cn
//
// ==/UserScript==

function getLostItemsByProperty(list_a, list_b, property){
    var cache = {},
        losts = [];
    for(var i=list_b.length; i--; ){
        var item = list_b[i];
        cache[item[property]] = 0;
    }
    for(var j=list_a.length; j--; ){
        var item = list_a[j];
        if(! cache.hasOwnProperty(item[property])){
            losts.push(item);
        }
    }
    return losts;
}

function getLostFriends(new_list){
    var old_list_str = localStorage.old_list_str;
    console.log(old_list_str);
    if(old_list_str){
        var old_list = JSON.parse(old_list_str);
        var lost_friends = getLostItemsByProperty(old_list, new_list, "id");
        //if(lost_friends){
            console.log(lost_friends);
        //}
    }
    localStorage.old_list_str = JSON.stringify(new_list);
}

function main(){
    console.log("Sending request...");
    var url = "http://friend.renren.com/friendsSelector.do?p="
    + "{%22init%22%3Afalse%2C%22qkey%22%3A%22friend%22%2C%22uid%22%3Atrue%2C%22uname%22%3Atrue%2C%22uhead%22%3Atrue%2C"
    + "%22limit%22%3A24%2C%22param%22%3A{}%2C%22query%22%3A%22%22%2C%22group%22%3A%22%22%2C%22net%22%3A%22%22%2C%22page"
    + "%22%3A%22false%22}";
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(responseDetails) {
            var friends = JSON.parse(responseDetails["responseText"])["candidate"];
            console.log(friends);
            getLostFriends(friends);
        },
        onerror: function(a){
             console.log(a);
        }
    });
}

var last_check_time = parseInt(localStorage.last_check_time),
    new_time = (new Date).getTime();
//if(isNaN(last_check_time) || (new_time-last_check_time)/3600000 >= 0){
    localStorage.last_check_time = new_time;
    main();
//}
