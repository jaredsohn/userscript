// Flickr Auto Page
// Copyright (c) 2007, Pierre Andrews.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name	Flickr Auto Page
// @namespace	http://6v8.gamboni.org/Flickr-Auto-Pagination.html
// @description removes the need to paginate when browsing flickr
// @version        1.2
// @date           2008-11-30
// @creator        Pierre Andrews (mortimer.pa@free.fr) , pt translation by Perla* <http://www.flickr.com/photos/bobnperla/>
// @include http://*flickr.com/groups/*/pool*
// @include http://*flickr.com/groups/*/admin*
// @include http://*flickr.com/groups/*/discuss*
// @include http://*flickr.com/photos/*/*
// @include http://*flickr.com/photos/*/*/sets/*/detail*
// @include http://*flickr.com/recent_activity.gne*
// @include http://*flickr.com/activity*
// @include http://*flickr.com/photos_comments.gne*
// @include http://*flickr.com/search*
// @include http://*flickr.com/photos/friends*
// @include http://*flickr.com/help/forum*
// @include http://*flickr.com/explore/interesting/*
// @include http://*flickr.com/people/*/contacts*
// @include http://*flickr.com/creativecommons/*
// @include http://*flickr.com/groups_members_detail.gne*
// @exclude http://*flickr.com/*#disableautopage

// ==/UserScript==

//TODO javascript oddness
//TODO new photo

