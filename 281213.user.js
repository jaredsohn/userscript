// ==UserScript==
// @name       Calling a spade a spade on Wargaming forums
// @namespace  tag:call-a-spade-a-spade
// @version    0.2
// @description  replaces "Forum moderator" randomly with more appropriate terms
// @include		http://forum.worldoftanks.tld/*
// @include		http://forum.worldofwarships.tld/*
// @include		http://forum.worldofwarplanes.tld/*
// ==/UserScript==

var titles = document.getElementsByClassName('member_title');
var groups = document.getElementsByClassName('group_title');

var serbAvatar = 'http://imagizer.imageshack.us/v2/xq90/23/lmja.jpg';
var modSigImage = 'http://imageshack.us/a/img809/7748/72401554.png';
var senSigImage = 'http://i1283.photobucket.com/albums/a558/E_Aurora/Signatures%20WOT/SM_zps03fb171f.png';

var fittingAvatar = 'http://imagizer.imageshack.us/v2/800x600q90/23/lmja.jpg';
var fittingTitles = [ 'Peon', 'Low-life', 'Lackey', 'Pimp', 'Henchman', 'Minion', 'Serf', 'Pawn', 'Puppet', 'Muppet',
                      'Myrmidon', 'Fellow Traveller', 'Stooge', 'Card-carrying Employee', 'Opportunist', 'Careerist',
                      'Carpetbagger', 'Sycophant' ];
var fittingGroups = [ 'Retard', 'Idiot', 'Fuckface', 'Fucktard', 'Arsehole', 'Paid Troll', 'Paid Griefer', 'Shitface',
                      'Son of a Bitch', 'Wanker', 'Twat', 'Shithead', 'Asswipe', 'Dick', 'Dickhead', 'Paid Bully',
                      'Motherfucker', 'Cunt', 'Scumbag', 'Moron' ];
var fittingSenior = [ 'Full Retard', 'Head Arsehole', 'Troll-in-chief', 'Senior Dick', 'Major Twat', 'Commanding Wanker',
                      'Complete Idiot', 'Utter Moron' ];
var fittingSignature = [ 'Harass players and get paid for it? <a href="http://wargaming.com/en/careers/">Apply now!</a>',
                         'Need to compensate for a short dick? <a href="http://wargaming.com/en/careers/">Join the forum staff today!</a>',
                         'Seeking revenge on mankind because you were bullied as a fat kid? <a href="http://wargaming.com/en/careers/">Have a look at our career opportunities!</a>'];

var profileGroup, profilePic, profileRep;

for (var i = 0; i < titles.length; i++)
    if (titles.item(i).innerHTML.indexOf('Moderator') != -1) {
		titles.item(i).innerHTML = fittingTitles[Math.floor(Math.random()*fittingTitles.length)];
        titles.item(i).parentNode.getElementsByClassName('ipsUserPhoto')[0].src = serbAvatar;
    }

for (var i = 0; i < groups.length; i++)
    if (groups.item(i).innerHTML.indexOf('Senior Moderator') != -1) {
        groups.item(i).innerHTML = '<span style="color: red;">' + fittingSenior[Math.floor(Math.random()*fittingSenior.length)] + '</span>';
        groups.item(i).parentNode.parentNode.parentNode.parentNode.getElementsByClassName('signature')[0].innerHTML = '<img src="' + senSigImage
        + '" style="float: left; margin-right: 10px;" /> <span style="font-size: larger; font-weight: bold;">' + fittingSignature[Math.floor(Math.random()*fittingSignature.length)] + '</span>';
    } else if (groups.item(i).innerHTML.indexOf('Moderator') != -1) {
        groups.item(i).innerHTML = '<span style="color: red;">' + fittingGroups[Math.floor(Math.random()*fittingGroups.length)] + '</span>';
        groups.item(i).parentNode.parentNode.parentNode.parentNode.getElementsByClassName('signature')[0].innerHTML = '<img src="' + modSigImage
        + '" style="float: left; margin-right: 10px;" /> <span style="font-size: larger; font-weight: bold;">' + fittingSignature[Math.floor(Math.random()*fittingSignature.length)] + '</span>';
    }

profileGroup = document.getElementById('m_group');
profilePic = document.getElementById('profile_photo');
profileRep = document.getElementsByClassName('reputation')[0];

if (profileGroup.innerHTML.indexOf('Moderator') != -1) {
    if (profileGroup.innerHTML.indexOf('Senior Moderator') != -1)
        profileGroup.innerHTML = '<span style="color: red;">' + fittingSenior[Math.floor(Math.random()*fittingSenior.length)] + '</span>';
    else
        profileGroup.innerHTML = '<span style="color: red;">' + fittingGroups[Math.floor(Math.random()*fittingGroups.length)] + '</span>';
    document.getElementById('m_member_title').innerHTML = fittingTitles[Math.floor(Math.random()*fittingTitles.length)];
    profileRep.className = 'reputation negative';
    profileRep.innerHTML = '<span class="number">-666</span><span class="title">Infernal</span>';
    profilePic.src = serbAvatar;
}