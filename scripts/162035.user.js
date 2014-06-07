// ==UserScript==
// @name        facebook remove adds, show big posts
// @namespace   facebook
// @description facebook
// @include     https://www.facebook.com/*
// @include     http://www.facebook.com/*
// @version     1.1
// ==/UserScript==



//$elements = $$('div[role=article]');

(function (){
   var xunsafeWindow = typeof(unsafeWindow) === 'undefined' || typeof(unsafeWindow) === 'null' ? window : unsafeWindow;

    with(xunsafeWindow) {
        var loadIt = (function (){
            var cctext = '{count}//';
            var ccount = null;
            var cf = null;
            var cc = null;
    
            function addStyles(csstyles) {
                var styles = document.createElement('style');
                styles.innerHTML = csstyles;
                document.body.appendChild(styles);
            }
            function incrementCount() {
                cc.innerHTML = cctext.split('{count}').join(ccount++);
            }
            var stylesComerciales = 'position: fixed; top: 0px; left: 0px; z-index: 100; width: 493px; overflow: scroll; height: 455px;';
            if (window.parent.parent.parent.facebookaddons_started === true) {
                window.console.log('already started');
                return;
            }
            if (typeof(window.parent.parent.parent.facebookaddons_started) === 'undefined') {
                window.console.log('first time');
                
            }
            if ($('leftCol') !== null) {
                if (window.document.getElementById('comercialesfacebook') === null) {
                    var leftCol = $('leftCol');
                    var reminders = $('pagelet_reminders');
                    leftCol.appendChild(reminders);
                    cf = document.createElement('div');
                    cf.setAttribute('id', 'comercialesfacebook');
                    //cf.setAttribute('style', stylesComerciales);
                    leftCol.appendChild(cf);
                    //addStyles('#comercialesfacebook>div{background-color:red;opacity: 0.4;}');
                    //position: fixed; top: 0px; left: 0px; z-index: 100; width: 493px; overflow: scroll; height: 455px;
                    var rightWidth = $('rightCol').offsetWidth;
                    addStyles('#rightCol{display:none}');
                    addStyles('#comercialesfacebook{background-color:#EEEEEE;position: fixed; top: 40px; left: 0px; z-index: 100; overflow: hidden;width: 100px;height: 17px;}');
                    addStyles('#comercialesfacebook>li{display:none;}');
                    addStyles('#comercialesfacebook:hover{width: 493px;height: 100%;overflow: scroll;}');
                    addStyles('#comercount{position:fixed; top:40px; left:0px;}');
                    addStyles('#comercialesfacebook:hover #comercount{display:none;}');
                    addStyles('#comercialesfacebook:hover li{display:inherit}');
                    addStyles('.UFIContainer{width: auto;}');
                    addStyles('.uiStreamStory .photoRedesign{width: auto;}');
                    addStyles('.uiStreamStory .uiStreamAttachments .photoRedesignAspect, .uiStreamStory .uiStreamAttachments .photoRedesignCover, .uiStreamStory .uiStreamAttachments .photoRedesignLink, .uiStreamStory .uiStreamAttachments .photoRedesignLink > a{width: 100%;}');
                    addStyles('.uiStreamStory .photoRedesignSquare .photoWrap, .uiStreamStory .uiStreamAttachments .photoRedesignAspect > img, .uiStreamStory .uiStreamAttachments .photoRedesignCover > img, .uiStreamStory .uiStreamAttachments .photoRedesignLink > img{min-width: 100%; max-width: 100%; height: auto;}');
                    addStyles('.uiStreamStory .uiStreamAttachments .photoRedesignLink.mrs, .uiStreamStory .uiStreamAttachments .photoRedesignLink.mbs{float:left;margin:0;padding:0;width:auto;}');
                    addStyles('.uiStreamStory .uiStreamAttachments .photoRedesignAspect.mrs, .uiStreamStory .uiStreamAttachments .photoRedesignCover.mrs, .uiStreamStory .uiStreamAttachments .photoRedesignLink, .uiStreamStory .uiStreamAttachments .photoRedesignLink > a{width:auto;}');
                    addStyles('.uiStreamStory .uiStreamAttachments .photoRedesignCover{width: 100%; height: auto;}');
                    addStyles('.uiStreamStory .uiStreamAttachments .photoRedesignCover>img{position: relative;}');
                    
                addStyles(' .uiStreamStory .uiStreamAttachments .photoRedesignLink.mrs, .uiStreamStory .uiStreamAttachments .photoRedesignLink.mbs{width:auto}');
                    
                    // nested posts
                    addStyles('.uiStreamRedesign .uiStreamSubstories .uiStreamSubstory .uiUfi{width: 100%}');
                    addStyles('.uiStreamStory .uiStreamSubstory .photoRedesign{width: 100%;}');
                    
                    addStyles('.uiStreamStory .photoRedesignSquare .photoWrap{width: 100%;}');
                    var middleWidth = $('contentArea').offsetWidth;
                    addStyles('.hasLeftCol .homeWiderContent div#contentArea{width:'+(rightWidth + middleWidth - 40)+'px!important;}');
                    addStyles('.shareRedesign{width:auto;}')
                    cc = document.createElement('div');
                    cc.setAttribute('id', 'comercount');
                    ccount = 0;
                    incrementCount();
                    cf.appendChild(cc);
                    
                }
            }
    
            window.parent.parent.parent.facebookaddons_started = true;
    
            setInterval(function(){
                try {
                    var articles = window.parent.document.evaluate('//div[@id="contentCol"]//div[@role="article"]/../../../..', document, null, XPathResult.ANY_TYPE, null);
            
                    var article = articles.iterateNext();    
                    while (article) {
                        var data = article.getAttribute('data-ft');
                        if (typeof(data) === 'string') {
                            if (data.length > 2000) {
                                //spam
                                //article.setAttribute('style','background-color:red;opacity: 0.4;');
                                cf.appendChild(article);
                                incrementCount();
                            }
                        }
                        article = articles.iterateNext();
                    }
                } catch(e) {
                    //catch opera errors
                }
    
    
            }, 1000);
    
    
    
            return;
        });
        
        var maxTimes = 100;
        setTimeout(function() {
            //window.console.log(typeof($), typeof(window.$), typeof(unsafeWindow.$));
            if (typeof($) === 'undefined' || document.getElementById('leftCol')===null) {
                if (maxTimes -- > 0) {
                    return setTimeout(arguments.callee, 300);
                }
                return;
            }
            loadIt();
        }, 300);
        
    }
    
})();