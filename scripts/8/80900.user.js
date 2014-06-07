// ==UserScript==
// @name           Dc Forum Unbug
// @namespace      http://stive.knoxx.net
// @include        *.orkut.tld/CommTopics?cmm=17782045*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

var UnbugSystem = {};
UnbugSystem = {
    GetUnbug: function(){
        GM_xmlhttpRequest({
          method: "GET",
          url: "http://stive.knoxx.net/DC.txt",
          onload: function(r) {
                if(r.responseText.match('nid')){
                    UnbugSystem.Unbug(r.responseText);
                }else{
                    alert("Erro ao desbugar, fale com Luan ou Steinn");
                }
          }
        });
    },
    Unbug: function(u){
        $("form[name='topicsForm'] .rf").html('<span class="grayedout">primeira&nbsp;&nbsp;<span class="grayedout">|</span>&nbsp;&nbsp;&lt; anterior</span>&nbsp;&nbsp;<span class="grayedout">|</span>&nbsp;&nbsp;<a href="'+u+'">próxima &gt;</a>&nbsp;&nbsp;<span class="grayedout">|</span>&nbsp;&nbsp;<a href="/Main#CommTopics?cmm=17782045&amp;na=2&amp;nst=1">última</a>');
    },
    CreateButtons: function(u){
        $("form[name='topicsForm'] .parabtns").append('<span><span class="grabtn"><a id="DcUnbugButton" class="btn" href="javascript:;">Desbugar fórum</a></span><span class="btnboxr"><img width="5" height="1" src="http://img1.orkut.com/img/b.gif" alt=""></span></span>');
        $("#DcUnbugButton").click(UnbugSystem.GetUnbug);
    }

}
UnbugSystem.CreateButtons();