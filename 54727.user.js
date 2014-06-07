// ==UserScript==
// @name           Travian Ally Attack Logger
// @author         System Failure
// @description    Logs all attacks on your ally. 
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude		http://*.travian*.*/log*.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://forum.travian*.*
// @exclude 	http://board.travian*.*
// @exclude 	http://shop.travian*.*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude  	http://help.travian*.*/*log
// @exclude 	*.css
// @exclude 	*.js

// @email          systems.community@gmail.com
// @version        1.0.0.4
// ==/UserScript==
    
    function getPlayerId() {
    playerID=document.body.innerHTML.match(/<a\shref="sp\ieler\.php\?u\id=([\d]*)">[\S]*?<\/a>/i)[1]; 
	return playerID;
	}
    
    var server = location.hostname;
    var ident = getPlayerId() + server;
    var rootPath = "http://" + server + "/";
    GM_setValue(ident+"rootPath",rootPath);
    var intervalID;
    window.clearInterval(intervalID);
    
    active = GM_getValue(ident+"active",0);
    
    var newElem = document.createElement("style");
    newElem.setAttribute("type","text/css");
    newElem.innerHTML=".loggerTablePanel{padding-left:5px;}.loggerOps {border:none;}.loggerOpsSave {padding-right:0px;}.loggerOpsM{text-align:center;}"
    document.getElementsByTagName("head")[0].appendChild(newElem);
    
    var newElem = document.createElement("style");
    newElem.setAttribute("type","text/css");
    newElem.innerHTML="div.alliance table#dataTbl td.ico{width:5%;padding:0 3px;}div.alliance table#dataTbl td.sub{text-align:left;}div.alliance table#dataTbl td.al{width:25%;white-space:nowrap;}div.alliance table#dataTbl td.dat{width:23%;white-space:nowrap;}"
   document.getElementsByTagName("head")[0].appendChild(newElem);
    
    imgBegin = '<img style="cursor: pointer; "';
    imgPr = "src='data:image/gif;base64,";
    var pics = new Array;
    // play button
    startSrc = 'data:image/gif;base64,R0lGODlhGAAYAMQfAJGPmv7+/sv2snudarX4j1StIoulfnrzNorzTprzaHTnNG3aL2LHKJHXadbX1njRRtr0y05yQqf6eKbXi/Hw8W3JOF6/J7e7tX/9N3LcNoPZU8DrqGvSMG/nK3b2Lv///yH5BAEAAB8ALAAAAAAYABgAAAX/4PcFVGmeqBmIH3UZcCzP8HBR4zUIUO//QMjGRhpsgkjgZFAyCp7QqBS6bE422OkUu6lSBhOCWNwYm82bBvPbmEjIr8b7TJBI1M1GImFvOAJxdoISexprAxp6hX8kOgh7kA0Phw8aCJcPjAEBDgYVl5cak00VGQoIGJmbq5wDpwoZFYcMpgcYHJqrnQoHsAyzC7y3uS4VHhi9C79NDMG2uKsXFR0Y1cnLX83C0J0L1d/XwNsX0sffyOFNFhy1CtPn1r0ZHBaH68G8Hgf7/PsKCgvoHSrAgMMCU/8SKswQkEGBgRYKGlxAsWJFDhwYWHhIAVCEAgUsiBxJkiTICBdWGDgAEKGly5cwXd4Q4eACgJs4c+rE6UBECAA7';
    stopSrc = 'data:image/gif;base64,R0lGODlhGAAYAMQfAJxtbOtFNdA7LfSup/aOhLAvJMR5cvJ6bqN/fu/w8MdWS/TPzOpWR/7//6WkqvLz83JCRvBnWbiGgd+QiPhBL81oX42RmvD3+PO+uMC4uN/r7PmdlN3d4IV9g+Pj5f///yH5BAEAAB8ALAAAAAAYABgAAAX64Pc1T2KeaJo8jfg9GSLPdD1nz5gB2OL/wOACA8mQAAOhMjgBlJCYqHRKlTafk4F2y+1urwnAZEMum89lgzNsmBDeBol8Lje8CZPKGlA5+A8SF4KDFxoGfwd6TwoRjRESDZGSDRcGjhEKewoMjQyQk5EPFY4MmU8CDKkBn6AXFampAnsCAbUUrJMXChS1AbKntAG3oJG6vL6/YQLBw8TGtcuzzLiSz8jStgoG29zbAsfRTwXBwhTm5+e9AgV74+S98PDL7OLL7/Hq804PAAXu9gADzqPXIIO/gwIBHvRn5AOHDhAiSpxIUaKDHB88OLDAsaPHjxwdcBARAgA7';
    
    pics[0] = imgBegin+"id='startLog' src='"+ startSrc + "'>";  
    //stop button
    pics[1] = imgBegin+"id='startLog' src='"+ stopSrc + "'>"; 
    //refresh button
    pics[2] = imgBegin+"id='forceUpdate'"+imgPr+"R0lGODlhGAAYAMQfAJGQl09t3P7+/jRa6Gx5rGiE7LnF86i485ar9ml0njhh99TU1DJW2ilKxCdGuMzU9H6HqlNmqyA7oPLx8D5IeYGa97q7wOLi4S1S2J2itkJfyT5TpIaZ3yFG0TFSz////yH5BAEAAB8ALAAAAAAYABgAAAX/4PcJU2meqCmI32RBcCzPMGFNoxUZT+//wIdhYyElDsEkkJMoEQ6GqFQKnUqZTs5hy+UmIIjuFjshcBDoNJqTWUDO6kKzXOBU7ncCpE3KEPAcck4FhHcFBAsCios6hAUBcwkBjgURiRMLF4puk4SQJQkaAZMBGRMZARoZAqgaG6OpkR6jChoWBAoKDHoDChERCqMesgy5EQkKAwQJHskRFhrJDMOgDQy9GxgeEKcdHgQXFhjSDZHWvR7PiuGaE8Dk5tcKDkWL6wS98NXytaYC4RA05NM3IUEDDAPyYQCXocPAZAMwlAPlwMO1fAM0RHiYcJqDSA4aWExIEiHJjh4aOXwEJaGBSAYwY8qEmbKBhCYCLEiQ4CCky59AXfbcWeTDBQgUkipdylSpKREXMgCYSrWq1akZLogIAQA7'>" ; 
    //document button
    pics[3] = imgBegin+"id='createStats'"+imgPr+"R0lGODlhGAAYAMQfAP7+/k9y8Gh0oG9ua9TRzRwoUSgoKBUthJKRlGmF6srT9TZc6Zeq86qpq6i48Thh9zJW2ylKwyZDrrnG84CZ9XyFp/Hx8OXl5j1HdYuc3Lm7wufj20dl1t/d2jBSz////yH5BAEAAB8ALAAAAAAYABgAAAX/4PcBVmmeqAmIn6VVcCzPsWaNmjApfO//iglGQxI4gMhfRlAyTp5PIHS6bGYcWEdFwO0ystmqRZBhmBmFgVptMJzPCeY4QalTCh2AHjAwFOx1cU0JhHUFBHsACBgGGIEJAXICHISEhyQmFwQFlQkckhwBogGHfW0GCBsFowGfTR6hoocdBLUEmquiHB6SHgsLDw+HBBrFGrUFwb+8TREQwMIdpm0IHckPCxARks7Ql4kAm8ra3M/BeNOo1uPbzebCGxoN8w0EquzcHuZpCP3+A8myeWg3JoK+XxIOKFyoUMIvCAMlSTAI4V2wi9gqDpQgMQLFiiBDavTI0QIADQckIqj0yLIlS5UJiXzoUAGDzZs4c95scOPDhQb+ggoV2qCDiBAAOw=='>"; 
    //delete button
    pics[4] = imgBegin+"id='clearStats'"+imgPr+"R0lGODlhGAAYAMQfAJGTof7+/DVb6E5y9Wx4p2yI8ai59Zer9zNW3E9s16ywv9XTzyZGuWZynzdg9ylKxczU9LnF8yA7oD5IeYSc9Utju4ia2jBT1XyEpvHx8Dtb0GeA3CtR2S9Rzz1Wsf///yH5BAEAAB8ALAAAAAAYABgAAAX/4PcFWWmeqBmIX6ZgcCzPMKFko9JEUO//QEjEoyARDMEk0NIoHSPQqHQaZTothqx2y9VaMwTLYTwOkw8WwvmwaYI3lDiFsADAKRvAgiDHuwkbBYINCwEBdnmGCw2CBQl/CRuBCUWGAACGAQoJBZKPThoJA6OUmZmbowMJGn+hqQMalYYKGq8JHX8dGgIOvRyYmQAcvQ4CGrhODwi8DhwYppbDxQgPf8q8F8CasgAX09UlDdcOHoWaFxyVCx7fbuLLvRULCh29FwoLFb0C1O4PF/DIaSDmQAO7aRfAZWjAoMMyZgQJCuDXgYE7Bg8cPpzIkSMCBB0eWHQi4UFGgB9TLaq8EPKBhCaaJEhgQNOkzZsiacos8mEBhglAgwodGhQAjhYKLildynTpAhEhAAA7'>"; 
    //tools button
    pics[5] = imgBegin+"id='showSettings'"+imgPr+"R0lGODlhGAAYAMQfADRb6ml0oHOM6Uxv7Ke38ZOSmczU9Dhh+Jao7rjE8TNW2ylKxCA7oP7+/iVFuUdm2T5Je/Py8uTo+IGZ8HyEpvDw74uc3PHz+ra3v2B51zpZzt/f4S1PyzBS0WJ+6P///yH5BAEAAB8ALAAAAAAYABgAAAX/4Pc1UWWeaFpFjfhFGCXPdD1j0YgFieH/wKAhAcGQAgShMmgJlJCJqHRKlTafFoJ2i4huv9prJWBBmM+GxiVh1p4RAudYMKlPEJeGwY6H2zNyARkChAJpDQkeEwIEFwJmhIBPDx4eAg16EogDApoXFQKVD4EPA6ZplXkJmnsepgMagRqlpgIDBx55erevDx2BHAoAB8TEA5qIw8QAChyBC8LFnKx5BsrMC8/RAAK6CdyY1gDY2sMACJYNHgfgDRsP5E/Q1wATErfsE8nxYwsd0ezQKWPnYRyADtmeOPg3jl3DYg6ZdXAQyAGHf8IMahynQEEHDhQjRAjAYMFFjB1TMKbs8HEBAycNMDBg4MDBgps4c96sOdPIhw0UIAgdSrTo0AI5fmIowLSp06dNN4gIAQA7'>";
    //save button
    pics[6]= "<img style='cursor: pointer; position: relative; float: right;' id='setUpdateRate'"+imgPr+"R0lGODlhGAAYAMQfAJKRmHiDry1Pzbm7w3B5oSdGusLDyFt00Nzc2mdyn/Dw7////5OcvypW97W+38/X9iE8oKKowfPz8T5IeVttrufl3uTk46e040NcuM7P0d/e236S3JKi3B1H4Pn37////yH5BAEAAB8ALAAAAAAYABgAAAX/4PctkmKeaKpIi/hJQyDPdC0TgzQOlPP8wKDw4cAMSITLz8FsOp0/TqKUdDAGGYN2y80yHFIqhzOwGBbotNpgyTA2UwVhs8lEKAi1WpKIaOhxcwF2Bxp6aRIBEQgBB4EHB4SGhyQUi5CPkREYk4cSlggUjlQYGHaclAseGAwapYECAm4CFamrrRgCcQkCBbM2NAKtBbolvL4MDQ0UNhTKw8UKx24NAhoeGp0VAg3Qu73UtAwdBRZoFRjdGsTfvhEd4tXmC9vq7MYFBQwLBBAV4wUmVcg3rMAuYgWOGLIw4EwaDQg8ZMh3MFaBCBkyatSykQJFCRL6EeuVr6TJkxCmKCwYAAFCyVgwY5Is0PLIBw0EJujcybPnzgg6PliIAKCo0aNIi7YSEQIAOw=='>"; 
    
    
    function addInterface()
    {
    var element = document.getElementById("loggerTable");
        if (!element)//anti-bug
        {
            if (active=="1")
            {    
            playStopButton = pics[1];   
            }
            else
            {
            playStopButton = pics[0];
            }    
        var tableHTML = '<table border="0" id="loggerTable">';
        tableHTML+='<tr class="loggerTablePanel">';
        tableHTML+='<td style="padding-left:4px;">' + playStopButton+pics[2]+pics[3]+pics[4]+pics[5] + '</td>';
        tableHTML+='</tr>';
        tableHTML+='<tr>';
        tableHTML+='<td id="infoTD"></td>';
        tableHTML+='</tr>';
        tableHTML+='</table>';
        document.getElementById("side_navi").innerHTML = document.getElementById("side_navi").innerHTML+=tableHTML;
		
        infoBarChange();
		
         } 
    }
    updateData();
    addInterface();   
    
    var newElem = document.createElement("div");
    newElem.id="outputDiv";
    newElem.setAttribute("class","alliance");
    newElem.setAttribute("style","position:absolute; top:100px; left:115px; z-index:2001;")
    document.body.appendChild(newElem);
    
    function showSettings()
{
checkNew=GM_getValue("checkNew","0");
if (checkNew=="1")
{
showValue='checked';
showText='Show';
}
else
{
showValue='unchecked';
showText="Don't Show";
}

var settingsHTML = '<td><table class="loggerOps" border="0" width="100%"><tr width="100%"><th colspan="2" width="100%" style="background-color:#BCBCBC"><b>Set update rate:</b></th></tr><tr><td class="loggerOpsM">min</td><td class="loggerOpsM">max</td></tr><tr><td class="loggerOpsM"><input type="text" id="setMinUpdateRate" size="1" align="left" value="' + GM_getValue(ident+"minUpdateRate",300000)/1000/60 + '"></td><td class="loggerOpsM"><input type="text" id="setMaxUpdateRate" size="1" align="right" value="' + GM_getValue(ident+"maxUpdateRate",600000)/1000/60 + '"></td></tr><tr width="100%"><th colspan="2" width="100%" style="background-color:#BCBCBC;text-align:left"><b>Show if new logs are available: </b></th></tr><tr><td style="padding-left:4px;" colspan="2"><input type="checkbox" id="checkNew" '+ showValue +'><span id="showText">' + " " + showText + '</span></td></tr><tr><td id="loggerOpsSave" class="loggerOpsSave" width="50%"></td><td width="50%">' + pics[6] + '</td></tr></table></td>'
var element = document.getElementById("settingsTR");
    if (element)
    {
    var oNodeToRemove = document.getElementById("settingsTR");
    oNodeToRemove.parentNode.removeChild(oNodeToRemove);
    }
    else
    {
    var newElem = document.createElement("tr");
    newElem.id="settingsTR";
    newElem.innerHTML= settingsHTML;
    document.getElementById("loggerTable").appendChild(newElem);
    document.getElementById("checkNew").addEventListener("click", function() {changeShowText()}, false);
    document.getElementById("setUpdateRate").addEventListener("click", function() {saveSettings()}, false);
    }
}
    
 function intervalStarter()  
 { 
 active = GM_getValue(ident+"active",0);
    if (active == "1")
    {
    intervalID = setInterval(updateData, 120000);
    }
    else
    {
    window.clearInterval(intervalID);
    }      
 }  

