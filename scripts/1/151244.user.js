// ==UserScript==
// @name       RYM: Identify users who have added you as friend that you haven't added back
// @version    0.3
// @include      https://rateyourmusic.com/friends/*
// @copyright  2012+, AnniesBoobs
// ==/UserScript==
var addFriend = 'http://rateyourmusic.com/account/contacts_add?contact_user=';
var username = document.getElementsByTagName('li')[6].getElementsByTagName('a')[0].innerHTML;
var friendsAdded = new Array();
if (window.location.toString() == "http://rateyourmusic.com/friends/"+username+"/"){
    friendsAddedCards = document.getElementsByClassName('profileb')[0].getElementsByClassName('or_card_frame');
    for (i=0; i<friendsAddedCards.length; i++){
        if(friendsAddedCards[i].getElementsByClassName('usero')[0] == undefined){
            friendsAdded.push(friendsAddedCards[i].getElementsByClassName('user')[0].innerHTML);
        }
        else{
            friendsAdded.push(friendsAddedCards[i].getElementsByClassName('usero')[0].innerHTML);
        }
    }
    friendsAddedYou = document.getElementsByClassName('profileb')[2];
    friendsOnline = friendsAddedYou.getElementsByClassName('usero');
    friendsOffline = friendsAddedYou.getElementsByClassName('user');
    for (i=0; i<friendsOnline.length; i++){
        if (friendsAdded.indexOf(friendsOnline[i].innerHTML) < 0){
            x = document.createElement('a');
            x.setAttribute('href',addFriend+friendsOnline[i].innerHTML);
            x.innerHTML = '    (Add as Friend)';
            friendsOnline[i].parentNode.insertBefore(x, friendsOnline[i].nextSibling);
        }
    }
    for (i=0; i<friendsOffline.length; i++){
        if (friendsAdded.indexOf(friendsOffline[i].innerHTML) < 0){
            x = document.createElement('a');
            x.setAttribute('href',addFriend+friendsOffline[i].innerHTML);
            x.innerHTML = '    (Add as Friend)';
            friendsOffline[i].parentNode.insertBefore(x, friendsOffline[i].nextSibling);
        }
    }
}
