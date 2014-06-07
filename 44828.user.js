// ==UserScript==
// @name			Deviant Friends
// @namespace		falexx.deviantart.com
// @description		Remake of the friends dialog in the upper right corner of each page.
// @include			http://*.deviantart.com/*
// ==/UserScript==

/**** COPYRIGHT STUFF GOES HERE
* The red X - Icon is licenced under a Creative Commons Attribution 2.5 License [http://creativecommons.org/licenses/by/2.5/] by Mark James [http://www.famfamfam.com/lab/icons/silk/]
* If you have done some improvements to this script, please let me know :)
****/

var menu;
var styles = [];

//displaying a friendsmenu while not logged in isn't a good idea
if(!unsafeWindow.deviantART.deviant)
	return;
if(!unsafeWindow.deviantART.deviant.loggedIn || !(menu=$X('//span[@class="glink gspecial friendsmenu"]/span')[0]))
	return;

var Settings = {
	Version : '1.1',
	Url : {
		DiFi : 'http://www.deviantart.com/global/difi/?',
		SendNote : 'http://my.deviantart.com/notes/?to=',
		
		updVersion : 'http://da.elexx.org/friends/version.php',
		updScript : 'http://da.elexx.org/friends/deviantfriends.user.js'
	},
	Img : {
		CloseX : 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjL'+
			'pZNraxpBFIb3a0ggISmmNISWXmOboKihxpgUNGWNSpvaS6RpKL3Ry//Mh1wgf6PElaCyzq67O09nVjdVlJbSDy8Lw77PmfecMwZg/I/GDw3DCo8HCkZl/RlgGA0e3Yfv'+
			'7+DbAfLrW+SXOvLTG+SHV/gPbuMZRnsyIDL/OASziMxkkKkUQTJJsLaGn8/iHz6nd+8mQv87Ahg2H9Th/BxZqxEkEgSrq/iVCvLsDK9awtvfxb2zjD2ARID+lVVlbabT'+
			'gWYTv1rFL5fBUtHbbeTJCb3EQ3ovCnRC6xAgzJtOE+ztheYIEkqbFaS3vY2zuIj77AmtYYDusPy8/zuvunJkDKXM7tYWTiyGWFjAqeQnAD6+7ueNx/FLpRGAru7mcoj5'+
			'ebqzszil7DggeF/DX1nBN82rzPqrzbRayIsLhJqMPT2N83Sdy2GApwFqRN7jFPL0tF+10cDd3MTZ2AjNUkGCoyO6y9cRxfQowFUbpufr1ct4ZoHg+Dg067zduTmEbq4y'+
			'i/UkYidDe+kaTcP4ObJIajksPd/eyx3c+N2rvPbMDPbUFPZSLKzcGjKPrbJaDsu+dQO3msfZzeGY2TCvKGYQhdSYeeJjUt21dIcjXQ7U7Kv599f4j/oF55W4g/2e3b8A'+
			'AAAASUVORK5CYII=',

		Loading : 'data:image/gif;base64,'+
			'R0lGODlhIAAgAPYAALrKuFVsX7jHtq6+rae5qKm5qLPDsbjItrbGtJ2vn3+ThG+FdnOIeYqejqm7qbXGs6K0o3KHeVVtX192aK6+rbHCsJOllZapmLXFs4uejl90Z2l/'+
			'cZ6vn6y9q6u8qoWZiWuBc2R5bGZ7bZepmYOWh1pxY2F4apiqmnaLfLLCsIqdjWF3alhvYpiqml92aKS1pF1zZVhuYmN5a4ibjKKzom2Cc1tyZYKWh46hkY2gkV10Z4yf'+
			'j52unWd9b5+xoI+ikm6Ddaq7qpaol6CyoqS2paW3pXeMfmJ4a4yfj4aaioGVhoeai1duYaCyoJmsm4WZiY+jkn6Rg36Sg5uunay8q3qPgJutnJqsnIOXiKa3poibjHeL'+
			'fWh9cKKzoq7ArrfHtbPDsrDArmR7bXuPgHmOf7DBsIGVhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAIAAgAAAH/4AAgoOEhYaHiImKi4yN'+
			'jQeGCCkCjoYpBDQFKYMCHDMElYQeKgw1DA1BkAg5QAmhghUfKxK0Jh8VBwcOPBWFFR0PiQIJILTGGwmQALmEKUtGTgiIDxYhxrUW0ocEGyUKBogIFyLXEiEnlIcVz9GI'+
			'BwQMLNcMRMrqHsGJBiMLGjYuC4RgeFXoAAYPLVSQ2OEDHMFBCCBkIJGBwwAD6Rwx45QggoYSAF+8cmDBAoVBAxSUu5GvUYUnE0zscEhgQbkFvRxRMEJLQc4CDMoxyNkI'+
			'A5QaC0YMBGCgwQRjLnBkbGSACBGHyxwo2GBiA4mTDwtS4HAigQOMYQ89eGEhBy97iZg2uoOAQsYEED82xSVigcZSdSRgGAMyJC6HGi42ZEPUAUUMYyFGKEOAQRtTEiVo'+
			'RaGCqIKCzLRA+AAgoAiSJCdyYlABg0kJKUQLdtSgo8eMAbqMwCjRwwK4d0ZqGJkytdCDBDM+WOhwQJwMY0Y8CDrgoUkBy4gEVKiQD4GQI7RKRCcENxQB3bwt/E1LmsYM'+
			'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',
			
		Search : 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADIAAAAOCAYAAABth09nAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAf9JREFUeNrsVi1PA0EQ3UIN8voDEEuQ'+
			'KHDY1iBwV8EPuPsJPYvrWdzVNkG09oJpbV1XkWBIziBwPVt3vGneJpMNSWkTCDRsMtzevOl8zxytpmnMIZwjcyCnJX+u724GeAwVfwpKF49P9U84AfsTPGJQZ1+bbRXE'+
			'HORAl1RqQVd/pSJtOl4hE70wQ3hGkqGgYo7VcoLjLrJdYhUoAzYFFhOTDM/B64MntgralDMCP1X+LCFjqacHrNplRsSQhYIClJCfCzGIWFUsZ6UmlEsYhMeioEWND4T3'+
			'CX+fk5dQfyhr2RU7DXvODIhTEkzDrPlsxL5ioEyqwcB1AKmqSBTYkKyPmCTLBImevrLtT0q+UVX7WmuxfGdsk4FyXoLy2bEMUJ+IlKjf+azqUyl546vDoc7YyqHsXsO+'+
			'ki3FXvWKxdhMZcWp9jCKV+hW5Ht3i83ou74jjoOdMAhdmZq4ZbAZgxuoilTkd7cE4dRcbVa+VDmYkf2/I9wks08yNeWmscStwmQL9YANg7YyqkKOw92XLUbnZ0GwFVd8'+
			'4b8j5K+Ufb8xr7gpN1sS9w59X0onHb89v76D8tOL8xNpXdIDBO9FI7Aa2JgGBCv9ygQ2B7am0yWH1b873kvRQfmxkl9Azy14a/AkiS94L/kuvjjcHeVr6vGygi2IySlb'+
			'//9r/bLzIcAAMQwLaapxmKUAAAAASUVORK5CYII='
	}
}

