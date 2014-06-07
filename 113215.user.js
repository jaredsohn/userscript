// ==UserScript==
// @author         http://weibo.com/pipashu
// @version        0.1
// @name           weibo friends group helper
// @namespace      www.weibo.com
// @include        http://weibo.com/attention/*
// @require		   http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

//------------------------------------------------------------------------------
// 	Comments
//------------------------------------------------------------------------------
//  0.1           init
//------------------------------------------------------------------------------


var divIn, toid, fromid, ver, id_list='';
var succ = 0;
ver = "0.1";

var group_list = document.getElementById('group_list');
fromid = group_list.innerHTML.match(/.+uid=(.+)&.+/)[1];

allfriends = document.evaluate(
	"//li[@class='MIB_linedot_l']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);    

document.addEventListener('click', function(event) {
    if(event.target.id.match('fid_cancel_')) {
        toid = event.target.id.match(/fid_cancel_(.+)/)[1];
        toid = toid.split(',')
        
        for (idx in toid) {
            var request = new XMLHttpRequest();
            request.open('POST', 'http://weibo.com/attention/aj_delfollow.php?rnd=' + Math.random(), false);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.onreadystatechange = function()
            {
                if(request.readyState == 4 && request.status == 200){
                    succ++;
                    var click_div = document.getElementById('fid_cancel_' + toid);
                    click_div.innerHTML = '已经取消'+ succ +'个关注';
                }
            };
            formData = 'touid='+ toid[idx] +'&fromuid=' + fromid ;
            request.send(formData);
        }
        window.location.reload();
        return;
        
    }
}, true);

for (var i = 0; i < allfriends.snapshotLength; i++) {
	thisf = allfriends.snapshotItem(i);	
    id_list += thisf.id + ',';
}

var divIn = document.createElement("div");
divIn.innerHTML = '<div id="fid_cancel_' + id_list + '" style="background-color: #6EAFD5; color: #333333; text-align:center" >点击取消本页所有关注***注意：如果改变了下面用户的分组，请刷新后再点击***</div>';
var list = document.getElementById('att_wrap');
list.parentNode.insertBefore(divIn, list);
