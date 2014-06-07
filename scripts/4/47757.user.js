// ==UserScript==
// @name group 5 Penguin
//@discription group 5's iteration5
// ==/UserScript==

// Copyright 2008 Google Inc.
        // 
        // Licensed under the Apache License, Version 2.0 (the "License");
        // you may not use this file except in compliance with the License.
        // You may obtain a copy of the License at
        // 
        //      http://www.apache.org/licenses/LICENSE-2.0
        // 
        // Unless required by applicable law or agreed to in writing, software
        // distributed under the License is distributed on an "AS IS" BASIS,
        // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        // See the License for the specific language governing permissions and
        // limitations under the License.
        
        //Inject the necessary AxsJAX library scripts
        var theLib = document.createElement('script');
        theLib.type = 'text/javascript';
        theLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsJAX.js';
        var navLib = document.createElement('script');
        navLib.type = 'text/javascript';
        navLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsNav.js';
        var lensLib = document.createElement('script');
        lensLib.type = 'text/javascript';
        lensLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsLens.js';
        var sndLib = document.createElement('script');
        sndLib.type = 'text/javascript';
        sndLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/AxsSound.js';
        var pkLib = document.createElement('script');
        pkLib.type = 'text/javascript';
        pkLib.src = 'http://google-axsjax.googlecode.com/svn/trunk/common/PowerKey.js';
        
        document.getElementsByTagName('head')[0].appendChild(theLib);
        document.getElementsByTagName('head')[0].appendChild(navLib);
        document.getElementsByTagName('head')[0].appendChild(lensLib);
        document.getElementsByTagName('head')[0].appendChild(sndLib);
        document.getElementsByTagName('head')[0].appendChild(pkLib);
        
        
        //code by stephen to get url variable t to check if empty
        // if it is then load main script. Used generic so can load other
        // php boards
        var myScript = document.createElement('script');
        myScript.type = 'text/javascript';
        var topic_param = getURLParam('t');
        var register_param = getURLParam('mode');
        
        if(topic_param != "")
        {  
        	myScript.src = 'http://127.0.0.1:4001/axsTopicPHPBB.js';
        
        	document.getElementsByTagName('head')[0].appendChild(myScript);
        }
        else if(register_param != ""){
        	myScript.src = 'http://127.0.0.1:4001/axsRegisterPHPBB.js';
        	document.getElementsByTagName('head')[0].appendChild(myScript);
        }
        else
        {
        	myScript.src = 'http://127.0.0.1:4001/axsMainPHPBB.js';
        
        	document.getElementsByTagName('head')[0].appendChild(myScript);
        }
        
        function getURLParam(strParamName){
          var strReturn = "";
          var strHref = window.location.href;
          if ( strHref.indexOf("?") > -1 ){
            var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
            var aQueryString = strQueryString.split("&");
            for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
              if (
        aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                break;
              }
            }
          }
          return unescape(strReturn);
        } 