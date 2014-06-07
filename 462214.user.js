// ==UserScript==
// @name        favicon
// @namespace   http://jiggmin.com
// @description favicon
// @include     http://jiggmin.com/*
// @version     1
// @grant       none
// ==/UserScript==

var head = document.getElementsByTagName('head') [0];
var icon = document.createElement('link');
icon.setAttribute('type', 'image/x-icon');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAALBJREFUOE9j+E8iIKCh/ig7lAUDBDTErEVXQECD31ISNVjNJlGD1gQSNci0kaiBvx6Hhqv/F0EYaICtDJuG7/8vMiRht4ohEyrOkAZjQKl4hrWvcyBsOJhw1wOhIQxVg/kiBoYYIPs3hAsEv/8/ACry28wG4TIEoGoAAoZ8BqBozlG16Q/CPDazMHgwsFcjydpjaACCsF38QM8ArQKSxWd1oKJgwFCMTQMxgEQN//8DAN/9rRlL+T5OAAAAAElFTkSuQmCC');
head.appendChild(icon);
