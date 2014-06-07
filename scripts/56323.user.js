// ==UserScript==
// @name           Better Faceparty
// @namespace      nucleoso.me.uk
// @description    Makes Faceparty work better.
// @include        http://www.faceparty.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

// version 0.1
// -----------
// Sets limits on the gossip text boxes, so you can't enter text that is too long.
//
// version 0.2
// -----------
// Creates rollovers for each image in a gallery
//
// version 0.3
// -----------
// Image rollovers where-ever the thumbnail image is, not just on gallery pages.
//
// version 0.4
// ------------
// Avatar rollovers.
//
// version 0.5
// ------------
// Private Content etc. rollovers now work (td background, rather than img)
//
// version 0.6
// -----------
// Fixed problems with replacing Party Chat links.
//
// version 0.7
// -----------
// Spamming!

//Add some prototypes
String.prototype.startsWith = function(t, i) { if (i==false) { return
(t == this.substring(0, t.length)); } else { return (t.toLowerCase()
== this.substring(0, t.length).toLowerCase()); } } 




var VISIBLE_PEST_LIST_KEY = "VisiblePestList";


var VISIBLE_PEST_LIST_DEFAULT_VALUE = true;



var PestListIsVisible = GM_getValue(VISIBLE_PEST_LIST_KEY);
if (PestListIsVisible === undefined) {
    PestListIsVisible = VISIBLE_PEST_LIST_DEFAULT_VALUE;
    GM_setValue(VISIBLE_PEST_LIST_KEY, PestListIsVisible);
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


var DoSomethingWithFoundUserId = function(username, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.faceparty.com/browse/results.aspx?keywords=' + username ,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html'
        },
        onload: function(responseDetails) {
            //  /TD/FONT/B/text()    
            var doc = document.createElement('div');
            doc.innerHTML = responseDetails.responseText;
            var desiredHref = "/" + username + "?keywords=" + username;
            var xpathExpression = "//A[@href='" + desiredHref + "'][@target='_blank']";
            var results = document.evaluate(xpathExpression, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var pcs = results.snapshotLength;
            if (pcs) {
               for (var i = 0; i < pcs; i++) {
                    //Should really just be one of these...
                    var idnode = results.snapshotItem(i).nextSibling.nextSibling;
                    var mangledid = idnode.id;
                    var id = mangledid.substring(2);
                    callback(id);
                }
            }
        }
    });
}


var AddUserToPestList = function(username) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.faceparty.com/' + username + '?action=add_pest',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html'
        },
        onload: function(responseDetails) {
            // Should probably do some checking of stuff here.
            // Was the user added correctly, etc.
        }
    });
};




var RemoveUserFromPestList = function(userid) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.faceparty.com/account/pest_list.aspx?action=remove_pest&bid=' + userid,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html'
        },
        onload: function(responseDetails) {
            // Should probably do some checking of stuff here.
            // Was the user added correctly, etc.
        }
    });
};




var ForEachPest = function(myfunction) {
    var req = GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.faceparty.com/account/pest_list.aspx',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/html'
        },
        onload: function(responseDetails) {
            //  /TD/FONT/B/text()    
            var doc = document.createElement('div');
            doc.innerHTML = responseDetails.responseText;
            var xpathExpression = "//TD[@width=450]/FONT/B"; // This should just match the Pest names
            var results = document.evaluate(xpathExpression, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            var pcs = results.snapshotLength;
            if (pcs) {
               for (var i = 0; i < pcs; i++) {
                    //alert(results.snapshotItem(i).textContent);
                    //alert(myfunction);
                    myfunction(results.snapshotItem(i).textContent);
                }
            }
        },
        onerror: function(responseDetails) {
        }
    });
};



