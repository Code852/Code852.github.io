/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
 */
(function (e, t) {
  var n,
    r,
    i = typeof t,
    o = e.location,
    a = e.document,
    s = a.documentElement,
    l = e.jQuery,
    u = e.$,
    c = {},
    p = [],
    f = "1.10.2",
    d = p.concat,
    h = p.push,
    g = p.slice,
    m = p.indexOf,
    y = c.toString,
    v = c.hasOwnProperty,
    b = f.trim,
    x = function (e, t) {
      return new x.fn.init(e, t, r);
    },
    w = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    T = /\S+/g,
    C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    N = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    k = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    E = /^[\],:{}\s]*$/,
    S = /(?:^|:|,)(?:\s*\[)+/g,
    A = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    j = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
    D = /^-ms-/,
    L = /-([\da-z])/gi,
    H = function (e, t) {
      return t.toUpperCase();
    },
    q = function (e) {
      (a.addEventListener ||
        "load" === e.type ||
        "complete" === a.readyState) &&
        (_(), x.ready());
    },
    _ = function () {
      a.addEventListener
        ? (a.removeEventListener("DOMContentLoaded", q, !1),
          e.removeEventListener("load", q, !1))
        : (a.detachEvent("onreadystatechange", q), e.detachEvent("onload", q));
    };
  (x.fn = x.prototype =
    {
      jquery: f,
      constructor: x,
      init: function (e, n, r) {
        var i, o;
        if (!e) return this;
        if ("string" == typeof e) {
          if (
            ((i =
              "<" === e.charAt(0) &&
              ">" === e.charAt(e.length - 1) &&
              e.length >= 3
                ? [null, e, null]
                : N.exec(e)),
            !i || (!i[1] && n))
          )
            return !n || n.jquery
              ? (n || r).find(e)
              : this.constructor(n).find(e);
          if (i[1]) {
            if (
              ((n = n instanceof x ? n[0] : n),
              x.merge(
                this,
                x.parseHTML(
                  i[1],
                  n && n.nodeType ? n.ownerDocument || n : a,
                  !0
                )
              ),
              k.test(i[1]) && x.isPlainObject(n))
            )
              for (i in n)
                x.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
            return this;
          }
          if (((o = a.getElementById(i[2])), o && o.parentNode)) {
            if (o.id !== i[2]) return r.find(e);
            (this.length = 1), (this[0] = o);
          }
          return (this.context = a), (this.selector = e), this;
        }
        return e.nodeType
          ? ((this.context = this[0] = e), (this.length = 1), this)
          : x.isFunction(e)
          ? r.ready(e)
          : (e.selector !== t &&
              ((this.selector = e.selector), (this.context = e.context)),
            x.makeArray(e, this));
      },
      selector: "",
      length: 0,
      toArray: function () {
        return g.call(this);
      },
      get: function (e) {
        return null == e
          ? this.toArray()
          : 0 > e
          ? this[this.length + e]
          : this[e];
      },
      pushStack: function (e) {
        var t = x.merge(this.constructor(), e);
        return (t.prevObject = this), (t.context = this.context), t;
      },
      each: function (e, t) {
        return x.each(this, e, t);
      },
      ready: function (e) {
        return x.ready.promise().done(e), this;
      },
      slice: function () {
        return this.pushStack(g.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (e) {
        var t = this.length,
          n = +e + (0 > e ? t : 0);
        return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
      },
      map: function (e) {
        return this.pushStack(
          x.map(this, function (t, n) {
            return e.call(t, n, t);
          })
        );
      },
      end: function () {
        return this.prevObject || this.constructor(null);
      },
      push: h,
      sort: [].sort,
      splice: [].splice,
    }),
    (x.fn.init.prototype = x.fn),
    (x.extend = x.fn.extend =
      function () {
        var e,
          n,
          r,
          i,
          o,
          a,
          s = arguments[0] || {},
          l = 1,
          u = arguments.length,
          c = !1;
        for (
          "boolean" == typeof s && ((c = s), (s = arguments[1] || {}), (l = 2)),
            "object" == typeof s || x.isFunction(s) || (s = {}),
            u === l && ((s = this), --l);
          u > l;
          l++
        )
          if (null != (o = arguments[l]))
            for (i in o)
              (e = s[i]),
                (r = o[i]),
                s !== r &&
                  (c && r && (x.isPlainObject(r) || (n = x.isArray(r)))
                    ? (n
                        ? ((n = !1), (a = e && x.isArray(e) ? e : []))
                        : (a = e && x.isPlainObject(e) ? e : {}),
                      (s[i] = x.extend(c, a, r)))
                    : r !== t && (s[i] = r));
        return s;
      }),
    x.extend({
      expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
      noConflict: function (t) {
        return e.$ === x && (e.$ = u), t && e.jQuery === x && (e.jQuery = l), x;
      },
      isReady: !1,
      readyWait: 1,
      holdReady: function (e) {
        e ? x.readyWait++ : x.ready(!0);
      },
      ready: function (e) {
        if (e === !0 ? !--x.readyWait : !x.isReady) {
          if (!a.body) return setTimeout(x.ready);
          (x.isReady = !0),
            (e !== !0 && --x.readyWait > 0) ||
              (n.resolveWith(a, [x]),
              x.fn.trigger && x(a).trigger("ready").off("ready"));
        }
      },
      isFunction: function (e) {
        return "function" === x.type(e);
      },
      isArray:
        Array.isArray ||
        function (e) {
          return "array" === x.type(e);
        },
      isWindow: function (e) {
        return null != e && e == e.window;
      },
      isNumeric: function (e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
      },
      type: function (e) {
        return null == e
          ? e + ""
          : "object" == typeof e || "function" == typeof e
          ? c[y.call(e)] || "object"
          : typeof e;
      },
      isPlainObject: function (e) {
        var n;
        if (!e || "object" !== x.type(e) || e.nodeType || x.isWindow(e))
          return !1;
        try {
          if (
            e.constructor &&
            !v.call(e, "constructor") &&
            !v.call(e.constructor.prototype, "isPrototypeOf")
          )
            return !1;
        } catch (r) {
          return !1;
        }
        if (x.support.ownLast) for (n in e) return v.call(e, n);
        for (n in e);
        return n === t || v.call(e, n);
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      error: function (e) {
        throw Error(e);
      },
      parseHTML: function (e, t, n) {
        if (!e || "string" != typeof e) return null;
        "boolean" == typeof t && ((n = t), (t = !1)), (t = t || a);
        var r = k.exec(e),
          i = !n && [];
        return r
          ? [t.createElement(r[1])]
          : ((r = x.buildFragment([e], t, i)),
            i && x(i).remove(),
            x.merge([], r.childNodes));
      },
      parseJSON: function (n) {
        return e.JSON && e.JSON.parse
          ? e.JSON.parse(n)
          : null === n
          ? n
          : "string" == typeof n &&
            ((n = x.trim(n)),
            n && E.test(n.replace(A, "@").replace(j, "]").replace(S, "")))
          ? Function("return " + n)()
          : (x.error("Invalid JSON: " + n), t);
      },
      parseXML: function (n) {
        var r, i;
        if (!n || "string" != typeof n) return null;
        try {
          e.DOMParser
            ? ((i = new DOMParser()), (r = i.parseFromString(n, "text/xml")))
            : ((r = new ActiveXObject("Microsoft.XMLDOM")),
              (r.async = "false"),
              r.loadXML(n));
        } catch (o) {
          r = t;
        }
        return (
          (r &&
            r.documentElement &&
            !r.getElementsByTagName("parsererror").length) ||
            x.error("Invalid XML: " + n),
          r
        );
      },
      noop: function () {},
      globalEval: function (t) {
        t &&
          x.trim(t) &&
          (
            e.execScript ||
            function (t) {
              e.eval.call(e, t);
            }
          )(t);
      },
      camelCase: function (e) {
        return e.replace(D, "ms-").replace(L, H);
      },
      nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
      },
      each: function (e, t, n) {
        var r,
          i = 0,
          o = e.length,
          a = M(e);
        if (n) {
          if (a) {
            for (; o > i; i++) if (((r = t.apply(e[i], n)), r === !1)) break;
          } else for (i in e) if (((r = t.apply(e[i], n)), r === !1)) break;
        } else if (a) {
          for (; o > i; i++) if (((r = t.call(e[i], i, e[i])), r === !1)) break;
        } else for (i in e) if (((r = t.call(e[i], i, e[i])), r === !1)) break;
        return e;
      },
      trim:
        b && !b.call("\ufeff\u00a0")
          ? function (e) {
              return null == e ? "" : b.call(e);
            }
          : function (e) {
              return null == e ? "" : (e + "").replace(C, "");
            },
      makeArray: function (e, t) {
        var n = t || [];
        return (
          null != e &&
            (M(Object(e))
              ? x.merge(n, "string" == typeof e ? [e] : e)
              : h.call(n, e)),
          n
        );
      },
      inArray: function (e, t, n) {
        var r;
        if (t) {
          if (m) return m.call(t, e, n);
          for (
            r = t.length, n = n ? (0 > n ? Math.max(0, r + n) : n) : 0;
            r > n;
            n++
          )
            if (n in t && t[n] === e) return n;
        }
        return -1;
      },
      merge: function (e, n) {
        var r = n.length,
          i = e.length,
          o = 0;
        if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o];
        else while (n[o] !== t) e[i++] = n[o++];
        return (e.length = i), e;
      },
      grep: function (e, t, n) {
        var r,
          i = [],
          o = 0,
          a = e.length;
        for (n = !!n; a > o; o++) (r = !!t(e[o], o)), n !== r && i.push(e[o]);
        return i;
      },
      map: function (e, t, n) {
        var r,
          i = 0,
          o = e.length,
          a = M(e),
          s = [];
        if (a)
          for (; o > i; i++)
            (r = t(e[i], i, n)), null != r && (s[s.length] = r);
        else for (i in e) (r = t(e[i], i, n)), null != r && (s[s.length] = r);
        return d.apply([], s);
      },
      guid: 1,
      proxy: function (e, n) {
        var r, i, o;
        return (
          "string" == typeof n && ((o = e[n]), (n = e), (e = o)),
          x.isFunction(e)
            ? ((r = g.call(arguments, 2)),
              (i = function () {
                return e.apply(n || this, r.concat(g.call(arguments)));
              }),
              (i.guid = e.guid = e.guid || x.guid++),
              i)
            : t
        );
      },
      access: function (e, n, r, i, o, a, s) {
        var l = 0,
          u = e.length,
          c = null == r;
        if ("object" === x.type(r)) {
          o = !0;
          for (l in r) x.access(e, n, l, r[l], !0, a, s);
        } else if (
          i !== t &&
          ((o = !0),
          x.isFunction(i) || (s = !0),
          c &&
            (s
              ? (n.call(e, i), (n = null))
              : ((c = n),
                (n = function (e, t, n) {
                  return c.call(x(e), n);
                }))),
          n)
        )
          for (; u > l; l++) n(e[l], r, s ? i : i.call(e[l], l, n(e[l], r)));
        return o ? e : c ? n.call(e) : u ? n(e[0], r) : a;
      },
      now: function () {
        return new Date().getTime();
      },
      swap: function (e, t, n, r) {
        var i,
          o,
          a = {};
        for (o in t) (a[o] = e.style[o]), (e.style[o] = t[o]);
        i = n.apply(e, r || []);
        for (o in t) e.style[o] = a[o];
        return i;
      },
    }),
    (x.ready.promise = function (t) {
      if (!n)
        if (((n = x.Deferred()), "complete" === a.readyState))
          setTimeout(x.ready);
        else if (a.addEventListener)
          a.addEventListener("DOMContentLoaded", q, !1),
            e.addEventListener("load", q, !1);
        else {
          a.attachEvent("onreadystatechange", q), e.attachEvent("onload", q);
          var r = !1;
          try {
            r = null == e.frameElement && a.documentElement;
          } catch (i) {}
          r &&
            r.doScroll &&
            (function o() {
              if (!x.isReady) {
                try {
                  r.doScroll("left");
                } catch (e) {
                  return setTimeout(o, 50);
                }
                _(), x.ready();
              }
            })();
        }
      return n.promise(t);
    }),
    x.each(
      "Boolean Number String Function Array Date RegExp Object Error".split(
        " "
      ),
      function (e, t) {
        c["[object " + t + "]"] = t.toLowerCase();
      }
    );
  function M(e) {
    var t = e.length,
      n = x.type(e);
    return x.isWindow(e)
      ? !1
      : 1 === e.nodeType && t
      ? !0
      : "array" === n ||
        ("function" !== n &&
          (0 === t || ("number" == typeof t && t > 0 && t - 1 in e)));
  }
  (r = x(a)),
    (function (e, t) {
      var n,
        r,
        i,
        o,
        a,
        s,
        l,
        u,
        c,
        p,
        f,
        d,
        h,
        g,
        m,
        y,
        v,
        b = "sizzle" + -new Date(),
        w = e.document,
        T = 0,
        C = 0,
        N = st(),
        k = st(),
        E = st(),
        S = !1,
        A = function (e, t) {
          return e === t ? ((S = !0), 0) : 0;
        },
        j = typeof t,
        D = 1 << 31,
        L = {}.hasOwnProperty,
        H = [],
        q = H.pop,
        _ = H.push,
        M = H.push,
        O = H.slice,
        F =
          H.indexOf ||
          function (e) {
            var t = 0,
              n = this.length;
            for (; n > t; t++) if (this[t] === e) return t;
            return -1;
          },
        B =
          "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        P = "[\\x20\\t\\r\\n\\f]",
        R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        W = R.replace("w", "w#"),
        $ =
          "\\[" +
          P +
          "*(" +
          R +
          ")" +
          P +
          "*(?:([*^$|!~]?=)" +
          P +
          "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
          W +
          ")|)|)" +
          P +
          "*\\]",
        I =
          ":(" +
          R +
          ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
          $.replace(3, 8) +
          ")*)|.*)\\)|)",
        z = RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"),
        X = RegExp("^" + P + "*," + P + "*"),
        U = RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"),
        V = RegExp(P + "*[+~]"),
        Y = RegExp("=" + P + "*([^\\]'\"]*)" + P + "*\\]", "g"),
        J = RegExp(I),
        G = RegExp("^" + W + "$"),
        Q = {
          ID: RegExp("^#(" + R + ")"),
          CLASS: RegExp("^\\.(" + R + ")"),
          TAG: RegExp("^(" + R.replace("w", "w*") + ")"),
          ATTR: RegExp("^" + $),
          PSEUDO: RegExp("^" + I),
          CHILD: RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
              P +
              "*(even|odd|(([+-]|)(\\d*)n|)" +
              P +
              "*(?:([+-]|)" +
              P +
              "*(\\d+)|))" +
              P +
              "*\\)|)",
            "i"
          ),
          bool: RegExp("^(?:" + B + ")$", "i"),
          needsContext: RegExp(
            "^" +
              P +
              "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
              P +
              "*((?:-\\d)?\\d*)" +
              P +
              "*\\)|)(?=[^-]|$)",
            "i"
          ),
        },
        K = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        et = /^(?:input|select|textarea|button)$/i,
        tt = /^h\d$/i,
        nt = /'|\\/g,
        rt = RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"),
        it = function (e, t, n) {
          var r = "0x" + t - 65536;
          return r !== r || n
            ? t
            : 0 > r
            ? String.fromCharCode(r + 65536)
            : String.fromCharCode(55296 | (r >> 10), 56320 | (1023 & r));
        };
      try {
        M.apply((H = O.call(w.childNodes)), w.childNodes),
          H[w.childNodes.length].nodeType;
      } catch (ot) {
        M = {
          apply: H.length
            ? function (e, t) {
                _.apply(e, O.call(t));
              }
            : function (e, t) {
                var n = e.length,
                  r = 0;
                while ((e[n++] = t[r++]));
                e.length = n - 1;
              },
        };
      }
      function at(e, t, n, i) {
        var o, a, s, l, u, c, d, m, y, x;
        if (
          ((t ? t.ownerDocument || t : w) !== f && p(t),
          (t = t || f),
          (n = n || []),
          !e || "string" != typeof e)
        )
          return n;
        if (1 !== (l = t.nodeType) && 9 !== l) return [];
        if (h && !i) {
          if ((o = Z.exec(e)))
            if ((s = o[1])) {
              if (9 === l) {
                if (((a = t.getElementById(s)), !a || !a.parentNode)) return n;
                if (a.id === s) return n.push(a), n;
              } else if (
                t.ownerDocument &&
                (a = t.ownerDocument.getElementById(s)) &&
                v(t, a) &&
                a.id === s
              )
                return n.push(a), n;
            } else {
              if (o[2]) return M.apply(n, t.getElementsByTagName(e)), n;
              if (
                (s = o[3]) &&
                r.getElementsByClassName &&
                t.getElementsByClassName
              )
                return M.apply(n, t.getElementsByClassName(s)), n;
            }
          if (r.qsa && (!g || !g.test(e))) {
            if (
              ((m = d = b),
              (y = t),
              (x = 9 === l && e),
              1 === l && "object" !== t.nodeName.toLowerCase())
            ) {
              (c = mt(e)),
                (d = t.getAttribute("id"))
                  ? (m = d.replace(nt, "\\$&"))
                  : t.setAttribute("id", m),
                (m = "[id='" + m + "'] "),
                (u = c.length);
              while (u--) c[u] = m + yt(c[u]);
              (y = (V.test(e) && t.parentNode) || t), (x = c.join(","));
            }
            if (x)
              try {
                return M.apply(n, y.querySelectorAll(x)), n;
              } catch (T) {
              } finally {
                d || t.removeAttribute("id");
              }
          }
        }
        return kt(e.replace(z, "$1"), t, n, i);
      }
      function st() {
        var e = [];
        function t(n, r) {
          return (
            e.push((n += " ")) > o.cacheLength && delete t[e.shift()],
            (t[n] = r)
          );
        }
        return t;
      }
      function lt(e) {
        return (e[b] = !0), e;
      }
      function ut(e) {
        var t = f.createElement("div");
        try {
          return !!e(t);
        } catch (n) {
          return !1;
        } finally {
          t.parentNode && t.parentNode.removeChild(t), (t = null);
        }
      }
      function ct(e, t) {
        var n = e.split("|"),
          r = e.length;
        while (r--) o.attrHandle[n[r]] = t;
      }
      function pt(e, t) {
        var n = t && e,
          r =
            n &&
            1 === e.nodeType &&
            1 === t.nodeType &&
            (~t.sourceIndex || D) - (~e.sourceIndex || D);
        if (r) return r;
        if (n) while ((n = n.nextSibling)) if (n === t) return -1;
        return e ? 1 : -1;
      }
      function ft(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return "input" === n && t.type === e;
        };
      }
      function dt(e) {
        return function (t) {
          var n = t.nodeName.toLowerCase();
          return ("input" === n || "button" === n) && t.type === e;
        };
      }
      function ht(e) {
        return lt(function (t) {
          return (
            (t = +t),
            lt(function (n, r) {
              var i,
                o = e([], n.length, t),
                a = o.length;
              while (a--) n[(i = o[a])] && (n[i] = !(r[i] = n[i]));
            })
          );
        });
      }
      (s = at.isXML =
        function (e) {
          var t = e && (e.ownerDocument || e).documentElement;
          return t ? "HTML" !== t.nodeName : !1;
        }),
        (r = at.support = {}),
        (p = at.setDocument =
          function (e) {
            var n = e ? e.ownerDocument || e : w,
              i = n.defaultView;
            return n !== f && 9 === n.nodeType && n.documentElement
              ? ((f = n),
                (d = n.documentElement),
                (h = !s(n)),
                i &&
                  i.attachEvent &&
                  i !== i.top &&
                  i.attachEvent("onbeforeunload", function () {
                    p();
                  }),
                (r.attributes = ut(function (e) {
                  return (e.className = "i"), !e.getAttribute("className");
                })),
                (r.getElementsByTagName = ut(function (e) {
                  return (
                    e.appendChild(n.createComment("")),
                    !e.getElementsByTagName("*").length
                  );
                })),
                (r.getElementsByClassName = ut(function (e) {
                  return (
                    (e.innerHTML =
                      "<div class='a'></div><div class='a i'></div>"),
                    (e.firstChild.className = "i"),
                    2 === e.getElementsByClassName("i").length
                  );
                })),
                (r.getById = ut(function (e) {
                  return (
                    (d.appendChild(e).id = b),
                    !n.getElementsByName || !n.getElementsByName(b).length
                  );
                })),
                r.getById
                  ? ((o.find.ID = function (e, t) {
                      if (typeof t.getElementById !== j && h) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : [];
                      }
                    }),
                    (o.filter.ID = function (e) {
                      var t = e.replace(rt, it);
                      return function (e) {
                        return e.getAttribute("id") === t;
                      };
                    }))
                  : (delete o.find.ID,
                    (o.filter.ID = function (e) {
                      var t = e.replace(rt, it);
                      return function (e) {
                        var n =
                          typeof e.getAttributeNode !== j &&
                          e.getAttributeNode("id");
                        return n && n.value === t;
                      };
                    })),
                (o.find.TAG = r.getElementsByTagName
                  ? function (e, n) {
                      return typeof n.getElementsByTagName !== j
                        ? n.getElementsByTagName(e)
                        : t;
                    }
                  : function (e, t) {
                      var n,
                        r = [],
                        i = 0,
                        o = t.getElementsByTagName(e);
                      if ("*" === e) {
                        while ((n = o[i++])) 1 === n.nodeType && r.push(n);
                        return r;
                      }
                      return o;
                    }),
                (o.find.CLASS =
                  r.getElementsByClassName &&
                  function (e, n) {
                    return typeof n.getElementsByClassName !== j && h
                      ? n.getElementsByClassName(e)
                      : t;
                  }),
                (m = []),
                (g = []),
                (r.qsa = K.test(n.querySelectorAll)) &&
                  (ut(function (e) {
                    (e.innerHTML =
                      "<select><option selected=''></option></select>"),
                      e.querySelectorAll("[selected]").length ||
                        g.push("\\[" + P + "*(?:value|" + B + ")"),
                      e.querySelectorAll(":checked").length ||
                        g.push(":checked");
                  }),
                  ut(function (e) {
                    var t = n.createElement("input");
                    t.setAttribute("type", "hidden"),
                      e.appendChild(t).setAttribute("t", ""),
                      e.querySelectorAll("[t^='']").length &&
                        g.push("[*^$]=" + P + "*(?:''|\"\")"),
                      e.querySelectorAll(":enabled").length ||
                        g.push(":enabled", ":disabled"),
                      e.querySelectorAll("*,:x"),
                      g.push(",.*:");
                  })),
                (r.matchesSelector = K.test(
                  (y =
                    d.webkitMatchesSelector ||
                    d.mozMatchesSelector ||
                    d.oMatchesSelector ||
                    d.msMatchesSelector)
                )) &&
                  ut(function (e) {
                    (r.disconnectedMatch = y.call(e, "div")),
                      y.call(e, "[s!='']:x"),
                      m.push("!=", I);
                  }),
                (g = g.length && RegExp(g.join("|"))),
                (m = m.length && RegExp(m.join("|"))),
                (v =
                  K.test(d.contains) || d.compareDocumentPosition
                    ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e,
                          r = t && t.parentNode;
                        return (
                          e === r ||
                          !(
                            !r ||
                            1 !== r.nodeType ||
                            !(n.contains
                              ? n.contains(r)
                              : e.compareDocumentPosition &&
                                16 & e.compareDocumentPosition(r))
                          )
                        );
                      }
                    : function (e, t) {
                        if (t)
                          while ((t = t.parentNode)) if (t === e) return !0;
                        return !1;
                      }),
                (A = d.compareDocumentPosition
                  ? function (e, t) {
                      if (e === t) return (S = !0), 0;
                      var i =
                        t.compareDocumentPosition &&
                        e.compareDocumentPosition &&
                        e.compareDocumentPosition(t);
                      return i
                        ? 1 & i ||
                          (!r.sortDetached &&
                            t.compareDocumentPosition(e) === i)
                          ? e === n || v(w, e)
                            ? -1
                            : t === n || v(w, t)
                            ? 1
                            : c
                            ? F.call(c, e) - F.call(c, t)
                            : 0
                          : 4 & i
                          ? -1
                          : 1
                        : e.compareDocumentPosition
                        ? -1
                        : 1;
                    }
                  : function (e, t) {
                      var r,
                        i = 0,
                        o = e.parentNode,
                        a = t.parentNode,
                        s = [e],
                        l = [t];
                      if (e === t) return (S = !0), 0;
                      if (!o || !a)
                        return e === n
                          ? -1
                          : t === n
                          ? 1
                          : o
                          ? -1
                          : a
                          ? 1
                          : c
                          ? F.call(c, e) - F.call(c, t)
                          : 0;
                      if (o === a) return pt(e, t);
                      r = e;
                      while ((r = r.parentNode)) s.unshift(r);
                      r = t;
                      while ((r = r.parentNode)) l.unshift(r);
                      while (s[i] === l[i]) i++;
                      return i
                        ? pt(s[i], l[i])
                        : s[i] === w
                        ? -1
                        : l[i] === w
                        ? 1
                        : 0;
                    }),
                n)
              : f;
          }),
        (at.matches = function (e, t) {
          return at(e, null, null, t);
        }),
        (at.matchesSelector = function (e, t) {
          if (
            ((e.ownerDocument || e) !== f && p(e),
            (t = t.replace(Y, "='$1']")),
            !(!r.matchesSelector || !h || (m && m.test(t)) || (g && g.test(t))))
          )
            try {
              var n = y.call(e, t);
              if (
                n ||
                r.disconnectedMatch ||
                (e.document && 11 !== e.document.nodeType)
              )
                return n;
            } catch (i) {}
          return at(t, f, null, [e]).length > 0;
        }),
        (at.contains = function (e, t) {
          return (e.ownerDocument || e) !== f && p(e), v(e, t);
        }),
        (at.attr = function (e, n) {
          (e.ownerDocument || e) !== f && p(e);
          var i = o.attrHandle[n.toLowerCase()],
            a = i && L.call(o.attrHandle, n.toLowerCase()) ? i(e, n, !h) : t;
          return a === t
            ? r.attributes || !h
              ? e.getAttribute(n)
              : (a = e.getAttributeNode(n)) && a.specified
              ? a.value
              : null
            : a;
        }),
        (at.error = function (e) {
          throw Error("Syntax error, unrecognized expression: " + e);
        }),
        (at.uniqueSort = function (e) {
          var t,
            n = [],
            i = 0,
            o = 0;
          if (
            ((S = !r.detectDuplicates),
            (c = !r.sortStable && e.slice(0)),
            e.sort(A),
            S)
          ) {
            while ((t = e[o++])) t === e[o] && (i = n.push(o));
            while (i--) e.splice(n[i], 1);
          }
          return e;
        }),
        (a = at.getText =
          function (e) {
            var t,
              n = "",
              r = 0,
              i = e.nodeType;
            if (i) {
              if (1 === i || 9 === i || 11 === i) {
                if ("string" == typeof e.textContent) return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling) n += a(e);
              } else if (3 === i || 4 === i) return e.nodeValue;
            } else for (; (t = e[r]); r++) n += a(t);
            return n;
          }),
        (o = at.selectors =
          {
            cacheLength: 50,
            createPseudo: lt,
            match: Q,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: !0 },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: !0 },
              "~": { dir: "previousSibling" },
            },
            preFilter: {
              ATTR: function (e) {
                return (
                  (e[1] = e[1].replace(rt, it)),
                  (e[3] = (e[4] || e[5] || "").replace(rt, it)),
                  "~=" === e[2] && (e[3] = " " + e[3] + " "),
                  e.slice(0, 4)
                );
              },
              CHILD: function (e) {
                return (
                  (e[1] = e[1].toLowerCase()),
                  "nth" === e[1].slice(0, 3)
                    ? (e[3] || at.error(e[0]),
                      (e[4] = +(e[4]
                        ? e[5] + (e[6] || 1)
                        : 2 * ("even" === e[3] || "odd" === e[3]))),
                      (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                    : e[3] && at.error(e[0]),
                  e
                );
              },
              PSEUDO: function (e) {
                var n,
                  r = !e[5] && e[2];
                return Q.CHILD.test(e[0])
                  ? null
                  : (e[3] && e[4] !== t
                      ? (e[2] = e[4])
                      : r &&
                        J.test(r) &&
                        (n = mt(r, !0)) &&
                        (n = r.indexOf(")", r.length - n) - r.length) &&
                        ((e[0] = e[0].slice(0, n)), (e[2] = r.slice(0, n))),
                    e.slice(0, 3));
              },
            },
            filter: {
              TAG: function (e) {
                var t = e.replace(rt, it).toLowerCase();
                return "*" === e
                  ? function () {
                      return !0;
                    }
                  : function (e) {
                      return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
              },
              CLASS: function (e) {
                var t = N[e + " "];
                return (
                  t ||
                  ((t = RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) &&
                    N(e, function (e) {
                      return t.test(
                        ("string" == typeof e.className && e.className) ||
                          (typeof e.getAttribute !== j &&
                            e.getAttribute("class")) ||
                          ""
                      );
                    }))
                );
              },
              ATTR: function (e, t, n) {
                return function (r) {
                  var i = at.attr(r, e);
                  return null == i
                    ? "!=" === t
                    : t
                    ? ((i += ""),
                      "=" === t
                        ? i === n
                        : "!=" === t
                        ? i !== n
                        : "^=" === t
                        ? n && 0 === i.indexOf(n)
                        : "*=" === t
                        ? n && i.indexOf(n) > -1
                        : "$=" === t
                        ? n && i.slice(-n.length) === n
                        : "~=" === t
                        ? (" " + i + " ").indexOf(n) > -1
                        : "|=" === t
                        ? i === n || i.slice(0, n.length + 1) === n + "-"
                        : !1)
                    : !0;
                };
              },
              CHILD: function (e, t, n, r, i) {
                var o = "nth" !== e.slice(0, 3),
                  a = "last" !== e.slice(-4),
                  s = "of-type" === t;
                return 1 === r && 0 === i
                  ? function (e) {
                      return !!e.parentNode;
                    }
                  : function (t, n, l) {
                      var u,
                        c,
                        p,
                        f,
                        d,
                        h,
                        g = o !== a ? "nextSibling" : "previousSibling",
                        m = t.parentNode,
                        y = s && t.nodeName.toLowerCase(),
                        v = !l && !s;
                      if (m) {
                        if (o) {
                          while (g) {
                            p = t;
                            while ((p = p[g]))
                              if (
                                s
                                  ? p.nodeName.toLowerCase() === y
                                  : 1 === p.nodeType
                              )
                                return !1;
                            h = g = "only" === e && !h && "nextSibling";
                          }
                          return !0;
                        }
                        if (((h = [a ? m.firstChild : m.lastChild]), a && v)) {
                          (c = m[b] || (m[b] = {})),
                            (u = c[e] || []),
                            (d = u[0] === T && u[1]),
                            (f = u[0] === T && u[2]),
                            (p = d && m.childNodes[d]);
                          while (
                            (p = (++d && p && p[g]) || (f = d = 0) || h.pop())
                          )
                            if (1 === p.nodeType && ++f && p === t) {
                              c[e] = [T, d, f];
                              break;
                            }
                        } else if (
                          v &&
                          (u = (t[b] || (t[b] = {}))[e]) &&
                          u[0] === T
                        )
                          f = u[1];
                        else
                          while (
                            (p = (++d && p && p[g]) || (f = d = 0) || h.pop())
                          )
                            if (
                              (s
                                ? p.nodeName.toLowerCase() === y
                                : 1 === p.nodeType) &&
                              ++f &&
                              (v && ((p[b] || (p[b] = {}))[e] = [T, f]),
                              p === t)
                            )
                              break;
                        return (f -= i), f === r || (0 === f % r && f / r >= 0);
                      }
                    };
              },
              PSEUDO: function (e, t) {
                var n,
                  r =
                    o.pseudos[e] ||
                    o.setFilters[e.toLowerCase()] ||
                    at.error("unsupported pseudo: " + e);
                return r[b]
                  ? r(t)
                  : r.length > 1
                  ? ((n = [e, e, "", t]),
                    o.setFilters.hasOwnProperty(e.toLowerCase())
                      ? lt(function (e, n) {
                          var i,
                            o = r(e, t),
                            a = o.length;
                          while (a--)
                            (i = F.call(e, o[a])), (e[i] = !(n[i] = o[a]));
                        })
                      : function (e) {
                          return r(e, 0, n);
                        })
                  : r;
              },
            },
            pseudos: {
              not: lt(function (e) {
                var t = [],
                  n = [],
                  r = l(e.replace(z, "$1"));
                return r[b]
                  ? lt(function (e, t, n, i) {
                      var o,
                        a = r(e, null, i, []),
                        s = e.length;
                      while (s--) (o = a[s]) && (e[s] = !(t[s] = o));
                    })
                  : function (e, i, o) {
                      return (t[0] = e), r(t, null, o, n), !n.pop();
                    };
              }),
              has: lt(function (e) {
                return function (t) {
                  return at(e, t).length > 0;
                };
              }),
              contains: lt(function (e) {
                return function (t) {
                  return (t.textContent || t.innerText || a(t)).indexOf(e) > -1;
                };
              }),
              lang: lt(function (e) {
                return (
                  G.test(e || "") || at.error("unsupported lang: " + e),
                  (e = e.replace(rt, it).toLowerCase()),
                  function (t) {
                    var n;
                    do
                      if (
                        (n = h
                          ? t.lang
                          : t.getAttribute("xml:lang") ||
                            t.getAttribute("lang"))
                      )
                        return (
                          (n = n.toLowerCase()),
                          n === e || 0 === n.indexOf(e + "-")
                        );
                    while ((t = t.parentNode) && 1 === t.nodeType);
                    return !1;
                  }
                );
              }),
              target: function (t) {
                var n = e.location && e.location.hash;
                return n && n.slice(1) === t.id;
              },
              root: function (e) {
                return e === d;
              },
              focus: function (e) {
                return (
                  e === f.activeElement &&
                  (!f.hasFocus || f.hasFocus()) &&
                  !!(e.type || e.href || ~e.tabIndex)
                );
              },
              enabled: function (e) {
                return e.disabled === !1;
              },
              disabled: function (e) {
                return e.disabled === !0;
              },
              checked: function (e) {
                var t = e.nodeName.toLowerCase();
                return (
                  ("input" === t && !!e.checked) ||
                  ("option" === t && !!e.selected)
                );
              },
              selected: function (e) {
                return (
                  e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                );
              },
              empty: function (e) {
                for (e = e.firstChild; e; e = e.nextSibling)
                  if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType)
                    return !1;
                return !0;
              },
              parent: function (e) {
                return !o.pseudos.empty(e);
              },
              header: function (e) {
                return tt.test(e.nodeName);
              },
              input: function (e) {
                return et.test(e.nodeName);
              },
              button: function (e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t && "button" === e.type) || "button" === t;
              },
              text: function (e) {
                var t;
                return (
                  "input" === e.nodeName.toLowerCase() &&
                  "text" === e.type &&
                  (null == (t = e.getAttribute("type")) ||
                    t.toLowerCase() === e.type)
                );
              },
              first: ht(function () {
                return [0];
              }),
              last: ht(function (e, t) {
                return [t - 1];
              }),
              eq: ht(function (e, t, n) {
                return [0 > n ? n + t : n];
              }),
              even: ht(function (e, t) {
                var n = 0;
                for (; t > n; n += 2) e.push(n);
                return e;
              }),
              odd: ht(function (e, t) {
                var n = 1;
                for (; t > n; n += 2) e.push(n);
                return e;
              }),
              lt: ht(function (e, t, n) {
                var r = 0 > n ? n + t : n;
                for (; --r >= 0; ) e.push(r);
                return e;
              }),
              gt: ht(function (e, t, n) {
                var r = 0 > n ? n + t : n;
                for (; t > ++r; ) e.push(r);
                return e;
              }),
            },
          }),
        (o.pseudos.nth = o.pseudos.eq);
      for (n in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
        o.pseudos[n] = ft(n);
      for (n in { submit: !0, reset: !0 }) o.pseudos[n] = dt(n);
      function gt() {}
      (gt.prototype = o.filters = o.pseudos), (o.setFilters = new gt());
      function mt(e, t) {
        var n,
          r,
          i,
          a,
          s,
          l,
          u,
          c = k[e + " "];
        if (c) return t ? 0 : c.slice(0);
        (s = e), (l = []), (u = o.preFilter);
        while (s) {
          (!n || (r = X.exec(s))) &&
            (r && (s = s.slice(r[0].length) || s), l.push((i = []))),
            (n = !1),
            (r = U.exec(s)) &&
              ((n = r.shift()),
              i.push({ value: n, type: r[0].replace(z, " ") }),
              (s = s.slice(n.length)));
          for (a in o.filter)
            !(r = Q[a].exec(s)) ||
              (u[a] && !(r = u[a](r))) ||
              ((n = r.shift()),
              i.push({ value: n, type: a, matches: r }),
              (s = s.slice(n.length)));
          if (!n) break;
        }
        return t ? s.length : s ? at.error(e) : k(e, l).slice(0);
      }
      function yt(e) {
        var t = 0,
          n = e.length,
          r = "";
        for (; n > t; t++) r += e[t].value;
        return r;
      }
      function vt(e, t, n) {
        var r = t.dir,
          o = n && "parentNode" === r,
          a = C++;
        return t.first
          ? function (t, n, i) {
              while ((t = t[r])) if (1 === t.nodeType || o) return e(t, n, i);
            }
          : function (t, n, s) {
              var l,
                u,
                c,
                p = T + " " + a;
              if (s) {
                while ((t = t[r]))
                  if ((1 === t.nodeType || o) && e(t, n, s)) return !0;
              } else
                while ((t = t[r]))
                  if (1 === t.nodeType || o)
                    if (((c = t[b] || (t[b] = {})), (u = c[r]) && u[0] === p)) {
                      if ((l = u[1]) === !0 || l === i) return l === !0;
                    } else if (
                      ((u = c[r] = [p]), (u[1] = e(t, n, s) || i), u[1] === !0)
                    )
                      return !0;
            };
      }
      function bt(e) {
        return e.length > 1
          ? function (t, n, r) {
              var i = e.length;
              while (i--) if (!e[i](t, n, r)) return !1;
              return !0;
            }
          : e[0];
      }
      function xt(e, t, n, r, i) {
        var o,
          a = [],
          s = 0,
          l = e.length,
          u = null != t;
        for (; l > s; s++)
          (o = e[s]) && (!n || n(o, r, i)) && (a.push(o), u && t.push(s));
        return a;
      }
      function wt(e, t, n, r, i, o) {
        return (
          r && !r[b] && (r = wt(r)),
          i && !i[b] && (i = wt(i, o)),
          lt(function (o, a, s, l) {
            var u,
              c,
              p,
              f = [],
              d = [],
              h = a.length,
              g = o || Nt(t || "*", s.nodeType ? [s] : s, []),
              m = !e || (!o && t) ? g : xt(g, f, e, s, l),
              y = n ? (i || (o ? e : h || r) ? [] : a) : m;
            if ((n && n(m, y, s, l), r)) {
              (u = xt(y, d)), r(u, [], s, l), (c = u.length);
              while (c--) (p = u[c]) && (y[d[c]] = !(m[d[c]] = p));
            }
            if (o) {
              if (i || e) {
                if (i) {
                  (u = []), (c = y.length);
                  while (c--) (p = y[c]) && u.push((m[c] = p));
                  i(null, (y = []), u, l);
                }
                c = y.length;
                while (c--)
                  (p = y[c]) &&
                    (u = i ? F.call(o, p) : f[c]) > -1 &&
                    (o[u] = !(a[u] = p));
              }
            } else (y = xt(y === a ? y.splice(h, y.length) : y)), i ? i(null, a, y, l) : M.apply(a, y);
          })
        );
      }
      function Tt(e) {
        var t,
          n,
          r,
          i = e.length,
          a = o.relative[e[0].type],
          s = a || o.relative[" "],
          l = a ? 1 : 0,
          c = vt(
            function (e) {
              return e === t;
            },
            s,
            !0
          ),
          p = vt(
            function (e) {
              return F.call(t, e) > -1;
            },
            s,
            !0
          ),
          f = [
            function (e, n, r) {
              return (
                (!a && (r || n !== u)) ||
                ((t = n).nodeType ? c(e, n, r) : p(e, n, r))
              );
            },
          ];
        for (; i > l; l++)
          if ((n = o.relative[e[l].type])) f = [vt(bt(f), n)];
          else {
            if (((n = o.filter[e[l].type].apply(null, e[l].matches)), n[b])) {
              for (r = ++l; i > r; r++) if (o.relative[e[r].type]) break;
              return wt(
                l > 1 && bt(f),
                l > 1 &&
                  yt(
                    e
                      .slice(0, l - 1)
                      .concat({ value: " " === e[l - 2].type ? "*" : "" })
                  ).replace(z, "$1"),
                n,
                r > l && Tt(e.slice(l, r)),
                i > r && Tt((e = e.slice(r))),
                i > r && yt(e)
              );
            }
            f.push(n);
          }
        return bt(f);
      }
      function Ct(e, t) {
        var n = 0,
          r = t.length > 0,
          a = e.length > 0,
          s = function (s, l, c, p, d) {
            var h,
              g,
              m,
              y = [],
              v = 0,
              b = "0",
              x = s && [],
              w = null != d,
              C = u,
              N = s || (a && o.find.TAG("*", (d && l.parentNode) || l)),
              k = (T += null == C ? 1 : Math.random() || 0.1);
            for (w && ((u = l !== f && l), (i = n)); null != (h = N[b]); b++) {
              if (a && h) {
                g = 0;
                while ((m = e[g++]))
                  if (m(h, l, c)) {
                    p.push(h);
                    break;
                  }
                w && ((T = k), (i = ++n));
              }
              r && ((h = !m && h) && v--, s && x.push(h));
            }
            if (((v += b), r && b !== v)) {
              g = 0;
              while ((m = t[g++])) m(x, y, l, c);
              if (s) {
                if (v > 0) while (b--) x[b] || y[b] || (y[b] = q.call(p));
                y = xt(y);
              }
              M.apply(p, y),
                w && !s && y.length > 0 && v + t.length > 1 && at.uniqueSort(p);
            }
            return w && ((T = k), (u = C)), x;
          };
        return r ? lt(s) : s;
      }
      l = at.compile = function (e, t) {
        var n,
          r = [],
          i = [],
          o = E[e + " "];
        if (!o) {
          t || (t = mt(e)), (n = t.length);
          while (n--) (o = Tt(t[n])), o[b] ? r.push(o) : i.push(o);
          o = E(e, Ct(i, r));
        }
        return o;
      };
      function Nt(e, t, n) {
        var r = 0,
          i = t.length;
        for (; i > r; r++) at(e, t[r], n);
        return n;
      }
      function kt(e, t, n, i) {
        var a,
          s,
          u,
          c,
          p,
          f = mt(e);
        if (!i && 1 === f.length) {
          if (
            ((s = f[0] = f[0].slice(0)),
            s.length > 2 &&
              "ID" === (u = s[0]).type &&
              r.getById &&
              9 === t.nodeType &&
              h &&
              o.relative[s[1].type])
          ) {
            if (
              ((t = (o.find.ID(u.matches[0].replace(rt, it), t) || [])[0]), !t)
            )
              return n;
            e = e.slice(s.shift().value.length);
          }
          a = Q.needsContext.test(e) ? 0 : s.length;
          while (a--) {
            if (((u = s[a]), o.relative[(c = u.type)])) break;
            if (
              (p = o.find[c]) &&
              (i = p(
                u.matches[0].replace(rt, it),
                (V.test(s[0].type) && t.parentNode) || t
              ))
            ) {
              if ((s.splice(a, 1), (e = i.length && yt(s)), !e))
                return M.apply(n, i), n;
              break;
            }
          }
        }
        return l(e, f)(i, t, !h, n, V.test(e)), n;
      }
      (r.sortStable = b.split("").sort(A).join("") === b),
        (r.detectDuplicates = S),
        p(),
        (r.sortDetached = ut(function (e) {
          return 1 & e.compareDocumentPosition(f.createElement("div"));
        })),
        ut(function (e) {
          return (
            (e.innerHTML = "<a href='#'></a>"),
            "#" === e.firstChild.getAttribute("href")
          );
        }) ||
          ct("type|href|height|width", function (e, n, r) {
            return r
              ? t
              : e.getAttribute(n, "type" === n.toLowerCase() ? 1 : 2);
          }),
        (r.attributes &&
          ut(function (e) {
            return (
              (e.innerHTML = "<input/>"),
              e.firstChild.setAttribute("value", ""),
              "" === e.firstChild.getAttribute("value")
            );
          })) ||
          ct("value", function (e, n, r) {
            return r || "input" !== e.nodeName.toLowerCase()
              ? t
              : e.defaultValue;
          }),
        ut(function (e) {
          return null == e.getAttribute("disabled");
        }) ||
          ct(B, function (e, n, r) {
            var i;
            return r
              ? t
              : (i = e.getAttributeNode(n)) && i.specified
              ? i.value
              : e[n] === !0
              ? n.toLowerCase()
              : null;
          }),
        (x.find = at),
        (x.expr = at.selectors),
        (x.expr[":"] = x.expr.pseudos),
        (x.unique = at.uniqueSort),
        (x.text = at.getText),
        (x.isXMLDoc = at.isXML),
        (x.contains = at.contains);
    })(e);
  var O = {};
  function F(e) {
    var t = (O[e] = {});
    return (
      x.each(e.match(T) || [], function (e, n) {
        t[n] = !0;
      }),
      t
    );
  }
  (x.Callbacks = function (e) {
    e = "string" == typeof e ? O[e] || F(e) : x.extend({}, e);
    var n,
      r,
      i,
      o,
      a,
      s,
      l = [],
      u = !e.once && [],
      c = function (t) {
        for (
          r = e.memory && t, i = !0, a = s || 0, s = 0, o = l.length, n = !0;
          l && o > a;
          a++
        )
          if (l[a].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
            r = !1;
            break;
          }
        (n = !1),
          l && (u ? u.length && c(u.shift()) : r ? (l = []) : p.disable());
      },
      p = {
        add: function () {
          if (l) {
            var t = l.length;
            (function i(t) {
              x.each(t, function (t, n) {
                var r = x.type(n);
                "function" === r
                  ? (e.unique && p.has(n)) || l.push(n)
                  : n && n.length && "string" !== r && i(n);
              });
            })(arguments),
              n ? (o = l.length) : r && ((s = t), c(r));
          }
          return this;
        },
        remove: function () {
          return (
            l &&
              x.each(arguments, function (e, t) {
                var r;
                while ((r = x.inArray(t, l, r)) > -1)
                  l.splice(r, 1), n && (o >= r && o--, a >= r && a--);
              }),
            this
          );
        },
        has: function (e) {
          return e ? x.inArray(e, l) > -1 : !(!l || !l.length);
        },
        empty: function () {
          return (l = []), (o = 0), this;
        },
        disable: function () {
          return (l = u = r = t), this;
        },
        disabled: function () {
          return !l;
        },
        lock: function () {
          return (u = t), r || p.disable(), this;
        },
        locked: function () {
          return !u;
        },
        fireWith: function (e, t) {
          return (
            !l ||
              (i && !u) ||
              ((t = t || []),
              (t = [e, t.slice ? t.slice() : t]),
              n ? u.push(t) : c(t)),
            this
          );
        },
        fire: function () {
          return p.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!i;
        },
      };
    return p;
  }),
    x.extend({
      Deferred: function (e) {
        var t = [
            ["resolve", "done", x.Callbacks("once memory"), "resolved"],
            ["reject", "fail", x.Callbacks("once memory"), "rejected"],
            ["notify", "progress", x.Callbacks("memory")],
          ],
          n = "pending",
          r = {
            state: function () {
              return n;
            },
            always: function () {
              return i.done(arguments).fail(arguments), this;
            },
            then: function () {
              var e = arguments;
              return x
                .Deferred(function (n) {
                  x.each(t, function (t, o) {
                    var a = o[0],
                      s = x.isFunction(e[t]) && e[t];
                    i[o[1]](function () {
                      var e = s && s.apply(this, arguments);
                      e && x.isFunction(e.promise)
                        ? e
                            .promise()
                            .done(n.resolve)
                            .fail(n.reject)
                            .progress(n.notify)
                        : n[a + "With"](
                            this === r ? n.promise() : this,
                            s ? [e] : arguments
                          );
                    });
                  }),
                    (e = null);
                })
                .promise();
            },
            promise: function (e) {
              return null != e ? x.extend(e, r) : r;
            },
          },
          i = {};
        return (
          (r.pipe = r.then),
          x.each(t, function (e, o) {
            var a = o[2],
              s = o[3];
            (r[o[1]] = a.add),
              s &&
                a.add(
                  function () {
                    n = s;
                  },
                  t[1 ^ e][2].disable,
                  t[2][2].lock
                ),
              (i[o[0]] = function () {
                return i[o[0] + "With"](this === i ? r : this, arguments), this;
              }),
              (i[o[0] + "With"] = a.fireWith);
          }),
          r.promise(i),
          e && e.call(i, i),
          i
        );
      },
      when: function (e) {
        var t = 0,
          n = g.call(arguments),
          r = n.length,
          i = 1 !== r || (e && x.isFunction(e.promise)) ? r : 0,
          o = 1 === i ? e : x.Deferred(),
          a = function (e, t, n) {
            return function (r) {
              (t[e] = this),
                (n[e] = arguments.length > 1 ? g.call(arguments) : r),
                n === s ? o.notifyWith(t, n) : --i || o.resolveWith(t, n);
            };
          },
          s,
          l,
          u;
        if (r > 1)
          for (s = Array(r), l = Array(r), u = Array(r); r > t; t++)
            n[t] && x.isFunction(n[t].promise)
              ? n[t]
                  .promise()
                  .done(a(t, u, n))
                  .fail(o.reject)
                  .progress(a(t, l, s))
              : --i;
        return i || o.resolveWith(u, n), o.promise();
      },
    }),
    (x.support = (function (t) {
      var n,
        r,
        o,
        s,
        l,
        u,
        c,
        p,
        f,
        d = a.createElement("div");
      if (
        (d.setAttribute("className", "t"),
        (d.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (n = d.getElementsByTagName("*") || []),
        (r = d.getElementsByTagName("a")[0]),
        !r || !r.style || !n.length)
      )
        return t;
      (s = a.createElement("select")),
        (u = s.appendChild(a.createElement("option"))),
        (o = d.getElementsByTagName("input")[0]),
        (r.style.cssText = "top:1px;float:left;opacity:.5"),
        (t.getSetAttribute = "t" !== d.className),
        (t.leadingWhitespace = 3 === d.firstChild.nodeType),
        (t.tbody = !d.getElementsByTagName("tbody").length),
        (t.htmlSerialize = !!d.getElementsByTagName("link").length),
        (t.style = /top/.test(r.getAttribute("style"))),
        (t.hrefNormalized = "/a" === r.getAttribute("href")),
        (t.opacity = /^0.5/.test(r.style.opacity)),
        (t.cssFloat = !!r.style.cssFloat),
        (t.checkOn = !!o.value),
        (t.optSelected = u.selected),
        (t.enctype = !!a.createElement("form").enctype),
        (t.html5Clone =
          "<:nav></:nav>" !== a.createElement("nav").cloneNode(!0).outerHTML),
        (t.inlineBlockNeedsLayout = !1),
        (t.shrinkWrapBlocks = !1),
        (t.pixelPosition = !1),
        (t.deleteExpando = !0),
        (t.noCloneEvent = !0),
        (t.reliableMarginRight = !0),
        (t.boxSizingReliable = !0),
        (o.checked = !0),
        (t.noCloneChecked = o.cloneNode(!0).checked),
        (s.disabled = !0),
        (t.optDisabled = !u.disabled);
      try {
        delete d.test;
      } catch (h) {
        t.deleteExpando = !1;
      }
      (o = a.createElement("input")),
        o.setAttribute("value", ""),
        (t.input = "" === o.getAttribute("value")),
        (o.value = "t"),
        o.setAttribute("type", "radio"),
        (t.radioValue = "t" === o.value),
        o.setAttribute("checked", "t"),
        o.setAttribute("name", "t"),
        (l = a.createDocumentFragment()),
        l.appendChild(o),
        (t.appendChecked = o.checked),
        (t.checkClone = l.cloneNode(!0).cloneNode(!0).lastChild.checked),
        d.attachEvent &&
          (d.attachEvent("onclick", function () {
            t.noCloneEvent = !1;
          }),
          d.cloneNode(!0).click());
      for (f in { submit: !0, change: !0, focusin: !0 })
        d.setAttribute((c = "on" + f), "t"),
          (t[f + "Bubbles"] = c in e || d.attributes[c].expando === !1);
      (d.style.backgroundClip = "content-box"),
        (d.cloneNode(!0).style.backgroundClip = ""),
        (t.clearCloneStyle = "content-box" === d.style.backgroundClip);
      for (f in x(t)) break;
      return (
        (t.ownLast = "0" !== f),
        x(function () {
          var n,
            r,
            o,
            s =
              "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
            l = a.getElementsByTagName("body")[0];
          l &&
            ((n = a.createElement("div")),
            (n.style.cssText =
              "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px"),
            l.appendChild(n).appendChild(d),
            (d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
            (o = d.getElementsByTagName("td")),
            (o[0].style.cssText = "padding:0;margin:0;border:0;display:none"),
            (p = 0 === o[0].offsetHeight),
            (o[0].style.display = ""),
            (o[1].style.display = "none"),
            (t.reliableHiddenOffsets = p && 0 === o[0].offsetHeight),
            (d.innerHTML = ""),
            (d.style.cssText =
              "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;"),
            x.swap(l, null != l.style.zoom ? { zoom: 1 } : {}, function () {
              t.boxSizing = 4 === d.offsetWidth;
            }),
            e.getComputedStyle &&
              ((t.pixelPosition =
                "1%" !== (e.getComputedStyle(d, null) || {}).top),
              (t.boxSizingReliable =
                "4px" ===
                (e.getComputedStyle(d, null) || { width: "4px" }).width),
              (r = d.appendChild(a.createElement("div"))),
              (r.style.cssText = d.style.cssText = s),
              (r.style.marginRight = r.style.width = "0"),
              (d.style.width = "1px"),
              (t.reliableMarginRight = !parseFloat(
                (e.getComputedStyle(r, null) || {}).marginRight
              ))),
            typeof d.style.zoom !== i &&
              ((d.innerHTML = ""),
              (d.style.cssText =
                s + "width:1px;padding:1px;display:inline;zoom:1"),
              (t.inlineBlockNeedsLayout = 3 === d.offsetWidth),
              (d.style.display = "block"),
              (d.innerHTML = "<div></div>"),
              (d.firstChild.style.width = "5px"),
              (t.shrinkWrapBlocks = 3 !== d.offsetWidth),
              t.inlineBlockNeedsLayout && (l.style.zoom = 1)),
            l.removeChild(n),
            (n = d = o = r = null));
        }),
        (n = s = l = u = r = o = null),
        t
      );
    })({}));
  var B = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    P = /([A-Z])/g;
  function R(e, n, r, i) {
    if (x.acceptData(e)) {
      var o,
        a,
        s = x.expando,
        l = e.nodeType,
        u = l ? x.cache : e,
        c = l ? e[s] : e[s] && s;
      if ((c && u[c] && (i || u[c].data)) || r !== t || "string" != typeof n)
        return (
          c || (c = l ? (e[s] = p.pop() || x.guid++) : s),
          u[c] || (u[c] = l ? {} : { toJSON: x.noop }),
          ("object" == typeof n || "function" == typeof n) &&
            (i
              ? (u[c] = x.extend(u[c], n))
              : (u[c].data = x.extend(u[c].data, n))),
          (a = u[c]),
          i || (a.data || (a.data = {}), (a = a.data)),
          r !== t && (a[x.camelCase(n)] = r),
          "string" == typeof n
            ? ((o = a[n]), null == o && (o = a[x.camelCase(n)]))
            : (o = a),
          o
        );
    }
  }
  function W(e, t, n) {
    if (x.acceptData(e)) {
      var r,
        i,
        o = e.nodeType,
        a = o ? x.cache : e,
        s = o ? e[x.expando] : x.expando;
      if (a[s]) {
        if (t && (r = n ? a[s] : a[s].data)) {
          x.isArray(t)
            ? (t = t.concat(x.map(t, x.camelCase)))
            : t in r
            ? (t = [t])
            : ((t = x.camelCase(t)), (t = t in r ? [t] : t.split(" "))),
            (i = t.length);
          while (i--) delete r[t[i]];
          if (n ? !I(r) : !x.isEmptyObject(r)) return;
        }
        (n || (delete a[s].data, I(a[s]))) &&
          (o
            ? x.cleanData([e], !0)
            : x.support.deleteExpando || a != a.window
            ? delete a[s]
            : (a[s] = null));
      }
    }
  }
  x.extend({
    cache: {},
    noData: {
      applet: !0,
      embed: !0,
      object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
    },
    hasData: function (e) {
      return (
        (e = e.nodeType ? x.cache[e[x.expando]] : e[x.expando]), !!e && !I(e)
      );
    },
    data: function (e, t, n) {
      return R(e, t, n);
    },
    removeData: function (e, t) {
      return W(e, t);
    },
    _data: function (e, t, n) {
      return R(e, t, n, !0);
    },
    _removeData: function (e, t) {
      return W(e, t, !0);
    },
    acceptData: function (e) {
      if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
      var t = e.nodeName && x.noData[e.nodeName.toLowerCase()];
      return !t || (t !== !0 && e.getAttribute("classid") === t);
    },
  }),
    x.fn.extend({
      data: function (e, n) {
        var r,
          i,
          o = null,
          a = 0,
          s = this[0];
        if (e === t) {
          if (
            this.length &&
            ((o = x.data(s)), 1 === s.nodeType && !x._data(s, "parsedAttrs"))
          ) {
            for (r = s.attributes; r.length > a; a++)
              (i = r[a].name),
                0 === i.indexOf("data-") &&
                  ((i = x.camelCase(i.slice(5))), $(s, i, o[i]));
            x._data(s, "parsedAttrs", !0);
          }
          return o;
        }
        return "object" == typeof e
          ? this.each(function () {
              x.data(this, e);
            })
          : arguments.length > 1
          ? this.each(function () {
              x.data(this, e, n);
            })
          : s
          ? $(s, e, x.data(s, e))
          : null;
      },
      removeData: function (e) {
        return this.each(function () {
          x.removeData(this, e);
        });
      },
    });
  function $(e, n, r) {
    if (r === t && 1 === e.nodeType) {
      var i = "data-" + n.replace(P, "-$1").toLowerCase();
      if (((r = e.getAttribute(i)), "string" == typeof r)) {
        try {
          r =
            "true" === r
              ? !0
              : "false" === r
              ? !1
              : "null" === r
              ? null
              : +r + "" === r
              ? +r
              : B.test(r)
              ? x.parseJSON(r)
              : r;
        } catch (o) {}
        x.data(e, n, r);
      } else r = t;
    }
    return r;
  }
  function I(e) {
    var t;
    for (t in e)
      if (("data" !== t || !x.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
    return !0;
  }
  x.extend({
    queue: function (e, n, r) {
      var i;
      return e
        ? ((n = (n || "fx") + "queue"),
          (i = x._data(e, n)),
          r &&
            (!i || x.isArray(r)
              ? (i = x._data(e, n, x.makeArray(r)))
              : i.push(r)),
          i || [])
        : t;
    },
    dequeue: function (e, t) {
      t = t || "fx";
      var n = x.queue(e, t),
        r = n.length,
        i = n.shift(),
        o = x._queueHooks(e, t),
        a = function () {
          x.dequeue(e, t);
        };
      "inprogress" === i && ((i = n.shift()), r--),
        i &&
          ("fx" === t && n.unshift("inprogress"),
          delete o.stop,
          i.call(e, a, o)),
        !r && o && o.empty.fire();
    },
    _queueHooks: function (e, t) {
      var n = t + "queueHooks";
      return (
        x._data(e, n) ||
        x._data(e, n, {
          empty: x.Callbacks("once memory").add(function () {
            x._removeData(e, t + "queue"), x._removeData(e, n);
          }),
        })
      );
    },
  }),
    x.fn.extend({
      queue: function (e, n) {
        var r = 2;
        return (
          "string" != typeof e && ((n = e), (e = "fx"), r--),
          r > arguments.length
            ? x.queue(this[0], e)
            : n === t
            ? this
            : this.each(function () {
                var t = x.queue(this, e, n);
                x._queueHooks(this, e),
                  "fx" === e && "inprogress" !== t[0] && x.dequeue(this, e);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          x.dequeue(this, e);
        });
      },
      delay: function (e, t) {
        return (
          (e = x.fx ? x.fx.speeds[e] || e : e),
          (t = t || "fx"),
          this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
              clearTimeout(r);
            };
          })
        );
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, n) {
        var r,
          i = 1,
          o = x.Deferred(),
          a = this,
          s = this.length,
          l = function () {
            --i || o.resolveWith(a, [a]);
          };
        "string" != typeof e && ((n = e), (e = t)), (e = e || "fx");
        while (s--)
          (r = x._data(a[s], e + "queueHooks")),
            r && r.empty && (i++, r.empty.add(l));
        return l(), o.promise(n);
      },
    });
  var z,
    X,
    U = /[\t\r\n\f]/g,
    V = /\r/g,
    Y = /^(?:input|select|textarea|button|object)$/i,
    J = /^(?:a|area)$/i,
    G = /^(?:checked|selected)$/i,
    Q = x.support.getSetAttribute,
    K = x.support.input;
  x.fn.extend({
    attr: function (e, t) {
      return x.access(this, x.attr, e, t, arguments.length > 1);
    },
    removeAttr: function (e) {
      return this.each(function () {
        x.removeAttr(this, e);
      });
    },
    prop: function (e, t) {
      return x.access(this, x.prop, e, t, arguments.length > 1);
    },
    removeProp: function (e) {
      return (
        (e = x.propFix[e] || e),
        this.each(function () {
          try {
            (this[e] = t), delete this[e];
          } catch (n) {}
        })
      );
    },
    addClass: function (e) {
      var t,
        n,
        r,
        i,
        o,
        a = 0,
        s = this.length,
        l = "string" == typeof e && e;
      if (x.isFunction(e))
        return this.each(function (t) {
          x(this).addClass(e.call(this, t, this.className));
        });
      if (l)
        for (t = (e || "").match(T) || []; s > a; a++)
          if (
            ((n = this[a]),
            (r =
              1 === n.nodeType &&
              (n.className ? (" " + n.className + " ").replace(U, " ") : " ")))
          ) {
            o = 0;
            while ((i = t[o++])) 0 > r.indexOf(" " + i + " ") && (r += i + " ");
            n.className = x.trim(r);
          }
      return this;
    },
    removeClass: function (e) {
      var t,
        n,
        r,
        i,
        o,
        a = 0,
        s = this.length,
        l = 0 === arguments.length || ("string" == typeof e && e);
      if (x.isFunction(e))
        return this.each(function (t) {
          x(this).removeClass(e.call(this, t, this.className));
        });
      if (l)
        for (t = (e || "").match(T) || []; s > a; a++)
          if (
            ((n = this[a]),
            (r =
              1 === n.nodeType &&
              (n.className ? (" " + n.className + " ").replace(U, " ") : "")))
          ) {
            o = 0;
            while ((i = t[o++]))
              while (r.indexOf(" " + i + " ") >= 0)
                r = r.replace(" " + i + " ", " ");
            n.className = e ? x.trim(r) : "";
          }
      return this;
    },
    toggleClass: function (e, t) {
      var n = typeof e;
      return "boolean" == typeof t && "string" === n
        ? t
          ? this.addClass(e)
          : this.removeClass(e)
        : x.isFunction(e)
        ? this.each(function (n) {
            x(this).toggleClass(e.call(this, n, this.className, t), t);
          })
        : this.each(function () {
            if ("string" === n) {
              var t,
                r = 0,
                o = x(this),
                a = e.match(T) || [];
              while ((t = a[r++]))
                o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
            } else (n === i || "boolean" === n) && (this.className && x._data(this, "__className__", this.className), (this.className = this.className || e === !1 ? "" : x._data(this, "__className__") || ""));
          });
    },
    hasClass: function (e) {
      var t = " " + e + " ",
        n = 0,
        r = this.length;
      for (; r > n; n++)
        if (
          1 === this[n].nodeType &&
          (" " + this[n].className + " ").replace(U, " ").indexOf(t) >= 0
        )
          return !0;
      return !1;
    },
    val: function (e) {
      var n,
        r,
        i,
        o = this[0];
      {
        if (arguments.length)
          return (
            (i = x.isFunction(e)),
            this.each(function (n) {
              var o;
              1 === this.nodeType &&
                ((o = i ? e.call(this, n, x(this).val()) : e),
                null == o
                  ? (o = "")
                  : "number" == typeof o
                  ? (o += "")
                  : x.isArray(o) &&
                    (o = x.map(o, function (e) {
                      return null == e ? "" : e + "";
                    })),
                (r =
                  x.valHooks[this.type] ||
                  x.valHooks[this.nodeName.toLowerCase()]),
                (r && "set" in r && r.set(this, o, "value") !== t) ||
                  (this.value = o));
            })
          );
        if (o)
          return (
            (r = x.valHooks[o.type] || x.valHooks[o.nodeName.toLowerCase()]),
            r && "get" in r && (n = r.get(o, "value")) !== t
              ? n
              : ((n = o.value),
                "string" == typeof n ? n.replace(V, "") : null == n ? "" : n)
          );
      }
    },
  }),
    x.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = x.find.attr(e, "value");
            return null != t ? t : e.text;
          },
        },
        select: {
          get: function (e) {
            var t,
              n,
              r = e.options,
              i = e.selectedIndex,
              o = "select-one" === e.type || 0 > i,
              a = o ? null : [],
              s = o ? i + 1 : r.length,
              l = 0 > i ? s : o ? i : 0;
            for (; s > l; l++)
              if (
                ((n = r[l]),
                !(
                  (!n.selected && l !== i) ||
                  (x.support.optDisabled
                    ? n.disabled
                    : null !== n.getAttribute("disabled")) ||
                  (n.parentNode.disabled &&
                    x.nodeName(n.parentNode, "optgroup"))
                ))
              ) {
                if (((t = x(n).val()), o)) return t;
                a.push(t);
              }
            return a;
          },
          set: function (e, t) {
            var n,
              r,
              i = e.options,
              o = x.makeArray(t),
              a = i.length;
            while (a--)
              (r = i[a]),
                (r.selected = x.inArray(x(r).val(), o) >= 0) && (n = !0);
            return n || (e.selectedIndex = -1), o;
          },
        },
      },
      attr: function (e, n, r) {
        var o,
          a,
          s = e.nodeType;
        if (e && 3 !== s && 8 !== s && 2 !== s)
          return typeof e.getAttribute === i
            ? x.prop(e, n, r)
            : ((1 === s && x.isXMLDoc(e)) ||
                ((n = n.toLowerCase()),
                (o = x.attrHooks[n] || (x.expr.match.bool.test(n) ? X : z))),
              r === t
                ? o && "get" in o && null !== (a = o.get(e, n))
                  ? a
                  : ((a = x.find.attr(e, n)), null == a ? t : a)
                : null !== r
                ? o && "set" in o && (a = o.set(e, r, n)) !== t
                  ? a
                  : (e.setAttribute(n, r + ""), r)
                : (x.removeAttr(e, n), t));
      },
      removeAttr: function (e, t) {
        var n,
          r,
          i = 0,
          o = t && t.match(T);
        if (o && 1 === e.nodeType)
          while ((n = o[i++]))
            (r = x.propFix[n] || n),
              x.expr.match.bool.test(n)
                ? (K && Q) || !G.test(n)
                  ? (e[r] = !1)
                  : (e[x.camelCase("default-" + n)] = e[r] = !1)
                : x.attr(e, n, ""),
              e.removeAttribute(Q ? n : r);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (
              !x.support.radioValue &&
              "radio" === t &&
              x.nodeName(e, "input")
            ) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          },
        },
      },
      propFix: { for: "htmlFor", class: "className" },
      prop: function (e, n, r) {
        var i,
          o,
          a,
          s = e.nodeType;
        if (e && 3 !== s && 8 !== s && 2 !== s)
          return (
            (a = 1 !== s || !x.isXMLDoc(e)),
            a && ((n = x.propFix[n] || n), (o = x.propHooks[n])),
            r !== t
              ? o && "set" in o && (i = o.set(e, r, n)) !== t
                ? i
                : (e[n] = r)
              : o && "get" in o && null !== (i = o.get(e, n))
              ? i
              : e[n]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = x.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : Y.test(e.nodeName) || (J.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
    }),
    (X = {
      set: function (e, t, n) {
        return (
          t === !1
            ? x.removeAttr(e, n)
            : (K && Q) || !G.test(n)
            ? e.setAttribute((!Q && x.propFix[n]) || n, n)
            : (e[x.camelCase("default-" + n)] = e[n] = !0),
          n
        );
      },
    }),
    x.each(x.expr.match.bool.source.match(/\w+/g), function (e, n) {
      var r = x.expr.attrHandle[n] || x.find.attr;
      x.expr.attrHandle[n] =
        (K && Q) || !G.test(n)
          ? function (e, n, i) {
              var o = x.expr.attrHandle[n],
                a = i
                  ? t
                  : (x.expr.attrHandle[n] = t) != r(e, n, i)
                  ? n.toLowerCase()
                  : null;
              return (x.expr.attrHandle[n] = o), a;
            }
          : function (e, n, r) {
              return r
                ? t
                : e[x.camelCase("default-" + n)]
                ? n.toLowerCase()
                : null;
            };
    }),
    (K && Q) ||
      (x.attrHooks.value = {
        set: function (e, n, r) {
          return x.nodeName(e, "input")
            ? ((e.defaultValue = n), t)
            : z && z.set(e, n, r);
        },
      }),
    Q ||
      ((z = {
        set: function (e, n, r) {
          var i = e.getAttributeNode(r);
          return (
            i || e.setAttributeNode((i = e.ownerDocument.createAttribute(r))),
            (i.value = n += ""),
            "value" === r || n === e.getAttribute(r) ? n : t
          );
        },
      }),
      (x.expr.attrHandle.id =
        x.expr.attrHandle.name =
        x.expr.attrHandle.coords =
          function (e, n, r) {
            var i;
            return r
              ? t
              : (i = e.getAttributeNode(n)) && "" !== i.value
              ? i.value
              : null;
          }),
      (x.valHooks.button = {
        get: function (e, n) {
          var r = e.getAttributeNode(n);
          return r && r.specified ? r.value : t;
        },
        set: z.set,
      }),
      (x.attrHooks.contenteditable = {
        set: function (e, t, n) {
          z.set(e, "" === t ? !1 : t, n);
        },
      }),
      x.each(["width", "height"], function (e, n) {
        x.attrHooks[n] = {
          set: function (e, r) {
            return "" === r ? (e.setAttribute(n, "auto"), r) : t;
          },
        };
      })),
    x.support.hrefNormalized ||
      x.each(["href", "src"], function (e, t) {
        x.propHooks[t] = {
          get: function (e) {
            return e.getAttribute(t, 4);
          },
        };
      }),
    x.support.style ||
      (x.attrHooks.style = {
        get: function (e) {
          return e.style.cssText || t;
        },
        set: function (e, t) {
          return (e.style.cssText = t + "");
        },
      }),
    x.support.optSelected ||
      (x.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return (
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
            null
          );
        },
      }),
    x.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        x.propFix[this.toLowerCase()] = this;
      }
    ),
    x.support.enctype || (x.propFix.enctype = "encoding"),
    x.each(["radio", "checkbox"], function () {
      (x.valHooks[this] = {
        set: function (e, n) {
          return x.isArray(n) ? (e.checked = x.inArray(x(e).val(), n) >= 0) : t;
        },
      }),
        x.support.checkOn ||
          (x.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          });
    });
  var Z = /^(?:input|select|textarea)$/i,
    et = /^key/,
    tt = /^(?:mouse|contextmenu)|click/,
    nt = /^(?:focusinfocus|focusoutblur)$/,
    rt = /^([^.]*)(?:\.(.+)|)$/;
  function it() {
    return !0;
  }
  function ot() {
    return !1;
  }
  function at() {
    try {
      return a.activeElement;
    } catch (e) {}
  }
  (x.event = {
    global: {},
    add: function (e, n, r, o, a) {
      var s,
        l,
        u,
        c,
        p,
        f,
        d,
        h,
        g,
        m,
        y,
        v = x._data(e);
      if (v) {
        r.handler && ((c = r), (r = c.handler), (a = c.selector)),
          r.guid || (r.guid = x.guid++),
          (l = v.events) || (l = v.events = {}),
          (f = v.handle) ||
            ((f = v.handle =
              function (e) {
                return typeof x === i || (e && x.event.triggered === e.type)
                  ? t
                  : x.event.dispatch.apply(f.elem, arguments);
              }),
            (f.elem = e)),
          (n = (n || "").match(T) || [""]),
          (u = n.length);
        while (u--)
          (s = rt.exec(n[u]) || []),
            (g = y = s[1]),
            (m = (s[2] || "").split(".").sort()),
            g &&
              ((p = x.event.special[g] || {}),
              (g = (a ? p.delegateType : p.bindType) || g),
              (p = x.event.special[g] || {}),
              (d = x.extend(
                {
                  type: g,
                  origType: y,
                  data: o,
                  handler: r,
                  guid: r.guid,
                  selector: a,
                  needsContext: a && x.expr.match.needsContext.test(a),
                  namespace: m.join("."),
                },
                c
              )),
              (h = l[g]) ||
                ((h = l[g] = []),
                (h.delegateCount = 0),
                (p.setup && p.setup.call(e, o, m, f) !== !1) ||
                  (e.addEventListener
                    ? e.addEventListener(g, f, !1)
                    : e.attachEvent && e.attachEvent("on" + g, f))),
              p.add &&
                (p.add.call(e, d), d.handler.guid || (d.handler.guid = r.guid)),
              a ? h.splice(h.delegateCount++, 0, d) : h.push(d),
              (x.event.global[g] = !0));
        e = null;
      }
    },
    remove: function (e, t, n, r, i) {
      var o,
        a,
        s,
        l,
        u,
        c,
        p,
        f,
        d,
        h,
        g,
        m = x.hasData(e) && x._data(e);
      if (m && (c = m.events)) {
        (t = (t || "").match(T) || [""]), (u = t.length);
        while (u--)
          if (
            ((s = rt.exec(t[u]) || []),
            (d = g = s[1]),
            (h = (s[2] || "").split(".").sort()),
            d)
          ) {
            (p = x.event.special[d] || {}),
              (d = (r ? p.delegateType : p.bindType) || d),
              (f = c[d] || []),
              (s =
                s[2] &&
                RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")),
              (l = o = f.length);
            while (o--)
              (a = f[o]),
                (!i && g !== a.origType) ||
                  (n && n.guid !== a.guid) ||
                  (s && !s.test(a.namespace)) ||
                  (r && r !== a.selector && ("**" !== r || !a.selector)) ||
                  (f.splice(o, 1),
                  a.selector && f.delegateCount--,
                  p.remove && p.remove.call(e, a));
            l &&
              !f.length &&
              ((p.teardown && p.teardown.call(e, h, m.handle) !== !1) ||
                x.removeEvent(e, d, m.handle),
              delete c[d]);
          } else for (d in c) x.event.remove(e, d + t[u], n, r, !0);
        x.isEmptyObject(c) && (delete m.handle, x._removeData(e, "events"));
      }
    },
    trigger: function (n, r, i, o) {
      var s,
        l,
        u,
        c,
        p,
        f,
        d,
        h = [i || a],
        g = v.call(n, "type") ? n.type : n,
        m = v.call(n, "namespace") ? n.namespace.split(".") : [];
      if (
        ((u = f = i = i || a),
        3 !== i.nodeType &&
          8 !== i.nodeType &&
          !nt.test(g + x.event.triggered) &&
          (g.indexOf(".") >= 0 &&
            ((m = g.split(".")), (g = m.shift()), m.sort()),
          (l = 0 > g.indexOf(":") && "on" + g),
          (n = n[x.expando] ? n : new x.Event(g, "object" == typeof n && n)),
          (n.isTrigger = o ? 2 : 3),
          (n.namespace = m.join(".")),
          (n.namespace_re = n.namespace
            ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (n.result = t),
          n.target || (n.target = i),
          (r = null == r ? [n] : x.makeArray(r, [n])),
          (p = x.event.special[g] || {}),
          o || !p.trigger || p.trigger.apply(i, r) !== !1))
      ) {
        if (!o && !p.noBubble && !x.isWindow(i)) {
          for (
            c = p.delegateType || g, nt.test(c + g) || (u = u.parentNode);
            u;
            u = u.parentNode
          )
            h.push(u), (f = u);
          f === (i.ownerDocument || a) &&
            h.push(f.defaultView || f.parentWindow || e);
        }
        d = 0;
        while ((u = h[d++]) && !n.isPropagationStopped())
          (n.type = d > 1 ? c : p.bindType || g),
            (s = (x._data(u, "events") || {})[n.type] && x._data(u, "handle")),
            s && s.apply(u, r),
            (s = l && u[l]),
            s &&
              x.acceptData(u) &&
              s.apply &&
              s.apply(u, r) === !1 &&
              n.preventDefault();
        if (
          ((n.type = g),
          !o &&
            !n.isDefaultPrevented() &&
            (!p._default || p._default.apply(h.pop(), r) === !1) &&
            x.acceptData(i) &&
            l &&
            i[g] &&
            !x.isWindow(i))
        ) {
          (f = i[l]), f && (i[l] = null), (x.event.triggered = g);
          try {
            i[g]();
          } catch (y) {}
          (x.event.triggered = t), f && (i[l] = f);
        }
        return n.result;
      }
    },
    dispatch: function (e) {
      e = x.event.fix(e);
      var n,
        r,
        i,
        o,
        a,
        s = [],
        l = g.call(arguments),
        u = (x._data(this, "events") || {})[e.type] || [],
        c = x.event.special[e.type] || {};
      if (
        ((l[0] = e),
        (e.delegateTarget = this),
        !c.preDispatch || c.preDispatch.call(this, e) !== !1)
      ) {
        (s = x.event.handlers.call(this, e, u)), (n = 0);
        while ((o = s[n++]) && !e.isPropagationStopped()) {
          (e.currentTarget = o.elem), (a = 0);
          while ((i = o.handlers[a++]) && !e.isImmediatePropagationStopped())
            (!e.namespace_re || e.namespace_re.test(i.namespace)) &&
              ((e.handleObj = i),
              (e.data = i.data),
              (r = (
                (x.event.special[i.origType] || {}).handle || i.handler
              ).apply(o.elem, l)),
              r !== t &&
                (e.result = r) === !1 &&
                (e.preventDefault(), e.stopPropagation()));
        }
        return c.postDispatch && c.postDispatch.call(this, e), e.result;
      }
    },
    handlers: function (e, n) {
      var r,
        i,
        o,
        a,
        s = [],
        l = n.delegateCount,
        u = e.target;
      if (l && u.nodeType && (!e.button || "click" !== e.type))
        for (; u != this; u = u.parentNode || this)
          if (1 === u.nodeType && (u.disabled !== !0 || "click" !== e.type)) {
            for (o = [], a = 0; l > a; a++)
              (i = n[a]),
                (r = i.selector + " "),
                o[r] === t &&
                  (o[r] = i.needsContext
                    ? x(r, this).index(u) >= 0
                    : x.find(r, this, null, [u]).length),
                o[r] && o.push(i);
            o.length && s.push({ elem: u, handlers: o });
          }
      return n.length > l && s.push({ elem: this, handlers: n.slice(l) }), s;
    },
    fix: function (e) {
      if (e[x.expando]) return e;
      var t,
        n,
        r,
        i = e.type,
        o = e,
        s = this.fixHooks[i];
      s ||
        (this.fixHooks[i] = s =
          tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}),
        (r = s.props ? this.props.concat(s.props) : this.props),
        (e = new x.Event(o)),
        (t = r.length);
      while (t--) (n = r[t]), (e[n] = o[n]);
      return (
        e.target || (e.target = o.srcElement || a),
        3 === e.target.nodeType && (e.target = e.target.parentNode),
        (e.metaKey = !!e.metaKey),
        s.filter ? s.filter(e, o) : e
      );
    },
    props:
      "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (e, t) {
        return (
          null == e.which &&
            (e.which = null != t.charCode ? t.charCode : t.keyCode),
          e
        );
      },
    },
    mouseHooks: {
      props:
        "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
      filter: function (e, n) {
        var r,
          i,
          o,
          s = n.button,
          l = n.fromElement;
        return (
          null == e.pageX &&
            null != n.clientX &&
            ((i = e.target.ownerDocument || a),
            (o = i.documentElement),
            (r = i.body),
            (e.pageX =
              n.clientX +
              ((o && o.scrollLeft) || (r && r.scrollLeft) || 0) -
              ((o && o.clientLeft) || (r && r.clientLeft) || 0)),
            (e.pageY =
              n.clientY +
              ((o && o.scrollTop) || (r && r.scrollTop) || 0) -
              ((o && o.clientTop) || (r && r.clientTop) || 0))),
          !e.relatedTarget &&
            l &&
            (e.relatedTarget = l === e.target ? n.toElement : l),
          e.which ||
            s === t ||
            (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0),
          e
        );
      },
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== at() && this.focus)
            try {
              return this.focus(), !1;
            } catch (e) {}
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          return this === at() && this.blur ? (this.blur(), !1) : t;
        },
        delegateType: "focusout",
      },
      click: {
        trigger: function () {
          return x.nodeName(this, "input") &&
            "checkbox" === this.type &&
            this.click
            ? (this.click(), !1)
            : t;
        },
        _default: function (e) {
          return x.nodeName(e.target, "a");
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          e.result !== t && (e.originalEvent.returnValue = e.result);
        },
      },
    },
    simulate: function (e, t, n, r) {
      var i = x.extend(new x.Event(), n, {
        type: e,
        isSimulated: !0,
        originalEvent: {},
      });
      r ? x.event.trigger(i, null, t) : x.event.dispatch.call(t, i),
        i.isDefaultPrevented() && n.preventDefault();
    },
  }),
    (x.removeEvent = a.removeEventListener
      ? function (e, t, n) {
          e.removeEventListener && e.removeEventListener(t, n, !1);
        }
      : function (e, t, n) {
          var r = "on" + t;
          e.detachEvent &&
            (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n));
        }),
    (x.Event = function (e, n) {
      return this instanceof x.Event
        ? (e && e.type
            ? ((this.originalEvent = e),
              (this.type = e.type),
              (this.isDefaultPrevented =
                e.defaultPrevented ||
                e.returnValue === !1 ||
                (e.getPreventDefault && e.getPreventDefault())
                  ? it
                  : ot))
            : (this.type = e),
          n && x.extend(this, n),
          (this.timeStamp = (e && e.timeStamp) || x.now()),
          (this[x.expando] = !0),
          t)
        : new x.Event(e, n);
    }),
    (x.Event.prototype = {
      isDefaultPrevented: ot,
      isPropagationStopped: ot,
      isImmediatePropagationStopped: ot,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = it),
          e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = it),
          e &&
            (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        (this.isImmediatePropagationStopped = it), this.stopPropagation();
      },
    }),
    x.each(
      { mouseenter: "mouseover", mouseleave: "mouseout" },
      function (e, t) {
        x.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function (e) {
            var n,
              r = this,
              i = e.relatedTarget,
              o = e.handleObj;
            return (
              (!i || (i !== r && !x.contains(r, i))) &&
                ((e.type = o.origType),
                (n = o.handler.apply(this, arguments)),
                (e.type = t)),
              n
            );
          },
        };
      }
    ),
    x.support.submitBubbles ||
      (x.event.special.submit = {
        setup: function () {
          return x.nodeName(this, "form")
            ? !1
            : (x.event.add(
                this,
                "click._submit keypress._submit",
                function (e) {
                  var n = e.target,
                    r =
                      x.nodeName(n, "input") || x.nodeName(n, "button")
                        ? n.form
                        : t;
                  r &&
                    !x._data(r, "submitBubbles") &&
                    (x.event.add(r, "submit._submit", function (e) {
                      e._submit_bubble = !0;
                    }),
                    x._data(r, "submitBubbles", !0));
                }
              ),
              t);
        },
        postDispatch: function (e) {
          e._submit_bubble &&
            (delete e._submit_bubble,
            this.parentNode &&
              !e.isTrigger &&
              x.event.simulate("submit", this.parentNode, e, !0));
        },
        teardown: function () {
          return x.nodeName(this, "form")
            ? !1
            : (x.event.remove(this, "._submit"), t);
        },
      }),
    x.support.changeBubbles ||
      (x.event.special.change = {
        setup: function () {
          return Z.test(this.nodeName)
            ? (("checkbox" === this.type || "radio" === this.type) &&
                (x.event.add(this, "propertychange._change", function (e) {
                  "checked" === e.originalEvent.propertyName &&
                    (this._just_changed = !0);
                }),
                x.event.add(this, "click._change", function (e) {
                  this._just_changed &&
                    !e.isTrigger &&
                    (this._just_changed = !1),
                    x.event.simulate("change", this, e, !0);
                })),
              !1)
            : (x.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                Z.test(t.nodeName) &&
                  !x._data(t, "changeBubbles") &&
                  (x.event.add(t, "change._change", function (e) {
                    !this.parentNode ||
                      e.isSimulated ||
                      e.isTrigger ||
                      x.event.simulate("change", this.parentNode, e, !0);
                  }),
                  x._data(t, "changeBubbles", !0));
              }),
              t);
        },
        handle: function (e) {
          var n = e.target;
          return this !== n ||
            e.isSimulated ||
            e.isTrigger ||
            ("radio" !== n.type && "checkbox" !== n.type)
            ? e.handleObj.handler.apply(this, arguments)
            : t;
        },
        teardown: function () {
          return x.event.remove(this, "._change"), !Z.test(this.nodeName);
        },
      }),
    x.support.focusinBubbles ||
      x.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        var n = 0,
          r = function (e) {
            x.event.simulate(t, e.target, x.event.fix(e), !0);
          };
        x.event.special[t] = {
          setup: function () {
            0 === n++ && a.addEventListener(e, r, !0);
          },
          teardown: function () {
            0 === --n && a.removeEventListener(e, r, !0);
          },
        };
      }),
    x.fn.extend({
      on: function (e, n, r, i, o) {
        var a, s;
        if ("object" == typeof e) {
          "string" != typeof n && ((r = r || n), (n = t));
          for (a in e) this.on(a, n, r, e[a], o);
          return this;
        }
        if (
          (null == r && null == i
            ? ((i = n), (r = n = t))
            : null == i &&
              ("string" == typeof n
                ? ((i = r), (r = t))
                : ((i = r), (r = n), (n = t))),
          i === !1)
        )
          i = ot;
        else if (!i) return this;
        return (
          1 === o &&
            ((s = i),
            (i = function (e) {
              return x().off(e), s.apply(this, arguments);
            }),
            (i.guid = s.guid || (s.guid = x.guid++))),
          this.each(function () {
            x.event.add(this, e, i, r, n);
          })
        );
      },
      one: function (e, t, n, r) {
        return this.on(e, t, n, r, 1);
      },
      off: function (e, n, r) {
        var i, o;
        if (e && e.preventDefault && e.handleObj)
          return (
            (i = e.handleObj),
            x(e.delegateTarget).off(
              i.namespace ? i.origType + "." + i.namespace : i.origType,
              i.selector,
              i.handler
            ),
            this
          );
        if ("object" == typeof e) {
          for (o in e) this.off(o, n, e[o]);
          return this;
        }
        return (
          (n === !1 || "function" == typeof n) && ((r = n), (n = t)),
          r === !1 && (r = ot),
          this.each(function () {
            x.event.remove(this, e, r, n);
          })
        );
      },
      trigger: function (e, t) {
        return this.each(function () {
          x.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, n) {
        var r = this[0];
        return r ? x.event.trigger(e, n, r, !0) : t;
      },
    });
  var st = /^.[^:#\[\.,]*$/,
    lt = /^(?:parents|prev(?:Until|All))/,
    ut = x.expr.match.needsContext,
    ct = { children: !0, contents: !0, next: !0, prev: !0 };
  x.fn.extend({
    find: function (e) {
      var t,
        n = [],
        r = this,
        i = r.length;
      if ("string" != typeof e)
        return this.pushStack(
          x(e).filter(function () {
            for (t = 0; i > t; t++) if (x.contains(r[t], this)) return !0;
          })
        );
      for (t = 0; i > t; t++) x.find(e, r[t], n);
      return (
        (n = this.pushStack(i > 1 ? x.unique(n) : n)),
        (n.selector = this.selector ? this.selector + " " + e : e),
        n
      );
    },
    has: function (e) {
      var t,
        n = x(e, this),
        r = n.length;
      return this.filter(function () {
        for (t = 0; r > t; t++) if (x.contains(this, n[t])) return !0;
      });
    },
    not: function (e) {
      return this.pushStack(ft(this, e || [], !0));
    },
    filter: function (e) {
      return this.pushStack(ft(this, e || [], !1));
    },
    is: function (e) {
      return !!ft(this, "string" == typeof e && ut.test(e) ? x(e) : e || [], !1)
        .length;
    },
    closest: function (e, t) {
      var n,
        r = 0,
        i = this.length,
        o = [],
        a = ut.test(e) || "string" != typeof e ? x(e, t || this.context) : 0;
      for (; i > r; r++)
        for (n = this[r]; n && n !== t; n = n.parentNode)
          if (
            11 > n.nodeType &&
            (a
              ? a.index(n) > -1
              : 1 === n.nodeType && x.find.matchesSelector(n, e))
          ) {
            n = o.push(n);
            break;
          }
      return this.pushStack(o.length > 1 ? x.unique(o) : o);
    },
    index: function (e) {
      return e
        ? "string" == typeof e
          ? x.inArray(this[0], x(e))
          : x.inArray(e.jquery ? e[0] : e, this)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (e, t) {
      var n =
          "string" == typeof e
            ? x(e, t)
            : x.makeArray(e && e.nodeType ? [e] : e),
        r = x.merge(this.get(), n);
      return this.pushStack(x.unique(r));
    },
    addBack: function (e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    },
  });
  function pt(e, t) {
    do e = e[t];
    while (e && 1 !== e.nodeType);
    return e;
  }
  x.each(
    {
      parent: function (e) {
        var t = e.parentNode;
        return t && 11 !== t.nodeType ? t : null;
      },
      parents: function (e) {
        return x.dir(e, "parentNode");
      },
      parentsUntil: function (e, t, n) {
        return x.dir(e, "parentNode", n);
      },
      next: function (e) {
        return pt(e, "nextSibling");
      },
      prev: function (e) {
        return pt(e, "previousSibling");
      },
      nextAll: function (e) {
        return x.dir(e, "nextSibling");
      },
      prevAll: function (e) {
        return x.dir(e, "previousSibling");
      },
      nextUntil: function (e, t, n) {
        return x.dir(e, "nextSibling", n);
      },
      prevUntil: function (e, t, n) {
        return x.dir(e, "previousSibling", n);
      },
      siblings: function (e) {
        return x.sibling((e.parentNode || {}).firstChild, e);
      },
      children: function (e) {
        return x.sibling(e.firstChild);
      },
      contents: function (e) {
        return x.nodeName(e, "iframe")
          ? e.contentDocument || e.contentWindow.document
          : x.merge([], e.childNodes);
      },
    },
    function (e, t) {
      x.fn[e] = function (n, r) {
        var i = x.map(this, t, n);
        return (
          "Until" !== e.slice(-5) && (r = n),
          r && "string" == typeof r && (i = x.filter(r, i)),
          this.length > 1 &&
            (ct[e] || (i = x.unique(i)), lt.test(e) && (i = i.reverse())),
          this.pushStack(i)
        );
      };
    }
  ),
    x.extend({
      filter: function (e, t, n) {
        var r = t[0];
        return (
          n && (e = ":not(" + e + ")"),
          1 === t.length && 1 === r.nodeType
            ? x.find.matchesSelector(r, e)
              ? [r]
              : []
            : x.find.matches(
                e,
                x.grep(t, function (e) {
                  return 1 === e.nodeType;
                })
              )
        );
      },
      dir: function (e, n, r) {
        var i = [],
          o = e[n];
        while (
          o &&
          9 !== o.nodeType &&
          (r === t || 1 !== o.nodeType || !x(o).is(r))
        )
          1 === o.nodeType && i.push(o), (o = o[n]);
        return i;
      },
      sibling: function (e, t) {
        var n = [];
        for (; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
        return n;
      },
    });
  function ft(e, t, n) {
    if (x.isFunction(t))
      return x.grep(e, function (e, r) {
        return !!t.call(e, r, e) !== n;
      });
    if (t.nodeType)
      return x.grep(e, function (e) {
        return (e === t) !== n;
      });
    if ("string" == typeof t) {
      if (st.test(t)) return x.filter(t, e, n);
      t = x.filter(t, e);
    }
    return x.grep(e, function (e) {
      return x.inArray(e, t) >= 0 !== n;
    });
  }
  function dt(e) {
    var t = ht.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement) while (t.length) n.createElement(t.pop());
    return n;
  }
  var ht =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    gt = / jQuery\d+="(?:null|\d+)"/g,
    mt = RegExp("<(?:" + ht + ")[\\s/>]", "i"),
    yt = /^\s+/,
    vt =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    bt = /<([\w:]+)/,
    xt = /<tbody/i,
    wt = /<|&#?\w+;/,
    Tt = /<(?:script|style|link)/i,
    Ct = /^(?:checkbox|radio)$/i,
    Nt = /checked\s*(?:[^=]|=\s*.checked.)/i,
    kt = /^$|\/(?:java|ecma)script/i,
    Et = /^true\/(.*)/,
    St = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    At = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: x.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
    },
    jt = dt(a),
    Dt = jt.appendChild(a.createElement("div"));
  (At.optgroup = At.option),
    (At.tbody = At.tfoot = At.colgroup = At.caption = At.thead),
    (At.th = At.td),
    x.fn.extend({
      text: function (e) {
        return x.access(
          this,
          function (e) {
            return e === t
              ? x.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || a).createTextNode(e)
                );
          },
          null,
          e,
          arguments.length
        );
      },
      append: function () {
        return this.domManip(arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = Lt(this, e);
            t.appendChild(e);
          }
        });
      },
      prepend: function () {
        return this.domManip(arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = Lt(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return this.domManip(arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return this.domManip(arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      remove: function (e, t) {
        var n,
          r = e ? x.filter(e, this) : this,
          i = 0;
        for (; null != (n = r[i]); i++)
          t || 1 !== n.nodeType || x.cleanData(Ft(n)),
            n.parentNode &&
              (t && x.contains(n.ownerDocument, n) && _t(Ft(n, "script")),
              n.parentNode.removeChild(n));
        return this;
      },
      empty: function () {
        var e,
          t = 0;
        for (; null != (e = this[t]); t++) {
          1 === e.nodeType && x.cleanData(Ft(e, !1));
          while (e.firstChild) e.removeChild(e.firstChild);
          e.options && x.nodeName(e, "select") && (e.options.length = 0);
        }
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null == e ? !1 : e),
          (t = null == t ? e : t),
          this.map(function () {
            return x.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return x.access(
          this,
          function (e) {
            var n = this[0] || {},
              r = 0,
              i = this.length;
            if (e === t)
              return 1 === n.nodeType ? n.innerHTML.replace(gt, "") : t;
            if (
              !(
                "string" != typeof e ||
                Tt.test(e) ||
                (!x.support.htmlSerialize && mt.test(e)) ||
                (!x.support.leadingWhitespace && yt.test(e)) ||
                At[(bt.exec(e) || ["", ""])[1].toLowerCase()]
              )
            ) {
              e = e.replace(vt, "<$1></$2>");
              try {
                for (; i > r; r++)
                  (n = this[r] || {}),
                    1 === n.nodeType &&
                      (x.cleanData(Ft(n, !1)), (n.innerHTML = e));
                n = 0;
              } catch (o) {}
            }
            n && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function () {
        var e = x.map(this, function (e) {
            return [e.nextSibling, e.parentNode];
          }),
          t = 0;
        return (
          this.domManip(
            arguments,
            function (n) {
              var r = e[t++],
                i = e[t++];
              i &&
                (r && r.parentNode !== i && (r = this.nextSibling),
                x(this).remove(),
                i.insertBefore(n, r));
            },
            !0
          ),
          t ? this : this.remove()
        );
      },
      detach: function (e) {
        return this.remove(e, !0);
      },
      domManip: function (e, t, n) {
        e = d.apply([], e);
        var r,
          i,
          o,
          a,
          s,
          l,
          u = 0,
          c = this.length,
          p = this,
          f = c - 1,
          h = e[0],
          g = x.isFunction(h);
        if (
          g ||
          (!(1 >= c || "string" != typeof h || x.support.checkClone) &&
            Nt.test(h))
        )
          return this.each(function (r) {
            var i = p.eq(r);
            g && (e[0] = h.call(this, r, i.html())), i.domManip(e, t, n);
          });
        if (
          c &&
          ((l = x.buildFragment(e, this[0].ownerDocument, !1, !n && this)),
          (r = l.firstChild),
          1 === l.childNodes.length && (l = r),
          r)
        ) {
          for (a = x.map(Ft(l, "script"), Ht), o = a.length; c > u; u++)
            (i = l),
              u !== f &&
                ((i = x.clone(i, !0, !0)), o && x.merge(a, Ft(i, "script"))),
              t.call(this[u], i, u);
          if (o)
            for (
              s = a[a.length - 1].ownerDocument, x.map(a, qt), u = 0;
              o > u;
              u++
            )
              (i = a[u]),
                kt.test(i.type || "") &&
                  !x._data(i, "globalEval") &&
                  x.contains(s, i) &&
                  (i.src
                    ? x._evalUrl(i.src)
                    : x.globalEval(
                        (i.text || i.textContent || i.innerHTML || "").replace(
                          St,
                          ""
                        )
                      ));
          l = r = null;
        }
        return this;
      },
    });
  function Lt(e, t) {
    return x.nodeName(e, "table") &&
      x.nodeName(1 === t.nodeType ? t : t.firstChild, "tr")
      ? e.getElementsByTagName("tbody")[0] ||
          e.appendChild(e.ownerDocument.createElement("tbody"))
      : e;
  }
  function Ht(e) {
    return (e.type = (null !== x.find.attr(e, "type")) + "/" + e.type), e;
  }
  function qt(e) {
    var t = Et.exec(e.type);
    return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
  }
  function _t(e, t) {
    var n,
      r = 0;
    for (; null != (n = e[r]); r++)
      x._data(n, "globalEval", !t || x._data(t[r], "globalEval"));
  }
  function Mt(e, t) {
    if (1 === t.nodeType && x.hasData(e)) {
      var n,
        r,
        i,
        o = x._data(e),
        a = x._data(t, o),
        s = o.events;
      if (s) {
        delete a.handle, (a.events = {});
        for (n in s)
          for (r = 0, i = s[n].length; i > r; r++) x.event.add(t, n, s[n][r]);
      }
      a.data && (a.data = x.extend({}, a.data));
    }
  }
  function Ot(e, t) {
    var n, r, i;
    if (1 === t.nodeType) {
      if (
        ((n = t.nodeName.toLowerCase()),
        !x.support.noCloneEvent && t[x.expando])
      ) {
        i = x._data(t);
        for (r in i.events) x.removeEvent(t, r, i.handle);
        t.removeAttribute(x.expando);
      }
      "script" === n && t.text !== e.text
        ? ((Ht(t).text = e.text), qt(t))
        : "object" === n
        ? (t.parentNode && (t.outerHTML = e.outerHTML),
          x.support.html5Clone &&
            e.innerHTML &&
            !x.trim(t.innerHTML) &&
            (t.innerHTML = e.innerHTML))
        : "input" === n && Ct.test(e.type)
        ? ((t.defaultChecked = t.checked = e.checked),
          t.value !== e.value && (t.value = e.value))
        : "option" === n
        ? (t.defaultSelected = t.selected = e.defaultSelected)
        : ("input" === n || "textarea" === n) &&
          (t.defaultValue = e.defaultValue);
    }
  }
  x.each(
    {
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith",
    },
    function (e, t) {
      x.fn[e] = function (e) {
        var n,
          r = 0,
          i = [],
          o = x(e),
          a = o.length - 1;
        for (; a >= r; r++)
          (n = r === a ? this : this.clone(!0)),
            x(o[r])[t](n),
            h.apply(i, n.get());
        return this.pushStack(i);
      };
    }
  );
  function Ft(e, n) {
    var r,
      o,
      a = 0,
      s =
        typeof e.getElementsByTagName !== i
          ? e.getElementsByTagName(n || "*")
          : typeof e.querySelectorAll !== i
          ? e.querySelectorAll(n || "*")
          : t;
    if (!s)
      for (s = [], r = e.childNodes || e; null != (o = r[a]); a++)
        !n || x.nodeName(o, n) ? s.push(o) : x.merge(s, Ft(o, n));
    return n === t || (n && x.nodeName(e, n)) ? x.merge([e], s) : s;
  }
  function Bt(e) {
    Ct.test(e.type) && (e.defaultChecked = e.checked);
  }
  x.extend({
    clone: function (e, t, n) {
      var r,
        i,
        o,
        a,
        s,
        l = x.contains(e.ownerDocument, e);
      if (
        (x.support.html5Clone ||
        x.isXMLDoc(e) ||
        !mt.test("<" + e.nodeName + ">")
          ? (o = e.cloneNode(!0))
          : ((Dt.innerHTML = e.outerHTML), Dt.removeChild((o = Dt.firstChild))),
        !(
          (x.support.noCloneEvent && x.support.noCloneChecked) ||
          (1 !== e.nodeType && 11 !== e.nodeType) ||
          x.isXMLDoc(e)
        ))
      )
        for (r = Ft(o), s = Ft(e), a = 0; null != (i = s[a]); ++a)
          r[a] && Ot(i, r[a]);
      if (t)
        if (n)
          for (s = s || Ft(e), r = r || Ft(o), a = 0; null != (i = s[a]); a++)
            Mt(i, r[a]);
        else Mt(e, o);
      return (
        (r = Ft(o, "script")),
        r.length > 0 && _t(r, !l && Ft(e, "script")),
        (r = s = i = null),
        o
      );
    },
    buildFragment: function (e, t, n, r) {
      var i,
        o,
        a,
        s,
        l,
        u,
        c,
        p = e.length,
        f = dt(t),
        d = [],
        h = 0;
      for (; p > h; h++)
        if (((o = e[h]), o || 0 === o))
          if ("object" === x.type(o)) x.merge(d, o.nodeType ? [o] : o);
          else if (wt.test(o)) {
            (s = s || f.appendChild(t.createElement("div"))),
              (l = (bt.exec(o) || ["", ""])[1].toLowerCase()),
              (c = At[l] || At._default),
              (s.innerHTML = c[1] + o.replace(vt, "<$1></$2>") + c[2]),
              (i = c[0]);
            while (i--) s = s.lastChild;
            if (
              (!x.support.leadingWhitespace &&
                yt.test(o) &&
                d.push(t.createTextNode(yt.exec(o)[0])),
              !x.support.tbody)
            ) {
              (o =
                "table" !== l || xt.test(o)
                  ? "<table>" !== c[1] || xt.test(o)
                    ? 0
                    : s
                  : s.firstChild),
                (i = o && o.childNodes.length);
              while (i--)
                x.nodeName((u = o.childNodes[i]), "tbody") &&
                  !u.childNodes.length &&
                  o.removeChild(u);
            }
            x.merge(d, s.childNodes), (s.textContent = "");
            while (s.firstChild) s.removeChild(s.firstChild);
            s = f.lastChild;
          } else d.push(t.createTextNode(o));
      s && f.removeChild(s),
        x.support.appendChecked || x.grep(Ft(d, "input"), Bt),
        (h = 0);
      while ((o = d[h++]))
        if (
          (!r || -1 === x.inArray(o, r)) &&
          ((a = x.contains(o.ownerDocument, o)),
          (s = Ft(f.appendChild(o), "script")),
          a && _t(s),
          n)
        ) {
          i = 0;
          while ((o = s[i++])) kt.test(o.type || "") && n.push(o);
        }
      return (s = null), f;
    },
    cleanData: function (e, t) {
      var n,
        r,
        o,
        a,
        s = 0,
        l = x.expando,
        u = x.cache,
        c = x.support.deleteExpando,
        f = x.event.special;
      for (; null != (n = e[s]); s++)
        if ((t || x.acceptData(n)) && ((o = n[l]), (a = o && u[o]))) {
          if (a.events)
            for (r in a.events)
              f[r] ? x.event.remove(n, r) : x.removeEvent(n, r, a.handle);
          u[o] &&
            (delete u[o],
            c
              ? delete n[l]
              : typeof n.removeAttribute !== i
              ? n.removeAttribute(l)
              : (n[l] = null),
            p.push(o));
        }
    },
    _evalUrl: function (e) {
      return x.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        throws: !0,
      });
    },
  }),
    x.fn.extend({
      wrapAll: function (e) {
        if (x.isFunction(e))
          return this.each(function (t) {
            x(this).wrapAll(e.call(this, t));
          });
        if (this[0]) {
          var t = x(e, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                var e = this;
                while (e.firstChild && 1 === e.firstChild.nodeType)
                  e = e.firstChild;
                return e;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (e) {
        return x.isFunction(e)
          ? this.each(function (t) {
              x(this).wrapInner(e.call(this, t));
            })
          : this.each(function () {
              var t = x(this),
                n = t.contents();
              n.length ? n.wrapAll(e) : t.append(e);
            });
      },
      wrap: function (e) {
        var t = x.isFunction(e);
        return this.each(function (n) {
          x(this).wrapAll(t ? e.call(this, n) : e);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            x.nodeName(this, "body") || x(this).replaceWith(this.childNodes);
          })
          .end();
      },
    });
  var Pt,
    Rt,
    Wt,
    $t = /alpha\([^)]*\)/i,
    It = /opacity\s*=\s*([^)]*)/,
    zt = /^(top|right|bottom|left)$/,
    Xt = /^(none|table(?!-c[ea]).+)/,
    Ut = /^margin/,
    Vt = RegExp("^(" + w + ")(.*)$", "i"),
    Yt = RegExp("^(" + w + ")(?!px)[a-z%]+$", "i"),
    Jt = RegExp("^([+-])=(" + w + ")", "i"),
    Gt = { BODY: "block" },
    Qt = { position: "absolute", visibility: "hidden", display: "block" },
    Kt = { letterSpacing: 0, fontWeight: 400 },
    Zt = ["Top", "Right", "Bottom", "Left"],
    en = ["Webkit", "O", "Moz", "ms"];
  function tn(e, t) {
    if (t in e) return t;
    var n = t.charAt(0).toUpperCase() + t.slice(1),
      r = t,
      i = en.length;
    while (i--) if (((t = en[i] + n), t in e)) return t;
    return r;
  }
  function nn(e, t) {
    return (
      (e = t || e),
      "none" === x.css(e, "display") || !x.contains(e.ownerDocument, e)
    );
  }
  function rn(e, t) {
    var n,
      r,
      i,
      o = [],
      a = 0,
      s = e.length;
    for (; s > a; a++)
      (r = e[a]),
        r.style &&
          ((o[a] = x._data(r, "olddisplay")),
          (n = r.style.display),
          t
            ? (o[a] || "none" !== n || (r.style.display = ""),
              "" === r.style.display &&
                nn(r) &&
                (o[a] = x._data(r, "olddisplay", ln(r.nodeName))))
            : o[a] ||
              ((i = nn(r)),
              ((n && "none" !== n) || !i) &&
                x._data(r, "olddisplay", i ? n : x.css(r, "display"))));
    for (a = 0; s > a; a++)
      (r = e[a]),
        r.style &&
          ((t && "none" !== r.style.display && "" !== r.style.display) ||
            (r.style.display = t ? o[a] || "" : "none"));
    return e;
  }
  x.fn.extend({
    css: function (e, n) {
      return x.access(
        this,
        function (e, n, r) {
          var i,
            o,
            a = {},
            s = 0;
          if (x.isArray(n)) {
            for (o = Rt(e), i = n.length; i > s; s++)
              a[n[s]] = x.css(e, n[s], !1, o);
            return a;
          }
          return r !== t ? x.style(e, n, r) : x.css(e, n);
        },
        e,
        n,
        arguments.length > 1
      );
    },
    show: function () {
      return rn(this, !0);
    },
    hide: function () {
      return rn(this);
    },
    toggle: function (e) {
      return "boolean" == typeof e
        ? e
          ? this.show()
          : this.hide()
        : this.each(function () {
            nn(this) ? x(this).show() : x(this).hide();
          });
    },
  }),
    x.extend({
      cssHooks: {
        opacity: {
          get: function (e, t) {
            if (t) {
              var n = Wt(e, "opacity");
              return "" === n ? "1" : n;
            }
          },
        },
      },
      cssNumber: {
        columnCount: !0,
        fillOpacity: !0,
        fontWeight: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
      },
      cssProps: { float: x.support.cssFloat ? "cssFloat" : "styleFloat" },
      style: function (e, n, r, i) {
        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
          var o,
            a,
            s,
            l = x.camelCase(n),
            u = e.style;
          if (
            ((n = x.cssProps[l] || (x.cssProps[l] = tn(u, l))),
            (s = x.cssHooks[n] || x.cssHooks[l]),
            r === t)
          )
            return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : u[n];
          if (
            ((a = typeof r),
            "string" === a &&
              (o = Jt.exec(r)) &&
              ((r = (o[1] + 1) * o[2] + parseFloat(x.css(e, n))),
              (a = "number")),
            !(
              null == r ||
              ("number" === a && isNaN(r)) ||
              ("number" !== a || x.cssNumber[l] || (r += "px"),
              x.support.clearCloneStyle ||
                "" !== r ||
                0 !== n.indexOf("background") ||
                (u[n] = "inherit"),
              s && "set" in s && (r = s.set(e, r, i)) === t)
            ))
          )
            try {
              u[n] = r;
            } catch (c) {}
        }
      },
      css: function (e, n, r, i) {
        var o,
          a,
          s,
          l = x.camelCase(n);
        return (
          (n = x.cssProps[l] || (x.cssProps[l] = tn(e.style, l))),
          (s = x.cssHooks[n] || x.cssHooks[l]),
          s && "get" in s && (a = s.get(e, !0, r)),
          a === t && (a = Wt(e, n, i)),
          "normal" === a && n in Kt && (a = Kt[n]),
          "" === r || r
            ? ((o = parseFloat(a)), r === !0 || x.isNumeric(o) ? o || 0 : a)
            : a
        );
      },
    }),
    e.getComputedStyle
      ? ((Rt = function (t) {
          return e.getComputedStyle(t, null);
        }),
        (Wt = function (e, n, r) {
          var i,
            o,
            a,
            s = r || Rt(e),
            l = s ? s.getPropertyValue(n) || s[n] : t,
            u = e.style;
          return (
            s &&
              ("" !== l ||
                x.contains(e.ownerDocument, e) ||
                (l = x.style(e, n)),
              Yt.test(l) &&
                Ut.test(n) &&
                ((i = u.width),
                (o = u.minWidth),
                (a = u.maxWidth),
                (u.minWidth = u.maxWidth = u.width = l),
                (l = s.width),
                (u.width = i),
                (u.minWidth = o),
                (u.maxWidth = a))),
            l
          );
        }))
      : a.documentElement.currentStyle &&
        ((Rt = function (e) {
          return e.currentStyle;
        }),
        (Wt = function (e, n, r) {
          var i,
            o,
            a,
            s = r || Rt(e),
            l = s ? s[n] : t,
            u = e.style;
          return (
            null == l && u && u[n] && (l = u[n]),
            Yt.test(l) &&
              !zt.test(n) &&
              ((i = u.left),
              (o = e.runtimeStyle),
              (a = o && o.left),
              a && (o.left = e.currentStyle.left),
              (u.left = "fontSize" === n ? "1em" : l),
              (l = u.pixelLeft + "px"),
              (u.left = i),
              a && (o.left = a)),
            "" === l ? "auto" : l
          );
        }));
  function on(e, t, n) {
    var r = Vt.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
  }
  function an(e, t, n, r, i) {
    var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
      a = 0;
    for (; 4 > o; o += 2)
      "margin" === n && (a += x.css(e, n + Zt[o], !0, i)),
        r
          ? ("content" === n && (a -= x.css(e, "padding" + Zt[o], !0, i)),
            "margin" !== n &&
              (a -= x.css(e, "border" + Zt[o] + "Width", !0, i)))
          : ((a += x.css(e, "padding" + Zt[o], !0, i)),
            "padding" !== n &&
              (a += x.css(e, "border" + Zt[o] + "Width", !0, i)));
    return a;
  }
  function sn(e, t, n) {
    var r = !0,
      i = "width" === t ? e.offsetWidth : e.offsetHeight,
      o = Rt(e),
      a = x.support.boxSizing && "border-box" === x.css(e, "boxSizing", !1, o);
    if (0 >= i || null == i) {
      if (
        ((i = Wt(e, t, o)),
        (0 > i || null == i) && (i = e.style[t]),
        Yt.test(i))
      )
        return i;
      (r = a && (x.support.boxSizingReliable || i === e.style[t])),
        (i = parseFloat(i) || 0);
    }
    return i + an(e, t, n || (a ? "border" : "content"), r, o) + "px";
  }
  function ln(e) {
    var t = a,
      n = Gt[e];
    return (
      n ||
        ((n = un(e, t)),
        ("none" !== n && n) ||
          ((Pt = (
            Pt ||
            x("<iframe frameborder='0' width='0' height='0'/>").css(
              "cssText",
              "display:block !important"
            )
          ).appendTo(t.documentElement)),
          (t = (Pt[0].contentWindow || Pt[0].contentDocument).document),
          t.write("<!doctype html><html><body>"),
          t.close(),
          (n = un(e, t)),
          Pt.detach()),
        (Gt[e] = n)),
      n
    );
  }
  function un(e, t) {
    var n = x(t.createElement(e)).appendTo(t.body),
      r = x.css(n[0], "display");
    return n.remove(), r;
  }
  x.each(["height", "width"], function (e, n) {
    x.cssHooks[n] = {
      get: function (e, r, i) {
        return r
          ? 0 === e.offsetWidth && Xt.test(x.css(e, "display"))
            ? x.swap(e, Qt, function () {
                return sn(e, n, i);
              })
            : sn(e, n, i)
          : t;
      },
      set: function (e, t, r) {
        var i = r && Rt(e);
        return on(
          e,
          t,
          r
            ? an(
                e,
                n,
                r,
                x.support.boxSizing &&
                  "border-box" === x.css(e, "boxSizing", !1, i),
                i
              )
            : 0
        );
      },
    };
  }),
    x.support.opacity ||
      (x.cssHooks.opacity = {
        get: function (e, t) {
          return It.test(
            (t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || ""
          )
            ? 0.01 * parseFloat(RegExp.$1) + ""
            : t
            ? "1"
            : "";
        },
        set: function (e, t) {
          var n = e.style,
            r = e.currentStyle,
            i = x.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
            o = (r && r.filter) || n.filter || "";
          (n.zoom = 1),
            ((t >= 1 || "" === t) &&
              "" === x.trim(o.replace($t, "")) &&
              n.removeAttribute &&
              (n.removeAttribute("filter"), "" === t || (r && !r.filter))) ||
              (n.filter = $t.test(o) ? o.replace($t, i) : o + " " + i);
        },
      }),
    x(function () {
      x.support.reliableMarginRight ||
        (x.cssHooks.marginRight = {
          get: function (e, n) {
            return n
              ? x.swap(e, { display: "inline-block" }, Wt, [e, "marginRight"])
              : t;
          },
        }),
        !x.support.pixelPosition &&
          x.fn.position &&
          x.each(["top", "left"], function (e, n) {
            x.cssHooks[n] = {
              get: function (e, r) {
                return r
                  ? ((r = Wt(e, n)), Yt.test(r) ? x(e).position()[n] + "px" : r)
                  : t;
              },
            };
          });
    }),
    x.expr &&
      x.expr.filters &&
      ((x.expr.filters.hidden = function (e) {
        return (
          (0 >= e.offsetWidth && 0 >= e.offsetHeight) ||
          (!x.support.reliableHiddenOffsets &&
            "none" === ((e.style && e.style.display) || x.css(e, "display")))
        );
      }),
      (x.expr.filters.visible = function (e) {
        return !x.expr.filters.hidden(e);
      })),
    x.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
      (x.cssHooks[e + t] = {
        expand: function (n) {
          var r = 0,
            i = {},
            o = "string" == typeof n ? n.split(" ") : [n];
          for (; 4 > r; r++) i[e + Zt[r] + t] = o[r] || o[r - 2] || o[0];
          return i;
        },
      }),
        Ut.test(e) || (x.cssHooks[e + t].set = on);
    });
  var cn = /%20/g,
    pn = /\[\]$/,
    fn = /\r?\n/g,
    dn = /^(?:submit|button|image|reset|file)$/i,
    hn = /^(?:input|select|textarea|keygen)/i;
  x.fn.extend({
    serialize: function () {
      return x.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var e = x.prop(this, "elements");
        return e ? x.makeArray(e) : this;
      })
        .filter(function () {
          var e = this.type;
          return (
            this.name &&
            !x(this).is(":disabled") &&
            hn.test(this.nodeName) &&
            !dn.test(e) &&
            (this.checked || !Ct.test(e))
          );
        })
        .map(function (e, t) {
          var n = x(this).val();
          return null == n
            ? null
            : x.isArray(n)
            ? x.map(n, function (e) {
                return { name: t.name, value: e.replace(fn, "\r\n") };
              })
            : { name: t.name, value: n.replace(fn, "\r\n") };
        })
        .get();
    },
  }),
    (x.param = function (e, n) {
      var r,
        i = [],
        o = function (e, t) {
          (t = x.isFunction(t) ? t() : null == t ? "" : t),
            (i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
        };
      if (
        (n === t && (n = x.ajaxSettings && x.ajaxSettings.traditional),
        x.isArray(e) || (e.jquery && !x.isPlainObject(e)))
      )
        x.each(e, function () {
          o(this.name, this.value);
        });
      else for (r in e) gn(r, e[r], n, o);
      return i.join("&").replace(cn, "+");
    });
  function gn(e, t, n, r) {
    var i;
    if (x.isArray(t))
      x.each(t, function (t, i) {
        n || pn.test(e)
          ? r(e, i)
          : gn(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r);
      });
    else if (n || "object" !== x.type(t)) r(e, t);
    else for (i in t) gn(e + "[" + i + "]", t[i], n, r);
  }
  x.each(
    "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
      " "
    ),
    function (e, t) {
      x.fn[t] = function (e, n) {
        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
      };
    }
  ),
    x.fn.extend({
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, n, r) {
        return this.on(t, e, n, r);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
    });
  var mn,
    yn,
    vn = x.now(),
    bn = /\?/,
    xn = /#.*$/,
    wn = /([?&])_=[^&]*/,
    Tn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Cn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Nn = /^(?:GET|HEAD)$/,
    kn = /^\/\//,
    En = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    Sn = x.fn.load,
    An = {},
    jn = {},
    Dn = "*/".concat("*");
  try {
    yn = o.href;
  } catch (Ln) {
    (yn = a.createElement("a")), (yn.href = ""), (yn = yn.href);
  }
  mn = En.exec(yn.toLowerCase()) || [];
  function Hn(e) {
    return function (t, n) {
      "string" != typeof t && ((n = t), (t = "*"));
      var r,
        i = 0,
        o = t.toLowerCase().match(T) || [];
      if (x.isFunction(n))
        while ((r = o[i++]))
          "+" === r[0]
            ? ((r = r.slice(1) || "*"), (e[r] = e[r] || []).unshift(n))
            : (e[r] = e[r] || []).push(n);
    };
  }
  function qn(e, n, r, i) {
    var o = {},
      a = e === jn;
    function s(l) {
      var u;
      return (
        (o[l] = !0),
        x.each(e[l] || [], function (e, l) {
          var c = l(n, r, i);
          return "string" != typeof c || a || o[c]
            ? a
              ? !(u = c)
              : t
            : (n.dataTypes.unshift(c), s(c), !1);
        }),
        u
      );
    }
    return s(n.dataTypes[0]) || (!o["*"] && s("*"));
  }
  function _n(e, n) {
    var r,
      i,
      o = x.ajaxSettings.flatOptions || {};
    for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
    return r && x.extend(!0, e, r), e;
  }
  (x.fn.load = function (e, n, r) {
    if ("string" != typeof e && Sn) return Sn.apply(this, arguments);
    var i,
      o,
      a,
      s = this,
      l = e.indexOf(" ");
    return (
      l >= 0 && ((i = e.slice(l, e.length)), (e = e.slice(0, l))),
      x.isFunction(n)
        ? ((r = n), (n = t))
        : n && "object" == typeof n && (a = "POST"),
      s.length > 0 &&
        x
          .ajax({ url: e, type: a, dataType: "html", data: n })
          .done(function (e) {
            (o = arguments),
              s.html(i ? x("<div>").append(x.parseHTML(e)).find(i) : e);
          })
          .complete(
            r &&
              function (e, t) {
                s.each(r, o || [e.responseText, t, e]);
              }
          ),
      this
    );
  }),
    x.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        x.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    x.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: yn,
        type: "GET",
        isLocal: Cn.test(mn[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": Dn,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /xml/, html: /html/, json: /json/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": x.parseJSON,
          "text xml": x.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? _n(_n(e, x.ajaxSettings), t) : _n(x.ajaxSettings, e);
      },
      ajaxPrefilter: Hn(An),
      ajaxTransport: Hn(jn),
      ajax: function (e, n) {
        "object" == typeof e && ((n = e), (e = t)), (n = n || {});
        var r,
          i,
          o,
          a,
          s,
          l,
          u,
          c,
          p = x.ajaxSetup({}, n),
          f = p.context || p,
          d = p.context && (f.nodeType || f.jquery) ? x(f) : x.event,
          h = x.Deferred(),
          g = x.Callbacks("once memory"),
          m = p.statusCode || {},
          y = {},
          v = {},
          b = 0,
          w = "canceled",
          C = {
            readyState: 0,
            getResponseHeader: function (e) {
              var t;
              if (2 === b) {
                if (!c) {
                  c = {};
                  while ((t = Tn.exec(a))) c[t[1].toLowerCase()] = t[2];
                }
                t = c[e.toLowerCase()];
              }
              return null == t ? null : t;
            },
            getAllResponseHeaders: function () {
              return 2 === b ? a : null;
            },
            setRequestHeader: function (e, t) {
              var n = e.toLowerCase();
              return b || ((e = v[n] = v[n] || e), (y[e] = t)), this;
            },
            overrideMimeType: function (e) {
              return b || (p.mimeType = e), this;
            },
            statusCode: function (e) {
              var t;
              if (e)
                if (2 > b) for (t in e) m[t] = [m[t], e[t]];
                else C.always(e[C.status]);
              return this;
            },
            abort: function (e) {
              var t = e || w;
              return u && u.abort(t), k(0, t), this;
            },
          };
        if (
          ((h.promise(C).complete = g.add),
          (C.success = C.done),
          (C.error = C.fail),
          (p.url = ((e || p.url || yn) + "")
            .replace(xn, "")
            .replace(kn, mn[1] + "//")),
          (p.type = n.method || n.type || p.method || p.type),
          (p.dataTypes = x
            .trim(p.dataType || "*")
            .toLowerCase()
            .match(T) || [""]),
          null == p.crossDomain &&
            ((r = En.exec(p.url.toLowerCase())),
            (p.crossDomain = !(
              !r ||
              (r[1] === mn[1] &&
                r[2] === mn[2] &&
                (r[3] || ("http:" === r[1] ? "80" : "443")) ===
                  (mn[3] || ("http:" === mn[1] ? "80" : "443")))
            ))),
          p.data &&
            p.processData &&
            "string" != typeof p.data &&
            (p.data = x.param(p.data, p.traditional)),
          qn(An, p, n, C),
          2 === b)
        )
          return C;
        (l = p.global),
          l && 0 === x.active++ && x.event.trigger("ajaxStart"),
          (p.type = p.type.toUpperCase()),
          (p.hasContent = !Nn.test(p.type)),
          (o = p.url),
          p.hasContent ||
            (p.data &&
              ((o = p.url += (bn.test(o) ? "&" : "?") + p.data), delete p.data),
            p.cache === !1 &&
              (p.url = wn.test(o)
                ? o.replace(wn, "$1_=" + vn++)
                : o + (bn.test(o) ? "&" : "?") + "_=" + vn++)),
          p.ifModified &&
            (x.lastModified[o] &&
              C.setRequestHeader("If-Modified-Since", x.lastModified[o]),
            x.etag[o] && C.setRequestHeader("If-None-Match", x.etag[o])),
          ((p.data && p.hasContent && p.contentType !== !1) || n.contentType) &&
            C.setRequestHeader("Content-Type", p.contentType),
          C.setRequestHeader(
            "Accept",
            p.dataTypes[0] && p.accepts[p.dataTypes[0]]
              ? p.accepts[p.dataTypes[0]] +
                  ("*" !== p.dataTypes[0] ? ", " + Dn + "; q=0.01" : "")
              : p.accepts["*"]
          );
        for (i in p.headers) C.setRequestHeader(i, p.headers[i]);
        if (p.beforeSend && (p.beforeSend.call(f, C, p) === !1 || 2 === b))
          return C.abort();
        w = "abort";
        for (i in { success: 1, error: 1, complete: 1 }) C[i](p[i]);
        if ((u = qn(jn, p, n, C))) {
          (C.readyState = 1),
            l && d.trigger("ajaxSend", [C, p]),
            p.async &&
              p.timeout > 0 &&
              (s = setTimeout(function () {
                C.abort("timeout");
              }, p.timeout));
          try {
            (b = 1), u.send(y, k);
          } catch (N) {
            if (!(2 > b)) throw N;
            k(-1, N);
          }
        } else k(-1, "No Transport");
        function k(e, n, r, i) {
          var c,
            y,
            v,
            w,
            T,
            N = n;
          2 !== b &&
            ((b = 2),
            s && clearTimeout(s),
            (u = t),
            (a = i || ""),
            (C.readyState = e > 0 ? 4 : 0),
            (c = (e >= 200 && 300 > e) || 304 === e),
            r && (w = Mn(p, C, r)),
            (w = On(p, w, C, c)),
            c
              ? (p.ifModified &&
                  ((T = C.getResponseHeader("Last-Modified")),
                  T && (x.lastModified[o] = T),
                  (T = C.getResponseHeader("etag")),
                  T && (x.etag[o] = T)),
                204 === e || "HEAD" === p.type
                  ? (N = "nocontent")
                  : 304 === e
                  ? (N = "notmodified")
                  : ((N = w.state), (y = w.data), (v = w.error), (c = !v)))
              : ((v = N), (e || !N) && ((N = "error"), 0 > e && (e = 0))),
            (C.status = e),
            (C.statusText = (n || N) + ""),
            c ? h.resolveWith(f, [y, N, C]) : h.rejectWith(f, [C, N, v]),
            C.statusCode(m),
            (m = t),
            l && d.trigger(c ? "ajaxSuccess" : "ajaxError", [C, p, c ? y : v]),
            g.fireWith(f, [C, N]),
            l &&
              (d.trigger("ajaxComplete", [C, p]),
              --x.active || x.event.trigger("ajaxStop")));
        }
        return C;
      },
      getJSON: function (e, t, n) {
        return x.get(e, t, n, "json");
      },
      getScript: function (e, n) {
        return x.get(e, t, n, "script");
      },
    }),
    x.each(["get", "post"], function (e, n) {
      x[n] = function (e, r, i, o) {
        return (
          x.isFunction(r) && ((o = o || i), (i = r), (r = t)),
          x.ajax({ url: e, type: n, dataType: o, data: r, success: i })
        );
      };
    });
  function Mn(e, n, r) {
    var i,
      o,
      a,
      s,
      l = e.contents,
      u = e.dataTypes;
    while ("*" === u[0])
      u.shift(),
        o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
    if (o)
      for (s in l)
        if (l[s] && l[s].test(o)) {
          u.unshift(s);
          break;
        }
    if (u[0] in r) a = u[0];
    else {
      for (s in r) {
        if (!u[0] || e.converters[s + " " + u[0]]) {
          a = s;
          break;
        }
        i || (i = s);
      }
      a = a || i;
    }
    return a ? (a !== u[0] && u.unshift(a), r[a]) : t;
  }
  function On(e, t, n, r) {
    var i,
      o,
      a,
      s,
      l,
      u = {},
      c = e.dataTypes.slice();
    if (c[1]) for (a in e.converters) u[a.toLowerCase()] = e.converters[a];
    o = c.shift();
    while (o)
      if (
        (e.responseFields[o] && (n[e.responseFields[o]] = t),
        !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
        (l = o),
        (o = c.shift()))
      )
        if ("*" === o) o = l;
        else if ("*" !== l && l !== o) {
          if (((a = u[l + " " + o] || u["* " + o]), !a))
            for (i in u)
              if (
                ((s = i.split(" ")),
                s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]]))
              ) {
                a === !0
                  ? (a = u[i])
                  : u[i] !== !0 && ((o = s[0]), c.unshift(s[1]));
                break;
              }
          if (a !== !0)
            if (a && e["throws"]) t = a(t);
            else
              try {
                t = a(t);
              } catch (p) {
                return {
                  state: "parsererror",
                  error: a ? p : "No conversion from " + l + " to " + o,
                };
              }
        }
    return { state: "success", data: t };
  }
  x.ajaxSetup({
    accepts: {
      script:
        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
    },
    contents: { script: /(?:java|ecma)script/ },
    converters: {
      "text script": function (e) {
        return x.globalEval(e), e;
      },
    },
  }),
    x.ajaxPrefilter("script", function (e) {
      e.cache === t && (e.cache = !1),
        e.crossDomain && ((e.type = "GET"), (e.global = !1));
    }),
    x.ajaxTransport("script", function (e) {
      if (e.crossDomain) {
        var n,
          r = a.head || x("head")[0] || a.documentElement;
        return {
          send: function (t, i) {
            (n = a.createElement("script")),
              (n.async = !0),
              e.scriptCharset && (n.charset = e.scriptCharset),
              (n.src = e.url),
              (n.onload = n.onreadystatechange =
                function (e, t) {
                  (t ||
                    !n.readyState ||
                    /loaded|complete/.test(n.readyState)) &&
                    ((n.onload = n.onreadystatechange = null),
                    n.parentNode && n.parentNode.removeChild(n),
                    (n = null),
                    t || i(200, "success"));
                }),
              r.insertBefore(n, r.firstChild);
          },
          abort: function () {
            n && n.onload(t, !0);
          },
        };
      }
    });
  var Fn = [],
    Bn = /(=)\?(?=&|$)|\?\?/;
  x.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = Fn.pop() || x.expando + "_" + vn++;
      return (this[e] = !0), e;
    },
  }),
    x.ajaxPrefilter("json jsonp", function (n, r, i) {
      var o,
        a,
        s,
        l =
          n.jsonp !== !1 &&
          (Bn.test(n.url)
            ? "url"
            : "string" == typeof n.data &&
              !(n.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
              Bn.test(n.data) &&
              "data");
      return l || "jsonp" === n.dataTypes[0]
        ? ((o = n.jsonpCallback =
            x.isFunction(n.jsonpCallback)
              ? n.jsonpCallback()
              : n.jsonpCallback),
          l
            ? (n[l] = n[l].replace(Bn, "$1" + o))
            : n.jsonp !== !1 &&
              (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + o),
          (n.converters["script json"] = function () {
            return s || x.error(o + " was not called"), s[0];
          }),
          (n.dataTypes[0] = "json"),
          (a = e[o]),
          (e[o] = function () {
            s = arguments;
          }),
          i.always(function () {
            (e[o] = a),
              n[o] && ((n.jsonpCallback = r.jsonpCallback), Fn.push(o)),
              s && x.isFunction(a) && a(s[0]),
              (s = a = t);
          }),
          "script")
        : t;
    });
  var Pn,
    Rn,
    Wn = 0,
    $n =
      e.ActiveXObject &&
      function () {
        var e;
        for (e in Pn) Pn[e](t, !0);
      };
  function In() {
    try {
      return new e.XMLHttpRequest();
    } catch (t) {}
  }
  function zn() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP");
    } catch (t) {}
  }
  (x.ajaxSettings.xhr = e.ActiveXObject
    ? function () {
        return (!this.isLocal && In()) || zn();
      }
    : In),
    (Rn = x.ajaxSettings.xhr()),
    (x.support.cors = !!Rn && "withCredentials" in Rn),
    (Rn = x.support.ajax = !!Rn),
    Rn &&
      x.ajaxTransport(function (n) {
        if (!n.crossDomain || x.support.cors) {
          var r;
          return {
            send: function (i, o) {
              var a,
                s,
                l = n.xhr();
              if (
                (n.username
                  ? l.open(n.type, n.url, n.async, n.username, n.password)
                  : l.open(n.type, n.url, n.async),
                n.xhrFields)
              )
                for (s in n.xhrFields) l[s] = n.xhrFields[s];
              n.mimeType &&
                l.overrideMimeType &&
                l.overrideMimeType(n.mimeType),
                n.crossDomain ||
                  i["X-Requested-With"] ||
                  (i["X-Requested-With"] = "XMLHttpRequest");
              try {
                for (s in i) l.setRequestHeader(s, i[s]);
              } catch (u) {}
              l.send((n.hasContent && n.data) || null),
                (r = function (e, i) {
                  var s, u, c, p;
                  try {
                    if (r && (i || 4 === l.readyState))
                      if (
                        ((r = t),
                        a &&
                          ((l.onreadystatechange = x.noop), $n && delete Pn[a]),
                        i)
                      )
                        4 !== l.readyState && l.abort();
                      else {
                        (p = {}),
                          (s = l.status),
                          (u = l.getAllResponseHeaders()),
                          "string" == typeof l.responseText &&
                            (p.text = l.responseText);
                        try {
                          c = l.statusText;
                        } catch (f) {
                          c = "";
                        }
                        s || !n.isLocal || n.crossDomain
                          ? 1223 === s && (s = 204)
                          : (s = p.text ? 200 : 404);
                      }
                  } catch (d) {
                    i || o(-1, d);
                  }
                  p && o(s, c, p, u);
                }),
                n.async
                  ? 4 === l.readyState
                    ? setTimeout(r)
                    : ((a = ++Wn),
                      $n && (Pn || ((Pn = {}), x(e).unload($n)), (Pn[a] = r)),
                      (l.onreadystatechange = r))
                  : r();
            },
            abort: function () {
              r && r(t, !0);
            },
          };
        }
      });
  var Xn,
    Un,
    Vn = /^(?:toggle|show|hide)$/,
    Yn = RegExp("^(?:([+-])=|)(" + w + ")([a-z%]*)$", "i"),
    Jn = /queueHooks$/,
    Gn = [nr],
    Qn = {
      "*": [
        function (e, t) {
          var n = this.createTween(e, t),
            r = n.cur(),
            i = Yn.exec(t),
            o = (i && i[3]) || (x.cssNumber[e] ? "" : "px"),
            a =
              (x.cssNumber[e] || ("px" !== o && +r)) &&
              Yn.exec(x.css(n.elem, e)),
            s = 1,
            l = 20;
          if (a && a[3] !== o) {
            (o = o || a[3]), (i = i || []), (a = +r || 1);
            do (s = s || ".5"), (a /= s), x.style(n.elem, e, a + o);
            while (s !== (s = n.cur() / r) && 1 !== s && --l);
          }
          return (
            i &&
              ((a = n.start = +a || +r || 0),
              (n.unit = o),
              (n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2])),
            n
          );
        },
      ],
    };
  function Kn() {
    return (
      setTimeout(function () {
        Xn = t;
      }),
      (Xn = x.now())
    );
  }
  function Zn(e, t, n) {
    var r,
      i = (Qn[t] || []).concat(Qn["*"]),
      o = 0,
      a = i.length;
    for (; a > o; o++) if ((r = i[o].call(n, t, e))) return r;
  }
  function er(e, t, n) {
    var r,
      i,
      o = 0,
      a = Gn.length,
      s = x.Deferred().always(function () {
        delete l.elem;
      }),
      l = function () {
        if (i) return !1;
        var t = Xn || Kn(),
          n = Math.max(0, u.startTime + u.duration - t),
          r = n / u.duration || 0,
          o = 1 - r,
          a = 0,
          l = u.tweens.length;
        for (; l > a; a++) u.tweens[a].run(o);
        return (
          s.notifyWith(e, [u, o, n]),
          1 > o && l ? n : (s.resolveWith(e, [u]), !1)
        );
      },
      u = s.promise({
        elem: e,
        props: x.extend({}, t),
        opts: x.extend(!0, { specialEasing: {} }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: Xn || Kn(),
        duration: n.duration,
        tweens: [],
        createTween: function (t, n) {
          var r = x.Tween(
            e,
            u.opts,
            t,
            n,
            u.opts.specialEasing[t] || u.opts.easing
          );
          return u.tweens.push(r), r;
        },
        stop: function (t) {
          var n = 0,
            r = t ? u.tweens.length : 0;
          if (i) return this;
          for (i = !0; r > n; n++) u.tweens[n].run(1);
          return t ? s.resolveWith(e, [u, t]) : s.rejectWith(e, [u, t]), this;
        },
      }),
      c = u.props;
    for (tr(c, u.opts.specialEasing); a > o; o++)
      if ((r = Gn[o].call(u, e, c, u.opts))) return r;
    return (
      x.map(c, Zn, u),
      x.isFunction(u.opts.start) && u.opts.start.call(e, u),
      x.fx.timer(x.extend(l, { elem: e, anim: u, queue: u.opts.queue })),
      u
        .progress(u.opts.progress)
        .done(u.opts.done, u.opts.complete)
        .fail(u.opts.fail)
        .always(u.opts.always)
    );
  }
  function tr(e, t) {
    var n, r, i, o, a;
    for (n in e)
      if (
        ((r = x.camelCase(n)),
        (i = t[r]),
        (o = e[n]),
        x.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
        n !== r && ((e[r] = o), delete e[n]),
        (a = x.cssHooks[r]),
        a && "expand" in a)
      ) {
        (o = a.expand(o)), delete e[r];
        for (n in o) n in e || ((e[n] = o[n]), (t[n] = i));
      } else t[r] = i;
  }
  x.Animation = x.extend(er, {
    tweener: function (e, t) {
      x.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.split(" "));
      var n,
        r = 0,
        i = e.length;
      for (; i > r; r++) (n = e[r]), (Qn[n] = Qn[n] || []), Qn[n].unshift(t);
    },
    prefilter: function (e, t) {
      t ? Gn.unshift(e) : Gn.push(e);
    },
  });
  function nr(e, t, n) {
    var r,
      i,
      o,
      a,
      s,
      l,
      u = this,
      c = {},
      p = e.style,
      f = e.nodeType && nn(e),
      d = x._data(e, "fxshow");
    n.queue ||
      ((s = x._queueHooks(e, "fx")),
      null == s.unqueued &&
        ((s.unqueued = 0),
        (l = s.empty.fire),
        (s.empty.fire = function () {
          s.unqueued || l();
        })),
      s.unqueued++,
      u.always(function () {
        u.always(function () {
          s.unqueued--, x.queue(e, "fx").length || s.empty.fire();
        });
      })),
      1 === e.nodeType &&
        ("height" in t || "width" in t) &&
        ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
        "inline" === x.css(e, "display") &&
          "none" === x.css(e, "float") &&
          (x.support.inlineBlockNeedsLayout && "inline" !== ln(e.nodeName)
            ? (p.zoom = 1)
            : (p.display = "inline-block"))),
      n.overflow &&
        ((p.overflow = "hidden"),
        x.support.shrinkWrapBlocks ||
          u.always(function () {
            (p.overflow = n.overflow[0]),
              (p.overflowX = n.overflow[1]),
              (p.overflowY = n.overflow[2]);
          }));
    for (r in t)
      if (((i = t[r]), Vn.exec(i))) {
        if (
          (delete t[r], (o = o || "toggle" === i), i === (f ? "hide" : "show"))
        )
          continue;
        c[r] = (d && d[r]) || x.style(e, r);
      }
    if (!x.isEmptyObject(c)) {
      d ? "hidden" in d && (f = d.hidden) : (d = x._data(e, "fxshow", {})),
        o && (d.hidden = !f),
        f
          ? x(e).show()
          : u.done(function () {
              x(e).hide();
            }),
        u.done(function () {
          var t;
          x._removeData(e, "fxshow");
          for (t in c) x.style(e, t, c[t]);
        });
      for (r in c)
        (a = Zn(f ? d[r] : 0, r, u)),
          r in d ||
            ((d[r] = a.start),
            f &&
              ((a.end = a.start),
              (a.start = "width" === r || "height" === r ? 1 : 0)));
    }
  }
  function rr(e, t, n, r, i) {
    return new rr.prototype.init(e, t, n, r, i);
  }
  (x.Tween = rr),
    (rr.prototype = {
      constructor: rr,
      init: function (e, t, n, r, i, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = i || "swing"),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = r),
          (this.unit = o || (x.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = rr.propHooks[this.prop];
        return e && e.get ? e.get(this) : rr.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = rr.propHooks[this.prop];
        return (
          (this.pos = t =
            this.options.duration
              ? x.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                )
              : e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : rr.propHooks._default.set(this),
          this
        );
      },
    }),
    (rr.prototype.init.prototype = rr.prototype),
    (rr.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return null == e.elem[e.prop] ||
            (e.elem.style && null != e.elem.style[e.prop])
            ? ((t = x.css(e.elem, e.prop, "")), t && "auto" !== t ? t : 0)
            : e.elem[e.prop];
        },
        set: function (e) {
          x.fx.step[e.prop]
            ? x.fx.step[e.prop](e)
            : e.elem.style &&
              (null != e.elem.style[x.cssProps[e.prop]] || x.cssHooks[e.prop])
            ? x.style(e.elem, e.prop, e.now + e.unit)
            : (e.elem[e.prop] = e.now);
        },
      },
    }),
    (rr.propHooks.scrollTop = rr.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    x.each(["toggle", "show", "hide"], function (e, t) {
      var n = x.fn[t];
      x.fn[t] = function (e, r, i) {
        return null == e || "boolean" == typeof e
          ? n.apply(this, arguments)
          : this.animate(ir(t, !0), e, r, i);
      };
    }),
    x.fn.extend({
      fadeTo: function (e, t, n, r) {
        return this.filter(nn)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, r);
      },
      animate: function (e, t, n, r) {
        var i = x.isEmptyObject(e),
          o = x.speed(t, n, r),
          a = function () {
            var t = er(this, x.extend({}, e), o);
            (i || x._data(this, "finish")) && t.stop(!0);
          };
        return (
          (a.finish = a),
          i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
        );
      },
      stop: function (e, n, r) {
        var i = function (e) {
          var t = e.stop;
          delete e.stop, t(r);
        };
        return (
          "string" != typeof e && ((r = n), (n = e), (e = t)),
          n && e !== !1 && this.queue(e || "fx", []),
          this.each(function () {
            var t = !0,
              n = null != e && e + "queueHooks",
              o = x.timers,
              a = x._data(this);
            if (n) a[n] && a[n].stop && i(a[n]);
            else for (n in a) a[n] && a[n].stop && Jn.test(n) && i(a[n]);
            for (n = o.length; n--; )
              o[n].elem !== this ||
                (null != e && o[n].queue !== e) ||
                (o[n].anim.stop(r), (t = !1), o.splice(n, 1));
            (t || !r) && x.dequeue(this, e);
          })
        );
      },
      finish: function (e) {
        return (
          e !== !1 && (e = e || "fx"),
          this.each(function () {
            var t,
              n = x._data(this),
              r = n[e + "queue"],
              i = n[e + "queueHooks"],
              o = x.timers,
              a = r ? r.length : 0;
            for (
              n.finish = !0,
                x.queue(this, e, []),
                i && i.stop && i.stop.call(this, !0),
                t = o.length;
              t--;

            )
              o[t].elem === this &&
                o[t].queue === e &&
                (o[t].anim.stop(!0), o.splice(t, 1));
            for (t = 0; a > t; t++)
              r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish;
          })
        );
      },
    });
  function ir(e, t) {
    var n,
      r = { height: e },
      i = 0;
    for (t = t ? 1 : 0; 4 > i; i += 2 - t)
      (n = Zt[i]), (r["margin" + n] = r["padding" + n] = e);
    return t && (r.opacity = r.width = e), r;
  }
  x.each(
    {
      slideDown: ir("show"),
      slideUp: ir("hide"),
      slideToggle: ir("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" },
    },
    function (e, t) {
      x.fn[e] = function (e, n, r) {
        return this.animate(t, e, n, r);
      };
    }
  ),
    (x.speed = function (e, t, n) {
      var r =
        e && "object" == typeof e
          ? x.extend({}, e)
          : {
              complete: n || (!n && t) || (x.isFunction(e) && e),
              duration: e,
              easing: (n && t) || (t && !x.isFunction(t) && t),
            };
      return (
        (r.duration = x.fx.off
          ? 0
          : "number" == typeof r.duration
          ? r.duration
          : r.duration in x.fx.speeds
          ? x.fx.speeds[r.duration]
          : x.fx.speeds._default),
        (null == r.queue || r.queue === !0) && (r.queue = "fx"),
        (r.old = r.complete),
        (r.complete = function () {
          x.isFunction(r.old) && r.old.call(this),
            r.queue && x.dequeue(this, r.queue);
        }),
        r
      );
    }),
    (x.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
    }),
    (x.timers = []),
    (x.fx = rr.prototype.init),
    (x.fx.tick = function () {
      var e,
        n = x.timers,
        r = 0;
      for (Xn = x.now(); n.length > r; r++)
        (e = n[r]), e() || n[r] !== e || n.splice(r--, 1);
      n.length || x.fx.stop(), (Xn = t);
    }),
    (x.fx.timer = function (e) {
      e() && x.timers.push(e) && x.fx.start();
    }),
    (x.fx.interval = 13),
    (x.fx.start = function () {
      Un || (Un = setInterval(x.fx.tick, x.fx.interval));
    }),
    (x.fx.stop = function () {
      clearInterval(Un), (Un = null);
    }),
    (x.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (x.fx.step = {}),
    x.expr &&
      x.expr.filters &&
      (x.expr.filters.animated = function (e) {
        return x.grep(x.timers, function (t) {
          return e === t.elem;
        }).length;
      }),
    (x.fn.offset = function (e) {
      if (arguments.length)
        return e === t
          ? this
          : this.each(function (t) {
              x.offset.setOffset(this, e, t);
            });
      var n,
        r,
        o = { top: 0, left: 0 },
        a = this[0],
        s = a && a.ownerDocument;
      if (s)
        return (
          (n = s.documentElement),
          x.contains(n, a)
            ? (typeof a.getBoundingClientRect !== i &&
                (o = a.getBoundingClientRect()),
              (r = or(s)),
              {
                top:
                  o.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                left:
                  o.left +
                  (r.pageXOffset || n.scrollLeft) -
                  (n.clientLeft || 0),
              })
            : o
        );
    }),
    (x.offset = {
      setOffset: function (e, t, n) {
        var r = x.css(e, "position");
        "static" === r && (e.style.position = "relative");
        var i = x(e),
          o = i.offset(),
          a = x.css(e, "top"),
          s = x.css(e, "left"),
          l =
            ("absolute" === r || "fixed" === r) &&
            x.inArray("auto", [a, s]) > -1,
          u = {},
          c = {},
          p,
          f;
        l
          ? ((c = i.position()), (p = c.top), (f = c.left))
          : ((p = parseFloat(a) || 0), (f = parseFloat(s) || 0)),
          x.isFunction(t) && (t = t.call(e, n, o)),
          null != t.top && (u.top = t.top - o.top + p),
          null != t.left && (u.left = t.left - o.left + f),
          "using" in t ? t.using.call(e, u) : i.css(u);
      },
    }),
    x.fn.extend({
      position: function () {
        if (this[0]) {
          var e,
            t,
            n = { top: 0, left: 0 },
            r = this[0];
          return (
            "fixed" === x.css(r, "position")
              ? (t = r.getBoundingClientRect())
              : ((e = this.offsetParent()),
                (t = this.offset()),
                x.nodeName(e[0], "html") || (n = e.offset()),
                (n.top += x.css(e[0], "borderTopWidth", !0)),
                (n.left += x.css(e[0], "borderLeftWidth", !0))),
            {
              top: t.top - n.top - x.css(r, "marginTop", !0),
              left: t.left - n.left - x.css(r, "marginLeft", !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          var e = this.offsetParent || s;
          while (
            e &&
            !x.nodeName(e, "html") &&
            "static" === x.css(e, "position")
          )
            e = e.offsetParent;
          return e || s;
        });
      },
    }),
    x.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (e, n) {
        var r = /Y/.test(n);
        x.fn[e] = function (i) {
          return x.access(
            this,
            function (e, i, o) {
              var a = or(e);
              return o === t
                ? a
                  ? n in a
                    ? a[n]
                    : a.document.documentElement[i]
                  : e[i]
                : (a
                    ? a.scrollTo(
                        r ? x(a).scrollLeft() : o,
                        r ? o : x(a).scrollTop()
                      )
                    : (e[i] = o),
                  t);
            },
            e,
            i,
            arguments.length,
            null
          );
        };
      }
    );
  function or(e) {
    return x.isWindow(e)
      ? e
      : 9 === e.nodeType
      ? e.defaultView || e.parentWindow
      : !1;
  }
  x.each({ Height: "height", Width: "width" }, function (e, n) {
    x.each(
      { padding: "inner" + e, content: n, "": "outer" + e },
      function (r, i) {
        x.fn[i] = function (i, o) {
          var a = arguments.length && (r || "boolean" != typeof i),
            s = r || (i === !0 || o === !0 ? "margin" : "border");
          return x.access(
            this,
            function (n, r, i) {
              var o;
              return x.isWindow(n)
                ? n.document.documentElement["client" + e]
                : 9 === n.nodeType
                ? ((o = n.documentElement),
                  Math.max(
                    n.body["scroll" + e],
                    o["scroll" + e],
                    n.body["offset" + e],
                    o["offset" + e],
                    o["client" + e]
                  ))
                : i === t
                ? x.css(n, r, s)
                : x.style(n, r, i, s);
            },
            n,
            a ? i : t,
            a,
            null
          );
        };
      }
    );
  }),
    (x.fn.size = function () {
      return this.length;
    }),
    (x.fn.andSelf = x.fn.addBack),
    "object" == typeof module && module && "object" == typeof module.exports
      ? (module.exports = x)
      : ((e.jQuery = e.$ = x),
        "function" == typeof define &&
          define.amd &&
          define("jquery", [], function () {
            return x;
          }));
})(window); /*})'"*/ /*})'"*/
/**
 * For jQuery versions less than 3.4.0, this replaces the jQuery.extend
 * function with the one from jQuery 3.4.0, slightly modified (documented
 * below) to be compatible with older jQuery versions and browsers.
 *
 * This provides the Object.prototype pollution vulnerability fix to Drupal
 * installations running older jQuery versions, including the versions shipped
 * with Drupal core and https://www.drupal.org/project/jquery_update.
 *
 * @see https://github.com/jquery/jquery/pull/4333
 */

