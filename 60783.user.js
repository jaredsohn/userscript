// ==UserScript==
// @name              我说其实真的可以说很长很长
// @namespace         http://www.douban.com/people/3928484/
// @description       我说连发
// @include           www.douban.com/*
// @author            matt
// @version           1.0
// ==/UserScript==
$('input[name=mb_submit]').after("<input id =\"longlongsay\"type ='button' value=\"我说其实真的可以说很长，点起来也方便了\">")
var content;
var len, len2;
var ck = getCK();
$('#longlongsay').click(function(){
    content = $('textarea[name=mb_text]').attr("value")
    len2 = Math.ceil(content.length / 123);
    len = len2;
    if (content.length > 123 * 9) {
        alert("so long !!! sorry");
    }
    else 
        if (content.length <= 128) {
           $('#mbform').submit()
        }
        else {
            say();
        }
})

function say(){
    if (len == 0) {
        location.reload()
        return;
    }
    var sendstr = "[" + len + "/" + len2 + "]" + content.substring((len - 1) * 123, (len--) * 123)
    $.post("http://www.douban.com/contacts/", {
        ck: ck,
        mb_text: sendstr,
        mb_submit: "我说"
    }, function(h){
        alert(sendstr);
        say();
    })
}

function getCK(){
    return $('#status a[href^=/logout?ck=]').attr('href').substring(11, 15);
}