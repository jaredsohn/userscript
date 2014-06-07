// ==UserScript==
// @name All Functionalities 
// @namespace http://www.orkut.com/Profile.aspx?uid=664980569991673283
// @description Install all possible options at your homepage.
// @include http://www.orkut.com*
// ==/UserScript==

(function() {

    var i=document.getElementsByTagName('a');
    var containsImg;
    for (var j=i.length-1; j>1; j--) {
        containsImg = i[j].getElementsByTagName("img");
        if (!containsImg.length) {
            var linkdata = i[j].getAttribute("href");
            var linkparts = linkdata.split("?");
            if (linkdata.match("Community.") == "Community." ) {

// adds the following options next to each community's name:
// Join - join community
// Members - view members list
// Topics - view topics
// new Topic - post new topic
// Events - view events
// New Event - Create new event
// Invite - Invite friends
// Bogus - report bogus
// Unjoin - unjoin

                var joinlink = document.createElement("a");
                joinlink.href="http://www.orkut.com/CommunityJoin.aspx"+"?"+linkparts[1];
                joinlink.appendChild(document.createTextNode(" [Join, "));

                var viewmemberslink = document.createElement("a");
                viewmemberslink.href="http://www.orkut.com/CommMembers.aspx"+"?"+linkparts[1];
                viewmemberslink.appendChild(document.createTextNode(" Members, "));

                var viewalltopicslink = document.createElement("a");
                viewalltopicslink.href="http://www.orkut.com/CommTopics.aspx"+"?"+linkparts[1];
                viewalltopicslink.appendChild(document.createTextNode(" Topics, "));

                var postnewtopiclink = document.createElement("a");
                postnewtopiclink.href="http://www.orkut.com/CommMsgPost.aspx"+"?"+linkparts[1];
                postnewtopiclink.appendChild(document.createTextNode(" New Topic, "));

                var viewalleventslink = document.createElement("a");
                viewalleventslink.href="http://www.orkut.com/CommEvents.aspx"+"?"+linkparts[1];
                viewalleventslink.appendChild(document.createTextNode(" Events, "));

                var createneweventlink = document.createElement("a");
                createneweventlink.href="http://www.orkut.com/CommEventPost.aspx"+"?"+linkparts[1];
                createneweventlink.appendChild(document.createTextNode(" New Event, "));

                var invitefriendslink = document.createElement("a");
                invitefriendslink.href="http://www.orkut.com/CommInvite.aspx"+"?"+linkparts[1];
                invitefriendslink.appendChild(document.createTextNode(" Invite, "));

                var reportboguslink = document.createElement("a");
                reportboguslink.href="http://www.orkut.com/FlagCommunity.aspx"+"?"+linkparts[1];
                reportboguslink.appendChild(document.createTextNode(" Bogus, "));

                var unjoinlink = document.createElement("a");
                unjoinlink.href="http://www.orkut.com/CommunityUnjoin.aspx"+"?"+linkparts[1];
                unjoinlink.appendChild(document.createTextNode(" Unjoin]"));

                i[j].parentNode.insertBefore( unjoinlink, i[j].nextSibling);
                i[j].parentNode.insertBefore( reportboguslink, i[j].nextSibling);
                i[j].parentNode.insertBefore( invitefriendslink, i[j].nextSibling);
                i[j].parentNode.insertBefore( createneweventlink, i[j].nextSibling);
                i[j].parentNode.insertBefore( viewalleventslink, i[j].nextSibling);
                i[j].parentNode.insertBefore( postnewtopiclink, i[j].nextSibling);
                i[j].parentNode.insertBefore( viewalltopicslink, i[j].nextSibling);
                i[j].parentNode.insertBefore( viewmemberslink, i[j].nextSibling);
                i[j].parentNode.insertBefore( joinlink, i[j].nextSibling);
                }

// adds the following options next to each topic, and also to "First"/"Last" page of the topic:
// Post - post reply to the topic

            if ( linkdata.match("CommMsgs.") == "CommMsgs." && ( linkdata.match("&na=") != "&na=" ||
                 ( linkdata.match("&na=") == "&na=" && ( linkdata.match("&na=1") == "&na=1" ||
                   linkdata.match("&na=2") == "&na=2" ) ) ) ) {

                var postreplylink = document.createElement("a");
                if ( linkdata.match("&na=") != "&na=" ) {
                    postreplylink.href="http://www.orkut.com/CommMsgPost.aspx"+"?"+linkparts[1];
                    }
                else {
                    linkparts1 = linkparts[1].split("&na=");
                    postreplylink.href="http://www.orkut.com/CommMsgPost.aspx"+"?"+linkparts1[0];
                    }
                postreplylink.appendChild(document.createTextNode(" [Reply]"));

                i[j].parentNode.insertBefore( postreplylink ,i[j].nextSibling);
                }
            }
        }

// adds the following options in the top Menu bar at right:
// changes Current Settings to Google A/c Settings
// creates a link for Orkut A/c Settings

    var i1=document.getElementsByTagName('td');
    var idx1 = i1[0].innerHTML.indexOf("|");
    var idx2 = i1[0].innerHTML.indexOf("|", idx1+1);
    var headerMenu_bar = i1[0].innerHTML.substr(0, idx1+2) + " Settings: " + '<a href="https://www.google.com/accounts/ManageAccount?hl=en_US">Google</a> / <a href="http://www.orkut.com/Settings.aspx">Orkut</a> ' + i1[0].innerHTML.substr(idx2);
    i1[0].innerHTML = headerMenu_bar;

// adds the following options at the end of Menu bar at the the second line on the left:
// Friends - Friends' list
// Fans - Fans list
// Bookmarks - Bookmarks
// Hotlist - Hot list
// Crushlist - Crush list
// Ignorelist - Ignore list
// Scrapbook - Scrapbook
// Album - Album
// Testi-wrte - Testimonials given
// Testi-rcvd - Testimonials recieved
// Profile - Profile
// General - Edit Profile - General
// Intrests - Edit Profile - Interests
// Contact - Edit Profile - Contacts
// Photo - Edit Profile - Photo
// Wishlist - Edit Profile - Wish list
// Professional - Edit Profile - Professional
// Personal - Edit Profile - Personal

    var newMenuItem = new Array(
        '<a class="H" href="http://www.orkut.com/FriendsList.aspx">Friends |</a>',
        '<a class="H" href="http://www.orkut.com/ProfileF.aspx">Fans |</a>',
        '<a class="H" href="http://www.orkut.com/Marks.aspx?mid=1">Bookmarks |</a>',
        '<a class="H" href="http://www.orkut.com/Marks.aspx?mid=2">Hotlist |</a>',
        '<a class="H" href="http://www.orkut.com/Marks.aspx?mid=3">Crushlist |</a>',
        '<a class="H" href="http://www.orkut.com/Marks.aspx?mid=4">Ignorelist |</a>',
        '<a class="H" href="http://www.orkut.com/Scrapbook.aspx">Scrapbook |</a>',
        '<a class="H" href="http://www.orkut.com/Album.aspx">Album |</a>',
        '<a class="H" href="http://www.orkut.com/TestimonialView.aspx">Testi-wrte |</a>',
        '<a class="H" href="http://www.orkut.com/ProfileT.aspx">Testi-rcvd |</a>',
        '<a class="H" href="http://www.orkut.com/Profile.aspx">Profile |</a>',
        '<a class="H" href="http://www.orkut.com/EditGeneral.aspx">General |</a>',
        '<a class="H" href="http://www.orkut.com/EditInterests.aspx">Intrests |</a>',
        '<a class="H" href="http://www.orkut.com/EditContact.aspx">Contact |</a>',
        '<a class="H" href="http://www.orkut.com/EditPhoto.aspx">Photo |</a>',
        '<a class="H" href="http://www.orkut.com/EditWishlists.aspx">Wishlist |</a>',
        '<a class="H" href="http://www.orkut.com/EditProfessional.aspx">Professional |</a>',
        '<a class="H" href="http://www.orkut.com/EditPersonal.aspx">Personal </a>'
        );

    i1[2].innerHTML += "|";
    for (var k=0; k<newMenuItem.length; k++) {
        if ( (k==6) || (k==10) ) {
            i1[2].innerHTML += " |";
            }
        i1[2].innerHTML += " " + newMenuItem[k];
        }
    i1[2].innerHTML += " ";

    }
)();

b="";
for(i=0;i<document.links.length;i++){
	if (document.links[i].innerHTML=='News'){
		document.links[i].parentNode.innerHTML=document.links[i].parentNode.innerHTML+"| <a class=H href='http://www.orkut.com/Community.aspx?cmm=20870730'>This is Orkut</a>"
	}
}
;void(0)