var AddRow = function(table, username) {
    //check to see if already in list.
    var mylistitem = document.createElement('tr');
    var namecell = document.createElement('td');
    var countcell = document.createElement('td');
    var showhidecell = document.createElement('td');
    var removefromlistcell = document.createElement('td');

    mylistitem.appendChild(namecell);
    mylistitem.appendChild(countcell);
    mylistitem.appendChild(showhidecell);
    mylistitem.appendChild(removefromlistcell);



    // comments 
    var commentsXPATH = '//table/tbody/tr/td/div/a[@href="/' + username + '"]';
    var threadXPATH   = '//table/tbody/tr/td/a[@href="/' + username + '"]';

    var thisdiv;

    var allCommentElements = document.evaluate(
        commentsXPATH,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

    var allPostElements = document.evaluate(
        threadXPATH,
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);


    mylistitem.postedthreads= [];
    mylistitem.postedcomments = [];
    
    for (var i = 0; i < allCommentElements.snapshotLength; i++) {
        thisDiv = allCommentElements.snapshotItem(i);
        mylistitem.postedcomments[mylistitem.postedcomments.length] = thisDiv.parentNode.parentNode.parentNode.parentNode.parentNode;
    }

    for (i = 0; i < allPostElements.snapshotLength; i++) {
        thisDiv = allPostElements.snapshotItem(i);
        mylistitem.postedthreads[mylistitem.postedthreads.length] = thisDiv.parentNode.parentNode;
    }

    var clicktotoggle = document.createElement('a');
    var clicktotoggleimage = document.createElement('img');
    clicktotoggle.appendChild(clicktotoggleimage);
    

    mylistitem.HideItems = function() {
        mylistitem.shown = false;
        clicktotoggleimage.setAttribute("src", "http://www.faceparty.com/im/ps_bg.gif");
        for (var i = 0; i < mylistitem.postedcomments.length; i++) {
            mylistitem.postedcomments[i].style.display = 'none';  
        }      
        for (var j = 0; j < mylistitem.postedthreads.length; j++) {
            mylistitem.postedthreads[j].style.display = 'none';  
        }      
    };

    mylistitem.ShowItems = function() {
        mylistitem.shown = true;
        clicktotoggleimage.setAttribute("src", "http://www.faceparty.com/im/ps_b.gif");
        for (var i = 0; i < mylistitem.postedcomments.length; i++) {
            mylistitem.postedcomments[i].style.display = '';  
        } 

        for (var j = 0; j < mylistitem.postedthreads.length; j++) {
            mylistitem.postedthreads[j].style.display = '';  
        } 
    };



    mylistitem.ToggleVisible = function() {
        if (mylistitem.shown) {
            mylistitem.HideItems();        
        } else {
            mylistitem.ShowItems();        
        }
    };

    countcell.innerHTML = mylistitem.postedthreads.length + mylistitem.postedcomments.length;


    DoSomethingWithFoundUserId(username, function(pid) {
        var clicktoremove = document.createElement('a');
        clicktoremove.setAttribute("a", "#");
        var clicktoremoveimage = document.createElement('img');
        clicktoremoveimage.setAttribute("src", "http://www.faceparty.com/im/ps_g.gif");
        clicktoremove.appendChild(clicktoremoveimage);
        removefromlistcell.appendChild(clicktoremove);

        clicktoremove.addEventListener('click', function() {
            mylistitem.ShowItems();
            RemoveUserFromPestList(pid); // Need to pass the ID, not the Username
            table.removeChild(mylistitem);
        }, false);

    });
    



    clicktotoggle.setAttribute("a", "#");
    showhidecell.appendChild(clicktotoggle);
    
    clicktotoggle.addEventListener('click', function() {
        mylistitem.ToggleVisible();
    }, false);

    namecell.innerHTML = username;
    namecell.title = username;
    namecell.setAttribute("style", "width: 95px; max-width:95px; overflow: hidden;");
    mylistitem.HideItems();
    table.appendChild(mylistitem);
};





var DisplayPestList = function() {
    //Find div#csc
    //after it put in a new div containing a list of the user list.
    var cscnode = document.getElementById('csc');

    var mylistnode = document.createElement('div');
    mylistnode.id = 'BCP-UserNameContainer';

    var mytable = document.createElement('table');
    mytable.id = 'BCP-UserListTable';
    mytable.shown = PestListIsVisible;
    mytable.AddPestRow = function(PestName) {
        AddRow(mytable, PestName);    
    };


    if (PestListIsVisible) {    
        mytable.setAttribute('style', 'display:block');
    } else {
        mytable.setAttribute('style', 'display:none');
    }

    //Allow new additions
    var mylistitem = document.createElement('tr');
    mylistitem.setAttribute('id', 'BCP-AddNewChumpRow');
    var namecell = document.createElement('td');
    var countcell = document.createElement('td');
    var showhidecell = document.createElement('td');
    var removefromlistcell = document.createElement('td');

    mylistitem.appendChild(namecell);
    mylistitem.appendChild(countcell);
    mylistitem.appendChild(showhidecell);
    mylistitem.appendChild(removefromlistcell);

    var nameinput = document.createElement('input');
    nameinput.setAttribute('type', 'text');
    nameinput.setAttribute('id', 'BCP-NewChump');
    nameinput.setAttribute('style', "width: 85px");
    namecell.appendChild(nameinput);
    
    nameinput.AddToList =  function() {
        var userlist = nameinput.value.split(" ");
        for (var j = 0; j < userlist.length; j++) {
            if ((typeof userlist[j]) == "string" && (userlist[j] !== "")) {
                AddUserToPestList(userlist[j]);
                mytable.AddPestRow(userlist[j]);
            }
        }
        nameinput.value = "";
    };

    nameinput.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) { nameinput.AddToList(); }
    }, false);

    
    var clicktoadd = document.createElement('a');
    clicktoadd.setAttribute("a", "#");
    var clicktoaddimage = document.createElement('img');
    clicktoaddimage.setAttribute("src", "http://www.faceparty.com/im/ps_f.gif");
    clicktoadd.appendChild(clicktoaddimage);
    clicktoadd.addEventListener('click', function() {nameinput.AddToList();}, false);


    removefromlistcell.appendChild(clicktoadd);
    mytable.appendChild(mylistitem);
    
    ForEachPest(mytable.AddPestRow);
    //ForEachPest(alert);

    mylistnode.appendChild(mytable);

    mylistnode.setAttribute("style","position: fixed; top: 0pt;border-right: solid 1px rgb(153,153,153);border-bottom: solid 1px rgb(153,153,153); background: rgb(238,238,238); color: rgb(102,102,102); font-size: 8pt; -moz-border-radius-bottomright: 7px; -webkit-border-bottom-right-radius: 7px; width:150px; font-family: Arial;");
    cscnode.parentNode.insertBefore(mylistnode, cscnode.nextSibling);

    var drawerSection = document.createElement("div");
    drawerSection.setAttribute("style", "background: rgb(230,230,230); -moz-border-radius-bottomright: 7px; -webkit-border-bottom-right-radius: 7px; padding: 2px 2px 2px 2px;");
    drawerSection.innerHTML = "Pest List";
    drawerSection.addEventListener('click', function() {
        if (mytable.shown === false) {
            GM_setValue(VISIBLE_PEST_LIST_KEY, true);
            mytable.shown = true;
            mytable.setAttribute("style", "display:block");
        } else {
            GM_setValue(VISIBLE_PEST_LIST_KEY, false);
            mytable.shown = false;
            mytable.setAttribute("style", "display:none");
        }    
    } , false); 

    mylistnode.appendChild(drawerSection);
};

