// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// meemigroups.user.js
//
// Meemi Groups v0.1.13 - Allows to manage groups of meemers in Meemi.com
// ----------------------------------------------------------------------------
// COPYRIGHT & DISCLAIMER
//
// Copyright (c) 2010-2011 Marco Trulla - http://www.marcotrulla.it/
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// ==UserScript==
// @name        Meemi Groups
// @namespace   d857cd2c5ad3c152497802df7262c1579d1abbfe
// @description Allows to manage groups of meemers in your Meemi.com's account.
// @identifier  656655a7-6554-4d4e-9613-c6f1307dac0b
// @copyright   (c) 2010-2011 by Marco Trulla aka Ragnarøkkr
// @license     MIT License
// @version     0.1.13
// @history     0.1.13 Fixed a problem with the alert message on empty members list
// @history     0.1.12 Optimized and adapted for Greasemonkey and Firefox
// @history     0.1.11 Fixed the duplicate groups issue in drop-down list
// @history     0.1.10 Fixed the sanitizer for entered strings
// @history     0.1.10 Added output limits to the shown members in drop-down list control
// @history     0.1.10 Added support for groups in private memes
// @history     0.1.00 First alpha version released
// @support     Internet Explorer, Firefox, Chrome, Opera
// @include     http://meemi.com/*
// ==/UserScript==

