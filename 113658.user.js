// ==UserScript==
// @name           BMW Service Survey All 10
// @namespace      hamxiaoz
// @author         hamxiaoz
// @copyright      2011, hamxiaoz (http://userscripts.org/users/355416)
// @licence        Summary: Free for personal non-commercial use
// @description    Automatically fill up survey with awesome (rate 10) feedback
// @version        2011.09.21
// @include        http://www.bmwcustomerexperience.com/survey*
// ==/UserScript==
CheckRadioBox("rdb5");
SetSelectIndex("questionlist1_rptQuestionList_ctl05_ddlQuestionValues",1); // select "Day I wanted"
CheckRadioBox("questionlist1_rptQuestionList_ctl03_crblQuestionValuesBMW_10");
CheckRadioBox("questionlist1_rptQuestionList_ctl06_crblQuestionValuesBMW_10");
CheckRadioBox("questionlist1_rptQuestionList_ctl08_crblQuestionValuesBMW_10");
CheckRadioBox("questionlist1_rptQuestionList_ctl17_crblQuestionValuesBMW_10");
CheckRadioBox("questionlist1_rptQuestionList_ctl19_crblQuestionValuesBMW_10");
CheckRadioBox("questionlist1_rptQuestionList_ctl21_crblQuestionValuesBMW_10");
CheckRadioBox("questionlist1_rptQuestionList_ctl23_crblQuestionValuesBMW_0");
CheckRadioBox("questionlist1_rptQuestionList_ctl25_crblQuestionValuesBMW_10");
CheckRadioBox("questionlist1_rptQuestionList_ctl27_crblQuestionValuesBMW_0");
CheckRadioBox("questionlist1_rptQuestionList_ctl30_crblQuestionValuesBMW_0");
CheckRadioBox("questionlist1_rptQuestionList_ctl31_crblQuestionValuesBMW_10");
CheckRadioBox("questionlist1_rptQuestionList_ctl32_crblQuestionValuesBMW_0");
CheckRadioBox("questionlist1_rptQuestionList_ctl34_crblQuestionValues_0");
CheckRadioBox("questionlist1_rptQuestionList_ctl36_crblQuestionValuesBMW_0");
CheckRadioBox("questionlist1_rptQuestionList_ctl38_crblQuestionValuesBMW_0");
alert("done, time to hit submit.");

function SetSelectIndex(selectId, index)
{
    var select = document.getElementById(selectId);
    if(select != null && select.type == "select-one")
        select.selectedIndex = index;
}

function CheckRadioBox(rbId)
{
    var rb = document.getElementById(rbId);
    if(rb != null && rb.type == "radio")
        rb.checked = true;
}

