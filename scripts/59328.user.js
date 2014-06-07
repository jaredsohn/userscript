// ==UserScript==
// @name		Facebook MW DeIce
// @description	hides selectable message types of mafia wars posts on facebook wall, highlights job help needed entries and provides a quickling to help on jobs without opening a new window
// @namespace           userscripts.org/users/111702
// @include		http://www.facebook.com/home.php?filter=app_10979261223
// @version		0.4.2
// @author		Patrick Atamaniuk
// ==/UserScript==

/*

Changelog:
 0.4.2: disable quickhelp for moscow - players don't get skillpoints when using quickhelp. Use the official link please to help your mafia.
 0.4.1: what is clickjacking?
 0.4.0: thanksgiving -> event, energy packs, disable quickhelp, new algorithm is needed
 0.3.9a: new wishlist and 'new loot' viral loot brag
 0.3.9: patch help urls wich have the city id bug - that is ALL cuba jobs now should work again
 0.3.8: more fixes, autolike
 0.3.7: fix job ids
 0.3.6b: move laundering to achievement boost, move ny jobs to spam
 0.3.6: better fixed url rewrite
 0.3.5: fixed url rewrite
 0.3.4: rollback to 0.3.1
 0.3.1: remove comment form from feedback, disable clearing of store at upgrade
 0.3.0: enqueue requests, 2 concurrent requests, timeouts
 0.2.8d: put buying from godfather to spam, remove post-message dialog in feedback
 0.2.8c: nicer job responses, don't make own jobs clickable
 0.2.8b: use other persistent ids for jobs, clear store on upgrade
 0.2.8a: disable persistent helps, the id is not unique; add lotto to spam
 0.2.8: reorganize regex to fix cities
 0.2.7: fix cuba jobs
 0.2.6: remember helped jobs, fix moscow boss fight
 0.2.5: Halloween brag
 0.2.4: debugged updater
 0.2.3: join mafia debugged
 0.2.2: request job help friend is spam
 0.2.1: work on updater
 0.2.0: update function, bugfixes in primary regex
 0.1.9: show instead of hide logic, count xp gained
 0.1.8: separate jobs
 0.1.7: add options
 0.1.6: add quickhelp functionality to help on jobs without opening new tabs
 0.1.5: add quickhelp functionality to help on jobs without opening new tabs
 0.1.3: encapsulate deClutter in try-catch
 0.1.2: handle war help with noop before job help

*/

/************* BEGIN LIBRARY ***********************/
/* namespace */
var mwdeice = {
  SCRIPTurl : 'http://userscripts.org/scripts/source/59328.user.js',
  SCRIPTbuild : '42001',
  SCRIPTversion : '0.4.2',
  clearStoreOnUpgrade : false//0.3.6 changed jid
};

/* stolen from extjs.com */
mwdeice.apply = function(o, c, defaults){
    if(defaults){
        // no "this" reference for friendly out of scope calls
        Ext.apply(o, defaults);
    }
    if(o && c && typeof c == 'object'){
        for(var p in c){
            o[p] = c[p];
        }
    }
    return o;
};
mwdeice.apply(Function.prototype, {
  createDelegate : function(obj, args, appendArgs){
		  var method = this;
		  return function() {
		    var callArgs = args || arguments;
		    if(appendArgs === true){
		      callArgs = Array.prototype.slice.call(arguments, 0);
		      callArgs = callArgs.concat(args);
		    }else if(typeof appendArgs == "number"){
		      callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
		      var applyArgs = [appendArgs, 0].concat(args); // create method call params
		      Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
		    }
		    return method.apply(obj || window, callArgs);
		  };
		}
});

