// ==UserScript==
// @name         Gmail 3.0
// @namespace     http://www.CollectItStoreIt.com/GCloud_About.html
// @description   Convert GMail into a media storage system for your own personal cloud
// @include       http*
// ==/UserScript==

/*
 * Version 2.5.7 June 5, 2009
 * Written by Benjamin Paige III
 * This script is Public Domain. You are welcome to use it in any way you like.
 */
 
var gCloudToken = "gcloud~:";
 
var G3PO = new cG3PO();

window.G3PO = G3PO;
 
var ranOnce = false;

switch(document.location.host)
{
	case "mail.google.com":
		var updater = new function(){
			var running = false;
			
			this.refresh = function () {
				//GM_log('refresh: ' + running);
				if(!running) {
					running = true;
					G3PO.processMailList(frames[3].document.getElementsByTagName("TR"));
					running = false;
				}
			}
			
		}
	
		function REFRESH() {
			//GM_log('REFRESH');
			updater.refresh();
			var myInterval = window.setInterval(function () {updater.refresh()},100);
			window.setTimeout(function(){ clearInterval(myInterval);},2000);
		}
		
		if(!ranOnce) {
			ranOnce = true;
			document.addEventListener('load', REFRESH,true);
			document.addEventListener('mouseup', REFRESH,false);
			frames[3].document.addEventListener('mouseup', REFRESH,false);
		}
			
		waitForIt(function(){ 
			return G3PO.cloudCompose();
		},100,20);
		
		break;    
	case "docs.google.com":
	 
		var docsButtonContainer = document.getElementById("writely-buttons");
	 
		if(docsButtonContainer) {

			var btnGCloud = G3PO.getCloudIcon();

			docsButtonContainer.insertBefore(btnGCloud,docsButtonContainer.firstChild);

			var to = document.getElementById("navigation").getElementsByTagName("B")[0].innerHTML;
			var from = "";
			//var subject = document.getElementById("txtTitleEdit").textContent;
			var body = "Doc" + document.location.search + " http://docs.google.com/" + document.location.search;
			
			btnGCloud.addEventListener("click", function(){G3PO.launchComposeGmail(to,from,document.getElementById("txtTitleEdit").textContent,body,"docs document documents word",true)},false);
		}
		break;
	case "spreadsheets.google.com":
	 
		var docsButtonContainer = document.getElementById("db-title");
	 
		if(docsButtonContainer) {

			var btnGCloud = G3PO.getCloudIcon();

			docsButtonContainer.parentNode.appendChild(btnGCloud);

			var emailAddress = document.getElementById("id_userinfo").firstChild.innerHTML;
			var to = emailAddress;
			var from = emailAddress;
			//var subject = docsButtonContainer.textContent;
			var body = "ccc" + document.location.search + " http://spreadsheets.google.com/ccc" + document.location.search;
			
			btnGCloud.addEventListener("click", function(){G3PO.launchComposeGmail(to,from,docsButtonContainer.textContent,body,"ss spreadsheets spreadsheet cell cells",true)},false);
		}
		break;
	default:
	
		var anchorTags = document.getElementsByTagName("a");
		for(var index in anchorTags) {
		
			var link = anchorTags[index].href;
			
			if(/.*\.\w{2,5}$/.test(link) && /.*\.(mp[34]|mov|pdf|doc|exe|bin|zip|ps|xls)$/i.test(link)) {
			var name = anchorTags[index].innerHTML;
				var gCloudIcon = G3PO.getCloudIcon();
				gCloudIcon.addEventListener("click", function(){littleLink(this)},false);
				
				if(anchorTags[index] == anchorTags[index].parentNode.lastChild)
					anchorTags[index].parentNode.appendChild(gCloudIcon);
				else
					anchorTags[index].parentNode.insertBefore(gCloudIcon,anchorTags[index].nextSibling);
			}
		}
}


//############################## Cloud Media Data ##############################//  BEGIN	


