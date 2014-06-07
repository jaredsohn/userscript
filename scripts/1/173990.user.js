// ==UserScript==
// @id             www.chinatcc.gov.cn:8080-e8393e59-0421-fa4d-9f27-206b2471b27c@scriptish
// @name           工信部申诉修正
// @version        1.0
// @namespace      
// @author         xionglingfeng
// @description    Fix submission problem in Firefox
// @include        http://www.chinatcc.gov.cn:8080/cms/shensus/
// @run-at         document-end
// ==/UserScript==

function insert_missing_objects(){
    unsafeWindow.document.all = {};
    unsafeWindow.document.all.isshensu = document.getElementsByName('isshensu');
}

unsafeWindow.onload = insert_missing_objects;