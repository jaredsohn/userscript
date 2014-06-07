// ==UserScript==
// @name       Informatica Save
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @grant none 
// @description  enter something useful
// @match      https://app.informaticaondemand.com/saas/app/dssTask.do*
// @match      https://icinq1.informaticacloud.com/saas/app/dssTask.do*
// @copyright  2012+, You
// ==/UserScript==

window.addEventListener('load',function(e) {
    sl_addQuickSaveButton();
}, false);

function sl_addQuickSaveButton()
{
    var buttonsTr = document.getElementById('paneBtns').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
    buttonsTr.innerHTML += '<td class="spacer">&nbsp;</td><td class="btn" id="sl_quickSave" title="Quick Save"><span>Quick Save</span></td>';    
    document.getElementById('sl_quickSave').addEventListener("click", sl_quickSaveFunction, true); 
}
function sl_quickSaveFunction() { 
    console.log('clicked');
    var form = unsafeWindow.pnDSSTask.getForm();
    console.log(form);
 
    form.wzAction.value = 'save';
    
    var elem = form.elements;
    var params = "";
    //    form.action = '#';
    url = form.action;
    for(var i = 0; i < elem.length; i++){
        if (elem[i].tagName == "SELECT"){
            params += elem[i].name + "=" +     encodeURIComponent(elem[i].options[elem[i].selectedIndex].value) + "&";
        }else{
            params += elem[i].name + "=" + encodeURIComponent(elem[i].value) + "&";
        }
    } 
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = sl_callback;
    xmlhttp.send(params);
    showSaving(); 
    
}

function showSaving()
{
    var infoDiv = document.getElementById('paneBtns').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
    infoDiv.innerHTML += '<td id="sl_saved" class="InfSuccessMsg"> &nbsp; <img src="/saas/v213/images/active.gif"> Saving... </td>';
}

function hideSaving()
{
    try { document.getElementById('paneBtns').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].removeChild(document.getElementById('sl_saving')); } catch(e) {}
}

function sl_callback() {
     
    if(xmlhttp.readyState == 4) {
 
        
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = xmlhttp.responseText;
 
        sl_hideSavedMsg(); 
        var errorDiv = htmlObject.querySelector('#InfErrorDiv');
        if(errorDiv == null) 
        {
            var infoDiv = document.getElementById('paneBtns').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
            infoDiv.innerHTML += '<td id="sl_saved" class="InfSuccessMsg"> &nbsp; <img src="/saas/v213/images/active.gif"> Changes Saved </td>';
            window.setTimeout(sl_hideSavedMsg, 1500); 
        } 
        else if(errorDiv.style.display != 'none')
        {
            var infoDiv = document.getElementById('paneBtns').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
            infoDiv.innerHTML += '<td id="sl_saved">' + htmlObject.querySelector('#InfErrorDiv').innerHTML + '</td>';
            window.setTimeout(sl_hideSavedMsg, 3000);            
        }
        else
        {
            var infoDiv = document.getElementById('paneBtns').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0];
            infoDiv.innerHTML += '<td id="sl_saved" class="InfSuccessMsg"> &nbsp; <img src="/saas/v213/images/active.gif"> Changes Saved </td>';
            window.setTimeout(sl_hideSavedMsg, 1500); 
        }
        hideSaving();
        document.getElementById('sl_quickSave').addEventListener("click", sl_quickSaveFunction, true); 
        
    }
}
    
    function sl_hideSavedMsg() {    
        try { document.getElementById('paneBtns').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].removeChild(document.getElementById('sl_saved')); } catch(e) {}
        document.getElementById('sl_quickSave').addEventListener("click", sl_quickSaveFunction, true); 
    }
