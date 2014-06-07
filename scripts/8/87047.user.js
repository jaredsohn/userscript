// ==UserScript==
// @name           Steam Forums UI
// @namespace      http://userscripts.org/scripts/show/87047
// @description    Steam forums user interface interface improvements
// @date           2010-09-28
// @creator        mkey
// @include        http://forums.steampowered.com/forums/forumdisplay.php?*
// @include        http://forums.steampowered.com/forums/
// @include        http://forums.steampowered.com/forums/index.php
// @include        http://forums.steampowered.com/forums/profile.php?do=editoptions
// @include        http://forums.steampowered.com/forums/showthread.php?*
// @include        http://forums.steampowered.com/forums/newreply.php?*
// ==/UserScript==
	
	var d=document,opt, profiles, date, last_user, s, tracks;
	var url_fav= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oJHQgGLLqD4gcAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC0ElEQVQ4y82SW0iTYRjH/+/7HbaWft+2mqTmSjPLloGaUkpSdCIqI7rqoqjADkRJI8kMC40otAOVQpSU0fGi1UXdtMqQUMvUWqUdrNySmaepqZtuc9/bhQ4aXXbT/+rl4f3/Hnj4Af8YAgCDbB+RyEUGADsOmZbGz9ftkXTiBsoRFQD4vIHPTrv7apWl/Vbji07nX4CJCAXl6QUzEqSjoopSJQC736/0UQKRF2gM5ans+jnSVGvt2G+50loTLHHBx+Hy9CNxiXIRUxj56fCct1oc+efymk4+sTjuRERPbpG0olFrUC00RGmyeIFUt74b6AIACgDb8kxZMxOkY8qYgnevejcXbq/NS0jSRRVXZhzIv5C+qf37UMP+7Ocrup2eh4ZIdfzilVElwcU8AMxO0u4UVZRztrnLygttloNnUg/GzZOP6wxqzjsSgFrDN8k6dc7Nsx9z9xQtmBNp1KwOAigAyHoxW1HgaKzuup57KnlZbKJcPHWahqMcgSaMR8ys8BRTmt78vr63x9U1+lRQUYQAOI6GKwHW/+Dq10/6iEkmnUHNMzAwBYwxgBcJwmVhUe7JZKPfq7QwhtEQAANACMS4RFkKjLH+UU8AZHxGQMY/+H1Kb/u3YTfhiBaAOgQwOjL2hlAY12+dteqltaOq84e7xudVECwPuLzocLhv3K9odUg6MetPDygAONuGr1GOhsUnac3Wew6Pra57t+PLYEVXu6fF2TZc0/p+YO9pc0PFgZKUXZJWWDnY5xsI8aDDPmw3pU3J0BvUCzPXRKc1Vnc/ulbSfDt2rvzYVtt7t7K0+Zm5NDUnMUV/ieMp+fDaZa6v6mwIMXHdltjUpdkxlRHTJ893//LZ+3u8VT5foJkQIklaITNMFpZTSsmPr0OninLqCiZOF6Iylm80zlmyNvpEdGzYJtUkDowxPwCBMWCwz+f6Yus/Ulb49nKw/H/kN8ktHkOSLCysAAAAAElFTkSuQmCC';
	var url_no_fav= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oJHQgGOk5XV1YAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACJklEQVQ4y2NgoBAwMjAwMHz6n8vIxzj5PwMDA0NSubaDio5gJp8gmz8TMyM7AwMDw6+ff28+ffB13r61j5eePfziKYYBUMBaNdWsSl6Nr46dg5np75//D37//veOiZGBjZWNWZaRmZH/7fPv547tepa3dvbtozBNzDBG5VSzaiVN/kaG/wyMzx58nbhr7cOK/tJz7bvXPlwuJs11jU+ATU5AlN1EVIrLjoWV8eDtSx9ewq1OKNW2m7nb5c+s3S7/s5v1I3B4l7dzhe2mxcc9/rcstN4BE2RiYGBgUNUVSGPnYGZ+9ez7lKm1F1fgMODzkr7r+Z8//LolKcfljmIAvxCb39+//x+ePfhyIb4Qv3zqzf23L3/sYeOA+xxiADMzE++/v//fr5935wahaPv989+1//8ZfqAY8J+BgYGRkYFNSZOfj2C8MzMKMDAwcKAY8OP7n/NMzIxyvnHKboQM4BNks0PmMzEwMDA8vf9lPiMTI4+KrkARAwODCC7NhV1G6fyCbK4f3/78gJIOnj348kDbVNhKSJTDxNpT2vTnt7+nHt7+9AZZc1G3cYamkdAMJmYmxiun3xad2vfiDEpK9IlVNHbwk10gJsOt8/XjrwfvX//c9+vX36uMjIx8fAKs1rwCbM6MjIyMj+587mhMPV4FDTqUpMzgHCinbust3SqtyBPMwcXC8P///98MDAys//8zMHx8+/PtrYvvq6fUXpgF0zw4AAC2/8WM2BHNQwAAAABJRU5ErkJggg==';
	var url_last_post= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oKDAomGKIyrFQAAAEsSURBVBjTdcyhT5RxHMfx9+f3PHiDo94MJDIV5pDmaAczGGAnAWYEJjPpbgQCFQaDACZlu2ODhDsaweTGLhs1sVFwTsB53D3fD4GKrz/gJYBG62Wi0puRWEQ8FwjTDrPTuUnNhRdf7vSpNZuVnl6vId4DGfDHpgNUJOPQRu8mq6cnles543qEswhT9PwzOrwFjgCU/C4vF/MJsQxqR8Fm0fVucRd7rydazdQtzTm0i4USdR22q7fA/Oxo64hHNM+nFpC3EiCgw/+ErxDWYbv6HbiwOBX0Rc8/as9Ojx+26gclr4L+5jYfSd4QTAIgnR18rV7mA7ySvIKEC63n8S/tp/4YAd4go8RYXuYzeBgJm0YUaUcAjW/Tg8piicSS5CEAm18ObVFk27Xxk9/3hPaEcrINH8EAAAAASUVORK5CYII=';
	var style= '.activate { color:black; background-color:red; margin:3px; ProfilesAdding:3px; } .activate a { font-weight:700; text-decoration:underline; } #fav_link a { margin:3px; text-decoration:underline; } .fav_icon { margin-right:1px; vertical-align:middle; border:none; } .info_bar { font-size:10px; width:400px; } .avatar_img { width:64px; margin:3px; border:1px solid white; } .ccache { margin-left:8px; width:100px; text-decoration:underline!important; } .tracks { font-size:8px; vertical-align:text-top; }';
	const ACTIVATED=0, FAVS_ONLY=1, POSTS_PER_PAGE=2, SHOW_PAGE_LINKS=3, SHOW_AVATAR=4, SHOW_SIG=5, TRACK_POSTS=6, SHOW_IMAGES=7, ENABLE_FAVORITES=8;
	// const DEBUG=1;
	
