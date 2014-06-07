// ==UserScript==
// @name        fdsdupes
// @namespace   jquery
// @include     https://research.relsci.com/LinkingAndStandardization/Linking/Index/*
// @version     1
// @resource    customCSS http://f.cl.ly/items/0J342d0U2S0o0C1F1k15/orange.css
// ==/UserScript==/*


//Google URL = https://docs.google.com/spreadsheet/ccc?key=0AlTXH_OW1CR_dHNZTEhwbGhPSXNvckFBaWxBRTBWZVE#gid=0
console.debug('start: add CSS');
var cssTxt  = GM_getResourceText("customCSS");
GM_addStyle (cssTxt);
console.debug('done: add CSS');

/****--Variables--****/
var entityName;
var entityID;
var incomingEntityName;
var incomingEnitityID;
var matrixEntityName;
var matrixEntityID;
var classification;
var note;
var fdsID;
var incomingEntityfdsID;
var userIDResult;
var matrixEntityfdsID;
var start1, end1, start3, searchResult;
var oreillyUrl;
var requestedFDSID;
var issueDesc;
/*-----Main-----*/
var fdsComments = 'Same name, parent, location';
createUI();

/* ------------Functions-----------*/
function createUI() {
    var panel = document.createElement('div');
    panel.setAttribute('style', 'background:#fff; color:#000; font-size:12px; font-family:Verdana; border:0px solid #000; padding:5px; position:absolute; bottom:50px; left:500px; text-align:left;');
    document.body.appendChild(panel);
    panel.innerHTML = '<table>'
    + '<tr><td><input type="text" id="fdsComments" style="width:250px" value="' + fdsComments + '" /></td>'
    + '<td><input type="button" id="fdsDupesButton" value="FDS Dupes" class="orange" /></td></tr>'
    + '</table>';
    console.log('sdjifhsdjkhfkjsdhfkjsdhjkf');
    var fdsButton = document.getElementById('fdsDupesButton');
    fdsButton.addEventListener('click', function () {
       console.log('Inside search Button');
       getIncomingEntityDatas();
       getMatrixDatas();
       getUserID();
       requestData();
       setTimeout(function(){setFormData();},5000);
       
    });
}
//End of createUI()

function setFormData(){
    issueDesc = document.getElementById("fdsComments").value;   
    var formKey = "1WfHjSDgLRK_ffWjdq07X5lmB2i1E2C1hkVwTWtGcclM";
    var URL = "https://docs.google.com/forms/d/"+formKey+"/formResponse?&ifq&entry.520972252="+incomingEntityfdsID+"&entry.1066981927="+incomingEntityID+"&entry.432404651="+incomingEntityName+"&entry.701105057="+matrixEntityfdsID+"&entry.160059195="+matrixEntityID+"&entry.1492772463="+requestedFDSID+"&entry.221617314="+matrixEntityName+"&entry.1904672809="+userIDResult+"&entry.943488987="+issueDesc+"&submit=Submit";
    console.log(URL);
    var win = window.open(URL,'-blank');   
    win.focus();
    console.log('Form data submitted');
}//end of setFormData()

function getUserID() {
    var elementsLI = document.getElementById('menu') .getElementsByTagName('li');
    var testData = elementsLI[18].innerHTML;
    console.log('userID : ' + testData);
    var start_result = testData.lastIndexOf('</i>&nbsp;');
    var end_result = testData.lastIndexOf('</span></a>');
    console.log('Clipping start finalResult: ' + start_result + ' end: ' + end_result);
    userIDResult = testData.substring(start_result + 10, end_result);
    console.log('final result : ' + userIDResult);
};
//end of getUserID()
function getIncomingEntityDatas() {
    getEntityNameandID('incomingHeader');
    //store Name and ID
    incomingEntityName = entityName;
    incomingEntityID = entityID;
    console.log('Incoming Entity name : ' + incomingEntityName);
    console.log('Incoming ID : ' + incomingEntityID);
    // Get Data
    getIncomingEntityValues(1);
    incomingEntityfdsID = fdsID;
    //incomingEntityNote = note;
    //incomingEntityURL = crawlerURL;
    //Print data
    console.log('Incoming fdsID : ' + incomingEntityfdsID);
    //console.log('Incoming Note : ' + incomingEntityNote);
    //console.log('Incoming Webcrawler URL : ' + incomingEntityURL);
}
//end of getIncomingEntityDatas()

function getMatrixDatas() {
    getEntityNameandID('matchHeader');
    //store Name and ID
    matrixEntityName = entityName;
    matrixEntityID = entityID;
    console.log('Matrix Entity name : ' + matrixEntityName);
    console.log('Matrix ID : ' + matrixEntityID);
    // Get Data
    getIncomingEntityValues(3);
    matrixEntityfdsID = fdsID;
    //matrixEntityNote = note;
    //matrixEntityURL = crawlerURL;
    //Print data
    console.log('Matrix fdsID : ' + matrixEntityfdsID);
    //console.log('Matrix Note : ' + matrixEntityNote);
    //console.log('Matrix Webcrawler URL : ' + matrixEntityURL);
}
//end of getMatrixDatas()

function getEntityNameandID(parent) {
    parent = document.getElementById(parent);
    //getName
    var descendants = parent.getElementsByTagName('span');
    entityName = descendants[1].innerHTML;
    //getID
    var descendants1 = parent.getElementsByTagName('a');
    entityID = descendants1[0].attributes[1].value;
}
//end of getEntityNameandID()

function getIncomingEntityValues(cellNo) {
    var table = document.getElementById('detailTable');
    for (var i = 0; i < table.rows.length; i++) {
        var row = table.rows[i];
        //console.log(row.cells[0].innerHTML.trim());
        if (row.cells[0].innerHTML == 'Fact Set Entity Id') {
            fdsID = row.cells[cellNo].getElementsByTagName('span') [0].innerHTML.trim();
        }
    }
}
//end of getIncomingEntityValues()

function requestData(){
    oreillyUrl = "https://research.relsci.com/LinkingAndStandardization/ChangeLinks/Process?leftEntity="+matrixEntityID;
    console.log('URL: ' + oreillyUrl);
    var user_agent = 'Mozilla/4.0';
    GM_xmlhttpRequest({
    method: 'GET',
    url: oreillyUrl,
    headers: {
        'User-agent': user_agent,
        'Accept': 'text/html',
    },
    onload: processOreillyResponse
});
}//end of requestData()

function processOreillyResponse(responseDetails)
{
    var oreillyHTML = responseDetails.responseText;
    //console.log('oreillyHTML : ' + oreillyHTML);
    
    start1 = oreillyHTML.indexOf('<span class="id-display">');
    start3 = oreillyHTML.indexOf('<span class="id-display">', start1 + 160);
    end1 = oreillyHTML.indexOf('&ndash; <span class="island-name">FDS</span>');
    console.log('Clipping start lastIndexof: ' + start3 + ' end: ' + end1);
    var result = oreillyHTML.substring(start1, end1 - 1);
    console.log("result : " + result);
    searchResult = result;
    var start_result = searchResult.lastIndexOf('<span class="id-display">');
    var end_result = searchResult.lastIndexOf('</span>');
    console.log('Clipping start finalResult: ' + start_result + ' end: ' + end_result);
    requestedFDSID = searchResult.substring(start_result + 25, end_result);
    console.log("final result : " + requestedFDSID);
    
    
}//end of processOreillyResponse()