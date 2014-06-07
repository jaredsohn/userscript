// ==UserScript==
// @name Quick Delete Zone Button - Peer1
// @description Allows for quick deletion of DNS zones in Peer1 admin.  Presents only one prompt, use with caution!
// @namespace http://www.tech-9.com/
// @include https://mypeer1.com/dedicated/services/zone-edit.php*

// for chrome
// @match https://mypeer1.com/dedicated/services/zone-edit.php*

// @version 0.1
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "jQuery.noConflict();(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


function drawDeleteZoneButton() {
    function createInputs(opts) {
        var defaults = $.extend({'name': '', 'type': 'hidden', 'value': '', 'id': ''}, opts);
        return $('<input name="' + defaults.name + '" type="' + defaults.type + '" value="' + defaults.value + '" id="' + defaults.id + '" />');
    }

    $('td.record_data > input[value="Edit"]').parents('td').append('<br/><a href="/actions/zone-edit.php" class="delrecord">Delete Record</a>');
    $('.delrecord').click(function(e) {
        e.preventDefault();
        if (confirm('Are you sure?')) {
            $('#delContainer').remove();
            var myAction = 'https://mypeer1.com/actions/zone-edit.php';
            $('<div id="delContainer"><form id="frm" action="'+myAction+'" method="post"><input type="hidden" name="action_button" value="delete" /><input type="submit" name="delete_record" value="Delete" id="btnDel" /></form></div>').appendTo($('body'));

            var myRow = $(this).parents('tr').get(0);
            $(myRow).find('input').each(function(idx, ipt) {
                $('#frm').append(createInputs({
                                        name: $(ipt).attr('name'),
                                        value: $(ipt).attr('value')
                }));
                if ($(ipt).attr('name') == 'host') {
                    $('#frm').append(createInputs({
                                            name: 'old_host',
                                            value: $(ipt).attr('value')
                    }));
                }
                if ($(ipt).attr('name') == 'ttl') {
                    $('#frm').append(createInputs({
                                            name: 'old_ttl',
                                            value: $(ipt).attr('value')
                    }));
                }
                if ($(ipt).attr('name') == 'target') {
                    $('#frm').append(createInputs({
                                            name: 'old_target',
                                            value: $(ipt).attr('value')
                    }));
                }
                if ($(ipt).attr('name') == 'priority') {
                    $('#frm').append(createInputs({
                                            name: 'old_priority',
                                            value: $(ipt).attr('value')
                    }));
                }
            });

            $('#btnDel').click();
            return false;
        }
    });
}

// load jQuery and execute the main function
addJQuery(drawDeleteZoneButton);
