// ==UserScript==
// @name           Bypass Shortlinks by Zabeltechcentre
// @namespace      quiethackermultiztc@gmail.com
// @description    Version 3.7
// @author         Zabel Iqbal
// @updateURL      https://userscripts.org/scripts/source/69797.meta.js
// @version        3.7
// @include        http://*.linkbucks.com/*
// @include        http://*.allanalpass.com/*
// @include        http://*.amy.gs/*
// @include        http://*.any.gs/*
// @include        http://*.baberepublic.com/*
// @include        http://*.deb.gs/*
// @include        http://*.drstickyfingers.com/*
// @include        http://*.dyo.gs/*
// @include        http://*.fapoff.com/*
// @include        http://*.filesonthe.net/*
// @include        http://*.galleries.bz/*
// @include        http://*.hornywood.tv/*
// @include        http://*.linkbabes.com/*
// @include        http://*.linkgalleries.net/*
// @include        http://*.linkseer.net/*
// @include        http://*.miniurls.co/*
// @include        http://*.picbucks.com/*
// @include        http://*.picturesetc.net/*
// @include        http://*.poontown.net/*
// @include        http://*.qqc.co/*
// @include        http://*.qvvo.com/*
// @include        http://*.realfiles.net/*
// @include        http://*.rqq.co/*
// @include        http://*.seriousdeals.net/*
// @include        http://*.seriousfiles.com/*
// @include        http://*.seriousurls.com/*
// @include        http://*.sexpalace.gs/*
// @include        http://*.theseblogs.com/*
// @include        http://*.thesefiles.com/*
// @include        http://*.theseforums.com/*
// @include        http://*.thesegalleries.com/*
// @include        http://*.thosegalleries.com/*
// @include        http://*.tinybucks.net/*
// @include        http://*.tinylinks.co/*
// @include        http://*.tnabucks.com/*
// @include        http://*.tubeviral.com/*
// @include        http://*.uberpicz.com/*
// @include        http://*.ubervidz.com/*
// @include        http://*.ubucks.net/*
// @include        http://*.ugalleries.net/*
// @include        http://*.ultrafiles.net/*
// @include        http://*.urlbeat.net/*
// @include        http://*.urlpulse.net/*
// @include        http://*.whackyvidz.com/*
// @include        http://*.youfap.com/*
// @include        http://*.youfap.me/*
// @include        http://*.yyv.co/*
// @include        http://*.zff.co/*
// @include        http://*.zxxo.net/*
// @include        http://adf.ly/*
// @include        http://u.bb/*
// @include        http://9.bb/*
// @include        http://q.gs/*
// @include        http://j.gs/*
// @include        http://*.imagevenue.com/img.php?*
// @include        http://*.urlcash.net/*
// @include        http://linkbee.com/*
// @include        http://lnk.co/*
// @include        http://*alabout.com/*
// @include        http://*alafs.com/*
// @include        http://pushba.com/*
// @include        http://www.turboimagehost.com/*
// @include        http://*imageporter.com/*
// @include        http://*imagecarry.com/*
// @include        http://*imagedunk.com/*
// @include        http://*imageswitch.com/*
// @include        http://*picleet.com/*
// @include        http://*picturedip.com/*
// @include        http://*pictureturn.com/*
// @include        http://www.pixhost.org/show/*
// @include        http://ichan.org/*
// @include        http://zpag.es/*
// @include        http://imgchili.com/show/*
// @include        http://www.viidii.com/*
// @include        http://adfoc.us/serve/?id=*
// @include        http://imagetwist.com/*
// @include        http://piclambo.net/*
// @exclude        http://www.linkbucks.com/
// @exclude        http://linkbee.com/
// @exclude        http://lnk.co/
// @exclude        http://adf.ly/*market.php?*
// @exclude        http://adf.ly/?default_ad*
// ==/UserScript==

