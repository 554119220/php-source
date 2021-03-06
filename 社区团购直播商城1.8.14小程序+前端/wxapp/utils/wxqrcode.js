var qrcode = function(r, t) {
    var u = r, i = QRErrorCorrectLevel[t], g = null, l = 0, e = null, n = new Array(), f = {}, o = function(r, t) {
        g = function(r) {
            for (var t = new Array(r), e = 0; e < r; e += 1) {
                t[e] = new Array(r);
                for (var n = 0; n < r; n += 1) t[e][n] = null;
            }
            return t;
        }(l = 4 * u + 17), a(0, 0), a(l - 7, 0), a(0, l - 7), h(), c(), v(r, t), 7 <= u && s(r), 
        null == e && (e = w(u, i, n)), d(e, t);
    }, a = function(r, t) {
        for (var e = -1; e <= 7; e += 1) if (!(r + e <= -1 || l <= r + e)) for (var n = -1; n <= 7; n += 1) t + n <= -1 || l <= t + n || (g[r + e][t + n] = 0 <= e && e <= 6 && (0 == n || 6 == n) || 0 <= n && n <= 6 && (0 == e || 6 == e) || 2 <= e && e <= 4 && 2 <= n && n <= 4);
    }, c = function() {
        for (var r = 8; r < l - 8; r += 1) null == g[r][6] && (g[r][6] = r % 2 == 0);
        for (var t = 8; t < l - 8; t += 1) null == g[6][t] && (g[6][t] = t % 2 == 0);
    }, h = function() {
        for (var r = QRUtil.getPatternPosition(u), t = 0; t < r.length; t += 1) for (var e = 0; e < r.length; e += 1) {
            var n = r[t], o = r[e];
            if (null == g[n][o]) for (var a = -2; a <= 2; a += 1) for (var i = -2; i <= 2; i += 1) g[n + a][o + i] = -2 == a || 2 == a || -2 == i || 2 == i || 0 == a && 0 == i;
        }
    }, s = function(r) {
        for (var t = QRUtil.getBCHTypeNumber(u), e = 0; e < 18; e += 1) {
            var n = !r && 1 == (t >> e & 1);
            g[Math.floor(e / 3)][e % 3 + l - 8 - 3] = n;
        }
        for (e = 0; e < 18; e += 1) {
            n = !r && 1 == (t >> e & 1);
            g[e % 3 + l - 8 - 3][Math.floor(e / 3)] = n;
        }
    }, v = function(r, t) {
        for (var e = i << 3 | t, n = QRUtil.getBCHTypeInfo(e), o = 0; o < 15; o += 1) {
            var a = !r && 1 == (n >> o & 1);
            o < 6 ? g[o][8] = a : o < 8 ? g[o + 1][8] = a : g[l - 15 + o][8] = a;
        }
        for (o = 0; o < 15; o += 1) {
            a = !r && 1 == (n >> o & 1);
            o < 8 ? g[8][l - o - 1] = a : o < 9 ? g[8][15 - o - 1 + 1] = a : g[8][15 - o - 1] = a;
        }
        g[l - 8][8] = !r;
    }, d = function(r, t) {
        for (var e = -1, n = l - 1, o = 7, a = 0, i = QRUtil.getMaskFunction(t), u = l - 1; 0 < u; u -= 2) for (6 == u && (u -= 1); ;) {
            for (var f = 0; f < 2; f += 1) if (null == g[n][u - f]) {
                var c = !1;
                a < r.length && (c = 1 == (r[a] >>> o & 1)), i(n, u - f) && (c = !c), g[n][u - f] = c, 
                -1 == (o -= 1) && (a += 1, o = 7);
            }
            if ((n += e) < 0 || l <= n) {
                n -= e, e = -e;
                break;
            }
        }
    }, w = function(r, t, e) {
        for (var n = QRRSBlock.getRSBlocks(r, t), o = qrBitBuffer(), a = 0; a < e.length; a += 1) {
            var i = e[a];
            o.put(i.getMode(), 4), o.put(i.getLength(), QRUtil.getLengthInBits(i.getMode(), r)), 
            i.write(o);
        }
        var u = 0;
        for (a = 0; a < n.length; a += 1) u += n[a].dataCount;
        if (o.getLengthInBits() > 8 * u) throw new Error("code length overflow. (" + o.getLengthInBits() + ">" + 8 * u + ")");
        for (o.getLengthInBits() + 4 <= 8 * u && o.put(0, 4); o.getLengthInBits() % 8 != 0; ) o.putBit(!1);
        for (;!(o.getLengthInBits() >= 8 * u || (o.put(236, 8), o.getLengthInBits() >= 8 * u)); ) o.put(17, 8);
        return function(r, t) {
            for (var e = 0, n = 0, o = 0, a = new Array(t.length), i = new Array(t.length), u = 0; u < t.length; u += 1) {
                var f = t[u].dataCount, c = t[u].totalCount - f;
                n = Math.max(n, f), o = Math.max(o, c), a[u] = new Array(f);
                for (var g = 0; g < a[u].length; g += 1) a[u][g] = 255 & r.getBuffer()[g + e];
                e += f;
                var l = QRUtil.getErrorCorrectPolynomial(c), h = qrPolynomial(a[u], l.getLength() - 1).mod(l);
                for (i[u] = new Array(l.getLength() - 1), g = 0; g < i[u].length; g += 1) {
                    var s = g + h.getLength() - i[u].length;
                    i[u][g] = 0 <= s ? h.getAt(s) : 0;
                }
            }
            var v = 0;
            for (g = 0; g < t.length; g += 1) v += t[g].totalCount;
            var d = new Array(v), w = 0;
            for (g = 0; g < n; g += 1) for (u = 0; u < t.length; u += 1) g < a[u].length && (d[w] = a[u][g], 
            w += 1);
            for (g = 0; g < o; g += 1) for (u = 0; u < t.length; u += 1) g < i[u].length && (d[w] = i[u][g], 
            w += 1);
            return d;
        }(o, n);
    };
    return f.addData = function(r) {
        var t = qr8BitByte(r);
        n.push(t), e = null;
    }, f.isDark = function(r, t) {
        if (r < 0 || l <= r || t < 0 || l <= t) throw new Error(r + "," + t);
        return g[r][t];
    }, f.getModuleCount = function() {
        return l;
    }, f.make = function() {
        o(!1, function() {
            for (var r = 0, t = 0, e = 0; e < 8; e += 1) {
                o(!0, e);
                var n = QRUtil.getLostPoint(f);
                (0 == e || n < r) && (r = n, t = e);
            }
            return t;
        }());
    }, f.createTableTag = function(r, t) {
        r = r || 2;
        var e = "";
        e += '<table style="', e += " border-width: 0px; border-style: none;", e += " border-collapse: collapse;", 
        e += " padding: 0px; margin: " + (t = void 0 === t ? 4 * r : t) + "px;", e += '">', 
        e += "<tbody>";
        for (var n = 0; n < f.getModuleCount(); n += 1) {
            e += "<tr>";
            for (var o = 0; o < f.getModuleCount(); o += 1) e += '<td style="', e += " border-width: 0px; border-style: none;", 
            e += " border-collapse: collapse;", e += " padding: 0px; margin: 0px;", e += " width: " + r + "px;", 
            e += " height: " + r + "px;", e += " background-color: ", e += f.isDark(n, o) ? "#000000" : "#ffffff", 
            e += ";", e += '"/>';
            e += "</tr>";
        }
        return e += "</tbody>", e += "</table>";
    }, f.createImgTag = function(o, r, t) {
        o = o || 2;
        var a = r = void 0 === r ? 4 * o : r, i = f.getModuleCount() * o + r;
        return createImgTag(t, t, function(r, t) {
            if (a <= r && r < i && a <= t && t < i) {
                var e = Math.floor((r - a) / o), n = Math.floor((t - a) / o);
                return f.isDark(n, e) ? 0 : 1;
            }
            return 1;
        });
    }, f;
};