/* Install the updater */
if(!$('gmscripts-updater')){
	$('rockdock-message-count').insertAfter($E('span', {id:'gmscripts-updater',style:{position:'relative'}}));
	$('rockdock-message-count').insertAfter($S(' | '));
	
	$('gmscripts-updater').innerHTML = '<a href="#updating" id="gmscripts-updatelink" title="Script Updates available">-</a><ul id="gmscripts-updatelist"><li>Updatable scripts:</li></ul>';
	
	GM_addStyle('#gmscripts-updatelist { display:none; position:absolute; top:15px; left:0px; background-color:#40534A; border:1px solid #6B8075; list-style:none; margin:0px; padding:0px 5px; }');
	GM_addStyle('#gmscripts-updatelist li:first-child { font-weight:bold; border-bottom:1px solid #707E77; }');

	addEvent($('gmscripts-updatelink'), 'click', function(evt){evt.preventDefault();}, true);
}

if(GM_getValue('timeToUpdate', -1) < Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24))
	get(Settings.Url.updVersion,
		function(e){
			var version=e.replace(/[^a-z0-9.]/g, '');
			var updateLink=$('gmscripts-updatelink');
			
			if(version!=Settings.Version){
				/* We found a different version!! */
				$('gmscripts-updatelist').appendChild($E('li', {}, [$E('a', {href:Settings.Url.updScript}, ['DeviantFriends'])]));
	
				if(updateLink.innerHTML=='-')
					updateLink.innerHTML='1 script is not up-to-date.';
				else
					updateLink.innerHTML=(parseInt(/^(\d+)/.exec(updateLink.innerHTML)[1])+1) + ' scripts are not up-to-date.'
	
				GM_addStyle('#gmscripts-updatelist:hover { display:block; }');
				GM_addStyle('#gmscripts-updater:hover #gmscripts-updatelist { display:block; }');
			}
			else
				/* Nothing different, let's check tomorrow again */
				GM_setValue('timeToUpdate', Math.floor(new Date().getTime() / 1000 / 60 / 60 / 24));
		}
	);