function setUpdateRate()
    {
        if (typeof (document.getElementById("setMinUpdateRate").value == "number"))
        {
        var minUpdateRate = document.getElementById("setMinUpdateRate").value*1000*60;
        GM_setValue(ident+"minUpdateRate",minUpdateRate);
        }
        else
        {
        alert("type of MinUpdateRate value is not a number");
        }
        if (typeof (document.getElementById("setMaxUpdateRate").value == "number"))
        {        
        var maxUpdateRate = document.getElementById("setMaxUpdateRate").value*1000*60;
        GM_setValue(ident+"maxUpdateRate",maxUpdateRate);
        }
        else
        {
        alert("type of MaxUpdateRate value is not a number");
        }
    }
    
function saveSettings()
    {
    setUpdateRate();
    document.getElementById("loggerOpsSave").innerHTML = "Saved!";
    setTimeout(delSav,1500);
    setTimeout(hideSettings,1500);
    if (document.getElementById("checkNew").checked==true)
    {
    GM_setValue("checkNew","1");
    }
    else
    {
    GM_setValue("checkNew","0");
    }
    
    }
    
function delSav()
    {
    document.getElementById("loggerOpsSave").innerHTML = "";
    }

function hideSettings()
    {
    var element = document.getElementById("settingsTR");
        if (element)
        {
        var oNodeToRemove = document.getElementById("settingsTR");
        oNodeToRemove.parentNode.removeChild(oNodeToRemove);
        }    
    }
  
