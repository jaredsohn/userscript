// ==UserScript==
// @name         EpisodeCalendar.com Enhancer
// @namespace    http://sven.schoenung.org/
// @version      1.0.1
// @copyright    2012 Sven Schoenung <sven@schoenung.org>
// @license      MIT License
// @description  Usability enhancements for EpisodeCalendar.com
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require      http://biostall.com/wp-content/uploads/2010/07/jquery-swapsies.js
// @require      http://jquery-json.googlecode.com/files/jquery.json-2.3.min.js
// @include      http://episodecalendar.com/*
// ==/UserScript==  

/*
Copyright (C) 2012 Sven Schoenung <sven@schoenung.org>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/*jshint bitwise: true, curly: true, eqeqeq: true, forin: true, immed: false,
latedef: false, newcap: true, noarg: true, noempty: true, nonew: false, plusplus: false, 
regexp: false, undef: true, strict: true, trailing: true, multistr: true*/

var version = 1.0;

var ShowSorter = (function() {
    'use strict';

    var style = '\
        color:black;\
        border: 1px solid #dddddd;\
        border-radius: 5px;\
        display: inline-block;\
        line-height: 1.5em;\
        margin: 0 0 5px;\
        padding: 10px;\
        background-color: #eeeeee;\
        margin-top: 0pt;\
        margin-right: 1px;\
        margin-bottom: 5px;\
        margin-left: 1px;\
        padding-top: 5px;\
        padding-right: 5px;\
        padding-bottom: 5px;\
        padding-left: 5px;';


    var Show = (function() {
        function Show(dom) {
            this.dom = dom;
        }
        function extract(show, regex) {
            var text = $('span', show.dom).text();
            return parseInt(text.replace(regex, '$1'), 10);
        }
        Show.prototype.getFollowers = function() {
            if (this.followers === undefined) {
                this.followers = extract(this, /.*Followers:\s*(\d+).*/);
            }
            return this.followers;
        };
        Show.prototype.getEpisodes = function() {
            if (this.episodes === undefined) {
                this.episodes = extract(this, /.*Episodes:\s*(\d+).*/);
            }
            return this.episodes;
        };
        Show.prototype.getName = function() {
            if (this.name === undefined) {
                this.name = $('a', this.dom).text().toLowerCase();
            }
            return this.name;
        };
        return Show;
    })();

    var SortOptions = (function() {

        var SortOption = (function() {
            function SortOption(name, order, sortOptionsId) {
                this.name = name;
                this.order = order;
                this.id = 'sortOptions-' + sortOptionsId + '-' + name;
            }
            SortOption.prototype.invertOrder = function() {
                if (this.order === 'asc') { this.order = 'desc'; }
                else { this.order = 'asc'; }
            };
            return SortOption;
        })();

        function SortOptions(id) {
            var sortOptions = Object.create(Array.prototype);
            sortOptions.id = id;
            for (var property in SortOptions.prototype) {
                if (SortOptions.prototype.hasOwnProperty(property)) {
                    sortOptions[property] = SortOptions.prototype[property];
                }
            }
            return sortOptions;
        }
        SortOptions.prototype.indexOf = function(id) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].id === id) {
                    return i;
                }
            }
            return -1;
        };
        SortOptions.prototype.get = function(id) {
            var i = this.indexOf(id);
            return (i !== -1) ? this[i] : undefined;
        };
        SortOptions.prototype.getPrev = function(id) {
            var i = this.indexOf(id);
            return (i > 0) ? this[i - 1] : undefined;
        };
        SortOptions.prototype.getNext = function(id) {
            var i = this.indexOf(id);
            return (i >= 0 && i < this.length - 1) ? this[i + 1] : undefined;
        };
        SortOptions.prototype.swap = function(id1, id2) {
            var i1 = this.indexOf(id1);
            var i2 = this.indexOf(id2);
            var tmp = this[i1];
            this[i1] = this[i2];
            this[i2] = tmp;
        };
        SortOptions.prototype.load = function() {
            var storedSortOptions = GM_getValue('sortOptions.' + this.id);
            if (storedSortOptions === undefined) {
                this.push(new SortOption('name', 'asc', this.id));
                this.push(new SortOption('followers', 'desc', this.id ));
                this.push(new SortOption('episodes', 'desc', this.id));
            }
            else {
                var that = this;
                $.each($.parseJSON(storedSortOptions), function() {
                    that.push(new SortOption(this.name, this.order, that.id));
                });
            }
        };
        SortOptions.prototype.store = function() {
            GM_setValue(
                'sortOptions.' + this.id,
                $.toJSON(this.map(function(sortOption) {
                    return { name: sortOption.name, order: sortOption.order };
                })
            ));
        };
        
        return SortOptions;
    })();

    function ShowSorter(header, id) {
        this.id = id;

        this.domSortOptions = undefined;
        this.domHeader = $('h2').filter(function() {
            return $(this).text() === header;
        });
        this.domShows = (function(elems, sel) {
            var result = elems.find(sel);
            return ((result.length > 0) ? result : elems.filter(sel)).first();
        })(this.domHeader.nextAll(), 'ul.show_list');

        this.sortOptions = new SortOptions(id);
        this.sortOptions.load();
        this.header = header;
        this.shows = $('li', this.domShows).map(function() {
            return new Show(this);
        });
    }

    ShowSorter.prototype.sortShows = function() {
        var sortOptions = this.sortOptions;
        var domShows = this.domShows;

        this.shows.sort(function(show1, show2) {
            for (var i = 0; i < sortOptions.length; i++) {
                var accessor = 'get' +
                                sortOptions[i].name.charAt(0).toUpperCase() +
                                sortOptions[i].name.substring(1);
                var val1 = show1[accessor].call(show1);
                var val2 = show2[accessor].call(show2);
                var cmp = (val1 < val2) ? -1 :
                          (val1 > val2) ? +1 : 0;
                if (cmp !== 0) {
                    return (('asc' === sortOptions[i].order) ? +1 : -1) * cmp;
                }
            }
            return 0;
        });

        var even = true;
        $.each(this.shows, function() {
            var domShow = $(this.dom);
            domShow.attr('class', (even) ? 'even' : 'odd');
            domShows.append(domShow);
            even = !even;
        });

        return this;
    };
  
    ShowSorter.prototype.install = function() {
        if (this.domSortOptions !== undefined) {
            return this;
        }

        var domSortOptions = $(
            '<ul id="sortOptions-' + this.id + '"' +
            '    class="sortOptionList"' +
            '    style="margin-bottom:15px; text-align:center;"></ul>'
        );

        (function(sorter) {
            function sortOption(id, children) {
                return '<li id="' + id + '"' +
                       '    style="display:inline-block; margin:0px 8px;">' +
                           children +
                       '</li>';
            }
            function button(text, cssClass, cssStyle) {
                cssStyle = cssStyle || '';
                return '<a href="#"' +
                       '   class="' + cssClass + '"' +
                       '   style="' + style + cssStyle + '">' + text + '</a>';
            }

            $.each(sorter.sortOptions, function() {
                var arrow = ('asc' === this.order) ? '▲' : '▼';
                var invertOrderText = arrow + ' ' + this.name + ' &nbsp;';
                $(sortOption(this.id,
                    button('&lt;', 'swapWithPrev') +
                    button(invertOrderText, 'invertOrder', 'width:13ex') +
                    button('&gt;', 'swapWithNext')
                )).appendTo(domSortOptions);
            });
        })(this);

        (function(sorter) {
            function swap(clicked, accessor) {
                var current = $(clicked).parent();
                var currentId = current.attr('id');
                var target = accessor.call(sorter.sortOptions, currentId);

                if (target !== undefined) {
                    var targetId = target.id;
                    current.swap({
                        target: targetId,
                        opacity: '0.5',
                        speed: 500
                    });
                    sorter.sortOptions.swap(currentId, targetId);
                }
            }
            function invertOrder(clicked) {
                var text = $(clicked).text();
                if (text.match(/▲/)) {
                        $(clicked).text(text.replace(/▲/g, '▼'));
                }
                else if (text.match(/▼/)) {
                        $(clicked).text(text.replace(/▼/g, '▲'));
                }

                var clickedId = $(clicked).parent().attr('id');
                sorter.sortOptions.get(clickedId).invertOrder();
            }

            domSortOptions.find('a').hover(
                function() { $(this).css('background', '#fbffc0'); },
                function() { $(this).css('background', '#eeeeee'); }
            );
            domSortOptions.find('.swapWithPrev').click(function() {
                swap(this, sorter.sortOptions.getPrev);
                sorter.sortOptions.store();
                sorter.sortShows();
                return false;
            });
            domSortOptions.find('.swapWithNext').click(function() {
                swap(this, sorter.sortOptions.getNext);
                sorter.sortOptions.store();
                sorter.sortShows();
                return false;
            });
            domSortOptions.find('.invertOrder').click(function() {
                invertOrder(this);
                sorter.sortOptions.store();
                sorter.sortShows();
                return false;
            });
        })(this);

        this.domSortOptions = domSortOptions;
        this.domSortOptions.insertAfter(this.domHeader);
        this.sortShows();
        return this;
    };
          
    return ShowSorter;
})();