qrcode.stringToBytes = function(r) {
    for (var t = new Array(), e = 0; e < r.length; e += 1) {
        var n = r.charCodeAt(e);
        t.push(255 & n);
    }
    return t;
}, qrcode.createStringToBytes = function(u, f) {
    var a = function() {
        for (var t = base64DecodeInputStream(u), r = function() {
            var r = t.read();
            if (-1 == r) throw new Error();
            return r;
        }, e = 0, n = {}; ;) {
            var o = t.read();
            if (-1 == o) break;
            var a = r(), i = r() << 8 | r();
            n[String.fromCharCode(o << 8 | a)] = i, e += 1;
        }
        if (e != f) throw new Error(e + " != " + f);
        return n;
    }(), i = "?".charCodeAt(0);
    return function(r) {
        for (var t = new Array(), e = 0; e < r.length; e += 1) {
            var n = r.charCodeAt(e);
            if (n < 128) t.push(n); else {
                var o = a[r.charAt(e)];
                "number" == typeof o ? (255 & o) == o ? t.push(o) : (t.push(o >>> 8), t.push(255 & o)) : t.push(i);
            }
        }
        return t;
    };
};

var QRMode = {
    MODE_NUMBER: 1,
    MODE_ALPHA_NUM: 2,
    MODE_8BIT_BYTE: 4,
    MODE_KANJI: 8
}, QRErrorCorrectLevel = {
    L: 1,
    M: 0,
    Q: 3,
    H: 2
}, QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
}, QRUtil = function() {
    var t = [ [], [ 6, 18 ], [ 6, 22 ], [ 6, 26 ], [ 6, 30 ], [ 6, 34 ], [ 6, 22, 38 ], [ 6, 24, 42 ], [ 6, 26, 46 ], [ 6, 28, 50 ], [ 6, 30, 54 ], [ 6, 32, 58 ], [ 6, 34, 62 ], [ 6, 26, 46, 66 ], [ 6, 26, 48, 70 ], [ 6, 26, 50, 74 ], [ 6, 30, 54, 78 ], [ 6, 30, 56, 82 ], [ 6, 30, 58, 86 ], [ 6, 34, 62, 90 ], [ 6, 28, 50, 72, 94 ], [ 6, 26, 50, 74, 98 ], [ 6, 30, 54, 78, 102 ], [ 6, 28, 54, 80, 106 ], [ 6, 32, 58, 84, 110 ], [ 6, 30, 58, 86, 114 ], [ 6, 34, 62, 90, 118 ], [ 6, 26, 50, 74, 98, 122 ], [ 6, 30, 54, 78, 102, 126 ], [ 6, 26, 52, 78, 104, 130 ], [ 6, 30, 56, 82, 108, 134 ], [ 6, 34, 60, 86, 112, 138 ], [ 6, 30, 58, 86, 114, 142 ], [ 6, 34, 62, 90, 118, 146 ], [ 6, 30, 54, 78, 102, 126, 150 ], [ 6, 24, 50, 76, 102, 128, 154 ], [ 6, 28, 54, 80, 106, 132, 158 ], [ 6, 32, 58, 84, 110, 136, 162 ], [ 6, 26, 54, 82, 110, 138, 166 ], [ 6, 30, 58, 86, 114, 142, 170 ] ], r = {}, e = function(r) {
        for (var t = 0; 0 != r; ) t += 1, r >>>= 1;
        return t;
    };
    return r.getBCHTypeInfo = function(r) {
        for (var t = r << 10; 0 <= e(t) - e(1335); ) t ^= 1335 << e(t) - e(1335);
        return 21522 ^ (r << 10 | t);
    }, r.getBCHTypeNumber = function(r) {
        for (var t = r << 12; 0 <= e(t) - e(7973); ) t ^= 7973 << e(t) - e(7973);
        return r << 12 | t;
    }, r.getPatternPosition = function(r) {
        return t[r - 1];
    }, r.getMaskFunction = function(r) {
        switch (r) {
          case QRMaskPattern.PATTERN000:
            return function(r, t) {
                return (r + t) % 2 == 0;
            };

          case QRMaskPattern.PATTERN001:
            return function(r, t) {
                return r % 2 == 0;
            };

          case QRMaskPattern.PATTERN010:
            return function(r, t) {
                return t % 3 == 0;
            };

          case QRMaskPattern.PATTERN011:
            return function(r, t) {
                return (r + t) % 3 == 0;
            };

          case QRMaskPattern.PATTERN100:
            return function(r, t) {
                return (Math.floor(r / 2) + Math.floor(t / 3)) % 2 == 0;
            };

          case QRMaskPattern.PATTERN101:
            return function(r, t) {
                return r * t % 2 + r * t % 3 == 0;
            };

          case QRMaskPattern.PATTERN110:
            return function(r, t) {
                return (r * t % 2 + r * t % 3) % 2 == 0;
            };

          case QRMaskPattern.PATTERN111:
            return function(r, t) {
                return (r * t % 3 + (r + t) % 2) % 2 == 0;
            };

          default:
            throw new Error("bad maskPattern:" + r);
        }
    }, r.getErrorCorrectPolynomial = function(r) {
        for (var t = qrPolynomial([ 1 ], 0), e = 0; e < r; e += 1) t = t.multiply(qrPolynomial([ 1, QRMath.gexp(e) ], 0));
        return t;
    }, r.getLengthInBits = function(r, t) {
        if (1 <= t && t < 10) switch (r) {
          case QRMode.MODE_NUMBER:
            return 10;

          case QRMode.MODE_ALPHA_NUM:
            return 9;

          case QRMode.MODE_8BIT_BYTE:
          case QRMode.MODE_KANJI:
            return 8;

          default:
            throw new Error("mode:" + r);
        } else if (t < 27) switch (r) {
          case QRMode.MODE_NUMBER:
            return 12;

          case QRMode.MODE_ALPHA_NUM:
            return 11;

          case QRMode.MODE_8BIT_BYTE:
            return 16;

          case QRMode.MODE_KANJI:
            return 10;

          default:
            throw new Error("mode:" + r);
        } else {
            if (!(t < 41)) throw new Error("type:" + t);
            switch (r) {
              case QRMode.MODE_NUMBER:
                return 14;

              case QRMode.MODE_ALPHA_NUM:
                return 13;

              case QRMode.MODE_8BIT_BYTE:
                return 16;

              case QRMode.MODE_KANJI:
                return 12;

              default:
                throw new Error("mode:" + r);
            }
        }
    }, r.getLostPoint = function(r) {
        for (var t = r.getModuleCount(), e = 0, n = 0; n < t; n += 1) for (var o = 0; o < t; o += 1) {
            for (var a = 0, i = r.isDark(n, o), u = -1; u <= 1; u += 1) if (!(n + u < 0 || t <= n + u)) for (var f = -1; f <= 1; f += 1) o + f < 0 || t <= o + f || 0 == u && 0 == f || i == r.isDark(n + u, o + f) && (a += 1);
            5 < a && (e += 3 + a - 5);
        }
        for (n = 0; n < t - 1; n += 1) for (o = 0; o < t - 1; o += 1) {
            var c = 0;
            r.isDark(n, o) && (c += 1), r.isDark(n + 1, o) && (c += 1), r.isDark(n, o + 1) && (c += 1), 
            r.isDark(n + 1, o + 1) && (c += 1), 0 != c && 4 != c || (e += 3);
        }
        for (n = 0; n < t; n += 1) for (o = 0; o < t - 6; o += 1) r.isDark(n, o) && !r.isDark(n, o + 1) && r.isDark(n, o + 2) && r.isDark(n, o + 3) && r.isDark(n, o + 4) && !r.isDark(n, o + 5) && r.isDark(n, o + 6) && (e += 40);
        for (o = 0; o < t; o += 1) for (n = 0; n < t - 6; n += 1) r.isDark(n, o) && !r.isDark(n + 1, o) && r.isDark(n + 2, o) && r.isDark(n + 3, o) && r.isDark(n + 4, o) && !r.isDark(n + 5, o) && r.isDark(n + 6, o) && (e += 40);
        var g = 0;
        for (o = 0; o < t; o += 1) for (n = 0; n < t; n += 1) r.isDark(n, o) && (g += 1);
        return e += 10 * (Math.abs(100 * g / t / t - 50) / 5);
    }, r;
}(), QRMath = function() {
    for (var t = new Array(256), e = new Array(256), r = 0; r < 8; r += 1) t[r] = 1 << r;
    for (r = 8; r < 256; r += 1) t[r] = t[r - 4] ^ t[r - 5] ^ t[r - 6] ^ t[r - 8];
    for (r = 0; r < 255; r += 1) e[t[r]] = r;
    var n = {
        glog: function(r) {
            if (r < 1) throw new Error("glog(" + r + ")");
            return e[r];
        },
        gexp: function(r) {
            for (;r < 0; ) r += 255;
            for (;256 <= r; ) r -= 255;
            return t[r];
        }
    };
    return n;
}();

