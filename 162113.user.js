// ==UserScript==
// @name        BoomiProcessState
// @namespace   https://www.boomi.com
// @description Expand the box and the Process State Information tree
// @include     https://platform.boomi.com/*
// @grant       none
// @version     2.6
// ==/UserScript==

// Copyright 2013 - Stephan Warren, San Francisco, CA
// You're free to modify and change this code as long as you leave this copyright & notice intact
// and note your revisions. This software may not be sold. Boomi is allowed to incorporate these changes
// in their product


function noteCDATA(index, msg) {
	try {
		var script = document.createElement('script');
		script.setAttribute("type", "application/javascript");
		script.setAttribute("id", "XXXXXXXXXXXXXX-StephanWarrenzScript-XXXXXXXXXXXXXX");
		script.textContent ="\n<!--\n/*\n//<![CDATA[\n" + msg + "\n//]]>\n*/\n -->\n";
		document.head.appendChild(script);
	}
	catch(err) {
		alert(err);
	}
}

// simulate a mouse down event
function simMD(elem) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("mousedown", true, true, window,  0, 0, 0, 0, 0, false, false, false, false, 0, null);
  // var cb = document.getElementById(ident); 
  var canceled = !elem.dispatchEvent(evt);
}				
function parseZInt(str)
{
   while(str.indexOf("0") == 0) {
       if(str.length == 1) break; 
	   str = str.substr(1);
   }	
   return(parseInt(str));
}
function parseDuration(durationStr)
{
    var durationSecs = 0;
    var dStr = durationStr.split(':');
    if(dStr.length > 0) {
        durationSecs += parseZInt(dStr[dStr.length - 1]);
//        console.log("ds1 = %d, ss = %s", durationSecs, dStr[dStr.length - 1]);
        if(dStr.length > 1) {
            durationSecs += 60 * parseZInt(dStr[dStr.length - 2]);
 //           console.log("ds2 = %d, ss = %s", durationSecs, dStr[dStr.length - 2]);
            if(dStr.length > 2) {
                durationSecs += 3600 * parseZInt(dStr[dStr.length - 3]);
 //               console.log("ds3 = %d, ss = %s", durationSecs, dStr[dStr.length - 3]);
            }
        }
    }
                     
    return(durationSecs);
}

function parseStrTimeStamp(strTimeStamp)
{
// 2011-07-08 20:40:41.417 
// 01234567890123456789012
    if(strTimeStamp.length != 23)  
	    alert("TimeStamp (" + strTimeStamp + ") messed up (not equal to 23 chars), instead " + strTimeStamp.length + " chars.");
	oTimeStamp = new Date(
		parseZInt(strTimeStamp.substr(0,4)),   // year (4 digit)
		parseZInt(strTimeStamp.substr(5,2))-1, // month (0-11)
		parseZInt(strTimeStamp.substr(8,2)),   // day
		parseZInt(strTimeStamp.substr(11,2)),  // hour
		parseZInt(strTimeStamp.substr(14,2)),  // minute
		parseZInt(strTimeStamp.substr(17,2)),  // seconds
		parseZInt(strTimeStamp.substr(20,3))   // milliseconds
	);
/*
	console.log("strTimeStamp: \n"+ strTimeStamp + 
	       "\noTimeStamp    = " + oTimeStamp.getTime() +
	       "\noTimeStampoff = " + (oTimeStamp.getTime() - oTimeStamp.getTimezoneOffset()) +
	       "\nY" +
		parseZInt(strTimeStamp.substr(0,4)) +" M"+   // year (4 digit)
		(parseZInt(strTimeStamp.substr(5,2)) - 1) +" D"+ // month (0-11)
		parseZInt(strTimeStamp.substr(8,2))+" H"+   // day
		parseZInt(strTimeStamp.substr(11,2))+" M"+  // hour
		parseZInt(strTimeStamp.substr(14,2))+" S"+  // minute
		parseZInt(strTimeStamp.substr(17,2))+" m"+  // seconds
		parseZInt(strTimeStamp.substr(20,3))+   // milliseconds
		"\noTScvt = " + oTimeStamp.toString() +
		""
	);
*/
    return(oTimeStamp);
}