/* Prepare the new dioalog */
while(child=menu.firstChild)
	menu.removeChild(child);
menu.appendChild($E('a', {href:'#friendslink', id:'friendslink'}, 'Friends'));

/***********************/
/* Drawing the fontend */
addEvent($('friendslink'), 'click', function(evt){
	document.body.appendChild($E('span',{id:'dfCover'}));
	document.body.appendChild($E('div',{id:'dfDisplayBox'}));
	
	$('dfDisplayBox').innerHTML = 
		'<img alt="cancel" id="dfCloseButton" src="'+Settings.Img.CloseX+'" />'+
		'<div id="dfOwnStatus"><acronym id="dfOwnStatusText" class="dfLinkText" title="Click to change your Status">Loading</acronym><input type="text" size="10" id="dfSearchBox" class="dfSearchEmpty" onfocus="this.className=\'\'" onblur="this.className=this.value?\'\':\'dfSearchEmpty\'" /></div>'+
		'<div id="dfFriendsList"><img src="'+Settings.Img.Loading+'" alt="Loading ..." /></div>'+
		'<div id="dfAddRemove"><span class="dfLinkText">Add/Remove</span></div>';
	
	Cache.displayOwnStatus();
	Cache.displayFriends();
	
	addEvent($('dfOwnStatusText'), 'click', function(){ $('dfOwnStatusText').innerHTML = 'Loading'; Cache.toggleOwnStatus(); }, false);
	addEvent($('dfCloseButton'), 'click', function(){$('dfCover').remove(); $('dfDisplayBox').remove();}, false);
	addEvent($('dfCover'), 'click', function(){$('dfCover').remove(); $('dfDisplayBox').remove();}, false);
	addEvent($('dfAddRemove').firstChild, 'click', function(){ window.location.href = 'http://my.deviantart.com/deviants/'; }, false);
	addEvent($('dfSearchBox'), 'keyup', function(e){Cache.displayFriends(e.target.value);}, false);
	
	evt.preventDefault();
}, false);


