// ==UserScript==
// @name          TwitterClientGreaseMonkey
// @namespace     http://d.hatena.ne.jp/Pasta-K
// @description   It makes Twitter's home(http://twitter.com/home) like a Twitter Client software.
// @include       http://twitter.com/home
// @include       https://twitter.com/home
// @include       http://twitter.com/home?page=*
// @include       https://twitter.com/home?page=*
// @include       http://twitter.com/home?status=*
// @include       https://twitter.com/home?status=*
// ==/UserScript==
	function check_link(posttext){
		var reply=posttext.match(/@[\w]{1,}/g);
		if(reply){
			for(var i=0;i<reply.length;i++){
				u=reply[i].replace("@","");
				replylink=('@<a href="/'+u+'">'+u+'</a>');
				posttext=posttext.replace(reply[i],replylink);
			};
		};
		var url=posttext.match(/http[:|a-z|A-Z|.|\/|0-9|~|_|-]{1,}/g);
		if(url){
			for(var i=0;i<url.length;i++){
				urllink=('<a href="'+url[i]+'" target="_blank">'+url[i]+'</a>');
				posttext=posttext.replace(url[i],urllink);
			};
		};
		return posttext
	}
	
	function reply(username,postid,text){
		location.search=("?status="+escape(text)+"&in_reply_to="+username+"&in_reply_to_status_id="+postid)
	}
	
	function favorite(postid,action,fav,favimg){
		requrl=("http://twitter.com/favourings/"+action+"/"+postid+".xml");
		actreq=new XMLHttpRequest();
		actreq.open("GET",requrl,false);
		actreq.send(null);
		if(action=="create"){
			fav.innerHTML="remove fav";
			favFunc=refav(postid,"destroy",fav,favimg);
			fav.addEventListener("click", favFunc, false);
			favimg.src="http://assets0.twitter.com/images/icon_star_full.gif";
			
		}
		else if(action=="destroy"){
			fav.innerHTML="make fav";
			favFunc=refav(postid,"create",fav,favimg);
			fav.addEventListener("click", favFunc, false);
			favimg.src="";
		};
	}
	
	function refav(postid,action,fav,favimg){
		return function(){favorite(postid,action,fav,favimg);}
	};
	
	function setreload(last){
		return function(){reload(last);}
	}
	
	function reload(last){
		
		atom=document.evaluate('//link[@type="application/atom+xml"]',document,null,7,null);
		xmlurl=atom.snapshotItem(0).href;
		xmlhttp=new XMLHttpRequest();
		xmlhttp.open("POST",xmlurl,false);
		xmlhttp.send(null);
		resxml=xmlhttp.responseXML;
		entry=resxml.getElementsByTagName("entry");
		adddiv=document.createElement('div');
		for(i=0;i<entry.length;i++){
			e=entry[i];
			content=e.getElementsByTagName("content")[0].textContent;
			link=e.getElementsByTagName("link");
			author=e.getElementsByTagName("author");
			without=content.match(/[A-Z|a-z|_|0-9]{1,}:/);
			text=content.replace(without[0],"");
			if(i==0){
				reFunc=setreload(text);
			};
			chkl=encodeURI(last);
			if(encodeURI(text).match(chkl)){
				break;
			};
			
			
			sc=without[0].replace(/:/,"");
			name=author[0].childNodes[1].textContent;

			deletetext=("http://twitter.com/"+sc+"/status/");
			postid=link[0].attributes[2].textContent.replace(deletetext, "");
			
			
			pb=document.createElement('li');
			pb.id=("status_"+postid);
			pb.className=("hentry status u-"+sc)
			
			myname=document.getElementsByTagName("meta")[10].content;
			
			chkreply=("@"+myname);
			if(text.match(chkreply)){
				pb.style.backgroundColor="#FFB6C1";
			};
			
			vcard=document.createElement('span');
			vcard.className="thumb vcard author";
			
			url=document.createElement('a');
			url.className="url";
			url.href=("http://twitter.com/"+sc);
			
			img=document.createElement('img');
			img.style.width="48px";
			img.style.height="48px";
			img.src=(link[1].attributes[2].textContent);
			img.className="photo fn";
			img.ait=(name);
			
			url.appendChild(img);
			vcard.appendChild(url);
			
			statusb=document.createElement('span');
			statusb.className="status-body";
			
			st=document.createElement('strong');
			sca=document.createElement('a');
			sca.title=name;
			sca.className="screen-name";
			sca.href=("http://twitter.com/"+sc);
			sca.innerHTML=sc;
			
			st.appendChild(sca);
			statusb.appendChild(st);
			
			ec=document.createElement('span');
			ec.className="entry-content";
			ec.innerHTML=check_link(text);
			
			statusb.appendChild(ec);
			
			mem=document.createElement('span');
			mem.className="meta entry-meta";
			
			edata=document.createElement('a');
			edata.className="entry-date";
			edata.href=link[0].attributes[2].textContent;
			
			publ=document.createElement('span');
			publ.className="published";
			publ.innerHTML=e.getElementsByTagName("updated")[0].textContent;
			
			resp=document.createElement('span');
			
			retweentext=("RT:"+text+" (via @"+name+")");
			rt=document.createElement('a');
			rt.href="javascript:void(0)";
			f=closure(name, postid, retweentext);
			rt.addEventListener("click", f, false);
			rt.innerHTML="ReTweet";
			
			blank=document.createElement('span');
			blank.innerHTML=" ";
			
			repsp=document.createElement('span');
			re=document.createElement('a');
			re.innerHTML=("reply to "+sc);
			re.href="javascript:void(0)";
			repost=("@"+sc+" ");
			f=closure(sc, postid, repost);
			re.addEventListener("click", f, false);
			
			fav=document.createElement('a');
			fav.innerHTML="make fav";
			fav.href="javascript:void(0)";
			favimg=document.createElement('img');
			favFunc=refav(postid,"create",fav,favimg);
			fav.addEventListener("click", favFunc, false);
			favsp=document.createElement('span');
			
			favsp.appendChild(fav);
			favsp.appendChild(favimg);
			
			repsp.appendChild(re);
			
			resp.appendChild(rt);
			edata.appendChild(publ);
			
			mem.appendChild(edata);
			mem.appendChild(blank);
			mem.appendChild(resp);
			mem.appendChild(blank);
			mem.appendChild(repsp);
			mem.appendChild(blank);
			mem.appendChild(favsp);
			
			statusb.appendChild(mem);
			
			pb.appendChild(vcard);
			pb.appendChild(statusb);
			
			adddiv.appendChild(pb);
			
		};
		tl=document.getElementById("timeline");
		tl.insertBefore(adddiv,tl.firstChild);
		time=parseInt(document.getElementById("reloadtime").value)*1000;
		setTimeout(reFunc, time);
	}
	function autoload(last){
		clearTimeout();
		time=parseInt(document.getElementById("reloadtime").value)*1000;
		reFunc=setreload(last);
		setTimeout(reFunc, time);
	}
	
	function closure(username, postid, retweentext){
 	return function(){reply(username, postid, retweentext);}
	}
	
