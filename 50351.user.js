// ==UserScript==
// @name Alternative Footer links - SSO Version
// @description Some new links for the Bungie.net footer

// @include http://*www.bungie.net* 
// @include http://*halo3.org*
// ==/UserScript==
      
          
          
       
         
          
          //element ID of footer = ctl00_footer_footerMenu
          
          
          
          var footer, newcontent;
          footer = document.getElementById('ctl00_footer_footerMenu');
          if (footer)
          {
          footer.innerHTML = '<font size="14"><!-- --!><a href="http://www.bungie.net/fanclub/256116/Group/GroupHome.aspx ">SSO Home</a> <a href="http://www.bungie.net/fanclub/256116/Forums/topics.aspx?forumID=262619">SSO Forum</a> <a href="http://www.bungie.net/fanclub/266438/Group/GroupHome.aspx">SSO Forge Division</a> <a href="http://www.bungie.net/Forums/topics.aspx?forumID=105242">Halo 3 Forum</a> <a href="http://www.bungie.net/Forums/topics.aspx?forumID=9">Classifieds</a> <a href="http://www.bungie.net/Stats/Halo3/Default.aspx?">Service Record</a> <a href="http://www.bungie.net/Stats/Halo3/Screenshots.aspx?">Screenshot Gallery</a> ';
          }
          
          
          
          // --<3 Wolverfrog
          
          // Enjoy