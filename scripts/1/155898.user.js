// ==UserScript==
// @name        taobao batch rater
// @namespace   geogeo.github.com
// @description taobao batch rater
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @include     http://rate.taobao.com/remark_buyer*
// @require     http://code.jquery.com/jquery-1.8.3.min.js
// @require     http://getbootstrap.com/2.3.2/assets/js/bootstrap.min.js
// @resource    css https://raw.github.com/geogeo/TBBR/master/tbbr.css
// @version     1.3
// ==/UserScript==

var css = GM_getResourceText('css');
GM_addStyle(css);
$('<div></div>').html('<div class="modal tbbr  in" style="left:auto;right:3px;width:300px;opacity:0.95"> <div class="modal-header"> <h3 id="myModalLabel">批量评价</h3> </div> <div class="modal-body"> <form id="bulkrate">   <fieldset>     <textarea id="rate-msg" placeholder="Type something…"></textarea>     <span class="help-block"></span>    </fieldset> </form> </div> <div class="modal-footer">  <a class="btn btn-primary" id="tbbr-submit">提交</a>     <a href="#settings" class="btn" data-toggle="modal">设置</a> </div> </div>    <div id="settings" class="modal hide fade tbbr" tabindex="-1" role="dialog"> <div class="modal-header"> <h3 id="myModalLabel">设置</h3> </div> <div class="modal-body"> <textarea id="default-msg" placeholder="默认评价"></textarea> </div> <div class="modal-footer"> <button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button> <button id="save-default-msg" class="btn btn-primary" data-dismiss="modal" aria-hidden="true">保存</button> </div> </div> ').appendTo($('body'));
console.log('ok');
function updateComments(va){
  console.log('update comment')
  $('.rate-msg').each(function(){
        $(this).val(va);
    });
}
$rateMsg = $('#rate-msg');

$defaultMsg = $("#default-msg");

$("#save-default-msg").click(function(){
  msg=$defaultMsg.val();
  localStorage.setItem('defaultMsg',msg);
  $rateMsg.val(msg);
  $rateMsg.change();
  console.log('msg saved',msg);
})

$("#tbbr-submit").click(function(){
    $("form .submit").click();
})



$rateMsg.bind("change keyup paste",function(){
    var value = $(this).val()
    updateComments(value);
})
if (msg = localStorage.getItem('defaultMsg')){
  console.log('get msg',msg);
  $rateMsg.val(msg);
  $rateMsg.change();
  $defaultMsg.val(msg);
  console.log('init msg',msg);
}
$('#rate-good-all').click()

// $('#rate-all').change(function(){
//     rateAll.attr('checked',this.checked);
// })