(function (){
	// if (DEBUG>0){
		// _setValue('sui_profiles', '0;99999;0;1;99999;0');
		// _setValue('sui_tracks', '0;0;1;1');
		// console.log(_getValue('sui_profiles'));
		// console.log(_getValue('sui_tracks'));
	// }
	if (!d.getElementById('navbar_username')){
		_addStyle(style);
		
		opt= (Browser()) ? '0;0;15;1;0;1;1;1;1' : '0;0;15;1;1;1;1;1;1';
		//					0 1  2 3 4 5 6 7 8     0 1  2 3 4 5 6 7 8
		opt= _getValue('sui_options', opt).split(";");
		if (d.URL.indexOf('editoptions')>-1) Options();
		else if (opt[ACTIVATED]==0) Activate();
		else if (d.URL.indexOf('forumdisplay')>-1 && d.URL.indexOf('f=53')<0 && (opt[SHOW_PAGE_LINKS]==1 || opt[TRACK_POSTS]==1)) Board();
		else if (d.URL.indexOf('showthread')>-1) Thread();
		else if (d.URL.indexOf('newreply')>-1) NewReply();
		else if (opt[ENABLE_FAVORITES]==1) Favorites();
	}
})()

function Activate(){			// script activation procedure
	var div= d.createElement('div');
	div.className= 'activate';
	d.body.insertBefore(div, d.body.firstChild);
	div.innerHTML= 'To activate the Steam UI script, visit <a href="http://forums.steampowered.com/forums/profile.php?do=editoptions" >the options</a> page in your profile';
}

