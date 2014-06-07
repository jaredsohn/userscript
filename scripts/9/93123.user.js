// ==UserScript==
// @name           Free gift railgun
// @author         g4ptek
// @description    Free gift Railgun.
// ==/UserScript==

javascript:(function()%7B%24.post('http%3A%2F%2Ffacebook.mafiawars.com%
2Fmwfb%2Fremote%2Fhtml_server.php%3Fxw_controller%3Drequests%26xw_actio
n%3Dfriend_selector%26req_controller%3Dfreegifts%26free_gift_cat%3D1%26
free_gift_id%3D209'%2C%7B'sf_xw_user_id'%3A%2Fsf_xw_user_id%3D(%5Ba-z%5
D%5C%7C%5B0-9%5D%2B)%2F.exec(document.body.innerHTML)%5B1%5D%2C'sf_xw_s
ig'%3Alocal_xw_sig%2C'ajax'%3A'1'%2C'liteload'%3A'1'%7D%2Cfunction(data
)%7Bvar%20t%3D%2Fcontent%3D%22(.%2B)%3Cfb%3Areq-choice%20url%3D'(http.%
2B)'%20label%3D%26quot%3B(.%2B)%26quot%3B%20.%3E%2F.exec(data)%3Bprompt
(t%5B1%5D%2Ct%5B2%5D)%7D)%3B%7D)()%3B