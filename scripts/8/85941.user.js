// ==UserScript==
// @name           Schulterglatze Seitenanfang/-ende Button
// @namespace      Schulterglatze
// @description    Button, um an das Ende der Webseite und wieder zurück zu kommen
// @include        http://schulterglatze.tld/*
// @include        http://*schulterglatze.tld/*
// ==/UserScript==

var position;
position = window.innerWidth / 2 + 485;

var wrapper, div, style, a, a2, a3, href, img, src, alt, width, height, name, name2;
wrapper = document.getElementById('wrapper');
if (wrapper) {
    div = document.createElement('div');
    wrapper.parentNode.insertBefore(div, wrapper);
    style = document.createAttribute("style");
    style.nodeValue = "position:fixed; bottom:35px; left:" + position + "px;";
    div.setAttributeNode(style);
    a = document.createElement("a");
    div.appendChild(a);
    href = document.createAttribute("href");
    href.nodeValue = window.location.pathname + "#anfang";
    a.setAttributeNode(href);
    img = document.createElement("img");
    a.appendChild(img);
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAZCAMAAABkZtKLAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAADQ0NERERFBQUIyMjJCQkJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZW1tbXFxcXV1dYmJiZmZmampqeXl58tZ3lJSUnJycn5+foqKipKSkpqamqKioqqqqq6urrq6usLCwsrKytbW1t7e3urq6vr6+xcXFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACNgbvQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAFAklEQVRIS51ViXbbNhCUlbaRo4gkeIjiAYL3LYUso1auj8SxaVqX5f7/x7gDSU6cvuemLyuQAIHFYDF7qPf09Pem/XKzXK2Wy+725rbtum770LbrFT6/3LTbHWSL1fb2Dhrrh912vVl37Wqz3aCtVquu7VbtNeSma9vbdrleQ/vu0+L66an3tNs9rqC7WS33L4Avd4+bzW73sMFZm8fHHTDul/fd6uHhYb3ZPe4A2t1BebPd4oTu9q7r2pvr6y/3q/u27Tj4qru5HFXZU6/t2qsgSvMiz7JsOp2WeV5VTd0sFot6VlaL8/Ozpq7Kqpkvzhbz5uz8fA5pGrSmKrO4zLM4T5M0DPzQDwOXuo5t24ZikE+N3bv8dGk5lDI38OM0ydIkSvLpDLtrABTT+RmOOZsXxXQ2q5um5sB7qcqiLPM4ms6KaQU7yqLIoiTL0jj2PJ+Zpn+h93vzK98P4zDO8pSbn+RZWc6qajYtirqKo1nFr1FnYTar54u91XWNY5qqKMoiDhMYFCdpGmIUhWmaJGkUhZFLmWmd9HvJha5bru9jLgzjOM1KPFPef8CrbvDirfz41+JPDKq6/lAc5rLQDfMSXE7zIs2nZRIncRz5LAg9z7WpZZyc9GYXpu04nh9G2ABOkoA6zMGapkiq4TBTVUyPWRYDn0GeuIaiWK5nKEQxXM+UZVXXDcsyDCeIOUQeAioMfcaoCdurS2wMYep0Vv/+8eMfCRm9KiR2X10TLc9lXuhb1IO4DmU2bK8uqYMhc/0gAHehPvr8ecSfz1z46PjN58Rv398Wj+uaGzguMwzbNCe6pkM4M5foNRN3M21+LOF4B/Rje9Htj/3X9LM+CbwgcMcTUDIGumVy3qtLncMGfsRdmhbSz6ILtmXZhqbCDRM8umH2T3rNFXMc5nLxvDCMxJ9FlxAwcRwy2zRM09IVhTMzv3I45V4UBDFiN9/b/h053JHHuRfMvOR9ry8yx4Oh1FAVVVGIIAwP6AhIz+eBFCHZOPr35v+Y972+QE2Luq5tqOOJrhNhyNGbK/BvUwh4SdKYM3NEP97gf6KPNFnVxqo8GomiAPDBAOjFha5o8IVp2wz8B/LP2i4i9HRzohJJkYiig5s9MyDFtVELwoAh7LUXQfeDeD/kxLO+6ji247uWKouCgChXCNBL1BlkvaIaE8tQdUsWXs9Vgd/7FRFN13Bcj5qTiSwRTUPQ7OPd1PXxBMkE/lVVV+FyTZUkIhEZZxIJJGo4nRCZqBNjLAsCIYosCYIgElEUoYXdqITMM3kNoLY9VhUdMxwdMQOHep7j8VqGAuEnceBNZNWk1KaMWpY51gwKJUMlmqEZloN65jLKPMfmG6hFqSaKsqJZDPURkY3CBzfuKwGyiTlBhLqcxUk+m5ZZXkQBQ3B5jCJUXQ9/NbxQwMDBL/IE18NV1LGmKmiqpo11HnKT8cQ2vTApIFlA/Qhp1e/zCqxrWGfM8wMfEiRpwO/Ha6iNS0X7igpjbUoGGgxH6sH7rgsvUgvJYuF0RDlCBlUAYNyhCqgcwXaf/XqUweDXweF5+/b09HS4l/fvRfiAEAkiC+8ESYJXiKzCaMwSMP8eOsN3w99O373lm5/R0ANd6T/Lm6+DN8/S738d/ueA633F4YOTw6+nKzzEUBWGo9FwMByhQ6YhLvAvIgwGfECIMBju+6NgGUqHlb0i9gujw2WHSNIBgHgb/QOjKjj9k8rNuQAAAABJRU5ErkJggg==';
    alt = document.createAttribute("alt");
    alt.nodeValue = "nach oben";
    img.setAttributeNode(alt);
    width = document.createAttribute("width");
    width.nodeValue = "93";
    img.setAttributeNode(width);
    height = document.createAttribute("height");
    height.nodeValue = "25";
    img.setAttributeNode(height);
// 2. Button
    div = document.createElement('div');
    wrapper.parentNode.insertBefore(div, wrapper);
    style = document.createAttribute("style");
    style.nodeValue = "position:fixed; bottom:5px; left:" + position + "px;";
    div.setAttributeNode(style);
    a = document.createElement("a");
    div.appendChild(a);
    href = document.createAttribute("href");
    href.nodeValue = window.location.pathname + "#ende";
    a.setAttributeNode(href);
    img = document.createElement("img");
    a.appendChild(img);
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAZCAMAAABkZtKLAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAADQ0NERERFBQUIyMjJCQkJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWWFhYWVlZW1tbXFxcXV1dYmJiZmZmampqeXl58tZ3lJSUnJycn5+foqKipKSkpqamqKioqqqqq6urrq6usLCwsrKytbW1t7e3urq6vr6+xcXFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsRwXSQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAE50lEQVRIS6VVeX+bOBB13O3WqWswBgziPsQNLiz1OpujSRNCfMXp9/8y2SfstE5/bf/pWCAhjZ5GM2/Gvefnr5vmy+1ytVou27vbu6Zt2+1j06xX+Pxy22x3kC1Wm7t7aKwfd9v1Zt02q812g7ZardqmXTU3kNu2ae6a5XoN7fvPi5vn597zbve0gu5mtexeAF/unjab3e5xg7M2T087YDwsH9rV4+PjerN72gG0vYfyZrvFCe3dfds2tzc3Xx5WD03TMvBVe3s5KpPnXtM2V34Qp1maJElRFHmalmVd1YvFoprl5eL8/Kyuyrys54uzxbw+Oz+fQ+oarS7zJMzTJEzjKKa+Rz3qO6ZjGYZBRCJ8ro3e5edL3TJN2/G9MI6SOAqitJhhdwWArJif4ZizeZYVs1lV1xUD7qTMszxPw6CYZUUJO/IsS4IoSeIwdF3P1jTvQun35leeR0MaJmnMzI/SJM9nZTkrsqwqw2BWsmtUCU1m1XzRWV1VOKYusyzPQhrBoDCKY4pRQOM4iuIgoIFj2pp+0u9FF4qiO56HOUrDME5yPAXrP+JV1Xixln/6b/EvBmVVfcz2cwl1aJrDl0WaxWmRR2EUhoFn+9R1HcPUyclJb3ahGZblejTAhjShhum4BtEUcSxqrk1EUbfhSRONUr8baLpmYY6QqTSeSIokCJKiEN3QiOXHKQUUpZ5tmxpsLy+xncLUYlb98ykWRr8UwfzNYreL16mnmy7EsUzbgO3lpWlhaDue79NIHV1fj9hzzYSNDt/d/PfFI51O5aAl24QYmqYqsgJhnrlEL2s6IZphugLD26Mf2lF3hL7HewHtrGAfgjNV4ZIp0HWN+b28VBis7wUspOM/Q+eILCEEKh6FaP2TXn1lWwgSE9el/J+hj0NqI7qapiuiyDwzv7KYy93A98Nob/sr57BoHeaOPdPF4+CZlzBdj3iEkEiiJIoCxw336CCk6zEiBQFDf23+z/3e6bzyezfDOY5BpKmqKAI3ZOj1FfxvmBAX+XaEfkSFF94ccebn6KOpNAExeQ7ggwHQswtFlBELzTBsy2ac+QPbeU2VhLE4FkQFvuk8A6c4BmoB9W1bemXeD3znf8H/73yXPEeXJjzHgeWiAPQcdYbIoigRVSeSxP06VzkBtz4W4UdlXnNNTVUnY0GWQZqO75qiTFUkE/yPcAsTWRYn47GA68nyhOMEAUfL0ngsSdOpyPOY73TEyaRThi7eCiEKSpLrmoYxlUSFwPg9ZxBQ17VcVstQILwo9F11ImmmaZi2qevaVCYmlIgkyEQmuoWq5tim7VoG22Dqpinz/ESUdRv1EczWgK4ZXSVANtmWH6AuJ2GUzoo8SbPAt3WUStsEVVExDZRFQlSiDP6aqJKkwHBpKksimiTLU4VRTp2qhubSKIMkvukFSKt+n1VgRca6bbue70H8KPbZ/VgNNXCpoKuoMNYwhYEMw5F6KHqOY6Ee60gWHaeD5ahWqAIAYwEVkU8j2O7Zbw8yGLwd7J93705PT4edfPjAIwaCMIZMuPcc3C/D3RKMxqwg8PwH6AzfD/8+ff+ObX5BQw90sf8ib74N3rxIv/9t+NsB0/uGwwYn+19PERnJUBWGo9FwMByhQ6aBKfir4AYDNhAEbjDs+oNgGUr7lU4R+7nR/rJDJOkAQKyN/geEGjZZERwJgAAAAABJRU5ErkJggg==';
    alt = document.createAttribute("alt");
    alt.nodeValue = "nach oben";
    img.setAttributeNode(alt);
    width = document.createAttribute("width");
    width.nodeValue = "93";
    img.setAttributeNode(width);
    height = document.createAttribute("height");
    height.nodeValue = "25";
    img.setAttributeNode(height);
    a2 = document.createElement("a");
    name = document.createAttribute("name");
    name.nodeValue = "anfang";
    a2.setAttributeNode(name);
    wrapper.parentNode.insertBefore(a2, wrapper);
    a3 = document.createElement("a");
    name2 = document.createAttribute("name");
    name2.nodeValue = "ende";
    a3.setAttributeNode(name2);
    wrapper.parentNode.insertBefore(a3, wrapper.nextSibling);
}