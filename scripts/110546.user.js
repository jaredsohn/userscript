// ==UserScript==
// @name           Sam's JIRA helper
// @namespace      --
// @include        http://planning.*.com*
// @author         Xerios
// @version        0.1
// ==/UserScript==


addGlobalStyle(['#quicksearch { position: absolute; top: 0; }',
                '.header-link-container {top: 3px; right: 198px; position: absolute; }',
                '#details-module,#view-subtasks,#attachmentmodule{font-size: 11px;}',
                '#view-subtasks td.stsummary {min-width: 100px;}',
                '.toggle-wrap .mod-header h3, .toggle-trigger {background: transparent;color:#000;width: 100%;display: block;}',
                ' .mod-header{background:#DDD;border-top-left-radius: 10px;border-top-right-radius: 10px;}',
                ' .mod-header.ops{background: transparent;}',
                '#activitymodule .mod-content{height: 500px;overflow: scroll;}',
                '.activity-comment:last-of-type{background:#F7D594;border:1px #F7C463 solid;}',
                '.activity-comment:nth-last-child(2){background:#F7E6C6;border:1px #F7D697 solid;}',
                '.activity-comment:nth-last-child(3){background:#FAF2E3;border:1px #F7E6C6 solid;}',
                '#stalker{top: 0px;}',
                '#attachment_thumbnails .attachment-content {width: 185px;}'
                ].join("\n\n"));


// change the header & remove the footer
//------------------------------------------------

if (document.getElementById('header-bottom')!=null) document.getElementById('header-bottom').style.display='none';
getElementByClassName('footer')[0].style.display='none';

document.getElementById('header-details-user-fullname').innerHTML='';
document.getElementById('stalker').children[0].appendChild(document.getElementById('quicksearch'));
document.getElementById('stalker').children[0].appendChild(document.getElementById('header-details-user'));

if (document.getElementById('header')!=null)
document.getElementById('header').parentNode.removeChild(document.getElementById('header'));

// put actiivty on the top
//------------------------------------------------

var parent = document.getElementById('primary').children[0];
parent.insertBefore(document.getElementById('activitymodule'),parent.childNodes[0]);

//remove activity title
//------------------------------------------------

//document.getElementById('activitymodule').removeChild(document.getElementById('activitymodule').children[0]);

//put details on the right
//------------------------------------------------

var parent = document.getElementById('secondary').children[0];
parent.insertBefore(document.getElementById('details-module'),parent.childNodes[0]);

//put subtasks on the right as well
//------------------------------------------------
if (document.getElementById('view-subtasks')!=null)
parent.appendChild(document.getElementById('view-subtasks'),parent.childNodes[0]);



window.onload=function(){
//scroll it all the way down
var objDiv = document.getElementById("activitymodule").children[1];
objDiv.scrollTop = objDiv.scrollHeight;

//put attachements on the right as well
//------------------------------------------------
//var parent = document.getElementById('secondary').children[0];
//if (document.getElementById('attachmentmodule')!=null) //parent.appendChild(document.getElementById('attachmentmodule'),parent.childNodes[0]);
//
}



//------------ RANDOM FUNCTIONS -------------
//-------------------------------------------


function getElementByClassName(classname){
    var rv = []; 
    var elems  = document.getElementsByTagName('*')
    if (elems.length) for (var x in elems ) if (elems[x] && elems[x].className && elems[x].className == classname) rv.push(elems[x]);
    return rv; 
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function prependElement(parentID,child) {
    parent=document.getElementById(parentID);
    parent.insertBefore(child,parent.childNodes[0]);
}
