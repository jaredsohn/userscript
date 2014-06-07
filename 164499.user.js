// ==UserScript==
// @name       testCase
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://cn.ae.alibaba.com/*
// @match      cn.ae.alibaba.com/*
// @run-at         document-end
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==


var detectFun = function(condition, handle, intervalTime) {
    if(typeof condition != 'function' || typeof handle != 'function'){
        throw new Error('condition or handle must be an function!');
        return ;
    }
    var detectOnIime = setInterval(function(){
        handle();
        if(condition()){
            clearInterval(detectOnIime);
        }
    }, intervalTime);
};

var injectFun = function() {
    $(function(){
        $('#pt-title').val('test title');
        $('#pk-primary-keyword').val('test keywords');
        $('#unit-select').find('option[value="100078581"]').attr('selected',true);
        $('#spu-price').val('34');
        $('#ws-support').attr('checked',true);
        $('#delivery-days').val('3');
        detectFun(function (){
            if($('.kse-bwrap').find('iframe').contents().find('body')[0]){
                return true;
            }else {
                return false;
            }
        }, function(){
            $('.kse-bwrap').find('iframe').contents().find('body').html('<p>dsdsdsdsdsdsds</p>');
        }, 1000);
        $('#mf-new-template').attr('checked', true);
        $('#package-weight').val('25');
        $('#package-length').val('1');
        $('#package-width').val('1');
        $('#package-height').val('1');
    });
};

detectFun(function(){
    if($('#pt-title')[0]){
        return true;
    }else{
        return false;
    }
}, injectFun, 1000);
