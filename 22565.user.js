// ==UserScript==
// @name          Whirlpool Last Read
// @namespace     http://ideatriage.com
// @description   Adds last read feature to Whirpool forums
// @include       http://forums.whirlpool.net.au/*
// @include       http://bc.whirlpool.net.au/*
// @exclude       http://forums.whirlpool.net.au/whim-send*
// @exclude       http://forums.whirlpool.net.au/forum-replies.cfm?t=*&p=-2 
// This is a user script for the Greasemonkey Firefox extension available at:
//http://greasemonkey.mozdev.org/
//this script uses functions introduced in 0.3 and does not support earlier versions of greasemonkey nor does it support the nobbled GM 0.3.5
// Whirlpool Last Read  0.8436
/*
0.8436 Proposed Changes
Identify other WLR users
Add more smilies
Option for both "Post Reply" and "View Preview" buttons.

0.8436 Changes - By Tromac (1/3/2008)
Created and added 4 new smilies (angry, confused, ninja and glare)
Added astrisk's to rolls eyes and gold star smilies

0.8435 Changes - By Tromac (12/2/2008)
Added option to hide removed/deleted threads
Added option for auto subscribe after post
Fixed "Link" whirlcode buton - Maud'Dib

0.8434 Changes - By Tromac (11/2/2008)
Can see if user notes are avaliable or not
Fixed voteblock alignment bug with swirls - Big thanks to Yansky for the code

0.8433 Changes - By Tromac (11/2/2008)
Added feature to enlarge Quick Quote text area.

0.8432 Changes - By Tromac (11/2/2008)
Updated menu structure to match forums page

0.8431 Changes - By Tromac (11/2/2008)
Excluded script from view full thread
Added option for ignor user button

0.843 Changes - By Tromac (11/2/2008)
Fixed recognition of threads without "?t=" tag
Semi dynamic menu loads forum links depending on user access
Added switch in settings page to select Q-Post

0.842 Changes - By Tromac (10/2/2008)
Fixed smilies bug

0.841 Changes - By Tromac (9/2/2008)
Updated avatar compatibility with Yansky's avatar system.
Updated quick menu and links, including TPR link.
Auto mark as read.

0.72 Changes
Minor menu tweaks, added music lounge

0.7 Change List: 
GM 0.6+ Firefox 1.5 compatible
Fixed settings Page bug.
Fixed	image resizing bug.
Added multi quote boxes
Separated Avatars from theme for more flexibility
Themes, ranks, etc. options loaded via xml for instant updates
Custom CSS option for quick fixes of appearance
User Notes added
Auto add show/hide users CSS to above
mark all posts read button
stop tracking thread button:


*/
(function() {
var currentVersion = "0.71";
// JB functions 
	GM_Storage={
    unique:"wimage_",
    age:1000*60*60*24* 30, // 30 days enough??
    setCookie:function(name, value, expires) {
      document.cookie= name + "=" + escape(value) +
                       "; expires=" + expires.toGMTString();
    },
    getCookie:function(name) {
      var dc = ""+document.cookie;
      var prefix = name + "=";
      var begin = dc.indexOf("; " + prefix);
      if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
      }
      else {
        begin += 2;
      }
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) end = dc.length;
      return unescape(dc.substring(begin + prefix.length, end));
    },
    cookie_setValue:function(name, value) {
      expires=new Date();
      expires.setTime(expires.getTime() + this.age);
      this.setCookie(this.unique+name, value, expires);
    },
    cookie_getValue:function(name, def) {
      var value=this.getCookie(this.unique+name);
      if(!value) value=def;
	  //alert('JB GM name: ' +name +" value: " +value);
      return value;
    }
  };
  if(typeof GM_setValue != "function") {
    GM_setValue=function(){
      return GM_Storage.cookie_setValue(arguments[0], arguments[1])
    };
    GM_getValue=function(){
      return GM_Storage.cookie_getValue(arguments[0], arguments[1])
    };
  }

  function editObject(tgt) {
    this.tgt=tgt;
    this.text=null;
    this.obj=null;
    if(window.getSelection || document.getSelection) {
      this.getSelectedText = this.getSelectedTextDOM;
      this.addReplaceSelectedText = this.addReplaceSelectedTextDOM;
    }
    else if(document.selection) {
      this.range=null;
      this.getSelectedText = this.getSelectedTextIE;
      this.addReplaceSelectedText = this.addReplaceSelectedTextIE;
    }
  }
  editObject.prototype.getSelectedTextDOM=function() {
    this.text=null;
    this.obj=null;
    if (window.getSelection) {
      this.text=(window.getSelection()).toString();
    }
    else if (document.getSelection) {
      this.text=(document.getSelection()).toString();
    }
    if(this.text.length==0) {
	   var el = document.getElementById("qqText");
	   if(!el){ el=document.getElementById("body");}
	   if(el){
        if(0<(el.selectionEnd-el.selectionStart)) {
          this.obj=el;
          this.text=el.value.substring(el.selectionStart,el.selectionEnd);

			}
		}
    }
    return this.text;
  }
  editObject.prototype.addReplaceSelectedTextDOM=function(s) {
    var scrollTop=this.tgt.scrollTop;
    var scrollLeft=this.tgt.scrollLeft;
    var before;
    var after;
    var caretStart;
    var caretEnd;
    if(this.obj == this.tgt) { // src and destination element are the same - we replace
      caretStart=this.tgt.selectionStart;
      caretEnd=caretStart+s.length;
    } else {
      caretEnd=this.tgt.selectionEnd+s.length;
      caretStart=caretEnd;
    }
    before=(this.tgt.value).substring(0,this.tgt.selectionStart);
    after=(this.tgt.value).substring(this.tgt.selectionEnd);
    this.tgt.value=before+s+after;
    this.tgt.setSelectionRange(caretStart, caretEnd);
    this.tgt.focus();
    this.tgt.scrollTop=scrollTop;
    this.tgt.scrollLeft=scrollLeft;
  }

  function writeConfig() {
    var config="";
    for(o in buttons) {
      if(buttons[o].hidden) {
        config+=(config.length?":":"")+o;
      }
    }
    GM_setValue("hiddenButtons", config);
  }
  function addConfigCheckbox(where, id, label, state) {
    var newInput=document.createElement("INPUT");
    newInput.id=id;
    newInput.type="checkbox";
    newInput.checked=state;
    var newLabel=document.createElement("LABEL");
    newLabel.setAttribute("for",id);
    newLabel.appendChild(document.createTextNode(label));
    where.appendChild(newInput);
    where.appendChild(newLabel);
    where.appendChild(document.createElement("BR"));
    return newInput;
  }
  function clickConfig(event) {
    if(event) {
      event.stopPropagation();
      event.preventDefault();
    }
    var newDiv=document.getElementById("wc_config");
    if(newDiv)
      return;
    newDiv=document.createElement("DIV");
    newDiv.style.position="fixed";
    newDiv.style.left="10px";
    newDiv.style.top="10px";
    newDiv.id="wc_config";
    newDiv=document.body.appendChild(newDiv);
    newDiv=newDiv.appendChild(document.createElement("DIV"));
    newDiv.style.backgroundColor="#ddddff";
    newDiv.style.border="ridge 3px";
    newDiv.style.color="#000000";
    for(o in buttons)
      addConfigCheckbox(newDiv, "wc_config_"+o, buttons[o].value.replace(/\-/g,""), 
                        buttons[o].hidden?false:true);
    newDiv.appendChild(document.createElement("BR"));
    var inClose=newDiv.appendChild(document.createElement("INPUT"));
    inClose.type="button";
    inClose.value="CANCEL";
    inClose.addEventListener('click', function() {
      var div=document.getElementById("wc_config");
      document.body.removeChild(div);
    }, false);
    var inSubmit=newDiv.appendChild(document.createElement("INPUT"));
    inSubmit.type="button";
    inSubmit.value="ACCEPT";
    inSubmit.addEventListener('click',function() {
      var div=document.getElementById("wc_config");
      var btns=div.getElementsByTagName("INPUT");
      for(var i=0; i < btns.length; i++) {
        var btn=btns[i];
        if(btn.type=="checkbox") {
          buttons[btn.id.substr(10)].hidden=btn.checked?false:true;
        }
      }
      writeConfig();
      document.body.removeChild(div);
    }, false);
  }
  function clickWhirl(event) {
    var bId;
    if(event) {
      event.stopPropagation();
      event.preventDefault();
      bId=event.currentTarget.id.substr(3);
      if(event.which==3)
        return(clickConfig(event));
    }
    else {
      event=window.event;
      bId=event.srcElement.id.substr(3);
    }
    var bObj=buttons[bId];
    var text=edit.getSelectedText();
    var pre="["+bObj.whirl.substr(0,1);
    var post=bObj.whirl.substr(-1)+"]";
    if(text.length) {
      if(bObj.re && bObj.replace) {
        var tt=text.split("|");
        tt[0]=tt[0].replace(bObj.re, bObj.replace);
        text=tt.join("|");
      }
      edit.addReplaceSelectedText(pre+text+post);
    } else {
      edit.addReplaceSelectedText(bObj.opened?post:pre);
      bObj.opened=!bObj.opened;
    }
  }
  function clickUrl(event) {
    var bId;
    if(event) {
      event.stopPropagation();
      event.preventDefault();
      bId=event.currentTarget.id.substr(3);
      if(event.which==3)
        return(clickConfig(event));
    }
    else {
      event=window.event;
      bId=event.srcElement.id.substr(3);
    }
    var bObj=buttons[bId];
    var promptText=bId.substr(7);
    var url=edit.getSelectedText();
    var pre='<a href="';
    var mid='">';
    var post="</a>";
    var cutPos=-1;
    if(!url) {
      var textArea=document.getElementById("body");
      if(!textArea)textArea=document.getElementById("f_body");
      if(!textArea)textArea=document.getElementById("qqText");
      if(textArea && textArea.setSelectionRange) {
        textArea.focus();
        var caret=textArea.selectionStart;
        var txt=textArea.value;
        var c=txt.substr(caret, 1);
        if(c>" ") {
          var start=caret;
          var end=caret;
          while(start>-1 && txt.substr(--start,1)>" ");
          start++;
          while(end<txt.length && txt.substr(++end,1)>" ");
          url=txt.substring(start,end);
          textArea.setSelectionRange(start, end+1);
        }
      }
    }
    if(!url) {
      var clean=txtDest.value.replace(/\n/gm," ");
      var sp=clean.split(" ");
      if(sp.length) {
        var indx=sp.length-1;
        var check=sp[indx].toLowerCase();
        if(!check.length)
          check=sp[--indx].toLowerCase();
        if(check.indexOf("http://") == 0 || check.indexOf("https://") == 0 ||
                                            check.indexOf("ftp://") == 0) {
          url=sp[indx];
          cutPos=txtDest.value.lastIndexOf(url);
        }
      }
    }
    if(url.length) {
      var text;
	  var DefaultUrlPrompt='Click here ...';
      if(promptText=="Text")
        text=window.prompt("Enter desription for this link", DefaultUrlPrompt);
      else if(promptText=="Href") {
        text=url;
        url="";
        url=window.prompt("Enter url", "http://");
      }
      if(text.length && url.length) {
        if(cutPos >= 0)
          txtDest.value=txtDest.value.substr(0, cutPos);
        edit.addReplaceSelectedText(pre+url+mid+text+post);
      }
    }
  }
  function readConfig() {
    var config=GM_getValue("hiddenButtons", "");
    if(config.length) {
      var configArray=config.split(":");
      for(var i=0; i < configArray.length; i++) {
        if(buttons[configArray[i]]) buttons[configArray[i]].hidden=true;
      }
    }
  }
  function addButtons(el, txtDest) {
    readConfig();
    var btnEl=document.createElement("button");
    btnEl.style.fontSize="1em";
    btnEl.style.color="#001188";
    btnEl.style.margin="0";
    btnEl.style.padding="0";
    btnEl.id="wc_config_button";
    btnEl.appendChild(document.createTextNode("\u00a9"));
    btnEl=el.appendChild(btnEl);
    btnEl.addEventListener('click', clickConfig, false);
    for(var o in buttons) {
      var bn=buttons[o];
      bn.opened=false; // flag for when no text selected
      btnEl=document.createElement("button");
      btnEl.style.margin="0";
      btnEl.style.padding="0";
      btnEl.id="wc_"+o;
      btnEl.accessKey=bn.key;
      if(bn.hidden) {
        btnEl.style.width="0";
        btnEl.style.height="0";
        btnEl.style.borderStyle="none";
      } 
      else {
        var splits=bn.value.split("-");
        var access=document.createElement("SPAN");
        access.style.color="#aa3333";
        access.appendChild(document.createTextNode(splits[1]));
        btnEl.appendChild(document.createTextNode(splits[0]));
        btnEl.appendChild(access);
        btnEl.appendChild(document.createTextNode(splits[2]));
        btnEl.style.fontSize="1em";
        btnEl.style.color="#001188";
      }
      btnEl=el.appendChild(btnEl);
      if(o.substr(0,5) == "whirl") {
        btnEl.title=o.substr(5)+" WhirlCode";
        btnEl.addEventListener('click', clickWhirl, false);
      }
      if(o.substr(0,7) == "makeUrl") {
        btnEl.title="Add url "+o.substr(7);
        btnEl.addEventListener('click', clickUrl, false);
      }
    }
  }
 // end JB functions

