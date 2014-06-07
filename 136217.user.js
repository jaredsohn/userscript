// ==UserScript==
// @name           Skipper Ads + download helper
// @author         Ery 
// @namespace      http://www.portalblogger.co.cc
// @description    No time waiting skip ads
// @version        2.2
/*===================================================
                 adfoc.us
=====================================================*/
// @include        *://adfoc.us/*

/*===================================================
                 zpag.es
=====================================================*/
// @include        *://zpag.es/*

/*===================================================
                 urlcash.net
====================================================*/
// @include        *://*.bat5.com/*
// @include        *://*.celebclk.com/*
// @include        *://*.eightteen.com/*
// @include        *://*.looble.net/*
// @include        *://*.peekatmygirlfriend.com/*
// @include        *://*.pornyhost.com/*
// @include        *://*.smilinglinks.com/*
// @include        *://*.urlcash.net/*
// @include        *://*.urlcash.org/*
// @include        *://*.xxxs.org/*

/*==================================================
                 linkbucs.com
===================================================*/
// @include        *://*.linkbucks.com/
// @include        *://*.allanalpass.com/*
// @include        *://*.amy.gs/*
// @include        *://*.any.gs/*
// @include        *://*.baberepublic.com/*
// @include        *://*.deb.gs/*
// @include        *://*.drstickyfingers.com/*
// @include        *://*.dyo.gs/*
// @include        *://*.fapoff.com/*
// @include        *://*.filesonthe.net/*
// @include        *://*.galleries.bz/*
// @include        *://*.hornywood.tv/*
// @include        *://*.linkbabes.com/*
// @include        *://*.linkbucks.com/*
// @include        *://*.linkgalleries.net/*
// @include        *://*.linkseer.net/*
// @include        *://*.miniurls.co/*
// @include        *://*.picbucks.com/*
// @include        *://*.picturesetc.net/*
// @include        *://*.placepictures.com/*
// @include        *://*.poontown.net/*
// @include        *://*.qqc.co/*
// @include        *://*.qvvo.com/*
// @include        *://*.realfiles.net/*
// @include        *://*.rqq.co/*
// @include        *://*.seriousdeals.net/*
// @include        *://*.seriousfiles.com/*
// @include        *://*.seriousurls.com/*
// @include        *://*.sexpalace.gs/*
// @include        *://*.seriousfiles.com/*
// @include        *://*.theseblogs.com/*
// @include        *://*.thesefiles.com/*
// @include        *://*.theseforums.com/*
// @include        *://*.thosegalleries.com/*
// @include        *://*.tinybucks.net/*
// @include        *://*.tinylinks.co/*
// @include        *://*.tnabucks.com/*
// @include        *://*.tubeviral.com/*
// @include        *://*.uberpicz.com/*
// @include        *://*.ubervidz.com/*
// @include        *://*.ubucks.net/*
// @include        *://*.ugalleries.net/*
// @include        *://*.ultrafiles.net/*
// @include        *://*.urlbeat.net/*
// @include        *://*.urlpulse.net/*
// @include        *://*.whackyvidz.com/*
// @include        *://*.youfap.me/*
// @include        *://*.yyv.co/*
// @include        *://*.zxxo.net/*
// @include        *://*.zff.co/*

/*==================================================
                 adf.ly
===================================================*/
// @include        *://adf.ly/*
// @include        *://j.gs/*
// @include        *://q.gs/*
// @include        *://9.bb/*
// @include        *://u.bb/*
// @exclude        *://adf.ly/go/*
// @exclude        *://j.gs/go/*
// @exclude        *://q.gs/go/*
// @exclude        *://9.bb/go/*
// @exclude        *://u.bb/go/*
/*==================================================
                 liencash.com
====================================================*/
// @include        *://www.lienscash.com/l/*
/*==================================================
                 mediafire.com
====================================================*/
// @include        *://www.mediafire.com/*

/*==================================================
                 lnk.co
====================================================*/
// @include        *lnk.co/*
// @include        *://*.linkbee.com/*

/*==================================================
                 xa.ly
====================================================*/
// @include        *xa.ly/*
// @include        *robo.us/*
// @include        *adv.li/*
// @include        *.awsclic.com/*