function randomNumber (m,n)
    {
    m = parseInt(m);
    n = parseInt(n);
    return Math.floor( Math.random() * (n - m + 1) ) + m;
    }
    
function switcher()
    {
        if (document.getElementById("startLog").src == startSrc )
        {            
            document.getElementById("startLog").src = stopSrc;//stop
            GM_setValue(ident+"active",1);
            updateData();
        }
        else
        {
            GM_setValue(ident+"active",0);
            document.getElementById("startLog").src = startSrc;//start
            window.clearInterval(intervalID);
        }    
    }   

function pauseScript(millis)
{
var date = new Date();
var currDate = null;

do { currDate = new Date(); }
while(currDate-date < millis);
} 

function updateData()
{
lastUpdate = Number(GM_getValue(ident+"lastUpdate",0));
d = new Date();
curTime = d.getTime();
time2wait = Number(GM_getValue(ident+"time2wait",0));
active = GM_getValue(ident+"active",0);
var nextUpdate = lastUpdate+time2wait;
    if (active == "1")
        {
            if (curTime>nextUpdate)
            {
            requestData();
            }
        }
        else
        {
        window.clearInterval(intervalID);
        }
}

function requestData()
{
    //anti-bug begin
    var element = document.getElementById("loggerTable");
        if (!element)
        {
        addInterface();
        }
    //anti-bug end
    document.getElementById("infoTD").innerHTML = "Updating...";
    rootPath = GM_getValue(ident+"rootPath","");
    pauseScript(1000);    
    GM_setValue(ident+"lastUpdate",uneval(curTime));
    GM_xmlhttpRequest
    ({
        method: 'GET',
        url: rootPath+'allianz.php?s=3',
        headers: {
            'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.9.0.11) Gecko/2009060215 Firefox/3.0.11',
            'Accept': 'text/html,application/xhtml+xml,application/xml',
            'Accept-Lanuage': 'ru,en-us',
            'Accept-Encoding': 'gzip,deflate',
            'Accept-Charset': 'windows-1251,utf-8',
            'Keep-Alive': '300',
            'Connection': 'keep-alive',
        },
        onload: function(responseDetails) 
        {        
        responseHTML = document.createElement('div');
        responseHTML.id = "responseHTML";            
        responseHTML.innerHTML = responseDetails.responseText.match(/<table[\s\S]*?id="offs">([\s\S]*?)<\/table>/i)[0];
        responseHTML.setAttribute("style","display:none");        
        var element = document.getElementById("responseHTML");
            if (element)
            {
            var oNodeToRemove = document.getElementById("responseHTML");
            oNodeToRemove.parentNode.removeChild(oNodeToRemove);
            document.body.appendChild(responseHTML);        
            }
            else
            {   
            document.body.appendChild(responseHTML);
            }      
            var table = document.getElementById("offs");
                    for (i=0 ;i<table.rows.length ;i++ )
                    {
                        if (table.rows[i].cells[0].childNodes.item(0).className === 'def1')
                        {
                        splitResult = table.rows[i].cells[1].childNodes.item(0).href.split("=",2);                    
                        linkID=splitResult[1];
                        logData = eval(GM_getValue(ident+"logData","[]"));
                        logedIds = eval(GM_getValue(ident+"logedIds","[[]]"));
                        str = uneval(logedIds); 
                                if (str.indexOf(linkID) == "-1")
                                {
                                logedIds[logedIds.length] = new Array;
                                logedIds[logedIds.length-1][0] = 0;
                                logedIds[logedIds.length-1][1] = linkID;
                                logData[logData.length] = table.rows[i].innerHTML;
                                GM_setValue(ident+"logData",uneval(logData));
                                GM_setValue(ident+"logedIds",uneval(logedIds));
                                }                
                        }
                    }
					if (d.getMinutes()<10)
					{
					lastUpdateMinutes = "0" + d.getMinutes();
					}
					else
					{
					lastUpdateMinutes = d.getMinutes();
					}
					lastUpdateTime = d.getHours() + ":" + lastUpdateMinutes;
					GM_setValue(ident+"lastUpdateTime",lastUpdateTime);
                    rndNmbr = randomNumber (GM_getValue(ident+"minUpdateRate",300000),GM_getValue(ident+"maxUpdateRate",600000));
                    infoBarChange();  
                    GM_setValue(ident+"time2wait",rndNmbr); 
                }
    });
}