function is_all_ws( nod ){
  return !(/[^\t\n\r ]/.test(nod.data));
}


function loadWLRvalues(){
    //load values from threadRead into associative array and return it.
	var test = GM_getValue('threadRead');
	var basicArray = test.split(RegExp(" *, *", "gi"));
	var assArray = new Array();
	//alert('values stored: ' +basicArray.length);
	for (var i = 0; i < basicArray.length; i++){
		tempArray = basicArray[i].split(RegExp(" *: *", "gi"));
		assArray[eval('\"' +tempArray[0] +'\"')] = tempArray[1];
	}
	return assArray;
}

function WLR_getValue(key, wlrArray, defaultValue){
	for ( var j in wlrArray){
		if ( j == key){
			return wlrArray[j]
		}
	}
	return defaultValue;
}
function WLR_setValue(event, WLRkey, WLRvalue){
	WLRarray = loadWLRvalues();
	//else check array length < max value
	var arL=0;
	var match =0;
	for ( var j in WLRarray){
		arL++;
		//check if already in array
		if(j==WLRkey){
			//if yes mark value for deletion
			WLRarray[WLRkey]='delete';
			match=1;
		}
	}

	WLRmaxValue = GM_getValue('WLRmaxValue');
	if( (arL+1 - match ) >= WLRmaxValue){
		//greater than or equal to max value, even counting match deletion..
		var count =0;
		for (var i in WLRarray){
			if (count < (arL-match-WLRmaxValue)){
				WLRarray[i]= 'delete';
				count++;
				
			}
		}
	}
	var arrayString = "";
	for (var k in WLRarray){
		if(WLRarray[k]!= 'delete'){
			//add to array
			arrayString += k +":" +WLRarray[k] +", ";
		}else{
			//alert('deleting: '+k +" : " +WLRarray[k]);
		}
	}
	//add final new value
	arrayString += WLRkey +":" +WLRvalue +", ";
	GM_setValue('threadRead', arrayString);
	event.preventDefault();

}
function WLR_settings(e){
		GM_setValue(e.target.name.substr(2), e.target.value);	
		//e.preventDefault();
	}

