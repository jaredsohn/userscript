// ==UserScript==
// @name			Google Default Form Inputs
// @namespace		smk
// @require			https://cdn.jsdelivr.net/uri.js/1.9.1/URI.min.js
// @require			https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @require			https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @require			https://raw.github.com/jashkenas/underscore/master/underscore.js
// @include			*://*.google.tld/*
// @include			*://*.google.com/*
// @include			*://*.youtube.com/*
// ==/UserScript==

var configDict={
	//references:
	//	http://www.blueglass.com/blog/google-search-url-parameters-query-string-anatomy/
	//	http://www.seomoz.org/ugc/the-ultimate-guide-to-the-google-search-parameters
	//	https://developers.google.com/custom-search-ads/docs/reference#adtest
	//	http://www.blueglass.com/blog/google-search-url-parameters-query-string-anatomy/

	//use a value of null to remove
	'searchParams': {
		//known tracking params
		'client': null,  					//browser name
		'sclient': null, 					//browser name
		'sourceid': null,					//source of the query
		'source': null,  					//source of the query
		'oq': null,      					//previous search query
		'aq': null,							//google suggest tracking
		'pq': null,							//previous search query
		'sa': null,							//google serps navigation behavior tracking
		'swrnum': null,         			//number of results the initial query returned
		'as_q': null,           			//when searching within results, the query is added as_q
		'oi': null,             			//search group name
		'resnum': null,         			//number of a result within the search group
		'gs_l': null,						//geoloc
		'rls': null,						//client name
		'spell': null,						//whether the user has clicked on the auto-correct suggestion link

		//keep biw and bih valid to avoid redirects on google image search, we cannot prevent google scripts from redirecting away
		//	otherwise without modifying the script (using the beforeunload event)
		'biw': '1',							//browser inner width
		'bih': '1',							//browser inner height

		//possible tracking params
		'bav': null,
		'bvm': null,
		'bpcl': null,
		'w': '1',
		'h': '1',
		'tbnh': null,
		'tbnw': null,
		'fp': null,
		'ei': null,
		'usg': null,
		'sig2': null,
		'tbs': null,
		'ved': null,
		'site': null,
		'ei': null,
		'sei': null,
		'tab': null,
		'revid': null,

		//search config
		'safe': 'off',						//disable safe search
		'newwindow': '1',					//open links in new tab
		'pws': '0',							//disable personalized search
		'hl': 'en',							//search language
		'nfpr': '1',						//disable auto-correct (no forced spelling correction) (the parameter takes no values)
		//'nirf': '1',						//disable auto-correct suggestion link (the parameter takes no values)

		//'adtest': 'on',					//disable AdWords database connection
		//'complete': '0',					//disable instant search
		//'as_qdr': 'y15',					//display when sites released
		//'tbo': '1',						//tbo=1: Display search toolbar
		//'prmdo': '1',						//prmdo=1: expand 'services' in toolbar
		//'sout': '1',						//sout=1: change ui of image search to the old version
		//'esrch': 'instantpreviews',		//esrch=instantpreviews: enable instant preview
		//'filter': '1',					//filter=1: filter similar pages
		//'lr': 'en',						//search language
		//'ie': 'utf-8',					//query encoding
		//'oe': 'utf-8',					//search result encoding
		//'noj': '1',						//noj=1: no javascript

		//unknown params
		'pdx': null,
		'ech': null,
		'psi': null,
		'emsg': null,
		'facrc': null,
		'imgdii': null,
		'iact': null,
		'ndsp': null,
		'tx': null,
		'ty': null,
	},

	'cookieParams': {
		/**
		params for the 'pref' cookie
		*/
		'FF': '0',							//safe search (filter explicit results)
		'LD': 'en',							//language
		'NW': '1',							//open search results in a new window
		'SG': '2',							//instant search
		'CR': '2',							//country redirect
		'NR': '10',							//number of results

		//tracking params
		'TM': '0',							//settings time
		'LM': '0',							//last visited time
		'ID': '0000000000000000',
		'S': '0000000000000000',
		'U': '0000000000000000',
	},
}

/**/
function Config(configDict){
	this.configDict=configDict;
}

Config.prototype={
	'getAdd': function(){
		if(!this.addCached){
			this.addCached=_.chain(this.configDict).pairs().filter(function([key,val]) val!==null).object().value();
		}
		return this.addCached;
	},

	'getRemove': function(){
		if(!this.remCached){
			this.remCached=_.chain(this.configDict).pairs().filter(function([key,val]) val===null).map(function([key,val]) key).value();
		}
		return this.remCached;
	},
}

/**/
function FormProcessor(form, config){
	/**
	set default parameters for forms
	*/
	this.form=form;
	this.config=config;
}

