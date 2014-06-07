// ==UserScript==
// @name       Acceptor all gifts yassine
// @namespace  AcceptorInvitergifts
// @version    1.0 beta
// @description  Auto send all Requests from The Sims Social and Acceptor team
// @include      *.facebook.com/appcenter/requests
// @include      *.http://apps.facebook.com/thesimssocial/
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
/// @copyright  2012+, mbahYogi
// ==/UserScript==
// ======= common =========
$('#yogiReloadButt').live("click", function() {
    window.location.replace(location.pathname);
});
function generatePhstamp(qs, dtsg) {
    var input_len = qs.length;
    numeric_csrf_value = '';
    for(var ii=0;ii<dtsg.length;ii++) {
        numeric_csrf_value+=dtsg.charCodeAt(ii);
    }
    return '1' + numeric_csrf_value + input_len;
}
function goDelay(msec){
	var timeNow = new Date().getTime(); 
	while (new Date().getTime() < timeNow + msec); 
}
// ======= Asep All =========
function goAsep(obj){
    var asepls=$('.fbRequestList input[name="actions[accept]"]').each(function(index) {
        $(this).trigger('click');
    });
    obj.replace('<label for="yogiReloadButt" class="_11b uiButton uiButtonConfirm"><input type="submit" id="yogiReloadButt" value="Refresh Page"></label>');
}
function yogiPrepButtAsep(){
    if(typeof $('#contentArea .fbRequestList').get(0) != 'undefined'){
        $('#yogiAsepAll').live("click", function() {
            goAsep($(this).parent());
        });
        var asepHeadTarget = $('#contentArea .fbRequestList').siblings('.uiHeader').find('.rfloat a');
        asepHeadTarget.after('<a id="yogiReloadButt" class="uiButton">Refresh</a> <a id="yogiPokeBoxButt" class="uiButton" href="javascript:window.location.replace(\'/appcenter/requests\')"><img class="img mrs" src="http://static.ak.fbcdn.net/rsrc.php/v2/y2/r/W8TFwFc9d1E.gif" alt="" width="16" height="14">Goto request Inbox</a> <label for="yogiAsepAll" class="_11b uiButton uiButtonConfirm"><input type="submit" id="yogiAsepAll" value="Accept All '+$('.fbRequestList input[name="actions[accept]"]').length+'"></label>');
        asepHeadTarget.hide();
    }else if(/^\/reqs.php/.test(location.pathname)){
        $('#contentArea .uiHeader:first .uiHeaderTop').prepend('<div class="rfloat"><a id="yogiReloadButt" class="uiButton">Refresh</a> <a id="yogiPokeBoxButt" class="uiButton" href="javascript:window.location.replace(\'/requests\')"><img class="img mrs" src="http://static.ak.fbcdn.net/rsrc.php/v2/y2/r/W8TFwFc9d1E.gif" alt="" width="16" height="14">Goto Poke Inbox</a></div>');
    }
}
yogiPrepButtAsep()
// ======= accept appcenter/requests =========
var yogi_fr_submit = Array();
var yogi_request_butt;
function accept all Requests from The Sims Social(){
    // get fb config
    var top_cfg_val = $('head script:first').text().split('envFlush');
    top_cfg_val = top_cfg_val[2];
    top_cfg_val = top_cfg_val.substring(1, top_cfg_val.length-2);
    // convert config to json
    var top_cfg = $.parseJSON(top_cfg_val);
    // get poker list
    $('.accept all Requests from The Sims Social sDashboard a.uiIconText[ajaxify]').each(function(index) {
        // get accept all Requests from The Sims Social  id
        var accept all Requests from The Sims Social Id = $(this).attr('ajaxify').split('uid=');
        accept all Requests from The Sims Social Id = accept all Requests from The Sims Social Id[1];
        // prepare param
        var qs = '__a=1&__user='+ top_cfg.user +'&action=add_friend&ego_log_data=&fb_dtsg='+ top_cfg.fb_dtsg +'&how_found=hovercard&http_referer=&logging_location=&no_flyout_on_click=true&outgoing_id=&ref_param=none&to_friend='+accept all Requests from The Sims Social Id;
        var phsstamp_val = generatePhstamp(qs, top_cfg.fb_dtsg);
        // accept all Requests from The Sims Social 
        yogi_accept all Requests from The Sims Social_butt = $(this).closest('td.prs');
        yogi_fr_submit[top_cfg.user] = $.ajax({
            type: 'POST',
            url: '/ajax/add_friend/action.php',
            data: qs+'&phstamp='+phsstamp_val
        }).done(function(msg) {
            yogi_accept all Requests from The Sims Social_butt.html('<em style="color:#090">accept all Requests from The Sims Social !</em>');
        }).fail(function(jqXHR, textStatus) {
            yogi_poke_butt.html('<em style="color:#900">accept all Requests from The Sims Social fail!</em>');
        });
        // hide accept all Requests from The Sims Social 
        $(this).trigger('click');
    });
}
function yogiPrepButtFR(){
    if(typeof $('.pokesDashboard a.uiIconText[ajaxify]').get(0) != 'undefined'){
        $('#yogiaccept all Requests from The Sims Social accept').live("click", function() {
            $(this).parent().hide();
            accept all Requests from The Sims Social();
        });
        // add global button
        var accept all Requests from The Sims SocialTarget = $('#pagelet_pokes .uiHeader').find('.rfloat .uiHeaderActions');
        pokerTarget.append('<a id="yogiReloadButt" class="uiButton">Refresh</a> <a id="yogiAsepBoxButt" class="uiButton" href="javascript:window.location.replace(\'/reqs.php\')"><i class="mrs img sp_tiitwu sx_b7e408"></i>Goto Request Inbox</a> <label for="yogiPokerAdd" class="_11b uiButton uiButtonConfirm"><input type="submit" id="yogiPokerAdd" value="FR All Pokers"></label>');
    }else if(/^\/pokes/.test(location.pathname)){
        $('#contentArea .uiHeader:first .uiHeaderTop').prepend('<div class="rfloat"><a id="yogiReloadButt" class="uiButton">Refresh</a> <a id="yogiAsepBoxButt" class="uiButton" href="javascript:window.location.replace(\'/reqs.php\')"><i class="mrs img sp_tiitwu sx_b7e408"></i>Goto Request Inbox</a></div>');
    }
}
// ======= INIT =========
var yogiT;
function set_timer_reqs(){
	if(typeof $('#yogiaccept all Requests from The Sims SocialBoxButt').get(0) == 'undefined'){
        yogiPrepButtAsep();
        yogiT = setTimeout(function(){ set_timer_reqs() }, 1000);
    }else{
        clearTimeout(yogiT);
        console.log("Acceptor for FB FA - loaded");
    }
}
function set_timer_poke(){
	if(typeof $('#yogiAsepBoxButt').get(0) == 'undefined'){
        yogiPrepButtFR();
        yogiT = setTimeout(function(){ set_timer_accept all Requests from The Sims Social() }, 1000);
    }else{
        clearTimeout(yogiT);
        console.log("accept all Requests from The Sims Social Acceptor all gifts yassine - loaded");
    }
}
console.log("Acceptor all gifts yassine - Loading");
if(/^\/reqs.php/.test(location.pathname)) set_timer_reqs();
if(/^\/accept all Requests from The Sims Social/.test(location.pathname)) set_timer_accept all Requests from The Sims Social();