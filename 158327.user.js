// ==UserScript== 
// @name AugmentedPASS
// @author the.dw.coder
// @version 2.1
// @description View PolyRatings in PASS
// @include http://pass.calpoly.edu/main.html
// @include http://pass.calpoly.edu/saved.html
// @require http://code.jquery.com/jquery-1.9.0.min.js
// @grant GM_getResourceText
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

function main() {
    var COLOR = {
            'SAFE': "#00CC00",
            'WARN': "#FFDD00",
            'FULL': "#CC0000",
            'CNCL': "#AAAAAA"
        },
        PASS_PAGE = {
            '0': {
                'finals': true
            },
            '1': {
                'topSelector': 'div.select-course',
                'selector': 'table.no-bg tbody tr',
                'name': 4,
                'avail': 5,
                'taken': 6,
                'length': 14,
                'ignoreFirst': true,
                'finals': false
            },
            '2': {
                'topSelector': 'table.schedule-table',
                'selector': 'tbody tr',
                'name': 6,
                'avail': 3,
                'taken': 4,
                'length': 11,
                'ignoreFirst': false,
                'finals': false,
                'type': 2
            },
            '3': {
                'topSelector': 'div.saveSchedule',
                'selector': 'table.schedule-table tbody tr',
                'name': 6,
                'avail': 3,
                'taken': 4,
                'length': 11,
                'ignoreFirst': false,
                'finals': true,
                'type': 2,
                'days': 7,
                'start': 8,
                'classSelector': 'th:first-child',
                'grid': 'div.largeScheduleTable',
                'weekly': true
            },
            'saved': {
                'topSelector': 'div.savedSchedule',
                'selector': 'table.schedule-table tbody tr',
                'name': 6,
                'avail': 3,
                'taken': 4,
                'length': 11,
                'ignoreFirst': false,
                'finals': true,
                'type': 2,
                'days': 7,
                'start': 8,
                'classSelector': 'th:first-child',
                'grid': 'div.largeScheduleTable',
                'weekly': true
            }
        },
        THRESHOLD = 0.25,
        professors = [],
        profArchive = [],
        xmlData = JSON.parse(GM_getValue("AugmentedPASS.database"));

    if (document.URL.indexOf('saved.html') >= 0) {
        processPASS('saved');
    } else {
        processPASS($('.steps .list-plain .active').index());
    }
    
    function fillRows(pageInfo) {    
        var hook = $(pageInfo.topSelector),
            name = pageInfo.name,
            aval = pageInfo.avail,
            take = pageInfo.taken,
            leng = pageInfo.length,
            type = pageInfo.type,
            ignoreFirst = pageInfo.ignoreFirst,
            i,
            avail,
            taken,
            orig,
            process,
            str,
            color,
            merged,
            row,
            classes = [];

        if (pageInfo.finals) {
            var INIT = 2013,
                Q_OFFSET = {'fall': 0, 'winter' : 1, 'spring' : 2},
                QUARTER = $('.pageTitleQuarter').text(),
                YEAR = new Date().getFullYear(),
                T_OFFSET;

            YEAR = YEAR.toString().substring(0, 2) + QUARTER[2];
            QUARTER = QUARTER[1];
                
            if (QUARTER == 'winter' || QUARTER == 'spring') 
                YEAR--; // winter and spring quarter are within the same academic year
            
            T_OFFSET = 3 * (YEAR - INIT) + Q_OFFSET[QUARTER]; // number of quarters since Fall 2013
            
            mon = 2 * Q_OFFSET[QUARTER];
            tue = T_OFFSET % 2 == 0 ? 1 : 3;
            wed = T_OFFSET % 2 == 0 ? 2 - Q_OFFSET[QUARTER] : 4;
            thu = T_OFFSET % 2 == 0 ? 3 : 1;
            fri = T_OFFSET % 2 == 0 ? 4 - Q_OFFSET[QUARTER] : 0;

            var day_offset = [mon, tue, wed, thu, fri],
                TIME = ['7','10','13','16','19'],
                REGEXES = [           
                    /^(?:M|W|F){2,3}7:(?:1|4)0 AM/, /^(?:M|W|F){2,3}10:10 AM/, /^(?:M|W|F){2,3}1:10 PM/, /^(?:M|W|F){2,3}4:(?:10|40) PM/, /^(?:M|W|F){2,3}(?:7|8):10 PM/, 
                    /^TR7:(?:1|4)0 AM/, /^TR9:(?:1|4)0 AM/, /^TR12:10 PM/,/^TR2:10 PM/, /^(?:T5:10 PM)|(?:TR?6:10 PM)|(TR?7:10 PM)/,
                    /^(?:M|W|F){2,3}8:10 AM/, /^(?:M|W|F){2,3}11:10 AM/, /^(?:M|W|F){2,3}2:10 PM/, /^M(?:W|F){0,2}5:(?:1|4)0 PM/, /^(W(?:5|6|7|8):10 PM)|(?:TR8:10 PM)/,
                    /^TR8:10 AM/ ,/^TR10:10 AM/ ,/^TR1:(?:1|4)0 PM/ ,/^TR3:10 PM/ ,/^T?R4:(?:1|4)0 PM/,   
                    /^(?:M|W|F){2,3}9:10 AM/ ,/^(?:M|W|F){2,3}12:10 PM/ ,/^(?:M|W|F){2,3}3:10 PM/ ,/^(?:M|W|F){1,3}6:10 PM/ ,/^(?:R(?:4|5|6|7):10 PM)|(?:TR5:(?:1|4)0 PM)/
                ];
        }

        for (i = 0; i < hook.length; i++) {
            rows = $(hook[i]).find(pageInfo.selector);
            classes.push([]);
            
            for (j = 0; j < rows.length; j++) {
                row = $(rows[j]).find('td')
                
                if (row.length < pageInfo.length) {
                    continue;
                } else if (pageInfo.ignoreFirst && row.length == pageInfo.length) {
                    merged = $(rows[j - 1]).find('td:first-child');
                    merged = $.merge(merged, row);
                    row = merged;
                }
                
                if (row[name].textContent.indexOf(',') != -1 || row[name].textContent == "STAFF") {
                    avail = parseInt(row[aval].textContent);
                    taken = parseInt(row[take].textContent);
                    
                    if (row[name].textContent != 'STAFF') {
                        orig = row[name].textContent;
                        process = processName(orig);
                        
                        if (professors.indexOf(process) == -1) {
                            professors.push(process);
                            str = buildString(findInfo(xmlData, orig), process, false);
                            row[name].innerHTML = str;
                            profArchive.push(str);
                        } else {
                            row[name].innerHTML = profArchive[professors.indexOf(process)];
                        }
                    }
                    
                    if (avail == 0 && taken == 0) {
                        color = COLOR.CNCL;
                        $(row).css('opacity','.35');
                    }
                    else if (avail == 0)
                        color = COLOR.FULL;
                    else if ((avail/ (avail+taken)) >= THRESHOLD)
                        color = COLOR.SAFE;
                    else
                        color = COLOR.WARN;
                    
                    if (ignoreFirst) {
                        row.splice(0, 1);
                    }
                    
                    $(row).css('background-color', color);
                    
                    if (pageInfo.finals && row[type].textContent == 'LEC') {
                        className = $(rows[j]).find(pageInfo.classSelector).text().replace(' ', '');

                        meeting = row[pageInfo.days].textContent
                        starts = row[pageInfo.start].textContent
                        
                        if (meeting.length >= 4)
                            hash = "MWF" + starts
                        else
                            hash = meeting + starts
                        
                        var ctr = 0;
                        do {
                            var res = REGEXES[ctr++].exec(hash);
                        } while(res == undefined && ctr < REGEXES.length);

                        if (res) {
                            begin = TIME[(-1 + ctr)%5]
                            if (begin == 19)
                                wod = parseInt((ctr - 1) / 5)
                            else
                                wod = day_offset[parseInt((ctr - 1) / 5)]
                            
                            classes[i].push([className, begin, wod])
                        }
                    }
                }
            }
        }
        
        return classes;
    }        
    
    function processPASS(page) {
        var pageInfo = PASS_PAGE[page],
            classes;
        
        classes = fillRows(PASS_PAGE[page]);

        if (pageInfo.finals) {
            var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                HOUR_RANGE_LOW = 7,
                HOUR_RANGE_HIGH = 22,
                FINAL_LENGTH = 6,
                wrapper,
                finals;
                
            weeklySchedules = $(pageInfo.topSelector);
            
            wrapper = $('<div class="largeScheduleTable clearfix"></div>');
            finals = $('<table><thead><tr><th></th></tr></thead></table>').attr('class', 'finals-schedule');

            for (i = 0, hdr = finals.find('thead tr'); i < DAYS.length; i++) {
                hdr.append('<th>' + DAYS[i] + '</th>')
            }
            
            finalsBody = $('<tbody></tbody>')
            curHour = formattedHour(HOUR_RANGE_LOW)
            
            for (hour = HOUR_RANGE_LOW; hour < HOUR_RANGE_HIGH; hour++) {
                nextHour = formattedHour(hour + 1)

                hourRow = $('<tr><td>'+curHour[0]+':00'+curHour[1]+' - '+curHour[0]+':30'+curHour[1]+
                            '</td><td><td></td><td></td><td></td><td></td></tr>')
                finalsBody.append(hourRow)
                
                hourRow = $('<tr><td>'+curHour[0]+':30'+curHour[1]+' - '+nextHour[0]+':00'+nextHour[1]+
                            '</td><td></td><td></td><td></td><td></td><td></td></tr>')
                finalsBody.append(hourRow)
                curHour = nextHour
            }

            finals.append(finalsBody);
            wrapper.append(finals);
            
            var btnList = $('<div style="padding-top:20px;">' +
                             '<a class="btn weekly no-select" href="javascript:;" style="border:1px solid gray; margin-right:10px;">WEEKLY</a>' +
                             '<a class="btn finals no-select" href="javascript:;" style="border:1px solid gray;">FINALS</a>' +
                             '</div>');

            for (i = 0; i < classes.length; i++) {
                section = $(weeklySchedules[i])
                section.find('p.grid-view-toggle').remove();

                weeklySchedule = section.find(pageInfo.grid)
                $(weeklySchedule).attr('id', 'weekly-' + i);

                gridView = wrapper.clone();
                $(gridView).attr('id', 'finals-' + i);
                allTd = $(gridView.find('td'));

                for (exam = 0; exam < classes[i].length; exam++) {
                    time = 2*(classes[i][exam][1] - HOUR_RANGE_LOW)
                    day = classes[i][exam][2] + 1
                    for (dur = 0; dur < FINAL_LENGTH; dur++) {
                        location = day + ((time+dur)*(DAYS.length + 1))
                        $(allTd[location]).text(classes[i][exam][0]).attr('class', 'filled')
                    }
                }

                buttons = btnList.clone();
                section.append(buttons);
                section.append(gridView);
                section.append(weeklySchedule);
                
                wkly = buttons.find('.weekly').attr('id', 'weekly-view-' + i);
                fnls = buttons.find('.finals').attr('id', 'finals-view-' + i);

                (function(i) {
                    $('#weekly-view-' + i).on("click", function() {
                        if (!$(this).hasClass('btn-gray')) {
                            $(this).addClass('btn-gray');
                            $('#finals-view-' + i).removeClass('btn-gray');
                            $('#finals-' + i).hide();
                            $('#weekly-' + i).show();
                        }
                        else {
                            $(this).removeClass('btn-gray');
                            $('#weekly-' + i).hide();
                        }
                        return false;
                    });

                    $('#finals-view-' + i).on("click", function() {
                        if (!$(this).hasClass('btn-gray')) {
                            $(this).addClass('btn-gray');
                            $('#weekly-view-' + i).removeClass('btn-gray');
                            $('#weekly-' + i).hide();
                            $('#finals-' + i).show();
                        }
                        else {
                            $(this).removeClass('btn-gray');
                            $('#finals-' + i).hide();
                        }
                        return false;                        
                    });
                })(i);

                weeklySchedule.hide();
                gridView.hide();
            }
        }
    }
        
    function formattedHour(num) {
        var h = num > 12 ? num % 12 : num;
        var t = num >= 12 ? " pm" : " am";
        return [h, t];
    }
        
    function buildString(data, name, oneLine) {
        var str;   

        if (data != undefined) {
            str = "<a href=\"http://www.polyratings.com/eval.phtml?profid="+data.i+"\" target=\"_blank\">"+name+"</a>";
            if (!oneLine) {
                str += "<br>";
            }
            str += "&nbsp<b><font size=2>" + data.g + "</b> (" + data.e + ")</font>";
        } else {
        str = "<a href=\"https://www.google.com/search?btnI=I%27m+Feeling+Lucky&q="+name+"+site:polyratings.com\" target=\"_blank\">"+name+"</a>";
        }
        
        return str;
    }
    
    function processName(name) {
        var idx = name.indexOf(",");
        var sp = name.indexOf(" ");
        if (sp != -1) {
            if (sp < idx) {
                name = name.substring(idx+1) + " " + name.substring(0,idx);
            }
            else {
                name = name.substring(idx+1,sp+1) + name.substring(0,idx);
            }
        }
        else {
            name = name.substring(idx+1) + " " + name.substring(0,idx);
        }
        return name;
    }

    function findInfo(xmlData, name) {
        name = name.toLowerCase()

        var loc = name.indexOf(','),
            lookup;
        
        do {
            lookup = name.substring(0, ++loc);
        } while (xmlData[lookup] == undefined && loc < name.length);
        
        return xmlData[lookup];
    }
}