/*===================================================
                modern url shrinker
				   (using ajax)
====================================================*/
// @include        *1ly.us/*
// @include        *bc.vc/*
// @include        *adjoin.me/*
// @include        *adjoin.me/*
// @include        *1ly.us/*
// @include        *mo.vc/*
// @include        *adsbrite.net/*
// @include        *4ks.net/*
// @include        *youlinking.com/*
// @include        *qurlt.com/*
// @include        *take-a.com/*
// @include        *filesko.com/*
// @include        *zpoz.net/*
// @include        *pp.nu/*
// @include        *mhz.me/*
// @include        *fly2url.com/*
// @include        *pea.bz/*
// @include        *imi.us.tc/*
// @include        *shortit.in/*
// @include        *www.adsbrite.net/*
// @include        *gr8s.us/*
/*======================================================
					exclude
=======================================================*/
// @exclude        http://www.awsclic.com/
// @exclude        http://www.awsclic.com/members/register/
// @exclude        http://www.awsclic.com/fr/
// @exclude        http://www.adsbrite.net/
// @exclude        http://1ly.us/
// @exclude        http://adjoin.me/
// @exclude        http://robo.us/
// @exclude        http://youlinking.com
// @exclude        http://adjoin.me/
// @exclude        http://1ly.us/
// @exclude        http://mo.vc/
// @exclude        http://adsbrite.net/
// @exclude        http://4ks.net/
// @exclude        http://youlinking.com
// @exclude        http://qurlt.com/
// @exclude        http://take-a.com/
// @exclude        http://filesko.com/
// @exclude        http://zpoz.net/
// @exclude        http://pp.nu/
// @exclude        http://mhz.me/
// @exclude        http://fly2url.com/
// @exclude        http://pea.bz/
// @exclude        http://imi.us.tc/
// @exclude        http://shortit.in/
// @exclude        http://www.adsbrite.net/
// @exclude        http://gr8s.us/
// @exclude        *://google.*
// @icon           http://leech.mobie.in/images/cute-ninja-psd62514.png
//====================================================
// Reason : simple code
// Info : http://userscripts.org/scripts/show/136217
// @copyright       2012 © Ery
// ==/UserScript==

var script_updater = {
    default_options : {
        script_name:"ASkip Ads,download helper",
        script_version:"2.2",
        script_id:"136217",
        script_update_reason:""
    },
    check_version:function(src_version,dest_version){
        src_version = parseFloat(src_version);
        dest_version = parseFloat(dest_version);
        console.log(src_version,dest_version,src_version<dest_version);
        return src_version < dest_version;
    },
    update:function(options){
        var opt = options || this.default_options;
        var ret = {},_this = this;
        GM_xmlhttpRequest({
            method:'GET',
            url:"http://userscripts.org/scripts/source/"+opt.script_id+".meta.js",
            onload:function(xmlHttp){
                if(xmlHttp.readyState === 4 && xmlHttp.status === 200){
                    if(/\/\/\s*@version\s*(\d.*)/.test(xmlHttp.responseText)){
                        var new_version = RegExp.$1;
                        if(_this.check_version(opt.script_version,new_version)){
							var rex = [/Reason\s:([^\n]+)/g,/Info\s:([^\n]+)/g]
							var reason = rex[0].exec(xmlHttp.responseText)
							var info = rex[1].exec(xmlHttp.responseText)                         
                            message = "Update for: "+opt.script_name +"\nVersion: "+new_version+"\n"+reason[0]+"\n"+info[0]+"\nThanks for using my script";
                            alert(message);
                            window.location.href = "http://userscripts.org/scripts/source/"+opt.script_id+".user.js";
                        }
                    }
                }
            },
            synchronous:false
        });
    }    
};

script_updater.update();