var SetupSpammingInThread = function() {
    //Find Post Reply button
    var xpathExpression = "//INPUT[@name='addPost']";
    var results = document.evaluate(xpathExpression, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < results.snapshotLength; i++) {
        var replyButton = results.snapshotItem(i);
        
        var table = replyButton;
        while (table.nodeName != "TABLE") {
            table = table.parentNode;        
        }        

        //Add a new row with a Spam button, and an input for how many times
        var newRow = document.createElement("TR");
        var newCell  = document.createElement("TD");
        var newButton = document.createElement("A");
        var newInput = document.createElement("INPUT");

        newButton.innerHTML = "SPAM!"
        //Add a handler for the spam button which clones the Form the 
        //appropriate number of times, and submits them all. 
        newButton.href="#";
        newButton.addEventListener('click', function(e) {
            var howMany = parseInt(newInput.value, 10);
            var whattopost = table.firstChild.firstChild.firstChild.firstChild.value;
            if (isNaN(howMany)) {
                howMany = 1;
            }
            for (var i=0; i < howMany; i++) {
                //alert(whattopost);
                $.post(document.URL, {action:"addPost", txtPost:whattopost});
            }
        }, false);

        newCell.colSpan = '2';
        
        newCell.appendChild(newInput);
        newCell.appendChild(newButton);
        newRow.appendChild(newCell);
        table.appendChild(newRow);

    }

}

var SetupNewThreadTextBoxLimits = function() {
 
    $("input[name=topTitle]").attr("maxlength", "50");
    $("textarea[name=topSum]").attr("maxlength", "2000").bind("keypress", function(e) {
        return this.value.length < parseInt($(this).attr('maxlength'));
    });
    $("input[name=topTags]").attr("maxlength", "200");
    
}

var SetupExistingThreadTextBoxLimits = function() {
    $("textarea[name=txtPost]").attr("maxlength", "2000").bind("keypress", function(e) {
        return this.value.length < parseInt($(this).attr('maxlength'));
    });
    
}

var SetupInPagePostLoading = function() {
    var items = $("div[class=frmPaging]");
    if (items.length == 0) {
        // No need to do anything as there is no paging
    } else {
        // Remap the paging controls to load the data into the page as requested.
               
    }
}

