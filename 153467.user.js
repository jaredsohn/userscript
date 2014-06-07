// ==UserScript==
// @name        Cornelia-style archive reader
// @namespace   03439702a2904cac964aa322ffcb6a00
// @description Extracts 7z archives stored in PNG images on 4chan and displays the files inside them. 
// @match       *://boards.4chan.org/*
// @match       *://images.4chan.org/*
// @match       *://archive.foolz.us/*
// @match       *://chanarchive.org/*
// @match       *://*.chanarchive.org/*
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// Acknowledgements: Portions of this code are originally from
// https://raw.github.com/devongovett/png.js/ (decoding PNG images), itself including code forked from:
// https://github.com/andreasgal/pdf.js/
// https://github.com/mozilla/pdf.js/

var FILE_TYPES = {
    "txt": "text/plain",
    "htm": "text/html",
    "html": "text/html",
    "gif": "image/gif",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "svg": "image/svg+xml",
    "ogg": "audio/ogg",
    "mp3": "audio/mpeg",
    "webm": "video/webm",
    "ogv": "video/ogg",
    "mkv": "video/x-matroska",
    "avi": "video/avi",
    "mp4": "video/mp4",
    "pdf": "application/pdf"
};

var MAGIC_7Z = "7z\xBC\xAF\x27\x1C";
var MAGIC_RAR = "Rar!\x1A\x07\x00";
var TYPE_7Z = 1;
var TYPE_RAR = 2;