function Avatar(a, image){	// display avatar image
	var img= d.createElement('img');
	img.src= 'http://media.steampowered.com/steamcommunity/public/images/avatars/'+image+'_full.jpg';
	img.className= 'avatar_img';
	var div= a.parentNode.nextSibling.nextSibling;
	div.parentNode.insertBefore(img, div);
}

function Board(){				// boards handler
	var td= d.getElementById('threadbits_forum_14');
	if (!td){
		td= d.getElementById('threadslist');
		if (!td) return;
	}
	if (opt[TRACK_POSTS]==1) TracksLoad();
	
	td= td.getElementsByClassName('alt1');
	var k= td.length;
	if (k<3) return;
	var a, el, id;
	for (var i= k%3; i<td.length; i+=3){
		k= td[i+2].textContent.replace(",", '');
		if (k!="-"){
			k= Math.ceil((Number(k)+1)/opt[POSTS_PER_PAGE]);
			a= td[i+1].getElementsByTagName("a");
			if (a.length>0){
				a= a[a.length-1];
				if (opt[TRACK_POSTS]==1){
					id= TracksFind(a.href.substring(a.href.indexOf('t=')+2), 0);
					if (id){	
						el= d.createElement("a"); el.href= a.href+'&p='+id;
						a.parentNode.insertBefore(el, a);
						el.innerHTML= '<img src="'+url_last_post+'" title="Follow my last post" border=0 style="margin-right:2px;" />';
						td[i+1].setAttribute('style', 'background-color:#393939;');
					}
				}
				if (k>1 && opt[SHOW_PAGE_LINKS]==1){
					el= d.createElement('span');
					el.className= 'tracks';
					a.parentNode.appendChild(el);
					a= a.href;
					if (k==2) el.innerHTML= ' (<a href="'+a+'&page=1" >1</a> <a href="'+a+'&page=2" >2</a>)';
					else if (k==3) el.innerHTML= ' (<a href="'+a+'&page=1" >1</a> <a href="'+a+'&page=2" >2</a> <a href="'+a+'&page=3" >3</a>)';
					else if (k==4) el.innerHTML= ' (<a href="'+a+'&page=1" >1</a> <a href="'+a+'&page=2" >2</a> <a href="'+a+'&page=3" >3</a> <a href="'+a+'&page=4" >4</a>)';
					else el.innerHTML= ' (<a href="'+a+'&page=1" >1</a> <a href="'+a+'&page=2" >2</a> <a href="'+a+'&page=3" >3</a> ... <a href="'+a+'&page='+(k-1)+'" >'+(k-1)+'</a> <a href="'+a+'&page='+k+'" >'+k+'</a>)';
				}
			}
		}
	}
}

function Browser(){				// check wether the user is using Firefox
	if (navigator.userAgent.search('Firefox')) return false;
	return true;
}

function Catch(){				// capture post ID after making a new quick post
	var user= d.getElementsByClassName('smallfont')[0].getElementsByTagName("a");
	var s= d.getElementsByClassName('bigusername');
	if (s[s.length-1].textContent==user[0].textContent){
		TracksLoad();
		TracksFind(ThreadId(), Number(s[s.length-1].parentNode.id.substring(9)));
		TracksSave();
	} else setTimeout(Catch, 250);
}

function FavIcon(fav, name){	// create a favorite subforum checkbox
	var a= d.createElement("a");
	a.href= "#"; a.title= name;
	a.addEventListener('click', function(e){
		var img_= this.firstChild;
		if (img_.alt==0){
			img_.src= url_fav;
			img_.alt=1;
			var favs= _getValue('sui_favorites', '');
			if (favs.indexOf(this.title)<0) _setValue('sui_favorites', favs+this.title+";");
		} else {
			img_.src= url_no_fav;
			img_.alt=0;
			_setValue('sui_favorites', _getValue('sui_favorites', '').replace(this.title+";", ''));		// clear favorite
		}
		e.preventDefault();
	}, false);
	a.innerHTML= (fav==1) ? '<img class="fav_icon" alt="'+fav+'" src="'+url_fav+'" title="Unmark as favorite" />' : '<img class="fav_icon" alt="'+fav+'" src="'+url_no_fav+'" title="Mark as favorite" />'; 
	return a;
}

