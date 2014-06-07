// ==UserScript==
// @name           privatemsg batch manage
// @namespace      fanfou
// @include        http://fanfou.com/privatemsg
// @include        http://fanfou.com/privatemsg/*
// ==/UserScript==

function $q(sel) { return document.querySelector(sel); }
function $qa(sel) { return document.querySelectorAll(sel); }
function $c(tagname) { return document.createElement(tagname); }

var style = "\
#stream>ol>li { \
    position: relative; \
} \
#stream>ol>li>input[type=checkbox] { \
    position: absolute; \
    right: 5px; bottom: 5px; \
} \
#main>.tabs>.batch-manage { \
    position: absolute; \
    right: 5px; \
    bottom: 5px; \
} \
#main>.tabs>.batch-manage>input { \
    margin-left: 5px; \
} \
";
var $style = $c("style");
$style.innerHTML = style;
$q('head').appendChild($style);

var $ol = $q("#stream>ol");
var $msgs = $qa("#stream>ol>li");
var $chks = [];
for (var i = 0; i < $msgs.length; ++i) {
    var $msg = $msgs[i];
    var $box = $c("input");
    $box.type = "checkbox";
    $box.className = "batch-manage";
    var msgid = $msg.querySelector(".op>a").href.split('/').pop();
    $box.setAttribute("msgid", msgid);
    $msg.appendChild($box);
    $chks.push($box);
}

var $manage = $c("div");
$manage.className = "batch-manage";

var $del = $c("a");
$del.innerHTML = "删除选定";
$del.className = "delete";
$del.href = "#";
$del.addEventListener("click", function(evt) {
    evt.preventDefault();
    var to_del = [];
    for (var i = 0; i < $chks.length; ++i) {
        if ($chks[i].checked)
            to_del.push($chks[i]);
    }
    if (! to_del) return;
    if (! confirm("确定要删除选定的" + to_del.length + "条私信吗？"))
        return;
    
    for (var i = 0; i < to_del.length; ++i) {
        var $item = to_del[i];
        var $par = $item.parentNode;
        var $del = $par.querySelector(".op>.delete");
        var msgid = $item.getAttribute("msgid");
        var token = $del.getAttribute("token");
        /*
        var arr = {
            action: "privatemsg.del",
            privatemsg: msgid,
            token: token,
            ajax: "yes"
        };
        */
        var data = "action=privatemsg.del&" + 
                   "privatemsg=" + encodeURIComponent(msgid) + "&" +
                   "token=" + encodeURIComponent(token) + "&" +
                   "ajax=yes";
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (function($item) {
            return function() {
                if (this.readyState != 4) return;
                if (this.status != 200) return;
                var res = JSON.parse(this.responseText);
                if (res.status) {
                    $ol.removeChild($item);
                } else {
                    alert(res.msg);
                }
            };
        })($par);
        xhr.open("POST", location.href);
        xhr.setRequestHeader("Content-Type",
                             "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send(data);
    }
}, false);
$manage.appendChild($del);

var $all = $c("input");
$all.type = "checkbox";
$all.addEventListener("change", function(evt) {
    for (var i = 0; i < $chks.length; ++i)
        $chks[i].checked = this.checked;
}, false);
$manage.appendChild($all);

$q("#main>.tabs").appendChild($manage);

$q("#stream>ol").addEventListener("change", function(evt) {
    var $target = evt.target;
    if (! $target.checked)
        $all.checked = false;
}, true);