FormProcessor.prototype={
	'processForm': function(){
		let form=this.form;
		let config=this.config;
		//index all search inputs for fast removal
		let searchInputs=Object.create(null);
		$(form).find('input').each(function(){
			searchInputs[$(this).attr('name')]=this;
		});
		//javascript doesn't have native set intersection support
		for(let key of Object.keys(config.getAdd())){
			let value=config.getAdd()[key];
			if(key in searchInputs){
				$(searchInputs[key]).attr('value',value);
			}else{
				searchInputs[key]=$('<input>',{'name': key, 'value': value, 'type': 'hidden'}).get(0);
				$(form).append(searchInputs[key]);
			}
		}
		for(let key of config.getRemove()){
			if(key in searchInputs){
				$(searchInputs[key]).remove();
				delete searchInputs[key];
			}
		}
	},

	'observe': function(observeNode, now=true){
		let self=this;
		let form=this.form;
		if(now)
			self.processForm();
		//listen for form input changes
		let observerConfig={attributes: true, subtree: true};
		let observer;
		let observer=new MutationObserver(function(mutations){
			//can be more efficient to just check for mutations, but this doesn't get called many times anyway
			observer.disconnect();
			self.processForm();
			observer.observe(observeNode, observerConfig);
		});
		observer.observe(observeNode, observerConfig);
	},
};

/**/
function PrefCookie(values){
	let self=this;
	if(_.isString(values)){
		return self.parse(values);
	}else{
		this.values=values;
	}
}

PrefCookie.prototype={
	'parse': function(s){
		return new PrefCookie(_.chain(s.split(':')).map(function(itemStr) itemStr.split('=')).object().value());
	},

	'stringify': function(){
		let self=this;
		return _.chain(self.values).pairs().map(function(item) item.join('=')).value().join(':');
	},
}

/**/
function CookieProcessor(config){
	this.config=config;
	$.cookie.raw=true;
}

CookieProcessor.prototype={
	'processCookies': function(){
		let self=this;
		let config=self.config;
		//the NID cookie is an httpsonly cookie, there is currently no greasemonkey support for this
		//this doesn't garuntee privacy, as sometimes page requests will reset the privacy cookie, hence google will know what page we visit next
		let prefStr=$.cookie('PREF');
		if(!prefStr)
			return false;
		let prefCookie=new PrefCookie(prefStr);
		for(let key of Object.keys(config.getAdd())){
			prefCookie.values[key]=config.getAdd()[key];
		}
		for(let key of Object.keys(config.getRemove())){
			delete prefCookie.values[key];
		}
		$.cookie('PREF', prefCookie.stringify(), {
			'domain': '.google.com',
		});
		return true;
	},

	'observe': function(){
		let cookie=document.cookie;
		Object.defineProperty(document.wrappedJSObject,'cookie',{
			get: function() cookie,
			set: function() null,
		});
	},
};

/**/
function LinksReadOnlyMixIn(){}

LinksReadOnlyMixIn.prototype={
	setLinkHrefReadOnly: function(link){
		let self=this;
		//stopping the propagation of clicks doesn't work for right clicks, so hook hrefs instead
		let href=link.href;
		let o_setAttribute=link.setAttribute;
		link.setAttribute=function(){};
		try{
			Object.defineProperty(link,'href',{
				get: function() href,
				set: function(newHref){
					//allow the setting of urls, as the initial hrefs might be empty
					let newHref=self.processUrl(newHref);
					if(href!=newHref){
						href=newHref;
						o_setAttribute('href',newHref);
					}
				},
			});
		}catch(TypeError){}
	}
}

/**/
function LinksProcessor(config){
	/**
	set default parameters for links
	*/
	this.config=config;
}

LinksProcessor.prototype={
	'processUrl': function(url){
		/**
		cleans a search url
		*/
		let config=this.config;
		let uri=new URI(url);
		return uri.setSearch(config.getAdd()).removeSearch(config.getRemove()).href();
	},

	'processLinks': function(links){
		let self=this;
		let config=this.config;
		links=$(links);

		links.attr('href',function(i, attr) self.processUrl(attr));
		links.each(function() self.setLinkHrefReadOnly(this.wrappedJSObject));
	},
};

$.extend(LinksProcessor.prototype, LinksReadOnlyMixIn.prototype);

/**/
function LinksRedirectProcessor(){};

LinksRedirectProcessor.prototype={
	'processUrl': function(url){
		/**
		cleans a redirect url
		*/
		let uri=new URI(url);
		if(!uri.hostname() || uri.hostname()==window.location.hostname){
			if(uri.path()=='/url'){
				return uri.search(true)['url'];
			}
		}
		return url;
	},

	'processAttributes': function(links){
		let links=$(links);
		links.removeAttr('data-ved data-cthref');
		links.attr('target','_blank');
	},

	'processLinks': function(links){
		let self=this;
		links=$(links);

		links.attr('href',function(i, attr) self.processUrl(attr));
		self.processAttributes(links);
		links.each(function() self.setLinkHrefReadOnly(this.wrappedJSObject));
	},
}

$.extend(LinksRedirectProcessor.prototype, LinksReadOnlyMixIn.prototype);