function Favorites(){			// main page handler
	var t= d.getElementById('collapseobj_forumbit_53');
	if (!t){
		t= d.getElementsByClassName('tborder')[2];
		if (!t){ console.log('script broken'); return; }
	}
	
	var img= t.getElementsByClassName('inlineimg');
	var name, fav, td, td_, j;
	var t_= d.createElement('tbody');
	var tr= d.createElement('tr');
	t.parentNode.insertBefore(t_, t);
	t_.innerHTML= '<tr><td class="alt1"></td><td class="alt1" colspan="4"><div class="smallfont"><span><span id="fav_link" ></span><table width="100%" align="center" ><tr><td><table id="first_sui" width="100%" ></table></td></tr></table></span></div></td></tr>';
	t_= d.getElementById("first_sui");
	
	for (var i=img.length-1; i>-1; i--){
		td= img[i].parentNode;
		name= td.textContent.trim();
		td.title= name;
		fav= _checkFav(name);
		
		if (opt[FAVS_ONLY]==1 && fav==1){
			td_= tr.getElementsByTagName('td');
			for (j=0; j<td_.length; j++) if (td.title>td_[j].title){ tr.insertBefore(td, td_[j]); break; }
			if (j==td_.length) tr.appendChild(td);
		} else td.insertBefore(FavIcon(fav, name), img[i]);
	}
	
	var a= d.createElement("a"); a.href= 'index.php';
	a.addEventListener('click', function(){ opt[FAVS_ONLY]= (opt[FAVS_ONLY]==1) ? 0 : 1; _setValue('sui_options', opt.join(";")); }, false);
	
	if (opt[FAVS_ONLY]==1){
		a.textContent= 'Show all subforums';
		a.title= 'Click to show all game subforums';
		
		td_= tr.getElementsByTagName('td');
		j=3;
		for (var i=td_.length-1; i>-1; i--){
			if (j>2){
				j=0;
				tr= d.createElement('tr');
				t_.appendChild(tr);
			}
			j++;
			tr.appendChild(td_[i]);
		}
		t.parentNode.removeChild(t);
	} else {
		a.textContent= 'Show favorites only';
		a.title= 'Click to show only favorite game subforums';
	}
	d.getElementById('fav_link').appendChild(a);
	
	a= d.createElement("a"); a.href= 'index.php';
	a.textContent= 'Clear favorites';
	a.addEventListener('click', function(e){
		if (confirm('Are you sure you want to clear favorites?')){
			_setValue('sui_favorites', '');
			opt[FAVS_ONLY]=0;
			_setValue('sui_options', opt.join(";"));
		} else e.preventDefault();
	}, false);
	d.getElementById('fav_link').appendChild(a);
}

function Images(){				// convert image links to images
	var a, i, j, td= d.getElementById('posts').getElementsByClassName('alt1'), el, img;
	for (i=0; i<td.length; i+=2){
		a= td[i].getElementsByTagName('a');
		for (j=0; j<a.length; j++){
			if (a[j].href.search('/(.png)|(.gif)|(.jpg)|(.jpeg)|(.jpe)$/')!=-1){
				a[j].textContent='';
				
				img= new Image(); img.src= a[j].href;
				el= d.createElement('img'); el.title= 'Click to enlarge in the same window';
				el.src= img.src; el.border=0;
				a[j].appendChild(el);
				
				if (img.width==0 || img.width>400){					// preventively "downscale" images you can't detect width of
					el.addEventListener('click', function (e){
						if (this.getAttribute('width')) this.removeAttribute('width');
						else this.setAttribute('width', '400px'); e.preventDefault();
					}, false);
					el.setAttribute('width', '400px');
					el= d.createElement('div'); el.className= 'info_bar';
					el.textContent= 'This image has been resized, click here to enlarge';
					a[j].appendChild(el);
				}
				// if (DEBUG>0) console.log('img '+img.width);
				img=0;
			}
		}
	}
}

