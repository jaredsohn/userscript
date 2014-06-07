// ==UserScript==
// @name           MySpace Page Title Fixer (Updated)
// @namespace      http://userscripts.org/people/10583
// @description    Replaces the page titles on Myspace so it actually reflects the page you're viewing. (Last Updated March 23, 2007 - Version 4.4.5)
// @include      http://*.myspace.com*
// ==/UserScript==

/*Original Code By http://userscripts.org/scripts/show/2247 (Abiel Jaquez)
Not All Pages Are On Here (I Know)
Script Is Constantly Being Updated To Support More Pages
NOTICE - It Will Take A While To Get Most Pages
So Update The Script Frequently
If You Find Any Pages Missing From Any Of The Sections Already Here Please Comment The Script At http://userscripts.org/scripts/show/7559


*************
***Notice****
*************

Do NOT Change Anything Unless You Know What You Are Doing

There Are Some Friend Pages In The Home Page Section
Leave Those There Or They Wont Work


Eventually I Will Get Every Page
That Will Take A While To Do
So Be Patient With Me And Update The Script Frequently

If Any Page Is Not Covered And Is Not In Any Of These Sections
Please Do NOT Comment The Script Me Telling Me That I Need To Add Those Pages
I Know I Need Alot Of Pages And Am Working On It

Meaning If I Didn't Get A Forum Page (Since I Have Done The Forum Pages)
You Can Comment The Script To Let Me Know
Since I Didn't Do ANY Classified Pages (Yet) DO NOT Comment The Script
Telling Me I Don't Have The Pages



*************
***Updates***
*************

January 10
Added Blog Pages

January 19
Added Group Pages

February 11
Added Profile
Started Forum Pages

February 12
Completed Forum Pages
Added Friend Pages

February 13
Added User Homepage Section To Be Able To Add Some Friend Pages

February 15
Added Signup To Myspace Pages

Added Group Reply And Preview Pages That I Forgot

*/

