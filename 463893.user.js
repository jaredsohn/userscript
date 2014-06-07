// ==UserScript==
// @name       Media Hint Unlimited Trial 
// @version    0.1
// @description  The script will create and sign in to a new account (with 7 day trial) at mediahint.com if you are not already signed in. If your trial expires simply press sign out and it will automatically sign you in to a new account. Now if you use the service a lot you should definitely consider paying for it so that they can continue working on it.
// @include      *mediahint.com/
// @copyright  2014+, Popeen
// ==/UserScript==

    function makeString(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i=0; i < 8; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

	document.getElementsByTagName("input")[1].value = makeString()+'@'+makeString()+'.com';
	document.getElementsByTagName("input")[2].value = makeString();
	
	var csrf = document.getElementsByTagName("input")[0].value;
	if(csrf != null && csrf != ''){
    	document.getElementsByTagName("button")[0].click();
	}