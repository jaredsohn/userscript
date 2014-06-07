// ==UserScript==
          // @name           Farmomatic
          // @namespace      http://namespace
          // @description    Basic farming automation
          // @include        http://*.tribalwars.net/
// ==/UserScript==          
          
          
          // if you are on the rally point, fill out the form
          if(location.href.indexOf('screen=place')>-1 && location.href.indexOf('try=confirm')==-1 && document.forms[0].elements[11].value.length > 0 )
          {
          
          //scout
          document.forms[0].elements[3].value="1";
          //light cavalry
          document.forms[0].elements[4].value="250";
          
          
          // click attack
          document.forms[0].elements[12].click();
          
          }
          
          
          
          // click link
          if(location.href.indexOf('&screen=info_village')>-1) 
          {
          location.href = location.href.replace("&screen=info_village&id=", "&screen=place&mode=command&target=");
          }
          
          