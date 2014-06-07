// ==UserScript==
// @name           simplebuildtool
// @author         Premasagar Rose
// @authorurl      http://premasagar.com
// @namespace      http://dharmafly.com
// @description    For <http://mvnrepository.com> - Adds a new section to an Artifact page, with the Simple Build Tool syntax for the artifact.
// @include        http://mvnrepository.com/artifact/*
// @include        http://www.mvnrepository.com/artifact/*
// ==/UserScript==

(function(){

function trim(str){
    return str.replace(/^[\0\t\n\v\f\r\s]+|[\0\t\n\v\f\r\s]+$/g, ''); // match the full set of whitespace characters
}

function parent(node, tagName){
    tagName = tagName.toLowerCase(),
    nodeName = '';
    while(nodeName !== tagName && nodeName !== 'html'){
        node = node.parentNode;
        nodeName = node.nodeName.toLowerCase();
    }
    return nodeName === tagName ? node : false;
}

function dependenciesNode(){
    var preElems = document.getElementsByTagName('pre'),
        preElemsLen = preElems.length,
        i, xml;

    for (i=0; i<preElemsLen; i++){
        xml = trim(preElems[i].textContent);
        if (xml.indexOf('<dependency>') === 0){
            return preElems[i];
        }
    }
    return false;
}

function nodeContents(tag, xml){
    var m = xml.match(new RegExp('<' + tag + '>([^<]*)</' + tag + '>'));
    return m ? m[1] : null;
}

function dependencies(xml){
    return {
        groupId: nodeContents('groupId', xml),
        artifactId: nodeContents('artifactId', xml),
        version: nodeContents('version', xml)
    };
}

function output(deps){
    return (deps.groupId ? '"' + deps.groupId + '" %' : '') +
           (deps.artifactId ? ' "' + deps.artifactId + '" %' : '') +
           (deps.version ? ' "' + deps.version + '"' : '');
}

function init(){
    var node = dependenciesNode(),
        xml, deps, parentNode, depsTable;

    if (!node){
        return false;
    }
    xml = trim(node.textContent);
    deps = dependencies(xml);
    depsTable = parent(node, 'table');

    if (depsTable){
        table = document.createElement('table');
        table.setAttribute('class', 'grid');
        table.setAttribute('width', '100%');
        table.innerHTML = '<tr><th><a href="http://code.google.com/p/simple-build-tool/">Simple Build Tool</a></th></tr>' +
            '<tr><td>' + output(deps) + '</td></tr>';

        depsTable.parentNode.insertBefore(table, depsTable.nextSibling);
        depsTable.parentNode.insertBefore(document.createElement('br'), depsTable.nextSibling);
    }
}

init();

}());