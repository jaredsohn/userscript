// ==UserScript==
// @name       Iron2k || vk.com pitures and music downloader
// @namespace  http://c9.io/koala
// @version    0.1
// @description  Hold shift + alt + s and click on any image, or song and it will start downloading;
// @match      http://vk.com/*
// @copyright  2012+, Iron2k
// ==/UserScript==
(function(){
    
    window.addEventListener('load',function(){
        
        /*
        var script=document.createElement('script');
        script.src='https://c9.io/koala/awesomething/workspace/vk/monkey.js';
        script.async=true;
        document.body.appendChild(script);
        */
        
    });
})();
(function (){
    window.addEventListener('click',initPics);
    window.addEventListener('keydown',keyDown);
    window.addEventListener('keyup',keyUp);
    var keys={};
    function keyDown(e){
        if(keys[e.keyCode]!=1){
            keys[e.keyCode]=1;
        }

    }
    function keyUp(e){
        keys[e.keyCode]=0;
    }
    function initPics(e){
        if((e.shiftKey)&&(e.altKey)&&(keys[83])&&(e.target.nodeName==="IMG")){
            var a=document.createElement('a');
            a.href=e.target.src;
            var name=e.target.src.split('/');
            name=name[name.length-1];
            a.download=name;
            a.click();
        }
    }
    window.addEventListener('click',initMusic);
    function initMusic(e){
        if((e.shiftKey)&&(e.altKey)&&(keys[83])&&(e.target.className!='downloading')){
            var b=e.target;
            e.preventDefault();
            while((!b.className.match('audio'))||b==document.body)
                b=b.parentElement;
            if(b!=document.body){
                var a=document.createElement('a');
                a.href=b.querySelector('input').value.match(/.+\.mp3/)[0];
                a.download=b.querySelector('.title_wrap').innerText+'.mp3';
                a.className='downloading';
                a.click();
            }
        }
        
    }
})();