function parse7z(data, files, headers) {
    if (files == undefined) files = [];
    if (headers == undefined) headers = {};

    var kNames =
        "End Header ArchiveProperties AdditionalStreamsInfo MainStreamsInfo FilesInfo PackInfo UnPackInfo "
        + "SubStreamsInfo Size CRC Folder CodersUnPackSize NumUnPackStream EmptyStream EmptyFile "
        + "Anti Names CTime ATime MTime Attributes Comment EncodedHeader StartPos Dummy";
    kNames = kNames.split(" ");
    var k = {};
    for (var i = 0; i < kNames.length; i++) k[kNames[i]] = i;

    var pos = 0;
    var nBits = 0;
    var bits = 0;

    function ParseError(message) {
        this.name = "ParseError";
        this.message = message;
        this.pos = pos;
    }
    ParseError.prototype = new Error();
    ParseError.prototype.constructor = ParseError;

    function readN(f, n) {
        var x = [];
        for (var i = 0; i < n; i++) x.push(f());
        return x;
    }

    function nextByte() {
        if (pos >= data.length) throw new ParseError("passed end of file");
        return data[pos++];
    }

    function nextBit() {
        if (nBits == 0) {
            bits = nextByte();
            nBits = 8;
        }
        nBits -= 1;
        var b = (bits >> nBits) & 1;
        return b;
    }

    function nextInt(len) {
        var n = 0;
        var x = 1;
        for (var i = 0; i < len; i++) {
            n += nextByte() * x;
            x *= 256;
        }
        if (n > (1<<30) * (1<<23)) throw new ParseError("integer overflow");
        return n;
    }

    function nextInt7z() {
        var b0 = nextByte();
        var thresh = 128;
        var n = 0;
        var x = 1;
        while (b0 >= thresh && thresh > 0) {
            n += nextByte() * x;
            x *= 256;
            b0 -= thresh;
            thresh >>= 1;
        }
        n += b0 * x;
        if (n > (1<<30) * (1<<23)) throw new ParseError("integer overflow");
        return n;
    }

    function nextBinString(len) {
        var s = "";
        for (var i = 0; i < len; i++) {
            s += String.fromCharCode(nextByte());
        }
        return s;
    }

    function ArchiveProperties() {
        var x = {};
        while (true) {
            var ID = nextByte();
            if (ID == 0) return x;
            var n = nextInt7z();
            x["Property"+ID] = readN(nextByte, n);
        }
    }

    function Digests(NumStreams) {
        var x = [];
        var AllAreDefined = nextByte();
        if (!AllAreDefined) var Defined = readN(nextBit, NumStreams);
        for (var i = 0; i < NumStreams; i++) {
            if (AllAreDefined || Defined[i]) x[i] = nextInt(4);
        }
        return x;
    }

    function PackInfo() {
        var x = [];
        var Pos = 32 + nextInt7z();
        var NumStreams = nextInt7z();
        for (var i = 0; i < NumStreams; i++) x.push({});
        if (NumStreams >= 1) x[0].Start = Pos;

        var ID = nextByte();
        if (ID == k.Size) {
            for (var i = 0; i < NumStreams; i++) {
                x[i].Start = Pos;
                x[i].Size = nextInt7z();
                Pos += x[i].Size;
            }
            ID = nextByte();
        }
        if (ID == k.CRC) {
            for (var i = 0; i < NumStreams; i++) x[i].Digest = nextInt7z();
            ID = nextByte();
        }
        if (ID != 0) throw new ParseError("unexpected block id " + ID);

        return x;
    }

    function Folder() {
        var x = {}

        var NumCoders = nextInt7z();
        x.Coders = [];
        x.NumInStreams = 0;
        x.NumOutStreams = 0;
        for (var i = 0; i < NumCoders; i++) {
            var y = {};
            var b = nextByte();
            var CodecIdSize = b & 0xF;
            var IsComplexCoder = b & 0x10;
            var ThereAreAttributes = b & 0x20;
            var AlternativeMethods = b & 0x80;
            if (AlternativeMethods) throw new ParseError("not supported");
            y.CodecId = nextBinString(CodecIdSize);
            if (IsComplexCoder) {
                y.NumInStreams = nextInt7z();
                y.NumOutStreams = nextInt7z();
            } else {
                y.NumInStreams = 1;
                y.NumOutStreams = 1;
            }
            x.NumInStreams += y.NumInStreams;
            x.NumOutStreams += y.NumOutStreams;
            if (ThereAreAttributes) {
                var PropertiesSize = nextInt7z();
                y.Properties = readN(nextByte, PropertiesSize);
            }
            x.Coders.push(y);
        }

        var NumBindPairs = x.NumOutStreams - 1;
        x.BindInStream = []
        x.BindOutStream = []
        for (var i = 0; i < NumBindPairs; i++) {
            var InIndex = nextInt7z();
            var OutIndex = nextInt7z();
            x.BindInStream[OutIndex] = InIndex;
            x.BindOutStream[InIndex] = OutIndex;
        }
        
        var NumPackStreams = x.NumInStreams - NumBindPairs;
        if (NumPackStreams == 1) {
            for (var i = 0; i < x.NumInStreams; i++) {
                if (x.BindOutStream[i] == undefined) x.PackStreams = [i];
            }
        } else {
            x.PackStreams = readN(nextInt7z, NumPackStreams);
        }

        return x;
    }

    function CodersInfo(Folders) {
        var ID = nextByte();

        if (ID != k.Folder) throw new ParseError("unexpected block id " + ID);
        var NumFolders = nextInt7z();
        var External = nextByte();
        if (External) throw new ParseError("not supported");
        for (var i = 0; i < NumFolders; i++) {
            Folders.push(Folder());
        }
        ID = nextByte();

        if (ID != k.CodersUnPackSize) throw new ParseError("unexpected block id " + ID);
        for (var i = 0; i < NumFolders; i++) {
            Folders[i].OutSizes = readN(nextInt7z, Folders[i].NumOutStreams);
            for (var j = 0; j < Folders[i].NumOutStreams; j++) {
                if (Folders[i].BindInStream[j] == undefined) {
                    Folders[i].UnPackSize = Folders[i].OutSizes[j];
                }
            }
        }
        ID = nextByte();

        if (ID == k.CRC) {
            var UnPackDigests = Digests(NumFolders);
            for (var i = 0; i < NumFolders; i++) {
                if (i in UnPackDigests) Folders[i].UnPackDigest = UnPackDigests[i];
            }
            ID = nextByte();
        }

        if (ID != 0) throw new ParseError("unexpected block id " + ID);
    }

    function SubStreamsInfo(Folders, SubStreams, NoBlock) {
        var ID = NoBlock ? 0 : nextByte();

        if (ID == k.NumUnPackStream) {
            for (var i = 0; i < Folders.length; i++) Folders[i].NumSubStreams = nextInt7z();
            ID = nextByte();
        } else {
            for (var i = 0; i < Folders.length; i++) Folders[i].NumSubStreams = 1;
        }
        for (var i = 0; i < Folders.length; i++) {
            for (var j = 0; j < Folders[i].NumSubStreams; j++) SubStreams.push({});
        }

        if (ID == k.Size) {
            var iSubStream = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (Folders[i].NumSubStreams != 0) {
                    var SumSizes = 0;
                    for (var j = 0; j < Folders[i].NumSubStreams - 1; j++) {
                        var n = nextInt7z();
                        SubStreams[iSubStream++].Size = n;
                        SumSizes += n;
                    }
                    SubStreams[iSubStream++].Size = Folders[i].UnPackSize - SumSizes;
                }
            }
            ID = nextByte();
        } else {
            var iSubStream = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (Folders[i].NumSubStreams == 1) {
                    SubStreams[iSubStream].Size = Folders[i].UnPackSize;
                }
                iSubStream += Folders[i].NumSubStreams;
            }
        }

        if (ID == k.CRC) {
            var NumUnknownDigests = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (!(Folders[i].NumSubStreams == 1 && Folders[i].UnPackDigest != undefined)) {
                    NumUnknownDigests += Folders[i].NumSubStreams;
                }
            }
            var UnknownDigests = Digests(NumUnknownDigests);
            var iDigest = 0;
            iSubStream = 0;
            for (var i = 0; i < Folders.length; i++) {
                if (Folders[i].NumSubStreams == 1 && Folders[i].UnPackDigest != undefined) {
                    SubStreams[iSubStream++].Digest = Folders[i].UnPackDigest;
                } else {
                    for (var j = 0; j < Folders[i].NumSubStreams; j++) {
                        if (iDigest in UnknownDigests) {
                            SubStreams[iSubStream++].Digest = UnknownDigests[iDigest++];
                        }
                    }
                }
            }
            ID = nextByte();
        }

        if (ID != 0) throw new ParseError("unexpected block id " + ID);
    }

    function StreamsInfo(x, NoBlock) {
        var ID = NoBlock ? 0 : nextByte();

        if (ID == k.PackInfo) {
            x.PackStreams = PackInfo();
            ID = nextByte();
        } else {
            x.PackStreams = [];
        }

        x.Folders = [];
        if (ID == k.UnPackInfo) {
            CodersInfo(x.Folders);
            ID = nextByte();
        }

        x.SubStreams = [];
        if (ID == k.SubStreamsInfo) {
            SubStreamsInfo(x.Folders, x.SubStreams);
            ID = nextByte();
        } else {
            SubStreamsInfo(x.Folders, x.SubStreams, true);
        }

        if (ID != 0) throw new ParseError("unexpected block id " + ID);
    }

    function FilesInfo() {
        var x = {};
        x.NumFiles = nextInt7z();
        x.Names = [];
        x.EmptyStream = [];
        while (true) {
            var ID = nextByte();
            if (ID == 0) return x;
            var PropertySize = nextInt7z();
            if (ID == k.Names && PropertySize > 1) {
                var External = nextByte();
                if (External) throw new ParseError("not supported");
                for (var i = 0; i < x.NumFiles; i++) {
                    var s = "";
                    while (true) {
                        var c = nextInt(2);
                        if (c == 0) break;
                        s += String.fromCharCode(c);
                    }
                    x.Names.push(s);
                }
            } else if (ID == k.EmptyStream) {
                x.EmptyStream = readN(nextBit, x.NumFiles);
            } else {
                x[kNames[ID] || ("Property"+ID)] = readN(nextByte, PropertySize);
            }
        }
    }

    if (nextBinString(6) != MAGIC_7Z) throw new Error ("not a 7z file");
    headers.MajorVersion = nextByte();
    headers.MinorVersion = nextByte();
    headers.StartHeaderCRC = nextInt(4);
    headers.NextHeaderOffset = nextInt(8);
    headers.NextHeaderSize = nextInt(8);
    headers.NextHeaderCRC = nextInt(4);
    headers.FullSize = 32 + headers.NextHeaderOffset + headers.NextHeaderSize;
    headers.SplitArchive = (data.length < headers.FullSize);
    if (headers.SplitArchive) return;

    pos = 32 + headers.NextHeaderOffset;
    var ID = nextByte();
    if (ID == k.EncodedHeader) throw new ParseError("not supported");
    if (ID != k.Header) throw new ParseError("unexpected block id " + ID);

    ID = nextByte();
    if (ID == k.ArchiveProperties) {
        headers.ArchiveProperties = ArchiveProperties();
        ID = nextByte();
    }
    if (ID == k.AdditionalStreamsInfo) {
        headers.AdditionalStreamsInfo = {};
        StreamsInfo(headers.AdditionalStreamsInfo);
        ID = nextByte();
    }
    if (ID == k.MainStreamsInfo) {
        StreamsInfo(headers);
        ID = nextByte();
    } else {
        StreamsInfo(headers, true);
    }
    if (ID == k.FilesInfo) {
        headers.FilesInfo = FilesInfo();
        ID = nextByte();
    }
    if (ID != 0) throw new ParseError("unexpected block id " + ID);

    var iPackStream = 0;
    var iSubStream = 0;
    for (var i = 0; i < headers.Folders.length; i++) {
        if (
            headers.Folders[i].Coders.length == 1
            && headers.Folders[i].Coders[0].CodecId == "\x00"
            && headers.Folders[i].NumInStreams == 1
            && headers.Folders[i].NumOutStreams == 1
        ) {
            var Pos = headers.PackStreams[iPackStream].Start;
            for (var j = 0; j < headers.Folders[i].NumSubStreams; j++) {
                if (Pos != undefined) {
                    headers.SubStreams[iSubStream].Start = Pos;
                    if (headers.SubStreams[iSubStream].Size != undefined) {
                        Pos += headers.SubStreams[iSubStream].Size;
                    } else {
                        Pos = undefined;
                    }
                }
                iSubStream++;
            }
        } else {
            iSubStream += headers.Folders[i].NumSubStreams;
        }
        iPackStream += headers.Folders[i].PackStreams.length;
    }

    if (headers.FilesInfo != undefined) {
        var iSubStream = 0;
        for (var i = 0; i < headers.FilesInfo.NumFiles; i++) {
            files[i] = {};
            files[i].Name = headers.FilesInfo.Names[i];
            files[i].Empty = headers.FilesInfo.EmptyStream[i];
            if (!files[i].Empty) {
                files[i].Start = headers.SubStreams[iSubStream].Start;
                files[i].Size = headers.SubStreams[iSubStream].Size;
                files[i].Digest = headers.SubStreams[iSubStream].Digest;
                if (files[i].Start != undefined && files[i].Size != undefined) {
                    files[i].Data = data.subarray(files[i].Start, files[i].Start + files[i].Size);
                }
                iSubStream++;
            }
        }
    }
}

