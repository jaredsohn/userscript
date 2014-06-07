// ==UserScript==
// @name          Yay RSS Sidebar
// @namespace     http://c3o.org
// @description	  Displays a user-specified RSS feed in the sidebar at yayhooray.com
// @include       http://*.yayhooray.com/threads*
// ==/UserScript==


var RSSpresets = new Array(
	new Array('Change RSS Feed...', ''),
	new Array('Moka-Break', 'http://feeds.feedburner.com/Moka-Break'),
	new Array('K10K', 'http://www.k10k.org/feeds/rss/rss.xml'),
	new Array('Speak Up', 'http://www.underconsideration.com/speakup/index.xml'),
	new Array('Design Observer links', 'http://www.designobserver.com/index.xml'),
	new Array('We make money not art', 'http://www.we-make-money-not-art.com/index.xml'),
	new Array('EyeBeam ReBlog', 'http://www.eyebeam.org/reblog/index.rdf'),
	new Array('Grouphug.us', 'http://grouphug.us/rss'),
	new Array('Metafilter', 'http://xml.metafilter.com/rss.xml'),
	new Array('Slashdot', 'http://slashdot.org/rss/index.rss'),
	new Array('BBC World', 'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/world/rss.xml'),
	new Array('(Random)', 'random'),
	new Array('Yay blog of...', 'userinputblog'),
	new Array('Other...', 'userinput')
);
var customRSSurls = 0;
var yayBlogPrefix = 'http://justanotherspectator.com/yh/tehyhfeed.php?';
if(GM_getValue('userrssurl3') != undefined) { customRSSurls++; RSSpresets.splice(RSSpresets.length-3, 0, new Array(GM_getValue('userrssurl3').replace(yayBlogPrefix, 'Yay blog of ').replace('http://', '').substr(0, 25), GM_getValue('userrssurl3'))); }
if(GM_getValue('userrssurl2') != undefined) { customRSSurls++; RSSpresets.splice(RSSpresets.length-3, 0, new Array(GM_getValue('userrssurl2').replace(yayBlogPrefix, 'Yay blog of ').replace('http://', '').substr(0, 25), GM_getValue('userrssurl2'))); }
if(GM_getValue('userrssurl1') != undefined) { customRSSurls++; RSSpresets.splice(RSSpresets.length-3, 0, new Array(GM_getValue('userrssurl1').replace(yayBlogPrefix, 'Yay blog of ').replace('http://', '').substr(0, 25), GM_getValue('userrssurl1'))); }


(function() {


	if(document.getElementById('credits')) {

		//== display it ==

		var uid = 0;										//find user id (to embed stylesheet)
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			while (ca[i].charAt(0)==' ') { ca[i] = ca[i].substring(1,ca[i].length); }
			if (ca[i].indexOf('yh_userid=') == 0) { uid = ca[i].substring(10,ca[i].length); }
		}


		var rssurl = GM_getValue('rssurl', '');
		var rssurlorig = rssurl;
		if(rssurl=='random') { var rnd = Math.round(Math.random()*(RSSpresets.length-3))-1; rssurl = RSSpresets[rnd][1]; }

		newiframe = document.createElement('iframe');		//create iframe
		newiframe.src = 'http://c3o.org/misc/yay/extensions/rss/?user='+uid+'&feed='+rssurl;
		newiframe.id = 'rsssidebar';
		newiframe.style.border='0';
		newiframe.style.width='100%';
		newiframe.style.height='500px';

		document.getElementById('pagenav').insertBefore(newiframe, document.getElementById('credits'));


		//== setting ==

		var newselect = document.createElement('select');	//create form
		newselect.style.width = '130px';
		for(var i=0;i<RSSpresets.length; i++) {  //>
			if(i==0 || i==RSSpresets.length-3 || i==RSSpresets.length-3-customRSSurls) {
				var newoptgroup = document.createElement('optgroup');
				newoptgroup.setAttribute('label', '---');
				newoptgroup.style.fontSize='1em';
				newoptgroup.style.fontWeight='100';
			}
			var newoption = document.createElement('option');
			newoption.style.paddingLeft='10px';
			newoption.value = RSSpresets[i][1];
			newoption.appendChild(document.createTextNode(RSSpresets[i][0]));
			if(rssurlorig == RSSpresets[i][1]) { newoption.setAttribute('selected', 'selected'); }
			newoptgroup.appendChild(newoption);
			if(i==RSSpresets.length-4 || i==RSSpresets.length-1 || i==RSSpresets.length-4-customRSSurls) {
				newselect.appendChild(newoptgroup);
			}
		}
		newselect.onchange = function() {
			if(this.nextSibling.className == 'customOther') { this.parentNode.removeChild(this.nextSibling); }
			if(this.options[this.selectedIndex].value.indexOf('userinput') > -1) {
				var newinput = document.createElement('input');
					newinput.className = 'customOther';
				this.parentNode.insertBefore(newinput, this.nextSibling);
				newinput.focus();
			}
		}
		var newform = document.createElement('form');
		var newsubmit = document.createElement('input');
		newsubmit.setAttribute('type', 'submit');
		newsubmit.value = 'Save';
		newsubmit.style.height = '20px';
		newsubmit.style.width = '40px';
		newform.appendChild(newselect);
		newform.appendChild(newsubmit);
		newform.onsubmit = function() {

			var rssurl = ''; var rssurlorig = '';
			var inputs = this.getElementsByTagName('input');
			var selects = this.getElementsByTagName('select');
			var selectx = selects[0].selectedIndex;
			if(inputs.length == 2) { //otherfield+submitbutton
				rssurl = inputs[0].value;
				rssurlorig = rssurl;
				if(selects[0].options[selectx].value == 'userinputblog') {
					rssurl = yayBlogPrefix+rssurl.toLowerCase().replace(/[ _]/g, '-');
				}
				if(GM_getValue('userrssurl2') != undefined) { GM_setValue('userrssurl3', GM_getValue('userrssurl2')); }
				if(GM_getValue('userrssurl1') != undefined) { GM_setValue('userrssurl2', GM_getValue('userrssurl1')); }
				GM_setValue('userrssurl1', rssurl);
			} else {
				rssurl =  selects[0].options[selectx].value;
				rssurlorig = rssurl;
				if(rssurl=='random') { var rnd = Math.round(Math.random()*(RSSpresets.length-3))-1; rssurl = RSSpresets[rnd][1]; }
			}
			GM_setValue('rssurl', rssurlorig);
			newiframe.src = 'http://c3o.org/misc/yay/extensions/rss/?user='+uid+'&feed='+rssurl;
			return false;
		}

		document.getElementById('pagenav').insertBefore(newform, document.getElementById('credits'));

	}

})();