mwdeice.apply(mwdeice, {
  get : function(id) { return document.getElementById(id); },


  makeElement : function(type, appendto, attributes, checked, chkdefault) {
		  var element = document.createElement(type);
		  if (attributes != null) {
		    for (var i in attributes) {
		      element.setAttribute(i, attributes[i]);
		    }
		  }
		  if (checked != null) {
		    if (mwdeice.getOpt(checked, chkdefault)) {
		      element.setAttribute('checked', 'checked');
		    }
		  }
		  if (appendto) {
		    appendto.appendChild(element);
		  }
		  return element;
		},

  clickElement : function (elt) {
    if (!elt) {
      return;
    }

    // Simulate a mouse click on the element.
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
    elt.dispatchEvent(evt);
  },

 /**
  * simplify xpath queries
  * @param query the query, see w3c.org
  * @param context domElement of query context
  */
  xpath : function(query, context) {
		  if (!context) context=document;
		  return document.evaluate(query, context, null,
					   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		},

  getOpt : function(id, cdefault) {
		  if (cdefault) cdefault='checked'; else cdefault='';
		  return (GM_getValue(id, cdefault)=='checked')?true:false;
		},
  setOpt : function(el) {
		  GM_setValue(el.getAttribute('id'), el.checked?'checked':'');
		},


  checkUpgrade : function() {
		  var lastv = null;
		  if (lastv = GM_getValue('mwdeicelastversion',null)) {
		    if (lastv == mwdeice.SCRIPTbuild) return;
		    if (mwdeice.clearStoreOnUpgrade) mwdeice.clearStore();
		  }
		  GM_setValue('mwdeicelastversion',mwdeice.SCRIPTbuild);
  },
  storeDisabled : false,
  clearStore : function() { mwdeice.store={}; mwdeice.saveStore(); },
  loadStore : function() {
		  if (mwdeice.storeDisabled) return {};
		  try {
		    mwdeice.store = GM_getValue('mwdeiceStore', '{}');
		    mwdeice.store = eval('('+mwdeice.store+')');
		  }
		  catch(e) {
		    console.log('loadStore exception',e);
		    mwdeice.store = {};
		  }
		  return mwdeice.store;
		},
  saveStore : function() {
		  if (mwdeice.storeDisabled) return;
		  if (!mwdeice.store) mwdeice.store={};
		  GM_setValue('mwdeiceStore', uneval(mwdeice.store));
		},
  store : {},
  storeSetSuccess : function(jid, gain, msg) {
		  if (mwdeice.storeDisabled) return;
		  if (!mwdeice.store[jid]) mwdeice.store[jid]={};
		  mwdeice.store[jid].g = gain;
		  mwdeice.store[jid].m = msg;
		  mwdeice.saveStore()
  },
  getStoreEntry : function(jid) {
		  if (mwdeice.storeDisabled) return null;
		  return mwdeice.store[jid];
		},

 /**
  * make a hidden element invisible
  * @param el domElement to hide
  */
  hide : function(el) {
		  try {
		    if (el.style.display != "none") {
		      el.style.display="none";
		    }
		  } catch(e){console.log(e);}
		},

 /**
  * make a hidden element visible
  * @param el domElement to show
  */
  show : function(el) {
		  try {
		    if (el.style.display == "none") {
		      el.style.display="block";
		    }
		  } catch(e) {}
		},

  getAttachment : function(story) {
		  var storyAttachments = mwdeice.xpath(".//div[@class='UIStoryAttachment']", story);
		  for(var i=0; i<storyAttachments.snapshotLength; i++) {
		    return storyAttachments.snapshotItem(i); //first one
		  }
		},
  getCommentableItemData : function(story) {
		  var el = mwdeice.get(story.getAttribute('id').replace('div_story_','commentable_item_')); //form
		  for (var ch=0;ch<el.childNodes.length;ch++) {
		    var val = el.childNodes[ch].value;
		    if (val[0]=='{') {
		      try {
			var res = eval('('+val+')');
			return res;
		      }
		      catch(e){console.log(e);}
		      }
		  }
		  return null;
		},

  updateScript : function () {
		  try {
		    if (!GM_getValue) {
		      return;
		    }
		    GM_xmlhttpRequest({
		      method: 'GET',
			  url: mwdeice.SCRIPTurl + '?source', // don't increase the 'installed' count; just for checking
			  onload: function(result) {
			  if (result.status != 200) {
			    return;
			  }
			  if (!result.responseText.match(/SCRIPTbuild :\s+'(\d+)/))
                            return;
                          var theOtherBuild = parseInt(RegExp.$1, 10);
			  var runningBuild = parseInt(mwdeice.SCRIPTbuild, 10);
			  var theOtherVersion = result.responseText.match(/@version\s+([\d.]+)/)? RegExp.$1 : '';
			  if (theOtherBuild < runningBuild) {
			    if (window.confirm('You have a beta version (build ' + runningBuild + ') installed.\n\nDo you want to DOWNGRADE to the most recent official release (version ' + theOtherVersion + ')?\n')) {
			      window.location.href = mwdeice.SCRIPTurl;
			    }
			    return;
			  } else if (theOtherBuild > runningBuild ||
				     theOtherVersion != mwdeice.SCRIPTversion) {
			    if (window.confirm('Version ' + theOtherVersion + ' is available!\n\n' + 'Do you want to upgrade?' + '\n')) {
			      window.location.href = mwdeice.SCRIPTurl;
			    }
			  } else {
			    alert('You already have the latest version.');
			    return;
			  }
			}
		      });
		  } catch (ex) {
		    console.log('warning Icon', ex);
		  }
		},

   selfUID : null,
   findSelfUID : function() {
     var tEl = mwdeice.get('fb_menu_account');
     if (tEl) tEl = tEl.firstChild;
     if (tEl) mwdeice.selfUID = /id=(\d+)/.exec(tEl.getAttribute('href'));
     if (mwdeice.selfUID) mwdeice.selfUID = mwdeice.selfUID[1];
     //console.log('selfUID=',mwdeice.selfUID);
   },



//transport functions
   requestConcurrency : 2,
   httpHelpTimeout : 60000,


   reqId : {},
   httpErrCb : function(r, cb) {
     window.clearTimeout(cb.timeoutId);
     delete mwdeice.reqId[cb.sid];
     mwdeice.fireRequestQueue();
   },
   httpTimeoutCb : function(n, cb) {
     try {
       var qlink = mwdeice.get('qhelp_'+cb.sid);
       if (qlink) {qlink.innerHTML = 'timeout.';}
       mwdeice.addHandler(cb.sid);
     } catch(e) {}
     delete mwdeice.reqId[cb.sid];
     mwdeice.fireRequestQueue();
   },
   httpSuccessCb : function(r, cb) {
     var qlink = mwdeice.get('qhelp_'+cb.sid);
     var s = r.responseText.toString();
     delete mwdeice.reqId[cb.sid];
     cb.f(s, cb.sid);
     mwdeice.fireRequestQueue();
   },
   httpRetryCb : function(cb, n) {
     var qlink = mwdeice.get('qhelp_'+cb.sid);
     if (qlink) {qlink.innerHTML += ' retry:'+(n+1);}
   },
   httpRedirectCb : function(cb) {
     var qlink = mwdeice.get('qhelp_'+cb.sid);
     if (qlink) {qlink.innerHTML += ' ...';}
   },
   httpHelp : function(u, func, n, sid){
    var qlink = mwdeice.get('qhelp_'+sid);
    var cb = { f: func, sid: sid, url: u };
    mwdeice.reqId[cb.sid] = cb;
    var timeout = window.setTimeout(mwdeice.httpTimeoutCb.createDelegate(null,[cb],true), mwdeice.httpHelpTimeout);
    cb.timeoutId = timeout;

//console.log('xmlhttpRequest:',u);
    GM_xmlhttpRequest({method:'get', url:u,
                       onerror: mwdeice.httpErrCb.createDelegate(null,[sid], true),
                       onload:function(r){
                        window.clearTimeout(cb.timeoutId);
//console.log('onLoad:',r);
			if (n == undefined)
			  n = 0;
			else {
			  if (n > 5) {
                            mwdeice.httpErrCb(null, cb);
                            console.log('httpHelp: giving up');
			    return;
			  }
			}
			s = r.responseText.toString();
			if (!s) {
			  mwdeice.httpRetryCb(cb, n);
			  mwdeice.httpHelp(u, func, n + 1, sid);
			}
			else {
                            mwdeice.httpSuccessCb(r, cb);
			}
		}
	});
      return mwdeice.reqId[cb.sid];
   },


   requestQueue : [],
   enqueueRequest : function(url, func, sid) {
     var qlink = mwdeice.get('qhelp_'+sid);
     qlink.innerHTML='request enqueued.';
     mwdeice.requestQueue.push({u:url, f:func, sid:sid});
     mwdeice.fireRequestQueue();
   },

   fireRequestQueue: function() {
     if (mwdeice.requestQueue.length) {
       if (mwdeice.reqId.__count__ >= mwdeice.requestConcurrency) return; //firefox specific
       r = mwdeice.requestQueue.shift();
       var qlink = mwdeice.get('qhelp_'+r.sid);
       qlink.innerHTML='helping...';
       mwdeice.httpHelp(r.u, r.f, 0, r.sid);
     }
   }

});


mwdeice.CUrl = {
 
	// public method for url encoding
	encode : function (string) {
		return escape(this._utf8_encode(string));
	},
 
	// public method for url decoding
	decode : function (string) {
		return this._utf8_decode(unescape(string));
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}
/************* END LIBRARY ***********************/

/**
 * the main routine:
 *  for each post, check if the attachment node contains a text matching the regular expression,
 *  if match, call the action with parameter
 */
mwdeice.deClutter = function() {

  if (!homeStreamEl) return;
  if (! mwdeice.getOpt('mwdeice_onOff', 'checked') ) return;

  var story = null;
  var streamContent = null;
  var optId = null;
  var fn;
  var handled;
  var URL = '';
  streamContent = homeStreamEl.getElementsByClassName('UIIntentionalStream_Content')[0];

  for (optId in mwdeice.options) {
    mwdeice.options[optId]['state'] = mwdeice.getOpt('mwdeice_'+optId, mwdeice.options[optId]['default']);
  }
  optId = null;

  for(var d in streamContent.childNodes) {
    handled = false;
    story = streamContent.childNodes[d];
    var seen = story.getAttribute('deiceseen');
    if (seen) continue;
    var sid = story.getAttribute('id');
    story.setAttribute('deiceseen',sid);

    var unknownEntry = false;
    var dataft = null;
    try {
      dataft = eval('('+story.getAttribute("data-ft")+')');
    }
    catch(e){
      unknownEntry = true;
    }
    if (!dataft.app_id || dataft['app_id'] != '10979261223')
      unknownEntry = true;
    if (unknownEntry) {
            optId = 'unknownEntries';
	    if (mwdeice.options[optId]['state']) {
	      fn = mwdeice.options[optId].actionShow;
	      if (fn) fn(story, null);
	    }
	    else {
	      fn = mwdeice.options[optId].actionHide;
	      if (fn) fn(story, null);
	    }
            continue
    }


    var links = story.getElementsByTagName('a');
    for (var l=0;l<links.length;l++) {
      var link = links[l];
      if ( /(inthemafia)/.exec(link.href) ){
        for (var mwctmp=0;mwctmp<mwdeice.regexes.length;mwctmp++) {
          if (m = mwdeice.regexes[mwctmp].x.exec(link.href)) {
	    optId = mwdeice.regexes[mwctmp].optId;
	    if (URL = /(http:.+\/track\.php\?.*sendkey=.+)/.exec(link.href) ){ // correct format for quicklink url
	      URL = URL[1];
	    }
	    if (mwdeice.options[optId]['state']) {
	      fn = mwdeice.options[optId].actionShow;
	      if (fn) fn(story, URL);
	    }
	    else {
	      fn = mwdeice.options[optId].actionHide;
	      if (fn) fn(story, URL);
	    }
            handled=true;
	    break;
          } //if mwdeice.regexes
        } //for mwctmp in regexes
      } //inthemafia
      if (handled) break;
    }// l in links

  } //streamcontent childNodes

}

mwdeice.autoLike = function(sid) {
  if (! mwdeice.getOpt('mwdeice_autolike',false) ) return;
  var story = mwdeice.get(sid);
  if (!story) return;
  var like = mwdeice.xpath(".//button[@name='like']", story);
  if (like && like.snapshotLength) {
    mwdeice.clickElement(like.snapshotItem(0));
    return;
  }
};

mwdeice.addHandler = function(sid) {
  var qlink = mwdeice.get('qhelp_'+sid);
  if (!qlink) return;
  var url =  mwdeice.storyActionLinks[sid].url;
  var callback = mwdeice.storyActionLinks[sid].callback;
  var handler = function(ev) { callback(sid, url); }
  for (var h=0;h<mwdeice.storyActionLinks[sid].hotspots.length; h++) {
    mwdeice.storyActionLinks[sid].hotspots[h].addEventListener('click', handler, false);
    mwdeice.storyActionLinks[sid].hotspots[h].style.cursor = 'pointer';
  }
  mwdeice.storyActionLinks[sid].handler = handler;
}

mwdeice.removeHandler = function(sid) {
  var handler = mwdeice.storyActionLinks[sid].handler;
  for (var h=0;h<mwdeice.storyActionLinks[sid].hotspots.length; h++) {
    if (mwdeice.storyActionLinks[sid].hotspots[h] && mwdeice.storyActionLinks[sid].hotspots[h].removeEventListener);
      mwdeice.storyActionLinks[sid].hotspots[h].removeEventListener('click', handler, false);
    mwdeice.storyActionLinks[sid].hotspots[h].style.cursor = 'default';
  }
}

function job(s, sid){
  var q;
  var jid = mwdeice.storyActionLinks[sid].jid;
  var qlink = mwdeice.get('qhelp_'+sid);
  if (q = /<span class="good">(\d+) experience point/.exec(s) ) {
    if (qlink) {
      qlink.innerHTML='Experience gained: '+q[1];
      xp = mwdeice.get('mwdeice_experiencegained');
      if (xp) {
	var gain = parseInt(q[1], 10);
	xp.innerHTML = parseInt(xp.innerHTML, 10) + gain;
	mwdeice.storeSetSuccess(jid, parseInt(q[1], 10), 's'); 
        mwdeice.removeHandler(sid);
      }

      if (q = /<span class="good">.*?and <strong class="money">(.+?)<\/strong>/.exec(s)) {
        qlink.innerHTML += ' and '+q[1];
      }
    }
    mwdeice.autoLike(sid);
  }
  else if( /Sorry, you can only help 25 friends/.test(s) ) {
    if (qlink) {
      qlink.innerHTML='Reached 25+';
      mwdeice.storeSetSuccess(jid, 0, '+'); 
      mwdeice.addHandler(sid);
    }
  }
  else if( /too late/.test(s) ) {
    if (qlink) {
      qlink.innerHTML='too late.';
      mwdeice.storeSetSuccess(jid, 0, 'l'); 
      mwdeice.removeHandler(sid);
    }
  }
  else if( /already helped/.test(s) ) {
    if (qlink) {
      qlink.innerHTML='helped already';
      mwdeice.storeSetSuccess(jid, 0, 'h'); 
      mwdeice.removeHandler(sid);
    }
  }
  else if( /not your friends/.test(s) ) {
    if (qlink) {
      qlink.innerHTML='not friends?';
      mwdeice.storeSetSuccess(jid, 0, 'f'); 
      mwdeice.addHandler(sid);
    }
  }
  else {
    if (qlink) {
      qlink.innerHTML='unknown result:'+s;
      mwdeice.addHandler(sid);
    }
  }


  if (q = /(<table class="messages" style="">.+?<\/table>)/.exec(s)) {
     var qstr = q[1]+'</table>';
     qstr = qstr.replace(/<div style="border.+?<div.+?thank.you.*?div>.*?div>/, ''); //remove message post form
     qstr = qstr.replace(/<form.+?form>/g, ''); //remove message post form
     qlink.innerHTML += qstr;
  }

}


mwdeice.storyActionLinks = {};

/**

find a unique key for stories so we can remember.
try 1, not unique: data-ft.extra_story_params.target_id of commentable_item
try 2:
users profile cuba job commentable item data:
{"source":"0","target_fbid":"167710691175","target_owner":"100000103601458","target_owner_name":"Quan Thai","item_id":"907731323","type_id":"63","assoc_obj_id":"10979261223","check_hash":"d896bb96258d2715","num_comments":"1","extra_story_params":{"target_id":"100000103601458"},"source_app_id":"","extra_data":[]}

---
{"source":"1","target_fbid":"167710691175","target_owner":"100000103601458","target_owner_name":"Quan Thai","item_id":"1977034233","type_id":"63","assoc_obj_id":"10979261223","check_hash":"c055fbedd3379520","num_comments":"1","extra_story_params":{"target_id":"100000103601458"},"source_app_id":"","extra_data":[]}

user:100000103601458
me:100000156380459

http://apps.facebook.com/inthemafia/index.php?xw_controller=job&xw_action=give_help&target_id=1111311383&job_city=2&skip_interstitial=1&sendtime=1259273306&friend=1111311383
http://apps.facebook.com/inthemafia/index.php?xw_controller=episode&xw_action=give_help_moscow_social&target_id=704157107&job_city=3&skip_interstitial=1&sendtime=1259276667&friend=704157107

*/
mwdeice.makeQuickLink = function(story, helpURL, callback) {
  if (!helpURL) {
    return;
  }
  var newURL = null;
  var qlink =  null;
  try {

  var nextparams = /next_params=(.*?)&/.exec(helpURL);
  var sendtime = /sendtime=(.*?)&/.exec(helpURL);
  var controller = /next_controller=(.*?)&/.exec(helpURL);
  var action = /next_action=(.*?)&/.exec(helpURL);
  var friend = /friend=(.*?)&/.exec(helpURL);
  var np = unescape(nextparams[1]).replace(/\+"/g,'"');
//  console.log(np,sendtime,controller,action,friend);

  nextparam = eval('('+np+')');
//  console.log(nextparam);
  newURL = 'http://apps.facebook.com/inthemafia/index.php?xw_controller='+controller[1]+'&'+
							 'xw_action='+action[1]+'&'+
							 'target_id='+nextparam['target_id']+'&'+
							 'job_city='+nextparam['job_city']+'&'+
							 'skip_interstitial='+nextparam['skip_interstitial']+'&'+
							 'sendtime='+sendtime[1]+'&'+
							 'friend='+friend[1]
  } catch(e) {console.log(e);return;}
//  console.log(newURL);

  if (!newURL) return;
  var sid = story.getAttribute('id');
  if (mwdeice.storyActionLinks[sid]) return;

  //

  var storyAttachment = mwdeice.getAttachment(story);

  var data = mwdeice.getCommentableItemData(story);
  if (data && data.target_owner == mwdeice.selfUID) return;

  var jid = null;
  if (data && data.extra_story_params) {
    jid = data.target_owner+'/'+data.target_fbid+'/'+mwdeice.selfUID;
    storyAttachment.appendChild(document.createElement('div')).innerHTML=jid;
  }

  qlink = storyAttachment.appendChild(document.createElement('div'));
  qlink.innerHTML='quickhelp';
  qlink.style.color = 'blue';
  qlink.setAttribute('id','qhelp_'+sid);



  //moscow skills
  if (/cityId=3/.exec(helpURL)) {
    qlink.innerHTML='quickhelp not available, please help via the original link.';
    return;
  }

  //cuba fix
  var cubafix=false;
  if (/request_job_help_short_cuba&cityId=2/.exec(helpURL)) {
    newURL = newURL.replace('job_city=1','job_city=2');
    qlink.innerHTML += ' (cuba fixed)';
  }

  mwdeice.storyActionLinks[sid] = {'url':newURL, callback:callback, hotspots:[storyAttachment,qlink], 'jid':jid, 'sid':sid};
  var ste = mwdeice.getStoreEntry(jid);

  if (ste) {
    switch (ste.m) {
    case '+':
      qlink.innerHTML='25+, click to re-check';
      break;
    case 'l':
      qlink.innerHTML='too late';
      return;
    case 'h':
      qlink.innerHTML='helped already, xp unknown';
      return;
    case 'f':
      qlink.innerHTML='not friends, click to re-check';
      break;
    case 's':
      qlink.innerHTML='helped, gained '+ste.g;
      return;
    }
  }

  mwdeice.addHandler(sid);
}

function doQuickHelp(sid,url) {
  fn = function(s, id){job(s,id)}
  var qlink = mwdeice.get('qhelp_'+sid);
  if (qlink) {
    mwdeice.removeHandler(sid);
  }
  //TODO add timeout handler which fixes back hotspot
  //add retry button here
  //TODO enqueue this job
  mwdeice.enqueueRequest(mwdeice.storyActionLinks[sid].url, fn, sid);
}
function helpJob(story, helpURL) {
  action_highlightPost(story,'yellow');
  mwdeice.makeQuickLink(story, helpURL, doQuickHelp);
}



var modificationTimer;          // Timer used to wait for content changes
var homeStreamEl = null;




/*******************************************************
 * available actions
 *******************************************************/

/**
 * completely hide a post
 */
function action_hidePost(storyEntry, param) {
  mwdeice.hide(storyEntry);
}

/**
 * action: hightlight a post so it is more present
 */
function action_highlightPost(story, param) {
  var storyAttachment = mwdeice.getAttachment(story);
  storyAttachment.style.backgroundColor = param;
}

/**
 * action: remove the icon from the post so the post is more compact
 */
function action_removeIcon(story) {
  var storyAttachment = mwdeice.getAttachment(story);
  mwdeice.hide(storyAttachment.firstChild);
}

/**
 *
 */
function action_NOOP(a,b,c) {}




mwdeice.options = {
  'showNY': {
    label: 'NY jobs',
    actionShow: helpJob,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showCuba': { label: 'Cuba jobs',
    actionShow: helpJob,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showMoskow': { label: 'Moscow jobs',
    actionShow: helpJob,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showIce': {
    label: 'Ice boosts',
    actionShow: action_removeIcon,
    actionHide: action_hidePost,
    default: false,
    state: true
  },
  'showLevelUp': {
    label: 'Level boosts',
    actionShow: null,
    actionHide: action_hidePost,
    default: false,
    state: true
  },
  'showGiftrequests' : {
    label: 'Gift requests',
    actionShow: action_removeIcon,
    actionHide: action_hidePost,
    default: false,
    state: true
  },
  'showWar' : {
    label: 'War',
    actionShow: null,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showBounty' : {
    label: 'Bounty',
    actionShow: null,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showAchievementBrag' : {
    label: 'Achievement brag',
    actionShow: null,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showAchievementBoost' : {
    label: 'Achievement boost',
    actionShow: null,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showRecruitement' : {
    label: 'Recruitement',
    actionShow: null,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showSpam' : {
    label: 'Spam brag',
    actionShow: null,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showEventloot' : {
    label: 'Events',
    actionShow: null,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'showEnergy' : {
    label: 'Energypack',
    actionShow: null,
    actionHide: action_hidePost,
    default: true,
    state: true
  },
  'unknownEntries' : 
  {
    label: 'Unknown posts',
    actionShow: null,
    actionHide: action_hidePost,
    default: false,
    state: true
  }
};

			      /**

http://apps.facebook.com/inthemafia/track.php?next_controller=lotto&next_action=view&zy_track=newsfeed&sendkey=fe720b4f15c1d93e87ba476cfb021d22&ztrack_category=lotto_winner_short&ref=nf
			      **/
mwdeice.regexes = [
  {optId:'showSpam', rx:'request_job_help_friend'},
  {optId:'showIce',rx:'iced_boost_claim'},

  {optId:'showSpam', rx:'Big_Apple_'},
  {optId:'showEventloot', rx:'laundering_hit_jackpot'},
  {optId:'showEventloot', rx:'laundering_continue_jackpot'},

  {optId:'showCuba', rx: 'cuba' }, //cubajob bug wrong city workaround
  {optId:'showMoskow', rx: 'next_action=give_help.+?job_city%22%3A%223' },
  {optId:'showNY', rx: 'next_action=give_help.+?job_city%22%3A%221' },
  {optId:'showCuba', rx: 'next_action=give_help.+?job_city%22%3A%222' },


  {optId:'showLevelUp',rx:'levelup_boost_claim'},
  {optId:'showGiftrequests',rx:'wishlistshort'},
  {optId:'showGiftrequests',rx:'wishlist_short'},
  {optId:'showWar',rx:'story_war'},
  {optId:'showBounty',rx:'feed_hit'},
  {optId:'showBounty',rx:'story_hitlist_social'},
  {optId:'showAchievementBoost',rx:'achievement_share'},
  {optId:'showAchievementBrag',rx:'achievement'},
  {optId:'showAchievementBrag',rx:'moscow_episode_complete' },
  {optId:'showEnergy', rx:'energy_pack_(ask|offer)'},
  {optId:'showSpam', rx:'Halloween_featured_job'},
  {optId:'showSpam', rx:'lotto'},
  {optId:'showSpam', rx:'boost_revault' },
  {optId:'showSpam', rx:'property' },
  {optId:'showSpam', rx:'viral_brag' },
  {optId:'showSpam', rx:'viral_loot_job_help_request_stream'},
  {optId:'showRecruitement', rx:'recruit' },
  {optId:'showEventloot', rx:'thanksgivingpromo'},
  {optId:'showEventloot', rx:'halloweenpromo_found'},
  {optId:'showAchievementBrag', rx:'halloweenpromo_finished'},
  {optId:'showSpam', rx:'favor_brag'}
  
  ];
for (var mwctmp=0;mwctmp<mwdeice.regexes.length;mwctmp++) mwdeice.regexes[mwctmp].x = new RegExp(mwdeice.regexes[mwctmp].rx);
/*******************************************************
 * utility functions
 *******************************************************/


/*******************************************************
 * status and options
 *******************************************************/
var statusArea=null;
var optionEls = {};
function initStatusArea() {
  if (statusArea) return;
  var home_filter_list = mwdeice.get('home_filter_list');
  if (!home_filter_list) return;

  var d = mwdeice.makeElement('div', home_filter_list, {'style':'margin:0;border:solid 1px black; background-color:white'});

  var title = mwdeice.makeElement('div', d);
  title.innerHTML = 'Mafiawars DeIce';
  title.addEventListener('click', mwdeice_onStatusareaClick, false);

  statusArea = mwdeice.makeElement('div', d, {'id':'mwdeice_StatusArea','style':'padding-left:8px'});
  statusArea.appendChild(document.createTextNode('Build '+mwdeice.SCRIPTversion));


  var optionsEl = mwdeice.makeElement('div', statusArea, {'id':'mwdeice_options','style':'padding:4px'});
  optionsEl.innerHTML='Options';

  var divEl;
  divEl = mwdeice.makeElement('div', optionsEl);
  optionEls['onOff'] = mwdeice.makeElement('input', divEl, {'type':'checkbox', 'id':'mwdeice_onOff', 'value':'checked'}, 'mwdeice_onOff', 'checked');
  optionEls['onOff'].addEventListener('click', mwdeice_onOff_onclick, false);
  divEl.appendChild(document.createTextNode('Deice enabled'));

  for (var optId in mwdeice.options) {
    divEl = mwdeice.makeElement('div', optionsEl);
    optionEls[optId] = mwdeice.makeElement('input', divEl, {'type':'checkbox', 'id':'mwdeice_'+optId, 'value':'checked'}, 'mwdeice_'+optId, 'checked');
    optionEls[optId].addEventListener('click', mwdeice_showJob_onclick.createDelegate(null,[optId]), false);
    divEl.appendChild(document.createTextNode(mwdeice.options[optId].label));
  }

    //special buttons
    optId = 'autolike';
    divEl = mwdeice.makeElement('div', optionsEl);
    optionEls[optId] = mwdeice.makeElement('input', divEl, {'type':'checkbox', 'id':'mwdeice_'+optId, 'value':'checked'}, 'mwdeice_'+optId);
    optionEls[optId].addEventListener('click', mwdeice_showJob_onclick.createDelegate(null,[optId]), false);
    divEl.appendChild(document.createTextNode('auto like'));


  divEl = mwdeice.makeElement('div', optionsEl);
  mwdeice.experiencegained = mwdeice.makeElement('span', divEl, {'id':'mwdeice_experiencegained'});
  mwdeice.experiencegained.innerHTML='0';
  divEl.appendChild(document.createTextNode(' xp gained'));

  // Create Update button
  var clearStoreButton = mwdeice.makeElement('span', optionsEl, {'class':'sexy_button', 'style':'top: 10px; bottom: 10px;'});
  mwdeice.makeElement('button', clearStoreButton).appendChild(document.createTextNode('clear jobhelp state'));
  clearStoreButton.addEventListener('click', mwdeice.clearStore, false);

  // Create Update button
  var updateButton = mwdeice.makeElement('span', optionsEl, {'class':'sexy_button', 'style':'top: 10px; bottom: 10px;'});
  mwdeice.makeElement('button', updateButton).appendChild(document.createTextNode('Check for Updates'));
  updateButton.addEventListener('click', mwdeice.updateScript, false);

}

function mwdeice_onStatusareaClick() {
  if (statusArea.style.display=='none')
    mwdeice.show(statusArea);
  else 
    mwdeice.hide(statusArea);
}

function mwdeice_onOff_onclick() {
  mwdeice.setOpt(optionEls['onOff']);
}
function mwdeice_showJob_onclick(optId) {
  mwdeice.setOpt(optionEls[optId]);
}



/*******************************************************
 * void main(void) :-)
 *******************************************************/

/**
 * get things to roll
 * start stream listener, initially make a run through the posts
 */
if (!initialized) {
  if (!window.console) window.console={log:function(){}};
  mwdeice.checkUpgrade();
  initStatusArea();
  mwdeice.findSelfUID();
  mwdeice.loadStore();
  if (setListenContent(true)) {
    mwdeice.deClutter();
    var initialized = true;
  }
}


/**
 * Turns on/off the high-level event listener for the post stream
 */

function setListenContent(on) {
  homeStreamEl = mwdeice.get('home_stream');
  /*
  if (!homeStreamEl) {
    homeStreamEl = mwdeice.get('profile_minifeed');
  }
  */
  if (!homeStreamEl) {
    return false;
  }

  if (on) {
    homeStreamEl.addEventListener('DOMSubtreeModified', handleContentModified, false);
  } else {
    homeStreamEl.removeEventListener('DOMSubtreeModified', handleContentModified, false);
  }
  return true;
}

/**
 * delay our action until content had time to settle
 */
function handleContentModified(e) {
  if (modificationTimer) window.clearTimeout(modificationTimer);
  modificationTimer = window.setTimeout(handleTimerCb, 500);
}
function handleTimerCb() {
  try {
    mwdeice.deClutter();
  }
  catch(e) {};
}





