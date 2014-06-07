// ==UserScript==
// @name          Replace Some Things On MySpace
// @description	  Replace Text On Myspace
// @include       http://*myspace.com/*=user
// @include       http://*myspace.com/*=user&*
// @include       http://*profile.*myspace.com/*index.cfm?fuseaction=user.viewprofile&friendid=54653814*

//@credit         Brandon
// ==/UserScript==



html = document.body.innerHTML.replace(/Hello/, 'Oh Shit Its!');
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/My Mail/, 'OMFG My Fucking Mail!');
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/My Bulletin Space/, 'People Spamming!');
document.body.innerHTML = html;


html = document.body.innerHTML.replace(/My Friend Space/, 'I Has Friends :)');
document.body.innerHTML = html;


html = document.body.innerHTML.replace(/Status and Mood/, 'ThiS iS HoW I Iz FeeLing :D');
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/You have/, 'You Has');
document.body.innerHTML = html;

html = document.body.innerHTML.replace(/View My:/, 'This Is My Shit');
document.body.innerHTML = html;


html = document.body.innerHTML.replace(/kenia/, 'Quetzali');
document.body.innerHTML = html;
