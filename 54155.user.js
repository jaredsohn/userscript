// ==UserScript==
// @name           StackOverflow - Enhanced User Toolbar
// @namespace      StackOverflow
// @include        http://stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==

(function(){
    function GM_init() {
        if(typeof unsafeWindow.jQuery == 'undefined') { 
            window.setTimeout(GM_init, 100); 
        } else { 
            jQuery_init(unsafeWindow.jQuery);
        }
    }

    GM_init();

    function jQuery_init($) {
        var userIds = {
            so: 1950,
            su: 1467,
            sf: 3298,
            meta: 1950		
        };

        var icons = {
            so: "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf8AAAAAAAAAAGxsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FAAAAAAAAAABsbG3%2FbGxt%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsbG3%2FbGxt%2FwAAAAAAAAAAbGxt%2F2xsbf8AAAAAbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf8AAAAAbGxt%2F2xsbf8AAAAAAAAAAGxsbf9sbG3%2FAAAAAGxsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FbGxt%2F2xsbf9sbG3%2FAAAAAGxsbf9sbG3%2FAAAAAAAAAABsbG3%2FbGxt%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAVHibFE94oDxKeKRkRHiqkUx4ohlsbG3%2FbGxt%2FwAAAAAAAAAAAAAAAAAAAABLeKMPPHixUj54sIQ%2BeLC5Pniw3j54sP8%2FeK%2F%2FQXet%2F0J2q%2F9Ed6k%2BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPXiwKkF4rf9BeK3%2FQXit%2F0J3q%2BxFdqnAQ3erhTt7s1Qqg8VSFY3cWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD94rwlCeKxzRHaqUUR2qis7e7MIAAAAABiM2QwJk%2BhyA5fv4gKX7v8AmfIbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACZPoGQOX7oIDlu7tBZXs%2FwSX6%2BwJkeqCHXjmTiBy6QIAAAAAAAAAAAAAAAAAAAAAAAAAAA%2BR4QICl%2B4kA5fuhgWW7PMGlev%2FBpXr6wSY64MNjOkQJ23lTC9j5PwuZOSBAAAAAAAAAAAAAAAAAAAAAAAAAAAElu0JBpXr1QaV6%2F8GlevpBpbrfASY6xcAAAAAK2fkNi5k5PgsZuT4LGbkRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaV62wGlet%2BBZbrFQAAAAAAAAAALWTkIi1l5OUsZuT%2FLGbkWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALmPkDyxl5MssZuT%2FLGbkewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALmPkAixm5K0sZuT%2FLGbkoQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALmTkAixm5JMsZuT%2FLGbkwCxm5AcAAAAAAAAAAAAAAAAAAAAAgAEAAIAB8L%2Bf%2BQAAkAkAAJAJAACfAQAA4AcAAOAHAADggwAA%2FgEAAPABAADwIQAA%2BMP%2F%2F%2F%2BH%2F%2F%2F%2FDwAA%2Fg8AAA%3D%3D",
            su: "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAADp6ekmoqKhd6Cgn3mgoJ95oaGgeOPj4i79%2Ff0F%2Bei3YPfgn3X34J91%2BOKkb%2Fruy0L9%2FfwH%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8Ax8bGVAkIBvoPDgz4T09NyVhXVcHNzcxM%2Ff37CvXTeKjzx0%2FB88dOxO%2B0Eu7vsAb3%2BOChdf7%2B%2FgD%2F%2F%2F8A%2F%2F%2F%2FAMfGxlQJCAX6Kyop3vj4%2BBn9%2Ff0F%2Ff39Af39%2FQD9%2Ff0D%2Ff39Bf39%2FAf21Hmb768A%2FfXQbZ%2F9%2Ff0B%2F%2F%2F%2FAP%2F%2F%2FwDHxsZUCQgF%2Bi0sKt76%2BvoV%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2B%2Fv4B9tiGkO%2BvAP310Gyg%2Fv7%2BAf%2F%2F%2FwD%2F%2F%2F8Ax8bGVAkIBfotLCre%2Bvr6Ff%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2Fv7%2BAfbYhpDvrwD99dBrof79%2FQP%2F%2F%2F8A%2F%2F%2F%2FAMfGxlQJCAX6LSwq3vr6%2BhX%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP7%2B%2FgD44qVx768C%2BvG%2BMdf89eIx%2Ff39A%2F7%2B%2FgDHxsZUCQgF%2Bi0sKt76%2BvoV%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2B%2Fv4A%2Ffv2E%2FXTdJ%2FvsQj88Lcc6fXScaH8%2BO0ex8bGVAkIBfotLCre%2Bvr6Ff%2F%2F%2FwD%2F%2F%2F8A%2Fv7%2BAP7%2B%2FgD%2B%2Fv4A%2Fv7%2BAP39%2Bgr44aJ577IN%2Bu%2BxCvXzxUjF%2FPbmK8fGxlQJCAX6LSwq3vr6%2BhX%2F%2F%2F8A%2F%2F%2F%2FAPz8%2FAempqV5kZGQivf39xX55bFl77AG9%2FC3Huj668RS%2Ff37Cv7%2B%2FgDHxsZUCQgF%2Bi0sKt76%2BvoV%2F%2F%2F%2FAP%2F%2F%2FwD6%2BfkPRkVE1ignJePv7%2B8r9tiGkO%2BvAP30zWSo%2Ff39Bf%2F%2F%2FwD%2F%2F%2F8Ax8bGVAkIBfotLCre%2Bvr6Ff%2F%2F%2FwD%2F%2F%2F8A%2Ff39APT09Bnx8fAe%2Ff39BvbYhpDvrwD99dBsoP7%2B%2FgH%2F%2F%2F8A%2F%2F%2F%2FAMfGxlQJCAX6LSwq3vr6%2BhX%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP7%2B%2FgH22ISR768A%2FfXQbZ%2F9%2Ff0B%2F%2F%2F%2FAP%2F%2F%2FwDHxsZUCQgF%2Bi0sKt76%2BvoV%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP7%2B%2FgD9%2FPkM88lXtu%2BvAvz33JGD%2Fv7%2BAP%2F%2F%2FwD%2F%2F%2F8Ax8bGVAkIBfoqKSfi7u7uKfT08xL7%2B%2FsG%2Ff39AP379g%2F89uUv9dN3m%2B%2BwBvjxvznQ%2FPjsJP39%2FQD%2F%2F%2F8A%2F%2F%2F%2FAMjIyFMMCwn6CQgG%2FQ8ODPcVFBLzu7u6Xv39%2BwrzyFS977IM8PC4H%2BX21X6X%2FPjrI%2F7%2B%2FgD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD19fUV0tLSUNHR0FPR0dBT0tLSUPLy8hn9%2Ff0A%2FPfpKfz25iv9%2FPoR%2Fv7%2BAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F8AAIYPAACfxwAAn8cAAJ%2FHAACf5wAAn%2BEAAJ%2FxAACfZwAAnkcAAJ%2FHAACfxwAAn8cAAJ%2BPAACGHwAA%2F%2F8AAA%3D%3D",
            sf: "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwkIABcXLwBcWloAGx2fACMhmAArHewAFiHtAC8s5gAhJOsALSjpADEn6wCtqagA1NLRAN3V1gD%2F%2F%2F8AAAABABABEREAEAAAAAEREQABAQEAARERAAAAAAAAAAAzMzMzMwIiIjMzMzMzAiIiMzMzMzMCIiIAAAAAAAAAAMzMzMzMBVVUzMzMzMwFVVXMzMzMzAVVVQAAAAAAAAAA3d3d3d0Kiqrd3d3d3gqqp93d3d3dCma5AAAAAAAAAAAAIP%2F%2FACD%2F%2FwAg%2F%2F%2F%2F%2F%2F%2F%2FACD%2F%2FwAg%2F%2F8AIP%2F%2F%2F%2F%2F%2F%2FwAg%2F%2F8AIP%2F%2FACD%2F%2F%2F%2F%2F%2F%2F8AIP%2F%2FACD%2F%2FwAg%2F%2F%2F%2F%2F%2F%2F%2F",
            meta: "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP8AAAAAAAAAAGxsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FAAAAAAAAAABsbGz%2FbGxs%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABsbGz%2FbGxs%2FwAAAAAAAAAAbGxs%2F2xsbP8AAAAAbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP8AAAAAbGxs%2F2xsbP8AAAAAAAAAAGxsbP9sbGz%2FAAAAAGxsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FbGxs%2F2xsbP9sbGz%2FAAAAAGxsbP9sbGz%2FAAAAAAAAAABsbGz%2FbGxs%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAfn5%2BFH9%2FfzyAgIBkgYGBkX9%2FfxhsbGz%2FbGxs%2FwAAAAAAAAAAAAAAAAAAAAB%2Ff38OgoKCUoKCgoWCgoK5goKC34KCgv%2BCgoL%2FgYGB%2F4CAgP%2BAgIA%2BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgoKCKoGBgf%2BBgYH%2FgYGB%2F4CAgO1%2Ff3%2FBgICAhYSEhFSNjY1Sl5eXWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIKCggiBgYFygICAUICAgCqEhIQIAAAAAJaWlgydnZ1yoaGh46CgoP%2BioqIaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnZ2dGKCgoIOgoKDtn5%2Bf%2F6CgoO2cnJyDjo6OToyMjAIAAAAAAAAAAAAAAAAAAAAAAAAAAJqamgKgoKAkoKCgh5%2Bfn%2FOfn5%2F%2Fn5%2Bf66CgoIOZmZkQiYmJTIODg%2F2EhISBAAAAAAAAAAAAAAAAAAAAAAAAAACgoKAIn5%2Bf1Z%2Bfn%2F%2Bfn5%2Fpn5%2BffKCgoBYAAAAAhYWFNoSEhPmFhYX5hYWFRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ%2Bfn2yfn59%2Bn5%2BfFAAAAAAAAAAAhISEIoSEhOWFhYX%2FhYWFWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAg4ODDoSEhMuFhYX%2FhYWFegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAg4ODAoWFha2FhYX%2FhYWFoQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhISEAoWFhZOFhYX%2FhYWFwYWFhQYAAAAAAAAAAAAAAAAAAAAAgAH%2F%2F4AB%2F%2F%2Bf%2Bf%2F%2FkAn%2F%2F5AJ%2F%2F%2BfAf%2F%2F4Af%2F%2F%2BAH%2F%2F%2Fgg%2F%2F%2F%2FgH%2F%2F%2FAB%2F%2F%2FwIf%2F%2F%2BMP%2F%2F%2F%2BH%2F%2F%2F%2FD%2F%2F%2F%2Fg%2F%2F%2Fw%3D%3D"
        };

        var badgeLocation = $('#hlinks');
        var messages = badgeLocation.children('a:first').clone();
        var logout = badgeLocation.children('a[href*=logout]:first').clone();
        var todaysReputationUrl = getTodaysReputationUrl();
        var todaysReputationLocation = " div#tabs a[href^='/users/recent/'][href*='tab=reputation']:first span.bounty-indicator-tab:first";
        var lsep = '<span class="lsep">|</span>';
        var cache = $('<div></div>');

        function getTodaysReputationUrl() {
            function ensureNumberPadded(num) {
                if(num < 10) return '0' + num;
                return num;
            }

            var today = new Date();
            var todayUTC = today.getUTCFullYear() + '-' + ensureNumberPadded(today.getUTCMonth() + 1) + '-' + ensureNumberPadded(today.getUTCDate());
            var url = ($("#topbar a[href^='/users/recent/']:first").attr('href').match(/^[^?]+/))[0] + '?StartDate=' + todayUTC + '&EndDate=' + todayUTC;
            var result = url;
            return result;
        }

        function addProfileInfo(title, data, image) {
            cache
                .append(lsep)
                .append(' ')
                .append("<a id='user-'" + title + " href='" + data.profileUrl + "'><img src='" + image + "' title='" + title + "' style='padding:1px'></a>")
                .append(' ')
                .append("<span class='reputation-score'>" + data.reputation + "</span>")
                .append(data.badgeHtml + " ");
        }

        function begin() {
            if (badgeLocation.children('a[href*=logout]').length) {
                stackoverflow();
            }
        }

        function stackoverflow() {
            $.getJSON('http://stackoverflow.com/users/flair/' + userIds.so + '.json?callback=?', function(data){
                addProfileInfo('so', data, icons.so);
                superuser();
            });
        }

        function superuser() {
            $.getJSON('http://superuser.com/users/flair/' + userIds.su + '.json?callback=?', function(data){
                addProfileInfo('su', data, icons.su);
                serverfault();
            });
        }

        function serverfault() {
            $.getJSON('http://serverfault.com/users/flair/' + userIds.sf + '.json?callback=?', function(data){
                addProfileInfo('sf', data, icons.sf);
                meta();
            });
        }

        function meta() {
            $.getJSON('http://meta.stackoverflow.com/users/flair/' + userIds.meta + '.json?callback=?', function(data){
                addProfileInfo('meta', data, icons.meta);
                finalize();
            });
        }

        function finalize() {
            var url = todaysReputationUrl + todaysReputationLocation;
            $('<span></span>').load(url, function() {
                var repToday = $(this).text();
                $(this).remove();
                if(!repToday) repToday = 0;
                var repToday = parseInt(repToday, 10);

                var color = (repToday < 200) 
                    ? '#75845C'     // Greenish
                    : '#9A4444';    // Redish

                $('#search input').css('max-width', '100px');

                var badgeLocation = $('#hlinks');

                badgeLocation.css('margin-right', '10px');
                badgeLocation.empty();

                badgeLocation.append(messages)
                    .append(' ')
                    .append(lsep)
                    .append(' ')
                    .append('<span title="you have earned ' + repToday + ' reputation today" class="reputation-score"><a href="' + todaysReputationUrl + '" style="color:' + color + ';">' + repToday + '</a></span>')
                    .append(' ')
                    .append(cache.html())
                    .append(lsep)
                    .append(' ')
                    .append(logout);
            });
        }

        begin();
    }
})();