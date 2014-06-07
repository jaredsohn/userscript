// ==UserScript==
// @name          EasyMeMail
// @namespace      http://www.metafilter.com/user/25038
// @description   Adds an e-mail icon next to each user so that it is easier to contact them via MeMail
// @include        http://*.metafilter.com*
// @exclude        http://www.metafilter.com/contribute/messages-write.mefi
// ==/UserScript==

(function () {
	var emailIconLoc='http://images.metafilter.com/mefi/icons/stockholm_mini/email.gif';
	var userPath= "/user/";
	userPath='http://www.metafilter.com'+userPath;
	var postedByPattern = "//span[@class='smallcopy']//a[contains(@href,'/user/')]";
	var myPattern = "//div[@class='mefimessages']//a[contains(@href,'/user/')]";

	var myUserID = '';

	function memail_init() {

		var myLink = document.evaluate( myPattern, document, null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		myUserID = myLink.snapshotItem(0).href.replace(userPath,'');

		if (!document.getElementById('contact')) {
			var contactForm=document.createElement('form');
			contactForm.id="gm_memail_form";
			contactForm.action="http://www.metafilter.com/contribute/messages-write.mefi";
			contactForm.method="post";
			contactForm.style.display='none';
			contactForm.style.margin=0;
			contactForm.style.padding=0;
			var contactUser=document.createElement('input');
			contactUser.id='gm_memail_to';
			contactUser.type='hidden';
			contactUser.name='to';
			contactForm.appendChild(contactUser);
			document.getElementById('body').appendChild(contactForm);
		}
	
	
	
		var postedBys = document.evaluate( postedByPattern, document, null, 
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	
		var i;
		for (var aNode = null, i = 0; (aNode = postedBys.snapshotItem(i)); i++) {	
			while (aNode.nodeName != "A") {
				aNode = aNode.parentNode;
			}
			var thisID=aNode.href.replace(userPath,'');
			if (thisID==myUserID) {
				continue;
			}
			
			var contactIcon=document.createElement('img');
			contactIcon.src=emailIconLoc;
			contactIcon.style.border=0;
			contactIcon.style.margin="0 0 0 .25em";
			contactIcon.style.padding=0;
			var contactLink=document.createElement('a');
			contactLink.href="javascript:document.getElementById('gm_memail_to').value='" + thisID + "'; document.getElementById('gm_memail_form').submit()"
			contactLink.title='Send MeMail to '+aNode.textContent;
			contactLink.rel=aNode.href.replace(userPath,'');
			contactLink.appendChild(contactIcon);
			aNode.parentNode.insertBefore(contactLink,aNode.nextSibling);
		}
	}

	memail_init();

})();