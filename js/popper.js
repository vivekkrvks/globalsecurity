! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Popper = t()
}(this, function() {
    "use strict";
    for (var e = ["native code", "[object MutationObserverConstructor]"], t = "undefined" != typeof window, n = ["Edge", "Trident", "Firefox"], o = 0, r = 0; r < n.length; r += 1)
        if (t && navigator.userAgent.indexOf(n[r]) >= 0) {
            o = 1;
            break
        }
    var i, a = t && (i = window.MutationObserver, e.some(function(e) {
        return (i || "").toString().indexOf(e) > -1
    })) ? function(e) {
        var t = !1,
            n = 0,
            o = document.createElement("span");
        return new MutationObserver(function() {
                e(), t = !1
            }).observe(o, {
                attributes: !0
            }),
            function() {
                t || (t = !0, o.setAttribute("x-index", n), n += 1)
            }
    } : function(e) {
        var t = !1;
        return function() {
            t || (t = !0, setTimeout(function() {
                t = !1, e()
            }, o))
        }
    };

    function s(e) {
        return e && "[object Function]" === {}.toString.call(e)
    }

    function f(e, t) {
        if (1 !== e.nodeType) return [];
        var n = window.getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function p(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host
    }

    function l(e) {
        if (!e || -1 !== ["HTML", "BODY", "#document"].indexOf(e.nodeName)) return window.document.body;
        var t = f(e),
            n = t.overflow,
            o = t.overflowX,
            r = t.overflowY;
        return /(auto|scroll)/.test(n + r + o) ? e : l(p(e))
    }

    function d(e) {
        var t = e && e.offsetParent,
            n = t && t.nodeName;
        return n && "BODY" !== n && "HTML" !== n ? -1 !== ["TD", "TABLE"].indexOf(t.nodeName) && "static" === f(t, "position") ? d(t) : t : window.document.documentElement
    }

    function u(e) {
        return null !== e.parentNode ? u(e.parentNode) : e
    }

    function c(e, t) {
        if (!(e && e.nodeType && t && t.nodeType)) return window.document.documentElement;
        var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            o = n ? e : t,
            r = n ? t : e,
            i = document.createRange();
        i.setStart(o, 0), i.setEnd(r, 0);
        var a, s, f = i.commonAncestorContainer;
        if (e !== f && t !== f || o.contains(r)) return "BODY" === (s = (a = f).nodeName) || "HTML" !== s && d(a.firstElementChild) !== a ? d(f) : f;
        var p = u(e);
        return p.host ? c(p.host, t) : c(e, u(t).host)
    }

    function h(e) {
        var t = "top" === (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top") ? "scrollTop" : "scrollLeft",
            n = e.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var o = window.document.documentElement;
            return (window.document.scrollingElement || o)[t]
        }
        return e[t]
    }

    function m(e, t) {
        var n = "x" === t ? "Left" : "Top",
            o = "Left" === n ? "Right" : "Bottom";
        return +e["border" + n + "Width"].split("px")[0] + +e["border" + o + "Width"].split("px")[0]
    }
    var v = void 0,
        g = function() {
            return void 0 === v && (v = -1 !== navigator.appVersion.indexOf("MSIE 10")), v
        };

    function b(e, t, n, o) {
        return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], g() ? n["offset" + e] + o["margin" + ("Height" === e ? "Top" : "Left")] + o["margin" + ("Height" === e ? "Bottom" : "Right")] : 0)
    }

    function w() {
        var e = window.document.body,
            t = window.document.documentElement,
            n = g() && window.getComputedStyle(t);
        return {
            height: b("Height", e, t, n),
            width: b("Width", e, t, n)
        }
    }
    var y = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        O = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t
            }
        }(),
        E = function(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        },
        x = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
            }
            return e
        };

    function L(e) {
        return x({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function T(e) {
        var t = {};
        if (g()) try {
            t = e.getBoundingClientRect();
            var n = h(e, "top"),
                o = h(e, "left");
            t.top += n, t.left += o, t.bottom += n, t.right += o
        } catch (e) {} else t = e.getBoundingClientRect();
        var r = {
                left: t.left,
                top: t.top,
                width: t.right - t.left,
                height: t.bottom - t.top
            },
            i = "HTML" === e.nodeName ? w() : {},
            a = i.width || e.clientWidth || r.right - r.left,
            s = i.height || e.clientHeight || r.bottom - r.top,
            p = e.offsetWidth - a,
            l = e.offsetHeight - s;
        if (p || l) {
            var d = f(e);
            p -= m(d, "x"), l -= m(d, "y"), r.width -= p, r.height -= l
        }
        return L(r)
    }

    function M(e, t) {
        var n = g(),
            o = "HTML" === t.nodeName,
            r = T(e),
            i = T(t),
            a = l(e),
            s = f(t),
            p = +s.borderTopWidth.split("px")[0],
            d = +s.borderLeftWidth.split("px")[0],
            u = L({
                top: r.top - i.top - p,
                left: r.left - i.left - d,
                width: r.width,
                height: r.height
            });
        if (u.marginTop = 0, u.marginLeft = 0, !n && o) {
            var c = +s.marginTop.split("px")[0],
                m = +s.marginLeft.split("px")[0];
            u.top -= p - c, u.bottom -= p - c, u.left -= d - m, u.right -= d - m, u.marginTop = c, u.marginLeft = m
        }
        return (n ? t.contains(a) : t === a && "BODY" !== a.nodeName) && (u = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                o = h(t, "top"),
                r = h(t, "left"),
                i = n ? -1 : 1;
            return e.top += o * i, e.bottom += o * i, e.left += r * i, e.right += r * i, e
        }(u, t)), u
    }

    function C(e, t, n, o) {
        var r, i, a, s, d, u, m, v = {
                top: 0,
                left: 0
            },
            g = c(e, t);
        if ("viewport" === o) r = g, i = window.document.documentElement, a = M(r, i), s = Math.max(i.clientWidth, window.innerWidth || 0), d = Math.max(i.clientHeight, window.innerHeight || 0), u = h(i), m = h(i, "left"), v = L({
            top: u - a.top + a.marginTop,
            left: m - a.left + a.marginLeft,
            width: s,
            height: d
        });
        else {
            var b = void 0;
            "scrollParent" === o ? "BODY" === (b = l(p(e))).nodeName && (b = window.document.documentElement) : b = "window" === o ? window.document.documentElement : o;
            var y = M(b, g);
            if ("HTML" !== b.nodeName || function e(t) {
                    var n = t.nodeName;
                    return "BODY" !== n && "HTML" !== n && ("fixed" === f(t, "position") || e(p(t)))
                }(g)) v = y;
            else {
                var O = w(),
                    E = O.height,
                    x = O.width;
                v.top += y.top - y.marginTop, v.bottom = E + y.top, v.left += y.left - y.marginLeft, v.right = x + y.left
            }
        }
        return v.left += n, v.top += n, v.right -= n, v.bottom -= n, v
    }

    function N(e, t, n, o, r) {
        var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var a = C(n, o, i, r),
            s = {
                top: {
                    width: a.width,
                    height: t.top - a.top
                },
                right: {
                    width: a.right - t.right,
                    height: a.height
                },
                bottom: {
                    width: a.width,
                    height: a.bottom - t.bottom
                },
                left: {
                    width: t.left - a.left,
                    height: a.height
                }
            },
            f = Object.keys(s).map(function(e) {
                return x({
                    key: e
                }, s[e], {
                    area: (t = s[e], t.width * t.height)
                });
                var t
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            p = f.filter(function(e) {
                var t = e.width,
                    o = e.height;
                return t >= n.clientWidth && o >= n.clientHeight
            }),
            l = p.length > 0 ? p[0].key : f[0].key,
            d = e.split("-")[1];
        return l + (d ? "-" + d : "")
    }

    function k(e, t, n) {
        return M(n, c(t, n))
    }

    function S(e) {
        var t = window.getComputedStyle(e),
            n = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            o = parseFloat(t.marginLeft) + parseFloat(t.marginRight);
        return {
            width: e.offsetWidth + o,
            height: e.offsetHeight + n
        }
    }

    function W(e) {
        var t = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function A(e, t, n) {
        n = n.split("-")[0];
        var o = S(e),
            r = {
                width: o.width,
                height: o.height
            },
            i = -1 !== ["right", "left"].indexOf(n),
            a = i ? "top" : "left",
            s = i ? "left" : "top",
            f = i ? "height" : "width",
            p = i ? "width" : "height";
        return r[a] = t[a] + t[f] / 2 - o[f] / 2, r[s] = n === s ? t[s] - o[p] : t[W(s)], r
    }

    function B(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function D(e, t, n) {
        return (void 0 === n ? e : e.slice(0, function(e, t, n) {
            if (Array.prototype.findIndex) return e.findIndex(function(e) {
                return e[t] === n
            });
            var o = B(e, function(e) {
                return e[t] === n
            });
            return e.indexOf(o)
        }(e, "name", n))).forEach(function(e) {
            e.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
            var n = e.function || e.fn;
            e.enabled && s(n) && (t.offsets.popper = L(t.offsets.popper), t.offsets.reference = L(t.offsets.reference), t = n(t, e))
        }), t
    }

    function H(e, t) {
        return e.some(function(e) {
            var n = e.name;
            return e.enabled && n === t
        })
    }

    function P(e) {
        for (var t = [!1, "ms", "Webkit", "Moz", "O"], n = e.charAt(0).toUpperCase() + e.slice(1), o = 0; o < t.length - 1; o++) {
            var r = t[o],
                i = r ? "" + r + n : e;
            if (void 0 !== window.document.body.style[i]) return i
        }
        return null
    }

    function j(e, t, n, o) {
        n.updateBound = o, window.addEventListener("resize", n.updateBound, {
            passive: !0
        });
        var r = l(e);
        return function e(t, n, o, r) {
            var i = "BODY" === t.nodeName,
                a = i ? window : t;
            a.addEventListener(n, o, {
                passive: !0
            }), i || e(l(a.parentNode), n, o, r), r.push(a)
        }(r, "scroll", n.updateBound, n.scrollParents), n.scrollElement = r, n.eventsEnabled = !0, n
    }

    function I() {
        var e;
        this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = (this.reference, e = this.state, window.removeEventListener("resize", e.updateBound), e.scrollParents.forEach(function(t) {
            t.removeEventListener("scroll", e.updateBound)
        }), e.updateBound = null, e.scrollParents = [], e.scrollElement = null, e.eventsEnabled = !1, e))
    }

    function F(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function R(e, t) {
        Object.keys(t).forEach(function(n) {
            var o = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(n) && F(t[n]) && (o = "px"), e.style[n] = t[n] + o
        })
    }

    function U(e, t, n) {
        var o = B(e, function(e) {
                return e.name === t
            }),
            r = !!o && e.some(function(e) {
                return e.name === n && e.enabled && e.order < o.order
            });
        if (!r) {
            var i = "`" + t + "`",
                a = "`" + n + "`";
            console.warn(a + " modifier is required by " + i + " modifier in order to work, be sure to include it before " + i + "!")
        }
        return r
    }
    var Y = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
        q = Y.slice(3);

    function K(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = q.indexOf(e),
            o = q.slice(n + 1).concat(q.slice(0, n));
        return t ? o.reverse() : o
    }
    var z = {
        FLIP: "flip",
        CLOCKWISE: "clockwise",
        COUNTERCLOCKWISE: "counterclockwise"
    };

    function G(e, t, n, o) {
        var r = [0, 0],
            i = -1 !== ["right", "left"].indexOf(o),
            a = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = a.indexOf(B(a, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        a[s] && -1 === a[s].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
        var f = /\s*,\s*|\s+/,
            p = -1 !== s ? [a.slice(0, s).concat([a[s].split(f)[0]]), [a[s].split(f)[1]].concat(a.slice(s + 1))] : [a];
        return (p = p.map(function(e, o) {
            var r = (1 === o ? !i : i) ? "height" : "width",
                a = !1;
            return e.reduce(function(e, t) {
                return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, a = !0, e) : a ? (e[e.length - 1] += t, a = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return function(e, t, n, o) {
                    var r = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        i = +r[1],
                        a = r[2];
                    if (!i) return e;
                    if (0 === a.indexOf("%")) {
                        var s = void 0;
                        switch (a) {
                            case "%p":
                                s = n;
                                break;
                            case "%":
                            case "%r":
                            default:
                                s = o
                        }
                        return L(s)[t] / 100 * i
                    }
                    if ("vh" === a || "vw" === a) return ("vh" === a ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0)) / 100 * i;
                    return i
                }(e, r, t, n)
            })
        })).forEach(function(e, t) {
            e.forEach(function(n, o) {
                F(n) && (r[t] += n * ("-" === e[o - 1] ? -1 : 1))
            })
        }), r
    }
    var V = {
            placement: "bottom",
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function() {},
            onUpdate: function() {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function(e) {
                        var t = e.placement,
                            n = t.split("-")[0],
                            o = t.split("-")[1];
                        if (o) {
                            var r = e.offsets,
                                i = r.reference,
                                a = r.popper,
                                s = -1 !== ["bottom", "top"].indexOf(n),
                                f = s ? "left" : "top",
                                p = s ? "width" : "height",
                                l = {
                                    start: E({}, f, i[f]),
                                    end: E({}, f, i[f] + i[p] - a[p])
                                };
                            e.offsets.popper = x({}, a, l[o])
                        }
                        return e
                    }
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: function(e, t) {
                        var n = t.offset,
                            o = e.placement,
                            r = e.offsets,
                            i = r.popper,
                            a = r.reference,
                            s = o.split("-")[0],
                            f = void 0;
                        return f = F(+n) ? [+n, 0] : G(n, i, a, s), "left" === s ? (i.top += f[0], i.left -= f[1]) : "right" === s ? (i.top += f[0], i.left += f[1]) : "top" === s ? (i.left += f[0], i.top -= f[1]) : "bottom" === s && (i.left += f[0], i.top += f[1]), e.popper = i, e
                    },
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function(e, t) {
                        var n = t.boundariesElement || d(e.instance.popper);
                        e.instance.reference === n && (n = d(n));
                        var o = C(e.instance.popper, e.instance.reference, t.padding, n);
                        t.boundaries = o;
                        var r = t.priority,
                            i = e.offsets.popper,
                            a = {
                                primary: function(e) {
                                    var n = i[e];
                                    return i[e] < o[e] && !t.escapeWithReference && (n = Math.max(i[e], o[e])), E({}, e, n)
                                },
                                secondary: function(e) {
                                    var n = "right" === e ? "left" : "top",
                                        r = i[n];
                                    return i[e] > o[e] && !t.escapeWithReference && (r = Math.min(i[n], o[e] - ("right" === e ? i.width : i.height))), E({}, n, r)
                                }
                            };
                        return r.forEach(function(e) {
                            var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                            i = x({}, i, a[t](e))
                        }), e.offsets.popper = i, e
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function(e) {
                        var t = e.offsets,
                            n = t.popper,
                            o = t.reference,
                            r = e.placement.split("-")[0],
                            i = Math.floor,
                            a = -1 !== ["top", "bottom"].indexOf(r),
                            s = a ? "right" : "bottom",
                            f = a ? "left" : "top",
                            p = a ? "width" : "height";
                        return n[s] < i(o[f]) && (e.offsets.popper[f] = i(o[f]) - n[p]), n[f] > i(o[s]) && (e.offsets.popper[f] = i(o[s])), e
                    }
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function(e, t) {
                        if (!U(e.instance.modifiers, "arrow", "keepTogether")) return e;
                        var n = t.element;
                        if ("string" == typeof n) {
                            if (!(n = e.instance.popper.querySelector(n))) return e
                        } else if (!e.instance.popper.contains(n)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                        var o = e.placement.split("-")[0],
                            r = e.offsets,
                            i = r.popper,
                            a = r.reference,
                            s = -1 !== ["left", "right"].indexOf(o),
                            p = s ? "height" : "width",
                            l = s ? "Top" : "Left",
                            d = l.toLowerCase(),
                            u = s ? "left" : "top",
                            c = s ? "bottom" : "right",
                            h = S(n)[p];
                        a[c] - h < i[d] && (e.offsets.popper[d] -= i[d] - (a[c] - h)), a[d] + h > i[c] && (e.offsets.popper[d] += a[d] + h - i[c]);
                        var m = a[d] + a[p] / 2 - h / 2,
                            v = f(e.instance.popper, "margin" + l).replace("px", ""),
                            g = m - L(e.offsets.popper)[d] - v;
                        return g = Math.max(Math.min(i[p] - h, g), 0), e.arrowElement = n, e.offsets.arrow = {}, e.offsets.arrow[d] = Math.round(g), e.offsets.arrow[u] = "", e
                    },
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function(e, t) {
                        if (H(e.instance.modifiers, "inner")) return e;
                        if (e.flipped && e.placement === e.originalPlacement) return e;
                        var n = C(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
                            o = e.placement.split("-")[0],
                            r = W(o),
                            i = e.placement.split("-")[1] || "",
                            a = [];
                        switch (t.behavior) {
                            case z.FLIP:
                                a = [o, r];
                                break;
                            case z.CLOCKWISE:
                                a = K(o);
                                break;
                            case z.COUNTERCLOCKWISE:
                                a = K(o, !0);
                                break;
                            default:
                                a = t.behavior
                        }
                        return a.forEach(function(s, f) {
                            if (o !== s || a.length === f + 1) return e;
                            o = e.placement.split("-")[0], r = W(o);
                            var p, l = e.offsets.popper,
                                d = e.offsets.reference,
                                u = Math.floor,
                                c = "left" === o && u(l.right) > u(d.left) || "right" === o && u(l.left) < u(d.right) || "top" === o && u(l.bottom) > u(d.top) || "bottom" === o && u(l.top) < u(d.bottom),
                                h = u(l.left) < u(n.left),
                                m = u(l.right) > u(n.right),
                                v = u(l.top) < u(n.top),
                                g = u(l.bottom) > u(n.bottom),
                                b = "left" === o && h || "right" === o && m || "top" === o && v || "bottom" === o && g,
                                w = -1 !== ["top", "bottom"].indexOf(o),
                                y = !!t.flipVariations && (w && "start" === i && h || w && "end" === i && m || !w && "start" === i && v || !w && "end" === i && g);
                            (c || b || y) && (e.flipped = !0, (c || b) && (o = a[f + 1]), y && (i = "end" === (p = i) ? "start" : "start" === p ? "end" : p), e.placement = o + (i ? "-" + i : ""), e.offsets.popper = x({}, e.offsets.popper, A(e.instance.popper, e.offsets.reference, e.placement)), e = D(e.instance.modifiers, e, "flip"))
                        }), e
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport"
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function(e) {
                        var t = e.placement,
                            n = t.split("-")[0],
                            o = e.offsets,
                            r = o.popper,
                            i = o.reference,
                            a = -1 !== ["left", "right"].indexOf(n),
                            s = -1 === ["top", "left"].indexOf(n);
                        return r[a ? "left" : "top"] = i[n] - (s ? r[a ? "width" : "height"] : 0), e.placement = W(t), e.offsets.popper = L(r), e
                    }
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function(e) {
                        if (!U(e.instance.modifiers, "hide", "preventOverflow")) return e;
                        var t = e.offsets.reference,
                            n = B(e.instance.modifiers, function(e) {
                                return "preventOverflow" === e.name
                            }).boundaries;
                        if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                            if (!0 === e.hide) return e;
                            e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                        } else {
                            if (!1 === e.hide) return e;
                            e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                        }
                        return e
                    }
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function(e, t) {
                        var n = t.x,
                            o = t.y,
                            r = e.offsets.popper,
                            i = B(e.instance.modifiers, function(e) {
                                return "applyStyle" === e.name
                            }).gpuAcceleration;
                        void 0 !== i && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                        var a = void 0 !== i ? i : t.gpuAcceleration,
                            s = T(d(e.instance.popper)),
                            f = {
                                position: r.position
                            },
                            p = {
                                left: Math.floor(r.left),
                                top: Math.floor(r.top),
                                bottom: Math.floor(r.bottom),
                                right: Math.floor(r.right)
                            },
                            l = "bottom" === n ? "top" : "bottom",
                            u = "right" === o ? "left" : "right",
                            c = P("transform"),
                            h = void 0,
                            m = void 0;
                        if (m = "bottom" === l ? -s.height + p.bottom : p.top, h = "right" === u ? -s.width + p.right : p.left, a && c) f[c] = "translate3d(" + h + "px, " + m + "px, 0)", f[l] = 0, f[u] = 0, f.willChange = "transform";
                        else {
                            var v = "bottom" === l ? -1 : 1,
                                g = "right" === u ? -1 : 1;
                            f[l] = m * v, f[u] = h * g, f.willChange = l + ", " + u
                        }
                        var b = {
                            "x-placement": e.placement
                        };
                        return e.attributes = x({}, b, e.attributes), e.styles = x({}, f, e.styles), e.arrowStyles = x({}, e.offsets.arrow, e.arrowStyles), e
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function(e) {
                        var t, n;
                        return R(e.instance.popper, e.styles), t = e.instance.popper, n = e.attributes, Object.keys(n).forEach(function(e) {
                            !1 !== n[e] ? t.setAttribute(e, n[e]) : t.removeAttribute(e)
                        }), e.arrowElement && Object.keys(e.arrowStyles).length && R(e.arrowElement, e.arrowStyles), e
                    },
                    onLoad: function(e, t, n, o, r) {
                        var i = k(0, t, e),
                            a = N(n.placement, i, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
                        return t.setAttribute("x-placement", a), R(t, {
                            position: "absolute"
                        }), n
                    },
                    gpuAcceleration: void 0
                }
            }
        },
        _ = function() {
            function e(t, n) {
                var o = this,
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                y(this, e), this.scheduleUpdate = function() {
                    return requestAnimationFrame(o.update)
                }, this.update = a(this.update.bind(this)), this.options = x({}, e.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = t.jquery ? t[0] : t, this.popper = n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(x({}, e.Defaults.modifiers, r.modifiers)).forEach(function(t) {
                    o.options.modifiers[t] = x({}, e.Defaults.modifiers[t] || {}, r.modifiers ? r.modifiers[t] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return x({
                        name: e
                    }, o.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(e) {
                    e.enabled && s(e.onLoad) && e.onLoad(o.reference, o.popper, o.options, e, o.state)
                }), this.update();
                var i = this.options.eventsEnabled;
                i && this.enableEventListeners(), this.state.eventsEnabled = i
            }
            return O(e, [{
                key: "update",
                value: function() {
                    return function() {
                        if (!this.state.isDestroyed) {
                            var e = {
                                instance: this,
                                styles: {},
                                arrowStyles: {},
                                attributes: {},
                                flipped: !1,
                                offsets: {}
                            };
                            e.offsets.reference = k(this.state, this.popper, this.reference), e.placement = N(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = A(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = "absolute", e = D(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
                        }
                    }.call(this)
                }
            }, {
                key: "destroy",
                value: function() {
                    return function() {
                        return this.state.isDestroyed = !0, H(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.left = "", this.popper.style.position = "", this.popper.style.top = "", this.popper.style[P("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                    }.call(this)
                }
            }, {
                key: "enableEventListeners",
                value: function() {
                    return function() {
                        this.state.eventsEnabled || (this.state = j(this.reference, this.options, this.state, this.scheduleUpdate))
                    }.call(this)
                }
            }, {
                key: "disableEventListeners",
                value: function() {
                    return I.call(this)
                }
            }]), e
        }();
    return _.Utils = ("undefined" != typeof window ? window : global).PopperUtils, _.placements = Y, _.Defaults = V, _
});