(function(){
	
	tl=document.getElementById("timeline");
	postblock=tl.getElementsByTagName("li");
	for(i=0;i<postblock.length;i++){
		statusbody=postblock[i].getElementsByClassName("status-body")[0];
		post=statusbody.getElementsByClassName("entry-content")[0].textContent;
		username=statusbody.getElementsByClassName("screen-name")[0].textContent;
		metaspace=statusbody.getElementsByClassName("meta entry-meta")[0];
		retweentext=("RT:"+post+" (via @"+username+")");
		rt=document.createElement('a');
		rt.href="javascript:void(0)";
		postid=postblock[i].id.replace("status_","");
		var f = closure(username, postid, retweentext);
		rt.addEventListener("click", f, false);
		rt.innerHTML="ReTweet";
		blank=document.createElement('span');
		blank.innerHTML=" ";
		rt.appendChild(blank);
		metaspace.appendChild(rt);
	}
	new_sb=postblock[0].getElementsByClassName("status-body")[0];
	newpost=new_sb.getElementsByClassName("entry-content")[0].textContent;
	last=newpost;
	
	selectHtml =<select id="reloadtime">
					<option value="15">15sec</option>
					<option value="30">30sec</option>
					<option value="60">1min</option>
					<option value="90">1.5min</option>
					<option value="180">3min</option>
					<option value="300">5min</option>
				</select>;
	
	selectElem=document.createElement('spam');
	selectElem.innerHTML=("更新頻度："+selectHtml);
	barElem=document.getElementsByClassName("bar")[0];
	barElem.insertBefore(selectElem,barElem.firstChild);
	selectElem.addEventListener("change", autoload , false);
	
	autoload(last);

})();