function showChart()
{
 //   alert("show chart"); 
    var chartHTML =       
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
    '<html xmlns="http://www.w3.org/1999/xhtml">\n' +
    '  <head>\n' +
    '    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>\n' +
    '    <title>\n' +
    '      SWz Time Line Chart\n' +
    '    </title>\n' +
    '    <script type="text/javascript" src="http://www.google.com/jsapi"></script>\n' +
    '    <script type="text/javascript">\n' +
    '     google.load("visualization", "1", {packages: ["corechart"]});\n' +
    '       function drawVisualization() {\n' +
    '       var data = google.visualization.arrayToDataTable(\n' +
    '        ' + JSON.stringify(durationChart).replace('],["','],\n        ["','g') + '\n' +
    '       );\n' +
    '        // alert(JSON.stringify(tdata));\n' +
    '        // Create and draw the visualization.\n' +
    '        new google.visualization.BarChart(document.getElementById("visualization")).\n' +
    '            draw(data,\n' +
    '                {\n' +
    '                    title:"Process Time Lines",\n' +
    '                    legend: {position:"none"},\n' +
    '                    backgroundColor:"white",\n' +
//    '                    colors:["white","#F8F8F8","#000000","#F8F8F8"],\n' +
      '                    colors:["white","yellow","red","yellow"],\n' +
    '//					width:1200, \n' +
    '//					height:800,\n' +
    '                    width: window.innerWidth || document.body.clientWidth,\n' +
    '                    height: window.innerHeight || document.body.clientHeight,\n' +
    '                    vAxis: {title: "Process", baselineColor: "black", textStyle:{fontSize:9}},\n' +
    '                    hAxis: {title: "Time(secs)"},\n' +
    '                    isStacked: true\n' +
    '                }\n' +
    '            )\n' +
    '    }\n' +
    '      google.setOnLoadCallback(drawVisualization);\n' +
    '    </script>\n' +
    '  </head>\n' +
    '  <body style="font-family: Arial;border: 0 none;">\n' +
    '    <div id="visualization" ></div>\n' +
    '  </body>\n' +
    '</html>\n' +
'\n';

 //   console.log(chartHTML);
    var x = window.open('data:text/html;base64,'+ window.btoa(chartHTML), '_blank');// ,'width=335,height=330,resizable=1');
   
}


