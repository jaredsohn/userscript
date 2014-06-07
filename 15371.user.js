// ==UserScript==
// @name          SoundDamagePlus
// @author        Indieana AKA interonaut, indieana@mailpuppy.com(edited by Chip103) 
// @namespace     http://www.myspace.com/interonaut
// @description   Enables easy artist discovery by adding similar artists, tags, short bio and last.fm & Myspace player to torrent details pages.
// @include       http*://www.waffles.fm/details.php*
// @include       http*://waffles.fm/details.php*
// @include       http*://85.17.216.13/details.php*
// @include       http://incegmbh.com/details.php*
// @include       http://what.cd/details.php*
// @include       http://www.what.cd/details.php*
// @include       http://85.17.216.12/details.php*
// @include       http://stmusic.org/details.php*
// @include       http://www.stmusic.org/details.php*
// @include       http://85.17.105.5/details.php*
// @include       http://www.libble.com/details.php*
// @include       http://libble.com/details.php*
// @include       http://66.196.43.12/details.php*
// @include       http://www.funkytorrents.com/details.php*
// @include       http://funkytorrents.com/details.php*
// @include       http://89.208.33.24/details.php*
// @include       http://www.mininova.org/tor/*
// @include       http://mininova.org/tor/*
// @include       http://87.233.147.140/tor/*
// @include       http://thepiratebay.org/tor/*
// @include       http://83.140.176.146/tor/*
// @include       http://www.sounddamage.com/details.php*
// @include       http://sounddamage.com/details.php*
// @include       http://89.248.162.226/details.php*
// @date          2007/11/08
// @version       3
// @since         2007/04/25
// ==/UserScript==
// 
// ------------------------------------------------------------------------
// Copyright (c) 2007, indieana  AKA interonaut, indieana@mailpuppy.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// CHANGELOG
// 3  2007/11/08 	Second beta, the HyDrA Release
//			- add: support for various sites including Waffles.fm, What.cd, Stmusic.org, Libble.com, ThePirateBay.org, Mininova.org and FunkyTorrents.com,Sounddamage.com
//			- add: search bar to lookup artist with Oinkplus
//			- add: new browsing capabilities by navigating deep into similar artists (browsing history)
//			- add: new external links to Hypemachine, SeeqPod, RIAA Radar and Pandora
// 			- fix: avoid sending referer for flash content and artist logo
// 							Thanks and credits to Drew McLellan for Flash Satay and Marcus Granado for binary XHR [http://mgran.blogspot.com]
//			- fix: speed up by not loading unneccessary images and objects in fetched html,intepret code as plain text instead	
//			- fix: remove script tags or embedded stuff in abstracts, less ressource consuming and better security
//			- fix: small toggle icons are now hard-coded base64 encoded data streams
//			- fix: abstracts now showing up again
//			- fix: don't show Oinkplus in Apps etc.
//			- fix: smaller bugfixes and code improvements	
// 2	2007/06/03	Beta test ended, first stable version
//				minor bugfixes, added display toggle
//				added more external links
// 1	2007/04/25	Original version - beta
//
// This script is for use with several torrent trackers
// It adds information to torrent details pages.
// ------------------------------------------------------------------------
//
// FEATURES
// - data from last.fm
// 	similar artists, 
// 	tags, 
// 	short bio, 
// 	preview player
// 
// - data from Myspace.com
// 	preview player 
// 
// - links to external ressources
// 	last.fm, myspace, imeem, foxytunes, allmusic, wikipedia, discogs, google, amazon
// 	
// ------------------------------------------------------------------------
// 
// IMPORTANT NOTICE
// The script does not and will not do automatic searches on the site it runs on, 
// because it is very harmful to the site's performance. If you had the 
// great idea of implementing such a feature you are STRONGLY advised not to do so.
// OiNKPlus is not related to the supported sites in any way. Use at own risk.
// Some functions were created by the Platypus extension.
// The script may frequently break, therefore it will automatically check for updated 
// versions every now and then.
// The author does not claim the code to be elegant. Ok? Fine.
// Suggestions, feedback and contributions welcome.
//
//
// FUTURE DEVELOPMENT
// If you would like to see this script to work with another site not supported yet,
// like another public or private tracker, get in contact with me (indieana@mailpuppy.com), 
// I will gladly port it to that site. Please remind, that I need to be invited, if 
// the site is private, though.
// Please abadon from simple tinkering to make it work with other sites, in case you 
// don't want to seriously maintain the script. This rushing ahead attitude has shown to 
// result in a lot of confusion among users and unsupported or even buggy code in the past.
// On the other hand, the GPL license gives you all the freedom, for example if you seriously want
// to further develop the script. Please let me know, I would love that and I'm curious!
//
//
// CREDITS
// * My greatest respect goes to oinkylicious Alan, for selflessly driving the amazing
// community that OiNK was. His excellent vision and talent of leadership have impressed
// and motivated me eversince I have been a proud member of the site. It was for his
// generous front paging to get the word about Oinkplus spread and opening it up to
// a broader audience.
// * Many thanks go also out to the fellow OiNKers, that provided suggestions, bug fixes,
// spread the word or even went as far as porting the script to other browsers. Thanks go to
// Eighty, ar33ome3, )deckstream(, evilman, lhnz, the_e_male among all the other dedicated users
// that found very nice words and placed themselves in a 1000 replies O+ thread :)
// * Thanks to the codemonkeys, that open up their code, especially those,
// that code/libraries the script makes use of. The is remarked in the code. 
// * Love is sent out to the wonderful people over at Last.fm that provide the excellent, reliable
// webservice, this script relies on. Sign up for their great subscription service!
// * At last lovely greetings go out to everyone supporting the hydra!
//
// Enough pathos,
// have fun!
//
// ------------------------------------------------------------------------
// Developed under Kubuntu Linux, Kate
// ------------------------------------------------------------------------


