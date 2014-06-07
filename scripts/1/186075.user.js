// ==UserScript==
// @name        oDesk Message2All Extension
// @namespace   http://www.softsky.com.ua
// @description This script sends custom message to all oDesk contractors who bid on your project.
// @include     https://*.odesk.com/jobs/*
// @version     0.1
// ==/UserScript==

/* A simple wrapper for quick debug messages. */
function debug(message) {
    unsafeWindow.console.debug(message);
}

/* Conveniently search via XPath.  If nothing matches,
 * return null.  For one match, return the element.  For multiple matches,
 * return an array of elements.  The forceList option will force the
 * function to return a list, regardless of the result.
 */
function xpath(path, forceList, node) {
    if(forceList === undefined)
        forceList = false;
    if(node === undefined)
        node = document
        
        var result = [];
    var nodes = document.evaluate(path, node, null,
                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
    if(nodes)
        for(var a = 0; a < nodes.snapshotLength; a++)
            result.push(nodes.snapshotItem(a));
    
    if(forceList)
        return result;
    
    if(result.length == 0)
        return null;
    else if(result.length == 1)
        return result[0];
        else
        return result;
}


/* This is the main program entry after the page loads completely. */
function main() {
    /* Add the config section after the "Logged in as..." stuff. */
    var rightBar = xpath('//*[@id="main"]/div[4]/aside/article/div/section');
    if(!rightBar) {
        /* TODO disable this script because it seems to fail to work with the site's HTML. */
        debug("Cannot find rightBar");
        return;
    }
    else {
        /* Insert a new list item with a link to my profile. */
        debug("Found rightBar");
        rightBar.innerHTML += '<div class="jsBucketSelector jsLogClickEvent oMute oBucket" data-bucket="send2all"><i class="oATSIcon oHiddenIcon hasHover oLeft"></i><div>Send message to all<strong class="oRight">0</strong></div></div>';
        
        var send2all = xpath('div[last()]', false, rightBar)
        var jobId = xpath('//div[@class="jsAutoPauseActions oLayout"]', false).dataset.opening;
        send2all.onclick = function(e){           
            var jsSendMessageAction = xpath('//*[@class="jsSendMessageAction jsLogClickEvent"]')
            var users = new Array();
            for(var idx in jsSendMessageAction){
                var elem = jsSendMessageAction[idx];
                var userId = elem.dataset.id;
                users[idx] = userId;
            }
            var userIdx = 0;
            var interval;
            var valueStr = prompt("Message to send", "Impress me");
            var sendFunc = function(){
                var userId = users[userIdx];
                var elem = jsSendMessageAction[userIdx];
                userIdx++;
                elem.click();
                xpath('//textarea[@name="message"]', false).value = valueStr
                xpath('//*[@class="jsSend oBtn oBtnSecondary"]', false).click();
                debug("Sent to " + userId + " #" + userIdx);
                if(userIdx >= users.length)
                   clearInterval(interval);
            }
            interval = setInterval(sendFunc, 500);
            
            e.cancelBubble = true;
            return false;
        }
        debug('done');
    }
}

window.addEventListener('load', main, true);