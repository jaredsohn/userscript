// ==UserScript==
// @name           nKflickrPuzzle
// @namespace      localhost
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// ==/UserScript==
/* ok, I need more precize domain info ... users can help me, or not? */
nKflickrPuzzle = {
    optimalDimension: 100,
    frameBorder: 12,
    frameColor: 'grey',
    pieceBorder: 2,
    pieceColorLight: 'white',
    pieceColorDark: 'silver',
    playPuzzleGrey: 'R0lGODlhOAAYAIAAAP///2ZmZiH5BAAAAAAALAAAAAA4ABgAAAKChI+py+0Po5y02oCz3tl6ECCYGB7lR52gOppoxcbi0oFJW6qMbLK0EfLZchCOcUPDkXCt1LF2m7ls0xRJGu2NiFBrD/vy8IBh1Ji6Ig6326Wu8YRyyfQhOBJv1tQnNbBZdFUlFDR4F/hluJTGqJH2tiNYVwYjiUbpFIe5ydnp+QlaAAA7',
    playPuzzleColorDown: 'R0lGODlhOAAYALMAAP//////AP8A//8AAJmZmWZmZgD//wD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA4ABgAAATgkMhJq704awm6/2AojmRJlGiqkidQvHAsw2sdtsWgD+/3CkBBwUbs4Ha8oecXVBZrx11vWQgKRYlsJwHSArhfVicndbqqTew27AFz3eLzbE4LZeHt+9YraoXoMWptH3hrI34gBQGLAS8Ijwhmg3lacHpxf4yNBZCRTzaIPpqOkJKfJiOKjKSPTpeWlZWElx6hVICua4VgYbxsN6m4rl54vIVffLWpB8wHLwbQBrmTb5O/1x+2Y83OBdHS1ntvsePkvgDaLtzP0aanh8vN7NDu78AiwvX22fv99/4A0wH8FAEAOw==',
    errorMessages: ['',
        'Button bar not found.',
        'Page Photo ID not found.',
        'Page Photo Div not found.',
        'No images found in Page Photo Div'
    ],
    run: function () {
        this.addInterfaceElements ();
    },
    addInterfaceElements: function () {
        var button_bar = document.getElementById ('button_bar');
        if (button_bar === null) return this.error (1);

        var mybutt = document.createElement ('img');
        mybutt.style.cursor = 'pointer';
        mybutt.id = 'photo_gne_button_play_puzzle';
        mybutt.className = 'photo_gne_button';
        mybutt.alt = 'Play puzzle';
        mybutt.title = '';
        mybutt.border = 0;
        mybutt.height = 24;
        mybutt.width = 56;
        mybutt.src = 'data:img/gif;base64,' + this.playPuzzleGrey;
        mybutt.addEventListener ('mouseover', function () {
            this.src = 'data:img/gif;base64,' + nKflickrPuzzle.playPuzzleColorDown;
        }, false);
        mybutt.addEventListener ('mouseout', function () {
            this.src = 'data:img/gif;base64,' + nKflickrPuzzle.playPuzzleGrey;
        }, false);
        mybutt.addEventListener ('click', function () {nKflickrPuzzle.prepareGame ();}, false);

        button_bar.appendChild (mybutt);
    },
    createCanvas: function () {
        var canvas = document.createElement ('div');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        canvas.style.backgroundColor = 'black';
        canvas.style.zIndex = '999';
        canvas.style.textAlign = 'left';
        canvas.id = 'nKpuzzleCanvas';
        canvas.addEventListener ('click', function () {document.body.removeChild (this);}, false);
        document.body.appendChild (canvas);

        var reklamaBato = document.createElement ('a');
        reklamaBato.href = 'http://www.flickr.com/people/novikorisnik/';
        reklamaBato.innerHTML = '&nbsp;about % puzzle&nbsp;';
        reklamaBato.style.color = 'silver';
        
        reklamaBato.addEventListener ('click', function (e) {e.stopPropagation ();}, false);
        
        reklamaBato.style.position = 'absolute';
        reklamaBato.style.top = '0';
        reklamaBato.style.fontSize = 'smaller';
        reklamaBato.style.textAlign = 'center';
        reklamaBato.style.width = '100%';

        canvas.appendChild (reklamaBato);

        return canvas;
    },
    calculatePieceSizes: function () {
        this.piecesHorizontally = Math.max (2, Math.round (this.photo.width / this.optimalDimension));
        this.piecesVertically = Math.max (2, Math.round (this.photo.height / this.optimalDimension));
        this.pieceWidth = Math.floor (this.photo.width / this.piecesHorizontally);
        this.pieceHeight = Math.floor (this.photo.height / this.piecesVertically);
        this.photo.adjustedWidth = this.pieceWidth * this.piecesHorizontally;
        this.photo.adjustedHeight = this.pieceHeight * this.piecesVertically;
        this.shiftHorizontal = Math.floor (this.photo.width - this.photo.adjustedWidth);
        this.shiftVertical = Math.floor (this.photo.height - this.photo.adjustedHeight);
    },
    drawGameArea: function () {
        var marginVertical = Math.floor ((window.innerHeight - this.photo.adjustedHeight) / 2) - this.frameBorder;
        var marginHorizontal = Math.floor ((window.innerWidth - this.photo.adjustedWidth) / 2) - this.frameBorder;


        var d = document.createElement ('div');
        d.style.position = 'relative';
        d.style.margin = marginVertical + 'px ' + marginHorizontal + 'px';
        d.style.width = this.photo.adjustedWidth + 'px';
        d.style.height = this.photo.adjustedHeight + 'px';
        d.style.border = this.frameBorder + 'px solid ' + this.frameColor;
        this.canvas.appendChild (d);

        d.addEventListener ('click', function (e) {e.stopPropagation ();}, false);

        var d2 = document.createElement ('div');
        d2.style.width = this.pieceWidth + 'px';
        d2.style.height = this.pieceHeight + 'px';
        d2.style.border = this.frameBorder + 'px solid ' + this.frameColor;
        d2.style.borderWidth = this.frameBorder + 'px 0 ' + this.frameBorder + 'px ' + this.frameBorder + 'px';
        d2.style.backgroundColor = 'black';
        d2.style.position = 'absolute';
        d2.style.left = '-' + (this.pieceWidth + this.frameBorder) + 'px';
        d2.style.top = '-' + this.frameBorder + 'px';
        d.appendChild (d2);

        return d;
    },
    scramble: function () {
        var myArray = [];
        var myNumber = this.piecesHorizontally * this.piecesVertically;
        for (var i = 0; i < myNumber; i++) myArray.push (i);
        var myIndex, temp;
        var odd = ((myNumber % 2) != 0);
        myArray.push (myArray.shift ());
        for (var i = myArray.length - 1; i > 2; i--) {
            myIndex = Math.floor (Math.random () * i);
            odd = (myIndex % 2 != 0) ? odd : (!odd);
            temp = myArray [myIndex];
            myArray.splice (myIndex, 1);
            myArray.push (temp);
        }
        if (odd) {
            myArray.push (myArray.shift ());
            myArray.push (myArray.shift ());
        } else {
            temp = myArray.shift ();
            myArray.push (myArray.shift ());
            myArray.push (temp);
        }
        return myArray;
    },
    getCoordinates: function (num) {
        var row = Math.floor (num / this.piecesHorizontally);
        var column = num - row * this.piecesHorizontally;
        return {row: row, column: column};
    },
    movePiece: function (piece) {
        var row = this.holePosition.row;
        var column = this.holePosition.column;
        piece.style.top = (row * this.pieceHeight) + 'px';
        piece.style.left = (column * this.pieceWidth) + 'px';
        this.holePosition.row = piece.getAttribute ('myRow');
        this.holePosition.column = piece.getAttribute ('myColumn');
        piece.setAttribute ('myRow', row);
        piece.setAttribute ('myColumn', column);
    },
    checkEnd: function () {
        for (var i = 0; i < this.pieces.length; i++) {
            if (this.pieces [i].getAttribute ('myRow') != this.pieces [i].getAttribute ('finalRow')) return;
            if (this.pieces [i].getAttribute ('myColumn') != this.pieces [i].getAttribute ('finalColumn')) return;
        }
        
        this.canvas.removeChild (this.gameArea);
        
        var p = document.createElement ('img');
        p.src = this.photo.src;
        p.style.position = 'relative';

        var marginVertical = Math.floor ((window.innerHeight - this.photo.height) / 2);
        var marginHorizontal = Math.floor ((window.innerWidth - this.photo.width) / 2);

        p.style.margin = marginVertical + 'px ' + marginHorizontal + 'px';

        p.style.width = this.photo.width + 'px';
        p.style.height = this.photo.height + 'px';

        this.canvas.appendChild (p);
    },
    drawPiece: function (ordNum) {
        var position = this.getCoordinates (ordNum);

        var c = document.createElement ('div');
        c.style.position = 'absolute';
        c.style.top = position.row * this.pieceHeight + 'px';
        c.style.left = position.column * this.pieceWidth + 'px';
        c.style.width = (this.pieceWidth - 2 * this.pieceBorder) + 'px';
        c.style.height = (this.pieceHeight - 2 * this.pieceBorder) + 'px';
        c.style.border = this.pieceBorder + 'px solid black';
        c.style.borderColor = this.pieceColorLight + ' ' + this.pieceColorDark + ' ' + this.pieceColorDark + ' ' + this.pieceColorLight;
        c.style.zIndex = '1001';
        c.style.overflow = 'hidden';
  
        c.setAttribute ('myRow', position.row);
        c.setAttribute ('myColumn', position.column);
        
        this.gameArea.appendChild (c);

        var finalPosition = this.getCoordinates (this.myArray [ordNum]);
        
        var p = document.createElement ('img');
        p.src = this.photo.src;
        p.style.position = 'absolute';
        p.style.top = '-' + (finalPosition.row * this.pieceHeight + this.pieceBorder) + 'px';
        p.style.left = '-' + (finalPosition.column * this.pieceWidth + this.pieceBorder) + 'px';
        c.appendChild (p);

        c.setAttribute ('finalRow', finalPosition.row);
        c.setAttribute ('finalColumn', finalPosition.column);

        c.addEventListener ('click', function (e) {
            var rowDiff = this.getAttribute ('myRow') - nKflickrPuzzle.holePosition.row;
            var columnDiff = this.getAttribute ('myColumn') - nKflickrPuzzle.holePosition.column;
            if (Math.abs (rowDiff) + Math.abs (columnDiff) < 2) {
                nKflickrPuzzle.movePiece (this);
                if (nKflickrPuzzle.holePosition.column < 0) {
                    nKflickrPuzzle.checkEnd ();
                }
            }
        }, false);

        c.addEventListener ('mouseover', function (e) {
            var rowDiff = Math.abs (this.getAttribute ('myRow') - nKflickrPuzzle.holePosition.row);
            var columnDiff = Math.abs (this.getAttribute ('myColumn') - nKflickrPuzzle.holePosition.column);
            this.style.cursor = (rowDiff + columnDiff < 2) ? 'pointer' : 'default';
        }, false);

        return c;
    },
    drawPieces: function () {
        var pieces = [];
        var myNumber = this.piecesHorizontally * this.piecesVertically;
        for (var i = 0; i < myNumber; i++) pieces.push (this.drawPiece (i));
        return pieces;
    },
    prepareGame: function () {
        if (!this.definePhoto ()) return;
        this.canvas = this.createCanvas ();
        if (!this.canvas) return;
        this.calculatePieceSizes ();
        this.gameArea = this.drawGameArea ();
        if (!this.gameArea) return;
        this.myArray = this.scramble ();
        if (!this.myArray) return;
        this.pieces = this.drawPieces ();
        if (!this.pieces) return;
        this.holePosition = {row: 0, column: -1};
    },
    definePhoto: function () {
        var page_photo_id = unsafeWindow.page_photo_id;
        if (typeof (page_photo_id) == 'undefined') return this.error (2);
        var page_photo_div = document.getElementById ('photoImgDiv' + page_photo_id);
        if (page_photo_div === null) return this.error (3);
        var page_photo_div_imgs = page_photo_div.getElementsByTagName ('img');
        if (page_photo_div_imgs.length == 0) return this.error (4);
        var page_photo = page_photo_div_imgs [0];
        this.photo = {
            src: page_photo.src,
            width: page_photo.width,
            height: page_photo.height
        };
        return true;
    },
    error: function (errorCode) {
//        alert ('Error!\n\n code ' + errorCode + '\n' + this.errorMessages [errorCode]);
        return false;
    }
}



if (typeof (window.opera) == 'undefined') {
    window.addEventListener ('load', function (e) {nKflickrPuzzle.run ();}, false);
} else {
    nKflickrPuzzle.run ();
}