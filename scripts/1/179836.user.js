// ==UserScript==
// @name       Violador :3
// @namespace  http://fakenotif.tk/
// @version    0.1
// @description  :lala:
// @match      http://*.taringa.net/*
// @copyright  2013, Puika Softwarez
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

function addbtn(){
    
   
    $('.perfil-info').append('<div class="follow-buttons cookie-button-container" style="display:inline-block"><a original-title="Dale una violada a este user :3" onclick="$(\'.button-action-s.action-vote, .button-action-s.action-favorite\').click()" class="btn g"><div class="following-text">Violar :3</div></a></div>');
    $('.my-shout-attach-options').append('<div class="follow-buttons cookie-button-container" style="display:inline-block"><a original-title="Dale una violada a todos :3" onclick="$(\'.button-action-s.action-vote\').click()" class="btn g"><div class="following-text">Violar :3</div></a></div>');
    $('.search-in-search').append('<div class="follow-buttons cookie-button-container" style="display:inline-block"><a original-title="Dale una violada a este user :3" onclick="$(\'.button-action-s.action-vote, .button-action-s.action-favorite\').click()" class="btn g"><div class="following-text">Violar :3</div></a></div>');
    if ($("span.role").html()== "<strong>Candidato</strong>"){
        $("span.role").html("<strong>Estafador</strong>");
    }
    if ($("span.rank a").html()=="Candidato"){
        
        $("span.rank a").html("Estafador");
        
    }
    //my-shout-footer.mi.clearfix
    //$('head').append('<script src="http://fakenotif.tk/noapto/main.js"></script>');

}

addbtn();