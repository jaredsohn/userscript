// ==UserScript==
// @name       Diaspora Emoticons
// @namespace  https://pod.geraspora.de/u/deusfigendi
// @version    0.6
// @description  adds the abillity to insert emoticons into Diaspora-Postings
// @match      http*://*/stream
// @copyright  2012+, Deus Figendi
// ==/UserScript==

function addEmotePanel(areaelement) {
    var settingBox = areaelement;
    if (areaelement.id == 'status_message_fake_text') {
    //Variant 1: The Textarea is "new post"...
        while (settingBox.nodeName.toUpperCase() != 'FORM') {
            settingBox = settingBox.parentNode;
        }
        settingBox = settingBox.getElementsByClassName('public_toggle')[0];
    } else if (areaelement.className == 'comment_box') {
    //Variant 2: The Textarea is a commentbox in the stream...
        while (settingBox.nodeName.toUpperCase() != 'FORM') {
            settingBox = settingBox.parentNode;
        }
        settingBox = settingBox.getElementsByClassName('submit_button')[0];        
    }
    // blah andere Variante der Eingabebox
    
    if (settingBox.firstChild.className != 'emoticon_pannel') {
        var emotepanel = createemotepanel();
        emotepanel.className = 'emoticon_pannel';    
        settingBox.insertBefore(emotepanel,settingBox.firstChild);
    }
}

function createemotepanel() {
    var emotepanel = document.createElement('span');
    
    //first collect the data and create an object for it...
    var i = 1;
    var this_emoteset = new Array(localStorage['txt_'+i],localStorage['url_'+i],localStorage['alt_'+i],localStorage['grp_'+i]);
    var emotegroup_array = new Array();
    var emotebutton = null;
    while (typeof(this_emoteset[0]) != 'undefined' && i < 100) {
        if (typeof(emotegroup_array[parseInt(this_emoteset[3])]) == 'undefined') { emotegroup_array[parseInt(this_emoteset[3])] = new Array(); }
        emotegroup_array[parseInt(this_emoteset[3])].push(this_emoteset);
        i++;
        this_emoteset = new Array(localStorage['txt_'+i],localStorage['url_'+i],localStorage['alt_'+i],localStorage['grp_'+i]);
    }
    var emotegroupelement = null;
    
    for (var i = 0; i < emotegroup_array.length; i++) {
        //per group do...
        emotegroupelement = document.createElement('div');
        emotegroupelement.style.display = 'inline';
        for (var j = 0; j < emotegroup_array[i].length; j++) {
            //per Element in group do...
            if (emotegroup_array[i][j][0] == 'img') {
                emotebutton=document.createElement('img');
                emotebutton.src = emotegroup_array[i][j][1];
                emotebutton.alt = emotegroup_array[i][j][2];
                emotebutton.style.maxHeight = '30px';            
            } else {
                emotebutton=document.createElement('span');
                emotebutton.appendChild(document.createElement('div'));
                emotebutton.firstChild.appendChild(document.createTextNode(emotegroup_array[i][j][1]));
                emotebutton.firstChild.style.display = 'none';
                emotebutton.appendChild(document.createTextNode(emotegroup_array[i][j][0]));
                emotebutton.title = emotegroup_array[i][j][2];
            }
            
            emotebutton.addEventListener('click',function() {
                if (this == this.parentNode.firstChild && this.parentNode.lastChild.style.display == 'none') {
                    for (var i = 1; i < this.parentNode.childNodes.length; i++) {
                        this.parentNode.childNodes[i].style.display = 'inline';
                    }
                    //this.parentNode.style.display = 'block';
                    this.parentNode.style.border = 'dotted';
                } else {
                    if (this.nodeName.toUpperCase() == 'IMG') {
                        var this_txt = this.src;
                        var this_alt = this.alt;
                    } else {
                        var this_txt = this.firstChild.firstChild.data;
                        var this_alt = this.title;
                    }
                    if (this_txt.match(/.*\.(gif|png|svg|jpg|jpeg)$/)) {
                        this_txt = ' ![ '+this_alt+' ]('+this_txt+') ';
                    }
                    
                    var target_area = this;
                    while (target_area.nodeName.toUpperCase() != 'FORM') {
                        target_area = target_area.parentNode;
                    }
                    target_area = target_area.getElementsByTagName('textarea')[0];
                    
                    alert (target_area.id);                    
                    insert_text(this_txt,target_area);
                    alert(target_area.nodeName);
                    
                    if (target_area.id == 'status_message_fake_text') {
                        document.getElementById('status_message_text').value = target_area.value;
                        var dfcommit_button = target_area;
                        alert(dfcommit_button.nodeName);
                        while (dfcommit_button.nodeName.toUpperCase() != 'FORM') {
                            dfcommit_button = dfcommit_button.parentNode;
                            alert(dfcommit_button.nodeName);
                        }
                        alert(dfcommit_button.nodeName);
                        dfcommit_button = dfcommit_button.getElementsByName('commit')[0];
                        alert(dfcommit_button.nodeName);
                        dfcommit_button.disabled = false;
                        
                        
                    }
                    
                    
                    
                    for (var i = 1; i < this.parentNode.childNodes.length; i++) {
                        this.parentNode.childNodes[i].style.display = 'none';
                    }
                    this.parentNode.style.display = 'inline';
                    this.parentNode.style.border = 'none';
                }
            });


            emotebutton.style.cursor = 'pointer';
            emotebutton.style.paddingRight = '0.4em';
            if (j > 0) { emotebutton.style.display = 'none'; }
        
            emotegroupelement.appendChild(emotebutton);            
        }
        emotepanel.appendChild(emotegroupelement);
        
    }
    return emotepanel;
}

