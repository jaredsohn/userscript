// ==UserScript==
// @name       Openstack Gerrit Painter
// @namespace  http://userscripts.org/users/501676
// @updateURL https://userscripts.org/scripts/source/176191.meta.js
// @downloadURL https://userscripts.org/scripts/source/176191.user.js
// @version    1.0
// @description Painter the people who are especiall in gerrit
// @match      https://review.openstack.org/*
// @copyright  2012+, You
// ==/UserScript==

var get_xml = function(){
    return new XMLHttpRequest();
}


var get_accounts = function(group_name, json){
    
    /*
	groups.result.groups[2].group.name
		Object {name: "Release Managers"}
	groups.result.groups[2].group.name.name
		"Release Managers"
	*/
    var get_group = function(group_name, json){
        for (i=0; i< json.result.groups.length; i++){
            group = json.result.groups[i]
            if (group.group.name.name == group_name){
                return group
            }
        }
    }
    
    /*
	groups.result.groups[3].accounts.accounts[0]
	Object {id: 7366}
	groups.result.groups[3].accounts.accounts[1]
	Object {id: Object, fullName: "Ivan Melnikov", preferredEmail: "imelnikov@griddynamics.com"}
	groups.result.groups[3].accounts.accounts[2]
	Object {id: 4303}
	groups.result.groups[3].accounts.accounts[3]
	Object {id: Object, fullName: "Tim Daly, Jr.", preferredEmail: "timjr@yahoo-inc.com"}
	*/
    var get_group_account = function(group){
        accounts = []
        for (i = 1; i< group.accounts.accounts.length ; i += 2){
            accounts.push(group.accounts.accounts[i])
        }
        return accounts
    }
    
    group = get_group(group_name, json)
    if (group == null){
        console.error('Group: ' + group_name + ' not found');
    }
    return get_group_account(group)
}

var get_project_name = function(){
    full_name = document.getElementsByClassName('gwt-InlineHyperlink')[1].text
    //full_name is 'openstack/nova'
    base_name = full_name.split('/')[1]
    if (typeof(base_name) == 'undefined'){
        return 'nova'
    }
    return base_name
}

/* replace string 'before' with 'after' */
var replace_page = function(before, after){
    //The second param is `modifier`, which means do a global replace.
    patten = RegExp(before, 'g')
    /*tds = document.getElementsByTagName('td')
    
    for(i=0; i<tds.length; i++){
        td = tds[i]
        td.innerText = td.innerText.replace(patten, after)
    }*/
    
    as = document.getElementsByTagName('a')
    
    for(i=0; i<as.length; i++){
        aa = as[i]
        if (aa.children.length == 0){
            aa.innerText = aa.innerText.replace(patten, after)
        }
    }
}

var rename_them = function(accounts, suffix){
    for(a=0; a<accounts.length; a++){
        account = accounts[a]
        replace_page(account.fullName, account.fullName + suffix)
    }
}


get_groups = function(xsrf){
    xml = get_xml()
    xml.open('post', '/gerrit/rpc/GroupAdminService', true)
    xml.setRequestHeader('Accept', 'application/json,application/json,application/jsonrequest')
    xml.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
    xml.onreadystatechange = function(){
        if(this.readyState==4 && this.status == 200){
            console.debug('We got all groups, begin to parse it');
            json = JSON.parse(this.responseText)
            
            console.debug(json)
            console.debug('Find out groups accounts');
            core_accounts = get_accounts(project_name+ '-core', json)
            ptl_accounts = get_accounts(project_name+ '-ptl', json)
            ms_accounts = get_accounts(project_name+ '-milestone', json)
            
            console.debug('Going to rename Hackers');
            rename_them(core_accounts, '[c]')
            rename_them(ptl_accounts, '[p]')
            rename_them(ms_accounts, '[m]')
            console.debug('success')
        }
    }
    
    body = {}
    body['jsonrpc'] = '2.0'
    body['method'] = 'visibleGroups'
    body['params'] = []
    body['id'] = 2
    body['xsrfKey'] = xsrf
    body = JSON.stringify(body)
    
    console.log('Make request' + body)
    xml.send(body)
}

function get_xsrftoken(callback){
    xml1 = get_xml();
    xml1.open('get', '/', true);
    xml1.onreadystatechange = function (){
        if(this.readyState==4 && this.status == 200){
            temp = document.createElement('div');
            temp.innerHTML = this.responseText;
            eval(temp.getElementsByTagName('script')[0].innerHTML);
            xsrf = gerrit_hostpagedata.xsrfToken;
            console.debug('we got xsrf token: ' + xsrf)
            callback(xsrf);
        }
    }
    xml1.send()
}

/* ===========main================*/

function Greasemonkey_main() 
{
    project_name = get_project_name()
    console.log('monkey patch for ' + project_name);
    get_xsrftoken(get_groups)
}

function check(){
    url = document.URL
    
    /* only match url like https://review.openstack.org/#/c/23232/ */
    if (url.indexOf('/#/c') > -1 ){
        console.debug(document.URL)
        
        Greasemonkey_main()
        
    }else if(url.indexOf('/#/q/') > -1){
        Greasemonkey_main()
        
    }
}

window.onhashchange = check;
setTimeout(check, 1000);