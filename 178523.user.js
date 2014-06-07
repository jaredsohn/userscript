// ==UserScript==
// @name       KongShoutCleaner
// @namespace  http://use.i.E.your.homepage/
// @version    0.9
// @description  Delete all shouts from your messages on Kongregate
// @match      http://www.kongregate.com/accounts/*
// @copyright  2013+, Cacowned
// ==/UserScript==

var d = document;
if(window.top == window.self && /^http:\/\/www\.kongregate\.com\/accounts\/(?:\w*)\/(?:\w*)/i.test(d.location.href) )
{
    var Match = d.location.href.match(/\/accounts\/([^\/]+)/);
    //console.log(Match);
    if(Match)
    {
        var name = Match[1];

        //console.log(name);
        var shouts = d.getElementsByClassName('new_comment_link');
        if (shouts && shouts.length > 0)
        {
            var result = confirm("Found " +shouts.length + " shout(s)/message(s). Do you want to delete them all?");
            if(result == true)
            {
                    
                for (var i = 0; i < shouts.length; i++)
                {
                    var deleteLink = shouts[i].getElementsByTagName('a');
                    if(deleteLink)
                    {
                        var outer = deleteLink[0].outerHTML;
                        
                        var id = outer.match(/(\d+)/g);
                        //console.log(id);
                       
                          new Ajax.Request('/accounts/'+name+'/messages/'+id+'.js', {asynchronous:true, evalScripts:true, method:'delete'});  
                        //new Ajax.Request('/accounts/'+name+'/messages/'+id+'.js', {asynchronous:true, evalScripts:true, method:'delete', onSuccess:function(request){window.location.reload()}});  
                    }
                }
                //window.location.reload();
            }
        }
    }
}