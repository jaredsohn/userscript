// ==UserScript==
// @name        LpTable
// @namespace   http://rickey-nctu.blogspot.tw/
// @description Transform Launchpad bug list to be a table with ability of sortable, filterable and unlimit bugs number
// @include     *bugs.launchpad.net/*
// @version     6
// @grant       GM_getValue
// @grant       GM_setValue
// @require     http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.7.2.js
// @require     http://datatables.net/release-datatables/media/js/jquery.dataTables.js
// ==/UserScript==

//var old_div = $bugs_table_listing.html();

var dell_acan = null;

String.prototype.zfill = function (width) {
    return this.length >= width ? this : new Array(width - this.length + 1).join('0') + this;
};

var models = {
    columns: {
        show_id: true, show_tag: true, show_reporter: false, show_targetname: false,
        show_assignee: true, show_date_last_updated: true, 
        show_datecreated: false, show_importance: true, show_heat: false,
        show_milestone_name: false, show_status: true, show_dell_hps: true
    },
    side: true,
    save: function() {
        var me = this;
        $.each(me.columns, function(index, value) {
                me.columns[index] = value;
                GM_setValue(index, value);
        });
        GM_setValue('side', me.side);
    },
    load: function() {
        var me = this;
        $.each(me.columns, function(index, value) {
                me.columns[index] = GM_getValue(index, value);
        });
        me.side = GM_getValue('side', me.side);
    },
};


var columns_box = {
    'init': function() {
        var me = this;
        if (me._is_init !== undefined) {
            return me;
        }
        me._is_init = true;
        var html = '' +
            '<div class="pretty-overlay-window yui3-buglisting-config-util-overlay yui3-widget yui3-overlay yui3-pretty-overlay yui3-lazr-formoverlay yui3-widget-positioned yui3-widget-stacked" style="left: 376.5px; top: 107.5px; z-index: 1000; display: none;" id="config-col-box">' + 
            '    <div class="content_box_container">' + 
            '        <div class="close"><a class="close-button" title="Close" href="#">(x)</a>' +
            '        </div>' +
            '        <div class="yui3-lazr-formoverlay-content yui3-widget-stdmod">' +
            '            <div class="yui3-widget-hd" style="padding: 10px">' + 
            '                <h2>Visible information</h2>' + 
            '            </div>' + 
            '            <div class="steps">' + 
            '                <div style="width: 100%;" class="step-on"></div>' + 
            '            </div>' + 
            '            <div class="yui3-widget-bd" style="padding: 10px">' + 
            '                <div>' + 
            '                    <div class="yui3-lazr-formoverlay-form-header"></div>' + 
            '                        <ul class="buglisting-opts">' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Number" name="show_id" class="show_id">' + 
            '                                <label for="show_id_id">Number</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Information Type" name="show_information_type" class="show_information_type">' + 
            '                                <label for="show_information_type_id">Information Type</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Tags" name="show_tag" class="show_tag">' + 
            '                                <label for="show_tag_id">Tags</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Reporter" name="show_reporter" class="show_reporter">' + 
            '                                <label for="show_reporter_id">Reporter</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Package/Project/Series name" name="show_targetname" class="show_targetname">' + 
            '                                <label for="show_targetname_id">Package/Project/Series name</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Assignee" name="show_assignee" class="show_assignee">' + 
            '                                <label for="show_assignee_id">Assignee</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Date last updated" name="show_date_last_updated" class="show_date_last_updated">' + 
            '                                <label for="show_date_last_updated_id">Date last updated</label>' + 
            '                            </li>' + 
            '                            <li style="display:none">' + 
            '                                <input type="checkbox" checked="" value="Age" name="show_datecreated" class="show_datecreated">' + 
            '                                <label for="show_datecreated_id">Age</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Importance" name="show_importance" class="show_importance">' + 
            '                                <label for="show_importance_id">Importance</label>' + 
            '                            </li>' + 
            '                            <li style="display: none">' + 
            '                                <input type="checkbox" checked="" value="Heat" name="show_heat" class="show_heat">' + 
            '                                <label for="show_heat_id">Heat</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Milestone" name="show_milestone_name" class="show_milestone_name">' + 
            '                                <label for="show_milestone_name_id">Milestone</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Status" name="show_status" class="show_status">' + 
            '                                <label for="show_status_id">Status</label>' + 
            '                            </li>' + 
            '                            <li>' + 
            '                                <input type="checkbox" checked="" value="Hps" name="show_dell_hps" class="show_status">' + 
            '                                <label for="show_status_id">HPS</label>' + 
            '                            </li>' + 
            '                        </ul>' + 
            '                        <div class="yui3-lazr-formoverlay-actions">' + 
            '                            <button name="field.actions.cancel" type="button">Update</button>' + 
            '                        </div>' + 
            '                </div>' + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' + 
            '</div>';
        $('body').prepend(html);

        $('#config-col-box button').click(function() {
                me.hide(true);
        });
        $('#config-col-box .close-button').click(function() {
                me.hide(false);
        });
        $('#open-config-col-box').click(function() {
                me.show();
        });
        return me;
    },
    'show': function() {
        var me = this;
        me.init();
        if (me._is_shown === true) {
            return;
        }
        me._is_shown = true;
        me._origin = {};
        $.each(models.columns, function(index, value) {
                me._origin[index] = models.columns[index];
                $("input[name=" + index + "]").prop('checked', models.columns[index]);
        });
        var w = $('#config-col-box').width();
        var h = $('#config-col-box').height();
        var ww = $(window).width();
        var wh = $(window).height();
        $('#config-col-box').css('left', (ww - w) / 2);
        $('#config-col-box').css('top', (wh - h) / 2);
        $('#config-col-box').show();
    },
    'hide': function(updated) {
        var me = this;
        me.init();
        if (me._is_shown === false) {
            return;
        }
        me._is_shown = false;
        var refresh = false;
        $('#config-col-box').hide();
        if (!updated)
            return;
        $.each(models.columns, function(index, value) {
                models.columns[index] = $("input[name=" + index + "]").prop('checked');
                if (me._origin[index] != models.columns[index]) {
                    refresh = true;
                }
        });
        models.save();
        if (refresh)
            window.location.reload();
    },
};

