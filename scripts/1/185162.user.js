// ==UserScript==
// @name       Post Image Grabber
// @namespace  http://www.hackforums.net/member.php?action=profile&uid=746590
// @version    0.1
// @description  Grabs links to images in post for Hackforum.net
// @include     *.hackforums.net/showthread.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @copyright  2012+, tyisobred
// ==/UserScript==


function addGrab(){
    var ids;
    ids = 'grabImage';
    $('.float_right:contains("New Reply")')[0].innerHTML = '<a href="javascript:void(0);" class="bitButton" id="'+ids+'">Grab Images</a>' + $('.float_right:contains("New Reply")')[0].innerHTML;
    
    ids='#'+ids;
    $(ids).on("click", function checkimages() {
        var imgs='';
        console.log("Grabing Links");
        var post = document.getElementsByClassName('post_body');
        for(var k =0;k<post.length;k++)
        {
            var images = post[k].getElementsByTagName('img');
            for (var i=0; i<images.length; i++)
            {
                //console.log(images[i].src); 
     
                //Don't add a smiley image
                if(images[i].src.match('hackforums.net') == null)
                {
                    imgs+=images[i].src+', ';   
                }              
            }
        }
        window.prompt("Press Ctrl+C to copy page images!", imgs);
    }
            );
}


addGrab();