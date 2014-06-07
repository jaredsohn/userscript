// ==UserScript==
// @name          pscQuickbar
// @namespace     http://davidtony.com/
// @version       0.1.7.2.1
// @description     
// @include       http://photoshopcontest.com/*
// @include       http://www.photoshopcontest.com/*
// ==/UserScript==



var pscfilter = GM_getValue("pscfilter");
    if ( !pscfilter ) {
        pscfilter = 0;
        GM_setValue("pscfilter", pscfilter);
    }

var anonym = GM_getValue("anonymous");
    if ( !anonym ) {
        anonym = 0;
        GM_setValue("anonymous", anonym);
    }


if (pscfilter == 1 && location.pathname=="/boards/viewtopic.php") userhide();

pscquickbar();
//{4357fe65-ed5e-3ca7-8731-c754ae561f18}
function userhide() {
	// Get stored hidden users from cookie
	var users = [];
	var cookieName = "UserHide";
	for (var i = 0; i < document.cookie.split('; ').length; i++) {
		var oneCookie = document.cookie.split('; ')[i].split('=');
		if (oneCookie[0] == cookieName) {
			users = oneCookie[1].split(', ');
			break;
		}
	}

	// Cursor functions
	var curPointer = function(event) {
		event.target.style.cursor = 'pointer';
		event.preventDefault();
	};
	var curDefault = function(event) {
		event.target.style.cursor = 'default';
		event.preventDefault();
	};

	// Add or remove a user from the cookie
	var addRemoveUser = function(event) {
		// Parse current cookie
		for(j = 0; j < document.cookie.split('; ').length; j++ ) {
			var oneCookie = document.cookie.split('; ')[j].split('=');
			if (oneCookie[0] == cookieName) {
				users = oneCookie[1].split(', ');
				break;
			}
		}
		var user = escape(event.target.nextSibling.innerHTML)
		notFound = true;
		for (var j = 0; j < users.length; j++) {
			if (users[j] == user) {
				users.splice(j, 1);
				notFound = false;
			}
		}
		if (notFound)
			users.push(user);
		if (users.length > 0) {
			var date = new Date();
			var days = 365;
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = '; expires=' + date.toGMTString();
			var value = users.join(', ');
			document.cookie = cookieName + '=' + value + expires + '; path=/';
		} else {
			document.cookie = cookieName + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
		}
		window.alert(unescape(user) + ' has been ' + (notFound ? 'added to' : 'removed from')
			+ ' your hide list\n'
			+ 'You must refresh the page to view the changes.');
		event.preventDefault();
	};
	// Toggle display of user's post
	var togglePost = function(event) {
		var displayState = event.target.getAttribute('displaystate');
		if (displayState == 'none')
			displayState = '';
		else
			displayState = 'none';
		event.target.setAttribute('displaystate', displayState);

		containingRow = event.target.parentNode.parentNode;
		var innerTags = containingRow.getElementsByTagName('*');
		for (var i = 0; i < innerTags.length; i++) {
			var tagClass = innerTags[i].getAttribute('class');
			if (tagClass == 'postbody' || tagClass == 'postsig'
				|| tagClass == 'postdetails' || innerTags[i].tagName == 'TABLE')
				innerTags[i].style.display = displayState;
		}
		event.preventDefault();
	};
	// Toggle display of user's quote
	var toggleQuote = function(event) {
		var displayState = event.target.getAttribute('displaystate');
		if (displayState == 'none')
			displayState = 'table-row';
		else
			displayState = 'none';
		event.target.setAttribute('displaystate', displayState);

		// Jump to parent row
		var containingRow = event.target.parentNode.parentNode.parentNode.parentNode.nextSibling;
		// Find containing row
		while (containingRow.nodeType != 1)
			containingRow = containingRow.nextSibling;
		containingRow.style.display = displayState;

		event.preventDefault();
	};

	// Find all the usernames in the page
	var results = document.evaluate("//a[@class='board_username']", document, null,
		XPathResult.ANY_TYPE, null);
	var resultNodes = [];
	var aResult;
	while (aResult = results.iterateNext())
		resultNodes.push(aResult);

	// Loop through every user post on the page
	for (var i in resultNodes) {
		var containingRow = resultNodes[i].parentNode.parentNode.parentNode.parentNode;
		// Format whitespace
		var user = escape(resultNodes[i].innerHTML);

		// Flag whether the user is in our hide list
		var notFound = true;
		for (var j = 0; j < users.length; j++) {
			if (users[j] == user) {
				notFound = false;
			}
		}

		// Add relevant event handlers to user's name and a toggler node
		var toggler = document.createElement('span');
		toggler.setAttribute('title', "click to add or remove this user from your hide list");
		toggler.appendChild(document.createTextNode('[X] '));
		toggler.style.fontSize = "7pt";
		toggler.addEventListener('mouseover', curPointer, true);
		toggler.addEventListener('mouseout', curDefault, true);
		toggler.addEventListener('click', addRemoveUser, true);

		resultNodes[i].parentNode.insertBefore(toggler, resultNodes[i]);

		// If this user isn't in our hide list, skip to the next user
		if (notFound)
			continue;

		// Find the first element node (td) in the containing row
		var elem = containingRow.firstChild;
		while (elem.nodeType != 1)
			elem = elem.nextSibling;
		
		
		// Insert a <br> after the username and before the span*/
		elem.insertBefore(document.createElement('br'), elem.firstChild.nextSibling.nextSibling);
        var nextContainingRow=containingRow;
		var innerTags = nextContainingRow.getElementsByTagName('*');
		for (var i = 0; i < innerTags.length; i++) {
			var tagClass = innerTags[i].getAttribute('class');
			if (tagClass == 'postbody' ) var removePost=innerTags[i];
			if (tagClass == 'postbodytopinfo' ) var replacePostinfo='<p class="postbodytopinfo">'+innerTags[i].innerHTML+'</p>';                        			
			
			if (innerTags[i].tagName == 'IMG' ) innerTags[i].style.display='none';                        				
		}
		removePost.innerHTML=replacePostinfo+'<p>*<i>Comment Filtered</i>*</p>';
	}
}