var lptable_box = {
    'init': function() {
        var me = this;
        if (me._is_init !== undefined) {
            return me;
        }
        me._is_init = true;
        var $bugs_table_listing = $('#bugs-table-listing');
        var nav = '<span id="nav"><a id="getMore" href="#">more</a>, <a id="getMoreMore" href="#">more x 2</a>, <a id="getAll" href="#">all</a></span>';

        $bugs_table_listing.html(
            $('<table>').attr('class', 'upper-batch-nav').attr('style', 'width: 100%')
                .append($('<tbody>')
                    .append($('<tr>')
                        .append($('<td><span id="nav-column"><span id="nav-index">').attr('class', 'batch-navigation-index').attr('style', 'white-space: nowrap'))
                        .append($('<td>').attr('class', 'batch-navigation-links')
                                         .attr('style', 'text-align: right; white-space: nowrap')
                                         .html(nav)))))
            .append('<div id="alert" class="alert" style="display: none">abcdefg</div>')
            .append($('<table>').attr('id', 'lptable'));

        $('#nav-column').append('<span class="config-widget yui3-buglisting-config-util-content"><a class="sprite config action-icon" title="Customise visible bug information" id="open-config-col-box">Configure</a></span>');
        $('#getMore').click(function() { me.more(); });
        $('#getMoreMore').click(function() {
                me.limit += 150;
                me.more();
        });
        $('#getAll').click(function() {
                me.limit = me.lpCache[me.lpCache.length - 1].total;
                me.more();
        });
        $('#lptable').dataTable( {
            "bPaginate": false,
            "bLengthChange": false,
            "bAutoWidth": false,
            "bFilter": true,
            "oLanguage": {
                    "sSearch": "Filter: "
                },
            "sDom": '<fr>t<>',
            "aaSorting": [[ 5, "desc" ]],
            "aoColumns": [
                { "sTitle": "#", "bVisible": models.columns.show_id},
                { "sTitle": "Importance", "bVisible": models.columns.show_importance },
                { "sTitle": "Status", "bVisible": models.columns.show_status },
                { "sTitle": "Title" },
                { "sTitle": "ago", "bVisible": false},
                { "sTitle": "Last Updated", "iDataSort": 4, "bVisible": models.columns.show_date_last_updated},
                { "sTitle": "Reporter", "bVisible": models.columns.show_reporter },
                { "sTitle": "Assignee", "bVisible": models.columns.show_assignee },
                { "sTitle": "Project", "bVisible": models.columns.show_targetname },
                { "sTitle": "Milestone", "bVisible": models.columns.show_milestone_name },
                { "sTitle": "Tag", "bVisible": models.columns.show_tag },
                { "sTitle": "HPS", "bVisible": models.columns.show_dell_hps, "sClass": "hps" }
            ]
        } );
        me.more();
    },
    'more': function() {
        var me = this;
        $('#nav').hide();
        var memo,
            start,
            url,
            searchFields,
            jqxhr;
        memo = start = 0;

        if (me.lpCache.length > 0) {
            memo = me.lpCache[me.lpCache.length - 1].next.memo;
            start = me.lpCache[me.lpCache.length - 1].next.start;
        }
        url = "?orderby=-date_last_updated&memo=" + memo + "&start=" + start;
        searchFields = window.location.search.substr(1).split("&");
        if (searchFields.length > 0) {
            $.each(searchFields, function (index, value) {
                if (value.indexOf("orderby=") === 0) {
                } else if (value.indexOf("start") == 0) {
                } else if (value.indexOf("memo") == 0) {
                } else {
                    url += "&" + value;
                }
            });
        }
        jqxhr = $.get(url, function (data) {
            console.log("success to load data");
            //console.log(me);
            //console.log( data );
            var start = data.indexOf('LP.cache =') + 10,
                end = data.indexOf('</script>', start),
                temp = eval('temp =' + data.substring(start, end)),
                visible_items = (temp.start + parseInt(temp.mustache_model.items.length, 10));
            me.lpCache.push(temp);
            if ((models.columns.show_dell_hps && dell_hps != null) || !models.columns.show_dell_hps) {
                console.log('update from ajax');
                me.update();
            }
            if (visible_items < me.limit) {
                setTimeout(function() { me.more(); }, 0);
            } else {
                me.limit = visible_items;
                $('#nav').show();
            }
        })
        .done(function () {
        })
        .fail(function () {
            console.log("fail to load data");
            $('#alert').fadeIn();
            $('#alert').text('Error to loading bugs. Please refresh the page');
            $('#nav').show();
        })
        .always(function () {
        });

    },
    update: function() {
        var me = this;
        if (me.lpCache.length <= 0) {
            return;
        }
        var temp = me.lpCache[me.lpCache.length - 1];
        var visible_items = (temp.start + parseInt(temp.mustache_model.items.length, 10));
        var $nav_index = $('#nav-index');
        var $tbody = $('#lptable').dataTable();
        $nav_index.html('<strong>1</strong>→<strong>' + visible_items + '</strong> of ' + temp.total);
        $.each(me.lpCache.slice(me.index), function(index, value) { $tbody.fnAddData(me.lpcache2array(value)); });
        me.index = me.lpCache.length;
    },
    lpcache2array: function(lp) {
        var items = [];
        $.each(lp.mustache_model.items, function (index, data) {
            var tags = '';
            var assignee = data.assignee === null ? '' : data.assignee;
            var sortWeight = data.last_updated.replace('on ', '');
            var rowData;
            var hps_importance = 0;
            var hps_hwe = 0;
            var hps_acan = 0;
            $.each(data.tags, function (index, value) {
                tags += '<a href="' + value.url + '">' + value.tag + '</a><br/>';
                if (value.tag.indexOf('hwe') >= 0) {
                    hps_hwe = 0.2;
                }
                if (models.columns.show_dell_hps && dell_hps != null && value.tag in dell_hps) {
                    var date_fields = dell_hps[value.tag].split("-");
                    var acan_date = new Date(date_fields[0], parseInt(date_fields[1]) - 1, date_fields[2])
                    var today = new Date();
                    var diff = acan_date - today; //unit is milliseconds
                    diff = Math.round(diff/1000/60/60/24);
                    if (diff < 28) hps_acan += 0.1;
                    if (diff < 21) hps_acan += 0.1;
                    if (diff < 14) hps_acan += 0.1;
                    if (diff < 7 ) hps_acan += 0.1;
                }
            });
            if (sortWeight.indexOf('ago') >= 0) {
                if (sortWeight.indexOf('hour') >= 0)
                    sortWeight = '800' + ('' + (100 - parseInt(sortWeight, 10))).zfill(2);
                else
                    sortWeight = '899' + ('' + (100 - parseInt(sortWeight, 10))).zfill(2);
            }
            var rate_dic = {'Critical':1.6, 'High':1.0, 'Medium': 0.3, 'Low': 0.2, 'Wishlist': 0.1, 'Undecided': 0.0};
            if (data.importance in rate_dic) {
                hps_importance += rate_dic[data.importance];
            }
            rowData = [
                    '<a href="' + data.bug_url + '">' + data.id + '</a>',
                    data.importance,
                    data.status,
                    data.title,
                    sortWeight,
                    data.last_updated.replace('on ', ''),
                    data.reporter,
                    assignee,
                    data.bugtarget,
                    data.milestone_name === null ? '' : data.milestone_name,
                    tags,
                    Math.round((hps_importance + hps_acan + hps_hwe)*10)/10
                ];
            items.push(rowData);
        });
        return items;
    },
    limit: 75,
    lpCache: [],
    index: 0,
};

