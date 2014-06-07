// ==UserScript==
// @description				Javascript Bot Framework
// @name				Javascript Bot Framework (JSBF)
// @namespace				lenni
// @version				1.0.6
// @include				http://*
// @include				https://*
// ==/UserScript==

// Author: lenni
// Date: 07.02.12
// License: GNU General Public License v3 (GPL)
// Url: http://userscripts.org/scripts/show/125070

(function(w){
	var d = w.document;

	var Arbiter = {
		listeners:{},

		inform:function(type,param){
			if(this.listeners[type]){
				for(var a = 0, b = this.listeners[type]; a < b.length; a++){
					w.setTimeout(b[a].bind(this,param),0);
				}
			}
		},

		subscribe:function(type,listener){
			if(!this.listeners[type]){
				this.listeners[type] = [];
			}

			this.listeners[type].push(listener);
		},

		unsubscribe:function(type){
			delete this.listeners[type];
		}
	};

	var Storage = {
		get:function(key){
			return w.localStorage ? w.localStorage.getItem(key) : null;
		},

		set:function(key,value){
			return w.localStorage && w.localStorage.setItem(key,value);
		},

		remove:function(key){
			return w.localStorage && w.localStorage.removeItem(key);
		},

		clear:function(){
			return w.localStorage && w.localStorage.clear();
		}
	};

	var JSON = w.JSON || {
		parse:function(str){
			return eval('(' + str + ')');
		},

		stringify:function(obj){
			if(obj instanceof Object){
				var str = '';

				if(obj.constructor === Array){
					for(var i = 0; i < obj.length; str += this.stringify(obj[i]) + ',', i++);
					return '[' + str.substr(0,str.length - 1) + ']';
				}

				if(obj.toString !== Object.prototype.toString){
					return '"' + obj.toString().replace(/"/g,'\\$&') + '"';
				}

				for(var prop in obj){
					str += '"' + prop.replace(/"/g,'\\$&') + '":' + this.stringify(obj[prop]) + ',';
				}

				return '{' + str.substr(0, str.length - 1) + '}';
			}

			return (typeof obj === 'string') ? '"' + obj.replace(/"/g,'\\$&') + '"' : String(obj);
		}
	};

	var Util = {
		$:function(selectors,context){
			if(!context) var context = d;
			return context.querySelector(selectors);
		},

		click:function(element){
			var evt = d.createEvent('MouseEvents');
			evt.initMouseEvent('click',true,true,w,0,0,0,0,0,false,false,false,false,0,null);
			return element.dispatchEvent(evt);
		},

		form:function(form,input){
			for(var i in input){
				form.elements[i].value = input[i];
			}
		},

		rand:function(min,max){
			return(min + Math.floor(Math.random() * (1 + max - min)));
		},

		now:function(){
			return(Number(new Date()) - Eventhandler.timedelta);
		}
	};

	var Eventhandler = {
		// eventstack
		stack:'eventhandler/stack',

		// eventlist
		events:[],

		// event listeners
		listeners:{},

		// logic urls
		url:[],

		// logic binomial probability
		probability:80,

		// max events
		limit:10,

		// time delta ( client - server )
		timedelta:0,

		// loadingtime
		loadingtime:999,

		// delay per site [min,max]
		sitedelay:[5,30],

		// delay per logic period [min,max]
		logicdelay:[600,2400],

		init:function(url){
			var str = Storage.get(this.stack)

			if(str !== null){
				this.events = JSON.parse(str);
			}

			this.url = url || [];

			this.initialized = true;

			Arbiter.inform('eventhandler/initialized',this);

			return this;
		},

		store:function(){
			var str = JSON.stringify(this.events);
			Storage.set(this.stack,str);
		},

		addlistener:function(name,callback){
			this.listeners[name] = callback;
		},

		create:function(event){
			this.events.push(event);

			Arbiter.inform('eventhandler/create',event);
		},

		remove:function(event){
			this.events = this.events.filter(function(e){
				return e !== event;
			});

			Arbiter.inform('eventhandler/remove',event);
		},

		next:function(){
			if(!this.events.length) return false;

			var nextEvent = this.events[0];

			for(var i = 1; i < this.events.length; i++){
				if(this.events[i].time - nextEvent.time < 0){
					nextEvent = this.events[i];
				}
			}

			return nextEvent;
		},

		num:function(){
			return this.events.length;
		},

		logic:function(){
			var limit = this.limit;
			var timer = Util.now() + Util.rand(this.logicdelay[0],this.logicdelay[1]) * 999;

			while(limit--){
				if(!this.events.filter(function(e){ return Math.abs(e.time - timer) < this.sitedelay[0] * 999; }.bind(this)).length){
					this.create({time:timer,url:this.url[Util.rand(0,this.url.length - 1)]});

					if(this.probability < Util.rand(1,100)) break;
				}

				timer += Util.rand(this.sitedelay[0],this.sitedelay[1]) * 999;
			}

			this.trigger();
		},

		trigger:function(){
			var event = this.next();

			if(event){
				var timer = event.time - (Util.now() + this.loadingtime);

				if(timer < 0){

					if(event.listener && this.listeners[event.listener]){
						if(this.listeners[event.listener].call(this,event)) return;
					}

					this.remove(event);
					this.trigger();

				}else if(timer < this.logicdelay[1] * 999){

					if(this.timeout) w.clearTimeout(this.timeout);
					this.timeout = w.setTimeout(function(){ w.location.assign(event.url); },timer);

				}else{
					this.logic();
				}

			}else{
				this.logic();
			}

			this.store();

			Arbiter.inform('eventhandler/trigger');
		}
	};

	w.Arbiter = Arbiter;
	w.Storage = Storage;
	w.JSON = JSON;
	w.Util = Util;
	w.Eventhandler = Eventhandler;

})(window);

// Api Test
// 1. Go to https://www.google.com/ (important note: localStorage just works within same host)
// 2. Wait 30 sec. then:
// 3. The Bot load https://www.google.com/imghp and insert "Hi ;)" and submit the form
// This only demonstrate that it works quite well ;)

if(!Eventhandler.initialized){

	// Init ( Logic Urls )
	Eventhandler.init(['https://www.google.com/']);

	// Auto Trigger
	Arbiter.subscribe('eventhandler/create',Eventhandler.trigger.bind(Eventhandler));

	// Add listener
	Eventhandler.addlistener('hi',function(){
		var f = Util.$('form[name="f"]');

		Util.form(f,{'q':'Hi ;)'}); // name
		// OR: Util.form(f,{5:'Hi ;)'}); // form-index

		f.submit();
	});

	// Create Event
	Eventhandler.create({
		time:Util.now()+30000,
		url:'https://www.google.com/imghp',
		listener:'hi'
	});

}