var SettingsTab = (function() {
    'use strict';

    function SettingsTab(name, title, body, initializer) {
        this.name = name;
        this.title = title;
        this.body = body;
        this.initializer = initializer;
    }
    SettingsTab.prototype.install = function() {
        function tab(name, children) {
            var tabNum = $('li > a', tabs).length + 1;
            return '<li class="tab">' +
                   '  <a href="#' + tabNum + '">' + children + name + '</a>' +
                   '</li>';
        }
        function icon() {
            return '<img class="icon blocks" src="/assets/pixel.gif" alt=""' +
                   '     style="margin:4px; width:16px; height:16px" />';
        }
        function tabBody(title, children) {
            return '<div class="item"><h2>' + title + '</h2>' +
                   '  <form>' + children +
                   '  </form>' +
                   '</div>';
        }

        var tabs = $('#settings_pagination');
        $(tab(this.name, icon())).appendTo(tabs);

        var tabBodies = $('#carousel_items');
        $(tabBody(this.title, this.body)).appendTo(tabBodies);

        this.initializer.call(this);
    };
    return SettingsTab;
})();

var Settings = (function() {
    'use strict';

    function Settings(id, defaults) {
        this.id = id;
        this.defaults = defaults;
    }

    Settings.prototype.load = function() {
        var storedSettings = GM_getValue(this.id);
        storedSettings = (storedSettings !== undefined) ?
                         $.parseJSON(storedSettings) : this.defaults;
        for (var prop in storedSettings) {
            if (storedSettings.hasOwnProperty(prop)) {
                this[prop] = storedSettings[prop];
            }
        }
    };
    Settings.prototype.store = function() {
        GM_setValue(this.id, $.toJSON((function() {
            var props = {};
            for (var prop in this) {
                if (this.hasOwnProperty(prop) &&
                    prop !== "id" && prop !== "defaults") {
                    props[prop] = this[prop];
                }
            }
            return props;
        }).call(this)));
    };

    return Settings;
})();