function NewReply(){			// new reply/quote page handler
	var s= d.getElementsByClassName('spoiler');																			// spoiler tag fix
	for (var i=0; i<s.length; i++) s[i].setAttribute('style', 'color:black; background-color:black;');
}

function Options(){				// edit options page handler
	SetPostCount(d.getElementById('sel_umaxposts').selectedIndex);
	var el= d.getElementsByClassName('panelsurround')[4].getElementsByTagName('input');
	el[0].addEventListener('click', function(){ SetPostCount(d.getElementById('sel_umaxposts').selectedIndex); }, false);
	if (opt[ACTIVATED]==0){
		opt[ACTIVATED]=1;
		_setValue('sui_options', opt.join(";"));
		alert('The script has now been activated');
	}
	
	var div= d.getElementById('collapseobj_uopt_misc');
	el= d.createElement('div');
	div.parentNode.insertBefore(el, div.nextSibling);
	el.innerHTML= '<div class="panel" id="collapseobj_uopt_misc" style=""><div style="width:480px" align="left"><fieldset class="fieldset"><legend><label for="sel_showvbcode">Steam UI options</label></legend><table cellProfilesAdding="0" cellspacing="3" border="0" width="100%"><tr><td>All the settings are automatically saved<br/><br/><label><input id="sui_opt_3" type="checkbox" value="3" />Show direct page links</label><br/><label><input id="sui_opt_4" type="checkbox" value="4" />Show avatars</label><a class="ccache" id="avatar_ccache" href="#" >Clear cache</a><a class="ccache" id="avatar_opti" href="#" >Optimize cache</a><br/><label><input id="sui_opt_5" type="checkbox" value="5" />Show signatures</label><br/><label><input id="sui_opt_6" type="checkbox" value="6" />Track my posts</label><a class="ccache" id="track_ccache" href="#" >Clear cache</a><br/><label><input id="sui_opt_7" type="checkbox" value="7" />Show images in posts</label><br/><label><input id="sui_opt_8" type="checkbox" value="8" />Use favorties for game subforums</label><br/></td></tr></table></fieldset></div></div>';
	
	var browser= Browser();
	for (var i=3; i<9; i++){
		el= d.getElementById('sui_opt_'+i);
		if (i==SHOW_AVATAR && browser) el.checked=0;
		else if (opt[i]==1) el.checked=1;
		el.addEventListener('click', function (e){
			if (this.value==SHOW_AVATAR && browser) e.preventDefault();
			else {
				opt[this.value]= (this.checked) ? 1 : 0;
				_setValue('sui_options', opt.join(";"));
			}
		}, false);
	}
	d.getElementById('track_ccache').addEventListener('click', function (e){
		if (confirm('Are you sure you want to remove all post tracking records?')) _setValue('sui_tracks', '0;0;1;1');
		e.preventDefault();
	}, false);
	d.getElementById('avatar_ccache').addEventListener('click', function (e){
		if (confirm('Are you sure you want to remove the avatar database?')) _setValue('sui_profiles', '0;99999;0;1;99999;0');
		e.preventDefault();
	}, false);
	d.getElementById('avatar_opti').addEventListener('click', function (e){
		if (confirm('This will optimize the avatar database, shall we proceed?')){
			var date= Math.round(new Date().getTime()/1000/3600/24)-7;
			profiles= _getValue('sui_profiles', '0;99999;0;1;99999;0').split(";");
			for (var i=profiles.length-3; i>-1; i-=3) if (profiles[i+1]<date) profiles.splice(i, 3);
			_setValue('sui_profiles', profiles.join(";"));
			alert('Done!');
		}
		e.preventDefault();
	}, false);
}