function timeSlices()
{
	var connectorIcon = 
		"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACFUlEQVR42t2Tz2" +
		"uScRzHHxiDbkXX8NCfsKJTUB06GV0qD9FFQezQ49Q2mJqeJOpBjWKuBYGIqaWZ" +
		"+QOh55lPueHmVFBMfWSKs/IxGTLZSJHt8Lx79CYuukaf2/fz4/V5fz4fvgTxfx" + 
		"hN05J6vR5rtVqH0WjUnUwmXyYSidd+v98QDAbn/goIBAJ5juNQKBQwHA4xssFg" +
		"AJ7nkclkhHg8vuFyuS7+EWC1Wussy6LdbqPb7aLX66HRaCCbzUJUg1gsBofDcW" +
		"wymTQnAsSgNp1Oo1KpjDoin8+j2WyiVquNfcVicewTlQhms5maAthsNsrr9SIU" +
		"CiGXy+Hbdx7VakMsLI3fW1vbYJMZMGub8Hr9Aklqr00AjEaj2WAwwOl04kerg3" +
		"qJQadKIbudRiqVRuJzCvv5GxjySjDRV9AsmGwTAI1Gc0mhUAjiBVCt/UQnIRG3" +
		"qES/cRcMTSMWDmMvQgAHd4D+PDY8V31TY6hUqqDH40GZayLy7AJ+rYsFR49wwN" +
		"1C+GME9oeXUXYTENq3AcEi7K9LLBMAnU53Vq/X73wtleF7F4ZzYRZt5pSYvIrd" +
		"lBTPV97i6fwVfLIR2Ksugv1wsz+lgiTJ8xRF7dIMC5/7DZbvEyhG57D2/jpWHc" +
		"tY1Fs2l6SE3aIgjl+Qp50nnlQul59Rq9WPn1D2nSXtgyNSOnuov3fui1JJKmQy" +
		"2cwoR0YQM//OP/oNqPtk1kFkcJQAAAAASUVORK5CYII="
	
	var aStr = "";
	var connDur = 0;
	var procDur = 0;
	var ptStr = "NOT FOUND";
	var xn = FastTreeElem.getElementsByClassName("gwt-ImageTreeItem");
	try {
		// console.log("len = " + xn.length);
		for(var i = 0; i < xn.length; i++) {
		//	console.log(xn[i].childNodes[1].textContent);
		//	console.log(xn[i].childNodes[0].style.background);
			// console.log(xn[i].childNodes[1].textContent);
			if(xn[i].childNodes[0].style.background.indexOf(connectorIcon) > 0) {
	//			console.log("**connector");
				tcStr = xn[i].childNodes[1].textContent;
				console.log(tcStr);		
				var index =  tcStr.indexOf(' completed in ');
				if(index > 0) {
					index += 14;
                    console.log("tcStr = " + tcStr.substr(index, tcStr.length - 1 - index));
					connDur += parseFloat(tcStr.substr(index, tcStr.length - 1 - index));
				//	console.log("connDur = %f", connDur);
					var tStr = '"' + xn[i].childNodes[1].textContent.replace(' completed in ', '", ');
					// console.log(tStr);	
					aStr = aStr + tStr.substr(0, tStr.length - 1) + '\n';
					// console.log(aStr);
				}
				else {
					console.log("Note: No time component in " + tcStr);
				}
			}
			else if(xn[i].childNodes[1].textContent.indexOf("Process Complete in ") > -1) {
				ptStr = xn[i].childNodes[1].textContent.substring(20);
                console.log("ptStr = "  + ptStr.substr(0, ptStr.length - 1));
				procDur = parseFloat(ptStr.substr(0, ptStr.length - 1));
				// console.log("procDur = %f", procDur);
				ptStr = ptStr.substr(0, ptStr.length - 1);
			}	
		}
	}
	catch(err) {
		console.log(err);
		alert(err);
	}
	alert('\n'+
		'"Process Duration", '+ ptStr + '\n' + 
		aStr + 
		'==========================================\n'+
		'"Connections Duration", ' + connDur.toFixed(3) + '\n' +
		'"Non-Connections Duration", ' + (procDur - connDur).toFixed(3)
	);
	
}

function insertButtons()
{
	try{
		var elem = document.getElementsByClassName("dialogSaveButton");
		if(elem.length == 1) {
            if(FASTTREEOPEN == false) {
                if(VIRGIN) {
                    elem[0].outerHTML = '<button style="" class="dialogSaveButton" type="button" onclick="expand();resizeDialog();">Expand</button>';
                } else {
                    elem[0].outerHTML = '<button style="" class="dialogSaveButton" type="button" onclick="relapse();">Expand</button>';
                }
            } else {
			    elem[0].outerHTML = '<button style="" class="dialogSaveButton" type="button" onclick="relapse();" >Collapse</button>';
            }
		}  else {
            alert("Boomi Page incompatible with SW's GM Script for adding expand button (length = "+elem.length+").");
		} 
	}
	catch(err) {
	   alert("Error from PB1:\n" + err);
	}
    if(VIRGIN) {
        // console.log("IBut V = "+ ((VIRGIN) ? "T" : "F"));
        VIRGIN = false;
        try{
            var elem = document.getElementsByClassName("dialogCloseButton");
            if(elem.length != 1) alert("Boomi Page incompatible with SW's GM Script for adding Close button");
            else {
                elem[0].innerHTML = 'Done';
           //     console.log(elem[0].outerHTML);
                elem[0].addEventListener("click", function() {timeSlices(); launchPSO();}, false);
            }		 
            // alert(elem[0].innerHTML);
        }
        catch(err) {
           alert("Error from PB2:\n" + err);
        }
    }
}

