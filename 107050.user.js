// ==UserScript==
// @name ex.nu
// @namespace http://masawada.info/
// @description extention of nx.nu
// @include http*
// ==/UserScript==
// UPDATE INFO http://masawada.info/

// GUI
function setClass(d,v){
    for(var k in v){
        d.style[k] = v[k];
    }
}

var base = document.createElement('p');
var button = document.createElement('a');
var view = document.createElement('input');

setClass(base,{
    position: 'fixed',
    top: '0',
    right: '0',
    margin: '0',
    padding: '2px',
    height: '24px',
    width: '24px',
    background: 'rgba(0,0,0,0.1)',
    zIndex: '99999999'
});


button.innerText = '+';
var btnDisp = 'block';
button.onclick = function(){
    var btnDispTemp = view.style.display;
    view.style.display = btnDisp;
    btnDisp = btnDispTemp;
    button.innerText = (btnDisp === 'block')? '+' : '-';
    base.style.width = (btnDisp === 'block')? '24px' : '160px';
};
setClass(button,{
    display: 'block',
    height: '24px',
    width: '24px',
    margin: '0',
    padding: '0',
    color: '#000',
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    textDecoration: 'none',
    float: 'right',
    cursor: 'pointer'
});


view.type = 'button';
view.value = 'Shorten URI';
view.id = 'UXUNURLView';
view.onclick = function(){
    this.value = 'loading...';
    
    var s = document.createElement('script');
    s.innerHTML = 'function _setURLToUXNUURLView(data){\n'+
        'var d=data.data;\n'+
        'var view=document.getElementById(\'UXUNURLView\');\n'+
        'if(d.safe===\'true\'){\n'+
        'view.value=d.url;\n'+
        'view.type=\'text\';\n'+
        'view.style.cursor=\'text\'\n'+
        'view.onclick=function(){};'+
        '}else{\n'+
        'view.value=\'request refused\';\n'+
        '}\n'+
        '}';
    var s2 = document.createElement('script');
    s2.src = 'http://ux.nu/api/short?url='+encodeURIComponent(location.href)+'&callback=_setURLToUXNUURLView&format=jsonp';
        
    document.body.appendChild(s);
    document.body.appendChild(s2);
};
setClass(view,{
    display: 'none',
    height: '18px',
    width: '124px',
    margin: '2px',
    border: '1px solid #888',
    background: '#FFF',
    font: 'normal 13px sans-serif',
    lineHeight: '14px',
    float: 'right',
    outline: 'none',
    cursor: 'pointer'
});


document.body.appendChild(base);
base.appendChild(view);
base.appendChild(button);