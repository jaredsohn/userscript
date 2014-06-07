// ==UserScript==
// @name          Student Information System Tweaks
// @description   Some much-needed basic CSS tweaks for the Student Information System
// @include       https://webappsca.pcrsoft.com*
// @version       1.0
// ==/UserScript==
GM_addStyle("#content\
{\
    padding: 50px;\
}\
\
#primary-content-td\
{\
    width: 100%;\
    margin: 0;\
}\
    \
.rsTopWrap.rsOverflowExpand\
{\
    width: 100% !important;\
}\
\
.rsSpacerCell, .rsAllDayHeader, .rsVerticalHeaderWrapper\
{\
    width: 54px;\
}\
\
.rsHorizontalHeaderWrapper>div\
{\
    width: 100% !important;\
}\
\
.rsContentWrapper>div\
{\
    width: 100% !important;\
}\
\
\
.RadScheduler .rsMonthView .rsApt.rsAptSimple,\
.RadScheduler .rsWeekView .rsApt.rsAptSimple\
{\
    position: relative !important;\
    left: 0 !important;\
}\
.rsApt.rsAptSimple\
{\
    border: #B9AF8E outset 1px !important;\
    box-sizing: border-box;\
    -moz-box-sizing: border-box;\
}\
\
.RadScheduler .rsWeekView .rsWrap\
{\
    overflow: visible !important;\
}\
\
\
#secondary-content-td\
{\
    width: 100%;\
}\
\
#ctl00_ctl00_baseContent_baseContent_secondary_ctl00_navWrapper\
{\
    padding: 5px 15px 0px;\
    margin-bottom: 10px;\
}\
\
#ctl00_ctl00_baseContent_baseContent_secondary_ctl00_navWrapper>ul\
{\
    width: 606px;\
    margin: auto;\
}\
\
#ctl00_ctl00_baseContent_baseContent_secondary_ctl00_navWrapper>ul>li\
{\
    display: inline-block;\
}\
#ctl00_ctl00_baseContent_baseContent_secondary_ctl00_navWrapper>ul>li>a\
{\
    padding: 5px 20px;\
}\
#ctl00_ctl00_baseContent_baseContent_secondary_ctl00_navWrapper>ul>li>a:hover\
{\
    padding: 5px 20px;\
}");