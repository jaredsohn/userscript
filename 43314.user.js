// ==UserScript==
// @name           add_stats.js
// @namespace      http://example.org
// @description    adds information about your current buffer and total download
// @include        http://www.norbits.net/*
// @include        http://norbits.net/*
// @include        https://www.norbits.net/*
// @include        https://norbits.net/*
// ==/UserScript==
(function () {
   
    if (location.hostname.indexOf('norbits.net') == -1) { 
        return false;
    }
    
    //change this if you want your buffer to be relative to another ratio
    // e.g. if you want your buffer to show how many GBs left untill you
    // have a ratio of two point zero, set this to 2.0 :) 
    const BUFFER_RELATIVE_TO = 1.0; // relative to 1.0 in ratio
    const FORCE_GIGABYTE_SUFFIX = false;
    const SHOW_NEGATIVE_BUFFERS = false;
    const DECIMALS = 2;
    const SHOW_TOTAL = true;
   
    function getNodes(expression, startElement) {
        startElement = startElement || document;
        return document.evaluate(expression, startElement, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    function trim(str) {
        return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function getGigaBytes(text) {
        var gigabytes, numbers, suffix;
        text = trim(text);
        
        if (text == 'Inf.' || text == '---') { 
            return 0;
        }
        
        var tmp = text.split(' ');
        numbers  = Number(tmp[0]);
        suffix   = tmp[1];
        switch (suffix) {
        case 'GB':
            gigabytes =  numbers;
            break;
        case 'TB':
            gigabytes = numbers * 1024;
            break;
        case 'MB':
            gigabytes = numbers * 0.0009765625;
            break;
        //no point in doing calculations with that low numbers
        case 'kB':
        default:
            gigabytes = 0;
            break;
        }
        
        return gigabytes;

    }
    
    function gigabytesToAppropiateSuffix(gigabytes) {
        if (FORCE_GIGABYTE_SUFFIX) {
            return gigabytes.toFixed(DECIMALS) + ' GB ';
        }
        var num, suffix;
        
        
        if (gigabytes > 1024) {

            num = (gigabytes/1024);
            suffix = 'TB';
        } else if (gigabytes < 1) {
            num=0;
            suffix='';
        
        } else {
            num = gigabytes;
            suffix='GB';
        }
        
        return num.toFixed(DECIMALS) + ' ' + suffix + ' ';
    
    }
    
    
    function start(e) {

        try {
            var activeTorrentsNode = getNodes('//font[text()="Akt:"]').snapshotItem(0);
            if (!activeTorrentsNode) {
                return;
            }
            var uploadNode = getNodes('//font[text()="Opp:"]').snapshotItem(0);
            if (!uploadNode) {
                return;
            }
            var uploaded = getGigaBytes(uploadNode.nextSibling.textContent);//always in GB
           
           
            var downloadNode = getNodes('//font[text()="Ned:"]').snapshotItem(0);
            if (!downloadNode) {
                return;
            }
            var downloaded = getGigaBytes(downloadNode.nextSibling.textContent);//always in GB
           
            var container = document.createElement('span');
           
            var labelContainer = document.createElement('span');
            labelContainer.title = 'Buffer i forhold til en ratio pÃ¥ ' + Number(BUFFER_RELATIVE_TO);
            

            labelContainer.style.color = 'purple';
            labelContainer.appendChild(document.createTextNode('Buffer: '));
            container.appendChild(labelContainer);


           
            if (!SHOW_NEGATIVE_BUFFERS && downloaded >= uploaded/BUFFER_RELATIVE_TO) {
                container.appendChild(document.createTextNode('---'));
            } else {
                var buffer = gigabytesToAppropiateSuffix((uploaded/BUFFER_RELATIVE_TO  - downloaded));              
                container.appendChild(document.createTextNode(buffer));
           
            }
            container.appendChild(document.createTextNode('  '));
           //insert before activeTorrentsNode
            activeTorrentsNode.parentNode.insertBefore(container, activeTorrentsNode);
            
            if(SHOW_TOTAL) {
                var totalContainer = document.createElement('span');
                
                var descContainer = document.createElement('span')
                descContainer.style.color = 'blue';
                descContainer.appendChild(document.createTextNode('Total: '));
                

                totalContainer.appendChild(descContainer);
                totalContainer.appendChild(document.createTextNode( gigabytesToAppropiateSuffix(uploaded+downloaded)));
                
                activeTorrentsNode.parentNode.insertBefore(totalContainer, activeTorrentsNode);
            }
        } catch (ex) { 
            alert('feil: ' + ex);
        } 
    } 
   
    if (window.opera) {
        window.addEventListener('DOMContentLoaded', start, false);    
    } else {
        window.addEventListener('load', start, false);
    }
    
})();