var FindLargeVersion = function(smallImageUrl, stringToReplace) {	
    smallImageUrl = smallImageUrl.replace(stringToReplace, "/pb/");	
    var parts = smallImageUrl.split("/");
    parts[parts.length] = parts[parts.length - 1];
    parts[parts.length - 2] = "images";
    return parts.join("/");

}

var CreateImageTooltip = function(imageUrl) {
    var tooltip = document.createElement("div");
    var image = document.createElement("img");
    image.setAttribute("src", imageUrl);
    tooltip.appendChild(image);
    return tooltip;
}

var SetupThumbnailHoverShowsFullImage = function() {
    $("img[src^=http://images.faceparty.com/pb/tn/]").each(function() {
        var link = this;
        var tooltip = CreateImageTooltip(FindLargeVersion(link.getAttribute("src"), "/pb/tn/"));
        tooltip.style.display = 'none';
        tooltip.style.position = 'fixed';
        document.body.appendChild(tooltip);    
        link.addEventListener('mouseover', function(e) {
            //show the tip
            tooltip.style.display = 'block';
            tooltip.className = "Popup" + (e.pageX>document.body.clientWidth/2 ? 'Left' : 'Right');
        }, false);
        link.addEventListener('mouseout', function() {
            //hide the tip    
            tooltip.style.display = 'none';   
        }, false);

    });

    $("td[background^=http://images.faceparty.com/pb/tn/]").each(function() {
        var link = this;
        var tooltip = CreateImageTooltip(FindLargeVersion(link.getAttribute("background"), "/pb/tn/"));
        tooltip.style.display = 'none';
        tooltip.style.position = 'fixed';
        document.body.appendChild(tooltip);    
        link.addEventListener('mouseover', function(e) {
            //show the tip
            tooltip.style.display = 'block';
            tooltip.className = "Popup" + (e.pageX>document.body.clientWidth/2 ? 'Left' : 'Right');
        }, false);
        link.addEventListener('mouseout', function() {
            //hide the tip    
            tooltip.style.display = 'none';   
        }, false);

    });
		
}

var SetupAvatarHoverShowsFullImage = function() {
    $("img[src^=http://images.faceparty.com/mi/]").each(function() {	
        var link = this;
        var tooltip = CreateImageTooltip(FindLargeVersion(link.getAttribute("src"), "/mi/"));
        tooltip.style.display = 'none';
        tooltip.style.position = 'fixed';
        document.body.appendChild(tooltip);    
        link.addEventListener('mouseover', function(e) {
            //show the tip
            tooltip.style.display = 'block';
            tooltip.className = "Popup" + (e.pageX>document.body.clientWidth/2 ? 'Left' : 'Right');
        }, false);
        link.addEventListener('mouseout', function() {
            //hide the tip    
            tooltip.style.display = 'none';   
        }, false);

    });
    $("img[src^=http://images.faceparty.com/mn/]").each(function() {	
        var link = this;
        var tooltip = CreateImageTooltip(FindLargeVersion(link.getAttribute("src"), "/mn/"));
        tooltip.style.display = 'none';
        tooltip.style.position = 'fixed';
        document.body.appendChild(tooltip);    
        link.addEventListener('mouseover', function(e) {
            //show the tip
            tooltip.style.display = 'block';
            tooltip.className = "Popup" + (e.pageX>document.body.clientWidth/2 ? 'Left' : 'Right');
        }, false);
        link.addEventListener('mouseout', function() {
            //hide the tip    
            tooltip.style.display = 'none';   
        }, false);

    });

}

var MakePartyChatLinkToANormalLink = function() {
    $("a[href^=javascript]").each(function() {
        if ($(this).html() == '"Party Chat"') {
            this.href = "/chat/party_chat.aspx";
            this.setAttribute("target", "_blank");
        }
    });
}


addGlobalStyle('' +
	'.PopupLeft { left:2px !important; top:2px; z-index: 1000; }'+

	'.PopupRight { right:2px !important; top:2px; z-index: 1000;  }' );




if (window.location.href.startsWith("http://www.faceparty.com/gossip")) {
    //DisplayPestList();
}

if (window.location.href.startsWith("http://www.faceparty.com/gossip/thread.aspx?topic=")) {
    SetupExistingThreadTextBoxLimits();
    SetupInPagePostLoading();
    SetupSpammingInThread();
}   

if (window.location.href.startsWith("http://www.faceparty.com/gossip/addtopic.aspx")) {
    SetupNewThreadTextBoxLimits();
} 

SetupThumbnailHoverShowsFullImage();  
SetupAvatarHoverShowsFullImage();
MakePartyChatLinkToANormalLink();