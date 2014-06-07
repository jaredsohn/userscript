// ==UserScript==
// @name            New MCL
// @homepageURL     http://userscripts.org/scripts/show/462361
// @updateURL       https://userscripts.org/scripts/source/462361.meta.js
// @namespace       http://Johnny.Bravo/GreaseMonkey
// @description     Stuff for new MCL
// @include         http://mycoffeelounge.net.au/*
// @version         1.5.1
// @date            2014-04-20
// @icon            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gQPCwgacO39+gAADZRJREFUeNrlm3mQHcV9xz/dPbNvD620EkJISCPNovsADDIxhwuI5RCHUKmUw4PKYTsxjgtiwKGgjI2MTRwqdoED4bKNE6gKJDYwSbjiAhHZIhCQMQTbSF4ktEKzmpW0SEhIe7xrZrrzx+v3NCyr1a68K63irno1b6Zn+s3v29/f0b/+PcFRbHnPPw0oAnuCKNzPBGhynAWuHS/Pe/71wNYgCrcAE0J4jpLwa/Oe/3l+E1pG6En2+IO85+/6TRP+q/bYnPd8k/f8O2t92fsmSnPGSvggCsl7/qNBFF5uhWy03a2Z+6YGUfjeRAJgTIygFf6jwPLaOZDW5LbnAAsmGgucMRzrP4B/ypz32ePkvOefDfwUeD3v+RuCKDz1/xUD8p7vACcCS2qzG0ShBj5nb1kPnGBZsSrv+YW85398ItgFMYZG0AD9QRS2ZgQSwC7gJHu+OIjCt+z964ALgE8BjwdRWDjeA6EbgEl5z38to/MmiMKZQL8935z3/MstQ34b+BBwMzCQ9/xH8p5/xtFmhRij2a+NtQOYBbwDnBlE4c6Mh9hp+wCeAy4JojC2z38G+J71HHuBS4MofP648gKAAWYDXZbyO/Kef0PmnpOtIQS4CKjkPb9mDP85iMIm238CsC7v+WHe873xZsOYqUANhCAKfeBJe/l2wOQ9/yP2nnOAr2ceeyPv+V+wDKn1/4Ptmwdsz3v+79T6J7QRHCIoOht4Fphiu14GLg6i8EDe8ycDmzIq8UgQhX+cefbrwC2ZYU8PovCN4wKAIQB5BvhE5tLyIAo7bN8aqw4ADwZReEUGhOetl6g1ZV3r8QNARpiVwP9kwuMTgXdt37eAG+31hUEUdmaerwCuPZ0dROHO4yofUHOHQRT+rzVye21XT0bvvww8bq+/OsizbMwM5x13CZEh2DAdKAEq7/knZAD6JKCBtrznqwx4j2WG2D4ehvCoAZAJjmpSfHzQLbXFk84wICvx7swYx5URlPZ3akcHGADm2IDJBFGY5j0/Bh4KovCKzLN9wCTg1CAKN9ZsyjEDIPsCec/PAS32Bc8AVgIr7JJ3HjDZDDOWGURDc/BaL9AjYZepeoHNGlZr6DCwX0LZgWIQhcVjAYACVgEPAzNMZhAXcIVAAU0IZkrJDCk5QQrahGSyELQKQY/WzJKSmVLhWjpcO9DPZxsbOVU5xEBBG75Y6OPShhztSnHAGPZpzW6j6dGad7QmrurMC2Vjnhgw5tEYs+u57u1m3ADIe/5UYJ+xwk4SgnPdBs5xHHypSI1BWwU2w8z6y2nCeepgGuK/4pgWITjXceoG4NqBPr7RPIlpQgxrvBSghOD1NOGBUrGwR+vpT3V3jYoZo0mIvGKA812XzzU0EmcELRkzLKoZenOOcqhFM5vTlCVKMVvKOngPlkt8t6UVPYzK1IDSQGIMS6RidVNz81cLAy8BZ445A2ws/9N5UhEDO3TKpQ05znddlKm+XAHYkqZ06ZQerXnXaN4zhj6jMYghf8gBkkGzepBBhmYEU4XkZClZpBRLlcN0cXCsA8CzlTL/ncSc6Tic57jcUhg4ZYaU20ZqLEfKgL9IgctyORZLRQm4rVjg8UqZxKJ4KCTdw2DsDjpXmblJgD1GsyfV/DJNgHKdCTVVXKIUD7S0IoBmIZit1Ok/2L5t22Cj/esCcLkAzlAOA8aQA25uasYBfqFTHiuX2KM16TD6P1YW2wFmK8WfNjSyQMp68ACQGPCkXA48sfzkOfI0x3VP8efPLBgzZ7lyOvqN6bth25bk7vaFXLtty8gAsJa/rU2I99EVS98VUrGiqaXu6Du15uUk5rUkpmQNoxklMCITOLRJyYcdh3MdlzlCvs/IpkPrc+8fef6nvtDY9NBZGXtTsxsrFixd/YnON//utYXL+PCWjsPbALvL0zdNSu5saqFyBILUKNujNe8YzX5jGDAGYyk/SQimCclJUjLdWn5zCOM3XGsUgjtKRa7JNZJagfuMoQjMEKIe9vYa8+TczRv/cERGMO/5rUDvFCG5p3lSRgsnbnOAW0sFOtMUYQmoQeQbcuL33AZMFZiLvc0bnxmJDYgBKhiEGGclH4PWgOC6Yh/7tEHAN4MovKmusnPmbViqnBXzpMTAdcAzh10MBVFYAigYc/RWTr+GkbyvXGCvNtjE6k3ZFWSDEBe9lMQ1d3vBqFaDCfCu1hMagARYnyQIWBdE4b8PdoNBFO6KDYkAEkzDaAD4pQQ263RCz/7d5WItjrh60BK83hYo6aRA2VTt+UjjgJcknP7zJOEM5UxIAJqEYFOSAOyt5RzfF8h4Pgn8+UcdFwPsM/qF0TDgxwLo0inOBGXA2rhSi1NWD9X/aBRya1PL39ciyLVx/I8jAsAakQ6AnVqTE2LCCS+BdXFcE+YnQxVk7Fy84kezpJwG8GKS7PubsPOxEamA1aNNec8nBdYnMadNMDVoEIIeo2vvu2VwAufFhUujZiHmYAOjO0uFS44kJ/i0Ap6NK0w0DuzRmv7qkvzb2VnvM+Y76xcu06cpZ05N2FuLA19a0921/kgA+A5AmGqaJpgavJDU6f99G7r/52fntpcfaGm9aplSwgBFDF8s9N9y//Ztt2dVZERctg/8DKCE4dUkYblSEwaA3Vpjg9SfC0HLjY0tLJCyvrx+Lol5tFz6g0ej8OnBscFoc4IvA+fMV4qvNDZPmKg4BtYlFc5SLlMtOxUQas195eKvtqTpuT/u7uodKj8w2uj2pqoapDRPIDVwgd91GpguBE1CsCau8NeFga1fKfQv+l7X2yumCdF7qMBo1FLkPd9o4NO5Ri5w3GMuvLLh7ytpTFea0m/M3+435t5nu7t2j3VStNa+JOG2NXGFVY77gSTJ0W4PlsusS8pXa8MPn+ru2pf1AiONIUYz+wAPYJMbu8yxXRw1CcErSWXrE1HXfTkh9g2KXUbMoBG3jt79dPTuLy6f0uZJOLMz1VzousfMGN5fKdGZpudu7j2wt6P3yArQj8QGAMwA3tHAfS2t9U3/oz37n+nvJa06gQNUS/B7gDXAvwVRuGnMABi0JziPam3faqBxnlR8ramZo6kMArirXOSN6tr/UC2lWrD1IvDlIAp7hnKDhwXgMs9vq2BuTAyXSMEpS5TTvEQqfKW4o1ggJwTfbJrEDHn03OJebbiu0IcUAmfkNN4B3B1E4W1ZIMRQM/2R2d6sNiHvOstxz1/pOCfNl4ppQtAmRD3FbYD1acwDpRLThOSO5pZq8nCcWw7BVYU+rm9splkI9hvNm2nKz5KYt3WKizica3sPOC+IwjfrANQEP2u2d+GVuebvr3TUwrl293a4zU4BXFfop9cYPtmQ42K3YdwB+JdymX4Mf5VrrKudsNa8DOzSmg1pwtNxhYIxDBOprAReF9f487kn3Mpj8xevO89xL5wsBKNJfO03hmsG+mgSgvtaWhnP0OgtnXJ7scD9La3D+u/qDpKg26T8JI55Ji6T+6CiHAiisE0AvLZoWcdiqZaONuPXgOCFJOaRSokBY2gVgu+2tFI0Y+8Yu3TKzYUBrmxsos/AKtcdURQngX5juLdcZEv6AQk/5GxetPyyWVKOWviiMVxf7Oc9K2zZ7vR8fqCPi9wGVrkubUKSGHNEe4a1rbGcEDxULvNkpcTVTc2coxwU0K01BphVzfEfsmlgmpTMFJK3SAfzoEm8unDZBYuUen40L+gAq4sD7NCa0xyH33cbaJeKH8UVflgukRMCDUwRghlC0iYF04Vkuv3eiqBRgGMXVKkxlAz0YXhPG3ablD4DB4ymI02ZLSVX5BqZL1VdWAV0G80scWhlaBSCDWnCw+US3Vp/IOoLorD6Bk8tWHLXx5yGa5MRzpME/mygjxbgqsYmznZcYjvTJWBTmtCRpnTqlG6d0qsPbqpkfyG7/1f7nCgknpK0S8UCpWiXihlC1D1MA4LIpOzSmlMtG96vltBn4NmkzPo4ocfoQ9mlTwdR+LC4Zt587unayjfaF/zJ2Y77rxc4LmW7qzscPTemCd8qFnBtwYIvq5Ue7UoxVyo8KTnRznDF6mHBVJPxsVUXAEdUXVuTEEyyY5kMOkpU/f6v0oTQpMwWinYp61UlLiCFYEOS8Goa82aasl1XhR4mPrgyiML7hwqE5BVz269arpyvLVVqxkrHZYoQ9dkdXNm1XWuejsu8liRUjMGxAlTLVwwSUS+OarFCNorqLLqiSuNavUdiDGWq5Tb9xoCAqUIyTQg8KVmsHHwpqQBvpylbdEpnmrJdp3TZjNAIjOJa4C+DKAwPGwleOGfuYhcumSPVZTOl/K1ZQjJPKeZKyclSMdXqubSfd4xmh9bs1Jrduloe028MRWOIMfV7lRDkqFaSTZGCNgTTpGSK3SJvFQJEtVKsx1TH69Gad+3W+rtaI2012giXsr3AvcD9QRRuH3FKbPCNec8/K4bztDEfM3C+REyZLKuzO0kImq1hyyHICeoRmayxwrIoobrTXDbVRGXBAlUwprqXb0zVA9j9fDn6FVu/nek1wNpa8fWhymWOOIC3lSMrgCXAIvtZALRz8E9S49m2AZ1U/3fQQbWw+hdBFPaP63L4cEwZtGyeSbU0fqr9tFKtLG0GcjUbZt+jVvkW26i2QLWktrbU3Uv1b/d7RvoOI2n/B0ca7wKEj5PJAAAAAElFTkSuQmCC
// ==/UserScript==