function updateDatabase(forceUpdate) {
    response = updateDatabaseHelper(forceUpdate);
    if (response) {
        $('#update-overlay').fadeOut(2000);
        footer = $('<span id="this-thing"></span>');
        footer.text(response);
        footer.css({'background-color':'#006400',
                    'color':'white',
                    'padding':'7px',
                    'position':'fixed',
                    'bottom':0,
                    'left':0,
                    'right':0});
        $('body').append(footer);
        $(document).ready(function() {
            footer.fadeOut(15000);
        })
    }
}

function updateDatabaseHelper(forceUpdate) {
    if (GM_getValue("AugmentedPASS.databaseVersion") == undefined) {
        GM_setValue("AugmentedPASS.databaseVersion", -1);
    }

    if (GM_getValue("AugmentedPASS.lastCheck") == undefined) {
        GM_setValue("AugmentedPASS.lastCheck", -1);
    }

    var time = new Date().getTime(),
        lastCheck = GM_getValue("AugmentedPASS.lastCheck");
    
    if (forceUpdate || time - lastCheck > 604800000) {
        $('body').append('<div id="update-overlay" style="position:fixed;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,.5);">'+
                         '<span style="position:fixed;color:white;font-size:100px;">Updating...</span>'+
                         '</div>');
        
        GM_setValue("AugmentedPASS.lastCheck", time.toString());

        var req = new XMLHttpRequest();
        req.open("GET", "https://dl.dropboxusercontent.com/s/ox38v18b03ktzcg/prversion.txt", false);
        req.send();

        if (req.status != 200) {
            return 'There were problems trying to get the latest version';
        }

        var version = JSON.parse(req.response)['version'];

        if (forceUpdate || version > GM_getValue("AugmentedPASS.databaseVersion")) {
            req = new XMLHttpRequest();
            req.open("GET","https://dl.dropboxusercontent.com/s/7jcutcmreqothv2/polyratings.json",false);
            req.send();

            if (req.status != 200) {
                return 'There were problems trying to update to the latest version';
            }

            GM_setValue("AugmentedPASS.databaseVersion", version);
            GM_setValue("AugmentedPASS.database", req.responseText);

            return "The ratings have been updated";
        }
        else {
            return "No new version";
        }
    }
    else {
        return false;
    }
}

$(document).ready(function() {
    $('head').append('<style> .qtip-content { font-family:Arial; font-size:9pt; } .no-select { user-select:none; -moz-user-select:none; -webkit-user-select:none; }</style>');
    updateDatabase(false);
    main();
});