// ==UserScript==
// @name            Auto-Fill Delicious.com v5's Tag Field
// @description     Makes the 'Save a Bookmark on Delicious' page prefill the tags field with the tag string in the URL. The need for this script arose in July 2008 when delicious.com was updated to v5. For more info, see http://decafbad.com/blog/2008/08/02/delicious-20-legacy-bookmarklet-fix
// @date            2008-11-17
// @creator         Zeke Sikelianos (zeke.sikelianos.com), based 99% off a script written by Leslie Michael Orchard (decafbad.com).
// @namespace       http://zeke.sikelianos.com
// @include         http://delicious.com/save*
// ==/UserScript==

(function() {

    function $(id) {
        return document.getElementById(id);
    };
    
    return {

        init: function() {

            var qparams = this.parseQueryString();

            var param_field_map = {
                'url':         'url',
                'description': 'title',
                'extended':    'notes',
                'tags':        'tags',
                'jump':        'jump'
            };

            for (k in param_field_map) {
                if (!param_field_map.hasOwnProperty(k)) 
                    continue;
                var field = $(param_field_map[k]);
								if (qparams[k] && field && !field.value) {
                    field.value = qparams[k].pop();
                }
            }

        },

        /**
         * see: http://www.safalra.com/web-design/javascript/parsing-query-strings/parseQueryString.js
         */
        parseQueryString: function(queryString){

            // define an object to contain the parsed query data
            var result = {};

            // if a query string wasn't specified, use the query string from the URI
            if (queryString == undefined){
                queryString = location.search ? location.search : '';
            }

            // remove the leading question mark from the query string if it is present
            if (queryString.charAt(0) == '?') queryString = queryString.substring(1);

            // replace plus signs in the query string with spaces
            queryString = queryString.split('+').join(' ');

            // split the query string around ampersands and semicolons
            var queryComponents = queryString.split(/[&;]/g);

            // loop over the query string components
            for (var i = 0; i < queryComponents.length; i++){

                // extract this component's key-value pair
                var keyValuePair = queryComponents[i].split('=');
                var key = decodeURIComponent(keyValuePair[0]);
                var value = decodeURIComponent(keyValuePair[1]);

                // update the parsed query data with this component's key-value pair
                if (!result[key]) result[key] = [];
                result[key].push((keyValuePair.length == 1) ? '' : value);

            }

            // return the parsed query data
            return result;
        },

        EOF:null

    };

}()).init();
