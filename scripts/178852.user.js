// ==UserScript==
// @name        FimfictionAfterDark
// @namespace   http://fimfiction.net/
// @description Just a little experement to hide coments from mods
// @include *fimfiction.net/group/*
// @include *fimfiction.net/user/*
// @include *fimfiction.net/story/*
// @include *fimfiction.net/blog/*
// @exclude *platform.twitter.com*
// @version     0.1
// @require sjcl.js
// ==/UserScript==
//


//encryption key, change it to the key that is used by the grup you want to comunicate with
//the script is destributed with the deflount key: "forever everfree free"
__PASSWORD__= "forever everfree free"
//The dilay in miliseconds betwin every call to decryptComents function
__DecryptFriquency__=1000
    
//-------------------------Add Spoiler button

spoilerbttn= "<li><a id=\"spoilerbttn\" href=\"javascript:void(0);\" title=\"Spoiler\" class=\"right_curved_4\"><p>Spoiler</p></a></li>"
quotebttn = $("a[title|='Quote']")
quotebttn.parent().after(spoilerbttn)
$(document).on( "click", "#spoilerbttn",
    function(e){
        InsertBBCodeTag( document.getElementById( 'comment_comment' ), "spoiler" );
    }
)


//-------------------------remove all eddit buttons 
// this version does not support eddit buttons, an attempt to edditing the cipher might be bad.
$("[onclick*='ToggleEditComment']").remove()

//------------------decrypt comments 
function decryptComments(){
  $( ".comment_data" ).each(
    function( index ) {
      if($( this ).text().match(">>>>>>>>>>") !=null){
        try{
          w=sjcl.decrypt(__PASSWORD__, $( this ).text().replace(">>>>>>>>>>", "").replace("\n", ""))
          $(this).html(w)
        }catch(e){
          console.log("decryption failed!: "+e)
        }
      }
    }
  )
}
decryptComments()
window.setInterval(decryptComments, 1000);

//-------------------------thes is where the magic happans, not reallay 


//inject the dark post bottun 
darkpostbttn = "<a id=\"darkPost\" href=\"javascript:void(0);\" class=\"styled_button\" style=\"background-color:#3f433a\"> Dark </a>"
$(".add_comment_toolbar").prepend(darkpostbttn)
//huckup an event handler for the button 
$(document).on( "click", "#darkPost", 
function( e )
{
  $.post('/ajax/preview_comment.php',
    { "comment" : $("#comment_comment").val( ) },
    function(xml)
    {
      commentform=  $("form[onsubmit|='return AddComment(this);']")
      commentaria= commentform.find("textarea[name='comment']")

      // Check we actually entered a comment
      if ( $(commentform).find("textarea[name='comment']").val( ) == "" )
      {
          alert( "Please enter a comment" );
          return false;
      } 

      commenthtml=$($( "comment", xml ).text()).find(".comment_data").html()

      commentsypher=sjcl.encrypt(__PASSWORD__, commenthtml)
      sypherHidden="[spoiler]>>>>>>>>>>"+commentsypher+"[/spoiler]"
      commentaria.val(sypherHidden)
      AddComment(commentform)
      decryptComments()
    } 
  )
 } 
)