(function (jQuery) {
  // Do not override jQuery.extend() if the jQuery version is already >=3.4.0.
  var versionParts = jQuery.fn.jquery.split(".");
  var majorVersion = parseInt(versionParts[0]);
  var minorVersion = parseInt(versionParts[1]);
  var patchVersion = parseInt(versionParts[2]);
  var isPreReleaseVersion = patchVersion.toString() !== versionParts[2];
  if (
    majorVersion > 3 ||
    (majorVersion === 3 && minorVersion > 4) ||
    (majorVersion === 3 && minorVersion === 4 && patchVersion > 0) ||
    (majorVersion === 3 &&
      minorVersion === 4 &&
      patchVersion === 0 &&
      !isPreReleaseVersion)
  ) {
    return;
  }

  /**
   * This is almost verbatim copied from jQuery 3.4.0.
   *
   * Only two minor changes have been made:
   * - The call to isFunction() is changed to jQuery.isFunction().
   * - The two calls to Array.isArray() is changed to jQuery.isArray().
   *
   * The above two changes ensure compatibility with all older jQuery versions
   * (1.4.4 - 3.3.1) and older browser versions (e.g., IE8).
   */
  jQuery.extend = jQuery.fn.extend = function () {
    var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          copy = options[name];

          // Prevent Object.prototype pollution
          // Prevent never-ending loop
          if (name === "__proto__" || target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (
            deep &&
            copy &&
            (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))
          ) {
            src = target[name];

            // Ensure proper type for the source value
            if (copyIsArray && !jQuery.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }
            copyIsArray = false;

            // Never move original objects, clone them
            target[name] = jQuery.extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };
})(jQuery); /*})'"*/ /*})'"*/
/**
 * For jQuery versions less than 3.5.0, this replaces the jQuery.htmlPrefilter()
 * function with one that fixes these security vulnerabilities while also
 * retaining the pre-3.5.0 behavior where it's safe to do so.
 * - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11022
 * - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11023
 *
 * Additionally, for jQuery versions that do not have a jQuery.htmlPrefilter()
 * function (1.x prior to 1.12 and 2.x prior to 2.2), this adds it, and
 * extends the functions that need to call it to do so.
 *
 * Drupal core's jQuery version is 1.4.4, but jQuery Update can provide a
 * different version, so this covers all versions between 1.4.4 and 3.4.1.
 * The GitHub links in the code comments below link to jQuery 1.5 code, because
 * 1.4.4 isn't on GitHub, but the referenced code didn't change from 1.4.4 to
 * 1.5.
 */

(function (jQuery) {
  // Parts of this backport differ by jQuery version.
  var versionParts = jQuery.fn.jquery.split(".");
  var majorVersion = parseInt(versionParts[0]);
  var minorVersion = parseInt(versionParts[1]);

  // No backport is needed if we're already on jQuery 3.5 or higher.
  if (majorVersion > 3 || (majorVersion === 3 && minorVersion >= 5)) {
    return;
  }

  // Prior to jQuery 3.5, jQuery converted XHTML-style self-closing tags to
  // their XML equivalent: e.g., "<div />" to "<div></div>". This is
  // problematic for several reasons, including that it's vulnerable to XSS
  // attacks. However, since this was jQuery's behavior for many years, many
  // Drupal modules and jQuery plugins may be relying on it. Therefore, we
  // preserve that behavior, but for a limited set of tags only, that we believe
  // to not be vulnerable. This is the set of HTML tags that satisfy all of the
  // following conditions:
  // - In DOMPurify's list of HTML tags. If an HTML tag isn't safe enough to
  //   appear in that list, then we don't want to mess with it here either.
  //   @see https://github.com/cure53/DOMPurify/blob/2.0.11/dist/purify.js#L128
  // - A normal element (not a void, template, text, or foreign element).
  //   @see https://html.spec.whatwg.org/multipage/syntax.html#elements-2
  // - An element that is still defined by the current HTML specification
  //   (not a deprecated element), because we do not want to rely on how
  //   browsers parse deprecated elements.
  //   @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
  // - Not 'html', 'head', or 'body', because this pseudo-XHTML expansion is
  //   designed for fragments, not entire documents.
  // - Not 'colgroup', because due to an idiosyncrasy of jQuery's original
  //   regular expression, it didn't match on colgroup, and we don't want to
  //   introduce a behavior change for that.
  var selfClosingTagsToReplace = [
    "a",
    "abbr",
    "address",
    "article",
    "aside",
    "audio",
    "b",
    "bdi",
    "bdo",
    "blockquote",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "div",
    "dl",
    "dt",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "i",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "map",
    "mark",
    "menu",
    "meter",
    "nav",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "u",
    "ul",
    "var",
    "video",
  ];

  // Define regular expressions for <TAG/> and <TAG ATTRIBUTES/>. Doing this as
  // two expressions makes it easier to target <a/> without also targeting
  // every tag that starts with "a".
  var xhtmlRegExpGroup = "(" + selfClosingTagsToReplace.join("|") + ")";
  var whitespace = "[\\x20\\t\\r\\n\\f]";
  var rxhtmlTagWithoutSpaceOrAttributes = new RegExp(
    "<" + xhtmlRegExpGroup + "\\/>",
    "gi"
  );
  var rxhtmlTagWithSpaceAndMaybeAttributes = new RegExp(
    "<" + xhtmlRegExpGroup + "(" + whitespace + "[^>]*)\\/>",
    "gi"
  );

  // jQuery 3.5 also fixed a vulnerability for when </select> appears within
  // an <option> or <optgroup>, but it did that in local code that we can't
  // backport directly. Instead, we filter such cases out. To do so, we need to
  // determine when jQuery would otherwise invoke the vulnerable code, which it
  // uses this regular expression to determine. The regular expression changed
  // for version 3.0.0 and changed again for 3.4.0.
  // @see https://github.com/jquery/jquery/blob/1.5/jquery.js#L4958
  // @see https://github.com/jquery/jquery/blob/3.0.0/dist/jquery.js#L4584
  // @see https://github.com/jquery/jquery/blob/3.4.0/dist/jquery.js#L4712
  var rtagName;
  if (majorVersion < 3) {
    rtagName = /<([\w:]+)/;
  } else if (minorVersion < 4) {
    rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i;
  } else {
    rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
  }

  // The regular expression that jQuery uses to determine which self-closing
  // tags to expand to open and close tags. This is vulnerable, because it
  // matches all tag names except the few excluded ones. We only use this
  // expression for determining vulnerability. The expression changed for
  // version 3, but we only need to check for vulnerability in versions 1 and 2,
  // so we use the expression from those versions.
  // @see https://github.com/jquery/jquery/blob/1.5/jquery.js#L4957
  var rxhtmlTag =
    /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;

  jQuery.extend({
    htmlPrefilter: function (html) {
      // This is how jQuery determines the first tag in the HTML.
      // @see https://github.com/jquery/jquery/blob/1.5/jquery.js#L5521
      var tag = (rtagName.exec(html) || ["", ""])[1].toLowerCase();

      // It is not valid HTML for <option> or <optgroup> to have <select> as
      // either a descendant or sibling, and attempts to inject one can cause
      // XSS on jQuery versions before 3.5. Since this is invalid HTML and a
      // possible XSS attack, reject the entire string.
      // @see https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11023
      if (
        (tag === "option" || tag === "optgroup") &&
        html.match(/<\/?select/i)
      ) {
        html = "";
      }

      // Retain jQuery's prior to 3.5 conversion of pseudo-XHTML, but for only
      // the tags in the `selfClosingTagsToReplace` list defined above.
      // @see https://github.com/jquery/jquery/blob/1.5/jquery.js#L5518
      // @see https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-11022
      html = html.replace(rxhtmlTagWithoutSpaceOrAttributes, "<$1></$1>");
      html = html.replace(rxhtmlTagWithSpaceAndMaybeAttributes, "<$1$2></$1>");

      // Prior to jQuery 1.12 and 2.2, this function gets called (via code later
      // in this file) in addition to, rather than instead of, the unsafe
      // expansion of self-closing tags (including ones not in the list above).
      // We can't prevent that unsafe expansion from running, so instead we
      // check to make sure that it doesn't affect the DOM returned by the
      // browser's parsing logic. If it does affect it, then it's vulnerable to
      // XSS, so we reject the entire string.
      if (
        (majorVersion === 1 && minorVersion < 12) ||
        (majorVersion === 2 && minorVersion < 2)
      ) {
        var htmlRisky = html.replace(rxhtmlTag, "<$1></$2>");
        if (htmlRisky !== html) {
          // Even though htmlRisky and html are different strings, they might
          // represent the same HTML structure once parsed, in which case,
          // htmlRisky is actually safe. We can ask the browser to parse both
          // to find out, but the browser can't parse table fragments (e.g., a
          // root-level "<td>"), so we need to wrap them. We just need this
          // technique to work on all supported browsers; we don't need to
          // copy from the specific jQuery version we're using.
          // @see https://github.com/jquery/jquery/blob/3.5.1/dist/jquery.js#L4939
          var wrapMap = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          };
          wrapMap.tbody =
            wrapMap.tfoot =
            wrapMap.colgroup =
            wrapMap.caption =
              wrapMap.thead;
          wrapMap.th = wrapMap.td;

          // Function to wrap HTML into something that a browser can parse.
          // @see https://github.com/jquery/jquery/blob/3.5.1/dist/jquery.js#L5032
          var getWrappedHtml = function (html) {
            var wrap = wrapMap[tag];
            if (wrap) {
              html = wrap[1] + html + wrap[2];
            }
            return html;
          };

          // Function to return canonical HTML after parsing it. This parses
          // only; it doesn't execute scripts.
          // @see https://github.com/jquery/jquery-migrate/blob/3.3.0/src/jquery/manipulation.js#L5
          var getParsedHtml = function (html) {
            var doc = window.document.implementation.createHTMLDocument("");
            doc.body.innerHTML = html;
            return doc.body ? doc.body.innerHTML : "";
          };

          // If the browser couldn't parse either one successfully, or if
          // htmlRisky parses differently than html, then html is vulnerable,
          // so reject it.
          var htmlParsed = getParsedHtml(getWrappedHtml(html));
          var htmlRiskyParsed = getParsedHtml(getWrappedHtml(htmlRisky));
          if (
            htmlRiskyParsed === "" ||
            htmlParsed === "" ||
            htmlRiskyParsed !== htmlParsed
          ) {
            html = "";
          }
        }
      }

      return html;
    },
  });

  // Prior to jQuery 1.12 and 2.2, jQuery.clean(), jQuery.buildFragment(), and
  // jQuery.fn.html() did not call jQuery.htmlPrefilter(), so we add that.
  if (
    (majorVersion === 1 && minorVersion < 12) ||
    (majorVersion === 2 && minorVersion < 2)
  ) {
    // Filter the HTML coming into jQuery.fn.html().
    var fnOriginalHtml = jQuery.fn.html;
    jQuery.fn.extend({
      // @see https://github.com/jquery/jquery/blob/1.5/jquery.js#L5147
      html: function (value) {
        if (typeof value === "string") {
          value = jQuery.htmlPrefilter(value);
        }
        // .html() can be called as a setter (with an argument) or as a getter
        // (without an argument), so invoke fnOriginalHtml() the same way that
        // we were invoked.
        return fnOriginalHtml.apply(this, arguments.length ? [value] : []);
      },
    });

    // The regular expression that jQuery uses to determine if a string is HTML.
    // Used by both clean() and buildFragment().
    // @see https://github.com/jquery/jquery/blob/1.5/jquery.js#L4960
    var rhtml = /<|&#?\w+;/;

    // Filter HTML coming into:
    // - jQuery.clean() for versions prior to 1.9.
    // - jQuery.buildFragment() for 1.9 and above.
    //
    // The looping constructs in the two functions might be essentially
    // identical, but they're each expressed here in the way that most closely
    // matches their original expression in jQuery, so that we filter all of
    // the items and only the items that jQuery will treat as HTML strings.
    if (majorVersion === 1 && minorVersion < 9) {
      var originalClean = jQuery.clean;
      jQuery.extend({
        // @see https://github.com/jquery/jquery/blob/1.5/jquery.js#L5493
        clean: function (elems, context, fragment, scripts) {
          for (var i = 0, elem; (elem = elems[i]) != null; i++) {
            if (typeof elem === "string" && rhtml.test(elem)) {
              elems[i] = elem = jQuery.htmlPrefilter(elem);
            }
          }
          return originalClean.call(this, elems, context, fragment, scripts);
        },
      });
    } else {
      var originalBuildFragment = jQuery.buildFragment;
      jQuery.extend({
        // @see https://github.com/jquery/jquery/blob/1.9.0/jquery.js#L6419
        buildFragment: function (elems, context, scripts, selection) {
          var l = elems.length;
          for (var i = 0; i < l; i++) {
            var elem = elems[i];
            if (elem || elem === 0) {
              if (jQuery.type(elem) !== "object" && rhtml.test(elem)) {
                elems[i] = elem = jQuery.htmlPrefilter(elem);
              }
            }
          }
          return originalBuildFragment.call(
            this,
            elems,
            context,
            scripts,
            selection
          );
        },
      });
    }
  }
})(jQuery); /*})'"*/ /*})'"*/
/**
 * jQuery Once Plugin v1.2
 * http://plugins.jquery.com/project/once
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function ($) {
  var cache = {},
    uuid = 0;

  /**
   * Filters elements by whether they have not yet been processed.
   *
   * @param id
   *   (Optional) If this is a string, then it will be used as the CSS class
   *   name that is applied to the elements for determining whether it has
   *   already been processed. The elements will get a class in the form of
   *   "id-processed".
   *
   *   If the id parameter is a function, it will be passed off to the fn
   *   parameter and the id will become a unique identifier, represented as a
   *   number.
   *
   *   When the id is neither a string or a function, it becomes a unique
   *   identifier, depicted as a number. The element's class will then be
   *   represented in the form of "jquery-once-#-processed".
   *
   *   Take note that the id must be valid for usage as an element's class name.
   * @param fn
   *   (Optional) If given, this function will be called for each element that
   *   has not yet been processed. The function's return value follows the same
   *   logic as $.each(). Returning true will continue to the next matched
   *   element in the set, while returning false will entirely break the
   *   iteration.
   */
  $.fn.once = function (id, fn) {
    if (typeof id != "string") {
      // Generate a numeric ID if the id passed can't be used as a CSS class.
      if (!(id in cache)) {
        cache[id] = ++uuid;
      }
      // When the fn parameter is not passed, we interpret it from the id.
      if (!fn) {
        fn = id;
      }
      id = "jquery-once-" + cache[id];
    }
    // Remove elements from the set that have already been processed.
    var name = id + "-processed";
    var elements = this.not("." + name).addClass(name);

    return $.isFunction(fn) ? elements.each(fn) : elements;
  };

  /**
   * Filters elements that have been processed once already.
   *
   * @param id
   *   A required string representing the name of the class which should be used
   *   when filtering the elements. This only filters elements that have already
   *   been processed by the once function. The id should be the same id that
   *   was originally passed to the once() function.
   * @param fn
   *   (Optional) If given, this function will be called for each element that
   *   has not yet been processed. The function's return value follows the same
   *   logic as $.each(). Returning true will continue to the next matched
   *   element in the set, while returning false will entirely break the
   *   iteration.
   */
  $.fn.removeOnce = function (id, fn) {
    var name = id + "-processed";
    var elements = this.filter("." + name).removeClass(name);

    return $.isFunction(fn) ? elements.each(fn) : elements;
  };
})(jQuery); /*})'"*/ /*})'"*/
var Drupal = Drupal || { settings: {}, behaviors: {}, locale: {} };

