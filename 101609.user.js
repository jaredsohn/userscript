// ==UserScript==
// @name           xdfgzdfg
// @author         xdfg
// @description    Pzsdfgz
// @credits        zsdgzsd
// ==/UserScript==

/*
	$Id: free_gift_get_a_nator.js,v 1.8 2011-04-19 05:43:56 eike Exp $
    Credits:
    Vern for a lot of code and inspiration, http://vern.com/mwtools/
    Francisco Moraes for code to handle mw-friends only.
    Max Power for the loot logging code.
    Pete Lundrigan for contributing code.
    Daniel Keen DLDKMAFIA Inspriation
    Martin Hedman - Bunches of Guidance and Encouragement
    http://www.spockholm.com/mafia/
	Bill Liebler for code to scan FB feed for posts.
*/
javascript:(function (){
var version='Free Gift Get-A-Nator v1.06 beta';
var banner_path = 'http://informantpodcast.com/wp-content/uploads/2010/10/InformantPodcast_banner.png';
var stopimg = 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7';
var spocklet = 'getanator'

try {
  if (document.getElementsByClassName('canvas_iframe_util')[0]) {
            for (var i = 0; i < document.forms.length; i++)
			{if (/^canvas_iframe_post/.test(document.forms[i].id))
			{
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
			}
            return;
        }
        else if (document.getElementById('some_mwiframe')) {
            // new mafiawars.com iframe
            window.location.href = document.getElementById('some_mwiframe').src;
            return;
        }
        else {
            document.body.parentNode.style.overflowY = "scroll";
            document.body.style.overflowX = "auto";
            document.body.style.overflowY = "auto";
            try {
                document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
                if (typeof FB != 'undefined') {
                    FB.CanvasClient.stopTimerToSizeToContent;
                    window.clearInterval(FB.CanvasClient._timer);
                    FB.CanvasClient._timer = -1;
                }
                document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);
			
            }
    catch(fberr) {}
  }
    // from Yevgen Silant'yev, http://joyka.pp.ua/
    function getMWURL() {
        str = document.location;
        str = str.toString();
        beg = str.substring(0,str.indexOf('?')+1);
        str = str.substring(str.indexOf('?')+1);
        str = str.split('&');
        mid = '';
        for(var i=0;i<str.length;i++){
            if(str[i].indexOf('sf_xw_')==0){ mid=mid+str[i]+'&'; }
        }
        return beg+mid;
    }
    if (navigator.appName == 'Microsoft Internet Explorer') { 
        alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
        return;
    }
    var MWURL = getMWURL();
    //var sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(document.body.innerHTML)[1];
    var userid =/sf_xw_user_id': '(.+)'/.exec(document.body.innerHTML)[1];
    var uid= /p\|(\d+)/.exec(userid)[1];
    var fb_userid = FB.Facebook.apiClient.get_session().uid+'';
    var run=1,xmlHTTP,content=document.getElementById('content_row'),debug=false,specialmsg='',output='',
    x=0,second=false,last_url=null,retries=1,tmpkey=false,totalfriends=0,combinedloot='',done=0,list=0,ach=1,
    mw_url='http://apps.facebook.com/inthemafia/profile.php?id=%7B%22user%22%3A%22ID%22%7D',color='#BCD2EA',
    fb_url='http://www.facebook.com/profile.php?id=',cuba_gained=0,ny_gained=0,moscow_gained=0,bangkok_gained=0,exp_gained=0,friends_helped=0;
    var friendquicklist='';
    var xw_city = 1;
    var tmp_key='';
    var rptlist=1;
    var mwname,mwlevel,mwchrclass,start_time = new Date();
    var msgcnt = 0;
	var post_count = 0;         
	// var start_time = new Date();
	var target_time = new Date();
	var done = false;
	var last_time = new Date();  
	//target_time.setTime(start_time.getTime() - 10000 * 60 * 60 * 12);
	var linkname = [];
	var linkurl = [];
	var linkuser = [];
	var linktime = [];
	
	//Do a FB session reload, just to be safe
	FB.Connect.forceSessionRefresh();
	
    //Pistol Pete FQL code
    function parseFBFr(){
        //var fql="SELECT  post_id,actor_id,created_time,message,action_links FROM stream WHERE (message<>'') and  filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') ORDER BY created_time desc limit 1000"; //AND created_time < "+parseInt(start_time.getTime() - 1 * 60 * 60 * 10000)+"  
        //var fql="select uid,message, time from status where (strpos(message, 'tinyurl')>0 or strpos(message, 'bit.ly')>0 ) and uid in (SELECT uid2 FROM friend WHERE uid1= me()) AND time < "+parseInt(start_time.getTime() - 24 * 60 * 60 * 10000)+ " order by time desc ";
            //var fql="SELECT post_id,actor_id,source_id,created_time,message FROM stream WHERE (strpos(message, 'tinyurl')>0 or strpos(message, 'bit.ly')>0 ) and source_id = "1534158034" AND viewer_id = '"+fb_userid+"' order by created_time desc limit 2";    
                  //var fql="SELECT  post_id,actor_id,created_time,message,source_id FROM stream WHERE (message<>'') and strpos(message, 'tinyurl')>0 and  filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND created_time < "+parseInt(start_time.getTime() / 10000)+" ORDER BY created_time desc limit 1000"
			var fql="SELECT  post_id,actor_id,created_time,message,source_id FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND created_time < "+parseInt(start_time.getTime() / 10000)+" ORDER BY created_time desc limit 1000"
              //(select uid2 from friend and uid1 = '"+fb_userid+"')
               //var fql="SELECT post_id,actor_id,source_id,created_time,message FROM stream WHERE created_time < "+parseInt(start_time.getTime() - .25 * 60 * 60 * 10000)+ " order by created_time desc limit 1000";
                //alert(fql);

			var f=function(){
            var results=[];
            var friendquicklist = '';
            return {
                getResults: function(){ return results; },
                process: function(fbfr){
                    if (fbfr){
                        //fbfr.sort(function() {return 0.5 - Math.random()});
                        //console.log(fbfr.length);
                                              post_count += fbfr.length;
                                                

                    /*  linkname = [];
                        linkurl = [];
                        linkuser = [];
                        linktime = [];   */
                                                
                        for(i=0;i<fbfr.length;i++) {
                            //document.getElementById('friendlist').value = 'Processing...Please Wait...';
                                                        //var bill = fbfr(i).message
                                                        //alert("+bill");
                                                         
                                                        t = new Date(parseInt(fbfr[i].created_time)*10000);
                                                        last_time = t;




                            //results[results.length]={ 'id':fbfr[i].uid, 'name':fbfr[i].name };
                            if (fbfr[i].source_id != null) {
                                //var timestamp = new Date(parseInt(fbfr[i].profile_update_time*10000));
                                for (var re = /((?:\b[a-zA-Z']+\b\s+)*(?:\b[a-zA-Z']+\b))(:|\s=>)\s(http:\/\/tinyurl.com\/?[a-z0-9]*|http:\/\/spockon.me\/?[A-Za-z0-9]*|http:\/\/bit.ly\/?[a-zA-Z0-9]*)/g,m = re.exec(fbfr[i].message); m != null; m = re.exec(m.input)) {
                                    friendquicklist += m[1] + ': ' + m[3]+ '\n';
                                    linkname.push(m[1]);
                                    linkurl.push(m[3]);
                                    linkuser.push(String(fbfr[i].source_id).replace(/undefined/, ''));
                                    linktime.push(new Date(parseInt(fbfr[i].created_time*10000)));
                                    msgcnt++;}
                                if (t.getTime() <= target_time.getTime()) {
                                                               done = true;
                                                               break;
                                                                }   

                                                            
                            }
                        }
                    }
                    else{friendquicklist='Unable to retrieve list. Please try again.'}
                    //document.getElementById('friendlist').value = friendquicklist.replace(/undefined/, '');
                    //document.getElementById('msgcntdiv').innerHTML = msgcnt++ + ' Links Found.';
                                        document.getElementById('msgcntdiv').innerHTML = post_count + ' Links Found.'+timestamp(last_time) +timestamp(target_time);

                                     if (fbfr.length < 1000) done = true;
                                     if (!done) {
                                     if (last_time.getTime() < start_time.getTime()) {
                                     //msg('Requesting more data. '+post_count+' posts so far.');
                                     //document.getElementById('friendlist').value = 'Requesting more data. '+post_count+' posts so far.' +timestamp(last_time);
                                     start_time.setTime(last_time.getTime() - 1);
                                     parseFBFr();

                                                                                     } 
                                    else done = true; }
                                   if (done) {

             
                                    for (var i=0, il=linkuser.length; i<il; i++) {
                                      friendquicklist += linkname[i] + ': ' + linkurl[i] + '\n';} 
										document.getElementById('friendlist').value = friendquicklist.replace(/undefined/, '');

                                     
                    organizefreegiftlinks();
                     return;}
                }
            };
        }();
        //document.getElementById('friendlist').value = 'Loading...Be Patient...';
                //FB.Connect.showPermissionDialog('read_stream');
        FB.Facebook.apiClient.fql_query(fql, f.process);
        
        return ;
    }




	function parseFBStatus(){
		//var fql="SELECT  post_id,actor_id,created_time,message,action_links FROM stream WHERE (message<>'') and  filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND created_time < "+parseInt(start_time.getTime() - 12 * 60 * 60 * 10000)+"  ORDER BY created_time desc limit 5000";
		var fql="select uid,message, time from status where (strpos(message, 'tinyurl')>0 or strpos(message, 'bit.ly')>0 or strpos(message, 'spockon.me')>0 ) and uid in (SELECT uid2 FROM friend WHERE uid1= me()) AND time < "+parseInt(start_time.getTime() - 24 * 60 * 60 * 10000)+ " order by time desc ";
		//alert(fql);
		var f=function(){
			var results=[];
			var friendquicklist;
			return {
				getResults: function(){ return results; },
				process: function(fbfr){
					if (fbfr){
						//fbfr.sort(function() {return 0.5 - Math.random()});
						//console.log(fbfr.length);
						linkname = [];
						linkurl = [];
						linkuser = [];
						linktime = [];
						for(i=0;i<fbfr.length;i++) {
							document.getElementById('friendlist').value = 'Processing...Please Wait...';
							//results[results.length]={	'id':fbfr[i].uid, 'name':fbfr[i].name };
							if (fbfr[i].uid != null) {
								//var timestamp = new Date(parseInt(fbfr[i].profile_update_time*10000));
								for (var re = /((?:\b[a-zA-Z']+\b\s+)*(?:\b[a-zA-Z']+\b))(:|\s=>)\s(http:\/\/tinyurl.com\/?[a-z0-9]*|http:\/\/spockon.me\/?[A-Za-z0-9]*|http:\/\/bit.ly\/?[a-zA-Z0-9]*)/g,m = re.exec(fbfr[i].message); m != null; m = re.exec(m.input)) {
								//for (var re = /((?:\b[a-zA-Z']+\b\s+)*(?:\b[a-zA-Z']+\b)):\s(http:\/\/tinyurl.com\/?[a-z0-9]*|http:\/\/bit.ly\/?[a-zA-Z0-9]*)/g,m = re.exec(fbfr[i].message); m != null; m = re.exec(m.input)) {
									friendquicklist += m[1] + ': ' + m[3]+ '\n';
									linkname.push(m[1]);
									linkurl.push(m[3]);
									linkuser.push(String(fbfr[i].uid).replace(/undefined/, ''));
									linktime.push(new Date(parseInt(fbfr[i].time*10000)));
									msgcnt++;
								}
							}
						}
					}
					else{friendquicklist='Unable to retrieve list. Please try again.'}
					document.getElementById('friendlist').value = friendquicklist.replace(/undefined/, '');
					document.getElementById('msgcntdiv').innerHTML = msgcnt + ' Links Found.';
					organizefreegiftlinks();
					
				}
			};
		}();
		document.getElementById('friendlist').value = 'Loading...Be Patient...';
		FB.Facebook.apiClient.fql_query(fql, f.process);
		
		return ;
	}




    function organizefreegiftlinks(){
            var newloot,bagstats={};
            for (var i=0, il=linkuser.length; i<il; i++) { //body loop for the actual links
                    //mysterybagstats(linkname[0],linkurl[0]);
                    currentstat = linkname[0];
                    bagstats[currentstat] == undefined ? bagstats[currentstat]= {"count":0,"name":currentstat,"link":"","tinylink":""} : "";
                    bagstats[currentstat].count > 0 ? bagstats[currentstat].count++ : bagstats[currentstat].count = 1;
                    //bagstats[currentstat].link != ' ' ? bagstats[currentstat].link += bagstats[currentstat].count+': '+linkuser[0]+' : '+freegiftlink2(linkurl[0]) +' ('+linktime[0]+')'+'<br />' : bagstats[currentstat].link = '';
                    bagstats[currentstat].link != ' ' ? bagstats[currentstat].link += bagstats[currentstat].count+': <span id="mw'+linkuser[0]+'">'+linkuser[0]+'</span> : '+freegiftlink2(linkurl[0],linkuser[0]) +' ('+linktime[0]+')'+'<br />' : bagstats[currentstat].link = '';
                    bagstats[currentstat].tinylink != ' ' ? bagstats[currentstat].tinylink += linkurl[0] +'<br />' : bagstats[currentstat].tinylink = '';
                    
                    var bagstatsout = '';
                    for (x in bagstats) { //header loop for item names and count
                        bagstatsout += '<span class="good" style="font-size: 1.3em;">'+ bagstats[x].name+':</span>&nbsp;'+bagstats[x].count+' item(s) found.<div class="more_in" class="'+linkuser[0]+'" style="overflow:auto;max-height:200px;width:600px;border: 1px solid #CCCCCC;">'+bagstats[x].link+'</div><div class="more_in spselectable" class="'+linkuser[0]+'" style="overflow:auto;max-height:1000px;width:600px;border: 1px solid #CCCCCC;">'+bagstats[x].tinylink+'</div><br />';
                        //document.getElementById('loot').innerHTML = bagstatsout;
                    }
                    //newloot += linkuser[0]+'<span class="good">:&nbsp;'+linkname[0]+'</span> <span class="more_in">'+freegiftlink2(linkurl[0]) +'</span><br />';
                    linkname=linkname.slice(1);
                    linkurl=linkurl.slice(1);
                    linkuser=linkuser.slice(1);
                    linktime=linktime.slice(1);
                    
            }
            document.getElementById('loot').innerHTML = bagstatsout;
			// thanks to http://help.dottoro.com/ljcpcpnt.php
			$('.spselectable').click(function(){
				var selection = window.getSelection ();
                var rangeToSelect = document.createRange ();
                rangeToSelect.selectNodeContents (this);
                selection.removeAllRanges ();
                selection.addRange (rangeToSelect);				
			});
            
            var links=document.getElementsByClassName('freegiftlink');
            for (var i=0;i<links.length;i++) {
                links[i].onclick=function(e) {
                    this.innerHTML = 'Visited Link';
                    var idlinks = document.getElementsByName(this.name);
                    for (var j=0;j<idlinks.length;j++) {
                        document.getElementsByName(this.name)[j].innerHTML = 'Visited';
                    }
                    //alert(this.name+'\n\n'+this.innerHTML);   
                };  
            }
    }

    function myRandom(min,max) {
        return min + Math.floor(Math.round((Math.random() * (max - min))));
    }
    // deliberate pause from Vern's toolkit.js, http://vern.com/mwtools/
    // given a number of seconds, an optional message and a resume
    // function, will pause a few seconds and then execute the function
    function pausing(seconds,message,resume_func) {
        // if the message was left out, shuffle things a bit
        if (typeof(message) == 'function') {
            resume_func = message;
            message = null;
        }
        if (message)
            message=message;
        else
        message='Pausing';
        msg(message+' <span id="seconds">'+seconds+' second'+(seconds==1?'':'s')+'</span>...');
        //var me = this;
        var timer = setInterval(function(){//)
            seconds--;
            if (document.getElementById('seconds'))
                document.getElementById('seconds').innerHTML=seconds+' second'+(seconds==1?'':'s');
            else
                clearInterval(timer);
            if (seconds<=0) {
                clearInterval(timer);
                if (typeof(resume_func) == 'function')
                    resume_func();
            }
        },10000);
    }
    
    var config_html =
    '<style type="text/css">'+
        '.messages img{margin:0 3px;vertical-align:top};'+
        '#close{display:inline};'+  
    '</style>'+
    '<form name="spockform">'+
        '<table class="messages" style="margin-bottom:10px;">'+
            
            '<tr><td colspan="3"><a href="http://informantpodcast.com" target="_blank"><img src="'+banner_path+'" alt="The Informant Podcast - Where Family is first"></a></td></tr>'+
      '<tr><td>[<a href="#" onclick="FB.Connect.showPermissionDialog(\'read_stream\'); return false;">Ask Permission</a>]<td colspan="2" align="right" style="text-align:right;font-size:1.1em;"><span class="good">'+version+'</span> - <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?Get-a-Nator" alt="Donate Coffee/Beer" target="_blank">Donate Coffee/Pints</a> - <a href="#" id="close" onclick="javascript:$(\'#'+spocklet+'_div\').remove();return false;"><img src="'+stopimg+'" title="Close" width="16" height="16"></a></td></tr>'+
	  '<tr><td colspan="3"><hr /></td></tr>'+
            //'<tr><td colspan=2 style="text-align:right;">Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" maxlength="2" width="2" /> - <input id="delay2" name="delay2" type="text" value="'+wait2+'" maxlength="2" width="2" /> sec</td></tr>'+
                '<tr>' +
      '<td valign="top" colspan="3">This script will scan your friends FB Statuses or Feed Posts and return the Free Gift Links listed.<br />Make a selecton below and press the Scan button.</td>' +
      '</tr>' +  
      '<tr>' +
      '<td valign="top">Links:</td>' +
      '<td colspan="2" id="loot"></td>' +
      '</tr>' +
      '<tr id="manual_list">'+
                '<td valign="top">Raw Links:</td>'+
                '<td colspan="2"><textarea name="friendlist" id="friendlist" class="instructions" rows="10" cols="60">'+
                '</textarea><div id="msgcntdiv"></div></td>'+
            '</tr>'+
        
            //'<tr><td><a class="sexy_button" id="start"></a></td></tr>'+
            '<tr><td>Scan Type: </td><td colspan="2"><select name="rptlist" id="rptlist"><option value="1">Quick (FB Statuses)</option><option value="2">Full (FB Feed)</option></select></td></tr>'+
            '<tr><td >Hours to load:</td><td colspan="3"><input type="text" id="text_hours" value="1" size="5"/> Decimals are usable, 0.5 for 30 minutes. Only necesssary for Feed Scans.</td></tr>'+
                       '<tr><td colspan="3"><a class="sexy_button" id="'+spocklet+'start">Scan</a></td></tr>' +
        '</table>'+
    '</form>';
    
    
    function create_div() {
        if(document.getElementById(spocklet+'_div')) {
            document.getElementById(spocklet+'_div').innerHTML = config_html;
        }
        else {
            var spock_div=document.createElement("div");
            spock_div.id = spocklet+'_div';
            spock_div.innerHTML = config_html;
            content.insertBefore(spock_div, content.firstChild);
        }
    }
    create_div();
    //parseFBFr();
    

        function start() {
        //create_div();
        //document.getElementById('spockdiv').innerHTML = running_html;
        //document.getElementById("close").onclick = close;
        //document.getElementById("close").style.display = 'inline';
        //msg('Requesting data...');
        hours = parseFloat(document.getElementById("text_hours").value.replace(",","."));
        if (hours < 0) hours = 1;
        if (hours > 24) hours = 24;
        target_time.setTime(start_time.getTime() - 10000 * 60 * 60 * hours);        

		rptlist = document.getElementById("rptlist").value;
		
		if(rptlist==1){
		parseFBStatus();
		}
		else{
         parseFBFr();
        }
         
         }

		document.getElementById("rptlist").onchange=function(e) {
				rptlist = document.getElementById("rptlist").value ;
				
			};
         document.getElementById(spocklet+'start').onclick = start;
   

    function msg(s) {
            document.getElementById('status').innerHTML=s;
    }
    function commas(s) {
        while (d=/(\d+)(\d{3}.*)/.exec(s)) {
            s = d[1] + ',' + d[2];
        }
        return s;
    }
    function retry(s) {
      if (retries > 0) {
        msg(s + ', not retrying any more.');
        done++;
            friends=friends.slice(1);
            names=names.slice(1);
            //profile_update=profile_update.slice(1);
            search_job();
            retries=1;
      }
      else {
            setTimeout(function(){
                retries++;
                msg(s+'; retry #'+retries+'...');
                request(last_url);
            },5000);
        }
    }
    function mwlink() {
        return '<span class="more_in">[<a href="'+mw_url.replace(/ID/,friends[0])+'">'+mw_url.replace(/ID/,friends[0])+'</a>]</span>';
    }
    function fblink() {
        return '<span class="more_in">[<a href="'+fb_url+friends[0]+'">'+fb_url+friends[0]+'</a>]</span>';
    }
    function fblink2() {
        return '<a href="'+fb_url+friends[0]+'">'+friends[0]+'</a>';
    }
    function freegiftlink2(link,id) {
        //return '<a href="'+link+'" target="_blank" onclick="this.innerHTML=\'Visited Link\';document.getElementsByClassName(\'mw'+id+'\').innerHTML=\'Visited\';">[Free-Gift Link]</a>';
        return '<a name="mw'+id+'" class="freegiftlink" href="'+link+'" target="_blank">[Free-Gift Link]</a>';
    }
    function clicked_link() {
        this.innerHTML = 'Visited Link';
        document.getElementsByClassName('mw'+this.id)[0].innerHTML = 'Visited';
        alert(this.id+'\n\n'+this.innerHTML);       
    }
    function unix_timestamp() {
        return parseInt(new Date().getTime().toString().substring(0, 10))
    }
    
    
	function timestamp(d) {
		now = d == undefined ? new Date() : d;
		var CurH = now.getHours();
		CurH = (CurH < 10 ? "0" + CurH : CurH);
		var CurM = now.getMinutes();
		CurM = (CurM < 10 ? "0" + CurM : CurM);
		return '<span class="more_in">[' + CurH + ':' + CurM + ']</span> ';
	}

	function msg(s) {
		document.getElementById('status').innerHTML = s;
	}

    //testing to add analytics
    function loadContent(file){
        var head = document.getElementsByTagName('head').item(0)
        var scriptTag = document.getElementById('loadScript');
        if(scriptTag) head.removeChild(scriptTag);
            script = document.createElement('script');
            script.src = file;
            script.type = 'text/javascript';
            script.id = 'loadScript';
            head.appendChild(script);
    }
    loadContent('http://www.google-analytics.com/ga.js');
    try {
		var pageTracker = _gat._getTracker("UA-8435065-3");
		pageTracker._trackPageview();
		pageTracker._trackPageview("/script/Get-a-Nator"); 
    }
	catch(err) {}
    //end analytics

    } //end try
    catch(mainerr) {
        var spock_div=document.getElementById('spockdiv');
        if(spock_div) {
            spock_div.innerHTML='';
        }
        alert('Some error occured, Friends Stats not loaded.\nDid you run on an unframed MW page?\nIf you did, report the message below (NOT THIS TEXT) to Spockholm:\n\n'+version+'\n'+mainerr);
    }
}())