// ==UserScript==
// @name           PubSys Interface Switcher
// @namespace      PubSys
// @match          http://*/admin-bin/sitemgr/index.cgi?i_id=1;nmf_rpoint=;mode=nav
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function exec() {

    $('select:first option').each(function () {
        var name = $(this).text().replace(/[^a-zA-Z ]/g, '');
        if (name != "Publishing System")
            return;

        var simple_name = $(this).text().replace(/(\*)?$/, ' (simplified)$1');
        $(this).after('<option class="ui_toggle simplified" value="' + $(this).attr('value') + '">' + simple_name + '</option>');

        var standard_name = $(this).text().replace(/(\*)?$/, ' (standard)$1');
        $(this).text(standard_name);
        $(this).addClass("ui_toggle");
        $(this).addClass("standard");
    });

    $('select:first').attr('onchange', '');
    $('select:first').change(function() {
        var selected = $(this).find('option:selected');

        if (!selected.hasClass('ui_toggle'))
            return MenuHandler(this, top.product_opts_toggle, top.product_opts_window_array);

        var new_mode = "simplified";
        if (selected.hasClass('standard'))
            new_mode = "standard";

        var account_url = $('select[name=account_menu] option:last').val();
        var account_id = account_url.match(/;id=(\d+)/)[1];

        var installation_id = selected.attr('value').match(/i_id=(\d+)/)[1];

        var data = {
            i_id:                   1,
            object_lid:             account_id,
            object_class:           'account',
            installation_id:        installation_id,
            mode:                   'save_edit_me',
            'pref__interface:type': new_mode,
        };

        var menu = this;
        $.ajax({
            type:       'POST',
            url:        '/admin-bin/sitemgr/preferencemgr.cgi?i_id=1;nmf_rpoint=',
            data:       data,
            success:    function() {
                            MenuHandler(menu, top.product_opts_toggle, top.product_opts_window_array);
                        }
        });
    });
}

// load jQuery and execute the main function
addJQuery(exec);