function initStyleSheets() {
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    var css_alert = '.alert {padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px; color: #468847; background-color: #dff0d8; border-color: #d6e9c6}';

    addGlobalStyle(css_alert);
    var stylesheets = ['https://dl.dropboxusercontent.com/u/23905041/media/css/demo_table.css',
                       'https://dl.dropboxusercontent.com/u/23905041/media/css/jquery.dataTables.css'
                       ];
    $.each(stylesheets, function(index, value) {
        var link = window.document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = value;
        document.getElementsByTagName("HEAD")[0].appendChild(link);
    });
}

var drawer_box = {
    'init': function() {
        console.log('drawer_box >');
        var me = this;
        if (me._is_init !== undefined) {
            return me;
        }
        me._is_init = true;
        var $maincontent = $('#maincontent');
        $maincontent.after('<div class="yui-b side" style="width: 50px"><div id="drawer-button" class="portlet">&gt;&gt;</div></div>');
        $('#drawer-button').click(function() { me.toggle() });
        me._is_on = true;
        me.old_me_w = $('#maincontent > div').width();
        me.old_right_w = $('#side-portlets').width();
        if (models.side) {
            me.on();
        } else {
            me.off();
        }
        console.log('drawer_box <');
    },
    'on': function() {
        var me = this;
        $('#maincontent > div').width(me.old_me_w);
        $('#side-portlets').show();
        $('#drawer-button').html('&gt;&gt;');
        models.side = me._is_on = true;
        models.save();
    },
    'off': function() {
        var me = this;
        $('#maincontent > div').width($('#side-portlets').width() + $('#maincontent > div').width());
        $('#side-portlets').hide();
        $('#drawer-button').html('&lt;&lt;');
        models.side = me._is_on = false;
        models.save();
    },
    'toggle': function() {
        var me = this;
        if (me._is_on) {
            me.off();
        } else {
            me.on();
        }
    },
};

