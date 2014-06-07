// ==UserScript==
// @name           Insert All
// @namespace      http://userscripts.org/scripts/show/161438
// @version        1.1
// @description    教室日誌一鍵寫入這樣w
// @match          http://210.71.78.184/cdsys/StuUser/Insert.aspx
// @updateURL      https://userscripts.org/scripts/source/161438.meta.js
// @downloadURL    https://userscripts.org/scripts/source/161438.user.js
// ==/UserScript==

function main(){
   
    var myDiv = document.createElement("div");
    myDiv.style.position = "fixed";
    myDiv.style.top = 0; 
    myDiv.style.right = 0;
    
    var sendButton = document.createElement("button");
    sendButton.innerHTML = "一鍵寫入";
    sendButton.addEventListener("click", function(){sendAll(document.getElementById("Form1"));}, true);

    myDiv.appendChild(sendButton);    
    document.body.appendChild(myDiv);
    
    
}

function sendAll(form) {
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    
    var sending = document.createElement("div");
    sending.id = "sending";
    sending.style.position = "fixed";
    sending.style.top = 0;
    sending.style.bottom = 0;
    sending.style.left = 0;
    sending.style.right = 0;
    sending.style.backgroundColor = "rgba(255,255,255,0.8)";
    sending.innerHTML = "<h1>正在傳喔...不要關喔0.0</h1>";
    document.body.appendChild(sending);
    
    var url = "http://ck101.twbbs.org/Insert.php";
    var data =  serialize(form);
          
    var script = document.createElement("script");
    script.type = "text/javascript";
            
    var msg = data;
            
    script.src = url + "?" + msg;

    document.head.appendChild(script);
          

}

function serialize(form) {
        if (!form || form.nodeName !== "FORM") {
                return;
        }
        var i, j, q = [];
        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
                if (form.elements[i].name === "") {
                        continue;
                }
                switch (form.elements[i].nodeName) {
                case 'INPUT':
                        switch (form.elements[i].type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                        case 'button':
                        case 'reset':
                        /** case 'submit': */
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                                break;
                        case 'checkbox':
                        case 'radio':
                                if (form.elements[i].checked) {
                                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                                }                                               
                                break;
                        case 'file':
                                break;
                        }
                        break;                   
                case 'TEXTAREA':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                case 'SELECT':
                        switch (form.elements[i].type) {
                        case 'select-one':
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                                break;
                        case 'select-multiple':
                                for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                                        if (form.elements[i].options[j].selected) {
                                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                                        }
                                }
                                break;
                        }
                        break;
                case 'BUTTON':
                        switch (form.elements[i].type) {
                        case 'reset':
                        case 'submit':
                        case 'button':
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                                break;
                        }
                        break;
                }
        }
        return q.join("&");
}

main();