var locn = '/search.php?search_id=active_topics';
var postbox = document.querySelector('textarea[name="message"]');
var submit = document.querySelector('input[type="submit"][name="post"]');
if(postbox && submit) {
    postbox.addEventListener('keydown', 
        function(e) {
            if(e.key === 'Enter' && e.ctrlKey) {
                submit.click();
            }
        }
    );
}
try {
    document.querySelector('div.navbar ul.linklist.leftside li.icon-ucp').insertAdjacentHTML('beforeend','&bullet; <a href=".' + locn + '">Recent Posts</a>');
}
catch(e) {
}

if(/search\.php\?search_id=active_topics/.test(document.location)) {
    var interval = 30000;
    var topicList = 'ul.topiclist.topics';
    var topicRow = topicList + '>li.row';
    var dateSelector = 'dl>dd.lastpost>span>a+a+br';
    var idSelector = 'dl>dt>a.topictitle';
    var postcountSelector = 'dl>dd.posts';
    var navSelector = 'div.navbar';
    var inboxSelector = navSelector + ' ul.linklist.leftside li.icon-ucp a[href$="inbox"]';
    var dest = document.querySelector(topicList);
    var current = dest.innerHTML;
    var url = document.location.origin + locn;
    var allTopics = {};
    GM_addStyle('.row.bg1.changed{background-color:#CCCCFF;}.row.bg2.changed{background-color:#BBBBFF;}.row.bg3.changed{background-color:#AAAAFF;}');
    
    function getPostDate(el) {
        try {
            return new Date(el.querySelector(dateSelector).nextSibling.textContent);
        }
        catch(e) {
            return new Date();
        }
    }
    function getTopicInfo(el) {
        var a = el.querySelector(idSelector).href;
        var s = a.lastIndexOf('/');
        var d = a.indexOf('.', s);
        return {
            id:a.substring(s+6, d),
            posts:parseInt(el.querySelector(postcountSelector).textContent),
            date:getPostDate(el)
        }
    }
    Array.prototype.slice.call(document.querySelectorAll(topicRow)).forEach(
        function(topic, indx) {
            var x = getTopicInfo(topic);
            allTopics[x.id] = x;
        }
    );
    var loadDate = getPostDate(dest);
    setInterval(
        function() {
            GM_xmlhttpRequest( {
                method: 'GET',
                url: url,
                headers: {
                    'User-Agent': window.navigator.userAgent,
                    'Accept': 'text/html,text/xml,text/plain'
                },
                onload: function(response) {
                    var parser = new DOMParser();
                    var htmlDoc = parser.parseFromString(response.responseText,"text/html");
                    var topics = htmlDoc.querySelector(topicList);
                    if(topics.innerHTML != current) {
                        current = dest.innerHTML = topics.innerHTML;
                        Array.prototype.slice.call(document.querySelectorAll(topicRow)).forEach(
                            function(topic, indx) {
                                var x = getTopicInfo(topic);
                                var all = allTopics[x.id];
                                var changed = false;
                                if(!all || x.posts > all.posts || x.date > loadDate || x.date > all.date) {
                                    topic.className += ' changed';
                                }
                            }
                        );
                    }
                    var cmsgs = document.querySelector(inboxSelector);
                    var xmsgs = htmlDoc.querySelector(inboxSelector);
                    var nav = document.querySelector(navSelector);
                    xmsgs.innerHTML = cmsgs.innerHTML;
                    if(cmsgs.textContent !== '0 new messages') {
                        nav.classList.add('newmessages');
                    }
                    else {
                        nav.classList.remove('newmessages');
                    }
                }
            });
        }, interval
    );
}