(function() {
    'use strict';

    var settings;

    function addSettingsTabs() {
        function checkbox(name, label) {
            return '<input type="checkbox" class="checkbox"' +
                   '       id="' + name + '" name="' + name + '"' +
                           ((settings[name]) ? ' checked="checked"' : '') +
                   '/><label for="' + name + '">' + label + '</label>';
        }
        function link(text, url) {
            return '<a href="' + url + '">' + text + '</a>';
        }
        function group(title, children) {
            return '<p>' + title + '<br/>' + children + '</p>';
        }
        function button(id, value) {
            return '<input type="button" class="awesome magenta"' +
                   '       id="' + id + '" value="' + value + '" />';
        }
    
        new SettingsTab('Enhancer', 'Enhance EpisodeCalendar.com!',
            group('Allow sorting of TV shows in the ' +
                  link('All Shows', 'http://episodecalendar.com/shows') +
                  ' section',
                  checkbox('showSortOptions', 'Enable sorting')) +
            group('Do not show &quot;You might like these&quot; ' +
                  'recommendations',
                  checkbox('hideRecommendations', 'Hide recommendations')) +
            button('updateEnhancerSettings', 'Update'),
            function() {
                $('#updateEnhancerSettings').click(function() {
                    var checkboxes = ['showSortOptions', 'hideRecommendations'];
                    $.each(checkboxes, function(i, c) {
                        settings[c] = $('#' + c).attr('checked') === 'checked';
                    });
                    settings.store();
                    return false;
                });
            }
        ).install();
    
        $('#settings_pagination li a').css('font-size', '12px');
    }

    function installEnhancements() {
        if (settings.showSortOptions && location.pathname.match(/\/shows.*/)) {
            new ShowSorter('Active shows', 'activeShows').install();
            new ShowSorter('Ended shows', 'endedShows').install();
        }
    
        if (settings.hideRecommendations) {
            $('#amazon_products').parent().hide();
        }
    
        if (location.pathname.match(/\/account.*/)) {
            addSettingsTabs();
        }
    }

    function loadSettings() {
        settings = new Settings('settings', {
            showSortOptions: true,
            hideRecommendations: true
        });
        settings.load();
    }


    loadSettings();
    installEnhancements();
})();