/********************************/
/* Preparing the friends cache. */
var Cache = {
	error : null,
	ownStatus : false,
	
	friendsListCached : false,
	friendsList : [],
	
	/* The own status, get, change and display */
	extractStatus : function(rx){
		if(rx.status == 'FAIL')
			this.error = 'Make sure you checked the "Accept thir-party cookies" in your Firefox Preferences => Privacy => Cookies.\n\nOr add an exception for "deviantart.com" on the right side of the preference window!';
		else
			this.ownStatus = rx.content;
		this.displayOwnStatus();
	},
	
	displayOwnStatus : function(forceRefresh){
		forceRefresh = forceRefresh || false;
		if(this.error){
			alert(this.error);
			return;
		}
		if(this.ownStatus && !forceRefresh){
			$('dfOwnStatusText').innerHTML = this.ownStatus == 0 ? 'Online' : 'Invisible';
		}
		else
			get(Settings.Url.DiFi+'c[]=User;getStatus&t=json', function(e){ eval("var rx="+e); Cache.extractStatus(rx.DiFi.response.calls[0].response); });
	},
	
	toggleOwnStatus : function(){
		post(Settings.Url.DiFi, 'c[]=User;setStatus;'+(this.ownStatus == 0 ? 1 : 0) +'&t=json&ui='+getCookie('userinfo'),
			function(e){ Cache.displayOwnStatus(true); }
		);
	},
	
	/* The friendslist itself; get, filter and display */
	fillFriendsList : function(rx){
		rx.content.forEach(function(ele){
			var found = false;
			for(var i in this){
				if(this[i].group == (ele.groupname || 'Ungrouped')){
					found = i;
					break;
				}
			}
			
			if(!found){
				found = this.length;
				this.push({group:(ele.groupname.trim() || 'Ungrouped'), deviants:[]});
			}
			
			var statuIcon;
			switch(ele.lastvisit){
				case 'Online': statusIcon = 'i1'; break;
				case 'Idle': statusIcon = 'i3'; break;
				case 'Invisible': statusIcon = 'i4'; break;
				default: statusIcon = 'i2'; break;
			}

			this[found].deviants.push({ username: ele.username.trim(), symbol: ele.symbol ,lastvisit: ele.lastvisit,icon: statusIcon});
				
		}, Cache.friendsList);
		
		Cache.friendsList.sort(this.groupSortCB);
		for(var i in Cache.friendsList)
			Cache.friendsList[i].deviants.sort(this.friendsSortCB);

		Cache.friendsListCached = true;
		this.displayFriends();
	},
	
	displayFriends : function(userSearch){		
		if(!Cache.friendsListCached){
			get(Settings.Url.DiFi+'c[]=Friends;getFriendsMenu;1&t=json', function(e){
				eval("var rx="+e);
				Cache.fillFriendsList(rx.DiFi.response.calls[0].response);
			});
		}
		else{
			var groups=[];
			Cache.friendsList.forEach(function(ele){

				var deviants=[];
				ele.deviants.forEach(function(ele,i){
					if(userSearch){
						if(userSearch.trim().indexOf(':') == 0){
							if(ele.lastvisit.toLowerCase().indexOf(userSearch.trim().substring(1)) < 0)
								return;
						}
						else
							if(ele.username.indexOf(userSearch.trim()) < 0)
								return;
					}
							
					deviants.push('<dd '+(deviants.length%2==0?'':'class="a"')+'"><a href="'+Settings.Url.SendNote+ele.username+'"><i class="icon micon i3"></i></a><i class="icon sicon '+ele.icon+'"></i> '+ele.symbol+'<a href="http://'+ele.username+'.deviantart.com/">'+ele.username+'</a><span>'+ele.lastvisit+'</span></dd>');
				});
				if(deviants.length > 0)
					groups.push('<dl class="deviants"><dt>'+ele.group+'</dt>'+deviants.join('')+'</dt>');
				
			});
			$('dfFriendsList').innerHTML=groups.join('');
		}
	},
	
	/* sort callback */
	groupSortCB : function(a,b){ return (a.group.toLowerCase() < b.group.toLowerCase()) ? -1 : 1; },
	friendsSortCB : function(a,b){ return (a.username.toLowerCase() < b.username.toLowerCase()) ? -1 : 1; }
};

/* Do the prototyping!! */
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, '');
}

function $(id){
	var el =(typeof(id)=='string'?document.getElementById(id):false);
	if(el){
		el.remove=function(){
			this.parentNode.removeChild(this);
		}
		el.insertAfter=function(newElement) {
			if(this.parentNode.lastchild == this)
				this.parentNode.appendChild(newElement);
			else
				this.parentNode.insertBefore(newElement, this.nextSibling);
		}
	}
	return el;
}

