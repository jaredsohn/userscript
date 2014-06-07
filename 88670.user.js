// ==UserScript==
// @name           URL Shortener
// @namespace      http://stive.knoxx.net
// @include        http://*orkut.tld/CommMsgs*
// @include        http://*orkut.tld/CommMsgPost*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// @require        http://userscripts.org/scripts/source/88667.user.js
// ==/UserScript==


GM_addStyle(".OMUrlShorten {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAARCAYAAADDjbwNAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKFhMfFmddI+0AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA6klEQVQ4y+2Uu6qEMBRFT3y0ChaSgIVg/CoLfzAoGCIExE/we7SQfZs7IQPJFFPMhcusJmEF9nkUYQBAHyChD/F/CjHG/mCieZ6pqioax9F1YIwhzjkJIchaG3U+oRwHAPR9D2MMlmXBr4KUEsYYaK0hpYw6n1COOwEgz3Nc14XzPN1DmqbOZVkWdT6hnMeZERFJKWnfd7rv203ati1t2+buMecTynla3TRNKMsSwzAgSRIAgNYadV2Dc451XaPO7zqU87S6oihwHAestWiaBu/yKocAQCmFrusghIBS6u1Cr3LY96/7FnrwA0fws0m8m+TWAAAAAElFTkSuQmCC) no-repeat scroll 0 3px transparent; height:15px; width:23px;}");

Icon = '<span id="urlshorten" style="vertical-align: middle;"><span title="Url Shorten" class="OMUrlShorten">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></span>';

if(window.location.href.match('CommMsgs')){
    $(document).keydown(function(e){
        if (e.keyCode == 81 && e.altKey) {
            setTimeout(function(){$("#OMToolBarOMQuickReply").append(Icon);},500);
        }

    });
    $("span[title='alt+q']").live('click', function(e){
        e.preventDefault();
        setTimeout(function(){$("#OMToolBarOMQuickReply").append(Icon);},500);
    });
}else if(window.location.href.match('CommMsgPost')){
    setTimeout(function(){$("#OMToolBarmessageBody").append(Icon);},500);
}
$("#urlshorten").live('click', function(){
   var url = prompt('Url:', '');
   if(url){
        Shortener(url);
   }
});

