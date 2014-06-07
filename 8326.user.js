// ==UserScript==
// @name          Google Mail Customize
// @description	  Customize the Google Mail User Interface as you want.
// @author        fobos
// @version       2.3.1
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

// The button style and wider email body code is from Cipher's Gmail Beautifier
// see http://userscripts.org/scripts/show/8212
//
// Alter background color of hovered emails : from bLfH

// Hide components ?
// Yes = 1
// No  = 0
var isHideAds		= 1; // Hides Ads ?
var isHideBookmarks	= 0; // Hide Bookmarks (top of the page) ?
var isHideLabels	= 0; // Hide Labels Menu ?
var isHideChat		= 0; // Hide Chat ?
var isHideInvites	= 1; // Hide Invites Menu ?
var isHideLowBar	= 1; // Hide Low bar menu ?
var isHideFooter	= 1; // Hide Footer ?

// Modify UI
// Yes = 1
// No  = 0
var isModifyButtons	= 1;           // Modify buttons ?
var isModifyLineBackground	= 1;   // Modify line background color ?
var lineBackgroundColor	= "#FFFFFF";   // White by default
var isModifyHoveredLineBackground = 1; // Modify bgColor of hovered Mails?
var bgColorHover        = "#C3D9FF";   // Background color of hovered emails
var isWiderEmailBody	= 1;           // Email body wider ?
var isUseInMenu		= 1;           // Display Storage Use in left menu ?


/*********************************
*****       Script       *********
*********************************/


/*********************************
*****    New Gmail Version   *****
*********************************/
window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {
      var footer = gmail.getFooterElement();
      // Hide footer
      if(isHideFooter) {
        footer.style.display = 'none';
      }

      var leftPanel = gmail.getNavPaneElement().childNodes[0];

      // Check if Chat is above or below Labels
      var isChatAboveLabels = false;
      var div6 = leftPanel.childNodes[6];
      if(div6.innerHTML.indexOf('">Labels</span>') > 0) {
        isChatAboveLabels = true;
      }

      if(isChatAboveLabels == true) {
        var labelModule = leftPanel.childNodes[6];
        var chatModule = leftPanel.childNodes[4];
      } else {
        var labelModule = leftPanel.childNodes[4];
        var chatModule = leftPanel.childNodes[6];
      }
      // Hide Labels
      if(isHideLabels) {
        labelModule.style.display = "none";
      }

      // Hide Chat
      if(isHideChat) {
        chatModule.style.display = "none";
      }

      var inviteModule = leftPanel.childNodes[8];
      // Hide Invites
      if(isHideInvites) {
        inviteModule.style.display = "none";
      }

      // Show Gmail Use
      if(isUseInMenu) {
        var useText = footer.getElementsByTagName("div")[0].getElementsByTagName("div")[4].firstChild.innerHTML;
        if(useText.indexOf("%") > 0) {
          var module = gmail.addNavModule('Gmail Use');
          module.setContent("<span style=\"font-size: 10pt\">"+useText+"</span>");
          var gmailUseModule = leftPanel.childNodes[10];
          var blankModule = leftPanel.childNodes[9];
          var placeToInsert = leftPanel.childNodes[3];
          leftPanel.insertBefore(blankModule, placeToInsert);
          leftPanel.insertBefore(gmailUseModule, placeToInsert);
        }
      }

      // Hide Ads
      if(isHideAds) {
        function dealWithAds() {
          if (gmail.getActiveViewType() == 'cv') {
            var rhsDiv = gmail.getConvRhsElement();
            rhsDiv.style.display = 'none';
          }
        }
        gmail.registerViewChangeCallback(dealWithAds);
      }

    });
  }
}, true);

// Modify background color of email list
if (isModifyLineBackground == 1) {
  var headTag = document.getElementsByTagName("head")[0];
  var lineStyleNode = document.createElement('style');
  lineStyleNode.type = 'text/css';

  lineStyleCode = "tr.xweT7d {background:" + lineBackgroundColor + "}";
  lineStyleNode.innerHTML = lineStyleCode;
  headTag.appendChild(lineStyleNode);
} 

// Alter bgColor of hovered mails
if (isModifyHoveredLineBackground == 1) {
  var headTag = document.getElementsByTagName("head")[0];
  var hoveredMailStyleNode = document.createElement('style');
  hoveredMailStyleNode.type = 'text/css';

  // selector: .xweT7d
  // orig. color: E8EEF7
  hoveredMailStyleCode = "tr.xweT7d:hover { background-color:" + bgColorHover + "; }";
  hoveredMailStyleNode.innerHTML = hoveredMailStyleCode;
  headTag.appendChild(hoveredMailStyleNode);
} 




/*********************************
*****    Old Gmail Version   *****
*********************************/

// Hide Ads
if (isHideAds == 1) {
    if (document.getElementById("ra") != null)	
        document.getElementById("ra").style.display ='none';

    if (document.getElementById("rb") != null)	
        document.getElementById("rb").style.display ='none';

    if (document.getElementById("rp") != null)	
        document.getElementById("rp").style.display ='none';
}