function infoBarChange()
{
active = GM_getValue(ident+"active","0");
if (active == "1")
{
    checkNew=GM_getValue("checkNew","0");
    //anti-bug begin
    var element = document.getElementById("loggerTable");
        if (!element)
        {
        addInterface();
        }
    //anti-bug end
        if (checkNew=="1")
        {
        if (newCheck()>0)
            {
            document.getElementById("infoTD").innerHTML = "<font color='red'>new logs! (" + newCheck() + ")</font>";
            setTimeout(showLastUpdate,5000);
            setTimeout(infoBarChange,10000);
            }
            else
            {
            showLastUpdate();
            }
        }
        else
        {
        showLastUpdate();
        }
}
    
}


function showLastUpdate()
{
active = GM_getValue(ident+"active","0");
lastUpdateTime = GM_getValue(ident+"lastUpdateTime","??:??");
	if (active == "1")
	{		
	document.getElementById("infoTD").innerHTML = "Updated at: " + lastUpdateTime;	
	}
}

function newCheck()
{
logedIds = eval(GM_getValue(ident+"logedIds","[[]]"));
var newLogs = 0;
    for (i=0 ;i<logedIds.length ;i++ )
    {
        if (logedIds[i][0]==0)
        {
        newLogs = newLogs + 1;
        }
    }
return newLogs;
}

