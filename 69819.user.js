// ==UserScript==
// @name           hatena-bookmark karma
// @namespace      http://fuba.moaningnerds.org/
// @include        http://b.hatena.ne.jp/*
// @require        http://gist.github.com/3238.txt
// ==/UserScript==

var unfollow_threshold = -3;
var follow_threshold = 3;
var karma = (GM_getValue('karma')) ? eval(GM_getValue('karma')) : {};

function addkarma (name, value) {
    if (typeof(karma[name]) == 'undefined') {
        karma[name] = 0;
    }
    karma[name] += value;
    GM_setValue('karma', karma.toSource());
    return karma[name];
}

function printkarma () {
    $X('(//ul[@class="comment"] | (//ul[contains(@class, "bookmark-list")])[1])/li').forEach(
        function (li) {
            if ($X('./span[@class="karma-indicator"]', li).length > 0) return;
            var username_elem = $X('./a[@class="username"]', li)[0];
            var username = username_elem.innerHTML;
            
            var karma_value = document.createElement('span');
            var user_karma = karma[username] || 0;
            karma_value.innerHTML = (user_karma > 0) ? '+'+user_karma : user_karma;
            karma_value.className = username+'-karma karma-value';
            if (user_karma == 0) {
                karma_value.style.display = 'none';
            }
            
            var karma_indicator = document.createElement('span');
            karma_indicator.className = 'karma-indicator';
            //karma_indicator.appendChild(document.createTextNode('('));
            karma_indicator.appendChild(karma_value);
            //karma_indicator.appendChild(document.createTextNode(')'));
            
            username_elem.parentNode.insertBefore(
                karma_indicator, username_elem.nextSibling
            );
            
            var karma_controller = document.createElement('div');
            karma_controller.className = 'karma-controller';
            karma_controller.style.display = 'inline';
            
            [
                { label: '++', name: 'increment', value: 1 },
                { label: '--', name: 'decrement', value: -1 }
            ].forEach( function (method) {
                var button = document.createElement('span');
                button.className = 'karma-'+method.name;
                button.appendChild(document.createTextNode(method.label));
                var change_value = function () {
                    var newkarma = addkarma(username, method.value);
                    $X(
                        '//span[contains(@class, "'+username+'-karma")]'
                    ).forEach(
                        function (each_karma_value) {
                            each_karma_value.innerHTML = (newkarma > 0) ? '+'+newkarma : newkarma;
                            
                            if (newkarma == 0)
                                each_karma_value.style.display = 'none'
                            else
                                each_karma_value.style.display = 'inline';
                        }
                    );
                    
                    if (method.name == 'decrement' && newkarma == unfollow_threshold) {
                        if (location.href.match(/\/favorite/))
                            window.open('/'+username+'/follow.unfollow')
                        else
                            window.open('/'+username+'/ignore.ignore');
                    }
                    if (method.name == 'increment' && newkarma == follow_threshold && !location.href.match(/\/favorite/)) {
                        window.open('/'+username+'/follow.follow');
                    }
                };
                button.addEventListener('click', change_value, true);
                
                karma_controller.appendChild(button);
            });
            
            li.appendChild(karma_controller);
        }
    );
}

printkarma();

if (
    unsafeWindow.Hatena
    && unsafeWindow.Hatena.Bookmark
    && unsafeWindow.Hatena.Bookmark.AutoPagerize
    && unsafeWindow.Hatena.Bookmark.AutoPagerize.instance
) {
    var autopager = unsafeWindow.Hatena.Bookmark.AutoPagerize.instance;
    autopager.oldAddEventListener('complete', function(){
        setTimeout(function(){
            printkarma();
        },10);
    });
}

GM_addStyle([[
    '.karma-indicator {margin-left: 0.3em; font-family: monospace; font-size: 0.8em;}',
    '.karma-value {color: #f30;}',
    '.karma-controller {display: inline; font-family: monospace; padding-left: 0.2em;}',
    '.karma-decrement {color: #66f; padding: 2px;}',
    '.karma-increment {color: #f66; padding: 2px;}'
].join("\n")]);