function animateResizeDialog()
{
//    while(finalizedResize < 0x0f) {
        moveSlice = (moveSlice > 1) ? parseInt(moveSlice * 0.9) : 2; 
        var dTi = parseInt(0.5 + (parseInt(dialogAnchor.style.top) - dTnew) / moveSlice);
        var dLi = parseInt(0.5 + (parseInt(dialogAnchor.style.left) - dLnew) / moveSlice);
        var dHi = parseInt(0.5 + (dHnew - parseInt(dialogSize.style.height) ) / 2 / moveSlice);
        var dWi = parseInt(0.5 + (dWnew - parseInt(dialogSize.style.width)) / 2 / moveSlice);
        if(dTi < 1) dTi = 1;
        if(dLi < 1) dLi = 1;
        if(dHi < 1) dHi = 1;
        if(dWi < 1) dWi = 1;
 
//        console.log("Increments:  dTi = %d, dLi = %d, dHi = %d, dWi = %d", dTi, dLi, dHi, dWi); 
        // console.log("T-CNI: %d, %d, %d", parseInt(dialogAnchor.style.top), dTnew, -dTi);
        if(parseInt(dialogAnchor.style.top) > dTnew) {
            dialogAnchor.style.top = (parseInt(dialogAnchor.style.top) - dTi) + 'px';
            if(parseInt(dialogSize.style.height) < dHnew) {
                dialogSize.style.height = (parseInt(dialogSize.style.height) + dHi) + 'px';
            } else {
                finalizedResize |= 0x01;
            }
        } else {
            finalizedResize |= 0x04;
        }
        // console.log("L-CNI: %d, %d, %d", parseInt(dialogAnchor.style.left), dLnew, -dLi);
        if(parseInt(dialogAnchor.style.left) > dLnew) {
            dialogAnchor.style.left = (parseInt(dialogAnchor.style.left) - dLi) + 'px';
            if(parseInt(dialogSize.style.width) < dWnew) {
                dialogSize.style.width = (parseInt(dialogSize.style.width) + dWi) + 'px';
            } else {
                finalizedResize |= 0x02;
            }
        } else {
            finalizedResize |= 0x08;
        }

        if(parseInt(dialogSize.style.height) < dHnew) {
            dialogSize.style.height = (parseInt(dialogSize.style.height) + dHi) + 'px';
        } else {
            finalizedResize |= 0x01;
        }
        if(parseInt(dialogSize.style.width) < dWnew) {
            dialogSize.style.width = (parseInt(dialogSize.style.width) + dWi) + 'px';
        } else {
            finalizedResize |= 0x02;
        }
    //  }
    if(finalizedResize == 0x0f) clearInterval(animationIntervalId);
    else { 
        clearInterval(animationIntervalId);
        if((dLi + dTi + dHi + dWi) < 5)  animationIntervalId = setInterval("animateResizeDialog()", 40);
        else animationIntervalId = setInterval("animateResizeDialog()", 75);
    }
}


