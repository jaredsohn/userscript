// ==UserScript==
// @name          Twitter2FB
// @namespace     http://goodevilgenius.blogspot.com/2007/08/twitter2facebook.html
// @description   Updates your Facebook status with your twitter status
// @include       http://*facebook.com/home.php*
// ==/UserScript==
//
// By: Dan Jones
// Email: good.evil.genius+Facebook AT gmail
// Last Update:  28 Aug 2007

function userNameForm(error){var username,text;var form=document.createElement('form');form.addEventListener('submit',function(evt){username=document.getElementById('twitter_user').value;evt.target.parentNode.removeChild(evt.target);updateUserName(username);evt.stopPropagation();evt.preventDefault();return false;},false);if(error){text='The twitter username you entered was invalid. Please enter a valid username.';}else{text='Enter your twitter username below to update FB status from Twitter';}var twitterMsg=document.createTextNode(text);var twitterUser=document.createElement('input');twitterUser.id='twitter_user';twitterUser.setAttribute('type','text');form.appendChild(twitterMsg);form.appendChild(twitterUser);var statusBody=document.getElementById('status_body');statusBody.parentNode.parentNode.insertBefore(form,statusBody.parentNode);}
function changeFbStatus(status){if(status.match(/^I /)){return false;}if(status.match(/^[^ ]* is/)){return false;}if(status.match(/^@/)){return false;}var editStatusText=document.getElementById('edit_status_text');editStatusText.value=status;var keypress=document.createEvent("KeyboardEvent");keypress.initKeyEvent('keypress',true,true,null,false,false,false,false,13,0);editStatusText.dispatchEvent(keypress);}
function compareStatus(data){var twitStatus,fbStatus;var suText=document.getElementById('su_text');if(!suText){return;}fbStatus=suText.textContent;fbStatus=fbStatus.unescapeHTML();var punct=fbStatus[fbStatus.length-1];twitStatus=data[0].text;twitStatus=twitStatus.unescapeHTML();if(punct=="'"||punct=='"'){punct=fbStatus[fbStatus.length-2];if(twitStatus[twitStatus.length-2]!=punct){twitStatus=twitStatus.substring(0,twitStatus.length-1)+punct+twitStatus.substring(twitStatus.length-1)}}else{if(twitStatus[twitStatus.length-1]!=punct){twitStatus=twitStatus+punct;}}if(fbStatus!=twitStatus){changeFbStatus(data[0].text.unescapeHTML());}}
function userNameError(){GM_setValue('user','');userNameForm(true);}
function updateUserName(name){GM_xmlhttpRequest({'method':'GET','url':'http://twitter.com/statuses/user_timeline/'+name+'.json?count=1','headers':{'User-Agent':'Mozilla/4.0 (compatible) Greasemonkey','Accept':'application/atom+xml,application/xml,text/xml,application/json,application/xhtml+xml'},'onload':function(response){if(response.status==200){if(response.responseText=='User not found'){userNameError();}else{GM_setValue('user',name);compareStatus(eval(response.responseText));}}else{userNameError();}},'onerror':userNameError});}
function checkUserName(){var username=GM_getValue('user');if(!username){userNameForm(false);}else{updateUserName(username);}}
String.prototype.stripTags=function(){return this.replace(/<\/?[^>]+>/gi,'');}
String.prototype.escapeHTML=function(){var self=arguments.callee;self.text.data=this;return self.div.innerHTML;}
String.prototype.unescapeHTML=function(){var div=document.createElement('div');div.innerHTML=this.stripTags();return div.childNodes[0]?(div.childNodes.length>1?$A(div.childNodes).inject('',function(memo,node){return memo+node.nodeValue}):div.childNodes[0].nodeValue):'';}
checkUserName();var suEdit=document.getElementById('su_edit');if(suEdit){var upSpan=document.createElement('a');upSpan.setAttribute("class","su_edit");upSpan.setAttribute("href","#");upSpan.addEventListener("click",checkUserName,false);upSpan.textContent='Twitter Update';suEdit.parentNode.insertBefore(upSpan,suEdit.nextSibling);suEdit.parentNode.insertBefore(document.createTextNode(" "),upSpan);}