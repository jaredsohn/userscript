// ==UserScript==
// @name Fanfou confirmation before following
// @version 1.1
// @author HackMyBrain
// @description 关注饭否er前弹出确认提示以避免鼠标误击
// @include http://fanfou.com/*
// @download http://userscripts.org/scripts/show/156342
// ==/UserScript==


(function (){
    var foConfirm = function (e){
        if (/\/friend\.add\/|\/friend\.acceptadd\//.test(e.target.href)){
            if (!confirm('确实要关注 ?')){
                e.stopPropagation();
                e.preventDefault();
            } else if (!confirm('真的确实要关注 ?')){
                e.stopPropagation();
                e.preventDefault();
            }
        }
    }
    
    window.addEventListener('click', foConfirm, true);
})();