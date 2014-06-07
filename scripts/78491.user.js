// ==UserScript==
// @name Kongregate LinkTester
// @description Tests links against a checklist
// @include http://www.kongregatestage.com/games/*
// @author Zaphio
// @version 7
// @date 10/07/10
// ==/UserScript==
var googleAPI=document.createElement("script");googleAPI.setAttribute("type","text/javascript");googleAPI.setAttribute("src","http://www.google.com/jsapi");document.body.appendChild(googleAPI);window.location.href="javascript:("+
function(){var url="http://spreadsheets.google.com/tq?tqx=out:json&tq=select%20*&key=0Aq9gclOUtmuudE5iZUZBNXc1ZjFDMjhYdzZQTDQ4LVE";var blacklist={};var whitelist=[];function sendQueryCallback(response){if(response.isError()){console.log("Error in query: "+response.getMessage()+": "+response.getDetailedMessage());return;}
console.log("Query succesfull, attaching to holodeck.");var dt=response.getDataTable();whitelist=dt.getDistinctValues(1);for(var i=2,len=dt.getNumberOfColumns();i<len;i++){blacklist[dt.getColumnLabel(i)]=dt.getDistinctValues(i);}
window.holodeck._event_dispatcher.register('room_message',function(event){var message=event.data.message.toLowerCase();function showMsg(msg){window.holodeck._active_dialogue.displayMessage('LinkTester',msg,{'class':'whisper received_whisper'},{'non_user':true});}
function findStr(arr,str){return arr.find(function(e){if(!e){return false;}
return str.include(e);});}
for(var a in blacklist){console.log("Testing category: "+a);var mat=findStr(blacklist[a],message);if(mat!==undefined){if(findStr(whitelist,message)!==undefined){console.log("Whitelisted, ignoring.");return;}else{showMsg("WARNING: Malicious link detected! (match: "+mat+", type: "+a+").");}}}});}
function loadPackageCallback(){if(google.visualization.Query!==undefined){console.log("Visualization package loaded.");var query=new google.visualization.Query(url);query.send(sendQueryCallback);console.log("Query sent.");}else{window.setTimeout(function(){loadPackageCallback();},250);}}
window.setTimeout(function(){console.log("Loading visualization package.");google.load("visualization","1",{"packages":["table"],"callback":loadPackageCallback});},1000);}+")();void(0);";
