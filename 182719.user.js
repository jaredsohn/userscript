// ==UserScript==
// @name        Travian4 Map Details
// @namespace   http://assouan.dinari.be/userscripts
// @description Télécharge des données de la map et les envoies à une url externe
// @icon        http://www.travian.com/favicon.ico
// @author      Assouan
// @version     1.2.4
//
// @updateURL   https://userscripts.org/scripts/source/182719.meta.js
// @downloadURL https://userscripts.org/scripts/source/182719.user.js
// 
// @include     *.travian.*/*
// 
// @run-at      document-end
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @grant       none
//
// @history     1.2.4 Fix bug X. Fix Y and Interval don't work (and disable all)
// @history     1.2.3 Delete disabled
// @history     1.2.2 Change "starting row" by "starting column"
// @history     1.2.1 Fix bug coordinated all time (5, 28)
// @history     1.2   form of configuration (with system pause)
// @history     1.1.1 change "match" by "include"
// @history     1.1   add a while for multiple get/post
// ==/UserScript==

// JQuery No Conflict
this.$ = this.jQuery = jQuery.noConflict(true);
/*
$.noConflict();
jQuery(document).ready(function($)
{
    // $ = JQuery Temp
});
*/

// Document DOM Ready
$(document).ready(function(){ t4_check_token(); });

// Travian4 Ready (travian and token found)
var token;
var travian;
function t4_check_token()
{
    if (unsafeWindow.ajaxToken && unsafeWindow.Travian)
    {
        token = unsafeWindow.ajaxToken;
        travian = unsafeWindow.Travian;
        
        $('#footer').html(
        'PX <input type="number" id="formx_px" value="" min="-400" max="400" placeholder="<starting column>" />' +
        ' PY <input type="number" id="formx_py" value="-400" min="-400" max="400" />' +
        '<br />' +
        'SX <input type="number" id="formx_sx" value="1" min="1" max="801" />' +
        ' SY <input type="number" id="formx_sy" value="801" min="1" max="801" />' +
        '<br />' +
        'Interval <input type="number" id="formx_iv" value="1000" min="0" max="60000" /> (ms | 1000ms = 1sec)' +
        '<br />' +
        '<button type="button" id="formx_bt_pause" disabled>[Pause]</button>' +
        '<button type="button" id="formx_bt_start">[Demarrer]</button>' +
        '<button type="button" id="formx_bt_stop" disabled>[Stop]</button>' +
        '<br /><p "formx_inf"><span id="formx_inf_left"></span> | <span id="formx_inf_right"></span> | <span id="formx_inf_state">nothing</span></p>'
        );
        $('#formx_bt_start').click(function()
        {
            t4_start()
        });
        $('#formx_bt_pause').click(function()
        {
            t4_pause()
        });
        $('#formx_bt_stop').click(function()
        {
            t4_stop()
        });
    }
    else
    {
        setTimeout(t4_check_token, 100);
    }
}

// *** Script Config Editable ***
var pos_start_x = 0;
var pos_start_y = 0;
var pos_size_x  = 0;
var pos_size_y  = 0;
var reqinterval = 1000; // 1000 = 1 sec

// *** Script Config /!\ NOT EDIT /!\ ***
var pos_while_x = 0;
var pos_while_y = 0;
var ifcontinue  = true;

// *** Script Main ***

function t4_start()
{
    if($("#formx_px" ).val().length == 0)
    {
        alert('plyz entry a number row starting valid');
        return;
    }

    $("#formx_bt_start").prop('disabled', true);
    $("#formx_bt_pause").prop('disabled', false);
    $("#formx_bt_stop" ).prop('disabled', false);
    $("#formx_px" ).prop('disabled', true);
    $("#formx_py" ).prop('disabled', true);
    $("#formx_sx" ).prop('disabled', true);
    $("#formx_sy" ).prop('disabled', true);
    
    pos_start_x = parseInt($("#formx_px").val());
    pos_start_y = parseInt($("#formx_py").val());
    pos_size_x  = parseInt($("#formx_sx").val());
    pos_size_y  = parseInt($("#formx_sy").val());
    reqinterval = parseInt($("#formx_iv").val());
    
    ifcontinue  = true;
    
    $("#formx_inf_state").html('working...');
    t4_tiledetailsGet();
}
function t4_pause()
{
    $("#formx_bt_start").prop('disabled', false);
    $("#formx_bt_pause").prop('disabled', true);
    $("#formx_bt_stop" ).prop('disabled', false);
    
    ifcontinue  = false;
    
    $("#formx_inf_state").html('waiting... (pause)');
}
function t4_stop()
{
    $("#formx_bt_start").prop('disabled', false);
    $("#formx_bt_pause").prop('disabled', true);
    $("#formx_bt_stop" ).prop('disabled', true);
    $("#formx_px" ).prop('disabled', false);
    $("#formx_py" ).prop('disabled', false);
    $("#formx_sx" ).prop('disabled', false);
    $("#formx_sy" ).prop('disabled', false);
    
    ifcontinue  = false;
    pos_while_x = 0;
    pos_while_y = 0;
    
    $("#formx_inf_state").html('nothing');
}

function t4_tiledetailsGet()
{
    if(!ifcontinue) return;
    
    // Current position
    var x = pos_start_x+pos_while_x;
    var y = pos_start_y+pos_while_y;
    $("#formx_inf_left").html('position_get('+x+', '+y+')');
    
    // Get position information
    travian.ajax(
    {
        data:
        {
            cmd: 'viewTileDetails', x: x, y: y
        },
        onSuccess: function (b)
		{
			// Post position information
			t4_tiledetailsPost(x, y, b.html);
		}
    });
    
    // Incrimente for next call
    if(++pos_while_y >= pos_size_y)
    {
        pos_while_y = 0;
        
        if(++pos_while_x >= pos_size_x)
        {
            // End of while !
            $("#formx_inf_state").html('/!\\ FINISHED /!\\');
            return;
        }
    }
    
    // Recall
    if(reqinterval)
        setTimeout(t4_tiledetailsGet, reqinterval);
    else
        t4_tiledetailsGet();
}

// Send information at xanthools
function t4_tiledetailsPost(x, y, data)
{
    $("#formx_inf_right").html('position_post('+x+', '+y+')');
    $.ajax(
	{
		url: 'http://www.xanthools.com/crea_map.php',
		type: 'POST',
		data: {x: x, y: y, data: data}
	}).done(function(data)
	{
	}).fail(function(jqXHR, textStatus)
	{
        //console.log('crea_map.php ERROR_POST('+x+', '+y+'): ' + textStatus);
        //console.log(jqXHR);
    });
}