function resizeDialog()
{
//    console.log("RESIZE STARTED");
    try {
        var panelSize = document.getElementsByClassName("gwt-PopupPanelGlass");
        if(panelSize.length == 1) {
            dialogAnchor = document.getElementsByClassName("gwt-DialogBox");
            // alert(dialogAnchor[0].innerHTML);
            dialogSize = document.getElementsByClassName("dialogMiddleCenterInner dialogContent");
            // alert(dialogSize[0].innerHTML);
            if((dialogAnchor.length == 1) && (dialogSize.length == 1)) {
                dialogAnchor = dialogAnchor[0];
                dialogSize = dialogSize[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0];
                console.log("pre-Size: cTn = %d, cLn = %d, cHn = %d, cWn = %d", 
                    parseInt(dialogAnchor.style.top), 
                    parseInt(dialogAnchor.style.left),
                    parseInt(dialogSize.style.height), 
                    parseInt(dialogSize.style.width)
                );               
                var pH = parseInt(panelSize[0].style.height);
                var pW = parseInt(panelSize[0].style.width);
//                console.log("Panel: pH = %d, pW = %d", pH, pW); 
                dHnew = parseInt(0.5 + (pH * 8) / 10);
                dWnew = parseInt(0.5 +(pW * 5) / 10);
//                console.log("Dsize: dHn = %d to dWn = %d", dHnew, dWnew); 
                var dH = parseInt(dialogSize.style.height);
                var dW = parseInt(dialogSize.style.width);
                
                if (dH > dHnew) {
                    dHnew = dH; 
                    dTnew = parseInt(dialogAnchor.style.top);
                }
                else {
                    dTnew = parseInt(0.5 + (((pH * 9) / 10) - dHnew ) / 2); // account a little for bottom row buttons
                }
                if (dW > dWnew) {
                    dWnew = dW; 
                    dLnew = parseInt(dialogAnchor.style.left);
                }
                else {
                    dLnew = parseInt(0.5 +(pW - dWnew ) / 2);
                }
//                console.log("Targets: dTn = %d, dLn = %d, dHn = %d, dWn = %d", dTnew, dLnew, dHnew, dWnew); 
                finalizedResize = 0;
                moveSlice = 25;
                // comment out the following to kill animation and uncomment the block below
                animateResizeDialog();
                
                /*
                dialogSize.style.height = dHnew + 'px';
                dialogSize.style.width = dWnew + 'px';
                dialogAnchor.style.top = dTnew + 'px';
                dialogAnchor.style.left = dLnew + 'px';
                */
            }
        }
    }
    catch(err) {
        alert("GM Script Resize error " + err);
    }

}


function expand()
{
	// from head node and do getElementsByClassName on class = closed	
	// console.log("ClosedElem len = " + ClosedElem.length);
	for(var i = 0; i < ClosedElem.length; i++) {
		if((i + 1) == ClosedElem.length) {
			launchFTO();
		}
		simMD(ClosedElem[i]);
	}
	if(ClosedElem.length == 0) {
		console.log("Expand done - calling insButtons");
        FASTTREEOPEN = true;
		insertButtons();
       // resizeDialog();
	}
}

function relapse()
{
   // var elems = FastTreeElem.childNodes[1].getElementsByClassName('closed');
   // if(elems.length > 0) {
    //}
    console.log('relapse = ' + ((FASTTREEOPEN) ? 'closing': 'opening'));
    
    var elems = FastTreeElem.childNodes[1].getElementsByClassName((FASTTREEOPEN == true) ? "open" : "closed");
    for(var i = 0; i < elems.length; i++) {
        simMD(elems[i]);
    }
    FASTTREEOPEN = !FASTTREEOPEN;
    console.log('FASTTREEOPEN state is now ' + ((FASTTREEOPEN) ? 'true': 'false'));
    insertButtons();
 }

/////////////// GLOBALS //////////////
var Globals = 
"var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;\n" +
"var FastTreeElem;\n" +
"var ClosedElem;\n" +
"var VIRGIN = true;\n" +
"var PSO_ACTIVE = false;\n" +
"var FASTTREEOPEN = false;\n" +
"var dialogSize;\n" +
"var dialogAnchor;\n" +
"var dTnew, dLnew, dHnew, dBnew;\n" +
"var finalizedResize = 0;\n" +
"var animationIntervalId;\n" +
"var moveSlice;\n" +
"var durationChart = [];\n" +
"\n" +



"launchPSO();\n"+
"\n";

var PSOStr = 
"var PSobserver = new MutationObserver(\n" +
"	function(mutations) {\n" +
"		cbFunctPSO(mutations);\n" +
"	} // mutations callback\n" +
"); // new Mutation PSobserver \n" +
"\n";