function WLR_lastPostLink (threadStyle, WLRValues){
	var xpth1 ="//tr/td[@class = '"+threadStyle +"2'][1]";
	var numReply = document.evaluate(
			xpth1,
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	var xpth2 ="//tr/td[@class = '"+threadStyle +"4'][last()]";
		// get last post link -note turn into function someday
		allThread = document.evaluate(
			xpth2,
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0; i < allThread.snapshotLength; i++) {
			var thisThread = allThread.snapshotItem(i).firstChild.href;
			startPos =thisThread.indexOf('=') + 1;
			var endPos = thisThread.indexOf('&');
			linkTopic = thisThread.substring(startPos, endPos);
			linkReply = WLR_getValue(linkTopic, WLRValues, 0)*1;
			if (linkReply>0){	
				totalPosts =numReply.snapshotItem(i).innerHTML*1 +1;
				var newPosts = totalPosts - linkReply;
				//modify last post link
				allThread.snapshotItem(i).firstChild.href = 'http://forums.whirlpool.net.au/forum-replies.cfm?t=' +linkTopic +'&p=' +Math.ceil(linkReply/pperpage) +'#r' +linkReply;
				allThread.snapshotItem(i).className = threadStyle+'6';
				allThread.snapshotItem(i).firstChild.title = newPosts;

				if(newPosts>0){
					//new posts since last read
					//allThread.snapshotItem(i).style.backgroundColor = 'orange';
					allThread.snapshotItem(i).parentNode.className = 'wlr_new';
					allThread.snapshotItem(i).previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML +=" <span class=new_posts>(" +newPosts +")</span>";
					mrk = document.createElement("a");
					xTxt = document.createTextNode(" #");
					mrk.appendChild(xTxt);
					mrk.id = linkTopic+"_"+totalPosts;
					mrk.title = 'mark all replies as read';
					mrk.addEventListener('click',function(evt){tmpAr = evt.target.id.split('_'); WLR_setValue(evt,tmpAr[0],tmpAr[1]); evt.target.parentNode.parentNode.className ='wlr_no_new';evt.target.style.display ="none";},false);
					allThread.snapshotItem(i).previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.appendChild(mrk); 
					
					
				}else{
					//no new posts since last read
					//allThread.snapshotItem(i).style.backgroundColor = 'yellow';
					allThread.snapshotItem(i).parentNode.className = 'wlr_no_new';
				}
				stpTrk = document.createElement("a");
					xTxt = document.createTextNode(" x");
					stpTrk.appendChild(xTxt);
					stpTrk.id = linkTopic+"_"+totalPosts;
					stpTrk.title = 'Stop tracking this thread';
					stpTrk.addEventListener('click',function(evt){tmpAr = evt.target.id.split('_'); WLR_setValue(evt,tmpAr[0],'delete'); evt.target.parentNode.parentNode.className ='';evt.target.style.display ="none"; evt.target.previousSibling.style.display ="none"},false);
					allThread.snapshotItem(i).previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.appendChild(stpTrk); 
			}
			
			
		}

}
function WLR_lastPostLinkUser (threadStyle, WLRValues){
	var xpth1 ="//tr/td[@class = '"+threadStyle +"2'][2]";
	var numReply = document.evaluate(
			xpth1,
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	var xpth2 ="//tr/td[@class = 'threadUP4a']|//tr/td[@class = 'threadUP4b']|//tr/td[@class = 'threadUP4c']";

		// get last post link -note turn into function someday
		allThread = document.evaluate(
			xpth2,
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

		for (var i = 0; i < allThread.snapshotLength; i++) {
		if(allThread.snapshotItem(i).firstChild.nextSibling){
			var thisThread = allThread.snapshotItem(i).firstChild.nextSibling.href;
		}else{
			var thisThread = allThread.snapshotItem(i).firstChild.href;
		}
			startPos =thisThread.indexOf('=') + 1;
			var endPos = thisThread.indexOf('&');
			linkTopic = thisThread.substring(startPos, endPos);
			linkReply = WLR_getValue(linkTopic, WLRValues, 0)*1;
			if (linkReply>0){
				//modify last post link
				if(allThread.snapshotItem(i).firstChild.nextSibling){
					allThread.snapshotItem(i).firstChild.nextSibling.href = 'http://forums.whirlpool.net.au/forum-replies.cfm?t=' +linkTopic +'&p=' +Math.ceil(linkReply/pperpage) +'#r' +linkReply;
				}else{
					allThread.snapshotItem(i).firstChild.href = 'http://forums.whirlpool.net.au/forum-replies.cfm?t=' +linkTopic +'&p=' +Math.ceil(linkReply/pperpage) +'#r' +linkReply;
				}
				allThread.snapshotItem(i).className = "threadN6";
				allThread.snapshotItem(i).style.backgroundImage="";	
				totalPosts =numReply.snapshotItem(i).innerHTML*1 +1;
				var newPosts = totalPosts - linkReply;
				if(newPosts>0){
				
					//new posts since last read
					allThread.snapshotItem(i).parentNode.className = 'wlr_new';
					allThread.snapshotItem(i).previousSibling.previousSibling.previousSibling.previousSibling.innerHTML +=" <span class=new_posts>(" +newPosts +")</span>";
					mrk = document.createElement("a");
					xTxt = document.createTextNode(" #");
					mrk.appendChild(xTxt);
					mrk.id = linkTopic+"_"+totalPosts;
					mrk.title = 'mark all replies as read';
					mrk.addEventListener('click',function(evt){tmpAr = evt.target.id.split('_'); WLR_setValue(evt,tmpAr[0],tmpAr[1]); evt.target.parentNode.parentNode.className ='wlr_no_new';evt.target.style.display ="none";},false);
					allThread.snapshotItem(i).previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.appendChild(mrk); 
				}else{
					//no new posts since last read
					allThread.snapshotItem(i).parentNode.className = 'wlr_no_new';
				}
				stpTrk = document.createElement("a");
					xTxt = document.createTextNode(" x");
					stpTrk.appendChild(xTxt);
					stpTrk.id = linkTopic+"_"+totalPosts;
					stpTrk.title = 'Stop tracking this thread';
					stpTrk.addEventListener('click',function(evt){tmpAr = evt.target.id.split('_'); WLR_setValue(evt,tmpAr[0],'delete'); evt.target.parentNode.parentNode.className ='';evt.target.style.display ="none"; evt.target.previousSibling.style.display ="none"},false);
					allThread.snapshotItem(i).previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.appendChild(stpTrk); 
			}
			
			
		}

}

function makeMenu(menArray, addition){
 var newDiv = document.createElement("div");
		var tempList="";
		for (i=1; i<(menArray.length-1); i++){
			var tLink =menArray[i].split(RegExp(" *\\^ *","gi"));
			tempList +='<li id="'+tLink[0].replace(/\s/g, "_")+'"><a href="'+tLink[1]+addition +'">' +tLink[0] +'</a></li>';
		}
		newDiv.innerHTML += '<ul><li><a href="#">' +menArray[0]	+'</a><ul>'+tempList +'</ul></li></ul>';
		newDiv.className ="mainMenu";
		newDiv.id = menArray[0];
		//newDiv.id +="wlrMenu_"+menArray[0];
		return(newDiv);
}

function makeMenuHTML(menArray){
 var newDiv = document.createElement("div");
		var tempList="";
		for (var i=1; i<(menArray.length); i++){
			tempList +='<li>' +menArray[i] +'</li>';
		}
		newDiv.innerHTML += '<ul><li><a href="#">' +menArray[0]	+'</a><ul>'+tempList +'</ul></li></ul>';
		newDiv.className="mainMenu";
		newDiv.id ="searchMenu";
		//newDiv.id +="wlrMenu_"+menArray[0];
		return(newDiv);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addRadioSetting(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
	WLRset.id = 'id_'+setting;
	var settingValue = eval(setting);
	sp = document.createElement("span");
	sp.className ="setting";
	lab1 = document.createElement("label");
	lab2 = document.createElement("label");
	lab1.innerHTML = 'on';
	lab2.innerHTML = 'off';
	in1 = document.createElement("input");
	in1.name = 'r_'+setting;
	in1.type = 'radio';
	in1.value = '1';
	in2 = document.createElement("input");
	in2.name = 'r_'+setting;
	in2.type = 'radio';
	in2.value = '0';
	if (settingValue == 1){
		in1.checked = true;
	}else{
		in2.checked=true;
	}
	in1.addEventListener("click",function(event){ WLR_settings(event);},false);
	in2.addEventListener("click",function(event){ WLR_settings(event);},false);
	lab1.appendChild(in1);
	lab2.appendChild(in2);
	sp.appendChild(lab1);
	sp.appendChild(lab2);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);

	var wikiN = document.getElementById('replies');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}
	 
function addListSetting(settingAr, labelAr, setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	sel = document.createElement("select");
	sel.name = 's_'+setting;
	deflt = GM_getValue(setting);
	for (i=0; i<settingAr.length; i++){
		opt = document.createElement('option');
		opt.value = settingAr[i];
		if(opt.value == deflt){
			opt.selected = true;
		}
		optTxt = document.createTextNode(labelAr[i]);
		opt.appendChild(optTxt);
		sel.appendChild(opt);
	}
	sel.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(sel);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);

	var wikiN = document.getElementById('replies');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}
function addTextSetting(setting, title, explanation){	 
	var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
		WLRset.id = 'id_'+setting;
	sp = document.createElement("span");
	sp.className ="setting";
	textA = document.createElement("textarea");
	textA.name = 't_'+setting;
	textA.value = GM_getValue('customCSS');
	textA.addEventListener("change",function(event){ WLR_settings(event);},false);
	sp.appendChild(textA);
	spEx = document.createElement("span");
	spEx.className = "setHead";
	spEx.innerHTML = title;
	brk = document.createElement("br");
	expTxt = document.createElement("span");
	expTxt.innerHTML = explanation;
	WLRset.appendChild(sp);
	WLRset.appendChild(spEx);
	WLRset.appendChild(brk);
	WLRset.appendChild(expTxt);

	var wikiN = document.getElementById('replies');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
}	 
	 
function hideQuote(event){

	if(event.type == 'blur'){
		event.target.rows =1;
		event.target.parentNode.className = 'op25';
		event.target.removeEventListener('blur', function(event){hideQuote(event)}, false);
		event.target.addEventListener('focus', function(event){hideQuote(event)}, false);
	}else{
		event.target.rows=10;
		event.target.parentNode.className = 'op95';
		event.target.removeEventListener('focus',function(event){hideQuote(event)}, false);
		event.target.addEventListener('blur', function(event){hideQuote(event)}, false);
	}
}
	 
function Savetxt(event){
	// saves textarea for quickquote	
	var s = document.getElementById('qqText').value;
	s = escape(s);
	layer = GM_getValue('currentQq');
	GM_setValue('qQuoter'+layer,s);
//	alert('saving: ' +s +' to: qQuoter'+layer);
	event.preventDefault();
	
}
function Savetxtr(event){
	// saves textarea for quickquote
	//alert('Savetxtr called');
	var s = document.getElementsByTagName('textarea')[1].value;
	s=escape(s);
	GM_setValue('qQuoter',s);
	event.preventDefault();
}

function postReply(event, replyURL){
	window.setTimeout(function() {
		window.location.replace(replyURL);
	});
	event.preventDefault();
}

 function clearQuote(event){
	document.getElementById('qqText').value = '';
	GM_setValue('qQuoter','');
	event.preventDefault();
	document.getElementById('qqText').focus();
}

function quotePost(evt, urltopic){
	var postName=GM_getValue('postName');
	document.getElementById('qqText').value += "[+" + evt.target.id.replace(/_/, " ") +postName +" +] \n[\"" +window.getSelection() +'\"]\n\n'; 
	document.getElementById('qqText').focus();
	evt.preventDefault();
}

function showImages(maxW){
	//image code
	LinkNodes = document.evaluate(
	"//td[@class = 'bodytext']//a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (var i=0; i <LinkNodes.snapshotLength; i++){
		imageNode = LinkNodes.snapshotItem(i);
		hrefLower = imageNode.href.toLowerCase();
		if ((hrefLower.indexOf(".jpg") >0 ||hrefLower.indexOf(".gif") >0 || hrefLower.indexOf("png") >0) && hrefLower.indexOf(".php")<1  && hrefLower.indexOf(".asp")<1){
			//image detected.
			var imL = document.createElement("img");
			imL.src = imageNode.href;
			imL.setAttribute("id", "picZ" +i);
			imL.style.maxWidth = window.zImgWidth + "px";
			if((imL.naturalWidth < 2000) && (imL.naturalHeight < 2000)){
				imL.addEventListener('load', function(event){if(this.width>maxW){this.width =maxW};},false);
				imL.addEventListener('click', function(event){if(this.width==maxW){this.width =this.naturalWidth}else if(this.width>maxW){this.width =maxW};}, false);
				imageNode.parentNode.insertBefore(imL, imageNode);
				imgBrk = document.createElement("br");
				imageNode.parentNode.insertBefore(imgBrk, imageNode);
			}
		}
	}
}

function showNote(evt){
	txtBlock = evt.target.parentNode.firstChild.nextSibling;
	if(txtBlock.style.display =="none"){
	txtBlock.style.display ="block";
	txtBlock.value = GM_getValue('u'+txtBlock.id,'');
	txtBlock.addEventListener('change', function(evt){GM_setValue('u'+evt.target.id, evt.target.value);},false);
	}else{
	txtBlock.style.display ="none";
	txtBlock.removeEventListener('change',function(evt){},false);
	}
	
}

function hideUser(evt){
	var customCSS = GM_getValue('customCSS');
	customCSS += ".wlr_"+evt.target.id +" {display:none;}"
	GM_setValue('customCSS', customCSS);
}

function shortcutKeys(evt, repUrl){
	// saves textarea for quickquote	
	if(!evt){
		alert('huh?');
	}else if (evt.ctrlKey==1 && evt.keyCode==13 ){
		postReply(evt, repUrl);
	}else if (evt.ctrlKey==1 && evt.keyCode==32){
		clearQuote(evt);
	}
	//evt.preventDefault();
}


//Smilies - define swaps much further down below
//The angry, confused, ninja and glaring smilies were created and are copyrighted by Tromac (1/3/2008)
//confused
var smlConfused = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%D0%D6%E3%003%99%11%40%9F-V%A9%3Ff%B3Jm%B3%94%A7%CD(W%AB%2F%5C%AD2_%AEDl%B5%A8%BC%DC%CF%D6%E2%AC%C0%DEe%8F%C6%7B%9E%CD%84%A4%D0%88%A7%D2%91%AD%D4%9A%B4%D8u%9B%CBv%A4%D1%7D%A8%D4%7F%AA%D4%84%AD%D6%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%B7%D0%E7%BC%D3%E8%C3%D8%EB%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%0F%00%0F%00%00%06%98%40%95P%858%10%06%84%03b8%14%14%0C%8F%13%8AD1%14%1CC%07%A1%91B%95F%E0%90%84%80U%15%B8%00%80H%14J%83%22%05%E2!%05%20%ADC%A0%3C%00%B4(FKwy%1E%83%1D%11F%1F%26%60%7B%20%1C%00%1B%8F%1BG'vm%8C%8D%1A%98%1AH(a%20%1E%1D%1B%98%19%A3I%15%23!m%8E%1B%19%00%17%17%10J%0Cl%00%1E%1B%00%1A%18%AD%17%09K%05%13m%9F%B6%AD%16%10q*%02%04%12%9E%A0%B8%AF%04%02M%05%0A%12%CC%16%0B%05%D0LrGIKCA%00%3B\" align = baseline alt \":S\" border=\"none\">";
//ninja
var smlNinja = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%18%18%1F%18%18%1D%18%18%1C%18%18%1A%18%19'%18%1A%2C%18%1A%2B%18%1B0%18%1B%2F%18%1C2%18%1D4%1A%1F6%19%1D2%1C%22%3A%19%1F6%1D%24%3D%19!%3A%19%207%1A%23%3D%1B%26A%1D)D%D0%D6%E3%1D*E%94%A7%CD%20%2FJ%221J%CF%D6%E2%AC%C0%DE%267N.%3FW%7B%9E%CDv%A4%D1%7F%AA%D4%84%AD%D6%3CM_%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%001%00%2C%00%00%00%00%0F%00%0F%00%00%06%95%C0%980%96%11%14%8E%82%CCpx!%08%22%1F%8F%C6!%20p%86%9C%C2%83%E4%D9%60%BE%15E%E1%1A%23l%A5%16K%85%C2%3E%10%88%02%18%60%CEZ%A9%E6%00%D5%A0%D8%01%A4%FEy~%80%20F)~%87w%86%86%25G.%82%86%26%8F%00%23G%2F-x('%25x%22%22%05%02%0D-%2Bv(%25%25%22!%A9%06I%02j%14%12%10%10%0C%0B%09%B5%04J%04%09k%12%13%B2%B4%08%06o1%17%05%0A%AF%BD%B3%09%06%05%17L%04%03%0A%C8%08%03%04%CDKpG%9FJCA%00%3B\" align = baseline alt \"ninja\" border=\"none\">";
//glare
var smlGlare = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%D0%D6%E3%003%99%11%40%9F-V%A9%3Ff%B3Jm%B3%94%A7%CD(W%AB%2F%5C%AD2_%AEDl%B5%A8%BC%DC%CF%D6%E2%AC%C0%DEe%8F%C6%7B%9E%CD%84%A4%D0%88%A7%D2%91%AD%D4%9A%B4%D8u%9B%CBv%A4%D1%7D%A8%D4%7F%AA%D4%84%AD%D6%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%B7%D0%E7%BC%D3%E8%C3%D8%EB%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%0F%00%0F%00%00%06%92%40%95P%858%10%06%84%03b8%14%14%0C%8F%13%8AD1%14%1CC%07%A1%91B%95F%E0%90%84%80U%15%B8S%91(%14%02%81%22%05%E2%A1KR%B7%DD%EEE1%0A%E8%03%40~%00%1D%11F%1F%26%00%23w%00%1C%1B%8D%1BG'uw%1C%8C%1A%96%1AH(a%20%1E%1D%8D%1A%19%A1I%15%89m%1E%8D%19%17%AA%10J%0Ck%9C%7D%1A%18%AA%17%09K%05%13%A6%9E%B2%17%16%10q*%02%04%12%9C%BB%B3%10%04%02M%05%0A%12%BB%16%0B%05%CALrGIKCA%00%3B\" align = baseline alt \"glare\" border=\"none\">";
//angry
var smlAngry = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%FF%FF%FF%D0%D6%E3%003%99%11%40%9F-V%A9%3Ff%B3Jm%B3%94%A7%CD(W%AB%2F%5C%AD2_%AEDl%B5%A8%BC%DC%CF%D6%E2%AC%C0%DEe%8F%C6%7B%9E%CD%84%A4%D0%88%A7%D2%91%AD%D4%9A%B4%D8u%9B%CBv%A4%D1%7D%A8%D4%7F%AA%D4%84%AD%D6%8D%B3%D8%94%B8%DB%93%B6%D9%97%BA%DC%D6%E3%F0%9C%BE%DE%A6%C4%E1%AC%C8%E3%AF%CA%E4%B7%D0%E7%BC%D3%E8%C3%D8%EB%CF%E0%EF%C5%D9%EA%DD%E9%F3%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00*%00%2C%00%00%00%00%0F%00%0F%00%00%06%99%40%95P%858%10%06%84%03b8%14%14%0C%8F%13%8AD1%14%1CC%07%A1%01%40%95F%60%80%84%80U%15%1A%A9%13%40%24%0A%01%40%A0H%81xHME%007%1C%BE(FKl!p%1E%84%1D%11F%1F%26ap%1C%00%1B%8F%1BG'%24mo%1C%8D%1A%99%1AH(%60%82%1E%1D%1B%99%19%A4I%15%23!%82%1C%8F%A4%17%17%10J%0Cm%20%00%B5%B5%AE%17%09K%05%13n%A0%A2%18%00%16%10s*%02%04%12%20%BF%1A%18%AF%04%02M%05%0A%12%A1%1A%16%0B%05%D0LtGIKCA%00%3B\" align = baseline alt \":D\" border=\"none\">";
//smiling
var smlHappy = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%8D%B3%D8%3Ff%B3%003%99%B7%D0%E7u%A3%D1%FF%FF%FFe%8F%C6-V%A9%A8%BC%DC%CF%E0%EF%94%A7%CD%96%B9%DC%BC%D3%E8%11%40%9F%84%A4%D0f%99%CC%AC%C8%E3%CF%D6%E2%93%B6%D9u%9B%CB%D6%E3%F0%AC%C0%DE%84%AD%D6%2F%5C%AD%8C%A5%D6Jm%B3%7D%A8%D4%94%B8%DB%C5%D9%EA%D0%D6%E3%9C%BE%DE%A6%C4%E1%AF%CA%E4%DD%E9%F3%AD%C5%DE%91%AD%D42_%AEDl%B5f%99%CC%7B%9E%CD%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%96%40%96%90%B5%D08%06%0E%CDb8%F4%20%04%16E%87%40%12%20%24C%89%23!%EA4B%60%D0%C3%81e!%B8%00%40%24%02J%7FP%08%A2%A6KX%83%3Ex%7C%A9%18mD%00w%1F%00%1C%84(F%15)%60%00x%1C%00%01%8F%01G%0Au%20w%84%01%17%99%17H%1D!%80%1F%0C%0C%98%17%00%1B%1BI%2B%9Ei%AB%AB%05%07J%26l%00%06%B4%B4%00%05%05*K%08%0Fw%AC%B7%AEq%2C%1E%0E%0Fx%13%98%1B%AE%0E%1EM%08%18%0F%C8%17%14%25%08%CDLrGIKCA%00%3B\" align = \"baseline\" title=\":)\" alt=\":)\" border=\"none\">";
// frowning
var smlFrown = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6-V%A9%003%99%AF%CA%E4%94%A7%CD%CF%D6%E2%7D%A8%D4%A8%BC%DC%3Ff%B3f%99%CC%8D%B3%D8%CF%E0%EF%11%40%9F%7B%9E%CD%BC%D3%E8%9C%BE%DE%AC%C0%DE%84%AD%D6%D6%E3%F0u%9B%CB%AC%C8%E3%93%B6%D9%2F%5C%AD%88%A7%D2Jm%B3%97%BA%DC%C5%D9%EA%84%A4%D0%D0%D6%E3%A6%C4%E1%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AE%7F%AA%D4v%A4%D1Dl%B5f%99%CC%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%95%40%96%90e%D08%08%0E%8Da8%F4%0C%14%92%06'4R%0C%0E%C3%83%23%01%E2%40%0A%E0O%C7%81e%0D%B8%80%90%C5%F2%01%00%22%8F%01Q%D3%0D%01%3E%9F%88%5EO*F!ky%11%1B%84%17%0FF%14)%60o%11%01%00%0C%90%0CG%0Djm%8D%8E%13%99%13H%1Ca%83%17%0C%99%25%A3I%2B%05x%8D%90%A3%26%26%02J'l%11n%B3%AC%26*K%03%19m%1B%A0%13%08%00%15%02r%2C%1E%0E%1D%9F%A1%08%AD%0E%1EM%03%18%1D%BD%15%24%03%CDLsGIKCA%00%3B\" align = baseline title=\":(\" alt=\":(\" border=\"none\">";
// sticking tongue out
var smlRazz = "<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%7D%A8%D4-V%A9%FF%00%00%003%99f%99%CC%AC%C0%DE%BC%D3%E8%96%B9%DC%3Ff%B3%94%A7%CDe%8F%C6%8D%B3%D8%CF%E0%EF%11%40%9F%7B%9E%CD%A8%BC%DC%AF%CA%E4%CF%D6%E2%93%B6%D9%88%A7%D2%D6%E3%F0u%9B%CB%AC%C8%E3%2F%5C%AD%84%AD%D6Jm%B3%94%B8%DB%C5%D9%EA%84%A4%D0%D0%D6%E3%9C%BE%DE%A6%C4%E1%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AEu%A3%D1f%99%CCDl%B5%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%96%40%96%90%A5%D08%08%0E%8Db8%F4%08%12%86%06GDJ%08%24C%89%03%12%E2%1C%22%60P%C7%81e%09%B8%00%C0%E5%02J%7F%1E%02%A2%A6%2BZ%83%3Ex%7C%A9%18%3D%5C%00w%1F%00%1B%84%0FF%15)%60%00x%1B%00%0C%8F%0CG%0Du%20w%84%0C%19%99%19H%1C%11%80%1F%08%08%98%19%00%01%01I%2B%9Ei%AB%AB%26%0BJ(l%00%03%B4%B4%00%26%26*K%02%14w%B3%B6%B8%0Bq%2C%1E%0E%1Dx%B3%A5%AE%0E%1EM%02%18%1D%13%98%16%25%02%CDLrGIKCA%00%3B\" align = baseline title=\":P\" alt=\":P\" border=\"none\">";
// big grin
var smlGrin ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DB%3Ff%B3%003%99%CF%D6%E2u%A3%D1%FF%FF%FFe%8F%C6-V%A9%AC%C8%E3%94%A7%CD%A8%BC%DC%84%AD%D6%BC%D3%E8%CF%E0%EF%11%40%9Ff%99%CC%84%A4%D0%91%AD%D4%9A%BC%DDu%9B%CB%D6%E3%F0%AC%C0%DE%AF%CA%E4%8D%B3%D8%2F%5C%AD%C5%D9%EBJm%B3%A6%C4%E1%D0%D6%E3%7C%A8%D3%94%BD%DE%8C%A5%D6%DD%E9%F3%9A%B4%D8%AD%C5%DE%B7%D0%E72_%AE%C5%D9%EADl%B5f%99%CC%7B%9E%CD(W%AB%93%B6%D9%C8%DB%EC%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00-%00%2C%00%00%00%00%0F%00%0F%00%00%06%8F%C0%96%B0%A5%D8%3C%06%8F%8Db8%EC%20%04%16%87%86%24%11%20%08C%C2c%11b5.%60N%E4%81m!%B8%2CR%22%C1isR%08%E2%A6K%02%B8%01%93%7C%A9%18m%24%ECy%00%01%83)F%15%00ay%83%18%18%00%18G%0E%00%92%93%94%00%0CH%26%00%06%9B%9C%9C%00%1EI%22%17%9A%9D%9B%00%05%07J'l%A4%9E%05%05*K%08%11%1C%13%95%AF%07q-%1D%0F%11y%2B%18%0C%1E%A8%0F%1DM%08%19%11%C0%0C%14%25%08%C6LrGIKCA%00%3B\" align = baseline alt \":D\" border=\"none\">";
// neutral, straight mouth
var smlNtl ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6%003%99%AC%C0%DE-V%A9%BC%D3%E8%94%A7%CD%7D%A8%D4%3Ff%B3%9C%BE%DEf%99%CC%CF%E0%EF%8D%B3%D8%11%40%9F%7B%9E%CD%AF%CA%E4%A8%BC%DC%CF%D6%E2%84%AD%D6%D6%E3%F0u%9B%CB%AC%C8%E3%93%B6%D9%2F%5C%AD%88%A7%D2Jm%B3%C5%D9%EA%84%A4%D0%97%BA%DC%D0%D6%E3%A6%C4%E1%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AE%7F%AA%D4u%A3%D1Dl%B5f%99%CC%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%95%40%96%90u%D08%06%0E%CDa8%F4%14%12%04%C6%264J%14%24C%89%23%02%DA%18%20%E0%0F%C7%81e%15%B8%80%90%C5%F2%01%00%14%8F%02Q%03J%AF%3F%8A%7C%9ET%8C%1A%2C%00x%0A%00%01%85%0FF%14)%60o%0A%01%00%0D%90%0DG%0Cj%1Fx%85%0D%13%9A%13H%1Ba%0A%1D%17%99%13%25%A5I%2B%10%96%8D%90%A5%26%26%02J'ln%B4n%AE*K%05%19x%A1%99%08%AE%02r%2C%1E%0E%1C%A0%A2%13%BF%02%0E%1EM%05%18%1C%C8%15%24%05%CDLsGIKCA%00%3B\" align = baseline alt \":|\" border=\"none\" >";
// wink
var smlWink ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6-V%A9%003%99%AC%C0%DE%BC%D3%E8%94%A7%CD%7D%A8%D4%3Ff%B3%A8%BC%DCf%99%CC%CF%E0%EF%8D%B3%D8%11%40%9F%7B%9E%CD%AF%CA%E4%9C%BE%DE%CF%D6%E2%84%AD%D6%D6%E3%F0u%9B%CB%AC%C8%E3%93%B6%D9%2F%5C%AD%88%A7%D2Jm%B3%C5%D9%EA%84%A4%D0%A6%C4%E1%94%BD%DE%D0%D6%E3%DD%E9%F3%B7%D0%E7%AD%C5%DE%91%AD%D42_%AE%7F%AA%D4u%A3%D1Dl%B5f%99%CC%C3%D8%EB(W%AB%9A%B4%D8%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%2C%00%2C%00%00%00%00%0F%00%0F%00%00%06%97%40%96%90u%D08%08%0E%CDa8%FC%0C%12%05%C6%264J%0C%24C%89C%01%DA%18%20%E0%0E%C7%81e%0D%B8%80%90%C5%D2iw%1E%03%A2%06%94%5Ew%22x%3C%A9%185X%00w%11%00%00%17%17%0FF%14)%60%00x%01%01%0D%90%0DG%0Cjm%11%8E%0D%13%9A%13H%1Ba%97%8F%13%00%25%A4I%2B%10%96%8F%0D%25%00%26%26%02J'l%00%1E%17%99%AD%AE*K%03%19w%83%83%08%AE%02q%2C%1F%0E%1Cx%B6%13%C1%02%0E%1FM%03%18%1C%CA%15%24%03%CFLrGIKCA%00%3B\" align = baseline alt \";)\" border=\"none\" >";

var smlRoll ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%E6%00%00%FF%FF%FF%ED%ED%ED%DD%E9%F3%D9%E7%F2%D6%E3%F0%CF%E0%EF%CE%DF%ED%CA%DC%ED%C5%D9%EB%D0%D6%E3%CF%D6%E2%C5%D9%EA%C3%D8%EB%BD%D4%E8%BC%D3%E8%BB%D2%E8%B9%D1%E7%B7%D0%E7%B9%CF%E6%B1%CB%E5%B0%CA%E4%AE%C9%E4%AD%C9%E3%AC%C8%E3%AA%C6%E2%A9%C6%E2%A8%C5%E2%A7%C5%E1%A6%C4%E1%AE%C1%DF%A5%C3%E1%A4%C2%E0%A3%C2%E0%AC%C0%DE%A0%C0%DF%A8%BC%DC%9F%BF%DF%9E%BF%DE%9D%BE%DE%9C%BE%DE%9A%BC%DD%99%BB%DD%98%BA%DC%98%BB%DC%97%BA%DC%96%B9%DC%94%B8%DB%92%B7%DA%93%B6%D9%9A%B4%D8%92%B6%DA%91%B6%DA%90%B5%DA%8D%B3%D9%8D%B3%D8%8B%B2%D8%8A%B1%D8%87%AF%D6%87%AF%D7%91%AD%D4%85%AE%D6%86%AE%D6%84%AD%D6%83%AD%D6%95%A8%CE%96%A8%CE%81%AB%D5%94%A7%CD%80%AA%D4%88%A7%D2%7F%AA%D4~%A9%D4%7D%A8%D4%7C%A8%D3%84%A4%D0%82%A3%D0%82%A2%D0x%A5%D2v%A4%D1u%A3%D1~%9F%CEs%A1%D0%7B%9E%CDo%9F%CFu%9B%CBk%93%C8e%8F%C6_%8B%C4Lo%B4Io%B6Kn%B4Jm%B3Dl%B5%40i%B3%3Ff%B32_%AE2%5E%AE%2F%5C%AD.W%A9(W%AB-V%A9%12A%9F%11%40%9F%10%3F%9F%035%9A%024%9A%014%99%00%00%00%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%0A%00l%00%2C%00%00%00%00%0F%00%0F%00%00%07%B9%80l%82lC%5Bfif%5B%40%83%83%09d%5E%1D%06%08%12%3B%5Db%0A%83%0Af%23%03%07%0E%14%17%18%1AJg%98lb%9Ckk%16%19%1C%AA%22PblAY%02k%00%00k%1F%B7%B9%2B_%40X!%BC%B8%C3%B9R%5Be%04%B7%AA%B9%B9%CB6gh%05%0D%AA%AF%D5k7%3Eje%0B%13%19%AA-47%AAFHDgX1%15%1B%22(.5%3ABIMNUZA%5C%17%1C%24%2B2%D9GM%A2L%19%B3HL%11%0F%25%AE%ADy2%E5%8A%2C6%09%CC0)%A1b%06%8E%1FI%9CX9%93%A0%91%980K%60%DC%C8A%05%8C%98%8E%8C%D8%00%D1b%06%8D%99%7B%8C%02%01%00!%F9%04%05%0A%00l%00%2C%04%00%05%00%08%00%07%00%00%07%18%80lk%83l%82%84%87%82%00%85%85%8A%8B%8E%8F%90%91l%2C%8Ekl%81%00!%F9%04%05%0A%00l%00%2C%04%00%04%00%07%00%09%00%00%07%16%80lkl%84%82%85%87%00%88%84%89%85%8C%87%8F%90%91%8F%83%87%81%00!%F9%04%052%00l%00%2C%04%00%04%00%08%00%07%00%00%07%17%80kl%83lk%86%86%00%83%88%00%8C%84%8D%84%90%91%92%93%91k%81%00!%F9%04%05%0A%00l%00%2C%04%00%04%00%07%00%09%00%00%07%1A%80%00%00l%84%82%83%84%85k%8Al%8Ak%8C%88%8E%88%92%93%94%95%92*%93%81%00!%F9%04%05%0A%00l%00%2C%02%00%03%00%0B%00%09%00%00%075%80l%82%11%82l%20%85l%07%11%17%1Al%22%26()l%05k%95k%25%96k2%88%00l%9D%88l%96.%96%88%20'%85%3DB%A0%AB%AC%88Q%88%99kO%82%81%00!%F9%04%05%0A%00l%00%2C%02%00%04%00%0B%00%07%00%00%07%2B%80lkl%84%85%82%84%0F%16%1A%20l(%2C.%2Fl%0C%83%82)%94k7l%17%1C%22(l47%3A%3C%86%A4%A5%A6%85%94%A5%81%00!%F9%04%09%0A%00l%00%2C%00%00%00%00%0F%00%0F%00%00%07%2B%80l%82%83%84%85%86%87%88%89%8A%88%07%87)%86k%91kl%92%93%84k%00%82%00%98%9A%96%83%95%94%92%8B%A3%A4%A5%A6%A7%A8%8A%81%00%3B\" align = baseline alt \"rolls eyes\" border=\"none\" >";

var smlShock ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%D5%00%00%00%00%00%94%B8%DBe%8F%C6%003%99%BC%D3%E8-V%A9%FF%FF%FF%88%A7%D2%A6%C4%E1%84%A4%D0%3Ff%B3%CF%E0%EFu%A3%D1%8D%B3%D8%AC%C8%E3%11%40%9F%9D%BE%DEf%99%CC%CF%D6%E2%A8%BC%DCu%9B%CB%D6%E3%F0%AF%CA%E4%91%AD%D4%7D%A8%D4%84%AD%D6%2F%5C%ADJm%B3%AE%C1%DF%C5%D9%EA%D0%D6%E3%94%A7%CD%94%BD%DE%DD%E9%F3%9A%B4%D8%B7%D0%E7%AC%C0%DE2_%AE%7F%AA%D4Dl%B5f%99%CC%7B%9E%CD%C3%D8%EB(W%AB%93%B6%D9%ED%ED%ED%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00-%00%2C%00%00%00%00%0F%00%0F%00%00%06%92%C0%96%B0%F5%D9%3C%06%8F%CDg8%F4%14%14%9CEgtQ%14%24C%C9c%12%EA%10%2C%60D%E2%81m%15%B8%00%80%C3%81HCR%05%E2%A6%3BZ%23%20x%7C%A9HZ%10%1C%00w%10%00%01%85)F%15*%60%00x%01%00%0D%90%0DG%0Bu%08w%85%0D%19%9A%19H%1Dai%A0%26%A2%26I%22%16m%06%A9%A9%00%0C%0C%02J'l%00%AA%AB%AD%2BK%05%07w%B3%B5%AEq-%1E%0F%09x%A0%18%AE%0F%1EM%05%1A%09%2C%99%14%25%05%C9LrGIKCA%00%3B\" align = baseline alt \"rolls eyes\" border=\"none\" >";

var smlEvil ="<img src =\"data:image/gif,GIF89a%0F%00%0F%00%E6%00%00%00%00%00f%99%CC%A3%A3%A3JJJ%FF%00%00%BF%C7%CE333k%81%97%FFf%00%FF%FF%FF%96%B9%DC%C8%DB%ED%FF%3C%00%8C%AC%CDAAAY%5B%5C%B6%CF%E6w%92%AB%A5%C3%E1%FF%99%00%FF%1E%00%8F%B5%DA%7C%A8%D3%D7%E1%EB%FF%99%00%9B%B7%D1%8B%98%A5%A7%B4%BE%AD%C8%E3%CC%CC%CC%81%81%81%BE%D4%E9UUU%5E__%3C%3C%3C%DC%E8%F3%8C%9F%B2DGJ%83%AD%D6%C7%D5%E3%FFv%00%FFJ%00%AD%C5%DE%BC%CF%E1%CC%DA%E7%8F%B4%D7NUZ%9C%BD%DEu%A3%D1%AE%CA%E4p%85%99%A3%B3%C4%93%B7%DBfff%7B%AD%D6Y%5D%60%D8%E6%F2%C3%D7%EB%CE%DF%EF%8C%AD%D6%7C%94%AC%FF'%00%8F%9B%A7PTX%E5%E5%E5%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%05%14%00%40%00%2C%00%00%00%00%0F%00%0F%00%00%07%B5%80%03%20%1D%40%025%0E%06%0E5%02%40%17%1E!%06%04%3D!%0F%05%2C9%2B37%03%0C%14%25%22)(%178%0B%1F1%A7%12*%08)%22%22%13%13%00%0B%10%1C%1C%12%B6%00%13(%AD%23%23%0B%00%B4%B6%2F%00%0A%C4%BB%3A%1F%00%00%12%2F%C2%004%CF%06%2289%00%04%C9%0A%C9%D6%3B%3B%06%06%3A%10%D5%04%2F%CF%04%D6%26%26%89'%A7%D7%15%15%C9%16%16%0D%8A%1B1%00%1F%E34%E7%16%000%11%8B%0F%1C%92%09%1C%08%C3%05%23%10%3E%24%00H%C0%90!%BF%03%20%80%00%E9%E0%40C3%810d8%20%24%B1%03%88%1F%242%B4%D8%C1%A3%C4%20%89(%0B%1DJ%B4(e%20%00%3B\" align = baseline alt \"rolls eyes\" border=\"none\" >";

var imgStar ="<img src =\"data:image/gif,GIF89a%15%00%14%00%B3%02%00%F6%DDd%DF%D6%B1%FF%FF%FE%C8%B7d%EB%CBB%D4%B65%F6%E6%A5%B9%B0%7C%CF%C7%A9%EC%EC%E2%F1%EE%E8%F4%F2%EC%E3%DF%BF%C3%ABF%D6%C7%82%E5%E1%D1!%F9%04%01%00%00%02%00%2C%00%00%00%00%15%00%14%00%00%04yP%C8I%11%BD%F8%9E%CC%AF%0B%5D%F7%18N%C89%00ab%0F%90%82%EB%14%B8D%99%3D%01%A3%3F8%9A%129%9En%E7(%B8%0C%06%17M%89L%0D%1E%12D%81%A0TR%8F%84%82m%F2%18L%09WZ%B6%01%C3%14%BF%E0l%E1%19r%A4%D1%83%95%5B%8D%5E%81%0Bx4%23%14%B87%06%0D_%5B%19n%05d%02%0F%07_!%04%0D%1B%15%81%7B%19%01%0D%16%2C%03%83%15P%1D%96%12%11%00%3B\" align = baseline alt \"rolls eyes\" border=\"none\" >";



//JB buttons
// buttons to add
//
  var buttons={
    whirlBold        :{ value:"-b-old",     whirl:"*",  key:"b" },
    whirlItalic      :{ value:"-i-talic",   whirl:"/",  key:"i" },
    whirlSingleQuote :{ value:"'quo-t-e'",  whirl:"'",  key:"t" },
    whirlDoubleQuote :{ value:'"-q-uote"',  whirl:'"',  key:'q' },
    whirlQuote       :{ value:"w-h-o",      whirl:"+",  key:"h" }, // looks like rubbish
    whirlSuperscript :{ value:"su-p-er",    whirl:"^",  key:"p" },
    whirlSubscript   :{ value:"sub-\\-",    whirl:"\\", key:"\\" },
    whirlStrike      :{ value:"stri-k-e",   whirl:"-",  key:"k" },
    whirlCourier     :{ value:"-c-ourier",  whirl:"#",  key:"c" },
    whirlSmall       :{ value:"s-m-all",    whirl:"()", key:"m" },
    whirlGrey        :{ value:"g-r-ey",     whirl:"`",  key:"r" },
    whirlSerif       :{ value:"-s-erif",    whirl:"~",  key:"s" },
    whirlGoogle      :{ value:"-g-oogle",   whirl:"?",  key:"g" },
    whirlEscape      :{ value:"-e-sc",      whirl:".",  key:"e" },
    whirlWiki        :{ value:"-w-iki",     whirl:"[]", key:"w", re:/_/g, replace:" " },
    makeUrlText      :{ value:"-l-ink",                 key:"l" },
    makeUrlHref      :{ value:"-u-rl",                  key:"u" },
  };
//
// add buttons to el, they will add whirlcode to element txtDest
//end JB buttons



//load settings////////////////////////////	

var wlrVers = GM_getValue('version',0)*1;
//alert('wlrVers: ' +wlrVers);
if(wlrVers < currentVersion){
	//first run (0.5 is the first version to track these things, make a nested if statement for new versions so they don't override settings already set by user)
	alert('This version of Whirlpool Last Read is being run for the first time, new settings will use default values');
	if(wlrVers < 0.501){
		GM_setValue('lRead', 1);
		GM_setValue('styleFlip', 0);
		GM_setValue('smilies', 1);
		GM_setValue('preName', "");
		GM_setValue('postName', " writes...");
		GM_setValue('prevDone',0);
		GM_setValue('threadRead',"");	
		GM_setValue('qPost', 0);
		GM_setValue('ignoreSwitch', 0);
		GM_setValue('qqRows', 10);
		GM_setValue('hideDRThreads', 0);
		GM_setValue('autoSubscribe', 0);
	}	
	if(wlrVers < 0.502){
		GM_setValue('imgL', 0);	
	}
	if(wlrVers < 0.503){
		GM_setValue('autoClear', 1);
	}
	if(wlrVers < 0.61){
		GM_setValue('smallMon', 0);
		GM_setValue('avatar', 0);
	}
	if(wlrVers < 0.67){
		GM_setValue('navMenu',1);
		GM_setValue('theme_enabled', 0);	
	}
	GM_setValue('floatQuote', 0);
	GM_setValue('qqNum', 3);
	GM_setValue('currentQq',1);
	GM_setValue('customCSS','a{}');
	GM_setValue('WLRmaxValue', 400);
	GM_setValue('imgWidth', 300);
	GM_setValue('version', currentVersion);
}
//these are not editable, the numbers are just defaults that will be used if values in about:config get damaged.
var WLRmaxValue =GM_getValue('WLRmaxValue',300);
var zImgWidth =GM_getValue('imgWidth', 300);
var lRead = GM_getValue('lRead');
var smallMon = GM_getValue('smallMon');
var styleFlip = GM_getValue('styleFlip');
var avatar = GM_getValue('avatar');
var theme_enabled = GM_getValue('theme_enabled', 0);
var smilies =GM_getValue('smilies');
var autoClear = GM_getValue('autoClear',0);
var qPost = GM_getValue('qPost');
var ignoreSwitch = GM_getValue('ignoreSwitch');
var qqRows = GM_getValue('qqRows');
var hideDRThreads = GM_getValue('hideDRThreads');
var autoSubscribe = GM_getValue('autoSubscribe');

var navMenu = GM_getValue('navMenu');
var prevDone = GM_getValue('prevDone')*1;
var imgL = GM_getValue('imgL',0);
var floatQuote = GM_getValue('floatQuote', 0);
var rank = GM_getValue('rank', 0);
var qqNum = GM_getValue('qqNum', 3);
var currentQq = GM_getValue('currentQq', 1);
var customCSS = GM_getValue('customCSS','a{}');
//end user modifiable settings, Only change things below this line if you know what you're doing.

var threadDisplay = "&n=" +GM_getValue('threadDisplay',30);

// Number of posts per page, DONT CHANGE THIS YET OR YOU"LL BREAK STUFF
var pperpage =  20;

// Number of alternate images for current theme.
var theme_alt =2;
//misc. variables, 
var allThread, thisThread, topic, position, startPos, userNum;
//url of current page
urlcheck = window.location.href;
window.picArray = new Array();


//nav bar

//css
//addGlobalStyle('div.menuHD:hover{background-color: #9999FF;}');
addGlobalStyle(customCSS);

if (navMenu>0){
addGlobalStyle('.mainMenu ul {	list-style-type: none; z-index: 50 !important;} .mainMenu ul ul li {background:  #616CA3; padding: 5px;} .mainMenu ul ul li:hover{ background-color:#FF9933;} .mainMenu { width: auto; font-family: Arial, sans-serif;} .mainMenu > ul > li {  background: #3A437B; left: -38px; font: 1.2em arial, sans-serif;} .mainMenu ul li:hover{background:#FF9933;} .mainMenu li.more:after{ content: url(../images/arrow.gif);} .mainMenu > ul { margin: 0; font: 0.9em Arial, sans-serif; border-left:10px black solid; width: 92%;} .mainMenu a {text-decoration: none; color: white;} .mainMenu > ul li { list-style-type: none; border:black solid 1px; border-left: 3px; position: relative;  margin: 0;} .mainMenu > ul ul {display: none;}  .mainMenu > ul li:hover > ul {display: block;	position: absolute; top: -1px; left: 70%; z-index: 3; width: 10em; font: 0.8em Arial, sans-serif;} .mainMenu > li a { display: block; text-decoration: none;}  #searchMenu  ul li:hover > ul {display: block; width: 300px !important;} ');

//"Your Links" on navbar
//addGlobalStyle('#nav_info div.nav_item {display: none}');
//var yourLinksBar = document.getElementById('nav_info');
//if (yourLinksBar) {
//    yourLinksBar.parentNode.removeChild(yourLinksBar);
//}

//Check which lounges are avaliable to load into menu - Tromac
if((document.location.host.indexOf("whirlpool") >= 0) && (document.location.pathname=="/" || document.location.pathname=="/forum.cfm")&&document.location.host.indexOf("forums.") !== -1) {
    var sections={};
    var things = document.evaluate('//TD[@class="indexL2"]/DIV/A/B', 
								   document.body, 
								   null, 
                                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
								   null);
    var currSect=null;
	GM_setValue('tprLounge', 'false');
	GM_setValue('partLounge', 'false');
	GM_setValue('itnLounge', 'false');
    for(var i=0; i<things.snapshotLength; i++) {
      var el=things.snapshotItem(i);
	  if (el.firstChild.nodeValue == "Movie Lounge") {
		  GM_setValue('partLounge', 'true');
		  //GM_log(el.firstChild.nodeValue); //Section Titles
		  //GM_log(GM_getValue('participantLounge'));
	  }
	  if (el.firstChild.nodeValue == "In the News") {
		  GM_setValue('itnLounge', 'true');
		  //GM_log(el.firstChild.nodeValue); //Section Titles
		  //GM_log(GM_getValue('itnLounge'));
	  }
	  if (el.firstChild.nodeValue == "The Pool Room") {
		  GM_setValue('tprLounge', 'true');
		  //GM_log(el.firstChild.nodeValue); //Section Titles
		  //GM_log(GM_getValue('trpLounge'));
	  }
	}
}


//other settings

var SettingMenu = "Settings,"
					+"WLR Settings^http://forums.whirlpool.net.au/index.cfm?a=wiki&tag=wlr,"
					+"User Page^http://forums.whirlpool.net.au/forum-user.cfm,"
					+"Whirlpool settings^http://whirlpool.net.au/user.cfm,";
var SettingArray = new Array();
SettingArray = SettingMenu.split(RegExp(" *, *", "gi"));	


// Test if has access to TPR
if (GM_getValue('tprLounge') == 'true') {
	var WhirlMenu = "Whirlpool,"
				+"Forum Feedback^http://forums.whirlpool.net.au/forum-threads.cfm?f=35,"
				+"Choose ISP^http://forums.whirlpool.net.au/forum-threads.cfm?f=92,"
        		+"The Pool Room^http://forums.whirlpool.net.au/forum-threads.cfm?f=117,";
} else {
	var WhirlMenu = "Whirlpool,"
				+"Forum Feedback^http://forums.whirlpool.net.au/forum-threads.cfm?f=35,"
				+"Choose ISP^http://forums.whirlpool.net.au/forum-threads.cfm?f=92,";
}

var WhirlArray = new Array();
WhirlArray = WhirlMenu.split(RegExp(" *, *", "gi"));

var MobileMenu = "Mobile,"

         			+"Mobile Carriers^http://forums.whirlpool.net.au/forum-threads.cfm?f=114,"
         			+"Mobile Phones^http://forums.whirlpool.net.au/forum-threads.cfm?f=123,"
         			+"Wireless ISPs^http://forums.whirlpool.net.au/forum-threads.cfm?f=18,";

var MobileArray = new Array();
MobileArray = MobileMenu.split(RegExp(" *, *", "gi"));


var CompaniesMenu = "Companies," 
				+"BigPond^http://forums.whirlpool.net.au/forum-threads.cfm?f=14,"
         		+"OptusNet^http://forums.whirlpool.net.au/forum-threads.cfm?f=15,"
         		+"Internode^http://forums.whirlpool.net.au/forum-threads.cfm?f=68,"
         		+"iiNet/OzEmail^http://forums.whirlpool.net.au/forum-threads.cfm?f=72,"    
				+"Netspace^http://forums.whirlpool.net.au/forum-threads.cfm?f=69,"    
				+"WestNet^http://forums.whirlpool.net.au/forum-threads.cfm?f=94,"    
				+"TPG^http://forums.whirlpool.net.au/forum-threads.cfm?f=90,"        
				+"aaNet^http://forums.whirlpool.net.au/forum-threads.cfm?f=102,"          
				+"Exetel^http://forums.whirlpool.net.au/forum-threads.cfm?f=105,"
				+"Adam^http://forums.whirlpool.net.au/forum-threads.cfm?f=109,"
				+"AAPT^http://forums.whirlpool.net.au/forum-threads.cfm?f=119,";

var CompaniesArray = new Array();
CompaniesArray = CompaniesMenu.split(RegExp(" *, *", "gi"));

var TechMenu = "Technology,"
				+"Broadband General^http://forums.whirlpool.net.au/forum-threads.cfm?f=100,"
				+"DSL Hardware^http://forums.whirlpool.net.au/forum-threads.cfm?f=82,"	
                		+"Networking^http://forums.whirlpool.net.au/forum-threads.cfm?f=9,"
        			+"Voice over IP^http://forums.whirlpool.net.au/forum-threads.cfm?f=107,"
           			+"Coding & Web^http://forums.whirlpool.net.au/forum-threads.cfm?f=63,"
           			+"Web Hosting^http://forums.whirlpool.net.au/forum-threads.cfm?f=116,"
        			+"IT Industry^http://forums.whirlpool.net.au/forum-threads.cfm?f=80,"
           			+"Telecomms^http://forums.whirlpool.net.au/forum-threads.cfm?f=125,"	
           			+"Peer to Peer^http://forums.whirlpool.net.au/forum-threads.cfm?f=87," 
				+"On the Internet^http://forums.whirlpool.net.au/forum-threads.cfm?f=91,";

var TechArray = new Array();
TechArray = TechMenu.split(RegExp(" *, *", "gi"));

var CompMenu = "Computers,"
				+"PC Hardware^http://forums.whirlpool.net.au/forum-threads.cfm?f=7," 
				+"Windows^http://forums.whirlpool.net.au/forum-threads.cfm?f=10,"
        			+"Apple^http://forums.whirlpool.net.au/forum-threads.cfm?f=38,"
        			+"Linux-BSD^http://forums.whirlpool.net.au/forum-threads.cfm?f=39,";

var CompArray = new Array();
CompArray = CompMenu.split(RegExp(" *, *", "gi"));

// Test if has access to lounges
if (GM_getValue('itnLounge') == 'true') {
	var LoungeMenu = "Lounges,"
				+"Music^http://forums.whirlpool.net.au/forum-threads.cfm?f=112,"
				+"Gaming^http://forums.whirlpool.net.au/forum-threads.cfm?f=8,"
				+"Gadgets^http://forums.whirlpool.net.au/forum-threads.cfm?f=83,"	
           		+"Movies^http://forums.whirlpool.net.au/forum-threads.cfm?f=58,"
        		+"Television^http://forums.whirlpool.net.au/forum-threads.cfm?f=106,"
				+"Lifestyle^http://forums.whirlpool.net.au/forum-threads.cfm?f=71,"
           		+"Sports^http://forums.whirlpool.net.au/forum-threads.cfm?f=118,"
           		+"In The News^http://forums.whirlpool.net.au/forum-threads.cfm?f=85,";

} else if (GM_getValue('partrLounge') == 'true') {
	var LoungeMenu = "Lounges,"
				+"Music Lounge^http://forums.whirlpool.net.au/forum-threads.cfm?f=112,"
				+"Gaming Lounge^http://forums.whirlpool.net.au/forum-threads.cfm?f=8,"
				+"Gadget Lounge^http://forums.whirlpool.net.au/forum-threads.cfm?f=83,"	
           		+"Movie Lounge^http://forums.whirlpool.net.au/forum-threads.cfm?f=58,"
        		+"TV Lounge^http://forums.whirlpool.net.au/forum-threads.cfm?f=106,"
				+"Lifestyle Lounge^http://forums.whirlpool.net.au/forum-threads.cfm?f=71,"
           		+"Sports Lounge^http://forums.whirlpool.net.au/forum-threads.cfm?f=118,";
} else {
	var LoungeMenu = "Lounges,"
				+"Music Lounge^http://forums.whirlpool.net.au/forum-threads.cfm?f=112,"
				+"Gaming Lounge^http://forums.whirlpool.net.au/forum-threads.cfm?f=8,";
}

var LoungeArray = new Array();
LoungeArray = LoungeMenu.split(RegExp(" *, *", "gi"));

var ConnectionsMenu = "Connections,"

				+"Regional Satellite^http://forums.whirlpool.net.au/forum-threads.cfm?f=67," 
				+"Other broadband^http://forums.whirlpool.net.au/forum-threads.cfm?f=31,";

var ConnectionsArray = new Array();
ConnectionsArray = ConnectionsMenu.split(RegExp(" *, *", "gi"));

var SearchMenu = 'Search,'
				+'<form method="get" action="http://www.google.com.au/custom" target="_top">'
				+'<table border="0">'
				+'<tr><td nowrap="nowrap" valign="top" align="left" height="32">'
				+'<a href="http://www.google.com/">'
				+'<img src="http://www.google.com/logos/Logo_25gry.gif"'
				+'border="0" alt="Google"></img></a>'
				+'<br/>'
				+'<input type="hidden" name="domains" value="forums.whirlpool.net.au"></input>'
				+'<input type="text" name="q" size="31" maxlength="255" value=""></input>'
				+'</td></tr>'
				+'<tr>'
				+'<td nowrap="nowrap">'
				+'<table>'
				+'<tr>'
				+'<td>'
				+'<input type="radio" name="sitesearch" value="" checked="checked"></input>'
				+'<font size="-1" color="#000000">Web</font>'
				+'</td>'
				+'<td>'
				+'<input type="radio" name="sitesearch" value="forums.whirlpool.net.au"></input>'
				+'<font size="-1" color="#000000">forums.whirlpool.net.au</font>'
				+'</td>'
				+'</tr>'
				+'</table>'
				+'<input type="submit" name="sa" value="Search"></input>'
				+'<input type="hidden" name="client" value="pub-7496209822319635"></input>'
				+'<input type="hidden" name="forid" value="1"></input>'
				+'<input type="hidden" name="channel" value="3230816441"></input>'
				+'<input type="hidden" name="ie" value="ISO-8859-1"></input>'
				+'<input type="hidden" name="oe" value="ISO-8859-1"></input>'
				+'<input type="hidden" name="cof" value="GALT:#008000;GL:1;DIV:#336699;VLC:663399;AH:center;BGC:FFFFFF;LBGC:336699;ALC:0000FF;LC:0000FF;T:000000;GFNT:0000FF;GIMP:0000FF;FORID:1;"></input>'
				+'<input type="hidden" name="hl" value="en"></input>'

				+'</td></tr></table>'
				+'</form>';

var SearchArray = new Array();
SearchArray = SearchMenu.split(RegExp(" *, *", "gi"));



//main
catergories = new Array();
//top of sidebar
allDivs = document.evaluate(
	//directly below logo
	"//td[@class='pagenav']/div[2]",
	//middle of sidebar
	// "//div[@class='un_welc1']",
	//just before 'Your Links section
    // "//div[@class='un_stuff'][last()]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
    welcomeDiv = allDivs.snapshotItem(0);
	menuDiv = makeMenu(SettingArray,"");
	welcomeDiv.parentNode.insertBefore(menuDiv, welcomeDiv);
	menuDiv = makeMenu(WhirlArray,threadDisplay);
	welcomeDiv.parentNode.insertBefore(menuDiv, welcomeDiv);
	menuDiv = makeMenu(MobileArray,threadDisplay);
	welcomeDiv.parentNode.insertBefore(menuDiv, welcomeDiv);
	menuDiv = makeMenu(CompaniesArray,threadDisplay);
	welcomeDiv.parentNode.insertBefore(menuDiv, welcomeDiv);
	menuDiv = makeMenu(TechArray,threadDisplay);
	welcomeDiv.parentNode.insertBefore(menuDiv, welcomeDiv);
	menuDiv = makeMenu(CompArray,threadDisplay);
	welcomeDiv.parentNode.insertBefore(menuDiv, welcomeDiv);
	menuDiv = makeMenu(LoungeArray,threadDisplay);
	welcomeDiv.parentNode.insertBefore(menuDiv, welcomeDiv);
	menuDiv = makeMenu(ConnectionsArray,threadDisplay);
	welcomeDiv.parentNode.insertBefore(menuDiv, welcomeDiv);
	menuDiv = makeMenuHTML(SearchArray);
	welcomeDiv.parentNode.insertBefore(menuDiv, welcomeDiv);
}


//Operations for main forum pages
if(urlcheck.indexOf('user.cfm') != -1){
    //load last read on user page
	if(lRead>0){
		addGlobalStyle('@import "http://ideatriage.com/files/wlrtheme/rank/small/themex2.css";'
		+'td.threadN6 { border-bottom: 1px solid #BBB; background: #DDD url(/img/forum/grad-grey.gif); }');
		lastReadArray = loadWLRvalues();
		WLR_lastPostLinkUser ('threadUP', lastReadArray);

	}
}
if(urlcheck.indexOf('?f') != -1){
	if(lRead>0){
		addGlobalStyle('@import "http://ideatriage.com/files/wlrtheme/rank/small/themex2.css";'
		+'td.threadN6 { border-bottom: 1px solid #BBB; background: #DDD url(/img/forum/grad-grey.gif); }');
		lastReadArray = loadWLRvalues();
		WLR_lastPostLink ('threadN', lastReadArray);
		WLR_lastPostLink ('threadS', lastReadArray);
		WLR_lastPostLink ('threadO', lastReadArray);
		
		//Hide removed/deleted threads
		if (hideDRThreads == 1) {
			addGlobalStyle('.threadP0, .threadP1, .threadP2, .threadP3, .threadP4{display:none;}');
		}
	}
}

//Operations for thread pages)

else if(urlcheck.indexOf('?t=') != -1 || urlcheck.indexOf('forum-replies.cfm?r=') != -1) {
	if(smallMon>0){
		addGlobalStyle('#replies td.bodyuserRead{vertical-align: top !important;}');
	}
	//css for thread pages
	if(avatar>0){addGlobalStyle('@import "http://ideatriage.com/wlr/avatar/avatar.css"; ');}
	if(avatar>0){addGlobalStyle('@import "http://goodbyepolar.com/wpavatars/avatar.css"; ');}
	if(rank!=0){addGlobalStyle('@import "' +rank +'";')};
	if(theme_enabled!=0){addGlobalStyle('@import "'+theme_enabled +'";' )};
				
	addGlobalStyle('#replies td.bodyuserRead{ background: url("data:image/gif,GIF89a%08%00d%00%B3%00%00%F3%E8%DC%F4%EA%DF%F5%EC%E2%F3%E9%DD%F8%F2%EB%F5%ED%E3%F4%EB%E0%F6%EF%E6%F7%F0%E8%F7%F1%E9%F6%EE%E5%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%08%00d%00%00%04W%90%C8I%AB%BD4%E9%CD%7BB%60(%8E%C8a%9Ehz(l%CB%16p%2C%CFt%2C%DCx%AE%EF%7C%EF%E3%86%A0pH%2C%0A%03%C8%A4r%C9l%3A%9F%D0%C0%60J%ADZ%AF%D8l%15%C0%EDz%BF%E0%B0xL.%9B%CF%E8%B4z%CDn%BB%DF%F0%B8%7CN%AF%DB%EF%F8%BC%3C%02%00%3B") #F3E8DC repeat-x top; vertical-align: bottom; border-bottom: 1px solid #bbb; font: 10px "Lucida Grande",Verdana,Arial,Helvetica,sans-serif; } '
	+'.clearCSS {border:0px solid gray; color:black; background:#DAF2B3; width:150px; font:16px Arial;} .textCSS {width: 80%; border:0px solid gray; color:black; background:#e5e5e5;}'
	+'img {border:none;}'
	+'.greylink{background:none; border:none; padding:0px; margin:0px; font: 1em arial, sans-serif; color:grey; cursor: pointer;}'
	+'a.greylink:hover{color:grey}'
	+'div.userNote {position: absolute !important; float:left; clear:both; z-index: 5 !important;}'
	+'.noteTxt{position:absolute !important; z-index: 20 !important; right:-200px; top:-5px;-moz-border-radius:8px; border: solid black 1px; padding:px;}'
	+'.noteAvail button{border: solid 2px #000080 !important}'
	+'.infoBut{height:20px; width:20px; border: solid 2px #CCCCCC !important;}');
	//Change colour of Q-Post button depending on setting
	if (qPost == 1) {
		addGlobalStyle('.previewCSS {border:0px solid gray; color:black; background:#bfcefe; width:150px; font:16px Arial;} ');
	} else {
		addGlobalStyle('.previewCSS {border:0px solid gray; color:black; background:#ffdcbf; width:150px; font:16px Arial;} ');
	}

	if(floatQuote>0){
		addGlobalStyle('#quickQuote{position: fixed; top:3px; left:460px; background: white; -moz-border-radius:18px; border: solid black 3px;}'
		+'.op25{-moz-opacity: 0.25;}'
		+'.op95{-moz-opacity: 0.95;}');
	}


	//find user #'s
	userNum = document.evaluate(
		"//td[@class = 'bodyuser']/div[1]|//td[@class = 'bodyuser_r']/div[1]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	//find user rank
	var userRank = document.evaluate(
		"//td[@class = 'bodyuser']/div[3] | //td[@class = 'bodyuser_r']/div[3]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
		for(var i=0; i<userRank.snapshotLength; i++){
			//alert('user rank: ' +userRank.snapshotItem(i).innerHTML);
			rankT= userRank.snapshotItem(i).innerHTML;
			if(rankT == '<a style="color: rgb(85, 85, 85);" href="/index.cfm?a=wiki&amp;tag=WP_SectionMods">Section Mod</a>'){
				rankT = 'Section_Mod';
			}
			//rankT = rankT.replace(/<a style="color:#555" href="\/index.cfm?a=wiki&tag=WP_SectionMods">Section Mod<\/a>/g,"Section_Mod");
			rankT = rankT.replace(/<\/a>/g, "");
			rankT = rankT.replace(/\s/g, "_");
			rankT = rankT.replace(/'/g, "_");
			rankT = rankT.replace(/,/g, "_");
			
			userRank.snapshotItem(i).parentNode.parentNode.className = rankT; 
		}

	if (imgL ==1){
		showImages(zImgWidth);
	}


	lastReadArray = loadWLRvalues();
	//thread page, get topic #////////////////
	startPos =urlcheck.indexOf('=') + 1;
	endPos = urlcheck.indexOf('&');
	GM_setValue('prevDone',0);
	var endPos2 = urlcheck.indexOf('#');
	if (endPos<0 && endPos2<0){
		//no extra arguments in url check
		topic = urlcheck.substring(startPos );
	}else{
		if(endPos<0){
			//no '&' so use index of # as endpoint
			endPos = endPos2;
		}
		topic = urlcheck.substring(startPos, endPos);
	}
	
	if(lRead>0){
		var lastRead = WLR_getValue(topic, lastReadArray, 0);
		lastRead *=1;
	}

	//get current page # in breadcrumb menu
		var cPage = document.evaluate(
		"//td[@class = 'm2a']//span |//td[@class = 'm2']//span",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		if(cPage.snapshotItem(0)){
			cPage = cPage.snapshotItem(0);
			// next page access key
			if(cPage.nextSibling.nextSibling){
				cPage.nextSibling.nextSibling.accessKey =".";
			}
			//previous page access key
			if(cPage.previousSibling.previousSibling){
				cPage.previousSibling.previousSibling.accessKey =",";
			}
		}
	
	
	//reply link
	var repURL = document.evaluate(
		"//td[@class = 'breadtask']/a",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		for(i=0; i<repURL.snapshotLength; i++){
			if(repURL.snapshotItem(i).href.indexOf('forum-reply')>0){
				replyURL = repURL.snapshotItem(i).href;
				break;
			}
		}
	
	//draw quick quote textarea
	var qq = document.evaluate(
		"//BODY[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/DIV[2]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	var qQuote = document.createElement("textarea");
	qQuote.name ='qqText';
	qQuote.id = 'qqText';
	qQuote.className='textCSS';
	//Change following value to change size of quick quote text area.  Note: size is in characters, not pixels.
	qQuote.cols = '100';
	if(floatQuote>0){
		qQuote.rows = '1';	
	}else{
	qQuote.rows = qqRows;
	}
	if(autoClear ==1){
		if(urlcheck.indexOf('#bottom')>= 0){
			if(currentQq>=qqNum){
				GM_setValue('currentQq',1);
			}else{
				currentQq++;
				GM_setValue('currentQq',currentQq);
			}
			currentQq = GM_getValue('currentQq');
			GM_setValue('qQuoter'+currentQq,'');
		}
	}	
	if(floatQuote>0){
		qQuote.addEventListener('focus', function(event){hideQuote(event);},false);
		qQuote.blur();
	}
//	qQuote.addEventListener('focus', function(event){alert('focus');event.target.rows=10;event.preventDefault(); },false);
	qQuote.value = unescape(GM_getValue('qQuoter'+currentQq,''));
	qQuote.addEventListener('keydown', function(event){shortcutKeys(event, replyURL);},false);
	qqDiv = document.createElement("div");
	qqDiv.align = 'center';
	qqDiv.appendChild(qQuote);
	qqDiv.id = 'quickQuote';
	if (floatQuote>0){
	qqDiv.className ='op25';
	}
	var brk = document.createElement("br");
	qqDiv.appendChild(brk);
	//preview button
	prevBtn =document.createElement("input");
	prevBtn.type = 'submit'; 
	prevBtn.className= 'previewCSS';
	//Q-Post button
	if (qPost == 1) {
		prevBtn.value="Post Reply" ;
	} else {
		prevBtn.value="View Preview" ;
	}
	prevBtn.accessKey ="1";
	prevBtn.addEventListener('click', function(event){postReply(event, replyURL)}, false);
	qqDiv.appendChild(prevBtn);
	//spacer
	spacer = document.createElement("text");
	spacer.innerHTML = "&nbsp &nbsp &nbsp";
	qqDiv.appendChild(spacer);
	//clear button
	clearBtn =document.createElement("input");
	clearBtn.type = 'reset'; 
	clearBtn.className= 'clearCSS';
	clearBtn.value="Clear" ;
	clearBtn.accessKey ="2";
	clearBtn.addEventListener('click', function(event){clearQuote(event); },false);
	qqDiv.appendChild(clearBtn);	
	sel = document.createElement("select");
	sel.name = 'quoteCopy';
	deflt = GM_getValue('currentQq',1);
	for (i=1; i<=qqNum; i++){
		opt = document.createElement('option');
		opt.value = i;
		if(opt.value == deflt){
			opt.selected = true;
		}
		optTxt = document.createTextNode(i);
		opt.appendChild(optTxt);
		sel.appendChild(opt);
	}
	sel.addEventListener("change",function(evt){Savetxt(evt); GM_setValue('currentQq', evt.target.value); document.getElementById('qqText').value = unescape(GM_getValue('qQuoter'+evt.target.value,'')); },false);
	qqDiv.appendChild(sel);
	var qText = qq.snapshotItem(0).parentNode.insertBefore(qqDiv,qq.snapshotItem(0));
	window.addEventListener('unload', function(event){Savetxt(event)}, false);
	
	//Check if subscribed to thread - Tromac
	var chkSubscribed = document.evaluate( "//td[@class='s1']/.." ,
		document, 
		null, 
		XPathResult.FIRST_ORDERED_NODE_TYPE, 
		null ).singleNodeValue.textContent.match('SUBSCRIBED');

	if(chkSubscribed){
  		GM_setValue('subscribed', 'true');
	} else {
		 GM_setValue('subscribed', 'false');
	}


// JB code	

 var textArea=document.getElementById("body");
  var buttonLocation;
  if(textArea) {
    var url=document.location.href;
    if(url.indexOf("forum-reply.cfm?r")>-1){
      var p2i=document.evaluate("//input[@name='post2']",
                                document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null);
      p2i=p2i.singleNodeValue;
      if(p2i) {
        window.post2input=p2i;
        p2i.id="post2";
      }
    }
    if(url.indexOf("whim-send.cfm")<0){
      var targetTr=textArea.parentNode.parentNode.previousSibling;
      while(targetTr && targetTr.nodeName!="TR") targetTr=targetTr.previousSibling;
      if(!targetTr) return;//don't have a previous row ... maybe we could add one ... not in this version
      var tds=targetTr.getElementsByTagName("TD");
      if(tds.length < 2) return;//
      buttonLocation=tds[1];
      buttonLocation.style.fontSize="80%";
      buttonLocation.style.textAlign="center";
    }
    else {
      var tNode=document.getElementsByTagName("BLOCKQUOTE")[0];
      if(tNode) {
        var newDiv=document.createElement("DIV");
        buttonLocation=tNode.parentNode.insertBefore(newDiv, tNode);
        buttonLocation.style.fontSize="80%";
        newDiv.style.textAlign="center";
      }
    }
  }
  if(!textArea) {
    textArea=document.getElementById("f_body");
    if(textArea) {
      var tNode=document.getElementById("f_form");
      if(!tNode) return;
      tNode=tNode.parentNode;
      if(!tNode) return;
      var newDiv=document.createElement("DIV");
      buttonLocation=tNode.appendChild(newDiv);
      buttonLocation.style.fontSize="120%";
    }
  }
  if(!textArea) {
    textArea=document.getElementById("qqText");
    if(textArea) {
      var tNode=textArea.parentNode;
      if(!tNode) return;
      var newDiv=document.createElement("DIV");
      buttonLocation=tNode.insertBefore(newDiv,textArea);
      buttonLocation.style.fontSize="80%";
    }
  }
  var edit;
  if(textArea && buttonLocation) {
    edit=new editObject(textArea);
    addButtons(buttonLocation, textArea);
  }
  else {
    window._whirlCode = function() {
      var textArea=document.getElementById("qqText");
      var buttonLocation;
      if(textArea) {
        var tNode=textArea.parentNode;
        if(!tNode) return;
        var newDiv=document.createElement("DIV");
        buttonLocation=tNode.insertBefore(newDiv,textArea);
      }
      if(textArea && buttonLocation) {
        edit=new editObject(textArea);
        addButtons(buttonLocation, textArea);
      }
    };
  }
  // end JB code

	//userName
	var userName = document.evaluate(
		"//span[@class = 'bu_name']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	userNameAr = new Array();	
	for( var lp=0; lp<userName.snapshotLength; lp++){
		var nameTemp = userName.snapshotItem(lp).innerHTML;
		nameTemp =nameTemp.replace("'", "\'");
		userNameAr[lp] = nameTemp;
	}
	
	//reply #
	replyNumAr = document.evaluate(
		"//div/a[@class = 'greylink'][2]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	newreplyNumAr = document.evaluate(
		"//td[@class = 'bodyuser']/a[@name][2]|//td[@class = 'bodyuser_r']/a[@name][2]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		//post reply link (for keyboard shortcut)
	pReply = document.evaluate(
		"//td[@class = 'breadtask']/a",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		var userNumber = new Array();
	for (var loop = 0; loop < userNum.snapshotLength; loop++) {
		var userNTemp = userNum.snapshotItem(loop).innerHTML;
		var userNode = userNum.snapshotItem(loop);
		var startUser = userNTemp.indexOf('#') + 1;
		var endUser = userNTemp.indexOf('&') - 1;
		if (endUser < 0){
			//User is online, can't use &nbsp for end position
			endUser = userNTemp.indexOf('<');
		}	
		
		var ut = userNTemp.substring(startUser, endUser);
		userNumber[loop] = ut;
		userNode.parentNode.parentNode.className += "  wlr_" +ut;

	}
	

	var replyLink = pReply.snapshotItem(0);
	for (var loop=0; loop < replyNumAr.snapshotLength; loop++){
		var nodeTemp = replyNumAr.snapshotItem(loop);
		var replyTemp = replyNumAr.snapshotItem(loop).href;
		var startPos = replyTemp.indexOf('#r') + 2;
		var anchorAr = new Array();
		anchorAr[loop] = replyTemp.substring(startPos);
		var cPost = anchorAr[loop];
		var cPost2 = newreplyNumAr.snapshotItem(loop).name;
		userNote = document.createElement('div');
		userNote.id = userNumber[loop];
		noteButton = document.createElement('button');
		buttTxt = document.createTextNode('i');
		noteButton.appendChild(buttTxt);
		noteButton.className='infoBut';

		noteButton.addEventListener("click", function(evt){showNote(evt);}, false);
		noteTxt = document.createElement('textarea');
		noteTxt.columns ="50";
		noteTxt.rows ="10";
		noteTxt.style.display ="none";
		noteTxt.className = 'noteTxt';
		noteTxt.id = userNumber[loop];
		userNote.appendChild(noteButton);
		userNote.appendChild(noteTxt);
		userNote.className = "userNote";	
		if(GM_getValue("u"+userNote.id) != null){
			userNote.className +=" noteAvail";
		}
		noteZ =newreplyNumAr.snapshotItem(loop).parentNode.parentNode;
		noteZ.parentNode.insertBefore(userNote,noteZ);
		//alert(cPost2);
		cPost2 = cPost2.substring(1);
		//Add quick quote button
		if (urlcheck.indexOf("&")>0){
			urltopic = urlcheck.substring(0, urlcheck.indexOf("&"));
		}else{
			urltopic = urlcheck;
		}
		var n = document.createElement("button");
		var nt = document.createTextNode("q-quote");
		n.className = 'greylink';
		n.id =cPost2+'_'+userNameAr[loop];
		n.addEventListener("click", function(event){quotePost(event, urltopic)}, false);
		n.appendChild(nt);
		nodeTemp.parentNode.insertBefore(n, nodeTemp);
		var bar = document.createElement("span");
		bar.className = 'bar';
		bar.innerHTML = ' | ';
		nodeTemp.parentNode.insertBefore(bar,nodeTemp);
		if(lRead>0){
			//add bookmark button
			var n2 = document.createElement("a");
			var nt2 = document.createTextNode("mark");
			n2.className = 'greylink';
			n2.href ='#';
			n2.id = cPost;
			n2.addEventListener("click", function(event){WLR_setValue(event, topic , this.id)},false);
			n2.appendChild(nt2);
			nodeTemp.parentNode.insertBefore(n2, nodeTemp);
			var bar2 = document.createElement("span");
			bar2.className = 'bar';
			bar2.innerHTML = ' | ';
			nodeTemp.parentNode.insertBefore(bar2,nodeTemp);
		
			if (lastRead >= cPost){
				//is read, apply css style
				if(styleFlip==0){
					var cssTemp = nodeTemp.parentNode.parentNode;
					cssTemp.className +=' bodyuserRead';
				}else{
					
				}
			}else{
			//stuff to do to unread posts
				if(styleFlip!=0){
					var cssTemp = nodeTemp.parentNode.parentNode;
					cssTemp.className +=' bodyuserRead';
				}else{
					
				}
			
			}
		}

	
	}	
	for(i=0; i<userNum.snapshotLength; i++){
		var divWrap = document.createElement('div');
		tdBody = userNum.snapshotItem(i).parentNode;
		divWrap.innerHTML = tdBody.innerHTML;
		divWrap.className = "name_cont";
		tdBody.innerHTML ='';
		tdBody.appendChild(divWrap);
	}

	if(lRead>0 && (urlcheck.indexOf('ux') == -1)){
		var lastAnchor = anchorAr[anchorAr.length-1];
		if(lastRead < lastAnchor){
			//update last read #
			if(lastAnchor > 20000){
				alert('Whirlpool Last Read Error: \n reply value too high. Please copy these values and contact Meat Sack \n Topic:'+topic +'\n lastAnchor:' +lastAnchor );
			}else{	
				//WLR_setValue(topic, lastAnchor);
				window.addEventListener('load', function(event){WLR_setValue(event, topic, lastAnchor);}, false);
			}
		}
	}
	
	//ignore user button display. not in use yet
addGlobalStyle('.voteblock {margin:0 !important;width:100px !important;}'
				+'.voteblock>span{float:left !important;margin:4px 2px;}'
				+'.voteblock>span *{float:left !important;margin:0 !important;}');
if (ignoreSwitch == 1) {
	addGlobalStyle('.voteblock {margin:0 !important;width:120px !important;}');
	ignoreUser = document.evaluate(
		"//span[@class = 'voteitem'][1]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < ignoreUser.snapshotLength; i++) {
		userTemp = ignoreUser.snapshotItem(i);
		var vbAlign = document.createElement("span");
		var ignoreCtr = document.createElement("span");
		var ignoreBtn = document.createElement("span");
		ignoreBtn.className ="voteitem";
		ignoreBtn.title ="ignore user";
		ignoreBtn.id = userNumber[i];
		ignoreBtn.addEventListener('click',function(evt){hideUser(evt)},false);
		smlTxt = document.createTextNode(":X");
		ignoreBtn.appendChild(smlTxt);
		ignoreCtr.appendChild(ignoreBtn);
		spc = document.createTextNode(" ");
		ignoreCtr.appendChild(spc);
		userTemp.parentNode.insertBefore(ignoreCtr, userTemp);
	}
	
}

	//smiley code
if(smilies ==1){	
	smileys = {	
		"\\*ninja\\*" : smlNinja,
		":-S"  		: smlConfused,
		":S"  		: smlConfused,
		"\\*confused\\*": smlConfused,
		"\\*glare\\*": smlGlare,
		"¬_¬"		: smlGlare,
		"&gt;:\\)"  : smlEvil,
		"&gt;:-\\)" : smlEvil,
		"\\*angry\\*": smlAngry,
		"&gt;:\\("  : smlAngry,
		":-@" 		: smlAngry,
		":@"  		: smlAngry,
		"&gt;:-\\(" : smlAngry,
		":\\)"		: smlHappy,
		":-\\)"		: smlHappy,
	    ":\\("		: smlFrown,
		":-\\("		: smlFrown,
		":D"  		: smlGrin,
		":-D"  		: smlGrin,
		":\\|"		: smlNtl,
		":-\\|"		: smlNtl,
		":P"		: smlRazz,
		":-P"		: smlRazz,
		";\\)"		: smlWink,
		";-\\)"		: smlWink,
		"\\*rolls eyes\\*": smlRoll,
		"rolls eyes": smlRoll,
		":o" 		: smlShock,
		":-o" 		: smlShock,
		"\\*gold star\\*" :imgStar,
		"gold star" : imgStar
	};
	regex = {};
	for (key in smileys) {
		regex[key] = new RegExp(key, 'g');
		//alert('regex: ' +regex[key]);
	}

	textnodes = document.evaluate(
	"//td[@class = 'bodytext']//text()",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	k=0;
	for (var i = 0; i < textnodes.snapshotLength; i++) {
		node = textnodes.snapshotItem(i);
		if(!is_all_ws(node)){
			//GM_log(node.data);
			var s = document.createElement("span");
			node.data = node.data.replace(/</g,"&lt;"); 
			node.data = node.data.replace(/>/g,"&gt;"); 
			s.innerHTML = node.data.replace(/\s+$/g, '&nbsp;');
		     
			for (key in smileys) {
				s.innerHTML = s.innerHTML.replace(regex[key], smileys[key]);
			}
			node.parentNode.replaceChild(s, node);
		}
	}
	
		

}


}else if(urlcheck.indexOf('reply.cfm') != -1){
	//code to copy quick quote text area to the reply box, & keep it there even after preview.
	if(urlcheck.indexOf('e=') == -1){
		
		if (prevDone == 0 && document.getElementsByTagName('textarea')[1].value ==''){
			
			document.getElementsByTagName('textarea')[1].value = unescape(GM_getValue('qQuoter'+currentQq,''));
			if(document.getElementsByTagName('textarea')[1].value != ''){
				GM_setValue('prevDone',1);
				//If subscribed, mark post as read
				if ((GM_getValue('subscribed') == 'true')||(autoSubscribe == 1)) {
					markReadBox = document.getElementById("modesu");
					markReadBox.click();
					GM_setValue('subscribed', 'false');
				}
				//Check for Q-Post
				if (qPost == 1) {
					prevbutton = document.getElementById("post");
					prevbutton.click();
				} else {
					prevbutton = document.getElementById("prev");
					prevbutton.click();
				}
			}	
			
				
		}
		// JB code	
	}
 var textArea=document.getElementById("body");
  var buttonLocation;
  
  if(textArea) {

    var url=document.location.href;
      var p2i=document.evaluate("//input[@name='post2']",
                                document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null);
      p2i=p2i.singleNodeValue;
      if(p2i) {
        window.post2input=p2i;
        p2i.id="post2";
      }
   
      var targetTr=textArea.parentNode.parentNode.previousSibling;
      while(targetTr && targetTr.nodeName!="TR") {targetTr=targetTr.previousSibling; }
      if(!targetTr){ alert('1');return;}//don't have a previous row ... maybe we could add one ... not in this version
      var tds=targetTr.getElementsByTagName("TD");
      if(tds.length < 2) {alert('2'); return;}//
	   buttonLocation=tds[1];
      buttonLocation.style.fontSize="80%";
      buttonLocation.style.textAlign="center";
    
   
  }

  var edit;
  if(textArea && buttonLocation) {
    edit=new editObject(textArea);
    addButtons(buttonLocation, textArea);
  }
  else {
    window._whirlCode = function() {
      var textArea=document.getElementById("qqText");
      var buttonLocation;
      if(textArea) {
        var tNode=textArea.parentNode;
        if(!tNode) return;
        var newDiv=document.createElement("DIV");
        buttonLocation=tNode.insertBefore(newDiv,textArea);
      }
      if(textArea && buttonLocation) {
        edit=new editObject(textArea);
        addButtons(buttonLocation, textArea);
      }
    };
  }
  // end jb code

		
	
}else if(urlcheck.indexOf('tag=wlr') != -1){
	//settings page
	//settings page styles
addGlobalStyle('.setHead {	font-family: Arial, Helvetica, sans-serif;	font-size: 16px;	color: #333366;	font-style: normal;	font-weight: bolder;}'
+'.setExp {	font-family: Arial, Helvetica, sans-serif;	background-color: #CCCCCC;	padding: 3px; width: 609px; margin-left: 20px; border-top: solid 1px;} '
+'.setting {	background-color: #666666;	float: right;	clear:both;	padding: 3px;	color: #FFFFFF;	font-weight: bold; }'
+'.settingLink {	font: 0.6em Arial; color: #FFFFFF;	font-weight: bold; text-decoration: none;}'
+'#id_customCSS {height: 300px;}'
+'#id_customCSS textarea{width:400px; height: 280px;}');
//theme XML load
//alert (typeof GM_xmlhttpRequest);
if(typeof GM_xmlhttpRequest != "undefined") {
	GM_xmlhttpRequest({
	  method:"GET",
	  url:"http://ideatriage.com/wlr/theme.xml",
	  headers:{
	    "User-Agent":"monkeyagent",
	    "Accept":"text/monkey,text/xml",
	    },
	  onload:function(doc) {
		doc = doc.responseText.replace(/<\?xml.*\?>/,'');
		doc = new XML(doc);
		nameAr = new Array();
		j =0;
		for each( i in doc..name){
			nameAr[j] =i;
			j++
		}
		valueAr = new Array();
		k = 0;
		for each (l in doc..url){
			valueAr[k] = l;
			k++
		}
		addListSetting(valueAr , nameAr, 'theme_enabled', 'Theme', 'How avatars and/or rankings are laid out');
	  },
	  onerror:function(details){
	   alert('error');
	  }
	});
	//rank XML load
	GM_xmlhttpRequest({
	  method:"GET",
	  url:"http://ideatriage.com/wlr/rank.xml",
	  headers:{
	    "User-Agent":"monkeyagent",
	    "Accept":"text/monkey,text/xml",
	    },
	  onload:function(doc) {
		doc = doc.responseText.replace(/<\?xml.*\?>/,'');
		doc = new XML(doc);
		nameAr = new Array();
		j =0;
		for each( i in doc..name){
			nameAr[j] =i;
			j++
		}
		valueAr = new Array();
		k = 0;
		for each (l in doc..url){
			valueAr[k] = l;
			k++
		}
		addListSetting(valueAr , nameAr,'rank', 'Rank Graphics', 'What set of rank icons to use');
	  },
	  onerror:function(details){
	   alert('error');
	  }
	});
}

		var WLRset = document.createElement("div");
	WLRset.className="setExp"; 
	WLRset.innerHTML ='<span class="setHead">Whirlpool Last Read Settings:</span>   <br />    For more information see wiki entry below.';
	var wikiN = document.getElementById('replies');
	 wikiN.parentNode.insertBefore(WLRset, wikiN);
	addRadioSetting('lRead', "Last Read Tracker", "Turns Last Read Tracker on or off");	 
	addListSetting(['100','300', '500', '1000', '2000', '5000'] , ['100','300', '500', '1000', '2000', '5000'],'WLRmaxValue', 'Threads to Track', 'Number of threads for the last read tracker');
	addRadioSetting('styleFlip', "Style Flip", "Change what gets shaded when tracker is on. <br />On = unread posts shaded, <br />Off = read posts shaded");
	addRadioSetting('smilies', "Smilies", "With smilies on, script will change: <br /> :) <br /> into: <br/> "+smlHappy);
	addRadioSetting('imgL', "Links to Images", "turns links to images, into images, won't work unless link is direct to image");
	addRadioSetting('autoClear', "Clear Quote after post", "will clear quick qote after a post (and any time #bottom appears in the url, so watch out)");
	addRadioSetting('smallMon', "Small Monitor", "If you use the 'small monitor' setting in the official whirlpool settings, turn this on as well"); 
	addRadioSetting('avatar', "Avatars", "Display avatars in posts?"); 
	addRadioSetting('hideDRThreads', "Hide Deleted/Removed Threads in forum view", "Self explanatory.  Forum view becomes much less cluttered."); 
	addRadioSetting('navMenu', "Navigation Menu", "Functional, but not customizable yet."); 
	addRadioSetting('qPost', "Quick Post", "When turned on, a \"Post Reply\" button replaces the \"View Preview\" button.");
	addRadioSetting('autoSubscribe', "Auto-Subscribe", "Automatically subscrie to a thread when you make a post.");
	addListSetting(['10','15', '20', '25', '30', '35'] , ['10','15', '20', '25', '30', '35'],'qqRows', 'Quick Quote Text Area', 'Increase the number of rows of the Quick Quote text area.');

	addRadioSetting('ignoreSwitch', "IgnoreUser Button", "Adds a button next to each user's aura vote smilies, which when activated will prevent you from seeing that user. ");
	addRadioSetting('floatQuote',"BETA: Endless Pages", "Compatability mode for JB's endless forum pages script, Does NOT work yet.");
	addTextSetting('customCSS','Custom CSS' , 'Adds any CSS entered in text field');
	
	}
	

})();