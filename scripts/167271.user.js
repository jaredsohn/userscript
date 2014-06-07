// ==UserScript==
// @name       .net
// @namespace  http://*.dick.net/*
// @version    0.1
// @description  Customisation for Dick.net
// @match      http://*.dick.net/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @copyright  2013
// ==/UserScript==

//GLOBAL VARIABLES
var pageType = null;
var pageObject = null;
var shiftKeyIsDown = false;
var KEY = { 
    	   backspace:8, tab:9, enter:13, shift:16, ctrl:17, alt:18, esc:27,
           leftArrow:37, upArrow:38, rightArrow:39, downArrow:40, 0:48, 1:49,
           2:50, 3:51, 4:52, 5:53, 6:54, 7:55, 8:56, 9:57, a:65, b:66, c:67,
           d:68, e:69, f:70, g:71, h:72, i:73, j:74, k:75, l:76, m:77, n:78,
           o:79, p:80, q:81, r:82, s:83, t:84, u:85, v:86, w:87, x:88, y:89, 
    	   z:90, home:36
          };
var documentKeyDown = function (e) {
    if (e.keyCode == KEY.shift) {
    	shiftKeyIsDown = true;
    }
};

//When page has loaded
$(document).ready(function () {
    document.onkeydown = documentKeyDown;
    detectPageType();
    
    if (pageObject) {
    	pageObject.Init();   
    }
});

function detectPageType() {
 	var pagePathName = window.location.pathname;
    
    if (pagePathName.indexOf('/user/gallery/view') == 0) {
    	pageType = "GalleryImageView";
        pageObject = GalleryImageView;
    } else if (pagePathName.indexOf('/account/') == 0) {
        pageType = "AccountView";
        pageObject = AccountView;
    }
}

var GalleryImageView = {
    PrevPicEl: null,
    NextPicEl: null,
    PrevPicKey: "<< prev pic",
    NextPicKey: "next pic >>",
    Init: function () {
        this.FindImageNavigationLinks();
        this.BindKeys();
    },
    BindKeys: function () {
        document.onkeyup = function (e) {
            var keyCode = e.keyCode;
            
            if ($("input:focus, textarea:focus").length > 0 || keyCode == KEY.shift || shiftKeyIsDown == true) {
                if (keyCode == KEY.shift) {
                	shiftKeyIsDown = false;   
                }
            	return;    
            }
            
            switch (keyCode) {
                case KEY.c:
                    $("#new_comment_blank").click().focus();
                    break;
                case KEY.rightArrow:
                    if (GalleryImageView.NextPicEl) {
                        window.location = GalleryImageView.NextPicEl.href;
                    }
                    break;
                case KEY.leftArrow:
                    if (GalleryImageView.PrevPicEl) {
                        window.location = GalleryImageView.PrevPicEl.href;
                    }
                    break;
            }
        }
    },
    FindImageNavigationLinks: function () {
        var allLinks = $('a');
        var allLinksLength = allLinks.length;
        
        for (var i = 0; i < allLinksLength; i++) {
            var currentLinkText = allLinks[i].text;
            
            if (currentLinkText.toLowerCase() == this.NextPicKey) {
                this.NextPicEl = allLinks[i];
            } else if (currentLinkText.toLowerCase() == this.PrevPicKey) {
                this.PrevPicEl = allLinks[i];
            }
        }
    }
};

var AccountView = {
    MI_MainEl: null,
    MI_MyPageEl: null,
    MI_StatsEl: null,
    MI_SettingsEl: null,
    MI_SubmitEl: null,
    MI_ItemsEl: null,
    MI_MessagesEl: null,
    MI_FriendsEl: null,
    MI_FavsEl: null,
    MI_BulletinsEl: null,
    MI_InviteEl: null,
    MI_VIPEl: null,
    Init: function () {
        this.FindMenuItems();
        this.BindKeys();
    },
    BindKeys: function () {
        document.onkeyup = function (e) {
            var keyCode = e.keyCode;
            
            if ($("input:focus, textarea:focus").length > 0) {
            	return;    
            }
            
            if (keyCode == KEY.shift) {
            	if (keyCode == KEY.shift) {
            		shiftKeyIsDown = false;   
               	} 
            }
                      
            if (shiftKeyIsDown == false) {
                switch (keyCode) {
                    case KEY.home:
                        if (AccountView.MI_MainEl) {
                        	window.location = AccountView.MI_MainEl.href;
                        }
                        break;
                    case KEY.m:
                        if (AccountView.MI_MyPageEl) {
                        	window.location = AccountView.MI_MyPageEl.href;
                        }
                        break;
                    case KEY.s:
                        if (AccountView.MI_StatsEl) {
                        	window.location = AccountView.MI_StatsEl.href;
                        }
                        break;
                    case KEY.i:
                        if (AccountView.MI_ItemsEl) {
                        	window.location = AccountView.MI_ItemsEl.href;
                        }
                        break;
                    case KEY.f:
                        if (AccountView.MI_FriendsEl) {
                        	window.location = AccountView.MI_FriendsEl.href;
                        }
                        break;
                    case KEY.b:
                        if (AccountView.MI_BulletinsEl) {
                        	window.location = AccountView.MI_BulletinsEl.href;
                        }
                        break;
                    case KEY.v:
                        if (AccountView.MI_VIPEl) {
                        	window.location = AccountView.MI_VIPEl.href;
                        }
                        break;
                }
            } else if (shiftKeyIsDown == true) {
                switch (keyCode) {
                    case KEY.m:
                        if (AccountView.MI_MessagesEl) {
                        	window.location = AccountView.MI_MessagesEl.href;
                        }
                        break;
                    case KEY.s:
                        if (AccountView.MI_SubmitEl) {
                        	window.location = AccountView.MI_SubmitEl.href;
                        }
                        break;
                    case KEY.i:
                        if (AccountView.MI_InviteEl) {
                        	window.location = AccountView.MI_InviteEl.href;
                        }
                        break;
                    case KEY.f:
                        if (AccountView.MI_FavsEl) {
                        	window.location = AccountView.MI_FavsEl.href;
                        }
                        break;
                }
            }
        }
    },
    FindMenuItems: function () {
        var menuItems = $(".item");
        var menuItemsLength = menuItems.length;
        
        for (var i = 0; i < menuItemsLength; i++) {
            var menuItemAnchor = menuItems[i].firstElementChild;
        	var menuItemText = menuItemAnchor.text;  
            
            switch (menuItemText.toLowerCase()) {
                case "main":
                    this.MI_MainEl = menuItemAnchor;
                    break;
                case "my page":
                    this.MI_MyPageEl = menuItemAnchor;
                    break;
                case "stats":
                    this.MI_StatsEl = menuItemAnchor;
                    break;
                case "settings":
                    this.MI_SettingsEl = menuItemAnchor;
                    break;
                case "submit":
                    this.MI_SubmitEl = menuItemAnchor;
                    break;
                case "items":
                    this.MI_ItemsEl = menuItemAnchor;
                    break;
                case "messages":
                    this.MI_MessagesEl = menuItemAnchor;
                    break;
                case "friends":
                    this.MI_FriendsEl = menuItemAnchor;
                    break;
                case "favs":
                    this.MI_FavsEl = menuItemAnchor;
                    break;
                case "bulletins":
                    this.MI_BulletinsEl = menuItemAnchor;
                    break;
                case "invite":
                    this.MI_InviteEl = menuItemAnchor;
                    break;
                case "vip":
                    this.MI_VIPEl = menuItemAnchor;
                    break;
            }
        }
    }
};