// ==UserScript==
// @name Encoder/Decoder
// @include http://www.facebook.com/*
// @exclude http://www.facebook.com/ai.php*
// ==/UserScript==

var Comment = function(c) {
    this.GetActionBar = function() { return c.getElementsByClassName('commentActions')[0] }
    this.GetBody = function() { return c.getElementsByClassName('commentBody')[0] }
    this.GetActor = function() { return c.getElementsByClassName('actorName')[0] }
    
    this.SetActorName = function(str) { this.GetActor().innerText = str }
    this.GetActorName = function() { return this.GetActor().innerText }
    
    this.AddActionLink = function(str, act) {
        var self = this
        
        link = document.createElement('a')
        link.onclick = function() { act(self) }
        link.innerText = str
        
        bar = this.GetActionBar()
        bar.innerHTML += " \xB7 "
        bar.appendChild(link)
    }
    
    this.GetFullText = function() {
        body = this.GetBody()
        root = body.getElementsByClassName('text_exposed_root')[0]
        if (root != undefined) {
            if (root.classList.contains('text_exposed'))
                return root.innerText
            
            root.classList.add('text_exposed')
            fullText = root.innerText
            root.classList.remove('text_exposed')
            return fullText
        }
        return body.innerText
    }
}

var comments = document.getElementsByClassName('uiUfiComment')
for (i = 0; i < comments.length; i++) {
    var cmt = new Comment(comments[i])
    cmt.AddActionLink('From Binary', function(self) {
        bin = self.GetFullText()
        buffer = ''
        for (begin = 1; begin <= bin.length - 8; begin += 8)
            buffer += String.fromCharCode(parseInt(bin.substring(begin, begin + 8), 2))
        
        alert(buffer)
    })
}