function cbFunctPSO(mutations)
{

//	console.log('PSOcb');
	try {
		var tNode = document.getElementsByClassName('gwt-FastTreeItem treeItemHiddenRootNodeBackground');
		if(tNode.length > 1) {
			alert('GM Warning - Error node count = ' + tNode.length + '- Section A');
		}
		else  {
			if(tNode.length == 1) {
				FastTreeElem = tNode[0];
				console.log('a = 1');
				var cNode = document.getElementsByClassName('Caption');//
				for(var j = 0; j < cNode.length; j++) {
					if(cNode[j].innerHTML == 'View Process State') {
						console.log(j + ' = ' + cNode[j].innerHTML);
						ClosedElem = FastTreeElem.getElementsByClassName('closed');
						console.log("gwt-FastTreeItem treeItemHiddenRootNodeBackground with Closed Elems = "+ ClosedElem.length);				
						PSobserver.disconnect();
						PSO_ACTIVE = false;
						VIRGIN = true;

						if(ClosedElem.length == 0) {
							console.log('Tree already open - do nothing');
							insertBusttons();
							FASTTREEOPEN = true;
						}
						else {
							console.log('Allow button to open nodes');
	//                        VIRGIN = true;
							FASTTREEOPEN = false;
							insertButtons();
						}
					}
				} // for loop 
			} // if 
			else {
				console.log('CB - No FastTrees');
			}
		} // else
	}
	catch(err) {
		console.log('PSCB error = '+err);
	}
        
	try {
/*    
       var aNode = document.body.querySelector("div.gwtManageTabView  div.gwt-SplitLayoutPanel div.b11 div.pagedTablePanel div.gwt-ScrollTable "+
                                                    "div.headerWrapper table.headerTable>tbody>tr:nth-of-type(2)>td:nth-of-type(2)");
		
        
        if(aNode!= null) {
		    console.log('outerHTML = ' + aNode.outerHTML+'- Section B');
	//	    console.log('XPATH = ' + createXPathFromElement(aNode));
		    console.log('name = ' + aNode.nodeName);
//		    console.log('localname = ' + aNode.localName);
//		    console.log('Type = ' + aNode.nodeType);
//		    console.log('Value = ' + aNode.nodeValue//);
//		    console.log('dump = %o', aNode);
        }
 */     

		aNode = document.body.querySelectorAll("div.gwtManageTabView  div.gwt-SplitLayoutPanel div.b11 div.pagedTablePanel div.gwt-ScrollTable "+
													"div.dataWrapper table.dataTable>tbody>tr>td:nth-of-type(2)>div");
						
        if(aNode.length > 0) {
            console.log('Section C node count = ' + aNode.length);
        }
        var minTicks = Number.MAX_VALUE;
        var maxTicks = Number.MIN_VALUE;
        for(var i = 0; i < aNode.length; i++) {
		//    console.log('GM Warning - Error node innerHTML('+i+') = ' + aNode[i].innerHTML+'- Section C');
	//	    console.log('XPATH = ' + createXPathFromElement(aNode[i]));
//		    console.log('name = ' + aNode[i].nodeName);
//		    console.log('localname = ' + aNode[i].localName);
//		    console.log('Type = ' + aNode[i].nodeType);
//		    console.log('Value = ' + aNode[i].nodeValue);
//		    console.log('dump =' + aNode[i]);
            if(aNode[i].id) {
				//console.log("Got Id of "+ aNode[i].id);
			}
			else {

                if(i == 0) {
                    //console.log("Got Id of "+ aNode[i].id);
                    durationChart = [];
                    durationChart.push(['Process Name and Start Time','Duration Offset (not data)','Left Highlight (not data)','Process Duration(sec)','Right Highlight (not data)']);
                }

				aNode[i].id = 'XXXX-SW-Timestamp-' + i;
                var timeStamp = aNode[i].innerHTML;
                // 2011-07-08 12:40:41 PM 
                // 2013-03-22 05:49:28 PM
                // 01234567890123456789012
                var dateStr = timeStamp.substr(0, 10);
                var endoftimeStr = timeStamp.substr(13, 6); 
                var hourStr = "0" + (((parseZInt(timeStamp.substr(11, 2)) % 12) + ((timeStamp.substr(20,2) == "PM") ? 12 : 0)) % 24);
                var timeStr = hourStr.substr(-2) + endoftimeStr;
             	aNode[i].innerHTML = timeStr + " " + dateStr;
                aNode[i].style.color = 'blue';
                var dateObj = parseStrTimeStamp(dateStr + ' ' + timeStr + '.000');
//                console.log(aNode[i].id + " - " + timeStamp + " -> " + timeStr + " " + dateStr + ", "+ dateObj);
                var durationStr = aNode[i].parentNode.parentNode.childNodes[9].childNodes[0].innerHTML;
                var duration = parseDuration(durationStr);
                var labelStr = timeStr + " " + dateStr + " - " +aNode[i].parentNode.parentNode.childNodes[3].childNodes[0].innerHTML;
  //              console.log('duration = ' + durationStr + ", secs = " + duration);
                var ticks = dateObj.getTime();
                
                durationChart.push([labelStr, ticks, 0, duration, 0]);
                if(ticks < minTicks) minTicks = ticks;
                if((i+1) == aNode.length) {
                    console.log("Refactoring min...");
                    // console.log(JSON.stringify(durationChart));
                    for(var j = 1; j < durationChart.length; j++) {
                        durationChart[j][1] = (durationChart[j][1] - minTicks) / 1000; 
                        if((durationChart[j][1] + durationChart[j][3]) >  maxTicks) maxTicks = durationChart[j][1] + durationChart[j][3];
                    }
                    //console.log(JSON.stringify(durationChart));
                    for(var j = 1; j < durationChart.length; j++) {
                        // test -- durationChart[durationChart.length - 2][1] = 25; ////////// FIXXXXXXXXXXXXXXXX
                        var highlighter = parseInt(maxTicks / 200);
                        durationChart[j][1] = durationChart[j][1] - highlighter; 
                        durationChart[j][2] = highlighter;
                        durationChart[j][4] = highlighter; 
                        // console.log("1: %s = (%d, %d, %d, %d)", durationChart[j][0], durationChart[j][1], durationChart[j][2], durationChart[j][3], durationChart[j][4]);        
                        if(durationChart[j][1] < 0) {
                            if((durationChart[j][2] + durationChart[j][1]) < highlighter) durationChart[j][2] += durationChart[j][1];
                            durationChart[j][1] = 0;
                        } 
                        // console.log("2: %s = (%d, %d, %d, %d)", durationChart[j][0], durationChart[j][1], durationChart[j][2], durationChart[j][3], durationChart[j][4]);        
                    }
                    // html.js body div div div div div.gwtManageTabView div div.gwt-SplitLayoutPanel div div div div.b11 div div div div div div div div.table-pager ul.pager li div.count

                    //console.log(JSON.stringify(durationChart).replace('],["','],\n["','g'));
						var ocNode = document.getElementById("XXXX-SW-CHARTBUTTON");
						if(!ocNode) {
							ocNode = document.body.querySelector("div.gwtManageTabView div div.rail div div.panel>div:nth-of-type(2)>div>div:nth-of-type(3)>div>div>div");
							if(ocNode) {
								var button = document.createElement('div');
								button.setAttribute("class", "filterButtons");
								button.setAttribute("id", "XXXX-SW-CHARTBUTTON");
								button.innerHTML = '<button style="color:blue" type="button" onclick="showChart();">Time Line Chart</button>';
								ocNode.appendChild(button);
							}
						}
                }
			}
        }

	}
	catch(err) {
		console.log('PSCB error = '+err);
	}
} // cbFunctPSO