(function()
{
	function RedirectionHelper(baseURI){
		this.baseURI=baseURI;
		this.domain=null;
		this.action=new Actions();
	}
	RedirectionHelper.prototype={
		matchDomain: function(){
			var domain = this.baseURI.match(/^https?:\/\/([^\/]+)\//);
			if(domain)
				this.domain=domain[1];
			return this;
		},

		matchAction: function(){
			if(this.domain)
				this.action.find(this.domain);
			return this;
		},

		invokeAction: function(){
			if(this.action.invoked)
				this.action.invoked();
			return this;
		}
	}

	function Actions(){
		this.invoked=null;
		this.targetUrl=null;
	}
	Actions.prototype={
		find: function(domain){
			var isMatch;
			var pattern;
			for(var key in this.patterns){
				pattern = this.patterns[key];
				isMatch = typeof pattern.rule === 'string' ? pattern.rule == domain : pattern.rule.test(domain);
				if(isMatch){
					this.invoked = pattern.run;
					return;
				}
			}
		},

		redirect: function(){
			if(this.targetUrl)
				window.location.replace(this.targetUrl);
		},

		cleanTimer: function(){
			var intervalID=setInterval('0', 10);
			while(--intervalID>0)
				clearInterval(intervalID);
		},

		disableWindowOpen: function(){
			if(unsafeWindow){
				unsafeWindow.open = function(){};
			}

			if(window){
				window.open = function(){};
			}
		},

		patterns: {
			linkbucks: {
				rule: /^[\w]{8}\..*\.(com?|net|gs|me|tv|bz)/,
				run: function(){
					var matches;

					this.cleanTimer();

					if(unsafeWindow && unsafeWindow.Lbjs && unsafeWindow.Lbjs.TargetUrl)
						this.targetUrl=unsafeWindow.Lbjs.TargetUrl;
					else if((matches=document.body.innerHTML.match(/TargetUrl\s*=\s*['"]([^'"]+)['"]/)) && matches)
						this.targetUrl=matches[1];
					this.redirect();
				}
			},

			alabout: {
				rule: /(alabout|alafs)\.com/,
				run: function(){
					var o=document.getElementsByTagName('a');
					for(var i in o)
						if(/http:\/\/(www\.)?(alabout|alafs)\.com\/j\.phtml\?url=/.test(o[i].href))
							o[i].href=o[i].textContent;
				}
			},

			imageporter: {
				rule: /(imagecarry|imagedunk|imageporter|imageswitch|picleet|picturedip|pictureturn)\.com|piclambo\.net/,
				run: function(){
					var o;

					if(o=document.getElementById('firopage')){
						o.parentNode.removeChild(o);
					}

					o=document.getElementsByTagName('iframe');
					for(i=o.length-1;i>=0;i--){
						o[i].parentNode.removeChild(o[i]);
					}

					o=(document.compatMode=='CSS1Compat') ? document.documentElement : document.body;
					o.style.overflow='auto';

					this.cleanTimer();
					this.disableWindowOpen();
				}
			},

			adf: {
				rule: /adf.ly|[u9]\.bb|[jq]\.gs/,
				run: function(){
					var head=document.getElementsByTagName('head')[0].innerHTML;
					var matches=head.match(/var\s+log_token\s*=\s*['"](.+)['"]/);

					if(matches){
						var uid=head.match(/user=(\d+)/)[1];
						var ajax=new XMLHttpRequest();
						ajax.open('POST', '/l.php', true);
						ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
						ajax.onreadystatechange=(function(that){
							return function(){
								if(ajax.readyState>3){
									matches=head.match(/var\s+url\s*=\s*['"](.+)['"]/);
									that.targetUrl=matches[1];
									that.redirect();
								}
							}
						})(this);
						ajax.send('user='+uid+'&user2='+uid+'&lt='+matches[1]);
					}
					else{
						matches=head.match(/var\s+url\s*=\s*['"](.+)['"]/);
						var o;
						if(matches)
							this.targetUrl=matches[1];
						else if(o=document.getElementById('continue')){
							this.targetUrl=o.getElementsByTagName('a')[0].href;
						}
						this.redirect();
					}
				}
			},

			turboimagehost: {
				rule: /turboimagehost\.com/,
				run: function(){
					var o;
					if((o=document.getElementById('blanket')))
						o.style.width='0px';
					if((o=document.getElementById('popUpDiv1')))
						o.style.visibility='hidden';
				}
			},

			imagevenue: {
				rule: /imagevenue\.com/,
				run: function(){
					var o;
					if((o=document.getElementById('interContainer')))
						o.style.display='none';
					if((o=document.getElementById('interVeil')))
						o.style.display='none';
				}
			},

			linkbee: {
				rule: /(linkbee\.com|lnk\.co)/,
				run: function(){
					var o;
					if((o=document.getElementById('urlholder')))
						this.targetUrl=o.value;
					else if((o=document.getElementById('skipBtn')))
						this.targetUrl=o.getElementsByTagName('a')[0].href;
					else
						this.targetUrl=document.title.replace(/(LNK.co|Linkbee)\s*:\s*/,'');
					this.redirect();
				}
			},

			zpag: {
				rule: 'zpag.es',
				run: function(){
					var matches=document.getElementsByTagName('head')[0].innerHTML.match(/window\.location\s*=\s*(['"])((?:\\\1|[^\1])*?)\1/);
					if(matches)
						this.targetUrl=matches[2];
					this.redirect();
				}
			},

			pixhost: {
				rule: 'www.pixhost.org',
				run: function(){
					var o;
					if((o=document.getElementById('web'))){
						o.style.display='block';

						if((o=document.getElementById('js')))
							o.parentNode.removeChild(o);

						if((o=document.getElementById('chatWindow')))
							o.parentNode.removeChild(o);

						if((o=document.getElementById('taskbar')))
							o.parentNode.removeChild(o);
					}
				}
			},

			ichan: {
				rule: 'ichan.org',
				run: function(){
					var o=document.getElementsByTagName('a');
					var l=o.length;
					for(var i=0; i<l; i++){
						if(o[i].href.indexOf('/url/http://')>-1)
							o[i].href=o[i].href.replace(/http:\/\/.+\/url\/(?=http:\/\/)/,'');
					}
				}
			},

			urlcash: {
				rule: /urlcash\.net/,
				run: function(){
					var matches;
					if(unsafeWindow)
						this.targetUrl=unsafeWindow.linkDestUrl;
					else if((matches=document.body.innerHTML.match(/linkDestUrl = '(.+)'/)) && matches)
						this.targetUrl=matches[1];
					this.redirect();
				}
			},

			pushba: {
				rule: /pushba\.com/,
				run: function(){
					var o;
					if((o=document.getElementById('urlTextBox')))
						this.targetUrl=o.value;
					this.redirect();
				}
			},

			imgchili: {
				rule: 'imgchili.com',
				run: function(){
					var o;
					if((o=document.getElementById('ad')))
						o.parentNode.removeChild(o);

					if((o=document.getElementById('all')))
						o.style.display='';
				}
			},

			viidii: {
				rule: 'www.viidii.com',
				run: function(){
					var o;
					if((o=document.getElementById('directlink'))){
						this.targetUrl=o.href;
						this.redirect();
					}
				}
			},

			adfoc: {
				rule: 'adfoc.us',
				run: function(){
					document.addEventListener('DOMNodeInserted', (function(that){
						var o;
						return function(){
							o=document.getElementById('showSkip');
							if(o && !this.targetUrl){
								that.targetUrl=o.getElementsByTagName('a')[0].href;
								that.redirect();
							}
						}
					})(this), null);
				}
			},

			imagetwist: {
				rule: 'imagetwist.com',
				run: function(){
					var o;
					if(o=document.getElementById('overlayBg'))
						o.style.display='none';

					if(o=document.getElementById('chatWindow')){
						o.innerHTML='';
						o.style.display='none';
					}

					if(o=document.getElementById('taskbar')){
						o.innerHTML='';
						o.style.display='none';
					}

					this.disableWindowOpen();
				}
			}
		}
	}

	var myRedirector=new RedirectionHelper(document.baseURI);
	myRedirector.matchDomain().matchAction().invokeAction();

})();