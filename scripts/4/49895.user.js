// ==UserScript==

// @name           Reddit Instameme

// @namespace      http://bobsworthindustries.com

// @include        http://*.reddit.com/*/comments*

// ==/UserScript==





// This code isn't pretty



$ = unsafeWindow.jQuery;







$.getJSON("/r/redditmemes/top/.json?t=all", function(json){

    stories = json.data.children;

    categories = "";



    for(x=0;x<stories.length;x++){



        title = stories[x].data.title;



        if(title.indexOf("(nolist)") == -1){

        id = stories[x].data.id;



        categories += '<option value="' + id + '">' + title + '</option>';

        }

    }



    $('<select style="width:150px;"  class="memeselect"><option value="titlelabel" style="font-weight: bold; text-decoration: underline;">Insert Meme</option>'

        + categories + '<option value="redditmemelink" style="text-decoration:underline">Add and vote on memes</option></select>').appendTo('.usertext-buttons').change(function(e){

        



        $('.memes').remove();



        meme = $(e.target).val()



        if(meme == "redditmemelink"){document.location="http://reddit.com/r/redditmemes"; return 0;}





        if (meme && meme!="titlelabel"){



            $(e.target.form).append("<div class='memes' style='border:1px solid #336699; height:200px; width: 500px; overflow:auto; margin-left:20px; margin-bottom:20px;'><a onclick='$(\".memes\").remove(); $(\".memeselect\").val(\"titlelabel\");' style='cursor:pointer; position:absolute; margin-left:510px;'>close</a><ul><li>Loading...</ul></li></div>");



            //$('.memes').



            $.getJSON("/comments/" + $(e.target).val() + "/.json", function(json){

                comments=json[1].data.children;

                commentlist = "";



                for(x=0;x<comments.length;x++){



                    body=comments[x].data.body;

        if(body.indexOf("(nolist)") == -1){

                    parts = body.split(/^-+/m);



                    title=parts[0];



                    if(parts.length > 1){

                      main=parts[1];

                    }

                    else{

                      main=title;

                    }



                    commentlist += '<li rel="' + escape(main) + '" style="cursor:pointer; margin-bottom:5px;">' + title + '</li>';

                }



                }



                $('.memes ul').html(commentlist);



                $('.memes li').click(function(e){

                    //unsafeWindow.test = e;

                    commentbox=$(e.target).parent().parent().parent().children('.usertext-edit').children('div').children('textarea')[0];

                    commentbox.focus();

                    commentbox.value += entities_decode(linebreaktrim(unescape(e.target.getAttribute('rel')))) + " ";



                });



            });



        }

    });

});









function entities_decode(str){

var temp=document.createElement("pre");

temp.innerHTML=str;

return temp.firstChild.nodeValue;

}



function linebreaktrim(s){

	return s.replace(/^\s+/,"");


}






