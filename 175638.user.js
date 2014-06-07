// ==UserScript==
// @name         CQ Environment Notifier
// @namespace    http://userscripts.org/scripts/show/175638
// @version      1.5.2
// @description  Adds a helpful warning that you are currently on a client server (or internal dev server).
// @match        *://*/*wcm/*
// @match        *://*/*crx/*
// @match        *://*/dam/*
// @match        *://*/*content/*
// @match        *://*/cf#/*
// @match        *://*/siteadmin#/*
// @copyright    2013+, Spencer Rhodes (http://www.linkedin.com/in/oobleck)
// @updateURL    http://userscripts.org/scripts/source/175638.user.js
// @run-at       document-end
// ==/UserScript==

// NOTES: This is configured for my particular url conventions. Modify the value(s) of INTERNAL_MATCH
// to match your internal url conventions.

// TODO:
//  [ ] Hosted CSS include instead of inline?

// Updater
var SUC_script_num = 175638; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Userscript script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){};
// End updater

function clientCQ() {
    'use strict';

    // Edit this regexp to match your URL pattern
    var INTERNAL_MATCH = /(local|solutionset)/;
    var CQ_URL_MATCH = /\/(content|wcm|dam(admin)?|cq|crx|replication|siteadmin|cf)\#?\//;


    var isFrontEnd = !!document.querySelector('.parsys');
    var isAdmin = CQ_URL_MATCH.test(window.location.href) || !!document.querySelector('.cq-packagemgr');
    var CQ = isFrontEnd || isAdmin || !!document.querySelector('#CQ') || !!document.querySelector('.crx-switcher');
    var isCQ = !!CQ;
    var isInternal = INTERNAL_MATCH.test(window.location.hostname);
    var isIframe = (window.self !== window.top);
    var cqFrame = document.querySelector('#cq-cf-frame');
    var toolbarId = 'cq-env-toolbar';
    var cssText = '#'+toolbarId+'{z-index: 9999;position:fixed;top:0;left:0;height:2rem;width:200px;margin:1rem 3rem 3rem 1rem;background:#aaa;color:#fff;font-size:1rem;font-family:Arial,sans-serif;font-weight:200;padding:.4rem;overflow:hidden;opacity:.75;border-radius:4px;box-shadow:0 0 5px 0 rgba(0,0,0,0.65);-moz-transition:height .5s ease-in-out,opacity .3s ease-in-out;-webkit-transition:height .5s ease-in-out,opacity .3s ease-in-out;transition:height .5s ease-in-out,opacity .3s ease-in-out}#cq-env-toolbar a{color:inherit}#cq-env-toolbar:hover{height:5rem;opacity:1}#cq-env-toolbar.client{background:red;color:#fff}#cq-env-toolbar.dev{background:green;color:#fff}#cq-env-toolbar.dev .client{display:none}#cq-env-toolbar.client .dev{display:none}#cq-env-toolbar .client,#cq-env-toolbar .dev{display:block;font-weight:bold;font-size:1.3em}#cq-env-toolbar .button{display:block;padding:0 .5em;line-height:2em;text-align:right}#cq-env-toolbar .enable{display:none}#cq-env-toolbar.no-wcm .enable{display:inline}#cq-env-toolbar.no-wcm .disable{display:none}';
    var toolbarText = '<span class="client">CLIENT SERVER!</span><span class="dev">DEV SERVER!</span><ul><li><a href="#" class=" toggle-wcm enable">Enable WCM</a><a href="#" class=" toggle-wcm disable">Disable WCM</a></li><li><a id="cqn-actTree" href="/etc/replication/treeactivation.html" target="_blank">Bulk Activation</a></li></ul>';
    var actTree, actTreeStartPath, actTreeStartField, notice, styles, noticeTxt, width, classes, tmp;

    /**
    * getParam retrieves url parameter values
    * @param  {String} name The Param name
    * @return {String}      The Param value or null
    */
    function getParam(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, ' '))||null;
    };
    function attachEvent(element, event, callbackFunction) {
        if (element.addEventListener) {
            element.addEventListener(event, callbackFunction, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + event, callbackFunction);
        }
        return true;
    }
    function getParam(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, ' '))||null;
    }
    function toggleWCMClass(disable) {
        disable = disable || /wcmmode\=disabled/.test(window.location.search);
        var classes = notice.className.replace(/\s?(no-wcm|wcm)/, '');
        if (disable) {
            classes += ' no-wcm';
        } else {
            classes += ' wcm';
        }
        notice.className = classes;
    }

    try {
        if (isCQ && (!!cqFrame || !isIframe)) {
            console.debug('CQ instance detected. Injecting helper toolbar');
            // In admin view, block disabling WCM
            if (isAdmin) {
                tmp = toolbarText.replace(/<a .*?class="(.*?toggle-wcm.*?)">(.*?)<\/a>/, '');
                toolbarText = tmp;
            }

            notice = document.createElement('div');
            styles = document.createElement('style');
            cssText = document.createTextNode(cssText);
            actTreeStartPath = getParam('startPath');

            notice.innerHTML = toolbarText;
            styles.appendChild(cssText);
            notice.id = toolbarId;
            notice.className = ' dev ';
            toggleWCMClass();

            if (!isInternal) {
                // Client servers
                notice.className = notice.className.replace('dev', 'client');
            } else {
                // Solset servers
                notice.className = notice.className.replace('client', 'dev');
            }

            // Setup events
            attachEvent(notice, 'mouseup', function(e) {
                e.preventDefault();
                if (/toggle-wcm/.test(e.target.className)) {
                    var isDisabled = getParam('wcmmode') === 'disabled';
                    var location = window.location.href.replace(/(\?|&)wcmmode\=disabled/, '');
                    var delimiter = /(\?|&)/.test(window.location.href) ? '&' : '?';

                    if (isDisabled) {
                        window.location.href = window.location.origin+'/cf#'+window.location.pathname;
                    } else {
                        window.location.href = window.location.href.replace('/cf#', '') + delimiter + 'wcmmode=disabled';
                    }
                }
            });

            setTimeout(function() {
                if (isInternal) {
                  document.title = 'DEV: '+document.title;
                } else {
                  document.title = 'CLIENT: '+document.title;
                }
                if (isFrontEnd) {
                    notice.className += ' frontend';
                }

                // Auto populate the StartPath field on tree activation page
                actTreeStartField = document.querySelector("[name='fakePathField']");
                if (!!actTreeStartField && actTreeStartPath) {
                    actTreeStartField.value = document.querySelector('#path').value = actTreeStartPath;
                    actTree.style.display = 'none';
                }
            }, 2000);

            document.body.appendChild(styles);
            document.body.appendChild(notice);

            actTree = document.querySelector('#cqn-actTree');
            attachEvent(actTree, 'click', function(e) {
                e.preventDefault();
                var url = this.href;
                var rxPath = /#(\/.*)/;
                var path = window.location.href.match(rxPath);

                if (path.length && !!path[1]) {
                    path = path[1];
                    if (/\.html[?\n\r]/.test(path)) {
                        path = (path.match(/(\/.*)\/[^\/]+/))[0];
                    }
                    path = "?startPath="+path;
                    url = url+path;
                    window.open(url, "_blank");
                }
            });

        } else {
            console.error('This doesn\'t appear to be a CQ intstance, is within an iframe.');
            console.error(location.href, 'isCQ=', isCQ, 'isIframe=', isIframe);
        }
    } catch(e) {
        // console.error(DOMException.message);
        console.error(e.DOMException);
        console.error(e.DOMException.stack);
    }

    return isCQ && isInternal;
}

clientCQ();