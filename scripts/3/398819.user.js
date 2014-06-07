// ==UserScript==
// @name    Gmail Basic HTML Tweaks
// @version 0.4.3
// @namespace  http://userscripts.org/scripts/show/398819
// @description Some Gmail Basic HTML Tweaks - Note: You probably don't need this. Unless you are using Gmail's basic HTML.
// @include       http://gmail.google.com/*
// @include       https://gmail.google.com/*
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

(function() {
    
    function getQS(key, loc) {
        loc = loc || window.location.search;
        var match = RegExp('[?&]' + key + '=([^&]*)').exec(loc);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    
    var http_request_in_progress = false;
    
    function ajax(url, callback) {
        http_request_in_progress = true;
        var xhReq = new XMLHttpRequest();
        xhReq.open('GET', url, true);
        xhReq.onreadystatechange = function() {
            if (xhReq.readyState == 4) {
                if (xhReq.status == 200) {
                    http_request_in_progress = false;
                    if (callback) {
                        callback(xhReq.responseText);
                    }; 
                } else {
                    http_request_in_progress = false;
                    console.log('XMLHTTP Error - Status: ' + xhReq.status);
                    return;
                };
            };
        };
        xhReq.onerror = function(e) {
            http_request_in_progress = false;
            console.log('XMLHTTP OnError event fired: ' + e.target.status);
            return;
        };
        xhReq.send();
    };
    
    function to_static_array(obj) {
		return [].slice.call(obj);
	};
	
    var gbhtml = {
            
        sidebar_table_element : null, 
        auto_fetch_interval_obj : null,
        auto_fetch_interval_number : 300000,
            
        toggle_top_bar_anchor : function() {
            var guserEl = document.getElementById('guser').getElementsByTagName('nobr')[0];
            var anchor_lbl = '';
            if (GM_getValue('gmailHeaderIsCollapsed', 'no') == 'yes') {
                anchor_lbl = '&DoubleLeftArrow;';
                document.getElementsByTagName('table')[0].style.display = 'none';
            } else {
                anchor_lbl = '&DoubleDownArrow;';
            }
            
            guserEl.innerHTML = guserEl.innerHTML + '<span id="gm_header_collapsed_anchor" style="font-weight:bold;cursor:pointer;color:blue;margin-left:15px" href="#">' + anchor_lbl + '</span>';
            document.getElementById('gm_header_collapsed_anchor').onclick = function() {
                if (document.getElementsByTagName('table')[0].style.display == 'none') {
                    GM_setValue('gmailHeaderIsCollapsed', 'no');
                    document.getElementsByTagName('table')[0].style.display = 'block';
                    document.getElementById('gm_header_collapsed_anchor').innerHTML = '&DoubleDownArrow;';
                } else {
                    GM_setValue('gmailHeaderIsCollapsed', 'yes');
                    document.getElementsByTagName('table')[0].style.display = 'none';
                    document.getElementById('gm_header_collapsed_anchor').innerHTML = '&DoubleLeftArrow;';
                }
                return false;
            };
        },
        
        toggle_sidebar_anchor : function() {
            var inputs = null;
            var p = 0;
            var h = null;
            var input = null;
            var sidebar_anchor_lbl = '';
            var anchorCollapseSidebar = null;
            var all_tables = document.getElementsByTagName('table');
            for (p = 0, h = all_tables.length; p < h ; p++) {
                if (all_tables[p].innerHTML.match('Compose&nbsp;Mail') && all_tables[p].innerHTML.match('Inbox') && all_tables[p].innerHTML.match('Contacts')) {
                    gbhtml.sidebar_table_element = all_tables[p];
                    break;
                }
            }
            
            /////////////////////////
            // set count in title
            var inbox_count = gbhtml.sidebar_table_element.innerHTML.match(/Inbox&nbsp;\(([^\)]+)\)/);
            var document_title = document.title.replace(/\((.*)\)/, '');
            if (inbox_count && inbox_count[1]) {
                document.title = '(' + inbox_count[1] + ') ' + document_title;
            }
            ///////////////////////
            
            inputs = document.getElementsByTagName('input');
            for (p = 0, h = inputs.length; p < h; p++) {
                input = inputs[p];
                if (input.getAttribute('type') == 'submit' && input.getAttribute('value') == 'Archive') {
                    sidebar_anchor_lbl = '';
                    if (GM_getValue('gmailSidebarIsCollapsed', 'no') == 'yes') {
                        sidebar_anchor_lbl = '&DoubleRightArrow;';
                        gbhtml.sidebar_table_element.getElementsByTagName('td')[0].style.display = 'none';
                    } else {
                        sidebar_anchor_lbl = '&DoubleLeftArrow;';
                    }

                    anchorCollapseSidebar = document.createElement('span');
                    anchorCollapseSidebar.innerHTML = sidebar_anchor_lbl;
                    anchorCollapseSidebar.setAttribute('style', 'font-weight:bold;margin-right:10px;color:blue;cursor:pointer;');
                    anchorCollapseSidebar.addEventListener('click', function() {
                        if (gbhtml.sidebar_table_element.getElementsByTagName('td')[0].style.display == 'none') {
                            GM_setValue('gmailSidebarIsCollapsed', 'no');
                            gbhtml.sidebar_table_element.getElementsByTagName('td')[0].style.display = 'block';
                            this.innerHTML = '&DoubleLeftArrow;';
                        } else {
                            GM_setValue('gmailSidebarIsCollapsed', 'yes');
                            gbhtml.sidebar_table_element.getElementsByTagName('td')[0].style.display = 'none';
                            this.innerHTML = '&DoubleRightArrow;';
                        }
                    }, false);
                    input.parentNode.insertBefore(anchorCollapseSidebar, input);
                }
            }
        },
        
        toggle_auto_fetch_anchor : function() {
            
            var inputs = document.getElementsByTagName('input');
            var input = null;
            var i = 0;
            var k = null;
            var auto_fetch_label_el = null;
            var auto_fetch_checkbox_el = null;
            for (i = 0, k = inputs.length; i < k; i++) {
                input = inputs[i];
                if (input.type == 'submit' && input.value == 'Go') {
                    
                    auto_fetch_label_el = document.createElement('label');
                    auto_fetch_label_el.setAttribute('style', 'display:inline-block;margin-left:10px;cursor:pointer;');
                    auto_fetch_label_el.innerHTML = 'Auto Check';
                    auto_fetch_label_el.addEventListener('change', function() {
                        if (GM_getValue('gmailAutoFetch', 'no') == 'yes') {
                            GM_setValue('gmailAutoFetch', 'no');
                            clearInterval(gbhtml.auto_fetch_interval_obj);
                        } else {
                            GM_setValue('gmailAutoFetch', 'yes');
                            gbhtml.auto_fetch_interval_obj = setInterval(function() {
                                gbhtml.auto_fetch_action();
                            }, gbhtml.auto_fetch_interval_number);
                        }
                    }, false);
                    
                    auto_fetch_checkbox_el = document.createElement('input');
                    auto_fetch_checkbox_el.type = 'checkbox';
                    auto_fetch_checkbox_el.setAttribute('data-id', 'auto-fetch-checkbox');
                    auto_fetch_checkbox_el.setAttribute('style', 'position:relative;top:2px;margin-left:5px;');
                    
                    if (GM_getValue('gmailAutoFetch', 'no') == 'yes') {
                        auto_fetch_checkbox_el.setAttribute('checked', 'checked');
                        gbhtml.auto_fetch_interval_obj = setInterval(function() {
                            gbhtml.auto_fetch_action();
                        }, gbhtml.auto_fetch_interval_number);
                    }
                    
                    auto_fetch_label_el.appendChild(auto_fetch_checkbox_el);

                    insertAfter(input, auto_fetch_label_el);
                    
                }
            }
            
        },
        
        auto_fetch_action : function() {
            var inbox_count = 0;
            var document_title = document.title.replace(/\((.*)\)/, '');
            //console.log('auto fetch: ' + new Date().valueOf());
            if (http_request_in_progress === false) {
                ajax(document.location.href, function(res) {
                    inbox_count = res.match(/Inbox&nbsp;\(([^\)]+)\)/);
                    if (inbox_count && inbox_count[1]) {
                        document.title = '(*' + inbox_count[1] + ') ' + document_title;
                        if (gbhtml.sidebar_table_element.innerHTML.match(/Inbox&nbsp;\(([^\)]+)\)/)) {
                            gbhtml.sidebar_table_element.innerHTML = gbhtml.sidebar_table_element.innerHTML.replace(/Inbox&nbsp;\(([^\)]+)\)/, 'Inbox&nbsp;(*' + inbox_count[1] + ')');
                        } else {
                            gbhtml.sidebar_table_element.innerHTML = gbhtml.sidebar_table_element.innerHTML.replace(/Inbox/, 'Inbox&nbsp;(*' + inbox_count[1] + ')');
                        }
                    }
                });
            }
        },
        
        select_all_anchors : function() {
        
            var allAnchors = document.getElementsByTagName('a');
            var anchor = null;
            var href = '';
            var url = '';
            var anchorSelectAll = null;
            var anchorUnselectAll = null;
            var i = 0;
            var m = 0;
            var k = null;
            var y = null;
            var allInputs = [];
            for (i = 0, k = allAnchors.length; i < k; i++) {
                anchor = allAnchors[i];
                href = anchor.getAttribute('href');
                if (href) {
                    if (href.match(/www.google.com\/url\?/)) {
                        url = getQS('q', href);
                        if (url.match(/^https?:\/\/javascriptweekly/) && anchor.getAttribute('title')) {
                            url = 'http://' + anchor.title;
                        }
                        url = url.replace(/utm_(.*)/, '');
                        url = url.replace(/\?$/, '');
                        anchor.setAttribute('href', url);

                    } else if (anchor.innerHTML == 'Refresh') {
                        anchorSelectAll = document.createElement('span');
                        anchorSelectAll.innerHTML = 'Select All';
                        anchorSelectAll.setAttribute('style', 'margin-right:10px;color:blue;text-decoration:underline;cursor:pointer;');
                        anchorSelectAll.addEventListener('click', function() {
                            allInputs = document.getElementsByTagName('input');
                            for (m = 0, y = allInputs.length; m < y; m++) {
                                if (allInputs[m].getAttribute('data-id') == 'auto-fetch-checkbox'){
                                    continue;
                                }
                                if (allInputs[m].type == 'checkbox') {
                                    allInputs[m].setAttribute('checked', 'checked');
                                }
                            }
                        }, false);

                        anchorUnselectAll = document.createElement('span');
                        anchorUnselectAll.innerHTML = 'Unselect All';
                        anchorUnselectAll.setAttribute('style', 'margin-right:10px;color:blue;text-decoration:underline;cursor:pointer;');
                        anchorUnselectAll.addEventListener('click', function() {
                            allInputs = document.getElementsByTagName('input');
                            for (m = 0, y = allInputs.length; m < y; m++) {
                                if (allInputs[m].getAttribute('data-id') == 'auto-fetch-checkbox'){
                                    continue;
                                }
                                if (allInputs[m].type == 'checkbox') {
                                    allInputs[m].removeAttribute('checked');
                                }
                            }
                        }, false);
                        anchor.parentNode.insertBefore(anchorSelectAll, anchor);
                        anchor.parentNode.insertBefore(anchorUnselectAll, anchor);
                    }
                }
            }
            
        },
		
		cache_typing_content : function() {
			var all_textareas = document.getElementsByTagName('textarea');
			for (var i = 0, k = all_textareas.length; i < k; i++) {
				if (all_textareas[i].getAttribute('name') == 'body') {
					all_textareas[i].onkeyup = function(){
						if ('' + this.value.trim() != '') {
							GM_setValue('gmailTypingContent', this.value);
						};
					};
					var br = document.createElement('br');
					insertAfter(all_textareas[i], br);
					
					var a = document.createElement('a');
					a.innerHTML = 'Fill from typing cache';
					a.href = "#";
					a.onclick = function() {
						var all_textareas2 = document.getElementsByTagName('textarea');
						for (var i = 0, k = all_textareas2.length; i < k; i++) {
							if (all_textareas2[i].getAttribute('name') == 'body') {
								var typing_content = GM_getValue('gmailTypingContent');
								if (typing_content) {
									all_textareas2[i].value = typing_content;
								}
							}
						}
						return false;
					};
					a.setAttribute('style', 'margin:20px 0 20px 4px;display:inline-block;');
					insertAfter(br, a);
				}
			}
		},
		
		set_onbeforeunload : function(){
			GM_deleteValue('gmailTypingContent');
		} 

    };  
    
	//document.body.style.display = 'none';
	
    gbhtml.toggle_top_bar_anchor();
    gbhtml.toggle_auto_fetch_anchor();
    gbhtml.toggle_sidebar_anchor();
    gbhtml.select_all_anchors();
	gbhtml.cache_typing_content();
	gbhtml.set_onbeforeunload();
	    
    //document.body.style.display = '';
})();