function dell_special() {
    url = "https://bugs.launchpad.net/dell/+bug/1236693"
    jqxhr = $.get(url, function (data) {
        //console.log( data );
        var start = data.indexOf('<div id="yui_3_10_3_1_1382688941269_176" class="yui3-editable_text-text">'),
            end = data.indexOf('</p>', start + 10),
        start = data.indexOf('<p>', start + 10) + 3
        json = data.substring(start, end)
        //console.log(json)
        json = $('<div/>').html(json).text();
        console.log(json)
        json = JSON && JSON.parse(json) || $.parseJSON(json);
        json = json.platforms;
        dell_hps = {};
        $.each(json, function(index, value) {
            dell_hps[value.name] = value.acan;
        });

        if (models.columns.show_dell_hps) {
            lptable_box.update();
        }
    })
    .done(function () {
    })
    .fail(function () {
        console.log("fail to load data");
        //$('#alert').fadeIn();
        //$('#alert').text('Error to loading bugs. Please refresh the page');
        //$('#nav').show();
    })
    .always(function () {
    });
}

function init() {
    initStyleSheets();

    models.load();

    lptable_box.init();
    columns_box.init();
    drawer_box.init();
    if (models.columns.show_dell_hps) {
        dell_special();
    }
}

(function() {
    init();
})();
