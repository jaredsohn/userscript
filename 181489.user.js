// ==UserScript==
// @name       RecoPick detector
// @namespace  http://recopick.com/
// @version    0.2
// @description  display whether RecoPick has installed or not
// @match      http://*/*
// @copyright  2013, mctenshi
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")(jQ);";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// the guts of this userscript
function main($) {    
    function detect() {
        var w = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;
        if (!w.recoPick) return setTimeout(detect, 2000);

        var $output = $('<div id="recopickdetector" style="cursor:pointer;position:fixed;z-index:9999999999;top:5px;right:5px;width:45px;height:45px;text-align:center;line-height:45px;font-size:25px;font-weight:bold;font-family:\'arial black\';opacity:.8;border-radius:5px;background:red;color:#fff">R</div>').appendTo('body');
        var new_version = typeof w.recoPick === 'function';
        var old_version = !new_version;
        var $script_for_recopick = (function () {
            var $script;
            $('script').each(function () {
                if ($(this).text().indexOf('UserScript') === -1 && $(this).text().indexOf('recoPick(') > -1) {
                    $script = $(this);
                    return;
                }
            });
            return $script;
        }());
        
        var exp_site = /recoPick\(['"]site['"],[ ]*([^\)]+)\)/;
        var exp_auto = /recoPick\(['"]auto['"],[ ]*([^\)]+)\)/;
        var exp_send_log = /recoPick\(['"]send_log['"],[ ]*([^\)]+)\)/;
        var exp_widget = /recoPick\(['"]widget['"],[ ]*([^\)]+)\)/;
        var exp_setUID = /recoPick\(['"]setUID['"],[ ]*([^\)]+)\)/;
        var exp_page = /recoPick\(['"]page['"],[ ]*([^,^\)]+),[ ]*([^\)]+)\)/;

        var info = new_version && $script_for_recopick ? {
            script: $('script[src*="static.recopick.com"]').length ? $('script[src*="static.recopick.com"]').attr('src') : $('script[src*="collector.recopick.com"]').attr('src'),
            site: $script_for_recopick.text().match(exp_site) ? $script_for_recopick.text().match(exp_site)[1] : '',
            auto: $script_for_recopick.text().match(exp_auto) ? $script_for_recopick.text().match(exp_auto)[1] : '',
            send_log: $script_for_recopick.text().match(exp_send_log) ? $script_for_recopick.text().match(exp_send_log)[1] : '',
            widget: $script_for_recopick.text().match(exp_widget) ? $script_for_recopick.text().match(exp_widget)[1] : '',
            setUID: $script_for_recopick.text().match(exp_setUID) ? $script_for_recopick.text().match(exp_setUID)[1] : '',
            page: $script_for_recopick.text().match(exp_page) ? $script_for_recopick.text().match(exp_page)[1] + ',' + $script_for_recopick.text().match(exp_page)[2] : ''
        } : {
            script: $('script[src*="recopick.com"]').attr('src')
        };

        $output.css('background', new_version ? 'blue' : 'green').on('click', function (e) {
            alert(
                "script: " + info.script +
	            "\nsite: " + info.site +
                "\nauto: " + info.auto +
                "\nsend_log: " + info.send_log +
                "\nwidget: " + info.widget +
                "\npage: " + info.page +
                "\nsetUID: " + info.setUID
            );
            $(this).remove();
        });
    }
    
    detect();
}

// load jQuery and execute the main function
addJQuery(main);