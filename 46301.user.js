scr_meta=<><![CDATA[
        // ==UserScript==
        // @name          Evil E 2
        // @description    Automatically replaces < and > with &lt; and &gt; in code blocks Plus now with one-click comment quoting and shortcuts!
        // @version        1.3.6
        // @include        http://s77.nlserver.net/*
        // @include        http://s77.nlserver.net/index.php
        // @include        http://s77.nlserver.net/index.php#
        // ==/UserScript==
        ]]></>;
        
        gfx/medals/icq.gif
        
        
        function showLinks() {
         var d = document
         arLinks = d.getElementsByTagName('a')
         for (i=0; i<arLinks.length; i++) {
        altText = altText.replace(/ersetzmich/g,'http://s77.nlserver.net/gfx/medals/icq.gif'); 
        
           arLinks[i].innerHTML = 'Link: ' + arLinks[i].innerHTML
         }
        } 
        
        
        if( typeof xpath == "undefined" )
          xpath = {
           
             icq: $X('[.="ICQ-Nummer: "]')
          };
        
        function decorate( profile ) {
          
          var icq = profile.icq;
          if( icq )
            icq.innerHTML = '<img style="top:1px;position:relative;" src="http://' +
              'api.oscar.aol.com/SOA/key=je1ZtapBUYJngcu0/presence/'+ icq.textContent +
              '" height="11" width="11"> '+ icq.innerHTML;
        }
        
        decorate( xpath );
        
        
        function $X( xpath, root ) {
          var got = $x( xpath, root );
          return got instanceof Array ? got[0] : got;
        }
        
        function $x( xpath, root ) {
          var doc = root ? root.evaluate ? root : root.ownerDocument : document;
          var got = doc.evaluate( xpath, root||doc, null, 0, null ), next, result = [];
          switch( got.resultType ) {
            case got.STRING_TYPE:  return got.stringValue;
            case got.NUMBER_TYPE:  return got.numberValue;
            case got.BOOLEAN_TYPE: return got.booleanValue;
            default:
              while( next = got.iterateNext() )
        	result.push( next );
              return result;
          }
        }