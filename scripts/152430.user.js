// ==UserScript==
// @name        faviconGw
// @namespace   ganjawars.ru
// @include     http://*.ganjawars.ru/*
// @include     http://www.ganjawars.ru/*
// @version     1
// @grant       none
// ==/UserScript==
(function() {
    var link, head;

    link = document.createElement('link');
    link.setAttribute('rel', 'shortcut icon');
    link.setAttribute('href', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBggGBQkIBwgKCQkKDRYODQwMDRoTFBAWHxwhIB8cHh4jJzIqIyUvJR4eKzssLzM1ODg4ISo9QTw2QTI3ODUBCQoKDQsNGQ4OGTUkHiQ1NTU1NTU1NTU1NTU1NTUpNTU1NTU1KTU1NTUpNSk1NSk1NTU1NTU1NTU1NTU1NTU1Kf/AABEIABAAEAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAFBP/EACQQAAIBAwIGAwAAAAAAAAAAAAEDAgQFIQYRABIxUXGBE0Gh/8QAFQEBAQAAAAAAAAAAAAAAAAAABgT/xAAXEQEAAwAAAAAAAAAAAAAAAAARAAEh/9oADAMBAAIRAxEAPwBe4aqVbru9LMhSCeXoecSwPBBHF1krGMoFNuDYRqqneYWSIkR+gB22z74H1PpFl0qZVVM2QnEDZeO+dvXQE/mOEdO2SdrWWMYlrGZkwrl8h8knHjYcG8JNYT//2Q==');

    head = document.getElementsByTagName('head')[0];
    if(!head) return;
    head.appendChild(link);
})();