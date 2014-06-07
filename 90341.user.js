// ==UserScript==
// @name          Auto 'Older Posts' Clicker
// @description	  Automatically and recursively click 'Older Posts' option.
// @namespace     http://www.hicegosum.com/
// @include       http://www.facebook.com/*

//Developed by Sandi Uran and Valdi Scher
// ==/UserScript==
    var fbOlderPostsRetryTimes = 0;

    function fbOlderPostsClicker(){
        ProfileStream.getInstance().showMore();
        setTimeout(document.fbOlderPostsStartWorking, 1000);
    };

    function fbOlderPostsButton(){
        var elm = document.getElementById('profile_pager_container').firstChild;
        var newElm = document.createElement('a');
        newElm.className = 'rfloat';
        newElm.setAttribute('href','#');
        newElm.setAttribute('onclick',document.fbOlderPostsStartWorking);
        newElm.innerHTML = 'Get All Older Posts';

        elm.appendChild(newElm);
    };

    function tryAppendButton() {
        var retry = false;

        try {
            fbOlderPostsButton();
        }
        catch(err) {
            retry = true;
            fbOlderPostsRetryTimes  +=1;
        }

        if (retry == true && fbOlderPostsRetryTimes < 10) setTimeout(tryAppendButton, 1000)
    }

    document.fbOlderPostsStartWorking = fbOlderPostsClicker;
    tryAppendButton();