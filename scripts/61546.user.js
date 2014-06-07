// ==UserScript==
// @name          betweet-us
// @namespace     http://werebear.tistory.com/
// @description   Shows common follower betweet you and whom you are replying to.
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @author        gjwlstjr
// @version       1.0
// ==/UserScript==

function init(arg1) {
    if (arg1 == undefined) {
        // Make codes for updating jQuery.fn functions

        // Create a script element to update event handlers
        var script = document.createElement('script');
        script.type = 'text/javascript';

        script.innerHTML =
        '//<[CDATA[\n' +
        '(function() {\n' +
        'var K=$("#status_update_form");\n' +
        'var F=K.find("textarea").isCharCounter();\n' +
        'var B=K.find("label.doing");\n' +
        'F.bind("focus blur keyup change paste",function(){setTimeout(function(M){' +
            'var L;\n' +
            'var mydiv = document.getElementById("betweetus");' +
            'if(L=M.val().match(/^\\s*@(\\w+)\\W+/)){' +
                'mydiv.style.visibility="visible";'+
            '}else{' +
                'document.getElementById("betweetus_result").innerHTML="";' +
                'mydiv.style.visibility="hidden";'+
            '}' +
        '}, 10, F)});\n' +
        '})();\n' +
        '//]]>\n';
        unsafeWindow.document.body.appendChild(script);
        
        var mydiv = document.createElement('div');
        mydiv.id="betweetus";
        mydiv.style.backgroundColor="transparent";
        mydiv.style.visibility="hidden";
        mydiv.style.left="160px";
        mydiv.style.top="28px";
        mydiv.style.width="160px";
        mydiv.style.position="absolute";
        
        mydiv.innerHTML = '<left>' +
        '<img id="betweetus_logo" src="http://cfs.tistory.com/custom/blog/1/18358/skin/images/betweetus_logo.png" alt="click here" title="Show our audience!" style="cursor: pointer;">' +
        '</left>' +
        '<div id="betweetus_result" style="background-color: #ffffff; line-height:30px; visibility: hidden;">' +
        '</div>';

        document.getElementById("status_update_box").appendChild(mydiv);
        document.getElementById('betweetus_logo').addEventListener('click', arguments.callee, true);
    } else {
        var rslt=document.getElementById("betweetus_result");
        var rsltHTML='<img id="betweetus_close" src="/images/spinner.gif" alt="close button" style="cursor: pointer;" onclick="javascript:document.getElementById(\'betweetus_result\').innerHTML =\'\'"><br/>';
        rslt.innerHTML=rsltHTML;
        rslt.style.visibility = "visible";
        var meta = document.getElementsByName("session-user-screen_name");
        var status = document.getElementById("status");
        var L=status.value.match(/^\s*@(\w+)\W+/);
        var myuri="http://pipes.yahoo.com/pipes/pipe.run?_id=45904a0e573da6200fe74cf49eaabacd&_render=json&from=" + meta[0].getAttribute('CONTENT') + "&to=" + L[1];
        GM_xmlhttpRequest({
            method: 'GET',
            url: myuri,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Accept': 'application/atom+xml,application/xml,text/xml'
            },
            onload: function(responseDetails) {
                if (responseDetails.status == 200) {
                    var myObj = eval("(" + responseDetails.responseText + ")");
                    var total_cnt = myObj.count;
                    var req = new XMLHttpRequest();
                    req.overrideMimeType('text/xml');
                    req.onreadystatechange = function(){
                        // do the thing
                        if (req.readyState == 4) {
                            // everything is good, the response is received
                            var theGrid = req.responseXML.getElementById("follow_grid");
                            var theTable = theGrid.getElementsByTagName("table")[0];
                            for( var z = 1; z < theTable.rows.length; z++) {
                                var aRow = theTable.rows[z];
                                var anId = aRow.id.match(/user_(\d+)/)[1];
                                for (var y=0; y < myObj.value.items.length; y++) {
                                    if (myObj.value.items[y].title == anId) {
                                        total_cnt--;
                                        var aTd=aRow.getElementsByTagName("td");
                                        var aStr=aTd[0].innerHTML;
                                        var aScreenName=aStr.match(/twitter\.com\/(\w+)/)[1];
                                        var aFullName;
                                        if (aTd[1].innerHTML.match(/<span class="label fullname">/)[0]) {
                                            aFullName=aTd[1].innerHTML.replace(/[\s\S]*<span class="label fullname">/,'').replace(/<\/span>[\s\S]*/,'');
                                        } else {
                                            aFullName=aScreenName;
                                        }
                                        rsltHTML += aStr.replace(/height="48"/,'height="24"').replace(/width="48"/,'width="24" title="' + aFullName + '"');
                                        break;
                                    }
                                }
                            }
                            rslt.innerHTML = rsltHTML;

                            var nextPage=req.responseXML.getElementById("pagination").getElementsByTagName("a");
                            if (total_cnt > 0 && nextPage && nextPage.length && nextPage[0].rel == "me next") {
                                
                                req.open('GET', nextPage[0].href, true);
                                req.send(null);
                            } else {
                                rslt.innerHTML = rsltHTML.replace(/\/images\/spinner\.gif/,'http://cfs.tistory.com/custom/blog/1/18358/skin/images/iconDelete.gif');
                            }
                       } else {
                           // still not ready
                       }
                    };
                    req.open('GET', '/followers', true);
                    req.send(null);
                }else{
                    alert(responseDetails.status);
                }
            }
        });
    }
}

if (unsafeWindow.$ && unsafeWindow.$.fn.isCharCounter) {
    init();
}