function ProfilesAdd(i, j, id){	// add profile info
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://forums.steampowered.com/forums/member.php?u='+id,
		headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
		onload: function(e){
			if (e.readyState==4 && e.status!=200) return;
			
			var pr1, k= e.responseText.search(/\.com\/id\//);
			if (k<0){
				k= e.responseText.search(/\.com\/profiles\//);
				if (k<0){ profiles.splice(i, 0, id, date+7, 0); ProfilesFind(--j); return; }
				else { pr1= 'profiles/'; k+=14; }
			} else { pr1= 'id/'; k+=8; }
			
			var pr= e.responseText.substring(k, e.responseText.indexOf("<", k)).trim();
			if (pr.length==0){ profiles.splice(i, 0, id, date+7, 0); ProfilesFind(--j); return; }
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'https://steamcommunity.com/'+pr1+pr,
				headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
				onload: function(e){
					if (e.readyState==4 && e.status!=200) return;
					
					var k= e.responseText.indexOf('avatarFull');
					var img=0;
					if (k>0){
						k= e.responseText.indexOf('/avatars/', k+10)+9;
						img= e.responseText.substring(k, e.responseText.indexOf("_", k));
						Avatar(s[j], img);
					}
					profiles.splice(i, 0, id, date+7, img);
					ProfilesFind(--j);
				}
			});
		}
	});
}

function ProfilesFind(j){		// check profile info
	//	steam id	community id	date	image
	//	0			1				2		3
	if (j<0){ _setValue('sui_profiles', profiles.join(";")); return; }
	if (s[j].parentNode.nextSibling.nextSibling.getElementsByTagName('a').length>0){ ProfilesFind(--j); return; }		// moderators fix
	id= s[j].href.substring(51);
	
	var k= profiles.length/3;
	var n= Math.pow(2, Math.floor(Math.log(k)/Math.log(2)));
	var i= n-1;
	// if (DEBUG>0) console.log(j, k, n, id);
	while (1){
		n/=2;
		if (i>=k || id<profiles[i*3]){
			if (n<1){
				// if (DEBUG>0) console.log('a');
				ProfilesAdd(i*3, j, id);
				break;
			}
			i-= n;
		} else if (id>profiles[i*3]){
			if (n<1){
				// if (DEBUG>0) console.log('b');
				ProfilesAdd((i+1)*3, j, id);
				break;
			}
			i+= n;
		} else if (id==profiles[i*3]){
			// if (DEBUG>0) console.log('c');
			ProfilesUpdate(i*3, j);
			break;
		} //else console.log('error 1');
		// if (n<1  && DEBUG>0){console.log('error 2'); break; }
	}
}

function ProfilesUpdate(i, j){	// update existing profile info
	if (profiles[i+1]<date){
		profiles[i+1]= date+7;
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://forums.steampowered.com/forums/member.php?u='+profiles[i],
			headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
			onload: function(e){
				if (e.readyState==4 && e.status!=200) return;
				
				profiles[i+2]=0;
				var p1, k= e.responseText.search(/\.com\/id\//);
				if (k<0){
					k= e.responseText.search(/\.com\/profiles\//);
					if (k<0){ ProfilesFind(--j); return; }				// there isn't a community profile link in the sf profile
					else { k+=14; p1='profiles/'; }
				} else { k+=8; p1= 'id/'; }
				
				var id= e.responseText.substring(k, e.responseText.indexOf("<", k)).trim();
				if (id.length==0){ ProfilesFind(--j); return; }		// there isn't a community profile link in the sf profile
				
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'https://steamcommunity.com/'+id,
					headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'text/html' },
					onload: function(e){
						if (e.readyState==4 && e.status!=200) return;
						
						var k= e.responseText.indexOf('avatarFull');
						if (k>-1){
							k= e.responseText.indexOf('/avatars/', k+10)+9;
							profiles[i+2]= e.responseText.substring(k, e.responseText.indexOf("_", k));
							Avatar(s[j], profiles[i+2]);
						}
						ProfilesFind(--j);
					}
				});
			}
		});
	} else {
		if (profiles[i+2]!=0) Avatar(s[j], profiles[i+2]);
		ProfilesFind(--j);
	}
}

