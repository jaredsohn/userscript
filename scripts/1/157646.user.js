// ==UserScript==
// @name       tumblr dashboard
// @namespace  http://www.tumblr.com/
// @version    0.3
// @description  pagestate update, repair html5 video, and remove old posts on scroll. tested in chrome V24.0.1312.56 / tampermonkey 
// @match      http://www.tumblr.com/dashboard*
// @copyright  2012+, jeremiah
// ==/UserScript==


(function(){
    
    function GM_wait()
    {
        if(typeof unsafeWindow.jQuery == 'undefined')
            window.setTimeout(GM_wait,100);
        else
            unsafeWindow.jQuery(function() { letsJQuery(unsafeWindow.jQuery); });
    }
    GM_wait();
    
    function letsJQuery($)
    {
        Tumblr_Wait();
        Repair_Video();
        
        function Tumblr_Wait() {
            if (typeof unsafeWindow.Tumblr == 'undefined') {
                window.setTimeout(Tumblr_Wait, 100);
            } else {
                window.clearTimeout(Tumblr_Wait);
                Dashboard_Update();
            }
        }
        
        function getDomain (thestring) {
            var urlpattern = new RegExp("(http|ftp|https)://(.*?)/.*$");
            var parsedurl = thestring.match(urlpattern);
            return parsedurl[2];
        }
        
        function Repair_Video() {
            
            $('li.video').each(function(){ 
                
                var $this   = $(this);
                var id      = $this.attr("id").split("_")[1];
                var blog    = getDomain ( $this.find('div.avatar_and_i a.post_avatar').attr('href') );
                var url     = 'http://api.tumblr.com/v2/blog/' + blog + '/posts/?&api_key=7DeVSiM7596zTgfTk3imOdUSSYgXBRTGkkol6gobxgecFdNroy&id=' + id;
                
                $.ajax({
                    url: 'http://api.tumblr.com/v2/blog/' + blog + '/posts/?&api_key=7DeVSiM7596zTgfTk3imOdUSSYgXBRTGkkol6gobxgecFdNroy&id=' + id,
                    dataType: 'jsonp',
                    timeout: 10000,
                    success: function(data){
                    var src    = data.response.posts[0]["video_url"];
                    var width  = data.response.posts[0]["thumbnail_width"];
                    var height = data.response.posts[0]["thumbnail_height"];
                    var poster = data.response.posts[0]["thumbnail_url"];
                    if ( src != undefined ) {
                    var video  = '<video width="' + width + '" height="' + height + '" poster="' + poster + '" controls autobuffer>' + '<source src="' + src + '" type="video/mp4"></video>';
                    $this.find('div.tumblr_video_container').html(video);
                }
                       }
                       });
                
                
                
            });
            
        }
        
        
        function Dashboard_Update() {
            
            unsafeWindow.AutoPaginator.trigger = function(a) { 
                
                if (a == 'before') {
                    
                    $('#posts li:last-child').prev().prev().prev().prev().prevAll().remove();   
                    var nextP = $("#pagination a#next_page_link").attr('href');
                    history.pushState(null, "Tumblr", unsafeWindow.next_page);                
                    
                }
                
                if (a == 'after') {
                    
                    Repair_Video();
                    
                }
                
            };
            
        }
    }
    
    
})();