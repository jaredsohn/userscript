// Quick Links Userscript
        // replaces the itte footer menu with some usefull links
        // brought to you by Funkbrotha10.
        // 
        // You may modify any of the source code to your liking WITHOUT permission from me
        // -----------------------------------------------------------------------------------
        //
        // ==UserScript==
        // @name Footer_replacment
        // @description will replace the litter footer menue with some more usefull things
        // @include http://www.bungie.net/*
        // ==/UserScript==
        //
        //
        
        
        
        //WEBCAMS = http://www.bungie.net/Inside/webcam.aspx
        
        //halo3 forum =   http://www.bungie.net/Forums/topics.aspx?forumID=105242
        
        // your profile =   http://www.bungie.net/Account/Profile.aspx
        
        //element ID of footer thingy =   ctl00_footer_footerMenu
        
        
        
        var footer, newcontent;
        footer = document.getElementById('ctl00_footer_footerMenu');
        if (footer)
        {
             footer.innerHTML = '<font size="14"><!-- --!><a href="http://www.bungie.net/Inside/webcam.aspx">Webcams</a>   <a href="http://www.bungie.net/Forums/topics.aspx?forumID=3">Community Forum</a><!-- --!>   <a href="http://www.bungie.net/Forums/topics.aspx?forumID=105242">Halo 3 Forum</a><!-- --!>   <a href="http://www.bungie.net/Account/Profile.aspx">My Profile</a>     <a href="http://www.bungie.net/Account/Profile.aspx?page=Messages">My Messages</a>   ';
        }
        
        
        
        /// --Love Funkbrotha10
        
        //any suggestions for things to add to this script? PM my bungie.net account: funkbrotha10
        
        
        