function pscquickbar() {
    var version = "0.1.7.2.1";
    var menulinks = new Array();
    var menuLayout='';
    
    var styles = new Array();    
    styles[1] =
        '.red {color: #f00}'+
        '.blue {color: #00f}'+
        '.green {color: #0f0}'+
        '.purple {color: #f0f}'+
        '#pscQBbuttons {'+
        '  position: fixed;' +
        '  right: 0;' +
        '  left: auto;' +        
        '  top: 0px;' +
        '  background: #FAFAFA;' +
        '  color: 88F;' +
        '  margin: 1px 0px 0px 0px;' +
        '  padding: 1px 0px 0px 0px;' +
        '  width: 115px;' +
        '  font-family: Verdana, sans-serif;' +
        '  font-size: 9px;' +
        '  line-height: 160%;' + 
        '  text-align:left'+       
        '}' +
        '#pscquickbar {'+               
        '  padding-left: 0px;'+
        '}' +
        '#pscquickbar li,' +
        '#pscquickbar span,' +
        '#pscquickbar strong {' +
        '  background-color: transparent;' +
        '  color: #000;' +
        '  font-weight: bold;' +
        '}' +
        '#pscquickbar a {' +
        '  background-color: transparent;' +
        '  color: #44F;' +
        '  padding-left: 10px;' +
        '  font-weight: normal;' +
        '}' +
        '#pscquickbar img {' +
        '  border: none;' +
        '}' +
        '#pscquickbar div {' +
        '  margin: 0 1em 0 0em;' +
        '}' +
        '#pscquickbar div ul {' +
        '  margin-left: 0;' +
        '  margin-bottom: 1px;' +
        '  padding-left: 0;' +
        '  display: inline;' +
        '}' +
        '#pscquickbar div ul li {' +
        '  margin-left: 0;' +
        '  padding: 1px 0px;' +
        '  list-style: none;' +
        '  display: block;' +
        '}' +
        '#pscquickbar hr {' +
        '  margin: 0;' +                
        '}'  
    ;
    
    styles[2] =
        '#pscQBbuttons {'+
        '  position: fixed;' +
        '  left: 4px;' +
        '  right: auto;' +        
        '  top: 0px;' +
        '  background: #FAFAFA;' +
        '  color: 88F;' +
        '  margin: 1px 0 0px 0;' +        
        '  width: 115px;' +
        '  font-family: Verdana, sans-serif;' +
        '  font-size: 9px;' +
        '  line-height: 160%;' +
        '  text-align:left'+        
        '}' +
       '#pscquickbar {'+
        '  padding-left: 3px;'+        
        '}' +
        '#pscquickbar li,' +
        '#pscquickbar span,' +
        '#pscquickbar strong {' +
        '  background-color: transparent;' +
        '  color: #000;' +
        '  font-weight: bold;' +
        '}' +
        '#pscquickbar a {' +
        '  background-color: transparent;' +
        '  color: #44F;' +
        '  padding-left: 10px;' +
        '  font-weight: normal;' +
        '}' +
        '#pscquickbar img {' +
        '  border: none;' +
        '}' +
        '#pscquickbar div {' +
        '  margin: 0 1em 0 0em;' +
        '}' +
        '#pscquickbar div ul {' +
        '  margin-left: 0;' +
        '  margin-bottom: 1px;' +
        '  padding-left: 0;' +
        '  display: inline;' +
        '}' +
        '#pscquickbar div ul li {' +
        '  margin-left: 0;' +
        '  padding: 1px 0px;' +
        '  list-style: none;' +
        '  display: block;' +
        '}' 
    ;    
        
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }    
    
    
    function pageTitleOk(test) {
        //determine if window is popup 
        var title;
        title = document.title;
        
        if ( !title ) return false;
        if (test && title.match(test)) return false;
        if ( title.match('Emoticons') ) return false;
        if ( title.match('PSC Chat') ) return false;
        if ( title.match('Topic review') ) return false;
        
        return true;
    }
    
    var isentry = !pageTitleOk("on Photoshop Contest");
    
    if (anonym == 1 && isentry) {
            
            var boxes = document.body.getElementsByTagName('table');            
            
    		for (var i = 0; i < boxes.length; i++) {
    			var boxClass = boxes[i].getAttribute('class');
                                            			
                if (boxClass == 'greybox') {
                    if (boxes[i].innerHTML.match("Created") || boxes[i].innerHTML.match("Qualities")) 
                    {
                        boxes[i].style.display = 'none';
                    } else {
                        boxes[i].style.display = 'block';
                    }
    			}
    		}
    }
    
    function loggedIn() {
        var html = document.body.innerHTML;
        var usercheck;
        if ( html.match('Logged in') ) {
            usercheck = html.match('editprofile\"\>([^<]*)\<');
            var username = usercheck[1];
            usercheck = html.match('"/portfolio/([0-9]*)');
            var userid = usercheck[1];
            return new Array(username, userid);            
        } else {
            return false;
        }    
    }
    
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    function menuItem(id, item, type, prop) {
        var items = ''
        
        if (type == 1 || !type) {
            items ='<b>'+item+'</b>';
        }
        
        if (type == 2) {
            items ='<a href="'+prop+'">'+item+'</a>';
        }
        menuLayout = menuLayout + items;
        menulinks.push(items);
    }
    
    function getElementsByClassName( strClassName, obj ) {
       var ar = arguments[2] || new Array();
        var re = new RegExp("\\b" + strClassName + "\\b", "g");

        if ( re.test(obj.className) ) {
            ar.push( obj );
        }
        for ( var i = 0; i < obj.childNodes.length; i++ )
            getElementsByClassName( strClassName, obj.childNodes[i], ar );
    
        return ar;
    }
    
    
    

    function buildMenu (menu) {
        var desc, div;
            
        div = document.createElement('div');
        
        div.id = 'pscquickbar';
        desc = '';
        desc = '<div><hr /><ul>';
        for (var i = 0; i < menu.length; i++) {
            desc = desc + '<li>' + menu[i] + '</li>';
        }
                
        desc = desc + '</ul>By <a href="http://photoshopcontest.com/portfolio/7489/">'+
            '<img src="http://davidtony.net/spacer.gif">'+
            '<img src="http://photoshopcontest.com/boards/images/smiles/penguin.gif"></a></div>';        
        
        var divButtons = document.createElement('div');
        divButtons.id = 'pscQBButtons';
        divButtons.innerHTML ="<b>pscQuickBar</b>";
                
        var bt_loc = document.createElement("input");
        bt_loc.type = "button";
        bt_loc.name = "styleQB"; 
        bt_loc.value ="Switch location";
        bt_loc.style.border = "none";
        bt_loc.style.fontSize = "1em";
        bt_loc.style.background = "transparent";
        bt_loc.style.cursor = "pointer";
        bt_loc.style.display = "block";
        
        bt_loc.addEventListener(
            "click",
            function() { 
                var styleQB=GM_getValue("styleQB") + 1;
                if (styleQB>2) styleQB = 1;                   
                GM_setValue("styleQB", styleQB);
                addGlobalStyle( styles[styleQB] );                              
            },
            true
        );        
        
        var bt_filt = document.createElement("input");
        bt_filt.type = "button";
        bt_filt.name = "pscfilter"; 
        if (pscfilter==1) bt_filt.value ="Filter On";
        else bt_filt.value ="Filter Off";
        bt_filt.style.border = "none";
        bt_filt.style.fontSize = "1em";
        bt_filt.style.background = "transparent";
        bt_filt.style.cursor = "pointer";
        bt_filt.style.display = "block";
        
        bt_filt.addEventListener(
            "click",
            function() { 
                var pscfilter=GM_getValue("pscfilter") + 1;
                if (pscfilter>1) pscfilter = 0;                   
                GM_setValue("pscfilter", pscfilter);   
                if (pscfilter==1) bt_filt.value ="Filter On";
                else bt_filt.value ="Filter Off";                                           
            },
            true
        );
        
        var bt_anonym = document.createElement("input");
        bt_anonym.type = "button";
        bt_anonym.name = "anonymous"; 
        if (anonym==1) bt_anonym.value ="Anonymous On";
        else bt_anonym.value ="Anonymous Off";
        bt_anonym.style.border = "none";
        bt_anonym.style.fontSize = "1em";
        bt_anonym.style.background = "transparent";
        bt_anonym.style.cursor = "pointer";
        bt_anonym.style.display = "block";
        
        bt_anonym.addEventListener(
            "click",
            function() { 
                var anonym=GM_getValue("anonymous") + 1;
                if (anonym>1) anonym = 0;                   
                GM_setValue("anonymous", anonym);   
                if (anonym==1) bt_anonym.value ="Anonymous On";
                else bt_anonym.value ="Anonymous Off";                                           
            },
            true
        );
        
        var bt_hide = document.createElement("input");
        bt_hide.type = "button";
        bt_hide.name = "hideQB"; 
        bt_hide.value = "Hide/Show";
        bt_hide.style.border = "none";
        bt_hide.style.fontSize = "1em";
        bt_hide.style.background = "transparent";
        bt_hide.style.cursor = "pointer";
        bt_hide.style.display = "block";
        
        bt_hide.addEventListener(
            "click",
            function() { 
                var hideQB=GM_getValue("hideQB") + 1;
                if (hideQB>2) hideQB = 1;                   
                GM_setValue("hideQB", hideQB);
                if (hideQB==1) addGlobalStyle( "#pscquickbar {display:block;}" )
                else addGlobalStyle( "#pscquickbar {display:none;}" );                              
            },
            true
        );
        
        var bt_cust = document.createElement("input");
        bt_cust.type = "button";
        bt_cust.name = "custQB"; 
        bt_cust.value ="Customize";
        bt_cust.style.border = "none";
        bt_cust.style.fontSize = "1em";
        bt_cust.style.background = "transparent";
        bt_cust.style.cursor = "pointer";
        bt_cust.style.display = "block";
        
        bt_cust.addEventListener(
            "click",
            function() { 
                var custQB=GM_getValue("custQB") + 1;
                if (custQB>2) custQB = 1;                   
                GM_setValue("custQB", custQB);               
                if (custQB == 2) {
                   addGlobalStyle( "#pscQBButtons {width:200px;}" )
                } else {
                   addGlobalStyle( "#pscQBButtons {width:115px;}" )
                }
                                               
            },
            true
        );
        
        div.innerHTML = desc;
        document.body.style.paddingBottom = "2em";
        
        window.addEventListener(
            "load",
            function() {
                document.body.appendChild(divButtons);
                divButtons.appendChild(bt_hide);
                divButtons.appendChild(bt_loc);
                divButtons.appendChild(bt_filt);
                divButtons.appendChild(bt_anonym);
                divButtons.appendChild(bt_cust);
                
                divButtons.appendChild(div);                              
                                
            },
            true
        );
    }
    
    if ( !pageTitleOk() ) return; 
    
    menuItem('h','Home', 2 ,'/');    
        
    var user = loggedIn();
    if (user) 
    {                    
        menuItem('u','Hi '+user[0]);
        menuItem('u1','Profile', 2, '/boards/profile.php?mode=viewprofile&u='+user[1]);                        
        menuItem('u2','Portfolio', 2, '/portfolio/'+user[1]);
        menuItem('u3','Favorites', 2, '/favorites/'+user[1]);
        menuItem('u4','<b>Log out</b>', 2,'/boards/login.php?logout=true&sid='+readCookie('psc_sid') );
    } 
    

    //add menuitems
    menuItem('f','Forum');
    menuItem('f1','Search', 2, '/boards/search.php');
    menuItem('f2','New posts', 2, '/boards/search.php?search_id=newposts');    
    menuItem('f3','My posts[ego]', 2, '/boards/search.php?search_id=egosearch');
    if (user) menuItem('f4','My posts[author]', 2, '/boards/search.php?search_author='+user[0]);
    menuItem('f5','Unanswered', 2, '/boards/search.php?search_id=unanswered');
    menuItem('f6','View online', 2, '/boards/viewonline');
    menuItem('f7','Chat', 2, '/chat/talk.html');
    menuItem('c','Contests');
    menuItem('c1','Special Events', 2, '/events/special.html');
    menuItem('a','Advantage only');
    menuItem('a1','AdvantaChat', 2, '/advantage-chat/talk.html');
    menuItem('a2','Contest Images', 2,'/advantage/images/index.html');
    menuItem('a3','Vote Sources', 2,'/advantage/select/index.html');
    menuItem('a4','Submit Originals', 2, '/advantage/originals/index.html');
    menuItem('s','Stats');
    menuItem('s1','Hall of fame', 2, '/halloffame/');
    menuItem('s2','Monthly Leaders', 2, '/standings/');
    menuItem('s3','Record Holders', 2, '/records/');
    menuItem('o','Outbound');
    menuItem('o1','Splodge Chat', 2,'http://www.hallcross.co.uk/CHAT.html');
    menuItem('x','<hr />');
    menuItem('x1','Version '+version);
    menuItem('x2','Donations ;)',2,'http://davidtony.com/content/view/52/41/#donate" target="_blank');
    menuItem('x3','Update', 2,'http://userscripts.org/scripts/show/8368/" target="_blank');

    var hideQB = GM_getValue("hideQB");
    if ( !hideQB ) {
        hideQB = 2;
        GM_setValue("hideQB", hideQB);
    }
    
    //select the style;
    var styleQB = GM_getValue("styleQB");
    if ( !styleQB ) {
        styleQB = 1;
        GM_setValue("styleQB", styleQB);
    }
    
    //custmize?;    
    buildMenu(menulinks);       
    addGlobalStyle( styles[styleQB] );   
    
              
    
    
}
