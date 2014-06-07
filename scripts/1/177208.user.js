// ==UserScript==
// @id             what-yadg
// @name           G/T - YADG
// @description    This script provides integration with online description generator YADG (http://yadg.cc)
// @version        0.5.4
// @namespace      yadg
// @include        http*://*gtracker.installgentoo.com/upload.php*
//@include        http*://*gtracker.installgentoo.com/requests.php*
// @include        http*://*gtracker.installgentoo.com/torrents.php*
// ==/UserScript==


// --------- USER SETTINGS START ---------

/*
 Here you can set site specific default formats.
 You can find a list of available formats at: http://yadg.cc/api/v1/formats/
*/
var defaultWhatFormat = "gtrackerinstallgentoo",
    defaultWafflesFormat = "wafflesfm";

// --------- USER SETTINGS END ---------



// --------- THIRD PARTY CODE AREA START ---------

// Copyright (c) 2011, Patrick "p2k" Schneider, et al - https://github.com/p2k/GLaDOS-Enhancer-Plus/
// This work is licensed under the Creative Commons Attribution 3.0 Unported License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/
var _runSandboxedJSONPCounterYADG = 0;
var runSandboxedJSONPYADG = function (url, callback, additional_data, failed_callback, jsonp) {
    if (jsonp === undefined) // Optional name of the query field, defaults to "jsonp"
        jsonp = "callback";
    var serviceHatchId = "YADG_jsonp_hatch_" + _runSandboxedJSONPCounterYADG;
    _runSandboxedJSONPCounterYADG++;
    
    var jsonpServiceHatch = document.createElement("div");
    jsonpServiceHatch.setAttribute("id", serviceHatchId);
    jsonpServiceHatch.setAttribute("style", "position:absolute;top:0;left:0;width:1px;height:1px;display:none;overflow:hidden");
    document.body.appendChild(jsonpServiceHatch);
    
    var serviceHatchScript = document.createElement("script");
    serviceHatchScript.setAttribute("type", "text/javascript");
    serviceHatchScript.textContent = 'function ' + serviceHatchId + '_callback(data){document.getElementById("' + serviceHatchId + '").textContent=JSON.stringify(data);};';
    document.body.appendChild(serviceHatchScript);
    
    var jsonpRunner = document.createElement("script");
    jsonpRunner.setAttribute("type", "text/javascript");
    jsonpRunner.setAttribute("src", url + "&" + jsonp + "=" + serviceHatchId + "_callback");
    jsonpRunner.addEventListener("load", function() {
        var data = jsonpServiceHatch.textContent;
        callback(JSON.parse(data), additional_data);
        document.body.removeChild(jsonpServiceHatch);
        document.body.removeChild(serviceHatchScript);
        document.body.removeChild(jsonpRunner);
    }, false);
    jsonpRunner.addEventListener("error", function() {
        failed_callback();
        document.body.removeChild(jsonpServiceHatch);
        document.body.removeChild(serviceHatchScript);
        document.body.removeChild(jsonpRunner);
    }, false);
    document.body.appendChild(jsonpRunner);
};

// --------- THIRD PARTY CODE AREA END ---------

var yadg_util = {
    exec : function exec(fn) {
        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = '(' + fn + ')();';
        document.body.appendChild(script); // run the script
        document.body.removeChild(script); // clean up
    },
    
    // handle for updating page css, taken from one of hateradio's scripts
    addCSS : function(style) {
        if(!this.style) {
            this.style = document.createElement('style');
            this.style.type = 'text/css';
            (document.head || document.getElementsByTagName('head')[0]).appendChild(this.style);
        }
        this.style.appendChild(document.createTextNode(style+'\n'));
    },
    
    setValueIfSet: function(value,input,cond) {
        if (cond) {
            input.value = value;
        } else {
            input.value = '';
        }
    },
    
    // negative count will remove, positive count will add given number of artist boxes
    addRemoveArtistBoxes : function(count) {
        if (count != 0) {
            if (count < 0) {
                for (var i = 0; i < -count; i++) {
                    yadg_util.exec(function() {RemoveArtistField()});
                }
            } else {
                for (var i = 0; i < count; i++) {
                    yadg_util.exec(function() {AddArtistField()});
                }
            }
        }
    },
    
    getOptionOffsets : function(select) {
        var option_offsets = {};
        for (var j = 0; j < select.options.length; j++) {
            option_offsets[select.options[j].value] = select.options[j].index;
        }
        return option_offsets;
    }
};

