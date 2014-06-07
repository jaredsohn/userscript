// ==UserScript==
// @name          Retro Giant Bomb
// @namespace     @christaran 
// @description   Retro themed remodel of giantbomb.com. Thanks to John Hayes for the base64.
// @include       http://www.giantbomb.com/*
// @match         http://www.giantbomb.com/*
// @version       0.6
// ==/UserScript==

(function() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABQf/xAAmEAACAQMEAQMFAAAAAAAAAAABAgQDBREABiExEgcIExQiMkFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAZEQEAAwEBAAAAAAAAAAAAAAABAAMEAhH/2gAMAwEAAhEDEQA/AGd9+psAYowIhuNpiyzTuTtISjTlADBpUgfuqgM6M4UY8QA2UcnQ21o5vEwSLDb7WHlkTaC0AyR6Bpso8HUAEMD3xzkdg6kO4Yt1ts1LTeqb0q1uQ0KdNlA8ULs/BH5As7EHnIPeMavft/29PtO3ZU64x/h+uqK8cOMP8YHZH6B4I/uM9Y0VtRYAsqy6nOqcj7P/2Q==';
    document.getElementsByTagName('head')[0].appendChild(link);
}());