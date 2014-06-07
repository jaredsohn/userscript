// ==UserScript==
// @name          Heello Avatar Mask
// @namespace     http://userstyles.org
// @description   Avatar mask 
// @author        kawau
// @match         http://heello.com/*
// @match         https://heello.com/*
// ==/UserScript==

(function(){
var parent;
var data = 'data:image/gif;base64,'+
    'R0lGODlhQABAAPcAAAAAABUbFBglISYnDSklFDguGDsyGCorKCU2NTAvLjc2KDk4NS9Dd0M6IkQ8'+
    'M1JCG0dCLENBNllOL1lTKlhRPWBLHmZaKWldN3VdJW9iPHltK3BhNEVEQ0pKSVdXVFdhcnVoSnh0'+
    'SHt9W2RkZGtoYGxsbWpndW97ZGh2enFyZnFxcT9NnklMi09Zi09Xk1FemElSqElatllggFhpkU5n'+
    'r01itVhnq1Vot15xr15yt2pqgWpylnltgHV5iWJupmVurWFmsGRyo2JyqWl3rG57omt5rGNzsmV4'+
    'tWN4vGp7sml9vXF9pHF/s1RnwWd4wHWCZHqCd3mGhneDl2uAqHeBqXeGtYlzGJNzE4dqKoh4M5R6'+
    'Mol2TYh7UoN8aJuCHYqAJZuFKpuJN6aEHL6dFqqMKqaMM66WJ6qVOrqLLLaNMrmXK7eXN7yiKbqk'+
    'OI+CT4iHXJaIR5aOVp6ST5yXXY2Ja4eDcouRfpiSaZOSeayYSqmXWLyXSLedUKaYZ6mcerOedqOh'+
    'WbulTLmoWa6jYqile7ikYbeleb6zdseeIsWWOtGYOsaoOc+yO9asJ9aqN962Kdq1OeGxHOe5KeW6'+
    'NfC/KvO9PMaaQ8aeU9CeQsmmR8WpV8yzS8uzWNemR9etU9m3R9a2V8WqZs6nf8u1bMa8dNm8Ztm4'+
    'deGvTOO4RuW6VPS7SPq/UeK8a+7ELOzDN/XFK/XIOPrSO9vBVdrFZ9LCc+jDSufGWvfJRfPMV/fT'+
    'SfTWVejGZObIdOvRafTOYfDZY/rafoaKho+OlYeUh4CSkJWMgJeZipmdm4WMpoORrYuSpY2co4qV'+
    'tZieo5+gj5yim5+hp6SeiqmmjKWmmK+wmbOlmb62jLi2nKispqy0qLCvoba6qri8sb3BrL3CssCv'+
    'kMm8jsW6mNG8ncS9pM3FicvCmd3IitbImtXSjsbFqcTGs9TLptHLtdrTrNnVtOPEhuXGk+nTi+nT'+
    'nvfZm+PVrOTct/TeoOjguPHgp/fnusjIxdXUx/brxQAAAAAAAAAAACH5BAEAAP8ALAAAAABAAEAA'+
    'AAj/AP8JHEiwoMAOJI4lK/LDiJEjTnAYuXHDxo0YMWjcOJIkiY9m6aalWGCwpMmTBA+UUFbFoZEf'+
    'SYoIsXijxkWKNWvkuJEjyRIqyISRREkU5YEezKpYtGGDGTZq6qRQrGFzalVmyIgcQaIkSTIPHoqK'+
    'JZhASjKlQCzOSJeOHbYgFGPAqBmjSc0p06ZxW4IkxxAmOz4MHUt0gRQp0KJEmcFARx03c+LQQfHi'+
    'hQ4/fvoUa7EiRpBu3dJt2yGECAoUUkwcIIzSgaFD6EIMiOABkK5YjyblyqUrUyZcqBx18gTKEA8W'+
    'MvAcyjSLFiADARQQAlSAdUnXs3QJEkCgQJ5csWC9/4IFK5YkVJ1OoUlkqf1wTp9qkb8VS1ce6Cd6'+
    'yTJgnaCCcKHoggscCBCQxW2xjCcJeY4okggalnRyiSeWJJIIKrmQB0uGG2ZigQi25AIKBP39w0Ef'+
    'vWSYCySc1AKeeK+8Ikkkk5zioCV77LFGe+0pUskt5LkipCu71WJkLaAo0N8Fv9zi5Hiw6LLLLuTF'+
    'KEkjoMBjyiWXWJjGHjwmoggqkgwppJGTuPLJmpoMJhYBnOiSYSutvGJLNMNgs0ssseQCjD325FMP'+
    'PeKIEgqXfPCxRyamvONII5NEKgseeMxSCyTxfbIBYQvooYuT5E0CyyjLZHPNJrf4Mk8+rPLjqjvq'+
    'jP8zTji0fhPOOuuQsokkaQoShRTS1PIJJEZyEoFYKnDBS4auaHiLJttso4cs8chDz7X13FPPtuyo'+
    'o4433HCTjjrssJMOOaUMu8kdxAyzCSSbMPIJJ0oWNIIEHBAUgSHx4WILLJXAMgkka5ABijzt0LNO'+
    'Owy344479biTTjfefKsOxNu6Q885nGxyxh13ZLLIyItwEkIJAqmgAAihdALKBfkuAE4WmezihzSy'+
    '1MJrI2MsYs46CuOaDq4OP8wWaKGx1c467KxzDjibLGJGG4tk0kYgobQRxgEdUFDILql0UmEnmjQA'+
    'gh5rpGLIM9JwkuYjjXxiyjlsHV33uOrg7c3eFXv/m/e453LSBhtstNEGIVAUsoYWpuzSCSadsNee'+
    'haCk4ogs0zxzxyKRDjx3OeWkM84212wDmt94f8u3xaezVU7Whp/xBhR3JNJJ5BYmggkmk+eeSi1r'+
    'nCGGI5AMXMo5dJfTTTnRNr8NuNxYvLc63CDdTfOgpSNIG1ZnQYccbeQO+Smd+Ca2mIig8okaaiAC'+
    '6SSfIH/OOum0U7fz3ETLDfThgguu89kLRyDasIYyhOEMa7Dd7W4nOR5ZIg2dWMQa1LAISEBiFu9w'+
    'mtDu5rxseHAb2chfuJzXvOp5Kx3nEETw1LCGHZVPEQt0YHvWkwg2fCJSvIDHOkIXjuuVbhve0odB'+
    '//SRjWYEIxjPwAY2PJi/5gGuHaMg4AQzwYoF3k6GlmBfCytRC16coxzhGNc+SiQQbjwDGkr0YDc8'+
    'eI1rlGMUBWOPJ8SExQdaCA1qQEUtSkErdZARJfrgBjamkQ1qZGMa4BAEhC60iluo4pEOZA8ixJCJ'+
    'TYzCGuP4I2EOmRdpAAKBCbzdKVKBCkusQUdpSEMZyvCJPUijGpq0DhKlcYfFGYAABniABbCgBS1g'+
    'AQMSeAAWtvCHPeRBGrHsjx2MAQcyTMAgJRiBCgZSgC48IQxhiEYyrSONLYDhC2NxQAo04AVCbNM6'+
    'VrDCGwiTAStc4ZzwPIkerBDPetrznvjMpz73yTTPfvrznwANqEAHStCCGvSgCE2oQhfK0IY69KEQ'+
    'jahEJ0rRilr0ohjNqEY3ytGOevSjDA0IADs=';

if (location.pathname.substring(0, 9) == '/messages'){
    parent = '';
} else if (document.getElementById('single-ping')){
    parent = '';
} else {
    parent = '#pings .ping[data-id]';
}

function iconMASK(){
    var elements = document.querySelectorAll(parent+':not([mask-added])');
    for(var i = 0; i < elements.length; ++i){
        var e = elements[i];
        var hakofugu = document.createElement('img');
        hakofugu.setAttribute('src', data);
        hakofugu.className = 'icon-mask';
        e.getElementsByClassName('avatar', 'div')[0].getElementsByTagName("a")[0].appendChild(hakofugu);
        e.setAttribute('mask-added', '1');
    }
}

if (parent){
    document.styleSheets[0].addRule('div.avatar', 'position: relative; left: 0px; top: 0px;');
    document.styleSheets[0].addRule('div.avatar a img.icon-mask', 'position: absolute; width: 50px; left: 0px; top: 0px;');
    iconMASK();
    setInterval(iconMASK, 1000);
}
})();

