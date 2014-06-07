// ==UserScript==
// @name       What.CD Enhancer
// @namespace  http://userscripts.org/users/465594
// @version    0.1
// @description  Shows your available buffer, shows progress towards next user level.
// @include    https://ssl.what.cd/*
// @include    http*://*.what.cd/*
// @include    http*://what.cd/*
// @require    http://userscripts.org/scripts/source/49700.user.js
// @run-at document-end

// @copyright  Released under the GNU GPL version 3.
// ==/UserScript==

(function() {
    function openOptions()
    {
        GM_config.open();
        //Ugly hax to change the style sheet since it causes Tampermonkey to throw an error.
        var gconfwindow = document.getElementById('GM_config');
        gconfwindow.style.width = "450px";
        gconfwindow.style.height = "250px";
    }
    
    function init()
    {
        var userinfo_major = document.getElementById('userinfo_major');
        var userinfo_stats = document.getElementById('userinfo_stats');
        
        GM_config.init('What.CD Enhancer Configuration',
                       {
                           feat_bc: {section: ['Features'], label: 'Show Buffer/Debt:', type: 'checkbox', default: true},
                           bc_requested_ratio: {section: ['Buffer/Debt'], label: 'Requested Ratio:', type: 'int', default: 1},
                       },
                       '@import url(http://fonts.googleapis.com/css?family=Roboto:300); * {font-family:"Roboto", sans-serif !important; font-weight: 300 !important;} body {background-color: #252525; color: #fff; text-align: center;} .section_header {border: none !important; background: none !important; font-weight: 300 !important;}'
                      );
        
        userinfo_major.innerHTML = userinfo_major.innerHTML.concat('<li id="nav_enhancer_options" class="brackets"><a>WCDE Settings</a></li>');
        document.getElementById('nav_enhancer_options').onclick = openOptions;
        
        if (GM_config.read().feat_bc)
        {
            var uploaded = toBytes(wCD_getStatsField(document.getElementById('stats_seeding')));
            uploaded = uploaded / GM_config.read().bc_requested_ratio;
            var downloaded = toBytes(wCD_getStatsField(document.getElementById('stats_leeching')));
            var toprint = '<li id="stats_enhancer_buffer"><a>Buffer</a>: <span class="';
            if (parseFloat(fromBytes(uploaded - downloaded, 0)) > 0)
            {
                toprint = toprint + "r10";
            }
            else
            {
                toprint = toprint + "r03";
            }
            toprint = toprint + '" title="' + fromBytes(uploaded - downloaded, 4) + '">' + fromBytes(uploaded - downloaded, 2) + '</span></li>';
            userinfo_stats.innerHTML = userinfo_stats.innerHTML + toprint;
        }
    }
    // Copied from http://userscripts.org/scripts/source/158200.user.js, slight edits
    
    const KB = Math.pow(2,10);
    const MB = Math.pow(2,20);
    const GB = Math.pow(2,30);
    const TB = Math.pow(2,40);
    const PB = Math.pow(2,50);
    
    // convert from format (amount units) to bytes
    function toBytes(amount) {
        var bytes = parseFloat(amount[0]);
        if ( amount[1] == "KB" ) bytes = amount[0] * KB;
          else if ( amount[1] == "MB" ) bytes = bytes * MB;
          else if ( amount[1] == "GB" ) bytes = bytes * GB;
          else if ( amount[1] == "TB" ) bytes = bytes * TB;
          else if ( amount[1] == "PB" ) bytes = bytes * PB;
        return bytes;
    }
    // convert from bytes to whatever is appropriate, appended with units used
    function fromBytes(bytes, numdecimals) {
        var buffer = bytes;
        var units = 'B';

        if ( Math.abs(bytes) >= PB ) {
            buffer = bytes/PB;
            units = "PB";
        } else if ( Math.abs(bytes) >= TB ) {
            buffer = bytes/TB;
            units = "TB";
        } else if ( Math.abs(bytes) >= GB ) {
            buffer = bytes/GB;
            units = "GB";
        } else if ( Math.abs(bytes) >= MB ) {
            buffer = bytes/MB;
            units = "MB";
        } else if ( Math.abs(bytes) >= KB ) {
            buffer = bytes/KB;
            units = "KB";
        }
        return buffer.toFixed(numdecimals) + ' ' + units;
    }
    //END OF COPIED DATA
    
    function wCD_getStatsField(elementz)
    {
        return elementz.getElementsByTagName('span')[0].title.split(" ");
    }
    
    init();
 })();