function qrPolynomial(n, o) {
    if (void 0 === n.length) throw new Error(n.length + "/" + o);
    var t = function() {
        for (var r = 0; r < n.length && 0 == n[r]; ) r += 1;
        for (var t = new Array(n.length - r + o), e = 0; e < n.length - r; e += 1) t[e] = n[e + r];
        return t;
    }(), a = {
        getAt: function(r) {
            return t[r];
        },
        getLength: function() {
            return t.length;
        },
        multiply: function(r) {
            for (var t = new Array(a.getLength() + r.getLength() - 1), e = 0; e < a.getLength(); e += 1) for (var n = 0; n < r.getLength(); n += 1) t[e + n] ^= QRMath.gexp(QRMath.glog(a.getAt(e)) + QRMath.glog(r.getAt(n)));
            return qrPolynomial(t, 0);
        },
        mod: function(r) {
            if (a.getLength() - r.getLength() < 0) return a;
            for (var t = QRMath.glog(a.getAt(0)) - QRMath.glog(r.getAt(0)), e = new Array(a.getLength()), n = 0; n < a.getLength(); n += 1) e[n] = a.getAt(n);
            for (n = 0; n < r.getLength(); n += 1) e[n] ^= QRMath.gexp(QRMath.glog(r.getAt(n)) + t);
            return qrPolynomial(e, 0).mod(r);
        }
    };
    return a;
}