(function () {

	var win = window;

	//update information
	var SCRIPT = {
		name: "Flickr Auto Page",
		namespace: "http://6v8.gamboni.org/Flickr-Auto-Pagination.html",
		description: "removes the need to paginate when browsing flickr.",
		source: "http://6v8.gamboni.org/Flickr-Auto-Page.html",			// script homepage/description URL
		identifier: "http://6v8.gamboni.org/IMG/js/flickrautopage.user.js",
		version: "1.2",								// version
		date: (new Date(2008, 11, 30))		// update date
		.valueOf()
	};

	//======================================================================
	//to do the closure and get the right this.
	//adapted from http://persistent.info/greasemonkey/gmail.user.js

	function getObjectMethodClosure3(object, method,args,args1,args2,args3) {
		return function() {
			return object[method](args,args1,args2,args3);
		}
	}
	function getObjectMethodClosure2(object, method,args,args1,args2) {
		return function() {
			return object[method](args,args1,args2);
		}
	}
	function getObjectMethodClosure1(object, method,args,args1) {
		return function() {
			return object[method](args,args1);
		}
	}

	function getObjectMethodClosure0(object, method,args) {
		return function() {
			return object[method](args);
		}
	}

	function getObjectMethodClosure(object, method) {
		return function(args) {
			return object[method](args);
		}
	}

		/*
	  Xpath trickery, from:
	  http://ecmanaut.blogspot.com/2006/07/expressive-user-scripts-with-xpath-and.html
	 */
	function $x( xpath, root )
		{
			var doc = root ? root.evaluate?root:root.ownerDocument : document;
			var got = doc.evaluate( xpath, root||doc, null, 0, null ), next;
			var result = [];
			while( next = got.iterateNext() )
				result.push( next );
			return result;
		}


	function $x1(xpath) {
		return document.evaluate(
								 xpath,
								 document,
								 null,
								 XPathResult.FIRST_ORDERED_NODE_TYPE, null
								 ).singleNodeValue;
	}

	function foreach( xpath, cb, root )
	{
		var nodes = $x( xpath, root ), e = 0;
		for( var i=0; i<nodes.length; i++ )
			e += cb( nodes[i], i ) || 0;
		return e;
	}


	/***********************************************************************
	 * Flickr Localisation
	 **********************************************************************/

	var FlickrLocaliser = function(locals) {
		this.init(locals);
	}
	FlickrLocaliser.prototype = {
		selectedLang: undefined,
		localisations: undefined,
		getLanguage: function() {
			if(!this.selectedLang) {
				var langA = $x1("//p[@class='LanguageSelector']//a[contains(@class,'selected')]");
				if(langA) {
					var matches = /\/change_language.gne\?lang=([^&]+)&.*/.exec(langA.href);
					if(matches && matches[1]) {
						this.selectedLang = matches[1];
						return this.selectedLang;
					}
				}
				return false;
			} else return this.selectedLang;
		},

		init: function(locals) {
			this.localisations = locals;
		},

		localise: function(string, params) {
			if(this.localisations && this.getLanguage()) {
				var currentLang = this.localisations[this.selectedLang];
				if(!currentLang) currentLang = this.localisations[this.localisations.defaultLang];
				var local = currentLang[string];
				if(!local) {
					local = this.localisations[this.localisations.defaultLang][string];
				}
				if(!local) return string;
				for(arg in params) {
					var rep = new RegExp('@'+arg+'@','g');
					local = local.replace(rep,params[arg]);
				}
				local =local.replace(/@[^@]+@/g,'');
				return local;
			} else return undefined;
		}

	}

	/*****************************Flickr Localisation**********************/



	function M8_log() {
	  if(unsafeWindow.console)
		  unsafeWindow.console.log(arguments);
	  else
		  GM_log(arguments);
	}

	win.FlickrAutoPage = function() {
		this.init();
	};

	win.FlickrAutoPage.prototype = {
		localiser: new FlickrLocaliser({
				'en-us' : {
					'loading':'Fetching page:@nbrpage@/@total@.',
						'showing':'Showing page:@page@/@total@.',
						'enable':'Enable Auto Page',
						'nophoto':'No more Photos',
						'nodiscussion': "No more Discussions",
						'noreply':'No more Replies',
						'notopic':'No more Topics',
						'nocomment':'No more Comments',
						'nopeople':'No more People',
						'nocontact':'No more Contacts'
						},
					'fr-fr':{
					'loading':'Chargement de la page:@nbrpage@/@total@.',
						'showing':'Page Actuelle:@page@/@total@.',
						'enable':'Activer l\'Auto Pagination',
						'nophoto':'Plus de Photos',
						'nodiscussion': "Plus de Discussions",
						'noreply':'Pas d\'autre r&eacute;ponse',
						'notopic':'Pas d\'autre sujet',
						'nocomment':'Pas d\'autre commentaire',
						'nopeople':'Pas d\'autre Membre',
						'nocontact':'Pas d\'autre Contact'
						},
				'pt-br': {
					// E
					'enable' : 'Capacitar',
					// L
					'loading' : 'Procurar p&aacute;gina:@nbrpage@/@total@.',
					// N
					'nocomment' : 'Sem mais coment&aacute;rios',
					'nocontact' : 'Sem mais contatos',
					'nodiscussion' : 'Sem mais discuss&otilde;es',
					'nopeople' : 'Mais ningu&eacute;m',
					'nophoto' : 'Mais nenhuma foto',
					'noreply' : 'Sem mais respostas',
					'notopic' : 'Mais nenhum t&oacute;pico',
					// S
					'showing' : 'Mostrando a p&aacute;gina:@page@/@total@.'
				},

				defaultLang:'en-us'
		}),
		next_request:1,
		received: true,
		insert: undefined,
		paginator: undefined,
		msg_div: undefined,
		nbr_page: NaN,
		first : true,
		watch_cb: undefined,
		stop_watch: false,

		findTotalPage: function(string) {
			var nbr = 0;
			while(matches = /([0-9, '.]+)/g.exec(string)) {
				var x = parseInt(matches[1].replace(',',''));
				if(x > nbr) nbr = x;
			}
			M8_log("ttpg: "+nbr);
			return nbr;
		},

		//inspired by http://squarefree.com/userscripts
		//using iframes instead of xmlhttpRequest applies javascripts and other GM scripts to the page :D
		pullMore: function(url,processReply, special) {
			var iframe = document.createElement("iframe");
			var self = this;
			iframe.width = 1;
			iframe.height = 1;
			iframe.style.display = "none";
			iframe.id = 'autopageframe';
			document.body.appendChild(iframe);
			iframe.addEventListener("load",
									function(){
				self.msg_div.innerHTML = '';

				if(url.indexOf('photos/friends') >= 0) self.insert.innerHTML += '<br clear="all" />';

				if(self.insert) {
					var anchor = self.insert.appendChild(document.createElement('a'));
					anchor.name = 'infinitepage'+(self.next_request-1);
				}
				var b = iframe.contentDocument.body;
				//self.insert.innerHTML =
				processReply(b, self.insert);

				self.received = true;
				var link;
				switch(special) {
					case 1:
					link = $x1("//div[@id='Pages']//div[@class='Paginator']//a[text()='"+(self.next_request-1)+"']");
					break;
					default:
					link = $x1("//div[@class='Paginator']//a[text()='"+(self.next_request-1)+"']");
				}
				if(!link) {
					switch(special) {
						case 1:
							link = $x1("//div[@id='Pages']//div[@class='Paginator']//span[text()='...']");
							break;
						default:
							link = $x1("//div[@class='Paginator']//span[text()='...']");
					}
					var a = link.parentNode.insertBefore(document.createElement('a'),link);
					a.className = 'this-page';
					a.setAttribute('style',"margin: 0pt; display: block; width: 2em;");
					a.href='#infinitepage'+(self.next_request-1);
					a.innerHTML = (self.next_request-1);
				} else {
					link.href='#infinitepage'+(self.next_request-1);
					link.className += 'this-page';
				}
				self.first = false;

				//get rid of iframe
				setTimeout( function() { iframe.parentNode.removeChild(iframe); }, 1500);
			}, false);
			iframe.src = url+'#disableautopage';
		},

		cb_shortcut: function(url,msg,processReply,special) {
			if(this.received) {
				if(this.next_request > this.nbr_page) {
					this.msg_div.innerHTML = self.localiser.localise('showing',{'page':(self.next_request-1),'total':self.nbr_page})+' '+msg;
				} else if(this.insert) {
					this.next_request++;
					var self = this;
					M8_log('get'+url);
					this.msg_div.innerHTML = this.localiser.localise('loading',{
						'nbrpage':(this.next_request-1),
						'total': this.nbr_page
					})+ '<br/><img id="flickrphotocompass_wait" src="http://'+document.location.host+'/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" />';
					this.received = false;
					this.pullMore(url,processReply,special);
				}

			}
		},

		generic_cb: function(msg,url,xpath,additionalBits) {
			url = url.replace('@P@',this.next_request);
			var self = this;
			var processReply = function(body,insert) {
				//move the elements
				var cnt = 0;
				foreach(xpath,
						function(elt) {
							cnt++;
							insert.appendChild(elt);
							elt.className += ' AutoPageAddition'+self.next_request;
						},
						body
						);

				//fix the buddy icons over for the moved element
				foreach("//.[contains(@class,'AutoPageAddition"+self.next_request+"')]//img[contains(@src,'buddyicon')]",
						function(img) {
							img.addEventListener('mouseover',getObjectMethodClosure(unsafeWindow.document.getElementById('person_hover'),'icon_mouseover'),true);
							img.addEventListener('mouseout',getObjectMethodClosure(unsafeWindow.document.getElementById("person_hover"),'icon_mouseout'),true);
							var nsid = ''
								if(img.src.indexOf('buddyicon.jpg') >= 0) {
									nsid =  img.src.replace(/.*\?/,'');
								} else {
									nsid = img.src.replace(/.*\/(.*)\.jpg(\?.*)?$/,'$1');
								}
							img.nsid = nsid;
							var hover;
							var hover_insert = document.getElementById("person_hover_link")
								if(!document.getElementById('hover_img'+nsid) && (hover = body.ownerDocument.getElementById('hover_img'+nsid))) {
								hover_insert.appendChild(hover);
							}
						},document);
				additionalBits("AutoPageAddition"+self.next_request,body);
			}
			this.cb_shortcut(url,msg,processReply);
		},

		/*		messages_cb: function(query) {
			var msg = 'No More Messages';
			url = "http://"+document.location.host+"/messages.gne?ok=1&page="+(this.next_request);

			var processReply = function(text,html) {
				var start = 0;
				var end = 0;


				start = text.indexOf('<table id="InBox" cellspacing="0" width="100%">');
				start+=47;
				end = text.indexOf('</table>',start);
				text = text.slice(start,end);

				html +=text;
				return html;
			}
			this.cb_shortcut(url,msg,processReply);
			},*/


		init: function() {
			var matches;
			var cb = undefined;
			var msg;
			var url;
			var xpath;
			var special = 0;
			var additionalBits = function() {};

			//for the group pool
			if(matches = /\/groups\/(.*)\/pool\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/30);

				if(matches[3]) this.next_request= parseInt(matches[3]);
				this.insert = $x1("//div[@class='HoldPhotos']");
				msg = this.localiser.localise('nophoto');
				url = "http://"+document.location.host+"/groups/"+matches[1]+"/pool/page@P@";
				xpath = "//div[@class='HoldPhotos']/p";
			}  //for the group discuss
			else if(matches = /\/groups\/(.*)\/discuss\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);

				if(matches[3]) this.next_request= parseInt(matches[3]);
				this.insert = $x1("//table[@class='TopicListing']/tbody");

				url = "http://"+document.location.host+"/groups/"+matches[1]+"/discuss/page@P@";
				msg = this.localiser.localise('nodiscussion');
				xpath = "//table[@class='TopicListing']/tbody/tr";
			} //for the group topics
			else if(matches = /\/groups\/(.*)\/discuss\/([0-9]+)\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {
				special = 1;
				var otherpage = $x1("//div[@id='DiscussTopic']/div[@class='Pages']/div[@class='Paginator']");
				if(otherpage) {
					otherpage.className = '';
					otherpage.parentNode.style.display = 'none';
				}
				this.paginator = $x1("//div[@id='Pages']/div/div[@class='Paginator']");
				var pp = $x1("//div[@id='Pages']/div/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/100);

				if(matches[4]) this.next_request= parseInt(matches[4]);
				this.insert = $x1("//table[@class='TopicReply']/tbody");

				msg = this.localiser.localise('noreply');
				url = "http://"+document.location.host+"/groups/"+matches[1]+"/discuss/"+matches[2]+"/page@P@";
				xpath = "//table[@class='TopicReply']/tbody/tr";
			}  //for the help topics
			else if(matches = /\/help\/forum\/([A-Za-z-]+)\/([0-9]+)\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {
				special = 2;
				var otherpage = $x1("//div[@id='DiscussTopic']/div[@class='Pages']/div[@class='Paginator']");
				if(otherpage) {
					otherpage.className = '';
					otherpage.parentNode.style.display = 'none';
				}
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");

				var pp = $x1("//div[@class='Pages']//div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/100);

				if(matches[4]) this.next_request= parseInt(matches[4]);
				this.insert = $x1("//table[@class='TopicReply']/tbody");
				url = "http://"+document.location.host+"/help/forum/"+matches[1]+'/'+matches[2]+"/page@P@";
				xpath = "//table[@class='TopicReply']/tbody/tr";
				msg = this.localiser.localise('nodiscussion');
			}  //for the help forum
			else if(document.location.pathname.indexOf('/help/forum') >= 0) {
				matches = /([?&]page=([0-9]+))?/.exec(document.location.search);

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var as = this.paginator.getElementsByTagName('a');
				var lang = 'en-us';
				if(as && as.length >0) {
					var tmp = /\/help\/forum\/([^\/]+)\//.exec(as[0].href);
					if(tmp) lang = tmp[1];
				}

				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);
				if(matches[2]) this.next_request= parseInt(matches[2]);
				      this.insert = $x1("//table[@class='TopicListing']/tbody");
				msg = this.localiser.localise('noreply');
				url = "http://"+document.location.host+"/help/forum/"+lang+"/?page=@P@";
				  xpath = "//table[@class='TopicListing']/tbody/tr";
			} //for the contacts photo
			else if(matches = /\/photos\/friends\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/24);

				if(matches[2]) this.next_request= parseInt(matches[2]);
				this.insert = $x1("//div[@class='HoldPhotos']");
				url = "http://"+document.location.host+"/photos/friends/page@P@";
				xpath = "//div[@class='HoldPhotos']/p";
				msg = this.localiser.localise('nophoto');
			} //for everyone's tag
			else if(matches = /\/photos\/tags\/([^\/]+)\/?(interesting)?\/?$/.exec(document.location.pathname)) {

				var matches2 = /\?page=([0-9]+)$/.exec(document.location.search);

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);

				if(matches2 && matches2[1]) this.next_request= parseInt(matches2[1]);
				this.insert = $x1("//td[@id='GoodStuff']/div");
				url = "http://"+document.location.host+"/photos/tags/"+matches[1];
				if(matches[2]) url += "/interesting"
				url += "/?page=@P@";
				msg = this.localiser.localise('nophoto');
				xpath = "//td[@id='GoodStuff']/div/p";
			}   //for tag cluster
			else if(matches = /\/photos\/tags\/([^\/]+)\/clusters\/([^\/]+)\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);

				if(matches[3]) this.next_request= parseInt(matches[3]);
				this.insert = $x1("//div[@id='tagThumbs']");
				url = "http://"+document.location.host+"/photos/tags/"+matches[1]+"/clusters/"+matches[2]+"/page@P@";
				msg = this.localiser.localise('nophoto');
				xpath = "//div[@id='tagThumbs']/p";
			} //for user's tag
			else if(matches = /\/photos\/([^\/]+)\/tags\/([^\/]+)\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);

				if(matches[4]) this.next_request= parseInt(matches[4]);
				this.insert = $x1("//td[@id='GoodStuff']/div");
				url = "http://"+document.location.host+"/photos/"+matches[1]+"/tags/"+matches[2]+"/page@P@";
				msg = this.localiser.localise('nophoto');
				xpath = "//td[@id='GoodStuff']/div/p";
			}   //for interesting-popular page
			else if(matches = /\/photos\/([^\/]+)\/popular-interesting\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);

				if(matches[2]) this.next_request= parseInt(matches[2]);
				this.insert = $x1("//table[@class='PopularPic']/tbody");
				url = "http://"+document.location.host+"/photos/"+matches[1]+"/popular-interesting/page@P@";

				msg = this.localiser.localise('nophoto');
				xpath = "//table[@class='PopularPic']/tbody/tr";
			}   //for popular-view page
			else if(matches = /\/photos\/([^\/]+)\/popular-views\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);

				if(matches[2]) this.next_request= parseInt(matches[2]);
				this.insert = $x1("//table[@class='PopularPic']/tbody");
				url = "http://"+document.location.host+"/photos/"+matches[1]+"/popular-views/page@P@";
				msg = this.localiser.localise('nophoto');
				xpath = "//table[@class='PopularPic']/tbody/tr";
			}  //for popular-comments page
			else if(matches = /\/photos\/([^\/]+)\/popular-comments\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);

				if(matches[2]) this.next_request= parseInt(matches[2]);
				this.insert = $x1("//table[@class='PopularPic']/tbody");
				url = "http://"+document.location.host+"/photos/"+matches[1]+"/popular-comments/page@P@";

				msg = this.localiser.localise('nophoto');
				xpath = "//table[@class='PopularPic']/tbody/tr";
			}  //for popular-faves page
			else if(matches = /\/photos\/([^\/]+)\/popular-faves\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);

				if(matches[2]) this.next_request= parseInt(matches[2]);
				this.insert = $x1("//table[@class='PopularPic']/tbody");
				url = "http://"+document.location.host+"/photos/"+matches[1]+"/popular-faves/page@P@";
				msg = this.localiser.localise('nophoto');
				xpath = "//table[@class='PopularPic']/tbody/tr";
			} //for comments on a photo
			else if(unsafeWindow.page_photo_id) {

				special = 3;
				var otherpage = $x1("//div[@id='DiscussPhoto']/div[@class='Pages']/div[@class='Paginator']");
				if(otherpage) {
					otherpage.className = '';
					otherpage.parentNode.style.display = 'none';
				}


				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/100);

				matches = /\/page([0-9]+)/.exec(document.location.pathname);
				if(matches && matches[1]) this.next_request= parseInt(matches[1]);
				this.insert = $x1("//div[@id='DiscussPhoto']/table/tbody");
				msg = this.localiser.localise('nophoto');

				xpath = "//div[@id='DiscussPhoto']/table/tbody/tr";
				url = "http://"+document.location.host+unsafeWindow.global_photos[unsafeWindow.page_photo_id].ownersUrl+unsafeWindow.page_photo_id+"/page@P@";

			}  //for the user that faved a shot
			else if(matches = /\/photos\/([^\/]+)\/([^\/]+)\/favorites\/?$/.exec(document.location.pathname)) {
				var matches2 = /\?page=([0-9]+)$/.exec(document.location.search);

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);


				if(matches2 && matches2[1]) this.next_request= parseInt(matches[1]);
				this.insert = $x1("//table[@id='InBox']/tbody");
				msg = this.localiser.localise('nopeople');
				url = "http://"+document.location.host+matches[0]+"/?page=@P@";
				xpath = "//table[@id='InBox']/tbody/tr";
			} //for the user stream
			else if(matches = /\/photos\/([^\/]+)\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");

				if(matches[3]) this.next_request= parseInt(matches[3]);
				this.insert = $x1("/html/body/div[3]/table[2]/tbody/tr/td/table");
				var type = 0;
				var tot = this.findTotalPage(pp.innerHTML);
				if(!this.insert) {
					this.insert = $x1("//td[contains(@class,'Big5Column')]");
					type= 1;
					if(tot > 5) this.nbr_page = 1+Math.ceil((tot-5)/18);
					else this.nbr_page = 1;
				} else {
					this.nbr_page = Math.ceil(tot/18);
				}
				msg = this.localiser.localise('nophoto');
				url = "http://"+document.location.host+"/photos/"+matches[1]+"/page@P@";
				xpath = "//tbody/tr/td/table[@width='100%']/tbody/tr";
				if(function() {
					   for(p in unsafeWindow.global_photos) return true;
					   return false;
				   }()) {
					additionalBits = function(id,body) {
						var photos = new Array();
						foreach("//.[contains(@class,'AutoPageAddition"+self.next_request+"')]//h4[contains(@id,'title_div')]|//.[contains(@class,'AutoPageAddition"+self.next_request+"')]//div[contains(@id,'description_div')]",
								function(elt) {
									elt.onclick = '';
									elt.onmouseover='';
									elt.onmouseout = '';
									var photo_id = elt.id.replace(/description_div|title_div/,'');
									if(photos.indexOf(photo_id) < 0) photos.push(photo_id);
									if(!unsafeWindow.global_photos[photo_id]) {
										unsafeWindow.global_photos[photo_id] = new Object();
										unsafeWindow.global_photos[photo_id].title = '';
										unsafeWindow.global_photos[photo_id].description = '';
									}
									if(elt.id.indexOf('title_div') == 0) {
										unsafeWindow.global_photos[photo_id].title = elt.innerHTML.replace('\n','');
									} else {
										unsafeWindow.global_photos[photo_id].description = elt.innerHTML.replace('<i style="color: rgb(136, 136, 136);">click here to add a description</i>','');
									}
								},
								unsafeWindow.document
								);
						photos.forEach(function(photo_id,i,a) {
										   unsafeWindow.insitu_init_page_photos_user_title_div(photo_id,240);
										   unsafeWindow.insitu_init_page_photos_user_description_div(photo_id,240);
									   });
					};
				}
			}//for set details
			else if(matches = /\/photos\/([^\/]+)\/sets\/([^\/]+)\/detail\/?$/.exec(document.location.pathname)) {

				var matches2 = /\?page=([0-9]+)$/.exec(document.location.search);
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				var tot = this.findTotalPage(pp.innerHTML);
				if(tot > 40)
					this.nbr_page = Math.ceil(tot/18);
				else
					this.nbr_page = Math.ceil(tot/20);

				if(matches2 && matches2[1]) this.next_request= parseInt(matches2[1]);
				this.insert = $x1("/html/body/div[3]/table[2]/tbody");
				url = "http://"+document.location.host+"/photos/"+matches[1]+"/sets/"+matches[2]+"/detail/?page=@P@";
				xpath = "//div[@id='Main']/table[@width='100%']/tbody/tr";
				msg = this.localiser.localise('nophoto');
					if(function() {
					   for(p in unsafeWindow.global_photos) return true;
					   return false;
				   }()) {
					additionalBits = function(id,body) {
						var photos = new Array();
						foreach("//.[contains(@class,'AutoPageAddition"+self.next_request+"')]//h4[contains(@id,'title_div')]|//.[contains(@class,'AutoPageAddition"+self.next_request+"')]//div[contains(@id,'description_div')]",
								function(elt) {
									elt.onclick = '';
									elt.onmouseover='';
									elt.onmouseout = '';
									var photo_id = elt.id.replace(/description_div|title_div/,'');
									if(photos.indexOf(photo_id) < 0) photos.push(photo_id);
									if(!unsafeWindow.global_photos[photo_id]) {
										unsafeWindow.global_photos[photo_id] = new Object();
										unsafeWindow.global_photos[photo_id].title = '';
										unsafeWindow.global_photos[photo_id].description = '';
									}
									if(elt.id.indexOf('title_div') == 0) {
										unsafeWindow.global_photos[photo_id].title = elt.innerHTML.replace('\n','');
									} else {
										unsafeWindow.global_photos[photo_id].description = elt.innerHTML.replace('<i style="color: rgb(136, 136, 136);">click here to add a description</i>','');
									}
								},
								unsafeWindow.document
								);
						photos.forEach(function(photo_id,i,a) {
										   unsafeWindow.insitu_init_page_photos_user_title_div(photo_id,240);
										   unsafeWindow.insitu_init_page_photos_user_description_div(photo_id,240);
									   });
					};
				}

			} //for set thumbs
			else if(matches = /\/photos\/([^\/]+)\/sets\/([^\/]+)\/?$/.exec(document.location.pathname)) {

				var matches2 = /\?page=([0-9]+)$/.exec(document.location.search);
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/60);

				if(matches2 && matches2[1]) this.next_request= parseInt(matches2[1]);
				this.insert = document.getElementById('setThumbs');
				url = "http://"+document.location.host+"/photos/"+matches[1]+"/sets/"+matches[2]+"/?page=@P@";
				msg = this.localiser.localise('nophoto');
				xpath = "//div[@id='setThumbs']/div//a";
			}  //for comments on your photos
			else if((document.location.pathname == '/recent_activity.gne') || (matches2 = /activity\/(replies|photostream|all|messages|customized)\/?(page([0-9]+))?\/?/.exec(document.location.pathname))) {
			if(!matches2[2]) {
			  matches = /(\?days=([0-9]+))?([?&]page=([0-9]+))?$/.exec(document.location.search);
			  if(matches && matches[4]) this.next_request= parseInt(matches[4]);
			} else{
			  this.next_request= parseInt(matches2[3]);
			}

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/25);

				this.insert = document.getElementById('recent-activity');
				msg = this.localiser.localise('nocomment');
				url = "http://"+document.location.host+"/activity/"+matches2[1]+"/page@P@";
				if(matches && parseInt(matches[2])>0) url += "&days="+matches[2];
				xpath = "//li[contains(@class,'act-item')]";
			} //for comments you've made
			else if(document.location.pathname == '/photos_comments.gne') {
				matches = /\?page=([0-9]+)$/.exec(document.location.search);
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/10);

				if(matches && matches[1]) this.next_request= parseInt(matches[1]);
				this.insert = $x1("//table[@class='RecentActivity']/tbody");
				if(this.paginator && this.paginator.parentNode.parentNode.style.display != 'none') {
					msg = this.localiser.localise('nocomment');
					url = "http://"+document.location.host+"/photos_comments.gne?page=@P@";
					xpath = "//table[@class='RecentActivity']/tbody/tr";
				}
			} //for people search
			else if(document.location.pathname == '/search/people/') {
				var reg = /[?&]page=([0-9]+)/g;

				var query;
				var search = document.location.search;

				if(matches = reg.exec(search)) {
						if(matches[1]) this.next_request= parseInt(matches[1]);
						search = search.replace(matches[0],'');
				}
				query = search.replace(/^[?&]/,'?');


				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/10);
				this.insert = $x1("//table[@class='PeopleResults']/tbody");
				if(this.paginator && query) {
					url = "http://"+document.location.host+"/search/people/"+query+"&page=@P@";
					xpath = "//table[@class='PeopleResults']/tbody/tr";
					msg = this.localiser.localise('nopeople');
				}
			}//for groups search
			else if(document.location.pathname == '/search/groups/') {
				var reg = /[?&]page=([0-9]+)/g;

				var query;
				var search = document.location.search;

				if(matches = reg.exec(search)) {
						if(matches[1]) this.next_request= parseInt(matches[1]);
						search = search.replace(matches[0],'');
				}
				query = search.replace(/^[?&]/,'?');


				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
						url = "http://"+document.location.host+"/search/groups/"+query+"&page=@P@";

				if(query.indexOf('w=') >= 0) {
					if(query.indexOf('m=pool') >= 0) {
						msg = this.localiser.localise('nophoto');
						this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/24);

						if(query.indexOf('z=t') >= 0) {
							this.insert = $x1("//div[@class='ResultsThumbs']");
							xpath = "//div[@class='ResultsThumbs']/div";
						} else {
							this.insert = $x1("//table[@class='DetailResults']/tbody");
							xpath = "//table[@class='DetailResults']/tbody/tr";
						}
					} else {
						this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/15);
						this.insert = $x1("//table[@class='DiscussionResults']/tbody");
						msg = this.localiser.localise('notopic');
						xpath = "//table[@class='DiscussionResults']/tbody/tr";
					}
				} else {
					this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/15);
					this.insert = $x1("//table[@class='GroupsResults']/tbody");
					msg = this.localiser.localise('nogroup');
					xpath = "//table[@class='GroupsResults']/tbody/tr";
				}
			}//for help topic search
			else if(document.location.pathname == '/search/forum/') {
				var reg = /[?&]page=([0-9]+)/g;

				var query;
				var search = document.location.search;

				if(matches = reg.exec(search)) {
						if(matches[1]) this.next_request= parseInt(matches[1]);
						search = search.replace(matches[0],'');
				}
				query = search.replace(/^[?&]/,'?');


				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");

				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/15);
				this.insert = $x1("//table[@class='DiscussionResults']/tbody");
				msg = this.localiser.localise('notopic');
				url = "http://"+document.location.host+"/search/forum/"+query+"&page=@P@";
				xpath = "//table[@class='DiscussionResults']/tbody/tr";
			}  //for photo search
			else if(document.location.pathname == '/search/') {
				var reg = /[?&]page=([0-9]+)/g;

				var query;
				var search = document.location.search;

				if(matches = reg.exec(search)) {
						if(matches[1]) this.next_request= parseInt(matches[1]);
						search = search.replace(matches[0],'');
				}
				query = search.replace(/^[?&]/,'?');


				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/24);


				msg = this.localiser.localise('nophoto');
				url = "http://"+document.location.host+"/search/"+query+"&page=@P@";

				if(query.indexOf('z=t')>=0) {
					this.insert = $x1("//div[@class='ResultsThumbs']");
					xpath = "//div[@class='ResultsThumbs']/div";
				} else {
					this.insert = $x1("//table[@class='DetailResults']/tbody");
					xpath = "//table[@class='DetailResults']/tbody/tr";
				}
			} //for explore calendar
			else if(matches = /\/explore\/interesting\/([0-9\/]+)\/?(page([0-9]+))?/.exec(document.location.pathname)) {
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/10);

				if(matches[3]) this.next_request= parseInt(matches[3]);
				this.insert = $x1("//table[@class='DayView']/tbody");
				msg = this.localiser.localise('nophoto');
				url = "http://"+document.location.host+"/explore/interesting/"+matches[1]+"/page@P@";
				xpath  ="//table[@class='DayView']/tbody/tr";
			} //for the user favorites
			else if(matches = /\/photos\/([^\/]+)\/favorites\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				if(matches[3]) this.next_request= parseInt(matches[3]);
				this.insert = document.getElementById('favoriteThumbs');
				var type = 0;
				var tot = this.findTotalPage(pp.innerHTML);
				this.nbr_page = Math.ceil(tot/36);
				url = "http://"+document.location.host+"/photos/"+matches[1]+"/favorites/page@P@";
				xpath = "//div[@id='favoriteThumbs']/span"
				msg = this.localiser.localise('nophoto');
			} //for the list of contacts
			else if(matches = /\/people\/([^\/]+)\/contacts\/?$/.exec(document.location.pathname)) {
				var matches2 = /[\?&]page=([0-9]+)$/.exec(document.location.search);
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");

				var query = document.location.search;
				if(matches2 && matches2[1]) {
					this.next_request= parseInt(matches2[1]);
					query = query.replace(matches[0],'');
				}
				if(query) query+='&';
				else query = '?';
				this.insert = $x1("//table[@class='PeopleResults']/tbody");
				var tot = this.findTotalPage(pp.innerHTML);
				this.nbr_page = Math.ceil(tot/30);



				url = "http://"+document.location.host+"/people/"+matches[1]+"/contacts/"+query+"page=@P@";
				msg = this.localiser.localise('nocontacts');
				xpath = "//table[@class='PeopleResults']/tbody/tr";
			} //for the reverse list of contacts
			else if(matches = /\/people\/([^\/]+)\/contacts\/rev\/?$/.exec(document.location.pathname)) {
				var matches2 = /\?page=([0-9]+)$/.exec(document.location.search);
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");

				if(matches2 && matches2[1]) this.next_request= parseInt(matches2[1]);
				this.insert = $x1("//table[@class='PeopleResults']/tbody");
				var tot = this.findTotalPage(pp.innerHTML);
				this.nbr_page = Math.ceil(tot/40);

				url = "http://"+document.location.host+"/people/"+matches[1]+"/contacts/rev/?page=@P@";
				msg = this.localiser.localise('nocontacts');
				xpath = "//table[@class='PeopleResults']/tbody/tr";
			} //for the creative commons by
			else if(matches = /\/creativecommons\/([^\/]+)\/?(page([0-9]+))?\/?$/.exec(document.location.pathname)) {
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");

				if(matches[2]) this.next_request= parseInt(matches[2]);
				this.insert = $x1("//div[@class='RecentPhotos']");
				var tot = this.findTotalPage(pp.innerHTML);
				this.nbr_page = Math.ceil(tot/24);

				url = "http://"+document.location.host+"/creativecommons/"+matches[1]+"/page@P@";
				msg = this.localiser.localise('nocontacts');
				xpath = "//div[@class='RecentPhotos']/p";
			}  //for the group members
			else if(document.location.pathname == '/groups_members_detail.gne') {
				var matches2 = /\?page=([0-9]+)$/.exec(document.location.search);
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");

				if(matches2 && matches2[1]) this.next_request= parseInt(matches2[1]);
				var tot = this.findTotalPage(pp.innerHTML);
				this.nbr_page = Math.ceil(tot/30);

				url = "http://"+document.location.host+"/groups_members_detail.gne"+document.location.search+"&page=@P@";
				if(matches2) url.replace(matches2[0],'')
				msg = this.localiser.localise('nocontacts');
				var insertBefore = $x1("/html/body/div[@id='Main']/br[@clear='all']");
				var self = this;
				cb = function() {
					var curl = url.replace('@P@',self.next_request);
					if(self.received) {
						if(self.next_request > self.nbr_page) {
							self.msg_div.innerHTML = self.localiser.localise('showing',{'page':(self.next_request-1),'total':self.nbr_page})+' '+msg;
						} else {
							if(insertBefore) {
								self.next_request++;
								M8_log('get'+curl);
								self.msg_div.innerHTML = self.localiser.localise('loading',{'nbrpage':(self.next_request-1),'total':self.nbr_page})+' <br/><img id="flickrphotocompass_wait" src="http://'+document.location.host+'/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;height: 16px;" />';
								self.received = false;
								self.pullMore(curl,
											   function(body,insert) {
												  foreach("//div[@class='MembersList']",
														  function(elt) {
															  insertBefore.parentNode.insertBefore(elt,insertBefore);
														  },
														  body
														  );
											  }
											  ,0);
							}
						}
					}
				}

			}//for admin page
			  else if(matches = /\/groups\/([^\/]*)\/admin\/admins\/?/.exec(document.location.pathname)) {
				var matches2 = /\?page=([0-9]+)$/.exec(document.location.search);

				if(matches2) this.next_request= parseInt(matches[2]);


				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/25);


				msg = this.localiser.localise('nopeople');
				url = "http://"+document.location.host+"/groups/"+matches[1]+"/admin/admins/?page=@P@";

				this.insert = $x1("//div[@class='MembersList']");
				xpath = "//p[@class='Person']";
			} //for admin page
			else if(matches = /\/groups\/([^\/]*)\/admin\/(members|moderators)\/?/.exec(document.location.pathname)) {
			  var matches2 = /\?page=([0-9]+)$/.exec(document.location.search);

				if(matches2) this.next_request= parseInt(matches[2]);

				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/25);


				msg = this.localiser.localise('nopeople');
				url = "http://"+document.location.host+"/groups/"+matches[1]+"/admin/"+matches[2]+"/?page=@P@";

				this.insert = document.getElementById('MemberList');
				xpath = "id('MemberList')/tbody/tr";
			}



			//for FlickrMail
			/*	else if(document.location.pathname == '/messages.gne') {
				matches = /\?page=([0-9]+)$/.exec(document.location.search);
				this.paginator = $x1("//div[@class='Pages']/div[@class='Paginator']");
				var pp = $x1("//div[@class='Pages']/div[@class='Results']");
				this.nbr_page = Math.ceil(this.findTotalPage(pp.innerHTML)/20);

				if(matches && matches[1]) this.next_request= parseInt(matches[1]);
				this.insert = document.getElementById('InBox');
				if(this.paginator) {
					cb = getObjectMethodClosure(this,'messages_cb');
					msg = 'No more messages';
				}
				}*/


			if(this.paginator) {
				if(!this.msg_div) {
					var checkboxDiv = this.paginator.appendChild(document.createElement('div'));
					checkboxDiv.id = 'enableScrollContainer';
					checkboxDiv.setAttribute('style','font-size:80%;text-align:left;');
					var checkbox = document.createElement('input');
					checkbox.id = 'enableScroll';
					checkbox.checked = true;
					checkbox.type = 'checkbox';
					var self = this;
					checkbox.addEventListener('click',function() {
												  if(checkbox.checked) {
													  setTimeout(self.watch_cb,100);
													  self.stop_watch = false;
												  } else {
													  self.stop_watch = true;
												  }
											  },true);
					checkboxDiv.appendChild(checkbox);
					var label = checkboxDiv.appendChild(document.createElement('label'));
					label.htmlFor = 'enableScroll';
					label.innerHTML = this.localiser.localise('enable');
					this.msg_div = this.paginator.appendChild(document.createElement('div'));
					this.msg_div.setAttribute('style','font-size:80%;text-align:left;margin-top:10px;');
				}

				this.paginator.parentNode.setAttribute('style',
													   'position:fixed;'+
													   'top:100px;'+
													   'left:0;'+
													   'width: 8em;'
													   );
				var link = $x1("//div[@class='Paginator']//span[text()='"+(this.next_request)+"']");
				var i = 0;
				if(link) {
					var new_link = link.parentNode.insertBefore(document.createElement('a'),link);
					link.style.display = 'none';
					new_link.innerHTML = this.next_request;
					new_link.href='#infinitepage'+(this.next_request);
					new_link.className += 'this-page';
				}
				for(i=0;i<this.paginator.childNodes.length;i++) {
					var item = this.paginator.childNodes.item(i);
					if(item.nodeType == 1 && item != link && item.id != 'enableScrollContainer' && item != this.msg_div) {
						item.style.display='block';
						item.style.width='2em';
						item.style.margin='0';
					}
				}
				var prev;
				var next;
				switch(special) {
					case 1:
						prev = $x1("//div[@id='Pages']//div[@class='Paginator']//span[@class='AtStart']|//div[@id='Pages']//div[@class='Paginator']//a[@class='Prev']");
						next = $x1("//div[@id='Pages']//div[@class='Paginator']//span[@class='AtEnd']|//div[@id='Pages']//div[@class='Paginator']//a[@class='Next']");
						break;
					default:
						prev = $x1("//div[@class='Paginator']//span[@class='AtStart']|//div[@class='Paginator']//a[@class='Prev']");
						next = $x1("//div[@class='Paginator']//span[@class='AtEnd']|//div[@class='Paginator']//a[@class='Next']");
				}
				if(prev) prev.style.display = 'none';
				if(next) next.style.display = 'none';

			}
			if(!cb && msg && url && xpath)	cb = getObjectMethodClosure3(this,'generic_cb',msg,url,xpath,additionalBits);

			if(cb) {
				if(this.insert) {
					var new_a = document.createElement('a');
					new_a.name='infinitepage'+this.next_request;
					this.insert.insertBefore(new_a,this.insert.firstChild);
				}
				this.next_request++;
				this.watch_cb = getObjectMethodClosure1(this,'watch_scroll',cb,msg);
				setTimeout(this.watch_cb,100);
			}
		},

		//scroll watch code, from GoogleAutoPage:
		//http://la.ma.la/misc/demo/googleautopager.htm
		watch_scroll: function(cb,msg){
			try{
				var sc = document.body.scrollTop;
				var wh = window.innerHeight ? window.innerHeight : document.body.clientHeight;
				var total = (document.body.scrollHeight - wh);
				var remain = total - sc;
				if(remain < 600){
					cb();
				}
			}catch(e){

			}
			if(this.next_request <= this.nbr_page+1) {
				if(!this.stop_watch) setTimeout(getObjectMethodClosure1(this,'watch_scroll',cb,msg),100);
			} else
			this.msg_div.innerHTML = self.localiser.localise('showing',{'page':this.nbr_page,'total':this.nbr_page})+' '+msg;
		}

	};


	//======================================================================
	//======================================================================
	// launch
	try {
		window.addEventListener("load", function () {
									try {

										// update automatically (http://userscripts.org/scripts/show/2296)
										unsafeWindow.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
									} catch (ex) {}
										var flickrgp = new win.FlickrAutoPage();


								}, false);
	} catch (ex) {}

})();