/**/
function GoogleProcessor(searchConfig, cookieConfig){
	this.searchConfig=searchConfig;
	this.cookieConfig=cookieConfig;
};

$.extend(GoogleProcessor.prototype, {
	'process': function(){
		let searchConfig=this.searchConfig;
		let cookieConfig=this.cookieConfig;

		let searchForms=$('form[action="/search"], form[action="/results"]');
		searchForms.each(function(){
			let formProcessor=new FormProcessor(this, searchConfig);
			formProcessor.observe(this);
		});

		let linksProcessor=new LinksProcessor(searchConfig);
		let links=$('a[href*="/search?"], a[href*="/imgres?"], a[href*="/maps?"],  a[href*="/flights/"]');
		linksProcessor.processLinks(links);

		let cookieProcessor=new CookieProcessor(cookieConfig);
		cookieProcessor.processCookies();
		cookieProcessor.observe();
	},
});

/**/

function LinksObserverMixIn(){}

$.extend(LinksObserverMixIn.prototype, {
	'observe': function(observeNode, linksSelector, now=true){
		let self=this;
		let config=this.config;
		if(!observeNode)
			return;
		if(now){
			let links=$(observeNode).find(linksSelector);
			self.processLinks(links);
		}
		let observerConfig={childList: true, subtree: true};
		let observer;
		observer=new MutationObserver(function(mutations){
			//disconnect to prevent infinite loops from modifying attributes
			observer.disconnect();
			for(let mutation of mutations){
				let links=$(mutation.target).add(mutation.addedNodes);
				links=links.find(linksSelector);
				self.processLinks(links);
			}
			observer.observe(observeNode, observerConfig);
		});
		observer.observe(observeNode, observerConfig);
	},
});

/**/
function GoogleImagesProcessor(searchConfig, cookieConfig){
	this.searchConfig=searchConfig;
	this.cookieConfig=cookieConfig;
};

$.extend(GoogleImagesProcessor, {
	'LinksProcessor': (function(){
		function GILinksProcessor(config){
			LinksProcessor.apply(this,arguments);
		}
		GILinksProcessor.prototype=Object.create(LinksProcessor.prototype);
		$.extend(GILinksProcessor.prototype, LinksObserverMixIn.prototype);
		return GILinksProcessor;
	})(),

	'LinksRedirectProcessor': (function(){
		function GILinksRedirectProcessor(){}
		GILinksRedirectProcessor.prototype=Object.create(LinksRedirectProcessor.prototype);
		$.extend(GILinksRedirectProcessor.prototype, LinksObserverMixIn.prototype);
		return GILinksRedirectProcessor;
	})(),
});

$.extend(GoogleImagesProcessor.prototype, {
	'removeGBVTracking': function(){
		/**
		removes google images url-change tracking
		*/
		Object.defineProperty(unsafeWindow,'maybeRedirectForGBV',{
			get: function(){return function(){}},
			set: function(){},
		});
	},

	'process': function(){
		let searchConfig=this.searchConfig;

		this.removeGBVTracking();

		let linksProcessor=new GoogleImagesProcessor.LinksProcessor(searchConfig);
		//observe new links for image group search results & similar images ("Try these too")
		linksProcessor.observe($('#irc_bg').get(0), 'a[href*="/search?"], a[href*="/imgres?"], a[href^="imgres?"]', false);
		//observe new links for image paginate results
		linksProcessor.observe($('#rg').get(0), 'a.rg_l', false);

		let linksRedirectProcessor=new GoogleImagesProcessor.LinksRedirectProcessor();
		//observe new links for embedded & newres image search result links ("Visit Page", "View Image")
		linksRedirectProcessor.observe($('#irc_bg').get(0), 'a.irc_vpl, a.irc_fsl, a.irc_itl, a.irc_tas', false);
	},
});

/**/
function GoogleImagesPreviewProcessor(searchConfig){
	/**
	iframe embedded in the google images preview div, in the google images search results page
	*/
	this.searchConfig=searchConfig;
};

$.extend(GoogleImagesPreviewProcessor.prototype, {
	'process': function(){
		let searchConfig=this.searchConfig;
		let linksRedirectProcessor=new GoogleImagesProcessor.LinksRedirectProcessor();
		linksRedirectProcessor.observe($('body').get(0), 'a#irc_mil', false);
	},
});

/**/
function main(){
	//parse user config
	let searchConfig=new Config(configDict.searchParams);
	let cookieConfig=new Config(configDict.cookieParams);
	new GoogleProcessor(searchConfig, cookieConfig).process();
	let uri=new URI(window.location.href);
	if(uri.search(true)['tbm']=='isch' || uri.pathname()=='/imgres'){
		new GoogleImagesProcessor(searchConfig,cookieConfig).process();
	}else if(uri.path()=='/blank.html'){
		new GoogleImagesPreviewProcessor(searchConfig).process();
	}
}

main();
