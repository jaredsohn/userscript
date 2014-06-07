// ==UserScript==
// @name          Favotter clearner
// @namespace     http://d.hatena.ne.jp/Pasta-K
// @description   Favotter without post favotted by person you want to quit.
// @include       http://favotter.matope.com/user.php?*
// ==/UserScript==

function getRequest(){

//this function is copy from 
//http://www.s-memo.net/blog/2007/03/javascriptget_1.php

  if(location.search.length > 1) {
    var get = new Object();
    var ret = location.search.substr(1).split("&");
    for(var i = 0; i < ret.length; i++) {
      var r = ret[i].split("=");
      get[r[0]] = r[1];
    }
    return get;
  } else {
    return false;
  }
}

function GetPager(pager){
	linkElem = new Array();
	for(i=0;i<pager.length;i++){
		elem=pager[i];
		a=elem.getElementsByTagName("a");
		for(f=0;f<a.length;f++){
			linkElem.push(a[f]);
		}
		
	}
	return linkElem
}

function DeletePost(q){
	entry=document.getElementsByClassName("entry xfolkentry hentry");

	for(i=0;i<entry.length;i++){
		favinfo = entry[i].getElementsByClassName("favotters");
		favicon = favinfo[0].getElementsByTagName("img");
		if(favicon.length == 1 & favicon[0].alt==q){
			console.log(entry[i])
			entry[i].innerHTML="";
		}
	};

}


(function(){
	get = getRequest();
	search=document.getElementById("search");
	form=search.getElementsByTagName("form")[0];
	q=get['q'];
	if(q == undefined){
		q="";
	}
	
	qbox=document.createElement("input");	//除外するユーザー名を入れるテキストボックス
	qbox.id="userform";
	qbox.className="userform text changed_userform";
	qbox.type="text";
	qbox.value=q;
	qbox.alt="Type quit username";
	qbox.name="q";
	
	qt=document.createElement("span");
	qt.textContent="Quit user";
	
	dt=document.createElement("span");
	dt.textContent="Display user";
	
	form.insertBefore(dt,form.getElementsByTagName("input")[0]);
	form.insertBefore(qbox,form.getElementsByTagName("input")[1]);
	form.insertBefore(document.createElement("br"),qbox);
	form.insertBefore(qt,form.getElementsByTagName("input")[1]);
	form.insertBefore(document.createElement("br"),form.getElementsByTagName("input")[2]);
	
	pager=GetPager(document.getElementsByClassName("pager"));
	for(i=0;i<pager.length;i++){
		pager[i].href+=("&q="+escape(q));
	}
	
	DeletePost(q);
	
})();