function BMPdata(pixelData) {
    this.data = pixelData.data;
    this.width = pixelData.width;
    this.height = pixelData.height;
    this.rowSize = Math.ceil(pixelData.width * 3 / 4) * 4;
}

BMPdata.prototype.slice = function(istart, iend) {
    var row = this.height - 1 - Math.floor(istart / this.rowSize);
    var col = Math.floor((istart % this.rowSize) / 3);
    var ch = (istart % this.rowSize) % 3;
    var a = new Uint8Array(iend - istart);
    var i = 0;
    while (row >= 0) {
        while (3*col + ch < this.rowSize) {
            a[i++] = (col < this.width) ? this.data[4*this.width*row + 4*col + 2 - ch] : 0;
            if (i >= iend - istart) return a;
            ch++;
            if (ch >= 3) {
                ch = 0;
                col++;
            }
        }
        col = 0;
        ch = 0;
        row--;
    }
    return a;
}

BMPdata.prototype.findMagic = function() {
    var row = this.height - 1;
    var col = 0;
    var ch = 0;
    var x = "";
    var offset = 0;
    while (row >= 0) {
        offset += x.length;
        x = x.substring(x.length - MAGIC_RAR.length + 1);
        offset -= x.length;
        while (3*col + ch < this.rowSize) {
            x += String.fromCharCode((col < this.width) ? this.data[4*this.width*row + 4*col + 2 - ch] : 0);
            ch++;
            if (ch >= 3) {
                ch = 0;
                col++;
            }
        }
        var i = x.indexOf(MAGIC_7Z);
        if (i != -1) return {ArchType: TYPE_7Z, Pos: offset + i};
        i = x.indexOf(MAGIC_RAR);
        if (i != -1) return {ArchType: TYPE_RAR, Pos: offset + i};
        col = 0;
        ch = 0;
        row--;
    }
    return {ArchType: 0};
}

BMPdata.prototype.readByte = function(pos) {
    var row = this.height - 1 - Math.floor(pos / this.rowSize);
    if (row < 0) throw new Error("end of file");
    var col = Math.floor((pos % this.rowSize) / 3);
    var ch = (pos % this.rowSize) % 3;
    return (col < this.width) ? this.data[4*this.width*row + 4*col + 2 - ch] : 0;
}

BMPdata.prototype.readInt = function(pos, len) {
    var n = 0;
    var x = 1;
    for (var i = 0; i < len; i++) {
        n += this.readByte(pos + i) * x;
        x *= 256;
    }
    if (n > (1<<30) * (1<<23)) throw new Error("integer overflow");
    return n;
}

BMPdata.prototype.endOf7z = function(start) {
    return start + 32 + this.readInt(start+12, 8) + this.readInt(start+20, 8);
}

BMPdata.prototype.endOfRAR = function(start) {
    var i = start;
    while (true) {
        var block_type = this.readByte(i+2);
        var block_size = this.readInt(i+5, 2);
        if (this.readByte(i+4) & 0x80) block_size += this.readInt(i+7, 4);
        if (block_size < 7) throw new Error("invalid block size");
        i += block_size;
        if (block_type == 0x7B) return i;
    }
}

function extractArchive(pixelData) {
    try {
        var data = new BMPdata(pixelData);
        var magic = data.findMagic();
        if (magic.ArchType != 0) {
            if (magic.ArchType == TYPE_7Z) {
                var endPos = data.endOf7z(magic.Pos);
            } else if (magic.ArchType == TYPE_RAR) {
                var endPos = data.endOfRAR(magic.Pos);
            }
            return {ArchType: magic.ArchType, Data: data.slice(magic.Pos, endPos)};
        } else {
            return {ArchType: 0};
        }
    } catch(e) {
        return {ArchType: 0};
    }
}

function is7z(data) {
    if (data == undefined) return false;
    if (data.length < 6) return false;
    var s = "";
    for (var i = 0; i < 6; i++) {
        s += String.fromCharCode(data[i]);
    }
    return (s == MAGIC_7Z);
}

