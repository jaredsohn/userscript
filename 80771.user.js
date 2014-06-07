//
//    If you see this message after you pressed install on the Jobmine Plus install site 
//    (http://userscripts.org/scripts/show/80771), then you are doing it wrong.
//    Please install Greasemonkey (https://addons.mozilla.org/firefox/downloads/latest/748/addon-748-latest.xpi?src=addondetail)
//    or if you have it, please enable it (monkey face is lit up). Alternatively you can use Google Chrome
//    to install this directly.
//
// ==UserScript==
// @name           Jobmine Plus
// @namespace      http://eatthis.iblogger.org/
// @description    Makes jobmine even better and looks good too!
// @include        https://jobmine.ccol.uwaterloo.ca/psp/SS*
// @include        https://jobmine.ccol.uwaterloo.ca/psc/SS*
// @include        https://jobmine.ccol.uwaterloo.ca/psp/ES*
// @include        https://jobmine.ccol.uwaterloo.ca/psc/ES*
// @exclude        *WEBLIB_UW_DOCS.UW_CO_DOC_TEXT*
// @exclude        *UW_CO_STUDENTS.UW_CO_EVALUATION*
// @exclude        *&jbmnpls=ignore
// @exclude        *Page=UW_CO_CT_STU_APP*
// @exclude        *UW_CO_EMPINFO_DTLS*
// @grant          GM_getValue
// @version        2.1.5
// ==/UserScript==

/*========Table of Contents============

   __CONSTANTS__
   __PROTOTYPE_FUNCTIONS__
   __PARSE_PAGE__
   __USERSCRIPTS_BRIDGE__
   __JQUERY_SIZZLE_TABLESORTER_LIBRARIES__
   __DEBUGGING__
   __PREFERENCES__
   __JOBS_QUEUE__
   __FUNCTIONS__
   __HIGHLIGHTING__
   __AJAX_FUNCTIONS__
   __SEARCH_MANAGER__
   __SETTINGS__
   __JOB_SEARCH_CRITERIA__
   __TABLE__
   __CLEAN_UP__
   __CSS__
   __INDIVIDUAL_PAGES__

==========Table of Contents============*/

/*===============================*\
|*        __CONSTANTS__          *|
\*===============================*/
{/*Expand to see the constants*/
var CONSTANTS = {
   VERSION              : "2.1.5",
   DEBUG_ON             : false,
   PAGESIMILAR          : "https://jobmine.ccol.uwaterloo.ca/psc/SS/",
   PAGESIMILARTOP       : "https://jobmine.ccol.uwaterloo.ca/psp/SS/",
   EXTRA_URL_TEXT       : "__Jobmine_Plus_has_taken_over_Jobmine",
   MESSAGE_TIME_OUT     : 8,   //10 sec
   SEARCH_DAYS_CLEAR    : 30,  //30 days before ids will clear out
   STATUS_UPDATE_TIME   : 10,  //10 mins
   RESUME_DELIMITOR1    : "{|||}",
   RESUME_DELIMITOR2    : "[|||]",
};

var DIMENSIONS = {
   SCROLLBAR_WIDTH : 17,    //Firefox and Chrome, errors when trying to calculate it
}

var LINKS = {
   HOME        : CONSTANTS.PAGESIMILARTOP + "EMPLOYEE/WORK/h/?tab=DEFAULT",
   LOGIN       : CONSTANTS.PAGESIMILAR + "?cmd=login&languageCd=ENG",
   LOGOUT      : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/?cmd=logout",
   DOCUMENTS   : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_STU_DOCS",
   PROFILE     : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_STUDENT",
   SKILLS      : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_STUDENT?PAGE=UW_CO_STU_SKL_MTN",
   SEARCH      : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_JOBSRCH",
   LIST        : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_JOB_SLIST",
   APPLICATIONS: CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_APP_SUMMARY",
   APPLY       : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_CT_STU_APP.GBL?Action=A&UW_CO_JOB_ID=",     //UW_CO_STU_ID
   INTERVIEWS  : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_STU_INTVS",
   RANKINGS    : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_STU_RNK2",
   JOB_DESCR   : CONSTANTS.PAGESIMILAR + "EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_JOBDTLS?UW_CO_JOB_ID=",
   BLANK       : "about:blank",
   EMPLYR_TOP  : "jobmine.ccol.uwaterloo.ca/psp/ES",
   EMPLYR_FRAME: "jobmine.ccol.uwaterloo.ca/psc/ES",
   UPDATE_LINK : "http://userscripts.org/scripts/source/80771.user.js",
   UPDATE_CSS  : "https://jobmine-plus.googlecode.com/svn/trunk/resource/scripts/update.css",
   ANDROID_APP : "https://play.google.com/store/apps/details?id=com.jobmineplus.mobile",
   WORK_TERM   : null,     //Will set later
};

var NAVIGATION = {   //The order below will be on the left side
                     PROFILE        : "Profile",
                     DOCUMENTS      : "Documents",
                     SEARCH         : "Job Search",
                     LIST           : "Job Short List",
                     APPLICATIONS   : "Applications",
                     INTERVIEWS     : "Interviews",
                     RANKINGS       : "Rankings",
                  };

var COLOURS = {
   ROW_HIGHLIGHT        : "#f0f1ac",      //Light green
   HOVER                : "skyblue",
   LINK_HIGHLIGHT_HOVER : "green",
   ROW_SELECT           : "#c7e4f7",      //Lighter blue than skyblue
   GREAT                 : "#a3f57f",
   BLANK                : "white",
   BAD                  : "#f4baba",
   AVERAGE              : "#fffe93",
   WORST                : "#AAAAAA",
   GOOD                 : "#a1f6cd",
};

var OBJECTS = {
   STORAGE        :  null, //Set later
   HIGHLIGHT      :  null,
   ONPOPUPCLOSE   :  null,
   MESSAGE_TIMER  :  null,
   STATUS_TIMER   :  null,
   REFRESH_TIMER  :  null,
   UWATERLOO_ID   :  null,
};

var LARGESTRINGS = {
   POPUP : "<div id='jbmnplsPopup'><div class='wrapper'><div id='jbmnplsPopupContent' class='content draggable noselect'><div id='jbmnplsPopupTitle' class='noselect title draggable-region'></div><div id='jbmnplsPopupBody' class='body'></div><div id='jbmnplsPopupSettings' class='body'></div><div id='jbmnplsPopupFrameWrapper'><iframe id='jbmnplsPopupFrame' allowtransparency='true' frameborder='no' width='100%' height='100%' class='frame'></iframe></div><div id='jbmnplsPopupFooter' class='footer noselect'><span class='fakeLink submit' onclick='hidePopup(\"save\");' title='Click to submit.'>Submit and Close</span><span class='fakeLink save' onclick='hidePopup(\"save\");' title='Click to save.'>Save and Close</span><span title='Click to cancel.' onclick='hidePopup(\"cancel\");' class='fakeLink cancel'>Cancel</span><span onclick='hidePopup(\"close\");' class='fakeLink close' title='Click to close.'>Close</span></div></div></div>",
};

var IMAGES = {
   MAINBANNER     : "data:image/gif;base64,R0lGODlhcAAYALMAAAAAAP///7u7u3d3d0RERBEREe7u7jMzM8zMzN3d3ZmZmWZmZiIiIlVVVYiIiKqqqiH5BAAAAAAALAAAAABwABgAAAT/EEhwhFgz6827/6C0WKTlFGHqBQGhvrCKZgRr28kcq6wrCqzEYDYqCU6AwsNymFSOgNGjoBQonMyo0TLQ1AIZhiGwqGIyzyYlW1AkWA9fpidRsBDAAAJVM5DeAhJ5DRMNLF01gQB5agAsEn1GXTSPGUBdQHITlRKVCAEJAp8BipstAH1qDJ+IpHNgi3cTbwGtinkGapWJGjqQPQTBCyyEmRucjmA1DxNtmskudpMSB6CooAPZdlexbxgDoLXXt3p6KLt6wQRnXjc3zLHPya8U2APBHHTG9F/uhLHDchgQIo5XPDt70N0oRalWtmxy9tEzJeGBOwPsOp2ymJFBAAPj/yaICcAgHrg3BMDZEnTqkx1YNRCoyzjhiweJFHMCaDDAgahDMzyeCqhjW8gJn1xkKjAmkMqjxgqMgunqg80OODWWBCBUwjQJnxAYUDDgE0iwoByU/ViyhhBtH1EYA+fiqcF9I6m+feigHSwOQMjyBWDRgNo3zDwaeJANiIG1QRq1WagGnDsETQq8mTTJIrOTVDZPGBagiWV3DAFYbpRBsztXFShTGECLhQBV+DYUCLZ1h+8QrH83YsB7A3ECvX8rX868ufPn0KNLn069uvXr2LNr387dd4EB/75/xS5envjk3TsoUMR0wYGH4MVDTLJgQJmdk1IOKPn9H/iaY9mhicIYD9jxT3odVFPSAglc8xAhAZDlAEl4DKDAHgMEosBjdmAQ1yLTvNfJVw4YIBcCCH5gBQBCXBOMLvcYUo0CCyCnmgAeVdagHnsIMF4BE2pigVd/pbhBDQuYOI6PnYglzghjmJhhDTWB0YIoCHw1gAEYafAAigCUaKQHCTz2SzOOEFANIQM0UU1KgYyVBB5pSiWOBIYMkcRsUbTAFDdjbjDhP4bYIEABARCy4XtvGBYmirFFSEWiXAXQF0s3qHbWlpJGAAA7",
   UWBANNER       : "data:image/gif;base64,R0lGODlhaAAWAMQAAAAAAP///7+/v0BAQICAgO/v78/PzyAgII+Pj2BgYN/f35+fnzAwMHBwcBAQEK+vr1BQUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAABoABYAAAX/YEAAQzAAQCCQJiqixYMqBioE+Arc+II6hhyqdCLghMbELnBAOQEIXKExPL6e2KxrRHSJuqkRYMEsKXeGwYBhUxAerRKBgKieBgSF6GwoJK5PDQEPEEF3AQtzJ1qMWyyLR0aQYgwBDQsFDjYFAgJnAmmSAJUxi2BLTyUBNVkCCj8vJQadjbUBdWC3ei1hTgYKBT6bnZ9HOgAQDwVMj043WGSLWK6wXKu0tYzAEDdsYZW8gH8B3mhq3qB/MiQKCVGH0s9PRoxGhIbN2Y0Qy7dOL38mOXFQgJUNYzZWRIEwapeOU/Kc0GMUJYAfO/oyatzIsaPHjyBDihxJsqTJkyEf/3QqB0ClsCGd6sAUIGZUp5s4deTE+SnnggZNnCBYyejA0E4PzmBx0OBmUk0oyPhDAY5ZVBxUUMDBAVWVFStevuIQI/aIUh7SApU1EBRFgn5WFHiDgMNgRUtO+gU9YEWM17JhxZItiyMo2ixGCGdCQVexN70zjrACZzcu4rFYhDA64mTALjGHn/DF8SCooB4ACNZd9FazVCpVC0PB+mNZMBxKUSSu6eVYFs4SMS/hJbQultMBmEqBWgUHm8YKc9DeFXQcAlW+AezObDGnUuBahYd2hjvLrgFbZT4JghdAPwd6Coxmazwys10stz8hXNNYp13kHERcWGkJOMB4wV0hVdVFPrBXUVaqFDAHDy9pJ9w/ZfXHH3kDAsAeQ1iwdyBtWGwlRmNHMIScbGMQllyCvKWgQiOEZWUgNJp1dsQBib0i2hHSwFUACqPVV2RZNuqHYXb74RDeKk8gyAJqVPWzQpELQHUAez5eRaWHR2SVmHpTdqmkF5x4F1ZtF/IwC04tHaFAJ0cU4M1daVqRForSIBcUZE/sAuKZMma4JmNHoENYajx8ZecTUjmaW0Lr/NCJMAcKQCZjnYiRADHT7ATqDtigcJRMR+3kxKdyIsBcZ1tZtEBbIQAAOw==",
   HEADER_POINTER : "data:image/gif;base64,R0lGODlhFAAKAMQAAAAAALCwsMDAwM/Pz9vb2+jo6AMDA/Pz8/z8/P///6WlpQICAmNjY4uLi1lZWZOTk6Ojo3p6eqKiop2dnY+Pj3BwcIODg3l5eYSEhJeXl5+fn5ycnG5ubgAAAAAAAAAAACH5BAAAAAAALAAAAAAUAAoAAAVGICCOoqFIBqmuZpJoawy0brLJpAEhfJ/hs8lhSBxSZIZHYclsWlgNgnRKlV5IC8xgy+12OaJFREAum88CBqASaLvfcLcjBAA7",
   DELETE         : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdZJREFUeNqklctOwkAUhqe1Ie50o9G9kSCoiW7gAQS64SV8CEQFFZaufQPd60ZQH4AHUGNko4CXlZfExCgJqf8xf83YlFLrJF+YMtMvM2fO6RiO46jXTMZSSk2ON5sP+JVnFbFNgWd4eialR2Af/byK3nLgABzCEzPRmQCjYBls4087onSdjjEwa2LZj+jsgiuQADvA/qN0AyyCW1CF80JWrNBpUHgN4jII8iGlZbAA2mANnMiA6c6AvI6fLdCSrYDaEHkWVEAKdEAJNNxBU59JedkjtwOkSdBlfI/1Cab3DYZFl3tj7m4/RWnJK5VmDdimyA1K4wyRA/pc3TxjKtI6x0KJFV9QlCa49R5P/wbcDZIOEyvtxQqFDkN0DwqDpL4x9ml9rtTh/E+wFyQNs+KslvwtSuekQnkG9ShikW4y+SWmRTBCqVuhapDcCpH8bUrPOKZnS5UhaQwV4yO0wkxIsqKkTE99sqWqFZHyyq0AaZfSekC21DT5r5hbmjSrVVQnQKo8K6xpFfqzI4vSnKeiin5xC1mh33LjJZ2e5pd/SauowrA89TRbq9BzsCorfgIf4FLuqwhS/UAlPd/kfAxepjE8zMgtgq+b84/LVFbchuP9S4ABAIyroRf/scQTAAAAAElFTkSuQmCC",
   DELETE_DISABLE : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAdlJREFUeNqclc1OwkAURkttjDtXGt0bCIq44BlE2BCfRkCUiixd+wa61w0FfQXYYYxsEH9XujExSkLqd803ZNJMoTDJSUuZnLlz59421m63LQwHrII3a8aRyWTG951OZw2XTzwb2pRegwuQs+YckO7hcgmucL8o4hWwJIuDE5CfU3pIxzKIi/gdnIF7kAS1WeSUVsAOeASnSEXX4f9NEKM0IX8Cn88nDZEegxQYgBKkLXVoani8ijQO6tqippEFVbAFnkAZ0vFcJzDZY6R1TR7TFjVJnyW/kDb0CY4hErWqktcCO5LtH3H7Ii2DRlDihGwzmHOXOxnx9LeZU5F6iNaPKtYjdFktsvUhT78PXsKk08R6zqsUyn0PvIICfxuHHaFUR4zU5/xfcD5JGiXirFb8PUo32aGmaokkzvL008xpESxQmjRUS6RUqDpN8/RFestqEeGD6lC0dC6qeJeVkGJHlcBN4EBdpua/iUxyO0SqOqoUslWP7whdng8Tq+2rSIuTDodp0eU1XW5rbVrROuqAbepPqZomg1E5d5VcxOuMTnWURNua4dOkcq7e5xXIEyL+AD/gjm1aiBCpSS7V0gVfcj4Ou2ofbHBV35pjiByRyhdkgPvvPwEGAC74pOSa7O0XAAAAAElFTkSuQmCC",
   TABLE_ASCEND   : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAChJREFUeNpi/P//PwMSAHEYGfAAJjTFyDReDeiK/uPTgEsSqzhAgAEA5doJ/2fPKB8AAAAASUVORK5CYII=",
   TABLE_DESCEND  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAChJREFUeNpi/A8EDLgBI7oAEzZBXIphGrBJ4jIErgFZESMeJzIABBgACYsEC30vZjwAAAAASUVORK5CYII=",
   DELETE_LOADING : "data:image/gif;base64,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",
   LARGE_LOADING  : "data:image/gif;base64,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",
   MESSAGE_CLOSE  : "data:image/gif;base64,R0lGODlhDQAMANUAAObm5qampn19fX5+fq2trfT09N/f34SEhPf39/n5+XV1dYmJiXNzc2xsbHd3d2JiYlRUVKOjo3x8fIGBgX9/f9vb24uLi9nZ2YyMjIODg9bW1qmpqZGRkc/Pz3FxcY+Pj/X19ZCQkG5ubqqqqqenp4qKiuXl5eLi4unp6aysrN7e3nR0dGtra/Pz8/j4+Pr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAANAAwAAAZiwNfJ9CoaExWU8LAgGl0ERwhViLBKTldqJdggXi0SywLQrgaqb7EVYGE6K4nKaAx7Hoc5vZi4rCAfAHsvWgoTJA0lgk8pDBQGBW1YRS4jXHpsVwRCGWh0YSIcSicGgyAaSkEAOw==",
   EMPLOYER_NAME  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAAANCAMAAACKN+LIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBQTFRFycnJiYmJra2t9vb2kpKS7e3tgICA5OTkpKSktra20tLSm5ubwMDA29vbd3d3////5P2LPQAAAn5JREFUeNrElul2ozAMhb0bsJDe/23nyhsmzbTNnEzrPxBrsT5rIUa+vU6WV9bJ8VP5waf82DJc1xcsdffNmLuVn8Skb6Tsf2AG+g1M3hIHL5paIyZxMiJlC+yqUHdPdlx/dmnLCXPIUCh4UmIb1ROrJ8WMgXnrRDDx0CoqgVVmr454b34IJ4SoD4taLgGuCMZ4Jxs0JIGt+upReBXlfpOlBE55UcGLg1qBLAc948Is0VsaeQMpXJRw3rLp4DhPaY3OZnFWrb1P4A27YnpvXcW0RSKcUkIrJg9/3gdXHenyfIgp/ZXEb6dB8FQVsxTcyx70CAP6elyGwYhiA8/ejGuc+nuq7IrqYzrEJ6gnM3tTb8e5BrSrCbwX+lC02B3SUXkRMai1auvBLQWKqeHoq/IUzQB+Gjur318Nc7Z5VGNN7WAqOqbaU3r1FJpRHIyL7TWl6sbKTUUdIroDNwyuK5sLZuFWu88xh3RUMy+Y1DENK2ZtTzXbSsTuWZUvTCSOE62NXFwLdLg6ByZKwui5F6YkMsj7DXNV6RFRPfM55r5f5k+yuS9z5LisV0xU25JNXL1Wtmf/YcxR29Nae5LNgYlyiFrpSzYxqYuTG+ZNpUd0hIcR1DCzPrX70CkXZt9tBwzp6M0cHjAJ3UBrbyL0egx6U4ybmGfJtWV1WYiW3lwxrReXvIZw2gUz8/zwdsybSo9Ie1OIHntTXJ20FmMqXph1dx7QpXNCugdMW+fnMml1IKu+xwxONDFjaXO1vofbpL1htmGOEMKKKWF+eEfRriojIp204TTv/0Y9+3fjyj+7o7+Z2hc+vD+DOWfiGzG/+vvxC5hzJr4R86UC+SPAAPcUmZQN0BP2AAAAAElFTkSuQmCC",
   JOB_TITLE      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAANCAMAAACU0hA+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAC1QTFRFiYmJ9vb27e3tpKSkgICA5OTkkpKStra2ycnJm5ubra2twMDA29vbd3d3////XBn6XAAAATBJREFUeNq8kul2xCAIhcEtbvD+j1tEjUlq2+mZnvpnIst8XrjAL59Km2DK67M8chlmoxkRID3f/2WP7lO8pZV0a1y08rOAv6eRdRSQm9DI0ZGL0m8D6aQ0WimTXke2JyRQiKBKdQICPyByTIHZaBgTUcJFSwahzMcIUEpSqLcnZvbkz2zfTZbvysWhVHu2cNEmtFNbCoghn3uTltaq6cM21XHNZk1SojM7abbdXa/24xVPGsorOcLSdqEl6gPd02Z20tSWUtqqDdUtTUdLe9pxPPZ+13ZcXf7Uhl9ow7tLOs2337YZtHXRRrTTZvbT3oQahxfbvdFGo+6N46e9cVZPSjiZi6ezWmvsa2Qn7fSkhEOXxhi6J0ejeNISuQL83sn5N9Xv0qD8H22N7rXzIcAAJahEsPp7aB4AAAAASUVORK5CYII=",
   STATUS_DIVIDER : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAASCAYAAABxYA+/AAAAK0lEQVQImbXNoQEAMAzDsP5PfVjO8BkZWuHYmJhGrdp5IEmTdIACP7HX3Q8e3m6JE637qgAAAABJRU5ErkJggg==",
   GOOGLE_PLAY_STORE : "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRBNTg2NzM5QURDRjExRTJBNjRFQThENEZFNzJGOENGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRBNTg2NzNBQURDRjExRTJBNjRFQThENEZFNzJGOENGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REE1ODY3MzdBRENGMTFFMkE2NEVBOEQ0RkU3MkY4Q0YiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REE1ODY3MzhBRENGMTFFMkE2NEVBOEQ0RkU3MkY4Q0YiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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",
};

var KEYS = {
   ESCAPE   :  27,
   PERIOD   :  190,
   DASH     :  109,
};

var INPUT_RESTRICTIONS = {
   DECIMALS          : function(a){return UTIL.isNumeric(String.fromCharCode(a)) || a == KEYS.PERIOD || a == KEYS.DASH;},
   POSITIVE_DECIMALS : function(a){return UTIL.isNumeric(String.fromCharCode(a)) || a == KEYS.PERIOD;},
   INTEGERS          : function(a){return UTIL.isNumeric(String.fromCharCode(a)) || a == KEYS.DASH;},
   POSITIVE_INTEGERS : function(a){return UTIL.isNumeric(String.fromCharCode(a));},
};
}

/*===============================*\
|*    __PROTOTYPE_FUNCTIONS__    *|
\*===============================*/
{/*Expand to see the prototype functions*/
String.prototype.contains = function(string, from){
   return this.indexOf(string, from) >= 0;
}
String.prototype.empty = function(){
   return this == null || this.length == 0 || this == "";
}
String.prototype.replaceLast = function(find, replaceWith){
   var start = this.lastIndexOf(find);
   var length = find.length;
   //Cannot find it
   if (start == -1) {return this;}
   return this.substring(0, start) + this.substr(start + length);
}
String.prototype.setCharAt = function(index, character) {
   if (index < 0) {index = this.length + index;}
   return this.substr(0, index) + character + this.substr(index+character.length);
}
String.prototype.startsWith = function(str) {
   if (str == null || str.length == 0) {return false;}
   return this.substring(0, str.length) == str;
}
String.prototype.underscorize = function() {
   return this.replace(/\s|-/g, "_");
}
String.prototype.removeWords = function(listOfWords){
   if (!UTIL.isArray(listOfWords) || listOfWords.empty()) {
      return this;
   }
   var regexStr = "(^|\\W)("+listOfWords[0];
   for(var i=1;i<listOfWords.length;i++) {
      regexStr += "|" + listOfWords[i];
   }
   regexStr += ")(\\W|$)";
   return this.replace(new RegExp(regexStr,"gi"), "");
}
String.prototype.trim=function(){
   return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
String.prototype.getTextBetween=function(front, end){
   if (this==null){return null;}
   var startIndex=0;
   var endIndex=this.length-1;
   if (front!=null){startIndex=this.indexOf(front)+front.length;}
   if (end!=null){endIndex=this.lastIndexOf(end);}
   return this.substring(startIndex,endIndex);
};
String.prototype.replaceCharCodes=function(){
   if (this==null){return null;}
   return this.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "\"");
};
String.prototype.replaceHTMLCodes=function(){
   if (this==null){return null;}
   return this.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
};
String.prototype.capitalizeAllFirstLetters = function() {
   return this.replace(/\b[a-z]/g, function(letter){
      return letter.toUpperCase();
   });
};
Number.prototype.toDigits=function(numOfDigits){
   var numberOfMovements = numOfDigits-this.toString().length;
   if (numberOfMovements < 0) {
      return this.toString().substr(Math.abs(numberOfMovements)-1);
   } else {
      var prefix = "";
      for(var i=0;i<numberOfMovements;i++) {prefix += "0";}
      return prefix + this;
   }
};
Array.prototype.empty = function(){
   return this.length == 0;
}
Array.prototype.clone = function(){
   return this.concat([]);
}
Array.prototype.contains = function(index){
   return this.indexOf(index) != -1;
}
Array.prototype.last = function(index){
   if (this.empty()) {return null;}
   return this[this.length-1];
}
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};



/**
 *    Utilities
 */
var UTIL = {
   getID: function(idName) {
      return document.getElementById(idName);
   },
   idExists: function(idName) {
      return this.getID(idName) != null;
   },
   isNumeric : function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
   },
   isArray : function(o) {
      return Object.prototype.toString.call(o) === '[object Array]';
   },
   isFunction : function(o) {
      return Object.prototype.toString.call(o) === '[object Function]';
   },
   inRange : function(low_OR_mid, mid_OR_high, high_OR_null) {
      if (arguments.length == 2) {
         return low_OR_mid <= mid_OR_high;
      }
      return low_OR_mid <= mid_OR_high && mid_OR_high <= high_OR_null;
   },
   isjQuery : function(obj) {
      return obj instanceof jQuery;
   },
}
}
/*===============================*\
|*        __PARSE_PAGE__         *|
\*===============================*/
{/*Expand this to see the page parsing code*/
//Check to see if local storage is supported
if (!('localStorage' in window) || window['localStorage'] === null){
   alert("Local Storage is not supported, update your browser.");
   return;
}
//Avoids stupid errors
if (document.body == null || document.body.className == "PSSRCHPAGE") {
   return;
}

var BROWSER = {
   FIREFOX  : 0,
   CHROME   : 1,
   OTHER    : 2,
}

var PAGEINFO = {
   URL               : document.location.href,
   DOMAIN            : document.domain,
   TYPE              : null,
   TITLE             : document.title,
   IN_IFRAME         : top != self,
   BROWSER           : (function(){var ua = navigator.userAgent.toLowerCase();var b;if (ua.contains("firefox")) {b = BROWSER.FIREFOX;this.BROWSER_VERSION = ua.substr(ua.lastIndexOf("firefox/")+8);} else if (ua.contains("chrome")) {b = BROWSER.CHROME;var ua = navigator.userAgent.toLowerCase();var start = ua.lastIndexOf("chrome/")+7;this.BROWSER_VERSION = ua.substring(start, ua.indexOf(" ", start));} else {b = BROWSER.OTHER;}return b;})(),
   BROWSER_VERSION   : (function(){var ua = navigator.userAgent.toLowerCase();var b;if (ua.contains("firefox")) {b = ua.substr(ua.lastIndexOf("firefox/")+8);} else if (ua.contains("chrome")) {var ua = navigator.userAgent.toLowerCase();var start = ua.lastIndexOf("chrome/")+7;b = ua.substring(start, ua.indexOf(" ", start));} else {b = null;}return b;})(),
};

var REVERSE_PAGES = {
   LOGIN             : "LOGIN",
   HOME              : "HOME",
   DOCUMENTS         : "DOCUMENTS",
   PROFILE           : "PROFILE",
   PERSONAL_INFO     : "PERSONAL",
   ACADEMIC_INFO     : "ACADEMIC",
   SKILLS_INVENTORY  : "SKILLS",
   APPLY             : "APPLY",
   SEARCH            : "SEARCH",
   SHORT_LIST        : "LIST",
   APPLICATIONS      : "APPLICATIONS",
   INTERVIEWS        : "INTERVIEWS",
   RANKINGS          : "RANKINGS",
   JOB_DETAILS       : "DETAILS",
   EMPLOYEE_PROFILE  : "EMPLOYEE_PROF",
};

var PAGES = {
   LOGIN          : "LOGIN",
   HOME           : "HOME",
   DOCUMENTS      : "DOCUMENTS",
   PROFILE        : "PROFILE",
   PERSONAL       : "PERSONAL_INFO",
   ACADEMIC       : "ACADEMIC_INFO",
   SKILLS         : "SKILLS_INVENTORY",
   APPLY          : "APPLY",
   SEARCH         : "SEARCH",
   LIST           : "SHORT_LIST",
   APPLICATIONS   : "APPLICATIONS",
   INTERVIEWS     : "INTERVIEWS",
   RANKINGS       : "RANKINGS",
   DETAILS        : "JOB_DETAILS",
   EMPLOYEE_PROF  : "EMPLOYEE_PROFILE",
   
   //Functions
   isValid     : function(page){
      return this.hasOwnProperty(page);
   },
};

/**
 *    Find the page we are currently at
 */
if(PAGEINFO.URL.contains(LINKS.EMPLYR_TOP) || PAGEINFO.URL.contains(LINKS.EMPLYR_FRAME)) {
   window.location.href = LINKS.LOGIN;    //Forces you to be redirected to the student login page
   return;
} else if (PAGEINFO.TITLE.contains("JobMine") && UTIL.idExists("userid") ) {
   PAGEINFO.TYPE = PAGES.LOGIN;
} else if (PAGEINFO.URL.contains("?tab=DEFAULT") && PAGEINFO.URL.contains(CONSTANTS.PAGESIMILARTOP)) {
   PAGEINFO.TYPE = PAGES.HOME;
} else if (PAGEINFO.TITLE == "Job Details") {
   if(UTIL.getID("selected").getElementsByTagName("span")[0].firstChild.nodeValue == "Job Details") {
      PAGEINFO.TYPE = PAGES.DETAILS;
   } else {
      PAGEINFO.TYPE = PAGES.EMPLOYEE_PROF;
   }
} else if (PAGEINFO.TITLE.contains("Student Ranking")) {
   PAGEINFO.TYPE = PAGES.RANKINGS; 
} else {
    switch(PAGEINFO.TITLE) {
        case "Student PDF Library":                PAGEINFO.TYPE = PAGES.DOCUMENTS;    break;
        case "Job Search Component":               PAGEINFO.TYPE = PAGES.SEARCH;       break;
        case "Job Short List":                     PAGEINFO.TYPE = PAGES.LIST;         break;
        case "Student App Summary":                PAGEINFO.TYPE = PAGES.APPLICATIONS; break;
        case "Student Interviews":                 PAGEINFO.TYPE = PAGES.INTERVIEWS;   break;
        case "Create / Maintain student Apps":     PAGEINFO.TYPE = PAGES.APPLY;        break;
        case "Student Data":          //Handle each profile page differently
            try{
                var selectedText = UTIL.getID("selected").getElementsByTagName("span")[0].firstChild.nodeValue;
                switch(selectedText.trim().toLowerCase()) {
                    case "skills inventory":      PAGEINFO.TYPE = PAGES.SKILLS;    break;
                    case "acad info.":            PAGEINFO.TYPE = PAGES.ACADEMIC;  break;
                    case "student personal info": PAGEINFO.TYPE = PAGES.PERSONAL;  break;
                    case "term cards":            PAGEINFO.TYPE = PAGES.PROFILE;   break;
                    default:
                        throw new Error("Unhandled new nav item: "+selectedText.toLowerCase().trim());
                        break;
                }
            }catch(e){alert("There is a problem with the Profile page, cannot parse selected tab\n"+e);}
        break;
   }
}
if (PAGEINFO.TYPE != null) {
   var noClasses = document.body.className == "";
   document.body.className += (noClasses ? "" : " ") + PAGEINFO.TYPE;
   if (PAGEINFO.IN_IFRAME) {
      document.body.className += " iframe";
   }
}
//Set inital stuff
OBJECTS.STORAGE = (PAGEINFO.BROWSER == BROWSER.FIREFOX ? unsafeWindow.localStorage : localStorage);      //Fixes FF3.5/6

}
/*==================================*\
|*      __USERSCRIPTS_BRIDGE__      *|
\*==================================*/
/**
 *    Functions that accept 'arguments', must be formatted by {varNamePageNamespace: varFromUserscriptNamespace}
 *    Return values can only be strings, ints and booleans, no object! To store arrays, use a string delimited by commas
 *    Independent of 3rd party libraries
 *    Implementation:
 *       BRIDGE.registerFunction(nameOfFunction, functionObj);
 *       BRIDGE.unregisterFunction(nameOfFunction);
 *       BRIDGE.addFunction(nameOfFunction, codeOfFunction);
 *       BRIDGE.addJS(jsCode, arguments);
 *       BRIDGE.run(codeOfFunction, callbackFunction, arguments);
 *       BRIDGE.click(objectToBeClicked);
 *       BRIDGE.read(varName, callbackFunction, arguments);
 */
