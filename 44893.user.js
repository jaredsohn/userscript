        // ==UserScript==
        // @name          Pwning Website
        // @namespace     http://www.neofriends.net/
        // @description   Testing this for neofriends.net
        // @include       http://www.neofriends.net/*
        // ==/UserScript==
        if (document.location.href == 'http://www.neofriends.net/'){
          alert('You are on a pwning website. It might be too pwnful for you. Are you sure you want to continue?');
        }
        else if (document.location.href.match('http://www.neofriends.net/posting.php?')){
          alert('You are about to post something. You might get flamed.');
        }
        else if (document.location.href.match('http://www.neofriends.net/downloads.php')){
          alert('You are in the Downloads Section')
    }