// very simple wrapper for XmlHttpRequest
function requester(url, callback) {
    this.data = {};
    this.callback = callback;
    this.url = url;
    
    if (url.charAt(url.length - 1) == "/") {
        this.url += '?';
    } else {
        this.url += '&';
    }
    
    this.url += 'format=json-p';
    
    this.send = function() {
        runSandboxedJSONPYADG(this.url,callback,this.data,yadg.failed_callback);
    };
}

var factory = {
    locations : new Array(
        {
            name : 'gtrackerinstallgentoo_upload',
            regex : /http(s)?\:\/\/(.*\.)?gtracker.installgentoo\.com\/upload\.php.*/i
        },
        {
            name : 'gtrackerinstallgentoo_edit',
            regex : /http(s)?\:\/\/(.*\.)?gtracker.installgentoo\.com\/torrents\.php\?action=editgroup&groupid=.*/i
        },
        {
            name : 'gtrackerinstallgentoo_request',
            regex : /http(s)?\:\/\/(.*\.)?gtracker.installgentoo\.com\/requests\.php\?action=new/i
        },
        {
            name : 'waffles_upload',
            regex : /http(s)?\:\/\/(.*\.)?waffles\.fm\/upload\.php.*/i
        },
        {
            name : 'waffles_request',
            regex : /http(s)?\:\/\/(.*\.)?waffles\.fm\/requests\.php\?do=add/i
        }
    ),

    determineSSL : function(uri) {
        return uri.indexOf("https://") == 0
    },
    
    determineLocation : function(uri) {
        for (var i = 0; i < this.locations.length; i++) {
            if (this.locations[i].regex.test(uri)) {
                return this.locations[i].name;
            }
        }
        return "";
    },
    
    init : function() {
        this.currentLocation = this.determineLocation(document.URL);
        this.isSSL = this.determineSSL(document.URL);
        this.insertIntoPage(this.getInputElements());
        
        // set the necessary styles
        this.setStyles();
        
        // add the appropriate action for the button
        var button = document.getElementById('yadg_submit');
        button.addEventListener('click',function(e) { e.preventDefault(); yadg.makeRequest();},false);
        
        // add the action for the options toggle
        var toggleLink = document.getElementById('yadg_toggle_options');
        toggleLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            var optionsDiv = document.getElementById('yadg_options'),
                display = optionsDiv.style.display;
            
            if (display == 'none' || display == '') {
                optionsDiv.style.display = 'block';
            } else {
                optionsDiv.style.display = 'none';
            }
        });
        
        // set the correct default format
        factory.setDefaultFormat();

        // tell the yadg object if we are browsing the site using ssl
        yadg.setSSL(this.isSSL);
        // update the scraper and formats list
        yadg.getScraperList(factory.setScraperSelect);
        yadg.getFormatsList(factory.setFormatSelect);
    },
    
    setDefaultFormat : function() {
        var format_select = document.getElementById('yadg_format');
        var format_offsets = yadg_util.getOptionOffsets(format_select);

        switch(this.currentLocation) {
            case "waffles_upload":
                format_select.selectedIndex = format_offsets[defaultWafflesFormat];
                break;
            
            case "waffles_request":
                format_select.selectedIndex = format_offsets[defaultWafflesFormat];
                break;
            
            default:
                format_select.selectedIndex = format_offsets[defaultWhatFormat];
                break;
        }
    },
    
    setScraperSelect : function(response_data, data) {
        var scraper_select = document.getElementById("yadg_scraper");
        
        factory.setSelect(scraper_select,response_data);
    },
    
    setFormatSelect : function(response_data, data) {
        var format_select = document.getElementById("yadg_format");
        
        factory.setSelect(format_select,response_data);
        factory.setDefaultFormat();
    },
    
    setSelect : function(select, data) {
        select.length = data.length;
        
        for (var i = 0; i < data.length; i++) {
            select[i] = new Option(data[i].name, data[i].value, false, data[i]['default']);
            if (data[i]['default']) {
                select.selectedIndex = i;
            }
        }
    },
    
    setStyles : function() {
        // general styles
        yadg_util.addCSS('div#yadg_options{ display:none; margin-top:3px; } input#yadg_input,input#yadg_submit,label#yadg_format_label,a#yadg_scraper_info { margin-right: 5px } div#yadg_response { margin-top:3px; } select#yadg_scraper { margin-right: 2px }');
        
        // location specific styles will go here
        switch(this.currentLocation) {
            case "waffles_upload":
                yadg_util.addCSS('div#yadg_response ul { margin-left: 0 !important; padding-left: 0 !important; }');
                break;
            
            case "waffles_request":
                yadg_util.addCSS('div#yadg_response ul { margin-left: 0 !important; padding-left: 0 !important; }');
                break;
            
            default:

                break;
        }
    },
    
    getInputElements : function() {
        var buttonHTML = '<input type="submit" value="Fetch" id="yadg_submit"/>',
            scraperSelectHTML = '<select name="yadg_scraper" id="yadg_scraper"><option value="beatport">Beatport</option><option value="discogs" selected="selected">Discogs</option><option value="metalarchives">Metal-Archives</option><option value="musicbrainz">Musicbrainz</option></select>',
            optionsHTML = '<div id="yadg_options"><label for="yadg_format" id="yadg_format_label">Format:</label><select name="yadg_format" id="yadg_format"><option value="plain">plain</option><option value="wafflesfm">waffles.fm</option><option value="wafflesfm-tracks-only">waffles.fm (tracks only)</option><option value="gtrackerinstallgentoo" selected="selected">gtracker.installgentoo.com</option><option value="gtrackerinstallgentoo-tracks-only">gtracker.installgentoo.com (tracks only)</option></select></div>',
            inputHTML = '<input type="text" name="yadg_input" id="yadg_input" size="60" />',
            responseDivHTML = '<div id="yadg_response"></div>',
            toggleOptionsLinkHTML = '<a id="yadg_toggle_options" href="#">Toggle options</a>',
            scraperInfoLink = '<a id="yadg_scraper_info" href="https://yadg.cc/available-scrapers" target="_blank" title="Get additional information on the available scrapers">[?]</a>';
        
        
        switch (this.currentLocation) {
            case "gtrackerinstallgentoo_upload":
                var tr = document.createElement('tr');
                tr.className = "yadg_tr";
                tr.innerHTML = '<td class="label">YADG:</td><td>' + inputHTML + scraperSelectHTML + scraperInfoLink + buttonHTML + toggleOptionsLinkHTML + optionsHTML + responseDivHTML + '</td>';
                return tr;
            
            case "gtrackerinstallgentoo_edit":
                var div = document.createElement('div');
                div.className = "yadg_div";
                div.innerHTML = '<h3 class="label">YADG</h3>' + inputHTML + scraperSelectHTML + scraperInfoLink + buttonHTML + toggleOptionsLinkHTML + optionsHTML + responseDivHTML;
                return div;
            
            case "gtrackerinstallgentoo_request":
                var tr = document.createElement('tr');
                tr.className = "yadg_tr";
                tr.innerHTML = '<td class="label">YADG:</td><td>' + inputHTML + scraperSelectHTML + scraperInfoLink + buttonHTML + toggleOptionsLinkHTML + optionsHTML + responseDivHTML + '</td>';
                return tr;
            
            case "waffles_upload":
                var tr = document.createElement('tr');
                tr.className = "yadg_tr";
                tr.innerHTML = '<td class="heading" valign="top" align="right"><label for="yadg_input">YADG:</label></td><td>' + inputHTML + scraperSelectHTML + scraperInfoLink + buttonHTML + toggleOptionsLinkHTML + optionsHTML + responseDivHTML + '</td>';
                return tr;
            
            case "waffles_request":
                var tr = document.createElement('tr');
                tr.className = "yadg_tr";
                tr.innerHTML = '<td style="text-align:left;width:100px;">YADG:</td><td style="text-align:left;">' + inputHTML + scraperSelectHTML + scraperInfoLink + buttonHTML + toggleOptionsLinkHTML + optionsHTML + responseDivHTML + '</td>';
                return tr;
            
            default:
                // that should actually never happen
                return document.createElement('div');
        }
    },
    
    insertIntoPage : function(element) {
        switch (this.currentLocation) {
            case "gtrackerinstallgentoo_upload":
                var year_tr = document.getElementById('year_tr');
                year_tr.parentNode.insertBefore(element,year_tr);
                break;
            
            case "gtrackerinstallgentoo_edit":
                var summary_input = document.getElementsByName('summary')[0];
                summary_input.parentNode.insertBefore(element,summary_input.nextSibling.nextSibling);
                break;
            
            case "gtrackerinstallgentoo_request":
                var artist_tr = document.getElementById('artist_tr');
                artist_tr.parentNode.insertBefore(element,artist_tr);
                break;
            
            case "waffles_upload":
                var submit_button = document.getElementsByName('submit')[0];
                submit_button.parentNode.parentNode.parentNode.insertBefore(element,submit_button.parentNode.parentNode);
                break;
            
            case "waffles_request":
                var category_select = document.getElementsByName('category')[0];
                category_select.parentNode.parentNode.parentNode.insertBefore(element,category_select.parentNode.parentNode);
                break;
            
            default:
                break;
        }
    },
    
    getDescriptionBox : function() {
        switch (this.currentLocation) {
            case "gtrackerinstallgentoo_upload":
                return document.getElementById('album_desc');
            
            case "gtrackerinstallgentoo_edit":
                return document.getElementsByName('body')[0];
            
            case "gtrackerinstallgentoo_request":
                return document.getElementsByName('description')[0];
                
            case "waffles_upload":
                return document.getElementById('descr');
            
            case "waffles_request":
                return document.getElementsByName('information')[0];
            
            default:
                // that should actually never happen
                return document.createElement('div');
        }    
    },
    
    getFormFillFunction : function() {
        switch (this.currentLocation) {
            case "gtrackerinstallgentoo_upload":
                var f = function(rawData) {
                    var artist_inputs = document.getElementsByName("artists[]"),
                        album_title_input = document.getElementById("title"),
                        year_input = document.getElementById("year"),
                        label_input = document.getElementById("record_label"),
                        catalog_input = document.getElementById("catalogue_number"),
                        tags_input = document.getElementById("tags"),
                        data = yadg.prepareRawResponse(rawData);
                    
                    if (data.artists != false) {
                        yadg_util.addRemoveArtistBoxes(data.artists_length - artist_inputs.length);
                        
                        artist_inputs = document.getElementsByName("artists[]");
                        
                        for (var i = 0; i < artist_inputs.length; i++) {
                            var artist_input = artist_inputs[i],
                                type_select = artist_input.nextSibling;
                            
                            while (type_select.tagName != 'SELECT') {
                                type_select = type_select.nextSibling;
                            }
                            
                            artist_input.value = data.artist_keys[i];
                            
                            option_offsets = yadg_util.getOptionOffsets(type_select);
                            
                            if (data.artists[data.artist_keys[i]] == "Remixer") {
                                type_select.selectedIndex = option_offsets[3];
                            } else if (data.artists[data.artist_keys[i]] == "Feature") {
                                type_select.selectedIndex = option_offsets[2];
                            } else {
                                type_select.selectedIndex = option_offsets[1];
                            }
                        }
                    } else {
                        for (var i = 0; i < artist_inputs.length; i++) {
                            artist_inputs[i].value = '';
                        }
                    }
                    
                    if (data.tags != false) {
                        tags_input.value = data.tag_string.toLowerCase();
                    } else {
                        tags_input.value = '';
                    }
                    
                    yadg_util.setValueIfSet(data.year,year_input,data.year != false);
                    yadg_util.setValueIfSet(data.title,album_title_input,data.title != false);
                    yadg_util.setValueIfSet(data.label,label_input,data.label != false);
                    yadg_util.setValueIfSet(data.catalog,catalog_input,data.catalog != false);
                };
                return f;
            
            case "gtrackerinstallgentoo_edit":
                f = function(rawData) {
                    var year_input = document.getElementsByName("year")[0],
                        label_input = document.getElementsByName("record_label")[0],
                        catalog_input = document.getElementsByName("catalogue_number")[0],
                        data = yadg.prepareRawResponse(rawData);
                    
                    yadg_util.setValueIfSet(data.year,year_input,data.year != false);
                    yadg_util.setValueIfSet(data.label,label_input,data.label != false);
                    yadg_util.setValueIfSet(data.catalog,catalog_input,data.catalog != false);
                };
                return f;
            
            case "gtrackerinstallgentoo_request":
                var f = function(rawData) {
                    var artist_inputs = document.getElementsByName("artists[]"),
                        album_title_input = document.getElementsByName("title")[0],
                        year_input = document.getElementsByName("year")[0],
                        label_input = document.getElementsByName("recordlabel")[0],
                        catalog_input = document.getElementsByName("cataloguenumber")[0],
                        tags_input = document.getElementById("tags"),
                        data = yadg.prepareRawResponse(rawData);
                    
                    if (data.artists != false) {
                        yadg_util.addRemoveArtistBoxes(data.artists_length - artist_inputs.length);
                        
                        artist_inputs = document.getElementsByName("artists[]");
                        
                        for (var i = 0; i < artist_inputs.length; i++) {
                            var artist_input = artist_inputs[i],
                                type_select = artist_input.nextSibling;
                                
                            while (type_select.tagName != 'SELECT') {
                                type_select = type_select.nextSibling;
                            }
                            
                            artist_input.value = data.artist_keys[i];
                            
                            option_offsets = yadg_util.getOptionOffsets(type_select);
                            
                            if (data.artists[data.artist_keys[i]] == "Remixer") {
                                type_select.selectedIndex = option_offsets[3];
                            } else if (data.artists[data.artist_keys[i]] == "Feature") {
                                type_select.selectedIndex = option_offsets[2];
                            } else {
                                type_select.selectedIndex = option_offsets[1];
                            }
                        }
                    } else {
                        for (var i = 0; i < artist_inputs.length; i++) {
                            artist_inputs[i].value = '';
                        }
                    }
                    
                    if (data.tags != false) {
                        tags_input.value = data.tag_string.toLowerCase();
                    } else {
                        tags_input.value = '';
                    }
                    
                    yadg_util.setValueIfSet(data.year,year_input,data.year != false);
                    yadg_util.setValueIfSet(data.title,album_title_input,data.title != false);
                    yadg_util.setValueIfSet(data.label,label_input,data.label != false);
                    yadg_util.setValueIfSet(data.catalog,catalog_input,data.catalog != false);
                };
                return f;
            
            case "waffles_upload":
                var f = function(rawData) {
                    var artist_input = document.getElementsByName("artist")[0],
                        album_title_input = document.getElementsByName("album")[0],
                        year_input = document.getElementsByName("year")[0],
                        va_checkbox = document.getElementById("va"),
                        tags_input = document.getElementById("tags"),
                        data = yadg.prepareRawResponse(rawData);
                    
                    if (data.artists != false) {
                        if (data.is_various) {
                            artist_input.value = "";
                            va_checkbox.checked = true;
                        } else {
                            va_checkbox.checked = false;
                            
                            var artist_string = "";
                            
                            for (var i = 0; i < data.artists_length; i++) {
                                if (data.artists[data.artist_keys[i]] == "Main") {
                                    if (artist_string != "" && i < data.artists_length - 1) {
                                        artist_string = artist_string + ", ";
                                    } else if (artist_string != "" && i == data.artists_length - 1) {
                                        artist_string = artist_string + " & ";
                                    }
                                    artist_string = artist_string + data.artist_keys[i];
                                }
                            }

                            artist_input.value = artist_string;
                        }
                    } else {
                        va_checkbox.checked = false;
                        artist_input.value = "";
                    }
                    
                    yadg_util.setValueIfSet(data.year,year_input,data.year != false);
                    yadg_util.setValueIfSet(data.title,album_title_input,data.title != false);
                    
                    if (data.tags != false) {
                        tags_input.value = data.tag_string_nodots.toLowerCase();
                    } else {
                        tags_input.value = '';
                    }
                    
                    yadg_util.exec(function() {formatName()});
                };
                return f;
            
            case "waffles_request":
                var f = function(rawData) {
                    var artist_input = document.getElementsByName("artist")[0],
                        album_title_input = document.getElementsByName("title")[0],
                        year_input = document.getElementsByName("year")[0],
                        data = yadg.prepareRawResponse(rawData);
                    
                    if (data.artists != false) {
                        if (data.is_various) {
                            artist_input.value = "Various Artists";
                        } else {
                            var artist_string = "";
                            
                            for (var i = 0; i < data.artists_length; i++) {
                                if (data.artists[data.artist_keys[i]] == "Main") {
                                    if (artist_string != "" && i < data.artists_length - 1) {
                                        artist_string = artist_string + ", ";
                                    } else if (artist_string != "" && i == data.artists_length - 1) {
                                        artist_string = artist_string + " & ";
                                    }
                                    artist_string = artist_string + data.artist_keys[i];
                                }
                            }

                            artist_input.value = artist_string;
                        }
                    } else {
                        artist_input.value = "";
                    }
                    
                    yadg_util.setValueIfSet(data.year,year_input,data.year != false);
                    yadg_util.setValueIfSet(data.title,album_title_input,data.title != false);
                };
                return f;
            
            default:
                // that should actually never happen
                return function(data) {};
        }
    }
};