function launchPSO() 
{
	//console.log("PSO = on");
    if(PSO_ACTIVE == true) {
        console.log("PSO already active.");
    }
    else {
        PSO_ACTIVE = true;
        console.log("PSO launchPSO");
        PSobserver.observe(document.body, {
           // 	attributes: true, 
                childList: true, 
            // 	characterData: true,
                subtree: true	
            }
        );
    }
}

var FTOStr = 
"var FTobserver = new MutationObserver(\n" +
"	function(mutations) {\n" +
"		cbFunctFTO(mutations);\n" +
"	} // FT mutations callback\n" +
"); // new Mutation FTobserver \n" +
"\n";

function cbFunctFTO(mutations)
{
	ClosedElem = FastTreeElem.getElementsByClassName('closed');
//	console.log('closed elem cnt = '+ ClosedElem.length);
	if (ClosedElem.length > 0) {
		FTobserver.disconnect();
		expand();
	}
	else {
//		console.log("cb with no more closed elems - insButtons");
        FASTTREEOPEN = true;
		insertButtons();
        // resizeDialog();
	}
} // FT mutations callback

function launchFTO() 
{
//	console.log("FTO launched");
   // VIRGIN = true;
	FTobserver.observe(FastTreeElem, {
		//	attributes: true, 
			childList: true, 
		//	characterData: true,
			subtree: true	
		}
	);
}


