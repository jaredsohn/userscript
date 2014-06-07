// ==UserScript==
// @name       House Hunting
// @namespace  http://www.edhuang.com/househunting
// @version    0.1
// @description  enter something useful
// @match      http://matrix.mlslistings.com/Matrix/Public/*
// @copyright  2012+, You
// ==/UserScript==

var url = 'http://api.cde.ca.gov/reports/API/APISearchName.asp?TheYear=&cTopic=API&cLevel=School&cName=%SCHOOL%&cCounty=&cTimeFrame=S&auto=true';
var elemIndex = 42;
var midIndex = 44;
var highIndex = 46;
var schoolIndex = [elemIndex, midIndex, highIndex];

var server = function (url)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.withCredentials = true;
    xmlhttp.open("GET",url);
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.send();
};

var loadData = function() {
    window.open('http://api.cde.ca.gov/reports/Page2.asp?subject=API&level=School');
};

function addLogWindow() {
    var div = document.createElement("div");
    div.innerHTML = "<button>Open</button>";
    div.children[0].onclick = loadData;
    div.style.position = "absolute";
    div.style.top = '10px';
    div.style.right = '10px';
    document.getElementsByTagName('body')[0].appendChild(div);
};

function callback(srt) {
    alert(str);
};

function clickHouseLink() {
    checkHouseDetailPage();
}

function showSchoolData(url) {
    try {
        var div = document.createElement("div");
        div.innerHTML = "<div style='background-color:#86CFF1;position:relative;width:100%;display:inline-block;'><div id='close' style='cursor:pointer;float:right;'><b>&nbsp;CLOSE&nbsp;</div></div><iframe src='"+url+"' width=100% height=400px ></iframe>";
        div.style.position = "absolute";
    	div.style.top = '10px';
    	div.style.left = '10px';
        div.style.height = '400px';
        div.style.width = '800px';
        div.style.margin = '20px';
        div.style.zIndex="auto";
        var nav = document.getElementById('_ctl0_m_pnlHeader');
        nav.style.visibility='hidden';
        document.getElementsByTagName('body')[0].appendChild(div);        
        var close = document.getElementById('close');
        close.addEventListener('click',function (nav) {document.getElementsByTagName('body')[0].removeChild(div); document.getElementById('_ctl0_m_pnlHeader').style.visibility='visible';});
        
    }catch (err){
    }
}

function setSchoolLink(td) {
    var span = td.children[0];
    var school = (span.innerText.split("/"))[0];
    var linkSpan = document.createElement('span');      
    
    if(school && school.length > 0) {
        school = school.replace(/\s/,"^");
        var myUrl = url.replace("%SCHOOL%",school);
        //linkSpan.innerHTML = "&nbsp;<a href='#' onClick='javascript:try{window.showModalDialog(\""+myUrl+"\"); return false; }catch(err){}'>Score</a>&nbsp;";
        linkSpan.innerHTML = "&nbsp;<font color=red>Score</font>&nbsp;";
        linkSpan.addEventListener('click',function () {showSchoolData(myUrl);});
        linkSpan.style.cursor='pointer';
        
    } else {
        linkSpan.innerHTML = "&nbsp;<font color=red>N/A</font>&nbsp;";
    }
    
    td.appendChild(linkSpan);
}

function checkHouseDetailPage() {
    
    var schoolCells = document.querySelectorAll(".d5132m2 tr");
    
    if(schoolCells.length < 1) {
        setTimeout(checkHouseDetailPage,1000);
    } else {                   
        for(var i = 0 ; i < schoolIndex.length ; i++) {
            if(schoolCells[schoolIndex[i]]) {
                setSchoolLink(schoolCells[schoolIndex[i]].children[0]);
            }
        }
    }
}

var tds = document.getElementsByClassName('d1079m6');
for(var i = 0 ; i < tds.length ; i++) {
    var td = tds[i];
    td.children[0].children[0].addEventListener('click',clickHouseLink);
}
addLogWindow();








