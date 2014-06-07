// ==UserScript==
// @name            LiveLeak Download Videos
// @description     This script will add a download button to every LiveLeak video.
// @include         http://liveleak.com/view*
// @include         http://www.liveleak.com/view*
//
// @version        1.1
// ==/UserScript==

// ==ChangeLog==
// @history        1.1  Servers upgraded
// @history        1.00 Initial release.
// ==/ChangeLog==

var zNode       = document.createElement ('div');
zNode.innerHTML = '<input id=buttonx value="Download Video" style=width:150px;color:green; type=submit>';
zNode.setAttribute ('id', 'containx');
document.body.appendChild (zNode);

document.getElementById ("buttonx").addEventListener ("click", buttonxClickAction, false);

function buttonxClickAction (zEvent)
{
    var zNode       = document.createElement ('p');
    window.location = "http://www.multivideograbber.com/download.php?video=" + location.href
    document.getElementById ("containx").appendChild (zNode);
}

GM_addStyle ( (<><![CDATA[
    #containx {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              20px;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    #buttonx {
        cursor:                 pointer;
		
    }
	input,textarea{padding:9px;border:solid 1px #E5E5E5;outline:0;font:normal 13px/100% Verdana,Tahoma,sans-serif;background:#FFF url('bg_form.png') left top repeat-x;background:-webkit-gradient(linear,left top,left 25,from(#FFF),color-stop(4%,#EEE),to(#FFF));background:-moz-linear-gradient(top,#FFF,#EEE 1px,#FFF 25px);box-shadow:rgba(0,0,0,0.1) 0px 0px 8px;-moz-box-shadow:rgba(0,0,0,0.1) 0px 0px 8px;-webkit-box-shadow:rgba(0,0,0,0.1) 0px 0px 8px}
    #containx p {
        color:                  red;
        background:             white;
    }
]]></>).toString () );
