// ==UserScript==
// @name           HTML Item List Creator
// @description    Auto create item lists  from wowhead.com comparisons
// @namespace      http://mogboutique.tumblr.com/
// @author         http://mogboutique.tumblr.com/
// @include        http://*.wowhead.com/compare?items*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant          none
// ==/UserScript==

$('#su_table').before("<div id='html_item_list' style='border:1px dashed;margin-botto:20px;padding:20px;'><h3>Hi! This is HTML Item List Creator.</h3>Select 'Split' from drop-down menu below, then click<br /> <button id='autobtn'>this button</button> to auto generate item list in HTML format.<br />For updates, visit <a href='http://mogboutique.tumblr.com/tagged/scripts'>http://mogboutique.tumblr.com/tagged/scripts</a>.<br /><textarea id='autoitems' style='display:none;width:100%;height:110px;background:transparent;border:1px solid;color:green;text-shadow:0 0 3px green;' spellcheck='false'></textarea></div>");

$('#autobtn').click(check);

function check(){
     if($('.summary-textnames').html().length>1) createList();

}

function createList(){
    text = $('.summary-textnames').html();
    
    var fakeDiv= $('<div></div>');
    fakeDiv.html(text);
    
    fakeDiv
     .contents()
    .filter(function() {
      return this.nodeType == 3;
    }).replaceWith('<br />');
    

    $(fakeDiv.contents('br')[0]).remove();
    fakeDiv.append('<br />');

    
    text =  fakeDiv.html();
    
    baseURI = document.baseURI;
    var uri = baseURI.match(/http:\/\/[a-z]+.wowhead.com\//)[0];
    
    if(uri)  {
     text = text.replace(/href\=\"\//g,'href=\"'+ uri);

     $('#autoitems').text(text).fadeIn() ;
    }
    else {
      $('#autoitems').text('Error :(').fadeIn() ;
    }
}