// Allow other JavaScript libraries to use $.
jQuery.noConflict();

(function ($) {
  /**
   * Override jQuery.fn.init to guard against XSS attacks.
   *
   * See http://bugs.jquery.com/ticket/9521
   */
  var jquery_init = $.fn.init;
  $.fn.init = function (selector, context, rootjQuery) {
    // If the string contains a "#" before a "<", treat it as invalid HTML.
    if (selector && typeof selector === "string") {
      var hash_position = selector.indexOf("#");
      if (hash_position >= 0) {
        var bracket_position = selector.indexOf("<");
        if (bracket_position > hash_position) {
          throw "Syntax error, unrecognized expression: " + selector;
        }
      }
    }
    return jquery_init.call(this, selector, context, rootjQuery);
  };
  $.fn.init.prototype = jquery_init.prototype;

  /**
   * Pre-filter Ajax requests to guard against XSS attacks.
   *
   * See https://github.com/jquery/jquery/issues/2432
   */
  if ($.ajaxPrefilter) {
    // For newer versions of jQuery, use an Ajax prefilter to prevent
    // auto-executing script tags from untrusted domains. This is similar to the
    // fix that is built in to jQuery 3.0 and higher.
    $.ajaxPrefilter(function (s) {
      if (s.crossDomain) {
        s.contents.script = false;
      }
    });
  } else if ($.httpData) {
    // For the version of jQuery that ships with Drupal core, override
    // jQuery.httpData to prevent auto-detecting "script" data types from
    // untrusted domains.
    var jquery_httpData = $.httpData;
    $.httpData = function (xhr, type, s) {
      // @todo Consider backporting code from newer jQuery versions to check for
      //   a cross-domain request here, rather than using Drupal.urlIsLocal() to
      //   block scripts from all URLs that are not on the same site.
      if (!type && !Drupal.urlIsLocal(s.url)) {
        var content_type = xhr.getResponseHeader("content-type") || "";
        if (content_type.indexOf("javascript") >= 0) {
          // Default to a safe data type.
          type = "text";
        }
      }
      return jquery_httpData.call(this, xhr, type, s);
    };
    $.httpData.prototype = jquery_httpData.prototype;
  }

  /**
   * Attach all registered behaviors to a page element.
   *
   * Behaviors are event-triggered actions that attach to page elements, enhancing
   * default non-JavaScript UIs. Behaviors are registered in the Drupal.behaviors
   * object using the method 'attach' and optionally also 'detach' as follows:
   * @code
   *    Drupal.behaviors.behaviorName = {
   *      attach: function (context, settings) {
   *        ...
   *      },
   *      detach: function (context, settings, trigger) {
   *        ...
   *      }
   *    };
   * @endcode
   *
   * Drupal.attachBehaviors is added below to the jQuery ready event and so
   * runs on initial page load. Developers implementing AHAH/Ajax in their
   * solutions should also call this function after new page content has been
   * loaded, feeding in an element to be processed, in order to attach all
   * behaviors to the new content.
   *
   * Behaviors should use
   * @code
   *   $(selector).once('behavior-name', function () {
   *     ...
   *   });
   * @endcode
   * to ensure the behavior is attached only once to a given element. (Doing so
   * enables the reprocessing of given elements, which may be needed on occasion
   * despite the ability to limit behavior attachment to a particular element.)
   *
   * @param context
   *   An element to attach behaviors to. If none is given, the document element
   *   is used.
   * @param settings
   *   An object containing settings for the current context. If none given, the
   *   global Drupal.settings object is used.
   */
  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || Drupal.settings;
    // Execute all of them.
    $.each(Drupal.behaviors, function () {
      if ($.isFunction(this.attach)) {
        this.attach(context, settings);
      }
    });
  };

  /**
   * Detach registered behaviors from a page element.
   *
   * Developers implementing AHAH/Ajax in their solutions should call this
   * function before page content is about to be removed, feeding in an element
   * to be processed, in order to allow special behaviors to detach from the
   * content.
   *
   * Such implementations should look for the class name that was added in their
   * corresponding Drupal.behaviors.behaviorName.attach implementation, i.e.
   * behaviorName-processed, to ensure the behavior is detached only from
   * previously processed elements.
   *
   * @param context
   *   An element to detach behaviors from. If none is given, the document element
   *   is used.
   * @param settings
   *   An object containing settings for the current context. If none given, the
   *   global Drupal.settings object is used.
   * @param trigger
   *   A string containing what's causing the behaviors to be detached. The
   *   possible triggers are:
   *   - unload: (default) The context element is being removed from the DOM.
   *   - move: The element is about to be moved within the DOM (for example,
   *     during a tabledrag row swap). After the move is completed,
   *     Drupal.attachBehaviors() is called, so that the behavior can undo
   *     whatever it did in response to the move. Many behaviors won't need to
   *     do anything simply in response to the element being moved, but because
   *     IFRAME elements reload their "src" when being moved within the DOM,
   *     behaviors bound to IFRAME elements (like WYSIWYG editors) may need to
   *     take some action.
   *   - serialize: When an Ajax form is submitted, this is called with the
   *     form as the context. This provides every behavior within the form an
   *     opportunity to ensure that the field elements have correct content
   *     in them before the form is serialized. The canonical use-case is so
   *     that WYSIWYG editors can update the hidden textarea to which they are
   *     bound.
   *
   * @see Drupal.attachBehaviors
   */
  Drupal.detachBehaviors = function (context, settings, trigger) {
    context = context || document;
    settings = settings || Drupal.settings;
    trigger = trigger || "unload";
    // Execute all of them.
    $.each(Drupal.behaviors, function () {
      if ($.isFunction(this.detach)) {
        this.detach(context, settings, trigger);
      }
    });
  };

  /**
   * Encode special characters in a plain-text string for display as HTML.
   *
   * @ingroup sanitization
   */
  Drupal.checkPlain = function (str) {
    var character,
      regex,
      replace = {
        "&": "&amp;",
        "'": "&#39;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;",
      };
    str = String(str);
    for (character in replace) {
      if (replace.hasOwnProperty(character)) {
        regex = new RegExp(character, "g");
        str = str.replace(regex, replace[character]);
      }
    }
    return str;
  };

  /**
   * Replace placeholders with sanitized values in a string.
   *
   * @param str
   *   A string with placeholders.
   * @param args
   *   An object of replacements pairs to make. Incidences of any key in this
   *   array are replaced with the corresponding value. Based on the first
   *   character of the key, the value is escaped and/or themed:
   *    - !variable: inserted as is
   *    - @variable: escape plain text to HTML (Drupal.checkPlain)
   *    - %variable: escape text and theme as a placeholder for user-submitted
   *      content (checkPlain + Drupal.theme('placeholder'))
   *
   * @see Drupal.t()
   * @ingroup sanitization
   */
  Drupal.formatString = function (str, args) {
    // Transform arguments before inserting them.
    for (var key in args) {
      if (args.hasOwnProperty(key)) {
        switch (key.charAt(0)) {
          // Escaped only.
          case "@":
            args[key] = Drupal.checkPlain(args[key]);
            break;
          // Pass-through.
          case "!":
            break;
          // Escaped and placeholder.
          default:
            args[key] = Drupal.theme("placeholder", args[key]);
            break;
        }
      }
    }

    return Drupal.stringReplace(str, args, null);
  };

  /**
   * Replace substring.
   *
   * The longest keys will be tried first. Once a substring has been replaced,
   * its new value will not be searched again.
   *
   * @param {String} str
   *   A string with placeholders.
   * @param {Object} args
   *   Key-value pairs.
   * @param {Array|null} keys
   *   Array of keys from the "args".  Internal use only.
   *
   * @return {String}
   *   Returns the replaced string.
   */
  Drupal.stringReplace = function (str, args, keys) {
    if (str.length === 0) {
      return str;
    }

    // If the array of keys is not passed then collect the keys from the args.
    if (!$.isArray(keys)) {
      keys = [];
      for (var k in args) {
        if (args.hasOwnProperty(k)) {
          keys.push(k);
        }
      }

      // Order the keys by the character length. The shortest one is the first.
      keys.sort(function (a, b) {
        return a.length - b.length;
      });
    }

    if (keys.length === 0) {
      return str;
    }

    // Take next longest one from the end.
    var key = keys.pop();
    var fragments = str.split(key);

    if (keys.length) {
      for (var i = 0; i < fragments.length; i++) {
        // Process each fragment with a copy of remaining keys.
        fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
      }
    }

    return fragments.join(args[key]);
  };

  /**
   * Translate strings to the page language or a given language.
   *
   * See the documentation of the server-side t() function for further details.
   *
   * @param str
   *   A string containing the English string to translate.
   * @param args
   *   An object of replacements pairs to make after translation. Incidences
   *   of any key in this array are replaced with the corresponding value.
   *   See Drupal.formatString().
   *
   * @param options
   *   - 'context' (defaults to the empty context): The context the source string
   *     belongs to.
   *
   * @return
   *   The translated string.
   */
  Drupal.t = function (str, args, options) {
    options = options || {};
    options.context = options.context || "";

    // Fetch the localized version of the string.
    if (
      Drupal.locale.strings &&
      Drupal.locale.strings[options.context] &&
      Drupal.locale.strings[options.context][str]
    ) {
      str = Drupal.locale.strings[options.context][str];
    }

    if (args) {
      str = Drupal.formatString(str, args);
    }
    return str;
  };

  /**
   * Format a string containing a count of items.
   *
   * This function ensures that the string is pluralized correctly. Since Drupal.t() is
   * called by this function, make sure not to pass already-localized strings to it.
   *
   * See the documentation of the server-side format_plural() function for further details.
   *
   * @param count
   *   The item count to display.
   * @param singular
   *   The string for the singular case. Please make sure it is clear this is
   *   singular, to ease translation (e.g. use "1 new comment" instead of "1 new").
   *   Do not use @count in the singular string.
   * @param plural
   *   The string for the plural case. Please make sure it is clear this is plural,
   *   to ease translation. Use @count in place of the item count, as in "@count
   *   new comments".
   * @param args
   *   An object of replacements pairs to make after translation. Incidences
   *   of any key in this array are replaced with the corresponding value.
   *   See Drupal.formatString().
   *   Note that you do not need to include @count in this array.
   *   This replacement is done automatically for the plural case.
   * @param options
   *   The options to pass to the Drupal.t() function.
   * @return
   *   A translated string.
   */
  Drupal.formatPlural = function (count, singular, plural, args, options) {
    args = args || {};
    args["@count"] = count;
    // Determine the index of the plural form.
    var index = Drupal.locale.pluralFormula
      ? Drupal.locale.pluralFormula(args["@count"])
      : args["@count"] == 1
      ? 0
      : 1;

    if (index == 0) {
      return Drupal.t(singular, args, options);
    } else if (index == 1) {
      return Drupal.t(plural, args, options);
    } else {
      args["@count[" + index + "]"] = args["@count"];
      delete args["@count"];
      return Drupal.t(
        plural.replace("@count", "@count[" + index + "]"),
        args,
        options
      );
    }
  };

  /**
   * Returns the passed in URL as an absolute URL.
   *
   * @param url
   *   The URL string to be normalized to an absolute URL.
   *
   * @return
   *   The normalized, absolute URL.
   *
   * @see https://github.com/angular/angular.js/blob/v1.4.4/src/ng/urlUtils.js
   * @see https://grack.com/blog/2009/11/17/absolutizing-url-in-javascript
   * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L53
   */
  Drupal.absoluteUrl = function (url) {
    var urlParsingNode = document.createElement("a");

    // Decode the URL first; this is required by IE <= 6. Decoding non-UTF-8
    // strings may throw an exception.
    try {
      url = decodeURIComponent(url);
    } catch (e) {}

    urlParsingNode.setAttribute("href", url);

    // IE <= 7 normalizes the URL when assigned to the anchor node similar to
    // the other browsers.
    return urlParsingNode.cloneNode(false).href;
  };

  /**
   * Returns true if the URL is within Drupal's base path.
   *
   * @param url
   *   The URL string to be tested.
   *
   * @return
   *   Boolean true if local.
   *
   * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L58
   */
  Drupal.urlIsLocal = function (url) {
    // Always use browser-derived absolute URLs in the comparison, to avoid
    // attempts to break out of the base path using directory traversal.
    var absoluteUrl = Drupal.absoluteUrl(url);
    var protocol = location.protocol;

    // Consider URLs that match this site's base URL but use HTTPS instead of HTTP
    // as local as well.
    if (protocol === "http:" && absoluteUrl.indexOf("https:") === 0) {
      protocol = "https:";
    }
    var baseUrl =
      protocol + "//" + location.host + Drupal.settings.basePath.slice(0, -1);

    // Decoding non-UTF-8 strings may throw an exception.
    try {
      absoluteUrl = decodeURIComponent(absoluteUrl);
    } catch (e) {}
    try {
      baseUrl = decodeURIComponent(baseUrl);
    } catch (e) {}

    // The given URL matches the site's base URL, or has a path under the site's
    // base URL.
    return absoluteUrl === baseUrl || absoluteUrl.indexOf(baseUrl + "/") === 0;
  };

  /**
   * Sanitizes a URL for use with jQuery.ajax().
   *
   * @param url
   *   The URL string to be sanitized.
   *
   * @return
   *   The sanitized URL.
   */
  Drupal.sanitizeAjaxUrl = function (url) {
    var regex = /\=\?(&|$)/;
    while (url.match(regex)) {
      url = url.replace(regex, "");
    }
    return url;
  };

  /**
   * Generate the themed representation of a Drupal object.
   *
   * All requests for themed output must go through this function. It examines
   * the request and routes it to the appropriate theme function. If the current
   * theme does not provide an override function, the generic theme function is
   * called.
   *
   * For example, to retrieve the HTML for text that should be emphasized and
   * displayed as a placeholder inside a sentence, call
   * Drupal.theme('placeholder', text).
   *
   * @param func
   *   The name of the theme function to call.
   * @param ...
   *   Additional arguments to pass along to the theme function.
   * @return
   *   Any data the theme function returns. This could be a plain HTML string,
   *   but also a complex object.
   */
  Drupal.theme = function (func) {
    var args = Array.prototype.slice.apply(arguments, [1]);

    return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(
      this,
      args
    );
  };

  /**
   * Freeze the current body height (as minimum height). Used to prevent
   * unnecessary upwards scrolling when doing DOM manipulations.
   */
  Drupal.freezeHeight = function () {
    Drupal.unfreezeHeight();
    $('<div id="freeze-height"></div>')
      .css({
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "1px",
        height: $("body").css("height"),
      })
      .appendTo("body");
  };

  /**
   * Unfreeze the body height.
   */
  Drupal.unfreezeHeight = function () {
    $("#freeze-height").remove();
  };

  /**
   * Encodes a Drupal path for use in a URL.
   *
   * For aesthetic reasons slashes are not escaped.
   */
  Drupal.encodePath = function (item, uri) {
    uri = uri || location.href;
    return encodeURIComponent(item).replace(/%2F/g, "/");
  };

  /**
   * Get the text selection in a textarea.
   */
  Drupal.getSelection = function (element) {
    if (typeof element.selectionStart != "number" && document.selection) {
      // The current selection.
      var range1 = document.selection.createRange();
      var range2 = range1.duplicate();
      // Select all text.
      range2.moveToElementText(element);
      // Now move 'dummy' end point to end point of original range.
      range2.setEndPoint("EndToEnd", range1);
      // Now we can calculate start and end points.
      var start = range2.text.length - range1.text.length;
      var end = start + range1.text.length;
      return { start: start, end: end };
    }
    return { start: element.selectionStart, end: element.selectionEnd };
  };

  /**
   * Add a global variable which determines if the window is being unloaded.
   *
   * This is primarily used by Drupal.displayAjaxError().
   */
  Drupal.beforeUnloadCalled = false;
  $(window).bind("beforeunload pagehide", function () {
    Drupal.beforeUnloadCalled = true;
  });

  /**
   * Displays a JavaScript error from an Ajax response when appropriate to do so.
   */
  Drupal.displayAjaxError = function (message) {
    // Skip displaying the message if the user deliberately aborted (for example,
    // by reloading the page or navigating to a different page) while the Ajax
    // request was still ongoing. See, for example, the discussion at
    // http://stackoverflow.com/questions/699941/handle-ajax-error-when-a-user-clicks-refresh.
    if (!Drupal.beforeUnloadCalled) {
      alert(message);
    }
  };

  /**
   * Build an error message from an Ajax response.
   */
  Drupal.ajaxError = function (xmlhttp, uri, customMessage) {
    var statusCode, statusText, pathText, responseText, readyStateText, message;
    if (xmlhttp.status) {
      statusCode =
        "\n" +
        Drupal.t("An AJAX HTTP error occurred.") +
        "\n" +
        Drupal.t("HTTP Result Code: !status", { "!status": xmlhttp.status });
    } else {
      statusCode =
        "\n" + Drupal.t("An AJAX HTTP request terminated abnormally.");
    }
    statusCode += "\n" + Drupal.t("Debugging information follows.");
    pathText = "\n" + Drupal.t("Path: !uri", { "!uri": uri });
    statusText = "";
    // In some cases, when statusCode == 0, xmlhttp.statusText may not be defined.
    // Unfortunately, testing for it with typeof, etc, doesn't seem to catch that
    // and the test causes an exception. So we need to catch the exception here.
    try {
      statusText =
        "\n" +
        Drupal.t("StatusText: !statusText", {
          "!statusText": $.trim(xmlhttp.statusText),
        });
    } catch (e) {}

    responseText = "";
    // Again, we don't have a way to know for sure whether accessing
    // xmlhttp.responseText is going to throw an exception. So we'll catch it.
    try {
      responseText =
        "\n" +
        Drupal.t("ResponseText: !responseText", {
          "!responseText": $.trim(xmlhttp.responseText),
        });
    } catch (e) {}

    // Make the responseText more readable by stripping HTML tags and newlines.
    responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, "");
    responseText = responseText.replace(/[\n]+\s+/g, "\n");

    // We don't need readyState except for status == 0.
    readyStateText =
      xmlhttp.status == 0
        ? "\n" +
          Drupal.t("ReadyState: !readyState", {
            "!readyState": xmlhttp.readyState,
          })
        : "";

    // Additional message beyond what the xmlhttp object provides.
    customMessage = customMessage
      ? "\n" +
        Drupal.t("CustomMessage: !customMessage", {
          "!customMessage": customMessage,
        })
      : "";

    message =
      statusCode +
      pathText +
      statusText +
      customMessage +
      responseText +
      readyStateText;
    return message;
  };

  // Class indicating that JS is enabled; used for styling purpose.
  $("html").addClass("js");

  // 'js enabled' cookie.
  document.cookie = "has_js=1; path=/";

  /**
   * Additions to jQuery.support.
   */
  $(function () {
    /**
     * Boolean indicating whether or not position:fixed is supported.
     */
    if (jQuery.support.positionFixed === undefined) {
      var el = $('<div style="position:fixed; top:10px" />').appendTo(
        document.body
      );
      jQuery.support.positionFixed = el[0].offsetTop === 10;
      el.remove();
    }
  });

  //Attach all behaviors.
  $(function () {
    Drupal.attachBehaviors(document, Drupal.settings);
  });

  /**
   * The default themes.
   */
  Drupal.theme.prototype = {
    /**
     * Formats text for emphasized display in a placeholder inside a sentence.
     *
     * @param str
     *   The text to format (plain-text).
     * @return
     *   The formatted text (html).
     */
    placeholder: function (str) {
      return '<em class="placeholder">' + Drupal.checkPlain(str) + "</em>";
    },
  };
})(jQuery); /*})'"*/ /*})'"*/
/*! jQuery UI - v1.10.2 - 2013-03-14
 * http://jqueryui.com
 * Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function (e, t) {
  function i(t, i) {
    var a,
      n,
      r,
      o = t.nodeName.toLowerCase();
    return "area" === o
      ? ((a = t.parentNode),
        (n = a.name),
        t.href && n && "map" === a.nodeName.toLowerCase()
          ? ((r = e("img[usemap=#" + n + "]")[0]), !!r && s(r))
          : !1)
      : (/input|select|textarea|button|object/.test(o)
          ? !t.disabled
          : "a" === o
          ? t.href || i
          : i) && s(t);
  }
  function s(t) {
    return (
      e.expr.filters.visible(t) &&
      !e(t)
        .parents()
        .addBack()
        .filter(function () {
          return "hidden" === e.css(this, "visibility");
        }).length
    );
  }
  var a = 0,
    n = /^ui-id-\d+$/;
  (e.ui = e.ui || {}),
    e.extend(e.ui, {
      version: "1.10.2",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      },
    }),
    e.fn.extend({
      focus: (function (t) {
        return function (i, s) {
          return "number" == typeof i
            ? this.each(function () {
                var t = this;
                setTimeout(function () {
                  e(t).focus(), s && s.call(t);
                }, i);
              })
            : t.apply(this, arguments);
        };
      })(e.fn.focus),
      scrollParent: function () {
        var t;
        return (
          (t =
            (e.ui.ie && /(static|relative)/.test(this.css("position"))) ||
            /absolute/.test(this.css("position"))
              ? this.parents()
                  .filter(function () {
                    return (
                      /(relative|absolute|fixed)/.test(
                        e.css(this, "position")
                      ) &&
                      /(auto|scroll)/.test(
                        e.css(this, "overflow") +
                          e.css(this, "overflow-y") +
                          e.css(this, "overflow-x")
                      )
                    );
                  })
                  .eq(0)
              : this.parents()
                  .filter(function () {
                    return /(auto|scroll)/.test(
                      e.css(this, "overflow") +
                        e.css(this, "overflow-y") +
                        e.css(this, "overflow-x")
                    );
                  })
                  .eq(0)),
          /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        );
      },
      zIndex: function (i) {
        if (i !== t) return this.css("zIndex", i);
        if (this.length)
          for (var s, a, n = e(this[0]); n.length && n[0] !== document; ) {
            if (
              ((s = n.css("position")),
              ("absolute" === s || "relative" === s || "fixed" === s) &&
                ((a = parseInt(n.css("zIndex"), 10)), !isNaN(a) && 0 !== a))
            )
              return a;
            n = n.parent();
          }
        return 0;
      },
      uniqueId: function () {
        return this.each(function () {
          this.id || (this.id = "ui-id-" + ++a);
        });
      },
      removeUniqueId: function () {
        return this.each(function () {
          n.test(this.id) && e(this).removeAttr("id");
        });
      },
    }),
    e.extend(e.expr[":"], {
      data: e.expr.createPseudo
        ? e.expr.createPseudo(function (t) {
            return function (i) {
              return !!e.data(i, t);
            };
          })
        : function (t, i, s) {
            return !!e.data(t, s[3]);
          },
      focusable: function (t) {
        return i(t, !isNaN(e.attr(t, "tabindex")));
      },
      tabbable: function (t) {
        var s = e.attr(t, "tabindex"),
          a = isNaN(s);
        return (a || s >= 0) && i(t, !a);
      },
    }),
    e("<a>").outerWidth(1).jquery ||
      e.each(["Width", "Height"], function (i, s) {
        function a(t, i, s, a) {
          return (
            e.each(n, function () {
              (i -= parseFloat(e.css(t, "padding" + this)) || 0),
                s &&
                  (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0),
                a && (i -= parseFloat(e.css(t, "margin" + this)) || 0);
            }),
            i
          );
        }
        var n = "Width" === s ? ["Left", "Right"] : ["Top", "Bottom"],
          r = s.toLowerCase(),
          o = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight,
          };
        (e.fn["inner" + s] = function (i) {
          return i === t
            ? o["inner" + s].call(this)
            : this.each(function () {
                e(this).css(r, a(this, i) + "px");
              });
        }),
          (e.fn["outer" + s] = function (t, i) {
            return "number" != typeof t
              ? o["outer" + s].call(this, t)
              : this.each(function () {
                  e(this).css(r, a(this, t, !0, i) + "px");
                });
          });
      }),
    e.fn.addBack ||
      (e.fn.addBack = function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      }),
    e("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
      (e.fn.removeData = (function (t) {
        return function (i) {
          return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this);
        };
      })(e.fn.removeData)),
    (e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    (e.support.selectstart = "onselectstart" in document.createElement("div")),
    e.fn.extend({
      disableSelection: function () {
        return this.bind(
          (e.support.selectstart ? "selectstart" : "mousedown") +
            ".ui-disableSelection",
          function (e) {
            e.preventDefault();
          }
        );
      },
      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },
    }),
    e.extend(e.ui, {
      plugin: {
        add: function (t, i, s) {
          var a,
            n = e.ui[t].prototype;
          for (a in s)
            (n.plugins[a] = n.plugins[a] || []), n.plugins[a].push([i, s[a]]);
        },
        call: function (e, t, i) {
          var s,
            a = e.plugins[t];
          if (
            a &&
            e.element[0].parentNode &&
            11 !== e.element[0].parentNode.nodeType
          )
            for (s = 0; a.length > s; s++)
              e.options[a[s][0]] && a[s][1].apply(e.element, i);
        },
      },
      hasScroll: function (t, i) {
        if ("hidden" === e(t).css("overflow")) return !1;
        var s = i && "left" === i ? "scrollLeft" : "scrollTop",
          a = !1;
        return t[s] > 0 ? !0 : ((t[s] = 1), (a = t[s] > 0), (t[s] = 0), a);
      },
    });
})(jQuery); /*})'"*/ /*})'"*/
/*! jQuery UI - v1.10.2 - 2013-03-14
 * http://jqueryui.com
 * Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function (t, e) {
  var i = "ui-effects-";
  (t.effects = { effect: {} }),
    (function (t, e) {
      function i(t, e, i) {
        var s = u[e.type] || {};
        return null == t
          ? i || !e.def
            ? null
            : e.def
          : ((t = s.floor ? ~~t : parseFloat(t)),
            isNaN(t)
              ? e.def
              : s.mod
              ? (t + s.mod) % s.mod
              : 0 > t
              ? 0
              : t > s.max
              ? s.max
              : t);
      }
      function s(i) {
        var s = l(),
          n = (s._rgba = []);
        return (
          (i = i.toLowerCase()),
          f(h, function (t, a) {
            var o,
              r = a.re.exec(i),
              h = r && a.parse(r),
              l = a.space || "rgba";
            return h
              ? ((o = s[l](h)),
                (s[c[l].cache] = o[c[l].cache]),
                (n = s._rgba = o._rgba),
                !1)
              : e;
          }),
          n.length
            ? ("0,0,0,0" === n.join() && t.extend(n, a.transparent), s)
            : a[i]
        );
      }
      function n(t, e, i) {
        return (
          (i = (i + 1) % 1),
          1 > 6 * i
            ? t + 6 * (e - t) * i
            : 1 > 2 * i
            ? e
            : 2 > 3 * i
            ? t + 6 * (e - t) * (2 / 3 - i)
            : t
        );
      }
      var a,
        o =
          "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        r = /^([\-+])=\s*(\d+\.?\d*)/,
        h = [
          {
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (t) {
              return [t[1], t[2], t[3], t[4]];
            },
          },
          {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function (t) {
              return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
            },
          },
          {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function (t) {
              return [
                parseInt(t[1], 16),
                parseInt(t[2], 16),
                parseInt(t[3], 16),
              ];
            },
          },
          {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function (t) {
              return [
                parseInt(t[1] + t[1], 16),
                parseInt(t[2] + t[2], 16),
                parseInt(t[3] + t[3], 16),
              ];
            },
          },
          {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function (t) {
              return [t[1], t[2] / 100, t[3] / 100, t[4]];
            },
          },
        ],
        l = (t.Color = function (e, i, s, n) {
          return new t.Color.fn.parse(e, i, s, n);
        }),
        c = {
          rgba: {
            props: {
              red: { idx: 0, type: "byte" },
              green: { idx: 1, type: "byte" },
              blue: { idx: 2, type: "byte" },
            },
          },
          hsla: {
            props: {
              hue: { idx: 0, type: "degrees" },
              saturation: { idx: 1, type: "percent" },
              lightness: { idx: 2, type: "percent" },
            },
          },
        },
        u = {
          byte: { floor: !0, max: 255 },
          percent: { max: 1 },
          degrees: { mod: 360, floor: !0 },
        },
        d = (l.support = {}),
        p = t("<p>")[0],
        f = t.each;
      (p.style.cssText = "background-color:rgba(1,1,1,.5)"),
        (d.rgba = p.style.backgroundColor.indexOf("rgba") > -1),
        f(c, function (t, e) {
          (e.cache = "_" + t),
            (e.props.alpha = { idx: 3, type: "percent", def: 1 });
        }),
        (l.fn = t.extend(l.prototype, {
          parse: function (n, o, r, h) {
            if (n === e) return (this._rgba = [null, null, null, null]), this;
            (n.jquery || n.nodeType) && ((n = t(n).css(o)), (o = e));
            var u = this,
              d = t.type(n),
              p = (this._rgba = []);
            return (
              o !== e && ((n = [n, o, r, h]), (d = "array")),
              "string" === d
                ? this.parse(s(n) || a._default)
                : "array" === d
                ? (f(c.rgba.props, function (t, e) {
                    p[e.idx] = i(n[e.idx], e);
                  }),
                  this)
                : "object" === d
                ? (n instanceof l
                    ? f(c, function (t, e) {
                        n[e.cache] && (u[e.cache] = n[e.cache].slice());
                      })
                    : f(c, function (e, s) {
                        var a = s.cache;
                        f(s.props, function (t, e) {
                          if (!u[a] && s.to) {
                            if ("alpha" === t || null == n[t]) return;
                            u[a] = s.to(u._rgba);
                          }
                          u[a][e.idx] = i(n[t], e, !0);
                        }),
                          u[a] &&
                            0 > t.inArray(null, u[a].slice(0, 3)) &&
                            ((u[a][3] = 1), s.from && (u._rgba = s.from(u[a])));
                      }),
                  this)
                : e
            );
          },
          is: function (t) {
            var i = l(t),
              s = !0,
              n = this;
            return (
              f(c, function (t, a) {
                var o,
                  r = i[a.cache];
                return (
                  r &&
                    ((o = n[a.cache] || (a.to && a.to(n._rgba)) || []),
                    f(a.props, function (t, i) {
                      return null != r[i.idx] ? (s = r[i.idx] === o[i.idx]) : e;
                    })),
                  s
                );
              }),
              s
            );
          },
          _space: function () {
            var t = [],
              e = this;
            return (
              f(c, function (i, s) {
                e[s.cache] && t.push(i);
              }),
              t.pop()
            );
          },
          transition: function (t, e) {
            var s = l(t),
              n = s._space(),
              a = c[n],
              o = 0 === this.alpha() ? l("transparent") : this,
              r = o[a.cache] || a.to(o._rgba),
              h = r.slice();
            return (
              (s = s[a.cache]),
              f(a.props, function (t, n) {
                var a = n.idx,
                  o = r[a],
                  l = s[a],
                  c = u[n.type] || {};
                null !== l &&
                  (null === o
                    ? (h[a] = l)
                    : (c.mod &&
                        (l - o > c.mod / 2
                          ? (o += c.mod)
                          : o - l > c.mod / 2 && (o -= c.mod)),
                      (h[a] = i((l - o) * e + o, n))));
              }),
              this[n](h)
            );
          },
          blend: function (e) {
            if (1 === this._rgba[3]) return this;
            var i = this._rgba.slice(),
              s = i.pop(),
              n = l(e)._rgba;
            return l(
              t.map(i, function (t, e) {
                return (1 - s) * n[e] + s * t;
              })
            );
          },
          toRgbaString: function () {
            var e = "rgba(",
              i = t.map(this._rgba, function (t, e) {
                return null == t ? (e > 2 ? 1 : 0) : t;
              });
            return 1 === i[3] && (i.pop(), (e = "rgb(")), e + i.join() + ")";
          },
          toHslaString: function () {
            var e = "hsla(",
              i = t.map(this.hsla(), function (t, e) {
                return (
                  null == t && (t = e > 2 ? 1 : 0),
                  e && 3 > e && (t = Math.round(100 * t) + "%"),
                  t
                );
              });
            return 1 === i[3] && (i.pop(), (e = "hsl(")), e + i.join() + ")";
          },
          toHexString: function (e) {
            var i = this._rgba.slice(),
              s = i.pop();
            return (
              e && i.push(~~(255 * s)),
              "#" +
                t
                  .map(i, function (t) {
                    return (
                      (t = (t || 0).toString(16)), 1 === t.length ? "0" + t : t
                    );
                  })
                  .join("")
            );
          },
          toString: function () {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
          },
        })),
        (l.fn.parse.prototype = l.fn),
        (c.hsla.to = function (t) {
          if (null == t[0] || null == t[1] || null == t[2])
            return [null, null, null, t[3]];
          var e,
            i,
            s = t[0] / 255,
            n = t[1] / 255,
            a = t[2] / 255,
            o = t[3],
            r = Math.max(s, n, a),
            h = Math.min(s, n, a),
            l = r - h,
            c = r + h,
            u = 0.5 * c;
          return (
            (e =
              h === r
                ? 0
                : s === r
                ? (60 * (n - a)) / l + 360
                : n === r
                ? (60 * (a - s)) / l + 120
                : (60 * (s - n)) / l + 240),
            (i = 0 === l ? 0 : 0.5 >= u ? l / c : l / (2 - c)),
            [Math.round(e) % 360, i, u, null == o ? 1 : o]
          );
        }),
        (c.hsla.from = function (t) {
          if (null == t[0] || null == t[1] || null == t[2])
            return [null, null, null, t[3]];
          var e = t[0] / 360,
            i = t[1],
            s = t[2],
            a = t[3],
            o = 0.5 >= s ? s * (1 + i) : s + i - s * i,
            r = 2 * s - o;
          return [
            Math.round(255 * n(r, o, e + 1 / 3)),
            Math.round(255 * n(r, o, e)),
            Math.round(255 * n(r, o, e - 1 / 3)),
            a,
          ];
        }),
        f(c, function (s, n) {
          var a = n.props,
            o = n.cache,
            h = n.to,
            c = n.from;
          (l.fn[s] = function (s) {
            if ((h && !this[o] && (this[o] = h(this._rgba)), s === e))
              return this[o].slice();
            var n,
              r = t.type(s),
              u = "array" === r || "object" === r ? s : arguments,
              d = this[o].slice();
            return (
              f(a, function (t, e) {
                var s = u["object" === r ? t : e.idx];
                null == s && (s = d[e.idx]), (d[e.idx] = i(s, e));
              }),
              c ? ((n = l(c(d))), (n[o] = d), n) : l(d)
            );
          }),
            f(a, function (e, i) {
              l.fn[e] ||
                (l.fn[e] = function (n) {
                  var a,
                    o = t.type(n),
                    h = "alpha" === e ? (this._hsla ? "hsla" : "rgba") : s,
                    l = this[h](),
                    c = l[i.idx];
                  return "undefined" === o
                    ? c
                    : ("function" === o &&
                        ((n = n.call(this, c)), (o = t.type(n))),
                      null == n && i.empty
                        ? this
                        : ("string" === o &&
                            ((a = r.exec(n)),
                            a &&
                              (n =
                                c +
                                parseFloat(a[2]) * ("+" === a[1] ? 1 : -1))),
                          (l[i.idx] = n),
                          this[h](l)));
                });
            });
        }),
        (l.hook = function (e) {
          var i = e.split(" ");
          f(i, function (e, i) {
            (t.cssHooks[i] = {
              set: function (e, n) {
                var a,
                  o,
                  r = "";
                if (
                  "transparent" !== n &&
                  ("string" !== t.type(n) || (a = s(n)))
                ) {
                  if (((n = l(a || n)), !d.rgba && 1 !== n._rgba[3])) {
                    for (
                      o = "backgroundColor" === i ? e.parentNode : e;
                      ("" === r || "transparent" === r) && o && o.style;

                    )
                      try {
                        (r = t.css(o, "backgroundColor")), (o = o.parentNode);
                      } catch (h) {}
                    n = n.blend(r && "transparent" !== r ? r : "_default");
                  }
                  n = n.toRgbaString();
                }
                try {
                  e.style[i] = n;
                } catch (h) {}
              },
            }),
              (t.fx.step[i] = function (e) {
                e.colorInit ||
                  ((e.start = l(e.elem, i)),
                  (e.end = l(e.end)),
                  (e.colorInit = !0)),
                  t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos));
              });
          });
        }),
        l.hook(o),
        (t.cssHooks.borderColor = {
          expand: function (t) {
            var e = {};
            return (
              f(["Top", "Right", "Bottom", "Left"], function (i, s) {
                e["border" + s + "Color"] = t;
              }),
              e
            );
          },
        }),
        (a = t.Color.names =
          {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff",
          });
    })(jQuery),
    (function () {
      function i(e) {
        var i,
          s,
          n = e.ownerDocument.defaultView
            ? e.ownerDocument.defaultView.getComputedStyle(e, null)
            : e.currentStyle,
          a = {};
        if (n && n.length && n[0] && n[n[0]])
          for (s = n.length; s--; )
            (i = n[s]), "string" == typeof n[i] && (a[t.camelCase(i)] = n[i]);
        else for (i in n) "string" == typeof n[i] && (a[i] = n[i]);
        return a;
      }
      function s(e, i) {
        var s,
          n,
          o = {};
        for (s in i)
          (n = i[s]),
            e[s] !== n &&
              (a[s] || ((t.fx.step[s] || !isNaN(parseFloat(n))) && (o[s] = n)));
        return o;
      }
      var n = ["add", "remove", "toggle"],
        a = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1,
        };
      t.each(
        [
          "borderLeftStyle",
          "borderRightStyle",
          "borderBottomStyle",
          "borderTopStyle",
        ],
        function (e, i) {
          t.fx.step[i] = function (t) {
            (("none" !== t.end && !t.setAttr) || (1 === t.pos && !t.setAttr)) &&
              (jQuery.style(t.elem, i, t.end), (t.setAttr = !0));
          };
        }
      ),
        t.fn.addBack ||
          (t.fn.addBack = function (t) {
            return this.add(
              null == t ? this.prevObject : this.prevObject.filter(t)
            );
          }),
        (t.effects.animateClass = function (e, a, o, r) {
          var h = t.speed(a, o, r);
          return this.queue(function () {
            var a,
              o = t(this),
              r = o.attr("class") || "",
              l = h.children ? o.find("*").addBack() : o;
            (l = l.map(function () {
              var e = t(this);
              return { el: e, start: i(this) };
            })),
              (a = function () {
                t.each(n, function (t, i) {
                  e[i] && o[i + "Class"](e[i]);
                });
              }),
              a(),
              (l = l.map(function () {
                return (
                  (this.end = i(this.el[0])),
                  (this.diff = s(this.start, this.end)),
                  this
                );
              })),
              o.attr("class", r),
              (l = l.map(function () {
                var e = this,
                  i = t.Deferred(),
                  s = t.extend({}, h, {
                    queue: !1,
                    complete: function () {
                      i.resolve(e);
                    },
                  });
                return this.el.animate(this.diff, s), i.promise();
              })),
              t.when.apply(t, l.get()).done(function () {
                a(),
                  t.each(arguments, function () {
                    var e = this.el;
                    t.each(this.diff, function (t) {
                      e.css(t, "");
                    });
                  }),
                  h.complete.call(o[0]);
              });
          });
        }),
        t.fn.extend({
          addClass: (function (e) {
            return function (i, s, n, a) {
              return s
                ? t.effects.animateClass.call(this, { add: i }, s, n, a)
                : e.apply(this, arguments);
            };
          })(t.fn.addClass),
          removeClass: (function (e) {
            return function (i, s, n, a) {
              return arguments.length > 1
                ? t.effects.animateClass.call(this, { remove: i }, s, n, a)
                : e.apply(this, arguments);
            };
          })(t.fn.removeClass),
          toggleClass: (function (i) {
            return function (s, n, a, o, r) {
              return "boolean" == typeof n || n === e
                ? a
                  ? t.effects.animateClass.call(
                      this,
                      n ? { add: s } : { remove: s },
                      a,
                      o,
                      r
                    )
                  : i.apply(this, arguments)
                : t.effects.animateClass.call(this, { toggle: s }, n, a, o);
            };
          })(t.fn.toggleClass),
          switchClass: function (e, i, s, n, a) {
            return t.effects.animateClass.call(
              this,
              { add: i, remove: e },
              s,
              n,
              a
            );
          },
        });
    })(),
    (function () {
      function s(e, i, s, n) {
        return (
          t.isPlainObject(e) && ((i = e), (e = e.effect)),
          (e = { effect: e }),
          null == i && (i = {}),
          t.isFunction(i) && ((n = i), (s = null), (i = {})),
          ("number" == typeof i || t.fx.speeds[i]) &&
            ((n = s), (s = i), (i = {})),
          t.isFunction(s) && ((n = s), (s = null)),
          i && t.extend(e, i),
          (s = s || i.duration),
          (e.duration = t.fx.off
            ? 0
            : "number" == typeof s
            ? s
            : s in t.fx.speeds
            ? t.fx.speeds[s]
            : t.fx.speeds._default),
          (e.complete = n || i.complete),
          e
        );
      }
      function n(e) {
        return !e || "number" == typeof e || t.fx.speeds[e]
          ? !0
          : "string" != typeof e || t.effects.effect[e]
          ? t.isFunction(e)
            ? !0
            : "object" != typeof e || e.effect
            ? !1
            : !0
          : !0;
      }
      t.extend(t.effects, {
        version: "1.10.2",
        save: function (t, e) {
          for (var s = 0; e.length > s; s++)
            null !== e[s] && t.data(i + e[s], t[0].style[e[s]]);
        },
        restore: function (t, s) {
          var n, a;
          for (a = 0; s.length > a; a++)
            null !== s[a] &&
              ((n = t.data(i + s[a])), n === e && (n = ""), t.css(s[a], n));
        },
        setMode: function (t, e) {
          return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e;
        },
        getBaseline: function (t, e) {
          var i, s;
          switch (t[0]) {
            case "top":
              i = 0;
              break;
            case "middle":
              i = 0.5;
              break;
            case "bottom":
              i = 1;
              break;
            default:
              i = t[0] / e.height;
          }
          switch (t[1]) {
            case "left":
              s = 0;
              break;
            case "center":
              s = 0.5;
              break;
            case "right":
              s = 1;
              break;
            default:
              s = t[1] / e.width;
          }
          return { x: s, y: i };
        },
        createWrapper: function (e) {
          if (e.parent().is(".ui-effects-wrapper")) return e.parent();
          var i = {
              width: e.outerWidth(!0),
              height: e.outerHeight(!0),
              float: e.css("float"),
            },
            s = t("<div></div>").addClass("ui-effects-wrapper").css({
              fontSize: "100%",
              background: "transparent",
              border: "none",
              margin: 0,
              padding: 0,
            }),
            n = { width: e.width(), height: e.height() },
            a = document.activeElement;
          try {
            a.id;
          } catch (o) {
            a = document.body;
          }
          return (
            e.wrap(s),
            (e[0] === a || t.contains(e[0], a)) && t(a).focus(),
            (s = e.parent()),
            "static" === e.css("position")
              ? (s.css({ position: "relative" }),
                e.css({ position: "relative" }))
              : (t.extend(i, {
                  position: e.css("position"),
                  zIndex: e.css("z-index"),
                }),
                t.each(["top", "left", "bottom", "right"], function (t, s) {
                  (i[s] = e.css(s)),
                    isNaN(parseInt(i[s], 10)) && (i[s] = "auto");
                }),
                e.css({
                  position: "relative",
                  top: 0,
                  left: 0,
                  right: "auto",
                  bottom: "auto",
                })),
            e.css(n),
            s.css(i).show()
          );
        },
        removeWrapper: function (e) {
          var i = document.activeElement;
          return (
            e.parent().is(".ui-effects-wrapper") &&
              (e.parent().replaceWith(e),
              (e[0] === i || t.contains(e[0], i)) && t(i).focus()),
            e
          );
        },
        setTransition: function (e, i, s, n) {
          return (
            (n = n || {}),
            t.each(i, function (t, i) {
              var a = e.cssUnit(i);
              a[0] > 0 && (n[i] = a[0] * s + a[1]);
            }),
            n
          );
        },
      }),
        t.fn.extend({
          effect: function () {
            function e(e) {
              function s() {
                t.isFunction(a) && a.call(n[0]), t.isFunction(e) && e();
              }
              var n = t(this),
                a = i.complete,
                r = i.mode;
              (n.is(":hidden") ? "hide" === r : "show" === r)
                ? (n[r](), s())
                : o.call(n[0], i, s);
            }
            var i = s.apply(this, arguments),
              n = i.mode,
              a = i.queue,
              o = t.effects.effect[i.effect];
            return t.fx.off || !o
              ? n
                ? this[n](i.duration, i.complete)
                : this.each(function () {
                    i.complete && i.complete.call(this);
                  })
              : a === !1
              ? this.each(e)
              : this.queue(a || "fx", e);
          },
          show: (function (t) {
            return function (e) {
              if (n(e)) return t.apply(this, arguments);
              var i = s.apply(this, arguments);
              return (i.mode = "show"), this.effect.call(this, i);
            };
          })(t.fn.show),
          hide: (function (t) {
            return function (e) {
              if (n(e)) return t.apply(this, arguments);
              var i = s.apply(this, arguments);
              return (i.mode = "hide"), this.effect.call(this, i);
            };
          })(t.fn.hide),
          toggle: (function (t) {
            return function (e) {
              if (n(e) || "boolean" == typeof e)
                return t.apply(this, arguments);
              var i = s.apply(this, arguments);
              return (i.mode = "toggle"), this.effect.call(this, i);
            };
          })(t.fn.toggle),
          cssUnit: function (e) {
            var i = this.css(e),
              s = [];
            return (
              t.each(["em", "px", "%", "pt"], function (t, e) {
                i.indexOf(e) > 0 && (s = [parseFloat(i), e]);
              }),
              s
            );
          },
        });
    })(),
    (function () {
      var e = {};
      t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, i) {
        e[i] = function (e) {
          return Math.pow(e, t + 2);
        };
      }),
        t.extend(e, {
          Sine: function (t) {
            return 1 - Math.cos((t * Math.PI) / 2);
          },
          Circ: function (t) {
            return 1 - Math.sqrt(1 - t * t);
          },
          Elastic: function (t) {
            return 0 === t || 1 === t
              ? t
              : -Math.pow(2, 8 * (t - 1)) *
                  Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
          },
          Back: function (t) {
            return t * t * (3 * t - 2);
          },
          Bounce: function (t) {
            for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t; );
            return (
              1 / Math.pow(4, 3 - i) -
              7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            );
          },
        }),
        t.each(e, function (e, i) {
          (t.easing["easeIn" + e] = i),
            (t.easing["easeOut" + e] = function (t) {
              return 1 - i(1 - t);
            }),
            (t.easing["easeInOut" + e] = function (t) {
              return 0.5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2;
            });
        });
    })();
})(jQuery); /*})'"*/ /*})'"*/
/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {
  // key and value given, set cookie...
  if (arguments.length > 1 && (value === null || typeof value !== "object")) {
    options = jQuery.extend({}, options);

    if (value === null) {
      options.expires = -1;
    }

    if (typeof options.expires === "number") {
      var days = options.expires,
        t = (options.expires = new Date());
      t.setDate(t.getDate() + days);
    }

    return (document.cookie = [
      encodeURIComponent(key),
      "=",
      options.raw ? String(value) : encodeURIComponent(String(value)),
      options.expires ? "; expires=" + options.expires.toUTCString() : "", // use expires attribute, max-age is not supported by IE
      options.path ? "; path=" + options.path : "",
      options.domain ? "; domain=" + options.domain : "",
      options.secure ? "; secure" : "",
    ].join(""));
  }

  // key and possibly options given, get cookie...
  options = value || {};
  var result,
    decode = options.raw
      ? function (s) {
          return s;
        }
      : decodeURIComponent;
  return (result = new RegExp(
    "(?:^|; )" + encodeURIComponent(key) + "=([^;]*)"
  ).exec(document.cookie))
    ? decode(result[1])
    : null;
}; /*})'"*/ /*})'"*/
/*!
 * jQuery Form Plugin
 * version: 4.2.1
 * Requires jQuery v1.7 or later
 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup
 * Project repository: https://github.com/jquery-form/form
 * Dual licensed under the MIT and LGPLv3 licenses.
 * https://github.com/jquery-form/form#license
 */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : "object" == typeof module && module.exports
    ? (module.exports = function (b, c) {
        return (
          void 0 === c &&
            (c =
              "undefined" != typeof window
                ? require("jquery")
                : require("jquery")(b)),
          a(c),
          c
        );
      })
    : a(jQuery);
})(function (a) {
  "use strict";
  function b(b) {
    var c = b.data;
    b.isDefaultPrevented() ||
      (b.preventDefault(), a(b.target).closest("form").ajaxSubmit(c));
  }
  function c(b) {
    var c = b.target,
      d = a(c);
    if (!d.is("[type=submit],[type=image]")) {
      var e = d.closest("[type=submit]");
      if (0 === e.length) return;
      c = e[0];
    }
    var f = c.form;
    if (((f.clk = c), "image" === c.type))
      if (void 0 !== b.offsetX) (f.clk_x = b.offsetX), (f.clk_y = b.offsetY);
      else if ("function" == typeof a.fn.offset) {
        var g = d.offset();
        (f.clk_x = b.pageX - g.left), (f.clk_y = b.pageY - g.top);
      } else
        (f.clk_x = b.pageX - c.offsetLeft), (f.clk_y = b.pageY - c.offsetTop);
    setTimeout(function () {
      f.clk = f.clk_x = f.clk_y = null;
    }, 100);
  }
  function d() {
    if (a.fn.ajaxSubmit.debug) {
      var b = "[jquery.form] " + Array.prototype.join.call(arguments, "");
      window.console && window.console.log
        ? window.console.log(b)
        : window.opera && window.opera.postError && window.opera.postError(b);
    }
  }
  var e = {};
  (e.fileapi = void 0 !== a('<input type="file">').get(0).files),
    (e.formdata = void 0 !== window.FormData);
  var f = !!a.fn.prop;
  (a.fn.attr2 = function () {
    if (!f) return this.attr.apply(this, arguments);
    var a = this.prop.apply(this, arguments);
    return (a && a.jquery) || "string" == typeof a
      ? a
      : this.attr.apply(this, arguments);
  }),
    (a.fn.ajaxSubmit = function (b, c, g, h) {
      function i(c) {
        var d,
          e,
          f = a.param(c, b.traditional).split("&"),
          g = f.length,
          h = [];
        for (d = 0; d < g; d++)
          (f[d] = f[d].replace(/\+/g, " ")),
            (e = f[d].split("=")),
            h.push([decodeURIComponent(e[0]), decodeURIComponent(e[1])]);
        return h;
      }
      function j(c) {
        for (var d = new FormData(), e = 0; e < c.length; e++)
          d.append(c[e].name, c[e].value);
        if (b.extraData) {
          var f = i(b.extraData);
          for (e = 0; e < f.length; e++) f[e] && d.append(f[e][0], f[e][1]);
        }
        b.data = null;
        var g = a.extend(!0, {}, a.ajaxSettings, b, {
          contentType: !1,
          processData: !1,
          cache: !1,
          type: l || "POST",
        });
        b.uploadProgress &&
          (g.xhr = function () {
            var c = a.ajaxSettings.xhr();
            return (
              c.upload &&
                c.upload.addEventListener(
                  "progress",
                  function (a) {
                    var c = 0,
                      d = a.loaded || a.position,
                      e = a.total;
                    a.lengthComputable && (c = Math.ceil((d / e) * 100)),
                      b.uploadProgress(a, d, e, c);
                  },
                  !1
                ),
              c
            );
          }),
          (g.data = null);
        var h = g.beforeSend;
        return (
          (g.beforeSend = function (a, c) {
            b.formData ? (c.data = b.formData) : (c.data = d),
              h && h.call(this, a, c);
          }),
          a.ajax(g)
        );
      }
      function k(c) {
        function e(a) {
          var b = null;
          try {
            a.contentWindow && (b = a.contentWindow.document);
          } catch (a) {
            d("cannot get iframe.contentWindow document: " + a);
          }
          if (b) return b;
          try {
            b = a.contentDocument ? a.contentDocument : a.document;
          } catch (c) {
            d("cannot get iframe.contentDocument: " + c), (b = a.document);
          }
          return b;
        }
        function g() {
          function b() {
            try {
              var a = e(q).readyState;
              d("state = " + a),
                a && "uninitialized" === a.toLowerCase() && setTimeout(b, 50);
            } catch (a) {
              d("Server abort: ", a, " (", a.name, ")"),
                h(2),
                w && clearTimeout(w),
                (w = void 0);
            }
          }
          var c = o.attr2("target"),
            f = o.attr2("action"),
            g =
              o.attr("enctype") || o.attr("encoding") || "multipart/form-data";
          x.setAttribute("target", n),
            (l && !/post/i.test(l)) || x.setAttribute("method", "POST"),
            f !== k.url && x.setAttribute("action", k.url),
            k.skipEncodingOverride ||
              (l && !/post/i.test(l)) ||
              o.attr({
                encoding: "multipart/form-data",
                enctype: "multipart/form-data",
              }),
            k.timeout &&
              (w = setTimeout(function () {
                (v = !0), h(1);
              }, k.timeout));
          var i = [];
          try {
            if (k.extraData)
              for (var j in k.extraData)
                k.extraData.hasOwnProperty(j) &&
                  (a.isPlainObject(k.extraData[j]) &&
                  k.extraData[j].hasOwnProperty("name") &&
                  k.extraData[j].hasOwnProperty("value")
                    ? i.push(
                        a(
                          '<input type="hidden" name="' +
                            k.extraData[j].name +
                            '">',
                          z
                        )
                          .val(k.extraData[j].value)
                          .appendTo(x)[0]
                      )
                    : i.push(
                        a('<input type="hidden" name="' + j + '">', z)
                          .val(k.extraData[j])
                          .appendTo(x)[0]
                      ));
            k.iframeTarget || p.appendTo(A),
              q.attachEvent
                ? q.attachEvent("onload", h)
                : q.addEventListener("load", h, !1),
              setTimeout(b, 15);
            try {
              x.submit();
            } catch (a) {
              var m = document.createElement("form").submit;
              m.apply(x);
            }
          } finally {
            x.setAttribute("action", f),
              x.setAttribute("enctype", g),
              c ? x.setAttribute("target", c) : o.removeAttr("target"),
              a(i).remove();
          }
        }
        function h(b) {
          if (!r.aborted && !F) {
            if (
              ((E = e(q)),
              E || (d("cannot access response document"), (b = 2)),
              1 === b && r)
            )
              return r.abort("timeout"), void y.reject(r, "timeout");
            if (2 === b && r)
              return (
                r.abort("server abort"),
                void y.reject(r, "error", "server abort")
              );
            if ((E && E.location.href !== k.iframeSrc) || v) {
              q.detachEvent
                ? q.detachEvent("onload", h)
                : q.removeEventListener("load", h, !1);
              var c,
                f = "success";
              try {
                if (v) throw "timeout";
                var g = "xml" === k.dataType || E.XMLDocument || a.isXMLDoc(E);
                if (
                  (d("isXml=" + g),
                  !g &&
                    window.opera &&
                    (null === E.body || !E.body.innerHTML) &&
                    --G)
                )
                  return (
                    d("requeing onLoad callback, DOM not available"),
                    void setTimeout(h, 250)
                  );
                var i = E.body ? E.body : E.documentElement;
                (r.responseText = i ? i.innerHTML : null),
                  (r.responseXML = E.XMLDocument ? E.XMLDocument : E),
                  g && (k.dataType = "xml"),
                  (r.getResponseHeader = function (a) {
                    return { "content-type": k.dataType }[a.toLowerCase()];
                  }),
                  i &&
                    ((r.status = Number(i.getAttribute("status")) || r.status),
                    (r.statusText =
                      i.getAttribute("statusText") || r.statusText));
                var j = (k.dataType || "").toLowerCase(),
                  l = /(json|script|text)/.test(j);
                if (l || k.textarea) {
                  var n = E.getElementsByTagName("textarea")[0];
                  if (n)
                    (r.responseText = n.value),
                      (r.status = Number(n.getAttribute("status")) || r.status),
                      (r.statusText =
                        n.getAttribute("statusText") || r.statusText);
                  else if (l) {
                    var o = E.getElementsByTagName("pre")[0],
                      s = E.getElementsByTagName("body")[0];
                    o
                      ? (r.responseText = o.textContent
                          ? o.textContent
                          : o.innerText)
                      : s &&
                        (r.responseText = s.textContent
                          ? s.textContent
                          : s.innerText);
                  }
                } else
                  "xml" === j &&
                    !r.responseXML &&
                    r.responseText &&
                    (r.responseXML = H(r.responseText));
                try {
                  D = J(r, j, k);
                } catch (a) {
                  (f = "parsererror"), (r.error = c = a || f);
                }
              } catch (a) {
                d("error caught: ", a), (f = "error"), (r.error = c = a || f);
              }
              r.aborted && (d("upload aborted"), (f = null)),
                r.status &&
                  (f =
                    (r.status >= 200 && r.status < 300) || 304 === r.status
                      ? "success"
                      : "error"),
                "success" === f
                  ? (k.success && k.success.call(k.context, D, "success", r),
                    y.resolve(r.responseText, "success", r),
                    m && a.event.trigger("ajaxSuccess", [r, k]))
                  : f &&
                    (void 0 === c && (c = r.statusText),
                    k.error && k.error.call(k.context, r, f, c),
                    y.reject(r, "error", c),
                    m && a.event.trigger("ajaxError", [r, k, c])),
                m && a.event.trigger("ajaxComplete", [r, k]),
                m && !--a.active && a.event.trigger("ajaxStop"),
                k.complete && k.complete.call(k.context, r, f),
                (F = !0),
                k.timeout && clearTimeout(w),
                setTimeout(function () {
                  k.iframeTarget ? p.attr("src", k.iframeSrc) : p.remove(),
                    (r.responseXML = null);
                }, 100);
            }
          }
        }
        var i,
          j,
          k,
          m,
          n,
          p,
          q,
          r,
          t,
          u,
          v,
          w,
          x = o[0],
          y = a.Deferred();
        if (
          ((y.abort = function (a) {
            r.abort(a);
          }),
          c)
        )
          for (j = 0; j < s.length; j++)
            (i = a(s[j])),
              f ? i.prop("disabled", !1) : i.removeAttr("disabled");
        (k = a.extend(!0, {}, a.ajaxSettings, b)),
          (k.context = k.context || k),
          (n = "jqFormIO" + new Date().getTime());
        var z = x.ownerDocument,
          A = o.closest("body");
        if (
          (k.iframeTarget
            ? ((p = a(k.iframeTarget, z)),
              (u = p.attr2("name")),
              u ? (n = u) : p.attr2("name", n))
            : ((p = a(
                '<iframe name="' + n + '" src="' + k.iframeSrc + '" />',
                z
              )),
              p.css({ position: "absolute", top: "-1000px", left: "-1000px" })),
          (q = p[0]),
          (r = {
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: "n/a",
            getAllResponseHeaders: function () {},
            getResponseHeader: function () {},
            setRequestHeader: function () {},
            abort: function (b) {
              var c = "timeout" === b ? "timeout" : "aborted";
              d("aborting upload... " + c), (this.aborted = 1);
              try {
                q.contentWindow.document.execCommand &&
                  q.contentWindow.document.execCommand("Stop");
              } catch (a) {}
              p.attr("src", k.iframeSrc),
                (r.error = c),
                k.error && k.error.call(k.context, r, c, b),
                m && a.event.trigger("ajaxError", [r, k, c]),
                k.complete && k.complete.call(k.context, r, c);
            },
          }),
          (m = k.global),
          m && 0 == a.active++ && a.event.trigger("ajaxStart"),
          m && a.event.trigger("ajaxSend", [r, k]),
          k.beforeSend && k.beforeSend.call(k.context, r, k) === !1)
        )
          return k.global && a.active--, y.reject(), y;
        if (r.aborted) return y.reject(), y;
        (t = x.clk) &&
          (u = t.name) &&
          !t.disabled &&
          ((k.extraData = k.extraData || {}),
          (k.extraData[u] = t.value),
          "image" === t.type &&
            ((k.extraData[u + ".x"] = x.clk_x),
            (k.extraData[u + ".y"] = x.clk_y)));
        var B = a("meta[name=csrf-token]").attr("content"),
          C = a("meta[name=csrf-param]").attr("content");
        C && B && ((k.extraData = k.extraData || {}), (k.extraData[C] = B)),
          k.forceSync ? g() : setTimeout(g, 10);
        var D,
          E,
          F,
          G = 50,
          H =
            a.parseXML ||
            function (a, b) {
              return (
                window.ActiveXObject
                  ? ((b = new ActiveXObject("Microsoft.XMLDOM")),
                    (b.async = "false"),
                    b.loadXML(a))
                  : (b = new DOMParser().parseFromString(a, "text/xml")),
                b &&
                b.documentElement &&
                "parsererror" !== b.documentElement.nodeName
                  ? b
                  : null
              );
            },
          I =
            a.parseJSON ||
            function (a) {
              return window.eval("(" + a + ")");
            },
          J = function (b, c, d) {
            var e = b.getResponseHeader("content-type") || "",
              f = ("xml" === c || !c) && e.indexOf("xml") >= 0,
              g = f ? b.responseXML : b.responseText;
            return (
              f &&
                "parsererror" === g.documentElement.nodeName &&
                a.error &&
                a.error("parsererror"),
              d && d.dataFilter && (g = d.dataFilter(g, c)),
              "string" == typeof g &&
                (("json" === c || !c) && e.indexOf("json") >= 0
                  ? (g = I(g))
                  : ("script" === c || !c) &&
                    e.indexOf("javascript") >= 0 &&
                    a.globalEval(g)),
              g
            );
          };
        return y;
      }
      if (!this.length)
        return (
          d("ajaxSubmit: skipping submit process - no element selected"), this
        );
      var l,
        m,
        n,
        o = this;
      "function" == typeof b
        ? (b = { success: b })
        : "string" == typeof b || (b === !1 && arguments.length > 0)
        ? ((b = { url: b, data: c, dataType: g }),
          "function" == typeof h && (b.success = h))
        : void 0 === b && (b = {}),
        (l = b.method || b.type || this.attr2("method")),
        (m = b.url || this.attr2("action")),
        (n = "string" == typeof m ? a.trim(m) : ""),
        (n = n || window.location.href || ""),
        n && (n = (n.match(/^([^#]+)/) || [])[1]),
        (b = a.extend(
          !0,
          {
            url: n,
            success: a.ajaxSettings.success,
            type: l || a.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "")
              ? "javascript:false"
              : "about:blank",
          },
          b
        ));
      var p = {};
      if ((this.trigger("form-pre-serialize", [this, b, p]), p.veto))
        return (
          d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this
        );
      if (b.beforeSerialize && b.beforeSerialize(this, b) === !1)
        return (
          d("ajaxSubmit: submit aborted via beforeSerialize callback"), this
        );
      var q = b.traditional;
      void 0 === q && (q = a.ajaxSettings.traditional);
      var r,
        s = [],
        t = this.formToArray(b.semantic, s, b.filtering);
      if (b.data) {
        var u = a.isFunction(b.data) ? b.data(t) : b.data;
        (b.extraData = u), (r = a.param(u, q));
      }
      if (b.beforeSubmit && b.beforeSubmit(t, this, b) === !1)
        return d("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
      if ((this.trigger("form-submit-validate", [t, this, b, p]), p.veto))
        return (
          d("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this
        );
      var v = a.param(t, q);
      r && (v = v ? v + "&" + r : r),
        "GET" === b.type.toUpperCase()
          ? ((b.url += (b.url.indexOf("?") >= 0 ? "&" : "?") + v),
            (b.data = null))
          : (b.data = v);
      var w = [];
      if (
        (b.resetForm &&
          w.push(function () {
            o.resetForm();
          }),
        b.clearForm &&
          w.push(function () {
            o.clearForm(b.includeHidden);
          }),
        !b.dataType && b.target)
      ) {
        var x = b.success || function () {};
        w.push(function (c, d, e) {
          var f = arguments,
            g = b.replaceTarget ? "replaceWith" : "html";
          a(b.target)
            [g](c)
            .each(function () {
              x.apply(this, f);
            });
        });
      } else
        b.success &&
          (a.isArray(b.success) ? a.merge(w, b.success) : w.push(b.success));
      if (
        ((b.success = function (a, c, d) {
          for (var e = b.context || this, f = 0, g = w.length; f < g; f++)
            w[f].apply(e, [a, c, d || o, o]);
        }),
        b.error)
      ) {
        var y = b.error;
        b.error = function (a, c, d) {
          var e = b.context || this;
          y.apply(e, [a, c, d, o]);
        };
      }
      if (b.complete) {
        var z = b.complete;
        b.complete = function (a, c) {
          var d = b.context || this;
          z.apply(d, [a, c, o]);
        };
      }
      var A = a("input[type=file]:enabled", this).filter(function () {
          return "" !== a(this).val();
        }),
        B = A.length > 0,
        C = "multipart/form-data",
        D = o.attr("enctype") === C || o.attr("encoding") === C,
        E = e.fileapi && e.formdata;
      d("fileAPI :" + E);
      var F,
        G = (B || D) && !E;
      b.iframe !== !1 && (b.iframe || G)
        ? b.closeKeepAlive
          ? a.get(b.closeKeepAlive, function () {
              F = k(t);
            })
          : (F = k(t))
        : (F = (B || D) && E ? j(t) : a.ajax(b)),
        o.removeData("jqxhr").data("jqxhr", F);
      for (var H = 0; H < s.length; H++) s[H] = null;
      return this.trigger("form-submit-notify", [this, b]), this;
    }),
    (a.fn.ajaxForm = function (e, f, g, h) {
      if (
        (("string" == typeof e || (e === !1 && arguments.length > 0)) &&
          ((e = { url: e, data: f, dataType: g }),
          "function" == typeof h && (e.success = h)),
        (e = e || {}),
        (e.delegation = e.delegation && a.isFunction(a.fn.on)),
        !e.delegation && 0 === this.length)
      ) {
        var i = { s: this.selector, c: this.context };
        return !a.isReady && i.s
          ? (d("DOM not ready, queuing ajaxForm"),
            a(function () {
              a(i.s, i.c).ajaxForm(e);
            }),
            this)
          : (d(
              "terminating; zero elements found by selector" +
                (a.isReady ? "" : " (DOM not ready)")
            ),
            this);
      }
      return e.delegation
        ? (a(document)
            .off("submit.form-plugin", this.selector, b)
            .off("click.form-plugin", this.selector, c)
            .on("submit.form-plugin", this.selector, e, b)
            .on("click.form-plugin", this.selector, e, c),
          this)
        : this.ajaxFormUnbind()
            .on("submit.form-plugin", e, b)
            .on("click.form-plugin", e, c);
    }),
    (a.fn.ajaxFormUnbind = function () {
      return this.off("submit.form-plugin click.form-plugin");
    }),
    (a.fn.formToArray = function (b, c, d) {
      var f = [];
      if (0 === this.length) return f;
      var g,
        h = this[0],
        i = this.attr("id"),
        j =
          b || void 0 === h.elements ? h.getElementsByTagName("*") : h.elements;
      if (
        (j && (j = a.makeArray(j)),
        i &&
          (b || /(Edge|Trident)\//.test(navigator.userAgent)) &&
          ((g = a(':input[form="' + i + '"]').get()),
          g.length && (j = (j || []).concat(g))),
        !j || !j.length)
      )
        return f;
      a.isFunction(d) && (j = a.map(j, d));
      var k, l, m, n, o, p, q;
      for (k = 0, p = j.length; k < p; k++)
        if (((o = j[k]), (m = o.name) && !o.disabled))
          if (b && h.clk && "image" === o.type)
            h.clk === o &&
              (f.push({ name: m, value: a(o).val(), type: o.type }),
              f.push(
                { name: m + ".x", value: h.clk_x },
                { name: m + ".y", value: h.clk_y }
              ));
          else if ((n = a.fieldValue(o, !0)) && n.constructor === Array)
            for (c && c.push(o), l = 0, q = n.length; l < q; l++)
              f.push({ name: m, value: n[l] });
          else if (e.fileapi && "file" === o.type) {
            c && c.push(o);
            var r = o.files;
            if (r.length)
              for (l = 0; l < r.length; l++)
                f.push({ name: m, value: r[l], type: o.type });
            else f.push({ name: m, value: "", type: o.type });
          } else
            null !== n &&
              void 0 !== n &&
              (c && c.push(o),
              f.push({
                name: m,
                value: n,
                type: o.type,
                required: o.required,
              }));
      if (!b && h.clk) {
        var s = a(h.clk),
          t = s[0];
        (m = t.name),
          m &&
            !t.disabled &&
            "image" === t.type &&
            (f.push({ name: m, value: s.val() }),
            f.push(
              { name: m + ".x", value: h.clk_x },
              { name: m + ".y", value: h.clk_y }
            ));
      }
      return f;
    }),
    (a.fn.formSerialize = function (b) {
      return a.param(this.formToArray(b));
    }),
    (a.fn.fieldSerialize = function (b) {
      var c = [];
      return (
        this.each(function () {
          var d = this.name;
          if (d) {
            var e = a.fieldValue(this, b);
            if (e && e.constructor === Array)
              for (var f = 0, g = e.length; f < g; f++)
                c.push({ name: d, value: e[f] });
            else
              null !== e &&
                void 0 !== e &&
                c.push({ name: this.name, value: e });
          }
        }),
        a.param(c)
      );
    }),
    (a.fn.fieldValue = function (b) {
      for (var c = [], d = 0, e = this.length; d < e; d++) {
        var f = this[d],
          g = a.fieldValue(f, b);
        null === g ||
          void 0 === g ||
          (g.constructor === Array && !g.length) ||
          (g.constructor === Array ? a.merge(c, g) : c.push(g));
      }
      return c;
    }),
    (a.fieldValue = function (b, c) {
      var d = b.name,
        e = b.type,
        f = b.tagName.toLowerCase();
      if (
        (void 0 === c && (c = !0),
        c &&
          (!d ||
            b.disabled ||
            "reset" === e ||
            "button" === e ||
            (("checkbox" === e || "radio" === e) && !b.checked) ||
            (("submit" === e || "image" === e) && b.form && b.form.clk !== b) ||
            ("select" === f && b.selectedIndex === -1)))
      )
        return null;
      if ("select" === f) {
        var g = b.selectedIndex;
        if (g < 0) return null;
        for (
          var h = [],
            i = b.options,
            j = "select-one" === e,
            k = j ? g + 1 : i.length,
            l = j ? g : 0;
          l < k;
          l++
        ) {
          var m = i[l];
          if (m.selected && !m.disabled) {
            var n = m.value;
            if (
              (n ||
                (n =
                  m.attributes &&
                  m.attributes.value &&
                  !m.attributes.value.specified
                    ? m.text
                    : m.value),
              j)
            )
              return n;
            h.push(n);
          }
        }
        return h;
      }
      return a(b).val().replace(/\r?\n/g, "\r\n");
    }),
    (a.fn.clearForm = function (b) {
      return this.each(function () {
        a("input,select,textarea", this).clearFields(b);
      });
    }),
    (a.fn.clearFields = a.fn.clearInputs =
      function (b) {
        var c =
          /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
          var d = this.type,
            e = this.tagName.toLowerCase();
          c.test(d) || "textarea" === e
            ? (this.value = "")
            : "checkbox" === d || "radio" === d
            ? (this.checked = !1)
            : "select" === e
            ? (this.selectedIndex = -1)
            : "file" === d
            ? /MSIE/.test(navigator.userAgent)
              ? a(this).replaceWith(a(this).clone(!0))
              : a(this).val("")
            : b &&
              ((b === !0 && /hidden/.test(d)) ||
                ("string" == typeof b && a(this).is(b))) &&
              (this.value = "");
        });
      }),
    (a.fn.resetForm = function () {
      return this.each(function () {
        var b = a(this),
          c = this.tagName.toLowerCase();
        switch (c) {
          case "input":
            this.checked = this.defaultChecked;
          case "textarea":
            return (this.value = this.defaultValue), !0;
          case "option":
          case "optgroup":
            var d = b.parents("select");
            return (
              d.length && d[0].multiple
                ? "option" === c
                  ? (this.selected = this.defaultSelected)
                  : b.find("option").resetForm()
                : d.resetForm(),
              !0
            );
          case "select":
            return (
              b.find("option").each(function (a) {
                if (
                  ((this.selected = this.defaultSelected),
                  this.defaultSelected && !b[0].multiple)
                )
                  return (b[0].selectedIndex = a), !1;
              }),
              !0
            );
          case "label":
            var e = a(b.attr("for")),
              f = b.find("input,select,textarea");
            return e[0] && f.unshift(e[0]), f.resetForm(), !0;
          case "form":
            return (
              ("function" == typeof this.reset ||
                ("object" == typeof this.reset && !this.reset.nodeType)) &&
                this.reset(),
              !0
            );
          default:
            return b.find("form,input,label,select,textarea").resetForm(), !0;
        }
      });
    }),
    (a.fn.enable = function (a) {
      return (
        void 0 === a && (a = !0),
        this.each(function () {
          this.disabled = !a;
        })
      );
    }),
    (a.fn.selected = function (b) {
      return (
        void 0 === b && (b = !0),
        this.each(function () {
          var c = this.type;
          if ("checkbox" === c || "radio" === c) this.checked = b;
          else if ("option" === this.tagName.toLowerCase()) {
            var d = a(this).parent("select");
            b &&
              d[0] &&
              "select-one" === d[0].type &&
              d.find("option").selected(!1),
              (this.selected = b);
          }
        })
      );
    }),
    (a.fn.ajaxSubmit.debug = !1);
}); /*})'"*/ /*})'"*/
/**
 * Override jquery.form's behavior of setting iframeSrc to javascript:false for
 * https requests, because that no longer works with new versions of Chrome.
 * - https://www.drupal.org/project/drupal/issues/3138421
 */

(function (jQuery) {
  var fnOriginalAjaxSubmit = jQuery.fn.ajaxSubmit;
  jQuery.fn.extend({
    ajaxSubmit: function (options) {
      if (typeof options == "function") {
        options = { success: options };
      }
      options = jQuery.extend(
        true,
        {
          iframeSrc: "about:blank",
        },
        options
      );
      return fnOriginalAjaxSubmit.call(this, options);
    },
  });
})(jQuery); /*})'"*/ /*})'"*/