var BRIDGE = {
   returnObj         : null,
   callback          : function(){},
   GMFunctions       : [],
   runQueue          : [],  //Glitch in chrome that window.location has timing issues so it must be synchronized
   isRunningCommand  : false,
   domReady          : false,
   init: function() {
      //Do allow the init to happen if the object exists
      if(document.getElementById("USERSCRIPT_BRIDGE")){return;}
      
      //Add the passing function
      var pass = document.createElement("div");
      pass.style.visiblity = "hidden"; pass.id = "USERSCRIPT_BRIDGE";
      document.body.appendChild(pass);
      this.returnObj = pass;
     
      //Attach detecting function events to page
      this.addJS(function(){
         if(bridge_evt1 == null) {
            var bridge_evt1 = document.createEvent("Event");
            bridge_evt1.initEvent("BRIDGE_RETURN", true, true);
         }
         if(bridge_evt2 == null) {
            var bridge_evt2 = document.createEvent("Event");
            bridge_evt2.initEvent("BRIDGE_RUNFUNCTION", true, true);
         }
         if(bridge_evt3 == null) {
            var bridge_evt3 = document.createEvent("Event");
            bridge_evt3.initEvent("BRIDGE_RUNNEXTCOMMAND", true, true);
         }
         //Throws and returns a value
         function throwBridgeEvent(value) {
            if (value != null) {
               document.getElementById("USERSCRIPT_BRIDGE").setAttribute("return", value);
            } else {
               document.getElementById("USERSCRIPT_BRIDGE").removeAttribute("return");
            }
            document.dispatchEvent(bridge_evt1);
         }
         function runNextBridgeFunction() {
            document.dispatchEvent(bridge_evt3);
         }
         function convertArgumentsToBridgePass(obj) { 
            if(Object.prototype.toString.call(obj) != "[object Arguments]" && Object.prototype.toString.call(obj) != "[object Object]" || arguments.length == 0) {
               return null;
            }
            //Check each arguement and form a string to pass
            var returnStr = '';
            var currentObj = obj[0];
            if (currentObj != null) {
               if((typeof currentObj).toLowerCase() != "object") {
                  returnStr += currentObj;
               } else if (Object.prototype.toString.call( currentObj ) === '[object Array]') {
                  returnStr += currentObj.join("{|||}");
               } else {
                  return null;
               }
            } else {
               returnStr += "(|||)"; //<----symbol for null
            }
            for(var i=1; i<obj.length;i++) {
               returnStr += "[|||]";   //<---separate arguments
               currentObj = obj[i];
               if (currentObj != null) {
                  if((typeof currentObj).toLowerCase() != "object") {
                     returnStr += currentObj;
                  } else if (Object.prototype.toString.call( currentObj ) === '[object Array]') {
                     currentObj.push(1);
                     returnStr += currentObj.join("{|||}");
                  } else {
                     return null;
                  }
               }
               else {
                  returnStr += "(|||)"; //<----symbol for null
               }
            }
            return returnStr;
         }
      });
      
      //Attach event and define the callback
      function bridgeReturnSimpleValue() {  
         //Save and send the data
         if(BRIDGE.callback) {
            var value = BRIDGE.returnObj.getAttribute("return");
            if (value) {
               //Parse the value by type
               if (value.length > 1 && value.charAt(0) == "0") {
                  //Do nothing, leave number with leading zeros alone
               } else if(value*1 == value) { //Int
                  value *= 1;
               } else {
                  switch( value.toUpperCase() ) {
                     //Boolean
                     case "FALSE":  value = false; break;
                     case "TRUE":   value = true;  break;
                  }
               }
            }
            BRIDGE.callback(value);
            BRIDGE.callback = null;
         }
      }
      function handleGMFunction() {
         //Pass arguments into the new function
         var args = BRIDGE.returnObj.getAttribute("pass");
         if (args != null) {
            args = args.split("[|||]");
            BRIDGE.returnObj.removeAttribute("pass");
            var tempArgs = [];
            //Parse arguments if null exists
            for(var i=0;i<args.length;i++) {
               if (args[i] == "(|||)") {  //<---if null exists
                  tempArgs.push(null);
               } else if(args[i].indexOf("{|||}") != -1) {  
                  var arg = args[i].split("{|||}");
                  arg.pop();
                  tempArgs.push(arg);
               } else {
                  var value = args[i];
                  switch( value.toUpperCase() ) {
                     //Boolean
                     case "FALSE":  value = false; break;
                     case "TRUE":   value = true;  break;
                  }
                  tempArgs.push(value);
               }
            }
            args = tempArgs;
         } else {
            args = null;
         }
         var value = BRIDGE.returnObj.getAttribute("run");
         BRIDGE.returnObj.removeAttribute("run");
         //Run the function here
         var returnVal = BRIDGE.GMFunctions[value].apply(this,args);
         if (returnVal != null) {
            BRIDGE.returnObj.setAttribute("return", returnVal);
         } else {
            BRIDGE.returnObj.removeAttribute("return");
         }
      }
      document.addEventListener("BRIDGE_RETURN", bridgeReturnSimpleValue, false);
      document.addEventListener("BRIDGE_RUNFUNCTION", handleGMFunction, false);
      document.addEventListener("BRIDGE_RUNNEXTCOMMAND", this.runNextQueueCommand, false);
   },
   //Registers a function in the userscript namespace and can be called from the page
   registerFunction : function(name, function_code) {
      this.GMFunctions[name] = function_code;
      
      //Place the a copy of the function on the dom but still calls up here
      this.addFunction(name, function(){
         var args = convertArgumentsToBridgePass(arguments);
         var bridge = document.getElementById("USERSCRIPT_BRIDGE");
         if(args != null) {
            bridge.setAttribute("pass", args);
         }
         bridge.setAttribute("run", function_name);
         document.dispatchEvent(bridge_evt2);
         var value = bridge.getAttribute("return");
         if (value) {
            //Parse the return value by type
            if(value.length > 1 && value.charAt(0) == "0") {
               //Do nothing, leading 0 number then leave it as string
            } else if(value*1 == value){               //Int
               value *= 1;
            }else{
               switch( value.toUpperCase() ) {
                  //Boolean
                  case "FALSE":  value = false; break;
                  case "TRUE":   value = true;  break;
               }
            }
         }
         return value;
      }, {function_name: name});
      
   },
   //Unregisters a userscript function
   unregisterFunction : function(name) {
      if(this.GMFunctions.hasOwnProperty(name)) {
         this.GMFunctions[name] = null;
         
         //Nulls the function on the page
         this.appendScript(name + " = null;");
         return true;
      }
      return false;
   },
   //Adds a function to the page
   addFunction : function(name, function_code, arguments) {  
      if (function_code == null){ function_code = function(){}; }
      //Add the function with the name and function
      function_code = this.handleArguments(function_code, arguments);
      
      if(function_code == null || name == null) {return;}
      var code = (function_code+"").replace("function", "function " + name);
      this.appendScript(code);
   },
   //Adds some javascript to the page
   addJS : function( code, arguments ) {
      if(code == null) {return;}
      //Check to see if its a function then remove the function part and the last }
      if(typeof(code) == "function") {  
         code = this.handleArguments(code, arguments);
         
         //Strips the function(){} wrapper
         code =  (code+"").replace(/\n/g, "");    //Convert to string
         code = code.replace(/^[^{]*?{/, "");
         code = code.substring(0, code.lastIndexOf("}"));
         this.appendScript(code);
      }
   },
   //Simulate a click
   click : function ( obj ) {
      if(obj == null){return false;}
      var evt = document.createEvent("HTMLEvents"); 
      evt.initEvent("click", true, true);
      obj.dispatchEvent(evt);
   },
   //Get a variable from the namespace of the page, asynchonized
   read : function ( _global_var, _callback, _arguments ) {
      this.run("function(){throwBridgeEvent(" + _global_var + ");}", _callback, _arguments);
   },
   //Execute code on the webpage
   run : function( _function_code, _callback, _arguments ) {
      _function_code = this.handleArguments(_function_code, _arguments);
      if(_function_code == null) {return;}

      //escape() is a workaround so that code is not interpreted incorrectly
      if(_callback != null && typeof(_callback) == "function"){
         this.runQueue.push({
            callback: _callback,
            command: "throwBridgeEvent( (" + escape(_function_code) + ")() );runNextBridgeFunction();"
         });
      }else{
         this.runQueue.push({
            callback: _callback,
            command: "(" + escape(_function_code) + ")();runNextBridgeFunction();"
         });
      }
      //Attempt to run the command in the queue
      this.runNextQueueCommand();
   },
   //Miscellaneous - Internal
   runNextQueueCommand : function(evt) {
      //IF there was an event, this was called via last queue item was finished
      if(evt) {
         BRIDGE.isRunningCommand = false;
      }
      //Run something in the queue
      if(BRIDGE.runQueue.length > 0) {
         if (!BRIDGE.isRunningCommand) {
            BRIDGE.isRunningCommand = true;
            var item = BRIDGE.runQueue.shift();
            
            var callback   = item.callback;
            var command    = item.command;
            
            //Set the last callback and run
            BRIDGE.callback = callback;
            location.href = ("javascript:" + command);
            item = null;
         }
      } else {
         //Finished
         BRIDGE.isRunningCommand = false;
      }
   },
   appendScript : function(_code) {
      var script = document.createElement("script");
      script.innerHTML = _code;
      this.returnObj.appendChild(script)
   },
   handleArguments : function(_code, _arguments, _escapeArguments) {
      if(_code       == null) {return null;}
      if(_arguments  == null) {return _code;}
      
      //Loop through each and place the initial varibles
      var initVar = "";
      for(var variable in _arguments) {
         var value = _arguments[variable];
         if(this.isArray(value)){
            if(_escapeArguments) {
               value = "('" + escape(value.join("|||")) + "').split('%7C%7C%7C')";     //each '%7C' is '|'
            } else {
               value = "('" + value.join("|||") + "').split('|||')";     //each '%7C' is '|'
            }
         } else if (typeof(value) == "string" || typeof(value) == "object") {
            if(_escapeArguments) {
               value = "'" + escape(value) + "'";
            } else {
               value = "'" + value + "'";
            }
         }
         initVar += "var " + variable + " = " + value + ";";
      }
      return (_code + "").replace(/^[^{]*?{/, "function(){" + initVar);
   },
   isArray : function(arr) {
      return Object.prototype.toString.call( arr ) === '[object Array]';
   },
};
BRIDGE.init();

/*============================================*\
|*   __JQUERY_SIZZLE_TABLESORTER_LIBRARIES__  *|
\*============================================*/
{/*Expand to see jQuery Code*/
(function(a,b){function cu(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cr(a){if(!cg[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ch||(ch=c.createElement("iframe"),ch.frameBorder=ch.width=ch.height=0),b.appendChild(ch);if(!ci||!ch.createElement)ci=(ch.contentWindow||ch.contentDocument).document,ci.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),ci.close();d=ci.createElement(a),ci.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ch)}cg[a]=e}return cg[a]}function cq(a,b){var c={};f.each(cm.concat.apply([],cm.slice(0,b)),function(){c[this]=a});return c}function cp(){cn=b}function co(){setTimeout(cp,0);return cn=f.now()}function cf(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ce(){try{return new a.XMLHttpRequest}catch(b){}}function b$(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bZ(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bY(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bA.test(a)?d(a,e):bY(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bY(a+"["+e+"]",b[e],c,d);else d(a,b)}function bX(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bW(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bP,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bW(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bW(a,c,d,e,"*",g));return l}function bV(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bL),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function by(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bt:bu;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bv(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function bl(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bd,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bk(a){f.nodeName(a,"input")?bj(a):"getElementsByTagName"in a&&f.grep(a.getElementsByTagName("input"),bj)}function bj(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bi(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bh(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bg(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bf(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function V(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(Q.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function U(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function M(a,b){return(a&&a!=="*"?a+".":"")+b.replace(y,"`").replace(z,"&")}function L(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(w,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function J(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function D(){return!0}function C(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function K(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(K,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z]|[0-9])/ig,x=/^-ms-/,y=function(a,b){return(b+"").toUpperCase()},z=d.userAgent,A,B,C,D=Object.prototype.toString,E=Object.prototype.hasOwnProperty,F=Array.prototype.push,G=Array.prototype.slice,H=String.prototype.trim,I=Array.prototype.indexOf,J={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.4",length:0,size:function(){return this.length},toArray:function(){return G.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?F.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),B.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(G.apply(this,arguments),"slice",G.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:F,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;B.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!B){B=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",C,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",C),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&K()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):J[D.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!E.call(a,"constructor")&&!E.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||E.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(x,"ms-").replace(w,y)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:H?function(a){return a==null?"":H.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?F.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(!b)return-1;if(I)return I.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=G.call(arguments,2),g=function(){return a.apply(c,f.concat(G.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){J["[object "+b+"]"]=b.toLowerCase()}),A=e.uaMatch(z),A.browser&&(e.browser[A.browser]=!0,e.browser.version=A.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?C=function(){c.removeEventListener("DOMContentLoaded",C,!1),e.ready()}:c.attachEvent&&(C=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",C),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g+"With"](this===b?d:this,[h])}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.firstChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},m&&f.extend(p,{position:"absolute",left:"-1000px",top:"-1000px"});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0),o.innerHTML="",n.removeChild(o);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i=f.expando,j=typeof c=="string",k=a.nodeType,l=k?f.cache:a,m=k?a[f.expando]:a[f.expando]&&f.expando;if((!m||e&&m&&l[m]&&!l[m][i])&&j&&d===b)return;m||(k?a[f.expando]=m=++f.uuid:m=f.expando),l[m]||(l[m]={},k||(l[m].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?l[m][i]=f.extend(l[m][i],c):l[m]=f.extend(l[m],c);g=l[m],e&&(g[i]||(g[i]={}),g=g[i]),d!==b&&(g[f.camelCase(c)]=d);if(c==="events"&&!g[c])return g[i]&&g[i].events;j?(h=g[c],h==null&&(h=g[f.camelCase(c)])):h=g;return h}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e=f.expando,g=a.nodeType,h=g?f.cache:a,i=g?a[f.expando]:f.expando;if(!h[i])return;if(b){d=c?h[i][e]:h[i];if(d){d[b]||(b=f.camelCase(b)),delete d[b];if(!l(d))return}}if(c){delete h[i][e];if(!l(h[i]))return}var j=h[i][e];f.support.deleteExpando||!h.setInterval?delete h[i]:h[i]=null,j?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=j):g&&(f.support.deleteExpando?delete a[f.expando]:a.removeAttribute?a.removeAttribute(f.expando):a[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u,v;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(o);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(o);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(n," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;d=e.value;return typeof d=="string"?d.replace(p,""):d==null?"":d}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);j&&(c=f.attrFix[c]||c,i=f.attrHooks[c],i||(t.test(c)?i=v:u&&(i=u)));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j&&(h=i.get(a,c))!==null)return h;h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.attr(a,b,""),a.removeAttribute(b),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(u&&f.nodeName(a,"button"))return u.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(u&&f.nodeName(a,"button"))return u.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);i&&(c=f.propFix[c]||c,h=f.propHooks[c]);return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==null?g:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabIndex=f.propHooks.tabIndex,v={get:function(a,c){var d;return f.prop(a,c)===!0||(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},f.support.getSetAttribute||(u=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var w=/\.(.*)$/,x=/^(?:textarea|input|select)$/i,y=/\./g,z=/ /g,A=/[^\w\s.|`]/g,B=function(a){return a.replace(A,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=C;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=C);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),B).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,M(a.origType,a.selector),f.extend({},a,{handler:L,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,M(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?D:C):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=D;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=D;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=D,this.stopPropagation()},isDefaultPrevented:C,isPropagationStopped:C,isImmediatePropagationStopped:C};var E=function(a){var b=a.relatedTarget,c=!1,d=a.type;a.type=a.data,b!==this&&(b&&(c=f.contains(this,b)),c||(f.event.handle.apply(this,arguments),a.type=d))},F=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?F:E,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?F:E)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="submit"||c==="image")&&f(b).closest("form").length&&J("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&J("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var G,H=function(a){var b=f.nodeName(a,"input")?a.type:"",c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},I=function(c){var d=c.target,e,g;if(!!x.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=H(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:I,beforedeactivate:I,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&I.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&I.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",H(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in G)f.event.add(this,c+".specialChange",G[c]);return x.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return x.test(this.nodeName)}},G=f.event.special.change.filters,G.focus=G.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var K={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||C,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=w.exec(h),k="",j&&(k=j[0],h=h.replace(w,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,K[h]?(a.push(K[h]+k),h=h+k):h=(K[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+M(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+M(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var N=/Until$/,O=/^(?:parents|prevUntil|prevAll)/,P=/,/,Q=/^.[^:#\[\.,]*$/,R=Array.prototype.slice,S=f.expr.match.POS,T={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(V(this,a,!1),"not",a)},filter:function(a){return this.pushStack(V(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=S.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=S.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(U(c[0])||U(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=R.call(arguments);N.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!T[a]?f.unique(e):e,(this.length>1||P.test(d))&&O.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|object|embed|option|style)/i,bb=/checked\s*(?:[^=]|=\s*.checked.)/i,bc=/\/(java|ecma)script/i,bd=/^\s*<!(?:\[CDATA\[|\-\-)/,be={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};be.optgroup=be.option,be.tbody=be.tfoot=be.colgroup=be.caption=be.thead,be.th=be.td,f.support.htmlSerialize||(be._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!be[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bb.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bf(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bl)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i;b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!ba.test(a[0])&&(f.support.checkClone||!bb.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bh(a,d),e=bi(a),g=bi(d);for(h=0;e[h];++h)g[h]&&bh(e[h],g[h])}if(b){bg(a,d);if(c){e=bi(a),g=bi(d);for(h=0;e[h];++h)bg(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=be[l]||be._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bk(k[i]);else bk(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bc.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bm=/alpha\([^)]*\)/i,bn=/opacity=([^)]*)/,bo=/([A-Z]|^ms)/g,bp=/^-?\d+(?:px)?$/i,bq=/^-?\d/,br=/^([\-+])=([\-+.\de]+)/,bs={position:"absolute",visibility:"hidden",display:"block"},bt=["Left","Right"],bu=["Top","Bottom"],bv,bw,bx;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bv(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=br.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bv)return bv(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return by(a,b,d);f.swap(a,bs,function(){e=by(a,b,d)});return e}},set:function(a,b){if(!bp.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bn.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bm,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bm.test(g)?g.replace(bm,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bv(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bw=function(a,c){var d,e,g;c=c.replace(bo,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bx=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bp.test(d)&&bq.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bv=bw||bx,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bz=/%20/g,bA=/\[\]$/,bB=/\r?\n/g,bC=/#.*$/,bD=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bE=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bF=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bG=/^(?:GET|HEAD)$/,bH=/^\/\//,bI=/\?/,bJ=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bK=/^(?:select|textarea)/i,bL=/\s+/,bM=/([?&])_=[^&]*/,bN=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bO=f.fn.load,bP={},bQ={},bR,bS,bT=["*/"]+["*"];try{bR=e.href}catch(bU){bR=c.createElement("a"),bR.href="",bR=bR.href}bS=bN.exec(bR.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bO)return bO.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bJ,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bK.test(this.nodeName)||bE.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bB,"\r\n")}}):{name:b.name,value:c.replace(bB,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?bX(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),bX(a,b);return a},ajaxSettings:{url:bR,isLocal:bF.test(bS[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bT},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bV(bP),ajaxTransport:bV(bQ),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?bZ(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=b$(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bD.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bC,"").replace(bH,bS[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bL),d.crossDomain==null&&(r=bN.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bS[1]&&r[2]==bS[2]&&(r[3]||(r[1]==="http:"?80:443))==(bS[3]||(bS[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bW(bP,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bG.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bI.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bM,"$1_="+x);d.url=y+(y===d.url?(bI.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bT+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bW(bQ,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){s<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bY(g,a[g],c,e);return d.join("&").replace(bz,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var b_=f.now(),ca=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+b_++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ca.test(b.url)||e&&ca.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ca,l),b.url===j&&(e&&(k=k.replace(ca,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cb=a.ActiveXObject?function(){for(var a in cd)cd[a](0,1)}:!1,cc=0,cd;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ce()||cf()}:ce,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cb&&delete cd[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cc,cb&&(cd||(cd={},f(a).unload(cb)),cd[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cg={},ch,ci,cj=/^(?:toggle|show|hide)$/,ck=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cl,cm=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cn;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cq("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cr(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cq("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cq("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cr(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cj.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=ck.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cq("show",1),slideUp:cq("hide",1),slideToggle:cq("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function g(a){return d.step(a)}var d=this,e=f.fx;this.startTime=cn||co(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,g.elem=this.elem,g()&&f.timers.push(g)&&!cl&&(cl=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cn||co(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cl),cl=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cs=/^t(?:able|d|h)$/i,ct=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cu(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cs.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=ct.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!ct.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cu(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cu(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a&&a.style?parseFloat(f.css(a,d,"padding")):null},f.fn["outer"+c]=function(a){var b=this[0];return b&&b.style?parseFloat(f.css(b,d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNaN(j)?i:j}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);
(function($){$.extend({tablesorter:new function(){var parsers=[],widgets=[];this.defaults={cssHeader:"header",cssAsc:"headerSortUp",cssDesc:"headerSortDown",cssChildRow:"expand-child",sortInitialOrder:"asc",sortMultiSortKey:"shiftKey",sortForce:null,sortAppend:null,sortLocaleCompare:true,textExtraction:"simple",parsers:{},widgets:[],widgetZebra:{css:["even","odd"]},headers:{},widthFixed:false,cancelSelection:true,sortList:[],headerList:[],dateFormat:"us",decimal:'/\.|\,/g',onRenderHeader:null,selectorHeaders:'thead th',debug:false};function benchmark(s,d){log(s+","+(new Date().getTime()-d.getTime())+"ms");}this.benchmark=benchmark;function log(s){if(typeof console!="undefined"&&typeof console.debug!="undefined"){console.log(s);}else{alert(s);}}function buildParserCache(table,$headers){if(table.config.debug){var parsersDebug="";}if(table.tBodies.length==0)return;var rows=table.tBodies[0].rows;if(rows[0]){var list=[],cells=rows[0].cells,l=cells.length;for(var i=0;i<l;i++){var p=false;if($.metadata&&($($headers[i]).metadata()&&$($headers[i]).metadata().sorter)){p=getParserById($($headers[i]).metadata().sorter);}else if((table.config.headers[i]&&table.config.headers[i].sorter)){p=getParserById(table.config.headers[i].sorter);}if(!p){p=detectParserForColumn(table,rows,-1,i);}if(table.config.debug){parsersDebug+="column:"+i+" parser:"+p.id+"\n";}list.push(p);}}if(table.config.debug){log(parsersDebug);}return list;};function detectParserForColumn(table,rows,rowIndex,cellIndex){var l=parsers.length,node=false,nodeValue=false,keepLooking=true;while(nodeValue==''&&keepLooking){rowIndex++;if(rows[rowIndex]){node=getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex);nodeValue=trimAndGetNodeText(table.config,node);if(table.config.debug){log('Checking if value was empty on row:'+rowIndex);}}else{keepLooking=false;}}for(var i=1;i<l;i++){if(parsers[i].is(nodeValue,table,node)){return parsers[i];}}return parsers[0];}function getNodeFromRowAndCellIndex(rows,rowIndex,cellIndex){return rows[rowIndex].cells[cellIndex];}function trimAndGetNodeText(config,node){return $.trim(getElementText(config,node));}function getParserById(name){var l=parsers.length;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==name.toLowerCase()){return parsers[i];}}return false;}function buildCache(table){if(table.config.debug){var cacheTime=new Date();}var totalRows=(table.tBodies[0]&&table.tBodies[0].rows.length)||0,totalCells=(table.tBodies[0].rows[0]&&table.tBodies[0].rows[0].cells.length)||0,parsers=table.config.parsers,cache={row:[],normalized:[]};for(var i=0;i<totalRows;++i){var c=$(table.tBodies[0].rows[i]),cols=[];if(c.hasClass(table.config.cssChildRow)){cache.row[cache.row.length-1]=cache.row[cache.row.length-1].add(c);continue;}cache.row.push(c);for(var j=0;j<totalCells;++j){cols.push(parsers[j].format(getElementText(table.config,c[0].cells[j]),table,c[0].cells[j]));}cols.push(cache.normalized.length);cache.normalized.push(cols);cols=null;};if(table.config.debug){benchmark("Building cache for "+totalRows+" rows:",cacheTime);}return cache;};function getElementText(config,node){var text="";if(!node)return"";if(!config.supportsTextContent)config.supportsTextContent=node.textContent||false;if(config.textExtraction=="simple"){if(config.supportsTextContent){text=node.textContent;}else{if(node.childNodes[0]&&node.childNodes[0].hasChildNodes()){text=node.childNodes[0].innerHTML;}else{text=node.innerHTML;}}}else{if(typeof(config.textExtraction)=="function"){text=config.textExtraction(node);}else{text=$(node).text();}}return text;}function appendToTable(table,cache){if(table.config.debug){var appendTime=new Date()}var c=cache,r=c.row,n=c.normalized,totalRows=n.length,checkCell=(n[0].length-1),tableBody=$(table.tBodies[0]),rows=[];for(var i=0;i<totalRows;i++){var pos=n[i][checkCell];rows.push(r[pos]);if(!table.config.appender){var l=r[pos].length;for(var j=0;j<l;j++){tableBody[0].appendChild(r[pos][j]);}}}if(table.config.appender){table.config.appender(table,rows);}rows=null;if(table.config.debug){benchmark("Rebuilt table:",appendTime);}applyWidget(table);setTimeout(function(){$(table).trigger("sortEnd");},0);};function buildHeaders(table){if(table.config.debug){var time=new Date();}var meta=($.metadata)?true:false;var header_index=computeTableHeaderCellIndexes(table);$tableHeaders=$(table.config.selectorHeaders,table).each(function(index){this.column=header_index[this.parentNode.rowIndex+"-"+this.cellIndex];this.order=formatSortingOrder(table.config.sortInitialOrder);this.count=this.order;if(checkHeaderMetadata(this)||checkHeaderOptions(table,index))this.sortDisabled=true;if(checkHeaderOptionsSortingLocked(table,index))this.order=this.lockedOrder=checkHeaderOptionsSortingLocked(table,index);if(!this.sortDisabled){var $th=$(this).addClass(table.config.cssHeader);if(table.config.onRenderHeader)table.config.onRenderHeader.apply($th);}table.config.headerList[index]=this;});if(table.config.debug){benchmark("Built headers:",time);log($tableHeaders);}return $tableHeaders;};function computeTableHeaderCellIndexes(t){var matrix=[];var lookup={};var thead=t.getElementsByTagName('THEAD')[0];var trs=thead.getElementsByTagName('TR');for(var i=0;i<trs.length;i++){var cells=trs[i].cells;for(var j=0;j<cells.length;j++){var c=cells[j];var rowIndex=c.parentNode.rowIndex;var cellId=rowIndex+"-"+c.cellIndex;var rowSpan=c.rowSpan||1;var colSpan=c.colSpan||1; var firstAvailCol;if(typeof(matrix[rowIndex])=="undefined"){matrix[rowIndex]=[];}for(var k=0;k<matrix[rowIndex].length+1;k++){if(typeof(matrix[rowIndex][k])=="undefined"){firstAvailCol=k;break;}}lookup[cellId]=firstAvailCol;for(var k=rowIndex;k<rowIndex+rowSpan;k++){if(typeof(matrix[k])=="undefined"){matrix[k]=[];}var matrixrow=matrix[k];for(var l=firstAvailCol;l<firstAvailCol+colSpan;l++){matrixrow[l]="x";}}}}return lookup;}function checkCellColSpan(table,rows,row){var arr=[],r=table.tHead.rows,c=r[row].cells;for(var i=0;i<c.length;i++){var cell=c[i];if(cell.colSpan>1){arr=arr.concat(checkCellColSpan(table,headerArr,row++));}else{if(table.tHead.length==1||(cell.rowSpan>1||!r[row+1])){arr.push(cell);}}}return arr;};function checkHeaderMetadata(cell){if(($.metadata)&&($(cell).metadata().sorter===false)){return true;};return false;}function checkHeaderOptions(table,i){if((table.config.headers[i])&&(table.config.headers[i].sorter===false)){return true;};return false;}function checkHeaderOptionsSortingLocked(table,i){if((table.config.headers[i])&&(table.config.headers[i].lockedOrder))return table.config.headers[i].lockedOrder;return false;}function applyWidget(table){var c=table.config.widgets;var l=c.length;for(var i=0;i<l;i++){getWidgetById(c[i]).format(table);}}function getWidgetById(name){var l=widgets.length;for(var i=0;i<l;i++){if(widgets[i].id.toLowerCase()==name.toLowerCase()){return widgets[i];}}};function formatSortingOrder(v){if(typeof(v)!="Number"){return(v.toLowerCase()=="desc")?1:0;}else{return(v==1)?1:0;}}function isValueInArray(v,a){var l=a.length;for(var i=0;i<l;i++){if(a[i][0]==v){return true;}}return false;}function setHeadersCss(table,$headers,list,css){$headers.removeClass(css[0]).removeClass(css[1]);var h=[];$headers.each(function(offset){if(!this.sortDisabled){h[this.column]=$(this);}});var l=list.length;for(var i=0;i<l;i++){h[list[i][0]].addClass(css[list[i][1]]);}}function fixColumnWidth(table,$headers){var c=table.config;if(c.widthFixed){var colgroup=$('<colgroup>');$("tr:first td",table.tBodies[0]).each(function(){colgroup.append($('<col>').css('width',$(this).width()));});$(table).prepend(colgroup);};}function updateHeaderSortCount(table,sortList){var c=table.config,l=sortList.length;for(var i=0;i<l;i++){var s=sortList[i],o=c.headerList[s[0]];o.count=s[1];o.count++;}}function multisort(table,sortList,cache){if(table.config.debug){var sortTime=new Date();}var dynamicExp="var sortWrapper = function(a,b) {",l=sortList.length;for(var i=0;i<l;i++){var c=sortList[i][0];var order=sortList[i][1];var s=(table.config.parsers[c].type=="text")?((order==0)?makeSortFunction("text","asc",c):makeSortFunction("text","desc",c)):((order==0)?makeSortFunction("numeric","asc",c):makeSortFunction("numeric","desc",c));var e="e"+i;dynamicExp+="var "+e+" = "+s;dynamicExp+="if("+e+") { return "+e+"; } ";dynamicExp+="else { ";}var orgOrderCol=cache.normalized[0].length-1;dynamicExp+="return a["+orgOrderCol+"]-b["+orgOrderCol+"];";for(var i=0;i<l;i++){dynamicExp+="}; ";}dynamicExp+="return 0; ";dynamicExp+="}; ";if(table.config.debug){benchmark("Evaling expression:"+dynamicExp,new Date());}eval(dynamicExp);cache.normalized.sort(sortWrapper);if(table.config.debug){benchmark("Sorting on "+sortList.toString()+" and dir "+order+" time:",sortTime);}return cache;};function makeSortFunction(type,direction,index){var a="a["+index+"]",b="b["+index+"]";if(type=='text'&&direction=='asc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+a+" < "+b+") ? -1 : 1 )));";}else if(type=='text'&&direction=='desc'){return"("+a+" == "+b+" ? 0 : ("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : ("+b+" < "+a+") ? -1 : 1 )));";}else if(type=='numeric'&&direction=='asc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+a+" - "+b+"));";}else if(type=='numeric'&&direction=='desc'){return"("+a+" === null && "+b+" === null) ? 0 :("+a+" === null ? Number.POSITIVE_INFINITY : ("+b+" === null ? Number.NEGATIVE_INFINITY : "+b+" - "+a+"));";}};function makeSortText(i){return"((a["+i+"] < b["+i+"]) ? -1 : ((a["+i+"] > b["+i+"]) ? 1 : 0));";};function makeSortTextDesc(i){return"((b["+i+"] < a["+i+"]) ? -1 : ((b["+i+"] > a["+i+"]) ? 1 : 0));";};function makeSortNumeric(i){return"a["+i+"]-b["+i+"];";};function makeSortNumericDesc(i){return"b["+i+"]-a["+i+"];";};function sortText(a,b){if(table.config.sortLocaleCompare)return a.localeCompare(b);return((a<b)?-1:((a>b)?1:0));};function sortTextDesc(a,b){if(table.config.sortLocaleCompare)return b.localeCompare(a);return((b<a)?-1:((b>a)?1:0));};function sortNumeric(a,b){return a-b;};function sortNumericDesc(a,b){return b-a;};function getCachedSortType(parsers,i){return parsers[i].type;};this.construct=function(settings){return this.each(function(){if(!this.tHead||!this.tBodies)return;var $this,$document,$headers,cache,config,shiftDown=0,sortOrder;this.config={};config=$.extend(this.config,$.tablesorter.defaults,settings);$this=$(this);$.data(this,"tablesorter",config);$headers=buildHeaders(this);this.config.parsers=buildParserCache(this,$headers);cache=buildCache(this);var sortCSS=[config.cssDesc,config.cssAsc];fixColumnWidth(this);$headers.click(function(e){var totalRows=($this[0].tBodies[0]&&$this[0].tBodies[0].rows.length)||0;if(!this.sortDisabled&&totalRows>0){$this.trigger("sortStart");var $cell=$(this);var i=this.column;this.order=this.count++%2;if(this.lockedOrder)this.order=this.lockedOrder;if(!e[config.sortMultiSortKey]){config.sortList=[];if(config.sortForce!=null){var a=config.sortForce;for(var j=0;j<a.length;j++){if(a[j][0]!=i){config.sortList.push(a[j]);}}}config.sortList.push([i,this.order]);}else{if(isValueInArray(i,config.sortList)){for(var j=0;j<config.sortList.length;j++){var s=config.sortList[j],o=config.headerList[s[0]];if(s[0]==i){o.count=s[1];o.count++;s[1]=o.count%2;}}}else{config.sortList.push([i,this.order]);}};setTimeout(function(){setHeadersCss($this[0],$headers,config.sortList,sortCSS);appendToTable($this[0],multisort($this[0],config.sortList,cache));},1);return false;}}).mousedown(function(){if(config.cancelSelection){this.onselectstart=function(){return false};return false;}});$this.bind("update",function(){var me=this;setTimeout(function(){me.config.parsers=buildParserCache(me,$headers);cache=buildCache(me);},1);}).bind("updateCell",function(e,cell){var config=this.config;var pos=[(cell.parentNode.rowIndex-1),cell.cellIndex];cache.normalized[pos[0]][pos[1]]=config.parsers[pos[1]].format(getElementText(config,cell),cell);}).bind("sorton",function(e,list){$(this).trigger("sortStart");config.sortList=list;var sortList=config.sortList;updateHeaderSortCount(this,sortList);setHeadersCss(this,$headers,sortList,sortCSS);appendToTable(this,multisort(this,sortList,cache));}).bind("appendCache",function(){appendToTable(this,cache);}).bind("applyWidgetId",function(e,id){getWidgetById(id).format(this);}).bind("applyWidgets",function(){applyWidget(this);});if($.metadata&&($(this).metadata()&&$(this).metadata().sortlist)){config.sortList=$(this).metadata().sortlist;}if(config.sortList.length>0){$this.trigger("sorton",[config.sortList]);}applyWidget(this);});};this.addParser=function(parser){var l=parsers.length,a=true;for(var i=0;i<l;i++){if(parsers[i].id.toLowerCase()==parser.id.toLowerCase()){a=false;}}if(a){parsers.push(parser);};};this.addWidget=function(widget){widgets.push(widget);};this.formatFloat=function(s){var i=parseFloat(s);return(isNaN(i))?0:i;};this.formatInt=function(s){var i=parseInt(s);return(isNaN(i))?0:i;};this.isDigit=function(s,config){return/^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g,'')));};this.clearTableBody=function(table){if($.browser.msie){function empty(){while(this.firstChild)this.removeChild(this.firstChild);}empty.apply(table.tBodies[0]);}else{table.tBodies[0].innerHTML="";}};}});$.fn.extend({tablesorter:$.tablesorter.construct});var ts=$.tablesorter;ts.addParser({id:"text",is:function(s){return true;},format:function(s){return $.trim(s.toLocaleLowerCase());},type:"text"});ts.addParser({id:"digit",is:function(s,table){var c=table.config;return $.tablesorter.isDigit(s,c);},format:function(s){return $.tablesorter.formatFloat(s);},type:"numeric"});ts.addParser({id:"currency",is:function(s){return/^[A￡$a?￢?.]/.test(s);},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/[A￡$a?￢]/g),""));},type:"numeric"});ts.addParser({id:"ipAddress",is:function(s){return/^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);},format:function(s){var a=s.split("."),r="",l=a.length;for(var i=0;i<l;i++){var item=a[i];if(item.length==2){r+="0"+item;}else{r+=item;}}return $.tablesorter.formatFloat(r);},type:"numeric"});ts.addParser({id:"url",is:function(s){return/^(https?|ftp|file):\/\/$/.test(s);},format:function(s){return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//),''));},type:"text"});ts.addParser({id:"isoDate",is:function(s){return/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);},format:function(s){return $.tablesorter.formatFloat((s!="")?new Date(s.replace(new RegExp(/-/g),"/")).getTime():"0");},type:"numeric"});ts.addParser({id:"percent",is:function(s){return/\%$/.test($.trim(s));},format:function(s){return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g),""));},type:"numeric"});ts.addParser({id:"usLongDate",is:function(s){return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));},format:function(s){return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"shortDate",is:function(s){return/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);},format:function(s,table){var c=table.config;s=s.replace(/\-/g,"/");if(c.dateFormat=="us"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$1/$2");}else if(c.dateFormat=="uk"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,"$3/$2/$1");}else if(c.dateFormat=="dd/mm/yy"||c.dateFormat=="dd-mm-yy"){s=s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/,"$1/$2/$3");}return $.tablesorter.formatFloat(new Date(s).getTime());},type:"numeric"});ts.addParser({id:"time",is:function(s){return/^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);},format:function(s){return $.tablesorter.formatFloat(new Date("2000/01/01 "+s).getTime());},type:"numeric"});ts.addParser({id:"metadata",is:function(s){return false;},format:function(s,table,cell){var c=table.config,p=(!c.parserMetadataName)?'sortValue':c.parserMetadataName;return $(cell).metadata()[p];},type:"numeric"});ts.addWidget({id:"zebra",format:function(table){if(table.config.debug){var time=new Date();}var $tr,row=-1,odd;$("tr:visible",table.tBodies[0]).each(function(i){$tr=$(this);if(!$tr.hasClass(table.config.cssChildRow))row++;odd=(row%2==0);$tr.removeClass(table.config.widgetZebra.css[odd?0:1]).addClass(table.config.widgetZebra.css[odd?1:0])});if(table.config.debug){$.tablesorter.benchmark("Applying Zebra widget",time);}}});})(jQuery);

/**
 *    jQuery Extended Functions
 */
//Plaintext: returns empty if text does not exist or trimmed text from element, also replaces &nbsp;
jQuery.fn.plainText = function(){
   return this == null ? "" : this.text().trim().replace(/\xA0/g, " ");
};

//Element exist?
jQuery.fn.exists = function(){return jQuery(this).length>0;}

//Tagname
jQuery.fn.tag = function() {
    return this.get(0).tagName.toUpperCase();
};

//OuterHTML
jQuery.fn.outerHTML = function() {
    return $('<div>').append( this.eq(0).clone() ).html();
};

/**
 *    Tablesorter filters
 */
$.tablesorter.addParser({
   id: 'plainText',
   is: function(s)
   {
      return false;
   },
   format: function(s, table, element)
   {
      return $(element).plainText();
   },
   type: 'text'
}); 

$.tablesorter.addParser({
   id: 'date',
   is: function(s)
   {
      return false;
   },
   format: function(s, table, element)
   {    
      var date = s.split(' ');
      if (date == null || date == "") {return 0;}
      var month = parseMonth(date[1]),
          day = parseInt(date[0], 10),
          year = parseInt(date[2], 10);
      return new Date(year, month, day).getTime();
   },
   type: 'numeric'
}); 

}

/*================================*\
|*          __DEBUGGING__         *|
\*================================*/
{/*Expand to see debugging information*/
//Error messages
var MESSAGE = {
   ARRAY_OUT_OF_BOUNDS  : "The index(es) are out of bounds of the array.",
   INVALID_ARGUMENTS    : "There is an invalid number of arguments.",
   INDEX_RANGE_INCORRECT: "The start index cannot be larger than the end index (startIndex <= endIndex is acceptable).",
   TABLES_NO_SET_ROW    : "Cannot set table rows, use deleteRow() / insertRow() instead.",
   TABLES_NO_SET_COL    : "Cannot set table columns, use deleteColumn() / insertColumn() instead.",
   JOBID_INVALID        : "jobID inputted is not valid.",
   UNHIDE_COLUMNS       : "Please unhide all columns in Jobmine for this to work.",
   UNHIDE_COLUMNS_PAGE  : "Please unhide columns in Jobmine for features on this page to work.",
};
//Log into firebug
function Log() {
   if(arguments.length == 0) {return;}
   console.log("JbmnPls Log: ",arguments);
   $("#jbmnplsDebugAssertOutput").text(arguments);
}
//Throw an error
function Throw(message) {
   throw new Error("Error: "+message);
   $("#jbmnplsDebugAssertOutput").text("Error: "+message);
}
//Assert a condition
function Assert(condition, message) {
   if (!condition) {
      throw new Error("Assert Error: "+ message);
   }
}
var DEBUGGER = {
   isAttached     : false,
   storageTable   : null,
   refresh  :function(){
      if (!this.isAttached) {
         return;
      }
      var data = [];
      var o = OBJECTS.STORAGE.length;     //Glitch in FF, need to explicitly get length for it to update
      for(var key in OBJECTS.STORAGE) {
         data.push([key, OBJECTS.STORAGE[key]]);
      }
      this.storageTable.insertData(["Key", "Data"], data).updateCells();
   },
   init : function(){
      //RUN ONCE: Don't need to attach if already attached
      if(UTIL.getID("jbmnplsDebuggerBtn") != null) {return;}
      DEBUGGER.isAttached = true;
      //Add a new nav item
      $("#jbmnplsNav ul:eq(0)").append("<li><span id='jbmnplsDebuggerBtn' class='fakeLink'>Debugger OFF</span></li>");
      
      //Append some css
      var debugCSS = {
         "body.debugon #jbmnplsLocal_Storage" : {
            "display"   :  "block",
         },
         "#jbmnplsLocal_Storage" : {
            "position"  :  "fixed",
            "opacity"   :  "0.1",
            "-moz-transition-property"   :  "opacity",
            "-moz-transition-duration"   :  "0.5s",
            "-webkit-transition-property"   :  "opacity",
            "-webkit-transition-duration"   :  "0.5s",
            "top"       :  "30%",
            "left"      :  "20%",
            "display"   :  "none",
            "min-width" :  "500px",
            "width"     :  "500px",
         },
         "#jbmnplsLocal_Storage:hover" : {
            "opacity"   :  "1",
         },
         '#jbmnplsLocal_Storage table td' : {
            'width'    :  '100%',
         },
         "#jbmnplsLocal_Storage.draggable-move" : {
            "opacity"   :  "1 !important",
         },
         "#jbmnplsLocal_Storage thead, #jbmnplsLocal_Storage tbody" : {
            'display'     :  'block',
         },
         '#jbmnplsLocal_Storage thead' : {
            'height'    :  '30px',
         },
         '#jbmnplsLocal_Storage thead th[col="0"]' : {
            'width'     :  '113px',
         },
         '#jbmnplsLocal_Storage thead th[col="1"]' : {
            'width'     :  '218px',
         },
         '#jbmnplsLocal_Storage thead th[col="2"]' : {
            'width'     :  '79px',
         },
         '#jbmnplsLocal_Storage tbody' : {
            'overflow'  :  'auto',
            'max-height':  '480px',
            'width'     :  '500px',
         },
      };
      appendCSS(debugCSS);
      var table = this.storageTable = makeTable("Local Storage");
      table.insertData(["Blank"], [[""]])
               .addCheckboxes()
               .addControlButton("Refresh", function(){DEBUGGER.refresh();})
               .addControlButton("Clear", function(){PREF.clear();DEBUGGER.refresh();})
               .addControlButton("Delete Selected", function(){
                  //Get all the rows to delete
                  var listToDelete = [];
                  $("#"+table.tableID+" input.checkbox:checked").each(function(r){
                     listToDelete.push(this.parentNode.parentNode.getAttribute("row"));
                  });
                  if(listToDelete.empty()) {return;}
                  if(!confirm("Would you like to delete these rows?\nThere are "+listToDelete.length+" rows to delete.")) {
                     return;
                  }
                  listToDelete.sort(function(a,b){return b-a;});     
                  //Remove the data from storage
                  for (var i=0;i<listToDelete.length;i++) {
                     var tr = $("#row_"+table.cname+"_"+listToDelete[i]);
                     if (tr.exists()) {
                        var key = tr.children(":eq(1)").text();
                        OBJECTS.STORAGE.removeItem(key);
                     }
                  }
                  table.deleteRowRange(listToDelete);
               })
               .appendTo($(document.body))
               .makeDraggrable();
      this.refresh();
      
      //Events for the debugger button
      $("#jbmnplsDebuggerBtn").bind("click", function(){
         DEBUGGER.refresh();
         var body = $(document.body);
         var obj = $(this);
         if (obj.hasClass("on")) {
            body.removeClass("debugon");
            obj.removeClass("on").text("Debugger OFF");
         } else {
            body.addClass("debugon");
            obj.addClass("on").text("Debugger ON");
         }
      });
   },
};
}

/*================================*\
|*        __PREFERENCES__         *|
\*================================*/
{/*Expand to see the preferences*/
var PREF = {
   DEFAULT : {
      KILLTIMER            : false,
      HIGHLIGHT_LAST_ROW   : true,
      LAST_PAGE            : PAGES.APPLICATIONS,
      LAST_ACCESSED_SEARCH : new Date().getTime(),
      SHOW_WELCOME_MSG     : true,
      WORK_TERM_URL        : null,
      RESUMES              : "",
      PAGE : {
         HIDDEN_HEADERS : [],
      },
   },
   onSave   : function(){},
   onLoad   : function(){},
   onClear  : function(){},
   onRemove : function(){},
   commonPrefix   : "COMMON",
   /**
    *    Load Preferences
    *       Implementation:
    *          [name]: can be any name but most be a key in DEFAULT (except PAGE)
    *          [index]: an int that gets added to the name of the key, it is used to separate incremental objects like tables
    *          [default]: a value that is returned if the name cannot be found
    *
    *       PREF.load([name]);
    *       PREF.load([name], [index]);
    *       PREF.load([name], [index], [default]);    
    */
   load : function(name, index, defaultInputVal) {
      if (name == null || name == "") {
         return;
      }
      var key = "";
      var defaultValue = "";
      var nameIsSettings = name.startsWith("SETTINGS_");
      var nameIsPagePref = this.DEFAULT.PAGE.hasOwnProperty(name);
      var nameIsPref = this.DEFAULT.hasOwnProperty(name) && name != "PAGE";
      if(nameIsSettings) {
         key = name;
         defaultValue = 0;
      } else {
         name = name.toUpperCase().underscorize();
         if (nameIsPagePref) {
            Assert(PAGEINFO.TYPE != null, "This page has no type, cannot load");
            key = index == null ? PAGEINFO.TYPE + "_" + name : PAGEINFO.TYPE + "_" + index + "_" + name;
            defaultValue = this.DEFAULT.PAGE[name];
         } else {
            key = index == null ? this.commonPrefix+ "_" +name : this.commonPrefix+"_" + index + "_" +name;
            defaultValue = this.DEFAULT[name];
         }
      }
      //Try to load
      try{
         var value = OBJECTS.STORAGE.getItem(key);
      }catch(e){"Cannot load preferences because there is an error with localStorage! :(";}
      if (value == undefined) {
         //If there is no value, return the default, if this is null, it returns null
         return defaultInputVal != null ? defaultInputVal : defaultValue;      
      } else if(!nameIsPagePref && !nameIsPref && !nameIsSettings) {
         Throw("Failed to load: "+name+" because the name specified was not part of the object list for this.DEFAULT.");
      }
      
      //Parse Return
      if (value*1 == parseInt(value)) {    //Is numerical number?
         return value*1;
      }
      switch(value) {         //Is boolean?
         case "TRUE":
         case "true":
            return true;
         case "FALSE":
         case "false":
            return false;
      }
      this.onLoad(value);
      return value;
   },
   /**
    *    Save Preferences
    *       Implementation:
    *          [name]: can be any name but most be a key in DEFAULT (except PAGE)
    *          [index]: an int that gets added to the name of the key, it is used to separate incremental objects like tables
    *          [value]: a value of any type that can be a string that is saved
    *
    *       PREF.save([name], [value]);
    *       PREF.save([name], [index], [value]);    
    */
   save : function(name, arg1, arg2) {
      if (name == null || name == "") {
         return;
      }
      var value, index;
      //Parse Arguments
      switch(arguments.length) {
         case 1:
            value = "";
            break;
         case 2:
            value = arg1;
            break;
         case 3:
            Assert(UTIL.isNumeric(arg1), "Given index to save is not an integer!");
            value = arg2;
            index = arg1;
            break;
         default:
            Throw(MESSAGE.INVALID_ARGUMENTS);
            return;
            break;
      }
      var key = "";
      if(name.startsWith("SETTINGS_")) {
         key = name;
      } else {
         name = name.toUpperCase().underscorize();
         if (this.DEFAULT.PAGE.hasOwnProperty(name)) {
            Assert(PAGEINFO.TYPE != null, "This page has no type, cannot save");
            key = index == null ? PAGEINFO.TYPE + "_" + name : PAGEINFO.TYPE + "_" + index + "_" + name;
         } else if (this.DEFAULT.hasOwnProperty(name) && name != "PAGE") {
            key = index == null ? this.commonPrefix+ "_" +name : this.commonPrefix+"_" + index + "_" +name;
         } else {
            Throw("Failed to save: "+name+" because the name specified was not part of the object list for this.DEFAULT.");
         }
      }
      //Try to save
      try{
         OBJECTS.STORAGE.setItem(key, value);
      }catch(e){Throw("Cannot save settings because there is an error with localStorage! :(");}
      this.onSave();
   },
    /**
    *    Remove Preferences
    *       Implementation:
    *          [name]: can be any name but most be a key in DEFAULT (except PAGE)
    *          [index]: an int that gets added to the name of the key, it is used to separate incremental objects like tables
    *
    *       PREF.remove([name]);
    *       PREF.remove([name], [index]);
    */
   remove : function(name, index) {
      if (name == null || name == "") { return false; }
      var key = "";
      name = name.toUpperCase().underscorize();
      var nameIsPagePref = this.DEFAULT.PAGE.hasOwnProperty(name);
      var nameIsPref = this.DEFAULT.hasOwnProperty(name) && name != "PAGE";
      if (nameIsPagePref) {
         Assert(PAGEINFO.TYPE != null, "This page has no type, cannot remove");
         key = index == null ? PAGEINFO.TYPE + "_" + name : PAGEINFO.TYPE + "_" + index + "_" + name;
      } else if(name.startsWith == "SETTINGS_") {
         key = name;
      } else {
         key = index == null ? this.commonPrefix+ "_" +name : this.commonPrefix+"_" + index + "_" +name;
      }
      try{
         var value = OBJECTS.STORAGE.removeItem(key);
      }catch(e){"Cannot remove preference: "+key+", because there is an error with localStorage! :(";return false;}
      this.onRemove();
      return true;
   },
   clear : function(){
      if(confirm("You are about to delete all the saved data for Jobmine Plus, is this what you want to do?")) {
         OBJECTS.STORAGE.clear();
         this.onClear();
      }
   }
};
}

/*================================*\
|*          __FUNCTIONS__         *|
\*================================*/
{/*Expand to see all the functions*/
/**
 *    Cookies
 */
var Cookies = {
   defaultExpireDays : 30,    //1 month
   read : function(name, defaultVal) {    
      if (name == null || name == "") {
         return null;       
      }
      var units = document.cookie.split(";");
      for(var i=0; i<units.length; i++) {
         if (units[i].trim().startsWith(name)) {
            return units[i].split("=")[1];
         }
      }
      return defaultVal == null ? -1 : defaultVal;    //Returns -1 or default value if failed
   },
   set  : function(name, value, time) {
      if (time == null) {
         time = this.defaultExpireDays;
      }
      var date = new Date();
      date.setTime(date.getTime()+(time*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
      document.cookie = name+"="+value+expires+"; path=/";
   },
   remove : function(name) {
      this.set(name,"",-1);
   },
};

/**
 *    Changes the current location in the iframe to a different location
 */
function changeLocation(newURL, title, navIndex) {
   if (UTIL.idExists("jbmnplsWebpage")) {
      DEBUGGER.refresh();
      $("#jbmnplsWebpage").attr("src", newURL);
      if (title.empty()) {
         title = "Jobmine Plus";
      }
      document.title = title;
      setNavSelection(navIndex);
   }
}
function redirect(newURL) {
   if (!newURL.empty()) {
      window.location.href = newURL;
      DEBUGGER.refresh();
   }
}
function refresh(){
   window.location = window.location;
}

/**
 *    Navigation Pointer/Selection
 */
function setTitle(name){
   try{
   if(name == null) {
      return;
   }
   if (PAGEINFO.IN_IFRAME) {
      BRIDGE.run(function(){
         window.parent.document.title = name;
      }, null, {"name": name});
   } else {
      document.title = name;
   }
   }catch(e){alert(e)}
}
function setNavSelection(index) {
   if(UTIL.idExists("jbmnplsNav") && index != null) {
      unSelectNav();
      if (UTIL.isNumeric(index) && index >= 0) {
         $("#jbmnplsNav a").eq(index).addClass("selected");
      }
   }
}
function unSelectNav() {
   if(UTIL.idExists("jbmnplsNav")) {
      $("#jbmnplsNav a").removeClass("selected");
   }
}

/**
 *    Applies the header to the page
 */
function addHeader() {
   if (UTIL.idExists("jbmnplsHeader")) {return;}
   var counter = 0;
   var fname = "Matthew";
   var lname = "Ng";
   var studNum = "1234567";
   var header = "<header id='jbmnplsHeader'><div id='jbmnplsTopGroup'><div id='jbmnplsBanner' class='banner'></div><nav id='jbmnplsNav'><ul>";
   for(var item in NAVIGATION) {
      if(PAGES.isValid(item) && LINKS.hasOwnProperty(item)) {
         header += "<li><a item='"+counter+"' type='"+item+"' href='"+LINKS.HOME+"#"+item+"' realHref='"+LINKS[item]+"'>"+NAVIGATION[item]+"</a></li>";
         counter++;
      }
   }
   BRIDGE.registerFunction("showAbout", function(){
      showPopup(true, "<h1>Jobmine Plus Version "+CONSTANTS.VERSION+"</h1><br/>Hey there!<br/><br/>This is Matthew Ng the creator of Jobmine Plus. I am a System Designs Engineering Student at the University of Waterloo. I created this because Jobmine is not user friendly so this addon/extension should speed things up.<br/><br/>Feel free to email me if there are any problems, concerns or requests for future updates:<br/><a href='mailto:jobmineplus@gmail.com'>jobmineplus@gmail.com</a><br/><br/>Visit the extensions website for information and future updates:<br/><a href='http://userscripts.org/scripts/show/80771'>http://userscripts.org/scripts/show/80771</a><br/><br/>", "About Me", 400);
   });
   header += '</ul></nav><div id="uwBanner" class="banner"></div><div style="float:right;" id="jbmnplsTwitterHolder">'+attachTwitterButton()+'</div><a href="' + LINKS.ANDROID_APP + '" target="_blank" class="google_play_button"></a></div><div id="jbmnplsBottomGroup"><div id="jbmnplsStatus"><ul></ul></div><div id="jbmplsControlPanel"><span class="fakeLink" onclick="showSettings();">Settings</span> | <span onclick="showAbout();" class="fakeLink">About</span> | <a href="'+LINKS.LOGOUT+'">Logout</a></div></div></header>';
   $("body").prepend(header);
}

/**
 *    Applies the Profile nav to the page
 */
function addProfileNav() {
   if (UTIL.idExists("PSTAB")) {
      var navHTML = "<nav class='noselect' id='jbmnplsProfileNav'><ul>";
      var navigation = [
         "Profile",
         "Personal Info",
         "Academic Info",
         "Skills Inventory",
      ];
      $("#PSTAB td a").each(function(i){
         var obj = $(this);
         var link = obj.attr("href");
         if (obj.attr("href") == null) {
            navHTML += "<li style='z-index:"+i+";' class='selected navItem'><span>"+navigation[i]+"</span></li>";
         } else {
            var onclick = link.substr(link.indexOf(":")+1).trim();
            navHTML += '<li style="z-index:'+i+'" class="navItem"><span class="fakeLink" onclick="'+onclick+'">'+navigation[i]+'</span></li>';
         }
      });
      navHTML += "</ul></nav>";
      $("body form:eq(0)").append(navHTML);
   }
}

function attachTwitterButton() {
   return '<iframe allowtransparency="true" frameborder="0" scrolling="no"src="//platform.twitter.com/widgets/follow_button.html?screen_name=jobmineplus&button=grey&show_count=false&	show_screen_name=false"style="width:70px;margin-top:2px;height:20px;"></iframe>';
}

/**
 *    Popup
 */
function showPopup(isBlack, bodyText, title, width, maxHeight, onCloseFunction, iframeHref){
   var popup = $("#jbmnplsPopup");
   if (!popup.exists()) {
      $("body").append(LARGESTRINGS.POPUP);
   }
   if (isBlack == null) {isBlack = true;}
   $("body").addClass("showPopup");
   popup = $("#jbmnplsPopup");
   popup.css("display", "block");
   var content = $("#jbmnplsPopupContent");
   var body = $("#jbmnplsPopupBody");
   var node = $("#jbmnplsPopupTitle");
   var frame = $("#jbmnplsPopupFrame");
   if(title!=null){
      node.text(title);
   }
   if(node!=null) {
      node.next().html(bodyText);
   }
   if(iframeHref!=null) {
      content.addClass("iframe");
      frame.attr("src", iframeHref);
   }
   if (isBlack) {
      popup.attr("name", title.toLowerCase().underscorize());
      content.removeClass("disabled");
      node.attr("title", "I am draggable");
      if(maxHeight!=null) {
         body.css("height", maxHeight - 42*2 + "px"); //42px for header and footer
      } else {
         body.css("height", "auto");
      }
      
      //Escape events
      $(document).unbind("keydown").bind("keydown",function(e){
         switch(e.which) {
            case KEYS.ESCAPE:  
               hidePopup("cancel");   
               break;
            default:
               return;
               break;
         }
         e.preventDefault();
      });
   } else {
      node.removeAttr("title");
      content.addClass("disabled");
   }
   popup[0].className = isBlack ? "black" : "white";
   if(width!=null) {
      content.css("width", width + "px");
   }
   resetPopupPosition();
   
   if(onCloseFunction != null && UTIL.isFunction(onCloseFunction)) { 
      OBJECTS.ONPOPUPCLOSE = onCloseFunction;
   } else {
      OBJECTS.ONPOPUPCLOSE = null;
   }
}
function hidePopup(arg) {
   var popup = $("#jbmnplsPopup");
   if (popup.exists()) {
      if(OBJECTS.ONPOPUPCLOSE != null) {
         if (!OBJECTS.ONPOPUPCLOSE.call(this,arg) && arg == 'save') { 
            return;
         }
         OBJECTS.ONPOPUPCLOSE = null;
      }
      popup.css("display", "none").removeAttr("name");
      $("#jbmnplsPopupBody").empty();  //Delete the content
      $("#jbmnplsPopupFrame").attr("src", LINKS.BLANK);
      $("#jbmnplsPopupContent").removeClass("iframe")
      //Remove events
      $(document).unbind("keydown");
      //Lag time when closing window so overlay goes quickly
      setTimeout(function(){$("body").removeClass("showPopup").css("padding-right", "50px");},100);
   }
}
BRIDGE.registerFunction("hidePopup", hidePopup);
function isPopupShown(strictIsBlack){
   if (strictIsBlack==null) {strictIsBlack = false;}
   return $("#jbmnplsPopup").css("display") == "block" && (!strictIsBlack || strictIsBlack && $("#jbmnplsPopup").hasClass("black"));
}
function resetPopupPosition() {
   var content = $("#jbmnplsPopupContent");
   content.css("top", (-content.outerHeight()/2)+"px").css("left", (-content.outerWidth()/2) + "px");
}

/**
 *    Message
 */
function showMessage(msg, timeoutSeconds) {
   Assert(timeoutSeconds == null || timeoutSeconds != null && timeoutSeconds >= 3, "The timer for message was set less than 3 sec, please set it higher");
   var message = $("#jbmnplsMessage");
   if (!message.exists()) {
      $(document.body).append("<div "+(PAGEINFO.IN_IFRAME?"style='top:0;'":"")+" id='jbmnplsMessageHolder' class='message'><div id='jbmnplsMessage'><div id='jbmnplsMessageText'></div><div id='jbmnplsMessageClose' class='close'></div></div></div>");
      message = $("#jbmnplsMessage");
   }
   //Update and reset timer
   if (message.hasClass("show")) {
      clearInterval(OBJECTS.MESSAGE_TIMER);
   } else {
   //Show it now
      message.addClass("show");
      message.css("top", "-50px").animate({top: 0}, 400);
   }
   message.attr("time", timeoutSeconds == null ? CONSTANTS.MESSAGE_TIME_OUT : timeoutSeconds);
   //Set the message
   if (msg != null) {
      $("#jbmnplsMessageText").html(msg);
   }
   
   //Add the event
   $("#jbmnplsMessageClose").bind("click", closeMessage);
   
   //Set the timer
   OBJECTS.MESSAGE_TIMER = setInterval(function(){
      var obj = $("#jbmnplsMessage");
      var remaining = parseInt(obj.attr("time"));
      if (remaining <= 5) {      //Countdown
         $("#jbmnplsMessageClose").text("Dismissing in "+remaining+"s");
      }
      if (remaining <= 0) {      //Finished
         closeMessage();
      } else {
         obj.attr("time", remaining-1);
      }
   }, 1000);
}
BRIDGE.registerFunction("showMessage", showMessage);
function closeMessage() {
   var message = $("#jbmnplsMessage");
   Assert(message.exists(), "Must create the message before closing it!!");
   if (message.hasClass("show")) {
      //Destroy timer if still exists
      if (OBJECTS.MESSAGE_TIMER != null) {
         clearInterval(OBJECTS.MESSAGE_TIMER);
         OBJECTS.MESSAGE_TIMER = null;
      }
      //Fade out the close
      $("#jbmnplsMessageClose").unbind("click").fadeOut(300, function(){
         $("#jbmnplsMessageClose").css("display", "block").empty();
      });
      
      //Animate up
      message.animate({top: -50}, 600);
      
      //Clean up
      message.removeClass("show");
      message.removeAttr("time");
   }
}
//Update Message
function addUpdateMessage() {
   if(UTIL.idExists("jbnplsUpdate")) {return;}
   var message = "You are using an old version of Jobmine Plus, click to update";
   $(document.body).append("<div style='display:none;' id='jbnplsUpdate'>\
        <a title='You know you want to click this' class='update-link' style='margin:0 auto;width:700px;' target='_blank' href='"+LINKS.UPDATE_LINK+"'>\
            " + message + "</a><div onclick='this.parentNode.style.visibility=\"hidden\";' class='close'></div></div>");
   if (PAGEINFO.BROWSER !== BROWSER.CHROME ) {
       $("#jbnplsUpdate a").one('click',function(){
          $(this).parent().css("visibility", "hidden");
          showPopup(true, "If you actually updated, you will see all the changes when you refresh this page.", "Jobmine Plus is Updated!", 300);
          $(document).unbind("keydown");
       });
   }
}

/**
 *    Handles customizing tables on the page
 */
function handleCustomize(tableNum, columnNum) {
   if (tableNum == null || !UTIL.isNumeric(tableNum) || TABLES.length <= tableNum) {
      return;
   }
   var table = TABLES[tableNum];
   function onClose(name){
      switch(name) {
         case "cancel":
            //Reload the preferences, make the load value into an array
            var hidden = PREF.load("HIDDEN_HEADERS", tableNum);
            if(UTIL.isNumeric(hidden)) {  //A number
               hidden = [hidden];
            }else if(!UTIL.isArray(hidden)){    //An array in a form of string
               hidden = hidden.split(",");
            }
            table.showAllColumns();
            table.hideColumns(hidden);
            break;
         case "save": 
            PREF.save("HIDDEN_HEADERS", tableNum, table.getColumnsHidden());
            showMessage("The table's headers customization has been saved.", 5);
            return true;
            break;
      }
   }
   if (isPopupShown(true) && columnNum != null && UTIL.isNumeric(columnNum)) {
      if(table.isColumnShown(columnNum)) {
         table.hideColumns([columnNum]);
      } else {
         table.showColumns([columnNum]);
      }
   } else {
      var blockHeight = 36
      var maxHeight = blockHeight;
      var html = "<div class='customizeEntry instructions'><span class='row'>Click/check to hide columns</span></div>";
      for(var i=0; i<table.headers.length; i++) {
         var hidden = !table.isColumnShown(i);
         var name = table.headers[i];
         name = name.substring(0, name.indexOf("_"));
         name = name == "" ? "Column #"+(i+1) : name;
         if (!(name.charAt(0) == "{" && name.charAt(name.length-1))) {
            html += "<div class='customizeEntry' title='Click to hide' "+(hidden?"selected='true'":"")+"><input class='checkbox' onclick='this.parentNode.setAttribute(\"selected\",this.checked);handleCustomize("+tableNum+","+i+")' type='checkbox' "+(hidden?"checked='true'":"")+"/><span class='row' onclick='var chbx=this.previousSibling;chbx.checked = !chbx.checked;this.parentNode.setAttribute(\"selected\",chbx.checked);handleCustomize("+tableNum+","+i+")'>"+name+"<span class='hiddenMsg'>(Hidden)</span></span></div>";
            maxHeight += blockHeight;
         }
      }
      var availHeight = $(window).height()-100;     //200px of padding
      if(availHeight < maxHeight) {    
         var numOfBlocks = Math.floor(availHeight/blockHeight);
         maxHeight = numOfBlocks * blockHeight;
      }
      showPopup(true,html,"Customize",300,(42 + 42 + maxHeight),onClose);  //42px for header and footer
   }
}
BRIDGE.registerFunction("handleCustomize", handleCustomize);

/**
 *    Remove the timer
 */

function removeTimer() {
   BRIDGE.addFunction("setupTimeout");
   //BRIDGE.addFunction("displayTimeoutMsg");
   //BRIDGE.addFunction("displayTimeoutWarningMsg");
   BRIDGE.run(function(){
      if (typeof clearupTimeout === "function") {
         clearupTimeout();
      }
   });
   BRIDGE.addFunction("isSignout", function(){return false;});
   BRIDGE.addFunction("isSessionLoggedout", function(){return false;});
}

function initRowDeletion() {
   // Delete button for tables
   $("div.jbmnplsTable div.delete").live("click", function (){
      var obj = $(this);
      if (obj.attr("disabled") != null || obj.hasClass("loading")) {  
         return false;
      }
      //Ask message
      if(confirm("Are you sure you want to delete this row?\nYOU CANNOT UNDO THIS AFTER YOU AGREE!"))
      {
         //Add the classes
         var tr = obj.parent().parent();
         tr.parent().find("div.delete").attr("disabled", "disabled");
         obj.addClass("loading").removeAttr("disabled");
         var row = tr.attr("row");
         var command = obj.attr("action");  
         //Run the deletion
         var deletion = new Job("submitAction_win0(document.win0, '" + command + "')", [row]);
         JOBQUEUE.addJob(deletion);
      }
   });
}

/**
 *    Jobmine Plus Status bar
 */
function initStatusBar() {
   if(OBJECTS.STATUS_TIMER == null) {
      var html = '<li class="status-item hide"><span class="bold">Hi <span id="jbmnpls-status-user-name"></span>!</span></li>';
      html +=     '<li class="status-item hide"><span class="bold">Active Apps: </span><span id="jbmnpls-status-active-apps"></span></li>';
      html +=     '<li class="status-item hide"><span class="bold">Apps Left: </span><span id="jbmnpls-status-apps-left"></span></li>';
      html +=     '<li class="status-item hide"><span class="bold">Interviews: </span><span id="jbmnpls-status-interviews"></span></li>';
      $("#jbmnplsStatus ul").append(html);
      updateStatusBar();
      invokeUpdateStatusBarUpdate();
   }
}
function invokeUpdateStatusBarUpdate(optionalDoIt) {
   if (!optionalDoIt && OBJECTS.STATUS_TIMER) {
      clearInterval(OBJECTS.STATUS_TIMER);
      OBJECTS.STATUS_TIMER = null;
   } else if(!OBJECTS.STATUS_TIMER) {
      OBJECTS.STATUS_TIMER = setInterval(updateStatusBar, CONSTANTS.STATUS_UPDATE_TIME * 60 * 1000);    //Also kills php timer
   }
}
function updateStatusBar() {
   var headerExists = $("#jbmnplsHeader").exists();
   //Get the name
   $.get(LINKS.DOCUMENTS, function(response){
        if(headerExists && PREF.load("SETTINGS_GENERAL_SHOW_STATUS_BAR", null, true)) {
            // Get the name of the user
            var name, end,
                start = response.indexOf("id='UW_CO_STUDENT_UW_CO_PREF_NAME'");
            if (start == -1) {
                start = response.indexOf('id="UW_CO_STUDENT_UW_CO_PREF_NAME"');
            }
            if (start == -1) {
                name == "Unknown";
            } else {
                start = response.indexOf('>', start) + 1;
                end = response.indexOf("<", start);
                var fullName = response.substring(start, end).split(",");
                name = fullName[1] + " " + fullName[0];     // last name and then first name
            }
            $("#jbmnpls-status-user-name").text(name).parents("li").removeClass("hide");
            
            // Get the resume namespace
            var base = "UW_CO_STU_DOCS_UW_CO_DOC_DESC$"
                query = "", index = 0, lookFor = 'value="', lookEndFor = '"';
            for (var i = 0; i < 3; i++) {
               index = response.indexOf(base + i, index);
               if (index == -1) { break; }
               index = response.indexOf(lookFor, index);
               if (index == -1) { break; }
               index += lookFor.length;
               var canView = response.contains("'UW_CO_PDF_LINKS_UW_CO_DOC_VIEW$" + i, index)?"1":"0"
               var name = response.substring(index, response.indexOf(lookEndFor, index));
               query += name + CONSTANTS.RESUME_DELIMITOR1 + canView + CONSTANTS.RESUME_DELIMITOR2;
            }
            query = query.substring(0, query.lastIndexOf(CONSTANTS.RESUME_DELIMITOR2));
            PREF.save("RESUMES", query);
        }
   });
   
    if (headerExists) {
        if(PREF.load("SETTINGS_GENERAL_SHOW_STATUS_BAR", null, true)) {
            //Get the number of applications left
            $.get(LINKS.SEARCH, function(response){
                if(response == 'you are not authorized to view this page.') {
                    Log("Error reading search, are you logged in?");
                    return;
                }
                var start = response.indexOf("='UW_CO_JOBSRCHDW_UW_CO_MAX_NUM_APPL");
                start = response.indexOf(">", start) + 1;
                var appsLeft = response.substring(start, response.indexOf("<", start));
                if(UTIL.isNumeric(appsLeft)) {
                    var activeApps = Math.max(50-appsLeft, 0);
                    $("#jbmnpls-status-apps-left").text(appsLeft).parent().removeClass("hide");
                    $("#jbmnpls-status-active-apps").text(activeApps).parent().removeClass("hide");
                }
            });

            /* IMPLEMENT WHEN HAVING INTERVIEWS IN ACCOUNT
            //Get the number of interviews
            $.get(LINKS.INTERVIEWS, function(response){
            if(response == 'you are not authorized to view this page.') {
            Log("Error reading interviews, are you logged in?");
            return;
            }
            });*/
        }
    }
}

function changeStatusValues(activeApps) { 
   if (PAGEINFO.TYPE == PAGES.HOME) {
      $("#jbmnpls-status-active-apps").text(activeApps);
      var left = Math.max(50 - activeApps, 0);
      $("#jbmnpls-status-apps-left").text(left);
   } else {
      BRIDGE.run(function(){
         window.parent.changeStatusValues(activeApps);
      }, null, {activeApps:activeApps});
   }
}
BRIDGE.registerFunction("changeStatusValues", changeStatusValues);

function increaseActiveStatusValue(byHowMuch) { 
   if (PAGEINFO.TYPE == PAGES.HOME) {
      var active = parseInt($("#jbmnpls-status-active-apps").plainText());
      changeStatusValues(active + parseInt(byHowMuch));
   } else {
      BRIDGE.run(function(){
         window.parent.increaseActiveStatusValue(byHowMuch);
      }, null, {byHowMuch:byHowMuch});
   }
}
BRIDGE.registerFunction("increaseActiveStatusValue", increaseActiveStatusValue);

/**
 *    Returns the current term in Jobmine's format
 */
function getPredictedTerm(month, year) { 
   //Validate
   if(month!=null){Assert(month>=0&&month<12,"Month was configured incorrectly ("+month+")");}
   if(year!=null){Assert(year>=0&&year.toString().length==4,"Year was configured incorrectly ("+year+")");}
   
   //Set the date
   var d = month != null && year != null ? new Date(year, month) : new Date();
   d.setMonth(d.getMonth()+4);      //Offset the month by 4 months when you are on coop
   year = d.getFullYear().toString();
   month = d.getMonth();
   
   //Build the term string
   var term = year.charAt(0)-1+"";
   term += year.substr(2);
   term += Math.floor(month/4) * 4 + 1;
   return term;
}

/*
 *    Draggable objects
 *       Give the element a class "draggable" to make it draggable as long as one
 *       of its children has a class "draggable-region". If you click and drag
 *       that region, the entire element (with class "draggable") will move.
 *       You can disable the drag by adding the class "disabled" to either the 
 *       draggable object or region.
 */
function initDraggable() {
   $("body .draggable .draggable-region").live("mousedown", function(evt){
      try{
      $("body").addClass("noselect");
      var obj = $(this);
      var clkObj = $(evt.target);
      //Return if disabled
      if (obj.hasClass("disabled") || clkObj.hasClass("fakeLink") || clkObj.get(0).tagName.toUpperCase() == "A") {return;}
      var wholeObj = obj.closest(".draggable");
      if (wholeObj.hasClass("disabled")) {return;}
      //Events and Classes
      wholeObj.addClass("draggable-down");
      if(UTIL.getID("draggable-overlay-hack") == null) {
         $(document.body).append("<div id='draggable-overlay-hack' style='height:100%;width:100%;position:fixed;top:0;left:0;'></div>");
      }
      var overlay = $("#draggable-overlay-hack");
      overlay.css({"display" : "block", "z-index" : "1000", "cursor" : "move"});
      overlay.bind("mousemove.draggable", function(e){
         var wholeObj = obj.closest(".draggable");
         wholeObj.removeClass("draggable-down").addClass("draggable-move");
         //Update Position
         var coor = wholeObj.attr("draggableAnchor").split(",");
         var ancX = parseInt(coor[0]);
         var ancY = parseInt(coor[1]);
         var pos = wholeObj.offset();
         var absX = pos.left;
         var absY = pos.top;
         var relX = parseInt(wholeObj.css("left"),10);
         var relY = parseInt(wholeObj.css("top"),10);
         var mRelX = e.pageX - absX;
         var mRelY = e.pageY - absY;
         wholeObj.css({"left" : (relX+(mRelX-ancX))+"px", "top" : (relY+(mRelY-ancY))+"px"});
      })
      .bind("mouseup.draggable mouseleave.draggable", function(){
         $("body").removeClass("noselect");
         var wholeObj = obj.closest(".draggable");
         wholeObj.removeClass("draggable-down draggable-move").removeAttr("draggableAnchor");
         $(this).unbind(".draggable").css({"display": "none", "cursor" : "auto"});
      });
      //Record the anchor point for the object
      var relX = evt.layerX ? evt.layerX : evt.offsetX;
      var relY = evt.layerY ? evt.layerY : evt.offsetY;
      wholeObj.attr("draggableAnchor", relX+","+relY);
      }catch(e){alert(e)}
   });
}

/**
 *    Refresh Timer
 */
function invokeRefreshTimer() {
   if(OBJECTS.REFRESH_TIMER != null) {
      clearInterval(OBJECTS.REFRESH_TIMER);
      OBJECTS.REFRESH_TIMER = null;
   }
   var refreshRate = PREF.load("SETTINGS_GENERAL_AUTO_REFRESH", null, 0);
   if(refreshRate > 0) {
      try{
      OBJECTS.REFRESH_TIMER = setInterval(function(){
         $("#jbmnplsWebpage").contents().get(0).location.href = $("#jbmnplsWebpage").contents().get(0).location.href;
      }, refreshRate * 60 * 1000);     //Per min
      }catch(e){alert(e)}
   }
}

/**
 *    Applying
 */
 function invokeApplyPopup(jobId, title) {
   if (typeof (OBJECTS.UWATERLOO_ID) === "undefined") {
      alert("Failed to get user id, please report this to jobmineplus@gmail.com.");
      return;
   }
   title = title || "Submit Application";
   showPopup(true, null, title, 500, null, function(type){
      if (type == "save") {
         var $frame = $("#jbmnplsPopupFrame"),
             doc = $frame.contents().get(0),
             $submitButton = $(doc.getElementById('UW_CO_APPWRK_UW_CO_CONFIRM_APP'));
         if ($submitButton.exists()) {
            BRIDGE.run(function(){
               var win = document.getElementById('jbmnplsPopupFrame').contentWindow;
               win.hAction_win0(win.document.win0,'UW_CO_APPWRK_UW_CO_CONFIRM_APP', 0, 0, 'Submit Application', false, true); 
            });
         } else {
            // Runs a message saying to select or upload a resume.
            BRIDGE.run(function(){
               var frame = document.getElementById('jbmnplsPopupFrame');
               frame.contentWindow.showMessage("Please select/upload a resume.", 7);
            });
         }
         return false;
      }
   }, LINKS.APPLY + jobId + "&UW_CO_STU_ID=" + OBJECTS.UWATERLOO_ID + "&inpopup");
}
BRIDGE.registerFunction("invokeApplyPopup", invokeApplyPopup);

function finishApplying() {
   hidePopup();
   
   // Display message
   if (PAGEINFO.TYPE == PAGES.APPLICATIONS) {
      showMessage("Application has been successfully edited.");
   } else {
      showMessage("Application has been successfully submitted.");
   }
   
   // Change the row to applied
   switch(PAGEINFO.TYPE) {
      case PAGES.SEARCH:
         //var $tr = $("#jbmnplsResultsTable tr.lastClickedRow"),
         //    $ths = $("#jbmnplsResultsTable tr:eq(0)"),
         //    $tds = $tr.children(),
         //    applyCol = parseInt($("#jbmnplsResultsTable > thead > tr > th").filter(function(){
         //      return $(this).text() == "Apply"}).attr('col'));
         //    listCol = parseInt($("#jbmnplsResultsTable > thead > tr > th").filter(function(){
         //      return $(this).text() == "Short List"}).attr('col'));
               
         // Change the row text and highlight
         //$tds.eq(0).text("Applied");
         //$tds.eq(applyCol).html("Already Applied");
         //$tds.eq(listCol).html("");
         //HIGHLIGHT.apply($tr);
         //break;
      case PAGES.LIST:
         var $tr = $("#jbmnplsJobsTable tr.lastClickedRow"),
             applyCol = parseInt($("#jbmnplsJobsTable > thead > tr > th").filter(function(){
               return $(this).text() == "Apply"}).attr('col'));
         // Change the row text and highlight
         $tr.children().eq(applyCol).html("Already Applied");
         HIGHLIGHT.apply($tr);
         increaseActiveStatusValue(1);
         break;
   }
}
BRIDGE.registerFunction("finishApplying", finishApplying);

function fixApplyInterface() {
   $('#UW_CO_APPDOCWRK_UW_CO_DOC_NUM option:eq(0)').text("Choose");
   var resumes = PREF.load("RESUMES").split(CONSTANTS.RESUME_DELIMITOR2);
   if (!resumes.empty()) {
      var $options = $("#UW_CO_APPDOCWRK_UW_CO_DOC_NUM").find("option");
      for (var i = 0; i < 3; i++) {
         var resumeName = "(Not Created)", $obj = $options.eq(i + 1);
         if (i < resumes.length) {
            resumeName = resumes[i].split(CONSTANTS.RESUME_DELIMITOR1)[0];
         }
         $obj.text((i + 1) + " - " + resumeName.replaceCharCodes());
      }
   }
}

/**
 *    Miscellaneous
 */
function isScrollbarShown() {
   return $(document).height() > $(window).height();
}

function appendCSS(cssObj) {
   var cssString = "";
   for(var selector in cssObj) {
      var eachSelector = cssObj[selector];
      var propString = "";
      for(var property in eachSelector) {
         propString += property + ":" + eachSelector[property] + ";";
      }
      cssString += selector + "{" + propString + "}";
   }
   $("body").append("<style>" + cssString + "</style>");
   cssString = null;
}

function iframeRunFunction(iframe) {      //Not finised, need to make iframe object
   if(iframe == null) {return;}
   if (UTIL.isjQuery(iframe)) {
      iframe = iframe.get(0);
   }
   try{
      iframe.contentWindow.alert("sdsd")
   }catch(e){alert("Unable to call function inside iframe: "+e);}
}

function parseMonth(prefix) {
   if(prefix != null) {
      var months = ["january","februrary","march","april","may","june","july","august","september","october","november","december"];
      for(var i=0;i<months.length;i++) {
         if(months[i].startsWith(prefix.toLowerCase())) {
            return i;
         }
      }
   }
   return -1;
}
}

/*================================*\
|*        __HIGHLIGHTING__        *|
\*================================*/
{/*Expand to see the highlighting code*/
var HIGHLIGHT = {
   getCriteria : function(){     //The lower it is, the more priority it has
      switch(PAGEINFO.TYPE) { 
         case PAGES.LIST: 
            return {
               'Already Applied'          :     COLOURS.GREAT,
               'Not Authorized to Apply'  :     COLOURS.BAD,
            };
            break;
         case PAGES.RANKINGS:
            return {
               'Offer'                    :     COLOURS.GREAT,
               'Ranked'                   :     COLOURS.GOOD,
               'Not Ranked'               :     COLOURS.WORST,
            };
            break;
         case PAGES.INTERVIEWS:
            return {
               'Unfilled'                 :     COLOURS.BAD,
               'Scheduled'                :     COLOURS.GREAT,
            };
            break;
         case PAGES.SEARCH:
            return {
               'New'                      :     COLOURS.AVERAGE,
               'Read'                     :     COLOURS.BLANK,
               'On Short List'            :     COLOURS.GREAT,
               'Already Applied'          :     COLOURS.GREAT,
            };
            break;
         case PAGES.PROFILE:
            return {
               'Outstanding'              :     COLOURS.GREAT,
               'Excellent'                :     COLOURS.GREAT,
               'Good'                     :     COLOURS.GOOD,
               'Very Good'                :     COLOURS.GOOD,
               'Satisfactory'             :     COLOURS.AVERAGE,
               'Marginal'                 :     COLOURS.AVERAGE,
               'Unsatisfactory'           :     COLOURS.BAD,
            };
            break;
         case PAGES.APPLICATIONS:
            return {
               'Selected'                 :     COLOURS.GREAT,
               'Scheduled'                :     COLOURS.GREAT,
               'Not Selected'             :     COLOURS.WORST,
               "Unfilled"                 :     COLOURS.BAD,
               "Ranked or Offered"        :     COLOURS.GREAT,
               "Alternate"                :     COLOURS.GOOD,
               "Ranking Complete"         :     COLOURS.BAD,
               "Cancelled"                :     COLOURS.WORST,
               "Employed"                 :     COLOURS.GREAT,
            };
            break;
         default:
            return null;
            break;
      }
   },
   apply : function(jObj){
      if (jObj == null) {jObj=$("form:eq(0) table.tablesorter tr");}
      if (!UTIL.isjQuery(jObj)) {
         jObj = $(jObj);
      }
      var criteria = this.getCriteria();
      if (criteria!=null){
         for(var text in criteria) {
            jObj.find("td:contains('"+text+"')").parent().css("background-color", criteria[text]);
         }
      }
   },
};
//   LOGIN          : "LOGIN",
//   HOME           : "HOME",
//   DOCUMENTS      : "DOCUMENTS",
//   PROFILE        : "PROFILE",
//   PERSONAL       : "PERSONAL_INFO",
//   ACADEMIC       : "ACADEMIC_INFO",
//   SKILLS         : "SKILLS_INVENTORY",
//   SEARCH         : "SEARCH",
//   LIST           : "SHORT_LIST",
//   APPLICATIONS   : "APPLICATIONS",
//   INTERVIEWS     : "INTERVIEWS",
//   RANKINGS       : "RANKINGS",
//   DETAILS        : "JOB_DETAILS",
//   EMPLOYEE_PROF  : "EMPLOYEE_PROFILE",
}

/*================================*\
|*         __JOBS_QUEUE__         *|
\*================================*/
{/*Expand to see the job queue*/
function Job(commandOutline, listOfIndexes, onComplete) {
   if(commandOutline == null || commandOutline == ""){
      Throw("Job queue init is not valid");
   }
   this.commandTemplate = commandOutline;
   this.callback = UTIL.isFunction(onComplete) ? onComplete : null;
   //Private
   this.list = listOfIndexes
   this.copyList = listOfIndexes!=null ? listOfIndexes.clone() : null;
}
Job.prototype = {
   isValid : function(){
      return this.commandTemplate != null && this.commandTemplate != "";
   },
   isEmpty : function(){
      if (this.list == null) {
         this.list = [];
      }
      return this.list.empty();
   },
   length : function(){
      return this.list.length;
   },
};

var JOBQUEUE = {
   queue    : [],
   isRunning: false,
   command  : null,
   callback : null,
   number   : -1,
   isEmpty  : function(){
      return this.queue.empty();
   },
   addJob  : function(item){
      if(item == null || !(item instanceof Job) || !item.isValid()) {
         return;
      }
      this.queue.push(item);
      this.runNextJob();
   },
   runNextJob : function(){
      if (!this.isEmpty() && !this.isRunning) {
         var item = this.queue[0];
         var list = item.list;
         if (list == null) {
            this.number = -1;
            this.command = item.commandTemplate;
         } else {
            this.number = list.shift();
            this.command = item.commandTemplate.replace(/\%/g, this.number);
         }
         if(item.callback) {
            this.callback = item.callback;
         }
         this.isRunning = true;
         BRIDGE.run("function(){"+this.command+"}");
      }
   },
   getCurrentItem : function(){
      return this.isEmpty() ? null : this.queue[0];
   },
};
}

/*================================*\
|*       __AJAX_FUNCTIONS__       *|
\*================================*/
{/*Expand to see ajax functions*/

function initAjaxCapture() {
   BRIDGE.registerFunction("ajaxComplete", ajaxComplete);
   BRIDGE.addJS(function(){
      net.ContentLoader.prototype.onReadyState = function() {
         //Some functions
         var obj = this;
         function allowResubmit(){
            obj.form.ICResubmit.value = "0";
            nResubmit = 0;
            obj.SetInProcess(false); 
         }
         Array.prototype.last = function(){
            if (this.length == 0) {return null;}
            return this[this.length-1];
         }
         var req = this.req;
         var dataArrayAsString = null;
         var name = this.name;
         //Loaded
         if (req.readyState == 4 && req.status == 200) {
            //Call our function when xmlhttprequest is finished
            var url = null;
            var text = req.responseText;
            var popupOccurs = false;
            if(name.indexOf("hexcel") != -1) { 
               try{
                  var start = text.indexOf(";window.open('"+commonURL+"?cmd=viewattach&userfile=ps.xls") + 14;
                  url = text.substring(start, text.indexOf("',", start));
                  allowResubmit();
                  text = null;
               }catch(e){alert("Excel stuff is broken: "+e);}
            /*} else if(name.indexOf("UW_CO_APPLY_HL") != -1 && document.title == "Student Interviews"){    //Not releasing for first release
                  url = req.responseText.match(/document.location='([^(';)]+)/).last();
                  allowResubmit();*/
            } else if (name=="UW_CO_JOBSRCH_UW_CO_LOCATION$prompt") {
               allowResubmit();
               dataArrayAsString = [];
               text.replace(/;">([^<]+)<\/a/gim, function(a,b){dataArrayAsString.push(b);});
            } else if (name === "UW_CO_PDF_LINKS_UW_CO_MARKS_VIEW"
                     ||name === "UW_CO_PDF_LINKS_UW_CO_WHIST_VIEW"
                     ||name.indexOf("UW_CO_PDF_LINKS_UW_CO_PACKAGE_VIEW") == 0
                     ||name.indexOf("UW_CO_PDF_LINKS_UW_CO_DOC_VIEW") == 0) {
                  // Handle pdf's going new tab
                  var end, start;
                  start = text.indexOf("window.open('");
                  if (start === -1) {
                     start = text.indexOf('window.open("');
                     if (start === -1) {
                        showMessage("Failed to retrieve PDF, please report at jobmineplus@gmail.com.");
                        this.bInProcess = false;
                        return;
                     }
                     start += ("window.open('").length;
                     end = text.indexOf('"', start);
                  } else {
                     start += ("window.open('").length
                     end = text.indexOf("'", start);
                  }
                  url = text.substring(start, end);
                  name = "documents-pdf-download";
                  this.bInProcess = false;
            } else if (name == "UW_CO_APPDOCWRK_UW_CO_DOC_NUM") {
               var findStart = "id='UW_CO_STU_DOCS_UW_CO_DOC_DESC'>",
                   findEnd = "</span>",
                   start = text.indexOf(findStart);
               if (start != -1) {
                  start += findStart.length;
                  var end = text.indexOf(findEnd, start);
                  var resumeName = text.substring(start, end);
                  dataArrayAsString = [];
                  dataArrayAsString.push(resumeName);
                  this.onload.call(this);
               }
            } else if (name == "UW_CO_APPWRK_UW_CO_CONFIRM_APP") {
               // Checks to see if the application really is submitted or not
               if (text.indexOf('Your application has been submitted.') >= 0) {
                  dataArrayAsString = [];
                  dataArrayAsString.push(true);
               }
               this.onload.call(this);
			} else if (name.indexOf("UW_CO_JOBTITLE_HL$") != -1) {		// Does nothing with the request
				allowResubmit();										// need this because it will fix random errors on search
            } else {
               //Run and parse
               if(name == "TYPE_COOP") {
                  popupOccurs = text.indexOf("popupText") != -1;
               }
               this.onload.call(this);
            }
            ajaxComplete(name, url, popupOccurs, dataArrayAsString);
         }
      }
      //Override to remove usless popup
      net.ContentLoader.prototype.finalCall = function() {
         var shouldShowPopup = this.name.indexOf("UW_CO_SLIST_HL$") != 0 && this.name != "UW_CO_JOBSRCHDW_UW_CO_DW_SRCHBTN";
         net.arrSrcScript=new Array();net.nScriptfiles=0;net.nScriptfileIndex=0;if(net.bScript){var n=net.arrScript.length;for(var xx=0;xx<n;xx++){if(net.arrScript[xx])this.addScript(id+"_"+xx,net.arrScript[xx]);}net.arrScript=new Array();net.bScript=false;}if(net.OnloadScriptList&&net.OnloadScriptList.length>0){for(var i=0;i<net.OnloadScriptList.length;i++){var script=net.OnloadScriptList[i].firstChild.data;if(!shouldShowPopup){script=script.replace(/self\.scroll[^;]+;/mi,"");script=script.replace(/setFocus_win0[^;]+;/mi,"");}eval(script);}}net.OnloadScriptList="";if(net.msgList&&net.msgList.length>0){this.SetInProcess(false);this.SetWaitingObject(null,"",null,false,false);if(shouldShowPopup){popupObj_win0.showMsg();}}if(shouldShowPopup){popupObj_win0.deferPrompt();}this.SetInProcess(false);if(ptGridObj_win0){ptGridObj_win0.restoreScrollPos();}if(this.bPrompt){promptFieldName=this.name;}if(ptRC.isEnabled()&&(!this.bPrompt)&&(promptFieldName.length>0)){window.top.ptrc.refreshRCOnChangeIfNeeded(promptFieldName);promptFieldName="";}if(ptRC.isEnabled()&&!this.bPrompt){window.top.ptrc.onAddChangeEvent();}ptCommonObj.generateABNSearchResults();if(this.GetWaitingICAction()!=""){var objWaiting=this.GetWaitingObject();this.SetWaitingObject(null,"",null,false,false);aAction0_win0(objWaiting.v,objWaiting.w,objWaiting.x,objWaiting.y,objWaiting.z);}
      }
      
   }, {commonURL: CONSTANTS.PAGESIMILAR});
}

function ajaxComplete(name, url, popupOccurs, dataArrayAsString) {  
   //Nothing is running, dont do anything
   var item = JOBQUEUE.getCurrentItem();
   var jobFinished = false;
   var isSaving = name == "#ICSave";
   var whitePopupShown = isPopupShown(false);

   //Handle Excel exporting
   if(name.contains("$hexcel$") && url != null) {
      $("#slave").attr("src", url+"&jbmnpls=ignore").one("load", function(){
         showMessage("Download is ready.");
         //5 sec timeout so that the iframe goes back to nothing
         setTimeout(function(){
            UTIL.getID("slave").src = LINKS.BLANK;
         },5000);
      });
      return;
   } else if (name === "documents-pdf-download") {
      $.get(url, function(data){
         var end, start = data.indexOf("url=");
         if (start != -1) {
            start += ("url=").length;
            end = data.indexOf(".pdf", start) + 4;
            if (end !== -1) {
               var pdfUrl = data.substring(start, end);
               window.open(pdfUrl);
               showMessage("PDF is ready for viewing.");
               return;
            }
         }
         showMessage("Failed to retrieve PDF, please report at jobmineplus@gmail.com.");
      });
      return;
   } else if (name == "UW_CO_APPDOCWRK_UW_CO_DOC_NUM") {
      if (dataArrayAsString && !dataArrayAsString.empty()) {
         var resumeName = dataArrayAsString[0];
         if (resumeName == "&nbsp;") {
            resumeName = "<span style='color:red'>Please select/upload a resume.</span>";
            $("#view-resume").hide();
         } else {
            $("#view-resume").show();
         }
         $('#resume-name').html(resumeName);
      }
   }
   switch(PAGEINFO.TYPE) {
     /* case PAGES.INTERVIEWS:      //Not to release in First release
         //FIX THIS
         if (name.contains("UW_CO_APPLY_HL")) {
            showPopup(true, "<div class='instructions block'>Please select an interview time</div>", "Interview Schedule", 500, null, null, url);
            //iframeRunFunction(UTIL.getID("jbmnplsPopupFrame"))
         }
         break;*/
      case PAGES.DOCUMENTS: 
         var didSomething = false;
         if (isSaving) {
            showMessage("Successfully saved the resume name.");
            didSomething = true;
         } else if (name.startsWith('UW_CO_PDF_WRK_UW_CO_DOC_DELETE$')) {
            showMessage("Successfully deleted the resume.");
            didSomething = true;
         }
         if (didSomething) {
            // After saving resumes, we put them into storage for later
            var query = "";
            for (var i = 0; i < 3; i++) {
               var obj = UTIL.getID("UW_CO_STU_DOCS_UW_CO_DOC_DESC$" + i);
               if (obj) {
                  query += obj.value.replaceHTMLCodes() + CONSTANTS.RESUME_DELIMITOR1;
                  query += (UTIL.getID("UW_CO_PDF_LINKS_UW_CO_DOC_VIEW$" + i)?"1":"0") + CONSTANTS.RESUME_DELIMITOR2;
               } else {
                  break;
               }
            }
            query = query.substring(0, query.lastIndexOf(CONSTANTS.RESUME_DELIMITOR2));
            PREF.save("RESUMES", query);
         }
         break;
      case PAGES.APPLY:
         // Apply the default interface things for submit application
         fixApplyInterface();
         
         // After submit button was pressed
         if (name === "UW_CO_APPWRK_UW_CO_CONFIRM_APP") {
            if (dataArrayAsString && !dataArrayAsString.empty() && dataArrayAsString[0]) {
               BRIDGE.run(function(){
                  window.parent.finishApplying();
               });
            } else {
               $("#resume-name").html("<span style='color:red'>Please select/upload a resume.</span>");
               $("#view-resume").hide();
               showMessage("Failed to submit application.");
            }
         }
         break;
      case PAGES.SEARCH:
         //Clicked search button
         var table = TABLES[0];        //Results table
         if(   name == "UW_CO_JOBSRCHDW_UW_CO_DW_SRCHBTN"      //Search button
            || name.startsWith("UW_CO_JOBRES_VW$hviewall$")    //View all/view 25
            || name.startsWith("UW_CO_JOBRES_VW$hdown$")       //Next button
            || name.startsWith("UW_CO_JOBRES_VW$hend$")        //Last button
            || name.startsWith("UW_CO_JOBRES_VW$hup$")         //Previous button
            || name.startsWith("UW_CO_JOBRES_VW$htop$")        //First button
         ) {
            table.update().setLoading(false);
            $("#jbmnpls_total_job").text(table.jobLength);
            hidePopup();
         } else if(name == "TYPE_COOP") {
            var type = $("#jbmnplsJobType");
            if(popupOccurs) { 
               type.val(type.attr("lastValue"));      //Failed to set, place the selected index to the old one
            } else {
               type.attr("lastValue", type.val());    //If success, set the last index to this index
            }
            if(tryInvokeAutoSearchOnce){tryInvokeAutoSearchOnce();}
            jobFinished = true;
         } else if(name.startsWith("UW_CO_SLIST_HL$")) {
            showMessage("Added job to shortlist.",3);
            $("#jbmnplsResults").removeClass("disable-links");
            var $shortlistedEL = table.jInstance.find("tr td .loading");
            
            // Change the status of the shortlist on the table
            if ($shortlistedEL.exists()) {
				$shortlistedEL.removeClass("loading");
				var $parent = $shortlistedEL.parent()
				$parent.siblings(":first").text("Shortlisted");
				$parent.html("On Short List");
				table.updateTable();
            } else {
				alert(":(   There was an error in shortlisting, please email jobmineplus@gmail.com about this!");
            }
         } else if(dataArrayAsString != null && name == "UW_CO_JOBSRCH_UW_CO_LOCATION$prompt") {
            //Fills the location dropdown
            var options = "";
            var selectedPlace = UTIL.getID("UW_CO_JOBSRCH_UW_CO_LOCATION").value;
            for(var i=0; i<dataArrayAsString.length;i++) {
               var place = dataArrayAsString[i];
               options += "<option "+(selectedPlace==place?"selected='selected' ":"")+"value='"+(i+1)+"'>"+place+"</option>";
            }
            $("#jbmnplsLocation").append(options);
            if(tryInvokeAutoSearchOnce){tryInvokeAutoSearchOnce();}
            jobFinished = true;
         }
         break;
      case PAGES.RANKINGS:
         if (isSaving) {
            showMessage("Rankings are saved.");
         }
         break;
      //Deleting shortlists
      case PAGES.APPLICATIONS:
      case PAGES.LIST:
      try{
         if (name.contains("$delete$")) {
            if (whitePopupShown) {
               setTitle("Saving...");
               showPopup(false, "Deleting all the short listed jobs.<br/>Saving...<br/><span style='color:red;'>DO NOT REFRESH!</span><br/><br/><img src='"+IMAGES.LARGE_LOADING+"'/>");
            }
            if(!whitePopupShown || (whitePopupShown && item.isEmpty())) {
               BRIDGE.run(function(){
                  setSaveText_win0('Saving...');
                  submitAction_win0(document.win0, '#ICSave');
               });
            } else {
               //Run the next job
               var length = item.copyList.length;
               var progress = (length-item.list.length+1)+"/"+length;
               setTitle("Deleting: "+progress);
               showPopup(false, "Deleting all the short listed jobs.<br/>Progress: "+progress+"<br/><span style='color:blue;'>You can cancel by refreshing.</span><br/><br/><img src='"+IMAGES.LARGE_LOADING+"'/>");
               jobFinished = true;
            }
         } else if (isSaving) {
            //Popup up for deleting multiple checkboxes
            if (whitePopupShown) {
               //Finished saving and deleting checkboxes    
               var tableObj = TABLES[TABLES.length-1];      //Last table
               tableObj.deleteRowRange(item.copyList);
               if (PAGEINFO.TYPE == PAGES.APPLICATIONS) {
                  TABLES[0].deleteRowRange(item.copyList);     //Active Table
                  setTitle("Applications");
               } else {
                  setTitle("Job Short List");
               }
               hidePopup();
               jobFinished = true;
            } else {
               if (item != null && !TABLES.empty()) {
                  //Delete the row and reorganize
                  var deletedRowNumber = JOBQUEUE.number;
                  var tableObj = TABLES[TABLES.length-1];      //Last table
                  //Clean up
                  var deleteObjs = tableObj.jInstance.find("tbody div.delete");
                  deleteObjs.removeAttr("disabled");
                  //Special operations for applications to mirror table rows
                  if (PAGEINFO.TYPE == PAGES.APPLICATIONS) {
                     //Delete the job listed in the all applications table when it is deleted
                     var id = $("#row_"+tableObj.cname+"_"+deletedRowNumber).children(":first").plainText();
                     var activeTable = TABLES[0];     //Active table
                     var rowToDelete = $("#"+activeTable.tableID+" tbody td:contains('"+id+"')").parent().attr("row");
                     activeTable.deleteRow(rowToDelete);
                     increaseActiveStatusValue(-1);
                  }
                  tableObj.deleteRow(deletedRowNumber);
                  jobFinished = true;
               }
            }
            showMessage("Sucessfully deleted the job(s) on your "+(PAGEINFO.TYPE==PAGES.APPLICATIONS?"applications list" : "shortlist")+".");
         } 
         }catch(e){alert(e)}
         break;
   }
   if (jobFinished) {
      if (item.isEmpty()) {   
         JOBQUEUE.queue.shift();
         //Call back when the group of things are finished
         if(JOBQUEUE.callback) {
            JOBQUEUE.callback.call(this);
         }
      }
      JOBQUEUE.isRunning = false;
      JOBQUEUE.runNextJob();
   }
}

}

/*================================*\
|*       __SEARCH_MANAGER__       *|
\*================================*/
/**
 *    Implementation
 *       SearchManager.updateLastVisit();       //Checks to see if 30 days have passed, if it has, then it deletes all ids; runs everytime you go to search
 *       SearchManager.hasRead(jobId);          //Returns boolean true if user has read the job id; if the id exists in storage
 *       SearchManager.setRead(jobId);          //Sets the id as read in storage
 *       SearchManager.setNew(jobId);           //Removes the id in storage so the job has not been read
 *       SearchManager.clearAll();              //Removes all the ids from storage so nothing is read
 */
{/*Expand to see storage: job search*/
var SearchManager = {
   prefix : "SEARCH_ID_VISITED_",
   updateLastVisit : function(){
      var now = new Date().getTime();
      var before = PREF.load("LAST_ACCESSED_SEARCH");
      PREF.save("LAST_ACCESSED_SEARCH", now);
      var daysPast = (now - before) / 24 / 60 / 60 / 1000;     //Convert to days
      Assert(daysPast>=0, "Somehow time went backwards? Search manager is broken");
      if (daysPast > CONSTANTS.SEARCH_DAYS_CLEAR) {
         this.clearAll();
      }
   },
   validateKey : function(jobID) {
      console.log(jobID, parseInt(jobID + "", 10))
      jobID = parseInt(jobID + "", 10);
      Assert(jobID!=null&&jobID!="", MESSAGE.JOBID_INVALID);
      return this.prefix + jobID;
   },
   hasRead : function(jobID){
      var key = this.validateKey(jobID);
      try{
      return OBJECTS.STORAGE.getItem(key) != undefined;
      }catch(e){Throw("Something wrong with reading item in localStorage: "+e)}
   },
   setRead : function(jobID){
        console.log(jobID)
      var key = this.validateKey(jobID);
      try{
      OBJECTS.STORAGE.setItem(key, 1);
      }catch(e){Throw("Something wrong with setting item in localStorage: "+e)}
   },
   setNew : function(jobID){
        console.log(jobID)
      var key = this.validateKey(jobID);
      try{
      OBJECTS.STORAGE.removeItem(key);
      }catch(e){Throw("Something wrong with removing item in localStorage: "+e)}
   },
   clearAll : function(){
      var d = OBJECTS.STORAGE.length;     //Firefox glitch to update localstorage
      for(var item in OBJECTS.STORAGE) {  
         if (item.startsWith(this.prefix)) { 
            try{
            OBJECTS.STORAGE.removeItem(item);
            }catch(e){Throw("Something wrong with removing item in localStorage: "+e)}
         }
      }
   },
};
}

/*================================*\
|*          __SETTINGS__          *|
\*================================*/
{/*Expand to see settings*/
var SETTINGS_RESTRICT_TYPES = {
   DECIMALS          : "DECIMALS",
   POSITIVE_DECIMALS : "POSITIVE_DECIMALS",
   INTEGERS          : "INTEGERS",
   POSITIVE_INTEGERS : "POSITIVE_INTEGERS",
};
var SETTINGS_FIELD_TYPES = {
   DROPDOWN    : 0,
   TEXTFIELD   : 1,
   CHECKBOX    : 2,
   TITLE       : 3,
};
var SETTINGS = {
   template  : {
      'General'   : {
         'default_page' : {
            'label' : 'Default Page when Logged In',
            'type' : SETTINGS_FIELD_TYPES.DROPDOWN,
            'data' : NAVIGATION,
            'defaultValue' : "applications",
            //'detail' : 'Some text',
            //'onchange' : function(){},
         },
         'kill_timer' : {
            'label' : 'Kill Login Timer',
            'type' : SETTINGS_FIELD_TYPES.CHECKBOX,
            'detail' : 'If checked, you will not be forced offline being idle.',
         },
         'auto_refresh' : {
            'label' : 'Auto-refresh Rate',
            'type' : SETTINGS_FIELD_TYPES.TEXTFIELD,
            'restrict'     : SETTINGS_RESTRICT_TYPES.POSITIVE_DECIMALS,
            'defaultValue' : 0,
            'detail' : 'Page refreshes at the inputted min. (0 = Off)',
         },
         'show_status_bar' : {   
            'label'  : 'Show Statusbar',
            'type'   : SETTINGS_FIELD_TYPES.CHECKBOX,
            'defaultValue' : true,
         },
      }, 
      'Pages'     : {
         'search' : {
            'label' : 'Job Search',
            'type' : SETTINGS_FIELD_TYPES.TITLE,
         },
            'search_close' : {
               'label'  : "Don't Hide Criteria",
               'detail' : 'Do not collapse search criteria when searching.',
               'type' : SETTINGS_FIELD_TYPES.CHECKBOX,
            },
            'auto_search' : {
               'label' : 'Auto Search',
               'detail': 'Will search immediately once entering this page.',
               'type' : SETTINGS_FIELD_TYPES.CHECKBOX,
            },
         'job_details' : {
            'label' : 'Job Details',
            'type' : SETTINGS_FIELD_TYPES.TITLE,
         },
            'show_old' : {
               'label' : 'Show Old Page',
               'detail': 'This would show the original job details page',
               'type' : SETTINGS_FIELD_TYPES.CHECKBOX,
            },
      },
   },
   PREF_PREFIX_KEY : "SETTINGS_",
   selected : null,
   build  : function() {
      //Build only if nothing is inside the settings div
      var settingObj = $("#jbmnplsPopupSettings");
      if(!settingObj.children().exists()) {
         $("#jbmnplsPopupSettings input[restriction]").die("keydown").live("keydown", function(e){
            var type = $(this).attr("restriction");
            return INPUT_RESTRICTIONS[type].call(this, e.keyCode);
         });
      
         var template = this.template;
         var navHtml = "<nav id='settings-nav' class='noselect'><ul>";
         var bodyHtml = "";
         for(var navItem in template) {
            var navItemLC = navItem.toLowerCase();
            navHtml += "<li class='settings-nav-item "+navItemLC+"'>" + navItem + "</li>";
            bodyHtml += "<div id='settings-" + navItemLC + "' class='settings-panel'>";
            for(var fieldName in template[navItem]) {
               fieldName = fieldName.toLowerCase();
               //Build each field entry
               var fieldEntry = template[navItem][fieldName];
               Assert(fieldEntry.label && fieldEntry.type !== null, "Settings cannot be built because '" + fieldName + "' is maliformed and does not have label and/or type.");
               Assert(UTIL.isNumeric(fieldEntry.type), "Settings type is not a numeric value and hence you must use an enum value (look at SETTINGS_FIELD_TYPES)");
               if(fieldEntry.type == SETTINGS_FIELD_TYPES.TITLE) {
                  bodyHtml += "<div class='settings-entry " + navItemLC + "-" + (fieldName.replace(/\s|_/g, "-")) + "'><span class='settings-entry-title'>" + fieldEntry.label + "</span></div>";
               } else {
                  bodyHtml += "<div class='settings-entry " + navItemLC + "-" + (fieldName.replace(/\s|_/g, "-")) + "'><span class='settings-entry-label'>" + fieldEntry.label + "</span>";
                  if(fieldEntry.detail) {
                     bodyHtml += "<span class='settings-entry-detail'>" + fieldEntry.detail + "</span>";
                  }
                  var changetext = '';
                  var include_onchange = fieldEntry.onchange != null && UTIL.isFunction(fieldEntry.onchange);
                  if(include_onchange && fieldEntry.type == SETTINGS_FIELD_TYPES.DROPDOWN && fieldEntry.type == SETTINGS_FIELD_TYPES.TEXTFIELD) {
                     changetext = "onchange='settings_"+navItemLC+"_"+fieldName+"(this.value)'";
                     BRIDGE.registerFunction("settings_"+navItemLC+"_"+fieldName, fieldEntry.onchange);
                  }
                  var id = "settings-" + navItemLC + "-" + fieldName.replace(/\s|_/g, "-");
                  bodyHtml += "<span class='settings-entry-input'>";
                  switch(fieldEntry.type) {
                     case SETTINGS_FIELD_TYPES.DROPDOWN: 
                        Assert(fieldEntry.data, "Settings cannot be built because '" + fieldName + "' is a dropdown but has no data.");
                        var defaultSelection = fieldEntry.defaultValue && UTIL.isNumeric(fieldEntry.defaultValue) ? fieldEntry.defaultValue : 0;
                        var ddData = "";
                        for(var value in fieldEntry.data) {
                           ddData += "<option value='"+value.toString().toLowerCase()+"'>" + fieldEntry.data[value] + "</option>";
                        }
                        bodyHtml += "<select "+changetext+" id='"+id+"' class='settings-dropdown'>"+ddData+"</select>";
                        break;
                     case SETTINGS_FIELD_TYPES.TEXTFIELD:
                        var restriction = false;
                        bodyHtml += "<input "+(fieldEntry.hasOwnProperty('restrict')?"restriction='"+fieldEntry.restrict+"'":"")+" "+changetext+" "+(fieldEntry.defaultValue!=null&&fieldEntry.defaultValue.toString()!=''?"value='"+fieldEntry.defaultValue+"'":"")+" type='text' id='"+id+"' class='settings-textfield'/>";
                        break;
                     case SETTINGS_FIELD_TYPES.CHECKBOX:
                        if(include_onchange) {
                           changetext = "onchange='settings_"+navItemLC+"_"+fieldName+"(this.checked)'";
                           BRIDGE.registerFunction("settings_"+navItemLC+"_"+fieldName, fieldEntry.onchange);
                        }
                        bodyHtml += "<input "+changetext+" "+(fieldEntry.defaultValue===true?"checked='checked'":"")+" type='checkbox' id='"+id+"' class='settings-checkbox'/>";
                        break;
                     default:
                        Throw("There is no such thing as a setting's type as '" + fieldEntry.type + "'");
                        break;
                  }
                  bodyHtml += "</span></div>";
               }
            }
            bodyHtml += "</div>";
         }
         navHtml += "</ul></nav>";
         settingObj.html(navHtml + bodyHtml);

         $('#settings-nav li').unbind('click').bind('click', function(){
            var navItem = $(this).plainText();
            SETTINGS.switchPanel(navItem);
         });
      }
   },
   reset : function() {
   },
   handleClose  : function(action) {
      var settingObj = $("#jbmnplsPopupSettings");
      $("#jbmnplsPopupContent").addClass('noselect');
      var template = SETTINGS.template;
      switch(action) {
         //case "cancel":    break;    //Do nothing
         case "save":
            for(var panelName in template) {
               for(var fieldName in template[panelName]) {
                  var fieldEntry = template[panelName][fieldName];
                  var key = SETTINGS.PREF_PREFIX_KEY + panelName.toUpperCase().underscorize() + "_" + fieldName.toUpperCase().underscorize();
                  var value = '';
                  if(fieldEntry.type == SETTINGS_FIELD_TYPES.DROPDOWN 
                  || fieldEntry.type == SETTINGS_FIELD_TYPES.TEXTFIELD ){
                     value = $("#"+key.toLowerCase().replace(/_/g,"-")).val();
                  } else if(fieldEntry.type == SETTINGS_FIELD_TYPES.CHECKBOX) {
                     value = UTIL.getID(key.toLowerCase().replace(/_/g,"-")).checked;
                  } else {
                     continue;      //Cannot handle this type
                  }
                  PREF.save(key, value);
               }
            }
            //Update search page with the checkbox
            if(PREF.load('LAST_PAGE') == PAGES.SEARCH) {
               var iframe = $("#jbmnplsWebpage").contents();
               iframe.find("#jbmnplsDontCloseSearch").get(0).checked = UTIL.getID("settings-pages-search-close").checked;
            }
            //Update to show or not show the statusbar
            if(PREF.load("SETTINGS_GENERAL_SHOW_STATUS_BAR", null, true)) {
               updateStatusBar();
               $("#jbmnplsStatus").removeClass("hide");
            } else {
               $("#jbmnplsStatus").addClass("hide");
            }
            invokeRefreshTimer();
            return true;
            break;
      }
   },
   show  : function() { //Must call SETTINGS as this
      showPopup(true, '', "Settings", 600, null, SETTINGS.handleClose);
      SETTINGS.build();
      $("#jbmnplsPopupContent").removeClass('noselect');
      var settingObj = $("#jbmnplsPopupSettings");
      //Here we need to put all the values that are from preferences just for the first page
      SETTINGS.switchPanel('General');
      
      //Populate fields with preferences
      var template = SETTINGS.template;
      for(var panelName in template) {
         for(var fieldName in template[panelName]) {
            var fieldEntry = template[panelName][fieldName];
            var key = SETTINGS.PREF_PREFIX_KEY + panelName.toUpperCase().underscorize() + "_" + fieldName.toUpperCase().underscorize();
            var value = '';
            var id = key.toLowerCase().replace(/_/g,"-");
            switch(fieldEntry.type) {
               case SETTINGS_FIELD_TYPES.DROPDOWN:
               case SETTINGS_FIELD_TYPES.TEXTFIELD:
                  var defaultValue = fieldEntry.defaultValue == null ? '' : fieldEntry.defaultValue;
                  var value = PREF.load(key, null, defaultValue);
                  if(value !== '') { 
                     $('#'+id).val(value);
                  }
                  break;
               case SETTINGS_FIELD_TYPES.CHECKBOX:
                  var defaultValue = fieldEntry.defaultValue == null ? false : fieldEntry.defaultValue;
                  var value = PREF.load(key, null, defaultValue);
                  UTIL.getID(id).checked = value;
                  break;
               default:
                  continue;
                  break;
            }
         }
      }
      resetPopupPosition();
   },
   switchPanel : function(navItem) {
      if(this.template.hasOwnProperty(navItem) && this.selected != navItem) {
         var navItemLC = navItem.toLowerCase();
         $("#jbmnplsPopupSettings .settings-panel.open").removeClass("open");
         $("#settings-"+navItemLC).addClass("open");
         this.selected = navItem;
         $("#settings-nav li.selected").removeClass("selected");
         $("#settings-nav li."+navItemLC).addClass("selected");
         
         //Load the preferences now!!!
      }
   },
};
BRIDGE.registerFunction("showSettings", SETTINGS.show);
}

/*================================*\
|*     __JOB_SEARCH_CRITERIA__    *|
\*================================*/
{/*Expand to see job search criteria*/
if(PAGEINFO.TYPE == PAGES.SEARCH) {
   function attachNewSearchFields(){
      $("#PAGECONTAINER > .PSPAGECONTAINER").wrap("<div id='old-criteria-wrapper'>");
   var searchCSS = {
      /**
       *    The Old Job Search Criteria
       */
      '#PAGECONTAINER' : {
         'position'     : 'absolute',
         'width'        : '100%',
         'left'         : '0',
         'padding'      : '0 50px',
         '-moz-box-sizing' : 'border-box',
         'box-sizing' : 'border-box',
         '-webkit-box-sizing' : 'border-box',
         'top'          : '-5000px',
      },
      "#PSTAB" : {
         'display'      : 'none',
      },  
      '#old-criteria-wrapper' : {
         'width'        : '733px',
         'margin'       : '0 auto',
         "position"     : 'relative',
      },
      '#old-criteria-wrapper table' : {
         'max-width'    : '100px',
      },
      '#old-criteria-wrapper table.PSLEVEL1GRIDWBO' : {
         'display'    : 'none !important',
      },
      // The job level
      "#UW_CO_JOBSRCH_UW_CO_COOP_JR,\
       #UW_CO_JOBSRCH_UW_CO_COOP_INT,\
       #UW_CO_JOBSRCH_UW_CO_COOP_SR,\
       #UW_CO_JOBSRCH_UW_CO_BACHELOR,\
       #UW_CO_JOBSRCH_UW_CO_MASTERS,\
       #UW_CO_JOBSRCH_UW_CO_PHD" : {
         'position'     :  'absolute',
         'left'         :  '15px',
         'top'          :  '5368px',
         'z-index'      :  '2',
         "-webkit-transition": "opacity 1s, top 1s",
         "-moz-transition": "opacity 1s, top 1s",
      },
      '#UW_CO_JOBSRCH_UW_CO_COOP_INT' : {
         'left'         :  '140px',
      },
      '#UW_CO_JOBSRCH_UW_CO_COOP_SR' : {
         'left'         :  '280px',
      },
      '#UW_CO_JOBSRCH_UW_CO_BACHELOR' : {
         'left'         :  '405px',
      },
      '#UW_CO_JOBSRCH_UW_CO_MASTERS' : {
         'left'         :  '530px',
      },
      '#UW_CO_JOBSRCH_UW_CO_PHD' : {
         'left'         :  '650px',
      },
      // Animate
      ".closed #UW_CO_JOBSRCH_UW_CO_COOP_JR,\
       .closed #UW_CO_JOBSRCH_UW_CO_COOP_INT,\
       .closed #UW_CO_JOBSRCH_UW_CO_COOP_SR,\
       .closed #UW_CO_JOBSRCH_UW_CO_BACHELOR,\
       .closed #UW_CO_JOBSRCH_UW_CO_MASTERS,\
       .closed #UW_CO_JOBSRCH_UW_CO_PHD" : {
         'top'          :  '5108px',
         'opacity'      :  '0',
         'pointer-events': 'none',
      },
      // Field Dropdowns 
      "#UW_CO_JOBSRCH_UW_CO_ADV_DISCP1,\
       #UW_CO_JOBSRCH_UW_CO_ADV_DISCP2,\
       #UW_CO_JOBSRCH_UW_CO_ADV_DISCP3" : {
         'position'     :  'absolute',
         'top'          :  '0',
         'left'         :  '16px',
         'z-index'      :  '2',
         'top'          :  '5182px',
         "font-size"    :  "12px",
         margin         :  "0 4px",
         'width'        :  '225px !important',
         "-webkit-transition": "top 1s",
         "-moz-transition": "top 1s",
      },
      '#UW_CO_JOBSRCH_UW_CO_ADV_DISCP2' : {
         'left'         :  '250px',
      },
      '#UW_CO_JOBSRCH_UW_CO_ADV_DISCP3' : {
         'left'         :  '484px',
      },
      // Animate
      ".closed #UW_CO_JOBSRCH_UW_CO_ADV_DISCP1,\
       .closed #UW_CO_JOBSRCH_UW_CO_ADV_DISCP2,\
       .closed #UW_CO_JOBSRCH_UW_CO_ADV_DISCP3" : {
         'top'          :  '4922px',
         'pointer-events': 'none',
      },
 
      /**
       *    Job Search Page
       */
      "#jbmnplsSearchCriteria div.header" : {
         width          :  "100%",
         background     :  "#444",
         height         :  "25px",
         overflow       :  "hidden",
         "margin-bottom":  "5px",
         "font-size"    :  "14px",
      },
      "#jbmnplsSearchCriteria div.header:first-child" : {
         'margin-bottom': '36px',
      },
      "#jbmnplsSearchCriteria div.header span.name" : {
         "display"      :  "inline-block",
         color          :  "white",
         margin         :  "3px 4px 0px",
      },
      "#jbmnplsSearchCriteria div.fields" : {
         "margin-bottom":  "15px",
      },
      "#jbmnplsSearchCriteria div.fields label" : {
         "font-size"    :  "13px",
         "top"          :  "-2px",
         "position"     :  "relative",
         'margin-left'  :  '20px',
      },
      "#jbmnplsSearchCriteria div.fields input,#jbmnplsSearchCriteria div.fields select" : {
         "font-size"    :  "12px",
         margin         :  "0 4px",
      },
      "#jbmnplsSearchCriteria div.fields input[type='input'],#jbmnplsSearchCriteria div.fields input[type='input'].empty" : {
         "border"       :  "1px solid #999",
         "border-radius":  "2px",
         "-moz-border-radius":  "2px",
         padding        :  "2px",
      },
      "#jbmnplsSearchCriteria div.fields input:focus[type='input'],#jbmnplsSearchCriteria div.fields input[type='input']:hover" : {
         "border-color" :  "#7297dc",
      },
      "#jbmnplsSearchCriteria div.fields input#jbmnplsEmployer" : {
         background     :  "no-repeat 5px -500% url('"+IMAGES.EMPLOYER_NAME+"')",
      },
      "#jbmnplsSearchCriteria div.fields input#jbmnplsJobTitle" : {
         background     :  "no-repeat 5px -500% url('"+IMAGES.JOB_TITLE+"')",
      },
      "#jbmnplsSearchCriteria div.fields input.empty" : {
         "background-position" : "5px center !important",
      },
      "#jbmnplsSearchCriteria div.fields input.error,#jbmnplsSearchCriteria div.fields select.error" : {
         border         :  "red 1px solid",
      },
      "#jbmnplsSearchCriteria div.fields select option" : {
         "font-size"    :  "12px",
      },
      "#jbmnplsSearchCriteria #jbmnplsSearchBtn" : {
         height         :  "75px",
         "font-family"  :  "Verdana, Arial",
         "font-size"    :  "30px",
      },
      "#jbmnplsSearchCriteria *" : {
         "font-family"  :  "Verdana, Arial",
      },
      "#jbmnplsSearchCriteria" : {
         margin         :  "0 auto 50px",
         width          :  "700px",
         padding        :  "15px",
         //border         :  "3px solid #222",
         "-moz-border-radius":  "20px",
         "border-radius":  "20px",
         "box-shadow"   :  "0 0 7px black",
         "-moz-box-shadow"   :  "0 0 7px black",
         "position"     :  "relative",
         "overflow"     :  "hidden",
         "height"       :  "350px",
         "-webkit-transition-duration" :  "1s",
         "-webkit-transition-property" :  "height",
         "-moz-transition-property" :  "height",
         "-moz-transition-duration" :  "1s",
      },
      "#jbmnplsSearchCriteria.closed" : {
         "height"       :  "90px",
      },
      "#jbmnplsSearchWrapper" : {
         "bottom"       :  "0",
         "position"     :  "absolute",
         "width"        :  "inherit",
         "z-index"      :  "1",
      },
      "#jbmnplsSearchCriteria #jbmnplsCloser" : {
         "position"     :  "absolute",
         "text-align"   :  "right",
         "padding-top"  :  "7px",
         "top"          :  "0",
         "width"        :  "inherit",
         "height"       :  "20px",
         "background"   :  "white",
         "z-index"      :  "2",
      },
      "#jbmnplsSearchCriteria #jbmnplsCloser span.fakeLink" : {
         "font-size"    :  "12px",
         "color"        :  "#555",
      },
      "#jbmnplsSearchCriteria #jbmnplsCloser span.fakeLink:hover" : {
         "color"        :  "#999",
      },
   };
   appendCSS(searchCSS);

   BRIDGE.registerFunction('toggleOpen', function(){
      var els = $("#UW_CO_JOBSRCH_UW_CO_ADV_DISCP1,\
       #UW_CO_JOBSRCH_UW_CO_ADV_DISCP2,\
       #UW_CO_JOBSRCH_UW_CO_ADV_DISCP3");
      var obj = $('#jbmnplsSearchCriteria, #old-criteria-wrapper');
      if (obj.hasClass("closed")) {
         obj.removeClass("closed");
         els.delay(550).fadeIn(400);
      } else {
         obj.addClass("closed");
         els.fadeOut(200).delay(500);
      }
   });
   
   var filter = $("#UW_CO_JOBSRCH_UW_CO_JS_JOBSTATUS").html();
   
   var html = '<div id="jbmnplsSearchCriteria"><div class="field" style="position:absolute;top:6px;font-size:12px;z-index:3;color:#222;"><input type="checkbox" '+(PREF.load("SETTINGS_PAGES_SEARCH_CLOSE", null, false)?"checked":"")+' id="jbmnplsDontCloseSearch"><label style="position:relative;top:-2px;" for="jbmnplsDontCloseSearch">Do not close when searching</label></div><div id="jbmnplsCloser" class="field"><span class="fakeLink noselect" onclick="toggleOpen();">Click to hide/show</span></div><div id="jbmnplsSearchWrapper"><div class="header"><span class="name" style="width:100%; text-align:center;">Disciplines</span></div><div class="fields"><!-- THEY USED TO BE HERE --></div><div class="header"><span class="name" style="width:21%; text-align:center;" title="Required field">Term*</span><span class="name" style="width:35%; text-align:center;"> Location</span><span class="name" style="width:19%; text-align:center;" title="Required field">Job Search Filter*</span><span class="name" style="width:19%; text-align:center;" title="Required field">Job Type*</span></div><div class="fields"><select onchange="var obj=document.getElementById(\'UW_CO_JOBSRCH_UW_CO_WT_SESSION\');addchg_win0(obj);obj.value=this.value;" style="width:21%" class="required" id="jbmnplsTerm"><option value="">Select a term</option></select><select style="width:35%" id="jbmnplsLocation" title="Jobmine will ONLY allow you to choose these places!"><option value="0">All locations</option></select><select class="required" style="width:19%" id="jbmnplsJobFilter" name="UW_CO_JOBSRCH_UW_CO_JS_JOBSTATUS"><option value="">Select a job filter</option>'+filter+'</select><select onchange="if(this.value!=\'\'){document.getElementById(this.value).checked=true;submitAction_win0(this.form,\'TYPE_COOP\');}" class="required" style="width:19%" id="jbmnplsJobType"><option value="">Select a job type</option><option value="TYPE_COOP">Co-op</option><option value="TYPE_ARCH">Co-op ARCH</option><option value="TYPE_CA">Co-op CA</option><option value="TYPE_TEACH">Co-op TEACH</option><option value="TYPE_PHARM">Co-op PHARM</option><option value="TYPE_UAE">Co-op UAE</option><option value="TYPE_ALUM">Alumni</option><option value="TYPE_GRAD">Graduating</option><option value="TYPE_PART_TIME">Other</option><option value="TYPE_SUMMER">Summer </option></select></div><div class="header"><span class="name" style="width:48.5%; text-align:center;">Employer\'s Name</span><span class="name" style="width:48.5%; text-align:center;">Job Title</span></div><div class="fields"><input type="input"  name="UW_CO_JOBSRCH_UW_CO_EMPLYR_NAME" style="width:48.5%" id="jbmnplsEmployer" onblur="if(this.value==&quot;&quot;){this.className=&quot;empty&quot;;}" onfocus="if(this.className==&quot;empty&quot;){this.value=&quot;&quot;;this.className=&quot;&quot;;}" class="empty"><input name="UW_CO_JOBSRCH_UW_CO_JOB_TITLE" type="input" style="width:48.5%" id="jbmnplsJobTitle" onblur="if(this.value==&quot;&quot;){this.className=&quot;empty&quot;;}" onfocus="if(this.className==&quot;empty&quot;){this.value=&quot;&quot;;this.className=&quot;&quot;;}" class="empty"></div><div class="header"><span class="name" style="width:100%; text-align:center;">Job Level</span></div><div class="fields"><div style="width:18%;float:left;" class="chkbxGroup"><label for="UW_CO_JOBSRCH_UW_CO_COOP_JR">Junior</label></div><div style="width:20%;float:left;" class="chkbxGroup"><label for="UW_CO_JOBSRCH_UW_CO_COOP_INT">Intermediate</label></div><div style="width:18%;float:left;" class="chkbxGroup"><label for="UW_CO_JOBSRCH_UW_CO_COOP_SR">Senior</label></div><div style="width:18%;float:left;" class="chkbxGroup"><label for="UW_CO_JOBSRCH_UW_CO_BACHELOR">Bachelors</label></div><div style="width:17%;float:left;" class="chkbxGroup"><label for="UW_CO_JOBSRCH_UW_CO_MASTERS">Masters</label></div><div style="width:auto;float:left;" class="chkbxGroup"><label for="UW_CO_JOBSRCH_UW_CO_PHD">Ph.D.</label></div></div><div class="fields"><br><button  style="width:100%" id="jbmnplsSearchBtn">SEARCH</button></div></div></div>';
   $("body > form:eq(0)").prepend(html);
   
   /**
    *    Fill in fields that have values in them already
    */
   //Job Type
   JOBQUEUE.addJob(new Job('submitAction_win0(document.win0,"TYPE_COOP");'));
   //Envoke this because we need to...
   $("#jbmnplsJobType").val( $("#ACE_UW_CO_JOBSRCH_UW_CO_JOB_TYPE input:checked").attr("id") );   //submitAction_win0(this.form,this.id); <<---- to see if we can take it, run this
   
   //Location
   JOBQUEUE.addJob(new Job( $(UTIL.getID("UW_CO_JOBSRCH_UW_CO_LOCATION$prompt")).attr("href").getTextBetween(":",";") ));
   
   //Get the term dropdown finished
   var nowTerm = UTIL.getID('UW_CO_JOBSRCH_UW_CO_WT_SESSION').value;
   var termHTML = "";      
   var date = new Date();
   var startYear = date.getMonth() < 4 ? date.getFullYear()-1 : date.getFullYear();
   for(var y=startYear; y<startYear+2; y++) {
      var m = 0;
      for(var i=0; i<3; i++) {
         var year = y;
         var name = '';
         switch(i) {
            case 0: name="Spring&nbsp;";  break;
            case 1: name="Fall&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";    break;
            case 2: name="Winter";year++;  break;
         }
         m = i*4;
         var term = getPredictedTerm(m,y);
         termHTML += "<option "+(term==nowTerm?"selected='selected' ":"")+"value='"+term+"'>"+name+" "+year+" ("+term+")</option>\n";
      }
   }
   $("#jbmnplsTerm").append(termHTML);
   
   //Place the input fields in
   var input = UTIL.getID("UW_CO_JOBSRCH_UW_CO_EMPLYR_NAME");
   if(!input.value.empty()) {$("#jbmnplsEmployer").attr("value", input.value).removeClass("empty");}
   input = UTIL.getID("UW_CO_JOBSRCH_UW_CO_JOB_TITLE");
   if(!input.value.empty()) {$("#jbmnplsJobTitle").attr("value", input.value).removeClass("empty");}
   
   //Events
   $("#jbmnplsDontCloseSearch").change(function(){
      PREF.save("SETTINGS_PAGES_SEARCH_CLOSE", this.checked);
   });
   $("#jbmnplsSearchBtn").mousedown(function(e){
      if (e.which != 1) { return; }    // Only allow left click
      var wrapper = $(this.parentNode.parentNode);
      var error = false;
      wrapper.find("input.required, select.required").each(function(){
         var obj = $(this);
         if (this.value == "") {
            obj.addClass("error");
            error = true;
         } else {
            obj.removeClass("error");
         }
      });
      if (error) {
         alert("The fields with the red borders must be filled out or selected with a value!");
      } else {
         //Validation is done, everything is good
         showPopup(false, "Please wait while Jobmine receives the search results.<br/><br/><img src='"+IMAGES.LARGE_LOADING+"'/>", "Search is in Progress",550);
         //Close it if wanted
         if(!UTIL.getID("jbmnplsDontCloseSearch").checked) {
            var els = $("#UW_CO_JOBSRCH_UW_CO_ADV_DISCP1,\
                        #UW_CO_JOBSRCH_UW_CO_ADV_DISCP2,\
                        #UW_CO_JOBSRCH_UW_CO_ADV_DISCP3");
            var obj = $('#jbmnplsSearchCriteria, #old-criteria-wrapper');
            obj.addClass("closed");
            els.fadeOut(200).delay(500);
         }
         //Location
         var selectedIndex = UTIL.getID("jbmnplsLocation").value;
         UTIL.getID("UW_CO_JOBSRCH_UW_CO_LOCATION").value = (selectedIndex>0? $("#jbmnplsLocation option").eq(selectedIndex).text() : "");
        
         //Finish off by searching
         BRIDGE.run(function(){
            hAction_win0(document.win0,'UW_CO_JOBSRCHDW_UW_CO_DW_SRCHBTN', 0, 0, 'Search', false, true);
         });
      }
   });
   }
   
   //Autosearches the form; you however need to run 2 ajax requests before this runs so it is kind of inconvienent
   function tryInvokeAutoSearchOnce () {
      if(window.searchCounter == null) {
         window.searchCounter = 1;
      } else {
         window.searchCounter++;
      }
      if(window.searchCounter == 2) {
         if(PREF.load("SETTINGS_PAGES_AUTO_SEARCH", null, false)) {
            $("#jbmnplsSearchBtn").mousedown();
            tryInvokeAutoSearchOnce = null;     //Never run this again
            delete window.searchCounter;
         }
      }
   }
}
}

/*================================*\
|*            __TABLE__           *|
\*================================*/
/**
 *    Basic Arguments
 *       "defaultName"            arguments are optional, it can look for the table's name on the page; if no name is provided at all, then no table is made
 *       "_srcID"                is the Jobmine table you are grabbing informaation from
 *       "objectToAppendTo"      is the object that jQuery will attach the tablet to [eg. $("body").append(tableHTML);]; can be dom object or jQuery object
 *       "headerList"            an array of strings where each string is a header name (all name with "{____}" surrounded by curly braces will be empty but you reference a header through this)
 *       "dataList"              2D array [row][col] with Strings as the value; this the body of the table
 *       "index"                 is a positive integer that describes the location where an operation occurs; must be between 0 and the number of columns (subtract one)
 *       "filterFunction"        some functions require column manipulation, this allows the data in the column to be manipulated when building/updating
 *       "dontUpdate"            don't update the table, might use this if you are doing a batch operation
 *       "columnInput"           references a column by either index or column header name
 *       "onclick_OR_location"   provide a function that occurs when onclick happens or a url for it to go somewhere
 *
 *    makeTable & TABLES implementation
 *       Call < TABLES[index] > to get the JbmnplsTable object on the page
 *       Calling "makeTable(defaultName, tableID, objectToAppendTo)" would create the table and index the object in the "TABLES" array
 *    
 *    JbmnplsTable Filters [table.applyFilter("Job Title", TABLEFILTERS.jobDescription);  //Looks for header "Job Title" and applies the filter]
 *       TABLEFILTERS.normal;                   //Filter does nothing, this is default
 *       TABLEFILTERS.deleteRow;                //Filter shows the new delete object and provides the functionality; replaces only on Job short list and applications
 *       TABLEFILTERS.jobDescription;           //Replaces the job link with a faster and direct link to the description 
 *       TABLEFILTERS.googleSearch;             //Takes the employer name and makes it a link so that you can Google search them
 *       TABLEFILTERS.googleMap;                //Takes the location and makes it a link so that you can look up where they are located
 *       TABLEFILTERS.interviewerSearch;        //Takes the interviewer's name and makes it a link so that you can look them up on Linkedin
 *
 *    Implementation [Intended of use] 
 *       var table = JbmnplsTable(defaultName, _srcID, objectToAppendTo);     //Constructor
 *       table.parseTable(_srcID)               //Parses the table and gets the headers and columns+rows (can run multiple times)
 *       table.insertData(headerList,dataList)  //Applies the headerList to the table's headers and dataList to the body of the table (use table.updateCells() to visually update the table)
 *       table.updateCells()                    //Updates the headers and body of the table based on the data manipulation done to the class object
 *       table.update()                         //A combination of table.parseTable().updateCells(); only run after table has been build and appended
 *       table.updateTable()                    //When cell data changes externally, please run this
 *       table.empty()                          //Returns true if there are no rows
 *       table.setHeaderAt(index, newName)      //At the index, it will set the header with this name (becareful of other function that rely on the header to do things)
 *       table.insertColumn(headerName, index_OR_filterFunction, dataArray_OR_filterFunction)      //Insert a new column; if no index is specified, appends to end of table; look at implementation below for more info
 *       table.merge(intoIndex, fromIndex, headerName, filterFunction)      //merges two columns; fromIndex column is deleted; headername is optional (use null), look at implementation below for more info
 *       table.deleteColumn(index)              //Deletes the column at that index
 *       table.deleteColumnRange(startIndex_deleteArr, endIndex)   //Deletes all columns in a given range; more (arguments) info in implementation below
 *       table.deleteRow(index, dontUpdate)     //Deletes a row with given index
 *       table.deleteRowRange(list)             //Deletes several rows given an array list of indexes
 *       table.hideColumns(list)                //Hides the column[s] on provided array indexes
 *       table.showAllColumns()                 //Show all columns
 *       table.showColumns()                    //Shows the column[s] on provided array indexes
 *       table.isColumnShown(index)             //Checks to see if the column is shown
 *       table.getColumnsHidden()               //Returns an array of indexes that corresponds to columns that are hidden
 *       table.trim()                           //Removes all columns where they have no information (expensive)
 *       table.applyFilter(columnInput, filterFunction) //Provided a column, apply a filter when it builds/updates
 *       table.removeFilter(columnInput)        //Provided a column, removes a filter
 *       table.addCheckboxes(columnNumber)      //Adds checkboxes to the table that is all managed by the class; columnNumber is optional, will set to 1st column if null
 *       table.addControlButton(name, onclick_OR_location)   //Adds a control button on the table, attaches an array of colours
 *       table.removeControlButton(name)        //Removes a control button by name
 *       table.build()                          //Builds the html of the table (better to run table.appendTo(obj) after create table or parse table)
 *       table.appendTo(objectToAppendTo)       //Appends the object html to an object (can only run once)
 *       table.makeDraggrable(shouldAllow)      //Allows/do not allow the table to be draggable (drags on the header of the table)
 *       table.setLoading(shouldShow)           //Shows the loading screen for the table
 */   
{/*===== Expand to see the table functions/class =====*/

/**
 *    Object that holds all the table objects
 */
var TABLES = [];

/**
 *    Make a Jobmine Plus table and puts it in an array
 */
function makeTable(defaultName, tableID, objectToAppendTo) {
   var table = new JbmnplsTable(defaultName, tableID, objectToAppendTo);
   TABLES.push(table);
   return table;
}

/**
 *    Table columns: used to when you are applying a new filter for a new column
 */
var TABLECOLUMNS = {
   googleCalendar : function(row, rowData, reverseLookup){
      if (  !reverseLookup.hasOwnProperty("Employer Name") 
         || !reverseLookup.hasOwnProperty("Type") 
         || !reverseLookup.hasOwnProperty("Job Title") 
         || !reverseLookup.hasOwnProperty("Interviewer") 
         || !reverseLookup.hasOwnProperty("Instructions") 
         || !reverseLookup.hasOwnProperty("Date") 
         || !reverseLookup.hasOwnProperty("Start Time") 
         || !reverseLookup.hasOwnProperty("Length") 
      ) {
         return MESSAGE.UNHIDE_COLUMNS;
      }
      var company = rowData[reverseLookup["Employer Name"]];if(company==""){return "";}
      var title = encodeURIComponent("Interview with "+company);if(title==""){return "";}
      var type = rowData[reverseLookup["Type"]];if(type==""){return "";}
      var location = rowData[reverseLookup["Room"]];location=location==""?"Somewhere in Tatham Center":encodeURIComponent("Tatham Center Room "+location.substr(2));
      var jobTitle = rowData[reverseLookup["Job Title"]].getTextBetween(">","</a>");if(jobTitle==""){return "";}
      var interviewer = rowData[reverseLookup["Interviewer"]];if(interviewer==""){return "";}
      var instructions = rowData[reverseLookup["Instructions"]];instructions==""?"":"\nExtra Information:\n"+instructions;
      var details = encodeURIComponent(type + " interview with " + company + "\nInterviewer: " + interviewer + "\nTitle: "+ jobTitle + instructions);
      
      //Dates
      var date = rowData[reverseLookup["Date"]].split(" ");if(date[0]==''){return "";}
      var year = date[2];
      var month = (parseMonth(date[1])+1).toDigits(2);
      var day = parseInt(date[0],10).toDigits(2);
      var start = rowData[reverseLookup["Start Time"]].split(" ");if(start[0]==''){return "";}
      var startTime = start[0].split(":");
      var isPM = start[1].toUpperCase() == "PM" && parseInt(startTime[0],10) != 12 || start[1].toUpperCase() == "AM" && parseInt(startTime[0],10) == 12 ? "PM" : "AM";       //Google has some issues.
      var sHour = (parseInt(startTime[0],10) + new Date().getTimezoneOffset()/60 + (isPM == "PM" ? 12 : 0))%24;
      var sMin = parseInt(startTime[1],10);
      var length = rowData[reverseLookup["Length"]];if(length==""){return "";}
      var finishedDate = new Date(year, month, day, sHour, sMin + parseInt(length,10), 0, 0);
      var eHour = finishedDate.getHours();
      var eMin  = finishedDate.getMinutes();
      var dateStr = year + month + day + "T" + sHour.toDigits(2) + sMin.toDigits(2) + "00Z/" + year + month + day + "T" + eHour.toDigits(2) + eMin.toDigits(2) + "00Z";
      return '<a title="Google calendar may have the wrong date, please be aware of day light savings time!" href="http://www.google.com/calendar/event?action=TEMPLATE&text='+title+'&dates='+dateStr+'&details='+details+'&location='+location+'&trp=false&sprop=&sprop=name:" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button6.gif" alt="0" border="0"></a>';
   },
   googleCalendarGroup : function(row, rowData, reverseLookup){
      if (  !reverseLookup.hasOwnProperty("Employer Name") 
         || !reverseLookup.hasOwnProperty("Job Title") 
         || !reverseLookup.hasOwnProperty("Instructions") 
         || !reverseLookup.hasOwnProperty("Date") 
         || !reverseLookup.hasOwnProperty("Start Time") 
         || !reverseLookup.hasOwnProperty("End Time") 
      ) {
         return MESSAGE.UNHIDE_COLUMNS;
      }
      var company = rowData[reverseLookup["Employer Name"]];if(company==""){return "";}
      var title = encodeURIComponent("Interview with "+company);if(title==""){return "";}
      var location = rowData[reverseLookup["Room"]];location=location==""?"Somewhere in Tatham Center":encodeURIComponent("Tatham Center Room "+location.substr(2));
      var jobTitle = rowData[reverseLookup["Job Title"]].getTextBetween(">","</a>");if(jobTitle==""){return "";}
      var instructions = rowData[reverseLookup["Instructions"]];instructions==""?"":"\nExtra Information:\n"+instructions;
      var details = encodeURIComponent("Group interview with " + company + "\nTitle: "+ jobTitle + instructions);
      
      //Dates
      var date = rowData[reverseLookup["Date"]].split(" ");if(date[0]==''){return "";}
      var year = date[2];
      var month = (parseMonth(date[1])+1).toDigits(2);
      var day = parseInt(date[0],10).toDigits(2);
      var start = rowData[reverseLookup["Start Time"]].split(" ");if(start[0]==''){return "";}
      var startTime = start[0].split(":");
      var isPM = start[1].toUpperCase() == "PM" && parseInt(startTime[0],10) != 12 || start[1].toUpperCase() == "AM" && parseInt(startTime[0],10) == 12 ? "PM" : "AM";       //Google has some issues.
      var sHour = (parseInt(startTime[0],10) + new Date().getTimezoneOffset()/60 + (isPM == "PM" ? 12 : 0))%24
      var sMin = parseInt(startTime[1],10);
      var end = rowData[reverseLookup["End Time"]].split(" ");if(end[0]==''){return "";}
      var endTime = end[0].split(":");
      isPM = end[1].toUpperCase() == "PM" && parseInt(endTime[0],10) != 12 || end[1].toUpperCase() == "AM" && parseInt(endTime[0],10) == 12 ? "PM" : "AM";       //Google has some issues.
      var eHour = (parseInt(endTime[0],10) + new Date().getTimezoneOffset()/60 + (isPM == "PM" ? 12 : 0))%24
      var eMin = parseInt(endTime[1],10);
      var dateStr = year + month + day + "T" + sHour.toDigits(2) + sMin.toDigits(2) + "00Z/" + year + month + day + "T" + eHour.toDigits(2) + eMin.toDigits(2) + "00Z";
      return '<a title="Google calendar may have the wrong date, please be aware of day light savings time!" href="http://www.google.com/calendar/event?action=TEMPLATE&text='+title+'&dates='+dateStr+'&details='+details+'&location='+location+'&trp=false&sprop=&sprop=name:" target="_blank"><img src="http://www.google.com/calendar/images/ext/gc_button6.gif" alt="0" border="0"></a>';
   },
}

/**
 *    Table filters: used to apply the filters before building
 */
var TABLEFILTERS = {
   normal : function(cell){
      return cell;
   },
   deleteRow : function(cell, row, rowData, reverseLookup){
      var element = cell.substring(1, cell.indexOf(" ")).toUpperCase();
      if (element == "A") {
         var start = cell.indexOf(" onclick=\"");
         var onclick = cell.substring(start + 10, cell.indexOf(";\"", start));            //Extract the onclick
         onclick = onclick.substring(onclick.indexOf("('")+2, onclick.lastIndexOf("')")); //Extract the argument
         return "<div class='delete noselect' action=\""+onclick.replace(/\$delete\$\d+/, "$delete$%")+"\"></div>";  //Replace number with '%' for the job queue
      } else if (element == "IMG") {
         return "<span class='delete noselect disabled'></span>";
      } else {
         return cell;
      }
   },
   jobDescription : function(cell, row, rowData, reverseLookup){
      var isFound = reverseLookup.hasOwnProperty("Job Identifier");
      var columnNumber;
      if (!isFound) {
         isFound = reverseLookup.hasOwnProperty("Job ID");
         if (!isFound) {
            return cell;
         } else {
            columnNumber = reverseLookup["Job ID"];
         }
      } else {
         columnNumber = reverseLookup["Job Identifier"];
      }
      var id = rowData[columnNumber];
      if (id.empty()){return cell;}
      var link = LINKS.JOB_DESCR + id;
      var end = cell.lastIndexOf("<");
      var jobDescription = cell.substring(cell.lastIndexOf("\">", end) + 2, end);
      return "<a target='_blank' class='PSHYPERLINK' href='"+link+"'>"+jobDescription+"</a>";
   },
   googleSearch : function(cell, row, rowData, reverseLookup){ 
      return "<a href='http://www.google.ca/#sclient=psy-ab&q="+cell.replace(/\s/g,"+")+"' title='Google search that company!' target='_blank' class='PSHYPERLINK'>"+cell+"</a>";
   },
   googleMap : function(cell, row, rowData, reverseLookup){ 
      var search;
      if (reverseLookup.hasOwnProperty("Employer Name")) {
         search = rowData[reverseLookup["Employer Name"]] + ",+" + cell;
      } else if (reverseLookup.hasOwnProperty("Employer")) {
         search = rowData[reverseLookup["Employer"]] + ",+" + cell;
      } else {
         search = cell;
      }
      return "<a href='http://maps.google.ca/maps?q="+(search.replace(/\s/g,"+"))+"' title='Google maps that company!' target='_blank' class='PSHYPERLINK'>"+cell+"</a>";
   },
   //Interviews
   interviewerSearch : function(cell, row, rowData, reverseLookup){ 
      var search = cell;
      if(reverseLookup.hasOwnProperty("Employer Name")){
         //Remove the company's corporate status when searching so more accurate results
         search += "+"+rowData[reverseLookup["Employer Name"]].removeWords(["Inc", "Ltd", "llc", "corp"]);     
      }
      return "<a href='http://www.linkedin.com/search/fpsearch?type=people&keywords="+search.replace(/\s/g,"+")+"' title='Linkedin this person' target='_blank' class='PSHYPERLINK'>"+cell+"</a>";
   },
   jobInterviews : function(cell, row, rowData, reverseLookup){ 
      if (!cell.empty()) {
         OBJECTS.STORAGE.setItem("INTERVIEWS_ID_" + cell, "1");
      }
      return cell;
   },
   //Applications
   //Next two are bad solutions, temporary
   fixApply : function(cell, row, rowData, reverseLookup){ 
      //If link
      if(cell.contains("<a")) {
         //invokeApplyPopup
         var lookup, jobId, text, title;
         if (reverseLookup.hasOwnProperty('Job Identifier')) {
            lookup = reverseLookup['Job Identifier'];
         } else if (reverseLookup.hasOwnProperty('Job ID')) {
            lookup = reverseLookup['Job ID'];
         } else {
            return "Job ID does not exist";
         }
         jobId = rowData[lookup],
         text = cell.getTextBetween(">", "<");
         title = (cell.contains("Edit Application")?"Edit":"Submit") + " Application";
         return '<span class="fakeLink" onclick="invokeApplyPopup(\'' + jobId + '\', \'' + title + '\');">' + text + '</span>';
      }
      return cell;
   },
}; 

/**
 *    Class declaration: call makeTable instead
 */
function JbmnplsTable (defaultName, tableID, objectToAppendTo) {
   //Objects
   this.instance = null;
   this.jInstance = null;
   
   //ID strings
   this.srcID;
   this.tableNum;
   this.cname = defaultName != null ? defaultName.underscorize() : null;
   this.id = defaultName != null ? "jbmnpls" + this.cname : null;
   this.tableID = defaultName != null ? this.id + "Table" : null;
   this.name = defaultName;
   this.rowCounterID = defaultName != null ? "jbmnpls_"+this.cname+"_TableCount" : null;

   //Booleans
   this.parsed = false;
   this.hasCheckboxes = false;
   this.hasBuilt = false;
   this.appliedSorting = false;
   this.draggable = false;
   
   //Data
   this.headers = [];
   this.data = [];
   this.html = null;
   this.hiddenHeaders = [];
   
   //Controls
   this.controls = {};
   this.pageControls = null;
   this.maxPages = -1;
   this.excel = "";
   this.viewAll = "";
   this.jobLength = 0;
   
   //Object Queues
   this.filters = {};
   this.columnQueue = {};
   
   //Getter for rows and columns
   this.__defineGetter__("rows", function(){
      return this.data.length;
   });
   this.__defineSetter__("rows", function(){
      Throw(MESSAGE.TABLES_NO_SET_ROW);
   });
   this.__defineGetter__("columns", function(){
      if (this.rows == 0) {      //If no rows then get the header's length
         return this.headers.length;
      }
      return this.data[0].length;
   });
   this.__defineSetter__("columns", function(){
      Throw(MESSAGE.TABLES_NO_SET_COL);
   });
   
   //Try to build the table if the rest of the arguments are present
   if (tableID != null && tableID != "") {
      if( this.parseTable(tableID) && objectToAppendTo != null ) {
         this.appendTo(objectToAppendTo);
      }
   }
   
   /**
    *    Event Handling
    */
   var obj = this;
   
   /**
    *   Click handler - wrap it to reduce memory
    */
   this.onClick = function(evt) {
      obj.clickHandler(evt);
      return obj;
   } 
   
   /**
    *    Update our table by sorting and checkboxes
    *       Usually if rows are added or removed
    */
   this.updateTable = function() {
      obj.updateCheckboxes();
      obj.updateSorting();
      HIGHLIGHT.apply(this.jInstance);
      return obj;
   }
   
   /**
    *    Updating Sorting
    */
   this.updateSorting = function() {
      if(!obj.empty() && obj.hasBuilt) { 
         obj.jInstance.trigger("update");
      }
      return obj;
   }

   /**
    *    Updates the checkboxes' ids in order of the row
    */
   this.updateCheckboxes = function() {
      if(!obj.empty() && obj.hasBuilt && obj.hasCheckboxes) {
         var checkboxes = $("#"+obj.tableID+" input.checkbox");
         var name = obj.cname;
         checkboxes.each(function(rowNum){
            this.id = "checkbox_"+name+"_"+rowNum;
         });
      }
      return obj;
   }
}

/**
 *    Handle clicks
 */
JbmnplsTable.prototype.clickHandler = function(evt) {
   if(this.empty() || !this.hasBuilt || evt == null) {
      return;
   }
   var tr = $(evt.target).parents("tr");     //Go up from wherever the node that was clicked till you reach a tr element
   var objID = tr.attr("id");
   var checked = false;
   //Toggle checkboxes
   var tagNameClicked = evt.target.tagName.toUpperCase();
   var validClick = tagNameClicked == "TD" || tagNameClicked == "INPUT";   
   if (this.hasCheckboxes && validClick) {
      var checkbox = tr.find("input.checkbox");
      if(checkbox.exists()) {
         checked = checkbox.is(":checked");
         if (tagNameClicked == "INPUT") {checked = !checked;}   //Glitch on inputfields becuase it would be clicked twice
         checkbox.attr("checked", !checked);
         checkbox.prev().text(checked ? 0 : 1);
         tr.toggleClass("selected");
         this.updateSorting();
      }
   }
   //Checked/clicked same row
   if (OBJECTS.HIGHLIGHT != null && tr == OBJECTS.HIGHLIGHT){
      alert("clicked same row")
      return;
   }
   //Remove the last highlight row and select the current one
   var lastTr = OBJECTS.HIGHLIGHT;
   if (lastTr != null) {  
      //Mulitple checkboxes
      if (this.hasCheckboxes && evt.shiftKey) {
         //Remove the highlighting when holding shift
         window.getSelection().removeAllRanges();
         //Get the bounds of checkboxes needed to be checked or unchecked
         var lastRow = lastTr.index();
         var thisRow = tr.index();
         for(var i = Math.min(lastRow, thisRow); i <= Math.max(lastRow, thisRow);i++) {
            checkbox = $("#checkbox_"+this.cname+"_"+i).attr("checked", !checked);
            var row = checkbox.parent().parent();
            if(!checked) {
               row.addClass("selected");
               checkbox.prev().text(1);
            } else {
               row.removeClass("selected");
               checkbox.prev().text(0);
            }
         }
         this.updateSorting();
      }
      lastTr.removeClass("lastClickedRow");
   }
   tr.addClass("lastClickedRow");
   OBJECTS.HIGHLIGHT = tr;
   return this;
} 

/**
 *    Parse and get all the information from a table
 */
JbmnplsTable.prototype.parseTable = function(_srcID) {
   //Check to see if table is there
   if(this.srcID == null && _srcID.empty()) {
      return this;
   }
   var isUpdatingInfo = this.parsed;
   var tableID = isUpdatingInfo ? this.srcID : _srcID;
   if (!UTIL.idExists(tableID) || UTIL.getID(tableID).tagName.toUpperCase() != "TABLE") {
      return this;
   }
   
   var splitID = tableID.substring(0, tableID.indexOf("$"));
   var table = $(UTIL.getID(tableID));
   
   //Updating the table's information or first time parsing the table?
   if(!isUpdatingInfo) {
      this.srcID = tableID;
      
      //Parse Name if doesnt already exist
      if (this.name == null) {
         var name = table.find("table.PSLEVEL1GRIDLABEL.PSLEFTCORNER td:eq(0)").html();
         if (name == null) { return false; }
         this.name = name;
      }
      
       //Meta Data for the table
      this.cname = this.name.underscorize();
      this.id = "jbmnpls" + this.cname;
      this.tableID = this.id + "Table";
      this.rowCounterID = "jbmnpls_"+this.cname+"_TableCount";
   }
   
   // Common parsing
   try{  //If we can find it
      this.excel = UTIL.getID(splitID + "$hexcel$0").getAttribute("href");
   }catch(e){
      Log(e);
      this.excel = "#";
   }

   // Get headers
   var tableRows = table.find("table.PSLEVEL1GRID tr");
   var listOfHeaderObjs = tableRows.eq(0).find("th.PSLEVEL1GRIDCOLUMNHDR");
   var headers = [];
   var filters = {};
   listOfHeaderObjs.each(function(a){
      var originalHeader = header = $(this).plainText();
      var counter = -1;
      do {
         counter++;
         header = originalHeader + "_" + counter;
      } while(headers.indexOf(header) > 0);
      header = originalHeader + "_" + counter;
      filters[header] = TABLEFILTERS.normal;
      headers.push(header);
   });
   this.headers = headers;
   if (!isUpdatingInfo) {
      this.filters = filters;
   }
   
   //Get the body cells information
   this.data = [];
   for(var r = 1; r < tableRows.length; r++) {     //Each Row
      var columns = tableRows.eq(r).find("td");
      var bodyData = [];
      var includeRow = false;
      columns.each(function(c){                    //Each Column in row
         //Check to see if a link is visible
         var obj = $(this);
         var link = obj.find("a");
         
         //Get the value of the cell
         var value = "";
         if (link.exists()) {
            value = link.outerHTML();
         } else {
            var img = obj.find("img");
            if (img.exists()) {
               value = img.outerHTML();
            } else { 
               var select = obj.find("select");
               if (select.exists()) {
                  value = select.outerHTML();
               } else {
                  value = obj.plainText();
               }
            }
         }
         if (value != "") {      //If one column at least has info, we record the row
            includeRow = true;
         }
         bodyData.push(value);
      });
      if (includeRow) {
         this.data.push(bodyData);
      }
   }
   
   //Parse the page controls
   var rightPanel = table.find("table:eq(0) table.PSRIGHTCORNER td").children();
   var pageStrBuffer = "";
   if (rightPanel.length >= 5 && rightPanel.last().plainText() == "Last") {  //Has the first,last, and page number controls; 5 button page controls
      var last = rightPanel.last();
      var first = rightPanel.eq(-5);
      //Make sure we can go to different pages; one of them cannot be a span
      if (first.tag() != "SPAN" || last.tag() != "SPAN") {
         var href;
         var progress = rightPanel.eq(-3).plainText().split(" of ");
         var controls = {
                           "First"  : first, 
                           "&lt;--"   : rightPanel.eq(-4), 
                           "page"   : progress, 
                           "--&gt;"   : rightPanel.eq(-2), 
                           "Last"   : last,
                        };
         for(var name in controls) {
            var item = controls[name];
            if (name == "page") {  //Progress pages
               Assert(item[0].contains("-"), "Parsing page controls is broken");
               var endRangeNum = parseInt(item[0].split("-")[1]);
               var totalPages;
               var currentPage;
               this.jobLength = parseInt(item[1]);
               if (endRangeNum == item[1]) {    //Last page
                  currentPage = totalPages = this.maxPages;
               } else {
                  var difference = this.rows;
                  var totalPages = this.maxPages = Math.ceil(parseInt(item[1]) / difference);
                  var currentPage = Math.ceil(endRangeNum / difference);
               }
               pageStrBuffer += " <span title='Current page/total pages'>" + currentPage + "/" + totalPages + "</span>";
            } else if (item.tag() == "A") {
               href = item.attr("href");
               href = href.substr(href.indexOf("submitA"));
               pageStrBuffer += ' <span class="fakeLink'+(name.contains("--")?' bold':'')+'" onclick="document.getElementById(\''+this.id+'\').className=\'jbmnplsTable loading\';'+href+'"">'+name+'</span>';
            } else {
               pageStrBuffer += " <span class='disabled fakeLink'>" + name + "</span>";
            }
         }
         this.pageControls = pageStrBuffer;
      } else {
         this.pageControls = null;
      }
      //View All/25
      var viewAll = rightPanel.eq(-8);
      var text = viewAll.plainText();
      if (viewAll.tag() == "A" && (text == "View All" || text == "View 100" || text == "View 25")) {
         var link = viewAll.attr("href");
         this.viewAll = '<span class="fakeLink" onclick="document.getElementById(\''+this.id+'\').className=\'jbmnplsTable loading\';'+link.substr(link.indexOf(":")+1)+'">'+text+' jobs/page</span>';
      }
   }/* else {}    Only displays page numbers, so useless*/
   
   //Cleanup
   columns = null
   table = null;
   listOfHeaderObjs = null;
   headers = null;
   bodyData = null;
   this.parsed = true;
   return this;
};

/**
 *    Insert custom data into a table
 */
JbmnplsTable.prototype.insertData = function(headerList, dataList) {
   Assert(headerList != null && UTIL.isArray(headerList) && dataList != null && UTIL.isArray(dataList), "Inserting data failed, use arrays for headers and data!");
   var newColumnLength = headerList.length;
   if( newColumnLength > 0 ){
      var filters = [];
      for(var c=0; c<newColumnLength; c++) {
         filters[headerList[c]] = TABLEFILTERS.normal;
      }
      var data = [];
      for(var r=0; r<dataList.length;r++) {
         var item = dataList[r];
         Assert(UTIL.isArray(item) && item.length == newColumnLength, "Inserting data failed, failed to input the correct columns per data entry.");
         data.push(item);
      }
      this.parsed = true;
      this.data = data;
      this.filters = filters;
      this.headers = headerList;
   }
   return this;
}

/**
 *    Tells functions if we can manipulate the table
 *       1. Make sure table is parsed  2. Make sure there is columns
 */
JbmnplsTable.prototype.empty = function() {
   return !this.parsed || this.columns == 0;
};

/**
 *    Change a header's name
 */
JbmnplsTable.prototype.setHeaderAt = function(index, newName) {
   if (this.empty() || newName == null || newName == "" || !UTIL.isNumeric(index)) {
      return false;
   }
   Assert(UTIL.inRange(index, this.columns-1), MESSAGE.ARRAY_OUT_OF_BOUNDS);
   //Hold old info and apply the new ones to the header and the filter
   var oldHeader = this.headers[index];
   var originalHeader = newName;
   var counter = -1;
   do {
      counter++;
      newName = originalHeader + "_" + counter;
   } while(this.headers.indexOf(newName) > 0);
   newName = originalHeader + "_" + counter;
   
   //No need to update header
   if (oldHeader == newName) {
      return this;
   }
   var oldFilter = this.filters[oldHeader];
   this.headers[index] = newName;
   delete this.filters[oldHeader];
   this.filters[newName] = oldFilter;
   return this;
}

/**
 *    Inserts a column
 *       Option 1: headerName = [String:header text]; index_OR_filterFunction = DATA or index to insert column; dataArray_OR_filterFunction = DATA
 *       Option 2: headerName = [String:header text]; index_OR_filterFunction = DATA     
 *       - DATA = [Array:list of values in that column|Function:a function that returns a value, passes the rowArray then the rowNumber as the arguments]
 *       - Option 2 appends the column to the end
 */
JbmnplsTable.prototype.insertColumn = function(headerName, index_OR_filterFunction, dataArray_OR_filterFunction) {
   //Last one is if we have the header name already
   if (this.empty() || index_OR_filterFunction == null || headerName == null || headerName == "" || this.filters.hasOwnProperty(headerName)) {   
      return false;
   }
  
   //Parse the inputs
   var index, data;
   //If inputted an array or function, then append the data
   if (UTIL.isNumeric(index_OR_filterFunction)) {
      Assert(UTIL.inRange(index_OR_filterFunction, this.columns-1), MESSAGE.ARRAY_OUT_OF_BOUNDS);
      index = index_OR_filterFunction;
      data = dataArray_OR_filterFunction;
   } else {
      index = this.columns;
      data = index_OR_filterFunction;
   }
   if (data == null) {
      return false;
   }
   //Add the column now
   var originalHeader = headerName;
   var counter = -1;
   do {
      counter++;
      headerName = originalHeader + "_" + counter;
   } while(this.headers.indexOf(headerName) > 0);
   headerName = originalHeader + "_" + counter;
   this.columnQueue[headerName] = {type: "insert", index: index, filter: data};
   this.internalInsertColumn(headerName, index, data);
   data = null;
   return this;
};

/** 
 *    Insert Column, really should run within the class and not an external call
 *    INTERNAL
 */
JbmnplsTable.prototype.internalInsertColumn = function(headerName, index, data) {
   var dataIsArray;
   if (UTIL.isArray(data) && data.length > 0) {
      dataIsArray = true;
   } else if(UTIL.isFunction(data)) {
      dataIsArray = false;
   } else {
      return false;
   }
   var reverseLookup = {};
   for(var i=0; i<this.columns; i++) {
      var visibleHeader = this.headers[i].substring(0, this.headers[i].lastIndexOf("_"));
      reverseLookup[visibleHeader] = i;
   }
   this.headers.splice(index, 0, headerName);
   this.filters[headerName] = TABLEFILTERS.normal;
   for(var r = 0; r < this.rows; r++) {
      var cellData = "";
      if (dataIsArray) {
         if (r < data.length) {
            cellData = data[r];
         }
      } else {
         cellData = data.call(this, r, this.data[r], reverseLookup);
      }
      this.data[r].splice(index, 0, cellData);
   }
   return this;
}

/**
 *    Merge two columns together
 *       intoIndex = [header stays!] any index that the new info goes to (does not have to be smaller than fromIndex)
 *       fromIndex = [header is deleted!] any index that the information is retrieved
 *       headerName (optional) = name of the new merged column; if null, then takes original name
 *       filterFunction (optional) = a function that reads in (intoCell, fromCell, rowNumber) and you return the value placed in the merged cell
 */
JbmnplsTable.prototype.merge = function(intoIndex, fromIndex, headerName, filterFunction) {
   if (this.empty() || intoIndex == null || fromIndex == null) {
      return false;
   }
   var columns = this.columns;
   Assert(UTIL.inRange(intoIndex, columns-1) && UTIL.inRange(intoIndex, columns-1), MESSAGE.ARRAY_OUT_OF_BOUNDS);
   this.columnQueue[this.headers[intoIndex]] = { type: "merge", into: intoIndex, from: fromIndex, name: headerName, filter: filterFunction};
   this.internalMerge(intoIndex, fromIndex, headerName, filterFunction);
   return this;
}
/**
 *    Merge two columns together, only call within the class
 *    INTERNAL
 */
JbmnplsTable.prototype.internalMerge = function(intoIndex, fromIndex, headerName, filterFunction) {
   if (filterFunction == null || !UTIL.isFunction(filterFunction)) {
      filterFunction = function(a, b){
         return a + " | " + b;
      }
   }
   //Delete the filters
   delete this.filters[this.headers[fromIndex]];
   //Set new header
   if (headerName != null && headerName.length > 0){
      this.headers[intoIndex] = headerName;
      delete this.filters[this.headers[intoIndex]];
      this.filters[headerName] = TABLEFILTERS.normal;
   };
   this.headers.splice(fromIndex, 1);
   for(var r = 0; r < this.rows; r++) {
      //Merge 2 cells per row
      var rowData = this.data[r];
      var a = rowData[intoIndex];
      var b = rowData[fromIndex];
      var value = filterFunction.call(this, a, b, r);
      value = value == " | " ? "" : value;
      this.data[r][intoIndex] = value;
      
      //Remove the old column
      this.data[r].splice(fromIndex, 1);
   }
   rowData = null;
   filterFunction = null;
   return this;
}

/**
 *    Deletes a column
 */
JbmnplsTable.prototype.deleteColumn = function(index) {
   if (this.empty() || index == null) {
      return false;
   }
   Assert(index >= 0 && index < this.columns, MESSAGE.ARRAY_OUT_OF_BOUNDS);
   var headerName = this.headers[index];
   delete this.columnQueue[headerName];
   delete this.filters[headerName];
   this.headers.splice(index, 1);
   for(var r = 0; r < this.rows; r++) {
      this.data[r].splice(index, 1);
   }
   return this;
};

/**
 *    Hides an array of columns
 */
JbmnplsTable.prototype.hideColumns = function(list) {
   if (this.empty() || !this.hasBuilt || list == null || !UTIL.isArray(list)) {
      return this;
   }   
   for(var i=0; i<list.length; i++) {
      this.jInstance.addClass("hideColumn"+list[i]);
      this.hiddenHeaders[list[i]] = true;
   }
   return this;
}

/**
 *    Shows all columns
 */
JbmnplsTable.prototype.showAllColumns = function() {
   if (this.empty() || !this.hasBuilt) {
      return this;
   }
   this.instance.className = "tablesorter";
   this.hiddenHeaders = [];
   return this;
}

/**
 *    Shows an array of columns
 */
JbmnplsTable.prototype.showColumns = function(list) {
   if (this.empty() || !this.hasBuilt || list == null || !UTIL.isArray(list)) {
      return this;
   }
   for(var i=0; i<list.length; i++) {
      this.jInstance.removeClass("hideColumn"+list[i]);
      this.hiddenHeaders[list[i]] = false;
   }
   return this;
}

/**
 *    Sees if a header is shown and not hiding
 */
JbmnplsTable.prototype.isColumnShown = function(index) {
   if (this.empty() || !this.hasBuilt) {
      return this;
   }
   Assert(index >= 0 && index < this.columns, MESSAGE.ARRAY_OUT_OF_BOUNDS);
   return this.hiddenHeaders[index] == null || this.hiddenHeaders[index] === false;
}

/**
 *    Sees if a header is shown and not hiding
 */
JbmnplsTable.prototype.getColumnsHidden = function() {
   if (this.empty() || !this.hasBuilt) {
      return this;
   } 
   var val = [];
   for(var i=0; i<this.columns; i++) {
      if(!this.isColumnShown(i)) {
         val.push(i);
      }
   }
   return val;
}

/**
 *    Deletes a range of columns
 *       Option 1: table.deleteColumnRange([0,1,3,5]);   <--- deletes these columns
 *       Option 2: table.deleteColumnRange(0, 4);        <--- deletes columns from 0->4
 */
JbmnplsTable.prototype.deleteColumnRange = function(startIndex_deleteArr, endIndex) {
   if (this.empty() || startIndex_deleteArr == null || endIndex == null) {
      return false;
   }
   if (UTIL.isArray(startIndex_deleteArr)) { //If one input: array of indexes
      var toDelete = startIndex_deleteArr.sort();
      for (var i = toDelete.length -1; i >= 0; i++) { 
         var index = toDelete[i];
         this.deleteColumn(index);
      }
   } else {    //If two inputs: start and end
      var startIndex = startIndex_deleteArr;
      Assert(startIndex <= endIndex, MESSAGE.INDEX_RANGE_INCORRECT);
      Assert(startIndex >= 0 && endIndex < this.columns, MESSAGE.ARRAY_OUT_OF_BOUNDS);
      var amountToDelete = endIndex - startIndex + 1;
      
      //Delete filters
      for(var i = startIndex; i < amountToDelete; i++) {
         delete this.filters[this.headers[i]];
      }
      
      //Delete rows
      this.headers.splice(startIndex, amountToDelete);
      for(var r = 0; r < this.rows; r++) {
         this.data[r].splice(startIndex, amountToDelete);
      }
   }
   return this;
};

/**
 *    Deletes a column, it will update on default
 */
JbmnplsTable.prototype.deleteRow = function(index, dontUpdate) {
   if (this.empty() || index == null) {
      return false;
   }
   Assert(index >= 0 && index < this.rows, MESSAGE.ARRAY_OUT_OF_BOUNDS);
   if(dontUpdate == null) {dontUpdate = false;}
   //Remove from html
   if (this.hasBuilt) {  
      var TRs = this.jInstance.find("tbody tr");
      var name = this.cname;
      $("#"+this.rowCounterID).text(TRs.length-1);    //Update the amount of rows in table
      //Renumber rows
      TRs.each(function(){
         var obj = $(this);
         var row = parseInt(obj.attr("row"));
         if(row > index) {             //Update the row number
            obj.attr("row", row-1);
            obj.attr("id", "row_"+name+"_"+(row-1))
         } else if(row == index) {     //Remove the row
            if (obj.hasClass("lastClickedRow")) {
               OBJECTS.HIGHLIGHT = null;
            }
            obj.remove();
         }
      });
      if (!dontUpdate) {
         this.updateTable();
      }
   }
   this.data.splice(index, 1);
   return this;
};

/**
 *    Deletes a range of row, feed in an array
 *       table.deleteRowRange([0,1,3,5]);   <--- deletes these rows
 */
JbmnplsTable.prototype.deleteRowRange = function(deleteList) {
   if (this.empty() || deleteList == null || !UTIL.isArray(deleteList) || deleteList.empty()) {
      return this;
   }
   //Sort with the largest first
   deleteList.sort(function(a,b){return b-a;});     
  
   //Make a lookup table and remove data from array
   var orderedList = [];
   var totalRows = this.rows;
   for(var i=0; i < deleteList.length ; i++) {
      var index = parseInt(deleteList[i]);
      orderedList[deleteList.length-i-1] = index;
      this.data.splice(index, 1);
   }
   //Delete rows from the table
   if(this.hasBuilt) {
      //Get the lowest and highest value
      var low = deleteList[deleteList.length-1];
      //Cycle through the row id's
      var offset = 0;
      for(var r=0; r < totalRows; r++) {
         var rowObj = $("#row_"+this.cname+"_"+r);
         var row = parseInt(rowObj.attr("row"));
         
         //Delete this row
         if (row == orderedList[offset]) {
            if (rowObj.hasClass("lastClickedRow")) {
               OBJECTS.HIGHLIGHT = null;
            }
            rowObj.remove();
            offset++;
         } else if(row > low) {
            //Reduce the row id and number
            var newNumber = row - offset;
            rowObj.attr("row", newNumber);
            rowObj.attr("id", "row_"+this.cname+"_"+newNumber);
         }
      }
      $("#"+this.rowCounterID).text(this.rows);
      this.updateTable();
   }
   return this;
};

/**
 *   Deletes all columns that have empty body cells even if there is a header
 */
JbmnplsTable.prototype.trim = function() {
   if (this.empty()) {
      return false;
   }
   for (var c = this.columns-1; c >= 0; c--) {
      var cellIsEmpty = true;
      for(var r = 0; r < this.rows && cellIsEmpty; r++) {
         cellIsEmpty = this.data[r][c].empty();
      }
      //The entire column is empty
      if (cellIsEmpty) {
         this.deleteColumn(c);
      }
   }
   return this;
};

/**
 *    Apply a filter so it filters columns when it builds
 */
JbmnplsTable.prototype.applyFilter = function(columnInput, filterFunction, index) {
   if (this.empty() || columnInput == null || !UTIL.isFunction(filterFunction)) {
      return false;
   }
   if(UTIL.isNumeric(columnInput)) {
      //We inputted a Number
      Assert(UTIL.inRange(columnInput, this.columns-1), MESSAGE.ARRAY_OUT_OF_BOUNDS);
      var header = this.headers[columnInput];
      this.filters[header] = filterFunction;
      return this;
   }
   columnInput += "_" + (index?index:"0");
   if (this.filters.hasOwnProperty(columnInput)) {
      //We inputted a header
      this.filters[columnInput] = filterFunction;
   }
   return this;
}

/**
 *    Removes a filter for a column
 */
JbmnplsTable.prototype.removeFilter = function(columnInput, index) {
   if (this.empty() || columnInput == null) {
      return false;
   }
   if(UTIL.isNumeric(columnInput)) {
      //We inputted a Number
      Assert(UTIL.inRange(columnInput, this.columns-1), MESSAGE.ARRAY_OUT_OF_BOUNDS);
      var header = this.headers[columnInput];
      this.filters[header] = TABLEFILTERS.normal;
      return this;
   }
   columnInput += "_" + (index?index:"0");
   if (this.filters.hasOwnProperty(columnInput)) {
      //We inputted a header
      this.filters[columnInput] = TABLEFILTERS.normal;
   } 
   return this;
}

/**
 *    Add checkboxes to a column and enables them to be handled by this class
 */
JbmnplsTable.prototype.addCheckboxes = function(columnNumber) {
   if(!this.empty() && !this.filters.hasOwnProperty("{CHECKBOXES}")) {      //Prevent mulitple checkboxes columns
      if(columnNumber == null) {columnNumber = 0;}
      this.hasCheckboxes = true;
      this.insertColumn("{CHECKBOXES}", columnNumber, function(row, rowData){
         return "<span class='hide'>0</span><input id='checkbox_"+this.cname+"_"+row+"' type='checkbox' class='checkbox'/>";
     });
  }
  return this;
}

/**
 *    Add a custom button (link or an onclick event) in the controls section to do stuff
 */
JbmnplsTable.prototype.addControlButton = function(name, onclick_OR_location) {
   if(this.empty() || name == null || name == "") {
      return this;
   }
   if(UTIL.isFunction(onclick_OR_location)) {      //If function, if not it is a link
      BRIDGE.registerFunction("controlButton_"+name.replace(/\W/gm,"_"), onclick_OR_location);
   }
   this.controls[name] = onclick_OR_location;
   return this;
}

/**
 *    Remove the custom button in the controls section
 */
JbmnplsTable.prototype.removeControlButton = function(name) {
   if(this.empty() || name == null || name == "" || !this.controls.hasOwnProperty(name)) {
      return this;
   }
   var value = this.controls[name];
   if(UTIL.isFunction(value)) {     //If function, if not it is a link
      BRIDGE.unregisterFunction("controlButton_"+name);
   }
   delete this.controls[name];
   return this;
}

/**
 *    Builds the table into html and returns it
 */
JbmnplsTable.prototype.buildControls = function() {
   var returnStr = '';
   if (PAGEINFO.TYPE != PAGES.HOME) {
      returnStr +=  '<span onclick="handleCustomize('+(this.tableNum)+')" class="options fakeLink">Customize</span>';
   }
   if (!this.excel.empty()) {
      returnStr +=  ' | <a class="options" onclick="showMessage(\'Please wait, retrieving download...\');" href="'+this.excel+'">Export</a>';
   }
   for(var name in this.controls) {
      //Function
      var value = this.controls[name];
      if(UTIL.isFunction(value)) {     
         returnStr += " | <span class='options fakeLink' onclick='controlButton_"+name.replace(/\W/gm,"_")+"();'>"+name+"</span>";
      } else {
      //A link
         returnStr += " | <a class='options' target='_blank' href='"+value+"'>"+name+"</a>";
      }
   }
   if(!this.viewAll.empty()) {
      returnStr += " | " + this.viewAll;
   }
   if (this.pageControls != null) {
     returnStr += " |" + this.pageControls;
   }
   //Removes the "| " because "customize" doesnt apply to any homepage tables
   if (PAGEINFO.TYPE == PAGES.HOME) {returnStr = returnStr.substr(2);}
   return returnStr;
}

/**
 *    Builds the table into html and returns it
 */
JbmnplsTable.prototype.build = function() {
   if (this.empty()) {
      return null;
   }
   this.tableNum = $("div.jbmnplsTable").length;
   
   var html =  "<div id='"+this.id+"' class='jbmnplsTable'><div class='jbmnplsTableHeader noselect'><div class='jbmnplsTableName'>" + this.name + (this.rows==0?"":" (<span id='"+this.rowCounterID+"'>"+this.rows+"</span> Rows)");
   html +=     '</div><div class="jbmnplsTableControls">';
   
   //Build the controls
   var controlsHTML = this.buildControls();
   html += controlsHTML;
   html +=     "</div></div><div class='jbmnplsTableBody'><div class='jbmnplsTableLoadOverlay'></div><table name='"+this.name+"' class='tablesorter' id='"+this.tableID+"' cellspacing=0 cellpadding=0 width='100%' height='auto'>";
   //Parse Header
   html +=     "<thead><tr row='header' class='noselect'>";
   var inverseHeaderLookup = {};
   for (var h = 0; h < this.columns; h++) {
      if (h < this.headers.length) {
         var header = this.headers[h];
         var end = header.lastIndexOf("_");
         header = header.substring(0, end);
         inverseHeaderLookup[header] = h;
         if (header.charAt(0) == "{" && header.charAt(header.length-1) == "}") {
            header = "";
         }
         html +=  "<th col='" + h + "'>" + header + "</th>";
      } else {
         html +=  "<th></th>";
      }
   }
   html +=     "</tr></thead><tbody>";
   
   //Each row
   for(var r = 0; r < this.data.length; r++) {
      html += "<tr id='row_"+this.cname+"_"+r+"' row='" + r + "'>";
      var rowData = this.data[r];
      for (var c = 0; c < this.columns; c++) {
         var header = this.headers[c];
         var cellData = this.filters[header].call(this, rowData[c], r, rowData, inverseHeaderLookup);
         html += "<td col='" + c + "'>" + cellData + "</td>";
      }
      html += "</tr>";
   }
   html +=     "</tbody></table></div><div class='jbmnplsTableFooter noselect'><div class='jbmnplsTableControls'>" + controlsHTML;
   //Parse the controls for the bottom
   html +=     "</div></div>";
   this.html = html;
   this.hasBuilt = true;
   html = null;
   return this.html;
};

/**
 *    Builds the table into html and returns it
 */
JbmnplsTable.prototype.updateCells = function() {
   if(this.empty() || !this.hasBuilt || this.jInstance == null) {
      return false;
   }
   //Add all the extra columns from columnQueue
   for (var headerName in this.columnQueue) {
      var action = this.columnQueue[headerName];
      var filter = action.filter;
      switch(action.type) {
         case "insert":
            this.internalInsertColumn(headerName, action.index, filter);
            break;
         case "merge":
            this.internalMerge(action.into, action.from, action.name, filter);
            break;
         default:
            Throw("No such action to insert columns: " + action.type);
            break;
      }
   }
   //Some variables
   var table = this.jInstance;
   var originalHeaders = table.find("th");
   var originalRows = table.find("tbody tr");
   var columns = this.columns;
   var rows = this.rows;
   var inverseHeaderLookup = {};
   //Columns: Insert/Remove new columns and write their new headers
   for(var i=0; i<Math.max(columns, originalHeaders.length); i++) {
      if(i >= originalHeaders.length) {   //Start Adding
         var headerName = this.headers[i];
         headerName = headerName.charAt(0) == "{" && headerName.charAt(headerName.length-1) == "}" ? "" : headerName;
         var displayHeader = headerName.substring(0, headerName.lastIndexOf('_'));
         originalHeaders.parent().append("<th col='"+i+"'>"+displayHeader+"</th>");
      } else if(i >= columns) {           //Start removing
            originalHeaders.eq(i).remove();   
      } else {                            //Write the new header
         var headerName = this.headers[i];
         headerName = headerName.charAt(0) == "{" && headerName.charAt(headerName.length-1) == "}" ? "" : headerName;
         var displayHeader = headerName.substring(0, headerName.lastIndexOf('_'));
         inverseHeaderLookup[displayHeader] = i;
         originalHeaders.eq(i).attr("col", i).text(displayHeader);
      }
   }
   //Rows: Insert/Remove new rows and write their cell data
   for(var i=0; i<Math.max(rows, originalRows.length); i++) {
      if(i >= rows) {           //Start removing
         originalRows.eq(i).remove();
      } else {
         if(i >= originalRows.length) {   //Start Adding a new row
            var tbody = originalRows.exists() ? originalRows.parent() : table.find("tbody");
            tbody.append("<tr id='row_"+this.cname+"_"+i+"' row='"+i+"'></tr>");
         } else {
            originalRows.eq(i).attr("id", "row_"+this.cname+"_"+i).attr("row", i).children().remove();
         }
         var row = $("#row_"+this.cname+"_"+i);
         for(var j=0; j<columns; j++) {
            var headerName = this.headers[j];
            var rowData = this.data[i];
            var cellData = this.filters[headerName].call(this, rowData[j], i, rowData, inverseHeaderLookup);
            row.append("<td col='"+j+"'>"+cellData+"</td>");
         }
      }
   }
   
   //Update controls
   $("#"+this.id).find("div.jbmnplsTableControls").html(this.buildControls());
   
   //Finally Update the table
   $("#"+this.rowCounterID).text(this.rows);
   this.applyTableSorter();
   this.updateTable();
   this.jInstance.find("th").attr("class", "header");
   return this;
}

/**
 *    Appends the table to an element and makes it table-sortable, returns the jquery object of the table
 */
JbmnplsTable.prototype.appendTo = function(obj) {
   if (this.empty() || obj == null || this.jInstance != null) {
      return null;
   }
   if(!UTIL.isjQuery(obj)) {
      obj = $(obj);
   }
   //Build if not yet have
   if (!this.hasBuilt) {
      this.build();
   }
   obj.append(this.html);
   this.instance = UTIL.getID(this.tableID);
   this.jInstance = $("#" + this.tableID);
   if (this.rows > 1) {
      this.applyTableSorter();
      HIGHLIGHT.apply(this.jInstance);
   }
   
   //Load and turn off some headers
   var index = this.tableNum;
   var hiddenHeadersList = PREF.load("HIDDEN_HEADERS", index);
   if(UTIL.isNumeric(hiddenHeadersList)) {     //1 hidden column
      this.hideColumns([hiddenHeadersList]);
   } else if(!UTIL.isArray(hiddenHeadersList)) {
      this.hideColumns(hiddenHeadersList.split(","));
   }
   return this;
}

/**
 *    Appends the table to an element and makes it table-sortable, returns the jquery object of the table
 */
JbmnplsTable.prototype.applyTableSorter = function() {
   if (this.appliedSorting || this.empty() || this.jInstance == null || !this.hasBuilt) {
      return;
   }
   switch(PAGEINFO.TYPE) {
	  case PAGES.SEARCH:
         this.jInstance.tablesorter({
		 headers : {
               8:{sorter : "plainText"},
               11:{sorter : "date"}
            }
         });
		 break;
      case PAGES.LIST: 
         this.jInstance.tablesorter({
            headers : {
               6:{sorter : "plainText"},
               7:{sorter : "date"}
            }
         });
         break;
      case PAGES.APPLICATIONS:
         this.jInstance.tablesorter({
            headers : {
               5:{sorter : "plainText"},
               6:{sorter : "plainText"},
               8:{sorter : "date"}
            }
         });
         break;
      default:
         this.jInstance.tablesorter();
         break;
   }
   //Append events
   this.jInstance.unbind("sortEnd").bind("sortEnd", this.updateCheckboxes);
   this.jInstance.find("tbody tr").die("click").live("click", this.onClick);
   this.appliedSorting = true;
   return this;
}

/**
 *    Updates the entire table, must be built first!
 */
JbmnplsTable.prototype.update = function() {
   this.parseTable();
   this.updateCells();
   return this;
}

/**
 *    Make the table draggable!
 */
JbmnplsTable.prototype.makeDraggrable = function(shouldAllow) {
   if(this.empty() || this.jInstance == null || !this.hasBuilt) { 
      return this;
   }
   if (shouldAllow == null) {shouldAllow = true;}
   var wrapper = $("#"+this.id);
   var header = wrapper.find("div.jbmnplsTableHeader:eq(0)");
   if (shouldAllow) {
      wrapper.addClass("draggable");
      header.addClass("draggable-region")
   } else {
      wrapper.removeClass("draggable");
      header.removeClass("draggable-region")
   }
   this.draggable = shouldAllow;
   return this;
}

/**
 *    Shows/removes the loading screen
 */
JbmnplsTable.prototype.setLoading = function(shouldShow) {
   if(shouldShow==null){shouldShow=true;}
   if (shouldShow) {
      $("#"+this.id).addClass("loading");
   } else {
      $("#"+this.id).removeClass("loading");
   }
   return this;
}

}

/*================================*\
|*         __CLEAN_UP__           *|
\*================================*/
{/*===== Expand to see the cleanup code =====*/
//Append the version on the webpage
$("body").addClass("v_"+CONSTANTS.VERSION.replace(/\./g,"_"));

//Removes the timer
if(PREF.load("SETTINGS_GENERAL_KILL_TIMER", null, false)) {
   removeTimer();
}

//DESTROY IFRAMES
if(PAGEINFO.TYPE != PAGES.SKILLS) {
   $("iframe").remove();
}

//Disallow highlighting last row if requested
if (!PREF.load("HIGHLIGHT_LAST_ROW")) {
   $("body").addClass("doNotHighlightLastRow");
}

//Elimate their highlight methods
BRIDGE.addFunction("HighLightTR");

//Destory keypressings and use it for my purposes
BRIDGE.addJS(function(){window.doKeyPress_win0 = function(){}});
}

/*================================*\
|*            __CSS__             *|
\*================================*/
var CSSOBJ = {
   /**
    *    Draggable
    */
   ".draggable.draggable-down:not(.disabled), .draggable.draggable-move:not(.disabled)" : {
      "box-shadow"   :  "0 0 10px white !important",
      "-moz-box-shadow"   :  "0 0 10px white !important",
   },
   ".draggable-region" : {
      cursor         :  "move !important",
   },
   ".disabled .draggable-region,.disabled.draggable-region" : {   
      cursor         :  "default !important",
   },
   /**
    *    Fix their css
    */
   "#popupMask" : {
      width    :  "100% !important",
   },
   "#WAIT_win0, #SAVED_win0" : {
      display  :  "none !important",
      visibility  :  "hidden !important",
   },
    /**
    *    No extra spaces
    */
   'body,html,.PSPAGE' : {
      padding  : '0',
      margin   : '0',
      height   : "100%",
      "position"  :  "relative",
   },
   /**
    *    Random Styles
    */
   "*" : {
      "opacity"   : '1',
   },
   ".bold" : {
      "font-weight" : "bold",
   },
   "div.pageTitle" : {
      "font-family"     : "Verdana, Arial",
      "font-size"       : "30px",
      "letter-spacing"  : "15px",
      "color"           : "#555555",
      "margin-bottom"   : "40px",
   },
   "body.iframe"  : {
      "padding"   : "30px 50px 20px",
      "-moz-box-sizing" : "border-box",
      "-webkit-box-sizing" : "border-box",
      "box-sizing" : "border-box",
      "overflow-y"  :  "scroll",
   },
   "a.PSHYPERLINK" : {
      "outline" : "none",
   },
   ".hide" : {
      display    : "none !important",
      visibility : "hidden !important",
   },
   "span.fakeLink, span.fakeLink:active" : {
      cursor : "pointer",
   },
   "a.disabled, span.fakeLink.disabled" : {
      cursor : "default",
   },
   ".fade" : {
      "-moz-transition-property" : "opacity",
      "-moz-transition-duration" : "0.5s",
      "-webkit-transition-property" : "opacity",
      "-webkit-transition-duration" : "0.5s",
      "transition-property" : "opacity",
      "transition-duration" : "0.5s",
   },
   /**
    *    Cannot select any text with this
    */
   ".noselect" : {
      "-moz-user-select"   : "none",
      "-webkit-user-select" : "none",
      "-o-user-select" :"none",
      "user-select" :"none",
      "cursor" : "default",
   },
   /**
    *    HTML5 elements in FF 3.6
    */
   "article, aside, details, figcaption, figure, footer, header, div, menu, nav, section" : {
      "display" : "block",
   },
   /**
    *    Login page
    */
   "#jbmnplsHolder" : {
      "margin-left"  :  "36%",
   },
   "#jbmnplsHolder label" : {
      display        :  "block",
      "margin-left"  :  "30px",
   },
   "#jbmnplsHolder label span.important" : {
      "color"  :  "red",
   },
   "#jbmnplsHolder input.checkbox" : {
      "float"        :  "left",
   },
   /**
    *    Home elements and the Jobmine Plus header
    */
   "body.HOME" : {
      "-moz-box-sizing" : "border-box",
      "-webkit-box-sizing" : "border-box",
      "-o-box-sizing" : "border-box",
      "box-sizing" : "border-box",
      "padding-top" : "60px",
      "padding-right"  : '0 !important',
      "margin-right"   : '0 !important',
      overflow : "hidden",
   },
   "#jbmnplsHeader": {
      "min-width": "1120px",
      width    : "100%",
      position : "fixed",
      top   : 0,
   },
   "#jbmnplsHeader *": {
      "font-family": "Verdana, Arial",
      "font-size": "12px",
      "outline": "none",
      "color": "#333333",
      "text-decoration": "none",
      "-webkit-user-select": "none",
      "-moz-user-select": "none",
      "-o-user-select": "none",
   },
   "#jbmnplsTopGroup": {
      "height": "31px",
      "padding": "0px 20px",
      "padding-top": "9px",
      "background": "black",
      "overflow": "hidden",
   },
   "#jbmnplsBanner": {
      "background": "url('" + IMAGES.MAINBANNER + "')",
      "margin-right": "10px",
      "width": "112px",
      "height": "24px",
      "float": "left",
   },
   "#uwBanner": {
      "width": "104px",
      "height": "22px",
      "float": "right",
      "background": "url('" + IMAGES.UWBANNER + "')",
   },
   "#jbmnplsHeader div.banner": {
      "background-repeat": "no-repeat",
   },
   "#jbmnplsNav": {
      "float": "left",
      "padding-top": "2px",
   },
   "nav ul": {
      "padding": "0",
      "margin": "0",
   },
   "nav ul li": {
      "list-style-type": "none",
      "float": "left",
   },
   "#jbmnplsHeader ul li": {
      "margin-left": "20px",
   },
   "#jbmnplsNav ul li a, #jbmnplsNav ul li .fakeLink": {
      "color": "white",
      "font-size": "14px",
      "display": "block",
      "height": "29px",
   },
   "#jbmnplsNav ul li a.selected" : {
      background : "50% 100% no-repeat url('"+IMAGES.HEADER_POINTER+"')",
   },
   "#jbmnplsNav ul li a:hover, #jbmnplsNav ul li .fakeLink:hover": {
      "text-shadow": "0 0 0 transparent, #ffffbe 0 0 0.5em, #ffffbe 0 0 0.5em",
   },
   "#jbmnplsBottomGroup": {
      "padding": "0px 20px",
      "background": "#e7e7e7",
      "width": "auto",
      "height": "18px",
      "border-bottom": "2px solid #d5d5d5",
   },
   "#jbmnplsStatus": {
      "padding-top": "1px",
      "float": "left",
      "cursor" : 'default',
   },
   "#jbmnplsStatus ul" : {
      'margin'    :  '0',
      'padding'   :  '0',
   },
   "#jbmnplsStatus li.status-item" : {
      'margin'          :  '0',
      "list-style-type" : "none",
      "float"           : "left",
   },
   "#jbmnplsStatus li.status-item:not(:first-child)" : {
      "padding-left"     : "21px",
      "background"      : "no-repeat 10px -2px url('"+IMAGES.STATUS_DIVIDER+"')",
   },
   "#jbmnplsUserID": {
      "font-weight": "normal",
   },
   "#jbmplsControlPanel": {
      "float": "right",
   },
   "#jbmplsControlPanel a, #jbmplsControlPanel span.fakeLink": {
      "font-size": "11px",
   },
   "#jbmplsControlPanel a:hover, #jbmplsControlPanel span.fakeLink:hover" : {
      "color" : "#6f6f6f",
   },
   "#jbmnplsFrameWrapper" : {  
      background        :  'no-repeat center center url("'+IMAGES.LARGE_LOADING+'")',
   },
   ".google_play_button" : {
      background        :  'no-repeat url("'+IMAGES.GOOGLE_PLAY_STORE+'")',
      width             :  '100px',
      height            :  '23px',
      display           :  'block',
      'float'           :  'right',
      'margin-right'    :  '15px',
   },
   ".google_play_button:hover" : {
      opacity           :  '0.9',
   },
   ".google_play_button:active" : {
      opacity           :  '0.6',
   },
   /**
    *    Profile Nav
    */
   "#jbmnplsProfileNav" : {
      position          :  "absolute",
      top               :  "0",
      "overflow-x"      :  "hidden",
      "overflow-y"      :  "visible",
      "width"           :  "100%",
      "left"            :  0,
   },
   "#jbmnplsProfileNav ul" : {
      margin            :  0,
      padding           :  0,
      left              :  "50%",
      "float"           :  "left",
      "position"        :  "relative",
   },
   "#jbmnplsProfileNav li.navItem" : {
      "position"        :  "relative",
      "float"           :  "left",
      "list-style-type" :  "none",
      "right"           :  "50%",
      "background"      :  "#7F7F7F",
      width             :  "150px",
      "margin-bottom"   :  "10px",
      "margin-left"     :  "-15px",
      "box-shadow"      :  "0 0 9px black",
      "-moz-box-shadow" :  "0 0 9px black",
      "text-align"      :  "center",
      "border"          :  "2px solid #CCC",
      "border-top"      :  "none",
      "-moz-border-radius-bottomright"          :  "15px",
      "-moz-border-radius-bottomleft"          :  "15px",
      "border-bottom-right-radius"          :  "15px",
      "border-bottom-left-radius"          :  "15px",
   },
   "#jbmnplsProfileNav li.navItem span" : {
      "font-size"       :  "14px",
      "padding-top"     :  "5px",
      "padding-bottom"  :  "8px",
      "color"           :  "white",
      "width"           :  "100%",
      "height"          :  "100%",
      "display"         :  "block",
      "-moz-transition-property" : "padding",
      "-moz-transition-duration" : "0.2s",
   },
   "#jbmnplsProfileNav li.navItem.selected" : {
      "z-index"         :  "4 !important",
      "background"      :  "#999 !important",
   },
   "#jbmnplsProfileNav li.navItem.selected span" : {
      "padding-top"     :  "10px",
   },
   "#jbmnplsProfileNav li.navItem:hover" : {
      "z-index"         :  "4 !important",
      "background"      :  "#AAA",
   },
   "#jbmnplsProfileNav li.navItem span:hover" : {
      "padding-top"     :  "10px",
   },
   /**
    *    Jobmine Plus Tables
    */
   "div.jbmnplsTable" : {
      "min-height" : "50px",
      "-moz-border-radius" : "10px",
      "border-radius" : "10px",
      "border" : " 2px solid black",
      "background" : " #333333",
      "box-shadow" : "0 0 7px black",
      "empty-cells" : "show",
      "min-width" : "100%",
      "display" : "inline-block",
      "margin-bottom" : "40px",
   },
   "div.jbmnplsTable *" : {
      "font-family" : "Verdana, Arial !important",
      "font-size" : "12px",
      "text-decoration" : "none",
      "color" : "white",
   },
   "div.jbmnplsTable div.jbmnplsTableHeader, div.jbmnplsTable div.jbmnplsTableFooter" : {
      "padding" : " 0 25px",
      "width" : "auto",
      "height" : "25px",
   },
   "div.jbmnplsTable div.jbmnplsTableName" : {
      "font-family" : "Verdana, Arial",
      "font-size" : "14px",
      "color" : "white",
      "font-weight" : "bold",
      "vertical-align" : "middle",
      "padding-top" : "2px",
      "display" : "block",
      "float" : "left",
   },
   "div.jbmnplsTableBody" : {
      position :  "relative",
   },
   "div.jbmnplsTable.loading div.jbmnplsTableLoadOverlay" : {
      position          :  "absolute",
      height            :  "100%",
      width             :  "100%",
      top               :  "0",
      background        :  "rgba(255,255,255,0.5) no-repeat center center url('"+IMAGES.LARGE_LOADING+"')",
   },
   "div.jbmnplsTable table td *, div.jbmnplsTable table td" : {
      "color" : "#555555",
      "vertical-align" : "middle",
   },
   "div.jbmnplsTable table td" : {
      "padding" : "5px 15px",
      "border-bottom" : "1px #929292 solid",
   },
   "div.jbmnplsTable table tr[row='header']" : {
      "background-color" : " #7f7f7f",
      "height" : "20px",
   },
   "div.jbmnplsTable table tr" : {
      "background-color" : " white",
      "height" : "40px",
   },
   "body:not(.doNotHighlightLastRow) div.jbmnplsTable table tr.lastClickedRow td" : {
      "background-color" : COLOURS.ROW_HIGHLIGHT,
   },
   "body.SHIFT div.jbmnplsTable" : {
      "-moz-user-select"   : "none",
      "-webkit-user-select" : "none",
      "-o-user-select" :"none",
      "user-select" :"none",
   },
   "div.jbmnplsTable table tr.selected td" : {
      "background-color" : COLOURS.ROW_SELECT,
   },
   "div.jbmnplsTable table tr:hover td" : {
      "background-color" : COLOURS.HOVER,
   },
   "div.jbmnplsTable table tr td span.fakeLink" : {
      color: "#336699",
   },
   "div.jbmnplsTable table tr td span.details" : {
      color    : "#999",
      "float"  : "right",
   },
   "div.jbmnplsTable table tr td a:hover, div.jbmnplsTable table tr td span.fakeLink:hover" : {
      "color" : COLOURS.LINK_HIGHLIGHT_HOVER,
      "text-decoration" : "underline",
   },
   "div.jbmnplsTable table tr th" : {
      "color" : "white",
      "font-size" : "13px",
      "font-weight" : "normal",
      "border-bottom" : "2px solid black",
      "height" : "20px",
      "text-align" : "left",
      "padding" : "5px 15px",
   },
   "div.jbmnplsTable table tr th.headerSortDown" : {
      background : "right center no-repeat url('"+IMAGES.TABLE_ASCEND+"') #999999",
   },
   "div.jbmnplsTable table tr th.headerSortUp" : {
      background : "right center no-repeat url('"+IMAGES.TABLE_DESCEND+"') #999999",
   },
   "div.jbmnplsTable table tr th:hover" : {
      "background-color" : "#AAAAAA",
      "cursor" : "pointer",
   },
   "div.jbmnplsTable table td .delete" : {
      "background" : "0 0 url('"+IMAGES.DELETE+"')",
      "height" : "22px",
      "width" : "22px",
      "display" : "block",
      "cursor" : "pointer",
   },
   "div.jbmnplsTable table td .loading" : {
      "background" : "-5px -5px url('"+IMAGES.DELETE_LOADING+"') no-repeat",
      "cursor" : "default",
      "display" : "block",
      "min-width" : "22px",
      "min-height" : "22px",
   },
   "div.jbmnplsTable table td .delete.disabled, div.jbmnplsTable table td .delete[disabled='disabled']" : {
      "background" : "0 0 url('"+IMAGES.DELETE_DISABLE+"')",
      "cursor" : "default",
   },
   "div.jbmnplsTable div.jbmnplsTableControls" : {
      "float" : "right",
      "padding-top" : "4px",
   },
   "div.jbmnplsTable div.jbmnplsTableControls,div.jbmnplsTable div.jbmnplsTableControls *" : {
      "color" : "#CCC",
      "outline" : "none",
   },
   "div.jbmnplsTable div.jbmnplsTableControls *.disabled,div.jbmnplsTable div.jbmnplsTableControls a.disabled:hover, div.jbmnplsTable div.jbmnplsTableControls span.fakeLink.disabled:hover" : {
      "color" : "#A0A0A0",
   },
   "div.jbmnplsTable div.jbmnplsTableControls a.important, div.jbmnplsTable div.jbmnplsTableControls span.fakeLink.important" : {
      "color" : "skyBlue",
      "font-weight" : "bold",
   },
   "div.jbmnplsTable div.jbmnplsTableControls a:hover, div.jbmnplsTable div.jbmnplsTableControls span.fakeLink:hover" : {
      "color" : "white",
   },
   "div.jbmnplsTable.disable-links a, div.jbmnplsTable.disable-links .fakeLink" : {
	  "color" : "#ccc",
	  "pointer-events": "none",
   },
   "div.jbmnplsTable.disable-links div.jbmnplsTableControls a, div.jbmnplsTable.disable-links div.jbmnplsTableControls .fakeLink" : {
	   "color" : "#777",
	},
   /**
    *    Table column hiding
    */
   "table.tablesorter.hideColumn0  *[col='0'], \
    table.tablesorter.hideColumn1  *[col='1'], \
    table.tablesorter.hideColumn2  *[col='2'], \
    table.tablesorter.hideColumn3  *[col='3'], \
    table.tablesorter.hideColumn4  *[col='4'], \
    table.tablesorter.hideColumn5  *[col='5'], \
    table.tablesorter.hideColumn6  *[col='6'], \
    table.tablesorter.hideColumn7  *[col='7'], \
    table.tablesorter.hideColumn8  *[col='8'], \
    table.tablesorter.hideColumn9  *[col='9'], \
    table.tablesorter.hideColumn10 *[col='10'], \
    table.tablesorter.hideColumn11 *[col='11'], \
    table.tablesorter.hideColumn12 *[col='12'], \
    table.tablesorter.hideColumn13 *[col='13'], \
    table.tablesorter.hideColumn14 *[col='14']": {
      display : "none",
   },
   /**
    *    Jobmine Plus Popup
    */
   "#jbmnplsPopup" : {  
      display     :  "none",
      position    :  "fixed",
      top         :  "0",
      left        :  "0",
      height      : "100%",
      width       : "100%",
      "z-index"   :  "1000",
   },
   "body.showPopup" : {
      overflow : "hidden !important",
   },
   "html body.showPopup" : {
      "margin-right"  :  DIMENSIONS.SCROLLBAR_WIDTH+"px",
   },
   "body.showPopup #jbmnplsPopup" : {
      display : "block",
   },
   "#jbmnplsPopup div.content #jbmnplsPopupFrame" : {
      display  :  "none",
   },
   "#jbmnplsPopup div.content.iframe #jbmnplsPopupFrameWrapper" : {
      background  :  "no-repeat center center url('"+IMAGES.LARGE_LOADING+"')",
   },
   "#jbmnplsPopup div.content.iframe #jbmnplsPopupFrame" : {
      display  :  "block",
   },
   "#jbmnplsPopup.black" : {  
      "background-color": "rgba(0,0,0,0.6)",
   },
   "#jbmnplsPopup.white" : {  
      "background-color": "rgba(255,255,255,0.8)",
   },
   "#jbmnplsPopup div.wrapper" : {
      width    :  "50%",
      top      :  "50%",
      left     :  "50%",
      height   :  "50%",
      position :  "relative",
   },
   "#jbmnplsPopup div.wrapper div.content" : {
      position             :  "absolute",
   },
   "#jbmnplsPopup.black div.wrapper div.content" : {  
      "background-color"   :  "white",
      "border"             :  "black 2px solid",
      "box-shadow"         :  "0 0 7px black",
      "-moz-box-shadow"         :  "0 0 7px black",
      "position"           :  "relative",
   },
   "#jbmnplsPopup.white div.wrapper div.content .title" : {
      "font-size"       : "50px",
      "font-weight"     : "bold",
      "text-align"      : "center",
      "color"           : "black",
      "text-shadow"     : "0 5px 10px transparent, 0 5px 12px black",
   },
   "#jbmnplsPopup.white div.wrapper div.content .body" : {
      "font-family"        : "Verdana, Arial",
      "font-size"          : "30px",
      "text-align"         : "center",
      "text-shadow"        : "0 2px 5px transparent, 0 2px 5px black",
   },
   "#jbmnplsPopup.white div.wrapper div.content .footer" : {
      "display" : "none",
   },
   "#jbmnplsPopup.black div.wrapper div.content .footer .close" : {
      "display" : "none",
   },
   "#jbmnplsPopup.black #jbmnplsPopupTitle.title" : {
      height            :  "30px",
      "border-bottom"   :  "2px solid black",
      "background"      :  "#333",
      "font-size"       :  "14px",
      "font-weight"     :  "bold",
      "color"           :  "white !important",
      "padding-top"     :  "10px",
      "padding-left"    :  "10px",
   },
   "#jbmnplsPopup.black #jbmnplsPopupFooter" : {
      height            :  "30px",
      "border-top"      :  "2px solid black",
      "background"      :  "#333",
      "font-size"       :  "12px",
      "color"           :  "white",
      "padding-top"     :  "10px",
      "width"           :  "100%",
   },
   "#jbmnplsPopup.black #jbmnplsPopupFooter span.fakeLink" : {
      "float"           :  "right",
      "padding-right"   :  "10px",
   },
   "#jbmnplsPopup.black #jbmnplsPopupFooter span.save.fakeLink,\
    #jbmnplsPopup.black #jbmnplsPopupFooter span.submit.fakeLink" : {
      "float"           :  "left",
      "padding-left"    :  "10px",
   },
   "#jbmnplsPopup.black #jbmnplsPopupBody" : {
      "overflow-x"      :  "auto",
      'font-size'       :  '12px',
      'color'           :  '#333',
      'font-family'     :  'Verdana, Arial, sans-serif',
   },
   "#jbmnplsPopup.black #jbmnplsPopupBody div.instructions" : {
      "text-align"      :  "center",
      "background"      :  "#CCC",
   },
   "#jbmnplsPopup.black #jbmnplsPopupBody div.block" : {
      "border-bottom"   :  "1px solid #929292",
      "overflow"        :  "hidden",
      height            :  "25px",
      "font-size"       :  "12px",
      width             :  "100%",
      display           :  "block",
      padding           :  "10px 0 0",
   },
   
   /**
    *    Jobmine Plus Popup: Employer info under job details
    */
   "#jbmnplsPopup[name='employer_profile'].black span.submit,\
    #jbmnplsPopup[name='employer_profile'].black span.save,\
    #jbmnplsPopup[name='employer_profile'].black span.cancel" : {
      "display"         :  "none",
   },
   "#jbmnplsPopup[name='employer_profile'].black #jbmnplsPopupFooter span.close" : {
      "display"         :  "block",
   },
   
   /**
    *    Jobmine Plus Popup: Customize
    */
   "#jbmnplsPopup[name='customize'].black #jbmnplsPopupBody div.customizeEntry" : {
      "border-bottom"   :  "1px solid #929292",
      "overflow"        :  "hidden",
      height            :  "35px",
   },
   "#jbmnplsPopup[name='customize'].black #jbmnplsPopupBody div.customizeEntry[selected='true']" : {
      background        :  COLOURS.ROW_SELECT,
   },
   "#jbmnplsPopup[name='customize'].black #jbmnplsPopupBody div.customizeEntry.instructions:hover" : {
      background        :  "#CCC",
   },
   "#jbmnplsPopup[name='customize'].black #jbmnplsPopupBody div.customizeEntry:hover" : {
      background        :  COLOURS.HOVER,
   },
   "#jbmnplsPopup[name='customize'].black #jbmnplsPopupBody div.customizeEntry span.row" : {
      height            :  "100%",
      "font-size"       :  "12px",
      width             :  "100%",
      display           :  "block",
      padding           :  "10px 0 0",
   },
   "#jbmnplsPopup[name='customize'].black #jbmnplsPopupBody div.customizeEntry span.row span.hiddenMsg" : {
      "padding-right"         :  "20px",
   },
    "div.jbmnplsTable table.tablesorter td span.hiddenMsg, #jbmnplsPopup[name='customize'].black #jbmnplsPopupBody div.customizeEntry span.row span.hiddenMsg" : {
      display                 :  "none",
      "-moz-user-select"      :  "none",
      "-webkit-user-select"   :  "none",
      "-o-user-select"        :  "none",
      "user-select"           :  "none",
      "cursor"                :  "default",
   },
   "div.jbmnplsTable table.tablesorter td span.hiddenMsg.show, #jbmnplsPopup[name='customize'].black #jbmnplsPopupBody div.customizeEntry[selected='true'] span.row span.hiddenMsg" : {
      display           :  "inline",
      color             :  "#777",
      "float"           :  "right",
   },
   "#jbmnplsPopup[name='customize'].black #jbmnplsPopupBody div.customizeEntry input.checkbox" : {
      "margin"          :  "10px 20px 0",
      "float"           :  "left",
   },
    "#jbmnplsPopup[name='customize'] span.submit" : {
      'display'         :  'none',
   },
   
   /**
    *    Jobmine Plus About Me
    */
   "#jbmnplsPopup[name='about_me'].black #jbmnplsPopupBody" : {
      "font-family"     :  "Verdana, Arial",
      "font-size"       :  "12px",
      "color"           :  "#222",
      padding           :  "20px 10px",
   },
   "#jbmnplsPopup[name='about_me'].black #jbmnplsPopupBody h1" : {
      "color"           :  "#555",
      "font-size"       :  "16px",
      "margin"          :  "0 0px 10px",
   },
   "#jbmnplsPopup[name='about_me'].black span.submit,\
    #jbmnplsPopup[name='about_me'].black span.save,\
    #jbmnplsPopup[name='about_me'].black span.cancel" : {
      "display"         :  "none",
   },
   "#jbmnplsPopup[name='about_me'].black #jbmnplsPopupFooter span.close" : {
      "display"         :  "block",
   },
   
   /**
    *    Jobmine Plus Welcome
    */
   "#jbmnplsPopup[name='welcome!'].black #jbmnplsPopupBody" : {
      "font-family"     :  "Verdana, Arial",
      "font-size"       :  "12px",
      "color"           :  "#222",
      padding           :  "20px 10px",
   },
   "#jbmnplsPopup[name='welcome!'].black #jbmnplsPopupBody h1" : {
      "color"           :  "#555",
      "font-size"       :  "16px",
      "margin"          :  "0 0px 10px",
   },
   "#jbmnplsPopup[name='welcome!'].black #jbmnplsPopupBody h2" : {
      "color"           :  "#555",
      "font-size"       :  "14px",
      "margin"          :  "10px 0px 10px",
   },
   "#jbmnplsPopup[name='welcome!'].black #jbmnplsPopupBody .detail" : {
      "color"           :  "#444",
      "font-size"       :  "10px",
   },
   "#jbmnplsPopup[name='welcome!'].black span.submit,\
    #jbmnplsPopup[name='welcome!'].black span.save,\
    #jbmnplsPopup[name='welcome!'].black span.cancel" : {
      "display"         :  "none",
   },
   "#jbmnplsPopup[name='welcome!'].black #jbmnplsPopupFooter span.close" : {
      "display"         :  "block",
   },
   
   /**
    *    Jobmine Plus Message and Update Message
    */
   "#jbmnplsMessageHolder" : {
      "overflow"        :  "hidden",
      "height"          :  "50px",
      "position"        :  "fixed",
      "width"           :  "100%",
      "left"            :  "0",
      "z-index"         :  "999",
   },
   "#jbmnplsMessage, #jbnplsUpdate" : {
      "height"          :  "35px",
      "max-height"      :  "35px",
      "top"             :  "-50px",
      "position"        :  "relative",
      "width"           :  "100%",
      "-moz-box-shadow"      :  "0 3px 10px #333",
      "box-shadow"      :  "0 3px 10px #333",
      "background"      :  "#fafafa",
      "text-align"      :  "center",
   },
   "#jbmnplsMessage, #jbnplsUpdate .update-link:hover" : {
      'color'           :  '#777',
   },
   "#jbnplsUpdate" : {
      "position"        :  "fixed",
      top               :  0,
      left              :  0,
      "z-index"         :  "998",
   },
   "#jbmnplsMessage *, #jbnplsUpdate *" : {
      "font-family"     :  "Verdana, Arial",
      "font-size"       :  "12px",
      "color"           :  "#222",
      "padding"         :  "7px",
      "display"         :  "block",
   },
   "#jbmnplsMessage div.close, #jbnplsUpdate div.close" : {
      "background"      :  "no-repeat 100% 50% url('"+IMAGES.MESSAGE_CLOSE+"')",
      "position"        :  "absolute",
      "top"             :  "8px",
      "right"           :  "25px",
      "width"           :  "100px",
      "height"          :  "16px",
      "cursor"          :  "pointer",
      "padding"         :  "0",
      "padding-right"   :  "20px",
      "font-size"       :  "10px",
   },
   "#jbmnplsPopup[name='jobmine_plus_is_updated!'] #jbmnplsPopupBody" : {
      'height'          :  '200px !important',
      'padding'         :  '10px',
   },
   "#jbmnplsPopup[name='jobmine_plus_is_updated!'] span.submit,\
    #jbmnplsPopup[name='jobmine_plus_is_updated!'] span.save,\
    #jbmnplsPopup[name='jobmine_plus_is_updated!'] span.cancel" : {
      'display'         :  'none',
   },
   
   /**
    *    Jobmine Plus Settings
    */
   '#jbmnplsPopup #jbmnplsPopupSettings' : {  
      "display"         : 'none',
      'min-height'      : '400px',
   },
   '#jbmnplsPopupSettings *' : {
      'font-size'       : '12px',
      'font-family'     : 'Verdana, Arial, sans-serif',
   },
   '#jbmnplsPopup[name="settings"] #jbmnplsPopupSettings' : {  
      "display"         : 'block',
   },
   '#jbmnplsPopupSettings .settings-panel' : {
      'display'         : 'none',
      'padding'         : '10px 0',
   },
   '#jbmnplsPopupSettings .settings-panel.open' : {
      'display'         : 'block',
   },
   '#jbmnplsPopupSettings nav' : {
      'background'      : '#7f7f7f',
      'height'          : '30px',
      'border-bottom'   : '2px solid black',
   },
   '#jbmnplsPopupSettings nav li' : {
      'color'           : 'white',
      'font-size'       : '13px',
      'width'           : Math.floor(100/Object.size(SETTINGS.template)) + "%",
   },
   '#jbmnplsPopupSettings nav li.selected' : {
      'background'      : '#999',
   },
   '#jbmnplsPopupSettings nav li:hover' : {
      'cursor'          : 'pointer',
      'background'      : '#AAA',
   },
   '#jbmnplsPopupSettings nav li, #jbmnplsPopupSettings .settings-entry' : {
      'padding'         : '5px 10px 8px',
      '-webkit-box-sizing' : 'border-box',
      '-moz-box-sizing' : 'border-box',
      'box-sizing'      : 'border-box',
      'position'        : 'relative',
   },
   '#jbmnplsPopupSettings .settings-entry .settings-entry-input' : {
      'float'           : 'right',
      'width'           : '180px',
   },
   '#jbmnplsPopupSettings .settings-entry-input .settings-textfield, #jbmnplsPopupSettings .settings-entry-input select' : {
      'width'           : '100%',
   },
   '#jbmnplsPopupSettings .settings-entry-input .settings-checkbox,#jbmnplsPopupSettings .settings-entry-input .settings-dropdown' : {
      'position'        : 'relative',
      'top'             : '-1px',
   },
   '#jbmnplsPopupSettings .settings-entry-input .settings-textfield' : {
      'position'        : 'relative',
      'top'             : '-2px',
   },
   '#jbmnplsPopupSettings .settings-entry .settings-entry-detail' : {
      'position'        : 'absolute',
      'left'            : '140px',
      'top'             : '7px',
      'color'           : '#777',
      'font-style'      : 'italic',
      'font-size'       : '10px',
   },
   '#jbmnplsPopupSettings .settings-entry .settings-entry-label' : {
      'margin-left'     :  '5px',
   },
   '#jbmnplsPopupSettings .settings-entry .settings-entry-title' : {
      'font-weight'     : 'bold',
   },
   "#jbmnplsPopup[name='settings'] span.submit" : {
      'display'         :  'none',
   },
  
   /**
    *    Jobmine Plus Apply Popup
    */
   "#jbmnplsPopup[name='edit_application'] span.save,\
    #jbmnplsPopup[name='submit_application'] span.save" : {
      'display'         :  'none',
   },
   
   "#jbmnplsPopup[name='edit_application'] #jbmnplsPopupFrame,\
    #jbmnplsPopup[name='submit_application'] #jbmnplsPopupFrame" : {
      'height'          :  '230px',
   },
};
appendCSS(CSSOBJ);

/*================================*\
|*     __INDIVIDUAL_PAGES__       *|
\*================================*/
//See if we are at home page
OBJECTS.UWATERLOO_ID = $('#UW_CO_STUDENT_UW_CO_STU_ID').plainText();
switch (PAGEINFO.TYPE) {
   case PAGES.HOME:{       /*Expand to see what happens when you reach home page*/
      if (!PAGEINFO.IN_IFRAME) {
         {//Clean up code
         BRIDGE.addJS(function(){
            pthNav.abn.init = function(){};
            ptEvent.add2 = ptEvent.add;
            ptEvent.add = function(a,b,c){if(a!=null){ptEvent.add2(a,b,c);}}
         });
         //Cancel the load for the item
         $(document.body).removeAttr("onload");
         //Delete the useless stuff on home page
         $("body > table").remove();
         }
         
         /**
          *    Handle what page to go to
          */
         var gotoLocation = window.location.hash == "" ? "" : window.location.hash.substr(1);   //Get rid of # in hash
         window.location.hash = CONSTANTS.EXTRA_URL_TEXT;
         
         var currentPage = gotoLocation;
         if (CONSTANTS.EXTRA_URL_TEXT == currentPage) {    //Refreshed the entire page
            currentPage = PREF.load("LAST_PAGE");
         } else if(currentPage == null || !PAGES.isValid(currentPage) || !NAVIGATION.hasOwnProperty(currentPage)) {
            currentPage = PREF.load("SETTINGS_GENERAL_DEFAULT_PAGE", null, PAGES.APPLICATIONS);
         }         
         var link = LINKS[currentPage.toUpperCase()];

         /**
          *    Set some stuff in the nav to match the new location
          */
         addHeader();
         setTitle(NAVIGATION[currentPage]);
         setNavSelection($("#jbmnplsNav a[type='"+currentPage+"']").attr("item"));
         
         //Appends the iframe that holds the content
         $("body").append("<div id='jbmnplsFrameWrapper'><iframe style='position:relative;visibility:hidden;' src='"+link+"' frameborder='0' id='jbmnplsWebpage' width='100%' height='100%'/></div><div id='pthnavcontainer' class='hide'></div>")
        
         //Hacked the navigation because we have an iframe
         $("#jbmnplsNav a").click(function(e){
            var obj = e.target;
            if (obj.getAttribute("target") == "_blank") {return;}
            e.preventDefault();
            var newLocation = obj.getAttribute("realHref");
            var index = obj.getAttribute("item");
            var newTitle = obj.innerHTML;
            changeLocation(newLocation, newTitle, index);
         });
         
         //If debug is on, we can add the debugger window
         if(CONSTANTS.DEBUG_ON) {
            DEBUGGER.init();
         }
         initDraggable();
         invokeRefreshTimer();
         //Frames to give the illusion that Jobmine Plus loads right away
         function hideFrame(){
            $("#jbmnplsWebpage").css("visibility", "hidden");     
         }
         function showFrame(){
            setTimeout(function(){  //Must come after Firefox trashes last iframe data before loading next url
               $("#jbmnplsWebpage").css("visibility", "visible");
            },1);
         }
         BRIDGE.registerFunction("hideFrame",hideFrame);
         BRIDGE.registerFunction("showFrame",showFrame);
      } else {
         //Cannot have itself in its own iframe
         return;
      }
      initStatusBar();
      }break;
   case PAGES.LOGIN:{      /*Expand to see what happens when you reach login page*/
      //To avoid hanging if you have been kicked off
      if(PAGEINFO.IN_IFRAME) {
         top.location.href = LINKS.LOGIN;
         return;
      }
      function setAutoComplete(flag){
         if(flag) {
            $("#userid").attr("autocomplete", "on").attr("value", defaultUser.toLowerCase());
            $("#pwd, #login").attr("autocomplete", "on");
         } else {
            $("#pwd, #login, #userid").attr("autocomplete", "off");
         }
      }
      var checked = false;
      var cookieName = "RememberLogin";
      var rememberMe = Cookies.read(cookieName);
      if (rememberMe != -1 && rememberMe == "1") {
         //Determine the person
         var defaultUser = Cookies.read("SignOnDefault");
         if (defaultUser != -1) {   
            setAutoComplete(true);
            $("body").attr("onload", "");
            BRIDGE.run(function(){document.getElementById("userid").focus();document.getElementById("pwd").focus();});
            checked = true;
         }
      } 
      //Put the extra field in
      var insertLoc = $("#login table:eq(0)");
      var message = "Save My Username<br/><span class='important'>(DO NOT CHECK ON PUBLIC PC)</span>";
      if (PAGEINFO.BROWSER == BROWSER.FIREFOX) {
         message = "Remember Me<br/><span class='important'>(DO NOT CHECK ON PUBLIC PC)</span>";
      }
      insertLoc.after("<div id='jbmnplsHolder' class='noselect'><input id='jbmplsChbx' class='checkbox' "+(checked?"checked='true'":"")+" type='checkbox'/><label class='message' for='jbmplsChbx'>"+message+"</label></div>");
      $("#jbmplsChbx").change(function(){
         if(this.checked) {
            Cookies.set(cookieName, "1");
         } else {
            Cookies.remove(cookieName);
         }
         setAutoComplete(this.checked);
      });
      PREF.remove("LAST_PAGE");
      }break;
   case PAGES.DETAILS: {   /*Expand to see what happens when you reach job details page*/
      if (!PAGEINFO.IN_IFRAME) {    //Ported from Jobmine Plus version 1
         initDraggable();
         var form = $("body form:eq(0)");
         if(PREF.load("SETTINGS_PAGES_SHOW_OLD", null, false) === false) {
            //Data that needs to be extracted from the page, this object holds it all
            var jobDescriptionData = {
               employerName   : "",    position       : "",    location       : "",    openings       : "",    jobLevels      : "",    grades         : "",
               comments       : "",    description    : "",    openDate       : "",    cecsCoord      : "",    disciplines    : "",    closeDate      : "",
               wtSupport: ""
            };
            $("#ACE_width span").each(function(index){
               var text = $(this).plainText();
               if(text != ""){
                  switch(index){
                     case 3:  jobDescriptionData.openDate      = text;        break;
                     case 4:  jobDescriptionData.closeDate     = text;        break;
                     case 10: jobDescriptionData.employerName  = text;        break;
                     case 12: jobDescriptionData.position      = text;        break;
                     case 14: jobDescriptionData.grades        = text;        break;
                     case 16: jobDescriptionData.location      = text;        break;
                     case 18: jobDescriptionData.openings      = text;        break;
                     case 20: jobDescriptionData.disciplines   = text+", ";   break;
                     case 21: jobDescriptionData.disciplines  += text;        break;
                     case 23: jobDescriptionData.jobLevels     = text;        break;
                     case 27: jobDescriptionData.wtSupport     = text;        break;
                     case 26: jobDescriptionData.cecsCoord     = text;        break;
                     case 29: jobDescriptionData.comments      = text;        break;
                     case 31: jobDescriptionData.description   = $(this).html();        break;
                  }
               }
            });
            setTitle("Job Details: "+jobDescriptionData.employerName);
            //Add url a-href to most of the links on page
            jobDescriptionData.description = jobDescriptionData.description.replace(/((http:|https:|www.)[^\s]+)/gi, function(item){
               item = item.replace(/&nbsp;/, "");        //usually this appears at the end of the link
               //Removes random all punctuation at the end of the link
               var endPunctuation = "";
               item = item.replace(/([^\/\w])+$/, function(characters){
                  endPunctuation = characters;
                  return "";
               });
               item = item.toUpperCase().indexOf('HTTP') == 0 ? item : "http://"+item;         
               return "<a href='"+item+"' target='_blank'>"+item+"</a>" + (endPunctuation ? endPunctuation : "");
            });
            var toolbar =  "<div id='toolbar' class='printHide'>Don't like this look for your job descriptions? <span id='showOldDetailsBtn' class='fakeLink' href='#'>Click here to change it back</span></div>";
            var newBody =  "<table class='page' id='jobDetails' cellspacing='0' cellpadding='0'><tr><td valign='top' id='header'><span class='title'>Employer: <a class='printHide' target='_blank' title='Google search "+jobDescriptionData.employerName+"' href='http://www.google.ca/#hl=en&q="+encodeURIComponent(jobDescriptionData.employerName)+"'>"+(jobDescriptionData.employerName.length > 48 ? jobDescriptionData.employerName.substring(0,48)+"..." : jobDescriptionData.employerName)+"</a><a class='printshow' href='#'>"+jobDescriptionData.employerName+"</a></span><input class='button printHide' onclick='window.print();' type='button' value='Print Job Description'/><br/><br/><table class='jobDescriptionArea' cellspacing='0' cellpadding='0'><tr><td valign='top' class='left category'>Job Title:</td><td valign='top' class='left description'>"+jobDescriptionData.position+"</td><td valign='top' class='category right'>Levels:</td><td valign='top' class='right description'>"+jobDescriptionData.jobLevels+"</td></tr><tr><td valign='top' class='left category'>Work Location:</td><td valign='top' class='left description'><a target='_blank' href='http://maps.google.ca/maps?hl=en&q="+encodeURIComponent(jobDescriptionData.employerName)+"+"+encodeURIComponent(jobDescriptionData.location)+"' title='Search location' class='location'>"+jobDescriptionData.location+"</a></td><td valign='top' class='category right'>Grades:</td><td valign='top' class='right description'>"+jobDescriptionData.grades+"</td></tr><tr><td valign='top' class='left category'>Available Openings:</td><td valign='top' class='left description'>"+jobDescriptionData.openings+"</td><td valign='top' class='category right'></td><td valign='top' class='right description'></td></tr></table><input class='button printHide' onclick='invokeEmployerPopup();' type='button' value='View Employer Profile'/><br/><br/>"+(jobDescriptionData.comments==""?"":"<table id='comments' cellspacing='0' cellpadding='0'><tr><td class='category' valign='top'>Comments:</td><td class='important' valign='top'>"+jobDescriptionData.comments+"</td></tr></table>")+"<hr/></td></tr><tr><td valign='top' id='content'><div class='title'>Description</div><div class='body'>"+jobDescriptionData.description+"</div></td></tr><tr><td valign='top' id='footer'><hr/><table class='jobDescriptionArea' cellspacing='0' cellpadding='0'><tr><td valign='top' class='left'><table cellspacing='0' cellpadding='0'><tr><td valign='top' class='category'>Posting Open Date:</td><td valign='top'>"+jobDescriptionData.openDate+"</td></tr><tr><td valign='top' class='category'>CECS Field Co-ordinator:</td><td valign='top'>"+jobDescriptionData.cecsCoord+"</td></tr><tr><td valign='top' class='category'>Work Term Support:</td><td valign='top'>"+jobDescriptionData.wtSupport+"</td></tr><tr><td colspan='2'><br/><table class='jobDescriptionArea' cellspacing='0' cellpadding='0'><tr><td valign='top' class='category'>Disciplines:</td><td valign='top' class='left' style='white-space:normal;'>"+jobDescriptionData.disciplines+"</td></tr></table></td></tr></table></td><td valign='top' class='right'><table cellspacing='0' cellpadding='0'><tr><td valign='top' class='category'>Last Day to Apply:</td><td valign='top'>"+jobDescriptionData.closeDate+"</td></tr></table></td></tr></table><hr class='printHide'/></td></tr></table>";
            var detailsCss = {
               "body.PSPAGE" : {
                  "overflow-y"  :  "scroll",
                  "padding"     :   "0 50px",
               },
               "html,body" : {
                  "height"       :  "auto !important",
               },
               ".printshow" : {
                  "display" : "none",
               },
               "iframe" : {
                  "overflow-x" : "hidden",
                  "overflow-y" : "scroll",
               },
               ".jobmineButton" : {
                  "font-family" : " 'Arial','sans-serif'",
                  "font-size" : " 9pt",
                  "font-weight" : " normal",
                  "font-Style" : " normal",
                  "font-variant" : " normal",
                  "color" : " rgb(0,0,0)",
                  "background-color" : " rgb(255,255,153)",
               },
               "#jobDetails.page" : {
                  "width" : "760px",
                  "height" : "950px",
                  "min-height" : "950px",
                  "margin" : " 50px auto",
                  "-moz-box-shadow" : " 0 0 1em black",
                  "-webkit-box-shadow" : " 0 0 1em black",
                  "box-shadow" : " 0 0 1em black",
                  "background-color" : " #f6f6f6",
                  "padding" : " 35px 20px",
                  "font-family" : " Arial, Verdana, san-serif",
                  "font-size" : "12px",
               },
               "input.button" : {
                  "float" : "right",
               },
               ".important" : {
                  "color" : "red",
               },
               ".jobDescriptionArea td, #comments td" : {
                  "font-size" : "14px",
               },
               ".jobDescriptionArea .left" : {
                  "width" : "100%",
               },
               "#header .jobDescriptionArea td, #footer .jobDescriptionArea td" : {
                  "white-space" : "nowrap",
               },
               ".jobDescriptionArea a.location" : {
                  "color" : " #3333cc",
                  "text-decoration" : " none",
               },
               ".jobDescriptionArea .category" : {
                  "font-weight" : "bold",
                  "padding-right" : "10px",
                  "width" : "10px",
               },
               "#comments" : {
                  "margin-top" : "10px",
                  "display" : jobDescriptionData.comments == " " ? "none" : "block",
               },
               "#comments .category" : {
                  "font-weight" : "bold",
                  "padding-right" : "30px",
               },
               "hr" : {
                  "color" : "#6c6cbd",
                  "margin" : "10px 0",
               },
               "#content .body" : {
                  "margin" : " 15px 0px",
               },
               ".title" : {
                  "font-size" : "19px",
                  "color" : " #4b4bb4 !important",
                  "font-weight" : " bold",
               },
               "#jobDetails .title a:visited" : {
                  "font-size" : "19px",
                  "color" : " #4b4bb4 !important",
               },
               "#jobDetails .title a" : {
                  "font-weight" : " normal",
                  "margin-left" : "10px",
               },
               "#content" : {
                  "height" : "100%",
               },
               "#footer" : {
                  "max-height" : "110px",
               },
               /*Toolbar*/
               "#toolbar" : {
                  "background-color" : "rgba(0,0,0,0.6)",
                  "color" : "white",
                  "width" : "100%",
                  "position" : "fixed",
                  "text-align" : "center",
                  "top" : "0",
                  "left" : "0",
                  "padding" : "5px 20px",
                  "font-family" : "Arial",
                  "font-size" : "12px",
               },
               "#toolbar span.fakeLink" : {
                  "color" : " white",
                  "text-decoration":"underline",
               },
               "#toolbar span.fakeLink:hover" : {
                  "color" : " #CCC",
               },
            };
            var printCSS = "<style>@media print{#jbmnplsPopup{display:none !important;}body.PSPAGE.JOB_DETAILS{margin:0;padding:0;}a{color: black !important;text-decoration: none;}hr{color:black;}.printHide{display:none !important;}#jobDetails .title{color: black !important;}body, #jobDetails.page{width: 100%;padding:0px;margin:0px;-moz-box-shadow: none;-webkit-box-shadow: none;background-color:white;}.printshow{display:inline !important;}}</style>";
            //Clean up the page
            form.children("div").remove();
            form.append(newBody).append(toolbar);
            appendCSS(detailsCss);
            $("body").append(printCSS);
            
            $("#showOldDetailsBtn").click(function(){
               PREF.save("SETTINGS_PAGES_SHOW_OLD", true);
               refresh();
            });
            
            BRIDGE.registerFunction("invokeEmployerPopup", function(){  
               showPopup(true, null, "Employer Profile", 550, null, null, PAGEINFO.URL+"&jbmnpls=employeeInfo");
               $("#jbmnplsPopupFrame").css("visibility", "hidden").unbind().bind("load", function(){
                  var obj = $(this);
                  if (obj.contents().find("#win0divUW_CO_JOBDTL_VW_UW_CO_PROFILE").exists()) {
                     obj.css("visibility", "visible");
                  }
               });
            });
            
         } else {    //Old webpage
            var toolbar    = "<div id='toolbar' class='printHide'>Want to see the Jobmine Plus version of job descriptions? <span class='fakeLink' id='showNewDetailsBtn'>Click here to change it</span></div>";
            var cssStyles  = "<style>body.PSPAGE{margin-top:30px;}@media print{.PSPAGE{margin-top:1px;}.printHide{display:none;}}/*Toolbar*/#toolbar{background-color: rgba(0,0,0,0.6);color: white;width:100%;position:fixed;text-align:center;top:0;left:0;padding: 5px 20px;font-family:Arial;font-size:12px;}#toolbar span.fakeLink{color: white;text-decoration:underline;}#toolbar span.fakeLink:hover{color: #CCC;}</style>";
            form.append(toolbar).append(cssStyles);
            
            //Clicking the link would tell it to look at the old one
            $("#showNewDetailsBtn").click(function(){
               PREF.save("SETTINGS_PAGES_SHOW_OLD", false);
               refresh();
            });
         }
      } else if(PAGEINFO.URL.contains("&jbmnpls=employeeInfo")) {    //In iframe being loaded for finding employee info
         BRIDGE.run(function(){submitAction_win0(document.win0,'#ICPanel1');});
      }
      if(PREF.load("SETTINGS_GENERAL_KILL_TIMER", null, false)) {
         invokeUpdateStatusBarUpdate(LINKS.RANKINGS);
      }
   }break;
   case PAGES.EMPLOYEE_PROF:{
      if(PAGEINFO.IN_IFRAME) {  
         //Clean up
         $("body form:eq(0)").children("div:not('#PAGECONTAINER')").remove();
         $("#PAGECONTAINER").css({"position":"absolute","top":0,"left":0,});
         var trs = $("#ACE_width tr");
         trs.eq(-1).find("td:eq(0)").removeAttr("height");
         trs.eq(1).remove();trs.eq(2).remove();
      }
   }break;
   case PAGES.APPLY:{      /*Expand to see what happens when you apply*/
   // Fixes the issue where this runs on Job Search Resume upload
	  if (window.parent == window.top) {return;}
      initAjaxCapture();
      var viewLink = $('#UW_CO_PDF_LINKS_UW_CO_DOC_VIEW').attr('href'),
          message = $('#UW_CO_APPDOCWRK_UW_CO_ALL_TEXT').val(),
          $dropdown = $("#UW_CO_APPDOCWRK_UW_CO_DOC_NUM"),
          hideView = true;
      
      // Crazy if statement to decide messages and errors if user did something wrong or right
      var resumes = PREF.load("RESUMES").split(CONSTANTS.RESUME_DELIMITOR2),
          resumeName = "Loading...";
      if (message.contains("Upload cancelled.") 
         || message.contains("Your document was not uploaded as it is not a PDF file.")
         || message.contains("You must select a PDF document to upload.")) {
         // Once we cancel the upload, fix everything up
         var index = $("#UW_CO_APPDOCWRK_UW_CO_DOC_NUM").val();
         if (index != "") {
            index = parseInt(index) - 1;
            var isViewAble = !resumes.empty() && resumes[index].charAt(resumes[index].length-1) == "1";
            if (isViewAble) {
               resumeName = resumes[index].split(CONSTANTS.RESUME_DELIMITOR1)[0];
               hideView = false;
            }
         }
         if (message.contains("You must select a PDF document to upload.") 
            || message.contains("Your document was not uploaded as it is not a PDF file.")) {
            showMessage("Upload a valid PDF document.");
         }
      } else if (message.contains('Your PDF document has been successfully')) {
         resumeName = "[Uploaded Resume]";
         hideView = false;
      }
      
      // Append the rest of the interface
      $(document.body).append("<span id='or-text'>OR</span>").append(
         '<span id="resume-holder">\
            <span id="resume-name">' + resumeName + '</span> \
            <a id="view-resume" onclick="showMessage(\'Retrieving resume, please wait.\')" href="' + viewLink + '">(View)</a>\
          </span>');
      if (hideView) {
         $('#view-resume').hide();
      }
    
      // Show the first resume if it is viewable
      var firstResumeViewable = !resumes.empty() && resumes[0].charAt(resumes[0].length-1) == "1";
      if (message == "" && firstResumeViewable) {
         $dropdown.val(1);
         BRIDGE.run(function(){     // for Chrome <3
            var obj = document.getElementById('UW_CO_APPDOCWRK_UW_CO_DOC_NUM');
            addchg_win0(obj);
            submitAction_win0(obj.form,obj.name);
         });
      } else if (resumeName == "Loading..." || !firstResumeViewable) {
         $("#resume-name").html("<span style='color:red'>Please select/upload a resume.</span>");
      }
      
      // Add the names of the resumes to the dropdown
      fixApplyInterface();
      
      // Apply CSS
      var cssObj = {
         'body, html' : {
            'overflow' : 'hidden !important',
         },
         'body > form': {
            'position'  : 'fixed',
            'top'       : '-4000px',
         },
         '#UW_CO_APPDOCWRK_UW_CO_DOC_NUM_LBL,\
          #UW_CO_APPDOCWRK_UW_CO_DOC_NUM,\
          #UW_CO_JOBDTL_VW_UW_CO_PARENT_NAME,\
          #UW_CO_JOBDTL_VW_UW_CO_JOB_TITLE,\
          #win0divlblUW_CO_APPS_UW_CO_APPL_MARKS,\
          #UW_CO_APPS_UW_CO_APPL_MARKS,\
          #or-text,\
          #resume-holder,\
          #win0divUW_CO_APPWRK_UW_CO_ATTACHADD' : {
            'position'  : 'fixed',
            'top'       : '15px',
            'left'      : '20px',
            'font-size' : '14px',
         },
         '#UW_CO_JOBDTL_VW_UW_CO_PARENT_NAME' : {     // Employer
            'font-size'   : '20px',
            'font-weight' : 'bold',
         },
         '#UW_CO_JOBDTL_VW_UW_CO_JOB_TITLE' : {       // Job title
            'top'       : '40px',
         },
         '#UW_CO_APPDOCWRK_UW_CO_DOC_NUM_LBL' : {     // Resume label
            'top'       : '105px',
         },
         '#UW_CO_APPDOCWRK_UW_CO_DOC_NUM' : {         // Resume Dropdown
            'top'       : '135px',
            'left'      : '110px',
            'width'     : '108px !important',
            'height'    : '21px',
         },
         '#win0divUW_CO_APPWRK_UW_CO_ATTACHADD' : {   // Resume Upload Button
            'top'       : '135px',
            'left'      : '280px',
         },
         '#win0divlblUW_CO_APPS_UW_CO_APPL_MARKS' : { // Include grades label
            'top'       : '80px',
         },
         '#UW_CO_APPS_UW_CO_APPL_MARKS' : {           // Include grades dropdown
            'top'       : '78px',
            'left'      : '130px',
         },
         '#resume-holder *' : { 
            'font-size' : '14px',
         },
         '#resume-holder' : {
            'top'       : '105px',
            'left'      : '85px',
         },
         '#or-text' : {
            'top'       : '137px',
            'left'      : '238px',
            'color'     : '#444',
         },
      };
      var $dropdown = $("#UW_CO_APPS_UW_CO_APPL_MARKS");
      var showGrades = !$dropdown.attr('disabled');
      if (!showGrades) {
		  cssObj["#win0divUW_CO_APPS_UW_CO_APPL_MARKS, #win0divlblUW_CO_APPS_UW_CO_APPL_MARKS"] = {
			display: "none"
		  };
      }
      appendCSS(cssObj);
   }
   break;
   default:
      {        /*Expand to see what this section*/
      //Redirect to home page if necessary the top is not already at home
      if (!PAGEINFO.IN_IFRAME) { 
         redirect(LINKS.HOME);
         return;
      }
      
      var form = $("form:eq(0)");
      //Apply the header for the page if it exists
      if (PAGEINFO.TYPE) {
         $("body").prepend("<div class='pageTitle noselect'>"+PAGEINFO.TYPE.replace(/_/g, " ")+"</div>");
      }
      initAjaxCapture();
      initRowDeletion();
      initDraggable();
      
      //Update stuff
      addUpdateMessage();
      $("head").append("<link href='"+LINKS.UPDATE_CSS+"' type='text/css' rel='stylesheet'/>");
      
      //Append an iframe for whatever reasons needed for it
      $("body").append("<iframe id='slave' style='display:none;visibility:hidden;' width='0'height='0' src='about:blank'></iframe>");
      
      //Record last page visited
      if (PAGEINFO.TYPE != null) {
         var pageKey = REVERSE_PAGES[PAGEINFO.TYPE];
         if(NAVIGATION.hasOwnProperty(pageKey)) {
            PREF.save("LAST_PAGE", pageKey);
         }
      }
      //Iframe is done
      $(window).unload(function(){
         if (PAGEINFO.TYPE != null) {
            var pageKey = REVERSE_PAGES[PAGEINFO.TYPE];
            if(NAVIGATION.hasOwnProperty(pageKey)) {
               PREF.save("LAST_PAGE", pageKey);
            }
         }
         BRIDGE.addJS(function(){
            if (window.parent.hideFrame) {
               window.parent.hideFrame();} 
            }
         );
      });
      
      //Welcome message - only shown once!
      if(PREF.load("SHOW_WELCOME_MSG")) {
         showPopup(true, "<h1>Welcome to Jobmine Plus!</h1><br/>Before you get started please know that I save all your preferences to localStorage. If you do not know what that means, that means that all your saved settings will only apply to <span class='bold'>this computer</span> and <span class='bold'>this browser</span>.<br/><br/><h2>Important</h2><span style='color:red;'>The 'customize' button on each table requires that you un-hide any columns in the original Jobmine or else some features will work on Jobmine Plus.</span><br/><span class='detail'>(If you do know know what I mean, <a href='mailto:jobmineplus@gmail.com'>I can explain via email</a>)</span><br/><br/>Therefore please disable Jobmine Plus and go back to Jobmine to un-hide all custom headers if you have done so.<br/><br/>That is it, so please enjoy using Jobmine Plus 2.0!<br/><br/><br/><br/>",
            "Welcome!",     //Title
            400,            //Width
            null,          //No max height
            function(){   //Callback
               PREF.save("SHOW_WELCOME_MSG", false);     //Clicking close will never let you see the message again
            });
         }
      }
      
      //Parse Individual pages here
      switch(PAGEINFO.TYPE){
         case PAGES.SEARCH:{           /*Expand to see what happens when you reach the search page*/
            attachNewSearchFields();
            $("#PAGEBAR").remove();
            function markRead(rowNum, id) {
               var row = $("#row_Results_"+rowNum);
               Assert(row.exists(), "Read status is broken, row "+rowNum+" does not exist.");
               var rowData = row.children();
               rowData.eq(0).text("Read");
               SearchManager.setRead(id);
               table0.updateTable();
            }
            function onShortList(rowNum, shortListIndex) {
               var row = $("#row_Results_"+rowNum);
               Assert(row.exists(), "Read status is broken, row "+rowNum+" does not exist.");
               var rowData = row.children();
               rowData.eq(shortListIndex).find(":first").addClass("loading").removeAttr("onclick").text("");
               $("#jbmnplsResults").addClass("disable-links");		// Disables the table so that it waits to finish shortlisting
            }
            BRIDGE.registerFunction("markRead", markRead);
            BRIDGE.registerFunction("onShortList", onShortList);
            SearchManager.updateLastVisit();
            var table0 = makeTable("Results", "UW_CO_JOBRES_VW$scroll$0");
            if (table0.columns > 8) {
               table0.insertColumn("Hiring Chances", 8, function(row, rowData, reverseLookup){
                  if(   !reverseLookup.hasOwnProperty("Openings")
                     || !reverseLookup.hasOwnProperty("# Apps")
                  ) {
                     return MESSAGE.UNHIDE_COLUMNS;
                  }
                  var openings = rowData[reverseLookup["Openings"]];
                  var applications = rowData[reverseLookup["# Apps"]];
                  if (openings.empty()&&applications.empty()){return "";}
                  openings = openings.empty() ? 0 : parseInt(openings);
                  applications = applications.empty() ? 1 : parseInt(applications) + 1;
                  var percentage = Math.round(openings/applications*1000)/10;
                  var value = (percentage>=100?99.9:percentage) +"%";
                  return "<span title='Hiring Changes is just Openings/(Applications+1), meaning after you apply this is the percentage. NOT ACCURATE because it does not calculate your skill level'>"+value+"</span>";
               })
            } else {
               showMessage(MESSAGE.UNHIDE_COLUMNS_PAGE, 12);
            }
            table0.applyFilter("Employer Name", TABLEFILTERS.googleSearch)
                  .applyFilter("Location", TABLEFILTERS.googleMap)
                  .insertColumn("Read Status", 0, function(row, rowData, reverseLookup){
                     if (!reverseLookup.hasOwnProperty("Job Identifier")) {return "Missing ID Column";}
                     var id = rowData[reverseLookup["Job Identifier"]];
                     if(id == null || id == "") {return "";}
                     try{
                        if (rowData[reverseLookup["Apply"]] == "Already Applied") {
                           return "Applied";
                        } else if (rowData[reverseLookup["Short List"]] == "On Short List") {
                           return "Shortlisted";
                        } else if (SearchManager.hasRead(id)) {
                           return "Read";
                        }
                     }catch(e){
                        return MESSAGE.UNHIDE_COLUMNS;
                     }
                     return "New";
                  })
                  .applyFilter("Job Title", function(cell, row, rowData, reverseLookup){
					 var trackJS = cell.getTextBetween("javascript:", ";\"");
                     var data = TABLEFILTERS.jobDescription(cell, row, rowData, reverseLookup);
                     if (rowData[reverseLookup["Read Status"]] == "New"){
                        var id = rowData[reverseLookup["Job Identifier"]];
                        data = data.replace('<a ', '<a onmousedown="if(event.which<3){markRead('+row+','+parseInt(id, 10)+');}' + trackJS + ';" ');
                     }
                     return data;
                  })
                  .applyFilter("Apply", function(cell, row, rowData, reverseLookup){
                     return cell.replace('href="javascript:', 'href="javascript:window.parent.hideFrame = null;');
                  })
                  //.applyFilter("Apply", TABLEFILTERS.fixApply)        //TODO fix bug when changing pages
                  .applyFilter("Short List", function(cell, row, rowData, reverseLookup){
                     var action = cell.match(/hAction[^;]+;/);
                     if (action==null) {return cell}
                     action = action[0];
                     return '<span onclick="'+action+'onShortList('+row+','+reverseLookup['Short List']+');" class="fakeLink">Add to Short List</span>';
                  }).addControlButton("Clear Read History", function(){
                     if(!confirm("Would you like to delete all your read status history? All jobs under search will now be set to the 'new' status.")) {
                        return;
                     }
                     SearchManager.clearAll();
                     showMessage("Read status history was successfully deleted.");
                     table0.jInstance.find("tbody tr").children(":first-child:contains('Read')").text("New");
                  })
                  .appendTo(form);
                  
            var appsLeft = $("#UW_CO_JOBSRCHDW_UW_CO_MAX_NUM_APPL").plainText();
            $("#jbmnpls_Results_TableCount").parent().append(" | Total Jobs: <span id='jbmnpls_total_job'>"+table0.jobLength+"</span>");
            if(PREF.load("SETTINGS_PAGES_AUTO_SEARCH", null, false)) {
               showPopup(false, "Please wait while Jobmine receives the search results.<br/><br/><img src='"+IMAGES.LARGE_LOADING+"'/>", "Search is in Progress",550);
            }
            
            //Update the statusbar
            BRIDGE.run(function(){
               var appLeftNode = window.parent.document.getElementById('jbmnpls-status-apps-left');
               if(appLeftNode) {
                  appLeftNode.innerHTML = appsLeft;
               }
            }, null, {appsLeft: appsLeft} );
            }break;
         case PAGES.INTERVIEWS:{       /*Expand to see what happens when you reach the interviews page*/
            var interviewTable = makeTable(null, "UW_CO_STUD_INTV$scroll$0");
            var groupTable = makeTable(null, "UW_CO_GRP_STU_V$scroll$0");
            var socialTable = makeTable(null, "UW_CO_NSCHD_JOB$scroll$0");
            var cancelTable = makeTable(null, "UW_CO_SINT_CANC$scroll$0");
            form.children("div").remove();      //Remove useless stuff
            interviewTable.insertColumn("Google Calendar", TABLECOLUMNS.googleCalendar);
            groupTable.insertColumn("Google Calendar", TABLECOLUMNS.googleCalendarGroup);
            
            //Apply Filters, and append the tables
            for(var i=0; i<TABLES.length;i++) {
                TABLES[i].applyFilter("Job Title", TABLEFILTERS.jobDescription);
            }
            interviewTable.applyFilter("Job ID", TABLEFILTERS.jobInterviews).applyFilter("Interviewer", TABLEFILTERS.interviewerSearch)
                          .applyFilter("Employer Name", TABLEFILTERS.googleSearch).appendTo(form);
            groupTable.applyFilter("Employer Name", TABLEFILTERS.googleSearch).applyFilter("Job ID", TABLEFILTERS.jobInterviews).appendTo(form);
            socialTable.applyFilter("Employer Name", TABLEFILTERS.googleSearch).applyFilter("Job Identifier", TABLEFILTERS.jobInterviews).appendTo(form);
            cancelTable.applyFilter("Employer", TABLEFILTERS.googleSearch).appendTo(form);
            }break;
         case PAGES.RANKINGS:{         /*Expand to see what happens when you reach the rankings page*/
            //var table0 = makeTable("Rankings", "UW_CO_STU_RNKV2$scroll$0");
            //var text = $(UTIL.getID('#ICSave')).attr("onclick").getTextBetween("javascript:", ";");
            //form.children("div").remove();
            //table0.addControlButton("Save", function(){
            //         BRIDGE.run("function(){"+text+"}");     
            //      })
            //      .applyFilter("Job Title", TABLEFILTERS.jobDescription)
            //      .applyFilter("Employer", TABLEFILTERS.googleSearch)
            //      .applyFilter("Work location", TABLEFILTERS.googleMap)
            //      .addControlButton("Rankings Info", "http://www.cecs.uwaterloo.ca/manual/first_cycle/4_11.php").appendTo(form);
            //$("#"+table0.id+" div.jbmnplsTableControls span:contains('Save')").addClass("important");
            
            $(UTIL.getID('#ICSave')).click(function(){
               showMessage("Trying to Save...", 6000);
            });
            }break;
         case PAGES.DOCUMENTS:{        /*Expand to see what happens when you reach the documents page*/
            // Lazy styling without removing elements
            var docCSS = {
                "#win0divPSPANELTABS, \
                 #PAGEBAR, \
                 #ACE_width > tbody > tr:nth-child(1), \
                 #ACE_width > tbody > tr:nth-child(2), \
                 #ACE_width > tbody > tr:nth-child(3) \
                " : {
                    "display" : "none !important",
                }
            };
            appendCSS(docCSS);
            
            // Show message when going to download pdf
            $("#UW_CO_PDF_LINKS_UW_CO_MARKS_VIEW, #UW_CO_PDF_LINKS_UW_CO_WHIST_VIEW")
            .add(document.getElementById("UW_CO_PDF_LINKS_UW_CO_DOC_VIEW$0"))
            .add(document.getElementById("UW_CO_PDF_LINKS_UW_CO_DOC_VIEW$1"))
            .add(document.getElementById("UW_CO_PDF_LINKS_UW_CO_DOC_VIEW$2"))
            .add(document.getElementById("UW_CO_PDF_LINKS_UW_CO_PACKAGE_VIEW$0"))
            .add(document.getElementById("UW_CO_PDF_LINKS_UW_CO_PACKAGE_VIEW$1"))
            .add(document.getElementById("UW_CO_PDF_LINKS_UW_CO_PACKAGE_VIEW$2"))
            .click(function(){
               showMessage('Please wait, retrieving download...');
            });
            }break;
         case PAGES.LIST: {            /*Expand to see what happens when you reach the job shortlist page*/
            //Handles multi delete
            function handleCheckedDelete(){
               //Get all the rows to delete
               var listToDelete = [];
               $("#"+table.tableID+" input.checkbox:checked").each(function(r){
                  listToDelete.push(this.parentNode.parentNode.getAttribute("row"));
               });
               if(listToDelete.empty()) {return;}
               if(!confirm("Would you like to delete these rows?\nThere are "+listToDelete.length+" rows to delete and it might take a while.\n\nYou can refresh anytime to cancel.")) {
                  return;
               }
               listToDelete.sort(function(a,b){return b-a;});     
               var command = table.jInstance.find("tbody div.delete:eq(0)").attr("action");
               var progress = "1/"+listToDelete.length;
               setTitle("Deleting: "+progress);
               showPopup(false, "Deleting all the short listed jobs.<br/>Progress: "+progress+"<br/><span style='color:blue;'>You can cancel by refreshing.</span><br/><br/><img src='"+IMAGES.LARGE_LOADING+"'/>", "Please Be Patient", 500, 300);
               var deletion = new Job("submitAction_win0(document.win0, '" + command + "')", listToDelete);
               JOBQUEUE.addJob(deletion);
            }
            
            form.find("div").css("display", "none");
            var table = makeTable("Jobs", "UW_CO_STUJOBLST$scrolli$0");
            table.applyFilter("", TABLEFILTERS.deleteRow);
            if (table.columns > 8) {  
               table.setHeaderAt(8, "Delete");
            } else {
               showMessage(MESSAGE.UNHIDE_COLUMNS_PAGE, 12);
            }
            table.applyFilter("Job Title", TABLEFILTERS.jobDescription)
                 .applyFilter("Employer Name", TABLEFILTERS.googleSearch)
                 .applyFilter("Location", TABLEFILTERS.googleMap)
                 .applyFilter("Apply", TABLEFILTERS.fixApply)
                 .addControlButton("Select All", function(){
                     $("#"+table.tableID+" input.checkbox").attr("checked", true).parent().parent().addClass("selected");
                  })
                  .addControlButton("Select None", function(){
                     $("#"+table.tableID+" input.checkbox").attr("checked", false).parent().parent().removeClass("selected");
                  })
                  .addControlButton("Delete Selected", handleCheckedDelete)
                 .addCheckboxes()
                 .appendTo(form);
            $(document.body).scrollTop(0);
            var appsLeft = $("#UW_CO_JOBSRCHDW_UW_CO_MAX_NUM_APPL").plainText();
            $("#jbmnpls_Jobs_TableCount").parent().append(" | Applications Left: <span id='jbmnpls_Results_AppsLeft'>"+appsLeft+"</span>");
            //Update the remaining applications
            BRIDGE.run(function(){
               var appLeftNode = window.parent.document.getElementById('jbmnpls-status-apps-left');
               if(appLeftNode) {
                  appLeftNode.innerHTML = appsLeft;
               }
            }, null, {appsLeft: appsLeft} );
            }break;
         case PAGES.APPLICATIONS:{     /*Expand to see what happens when you reach the applications page*/
            //Pull and make new tables
            var activeApp = makeTable(null, "UW_CO_STU_APPSV$scroll$0");
            activeApp.applyFilter("Job Title", TABLEFILTERS.jobDescription)
                     .applyFilter("View Details", TABLEFILTERS.fixApply)
                     .applyFilter("Employer", TABLEFILTERS.googleSearch)
                     .applyFilter("Job Status", function(cell, row, rowData, reverseLookup){
                        if (reverseLookup.hasOwnProperty("Job ID")) {
                           var id = rowData[reverseLookup["Job ID"]];
                           if(cell=="Ranking Complete" && OBJECTS.STORAGE.getItem("INTERVIEWS_ID_"+id) != undefined) {
                              return "<span title='According to the Jobmine glitch, if you have Ranking Complete in Active Applications, this means you have been ranked OR you have been offered this job.'>Ranked or Offered</span>";
                           }
                        }
                        return cell;
                     })
                     .appendTo(form);
                     
            var allApp = makeTable(null, "UW_CO_APPS_VW2$scrolli$0");
            var columnLength = allApp.columns;
            if (allApp.columns > 11) {
               // Apply the delete button
               allApp.applyFilter(columnLength - 1, TABLEFILTERS.deleteRow)
                     .setHeaderAt(columnLength - 1, "Delete");
            } else {
               showMessage(MESSAGE.UNHIDE_COLUMNS_PAGE, 12);
            }
            allApp.applyFilter("Job Title", TABLEFILTERS.jobDescription)
                  .applyFilter("View Details", TABLEFILTERS.fixApply)      
                  .applyFilter("Employer", TABLEFILTERS.googleSearch)
                  .appendTo(form);
            //Clean up all webpage :P
            form.children("div:not('.jbmnplsTable')").css("display", "none");
            
            //Update the active applications count
            changeStatusValues(activeApp.rows);
            }break;
         case PAGES.PROFILE:{          /*Expand to see what happens when you reach the profile page*/ 
            var table0 = makeTable("Profile", "UW_CO_STDTERMVW$scroll$0");
            addProfileNav();
            form.children("div").remove();
            table0.appendTo(form);
            }break;
         case PAGES.PERSONAL:case PAGES.ACADEMIC:case PAGES.SKILLS:{/*Expand to see what happens when you reach the personal profile page*/
            var saveButton = UTIL.getID('#ICSave');
            if(saveButton) {
               var obj = $(saveButton.parentNode.parentNode);
               if(obj.hasClass('PSPUSHBUTTONDISABLED')) {
                  saveButton = null;
               } else {
                  var saveHTML = obj.outerHTML();
               }
            }
            addProfileNav();
            form.children("div:not('#PAGECONTAINER')").remove();
            $("#win0divPSTOOLBAR").remove();
            $("#PAGECONTAINER>table").css("margin", "0 auto");
            $("#ACE_width").removeAttr("width").find("tbody>tr:eq(0)>td").eq(-1).remove();
            if(saveButton) {
               $("#PAGECONTAINER").append(saveHTML);
            }
            }break;
      }
      BRIDGE.addJS(function(){ if(window.parent.showFrame){window.parent.showFrame();} });
      break;
}
 