function $X(xpath,root){
	var got=document.evaluate(xpath,root||document,null,null,null), result=[];
	while(next=got.iterateNext()) result.push(next);
	return result;
}

function $E(tag, attributes, children){
	var e=document.createElement(tag);
	
	function applyObj(to, obj){
		for(prop in obj) if(obj.hasOwnProperty(prop))
			if(typeof(obj[prop])=='object')
				applyObj(to[prop], obj[prop]);
			else
				to[prop]=obj[prop];
	}

	applyObj(e, attributes);
	for(var c in children)
		if(typeof(children[c])=='string') e.appendChild($S(children[c]));
		else e.appendChild(children[c]);

	return e;
}

function $S(str){
	return document.createTextNode(str);
}

function addEvent(obj, evType, fn, useCapture){
	if(!obj) return;
	if(typeof(evType)=='string') evType=[evType];
	evType.forEach(
		function(evnt, idx, ary){
			obj.addEventListener(evnt, fn, useCapture);
		}
	)
}

function getCookie(name){
  var cookies = document.cookie.split(/; /);
  for (var i = 0; i < cookies.length; i++ ){
    var d = cookies[i].split(/=/);
    if (d[0] == name)
      return unescape(d[1]);
  }
  return false;
}

/* get post data */
function get(url,cb){GM_xmlhttpRequest({method:"GET", url:url, headers:{'User-Agent':'Firefox / GreaseMonkey / deviantFriends'}, onload:function(xhr){cb(xhr.responseText,xhr.status)}})}
function post(url,data,cb){GM_xmlhttpRequest({method:"POST", url:url, headers:{'User-Agent':'Firefox / GreaseMonkey / deviantFriends', 'Content-type':'application/x-www-form-urlencoded'},data:encodeURI(data),onload:function(xhr){cb(xhr.responseText,xhr.status)}})}

/* bring some color into the game  */
styles.push('#dfCover { position:fixed; top:0; left:0; bottom:0; right:0; background-image:url(http://st.deviantart.com/styles/minimal/minish/bg-fade.png); z-index:251; }');
styles.push('#dfDisplayBox { position:fixed; width:300px; height:400px; top:29px; right:122px; -moz-border-radius: 2px; background: url(http://st.deviantart.com/minish/main/bg-bubblb3.gif) repeat-x #BACAB8 0px -74px; z-index:300; }');
styles.push('#dfDisplayBox acronym { border-width:0px; }');
styles.push('#dfCloseButton { padding:5px; float:right; cursor:pointer; }');
styles.push('#dfOwnStatus { padding:5px; height:15px; }');
styles.push('#dfAddRemove { position:absolute; bottom:0px; padding:5px; height:15px; }');
styles.push('#dfOwnStatusText { float:left; }');
styles.push('#dfSearchBox { float:right; border:0px solid #000000; height:14px; }');
styles.push('.dfSearchEmpty { background:#FFFFFF url('+Settings.Img.Search+') no-repeat 5px; }');
styles.push('.dfLinkText { cursor:pointer; }');
styles.push('.dfLinkText:hover { cursor:pointer; text-decoration:underline; }');
styles.push('#dfFriendsList { bottom:25px; left:0px; overflow-x:hidden; overflow-y:scroll; position:absolute; right:0px; top:26px; }');
styles.push('dl.deviants { background-color:#E8E8E8; font-size:8.25pt; }');
styles.push('dl.deviants dt { font-weight:bold; padding:0px 5px !important; backround-color:#FFFFFF; }');
styles.push('dl.deviants dd { padding:0px 5px 0px 45px !important; }');
styles.push('dl.deviants dd.a { background-color:#F0F0F0; font-size:8.25pt; }');
styles.push('dl.deviants dd i.micon { left:5px; cursor:pointer; width:20px; margin-top:2px; background-image: url(http://st.deviantart.com/minish/messages/icons-sidebar.gif); }');
styles.push('dl.deviants dd i.sicon { left:25px; margin-top:2px; background-image: url(http://st.deviantart.com/styles/minimal/minish/icons-friends.gif); }');
GM_addStyle(styles.join('\n'));