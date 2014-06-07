// ==UserScript==
// @name           Banner Bridge
// @namespace      fiveofoh
// @description    Imports schedules from Banner to other formats (currently Courses 2.0 on Facebook)
// @include        https://*/bwskfshd.P_CrseSchd*
// @include        http://*/facebook/IFrame/my-course.aspx*
// ==/UserScript==

Array.prototype.in_array = function(p_val) {
	for(var i = 0, l = this.length; i < l; i++) {
		if(this[i] == p_val) {
			return true;
		}
	}
	return false;
}

var uastring = navigator.userAgent.toLowerCase();
var isRealGM = (uastring.indexOf('firefox') != -1);
var GMxmlReq = isRealGM;  //Whether or not GM provides fancy xmlHTTPRequests
var GMStore = isRealGM;

var curClass;
var dayinitials = {
    'Monday':'M',
    'Tuesday':'T',
    'Wednesday':'W',
    'Thursday':'R',
    'Friday':'F',
    'Saturday':'S',
    'Sunday':'U'
}

if(window.location.href.match(/banweb/)) {
    var outerTable = document.getElementsByClassName('datadisplaytable');
    var outerTable = outerTable[0];

    var rowList = outerTable.getElementsByTagName('tr');
    var headerList = rowList[0];
    var headerList = headerList.getElementsByClassName('ddheader');

    var weekofdiv = document.getElementsByClassName('fieldlargetext');
    var weekofdiv = weekofdiv[0];
    var weekof = weekofdiv.innerHTML;
    var weekof = /Week of (.*)/.exec(weekof);
    var weekof = weekof[1];
    var initdate = Date.parse(weekof);

    daylist = [];
    for (i in headerList) {
        daytext = headerList[i].innerHTML;
        if(daytext) {
            daylist[i-1] = daytext.replace(/&nbsp;/g,'');
        }
    }
    var rowspans = []; 
    var numcols = rowList[1].getElementsByTagName('td').length;

    var classStore = {};
    var baseDateStr = '1/1/1970';
    var baseDate = Date.parse(baseDateStr);
    for (var i=1; i < rowList.length; i++) {
        collist = rowList[i].getElementsByTagName('td');
        skippedcols = 0;
        for (var j = 0; j < numcols; j++) {
            if(rowspans[j] > 0) {
                rowspans[j]--;
                skippedcols++;
                continue;
            }
            colindex = j-skippedcols;
            if(collist[colindex].rowSpan > 1) {
                rowspans[j] = collist[colindex].rowSpan;
            }

            var link = collist[colindex].getElementsByTagName('a');
            var dayname = daylist[j];
            
            if(link.length > 0) {
                link = link[0];
                linelist = link.innerHTML.split('<br>');

                classList = linelist[0].split('-');
                className = classList[0];

                timeList = linelist[2].split('-');

                startTime = (Date.parse(baseDateStr + ' ' + timeList[0]) - baseDate)/1000;
                endTime = (Date.parse(baseDateStr + ' ' + timeList[1]) - baseDate)/1000;

                if(!classStore[className]) { 
                    classStore[className] = {
                        'name': className,
                        'section': classList[1],
                        'url': link.href,
                        'session': {}
                    }; 
                }

                if(!classStore[className].session[startTime]) {
                    classStore[className].session[startTime] = {
                        'start': startTime,
                        'length': endTime - startTime,
                        'room': linelist[3],
                        'days': [dayname]
                    };
                }

                if(!classStore[className].session[startTime].days.in_array(dayname)) {
                    classStore[className].session[startTime].days.push(dayname);
                }
            }
        }
    }

    
    var notifDiv = document.createElement('span');
    notifDiv.style.margin = '0px 5px';
    notifDiv.style.fontWeight = 'bold';
    notifDiv.style.color = '#006600';
    notifDiv.innerHTML = "Bridge data gathered!";
    weekofdiv.parentNode.appendChild(notifDiv);

    if(GMStore) {
        GM_setValue('classStore',JSON.stringify(classStore));
    }
    else {
        prompt("Copy the data below and then paste it into the input box on the target page:",JSON.stringify(classStore));
    }
    console.log(classStore);
}
else {
    if(GMStore) {
        var classStore = GM_getValue('classStore','{}');
    }
    else {
        var classStore = prompt("Paste the data from the Banner page here:","{}");
    }
    var html = document.documentElement.innerHTML;

    classStore = JSON.parse(classStore);
    for(className in classStore) {
        curClass = classStore[className];

        if(html.indexOf(curClass.name + ' -') < 0) {
            var addBtn = document.getElementById('cmdAdd');
            var notifDiv = document.createElement('div');
            notifDiv.id = 'bb_notif';
            notifDiv.style.margin = '5px 0px';
            notifDiv.style.fontWeight = 'bold';
            notifDiv.style.color = '#666600';
            notifDiv.innerHTML = "Importing from Banner...";
            addBtn.parentNode.appendChild(notifDiv);

            if(GMxmlReq) {
                GM_xmlhttpRequest({
                    'method': 'GET',
                    'url': curClass.url,
                    'onload': fillClass
                });
            }
            else {
                fillClass();
            }
            break;
        }
    }
}

function fillClass(response) {
    if(response) {
        titleExp = new RegExp('([^>]*) - ' + curClass.name);
        profExp = new RegExp('Assigned Instructor:[\\S\\s]*?class="dddefault">[^<]* ([^< ]+)','i');
        var classTitle = titleExp.exec(response.responseText);
        var profName = profExp.exec(response.responseText);
        document.getElementById('txtCourseTitle').value = classTitle[1];
        document.getElementById('txtLastName').value = profName[1];
    }
    document.getElementById('txtCourseName').value = className;
    document.getElementById('txtCourseSection').value = curClass.section;

    var q = 0
    for(session in curClass.session) {
        q++;
        curSess = curClass.session[session];
    
        startBox = document.getElementById('WucCourseTime' + q + '_todTimeStart');
        endBox = document.getElementById('WucCourseTime' + q + '_todTimeEnd');
        locBox = document.getElementById('WucCourseTime' + q + '_txtTimeLocation');
        dayPrefix = 'WucCourseTime' + q + '_chkTimeDay';

        startBox.value = formatTime(curSess.start);
        endBox.value = formatTime(parseInt(curSess.start) + parseInt(curSess.length));
        locBox.value = curSess.room;
        
        for(var r=0;r<curSess.days.length;r++) {
            curday = curSess.days[r];
            document.getElementById(dayPrefix + dayinitials[curday]).checked = 1;
        }
    }

    var notifDiv = document.getElementById('bb_notif');
    notifDiv.style.color = '#006600';
    notifDiv.innerHTML = "Successfully imported from Banner!";

    return;
}

function formatTime(timenum) {
    var currentTime = new Date(timenum*1000)
    var hours = currentTime.getUTCHours()
    var minutes = currentTime.getUTCMinutes()

    var suffix = "AM";
    if (hours >= 12) {
        suffix = "PM";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }

    if (minutes < 10)
        minutes = "0" + minutes

    var res = hours + ":" + minutes + " " + suffix
    return res;
}