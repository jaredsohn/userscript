// ==UserScript==
// @name           del.icio.us network filter
// @namespace      http://phiffer.org/
// @description    Filter your network according to user
// @include        http://del.icio.us/network/*
// ==/UserScript==
var delicious_network_filter = {
    setup: function() {
        
        this.contacts = {};
        var num_posts = [];
        
        var xpath = "//li[contains(@class, 'net')]/a[@class='uname']";
        var contacts = document.evaluate(xpath, document, null,
                       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0, contact; contact = contacts.snapshotItem(i); i++) {
            
            var li = contact.parentNode;
            var checkbox = document.createElement('input');
            var username = contact.innerHTML;
            
            this.contacts[username] = {
                node: contact,
                posts: [],
                tags: {},
                num_posts_index: num_posts.length
            };
            
            num_posts.push({
                username: username,
                posts: 0
            });
            
        }
        
        var xpath = "//li[@class='post']";
        var posts = document.evaluate(xpath, document, null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0, post; post = posts.snapshotItem(i); i++) {
            var links = post.getElementsByTagName('a');
            var username = '';
            var contact;
            for (var j = 0; j < links.length; j++) {
                var link = links[j];
                if (link.className == 'user') {
                    username = link.innerHTML;
                    contact = this.contacts[username];
                    var index = contact.num_posts_index;
                    num_posts[index].posts++;
                    contact.posts.push(link);
                } else if (link.className == 'tag') {
                    var tag = link.innerHTML + ''
                    if (contact.tags[tag]) {
                        contact.tags[tag].push(post);
                    } else {
                        contact.tags[tag] = [post];
                    }
                }
            }
        }
        
        num_posts.sort(function(a, b) {
            if (a.posts > b.posts) {
                return 1;
            } else if (a.posts < b.posts) {
                return -1;
            } else if (a.username > b.username) {
                return -1;
            } else {
                return 1;
            }
        });
        
        for (var i = 0; i < num_posts.length; i++) {
            var username = num_posts[i].username;
            var contact = this.contacts[username];
            var li = contact.node.parentNode;
            var ul = li.parentNode;
            ul.removeChild(li);
            ul.insertBefore(li, ul.getElementsByTagName('li')[1]);
            
            contact.node.addEventListener('click', this.toggle_tags, false);
            contact.node.style.background = 'transparent url(http://del.icio.us/static/img/arrow.r.gif) no-repeat 0 3px';
            contact.node.style.paddingLeft = '12px';
            contact.node.innerHTML += ' (' + num_posts[i].posts + ')';
            
            var div = document.createElement('div');
            div.style.display = 'none';
            div.style.width = li.offsetWidth + 'px';
            div.style.padding = '5px 5px 7px 12px';
            li.appendChild(div);
            
            if (num_posts[i].posts > 0) {
                
                var tag_list = [];
                for (var tag in contact.tags) {
                    tag_list.push(tag);
                }
                tag_list.sort(function(a, b) {
                    if (a.toLowerCase() > b.toLowerCase()) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                
                var tags = '';
                for (var j = 0; j < tag_list.length; j++) {
                    var tag = tag_list[j];
                    var hash = username + '/' + tag;
                    tags += '<a href="#' + hash + '" style="color: #99F;">' + tag + '</a> ';
                }
                
                div.innerHTML = tags;
                var links = div.getElementsByTagName('a');
                for (var j = 0; j < links.length; j++) {
                    links[j].addEventListener('mousedown', this.position_anchor, false);
                }
                
                div.appendChild(document.createElement('br'));
                
            }
            
            var checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.checked = true;
            checkbox.style.marginRight = '5px';
            checkbox.setAttribute('id', 'filter_' + username);
            checkbox.addEventListener('click', this.toggle_contact, false);
            div.appendChild(checkbox);
            div.appendChild(document.createTextNode(' Enabled'));
        }
        /*
        var items = ul.getElementsByTagName('li');
        var global = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.addEventListener('click', this.toggle_all, false);
        checkbox.checked = true;
        global.appendChild(checkbox);
        global.appendChild(document.createTextNode(' Toggle all'));
        ul.insertBefore(global, items[1]);*/
    },
    
    toggle_tags: function(event) {
        var expander = event.target;
        var li = expander.parentNode;
        if (expander.style.background.indexOf('arrow.r.gif') != -1) {
            expander.style.backgroundImage = 'url(http://del.icio.us/static/img/arrow.d.gif)';
            li.getElementsByTagName('div')[0].style.display = 'block';
            li.style.background = '#FFF';
        } else {
            expander.style.backgroundImage = 'url(http://del.icio.us/static/img/arrow.r.gif)';
            li.getElementsByTagName('div')[0].style.display = 'none';
            li.style.background = 'transparent';
        }
        event.preventDefault();
    },
    
    hide_tags: function(event) {
        var curr = event.target;
        while (curr.nodeName != 'LI') {
            curr = curr.parentNode;
        }
        var li = curr;
        li.style.background = 'transparent';
        li.getElementsByTagName('div')[0].style.display = 'none';
    },
    
    toggle_contact: function(event) {
        var username = event.target.getAttribute('id').substr(7);
        var contact = delicious_network_filter.contacts[username];
        var posts = contact.posts;
        var display = event.target.checked ? 'list-item' : 'none';
        for (var j = 0; j < posts.length; j++) {
            var li = posts[j].parentNode.parentNode;
            li.style.display = display;
        }
    },
    
    toggle_all: function(event) {
        var checkbox = event.target;
        var ul = checkbox.parentNode.parentNode;
        var checkboxes = ul.getElementsByTagName('input');
        for (var i = 1; i < checkboxes.length; i++) {
            checkboxes[i].checked = checkbox.checked;
        }
        var items = document.getElementsByTagName('li');
        var display = checkbox.checked ? 'list-item' : 'none';
        for (var i = 0; i < items.length; i++) {
            if (items[i].className == 'post') {
                items[i].style.display = display;
            }
        }
    },
    
    position_anchor: function(event) {
        var hash = event.target.getAttribute('href');
        var matches = hash.match(/#([^\/]+)\/(.+)/);
        var username = matches[1];
        var tag = matches[2];
        var contact = delicious_network_filter.contacts[username];
        var post = contact.tags[tag][0];
        
        if (delicious_network_filter.highlighted) {
            delicious_network_filter.highlighted.style.background = 'transparent';
        }
        delicious_network_filter.highlighted = post;
        
        var anchor = document.createElement('a');
        anchor.setAttribute('name', username + '/' + tag);
        post.style.background = '#FFC';
        post.insertBefore(anchor, post.firstChild);
        post.style.display = 'list-item';
    }
};

delicious_network_filter.setup();

