// ==UserScript==
// @name       SMTJ Report assistant
// @namespace  http://fl.raphael-go.com/
// @version    0.1
// @description  enter something useful
// @match      http://smtj.mofcom.gov.cn/manager/admin/EntpReport.do?method=entpReport*
// @copyright  2012+, Speed Lao
// ==/UserScript==

var base_url = "http://192.168.2.39/smtj2/report-assistant/";


/*function submitSave(regcode, i)
 {
 var src = base_url + "save.py?r=";
 var snode = document.createElement("script");
 console.log("saving " + i.length + " elements");
 snode.type = "text/javascript";
 snode.src = src + regcode + "&p=" + escape("[" + i.join(",") + "]");
 document.getElementsByTagName("head")[0].appendChild(snode);
 }

 function saveReport()
 {
 var n, regcode, i, inputs=[], p;
 regcode = getRegcode();
 if (regcode) {
 i = document.getElementsByTagName("input");
 for (n=0; n<i.length; n++) {
 if (i[n].type=="text") {
 inputs.push("[" + n + ",'" + i[n].value + "']");
 }
 }
 var base=0, step=10, len;
 while (base < inputs.length) {
 len = Math.min(step, inputs.length-base);
 submitSave(regcode, inputs.slice(base, base+len));
 base += len;
 }
 console.log("end of save");
 return true;
 }
 return false;
 }*/

function getRegcode()
{
    var td, n, regcode;
    td = document.getElementsByTagName("td");
    for (n=0; n<td.length; n++) {
        //console.log("Checking " + n);
        if (td[n].innerHTML.indexOf("组织机构代码")==0) {
            regcode = td[n].innerHTML.split("：")[1];
            console.log(regcode);
            return regcode;
        }
    }
    return null;
}

function loadReport()
{
    var regcode = getRegcode();
    if (regcode) {
        var url = base_url + "load.py?r=";
        var snode = document.createElement("script");
        snode.type = "text/javascript";
        snode.src = url + regcode;
        document.getElementsByTagName("head")[0].appendChild(snode);
    }
}

function onInputBlur(evt)
{
    var snode = document.createElement("script");
    snode.type = "text/javascript";
    snode.src = base_url + "save.py?r=" + getRegcode() + "&p=" + escape("[[" + evt.target.getAttribute("i_index") + ",'" + evt.target.value + "']]");
    document.getElementsByTagName("head")[0].appendChild(snode);
    console.log("input index " + evt.target.getAttribute("i_index") + " saved");
}

function keyHook(evt)
{
    var keyCode = evt.keyCode;
    console.log("Key pressed: " + keyCode);
    if (keyCode==119 && confirm("Are you sure to load all report cell from local database?"))
        loadReport();
    /*switch (keyCode) {
     case 118:	if (saveReport())
     alert("Report saved.");
     break;
     case 119:	if (confirm("Are you sure to load all report cell from local database?"))
     loadReport();
     break;
     }*/
}

function regInput()
{
    var inputs, n, c;
    inputs = document.getElementsByTagName("input");
    for (n=0, c=0; n<inputs.length; n++) {
        if (inputs[n].type=="text") {
            inputs[n].setAttribute("i_index", n);
            inputs[n].addEventListener("blur", onInputBlur, false);
            c++;
        }
    }
    console.log("" + c + " inputs registered");
}

function startHook()
{
    window.addEventListener("keyup", keyHook, false);
    regInput();
    var tip = document.createElement("div");
    tip.id = "_ra_notify";
    tip.style.position = "absolute";
    tip.style.top = "2px";
    tip.style.right = "2px";
    tip.style.height = "20px";
    tip.style.padding = "2px";
    tip.style.backgroundColor = "blue";
    tip.style.color = "white";
    tip.style.fontSize = "10pt";
    tip.style.fontWeight = "bold";
    tip.innerHTML = "Report Assistant installed";
    document.body.appendChild(tip);
    setTimeout(function(){
        var t = document.getElementById("_ra_notify");
        if (t)
            document.body.removeChild(t);
    }, 5000);
}

//window.addEventListener("load", startHook, false);
startHook();