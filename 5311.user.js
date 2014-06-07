// ==UserScript==
// @name	Flickr Photo Compass
// @namespace	http://6v8.gamboni.org/
// @description Show nearby photos at the cardinate points
// @version        0.9
// @identifier	http://6v8.gamboni.org/IMG/js/flickrphotocompass.user.js
// @date           2007-04-01
// @creator        Pierre Andrews (mortimer.pa@free.fr)
// @include http://*flickr.com/photos/*/*
// 
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
// Copyright (C) 2006 Pierre Andrews
// 
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// The GNU General Public License is available by visiting
//   http://www.gnu.org/copyleft/gpl.html
// or by writing to
//   Free Software Foundation, Inc.
//   51 Franklin Street, Fifth Floor
//   Boston, MA  02110-1301
//   USA


(function () {

	//update information
	var SCRIPT = {
		name: "Flickr Photo Compass",
		namespace: "http://6v8.gamboni.org/",
		description: "Show nearby photos at the cardinate points",
		identifier: "http://6v8.gamboni.org/IMG/js/flickrphotocompass.user.js",
		version: "0.9",								// version
		date: (new Date("2007-04-01"))		// update date
		.valueOf()
	};
	
	
	function M8_log() {
		if(unsafeWindow.console)
			unsafeWindow.console.log(arguments);
		else
			GM_log(arguments);
	}

	
	function getObjectMethodClosureB3(object, method,arg0,arg1,arg2) {
		return function(arg) {
			return object[method](arg0,arg1,arg2); 
		}
	}
	
	function getObjectMethodClosure3(object, method,arg1,arg2,arg3) {
		return function(arg) {
			return object[method](arg,arg1,arg2,arg3); 
		}
	}

	var DIR_N = 'data:image/gif;base64,R0lGODlhEAAQAPMAALUJCcM/P////759fbceHrtZWcPIyLpNTb1ra8Cfn7+NjcTQ0LUEBAAfk8Xf3////yH5BAEAAA8ALAAAAAAQABAAAARM8MlJq5Uh3Jt3bQzTeE/THCFiXo2zACHhOOPnKGGY0LYT5IzDrCZpGWA5wII3aQ2AoQGz6CgwCAJBbEqdeYeW1tdLpJi+K48pTSJFAAA7';
	var DIR_NE = 'data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq70458OPHABQcUiJCEJhENRhEkYsj0igyrE4uXVxx6eWKTAY5BCenamkKpSSEt6wAHjSlgHrdakdSZHQSyeswUQAADs=';
	var DIR_NW = 'data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq704VwCGPOBxEUYhCEiKgJbhvoQqUsD7FsFaoXaBp7MPomYYDHJAyiFVKKmSk+Xw9wwKEUiZRfqEVkBV6zakKUcAADs=';
	var DIR_E = 'data:image/gif;base64,R0lGODlhEAAQAPMAAAsdi7YLC7cZGcI/P76Cgv///7tSUsTLy7UHB8Cfn2wPPrgoKAAfk7UEBMXf3////yH5BAEAAA8ALAAAAAAQABAAAARD8MlJq704Z8aZ5k7ocBcjGsQRepUZNg0yEEArOgIMBwrlhgWdcCD5OYJCGPFhTAp6PhEMYUiwoqFFalUykjYdjfgRAQA7';
	var DIR_W = 'data:image/gif;base64,R0lGODlhEAAQAPMAAAsdi7YLC7cZGcI/P76Cgv///7tSUsTLy7UHB8Cfn2wPPrgoKAAfk7UEBMXf3////yH5BAEAAA8ALAAAAAAQABAAAARD8MlJq704Z8aZ5k7ocBcTHoQhehVADEjTrJUSyLIgjtKA/4Udy/eTBWkThaAorDAShtgsxKKYHKgF0nmlVksdjfgRAQA7';
	var DIR_SE = 'data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq70458OP5kiIcNchnqNlnkHoUasYFIALo4VR2FMcDAODofaSrGY5oQEhqJhmSiXAKSJEhaoYU5AjlDqSAWCqsUQAADs=';
	var DIR_SW = 'data:image/gif;base64,R0lGODlhEAAQALMJAM9dXcBGRjoXZv77+7wuLrYLC7UEBAAfk8Xf3////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARFMMlJq70468PPPkiIcBconl5lBueohkDBopRZGEWbSiBgGIPBzDURIH6/giy0S/iQSVYzAf0RRE0CTmDETgGAAa+jKUcAADs=';
	var DIR_S = 'data:image/gif;base64,R0lGODlhEAAQAPMAALUJCf///7ceHr59fcY/P7tZWbk/P7pNTb1ra8Cfn7+NjcTNzbUEBAAfk8Xf3////yH5BAEAAA8ALAAAAAAQABAAAARG8MlJq70458ab5k7ocFcjnqNloqFHmQLDBEFcpJM5yDwz4BLTAtADLICP1aFnaFVMiZ4CGQzFGEZqsIGQHUgbmUvzIBAuEQA7';
	
	var flickrphotocompass = function() {this.init();}

	flickrphotocompass.prototype = {
		nsid: '',
		user_name: '',
		container: '',
		coord: {lon:'',lat:''},
		only_user: false,
		img_src:'',

		init: function() {
			this.getCoord();
			if( this.coord.lat=='' || this.coord.lon=='' ) return;
		},

		coordDone: function() {
			GM_addStyle("a.flickrphotocompass_link:hover {background-color:transparent;}");
			var uploadedBy = document.evaluate( "/html/body/div[@id='Main']/table[@id='Photo']/tbody/tr/td[2]/div[1]/a[1]/img[1]",                              
				document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
				).singleNodeValue;
			var photoid = unsafeWindow.page_photo_id;

			this.nsid = uploadedBy.src.replace(/.*\/buddyicons\/(.*?).jpg\?.*/,'$1');
			this.user_name = uploadedBy.parentNode.parentNode.getElementsByTagName('a').item(2).innerHTML;
			
			
			this.img_src = {id:photoid,server:unsafeWindow.global_photos[unsafeWindow.page_photo_id].server,secret:unsafeWindow.global_photos[unsafeWindow.page_photo_id].secret};

			var insertPoint = document.getElementById('otherContexts_div');
			var div = document.createElement("div");
			var h3 = div.appendChild(document.createElement('div'));
			h3.setAttribute('style',"margin: 20 15 0 2; background-color: white; padding: 3 4 4 4; border: 1px solid #F3F3F3; border-bottom: 0px; font-size:14px; font-weight: 400; color: #FF0084;");
			h3.innerHTML = '<a href="http://maps.yuan.cc" class="currentContextLink">Nearby Photos</a>'+
			'<img id="flickrphotocompass_wait" src="http://www.flickr.com/images/pulser2.gif" style="margin:0;padding:0;margin-right:4px;border:0px #ffffff;display:none;height: 16px;" />';
			this.container = div.appendChild(document.createElement('div'));
			this.container.setAttribute('style','background-color:#f3f3f3;border: 1px solid #E3E3E3;margin:0;width:240px;height:240px;');
			this.container.innerHTML = 'Searching...';
			var spanCheck = div.appendChild(document.createElement('div'));
			spanCheck.setAttribute('style',"margin: 0 15 0 2; background-color: #f3f3f3; padding: 0 4; border: 1px solid #e3e3e3; border-top: 0px; font-size:10px; font-weight: 400;");
			var onlyuser = spanCheck.appendChild(document.createElement('input'));
			onlyuser.type = 'checkbox';
			onlyuser.id = 'flickrphotocompass_check';
			var self = this;
			onlyuser.addEventListener('click',function(ev) {
				self.only_user = onlyuser.checked;
				self.getPhotos(self.coord.lat,self.coord.lon,self.img_src);
			},true);

			var label = spanCheck.appendChild(document.createElement('label'));
			label.setAttribute('style',"position:relative;top:-4px;");
			label.innerHTML = "only "+this.user_name+"'s photos";
			label.htmlFor = 'flickrphotocompass_check';

			div.style.width = "220px";

			insertPoint.parentNode.insertBefore(div,insertPoint);
			this.getPhotos(this.coord.lat,this.coord.lon,this.img_src);
						
		},

		getCoord: function() {
			var tmp = new Array();
			var photoid = unsafeWindow.page_photo_id;
			var tags = tmp.concat(unsafeWindow.global_photos[photoid].tags_rawA);
			this.coord = {lat: '', lon: ''};

			var moreLot = document.evaluate(
											"//td[@class='RHS']/ul//li/a[@class='Plain']",
											document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
											);
			for(var i = 0; i < moreLot.snapshotLength; i++) { 
				var map = moreLot.snapshotItem(i);
				if(map.innerHTML == 'map') {
					var ul = map.parentNode.appendChild(document.createElement('ul'));
					var onclick = map.getAttribute('onclick');
					var matches;
					if(matches = /new YGeoPoint\(([0-9.-]+),([0-9.-]+)\)/.exec(onclick)) {
						this.coord.lat = matches[1];
						this.coord.lon = matches[2];
					}
				}
				break;
			}


			if(this.coord.lat=='' || this.coord.lon=='' ) {			
				while( tags && tags.length > 0 ) {
					tag = tags.pop();
					splits = tag.split('=');
					if( splits[0] == 'geo:lat' ) this.coord.lat = 1*splits[1];
					if( splits[0] == 'geo:lon' || splits[0] == 'geo:long' ) this.coord.lon = 1*splits[1];
				}
			} else {
				this.coordDone();
				return;
			}
			if(this.coord.lat == '' || this.coord.lon == '') {
				var description = document.evaluate("//div[@id='About']/div[@class='photoDescription']",
												document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
												).singleNodeValue;
				if(description) {
					var matches;
					if(matches = /(ll|q)=([-0-9.]+),([-0-9.]+)/.exec(description.innerHTML)) {
						this.coord.lat = matches[2];
						this.coord.lon = matches[3];
					}
				}
			} else {
				this.coordDone();
				return;
			}

			if(this.coord.lat=='' || this.coord.lon=='' ) {
				var self = this;
				var listener = {
					flickr_photos_getExif_onLoad: function(success, responseXML, responseText, params){
						if(success) {
							var rsp = responseText.replace(/<\?xml.*\?>/,'');
							rsp = new XML(rsp);
							lat_dir = (rsp..exif.(@label == 'North or South Latitude').raw == 'S')?-1:1
							lat = new String(rsp..exif.(@label == 'Latitude').raw);
							lon_dir = (rsp..exif.(@label == 'East or West Longitude').raw == 'W')?-1:1
							lon = new String(rsp..exif.(@label == 'Longitude').raw);
							if((lat.length > 0) && (lon.length > 0)) {
								lat = lat.split(/[,\/]/);
								lat_deg = parseInt(lat[0])/parseInt(lat[1]);
								lat_min = parseInt(lat[2])/parseInt(lat[3]);
								lat_sec = parseInt(lat[4])/parseInt(lat[5]);
								self.coord.lat = lat_dir * (lat_deg + (lat_min+lat_sec/60)/60);
								
								lon = lon.split(/[,\/]/);
								lon_deg = parseInt(lon[0])/parseInt(lon[1]);
								lon_min = parseInt(lon[2])/parseInt(lon[3]);
								lon_sec = parseInt(lon[4])/parseInt(lon[5]);
								self.coord.lon = lon_dir * (lon_deg + (lon_min+lon_sec/60)/60);
								self.coordDone();
							}
						}
					}
				};
				unsafeWindow.F.API.callMethod('flickr.photos.getExif', {
						photo_id:photoid				   
							}, listener);
			} else {
				this.coordDone();
				return;
			}

		},
		
		compassCell: function(img_src,dir,coord) {
			var to_ret = document.createElement('td');
			to_ret.setAttribute('style',"height:75px;width:75px;");

			var img_dir, pos_l, pos_t;
			if(img_src) {
				var marker_div = to_ret.appendChild(document.createElement('div')); 
				marker_div.setAttribute('style',"padding:0;margin:0;display:inline;");
				var img_a = marker_div.appendChild(document.createElement('a'));
				img_a.href= 'http://www.flickr.com/photos/'+img_src.owner+'/'+img_src.id+"/#in/nearby";
				img_a.title=img_src.title;
				var img = img_a.appendChild(document.createElement('img'));
				img.alt = img_src.title;
				img.src='http://static.flickr.com/' + img_src.server + '/' + img_src.id + '_' + img_src.secret + '_s.jpg';

				switch(dir) {
					case 'NW':
						img_dir = DIR_NW;
						pos_l = '0px';
						pos_t = '-75px';
						break;
					case 'N':
						img_dir = DIR_N;
						pos_l = '32px';
						pos_t = '-75px';
						break;
					case 'NE':
						img_dir = DIR_NE;
						pos_l = '50px';
						pos_t = '-75px';
						break;
					case 'W':
						img_dir = DIR_W;
						pos_l = '0px';
						pos_t = '-50px';
						break;
					case 'E':
						img_dir = DIR_E;
						pos_l = '50px';
						pos_t = '-50px';
						break;

					case 'SW':
						img_dir = DIR_SW;
						pos_l = '0px';
						pos_t = '-15px';
						break;
					case 'S':
						img_dir = DIR_S;
						pos_l = '32px';
						pos_t = '-15px';
						break;
					case 'SE':
						img_dir = DIR_SE;
						pos_l = '50px';
						pos_t = '-15px';
						break;
						
				}
			} else {
				switch(dir) {
					case 'NW':
						img_dir = DIR_NW;
						pos_l = '0px';
						pos_t = '-35px';
						break;
					case 'N':
						img_dir = DIR_N;
						pos_l = '32px';
						pos_t = '-35px';
						break;
					case 'NE':
						img_dir = DIR_NE;
						pos_l = '50px';
						pos_t = '-35px';
						break;
					case 'W':
						img_dir = DIR_W;
						pos_l = '0px';
						pos_t = '-14px';
						break;
					case 'E':
						img_dir = DIR_E;
						pos_l = '56px';
						pos_t = '-14px';
						break;

					case 'SW':
						img_dir = DIR_SW;
						pos_l = '0px';
						pos_t = '20px';
						break;
					case 'S':
						img_dir = DIR_S;
						pos_l = '32px';
						pos_t = '20px';
						break;
					case 'SE':
						img_dir = DIR_SE;
						pos_l = '50px';
						pos_t = '20px';
						break;
						
				}
			}

			var dir_div = to_ret.appendChild(document.createElement('div'));
			dir_div.setAttribute('style',"float:left;height:0;");

			var span = document.createElement('span');
			span.setAttribute('style','font-size:80%;font-weight:bold;position:relative;left:'+pos_l+';top:'+pos_t+';');
			span.innerHTML = dir;
			if(dir == 'NE' || dir == 'E' || dir == 'SE') 
				dir_div.appendChild(span);

			var dir_img = document.createElement('img');
			dir_img.src = img_dir;
			dir_img.setAttribute('style','position:relative;left:'+pos_l+';top:'+pos_t+';');
			if(img_src) {
				var move_a = dir_div.appendChild(document.createElement('a'));
				move_a.href="javascript:;";
				move_a.className = 'flickrphotocompass_link';
				move_a.appendChild(dir_img);
				move_a.addEventListener('click',getObjectMethodClosureB3(this,'getPhotos',coord.lat,coord.lon,img_src),true);
			} else {
				dir_div.appendChild(dir_img);
			}
			if(dir != 'NE' && dir != 'E' && dir != 'SE')
				dir_div.appendChild(span);

			return to_ret;
		},

		photosResults: function(responseDetails,lat,lon,photo_data) {
			var PI = Math.PI;
			var parser = new unsafeWindow.DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var stat = dom.getElementsByTagName('rsp')[0].getAttribute('stat');
			if( stat == 'ok' ) {
				var photos = dom.getElementsByTagName('photo');
				
				var total = 0;
				var i = 0;
				var N, NE, E, SE, S, SW, W, NW;
				var coord_N, coord_NE, coord_E, coord_SE, coord_S, coord_SW, coord_W, coord_NW;
				
				var CENTER = 'http://static.flickr.com/' +
					photo_data.server +
					'/' +
					photo_data.id +
					'_' + 
					photo_data.secret +
					'_s.jpg';
				while(total < 8 && i < photos.length) {
					var id = photos[i].getAttribute('id');
					var owner = photos[i].getAttribute('owner');
					var secret = photos[i].getAttribute('secret');
					var server = photos[i].getAttribute('server');
					var title = photos[i].getElementsByTagName('title').item(0).firstChild.data;
					var img_s = {server: server, id:id,secret:secret,owner:owner,title:title};
					
					if(id != photo_data.id) {
						var y = 1*photos[i].getElementsByTagName('longitude').item(0).firstChild.data;
						var x = 1*photos[i].getElementsByTagName('latitude').item(0).firstChild.data;
						var coord = {lat: x,lon: y};
						var arc = Math.atan2(x-lat,y-lon);
						if( -1/8*PI<=arc && arc<=1/8*PI && !E) { E = img_s; total++;coord_E = coord;}
						if( 1/8*PI<=arc && arc<=3/8*PI && !NE) { NE = img_s; total++;coord_NE = coord;}
						if( 3/8*PI<=arc && arc<=5/8*PI && !N) { N = img_s; total++;coord_N = coord;}
						if( 5/8*PI<=arc && arc<=7/8*PI && !NW) { NW = img_s; total++;coord_NW = coord;}
						if( 7/8*PI<=arc || arc<=-7/8*PI && !W) { W = img_s; total++;coord_W = coord;}
						if( -7/8*PI<=arc && arc<=-5/8*PI && !SW) { SW = img_s; total++;coord_SW = coord;}
						if( -5/8*PI<=arc && arc<=-3/8*PI && !S) { S = img_s; total++;coord_S = coord;}
						if( -3/8*PI<=arc && arc<=-1/8*PI && !SE) { SE = img_s; total++;coord_SE = coord;}
					}
					i++;
				}
				if(total > 0) {

					table = document.createElement('table');
					table.setAttribute('style',"background-color:#f3f3f3;border-left: 1px solid white; border-top:1px solid white;border-bottom: 1px solid #E3E3E3;border-right: 1px solid #E3E3E3;");
					var tbody = table.appendChild(document.createElement('tbody'));
					var tr = tbody.appendChild(document.createElement('tr'));
					tr.appendChild(this.compassCell(NW,'NW',coord_NW));
					tr.appendChild(this.compassCell(N,'N',coord_N));
					tr.appendChild(this.compassCell(NE,'NE',coord_NE));
					 tr = tbody.appendChild(document.createElement('tr'));
					tr.appendChild(this.compassCell(W,'W',coord_W));
					var td = tr.appendChild(document.createElement('td'));
					td.setAttribute('style',"height:75px;width:75px;");
					html = '';
					if(photo_data.owner) {
						html = '<a href="http://www.flickr.com/photos/'+photo_data.owner+'/'+photo_data.id+'/#in/nearby" title="'+photo_data.title+'">';
					}
					html += '<img src="'+CENTER+'" style="margin:0;"'+
						(photo_data.title?('alt="'+photo_data.title+'"'):'')
						+'/>';
					if(photo_data.owner) {
						html += '</a>';
					}
					td.innerHTML = html;
					tr.appendChild(this.compassCell(E,'E',coord_E));
					tr = tbody.appendChild(document.createElement('tr'));
					tr.appendChild(this.compassCell(SW,'SW',coord_SW));
					tr.appendChild(this.compassCell(S,'S',coord_S));
					tr.appendChild(this.compassCell(SE,'SE',coord_SE));

					this.container.innerHTML = '';
					document.getElementById('flickrphotocompass_wait').style.display='none';
					this.container.style.width = "240px";
					this.container.appendChild(table);

				}
			}
		},

		getPhotos: function(lat,lon,photo_data) {
			this.coord = {lat:lat,lon:lon};
			this.img_src = photo_data;
			document.getElementById('flickrphotocompass_wait').style.display='';
			var url = 'http://maps.yuan.cc/api.php?method=flickr.search.nearby&limit=50&lat=' +lat+ '&lon=' +lon;
			if(this.only_user && this.nsid) url += '&flickr_id='+this.nsid;
			var headers = { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/Photo Compass', 'Accept': 'application/atom+xml,application/xml,text/xml' };
			GM_xmlhttpRequest({method: 'GET', 
						url: url,
						headers: headers,
						onload: getObjectMethodClosure3(this,'photosResults',lat,lon,photo_data)						
						});
		}
	}
	//======================================================================
	// launch
	try {
		window.addEventListener("load", function () {
									try {
										
										// update automatically (http://userscripts.org/scripts/show/2296)
										win.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);
									} catch (ex) {} 
									
									var flickrgp = new flickrphotocompass();
		}, false);
	} catch (ex) {}
})();
