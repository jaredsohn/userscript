// ==UserScript==
// @name lovely ux.nu
// @namespace http://masawada.info/
// @description <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3
// @include http*
// ==/UserScript==
// UPDATE INFO http://masawada.info/

if(location.href.match('://ux.nu/')){
    var s = document.createElement('script');
    s.innerHTML = 'function transferToUXNU(data){\n'+
    'var d=data.data;\n'+
    'if(d.safe===\'true\'){\n'+
    'location.href=d.exp;\n'+
    '}\n'+
    '}\n';
    document.body.appendChild(s);
    
    var s2 = document.createElement('script');
    s2.src = 'http://ux.nu/api/expand?format=jsonp&callback=transferToUXNU&url='+location.href;
    document.body.appendChild(s2);
}else{
    var d = document.createElement('p');
    var v = {
        position: 'fixed',
        top: '0',
        right: '0',
        margin: '0',
        padding: '2px',
        background: '#000',
        color: '#FFF',
        zIndex: '9999999'
    }
    for(var k in v){
        d.style[k] = v[k];
    }
    
    d.innerHTML = '<input id="uxnuurlview" type="button" value="shorten with ux.nu">';
    d.firstChild.onclick = function(){
        this.type = 'text';
        this.value = 'loading...';
        
        var s = document.createElement('script');
        s.innerHTML = 'function _setURLToUXNUURLView(data){\n'+
            'var d=data.data;\n'+
            'var view=document.getElementById(\'uxnuurlview\')\n'+
            'if(d.safe===\'true\'){\n'+
            'view.value=d.url;\n'+
            'view.onclick=function(){};'+
            '}else{\n'+
            'view.value=\'page is unsafe\';\n'+
            '}\n'+
            '}';
        var s2 = document.createElement('script');
        s2.src = 'http://ux.nu/api/short?url='+encodeURIComponent(location.href)+'&callback=_setURLToUXNUURLView&format=jsonp';
        
        document.body.appendChild(s);
        document.body.appendChild(s2);
    }
    var c = document.createElement('a');
    c.innerText = '×';
    c.style.color = '#FFF';
    c.style.fontSize = '14px';
    c.style.cursor = 'pointer';
    c.onclick = function(){d.style.display = 'none';};
    
    d.insertBefore(c, d.firstChild);
    document.body.appendChild(d);
}