var yadg = {
    baseURL : "http://yadg.cc/api/v1/",
    baseURLSSL : "https://yadg.cc/api/v1/",
    
    standardError : "Sorry, an error occured. Please try again. If this error persists the user script might need updating.",
    lastStateError : false,

    isSSL : false,
    isBusy : false,

    setSSL : function(isSSL) {
        this.isSSL = isSSL;
    },

    init : function() {
        this.scraperSelect = document.getElementById('yadg_scraper');
        this.formatSelect = document.getElementById('yadg_format');
        this.input = document.getElementById('yadg_input');
        this.responseDiv = document.getElementById('yadg_response');
        this.button = document.getElementById('yadg_submit');
    },

    getBaseURL : function() {
        if (this.isSSL) {
            return this.baseURLSSL;
        }
        return this.baseURL;
    },

    getScraperList : function(callback) {
        var url = this.getBaseURL() + "scrapers/";
        
        var request = new requester(url, callback);
        
        request.send();
    },
    
    getFormatsList : function(callback) {
        var url = this.getBaseURL() + "formats/";
        
        var request = new requester(url, callback);
        
        request.send();
    },
    
    makeRequest : function() {
        if (this.isBusy) return;
        var scraper = this.scraperSelect.options[this.scraperSelect.selectedIndex].value,
            format = this.formatSelect.options[this.formatSelect.selectedIndex].value,
            inputValue = this.input.value,
            url = this.getBaseURL() + 'query/?';
            
            url += 'input=' + encodeURIComponent(inputValue) + '&scraper=' + encodeURIComponent(scraper);
        
        if (inputValue != '') {
            var request = new requester(url, function(response_data,data) {
                yadg.getResult(response_data.result_url,format);
            });
            this.busyStart();
            request.send();
        }
    },
    
    getResult : function(result_url,format) {
        var request = new requester(result_url + '?include_raw_data=True&description_format=' + encodeURIComponent(format), function(response_data,data) {
            var response = response_data;
            
            if (response.status == "done") {
                if (response.type == 'release') {
                    factory.getDescriptionBox().value = response.description;
                    
                    if (yadg.lastStateError == true) {
                        yadg.responseDiv.innerHTML = "";
                        yadg.lastStateError = false;
                    }
                    
                    fillFunc = factory.getFormFillFunction();
                    fillFunc(response.raw_data);
                } else if (response.type == 'release_list') {
                    var ul = document.createElement('ul');
                    ul.id = "yadg_release_list";
                    
                    var scraper_results = response.releases;
                    for (scraper in scraper_results) {
                        var release_list = scraper_results[scraper];
                        for (var i = 0; i < release_list.length;i++) {
                            var name = release_list[i]['name'],
                                info = release_list[i]['info'],
                                query_url = release_list[i]['query_url'],
                                release_url = release_list[i]['release_url'];
                            
                            var li = document.createElement('li'),
                                a = document.createElement('a');
                            
                            a.textContent = name;
                            a.setAttribute('data-query-url', query_url);
                            a.href = release_url;
                            
                            a.addEventListener('click',function(e) { e.preventDefault(); yadg.makeRequestByUrl(this.getAttribute('data-query-url'));},false);
                            
                            li.appendChild(a);
                            li.appendChild(document.createElement('br'));
                            li.appendChild(document.createTextNode(info));
                            
                            ul.appendChild(li);
                        }
                    }
                    
                    if (ul.childNodes.length != 0) {
                        yadg.responseDiv.innerHTML = "";
                        yadg.responseDiv.appendChild(ul);
                        yadg.lastStateError = false;
                    } else {
                        yadg.printError('Sorry, there were no matches.');
                    }
                } else if (response.type == 'release_not_found') {
                    yadg.printError('I could not find the release with the given ID. You may want to try again with another one.');
                } else {
                    yadg.printError('Something weird happened. Please try again');
                }
                yadg.busyStop();
            } else if (response.status == 'failed') {
                yadg.failed_callback();
            } else  {
                var delay = function() { yadg.getResult(data.result_url,data.format); };
                window.setTimeout(delay, 1000);
            }
        });
        request.data.result_url = result_url;
        request.data.format = format;
        request.send();
    },
    
    makeRequestByUrl : function(url) {
        if (this.isBusy) return;
        var format = this.formatSelect.options[this.formatSelect.selectedIndex].value;

        var request = new requester(url, function(response_data,data) {
            yadg.getResult(response_data.result_url,format);
        });
        this.busyStart();
        request.send();
    },
    
    printError : function(message) {
        this.responseDiv.innerHTML = "";
        this.responseDiv.appendChild(document.createTextNode(message));
        this.lastStateError = true;
    },
    
    failed_callback : function() {
        yadg.printError(yadg.standardError);
        yadg.busyStop();
    },
    
    busyStart : function() {
        this.isBusy = true;
        this.button.setAttribute('disabled',true);
        this.button.value = "Please wait...";
        this.input.setAttribute('disabled',true);
        this.scraperSelect.setAttribute('disabled',true);
        this.formatSelect.setAttribute('disabled',true);
    },
    
    busyStop : function() {
        this.button.removeAttribute('disabled');
        this.button.value = "Fetch";
        this.input.removeAttribute('disabled');
        this.scraperSelect.removeAttribute('disabled');
        this.formatSelect.removeAttribute('disabled');
        this.isBusy = false;
    },
    
    prepareRawResponse : function(rawData) {
        var result = {};
        
        result.artists = false;
        result.year = false;
        result.title = false;
        result.label = false;
        result.catalog = false;
        result.genre = false;
        result.style = false;
        result.tags = false;
        result.is_various = false;

        if (rawData.hasOwnProperty('artists')) {
            result.artists = {};
            
            for (var i in rawData.artists) {
                var artist = rawData.artists[i];
                if (artist["name"] != "Various") {
                    result.artists[artist["name"]] = artist["type"];
                } else {
                    result.is_various = true;
                }
            }
        }
        if (rawData.hasOwnProperty('discs')) {
            for (var key in rawData.discs) {
                for (var i in rawData.discs[key]) {
                    var track = rawData.discs[key][i];
                    for (var j in track[1]) {
                        var name = track[1][j]["name"],
                            type = track[1][j]["type"];
                        if ( !(name in result.artists) || (type == "Main" && result.artists[name] != "Main") ) {
                            result.artists[name] = type;
                        }
                    }
                }
            }
        }
        if (rawData.hasOwnProperty('released')) {
            result.year = rawData.released.match(/\d{4}/)[0];
            if (result.year.length != 4) {
                result.year = false;
            }
        }
        if (rawData.hasOwnProperty('title')) {
            result.title = rawData.title;
        }
        if (rawData.hasOwnProperty('label')) {
            result.label = rawData.label[0];
        }
        if (rawData.hasOwnProperty('catalog')) {
            result.catalog = rawData.catalog[0];
        }
        if (rawData.hasOwnProperty('genre')) {
            result.genre = rawData.genre;
        }
        if (rawData.hasOwnProperty('style')) {
            result.style = rawData.style;
        }
        if (result.genre != false && result.style != false) {
            result.tags = rawData.genre.concat(rawData.style);
        } else if (result.genre != false) {
            result.tags = rawData.genre;
        } else if (result.style != false) {
            result.tags = rawData.style;
        }
        
        if (result.tags != false) {
            result.tag_string = "";
            result.tag_string_nodots = "";
            
            for (var i = 0; i < result.tags.length; i++) {
                result.tag_string = result.tag_string + result.tags[i].replace(/\s+/g,'.');
                result.tag_string_nodots = result.tag_string_nodots + result.tags[i].replace(/\s+/g,' ');
                if (i != result.tags.length-1) {
                    result.tag_string = result.tag_string + ', ';
                    result.tag_string_nodots = result.tag_string_nodots + ', ';
                }
            }
        }
        
        if (result.artists != false) {
            // count the artists
            result.artists_length = 0;
            result.artist_keys = [];
            
            for (var i in result.artists) {
                if (result.artists.hasOwnProperty(i)) {
                    result.artists_length++;
                    result.artist_keys.push(i);
                }
            }
        }
        
        if (result.artists_length == 0) {
            result.artists = false;
        }
        
        return result;
    }
};

factory.init();
yadg.init();