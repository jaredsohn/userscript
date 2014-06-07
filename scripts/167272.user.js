// ==UserScript==
// @name       Dick.net
// @namespace  http://*.dick.net/*
// @version    1.02
// @description  Give quick keys and other cool capabilities on Dick.net
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
           leftArrow:37, upArrow:38, rightArrow:39, downArrow:40, npzero: 96, zero:48, npone:97, one:49,
           nptwo:98, two:50, npthree:99, three:51, npfour:100, four:52, npfive:101, five:53, npsix:102, six:54,
		   npseven:103, seven:55, npeight:104, eight:56, npnine:105, nine:57, a:65, b:66, c:67,
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
    } else if (pagePathName.indexOf('/ratearod/') == 0) {
        pageType = "RateARodView";
        pageObject = RateARodView;
    } else if (pagePathName.indexOf('/') == 0 && pagePathName != '/' && pagePathName.match(/\//g).length == 1) {
    	//ASSUMES IT IS ON A PROFILE PAGE
        pageType = "ProfileView";
        pageObject = ProfileView;
    }
}

var GalleryImageView = {
    ProfileEl: null,
    GalleryEl: null,
    VideosEl: null,
    FriendsEl: null,
    PrevPicEl: null,
    NextPicEl: null,
    PrevPicKey: "<< prev pic",
    NextPicKey: "next pic >>",
    Init: function () {
        this.FindImageNavigationLinks();
        this.FindMenuItems();
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
					var newCommentEl = $("#new_comment_blank");
					var beTheFirstCommentEl = $("textarea");
					
					if (newCommentEl.length > 0) {
						newCommentEl.click().focus();
					} else if (beTheFirstCommentEl.length > 0) {
						beTheFirstCommentEl[0].click().focus();
					}
                    break;
                case KEY.p:
                    window.location = GalleryImageView.ProfileEl.href;
                    break;
                case KEY.v:
                    window.location = GalleryImageView.VideosEl.href;
                    break;
                case KEY.f:
                    window.location = GalleryImageView.FriendsEl.href;
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
    },
    FindMenuItems: function () {
        var menuItems = $(".item");
        var menuItemsLength = menuItems.length;
        
        for (var i = 0; i < menuItemsLength; i++) {
            var menuItemAnchor = menuItems[i].firstElementChild;
        	var menuItemText = menuItemAnchor.text;  
            
            switch (menuItemText.toLowerCase()) {
                case "gallery":
                    this.GalleryEl = menuItemAnchor;
                    break;
                case "videos":
                    this.VideosEl = menuItemAnchor;
                    break;
                case "friends":
                    this.FriendsEl = menuItemAnchor;
                    break;
                case "profile":
                    this.ProfileEl = menuItemAnchor;
                    break;
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

var RateARodView = {
    ViewProfileEl: null,
    ViewGalleryEl: null,
	RatingElements: $("input[name='rating']"),
    Init: function () {
        this.GetObjects();
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
                    var newCommentEl = $("#new_comment_blank");
					var beTheFirstCommentEl = $("textarea");
					
					if (newCommentEl.length > 0) {
						newCommentEl.click().focus();
					} else if (beTheFirstCommentEl.length > 0) {
						beTheFirstCommentEl[0].click().focus();
					}
                    break;
                case KEY.p:
                    window.open(RateARodView.ViewProfileEl.href, "_blank");
                    break;
                case KEY.g:
                    window.open(RateARodView.ViewGalleryEl.href, "_blank");
                    break;
				case KEY.npzero:
                case KEY.zero:
                    RateARodView.RatingElements[9].click();
                    break;
                case KEY.one:
				case KEY.npone:
                    RateARodView.RatingElements[0].click();
                    break;
				case KEY.nptwo:
                case KEY.two:
                    RateARodView.RatingElements[1].click();
                    break;
				case KEY.npthree:
                case KEY.three:
                    RateARodView.RatingElements[2].click();
                    break;
				case KEY.npfour:
                case KEY.four:
                    RateARodView.RatingElements[3].click();
                    break;
				case KEY.npfive:
                case KEY.five:
                    RateARodView.RatingElements[4].click();
                    break;
				case KEY.npsix:
                case KEY.six:
                    RateARodView.RatingElements[5].click();
                    break;
				case KEY.npseven:
                case KEY.seven:
                    RateARodView.RatingElements[6].click();
                    break;
				case KEY.npeight:
                case KEY.eight:
                    RateARodView.RatingElements[7].click();
                    break;
				case KEY.npnine:
                case KEY.nine:
                    RateARodView.RatingElements[8].click();
                    break;
				case KEY.rightArrow:
					window.location = $("img[src='file/style/konsort/button_fw.gif']")[0].parentNode.href;
					break;
            }
        }
    },
    GetObjects: function () {
        var objects = $(".mainmenu6");
        var objectsLength = objects.length;
        
        for (var i = 0; i < objectsLength; i++) {
        	var child = objects[i].children[0];
            var childText = child.text;
            
            if (childText == "VIEW PROFILE") {
            	this.ViewProfileEl = child;   
            } else if (childText == "VIEW GALLERY") {
            	this.ViewGalleryEl = child;   
            }
        }
    }
};

var ProfileView = {
    SendMessageEl: null,
    AddToFriendsEl: null,
    AddToFavoritesEl: null,
    GalleryEl: null,
    VideosEl: null,
    FriendsEl: null,
    Init: function () {
        this.GetMenuObjects();
        this.FindMenuItems();
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
                    var newCommentEl = $("#new_comment_blank");
					var beTheFirstCommentEl = $("textarea");
					
					if (newCommentEl.length > 0) {
						newCommentEl.click().focus();
					} else if (beTheFirstCommentEl.length > 0) {
						beTheFirstCommentEl[0].click().focus();
					}
                    break;
                case KEY.g:
                    window.location = ProfileView.GalleryEl.href;
                    break;
                case KEY.v:
                    window.location = ProfileView.VideosEl.href;
                    break;
                case KEY.m:
                    ProfileView.SendMessageEl.click();
                    break;
                case KEY.a:
                    ProfileView.AddToFriendsEl.click();
                    break;
                case KEY.f:
                    ProfileView.AddToFavoritesEl.click();
                    break;
            }
        }
    },
    GetMenuObjects: function () {
    	var menuObjects = $(".menu");
        var menuObjectsLength = menuObjects.length;
        
        for (var i = 0; i < menuObjectsLength; i++) {
        	var child = menuObjects[i].children[0];
            var childText = child.text;
            
            switch (childText.toLowerCase()) {
                case "send message":
                    ProfileView.SendMessageEl = child;
                    break;
                case "add to friends":
                    ProfileView.AddToFriendsEl = child;
                    break;
                case "add to favorites":
                    ProfileView.AddToFavoritesEl = child;
                    break;
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
                case "gallery":
                    this.GalleryEl = menuItemAnchor;
                    break;
                case "videos":
                    this.VideosEl = menuItemAnchor;
                    break;
                case "friends":
                    this.FriendsEl = menuItemAnchor;
                    break;
            }
        }
    }
};