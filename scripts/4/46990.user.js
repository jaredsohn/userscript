// ==UserScript==
        // @name          Imeem Login Killer 
        // @namespace     http://badsegue.org/
        // @description	  Use Imeem without logging in, by automatically clearing the login popup
        // @include       http://*.imeem.com/*
        // ==/UserScript==
        //
        // Imeem Login Killer from http://badsegue.org
        //
        // This is a simple script to make that hides the Imeem login popup div, so you don't have to login 
        //
        
        window.addEventListener('load', function() {
        
        var divs = document.getElementsByTagName("div");
        var d;
        for (i=0; i<divs.length;i++) {
          d=divs[i];
          if (d.id.match('FloatingLogin'))  d.style.display = 'none';
        }
        
        }, true);  
        