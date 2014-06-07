// ==UserScript==
// @name           Helgon.net search mod
// @namespace      http://henrik.nyh.se
// @description    Brings the search shortcut feature of Lunarstorm to Helgon.net. Use the quick search field normally or add a period and a number or alias to go straight to a part of that user's pages. Username.1 = Presentation, Username.2 or Username.gb = Guestbook, Username.3 or Username.db = Diary, Username.4 or Username.p = Friends, Username.5 or Username.g = Gallery.
// @include        http://www.helgon.net/main.asp
// @include        http://helgon.net/main.asp
// ==/UserScript==

// Make sure user has a greasy enough monkey #######################

	if (!GM_xmlhttpRequest) {
	    alert('Please upgrade to the latest version of Greasemonkey.');
	    return;
	}
	
	
// Set values ######################################################

var pres = "/UserInfo/UserInfo.asp?ID=";
var guestbook = "/GuestBook/Guestbook.asp?ID=";
var diary = "/Diary/Diary.asp?ID=";
var friends = "/Friends/Friends.asp?ID=";
var gallery = "/Gallery2/Gallery.asp?ID=";

// Apparently Helgon is subdomain sensitive, so differentiate
var www = (window.location.href.indexOf('://www.')) ? 'www.' : '';
var baseURL = "http://" + www + "helgon.net";


// Define functions ################################################

	// Flatten multiline data for the benefit of regexps
	function flatten(x) {
		return x.replace(/\r\n/g, '');
	}
	

// Do the mambo ####################################################

	// Find the quick search form

	var form = document.getElementsByTagName('form')[0];

	// Change its OnSubmit function

	form.onsubmit = function() {
	
		var f = this.UserNameSearch;  // Search field
		var q = f.value;  // Value
	
		if (q.match(/.+\.([1-5]|gb|db|p|g)/i)) {
		
			// Search with sub page specified
			
			q = q.split('.');
			var user = q[0];
			var page = q[1].toLowerCase();
			
			var p = baseURL + '/search/Search.asp?SearchType=&action=search&what=0&type=0&text=' + escape(user) + '&sex=&fromage=0&toage=0&region=0&city=0';
			
			GM_xmlhttpRequest({
			method:"GET",
			url:p,
			onload:function(result) {
			
				x = flatten(result.responseText);
				
				if (x.match('kning gav inga tr'))  // No such user
					alert("Det g"+unescape('%E5')+"r inte att hitta n"+unescape('%E5')+"gon anv"+unescape('%E4')+"ndare som heter "+user);
				else {
				
					// User was found
				
					var id = x.replace(/.*userinfo.asp\?ID=(\d+).*/, '$1');  // Extract user id
					
					if (page == 2 || page == 'gb')
						part = guestbook;
					else if (page == 3 || page == 'db')
						part = diary;
					else if (page == 4 || page == 'p')
						part = friends;
					else if (page == 5 || page == 'g')
						part = gallery;
					else
						part = pres;
					
					parent.helgonmain.document.location = '..' + part + id;  // Go!

				}
				
				f.value = '';  // Reset search field
				
			}
			});
			
			return false;
			
		} else {
		
			// Searching normally
			
			return QuickSearch(this);
			
		}
		
	};
