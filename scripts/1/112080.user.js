// ==UserScript==
// @name           deviantART bad ad report tool
// @namespace      -
// @include        http:///*.deviantart.com//*
// @include        https:///*.deviantart.com//*
// ==/UserScript==

var tries = 0;


window.addEventListener('DOMContentLoaded', function ()
{
    function da_iframeCheck ()
    {
        if (!content.location.host.match(/\.deviantart\.(?:com|net|lan)$/)) return;

        var eax, text, div, DORP, hax;
        eax = content.document.getElementById('__herrflorkadork');
        if (eax) {
            function addIFrameURLs (root, to, indent, level0)
            {
                var notables, i;

                notables = root.querySelectorAll(level0 ? 'iframe' : 'iframe,script,object,embed,img');
                for (i = 0; i != notables.length; i++) {
                    if (notables[i].src || notables[i].tagName.toLowerCase() == 'iframe') to.push(indent + notables[i].tagName + ': ' + (notables[i].src || '[?]'));
                    if (notables[i].tagName.toLowerCase() == 'iframe') {
                        if (!notables[i].contentDocument) {
                            to.push(indent+'\tERROR: Unable to see into frame');
                        }
                        else {
                            arguments.callee(notables[i].contentDocument, to, indent + '- - ', false);
                        }
                    }
                }
            }

            text = [];
            addIFrameURLs((eax.getElementsByTagName('iframe') || []).length ? ((hax = 1) && eax) : content.document.documentElement, text, '', true);

            //const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
            //gClipboardHelper.copyString(text.join('\n'));
            eax.id = '';

            div = content.document.createElement('div');
            content.document.body.appendChild(div);
            div.innerHTML = (
                 '<div style="padding:16px 32px 0 32px;width:500px;position:relative;display:none" id="__fffffft">'
                +'<h2>Report '+(hax ? 'This Ad' : 'All Ads on This Page')+'</h2>'
                +'<br>'
                +'<b>Report Type</b><br><select id="__fvs"><option value="fail">Select...</option><option disabled>&nbsp;<option value=1>Audio Ad / Played sound without me clicking<option value=2>Malware / Possible virus<option value=3>Opened a popup window without me clicking<option value=100>Other</select>'
                +'<br><br><b>Additional Info</b><br>What did the ad look like - what was it doing wrong? Any info helps:<br><textarea style="width:80%;height:70px" id="__fvt"></textarea>'
                +'<textarea style="display:none" id="__fvtr"></textarea>'
                +'<table align=center class=f><td><a class="smbutton smbutton-green" oonmouseover="prompt(\'\',this.getAttribute(\'onclick\', 2))" onclick="'
                +'try{ /* why try{}? no idea if da\'s core libs will change. need something clear-cut if this fails */'
                +'if ($(\'#__fvs\').val() == \'fail\') { alert(\'Please select a type of ad report from the list first.\');return false };'
                +'if (window.__fvDORP) return false;'
                +'if (!$(\'#__fvtr\').val()) return alert(\'Sorry, unable to generate a report on the ads on this page.\');'
                +'window.__fvDORP = 1;'
                +'$(this).css({opacity: .5, cursor: \'busy\'});'
                +'DiFi.pushPost(\'User\',\'sendAdCatchReport\',[$(\'#__fvs\').val(),$(\'#__fvtr\').val(),$(\'#__fvt\').val()],bind(this,' +'function (success, data)'
                +'{'
                    +'window.__fvDORP = 0;'
                    +'if (success) {$(\'#__kthxbye\').fadeIn();setTimeout(\'Modals.pop()\', 1500);return}'
                    +'$(this).css({opacity: 1, cursor: \'pointer\'});'
                    +'alert(\'Unable to send report. Please try again shortly.\');if (window.console) console.log(success,data);'
                +'}));DiFi.send();'
                +'}catch(e){alert(\'Unable to send report\')}'
                +';"><span>Send</span></a>' +'<td>&nbsp;&nbsp;<td><a class=smbutton onclick="Modals.pop()"><span>Cancel</span></a></table>'
                +'<div style="background:#e8f0ec;position:absolute;left:0;top:0;bottom:0;right:0;padding:80px 0;text-align:center;display:none;z-index:300" id="__kthxbye"><h2>Thank You</h2>'
                +'</div>'
            );
            content.document.getElementById('__fvtr').value = text.join('\n');
            content.setTimeout("Modals.push(content.document.getElementById('__fffffft'))", 1);
        }
        
        if (content.document.getElementById('more7-main') && !content.document.getElementById('herr-derr-copy-derr') && content.location.href.indexOf('https:') != 0) {
            content.document.getElementById('more7-main').innerHTML += ('<a class="mi" id="herr-derr-copy-derr" href="" onclick="this.firstChild.id=\'__herrflorkadork\';return false"><i class="i50"></i> Send Full Ad Report</a>');
            content.addEventListener('click', function (e)
            {
                var node;
                if (e.target.tagName == 'A' && (e.target.className||'').indexOf('subbyCloseX') >= 0 && e.target.getAttribute('onmouseover') /* <- prevent artup fakes */) {
                    e.stopPropagation();
                    e.preventDefault();
                    node = e.target;
                    while (node && (!(node.getElementsByTagName('iframe') || []).length || node.id)) node = node.parentNode;
                    if (!node) return alert("Sorry - no ads on this page could be analyzed for the report!\n\nIf there is a problem-ad on this page, please report it to the deviantART helpdesk.");
                    node.id = '__herrflorkadork';
                }
            }, false);
            content.addEventListener('mouseover', function (e)
            {
                if (e.target.tagName == 'A' && (e.target.className||'').indexOf('subbyCloseX') >= 0 && e.target.getAttribute('onmouseover') /* <- prevent artup fakes */) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }, true);
            //alert(content.window + ' ' + content.document + ' ' + content.addEventListener + ' ' + content.document.addEventListener);
            eax = content.document.createElement('style');
            eax.setAttribute('type', 'text/css');
            content.document.getElementsByTagName('head')[0].appendChild(eax);
            DORP = '.subbyCloseX {background-image:url(http://st.deviantart.net/minish/main/reportabang.png) !important;overflow:visible !important;text-indent:0 !important;color:transparent !important} .subbyCloseX:hover::after {content:"Report This Ad";position:absolute;color:#0060cb;border:2px solid #0060cb;background:white;font-weight:bold;right:0;white-space:nowrap;padding:2px 4px;top:15px}';
            if (eax.styleSheet) {
                eax.styleSheet.cssText = DORP;
            }
            else {
                eax.appendChild(content.document.createTextNode(DORP))
            }
        }
    }

    if (!content.location.host.match(/\.deviantart\.(?:com|net|lan)$/)) return;
    if (!content.document.documentElement.getAttribute('__norpadorp')) {
        content.document.documentElement.setAttribute('__norpadorp', '!');
        setInterval(da_iframeCheck, 500);
    }
}, true);