var me = {
	
	version:"2.2",
	
	htm:'<center><br><br><p style="color: rgb(255, 255, 255); font-size: 20px;"><b>De-ads v2.2</b></p>'+
		'<p style="color: rgb(244, 244, 244); font-size: 18px;"><b>Redirect To</b></p>',
		
	htm2:'<center><br><br><br><p style="color: rgb(255, 255, 255); font-size: 20px;"><b>De-ads v2.2</b></p>'+
		 '<p style="color: rgb(244, 244, 244); font-size: 18px;"><b>Redirect To</b></p>',
	
	match:function(){
			var _this = this.adslist;
			for(var i in _this){
			var mdomain = location.href.match(_this[i].host)
			if(mdomain){
			_this[i].run()
			}
		}
	},
		
	inject:function(scr){
			var s = document.createElement('script');
			s.type = "text/javascript";
			s.innerHTML = scr
			document.getElementsByTagName("head")[0].appendChild(s)
	},
	
	ajax:function(a){
			var m = /\$.post([^{]+){opt:'make_log'([^}]+)}},/igm.exec(a);
			if(m)
			{
			var s1 = "function clog(){ "+m[0]+
			 "\nfunction(rr){\n var jj = eval('(' + rr + ')');\n if (jj.message) {\n top.location.href = jj.message.url;}})}"+
			 "\nvar mi = setInterval('clog();', 1000)"
			this.inject(s1);
			}
			else
			{
			var m2 = /top\.location\.href\s?=\s?'([^\']+)'/g.exec(a);
			top.location.href = m2[1];
			}
	},
	
	skip:function redirect(go){
					if(go && location.hostname.match(/adf.ly|j.gs|q.gs|9.bb|u.bb/)){
						if(go && go.match(/^htt(ps|p):\/\/(adf.ly|j.gs|q.gs|9.bb|u.bb)/)){
						document.title = 'Bypassed! De-ads v'+this.version;
						document.body.innerHTML = this.htm+
												  '<p><a href="'+go+'"><b>'+go+'</b></a></p>'+
												  '<p style="color: rgb(244, 244, 244); font-size: 16px;"><b>Please wait...</b></p></center>'
						document.body.setAttribute("style", "display: table;width:100%; height:100%; background-color: rgb(56, 161, 219);")
						setTimeout(function(){location.href = go}, 10);
								}
						else {
						document.title = 'Bypassed! De-ads v'+this.version;
						document.body.innerHTML = this.htm2+
											  '<p><a href="'+go+'"><b>'+location.protocol+"//"+location.host+go+'</b></a></p>'+
											  '<p style="color: rgb(244, 244, 244); font-size: 16px;"><b>Please wait...</b></p></center>'
						document.body.setAttribute("style", "display: table;width:100%; height:100%; background-color: rgb(56, 161, 219); ")
						setTimeout(function(){location.href = go}, 10);
					}
			}
			else {
			document.title = 'Bypassed! De-ads v'+this.version;
			document.body.innerHTML = this.htm+
									  '<p><a href="'+go+'"><b>'+go+'</b></a></p>'+
									  '<p style="color: rgb(244, 244, 244); font-size: 16px;"><b>Please wait...</b></p></center>'
			document.body.setAttribute("style", "display: table;width:100%; height:100%; background-color: rgb(56, 161, 219); ")
			setTimeout(function(){location.href = go}, 10);
		}
	},
	
	adslist:{
		adfly:{
			host:/adf.ly|q.gs|j.gs/,
			run:function(){
				var _stop = window.top.stop();
				if(location.href.match(/(adf.ly|j.gs|q.gs|9.bb|u.bb)\/locked/))
				{while((elm=document.getElementsByTagName('script')).length){elm[0].parentNode.removeChild(elm[0]);}
				var scr = "function unlock(){var a = document.getElementById('continue');\n"+
						  "if(a){\nlocation.href = a.getElementsByTagName('a')[0].href\nclearInterval(ii)}};\nunlock();"+
						  "\nvar ii = setInterval('unlock();',1000)"
				me.inject(scr)
				}
				else{
				var s = document.getElementsByTagName('head');
				var m = /var url = '([^"]+)'/g.exec(s[0].innerHTML)
				if(m){
				_stop
				document.cookie = "PHPSESSID=;"
				me.skip(m[1])
				}
			}
			}
		},

		adfocus:{
			host:/adfoc.us/,
			run:function(){
				var _stop = window.top.stop();
				var s = document.getElementsByTagName('script');
				for(var i in s){
				var m = /var click_url = "([^']+)"/g.exec(s[i].innerHTML)
				if(m){
				_stop
				return me.skip(m[1])
				}}
			}
		},
		
		advli:{
			host:/adv.li/,
			run:function(){
				var _stop = window.top.stop();
				var s = document.getElementsByTagName('body');
				var a = /_url='([^']+)'/g.exec(s[0].innerHTML)
				if(a){
				_stop
				me.skip(a[1])
				}
			}
			
		},
		
		linkbucks:{
			host:/htt(ps|p):\/\/[a-z0-9]{8}\..*\.(co|com|gs|us|net|me|tv|bz)/,
			run:function(){
				var _stop = window.top.stop();
				var s = document.getElementsByTagName('body');
				var m = /Lbjs.TargetUrl = '([^']+)'/g.exec(s[0].innerHTML)
				if(m){
				var interv = setInterval('0', 10);
				while(--interv>0)
				clearInterval(interv);
				me.skip(m[1])}
			}
		},
		
		urlcash:{
			host:/bat5.com|celebclk.com|eightteen.com|looble.net|peekatmygirlfriend.com|pornyhost.com|smilinglinks.com|urlcash.net|urlcash.org|xxxs.org/,
			run:function(){
				var _stop = window.top.stop();
				var s = document.getElementsByTagName('body');
				var m =  /linkDestUrl = '([^']+)'/g.exec(s[0].innerHTML)
				if(m){
				me.skip(m[1])}
			}
		},
		
		liencash:{
			host: /lienscash.com/,
			run:function(){
				var _stop = window.top.stop();
				var s = document.getElementsByTagName('head');
				var m = /window.location.href="([^']+)"/g.exec(s[0].innerHTML)
				if(m){
				me.skip(m[1])}
			}
		},
		
		mediafire:{
			host: /mediafire.com/,
			run:function(){
				var _stop = window.top.stop();
				var s = document.getElementsByTagName('body');
				var m = /kNO = "([^"]+)"/g.exec(s[0].innerHTML)
				if(m){
				me.skip(m[1])}
			}
		},
		
		zpages:{
			host: /zpag.es/,
			run:function(){
				var _stop = window.top.stop();
				var s = document.getElementsByTagName('head');
				var m = /window.location = "([^']+)";/g.exec(s[0].innerHTML)
				if(m){me.skip(m[1])}
			}
		},
		
		xaly:{
			host: /xa.ly|robo.us/,
			run:function(){
			var scr = "document.title= 'Bypassed!'\nvar x = Base64.decode(fl);\ndocument.body.innerHTML = '<center><br><br><p>Redirect to</p><p>'+x+'</p></center>'"+
					  "\nsetTimeout(\"window.location = Base64.decode(fl);\", 10)"
			return me.inject(scr)
			}
		},
		
		lnkco:{
			host: /lnk.co|linkbee.com/,
			run:function(){
			var scr = "function skip(){document.title = 'Bypassed! De-ads v2.2'"+
					  "\nvar j = document.getElementById('urlholder');"+
					  "\nif(j){\nlocation.href = j.value;"+
					  "\nclearInterval(ii)\n}}"+
					  "\nskip();\nvar ii = setInterval('skip();',100)"
			return me.inject(scr)
			}
		},
		
		ilixin:{
			host:/ilix.in/,
			run:function(){while((elm=document.getElementsByTagName('script')).length){elm[0].parentNode.removeChild(elm[0]);}
			
			}
		},
		
		nyebeli:{
			host:/(bc.vc|fly2url.com|pea.bz|imi.us.tc|shortit.in|adjoin.me|1ly.us|mo.vc|4ks.net|youlinking.com|qurlt.com|take-a.com|filesko.com|zpoz.net|pp.nu|mhz.me|adsbrite.net|gr8s.us)/,
			run:function(){
					while((elm=document.getElementsByTagName('iframe')).length){elm[0].parentNode.removeChild(elm[0]);}
					var s = document.getElementsByTagName('body');
					if(location.hostname.match(/[^(bc.vc)]/)){
					var m = /\(function\(p,a,c,k,e,d\).*{}\)\)/g.exec(s[0].innerHTML)
					if(m){
					document.title = "Bypassed! Please wait..."
					var txt = document.createElement('textarea');
					txt.value = eval(m[0])
					val = txt.value
					return me.ajax(val)}
					}
					else
					{
					var m = /\$.post([^{]+){opt:'make_log'([^}]+)}},/g.exec(s[0].innerHTML);
					if(m)
					{document.title = "Bypassed! Please wait..."
					var s1 = "function clog(){ "+m[0]+
					"\nfunction(rr){\n var jj = eval('(' + rr + ')');\n if (jj.message) {\n top.location.href = jj.message.url;}})}"+
					"\nvar mi = setInterval('clog();', 1000)"
					me.inject(s1);
					}
					else{
					var m2 = /top\.location\.href\s?=\s?'([^\']+)'/g.exec(s[0].innerHTML);
					if(m2){top.location.href = m2[1];}
					}}
			}
		
	},
		
}
}
me.match()