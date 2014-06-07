// ==UserScript==
// @name           twitter mod
// @namespace      http://twitter.com/joshyu
// @description    little script to change your traveling experince on twitter.
// @include        http://twitter.com/home
// ==/UserScript==


var aList=null;  //point to the listbox
//GM_setValue("storedValue","");
var strData= decodeURIComponent(GM_getValue("storedValue"))||""; 
var textBox= document.getElementById("status")|| document.getElementById("text");
var win = unsafeWindow;
win.textBox=textBox;
var lastViewedProfile= {}; //cache all last viewed profiles..
var lastHide=[]; //contents last hidden...
var thumbPointer=[];  // used to point out which thumb is clicked to show the friend list.
var nowWatching=null;  //watch whose timeline...
var followers=[]; //arr for holding followers;
var friends={};   //holding friends;
var d= [];// for holding input data..
var specific_user={withFriends:false};  //view specific user' timeline and store the data for further use.

var dragObject=null;


// loading Indicator
var data = 'data:image/gif;base64,'+
    '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'+
    'YwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==';

var loading = document.createElement('img');
loading.src = data;


//from twitter fan wiki..  Javascript by Mike Demers
function relative_time(time_value) {
   var parsed_date = Date.parse(time_value);

   var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
   var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);

   if(delta < 60) {
       return 'less than a minute ago';
   } else if(delta < 120) {
       return 'about a minute ago';
   } else if(delta < (45*60)) {
       return (parseInt(delta / 60)).toString() + ' minutes ago';
   } else if(delta < (90*60)) {
       return 'about an hour ago';
   } else if(delta < (24*60*60)) {
       return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
   } else if(delta < (48*60*60)) {
       return '1 day ago';
   } else {
       return (parseInt(delta / 86400)).toString() + ' days ago';
   }
}

win.relative_time=relative_time;

function viewProfile(view,url){
	view.innerHTML = '';

	if(lastViewedProfile[url]){
		view.innerHTML= lastViewedProfile[url];
		return;
	}

	view.appendChild(loading.cloneNode(false));

    GM_xmlhttpRequest
    ({
         method:'GET',
         url: url,
         onload:function(httpObj){
			var d = document.createElement('div');
			d.innerHTML = httpObj.responseText;
			view.innerHTML = '';
			addProfile(view,".//div[@id='side']/descendant::ul",d);
			d.innerHTML="";
			lastViewedProfile[url]=view.innerHTML;
	     }
    });
}

win.viewProfile= viewProfile;