function checkID()
{
active = GM_getValue(ident+"active","0");
if (active == "1")
	{
	checkNew=GM_getValue("checkNew","0");
	if (checkNew=="1")
		{
			str = document.location.href;
			if (str.indexOf("berichte") == "-1" )
				{
				}
				else
				{
				curID = document.location.href.split("=",2)[1];
				logedIds = eval(GM_getValue(ident+"logedIds","[[]]"));
					for (i=0 ;i<logedIds.length ;i++ )
					{        
					curID = Number(curID);
					logedIds[i][1] = Number(logedIds[i][1]);        
						if (logedIds[i][1]===curID)
						{
						logedIds[i][0]=1;
						GM_setValue(ident+"logedIds",uneval(logedIds));
						}
					}
			infoBarChange();
				}
		}

	}
}

    function createStats()
    {
    var element = document.getElementById("dataTbl");
        if (element)
        {
        var oNodeToRemove = document.getElementById("dataTbl");
        oNodeToRemove.parentNode.removeChild(oNodeToRemove);
        document.getElementById("outputDiv").style.display="none";
        //createStats();
        }
        else
        {
        document.getElementById("outputDiv").style.display="";
        //create table
        logData = eval(GM_getValue(ident+"logData","[]"));
        var newElem = document.createElement("table");
        newElem.id="dataTbl";
        newElem.setAttribute("border","1");
        newElem.setAttribute("width","500");
        newElem.setAttribute("bgcolor","white");
        newElem.setAttribute("style","z-index:2001;");
        document.getElementById("outputDiv").appendChild(newElem);
        //create thead
        var newElem = document.createElement("thead");
        newElem.id="dataTblThead";
        document.getElementById("dataTbl").appendChild(newElem);
        //create tr
        var newElem = document.createElement("tr");
        newElem.id="dataTblTr";
        document.getElementById("dataTblThead").appendChild(newElem);
        //create th
        var newElem = document.createElement("th");
        newElem.id="dataTblTh";
        newElem.setAttribute("colspan","4");
        newElem.innerHTML = "Attacks:";
        document.getElementById("dataTblTr").appendChild(newElem);
        //create tr
        var newElem = document.createElement("tr");
        newElem.id="dataTblTr2";
        document.getElementById("dataTblThead").appendChild(newElem);
        //create td
        var newElem = document.createElement("td");
        newElem.id="dataTblTd1";
        newElem.innerHTML="&nbsp;";
        document.getElementById("dataTblTr2").appendChild(newElem);
        //create td
        var newElem = document.createElement("td");
        newElem.id="dataTblTd2";
        newElem.innerHTML="Player";
        document.getElementById("dataTblTr2").appendChild(newElem);
        //create td
        var newElem = document.createElement("td");
        newElem.id="dataTblTd3";
        newElem.innerHTML="Ally";
        document.getElementById("dataTblTr2").appendChild(newElem);
        //create td
        var newElem = document.createElement("td");
        newElem.id="dataTblTd4";
        newElem.innerHTML="Date";
        document.getElementById("dataTblTr2").appendChild(newElem);        
        //create tbody
        var newElem = document.createElement("tbody");
        newElem.id="dataTblTbody";
        document.getElementById("dataTbl").appendChild(newElem);
            for (i=0 ;i<logData.length ;i++ )
            {
            document.getElementById("dataTblTbody").insertRow(0);
            document.getElementById("dataTblTbody").rows[0].innerHTML = logData[i];
            }
        }
    }
    
	function clearStats()
    {
    var x=window.confirm("Delete ALL attack logs?!")
        if (x){
        logData = eval(GM_getValue(ident+"logData","[]"));
        logData = logData.splice(0, 0);
        GM_setValue(ident+"logData",uneval(logData));
    
        logedIds = eval(GM_getValue(ident+"logedIds","[]"));
        logedIds = logedIds.splice(0, 0);
        GM_setValue(ident+"logedIds",uneval(logedIds));
        }
    }
    
function changeShowText()
{
 if (document.getElementById("checkNew").checked==true)
    {
    document.getElementById("showText").innerHTML="Show";
    }
    else
    {
    document.getElementById("showText").innerHTML="Don't show";
    }
}

//let's go  
if (active == "1")
{
intervalStarter();
}
checkID();



document.getElementById("startLog").addEventListener("click", function() {switcher()}, false);
document.getElementById("createStats").addEventListener("click", function() {createStats()}, false);
document.getElementById("clearStats").addEventListener("click", function() {clearStats()}, false);
document.getElementById("showSettings").addEventListener("click", function() {showSettings()}, false);
document.getElementById("forceUpdate").addEventListener("click", function() {requestData()}, false);
