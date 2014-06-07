// ==UserScript==
// @name        Free Gift Get-A-Nator 自動蒐集 fb上的禮物
// @include     https://facebook.mafiawars*/mwfb/remote/html_server.php*
// @exclude     http://apps.facebook.com/*
// @exclude     http://www.facebook.com/extern/*
// @exclude     http://www.facebook.com/connect/*
// @exclude     http://www.facebook.com/plugins/*
// @exclude     http://www.facebook.com/login.php*
// @exclude     http://facebook.mafiawars.com/mwfb/*
// @version     v1.14 beta
// @description  
// @copyright  2011+, You and ↓↓↓ spockholm
// ==/UserScript==

/*
	$Id: free_gift_get_a_nator.js,v 1.27 2011-09-19 07:06:21 eike Exp $
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
var version='Free Gift Get-A-Nator v1.14 beta';
var banner_path = 'http://pic.pimg.tw/hs2889/1318400158-458025681.png';
var stopimg = 'data:image/gif;base64,R0lGODlhEAAQANUAAP8A//////9fX/+Pj/9/f/93d/+Ojv9wcP90dP+Vlf97e/9tbf+Rkf+YmP+cnP+amv9paf9qav+EhP+Kiv+Cgv9nZ/+vr/+hof+Wlv+fn/+1tf+qqv+lpf+8vP+0tP91df+UlP/Bwf9lZf94eP9zc/+Dg/9xcf+2tv/Z2f/Y2P/V1f+Li/+dnf9ubv/X1/+Zmf/Nzf+AgP+Hh/9kZP+/v//Q0P+mpgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAAAAaOQIAQMBAYjYOhEiDwoFIuVc0iWDJhHZujgXlYaNWhIHTKbBMMw+SyCQ9emkwggDbMKQ9CUnDhOOYBdnMEEgVVAixngIMKBQiHDw11gASNCAeHGJOLjgcLhyBplICeEFUDJQMTjAVzCxAzSUwrMhSVna8VYUICEjGWnhG6VgIkIx8mLREiu0tFRwKyVtNWQQA7';
var spocklet = 'getanator',
limit = 50;

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
    //var fb_userid = FB.Facebook.apiClient.get_session().uid+'';
    var fb_userid = User.trackId;
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
	//target_time.setTime(start_time.getTime() - 1000 * 60 * 60 * 12);
	var linkname = [];
	var linkurl = [];
	var linkuser = [];
	var linktime = [];
	
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/';
	//Do a FB session reload, just to be safe
	FB.init({
		appId  : '10979261223',
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		frictionlessRequests : true
	});
	
    //Pistol Pete FQL code
    function parseFBFr(){
			//var fql="SELECT  post_id,actor_id,created_time,message,action_links FROM stream WHERE (message<>'') and  filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') ORDER BY created_time desc limit 100"; //AND created_time < "+parseInt(start_time.getTime() - 1 * 60 * 60 * 1000)+"  
			//var fql="select uid,message, time from status where (strpos(message, 'tinyurl')>0 or strpos(message, 'bit.ly')>0 ) and uid in (SELECT uid2 FROM friend WHERE uid1= me()) AND time < "+parseInt(start_time.getTime() - 24 * 60 * 60 * 1000)+ " order by time desc ";
            //var fql="SELECT post_id,actor_id,source_id,created_time,message FROM stream WHERE (strpos(message, 'tinyurl')>0 or strpos(message, 'bit.ly')>0 ) and source_id = "1534158034" AND viewer_id = '"+fb_userid+"' order by created_time desc limit 2";    
            //var fql="SELECT  post_id,actor_id,created_time,message,source_id FROM stream WHERE (message<>'') and strpos(message, 'tinyurl')>0 and  filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc limit 100"

            //(select uid2 from friend and uid1 = '"+fb_userid+"')
            //var fql="SELECT post_id,actor_id,source_id,created_time,message FROM stream WHERE created_time < "+parseInt(start_time.getTime() - .25 * 60 * 60 * 1000)+ " order by created_time desc limit 100";

			var fql="SELECT post_id,actor_id,created_time,message,source_id FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc limit "+limit;
			//2011-05-06 
			//var fql="SELECT post_id,actor_id,created_time,message,source_id FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND (strpos(message, 'tinyurl')>0 OR strpos(message, 'bit.ly')>0 OR strpos(message, 'spockon.me')>0) AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc limit "+limit;
			//var fql="SELECT post_id,actor_id,created_time,message,source_id FROM stream WHERE filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND (strpos(message, 'spockon.me')>0) AND created_time < "+parseInt(start_time.getTime() / 1000)+" ORDER BY created_time desc limit "+limit;

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

                            t = new Date(parseInt(fbfr[i].created_time)*1000);
                            last_time = t;
                            //results[results.length]={ 'id':fbfr[i].uid, 'name':fbfr[i].name };
                            if (fbfr[i].source_id != null) {
                                //var timestamp = new Date(parseInt(fbfr[i].profile_update_time*1000));
                                for (var re = /((?:\b[a-zA-Z']+\b\s+)*(?:\b[a-zA-Z']+\b))(:|\s=>)\s(http:\/\/tinyurl.com\/?[a-z0-9]*|http:\/\/spockon.me\/?[A-Za-z0-9]*|http:\/\/bit.ly\/?[a-zA-Z0-9]*)/g,m = re.exec(fbfr[i].message); m != null; m = re.exec(m.input)) {
									if (includelink(m[3])) {
										friendquicklist += m[1] + ': ' + m[3]+ '\n';
										linkname.push(m[1]);
										linkurl.push(m[3]);
										linkuser.push(String(fbfr[i].source_id).replace(/undefined/, ''));
										linktime.push(new Date(parseInt(fbfr[i].created_time*1000)));
										msgcnt++;
									}
								}
                                if (t.getTime() <= target_time.getTime()) {
                                    done = true;
                                    //break;
                                }   
                            }
                        }
                    }
                    else{
						friendquicklist='Unable to retrieve list. Please try again.'
					}
                    //document.getElementById('friendlist').value = friendquicklist.replace(/undefined/, '');
                    //document.getElementById('msgcntdiv').innerHTML = msgcnt++ + ' Links Found.';
					document.getElementById('msgcntdiv').innerHTML = post_count + ' Links Found.'+timestamp(last_time) +timestamp(target_time);

					if (fbfr.length < limit) done = true;
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
							friendquicklist += linkname[i] + ': ' + linkurl[i] + '\n';
						} 
						document.getElementById('friendlist').value = friendquicklist.replace(/undefined/, '');
						organizefreegiftlinks();
						return;
					}
                }
            };
        }();
        //document.getElementById('friendlist').value = 'Loading...Be Patient...';
                //FB.Connect.showPermissionDialog('read_stream');
        //FB.Facebook.apiClient.fql_query(fql, f.process);
        FB.api({
            method: 'fql.query',
            query: fql
        },
		function (response) {
            f.process(response);
        });
        
        return ;
    }

	function getLinksFromDatabase(){
		document.getElementById('friendlist').value = 'Loading...Be Patient...';
		if (User.familyId) {
			getLinksFromDatabase2(User.familyId);
		} else {
			requestme('html_server.php?xw_controller=clan&xw_action=view&xw_city=7',function(response){
				var match, famid=0;
				try {
					famid=atob(unescape(/%22%3A%22([a-zA-Z0-9%]+)%22%7D/.exec(response)[1]));
				} catch(noid){}
				if (famid>0) {
					User.familyId=famid;
					getLinksFromDatabase2(famid);
				} else {
					$('#friendlist').val("You are not in a family. Please join one to use this feature, or use the other options.");
				}
			});
		}
	}
	function getLinksFromDatabase2(famid){
		var data={hours: parseFloat(document.getElementById("text_hours2").value.replace(",","."))};
		$.ajax({
			url:'http://spockon.me/lod/lod-api.php?&r='+Math.random()+'&family='+famid+'&action=getgifts&data='+escape(JSON.stringify(data))+'&user='+fb_userid,
			dataType: "jsonp",
			jsonpCallback: 'jsonp'+unix_timestamp()+parseInt(Math.random()*1000),
			success: function(data) {
				if (data.error) {
					$('#friendlist').val("Error:\n"+data.error);
					return;
				} else {
					linkname = [];
					linkurl = [];
					linkuser = [];
					linktime = [];
					msgcnt = 0;
					for(var cat in data)  {
						for(var link in data[cat]){
							var url='http://spockon.me/'+data[cat][link].link;
							friendquicklist += cat + ': ' + url + '\n';
							linkname.push(cat);
							linkurl.push(url);
							linkuser.push(data[cat][link].user);
							linktime.push(new Date(parseInt(data[cat][link].timestamp)*1000));
							msgcnt++;
						}
					}
					if (msgcnt==0) {
						$('#friendlist').val("No links found. Ask your family to submit links that you can click.");
					} else {
						document.getElementById('friendlist').value = friendquicklist.replace(/undefined/, '');
						document.getElementById('msgcntdiv').innerHTML = msgcnt + ' Links Found.';
						organizefreegiftlinks();
					}
					return;
				}
			}
		});			
	}



	function parseFBStatus(){
		//var fql="SELECT  post_id,actor_id,created_time,message,action_links FROM stream WHERE (message<>'') and  filter_key in (SELECT filter_key FROM stream_filter WHERE uid=me() AND type='newsfeed') AND created_time < "+parseInt(start_time.getTime() - 12 * 60 * 60 * 1000)+"  ORDER BY created_time desc limit 5000";
		var fql="select uid,message, time from status where (strpos(message, 'tinyurl')>0 or strpos(message, 'bit.ly')>0 or strpos(message, 'spockon.me')>0 ) and uid in (SELECT uid2 FROM friend WHERE uid1= me()) AND time < "+parseInt(start_time.getTime() - 24 * 60 * 60 * 1000)+ " order by time desc ";
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
								//var timestamp = new Date(parseInt(fbfr[i].profile_update_time*1000));
								for (var re = /((?:\b[a-zA-Z']+\b\s+)*(?:\b[a-zA-Z']+\b))(:|\s=>)\s(http:\/\/tinyurl.com\/?[a-z0-9]*|http:\/\/spockon.me\/?[A-Za-z0-9]*|http:\/\/bit.ly\/?[a-zA-Z0-9]*)/g,m = re.exec(fbfr[i].message); m != null; m = re.exec(m.input)) {
								//for (var re = /((?:\b[a-zA-Z']+\b\s+)*(?:\b[a-zA-Z']+\b)):\s(http:\/\/tinyurl.com\/?[a-z0-9]*|http:\/\/bit.ly\/?[a-zA-Z0-9]*)/g,m = re.exec(fbfr[i].message); m != null; m = re.exec(m.input)) {
									if (includelink(m[3])) {
										friendquicklist += m[1] + ': ' + m[3]+ '\n';
										linkname.push(m[1]);
										linkurl.push(m[3]);
										linkuser.push(String(fbfr[i].uid).replace(/undefined/, ''));
										linktime.push(new Date(parseInt(fbfr[i].time*1000)));
										msgcnt++;
									}
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
		//FB.Facebook.apiClient.fql_query(fql, f.process);
        FB.api({
            method: 'fql.query',
            query: fql
        },
		function (response) {
            f.process(response);
        });
		
		return ;
	}




    function organizefreegiftlinks(){
            var newloot,bagstats={},total=linkuser.length;
            for (var i=0, il=linkuser.length; i<il; i++) { //body loop for the actual links
                    //mysterybagstats(linkname[0],linkurl[0]);
                    currentstat = linkname[0];
                    bagstats[currentstat] == undefined ? bagstats[currentstat]= {"count":0,"name":currentstat,"link":"","tinylink":""} : "";
                    bagstats[currentstat].count > 0 ? bagstats[currentstat].count++ : bagstats[currentstat].count = 1;
                    //bagstats[currentstat].link != ' ' ? bagstats[currentstat].link += bagstats[currentstat].count+': '+linkuser[0]+' : '+freegiftlink2(linkurl[0]) +' ('+linktime[0]+')'+'<br />' : bagstats[currentstat].link = '';
                    bagstats[currentstat].link != ' ' ? bagstats[currentstat].link += bagstats[currentstat].count+': <span id="mw'+linkuser[0]+'">'+linkuser[0]+'</span> : '+freegiftlink2(linkurl[0],linkuser[0]) +' ('+linktime[0]+')'+'<br />' : bagstats[currentstat].link = '';
                    bagstats[currentstat].tinylink != ' ' ? bagstats[currentstat].tinylink += linkurl[0] +'<br />' : bagstats[currentstat].tinylink = '';
                    
                    var bagstatsout = '', bagstatslinks=[];
                    for (x in bagstats) { //header loop for item names and count
                        bagstatsout += '<span><a name="'+escape(bagstats[x].name)+'"></a><span class="good" style="font-size: 1.3em;">'+ bagstats[x].name+':</span>&nbsp;'+bagstats[x].count+' item(s) found.<div class="more_in" class="'+linkuser[0]+'" style="overflow:auto;max-height:200px;width:600px;border: 1px solid #CCCCCC;">'+bagstats[x].link+'</div><div class="more_in spselectable" class="'+linkuser[0]+'" style="overflow:auto;max-height:100px;width:600px;border: 1px solid #CCCCCC;">'+bagstats[x].tinylink+'</div><a href="#" class="'+spocklet+'_bagman">馬上領取</a> | <a href="#" class="'+spocklet+'_bagman2">領~保留其他禮物視窗</a><br /><br /></span>';
                        //document.getElementById('loot').innerHTML = bagstatsout;
						var b=(bagstats[x].count>(total/40)?'<b>':'');
						var b2=(bagstats[x].count>(total/40)?'</b>':'');

						bagstatslinks.push('<a destination="'+escape(bagstats[x].name)+'" href="#" class="'+spocklet+'_hash">'+b+bagstats[x].name+'('+bagstats[x].count+')'+b2+'</a>');
                    }
					//var bagstatslinks=bagstatslinks.sort(function(c,d){var a=c.name,b=d.name;if(a==b){return 0} else if (a>b){return 1;} else { return -1;} });
					var bagstatslinkshtml=bagstatslinks.sort().join(' | ');
                    //newloot += linkuser[0]+'<span class="good">:&nbsp;'+linkname[0]+'</span> <span class="more_in">'+freegiftlink2(linkurl[0]) +'</span><br />';
                    linkname=linkname.slice(1);
                    linkurl=linkurl.slice(1);
                    linkuser=linkuser.slice(1);
                    linktime=linktime.slice(1);
                    
            }
            document.getElementById('loot').innerHTML = bagstatslinkshtml + '<br />'+ bagstatsout;
			// thanks to http://help.dottoro.com/ljcpcpnt.php
			$('.spselectable').click(function(){
				var selection = window.getSelection ();
                var rangeToSelect = document.createRange ();
                rangeToSelect.selectNodeContents (this);
                selection.removeAllRanges ();
                selection.addRange (rangeToSelect);				
				return false;
			});
			$('.'+spocklet+'_hash').click(function(){
				window.location.hash=$(this).attr('destination');
				return false;
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
			$('.'+spocklet+'_bagman').click(function(){
				var a = document.createElement("script");
				a.type = "text/javascript";
				a.src = 'http://www.exellerate.com/mafia/mystery_bagger.js?'+Math.random();
				document.getElementsByTagName("head")[0].appendChild(a);
				bagman($(this).parent().find('.spselectable').html(),true);
				return false;
			});
			$('.'+spocklet+'_bagman2').click(function(){
				var a = document.createElement("script");
				a.type = "text/javascript";
				a.src = 'http://www.exellerate.com/mafia/mystery_bagger.js?'+Math.random();
				document.getElementsByTagName("head")[0].appendChild(a);
				bagman($(this).parent().find('.spselectable').html(),false);
				return false;
			});
    }

	function bagman(data,remove){
		data=data.replace(/<br>/g,"\n");
		if ($('#baglist').length>0){
			$('#baglist').val(data);
			if (remove) { $('#'+spocklet+'_div').remove(); }
		} else {
			setTimeout(bagman,1000,data,remove);
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
        },1000);
    }
    
    var config_html =
    '<style type="text/css">'+
        '.messages img{margin:0 3px;vertical-align:top};'+
        '#close{display:inline};'+  
    '</style>'+
    '<form name="spockform">'+
        '<table class="messages" style="margin-bottom:10px;">'+
            
            '<tr><td colspan="3"><a href="http://userscripts.org/scripts/show/105290" target="_blank"><img src="'+banner_path+'" alt="The Informant Podcast - Where Family is first"></a></td></tr>'+
      '<tr><td><a href="#" id="'+spocklet+'_askperm" class="sexy_button_new short white"><span><span>Ask Permission</a></span></span><td colspan="2" align="right" style="text-align:right;font-size:1.1em;"><span class="good">'+version+'</span> - <a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?Get-a-Nator" alt="Donate Coffee/Beer" target="_blank">Donate Coffee/Pints</a> - <a href="#" id="close" onclick="javascript:$(\'#'+spocklet+'_div\').remove();return false;"><img src="'+stopimg+'" title="Close" width="16" height="16"></a></td></tr>'+
	  '<tr><td colspan="3"><hr /></td></tr>'+
            //'<tr><td colspan=2 style="text-align:right;">Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" maxlength="2" width="2" /> - <input id="delay2" name="delay2" type="text" value="'+wait2+'" maxlength="2" width="2" /> sec</td></tr>'+
                '<tr>' +
      '<td valign="top" colspan="3"><br />該腳本將掃描你的朋友的FB狀態或禮物帖子返回鏈接中列出的免費禮品。領法有兩種，一個是領了就結束，選保留其他禮物視窗，將會在最下面有按鈕給你點選領取 ，等領取完畢再點下一個禮物。</td>' +
      '</tr>' +  
      '<tr>' +
      '<td valign="top">連結:</td>' +
      '<td colspan="2" id="loot"></td>' +
      '</tr>' +
      '<tr id="manual_list">'+
                '<td valign="top">原始連結:</td>'+
                '<td colspan="2"><textarea name="friendlist" id="friendlist" class="instructions" rows="10" cols="60">'+
                '</textarea><div id="msgcntdiv"></div></td>'+
            '</tr>'+
        
            //'<tr><td><a class="sexy_button" id="start"></a></td></tr>'+
            '<tr><td>掃描類型:</td><td colspan="2"><select name="rptlist" id="rptlist"><option value="1">快速 (比較快)</option><option value="2">全部 (時間長)</option><option value="3">Link-o-database</option></select></td></tr>'+
            '<tr class="select select1 select2"><td valign="top">包括類型:</td><td colspan="2">'+
				'<span><input type="checkbox" id="include_spockonme" checked><label>spockon.me</label></span><br />'+
				'<span><input type="checkbox" id="include_tinyurl" checked></span><label>tinyURL</label><br />'+
				'<span><input type="checkbox" id="include_bitly" checked><label>bit.ly</label></span>'+
			'</td></tr>'+
            '<tr class="select select2"><td>文章/要求:</td><td colspan="2"><input type="text" id="post_limit" value="'+limit+'" size="5"/> Only used for full FB scan.</td></tr>'+
            '<tr class="select select3"><td></td><td colspan="2" class="bad">This option is only useful for you if you are in a family and your family is uploading links to the database using the link-a-nator. <a href="http://spockon.me/linkodatabase" target="_blank"><img src="http://mwfb.static.zgncdn.com/mwfb/graphics/icon-help.gif"></a></td></tr>'+
            '<tr class="select select2"><td>Hours to load:</td><td colspan="3"><input type="text" id="text_hours" value="1" size="5"/> Decimals are usable, 0.5 for 30 minutes.</td></tr>'+
            '<tr class="select select3"><td>Hours to load:</td><td colspan="3"><input type="text" id="text_hours2" value="24" size="5"/> Decimals are usable, 0.5 for 30 minutes.</td></tr>'+
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
			target_time.setTime(start_time.getTime() - 1000 * 60 * 60 * hours);        

			rptlist = document.getElementById("rptlist").value;
			
			if(rptlist==1){
				parseFBStatus();
			}
			else if(rptlist==3){
				getLinksFromDatabase();
			}
			else{
				limit = $('#post_limit').val();
				parseFBFr();
			}
         
        }

		$('#rptlist').change(function(e) {
				rptlist = document.getElementById("rptlist").value ;
				$('.select').hide();
				$('.select'+rptlist).show();
				
		}).trigger('change');
		
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
	
	function includelink(url) {
		if (/tinyurl.com/.test(url) && $('#include_tinyurl').is(':checked')) {
			return true;
		}
		if (/bit.ly/.test(url) && $('#include_bitly').is(':checked')) {
			return true;
		}
		if (/spockon.me/.test(url) && $('#include_spockonme').is(':checked')) {
			return true;
		}
		return false;
	}
	function requestme(url, handler, errorhandler) {
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+userid+unix_timestamp();
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+unix_timestamp();
		}
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': userid,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}
			
	$('#'+spocklet+'_askperm').click(function() {
		FB.login(function (response) {},
		{ perms: 'read_stream' });
	});
	
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