function addProfile(view,path, d,func){
	var res= document.evaluate(path,d,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for(var i=0;i<res.snapshotLength;i++){
		var item=res.snapshotItem(i);
		if(func!=null)
			item= func(item);
		view.appendChild(item);
	}	
}



function saveData_and_updateList(str)
{
	if(str== "") return;

	var strDate= new Date().toUTCString();

	var splitter= strData==""?"":"$$$";
	strData+= splitter+ strDate+ ":::"+encodeURIComponent(str);
	GM_setValue("storedValue",strData);

	var aItem= document.createElement('option');
	aItem.setAttribute('value',str);
	aItem.appendChild(document.createTextNode(strDate));
	aList.appendChild(aItem);

}

//before form is submitted,save the value of textarea.
function intercept_form_onsubmit()
{
	var theForm= document.getElementById("doingForm");
	if(theForm== null) return;
	
	theForm.addEventListener("submit",function(e){
		saveData_and_updateList(textBox.value);
	},true);
}


//use gm_getvalue to fetchdata to select ...
function fetchDataToList(){
	aList= document.createElement('select');
	aList.setAttribute("style","display:inline");
	aList.addEventListener("change",function(e){
			textBox.value=e.target.childNodes[e.target.selectedIndex].value;

		},true);

	var aItem= document.createElement('option');
	aItem.setAttribute('value',"");
	aItem.appendChild(document.createTextNode("===select history Data==="));
	aList.appendChild(aItem);

	
	if(strData!="")
	{
		var arrData= strData.split("$$$");

		for(var i=0;i< arrData.length;i++){
			aItem= document.createElement('option');
			var arrPair= arrData[i].split(":::");
			aItem.setAttribute('value',arrPair[1]);
			aItem.appendChild(document.createTextNode(arrPair[0]));		
			aList.appendChild(aItem);

		}	
	}

	return aList;
}

// the function add select option mod to the page in order to store last changed words.
function addStoredDataList(){

	var submitDIV= document.evaluate("//form[@id='doingForm']//div[@class='submit']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	if(submitDIV==null || submitDIV.snapshotLength==0) return;

	submitDIV.snapshotItem(0).appendChild(fetchDataToList());
	var but= document.createElement("input");
	but.setAttribute("type","button");
	but.setAttribute("style","margin-left:6px");
	but.setAttribute("id","clear_history");
	but.setAttribute("value","clear history");
	but.addEventListener("click",function(e){
		if(!confirm("do you confirm? no undo!"))
			return;

		GM_setValue("storedValue","");
		strData="";
		aList.innerHTML="";

		var aItem= document.createElement('option');
		aItem.setAttribute('value',"");
		aItem.appendChild(document.createTextNode("===select history Data==="));		
		aList.appendChild(aItem);

	},true);
	submitDIV.snapshotItem(0).appendChild(but);
}

// the function add click event to every friends' link.
function handleContactLinkEvents(){

	var contactLinks= document.evaluate("//div[@id='side']//a[@rel='contact']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if(contactLinks==null) return;

	for(var i=0;i<contactLinks.snapshotLength;i++){
		contactLinks.snapshotItem(i).addEventListener("click",function(e){
			InsertProfileDIV(e.target,e.target.href);
			e.preventDefault();
		},true);

		contactLinks.snapshotItem(i).addEventListener("draggesture",function(e){
			dragObject= this;
		},true);

	}
}
//isProfileShown
function InsertProfileDIV(obj,strURL){
	//avoid click on img.
	if(obj.tagName!="A") return;

	var viewProfileDIV = document.createElement('div')
	viewProfileDIV.setAttribute("id",strURL);
	viewProfileDIV.setAttribute("class","profileDIV");
	with(viewProfileDIV.style){
		width = "120px";
		backgroundColor = "#fff";
		color = "#000";
		padding = "7px";
		border = "1px solid #666";
	};

	var isProfileShown= obj.getAttribute("isProfileShown");
	var PROFILE_STATE={HIDDEN:0,SHOWN:1};

	if(isProfileShown==PROFILE_STATE.SHOWN){
		viewProfileDIV= document.getElementById(strURL);
		if(viewProfileDIV==null) return;
		obj.parentNode.removeChild(viewProfileDIV);
		obj.setAttribute("isProfileShown",PROFILE_STATE.HIDDEN);

	}else{
		obj.parentNode.insertBefore(viewProfileDIV,obj.nextSibling);
		viewProfile(viewProfileDIV,strURL);
		obj.setAttribute("isProfileShown",PROFILE_STATE.SHOWN);
	}
}

function appendFollowerList(){
	var friendlist= document.getElementById("friends");
	if(friendlist==null) return;

	var followerlist= document.createElement("div");
	followerlist.setAttribute("id","followers");

	var fhead=document.createElement("div");
	fhead.appendChild(document.createTextNode("follower list"));
	fhead.innerHTML="follower list  <div style='font-size:10px;text-align:right;margin:2px 5px 7px 0px;'><a style=\"color:#555\" onclick=\"return confirm('Are you sure?  There is no undo.');\" href=\"/followers/befriend_all\">add them all as friends?</a></div>";

	followerlist.appendChild(fhead);
	followerlist.appendChild(loading.cloneNode(false));
	friendlist.parentNode.appendChild(followerlist);

	var jsonRes= document.createElement("script");
	jsonRes.setAttribute("type","text/javascript");
	jsonRes.setAttribute("id","flscript");	jsonRes.setAttribute("src","http://twitter.com/statuses/followers.json?callback=drawFollowerList");

	friendlist.parentNode.appendChild(jsonRes);
}

//draw friend's friend list..
win.drawFfList= function(jsonRes){
	var fflist= thumbPointer.shift();
	if(fflist==null) return;

	fflist.innerHTML="";
	var fItem=null;
	var fImg= null;

	for(var i=0;i<jsonRes.length;i++){
		fItem= document.createElement("a");
		fItem.setAttribute("style","padding:2px");
		fItem.setAttribute("title",jsonRes[i].name);
		fItem.setAttribute("url",jsonRes[i].url);
		fItem.setAttribute("location",jsonRes[i].location);
		fItem.setAttribute("status_time",jsonRes[i].status.created_at);
		fItem.setAttribute("status_text",encodeURIComponent(jsonRes[i].status.text));
		fItem.setAttribute("uid",jsonRes[i].id);
		fItem.setAttribute("href","http://twitter.com/"+jsonRes[i].screen_name);
		fItem.addEventListener("click",function(e){
			var uid= this.getAttribute("uid");
			drawSpecificTimeline(uid);
			//nowWatching=this;
			e.preventDefault();
		},true);

		fImg= document.createElement("img");
		fImg.setAttribute("alt",jsonRes[i].screen_name);
		fImg.setAttribute("width",24);
		fImg.setAttribute("height",24);
		fImg.setAttribute("style","border:1px solid #aaa;padding:1px");
		fImg.setAttribute("src",jsonRes[i].profile_image_url);
		fItem.appendChild(fImg);
		fflist.appendChild(fItem);
	}

}

function drawSpecificTimeline(uid,withFriends,loadMainTimeline){
	var jsonRes= document.createElement("script");
	jsonRes.setAttribute("type","text/javascript");
	specific_user.withFriends=withFriends;
	specific_user.loadMainTimeline=loadMainTimeline;
	var strMid=withFriends?"friends_timeline":"user_timeline";

	jsonRes.setAttribute("src","http://twitter.com/statuses/"+strMid+"/"+uid+".json?callback=viewTimeline");

	document.getElementsByTagName("head")[0].appendChild(jsonRes);
}

win.drawSpecificTimeline=drawSpecificTimeline;


win.viewTimeline=function(jsonRes){
	var h2Tag= document.getElementsByTagName("h2")[0];	
	var filterTag= document.getElementById("filterbylist");
	var timelineTable= document.getElementById("timeline");

	if(filterTag)
		filterTag.innerHTML="filter by <img width='24px' src='"+jsonRes[0].user.profile_image_url+"'/>";

	
	if(specific_user.loadMainTimeline){
		h2Tag.innerHTML='What You And Your <a href="/friends">Friends</a> Are Doing';
	}else{

		if(!specific_user.withFriends){
			specific_user.titlename=jsonRes[0].user.name;
			specific_user.scrname=jsonRes[0].user.screen_name;
			specific_user.image=jsonRes[0].user.profile_image_url;
	     }

		h2Tag.innerHTML="current Watching <a title='"+specific_user.titlename+"' href='http://twitter.com/"+specific_user.scrname+"'><img width='24px' src='"+specific_user.image+"'/></a> 's timeline"+(specific_user.withFriends?" with friends":"")+"<a onclick=\"viewProfile(this.nextSibling,'http://twitter.com/"+jsonRes[0].user.screen_name+"');Effect.toggle(this.nextSibling,'blind')\" style='cursor: pointer; font-size: 13px; margin-left: 5px;'>view Profile</a><div style='text-align:center;border: 1px solid rgb(238, 238, 170); background-color: rgb(255, 255, 238); -moz-border-radius-topleft: 1.8em; -moz-border-radius-topright: 0.1em; -moz-border-radius-bottomright: 1.8em; -moz-border-radius-bottomleft: 0.1em; font-size: 11px; position: absolute; left: 200px; width: 200px;padding:8px;display:none'></div>";

		if(!specific_user.withFriends){
			//specific_user.withFriends=true;
			h2Tag.innerHTML+="<a style='cursor: pointer; font-size: 13px; margin-left: 8px;' onclick='drawSpecificTimeline("+jsonRes[0].user.id+",true)'>timeline with friends</a>";
		}
		
		if(!friends[jsonRes[0].user.screen_name]){
			h2Tag.innerHTML+= "<a href='http://twitter.com/friendships/create/"+jsonRes[0].user.id+"' style='font-size: 13px; margin-left: 5px;'>add as friend</a>";
		}
	}	

	timelineTable.innerHTML="";
	arrHTML=[];
	for(var i=0;i<jsonRes.length;i++){
		arrHTML.push("<tr id='status_"+jsonRes[i].id+"' class='"+(i%2?"even":"odd")+"'><td class='thumb vcard author'><a href='http://twitter.com/"+jsonRes[i].user.screen_name+"'><img src='"+jsonRes[i].user.profile_image_url+"'/></a></td><td><strong><a title='"+jsonRes[i].user.name+"' href='http://twitter.com/"+jsonRes[i].user.screen_name+"'>"+jsonRes[i].user.name+"</a></strong>"+ jsonRes[i].text+"<span class='meta'><a href='http://twitter.com/"+jsonRes[i].user.screen_name+"/statuses/"+jsonRes[i].id+"'>"+relative_time(jsonRes[i].created_at)+"</a><span id='status_actions_"+jsonRes[i].id+"'><a onclick='new Ajax.Request(\"/favourings/create/"+jsonRes[i].id+"\", {asynchronous:true,evalScripts:true,onLoading:function(request){$(\"status_star_"+jsonRes[i].id+"\").src=\"/images/icon_throbber.gif\"}}); return false;' href='#'><img border='0' src='http://assets2.twitter.com/images/icon_star_empty.gif?1176426535' id='status_star_"+jsonRes[i].id+"' alt='Icon_star_empty'/></a></span></span></td></tr>");
	}

	timelineTable.innerHTML+="<tbody>"+arrHTML.join("")+"</tbody>";

	var contentTD= document.evaluate("//table[@id='timeline']//td[not(@class='thumb')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for(var i=0;i<contentTD.snapshotLength;i++){
		var tdTag= contentTD.snapshotItem(i).childNodes[1];
		if(tdTag.textContent.match(/(http:\/\/[^\s\)]*)/)){
			var link= RegExp.$1;
			var strTail= link.length>25?"...":"";
			tdTag.textContent=tdTag.textContent.replace(link,"<a href='"+link+"'>"+link.substr(0,25)+strTail+"</a>");
		}

		if(tdTag.textContent.match(/^@([\w]+)/)){
			var link= RegExp.$1;
			tdTag.textContent=tdTag.textContent.replace(link,"<a onclick='drawSpecificTimeline("+'"'+link+'"'+");event.preventDefault();' href='"+link+"'>"+link+"</a>");

		}
			var tmpSpan= document.createElement("span");
			tmpSpan.innerHTML=tdTag.textContent;
			tdTag.parentNode.replaceChild(tmpSpan,tdTag);
	}


	var head=document.getElementsByTagName("head")[0];
	head.removeChild(head.lastChild);

	//clickTimeLineThumbToShowMoreInfomation();
}

win.drawFeaturedList=function(jsonRes){
	var friendlist= document.getElementById("featured-timeline-thumbs");
	if(friendlist==null) return;

	friendlist.innerHTML="";
	var fItem=null;
	var fImg= null;

	for(var i=0;i<jsonRes.length;i++){
		fItem= document.createElement("a");
		fItem.setAttribute("title",jsonRes[i].name);
		fItem.setAttribute("uid",jsonRes[i].id);
		fItem.setAttribute("href","http://twitter.com/"+jsonRes[i].screen_name);
		fItem.addEventListener("click",function(e){
			nowWatching= this;
			drawSpecificTimeline(this.getAttribute("uid"));
			e.preventDefault();
		},true);

		fImg= document.createElement("img");
		fImg.setAttribute("width",24);
		fImg.setAttribute("height",24);
		fImg.setAttribute("src",jsonRes[i].profile_image_url);
		fItem.appendChild(fImg);
		friendlist.appendChild(fItem);
	}	
}

win.drawFriendtimelineThumbs=function(jsonRes){
	var friendlist= document.getElementById("friends-timeline-thumbs");
	if(friendlist==null) return;

	friendlist.innerHTML="";
	var fItem=null;
	var fImg= null;

	for(var i=0;i<jsonRes.length;i++){
		fItem= document.createElement("a");
		fItem.setAttribute("title",jsonRes[i].name);
		fItem.setAttribute("uid",jsonRes[i].id);
		fItem.setAttribute("href","http://twitter.com/"+jsonRes[i].screen_name);
		fItem.addEventListener("click",function(e){
			drawSpecificTimeline(this.getAttribute("uid"));
			e.preventDefault();
		},true);

		fImg= document.createElement("img");
		fImg.setAttribute("width",24);
		fImg.setAttribute("height",24);
		fImg.setAttribute("src",jsonRes[i].profile_image_url);
		fItem.appendChild(fImg);
		friendlist.appendChild(fItem);

		friends[jsonRes[i].screen_name]= {id:jsonRes[i].id,lastDate:jsonRes[i].status.created_at};
		//addFriendPrompts(jsonRes[i].screen_name);
	}
	
	addTimeStamptoSidebar();
	addKeyboardShortcut();
}




//draw follower list...
win.drawFollowerList=function(jsonRes){
	var flist= document.getElementById("followers");
	if(flist==null) return;
	flist.removeChild(flist.getElementsByTagName("img")[0]);
	var fItem=null;
	var fImg= null;

	for(var i=0;i<jsonRes.length;i++){
		fItem= document.createElement("a");
		fItem.setAttribute("title",jsonRes[i].name);
		fItem.setAttribute("rel","contact");
		fItem.setAttribute("href","http://twitter.com/"+jsonRes[i].screen_name);

		fImg= document.createElement("img");
		fImg.setAttribute("width",24);
		fImg.setAttribute("height",24);
		fImg.setAttribute("src",jsonRes[i].profile_image_url);
		fItem.appendChild(fImg);

		followers.push({scrname:jsonRes[i].screen_name,thumb:jsonRes[i].profile_image_url});

		flist.appendChild(fItem);
	}

	var thescript= document.getElementById("flscript");
	thescript.parentNode.removeChild(thescript);

	appendLittleSidebar();
	handleContactLinkEvents();
	addTimelineBanner();
}


function twitter_userscripts_DIV(){
	var tuDIV= document.createElement("div");
	tuDIV.setAttribute("id","twitter_userscript_container");
	tuDIV.appendChild(loading.cloneNode(false));

	GM_xmlhttpRequest
    ({
         method:'GET',
         url: "http://userscripts.org/scripts/search?q=twitter",
         onload:function(httpObj){
			var d = document.createElement('div');
			d.innerHTML = httpObj.responseText;
			tuDIV.innerHTML = '';
			addProfile(tuDIV,".//td[@class='script-meat']",d,function(e){
				var linkss= e.getElementsByTagName("a");
				for(var i=0;i<linkss.length;i++){
					linkss[i].setAttribute("href","http://userscripts.org"+linkss[i].getAttribute("href"));
				}

				return e;
			});

			d.innerHTML="";
	     }
    });

	return tuDIV;
}

function appendLittleSidebar(){
	var sidebar= document.getElementById("side");
	var lsidebar= document.createElement("div");
	lsidebar.setAttribute("id","littlesidebar");
	lsidebar.appendChild(twitter_userscripts_DIV()); //generate div of userscript...
	var insertPoint=sidebar.nextSibling.nextSibling;
	sidebar.parentNode.insertBefore(lsidebar,insertPoint);
	sidebar.parentNode.insertBefore(document.createElement("hr"),insertPoint);
}

function filterBy(onlyYou,aThumbURL){
	
	while(lastHide.length){
		lastHide.shift().style.display="";  //!!!!!!!!!!!!!!!! so daaaaaaa
	}

	if(!aThumbURL){
		return;
	}
	var hrefPre= onlyYou?"!=":"=";

	var thumbs= document.evaluate("//td[@class='thumb']/a[@href"+hrefPre+"'"+aThumbURL+"']/ancestor::tr",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	for(var i=0;i<thumbs.snapshotLength;i++){
		thumbs.snapshotItem(i).style.display="none";
		if(onlyYou) 
			lastHide.push(thumbs.snapshotItem(i));
	}	
}

win.filterBy= filterBy;

function clickTimeLineThumbToShowMoreInfomation(ulink){
			var target=ulink;

			var targetTR= target.parentNode.parentNode;
			var FFLIST_STATE={HIDDEN:0,SHOWN:1};
			var isFFListShown= targetTR.getAttribute("isFFListShown");

			if(isFFListShown== FFLIST_STATE.SHOWN){
				var fflistTD= document.getElementById(target.href);
				if(fflistTD==null) return false;
				targetTR.parentNode.removeChild(fflistTD);
				targetTR.setAttribute("isFFListShown",FFLIST_STATE.HIDDEN);
				return false;
			}

			targetTR.setAttribute("isFFListShown",FFLIST_STATE.SHOWN);

			//add friend list below..
			var trTag= document.createElement("tr");
			trTag.setAttribute("id",target.href);
			var tdTag= document.createElement("td");
			tdTag.setAttribute("style","vertical-align:top;border-right:1px dashed #777;background-color:#eee");

			var viewTimelineTag= document.createElement("button");
			viewTimelineTag.setAttribute("style","margin:5px 6px;padding:0px 9px");
			viewTimelineTag.appendChild(document.createTextNode("@timeline"));
			
			viewTimelineTag.setAttribute("onclick",'var linkTags= this.parentNode.nextSibling.getElementsByTagName("a");for(var i=linkTags.length-1;i>=0;i--){if(linkTags[i].nextSibling && linkTags[i].nextSibling.getAttribute("class") && linkTags[i].nextSibling.getAttribute("class").indexOf("ff_timeline")>=0)break;var insertPt=linkTags[i].nextSibling;var spanTag=document.createElement("span");linkTags[i].parentNode.insertBefore(spanTag,insertPt);spanTag.setAttribute("style","font-size:9px;font-family:verdana;color:red;background-color:rgb(255, 253, 243);padding:1px 6px");spanTag.setAttribute("class","ff_timeline");var urll=linkTags[i].getAttribute("url")||"";var uid=spanTag.previousSibling.getAttribute("uid");spanTag.innerHTML=(urll==""?"":"<a target=_blank href='+"'"+'"+urll+"'+"'"+' style='+"'"+'margin-right: 5px;'+"'"+'>"+urll.substr(0,24)+"</a>")+relative_time(linkTags[i].getAttribute("status_time"))+"<a target=_blank href='+"'"+'http://twitter.com/friendships/create/"+uid+"'+"'"+' style='+"'"+'margin-left:5px;'+"'"+'>add me</a>";spanTag=document.createElement("div");spanTag.setAttribute("style","background-color:#eee;padding:6px ;margin: 5px;vertical-align:top;font-size:12px;font-family:verdana");var strStatus=decodeURIComponent(linkTags[i].getAttribute("status_text"));spanTag.innerHTML=strStatus.replace(/(http:[^\\s]+)/g,"<a href=$1>$1</a>");linkTags[i].parentNode.insertBefore(spanTag,insertPt);};this.disabled=true');
			tdTag.appendChild(viewTimelineTag);

			tdTag.innerHTML+="<input type='text' size=5 onkeypress=\"if(event.which==13 && this.value.match(/[^\s]+/)){this.nextSibling.click();}\" onblur=\"this.size=3\" onfocus=\"this.size=7\"/>";

			var inputTag= document.createElement("button");
			inputTag.setAttribute("style","margin:5px 6px;padding:0px 9px");
			inputTag.appendChild(document.createTextNode("@_@"));

			tdTag.appendChild(inputTag);
			trTag.appendChild(tdTag);

			inputTag.addEventListener("click",function(e){
				var lastPos=parseInt(this.getAttribute('last'))||-1;
				var arrMatch=[];
				var drawn=false;
				var pnv=this.parentNode.firstChild.value;

				var lastElem= this.parentNode.lastChild;
				if(lastElem.tagName=="DIV"){
					this.parentNode.removeChild(lastElem);						
				}

				var nn=this.parentNode.nextSibling.getElementsByTagName('a');			
				for(var i=0;i<nn.length;i++){
					var linkStr=nn[i].href.toLowerCase().match(/^http:\/\/twitter.com\/(.*)/)[1];
					if(linkStr.indexOf(pnv)>=0){
						arrMatch.push(i);
						if(drawn) continue;
						if(lastPos>=0 && lastPos!=i)
							nn[lastPos].setAttribute('style','background-color:#fff');	

						this.setAttribute('last',i);
						

						var linkTag=document.createElement("div");
						linkTag.setAttribute("style","margin:4px 10px 8px 8px;");
						linkTag.appendChild(nn[i].cloneNode(true));
						nn[i].setAttribute('style','padding:2px;background-color:#FF00FF');

						inputTag.parentNode.appendChild(linkTag);

						drawn=true;
					}
				}

				if(arrMatch.length>1){
					
					var divTag= document.createElement("div");
					divTag.setAttribute("style","font-size:10px;padding:5px");			
					divTag.setAttribute("arrMatch",arrMatch.join("$$"));
					divTag.setAttribute("nowPos",0);
					divTag.innerHTML= "1:"+arrMatch.length+" matches";

					var leftLink= document.createElement("a");
					leftLink.setAttribute("onclick","var arr= this.parentNode.getAttribute('arrMatch').split('$$');var pos=this.parentNode.getAttribute('nowpos');if(pos>0){var links=this.parentNode.parentNode.nextSibling.getElementsByTagName('a');links[arr[pos]].setAttribute('style','background-color:#fff');this.parentNode.setAttribute('nowpos',--pos);var linkTag= this.parentNode.previousSibling;linkTag.replaceChild(links[arr[pos]].cloneNode(true),linkTag.firstChild);links[arr[pos]].setAttribute('style','padding:2px;background-color:#ff00ff');this.parentNode.firstChild.textContent=pos+1+':'+arr.length+' matches';this.parentNode.previousSibling.setAttribute('last',arr[pos]);}");
					leftLink.setAttribute("style","cursor:pointer;margin-right:6px");
					leftLink.appendChild(document.createTextNode("<<"));


					var rightLink= document.createElement("a");
					rightLink.setAttribute("onclick","var arr= this.parentNode.getAttribute('arrMatch').split('$$');var pos=this.parentNode.getAttribute('nowpos');if(pos<arr.length-1){var links=this.parentNode.parentNode.nextSibling.getElementsByTagName('a');links[arr[pos]].setAttribute('style','background-color:#fff');this.parentNode.setAttribute('nowpos',++pos);var linkTag= this.parentNode.previousSibling;linkTag.replaceChild(links[arr[pos]].cloneNode(true),linkTag.firstChild);links[arr[pos]].setAttribute('style','padding:2px;background-color:#ff00ff');this.parentNode.firstChild.textContent=pos+1+':'+arr.length+' matches';this.parentNode.previousSibling.setAttribute('last',arr[pos]);}");
					rightLink.setAttribute("style","cursor:pointer");
					rightLink.appendChild(document.createTextNode(">>"));

					divTag.appendChild(leftLink);
					divTag.appendChild(rightLink);

					this.parentNode.appendChild(divTag);

				}

			},true);



			var fflist= document.createElement("td");
			fflist.setAttribute("style","vertical-align:top");

			fflist.appendChild(loading.cloneNode(false));
			trTag.appendChild(fflist);
			thumbPointer.push(fflist);

			targetTR.parentNode.insertBefore(trTag,targetTR.nextSibling);

			var friendname= target.href.substring(target.href.lastIndexOf("/")+1);		
			var jsonRes= document.createElement("script");

			jsonRes.setAttribute("type","text/javascript");			jsonRes.setAttribute("src","http://twitter.com/statuses/friends/"+friendname+".json?callback=drawFfList");

			fflist.appendChild(jsonRes);
//			targetTR.parentNode.insertBefore(jsonRes,targetTR.nextSibling);	
}

function loadFilterList(divTag){
	divTag.appendChild(document.createTextNode("filter by "));
	divTag.setAttribute("class","timeline-banner thumb_banner_container");

	var thumbs= document.evaluate("//table[@id='timeline']//td[@class='thumb']/a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	var arrUniqueThumbs={};

	for(var i=0;i<thumbs.snapshotLength;i++){
		if(arrUniqueThumbs[thumbs.snapshotItem(i).href]!=null)
			continue;
		
		arrUniqueThumbs[thumbs.snapshotItem(i).href]=0;
		var aThumb=thumbs.snapshotItem(i).cloneNode(true);
		divTag.appendChild(aThumb);
		aThumb.addEventListener("click",function(e){
			var target= e.target;
			if(target.tagName=="IMG") target=target.parentNode;
			filterBy(true,target.href);
			e.preventDefault();

		},true);
	}

	var reloadLink= document.createElement("a");
	reloadLink.setAttribute("style","margin-left:6px;cursor:pointer");
	reloadLink.addEventListener("click",function(e){
		divTag.innerHTML="";
		filterBy(true);
		loadFilterList(divTag);
		e.preventDefault();
	},true);

	reloadLink.appendChild(document.createTextNode("refresh list"));
	divTag.appendChild(reloadLink);

	return divTag;
}


function addTimelineBanner(){
	if(document.getElementById("timeline")==null)
		return;

	var flInsertTag= document.evaluate("//table[@id='timeline']/ancestor::div[@class='tab']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	if(flInsertTag && flInsertTag.snapshotLength>0) 
		flInsertTag= flInsertTag.snapshotItem(0).firstChild;


	var ctrlLink= document.createElement("a");
	ctrlLink.setAttribute("style","cursor:pointer;margin-right:8px");
	ctrlLink.appendChild(document.createTextNode("open panel"));
	ctrlLink.setAttribute("onclick",""+
    "  var node= document.getElementById('bannerRoom');"+
	"  this.textContent=node.style.display=='none'?'close banner':'open banner';"+
	"Effect.toggle(node,'blind');");	

	flInsertTag.parentNode.insertBefore(ctrlLink,flInsertTag);

	var resetLink= document.createElement("a");
	resetLink.setAttribute("style","cursor:pointer;margin-right:8px");
	resetLink.appendChild(document.createTextNode("reset Content"));
	resetLink.setAttribute("onclick","document.location.reload();");
	flInsertTag.parentNode.insertBefore(resetLink,flInsertTag);

	var linkk= document.createElement("a");
	linkk.setAttribute("style","cursor:pointer;margin-right:8px");
	linkk.appendChild(document.createTextNode("my Timeline with friends"));
	linkk.setAttribute("onclick","drawSpecificTimeline('joshyu',true,true)");
	flInsertTag.parentNode.insertBefore(linkk,flInsertTag);

	var refreshlink= document.createElement("a");
	refreshlink.setAttribute("style","cursor:pointer");
	refreshlink.appendChild(document.createTextNode("refresh"));
	refreshlink.setAttribute("onclick","new Ajax.Request('/account/refresh?last_check='+$('timeline').getElementsByTagName('tr')[0].id.split('_')[1],{asynchronous:true,evalScripts:true});");

	flInsertTag.parentNode.insertBefore(refreshlink,flInsertTag);

	var bannerRoom= document.createElement("div");
	bannerRoom.setAttribute("style","display:none");
	bannerRoom.setAttribute("id","bannerRoom");
	flInsertTag.parentNode.insertBefore(bannerRoom,flInsertTag);

	//add featured List timeline...
	var fl= document.createElement("div");
	fl.setAttribute("class","timeline-banner thumb_banner_container");
	fl.setAttribute("onclick","Effect.toggle(this.getElementsByTagName('div')[0],'blind');");
	fl.appendChild(document.createTextNode("timeline of featured User(click thumb,you can view their timeline below)"));
	bannerRoom.appendChild(fl);

	var thumbList= document.createElement("div");
	thumbList.setAttribute("class","timeline-banner");
	thumbList.setAttribute("style","display:none");

	thumbList.appendChild(loading.cloneNode(false));
	thumbList.setAttribute("id","featured-timeline-thumbs");
	fl.appendChild(thumbList);

	var jsonRes= document.createElement("script");
	jsonRes.setAttribute("type","text/javascript");
	jsonRes.setAttribute("src","http://twitter.com/statuses/featured.json?callback=drawFeaturedList");

	thumbList.appendChild(jsonRes);


	//add friends list timeline...
	var friendlist= document.createElement("div");
	friendlist.setAttribute("class","timeline-banner thumb_banner_container");
	friendlist.setAttribute("onclick","Effect.toggle(this.getElementsByTagName('div')[0],'blind');");
	friendlist.appendChild(document.createTextNode("timeline of friends"));
	bannerRoom.appendChild(friendlist);

	var thumbList= document.createElement("div");
	thumbList.setAttribute("class","timeline-banner");
	thumbList.setAttribute("style","display:none");

	thumbList.appendChild(loading.cloneNode(false));
	thumbList.setAttribute("id","friends-timeline-thumbs");
	friendlist.appendChild(thumbList);

	var jsonRes= document.createElement("script");
	jsonRes.setAttribute("type","text/javascript");
	jsonRes.setAttribute("src","http://twitter.com/statuses/friends.json?callback=drawFriendtimelineThumbs");

	thumbList.appendChild(jsonRes);

	//add follower list timeline...
	var followerlist= document.createElement("div");
	followerlist.setAttribute("class","timeline-banner thumb_banner_container");
	followerlist.appendChild(document.createTextNode("timeline of followers"));
	followerlist.setAttribute("onclick","Effect.toggle(this.getElementsByTagName('div')[0],'blind');");
	bannerRoom.appendChild(followerlist);

	thumbList= document.createElement("div");
	thumbList.setAttribute("class","timeline-banner");
	thumbList.setAttribute("style","display:none");

	thumbList.setAttribute("id","followers-timeline-thumbs");
	followerlist.appendChild(thumbList);

	var fItem=null;
	var fImg=null;

	for(var i=0;i<followers.length;i++){
		fItem= document.createElement("a");
		fItem.setAttribute("href","http://twitter.com/"+followers[i].scrname);
		fItem.setAttribute("uname",followers[i].scrname);
		fItem.addEventListener("click",function(e){
			//nowWatching= this;
			drawSpecificTimeline(this.getAttribute("uname"));
			e.preventDefault();
		},true);

		fImg= document.createElement("img");
		fImg.setAttribute("width",24);
		fImg.setAttribute("height",24);
		fImg.setAttribute("src",followers[i].thumb);
		fItem.appendChild(fImg);
		thumbList.appendChild(fItem);
	}



	var divTag= document.createElement("div");
	divTag.setAttribute("id","filterbylist");
	bannerRoom.appendChild(loadFilterList(divTag));
}

function addSearchTwitter(){
	var butSubmit= document.getElementById("submit");
	if(butSubmit==null) return;

	var descDIV= document.createElement("div");	
	descDIV.appendChild(document.createTextNode("you can fetch result from twittersearch now, select any words inside textbox above and give it a try"));
	descDIV.setAttribute("style","font-size:10px !important");
	butSubmit.parentNode.insertBefore(descDIV,butSubmit);

	var butSearch= document.createElement("input");
	butSearch.setAttribute("type","button");
	butSearch.setAttribute("id","searchbut");
	butSearch.setAttribute("value","search");
	butSearch.addEventListener("click",function(e){
	    var strSearch= textBox.value.substring(textBox.selectionStart,textBox.selectionEnd);
		if(strSearch==""){
			strSearch= textBox.value;
		}

		var divResult= document.createElement("div");
		divResult.setAttribute("id","idRes");		divResult.setAttribute("style","width:100%;background-color:#666;position:relative;z-index:99999;opacity:0.96;color:#000 !important;");

		butSubmit.parentNode.appendChild(divResult);
		divResult.appendChild(loading.cloneNode("false"));


	    GM_xmlhttpRequest
	    ({
         method:'POST',
         url: "http://twittermap.com/search/update",
    	 headers: {'Content-type': 'application/x-www-form-urlencoded'},
		 data:'searchstring='+strSearch,
         onload:function(httpObj){
			var d = document.createElement('div');
			d.innerHTML = httpObj.responseText;
			divResult.innerHTML = "<div onmouseover=\"this.style.backgroundColor='#aaa'\" onmouseout=\"this.style.backgroundColor='#666'\" style=\"cursor:pointer;border: 1px solid rgb(0, 0, 0); padding: 4px; margin-bottom:5px;font-size: 19px; font-weight: bold; color: black;width: 12px;height:24px\" onclick=\"var node=this.parentNode;node.parentNode.removeChild(node);\">X</div>";
			
			divResult.appendChild(d.getElementsByTagName("table")[0]);
			
			var link=document.createElement("a");
			link.setAttribute("style","display:block; margin-top:10px;font-size:12px !important");
			link.setAttribute("href","http://twittermap.com/search/");
			link.appendChild(document.createTextNode("come twittersearch for more results"));

			divResult.appendChild(link);

		    }
	    });	
	    
	},true);

	butSubmit.parentNode.appendChild(butSearch);

}


function TimelineLinkHandler(){
	var arrLinkHandlers=[];	arrLinkHandlers.push({regxp:/^http:\/\/flickrbabes\.com\/[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}\/[^\/]*\//,handler:function(oLink){
		var imgDIV= document.createElement("div");
		imgDIV.setAttribute("class","foto_div");
		oLink.parentNode.insertBefore(imgDIV,oLink.nextSibling);
		imgDIV.appendChild(loading.cloneNode(false));

		GM_xmlhttpRequest
		({
			 method:'GET',
			 url: oLink.href,
			 onload:function(httpObj){
				var d = document.createElement('div');
				d.innerHTML = httpObj.responseText;

				var imgContent= document.evaluate(".//div[@class='fbpphotonormal']/a",d,null,9,null).singleNodeValue;
				
				imgDIV.innerHTML="";
				imgDIV.appendChild(imgContent);
				imgDIV.innerHTML+='<br><a style="cursor:pointer" onclick="var node=this.parentNode;node.parentNode.removeChild(node);">close</a>';
				d.innerHTML="";
			 }
		});
	
	}});
	arrLinkHandlers.push({regxp:/^http:\/\/www\.flickr\.com\/photos\/[^\/]+\/[0-9]+\//,handler:function(oLink){
		var imgDIV= document.createElement("div");
		imgDIV.setAttribute("class","foto_div");
		oLink.parentNode.insertBefore(imgDIV,oLink.nextSibling);
		imgDIV.appendChild(loading.cloneNode(false));

		GM_xmlhttpRequest
		({
			 method:'GET',
			 url: oLink.href,
			 onload:function(httpObj){
				var d = document.createElement('div');
				d.innerHTML = httpObj.responseText;

				var imgContent= document.evaluate(".//div[@class='photoImgDiv']/img",d,null,9,null).singleNodeValue;

				imgContent.setAttribute("onload","");				
				imgDIV.innerHTML="";
				imgDIV.appendChild(imgContent);
				imgDIV.innerHTML+='<br><a style="cursor:pointer" onclick="var node=this.parentNode;node.parentNode.removeChild(node);">close</a>';
				d.innerHTML="";
			 }
		});	
	
	}});

	arrLinkHandlers.push({regxp:/^http:\/\/tinyurl\.com/,handler:function(tinyurl){
		var realLink= document.createElement("span");
		if(tinyurl.hasAttribute("shown")){			
			return;
		}

		realLink.setAttribute("style","margin-left:3px;cursor:pointer");
		realLink.appendChild(loading.cloneNode(false));

		var GUID= tinyurl.href.substring(tinyurl.href.lastIndexOf("/")+1);

		GM_xmlhttpRequest
		({
			 method:'GET',
			 url: "http://preview.tinyurl.com/"+GUID,
			 onload:function(httpObj){
				var d = document.createElement('div');
				d.innerHTML = httpObj.responseText;

				var tinyLink= document.evaluate(".//a[@id='redirecturl']",d,null,9,null).singleNodeValue;
				tinyLink.textContent= tinyLink.getAttribute("href").length>25?(tinyLink.setAttribute("class","tinifyLink"),tinyLink.getAttribute("href").substr(0,25)):tinyLink.getAttribute("href");

				tinyLink.setAttribute("target","_blank");
					
				tinyurl.parentNode.removeChild(tinyurl.nextSibling);
				tinyurl.parentNode.replaceChild(tinyLink,tinyurl);

				for(var i=0;i<arrLinkHandlers.length;i++){
					if(tinyLink.href.match(arrLinkHandlers[i].regxp)){
						arrLinkHandlers[i].handler(tinyLink);
						break;
					}
				}

				d.innerHTML="";
			 }
		});	

		tinyurl.parentNode.insertBefore(realLink,tinyurl.nextSibling);
		tinyurl.setAttribute("shown",1);
	
	}});

	arrLinkHandlers.push({regxp:/^http:\/\/twitter\.com\/[0-9a-zA-Z_]+/,handler:function(ulink){
		if(ulink.parentNode.tagName=="STRONG" && !ulink.previousSibling){
			var scrname= ulink.href.match(/^http:\/\/twitter\.com\/(.*)/)[1];
			if(friends[scrname]){
				if(ulink.nextSibling){
					ulink.nextSibling.style.display= ulink.nextSibling.style.display=="none"?"inline":"none";
				}else{
					var spanTag= document.createElement("span");
					spanTag.setAttribute("style","font-size:10px;margin-left:10px");
					spanTag.innerHTML=':: <a href="http://twitter.com/friends/leave/'+friends[scrname].id+'" style="padding:3px">leave</a><a href="http://twitter.com/friendships/destroy/'+friends[scrname].id+'" style="padding:5px">remove</a><a onclick="var textBox= document.getElementById('+"'status'"+')|| document.getElementById('+"'text'"+');if(textBox){textBox.focus();textBox.scrollIntoView();textBox.value='+"'@"+scrname+"'"+'}" style="cursor:pointer;padding:3px">message</a><a style="padding:5px;cursor:pointer" onclick="drawSpecificTimeline('+friends[scrname].id+');">timeline</a>';
				  
					if(document.getElementsByTagName("h2")[0].textContent.indexOf("Watching")<0){
						spanTag.innerHTML+='<a style="padding:5px;cursor:pointer" onclick="filterBy(true,this.parentNode.parentNode.firstChild.href)">filter</a>';

						spanTag.innerHTML+='<a style="padding:5px;cursor:pointer" onclick="filterBy(false,this.parentNode.parentNode.firstChild.href)">mask off</a>';
					}

					ulink.parentNode.appendChild(spanTag);
				}
			}			
		}else if(ulink.parentNode.getAttribute("class").indexOf("thumb")>=0 && ulink.getElementsByTagName("img").length>0){
			clickTimeLineThumbToShowMoreInfomation(ulink);
		}

	}});


	var tl=	document.getElementById("timeline");
	if(!tl) return;

	function getTargetLink(target){
		if(target.tagName=="A")
			return target;

		if(!target.parentNode)
			return null;

		return getTargetLink(target.parentNode);		
	}

	tl.addEventListener("click",function(e){
		var ulink=getTargetLink(e.target);
		if(ulink){
			for(var i=0;i<arrLinkHandlers.length;i++){
				if(ulink.href.match(arrLinkHandlers[i].regxp)){
					arrLinkHandlers[i].handler(ulink);
					e.preventDefault();
					break;
				}
			}			
		}
	},true);
}


function addFriendPrompts(scrname){
	if(textBox!=null){
		var divTag=textBox.parentNode.lastChild;

		if(!divTag || divTag.tagName!="DIV"){
			divTag= document.createElement("div");
			divTag.setAttribute("style","text-align:left;margin:2px 5px 2px 7px;max-width:600px;overflow:auto");	
			textBox.parentNode.appendChild(divTag);
		}

		divTag.innerHTML+= '<a onclick="drawSpecificTimeline('+"'"+scrname+"'"+')" style="cursor:pointer;padding-right:4px;display:none">'+scrname+'</a>';		
	}
}

function addTimeStamptoSidebar(){
	//add timestamp to sidebar friends list...
	var friendLinks= document.evaluate("//div[@id='side']/div[@id='friends']//a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	var divTimeStamp= document.createElement("div");
	divTimeStamp.setAttribute("style","margin-right:.6em;font-size:.71em;margin-bottom:1em;color:#999;text-align:right");
	

	for(var i=0;i<friendLinks.snapshotLength;i++){
		var divTs= divTimeStamp.cloneNode(false);
		var ulink= friendLinks.snapshotItem(i).getAttribute("href");
		var lastupdate= friends[ulink.substr(ulink.lastIndexOf("/")+1)].lastDate;
		divTs.setAttribute("lastupdate",lastupdate);
		divTs.innerHTML=relative_time(lastupdate);
		
		friendLinks.snapshotItem(i).parentNode.insertBefore(divTs,friendLinks.snapshotItem(i).nextSibling);
	}

	var flist= document.getElementById("friends");
	var sortDIV= document.createElement("div");
	sortDIV.setAttribute("style","padding-bottom: 5px;");
	var butSort= document.createElement("button");
	//butSort.setAttribute("type","button");
	//butSort.setAttribute("value","nearest first");
	butSort.appendChild(document.createTextNode("nearest first"));
	butSort.setAttribute("onclick","var flist=$('friends');var ulinks=flist.getElementsByTagName('a');var arr=[];for(var i=0;i<ulinks.length;i++){arr.push([ulinks[i],ulinks[i].nextSibling]);}arr.sort(function(a,b){return new Date(b[1].getAttribute('lastupdate'))- new Date(a[1].getAttribute('lastupdate'));});flist.innerHTML='';for(var i=0;i<arr.length;i++){flist.appendChild(arr[i][0]);flist.appendChild(arr[i][1]);}");
	sortDIV.appendChild(butSort);

	flist.parentNode.insertBefore(sortDIV,flist);

}

function addKeyboardShortcut(){
	if(!textBox) return;
	var arrlink=[];
	var linkss=null;

	var h3T= document.evaluate(".//div[@class='bar']//h3",document,null,9,null).singleNodeValue;
	
	if(h3T){
		h3T.innerHTML+="(Ctrl+Enter to post)";
	}
	
	var arr=[];
	for(var i in friends)
		arr.push(i);

	arr.sort();

	for(var i=0;i<arr.length;i++){
		addFriendPrompts(arr[i]);
	}


	var divTag= textBox.parentNode.lastChild;
	linkss=divTag.getElementsByTagName("a");

	
	textBox.addEventListener("keyup",function(e){
		var data={num:0,last:null};

		if(this.value.length==0){
			divTag.style.display="none";
		}else if(divTag && this.value.match(/(^@([^\s]*))|(^[dD] ([^\s]*))/)){
			var strStart="";
			var match=true;

			divTag.style.display="block";

			if(this.value.length==RegExp.$1.length){
				strStart=RegExp.$2;					
			}else if(this.value.length==RegExp.$3.length){
				strStart=RegExp.$4;
			}else{
				match=false;
			}

			if(match){
				for(var i=0;i<linkss.length;i++){
					if(linkss[i].textContent.toLowerCase().indexOf(strStart)==0){
						linkss[i].style.display="inline";
						data.num++;
						data.last=linkss[i];
					}else{
						linkss[i].style.display="none";
					}
				}

				if(data.num==1){
					this.value=(strStart==RegExp.$2?"@":"D ")+data.last.textContent;
					win.last=data.last;
					setTimeout("last.style.display='none'",3000);
					
				}
			}
		}

		if(e.which==13&& e.ctrlKey&&this.value.match(/[^\s]+/)){
			this.form.submit.click();
		};
	},true);   	    
}

function handleDragndropEvent(){
	var timelineTbl= document.getElementById("timeline");
	if(timelineTbl){
		timelineTbl.addEventListener("dragenter",function(e){
			if(dragObject && dragObject.getAttribute("rel")=="contact")
				this.style.border='2px solid red';
			e.preventDefault();
		},true);

		timelineTbl.addEventListener("dragexit",function(e){
			this.style.border='';
		},true);

		timelineTbl.addEventListener("dragdrop",function(e){
			if(dragObject && dragObject.getAttribute("rel")=="contact"){
				var ulink=dragObject.getAttribute("href");
				drawSpecificTimeline(ulink.substr(ulink.lastIndexOf("/")+1));
				this.style.border='';

				dragObject=null;
	
				e.preventDefault();	
				e.stopPropagation();
			}
		},true);
	}
}

function littlePageAction(){
	document.body.setAttribute("onkeyup","if(event.target!=textBox && event.shiftKey && event.which==83){textBox.focus();}");

	var insertPlace= document.getElementById("side").getElementsByTagName("ul")[0];
	insertPlace.setAttribute("style","display:none");

	var butStatus= document.createElement("button");
	butStatus.setAttribute("style","margin: 5px 0px 1px; font-size: 10px; font-family: verdana;");
	butStatus.setAttribute("onclick","Effect.toggle(this.nextSibling,'blind');");	
	butStatus.appendChild(document.createTextNode("current Status"));
	
	document.getElementById("side").insertBefore(butStatus,insertPlace);
}

////main entry/////////
GM_addStyle('#side,#littlesidebar{clear:right;-moz-border-radius: 0.8em !important;background:#E0FF92 none repeat scroll 0%;border:1px solid #87BC44;float:right;line-height:1.2;margin-bottom:10px;margin-top:10px;padding:12px;width:162px;} #footer,#navigation{-moz-border-radius: 0.6em 0em 0.6em 0em  !important;padding:10px !important}div.tab{-moz-border-radius:0.8em 0em 0.8em 0.8em !important;}div.bar{-moz-border-radius:0.8em 0em 0em 0em !important;}div.info{-moz-border-radius:0em 0em 0.8em 0em !important;} div.tab tr td+td:not([class]) {width:100% !important;font-size:13px !important}tr.odd{-moz-outline: 1px solid #C0C0C0 !important;-moz-outline-radius: 0.4em !important;color:#777 !important}tr.odd:hover{ -moz-outline: 1px solid #555 !important;-moz-outline-radius: 0.4em !important;color:black !important}tr.even{border:1px dotted #777;background-color:#eeFFdd !important;}a:hover{text-decoration:none !important}td.thumb a img{border:1px black solid !important;-moz-border-radius:0.3em !important;padding:2px !important;background-color:#fff !important;}td.thumb a:hover img{border:1px green solid !important} td.thumb+td strong{margin-bottom:10px;display:block} td.thumb+td strong > a{font-style:italic;margin-bottom:8px !important;color:#333399 !important;font-weight:normal !important}span.meta{font-size:10px !important;color:#777 !important;display:block !important;margin-top:14px !important;text-align:right !important;}span.meta a{font-size:10px !important} a[rel=contact]{ display:block !important; text-decoration:none!important; margin:0 0 8px 0!important; } a[rel=contact] img { margin:0 4px -8px 0!important; text-decoration:none!important; border:1px solid #999!important;} a[rel=contact]:after { content: attr(title) !important; font-family:Verdana !important; font-size:.9em !important; } a[rel=contact]:hover{text-decoration:underline !important}#friends,#followers,#littlesidebar{max-height:500px !important;overflow:auto !important} #followers{margin-top:20px;padding-top:5px;border-top:1px dotted #777} input, textarea,select{  background-color: #FFF !important;  border-top: 1px solid #989898 !important;  border-right: 1px solid #ddd !important;  border-bottom: 1px solid #DDD !important;  border-left: 1px solid #C3C3C3 !important;color:#777 !important;}input:not([type="image"]), textarea,select{ -moz-border-radius: 0.6em !important; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAeCAMAAAAxfD/2AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAtUExURfT09PLy8vHx8fv7+/j4+PX19fn5+fr6+vf39/z8/Pb29vPz8/39/f7+/v///0c8Y4oAAAA5SURBVHjaXMZJDgAgCMDAuouA/3+uHPRiMmlKzmhCFRorLOakVnpnDEpBBDHM8ODs/bz372+PAAMAXIQCfD6uIDsAAAAASUVORK5CYII=) !important;background-color: #FFF !important;   background-repeat: repeat-x !important; padding-left:6px !important; padding-right:6px !important;  margin:5px !important;}input:not([type="button"]):not([type="reset"]):not([type="submit"]):not([type="checkbox"]):focus, textarea:focus,select:focus{-moz-outline: 2px solid #74C3CE !important;-moz-outline-offset: -1px !important;color:#000 !important;-moz-outline-radius: 0.6em !important;} .profileDIV{-moz-outline-radius: 0.4em;}div.desc  p{-moz-border-radius:0.6em 0.6em 0em 0em !important;} div.desc  p.meta{-moz-border-radius:0em 0em 0.6em 0.6em !important;} input#submit{display:inline !important} .timeline-banner{color:#999;text-decoration:underline;font-weight:bold;padding:2px 0px 2px 5px} .timeline-banner a img{width:24px} a.tinifyLink::after{content:"..."} .thumb_banner_container{cursor:pointer;background-color:#ffffdd;border-top:1.2px solid #eeee99;color:black;} .foto_div{text-align:center} .foto_div img{max-width:1024px}');

window.addEventListener("load",function(e){
	littlePageAction();
	addStoredDataList();
	addSearchTwitter();
	intercept_form_onsubmit();
	appendFollowerList();
	TimelineLinkHandler();	
	handleDragndropEvent();
},true);