// alert("Start:");
/*try {

	var x = window.open('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABYklEQVR42mNgIBJMnntDqmP29f9dc6//b5917X/j1Cv/' +
	       '6yefkyJKs9dO5/8gzXuOv/x/6daH/2evvf+/cd/T/5W9F/8T1By0y+vJ1EtT/3ee6fh/8eaH/9sPP/+/bs+T/3tPvPyf3XQGvwGu2+y+dZ/p+t96qhmMT156+389UPP' + 
		   'qnY/BBiVVn8RvQOTeILDNnvMd/tdNuvx/w94n//cAbd526Pn/ZVsf/k8GGQAKnImLbr7oX3jzf/e8G/+BbHDgINsOMqCs85xUWt2p/7Flx/4H5x3+7xy/57+h33Iphs' +
		   'mLbz3BFjiggIMZ4DbNFrdTe+bd+IYeOKBAgwUcyHa8/gTG6Tf0wAHZjM12rXotNgwDWqZffYQtcEAaiXIFKHDKus//T6099T+u/Pj/xMoT4MBBjn+QYWSlRPftjnBvk' + 
		   'JUSkV1BVkpET40kp0QYcJxkhTslEguC8o+aRhQd/R9TipoSAR2bpVPx3fARAAAAAElFTkSuQmCC','_blank','width=335,height=330,resizable=1');
	//x.document.open();
 //	x.document.write('hi - xxxxxxxxxx');
	//x.document.close();
}
catch (err) {
    console.log('Window open %s', err);
}
	
	*/

try {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.setAttribute("id", "XXXXXXXXXXXXXX--sw-test--XXXXXXXXXXXXXX");
	script.textContent =
	
 						//"\n<!--" + 
 						"\n" + FTOStr + 
						"\n" + launchFTO.toString() + 
						"\n" + cbFunctFTO.toString() + 
 						"\n" + PSOStr + 
						"\n" + launchPSO.toString() + 
						"\n" + cbFunctPSO.toString() + 
						"\n" + timeSlices.toString() + 
						"\n" + simMD.toString() + 
						"\n" + parseZInt.toString() +
                        "\n" + parseDuration.toString() +
                        "\n" + parseStrTimeStamp.toString() +
						"\n" + animateResizeDialog.toString() +
						"\n" + resizeDialog.toString() +
						"\n" + insertButtons.toString() +
						"\n" + expand.toString() +
						"\n" + relapse.toString() +
                        "\n" + showChart.toString() +
                        "\n" +
 						"\n" + Globals + 
						//"\n-->\n" +
						"\n";
	document.body.appendChild(script);
}
catch(err) {
   alert(err);
}

