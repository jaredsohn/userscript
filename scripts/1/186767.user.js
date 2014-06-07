// ==UserScript==
// @name          4chan sidedish
// @author        saxamaphone69
// @version       0.6
// @grant         none
// #run-at        document-start
// @include       *://boards.4chan.org/*
// ==/UserScript==
/*
(function () {
    'use strict';
    var d = document,
        doc = d.documentElement;
    function init () {
        if (doc.classList.contains('index-loading')) {
            console.log('ITS HERE');
        }
    }
    new MutationObserver(init).observe(doc, {
        attributes: true,
        attributeFilter: ['class']
    });
})();
*/
(function() {
    'use strict';
    var d = document,
        doc = d.documentElement,
        body = d.body;
    doc.classList.add('chanx-loading');
    doc.classList.add('sidebar-inactive');
    var getID = function(id) {
        return d.getElementById(id);
    };
    function main() {
        var styles = d.querySelectorAll('style'),
            catalogLink = d.querySelector('.navLinks a[href$="catalog"]');
        for (var i = 0, j = styles.length; i < j; i++) {
            styles[i].remove();
        }
        catalogLink.classList.add('catalog-link');
        catalogLink.classList.add('sidedish-icon');
        catalogLink.innerHTML = '';
        function createElement(el, tag, id, cl) {
            var el = d.createElement(tag);
            el.id = id;
            if (cl) {
               el.classList.add(cl);
            } else {
            }
            body.appendChild(el);
        }
        createElement('sidebarToggle', 'div', 'sidebar-toggle');
        createElement('sidebar', 'div', 'sidebar');
        createElement('dams', 'div', 'dams', 'sidedish-icon');
        createElement('parentalMode', 'div', 'parental-mode', 'sidedish-icon');
        createElement('chanxsettings', 'div', 'chanxsettings', 'sidedish-icon');
        var Ssidebar = getID('sidebar');
        Ssidebar.appendChild(getID('dams'));
        Ssidebar.appendChild(getID('parental-mode'));
        Ssidebar.appendChild(getID('chanxsettings'));
        getID('dams').onclick = function() {
            doc.classList.toggle('dams');
        };
        getID('parental-mode').onclick = function() {
            doc.classList.toggle('parental-mode');
        };
        getID('chanxsettings').onclick = function() {
            d.dispatchEvent(new CustomEvent('OpenSettings'));
        };
        getID('sidebar-toggle').onclick = function() {
            if (doc.classList.contains('sidebar-inactive')) {
                doc.classList.remove('sidebar-inactive');
                doc.classList.add('sidebar-active');
            } else {
                doc.classList.remove('sidebar-active');
                doc.classList.add('sidebar-inactive');
            }
        };
        d.onkeyup = function (e) {
            var tag = e.target.tagName.toLowerCase();
            if (e.which === 190 && tag != 'input' && tag != 'textarea') {
                if (doc.classList.contains('sidebar-inactive')) {
                    doc.classList.remove('sidebar-inactive');
                    doc.classList.add('sidebar-active');
                } else {
                    doc.classList.remove('sidebar-active');
                    doc.classList.add('sidebar-inactive');
                }
                var leQR = d.querySelector('html.sidebar-active #qr');
                leQR.querySelector('textarea').focus();
            }
        };
    }
    function reShuffle() {
       var Ssidebar;
       function check() {
          var checkExist = setInterval(function() {
             if (d.getElementById('sidebar')) {
                Ssidebar = d.getElementById('sidebar');
                //console.log('The sidebar is finally here!');
                clearInterval(checkExist);
             }
          }, 100);
       }
       check();
       function checkNadd(el) {
          var checkExist = setInterval(function() {
             var elid = el.id;
             if (el) {
                Ssidebar.appendChild(el);
                //console.log(elid + ' was added to the sidebar!');
                clearInterval(checkExist);
             } //else {
             //   console.log(elid + ' wasn\'t there!');
             //}
          }, 100);
       }
       checkNadd(getID('header'));
       checkNadd(getID('qr'));
       checkNadd(getID('updater'));
       checkNadd(getID('thread-stats'));
       checkNadd(getID('thread-watcher'));
       checkNadd(d.querySelector('.catalog-link'));
       // These 3 no longer work...
       //checkNadd(getID('dams'));
       //checkNadd(getID('chanxsettings'));
       //checkNadd(getID('parental-mode'));
    }
    function reHTML() {
       var replytoviews = d.querySelectorAll('.postNum > span');
       var summaries = d.querySelectorAll('.summary');
       [].forEach.call(replytoviews, function(replytoview) {
           var replyLink = replytoview.querySelector('a').href;
           replytoview.innerHTML = '<a class="view-thread" href="' + replyLink + '">View</a>';
       });
       [].forEach.call(summaries, function(summary) {
           var summaryContent = summary.textContent;
           var newContent = summaryContent.replace(/(\d+)/g, '<span>$1</span>');
           summary.innerHTML = newContent;
       });
    }
    function pls() {
        // WHY DON'T YOU WORK ALL THE TIME
        doc.classList.remove('chanx-loading');
    }
    d.addEventListener('DOMContentLoaded', main, false);
    d.addEventListener('4chanXInitFinished', reShuffle, false);
    d.addEventListener('IndexRefresh', pls, false);
    d.addEventListener('IndexRefresh', setTimeout(reHTML, 2000), false);
})();