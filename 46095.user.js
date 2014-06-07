// ==UserScript==
// @name           Group 3 Iteration 2
// @namespace      CS324 Rhinonceri
// @description    Makes TheFump.com usable to the blind
// @include        *
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
        
        var myScript = document.createElement('script');
        myScript.type = 'text/javascript';
        
        /* Modify this line to match where you have the script you are working on */
        myScript.src = 'http://127.0.0.1:4001/axsSkel.js';
        
        document.getElementsByTagName('head')[0].appendChild(myScript);