function SetPostCount(i){		// set post per page setting
	switch (i){
		case 0: i=15; break;
		case 1: i=5; break;
		case 2: i=10; break;
		case 3: i=20; break;
		case 4: i=30; break;
		default : i=40; break;
	}
	opt[POSTS_PER_PAGE]=i;
	_setValue('sui_options', opt.join(";"));
}

function Thread(){				// thread handler
	s= d.getElementsByClassName('spoiler');																			// spoiler tag fix
	for (var i=0; i<s.length; i++) s[i].setAttribute('style', 'color:black; background-color:black;');
	
	if (opt[SHOW_IMAGES]==1) Images();
	if (opt[TRACK_POSTS]==1) TracksLoad();
	
	var id= ThreadId();
	var user= d.getElementsByClassName('smallfont')[0].getElementsByTagName("a");									// scan this thread page for user posts
	user= user[0].textContent;
	s= d.getElementsByClassName('bigusername');
	last_user=0;
	
	if (opt[TRACK_POSTS]==1){
		for (var i=s.length-1; i>-1; i--){
			if (s[i].textContent==user){
				TracksFind(id, Number(s[i].parentNode.id.substring(9)));
				break;
			}
		}
	}
	
	if (opt[TRACK_POSTS]==1){
		TracksSave();
		d.getElementById('qr_submit').addEventListener('click', function(e){			// quick post button event listener
			var id= ThreadId();
			setTimeout(Catch, 250);
		}, false);
	}
	
	if (opt[SHOW_AVATAR]==1){
		date= Math.round(new Date().getTime()/1000/3600/24);
		profiles= _getValue('sui_profiles', '0;99999;0;1;99999;0').split(";");
		ProfilesFind(s.length-1);
	}
}

function ThreadId(){			// get thread id
	var id= d.getElementById('qr_threadid');
	if (id) id=id.value;
	else {
		id= document.URL;
		var j, i= id.indexOf('t=')+2;
		if (i>2){
			j= id.indexOf("&", i);
			if (j>0) id= id.substring(i, j);				// case multiple params in url
			else id= id.substring(i);
		} else {
			id= d.getElementsByClassName('form')[2].getAttribute('action').split('t=');		// thread id from post form
			id= id[id.length-1];
		}
	}
	return id;
}

function TracksFind(id, pid){	// check wether a specified thread is tracked 
	var k= tracks.length/2;
	var n= Math.pow(2, Math.floor(Math.log(k)/Math.log(2)));
	var i= n-1;
	while (1){
		n/=2;
		if (i>=k || id<tracks[i*2]){
			if (n<1){
				if (pid>0){
					tracks.splice(i*2, 0, id, pid);
					console.log('(1) You have posted in thread: '+id);
				}
				return 0;
			}
			i-=n;
		} else if (id>tracks[i*2]){
			if (n<1){
				if (pid>0){
					tracks.splice((i+1)*2, 0, id, pid);
					console.log('(2) You have posted in thread: '+id);
				}
				return 0;
			}
			i+=n;
		} else if (id==tracks[i*2]){
			if (pid>tracks[i*2+1]){
				tracks[i*2+1]= pid;
				console.log('(3) You have posted in thread: '+id);
			}
			return tracks[i*2+1];
		} //else { console.log('error 3'); return 0; }
		// if (n<1 && DEBUG>0){ console.log('error 4'); return 0; }
	}
}

function TracksLoad(){			// load tracked threads database
	tracks= _getValue('sui_tracks', '0;0;1;1').split(";");
}

function TracksSave(){			// save tracked threads database
	_setValue('sui_tracks', tracks.join(";"));
}

function _addStyle(style_){		// add style sheet to the document
	var s= d.createElement('style');
	s.textContent= style;
	d.getElementsByTagName('head')[0].appendChild(s);
}

function _checkFav(fave){		// check if a subforum is set as favorite
	if (_getValue('sui_favorites', '').indexOf(fave+";")>-1) return 1;
	return 0;
}

function _getValue(name, def){	//retrieve value
	var val= window.localStorage.getItem(name);
	if (val==null) val= def;
	return val;
}

function _setValue(name, val){	// store value
	window.localStorage.setItem(name, val);
}