var QRRSBlock = function() {
    var h = [ [ 1, 26, 19 ], [ 1, 26, 16 ], [ 1, 26, 13 ], [ 1, 26, 9 ], [ 1, 44, 34 ], [ 1, 44, 28 ], [ 1, 44, 22 ], [ 1, 44, 16 ], [ 1, 70, 55 ], [ 1, 70, 44 ], [ 2, 35, 17 ], [ 2, 35, 13 ], [ 1, 100, 80 ], [ 2, 50, 32 ], [ 2, 50, 24 ], [ 4, 25, 9 ], [ 1, 134, 108 ], [ 2, 67, 43 ], [ 2, 33, 15, 2, 34, 16 ], [ 2, 33, 11, 2, 34, 12 ], [ 2, 86, 68 ], [ 4, 43, 27 ], [ 4, 43, 19 ], [ 4, 43, 15 ], [ 2, 98, 78 ], [ 4, 49, 31 ], [ 2, 32, 14, 4, 33, 15 ], [ 4, 39, 13, 1, 40, 14 ], [ 2, 121, 97 ], [ 2, 60, 38, 2, 61, 39 ], [ 4, 40, 18, 2, 41, 19 ], [ 4, 40, 14, 2, 41, 15 ], [ 2, 146, 116 ], [ 3, 58, 36, 2, 59, 37 ], [ 4, 36, 16, 4, 37, 17 ], [ 4, 36, 12, 4, 37, 13 ], [ 2, 86, 68, 2, 87, 69 ], [ 4, 69, 43, 1, 70, 44 ], [ 6, 43, 19, 2, 44, 20 ], [ 6, 43, 15, 2, 44, 16 ], [ 4, 101, 81 ], [ 1, 80, 50, 4, 81, 51 ], [ 4, 50, 22, 4, 51, 23 ], [ 3, 36, 12, 8, 37, 13 ], [ 2, 116, 92, 2, 117, 93 ], [ 6, 58, 36, 2, 59, 37 ], [ 4, 46, 20, 6, 47, 21 ], [ 7, 42, 14, 4, 43, 15 ], [ 4, 133, 107 ], [ 8, 59, 37, 1, 60, 38 ], [ 8, 44, 20, 4, 45, 21 ], [ 12, 33, 11, 4, 34, 12 ], [ 3, 145, 115, 1, 146, 116 ], [ 4, 64, 40, 5, 65, 41 ], [ 11, 36, 16, 5, 37, 17 ], [ 11, 36, 12, 5, 37, 13 ], [ 5, 109, 87, 1, 110, 88 ], [ 5, 65, 41, 5, 66, 42 ], [ 5, 54, 24, 7, 55, 25 ], [ 11, 36, 12 ], [ 5, 122, 98, 1, 123, 99 ], [ 7, 73, 45, 3, 74, 46 ], [ 15, 43, 19, 2, 44, 20 ], [ 3, 45, 15, 13, 46, 16 ], [ 1, 135, 107, 5, 136, 108 ], [ 10, 74, 46, 1, 75, 47 ], [ 1, 50, 22, 15, 51, 23 ], [ 2, 42, 14, 17, 43, 15 ], [ 5, 150, 120, 1, 151, 121 ], [ 9, 69, 43, 4, 70, 44 ], [ 17, 50, 22, 1, 51, 23 ], [ 2, 42, 14, 19, 43, 15 ], [ 3, 141, 113, 4, 142, 114 ], [ 3, 70, 44, 11, 71, 45 ], [ 17, 47, 21, 4, 48, 22 ], [ 9, 39, 13, 16, 40, 14 ], [ 3, 135, 107, 5, 136, 108 ], [ 3, 67, 41, 13, 68, 42 ], [ 15, 54, 24, 5, 55, 25 ], [ 15, 43, 15, 10, 44, 16 ], [ 4, 144, 116, 4, 145, 117 ], [ 17, 68, 42 ], [ 17, 50, 22, 6, 51, 23 ], [ 19, 46, 16, 6, 47, 17 ], [ 2, 139, 111, 7, 140, 112 ], [ 17, 74, 46 ], [ 7, 54, 24, 16, 55, 25 ], [ 34, 37, 13 ], [ 4, 151, 121, 5, 152, 122 ], [ 4, 75, 47, 14, 76, 48 ], [ 11, 54, 24, 14, 55, 25 ], [ 16, 45, 15, 14, 46, 16 ], [ 6, 147, 117, 4, 148, 118 ], [ 6, 73, 45, 14, 74, 46 ], [ 11, 54, 24, 16, 55, 25 ], [ 30, 46, 16, 2, 47, 17 ], [ 8, 132, 106, 4, 133, 107 ], [ 8, 75, 47, 13, 76, 48 ], [ 7, 54, 24, 22, 55, 25 ], [ 22, 45, 15, 13, 46, 16 ], [ 10, 142, 114, 2, 143, 115 ], [ 19, 74, 46, 4, 75, 47 ], [ 28, 50, 22, 6, 51, 23 ], [ 33, 46, 16, 4, 47, 17 ], [ 8, 152, 122, 4, 153, 123 ], [ 22, 73, 45, 3, 74, 46 ], [ 8, 53, 23, 26, 54, 24 ], [ 12, 45, 15, 28, 46, 16 ], [ 3, 147, 117, 10, 148, 118 ], [ 3, 73, 45, 23, 74, 46 ], [ 4, 54, 24, 31, 55, 25 ], [ 11, 45, 15, 31, 46, 16 ], [ 7, 146, 116, 7, 147, 117 ], [ 21, 73, 45, 7, 74, 46 ], [ 1, 53, 23, 37, 54, 24 ], [ 19, 45, 15, 26, 46, 16 ], [ 5, 145, 115, 10, 146, 116 ], [ 19, 75, 47, 10, 76, 48 ], [ 15, 54, 24, 25, 55, 25 ], [ 23, 45, 15, 25, 46, 16 ], [ 13, 145, 115, 3, 146, 116 ], [ 2, 74, 46, 29, 75, 47 ], [ 42, 54, 24, 1, 55, 25 ], [ 23, 45, 15, 28, 46, 16 ], [ 17, 145, 115 ], [ 10, 74, 46, 23, 75, 47 ], [ 10, 54, 24, 35, 55, 25 ], [ 19, 45, 15, 35, 46, 16 ], [ 17, 145, 115, 1, 146, 116 ], [ 14, 74, 46, 21, 75, 47 ], [ 29, 54, 24, 19, 55, 25 ], [ 11, 45, 15, 46, 46, 16 ], [ 13, 145, 115, 6, 146, 116 ], [ 14, 74, 46, 23, 75, 47 ], [ 44, 54, 24, 7, 55, 25 ], [ 59, 46, 16, 1, 47, 17 ], [ 12, 151, 121, 7, 152, 122 ], [ 12, 75, 47, 26, 76, 48 ], [ 39, 54, 24, 14, 55, 25 ], [ 22, 45, 15, 41, 46, 16 ], [ 6, 151, 121, 14, 152, 122 ], [ 6, 75, 47, 34, 76, 48 ], [ 46, 54, 24, 10, 55, 25 ], [ 2, 45, 15, 64, 46, 16 ], [ 17, 152, 122, 4, 153, 123 ], [ 29, 74, 46, 14, 75, 47 ], [ 49, 54, 24, 10, 55, 25 ], [ 24, 45, 15, 46, 46, 16 ], [ 4, 152, 122, 18, 153, 123 ], [ 13, 74, 46, 32, 75, 47 ], [ 48, 54, 24, 14, 55, 25 ], [ 42, 45, 15, 32, 46, 16 ], [ 20, 147, 117, 4, 148, 118 ], [ 40, 75, 47, 7, 76, 48 ], [ 43, 54, 24, 22, 55, 25 ], [ 10, 45, 15, 67, 46, 16 ], [ 19, 148, 118, 6, 149, 119 ], [ 18, 75, 47, 31, 76, 48 ], [ 34, 54, 24, 34, 55, 25 ], [ 20, 45, 15, 61, 46, 16 ] ], r = {};
    return r.getRSBlocks = function(r, t) {
        var e = function(r, t) {
            switch (t) {
              case QRErrorCorrectLevel.L:
                return h[4 * (r - 1) + 0];

              case QRErrorCorrectLevel.M:
                return h[4 * (r - 1) + 1];

              case QRErrorCorrectLevel.Q:
                return h[4 * (r - 1) + 2];

              case QRErrorCorrectLevel.H:
                return h[4 * (r - 1) + 3];

              default:
                return;
            }
        }(r, t);
        if (void 0 === e) throw new Error("bad rs block @ typeNumber:" + r + "/errorCorrectLevel:" + t);
        for (var n, o, a = e.length / 3, i = new Array(), u = 0; u < a; u += 1) for (var f = e[3 * u + 0], c = e[3 * u + 1], g = e[3 * u + 2], l = 0; l < f; l += 1) i.push((n = g, 
        o = void 0, (o = {}).totalCount = c, o.dataCount = n, o));
        return i;
    }, r;
}(), qrBitBuffer = function() {
    var e = new Array(), n = 0, o = {
        getBuffer: function() {
            return e;
        },
        getAt: function(r) {
            var t = Math.floor(r / 8);
            return 1 == (e[t] >>> 7 - r % 8 & 1);
        },
        put: function(r, t) {
            for (var e = 0; e < t; e += 1) o.putBit(1 == (r >>> t - e - 1 & 1));
        },
        getLengthInBits: function() {
            return n;
        },
        putBit: function(r) {
            var t = Math.floor(n / 8);
            e.length <= t && e.push(0), r && (e[t] |= 128 >>> n % 8), n += 1;
        }
    };
    return o;
}, qr8BitByte = function(r) {
    for (var t = QRMode.MODE_8BIT_BYTE, e = r, n = [], o = {}, a = 0, i = e.length; a < i; a++) {
        var u = [], f = e.charCodeAt(a);
        65536 < f ? (u[0] = 240 | (1835008 & f) >>> 18, u[1] = 128 | (258048 & f) >>> 12, 
        u[2] = 128 | (4032 & f) >>> 6, u[3] = 128 | 63 & f) : 2048 < f ? (u[0] = 224 | (61440 & f) >>> 12, 
        u[1] = 128 | (4032 & f) >>> 6, u[2] = 128 | 63 & f) : 128 < f ? (u[0] = 192 | (1984 & f) >>> 6, 
        u[1] = 128 | 63 & f) : u[0] = f, n.push(u);
    }
    (n = Array.prototype.concat.apply([], n)).length != e.length && (n.unshift(191), 
    n.unshift(187), n.unshift(239));
    var c = n;
    return o.getMode = function() {
        return t;
    }, o.getLength = function(r) {
        return c.length;
    }, o.write = function(r) {
        for (var t = 0; t < c.length; t += 1) r.put(c[t], 8);
    }, o;
}, byteArrayOutputStream = function() {
    var e = new Array(), o = {
        writeByte: function(r) {
            e.push(255 & r);
        },
        writeShort: function(r) {
            o.writeByte(r), o.writeByte(r >>> 8);
        },
        writeBytes: function(r, t, e) {
            t = t || 0, e = e || r.length;
            for (var n = 0; n < e; n += 1) o.writeByte(r[n + t]);
        },
        writeString: function(r) {
            for (var t = 0; t < r.length; t += 1) o.writeByte(r.charCodeAt(t));
        },
        toByteArray: function() {
            return e;
        },
        toString: function() {
            var r = "";
            r += "[";
            for (var t = 0; t < e.length; t += 1) 0 < t && (r += ","), r += e[t];
            return r += "]";
        }
    };
    return o;
}, base64EncodeOutputStream = function() {
    var e = 0, n = 0, o = 0, a = "", r = {}, i = function(r) {
        a += String.fromCharCode(t(63 & r));
    }, t = function(r) {
        if (r < 0) ; else {
            if (r < 26) return 65 + r;
            if (r < 52) return r - 26 + 97;
            if (r < 62) return r - 52 + 48;
            if (62 == r) return 43;
            if (63 == r) return 47;
        }
        throw new Error("n:" + r);
    };
    return r.writeByte = function(r) {
        for (e = e << 8 | 255 & r, n += 8, o += 1; 6 <= n; ) i(e >>> n - 6), n -= 6;
    }, r.flush = function() {
        if (0 < n && (i(e << 6 - n), n = e = 0), o % 3 != 0) for (var r = 3 - o % 3, t = 0; t < r; t += 1) a += "=";
    }, r.toString = function() {
        return a;
    }, r;
}, base64DecodeInputStream = function(r) {
    var e = r, n = 0, o = 0, a = 0, t = {
        read: function() {
            for (;a < 8; ) {
                if (n >= e.length) {
                    if (0 == a) return -1;
                    throw new Error("unexpected end of file./" + a);
                }
                var r = e.charAt(n);
                if (n += 1, "=" == r) return a = 0, -1;
                r.match(/^\s$/) || (o = o << 6 | i(r.charCodeAt(0)), a += 6);
            }
            var t = o >>> a - 8 & 255;
            return a -= 8, t;
        }
    }, i = function(r) {
        if (65 <= r && r <= 90) return r - 65;
        if (97 <= r && r <= 122) return r - 97 + 26;
        if (48 <= r && r <= 57) return r - 48 + 52;
        if (43 == r) return 62;
        if (47 == r) return 63;
        throw new Error("c:" + r);
    };
    return t;
}, gifImage = function(r, t) {
    var n = r, o = t, v = new Array(r * t), e = {
        setPixel: function(r, t, e) {
            v[t * n + r] = e;
        },
        write: function(r) {
            r.writeString("GIF87a"), r.writeShort(n), r.writeShort(o), r.writeByte(128), r.writeByte(0), 
            r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(0), r.writeByte(255), 
            r.writeByte(255), r.writeByte(255), r.writeString(","), r.writeShort(0), r.writeShort(0), 
            r.writeShort(n), r.writeShort(o), r.writeByte(0);
            var t = a(2);
            r.writeByte(2);
            for (var e = 0; 255 < t.length - e; ) r.writeByte(255), r.writeBytes(t, e, 255), 
            e += 255;
            r.writeByte(t.length - e), r.writeBytes(t, e, t.length - e), r.writeByte(0), r.writeString(";");
        }
    }, a = function(r) {
        for (var t = 1 << r, e = 1 + (1 << r), n = r + 1, o = d(), a = 0; a < t; a += 1) o.add(String.fromCharCode(a));
        o.add(String.fromCharCode(t)), o.add(String.fromCharCode(e));
        var i, u, f, c = byteArrayOutputStream(), g = (i = c, f = u = 0, {
            write: function(r, t) {
                if (r >>> t != 0) throw new Error("length over");
                for (;8 <= u + t; ) i.writeByte(255 & (r << u | f)), t -= 8 - u, r >>>= 8 - u, u = f = 0;
                f |= r << u, u += t;
            },
            flush: function() {
                0 < u && i.writeByte(f);
            }
        });
        g.write(t, n);
        var l = 0, h = String.fromCharCode(v[l]);
        for (l += 1; l < v.length; ) {
            var s = String.fromCharCode(v[l]);
            l += 1, o.contains(h + s) ? h += s : (g.write(o.indexOf(h), n), o.size() < 4095 && (o.size() == 1 << n && (n += 1), 
            o.add(h + s)), h = s);
        }
        return g.write(o.indexOf(h), n), g.write(e, n), g.flush(), c.toByteArray();
    }, d = function() {
        var t = {}, e = 0, n = {
            add: function(r) {
                if (n.contains(r)) throw new Error("dup key:" + r);
                t[r] = e, e += 1;
            },
            size: function() {
                return e;
            },
            indexOf: function(r) {
                return t[r];
            },
            contains: function(r) {
                return void 0 !== t[r];
            }
        };
        return n;
    };
    return e;
}, createImgTag = function(r, t, e, n) {
    for (var o = gifImage(r, t), a = 0; a < t; a += 1) for (var i = 0; i < r; i += 1) o.setPixel(i, a, e(i, a));
    var u = byteArrayOutputStream();
    o.write(u);
    for (var f = base64EncodeOutputStream(), c = u.toByteArray(), g = 0; g < c.length; g += 1) f.writeByte(c[g]);
    f.flush();
    var l = "";
    return l += "data:image/gif;base64,", l += f;
}, createQrCodeImg = function t(e, r) {
    var n, o = (r = r || {}).typeNumber || 4, a = r.errorCorrectLevel || "M", i = r.size || 500;
    try {
        (n = qrcode(o, a || "M")).addData(e), n.make();
    } catch (r) {
        if (40 <= o) throw new Error("Text too long to encode");
        return t(e, {
            size: i,
            errorCorrectLevel: a,
            typeNumber: o + 1
        });
    }
    var u = parseInt(i / n.getModuleCount()), f = parseInt((i - n.getModuleCount() * u) / 2);
    return n.createImgTag(u, f, i);
};

module.exports = {
    createQrCodeImg: createQrCodeImg
};