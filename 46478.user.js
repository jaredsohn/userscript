// ==UserScript==
// @name           WMFFFIX
// @namespace	https://banking.guarantee.ru/
// @include        https://banking.guarantee.ru/InputPayment.aspx
// @description    Fix "Webmoney Banking" payment templates with firefox
// ==/UserScript==


var setviz = function() {
if (document.getElementsByTagName("select").length == 0) {
	return;
}
var jscripts = Array(
'https://banking.guarantee.ru/JScripts/InputPaymentOld.js',
'https://banking.guarantee.ru/JScripts/InputPayment.js',
'https://banking.guarantee.ru/JScripts/JSLibrary.js'
)
for (jsc in jscripts) {
	att = document.getElementsByTagName("select");
	js = document.createElement('script');
	js.setAttribute("type", "text/javascript");
	js.setAttribute("src", jscripts[jsc]);
	att[0].appendChild(js);
}
var ns = 'var str_replace=function(needle,replacement,haystack){var temp=haystack.split(needle);return temp.join(replacement);};var VisibleTemplate=function(result){var ResultInfo=result.split("~");if(ResultInfo.length<9){alert("Ошибочные данные");return;}if(ResultInfo!=null){if(document.getElementById(thisID+"_ChangerList")!=null){document.getElementById(thisID+"_ChangerList").selectedIndex=1;onChangeListChangers(document.getElementById(thisID+"_ChangerList"));}document.getElementById("ReceiverAccount").value=ResultInfo[1];document.getElementById("ReceiverINN").value=ResultInfo[2];document.getElementById("ReceiverBankKC").remove(0);var oOption=document.createElement("option");oOption.text=ResultInfo[3];oOption.value=ResultInfo[3];document.getElementById("ReceiverBankKC").add(oOption,null);document.getElementById("ReceiverBankKC").selectedIndex=0;document.getElementById("ReceiverBankBic").value=ResultInfo[4];document.getElementById("ReceiverBank").textContent=ResultInfo[5];document.getElementById("ReceiverName").value=ResultInfo[6];document.getElementById("Assignment").value=ResultInfo[7];document.getElementById("summa").value=ResultInfo[8];document.getElementById("templatename").value=document.getElementById(thisID+"_TemplateID").options[document.getElementById(thisID+"_TemplateID").selectedIndex].getAttribute("tmpName");}return;};var sendPayment=function(){if(0==testAccount(0)&&0==testFieldLen()){document.getElementById("AssignmentPre").value=document.getElementById("AssignmentPreID").textContent;document.getElementById("ReceiverBankPre").value=document.getElementById("ReceiverBank").textContent;}else{event.returnValue=false;event.cancelBubble=false;}};var saveTemplate=function(){if(document.getElementById(str_replace("$","_",thID+"$ChangerList"))!=null){var changerIndex=document.getElementById(str_replace("$","_",thID+"$ChangerList")).selectedIndex;var PC=document.getElementById("ReceiverAccount").value;var INN=document.getElementById("ReceiverINN").value;var KC=document.getElementById("ReceiverBankKC").value;var BIK=document.getElementById("ReceiverBankBic").value;var BankName=document.getElementById("ReceiverBank").textContent;var ReceiverName=document.getElementById("ReceiverName").value;var Purpose=document.getElementById("Assignment").value;var Amount=parseFloat(document.getElementById("summa").value);var sVarriable=changerIndex+"~"+PC+"~"+INN+"~"+KC+"~"+BIK+"~"+BankName+"~"+ReceiverName+"~"+Purpose+"~"+Amount;ServerCallback("saveTemplate|"+document.getElementById("templatename").value+"|"+sVarriable);}return;};var ClientCallback=function(result,context){StatusLoadCallBack("hidden");if(!result){return;}var newID=str_replace("$","_",thID);var ResultInfo=result.split("|");if(ResultInfo!=null){if(ResultInfo[0]=="eraseTemplate"){var index=ResultInfo[2];if(document.getElementById(newID+"_TemplateID")!=null){document.getElementById(newID+"_TemplateID").remove(index);alert("Шаблон "+ResultInfo[3]+" успешно удален.");}return;}document.getElementById("ReceiverBank").innerHTML="";document.getElementById("ReceiverBankKC").remove(0);if(ResultInfo[0]=="ReceiverBank"){if(document.getElementById("ReceiverBank")!=null){if(ResultInfo[1].length==9){document.getElementById("ReceiverBank").innerHTML=ResultInfo[3]+" "+ResultInfo[4];document.getElementById("ReceiverBankBic").value=ResultInfo[1];document.getElementById("ReceiverBankKC").add(AddOption(ResultInfo[2],ResultInfo[2]),null);document.getElementById("ReceiverBankKC").selectedIndex=0;return;}else{ErrorBik();}return;}}if(ResultInfo[0]=="ReceiverBankError"){alert(ResultInfo[1]);return;}if((ResultInfo[0]=="updateTemplate")||(ResultInfo[0]=="insertTemplate")){VisibleTemplate(ResultInfo[2]);if(ResultInfo[1]!="0"){if(document.getElementById(newID+"_TemplateID")!=null){document.getElementById(newID+"_TemplateID").add(AddOption(ResultInfo[1],ResultInfo[3]),null);document.getElementById(newID+"_TemplateID").selectedIndex=document.getElementById(newID+"_TemplateID").options.length-1;var Object=document.getElementById(newID+"_TemplateID").options[document.getElementById(newID+"_TemplateID").selectedIndex];Object.setAttribute("attrVarriable",ResultInfo[2]);Object.setAttribute("tmpName",ResultInfo[3]);}}return;}}return;};'+
'function eraseTemplate(){newthID=str_replace("$","_",thID);if(document.getElementById(newthID+"_TemplateID")!=null){if(document.getElementById(newthID+"_TemplateID").selectedIndex==0){alert("Шаблон не выбран для данной операции.");return;}var tmpName=document.getElementById(newthID+"_TemplateID").options[document.getElementById(newthID+"_TemplateID").selectedIndex].text;if(window.confirm("Вы действительно хотите удалить шаблон "+tmpName+" ?")){ServerCallback("eraseTemplate|"+document.getElementById(newthID+"_TemplateID").options[document.getElementById(newthID+"_TemplateID").selectedIndex].value+"|"+document.getElementById(newthID+"_TemplateID").selectedIndex+"|"+tmpName);}}return;};var loadTemplates=function(th){var s_thIDTemplateID=thisID+"_TemplateID";if(document.getElementById(s_thIDTemplateID)!=null){var strTemplate=document.getElementById(s_thIDTemplateID).options[document.getElementById(s_thIDTemplateID).selectedIndex].getAttribute("attrVarriable");if(strTemplate!=null){VisibleTemplate(strTemplate);}}};var IE=false;';
var js = document.createElement('script');
js.setAttribute("type", "text/javascript");
js.text = ns;
att[0].appendChild(js);
};

window.addEventListener('load', setviz, true);