function size7z(data) {
    var size = 32;
    var x = 1;
    for (var i = 0; i < 8; i++) {
        size += (data[12+i] + data[20+i]) * x;
        x *= 256;
    }
    return size;
}

// zlib.js from https://github.com/devongovett/png.js/
// Originally from https://github.com/andreasgal/pdf.js -- using version from devongovett

/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var DecodeStream = (function() {
  function constructor() {
    this.pos = 0;
    this.bufferLength = 0;
    this.eof = false;
    this.buffer = null;
  }

  constructor.prototype = {
    ensureBuffer: function decodestream_ensureBuffer(requested) {
      var buffer = this.buffer;
      var current = buffer ? buffer.byteLength : 0;
      if (requested < current)
        return buffer;
      var size = 512;
      while (size < requested)
        size <<= 1;
      var buffer2 = new Uint8Array(size);
      for (var i = 0; i < current; ++i)
        buffer2[i] = buffer[i];
      return this.buffer = buffer2;
    },
    getByte: function decodestream_getByte() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return this.buffer[this.pos++];
    },
    getBytes: function decodestream_getBytes(length) {
      var pos = this.pos;

      if (length) {
        this.ensureBuffer(pos + length);
        var end = pos + length;

        while (!this.eof && this.bufferLength < end)
          this.readBlock();

        var bufEnd = this.bufferLength;
        if (end > bufEnd)
          end = bufEnd;
      } else {
        while (!this.eof)
          this.readBlock();

        var end = this.bufferLength;
      }

      this.pos = end;
      return this.buffer.subarray(pos, end);
    },
    lookChar: function decodestream_lookChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos]);
    },
    getChar: function decodestream_getChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos++]);
    },
    makeSubStream: function decodestream_makeSubstream(start, length, dict) {
      var end = start + length;
      while (this.bufferLength <= end && !this.eof)
        this.readBlock();
      return new Stream(this.buffer, start, length, dict);
    },
    skip: function decodestream_skip(n) {
      if (!n)
        n = 1;
      this.pos += n;
    },
    reset: function decodestream_reset() {
      this.pos = 0;
    }
  };

  return constructor;
})();

var FlateStream = (function() {
  var codeLenCodeMap = new Uint32Array([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
  ]);

  var lengthDecode = new Uint32Array([
    0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a,
    0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f,
    0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073,
    0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102
  ]);

  var distDecode = new Uint32Array([
    0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d,
    0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1,
    0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01,
    0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001
  ]);

  var fixedLitCodeTab = [new Uint32Array([
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0,
    0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0,
    0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0,
    0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8,
    0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8,
    0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8,
    0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4,
    0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4,
    0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4,
    0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc,
    0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec,
    0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc,
    0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2,
    0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2,
    0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2,
    0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca,
    0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea,
    0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da,
    0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6,
    0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6,
    0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6,
    0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce,
    0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee,
    0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de,
    0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe,
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1,
    0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1,
    0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1,
    0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9,
    0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9,
    0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9,
    0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5,
    0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5,
    0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5,
    0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd,
    0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed,
    0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd,
    0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3,
    0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3,
    0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3,
    0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb,
    0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb,
    0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db,
    0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7,
    0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7,
    0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7,
    0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf,
    0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef,
    0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df,
    0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff
  ]), 9];

  var fixedDistCodeTab = [new Uint32Array([
    0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c,
    0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000,
    0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d,
    0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000
  ]), 5];
  
  function error(e) {
      throw new Error(e)
  }

  function constructor(bytes) {
    //var bytes = stream.getBytes();
    var bytesPos = 0;

    var cmf = bytes[bytesPos++];
    var flg = bytes[bytesPos++];
    if (cmf == -1 || flg == -1)
      error('Invalid header in flate stream');
    if ((cmf & 0x0f) != 0x08)
      error('Unknown compression method in flate stream');
    if ((((cmf << 8) + flg) % 31) != 0)
      error('Bad FCHECK in flate stream');
    if (flg & 0x20)
      error('FDICT bit set in flate stream');

    this.bytes = bytes;
    this.bytesPos = bytesPos;

    this.codeSize = 0;
    this.codeBuf = 0;

    DecodeStream.call(this);
  }

  constructor.prototype = Object.create(DecodeStream.prototype);

  constructor.prototype.getBits = function(bits) {
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    var b;
    while (codeSize < bits) {
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= b << codeSize;
      codeSize += 8;
    }
    b = codeBuf & ((1 << bits) - 1);
    this.codeBuf = codeBuf >> bits;
    this.codeSize = codeSize -= bits;
    this.bytesPos = bytesPos;
    return b;
  };

  constructor.prototype.getCode = function(table) {
    var codes = table[0];
    var maxLen = table[1];
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    while (codeSize < maxLen) {
      var b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= (b << codeSize);
      codeSize += 8;
    }
    var code = codes[codeBuf & ((1 << maxLen) - 1)];
    var codeLen = code >> 16;
    var codeVal = code & 0xffff;
    if (codeSize == 0 || codeSize < codeLen || codeLen == 0)
      error('Bad encoding in flate stream');
    this.codeBuf = (codeBuf >> codeLen);
    this.codeSize = (codeSize - codeLen);
    this.bytesPos = bytesPos;
    return codeVal;
  };

  constructor.prototype.generateHuffmanTable = function(lengths) {
    var n = lengths.length;

    // find max code length
    var maxLen = 0;
    for (var i = 0; i < n; ++i) {
      if (lengths[i] > maxLen)
        maxLen = lengths[i];
    }

    // build the table
    var size = 1 << maxLen;
    var codes = new Uint32Array(size);
    for (var len = 1, code = 0, skip = 2;
         len <= maxLen;
         ++len, code <<= 1, skip <<= 1) {
      for (var val = 0; val < n; ++val) {
        if (lengths[val] == len) {
          // bit-reverse the code
          var code2 = 0;
          var t = code;
          for (var i = 0; i < len; ++i) {
            code2 = (code2 << 1) | (t & 1);
            t >>= 1;
          }

          // fill the table entries
          for (var i = code2; i < size; i += skip)
            codes[i] = (len << 16) | val;

          ++code;
        }
      }
    }

    return [codes, maxLen];
  };

  constructor.prototype.readBlock = function() {
    function repeat(stream, array, len, offset, what) {
      var repeat = stream.getBits(len) + offset;
      while (repeat-- > 0)
        array[i++] = what;
    }

    // read block header
    var hdr = this.getBits(3);
    if (hdr & 1)
      this.eof = true;
    hdr >>= 1;

    if (hdr == 0) { // uncompressed block
      var bytes = this.bytes;
      var bytesPos = this.bytesPos;
      var b;

      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var blockLen = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      blockLen |= (b << 8);
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var check = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      check |= (b << 8);
      if (check != (~blockLen & 0xffff))
        error('Bad uncompressed block length in flate stream');

      this.codeBuf = 0;
      this.codeSize = 0;

      var bufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(bufferLength + blockLen);
      var end = bufferLength + blockLen;
      this.bufferLength = end;
      for (var n = bufferLength; n < end; ++n) {
        if (typeof (b = bytes[bytesPos++]) == 'undefined') {
          this.eof = true;
          break;
        }
        buffer[n] = b;
      }
      this.bytesPos = bytesPos;
      return;
    }

    var litCodeTable;
    var distCodeTable;
    if (hdr == 1) { // compressed block, fixed codes
      litCodeTable = fixedLitCodeTab;
      distCodeTable = fixedDistCodeTab;
    } else if (hdr == 2) { // compressed block, dynamic codes
      var numLitCodes = this.getBits(5) + 257;
      var numDistCodes = this.getBits(5) + 1;
      var numCodeLenCodes = this.getBits(4) + 4;

      // build the code lengths code table
      var codeLenCodeLengths = Array(codeLenCodeMap.length);
      var i = 0;
      while (i < numCodeLenCodes)
        codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
      var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);

      // build the literal and distance code tables
      var len = 0;
      var i = 0;
      var codes = numLitCodes + numDistCodes;
      var codeLengths = new Array(codes);
      while (i < codes) {
        var code = this.getCode(codeLenCodeTab);
        if (code == 16) {
          repeat(this, codeLengths, 2, 3, len);
        } else if (code == 17) {
          repeat(this, codeLengths, 3, 3, len = 0);
        } else if (code == 18) {
          repeat(this, codeLengths, 7, 11, len = 0);
        } else {
          codeLengths[i++] = len = code;
        }
      }

      litCodeTable =
        this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
      distCodeTable =
        this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
    } else {
      error('Unknown block type in flate stream');
    }

    var buffer = this.buffer;
    var limit = buffer ? buffer.length : 0;
    var pos = this.bufferLength;
    while (true) {
      var code1 = this.getCode(litCodeTable);
      if (code1 < 256) {
        if (pos + 1 >= limit) {
          buffer = this.ensureBuffer(pos + 1);
          limit = buffer.length;
        }
        buffer[pos++] = code1;
        continue;
      }
      if (code1 == 256) {
        this.bufferLength = pos;
        return;
      }
      code1 -= 257;
      code1 = lengthDecode[code1];
      var code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var len = (code1 & 0xffff) + code2;
      code1 = this.getCode(distCodeTable);
      code1 = distDecode[code1];
      code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var dist = (code1 & 0xffff) + code2;
      if (pos + len >= limit) {
        buffer = this.ensureBuffer(pos + len);
        limit = buffer.length;
      }
      for (var k = 0; k < len; ++k, ++pos)
        buffer[pos] = buffer[pos - dist];
    }
  };

  return constructor;
})();