(function() {
    var href = new String(document.location);
    
    GM_log("HREF: " + href);
    
    if(href.indexOf("home") != -1) {
       fixHomeTitle();
    } else if (href.indexOf("fuseaction=ad") != -1) {
        document.title = 'MySpace - Ad';
    } else if (href.indexOf("browse") != -1) {
        document.title = 'MySpace - Browse';
    } else if (href.indexOf("blog") != -1) {
        fixBlogTitle();
    } else if (href.indexOf("search") != -1) {
        document.title = 'MySpace - Search';
    } else if (href.indexOf("invite") != -1) {
        document.title = 'MySpace - Invite';
    } else if (href.indexOf("rank") != -1) {
        document.title = 'MySpace - Rank';
    } else if (href.indexOf("mail") != -1) {
        fixMailTitle();
    } else if (href.indexOf("favorites") != -1) {
        document.title = 'MySpace - Favorites';
    }else if (href.indexOf("forum") != -1) {
        fixForumTitle();
    } else if (href.indexOf("groups") != -1) {
        fixGroupTitle();
    } else if (href.indexOf("profile") != -1) {
        fixProEditTitle();
    } else if (href.indexOf("events") != -1) {
        fixEventsTitle();
    } else if (href.indexOf("music") != -1) {
        document.title = 'MySpace - Music';
    } else if (href.indexOf("classifieds") != -1) {
        document.title = 'MySpace - Classifieds';
    } else if (href.indexOf("topartists") != -1) {
        document.title = 'MySpace - Top Artists';
    } else if (href.indexOf("videos") != -1) {
        document.title = 'MySpace - Videos';
    } else if (href.indexOf("signup") != -1) {
        fixSignupTitle();
    } else if (href.indexOf("login") != -1) {
        document.title = 'MySpace - Login';
    } else if (href.indexOf("bulletin") != -1) {
        fixBulletinTitle();
    } else if(href.indexOf("address") != -1) {
        fixADBTitle();
    } else if(href.indexOf("collect") != -1) {
        fixFriendsTitle();
    }
    
    function fixADBTitle() {
        if(href.indexOf("fuseaction=adb&") != -1) {
            document.title = 'MySpace - Address Book - View All';
        } else if (href.indexOf("fuseaction=adb.addContact") != -1) {
            document.title = 'MySpace - Address Book - Add Contact';
        } else if (href.indexOf("fuseaction=adb.manageLists") != -1) {
            document.title = 'MySpace - Address Book - Contact Lists';
        }
    }
    
    function fixBulletinTitle() {
        if(href.indexOf("fuseaction=bulletin.read") != -1) {
            document.title = 'MySpace - Read Bulletin';
        } else if (href.indexOf("fuseaction=bulletin.edit") != -1) {
            document.title = 'MySpace - Bulletin -Post Bulletin';
        } else if (href.indexOf("fuseaction=bulletin.confirm") != -1) {
            document.title = 'MySpace - Bulletin - Confirm Post';
        } else if (href.indexOf("fuseaction=bulletin&") != -1) {
            document.title = 'MySpace - Bulletins';
        } else if (href.indexOf("fuseaction=bulletin.ShowMyBulletins") != -1) {
            document.title = 'MySpace - Bulletins I\'ve Posted';
        } else if (href.indexOf("fuseaction=bulletin.deleted") != -1) {
            document.title = 'MySpace - Bulletin(s) Have Been Deleted';
        }
    }
    
    function fixMailTitle() {
        if(href.indexOf("fuseaction=mail.message&friendID=") != -1) {
            document.title = 'MySpace - Compose Message';
        } else if (href.indexOf("fuseaction=mail.messagesent") != -1) {
            document.title = 'MySpace - Message Sent';
        } else if (href.indexOf("fuseaction=mail.inbox") != -1) {
            document.title = 'MySpace - Mail - Inbox';
        } else if (href.indexOf("fuseaction=mail.readmessage") != -1) {
            document.title = 'MySpace - Mail - Read Message';
        } else if (href.indexOf("fuseaction=mail.reply") != -1) {
            document.title = 'MySpace - Mail - Reply';
        } else if (href.indexOf("fuseaction=mail.sentbox") != -1) {
            document.title = 'MySpace - Mail - Sent Messages';
        } else if (href.indexOf("fuseaction=mail.trashbox") != -1) {
            document.title = 'MySpace - Mail - Trash';
        } else if (href.indexOf("fuseaction=mail.friendRequests") != -1) {
            document.title = 'MySpace - Friend Requests';
        } else if (href.indexOf("fuseaction=mail.pendingFriendRequests") != -1) {
            document.title = 'MySpace - Pending Friend Requests';
        } else if (href.indexOf("fuseaction=mail.EventInvite") != -1) {
            document.title = 'MySpace - Mail - Event Invites';
        } else if (href.indexOf("fuseaction=mail.savebox") != -1) {
            document.title = 'MySpace - Mail - Saved Messages';
        }
    }
    
    function fixBlogTitle() {
        if(href.indexOf("fuseaction=blog.ListAll&friendID=") != -1) {
            document.title = 'MySpace - Blog - My Blog Posts';
        } else if (href.indexOf("fuseaction=blog.controlcenter") != -1) {
            document.title = 'MySpace - Blog - Manage Blogs';
        } else if (href.indexOf("fuseaction=blog.create") != -1) {
            document.title = 'MySpace - Blog - Post A Blog';
        } else if (href.indexOf("fuseaction=blog.previewBlog") != -1) {
            document.title = 'MySpace - Blog - Preview Blog';
        } else if (href.indexOf("fuseaction=blog.customize") != -1) {
            document.title = 'MySpace - Blog - Customize My Blog';
        } else if (href.indexOf("fuseaction=blog.mysubscriptions") != -1) {
            document.title = 'MySpace - Blog - My Blog Subscriptions';
        } else if (href.indexOf("fuseaction=blog.mysubscribers") != -1) {
            document.title = 'MySpace - Blog - My Blog Readers';
        } else if (href.indexOf("fuseaction=blog.myPrivateList") != -1) {
            document.title = 'MySpace - Blog - My Preferred List';
        } else if (href.indexOf("fuseaction=blog.addToPrivateList") != -1) {
            document.title = 'MySpace - Blog - Add User To Preferred List';
        } else if (href.indexOf("fuseaction=blog.ConfirmSubscribe") != -1) {
            document.title = 'MySpace - Blog - Subscribe To Blog';
        }
    }
    
    function fixGroupTitle() {
        if(href.indexOf("fuseaction=groups.categories&z=1") != -1) {
            document.title = 'MySpace - Groups - Group Home';
        } else if (href.indexOf("fuseaction=groups.privacy") != -1) {
            document.title = 'MySpace - Groups - Group Privacy';
        } else if (href.indexOf("fuseaction=groups.groupProfile") != -1) {
            document.title = 'MySpace - Group Profile';
        } else if (href.indexOf("fuseaction=groups.groupBulletins") != -1) {
            document.title = 'MySpace - Groups - View Group Bulletins';
        } else if (href.indexOf("fuseaction=messageboard.viewcategory&groupID=") != -1) {
            document.title = 'MySpace - Groups - View Group Topics';
        } else if (href.indexOf("fuseaction=groups.groupImages") != -1) {
            document.title = 'MySpace - Groups - View Group Images';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&groupID=") != -1) {
            document.title = 'MySpace - Groups - Post Topic';
        } else if (href.indexOf("fuseaction=groups.resign") != -1) {
            document.title = 'MySpace - Groups - Resign From Group';
        } else if (href.indexOf("fuseaction=groups.groupInvite") != -1) {
            document.title = 'MySpace - Groups - Invite To Group';
        } else if (href.indexOf("fuseaction=groups.categories&advSearch=1") != -1) {
            document.title = 'MySpace - Groups - Search Groups';
        } else if (href.indexOf("fuseaction=Groups.createGroup") != -1) {
            document.title = 'MySpace - Groups - Create Group';
        } else if (href.indexOf("fuseaction=groups.myGroups") != -1) {
            document.title = 'MySpace - Groups - My Groups';
        } else if (href.indexOf("fuseaction=groups.categories") != -1) {
            document.title = 'MySpace - Groups - Group Home';
        } else if (href.indexOf("fuseaction=messageboard.posted&groupID=") != -1) {
            document.title = 'MySpace - Groups - Topic - Replied';
        } else if (href.indexOf("fuseaction=messageBoard.previewReply&categoryID=0&groupID=") != -1) {
            document.title = 'MySpace - Groups - Topic - Preview Reply';
        }
    }
    
    function fixProEditTitle() {
        if(href.indexOf("fuseaction=profile.interests") != -1) {
            document.title = 'MySpace - Edit Profile - Main';
        } else if (href.indexOf("fuseaction=profile.names") != -1) {
            document.title = 'MySpace - Edit Profile - Name';
        } else if (href.indexOf("fuseaction=profile.basic") != -1) {
            document.title = 'MySpace - Edit Profile - Basic Info';
        } else if (href.indexOf("fuseaction=profile.lifestyle") != -1) {
            document.title = 'MySpace - Edit Profile - Background & Lifestyle';
        } else if (href.indexOf("fuseaction=profile.schools") != -1) {
            document.title = 'MySpace - Edit Profile - Schools';
        } else if (href.indexOf("fuseaction=profile.companies") != -1) {
            document.title = 'MySpace - Edit Profile - Companies';
        } else if (href.indexOf("fuseaction=profile.networking") != -1) {
            document.title = 'MySpace - Edit Profile - Network';
        } else if (href.indexOf("fuseaction=profile.editprofilesongs") != -1) {
            document.title = 'MySpace - Edit Profile - Songs and Videos';
        } else if (href.indexOf("fuseaction=profile.username") != -1) {
            document.title = 'MySpace - Pick Unique Myspace Url';
        }
    }
    
    function fixForumTitle() {
        if(href.indexOf("fuseaction=messageboard.categories") != -1) {
            document.title = 'MySpace - Forum - Main';
        } else if (href.indexOf("fuseaction=messageboard.viewThread&entryID=") != -1) {
            document.title = 'MySpace - Forum - View Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=20&") != -1) {
            document.title = 'MySpace - Forum - Automotive - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=95") != -1) {
            document.title = 'MySpace - Forum - Automotive - Domestics';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=95") != -1) {
            document.title = 'MySpace - Forum - Automotive - Domestics - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=96") != -1) {
            document.title = 'MySpace - Forum - Automotive - European';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=96") != -1) {
            document.title = 'MySpace - Forum - Automotive - European - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=22") != -1) {
            document.title = 'MySpace - Forum - Automotive - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=22") != -1) {
            document.title = 'MySpace - Forum - Automotive - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=24") != -1) {
            document.title = 'MySpace - Forum - Automotive - Imports';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=24") != -1) {
            document.title = 'MySpace - Forum - Automotive - Imports - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=23") != -1) {
            document.title = 'MySpace - Forum - Automotive - Racing';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=23") != -1) {
            document.title = 'MySpace - Forum - Automotive - Racing - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=8&") != -1) {
            document.title = 'MySpace - Forum - Business & Entrepreneurs - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=26") != -1) {
            document.title = 'MySpace - Forum - Business & Entrepreneurs - Business';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=26") != -1) {
            document.title = 'MySpace - Forum - Business & Entrepreneurs - Business - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=25") != -1) {
            document.title = 'MySpace - Forum - Business & Entrepreneurs - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=25") != -1) {
            document.title = 'MySpace - Forum - Business & Entrepreneurs - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=27") != -1) {
            document.title = 'MySpace - Forum - Business & Entrepreneurs - Money';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=25") != -1) {
            document.title = 'MySpace - Forum - Business & Entrepreneurs - Money - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=28") != -1) {
            document.title = 'MySpace - Forum - Business & Entrepreneurs - Stocks';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=25") != -1) {
            document.title = 'MySpace - Forum - Business & Entrepreneurs - Stocks - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=12&") != -1) {
            document.title = 'MySpace - Forum - Campus Life - Subcategory';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=29") != -1) {
            document.title = 'MySpace - Forum - Campus Life - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=29") != -1) {
            document.title = 'MySpace - Forum - Campus Life - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=31") != -1) {
            document.title = 'MySpace - Forum - Campus Life - GradSchool';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=31") != -1) {
            document.title = 'MySpace - Forum - Campus Life - GradSchool - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=32") != -1) {
            document.title = 'MySpace - Forum - Campus Life - HighSchool';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=32") != -1) {
            document.title = 'MySpace - Forum - Campus Life - HighSchool - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=30") != -1) {
            document.title = 'MySpace - Forum - Campus Life - Undergrad';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=30") != -1) {
            document.title = 'MySpace - Forum - Campus Life - Undergrad - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=7") != -1) {
            document.title = 'MySpace - Forum - Career Center - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=33") != -1) {
            document.title = 'MySpace - Forum - Career Center - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=33") != -1) {
            document.title = 'MySpace - Forum - Career Center - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=102") != -1) {
            document.title = 'MySpace - Forum - Comedy - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=101") != -1) {
            document.title = 'MySpace - Forum - Comedy - Comedian';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=101") != -1) {
            document.title = 'MySpace - Forum - Comedy - Comedian - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=11&") != -1) {
            document.title = 'MySpace - Forum - Computers & Technology - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=35") != -1) {
            document.title = 'MySpace - Forum - Computers & Technology - Computers';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=35") != -1) {
            document.title = 'MySpace - Forum - Computers & Technology - Computers - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=36") != -1) {
            document.title = 'MySpace - Forum - Computers & Technology - Electronics';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=36") != -1) {
            document.title = 'MySpace - Forum - Computers & Technology - Electronics - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=37") != -1) {
            document.title = 'MySpace - Forum - Computers & Technology - Gadgets';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=37") != -1) {
            document.title = 'MySpace - Forum - Computers & Technology - Gadgets - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=34") != -1) {
            document.title = 'MySpace - Forum - Computers & Technology - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=34") != -1) {
            document.title = 'MySpace - Forum - Computers & Technology - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=9&") != -1) {
            document.title = 'MySpace - Forum - Culture, Arts & Literature - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=39") != -1) {
            document.title = 'MySpace - Forum - Culture, Arts & Literature - Arts';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=39") != -1) {
            document.title = 'MySpace - Forum - Culture, Arts & Literature - Arts - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=41") != -1) {
            document.title = 'MySpace - Forum - Culture, Arts & Literature - CulturalEvents';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=41") != -1) {
            document.title = 'MySpace - Forum - Culture, Arts & Literature - CulturalEvents - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=38") != -1) {
            document.title = 'MySpace - Forum - Culture, Arts & Literature - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=38") != -1) {
            document.title = 'MySpace - Forum - Culture, Arts & Literature - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=40") != -1) {
            document.title = 'MySpace - Forum - Culture, Arts & Literature - Literature';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=40") != -1) {
            document.title = 'MySpace - Forum - Culture, Arts & Literature - Literature - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=97") != -1) {
            document.title = 'MySpace - Forum - Filmmakers - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=98") != -1) {
            document.title = 'MySpace - Forum - Filmmakers - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=98") != -1) {
            document.title = 'MySpace - Forum - Filmmakers - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=13") != -1) {
            document.title = 'MySpace - Forum - Food & Drink - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=42") != -1) {
            document.title = 'MySpace - Forum - Food & Drink - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=42") != -1) {
            document.title = 'MySpace - Forum - Food & Drink - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=43") != -1) {
            document.title = 'MySpace - Forum - Food & Drink - Recipes';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=43") != -1) {
            document.title = 'MySpace - Forum - Food & Drink - Recipes - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=44") != -1) {
            document.title = 'MySpace - Forum - Food & Drink - Restaurants';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=44") != -1) {
            document.title = 'MySpace - Forum - Food & Drink - Restaurants - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=18&") != -1) {
            document.title = 'MySpace - Forum - Games - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=46") != -1) {
            document.title = 'MySpace - Forum - Games - BoardGames';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=46") != -1) {
            document.title = 'MySpace - Forum - Games - BoardGames - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=49") != -1) {
            document.title = 'MySpace - Forum - Games - EverythingElse';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=49") != -1) {
            document.title = 'MySpace - Forum - Games - EverythingElse - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=45") != -1) {
            document.title = 'MySpace - Forum - Games - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=45") != -1) {
            document.title = 'MySpace - Forum - Games - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=48") != -1) {
            document.title = 'MySpace - Forum - Games - RolePlayingGames';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=48") != -1) {
            document.title = 'MySpace - Forum - Games - RolePlayingGames';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=47") != -1) {
            document.title = 'MySpace - Forum - Games - VideoGames';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=47") != -1) {
            document.title = 'MySpace - Forum - Games - VideoGames - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=1&") != -1) {
            document.title = 'MySpace - Forum - General Discussion';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=1&") != -1) {
            document.title = 'MySpace - Forum - General Discussion - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=17&") != -1) {
            document.title = 'MySpace - Forum - Health & Fitness - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=51") != -1) {
            document.title = 'MySpace - Forum - Health & Fitness - Exercise';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=51") != -1) {
            document.title = 'MySpace - Forum - Health & Fitness - Exercise - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=50") != -1) {
            document.title = 'MySpace - Forum - Health & Fitness - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=51") != -1) {
            document.title = 'MySpace - Forum - Health & Fitness - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=52") != -1) {
            document.title = 'MySpace - Forum - Health & Fitness - Nutrition';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=52") != -1) {
            document.title = 'MySpace - Forum - Health & Fitness - Nutrition - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=3&") != -1) {
            document.title = 'MySpace - Forum - Love & Relationships - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=54") != -1) {
            document.title = 'MySpace - Forum - Love & Relationships - BreakUps';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=54") != -1) {
            document.title = 'MySpace - Forum - Love & Relationships - BreakUps - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=55") != -1) {
            document.title = 'MySpace - Forum - Love & Relationships - Dating';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=55") != -1) {
            document.title = 'MySpace - Forum - Love & Relationships - Dating - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=53") != -1) {
            document.title = 'MySpace - Forum - Love & Relationships - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=53") != -1) {
            document.title = 'MySpace - Forum - Love & Relationships - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=56") != -1) {
            document.title = 'MySpace - Forum - Love & Relationships - Relationships';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=56") != -1) {
            document.title = 'MySpace - Forum - Love & Relationships - Relationships - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=5&") != -1) {
            document.title = 'MySpace - Forum - Movies - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=57") != -1) {
            document.title = 'MySpace - Forum - Movies - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=57") != -1) {
            document.title = 'MySpace - Forum - Movies - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=4&") != -1) {
            document.title = 'MySpace - Forum - Music - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=63") != -1) {
            document.title = 'MySpace - Forum - Music - Acoustic';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=63") != -1) {
            document.title = 'MySpace - Forum - Music - Acoustic - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=62") != -1) {
            document.title = 'MySpace - Forum - Music - Alternative';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=62") != -1) {
            document.title = 'MySpace - Forum - Music - Alternative - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=65") != -1) {
            document.title = 'MySpace - Forum - Music - Electronic/Dance';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=65") != -1) {
            document.title = 'MySpace - Forum - Music - Electronic/Dance - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=60") != -1) {
            document.title = 'MySpace - Forum - Music - Emo';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=60") != -1) {
            document.title = 'MySpace - Forum - Music - Emo - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=58") != -1) {
            document.title = 'MySpace - Forum - Music - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=58") != -1) {
            document.title = 'MySpace - Forum - Music - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=66") != -1) {
            document.title = 'MySpace - Forum - Music - Hardcore';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=66") != -1) {
            document.title = 'MySpace - Forum - Music - Hardcore - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=64") != -1) {
            document.title = 'MySpace - Forum - Music - Hip-Hop';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=64") != -1) {
            document.title = 'MySpace - Forum - Music - Hip-Hop - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=100") != -1) {
            document.title = 'MySpace - Forum - Music - Metal';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=100") != -1) {
            document.title = 'MySpace - Forum - Music - Metal - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=59") != -1) {
            document.title = 'MySpace - Forum - Music - Punk';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=59") != -1) {
            document.title = 'MySpace - Forum - Music - Punk - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=61") != -1) {
            document.title = 'MySpace - Forum - Music - Rock';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=59") != -1) {
            document.title = 'MySpace - Forum - Music - Rock - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=2&") != -1) {
            document.title = 'MySpace - Forum - Myspace - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=68") != -1) {
            document.title = 'MySpace - Forum - Myspace - Customizing';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=68") != -1) {
            document.title = 'MySpace - Forum - Myspace - Customizing - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=67") != -1) {
            document.title = 'MySpace - Forum - Myspace - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=67") != -1) {
            document.title = 'MySpace - Forum - Myspace - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=15&") != -1) {
            document.title = 'MySpace - Forum - News & Politics - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=69") != -1) {
            document.title = 'MySpace - Forum - News & Politics - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=69") != -1) {
            document.title = 'MySpace - Forum - News & Politics - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=70") != -1) {
            document.title = 'MySpace - Forum - News & Politics - InternationalNews';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=69") != -1) {
            document.title = 'MySpace - Forum - News & Politics - InternationalNews - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=71") != -1) {
            document.title = 'MySpace - Forum - News & Politics - InternationalPolitics';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=71") != -1) {
            document.title = 'MySpace - Forum - News & Politics - InternationalPolitics - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=72") != -1) {
            document.title = 'MySpace - Forum - News & Politics - USNews';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=71") != -1) {
            document.title = 'MySpace - Forum - News & Politics - USNews - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=73") != -1) {
            document.title = 'MySpace - Forum - News & Politics - USPolitics';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=73") != -1) {
            document.title = 'MySpace - Forum - News & Politics - USPolitics - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=16&") != -1) {
            document.title = 'MySpace - Forum - Religion & Philosophy - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=74") != -1) {
            document.title = 'MySpace - Forum - Religion & Philosophy - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=74") != -1) {
            document.title = 'MySpace - Forum - Religion & Philosophy - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=75") != -1) {
            document.title = 'MySpace - Forum - Religion & Philosophy - Philosophy';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=75") != -1) {
            document.title = 'MySpace - Forum - Religion & Philosophy - Philosophy - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=76") != -1) {
            document.title = 'MySpace - Forum - Religion & Philosophy - Religion';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=76") != -1) {
            document.title = 'MySpace - Forum - Religion & Philosophy - Religion - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=21&") != -1) {
            document.title = 'MySpace - Forum - Science - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=78") != -1) {
            document.title = 'MySpace - Forum - Science - Biology';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=78") != -1) {
            document.title = 'MySpace - Forum - Science - Biology - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=79") != -1) {
            document.title = 'MySpace - Forum - Science - Engineering';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=79") != -1) {
            document.title = 'MySpace - Forum - Science - Engineering - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=77") != -1) {
            document.title = 'MySpace - Forum - Science - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=77") != -1) {
            document.title = 'MySpace - Forum - Science - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=80") != -1) {
            document.title = 'MySpace - Forum - Science - Physics';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=80") != -1) {
            document.title = 'MySpace - Forum - Science - Physics - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=81") != -1) {
            document.title = 'MySpace - Forum - Science - Space';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=81") != -1) {
            document.title = 'MySpace - Forum - Science - Space - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=19&") != -1) {
            document.title = 'MySpace - Forum - Sports - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=99") != -1) {
            document.title = 'MySpace - Forum - Sports - College';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=99") != -1) {
            document.title = 'MySpace - Forum - Sports - College - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=84") != -1) {
            document.title = 'MySpace - Forum - Sports - ExtremeSports';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=84") != -1) {
            document.title = 'MySpace - Forum - Sports - ExtremeSports - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=82") != -1) {
            document.title = 'MySpace - Forum - Sports - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=82") != -1) {
            document.title = 'MySpace - Forum - Sports - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=85") != -1) {
            document.title = 'MySpace - Forum - Sports - ProfessionalSports';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=85") != -1) {
            document.title = 'MySpace - Forum - Sports - ProfessionalSports - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=83") != -1) {
            document.title = 'MySpace - Forum - Sports - TeamSports';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=83") != -1) {
            document.title = 'MySpace - Forum - Sports - TeamSports - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=6&") != -1) {
            document.title = 'MySpace - Forum - Television - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=87") != -1) {
            document.title = 'MySpace - Forum - Television - Anime';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=87") != -1) {
            document.title = 'MySpace - Forum - Television - Anime - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=88") != -1) {
            document.title = 'MySpace - Forum - Television - Cable';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=88") != -1) {
            document.title = 'MySpace - Forum - Television - Cable - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=89") != -1) {
            document.title = 'MySpace - Forum - Television - GameShows';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=89") != -1) {
            document.title = 'MySpace - Forum - Television - GameShows - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=86") != -1) {
            document.title = 'MySpace - Forum - Television - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=86") != -1) {
            document.title = 'MySpace - Forum - Television - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=90") != -1) {
            document.title = 'MySpace - Forum - Television - Primetime';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=90") != -1) {
            document.title = 'MySpace - Forum - Television - Primetime - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=91") != -1) {
            document.title = 'MySpace - Forum - Television - RealityShows';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=91") != -1) {
            document.title = 'MySpace - Forum - Television - RealityShows - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewSubCategory&CategoryID=10&") != -1) {
            document.title = 'MySpace - Forum - Travel & Vacations - Sub Category';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=92") != -1) {
            document.title = 'MySpace - Forum - Travel & Vacations - General';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=92") != -1) {
            document.title = 'MySpace - Forum - Travel & Vacations - General - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=94") != -1) {
            document.title = 'MySpace - Forum - Travel & Vacations - International';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=94") != -1) {
            document.title = 'MySpace - Forum - Travel & Vacations - International - Post Topic';
        } else if (href.indexOf("fuseaction=messageboard.viewCategory&CategoryID=93") != -1) {
            document.title = 'MySpace - Forum - Travel & Vacations - US';
        } else if (href.indexOf("fuseaction=messageboard.PostThread&categoryID=93") != -1) {
            document.title = 'MySpace - Forum - Travel & Vacations - US - Post Topic';
        }
    }
    
    function fixFriendsTitle() {
        if(href.indexOf("fuseaction=user.editfriends") != -1) {
            document.title = 'MySpace - Friends - Edit Friends';
        } else if (href.indexOf("fuseaction=user.confirmdeletefriend&friendID=") != -1) {
            document.title = 'MySpace - Friends - Delete Friend';
        } else if (href.indexOf("fuseaction=user.birthdays&friendID") != -1) {
            document.title = 'MySpace - Friends - Upcoming Birthdays';
        } else if (href.indexOf("fuseaction=user.editTopFriends&friendID") != -1) {
            document.title = 'MySpace - Friends - Edit Top Friends';
        }
    }
    
    function fixHomeTitle() {
        if(href.indexOf("fuseaction=user&") != -1) {
            document.title = 'MySpace - Home';
        } else if (href.indexOf("fuseaction=user.viewfriends&friendID=") != -1) {
            document.title = 'MySpace - Friends - View All Friends';
        }
    }
    
    function fixSignupTitle() {
        if(href.indexOf("fuseaction=join&") != -1) {
            document.title = 'MySpace - Sign Up - Account Details';
        } else if (href.indexOf("fuseaction=join.step1verify") != -1) {
            document.title = 'MySpace - Sign Up - Enter Security Code';
        } else if (href.indexOf("fuseaction=join.step2") != -1) {
            document.title = 'MySpace - Sign Up - Upload Photo';
        } else if (href.indexOf("fuseaction=join.step3") != -1) {
            document.title = 'MySpace - Sign Up - Invite Friends';
        }
    }
	
    function fixEventsTitle() {
        if(href.indexOf("fuseaction=events&") != -1) {
            document.title = 'MySpace - Events - Home';
        } else if (href.indexOf("fuseaction=events.create") != -1) {
            document.title = 'MySpace - Events - Create Event';
        } else if (href.indexOf("fuseaction=events.detail") != -1) {
            document.title = 'MySpace - Event Details';
        }
    }
    
})();