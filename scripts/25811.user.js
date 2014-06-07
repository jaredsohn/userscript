// ==UserScript==
// @name          RTL4Gmail
// @namespace     http://itairaz.blogspot.com
// @description   v1.06; Inserts a right to left section in your email message. Based on m's work here: http://userscripts.org/scripts/show/16839
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

//Many many thanks to m (couldn't figure out the name), http://userscripts.org/scripts/show/16839. This script
//is entirely based on his great multiple html signature GM script. All I had to do was delete a whole chunk of code
//and modify slightly

var m_moduleLoaded;

GM_registerMenuCommand("Work around RTL Bug", onLoadHander);

window.showOrHideSidePane = function() {

    var pane = getDoc().getElementById("RTL4Gmail");
    switch(getViewType())
    {
        case "Compose":
        case "Conversation":
            pane.style.visibility = "visible";
            break;
            
        default:
            pane.style.visibility = "hidden";
            break;
    }

}

// Add the signature to the message
window.insRtl = function() {
	s_html = "<div dir='rtl'>Put your RTL text here</div>";
	str = getViewType();
	txtBox = getWindow();
	s_head = "<!--Composed with RTL4Gmail-->";
	s_foot = "<!--End RTL4Gmail--><br />";
	if (str == "Compose") 
	{ // no reply/forward text, insert at end 
		txtBox.contentDocument.body.innerHTML = txtBox.contentDocument.body.innerHTML + s_head + s_html + s_foot;
	}
	else if (str == "Conversation") 
	{ // reply/forward
	    if (!txtBox)
	    { // reply/forward, insert at the beginning
		    setTimeout(insRtl, 500);
	    } 
	    else 
	    {
		    txtBox.contentDocument.body.innerHTML = s_head + s_html + s_foot + txtBox.contentDocument.body.innerHTML;
	    }
	}
}


function createSideLink()
{
    sidePane.innerHTML="";
	var sideContent = unsafeWindow.document.createElement('span');
	sideContent.innerHTML = "<center><font size='-2'><a href='#'>Add RTL Section</a></font><center>";
	sideContent.addEventListener('click', function () {insRtl()}, false);
	sidePane.appendChild(sideContent);
}

//Initialize gmail and gmonkey objects
//Create new module

function onLoadHander()
{
  if (unsafeWindow.gmonkey && !m_moduleLoaded) 
  {
	unsafeWindow.gmonkey.load('1.0', initGmail, true); 
  }
  else if(m_moduleLoaded)
  {
	alert('RTL already loaded');
  }
}

function initGmail(gmail) 
{
	// Create the module
	var module = gmail.addNavModule('RTL4Gmail');
	module.getElement().style.marginBottom = '10px';
	module.getElement().style.marginTop = '10px';
	module.getElement().style.padding = '2px';
	module.getElement().id = "RTL4Gmail";
	// Create a reference to the view element
	var txtBox = gmail.getActiveViewElement();
	// Create the wrapper to go inside the module
	sidePane = unsafeWindow.document.createElement('div');
	sidePane.id = "RTL4GSidePane";
	//Fill the wrapper
	createSideLink();
	//  Insert module before chat pane
	navPane = gmail.getNavPaneElement().firstChild;
	chatPane = navPane.childNodes[3];
	// Append the wrapper to the module
	module.appendChild(sidePane);
	
	window.getViewType = function() {
		var str = '';
		switch (gmail.getActiveViewType()) {
		  case 'tl': str = 'Threadlist'; break;
		  case 'cv': str = 'Conversation'; break;
		  case 'co': str = 'Compose'; break;
		  case 'ct': str = 'Contacts'; break;
		  case 's': str = 'Settings'; break;
		  default: str = 'Unknown';
		}
		return str;
	}

	window.getDoc = function() {
		return gmail.getNavPaneElement().ownerDocument;
	}

	window.getView = function() {
		return gmail.getActiveViewElement();
	}

	// function to detect window -- From Jerome Dane's great work:  http://userscripts.org/scripts/show/20887
	window.getWindow = function() {
		var add_win = getView().getElementsByTagName('iframe');
		if (add_win.length > 0) {
			return add_win[0];
		} else {
			return false
		}
	}
	
	gmail.registerViewChangeCallback(showOrHideSidePane);
	
	showOrHideSidePane();
	
	m_moduleLoaded = true;
        
}

//register to the load event, so we can get it all started
window.addEventListener('load', onLoadHander());