// End zlib.js

// png.js from https://github.com/devongovett/png.js/

// Generated by CoffeeScript 1.4.0

/*
# MIT LICENSE
# Copyright (c) 2011 Devon Govett
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy of this 
# software and associated documentation files (the "Software"), to deal in the Software 
# without restriction, including without limitation the rights to use, copy, modify, merge, 
# publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
# to whom the Software is furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all copies or 
# substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


(function() {
  var PNG;

  PNG = (function() {
    var APNG_BLEND_OP_OVER, APNG_BLEND_OP_SOURCE, APNG_DISPOSE_OP_BACKGROUND, APNG_DISPOSE_OP_NONE, APNG_DISPOSE_OP_PREVIOUS, makeImage, scratchCanvas, scratchCtx;

    PNG.load = function(url, canvas, callback) {
      var xhr,
        _this = this;
      if (typeof canvas === 'function') {
        callback = canvas;
      }
      xhr = new XMLHttpRequest;
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
        var data, png;
        data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
        png = new PNG(data);
        if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
          png.render(canvas);
        }
        return typeof callback === "function" ? callback(png) : void 0;
      };
      return xhr.send(null);
    };

    APNG_DISPOSE_OP_NONE = 0;

    APNG_DISPOSE_OP_BACKGROUND = 1;

    APNG_DISPOSE_OP_PREVIOUS = 2;

    APNG_BLEND_OP_SOURCE = 0;

    APNG_BLEND_OP_OVER = 1;

    function PNG(data) {
      var chunkSize, colors, delayDen, delayNum, frame, i, index, key, section, short, text, _i, _j, _ref;
      this.data = data;
      this.pos = 8;
      this.palette = [];
      this.imgData = [];
      this.transparency = {};
      this.animation = null;
      this.text = {};
      frame = null;
      while (true) {
        chunkSize = this.readUInt32();
        section = ((function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; _i < 4; i = ++_i) {
            _results.push(String.fromCharCode(this.data[this.pos++]));
          }
          return _results;
        }).call(this)).join('');
        switch (section) {
          case 'IHDR':
            this.width = this.readUInt32();
            this.height = this.readUInt32();
            this.bits = this.data[this.pos++];
            this.colorType = this.data[this.pos++];
            this.compressionMethod = this.data[this.pos++];
            this.filterMethod = this.data[this.pos++];
            this.interlaceMethod = this.data[this.pos++];
            break;
          case 'acTL':
            this.animation = {
              numFrames: this.readUInt32(),
              numPlays: this.readUInt32() || Infinity,
              frames: []
            };
            break;
          case 'PLTE':
            this.palette = this.read(chunkSize);
            break;
          case 'fcTL':
            if (frame) {
              this.animation.frames.push(frame);
            }
            this.pos += 4;
            frame = {
              width: this.readUInt32(),
              height: this.readUInt32(),
              xOffset: this.readUInt32(),
              yOffset: this.readUInt32()
            };
            delayNum = this.readUInt16();
            delayDen = this.readUInt16() || 100;
            frame.delay = 1000 * delayNum / delayDen;
            frame.disposeOp = this.data[this.pos++];
            frame.blendOp = this.data[this.pos++];
            frame.data = [];
            break;
          case 'IDAT':
          case 'fdAT':
            if (section === 'fdAT') {
              this.pos += 4;
              chunkSize -= 4;
            }
            data = (frame != null ? frame.data : void 0) || this.imgData;
            for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
              data.push(this.data[this.pos++]);
            }
            break;
          case 'tRNS':
            this.transparency = {};
            switch (this.colorType) {
              case 3:
                this.transparency.indexed = this.read(chunkSize);
                short = 255 - this.transparency.indexed.length;
                if (short > 0) {
                  for (i = _j = 0; 0 <= short ? _j < short : _j > short; i = 0 <= short ? ++_j : --_j) {
                    this.transparency.indexed.push(255);
                  }
                }
                break;
              case 0:
                this.transparency.grayscale = this.read(chunkSize)[0];
                break;
              case 2:
                this.transparency.rgb = this.read(chunkSize);
            }
            break;
          case 'tEXt':
            text = this.read(chunkSize);
            index = text.indexOf(0);
            key = String.fromCharCode.apply(String, text.slice(0, index));
            this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
            break;
          case 'IEND':
            if (frame) {
              this.animation.frames.push(frame);
            }
            this.colors = (function() {
              switch (this.colorType) {
                case 0:
                case 3:
                case 4:
                  return 1;
                case 2:
                case 6:
                  return 3;
              }
            }).call(this);
            this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
            colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
            this.pixelBitlength = this.bits * colors;
            this.colorSpace = (function() {
              switch (this.colors) {
                case 1:
                  return 'DeviceGray';
                case 3:
                  return 'DeviceRGB';
              }
            }).call(this);
            this.imgData = new Uint8Array(this.imgData);
            return;
          default:
            this.pos += chunkSize;
        }
        this.pos += 4;
        if (this.pos > this.data.length) {
          throw new Error("Incomplete or corrupt PNG file");
        }
      }
      return;
    }

    PNG.prototype.read = function(bytes) {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
        _results.push(this.data[this.pos++]);
      }
      return _results;
    };

    PNG.prototype.readUInt32 = function() {
      var b1, b2, b3, b4;
      b1 = this.data[this.pos++] << 24;
      b2 = this.data[this.pos++] << 16;
      b3 = this.data[this.pos++] << 8;
      b4 = this.data[this.pos++];
      return b1 | b2 | b3 | b4;
    };

    PNG.prototype.readUInt16 = function() {
      var b1, b2;
      b1 = this.data[this.pos++] << 8;
      b2 = this.data[this.pos++];
      return b1 | b2;
    };

    PNG.prototype.decodePixels = function(data) {
      var byte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
      if (data == null) {
        data = this.imgData;
      }
      if (data.length === 0) {
        return new Uint8Array(0);
      }
      data = new FlateStream(data);
      data = data.getBytes();
      pixelBytes = this.pixelBitlength / 8;
      scanlineLength = pixelBytes * this.width;
      pixels = new Uint8Array(scanlineLength * this.height);
      length = data.length;
      row = 0;
      pos = 0;
      c = 0;
      while (pos < length) {
        switch (data[pos++]) {
          case 0:
            for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
              pixels[c++] = data[pos++];
            }
            break;
          case 1:
            for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
              byte = data[pos++];
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              pixels[c++] = (byte + left) % 256;
            }
            break;
          case 2:
            for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (upper + byte) % 256;
            }
            break;
          case 3:
            for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
            }
            break;
          case 4:
            for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              if (row === 0) {
                upper = upperLeft = 0;
              } else {
                upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
                upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + (i % pixelBytes)];
              }
              p = left + upper - upperLeft;
              pa = Math.abs(p - left);
              pb = Math.abs(p - upper);
              pc = Math.abs(p - upperLeft);
              if (pa <= pb && pa <= pc) {
                paeth = left;
              } else if (pb <= pc) {
                paeth = upper;
              } else {
                paeth = upperLeft;
              }
              pixels[c++] = (byte + paeth) % 256;
            }
            break;
          default:
            throw new Error("Invalid filter algorithm: " + data[pos - 1]);
        }
        row++;
      }
      return pixels;
    };

    PNG.prototype.decodePalette = function() {
      var c, i, length, palette, pos, ret, transparency, _i, _ref, _ref1;
      palette = this.palette;
      transparency = this.transparency.indexed || [];
      ret = new Uint8Array((transparency.length || 0) + palette.length);
      pos = 0;
      length = palette.length;
      c = 0;
      for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
        ret[pos++] = palette[i];
        ret[pos++] = palette[i + 1];
        ret[pos++] = palette[i + 2];
        ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255;
      }
      return ret;
    };

    PNG.prototype.copyToImageData = function(imageData, pixels) {
      var alpha, colors, data, i, input, j, k, length, palette, v, _ref;
      colors = this.colors;
      palette = null;
      alpha = this.hasAlphaChannel;
      if (this.palette.length) {
        palette = (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = this.decodePalette();
        colors = 4;
        alpha = true;
      }
      data = imageData.data || imageData;
      length = data.length;
      input = palette || pixels;
      i = j = 0;
      if (colors === 1) {
        while (i < length) {
          k = palette ? pixels[i / 4] * 4 : j;
          v = input[k++];
          data[i++] = v;
          data[i++] = v;
          data[i++] = v;
          data[i++] = alpha ? input[k++] : 255;
          j = k;
        }
      } else {
        while (i < length) {
          k = palette ? pixels[i / 4] * 4 : j;
          data[i++] = input[k++];
          data[i++] = input[k++];
          data[i++] = input[k++];
          data[i++] = alpha ? input[k++] : 255;
          j = k;
        }
      }
    };

    PNG.prototype.decode = function() {
      var ret;
      ret = new Uint8Array(this.width * this.height * 4);
      this.copyToImageData(ret, this.decodePixels());
      return ret;
    };

    scratchCanvas = document.createElement('canvas');

    scratchCtx = scratchCanvas.getContext('2d');

    makeImage = function(imageData) {
      var img;
      scratchCtx.width = imageData.width;
      scratchCtx.height = imageData.height;
      scratchCtx.clearRect(0, 0, imageData.width, imageData.height);
      scratchCtx.putImageData(imageData, 0, 0);
      img = new Image;
      img.src = scratchCanvas.toDataURL();
      return img;
    };

    PNG.prototype.decodeFrames = function(ctx) {
      var frame, i, imageData, pixels, _i, _len, _ref, _results;
      if (!this.animation) {
        return;
      }
      _ref = this.animation.frames;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        frame = _ref[i];
        imageData = ctx.createImageData(frame.width, frame.height);
        pixels = this.decodePixels(new Uint8Array(frame.data));
        this.copyToImageData(imageData, pixels);
        frame.imageData = imageData;
        _results.push(frame.image = makeImage(imageData));
      }
      return _results;
    };

    PNG.prototype.renderFrame = function(ctx, number) {
      var frame, frames, prev;
      frames = this.animation.frames;
      frame = frames[number];
      prev = frames[number - 1];
      if (number === 0) {
        ctx.clearRect(0, 0, this.width, this.height);
      }
      if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_BACKGROUND) {
        ctx.clearRect(prev.xOffset, prev.yOffset, prev.width, prev.height);
      } else if ((prev != null ? prev.disposeOp : void 0) === APNG_DISPOSE_OP_PREVIOUS) {
        ctx.putImageData(prev.imageData, prev.xOffset, prev.yOffset);
      }
      if (frame.blendOp === APNG_BLEND_OP_SOURCE) {
        ctx.clearRect(frame.xOffset, frame.yOffset, frame.width, frame.height);
      }
      return ctx.drawImage(frame.image, frame.xOffset, frame.yOffset);
    };

    PNG.prototype.animate = function(ctx) {
      var doFrame, frameNumber, frames, numFrames, numPlays, _ref,
        _this = this;
      frameNumber = 0;
      _ref = this.animation, numFrames = _ref.numFrames, frames = _ref.frames, numPlays = _ref.numPlays;
      return (doFrame = function() {
        var f, frame;
        f = frameNumber++ % numFrames;
        frame = frames[f];
        _this.renderFrame(ctx, f);
        if (numFrames > 1 && frameNumber / numFrames < numPlays) {
          return _this.animation._timeout = setTimeout(doFrame, frame.delay);
        }
      })();
    };

    PNG.prototype.stopAnimation = function() {
      var _ref;
      return clearTimeout((_ref = this.animation) != null ? _ref._timeout : void 0);
    };

    PNG.prototype.render = function(canvas) {
      var ctx, data;
      if (canvas._png) {
        canvas._png.stopAnimation();
      }
      canvas._png = this;
      canvas.width = this.width;
      canvas.height = this.height;
      ctx = canvas.getContext("2d");
      if (this.animation) {
        this.decodeFrames(ctx);
        return this.animate(ctx);
      } else {
        data = ctx.createImageData(this.width, this.height);
        this.copyToImageData(data, this.decodePixels());
        return ctx.putImageData(data, 0, 0);
      }
    };

    return PNG;

  })();

  window.PNG = PNG;

}).call(this);

// End of png.js from https://github.com/devongovett/png.js/

function decodePNG(data, cb) {
    try {
        var png = new PNG(data);
        var ctx = document.createElement("canvas").getContext("2d");
        var pixelData = ctx.createImageData(png.width, png.height);
        png.copyToImageData(pixelData, png.decodePixels());
        cb(pixelData);
    } catch(e) {
        cb(null);
    }
}

function request(url, callback, onprogress) {
    if (/chrome/i.test(navigator.userAgent) && typeof(GM_info) == "undefined") {
        var x = new XMLHttpRequest();
        x.open("GET", url);
        x.overrideMimeType("text/plain; charset=x-user-defined");
        x.responseType = "arraybuffer";
        x.onprogress = onprogress;
        x.onload = function(response) {
            callback(new Uint8Array(x.response));
        };
        x.send();
    } else {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            overrideMimeType: "text/plain; charset=x-user-defined",
            onprogress: onprogress,
            onload: function(response) {
                var rText = response.responseText;
                var data = new Uint8Array(rText.length);
                for (var i = 0; i < rText.length; i++) {
                    data[i] = rText.charCodeAt(i);
                }
                callback(data);
            }
        });
    }
}

function humanSize(n) {
    if (n < 1000) return n + " B";
    if (n < 1024000) return (n / 1024).toPrecision(3) + " KB";
    return (n / 1048576).toPrecision(3) + " MB";
}

function addFileLine(resultsBox, file) {
    var name = (file.Name || "no name");
    if (file.Data != undefined) {
        var nameParts = name.split(".");
        var ext = (nameParts.length >= 2) ? nameParts[nameParts.length-1] : "";
        ext = ext.toLowerCase();
        if (ext in FILE_TYPES) {
            var type = FILE_TYPES[ext];
        } else {
            var ascii = true;
            for (var i = 0; i < file.Data.length; i++) {
                if (file.Data[i] >= 127) {
                    ascii = false;
                    break;
                }
            }
            var type = ascii ? "text/plain" : "application/octet-stream";
        }
        var blob = new Blob([file.Data], {type: type});
        var link = document.createElement("a");
        link.textContent = name;
        link.target = "_blank";
        link.href = URL.createObjectURL(blob);
        resultsBox.appendChild(link);
    } else {
        resultsBox.appendChild(document.createTextNode(name));
    }
    if (file.Size != undefined) {
        var sizeText = " (" + humanSize(file.Size) + ")";
        resultsBox.appendChild(document.createTextNode(sizeText));
    }
}

function list7z(resultsBox, arch, pos) {
    resultsBox.innerHTML = "";
    addFileLine(resultsBox, arch);
    arch.Contents = [];
    arch.Headers = {};
    try {
        parse7z(arch.Data, arch.Contents, arch.Headers);
        //console.log(JSON.stringify(arch.Headers));
    } catch(e) {
        //console.log(e)
        //console.log("line", e.lineNumber);
        //console.log("pos", e.pos);
    }
    var filesList = document.createElement("ul");
    filesList.style.margin = "0px";
    filesList.style.paddingLeft = "3em";
    for (var i = 0; i < arch.Contents.length; i++) {
        var file = arch.Contents[i];
        var listItem = document.createElement("li");
        addFileLine(listItem, file);
        if (is7z(file.Data)) {
            file.FullSize = size7z(file.Data);
            if (file.FullSize > file.Data.length) {
                var findPartsLink = document.createElement("a");
                findPartsLink.textContent = " [find parts]";
                var assembledBox = document.createElement("span");
                listItem.appendChild(findPartsLink);
                listItem.appendChild(document.createElement("br"));
                listItem.appendChild(assembledBox);
                findPartsLink.addEventListener("click", function(e) {
                    findParts(assembledBox, file, pos);
                }, false);
            }
        }
        filesList.appendChild(listItem);
    }
    resultsBox.appendChild(filesList);
}

function readImage(pos, callback) {
    var arch = archiveList[pos];
    if (resultsBoxList[pos] != undefined) {
        resultsBoxList[pos].parentNode.removeChild(resultsBoxList[pos]);
    }
    var thumbContainer = resultsPointList[pos];
    var resultsBox = document.createElement("div");
    resultsBox.style.marginLeft = getComputedStyle(thumbContainer).marginLeft;
    resultsBox.style.padding = ".5em";
    thumbContainer.parentNode.insertBefore(resultsBox, thumbContainer);
    resultsBoxList[pos] = resultsBox;
    request(
        arch.Url,
        function(pngData) {
            decodePNG(pngData, function(pixelData) {
                if (pixelData != null) {
                    var extracted = extractArchive(pixelData);
                } else {
                    var extracted = {ArchType: 0};
                }
                if (extracted.ArchType != 0) {
                    if (extracted.ArchType == TYPE_RAR) {
                        arch.Name = arch.Name.replace(/\.7z$/, ".rar");
                    }
                    arch.IsArchive = true;
                    arch.Data = extracted.Data;
                    arch.Size = extracted.Data.length;
                    list7z(resultsBox, arch, pos);
                } else {
                    arch.IsArchive = false;
                    resultsBox.textContent = "no archive";
                }
                if (callback != undefined) callback();
            });
        },
        function(response) {
            var msg = "loading";
            if (response.lengthComputable) {
                msg += " (" + Math.round(100*response.loaded/response.total) + "%)";
            }
            resultsBox.textContent = msg;
        }
    );
}

function toggleResults(pos) {
    if (resultsBoxList[pos] == undefined) {
        readImage(pos);
    } else {
        resultsBoxList[pos].parentNode.removeChild(resultsBoxList[pos]);
        delete resultsBoxList[pos];
        var arch = {Url: archiveList[pos].Url, Name: archiveList[pos].Name, Contents: []};
        archiveList[pos] = arch;
    }
}

function findParts(resultsBox, arch, pos) {
    var name = (arch.Name || "").replace(/\.\d+$/, "");
    var parts = [arch];
    var hasPart = [];
    for (var i = pos + 1; i < archiveList.length; i++) {
        for (var j = 0; j < archiveList[i].Contents.length; j++) {
            var cand = archiveList[i].Contents[j];
            if ((cand.Name || "").replace(/\.\d+$/, "") == name && cand.Data != undefined) {
                parts.push(cand);
                hasPart[i] = true;
            }
        }
    }
    var totalLength = 0;
    var nParts = 0;
    while (totalLength < arch.FullSize && nParts < parts.length) {
        totalLength += parts[nParts].Data.length;
        nParts++;
    }
    if (totalLength == arch.FullSize) {
        var full = {};
        arch.FullArchive = full;
        full.Name = name;
        full.Size = totalLength;
        full.Data = new Uint8Array(totalLength);
        var offset = 0;
        for (var i = 0; i < nParts; i++) {
            full.Data.set(parts[i].Data, offset);
            offset += parts[i].Data.length;
        }
        list7z(resultsBox, full, pos);
    } else {
        for (var i = pos + 1; i < archiveList.length; i++) {
            if (archiveList[i].IsArchive == undefined) {
                readImage(i, findParts.bind(this, resultsBox, arch, pos));
                break;
            } else {
                if (!hasPart[i]) break;
            }
        }
    }
}

var archiveList = [];
var resultsPointList = [];
var resultsBoxList = [];

var ICON = "data:image/png;base64,R0lGODlhEgASAPECAAAAAKCgoP///wAAACH5BAEAAAMA"
+ "LAAAAAASABIAAAI/nI+pywcP40sg2IstQPWKL2CbY4FmGIxG92FtygVvpsUzrQ7VneU7SoORZEB"
+ "ibXgCHVcu5cUX7FEk1Ib12igAADs=";

function addControls(node) {
    var oldcontrols = document.evaluate(
        './/a[@class="cornelia_button"]',
        node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (var j = 0; j < oldcontrols.snapshotLength; j++) {
        var oldcontrol = oldcontrols.snapshotItem(j);
        oldcontrol.parentNode.removeChild(oldcontrol);
    }
    var thumbs = document.evaluate(
        './/a[contains(substring-before(concat(@href,"?"),"?"),".png") and not(@hrf)]/img',
        node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    for (var j = 0; j < thumbs.snapshotLength; j++) {
        var link = thumbs.snapshotItem(j).parentNode;

        var titleSpan = document.evaluate(
            'ancestor::div[@class="file"]//span[@title]',
            link, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        var name = "";
        if (titleSpan != null) {
            name = titleSpan.title.replace(/\.[^\.]*$/, "");
        }
        if (name == "") name = "archive";
        name += ".7z";

        var arch = {Url: link.href, Name: name, Contents: []};
        archiveList.push(arch);

        var thumbContainer = document.evaluate(
            'ancestor-or-self::*[preceding-sibling::*][1]',
            link, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        if (thumbContainer == null) thumbContainer = link;
        resultsPointList.push(thumbContainer);

        var infobox = document.evaluate(
            'preceding::*[@class="fileText" or @class="fileInfo" or @class="post_file_controls" or @class="filesize"][1]',
            link, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        if (infobox == null) infobox = document.evaluate(
            'following::*[@class="fileText" or @class="fileInfo" or @class="post_file_controls" or @class="filesize"][1]',
            link, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
        ).singleNodeValue;
        if (infobox == null) infobox = link.parentNode;
        var control = document.createElement("a");
        control.innerHTML = '<img src="' + ICON + '" style="margin: -6px 0px -4px;">';
        control.href = "javascript:void(0)";
        control.className = "cornelia_button";
        infobox.appendChild(document.createTextNode(" "));
        infobox.appendChild(control);
        control.addEventListener("click", toggleResults.bind(this, archiveList.length - 1), false);
    }
}

addControls(document);

if (typeof(MutationObserver) == "undefined") MutationObserver = window.WebKitMutationObserver;
var obs = new MutationObserver(function(mus) {
    for (var i = 0; i < mus.length; i++) {
        for (var j = 0; j < mus[i].addedNodes.length; j++) {
            addControls(mus[i].addedNodes[j]);
        }
    }
});
var threads = document.getElementsByClassName("thread");
for (var i = 0; i < threads.length; i++) obs.observe(threads[i], {childList: true, subtree: true});
