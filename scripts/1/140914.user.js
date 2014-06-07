// ==UserScript==
// @name        Userscripts: update from remote
// @description Updates the userscript code from the remotely hosted version
// @match       http://userscripts.org/scripts/show/*
// @match       http://www.userscripts.org/scripts/show/*
// @match       https://userscripts.org/scripts/show/*
// @match       https://www.userscripts.org/scripts/show/*
// @homepage    http://userscripts.org/scripts/show/140914
// @downloadURL http://userscripts.org/scripts/source/140914.user.js
// @installURL  http://userscripts.org/scripts/source/140914.user.js
// @updateURL   http://userscripts.org/scripts/source/140914.user.js
// @icon        http://s3.amazonaws.com/uso_ss/icon/140914/large.png?1344970976
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author      Tom Anderson <tom.h.anderson@gmail.com>
// @version     1.0.2
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {

    var admin = false;
    var remote = false;
    var edit_source = false;

    // Find page markers
    $('h6').each(function(index, node) {
        if ($(this).html() == 'Admin for script') {
            admin = true;
            $('div#summary p a').each(function(index, node) {
                if ($(this).html() == 'Remotely hosted version') {
                    remote = this;
                    $('li a').each(function(index, node) {
                        if ($(this).html() == 'Edit source') {
                            edit_source = this;
                        }
                    });
                }
            });
        }
    });

    // If no page markers do not continue
    if (!admin || !remote || !edit_source) return;

    // Add link to Admin for script tool menu
    $('<li><a href="#" id="update-from-remote">Update from remote</a></li>').insertAfter($(edit_source).parent());

    $('#update-from-remote').live('click', function(event) {
        // Fetch remote code via proxy
        $.ajax({
            url: 'http://db.etree.org/rest/proxy.php',
            type: 'get',
            data: {
                url: $(remote).attr('href'),
                mode: 'native'
            },
            success: function(data) {
                // Load edit source page and submit form
                $.get($(edit_source).attr('href'), function(edit_page) {
                    form = $(edit_page).find('form');
                    $(form).find('textarea').val(data);
                    $(form).css('display', 'none');
                    $(form).detach().insertAfter(remote);
                    $(form).submit();
                });
            },
            dataType: 'text'
        });

        return false;
    });
}

// load jQuery and execute the main function
addJQuery(main);
