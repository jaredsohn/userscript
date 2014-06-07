// ==UserScript==
// @name           WorkersEasyRemove
// @namespace      eRepublik.com
// @description    Muuuuccchhh easier to remove many workers
// @include        *erepublik.com/*/economy/manage-employees*
// @version        0.5beta
// ==/UserScript==

//http://www.erepublik.com/images/modules/manager/remove_white.png
/*  POST /en/economy/fire HTTP/1.1
 *  action_type	fire
 *   employeeId	1449061
 *  _token	fb98f0f9bc9a9244a22ad026c1e4cc29
 */
var interval;

function GM_wait() {

	if (typeof unsafeWindow.jQuery == 'undefined') {window.setTimeout(GM_wait, 100);}
	else {$j = unsafeWindow.jQuery;start();}

}
GM_wait();
//main function
function start() {
    $j('.heading:last').css('height','100px')
    $j('.working_days span').css('width','30px');
    $j('.working_days').each(function() {
        $j(this).children(':last').after('<img class="fireSelected" src="http://www.erepublik.com/images/modules/manager/remove_white.png" alt="Fire selected" title="Fire selected" style="padding-top:20px;padding-left:3px;" />')
    });
    $j('.area_final_products').after('<div id="buttons"></div>');
    $j('#buttons').css('padding-left','350px');
    $j('<input type="button" id="fireall" value="Fire all" />').appendTo("#buttons");
//    $j('<input type="button" id="fireselected" value="Fire selected" />').appendTo("#buttons");
    $j('#buttons input').css('width','100px');
    $j('#fireall').click(fireAll);
    $j('.fireSelected').click(fireSelected);
}

//helpers functions
function fireAll() {
        //$j('[id^="fire_employee"]:first').parents('.listing').children('.employee_info').children().attr("id").split("_")[2]
        interval = setInterval(fireFirst, 3000);
}
function fireFirst() {
    count = $j('.listing').length;
    if(count == 0) { clearInterval(interval); return;}
    language = unsafeWindow.location.pathname.split("/")[1];
    url = "/" + language + "/economy/fire";
    token = $j('#_token').val();
    
    $j.post(
    url,
    {
        action_type : 'fire',
        employeeId : parseInt($j('[id^="fire_employee"]:first').parents('.listing').children('.employee_info').children().attr("id").split("_")[2]),
        _token : token
    },
    function() {$j('[id^="fire_employee"]:first').parents('.listing').remove();}
);
    
}
function fireSelected() {
    post($j(this).parents('.listing').children('.employee_info').children().attr("id").split("_")[2]);
    $j(this).parents('.listing').remove();
}

function post(id) {
    language = unsafeWindow.location.pathname.split("/")[1];
    url = "/" + language + "/economy/fire";
    token = $j('#_token').val();
    data = {
        action_type : 'fire',
        employeeId : parseInt(id),
        _token : token
    }
    $j.post(
    url,
    data
);
}