(function(){function bn(){var Prototype={Version:'1.4.0',ScriptFragment:'(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)',emptyFunction:function(){},K:function(x){return x}};var $break=new Object();var $continue=new Object();Object.extend=function(destination,source){for(property in source){destination[property]=source[property];}return destination;};var Enumerable={each:function(iterator){var index=0;try{this._each(function(value){try{iterator(value,index++);}catch(e){if(e!=$continue)throw e;}});}catch(e){if(e!=$break)throw e;}},all:function(iterator){var result=true;this.each(function(value,index){result=result&& ! !(iterator||Prototype.K)(value,index);if(!result)throw $break;});return result;},any:function(iterator){var result=true;this.each(function(value,index){if(result= ! !(iterator||Prototype.K)(value,index))throw $break;});return result;},collect:function(iterator){var results=[];this.each(function(value,index){results.push(iterator(value,index));});return results;},detect:function(iterator){var result;this.each(function(value,index){if(iterator(value,index)){result=value;throw $break;}});return result;},findAll:function(iterator){var results=[];this.each(function(value,index){if(iterator(value,index))results.push(value);});return results;},grep:function(pattern,iterator){var results=[];this.each(function(value,index){var stringValue=value.toString();if(stringValue.match(pattern))results.push((iterator||Prototype.K)(value,index));});return results;},include:function(object){var found=false;this.each(function(value){if(value==object){found=true;throw $break;}});return found;},inject:function(memo,iterator){this.each(function(value,index){memo=iterator(memo,value,index);});return memo;},invoke:function(method){var args=$A(arguments).slice(1);return this.collect(function(value){return value[method].apply(value,args);});},max:function(iterator){var result;this.each(function(value,index){value=(iterator||Prototype.K)(value,index);if(value>=(result||value))result=value;});return result;},min:function(iterator){var result;this.each(function(value,index){value=(iterator||Prototype.K)(value,index);if(value<=(result||value))result=value;});return result;},partition:function(iterator){var trues=[],falses=[];this.each(function(value,index){((iterator||Prototype.K)(value,index)?trues:falses).push(value);});return[trues,falses];},pluck:function(property){var results=[];this.each(function(value,index){results.push(value[property]);});return results;},reject:function(iterator){var results=[];this.each(function(value,index){if(!iterator(value,index))results.push(value);});return results;},sortBy:function(iterator){return this.collect(function(value,index){return{value:value,criteria:iterator(value,index)};}).sort(function(left,right){var a=left.criteria,b=right.criteria;return a<b? -1:a>b?1:0;}).pluck('value');},toArray:function(){return this.collect(Prototype.K);},zip:function(){var iterator=Prototype.K,args=$A(arguments);if(typeof args.last()=='function')iterator=args.pop();var collections=[this].concat(args).map($A);return this.map(function(value,index){iterator(value=collections.pluck(index));return value;});},inspect:function(){return '#<Enumerable:'+this.toArray().inspect()+'>';}};Object.extend(Array.prototype,Enumerable);Array.prototype._reverse=Array.prototype.reverse;Object.extend(Array.prototype,{_each:function(iterator){for(var i=0;i<this.length;i++)iterator(this[i]);},clear:function(){this.length=0;return this;},first:function(){return this[0];},last:function(){return this[this.length-1];},compact:function(){return this.select(function(value){return value!=undefined||value!=null;});},flatten:function(){return this.inject([],function(array,value){return array.concat(value.constructor==Array?value.flatten():[value]);});},without:function(){var values=$A(arguments);return this.select(function(value){return!values.include(value);});},indexOf:function(object){for(var i=0;i<this.length;i++)if(this[i]==object)return i;return-1;},reverse:function(inline){return(inline!==false?this:this.toArray())._reverse();},shift:function(){var result=this[0];for(var i=0;i<this.length-1;i++)this[i]=this[i+1];this.length--;return result;},inspect:function(){return '['+this.map(Object.inspect).join(', ')+']';}});j={observers:new Array(),addObserver:function(observer,sender){sender=sender||null;this.removeObserver(observer);this.observers.push({observer:observer,sender:sender});},removeObserver:function(observer){this.observers=this.observers.reject(function(o){return o.observer==observer});},send:function(sender,eventName,options){options=options||null;this.observers.each(function(o){if((o.sender==null||o.sender==sender)&&o.observer[eventName])o.observer[eventName](sender,options);});}};function deserialize(name,def){return eval(GM_getValue(name,(def||'({})')));};function serialize(name,val){GM_setValue(name,uneval(val));};var CachePriority={Low:1,Normal:2,High:4};function Cache(maxSize){this.items=deserialize(ae);this.count=0;if(maxSize==null)maxSize= -1;this.maxSize=maxSize;this.fillFactor=.75;this.purgeSize=Math.round(this.maxSize*this.fillFactor);this.stats={};this.stats.hits=0;this.stats.misses=0;};Cache.prototype.getItem=function(key){var item=this.items[key];if(item!=null){if(!this._isExpired(item)){item.lastAccessed=new Date().getTime();}else{this._removeItem(key);item=null;}}var returnVal=null;if(item!=null){returnVal=item.value;this.stats.hits++;}else{this.stats.misses++;}return returnVal;};Cache.prototype.setItem=function(key,value,options){function CacheItem(k,v,o){if((k==null)||(k==''))throw new Error("key cannot be null or empty");this.key=k;this.value=v;if(o==null)o={};if(o.expirationAbsolute!=null)o.expirationAbsolute=o.expirationAbsolute.getTime();if(o.priority==null)o.priority=CachePriority.Normal;this.options=o;this.lastAccessed=new Date().getTime();};if(this.items[key]!=null)this._removeItem(key);this._addItem(new CacheItem(key,value,options));if((this.maxSize>0)&&(this.count>this.maxSize)){this._purge();}};Cache.prototype.clear=function(){for(var key in this.items){this._removeItem(key);}};Cache.prototype._purge=function(){var tmparray=new Array();for(var key in this.items){var item=this.items[key];if(this._isExpired(item)){this._removeItem(key);}else{tmparray.push(item);}}if(tmparray.length>this.purgeSize){tmparray=tmparray.sort(function(a,b){if(a.options.priority!=b.options.priority){return b.options.priority-a.options.priority;}else{return b.lastAccessed-a.lastAccessed;}});while(tmparray.length>this.purgeSize){var ritem=tmparray.pop();this._removeItem(ritem.key);}}};Cache.prototype._addItem=function(item){this.items[item.key]=item;this.count++;serialize(ae,this.items);};Cache.prototype._removeItem=function(key){var item=this.items[key];delete this.items[key];this.count--;serialize(ae,this.items);if(item.options.callback!=null){var callback=function(){item.options.callback(item.key,item.value);};setTimeout(callback,0);}};Cache.prototype._isExpired=function(item){var now=new Date().getTime();var expired=false;if((item.options.expirationAbsolute)&&(item.options.expirationAbsolute<now)){expired=true;}if((expired==false)&&(item.options.expirationSliding)){var lastAccess=item.lastAccessed+(item.options.expirationSliding*1000);if(lastAccess<now){expired=true;}}return expired;};Cache.prototype.toHtmlString=function(){var returnStr=this.count+" item(s) in cache<br /><ul>";for(var key in this.items){var item=this.items[key];returnStr=returnStr+"<li>"+item.key.toString()+" = "+item.value.toString()+"</li>";}returnStr=returnStr+"</ul>";return returnStr;};var aS=3;var ae="OINKPLUS_CACHE";var aU=75;var M_RE=0;var R_STRING=1;var bi=0;var bj=1;var ap=2;var C=2;var be=5;var aj=25;var aa=450;var bd=0;var LOADING=1;var LOADED=2;var aZ=3;var aY=4;var A=true;var m=false;var ac=10000;var bc=".OinkPlus {max-width:700px}\
				 .explore  { text-decoration:none; } \
				.floatright { border: solid #000000 0px;float:right;margin:0pt 0pt 10px 10px;padding:2px;text-align: right;} 	\
				.floatleft { border: solid #000000 0px;float:left;text-align: left; width:140px; } \
				.floatmiddle { border: solid #000000 0px;text-align: left; margin-left:140px;} ";var BASIC_LAYOUT="<div id=\"Oinkplus\" class=\"OinkPlus\">\
												<div class=\"floatleft\"> \
													<h2><div id=\"ArtistName\"></div></h2><br>		\
													<div id=\"toggleLastFMSimilar\"></div>&nbsp;<b>Similar artists:</b><br>				\
													<div id=\"LastFMSimilar\"></div> 		\
													<br> \
													<div id=\"toggleHistory\"></div>&nbsp;<b>Browsing History:</b><br>				\
													<div id=\"History\"></div> 		\
												</div><br>										\
												<div id=\"artistinfo\" class=\"floatmiddle\">					\
													<div class=\"floatright\">	\
														<div id=\"ArtistSearchField\"></div><br>					\
														<div id=\"ArtistImage\"></div>			\
													</div>															\
													<div id=\"ArtistTitle\"></div><br>				\
													<b>Tags:</b>						\
													<div id=\"LastFMTags\"></div><br>				\
													<div id=\"toggleLastFMBio\"></div>&nbsp;<b>Abstract:</b><br>							\
													<div id=\"LastFMBio\"></div><br>				\		\
													<div id=\"toggleLastFMPlayer\"></div>&nbsp;<b>Last.fm Player:</b><br>				\
													<div id=\"LastFMPlayer\"></div><br>					\
													<div id=\"toggleMySpacePlayer\"></div>&nbsp;<b>Myspace Player:</b><br>				\
													<div id=\"MySpacePlayer\"></div><br>					\
													<!--<div id=\"toggleLastFMAlbum\"></div>&nbsp;<b>Albums:</b><br>				\
													<div id=\"LastFMAlbums\"></div><br>--!>					\
													<b>External links:</b><br>						\
													<div id=\"ExternalLinks\"></div>\
													<div id=\"HydraLinks\"></div><br>\
												</div>							\
												<div id=\"UpdateNotify\" class=\"leftinfo\"></div>			\
											</div>";var NAME="OiNKPlus";var H="<a href=\"%s\">A <font color=\"red\">new version</font> of "+NAME+" is available.</a>";var V="http://www.naptoon.com/oinkplus/oinkplus.xml";var am="http://www.last.fm/music/%s";var REDIR="http://anonym.to/?";var aP="<a href=\""+REDIR+"http://www.last.fm/music/%s\">Last.fm</a>";var aw="<a href=\""+REDIR+"http://www.last.fm/music/%s/%2bwiki\">read more</a>";var ao="http://www.google.com/search?&q=site:www.myspace.com+%22%s%22&btnI";var aL="<a href=\""+REDIR+ao+"\">Myspace</a>";var au="http://ws.audioscrobbler.com/1.0/artist/%s/toptags.xml";var ak="http://ws.audioscrobbler.com/1.0/artist/%s/similar.xml";var bb="http://ws.audioscrobbler.com/1.0/artist/%s/topalbums.xml";var aB=REDIR+"http://www.google.com/search?&q=site:en.wikipedia.org+intitle:%22%s - %22&btnI";var az="<a href=\""+aB+"\">Wikipedia</a>";var aH=REDIR+"http://www.google.com/search?&q=site:www.allmusic.com+intitle:%22%s > %22+intitle:%22Overview%22&btnI";var aE="<a href=\""+aH+"\">Allmusic</a>";var aD=REDIR+"http://www.foxytunes.com/artist/%s";var ay="<a href=\""+aD+"\">Foxytunes</a>";var ba=REDIR+"http://www.imeem.com/tag/?q=%s&f=music";var aW="<a href=\""+ba+"\">Imeem</a>";var aO=REDIR+"http://www.discogs.com/artist/%s";var aK="<a href=\""+aO+"\">Discogs</a>";var aX=REDIR+"http://www.google.com/search?&q=%22%s%22";var aM="<a href=\""+aX+"\">Google</a>";var aV="http://www.amazon.com/gp/search?ie=UTF8&keywords=%22%s%22&index=music&linkCode=ur2&camp=1789&creative=9325";var aN="<a href=\""+aV+"\">Amazon</a>";var at=REDIR+"http://hypem.com/search/%s/1/";var aq="<a href=\""+at+"\">HypeMachine</a>";var aR=REDIR+"http://www.seeqpod.com/music/?query=%s&query_unused=&command=q";var aI="<a href=\""+aR+"\">SeeqPod</a>";var aQ=REDIR+"http://www.pandora.com/music/artist/%s";var aJ="<a href=\""+aQ+"\">Pandora</a>";var aC=REDIR+"http://www.riaaradar.com/search.asp?searchtype=ArtistSearch&keyword=%s";var ax="<a href=\""+aC+"\">RIAA Radar</a>";var al="More from <b><a href=\"/browse.php?search=%s\">%s</a> (<a href=\"/similarsearch.php?artist=%s\">similar</a>)</b> on OiNK";var Y="data:image/gif;base64,R0lGODlhCQAJAIAAAOLn7UtjfCwAAAAACQAJAAACEYyPoAu28aCSDSJLc44s3lMAADs%3D";var T="data:image/gif;base64,R0lGODlhCQAJAIAAAOLn7UtjfCwAAAAACQAJAAACEIyPoAvG614L80x5ZXyohwIAOw%3D%3D";var SPINNER_IMG="data:image/gif;base64,R0lGODlhEAAQAPMAAP%2F%2F%2FwAAAAAAAIKCgnJycqioqLy8vM7Ozt7e3pSUlOjo6GhoaAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAEKxDISau9OE%2FBu%2F%2FcQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv%2FXJEMxIFg4VieV0qaqCC%2BrOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2F9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo%2BUCAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BcghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2FnKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2FxymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEJhDISau9OE%2FBu%2F%2BcthBDEmZjeWKpKYikC6svGq9XC%2B6e5v%2FAICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2Fxy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BctRBDUhgHElZjeaYr1ZqoKogkDd9s%2Fto4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2F3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA%3D";var aT="data:image/gif;base64,R0lGODlhDgAOANUAAPr6%2Bri4uPLy8vz8%2FMbGxtjY2Pf3997e3vv7%2B9bW1rq6utPT07u7u7S0tLKystzc3NDQ0MPDw7CwsO%2Fv783NzczMzNTU1PT09NXV1ezs7LW1tc%2FPz7Ozs%2FPz86mpqevr6%2Fb29v39%2Fbm5uf7%2B%2Fqampv%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAOAA4AAAZvwJJwSCwOB6GRcmm0MDwMzMVYIpCuV0KnuCCJEp9EgLQoikgFA8BQ8I6IHlInVAp1SB768PwYPrwDRBAkCgcABwokFHpCGRFYWA4gRAgfGwEeARUOJA2TQiMIIAITAh0fDSQanyVvRAAfHBICVFRBADs%3D";var ag="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAOFJREFUOMvVUqFuw1AMvE7VpHxAQHDA0Da4gf5DUL4kLN%2FzWFDQAwNT2camRQMJHA0NsC9O3lCrri3oFtSTLFuWfD75vAohYAluFk1fH0FZli9FUdz%2Bm0BVNyLyddhbhRDgnAsAYGYwM5AESagqVBUiAlVFHMcgia7rPp1zjwCw3jGlaYp5njFN068ws5M8DMNDlmXvdV0%2FrQ837wiOh47rcRxBctwrMDM0TXNWtohARBBFEZIkQd%2F3aNv2w3u%2F2d%2FgEuR5%2FkzyleS39%2F7uzy5UVfVGcmtm9ycuLMGVvfI5%2FADcE8BIG7ekhwAAACJ6VFh0U29mdHdhcmUAAHjac0zJT0pV8MxNTE8NSk1MqQQAL5wF1K4MqU0AAAAASUVORK5CYII%3D";var bh=new Array(/http:\/\/oink\.me\.uk\/search\.php\?artist=(.*)/,'$1');var bg=new Array(/\/music\/(.*)\/\+wiki/,'http://www.last.fm/music/$1/+wiki');var bf=new Array(/\/music\/(.*)/,'http://www.last.fm/music/$1');var artist;var G="http://www.naptoon.com/oinkplus/c.swf";var ar="<object type=\"application/x-shockwave-flash\" data=\""+G+"\"  width=\"%WIDTH\" height=\"%HEIGHT\" ><param name=\"movie\" value=\""+G+"\"  quality=\"high\"/><param name=FlashVars value=\"path=%MOVIE\" /></object>";var cache=new Cache(aU);var ab=({whatcd:{name:"What.CD",url:{0:"http:\/\/incegmbh.com\/details.php*",1:"http:\/\/what.cd\/details.php*",2:"http:\/\/www.what.cd\/details.php*",3:"http://85.17.216.12/details.php*"},searchurl:"http://what.cd/browse.php?search=%s",css:"",version:"1",l:"var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(Apps|Comics|E-books|E-learning videos)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",af:"var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										new_row.firstChild.innerHTML = \"\"; \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",r:"var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
											return '';",B:"More from <b><a href=\"/browse.php?search=%s\">%s</a></b> on What.CD"},wafflesfm:{name:"Waffles",url:{0:"http:\/\/www.waffles.fm/details.php*",1:"http:\/\/85.17.216.13\/details.php*",2:"http:\/\/waffles.fm/details.php*",3:"https:\/\/www.waffles.fm/details.php*",4:"https:\/\/85.17.216.13\/details.php*",5:"https:\/\/waffles.fm/details.php*"},searchurl:"http://waffles.fm/browse.php?search=%s",css:"",version:"1",l:"return true;",af:"var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",r:"var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
											return '';",B:"More from <b><a href=\"/browse.php?search=%s\">%s</a></b> on Waffles"},stmusic:{name:"STMusic",url:{0:"http:\/\/www.stmusic.org/details.php*",1:"http:\/\/85.17.105.5\/details.php*",2:"http:\/\/stmusic.org/details.php*"},searchurl:"http://stmusic.org/browse.php?search=%s",css:"",version:"1",l:"var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(Videos)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",af:"var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",r:"var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split('-').length > 1) {  \
													return str.split('-')[0].replace(/^\\s+|\\s+$/g,\"\").replace(/_/g,\" \"); \
												} \
											} \
											return '';",B:"More from <b><a href=\"/browse.php?search=%s\">%s</a></b> on STMusic"},funkytorrents:{name:"FunkyTorrents",url:{0:"http:\/\/www.funkytorrents.com/details.php*",1:"http:\/\/89.208.33.24\/details.php*",2:"http:\/\/funkytorrents.com/details.php*"},searchurl:"http://funkytorrents.com/browse.php?search=%s",css:"",version:"1",l:"var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(Apps|Movie|eBooks|Music Vids)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",af:"var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",r:"var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split('-').length > 1) {  \
													return str.split('-')[0].replace(/^\\s+|\\s+$/g,\"\").replace(/_/g,\" \"); \
												} \
											} \
											return '';",B:"More from <b><a href=\"/browse.php?search=%s\">%s</a></b> on FunkyTorrents"},libble:{name:"Libble",url:{0:"http:\/\/www.libble.com/details.php*",1:"http:\/\/66.196.43.12\/details.php*",2:"http:\/\/libble.com/details.php*"},searchurl:"http://libble.com/browse.php?qs=%s&cat=0",css:"",version:"1",l:"return true;",af:"var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",r:"var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split('-').length > 1) {  \
													return str.split('-')[0].replace(/^\\s+|\\s+$/g,\"\").replace(/_/g,\" \"); \
												} \
											} \
											return '';",B:"More from <b><a href=\"/browse.php?qs=%s&cat=0\">%s</a></b> on Libble"},mininova:{name:"Mininova",url:{0:"http:\/\/www.mininova.org/tor/*",1:"http:\/\/mininova.org/tor/*",2:"http:\/\/87.233.147.140/tor/*"},searchurl:"http://mininova.org/search/%22%s%22/5/seeds",css:"",version:"1",l:"var hints = [\': Music &gt;\']; \
												 for (var i= 0; i< hints.length; i++)   \
													if (document.getElementsByTagName(\'title\')[0].innerHTML.indexOf(hints[i]) > 0) { \
															return true; \
													} \
													return false;",af:"			myDiv = document.createElement(\"div\"); \
										myHeadline = document.createElement(\"h2\");\
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										myHeadline.appendChild(toggleDiv);\
										myHeadline.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										myDiv.appendChild(myHeadline);\
										myDiv.appendChild(document.createElement('br')); \
										myNode = document.createElement(\"div\"); \
										myNode.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										myDiv.appendChild(myNode); \
										document.getElementById(\"content\").appendChild(document.createElement('br')); \
										document.getElementById(\"content\").appendChild(myDiv);",r:"var title = document.getElementsByTagName(\'title\')[0].innerHTML; \
											title = title.replace(' - Mininova', ''); \
											if (title.indexOf(\"-\") < 0 ) return null; \
											var myartist = title.replace(/\\[.*?\\]/g,\"\").replace(/_/g,' ').split(\"-\")[0]; \
											return myartist.replace(/(^( )*)|(( )*$)/g,\"\").replace(/[ ]{2,}/gi,\" \");",B:"More from <b><a href=\"/search/%22%s%22/5/seeds\">%s</a></b> on Mininova"},thepiratebay:{name:"ThePirateBay",url:{0:"http:\/\/thepiratebay.org/tor/*",1:"http:\/\/83.140.176.146/tor/*"},searchurl:"http://thepiratebay.org/search/%s/0/7/100",css:".artistHeadline {font-size: 12pt;}",version:"1",l:"var hints = [\'/browse/101\']; \
												 for (var i= 0; i< hints.length; i++)   \
													if (document.getElementById(\"details\").innerHTML.indexOf(hints[i]) > 0) { \
															return true; \
													} \
													return false;",af:"			myDiv = document.createElement(\"div\"); \
										myHeadline = document.createElement(\"h4\");\
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										myHeadline.appendChild(toggleDiv);\
										myHeadline.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										myDiv.appendChild(myHeadline);\
										myDiv.appendChild(document.createElement('br')); \
										myNode = document.createElement(\"div\"); \
										myNode.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										myDiv.appendChild(myNode); \
										document.getElementById(\"filelistContainer\").parentNode.insertBefore(myDiv, document.getElementById(\"filelistContainer\").nextSibling);",r:"var title = document.getElementById(\"title\").innerHTML; \
											if (title.indexOf(\"-\") < 0 ) return null; \
											var myartist = title.replace(/\\[.*?\\]/g,\"\").replace(/_/g,' ').split(\"-\")[0]; \
											return myartist.replace(/(^( )*)|(( )*$)/g,\"\").replace(/[ ]{2,}/gi,\" \");",B:"More from <b><a href=\"/search/%s/0/7/100\">%s</a></b> on ThePirateBay"}});var RessourceLoader={ressources:new Array(),index:0,callback:"",addRessource:function(res,save){save=save==false?false:true;this.ressources.push(res);window.setTimeout(function(){j.send(null,"removeOnTimeout",{ressource:res})},ac,false);},isRessourceLoading:function(res){for(var i=0,length=this.ressources.length;i<length;i++){if(res.url==this.ressources[i].url){return true;}}return false;},load:function(callback){this.callback=callback;this.loadRessource(this.ressources[this.index++]);},loadNext:function(){if(this.index<this.ressources.length)this.loadRessource(this.ressources[this.index++]);else this.callback();},loadRessource:function(res,res_type){if(!this.isRessourceLoading(res)){this.addRessource(res,true);if(!GM_getValue("ressource_"+res.url,"")){GM_xmlhttpRequest({method:'GET',overrideMimeType:"text/plain;"+((res_type==ap)?" charset=x-user-defined":""),url:res.url,onload:function(data){if(res.save)GM_setValue("ressource_"+res.url,data.responseText);RessourceLoader.announceLoad(res,data.responseText);}});}else{RessourceLoader.announceLoad(res,GM_getValue("ressource_"+res.url));}}else{}},announceLoad:function(res,data){this.ressources=this.ressources.reject(function(o){return(o.url==res.url);});j.send(null,"onRessourceLoaded",{ressource:res,content:data});},removeOnTimeout:function(sender,e){this.ressources=this.ressources.reject(function(o){return(o.url==e.ressource.url)});}};j.addObserver(RessourceLoader);function d(name,res,toggleable){this._name=name;this._ressource=res;this._toggleable=toggleable;this._state=bd;this._content='';this._scrapedObject;this._currentArtist='';this._contentNode;if(toggleable){var togglelink=document.createElement('a');if(this.isVisible())togglelink.innerHTML="<img src=\""+T+"\" border=0>";else{togglelink.innerHTML="<img src=\""+Y+"\" border=0>";this.hide();}togglelink.href='#';togglelink.id="toggle"+this._name;togglelink.addEventListener("click",function(e){j.send(null,"onToggle",{toggleId:this.id});e.preventDefault();},false);$("toggle"+this._name).parentNode.replaceChild(togglelink,$("toggle"+this._name));}j.addObserver(this);this.load();};d.prototype.getName=function(){return this._name;};d.prototype.onToggle=function(sender,e){if(e.toggleId=="toggle"+this._name){this.toggle();}};d.prototype.prepareRessourceUrl=function(artistname){};d.prototype.isVisible=function(){return(GM_getValue('visible'+this._name+'',1)==1);};d.prototype.isEnabled=function(){return(GM_getValue('enable'+this._name+'',1)==1);};d.prototype.Enable=function(){GM_setValue('enable'+this._name+'',1);};d.prototype.Disable=function(){GM_setValue('enable'+this._name+'',0);};d.prototype.toggle=function(){if(this.isVisible()){this.hide();$("toggle"+this._name).innerHTML="<img src=\""+Y+"\" border=0>";}else{this.show();$("toggle"+this._name).innerHTML="<img src=\""+T+"\" border=0>";}};d.prototype.hide=function(){$(this._name).style.display='none';GM_setValue('visible'+this._name+'',0);};d.prototype.show=function(){$(this._name).style.display='block';GM_setValue('visible'+this._name+'',1);this.render();};d.prototype.load=function(){this._state=LOADING;};d.prototype.onArtistChange=function(sender,e){if(sender!=this._name){this._state=LOADING;this.render();this._currentArtist=e.artistname;if(this._ressource!=null){var tempRessource={key:this._ressource.key,url:this._ressource.url,save:this._ressource.save,artistname:e.artistname};tempRessource.url=this.prepareRessourceUrl(e.artistname);var cachedContent=cache.getItem("cache_widget_"+this._name+"_"+this._currentArtist);if(cachedContent==null){RessourceLoader.loadRessource(tempRessource);}else{this._state=aZ;this._scrapedObject=cachedContent;this.c();this.render();}}else{this._state=LOADED;this._scrapedObject=cachedContent;this.c();this.render();}}};d.prototype.onRessourceLoaded=function(sender,e){if(this._ressource!=null&&this._ressource.key==e.ressource.key&&this._currentArtist==e.ressource.artistname){this._state=LOADED;this._content=e.content;this._scrapedObject=this.scraperImpl();cache.setItem("cache_widget_"+this._name+"_"+this._currentArtist,this._scrapedObject);this.c();this.render();}};d.prototype.render=function(){if(this._state==aZ||this._state==LOADED){if($(this._name).hasChildNodes()){$(this._name).replaceChild(this._contentNode,$(this._name).firstChild);}else $(this._name).appendChild(this._contentNode);}if(this._state==LOADING){$(this._name).innerHTML="<img src=\""+SPINNER_IMG+"\" border=0>";}if(this._state==aY){$(this._name).innerHTML="n/a";}};d.prototype.c=function(){var node=document.createElement("div");node.innerHTML=this._scrapedObject;this._contentNode=node;};function a(artist){j.send("global","onArtistChange",{artistname:artist,albumname:null});};function bl(artist){an=null;J=new d("OiNKPlus",an,A);J.c=function(){tempContent=BASIC_LAYOUT;var node=document.createElement("div");node.innerHTML=tempContent;this._contentNode=node;};J.onArtistChange=function(){};J.c();J._state=LOADED;J.render();ah=null;t=new d("ArtistName",ah,m);t.c=function(){var myLink=document.createElement('a');myLink.innerHTML=this._currentArtist;myLink.id=this._currentArtist;myLink.href='#';myLink.addEventListener("click",function(e){j.send("LastFMSimilar","onArtistChange",{artistname:this.id,albumname:null});e.preventDefault();},false);this._contentNode=myLink;};t.onArtistChange=function(sender,e){if(sender=="global"){this._currentArtist=e.artistname;this.c();this._state=LOADED;this.render();}};t._currentArtist=artist;t.c();t._state=LOADED;t.render();ad=null;aF=new d("ArtistTitle",ad,m);aF.c=function(){artistHeadline=document.createElement("h1");artistHeadline.className="artistHeadline";artistHeadline.appendChild(document.createTextNode(this._currentArtist+" "));var myLink=document.createElement('a');myLink.innerHTML="<img src=\""+ag+"\" border=0>";myLink.id=this._currentArtist;myLink.href='#';myLink.className="explore";myLink.addEventListener("click",function(e){j.send("global","onArtistChange",{artistname:this.id,albumname:null});e.preventDefault();},false);artistHeadline.appendChild(myLink);tempContent=al.replace(/%s/,this._currentArtist.replace(/&/g,'%26')).replace(/%s/,this._currentArtist).replace(/%s/,this._currentArtist.replace(/&/g,'%26'))+'<br>';var moreNode=document.createElement("div");moreNode.innerHTML=tempContent;var node=document.createElement("div");node.appendChild(artistHeadline);node.appendChild(moreNode);this._contentNode=node;};P=null;L=new d("ArtistSearchField",P,m);L.c=function(){logmsg('ArtistSearchField');var searchField=document.createElement("input");searchField.value='type artist name here';var baseStyle='background:#FFFFFF url('+aT+') no-repeat scroll left center; border:1px solid #7E1325; font-size:11px;padding:1px 4px 2px 16px;width:162px;';searchField.setAttribute('style',baseStyle+'color:grey');searchField.addEventListener("click",function(e){if(this.value=='type artist name here'){this.value='';searchField.setAttribute('style',baseStyle);}},false);searchField.addEventListener("keypress",function(e){if(e.keyCode==13)j.send("global","onArtistChange",{artistname:this.value.replace(/^\s+|\s+$/g,""),albumname:null})},false);var node=document.createElement("div");node.style.textAlign="right";node.appendChild(searchField);this._contentNode=node;};L.onArtistChange(null,{artistname:null,albumname:null});n={key:"LastFMArtistPage",url:am,save:false};D=new d("ArtistImage",n,m);D.prepareRessourceUrl=function(artistname){return this._ressource.url.replace(/%s/,artistname.replace(/&/g,'%2526').replace(/\//g,'%252F').replace(/\?/,"%3F"));};D.scraperImpl=function(){return "<img src=\""+buildDataScheme(this._content,'data:image/jpeg;base64,')+"\" border=1>";};D.onRessourceLoaded=function(sender,e){if(this._ressource!=null&&e.ressource.key=='LastFMArtistPage'&&this._currentArtist==e.ressource.artistname){var imgUrl=e.content.extract("<div class=\"imgHolder\">","</div>").replace(/.*src=\"(.*)\" alt=.*/,'$1');if(imgUrl.search(/^http/)>=0){X={key:"LastFMArtistImage",url:imgUrl,save:false,artistname:e.ressource.artistname};RessourceLoader.loadRessource(X,ap);}else{this._state=aY;this.render();}}if(this._ressource!=null&&e.ressource.key=='LastFMArtistImage'&&this._currentArtist==e.ressource.artistname){this._state=LOADED;this._content=e.content;this._scrapedObject=this.scraperImpl();cache.setItem("cache_widget_"+this._name+"_"+this._currentArtist,this._scrapedObject);this.c();this.render();}};aA=new d("LastFMBio",n,A);aA.prepareRessourceUrl=function(artistname){return this._ressource.url.replace(/%s/,artistname.replace(/&/g,'%2526').replace(/\//g,'%252F').replace(/\?/,"%3F"));};aA.scraperImpl=function(){cleanedBio=basicClean(this._content.extract("<div id=\"wikiAbstract\">","</div>"));return cleanedBio;};aA.c=function(){var node=document.createElement("div");node.innerHTML=this._scrapedObject;encodedArtistName=this._currentArtist.replace(/&/g,'%252526').replace(/\//g,'%25252F').replace(/\?/,"%25253F");textContent=node.textContent;var maxLength=450;if(textContent.length>aa){logmsg('bio longer than maximum length');textContent=textContent.replace(/\(read more\)/,"");sentences=textContent.split(".");var out="";logmsg('got '+sentences.length+' sentences');for(i=0;out.length<aa&&i<sentences.length;i++){out+=sentences[i]+".";}textContent=out+new String(" (read more)");}textContent=textContent.replace(/read more/,aw.replace(/%s/,encodedArtistName));node.innerHTML=textContent;this._contentNode=node;};av=new d("LastFMPlayer",n,A);av.prepareRessourceUrl=function(artistname){return this._ressource.url.replace(/%s/,artistname.replace(/&/g,'%2526').replace(/\//g,'%252F').replace(/\?/,"%3F"));};av.scraperImpl=function(){var lfmPlayerCode=this._content.extract("<div id=\"flashContainer\">","</div>").extract("<object","</object>");if(lfmPlayerCode!=''){var movieUrl=lfmPlayerCode.extractInner("src=\"","\"\n ");var flashVars=lfmPlayerCode.extractInner("FlashVars = \"","\"\n ");return getFlashContainerCode(340,103,movieUrl+'?flashvars='+encodeURIComponent(flashVars));}else return 'n/a';};O={key:"LastFMTagsWebservice",url:au,save:false};aG=new d("LastFMTags",O,m);aG.prepareRessourceUrl=function(artistname){return this._ressource.url.replace(/%s/,artistname.replace(/&/g,'%2526').replace(/\//g,'%252F').replace(/\?/,"%3F"));};aG.scraperImpl=function(){var parser=new DOMParser();result=parser.parseFromString(this._content,"application/xml");var entries=result.getElementsByTagName('tag');var arr=[];for(var i=0;i<be&&i<entries.length;i++)arr.push(entries[i].getElementsByTagName('name')[0].textContent);var text=arr.join(', ')+'';return text;};F={key:"LastFMSimilarWebservice",url:ak,save:false};Z=new d("LastFMSimilar",F,A);Z.prepareRessourceUrl=function(artistname){return this._ressource.url.replace(/%s/,artistname.replace(/&/g,'%2526').replace(/\//g,'%252F').replace(/\?/,"%3F"));};Z.scraperImpl=function(){var parser=new DOMParser();result=parser.parseFromString(this._content,"application/xml");var entries=result.getElementsByTagName('artist');var arr=[];for(var i=0;i<aj&&i<entries.length;i++){arr.push(entries[i].getElementsByTagName('name')[0].textContent);}return arr;};Z.c=function(){var node=document.createElement("div");for(var i=0;i<this._scrapedObject.length;i++){var artistname=this._scrapedObject[i];var artistlink=document.createElement('a');artistlink.innerHTML=artistname;artistlink.href='#';artistlink.id=artistname;artistlink.addEventListener("click",function(e){j.send("LastFMSimilar","onArtistChange",{artistname:this.id,albumname:null});e.preventDefault();},false);node.appendChild(artistlink);node.appendChild(document.createElement("br"));}this._contentNode=node;};U=null;R=new d("History",U,A);R.onArtistChange=function(sender,e){if(sender=="global"){this._currentArtist=e.artistname;this._state=LOADED;this.c();this.render();}};R.c=function(){if(this._scrapedObject==null){logmsg('scraped Object null');this._scrapedObject=new Array();}logmsg('got artist: '+this._currentArtist);if(!this._scrapedObject.include(this._currentArtist))this._scrapedObject.push(this._currentArtist);var node=document.createElement("div");for(var i=0;i<this._scrapedObject.length;i++){var artistname=this._scrapedObject[i];var artistlink=document.createElement('a');artistlink.innerHTML=artistname;artistlink.href='#';artistlink.id=artistname;artistlink.addEventListener("click",function(e){j.send("global","onArtistChange",{artistname:this.id,albumname:null});e.preventDefault();},false);node.appendChild(artistlink);node.appendChild(document.createElement("br"));}this._contentNode=node;this._cachedContent=this._scrapedObject;};MSPArtistPageRessource={key:"MySpaceArtistPage",url:ao,save:false};as=new d("MySpacePlayer",MSPArtistPageRessource,A);as.prepareRessourceUrl=function(artistname){return this._ressource.url.replace(/%s/,artistname.replace(/&/g,'%26').replace(/\?/,"%3F"));};as.scraperImpl=function(){var mspPlayerCode=this._content.extract("<OBJECT id=\"mp3player","</OBJECT>").extract("<embed","</embed>");if(mspPlayerCode!=''){mspPlayerCode=mspPlayerCode.replace(/&a=0/g,"&a=1");var movieUrl=mspPlayerCode.extractInner("src=\"","?n=");var flashVars=mspPlayerCode.extractInner("?n=","\"");return getFlashContainerCode(450,345,movieUrl+'?n='+encodeURIComponent(flashVars));}else return 'n/a';};ExternalLinksRessource=null;I=new d("ExternalLinks",ExternalLinksRessource,m);I.prepareRessourceUrl=function(artistname){};I.c=function(){var arr=[];var artist=this._currentArtist;arr.push(this.g(artist,aP).replace(/%26/g,'%252526').replace(/%2F/g,'%25252F'));arr.push(this.g(artist,az).replace(/%26/g,'%2526'));arr.push(this.g(artist,aE).replace(/%26/g,'%2526'));arr.push(this.g(artist,ay).replace(/%2F/g,'%252F').replace(/%26/g,'%2526'));arr.push(this.g(artist,aW).replace(/%26/g,'%2526'));arr.push(this.g(artist.replace(/^(The) (.*)/,'$2, $1'),aK).replace(/%26/g,'%2526'));arr.push(this.g(artist,aM).replace(/%26/g,'%2526'));arr.push(this.g(artist,aN));arr.push(this.g(artist,aL).replace(/%26/g,'%2526'));arr.push(this.g(artist,aq).replace(/%26/g,'%252526'));arr.push(this.g(artist,aI).replace(/%26/g,'%252526').replace(/%2F/g,'%252F'));arr.push(this.g(artist,aJ).replace(/%26/g,'%252526').replace(/%2F/g,'%252F'));arr.push(this.g(artist,ax).replace(/%26/g,'%252526').replace(/%2F/g,'%252F'));var node=document.createElement("div");node.innerHTML=arr.join(' | ')+'';this._contentNode=node;};I.g=function(artist,mylink){return mylink.replace(/%s/,encodeURIComponent(artist.replace(/\?/,"%3F")));};ai=null;wHydraLinks=new d("HydraLinks",ai,m);wHydraLinks.prepareRessourceUrl=function(artistname){};wHydraLinks.c=function(){var arr=[];var artist=this._currentArtist;SITES=ab;for(var sitename in SITES){w=SITES[sitename];searchurl=w["searchurl"];name=w["name"];arr.push(this.g(artist,searchurl,name));}var node=document.createElement("div");node.innerHTML=arr.join(' | ')+'';this._contentNode=node;};wHydraLinks.g=function(artist,mylink,name){return '<a href="'+mylink.replace(/%s/,encodeURIComponent(artist.replace(/\?/,"%3F")))+'" target="_blank">'+name+'</a>';};UpdateServiceRessource={key:"UpdateService",url:V,save:false};M=new d("UpdateNotify",UpdateServiceRessource,m);M.prepareRessourceUrl=function(artistname){var rnd=Math.random();return this._ressource.url+"?rnd="+rnd;};M.onArtistChange=function(sender,e){this._state=LOADING;this.render();this._currentArtist=null;var tempRessource={key:this._ressource.key,url:this._ressource.url,save:this._ressource.save,artistname:null};tempRessource.url=this.prepareRessourceUrl(null);if(GM_getValue('latestversion',0)>aS){logmsg('newer latest version available');this._state=LOADED;this._scrapedObject=H.replace(/%s/,GM_getValue('latestversionurl'));this.c();this.render();}else{logmsg('no newer vesion available');this._state=LOADED;this._scrapedObject="";this.c();this.render();}var date=new Date();currentTime=Math.round(date.getTime()/(1000*60*60));lastcheckTime=GM_getValue('lastcheck',0);if((currentTime-lastcheckTime)>C){logmsg('loading UpdateNotify Ressource');RessourceLoader.loadRessource(tempRessource);GM_setValue('lastcheck',currentTime);}logmsg('cT: '+currentTime);logmsg('lastcT: '+lastcheckTime);logmsg((currentTime-lastcheckTime)+" > "+C);};M.scraperImpl=function(){var parser=new DOMParser();result=parser.parseFromString(this._content,"application/xml");var date=new Date();currentTime=Math.round(date.getTime()/(1000*60*60));GM_setValue('lastcheck',currentTime);var releases=result.getElementsByTagName('release');var latest_version=releases[0].getAttribute('version');var latest_version_url=releases[0].getElementsByTagName('url')[0].textContent;GM_setValue('latestversion',latest_version);GM_setValue('latestversionurl',latest_version_url);logmsg('latesversion: '+latest_version);if(latest_version>aS){logmsg('received information of newer version');return H.replace(/%s/,GM_getValue('latestversionurl'));}logmsg('received information of up to date version');return "";};};function $(){var elements=new Array();for(var i=0;i<arguments.length;i++){var element=arguments[i];if(typeof element=='string')element=document.getElementById(element);if(arguments.length==1)return element;elements.push(element);}return elements;}function basicClean(myString){do{oldstring=myString;var regexp0=new RegExp("<script[^>]*>[^<]*<\/script>","gi");var regexp1=new RegExp("<span class=\"wiki_continued\".*","i");var regexp2=new RegExp("<object[^>]*>.*<\/object>","i");myString=myString.replace(regexp0,"");myString=myString.replace(regexp1,"");myString=myString.replace(regexp2,"");}while(oldstring!=myString);return myString;};function translateToBinaryString(text){var out='';for(i=0;i<text.length;i++){out+=String.fromCharCode(text.charCodeAt(i)&0xff);}return out;};function buildDataScheme(responseText,dataScheme){var stream=translateToBinaryString(responseText);dataScheme+=window.btoa(stream);return dataScheme};String.prototype.extract=function(startString,endString){var start=this.indexOf(startString);if(start== -1){return '';}var choppedContent=this.substr(start);var end=choppedContent.indexOf(endString);if(end== -1){return '';}var extractedContent=choppedContent.substring(0,end+endString.length);if(extractedContent.length>0)return extractedContent;else return '';};String.prototype.extractInner=function(startString,endString){var outerContent=this.extract(startString,endString);if(outerContent!='')var innerContent=outerContent.substring(startString.length,outerContent.length-endString.length);else return '';return innerContent;};function getFlashContainerCode(width,height,movieUrl){return ar.replace('%WIDTH',width).replace('%HEIGHT',height).replace('%MOVIE',movieUrl);};function notifyUpdate(){$("updatenotify").innerHTML=H.replace(/%s/,GM_getValue('latestversionurl'));;};function modify_single_url(doc,match_re,replace_string,node){if(node.href)node.href=node.href.replace(match_re,replace_string);};function do_modify_url_it(doc,node,match_re,replace_string,global_flag){match_re=new RegExp(match_re);if(global_flag){var allurls=doc.getElementsByTagName('A');for(var i=0,url;url=allurls[i];i++)modify_single_url(doc,match_re,replace_string,url);}else modify_single_url(doc,match_re,replace_string,node);};function insertAfter(newNode,target){var parent=target.parentNode;var refChild=target.nextSibling;if(refChild!=null)parent.insertBefore(newNode,refChild);else parent.appendChild(newNode);};function find_table(){var tds=document.getElementsByTagName("td");for(var i=0;i<tds.length;i++)if(tds[i].className=="rowhead")return tds[i].parentNode.parentNode;};function bo(doc,node,match_re,replace_string){match_re=new RegExp(match_re);if(node!=null)return node.innerHTML.replace(match_re,replace_string);else return null;};function addGlobalStyle(css){var head,style;head=document.getElementsByTagName('head')[0];if(!head)return;style=document.createElement('style');style.type='text/css';style.innerHTML=css;head.appendChild(style);};var DEBUG=false;function logmsg(message){if(DEBUG){}};function bk(){SITES=ab;for(var sitename in SITES){logmsg(sitename);w=SITES[sitename];url_res=w["url"];var urls=new Array();for(var urlIndex in url_res){urls.push(url_res[urlIndex]);}if(urls.any(function(elem){var site_url_re=new RegExp(elem);return location.href.match(site_url_re);})){logmsg(w["name"]+" matched.");Q=new Function(w["r"]);logmsg(Q());al=w["B"];logmsg("More link: "+al);af=new Function(w["af"]);l=new Function(w["l"]);if(l()){logmsg("This is an Audio release.");af();logmsg("Hook installed");addGlobalStyle(bc);addGlobalStyle(w["css"]);artist=Q().replace(/&amp;/,"&");if(artist==null||artist.toLowerCase().indexOf('various')> -1||artist.match(new RegExp("^VA.*"))){logmsg('no artist to process');artist=null;bl(artist);$("ArtistTitle").innerHTML="<b>Sorry, the artist name could not be parsed.<br>However, you can still use the search box to the right.</b>";return;}bl(artist);a(artist);break;}else logmsg("This is not an audio release.");}else logmsg(w["name"]+" didn't match.");}};function bm(){bk();};bm();};var Library={libraries:new Array(),index:0,callback:"",addLibrary:function(key,url,save){save=save==false?false:true;this.libraries.push({key:key,url:url,save:save});},load:function(callback){this.callback=callback;this.loadLibrary(this.libraries[this.index++]);},loadNext:function(){if(this.index<this.libraries.length)this.loadLibrary(this.libraries[this.index++]);else this.callback();},loadLibrary:function(lib){if(!GM_getValue("library_"+lib.url,"")){GM_xmlhttpRequest({method:'GET',url:lib.url,onload:function(data){if(lib.save)GM_setValue("library_"+lib.url,data.responseText);Library.evalLibrary(lib,data.responseText);}});}else{Library.evalLibrary(lib,GM_getValue("library_"+lib.url));}},evalLibrary:function(lib,data){var script=document.createElement('script');script.appendChild(document.createTextNode(data));document.getElementsByTagName('head')[0].appendChild(script);this.loadNext();}};function libraryLoad(){};bn();})();

//.user.js