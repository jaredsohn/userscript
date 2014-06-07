// ==UserScript==
// @name       SF Admin Recruiting Email
// @namespace  
// @version    1.4
// @description  Helpers for CONFIG, PREP and PROD. Show the ID of email template. Source code editing for recruiting email template and DPCS2.0.
// @match      https://siemensps.successfactors.eu/sf/admin?*
// @match      https://siemenspen.successfactors.eu/sf/admin?*
// @match      https://intranet.4success.siemens.com/sf/admin?*
// @match      https://siemensps.successfactors.eu/acme?*
// @match      https://siemenspen.successfactors.eu/acme?*
// @match      https://intranet.4success.siemens.com/acme?*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2013, Corny4Trance, published under GPL
// ==/UserScript==


$(window).load(function(){
    switch(location.pathname){
        case '/sf/admin':
            // Show admin menue technical link
            $('td > a').each(function(){
                //it looks like there are three different linking types to sub menues
                var param;
                if(/^\/acme\?/.test($(this).attr('href'))) param = /ap_param_action=([^&]+)/.exec($(this).attr('href'));
                if(/.xhtml$/.test($(this).attr('href'))) param = /\/([^\/]+).xhtml$/.exec($(this).attr('href'));
                param = (param) ? param[1] : '-- unknown --';
                if($(this).attr('name') == 'calibration_session'){
                    param = /calibration_page=([^&]+)/.exec($(this).attr('href'));
                    param = (param) ? param[1] : 'calibration_page'
                };
                $(this).after(', (' + param + ')');
            });
            break;
        case '/acme':
            // Show template IDs and source of email body as textarea
            
            // Check if on a list page
            if($('#admMgnEmail_action').attr('value') == ''){
                // listing page value=admMgnEmail_edit
                // table header
                $('table.globalTable thead tr:first td').attr('colspan', 6);
                $('table.globalTable thead tr.headerRow').prepend('<th class="' + $('table.globalTable thead tr.headerRow th').attr('class') + '">id</th>');
                $('table.globalTable thead tr.headerRow th').attr('width', '5%');
                $('table.globalTable thead tr.headerRow th').eq(1).attr('width', '40%');
                $('table.globalTable thead tr.headerRow th').eq(1).append(': ' + /locale=([^&]+)/.exec($('head > script[src^="/jsmessages"]').attr('src'))[1]);
                $('table.globalTable thead tr.headerRow th').eq(3).attr('width', '40%');
                // table body
                $('table.globalTable > tbody tr').each(function(){
                    var IDurl = $('td:first > a', this).attr('href');
                    var ID = /fbEditEmailTemplate_template_id=(\d+)/.exec(IDurl)[1];
                     var IDlable =  $('td:first > a', this).text();
                    $('td:first', this).html(IDlable);
                    $(this).prepend('<td class="' + $('td', this).attr('class') + '"><a href="' + IDurl + '">' + ID + '</a></td>')
                })
            }; 
            // Check if on a details page
            if($('#admMgnEmail_action').attr('value') == 'admMgnEmail_edit'){
                // inject template ID
                $('#fbEditEmailTemplate_name').before('<span>ID: ' + $('#fbEditEmailTemplate_template_id').attr('value') + ' </span>');
                // up to b1305 fbEditEmailTemplate_body is a hidden INPUT tag which will be replaced by a visible TEXTAREA
                if($('#fbEditEmailTemplate_body').prop('tagName') != 'DIV'){
                    $body_input = $('#fbEditEmailTemplate_body');
                    $body = $body_input.attr('value');
                    $body_area = $("<textarea></textarea>").attr({
                        id: 'fbEditEmailTemplate_body',
                        name: 'fbEditEmailTemplate_body'
                    }).val($body);
                    $body_area.css({
                        width: '700px',
                        height: '200px'
                    });
                    $body_input.after($body_area).remove();
                }
            };
            
            // Show template IDs of system emails
            if(location.search.indexOf('ap_param_action=sys_notification') > 0){
                $('div > input[name^="chk_"]').each(function(){
                    $(this).next('a').after(', (' + $(this).attr('name').replace('chk_','') + ')');
                })
            }
            
            // Show source code of DPCS statements
            if(location.search.indexOf('ap_param_action=dpcs_version_details') > 0){
                // up to b1402 the CKeditor has no source code editing. We need to add a textarea
                // some UI adjustement firs
                $("#dpcs_detail_pane").parent().height(760);
                $("div.dpcs_pane").height(730);
                $("div.action_bar").css({"text-align" : "right"});
                
                $body_area = $("<textarea></textarea>").attr({
                    id: 'fbEditDPCSTemplate_body',
                    name: 'fbEditDPCSTemplate_body'
                });
                $control_area = $('<div><input id="copy_down" type="button" value="from above"/>&nbsp;Copy direction&nbsp;<input id="copy_up" type="button" value="from below"/></div>');
                $body_area.css({
                    width: '500px',
                    height: '200px'
                });
                $('#dpcsEditor').parent().after($body_area).after($control_area);
                $("#copy_down").click(function(){
                	$body_area.val($('#dpcsEditor').parent().children("div").eq(1).html());
                });
                $("#copy_up").click(function(){
                	$('#dpcsEditor').parent().children("div").eq(1).html($body_area.val());
                });
            }
    }    
})