function MT_meemi_groups() {

    /**
     * Private Constants -------------------------------------------------------
     */
     
    var messages = {
        MSG_GROUP_ADDED     : "New group '%s' added",
        MSG_GROUP_DELETED   : "Group deleted",
        MSG_GROUP_NEW_TITLE : "New Group",
        MSG_GROUP_EXISTS    : "The group name already exists! Please try again",
        MSG_GROUP_EMPTY     : "At least one member is required to create a new group",
        
        MSG_UX_NEW_GROUP    : "click to create a new group from current meme text",
        MSG_UX_INSERT_GROUP : "click to insert selected group in meme text",
        MSG_UX_REMOVE_GROUP : "click to remove selected group from database",
        
        ASK_GROUP_NAME      : "Please insert a name to be assigned to this new group:",
        ASK_GROUP_DELETE    : "This will delete the selected group from your database. Are you sure?"
    };

    /**
     * Private Properties ------------------------------------------------------
     */
    
    var self = this;
    // it will contains all groups stored in local storage
    var groups = [];
    // it will contains the meme DIV
    var post_meme = null;
    // it will contains the options DIV
    var div_sadv = null;
    
    /**
     * Private Methods - Generic -----------------------------------------------
     */
     
    // Sanitize a string before to pass it to other functions
    var sanitize = function (
        s // string to sanitize
    ) {
        return s.replace(/&/ig, ' ')
                .replace(/</ig, ' ')
                .replace(/>/ig, ' ')
                .replace(/"/ig, ' ')
                .replace(/'/ig, ' ')
                .replace(/:/ig, ' ')
                .replace(/\?/ig, ' ')
                .replace(/=/ig, ' ')
                .replace(/eval\(/ig, ' ');
    }; /* sanitize() */
    
    // Limits the length of a string to an arbitrary number of characters
    // showing a pre-defined string in place of exceeding characters.
    var limit = function (
        s,      // string to limit
        len,    // maximum length allowed
        lim     // string to be used as limiter
    ) {
        var t = '';
        
        if (s.length > (len - lim.length)) {
            t = s.slice(0, len - lim.length - 1) + lim;
        } else {
            t = s;
        }
        return t;
    }; /* limit() */
    
    
    /**
     * Private Methods - Database ----------------------------------------------
     */
     
    // Loads groups from database or creates and inits new local storage
    var db_load_groups = function () {
        if (!localStorage.getItem('groups')) {
            localStorage.setItem('groups', JSON.stringify([]));
        } else {
            groups = JSON.parse(localStorage.getItem('groups'));
        }
    }; /* db_load_groups() */
    
    // Adds a group to the database
    var db_add_group = function (
        g_name, // group name
        m_list  // memeber list
    ) {
        // Sanitizes name & member list before to add the new record
        groups.push( {
            'name' : sanitize(g_name),
            'members' : sanitize(m_list).split(' ')
        } );
        
        // Sorts groups list
        groups.sort(function(a,b) { return a.name > b.name; });
        
        // Updates the database
        localStorage.setItem('groups', JSON.stringify(groups));
        ux_add_groups_list(true);
        alert(messages.MSG_GROUP_ADDED.replace(/%s/i,
            unescape(sanitize(g_name)))
        );
    }; /* db_add_group() */
    
    // Removes a group from the database
    var db_remove_group = function () {
        if ((groups.length > 0) && confirm(messages.ASK_GROUP_DELETE)) {
            var select = document.getElementById('groups');
            var new_groups = [];
            
            // Makes a copy of actual groups without the selected item
            for (var i=0; i<groups.length; i++) {
                if (i != select.selectedIndex) {
                    new_groups.push(groups[i]);
                }
            }
            groups = new_groups;
            
            // Updates the database
            localStorage.setItem('groups', JSON.stringify(groups));
            ux_add_groups_list(true);
            alert(messages.MSG_GROUP_DELETED);
        }
    }; /* db_remove_group() */
    
    // Creates a new group by extracting the members list from meme text field
    var db_new_group = function () {
        var text_content = document.getElementById('text_content');
        var group_name = null;
        var group_members = null;
        var is_duplicate = false;
        
        if (text_content && text_content.value.match(/@[a-zA-Z0-9]+/ig)) {
            group_name = prompt(messages.ASK_GROUP_NAME, 
                                messages.MSG_GROUP_NEW_TITLE);
            if (group_name && group_name.match(/[a-zA-Z0-9]+/ig)) {
                var s = sanitize(escape(group_name));
                for (var i=0; i<groups.length; i++) {
                    is_duplicate = (groups[i].name == s);
                    if (is_duplicate) {
                        alert(messages.MSG_GROUP_EXISTS);
                        break;
                    }
                }
                if (!is_duplicate) {
                    db_add_group(
                        group_name,
                        text_content.value.replace(/^\s+/, '')
                                          .replace(/\s+$/, '')
                    );
                }
            }
        } else {
            alert(messages.MSG_GROUP_EMPTY);
        }
    }; /* db_new_group() */
    
    
    /**
     * Private Methods - UX ----------------------------------------------------
     */
     
    // Adds the "New Group" link
    var ux_add_new_group = function () {
        var span_tips = post_meme.getElementsByClassName('tips_small');
        var anchor_new_group = null;
        var anchor_new_group_text = null;
        var span_tips_sep_text = null;
        
        if (span_tips) {
            // Creates the "New Group" link in DOM
            anchor_new_group = document.createElement('a');
            anchor_new_group.title = messages.MSG_UX_NEW_GROUP;
            anchor_new_group.href = 'javascript:void(0);';
            anchor_new_group.addEventListener('click', db_new_group, true);
            anchor_new_group_text = document.createTextNode('New Group');
            anchor_new_group.appendChild(anchor_new_group_text);
            
            span_tips_sep_text = document.createTextNode('| ');
            
            // Adds the created link
            span_tips[0].appendChild(span_tips_sep_text);
            span_tips[0].appendChild(anchor_new_group);
        }
    }; /* ux_add_new_group() */
    
    // Adds the link to append the selected group to the meme text
    var ux_copy_group_in_meme = function () {
        if (groups.length > 0) {
            var text_content = document.getElementById('text_content');
            var select = document.getElementById('groups');
            text_content.value += ' ' +
                groups[select.selectedIndex].members.join(' ');
        }
    }; /* ux_copy_group_in_meme() */
    
    // Adds the 'groups' section to the meme's options area
    var ux_add_groups_option = function() {
        var bold = null;
        var bold_text = null;
        var div_small = null;
        var anchor_insert_group = null;
        var anchor_insert_group_text = null;
        var anchor_delete_group = null;
        var anchor_delete_group_text = null;
        var opt_sep_text = null;
        
        // Creates the bold 'groups' string
        bold = document.createElement('b');
        bold_text = document.createTextNode('groups ');
        bold.appendChild(bold_text);
            
        // Creates the link to append the group to the meme text
        anchor_insert_group = document.createElement('a');
        anchor_insert_group.title = messages.MSG_UX_INSERT_GROUP;
        anchor_insert_group.href = 'javascript:void(0);';
        anchor_insert_group.addEventListener('click', ux_copy_group_in_meme, true);
        anchor_insert_group_text = document.createTextNode('insert');
        anchor_insert_group.appendChild(anchor_insert_group_text);
        
        // Creates the link to delete the group from database
        anchor_delete_group = document.createElement('a');
        anchor_delete_group.title = messages.MSG_UX_REMOVE_GROUP;
        anchor_delete_group.href = 'javascript:void(0);';
        anchor_delete_group.addEventListener('click', db_remove_group, true);
        anchor_delete_group_text = document.createTextNode('delete');
        anchor_delete_group.appendChild(anchor_delete_group_text);

        opt_sep_text = document.createTextNode(' ');
        
        // Creates the DIV element to contain the 'groups' string
        div_small = document.createElement('div');
        div_small.className = 'small';
        div_small.appendChild(bold);
        div_small.appendChild(anchor_insert_group);
        div_small.appendChild(opt_sep_text);
        div_small.appendChild(anchor_delete_group);
        
        // Adds the whole elements to the options area
        div_sadv.appendChild(div_small);
    }; /* ux_add_groups_option() */
    
    // Updates the groups list
    var ux_add_groups_list = function (
        is_updating // TRUE on updating the list, FALSE on creating the list
    ) {
        var select = null;
        var s = null;
        var o = null;
        
        // Creates/Updates the drop-down groups list
        if (is_updating) {
            select = document.getElementById('groups');
            o = select.getElementsByTagName('option');
            for (var i=o.length-1; i>=0; i--) {
                select.removeChild(o[i]);
            }
        } else {
            select = document.createElement('select');
            select.id = 'groups';
        }
        
        for (var i=0; i<groups.length; i++) {
            s = unescape(groups[i].name + ' - ' +
                limit(groups[i].members.join(' '), 70, ' ...'));
            o = document.createElement('option');
            o.appendChild(document.createTextNode(s));
            select.appendChild(o);
        }
        
        if (!is_updating) {
            div_sadv.appendChild(select);
        }
    }; /* ux_add_groups_list() */
    
    
    // Adds the link to insert the group in the private meemers area
    var ux_copy_private_group_in_meme = function () {
        if (groups.length > 0) {
            var private_sn = document.getElementById('private_sn');
            var select = document.getElementById('groups');
            private_sn.value = groups[select.selectedIndex].members.join(',')
                .replace(/@/ig, '');
        }
    }; /* ux_copy_private_group_in_meme */
    
    // Adds the drop-down list under the text field reserved for private meemers
    var ux_add_private_groups = function () {
        var text_content = null;
        var bold = null;
        var bold_text = null;
        var div_small = null;
        var anchor_insert_group = null;
        var anchor_insert_group_text = null;  

        // Creates the bold 'groups' string
        bold = document.createElement('b');
        bold_text = document.createTextNode('groups ');
        bold.appendChild(bold_text);
            
        // Creates the link to append the group in private meemers area
        anchor_insert_group = document.createElement('a');
        anchor_insert_group.title = messages.MSG_UX_INSERT_GROUP;
        anchor_insert_group.href = 'javascript:void(0);';
        anchor_insert_group.addEventListener('click', ux_copy_private_group_in_meme, true);
        anchor_insert_group_text = document.createTextNode('insert');
        anchor_insert_group.appendChild(anchor_insert_group_text);
        
        // Creates the DIV element to contain the 'groups' string
        div_small = document.createElement('div');
        div_small.className = 'small';    
        div_small.appendChild(bold);
        div_small.appendChild(anchor_insert_group);
        
        text_content = document.getElementById('text_content');
        post_meme.insertBefore(div_small, text_content);
    }; /* ux_add_private_groups() */
    
    // Updates the groups list
    var ux_add_private_groups_list = function () {
        var text_content = null;
        var select = null;
        var s = null;
        var o = null;
        
        select = document.createElement('select');
        select.id = 'groups';   
        for (var i=0; i<groups.length; i++) {
            s = unescape(groups[i].name + ' - ' + 
                limit(groups[i].members.join(' '), 70, ' ...'));
            o = document.createElement('option');
            o.appendChild(document.createTextNode(s));
            select.appendChild(o);
        }
        
        text_content = document.getElementById('text_content');
        post_meme.insertBefore(select, text_content);    
    }; /* ux_add_private_groups_list() */
    
    // Constructor
    return {
        init : function () {
            if (localStorage) {
                post_meme = document.getElementById('post_meme')
                if (post_meme) {
                    db_load_groups();
                    div_sadv = document.getElementById('sadv');
                    if (div_sadv) {
                        ux_add_new_group();
                        ux_add_groups_option();
                        ux_add_groups_list(false);
                    } else {
                        ux_add_private_groups();
                        ux_add_private_groups_list();
                    }
                }
            }
        }
    }
} /* MT_meemi_groups */

MT_meemi_groups().init();
