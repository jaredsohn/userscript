// ==UserScript==
// @name           auto_focus
// @namespace      http//example.com
// @include        *
// ==/UserScript==
(function(){
    var d = document;
    
    var settings = [
        // はてなブックマーク
        {
            site: "b.hatena.ne.jp",
            find: function(){
                var helper = function(id){
                    var f = d.getElementById(id);
                    return f && f.getElementsByTagName("input")[0];
                }
                
                return helper("tag-search-related-form") ||
                       helper("tag-search-form");
            }
        }
    ];
    
    for(var i = 0, n = settings.length; i < n; i++){
        var setting = settings[i];
        var regex = getRegex(setting.site);
        if(location.href.match(regex)){
            var found = setting.find();
            found && found.focus();
        }
    }
    
    function getRegex(s){
        s = s.replace(".", "\\.");
        s = s.replace("*", ".*");
        s = s.replace("?", "\\?");
        s = s.replace("/", "\\/");
        s = "^http:\\/\\/" + s;
        return new RegExp(s, "i");
    }
})();
