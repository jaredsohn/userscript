/*
EXHIBIT A. Common Public Attribution License Version 1.0.

“The contents of this file are subject to the Common Public Attribution License Version 1.0 (the “License”); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.opensource.org/licenses/cpal_1.0#. The License is based on the Mozilla Public License Version 1.1 but Sections 14 and 15 have been added to cover use of software over a computer network and provide for limited attribution for the Original Developer. In addition, Exhibit A has been modified to be consistent with Exhibit B.
Software distributed under the License is distributed on an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language governing rights and limitations under the License.

The Original Code is at http://userscripts.org/scripts/review/116273/.

The Original Developer is not the Initial Developer and is __________. If left blank, the Original Developer is the Initial Developer.

The Initial Developer of the Original Code is SBscripts. All portions of the code written by SBscripts are Copyright (c) 2011. All Rights Reserved.

Contributor ______________________.

[NOTE: The text of this Exhibit A may differ slightly from the text of the notices in the Source Code files of the Original Code. You should use the text of this Exhibit A rather than the text found in the Original Code Source Code for Your Modifications.]

EXHIBIT B. Attribution Information

Attribution Copyright Notice: ©2011 SBscripts
Attribution Phrase (not exceeding 10 words): This code was developed and tested by SBscripts.

Attribution URL: https://userscripts.org/users/SBscripts

Graphic Image as provided in the Covered Code, if any.

Display of Attribution Information is required in Larger Works which are defined in the CPAL as a work which combines Covered Code or portions thereof with code not governed by the terms of the CPAL.

*/
(function(){/** Wrapper function start */
// ==UserScript==
// @name           Zamzar Instant Download Plus - Download without email all converted files & video's from Zamzar
// @namespace      scripts.seabreeze.tk
// @description    Convert convert files & download video's via Zamzar.com without giving them your e-mail address. Just pick your file or video, choose output and go! The script handles everything for you.

// @copyright      2011 SBscripts, All Rights Reserved
// @license        CPAL, please refer to the source of the script

// @include        http://zamzar.com/*
// @include        http://*.zamzar.com/*
// @include        https://zamzar.com/*
// @include        https://*.zamzar.com/*

// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*

// @include        http://mailinator.com/*
// @include        http://*.mailinator.com/*

// @include        http://userscripts.org/*
// @include        http://*.userscripts.org/*
// @include        https://userscripts.org/*
// @include        https://*.userscripts.org/*

// @match          http://zamzar.com/*
// @match          http://*.zamzar.com/*
// @match          https://zamzar.com/*
// @match          https://*.zamzar.com/*

// @match          http://youtube.com/*
// @match          http://*.youtube.com/*
// @match          https://*.youtube.com/*
// @match          https://youtube.com/*

// @match          http://mailinator.com/*
// @match          http://*.mailinator.com/*

// @match          http://userscripts.org/*
// @match          http://*.userscripts.org/*
// @match          https://userscripts.org/*
// @match          https://*.userscripts.org/*

// @version        0.0.1 alpha
// @updateURL      https://userscripts.org/scripts/source/116273.meta.js
// ==/UserScript==



/******
	GLOBAL VARIABLES
*/

/**
	@name			domain
	@type 			string
	@description	The context for the script: youtube,zamzar, mailinator, uso.
*/
var domain=/^https?:\/\/([^\/:@]*\.)?(youtube|zamzar|mailinator)\.com\//.exec(window.location.href);
if(!domain){
	if(/^https?:\/\/(www\.)?userscripts\.org\//.test(window.location.href)){
		domain='userscripts';
	}else{
		return;//Abort script
	}
}else{
	domain=domain[2];
}
//GM_log(domain)


/**
	@name domains
	@type array
	@description mailinator domains to use for zamzar
*/
var domains=['binkmail.com',
	'bobmail.info',
	'chammy.info',
	'devnullmail.com',
	'mailinator.net',
	'mailinator2.com',
	'putthisinyourspamdatabase.com',
	'safetymail.info',
	'spamherelots.com',
	'spamhereplease.com',
	'suremail.info',
	'thisisnotmyrealemail.com',	
	'tradermail.info',
	'zippymail.info'];

/**
	@name chars
	@type string
	@description chars to use for genarating a random email adress
*/
var chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ234567890_-';


/**
	@name refreshInterval
	@type integer
	@description Refresh interval in miliseconds when checking for Zamzar email
*/
var refreshInterval=20000;

/**************************************************************************************************************************************
	GLOBAL FUNCTIONS
*/
/**
	@name rand
	@param min - the minimum random number to return
	@param max - the maximum random number to return
	@description returns a random number between @param 1 and @param 2	
*/
function rand(min,max){
	var max=max-min;
	return Math.floor(Math.random()*(max+1))+min;
}


/**
	@name getEmail
	@parmam length OPTIONAL - the length of the random e-mail
	@description
	generate a random email adress ending with one of the mailinator domains.
*/
function getEmail(length){
	var strEmail='';
	if(!length) length=rand(5,36);
	
	
	for(var i=0;i<length;i++){
		strEmail+=chars[rand(0,chars.length-1)];
	}
	
	strEmail+='@'+domains[rand(0,domains.length-1)];
	
	return strEmail
}


/***
	Zamzar.com
*/
if(domain=='zamzar'){
	/**
		Zamzar conversion page: file & URI
	*///	File + URI both will work with exactly the same code
	if(/^\/(url\/)?(index\.php)?(\?.*|\?)?$/.test(window.location.pathname)){
	
		/**
			Remove step 3 (enter email) from conversion box
		*/
		document.querySelector('div.step3').style.display='none';//Hide step 3; this script takes care of it.
		
		//Fix the void that removing step 3 has left behind
		document.querySelector('div.conversionBox').style.width='75%';//Resize box
		document.querySelector('div.conversionBox').style.marginLeft='auto';//Center box from left
		document.querySelector('div.conversionBox').style.marginRight='auto';//Center box from rigth
		document.querySelector('#fileForm>table').style.width='75%';//Resize tabs
		document.querySelector('#fileForm>table').style.marginLeft='auto';//Center tabs from left
		document.querySelector('#fileForm>table').style.marginRight='auto';//Center tabs from right
		
		//Add a line at the left of step 4 since it disappeared with step 3
		document.querySelector('div.step4').style.borderLeft='1px solid #999999';//Hide step 3; this script takes care of it.
		
		//Rename "Step 4" to "Step 3"
		document.querySelector('div.step4>h3').textContent='Step 3';
		
		/**
			Generate a random email and enter it at the (hidden) step 3
		*/
		var email=getEmail();
		document.getElementById('toEmail').value=email;
		//GM_log(email)
		
		/**
			Save the random e-mail to localStorage for the next step when leaving the page, but only if the form was submitted.
		*/
		document.getElementById('fileForm').addEventListener('submit',function(){
			window.addEventListener('unload',function(){
				localStorage['mail']=email;
				//GM_openInTab('http://mailinator.com/maildir.jsp?email='+encodeURIComponent(localStorage['mail'].split('@')[0]));//
			},false);
		},false);
		
	/**
		Zamzar upload complete page
	*/
	}else if(/^\/uploadComplete\.php/.test(window.location.pathname)){
		/**
			Alter the upload complete page so that it shows that it shows a spinner image and a message stating the files are being converted
		*/
		//Alter the title
		document.title='Converting... | '+document.title
		
		var largeHeader=document.querySelector('span.largeHeader');
		var messageTxt=largeHeader.parentNode;
		
		var largeHeader=messageTxt.removeChild(largeHeader);
		
		/*
			Multiple files
		*/
		if(/uploads/.test(largeHeader.textContent)){
		
			messageTxt.innerHTML='<p>Your files were uploaded are now being converted.</p>\
			<br>\
			<div id="divDL"><p><center>Please wait...</center></p>\
			<span style=text-align:center;display:block><img src="http://www.zamzar.com/images/progress_circle.gif" alt="Converting"></span></div>'+
			"<br/><br/><p>Your converted files will be stored for <span class='bodybd'>24 hours</span> from the time they have been converted (<a href='/signup/?uc2#go' target='_blank'>want longer</a> ?)<br/>&nbsp;<br/><b>Note</b>: Converting may take longer for bigger files, or when we're very busy (<a href='/signup/?uc3#go' target='_blank'>want faster conversions</a> ?)</p>";
			
		
		/*
			One file
		*/
		}else{
			messageTxt.innerHTML='<p>Your file was uploaded and is now being converted.</p>\
			<br>\
			<div id="divDL"><p><center>Please wait...</center></p>\
			<span style=text-align:center;display:block><img src="http://www.zamzar.com/images/progress_circle.gif" alt="Converting"></span></div>'+
			"<br/><br/><p>Your converted file will be stored for <span class='bodybd'>24 hours</span> from the time it has been been converted (<a href='/signup/?uc2#go' target='_blank'>want longer</a> ?)<br/>&nbsp;<br/><b>Note</b>: Converting may take longer for bigger files, or when we're very busy (<a href='/signup/?uc3#go' target='_blank'>want faster conversions</a> ?)</p>";;
			
		}
		
		largeHeader=messageTxt.insertBefore(largeHeader,messageTxt.firstChild);
		
		/**
			Create iframe pointing to mailinator mailbox; the rest of the stuff will be handled there.
		*/
		var mFrame=document.createElement('iframe');
		mFrame.setAttribute('style','display:none');
		mFrame.src='http://mailinator.com/maildir.jsp?email='+encodeURIComponent(localStorage['mail'].split('@')[0])+'&upload_script=yes';
		mFrame=document.body.appendChild(mFrame);
		
	/**
		Zamzar download file page
	*/
	}else if(/^\/getFiles\.php/.test(window.location.pathname)){
		
		/**
			@name multipleFiles
			@type boolean
			@description True if multiple files are waiting to be downloaded. False if one file is ready.
		*/
		var multipleFiles=/files/.test(document.querySelector('span.largeHeader').textContent)
		
		/**
			Alter title to notify user that the file ready for download
		*/
		f_s=(multipleFiles)?'s':'';
		document.title='Download Your File'+f_s+' | '+document.title
		
		/**
			Auto-start download if just one file was converted
		*/
		if(!multipleFiles){
			/**
				@name downloadLink
				@type string
				@description Link to the file, to auto-start download
			*/
			var downloadLink=document.getElementById('downloadLink').getAttribute('href');
			
			/**
				First check if link was found, then go.
			*/
			if(downloadLink){
				try{//For most browsers
					window.location.href=downloadLink;
				}catch(ex){//Weird, but this is required for Fx + GM
					window.location.href='http://www.zamzar.com'+downloadLink;
				}
			}
		}
	}
/***
	Mailinator.com
*/
}else if(domain=='mailinator'){
	/**
		Mailinator: inbox
	*/
	if(/^maildir\.jsp\?.*&upload_script=yes/.test(window.location.href.split('/')[3])&&top!=self){//Runs in frame only
		
		var mailList=document.getElementById('inboxList');
		
		/**
			If there is no message, set timeout to refresh in 5 seconds
		*/
		if(/No messages for /.test(mailList.textContent)){
			setTimeout(function(){
				window.location.reload();
			},refreshInterval);
		
		/**
			There is/are (a) message(s); loop trough all of them to see if the one we need is amongst them
		*/
		}else{
			var mails=mailList.querySelectorAll('tr')
			/*
				This will skip the first and the last item, since they don't contain e-mails
			*/
			for(var i=1;i<mails.length-1;i++){
				/**
					If there is an e-mail from zamzar, then redirect to it.
				*/
				if(/convertedfiles@zamzar.com/.test(mails[i].querySelector('td>b').textContent)){
					/*
						Somehow Fx+Greasemonkey require a full URI, so lets give it to them.
					*/
					try{
						window.location.href=mails[i].querySelector('td>a').getAttribute('href')+'&upload_script=yes';
					}catch(ex){
						window.location.href='http://mailinator.com'+mails[i].querySelector('td>a').getAttribute('href')+'&upload_script=yes';
					}
				}
			}
			/**
				If no e-mail from zamzar was found, then set a timeout for refresh at 5 seconds.
			*/
			setTimeout(function(){
				window.location.reload();
			},refreshInterval);
		}
	
	/**
		Mailinator: Zamzar email
	*/
	}else if(/^displayemail\.jsp\?.*&upload_script=yes/.test(window.location.href.split('/')[3])&&top!=self){//Runs in frame only
		/**
			Find the link to download the files, then replace the top location with it
		*/
		var filesLink=document.querySelector('a[href^="http://www.zamzar.com/getFiles.php"]').getAttribute('href');
		top.location.replace(filesLink);			
	}
}

})();/** Wrapper function end*/