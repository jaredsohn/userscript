// ==UserScript==
// @name           pepsijdf
// @namespace      tmall
// @version      2012092301
// @include        http://www.pepsitmall.com/utc/product/l_dream002/detail.htm*
// ==/UserScript==
var $ = unsafeWindow.jQuery;

//先检查登录状态
$.getJSON('http://www.pepsitmall.com/utc/validateLogin.json?time=' + new Date().getTime(), function(json){
  if (undefined != json.isLogin) {
    alert("\u8BF7\u5148\u767B\u5F55!");
  } else {
    $("#isSellFast").val(1);
    
    //调整浮框位置,便于输入
    $('#confirmdialog').css('left', 0).css('top', 0).css('z-index', 100000);
    $("#validateCodeDialog").overlay();
    $("#validateCodeDialog").overlay().load();
    $('#validateCodeDialog').css('left', -150).css('top', -70).css('z-index', 100000);
    $('#validateCode').wrap('<div/>');
    //$("#validateCode").attr("src", 'http://www.pepsitmall.com/utc/getValidateCodePic.htm?productCode='+ $("#productCode").val() + '&a=' + new Date());

    //放大输入框
    $('#checkCode').css('height', '25px');

    //初始化提示信息
    $('#btnExchangeProduct').parent().prepend('<div>\u5269\u4f59\u6570\u91cf:<div id="numberCount"></div></div><div id="botText"></div><br/>');
    $('#botText').text('\u62A2\u8D2D\u8FD8\u672A\u5F00\u59CB,\u8BF7\u8010\u5FC3\u7B49\u5F85');
    $('#btnExchangeProduct').val($('#btnExchangeProduct').val() + '(\u811A\u672C\u4F1A\u81EA\u52A8\u6309\u4E0B)');
    
    //打开页面后开始轮询剩余数量
    gameiid = setInterval(function(){
        if (autoCheckCount) {
            checkProductCount();
        }
    }, 1000);
    
    //输入满4位验证码后自动提交
    $('#checkCode').keyup(function(e){
      if ($(this).val().length >= 4) {
          if (debug == 0) {
              $('#btnExchangeProduct')[0].click();
          } else {
            submitPurchase();
          }
      } else {
          if ($(this).val().length == 0 && e.keyCode == 8 && debug == 1) {
              // refresh code
              refreshValidateCode();
          }
      }
    });


    $('#btnExchangeProduct').parent().append('<input type="button" id="autoCheckButton" value="Check/ON" style="width:60px;"/>');
    $('#btnExchangeProduct').parent().append('<input type="button" id="debugButton" value="Genius/OFF" style="width:65px;"/>');
    $('#autoCheckButton').click(function(){
        if ($(this).val() == 'Check/ON') {
            autoCheckCount = false;
            $(this).val('Check/OFF');
        } else {
            autoCheckCount = true;
            $(this).val('Check/ON');
        }
    });
      $('#debugButton').click(function(){
          if ($(this).val() == 'Genius/OFF') {
              debug = 1;
              $(this).val('Genius/ON');
          } else {
              debug = 0;
              $(this).val('Genius/OFF');
          }
      });

  }
});

var gameiid = undefined;
var gameStarted = false;
var validateCodeAutoRefreshed = false;
var debug = 0;
var autoCheckCount = true;

function checkProductCount() {
  $.getJSON('http://www.pepsitmall.com/utc/product/1807/l_dream002/getInventory.json', function(json){
    $('#numberCount').text(json.inventory);
    if (json.inventory > 0) {
      gameStarted = true;
      $('#productInventory').text(json.inventory);
      //clearInterval(gameiid);
    } else {
        gameStarted = false;
        //将剩余数量设置为一个不为0的虚拟值
        $('#productInventory').text('999');
    }
    if (gameStarted && !validateCodeAutoRefreshed) {
      //抢购开始, 刷新验证码
      validateCodeAutoRefreshed = true;
      $('#botText').text('\u8D76\u7D27\u8F93\u5165\u9A8C\u8BC1\u7801!!').css('color', 'red');
      refreshValidateCode();
    }
  });
}

function submitPurchase() {
    $('#botText').text('\u63d0\u4ea4\u4e2d...').css('color', 'blue');
    $.get($("#exchange").attr("loadurl")+"?checkCode="+$("#checkCode").val()+"&t=b", $("#productCode").val(), function(c){
        var errMessage = '\u62a2\u8d2d\u5931\u8d25...\u8bf7\u91cd\u8bd5...';
        if (1 == c.purchaseResult) {
            //refreshTop();
            var a = "http://www.pepsitmall.com/utc/success.htm?productId=" + c.productId + "&productType=" + c.productType + "&productExternalUrl=" + escape(c.productExternalUrl) + "&orderCode=" + c.orderCode;
            if (c.purchaseKey) {
                a += "&purchaseKey=" + encodeURIComponent(c.purchaseKey)
            }
            window.location.href = a
        } else {
            $('#botText').text(errMessage).css('color', 'red');
            refreshValidateCode();
        }
    });
}
function refreshValidateCode() {
    $("#validateCode").attr("src", 'http://www.pepsitmall.com/utc/getValidateCodePic.htm?productCode=l_dream002&a=' + new Date());
    $('#checkCode').focus();
}