// ==UserScript==
// @name           count_who_faved_on_favotter
// @version        2.0.1
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    count how many posts each user has faved on Favotter
// @include        http://favotter.net/user.php?*
// @include        http://favotter.net/user/*
// @include        http://en.favotter.net/user.php?*
// @include        http://en.favotter.net/user/*
// ==/UserScript==
(function () {
    var newTag = function (tag) {
        var elem = document.createElement(tag);
        for (var i = 1; i < arguments.length; i++) {
            elem.appendChild(arguments[i]);
        }
        return elem;
    };
    var newText = function (text) {
        return document.createTextNode(text);
    };
    
    // the field for summarize
    var notifier = document.createElement('div');
    with (notifier.style) {
        textAlign = 'center';
        color = '#000000';
        backgroundColor = '#EEEEEE';
        borderColor = '#CCCCCC';
        borderLeftStyle = 'solid';
        borderWidth = 'medium';
        position = 'fixed';
        height = document.documentElement.clientHeight + "px";
        width = '150px';
        overflowY = 'scroll';
        overflowX = 'visible';
        bottom = 0;
        right = 0;
    }
    var table = newTag('table');
    var button = newTag('button', newText('summarize'));
    button.setAttribute("type", "button");
    notifier.appendChild(table);
    notifier.appendChild(button);
    document.body.appendChild(notifier);
    
    var show = function () {
        var faved = document.getElementsByClassName("fav_icon");
        var names = [];
        var counts = {};
        var images = {};
        var summary = 0;
        for (var i = 1; i < faved.length; i++) {
            if (faved[i].parentNode.parentNode.tagName == "SPAN") {
                var name = faved[i].title;
                if (name in counts) {
                    ++counts[name];
                } else {
                    names.push(name);
                    counts[name] = 1;
                    images[name] = faved[i].src;
                }
                ++summary;
            }
        }
        names.sort(function (a,b) counts[b] - counts[a]);
        table.innerHTML = '';
        for (var i = 0; i < names.length; i++) {
            var img = newTag('img');
            img.className = 'fav_icon on_notifier';
            img.title = img.alt = names[i];
            img.src = images[names[i]];
            img.addEventListener('click', function (e) {
                e.preventDefault();
                var entries = document.getElementsByClassName('hentry');
                var onNotifier = document.getElementsByClassName('on_notifier');
                var aps = document.getElementsByClassName('autopagerize_page_separator');
                var api = document.getElementsByClassName('autopagerize_page_info');
                if (e.target.style.opacity == '2') {
                    for (var i = 0; i < entries.length; i++) {
                        entries[i].style.display = 'block';
                    }
                    for (var i = 0; i < onNotifier.length; i++) {
                        onNotifier[i].style.opacity = '1';
                    }
                    for (var i = 0; i < aps.length; i++) {
                        aps[i].style.display = api[i].style.display = 'block';
                    }
                } else {
                    var name = e.target.title;
                    for (var i = 0; i < entries.length; i++) {
                        var find = false;
                        var icons = entries[i].getElementsByClassName('fav_icon');
                        for (var j = 0; j < icons.length; j++) {
                            if (icons[j].title == name) {
                                find = true;
                                break;
                            }
                        }
                        entries[i].style.display = find ? 'block' : 'none';
                    }
                    for (var i = 0; i < onNotifier.length; i++) {
                        onNotifier[i].style.opacity = onNotifier[i].title == name ? '2' : '0.1';
                    }
                    for (var i = 0; i < aps.length; i++) {
                        aps[i].style.display = api[i].style.display = 'none';
                    }
                }
            }, false);
            table.appendChild(
                newTag('tr',
                       newTag('td', img),
                       newTag('td', newText('×' + counts[names[i]]))
                )
            );
        }
        table.appendChild(newTag('tr', newTag('td', newText('users:')), newTag('td', newText(names.length))));
        table.appendChild(newTag('tr', newTag('td', newText('summary:')), newTag('td', newText(summary))));
    }
    button.addEventListener("click", function (e) {
        show();
    }, false);
    show();
})();
