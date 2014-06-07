// ==UserScript==
// @name           Mystery bagger
// @author         spockholm
// @description     apasajalah
// ==/UserScript==

javascript:(function(){var version='Mg9Hs Bagman Mugger NoDB - PP_mod/MoHa_mod v2.54 beta';try{if(document.getElementById('blueBar')){for(var i=0;i<document.forms.length;i++){if(document.forms[i].action.indexOf('index2.php')!=-1){document.forms[i].target='';document.forms[i].submit();return false;}}}
else if(document.getElementsByClassName('canvas_iframe_util')[0]){for(var i=0;i<document.forms.length;i++)
{if(/^canvas_iframe_post/.test(document.forms[i].id))
{document.forms[i].target='';document.forms[i].submit();return;}}
return;}
else if(document.getElementById('some_mwiframe')){window.location.href=document.getElementById('some_mwiframe').src;return;}
else{document.body.parentNode.style.overflowY="scroll";document.body.style.overflowX="auto";document.body.style.overflowY="auto";try{document.evaluate('//div[@id="mw_city_wrapper"]/div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).style.margin="auto";if(typeof FB!='undefined'){FB.CanvasClient.stopTimerToSizeToContent;window.clearInterval(FB.CanvasClient._timer);FB.CanvasClient._timer=-1;}
document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);}
catch(fberr){}}
if(navigator.appName=='Microsoft Internet Explorer'){alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');return;}
var stopimg='data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7';var playimg='data:image/gif;base64,R0lGODlhEAAQAMQAAP8A/2K1SIHOEXbIAIPTHZXbMIDRFnbIAXfJA33OEM/vqIbWJHrMC5HLf3jKB/D/3/X/6fn/8uz/1ej/zJjcRc7vpv3/+qHfVP///+T/xAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAVqICCOZEk2QaqmTRlUSizHVTA21LXs/H5RLUCAQCRgikib0MA0WCzNpjKQqCYiWGt1yugyIGCIlzF1mB2P9OPsmCLeCIkc/p4e7ofJBI+fDv4DGYCDSg0Ch4iJh0FCBY6PkEo3KyuMJpcjIQA7';var pauseimg='data:image/gif;base64,R0lGODlhEAAQAOYAAP8A/zaa/3O4/xal/6jd//L6//r9/87s/8bp/+r3/+Dz/////9bv/xel/xim/xun/xyn/1zA/1a+/0q5/y6u/yWr/x6o/3nL/0S3/yGp/6fd/xqn/2fE/zmz/zmy/2jF/yKq/4rS/27H/3bK/026/zOw/zGw/z+0/1q//0i4/0O2/0m5/3HI/zax/3fK/ySq/067/1O8/1G8/1m//y2u/z20/2HC/5DU/3vM/1C7/yis/x+o/zCv/6vf/3LI/4vS/yOq/zqz/23H/z+1/z60/zuz/zWx/1i+/1vA/2LC/2rF/33N/0u6/2bE/3PJ/yyu/3jL/2nF/y+v/yms/2TD/4nR/6re/xmm/2DC/ySr/3rM/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAewgACCg4SFhAIBiYqJAoUBPQSRkRoaBFYBgwI3IThaFxdQLiNLP1WNAAFOPiwLCyJCrUpRH5ioHE1UBgY2WLoRSCi1ATNHEgUFMTLHMCRMwhMrKQkJGCrTQ0Q1wkVBHQoKLUbfJjxSwhQ0TwwMUzrrFVkvwkAgGQcHOxb3EBAPwhsbriBA4MDBwAYNBtQSMKChwwYOHljIUOEUKgolPJzAMCGHhAhJamVatMiioZODAgEAOw%3D%3D';var banner_path='http://informantpodcast.com/wp-content/uploads/2010/10/InformantPodcast_banner.png';var sf_xw_sig=/sf_xw_sig=([a-fA-F0-9]+)/.exec(document.location);var run=1,content=document.getElementById('popup_fodder'),debug=false,specialmsg='',output='',x=0,second=false,last_url=null,retries=0,tmpkey=false,totalfriends=0,combinedloot='',done=0,list=0,ach=1,bagsopen=0,mw_url='http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22ID%22%7D',color='#BCD2EA',fb_url='http://www.facebook.com/profile.php?id=',cuba_gained=0,ny_gained=0,moscow_gained=0,bangkok_gained=0,exp_gained=0,friends_helped=0;var wait1=1,wait2=1,skip=0,city='',oldcity='',long_url='';var _gkey='',_gift_id='',_gift_cat='',_time_id='',from_user='',_fb_id='';var log_size=10;var log_keep=/(Limit|friends|Facebook|Starting|Invalid|Link)/;var newfriends=[],newnames=[],friendslist=[],nameslist=[],friendarray=[],friendsint=[],namesint=[],names=[];var currentPageCount=1;var jobsdone=[];var friendquicklist='',gift_url='';var xw_city=1;var userid=/'sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];var fbuserid;FB.Connect.forceSessionRefresh();fbuserid=FB.Facebook.apiClient.get_session().uid;var myId=userid;var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var URLs=[];var successful=0,failed=0,total=0,old=0,invalid=0,leech=false,expired=0,overused=0,gotBefore=0,nonfriend=0,MWERROR=0;var limit=4900,service='untiny1',debug=false;var yesterday=24*60*60;var timelimit=24;function createCookie(name,value){var expires=new Date();expires.setDate(expires.getDate()+30);document.cookie=name+"="+value+";expires="+expires.toGMTString()+"; path=/";}
function readCookie(name){var i,cookie,nameEQ=name+"=",cookieArray=document.cookie.split(";");for(i=0;i<cookieArray.length;i++){cookie=cookieArray[i];while(cookie.charAt(0)==' ')
cookie=cookie.substring(1,cookie.length);if(cookie.indexOf(nameEQ)==0)
return cookie.substring(nameEQ.length,cookie.length);}
return null;}
function parseFBFr(){var fql="SELECT uid, quotes FROM user WHERE (strpos(quotes, 'next_action=accept_gift')>0 ) and uid IN (SELECT uid2 FROM friend WHERE uid1= me() LIMIT "+limit+") AND is_app_user = 1";var f=function(){var results=[];var friendquicklist;return{getResults:function(){return results;},process:function(fbfr){if(fbfr){for(i=0;i<fbfr.length;i++){if(fbfr[i].quotes!=null){friendquicklist+="fbid="+fbfr[i].uid+'###'+fbfr[i].quotes+'##+##';}}}else{friendquicklist='Unable to retrieve list. Please try again.';}
document.getElementById('baglist').value=friendquicklist.replace(/undefined/,'');}};}();document.getElementById('baglist').value='Loading...Be Patient...';FB.Facebook.apiClient.fql_query(fql,f.process);return;}
function checkleech(){var fql="SELECT quotes FROM user WHERE (strpos(quotes, 'next_action=accept_gift')>0) and uid= me() LIMIT 1";var f=function(){var results=[];return{getResults:function(){return results;},process:function(fbfr2){if(fbfr2){//
if(fbfr2.length>=1){var theDate=new Date(/time_id%22%3A%22(\d+)%22/.exec(fbfr2[0]['quotes'])[1]*1000);var today=new Date();var age=parseInt((today.getTime()-theDate.getTime())/1000/3600);document.getElementById('timestamp').innerHTML=theDate.toLocaleString()+' <span class="'+(age>24?'bad':'good')+'">('+age+' hours old)</span>';leech=(age>=48?true:false);}
if(leech==true){document.getElementById('leechchk').innerHTML='Leech Check = <span class="bad">Failed!!</span>';document.getElementById('baglist').value='DISABLED - No usable link found or link older than 48 hours.\n\nPlease load a link in your profile.\n\nIf you are using a manual list, you can load it here and click the Start.';}else{document.getElementById('leechchk').innerHTML='Leech Check = <span class="good">Passed!!</span>';}}}};}();FB.Facebook.apiClient.fql_query(fql,f.process);return;}
if((wait1==null)||(wait1.length==0)){wait1=1;}
if((wait2==null)||(wait2.length==0)){wait2=1;}
readCookie('mugger_skip');if(skip)
skip=skip.replace(/[^0-9]/g,'');if((skip==null)||(skip.length==0)){skip=0;}
redo="";timelimit=readCookie('mugger_timelimit');if(timelimit)
timelimit=timelimit.replace(/[^0-9]/g,'');if((timelimit==null)||(timelimit.length==0)){timelimit=9999999;}
function myRandom(min,max){return min+Math.floor(Math.round((Math.random()*(max-min))));}
function pausing(seconds,message,resume_func){if(typeof(message)=='function'){resume_func=message;message=null;}
if(message)
message=message;else
message='Pausing';msg(message+' <span id="seconds">'+seconds+' second'+(seconds==1?'':'s')+'</span>...');var timer=setInterval(function(){seconds--;if(document.getElementById('seconds'))
document.getElementById('seconds').innerHTML=seconds+' second'+(seconds==1?'':'s');else
clearInterval(timer);if(seconds<=0){clearInterval(timer);if(typeof(resume_func)=='function')
resume_func();}},1000);}
function unix_timestamp(){return parseInt(new Date().getTime().toString().substring(0,10))}
var config_html='<style type="text/css">'+
'.messages img{margin:0 3px;vertical-align:top};'+
'#close{display:inline};'+
'</style>'+
'<form name="mb_spockform">'+
'<table class="messages">'+
'<tr><td colspan="3"><a href="http://informantpodcast.com" target="_blank"><img src="'+banner_path+'" alt="The Informant Podcast - Where Family is first"></a></td></tr>'+
'<tr>'+
'<td colspan="3" align="right" style="text-align:right;font-size:0.9em;">'+version.replace(/Bagman Mugger/,'<span class="good">Bagman Mugger</span>')+' - [<a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a>]'+
'- [<a href="http://www.spockholm.com/mafia/donate.php?MysteryBagger" alt="Donate to Team Spockholm" target="_blank">Donate Coffee/Beer</a>]  - '+
'<a href="#" id="close" onclick="javascript:$(\'#spockdiv\').remove();return false;"><img src="'+stopimg+'" title="Close" width="16" height="16" align="middle"></a>'+
'<br /><span style="font-size:0.8em";>Your FBid: '+fbuserid+' and MWid: '+userid+'</span></td></tr>'+
'</tr>'+
'<tr><td>Expand service:</td><td colspan="2"> '+
'<form id="service_select">'+
'<label><input type="radio" name="service_selected" value="untiny1" onclick="$(\'#service_info\').html(\'Public Un-Tiny service, can be overloaded.\'); service=\'untiny1\';">Public Un-Tiny Service</label>&nbsp;'+
'<label><input type="radio" name="service_selected" value="longurl" checked="checked" onclick="$(\'#service_info\').html(\'www.longurl.org service.\'); service=\'longurl\';">Longurl.org Service</label>&nbsp;'+
'</form>'+
'</td></tr>'+
'<tr><td colspan="2">&nbsp;<span id="service_info" class="energy_highlight">Public Un-Tiny Service, only works for TinyURLs and can break down.</span></td><td colspan="3"><a class="sexy_button" id="spmbstart"  align="midle"> <<<<<<< Start >>>>>>> </a></td></tr>'+
'<tr><td colspan="3"><hr /></td></tr>'+
'<tr><td valign="top">Limit Friends:</td><td><input type="text" maxlength="5" size="5" id="thelimit" value="'+limit+'"> .</td><td valign="top" style="text-align:right;">Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" size="3" maxlength="3" /> to <input id="delay2" name="delay2" type="text" value="'+wait2+0+'" size="3" maxlength="3" />sec</td></tr>'+
'<tr><td valign="top">Time In hours:</td><td><input type="text" maxlength="5" size="5" id="timelimit" value="'+timelimit+'"> Limit checks to links younger than this.<br/>If you are using a manual list you might want to increase to 10000.</td><td valign="top" style="text-align:right">Items to Open then Stop: <input type="text" name="bagsopen" id="bagsopen" size="3" value="'+bagsopen+'"></td></tr>'+
'<tr><td valign="top">Skip Bags:</td><td><input type="text" name="skip" id="skip" size="3" value="'+skip+'"></td><td style="text-align:right;" id="leechchk"></td></tr>'+
'<tr id="manual_list">'+
'<td valign="top">Links List:</td>'+
'<td colspan="2"><textarea name="baglist" id="baglist" class="instructions" rows="20" cols="60">'+
'List will no longer load automatically.\n'+
'Just click button below to load list.\n\n'+
'If using a manual list cut and paste it here then press START.\n\n'+
'Getting a lot of "Link is invalid and missformated" errors?\n\n'+
'Select a different service below or try again later,\nthe service you selected was not working properly.'+
'</textarea>'+
/*'</tr>'+
'<tr><td>Expand service:</td><td colspan="2"> '+
'<form id="service_select">'+
'<label><input type="radio" name="service_selected" value="untiny1" checked="checked" onclick="$(\'#service_info\').html(\'Public Un-Tiny service, can be overloaded.\'); service=\'untiny1\';">Public Un-Tiny Service</label>&nbsp;'+
'<label><input type="radio" name="service_selected" value="longurl" onclick="$(\'#service_info\').html(\'www.longurl.org service.\'); service=\'longurl\';">Longurl.org Service</label>&nbsp;'+
'</form>'+
'</td></tr>'+
'<tr><td></td><td colspan="2">&nbsp;<span id="service_info" class="energy_highlight">Public Un-Tiny Service, only works for TinyURLs and can break down.</span></td></tr>'+ */
'<tr><td></td><td colspan="2"><a class="sexy_button" id="loadfriendslnk">Load List from Friends Fav. Quotes</a></td></tr>'+
'<tr><td colspan="3"><hr /></td></tr>'+ 
'<tr><td valign="top">Add your link to <a href="http://www.facebook.com/editprofile.php?sk=philosophy" target="_blank">Philosophy</a>.</td>'+
'<td colspan="3">Your new MB Link: <a id="gift_url">Loading...</a><br/>Your current link timestamp: <span id="timestamp"></span></td></tr>'+
'<tr><td></td><td colspan="2"><span class="energy_highlight">Copy and paste the link above into the philosophy section of your profile page at least DAILY so that your mafia friends can reap the same great rewards that you will when you click start below.</span></td></tr>'+
'<tr><td>Debug: </td><td colspan="2"><input type="checkbox" name="debug" id="debug" />Output messages for debugging?</td></tr>'+
'</table>'+
'</form>';var running_html='<style type="text/css">'+
'.messages img{margin:0 3px;vertical-align:top}'+
'.messages input {border: 1px solid #FFF;margin 0;padding 0;background: #000; color: #FFF; width: 20px;}'+
'#play{display:none}'+
'#pause{display:inline}'+
'#close{display:inline}'+
'</style>'+
'<table class="messages">'+
'<tr>'+
'<td colspan="3" align="right" style="text-align:right;font-size:0.8em;">'+version.replace(/Bagman Mugger/,'<span class="good">Bagman Mugger</span>')+' - <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - [<a href="http://www.spockholm.com/mafia/donate.php?MysteryBagger" alt="Donate to Team Spockholm" target="_blank">Donate Coffee/Beer</a>] - '+
'<a href="#" id="play"><img src="'+playimg+'" title="Play" width="16" height="16" /></a>'+
'<a href="#" id="pause"><img src="'+pauseimg+'" title="Pause" width="16" height="16" /></a>'+
'<a href="#" onclick="javascript:$(\'#spockdiv\').remove();return false;"><img src="'+stopimg+'" title="Close" width="16" height="16"></a>'+
'</td></tr>'+
'<tr>'+
'<td width="100">Progress:</td>'+
'<td><span id="spock_progress"></span></td><td align="right" style="text-align:right;">Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" size="3" maxlength="3" /> to <input id="delay2" name="delay2" type="text" value="'+wait2+'" size="3" maxlength="3" />sec</td>'+
'</tr>'+
'<tr><td>Expand service:</td><td colspan="2"> '+
'<form id="service_select">'+
'<label><input type="radio" name="service_selected" value="untiny1" onclick="$(\'#service_info\').html(\'Public Un-Tiny service, can be overloaded.\'); service=\'untiny1\';">Public Un-Tiny Service</label>&nbsp;'+
'<label><input type="radio" name="service_selected" value="longurl" checked="checked" onclick="$(\'#service_info\').html(\'www.longurl.org service.\'); service=\'longurl\';">Longurl.org Service</label>&nbsp;'+
'</form>'+
'</td></tr>'+
'<tr><td></td><td colspan="2">&nbsp;<span id="service_info" class="energy_highlight">Public Un-Tiny Service, only works for TinyURLs and can break down.</span></td></tr>'+
'<tr>'+
'<td width="100">Stats:</td>'+
'<td colspan="2"><span id="spock_stats"></span></td><td></td>'+
'</tr>'+
'<tr>'+
'<td>Status:</td>'+
'<td colspan="2" id="spock_status"></td>'+
'</tr>'+
'<tr>'+
'<td valign="top"><a href="#" id="lootshow">Showing</a> loot:</td>'+
'<td colspan="2" id="loot"></td>'+
'</tr>'+
'<tr>'+
'<td valign="top"><a href="#" id="logshow">Showing</a> Log:<br/>Limit: <input id="logsize" name="logsize" type="text" value="'+log_size+'" maxlength="4" /><br /></td>'+
'<td colspan="2" id="spock_log" valign="top"></td>'+
'</tr>'+
'</table>';function create_div(){if(document.getElementById('spockdiv')){document.getElementById('spockdiv').innerHTML=config_html;}
else{var spock_div=document.createElement("div");spock_div.id='spockdiv';spock_div.innerHTML=config_html;content.insertBefore(spock_div,content.firstChild);}}
function getnewgiftlink(id){var baglink='http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=requests&xw_action=friend_selector&xw_city=3&tmp=1c0c0c6733935559963240b6a4dc362c&cb=c2d1cac0a16c11dfbf1423d60ec6b818&req_controller=freegifts&free_gift_id='+id+'&free_gift_cat=1&xw_client_id=8&ajax=1&liteload=1&fbml_iframe=1';$.ajax({type:"POST",url:baglink,data:{'sf_xw_user_id':userid,'sf_xw_sig':local_xw_sig},success:function(msg){document.getElementById('gift_url').href+=(/<fb:req-choice url='([^']+)'/.exec(msg)[1])+'# ';document.getElementById('gift_url').innerHTML='Right click here and copy link location.';}});}
function getregsitems(){var reqslink='http://www.facebook.com/reqs.php';$.ajax({type:"GET",url:reqslink,data:{},success:function(msg){console.log(msg);}});}
create_div();checkleech();getnewgiftlink(100);document.getElementById('loadfriendslnk').onclick=function(e){document.getElementById("baglist").focus();limit=parseInt(document.getElementById('thelimit').value);document.getElementById('thelimit').value=limit;parseFBFr();};document.getElementById("baglist").onfocus=function(e){document.getElementById("baglist").value="";document.getElementById("baglist").style.color="#000";document.getElementById("baglist").onfocus=null;};//
function start(){run=1;wait1=parseInt(document.mb_spockform.delay1.value);wait2=parseInt(document.mb_spockform.delay2.value);skip=parseInt(document.mb_spockform.skip.value);bagsopen=parseInt(document.mb_spockform.bagsopen.value);timelimit=parseInt(document.getElementById('timelimit').value);createCookie("mugger_timelimit",timelimit);createCookie("mugger_skip",skip);yesterday=(new Date().getTime()).toString().substring(0,10)-(timelimit*60*60);if(document.getElementById('baglist').value.indexOf('##+##')>0){var tmpURLs=document.getElementById('baglist').value.split('##+##');}
else{var tmpURLs=document.getElementById('baglist').value.split(/[ \n]/);}
for(var i=0;i<tmpURLs.length;++i){if(tmpURLs[i].indexOf('next_params')>=0||tmpURLs[i].indexOf('tinyurl.com')>=0||tmpURLs[i].indexOf('bit.ly')>=0||tmpURLs[i].indexOf('spockon.me')>=0){URLs.push(tmpURLs[i]);}}
document.getElementById('spockdiv').innerHTML=running_html;document.getElementById('lootshow').onclick=function(e){var row=document.getElementById("loot");if(row.style.display==''){row.style.display='none';document.getElementById("lootshow").innerHTML='Hiding';}else{row.style.display='';document.getElementById("lootshow").innerHTML='Showing';}
return false;};document.getElementById('delay1').onkeyup=function(e){time=parseInt(document.getElementById('delay1').value);if((time<0)||(!time)){wait1=0;}else{wait1=time;}
document.getElementById('delay1').value=wait1;};document.getElementById('delay2').onkeyup=function(e){time=parseInt(document.getElementById('delay2').value);if((time<0)||(!time)){wait2=0;}else{wait2=time;}
document.getElementById('delay2').value=wait2;};document.getElementById('logshow').onclick=function(e){var row=document.getElementById("spock_log");if(row.style.display==''){row.style.display='none';document.getElementById("logshow").innerHTML='Hiding';}else{row.style.display='';document.getElementById("logshow").innerHTML='Showing';}
return false;};document.getElementById('pause').onclick=function(e){run=0;document.getElementById("pause").style.display='none';document.getElementById("play").style.display='inline';return false;};document.getElementById('play').onclick=function(e){run=1;document.getElementById("play").style.display='none';document.getElementById("pause").style.display='inline';msg('Resuming... (<a href="'+last_url+'">url</a>)');retries=0;request(last_url);return false;};document.getElementById('spock_stats').innerHTML='Successful: <span id="successful" class="good">0</span> &nbsp; Failed: <span id="failed" class="bad">0</span><br />'+'<span class="more_in">Old: <span id="old">0</span>&nbsp; &nbsp; Already collected: <span id="gotBefore">0</span> &nbsp; Invalid: <span id="invalid">0</span>&nbsp; Expired: <span id="expired">0</span>&nbsp; Overused: <span id="overused">0</span>&nbsp; Non-Friends: <span id="nonfriend">0</span>&nbsp; MWERROR: <span id="mwerror">0</span>';if(skip>=URLs.length-1){skip=0;}
if(skip>0){log(timestamp()+'Skipping '+skip+' Bags of '+URLs.length+'.');URLs=URLs.slice(skip);}
total=URLs.length;document.getElementById('spock_progress').innerHTML=(successful+failed)+' of '+total+' &nbsp; <span class="more_in">('+((successful+failed)/total*100).toFixed(1)+'%)</span>';msg('Starting....');search_bags();}
document.getElementById("spmbstart").onclick=start;function request(url){if(run==1){var preurl='http://facebook.mafiawars.com/mwfb/remote/html_server.php?';cb=fbuserid+unix_timestamp();ts=unix_timestamp();var params={'ajax':1,'liteload':1,'sf_xw_user_id':userid,'sf_xw_sig':local_xw_sig,'xw_client_id':8,'skip_req_frame':1};$.ajax({type:"POST",url:preurl+url+'&cb='+cb,data:params,timeout:60000,success:function(msg){state_change(msg);},error:function(request,error){log(timestamp()+request.status+' '+(error!=undefined?error:request.responseText)+' Error when loading page, retry #'+retries);retry('Some sort of problem when loading page, retrying...');}});}else{msg('Paused searching.');}
last_url=url;}
function search_bags(){if(URLs.length==0&&redo==""){msg(timestamp()+'Done checking all friends for Bags.');document.getElementById("play").style.display='none';document.getElementById("pause").style.display='none';createCookie("mugger_skip",0);}
else if(URLs.length==0&&redo=="checked"){total=URLs.length;done=0;skip=0;createCookie("mugger_skip",skip);log(timestamp()+'<span class="money">Starting again from the beginning.</span>');search_bags();}
else if(successful==bagsopen&bagsopen!=0){msg(timestamp()+'Done checking all friends for Bags.');document.getElementById("play").style.display='none';document.getElementById("pause").style.display='none';createCookie("mugger_skip",0);}
else{last_url=URLs[0];var str=unescape(URLs[0]);if(m=/(http:\/\/tinyurl.com\/?\S*)/.exec(str)){if(service=='longurl'){$.getJSON('http://api.longurl.org/v2/expand?url='+m[1]+'&format=json&user-agent=SpockholmMafiaTools&callback=?',function(data){long_url=unescape(data['long-url']);URLs[0]=long_url;if(m=/http:\/\/facebook.mafiawars.com\/mwfb\/(.+)&canvas=1/.exec(long_url)){str='http://apps.facebook.com/inthemafia/'+m[1];str=unescape(str);}
pausing(3,'Loading expanded url in ',search_bags);});}
if(service=='untiny1'){$.getJSON('http://json-longurl.appspot.com/?url='+m[1]+'&callback=?',function(data){long_url=unescape(data['url']);URLs[0]=long_url;
if(m=/http:\/\/facebook.mafiawars.com\/mwfb\/(.+)&canvas=1/.exec(long_url)){str='http://apps.facebook.com/inthemafia/'+m[1];str=unescape(str);}
pausing(3,'Loading expanded url in ',search_bags);});}
if(service=='untinyspock'){$.getJSON('http://spockholm-server/expand-script.php?url='+m[1]+'&callback=?',function(data){long_url=unescape(data['url']);URLs[0]=long_url;if(m=/http:\/\/facebook.mafiawars.com\/mwfb\/(.+)&canvas=1/.exec(long_url)){str='http://apps.facebook.com/inthemafia/'+m[1];str=unescape(str);}
pausing(3,'Loading expanded url in ',search_bags);});}}
else if(m=/(http:\/\/bit.ly\/?\S*)/.exec(str)){$.getJSON('http://api.longurl.org/v2/expand?url='+m[1]+'&format=json&user-agent=SpockholmMafiaTools&callback=?',function(data){long_url=unescape(data['long-url']);URLs[0]=long_url;if(m=/http:\/\/facebook.mafiawars.com\/mwfb\/(.+)&canvas=1/.exec(long_url)){str='http://apps.facebook.com/inthemafia/'+m[1];str=unescape(str);}
pausing(3,'Loading expanded url in ',search_bags);});}
else if(m=/(http:\/\/spockon.me\/?\S*)/.exec(str)){$.ajax({type:"GET",dataType:"jsonp",url:'http://spockon.me/api.php?action=expand&format=jsonp&shorturl='+escape(m[1]),crossDomain:true,success:function(msg){ URLs[0]=msg.longurl;if(m=/http:\/\/facebook.mafiawars.com\/mwfb\/(.+)&canvas=1/.exec(msg.longurl)){str='http://apps.facebook.com/inthemafia/'+m[1];str=unescape(str);}
pausing(3,'Loading expanded url in ',search_bags);}});}
else{function f(){if(debug)
log("unescaped url "+str);str=unescape(str);if(debug)
log("escaped url "+str);_from_user=/from_user=((p\|)?[0-9]+)/.exec(str);if(_from_user!=null)
_from_user=_from_user[1];_time_id=/time_id=([0-9]+)/.exec(str);if(_time_id!=null)
_time_id=_time_id[1];_gift_cat=/item_cat=([0-9]+)/.exec(str);if(_gift_cat!=null)
_gift_cat=_gift_cat[1];_gift_id=/item_id=([0-9]+)/.exec(str);if(_gift_id!=null)
_gift_id=_gift_id[1];_gkey=/gkey=([0-9a-fA-F]+)/.exec(str);if(_gkey!=null)
_gkey=_gkey[1];if(_gkey==null&&_gift_id==null&&_gift_cat==null&&_time_id==null&&_from_user==null){_from_user=/"from_user":"(p[|0-9]+)"/.exec(str);if(_from_user!=null)
_from_user=_from_user[1];_time_id=/"time_id":"([0-9]+)"/.exec(str);if(_time_id!=null)
_time_id=_time_id[1];_gift_cat=/"item_cat":"([0-9]+)"/.exec(str);if(_gift_cat!=null)
_gift_cat=_gift_cat[1];_gift_id=/"item_id":"([0-9]+)"/.exec(str);if(_gift_id!=null)
_gift_id=_gift_id[1];_gkey=/"gkey":"([0-9a-fA-F]+)"/.exec(str);if(_gkey!=null)
_gkey=_gkey[1];}
if(_from_user==null){_from_user=/"from_user":"([0-9]+)"/.exec(str);if(_from_user!=null)
_from_user=_from_user[1];_time_id=/"time_id":"([0-9]+)"/.exec(str);if(_time_id!=null)
_time_id=_time_id[1];_gift_cat=/"item_cat":"([0-9]+)"/.exec(str);if(_gift_cat!=null)
_gift_cat=_gift_cat[1];_gift_id=/"item_id":"([0-9]+)"/.exec(str);if(_gift_id!=null)
_gift_id=_gift_id[1];_gkey=/"gkey":"([0-9a-fA-F]+)"/.exec(str);if(_gkey!=null)
_gkey=_gkey[1];}
if(debug)
log("fromuser "+_from_user);if(debug)
log("timeid "+_time_id);if(debug)
log("giftcat "+_gift_cat);if(debug)
log("giftid "+_gift_id);if(debug)
log("gkey "+_gkey);_fb_id=/fbid=([0-9]+)/.exec(str);if(_fb_id!=null)
_fb_id=_fb_id[1];if(_time_id==null){failed++;invalid++
log(timestamp()+'Link is invalid and missformated - '+mblink(URLs[0]));done++;URLs=URLs.slice(1);createCookie("mugger_skip",skip+done);log();search_bags();}
else if(_time_id<=yesterday){var date=new Date(_time_id*1000);var formattedTime=date.toLocaleDateString()+' '+date.toLocaleTimeString();old++;if(debug)
log(_time_id);if(debug)
log(_from_user);var user_output='undefined';if(/p/.test(_from_user)){user_output='[<a href="http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&user='+_from_user+'">MW profile</a>]';}else{user_output='[<a href="http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=stats&xw_action=view&user='+_from_user+'">MW profile</a>][<a href="http://www.facebook.com/profile.php?id='+_from_user+'">FB</a>]';}
log(timestamp()+'Link older than '+timelimit+' hour(s) '+user_output+' posted on '+formattedTime);done++;failed++;URLs=URLs.slice(1);createCookie("mugger_skip",skip+done);log();search_bags();}
else{url='xw_controller=interstitial&xw_action=accept_gift&from_user='+_from_user+'&time_id='+_time_id+'&item_cat='+_gift_cat+'&item_id='+_gift_id+'&gkey='+_gkey
request(url);}}
wait=myRandom(parseInt(wait1),parseInt(wait2));var date=new Date(_time_id*1000);var formattedTime=date.toLocaleDateString()+' '+date.toLocaleTimeString();pausing(wait,'Checking Mystery Bag from '+_fb_id+', posted on '+formattedTime,f);}}}
function decode64(input){var output="";var chr1,chr2,chr3="";var enc1,enc2,enc3,enc4="";var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}
chr1=chr2=chr3="";enc1=enc2=enc3=enc4="";}while(i<input.length);return unescape(output);};logs=[];extralog=[];function logtrunc(message,limit,keep){logs.unshift(message);if(limit>0){if(logs.length>limit){message=logs.pop();if((keep.test)&&(keep.test(message)))
extralog.unshift(message);}}
if((document.getElementById('spock_log'))&&(document.getElementById('spock_log').nodeName=='TD')){document.getElementById('spock_log').innerHTML=logs.concat(extralog,'').join('<br/>');}}
function log(s){document.getElementById('delay1').value=wait1;document.getElementById('delay2').value=wait2;document.getElementById('failed').innerHTML=failed+' ('+parseFloat(failed/done*100).toFixed(0)+'%)';document.getElementById('gotBefore').innerHTML=gotBefore+' ('+parseFloat(gotBefore/total*100).toFixed(0)+'%)';document.getElementById('successful').innerHTML=successful+' ('+parseFloat(successful/done*100).toFixed(0)+'%)';document.getElementById('expired').innerHTML=expired+' ('+parseFloat(expired/total*100).toFixed(0)+'%)';document.getElementById('overused').innerHTML=overused+' ('+parseFloat(overused/total*100).toFixed(0)+'%)';document.getElementById('invalid').innerHTML=invalid+' ('+parseFloat(invalid/total*100).toFixed(0)+'%)';document.getElementById('old').innerHTML=old+' ('+parseFloat(old/total*100).toFixed(0)+'%)';document.getElementById('nonfriend').innerHTML=nonfriend+' ('+parseFloat(nonfriend/total*100).toFixed(0)+'%)';document.getElementById('mwerror').innerHTML=MWERROR+' ('+parseFloat(MWERROR/total*100).toFixed(0)+'%)';document.getElementById('spock_progress').innerHTML=(successful+failed)+' of '+total+' &nbsp; <span class="more_in">('+((successful+failed)/total*100).toFixed(1)+'%)</span>';document.getElementById('loot').innerHTML=combinedloot;var l=document.getElementById('spock_log');if(s){logtrunc(s,log_size,log_keep);}}
var Loots=new Array();function add_loot(s,img,from){var WeaponsDepot=/Forge|Arc Welder|Buzzsaw|Gunpowder|Gun Drill|Sonic Emitter|Weapon Part|Grapple|Boomerang|Railgun Barrel|Laser Rangefinder|Explosive Arrow|Portable Fusion Reactor/;var Vegas=/Deposit Box|Magnetic Lock|Motion Sensor|Reinforced Steel|Security Camera|Concrete|Construction Tool|Steel Girder|Cinder Block|Bellhop|Chef|Poker Table|Slot Machine|Casino Dealer/;var MHEL=/Zmeya Carbon Blade|Ubijca Assault Rifle|Konstantin Cargo Carrier|Executive Overcoat|Shturmovik|Zoloto Sports Car/;var FHEL=/12 Gauge|Devastator|Zeus|Bomb Suit|Segmented Body Plate|Skull Cap|Cobra G7|Ruby Red|Turbo Road Warrior|Condor|Cougar|Rhinoceros/;var FHEL2=/Woodsman|Buzzard Combat Chopper|Tasmanian Devil|Domestic Defense/;var ChopShop=/Cement Block|Power Tool|Car Lift|Acetylene Torch|Shipping Container|Car Part|High Tech Car Part|Cuban Car Part|Thai Car Part|Russian Car Part|Solar Panel|Bulletproof Glass|Suspension Coil/;var BHEL=/Nak Kha Shotgun|Titanium Katar|Ninja|Royal Thai Marine|Raed Armored Sedan|Lamang Motorcycle|Chain Viper|Forest Scorpion/;var ENERGY=/Boosted Smoothie|Blueprints|Cappuccino|Chess Master|Faberge Hen|Fixer|Free Ride|Hidden Matryoshka|Inside Tip|Truck Driver|Problem Solver|Energy Boost/;var Attack=/Black Market Ammo|Blowfish Dart|Bola|Car Bomb|Champagne Bottle|Chisel|Corporate Muscle|Flaming Shot|Handy Man|Hollow Point|Hot Coffee|Liquid Courage|Semi-Pro Boxer|Sting Grenade|Throwing Knives|War Paint|Snake Eyes|Dead Man\'s Hand|Stamina Boost/;var Defense=/Berlin Wall Section|Boxer|Bulldog|Bullmastiff|Extra Pair of Eyes|Flash Bang|Hyper Alert Sentry|Injunction|Mr. Hot Sauce|Pepper Spray|Sandbag Wall|Shave & A Haircut|Smoke Grenade|Tripwire|Temporary Tattoo|Mint on the Pillow|Bullet Stopper/;var Robbing=/Alarm System|Bouncer|Motion Detector|Hobo Lookout|Lookout|Mutt|Political Favor|Reinforced Door|Surveillance Camera|Gourment Oysters/;var Money=/Boutonniere|Money Sock/;var Top6=/Reward Point|Skill Point|100 Free Experience|100 Experience|Lotto Ticket/;var Animals=/Arabian Leopard|Badger|Buffalo|Cassowary|Dingo|Electric Eel|Piranha|Kangaroo/;var f=-1;for(var i=0;i<Loots.length&&f==-1;++i){if(Loots[i][1]==s){f=i;}}
if(f!=-1){Loots[f][2]++;if(from.length>0)
Loots[f][4]=Loots[f][4]+', '+from;else
Loots[f][4]='';}
else{var type='Misc';if(/\$|Thai Baht/.test(s))
type='Money';else if(/Wishlist/.test(s))
type='Wishlist';else if(s.search(WeaponsDepot)>-1)
type='Weapons Depot';else if(s.search(ChopShop)>-1)
type='Chop Shop';else if(s.search(Vegas)>-1)
type='Vegas';else if(s.search(ENERGY)>-1)
type='Energy';else if(s.search(Money)>-1)
type='Money';else if(s.search(Attack)>-1)
type='Attack';else if(s.search(Defense)>-1)
type='Defense';else if(s.search(Robbing)>-1)
type='Robbing';else if(s.search(Top6)>-1)
type='Top5';else if(s.search(Animals)>-1)
type='Animals';else if(/(?:http:..mwfb.static.zgncdn.com.mwfb.graphics\/)(.*)(?:\/.*.(?:gif|png))/.test(img))
type=/(?:http:..mwfb.static.zgncdn.com.mwfb.graphics\/)(.*)(?:\/.*.(?:gif|png))/.exec(img)[1];if(type=='v3')
type='Misc';if(from.length>0)
Loots[Loots.length]=new Array(type,s,1,img,'From, '+from);else
Loots[Loots.length]=new Array(type,s,1,img,'');}
var t='<table cellpadding=0 cellspacing=0>';Loots.sort();var header='';for(var i=0;i<Loots.length;++i){if(header!=Loots[i][0]){header=Loots[i][0];t+='<tr><td colspan=2><span class="good"> '+Loots[i][0]+' :</span></td></tr>';}
t+='<tr><td WIDTH=50px></td><td><span class="good">  '+Loots[i][2]+'x</span> <img src="'+Loots[i][3]+'" width="23px" height="23px" />'+Loots[i][1]+' - '+Loots[i][4]+'</td></tr>';}
combinedloot=t+'</table>';}
function msg(s){document.getElementById('spock_status').innerHTML=s;}
function commas(s){while(d=/(\d+)(\d{3}.*)/.exec(s)){s=d[1]+','+d[2];}
return s;}
function retry(s){if(retries>3000){msg(s+', not retrying any more.');}else{setTimeout(function(){retries++;msg(s+'; retry #'+retries+'...');request(last_url);},5000);}}
function mwlink(s){return '<span class="more_in">[<a href="'+mw_url.replace(/ID/,s)+'" target="_blank">MW</a>]</span>';}
function fblink(s){return '<span class="more_in">[<a href="'+fb_url+s+'" target="_blank">FB</a>]</span>';}
function fblink2(s){return '<a href="'+fb_url+friends[0]+'" target="_blank">'+s+'</a>';}
function mblink(s){return '<a href="'+s+'" target="_blank"> MB LINK</a>';}
function timestamp(){now=new Date();var CurH=now.getHours();CurH=(CurH<10?"0"+CurH:CurH);var CurM=now.getMinutes();CurM=(CurM<10?"0"+CurM:CurM);return '<span class="more_in">['+CurH+':'+CurM+']</span> ';}
function decode_error(errc){switch(errc){case 'mc-24':overused++;return 'gift overused';break;case 'ke-29':gotBefore++;return 'already collected';break;case 'kn-39':gotBefore++;return 'already collected from same user';break;case 'af-77':nonfriend++;return 'not in mafia';break;}
return 'unknown error';}
function state_change(strmgs){var imark;var text=strmgs;var lootName;if(u=/from_user=(p%7C(\d+))/.exec(last_url)){from_user=u[1];}
if(u=/from_user=(p[|0-9]+)/.exec(last_url)){from_user=u[1];}
if(u=/from_user=(\d+)/.exec(last_url)){from_user=u[1];}
if(u=/Your Reward Point Pig contained.+?(\d)<.span>/.exec(text)){lootName=/<div style="padding: 5px;">(.*)<.div>/.exec(text)[1]+'with '+u[1]+' Reward Point.';img=/(?:src=")(http:..mwfb.static.zgncdn.com.mwfb.graphics.*.(gif|png))(.*style="width: 75px)/.exec(text)[1];successful++;from=/([a-zA-Z0-9_]*)(?:<.a><.div>)/.exec(text)[1];add_loot(lootName,img,from);log(timestamp()+'Collected Reward Point Pig from '+from+mwlink(from_user)+fblink(_fb_id)+'. ');}else if(/(Mystery Bag contained|Coffin contained|You just accepted|Mystery Shipment contained|Mystery Animal is|maximum amount of this item)/.test(text)){try{lootName=/<div>(.*)<.div>/.exec(text)[1];}catch(err){lootName=/<div style="padding: 5px;">(.*)<.div>/.exec(text)[1];}
img=/(?:src=")(http:..mwfb.static.zgncdn.com.mwfb.graphics.*.(gif|png))(.*style="width: 75px)/.exec(text)[1];successful++;from=/([a-zA-Z0-9_]*)(?:<.a><.div>)/.exec(text)[1];add_loot(lootName,img,from);if(u=/from_user=(p%7C(\d+))/.exec(last_url)){from_user=u[1];}
if(u=/from_user=(p[|0-9]+)/.exec(last_url)){from_user=u[1];}
if(u=/from_user=(\d+)/.exec(last_url)){from_user=u[1];}
if(u=/You already have the maximum amount of this item:<br>(\d.?) out of (\d.?) (.+)<br>You received: (.+?)<.div>/.exec(text)){log(timestamp()+'You already have the maximum amount of this item: '+u[1]+' out of '+u[2]+' '+u[3]+' You received:'+u[4]+'.');}}else if(u=/Mystery Bag item instead.+">(.+)<.div>/.exec(text)){lootname=u[1];//
img=/(?:src=")(http:..mwfb.static.zgncdn.com.mwfb.graphics.*.(gif|png))/.exec(text)[1];successful++;from='';add_loot(lootName,img,from);if(u=/from_user=(p%7C(\d+))/.exec(last_url)){from_user=u[1];}
if(u=/from_user=(p[|0-9]+)/.exec(last_url)){from_user=u[1];}
if(u=/from_user=(\d+)/.exec(last_url)){from_user=u[1];}
log(timestamp()+'You have received a/an '+u[1]+' from a Super Pignata that gave a Mystery Bag Instead. ');}else if(u=/reached your limit for (False Identities|Broken Hearts|Reward Point Pigs|Super Pignatas|Coffins|Time Capsules) today. (.+?)\s\s/.exec(text)){failed++;log(timestamp()+'You have reached your limit for '+u[1]+' today. '+u[2]);}else if(/already accepted/.test(text)){failed++;gotBefore++;}else if(/You were not friends/.test(text)){failed++;nonfriend++;log(timestamp()+'You were not friends with the person who sent you the gift - '+mwlink(_fb_id)+fblink(_fb_id)+' - '+mblink(URLs[0]));}else if(/(This|Your) gift has expired/.test(text)){failed++;expired++;log(timestamp()+'This gift has expired! '+mwlink(_fb_id)+fblink(_fb_id)+'. ');}else if(/Something has gone wrong/.test(text)){failed++;MWERROR++;}else if(/An unknown error occurred/.test(text)){failed++;MWERROR++;}else if(u=/You cannot accept any more Free Gifts today. You can accept more in (\d+) (.+)\./.exec(text)){failed++;log(timestamp()+'You cannot accept any more Free Gifts today. You can accept more in '+u[1]+' '+u[2]+'.');run=0;}else if(u=/<span style="font-size:24px; color: pink;">\( error code: (.+) \)/g.exec(text)){failed++;log(timestamp()+'You got an error Pig with Error Code: '+u[1]+' ('+decode_error(u[1])+(u[1]=='af-77'?mwlink(from_user):'')+').');}else{failed++;MWERROR++;log(timestamp()+'HMMMMM. Error???? '+mwlink(_fb_id)+fblink(_fb_id)+'. ');}
done++;URLs=URLs.slice(1); log();search_bags();}
function loadContent(file){var head=document.getElementsByTagName('head').item(0)
var scriptTag=document.getElementById('loadScript');if(scriptTag)
head.removeChild(scriptTag);script=document.createElement('script');script.src=file;script.type='text/javascript';script.id='loadScript';head.appendChild(script);}
loadContent('http://www.google-analytics.com/ga.js');try{var pageTracker=_gat._getTracker("UA-8435065-3");pageTracker._trackPageview();pageTracker._trackPageview("/script/MysteryBagger");}
catch(err){}}
catch(mainerr){var spock_div=document.getElementById('spockdiv');if(spock_div){spock_div.innerHTML='';}
alert('Some error occured, Mystery Bagger not loaded.\nDid you run it on your gift page or unframed MW page?\nIf you did, report the message below (NOT THIS TEXT) to Spockholm:\n\n'+version+'\n'+mainerr);}})()