// Hide bookmarks (Google, Gmail, Calendar etc...)
if (isHideBookmarks == 1) {
    var htmlHideBookmarks = document.createElement("div");
    htmlHideBookmarks.innerHTML = '<style type="text/css">.bookmarks {display:none;}</style>';
    document.body.insertBefore(htmlHideBookmarks, document.body.firstChild);

    if (document.getElementById("gbar") != null)	
        document.getElementById("gbar").style.display ='none';
}

// Hide labels
if (isHideLabels == 1) {
    if (document.getElementById("nb_0") != null)	
        document.getElementById("nb_0").style.display ='none';
}

// Hide Invites
if (isHideInvites == 1) {
    if (document.getElementById("nb_1") != null)	
        document.getElementById("nb_1").style.display ='none';
}

// Hide Low Bar menu
if (isHideLowBar == 1) {
    var htmlHideLowBar = document.createElement("div");
    htmlHideLowBar.innerHTML = '<style type="text/css">' +
                               '#tcb{padding-top:7px;}' +
                               '#tcb div{display:none;}' +
                               '.chc{padding-top:7px;}' +
                               '.chc div{display:none;}' +
                               '</style>';
    document.body.insertBefore(htmlHideLowBar, document.body.firstChild);
}

// Hide footer
if (isHideFooter == 1) {
    if (document.getElementById("ft") != null)	
        document.getElementById("ft").style.display ='none';
}


/*********************************
*****    Modify UI look  *********
*********************************/

// Makes buttons look better
if (isModifyButtons == 1) {
    var headTag = document.getElementsByTagName("head")[0];
    var buttonsStyleNode = document.createElement('style');
    buttonsStyleNode.type = 'text/css';

    // Button style
    buttonsStyleCode = "button {" +
                       "border-style:solid; border-width:1px; border-color:#000000;" +
                       "background-color:#FFFFFF; color:#000000; cursor:pointer; height:20px;}" +
                       "button:hover {border-style:outset;}" +
                       "button:active {border-style:inset;}";
    buttonsStyleNode.innerHTML = buttonsStyleCode;
    headTag.appendChild(buttonsStyleNode);
}

// Line style
if (isModifyLineBackground == 1) {
    var headTag = document.getElementsByTagName("head")[0];
    var lineStyleNode = document.createElement('style');
    lineStyleNode.type = 'text/css';

    lineStyleCode = ".rr, .ur{background:" + lineBackgroundColor + "}";
    lineStyleNode.innerHTML = lineStyleCode;
    headTag.appendChild(lineStyleNode);
}

// Alter bgColor of hovered mails
if (isModifyHoveredLineBackground == 1) {
   var headTag = document.getElementsByTagName("head")[0];
   var hoveredMailStyleNode = document.createElement('style');
   hoveredMailStyleNode.type = 'text/css';

   // orig. color: E8EEF7
   hoveredMailStyleCode = "tr.rr:hover, tr.ur:hover { background-color:" + bgColorHover + "; }";
   hoveredMailStyleNode.innerHTML = hoveredMailStyleCode;
   headTag.appendChild(hoveredMailStyleNode);
} 

// Makes email body wider
if (isWiderEmailBody == 1) {
    if (document.getElementById("fic") != null)
        document.getElementById("fic").style.width="100%";
}

// Display storage use in left menu
if (isUseInMenu == 1) {
    footer = document.getElementById('ft');
    if( !footer ) return false;
    stringFooter = footer.innerHTML;
    stringFooter = stringFooter.slice(stringFooter.indexOf('<div class="fq"') + 15);
    stringFooter = stringFooter.slice(stringFooter.indexOf('>') + 1, stringFooter.indexOf('</div>'));
    stringFooter = stringFooter.slice(stringFooter.indexOf(' M') - 5);
    stringFooter = stringFooter.slice(stringFooter.indexOf(' ') + 1);

    stringUsedMB = stringFooter.slice(0, stringFooter.indexOf('('));
    stringUsedPercent = stringFooter.slice(stringFooter.indexOf('(') + 1, stringFooter.indexOf('%') + 1);

    stringFooter2 = stringFooter.slice(stringFooter.indexOf(')') + 1);
    stringFooter2 = stringFooter2.slice(stringFooter2.indexOf(' M') - 6);
    stringFooter2 = stringFooter2.slice(stringFooter2.indexOf(' ') + 1)
    stringTotalMB = stringFooter2.slice(0, stringFooter2.indexOf('.'));

    newElement = document.createElement('div');
    newElement.innerHTML = '<div class="nl" style="color:#0000CC;">' + stringUsedMB
				+ ' / ' + stringTotalMB + '<br />(' + stringUsedPercent + ')</div></div>';
    document.getElementById('nb_2').parentNode.insertBefore(newElement, document.getElementById('nb_2').previousSibling);
}
// End of previous version of Gmail
