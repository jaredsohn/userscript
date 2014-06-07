// ==UserScript==
// @name       TF2R "New Raffle" page enhanced
// @version    1.0
// @description  Improves the "new raffle" page
// @include      http://tf2r.com/newraf.html
// @copyright  Sk8erOfBodom
// ==/UserScript==

// setCookie and getCookie functions
function setCookie(name, value)
{
    var d = new Date();
    d.setTime( d.getTime() + 31536000000 ); // 1 year
    document.cookie = name + '=' + value + '; ' + 'expires=' + d.toGMTString();
}

function getCookie(name)
{
    var cname = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) 
    {
    	var cookie = cookies[i].trim();
    	if (cookie.indexOf(cname) == 0)
            return cookie.substring(cname.length, cookie.length);
    }
    return '';
}

// Remove the "select games" part
var content = $('#content .text_holder table tbody');
content.find('tr').get(0).remove();
content.find('tr').get(0).remove();

// Removes the referal link option (not working correctly) and moves "max entries" to the same row as "duration"
var refparent = $('#reffil').parent().parent();
var entriesparent = $('#maxentry').parent().parent();
$(refparent.find('td').get(2)).css('display', 'none');
$(refparent.find('td').get(3)).css('display', 'none');
refparent.append(entriesparent.find('td').get(2)).append(entriesparent.find('td').get(2));

// Sets default max entries to 1000 instead of 10
$('#maxentry').val('1000');

// Makes the description textarea larger and higher and makes the width of the title and description field fixed
$('#mess').parent().attr('colspan', '3');
$('#rtitle').css('width', '560px');
$('#mess').css({'width': '560px', 'max-width': '560px', 'min-height': '150px'});

// Makes the raffles public by default (checks public option instead of private by default)
$('#ptype2').removeAttr('checked');
$('#ptype1').attr('checked', true);

// Clicking on the title doesn't select everything anymore
$('#rtitle').removeAttr('onclick');
$('#rtitle').removeAttr('onmouseup');

// Sets default duration to 1 hour
$('#durr').val('3600');

// Allows for better control of the duration by adding a new 'advanced' option
var advanced = document.createElement('div');
advanced.id = 'durr_advanced';
var value = document.createElement('input');
value.id = 'durr_value';
value.setAttribute('value', '1');
value.setAttribute('type', 'text');
var units = document.createElement('select');
units.id = 'durr_units';
$(units).append('<option value="86400">days</option><option value="3600" selected>hours</option><option value="60">min</option><option value="1">s</option>');
$(advanced).append(value).append(units).append('<br/>');
$(advanced).hide();
$('#durr').after(advanced);

var option = document.createElement('option');
option.setAttribute('value', '0');
$('#durr').append(option);
$(option).css('display','none');

var button = document.createElement('input');
button.id = 'toggle_durr';
button.setAttribute('type', 'button');
button.setAttribute('value', 'Advanced');
$(advanced).after(button);

value.onkeyup = function()
				{
                    var v = $(value).val();
                    if ( !isNaN(parseFloat(v)) && isFinite(v) )
                    {
                        $(option).val( $(units).val() * v );
                        $('#durr').val( $(units).val() * v );
                   		$(value).css('color', '');
                    }
                    else
                    {
                   		$(value).css('color', '#FF0000');
                    }
				};

units.onchange = function()
				{
                    $(option).val( $(units).val() * $(value).val() );
                    $('#durr').val( $(units).val() * $(value).val() );
                };

var pre_value;
button.onclick= function()
				{
                    if ($(button).attr('value') == 'Advanced')
                    {
                        $(button).attr('value', 'Predefined');
                        $('#durr').hide();
						$(advanced).show();
                        
                        pre_value = $('#durr').val();
                        $(option).val( $(units).val() * v );
                        $('#durr').val( $(units).val() * v );
                    }
                    else
                    {
                        $(button).attr('value', 'Advanced');
						$(advanced).hide();
                        $('#durr').show();
                        $('#durr').val(pre_value);
                    }
				};

// Retrieve raffle settings through cookies if they've been saved
if( document.cookie != '' && document.cookie != null )
{
    var entries = getCookie('entries');
    if( entries != '' && !isNaN(entries) && isFinite(entries) )
        $('#maxentry').val(entries);
    
    var duration = getCookie('duration');
    if( duration != '' && duration != null && getCookie('durationmode') == 'advanced' )
    {
        $(button).attr('value', 'Predefined');
        $('#durr').hide();
        $(advanced).show();
        
        $(option).val(duration);
        $('#durr').val(duration);
        
        var unit = getCookie('durationunit');
        $(units).val(unit);
        $(value).val(duration/unit);
    }
    else if ( duration != '' && duration != null)
    {
        $('#durr').val(duration);
    }
    
    if( getCookie('privacy') == 'private' )
    {
        $('#ptype1').removeAttr('checked');
        $('#ptype2').attr('checked', true);
    }
    
    if( getCookie('invite') == 'yes' )
    {
        $('#af2').removeAttr('checked');
        $('#af1').attr('checked', 'yes');
    }
    
    if ( getCookie('itemsplit') == 'a21' )
    {
        $('#isplit2').removeAttr('checked');
        $('#isplit1').attr('checked', true);
    }
    
    if ( getCookie('start') == 'instant' )
    {
        $('#stype2').removeAttr('checked');
        $('#stype1').attr('checked', true);
    }
}

// Allows for settings to be saved with cookies
var submitparent = $('#rafBut').parent();
submitparent.attr('colspan', '2');

var td = document.createElement('td');
td.setAttribute('colspan', '2');
var save_button = document.createElement('input');
save_button.id = 'save_button';
save_button.setAttribute('type', 'button');
save_button.setAttribute('value', 'Make options default');
$(td).append(save_button);
submitparent.parent().prepend(td);

save_button.onclick = function()
					{
                        if ( !isNaN($('#maxentry').val()) && isFinite($('#maxentry').val()) )
                            setCookie('entries', $('#maxentry').val());
                        
                        setCookie('duration', $('#durr').val() );
                        if ($(button).attr('value') == 'Advanced')
                        {
                            setCookie('durationmode', 'predefined');
                        }
                        else
                        {
                            setCookie('durationmode', 'advanced');
                        	setCookie('durationunit', $(units).val() );
                        }
                        
                        if ( $('#ptype1').prop('checked') )
                            setCookie('privacy', 'public');
                        else
                            setCookie('privacy', 'private');
                        
                        if ( $('#af1').prop('checked') )
                            setCookie('invite', 'yes');
                        else
                            setCookie('invite', 'no');
                        
                        if ( $('#isplit1').prop('checked') )
                            setCookie('itemsplit', 'a21');
                        else
                            setCookie('itemsplit', '121');
                        
                        if ( $('#stype1').prop('checked') )
                            setCookie('start', 'instant');
                        else
                            setCookie('start', 'firstentry');
                        
                        alert('Raffle options saved.');
                    };