// ==UserScript==
// @name        Bloquer un utilisateur wefrag
// @namespace   wefrag

// @include		http://www.wefrag.com/forums
// @include		http://www.wefrag.com/user/edit
// @include		http://www.wefrag.com/shouts
// @include 	http://www.wefrag.com/users/*
// @include		http://www.wefrag.com/forums/*/topics/*

// @match		http://www.wefrag.com/user/edit
// @match		http://www.wefrag.com/forums
// @match		http://www.wefrag.com/shouts
// @match		http://www.wefrag.com/users/*
// @match   	http://www.wefrag.com/forums/*/topics/*


// ==/UserScript==
(function(){
var gm_enabled;
	if (typeof GM_deleteValue == 'undefined') {
	gm_enabled = false;
    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }

    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
	GM_listValues = function(){
		keys = new Array();
		var j=0;
		for(var i=0;i<localStorage.length;i++){
			keys[j] = localStorage.key(i); 
			j++;
		}
		return keys;
	}
} else {
	gm_enabled = true;
}

var blackList, nbUser; 
nbUser = GM_getValue('nbUser');
//resetScript();

if((!nbUser) || (nbUser == 'undefined')){
	//console.log("no user");
	nbUser=0;
	GM_setValue('nbUser',0);
	blackList = new Array();
} else {
	blackList = new Array(nbUser);
}
	getBlackList(blackList);
	var hostname = document.location.host.split('.')[0];
	logBlackList(blackList);
	if(hostname == "www"){
		var url = document.location.pathname.split('/');
		if(url[3]=='topics'){
			hidePostsInTopic(blackList);
		}
		if(url[1]=='users'){
			addIgnoreButton();
		}
		
		if(((url[1]=='forums')&&(!url[2]))||url[1]=='shouts'){
			hidePostsInTribune(blackList);
		}
		
		if(url[1]=='user'){
			addBlackListToProfile(blackList);
		}
	} 

	function logBlackList(blackList){
		console.log("log blacklist: ");
		for(var i=0;i<blackList.length;i++){
			console.log(blackList[i]);
		}
		console.log('\n');
	}

	function addIgnoreButton(){
			var user = document.location.pathname.split('/')[2];
			var ignore = document.createElement('div');
			var isBlocked = false;
			for(var i=0;i<blackList.length;i++){
				if(blackList[i]==user){
					isBlocked = true;
				}
			}
			if(!isBlocked){
				ignore.innerHTML = '<a href="#" class="ignore" id="'+user+'">Ignorer ses messages</a>';
			} else {
				ignore.innerHTML = '<a href="#" class="show" id="'+user+'">Remontrer ses messages</a>';
			}
			document.getElementsByClassName('span-14')[0].appendChild(ignore);
			document.getElementById(user).addEventListener('click',function(e){
				var target = e.target;
				var user = target.id;
				if(target.className == "ignore"){
				
					target.innerHTML = "Remontrer ses messages";
					target.className ="show";
					var nbUser = GM_getValue("nbUser");
					var userKey = 'user'+nbUser;
					GM_setValue(userKey,user);
					var test = GM_getValue(userKey);
					GM_setValue("nbUser",nbUser+1);
					
				} else {
					target.innerHTML = "Ignorer ses messages";
					target.className ="ignore";
					var key = getUserKey(user);
					console.log("userKey = "+key);
					var nbUser = GM_getValue("nbUser");
					GM_setValue("nbUser",nbUser-1);
					GM_deleteValue(key);	
				}
			},true);
	}

	function addBlackListToProfile(blackList){
		var div = document.createElement('div'); 
		div.id	= 'blackListProfile';
		div.innerHTML="<br/><b>Liste d'utilisateurs bloqués:</b><br />";
		div.className ='span-20';
		//div.style.setProperty('margin-top','20px');
		//div.style.setProperty('height',blackList.length*10+'px');
		for(var i=0;i<blackList.length;i++){
			var user = document.createElement('div');
			user.innerHTML = '<a href="http://www.wefrag.com/users/'+blackList[i]+'">'+blackList[i]+'</a><br />';
			div.appendChild(user);
		}
		document.getElementById('body').getElementsByClassName('container')[0].getElementsByClassName('span-24')[2].getElementsByClassName('span-24')[0].appendChild(div);
}

	function getBlackList(blackList){
		var keys = GM_listValues();
		var j=0;
		for(var i=0; i<keys.length; i++){
			var key = keys[i];
			if(key.substr(0,2) != "nb"){
				var user = GM_getValue(key); 
				if(user && user!="undefined"){
					blackList[j]=user;
					j++;
					}
			}
		}
	}
	function hidePostsInTopic(blackList){
		var div = document.getElementsByClassName('user');
		for(var i=0;i<div.length;i++){
			var a = div[i].getElementsByTagName('a')[0];
			for(var j=0;j<blackList.length;j++){
				if(blackList[j]== a.innerHTML){
				a.parentNode.parentNode.parentNode.style.display = "none";
				}
			}
		}
	}
	function resetScript(){
		if(gm_enabled){
			var keys = GM_listValues();
			for(var i=0;i<keys.length;i++){
				GM_deleteValue(keys[i]);		
			}
		} else {
			localStorage.clear();
		}
	}
	function hidePostsInTribune(blackList){
		var div = document.getElementsByClassName('msg');
		for(var i=0;i<div.length;i++){
		
			var a = div[i].children[1].firstChild; 
			//console.log(a.innerHTML);
			for(var j=0;j<blackList.length;j++){
				if(blackList[j]== a.innerHTML){
				a.parentNode.parentNode.style.display = "none";
				}
			}
		}
	}
	function getUserKey(user){
		var keys = GM_listValues(); 
		for(var i=0;i<keys.length;i++){
			var key = keys[i];
			var val = GM_getValue(key);
			if(val == user){
				return key;
			}
		}
	}

	}());