function insert_text(text_to_insert,target_element) {
    target_element.focus();
    target_element.value = target_element.value.substr(0,target_element.selectionEnd)+text_to_insert+target_element.value.substr(target_element.selectionEnd);        
}
    
    
function addClickevents() {
    for (var i = 0; i < document.getElementsByClassName('comment_box').length; i++) {
        if (document.getElementsByClassName('comment_box')[i].title != 'Click to show emoticons') {
            document.getElementsByClassName('comment_box')[i].addEventListener("click",function(){ addEmotePanel(this); });
        }
        document.getElementsByClassName('comment_box')[i].title = 'Click to show emoticons';
    }
}

localStorage.txt_1 = 'reset';

if (typeof(localStorage.txt_1) == 'undefined' || localStorage.txt_1 == 'reset') {
    localStorage.txt_1  = 'img';
    localStorage.url_1  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Face-smile.svg/48px-Face-smile.svg.png';
    localStorage.alt_1  = ':-)';
    localStorage.grp_1  = 0;
    localStorage.txt_2  = 'img';
    localStorage.url_2  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Face-sad.svg/48px-Face-sad.svg.png';
    localStorage.alt_2  = ':-(';
    localStorage.grp_2  = 0;
    localStorage.txt_3  = 'img';
    localStorage.url_3  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Face-wink.svg/48px-Face-wink.svg.png';
    localStorage.alt_3  = ';-)';
    localStorage.grp_3  = 0;
    localStorage.txt_4  = 'img';
    localStorage.url_4  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Face-angel.svg/48px-Face-angel.svg.png';
    localStorage.alt_4  = '0:-)';
    localStorage.grp_4  = 0;
    localStorage.txt_5  = '#en';
    localStorage.url_5  = '#english';
    localStorage.alt_5  = '-';
    localStorage.grp_5  = 1;
    localStorage.txt_6  = '#de';
    localStorage.url_6  = '#deutsch #german';
    localStorage.alt_6  = '-';
    localStorage.grp_6  = 1;
    localStorage.txt_7  = '#es';
    localStorage.url_7  = '#espaniol #spanish';
    localStorage.alt_7  = '-';
    localStorage.grp_7  = 1;
    localStorage.txt_8  = 'img';
    localStorage.url_8  = 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Farm-Fresh_heart.png';
    localStorage.alt_8  = '♥';
    localStorage.grp_8  = 2;
    localStorage.txt_9  = '♥';
    localStorage.url_9  = '♥';
    localStorage.alt_9  = '♥';
    localStorage.grp_9  = 2;
    localStorage.txt_10  = 'img';
    localStorage.url_10  = 'http://www.w3schools.com/images/compatible_firefox.gif';
    localStorage.alt_10  = 'Firefox';
    localStorage.grp_10  = 3;
    localStorage.txt_11  = 'cc-by';
    localStorage.url_11  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png';
    localStorage.alt_11  = 'cc-by';
    localStorage.grp_11  = 4;
    localStorage.txt_12  = '-sa';
    localStorage.url_12  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png';
    localStorage.alt_12  = 'cc-by-sa';
    localStorage.grp_12  = 4;
    localStorage.txt_13  = '-nd';
    localStorage.url_13  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nd.png';
    localStorage.alt_13  = 'cc-by-nd';
    localStorage.grp_13  = 4;
    localStorage.txt_14  = '-nc';
    localStorage.url_14  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc.eu.png';
    localStorage.alt_14  = 'cc-by-nc';
    localStorage.grp_14  = 4;
    localStorage.txt_15  = '-nc-sa';
    localStorage.url_15  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png';
    localStorage.alt_15  = 'cc-by-nc-sa';
    localStorage.grp_15  = 4;
    localStorage.txt_16  = '-nc-nd';
    localStorage.url_16  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.eu.png';
    localStorage.alt_16  = 'cc-by-nc-nd';
    localStorage.grp_16  = 4;
    localStorage.txt_17  = 'img';
    localStorage.url_17  = 'http://www.w3schools.com/images/compatible_ie.gif';
    localStorage.alt_17  = 'Internet Explorer';// ==UserScript==
// @name       Diaspora Emoticons
// @namespace  https://pod.geraspora.de/u/deusfigendi
// @version    0.3
// @description  adds the abillity to insert emoticons into Diaspora-Postings
// @match      http*://*/stream
// @copyright  2012+, Deus Figendi
// ==/UserScript==

function addEmotePanel(areaelement) {
    var settingBox = areaelement;
    if (areaelement.id == 'status_message_fake_text') {
    //Variant 1: The Textarea is "new post"...
        while (settingBox.nodeName.toUpperCase() != 'FORM') {
            settingBox = settingBox.parentNode;
        }
        settingBox = settingBox.getElementsByClassName('public_toggle')[0];
    } else if (areaelement.className == 'comment_box') {
    //Variant 2: The Textarea is a commentbox in the stream...
        while (settingBox.nodeName.toUpperCase() != 'FORM') {
            settingBox = settingBox.parentNode;
        }
        settingBox = settingBox.getElementsByClassName('submit_button')[0];        
    }
    // blah andere Variante der Eingabebox
    
    if (settingBox.firstChild.className != 'emoticon_pannel') {
        var emotepanel = createemotepanel();
        emotepanel.className = 'emoticon_pannel';    
        settingBox.insertBefore(emotepanel,settingBox.firstChild);
    }
}

function createemotepanel() {
    var emotepanel = document.createElement('span');
    
    //first collect the data and create an object for it...
    var i = 1;
    var this_emoteset = new Array(localStorage['txt_'+i],localStorage['url_'+i],localStorage['alt_'+i],localStorage['grp_'+i]);
    var emotegroup_array = new Array();
    var emotebutton = null;
    while (typeof(this_emoteset[0]) != 'undefined' && i < 100) {
        if (typeof(emotegroup_array[parseInt(this_emoteset[3])]) == 'undefined') { emotegroup_array[parseInt(this_emoteset[3])] = new Array(); }
        emotegroup_array[parseInt(this_emoteset[3])].push(this_emoteset);
        i++;
        this_emoteset = new Array(localStorage['txt_'+i],localStorage['url_'+i],localStorage['alt_'+i],localStorage['grp_'+i]);
    }
    var emotegroupelement = null;
    
    for (var i = 0; i < emotegroup_array.length; i++) {
        //per group do...
        emotegroupelement = document.createElement('div');
        emotegroupelement.style.display = 'inline';
        for (var j = 0; j < emotegroup_array[i].length; j++) {
            //per Element in group do...
            if (emotegroup_array[i][j][0] == 'img') {
                emotebutton=document.createElement('img');
                emotebutton.src = emotegroup_array[i][j][1];
                emotebutton.alt = emotegroup_array[i][j][2];
                emotebutton.style.maxHeight = '30px';            
            } else {
                emotebutton=document.createElement('span');
                emotebutton.appendChild(document.createElement('div'));
                emotebutton.firstChild.appendChild(document.createTextNode(emotegroup_array[i][j][1]));
                emotebutton.firstChild.style.display = 'none';
                emotebutton.appendChild(document.createTextNode(emotegroup_array[i][j][0]));
                emotebutton.title = emotegroup_array[i][j][2];
            }
            
            emotebutton.addEventListener('click',function() {
                if (this == this.parentNode.firstChild && this.parentNode.lastChild.style.display == 'none') {
                    for (var i = 1; i < this.parentNode.childNodes.length; i++) {
                        this.parentNode.childNodes[i].style.display = 'inline';
                    }
                    //this.parentNode.style.display = 'block';
                    this.parentNode.style.border = 'dotted';
                } else {
                    if (this.nodeName.toUpperCase() == 'IMG') {
                        var this_txt = this.src;
                        var this_alt = this.alt;
                    } else {
                        var this_txt = this.firstChild.firstChild.data;
                        var this_alt = this.title;
                    }
                    if (this_txt.match(/.*\.(gif|png|svg|jpg|jpeg)$/)) {
                        this_txt = ' ![ '+this_alt+' ]('+this_txt+') ';
                    }
                    
                    var target_area = this;
                    while (target_area.nodeName.toUpperCase() != 'FORM') {
                        target_area = target_area.parentNode;
                    }
                    target_area = target_area.getElementsByTagName('textarea')[0];
                    
                    insert_text(this_txt,target_area);
                    
                    if (target_area.id == 'status_message_fake_text') {
                        document.getElementById('status_message_text').value = target_area.value;
                    }
                    
                    
                    
                    for (var i = 1; i < this.parentNode.childNodes.length; i++) {
                        this.parentNode.childNodes[i].style.display = 'none';
                    }
                    this.parentNode.style.display = 'inline';
                    this.parentNode.style.border = 'none';
                }
            });


            emotebutton.style.cursor = 'pointer';
            emotebutton.style.paddingRight = '0.4em';
            if (j > 0) { emotebutton.style.display = 'none'; }
        
            emotegroupelement.appendChild(emotebutton);            
        }
        emotepanel.appendChild(emotegroupelement);
        
    }
    /*
        var eclickelement = null;
        if (this_emoteset[0] == 'img') {
            eclickelement=document.createElement('img');
            eclickelement.src = this_emoteset[1];
            eclickelement.alt = this_emoteset[2];
            eclickelement.style.maxHeight = '35px';            
        } else {
            eclickelement=document.createElement('span');
            eclickelement.appendChild(document.createElement('div'));
            eclickelement.firstChild.appendChild(document.createTextNode(this_emoteset[1]));
            eclickelement.firstChild.style.display = 'none';
            eclickelement.appendChild(document.createTextNode(this_emoteset[0]));
            eclickelement.title = this_emoteset[2];
        }
        
        eclickelement.addEventListener('click',function() {
            var target_area = this;
            while (target_area.nodeName.toUpperCase() != 'FORM') {
                target_area = target_area.parentNode;
            }
            target_area = target_area.getElementsByTagName('textarea')[0];
            
            var text_to_insert = 'null';
            if (this.nodeName.toUpperCase() == 'IMG') {
                text_to_insert = this.src;
                var alt_text = this.alt;
            } else {
                text_to_insert = this.firstChild.firstChild.data;
                if (text_to_insert.match(/.*\.(gif|svg|png|jpg|jpeg)$/)) {
                    var alt_text = this.title;
                }
            }
            
            if (typeof(alt_text) != 'undefined') {
                text_to_insert = ' ![ '+alt_text+' ]('+text_to_insert+') ';
            }
            
            target_area.value += text_to_insert;
        });
        
        eclickelement.style.cursor = 'pointer';
        eclickelement.style.paddingRight = '0.2em';
        eclickelement.style.paddingLeft = '0.2em';
        eclickelement.style.borderRight = 'dotted';
        if (i > 3) { eclickelement.style.display = 'none'; }
        
        emotepanel.appendChild(eclickelement);
        
        if (i == 3) {
            var expandelement=document.createElement('img');
            expandelement.src = 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Tab_plus.svg';
            expandelement.title = 'more...';
            expandelement.style.cursor = 'pointer';
            expandelement.addEventListener('click',function(){ for (var j = 0; this.parentNode.childNodes.length; j++) { this.parentNode.childNodes[j].style.display = 'inline'; } });
            emotepanel.appendChild(expandelement);
        }
        
        
        i++;
        this_emoteset = new Array(localStorage['txt_'+i],localStorage['url_'+i],localStorage['alt_'+i]);
    }
    */
    return emotepanel;
}

function insert_text(text_to_insert,target_element) {
    target_element.focus();
    target_element.value = target_element.value.substr(0,target_element.selectionEnd)+text_to_insert+target_element.value.substr(target_element.selectionEnd);        
}
    
    
function addClickevents() {    
    for (var i = 0; i < document.getElementsByClassName('comment_box').length; i++) {
        if (document.getElementsByClassName('comment_box')[i].title != 'Click to show emoticons') {
            document.getElementsByClassName('comment_box')[i].addEventListener("click",function(){ addEmotePanel(this); });
        }
        document.getElementsByClassName('comment_box')[i].title = 'Click to show emoticons';
    }
}


if (typeof(localStorage.txt_1) == 'undefined' || localStorage.txt_1 == 'reset') {
    localStorage.txt_1  = 'img';
    localStorage.url_1  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Face-smile.svg/48px-Face-smile.svg.png';
    localStorage.alt_1  = ':-)';
    localStorage.grp_1  = 0;
    localStorage.txt_2  = 'img';
    localStorage.url_2  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Face-sad.svg/48px-Face-sad.svg.png';
    localStorage.alt_2  = ':-(';
    localStorage.grp_2  = 0;
    localStorage.txt_3  = 'img';
    localStorage.url_3  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Face-wink.svg/48px-Face-wink.svg.png';
    localStorage.alt_3  = ';-)';
    localStorage.grp_3  = 0;
    localStorage.txt_4  = 'img';
    localStorage.url_4  = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Face-angel.svg/48px-Face-angel.svg.png';
    localStorage.alt_4  = '0:-)';
    localStorage.grp_4  = 0;
    localStorage.txt_5  = '#en';
    localStorage.url_5  = '#english';
    localStorage.alt_5  = '-';
    localStorage.grp_5  = 1;
    localStorage.txt_6  = '#de';
    localStorage.url_6  = '#deutsch #german';
    localStorage.alt_6  = '-';
    localStorage.grp_6  = 1;
    localStorage.txt_7  = '#es';
    localStorage.url_7  = '#espaniol #spanish';
    localStorage.alt_7  = '-';
    localStorage.grp_7  = 1;
    localStorage.txt_8  = 'img';
    localStorage.url_8  = 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Farm-Fresh_heart.png';
    localStorage.alt_8  = '♥';
    localStorage.grp_8  = 2;
    localStorage.txt_9  = '♥';
    localStorage.url_9  = '♥';
    localStorage.alt_9  = '♥';
    localStorage.grp_9  = 2;
    localStorage.txt_10  = 'img';
    localStorage.url_10  = 'http://www.w3schools.com/images/compatible_firefox.gif';
    localStorage.alt_10  = 'Firefox';
    localStorage.grp_10  = 3;
    localStorage.txt_11  = 'cc-by';
    localStorage.url_11  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by.png';
    localStorage.alt_11  = 'cc-by';
    localStorage.grp_11  = 4;
    localStorage.txt_12  = '-sa';
    localStorage.url_12  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png';
    localStorage.alt_12  = 'cc-by-sa';
    localStorage.grp_12  = 4;
    localStorage.txt_13  = '-nd';
    localStorage.url_13  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nd.png';
    localStorage.alt_13  = 'cc-by-nd';
    localStorage.grp_13  = 4;
    localStorage.txt_14  = '-nc';
    localStorage.url_14  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc.eu.png';
    localStorage.alt_14  = 'cc-by-nc';
    localStorage.grp_14  = 4;
    localStorage.txt_15  = '-nc-sa';
    localStorage.url_15  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.png';
    localStorage.alt_15  = 'cc-by-nc-sa';
    localStorage.grp_15  = 4;
    localStorage.txt_16  = '-nc-nd';
    localStorage.url_16  = 'http://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-nd.eu.png';
    localStorage.alt_16  = 'cc-by-nc-nd';
    localStorage.grp_16  = 4;
    localStorage.txt_17  = 'img';
    localStorage.url_17  = 'http://www.w3schools.com/images/compatible_ie.gif';
    localStorage.alt_17  = 'Internet Explorer';
    localStorage.grp_17  = 3;
    localStorage.txt_18  = 'img';
    localStorage.url_18  = 'http://www.w3schools.com/images/compatible_opera.gif';
    localStorage.alt_18  = 'Opera';
    localStorage.grp_18  = 3;
    localStorage.txt_19  = 'img';
    localStorage.url_19  = 'http://www.w3schools.com/images/compatible_chrome.gif';
    localStorage.alt_19  = 'Chomium';
    localStorage.grp_19  = 3;
    localStorage.txt_20  = 'img';
    localStorage.url_20  = 'http://www.w3schools.com/images/compatible_safari.gif';
    localStorage.alt_20  = 'Safari';
    localStorage.grp_20  = 3;
}



document.getElementById("status_message_fake_text").addEventListener("click",function(){ addEmotePanel(this); });

window.setInterval(addClickevents,2000);

    localStorage.grp_17  = 3;
    localStorage.txt_18  = 'img';
    localStorage.url_18  = 'http://www.w3schools.com/images/compatible_opera.gif';
    localStorage.alt_18  = 'Opera';
    localStorage.grp_18  = 3;
    localStorage.txt_19  = 'img';
    localStorage.url_19  = 'http://www.w3schools.com/images/compatible_chrome.gif';
    localStorage.alt_19  = 'Chomium';
    localStorage.grp_19  = 3;
    localStorage.txt_20  = 'img';
    localStorage.url_20  = 'http://www.w3schools.com/images/compatible_safari.gif';
    localStorage.alt_20  = 'Safari';
    localStorage.grp_20  = 3;
}



document.getElementById("status_message_fake_text").addEventListener("click",function(){ addEmotePanel(this); });

window.setInterval(addClickevents,2000);
