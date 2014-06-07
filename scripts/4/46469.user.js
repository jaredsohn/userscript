// ==UserScript==
        // @name           URL Copy With Button
        // @namespace      http://userscripts.org/users/23652
        // @description    Puts a button on the page to copy the url to clipboard
        // @include        http://*
        // @include        https://*
        // @copyright      JoeSimmons
        // ==/UserScript==
        
        var button = document.createElement('button');
        button.textContent = 'Get URL';
        button.addEventListener('click', function(){
        prompt("The current page's url is: ", document.URL);
        }, false);
        
        document.body.appendChild(button);