function cG3PO() {

	var siteList = new Array();
	
	function loadTags(tags) {

		if(tags) {
			return " [ " + tags +  " ]";
		}
		
		return "";
	}

	 this.addCode = function(source,link) {
	 
		var extension = source.match(/\.\w+$/);
		
		if(link != '')
			link += ' ';
		
		switch(extension[0].substr(1)) {
			case 'mp3' :
			case 'MP3' :
				return 'mp3,' + link + source;

			case 'mp4' :
			case 'MP4' :
				return 'mp4,' + link + source;
			default:
				return link + source;;
		}
	}
	
	 this.launchComposeGmail = function(to,from,subject,body,tags,isAuto,cc,bcc) {

		var url = 'http://mail.google.com/mail/?view=cm&ui=1&fs=1&tf=1';
		 
		 url += '&to=' + to;
		 url += '&from=' + from;
		 url += '&su=' + escape(subject + loadTags(tags));
		 url += '&body=' + escape(gCloudToken + body);
		 url += '&gCloud=';
		 
		if(isAuto) {
			//launchIFrame
			popUpWindow(url + 'auto',100,40);
		}
		else
			popUpWindow(url + 'compose',600,600);
	}
 
	 this.getCloudButton = function() {
	 
				var btnGCloud = document.createElement("input");
				btnGCloud.type = "button";
				btnGCloud.value = "GCloud";
				
				return btnGCloud;
	 }
	 
	 this.getCloudIcon = function () {
	 
				var gCloudIcon = document.createElement("img");
				gCloudIcon.src = "https://mail.google.com/mail/images/favicon.ico";
				//gCloudIcon.width = "16px";
				//gCloudIcon.src = "data:image/gif,GIF89a%16%00%0D%00%B3%00%00%CC%CC%CC%EB%EA%EA%E3%E1%E1%DD%DC%DA%F7%F7%F7%E6%E6%E6%D8%D6%D6%ED%EC%EA%DE%DE%DE%DE%D6%D6%EF%EF%EF%E6%E6%DE%EB%EA%EB%FF%FF%FF%00%00%00%00%00%00!%F9%04%05%14%00%0D%00%2C%00%00%00%00%16%00%0D%00%00%04Y%B0%C9)%CB%B8%8A%EA%AD%86(%A0%B7%8D%87%A1%9C%A80%8CTa%A2%F0%40%B0%84!%C08c%143%15%18%0C%9CP%F1%3BL%5C%C3d%001(4%9A%C9h%A7t%93%0E%0B%00%C2%E0%60%15%22%9C5%84%0AP%C0%05%3E%05%81J%40!d%08L%B5%80y%16p%7B4%D5%20%C3%8A%00%00%3B";
				gCloudIcon.style.cursor = "pointer";
				
				return gCloudIcon;
	 }



	function getDocLinks() {
	
		var docLinks = 
				"Mail|http://mail.google.com/mail/?view=cm&ui=1&fs=1&tf=1&gCloud=compose|https://mail.google.com/mail/images/favicon.ico," +
				"Document|https://docs.google.com/MiscCommands?command=newdoc&redirectToDocument=true&hl=en_GB|https://docs.google.com/favicon.ico,"+
				"Spreadsheet|http://spreadsheets.google.com/ccc?new|http://www.google.com/images/spreadsheets/favicon.ico,";
				
			for(var i in siteList) {
			
				var site = siteList[i];
				docLinks += site.productName + "|" + site.createLink + "|" + site.icon + ","
			}
			
			docLinks += "Presentation|http://docs.google.com/?action=new_presentation|https://docs.google.com/presently/images/favicon.ico";
			
			return docLinks;
	}	
				
	this.addSite = function(productName,host,createLink,editLink,icon,logo,urlRegEx) {
	
		siteList.push(new SiteData(productName,host,createLink,editLink,icon,logo,urlRegEx));
	}
			
	this.cloudCompose = function() {
		if(frames[3] && frames[3].document.getElementsByClassName("pz pA pp pX")[0] && !frames[3].document.getElementsByClassName("pz pA pp pX")[0].getAttribute('gCloud')) {
			
			var oldComposeMail = frames[3].document.getElementById(':ll');
			oldComposeMail.setAttribute('gCloud','true');
			
			var container = frames[3].document.getElementsByClassName("pz pA pp pX")[0];
			container.firstChild.style.display = 'none';
			container.style.border = 'solid black double';
			container.style.position = 'relative';
			container.style.zIndex = '200';
			container.style.marginLeft = '26px';
			var compose = document.createElement("DIV");
			compose.id = "menu_parent";
			compose.style.color = window.getComputedStyle(oldComposeMail,null).getPropertyValue("color");
			compose.style.fontSize = window.getComputedStyle(oldComposeMail,null).getPropertyValue("font-size");
			
			compose.innerHTML = "New..."
			compose.style.cursor = "pointer";
			
			var docs = getDocLinks().split(',');
			
			var defaultColor = getLabelColor();
			
			var optionCollection = document.createElement("ul");
			optionCollection.id = "menu_child";
			optionCollection.style.display = 'none';
			optionCollection.style.position = 'absolute';
			optionCollection.style.listStyleType = 'none';
			optionCollection.style.margin = '0';
			optionCollection.style.padding = '0';
			optionCollection.style.border = '1px solid #CCCCCC';
			optionCollection.className = 'pt';
			
			for(var i in docs) {
				
				var listItem = document.createElement("li");
				listItem.style.border = '1px solid #EEEEEE';
				var option = document.createElement("A");
				option.style.color = defaultColor;
				option.style.fontSize = '12px';
				
				var profile = docs[i].split('|');
				
				option.innerHTML = "<img src='" + profile[2] + "' style='border:0px none' width='16px'/>" + profile[0];
				option.setAttribute("gCloud",profile[1]);
				if(profile[0] == 'Mail') {
					option.href = "#";
					option.addEventListener('click',function(){partyStarter(oldComposeMail)},true);
				}
				else {
					option.href = "#";
					option.addEventListener('click',function(){popUpWindow(this.getAttribute("gCloud"),800,800)},true);
				}
				listItem.addEventListener('mouseout',function(){this.style.backgroundColor = '';},true);
				listItem.addEventListener('mouseover',function(){this.style.backgroundColor = 'gray';},true);
				option.style.textDecoration = 'none';
				listItem.appendChild(option);
				optionCollection.appendChild(listItem);
			}
			
			container.appendChild(compose);
			container.appendChild(optionCollection);
			
			container.addEventListener('mouseout',function(){optionCollection.style.display = 'none';},true);
			container.addEventListener('mouseover',function(){optionCollection.style.display = 'block';},true);
			optionCollection.addEventListener('mouseover',function(){optionCollection.style.display = 'block';},true);
			
			return true;
		}
		
		if(frames[0]) {
			var toSelectBox = frames[0].document.getElementById("6row_compose");
			var hc_compose = frames[0].document.getElementById('hc_compose');
			
			if(toSelectBox && !toSelectBox.getAttribute('gCloud')) {
				GM_log('cant wait');
				var options = toSelectBox.getElementsByTagName('OPTION');
				
				for(var i in options) {
				
					var emailAddress = options[i].value;
					GM_log(emailAddress);
					if(/@gmail\.com/.test(emailAddress)) {
						frames[0].document.getElementById('to_compose').value = emailAddress;
						break;
					}
						
				}
			
				toSelectBox.setAttribute('gCloud','true');
				
				var toggle = false;
				
				//if(/gCloud=auto/i.test(window.location.search))
					setInterval(function(){if(hc_compose.contentDocument.body.innerHTML.length == 0 || toggle) return; toggle = true; partyStarter(frames[0].document.getElementById('snd'))},100);
			
				return true;
			}
		}
		return false;
		
	}

	function refaceLogo() {
		if(document.getElementById(":rc") && !document.getElementById(":rc").getAttribute("gCloud")) {
		
			var logo = document.getElementById(":rc");
			logo.style.background = "";
			
			logo.innerHTML = '<img src="http://www.freewebs.com/labellinks/Gcloud%20logo.gif" width="143" height="50"  />';
			
			logo.setAttribute("gCloud","true");
		}
	}

	function SiteData(productName,host,createLink,icon,logo,urlRegEx) {
		this.productName = productName;
		this.host = host;
		this.createLink = createLink;
		this.editLink = null;
		this.icon = icon;
		this.logo = logo;
		this.urlRegEx = urlRegEx;
	}
				
	function getSiteData(cloudRow) {

		var siteData = new SiteData(null,null,null,null,null,null);
		//Google Docs check
		var content = cloudRow.childNodes[4].lastChild.lastChild.lastChild.lastChild.innerHTML;
		if(/Doc\?id=/.test(content)) {
			var id = content.match(/gcloud~:\S+/)[0];
			siteData.editLink = "http://docs.google.com/" + id.substr(gCloudToken.length) + "&gCloud=true";
			siteData.icon = "data:image/gif,GIF89a%0F%00%10%00%C4%00%00%00f%A6%AD%CE%E4%8A%9A%AEA%8B%BCQk%8B%E8%F2%FF%BE%CD%DDX%9A%C3%DA%E1%E9%8F%BB%D7%FF%FF%FF%AF%B9%C4s%AA%CB%ED%EF%F3d%7C%9A%C2%D5%EA%AE%BF%D5%9C%AA%BB%F0%F6%FF%C2%C9%CF%DE%ED%F6%5C%A5%D0%F7%FA%FF%DB%E4%EEB%94%BD%F5%F6%F6%C8%DF%EC%A3%B0%C4%C4%CE%DB%EF%F7%F7%E6%E8%EB%FF%FF%FF!%F9%04%05%14%00%1F%00%2C%00%00%00%00%0F%00%10%00%00%05n%20'%8E%E2%F6%9D(%A7%ACl%07E%E8%A9%B2ks%3DB%3C%D3%19b8%84%14%8D%E5%99%2C%82%B2%E1%10%F9%D9%AD%00%D0(%B4I%83j%02%09%C6%01%03u%024%89%8A%B82%18%00f%16%0B%20P%19%9A9i%8B%04%10%1E%8B%DF%92%FC%9C%D1fQ%F0%12%05%05%00%07vwg%04%89%0E%00%18%03%2Cdf1%1FPe%95f%00%92%93RQ%0A!%00%3B";
			siteData.logo = "http://docs.google.com/images/editor_docsslogo.gif";
		} else
		//Google Spreadsheets check
		if(/ccc\?key=/.test(content)) {
			var id = content.match(/gcloud~:\S+/)[0];
			siteData.editLink = "http://spreadsheets.google.com/" + id.substr(gCloudToken.length) + "&gCloud=true";
			siteData.icon = "http://www.google.com/images/spreadsheets/favicon.ico";
			siteData.logo = "http://docs.google.com/images/editor_docsslogo.gif";
		} else
		// Mp3 check
		if(/gcloud~:mp3/.test(content)) {
			var id = content.match(/gcloud~:\S+/)[0];
			siteData.editLink = id.split(',')[1];
			siteData.icon = "https://mail.google.com/mail/images/sound.gif";
			siteData.logo = "http://www.google.com/images/package.gif";
		} else {
			
			for(var i in siteList) {
				
				var site = siteList[i];
				if(site.urlRegEx.test(content)) {
					siteData = site;
					siteData.editLink = content.match(/gcloud~:\S+/)[0].substr(gCloudToken.length);
					break;
				}
			}	
		}
		
		return siteData;
	}

	this.processMailList = function(list) {

		for(var i in list) {

			//Check for the a valid GCloud row
			if(list[i] && /^zA/.test(list[i].className) && !list[i].getAttribute("gCloud") && /gcloud~:/.test(list[i].innerHTML))
			{
				var rainDrop = list[i];
				var rainDropType = rainDrop.childNodes[2];
				var rainDropLink = rainDrop.childNodes[4];
				rainDropLink.innerHTML = rainDropLink.innerHTML.replace(/\[.*\]/,"");
				
				rainDrop.replaceChild(rainDrop.childNodes[0].cloneNode(false), rainDrop.childNodes[5]);
				var rainDropAttachment = rainDrop.childNodes[5];
				var rainDropData = getSiteData(rainDrop);
				
				var maxHeight = 23;//rainDropType.offsetHeight;
				reface(rainDropType, rainDropData.logo).height = maxHeight;	
				reface(rainDropAttachment, rainDropData.icon);
				
				rainDropAttachment.addEventListener("click", function(){popUpWindow(getSiteData(this.parentNode).editLink,800,800)},false);
				
				//Keep cloud row white - just aesthetic
				rainDrop.style.backgroundColor = "#FFFFFF";
				
				rainDrop.setAttribute("gCloud","true");
			}
		}
	}
}
//############################## Cloud Media Data ##############################//  END


