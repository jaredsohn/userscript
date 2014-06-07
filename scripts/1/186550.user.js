// ==UserScript==
// @name        Auto link clicker
// @namespace   http://userscripts.org/users/542861
// @description Redirect to images on 2ch-library.com
// @include     http://2ch-library.com/r/*
// @version     0.1
// @grant       none
// ==/UserScript==

(function() {
	function AutoClicker(baseURI){
		this.baseURI=baseURI;
		this.domain=null;
		this.action=new Actions();
	}
	AutoClicker.prototype = {
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
	Actions.prototype = {
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

		patterns: {
			twoChLibrary: {
				rule: "2ch-library.com",
				run: function(){
					var matches;

                    if((matches=document.body.innerHTML.match(/http:[/]+mup\.2ch\-library\.com\/d\/[\w\.\-]+/)) && matches)
						this.targetUrl=matches[0];
					this.redirect();
					//window.alert(this.targetUrl);
				}
			}
		}
	}

	var myClicker=new AutoClicker(document.baseURI);
	myClicker.matchDomain().matchAction().invokeAction();

})();