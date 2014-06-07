// ==UserScript==
// @name           GreaSDN 0.8
// @namespace      SDN
// @description    Greasemonkey scripts to make sdn.sap.com easier to use.
// @include        https://www.sdn.sap.com/irj/sdn/thread?*
// ==/UserScript==

/*
ifra = iframe
iht = document of the iframe
toplinks = the ul element holding the links at the top of the page
linkRow = the tr holding the reply and search forum links
*/
var ifra;
var iht;
var toplinks;
var linkRow;


/*
	Creates the form 
*/
window.createForm=function(){
	
	var form=iht.createElement("form");
	var forumID=getForumId();
	var postID=getPostId();
	var threadID=getParameter(queryString,"threadID");
	form.action="post!post.jspa?forumID="+forumID+
				   "&threadID="+threadID+
				   "&messageID="+postID+
				   "&reply=true";	
	form.method="post";
	form.name="postform";
	form.id="postform";
	form.onsubmit=validatePost(true);
	
	form.appendChild(createInput("hidden","threadID",threadID));
	form.appendChild(createInput("hidden","reply",true));	
	form.appendChild(createInput("hidden","messageID",postID));
	el=createInput("hidden","postedFromGUIEditor",true);	el.id="postTypeFlag";
	form.appendChild(el);

	form.appendChild(createLabel("subject","Subject: "));
	el=createInput("text","subject","Re: ");
	el.id="subject01";
	el.size="60";
	el.maxlength="75";
	el.tabindex="1";
	form.appendChild(el);
	
	
    form.appendChild(document.createElement("br"));
	form.appendChild(createLabel("body","Message: "));
	
	nd=document.createElement("div");
	nd.innerHTML='<textarea tabindex="2" cols="30" rows="20" id="textEditor"'+
				 ' name="body" style="height: 200px; width: 500px; border: solid 1px"/>';
	
	form.appendChild(nd);
	
	
	/*<input type="submit" tabindex="3" value="Post Message" name="doPost" id="postButton"/>
    * */
    el=createInput("submit","doPost","Post Message");
	el.id="postButton";
	el.tabindex="3";
	form.appendChild(el);
    
	newDiv=iht.createElement('div');
	newDiv.id="postFormDiv";
	addEl(newDiv,form);
	locn=iht.getElementsByClassName("jive-message-list")[0].parentNode.parentNode.parentNode.parentNode;
	locn.parentNode.insertBefore(newDiv,locn);
	
}


/*
	Adds the reply inline link 
*/
window.modifyReply=function(){
	
	var replyLink=iht.Get("jive-reply-thread");
	linkRow=replyLink.parentNode.parentNode;		
	
	var newItem=iht.createElement("td");
	newItem.className="jive-icon-label";

	var newLink=iht.createElement("a");
	newLink.innerHTML="Reply Inline";
	newLink.href="javascript:void(0)";
	newLink.addEventListener('click',showForm,false);
	
	addEl(newItem,newLink);
	addEl(linkRow,newItem);
		
	
};

window.showForm=function(){
		this.removeEventListener('click',arguments.callee,false);
		var r=iht.Get("postFormDiv");
		if(r)
			r.style.display="block";
		else
			createForm();
			
		this.addEventListener('click',hideForm,false);			
};

window.hideForm=function(){
	this.removeEventListener('click',arguments.callee,false);
	var r=iht.Get("postFormDiv");
	r.style.display="none";
	this.addEventListener('click',showForm,false);
};

/*
	Cleans the Javascript that prevents the page from being downloaded
*/
window.cleanScript=function(){
	r = iht.getElementsByTagName('script');
	p=r[0].parentNode;
	p.removeChild(r[0]);
	liStat=Create("li");
	liStat.innerHTML="Cleaned Up";
	addEl(toplinks,liStat);
}



/*
	The startup function
*/
window.winLoad=function(){
	getDocs();
	toplinks=Get('tln');
	cleanScript();
	modifyReply();
}

/*
	Appends a child to an element
*/
window.addEl=function(parentEl,childEl){
	parentEl.appendChild(childEl);
}
window.Create=function(typ){
	el=document.createElement('typ');
	return el;
}
window.Get=function(str){
	el=document.getElementById(str);
	return el;
}
window.getDocs=function(){
	ifra=document.getElementById("isolatedWorkArea");
	ifra.height="100%";
	iht=ifra.contentDocument;
	iht.Get=function(str){
		el=iht.getElementById(str);
		return el;
	}
}

window.validatePost=function(val){
//	STUB FUNCTION
	return 1;
}
window.createInput=function(type,name,value){
	var el=document.createElement("input");
	el.type=type;
	el.name=name;
	el.value=value;
	return el;
};
window.createLabel=function(forEl,text){
	var el=document.createElement("label");
	el.for=forEl;
	el.innwindow.validatePost=function(val){
//	STUB FUNCTION
	return 1;
}
window.createInput=function(type,name,value){
	var el=document.createElement("input");
	el.type=type;
	el.name=name;
	el.value=value;
	return el;
};
window.createLabel=function(forEl,text){
	var el=document.createElement("label");
	el.for=forEl;
	el.innerHTML=text;
	return el;
};erHTML=text;
	return el;
};
window.addEventListener('load',winLoad,false);


window.validatePost=function(val){
//	STUB FUNCTION
	return 1;
};
window.createInput=function(type,name,value){
	var el=document.createElement("input");
	el.type=type;
	el.name=name;
	el.value=value;
	return el;
};
window.createLabel=function(forEl,text){
	var el=document.createElement("label");
	el.for=forEl;
	el.innerHTML=text;
	return el;
};
window.getForumId=function(){
	var breadCrumb=iht.getElementById('jive-breadcrumbs');
	var string=breadCrumb.innerHTML;
	var offset=string.search(/forumID/);
	return getParameter(string.substring(offset),"forumID");
	
};

window.getPostId=function(){
	arr=iht.getElementsByClassName('jive-even');
	var postID=arr[0].id.substring(13);
	return postID;
};
var queryString = window.top.location.search.substring(1);

window.getParameter=function( queryString, parameterName ) {
	var parameterName = parameterName + "=";
	if ( queryString.length > 0 ) {
		begin = queryString.indexOf ( parameterName );
		if ( begin != -1 ) {
			begin += parameterName.length;
			end = queryString.indexOf ( "&" , begin );
			if ( end == -1 ) {
				end = queryString.length
			}
			return unescape ( queryString.substring ( begin, end ) );
		}
	return "null";
	}
} 