//############################## Utilities ##############################//  BEGIN 

function littleLink(button) {

	function cb(url) {
		G3PO.launchComposeGmail("","",button.previousSibling.innerHTML,G3PO.addCode(button.previousSibling.href, url),true);
	}
	
	if(GM_xmlhttpRequest)
		GM_xmlhttpRequest({
			method:'GET',
			url: 'http://remysharp.com/tinyurlapi?callback=cb&url=' + button.previousSibling.href,
	        headers: {
	            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	            'Accept': 'application/atom+xml,application/xml,text/xml',
	        },
			onload:function(results) {
				eval(results.responseText);
			}
		});
	else
		G3PO.launchComposeGmail("","",button.previousSibling.innerHTML,G3PO.addCode(button.previousSibling.href, ''),true);
}

function getLabelColor() {

	//*********COLOR*********
	var divNodes = document.getElementsByTagName("div");	
	var defaultColor = null;
	for(i = 0; i < divNodes.length; i++)
		if(/py/.test(divNodes[i].className) && (divNodes[i].childNodes[1].childNodes.length == 0) )//oggeve - py
			break;
	for(i++; i < divNodes.length; i++)
		if(/p5 qa/.test(divNodes[i].className)) {//yyT6sf - p5 qa
			defaultColor = window.getComputedStyle(divNodes[i].firstChild,null).color;
			break;
		}
	//*********-*********
	
	return defaultColor;
}
 function removeChildNodes(parentNode) {
 
      while(parentNode.hasChildNodes()){
		parentNode.removeChild(parentNode.lastChild);
      }
 }
 
 function popUpWindow(url,height,width) {

	window.open (url, 'newwindow', config='height=' + height + ', width=' + width + ', toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
 }
 
 function launchIFrame(url) {
		
	var iframe = document.createElement("iframe");
	iframe.id = 'itest'
	iframe.src = url;
	iframe.style.width = "400px";
	iframe.style.height = "400px";

 }
 
 function reface(node,src) {
		var image = document.createElement("img");
		image.src = src;
		removeChildNodes(node);
		node.appendChild(image);
		
		return image;
 }
 
function partyStarter(conan) {
  var evt = document.createEvent("MouseEvents");
  evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
  conan.dispatchEvent(evt);
}

function getAncestor(node, level) {
	
	var ancestor = node;
	
	for(var i = 0; i<level; i++) {
		ancestor = ancestor.parentNode;
	}
	
	return ancestor;
}

function whiteOut(node, background, color) {
	if(node.style) {
		node.style.background = background;
		node.style.color = color;
	}

	var count = 1;
	if(node.hasChildNodes()) {
		for(var i in node.childNodes)
			count += whiteOut(node.childNodes[i], background, color);
	}
	return count;
}

function waitForIt(now, interval, iteration){
	if(interval == null)
		interval = 100;
		
	var find;
		
	function run() {
		if(now())
			window.clearInterval(find);
			
		if(iteration &&  iteration <= 0)
			window.clearInterval(find);
		else
			iteration--;
	}
		
	find = window.setInterval(run,interval);

	return find;
}
//############################## Utilities ##############################//  END 