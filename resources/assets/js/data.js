/*! jQuery UI - v1.13.1 - 2022-01-20
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-patch.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
!function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(V) {
    "use strict";
    V.ui = V.ui || {};
    V.ui.version = "1.13.1";
    var n, i = 0, a = Array.prototype.hasOwnProperty, r = Array.prototype.slice;
    V.cleanData = (n = V.cleanData,
    function(t) {
        for (var e, i, s = 0; null != (i = t[s]); s++)
            (e = V._data(i, "events")) && e.remove && V(i).triggerHandler("remove");
        n(t)
    }
    ),
    V.widget = function(t, i, e) {
        var s, n, o, a = {}, r = t.split(".")[0], l = r + "-" + (t = t.split(".")[1]);
        return e || (e = i,
        i = V.Widget),
        Array.isArray(e) && (e = V.extend.apply(null, [{}].concat(e))),
        V.expr.pseudos[l.toLowerCase()] = function(t) {
            return !!V.data(t, l)
        }
        ,
        V[r] = V[r] || {},
        s = V[r][t],
        n = V[r][t] = function(t, e) {
            if (!this || !this._createWidget)
                return new n(t,e);
            arguments.length && this._createWidget(t, e)
        }
        ,
        V.extend(n, s, {
            version: e.version,
            _proto: V.extend({}, e),
            _childConstructors: []
        }),
        (o = new i).options = V.widget.extend({}, o.options),
        V.each(e, function(e, s) {
            function n() {
                return i.prototype[e].apply(this, arguments)
            }
            function o(t) {
                return i.prototype[e].apply(this, t)
            }
            a[e] = "function" == typeof s ? function() {
                var t, e = this._super, i = this._superApply;
                return this._super = n,
                this._superApply = o,
                t = s.apply(this, arguments),
                this._super = e,
                this._superApply = i,
                t
            }
            : s
        }),
        n.prototype = V.widget.extend(o, {
            widgetEventPrefix: s && o.widgetEventPrefix || t
        }, a, {
            constructor: n,
            namespace: r,
            widgetName: t,
            widgetFullName: l
        }),
        s ? (V.each(s._childConstructors, function(t, e) {
            var i = e.prototype;
            V.widget(i.namespace + "." + i.widgetName, n, e._proto)
        }),
        delete s._childConstructors) : i._childConstructors.push(n),
        V.widget.bridge(t, n),
        n
    }
    ,
    V.widget.extend = function(t) {
        for (var e, i, s = r.call(arguments, 1), n = 0, o = s.length; n < o; n++)
            for (e in s[n])
                i = s[n][e],
                a.call(s[n], e) && void 0 !== i && (V.isPlainObject(i) ? t[e] = V.isPlainObject(t[e]) ? V.widget.extend({}, t[e], i) : V.widget.extend({}, i) : t[e] = i);
        return t
    }
    ,
    V.widget.bridge = function(o, e) {
        var a = e.prototype.widgetFullName || o;
        V.fn[o] = function(i) {
            var t = "string" == typeof i
              , s = r.call(arguments, 1)
              , n = this;
            return t ? this.length || "instance" !== i ? this.each(function() {
                var t, e = V.data(this, a);
                return "instance" === i ? (n = e,
                !1) : e ? "function" != typeof e[i] || "_" === i.charAt(0) ? V.error("no such method '" + i + "' for " + o + " widget instance") : (t = e[i].apply(e, s)) !== e && void 0 !== t ? (n = t && t.jquery ? n.pushStack(t.get()) : t,
                !1) : void 0 : V.error("cannot call methods on " + o + " prior to initialization; attempted to call method '" + i + "'")
            }) : n = void 0 : (s.length && (i = V.widget.extend.apply(null, [i].concat(s))),
            this.each(function() {
                var t = V.data(this, a);
                t ? (t.option(i || {}),
                t._init && t._init()) : V.data(this, a, new e(i,this))
            })),
            n
        }
    }
    ,
    V.Widget = function() {}
    ,
    V.Widget._childConstructors = [],
    V.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: !1,
            create: null
        },
        _createWidget: function(t, e) {
            e = V(e || this.defaultElement || this)[0],
            this.element = V(e),
            this.uuid = i++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.bindings = V(),
            this.hoverable = V(),
            this.focusable = V(),
            this.classesElementLookup = {},
            e !== this && (V.data(e, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(t) {
                    t.target === e && this.destroy()
                }
            }),
            this.document = V(e.style ? e.ownerDocument : e.document || e),
            this.window = V(this.document[0].defaultView || this.document[0].parentWindow)),
            this.options = V.widget.extend({}, this.options, this._getCreateOptions(), t),
            this._create(),
            this.options.disabled && this._setOptionDisabled(this.options.disabled),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: function() {
            return {}
        },
        _getCreateEventData: V.noop,
        _create: V.noop,
        _init: V.noop,
        destroy: function() {
            var i = this;
            this._destroy(),
            V.each(this.classesElementLookup, function(t, e) {
                i._removeClass(e, t)
            }),
            this.element.off(this.eventNamespace).removeData(this.widgetFullName),
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
            this.bindings.off(this.eventNamespace)
        },
        _destroy: V.noop,
        widget: function() {
            return this.element
        },
        option: function(t, e) {
            var i, s, n, o = t;
            if (0 === arguments.length)
                return V.widget.extend({}, this.options);
            if ("string" == typeof t)
                if (o = {},
                t = (i = t.split(".")).shift(),
                i.length) {
                    for (s = o[t] = V.widget.extend({}, this.options[t]),
                    n = 0; n < i.length - 1; n++)
                        s[i[n]] = s[i[n]] || {},
                        s = s[i[n]];
                    if (t = i.pop(),
                    1 === arguments.length)
                        return void 0 === s[t] ? null : s[t];
                    s[t] = e
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[t] ? null : this.options[t];
                    o[t] = e
                }
            return this._setOptions(o),
            this
        },
        _setOptions: function(t) {
            for (var e in t)
                this._setOption(e, t[e]);
            return this
        },
        _setOption: function(t, e) {
            return "classes" === t && this._setOptionClasses(e),
            this.options[t] = e,
            "disabled" === t && this._setOptionDisabled(e),
            this
        },
        _setOptionClasses: function(t) {
            var e, i, s;
            for (e in t)
                s = this.classesElementLookup[e],
                t[e] !== this.options.classes[e] && s && s.length && (i = V(s.get()),
                this._removeClass(s, e),
                i.addClass(this._classes({
                    element: i,
                    keys: e,
                    classes: t,
                    add: !0
                })))
        },
        _setOptionDisabled: function(t) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t),
            t && (this._removeClass(this.hoverable, null, "ui-state-hover"),
            this._removeClass(this.focusable, null, "ui-state-focus"))
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _classes: function(n) {
            var o = []
              , a = this;
            function t(t, e) {
                for (var i, s = 0; s < t.length; s++)
                    i = a.classesElementLookup[t[s]] || V(),
                    i = n.add ? (function() {
                        var i = [];
                        n.element.each(function(t, e) {
                            V.map(a.classesElementLookup, function(t) {
                                return t
                            }).some(function(t) {
                                return t.is(e)
                            }) || i.push(e)
                        }),
                        a._on(V(i), {
                            remove: "_untrackClassesElement"
                        })
                    }(),
                    V(V.uniqueSort(i.get().concat(n.element.get())))) : V(i.not(n.element).get()),
                    a.classesElementLookup[t[s]] = i,
                    o.push(t[s]),
                    e && n.classes[t[s]] && o.push(n.classes[t[s]])
            }
            return (n = V.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, n)).keys && t(n.keys.match(/\S+/g) || [], !0),
            n.extra && t(n.extra.match(/\S+/g) || []),
            o.join(" ")
        },
        _untrackClassesElement: function(i) {
            var s = this;
            V.each(s.classesElementLookup, function(t, e) {
                -1 !== V.inArray(i.target, e) && (s.classesElementLookup[t] = V(e.not(i.target).get()))
            }),
            this._off(V(i.target))
        },
        _removeClass: function(t, e, i) {
            return this._toggleClass(t, e, i, !1)
        },
        _addClass: function(t, e, i) {
            return this._toggleClass(t, e, i, !0)
        },
        _toggleClass: function(t, e, i, s) {
            var n = "string" == typeof t || null === t
              , i = {
                extra: n ? e : i,
                keys: n ? t : e,
                element: n ? this.element : t,
                add: s = "boolean" == typeof s ? s : i
            };
            return i.element.toggleClass(this._classes(i), s),
            this
        },
        _on: function(n, o, t) {
            var a, r = this;
            "boolean" != typeof n && (t = o,
            o = n,
            n = !1),
            t ? (o = a = V(o),
            this.bindings = this.bindings.add(o)) : (t = o,
            o = this.element,
            a = this.widget()),
            V.each(t, function(t, e) {
                function i() {
                    if (n || !0 !== r.options.disabled && !V(this).hasClass("ui-state-disabled"))
                        return ("string" == typeof e ? r[e] : e).apply(r, arguments)
                }
                "string" != typeof e && (i.guid = e.guid = e.guid || i.guid || V.guid++);
                var s = t.match(/^([\w:-]*)\s*(.*)$/)
                  , t = s[1] + r.eventNamespace
                  , s = s[2];
                s ? a.on(t, s, i) : o.on(t, i)
            })
        },
        _off: function(t, e) {
            e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            t.off(e),
            this.bindings = V(this.bindings.not(t).get()),
            this.focusable = V(this.focusable.not(t).get()),
            this.hoverable = V(this.hoverable.not(t).get())
        },
        _delay: function(t, e) {
            var i = this;
            return setTimeout(function() {
                return ("string" == typeof t ? i[t] : t).apply(i, arguments)
            }, e || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t),
            this._on(t, {
                mouseenter: function(t) {
                    this._addClass(V(t.currentTarget), null, "ui-state-hover")
                },
                mouseleave: function(t) {
                    this._removeClass(V(t.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t),
            this._on(t, {
                focusin: function(t) {
                    this._addClass(V(t.currentTarget), null, "ui-state-focus")
                },
                focusout: function(t) {
                    this._removeClass(V(t.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function(t, e, i) {
            var s, n, o = this.options[t];
            if (i = i || {},
            (e = V.Event(e)).type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(),
            e.target = this.element[0],
            n = e.originalEvent)
                for (s in n)
                    s in e || (e[s] = n[s]);
            return this.element.trigger(e, i),
            !("function" == typeof o && !1 === o.apply(this.element[0], [e].concat(i)) || e.isDefaultPrevented())
        }
    },
    V.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(o, a) {
        V.Widget.prototype["_" + o] = function(e, t, i) {
            var s, n = (t = "string" == typeof t ? {
                effect: t
            } : t) ? !0 !== t && "number" != typeof t && t.effect || a : o;
            "number" == typeof (t = t || {}) ? t = {
                duration: t
            } : !0 === t && (t = {}),
            s = !V.isEmptyObject(t),
            t.complete = i,
            t.delay && e.delay(t.delay),
            s && V.effects && V.effects.effect[n] ? e[o](t) : n !== o && e[n] ? e[n](t.duration, t.easing, i) : e.queue(function(t) {
                V(this)[o](),
                i && i.call(e[0]),
                t()
            })
        }
    });
    var s, x, k, o, l, h, c, u, C;
    V.widget;
    function D(t, e, i) {
        return [parseFloat(t[0]) * (u.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (u.test(t[1]) ? i / 100 : 1)]
    }
    function I(t, e) {
        return parseInt(V.css(t, e), 10) || 0
    }
    function T(t) {
        return null != t && t === t.window
    }
    x = Math.max,
    k = Math.abs,
    o = /left|center|right/,
    l = /top|center|bottom/,
    h = /[\+\-]\d+(\.[\d]+)?%?/,
    c = /^\w+/,
    u = /%$/,
    C = V.fn.position,
    V.position = {
        scrollbarWidth: function() {
            if (void 0 !== s)
                return s;
            var t, e = V("<div style='display:block;position:absolute;width:200px;height:200px;overflow:hidden;'><div style='height:300px;width:auto;'></div></div>"), i = e.children()[0];
            return V("body").append(e),
            t = i.offsetWidth,
            e.css("overflow", "scroll"),
            t === (i = i.offsetWidth) && (i = e[0].clientWidth),
            e.remove(),
            s = t - i
        },
        getScrollInfo: function(t) {
            var e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x")
              , i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y")
              , e = "scroll" === e || "auto" === e && t.width < t.element[0].scrollWidth;
            return {
                width: "scroll" === i || "auto" === i && t.height < t.element[0].scrollHeight ? V.position.scrollbarWidth() : 0,
                height: e ? V.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(t) {
            var e = V(t || window)
              , i = T(e[0])
              , s = !!e[0] && 9 === e[0].nodeType;
            return {
                element: e,
                isWindow: i,
                isDocument: s,
                offset: !i && !s ? V(t).offset() : {
                    left: 0,
                    top: 0
                },
                scrollLeft: e.scrollLeft(),
                scrollTop: e.scrollTop(),
                width: e.outerWidth(),
                height: e.outerHeight()
            }
        }
    },
    V.fn.position = function(u) {
        if (!u || !u.of)
            return C.apply(this, arguments);
        var d, p, f, g, m, t, _ = "string" == typeof (u = V.extend({}, u)).of ? V(document).find(u.of) : V(u.of), v = V.position.getWithinInfo(u.within), b = V.position.getScrollInfo(v), y = (u.collision || "flip").split(" "), w = {}, e = 9 === (t = (e = _)[0]).nodeType ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : T(t) ? {
            width: e.width(),
            height: e.height(),
            offset: {
                top: e.scrollTop(),
                left: e.scrollLeft()
            }
        } : t.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: t.pageY,
                left: t.pageX
            }
        } : {
            width: e.outerWidth(),
            height: e.outerHeight(),
            offset: e.offset()
        };
        return _[0].preventDefault && (u.at = "left top"),
        p = e.width,
        f = e.height,
        m = V.extend({}, g = e.offset),
        V.each(["my", "at"], function() {
            var t, e, i = (u[this] || "").split(" ");
            (i = 1 === i.length ? o.test(i[0]) ? i.concat(["center"]) : l.test(i[0]) ? ["center"].concat(i) : ["center", "center"] : i)[0] = o.test(i[0]) ? i[0] : "center",
            i[1] = l.test(i[1]) ? i[1] : "center",
            t = h.exec(i[0]),
            e = h.exec(i[1]),
            w[this] = [t ? t[0] : 0, e ? e[0] : 0],
            u[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]
        }),
        1 === y.length && (y[1] = y[0]),
        "right" === u.at[0] ? m.left += p : "center" === u.at[0] && (m.left += p / 2),
        "bottom" === u.at[1] ? m.top += f : "center" === u.at[1] && (m.top += f / 2),
        d = D(w.at, p, f),
        m.left += d[0],
        m.top += d[1],
        this.each(function() {
            var i, t, a = V(this), r = a.outerWidth(), l = a.outerHeight(), e = I(this, "marginLeft"), s = I(this, "marginTop"), n = r + e + I(this, "marginRight") + b.width, o = l + s + I(this, "marginBottom") + b.height, h = V.extend({}, m), c = D(w.my, a.outerWidth(), a.outerHeight());
            "right" === u.my[0] ? h.left -= r : "center" === u.my[0] && (h.left -= r / 2),
            "bottom" === u.my[1] ? h.top -= l : "center" === u.my[1] && (h.top -= l / 2),
            h.left += c[0],
            h.top += c[1],
            i = {
                marginLeft: e,
                marginTop: s
            },
            V.each(["left", "top"], function(t, e) {
                V.ui.position[y[t]] && V.ui.position[y[t]][e](h, {
                    targetWidth: p,
                    targetHeight: f,
                    elemWidth: r,
                    elemHeight: l,
                    collisionPosition: i,
                    collisionWidth: n,
                    collisionHeight: o,
                    offset: [d[0] + c[0], d[1] + c[1]],
                    my: u.my,
                    at: u.at,
                    within: v,
                    elem: a
                })
            }),
            u.using && (t = function(t) {
                var e = g.left - h.left
                  , i = e + p - r
                  , s = g.top - h.top
                  , n = s + f - l
                  , o = {
                    target: {
                        element: _,
                        left: g.left,
                        top: g.top,
                        width: p,
                        height: f
                    },
                    element: {
                        element: a,
                        left: h.left,
                        top: h.top,
                        width: r,
                        height: l
                    },
                    horizontal: i < 0 ? "left" : 0 < e ? "right" : "center",
                    vertical: n < 0 ? "top" : 0 < s ? "bottom" : "middle"
                };
                p < r && k(e + i) < p && (o.horizontal = "center"),
                f < l && k(s + n) < f && (o.vertical = "middle"),
                x(k(e), k(i)) > x(k(s), k(n)) ? o.important = "horizontal" : o.important = "vertical",
                u.using.call(this, t, o)
            }
            ),
            a.offset(V.extend(h, {
                using: t
            }))
        })
    }
    ,
    V.ui.position = {
        fit: {
            left: function(t, e) {
                var i = e.within
                  , s = i.isWindow ? i.scrollLeft : i.offset.left
                  , n = i.width
                  , o = t.left - e.collisionPosition.marginLeft
                  , a = s - o
                  , r = o + e.collisionWidth - n - s;
                e.collisionWidth > n ? 0 < a && r <= 0 ? (i = t.left + a + e.collisionWidth - n - s,
                t.left += a - i) : t.left = !(0 < r && a <= 0) && r < a ? s + n - e.collisionWidth : s : 0 < a ? t.left += a : 0 < r ? t.left -= r : t.left = x(t.left - o, t.left)
            },
            top: function(t, e) {
                var i = e.within
                  , s = i.isWindow ? i.scrollTop : i.offset.top
                  , n = e.within.height
                  , o = t.top - e.collisionPosition.marginTop
                  , a = s - o
                  , r = o + e.collisionHeight - n - s;
                e.collisionHeight > n ? 0 < a && r <= 0 ? (i = t.top + a + e.collisionHeight - n - s,
                t.top += a - i) : t.top = !(0 < r && a <= 0) && r < a ? s + n - e.collisionHeight : s : 0 < a ? t.top += a : 0 < r ? t.top -= r : t.top = x(t.top - o, t.top)
            }
        },
        flip: {
            left: function(t, e) {
                var i = e.within
                  , s = i.offset.left + i.scrollLeft
                  , n = i.width
                  , o = i.isWindow ? i.scrollLeft : i.offset.left
                  , a = t.left - e.collisionPosition.marginLeft
                  , r = a - o
                  , l = a + e.collisionWidth - n - o
                  , h = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0
                  , i = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0
                  , a = -2 * e.offset[0];
                r < 0 ? ((s = t.left + h + i + a + e.collisionWidth - n - s) < 0 || s < k(r)) && (t.left += h + i + a) : 0 < l && (0 < (o = t.left - e.collisionPosition.marginLeft + h + i + a - o) || k(o) < l) && (t.left += h + i + a)
            },
            top: function(t, e) {
                var i = e.within
                  , s = i.offset.top + i.scrollTop
                  , n = i.height
                  , o = i.isWindow ? i.scrollTop : i.offset.top
                  , a = t.top - e.collisionPosition.marginTop
                  , r = a - o
                  , l = a + e.collisionHeight - n - o
                  , h = "top" === e.my[1] ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0
                  , i = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0
                  , a = -2 * e.offset[1];
                r < 0 ? ((s = t.top + h + i + a + e.collisionHeight - n - s) < 0 || s < k(r)) && (t.top += h + i + a) : 0 < l && (0 < (o = t.top - e.collisionPosition.marginTop + h + i + a - o) || k(o) < l) && (t.top += h + i + a)
            }
        },
        flipfit: {
            left: function() {
                V.ui.position.flip.left.apply(this, arguments),
                V.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                V.ui.position.flip.top.apply(this, arguments),
                V.ui.position.fit.top.apply(this, arguments)
            }
        }
    };
    V.ui.position,
    V.extend(V.expr.pseudos, {
        data: V.expr.createPseudo ? V.expr.createPseudo(function(e) {
            return function(t) {
                return !!V.data(t, e)
            }
        }) : function(t, e, i) {
            return !!V.data(t, i[3])
        }
    }),
    V.fn.extend({
        disableSelection: (t = "onselectstart"in document.createElement("div") ? "selectstart" : "mousedown",
        function() {
            return this.on(t + ".ui-disableSelection", function(t) {
                t.preventDefault()
            })
        }
        ),
        enableSelection: function() {
            return this.off(".ui-disableSelection")
        }
    });
    var t, d = V, p = {}, e = p.toString, f = /^([\-+])=\s*(\d+\.?\d*)/, g = [{
        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function(t) {
            return [t[1], t[2], t[3], t[4]]
        }
    }, {
        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function(t) {
            return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
        }
    }, {
        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?/,
        parse: function(t) {
            return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16), t[4] ? (parseInt(t[4], 16) / 255).toFixed(2) : 1]
        }
    }, {
        re: /#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?/,
        parse: function(t) {
            return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16), t[4] ? (parseInt(t[4] + t[4], 16) / 255).toFixed(2) : 1]
        }
    }, {
        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        space: "hsla",
        parse: function(t) {
            return [t[1], t[2] / 100, t[3] / 100, t[4]]
        }
    }], m = d.Color = function(t, e, i, s) {
        return new d.Color.fn.parse(t,e,i,s)
    }
    , _ = {
        rgba: {
            props: {
                red: {
                    idx: 0,
                    type: "byte"
                },
                green: {
                    idx: 1,
                    type: "byte"
                },
                blue: {
                    idx: 2,
                    type: "byte"
                }
            }
        },
        hsla: {
            props: {
                hue: {
                    idx: 0,
                    type: "degrees"
                },
                saturation: {
                    idx: 1,
                    type: "percent"
                },
                lightness: {
                    idx: 2,
                    type: "percent"
                }
            }
        }
    }, v = {
        byte: {
            floor: !0,
            max: 255
        },
        percent: {
            max: 1
        },
        degrees: {
            mod: 360,
            floor: !0
        }
    }, b = m.support = {}, y = d("<p>")[0], w = d.each;
    function P(t) {
        return null == t ? t + "" : "object" == typeof t ? p[e.call(t)] || "object" : typeof t
    }
    function M(t, e, i) {
        var s = v[e.type] || {};
        return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t),
        isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : Math.min(s.max, Math.max(0, t)))
    }
    function S(s) {
        var n = m()
          , o = n._rgba = [];
        return s = s.toLowerCase(),
        w(g, function(t, e) {
            var i = e.re.exec(s)
              , i = i && e.parse(i)
              , e = e.space || "rgba";
            if (i)
                return i = n[e](i),
                n[_[e].cache] = i[_[e].cache],
                o = n._rgba = i._rgba,
                !1
        }),
        o.length ? ("0,0,0,0" === o.join() && d.extend(o, B.transparent),
        n) : B[s]
    }
    function H(t, e, i) {
        return 6 * (i = (i + 1) % 1) < 1 ? t + (e - t) * i * 6 : 2 * i < 1 ? e : 3 * i < 2 ? t + (e - t) * (2 / 3 - i) * 6 : t
    }
    y.style.cssText = "background-color:rgba(1,1,1,.5)",
    b.rgba = -1 < y.style.backgroundColor.indexOf("rgba"),
    w(_, function(t, e) {
        e.cache = "_" + t,
        e.props.alpha = {
            idx: 3,
            type: "percent",
            def: 1
        }
    }),
    d.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
        p["[object " + e + "]"] = e.toLowerCase()
    }),
    (m.fn = d.extend(m.prototype, {
        parse: function(n, t, e, i) {
            if (void 0 === n)
                return this._rgba = [null, null, null, null],
                this;
            (n.jquery || n.nodeType) && (n = d(n).css(t),
            t = void 0);
            var o = this
              , s = P(n)
              , a = this._rgba = [];
            return void 0 !== t && (n = [n, t, e, i],
            s = "array"),
            "string" === s ? this.parse(S(n) || B._default) : "array" === s ? (w(_.rgba.props, function(t, e) {
                a[e.idx] = M(n[e.idx], e)
            }),
            this) : "object" === s ? (w(_, n instanceof m ? function(t, e) {
                n[e.cache] && (o[e.cache] = n[e.cache].slice())
            }
            : function(t, i) {
                var s = i.cache;
                w(i.props, function(t, e) {
                    if (!o[s] && i.to) {
                        if ("alpha" === t || null == n[t])
                            return;
                        o[s] = i.to(o._rgba)
                    }
                    o[s][e.idx] = M(n[t], e, !0)
                }),
                o[s] && d.inArray(null, o[s].slice(0, 3)) < 0 && (null == o[s][3] && (o[s][3] = 1),
                i.from && (o._rgba = i.from(o[s])))
            }
            ),
            this) : void 0
        },
        is: function(t) {
            var n = m(t)
              , o = !0
              , a = this;
            return w(_, function(t, e) {
                var i, s = n[e.cache];
                return s && (i = a[e.cache] || e.to && e.to(a._rgba) || [],
                w(e.props, function(t, e) {
                    if (null != s[e.idx])
                        return o = s[e.idx] === i[e.idx]
                })),
                o
            }),
            o
        },
        _space: function() {
            var i = []
              , s = this;
            return w(_, function(t, e) {
                s[e.cache] && i.push(t)
            }),
            i.pop()
        },
        transition: function(t, a) {
            var e = (h = m(t))._space()
              , i = _[e]
              , t = 0 === this.alpha() ? m("transparent") : this
              , r = t[i.cache] || i.to(t._rgba)
              , l = r.slice()
              , h = h[i.cache];
            return w(i.props, function(t, e) {
                var i = e.idx
                  , s = r[i]
                  , n = h[i]
                  , o = v[e.type] || {};
                null !== n && (null === s ? l[i] = n : (o.mod && (n - s > o.mod / 2 ? s += o.mod : s - n > o.mod / 2 && (s -= o.mod)),
                l[i] = M((n - s) * a + s, e)))
            }),
            this[e](l)
        },
        blend: function(t) {
            if (1 === this._rgba[3])
                return this;
            var e = this._rgba.slice()
              , i = e.pop()
              , s = m(t)._rgba;
            return m(d.map(e, function(t, e) {
                return (1 - i) * s[e] + i * t
            }))
        },
        toRgbaString: function() {
            var t = "rgba("
              , e = d.map(this._rgba, function(t, e) {
                return null != t ? t : 2 < e ? 1 : 0
            });
            return 1 === e[3] && (e.pop(),
            t = "rgb("),
            t + e.join() + ")"
        },
        toHslaString: function() {
            var t = "hsla("
              , e = d.map(this.hsla(), function(t, e) {
                return null == t && (t = 2 < e ? 1 : 0),
                t = e && e < 3 ? Math.round(100 * t) + "%" : t
            });
            return 1 === e[3] && (e.pop(),
            t = "hsl("),
            t + e.join() + ")"
        },
        toHexString: function(t) {
            var e = this._rgba.slice()
              , i = e.pop();
            return t && e.push(~~(255 * i)),
            "#" + d.map(e, function(t) {
                return 1 === (t = (t || 0).toString(16)).length ? "0" + t : t
            }).join("")
        },
        toString: function() {
            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
        }
    })).parse.prototype = m.fn,
    _.hsla.to = function(t) {
        if (null == t[0] || null == t[1] || null == t[2])
            return [null, null, null, t[3]];
        var e = t[0] / 255
          , i = t[1] / 255
          , s = t[2] / 255
          , n = t[3]
          , o = Math.max(e, i, s)
          , a = Math.min(e, i, s)
          , r = o - a
          , l = o + a
          , t = .5 * l
          , i = a === o ? 0 : e === o ? 60 * (i - s) / r + 360 : i === o ? 60 * (s - e) / r + 120 : 60 * (e - i) / r + 240
          , l = 0 == r ? 0 : t <= .5 ? r / l : r / (2 - l);
        return [Math.round(i) % 360, l, t, null == n ? 1 : n]
    }
    ,
    _.hsla.from = function(t) {
        if (null == t[0] || null == t[1] || null == t[2])
            return [null, null, null, t[3]];
        var e = t[0] / 360
          , i = t[1]
          , s = t[2]
          , t = t[3]
          , i = s <= .5 ? s * (1 + i) : s + i - s * i
          , s = 2 * s - i;
        return [Math.round(255 * H(s, i, e + 1 / 3)), Math.round(255 * H(s, i, e)), Math.round(255 * H(s, i, e - 1 / 3)), t]
    }
    ,
    w(_, function(l, t) {
        var e = t.props
          , o = t.cache
          , a = t.to
          , r = t.from;
        m.fn[l] = function(t) {
            if (a && !this[o] && (this[o] = a(this._rgba)),
            void 0 === t)
                return this[o].slice();
            var i = P(t)
              , s = "array" === i || "object" === i ? t : arguments
              , n = this[o].slice();
            return w(e, function(t, e) {
                t = s["object" === i ? t : e.idx];
                null == t && (t = n[e.idx]),
                n[e.idx] = M(t, e)
            }),
            r ? ((t = m(r(n)))[o] = n,
            t) : m(n)
        }
        ,
        w(e, function(a, r) {
            m.fn[a] || (m.fn[a] = function(t) {
                var e, i = P(t), s = "alpha" === a ? this._hsla ? "hsla" : "rgba" : l, n = this[s](), o = n[r.idx];
                return "undefined" === i ? o : ("function" === i && (i = P(t = t.call(this, o))),
                null == t && r.empty ? this : ("string" === i && (e = f.exec(t)) && (t = o + parseFloat(e[2]) * ("+" === e[1] ? 1 : -1)),
                n[r.idx] = t,
                this[s](n)))
            }
            )
        })
    }),
    (m.hook = function(t) {
        t = t.split(" ");
        w(t, function(t, o) {
            d.cssHooks[o] = {
                set: function(t, e) {
                    var i, s, n = "";
                    if ("transparent" !== e && ("string" !== P(e) || (i = S(e)))) {
                        if (e = m(i || e),
                        !b.rgba && 1 !== e._rgba[3]) {
                            for (s = "backgroundColor" === o ? t.parentNode : t; ("" === n || "transparent" === n) && s && s.style; )
                                try {
                                    n = d.css(s, "backgroundColor"),
                                    s = s.parentNode
                                } catch (t) {}
                            e = e.blend(n && "transparent" !== n ? n : "_default")
                        }
                        e = e.toRgbaString()
                    }
                    try {
                        t.style[o] = e
                    } catch (t) {}
                }
            },
            d.fx.step[o] = function(t) {
                t.colorInit || (t.start = m(t.elem, o),
                t.end = m(t.end),
                t.colorInit = !0),
                d.cssHooks[o].set(t.elem, t.start.transition(t.end, t.pos))
            }
        })
    }
    )("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),
    d.cssHooks.borderColor = {
        expand: function(i) {
            var s = {};
            return w(["Top", "Right", "Bottom", "Left"], function(t, e) {
                s["border" + e + "Color"] = i
            }),
            s
        }
    };
    var z, A, O, N, E, W, F, L, R, Y, B = d.Color.names = {
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
        _default: "#ffffff"
    }, j = "ui-effects-", q = "ui-effects-style", K = "ui-effects-animated";
    function U(t) {
        var e, i, s = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, n = {};
        if (s && s.length && s[0] && s[s[0]])
            for (i = s.length; i--; )
                "string" == typeof s[e = s[i]] && (n[e.replace(/-([\da-z])/gi, function(t, e) {
                    return e.toUpperCase()
                })] = s[e]);
        else
            for (e in s)
                "string" == typeof s[e] && (n[e] = s[e]);
        return n
    }
    function X(t, e, i, s) {
        return t = {
            effect: t = V.isPlainObject(t) ? (e = t).effect : t
        },
        "function" == typeof (e = null == e ? {} : e) && (s = e,
        i = null,
        e = {}),
        "number" != typeof e && !V.fx.speeds[e] || (s = i,
        i = e,
        e = {}),
        "function" == typeof i && (s = i,
        i = null),
        e && V.extend(t, e),
        i = i || e.duration,
        t.duration = V.fx.off ? 0 : "number" == typeof i ? i : i in V.fx.speeds ? V.fx.speeds[i] : V.fx.speeds._default,
        t.complete = s || e.complete,
        t
    }
    function $(t) {
        return !t || "number" == typeof t || V.fx.speeds[t] || ("string" == typeof t && !V.effects.effect[t] || ("function" == typeof t || "object" == typeof t && !t.effect))
    }
    function G(t, e) {
        var i = e.outerWidth()
          , e = e.outerHeight()
          , t = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(t) || ["", 0, i, e, 0];
        return {
            top: parseFloat(t[1]) || 0,
            right: "auto" === t[2] ? i : parseFloat(t[2]),
            bottom: "auto" === t[3] ? e : parseFloat(t[3]),
            left: parseFloat(t[4]) || 0
        }
    }
    V.effects = {
        effect: {}
    },
    N = ["add", "remove", "toggle"],
    E = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    },
    V.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, e) {
        V.fx.step[e] = function(t) {
            ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (d.style(t.elem, e, t.end),
            t.setAttr = !0)
        }
    }),
    V.fn.addBack || (V.fn.addBack = function(t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }
    ),
    V.effects.animateClass = function(n, t, e, i) {
        var o = V.speed(t, e, i);
        return this.queue(function() {
            var i = V(this)
              , t = i.attr("class") || ""
              , e = (e = o.children ? i.find("*").addBack() : i).map(function() {
                return {
                    el: V(this),
                    start: U(this)
                }
            })
              , s = function() {
                V.each(N, function(t, e) {
                    n[e] && i[e + "Class"](n[e])
                })
            };
            s(),
            e = e.map(function() {
                return this.end = U(this.el[0]),
                this.diff = function(t, e) {
                    var i, s, n = {};
                    for (i in e)
                        s = e[i],
                        t[i] !== s && (E[i] || !V.fx.step[i] && isNaN(parseFloat(s)) || (n[i] = s));
                    return n
                }(this.start, this.end),
                this
            }),
            i.attr("class", t),
            e = e.map(function() {
                var t = this
                  , e = V.Deferred()
                  , i = V.extend({}, o, {
                    queue: !1,
                    complete: function() {
                        e.resolve(t)
                    }
                });
                return this.el.animate(this.diff, i),
                e.promise()
            }),
            V.when.apply(V, e.get()).done(function() {
                s(),
                V.each(arguments, function() {
                    var e = this.el;
                    V.each(this.diff, function(t) {
                        e.css(t, "")
                    })
                }),
                o.complete.call(i[0])
            })
        })
    }
    ,
    V.fn.extend({
        addClass: (O = V.fn.addClass,
        function(t, e, i, s) {
            return e ? V.effects.animateClass.call(this, {
                add: t
            }, e, i, s) : O.apply(this, arguments)
        }
        ),
        removeClass: (A = V.fn.removeClass,
        function(t, e, i, s) {
            return 1 < arguments.length ? V.effects.animateClass.call(this, {
                remove: t
            }, e, i, s) : A.apply(this, arguments)
        }
        ),
        toggleClass: (z = V.fn.toggleClass,
        function(t, e, i, s, n) {
            return "boolean" == typeof e || void 0 === e ? i ? V.effects.animateClass.call(this, e ? {
                add: t
            } : {
                remove: t
            }, i, s, n) : z.apply(this, arguments) : V.effects.animateClass.call(this, {
                toggle: t
            }, e, i, s)
        }
        ),
        switchClass: function(t, e, i, s, n) {
            return V.effects.animateClass.call(this, {
                add: e,
                remove: t
            }, i, s, n)
        }
    }),
    V.expr && V.expr.pseudos && V.expr.pseudos.animated && (V.expr.pseudos.animated = (W = V.expr.pseudos.animated,
    function(t) {
        return !!V(t).data(K) || W(t)
    }
    )),
    !1 !== V.uiBackCompat && V.extend(V.effects, {
        save: function(t, e) {
            for (var i = 0, s = e.length; i < s; i++)
                null !== e[i] && t.data(j + e[i], t[0].style[e[i]])
        },
        restore: function(t, e) {
            for (var i, s = 0, n = e.length; s < n; s++)
                null !== e[s] && (i = t.data(j + e[s]),
                t.css(e[s], i))
        },
        setMode: function(t, e) {
            return e = "toggle" === e ? t.is(":hidden") ? "show" : "hide" : e
        },
        createWrapper: function(i) {
            if (i.parent().is(".ui-effects-wrapper"))
                return i.parent();
            var s = {
                width: i.outerWidth(!0),
                height: i.outerHeight(!0),
                float: i.css("float")
            }
              , t = V("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            })
              , e = {
                width: i.width(),
                height: i.height()
            }
              , n = document.activeElement;
            try {
                n.id
            } catch (t) {
                n = document.body
            }
            return i.wrap(t),
            i[0] !== n && !V.contains(i[0], n) || V(n).trigger("focus"),
            t = i.parent(),
            "static" === i.css("position") ? (t.css({
                position: "relative"
            }),
            i.css({
                position: "relative"
            })) : (V.extend(s, {
                position: i.css("position"),
                zIndex: i.css("z-index")
            }),
            V.each(["top", "left", "bottom", "right"], function(t, e) {
                s[e] = i.css(e),
                isNaN(parseInt(s[e], 10)) && (s[e] = "auto")
            }),
            i.css({
                position: "relative",
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            })),
            i.css(e),
            t.css(s).show()
        },
        removeWrapper: function(t) {
            var e = document.activeElement;
            return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t),
            t[0] !== e && !V.contains(t[0], e) || V(e).trigger("focus")),
            t
        }
    }),
    V.extend(V.effects, {
        version: "1.13.1",
        define: function(t, e, i) {
            return i || (i = e,
            e = "effect"),
            V.effects.effect[t] = i,
            V.effects.effect[t].mode = e,
            i
        },
        scaledDimensions: function(t, e, i) {
            if (0 === e)
                return {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0
                };
            var s = "horizontal" !== i ? (e || 100) / 100 : 1
              , e = "vertical" !== i ? (e || 100) / 100 : 1;
            return {
                height: t.height() * e,
                width: t.width() * s,
                outerHeight: t.outerHeight() * e,
                outerWidth: t.outerWidth() * s
            }
        },
        clipToBox: function(t) {
            return {
                width: t.clip.right - t.clip.left,
                height: t.clip.bottom - t.clip.top,
                left: t.clip.left,
                top: t.clip.top
            }
        },
        unshift: function(t, e, i) {
            var s = t.queue();
            1 < e && s.splice.apply(s, [1, 0].concat(s.splice(e, i))),
            t.dequeue()
        },
        saveStyle: function(t) {
            t.data(q, t[0].style.cssText)
        },
        restoreStyle: function(t) {
            t[0].style.cssText = t.data(q) || "",
            t.removeData(q)
        },
        mode: function(t, e) {
            t = t.is(":hidden");
            return "toggle" === e && (e = t ? "show" : "hide"),
            e = (t ? "hide" === e : "show" === e) ? "none" : e
        },
        getBaseline: function(t, e) {
            var i, s;
            switch (t[0]) {
            case "top":
                i = 0;
                break;
            case "middle":
                i = .5;
                break;
            case "bottom":
                i = 1;
                break;
            default:
                i = t[0] / e.height
            }
            switch (t[1]) {
            case "left":
                s = 0;
                break;
            case "center":
                s = .5;
                break;
            case "right":
                s = 1;
                break;
            default:
                s = t[1] / e.width
            }
            return {
                x: s,
                y: i
            }
        },
        createPlaceholder: function(t) {
            var e, i = t.css("position"), s = t.position();
            return t.css({
                marginTop: t.css("marginTop"),
                marginBottom: t.css("marginBottom"),
                marginLeft: t.css("marginLeft"),
                marginRight: t.css("marginRight")
            }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()),
            /^(static|relative)/.test(i) && (i = "absolute",
            e = V("<" + t[0].nodeName + ">").insertAfter(t).css({
                display: /^(inline|ruby)/.test(t.css("display")) ? "inline-block" : "block",
                visibility: "hidden",
                marginTop: t.css("marginTop"),
                marginBottom: t.css("marginBottom"),
                marginLeft: t.css("marginLeft"),
                marginRight: t.css("marginRight"),
                float: t.css("float")
            }).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"),
            t.data(j + "placeholder", e)),
            t.css({
                position: i,
                left: s.left,
                top: s.top
            }),
            e
        },
        removePlaceholder: function(t) {
            var e = j + "placeholder"
              , i = t.data(e);
            i && (i.remove(),
            t.removeData(e))
        },
        cleanUp: function(t) {
            V.effects.restoreStyle(t),
            V.effects.removePlaceholder(t)
        },
        setTransition: function(s, t, n, o) {
            return o = o || {},
            V.each(t, function(t, e) {
                var i = s.cssUnit(e);
                0 < i[0] && (o[e] = i[0] * n + i[1])
            }),
            o
        }
    }),
    V.fn.extend({
        effect: function() {
            function t(t) {
                var e = V(this)
                  , i = V.effects.mode(e, r) || o;
                e.data(K, !0),
                l.push(i),
                o && ("show" === i || i === o && "hide" === i) && e.show(),
                o && "none" === i || V.effects.saveStyle(e),
                "function" == typeof t && t()
            }
            var s = X.apply(this, arguments)
              , n = V.effects.effect[s.effect]
              , o = n.mode
              , e = s.queue
              , i = e || "fx"
              , a = s.complete
              , r = s.mode
              , l = [];
            return V.fx.off || !n ? r ? this[r](s.duration, a) : this.each(function() {
                a && a.call(this)
            }) : !1 === e ? this.each(t).each(h) : this.queue(i, t).queue(i, h);
            function h(t) {
                var e = V(this);
                function i() {
                    "function" == typeof a && a.call(e[0]),
                    "function" == typeof t && t()
                }
                s.mode = l.shift(),
                !1 === V.uiBackCompat || o ? "none" === s.mode ? (e[r](),
                i()) : n.call(e[0], s, function() {
                    e.removeData(K),
                    V.effects.cleanUp(e),
                    "hide" === s.mode && e.hide(),
                    i()
                }) : (e.is(":hidden") ? "hide" === r : "show" === r) ? (e[r](),
                i()) : n.call(e[0], s, i)
            }
        },
        show: (R = V.fn.show,
        function(t) {
            if ($(t))
                return R.apply(this, arguments);
            t = X.apply(this, arguments);
            return t.mode = "show",
            this.effect.call(this, t)
        }
        ),
        hide: (L = V.fn.hide,
        function(t) {
            if ($(t))
                return L.apply(this, arguments);
            t = X.apply(this, arguments);
            return t.mode = "hide",
            this.effect.call(this, t)
        }
        ),
        toggle: (F = V.fn.toggle,
        function(t) {
            if ($(t) || "boolean" == typeof t)
                return F.apply(this, arguments);
            t = X.apply(this, arguments);
            return t.mode = "toggle",
            this.effect.call(this, t)
        }
        ),
        cssUnit: function(t) {
            var i = this.css(t)
              , s = [];
            return V.each(["em", "px", "%", "pt"], function(t, e) {
                0 < i.indexOf(e) && (s = [parseFloat(i), e])
            }),
            s
        },
        cssClip: function(t) {
            return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : G(this.css("clip"), this)
        },
        transfer: function(t, e) {
            var i = V(this)
              , s = V(t.to)
              , n = "fixed" === s.css("position")
              , o = V("body")
              , a = n ? o.scrollTop() : 0
              , r = n ? o.scrollLeft() : 0
              , o = s.offset()
              , o = {
                top: o.top - a,
                left: o.left - r,
                height: s.innerHeight(),
                width: s.innerWidth()
            }
              , s = i.offset()
              , l = V("<div class='ui-effects-transfer'></div>");
            l.appendTo("body").addClass(t.className).css({
                top: s.top - a,
                left: s.left - r,
                height: i.innerHeight(),
                width: i.innerWidth(),
                position: n ? "fixed" : "absolute"
            }).animate(o, t.duration, t.easing, function() {
                l.remove(),
                "function" == typeof e && e()
            })
        }
    }),
    V.fx.step.clip = function(t) {
        t.clipInit || (t.start = V(t.elem).cssClip(),
        "string" == typeof t.end && (t.end = G(t.end, t.elem)),
        t.clipInit = !0),
        V(t.elem).cssClip({
            top: t.pos * (t.end.top - t.start.top) + t.start.top,
            right: t.pos * (t.end.right - t.start.right) + t.start.right,
            bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
            left: t.pos * (t.end.left - t.start.left) + t.start.left
        })
    }
    ,
    Y = {},
    V.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, t) {
        Y[t] = function(t) {
            return Math.pow(t, e + 2)
        }
    }),
    V.extend(Y, {
        Sine: function(t) {
            return 1 - Math.cos(t * Math.PI / 2)
        },
        Circ: function(t) {
            return 1 - Math.sqrt(1 - t * t)
        },
        Elastic: function(t) {
            return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
        },
        Back: function(t) {
            return t * t * (3 * t - 2)
        },
        Bounce: function(t) {
            for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11; )
                ;
            return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
        }
    }),
    V.each(Y, function(t, e) {
        V.easing["easeIn" + t] = e,
        V.easing["easeOut" + t] = function(t) {
            return 1 - e(1 - t)
        }
        ,
        V.easing["easeInOut" + t] = function(t) {
            return t < .5 ? e(2 * t) / 2 : 1 - e(-2 * t + 2) / 2
        }
    });
    y = V.effects,
    V.effects.define("blind", "hide", function(t, e) {
        var i = {
            up: ["bottom", "top"],
            vertical: ["bottom", "top"],
            down: ["top", "bottom"],
            left: ["right", "left"],
            horizontal: ["right", "left"],
            right: ["left", "right"]
        }
          , s = V(this)
          , n = t.direction || "up"
          , o = s.cssClip()
          , a = {
            clip: V.extend({}, o)
        }
          , r = V.effects.createPlaceholder(s);
        a.clip[i[n][0]] = a.clip[i[n][1]],
        "show" === t.mode && (s.cssClip(a.clip),
        r && r.css(V.effects.clipToBox(a)),
        a.clip = o),
        r && r.animate(V.effects.clipToBox(a), t.duration, t.easing),
        s.animate(a, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        })
    }),
    V.effects.define("bounce", function(t, e) {
        var i, s, n = V(this), o = t.mode, a = "hide" === o, r = "show" === o, l = t.direction || "up", h = t.distance, c = t.times || 5, o = 2 * c + (r || a ? 1 : 0), u = t.duration / o, d = t.easing, p = "up" === l || "down" === l ? "top" : "left", f = "up" === l || "left" === l, g = 0, t = n.queue().length;
        for (V.effects.createPlaceholder(n),
        l = n.css(p),
        h = h || n["top" == p ? "outerHeight" : "outerWidth"]() / 3,
        r && ((s = {
            opacity: 1
        })[p] = l,
        n.css("opacity", 0).css(p, f ? 2 * -h : 2 * h).animate(s, u, d)),
        a && (h /= Math.pow(2, c - 1)),
        (s = {})[p] = l; g < c; g++)
            (i = {})[p] = (f ? "-=" : "+=") + h,
            n.animate(i, u, d).animate(s, u, d),
            h = a ? 2 * h : h / 2;
        a && ((i = {
            opacity: 0
        })[p] = (f ? "-=" : "+=") + h,
        n.animate(i, u, d)),
        n.queue(e),
        V.effects.unshift(n, t, 1 + o)
    }),
    V.effects.define("clip", "hide", function(t, e) {
        var i = {}
          , s = V(this)
          , n = t.direction || "vertical"
          , o = "both" === n
          , a = o || "horizontal" === n
          , o = o || "vertical" === n
          , n = s.cssClip();
        i.clip = {
            top: o ? (n.bottom - n.top) / 2 : n.top,
            right: a ? (n.right - n.left) / 2 : n.right,
            bottom: o ? (n.bottom - n.top) / 2 : n.bottom,
            left: a ? (n.right - n.left) / 2 : n.left
        },
        V.effects.createPlaceholder(s),
        "show" === t.mode && (s.cssClip(i.clip),
        i.clip = n),
        s.animate(i, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        })
    }),
    V.effects.define("drop", "hide", function(t, e) {
        var i = V(this)
          , s = "show" === t.mode
          , n = t.direction || "left"
          , o = "up" === n || "down" === n ? "top" : "left"
          , a = "up" === n || "left" === n ? "-=" : "+="
          , r = "+=" == a ? "-=" : "+="
          , l = {
            opacity: 0
        };
        V.effects.createPlaceholder(i),
        n = t.distance || i["top" == o ? "outerHeight" : "outerWidth"](!0) / 2,
        l[o] = a + n,
        s && (i.css(l),
        l[o] = r + n,
        l.opacity = 1),
        i.animate(l, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        })
    }),
    V.effects.define("explode", "hide", function(t, e) {
        var i, s, n, o, a, r, l = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3, h = l, c = V(this), u = "show" === t.mode, d = c.show().css("visibility", "hidden").offset(), p = Math.ceil(c.outerWidth() / h), f = Math.ceil(c.outerHeight() / l), g = [];
        function m() {
            g.push(this),
            g.length === l * h && (c.css({
                visibility: "visible"
            }),
            V(g).remove(),
            e())
        }
        for (i = 0; i < l; i++)
            for (o = d.top + i * f,
            r = i - (l - 1) / 2,
            s = 0; s < h; s++)
                n = d.left + s * p,
                a = s - (h - 1) / 2,
                c.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -s * p,
                    top: -i * f
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: p,
                    height: f,
                    left: n + (u ? a * p : 0),
                    top: o + (u ? r * f : 0),
                    opacity: u ? 0 : 1
                }).animate({
                    left: n + (u ? 0 : a * p),
                    top: o + (u ? 0 : r * f),
                    opacity: u ? 1 : 0
                }, t.duration || 500, t.easing, m)
    }),
    V.effects.define("fade", "toggle", function(t, e) {
        var i = "show" === t.mode;
        V(this).css("opacity", i ? 0 : 1).animate({
            opacity: i ? 1 : 0
        }, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        })
    }),
    V.effects.define("fold", "hide", function(e, t) {
        var i = V(this)
          , s = e.mode
          , n = "show" === s
          , o = "hide" === s
          , a = e.size || 15
          , r = /([0-9]+)%/.exec(a)
          , l = !!e.horizFirst ? ["right", "bottom"] : ["bottom", "right"]
          , h = e.duration / 2
          , c = V.effects.createPlaceholder(i)
          , u = i.cssClip()
          , d = {
            clip: V.extend({}, u)
        }
          , p = {
            clip: V.extend({}, u)
        }
          , f = [u[l[0]], u[l[1]]]
          , s = i.queue().length;
        r && (a = parseInt(r[1], 10) / 100 * f[o ? 0 : 1]),
        d.clip[l[0]] = a,
        p.clip[l[0]] = a,
        p.clip[l[1]] = 0,
        n && (i.cssClip(p.clip),
        c && c.css(V.effects.clipToBox(p)),
        p.clip = u),
        i.queue(function(t) {
            c && c.animate(V.effects.clipToBox(d), h, e.easing).animate(V.effects.clipToBox(p), h, e.easing),
            t()
        }).animate(d, h, e.easing).animate(p, h, e.easing).queue(t),
        V.effects.unshift(i, s, 4)
    }),
    V.effects.define("highlight", "show", function(t, e) {
        var i = V(this)
          , s = {
            backgroundColor: i.css("backgroundColor")
        };
        "hide" === t.mode && (s.opacity = 0),
        V.effects.saveStyle(i),
        i.css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99"
        }).animate(s, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        })
    }),
    V.effects.define("size", function(s, e) {
        var n, i = V(this), t = ["fontSize"], o = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], a = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], r = s.mode, l = "effect" !== r, h = s.scale || "both", c = s.origin || ["middle", "center"], u = i.css("position"), d = i.position(), p = V.effects.scaledDimensions(i), f = s.from || p, g = s.to || V.effects.scaledDimensions(i, 0);
        V.effects.createPlaceholder(i),
        "show" === r && (r = f,
        f = g,
        g = r),
        n = {
            from: {
                y: f.height / p.height,
                x: f.width / p.width
            },
            to: {
                y: g.height / p.height,
                x: g.width / p.width
            }
        },
        "box" !== h && "both" !== h || (n.from.y !== n.to.y && (f = V.effects.setTransition(i, o, n.from.y, f),
        g = V.effects.setTransition(i, o, n.to.y, g)),
        n.from.x !== n.to.x && (f = V.effects.setTransition(i, a, n.from.x, f),
        g = V.effects.setTransition(i, a, n.to.x, g))),
        "content" !== h && "both" !== h || n.from.y !== n.to.y && (f = V.effects.setTransition(i, t, n.from.y, f),
        g = V.effects.setTransition(i, t, n.to.y, g)),
        c && (c = V.effects.getBaseline(c, p),
        f.top = (p.outerHeight - f.outerHeight) * c.y + d.top,
        f.left = (p.outerWidth - f.outerWidth) * c.x + d.left,
        g.top = (p.outerHeight - g.outerHeight) * c.y + d.top,
        g.left = (p.outerWidth - g.outerWidth) * c.x + d.left),
        delete f.outerHeight,
        delete f.outerWidth,
        i.css(f),
        "content" !== h && "both" !== h || (o = o.concat(["marginTop", "marginBottom"]).concat(t),
        a = a.concat(["marginLeft", "marginRight"]),
        i.find("*[width]").each(function() {
            var t = V(this)
              , e = V.effects.scaledDimensions(t)
              , i = {
                height: e.height * n.from.y,
                width: e.width * n.from.x,
                outerHeight: e.outerHeight * n.from.y,
                outerWidth: e.outerWidth * n.from.x
            }
              , e = {
                height: e.height * n.to.y,
                width: e.width * n.to.x,
                outerHeight: e.height * n.to.y,
                outerWidth: e.width * n.to.x
            };
            n.from.y !== n.to.y && (i = V.effects.setTransition(t, o, n.from.y, i),
            e = V.effects.setTransition(t, o, n.to.y, e)),
            n.from.x !== n.to.x && (i = V.effects.setTransition(t, a, n.from.x, i),
            e = V.effects.setTransition(t, a, n.to.x, e)),
            l && V.effects.saveStyle(t),
            t.css(i),
            t.animate(e, s.duration, s.easing, function() {
                l && V.effects.restoreStyle(t)
            })
        })),
        i.animate(g, {
            queue: !1,
            duration: s.duration,
            easing: s.easing,
            complete: function() {
                var t = i.offset();
                0 === g.opacity && i.css("opacity", f.opacity),
                l || (i.css("position", "static" === u ? "relative" : u).offset(t),
                V.effects.saveStyle(i)),
                e()
            }
        })
    }),
    V.effects.define("scale", function(t, e) {
        var i = V(this)
          , s = t.mode
          , s = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) || "effect" !== s ? 0 : 100)
          , s = V.extend(!0, {
            from: V.effects.scaledDimensions(i),
            to: V.effects.scaledDimensions(i, s, t.direction || "both"),
            origin: t.origin || ["middle", "center"]
        }, t);
        t.fade && (s.from.opacity = 1,
        s.to.opacity = 0),
        V.effects.effect.size.call(this, s, e)
    }),
    V.effects.define("puff", "hide", function(t, e) {
        t = V.extend(!0, {}, t, {
            fade: !0,
            percent: parseInt(t.percent, 10) || 150
        });
        V.effects.effect.scale.call(this, t, e)
    }),
    V.effects.define("pulsate", "show", function(t, e) {
        var i = V(this)
          , s = t.mode
          , n = "show" === s
          , o = 2 * (t.times || 5) + (n || "hide" === s ? 1 : 0)
          , a = t.duration / o
          , r = 0
          , l = 1
          , s = i.queue().length;
        for (!n && i.is(":visible") || (i.css("opacity", 0).show(),
        r = 1); l < o; l++)
            i.animate({
                opacity: r
            }, a, t.easing),
            r = 1 - r;
        i.animate({
            opacity: r
        }, a, t.easing),
        i.queue(e),
        V.effects.unshift(i, s, 1 + o)
    }),
    V.effects.define("shake", function(t, e) {
        var i = 1
          , s = V(this)
          , n = t.direction || "left"
          , o = t.distance || 20
          , a = t.times || 3
          , r = 2 * a + 1
          , l = Math.round(t.duration / r)
          , h = "up" === n || "down" === n ? "top" : "left"
          , c = "up" === n || "left" === n
          , u = {}
          , d = {}
          , p = {}
          , n = s.queue().length;
        for (V.effects.createPlaceholder(s),
        u[h] = (c ? "-=" : "+=") + o,
        d[h] = (c ? "+=" : "-=") + 2 * o,
        p[h] = (c ? "-=" : "+=") + 2 * o,
        s.animate(u, l, t.easing); i < a; i++)
            s.animate(d, l, t.easing).animate(p, l, t.easing);
        s.animate(d, l, t.easing).animate(u, l / 2, t.easing).queue(e),
        V.effects.unshift(s, n, 1 + r)
    }),
    V.effects.define("slide", "show", function(t, e) {
        var i, s, n = V(this), o = {
            up: ["bottom", "top"],
            down: ["top", "bottom"],
            left: ["right", "left"],
            right: ["left", "right"]
        }, a = t.mode, r = t.direction || "left", l = "up" === r || "down" === r ? "top" : "left", h = "up" === r || "left" === r, c = t.distance || n["top" == l ? "outerHeight" : "outerWidth"](!0), u = {};
        V.effects.createPlaceholder(n),
        i = n.cssClip(),
        s = n.position()[l],
        u[l] = (h ? -1 : 1) * c + s,
        u.clip = n.cssClip(),
        u.clip[o[r][1]] = u.clip[o[r][0]],
        "show" === a && (n.cssClip(u.clip),
        n.css(l, u[l]),
        u.clip = i,
        u[l] = s),
        n.animate(u, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: e
        })
    }),
    y = !1 !== V.uiBackCompat ? V.effects.define("transfer", function(t, e) {
        V(this).transfer(t, e)
    }) : y;
    V.ui.focusable = function(t, e) {
        var i, s, n, o, a = t.nodeName.toLowerCase();
        return "area" === a ? (s = (i = t.parentNode).name,
        !(!t.href || !s || "map" !== i.nodeName.toLowerCase()) && (0 < (s = V("img[usemap='#" + s + "']")).length && s.is(":visible"))) : (/^(input|select|textarea|button|object)$/.test(a) ? (n = !t.disabled) && (o = V(t).closest("fieldset")[0]) && (n = !o.disabled) : n = "a" === a && t.href || e,
        n && V(t).is(":visible") && function(t) {
            var e = t.css("visibility");
            for (; "inherit" === e; )
                t = t.parent(),
                e = t.css("visibility");
            return "visible" === e
        }(V(t)))
    }
    ,
    V.extend(V.expr.pseudos, {
        focusable: function(t) {
            return V.ui.focusable(t, null != V.attr(t, "tabindex"))
        }
    });
    var Q, J;
    V.ui.focusable,
    V.fn._form = function() {
        return "string" == typeof this[0].form ? this.closest("form") : V(this[0].form)
    }
    ,
    V.ui.formResetMixin = {
        _formResetHandler: function() {
            var e = V(this);
            setTimeout(function() {
                var t = e.data("ui-form-reset-instances");
                V.each(t, function() {
                    this.refresh()
                })
            })
        },
        _bindFormResetHandler: function() {
            var t;
            this.form = this.element._form(),
            this.form.length && ((t = this.form.data("ui-form-reset-instances") || []).length || this.form.on("reset.ui-form-reset", this._formResetHandler),
            t.push(this),
            this.form.data("ui-form-reset-instances", t))
        },
        _unbindFormResetHandler: function() {
            var t;
            this.form.length && ((t = this.form.data("ui-form-reset-instances")).splice(V.inArray(this, t), 1),
            t.length ? this.form.data("ui-form-reset-instances", t) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset"))
        }
    };
    V.expr.pseudos || (V.expr.pseudos = V.expr[":"]),
    V.uniqueSort || (V.uniqueSort = V.unique),
    V.escapeSelector || (Q = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
    J = function(t, e) {
        return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
    }
    ,
    V.escapeSelector = function(t) {
        return (t + "").replace(Q, J)
    }
    ),
    V.fn.even && V.fn.odd || V.fn.extend({
        even: function() {
            return this.filter(function(t) {
                return t % 2 == 0
            })
        },
        odd: function() {
            return this.filter(function(t) {
                return t % 2 == 1
            })
        }
    });
    var Z;
    V.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    },
    V.fn.labels = function() {
        var t, e, i;
        return this.length ? this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (e = this.eq(0).parents("label"),
        (t = this.attr("id")) && (i = (i = this.eq(0).parents().last()).add((i.length ? i : this).siblings()),
        t = "label[for='" + V.escapeSelector(t) + "']",
        e = e.add(i.find(t).addBack(t))),
        this.pushStack(e)) : this.pushStack([])
    }
    ,
    V.fn.scrollParent = function(t) {
        var e = this.css("position")
          , i = "absolute" === e
          , s = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/
          , t = this.parents().filter(function() {
            var t = V(this);
            return (!i || "static" !== t.css("position")) && s.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
        }).eq(0);
        return "fixed" !== e && t.length ? t : V(this[0].ownerDocument || document)
    }
    ,
    V.extend(V.expr.pseudos, {
        tabbable: function(t) {
            var e = V.attr(t, "tabindex")
              , i = null != e;
            return (!i || 0 <= e) && V.ui.focusable(t, i)
        }
    }),
    V.fn.extend({
        uniqueId: (Z = 0,
        function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++Z)
            })
        }
        ),
        removeUniqueId: function() {
            return this.each(function() {
                /^ui-id-\d+$/.test(this.id) && V(this).removeAttr("id")
            })
        }
    }),
    V.widget("ui.accordion", {
        version: "1.13.1",
        options: {
            active: 0,
            animate: {},
            classes: {
                "ui-accordion-header": "ui-corner-top",
                "ui-accordion-header-collapsed": "ui-corner-all",
                "ui-accordion-content": "ui-corner-bottom"
            },
            collapsible: !1,
            event: "click",
            header: function(t) {
                return t.find("> li > :first-child").add(t.find("> :not(li)").even())
            },
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        hideProps: {
            borderTopWidth: "hide",
            borderBottomWidth: "hide",
            paddingTop: "hide",
            paddingBottom: "hide",
            height: "hide"
        },
        showProps: {
            borderTopWidth: "show",
            borderBottomWidth: "show",
            paddingTop: "show",
            paddingBottom: "show",
            height: "show"
        },
        _create: function() {
            var t = this.options;
            this.prevShow = this.prevHide = V(),
            this._addClass("ui-accordion", "ui-widget ui-helper-reset"),
            this.element.attr("role", "tablist"),
            t.collapsible || !1 !== t.active && null != t.active || (t.active = 0),
            this._processPanels(),
            t.active < 0 && (t.active += this.headers.length),
            this._refresh()
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : V()
            }
        },
        _createIcons: function() {
            var t, e = this.options.icons;
            e && (t = V("<span>"),
            this._addClass(t, "ui-accordion-header-icon", "ui-icon " + e.header),
            t.prependTo(this.headers),
            t = this.active.children(".ui-accordion-header-icon"),
            this._removeClass(t, e.header)._addClass(t, null, e.activeHeader)._addClass(this.headers, "ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this._removeClass(this.headers, "ui-accordion-icons"),
            this.headers.children(".ui-accordion-header-icon").remove()
        },
        _destroy: function() {
            var t;
            this.element.removeAttr("role"),
            this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),
            this._destroyIcons(),
            t = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),
            "content" !== this.options.heightStyle && t.css("height", "")
        },
        _setOption: function(t, e) {
            "active" !== t ? ("event" === t && (this.options.event && this._off(this.headers, this.options.event),
            this._setupEvents(e)),
            this._super(t, e),
            "collapsible" !== t || e || !1 !== this.options.active || this._activate(0),
            "icons" === t && (this._destroyIcons(),
            e && this._createIcons())) : this._activate(e)
        },
        _setOptionDisabled: function(t) {
            this._super(t),
            this.element.attr("aria-disabled", t),
            this._toggleClass(null, "ui-state-disabled", !!t),
            this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!t)
        },
        _keydown: function(t) {
            if (!t.altKey && !t.ctrlKey) {
                var e = V.ui.keyCode
                  , i = this.headers.length
                  , s = this.headers.index(t.target)
                  , n = !1;
                switch (t.keyCode) {
                case e.RIGHT:
                case e.DOWN:
                    n = this.headers[(s + 1) % i];
                    break;
                case e.LEFT:
                case e.UP:
                    n = this.headers[(s - 1 + i) % i];
                    break;
                case e.SPACE:
                case e.ENTER:
                    this._eventHandler(t);
                    break;
                case e.HOME:
                    n = this.headers[0];
                    break;
                case e.END:
                    n = this.headers[i - 1]
                }
                n && (V(t.target).attr("tabIndex", -1),
                V(n).attr("tabIndex", 0),
                V(n).trigger("focus"),
                t.preventDefault())
            }
        },
        _panelKeyDown: function(t) {
            t.keyCode === V.ui.keyCode.UP && t.ctrlKey && V(t.currentTarget).prev().trigger("focus")
        },
        refresh: function() {
            var t = this.options;
            this._processPanels(),
            !1 === t.active && !0 === t.collapsible || !this.headers.length ? (t.active = !1,
            this.active = V()) : !1 === t.active ? this._activate(0) : this.active.length && !V.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1,
            this.active = V()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active),
            this._destroyIcons(),
            this._refresh()
        },
        _processPanels: function() {
            var t = this.headers
              , e = this.panels;
            "function" == typeof this.options.header ? this.headers = this.options.header(this.element) : this.headers = this.element.find(this.options.header),
            this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default"),
            this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),
            this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content"),
            e && (this._off(t.not(this.headers)),
            this._off(e.not(this.panels)))
        },
        _refresh: function() {
            var i, t = this.options, e = t.heightStyle, s = this.element.parent();
            this.active = this._findActive(t.active),
            this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed"),
            this._addClass(this.active.next(), "ui-accordion-content-active"),
            this.active.next().show(),
            this.headers.attr("role", "tab").each(function() {
                var t = V(this)
                  , e = t.uniqueId().attr("id")
                  , i = t.next()
                  , s = i.uniqueId().attr("id");
                t.attr("aria-controls", s),
                i.attr("aria-labelledby", e)
            }).next().attr("role", "tabpanel"),
            this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({
                "aria-hidden": "true"
            }).hide(),
            this.active.length ? this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }).next().attr({
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0),
            this._createIcons(),
            this._setupEvents(t.event),
            "fill" === e ? (i = s.height(),
            this.element.siblings(":visible").each(function() {
                var t = V(this)
                  , e = t.css("position");
                "absolute" !== e && "fixed" !== e && (i -= t.outerHeight(!0))
            }),
            this.headers.each(function() {
                i -= V(this).outerHeight(!0)
            }),
            this.headers.next().each(function() {
                V(this).height(Math.max(0, i - V(this).innerHeight() + V(this).height()))
            }).css("overflow", "auto")) : "auto" === e && (i = 0,
            this.headers.next().each(function() {
                var t = V(this).is(":visible");
                t || V(this).show(),
                i = Math.max(i, V(this).css("height", "").height()),
                t || V(this).hide()
            }).height(i))
        },
        _activate: function(t) {
            t = this._findActive(t)[0];
            t !== this.active[0] && (t = t || this.active[0],
            this._eventHandler({
                target: t,
                currentTarget: t,
                preventDefault: V.noop
            }))
        },
        _findActive: function(t) {
            return "number" == typeof t ? this.headers.eq(t) : V()
        },
        _setupEvents: function(t) {
            var i = {
                keydown: "_keydown"
            };
            t && V.each(t.split(" "), function(t, e) {
                i[e] = "_eventHandler"
            }),
            this._off(this.headers.add(this.headers.next())),
            this._on(this.headers, i),
            this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }),
            this._hoverable(this.headers),
            this._focusable(this.headers)
        },
        _eventHandler: function(t) {
            var e = this.options
              , i = this.active
              , s = V(t.currentTarget)
              , n = s[0] === i[0]
              , o = n && e.collapsible
              , a = o ? V() : s.next()
              , r = i.next()
              , a = {
                oldHeader: i,
                oldPanel: r,
                newHeader: o ? V() : s,
                newPanel: a
            };
            t.preventDefault(),
            n && !e.collapsible || !1 === this._trigger("beforeActivate", t, a) || (e.active = !o && this.headers.index(s),
            this.active = n ? V() : s,
            this._toggle(a),
            this._removeClass(i, "ui-accordion-header-active", "ui-state-active"),
            e.icons && (i = i.children(".ui-accordion-header-icon"),
            this._removeClass(i, null, e.icons.activeHeader)._addClass(i, null, e.icons.header)),
            n || (this._removeClass(s, "ui-accordion-header-collapsed")._addClass(s, "ui-accordion-header-active", "ui-state-active"),
            e.icons && (n = s.children(".ui-accordion-header-icon"),
            this._removeClass(n, null, e.icons.header)._addClass(n, null, e.icons.activeHeader)),
            this._addClass(s.next(), "ui-accordion-content-active")))
        },
        _toggle: function(t) {
            var e = t.newPanel
              , i = this.prevShow.length ? this.prevShow : t.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0),
            this.prevShow = e,
            this.prevHide = i,
            this.options.animate ? this._animate(e, i, t) : (i.hide(),
            e.show(),
            this._toggleComplete(t)),
            i.attr({
                "aria-hidden": "true"
            }),
            i.prev().attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }),
            e.length && i.length ? i.prev().attr({
                tabIndex: -1,
                "aria-expanded": "false"
            }) : e.length && this.headers.filter(function() {
                return 0 === parseInt(V(this).attr("tabIndex"), 10)
            }).attr("tabIndex", -1),
            e.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _animate: function(t, i, e) {
            var s, n, o, a = this, r = 0, l = t.css("box-sizing"), h = t.length && (!i.length || t.index() < i.index()), c = this.options.animate || {}, u = h && c.down || c, h = function() {
                a._toggleComplete(e)
            };
            return n = (n = "string" == typeof u ? u : n) || u.easing || c.easing,
            o = (o = "number" == typeof u ? u : o) || u.duration || c.duration,
            i.length ? t.length ? (s = t.show().outerHeight(),
            i.animate(this.hideProps, {
                duration: o,
                easing: n,
                step: function(t, e) {
                    e.now = Math.round(t)
                }
            }),
            void t.hide().animate(this.showProps, {
                duration: o,
                easing: n,
                complete: h,
                step: function(t, e) {
                    e.now = Math.round(t),
                    "height" !== e.prop ? "content-box" === l && (r += e.now) : "content" !== a.options.heightStyle && (e.now = Math.round(s - i.outerHeight() - r),
                    r = 0)
                }
            })) : i.animate(this.hideProps, o, n, h) : t.animate(this.showProps, o, n, h)
        },
        _toggleComplete: function(t) {
            var e = t.oldPanel
              , i = e.prev();
            this._removeClass(e, "ui-accordion-content-active"),
            this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed"),
            e.length && (e.parent()[0].className = e.parent()[0].className),
            this._trigger("activate", null, t)
        }
    }),
    V.ui.safeActiveElement = function(e) {
        var i;
        try {
            i = e.activeElement
        } catch (t) {
            i = e.body
        }
        return i = !(i = i || e.body).nodeName ? e.body : i
    }
    ,
    V.widget("ui.menu", {
        version: "1.13.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-caret-1-e"
            },
            items: "> *",
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element,
            this.mouseHandled = !1,
            this.lastMousePosition = {
                x: null,
                y: null
            },
            this.element.uniqueId().attr({
                role: this.options.role,
                tabIndex: 0
            }),
            this._addClass("ui-menu", "ui-widget ui-widget-content"),
            this._on({
                "mousedown .ui-menu-item": function(t) {
                    t.preventDefault(),
                    this._activateItem(t)
                },
                "click .ui-menu-item": function(t) {
                    var e = V(t.target)
                      , i = V(V.ui.safeActiveElement(this.document[0]));
                    !this.mouseHandled && e.not(".ui-state-disabled").length && (this.select(t),
                    t.isPropagationStopped() || (this.mouseHandled = !0),
                    e.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && i.closest(".ui-menu").length && (this.element.trigger("focus", [!0]),
                    this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": "_activateItem",
                "mousemove .ui-menu-item": "_activateItem",
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(t, e) {
                    var i = this.active || this._menuItems().first();
                    e || this.focus(t, i)
                },
                blur: function(t) {
                    this._delay(function() {
                        V.contains(this.element[0], V.ui.safeActiveElement(this.document[0])) || this.collapseAll(t)
                    })
                },
                keydown: "_keydown"
            }),
            this.refresh(),
            this._on(this.document, {
                click: function(t) {
                    this._closeOnDocumentClick(t) && this.collapseAll(t, !0),
                    this.mouseHandled = !1
                }
            })
        },
        _activateItem: function(t) {
            var e, i;
            this.previousFilter || t.clientX === this.lastMousePosition.x && t.clientY === this.lastMousePosition.y || (this.lastMousePosition = {
                x: t.clientX,
                y: t.clientY
            },
            e = V(t.target).closest(".ui-menu-item"),
            i = V(t.currentTarget),
            e[0] === i[0] && (i.is(".ui-state-active") || (this._removeClass(i.siblings().children(".ui-state-active"), null, "ui-state-active"),
            this.focus(t, i))))
        },
        _destroy: function() {
            var t = this.element.find(".ui-menu-item").removeAttr("role aria-disabled").children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),
            t.children().each(function() {
                var t = V(this);
                t.data("ui-menu-submenu-caret") && t.remove()
            })
        },
        _keydown: function(t) {
            var e, i, s, n = !0;
            switch (t.keyCode) {
            case V.ui.keyCode.PAGE_UP:
                this.previousPage(t);
                break;
            case V.ui.keyCode.PAGE_DOWN:
                this.nextPage(t);
                break;
            case V.ui.keyCode.HOME:
                this._move("first", "first", t);
                break;
            case V.ui.keyCode.END:
                this._move("last", "last", t);
                break;
            case V.ui.keyCode.UP:
                this.previous(t);
                break;
            case V.ui.keyCode.DOWN:
                this.next(t);
                break;
            case V.ui.keyCode.LEFT:
                this.collapse(t);
                break;
            case V.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                break;
            case V.ui.keyCode.ENTER:
            case V.ui.keyCode.SPACE:
                this._activate(t);
                break;
            case V.ui.keyCode.ESCAPE:
                this.collapse(t);
                break;
            default:
                e = this.previousFilter || "",
                s = n = !1,
                i = 96 <= t.keyCode && t.keyCode <= 105 ? (t.keyCode - 96).toString() : String.fromCharCode(t.keyCode),
                clearTimeout(this.filterTimer),
                i === e ? s = !0 : i = e + i,
                e = this._filterMenuItems(i),
                (e = s && -1 !== e.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : e).length || (i = String.fromCharCode(t.keyCode),
                e = this._filterMenuItems(i)),
                e.length ? (this.focus(t, e),
                this.previousFilter = i,
                this.filterTimer = this._delay(function() {
                    delete this.previousFilter
                }, 1e3)) : delete this.previousFilter
            }
            n && t.preventDefault()
        },
        _activate: function(t) {
            this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
        },
        refresh: function() {
            var t, e, s = this, n = this.options.icons.submenu, i = this.element.find(this.options.menus);
            this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length),
            e = i.filter(":not(.ui-menu)").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var t = V(this)
                  , e = t.prev()
                  , i = V("<span>").data("ui-menu-submenu-caret", !0);
                s._addClass(i, "ui-menu-icon", "ui-icon " + n),
                e.attr("aria-haspopup", "true").prepend(i),
                t.attr("aria-labelledby", e.attr("id"))
            }),
            this._addClass(e, "ui-menu", "ui-widget ui-widget-content ui-front"),
            (t = i.add(this.element).find(this.options.items)).not(".ui-menu-item").each(function() {
                var t = V(this);
                s._isDivider(t) && s._addClass(t, "ui-menu-divider", "ui-widget-content")
            }),
            i = (e = t.not(".ui-menu-item, .ui-menu-divider")).children().not(".ui-menu").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            }),
            this._addClass(e, "ui-menu-item")._addClass(i, "ui-menu-item-wrapper"),
            t.filter(".ui-state-disabled").attr("aria-disabled", "true"),
            this.active && !V.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(t, e) {
            var i;
            "icons" === t && (i = this.element.find(".ui-menu-icon"),
            this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, e.submenu)),
            this._super(t, e)
        },
        _setOptionDisabled: function(t) {
            this._super(t),
            this.element.attr("aria-disabled", String(t)),
            this._toggleClass(null, "ui-state-disabled", !!t)
        },
        focus: function(t, e) {
            var i;
            this.blur(t, t && "focus" === t.type),
            this._scrollIntoView(e),
            this.active = e.first(),
            i = this.active.children(".ui-menu-item-wrapper"),
            this._addClass(i, null, "ui-state-active"),
            this.options.role && this.element.attr("aria-activedescendant", i.attr("id")),
            i = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),
            this._addClass(i, null, "ui-state-active"),
            t && "keydown" === t.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay),
            (i = e.children(".ui-menu")).length && t && /^mouse/.test(t.type) && this._startOpening(i),
            this.activeMenu = e.parent(),
            this._trigger("focus", t, {
                item: e
            })
        },
        _scrollIntoView: function(t) {
            var e, i, s;
            this._hasScroll() && (i = parseFloat(V.css(this.activeMenu[0], "borderTopWidth")) || 0,
            s = parseFloat(V.css(this.activeMenu[0], "paddingTop")) || 0,
            e = t.offset().top - this.activeMenu.offset().top - i - s,
            i = this.activeMenu.scrollTop(),
            s = this.activeMenu.height(),
            t = t.outerHeight(),
            e < 0 ? this.activeMenu.scrollTop(i + e) : s < e + t && this.activeMenu.scrollTop(i + e - s + t))
        },
        blur: function(t, e) {
            e || clearTimeout(this.timer),
            this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"),
            this._trigger("blur", t, {
                item: this.active
            }),
            this.active = null)
        },
        _startOpening: function(t) {
            clearTimeout(this.timer),
            "true" === t.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(),
                this._open(t)
            }, this.delay))
        },
        _open: function(t) {
            var e = V.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer),
            this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
            t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(e)
        },
        collapseAll: function(e, i) {
            clearTimeout(this.timer),
            this.timer = this._delay(function() {
                var t = i ? this.element : V(e && e.target).closest(this.element.find(".ui-menu"));
                t.length || (t = this.element),
                this._close(t),
                this.blur(e),
                this._removeClass(t.find(".ui-state-active"), null, "ui-state-active"),
                this.activeMenu = t
            }, i ? 0 : this.delay)
        },
        _close: function(t) {
            (t = t || (this.active ? this.active.parent() : this.element)).find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
        },
        _closeOnDocumentClick: function(t) {
            return !V(t.target).closest(".ui-menu").length
        },
        _isDivider: function(t) {
            return !/[^\-\u2014\u2013\s]/.test(t.text())
        },
        collapse: function(t) {
            var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            e && e.length && (this._close(),
            this.focus(t, e))
        },
        expand: function(t) {
            var e = this.active && this._menuItems(this.active.children(".ui-menu")).first();
            e && e.length && (this._open(e.parent()),
            this._delay(function() {
                this.focus(t, e)
            }))
        },
        next: function(t) {
            this._move("next", "first", t)
        },
        previous: function(t) {
            this._move("prev", "last", t)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _menuItems: function(t) {
            return (t || this.element).find(this.options.items).filter(".ui-menu-item")
        },
        _move: function(t, e, i) {
            var s;
            (s = this.active ? "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").last() : this.active[t + "All"](".ui-menu-item").first() : s) && s.length && this.active || (s = this._menuItems(this.activeMenu)[e]()),
            this.focus(i, s)
        },
        nextPage: function(t) {
            var e, i, s;
            this.active ? this.isLastItem() || (this._hasScroll() ? (i = this.active.offset().top,
            s = this.element.innerHeight(),
            0 === V.fn.jquery.indexOf("3.2.") && (s += this.element[0].offsetHeight - this.element.outerHeight()),
            this.active.nextAll(".ui-menu-item").each(function() {
                return (e = V(this)).offset().top - i - s < 0
            }),
            this.focus(t, e)) : this.focus(t, this._menuItems(this.activeMenu)[this.active ? "last" : "first"]())) : this.next(t)
        },
        previousPage: function(t) {
            var e, i, s;
            this.active ? this.isFirstItem() || (this._hasScroll() ? (i = this.active.offset().top,
            s = this.element.innerHeight(),
            0 === V.fn.jquery.indexOf("3.2.") && (s += this.element[0].offsetHeight - this.element.outerHeight()),
            this.active.prevAll(".ui-menu-item").each(function() {
                return 0 < (e = V(this)).offset().top - i + s
            }),
            this.focus(t, e)) : this.focus(t, this._menuItems(this.activeMenu).first())) : this.next(t)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(t) {
            this.active = this.active || V(t.target).closest(".ui-menu-item");
            var e = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0),
            this._trigger("select", t, e)
        },
        _filterMenuItems: function(t) {
            var t = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
              , e = new RegExp("^" + t,"i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
                return e.test(String.prototype.trim.call(V(this).children(".ui-menu-item-wrapper").text()))
            })
        }
    });
    V.widget("ui.autocomplete", {
        version: "1.13.1",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        liveRegionTimer: null,
        _create: function() {
            var i, s, n, t = this.element[0].nodeName.toLowerCase(), e = "textarea" === t, t = "input" === t;
            this.isMultiLine = e || !t && this._isContentEditable(this.element),
            this.valueMethod = this.element[e || t ? "val" : "text"],
            this.isNewMenu = !0,
            this._addClass("ui-autocomplete-input"),
            this.element.attr("autocomplete", "off"),
            this._on(this.element, {
                keydown: function(t) {
                    if (this.element.prop("readOnly"))
                        s = n = i = !0;
                    else {
                        s = n = i = !1;
                        var e = V.ui.keyCode;
                        switch (t.keyCode) {
                        case e.PAGE_UP:
                            i = !0,
                            this._move("previousPage", t);
                            break;
                        case e.PAGE_DOWN:
                            i = !0,
                            this._move("nextPage", t);
                            break;
                        case e.UP:
                            i = !0,
                            this._keyEvent("previous", t);
                            break;
                        case e.DOWN:
                            i = !0,
                            this._keyEvent("next", t);
                            break;
                        case e.ENTER:
                            this.menu.active && (i = !0,
                            t.preventDefault(),
                            this.menu.select(t));
                            break;
                        case e.TAB:
                            this.menu.active && this.menu.select(t);
                            break;
                        case e.ESCAPE:
                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term),
                            this.close(t),
                            t.preventDefault());
                            break;
                        default:
                            s = !0,
                            this._searchTimeout(t)
                        }
                    }
                },
                keypress: function(t) {
                    if (i)
                        return i = !1,
                        void (this.isMultiLine && !this.menu.element.is(":visible") || t.preventDefault());
                    if (!s) {
                        var e = V.ui.keyCode;
                        switch (t.keyCode) {
                        case e.PAGE_UP:
                            this._move("previousPage", t);
                            break;
                        case e.PAGE_DOWN:
                            this._move("nextPage", t);
                            break;
                        case e.UP:
                            this._keyEvent("previous", t);
                            break;
                        case e.DOWN:
                            this._keyEvent("next", t)
                        }
                    }
                },
                input: function(t) {
                    if (n)
                        return n = !1,
                        void t.preventDefault();
                    this._searchTimeout(t)
                },
                focus: function() {
                    this.selectedItem = null,
                    this.previous = this._value()
                },
                blur: function(t) {
                    clearTimeout(this.searching),
                    this.close(t),
                    this._change(t)
                }
            }),
            this._initSource(),
            this.menu = V("<ul>").appendTo(this._appendTo()).menu({
                role: null
            }).hide().attr({
                unselectable: "on"
            }).menu("instance"),
            this._addClass(this.menu.element, "ui-autocomplete", "ui-front"),
            this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault()
                },
                menufocus: function(t, e) {
                    var i, s;
                    if (this.isNewMenu && (this.isNewMenu = !1,
                    t.originalEvent && /^mouse/.test(t.originalEvent.type)))
                        return this.menu.blur(),
                        void this.document.one("mousemove", function() {
                            V(t.target).trigger(t.originalEvent)
                        });
                    s = e.item.data("ui-autocomplete-item"),
                    !1 !== this._trigger("focus", t, {
                        item: s
                    }) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(s.value),
                    (i = e.item.attr("aria-label") || s.value) && String.prototype.trim.call(i).length && (clearTimeout(this.liveRegionTimer),
                    this.liveRegionTimer = this._delay(function() {
                        this.liveRegion.html(V("<div>").text(i))
                    }, 100))
                },
                menuselect: function(t, e) {
                    var i = e.item.data("ui-autocomplete-item")
                      , s = this.previous;
                    this.element[0] !== V.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"),
                    this.previous = s,
                    this._delay(function() {
                        this.previous = s,
                        this.selectedItem = i
                    })),
                    !1 !== this._trigger("select", t, {
                        item: i
                    }) && this._value(i.value),
                    this.term = this._value(),
                    this.close(t),
                    this.selectedItem = i
                }
            }),
            this.liveRegion = V("<div>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).appendTo(this.document[0].body),
            this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching),
            this.element.removeAttr("autocomplete"),
            this.menu.element.remove(),
            this.liveRegion.remove()
        },
        _setOption: function(t, e) {
            this._super(t, e),
            "source" === t && this._initSource(),
            "appendTo" === t && this.menu.element.appendTo(this._appendTo()),
            "disabled" === t && e && this.xhr && this.xhr.abort()
        },
        _isEventTargetInWidget: function(t) {
            var e = this.menu.element[0];
            return t.target === this.element[0] || t.target === e || V.contains(e, t.target)
        },
        _closeOnClickOutside: function(t) {
            this._isEventTargetInWidget(t) || this.close()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t = !(t = !(t = t && (t.jquery || t.nodeType ? V(t) : this.document.find(t).eq(0))) || !t[0] ? this.element.closest(".ui-front, dialog") : t).length ? this.document[0].body : t
        },
        _initSource: function() {
            var i, s, n = this;
            Array.isArray(this.options.source) ? (i = this.options.source,
            this.source = function(t, e) {
                e(V.ui.autocomplete.filter(i, t.term))
            }
            ) : "string" == typeof this.options.source ? (s = this.options.source,
            this.source = function(t, e) {
                n.xhr && n.xhr.abort(),
                n.xhr = V.ajax({
                    url: s,
                    data: t,
                    dataType: "json",
                    success: function(t) {
                        e(t)
                    },
                    error: function() {
                        e([])
                    }
                })
            }
            ) : this.source = this.options.source
        },
        _searchTimeout: function(s) {
            clearTimeout(this.searching),
            this.searching = this._delay(function() {
                var t = this.term === this._value()
                  , e = this.menu.element.is(":visible")
                  , i = s.altKey || s.ctrlKey || s.metaKey || s.shiftKey;
                t && (e || i) || (this.selectedItem = null,
                this.search(null, s))
            }, this.options.delay)
        },
        search: function(t, e) {
            return t = null != t ? t : this._value(),
            this.term = this._value(),
            t.length < this.options.minLength ? this.close(e) : !1 !== this._trigger("search", e) ? this._search(t) : void 0
        },
        _search: function(t) {
            this.pending++,
            this._addClass("ui-autocomplete-loading"),
            this.cancelSearch = !1,
            this.source({
                term: t
            }, this._response())
        },
        _response: function() {
            var e = ++this.requestIndex;
            return function(t) {
                e === this.requestIndex && this.__response(t),
                this.pending--,
                this.pending || this._removeClass("ui-autocomplete-loading")
            }
            .bind(this)
        },
        __response: function(t) {
            t = t && this._normalize(t),
            this._trigger("response", null, {
                content: t
            }),
            !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t),
            this._trigger("open")) : this._close()
        },
        close: function(t) {
            this.cancelSearch = !0,
            this._close(t)
        },
        _close: function(t) {
            this._off(this.document, "mousedown"),
            this.menu.element.is(":visible") && (this.menu.element.hide(),
            this.menu.blur(),
            this.isNewMenu = !0,
            this._trigger("close", t))
        },
        _change: function(t) {
            this.previous !== this._value() && this._trigger("change", t, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : V.map(t, function(t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                } : V.extend({}, t, {
                    label: t.label || t.value,
                    value: t.value || t.label
                })
            })
        },
        _suggest: function(t) {
            var e = this.menu.element.empty();
            this._renderMenu(e, t),
            this.isNewMenu = !0,
            this.menu.refresh(),
            e.show(),
            this._resizeMenu(),
            e.position(V.extend({
                of: this.element
            }, this.options.position)),
            this.options.autoFocus && this.menu.next(),
            this._on(this.document, {
                mousedown: "_closeOnClickOutside"
            })
        },
        _resizeMenu: function() {
            var t = this.menu.element;
            t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(i, t) {
            var s = this;
            V.each(t, function(t, e) {
                s._renderItemData(i, e)
            })
        },
        _renderItemData: function(t, e) {
            return this._renderItem(t, e).data("ui-autocomplete-item", e)
        },
        _renderItem: function(t, e) {
            return V("<li>").append(V("<div>").text(e.label)).appendTo(t)
        },
        _move: function(t, e) {
            if (this.menu.element.is(":visible"))
                return this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term),
                void this.menu.blur()) : void this.menu[t](e);
            this.search(null, e)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(t, e) {
            this.isMultiLine && !this.menu.element.is(":visible") || (this._move(t, e),
            e.preventDefault())
        },
        _isContentEditable: function(t) {
            if (!t.length)
                return !1;
            var e = t.prop("contentEditable");
            return "inherit" === e ? this._isContentEditable(t.parent()) : "true" === e
        }
    }),
    V.extend(V.ui.autocomplete, {
        escapeRegex: function(t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, e) {
            var i = new RegExp(V.ui.autocomplete.escapeRegex(e),"i");
            return V.grep(t, function(t) {
                return i.test(t.label || t.value || t)
            })
        }
    }),
    V.widget("ui.autocomplete", V.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(t) {
                    return t + (1 < t ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(t) {
            var e;
            this._superApply(arguments),
            this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults,
            clearTimeout(this.liveRegionTimer),
            this.liveRegionTimer = this._delay(function() {
                this.liveRegion.html(V("<div>").text(e))
            }, 100))
        }
    });
    V.ui.autocomplete;
    var tt = /ui-corner-([a-z]){2,6}/g;
    V.widget("ui.controlgroup", {
        version: "1.13.1",
        defaultElement: "<div>",
        options: {
            direction: "horizontal",
            disabled: null,
            onlyVisible: !0,
            items: {
                button: "input[type=button], input[type=submit], input[type=reset], button, a",
                controlgroupLabel: ".ui-controlgroup-label",
                checkboxradio: "input[type='checkbox'], input[type='radio']",
                selectmenu: "select",
                spinner: ".ui-spinner-input"
            }
        },
        _create: function() {
            this._enhance()
        },
        _enhance: function() {
            this.element.attr("role", "toolbar"),
            this.refresh()
        },
        _destroy: function() {
            this._callChildMethod("destroy"),
            this.childWidgets.removeData("ui-controlgroup-data"),
            this.element.removeAttr("role"),
            this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
        },
        _initWidgets: function() {
            var o = this
              , a = [];
            V.each(this.options.items, function(s, t) {
                var e, n = {};
                if (t)
                    return "controlgroupLabel" === s ? ((e = o.element.find(t)).each(function() {
                        var t = V(this);
                        t.children(".ui-controlgroup-label-contents").length || t.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")
                    }),
                    o._addClass(e, null, "ui-widget ui-widget-content ui-state-default"),
                    void (a = a.concat(e.get()))) : void (V.fn[s] && (n = o["_" + s + "Options"] ? o["_" + s + "Options"]("middle") : {
                        classes: {}
                    },
                    o.element.find(t).each(function() {
                        var t = V(this)
                          , e = t[s]("instance")
                          , i = V.widget.extend({}, n);
                        "button" === s && t.parent(".ui-spinner").length || ((e = e || t[s]()[s]("instance")) && (i.classes = o._resolveClassesValues(i.classes, e)),
                        t[s](i),
                        i = t[s]("widget"),
                        V.data(i[0], "ui-controlgroup-data", e || t[s]("instance")),
                        a.push(i[0]))
                    })))
            }),
            this.childWidgets = V(V.uniqueSort(a)),
            this._addClass(this.childWidgets, "ui-controlgroup-item")
        },
        _callChildMethod: function(e) {
            this.childWidgets.each(function() {
                var t = V(this).data("ui-controlgroup-data");
                t && t[e] && t[e]()
            })
        },
        _updateCornerClass: function(t, e) {
            e = this._buildSimpleOptions(e, "label").classes.label;
            this._removeClass(t, null, "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"),
            this._addClass(t, null, e)
        },
        _buildSimpleOptions: function(t, e) {
            var i = "vertical" === this.options.direction
              , s = {
                classes: {}
            };
            return s.classes[e] = {
                middle: "",
                first: "ui-corner-" + (i ? "top" : "left"),
                last: "ui-corner-" + (i ? "bottom" : "right"),
                only: "ui-corner-all"
            }[t],
            s
        },
        _spinnerOptions: function(t) {
            t = this._buildSimpleOptions(t, "ui-spinner");
            return t.classes["ui-spinner-up"] = "",
            t.classes["ui-spinner-down"] = "",
            t
        },
        _buttonOptions: function(t) {
            return this._buildSimpleOptions(t, "ui-button")
        },
        _checkboxradioOptions: function(t) {
            return this._buildSimpleOptions(t, "ui-checkboxradio-label")
        },
        _selectmenuOptions: function(t) {
            var e = "vertical" === this.options.direction;
            return {
                width: e && "auto",
                classes: {
                    middle: {
                        "ui-selectmenu-button-open": "",
                        "ui-selectmenu-button-closed": ""
                    },
                    first: {
                        "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
                        "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left")
                    },
                    last: {
                        "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
                        "ui-selectmenu-button-closed": "ui-corner-" + (e ? "bottom" : "right")
                    },
                    only: {
                        "ui-selectmenu-button-open": "ui-corner-top",
                        "ui-selectmenu-button-closed": "ui-corner-all"
                    }
                }[t]
            }
        },
        _resolveClassesValues: function(i, s) {
            var n = {};
            return V.each(i, function(t) {
                var e = s.options.classes[t] || ""
                  , e = String.prototype.trim.call(e.replace(tt, ""));
                n[t] = (e + " " + i[t]).replace(/\s+/g, " ")
            }),
            n
        },
        _setOption: function(t, e) {
            "direction" === t && this._removeClass("ui-controlgroup-" + this.options.direction),
            this._super(t, e),
            "disabled" !== t ? this.refresh() : this._callChildMethod(e ? "disable" : "enable")
        },
        refresh: function() {
            var n, o = this;
            this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction),
            "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"),
            this._initWidgets(),
            n = this.childWidgets,
            (n = this.options.onlyVisible ? n.filter(":visible") : n).length && (V.each(["first", "last"], function(t, e) {
                var i, s = n[e]().data("ui-controlgroup-data");
                s && o["_" + s.widgetName + "Options"] ? ((i = o["_" + s.widgetName + "Options"](1 === n.length ? "only" : e)).classes = o._resolveClassesValues(i.classes, s),
                s.element[s.widgetName](i)) : o._updateCornerClass(n[e](), e)
            }),
            this._callChildMethod("refresh"))
        }
    });
    V.widget("ui.checkboxradio", [V.ui.formResetMixin, {
        version: "1.13.1",
        options: {
            disabled: null,
            label: null,
            icon: !0,
            classes: {
                "ui-checkboxradio-label": "ui-corner-all",
                "ui-checkboxradio-icon": "ui-corner-all"
            }
        },
        _getCreateOptions: function() {
            var t, e = this, i = this._super() || {};
            return this._readType(),
            t = this.element.labels(),
            this.label = V(t[t.length - 1]),
            this.label.length || V.error("No label found for checkboxradio widget"),
            this.originalLabel = "",
            this.label.contents().not(this.element[0]).each(function() {
                e.originalLabel += 3 === this.nodeType ? V(this).text() : this.outerHTML
            }),
            this.originalLabel && (i.label = this.originalLabel),
            null != (t = this.element[0].disabled) && (i.disabled = t),
            i
        },
        _create: function() {
            var t = this.element[0].checked;
            this._bindFormResetHandler(),
            null == this.options.disabled && (this.options.disabled = this.element[0].disabled),
            this._setOption("disabled", this.options.disabled),
            this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"),
            this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"),
            "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"),
            this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel),
            this._enhance(),
            t && this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"),
            this._on({
                change: "_toggleClasses",
                focus: function() {
                    this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
                },
                blur: function() {
                    this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
                }
            })
        },
        _readType: function() {
            var t = this.element[0].nodeName.toLowerCase();
            this.type = this.element[0].type,
            "input" === t && /radio|checkbox/.test(this.type) || V.error("Can't create checkboxradio on element.nodeName=" + t + " and element.type=" + this.type)
        },
        _enhance: function() {
            this._updateIcon(this.element[0].checked)
        },
        widget: function() {
            return this.label
        },
        _getRadioGroup: function() {
            var t = this.element[0].name
              , e = "input[name='" + V.escapeSelector(t) + "']";
            return t ? (this.form.length ? V(this.form[0].elements).filter(e) : V(e).filter(function() {
                return 0 === V(this)._form().length
            })).not(this.element) : V([])
        },
        _toggleClasses: function() {
            var t = this.element[0].checked;
            this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t),
            this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", t)._toggleClass(this.icon, null, "ui-icon-blank", !t),
            "radio" === this.type && this._getRadioGroup().each(function() {
                var t = V(this).checkboxradio("instance");
                t && t._removeClass(t.label, "ui-checkboxradio-checked", "ui-state-active")
            })
        },
        _destroy: function() {
            this._unbindFormResetHandler(),
            this.icon && (this.icon.remove(),
            this.iconSpace.remove())
        },
        _setOption: function(t, e) {
            if ("label" !== t || e) {
                if (this._super(t, e),
                "disabled" === t)
                    return this._toggleClass(this.label, null, "ui-state-disabled", e),
                    void (this.element[0].disabled = e);
                this.refresh()
            }
        },
        _updateIcon: function(t) {
            var e = "ui-icon ui-icon-background ";
            this.options.icon ? (this.icon || (this.icon = V("<span>"),
            this.iconSpace = V("<span> </span>"),
            this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")),
            "checkbox" === this.type ? (e += t ? "ui-icon-check ui-state-checked" : "ui-icon-blank",
            this._removeClass(this.icon, null, t ? "ui-icon-blank" : "ui-icon-check")) : e += "ui-icon-blank",
            this._addClass(this.icon, "ui-checkboxradio-icon", e),
            t || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"),
            this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(),
            this.iconSpace.remove(),
            delete this.icon)
        },
        _updateLabel: function() {
            var t = this.label.contents().not(this.element[0]);
            this.icon && (t = t.not(this.icon[0])),
            (t = this.iconSpace ? t.not(this.iconSpace[0]) : t).remove(),
            this.label.append(this.options.label)
        },
        refresh: function() {
            var t = this.element[0].checked
              , e = this.element[0].disabled;
            this._updateIcon(t),
            this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t),
            null !== this.options.label && this._updateLabel(),
            e !== this.options.disabled && this._setOptions({
                disabled: e
            })
        }
    }]);
    var et;
    V.ui.checkboxradio;
    V.widget("ui.button", {
        version: "1.13.1",
        defaultElement: "<button>",
        options: {
            classes: {
                "ui-button": "ui-corner-all"
            },
            disabled: null,
            icon: null,
            iconPosition: "beginning",
            label: null,
            showLabel: !0
        },
        _getCreateOptions: function() {
            var t, e = this._super() || {};
            return this.isInput = this.element.is("input"),
            null != (t = this.element[0].disabled) && (e.disabled = t),
            this.originalLabel = this.isInput ? this.element.val() : this.element.html(),
            this.originalLabel && (e.label = this.originalLabel),
            e
        },
        _create: function() {
            !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0),
            null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1),
            this.hasTitle = !!this.element.attr("title"),
            this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)),
            this._addClass("ui-button", "ui-widget"),
            this._setOption("disabled", this.options.disabled),
            this._enhance(),
            this.element.is("a") && this._on({
                keyup: function(t) {
                    t.keyCode === V.ui.keyCode.SPACE && (t.preventDefault(),
                    this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
                }
            })
        },
        _enhance: function() {
            this.element.is("button") || this.element.attr("role", "button"),
            this.options.icon && (this._updateIcon("icon", this.options.icon),
            this._updateTooltip())
        },
        _updateTooltip: function() {
            this.title = this.element.attr("title"),
            this.options.showLabel || this.title || this.element.attr("title", this.options.label)
        },
        _updateIcon: function(t, e) {
            var i = "iconPosition" !== t
              , s = i ? this.options.iconPosition : e
              , t = "top" === s || "bottom" === s;
            this.icon ? i && this._removeClass(this.icon, null, this.options.icon) : (this.icon = V("<span>"),
            this._addClass(this.icon, "ui-button-icon", "ui-icon"),
            this.options.showLabel || this._addClass("ui-button-icon-only")),
            i && this._addClass(this.icon, null, e),
            this._attachIcon(s),
            t ? (this._addClass(this.icon, null, "ui-widget-icon-block"),
            this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = V("<span> </span>"),
            this._addClass(this.iconSpace, "ui-button-icon-space")),
            this._removeClass(this.icon, null, "ui-wiget-icon-block"),
            this._attachIconSpace(s))
        },
        _destroy: function() {
            this.element.removeAttr("role"),
            this.icon && this.icon.remove(),
            this.iconSpace && this.iconSpace.remove(),
            this.hasTitle || this.element.removeAttr("title")
        },
        _attachIconSpace: function(t) {
            this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace)
        },
        _attachIcon: function(t) {
            this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon)
        },
        _setOptions: function(t) {
            var e = (void 0 === t.showLabel ? this.options : t).showLabel
              , i = (void 0 === t.icon ? this.options : t).icon;
            e || i || (t.showLabel = !0),
            this._super(t)
        },
        _setOption: function(t, e) {
            "icon" === t && (e ? this._updateIcon(t, e) : this.icon && (this.icon.remove(),
            this.iconSpace && this.iconSpace.remove())),
            "iconPosition" === t && this._updateIcon(t, e),
            "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !e),
            this._updateTooltip()),
            "label" === t && (this.isInput ? this.element.val(e) : (this.element.html(e),
            this.icon && (this._attachIcon(this.options.iconPosition),
            this._attachIconSpace(this.options.iconPosition)))),
            this._super(t, e),
            "disabled" === t && (this._toggleClass(null, "ui-state-disabled", e),
            (this.element[0].disabled = e) && this.element.trigger("blur"))
        },
        refresh: function() {
            var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOptions({
                disabled: t
            }),
            this._updateTooltip()
        }
    }),
    !1 !== V.uiBackCompat && (V.widget("ui.button", V.ui.button, {
        options: {
            text: !0,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text),
            !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel),
            this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary,
            this.options.iconPosition = "end"),
            this._super()
        },
        _setOption: function(t, e) {
            "text" !== t ? ("showLabel" === t && (this.options.text = e),
            "icon" === t && (this.options.icons.primary = e),
            "icons" === t && (e.primary ? (this._super("icon", e.primary),
            this._super("iconPosition", "beginning")) : e.secondary && (this._super("icon", e.secondary),
            this._super("iconPosition", "end"))),
            this._superApply(arguments)) : this._super("showLabel", e)
        }
    }),
    V.fn.button = (et = V.fn.button,
    function(i) {
        var t = "string" == typeof i
          , s = Array.prototype.slice.call(arguments, 1)
          , n = this;
        return t ? this.length || "instance" !== i ? this.each(function() {
            var t = V(this).attr("type")
              , e = V.data(this, "ui-" + ("checkbox" !== t && "radio" !== t ? "button" : "checkboxradio"));
            return "instance" === i ? (n = e,
            !1) : e ? "function" != typeof e[i] || "_" === i.charAt(0) ? V.error("no such method '" + i + "' for button widget instance") : (t = e[i].apply(e, s)) !== e && void 0 !== t ? (n = t && t.jquery ? n.pushStack(t.get()) : t,
            !1) : void 0 : V.error("cannot call methods on button prior to initialization; attempted to call method '" + i + "'")
        }) : n = void 0 : (s.length && (i = V.widget.extend.apply(null, [i].concat(s))),
        this.each(function() {
            var t = V(this).attr("type")
              , e = "checkbox" !== t && "radio" !== t ? "button" : "checkboxradio"
              , t = V.data(this, "ui-" + e);
            t ? (t.option(i || {}),
            t._init && t._init()) : "button" != e ? V(this).checkboxradio(V.extend({
                icon: !1
            }, i)) : et.call(V(this), i)
        })),
        n
    }
    ),
    V.fn.buttonset = function() {
        return V.ui.controlgroup || V.error("Controlgroup widget missing"),
        "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
            button: arguments[0].items
        }),
        this.controlgroup.apply(this, arguments))
    }
    );
    var it;
    V.ui.button;
    function st() {
        this._curInst = null,
        this._keyEvent = !1,
        this._disabledInputs = [],
        this._datepickerShowing = !1,
        this._inDialog = !1,
        this._mainDivId = "ui-datepicker-div",
        this._inlineClass = "ui-datepicker-inline",
        this._appendClass = "ui-datepicker-append",
        this._triggerClass = "ui-datepicker-trigger",
        this._dialogClass = "ui-datepicker-dialog",
        this._disableClass = "ui-datepicker-disabled",
        this._unselectableClass = "ui-datepicker-unselectable",
        this._currentClass = "ui-datepicker-current-day",
        this._dayOverClass = "ui-datepicker-days-cell-over",
        this.regional = [],
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: "",
            selectMonthLabel: "Select month",
            selectYearLabel: "Select year"
        },
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            onUpdateDatepicker: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        },
        V.extend(this._defaults, this.regional[""]),
        this.regional.en = V.extend(!0, {}, this.regional[""]),
        this.regional["en-US"] = V.extend(!0, {}, this.regional.en),
        this.dpDiv = nt(V("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    function nt(t) {
        var e = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return t.on("mouseout", e, function() {
            V(this).removeClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") && V(this).removeClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") && V(this).removeClass("ui-datepicker-next-hover")
        }).on("mouseover", e, ot)
    }
    function ot() {
        V.datepicker._isDisabledDatepicker((it.inline ? it.dpDiv.parent() : it.input)[0]) || (V(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
        V(this).addClass("ui-state-hover"),
        -1 !== this.className.indexOf("ui-datepicker-prev") && V(this).addClass("ui-datepicker-prev-hover"),
        -1 !== this.className.indexOf("ui-datepicker-next") && V(this).addClass("ui-datepicker-next-hover"))
    }
    function at(t, e) {
        for (var i in V.extend(t, e),
        e)
            null == e[i] && (t[i] = e[i]);
        return t
    }
    V.extend(V.ui, {
        datepicker: {
            version: "1.13.1"
        }
    }),
    V.extend(st.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(t) {
            return at(this._defaults, t || {}),
            this
        },
        _attachDatepicker: function(t, e) {
            var i, s = t.nodeName.toLowerCase(), n = "div" === s || "span" === s;
            t.id || (this.uuid += 1,
            t.id = "dp" + this.uuid),
            (i = this._newInst(V(t), n)).settings = V.extend({}, e || {}),
            "input" === s ? this._connectDatepicker(t, i) : n && this._inlineDatepicker(t, i)
        },
        _newInst: function(t, e) {
            return {
                id: t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                input: t,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: e,
                dpDiv: e ? nt(V("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(t, e) {
            var i = V(t);
            e.append = V([]),
            e.trigger = V([]),
            i.hasClass(this.markerClassName) || (this._attachments(i, e),
            i.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp),
            this._autoSize(e),
            V.data(t, "datepicker", e),
            e.settings.disabled && this._disableDatepicker(t))
        },
        _attachments: function(t, e) {
            var i, s = this._get(e, "appendText"), n = this._get(e, "isRTL");
            e.append && e.append.remove(),
            s && (e.append = V("<span>").addClass(this._appendClass).text(s),
            t[n ? "before" : "after"](e.append)),
            t.off("focus", this._showDatepicker),
            e.trigger && e.trigger.remove(),
            "focus" !== (i = this._get(e, "showOn")) && "both" !== i || t.on("focus", this._showDatepicker),
            "button" !== i && "both" !== i || (s = this._get(e, "buttonText"),
            i = this._get(e, "buttonImage"),
            this._get(e, "buttonImageOnly") ? e.trigger = V("<img>").addClass(this._triggerClass).attr({
                src: i,
                alt: s,
                title: s
            }) : (e.trigger = V("<button type='button'>").addClass(this._triggerClass),
            i ? e.trigger.html(V("<img>").attr({
                src: i,
                alt: s,
                title: s
            })) : e.trigger.text(s)),
            t[n ? "before" : "after"](e.trigger),
            e.trigger.on("click", function() {
                return V.datepicker._datepickerShowing && V.datepicker._lastInput === t[0] ? V.datepicker._hideDatepicker() : (V.datepicker._datepickerShowing && V.datepicker._lastInput !== t[0] && V.datepicker._hideDatepicker(),
                V.datepicker._showDatepicker(t[0])),
                !1
            }))
        },
        _autoSize: function(t) {
            var e, i, s, n, o, a;
            this._get(t, "autoSize") && !t.inline && (o = new Date(2009,11,20),
            (a = this._get(t, "dateFormat")).match(/[DM]/) && (e = function(t) {
                for (n = s = i = 0; n < t.length; n++)
                    t[n].length > i && (i = t[n].length,
                    s = n);
                return s
            }
            ,
            o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))),
            o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())),
            t.input.attr("size", this._formatDate(t, o).length))
        },
        _inlineDatepicker: function(t, e) {
            var i = V(t);
            i.hasClass(this.markerClassName) || (i.addClass(this.markerClassName).append(e.dpDiv),
            V.data(t, "datepicker", e),
            this._setDate(e, this._getDefaultDate(e), !0),
            this._updateDatepicker(e),
            this._updateAlternate(e),
            e.settings.disabled && this._disableDatepicker(t),
            e.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(t, e, i, s, n) {
            var o, a = this._dialogInst;
            return a || (this.uuid += 1,
            o = "dp" + this.uuid,
            this._dialogInput = V("<input type='text' id='" + o + "' style='position: absolute; top: -100px; width: 0px;'/>"),
            this._dialogInput.on("keydown", this._doKeyDown),
            V("body").append(this._dialogInput),
            (a = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {},
            V.data(this._dialogInput[0], "datepicker", a)),
            at(a.settings, s || {}),
            e = e && e.constructor === Date ? this._formatDate(a, e) : e,
            this._dialogInput.val(e),
            this._pos = n ? n.length ? n : [n.pageX, n.pageY] : null,
            this._pos || (o = document.documentElement.clientWidth,
            s = document.documentElement.clientHeight,
            e = document.documentElement.scrollLeft || document.body.scrollLeft,
            n = document.documentElement.scrollTop || document.body.scrollTop,
            this._pos = [o / 2 - 100 + e, s / 2 - 150 + n]),
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
            a.settings.onSelect = i,
            this._inDialog = !0,
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            V.blockUI && V.blockUI(this.dpDiv),
            V.data(this._dialogInput[0], "datepicker", a),
            this
        },
        _destroyDatepicker: function(t) {
            var e, i = V(t), s = V.data(t, "datepicker");
            i.hasClass(this.markerClassName) && (e = t.nodeName.toLowerCase(),
            V.removeData(t, "datepicker"),
            "input" === e ? (s.append.remove(),
            s.trigger.remove(),
            i.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : "div" !== e && "span" !== e || i.removeClass(this.markerClassName).empty(),
            it === s && (it = null,
            this._curInst = null))
        },
        _enableDatepicker: function(e) {
            var t, i = V(e), s = V.data(e, "datepicker");
            i.hasClass(this.markerClassName) && ("input" === (t = e.nodeName.toLowerCase()) ? (e.disabled = !1,
            s.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : "div" !== t && "span" !== t || ((i = i.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"),
            i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
            this._disabledInputs = V.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }))
        },
        _disableDatepicker: function(e) {
            var t, i = V(e), s = V.data(e, "datepicker");
            i.hasClass(this.markerClassName) && ("input" === (t = e.nodeName.toLowerCase()) ? (e.disabled = !0,
            s.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : "div" !== t && "span" !== t || ((i = i.children("." + this._inlineClass)).children().addClass("ui-state-disabled"),
            i.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
            this._disabledInputs = V.map(this._disabledInputs, function(t) {
                return t === e ? null : t
            }),
            this._disabledInputs[this._disabledInputs.length] = e)
        },
        _isDisabledDatepicker: function(t) {
            if (!t)
                return !1;
            for (var e = 0; e < this._disabledInputs.length; e++)
                if (this._disabledInputs[e] === t)
                    return !0;
            return !1
        },
        _getInst: function(t) {
            try {
                return V.data(t, "datepicker")
            } catch (t) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(t, e, i) {
            var s, n, o = this._getInst(t);
            if (2 === arguments.length && "string" == typeof e)
                return "defaults" === e ? V.extend({}, V.datepicker._defaults) : o ? "all" === e ? V.extend({}, o.settings) : this._get(o, e) : null;
            s = e || {},
            "string" == typeof e && ((s = {})[e] = i),
            o && (this._curInst === o && this._hideDatepicker(),
            n = this._getDateDatepicker(t, !0),
            e = this._getMinMaxDate(o, "min"),
            i = this._getMinMaxDate(o, "max"),
            at(o.settings, s),
            null !== e && void 0 !== s.dateFormat && void 0 === s.minDate && (o.settings.minDate = this._formatDate(o, e)),
            null !== i && void 0 !== s.dateFormat && void 0 === s.maxDate && (o.settings.maxDate = this._formatDate(o, i)),
            "disabled"in s && (s.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)),
            this._attachments(V(t), o),
            this._autoSize(o),
            this._setDate(o, n),
            this._updateAlternate(o),
            this._updateDatepicker(o))
        },
        _changeDatepicker: function(t, e, i) {
            this._optionDatepicker(t, e, i)
        },
        _refreshDatepicker: function(t) {
            t = this._getInst(t);
            t && this._updateDatepicker(t)
        },
        _setDateDatepicker: function(t, e) {
            t = this._getInst(t);
            t && (this._setDate(t, e),
            this._updateDatepicker(t),
            this._updateAlternate(t))
        },
        _getDateDatepicker: function(t, e) {
            t = this._getInst(t);
            return t && !t.inline && this._setDateFromField(t, e),
            t ? this._getDate(t) : null
        },
        _doKeyDown: function(t) {
            var e, i, s = V.datepicker._getInst(t.target), n = !0, o = s.dpDiv.is(".ui-datepicker-rtl");
            if (s._keyEvent = !0,
            V.datepicker._datepickerShowing)
                switch (t.keyCode) {
                case 9:
                    V.datepicker._hideDatepicker(),
                    n = !1;
                    break;
                case 13:
                    return (i = V("td." + V.datepicker._dayOverClass + ":not(." + V.datepicker._currentClass + ")", s.dpDiv))[0] && V.datepicker._selectDay(t.target, s.selectedMonth, s.selectedYear, i[0]),
                    (e = V.datepicker._get(s, "onSelect")) ? (i = V.datepicker._formatDate(s),
                    e.apply(s.input ? s.input[0] : null, [i, s])) : V.datepicker._hideDatepicker(),
                    !1;
                case 27:
                    V.datepicker._hideDatepicker();
                    break;
                case 33:
                    V.datepicker._adjustDate(t.target, t.ctrlKey ? -V.datepicker._get(s, "stepBigMonths") : -V.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 34:
                    V.datepicker._adjustDate(t.target, t.ctrlKey ? +V.datepicker._get(s, "stepBigMonths") : +V.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 35:
                    (t.ctrlKey || t.metaKey) && V.datepicker._clearDate(t.target),
                    n = t.ctrlKey || t.metaKey;
                    break;
                case 36:
                    (t.ctrlKey || t.metaKey) && V.datepicker._gotoToday(t.target),
                    n = t.ctrlKey || t.metaKey;
                    break;
                case 37:
                    (t.ctrlKey || t.metaKey) && V.datepicker._adjustDate(t.target, o ? 1 : -1, "D"),
                    n = t.ctrlKey || t.metaKey,
                    t.originalEvent.altKey && V.datepicker._adjustDate(t.target, t.ctrlKey ? -V.datepicker._get(s, "stepBigMonths") : -V.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 38:
                    (t.ctrlKey || t.metaKey) && V.datepicker._adjustDate(t.target, -7, "D"),
                    n = t.ctrlKey || t.metaKey;
                    break;
                case 39:
                    (t.ctrlKey || t.metaKey) && V.datepicker._adjustDate(t.target, o ? -1 : 1, "D"),
                    n = t.ctrlKey || t.metaKey,
                    t.originalEvent.altKey && V.datepicker._adjustDate(t.target, t.ctrlKey ? +V.datepicker._get(s, "stepBigMonths") : +V.datepicker._get(s, "stepMonths"), "M");
                    break;
                case 40:
                    (t.ctrlKey || t.metaKey) && V.datepicker._adjustDate(t.target, 7, "D"),
                    n = t.ctrlKey || t.metaKey;
                    break;
                default:
                    n = !1
                }
            else
                36 === t.keyCode && t.ctrlKey ? V.datepicker._showDatepicker(this) : n = !1;
            n && (t.preventDefault(),
            t.stopPropagation())
        },
        _doKeyPress: function(t) {
            var e, i = V.datepicker._getInst(t.target);
            if (V.datepicker._get(i, "constrainInput"))
                return e = V.datepicker._possibleChars(V.datepicker._get(i, "dateFormat")),
                i = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode),
                t.ctrlKey || t.metaKey || i < " " || !e || -1 < e.indexOf(i)
        },
        _doKeyUp: function(t) {
            t = V.datepicker._getInst(t.target);
            if (t.input.val() !== t.lastVal)
                try {
                    V.datepicker.parseDate(V.datepicker._get(t, "dateFormat"), t.input ? t.input.val() : null, V.datepicker._getFormatConfig(t)) && (V.datepicker._setDateFromField(t),
                    V.datepicker._updateAlternate(t),
                    V.datepicker._updateDatepicker(t))
                } catch (t) {}
            return !0
        },
        _showDatepicker: function(t) {
            var e, i, s, n;
            "input" !== (t = t.target || t).nodeName.toLowerCase() && (t = V("input", t.parentNode)[0]),
            V.datepicker._isDisabledDatepicker(t) || V.datepicker._lastInput === t || (n = V.datepicker._getInst(t),
            V.datepicker._curInst && V.datepicker._curInst !== n && (V.datepicker._curInst.dpDiv.stop(!0, !0),
            n && V.datepicker._datepickerShowing && V.datepicker._hideDatepicker(V.datepicker._curInst.input[0])),
            !1 !== (i = (s = V.datepicker._get(n, "beforeShow")) ? s.apply(t, [t, n]) : {}) && (at(n.settings, i),
            n.lastVal = null,
            V.datepicker._lastInput = t,
            V.datepicker._setDateFromField(n),
            V.datepicker._inDialog && (t.value = ""),
            V.datepicker._pos || (V.datepicker._pos = V.datepicker._findPos(t),
            V.datepicker._pos[1] += t.offsetHeight),
            e = !1,
            V(t).parents().each(function() {
                return !(e |= "fixed" === V(this).css("position"))
            }),
            s = {
                left: V.datepicker._pos[0],
                top: V.datepicker._pos[1]
            },
            V.datepicker._pos = null,
            n.dpDiv.empty(),
            n.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            }),
            V.datepicker._updateDatepicker(n),
            s = V.datepicker._checkOffset(n, s, e),
            n.dpDiv.css({
                position: V.datepicker._inDialog && V.blockUI ? "static" : e ? "fixed" : "absolute",
                display: "none",
                left: s.left + "px",
                top: s.top + "px"
            }),
            n.inline || (i = V.datepicker._get(n, "showAnim"),
            s = V.datepicker._get(n, "duration"),
            n.dpDiv.css("z-index", function(t) {
                for (var e, i; t.length && t[0] !== document; ) {
                    if (("absolute" === (e = t.css("position")) || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10),
                    !isNaN(i) && 0 !== i))
                        return i;
                    t = t.parent()
                }
                return 0
            }(V(t)) + 1),
            V.datepicker._datepickerShowing = !0,
            V.effects && V.effects.effect[i] ? n.dpDiv.show(i, V.datepicker._get(n, "showOptions"), s) : n.dpDiv[i || "show"](i ? s : null),
            V.datepicker._shouldFocusInput(n) && n.input.trigger("focus"),
            V.datepicker._curInst = n)))
        },
        _updateDatepicker: function(t) {
            this.maxRows = 4,
            (it = t).dpDiv.empty().append(this._generateHTML(t)),
            this._attachHandlers(t);
            var e, i = this._getNumberOfMonths(t), s = i[1], n = t.dpDiv.find("." + this._dayOverClass + " a"), o = V.datepicker._get(t, "onUpdateDatepicker");
            0 < n.length && ot.apply(n.get(0)),
            t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
            1 < s && t.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", 17 * s + "em"),
            t.dpDiv[(1 !== i[0] || 1 !== i[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
            t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
            t === V.datepicker._curInst && V.datepicker._datepickerShowing && V.datepicker._shouldFocusInput(t) && t.input.trigger("focus"),
            t.yearshtml && (e = t.yearshtml,
            setTimeout(function() {
                e === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year").first().replaceWith(t.yearshtml),
                e = t.yearshtml = null
            }, 0)),
            o && o.apply(t.input ? t.input[0] : null, [t])
        },
        _shouldFocusInput: function(t) {
            return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
        },
        _checkOffset: function(t, e, i) {
            var s = t.dpDiv.outerWidth()
              , n = t.dpDiv.outerHeight()
              , o = t.input ? t.input.outerWidth() : 0
              , a = t.input ? t.input.outerHeight() : 0
              , r = document.documentElement.clientWidth + (i ? 0 : V(document).scrollLeft())
              , l = document.documentElement.clientHeight + (i ? 0 : V(document).scrollTop());
            return e.left -= this._get(t, "isRTL") ? s - o : 0,
            e.left -= i && e.left === t.input.offset().left ? V(document).scrollLeft() : 0,
            e.top -= i && e.top === t.input.offset().top + a ? V(document).scrollTop() : 0,
            e.left -= Math.min(e.left, e.left + s > r && s < r ? Math.abs(e.left + s - r) : 0),
            e.top -= Math.min(e.top, e.top + n > l && n < l ? Math.abs(n + a) : 0),
            e
        },
        _findPos: function(t) {
            for (var e = this._getInst(t), i = this._get(e, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || V.expr.pseudos.hidden(t)); )
                t = t[i ? "previousSibling" : "nextSibling"];
            return [(e = V(t).offset()).left, e.top]
        },
        _hideDatepicker: function(t) {
            var e, i, s = this._curInst;
            !s || t && s !== V.data(t, "datepicker") || this._datepickerShowing && (e = this._get(s, "showAnim"),
            i = this._get(s, "duration"),
            t = function() {
                V.datepicker._tidyDialog(s)
            }
            ,
            V.effects && (V.effects.effect[e] || V.effects[e]) ? s.dpDiv.hide(e, V.datepicker._get(s, "showOptions"), i, t) : s.dpDiv["slideDown" === e ? "slideUp" : "fadeIn" === e ? "fadeOut" : "hide"](e ? i : null, t),
            e || t(),
            this._datepickerShowing = !1,
            (t = this._get(s, "onClose")) && t.apply(s.input ? s.input[0] : null, [s.input ? s.input.val() : "", s]),
            this._lastInput = null,
            this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }),
            V.blockUI && (V.unblockUI(),
            V("body").append(this.dpDiv))),
            this._inDialog = !1)
        },
        _tidyDialog: function(t) {
            t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(t) {
            var e;
            V.datepicker._curInst && (e = V(t.target),
            t = V.datepicker._getInst(e[0]),
            (e[0].id === V.datepicker._mainDivId || 0 !== e.parents("#" + V.datepicker._mainDivId).length || e.hasClass(V.datepicker.markerClassName) || e.closest("." + V.datepicker._triggerClass).length || !V.datepicker._datepickerShowing || V.datepicker._inDialog && V.blockUI) && (!e.hasClass(V.datepicker.markerClassName) || V.datepicker._curInst === t) || V.datepicker._hideDatepicker())
        },
        _adjustDate: function(t, e, i) {
            var s = V(t)
              , t = this._getInst(s[0]);
            this._isDisabledDatepicker(s[0]) || (this._adjustInstDate(t, e, i),
            this._updateDatepicker(t))
        },
        _gotoToday: function(t) {
            var e = V(t)
              , i = this._getInst(e[0]);
            this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay,
            i.drawMonth = i.selectedMonth = i.currentMonth,
            i.drawYear = i.selectedYear = i.currentYear) : (t = new Date,
            i.selectedDay = t.getDate(),
            i.drawMonth = i.selectedMonth = t.getMonth(),
            i.drawYear = i.selectedYear = t.getFullYear()),
            this._notifyChange(i),
            this._adjustDate(e)
        },
        _selectMonthYear: function(t, e, i) {
            var s = V(t)
              , t = this._getInst(s[0]);
            t["selected" + ("M" === i ? "Month" : "Year")] = t["draw" + ("M" === i ? "Month" : "Year")] = parseInt(e.options[e.selectedIndex].value, 10),
            this._notifyChange(t),
            this._adjustDate(s)
        },
        _selectDay: function(t, e, i, s) {
            var n = V(t);
            V(s).hasClass(this._unselectableClass) || this._isDisabledDatepicker(n[0]) || ((n = this._getInst(n[0])).selectedDay = n.currentDay = parseInt(V("a", s).attr("data-date")),
            n.selectedMonth = n.currentMonth = e,
            n.selectedYear = n.currentYear = i,
            this._selectDate(t, this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)))
        },
        _clearDate: function(t) {
            t = V(t);
            this._selectDate(t, "")
        },
        _selectDate: function(t, e) {
            var i = V(t)
              , t = this._getInst(i[0]);
            e = null != e ? e : this._formatDate(t),
            t.input && t.input.val(e),
            this._updateAlternate(t),
            (i = this._get(t, "onSelect")) ? i.apply(t.input ? t.input[0] : null, [e, t]) : t.input && t.input.trigger("change"),
            t.inline ? this._updateDatepicker(t) : (this._hideDatepicker(),
            this._lastInput = t.input[0],
            "object" != typeof t.input[0] && t.input.trigger("focus"),
            this._lastInput = null)
        },
        _updateAlternate: function(t) {
            var e, i, s = this._get(t, "altField");
            s && (e = this._get(t, "altFormat") || this._get(t, "dateFormat"),
            i = this._getDate(t),
            t = this.formatDate(e, i, this._getFormatConfig(t)),
            V(document).find(s).val(t))
        },
        noWeekends: function(t) {
            t = t.getDay();
            return [0 < t && t < 6, ""]
        },
        iso8601Week: function(t) {
            var e = new Date(t.getTime());
            return e.setDate(e.getDate() + 4 - (e.getDay() || 7)),
            t = e.getTime(),
            e.setMonth(0),
            e.setDate(1),
            Math.floor(Math.round((t - e) / 864e5) / 7) + 1
        },
        parseDate: function(e, n, t) {
            if (null == e || null == n)
                throw "Invalid arguments";
            if ("" === (n = "object" == typeof n ? n.toString() : n + ""))
                return null;
            for (var i, s, o, a = 0, r = (t ? t.shortYearCutoff : null) || this._defaults.shortYearCutoff, r = "string" != typeof r ? r : (new Date).getFullYear() % 100 + parseInt(r, 10), l = (t ? t.dayNamesShort : null) || this._defaults.dayNamesShort, h = (t ? t.dayNames : null) || this._defaults.dayNames, c = (t ? t.monthNamesShort : null) || this._defaults.monthNamesShort, u = (t ? t.monthNames : null) || this._defaults.monthNames, d = -1, p = -1, f = -1, g = -1, m = !1, _ = function(t) {
                t = w + 1 < e.length && e.charAt(w + 1) === t;
                return t && w++,
                t
            }, v = function(t) {
                var e = _(t)
                  , e = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2
                  , e = new RegExp("^\\d{" + ("y" === t ? e : 1) + "," + e + "}")
                  , e = n.substring(a).match(e);
                if (!e)
                    throw "Missing number at position " + a;
                return a += e[0].length,
                parseInt(e[0], 10)
            }, b = function(t, e, i) {
                var s = -1
                  , e = V.map(_(t) ? i : e, function(t, e) {
                    return [[e, t]]
                }).sort(function(t, e) {
                    return -(t[1].length - e[1].length)
                });
                if (V.each(e, function(t, e) {
                    var i = e[1];
                    if (n.substr(a, i.length).toLowerCase() === i.toLowerCase())
                        return s = e[0],
                        a += i.length,
                        !1
                }),
                -1 !== s)
                    return s + 1;
                throw "Unknown name at position " + a
            }, y = function() {
                if (n.charAt(a) !== e.charAt(w))
                    throw "Unexpected literal at position " + a;
                a++
            }, w = 0; w < e.length; w++)
                if (m)
                    "'" !== e.charAt(w) || _("'") ? y() : m = !1;
                else
                    switch (e.charAt(w)) {
                    case "d":
                        f = v("d");
                        break;
                    case "D":
                        b("D", l, h);
                        break;
                    case "o":
                        g = v("o");
                        break;
                    case "m":
                        p = v("m");
                        break;
                    case "M":
                        p = b("M", c, u);
                        break;
                    case "y":
                        d = v("y");
                        break;
                    case "@":
                        d = (o = new Date(v("@"))).getFullYear(),
                        p = o.getMonth() + 1,
                        f = o.getDate();
                        break;
                    case "!":
                        d = (o = new Date((v("!") - this._ticksTo1970) / 1e4)).getFullYear(),
                        p = o.getMonth() + 1,
                        f = o.getDate();
                        break;
                    case "'":
                        _("'") ? y() : m = !0;
                        break;
                    default:
                        y()
                    }
            if (a < n.length && (s = n.substr(a),
            !/^\s+/.test(s)))
                throw "Extra/unparsed characters found in date: " + s;
            if (-1 === d ? d = (new Date).getFullYear() : d < 100 && (d += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d <= r ? 0 : -100)),
            -1 < g)
                for (p = 1,
                f = g; ; ) {
                    if (f <= (i = this._getDaysInMonth(d, p - 1)))
                        break;
                    p++,
                    f -= i
                }
            if ((o = this._daylightSavingAdjust(new Date(d,p - 1,f))).getFullYear() !== d || o.getMonth() + 1 !== p || o.getDate() !== f)
                throw "Invalid date";
            return o
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(e, t, i) {
            if (!t)
                return "";
            function s(t, e, i) {
                var s = "" + e;
                if (c(t))
                    for (; s.length < i; )
                        s = "0" + s;
                return s
            }
            function n(t, e, i, s) {
                return (c(t) ? s : i)[e]
            }
            var o, a = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort, r = (i ? i.dayNames : null) || this._defaults.dayNames, l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort, h = (i ? i.monthNames : null) || this._defaults.monthNames, c = function(t) {
                t = o + 1 < e.length && e.charAt(o + 1) === t;
                return t && o++,
                t
            }, u = "", d = !1;
            if (t)
                for (o = 0; o < e.length; o++)
                    if (d)
                        "'" !== e.charAt(o) || c("'") ? u += e.charAt(o) : d = !1;
                    else
                        switch (e.charAt(o)) {
                        case "d":
                            u += s("d", t.getDate(), 2);
                            break;
                        case "D":
                            u += n("D", t.getDay(), a, r);
                            break;
                        case "o":
                            u += s("o", Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime() - new Date(t.getFullYear(),0,0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            u += s("m", t.getMonth() + 1, 2);
                            break;
                        case "M":
                            u += n("M", t.getMonth(), l, h);
                            break;
                        case "y":
                            u += c("y") ? t.getFullYear() : (t.getFullYear() % 100 < 10 ? "0" : "") + t.getFullYear() % 100;
                            break;
                        case "@":
                            u += t.getTime();
                            break;
                        case "!":
                            u += 1e4 * t.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            c("'") ? u += "'" : d = !0;
                            break;
                        default:
                            u += e.charAt(o)
                        }
            return u
        },
        _possibleChars: function(e) {
            for (var t = "", i = !1, s = function(t) {
                t = n + 1 < e.length && e.charAt(n + 1) === t;
                return t && n++,
                t
            }, n = 0; n < e.length; n++)
                if (i)
                    "'" !== e.charAt(n) || s("'") ? t += e.charAt(n) : i = !1;
                else
                    switch (e.charAt(n)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        t += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        s("'") ? t += "'" : i = !0;
                        break;
                    default:
                        t += e.charAt(n)
                    }
            return t
        },
        _get: function(t, e) {
            return (void 0 !== t.settings[e] ? t.settings : this._defaults)[e]
        },
        _setDateFromField: function(t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat")
                  , s = t.lastVal = t.input ? t.input.val() : null
                  , n = this._getDefaultDate(t)
                  , o = n
                  , a = this._getFormatConfig(t);
                try {
                    o = this.parseDate(i, s, a) || n
                } catch (t) {
                    s = e ? "" : s
                }
                t.selectedDay = o.getDate(),
                t.drawMonth = t.selectedMonth = o.getMonth(),
                t.drawYear = t.selectedYear = o.getFullYear(),
                t.currentDay = s ? o.getDate() : 0,
                t.currentMonth = s ? o.getMonth() : 0,
                t.currentYear = s ? o.getFullYear() : 0,
                this._adjustInstDate(t)
            }
        },
        _getDefaultDate: function(t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
        },
        _determineDate: function(r, t, e) {
            var i, s, t = null == t || "" === t ? e : "string" == typeof t ? function(t) {
                try {
                    return V.datepicker.parseDate(V.datepicker._get(r, "dateFormat"), t, V.datepicker._getFormatConfig(r))
                } catch (t) {}
                for (var e = (t.toLowerCase().match(/^c/) ? V.datepicker._getDate(r) : null) || new Date, i = e.getFullYear(), s = e.getMonth(), n = e.getDate(), o = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, a = o.exec(t); a; ) {
                    switch (a[2] || "d") {
                    case "d":
                    case "D":
                        n += parseInt(a[1], 10);
                        break;
                    case "w":
                    case "W":
                        n += 7 * parseInt(a[1], 10);
                        break;
                    case "m":
                    case "M":
                        s += parseInt(a[1], 10),
                        n = Math.min(n, V.datepicker._getDaysInMonth(i, s));
                        break;
                    case "y":
                    case "Y":
                        i += parseInt(a[1], 10),
                        n = Math.min(n, V.datepicker._getDaysInMonth(i, s))
                    }
                    a = o.exec(t)
                }
                return new Date(i,s,n)
            }(t) : "number" == typeof t ? isNaN(t) ? e : (i = t,
            (s = new Date).setDate(s.getDate() + i),
            s) : new Date(t.getTime());
            return (t = t && "Invalid Date" === t.toString() ? e : t) && (t.setHours(0),
            t.setMinutes(0),
            t.setSeconds(0),
            t.setMilliseconds(0)),
            this._daylightSavingAdjust(t)
        },
        _daylightSavingAdjust: function(t) {
            return t ? (t.setHours(12 < t.getHours() ? t.getHours() + 2 : 0),
            t) : null
        },
        _setDate: function(t, e, i) {
            var s = !e
              , n = t.selectedMonth
              , o = t.selectedYear
              , e = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = e.getDate(),
            t.drawMonth = t.selectedMonth = t.currentMonth = e.getMonth(),
            t.drawYear = t.selectedYear = t.currentYear = e.getFullYear(),
            n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t),
            this._adjustInstDate(t),
            t.input && t.input.val(s ? "" : this._formatDate(t))
        },
        _getDate: function(t) {
            return !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay))
        },
        _attachHandlers: function(t) {
            var e = this._get(t, "stepMonths")
              , i = "#" + t.id.replace(/\\\\/g, "\\");
            t.dpDiv.find("[data-handler]").map(function() {
                var t = {
                    prev: function() {
                        V.datepicker._adjustDate(i, -e, "M")
                    },
                    next: function() {
                        V.datepicker._adjustDate(i, +e, "M")
                    },
                    hide: function() {
                        V.datepicker._hideDatepicker()
                    },
                    today: function() {
                        V.datepicker._gotoToday(i)
                    },
                    selectDay: function() {
                        return V.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                        !1
                    },
                    selectMonth: function() {
                        return V.datepicker._selectMonthYear(i, this, "M"),
                        !1
                    },
                    selectYear: function() {
                        return V.datepicker._selectMonthYear(i, this, "Y"),
                        !1
                    }
                };
                V(this).on(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(t) {
            var e, i, s, n, o, a, r, l, h, c, u, d, p, f, g, m, _, v, b, y, w, x, k, C, D, I, T, P, M, S, H, z, A = new Date, O = this._daylightSavingAdjust(new Date(A.getFullYear(),A.getMonth(),A.getDate())), N = this._get(t, "isRTL"), E = this._get(t, "showButtonPanel"), W = this._get(t, "hideIfNoPrevNext"), F = this._get(t, "navigationAsDateFormat"), L = this._getNumberOfMonths(t), R = this._get(t, "showCurrentAtPos"), A = this._get(t, "stepMonths"), Y = 1 !== L[0] || 1 !== L[1], B = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear,t.currentMonth,t.currentDay) : new Date(9999,9,9)), j = this._getMinMaxDate(t, "min"), q = this._getMinMaxDate(t, "max"), K = t.drawMonth - R, U = t.drawYear;
            if (K < 0 && (K += 12,
            U--),
            q)
                for (e = this._daylightSavingAdjust(new Date(q.getFullYear(),q.getMonth() - L[0] * L[1] + 1,q.getDate())),
                e = j && e < j ? j : e; this._daylightSavingAdjust(new Date(U,K,1)) > e; )
                    --K < 0 && (K = 11,
                    U--);
            for (t.drawMonth = K,
            t.drawYear = U,
            R = this._get(t, "prevText"),
            R = F ? this.formatDate(R, this._daylightSavingAdjust(new Date(U,K - A,1)), this._getFormatConfig(t)) : R,
            i = this._canAdjustMonth(t, -1, U, K) ? V("<a>").attr({
                class: "ui-datepicker-prev ui-corner-all",
                "data-handler": "prev",
                "data-event": "click",
                title: R
            }).append(V("<span>").addClass("ui-icon ui-icon-circle-triangle-" + (N ? "e" : "w")).text(R))[0].outerHTML : W ? "" : V("<a>").attr({
                class: "ui-datepicker-prev ui-corner-all ui-state-disabled",
                title: R
            }).append(V("<span>").addClass("ui-icon ui-icon-circle-triangle-" + (N ? "e" : "w")).text(R))[0].outerHTML,
            R = this._get(t, "nextText"),
            R = F ? this.formatDate(R, this._daylightSavingAdjust(new Date(U,K + A,1)), this._getFormatConfig(t)) : R,
            s = this._canAdjustMonth(t, 1, U, K) ? V("<a>").attr({
                class: "ui-datepicker-next ui-corner-all",
                "data-handler": "next",
                "data-event": "click",
                title: R
            }).append(V("<span>").addClass("ui-icon ui-icon-circle-triangle-" + (N ? "w" : "e")).text(R))[0].outerHTML : W ? "" : V("<a>").attr({
                class: "ui-datepicker-next ui-corner-all ui-state-disabled",
                title: R
            }).append(V("<span>").attr("class", "ui-icon ui-icon-circle-triangle-" + (N ? "w" : "e")).text(R))[0].outerHTML,
            A = this._get(t, "currentText"),
            W = this._get(t, "gotoCurrent") && t.currentDay ? B : O,
            A = F ? this.formatDate(A, W, this._getFormatConfig(t)) : A,
            R = "",
            t.inline || (R = V("<button>").attr({
                type: "button",
                class: "ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all",
                "data-handler": "hide",
                "data-event": "click"
            }).text(this._get(t, "closeText"))[0].outerHTML),
            F = "",
            E && (F = V("<div class='ui-datepicker-buttonpane ui-widget-content'>").append(N ? R : "").append(this._isInRange(t, W) ? V("<button>").attr({
                type: "button",
                class: "ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all",
                "data-handler": "today",
                "data-event": "click"
            }).text(A) : "").append(N ? "" : R)[0].outerHTML),
            n = parseInt(this._get(t, "firstDay"), 10),
            n = isNaN(n) ? 0 : n,
            o = this._get(t, "showWeek"),
            a = this._get(t, "dayNames"),
            r = this._get(t, "dayNamesMin"),
            l = this._get(t, "monthNames"),
            h = this._get(t, "monthNamesShort"),
            c = this._get(t, "beforeShowDay"),
            u = this._get(t, "showOtherMonths"),
            d = this._get(t, "selectOtherMonths"),
            p = this._getDefaultDate(t),
            f = "",
            m = 0; m < L[0]; m++) {
                for (_ = "",
                this.maxRows = 4,
                v = 0; v < L[1]; v++) {
                    if (b = this._daylightSavingAdjust(new Date(U,K,t.selectedDay)),
                    y = " ui-corner-all",
                    w = "",
                    Y) {
                        if (w += "<div class='ui-datepicker-group",
                        1 < L[1])
                            switch (v) {
                            case 0:
                                w += " ui-datepicker-group-first",
                                y = " ui-corner-" + (N ? "right" : "left");
                                break;
                            case L[1] - 1:
                                w += " ui-datepicker-group-last",
                                y = " ui-corner-" + (N ? "left" : "right");
                                break;
                            default:
                                w += " ui-datepicker-group-middle",
                                y = ""
                            }
                        w += "'>"
                    }
                    for (w += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + y + "'>" + (/all|left/.test(y) && 0 === m ? N ? s : i : "") + (/all|right/.test(y) && 0 === m ? N ? i : s : "") + this._generateMonthYearHeader(t, K, U, j, q, 0 < m || 0 < v, l, h) + "</div><table class='ui-datepicker-calendar'><thead><tr>",
                    x = o ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "",
                    g = 0; g < 7; g++)
                        x += "<th scope='col'" + (5 <= (g + n + 6) % 7 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + a[k = (g + n) % 7] + "'>" + r[k] + "</span></th>";
                    for (w += x + "</tr></thead><tbody>",
                    D = this._getDaysInMonth(U, K),
                    U === t.selectedYear && K === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, D)),
                    C = (this._getFirstDayOfMonth(U, K) - n + 7) % 7,
                    D = Math.ceil((C + D) / 7),
                    I = Y && this.maxRows > D ? this.maxRows : D,
                    this.maxRows = I,
                    T = this._daylightSavingAdjust(new Date(U,K,1 - C)),
                    P = 0; P < I; P++) {
                        for (w += "<tr>",
                        M = o ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(T) + "</td>" : "",
                        g = 0; g < 7; g++)
                            S = c ? c.apply(t.input ? t.input[0] : null, [T]) : [!0, ""],
                            z = (H = T.getMonth() !== K) && !d || !S[0] || j && T < j || q && q < T,
                            M += "<td class='" + (5 <= (g + n + 6) % 7 ? " ui-datepicker-week-end" : "") + (H ? " ui-datepicker-other-month" : "") + (T.getTime() === b.getTime() && K === t.selectedMonth && t._keyEvent || p.getTime() === T.getTime() && p.getTime() === b.getTime() ? " " + this._dayOverClass : "") + (z ? " " + this._unselectableClass + " ui-state-disabled" : "") + (H && !u ? "" : " " + S[1] + (T.getTime() === B.getTime() ? " " + this._currentClass : "") + (T.getTime() === O.getTime() ? " ui-datepicker-today" : "")) + "'" + (H && !u || !S[2] ? "" : " title='" + S[2].replace(/'/g, "&#39;") + "'") + (z ? "" : " data-handler='selectDay' data-event='click' data-month='" + T.getMonth() + "' data-year='" + T.getFullYear() + "'") + ">" + (H && !u ? "&#xa0;" : z ? "<span class='ui-state-default'>" + T.getDate() + "</span>" : "<a class='ui-state-default" + (T.getTime() === O.getTime() ? " ui-state-highlight" : "") + (T.getTime() === B.getTime() ? " ui-state-active" : "") + (H ? " ui-priority-secondary" : "") + "' href='#' aria-current='" + (T.getTime() === B.getTime() ? "true" : "false") + "' data-date='" + T.getDate() + "'>" + T.getDate() + "</a>") + "</td>",
                            T.setDate(T.getDate() + 1),
                            T = this._daylightSavingAdjust(T);
                        w += M + "</tr>"
                    }
                    11 < ++K && (K = 0,
                    U++),
                    _ += w += "</tbody></table>" + (Y ? "</div>" + (0 < L[0] && v === L[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "")
                }
                f += _
            }
            return f += F,
            t._keyEvent = !1,
            f
        },
        _generateMonthYearHeader: function(t, e, i, s, n, o, a, r) {
            var l, h, c, u, d, p, f = this._get(t, "changeMonth"), g = this._get(t, "changeYear"), m = this._get(t, "showMonthAfterYear"), _ = this._get(t, "selectMonthLabel"), v = this._get(t, "selectYearLabel"), b = "<div class='ui-datepicker-title'>", y = "";
            if (o || !f)
                y += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
            else {
                for (l = s && s.getFullYear() === i,
                h = n && n.getFullYear() === i,
                y += "<select class='ui-datepicker-month' aria-label='" + _ + "' data-handler='selectMonth' data-event='change'>",
                c = 0; c < 12; c++)
                    (!l || c >= s.getMonth()) && (!h || c <= n.getMonth()) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
                y += "</select>"
            }
            if (m || (b += y + (!o && f && g ? "" : "&#xa0;")),
            !t.yearshtml)
                if (t.yearshtml = "",
                o || !g)
                    b += "<span class='ui-datepicker-year'>" + i + "</span>";
                else {
                    for (a = this._get(t, "yearRange").split(":"),
                    u = (new Date).getFullYear(),
                    d = (_ = function(t) {
                        t = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? u + parseInt(t, 10) : parseInt(t, 10);
                        return isNaN(t) ? u : t
                    }
                    )(a[0]),
                    p = Math.max(d, _(a[1] || "")),
                    d = s ? Math.max(d, s.getFullYear()) : d,
                    p = n ? Math.min(p, n.getFullYear()) : p,
                    t.yearshtml += "<select class='ui-datepicker-year' aria-label='" + v + "' data-handler='selectYear' data-event='change'>"; d <= p; d++)
                        t.yearshtml += "<option value='" + d + "'" + (d === i ? " selected='selected'" : "") + ">" + d + "</option>";
                    t.yearshtml += "</select>",
                    b += t.yearshtml,
                    t.yearshtml = null
                }
            return b += this._get(t, "yearSuffix"),
            m && (b += (!o && f && g ? "" : "&#xa0;") + y),
            b += "</div>"
        },
        _adjustInstDate: function(t, e, i) {
            var s = t.selectedYear + ("Y" === i ? e : 0)
              , n = t.selectedMonth + ("M" === i ? e : 0)
              , e = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0)
              , e = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s,n,e)));
            t.selectedDay = e.getDate(),
            t.drawMonth = t.selectedMonth = e.getMonth(),
            t.drawYear = t.selectedYear = e.getFullYear(),
            "M" !== i && "Y" !== i || this._notifyChange(t)
        },
        _restrictMinMax: function(t, e) {
            var i = this._getMinMaxDate(t, "min")
              , t = this._getMinMaxDate(t, "max")
              , e = i && e < i ? i : e;
            return t && t < e ? t : e
        },
        _notifyChange: function(t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        },
        _getNumberOfMonths: function(t) {
            t = this._get(t, "numberOfMonths");
            return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
        },
        _getMinMaxDate: function(t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null)
        },
        _getDaysInMonth: function(t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t,e,32)).getDate()
        },
        _getFirstDayOfMonth: function(t, e) {
            return new Date(t,e,1).getDay()
        },
        _canAdjustMonth: function(t, e, i, s) {
            var n = this._getNumberOfMonths(t)
              , n = this._daylightSavingAdjust(new Date(i,s + (e < 0 ? e : n[0] * n[1]),1));
            return e < 0 && n.setDate(this._getDaysInMonth(n.getFullYear(), n.getMonth())),
            this._isInRange(t, n)
        },
        _isInRange: function(t, e) {
            var i = this._getMinMaxDate(t, "min")
              , s = this._getMinMaxDate(t, "max")
              , n = null
              , o = null
              , a = this._get(t, "yearRange");
            return a && (t = a.split(":"),
            a = (new Date).getFullYear(),
            n = parseInt(t[0], 10),
            o = parseInt(t[1], 10),
            t[0].match(/[+\-].*/) && (n += a),
            t[1].match(/[+\-].*/) && (o += a)),
            (!i || e.getTime() >= i.getTime()) && (!s || e.getTime() <= s.getTime()) && (!n || e.getFullYear() >= n) && (!o || e.getFullYear() <= o)
        },
        _getFormatConfig: function(t) {
            var e = this._get(t, "shortYearCutoff");
            return {
                shortYearCutoff: e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10),
                dayNamesShort: this._get(t, "dayNamesShort"),
                dayNames: this._get(t, "dayNames"),
                monthNamesShort: this._get(t, "monthNamesShort"),
                monthNames: this._get(t, "monthNames")
            }
        },
        _formatDate: function(t, e, i, s) {
            e || (t.currentDay = t.selectedDay,
            t.currentMonth = t.selectedMonth,
            t.currentYear = t.selectedYear);
            e = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s,i,e)) : this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), e, this._getFormatConfig(t))
        }
    }),
    V.fn.datepicker = function(t) {
        if (!this.length)
            return this;
        V.datepicker.initialized || (V(document).on("mousedown", V.datepicker._checkExternalClick),
        V.datepicker.initialized = !0),
        0 === V("#" + V.datepicker._mainDivId).length && V("body").append(V.datepicker.dpDiv);
        var e = Array.prototype.slice.call(arguments, 1);
        return "string" == typeof t && ("isDisabled" === t || "getDate" === t || "widget" === t) || "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? V.datepicker["_" + t + "Datepicker"].apply(V.datepicker, [this[0]].concat(e)) : this.each(function() {
            "string" == typeof t ? V.datepicker["_" + t + "Datepicker"].apply(V.datepicker, [this].concat(e)) : V.datepicker._attachDatepicker(this, t)
        })
    }
    ,
    V.datepicker = new st,
    V.datepicker.initialized = !1,
    V.datepicker.uuid = (new Date).getTime(),
    V.datepicker.version = "1.13.1";
    V.datepicker,
    V.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    var rt = !1;
    V(document).on("mouseup", function() {
        rt = !1
    });
    V.widget("ui.mouse", {
        version: "1.13.1",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.on("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).on("click." + this.widgetName, function(t) {
                if (!0 === V.data(t.target, e.widgetName + ".preventClickEvent"))
                    return V.removeData(t.target, e.widgetName + ".preventClickEvent"),
                    t.stopImmediatePropagation(),
                    !1
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName),
            this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(t) {
            if (!rt) {
                this._mouseMoved = !1,
                this._mouseStarted && this._mouseUp(t),
                this._mouseDownEvent = t;
                var e = this
                  , i = 1 === t.which
                  , s = !("string" != typeof this.options.cancel || !t.target.nodeName) && V(t.target).closest(this.options.cancel).length;
                return i && !s && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    e.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(t),
                !this._mouseStarted) ? (t.preventDefault(),
                !0) : (!0 === V.data(t.target, this.widgetName + ".preventClickEvent") && V.removeData(t.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(t) {
                    return e._mouseMove(t)
                }
                ,
                this._mouseUpDelegate = function(t) {
                    return e._mouseUp(t)
                }
                ,
                this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate),
                t.preventDefault(),
                rt = !0)) : !0
            }
        },
        _mouseMove: function(t) {
            if (this._mouseMoved) {
                if (V.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button)
                    return this._mouseUp(t);
                if (!t.which)
                    if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey)
                        this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich)
                        return this._mouseUp(t)
            }
            return (t.which || t.button) && (this._mouseMoved = !0),
            this._mouseStarted ? (this._mouseDrag(t),
            t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, t),
            this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
            !this._mouseStarted)
        },
        _mouseUp: function(t) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1,
            t.target === this._mouseDownEvent.target && V.data(t.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(t)),
            this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer),
            delete this._mouseDelayTimer),
            this.ignoreMissingWhich = !1,
            rt = !1,
            t.preventDefault()
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    }),
    V.ui.plugin = {
        add: function(t, e, i) {
            var s, n = V.ui[t].prototype;
            for (s in i)
                n.plugins[s] = n.plugins[s] || [],
                n.plugins[s].push([e, i[s]])
        },
        call: function(t, e, i, s) {
            var n, o = t.plugins[e];
            if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                for (n = 0; n < o.length; n++)
                    t.options[o[n][0]] && o[n][1].apply(t.element, i)
        }
    },
    V.ui.safeBlur = function(t) {
        t && "body" !== t.nodeName.toLowerCase() && V(t).trigger("blur")
    }
    ;
    V.widget("ui.draggable", V.ui.mouse, {
        version: "1.13.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative(),
            this.options.addClasses && this._addClass("ui-draggable"),
            this._setHandleClassName(),
            this._mouseInit()
        },
        _setOption: function(t, e) {
            this._super(t, e),
            "handle" === t && (this._removeHandleClassName(),
            this._setHandleClassName())
        },
        _destroy: function() {
            (this.helper || this.element).is(".ui-draggable-dragging") ? this.destroyOnClear = !0 : (this._removeHandleClassName(),
            this._mouseDestroy())
        },
        _mouseCapture: function(t) {
            var e = this.options;
            return !(this.helper || e.disabled || 0 < V(t.target).closest(".ui-resizable-handle").length) && (this.handle = this._getHandle(t),
            !!this.handle && (this._blurActiveElement(t),
            this._blockFrames(!0 === e.iframeFix ? "iframe" : e.iframeFix),
            !0))
        },
        _blockFrames: function(t) {
            this.iframeBlocks = this.document.find(t).map(function() {
                var t = V(this);
                return V("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _blurActiveElement: function(t) {
            var e = V.ui.safeActiveElement(this.document[0]);
            V(t.target).closest(e).length || V.ui.safeBlur(e)
        },
        _mouseStart: function(t) {
            var e = this.options;
            return this.helper = this._createHelper(t),
            this._addClass(this.helper, "ui-draggable-dragging"),
            this._cacheHelperProportions(),
            V.ui.ddmanager && (V.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(!0),
            this.offsetParent = this.helper.offsetParent(),
            this.hasFixedAncestor = 0 < this.helper.parents().filter(function() {
                return "fixed" === V(this).css("position")
            }).length,
            this.positionAbs = this.element.offset(),
            this._refreshOffsets(t),
            this.originalPosition = this.position = this._generatePosition(t, !1),
            this.originalPageX = t.pageX,
            this.originalPageY = t.pageY,
            e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt),
            this._setContainment(),
            !1 === this._trigger("start", t) ? (this._clear(),
            !1) : (this._cacheHelperProportions(),
            V.ui.ddmanager && !e.dropBehaviour && V.ui.ddmanager.prepareOffsets(this, t),
            this._mouseDrag(t, !0),
            V.ui.ddmanager && V.ui.ddmanager.dragStart(this, t),
            !0)
        },
        _refreshOffsets: function(t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            },
            this.offset.click = {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top
            }
        },
        _mouseDrag: function(t, e) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()),
            this.position = this._generatePosition(t, !0),
            this.positionAbs = this._convertPositionTo("absolute"),
            !e) {
                e = this._uiHash();
                if (!1 === this._trigger("drag", t, e))
                    return this._mouseUp(new V.Event("mouseup",t)),
                    !1;
                this.position = e.position
            }
            return this.helper[0].style.left = this.position.left + "px",
            this.helper[0].style.top = this.position.top + "px",
            V.ui.ddmanager && V.ui.ddmanager.drag(this, t),
            !1
        },
        _mouseStop: function(t) {
            var e = this
              , i = !1;
            return V.ui.ddmanager && !this.options.dropBehaviour && (i = V.ui.ddmanager.drop(this, t)),
            this.dropped && (i = this.dropped,
            this.dropped = !1),
            "invalid" === this.options.revert && !i || "valid" === this.options.revert && i || !0 === this.options.revert || "function" == typeof this.options.revert && this.options.revert.call(this.element, i) ? V(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                !1 !== e._trigger("stop", t) && e._clear()
            }) : !1 !== this._trigger("stop", t) && this._clear(),
            !1
        },
        _mouseUp: function(t) {
            return this._unblockFrames(),
            V.ui.ddmanager && V.ui.ddmanager.dragStop(this, t),
            this.handleElement.is(t.target) && this.element.trigger("focus"),
            V.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new V.Event("mouseup",{
                target: this.element[0]
            })) : this._clear(),
            this
        },
        _getHandle: function(t) {
            return !this.options.handle || !!V(t.target).closest(this.element.find(this.options.handle)).length
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element,
            this._addClass(this.handleElement, "ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this._removeClass(this.handleElement, "ui-draggable-handle")
        },
        _createHelper: function(t) {
            var e = this.options
              , i = "function" == typeof e.helper
              , t = i ? V(e.helper.apply(this.element[0], [t])) : "clone" === e.helper ? this.element.clone().removeAttr("id") : this.element;
            return t.parents("body").length || t.appendTo("parent" === e.appendTo ? this.element[0].parentNode : e.appendTo),
            i && t[0] === this.element[0] && this._setPositionRelative(),
            t[0] === this.element[0] || /(fixed|absolute)/.test(t.css("position")) || t.css("position", "absolute"),
            t
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")),
            "left"in (t = Array.isArray(t) ? {
                left: +t[0],
                top: +t[1] || 0
            } : t) && (this.offset.click.left = t.left + this.margins.left),
            "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
            "top"in t && (this.offset.click.top = t.top + this.margins.top),
            "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _isRootNode: function(t) {
            return /(html|body)/i.test(t.tagName) || t === this.document[0]
        },
        _getParentOffset: function() {
            var t = this.offsetParent.offset()
              , e = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== e && V.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
            t.top += this.scrollParent.scrollTop()),
            {
                top: (t = this._isRootNode(this.offsetParent[0]) ? {
                    top: 0,
                    left: 0
                } : t).top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition)
                return {
                    top: 0,
                    left: 0
                };
            var t = this.element.position()
              , e = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, e, i, s = this.options, n = this.document[0];
            this.relativeContainer = null,
            s.containment ? "window" !== s.containment ? "document" !== s.containment ? s.containment.constructor !== Array ? ("parent" === s.containment && (s.containment = this.helper[0].parentNode),
            (i = (e = V(s.containment))[0]) && (t = /(scroll|auto)/.test(e.css("overflow")),
            this.containment = [(parseInt(e.css("borderLeftWidth"), 10) || 0) + (parseInt(e.css("paddingLeft"), 10) || 0), (parseInt(e.css("borderTopWidth"), 10) || 0) + (parseInt(e.css("paddingTop"), 10) || 0), (t ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(e.css("borderRightWidth"), 10) || 0) - (parseInt(e.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(e.css("borderBottomWidth"), 10) || 0) - (parseInt(e.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
            this.relativeContainer = e)) : this.containment = s.containment : this.containment = [0, 0, V(n).width() - this.helperProportions.width - this.margins.left, (V(n).height() || n.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = [V(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, V(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, V(window).scrollLeft() + V(window).width() - this.helperProportions.width - this.margins.left, V(window).scrollTop() + (V(window).height() || n.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = null
        },
        _convertPositionTo: function(t, e) {
            e = e || this.position;
            var i = "absolute" === t ? 1 : -1
              , t = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : t ? 0 : this.offset.scroll.top) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : t ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function(t, e) {
            var i, s = this.options, n = this._isRootNode(this.scrollParent[0]), o = t.pageX, a = t.pageY;
            return n && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }),
            e && (this.containment && (i = this.relativeContainer ? (i = this.relativeContainer.offset(),
            [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]) : this.containment,
            t.pageX - this.offset.click.left < i[0] && (o = i[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < i[1] && (a = i[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > i[2] && (o = i[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > i[3] && (a = i[3] + this.offset.click.top)),
            s.grid && (t = s.grid[1] ? this.originalPageY + Math.round((a - this.originalPageY) / s.grid[1]) * s.grid[1] : this.originalPageY,
            a = !i || t - this.offset.click.top >= i[1] || t - this.offset.click.top > i[3] ? t : t - this.offset.click.top >= i[1] ? t - s.grid[1] : t + s.grid[1],
            t = s.grid[0] ? this.originalPageX + Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0] : this.originalPageX,
            o = !i || t - this.offset.click.left >= i[0] || t - this.offset.click.left > i[2] ? t : t - this.offset.click.left >= i[0] ? t - s.grid[0] : t + s.grid[0]),
            "y" === s.axis && (o = this.originalPageX),
            "x" === s.axis && (a = this.originalPageY)),
            {
                top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : n ? 0 : this.offset.scroll.top),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : n ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this._removeClass(this.helper, "ui-draggable-dragging"),
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1,
            this.destroyOnClear && this.destroy()
        },
        _trigger: function(t, e, i) {
            return i = i || this._uiHash(),
            V.ui.plugin.call(this, t, [e, i, this], !0),
            /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"),
            i.offset = this.positionAbs),
            V.Widget.prototype._trigger.call(this, t, e, i)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    V.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, t, i) {
            var s = V.extend({}, t, {
                item: i.element
            });
            i.sortables = [],
            V(i.options.connectToSortable).each(function() {
                var t = V(this).sortable("instance");
                t && !t.options.disabled && (i.sortables.push(t),
                t.refreshPositions(),
                t._trigger("activate", e, s))
            })
        },
        stop: function(e, t, i) {
            var s = V.extend({}, t, {
                item: i.element
            });
            i.cancelHelperRemoval = !1,
            V.each(i.sortables, function() {
                var t = this;
                t.isOver ? (t.isOver = 0,
                i.cancelHelperRemoval = !0,
                t.cancelHelperRemoval = !1,
                t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left")
                },
                t._mouseStop(e),
                t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0,
                t._trigger("deactivate", e, s))
            })
        },
        drag: function(i, s, n) {
            V.each(n.sortables, function() {
                var t = !1
                  , e = this;
                e.positionAbs = n.positionAbs,
                e.helperProportions = n.helperProportions,
                e.offset.click = n.offset.click,
                e._intersectsWith(e.containerCache) && (t = !0,
                V.each(n.sortables, function() {
                    return this.positionAbs = n.positionAbs,
                    this.helperProportions = n.helperProportions,
                    this.offset.click = n.offset.click,
                    t = this !== e && this._intersectsWith(this.containerCache) && V.contains(e.element[0], this.element[0]) ? !1 : t
                })),
                t ? (e.isOver || (e.isOver = 1,
                n._parent = s.helper.parent(),
                e.currentItem = s.helper.appendTo(e.element).data("ui-sortable-item", !0),
                e.options._helper = e.options.helper,
                e.options.helper = function() {
                    return s.helper[0]
                }
                ,
                i.target = e.currentItem[0],
                e._mouseCapture(i, !0),
                e._mouseStart(i, !0, !0),
                e.offset.click.top = n.offset.click.top,
                e.offset.click.left = n.offset.click.left,
                e.offset.parent.left -= n.offset.parent.left - e.offset.parent.left,
                e.offset.parent.top -= n.offset.parent.top - e.offset.parent.top,
                n._trigger("toSortable", i),
                n.dropped = e.element,
                V.each(n.sortables, function() {
                    this.refreshPositions()
                }),
                n.currentItem = n.element,
                e.fromOutside = n),
                e.currentItem && (e._mouseDrag(i),
                s.position = e.position)) : e.isOver && (e.isOver = 0,
                e.cancelHelperRemoval = !0,
                e.options._revert = e.options.revert,
                e.options.revert = !1,
                e._trigger("out", i, e._uiHash(e)),
                e._mouseStop(i, !0),
                e.options.revert = e.options._revert,
                e.options.helper = e.options._helper,
                e.placeholder && e.placeholder.remove(),
                s.helper.appendTo(n._parent),
                n._refreshOffsets(i),
                s.position = n._generatePosition(i, !0),
                n._trigger("fromSortable", i),
                n.dropped = !1,
                V.each(n.sortables, function() {
                    this.refreshPositions()
                }))
            })
        }
    }),
    V.ui.plugin.add("draggable", "cursor", {
        start: function(t, e, i) {
            var s = V("body")
              , i = i.options;
            s.css("cursor") && (i._cursor = s.css("cursor")),
            s.css("cursor", i.cursor)
        },
        stop: function(t, e, i) {
            i = i.options;
            i._cursor && V("body").css("cursor", i._cursor)
        }
    }),
    V.ui.plugin.add("draggable", "opacity", {
        start: function(t, e, i) {
            e = V(e.helper),
            i = i.options;
            e.css("opacity") && (i._opacity = e.css("opacity")),
            e.css("opacity", i.opacity)
        },
        stop: function(t, e, i) {
            i = i.options;
            i._opacity && V(e.helper).css("opacity", i._opacity)
        }
    }),
    V.ui.plugin.add("draggable", "scroll", {
        start: function(t, e, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
            i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
        },
        drag: function(t, e, i) {
            var s = i.options
              , n = !1
              , o = i.scrollParentNotHidden[0]
              , a = i.document[0];
            o !== a && "HTML" !== o.tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + o.offsetHeight - t.pageY < s.scrollSensitivity ? o.scrollTop = n = o.scrollTop + s.scrollSpeed : t.pageY - i.overflowOffset.top < s.scrollSensitivity && (o.scrollTop = n = o.scrollTop - s.scrollSpeed)),
            s.axis && "y" === s.axis || (i.overflowOffset.left + o.offsetWidth - t.pageX < s.scrollSensitivity ? o.scrollLeft = n = o.scrollLeft + s.scrollSpeed : t.pageX - i.overflowOffset.left < s.scrollSensitivity && (o.scrollLeft = n = o.scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (t.pageY - V(a).scrollTop() < s.scrollSensitivity ? n = V(a).scrollTop(V(a).scrollTop() - s.scrollSpeed) : V(window).height() - (t.pageY - V(a).scrollTop()) < s.scrollSensitivity && (n = V(a).scrollTop(V(a).scrollTop() + s.scrollSpeed))),
            s.axis && "y" === s.axis || (t.pageX - V(a).scrollLeft() < s.scrollSensitivity ? n = V(a).scrollLeft(V(a).scrollLeft() - s.scrollSpeed) : V(window).width() - (t.pageX - V(a).scrollLeft()) < s.scrollSensitivity && (n = V(a).scrollLeft(V(a).scrollLeft() + s.scrollSpeed)))),
            !1 !== n && V.ui.ddmanager && !s.dropBehaviour && V.ui.ddmanager.prepareOffsets(i, t)
        }
    }),
    V.ui.plugin.add("draggable", "snap", {
        start: function(t, e, i) {
            var s = i.options;
            i.snapElements = [],
            V(s.snap.constructor !== String ? s.snap.items || ":data(ui-draggable)" : s.snap).each(function() {
                var t = V(this)
                  , e = t.offset();
                this !== i.element[0] && i.snapElements.push({
                    item: this,
                    width: t.outerWidth(),
                    height: t.outerHeight(),
                    top: e.top,
                    left: e.left
                })
            })
        },
        drag: function(t, e, i) {
            for (var s, n, o, a, r, l, h, c, u, d = i.options, p = d.snapTolerance, f = e.offset.left, g = f + i.helperProportions.width, m = e.offset.top, _ = m + i.helperProportions.height, v = i.snapElements.length - 1; 0 <= v; v--)
                l = (r = i.snapElements[v].left - i.margins.left) + i.snapElements[v].width,
                c = (h = i.snapElements[v].top - i.margins.top) + i.snapElements[v].height,
                g < r - p || l + p < f || _ < h - p || c + p < m || !V.contains(i.snapElements[v].item.ownerDocument, i.snapElements[v].item) ? (i.snapElements[v].snapping && i.options.snap.release && i.options.snap.release.call(i.element, t, V.extend(i._uiHash(), {
                    snapItem: i.snapElements[v].item
                })),
                i.snapElements[v].snapping = !1) : ("inner" !== d.snapMode && (s = Math.abs(h - _) <= p,
                n = Math.abs(c - m) <= p,
                o = Math.abs(r - g) <= p,
                a = Math.abs(l - f) <= p,
                s && (e.position.top = i._convertPositionTo("relative", {
                    top: h - i.helperProportions.height,
                    left: 0
                }).top),
                n && (e.position.top = i._convertPositionTo("relative", {
                    top: c,
                    left: 0
                }).top),
                o && (e.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: r - i.helperProportions.width
                }).left),
                a && (e.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left)),
                u = s || n || o || a,
                "outer" !== d.snapMode && (s = Math.abs(h - m) <= p,
                n = Math.abs(c - _) <= p,
                o = Math.abs(r - f) <= p,
                a = Math.abs(l - g) <= p,
                s && (e.position.top = i._convertPositionTo("relative", {
                    top: h,
                    left: 0
                }).top),
                n && (e.position.top = i._convertPositionTo("relative", {
                    top: c - i.helperProportions.height,
                    left: 0
                }).top),
                o && (e.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: r
                }).left),
                a && (e.position.left = i._convertPositionTo("relative", {
                    top: 0,
                    left: l - i.helperProportions.width
                }).left)),
                !i.snapElements[v].snapping && (s || n || o || a || u) && i.options.snap.snap && i.options.snap.snap.call(i.element, t, V.extend(i._uiHash(), {
                    snapItem: i.snapElements[v].item
                })),
                i.snapElements[v].snapping = s || n || o || a || u)
        }
    }),
    V.ui.plugin.add("draggable", "stack", {
        start: function(t, e, i) {
            var s, i = i.options, i = V.makeArray(V(i.stack)).sort(function(t, e) {
                return (parseInt(V(t).css("zIndex"), 10) || 0) - (parseInt(V(e).css("zIndex"), 10) || 0)
            });
            i.length && (s = parseInt(V(i[0]).css("zIndex"), 10) || 0,
            V(i).each(function(t) {
                V(this).css("zIndex", s + t)
            }),
            this.css("zIndex", s + i.length))
        }
    }),
    V.ui.plugin.add("draggable", "zIndex", {
        start: function(t, e, i) {
            e = V(e.helper),
            i = i.options;
            e.css("zIndex") && (i._zIndex = e.css("zIndex")),
            e.css("zIndex", i.zIndex)
        },
        stop: function(t, e, i) {
            i = i.options;
            i._zIndex && V(e.helper).css("zIndex", i._zIndex)
        }
    });
    V.ui.draggable;
    V.widget("ui.resizable", V.ui.mouse, {
        version: "1.13.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {
                "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
            },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(t) {
            return parseFloat(t) || 0
        },
        _isNumber: function(t) {
            return !isNaN(parseFloat(t))
        },
        _hasScroll: function(t, e) {
            if ("hidden" === V(t).css("overflow"))
                return !1;
            var i = e && "left" === e ? "scrollLeft" : "scrollTop"
              , e = !1;
            if (0 < t[i])
                return !0;
            try {
                t[i] = 1,
                e = 0 < t[i],
                t[i] = 0
            } catch (t) {}
            return e
        },
        _create: function() {
            var t, e = this.options, i = this;
            this._addClass("ui-resizable"),
            V.extend(this, {
                _aspectRatio: !!e.aspectRatio,
                aspectRatio: e.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: e.helper || e.ghost || e.animate ? e.helper || "ui-resizable-helper" : null
            }),
            this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(V("<div class='ui-wrapper'></div>").css({
                overflow: "hidden",
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })),
            this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")),
            this.elementIsWrapper = !0,
            t = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft")
            },
            this.element.css(t),
            this.originalElement.css("margin", 0),
            this.originalResizeStyle = this.originalElement.css("resize"),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })),
            this.originalElement.css(t),
            this._proportionallyResize()),
            this._setupHandles(),
            e.autoHide && V(this.element).on("mouseenter", function() {
                e.disabled || (i._removeClass("ui-resizable-autohide"),
                i._handles.show())
            }).on("mouseleave", function() {
                e.disabled || i.resizing || (i._addClass("ui-resizable-autohide"),
                i._handles.hide())
            }),
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy(),
            this._addedHandles.remove();
            function t(t) {
                V(t).removeData("resizable").removeData("ui-resizable").off(".resizable")
            }
            var e;
            return this.elementIsWrapper && (t(this.element),
            e = this.element,
            this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e),
            e.remove()),
            this.originalElement.css("resize", this.originalResizeStyle),
            t(this.originalElement),
            this
        },
        _setOption: function(t, e) {
            switch (this._super(t, e),
            t) {
            case "handles":
                this._removeHandles(),
                this._setupHandles();
                break;
            case "aspectRatio":
                this._aspectRatio = !!e
            }
        },
        _setupHandles: function() {
            var t, e, i, s, n, o = this.options, a = this;
            if (this.handles = o.handles || (V(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"),
            this._handles = V(),
            this._addedHandles = V(),
            this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                i = this.handles.split(","),
                this.handles = {},
                e = 0; e < i.length; e++)
                    s = "ui-resizable-" + (t = String.prototype.trim.call(i[e])),
                    n = V("<div>"),
                    this._addClass(n, "ui-resizable-handle " + s),
                    n.css({
                        zIndex: o.zIndex
                    }),
                    this.handles[t] = ".ui-resizable-" + t,
                    this.element.children(this.handles[t]).length || (this.element.append(n),
                    this._addedHandles = this._addedHandles.add(n));
            this._renderAxis = function(t) {
                var e, i, s;
                for (e in t = t || this.element,
                this.handles)
                    this.handles[e].constructor === String ? this.handles[e] = this.element.children(this.handles[e]).first().show() : (this.handles[e].jquery || this.handles[e].nodeType) && (this.handles[e] = V(this.handles[e]),
                    this._on(this.handles[e], {
                        mousedown: a._mouseDown
                    })),
                    this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (i = V(this.handles[e], this.element),
                    s = /sw|ne|nw|se|n|s/.test(e) ? i.outerHeight() : i.outerWidth(),
                    i = ["padding", /ne|nw|n/.test(e) ? "Top" : /se|sw|s/.test(e) ? "Bottom" : /^e$/.test(e) ? "Right" : "Left"].join(""),
                    t.css(i, s),
                    this._proportionallyResize()),
                    this._handles = this._handles.add(this.handles[e])
            }
            ,
            this._renderAxis(this.element),
            this._handles = this._handles.add(this.element.find(".ui-resizable-handle")),
            this._handles.disableSelection(),
            this._handles.on("mouseover", function() {
                a.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                a.axis = n && n[1] ? n[1] : "se")
            }),
            o.autoHide && (this._handles.hide(),
            this._addClass("ui-resizable-autohide"))
        },
        _removeHandles: function() {
            this._addedHandles.remove()
        },
        _mouseCapture: function(t) {
            var e, i, s = !1;
            for (e in this.handles)
                (i = V(this.handles[e])[0]) !== t.target && !V.contains(i, t.target) || (s = !0);
            return !this.options.disabled && s
        },
        _mouseStart: function(t) {
            var e, i, s = this.options, n = this.element;
            return this.resizing = !0,
            this._renderProxy(),
            e = this._num(this.helper.css("left")),
            i = this._num(this.helper.css("top")),
            s.containment && (e += V(s.containment).scrollLeft() || 0,
            i += V(s.containment).scrollTop() || 0),
            this.offset = this.helper.offset(),
            this.position = {
                left: e,
                top: i
            },
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: n.width(),
                height: n.height()
            },
            this.originalSize = this._helper ? {
                width: n.outerWidth(),
                height: n.outerHeight()
            } : {
                width: n.width(),
                height: n.height()
            },
            this.sizeDiff = {
                width: n.outerWidth() - n.width(),
                height: n.outerHeight() - n.height()
            },
            this.originalPosition = {
                left: e,
                top: i
            },
            this.originalMousePosition = {
                left: t.pageX,
                top: t.pageY
            },
            this.aspectRatio = "number" == typeof s.aspectRatio ? s.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
            s = V(".ui-resizable-" + this.axis).css("cursor"),
            V("body").css("cursor", "auto" === s ? this.axis + "-resize" : s),
            this._addClass("ui-resizable-resizing"),
            this._propagate("start", t),
            !0
        },
        _mouseDrag: function(t) {
            var e = this.originalMousePosition
              , i = this.axis
              , s = t.pageX - e.left || 0
              , e = t.pageY - e.top || 0
              , i = this._change[i];
            return this._updatePrevProperties(),
            i && (e = i.apply(this, [t, s, e]),
            this._updateVirtualBoundaries(t.shiftKey),
            (this._aspectRatio || t.shiftKey) && (e = this._updateRatio(e, t)),
            e = this._respectSize(e, t),
            this._updateCache(e),
            this._propagate("resize", t),
            e = this._applyChanges(),
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
            V.isEmptyObject(e) || (this._updatePrevProperties(),
            this._trigger("resize", t, this.ui()),
            this._applyChanges())),
            !1
        },
        _mouseStop: function(t) {
            this.resizing = !1;
            var e, i, s, n = this.options, o = this;
            return this._helper && (s = (e = (i = this._proportionallyResizeElements).length && /textarea/i.test(i[0].nodeName)) && this._hasScroll(i[0], "left") ? 0 : o.sizeDiff.height,
            i = e ? 0 : o.sizeDiff.width,
            e = {
                width: o.helper.width() - i,
                height: o.helper.height() - s
            },
            i = parseFloat(o.element.css("left")) + (o.position.left - o.originalPosition.left) || null,
            s = parseFloat(o.element.css("top")) + (o.position.top - o.originalPosition.top) || null,
            n.animate || this.element.css(V.extend(e, {
                top: s,
                left: i
            })),
            o.helper.height(o.size.height),
            o.helper.width(o.size.width),
            this._helper && !n.animate && this._proportionallyResize()),
            V("body").css("cursor", "auto"),
            this._removeClass("ui-resizable-resizing"),
            this._propagate("stop", t),
            this._helper && this.helper.remove(),
            !1
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            },
            this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var t = {};
            return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"),
            this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"),
            this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"),
            this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"),
            this.helper.css(t),
            t
        },
        _updateVirtualBoundaries: function(t) {
            var e, i, s = this.options, n = {
                minWidth: this._isNumber(s.minWidth) ? s.minWidth : 0,
                maxWidth: this._isNumber(s.maxWidth) ? s.maxWidth : 1 / 0,
                minHeight: this._isNumber(s.minHeight) ? s.minHeight : 0,
                maxHeight: this._isNumber(s.maxHeight) ? s.maxHeight : 1 / 0
            };
            (this._aspectRatio || t) && (e = n.minHeight * this.aspectRatio,
            i = n.minWidth / this.aspectRatio,
            s = n.maxHeight * this.aspectRatio,
            t = n.maxWidth / this.aspectRatio,
            e > n.minWidth && (n.minWidth = e),
            i > n.minHeight && (n.minHeight = i),
            s < n.maxWidth && (n.maxWidth = s),
            t < n.maxHeight && (n.maxHeight = t)),
            this._vBoundaries = n
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset(),
            this._isNumber(t.left) && (this.position.left = t.left),
            this._isNumber(t.top) && (this.position.top = t.top),
            this._isNumber(t.height) && (this.size.height = t.height),
            this._isNumber(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function(t) {
            var e = this.position
              , i = this.size
              , s = this.axis;
            return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio),
            "sw" === s && (t.left = e.left + (i.width - t.width),
            t.top = null),
            "nw" === s && (t.top = e.top + (i.height - t.height),
            t.left = e.left + (i.width - t.width)),
            t
        },
        _respectSize: function(t) {
            var e = this._vBoundaries
              , i = this.axis
              , s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width
              , n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height
              , o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width
              , a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height
              , r = this.originalPosition.left + this.originalSize.width
              , l = this.originalPosition.top + this.originalSize.height
              , h = /sw|nw|w/.test(i)
              , i = /nw|ne|n/.test(i);
            return o && (t.width = e.minWidth),
            a && (t.height = e.minHeight),
            s && (t.width = e.maxWidth),
            n && (t.height = e.maxHeight),
            o && h && (t.left = r - e.minWidth),
            s && h && (t.left = r - e.maxWidth),
            a && i && (t.top = l - e.minHeight),
            n && i && (t.top = l - e.maxHeight),
            t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null,
            t
        },
        _getPaddingPlusBorderDimensions: function(t) {
            for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; e < 4; e++)
                i[e] = parseFloat(s[e]) || 0,
                i[e] += parseFloat(n[e]) || 0;
            return {
                height: i[0] + i[2],
                width: i[1] + i[3]
            }
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var t, e = 0, i = this.helper || this.element; e < this._proportionallyResizeElements.length; e++)
                    t = this._proportionallyResizeElements[e],
                    this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)),
                    t.css({
                        height: i.height() - this.outerDimensions.height || 0,
                        width: i.width() - this.outerDimensions.width || 0
                    })
        },
        _renderProxy: function() {
            var t = this.element
              , e = this.options;
            this.elementOffset = t.offset(),
            this._helper ? (this.helper = this.helper || V("<div></div>").css({
                overflow: "hidden"
            }),
            this._addClass(this.helper, this._helper),
            this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++e.zIndex
            }),
            this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(t, e) {
                return {
                    width: this.originalSize.width + e
                }
            },
            w: function(t, e) {
                var i = this.originalSize;
                return {
                    left: this.originalPosition.left + e,
                    width: i.width - e
                }
            },
            n: function(t, e, i) {
                var s = this.originalSize;
                return {
                    top: this.originalPosition.top + i,
                    height: s.height - i
                }
            },
            s: function(t, e, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(t, e, i) {
                return V.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, e, i]))
            },
            sw: function(t, e, i) {
                return V.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, e, i]))
            },
            ne: function(t, e, i) {
                return V.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, e, i]))
            },
            nw: function(t, e, i) {
                return V.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, e, i]))
            }
        },
        _propagate: function(t, e) {
            V.ui.plugin.call(this, t, [e, this.ui()]),
            "resize" !== t && this._trigger(t, e, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }),
    V.ui.plugin.add("resizable", "animate", {
        stop: function(e) {
            var i = V(this).resizable("instance")
              , t = i.options
              , s = i._proportionallyResizeElements
              , n = s.length && /textarea/i.test(s[0].nodeName)
              , o = n && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height
              , a = n ? 0 : i.sizeDiff.width
              , n = {
                width: i.size.width - a,
                height: i.size.height - o
            }
              , a = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null
              , o = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(V.extend(n, o && a ? {
                top: o,
                left: a
            } : {}), {
                duration: t.animateDuration,
                easing: t.animateEasing,
                step: function() {
                    var t = {
                        width: parseFloat(i.element.css("width")),
                        height: parseFloat(i.element.css("height")),
                        top: parseFloat(i.element.css("top")),
                        left: parseFloat(i.element.css("left"))
                    };
                    s && s.length && V(s[0]).css({
                        width: t.width,
                        height: t.height
                    }),
                    i._updateCache(t),
                    i._propagate("resize", e)
                }
            })
        }
    }),
    V.ui.plugin.add("resizable", "containment", {
        start: function() {
            var i, s, n = V(this).resizable("instance"), t = n.options, e = n.element, o = t.containment, a = o instanceof V ? o.get(0) : /parent/.test(o) ? e.parent().get(0) : o;
            a && (n.containerElement = V(a),
            /document/.test(o) || o === document ? (n.containerOffset = {
                left: 0,
                top: 0
            },
            n.containerPosition = {
                left: 0,
                top: 0
            },
            n.parentData = {
                element: V(document),
                left: 0,
                top: 0,
                width: V(document).width(),
                height: V(document).height() || document.body.parentNode.scrollHeight
            }) : (i = V(a),
            s = [],
            V(["Top", "Right", "Left", "Bottom"]).each(function(t, e) {
                s[t] = n._num(i.css("padding" + e))
            }),
            n.containerOffset = i.offset(),
            n.containerPosition = i.position(),
            n.containerSize = {
                height: i.innerHeight() - s[3],
                width: i.innerWidth() - s[1]
            },
            t = n.containerOffset,
            e = n.containerSize.height,
            o = n.containerSize.width,
            o = n._hasScroll(a, "left") ? a.scrollWidth : o,
            e = n._hasScroll(a) ? a.scrollHeight : e,
            n.parentData = {
                element: a,
                left: t.left,
                top: t.top,
                width: o,
                height: e
            }))
        },
        resize: function(t) {
            var e = V(this).resizable("instance")
              , i = e.options
              , s = e.containerOffset
              , n = e.position
              , o = e._aspectRatio || t.shiftKey
              , a = {
                top: 0,
                left: 0
            }
              , r = e.containerElement
              , t = !0;
            r[0] !== document && /static/.test(r.css("position")) && (a = s),
            n.left < (e._helper ? s.left : 0) && (e.size.width = e.size.width + (e._helper ? e.position.left - s.left : e.position.left - a.left),
            o && (e.size.height = e.size.width / e.aspectRatio,
            t = !1),
            e.position.left = i.helper ? s.left : 0),
            n.top < (e._helper ? s.top : 0) && (e.size.height = e.size.height + (e._helper ? e.position.top - s.top : e.position.top),
            o && (e.size.width = e.size.height * e.aspectRatio,
            t = !1),
            e.position.top = e._helper ? s.top : 0),
            i = e.containerElement.get(0) === e.element.parent().get(0),
            n = /relative|absolute/.test(e.containerElement.css("position")),
            i && n ? (e.offset.left = e.parentData.left + e.position.left,
            e.offset.top = e.parentData.top + e.position.top) : (e.offset.left = e.element.offset().left,
            e.offset.top = e.element.offset().top),
            n = Math.abs(e.sizeDiff.width + (e._helper ? e.offset.left - a.left : e.offset.left - s.left)),
            s = Math.abs(e.sizeDiff.height + (e._helper ? e.offset.top - a.top : e.offset.top - s.top)),
            n + e.size.width >= e.parentData.width && (e.size.width = e.parentData.width - n,
            o && (e.size.height = e.size.width / e.aspectRatio,
            t = !1)),
            s + e.size.height >= e.parentData.height && (e.size.height = e.parentData.height - s,
            o && (e.size.width = e.size.height * e.aspectRatio,
            t = !1)),
            t || (e.position.left = e.prevPosition.left,
            e.position.top = e.prevPosition.top,
            e.size.width = e.prevSize.width,
            e.size.height = e.prevSize.height)
        },
        stop: function() {
            var t = V(this).resizable("instance")
              , e = t.options
              , i = t.containerOffset
              , s = t.containerPosition
              , n = t.containerElement
              , o = V(t.helper)
              , a = o.offset()
              , r = o.outerWidth() - t.sizeDiff.width
              , o = o.outerHeight() - t.sizeDiff.height;
            t._helper && !e.animate && /relative/.test(n.css("position")) && V(this).css({
                left: a.left - s.left - i.left,
                width: r,
                height: o
            }),
            t._helper && !e.animate && /static/.test(n.css("position")) && V(this).css({
                left: a.left - s.left - i.left,
                width: r,
                height: o
            })
        }
    }),
    V.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var t = V(this).resizable("instance").options;
            V(t.alsoResize).each(function() {
                var t = V(this);
                t.data("ui-resizable-alsoresize", {
                    width: parseFloat(t.width()),
                    height: parseFloat(t.height()),
                    left: parseFloat(t.css("left")),
                    top: parseFloat(t.css("top"))
                })
            })
        },
        resize: function(t, i) {
            var e = V(this).resizable("instance")
              , s = e.options
              , n = e.originalSize
              , o = e.originalPosition
              , a = {
                height: e.size.height - n.height || 0,
                width: e.size.width - n.width || 0,
                top: e.position.top - o.top || 0,
                left: e.position.left - o.left || 0
            };
            V(s.alsoResize).each(function() {
                var t = V(this)
                  , s = V(this).data("ui-resizable-alsoresize")
                  , n = {}
                  , e = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                V.each(e, function(t, e) {
                    var i = (s[e] || 0) + (a[e] || 0);
                    i && 0 <= i && (n[e] = i || null)
                }),
                t.css(n)
            })
        },
        stop: function() {
            V(this).removeData("ui-resizable-alsoresize")
        }
    }),
    V.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var t = V(this).resizable("instance")
              , e = t.size;
            t.ghost = t.originalElement.clone(),
            t.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: e.height,
                width: e.width,
                margin: 0,
                left: 0,
                top: 0
            }),
            t._addClass(t.ghost, "ui-resizable-ghost"),
            !1 !== V.uiBackCompat && "string" == typeof t.options.ghost && t.ghost.addClass(this.options.ghost),
            t.ghost.appendTo(t.helper)
        },
        resize: function() {
            var t = V(this).resizable("instance");
            t.ghost && t.ghost.css({
                position: "relative",
                height: t.size.height,
                width: t.size.width
            })
        },
        stop: function() {
            var t = V(this).resizable("instance");
            t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
        }
    }),
    V.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var t, e = V(this).resizable("instance"), i = e.options, s = e.size, n = e.originalSize, o = e.originalPosition, a = e.axis, r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid, l = r[0] || 1, h = r[1] || 1, c = Math.round((s.width - n.width) / l) * l, u = Math.round((s.height - n.height) / h) * h, d = n.width + c, p = n.height + u, f = i.maxWidth && i.maxWidth < d, g = i.maxHeight && i.maxHeight < p, m = i.minWidth && i.minWidth > d, s = i.minHeight && i.minHeight > p;
            i.grid = r,
            m && (d += l),
            s && (p += h),
            f && (d -= l),
            g && (p -= h),
            /^(se|s|e)$/.test(a) ? (e.size.width = d,
            e.size.height = p) : /^(ne)$/.test(a) ? (e.size.width = d,
            e.size.height = p,
            e.position.top = o.top - u) : /^(sw)$/.test(a) ? (e.size.width = d,
            e.size.height = p,
            e.position.left = o.left - c) : ((p - h <= 0 || d - l <= 0) && (t = e._getPaddingPlusBorderDimensions(this)),
            0 < p - h ? (e.size.height = p,
            e.position.top = o.top - u) : (p = h - t.height,
            e.size.height = p,
            e.position.top = o.top + n.height - p),
            0 < d - l ? (e.size.width = d,
            e.position.left = o.left - c) : (d = l - t.width,
            e.size.width = d,
            e.position.left = o.left + n.width - d))
        }
    });
    V.ui.resizable;
    V.widget("ui.dialog", {
        version: "1.13.1",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            classes: {
                "ui-dialog": "ui-corner-all",
                "ui-dialog-titlebar": "ui-corner-all"
            },
            closeOnEscape: !0,
            closeText: "Close",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(t) {
                    var e = V(this).css(t).offset().top;
                    e < 0 && V(this).css("top", t.top - e)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            },
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            },
            this.originalTitle = this.element.attr("title"),
            null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle),
            this.options.disabled && (this.options.disabled = !1),
            this._createWrapper(),
            this.element.show().removeAttr("title").appendTo(this.uiDialog),
            this._addClass("ui-dialog-content", "ui-widget-content"),
            this._createTitlebar(),
            this._createButtonPane(),
            this.options.draggable && V.fn.draggable && this._makeDraggable(),
            this.options.resizable && V.fn.resizable && this._makeResizable(),
            this._isOpen = !1,
            this._trackFocus()
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t.jquery || t.nodeType) ? V(t) : this.document.find(t || "body").eq(0)
        },
        _destroy: function() {
            var t, e = this.originalPosition;
            this._untrackInstance(),
            this._destroyOverlay(),
            this.element.removeUniqueId().css(this.originalCss).detach(),
            this.uiDialog.remove(),
            this.originalTitle && this.element.attr("title", this.originalTitle),
            (t = e.parent.children().eq(e.index)).length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: V.noop,
        enable: V.noop,
        close: function(t) {
            var e = this;
            this._isOpen && !1 !== this._trigger("beforeClose", t) && (this._isOpen = !1,
            this._focusedElement = null,
            this._destroyOverlay(),
            this._untrackInstance(),
            this.opener.filter(":focusable").trigger("focus").length || V.ui.safeBlur(V.ui.safeActiveElement(this.document[0])),
            this._hide(this.uiDialog, this.options.hide, function() {
                e._trigger("close", t)
            }))
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(t, e) {
            var i = !1
              , s = this.uiDialog.siblings(".ui-front:visible").map(function() {
                return +V(this).css("z-index")
            }).get()
              , s = Math.max.apply(null, s);
            return s >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", s + 1),
            i = !0),
            i && !e && this._trigger("focus", t),
            i
        },
        open: function() {
            var t = this;
            this._isOpen ? this._moveToTop() && this._focusTabbable() : (this._isOpen = !0,
            this.opener = V(V.ui.safeActiveElement(this.document[0])),
            this._size(),
            this._position(),
            this._createOverlay(),
            this._moveToTop(null, !0),
            this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
            this._show(this.uiDialog, this.options.show, function() {
                t._focusTabbable(),
                t._trigger("focus")
            }),
            this._makeFocusTarget(),
            this._trigger("open"))
        },
        _focusTabbable: function() {
            var t = this._focusedElement;
            (t = !(t = !(t = !(t = !(t = t || this.element.find("[autofocus]")).length ? this.element.find(":tabbable") : t).length ? this.uiDialogButtonPane.find(":tabbable") : t).length ? this.uiDialogTitlebarClose.filter(":tabbable") : t).length ? this.uiDialog : t).eq(0).trigger("focus")
        },
        _restoreTabbableFocus: function() {
            var t = V.ui.safeActiveElement(this.document[0]);
            this.uiDialog[0] === t || V.contains(this.uiDialog[0], t) || this._focusTabbable()
        },
        _keepFocus: function(t) {
            t.preventDefault(),
            this._restoreTabbableFocus(),
            this._delay(this._restoreTabbableFocus)
        },
        _createWrapper: function() {
            this.uiDialog = V("<div>").hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()),
            this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"),
            this._on(this.uiDialog, {
                keydown: function(t) {
                    if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === V.ui.keyCode.ESCAPE)
                        return t.preventDefault(),
                        void this.close(t);
                    var e, i, s;
                    t.keyCode !== V.ui.keyCode.TAB || t.isDefaultPrevented() || (e = this.uiDialog.find(":tabbable"),
                    i = e.first(),
                    s = e.last(),
                    t.target !== s[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== i[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay(function() {
                        s.trigger("focus")
                    }),
                    t.preventDefault()) : (this._delay(function() {
                        i.trigger("focus")
                    }),
                    t.preventDefault()))
                },
                mousedown: function(t) {
                    this._moveToTop(t) && this._focusTabbable()
                }
            }),
            this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var t;
            this.uiDialogTitlebar = V("<div>"),
            this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"),
            this._on(this.uiDialogTitlebar, {
                mousedown: function(t) {
                    V(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
                }
            }),
            this.uiDialogTitlebarClose = V("<button type='button'></button>").button({
                label: V("<a>").text(this.options.closeText).html(),
                icon: "ui-icon-closethick",
                showLabel: !1
            }).appendTo(this.uiDialogTitlebar),
            this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"),
            this._on(this.uiDialogTitlebarClose, {
                click: function(t) {
                    t.preventDefault(),
                    this.close(t)
                }
            }),
            t = V("<span>").uniqueId().prependTo(this.uiDialogTitlebar),
            this._addClass(t, "ui-dialog-title"),
            this._title(t),
            this.uiDialogTitlebar.prependTo(this.uiDialog),
            this.uiDialog.attr({
                "aria-labelledby": t.attr("id")
            })
        },
        _title: function(t) {
            this.options.title ? t.text(this.options.title) : t.html("&#160;")
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = V("<div>"),
            this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"),
            this.uiButtonSet = V("<div>").appendTo(this.uiDialogButtonPane),
            this._addClass(this.uiButtonSet, "ui-dialog-buttonset"),
            this._createButtons()
        },
        _createButtons: function() {
            var s = this
              , t = this.options.buttons;
            this.uiDialogButtonPane.remove(),
            this.uiButtonSet.empty(),
            V.isEmptyObject(t) || Array.isArray(t) && !t.length ? this._removeClass(this.uiDialog, "ui-dialog-buttons") : (V.each(t, function(t, e) {
                var i;
                e = V.extend({
                    type: "button"
                }, e = "function" == typeof e ? {
                    click: e,
                    text: t
                } : e),
                i = e.click,
                t = {
                    icon: e.icon,
                    iconPosition: e.iconPosition,
                    showLabel: e.showLabel,
                    icons: e.icons,
                    text: e.text
                },
                delete e.click,
                delete e.icon,
                delete e.iconPosition,
                delete e.showLabel,
                delete e.icons,
                "boolean" == typeof e.text && delete e.text,
                V("<button></button>", e).button(t).appendTo(s.uiButtonSet).on("click", function() {
                    i.apply(s.element[0], arguments)
                })
            }),
            this._addClass(this.uiDialog, "ui-dialog-buttons"),
            this.uiDialogButtonPane.appendTo(this.uiDialog))
        },
        _makeDraggable: function() {
            var n = this
              , o = this.options;
            function a(t) {
                return {
                    position: t.position,
                    offset: t.offset
                }
            }
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(t, e) {
                    n._addClass(V(this), "ui-dialog-dragging"),
                    n._blockFrames(),
                    n._trigger("dragStart", t, a(e))
                },
                drag: function(t, e) {
                    n._trigger("drag", t, a(e))
                },
                stop: function(t, e) {
                    var i = e.offset.left - n.document.scrollLeft()
                      , s = e.offset.top - n.document.scrollTop();
                    o.position = {
                        my: "left top",
                        at: "left" + (0 <= i ? "+" : "") + i + " top" + (0 <= s ? "+" : "") + s,
                        of: n.window
                    },
                    n._removeClass(V(this), "ui-dialog-dragging"),
                    n._unblockFrames(),
                    n._trigger("dragStop", t, a(e))
                }
            })
        },
        _makeResizable: function() {
            var n = this
              , o = this.options
              , t = o.resizable
              , e = this.uiDialog.css("position")
              , t = "string" == typeof t ? t : "n,e,s,w,se,sw,ne,nw";
            function a(t) {
                return {
                    originalPosition: t.originalPosition,
                    originalSize: t.originalSize,
                    position: t.position,
                    size: t.size
                }
            }
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: o.maxWidth,
                maxHeight: o.maxHeight,
                minWidth: o.minWidth,
                minHeight: this._minHeight(),
                handles: t,
                start: function(t, e) {
                    n._addClass(V(this), "ui-dialog-resizing"),
                    n._blockFrames(),
                    n._trigger("resizeStart", t, a(e))
                },
                resize: function(t, e) {
                    n._trigger("resize", t, a(e))
                },
                stop: function(t, e) {
                    var i = n.uiDialog.offset()
                      , s = i.left - n.document.scrollLeft()
                      , i = i.top - n.document.scrollTop();
                    o.height = n.uiDialog.height(),
                    o.width = n.uiDialog.width(),
                    o.position = {
                        my: "left top",
                        at: "left" + (0 <= s ? "+" : "") + s + " top" + (0 <= i ? "+" : "") + i,
                        of: n.window
                    },
                    n._removeClass(V(this), "ui-dialog-resizing"),
                    n._unblockFrames(),
                    n._trigger("resizeStop", t, a(e))
                }
            }).css("position", e)
        },
        _trackFocus: function() {
            this._on(this.widget(), {
                focusin: function(t) {
                    this._makeFocusTarget(),
                    this._focusedElement = V(t.target)
                }
            })
        },
        _makeFocusTarget: function() {
            this._untrackInstance(),
            this._trackingInstances().unshift(this)
        },
        _untrackInstance: function() {
            var t = this._trackingInstances()
              , e = V.inArray(this, t);
            -1 !== e && t.splice(e, 1)
        },
        _trackingInstances: function() {
            var t = this.document.data("ui-dialog-instances");
            return t || this.document.data("ui-dialog-instances", t = []),
            t
        },
        _minHeight: function() {
            var t = this.options;
            return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
        },
        _position: function() {
            var t = this.uiDialog.is(":visible");
            t || this.uiDialog.show(),
            this.uiDialog.position(this.options.position),
            t || this.uiDialog.hide()
        },
        _setOptions: function(t) {
            var i = this
              , s = !1
              , n = {};
            V.each(t, function(t, e) {
                i._setOption(t, e),
                t in i.sizeRelatedOptions && (s = !0),
                t in i.resizableRelatedOptions && (n[t] = e)
            }),
            s && (this._size(),
            this._position()),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n)
        },
        _setOption: function(t, e) {
            var i, s = this.uiDialog;
            "disabled" !== t && (this._super(t, e),
            "appendTo" === t && this.uiDialog.appendTo(this._appendTo()),
            "buttons" === t && this._createButtons(),
            "closeText" === t && this.uiDialogTitlebarClose.button({
                label: V("<a>").text("" + this.options.closeText).html()
            }),
            "draggable" === t && ((i = s.is(":data(ui-draggable)")) && !e && s.draggable("destroy"),
            !i && e && this._makeDraggable()),
            "position" === t && this._position(),
            "resizable" === t && ((i = s.is(":data(ui-resizable)")) && !e && s.resizable("destroy"),
            i && "string" == typeof e && s.resizable("option", "handles", e),
            i || !1 === e || this._makeResizable()),
            "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var t, e, i, s = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }),
            s.minWidth > s.width && (s.width = s.minWidth),
            t = this.uiDialog.css({
                height: "auto",
                width: s.width
            }).outerHeight(),
            e = Math.max(0, s.minHeight - t),
            i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none",
            "auto" === s.height ? this.element.css({
                minHeight: e,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, s.height - t)),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var t = V(this);
                return V("<div>").css({
                    position: "absolute",
                    width: t.outerWidth(),
                    height: t.outerHeight()
                }).appendTo(t.parent()).offset(t.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _allowInteraction: function(t) {
            return !!V(t.target).closest(".ui-dialog").length || !!V(t.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            var i, s;
            this.options.modal && (i = V.fn.jquery.substring(0, 4),
            s = !0,
            this._delay(function() {
                s = !1
            }),
            this.document.data("ui-dialog-overlays") || this.document.on("focusin.ui-dialog", function(t) {
                var e;
                s || ((e = this._trackingInstances()[0])._allowInteraction(t) || (t.preventDefault(),
                e._focusTabbable(),
                "3.4." !== i && "3.5." !== i || e._delay(e._restoreTabbableFocus)))
            }
            .bind(this)),
            this.overlay = V("<div>").appendTo(this._appendTo()),
            this._addClass(this.overlay, null, "ui-widget-overlay ui-front"),
            this._on(this.overlay, {
                mousedown: "_keepFocus"
            }),
            this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1))
        },
        _destroyOverlay: function() {
            var t;
            this.options.modal && this.overlay && ((t = this.document.data("ui-dialog-overlays") - 1) ? this.document.data("ui-dialog-overlays", t) : (this.document.off("focusin.ui-dialog"),
            this.document.removeData("ui-dialog-overlays")),
            this.overlay.remove(),
            this.overlay = null)
        }
    }),
    !1 !== V.uiBackCompat && V.widget("ui.dialog", V.ui.dialog, {
        options: {
            dialogClass: ""
        },
        _createWrapper: function() {
            this._super(),
            this.uiDialog.addClass(this.options.dialogClass)
        },
        _setOption: function(t, e) {
            "dialogClass" === t && this.uiDialog.removeClass(this.options.dialogClass).addClass(e),
            this._superApply(arguments)
        }
    });
    V.ui.dialog;
    function lt(t, e, i) {
        return e <= t && t < e + i
    }
    V.widget("ui.droppable", {
        version: "1.13.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var t, e = this.options, i = e.accept;
            this.isover = !1,
            this.isout = !0,
            this.accept = "function" == typeof i ? i : function(t) {
                return t.is(i)
            }
            ,
            this.proportions = function() {
                if (!arguments.length)
                    return t = t || {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    };
                t = arguments[0]
            }
            ,
            this._addToManager(e.scope),
            e.addClasses && this._addClass("ui-droppable")
        },
        _addToManager: function(t) {
            V.ui.ddmanager.droppables[t] = V.ui.ddmanager.droppables[t] || [],
            V.ui.ddmanager.droppables[t].push(this)
        },
        _splice: function(t) {
            for (var e = 0; e < t.length; e++)
                t[e] === this && t.splice(e, 1)
        },
        _destroy: function() {
            var t = V.ui.ddmanager.droppables[this.options.scope];
            this._splice(t)
        },
        _setOption: function(t, e) {
            var i;
            "accept" === t ? this.accept = "function" == typeof e ? e : function(t) {
                return t.is(e)
            }
            : "scope" === t && (i = V.ui.ddmanager.droppables[this.options.scope],
            this._splice(i),
            this._addToManager(e)),
            this._super(t, e)
        },
        _activate: function(t) {
            var e = V.ui.ddmanager.current;
            this._addActiveClass(),
            e && this._trigger("activate", t, this.ui(e))
        },
        _deactivate: function(t) {
            var e = V.ui.ddmanager.current;
            this._removeActiveClass(),
            e && this._trigger("deactivate", t, this.ui(e))
        },
        _over: function(t) {
            var e = V.ui.ddmanager.current;
            e && (e.currentItem || e.element)[0] !== this.element[0] && this.accept.call(this.element[0], e.currentItem || e.element) && (this._addHoverClass(),
            this._trigger("over", t, this.ui(e)))
        },
        _out: function(t) {
            var e = V.ui.ddmanager.current;
            e && (e.currentItem || e.element)[0] !== this.element[0] && this.accept.call(this.element[0], e.currentItem || e.element) && (this._removeHoverClass(),
            this._trigger("out", t, this.ui(e)))
        },
        _drop: function(e, t) {
            var i = t || V.ui.ddmanager.current
              , s = !1;
            return !(!i || (i.currentItem || i.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var t = V(this).droppable("instance");
                if (t.options.greedy && !t.options.disabled && t.options.scope === i.options.scope && t.accept.call(t.element[0], i.currentItem || i.element) && V.ui.intersect(i, V.extend(t, {
                    offset: t.element.offset()
                }), t.options.tolerance, e))
                    return !(s = !0)
            }),
            !s && (!!this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeActiveClass(),
            this._removeHoverClass(),
            this._trigger("drop", e, this.ui(i)),
            this.element)))
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        },
        _addHoverClass: function() {
            this._addClass("ui-droppable-hover")
        },
        _removeHoverClass: function() {
            this._removeClass("ui-droppable-hover")
        },
        _addActiveClass: function() {
            this._addClass("ui-droppable-active")
        },
        _removeActiveClass: function() {
            this._removeClass("ui-droppable-active")
        }
    }),
    V.ui.intersect = function(t, e, i, s) {
        if (!e.offset)
            return !1;
        var n = (t.positionAbs || t.position.absolute).left + t.margins.left
          , o = (t.positionAbs || t.position.absolute).top + t.margins.top
          , a = n + t.helperProportions.width
          , r = o + t.helperProportions.height
          , l = e.offset.left
          , h = e.offset.top
          , c = l + e.proportions().width
          , u = h + e.proportions().height;
        switch (i) {
        case "fit":
            return l <= n && a <= c && h <= o && r <= u;
        case "intersect":
            return l < n + t.helperProportions.width / 2 && a - t.helperProportions.width / 2 < c && h < o + t.helperProportions.height / 2 && r - t.helperProportions.height / 2 < u;
        case "pointer":
            return lt(s.pageY, h, e.proportions().height) && lt(s.pageX, l, e.proportions().width);
        case "touch":
            return (h <= o && o <= u || h <= r && r <= u || o < h && u < r) && (l <= n && n <= c || l <= a && a <= c || n < l && c < a);
        default:
            return !1
        }
    }
    ,
    !(V.ui.ddmanager = {
        current: null,
        droppables: {
            default: []
        },
        prepareOffsets: function(t, e) {
            var i, s, n = V.ui.ddmanager.droppables[t.options.scope] || [], o = e ? e.type : null, a = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            t: for (i = 0; i < n.length; i++)
                if (!(n[i].options.disabled || t && !n[i].accept.call(n[i].element[0], t.currentItem || t.element))) {
                    for (s = 0; s < a.length; s++)
                        if (a[s] === n[i].element[0]) {
                            n[i].proportions().height = 0;
                            continue t
                        }
                    n[i].visible = "none" !== n[i].element.css("display"),
                    n[i].visible && ("mousedown" === o && n[i]._activate.call(n[i], e),
                    n[i].offset = n[i].element.offset(),
                    n[i].proportions({
                        width: n[i].element[0].offsetWidth,
                        height: n[i].element[0].offsetHeight
                    }))
                }
        },
        drop: function(t, e) {
            var i = !1;
            return V.each((V.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && V.ui.intersect(t, this, this.options.tolerance, e) && (i = this._drop.call(this, e) || i),
                !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0,
                this.isover = !1,
                this._deactivate.call(this, e)))
            }),
            i
        },
        dragStart: function(t, e) {
            t.element.parentsUntil("body").on("scroll.droppable", function() {
                t.options.refreshPositions || V.ui.ddmanager.prepareOffsets(t, e)
            })
        },
        drag: function(n, o) {
            n.options.refreshPositions && V.ui.ddmanager.prepareOffsets(n, o),
            V.each(V.ui.ddmanager.droppables[n.options.scope] || [], function() {
                var t, e, i, s;
                this.options.disabled || this.greedyChild || !this.visible || (s = !(i = V.ui.intersect(n, this, this.options.tolerance, o)) && this.isover ? "isout" : i && !this.isover ? "isover" : null) && (this.options.greedy && (e = this.options.scope,
                (i = this.element.parents(":data(ui-droppable)").filter(function() {
                    return V(this).droppable("instance").options.scope === e
                })).length && ((t = V(i[0]).droppable("instance")).greedyChild = "isover" === s)),
                t && "isover" === s && (t.isover = !1,
                t.isout = !0,
                t._out.call(t, o)),
                this[s] = !0,
                this["isout" === s ? "isover" : "isout"] = !1,
                this["isover" === s ? "_over" : "_out"].call(this, o),
                t && "isout" === s && (t.isout = !1,
                t.isover = !0,
                t._over.call(t, o)))
            })
        },
        dragStop: function(t, e) {
            t.element.parentsUntil("body").off("scroll.droppable"),
            t.options.refreshPositions || V.ui.ddmanager.prepareOffsets(t, e)
        }
    }) !== V.uiBackCompat && V.widget("ui.droppable", V.ui.droppable, {
        options: {
            hoverClass: !1,
            activeClass: !1
        },
        _addActiveClass: function() {
            this._super(),
            this.options.activeClass && this.element.addClass(this.options.activeClass)
        },
        _removeActiveClass: function() {
            this._super(),
            this.options.activeClass && this.element.removeClass(this.options.activeClass)
        },
        _addHoverClass: function() {
            this._super(),
            this.options.hoverClass && this.element.addClass(this.options.hoverClass)
        },
        _removeHoverClass: function() {
            this._super(),
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
        }
    });
    V.ui.droppable,
    V.widget("ui.progressbar", {
        version: "1.13.1",
        options: {
            classes: {
                "ui-progressbar": "ui-corner-all",
                "ui-progressbar-value": "ui-corner-left",
                "ui-progressbar-complete": "ui-corner-right"
            },
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue(),
            this.element.attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }),
            this._addClass("ui-progressbar", "ui-widget ui-widget-content"),
            this.valueDiv = V("<div>").appendTo(this.element),
            this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header"),
            this._refreshValue()
        },
        _destroy: function() {
            this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"),
            this.valueDiv.remove()
        },
        value: function(t) {
            if (void 0 === t)
                return this.options.value;
            this.options.value = this._constrainedValue(t),
            this._refreshValue()
        },
        _constrainedValue: function(t) {
            return void 0 === t && (t = this.options.value),
            this.indeterminate = !1 === t,
            "number" != typeof t && (t = 0),
            !this.indeterminate && Math.min(this.options.max, Math.max(this.min, t))
        },
        _setOptions: function(t) {
            var e = t.value;
            delete t.value,
            this._super(t),
            this.options.value = this._constrainedValue(e),
            this._refreshValue()
        },
        _setOption: function(t, e) {
            "max" === t && (e = Math.max(this.min, e)),
            this._super(t, e)
        },
        _setOptionDisabled: function(t) {
            this._super(t),
            this.element.attr("aria-disabled", t),
            this._toggleClass(null, "ui-state-disabled", !!t)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var t = this.options.value
              , e = this._percentage();
            this.valueDiv.toggle(this.indeterminate || t > this.min).width(e.toFixed(0) + "%"),
            this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, t === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate),
            this.indeterminate ? (this.element.removeAttr("aria-valuenow"),
            this.overlayDiv || (this.overlayDiv = V("<div>").appendTo(this.valueDiv),
            this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": t
            }),
            this.overlayDiv && (this.overlayDiv.remove(),
            this.overlayDiv = null)),
            this.oldValue !== t && (this.oldValue = t,
            this._trigger("change")),
            t === this.options.max && this._trigger("complete")
        }
    }),
    V.widget("ui.selectable", V.ui.mouse, {
        version: "1.13.1",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var i = this;
            this._addClass("ui-selectable"),
            this.dragged = !1,
            this.refresh = function() {
                i.elementPos = V(i.element[0]).offset(),
                i.selectees = V(i.options.filter, i.element[0]),
                i._addClass(i.selectees, "ui-selectee"),
                i.selectees.each(function() {
                    var t = V(this)
                      , e = t.offset()
                      , e = {
                        left: e.left - i.elementPos.left,
                        top: e.top - i.elementPos.top
                    };
                    V.data(this, "selectable-item", {
                        element: this,
                        $element: t,
                        left: e.left,
                        top: e.top,
                        right: e.left + t.outerWidth(),
                        bottom: e.top + t.outerHeight(),
                        startselected: !1,
                        selected: t.hasClass("ui-selected"),
                        selecting: t.hasClass("ui-selecting"),
                        unselecting: t.hasClass("ui-unselecting")
                    })
                })
            }
            ,
            this.refresh(),
            this._mouseInit(),
            this.helper = V("<div>"),
            this._addClass(this.helper, "ui-selectable-helper")
        },
        _destroy: function() {
            this.selectees.removeData("selectable-item"),
            this._mouseDestroy()
        },
        _mouseStart: function(i) {
            var s = this
              , t = this.options;
            this.opos = [i.pageX, i.pageY],
            this.elementPos = V(this.element[0]).offset(),
            this.options.disabled || (this.selectees = V(t.filter, this.element[0]),
            this._trigger("start", i),
            V(t.appendTo).append(this.helper),
            this.helper.css({
                left: i.pageX,
                top: i.pageY,
                width: 0,
                height: 0
            }),
            t.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function() {
                var t = V.data(this, "selectable-item");
                t.startselected = !0,
                i.metaKey || i.ctrlKey || (s._removeClass(t.$element, "ui-selected"),
                t.selected = !1,
                s._addClass(t.$element, "ui-unselecting"),
                t.unselecting = !0,
                s._trigger("unselecting", i, {
                    unselecting: t.element
                }))
            }),
            V(i.target).parents().addBack().each(function() {
                var t, e = V.data(this, "selectable-item");
                if (e)
                    return t = !i.metaKey && !i.ctrlKey || !e.$element.hasClass("ui-selected"),
                    s._removeClass(e.$element, t ? "ui-unselecting" : "ui-selected")._addClass(e.$element, t ? "ui-selecting" : "ui-unselecting"),
                    e.unselecting = !t,
                    e.selecting = t,
                    (e.selected = t) ? s._trigger("selecting", i, {
                        selecting: e.element
                    }) : s._trigger("unselecting", i, {
                        unselecting: e.element
                    }),
                    !1
            }))
        },
        _mouseDrag: function(s) {
            if (this.dragged = !0,
            !this.options.disabled) {
                var t, n = this, o = this.options, a = this.opos[0], r = this.opos[1], l = s.pageX, h = s.pageY;
                return l < a && (t = l,
                l = a,
                a = t),
                h < r && (t = h,
                h = r,
                r = t),
                this.helper.css({
                    left: a,
                    top: r,
                    width: l - a,
                    height: h - r
                }),
                this.selectees.each(function() {
                    var t = V.data(this, "selectable-item")
                      , e = !1
                      , i = {};
                    t && t.element !== n.element[0] && (i.left = t.left + n.elementPos.left,
                    i.right = t.right + n.elementPos.left,
                    i.top = t.top + n.elementPos.top,
                    i.bottom = t.bottom + n.elementPos.top,
                    "touch" === o.tolerance ? e = !(i.left > l || i.right < a || i.top > h || i.bottom < r) : "fit" === o.tolerance && (e = i.left > a && i.right < l && i.top > r && i.bottom < h),
                    e ? (t.selected && (n._removeClass(t.$element, "ui-selected"),
                    t.selected = !1),
                    t.unselecting && (n._removeClass(t.$element, "ui-unselecting"),
                    t.unselecting = !1),
                    t.selecting || (n._addClass(t.$element, "ui-selecting"),
                    t.selecting = !0,
                    n._trigger("selecting", s, {
                        selecting: t.element
                    }))) : (t.selecting && ((s.metaKey || s.ctrlKey) && t.startselected ? (n._removeClass(t.$element, "ui-selecting"),
                    t.selecting = !1,
                    n._addClass(t.$element, "ui-selected"),
                    t.selected = !0) : (n._removeClass(t.$element, "ui-selecting"),
                    t.selecting = !1,
                    t.startselected && (n._addClass(t.$element, "ui-unselecting"),
                    t.unselecting = !0),
                    n._trigger("unselecting", s, {
                        unselecting: t.element
                    }))),
                    t.selected && (s.metaKey || s.ctrlKey || t.startselected || (n._removeClass(t.$element, "ui-selected"),
                    t.selected = !1,
                    n._addClass(t.$element, "ui-unselecting"),
                    t.unselecting = !0,
                    n._trigger("unselecting", s, {
                        unselecting: t.element
                    })))))
                }),
                !1
            }
        },
        _mouseStop: function(e) {
            var i = this;
            return this.dragged = !1,
            V(".ui-unselecting", this.element[0]).each(function() {
                var t = V.data(this, "selectable-item");
                i._removeClass(t.$element, "ui-unselecting"),
                t.unselecting = !1,
                t.startselected = !1,
                i._trigger("unselected", e, {
                    unselected: t.element
                })
            }),
            V(".ui-selecting", this.element[0]).each(function() {
                var t = V.data(this, "selectable-item");
                i._removeClass(t.$element, "ui-selecting")._addClass(t.$element, "ui-selected"),
                t.selecting = !1,
                t.selected = !0,
                t.startselected = !0,
                i._trigger("selected", e, {
                    selected: t.element
                })
            }),
            this._trigger("stop", e),
            this.helper.remove(),
            !1
        }
    }),
    V.widget("ui.selectmenu", [V.ui.formResetMixin, {
        version: "1.13.1",
        defaultElement: "<select>",
        options: {
            appendTo: null,
            classes: {
                "ui-selectmenu-button-open": "ui-corner-top",
                "ui-selectmenu-button-closed": "ui-corner-all"
            },
            disabled: null,
            icons: {
                button: "ui-icon-triangle-1-s"
            },
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            width: !1,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null
        },
        _create: function() {
            var t = this.element.uniqueId().attr("id");
            this.ids = {
                element: t,
                button: t + "-button",
                menu: t + "-menu"
            },
            this._drawButton(),
            this._drawMenu(),
            this._bindFormResetHandler(),
            this._rendered = !1,
            this.menuItems = V()
        },
        _drawButton: function() {
            var t, e = this, i = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
            this.labels = this.element.labels().attr("for", this.ids.button),
            this._on(this.labels, {
                click: function(t) {
                    this.button.trigger("focus"),
                    t.preventDefault()
                }
            }),
            this.element.hide(),
            this.button = V("<span>", {
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true",
                title: this.element.attr("title")
            }).insertAfter(this.element),
            this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"),
            t = V("<span>").appendTo(this.button),
            this._addClass(t, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button),
            this.buttonItem = this._renderButtonItem(i).appendTo(this.button),
            !1 !== this.options.width && this._resizeButton(),
            this._on(this.button, this._buttonEvents),
            this.button.one("focusin", function() {
                e._rendered || e._refreshMenu()
            })
        },
        _drawMenu: function() {
            var i = this;
            this.menu = V("<ul>", {
                "aria-hidden": "true",
                "aria-labelledby": this.ids.button,
                id: this.ids.menu
            }),
            this.menuWrap = V("<div>").append(this.menu),
            this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"),
            this.menuWrap.appendTo(this._appendTo()),
            this.menuInstance = this.menu.menu({
                classes: {
                    "ui-menu": "ui-corner-bottom"
                },
                role: "listbox",
                select: function(t, e) {
                    t.preventDefault(),
                    i._setSelection(),
                    i._select(e.item.data("ui-selectmenu-item"), t)
                },
                focus: function(t, e) {
                    e = e.item.data("ui-selectmenu-item");
                    null != i.focusIndex && e.index !== i.focusIndex && (i._trigger("focus", t, {
                        item: e
                    }),
                    i.isOpen || i._select(e, t)),
                    i.focusIndex = e.index,
                    i.button.attr("aria-activedescendant", i.menuItems.eq(e.index).attr("id"))
                }
            }).menu("instance"),
            this.menuInstance._off(this.menu, "mouseleave"),
            this.menuInstance._closeOnDocumentClick = function() {
                return !1
            }
            ,
            this.menuInstance._isDivider = function() {
                return !1
            }
        },
        refresh: function() {
            this._refreshMenu(),
            this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})),
            null === this.options.width && this._resizeButton()
        },
        _refreshMenu: function() {
            var t = this.element.find("option");
            this.menu.empty(),
            this._parseOptions(t),
            this._renderMenu(this.menu, this.items),
            this.menuInstance.refresh(),
            this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),
            this._rendered = !0,
            t.length && (t = this._getSelectedItem(),
            this.menuInstance.focus(null, t),
            this._setAria(t.data("ui-selectmenu-item")),
            this._setOption("disabled", this.element.prop("disabled")))
        },
        open: function(t) {
            this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"),
            this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(),
            this.menuItems.length && (this.isOpen = !0,
            this._toggleAttr(),
            this._resizeMenu(),
            this._position(),
            this._on(this.document, this._documentClick),
            this._trigger("open", t)))
        },
        _position: function() {
            this.menuWrap.position(V.extend({
                of: this.button
            }, this.options.position))
        },
        close: function(t) {
            this.isOpen && (this.isOpen = !1,
            this._toggleAttr(),
            this.range = null,
            this._off(this.document),
            this._trigger("close", t))
        },
        widget: function() {
            return this.button
        },
        menuWidget: function() {
            return this.menu
        },
        _renderButtonItem: function(t) {
            var e = V("<span>");
            return this._setText(e, t.label),
            this._addClass(e, "ui-selectmenu-text"),
            e
        },
        _renderMenu: function(s, t) {
            var n = this
              , o = "";
            V.each(t, function(t, e) {
                var i;
                e.optgroup !== o && (i = V("<li>", {
                    text: e.optgroup
                }),
                n._addClass(i, "ui-selectmenu-optgroup", "ui-menu-divider" + (e.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")),
                i.appendTo(s),
                o = e.optgroup),
                n._renderItemData(s, e)
            })
        },
        _renderItemData: function(t, e) {
            return this._renderItem(t, e).data("ui-selectmenu-item", e)
        },
        _renderItem: function(t, e) {
            var i = V("<li>")
              , s = V("<div>", {
                title: e.element.attr("title")
            });
            return e.disabled && this._addClass(i, null, "ui-state-disabled"),
            this._setText(s, e.label),
            i.append(s).appendTo(t)
        },
        _setText: function(t, e) {
            e ? t.text(e) : t.html("&#160;")
        },
        _move: function(t, e) {
            var i, s = ".ui-menu-item";
            this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"),
            s += ":not(.ui-state-disabled)"),
            (s = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](s).eq(-1) : i[t + "All"](s).eq(0)).length && this.menuInstance.focus(e, s)
        },
        _getSelectedItem: function() {
            return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
        },
        _toggle: function(t) {
            this[this.isOpen ? "close" : "open"](t)
        },
        _setSelection: function() {
            var t;
            this.range && (window.getSelection ? ((t = window.getSelection()).removeAllRanges(),
            t.addRange(this.range)) : this.range.select(),
            this.button.focus())
        },
        _documentClick: {
            mousedown: function(t) {
                this.isOpen && (V(t.target).closest(".ui-selectmenu-menu, #" + V.escapeSelector(this.ids.button)).length || this.close(t))
            }
        },
        _buttonEvents: {
            mousedown: function() {
                var t;
                window.getSelection ? (t = window.getSelection()).rangeCount && (this.range = t.getRangeAt(0)) : this.range = document.selection.createRange()
            },
            click: function(t) {
                this._setSelection(),
                this._toggle(t)
            },
            keydown: function(t) {
                var e = !0;
                switch (t.keyCode) {
                case V.ui.keyCode.TAB:
                case V.ui.keyCode.ESCAPE:
                    this.close(t),
                    e = !1;
                    break;
                case V.ui.keyCode.ENTER:
                    this.isOpen && this._selectFocusedItem(t);
                    break;
                case V.ui.keyCode.UP:
                    t.altKey ? this._toggle(t) : this._move("prev", t);
                    break;
                case V.ui.keyCode.DOWN:
                    t.altKey ? this._toggle(t) : this._move("next", t);
                    break;
                case V.ui.keyCode.SPACE:
                    this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
                    break;
                case V.ui.keyCode.LEFT:
                    this._move("prev", t);
                    break;
                case V.ui.keyCode.RIGHT:
                    this._move("next", t);
                    break;
                case V.ui.keyCode.HOME:
                case V.ui.keyCode.PAGE_UP:
                    this._move("first", t);
                    break;
                case V.ui.keyCode.END:
                case V.ui.keyCode.PAGE_DOWN:
                    this._move("last", t);
                    break;
                default:
                    this.menu.trigger(t),
                    e = !1
                }
                e && t.preventDefault()
            }
        },
        _selectFocusedItem: function(t) {
            var e = this.menuItems.eq(this.focusIndex).parent("li");
            e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t)
        },
        _select: function(t, e) {
            var i = this.element[0].selectedIndex;
            this.element[0].selectedIndex = t.index,
            this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(t)),
            this._setAria(t),
            this._trigger("select", e, {
                item: t
            }),
            t.index !== i && this._trigger("change", e, {
                item: t
            }),
            this.close(e)
        },
        _setAria: function(t) {
            t = this.menuItems.eq(t.index).attr("id");
            this.button.attr({
                "aria-labelledby": t,
                "aria-activedescendant": t
            }),
            this.menu.attr("aria-activedescendant", t)
        },
        _setOption: function(t, e) {
            var i;
            "icons" === t && (i = this.button.find("span.ui-icon"),
            this._removeClass(i, null, this.options.icons.button)._addClass(i, null, e.button)),
            this._super(t, e),
            "appendTo" === t && this.menuWrap.appendTo(this._appendTo()),
            "width" === t && this._resizeButton()
        },
        _setOptionDisabled: function(t) {
            this._super(t),
            this.menuInstance.option("disabled", t),
            this.button.attr("aria-disabled", t),
            this._toggleClass(this.button, null, "ui-state-disabled", t),
            this.element.prop("disabled", t),
            t ? (this.button.attr("tabindex", -1),
            this.close()) : this.button.attr("tabindex", 0)
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t = !(t = !(t = t && (t.jquery || t.nodeType ? V(t) : this.document.find(t).eq(0))) || !t[0] ? this.element.closest(".ui-front, dialog") : t).length ? this.document[0].body : t
        },
        _toggleAttr: function() {
            this.button.attr("aria-expanded", this.isOpen),
            this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen),
            this.menu.attr("aria-hidden", !this.isOpen)
        },
        _resizeButton: function() {
            var t = this.options.width;
            !1 !== t ? (null === t && (t = this.element.show().outerWidth(),
            this.element.hide()),
            this.button.outerWidth(t)) : this.button.css("width", "")
        },
        _resizeMenu: function() {
            this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
        },
        _getCreateOptions: function() {
            var t = this._super();
            return t.disabled = this.element.prop("disabled"),
            t
        },
        _parseOptions: function(t) {
            var i = this
              , s = [];
            t.each(function(t, e) {
                e.hidden || s.push(i._parseOption(V(e), t))
            }),
            this.items = s
        },
        _parseOption: function(t, e) {
            var i = t.parent("optgroup");
            return {
                element: t,
                index: e,
                value: t.val(),
                label: t.text(),
                optgroup: i.attr("label") || "",
                disabled: i.prop("disabled") || t.prop("disabled")
            }
        },
        _destroy: function() {
            this._unbindFormResetHandler(),
            this.menuWrap.remove(),
            this.button.remove(),
            this.element.show(),
            this.element.removeUniqueId(),
            this.labels.attr("for", this.ids.element)
        }
    }]),
    V.widget("ui.slider", V.ui.mouse, {
        version: "1.13.1",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function() {
            this._keySliding = !1,
            this._mouseSliding = !1,
            this._animateOff = !0,
            this._handleIndex = null,
            this._detectOrientation(),
            this._mouseInit(),
            this._calculateNewMax(),
            this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"),
            this._refresh(),
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue()
        },
        _createHandles: function() {
            var t, e = this.options, i = this.element.find(".ui-slider-handle"), s = [], n = e.values && e.values.length || 1;
            for (i.length > n && (i.slice(n).remove(),
            i = i.slice(0, n)),
            t = i.length; t < n; t++)
                s.push("<span tabindex='0'></span>");
            this.handles = i.add(V(s.join("")).appendTo(this.element)),
            this._addClass(this.handles, "ui-slider-handle", "ui-state-default"),
            this.handle = this.handles.eq(0),
            this.handles.each(function(t) {
                V(this).data("ui-slider-handle-index", t).attr("tabIndex", 0)
            })
        },
        _createRange: function() {
            var t = this.options;
            t.range ? (!0 === t.range && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : Array.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]),
            this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"),
            this.range.css({
                left: "",
                bottom: ""
            })) : (this.range = V("<div>").appendTo(this.element),
            this._addClass(this.range, "ui-slider-range")),
            "min" !== t.range && "max" !== t.range || this._addClass(this.range, "ui-slider-range-" + t.range)) : (this.range && this.range.remove(),
            this.range = null)
        },
        _setupEvents: function() {
            this._off(this.handles),
            this._on(this.handles, this._handleEvents),
            this._hoverable(this.handles),
            this._focusable(this.handles)
        },
        _destroy: function() {
            this.handles.remove(),
            this.range && this.range.remove(),
            this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var i, s, n, o, e, a, r = this, l = this.options;
            return !l.disabled && (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            },
            this.elementOffset = this.element.offset(),
            a = {
                x: t.pageX,
                y: t.pageY
            },
            i = this._normValueFromMouse(a),
            s = this._valueMax() - this._valueMin() + 1,
            this.handles.each(function(t) {
                var e = Math.abs(i - r.values(t));
                (e < s || s === e && (t === r._lastChangedValue || r.values(t) === l.min)) && (s = e,
                n = V(this),
                o = t)
            }),
            !1 !== this._start(t, o) && (this._mouseSliding = !0,
            this._handleIndex = o,
            this._addClass(n, null, "ui-state-active"),
            n.trigger("focus"),
            e = n.offset(),
            a = !V(t.target).parents().addBack().is(".ui-slider-handle"),
            this._clickOffset = a ? {
                left: 0,
                top: 0
            } : {
                left: t.pageX - e.left - n.width() / 2,
                top: t.pageY - e.top - n.height() / 2 - (parseInt(n.css("borderTopWidth"), 10) || 0) - (parseInt(n.css("borderBottomWidth"), 10) || 0) + (parseInt(n.css("marginTop"), 10) || 0)
            },
            this.handles.hasClass("ui-state-hover") || this._slide(t, o, i),
            this._animateOff = !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(t) {
            var e = {
                x: t.pageX,
                y: t.pageY
            }
              , e = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, e),
            !1
        },
        _mouseStop: function(t) {
            return this._removeClass(this.handles, null, "ui-state-active"),
            this._mouseSliding = !1,
            this._stop(t, this._handleIndex),
            this._change(t, this._handleIndex),
            this._handleIndex = null,
            this._clickOffset = null,
            this._animateOff = !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(t) {
            var e, t = "horizontal" === this.orientation ? (e = this.elementSize.width,
            t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height,
            t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), t = t / e;
            return (t = 1 < t ? 1 : t) < 0 && (t = 0),
            "vertical" === this.orientation && (t = 1 - t),
            e = this._valueMax() - this._valueMin(),
            e = this._valueMin() + t * e,
            this._trimAlignValue(e)
        },
        _uiHash: function(t, e, i) {
            var s = {
                handle: this.handles[t],
                handleIndex: t,
                value: void 0 !== e ? e : this.value()
            };
            return this._hasMultipleValues() && (s.value = void 0 !== e ? e : this.values(t),
            s.values = i || this.values()),
            s
        },
        _hasMultipleValues: function() {
            return this.options.values && this.options.values.length
        },
        _start: function(t, e) {
            return this._trigger("start", t, this._uiHash(e))
        },
        _slide: function(t, e, i) {
            var s, n = this.value(), o = this.values();
            this._hasMultipleValues() && (s = this.values(e ? 0 : 1),
            n = this.values(e),
            2 === this.options.values.length && !0 === this.options.range && (i = 0 === e ? Math.min(s, i) : Math.max(s, i)),
            o[e] = i),
            i !== n && !1 !== this._trigger("slide", t, this._uiHash(e, i, o)) && (this._hasMultipleValues() ? this.values(e, i) : this.value(i))
        },
        _stop: function(t, e) {
            this._trigger("stop", t, this._uiHash(e))
        },
        _change: function(t, e) {
            this._keySliding || this._mouseSliding || (this._lastChangedValue = e,
            this._trigger("change", t, this._uiHash(e)))
        },
        value: function(t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t),
            this._refreshValue(),
            void this._change(null, 0)) : this._value()
        },
        values: function(t, e) {
            var i, s, n;
            if (1 < arguments.length)
                return this.options.values[t] = this._trimAlignValue(e),
                this._refreshValue(),
                void this._change(null, t);
            if (!arguments.length)
                return this._values();
            if (!Array.isArray(t))
                return this._hasMultipleValues() ? this._values(t) : this.value();
            for (i = this.options.values,
            s = t,
            n = 0; n < i.length; n += 1)
                i[n] = this._trimAlignValue(s[n]),
                this._change(null, n);
            this._refreshValue()
        },
        _setOption: function(t, e) {
            var i, s = 0;
            switch ("range" === t && !0 === this.options.range && ("min" === e ? (this.options.value = this._values(0),
            this.options.values = null) : "max" === e && (this.options.value = this._values(this.options.values.length - 1),
            this.options.values = null)),
            Array.isArray(this.options.values) && (s = this.options.values.length),
            this._super(t, e),
            t) {
            case "orientation":
                this._detectOrientation(),
                this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation),
                this._refreshValue(),
                this.options.range && this._refreshRange(e),
                this.handles.css("horizontal" === e ? "bottom" : "left", "");
                break;
            case "value":
                this._animateOff = !0,
                this._refreshValue(),
                this._change(null, 0),
                this._animateOff = !1;
                break;
            case "values":
                for (this._animateOff = !0,
                this._refreshValue(),
                i = s - 1; 0 <= i; i--)
                    this._change(null, i);
                this._animateOff = !1;
                break;
            case "step":
            case "min":
            case "max":
                this._animateOff = !0,
                this._calculateNewMax(),
                this._refreshValue(),
                this._animateOff = !1;
                break;
            case "range":
                this._animateOff = !0,
                this._refresh(),
                this._animateOff = !1
            }
        },
        _setOptionDisabled: function(t) {
            this._super(t),
            this._toggleClass(null, "ui-state-disabled", !!t)
        },
        _value: function() {
            var t = this.options.value;
            return t = this._trimAlignValue(t)
        },
        _values: function(t) {
            var e, i;
            if (arguments.length)
                return t = this.options.values[t],
                t = this._trimAlignValue(t);
            if (this._hasMultipleValues()) {
                for (e = this.options.values.slice(),
                i = 0; i < e.length; i += 1)
                    e[i] = this._trimAlignValue(e[i]);
                return e
            }
            return []
        },
        _trimAlignValue: function(t) {
            if (t <= this._valueMin())
                return this._valueMin();
            if (t >= this._valueMax())
                return this._valueMax();
            var e = 0 < this.options.step ? this.options.step : 1
              , i = (t - this._valueMin()) % e
              , t = t - i;
            return 2 * Math.abs(i) >= e && (t += 0 < i ? e : -e),
            parseFloat(t.toFixed(5))
        },
        _calculateNewMax: function() {
            var t = this.options.max
              , e = this._valueMin()
              , i = this.options.step;
            (t = Math.round((t - e) / i) * i + e) > this.options.max && (t -= i),
            this.max = parseFloat(t.toFixed(this._precision()))
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return t = null !== this.options.min ? Math.max(t, this._precisionOf(this.options.min)) : t
        },
        _precisionOf: function(t) {
            var e = t.toString()
              , t = e.indexOf(".");
            return -1 === t ? 0 : e.length - t - 1
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.max
        },
        _refreshRange: function(t) {
            "vertical" === t && this.range.css({
                width: "",
                left: ""
            }),
            "horizontal" === t && this.range.css({
                height: "",
                bottom: ""
            })
        },
        _refreshValue: function() {
            var e, i, t, s, n, o = this.options.range, a = this.options, r = this, l = !this._animateOff && a.animate, h = {};
            this._hasMultipleValues() ? this.handles.each(function(t) {
                i = (r.values(t) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100,
                h["horizontal" === r.orientation ? "left" : "bottom"] = i + "%",
                V(this).stop(1, 1)[l ? "animate" : "css"](h, a.animate),
                !0 === r.options.range && ("horizontal" === r.orientation ? (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({
                    left: i + "%"
                }, a.animate),
                1 === t && r.range[l ? "animate" : "css"]({
                    width: i - e + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                })) : (0 === t && r.range.stop(1, 1)[l ? "animate" : "css"]({
                    bottom: i + "%"
                }, a.animate),
                1 === t && r.range[l ? "animate" : "css"]({
                    height: i - e + "%"
                }, {
                    queue: !1,
                    duration: a.animate
                }))),
                e = i
            }) : (t = this.value(),
            s = this._valueMin(),
            n = this._valueMax(),
            i = n !== s ? (t - s) / (n - s) * 100 : 0,
            h["horizontal" === this.orientation ? "left" : "bottom"] = i + "%",
            this.handle.stop(1, 1)[l ? "animate" : "css"](h, a.animate),
            "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                width: i + "%"
            }, a.animate),
            "max" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                width: 100 - i + "%"
            }, a.animate),
            "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                height: i + "%"
            }, a.animate),
            "max" === o && "vertical" === this.orientation && this.range.stop(1, 1)[l ? "animate" : "css"]({
                height: 100 - i + "%"
            }, a.animate))
        },
        _handleEvents: {
            keydown: function(t) {
                var e, i, s, n = V(t.target).data("ui-slider-handle-index");
                switch (t.keyCode) {
                case V.ui.keyCode.HOME:
                case V.ui.keyCode.END:
                case V.ui.keyCode.PAGE_UP:
                case V.ui.keyCode.PAGE_DOWN:
                case V.ui.keyCode.UP:
                case V.ui.keyCode.RIGHT:
                case V.ui.keyCode.DOWN:
                case V.ui.keyCode.LEFT:
                    if (t.preventDefault(),
                    !this._keySliding && (this._keySliding = !0,
                    this._addClass(V(t.target), null, "ui-state-active"),
                    !1 === this._start(t, n)))
                        return
                }
                switch (s = this.options.step,
                e = i = this._hasMultipleValues() ? this.values(n) : this.value(),
                t.keyCode) {
                case V.ui.keyCode.HOME:
                    i = this._valueMin();
                    break;
                case V.ui.keyCode.END:
                    i = this._valueMax();
                    break;
                case V.ui.keyCode.PAGE_UP:
                    i = this._trimAlignValue(e + (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case V.ui.keyCode.PAGE_DOWN:
                    i = this._trimAlignValue(e - (this._valueMax() - this._valueMin()) / this.numPages);
                    break;
                case V.ui.keyCode.UP:
                case V.ui.keyCode.RIGHT:
                    if (e === this._valueMax())
                        return;
                    i = this._trimAlignValue(e + s);
                    break;
                case V.ui.keyCode.DOWN:
                case V.ui.keyCode.LEFT:
                    if (e === this._valueMin())
                        return;
                    i = this._trimAlignValue(e - s)
                }
                this._slide(t, n, i)
            },
            keyup: function(t) {
                var e = V(t.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1,
                this._stop(t, e),
                this._change(t, e),
                this._removeClass(V(t.target), null, "ui-state-active"))
            }
        }
    }),
    V.widget("ui.sortable", V.ui.mouse, {
        version: "1.13.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(t, e, i) {
            return e <= t && t < e + i
        },
        _isFloating: function(t) {
            return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
        },
        _create: function() {
            this.containerCache = {},
            this._addClass("ui-sortable"),
            this.refresh(),
            this.offset = this.element.offset(),
            this._mouseInit(),
            this._setHandleClassName(),
            this.ready = !0
        },
        _setOption: function(t, e) {
            this._super(t, e),
            "handle" === t && this._setHandleClassName()
        },
        _setHandleClassName: function() {
            var t = this;
            this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"),
            V.each(this.items, function() {
                t._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
            })
        },
        _destroy: function() {
            this._mouseDestroy();
            for (var t = this.items.length - 1; 0 <= t; t--)
                this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function(t, e) {
            var i = null
              , s = !1
              , n = this;
            return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(t),
            V(t.target).parents().each(function() {
                if (V.data(this, n.widgetName + "-item") === n)
                    return i = V(this),
                    !1
            }),
            !!(i = V.data(t.target, n.widgetName + "-item") === n ? V(t.target) : i) && (!(this.options.handle && !e && (V(this.options.handle, i).find("*").addBack().each(function() {
                this === t.target && (s = !0)
            }),
            !s)) && (this.currentItem = i,
            this._removeCurrentsFromItems(),
            !0))))
        },
        _mouseStart: function(t, e, i) {
            var s, n, o = this.options;
            if ((this.currentContainer = this).refreshPositions(),
            this.appendTo = V("parent" !== o.appendTo ? o.appendTo : this.currentItem.parent()),
            this.helper = this._createHelper(t),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            this.offset = this.currentItem.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            V.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                relative: this._getRelativeOffset()
            }),
            this.helper.css("position", "absolute"),
            this.cssPosition = this.helper.css("position"),
            o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            },
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            this.scrollParent = this.placeholder.scrollParent(),
            V.extend(this.offset, {
                parent: this._getParentOffset()
            }),
            o.containment && this._setContainment(),
            o.cursor && "auto" !== o.cursor && (n = this.document.find("body"),
            this.storedCursor = n.css("cursor"),
            n.css("cursor", o.cursor),
            this.storedStylesheet = V("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(n)),
            o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", o.zIndex)),
            o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", o.opacity)),
            this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
            this._trigger("start", t, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !i)
                for (s = this.containers.length - 1; 0 <= s; s--)
                    this.containers[s]._trigger("activate", t, this._uiHash(this));
            return V.ui.ddmanager && (V.ui.ddmanager.current = this),
            V.ui.ddmanager && !o.dropBehaviour && V.ui.ddmanager.prepareOffsets(this, t),
            this.dragging = !0,
            this._addClass(this.helper, "ui-sortable-helper"),
            this.helper.parent().is(this.appendTo) || (this.helper.detach().appendTo(this.appendTo),
            this.offset.parent = this._getParentOffset()),
            this.position = this.originalPosition = this._generatePosition(t),
            this.originalPageX = t.pageX,
            this.originalPageY = t.pageY,
            this.lastPositionAbs = this.positionAbs = this._convertPositionTo("absolute"),
            this._mouseDrag(t),
            !0
        },
        _scroll: function(t) {
            var e = this.options
              , i = !1;
            return this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < e.scrollSensitivity ? this.scrollParent[0].scrollTop = i = this.scrollParent[0].scrollTop + e.scrollSpeed : t.pageY - this.overflowOffset.top < e.scrollSensitivity && (this.scrollParent[0].scrollTop = i = this.scrollParent[0].scrollTop - e.scrollSpeed),
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < e.scrollSensitivity ? this.scrollParent[0].scrollLeft = i = this.scrollParent[0].scrollLeft + e.scrollSpeed : t.pageX - this.overflowOffset.left < e.scrollSensitivity && (this.scrollParent[0].scrollLeft = i = this.scrollParent[0].scrollLeft - e.scrollSpeed)) : (t.pageY - this.document.scrollTop() < e.scrollSensitivity ? i = this.document.scrollTop(this.document.scrollTop() - e.scrollSpeed) : this.window.height() - (t.pageY - this.document.scrollTop()) < e.scrollSensitivity && (i = this.document.scrollTop(this.document.scrollTop() + e.scrollSpeed)),
            t.pageX - this.document.scrollLeft() < e.scrollSensitivity ? i = this.document.scrollLeft(this.document.scrollLeft() - e.scrollSpeed) : this.window.width() - (t.pageX - this.document.scrollLeft()) < e.scrollSensitivity && (i = this.document.scrollLeft(this.document.scrollLeft() + e.scrollSpeed))),
            i
        },
        _mouseDrag: function(t) {
            var e, i, s, n, o = this.options;
            for (this.position = this._generatePosition(t),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
            o.scroll && !1 !== this._scroll(t) && (this._refreshItemPositions(!0),
            V.ui.ddmanager && !o.dropBehaviour && V.ui.ddmanager.prepareOffsets(this, t)),
            this.dragDirection = {
                vertical: this._getDragVerticalDirection(),
                horizontal: this._getDragHorizontalDirection()
            },
            e = this.items.length - 1; 0 <= e; e--)
                if (s = (i = this.items[e]).item[0],
                (n = this._intersectsWithPointer(i)) && i.instance === this.currentContainer && !(s === this.currentItem[0] || this.placeholder[1 === n ? "next" : "prev"]()[0] === s || V.contains(this.placeholder[0], s) || "semi-dynamic" === this.options.type && V.contains(this.element[0], s))) {
                    if (this.direction = 1 === n ? "down" : "up",
                    "pointer" !== this.options.tolerance && !this._intersectsWithSides(i))
                        break;
                    this._rearrange(t, i),
                    this._trigger("change", t, this._uiHash());
                    break
                }
            return this._contactContainers(t),
            V.ui.ddmanager && V.ui.ddmanager.drag(this, t),
            this._trigger("sort", t, this._uiHash()),
            this.lastPositionAbs = this.positionAbs,
            !1
        },
        _mouseStop: function(t, e) {
            var i, s, n, o;
            if (t)
                return V.ui.ddmanager && !this.options.dropBehaviour && V.ui.ddmanager.drop(this, t),
                this.options.revert ? (s = (i = this).placeholder.offset(),
                o = {},
                (n = this.options.axis) && "x" !== n || (o.left = s.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)),
                n && "y" !== n || (o.top = s.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)),
                this.reverting = !0,
                V(this.helper).animate(o, parseInt(this.options.revert, 10) || 500, function() {
                    i._clear(t)
                })) : this._clear(t, e),
                !1
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp(new V.Event("mouseup",{
                    target: null
                })),
                "original" === this.options.helper ? (this.currentItem.css(this._storedCSS),
                this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                for (var t = this.containers.length - 1; 0 <= t; t--)
                    this.containers[t]._trigger("deactivate", null, this._uiHash(this)),
                    this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)),
                    this.containers[t].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
            V.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }),
            this.domPosition.prev ? V(this.domPosition.prev).after(this.currentItem) : V(this.domPosition.parent).prepend(this.currentItem)),
            this
        },
        serialize: function(e) {
            var t = this._getItemsAsjQuery(e && e.connected)
              , i = [];
            return e = e || {},
            V(t).each(function() {
                var t = (V(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                t && i.push((e.key || t[1] + "[]") + "=" + (e.key && e.expression ? t[1] : t[2]))
            }),
            !i.length && e.key && i.push(e.key + "="),
            i.join("&")
        },
        toArray: function(t) {
            var e = this._getItemsAsjQuery(t && t.connected)
              , i = [];
            return t = t || {},
            e.each(function() {
                i.push(V(t.item || this).attr(t.attribute || "id") || "")
            }),
            i
        },
        _intersectsWith: function(t) {
            var e = this.positionAbs.left
              , i = e + this.helperProportions.width
              , s = this.positionAbs.top
              , n = s + this.helperProportions.height
              , o = t.left
              , a = o + t.width
              , r = t.top
              , l = r + t.height
              , h = this.offset.click.top
              , c = this.offset.click.left
              , h = "x" === this.options.axis || r < s + h && s + h < l
              , c = "y" === this.options.axis || o < e + c && e + c < a;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? h && c : o < e + this.helperProportions.width / 2 && i - this.helperProportions.width / 2 < a && r < s + this.helperProportions.height / 2 && n - this.helperProportions.height / 2 < l
        },
        _intersectsWithPointer: function(t) {
            var e = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height)
              , t = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width);
            return !(!e || !t) && (e = this.dragDirection.vertical,
            t = this.dragDirection.horizontal,
            this.floating ? "right" === t || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1))
        },
        _intersectsWithSides: function(t) {
            var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height)
              , i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width)
              , s = this.dragDirection.vertical
              , t = this.dragDirection.horizontal;
            return this.floating && t ? "right" === t && i || "left" === t && !i : s && ("down" === s && e || "up" === s && !e)
        },
        _getDragVerticalDirection: function() {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 != t && (0 < t ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 != t && (0 < t ? "right" : "left")
        },
        refresh: function(t) {
            return this._refreshItems(t),
            this._setHandleClassName(),
            this.refreshPositions(),
            this
        },
        _connectWith: function() {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function(t) {
            var e, i, s, n, o = [], a = [], r = this._connectWith();
            if (r && t)
                for (e = r.length - 1; 0 <= e; e--)
                    for (i = (s = V(r[e], this.document[0])).length - 1; 0 <= i; i--)
                        (n = V.data(s[i], this.widgetFullName)) && n !== this && !n.options.disabled && a.push(["function" == typeof n.options.items ? n.options.items.call(n.element) : V(n.options.items, n.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), n]);
            function l() {
                o.push(this)
            }
            for (a.push(["function" == typeof this.options.items ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : V(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]),
            e = a.length - 1; 0 <= e; e--)
                a[e][0].each(l);
            return V(o)
        },
        _removeCurrentsFromItems: function() {
            var i = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = V.grep(this.items, function(t) {
                for (var e = 0; e < i.length; e++)
                    if (i[e] === t.item[0])
                        return !1;
                return !0
            })
        },
        _refreshItems: function(t) {
            this.items = [],
            this.containers = [this];
            var e, i, s, n, o, a, r, l, h = this.items, c = [["function" == typeof this.options.items ? this.options.items.call(this.element[0], t, {
                item: this.currentItem
            }) : V(this.options.items, this.element), this]], u = this._connectWith();
            if (u && this.ready)
                for (e = u.length - 1; 0 <= e; e--)
                    for (i = (s = V(u[e], this.document[0])).length - 1; 0 <= i; i--)
                        (n = V.data(s[i], this.widgetFullName)) && n !== this && !n.options.disabled && (c.push(["function" == typeof n.options.items ? n.options.items.call(n.element[0], t, {
                            item: this.currentItem
                        }) : V(n.options.items, n.element), n]),
                        this.containers.push(n));
            for (e = c.length - 1; 0 <= e; e--)
                for (o = c[e][1],
                l = (a = c[e][i = 0]).length; i < l; i++)
                    (r = V(a[i])).data(this.widgetName + "-item", o),
                    h.push({
                        item: r,
                        instance: o,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
        },
        _refreshItemPositions: function(t) {
            for (var e, i, s = this.items.length - 1; 0 <= s; s--)
                e = this.items[s],
                this.currentContainer && e.instance !== this.currentContainer && e.item[0] !== this.currentItem[0] || (i = this.options.toleranceElement ? V(this.options.toleranceElement, e.item) : e.item,
                t || (e.width = i.outerWidth(),
                e.height = i.outerHeight()),
                i = i.offset(),
                e.left = i.left,
                e.top = i.top)
        },
        refreshPositions: function(t) {
            var e, i;
            if (this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)),
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset()),
            this._refreshItemPositions(t),
            this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (e = this.containers.length - 1; 0 <= e; e--)
                    i = this.containers[e].element.offset(),
                    this.containers[e].containerCache.left = i.left,
                    this.containers[e].containerCache.top = i.top,
                    this.containers[e].containerCache.width = this.containers[e].element.outerWidth(),
                    this.containers[e].containerCache.height = this.containers[e].element.outerHeight();
            return this
        },
        _createPlaceholder: function(i) {
            var s, n, o = (i = i || this).options;
            o.placeholder && o.placeholder.constructor !== String || (s = o.placeholder,
            n = i.currentItem[0].nodeName.toLowerCase(),
            o.placeholder = {
                element: function() {
                    var t = V("<" + n + ">", i.document[0]);
                    return i._addClass(t, "ui-sortable-placeholder", s || i.currentItem[0].className)._removeClass(t, "ui-sortable-helper"),
                    "tbody" === n ? i._createTrPlaceholder(i.currentItem.find("tr").eq(0), V("<tr>", i.document[0]).appendTo(t)) : "tr" === n ? i._createTrPlaceholder(i.currentItem, t) : "img" === n && t.attr("src", i.currentItem.attr("src")),
                    s || t.css("visibility", "hidden"),
                    t
                },
                update: function(t, e) {
                    s && !o.forcePlaceholderSize || (e.height() && (!o.forcePlaceholderSize || "tbody" !== n && "tr" !== n) || e.height(i.currentItem.innerHeight() - parseInt(i.currentItem.css("paddingTop") || 0, 10) - parseInt(i.currentItem.css("paddingBottom") || 0, 10)),
                    e.width() || e.width(i.currentItem.innerWidth() - parseInt(i.currentItem.css("paddingLeft") || 0, 10) - parseInt(i.currentItem.css("paddingRight") || 0, 10)))
                }
            }),
            i.placeholder = V(o.placeholder.element.call(i.element, i.currentItem)),
            i.currentItem.after(i.placeholder),
            o.placeholder.update(i, i.placeholder)
        },
        _createTrPlaceholder: function(t, e) {
            var i = this;
            t.children().each(function() {
                V("<td>&#160;</td>", i.document[0]).attr("colspan", V(this).attr("colspan") || 1).appendTo(e)
            })
        },
        _contactContainers: function(t) {
            for (var e, i, s, n, o, a, r, l, h, c = null, u = null, d = this.containers.length - 1; 0 <= d; d--)
                V.contains(this.currentItem[0], this.containers[d].element[0]) || (this._intersectsWith(this.containers[d].containerCache) ? c && V.contains(this.containers[d].element[0], c.element[0]) || (c = this.containers[d],
                u = d) : this.containers[d].containerCache.over && (this.containers[d]._trigger("out", t, this._uiHash(this)),
                this.containers[d].containerCache.over = 0));
            if (c)
                if (1 === this.containers.length)
                    this.containers[u].containerCache.over || (this.containers[u]._trigger("over", t, this._uiHash(this)),
                    this.containers[u].containerCache.over = 1);
                else {
                    for (i = 1e4,
                    s = null,
                    n = (l = c.floating || this._isFloating(this.currentItem)) ? "left" : "top",
                    o = l ? "width" : "height",
                    h = l ? "pageX" : "pageY",
                    e = this.items.length - 1; 0 <= e; e--)
                        V.contains(this.containers[u].element[0], this.items[e].item[0]) && this.items[e].item[0] !== this.currentItem[0] && (a = this.items[e].item.offset()[n],
                        r = !1,
                        t[h] - a > this.items[e][o] / 2 && (r = !0),
                        Math.abs(t[h] - a) < i && (i = Math.abs(t[h] - a),
                        s = this.items[e],
                        this.direction = r ? "up" : "down"));
                    (s || this.options.dropOnEmpty) && (this.currentContainer !== this.containers[u] ? (s ? this._rearrange(t, s, null, !0) : this._rearrange(t, null, this.containers[u].element, !0),
                    this._trigger("change", t, this._uiHash()),
                    this.containers[u]._trigger("change", t, this._uiHash(this)),
                    this.currentContainer = this.containers[u],
                    this.options.placeholder.update(this.currentContainer, this.placeholder),
                    this.scrollParent = this.placeholder.scrollParent(),
                    this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
                    this.containers[u]._trigger("over", t, this._uiHash(this)),
                    this.containers[u].containerCache.over = 1) : this.currentContainer.containerCache.over || (this.containers[u]._trigger("over", t, this._uiHash()),
                    this.currentContainer.containerCache.over = 1))
                }
        },
        _createHelper: function(t) {
            var e = this.options
              , t = "function" == typeof e.helper ? V(e.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === e.helper ? this.currentItem.clone() : this.currentItem;
            return t.parents("body").length || this.appendTo[0].appendChild(t[0]),
            t[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }),
            t[0].style.width && !e.forceHelperSize || t.width(this.currentItem.width()),
            t[0].style.height && !e.forceHelperSize || t.height(this.currentItem.height()),
            t
        },
        _adjustOffsetFromHelper: function(t) {
            "string" == typeof t && (t = t.split(" ")),
            "left"in (t = Array.isArray(t) ? {
                left: +t[0],
                top: +t[1] || 0
            } : t) && (this.offset.click.left = t.left + this.margins.left),
            "right"in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left),
            "top"in t && (this.offset.click.top = t.top + this.margins.top),
            "bottom"in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && V.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(),
            t.top += this.scrollParent.scrollTop()),
            {
                top: (t = this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && V.ui.ie ? {
                    top: 0,
                    left: 0
                } : t).top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition)
                return {
                    top: 0,
                    left: 0
                };
            var t = this.currentItem.position();
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, e, i = this.options;
            "parent" === i.containment && (i.containment = this.helper[0].parentNode),
            "document" !== i.containment && "window" !== i.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === i.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === i.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]),
            /^(document|window|parent)$/.test(i.containment) || (t = V(i.containment)[0],
            e = V(i.containment).offset(),
            i = "hidden" !== V(t).css("overflow"),
            this.containment = [e.left + (parseInt(V(t).css("borderLeftWidth"), 10) || 0) + (parseInt(V(t).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(V(t).css("borderTopWidth"), 10) || 0) + (parseInt(V(t).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (i ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(V(t).css("borderLeftWidth"), 10) || 0) - (parseInt(V(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (i ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(V(t).css("borderTopWidth"), 10) || 0) - (parseInt(V(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(t, e) {
            e = e || this.position;
            var i = "absolute" === t ? 1 : -1
              , s = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && V.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , t = /(html|body)/i.test(s[0].tagName);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : t ? 0 : s.scrollTop()) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : t ? 0 : s.scrollLeft()) * i
            }
        },
        _generatePosition: function(t) {
            var e = this.options
              , i = t.pageX
              , s = t.pageY
              , n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && V.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , o = /(html|body)/i.test(n[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (i = this.containment[0] + this.offset.click.left),
            t.pageY - this.offset.click.top < this.containment[1] && (s = this.containment[1] + this.offset.click.top),
            t.pageX - this.offset.click.left > this.containment[2] && (i = this.containment[2] + this.offset.click.left),
            t.pageY - this.offset.click.top > this.containment[3] && (s = this.containment[3] + this.offset.click.top)),
            e.grid && (t = this.originalPageY + Math.round((s - this.originalPageY) / e.grid[1]) * e.grid[1],
            s = !this.containment || t - this.offset.click.top >= this.containment[1] && t - this.offset.click.top <= this.containment[3] ? t : t - this.offset.click.top >= this.containment[1] ? t - e.grid[1] : t + e.grid[1],
            t = this.originalPageX + Math.round((i - this.originalPageX) / e.grid[0]) * e.grid[0],
            i = !this.containment || t - this.offset.click.left >= this.containment[0] && t - this.offset.click.left <= this.containment[2] ? t : t - this.offset.click.left >= this.containment[0] ? t - e.grid[0] : t + e.grid[0])),
            {
                top: s - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()),
                left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft())
            }
        },
        _rearrange: function(t, e, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling),
            this.counter = this.counter ? ++this.counter : 1;
            var n = this.counter;
            this._delay(function() {
                n === this.counter && this.refreshPositions(!s)
            })
        },
        _clear: function(t, e) {
            this.reverting = !1;
            var i, s = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem),
            this._noFinalSort = null,
            this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)
                    "auto" !== this._storedCSS[i] && "static" !== this._storedCSS[i] || (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS),
                this._removeClass(this.currentItem, "ui-sortable-helper")
            } else
                this.currentItem.show();
            function n(e, i, s) {
                return function(t) {
                    s._trigger(e, t, i._uiHash(i))
                }
            }
            for (this.fromOutside && !e && s.push(function(t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside))
            }),
            !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || s.push(function(t) {
                this._trigger("update", t, this._uiHash())
            }),
            this !== this.currentContainer && (e || (s.push(function(t) {
                this._trigger("remove", t, this._uiHash())
            }),
            s.push(function(e) {
                return function(t) {
                    e._trigger("receive", t, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)),
            s.push(function(e) {
                return function(t) {
                    e._trigger("update", t, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)))),
            i = this.containers.length - 1; 0 <= i; i--)
                e || s.push(n("deactivate", this, this.containers[i])),
                this.containers[i].containerCache.over && (s.push(n("out", this, this.containers[i])),
                this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex),
            this.dragging = !1,
            e || this._trigger("beforeStop", t, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            this.helper = null),
            !e) {
                for (i = 0; i < s.length; i++)
                    s[i].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1,
            !this.cancelHelperRemoval
        },
        _trigger: function() {
            !1 === V.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
        },
        _uiHash: function(t) {
            var e = t || this;
            return {
                helper: e.helper,
                placeholder: e.placeholder || V([]),
                position: e.position,
                originalPosition: e.originalPosition,
                offset: e.positionAbs,
                item: e.currentItem,
                sender: t ? t.element : null
            }
        }
    });
    function ht(e) {
        return function() {
            var t = this.element.val();
            e.apply(this, arguments),
            this._refresh(),
            t !== this.element.val() && this._trigger("change")
        }
    }
    V.widget("ui.spinner", {
        version: "1.13.1",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            classes: {
                "ui-spinner": "ui-corner-all",
                "ui-spinner-down": "ui-corner-br",
                "ui-spinner-up": "ui-corner-tr"
            },
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max),
            this._setOption("min", this.options.min),
            this._setOption("step", this.options.step),
            "" !== this.value() && this._value(this.element.val(), !0),
            this._draw(),
            this._on(this._events),
            this._refresh(),
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function() {
            var s = this._super()
              , n = this.element;
            return V.each(["min", "max", "step"], function(t, e) {
                var i = n.attr(e);
                null != i && i.length && (s[e] = i)
            }),
            s
        },
        _events: {
            keydown: function(t) {
                this._start(t) && this._keydown(t) && t.preventDefault()
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val()
            },
            blur: function(t) {
                this.cancelBlur ? delete this.cancelBlur : (this._stop(),
                this._refresh(),
                this.previous !== this.element.val() && this._trigger("change", t))
            },
            mousewheel: function(t, e) {
                var i = V.ui.safeActiveElement(this.document[0]);
                if (this.element[0] === i && e) {
                    if (!this.spinning && !this._start(t))
                        return !1;
                    this._spin((0 < e ? 1 : -1) * this.options.step, t),
                    clearTimeout(this.mousewheelTimer),
                    this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(t)
                    }, 100),
                    t.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function(t) {
                var e;
                function i() {
                    this.element[0] === V.ui.safeActiveElement(this.document[0]) || (this.element.trigger("focus"),
                    this.previous = e,
                    this._delay(function() {
                        this.previous = e
                    }))
                }
                e = this.element[0] === V.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val(),
                t.preventDefault(),
                i.call(this),
                this.cancelBlur = !0,
                this._delay(function() {
                    delete this.cancelBlur,
                    i.call(this)
                }),
                !1 !== this._start(t) && this._repeat(null, V(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(t) {
                if (V(t.currentTarget).hasClass("ui-state-active"))
                    return !1 !== this._start(t) && void this._repeat(null, V(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _enhance: function() {
            this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a></a><a></a>")
        },
        _draw: function() {
            this._enhance(),
            this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content"),
            this._addClass("ui-spinner-input"),
            this.element.attr("role", "spinbutton"),
            this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
                classes: {
                    "ui-button": ""
                }
            }),
            this._removeClass(this.buttons, "ui-corner-all"),
            this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up"),
            this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down"),
            this.buttons.first().button({
                icon: this.options.icons.up,
                showLabel: !1
            }),
            this.buttons.last().button({
                icon: this.options.icons.down,
                showLabel: !1
            }),
            this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && 0 < this.uiSpinner.height() && this.uiSpinner.height(this.uiSpinner.height())
        },
        _keydown: function(t) {
            var e = this.options
              , i = V.ui.keyCode;
            switch (t.keyCode) {
            case i.UP:
                return this._repeat(null, 1, t),
                !0;
            case i.DOWN:
                return this._repeat(null, -1, t),
                !0;
            case i.PAGE_UP:
                return this._repeat(null, e.page, t),
                !0;
            case i.PAGE_DOWN:
                return this._repeat(null, -e.page, t),
                !0
            }
            return !1
        },
        _start: function(t) {
            return !(!this.spinning && !1 === this._trigger("start", t)) && (this.counter || (this.counter = 1),
            this.spinning = !0)
        },
        _repeat: function(t, e, i) {
            t = t || 500,
            clearTimeout(this.timer),
            this.timer = this._delay(function() {
                this._repeat(40, e, i)
            }, t),
            this._spin(e * this.options.step, i)
        },
        _spin: function(t, e) {
            var i = this.value() || 0;
            this.counter || (this.counter = 1),
            i = this._adjustValue(i + t * this._increment(this.counter)),
            this.spinning && !1 === this._trigger("spin", e, {
                value: i
            }) || (this._value(i),
            this.counter++)
        },
        _increment: function(t) {
            var e = this.options.incremental;
            return e ? "function" == typeof e ? e(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1
        },
        _precision: function() {
            var t = this._precisionOf(this.options.step);
            return t = null !== this.options.min ? Math.max(t, this._precisionOf(this.options.min)) : t
        },
        _precisionOf: function(t) {
            var e = t.toString()
              , t = e.indexOf(".");
            return -1 === t ? 0 : e.length - t - 1
        },
        _adjustValue: function(t) {
            var e = this.options
              , i = null !== e.min ? e.min : 0
              , s = t - i;
            return t = i + Math.round(s / e.step) * e.step,
            t = parseFloat(t.toFixed(this._precision())),
            null !== e.max && t > e.max ? e.max : null !== e.min && t < e.min ? e.min : t
        },
        _stop: function(t) {
            this.spinning && (clearTimeout(this.timer),
            clearTimeout(this.mousewheelTimer),
            this.counter = 0,
            this.spinning = !1,
            this._trigger("stop", t))
        },
        _setOption: function(t, e) {
            var i;
            if ("culture" === t || "numberFormat" === t)
                return i = this._parse(this.element.val()),
                this.options[t] = e,
                void this.element.val(this._format(i));
            "max" !== t && "min" !== t && "step" !== t || "string" == typeof e && (e = this._parse(e)),
            "icons" === t && (i = this.buttons.first().find(".ui-icon"),
            this._removeClass(i, null, this.options.icons.up),
            this._addClass(i, null, e.up),
            i = this.buttons.last().find(".ui-icon"),
            this._removeClass(i, null, this.options.icons.down),
            this._addClass(i, null, e.down)),
            this._super(t, e)
        },
        _setOptionDisabled: function(t) {
            this._super(t),
            this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!t),
            this.element.prop("disabled", !!t),
            this.buttons.button(t ? "disable" : "enable")
        },
        _setOptions: ht(function(t) {
            this._super(t)
        }),
        _parse: function(t) {
            return "" === (t = "string" == typeof t && "" !== t ? window.Globalize && this.options.numberFormat ? Globalize.parseFloat(t, 10, this.options.culture) : +t : t) || isNaN(t) ? null : t
        },
        _format: function(t) {
            return "" === t ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(t, this.options.numberFormat, this.options.culture) : t
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        isValid: function() {
            var t = this.value();
            return null !== t && t === this._adjustValue(t)
        },
        _value: function(t, e) {
            var i;
            "" !== t && null !== (i = this._parse(t)) && (e || (i = this._adjustValue(i)),
            t = this._format(i)),
            this.element.val(t),
            this._refresh()
        },
        _destroy: function() {
            this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),
            this.uiSpinner.replaceWith(this.element)
        },
        stepUp: ht(function(t) {
            this._stepUp(t)
        }),
        _stepUp: function(t) {
            this._start() && (this._spin((t || 1) * this.options.step),
            this._stop())
        },
        stepDown: ht(function(t) {
            this._stepDown(t)
        }),
        _stepDown: function(t) {
            this._start() && (this._spin((t || 1) * -this.options.step),
            this._stop())
        },
        pageUp: ht(function(t) {
            this._stepUp((t || 1) * this.options.page)
        }),
        pageDown: ht(function(t) {
            this._stepDown((t || 1) * this.options.page)
        }),
        value: function(t) {
            if (!arguments.length)
                return this._parse(this.element.val());
            ht(this._value).call(this, t)
        },
        widget: function() {
            return this.uiSpinner
        }
    }),
    !1 !== V.uiBackCompat && V.widget("ui.spinner", V.ui.spinner, {
        _enhance: function() {
            this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())
        },
        _uiSpinnerHtml: function() {
            return "<span>"
        },
        _buttonHtml: function() {
            return "<a></a><a></a>"
        }
    });
    var ct;
    V.ui.spinner;
    V.widget("ui.tabs", {
        version: "1.13.1",
        delay: 300,
        options: {
            active: null,
            classes: {
                "ui-tabs": "ui-corner-all",
                "ui-tabs-nav": "ui-corner-all",
                "ui-tabs-panel": "ui-corner-bottom",
                "ui-tabs-tab": "ui-corner-top"
            },
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _isLocal: (ct = /#.*$/,
        function(t) {
            var e = t.href.replace(ct, "")
              , i = location.href.replace(ct, "");
            try {
                e = decodeURIComponent(e)
            } catch (t) {}
            try {
                i = decodeURIComponent(i)
            } catch (t) {}
            return 1 < t.hash.length && e === i
        }
        ),
        _create: function() {
            var e = this
              , t = this.options;
            this.running = !1,
            this._addClass("ui-tabs", "ui-widget ui-widget-content"),
            this._toggleClass("ui-tabs-collapsible", null, t.collapsible),
            this._processTabs(),
            t.active = this._initialActive(),
            Array.isArray(t.disabled) && (t.disabled = V.uniqueSort(t.disabled.concat(V.map(this.tabs.filter(".ui-state-disabled"), function(t) {
                return e.tabs.index(t)
            }))).sort()),
            !1 !== this.options.active && this.anchors.length ? this.active = this._findActive(t.active) : this.active = V(),
            this._refresh(),
            this.active.length && this.load(t.active)
        },
        _initialActive: function() {
            var i = this.options.active
              , t = this.options.collapsible
              , s = location.hash.substring(1);
            return null === i && (s && this.tabs.each(function(t, e) {
                if (V(e).attr("aria-controls") === s)
                    return i = t,
                    !1
            }),
            null !== (i = null === i ? this.tabs.index(this.tabs.filter(".ui-tabs-active")) : i) && -1 !== i || (i = !!this.tabs.length && 0)),
            !1 !== i && -1 === (i = this.tabs.index(this.tabs.eq(i))) && (i = !t && 0),
            i = !t && !1 === i && this.anchors.length ? 0 : i
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : V()
            }
        },
        _tabKeydown: function(t) {
            var e = V(V.ui.safeActiveElement(this.document[0])).closest("li")
              , i = this.tabs.index(e)
              , s = !0;
            if (!this._handlePageNav(t)) {
                switch (t.keyCode) {
                case V.ui.keyCode.RIGHT:
                case V.ui.keyCode.DOWN:
                    i++;
                    break;
                case V.ui.keyCode.UP:
                case V.ui.keyCode.LEFT:
                    s = !1,
                    i--;
                    break;
                case V.ui.keyCode.END:
                    i = this.anchors.length - 1;
                    break;
                case V.ui.keyCode.HOME:
                    i = 0;
                    break;
                case V.ui.keyCode.SPACE:
                    return t.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(i);
                case V.ui.keyCode.ENTER:
                    return t.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(i !== this.options.active && i);
                default:
                    return
                }
                t.preventDefault(),
                clearTimeout(this.activating),
                i = this._focusNextTab(i, s),
                t.ctrlKey || t.metaKey || (e.attr("aria-selected", "false"),
                this.tabs.eq(i).attr("aria-selected", "true"),
                this.activating = this._delay(function() {
                    this.option("active", i)
                }, this.delay))
            }
        },
        _panelKeydown: function(t) {
            this._handlePageNav(t) || t.ctrlKey && t.keyCode === V.ui.keyCode.UP && (t.preventDefault(),
            this.active.trigger("focus"))
        },
        _handlePageNav: function(t) {
            return t.altKey && t.keyCode === V.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
            !0) : t.altKey && t.keyCode === V.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
            !0) : void 0
        },
        _findNextTab: function(t, e) {
            var i = this.tabs.length - 1;
            for (; -1 !== V.inArray(t = (t = i < t ? 0 : t) < 0 ? i : t, this.options.disabled); )
                t = e ? t + 1 : t - 1;
            return t
        },
        _focusNextTab: function(t, e) {
            return t = this._findNextTab(t, e),
            this.tabs.eq(t).trigger("focus"),
            t
        },
        _setOption: function(t, e) {
            "active" !== t ? (this._super(t, e),
            "collapsible" === t && (this._toggleClass("ui-tabs-collapsible", null, e),
            e || !1 !== this.options.active || this._activate(0)),
            "event" === t && this._setupEvents(e),
            "heightStyle" === t && this._setupHeightStyle(e)) : this._activate(e)
        },
        _sanitizeSelector: function(t) {
            return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var t = this.options
              , e = this.tablist.children(":has(a[href])");
            t.disabled = V.map(e.filter(".ui-state-disabled"), function(t) {
                return e.index(t)
            }),
            this._processTabs(),
            !1 !== t.active && this.anchors.length ? this.active.length && !V.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1,
            this.active = V()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1,
            this.active = V()),
            this._refresh()
        },
        _refresh: function() {
            this._setOptionDisabled(this.options.disabled),
            this._setupEvents(this.options.event),
            this._setupHeightStyle(this.options.heightStyle),
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }),
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-hidden": "true"
            }),
            this.active.length ? (this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }),
            this._addClass(this.active, "ui-tabs-active", "ui-state-active"),
            this._getPanelForTab(this.active).show().attr({
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var l = this
              , t = this.tabs
              , e = this.anchors
              , i = this.panels;
            this.tablist = this._getList().attr("role", "tablist"),
            this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header"),
            this.tablist.on("mousedown" + this.eventNamespace, "> li", function(t) {
                V(this).is(".ui-state-disabled") && t.preventDefault()
            }).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
                V(this).closest("li").is(".ui-state-disabled") && this.blur()
            }),
            this.tabs = this.tablist.find("> li:has(a[href])").attr({
                role: "tab",
                tabIndex: -1
            }),
            this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default"),
            this.anchors = this.tabs.map(function() {
                return V("a", this)[0]
            }).attr({
                tabIndex: -1
            }),
            this._addClass(this.anchors, "ui-tabs-anchor"),
            this.panels = V(),
            this.anchors.each(function(t, e) {
                var i, s, n, o = V(e).uniqueId().attr("id"), a = V(e).closest("li"), r = a.attr("aria-controls");
                l._isLocal(e) ? (n = (i = e.hash).substring(1),
                s = l.element.find(l._sanitizeSelector(i))) : (n = a.attr("aria-controls") || V({}).uniqueId()[0].id,
                (s = l.element.find(i = "#" + n)).length || (s = l._createPanel(n)).insertAfter(l.panels[t - 1] || l.tablist),
                s.attr("aria-live", "polite")),
                s.length && (l.panels = l.panels.add(s)),
                r && a.data("ui-tabs-aria-controls", r),
                a.attr({
                    "aria-controls": n,
                    "aria-labelledby": o
                }),
                s.attr("aria-labelledby", o)
            }),
            this.panels.attr("role", "tabpanel"),
            this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content"),
            t && (this._off(t.not(this.tabs)),
            this._off(e.not(this.anchors)),
            this._off(i.not(this.panels)))
        },
        _getList: function() {
            return this.tablist || this.element.find("ol, ul").eq(0)
        },
        _createPanel: function(t) {
            return V("<div>").attr("id", t).data("ui-tabs-destroy", !0)
        },
        _setOptionDisabled: function(t) {
            var e, i;
            for (Array.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1),
            i = 0; e = this.tabs[i]; i++)
                e = V(e),
                !0 === t || -1 !== V.inArray(i, t) ? (e.attr("aria-disabled", "true"),
                this._addClass(e, null, "ui-state-disabled")) : (e.removeAttr("aria-disabled"),
                this._removeClass(e, null, "ui-state-disabled"));
            this.options.disabled = t,
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !0 === t)
        },
        _setupEvents: function(t) {
            var i = {};
            t && V.each(t.split(" "), function(t, e) {
                i[e] = "_eventHandler"
            }),
            this._off(this.anchors.add(this.tabs).add(this.panels)),
            this._on(!0, this.anchors, {
                click: function(t) {
                    t.preventDefault()
                }
            }),
            this._on(this.anchors, i),
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            }),
            this._on(this.panels, {
                keydown: "_panelKeydown"
            }),
            this._focusable(this.tabs),
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(t) {
            var i, e = this.element.parent();
            "fill" === t ? (i = e.height(),
            i -= this.element.outerHeight() - this.element.height(),
            this.element.siblings(":visible").each(function() {
                var t = V(this)
                  , e = t.css("position");
                "absolute" !== e && "fixed" !== e && (i -= t.outerHeight(!0))
            }),
            this.element.children().not(this.panels).each(function() {
                i -= V(this).outerHeight(!0)
            }),
            this.panels.each(function() {
                V(this).height(Math.max(0, i - V(this).innerHeight() + V(this).height()))
            }).css("overflow", "auto")) : "auto" === t && (i = 0,
            this.panels.each(function() {
                i = Math.max(i, V(this).height("").height())
            }).height(i))
        },
        _eventHandler: function(t) {
            var e = this.options
              , i = this.active
              , s = V(t.currentTarget).closest("li")
              , n = s[0] === i[0]
              , o = n && e.collapsible
              , a = o ? V() : this._getPanelForTab(s)
              , r = i.length ? this._getPanelForTab(i) : V()
              , i = {
                oldTab: i,
                oldPanel: r,
                newTab: o ? V() : s,
                newPanel: a
            };
            t.preventDefault(),
            s.hasClass("ui-state-disabled") || s.hasClass("ui-tabs-loading") || this.running || n && !e.collapsible || !1 === this._trigger("beforeActivate", t, i) || (e.active = !o && this.tabs.index(s),
            this.active = n ? V() : s,
            this.xhr && this.xhr.abort(),
            r.length || a.length || V.error("jQuery UI Tabs: Mismatching fragment identifier."),
            a.length && this.load(this.tabs.index(s), t),
            this._toggle(t, i))
        },
        _toggle: function(t, e) {
            var i = this
              , s = e.newPanel
              , n = e.oldPanel;
            function o() {
                i.running = !1,
                i._trigger("activate", t, e)
            }
            function a() {
                i._addClass(e.newTab.closest("li"), "ui-tabs-active", "ui-state-active"),
                s.length && i.options.show ? i._show(s, i.options.show, o) : (s.show(),
                o())
            }
            this.running = !0,
            n.length && this.options.hide ? this._hide(n, this.options.hide, function() {
                i._removeClass(e.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"),
                a()
            }) : (this._removeClass(e.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"),
            n.hide(),
            a()),
            n.attr("aria-hidden", "true"),
            e.oldTab.attr({
                "aria-selected": "false",
                "aria-expanded": "false"
            }),
            s.length && n.length ? e.oldTab.attr("tabIndex", -1) : s.length && this.tabs.filter(function() {
                return 0 === V(this).attr("tabIndex")
            }).attr("tabIndex", -1),
            s.attr("aria-hidden", "false"),
            e.newTab.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            })
        },
        _activate: function(t) {
            var t = this._findActive(t);
            t[0] !== this.active[0] && (t = (t = !t.length ? this.active : t).find(".ui-tabs-anchor")[0],
            this._eventHandler({
                target: t,
                currentTarget: t,
                preventDefault: V.noop
            }))
        },
        _findActive: function(t) {
            return !1 === t ? V() : this.tabs.eq(t)
        },
        _getIndex: function(t) {
            return t = "string" == typeof t ? this.anchors.index(this.anchors.filter("[href$='" + V.escapeSelector(t) + "']")) : t
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(),
            this.tablist.removeAttr("role").off(this.eventNamespace),
            this.anchors.removeAttr("role tabIndex").removeUniqueId(),
            this.tabs.add(this.panels).each(function() {
                V.data(this, "ui-tabs-destroy") ? V(this).remove() : V(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
            }),
            this.tabs.each(function() {
                var t = V(this)
                  , e = t.data("ui-tabs-aria-controls");
                e ? t.attr("aria-controls", e).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
            }),
            this.panels.show(),
            "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(i) {
            var t = this.options.disabled;
            !1 !== t && (t = void 0 !== i && (i = this._getIndex(i),
            Array.isArray(t) ? V.map(t, function(t) {
                return t !== i ? t : null
            }) : V.map(this.tabs, function(t, e) {
                return e !== i ? e : null
            })),
            this._setOptionDisabled(t))
        },
        disable: function(t) {
            var e = this.options.disabled;
            if (!0 !== e) {
                if (void 0 === t)
                    e = !0;
                else {
                    if (t = this._getIndex(t),
                    -1 !== V.inArray(t, e))
                        return;
                    e = Array.isArray(e) ? V.merge([t], e).sort() : [t]
                }
                this._setOptionDisabled(e)
            }
        },
        load: function(t, s) {
            t = this._getIndex(t);
            function n(t, e) {
                "abort" === e && o.panels.stop(!1, !0),
                o._removeClass(i, "ui-tabs-loading"),
                a.removeAttr("aria-busy"),
                t === o.xhr && delete o.xhr
            }
            var o = this
              , i = this.tabs.eq(t)
              , t = i.find(".ui-tabs-anchor")
              , a = this._getPanelForTab(i)
              , r = {
                tab: i,
                panel: a
            };
            this._isLocal(t[0]) || (this.xhr = V.ajax(this._ajaxSettings(t, s, r)),
            this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(i, "ui-tabs-loading"),
            a.attr("aria-busy", "true"),
            this.xhr.done(function(t, e, i) {
                setTimeout(function() {
                    a.html(t),
                    o._trigger("load", s, r),
                    n(i, e)
                }, 1)
            }).fail(function(t, e) {
                setTimeout(function() {
                    n(t, e)
                }, 1)
            })))
        },
        _ajaxSettings: function(t, i, s) {
            var n = this;
            return {
                url: t.attr("href").replace(/#.*$/, ""),
                beforeSend: function(t, e) {
                    return n._trigger("beforeLoad", i, V.extend({
                        jqXHR: t,
                        ajaxSettings: e
                    }, s))
                }
            }
        },
        _getPanelForTab: function(t) {
            t = V(t).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + t))
        }
    }),
    !1 !== V.uiBackCompat && V.widget("ui.tabs", V.ui.tabs, {
        _processTabs: function() {
            this._superApply(arguments),
            this._addClass(this.tabs, "ui-tab")
        }
    });
    V.ui.tabs;
    V.widget("ui.tooltip", {
        version: "1.13.1",
        options: {
            classes: {
                "ui-tooltip": "ui-corner-all ui-widget-shadow"
            },
            content: function() {
                var t = V(this).attr("title");
                return V("<a>").text(t).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            track: !1,
            close: null,
            open: null
        },
        _addDescribedBy: function(t, e) {
            var i = (t.attr("aria-describedby") || "").split(/\s+/);
            i.push(e),
            t.data("ui-tooltip-id", e).attr("aria-describedby", String.prototype.trim.call(i.join(" ")))
        },
        _removeDescribedBy: function(t) {
            var e = t.data("ui-tooltip-id")
              , i = (t.attr("aria-describedby") || "").split(/\s+/)
              , e = V.inArray(e, i);
            -1 !== e && i.splice(e, 1),
            t.removeData("ui-tooltip-id"),
            (i = String.prototype.trim.call(i.join(" "))) ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby")
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            }),
            this.tooltips = {},
            this.parents = {},
            this.liveRegion = V("<div>").attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).appendTo(this.document[0].body),
            this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"),
            this.disabledTitles = V([])
        },
        _setOption: function(t, e) {
            var i = this;
            this._super(t, e),
            "content" === t && V.each(this.tooltips, function(t, e) {
                i._updateContent(e.element)
            })
        },
        _setOptionDisabled: function(t) {
            this[t ? "_disable" : "_enable"]()
        },
        _disable: function() {
            var s = this;
            V.each(this.tooltips, function(t, e) {
                var i = V.Event("blur");
                i.target = i.currentTarget = e.element[0],
                s.close(i, !0)
            }),
            this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
                var t = V(this);
                if (t.is("[title]"))
                    return t.data("ui-tooltip-title", t.attr("title")).removeAttr("title")
            }))
        },
        _enable: function() {
            this.disabledTitles.each(function() {
                var t = V(this);
                t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
            }),
            this.disabledTitles = V([])
        },
        open: function(t) {
            var i = this
              , e = V(t ? t.target : this.element).closest(this.options.items);
            e.length && !e.data("ui-tooltip-id") && (e.attr("title") && e.data("ui-tooltip-title", e.attr("title")),
            e.data("ui-tooltip-open", !0),
            t && "mouseover" === t.type && e.parents().each(function() {
                var t, e = V(this);
                e.data("ui-tooltip-open") && ((t = V.Event("blur")).target = t.currentTarget = this,
                i.close(t, !0)),
                e.attr("title") && (e.uniqueId(),
                i.parents[this.id] = {
                    element: this,
                    title: e.attr("title")
                },
                e.attr("title", ""))
            }),
            this._registerCloseHandlers(t, e),
            this._updateContent(e, t))
        },
        _updateContent: function(e, i) {
            var t = this.options.content
              , s = this
              , n = i ? i.type : null;
            if ("string" == typeof t || t.nodeType || t.jquery)
                return this._open(i, e, t);
            (t = t.call(e[0], function(t) {
                s._delay(function() {
                    e.data("ui-tooltip-open") && (i && (i.type = n),
                    this._open(i, e, t))
                })
            })) && this._open(i, e, t)
        },
        _open: function(t, e, i) {
            var s, n, o, a = V.extend({}, this.options.position);
            function r(t) {
                a.of = t,
                n.is(":hidden") || n.position(a)
            }
            i && ((s = this._find(e)) ? s.tooltip.find(".ui-tooltip-content").html(i) : (e.is("[title]") && (t && "mouseover" === t.type ? e.attr("title", "") : e.removeAttr("title")),
            s = this._tooltip(e),
            n = s.tooltip,
            this._addDescribedBy(e, n.attr("id")),
            n.find(".ui-tooltip-content").html(i),
            this.liveRegion.children().hide(),
            (i = V("<div>").html(n.find(".ui-tooltip-content").html())).removeAttr("name").find("[name]").removeAttr("name"),
            i.removeAttr("id").find("[id]").removeAttr("id"),
            i.appendTo(this.liveRegion),
            this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, {
                mousemove: r
            }),
            r(t)) : n.position(V.extend({
                of: e
            }, this.options.position)),
            n.hide(),
            this._show(n, this.options.show),
            this.options.track && this.options.show && this.options.show.delay && (o = this.delayedShow = setInterval(function() {
                n.is(":visible") && (r(a.of),
                clearInterval(o))
            }, 13)),
            this._trigger("open", t, {
                tooltip: n
            })))
        },
        _registerCloseHandlers: function(t, e) {
            var i = {
                keyup: function(t) {
                    t.keyCode === V.ui.keyCode.ESCAPE && ((t = V.Event(t)).currentTarget = e[0],
                    this.close(t, !0))
                }
            };
            e[0] !== this.element[0] && (i.remove = function() {
                var t = this._find(e);
                t && this._removeTooltip(t.tooltip)
            }
            ),
            t && "mouseover" !== t.type || (i.mouseleave = "close"),
            t && "focusin" !== t.type || (i.focusout = "close"),
            this._on(!0, e, i)
        },
        close: function(t) {
            var e, i = this, s = V(t ? t.currentTarget : this.element), n = this._find(s);
            n ? (e = n.tooltip,
            n.closing || (clearInterval(this.delayedShow),
            s.data("ui-tooltip-title") && !s.attr("title") && s.attr("title", s.data("ui-tooltip-title")),
            this._removeDescribedBy(s),
            n.hiding = !0,
            e.stop(!0),
            this._hide(e, this.options.hide, function() {
                i._removeTooltip(V(this))
            }),
            s.removeData("ui-tooltip-open"),
            this._off(s, "mouseleave focusout keyup"),
            s[0] !== this.element[0] && this._off(s, "remove"),
            this._off(this.document, "mousemove"),
            t && "mouseleave" === t.type && V.each(this.parents, function(t, e) {
                V(e.element).attr("title", e.title),
                delete i.parents[t]
            }),
            n.closing = !0,
            this._trigger("close", t, {
                tooltip: e
            }),
            n.hiding || (n.closing = !1))) : s.removeData("ui-tooltip-open")
        },
        _tooltip: function(t) {
            var e = V("<div>").attr("role", "tooltip")
              , i = V("<div>").appendTo(e)
              , s = e.uniqueId().attr("id");
            return this._addClass(i, "ui-tooltip-content"),
            this._addClass(e, "ui-tooltip", "ui-widget ui-widget-content"),
            e.appendTo(this._appendTo(t)),
            this.tooltips[s] = {
                element: t,
                tooltip: e
            }
        },
        _find: function(t) {
            t = t.data("ui-tooltip-id");
            return t ? this.tooltips[t] : null
        },
        _removeTooltip: function(t) {
            clearInterval(this.delayedShow),
            t.remove(),
            delete this.tooltips[t.attr("id")]
        },
        _appendTo: function(t) {
            t = t.closest(".ui-front, dialog");
            return t = !t.length ? this.document[0].body : t
        },
        _destroy: function() {
            var s = this;
            V.each(this.tooltips, function(t, e) {
                var i = V.Event("blur")
                  , e = e.element;
                i.target = i.currentTarget = e[0],
                s.close(i, !0),
                V("#" + t).remove(),
                e.data("ui-tooltip-title") && (e.attr("title") || e.attr("title", e.data("ui-tooltip-title")),
                e.removeData("ui-tooltip-title"))
            }),
            this.liveRegion.remove()
        }
    }),
    !1 !== V.uiBackCompat && V.widget("ui.tooltip", V.ui.tooltip, {
        options: {
            tooltipClass: null
        },
        _tooltip: function() {
            var t = this._superApply(arguments);
            return this.options.tooltipClass && t.tooltip.addClass(this.options.tooltipClass),
            t
        }
    });
    V.ui.tooltip
});
!function(t, e, n, o) {
    "use strict";
    function i(t, e) {
        var o, i, a, s = [], r = 0;
        t && t.isDefaultPrevented() || (t.preventDefault(),
        e = e || {},
        t && t.data && (e = h(t.data.options, e)),
        o = e.$target || n(t.currentTarget).trigger("blur"),
        (a = n.fancybox.getInstance()) && a.$trigger && a.$trigger.is(o) || (e.selector ? s = n(e.selector) : (i = o.attr("data-fancybox") || "",
        i ? (s = t.data ? t.data.items : [],
        s = s.length ? s.filter('[data-fancybox="' + i + '"]') : n('[data-fancybox="' + i + '"]')) : s = [o]),
        r = n(s).index(o),
        r < 0 && (r = 0),
        a = n.fancybox.open(s, e, r),
        a.$trigger = o))
    }
    if (t.console = t.console || {
        info: function(t) {}
    },
    n) {
        if (n.fn.fancybox)
            return void console.info("fancyBox already initialized");
        var a = {
            closeExisting: !1,
            loop: !1,
            gutter: 50,
            keyboard: !0,
            preventCaptionOverlap: !0,
            arrows: !0,
            infobar: !0,
            smallBtn: "auto",
            toolbar: "auto",
            buttons: ["zoom", "slideShow", "thumbs", "close"],
            idleTime: 3,
            protect: !1,
            modal: !1,
            image: {
                preload: !1
            },
            ajax: {
                settings: {
                    data: {
                        fancybox: !0
                    }
                }
            },
            iframe: {
                tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                preload: !0,
                css: {},
                attr: {
                    scrolling: "auto"
                }
            },
            video: {
                tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                format: "",
                autoStart: !0
            },
            defaultType: "image",
            animationEffect: "zoom",
            animationDuration: 366,
            zoomOpacity: "auto",
            transitionEffect: "fade",
            transitionDuration: 366,
            slideClass: "",
            baseClass: "",
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
            spinnerTpl: '<div class="fancybox-loading"></div>',
            errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
            btnTpl: {
                download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
            },
            parentEl: "body",
            hideScrollbar: !0,
            autoFocus: !0,
            backFocus: !0,
            trapFocus: !0,
            fullScreen: {
                autoStart: !1
            },
            touch: {
                vertical: !0,
                momentum: !0
            },
            hash: null,
            media: {},
            slideShow: {
                autoStart: !1,
                speed: 3e3
            },
            thumbs: {
                autoStart: !1,
                hideOnClose: !0,
                parentEl: ".fancybox-container",
                axis: "y"
            },
            wheel: "auto",
            onInit: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop,
            onActivate: n.noop,
            onDeactivate: n.noop,
            clickContent: function(t, e) {
                return "image" === t.type && "zoom"
            },
            clickSlide: "close",
            clickOutside: "close",
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1,
            mobile: {
                preventCaptionOverlap: !1,
                idleTime: !1,
                clickContent: function(t, e) {
                    return "image" === t.type && "toggleControls"
                },
                clickSlide: function(t, e) {
                    return "image" === t.type ? "toggleControls" : "close"
                },
                dblclickContent: function(t, e) {
                    return "image" === t.type && "zoom"
                },
                dblclickSlide: function(t, e) {
                    return "image" === t.type && "zoom"
                }
            },
            lang: "en",
            i18n: {
                en: {
                    CLOSE: "Close",
                    NEXT: "Next",
                    PREV: "Previous",
                    ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                    PLAY_START: "Start slideshow",
                    PLAY_STOP: "Pause slideshow",
                    FULL_SCREEN: "Full screen",
                    THUMBS: "Thumbnails",
                    DOWNLOAD: "Download",
                    SHARE: "Share",
                    ZOOM: "Zoom"
                },
                de: {
                    CLOSE: "Schlie&szlig;en",
                    NEXT: "Weiter",
                    PREV: "Zur&uuml;ck",
                    ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                    PLAY_START: "Diaschau starten",
                    PLAY_STOP: "Diaschau beenden",
                    FULL_SCREEN: "Vollbild",
                    THUMBS: "Vorschaubilder",
                    DOWNLOAD: "Herunterladen",
                    SHARE: "Teilen",
                    ZOOM: "Vergr&ouml;&szlig;ern"
                }
            }
        }
          , s = n(t)
          , r = n(e)
          , c = 0
          , l = function(t) {
            return t && t.hasOwnProperty && t instanceof n
        }
          , d = function() {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                return t.setTimeout(e, 1e3 / 60)
            }
        }()
          , u = function() {
            return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
                t.clearTimeout(e)
            }
        }()
          , f = function() {
            var t, n = e.createElement("fakeelement"), o = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (t in o)
                if (void 0 !== n.style[t])
                    return o[t];
            return "transitionend"
        }()
          , p = function(t) {
            return t && t.length && t[0].offsetHeight
        }
          , h = function(t, e) {
            var o = n.extend(!0, {}, t, e);
            return n.each(e, function(t, e) {
                n.isArray(e) && (o[t] = e)
            }),
            o
        }
          , g = function(t) {
            var o, i;
            return !(!t || t.ownerDocument !== e) && (n(".fancybox-container").css("pointer-events", "none"),
            o = {
                x: t.getBoundingClientRect().left + t.offsetWidth / 2,
                y: t.getBoundingClientRect().top + t.offsetHeight / 2
            },
            i = e.elementFromPoint(o.x, o.y) === t,
            n(".fancybox-container").css("pointer-events", ""),
            i)
        }
          , b = function(t, e, o) {
            var i = this;
            i.opts = h({
                index: o
            }, n.fancybox.defaults),
            n.isPlainObject(e) && (i.opts = h(i.opts, e)),
            n.fancybox.isMobile && (i.opts = h(i.opts, i.opts.mobile)),
            i.id = i.opts.id || ++c,
            i.currIndex = parseInt(i.opts.index, 10) || 0,
            i.prevIndex = null,
            i.prevPos = null,
            i.currPos = 0,
            i.firstRun = !0,
            i.group = [],
            i.slides = {},
            i.addContent(t),
            i.group.length && i.init()
        };
        n.extend(b.prototype, {
            init: function() {
                var o, i, a = this, s = a.group[a.currIndex], r = s.opts;
                r.closeExisting && n.fancybox.close(!0),
                n("body").addClass("fancybox-active"),
                !n.fancybox.getInstance() && !1 !== r.hideScrollbar && !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (t.innerWidth - e.documentElement.clientWidth) + "px;}</style>"),
                n("body").addClass("compensate-for-scrollbar")),
                i = "",
                n.each(r.buttons, function(t, e) {
                    i += r.btnTpl[e] || ""
                }),
                o = n(a.translate(a, r.baseTpl.replace("{{buttons}}", i).replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight))).attr("id", "fancybox-container-" + a.id).addClass(r.baseClass).data("FancyBox", a).appendTo(r.parentEl),
                a.$refs = {
                    container: o
                },
                ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(t) {
                    a.$refs[t] = o.find(".fancybox-" + t)
                }),
                a.trigger("onInit"),
                a.activate(),
                a.jumpTo(a.currIndex)
            },
            translate: function(t, e) {
                var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
                return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
                    return void 0 === n[e] ? t : n[e]
                })
            },
            addContent: function(t) {
                var e, o = this, i = n.makeArray(t);
                n.each(i, function(t, e) {
                    var i, a, s, r, c, l = {}, d = {};
                    n.isPlainObject(e) ? (l = e,
                    d = e.opts || e) : "object" === n.type(e) && n(e).length ? (i = n(e),
                    d = i.data() || {},
                    d = n.extend(!0, {}, d, d.options),
                    d.$orig = i,
                    l.src = o.opts.src || d.src || i.attr("href"),
                    l.type || l.src || (l.type = "inline",
                    l.src = e)) : l = {
                        type: "html",
                        src: e + ""
                    },
                    l.opts = n.extend(!0, {}, o.opts, d),
                    n.isArray(d.buttons) && (l.opts.buttons = d.buttons),
                    n.fancybox.isMobile && l.opts.mobile && (l.opts = h(l.opts, l.opts.mobile)),
                    a = l.type || l.opts.type,
                    r = l.src || "",
                    !a && r && ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (a = "video",
                    l.opts.video.format || (l.opts.video.format = "video/" + ("ogv" === s[1] ? "ogg" : s[1]))) : r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? (a = "iframe",
                    l = n.extend(!0, l, {
                        contentType: "pdf",
                        opts: {
                            iframe: {
                                preload: !1
                            }
                        }
                    })) : "#" === r.charAt(0) && (a = "inline")),
                    a ? l.type = a : o.trigger("objectNeedsType", l),
                    l.contentType || (l.contentType = n.inArray(l.type, ["html", "inline", "ajax"]) > -1 ? "html" : l.type),
                    l.index = o.group.length,
                    "auto" == l.opts.smallBtn && (l.opts.smallBtn = n.inArray(l.type, ["html", "inline", "ajax"]) > -1),
                    "auto" === l.opts.toolbar && (l.opts.toolbar = !l.opts.smallBtn),
                    l.$thumb = l.opts.$thumb || null,
                    l.opts.$trigger && l.index === o.opts.index && (l.$thumb = l.opts.$trigger.find("img:first"),
                    l.$thumb.length && (l.opts.$orig = l.opts.$trigger)),
                    l.$thumb && l.$thumb.length || !l.opts.$orig || (l.$thumb = l.opts.$orig.find("img:first")),
                    l.$thumb && !l.$thumb.length && (l.$thumb = null),
                    l.thumb = l.opts.thumb || (l.$thumb ? l.$thumb[0].src : null),
                    "function" === n.type(l.opts.caption) && (l.opts.caption = l.opts.caption.apply(e, [o, l])),
                    "function" === n.type(o.opts.caption) && (l.opts.caption = o.opts.caption.apply(e, [o, l])),
                    l.opts.caption instanceof n || (l.opts.caption = void 0 === l.opts.caption ? "" : l.opts.caption + ""),
                    "ajax" === l.type && (c = r.split(/\s+/, 2),
                    c.length > 1 && (l.src = c.shift(),
                    l.opts.filter = c.shift())),
                    l.opts.modal && (l.opts = n.extend(!0, l.opts, {
                        trapFocus: !0,
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })),
                    o.group.push(l)
                }),
                Object.keys(o.slides).length && (o.updateControls(),
                (e = o.Thumbs) && e.isActive && (e.create(),
                e.focus()))
            },
            addEvents: function() {
                var e = this;
                e.removeEvents(),
                e.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    e.close(t)
                }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    e.previous()
                }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    e.next()
                }).on("click.fb", "[data-fancybox-zoom]", function(t) {
                    e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                }),
                s.on("orientationchange.fb resize.fb", function(t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? (e.requestId && u(e.requestId),
                    e.requestId = d(function() {
                        e.update(t)
                    })) : (e.current && "iframe" === e.current.type && e.$refs.stage.hide(),
                    setTimeout(function() {
                        e.$refs.stage.show(),
                        e.update(t)
                    }, n.fancybox.isMobile ? 600 : 250))
                }),
                r.on("keydown.fb", function(t) {
                    var o = n.fancybox ? n.fancybox.getInstance() : null
                      , i = o.current
                      , a = t.keyCode || t.which;
                    if (9 == a)
                        return void (i.opts.trapFocus && e.focus(t));
                    if (!(!i.opts.keyboard || t.ctrlKey || t.altKey || t.shiftKey || n(t.target).is("input,textarea,video,audio,select")))
                        return 8 === a || 27 === a ? (t.preventDefault(),
                        void e.close(t)) : 37 === a || 38 === a ? (t.preventDefault(),
                        void e.previous()) : 39 === a || 40 === a ? (t.preventDefault(),
                        void e.next()) : void e.trigger("afterKeydown", t, a)
                }),
                e.group[e.currIndex].opts.idleTime && (e.idleSecondsCounter = 0,
                r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(t) {
                    e.idleSecondsCounter = 0,
                    e.isIdle && e.showControls(),
                    e.isIdle = !1
                }),
                e.idleInterval = t.setInterval(function() {
                    ++e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime && !e.isDragging && (e.isIdle = !0,
                    e.idleSecondsCounter = 0,
                    e.hideControls())
                }, 1e3))
            },
            removeEvents: function() {
                var e = this;
                s.off("orientationchange.fb resize.fb"),
                r.off("keydown.fb .fb-idle"),
                this.$refs.container.off(".fb-close .fb-prev .fb-next"),
                e.idleInterval && (t.clearInterval(e.idleInterval),
                e.idleInterval = null)
            },
            previous: function(t) {
                return this.jumpTo(this.currPos - 1, t)
            },
            next: function(t) {
                return this.jumpTo(this.currPos + 1, t)
            },
            jumpTo: function(t, e) {
                var o, i, a, s, r, c, l, d, u, f = this, h = f.group.length;
                if (!(f.isDragging || f.isClosing || f.isAnimating && f.firstRun)) {
                    if (t = parseInt(t, 10),
                    !(a = f.current ? f.current.opts.loop : f.opts.loop) && (t < 0 || t >= h))
                        return !1;
                    if (o = f.firstRun = !Object.keys(f.slides).length,
                    r = f.current,
                    f.prevIndex = f.currIndex,
                    f.prevPos = f.currPos,
                    s = f.createSlide(t),
                    h > 1 && ((a || s.index < h - 1) && f.createSlide(t + 1),
                    (a || s.index > 0) && f.createSlide(t - 1)),
                    f.current = s,
                    f.currIndex = s.index,
                    f.currPos = s.pos,
                    f.trigger("beforeShow", o),
                    f.updateControls(),
                    s.forcedDuration = void 0,
                    n.isNumeric(e) ? s.forcedDuration = e : e = s.opts[o ? "animationDuration" : "transitionDuration"],
                    e = parseInt(e, 10),
                    i = f.isMoved(s),
                    s.$slide.addClass("fancybox-slide--current"),
                    o)
                        return s.opts.animationEffect && e && f.$refs.container.css("transition-duration", e + "ms"),
                        f.$refs.container.addClass("fancybox-is-open").trigger("focus"),
                        f.loadSlide(s),
                        void f.preload("image");
                    c = n.fancybox.getTranslate(r.$slide),
                    l = n.fancybox.getTranslate(f.$refs.stage),
                    n.each(f.slides, function(t, e) {
                        n.fancybox.stop(e.$slide, !0)
                    }),
                    r.pos !== s.pos && (r.isComplete = !1),
                    r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"),
                    i ? (u = c.left - (r.pos * c.width + r.pos * r.opts.gutter),
                    n.each(f.slides, function(t, o) {
                        o.$slide.removeClass("fancybox-animated").removeClass(function(t, e) {
                            return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                        });
                        var i = o.pos * c.width + o.pos * o.opts.gutter;
                        n.fancybox.setTranslate(o.$slide, {
                            top: 0,
                            left: i - l.left + u
                        }),
                        o.pos !== s.pos && o.$slide.addClass("fancybox-slide--" + (o.pos > s.pos ? "next" : "previous")),
                        p(o.$slide),
                        n.fancybox.animate(o.$slide, {
                            top: 0,
                            left: (o.pos - s.pos) * c.width + (o.pos - s.pos) * o.opts.gutter
                        }, e, function() {
                            o.$slide.css({
                                transform: "",
                                opacity: ""
                            }).removeClass("fancybox-slide--next fancybox-slide--previous"),
                            o.pos === f.currPos && f.complete()
                        })
                    })) : e && s.opts.transitionEffect && (d = "fancybox-animated fancybox-fx-" + s.opts.transitionEffect,
                    r.$slide.addClass("fancybox-slide--" + (r.pos > s.pos ? "next" : "previous")),
                    n.fancybox.animate(r.$slide, d, e, function() {
                        r.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")
                    }, !1)),
                    s.isLoaded ? f.revealContent(s) : f.loadSlide(s),
                    f.preload("image")
                }
            },
            createSlide: function(t) {
                var e, o, i = this;
                return o = t % i.group.length,
                o = o < 0 ? i.group.length + o : o,
                !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage),
                i.slides[t] = n.extend(!0, {}, i.group[o], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }),
                i.updateSlide(i.slides[t])),
                i.slides[t]
            },
            scaleToActual: function(t, e, o) {
                var i, a, s, r, c, l = this, d = l.current, u = d.$content, f = n.fancybox.getTranslate(d.$slide).width, p = n.fancybox.getTranslate(d.$slide).height, h = d.width, g = d.height;
                l.isAnimating || l.isMoved() || !u || "image" != d.type || !d.isLoaded || d.hasError || (l.isAnimating = !0,
                n.fancybox.stop(u),
                t = void 0 === t ? .5 * f : t,
                e = void 0 === e ? .5 * p : e,
                i = n.fancybox.getTranslate(u),
                i.top -= n.fancybox.getTranslate(d.$slide).top,
                i.left -= n.fancybox.getTranslate(d.$slide).left,
                r = h / i.width,
                c = g / i.height,
                a = .5 * f - .5 * h,
                s = .5 * p - .5 * g,
                h > f && (a = i.left * r - (t * r - t),
                a > 0 && (a = 0),
                a < f - h && (a = f - h)),
                g > p && (s = i.top * c - (e * c - e),
                s > 0 && (s = 0),
                s < p - g && (s = p - g)),
                l.updateCursor(h, g),
                n.fancybox.animate(u, {
                    top: s,
                    left: a,
                    scaleX: r,
                    scaleY: c
                }, o || 366, function() {
                    l.isAnimating = !1
                }),
                l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop())
            },
            scaleToFit: function(t) {
                var e, o = this, i = o.current, a = i.$content;
                o.isAnimating || o.isMoved() || !a || "image" != i.type || !i.isLoaded || i.hasError || (o.isAnimating = !0,
                n.fancybox.stop(a),
                e = o.getFitPos(i),
                o.updateCursor(e.width, e.height),
                n.fancybox.animate(a, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / a.width(),
                    scaleY: e.height / a.height()
                }, t || 366, function() {
                    o.isAnimating = !1
                }))
            },
            getFitPos: function(t) {
                var e, o, i, a, s = this, r = t.$content, c = t.$slide, l = t.width || t.opts.width, d = t.height || t.opts.height, u = {};
                return !!(t.isLoaded && r && r.length) && (e = n.fancybox.getTranslate(s.$refs.stage).width,
                o = n.fancybox.getTranslate(s.$refs.stage).height,
                e -= parseFloat(c.css("paddingLeft")) + parseFloat(c.css("paddingRight")) + parseFloat(r.css("marginLeft")) + parseFloat(r.css("marginRight")),
                o -= parseFloat(c.css("paddingTop")) + parseFloat(c.css("paddingBottom")) + parseFloat(r.css("marginTop")) + parseFloat(r.css("marginBottom")),
                l && d || (l = e,
                d = o),
                i = Math.min(1, e / l, o / d),
                l *= i,
                d *= i,
                l > e - .5 && (l = e),
                d > o - .5 && (d = o),
                "image" === t.type ? (u.top = Math.floor(.5 * (o - d)) + parseFloat(c.css("paddingTop")),
                u.left = Math.floor(.5 * (e - l)) + parseFloat(c.css("paddingLeft"))) : "video" === t.contentType && (a = t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9,
                d > l / a ? d = l / a : l > d * a && (l = d * a)),
                u.width = l,
                u.height = d,
                u)
            },
            update: function(t) {
                var e = this;
                n.each(e.slides, function(n, o) {
                    e.updateSlide(o, t)
                })
            },
            updateSlide: function(t, e) {
                var o = this
                  , i = t && t.$content
                  , a = t.width || t.opts.width
                  , s = t.height || t.opts.height
                  , r = t.$slide;
                o.adjustCaption(t),
                i && (a || s || "video" === t.contentType) && !t.hasError && (n.fancybox.stop(i),
                n.fancybox.setTranslate(i, o.getFitPos(t)),
                t.pos === o.currPos && (o.isAnimating = !1,
                o.updateCursor())),
                o.adjustLayout(t),
                r.length && (r.trigger("refresh"),
                t.pos === o.currPos && o.$refs.toolbar.add(o.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", r.get(0).scrollHeight > r.get(0).clientHeight)),
                o.trigger("onUpdate", t, e)
            },
            centerSlide: function(t) {
                var e = this
                  , o = e.current
                  , i = o.$slide;
                !e.isClosing && o && (i.siblings().css({
                    transform: "",
                    opacity: ""
                }),
                i.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"),
                n.fancybox.animate(i, {
                    top: 0,
                    left: 0,
                    opacity: 1
                }, void 0 === t ? 0 : t, function() {
                    i.css({
                        transform: "",
                        opacity: ""
                    }),
                    o.isComplete || e.complete()
                }, !1))
            },
            isMoved: function(t) {
                var e, o, i = t || this.current;
                return !!i && (o = n.fancybox.getTranslate(this.$refs.stage),
                e = n.fancybox.getTranslate(i.$slide),
                !i.$slide.hasClass("fancybox-animated") && (Math.abs(e.top - o.top) > .5 || Math.abs(e.left - o.left) > .5))
            },
            updateCursor: function(t, e) {
                var o, i, a = this, s = a.current, r = a.$refs.container;
                s && !a.isClosing && a.Guestures && (r.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"),
                o = a.canPan(t, e),
                i = !!o || a.isZoomable(),
                r.toggleClass("fancybox-is-zoomable", i),
                n("[data-fancybox-zoom]").prop("disabled", !i),
                o ? r.addClass("fancybox-can-pan") : i && ("zoom" === s.opts.clickContent || n.isFunction(s.opts.clickContent) && "zoom" == s.opts.clickContent(s)) ? r.addClass("fancybox-can-zoomIn") : s.opts.touch && (s.opts.touch.vertical || a.group.length > 1) && "video" !== s.contentType && r.addClass("fancybox-can-swipe"))
            },
            isZoomable: function() {
                var t, e = this, n = e.current;
                if (n && !e.isClosing && "image" === n.type && !n.hasError) {
                    if (!n.isLoaded)
                        return !0;
                    if ((t = e.getFitPos(n)) && (n.width > t.width || n.height > t.height))
                        return !0
                }
                return !1
            },
            isScaledDown: function(t, e) {
                var o = this
                  , i = !1
                  , a = o.current
                  , s = a.$content;
                return void 0 !== t && void 0 !== e ? i = t < a.width && e < a.height : s && (i = n.fancybox.getTranslate(s),
                i = i.width < a.width && i.height < a.height),
                i
            },
            canPan: function(t, e) {
                var o = this
                  , i = o.current
                  , a = null
                  , s = !1;
                return "image" === i.type && (i.isComplete || t && e) && !i.hasError && (s = o.getFitPos(i),
                void 0 !== t && void 0 !== e ? a = {
                    width: t,
                    height: e
                } : i.isComplete && (a = n.fancybox.getTranslate(i.$content)),
                a && s && (s = Math.abs(a.width - s.width) > 1.5 || Math.abs(a.height - s.height) > 1.5)),
                s
            },
            loadSlide: function(t) {
                var e, o, i, a = this;
                if (!t.isLoading && !t.isLoaded) {
                    if (t.isLoading = !0,
                    !1 === a.trigger("beforeLoad", t))
                        return t.isLoading = !1,
                        !1;
                    switch (e = t.type,
                    o = t.$slide,
                    o.off("refresh").trigger("onReset").addClass(t.opts.slideClass),
                    e) {
                    case "image":
                        a.setImage(t);
                        break;
                    case "iframe":
                        a.setIframe(t);
                        break;
                    case "html":
                        a.setContent(t, t.src || t.content);
                        break;
                    case "video":
                        a.setContent(t, t.opts.video.tpl.replace(/\{\{src\}\}/gi, t.src).replace("{{format}}", t.opts.videoFormat || t.opts.video.format || "").replace("{{poster}}", t.thumb || ""));
                        break;
                    case "inline":
                        n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
                        break;
                    case "ajax":
                        a.showLoading(t),
                        i = n.ajax(n.extend({}, t.opts.ajax.settings, {
                            url: t.src,
                            success: function(e, n) {
                                "success" === n && a.setContent(t, e)
                            },
                            error: function(e, n) {
                                e && "abort" !== n && a.setError(t)
                            }
                        })),
                        o.one("onReset", function() {
                            i.abort()
                        });
                        break;
                    default:
                        a.setError(t)
                    }
                    return !0
                }
            },
            setImage: function(t) {
                var o, i = this;
                setTimeout(function() {
                    var e = t.$image;
                    i.isClosing || !t.isLoading || e && e.length && e[0].complete || t.hasError || i.showLoading(t)
                }, 50),
                i.checkSrcset(t),
                t.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide.addClass("fancybox-slide--image")),
                !1 !== t.opts.preload && t.opts.width && t.opts.height && t.thumb && (t.width = t.opts.width,
                t.height = t.opts.height,
                o = e.createElement("img"),
                o.onerror = function() {
                    n(this).remove(),
                    t.$ghost = null
                }
                ,
                o.onload = function() {
                    i.afterLoad(t)
                }
                ,
                t.$ghost = n(o).addClass("fancybox-image").appendTo(t.$content).attr("src", t.thumb)),
                i.setBigImage(t)
            },
            checkSrcset: function(e) {
                var n, o, i, a, s = e.opts.srcset || e.opts.image.srcset;
                if (s) {
                    i = t.devicePixelRatio || 1,
                    a = t.innerWidth * i,
                    o = s.split(",").map(function(t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach(function(t, n) {
                            var o = parseInt(t.substring(0, t.length - 1), 10);
                            if (0 === n)
                                return e.url = t;
                            o && (e.value = o,
                            e.postfix = t[t.length - 1])
                        }),
                        e
                    }),
                    o.sort(function(t, e) {
                        return t.value - e.value
                    });
                    for (var r = 0; r < o.length; r++) {
                        var c = o[r];
                        if ("w" === c.postfix && c.value >= a || "x" === c.postfix && c.value >= i) {
                            n = c;
                            break
                        }
                    }
                    !n && o.length && (n = o[o.length - 1]),
                    n && (e.src = n.url,
                    e.width && e.height && "w" == n.postfix && (e.height = e.width / e.height * n.value,
                    e.width = n.value),
                    e.opts.srcset = s)
                }
            },
            setBigImage: function(t) {
                var o = this
                  , i = e.createElement("img")
                  , a = n(i);
                t.$image = a.one("error", function() {
                    o.setError(t)
                }).one("load", function() {
                    var e;
                    t.$ghost || (o.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight),
                    o.afterLoad(t)),
                    o.isClosing || (t.opts.srcset && (e = t.opts.sizes,
                    e && "auto" !== e || (e = (t.width / t.height > 1 && s.width() / s.height() > 1 ? "100" : Math.round(t.width / t.height * 100)) + "vw"),
                    a.attr("sizes", e).attr("srcset", t.opts.srcset)),
                    t.$ghost && setTimeout(function() {
                        t.$ghost && !o.isClosing && t.$ghost.hide()
                    }, Math.min(300, Math.max(1e3, t.height / 1600))),
                    o.hideLoading(t))
                }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content),
                (i.complete || "complete" == i.readyState) && a.naturalWidth && a.naturalHeight ? a.trigger("load") : i.error && a.trigger("error")
            },
            resolveImageSlideSize: function(t, e, n) {
                var o = parseInt(t.opts.width, 10)
                  , i = parseInt(t.opts.height, 10);
                t.width = e,
                t.height = n,
                o > 0 && (t.width = o,
                t.height = Math.floor(o * n / e)),
                i > 0 && (t.width = Math.floor(i * e / n),
                t.height = i)
            },
            setIframe: function(t) {
                var e, o = this, i = t.opts.iframe, a = t.$slide;
                t.$content = n('<div class="fancybox-content' + (i.preload ? " fancybox-is-hidden" : "") + '"></div>').css(i.css).appendTo(a),
                a.addClass("fancybox-slide--" + t.contentType),
                t.$iframe = e = n(i.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(i.attr).appendTo(t.$content),
                i.preload ? (o.showLoading(t),
                e.on("load.fb error.fb", function(e) {
                    this.isReady = 1,
                    t.$slide.trigger("refresh"),
                    o.afterLoad(t)
                }),
                a.on("refresh.fb", function() {
                    var n, o, s = t.$content, r = i.css.width, c = i.css.height;
                    if (1 === e[0].isReady) {
                        try {
                            n = e.contents(),
                            o = n.find("body")
                        } catch (t) {}
                        o && o.length && o.children().length && (a.css("overflow", "visible"),
                        s.css({
                            width: "100%",
                            "max-width": "100%",
                            height: "9999px"
                        }),
                        void 0 === r && (r = Math.ceil(Math.max(o[0].clientWidth, o.outerWidth(!0)))),
                        s.css("width", r || "").css("max-width", ""),
                        void 0 === c && (c = Math.ceil(Math.max(o[0].clientHeight, o.outerHeight(!0)))),
                        s.css("height", c || ""),
                        a.css("overflow", "auto")),
                        s.removeClass("fancybox-is-hidden")
                    }
                })) : o.afterLoad(t),
                e.attr("src", t.src),
                a.one("onReset", function() {
                    try {
                        n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                    } catch (t) {}
                    n(this).off("refresh.fb").empty(),
                    t.isLoaded = !1,
                    t.isRevealed = !1
                })
            },
            setContent: function(t, e) {
                var o = this;
                o.isClosing || (o.hideLoading(t),
                t.$content && n.fancybox.stop(t.$content),
                t.$slide.empty(),
                l(e) && e.parent().length ? ((e.hasClass("fancybox-content") || e.parent().hasClass("fancybox-content")) && e.parents(".fancybox-slide").trigger("onReset"),
                t.$placeholder = n("<div>").hide().insertAfter(e),
                e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents()),
                t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))),
                t.$slide.one("onReset", function() {
                    n(this).find("video,audio").trigger("pause"),
                    t.$placeholder && (t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(),
                    t.$placeholder = null),
                    t.$smallBtn && (t.$smallBtn.remove(),
                    t.$smallBtn = null),
                    t.hasError || (n(this).empty(),
                    t.isLoaded = !1,
                    t.isRevealed = !1)
                }),
                n(e).appendTo(t.$slide),
                n(e).is("video,audio") && (n(e).addClass("fancybox-video"),
                n(e).wrap("<div></div>"),
                t.contentType = "video",
                t.opts.width = t.opts.width || n(e).attr("width"),
                t.opts.height = t.opts.height || n(e).attr("height")),
                t.$content = t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(),
                t.$content.siblings().hide(),
                t.$content.length || (t.$content = t.$slide.wrapInner("<div></div>").children().first()),
                t.$content.addClass("fancybox-content"),
                t.$slide.addClass("fancybox-slide--" + t.contentType),
                o.afterLoad(t))
            },
            setError: function(t) {
                t.hasError = !0,
                t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"),
                t.contentType = "html",
                this.setContent(t, this.translate(t, t.opts.errorTpl)),
                t.pos === this.currPos && (this.isAnimating = !1)
            },
            showLoading: function(t) {
                var e = this;
                (t = t || e.current) && !t.$spinner && (t.$spinner = n(e.translate(e, e.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))
            },
            hideLoading: function(t) {
                var e = this;
                (t = t || e.current) && t.$spinner && (t.$spinner.stop().remove(),
                delete t.$spinner)
            },
            afterLoad: function(t) {
                var e = this;
                e.isClosing || (t.isLoading = !1,
                t.isLoaded = !0,
                e.trigger("afterLoad", t),
                e.hideLoading(t),
                !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)),
                t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function(t) {
                    return 2 == t.button && t.preventDefault(),
                    !0
                }),
                "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),
                e.adjustCaption(t),
                e.adjustLayout(t),
                t.pos === e.currPos && e.updateCursor(),
                e.revealContent(t))
            },
            adjustCaption: function(t) {
                var e, n = this, o = t || n.current, i = o.opts.caption, a = o.opts.preventCaptionOverlap, s = n.$refs.caption, r = !1;
                s.toggleClass("fancybox-caption--separate", a),
                a && i && i.length && (o.pos !== n.currPos ? (e = s.clone().appendTo(s.parent()),
                e.children().eq(0).empty().html(i),
                r = e.outerHeight(!0),
                e.empty().remove()) : n.$caption && (r = n.$caption.outerHeight(!0)),
                o.$slide.css("padding-bottom", r || ""))
            },
            adjustLayout: function(t) {
                var e, n, o, i, a = this, s = t || a.current;
                s.isLoaded && !0 !== s.opts.disableLayoutFix && (s.$content.css("margin-bottom", ""),
                s.$content.outerHeight() > s.$slide.height() + .5 && (o = s.$slide[0].style["padding-bottom"],
                i = s.$slide.css("padding-bottom"),
                parseFloat(i) > 0 && (e = s.$slide[0].scrollHeight,
                s.$slide.css("padding-bottom", 0),
                Math.abs(e - s.$slide[0].scrollHeight) < 1 && (n = i),
                s.$slide.css("padding-bottom", o))),
                s.$content.css("margin-bottom", n))
            },
            revealContent: function(t) {
                var e, o, i, a, s = this, r = t.$slide, c = !1, l = !1, d = s.isMoved(t), u = t.isRevealed;
                return t.isRevealed = !0,
                e = t.opts[s.firstRun ? "animationEffect" : "transitionEffect"],
                i = t.opts[s.firstRun ? "animationDuration" : "transitionDuration"],
                i = parseInt(void 0 === t.forcedDuration ? i : t.forcedDuration, 10),
                !d && t.pos === s.currPos && i || (e = !1),
                "zoom" === e && (t.pos === s.currPos && i && "image" === t.type && !t.hasError && (l = s.getThumbPos(t)) ? c = s.getFitPos(t) : e = "fade"),
                "zoom" === e ? (s.isAnimating = !0,
                c.scaleX = c.width / l.width,
                c.scaleY = c.height / l.height,
                a = t.opts.zoomOpacity,
                "auto" == a && (a = Math.abs(t.width / t.height - l.width / l.height) > .1),
                a && (l.opacity = .1,
                c.opacity = 1),
                n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), l),
                p(t.$content),
                void n.fancybox.animate(t.$content, c, i, function() {
                    s.isAnimating = !1,
                    s.complete()
                })) : (s.updateSlide(t),
                e ? (n.fancybox.stop(r),
                o = "fancybox-slide--" + (t.pos >= s.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + e,
                r.addClass(o).removeClass("fancybox-slide--current"),
                t.$content.removeClass("fancybox-is-hidden"),
                p(r),
                "image" !== t.type && t.$content.hide().show(0),
                void n.fancybox.animate(r, "fancybox-slide--current", i, function() {
                    r.removeClass(o).css({
                        transform: "",
                        opacity: ""
                    }),
                    t.pos === s.currPos && s.complete()
                }, !0)) : (t.$content.removeClass("fancybox-is-hidden"),
                u || !d || "image" !== t.type || t.hasError || t.$content.hide().fadeIn("fast"),
                void (t.pos === s.currPos && s.complete())))
            },
            getThumbPos: function(t) {
                var e, o, i, a, s, r = !1, c = t.$thumb;
                return !(!c || !g(c[0])) && (e = n.fancybox.getTranslate(c),
                o = parseFloat(c.css("border-top-width") || 0),
                i = parseFloat(c.css("border-right-width") || 0),
                a = parseFloat(c.css("border-bottom-width") || 0),
                s = parseFloat(c.css("border-left-width") || 0),
                r = {
                    top: e.top + o,
                    left: e.left + s,
                    width: e.width - i - s,
                    height: e.height - o - a,
                    scaleX: 1,
                    scaleY: 1
                },
                e.width > 0 && e.height > 0 && r)
            },
            complete: function() {
                var t, e = this, o = e.current, i = {};
                !e.isMoved() && o.isLoaded && (o.isComplete || (o.isComplete = !0,
                o.$slide.siblings().trigger("onReset"),
                e.preload("inline"),
                p(o.$slide),
                o.$slide.addClass("fancybox-slide--complete"),
                n.each(e.slides, function(t, o) {
                    o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide),
                    o.$slide.off().remove())
                }),
                e.slides = i),
                e.isAnimating = !1,
                e.updateCursor(),
                e.trigger("afterShow"),
                o.opts.video.autoStart && o.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function() {
                    Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(),
                    e.next()
                }),
                o.opts.autoFocus && "html" === o.contentType && (t = o.$content.find("input[autofocus]:enabled:visible:first"),
                t.length ? t.trigger("focus") : e.focus(null, !0)),
                o.$slide.scrollTop(0).scrollLeft(0))
            },
            preload: function(t) {
                var e, n, o = this;
                o.group.length < 2 || (n = o.slides[o.currPos + 1],
                e = o.slides[o.currPos - 1],
                e && e.type === t && o.loadSlide(e),
                n && n.type === t && o.loadSlide(n))
            },
            focus: function(t, o) {
                var i, a, s = this, r = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                s.isClosing || (i = !t && s.current && s.current.isComplete ? s.current.$slide.find("*:visible" + (o ? ":not(.fancybox-close-small)" : "")) : s.$refs.container.find("*:visible"),
                i = i.filter(r).filter(function() {
                    return "hidden" !== n(this).css("visibility") && !n(this).hasClass("disabled")
                }),
                i.length ? (a = i.index(e.activeElement),
                t && t.shiftKey ? (a < 0 || 0 == a) && (t.preventDefault(),
                i.eq(i.length - 1).trigger("focus")) : (a < 0 || a == i.length - 1) && (t && t.preventDefault(),
                i.eq(0).trigger("focus"))) : s.$refs.container.trigger("focus"))
            },
            activate: function() {
                var t = this;
                n(".fancybox-container").each(function() {
                    var e = n(this).data("FancyBox");
                    e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"),
                    e.removeEvents(),
                    e.isVisible = !1)
                }),
                t.isVisible = !0,
                (t.current || t.isIdle) && (t.update(),
                t.updateControls()),
                t.trigger("onActivate"),
                t.addEvents()
            },
            close: function(t, e) {
                var o, i, a, s, r, c, l, u = this, f = u.current, h = function() {
                    u.cleanUp(t)
                };
                return !u.isClosing && (u.isClosing = !0,
                !1 === u.trigger("beforeClose", t) ? (u.isClosing = !1,
                d(function() {
                    u.update()
                }),
                !1) : (u.removeEvents(),
                a = f.$content,
                o = f.opts.animationEffect,
                i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0,
                f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),
                !0 !== t ? n.fancybox.stop(f.$slide) : o = !1,
                f.$slide.siblings().trigger("onReset").remove(),
                i && u.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", i + "ms"),
                u.hideLoading(f),
                u.hideControls(!0),
                u.updateCursor(),
                "zoom" !== o || a && i && "image" === f.type && !u.isMoved() && !f.hasError && (l = u.getThumbPos(f)) || (o = "fade"),
                "zoom" === o ? (n.fancybox.stop(a),
                s = n.fancybox.getTranslate(a),
                c = {
                    top: s.top,
                    left: s.left,
                    scaleX: s.width / l.width,
                    scaleY: s.height / l.height,
                    width: l.width,
                    height: l.height
                },
                r = f.opts.zoomOpacity,
                "auto" == r && (r = Math.abs(f.width / f.height - l.width / l.height) > .1),
                r && (l.opacity = 0),
                n.fancybox.setTranslate(a, c),
                p(a),
                n.fancybox.animate(a, l, i, h),
                !0) : (o && i ? n.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + o, i, h) : !0 === t ? setTimeout(h, i) : h(),
                !0)))
            },
            cleanUp: function(e) {
                var o, i, a, s = this, r = s.current.opts.$orig;
                s.current.$slide.trigger("onReset"),
                s.$refs.container.empty().remove(),
                s.trigger("afterClose", e),
                s.current.opts.backFocus && (r && r.length && r.is(":visible") || (r = s.$trigger),
                r && r.length && (i = t.scrollX,
                a = t.scrollY,
                r.trigger("focus"),
                n("html, body").scrollTop(a).scrollLeft(i))),
                s.current = null,
                o = n.fancybox.getInstance(),
                o ? o.activate() : (n("body").removeClass("fancybox-active compensate-for-scrollbar"),
                n("#fancybox-style-noscroll").remove())
            },
            trigger: function(t, e) {
                var o, i = Array.prototype.slice.call(arguments, 1), a = this, s = e && e.opts ? e : a.current;
                if (s ? i.unshift(s) : s = a,
                i.unshift(a),
                n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)),
                !1 === o)
                    return o;
                "afterClose" !== t && a.$refs ? a.$refs.container.trigger(t + ".fb", i) : r.trigger(t + ".fb", i)
            },
            updateControls: function() {
                var t = this
                  , o = t.current
                  , i = o.index
                  , a = t.$refs.container
                  , s = t.$refs.caption
                  , r = o.opts.caption;
                o.$slide.trigger("refresh"),
                r && r.length ? (t.$caption = s,
                s.children().eq(0).html(r)) : t.$caption = null,
                t.hasHiddenControls || t.isIdle || t.showControls(),
                a.find("[data-fancybox-count]").html(t.group.length),
                a.find("[data-fancybox-index]").html(i + 1),
                a.find("[data-fancybox-prev]").prop("disabled", !o.opts.loop && i <= 0),
                a.find("[data-fancybox-next]").prop("disabled", !o.opts.loop && i >= t.group.length - 1),
                "image" === o.type ? a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", o.opts.image.src || o.src).show() : o.opts.toolbar && a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(),
                n(e.activeElement).is(":hidden,[disabled]") && t.$refs.container.trigger("focus")
            },
            hideControls: function(t) {
                var e = this
                  , n = ["infobar", "toolbar", "nav"];
                !t && e.current.opts.preventCaptionOverlap || n.push("caption"),
                this.$refs.container.removeClass(n.map(function(t) {
                    return "fancybox-show-" + t
                }).join(" ")),
                this.hasHiddenControls = !0
            },
            showControls: function() {
                var t = this
                  , e = t.current ? t.current.opts : t.opts
                  , n = t.$refs.container;
                t.hasHiddenControls = !1,
                t.idleSecondsCounter = 0,
                n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-caption", !!t.$caption).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal)
            },
            toggleControls: function() {
                this.hasHiddenControls ? this.showControls() : this.hideControls()
            }
        }),
        n.fancybox = {
            version: "3.5.7",
            defaults: a,
            getInstance: function(t) {
                var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox")
                  , o = Array.prototype.slice.call(arguments, 1);
                return e instanceof b && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o),
                e)
            },
            open: function(t, e, n) {
                return new b(t,e,n)
            },
            close: function(t) {
                var e = this.getInstance();
                e && (e.close(),
                !0 === t && this.close(t))
            },
            destroy: function() {
                this.close(!0),
                r.add("body").off("click.fb-start", "**")
            },
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            use3d: function() {
                var n = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(n) && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
            }(),
            getTranslate: function(t) {
                var e;
                return !(!t || !t.length) && (e = t[0].getBoundingClientRect(),
                {
                    top: e.top || 0,
                    left: e.left || 0,
                    width: e.width,
                    height: e.height,
                    opacity: parseFloat(t.css("opacity"))
                })
            },
            setTranslate: function(t, e) {
                var n = ""
                  , o = {};
                if (t && e)
                    return void 0 === e.left && void 0 === e.top || (n = (void 0 === e.left ? t.position().left : e.left) + "px, " + (void 0 === e.top ? t.position().top : e.top) + "px",
                    n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"),
                    void 0 !== e.scaleX && void 0 !== e.scaleY ? n += " scale(" + e.scaleX + ", " + e.scaleY + ")" : void 0 !== e.scaleX && (n += " scaleX(" + e.scaleX + ")"),
                    n.length && (o.transform = n),
                    void 0 !== e.opacity && (o.opacity = e.opacity),
                    void 0 !== e.width && (o.width = e.width),
                    void 0 !== e.height && (o.height = e.height),
                    t.css(o)
            },
            animate: function(t, e, o, i, a) {
                var s, r = this;
                n.isFunction(o) && (i = o,
                o = null),
                r.stop(t),
                s = r.getTranslate(t),
                t.on(f, function(c) {
                    (!c || !c.originalEvent || t.is(c.originalEvent.target) && "z-index" != c.originalEvent.propertyName) && (r.stop(t),
                    n.isNumeric(o) && t.css("transition-duration", ""),
                    n.isPlainObject(e) ? void 0 !== e.scaleX && void 0 !== e.scaleY && r.setTranslate(t, {
                        top: e.top,
                        left: e.left,
                        width: s.width * e.scaleX,
                        height: s.height * e.scaleY,
                        scaleX: 1,
                        scaleY: 1
                    }) : !0 !== a && t.removeClass(e),
                    n.isFunction(i) && i(c))
                }),
                n.isNumeric(o) && t.css("transition-duration", o + "ms"),
                n.isPlainObject(e) ? (void 0 !== e.scaleX && void 0 !== e.scaleY && (delete e.width,
                delete e.height,
                t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")),
                n.fancybox.setTranslate(t, e)) : t.addClass(e),
                t.data("timer", setTimeout(function() {
                    t.trigger(f)
                }, o + 33))
            },
            stop: function(t, e) {
                t && t.length && (clearTimeout(t.data("timer")),
                e && t.trigger(f),
                t.off(f).css("transition-duration", ""),
                t.parent().removeClass("fancybox-is-scaling"))
            }
        },
        n.fn.fancybox = function(t) {
            var e;
            return t = t || {},
            e = t.selector || !1,
            e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
                options: t
            }, i) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, i),
            this
        }
        ,
        r.on("click.fb-start", "[data-fancybox]", i),
        r.on("click.fb-start", "[data-fancybox-trigger]", function(t) {
            n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]').eq(n(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
                $trigger: n(this)
            })
        }),
        function() {
            var t = null;
            r.on("mousedown mouseup focus blur", ".fancybox-button", function(e) {
                switch (e.type) {
                case "mousedown":
                    t = n(this);
                    break;
                case "mouseup":
                    t = null;
                    break;
                case "focusin":
                    n(".fancybox-button").removeClass("fancybox-focus"),
                    n(this).is(t) || n(this).is("[disabled]") || n(this).addClass("fancybox-focus");
                    break;
                case "focusout":
                    n(".fancybox-button").removeClass("fancybox-focus")
                }
            })
        }()
    }
}(window, document, jQuery),
function(t) {
    "use strict";
    var e = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {
                autoplay: 1,
                autohide: 1,
                fs: 1,
                rel: 0,
                hd: 1,
                wmode: "transparent",
                enablejsapi: 1,
                html5: 1
            },
            paramPlace: 8,
            type: "iframe",
            url: "https://www.youtube-nocookie.com/embed/$4",
            thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {
                autoplay: 1,
                hd: 1,
                show_title: 1,
                show_byline: 1,
                show_portrait: 0,
                fullscreen: 1
            },
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function(t) {
                return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function(t) {
                return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
            }
        }
    }
      , n = function(e, n, o) {
        if (e)
            return o = o || "",
            "object" === t.type(o) && (o = t.param(o, !0)),
            t.each(n, function(t, n) {
                e = e.replace("$" + t, n || "")
            }),
            o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o),
            e
    };
    t(document).on("objectNeedsType.fb", function(o, i, a) {
        var s, r, c, l, d, u, f, p = a.src || "", h = !1;
        s = t.extend(!0, {}, e, a.opts.media),
        t.each(s, function(e, o) {
            if (c = p.match(o.matcher)) {
                if (h = o.type,
                f = e,
                u = {},
                o.paramPlace && c[o.paramPlace]) {
                    d = c[o.paramPlace],
                    "?" == d[0] && (d = d.substring(1)),
                    d = d.split("&");
                    for (var i = 0; i < d.length; ++i) {
                        var s = d[i].split("=", 2);
                        2 == s.length && (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                    }
                }
                return l = t.extend(!0, {}, o.params, a.opts[e], u),
                p = "function" === t.type(o.url) ? o.url.call(this, c, l, a) : n(o.url, c, l),
                r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, a) : n(o.thumb, c),
                "youtube" === e ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function(t, e, n, o) {
                    return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                }) : "vimeo" === e && (p = p.replace("&%23", "#")),
                !1
            }
        }),
        h ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = r),
        "iframe" === h && (a.opts = t.extend(!0, a.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        })),
        t.extend(a, {
            type: h,
            src: p,
            origSrc: a.src,
            contentSource: f,
            contentType: "image" === h ? "image" : "gmap_place" == f || "gmap_search" == f ? "map" : "video"
        })) : p && (a.type = a.opts.defaultType)
    });
    var o = {
        youtube: {
            src: "https://www.youtube.com/iframe_api",
            class: "YT",
            loading: !1,
            loaded: !1
        },
        vimeo: {
            src: "https://player.vimeo.com/api/player.js",
            class: "Vimeo",
            loading: !1,
            loaded: !1
        },
        load: function(t) {
            var e, n = this;
            if (this[t].loaded)
                return void setTimeout(function() {
                    n.done(t)
                });
            this[t].loading || (this[t].loading = !0,
            e = document.createElement("script"),
            e.type = "text/javascript",
            e.src = this[t].src,
            "youtube" === t ? window.onYouTubeIframeAPIReady = function() {
                n[t].loaded = !0,
                n.done(t)
            }
            : e.onload = function() {
                n[t].loaded = !0,
                n.done(t)
            }
            ,
            document.body.appendChild(e))
        },
        done: function(e) {
            var n, o, i;
            "youtube" === e && delete window.onYouTubeIframeAPIReady,
            (n = t.fancybox.getInstance()) && (o = n.current.$content.find("iframe"),
            "youtube" === e && void 0 !== YT && YT ? i = new YT.Player(o.attr("id"),{
                events: {
                    onStateChange: function(t) {
                        0 == t.data && n.next()
                    }
                }
            }) : "vimeo" === e && void 0 !== Vimeo && Vimeo && (i = new Vimeo.Player(o),
            i.on("ended", function() {
                n.next()
            })))
        }
    };
    t(document).on({
        "afterShow.fb": function(t, e, n) {
            e.group.length > 1 && ("youtube" === n.contentSource || "vimeo" === n.contentSource) && o.load(n.contentSource)
        }
    })
}(jQuery),
function(t, e, n) {
    "use strict";
    var o = function() {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
            return t.setTimeout(e, 1e3 / 60)
        }
    }()
      , i = function() {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
            t.clearTimeout(e)
        }
    }()
      , a = function(e) {
        var n = [];
        e = e.originalEvent || e || t.e,
        e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
        for (var o in e)
            e[o].pageX ? n.push({
                x: e[o].pageX,
                y: e[o].pageY
            }) : e[o].clientX && n.push({
                x: e[o].clientX,
                y: e[o].clientY
            });
        return n
    }
      , s = function(t, e, n) {
        return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
    }
      , r = function(t) {
        if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || n.isFunction(t.get(0).onclick) || t.data("selectable"))
            return !0;
        for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
            if ("data-fancybox-" === o[e].nodeName.substr(0, 14))
                return !0;
        return !1
    }
      , c = function(e) {
        var n = t.getComputedStyle(e)["overflow-y"]
          , o = t.getComputedStyle(e)["overflow-x"]
          , i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight
          , a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
        return i || a
    }
      , l = function(t) {
        for (var e = !1; ; ) {
            if (e = c(t.get(0)))
                break;
            if (t = t.parent(),
            !t.length || t.hasClass("fancybox-stage") || t.is("body"))
                break
        }
        return e
    }
      , d = function(t) {
        var e = this;
        e.instance = t,
        e.$bg = t.$refs.bg,
        e.$stage = t.$refs.stage,
        e.$container = t.$refs.container,
        e.destroy(),
        e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
    };
    d.prototype.destroy = function() {
        var t = this;
        t.$container.off(".fb.touch"),
        n(e).off(".fb.touch"),
        t.requestId && (i(t.requestId),
        t.requestId = null),
        t.tapped && (clearTimeout(t.tapped),
        t.tapped = null)
    }
    ,
    d.prototype.ontouchstart = function(o) {
        var i = this
          , c = n(o.target)
          , d = i.instance
          , u = d.current
          , f = u.$slide
          , p = u.$content
          , h = "touchstart" == o.type;
        if (h && i.$container.off("mousedown.fb.touch"),
        (!o.originalEvent || 2 != o.originalEvent.button) && f.length && c.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left))) {
            if (!u || d.isAnimating || u.$slide.hasClass("fancybox-animated"))
                return o.stopPropagation(),
                void o.preventDefault();
            i.realPoints = i.startPoints = a(o),
            i.startPoints.length && (u.touch && o.stopPropagation(),
            i.startEvent = o,
            i.canTap = !0,
            i.$target = c,
            i.$content = p,
            i.opts = u.opts.touch,
            i.isPanning = !1,
            i.isSwiping = !1,
            i.isZooming = !1,
            i.isScrolling = !1,
            i.canPan = d.canPan(),
            i.startTime = (new Date).getTime(),
            i.distanceX = i.distanceY = i.distance = 0,
            i.canvasWidth = Math.round(f[0].clientWidth),
            i.canvasHeight = Math.round(f[0].clientHeight),
            i.contentLastPos = null,
            i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
                top: 0,
                left: 0
            },
            i.sliderStartPos = n.fancybox.getTranslate(f),
            i.stagePos = n.fancybox.getTranslate(d.$refs.stage),
            i.sliderStartPos.top -= i.stagePos.top,
            i.sliderStartPos.left -= i.stagePos.left,
            i.contentStartPos.top -= i.stagePos.top,
            i.contentStartPos.left -= i.stagePos.left,
            n(e).off(".fb.touch").on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")),
            n.fancybox.isMobile && e.addEventListener("scroll", i.onscroll, !0),
            ((i.opts || i.canPan) && (c.is(i.$stage) || i.$stage.find(c).length) || (c.is(".fancybox-image") && o.preventDefault(),
            n.fancybox.isMobile && c.parents(".fancybox-caption").length)) && (i.isScrollable = l(c) || l(c.parent()),
            n.fancybox.isMobile && i.isScrollable || o.preventDefault(),
            (1 === i.startPoints.length || u.hasError) && (i.canPan ? (n.fancybox.stop(i.$content),
            i.isPanning = !0) : i.isSwiping = !0,
            i.$container.addClass("fancybox-is-grabbing")),
            2 === i.startPoints.length && "image" === u.type && (u.isLoaded || u.$ghost) && (i.canTap = !1,
            i.isSwiping = !1,
            i.isPanning = !1,
            i.isZooming = !0,
            n.fancybox.stop(i.$content),
            i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(),
            i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(),
            i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width,
            i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height,
            i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1]))))
        }
    }
    ,
    d.prototype.onscroll = function(t) {
        var n = this;
        n.isScrolling = !0,
        e.removeEventListener("scroll", n.onscroll, !0)
    }
    ,
    d.prototype.ontouchmove = function(t) {
        var e = this;
        return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e.isScrolling ? void (e.canTap = !1) : (e.newPoints = a(t),
        void ((e.opts || e.canPan) && e.newPoints.length && e.newPoints.length && (e.isSwiping && !0 === e.isSwiping || t.preventDefault(),
        e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"),
        e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"),
        e.distance = s(e.newPoints[0], e.startPoints[0]),
        e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
    }
    ,
    d.prototype.onSwipe = function(e) {
        var a, s = this, r = s.instance, c = s.isSwiping, l = s.sliderStartPos.left || 0;
        if (!0 !== c)
            "x" == c && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? l += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? l -= Math.pow(-s.distanceX, .8) : l += s.distanceX),
            s.sliderLastPos = {
                top: "x" == c ? 0 : s.sliderStartPos.top + s.distanceY,
                left: l
            },
            s.requestId && (i(s.requestId),
            s.requestId = null),
            s.requestId = o(function() {
                s.sliderLastPos && (n.each(s.instance.slides, function(t, e) {
                    var o = e.pos - s.instance.currPos;
                    n.fancybox.setTranslate(e.$slide, {
                        top: s.sliderLastPos.top,
                        left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter
                    })
                }),
                s.$container.addClass("fancybox-is-sliding"))
            });
        else if (Math.abs(s.distance) > 10) {
            if (s.canTap = !1,
            r.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : r.isDragging || !1 === s.opts.vertical || "auto" === s.opts.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI),
            s.isSwiping = a > 45 && a < 135 ? "y" : "x"),
            "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable)
                return void (s.isScrolling = !0);
            r.isDragging = s.isSwiping,
            s.startPoints = s.newPoints,
            n.each(r.slides, function(t, e) {
                var o, i;
                n.fancybox.stop(e.$slide),
                o = n.fancybox.getTranslate(e.$slide),
                i = n.fancybox.getTranslate(r.$refs.stage),
                e.$slide.css({
                    transform: "",
                    opacity: "",
                    "transition-duration": ""
                }).removeClass("fancybox-animated").removeClass(function(t, e) {
                    return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                }),
                e.pos === r.current.pos && (s.sliderStartPos.top = o.top - i.top,
                s.sliderStartPos.left = o.left - i.left),
                n.fancybox.setTranslate(e.$slide, {
                    top: o.top - i.top,
                    left: o.left - i.left
                })
            }),
            r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop()
        }
    }
    ,
    d.prototype.onPan = function() {
        var t = this;
        if (s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5))
            return void (t.startPoints = t.newPoints);
        t.canTap = !1,
        t.contentLastPos = t.limitMovement(),
        t.requestId && i(t.requestId),
        t.requestId = o(function() {
            n.fancybox.setTranslate(t.$content, t.contentLastPos)
        })
    }
    ,
    d.prototype.limitMovement = function() {
        var t, e, n, o, i, a, s = this, r = s.canvasWidth, c = s.canvasHeight, l = s.distanceX, d = s.distanceY, u = s.contentStartPos, f = u.left, p = u.top, h = u.width, g = u.height;
        return i = h > r ? f + l : f,
        a = p + d,
        t = Math.max(0, .5 * r - .5 * h),
        e = Math.max(0, .5 * c - .5 * g),
        n = Math.min(r - h, .5 * r - .5 * h),
        o = Math.min(c - g, .5 * c - .5 * g),
        l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, .8) || 0),
        l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, .8) || 0),
        d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, .8) || 0),
        d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, .8) || 0),
        {
            top: a,
            left: i
        }
    }
    ,
    d.prototype.limitPosition = function(t, e, n, o) {
        var i = this
          , a = i.canvasWidth
          , s = i.canvasHeight;
        return n > a ? (t = t > 0 ? 0 : t,
        t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2),
        o > s ? (e = e > 0 ? 0 : e,
        e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2),
        {
            top: e,
            left: t
        }
    }
    ,
    d.prototype.onZoom = function() {
        var e = this
          , a = e.contentStartPos
          , r = a.width
          , c = a.height
          , l = a.left
          , d = a.top
          , u = s(e.newPoints[0], e.newPoints[1])
          , f = u / e.startDistanceBetweenFingers
          , p = Math.floor(r * f)
          , h = Math.floor(c * f)
          , g = (r - p) * e.percentageOfImageAtPinchPointX
          , b = (c - h) * e.percentageOfImageAtPinchPointY
          , m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft()
          , v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop()
          , y = m - e.centerPointStartX
          , x = v - e.centerPointStartY
          , w = l + (g + y)
          , $ = d + (b + x)
          , S = {
            top: $,
            left: w,
            scaleX: f,
            scaleY: f
        };
        e.canTap = !1,
        e.newWidth = p,
        e.newHeight = h,
        e.contentLastPos = S,
        e.requestId && i(e.requestId),
        e.requestId = o(function() {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }
    ,
    d.prototype.ontouchend = function(t) {
        var o = this
          , s = o.isSwiping
          , r = o.isPanning
          , c = o.isZooming
          , l = o.isScrolling;
        if (o.endPoints = a(t),
        o.dMs = Math.max((new Date).getTime() - o.startTime, 1),
        o.$container.removeClass("fancybox-is-grabbing"),
        n(e).off(".fb.touch"),
        e.removeEventListener("scroll", o.onscroll, !0),
        o.requestId && (i(o.requestId),
        o.requestId = null),
        o.isSwiping = !1,
        o.isPanning = !1,
        o.isZooming = !1,
        o.isScrolling = !1,
        o.instance.isDragging = !1,
        o.canTap)
            return o.onTap(t);
        o.speed = 100,
        o.velocityX = o.distanceX / o.dMs * .5,
        o.velocityY = o.distanceY / o.dMs * .5,
        r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l)
    }
    ,
    d.prototype.endSwiping = function(t, e) {
        var o = this
          , i = !1
          , a = o.instance.group.length
          , s = Math.abs(o.distanceX)
          , r = "x" == t && a > 1 && (o.dMs > 130 && s > 10 || s > 50);
        o.sliderLastPos = null,
        "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance.current.$slide, {
            top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
            opacity: 0
        }, 200),
        i = o.instance.close(!0, 250)) : r && o.distanceX > 0 ? i = o.instance.previous(300) : r && o.distanceX < 0 && (i = o.instance.next(300)),
        !1 !== i || "x" != t && "y" != t || o.instance.centerSlide(200),
        o.$container.removeClass("fancybox-is-sliding")
    }
    ,
    d.prototype.endPanning = function() {
        var t, e, o, i = this;
        i.contentLastPos && (!1 === i.opts.momentum || i.dMs > 350 ? (t = i.contentLastPos.left,
        e = i.contentLastPos.top) : (t = i.contentLastPos.left + 500 * i.velocityX,
        e = i.contentLastPos.top + 500 * i.velocityY),
        o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height),
        o.width = i.contentStartPos.width,
        o.height = i.contentStartPos.height,
        n.fancybox.animate(i.$content, o, 366))
    }
    ,
    d.prototype.endZooming = function() {
        var t, e, o, i, a = this, s = a.instance.current, r = a.newWidth, c = a.newHeight;
        a.contentLastPos && (t = a.contentLastPos.left,
        e = a.contentLastPos.top,
        i = {
            top: e,
            left: t,
            width: r,
            height: c,
            scaleX: 1,
            scaleY: 1
        },
        n.fancybox.setTranslate(a.$content, i),
        r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c),
        n.fancybox.animate(a.$content, o, 150)))
    }
    ,
    d.prototype.onTap = function(e) {
        var o, i = this, s = n(e.target), r = i.instance, c = r.current, l = e && a(e) || i.startPoints, d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0, u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0, f = function(t) {
            var o = c.opts[t];
            if (n.isFunction(o) && (o = o.apply(r, [c, e])),
            o)
                switch (o) {
                case "close":
                    r.close(i.startEvent);
                    break;
                case "toggleControls":
                    r.toggleControls();
                    break;
                case "next":
                    r.next();
                    break;
                case "nextOrClose":
                    r.group.length > 1 ? r.next() : r.close(i.startEvent);
                    break;
                case "zoom":
                    "image" == c.type && (c.isLoaded || c.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(d, u) : r.group.length < 2 && r.close(i.startEvent))
                }
        };
        if ((!e.originalEvent || 2 != e.originalEvent.button) && (s.is("img") || !(d > s[0].clientWidth + s.offset().left))) {
            if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))
                o = "Outside";
            else if (s.is(".fancybox-slide"))
                o = "Slide";
            else {
                if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length)
                    return;
                o = "Content"
            }
            if (i.tapped) {
                if (clearTimeout(i.tapped),
                i.tapped = null,
                Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50)
                    return this;
                f("dblclick" + o)
            } else
                i.tapX = d,
                i.tapY = u,
                c.opts["dblclick" + o] && c.opts["dblclick" + o] !== c.opts["click" + o] ? i.tapped = setTimeout(function() {
                    i.tapped = null,
                    r.isAnimating || f("click" + o)
                }, 500) : f("click" + o);
            return this
        }
    }
    ,
    n(e).on("onActivate.fb", function(t, e) {
        e && !e.Guestures && (e.Guestures = new d(e))
    }).on("beforeClose.fb", function(t, e) {
        e && e.Guestures && e.Guestures.destroy()
    })
}(window, document, jQuery),
function(t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3,
            progress: !0
        }
    });
    var n = function(t) {
        this.instance = t,
        this.init()
    };
    e.extend(n.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var t = this
              , n = t.instance
              , o = n.group[n.currIndex].opts.slideShow;
            t.$button = n.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                t.toggle()
            }),
            n.group.length < 2 || !o ? t.$button.hide() : o.progress && (t.$progress = e('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))
        },
        set: function(t) {
            var n = this
              , o = n.instance
              , i = o.current;
            i && (!0 === t || i.opts.loop || o.currIndex < o.group.length - 1) ? n.isActive && "video" !== i.contentType && (n.$progress && e.fancybox.animate(n.$progress.show(), {
                scaleX: 1
            }, i.opts.slideShow.speed),
            n.timer = setTimeout(function() {
                o.current.opts.loop || o.current.index != o.group.length - 1 ? o.next() : o.jumpTo(0)
            }, i.opts.slideShow.speed)) : (n.stop(),
            o.idleSecondsCounter = 0,
            o.showControls())
        },
        clear: function() {
            var t = this;
            clearTimeout(t.timer),
            t.timer = null,
            t.$progress && t.$progress.removeAttr("style").hide()
        },
        start: function() {
            var t = this
              , e = t.instance.current;
            e && (t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),
            t.isActive = !0,
            e.isComplete && t.set(!0),
            t.instance.trigger("onSlideShowChange", !0))
        },
        stop: function() {
            var t = this
              , e = t.instance.current;
            t.clear(),
            t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),
            t.isActive = !1,
            t.instance.trigger("onSlideShowChange", !1),
            t.$progress && t.$progress.removeAttr("style").hide()
        },
        toggle: function() {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }),
    e(t).on({
        "onInit.fb": function(t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e))
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.SlideShow;
            o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
        },
        "afterShow.fb": function(t, e, n) {
            var o = e && e.SlideShow;
            o && o.isActive && o.set()
        },
        "afterKeydown.fb": function(n, o, i, a, s) {
            var r = o && o.SlideShow;
            !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(),
            r.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(t, e) {
            var n = e && e.SlideShow;
            n && n.stop()
        }
    }),
    e(t).on("visibilitychange", function() {
        var n = e.fancybox.getInstance()
          , o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set())
    })
}(document, jQuery),
function(t, e) {
    "use strict";
    var n = function() {
        for (var e = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]], n = {}, o = 0; o < e.length; o++) {
            var i = e[o];
            if (i && i[1]in t) {
                for (var a = 0; a < i.length; a++)
                    n[e[0][a]] = i[a];
                return n
            }
        }
        return !1
    }();
    if (n) {
        var o = {
            request: function(e) {
                e = e || t.documentElement,
                e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                t[n.exitFullscreen]()
            },
            toggle: function(e) {
                e = e || t.documentElement,
                this.isFullscreen() ? this.exit() : this.request(e)
            },
            isFullscreen: function() {
                return Boolean(t[n.fullscreenElement])
            },
            enabled: function() {
                return Boolean(t[n.fullscreenEnabled])
            }
        };
        e.extend(!0, e.fancybox.defaults, {
            btnTpl: {
                fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
            },
            fullScreen: {
                autoStart: !1
            }
        }),
        e(t).on(n.fullscreenchange, function() {
            var t = o.isFullscreen()
              , n = e.fancybox.getInstance();
            n && (n.current && "image" === n.current.type && n.isAnimating && (n.isAnimating = !1,
            n.update(!0, !0, 0),
            n.isComplete || n.complete()),
            n.trigger("onFullscreenChange", t),
            n.$refs.container.toggleClass("fancybox-is-fullscreen", t),
            n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !t).toggleClass("fancybox-button--fsexit", t))
        })
    }
    e(t).on({
        "onInit.fb": function(t, e) {
            var i;
            if (!n)
                return void e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
            e && e.group[e.currIndex].opts.fullScreen ? (i = e.$refs.container,
            i.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(t) {
                t.stopPropagation(),
                t.preventDefault(),
                o.toggle()
            }),
            e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && o.request(),
            e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            e && e.FullScreen && 70 === i && (o.preventDefault(),
            e.FullScreen.toggle())
        },
        "beforeClose.fb": function(t, e) {
            e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && o.exit()
        }
    })
}(document, jQuery),
function(t, e) {
    "use strict";
    var n = "fancybox-thumbs";
    e.fancybox.defaults = e.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, e.fancybox.defaults);
    var o = function(t) {
        this.init(t)
    };
    e.extend(o.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(t) {
            var e = this
              , n = t.group
              , o = 0;
            e.instance = t,
            e.opts = n[t.currIndex].opts.thumbs,
            t.Thumbs = e,
            e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]");
            for (var i = 0, a = n.length; i < a && (n[i].thumb && o++,
            !(o > 1)); i++)
                ;
            o > 1 && e.opts ? (e.$button.removeAttr("style").on("click", function() {
                e.toggle()
            }),
            e.isActive = !0) : e.$button.hide()
        },
        create: function() {
            var t, o = this, i = o.instance, a = o.opts.parentEl, s = [];
            o.$grid || (o.$grid = e('<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)),
            o.$grid.on("click", "a", function() {
                i.jumpTo(e(this).attr("data-index"))
            })),
            o.$list || (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)),
            e.each(i.group, function(e, n) {
                t = n.thumb,
                t || "image" !== n.type || (t = n.src),
                s.push('<a href="javascript:;" tabindex="0" data-index="' + e + '"' + (t && t.length ? ' style="background-image:url(' + t + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
            }),
            o.$list[0].innerHTML = s.join(""),
            "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right"), 10) + i.group.length * o.$list.children().eq(0).outerWidth(!0))
        },
        focus: function(t) {
            var e, n, o = this, i = o.$list, a = o.$grid;
            o.instance.current && (e = i.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + o.instance.current.index + '"]').addClass("fancybox-thumbs-active"),
            n = e.position(),
            "y" === o.opts.axis && (n.top < 0 || n.top > i.height() - e.outerHeight()) ? i.stop().animate({
                scrollTop: i.scrollTop() + n.top
            }, t) : "x" === o.opts.axis && (n.left < a.scrollLeft() || n.left > a.scrollLeft() + (a.width() - e.outerWidth())) && i.parent().stop().animate({
                scrollLeft: n.left
            }, t))
        },
        update: function() {
            var t = this;
            t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible),
            t.isVisible ? (t.$grid || t.create(),
            t.instance.trigger("onThumbsShow"),
            t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"),
            t.instance.update()
        },
        hide: function() {
            this.isVisible = !1,
            this.update()
        },
        show: function() {
            this.isVisible = !0,
            this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible,
            this.update()
        }
    }),
    e(t).on({
        "onInit.fb": function(t, e) {
            var n;
            e && !e.Thumbs && (n = new o(e),
            n.isActive && !0 === n.opts.autoStart && n.show())
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.Thumbs;
            i && i.isVisible && i.focus(o ? 0 : 250)
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            var a = e && e.Thumbs;
            a && a.isActive && 71 === i && (o.preventDefault(),
            a.toggle())
        },
        "beforeClose.fb": function(t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide()
        }
    })
}(document, jQuery),
function(t, e) {
    "use strict";
    function n(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        return String(t).replace(/[&<>"'`=\/]/g, function(t) {
            return e[t]
        })
    }
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
        },
        share: {
            url: function(t, e) {
                return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
        }
    }),
    e(t).on("click", "[data-fancybox-share]", function() {
        var t, o, i = e.fancybox.getInstance(), a = i.current || null;
        a && ("function" === e.type(a.opts.share.url) && (t = a.opts.share.url.apply(a, [i, a])),
        o = a.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === a.type ? encodeURIComponent(a.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""),
        e.fancybox.open({
            src: i.translate(i, o),
            type: "html",
            opts: {
                touch: !1,
                animationEffect: !1,
                afterLoad: function(t, e) {
                    i.$refs.container.one("beforeClose.fb", function() {
                        t.close(null, 0)
                    }),
                    e.$content.find(".fancybox-share__button").click(function() {
                        return window.open(this.href, "Share", "width=550, height=450"),
                        !1
                    })
                },
                mobile: {
                    autoFocus: !1
                }
            }
        }))
    })
}(document, jQuery),
function(t, e, n) {
    "use strict";
    function o() {
        var e = t.location.hash.substr(1)
          , n = e.split("-")
          , o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1
          , i = n.join("-");
        return {
            hash: e,
            index: o < 1 ? 1 : o,
            gallery: i
        }
    }
    function i(t) {
        "" !== t.gallery && n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1).focus().trigger("click.fb-start")
    }
    function a(t) {
        var e, n;
        return !!t && (e = t.current ? t.current.opts : t.opts,
        "" !== (n = e.hash || (e.$orig ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger") : "")) && n)
    }
    n.escapeSelector || (n.escapeSelector = function(t) {
        return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        })
    }
    ),
    n(function() {
        !1 !== n.fancybox.defaults.hash && (n(e).on({
            "onInit.fb": function(t, e) {
                var n, i;
                !1 !== e.group[e.currIndex].opts.hash && (n = o(),
                (i = a(e)) && n.gallery && i == n.gallery && (e.currIndex = n.index - 1))
            },
            "beforeShow.fb": function(n, o, i, s) {
                var r;
                i && !1 !== i.opts.hash && (r = a(o)) && (o.currentHash = r + (o.group.length > 1 ? "-" + (i.index + 1) : ""),
                t.location.hash !== "#" + o.currentHash && (s && !o.origHash && (o.origHash = t.location.hash),
                o.hashTimer && clearTimeout(o.hashTimer),
                o.hashTimer = setTimeout(function() {
                    "replaceState"in t.history ? (t.history[s ? "pushState" : "replaceState"]({}, e.title, t.location.pathname + t.location.search + "#" + o.currentHash),
                    s && (o.hasCreatedHistory = !0)) : t.location.hash = o.currentHash,
                    o.hashTimer = null
                }, 300)))
            },
            "beforeClose.fb": function(n, o, i) {
                i && !1 !== i.opts.hash && (clearTimeout(o.hashTimer),
                o.currentHash && o.hasCreatedHistory ? t.history.back() : o.currentHash && ("replaceState"in t.history ? t.history.replaceState({}, e.title, t.location.pathname + t.location.search + (o.origHash || "")) : t.location.hash = o.origHash),
                o.currentHash = null)
            }
        }),
        n(t).on("hashchange.fb", function() {
            var t = o()
              , e = null;
            n.each(n(".fancybox-container").get().reverse(), function(t, o) {
                var i = n(o).data("FancyBox");
                if (i && i.currentHash)
                    return e = i,
                    !1
            }),
            e ? e.currentHash === t.gallery + "-" + t.index || 1 === t.index && e.currentHash == t.gallery || (e.currentHash = null,
            e.close()) : "" !== t.gallery && i(t)
        }),
        setTimeout(function() {
            n.fancybox.getInstance() || i(o())
        }, 50))
    })
}(window, document, jQuery),
function(t, e) {
    "use strict";
    var n = (new Date).getTime();
    e(t).on({
        "onInit.fb": function(t, e, o) {
            e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(t) {
                var o = e.current
                  , i = (new Date).getTime();
                e.group.length < 2 || !1 === o.opts.wheel || "auto" === o.opts.wheel && "image" !== o.type || (t.preventDefault(),
                t.stopPropagation(),
                o.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t,
                i - n < 250 || (n = i,
                e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
            })
        }
    })
}(document, jQuery);
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function() {
    "use strict";
    function e(e) {
        return null !== e && "object" == typeof e && "constructor"in e && e.constructor === Object
    }
    function t(s, a) {
        void 0 === s && (s = {}),
        void 0 === a && (a = {}),
        Object.keys(a).forEach((i=>{
            void 0 === s[i] ? s[i] = a[i] : e(a[i]) && e(s[i]) && Object.keys(a[i]).length > 0 && t(s[i], a[i])
        }
        ))
    }
    const s = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector: ()=>null,
        querySelectorAll: ()=>[],
        getElementById: ()=>null,
        createEvent: ()=>({
            initEvent() {}
        }),
        createElement: ()=>({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: ()=>[]
        }),
        createElementNS: ()=>({}),
        importNode: ()=>null,
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function a() {
        const e = "undefined" != typeof document ? document : {};
        return t(e, s),
        e
    }
    const i = {
        document: s,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: ()=>({
            getPropertyValue: ()=>""
        }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: ()=>({}),
        requestAnimationFrame: e=>"undefined" == typeof setTimeout ? (e(),
        null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };
    function r() {
        const e = "undefined" != typeof window ? window : {};
        return t(e, i),
        e
    }
    class n extends Array {
        constructor(e) {
            "number" == typeof e ? super(e) : (super(...e || []),
            function(e) {
                const t = e.__proto__;
                Object.defineProperty(e, "__proto__", {
                    get: ()=>t,
                    set(e) {
                        t.__proto__ = e
                    }
                })
            }(this))
        }
    }
    function l(e) {
        void 0 === e && (e = []);
        const t = [];
        return e.forEach((e=>{
            Array.isArray(e) ? t.push(...l(e)) : t.push(e)
        }
        )),
        t
    }
    function o(e, t) {
        return Array.prototype.filter.call(e, t)
    }
    function d(e, t) {
        const s = r()
          , i = a();
        let l = [];
        if (!t && e instanceof n)
            return e;
        if (!e)
            return new n(l);
        if ("string" == typeof e) {
            const s = e.trim();
            if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
                let e = "div";
                0 === s.indexOf("<li") && (e = "ul"),
                0 === s.indexOf("<tr") && (e = "tbody"),
                0 !== s.indexOf("<td") && 0 !== s.indexOf("<th") || (e = "tr"),
                0 === s.indexOf("<tbody") && (e = "table"),
                0 === s.indexOf("<option") && (e = "select");
                const t = i.createElement(e);
                t.innerHTML = s;
                for (let e = 0; e < t.childNodes.length; e += 1)
                    l.push(t.childNodes[e])
            } else
                l = function(e, t) {
                    if ("string" != typeof e)
                        return [e];
                    const s = []
                      , a = t.querySelectorAll(e);
                    for (let e = 0; e < a.length; e += 1)
                        s.push(a[e]);
                    return s
                }(e.trim(), t || i)
        } else if (e.nodeType || e === s || e === i)
            l.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof n)
                return e;
            l = e
        }
        return new n(function(e) {
            const t = [];
            for (let s = 0; s < e.length; s += 1)
                -1 === t.indexOf(e[s]) && t.push(e[s]);
            return t
        }(l))
    }
    d.fn = n.prototype;
    const c = {
        addClass: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                t[s] = arguments[s];
            const a = l(t.map((e=>e.split(" "))));
            return this.forEach((e=>{
                e.classList.add(...a)
            }
            )),
            this
        },
        removeClass: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                t[s] = arguments[s];
            const a = l(t.map((e=>e.split(" "))));
            return this.forEach((e=>{
                e.classList.remove(...a)
            }
            )),
            this
        },
        hasClass: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                t[s] = arguments[s];
            const a = l(t.map((e=>e.split(" "))));
            return o(this, (e=>a.filter((t=>e.classList.contains(t))).length > 0)).length > 0
        },
        toggleClass: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                t[s] = arguments[s];
            const a = l(t.map((e=>e.split(" "))));
            this.forEach((e=>{
                a.forEach((t=>{
                    e.classList.toggle(t)
                }
                ))
            }
            ))
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (let s = 0; s < this.length; s += 1)
                if (2 === arguments.length)
                    this[s].setAttribute(e, t);
                else
                    for (const t in e)
                        this[s][t] = e[t],
                        this[s].setAttribute(t, e[t]);
            return this
        },
        removeAttr: function(e) {
            for (let t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        transform: function(e) {
            for (let t = 0; t < this.length; t += 1)
                this[t].style.transform = e;
            return this
        },
        transition: function(e) {
            for (let t = 0; t < this.length; t += 1)
                this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
            return this
        },
        on: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                t[s] = arguments[s];
            let[a,i,r,n] = t;
            function l(e) {
                const t = e.target;
                if (!t)
                    return;
                const s = e.target.dom7EventData || [];
                if (s.indexOf(e) < 0 && s.unshift(e),
                d(t).is(i))
                    r.apply(t, s);
                else {
                    const e = d(t).parents();
                    for (let t = 0; t < e.length; t += 1)
                        d(e[t]).is(i) && r.apply(e[t], s)
                }
            }
            function o(e) {
                const t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                r.apply(this, t)
            }
            "function" == typeof t[1] && ([a,r,n] = t,
            i = void 0),
            n || (n = !1);
            const c = a.split(" ");
            let p;
            for (let e = 0; e < this.length; e += 1) {
                const t = this[e];
                if (i)
                    for (p = 0; p < c.length; p += 1) {
                        const e = c[p];
                        t.dom7LiveListeners || (t.dom7LiveListeners = {}),
                        t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
                        t.dom7LiveListeners[e].push({
                            listener: r,
                            proxyListener: l
                        }),
                        t.addEventListener(e, l, n)
                    }
                else
                    for (p = 0; p < c.length; p += 1) {
                        const e = c[p];
                        t.dom7Listeners || (t.dom7Listeners = {}),
                        t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
                        t.dom7Listeners[e].push({
                            listener: r,
                            proxyListener: o
                        }),
                        t.addEventListener(e, o, n)
                    }
            }
            return this
        },
        off: function() {
            for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++)
                t[s] = arguments[s];
            let[a,i,r,n] = t;
            "function" == typeof t[1] && ([a,r,n] = t,
            i = void 0),
            n || (n = !1);
            const l = a.split(" ");
            for (let e = 0; e < l.length; e += 1) {
                const t = l[e];
                for (let e = 0; e < this.length; e += 1) {
                    const s = this[e];
                    let a;
                    if (!i && s.dom7Listeners ? a = s.dom7Listeners[t] : i && s.dom7LiveListeners && (a = s.dom7LiveListeners[t]),
                    a && a.length)
                        for (let e = a.length - 1; e >= 0; e -= 1) {
                            const i = a[e];
                            r && i.listener === r || r && i.listener && i.listener.dom7proxy && i.listener.dom7proxy === r ? (s.removeEventListener(t, i.proxyListener, n),
                            a.splice(e, 1)) : r || (s.removeEventListener(t, i.proxyListener, n),
                            a.splice(e, 1))
                        }
                }
            }
            return this
        },
        trigger: function() {
            const e = r();
            for (var t = arguments.length, s = new Array(t), a = 0; a < t; a++)
                s[a] = arguments[a];
            const i = s[0].split(" ")
              , n = s[1];
            for (let t = 0; t < i.length; t += 1) {
                const a = i[t];
                for (let t = 0; t < this.length; t += 1) {
                    const i = this[t];
                    if (e.CustomEvent) {
                        const t = new e.CustomEvent(a,{
                            detail: n,
                            bubbles: !0,
                            cancelable: !0
                        });
                        i.dom7EventData = s.filter(((e,t)=>t > 0)),
                        i.dispatchEvent(t),
                        i.dom7EventData = [],
                        delete i.dom7EventData
                    }
                }
            }
            return this
        },
        transitionEnd: function(e) {
            const t = this;
            return e && t.on("transitionend", (function s(a) {
                a.target === this && (e.call(this, a),
                t.off("transitionend", s))
            }
            )),
            this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    const e = this.styles();
                    return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function() {
            const e = r();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function() {
            if (this.length > 0) {
                const e = r()
                  , t = a()
                  , s = this[0]
                  , i = s.getBoundingClientRect()
                  , n = t.body
                  , l = s.clientTop || n.clientTop || 0
                  , o = s.clientLeft || n.clientLeft || 0
                  , d = s === e ? e.scrollY : s.scrollTop
                  , c = s === e ? e.scrollX : s.scrollLeft;
                return {
                    top: i.top + d - l,
                    left: i.left + c - o
                }
            }
            return null
        },
        css: function(e, t) {
            const s = r();
            let a;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (a = 0; a < this.length; a += 1)
                        for (const t in e)
                            this[a].style[t] = e[t];
                    return this
                }
                if (this[0])
                    return s.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (a = 0; a < this.length; a += 1)
                    this[a].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            return e ? (this.forEach(((t,s)=>{
                e.apply(t, [t, s])
            }
            )),
            this) : this
        },
        html: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : null;
            for (let t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (let t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function(e) {
            const t = r()
              , s = a()
              , i = this[0];
            let l, o;
            if (!i || void 0 === e)
                return !1;
            if ("string" == typeof e) {
                if (i.matches)
                    return i.matches(e);
                if (i.webkitMatchesSelector)
                    return i.webkitMatchesSelector(e);
                if (i.msMatchesSelector)
                    return i.msMatchesSelector(e);
                for (l = d(e),
                o = 0; o < l.length; o += 1)
                    if (l[o] === i)
                        return !0;
                return !1
            }
            if (e === s)
                return i === s;
            if (e === t)
                return i === t;
            if (e.nodeType || e instanceof n) {
                for (l = e.nodeType ? [e] : e,
                o = 0; o < l.length; o += 1)
                    if (l[o] === i)
                        return !0;
                return !1
            }
            return !1
        },
        index: function() {
            let e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); )
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e)
                return this;
            const t = this.length;
            if (e > t - 1)
                return d([]);
            if (e < 0) {
                const s = t + e;
                return d(s < 0 ? [] : [this[s]])
            }
            return d([this[e]])
        },
        append: function() {
            let e;
            const t = a();
            for (let s = 0; s < arguments.length; s += 1) {
                e = s < 0 || arguments.length <= s ? void 0 : arguments[s];
                for (let s = 0; s < this.length; s += 1)
                    if ("string" == typeof e) {
                        const a = t.createElement("div");
                        for (a.innerHTML = e; a.firstChild; )
                            this[s].appendChild(a.firstChild)
                    } else if (e instanceof n)
                        for (let t = 0; t < e.length; t += 1)
                            this[s].appendChild(e[t]);
                    else
                        this[s].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            const t = a();
            let s, i;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof e) {
                    const a = t.createElement("div");
                    for (a.innerHTML = e,
                    i = a.childNodes.length - 1; i >= 0; i -= 1)
                        this[s].insertBefore(a.childNodes[i], this[s].childNodes[0])
                } else if (e instanceof n)
                    for (i = 0; i < e.length; i += 1)
                        this[s].insertBefore(e[i], this[s].childNodes[0]);
                else
                    this[s].insertBefore(e, this[s].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && d(this[0].nextElementSibling).is(e) ? d([this[0].nextElementSibling]) : d([]) : this[0].nextElementSibling ? d([this[0].nextElementSibling]) : d([]) : d([])
        },
        nextAll: function(e) {
            const t = [];
            let s = this[0];
            if (!s)
                return d([]);
            for (; s.nextElementSibling; ) {
                const a = s.nextElementSibling;
                e ? d(a).is(e) && t.push(a) : t.push(a),
                s = a
            }
            return d(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                const t = this[0];
                return e ? t.previousElementSibling && d(t.previousElementSibling).is(e) ? d([t.previousElementSibling]) : d([]) : t.previousElementSibling ? d([t.previousElementSibling]) : d([])
            }
            return d([])
        },
        prevAll: function(e) {
            const t = [];
            let s = this[0];
            if (!s)
                return d([]);
            for (; s.previousElementSibling; ) {
                const a = s.previousElementSibling;
                e ? d(a).is(e) && t.push(a) : t.push(a),
                s = a
            }
            return d(t)
        },
        parent: function(e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1)
                null !== this[s].parentNode && (e ? d(this[s].parentNode).is(e) && t.push(this[s].parentNode) : t.push(this[s].parentNode));
            return d(t)
        },
        parents: function(e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                let a = this[s].parentNode;
                for (; a; )
                    e ? d(a).is(e) && t.push(a) : t.push(a),
                    a = a.parentNode
            }
            return d(t)
        },
        closest: function(e) {
            let t = this;
            return void 0 === e ? d([]) : (t.is(e) || (t = t.parents(e).eq(0)),
            t)
        },
        find: function(e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const a = this[s].querySelectorAll(e);
                for (let e = 0; e < a.length; e += 1)
                    t.push(a[e])
            }
            return d(t)
        },
        children: function(e) {
            const t = [];
            for (let s = 0; s < this.length; s += 1) {
                const a = this[s].children;
                for (let s = 0; s < a.length; s += 1)
                    e && !d(a[s]).is(e) || t.push(a[s])
            }
            return d(t)
        },
        filter: function(e) {
            return d(o(this, e))
        },
        remove: function() {
            for (let e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };
    function p(e, t) {
        return void 0 === t && (t = 0),
        setTimeout(e, t)
    }
    function u() {
        return Date.now()
    }
    function h(e, t) {
        void 0 === t && (t = "x");
        const s = r();
        let a, i, n;
        const l = function(e) {
            const t = r();
            let s;
            return t.getComputedStyle && (s = t.getComputedStyle(e, null)),
            !s && e.currentStyle && (s = e.currentStyle),
            s || (s = e.style),
            s
        }(e);
        return s.WebKitCSSMatrix ? (i = l.transform || l.webkitTransform,
        i.split(",").length > 6 && (i = i.split(", ").map((e=>e.replace(",", "."))).join(", ")),
        n = new s.WebKitCSSMatrix("none" === i ? "" : i)) : (n = l.MozTransform || l.OTransform || l.MsTransform || l.msTransform || l.transform || l.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
        a = n.toString().split(",")),
        "x" === t && (i = s.WebKitCSSMatrix ? n.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])),
        "y" === t && (i = s.WebKitCSSMatrix ? n.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])),
        i || 0
    }
    function m(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }
    function f(e) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
    }
    function g() {
        const e = Object(arguments.length <= 0 ? void 0 : arguments[0])
          , t = ["__proto__", "constructor", "prototype"];
        for (let s = 1; s < arguments.length; s += 1) {
            const a = s < 0 || arguments.length <= s ? void 0 : arguments[s];
            if (null != a && !f(a)) {
                const s = Object.keys(Object(a)).filter((e=>t.indexOf(e) < 0));
                for (let t = 0, i = s.length; t < i; t += 1) {
                    const i = s[t]
                      , r = Object.getOwnPropertyDescriptor(a, i);
                    void 0 !== r && r.enumerable && (m(e[i]) && m(a[i]) ? a[i].__swiper__ ? e[i] = a[i] : g(e[i], a[i]) : !m(e[i]) && m(a[i]) ? (e[i] = {},
                    a[i].__swiper__ ? e[i] = a[i] : g(e[i], a[i])) : e[i] = a[i])
                }
            }
        }
        return e
    }
    function v(e, t, s) {
        e.style.setProperty(t, s)
    }
    function w(e) {
        let {swiper: t, targetPosition: s, side: a} = e;
        const i = r()
          , n = -t.translate;
        let l, o = null;
        const d = t.params.speed;
        t.wrapperEl.style.scrollSnapType = "none",
        i.cancelAnimationFrame(t.cssModeFrameID);
        const c = s > n ? "next" : "prev"
          , p = (e,t)=>"next" === c && e >= t || "prev" === c && e <= t
          , u = ()=>{
            l = (new Date).getTime(),
            null === o && (o = l);
            const e = Math.max(Math.min((l - o) / d, 1), 0)
              , r = .5 - Math.cos(e * Math.PI) / 2;
            let c = n + r * (s - n);
            if (p(c, s) && (c = s),
            t.wrapperEl.scrollTo({
                [a]: c
            }),
            p(c, s))
                return t.wrapperEl.style.overflow = "hidden",
                t.wrapperEl.style.scrollSnapType = "",
                setTimeout((()=>{
                    t.wrapperEl.style.overflow = "",
                    t.wrapperEl.scrollTo({
                        [a]: c
                    })
                }
                )),
                void i.cancelAnimationFrame(t.cssModeFrameID);
            t.cssModeFrameID = i.requestAnimationFrame(u)
        }
        ;
        u()
    }
    let b, x, y;
    function E() {
        return b || (b = function() {
            const e = r()
              , t = a();
            return {
                smoothScroll: t.documentElement && "scrollBehavior"in t.documentElement.style,
                touch: !!("ontouchstart"in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                passiveListener: function() {
                    let t = !1;
                    try {
                        const s = Object.defineProperty({}, "passive", {
                            get() {
                                t = !0
                            }
                        });
                        e.addEventListener("testPassiveListener", null, s)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart"in e
            }
        }()),
        b
    }
    function T(e) {
        return void 0 === e && (e = {}),
        x || (x = function(e) {
            let {userAgent: t} = void 0 === e ? {} : e;
            const s = E()
              , a = r()
              , i = a.navigator.platform
              , n = t || a.navigator.userAgent
              , l = {
                ios: !1,
                android: !1
            }
              , o = a.screen.width
              , d = a.screen.height
              , c = n.match(/(Android);?[\s\/]+([\d.]+)?/);
            let p = n.match(/(iPad).*OS\s([\d_]+)/);
            const u = n.match(/(iPod)(.*OS\s([\d_]+))?/)
              , h = !p && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
              , m = "Win32" === i;
            let f = "MacIntel" === i;
            return !p && f && s.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${o}x${d}`) >= 0 && (p = n.match(/(Version)\/([\d.]+)/),
            p || (p = [0, 1, "13_0_0"]),
            f = !1),
            c && !m && (l.os = "android",
            l.android = !0),
            (p || h || u) && (l.os = "ios",
            l.ios = !0),
            l
        }(e)),
        x
    }
    function C() {
        return y || (y = function() {
            const e = r();
            return {
                isSafari: function() {
                    const t = e.navigator.userAgent.toLowerCase();
                    return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
                }(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
            }
        }()),
        y
    }
    Object.keys(c).forEach((e=>{
        Object.defineProperty(d.fn, e, {
            value: c[e],
            writable: !0
        })
    }
    ));
    var $ = {
        on(e, t, s) {
            const a = this;
            if ("function" != typeof t)
                return a;
            const i = s ? "unshift" : "push";
            return e.split(" ").forEach((e=>{
                a.eventsListeners[e] || (a.eventsListeners[e] = []),
                a.eventsListeners[e][i](t)
            }
            )),
            a
        },
        once(e, t, s) {
            const a = this;
            if ("function" != typeof t)
                return a;
            function i() {
                a.off(e, i),
                i.__emitterProxy && delete i.__emitterProxy;
                for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
                    r[n] = arguments[n];
                t.apply(a, r)
            }
            return i.__emitterProxy = t,
            a.on(e, i, s)
        },
        onAny(e, t) {
            const s = this;
            if ("function" != typeof e)
                return s;
            const a = t ? "unshift" : "push";
            return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[a](e),
            s
        },
        offAny(e) {
            const t = this;
            if (!t.eventsAnyListeners)
                return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1),
            t
        },
        off(e, t) {
            const s = this;
            return s.eventsListeners ? (e.split(" ").forEach((e=>{
                void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach(((a,i)=>{
                    (a === t || a.__emitterProxy && a.__emitterProxy === t) && s.eventsListeners[e].splice(i, 1)
                }
                ))
            }
            )),
            s) : s
        },
        emit() {
            const e = this;
            if (!e.eventsListeners)
                return e;
            let t, s, a;
            for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
                r[n] = arguments[n];
            "string" == typeof r[0] || Array.isArray(r[0]) ? (t = r[0],
            s = r.slice(1, r.length),
            a = e) : (t = r[0].events,
            s = r[0].data,
            a = r[0].context || e),
            s.unshift(a);
            return (Array.isArray(t) ? t : t.split(" ")).forEach((t=>{
                e.eventsAnyListeners && e.eventsAnyListeners.length && e.eventsAnyListeners.forEach((e=>{
                    e.apply(a, [t, ...s])
                }
                )),
                e.eventsListeners && e.eventsListeners[t] && e.eventsListeners[t].forEach((e=>{
                    e.apply(a, s)
                }
                ))
            }
            )),
            e
        }
    };
    var S = {
        updateSize: function() {
            const e = this;
            let t, s;
            const a = e.$el;
            t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : a[0].clientWidth,
            s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : a[0].clientHeight,
            0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(a.css("padding-left") || 0, 10) - parseInt(a.css("padding-right") || 0, 10),
            s = s - parseInt(a.css("padding-top") || 0, 10) - parseInt(a.css("padding-bottom") || 0, 10),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
                width: t,
                height: s,
                size: e.isHorizontal() ? t : s
            }))
        },
        updateSlides: function() {
            const e = this;
            function t(t) {
                return e.isHorizontal() ? t : {
                    width: "height",
                    "margin-top": "margin-left",
                    "margin-bottom ": "margin-right",
                    "margin-left": "margin-top",
                    "margin-right": "margin-bottom",
                    "padding-left": "padding-top",
                    "padding-right": "padding-bottom",
                    marginRight: "marginBottom"
                }[t]
            }
            function s(e, s) {
                return parseFloat(e.getPropertyValue(t(s)) || 0)
            }
            const a = e.params
              , {$wrapperEl: i, size: r, rtlTranslate: n, wrongRTL: l} = e
              , o = e.virtual && a.virtual.enabled
              , d = o ? e.virtual.slides.length : e.slides.length
              , c = i.children(`.${e.params.slideClass}`)
              , p = o ? e.virtual.slides.length : c.length;
            let u = [];
            const h = []
              , m = [];
            let f = a.slidesOffsetBefore;
            "function" == typeof f && (f = a.slidesOffsetBefore.call(e));
            let g = a.slidesOffsetAfter;
            "function" == typeof g && (g = a.slidesOffsetAfter.call(e));
            const w = e.snapGrid.length
              , b = e.slidesGrid.length;
            let x = a.spaceBetween
              , y = -f
              , E = 0
              , T = 0;
            if (void 0 === r)
                return;
            "string" == typeof x && x.indexOf("%") >= 0 && (x = parseFloat(x.replace("%", "")) / 100 * r),
            e.virtualSize = -x,
            n ? c.css({
                marginLeft: "",
                marginBottom: "",
                marginTop: ""
            }) : c.css({
                marginRight: "",
                marginBottom: "",
                marginTop: ""
            }),
            a.centeredSlides && a.cssMode && (v(e.wrapperEl, "--swiper-centered-offset-before", ""),
            v(e.wrapperEl, "--swiper-centered-offset-after", ""));
            const C = a.grid && a.grid.rows > 1 && e.grid;
            let $;
            C && e.grid.initSlides(p);
            const S = "auto" === a.slidesPerView && a.breakpoints && Object.keys(a.breakpoints).filter((e=>void 0 !== a.breakpoints[e].slidesPerView)).length > 0;
            for (let i = 0; i < p; i += 1) {
                $ = 0;
                const n = c.eq(i);
                if (C && e.grid.updateSlide(i, n, p, t),
                "none" !== n.css("display")) {
                    if ("auto" === a.slidesPerView) {
                        S && (c[i].style[t("width")] = "");
                        const r = getComputedStyle(n[0])
                          , l = n[0].style.transform
                          , o = n[0].style.webkitTransform;
                        if (l && (n[0].style.transform = "none"),
                        o && (n[0].style.webkitTransform = "none"),
                        a.roundLengths)
                            $ = e.isHorizontal() ? n.outerWidth(!0) : n.outerHeight(!0);
                        else {
                            const e = s(r, "width")
                              , t = s(r, "padding-left")
                              , a = s(r, "padding-right")
                              , i = s(r, "margin-left")
                              , l = s(r, "margin-right")
                              , o = r.getPropertyValue("box-sizing");
                            if (o && "border-box" === o)
                                $ = e + i + l;
                            else {
                                const {clientWidth: s, offsetWidth: r} = n[0];
                                $ = e + t + a + i + l + (r - s)
                            }
                        }
                        l && (n[0].style.transform = l),
                        o && (n[0].style.webkitTransform = o),
                        a.roundLengths && ($ = Math.floor($))
                    } else
                        $ = (r - (a.slidesPerView - 1) * x) / a.slidesPerView,
                        a.roundLengths && ($ = Math.floor($)),
                        c[i] && (c[i].style[t("width")] = `${$}px`);
                    c[i] && (c[i].swiperSlideSize = $),
                    m.push($),
                    a.centeredSlides ? (y = y + $ / 2 + E / 2 + x,
                    0 === E && 0 !== i && (y = y - r / 2 - x),
                    0 === i && (y = y - r / 2 - x),
                    Math.abs(y) < .001 && (y = 0),
                    a.roundLengths && (y = Math.floor(y)),
                    T % a.slidesPerGroup == 0 && u.push(y),
                    h.push(y)) : (a.roundLengths && (y = Math.floor(y)),
                    (T - Math.min(e.params.slidesPerGroupSkip, T)) % e.params.slidesPerGroup == 0 && u.push(y),
                    h.push(y),
                    y = y + $ + x),
                    e.virtualSize += $ + x,
                    E = $,
                    T += 1
                }
            }
            if (e.virtualSize = Math.max(e.virtualSize, r) + g,
            n && l && ("slide" === a.effect || "coverflow" === a.effect) && i.css({
                width: `${e.virtualSize + a.spaceBetween}px`
            }),
            a.setWrapperSize && i.css({
                [t("width")]: `${e.virtualSize + a.spaceBetween}px`
            }),
            C && e.grid.updateWrapperSize($, u, t),
            !a.centeredSlides) {
                const t = [];
                for (let s = 0; s < u.length; s += 1) {
                    let i = u[s];
                    a.roundLengths && (i = Math.floor(i)),
                    u[s] <= e.virtualSize - r && t.push(i)
                }
                u = t,
                Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 && u.push(e.virtualSize - r)
            }
            if (0 === u.length && (u = [0]),
            0 !== a.spaceBetween) {
                const s = e.isHorizontal() && n ? "marginLeft" : t("marginRight");
                c.filter(((e,t)=>!a.cssMode || t !== c.length - 1)).css({
                    [s]: `${x}px`
                })
            }
            if (a.centeredSlides && a.centeredSlidesBounds) {
                let e = 0;
                m.forEach((t=>{
                    e += t + (a.spaceBetween ? a.spaceBetween : 0)
                }
                )),
                e -= a.spaceBetween;
                const t = e - r;
                u = u.map((e=>e < 0 ? -f : e > t ? t + g : e))
            }
            if (a.centerInsufficientSlides) {
                let e = 0;
                if (m.forEach((t=>{
                    e += t + (a.spaceBetween ? a.spaceBetween : 0)
                }
                )),
                e -= a.spaceBetween,
                e < r) {
                    const t = (r - e) / 2;
                    u.forEach(((e,s)=>{
                        u[s] = e - t
                    }
                    )),
                    h.forEach(((e,s)=>{
                        h[s] = e + t
                    }
                    ))
                }
            }
            if (Object.assign(e, {
                slides: c,
                snapGrid: u,
                slidesGrid: h,
                slidesSizesGrid: m
            }),
            a.centeredSlides && a.cssMode && !a.centeredSlidesBounds) {
                v(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
                v(e.wrapperEl, "--swiper-centered-offset-after", e.size / 2 - m[m.length - 1] / 2 + "px");
                const t = -e.snapGrid[0]
                  , s = -e.slidesGrid[0];
                e.snapGrid = e.snapGrid.map((e=>e + t)),
                e.slidesGrid = e.slidesGrid.map((e=>e + s))
            }
            if (p !== d && e.emit("slidesLengthChange"),
            u.length !== w && (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
            h.length !== b && e.emit("slidesGridLengthChange"),
            a.watchSlidesProgress && e.updateSlidesOffset(),
            !(o || a.cssMode || "slide" !== a.effect && "fade" !== a.effect)) {
                const t = `${a.containerModifierClass}backface-hidden`
                  , s = e.$el.hasClass(t);
                p <= a.maxBackfaceHiddenSlides ? s || e.$el.addClass(t) : s && e.$el.removeClass(t)
            }
        },
        updateAutoHeight: function(e) {
            const t = this
              , s = []
              , a = t.virtual && t.params.virtual.enabled;
            let i, r = 0;
            "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
            const n = e=>a ? t.slides.filter((t=>parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e))[0] : t.slides.eq(e)[0];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                if (t.params.centeredSlides)
                    t.visibleSlides.each((e=>{
                        s.push(e)
                    }
                    ));
                else
                    for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                        const e = t.activeIndex + i;
                        if (e > t.slides.length && !a)
                            break;
                        s.push(n(e))
                    }
            else
                s.push(n(t.activeIndex));
            for (i = 0; i < s.length; i += 1)
                if (void 0 !== s[i]) {
                    const e = s[i].offsetHeight;
                    r = e > r ? e : r
                }
            (r || 0 === r) && t.$wrapperEl.css("height", `${r}px`)
        },
        updateSlidesOffset: function() {
            const e = this
              , t = e.slides;
            for (let s = 0; s < t.length; s += 1)
                t[s].swiperSlideOffset = e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            const t = this
              , s = t.params
              , {slides: a, rtlTranslate: i, snapGrid: r} = t;
            if (0 === a.length)
                return;
            void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
            let n = -e;
            i && (n = e),
            a.removeClass(s.slideVisibleClass),
            t.visibleSlidesIndexes = [],
            t.visibleSlides = [];
            for (let e = 0; e < a.length; e += 1) {
                const l = a[e];
                let o = l.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (o -= a[0].swiperSlideOffset);
                const d = (n + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween)
                  , c = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) / (l.swiperSlideSize + s.spaceBetween)
                  , p = -(n - o)
                  , u = p + t.slidesSizesGrid[e];
                (p >= 0 && p < t.size - 1 || u > 1 && u <= t.size || p <= 0 && u >= t.size) && (t.visibleSlides.push(l),
                t.visibleSlidesIndexes.push(e),
                a.eq(e).addClass(s.slideVisibleClass)),
                l.progress = i ? -d : d,
                l.originalProgress = i ? -c : c
            }
            t.visibleSlides = d(t.visibleSlides)
        },
        updateProgress: function(e) {
            const t = this;
            if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = t && t.translate && t.translate * s || 0
            }
            const s = t.params
              , a = t.maxTranslate() - t.minTranslate();
            let {progress: i, isBeginning: r, isEnd: n} = t;
            const l = r
              , o = n;
            0 === a ? (i = 0,
            r = !0,
            n = !0) : (i = (e - t.minTranslate()) / a,
            r = i <= 0,
            n = i >= 1),
            Object.assign(t, {
                progress: i,
                isBeginning: r,
                isEnd: n
            }),
            (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e),
            r && !l && t.emit("reachBeginning toEdge"),
            n && !o && t.emit("reachEnd toEdge"),
            (l && !r || o && !n) && t.emit("fromEdge"),
            t.emit("progress", i)
        },
        updateSlidesClasses: function() {
            const e = this
              , {slides: t, params: s, $wrapperEl: a, activeIndex: i, realIndex: r} = e
              , n = e.virtual && s.virtual.enabled;
            let l;
            t.removeClass(`${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`),
            l = n ? e.$wrapperEl.find(`.${s.slideClass}[data-swiper-slide-index="${i}"]`) : t.eq(i),
            l.addClass(s.slideActiveClass),
            s.loop && (l.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${r}"]`).addClass(s.slideDuplicateActiveClass));
            let o = l.nextAll(`.${s.slideClass}`).eq(0).addClass(s.slideNextClass);
            s.loop && 0 === o.length && (o = t.eq(0),
            o.addClass(s.slideNextClass));
            let d = l.prevAll(`.${s.slideClass}`).eq(0).addClass(s.slidePrevClass);
            s.loop && 0 === d.length && (d = t.eq(-1),
            d.addClass(s.slidePrevClass)),
            s.loop && (o.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicateNextClass),
            d.hasClass(s.slideDuplicateClass) ? a.children(`.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass) : a.children(`.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${d.attr("data-swiper-slide-index")}"]`).addClass(s.slideDuplicatePrevClass)),
            e.emitSlidesClasses()
        },
        updateActiveIndex: function(e) {
            const t = this
              , s = t.rtlTranslate ? t.translate : -t.translate
              , {slidesGrid: a, snapGrid: i, params: r, activeIndex: n, realIndex: l, snapIndex: o} = t;
            let d, c = e;
            if (void 0 === c) {
                for (let e = 0; e < a.length; e += 1)
                    void 0 !== a[e + 1] ? s >= a[e] && s < a[e + 1] - (a[e + 1] - a[e]) / 2 ? c = e : s >= a[e] && s < a[e + 1] && (c = e + 1) : s >= a[e] && (c = e);
                r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0)
            }
            if (i.indexOf(s) >= 0)
                d = i.indexOf(s);
            else {
                const e = Math.min(r.slidesPerGroupSkip, c);
                d = e + Math.floor((c - e) / r.slidesPerGroup)
            }
            if (d >= i.length && (d = i.length - 1),
            c === n)
                return void (d !== o && (t.snapIndex = d,
                t.emit("snapIndexChange")));
            const p = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10);
            Object.assign(t, {
                snapIndex: d,
                realIndex: p,
                previousIndex: n,
                activeIndex: c
            }),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            l !== p && t.emit("realIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange")
        },
        updateClickedSlide: function(e) {
            const t = this
              , s = t.params
              , a = d(e).closest(`.${s.slideClass}`)[0];
            let i, r = !1;
            if (a)
                for (let e = 0; e < t.slides.length; e += 1)
                    if (t.slides[e] === a) {
                        r = !0,
                        i = e;
                        break
                    }
            if (!a || !r)
                return t.clickedSlide = void 0,
                void (t.clickedIndex = void 0);
            t.clickedSlide = a,
            t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(d(a).attr("data-swiper-slide-index"), 10) : t.clickedIndex = i,
            s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
        }
    };
    var M = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            const {params: t, rtlTranslate: s, translate: a, $wrapperEl: i} = this;
            if (t.virtualTranslate)
                return s ? -a : a;
            if (t.cssMode)
                return a;
            let r = h(i[0], e);
            return s && (r = -r),
            r || 0
        },
        setTranslate: function(e, t) {
            const s = this
              , {rtlTranslate: a, params: i, $wrapperEl: r, wrapperEl: n, progress: l} = s;
            let o, d = 0, c = 0;
            s.isHorizontal() ? d = a ? -e : e : c = e,
            i.roundLengths && (d = Math.floor(d),
            c = Math.floor(c)),
            i.cssMode ? n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -d : -c : i.virtualTranslate || r.transform(`translate3d(${d}px, ${c}px, 0px)`),
            s.previousTranslate = s.translate,
            s.translate = s.isHorizontal() ? d : c;
            const p = s.maxTranslate() - s.minTranslate();
            o = 0 === p ? 0 : (e - s.minTranslate()) / p,
            o !== l && s.updateProgress(e),
            s.emit("setTranslate", s.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function(e, t, s, a, i) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            void 0 === a && (a = !0);
            const r = this
              , {params: n, wrapperEl: l} = r;
            if (r.animating && n.preventInteractionOnTransition)
                return !1;
            const o = r.minTranslate()
              , d = r.maxTranslate();
            let c;
            if (c = a && e > o ? o : a && e < d ? d : e,
            r.updateProgress(c),
            n.cssMode) {
                const e = r.isHorizontal();
                if (0 === t)
                    l[e ? "scrollLeft" : "scrollTop"] = -c;
                else {
                    if (!r.support.smoothScroll)
                        return w({
                            swiper: r,
                            targetPosition: -c,
                            side: e ? "left" : "top"
                        }),
                        !0;
                    l.scrollTo({
                        [e ? "left" : "top"]: -c,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return 0 === t ? (r.setTransition(0),
            r.setTranslate(c),
            s && (r.emit("beforeTransitionStart", t, i),
            r.emit("transitionEnd"))) : (r.setTransition(t),
            r.setTranslate(c),
            s && (r.emit("beforeTransitionStart", t, i),
            r.emit("transitionStart")),
            r.animating || (r.animating = !0,
            r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd),
                r.onTranslateToWrapperTransitionEnd = null,
                delete r.onTranslateToWrapperTransitionEnd,
                s && r.emit("transitionEnd"))
            }
            ),
            r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
            r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))),
            !0
        }
    };
    function P(e) {
        let {swiper: t, runCallbacks: s, direction: a, step: i} = e;
        const {activeIndex: r, previousIndex: n} = t;
        let l = a;
        if (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
        t.emit(`transition${i}`),
        s && r !== n) {
            if ("reset" === l)
                return void t.emit(`slideResetTransition${i}`);
            t.emit(`slideChangeTransition${i}`),
            "next" === l ? t.emit(`slideNextTransition${i}`) : t.emit(`slidePrevTransition${i}`)
        }
    }
    var k = {
        slideTo: function(e, t, s, a, i) {
            if (void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0),
            "number" != typeof e && "string" != typeof e)
                throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
            if ("string" == typeof e) {
                const t = parseInt(e, 10);
                if (!isFinite(t))
                    throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
                e = t
            }
            const r = this;
            let n = e;
            n < 0 && (n = 0);
            const {params: l, snapGrid: o, slidesGrid: d, previousIndex: c, activeIndex: p, rtlTranslate: u, wrapperEl: h, enabled: m} = r;
            if (r.animating && l.preventInteractionOnTransition || !m && !a && !i)
                return !1;
            const f = Math.min(r.params.slidesPerGroupSkip, n);
            let g = f + Math.floor((n - f) / r.params.slidesPerGroup);
            g >= o.length && (g = o.length - 1),
            (p || l.initialSlide || 0) === (c || 0) && s && r.emit("beforeSlideChangeStart");
            const v = -o[g];
            if (r.updateProgress(v),
            l.normalizeSlideIndex)
                for (let e = 0; e < d.length; e += 1) {
                    const t = -Math.floor(100 * v)
                      , s = Math.floor(100 * d[e])
                      , a = Math.floor(100 * d[e + 1]);
                    void 0 !== d[e + 1] ? t >= s && t < a - (a - s) / 2 ? n = e : t >= s && t < a && (n = e + 1) : t >= s && (n = e)
                }
            if (r.initialized && n !== p) {
                if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
                    return !1;
                if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (p || 0) !== n)
                    return !1
            }
            let b;
            if (b = n > p ? "next" : n < p ? "prev" : "reset",
            u && -v === r.translate || !u && v === r.translate)
                return r.updateActiveIndex(n),
                l.autoHeight && r.updateAutoHeight(),
                r.updateSlidesClasses(),
                "slide" !== l.effect && r.setTranslate(v),
                "reset" !== b && (r.transitionStart(s, b),
                r.transitionEnd(s, b)),
                !1;
            if (l.cssMode) {
                const e = r.isHorizontal()
                  , s = u ? v : -v;
                if (0 === t) {
                    const t = r.virtual && r.params.virtual.enabled;
                    t && (r.wrapperEl.style.scrollSnapType = "none",
                    r._immediateVirtual = !0),
                    h[e ? "scrollLeft" : "scrollTop"] = s,
                    t && requestAnimationFrame((()=>{
                        r.wrapperEl.style.scrollSnapType = "",
                        r._swiperImmediateVirtual = !1
                    }
                    ))
                } else {
                    if (!r.support.smoothScroll)
                        return w({
                            swiper: r,
                            targetPosition: s,
                            side: e ? "left" : "top"
                        }),
                        !0;
                    h.scrollTo({
                        [e ? "left" : "top"]: s,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return r.setTransition(t),
            r.setTranslate(v),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, a),
            r.transitionStart(s, b),
            0 === t ? r.transitionEnd(s, b) : r.animating || (r.animating = !0,
            r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd),
                r.onSlideToWrapperTransitionEnd = null,
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(s, b))
            }
            ),
            r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
            r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd)),
            !0
        },
        slideToLoop: function(e, t, s, a) {
            void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === s && (s = !0);
            const i = this;
            let r = e;
            return i.params.loop && (r += i.loopedSlides),
            i.slideTo(r, t, s, a)
        },
        slideNext: function(e, t, s) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            const a = this
              , {animating: i, enabled: r, params: n} = a;
            if (!r)
                return a;
            let l = n.slidesPerGroup;
            "auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (l = Math.max(a.slidesPerViewDynamic("current", !0), 1));
            const o = a.activeIndex < n.slidesPerGroupSkip ? 1 : l;
            if (n.loop) {
                if (i && n.loopPreventsSlide)
                    return !1;
                a.loopFix(),
                a._clientLeft = a.$wrapperEl[0].clientLeft
            }
            return n.rewind && a.isEnd ? a.slideTo(0, e, t, s) : a.slideTo(a.activeIndex + o, e, t, s)
        },
        slidePrev: function(e, t, s) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0);
            const a = this
              , {params: i, animating: r, snapGrid: n, slidesGrid: l, rtlTranslate: o, enabled: d} = a;
            if (!d)
                return a;
            if (i.loop) {
                if (r && i.loopPreventsSlide)
                    return !1;
                a.loopFix(),
                a._clientLeft = a.$wrapperEl[0].clientLeft
            }
            function c(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            const p = c(o ? a.translate : -a.translate)
              , u = n.map((e=>c(e)));
            let h = n[u.indexOf(p) - 1];
            if (void 0 === h && i.cssMode) {
                let e;
                n.forEach(((t,s)=>{
                    p >= t && (e = s)
                }
                )),
                void 0 !== e && (h = n[e > 0 ? e - 1 : e])
            }
            let m = 0;
            if (void 0 !== h && (m = l.indexOf(h),
            m < 0 && (m = a.activeIndex - 1),
            "auto" === i.slidesPerView && 1 === i.slidesPerGroup && i.slidesPerGroupAuto && (m = m - a.slidesPerViewDynamic("previous", !0) + 1,
            m = Math.max(m, 0))),
            i.rewind && a.isBeginning) {
                const i = a.params.virtual && a.params.virtual.enabled && a.virtual ? a.virtual.slides.length - 1 : a.slides.length - 1;
                return a.slideTo(i, e, t, s)
            }
            return a.slideTo(m, e, t, s)
        },
        slideReset: function(e, t, s) {
            return void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            this.slideTo(this.activeIndex, e, t, s)
        },
        slideToClosest: function(e, t, s, a) {
            void 0 === e && (e = this.params.speed),
            void 0 === t && (t = !0),
            void 0 === a && (a = .5);
            const i = this;
            let r = i.activeIndex;
            const n = Math.min(i.params.slidesPerGroupSkip, r)
              , l = n + Math.floor((r - n) / i.params.slidesPerGroup)
              , o = i.rtlTranslate ? i.translate : -i.translate;
            if (o >= i.snapGrid[l]) {
                const e = i.snapGrid[l];
                o - e > (i.snapGrid[l + 1] - e) * a && (r += i.params.slidesPerGroup)
            } else {
                const e = i.snapGrid[l - 1];
                o - e <= (i.snapGrid[l] - e) * a && (r -= i.params.slidesPerGroup)
            }
            return r = Math.max(r, 0),
            r = Math.min(r, i.slidesGrid.length - 1),
            i.slideTo(r, e, t, s)
        },
        slideToClickedSlide: function() {
            const e = this
              , {params: t, $wrapperEl: s} = e
              , a = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let i, r = e.clickedIndex;
            if (t.loop) {
                if (e.animating)
                    return;
                i = parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10),
                t.centeredSlides ? r < e.loopedSlides - a / 2 || r > e.slides.length - e.loopedSlides + a / 2 ? (e.loopFix(),
                r = s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),
                p((()=>{
                    e.slideTo(r)
                }
                ))) : e.slideTo(r) : r > e.slides.length - a ? (e.loopFix(),
                r = s.children(`.${t.slideClass}[data-swiper-slide-index="${i}"]:not(.${t.slideDuplicateClass})`).eq(0).index(),
                p((()=>{
                    e.slideTo(r)
                }
                ))) : e.slideTo(r)
            } else
                e.slideTo(r)
        }
    };
    var z = {
        loopCreate: function() {
            const e = this
              , t = a()
              , {params: s, $wrapperEl: i} = e
              , r = i.children().length > 0 ? d(i.children()[0].parentNode) : i;
            r.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
            let n = r.children(`.${s.slideClass}`);
            if (s.loopFillGroupWithBlank) {
                const e = s.slidesPerGroup - n.length % s.slidesPerGroup;
                if (e !== s.slidesPerGroup) {
                    for (let a = 0; a < e; a += 1) {
                        const e = d(t.createElement("div")).addClass(`${s.slideClass} ${s.slideBlankClass}`);
                        r.append(e)
                    }
                    n = r.children(`.${s.slideClass}`)
                }
            }
            "auto" !== s.slidesPerView || s.loopedSlides || (s.loopedSlides = n.length),
            e.loopedSlides = Math.ceil(parseFloat(s.loopedSlides || s.slidesPerView, 10)),
            e.loopedSlides += s.loopAdditionalSlides,
            e.loopedSlides > n.length && (e.loopedSlides = n.length);
            const l = []
              , o = [];
            n.each(((t,s)=>{
                const a = d(t);
                s < e.loopedSlides && o.push(t),
                s < n.length && s >= n.length - e.loopedSlides && l.push(t),
                a.attr("data-swiper-slide-index", s)
            }
            ));
            for (let e = 0; e < o.length; e += 1)
                r.append(d(o[e].cloneNode(!0)).addClass(s.slideDuplicateClass));
            for (let e = l.length - 1; e >= 0; e -= 1)
                r.prepend(d(l[e].cloneNode(!0)).addClass(s.slideDuplicateClass))
        },
        loopFix: function() {
            const e = this;
            e.emit("beforeLoopFix");
            const {activeIndex: t, slides: s, loopedSlides: a, allowSlidePrev: i, allowSlideNext: r, snapGrid: n, rtlTranslate: l} = e;
            let o;
            e.allowSlidePrev = !0,
            e.allowSlideNext = !0;
            const d = -n[t] - e.getTranslate();
            if (t < a) {
                o = s.length - 3 * a + t,
                o += a;
                e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)
            } else if (t >= s.length - a) {
                o = -s.length + t + a,
                o += a;
                e.slideTo(o, 0, !1, !0) && 0 !== d && e.setTranslate((l ? -e.translate : e.translate) - d)
            }
            e.allowSlidePrev = i,
            e.allowSlideNext = r,
            e.emit("loopFix")
        },
        loopDestroy: function() {
            const {$wrapperEl: e, params: t, slides: s} = this;
            e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`).remove(),
            s.removeAttr("data-swiper-slide-index")
        }
    };
    function O(e) {
        const t = this
          , s = a()
          , i = r()
          , n = t.touchEventsData
          , {params: l, touches: o, enabled: c} = t;
        if (!c)
            return;
        if (t.animating && l.preventInteractionOnTransition)
            return;
        !t.animating && l.cssMode && l.loop && t.loopFix();
        let p = e;
        p.originalEvent && (p = p.originalEvent);
        let h = d(p.target);
        if ("wrapper" === l.touchEventsTarget && !h.closest(t.wrapperEl).length)
            return;
        if (n.isTouchEvent = "touchstart" === p.type,
        !n.isTouchEvent && "which"in p && 3 === p.which)
            return;
        if (!n.isTouchEvent && "button"in p && p.button > 0)
            return;
        if (n.isTouched && n.isMoved)
            return;
        !!l.noSwipingClass && "" !== l.noSwipingClass && p.target && p.target.shadowRoot && e.path && e.path[0] && (h = d(e.path[0]));
        const m = l.noSwipingSelector ? l.noSwipingSelector : `.${l.noSwipingClass}`
          , f = !(!p.target || !p.target.shadowRoot);
        if (l.noSwiping && (f ? function(e, t) {
            return void 0 === t && (t = this),
            function t(s) {
                return s && s !== a() && s !== r() ? (s.assignedSlot && (s = s.assignedSlot),
                s.closest(e) || t(s.getRootNode().host)) : null
            }(t)
        }(m, p.target) : h.closest(m)[0]))
            return void (t.allowClick = !0);
        if (l.swipeHandler && !h.closest(l.swipeHandler)[0])
            return;
        o.currentX = "touchstart" === p.type ? p.targetTouches[0].pageX : p.pageX,
        o.currentY = "touchstart" === p.type ? p.targetTouches[0].pageY : p.pageY;
        const g = o.currentX
          , v = o.currentY
          , w = l.edgeSwipeDetection || l.iOSEdgeSwipeDetection
          , b = l.edgeSwipeThreshold || l.iOSEdgeSwipeThreshold;
        if (w && (g <= b || g >= i.innerWidth - b)) {
            if ("prevent" !== w)
                return;
            e.preventDefault()
        }
        if (Object.assign(n, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0
        }),
        o.startX = g,
        o.startY = v,
        n.touchStartTime = u(),
        t.allowClick = !0,
        t.updateSize(),
        t.swipeDirection = void 0,
        l.threshold > 0 && (n.allowThresholdMove = !1),
        "touchstart" !== p.type) {
            let e = !0;
            h.is(n.focusableElements) && (e = !1,
            "SELECT" === h[0].nodeName && (n.isTouched = !1)),
            s.activeElement && d(s.activeElement).is(n.focusableElements) && s.activeElement !== h[0] && s.activeElement.blur();
            const a = e && t.allowTouchMove && l.touchStartPreventDefault;
            !l.touchStartForcePreventDefault && !a || h[0].isContentEditable || p.preventDefault()
        }
        t.params.freeMode && t.params.freeMode.enabled && t.freeMode && t.animating && !l.cssMode && t.freeMode.onTouchStart(),
        t.emit("touchStart", p)
    }
    function I(e) {
        const t = a()
          , s = this
          , i = s.touchEventsData
          , {params: r, touches: n, rtlTranslate: l, enabled: o} = s;
        if (!o)
            return;
        let c = e;
        if (c.originalEvent && (c = c.originalEvent),
        !i.isTouched)
            return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", c));
        if (i.isTouchEvent && "touchmove" !== c.type)
            return;
        const p = "touchmove" === c.type && c.targetTouches && (c.targetTouches[0] || c.changedTouches[0])
          , h = "touchmove" === c.type ? p.pageX : c.pageX
          , m = "touchmove" === c.type ? p.pageY : c.pageY;
        if (c.preventedByNestedSwiper)
            return n.startX = h,
            void (n.startY = m);
        if (!s.allowTouchMove)
            return d(c.target).is(i.focusableElements) || (s.allowClick = !1),
            void (i.isTouched && (Object.assign(n, {
                startX: h,
                startY: m,
                currentX: h,
                currentY: m
            }),
            i.touchStartTime = u()));
        if (i.isTouchEvent && r.touchReleaseOnEdges && !r.loop)
            if (s.isVertical()) {
                if (m < n.startY && s.translate <= s.maxTranslate() || m > n.startY && s.translate >= s.minTranslate())
                    return i.isTouched = !1,
                    void (i.isMoved = !1)
            } else if (h < n.startX && s.translate <= s.maxTranslate() || h > n.startX && s.translate >= s.minTranslate())
                return;
        if (i.isTouchEvent && t.activeElement && c.target === t.activeElement && d(c.target).is(i.focusableElements))
            return i.isMoved = !0,
            void (s.allowClick = !1);
        if (i.allowTouchCallbacks && s.emit("touchMove", c),
        c.targetTouches && c.targetTouches.length > 1)
            return;
        n.currentX = h,
        n.currentY = m;
        const f = n.currentX - n.startX
          , g = n.currentY - n.startY;
        if (s.params.threshold && Math.sqrt(f ** 2 + g ** 2) < s.params.threshold)
            return;
        if (void 0 === i.isScrolling) {
            let e;
            s.isHorizontal() && n.currentY === n.startY || s.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : f * f + g * g >= 25 && (e = 180 * Math.atan2(Math.abs(g), Math.abs(f)) / Math.PI,
            i.isScrolling = s.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle)
        }
        if (i.isScrolling && s.emit("touchMoveOpposite", c),
        void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)),
        i.isScrolling)
            return void (i.isTouched = !1);
        if (!i.startMoving)
            return;
        s.allowClick = !1,
        !r.cssMode && c.cancelable && c.preventDefault(),
        r.touchMoveStopPropagation && !r.nested && c.stopPropagation(),
        i.isMoved || (r.loop && !r.cssMode && s.loopFix(),
        i.startTranslate = s.getTranslate(),
        s.setTransition(0),
        s.animating && s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        i.allowMomentumBounce = !1,
        !r.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0),
        s.emit("sliderFirstMove", c)),
        s.emit("sliderMove", c),
        i.isMoved = !0;
        let v = s.isHorizontal() ? f : g;
        n.diff = v,
        v *= r.touchRatio,
        l && (v = -v),
        s.swipeDirection = v > 0 ? "prev" : "next",
        i.currentTranslate = v + i.startTranslate;
        let w = !0
          , b = r.resistanceRatio;
        if (r.touchReleaseOnEdges && (b = 0),
        v > 0 && i.currentTranslate > s.minTranslate() ? (w = !1,
        r.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + v) ** b)) : v < 0 && i.currentTranslate < s.maxTranslate() && (w = !1,
        r.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - v) ** b)),
        w && (c.preventedByNestedSwiper = !0),
        !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate),
        r.threshold > 0) {
            if (!(Math.abs(v) > r.threshold || i.allowThresholdMove))
                return void (i.currentTranslate = i.startTranslate);
            if (!i.allowThresholdMove)
                return i.allowThresholdMove = !0,
                n.startX = n.currentX,
                n.startY = n.currentY,
                i.currentTranslate = i.startTranslate,
                void (n.diff = s.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
        }
        r.followFinger && !r.cssMode && ((r.freeMode && r.freeMode.enabled && s.freeMode || r.watchSlidesProgress) && (s.updateActiveIndex(),
        s.updateSlidesClasses()),
        s.params.freeMode && r.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate))
    }
    function L(e) {
        const t = this
          , s = t.touchEventsData
          , {params: a, touches: i, rtlTranslate: r, slidesGrid: n, enabled: l} = t;
        if (!l)
            return;
        let o = e;
        if (o.originalEvent && (o = o.originalEvent),
        s.allowTouchCallbacks && t.emit("touchEnd", o),
        s.allowTouchCallbacks = !1,
        !s.isTouched)
            return s.isMoved && a.grabCursor && t.setGrabCursor(!1),
            s.isMoved = !1,
            void (s.startMoving = !1);
        a.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        const d = u()
          , c = d - s.touchStartTime;
        if (t.allowClick) {
            const e = o.path || o.composedPath && o.composedPath();
            t.updateClickedSlide(e && e[0] || o.target),
            t.emit("tap click", o),
            c < 300 && d - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", o)
        }
        if (s.lastClickTime = u(),
        p((()=>{
            t.destroyed || (t.allowClick = !0)
        }
        )),
        !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === i.diff || s.currentTranslate === s.startTranslate)
            return s.isTouched = !1,
            s.isMoved = !1,
            void (s.startMoving = !1);
        let h;
        if (s.isTouched = !1,
        s.isMoved = !1,
        s.startMoving = !1,
        h = a.followFinger ? r ? t.translate : -t.translate : -s.currentTranslate,
        a.cssMode)
            return;
        if (t.params.freeMode && a.freeMode.enabled)
            return void t.freeMode.onTouchEnd({
                currentPos: h
            });
        let m = 0
          , f = t.slidesSizesGrid[0];
        for (let e = 0; e < n.length; e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup) {
            const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
            void 0 !== n[e + t] ? h >= n[e] && h < n[e + t] && (m = e,
            f = n[e + t] - n[e]) : h >= n[e] && (m = e,
            f = n[n.length - 1] - n[n.length - 2])
        }
        let g = null
          , v = null;
        a.rewind && (t.isBeginning ? v = t.params.virtual && t.params.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (g = 0));
        const w = (h - n[m]) / f
          , b = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
        if (c > a.longSwipesMs) {
            if (!a.longSwipes)
                return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && (w >= a.longSwipesRatio ? t.slideTo(a.rewind && t.isEnd ? g : m + b) : t.slideTo(m)),
            "prev" === t.swipeDirection && (w > 1 - a.longSwipesRatio ? t.slideTo(m + b) : null !== v && w < 0 && Math.abs(w) > a.longSwipesRatio ? t.slideTo(v) : t.slideTo(m))
        } else {
            if (!a.shortSwipes)
                return void t.slideTo(t.activeIndex);
            t.navigation && (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl) ? o.target === t.navigation.nextEl ? t.slideTo(m + b) : t.slideTo(m) : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : m + b),
            "prev" === t.swipeDirection && t.slideTo(null !== v ? v : m))
        }
    }
    function A() {
        const e = this
          , {params: t, el: s} = e;
        if (s && 0 === s.offsetWidth)
            return;
        t.breakpoints && e.setBreakpoint();
        const {allowSlideNext: a, allowSlidePrev: i, snapGrid: r} = e;
        e.allowSlideNext = !0,
        e.allowSlidePrev = !0,
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses(),
        ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0),
        e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
        e.allowSlidePrev = i,
        e.allowSlideNext = a,
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
    }
    function D(e) {
        const t = this;
        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation && t.animating && (e.stopPropagation(),
        e.stopImmediatePropagation())))
    }
    function G() {
        const e = this
          , {wrapperEl: t, rtlTranslate: s, enabled: a} = e;
        if (!a)
            return;
        let i;
        e.previousTranslate = e.translate,
        e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop,
        -0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        i = 0 === r ? 0 : (e.translate - e.minTranslate()) / r,
        i !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1)
    }
    let B = !1;
    function N() {}
    const H = (e,t)=>{
        const s = a()
          , {params: i, touchEvents: r, el: n, wrapperEl: l, device: o, support: d} = e
          , c = !!i.nested
          , p = "on" === t ? "addEventListener" : "removeEventListener"
          , u = t;
        if (d.touch) {
            const t = !("touchstart" !== r.start || !d.passiveListener || !i.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            n[p](r.start, e.onTouchStart, t),
            n[p](r.move, e.onTouchMove, d.passiveListener ? {
                passive: !1,
                capture: c
            } : c),
            n[p](r.end, e.onTouchEnd, t),
            r.cancel && n[p](r.cancel, e.onTouchEnd, t)
        } else
            n[p](r.start, e.onTouchStart, !1),
            s[p](r.move, e.onTouchMove, c),
            s[p](r.end, e.onTouchEnd, !1);
        (i.preventClicks || i.preventClicksPropagation) && n[p]("click", e.onClick, !0),
        i.cssMode && l[p]("scroll", e.onScroll),
        i.updateOnWindowResize ? e[u](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", A, !0) : e[u]("observerUpdate", A, !0)
    }
    ;
    var X = {
        attachEvents: function() {
            const e = this
              , t = a()
              , {params: s, support: i} = e;
            e.onTouchStart = O.bind(e),
            e.onTouchMove = I.bind(e),
            e.onTouchEnd = L.bind(e),
            s.cssMode && (e.onScroll = G.bind(e)),
            e.onClick = D.bind(e),
            i.touch && !B && (t.addEventListener("touchstart", N),
            B = !0),
            H(e, "on")
        },
        detachEvents: function() {
            H(this, "off")
        }
    };
    const Y = (e,t)=>e.grid && t.grid && t.grid.rows > 1;
    var R = {
        addClasses: function() {
            const e = this
              , {classNames: t, params: s, rtl: a, $el: i, device: r, support: n} = e
              , l = function(e, t) {
                const s = [];
                return e.forEach((e=>{
                    "object" == typeof e ? Object.keys(e).forEach((a=>{
                        e[a] && s.push(t + a)
                    }
                    )) : "string" == typeof e && s.push(t + e)
                }
                )),
                s
            }(["initialized", s.direction, {
                "pointer-events": !n.touch
            }, {
                "free-mode": e.params.freeMode && s.freeMode.enabled
            }, {
                autoheight: s.autoHeight
            }, {
                rtl: a
            }, {
                grid: s.grid && s.grid.rows > 1
            }, {
                "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
            }, {
                android: r.android
            }, {
                ios: r.ios
            }, {
                "css-mode": s.cssMode
            }, {
                centered: s.cssMode && s.centeredSlides
            }], s.containerModifierClass);
            t.push(...l),
            i.addClass([...t].join(" ")),
            e.emitContainerClasses()
        },
        removeClasses: function() {
            const {$el: e, classNames: t} = this;
            e.removeClass(t.join(" ")),
            this.emitContainerClasses()
        }
    };
    var W = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };
    function j(e, t) {
        return function(s) {
            void 0 === s && (s = {});
            const a = Object.keys(s)[0]
              , i = s[a];
            "object" == typeof i && null !== i ? (["navigation", "pagination", "scrollbar"].indexOf(a) >= 0 && !0 === e[a] && (e[a] = {
                auto: !0
            }),
            a in e && "enabled"in i ? (!0 === e[a] && (e[a] = {
                enabled: !0
            }),
            "object" != typeof e[a] || "enabled"in e[a] || (e[a].enabled = !0),
            e[a] || (e[a] = {
                enabled: !1
            }),
            g(t, s)) : g(t, s)) : g(t, s)
        }
    }
    const _ = {
        eventsEmitter: $,
        update: S,
        translate: M,
        transition: {
            setTransition: function(e, t) {
                const s = this;
                s.params.cssMode || s.$wrapperEl.transition(e),
                s.emit("setTransition", e, t)
            },
            transitionStart: function(e, t) {
                void 0 === e && (e = !0);
                const s = this
                  , {params: a} = s;
                a.cssMode || (a.autoHeight && s.updateAutoHeight(),
                P({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "Start"
                }))
            },
            transitionEnd: function(e, t) {
                void 0 === e && (e = !0);
                const s = this
                  , {params: a} = s;
                s.animating = !1,
                a.cssMode || (s.setTransition(0),
                P({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "End"
                }))
            }
        },
        slide: k,
        loop: z,
        grabCursor: {
            setGrabCursor: function(e) {
                const t = this;
                if (t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
                    return;
                const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                s.style.cursor = "move",
                s.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
                s.style.cursor = e ? "-moz-grabbin" : "-moz-grab",
                s.style.cursor = e ? "grabbing" : "grab"
            },
            unsetGrabCursor: function() {
                const e = this;
                e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "")
            }
        },
        events: X,
        breakpoints: {
            setBreakpoint: function() {
                const e = this
                  , {activeIndex: t, initialized: s, loopedSlides: a=0, params: i, $el: r} = e
                  , n = i.breakpoints;
                if (!n || n && 0 === Object.keys(n).length)
                    return;
                const l = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
                if (!l || e.currentBreakpoint === l)
                    return;
                const o = (l in n ? n[l] : void 0) || e.originalParams
                  , d = Y(e, i)
                  , c = Y(e, o)
                  , p = i.enabled;
                d && !c ? (r.removeClass(`${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()) : !d && c && (r.addClass(`${i.containerModifierClass}grid`),
                (o.grid.fill && "column" === o.grid.fill || !o.grid.fill && "column" === i.grid.fill) && r.addClass(`${i.containerModifierClass}grid-column`),
                e.emitContainerClasses());
                const u = o.direction && o.direction !== i.direction
                  , h = i.loop && (o.slidesPerView !== i.slidesPerView || u);
                u && s && e.changeDirection(),
                g(e.params, o);
                const m = e.params.enabled;
                Object.assign(e, {
                    allowTouchMove: e.params.allowTouchMove,
                    allowSlideNext: e.params.allowSlideNext,
                    allowSlidePrev: e.params.allowSlidePrev
                }),
                p && !m ? e.disable() : !p && m && e.enable(),
                e.currentBreakpoint = l,
                e.emit("_beforeBreakpoint", o),
                h && s && (e.loopDestroy(),
                e.loopCreate(),
                e.updateSlides(),
                e.slideTo(t - a + e.loopedSlides, 0, !1)),
                e.emit("breakpoint", o)
            },
            getBreakpoint: function(e, t, s) {
                if (void 0 === t && (t = "window"),
                !e || "container" === t && !s)
                    return;
                let a = !1;
                const i = r()
                  , n = "window" === t ? i.innerHeight : s.clientHeight
                  , l = Object.keys(e).map((e=>{
                    if ("string" == typeof e && 0 === e.indexOf("@")) {
                        const t = parseFloat(e.substr(1));
                        return {
                            value: n * t,
                            point: e
                        }
                    }
                    return {
                        value: e,
                        point: e
                    }
                }
                ));
                l.sort(((e,t)=>parseInt(e.value, 10) - parseInt(t.value, 10)));
                for (let e = 0; e < l.length; e += 1) {
                    const {point: r, value: n} = l[e];
                    "window" === t ? i.matchMedia(`(min-width: ${n}px)`).matches && (a = r) : n <= s.clientWidth && (a = r)
                }
                return a || "max"
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                const e = this
                  , {isLocked: t, params: s} = e
                  , {slidesOffsetBefore: a} = s;
                if (a) {
                    const t = e.slides.length - 1
                      , s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * a;
                    e.isLocked = e.size > s
                } else
                    e.isLocked = 1 === e.snapGrid.length;
                !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
            }
        },
        classes: R,
        images: {
            loadImage: function(e, t, s, a, i, n) {
                const l = r();
                let o;
                function c() {
                    n && n()
                }
                d(e).parent("picture")[0] || e.complete && i ? c() : t ? (o = new l.Image,
                o.onload = c,
                o.onerror = c,
                a && (o.sizes = a),
                s && (o.srcset = s),
                t && (o.src = t)) : c()
            },
            preloadImages: function() {
                const e = this;
                function t() {
                    null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                    e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(),
                    e.emit("imagesReady")))
                }
                e.imagesToLoad = e.$el.find("img");
                for (let s = 0; s < e.imagesToLoad.length; s += 1) {
                    const a = e.imagesToLoad[s];
                    e.loadImage(a, a.currentSrc || a.getAttribute("src"), a.srcset || a.getAttribute("srcset"), a.sizes || a.getAttribute("sizes"), !0, t)
                }
            }
        }
    }
      , q = {};
    class V {
        constructor() {
            let e, t;
            for (var s = arguments.length, a = new Array(s), i = 0; i < s; i++)
                a[i] = arguments[i];
            if (1 === a.length && a[0].constructor && "Object" === Object.prototype.toString.call(a[0]).slice(8, -1) ? t = a[0] : [e,t] = a,
            t || (t = {}),
            t = g({}, t),
            e && !t.el && (t.el = e),
            t.el && d(t.el).length > 1) {
                const e = [];
                return d(t.el).each((s=>{
                    const a = g({}, t, {
                        el: s
                    });
                    e.push(new V(a))
                }
                )),
                e
            }
            const r = this;
            r.__swiper__ = !0,
            r.support = E(),
            r.device = T({
                userAgent: t.userAgent
            }),
            r.browser = C(),
            r.eventsListeners = {},
            r.eventsAnyListeners = [],
            r.modules = [...r.__modules__],
            t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
            const n = {};
            r.modules.forEach((e=>{
                e({
                    swiper: r,
                    extendParams: j(t, n),
                    on: r.on.bind(r),
                    once: r.once.bind(r),
                    off: r.off.bind(r),
                    emit: r.emit.bind(r)
                })
            }
            ));
            const l = g({}, W, n);
            return r.params = g({}, l, q, t),
            r.originalParams = g({}, r.params),
            r.passedParams = g({}, t),
            r.params && r.params.on && Object.keys(r.params.on).forEach((e=>{
                r.on(e, r.params.on[e])
            }
            )),
            r.params && r.params.onAny && r.onAny(r.params.onAny),
            r.$ = d,
            Object.assign(r, {
                enabled: r.params.enabled,
                el: e,
                classNames: [],
                slides: d(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: ()=>"horizontal" === r.params.direction,
                isVertical: ()=>"vertical" === r.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: r.params.allowSlideNext,
                allowSlidePrev: r.params.allowSlidePrev,
                touchEvents: function() {
                    const e = ["touchstart", "touchmove", "touchend", "touchcancel"]
                      , t = ["pointerdown", "pointermove", "pointerup"];
                    return r.touchEventsTouch = {
                        start: e[0],
                        move: e[1],
                        end: e[2],
                        cancel: e[3]
                    },
                    r.touchEventsDesktop = {
                        start: t[0],
                        move: t[1],
                        end: t[2]
                    },
                    r.support.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop
                }(),
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: r.params.focusableElements,
                    lastClickTime: u(),
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    isTouchEvent: void 0,
                    startMoving: void 0
                },
                allowClick: !0,
                allowTouchMove: r.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            r.emit("_swiper"),
            r.params.init && r.init(),
            r
        }
        enable() {
            const e = this;
            e.enabled || (e.enabled = !0,
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
        }
        disable() {
            const e = this;
            e.enabled && (e.enabled = !1,
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
        }
        setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const a = s.minTranslate()
              , i = (s.maxTranslate() - a) * e + a;
            s.translateTo(i, void 0 === t ? 0 : t),
            s.updateActiveIndex(),
            s.updateSlidesClasses()
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el)
                return;
            const t = e.el.className.split(" ").filter((t=>0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass)));
            e.emit("_containerClasses", t.join(" "))
        }
        getSlideClasses(e) {
            const t = this;
            return e.className.split(" ").filter((e=>0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))).join(" ")
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el)
                return;
            const t = [];
            e.slides.each((s=>{
                const a = e.getSlideClasses(s);
                t.push({
                    slideEl: s,
                    classNames: a
                }),
                e.emit("_slideClass", s, a)
            }
            )),
            e.emit("_slideClasses", t)
        }
        slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"),
            void 0 === t && (t = !1);
            const {params: s, slides: a, slidesGrid: i, slidesSizesGrid: r, size: n, activeIndex: l} = this;
            let o = 1;
            if (s.centeredSlides) {
                let e, t = a[l].swiperSlideSize;
                for (let s = l + 1; s < a.length; s += 1)
                    a[s] && !e && (t += a[s].swiperSlideSize,
                    o += 1,
                    t > n && (e = !0));
                for (let s = l - 1; s >= 0; s -= 1)
                    a[s] && !e && (t += a[s].swiperSlideSize,
                    o += 1,
                    t > n && (e = !0))
            } else if ("current" === e)
                for (let e = l + 1; e < a.length; e += 1) {
                    (t ? i[e] + r[e] - i[l] < n : i[e] - i[l] < n) && (o += 1)
                }
            else
                for (let e = l - 1; e >= 0; e -= 1) {
                    i[l] - i[e] < n && (o += 1)
                }
            return o
        }
        update() {
            const e = this;
            if (!e || e.destroyed)
                return;
            const {snapGrid: t, params: s} = e;
            function a() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate
                  , s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            let i;
            s.breakpoints && e.setBreakpoint(),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            e.params.freeMode && e.params.freeMode.enabled ? (a(),
            e.params.autoHeight && e.updateAutoHeight()) : (i = ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0),
            i || a()),
            s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update")
        }
        changeDirection(e, t) {
            void 0 === t && (t = !0);
            const s = this
              , a = s.params.direction;
            return e || (e = "horizontal" === a ? "vertical" : "horizontal"),
            e === a || "horizontal" !== e && "vertical" !== e || (s.$el.removeClass(`${s.params.containerModifierClass}${a}`).addClass(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            s.params.direction = e,
            s.slides.each((t=>{
                "vertical" === e ? t.style.width = "" : t.style.height = ""
            }
            )),
            s.emit("changeDirection"),
            t && s.update()),
            s
        }
        mount(e) {
            const t = this;
            if (t.mounted)
                return !0;
            const s = d(e || t.params.el);
            if (!(e = s[0]))
                return !1;
            e.swiper = t;
            const i = ()=>`.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
            let r = (()=>{
                if (e && e.shadowRoot && e.shadowRoot.querySelector) {
                    const t = d(e.shadowRoot.querySelector(i()));
                    return t.children = e=>s.children(e),
                    t
                }
                return s.children(i())
            }
            )();
            if (0 === r.length && t.params.createElements) {
                const e = a().createElement("div");
                r = d(e),
                e.className = t.params.wrapperClass,
                s.append(e),
                s.children(`.${t.params.slideClass}`).each((e=>{
                    r.append(e)
                }
                ))
            }
            return Object.assign(t, {
                $el: s,
                el: e,
                $wrapperEl: r,
                wrapperEl: r[0],
                mounted: !0,
                rtl: "rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === s.css("direction")),
                wrongRTL: "-webkit-box" === r.css("display")
            }),
            !0
        }
        init(e) {
            const t = this;
            if (t.initialized)
                return t;
            return !1 === t.mount(e) || (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.params.loop && t.loopCreate(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.preloadImages && t.preloadImages(),
            t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.attachEvents(),
            t.initialized = !0,
            t.emit("init"),
            t.emit("afterInit")),
            t
        }
        destroy(e, t) {
            void 0 === e && (e = !0),
            void 0 === t && (t = !0);
            const s = this
              , {params: a, $el: i, $wrapperEl: r, slides: n} = s;
            return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"),
            s.initialized = !1,
            s.detachEvents(),
            a.loop && s.loopDestroy(),
            t && (s.removeClasses(),
            i.removeAttr("style"),
            r.removeAttr("style"),
            n && n.length && n.removeClass([a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e=>{
                s.off(e)
            }
            )),
            !1 !== e && (s.$el[0].swiper = null,
            function(e) {
                const t = e;
                Object.keys(t).forEach((e=>{
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                }
                ))
            }(s)),
            s.destroyed = !0),
            null
        }
        static extendDefaults(e) {
            g(q, e)
        }
        static get extendedDefaults() {
            return q
        }
        static get defaults() {
            return W
        }
        static installModule(e) {
            V.prototype.__modules__ || (V.prototype.__modules__ = []);
            const t = V.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
        }
        static use(e) {
            return Array.isArray(e) ? (e.forEach((e=>V.installModule(e))),
            V) : (V.installModule(e),
            V)
        }
    }
    function F(e, t, s, i) {
        const r = a();
        return e.params.createElements && Object.keys(i).forEach((a=>{
            if (!s[a] && !0 === s.auto) {
                let n = e.$el.children(`.${i[a]}`)[0];
                n || (n = r.createElement("div"),
                n.className = i[a],
                e.$el.append(n)),
                s[a] = n,
                t[a] = n
            }
        }
        )),
        s
    }
    function U(e) {
        return void 0 === e && (e = ""),
        `.${e.trim().replace(/([\.:!\/])/g, "\\$1").replace(/ /g, ".")}`
    }
    function K(e) {
        const t = this
          , {$wrapperEl: s, params: a} = t;
        if (a.loop && t.loopDestroy(),
        "object" == typeof e && "length"in e)
            for (let t = 0; t < e.length; t += 1)
                e[t] && s.append(e[t]);
        else
            s.append(e);
        a.loop && t.loopCreate(),
        a.observer || t.update()
    }
    function Z(e) {
        const t = this
          , {params: s, $wrapperEl: a, activeIndex: i} = t;
        s.loop && t.loopDestroy();
        let r = i + 1;
        if ("object" == typeof e && "length"in e) {
            for (let t = 0; t < e.length; t += 1)
                e[t] && a.prepend(e[t]);
            r = i + e.length
        } else
            a.prepend(e);
        s.loop && t.loopCreate(),
        s.observer || t.update(),
        t.slideTo(r, 0, !1)
    }
    function J(e, t) {
        const s = this
          , {$wrapperEl: a, params: i, activeIndex: r} = s;
        let n = r;
        i.loop && (n -= s.loopedSlides,
        s.loopDestroy(),
        s.slides = a.children(`.${i.slideClass}`));
        const l = s.slides.length;
        if (e <= 0)
            return void s.prependSlide(t);
        if (e >= l)
            return void s.appendSlide(t);
        let o = n > e ? n + 1 : n;
        const d = [];
        for (let t = l - 1; t >= e; t -= 1) {
            const e = s.slides.eq(t);
            e.remove(),
            d.unshift(e)
        }
        if ("object" == typeof t && "length"in t) {
            for (let e = 0; e < t.length; e += 1)
                t[e] && a.append(t[e]);
            o = n > e ? n + t.length : n
        } else
            a.append(t);
        for (let e = 0; e < d.length; e += 1)
            a.append(d[e]);
        i.loop && s.loopCreate(),
        i.observer || s.update(),
        i.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1)
    }
    function Q(e) {
        const t = this
          , {params: s, $wrapperEl: a, activeIndex: i} = t;
        let r = i;
        s.loop && (r -= t.loopedSlides,
        t.loopDestroy(),
        t.slides = a.children(`.${s.slideClass}`));
        let n, l = r;
        if ("object" == typeof e && "length"in e) {
            for (let s = 0; s < e.length; s += 1)
                n = e[s],
                t.slides[n] && t.slides.eq(n).remove(),
                n < l && (l -= 1);
            l = Math.max(l, 0)
        } else
            n = e,
            t.slides[n] && t.slides.eq(n).remove(),
            n < l && (l -= 1),
            l = Math.max(l, 0);
        s.loop && t.loopCreate(),
        s.observer || t.update(),
        s.loop ? t.slideTo(l + t.loopedSlides, 0, !1) : t.slideTo(l, 0, !1)
    }
    function ee() {
        const e = this
          , t = [];
        for (let s = 0; s < e.slides.length; s += 1)
            t.push(s);
        e.removeSlide(t)
    }
    function te(e) {
        const {effect: t, swiper: s, on: a, setTranslate: i, setTransition: r, overwriteParams: n, perspective: l} = e;
        let o;
        a("beforeInit", (()=>{
            if (s.params.effect !== t)
                return;
            s.classNames.push(`${s.params.containerModifierClass}${t}`),
            l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
            const e = n ? n() : {};
            Object.assign(s.params, e),
            Object.assign(s.originalParams, e)
        }
        )),
        a("setTranslate", (()=>{
            s.params.effect === t && i()
        }
        )),
        a("setTransition", ((e,a)=>{
            s.params.effect === t && r(a)
        }
        )),
        a("virtualUpdate", (()=>{
            s.slides.length || (o = !0),
            requestAnimationFrame((()=>{
                o && s.slides.length && (i(),
                o = !1)
            }
            ))
        }
        ))
    }
    function se(e, t) {
        return e.transformEl ? t.find(e.transformEl).css({
            "backface-visibility": "hidden",
            "-webkit-backface-visibility": "hidden"
        }) : t
    }
    function ae(e) {
        let {swiper: t, duration: s, transformEl: a, allSlides: i} = e;
        const {slides: r, activeIndex: n, $wrapperEl: l} = t;
        if (t.params.virtualTranslate && 0 !== s) {
            let e, s = !1;
            e = i ? a ? r.find(a) : r : a ? r.eq(n).find(a) : r.eq(n),
            e.transitionEnd((()=>{
                if (s)
                    return;
                if (!t || t.destroyed)
                    return;
                s = !0,
                t.animating = !1;
                const e = ["webkitTransitionEnd", "transitionend"];
                for (let t = 0; t < e.length; t += 1)
                    l.trigger(e[t])
            }
            ))
        }
    }
    function ie(e, t, s) {
        const a = "swiper-slide-shadow" + (s ? `-${s}` : "")
          , i = e.transformEl ? t.find(e.transformEl) : t;
        let r = i.children(`.${a}`);
        return r.length || (r = d(`<div class="swiper-slide-shadow${s ? `-${s}` : ""}"></div>`),
        i.append(r)),
        r
    }
    Object.keys(_).forEach((e=>{
        Object.keys(_[e]).forEach((t=>{
            V.prototype[t] = _[e][t]
        }
        ))
    }
    )),
    V.use([function(e) {
        let {swiper: t, on: s, emit: a} = e;
        const i = r();
        let n = null
          , l = null;
        const o = ()=>{
            t && !t.destroyed && t.initialized && (a("beforeResize"),
            a("resize"))
        }
          , d = ()=>{
            t && !t.destroyed && t.initialized && a("orientationchange")
        }
        ;
        s("init", (()=>{
            t.params.resizeObserver && void 0 !== i.ResizeObserver ? t && !t.destroyed && t.initialized && (n = new ResizeObserver((e=>{
                l = i.requestAnimationFrame((()=>{
                    const {width: s, height: a} = t;
                    let i = s
                      , r = a;
                    e.forEach((e=>{
                        let {contentBoxSize: s, contentRect: a, target: n} = e;
                        n && n !== t.el || (i = a ? a.width : (s[0] || s).inlineSize,
                        r = a ? a.height : (s[0] || s).blockSize)
                    }
                    )),
                    i === s && r === a || o()
                }
                ))
            }
            )),
            n.observe(t.el)) : (i.addEventListener("resize", o),
            i.addEventListener("orientationchange", d))
        }
        )),
        s("destroy", (()=>{
            l && i.cancelAnimationFrame(l),
            n && n.unobserve && t.el && (n.unobserve(t.el),
            n = null),
            i.removeEventListener("resize", o),
            i.removeEventListener("orientationchange", d)
        }
        ))
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a, emit: i} = e;
        const n = []
          , l = r()
          , o = function(e, t) {
            void 0 === t && (t = {});
            const s = new (l.MutationObserver || l.WebkitMutationObserver)((e=>{
                if (1 === e.length)
                    return void i("observerUpdate", e[0]);
                const t = function() {
                    i("observerUpdate", e[0])
                };
                l.requestAnimationFrame ? l.requestAnimationFrame(t) : l.setTimeout(t, 0)
            }
            ));
            s.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
            n.push(s)
        };
        s({
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        }),
        a("init", (()=>{
            if (t.params.observer) {
                if (t.params.observeParents) {
                    const e = t.$el.parents();
                    for (let t = 0; t < e.length; t += 1)
                        o(e[t])
                }
                o(t.$el[0], {
                    childList: t.params.observeSlideChildren
                }),
                o(t.$wrapperEl[0], {
                    attributes: !1
                })
            }
        }
        )),
        a("destroy", (()=>{
            n.forEach((e=>{
                e.disconnect()
            }
            )),
            n.splice(0, n.length)
        }
        ))
    }
    ]);
    const re = [function(e) {
        let t, {swiper: s, extendParams: a, on: i, emit: r} = e;
        function n(e, t) {
            const a = s.params.virtual;
            if (a.cache && s.virtual.cache[t])
                return s.virtual.cache[t];
            const i = a.renderSlide ? d(a.renderSlide.call(s, e, t)) : d(`<div class="${s.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`);
            return i.attr("data-swiper-slide-index") || i.attr("data-swiper-slide-index", t),
            a.cache && (s.virtual.cache[t] = i),
            i
        }
        function l(e) {
            const {slidesPerView: t, slidesPerGroup: a, centeredSlides: i} = s.params
              , {addSlidesBefore: l, addSlidesAfter: o} = s.params.virtual
              , {from: d, to: c, slides: p, slidesGrid: u, offset: h} = s.virtual;
            s.params.cssMode || s.updateActiveIndex();
            const m = s.activeIndex || 0;
            let f, g, v;
            f = s.rtlTranslate ? "right" : s.isHorizontal() ? "left" : "top",
            i ? (g = Math.floor(t / 2) + a + o,
            v = Math.floor(t / 2) + a + l) : (g = t + (a - 1) + o,
            v = a + l);
            const w = Math.max((m || 0) - v, 0)
              , b = Math.min((m || 0) + g, p.length - 1)
              , x = (s.slidesGrid[w] || 0) - (s.slidesGrid[0] || 0);
            function y() {
                s.updateSlides(),
                s.updateProgress(),
                s.updateSlidesClasses(),
                s.lazy && s.params.lazy.enabled && s.lazy.load(),
                r("virtualUpdate")
            }
            if (Object.assign(s.virtual, {
                from: w,
                to: b,
                offset: x,
                slidesGrid: s.slidesGrid
            }),
            d === w && c === b && !e)
                return s.slidesGrid !== u && x !== h && s.slides.css(f, `${x}px`),
                s.updateProgress(),
                void r("virtualUpdate");
            if (s.params.virtual.renderExternal)
                return s.params.virtual.renderExternal.call(s, {
                    offset: x,
                    from: w,
                    to: b,
                    slides: function() {
                        const e = [];
                        for (let t = w; t <= b; t += 1)
                            e.push(p[t]);
                        return e
                    }()
                }),
                void (s.params.virtual.renderExternalUpdate ? y() : r("virtualUpdate"));
            const E = []
              , T = [];
            if (e)
                s.$wrapperEl.find(`.${s.params.slideClass}`).remove();
            else
                for (let e = d; e <= c; e += 1)
                    (e < w || e > b) && s.$wrapperEl.find(`.${s.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
            for (let t = 0; t < p.length; t += 1)
                t >= w && t <= b && (void 0 === c || e ? T.push(t) : (t > c && T.push(t),
                t < d && E.push(t)));
            T.forEach((e=>{
                s.$wrapperEl.append(n(p[e], e))
            }
            )),
            E.sort(((e,t)=>t - e)).forEach((e=>{
                s.$wrapperEl.prepend(n(p[e], e))
            }
            )),
            s.$wrapperEl.children(".swiper-slide").css(f, `${x}px`),
            y()
        }
        a({
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        }),
        s.virtual = {
            cache: {},
            from: void 0,
            to: void 0,
            slides: [],
            offset: 0,
            slidesGrid: []
        },
        i("beforeInit", (()=>{
            s.params.virtual.enabled && (s.virtual.slides = s.params.virtual.slides,
            s.classNames.push(`${s.params.containerModifierClass}virtual`),
            s.params.watchSlidesProgress = !0,
            s.originalParams.watchSlidesProgress = !0,
            s.params.initialSlide || l())
        }
        )),
        i("setTranslate", (()=>{
            s.params.virtual.enabled && (s.params.cssMode && !s._immediateVirtual ? (clearTimeout(t),
            t = setTimeout((()=>{
                l()
            }
            ), 100)) : l())
        }
        )),
        i("init update resize", (()=>{
            s.params.virtual.enabled && s.params.cssMode && v(s.wrapperEl, "--swiper-virtual-size", `${s.virtualSize}px`)
        }
        )),
        Object.assign(s.virtual, {
            appendSlide: function(e) {
                if ("object" == typeof e && "length"in e)
                    for (let t = 0; t < e.length; t += 1)
                        e[t] && s.virtual.slides.push(e[t]);
                else
                    s.virtual.slides.push(e);
                l(!0)
            },
            prependSlide: function(e) {
                const t = s.activeIndex;
                let a = t + 1
                  , i = 1;
                if (Array.isArray(e)) {
                    for (let t = 0; t < e.length; t += 1)
                        e[t] && s.virtual.slides.unshift(e[t]);
                    a = t + e.length,
                    i = e.length
                } else
                    s.virtual.slides.unshift(e);
                if (s.params.virtual.cache) {
                    const e = s.virtual.cache
                      , t = {};
                    Object.keys(e).forEach((s=>{
                        const a = e[s]
                          , r = a.attr("data-swiper-slide-index");
                        r && a.attr("data-swiper-slide-index", parseInt(r, 10) + i),
                        t[parseInt(s, 10) + i] = a
                    }
                    )),
                    s.virtual.cache = t
                }
                l(!0),
                s.slideTo(a, 0)
            },
            removeSlide: function(e) {
                if (null == e)
                    return;
                let t = s.activeIndex;
                if (Array.isArray(e))
                    for (let a = e.length - 1; a >= 0; a -= 1)
                        s.virtual.slides.splice(e[a], 1),
                        s.params.virtual.cache && delete s.virtual.cache[e[a]],
                        e[a] < t && (t -= 1),
                        t = Math.max(t, 0);
                else
                    s.virtual.slides.splice(e, 1),
                    s.params.virtual.cache && delete s.virtual.cache[e],
                    e < t && (t -= 1),
                    t = Math.max(t, 0);
                l(!0),
                s.slideTo(t, 0)
            },
            removeAllSlides: function() {
                s.virtual.slides = [],
                s.params.virtual.cache && (s.virtual.cache = {}),
                l(!0),
                s.slideTo(0, 0)
            },
            update: l
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i, emit: n} = e;
        const l = a()
          , o = r();
        function c(e) {
            if (!t.enabled)
                return;
            const {rtlTranslate: s} = t;
            let a = e;
            a.originalEvent && (a = a.originalEvent);
            const i = a.keyCode || a.charCode
              , r = t.params.keyboard.pageUpDown
              , d = r && 33 === i
              , c = r && 34 === i
              , p = 37 === i
              , u = 39 === i
              , h = 38 === i
              , m = 40 === i;
            if (!t.allowSlideNext && (t.isHorizontal() && u || t.isVertical() && m || c))
                return !1;
            if (!t.allowSlidePrev && (t.isHorizontal() && p || t.isVertical() && h || d))
                return !1;
            if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || l.activeElement && l.activeElement.nodeName && ("input" === l.activeElement.nodeName.toLowerCase() || "textarea" === l.activeElement.nodeName.toLowerCase()))) {
                if (t.params.keyboard.onlyInViewport && (d || c || p || u || h || m)) {
                    let e = !1;
                    if (t.$el.parents(`.${t.params.slideClass}`).length > 0 && 0 === t.$el.parents(`.${t.params.slideActiveClass}`).length)
                        return;
                    const a = t.$el
                      , i = a[0].clientWidth
                      , r = a[0].clientHeight
                      , n = o.innerWidth
                      , l = o.innerHeight
                      , d = t.$el.offset();
                    s && (d.left -= t.$el[0].scrollLeft);
                    const c = [[d.left, d.top], [d.left + i, d.top], [d.left, d.top + r], [d.left + i, d.top + r]];
                    for (let t = 0; t < c.length; t += 1) {
                        const s = c[t];
                        if (s[0] >= 0 && s[0] <= n && s[1] >= 0 && s[1] <= l) {
                            if (0 === s[0] && 0 === s[1])
                                continue;
                            e = !0
                        }
                    }
                    if (!e)
                        return
                }
                t.isHorizontal() ? ((d || c || p || u) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1),
                ((c || u) && !s || (d || p) && s) && t.slideNext(),
                ((d || p) && !s || (c || u) && s) && t.slidePrev()) : ((d || c || h || m) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1),
                (c || m) && t.slideNext(),
                (d || h) && t.slidePrev()),
                n("keyPress", i)
            }
        }
        function p() {
            t.keyboard.enabled || (d(l).on("keydown", c),
            t.keyboard.enabled = !0)
        }
        function u() {
            t.keyboard.enabled && (d(l).off("keydown", c),
            t.keyboard.enabled = !1)
        }
        t.keyboard = {
            enabled: !1
        },
        s({
            keyboard: {
                enabled: !1,
                onlyInViewport: !0,
                pageUpDown: !0
            }
        }),
        i("init", (()=>{
            t.params.keyboard.enabled && p()
        }
        )),
        i("destroy", (()=>{
            t.keyboard.enabled && u()
        }
        )),
        Object.assign(t.keyboard, {
            enable: p,
            disable: u
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a, emit: i} = e;
        const n = r();
        let l;
        s({
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null
            }
        }),
        t.mousewheel = {
            enabled: !1
        };
        let o, c = u();
        const h = [];
        function m() {
            t.enabled && (t.mouseEntered = !0)
        }
        function f() {
            t.enabled && (t.mouseEntered = !1)
        }
        function g(e) {
            return !(t.params.mousewheel.thresholdDelta && e.delta < t.params.mousewheel.thresholdDelta) && (!(t.params.mousewheel.thresholdTime && u() - c < t.params.mousewheel.thresholdTime) && (e.delta >= 6 && u() - c < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(),
            i("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(),
            i("scroll", e.raw)),
            c = (new n.Date).getTime(),
            !1)))
        }
        function v(e) {
            let s = e
              , a = !0;
            if (!t.enabled)
                return;
            const r = t.params.mousewheel;
            t.params.cssMode && s.preventDefault();
            let n = t.$el;
            if ("container" !== t.params.mousewheel.eventsTarget && (n = d(t.params.mousewheel.eventsTarget)),
            !t.mouseEntered && !n[0].contains(s.target) && !r.releaseOnEdges)
                return !0;
            s.originalEvent && (s = s.originalEvent);
            let c = 0;
            const m = t.rtlTranslate ? -1 : 1
              , f = function(e) {
                let t = 0
                  , s = 0
                  , a = 0
                  , i = 0;
                return "detail"in e && (s = e.detail),
                "wheelDelta"in e && (s = -e.wheelDelta / 120),
                "wheelDeltaY"in e && (s = -e.wheelDeltaY / 120),
                "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
                "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = s,
                s = 0),
                a = 10 * t,
                i = 10 * s,
                "deltaY"in e && (i = e.deltaY),
                "deltaX"in e && (a = e.deltaX),
                e.shiftKey && !a && (a = i,
                i = 0),
                (a || i) && e.deltaMode && (1 === e.deltaMode ? (a *= 40,
                i *= 40) : (a *= 800,
                i *= 800)),
                a && !t && (t = a < 1 ? -1 : 1),
                i && !s && (s = i < 1 ? -1 : 1),
                {
                    spinX: t,
                    spinY: s,
                    pixelX: a,
                    pixelY: i
                }
            }(s);
            if (r.forceToAxis)
                if (t.isHorizontal()) {
                    if (!(Math.abs(f.pixelX) > Math.abs(f.pixelY)))
                        return !0;
                    c = -f.pixelX * m
                } else {
                    if (!(Math.abs(f.pixelY) > Math.abs(f.pixelX)))
                        return !0;
                    c = -f.pixelY
                }
            else
                c = Math.abs(f.pixelX) > Math.abs(f.pixelY) ? -f.pixelX * m : -f.pixelY;
            if (0 === c)
                return !0;
            r.invert && (c = -c);
            let v = t.getTranslate() + c * r.sensitivity;
            if (v >= t.minTranslate() && (v = t.minTranslate()),
            v <= t.maxTranslate() && (v = t.maxTranslate()),
            a = !!t.params.loop || !(v === t.minTranslate() || v === t.maxTranslate()),
            a && t.params.nested && s.stopPropagation(),
            t.params.freeMode && t.params.freeMode.enabled) {
                const e = {
                    time: u(),
                    delta: Math.abs(c),
                    direction: Math.sign(c)
                }
                  , a = o && e.time < o.time + 500 && e.delta <= o.delta && e.direction === o.direction;
                if (!a) {
                    o = void 0,
                    t.params.loop && t.loopFix();
                    let n = t.getTranslate() + c * r.sensitivity;
                    const d = t.isBeginning
                      , u = t.isEnd;
                    if (n >= t.minTranslate() && (n = t.minTranslate()),
                    n <= t.maxTranslate() && (n = t.maxTranslate()),
                    t.setTransition(0),
                    t.setTranslate(n),
                    t.updateProgress(),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses(),
                    (!d && t.isBeginning || !u && t.isEnd) && t.updateSlidesClasses(),
                    t.params.freeMode.sticky) {
                        clearTimeout(l),
                        l = void 0,
                        h.length >= 15 && h.shift();
                        const s = h.length ? h[h.length - 1] : void 0
                          , a = h[0];
                        if (h.push(e),
                        s && (e.delta > s.delta || e.direction !== s.direction))
                            h.splice(0);
                        else if (h.length >= 15 && e.time - a.time < 500 && a.delta - e.delta >= 1 && e.delta <= 6) {
                            const s = c > 0 ? .8 : .2;
                            o = e,
                            h.splice(0),
                            l = p((()=>{
                                t.slideToClosest(t.params.speed, !0, void 0, s)
                            }
                            ), 0)
                        }
                        l || (l = p((()=>{
                            o = e,
                            h.splice(0),
                            t.slideToClosest(t.params.speed, !0, void 0, .5)
                        }
                        ), 500))
                    }
                    if (a || i("scroll", s),
                    t.params.autoplay && t.params.autoplayDisableOnInteraction && t.autoplay.stop(),
                    n === t.minTranslate() || n === t.maxTranslate())
                        return !0
                }
            } else {
                const s = {
                    time: u(),
                    delta: Math.abs(c),
                    direction: Math.sign(c),
                    raw: e
                };
                h.length >= 2 && h.shift();
                const a = h.length ? h[h.length - 1] : void 0;
                if (h.push(s),
                a ? (s.direction !== a.direction || s.delta > a.delta || s.time > a.time + 150) && g(s) : g(s),
                function(e) {
                    const s = t.params.mousewheel;
                    if (e.direction < 0) {
                        if (t.isEnd && !t.params.loop && s.releaseOnEdges)
                            return !0
                    } else if (t.isBeginning && !t.params.loop && s.releaseOnEdges)
                        return !0;
                    return !1
                }(s))
                    return !0
            }
            return s.preventDefault ? s.preventDefault() : s.returnValue = !1,
            !1
        }
        function w(e) {
            let s = t.$el;
            "container" !== t.params.mousewheel.eventsTarget && (s = d(t.params.mousewheel.eventsTarget)),
            s[e]("mouseenter", m),
            s[e]("mouseleave", f),
            s[e]("wheel", v)
        }
        function b() {
            return t.params.cssMode ? (t.wrapperEl.removeEventListener("wheel", v),
            !0) : !t.mousewheel.enabled && (w("on"),
            t.mousewheel.enabled = !0,
            !0)
        }
        function x() {
            return t.params.cssMode ? (t.wrapperEl.addEventListener(event, v),
            !0) : !!t.mousewheel.enabled && (w("off"),
            t.mousewheel.enabled = !1,
            !0)
        }
        a("init", (()=>{
            !t.params.mousewheel.enabled && t.params.cssMode && x(),
            t.params.mousewheel.enabled && b()
        }
        )),
        a("destroy", (()=>{
            t.params.cssMode && b(),
            t.mousewheel.enabled && x()
        }
        )),
        Object.assign(t.mousewheel, {
            enable: b,
            disable: x
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a, emit: i} = e;
        function r(e) {
            let s;
            return e && (s = d(e),
            t.params.uniqueNavElements && "string" == typeof e && s.length > 1 && 1 === t.$el.find(e).length && (s = t.$el.find(e))),
            s
        }
        function n(e, s) {
            const a = t.params.navigation;
            e && e.length > 0 && (e[s ? "addClass" : "removeClass"](a.disabledClass),
            e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = s),
            t.params.watchOverflow && t.enabled && e[t.isLocked ? "addClass" : "removeClass"](a.lockClass))
        }
        function l() {
            if (t.params.loop)
                return;
            const {$nextEl: e, $prevEl: s} = t.navigation;
            n(s, t.isBeginning && !t.params.rewind),
            n(e, t.isEnd && !t.params.rewind)
        }
        function o(e) {
            e.preventDefault(),
            (!t.isBeginning || t.params.loop || t.params.rewind) && t.slidePrev()
        }
        function c(e) {
            e.preventDefault(),
            (!t.isEnd || t.params.loop || t.params.rewind) && t.slideNext()
        }
        function p() {
            const e = t.params.navigation;
            if (t.params.navigation = F(t, t.originalParams.navigation, t.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }),
            !e.nextEl && !e.prevEl)
                return;
            const s = r(e.nextEl)
              , a = r(e.prevEl);
            s && s.length > 0 && s.on("click", c),
            a && a.length > 0 && a.on("click", o),
            Object.assign(t.navigation, {
                $nextEl: s,
                nextEl: s && s[0],
                $prevEl: a,
                prevEl: a && a[0]
            }),
            t.enabled || (s && s.addClass(e.lockClass),
            a && a.addClass(e.lockClass))
        }
        function u() {
            const {$nextEl: e, $prevEl: s} = t.navigation;
            e && e.length && (e.off("click", c),
            e.removeClass(t.params.navigation.disabledClass)),
            s && s.length && (s.off("click", o),
            s.removeClass(t.params.navigation.disabledClass))
        }
        s({
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        }),
        t.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null
        },
        a("init", (()=>{
            p(),
            l()
        }
        )),
        a("toEdge fromEdge lock unlock", (()=>{
            l()
        }
        )),
        a("destroy", (()=>{
            u()
        }
        )),
        a("enable disable", (()=>{
            const {$nextEl: e, $prevEl: s} = t.navigation;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass),
            s && s[t.enabled ? "removeClass" : "addClass"](t.params.navigation.lockClass)
        }
        )),
        a("click", ((e,s)=>{
            const {$nextEl: a, $prevEl: r} = t.navigation
              , n = s.target;
            if (t.params.navigation.hideOnClick && !d(n).is(r) && !d(n).is(a)) {
                if (t.pagination && t.params.pagination && t.params.pagination.clickable && (t.pagination.el === n || t.pagination.el.contains(n)))
                    return;
                let e;
                a ? e = a.hasClass(t.params.navigation.hiddenClass) : r && (e = r.hasClass(t.params.navigation.hiddenClass)),
                i(!0 === e ? "navigationShow" : "navigationHide"),
                a && a.toggleClass(t.params.navigation.hiddenClass),
                r && r.toggleClass(t.params.navigation.hiddenClass)
            }
        }
        )),
        Object.assign(t.navigation, {
            update: l,
            init: p,
            destroy: u
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a, emit: i} = e;
        const r = "swiper-pagination";
        let n;
        s({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: e=>e,
                formatFractionTotal: e=>e,
                bulletClass: `${r}-bullet`,
                bulletActiveClass: `${r}-bullet-active`,
                modifierClass: `${r}-`,
                currentClass: `${r}-current`,
                totalClass: `${r}-total`,
                hiddenClass: `${r}-hidden`,
                progressbarFillClass: `${r}-progressbar-fill`,
                progressbarOppositeClass: `${r}-progressbar-opposite`,
                clickableClass: `${r}-clickable`,
                lockClass: `${r}-lock`,
                horizontalClass: `${r}-horizontal`,
                verticalClass: `${r}-vertical`
            }
        }),
        t.pagination = {
            el: null,
            $el: null,
            bullets: []
        };
        let l = 0;
        function o() {
            return !t.params.pagination.el || !t.pagination.el || !t.pagination.$el || 0 === t.pagination.$el.length
        }
        function c(e, s) {
            const {bulletActiveClass: a} = t.params.pagination;
            e[s]().addClass(`${a}-${s}`)[s]().addClass(`${a}-${s}-${s}`)
        }
        function p() {
            const e = t.rtl
              , s = t.params.pagination;
            if (o())
                return;
            const a = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length
              , r = t.pagination.$el;
            let p;
            const u = t.params.loop ? Math.ceil((a - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
            if (t.params.loop ? (p = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup),
            p > a - 1 - 2 * t.loopedSlides && (p -= a - 2 * t.loopedSlides),
            p > u - 1 && (p -= u),
            p < 0 && "bullets" !== t.params.paginationType && (p = u + p)) : p = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0,
            "bullets" === s.type && t.pagination.bullets && t.pagination.bullets.length > 0) {
                const a = t.pagination.bullets;
                let i, o, u;
                if (s.dynamicBullets && (n = a.eq(0)[t.isHorizontal() ? "outerWidth" : "outerHeight"](!0),
                r.css(t.isHorizontal() ? "width" : "height", n * (s.dynamicMainBullets + 4) + "px"),
                s.dynamicMainBullets > 1 && void 0 !== t.previousIndex && (l += p - (t.previousIndex - t.loopedSlides || 0),
                l > s.dynamicMainBullets - 1 ? l = s.dynamicMainBullets - 1 : l < 0 && (l = 0)),
                i = Math.max(p - l, 0),
                o = i + (Math.min(a.length, s.dynamicMainBullets) - 1),
                u = (o + i) / 2),
                a.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e=>`${s.bulletActiveClass}${e}`)).join(" ")),
                r.length > 1)
                    a.each((e=>{
                        const t = d(e)
                          , a = t.index();
                        a === p && t.addClass(s.bulletActiveClass),
                        s.dynamicBullets && (a >= i && a <= o && t.addClass(`${s.bulletActiveClass}-main`),
                        a === i && c(t, "prev"),
                        a === o && c(t, "next"))
                    }
                    ));
                else {
                    const e = a.eq(p)
                      , r = e.index();
                    if (e.addClass(s.bulletActiveClass),
                    s.dynamicBullets) {
                        const e = a.eq(i)
                          , n = a.eq(o);
                        for (let e = i; e <= o; e += 1)
                            a.eq(e).addClass(`${s.bulletActiveClass}-main`);
                        if (t.params.loop)
                            if (r >= a.length) {
                                for (let e = s.dynamicMainBullets; e >= 0; e -= 1)
                                    a.eq(a.length - e).addClass(`${s.bulletActiveClass}-main`);
                                a.eq(a.length - s.dynamicMainBullets - 1).addClass(`${s.bulletActiveClass}-prev`)
                            } else
                                c(e, "prev"),
                                c(n, "next");
                        else
                            c(e, "prev"),
                            c(n, "next")
                    }
                }
                if (s.dynamicBullets) {
                    const i = Math.min(a.length, s.dynamicMainBullets + 4)
                      , r = (n * i - n) / 2 - u * n
                      , l = e ? "right" : "left";
                    a.css(t.isHorizontal() ? l : "top", `${r}px`)
                }
            }
            if ("fraction" === s.type && (r.find(U(s.currentClass)).text(s.formatFractionCurrent(p + 1)),
            r.find(U(s.totalClass)).text(s.formatFractionTotal(u))),
            "progressbar" === s.type) {
                let e;
                e = s.progressbarOpposite ? t.isHorizontal() ? "vertical" : "horizontal" : t.isHorizontal() ? "horizontal" : "vertical";
                const a = (p + 1) / u;
                let i = 1
                  , n = 1;
                "horizontal" === e ? i = a : n = a,
                r.find(U(s.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${i}) scaleY(${n})`).transition(t.params.speed)
            }
            "custom" === s.type && s.renderCustom ? (r.html(s.renderCustom(t, p + 1, u)),
            i("paginationRender", r[0])) : i("paginationUpdate", r[0]),
            t.params.watchOverflow && t.enabled && r[t.isLocked ? "addClass" : "removeClass"](s.lockClass)
        }
        function u() {
            const e = t.params.pagination;
            if (o())
                return;
            const s = t.virtual && t.params.virtual.enabled ? t.virtual.slides.length : t.slides.length
              , a = t.pagination.$el;
            let r = "";
            if ("bullets" === e.type) {
                let i = t.params.loop ? Math.ceil((s - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                t.params.freeMode && t.params.freeMode.enabled && !t.params.loop && i > s && (i = s);
                for (let s = 0; s < i; s += 1)
                    e.renderBullet ? r += e.renderBullet.call(t, s, e.bulletClass) : r += `<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`;
                a.html(r),
                t.pagination.bullets = a.find(U(e.bulletClass))
            }
            "fraction" === e.type && (r = e.renderFraction ? e.renderFraction.call(t, e.currentClass, e.totalClass) : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`,
            a.html(r)),
            "progressbar" === e.type && (r = e.renderProgressbar ? e.renderProgressbar.call(t, e.progressbarFillClass) : `<span class="${e.progressbarFillClass}"></span>`,
            a.html(r)),
            "custom" !== e.type && i("paginationRender", t.pagination.$el[0])
        }
        function h() {
            t.params.pagination = F(t, t.originalParams.pagination, t.params.pagination, {
                el: "swiper-pagination"
            });
            const e = t.params.pagination;
            if (!e.el)
                return;
            let s = d(e.el);
            0 !== s.length && (t.params.uniqueNavElements && "string" == typeof e.el && s.length > 1 && (s = t.$el.find(e.el),
            s.length > 1 && (s = s.filter((e=>d(e).parents(".swiper")[0] === t.el)))),
            "bullets" === e.type && e.clickable && s.addClass(e.clickableClass),
            s.addClass(e.modifierClass + e.type),
            s.addClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
            "bullets" === e.type && e.dynamicBullets && (s.addClass(`${e.modifierClass}${e.type}-dynamic`),
            l = 0,
            e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
            "progressbar" === e.type && e.progressbarOpposite && s.addClass(e.progressbarOppositeClass),
            e.clickable && s.on("click", U(e.bulletClass), (function(e) {
                e.preventDefault();
                let s = d(this).index() * t.params.slidesPerGroup;
                t.params.loop && (s += t.loopedSlides),
                t.slideTo(s)
            }
            )),
            Object.assign(t.pagination, {
                $el: s,
                el: s[0]
            }),
            t.enabled || s.addClass(e.lockClass))
        }
        function m() {
            const e = t.params.pagination;
            if (o())
                return;
            const s = t.pagination.$el;
            s.removeClass(e.hiddenClass),
            s.removeClass(e.modifierClass + e.type),
            s.removeClass(t.isHorizontal() ? e.horizontalClass : e.verticalClass),
            t.pagination.bullets && t.pagination.bullets.removeClass && t.pagination.bullets.removeClass(e.bulletActiveClass),
            e.clickable && s.off("click", U(e.bulletClass))
        }
        a("init", (()=>{
            h(),
            u(),
            p()
        }
        )),
        a("activeIndexChange", (()=>{
            (t.params.loop || void 0 === t.snapIndex) && p()
        }
        )),
        a("snapIndexChange", (()=>{
            t.params.loop || p()
        }
        )),
        a("slidesLengthChange", (()=>{
            t.params.loop && (u(),
            p())
        }
        )),
        a("snapGridLengthChange", (()=>{
            t.params.loop || (u(),
            p())
        }
        )),
        a("destroy", (()=>{
            m()
        }
        )),
        a("enable disable", (()=>{
            const {$el: e} = t.pagination;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.pagination.lockClass)
        }
        )),
        a("lock unlock", (()=>{
            p()
        }
        )),
        a("click", ((e,s)=>{
            const a = s.target
              , {$el: r} = t.pagination;
            if (t.params.pagination.el && t.params.pagination.hideOnClick && r.length > 0 && !d(a).hasClass(t.params.pagination.bulletClass)) {
                if (t.navigation && (t.navigation.nextEl && a === t.navigation.nextEl || t.navigation.prevEl && a === t.navigation.prevEl))
                    return;
                const e = r.hasClass(t.params.pagination.hiddenClass);
                i(!0 === e ? "paginationShow" : "paginationHide"),
                r.toggleClass(t.params.pagination.hiddenClass)
            }
        }
        )),
        Object.assign(t.pagination, {
            render: u,
            update: p,
            init: h,
            destroy: m
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: i, emit: r} = e;
        const n = a();
        let l, o, c, u, h = !1, m = null, f = null;
        function g() {
            if (!t.params.scrollbar.el || !t.scrollbar.el)
                return;
            const {scrollbar: e, rtlTranslate: s, progress: a} = t
              , {$dragEl: i, $el: r} = e
              , n = t.params.scrollbar;
            let l = o
              , d = (c - o) * a;
            s ? (d = -d,
            d > 0 ? (l = o - d,
            d = 0) : -d + o > c && (l = c + d)) : d < 0 ? (l = o + d,
            d = 0) : d + o > c && (l = c - d),
            t.isHorizontal() ? (i.transform(`translate3d(${d}px, 0, 0)`),
            i[0].style.width = `${l}px`) : (i.transform(`translate3d(0px, ${d}px, 0)`),
            i[0].style.height = `${l}px`),
            n.hide && (clearTimeout(m),
            r[0].style.opacity = 1,
            m = setTimeout((()=>{
                r[0].style.opacity = 0,
                r.transition(400)
            }
            ), 1e3))
        }
        function v() {
            if (!t.params.scrollbar.el || !t.scrollbar.el)
                return;
            const {scrollbar: e} = t
              , {$dragEl: s, $el: a} = e;
            s[0].style.width = "",
            s[0].style.height = "",
            c = t.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight,
            u = t.size / (t.virtualSize + t.params.slidesOffsetBefore - (t.params.centeredSlides ? t.snapGrid[0] : 0)),
            o = "auto" === t.params.scrollbar.dragSize ? c * u : parseInt(t.params.scrollbar.dragSize, 10),
            t.isHorizontal() ? s[0].style.width = `${o}px` : s[0].style.height = `${o}px`,
            a[0].style.display = u >= 1 ? "none" : "",
            t.params.scrollbar.hide && (a[0].style.opacity = 0),
            t.params.watchOverflow && t.enabled && e.$el[t.isLocked ? "addClass" : "removeClass"](t.params.scrollbar.lockClass)
        }
        function w(e) {
            return t.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
        }
        function b(e) {
            const {scrollbar: s, rtlTranslate: a} = t
              , {$el: i} = s;
            let r;
            r = (w(e) - i.offset()[t.isHorizontal() ? "left" : "top"] - (null !== l ? l : o / 2)) / (c - o),
            r = Math.max(Math.min(r, 1), 0),
            a && (r = 1 - r);
            const n = t.minTranslate() + (t.maxTranslate() - t.minTranslate()) * r;
            t.updateProgress(n),
            t.setTranslate(n),
            t.updateActiveIndex(),
            t.updateSlidesClasses()
        }
        function x(e) {
            const s = t.params.scrollbar
              , {scrollbar: a, $wrapperEl: i} = t
              , {$el: n, $dragEl: o} = a;
            h = !0,
            l = e.target === o[0] || e.target === o ? w(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null,
            e.preventDefault(),
            e.stopPropagation(),
            i.transition(100),
            o.transition(100),
            b(e),
            clearTimeout(f),
            n.transition(0),
            s.hide && n.css("opacity", 1),
            t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"),
            r("scrollbarDragStart", e)
        }
        function y(e) {
            const {scrollbar: s, $wrapperEl: a} = t
              , {$el: i, $dragEl: n} = s;
            h && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            b(e),
            a.transition(0),
            i.transition(0),
            n.transition(0),
            r("scrollbarDragMove", e))
        }
        function E(e) {
            const s = t.params.scrollbar
              , {scrollbar: a, $wrapperEl: i} = t
              , {$el: n} = a;
            h && (h = !1,
            t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""),
            i.transition("")),
            s.hide && (clearTimeout(f),
            f = p((()=>{
                n.css("opacity", 0),
                n.transition(400)
            }
            ), 1e3)),
            r("scrollbarDragEnd", e),
            s.snapOnRelease && t.slideToClosest())
        }
        function T(e) {
            const {scrollbar: s, touchEventsTouch: a, touchEventsDesktop: i, params: r, support: l} = t
              , o = s.$el[0]
              , d = !(!l.passiveListener || !r.passiveListeners) && {
                passive: !1,
                capture: !1
            }
              , c = !(!l.passiveListener || !r.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            if (!o)
                return;
            const p = "on" === e ? "addEventListener" : "removeEventListener";
            l.touch ? (o[p](a.start, x, d),
            o[p](a.move, y, d),
            o[p](a.end, E, c)) : (o[p](i.start, x, d),
            n[p](i.move, y, d),
            n[p](i.end, E, c))
        }
        function C() {
            const {scrollbar: e, $el: s} = t;
            t.params.scrollbar = F(t, t.originalParams.scrollbar, t.params.scrollbar, {
                el: "swiper-scrollbar"
            });
            const a = t.params.scrollbar;
            if (!a.el)
                return;
            let i = d(a.el);
            t.params.uniqueNavElements && "string" == typeof a.el && i.length > 1 && 1 === s.find(a.el).length && (i = s.find(a.el));
            let r = i.find(`.${t.params.scrollbar.dragClass}`);
            0 === r.length && (r = d(`<div class="${t.params.scrollbar.dragClass}"></div>`),
            i.append(r)),
            Object.assign(e, {
                $el: i,
                el: i[0],
                $dragEl: r,
                dragEl: r[0]
            }),
            a.draggable && t.params.scrollbar.el && T("on"),
            i && i[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }
        function $() {
            t.params.scrollbar.el && T("off")
        }
        s({
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        }),
        t.scrollbar = {
            el: null,
            dragEl: null,
            $el: null,
            $dragEl: null
        },
        i("init", (()=>{
            C(),
            v(),
            g()
        }
        )),
        i("update resize observerUpdate lock unlock", (()=>{
            v()
        }
        )),
        i("setTranslate", (()=>{
            g()
        }
        )),
        i("setTransition", ((e,s)=>{
            !function(e) {
                t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e)
            }(s)
        }
        )),
        i("enable disable", (()=>{
            const {$el: e} = t.scrollbar;
            e && e[t.enabled ? "removeClass" : "addClass"](t.params.scrollbar.lockClass)
        }
        )),
        i("destroy", (()=>{
            $()
        }
        )),
        Object.assign(t.scrollbar, {
            updateSize: v,
            setTranslate: g,
            init: C,
            destroy: $
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            parallax: {
                enabled: !1
            }
        });
        const i = (e,s)=>{
            const {rtl: a} = t
              , i = d(e)
              , r = a ? -1 : 1
              , n = i.attr("data-swiper-parallax") || "0";
            let l = i.attr("data-swiper-parallax-x")
              , o = i.attr("data-swiper-parallax-y");
            const c = i.attr("data-swiper-parallax-scale")
              , p = i.attr("data-swiper-parallax-opacity");
            if (l || o ? (l = l || "0",
            o = o || "0") : t.isHorizontal() ? (l = n,
            o = "0") : (o = n,
            l = "0"),
            l = l.indexOf("%") >= 0 ? parseInt(l, 10) * s * r + "%" : l * s * r + "px",
            o = o.indexOf("%") >= 0 ? parseInt(o, 10) * s + "%" : o * s + "px",
            null != p) {
                const e = p - (p - 1) * (1 - Math.abs(s));
                i[0].style.opacity = e
            }
            if (null == c)
                i.transform(`translate3d(${l}, ${o}, 0px)`);
            else {
                const e = c - (c - 1) * (1 - Math.abs(s));
                i.transform(`translate3d(${l}, ${o}, 0px) scale(${e})`)
            }
        }
          , r = ()=>{
            const {$el: e, slides: s, progress: a, snapGrid: r} = t;
            e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{
                i(e, a)
            }
            )),
            s.each(((e,s)=>{
                let n = e.progress;
                t.params.slidesPerGroup > 1 && "auto" !== t.params.slidesPerView && (n += Math.ceil(s / 2) - a * (r.length - 1)),
                n = Math.min(Math.max(n, -1), 1),
                d(e).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e=>{
                    i(e, n)
                }
                ))
            }
            ))
        }
        ;
        a("beforeInit", (()=>{
            t.params.parallax.enabled && (t.params.watchSlidesProgress = !0,
            t.originalParams.watchSlidesProgress = !0)
        }
        )),
        a("init", (()=>{
            t.params.parallax.enabled && r()
        }
        )),
        a("setTranslate", (()=>{
            t.params.parallax.enabled && r()
        }
        )),
        a("setTransition", ((e,s)=>{
            t.params.parallax.enabled && function(e) {
                void 0 === e && (e = t.params.speed);
                const {$el: s} = t;
                s.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((t=>{
                    const s = d(t);
                    let a = parseInt(s.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (a = 0),
                    s.transition(a)
                }
                ))
            }(s)
        }
        ))
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a, emit: i} = e;
        const n = r();
        s({
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        }),
        t.zoom = {
            enabled: !1
        };
        let l, o, c, p = 1, u = !1;
        const m = {
            $slideEl: void 0,
            slideWidth: void 0,
            slideHeight: void 0,
            $imageEl: void 0,
            $imageWrapEl: void 0,
            maxRatio: 3
        }
          , f = {
            isTouched: void 0,
            isMoved: void 0,
            currentX: void 0,
            currentY: void 0,
            minX: void 0,
            minY: void 0,
            maxX: void 0,
            maxY: void 0,
            width: void 0,
            height: void 0,
            startX: void 0,
            startY: void 0,
            touchesStart: {},
            touchesCurrent: {}
        }
          , g = {
            x: void 0,
            y: void 0,
            prevPositionX: void 0,
            prevPositionY: void 0,
            prevTime: void 0
        };
        let v = 1;
        function w(e) {
            if (e.targetTouches.length < 2)
                return 1;
            const t = e.targetTouches[0].pageX
              , s = e.targetTouches[0].pageY
              , a = e.targetTouches[1].pageX
              , i = e.targetTouches[1].pageY;
            return Math.sqrt((a - t) ** 2 + (i - s) ** 2)
        }
        function b(e) {
            const s = t.support
              , a = t.params.zoom;
            if (o = !1,
            c = !1,
            !s.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                    return;
                o = !0,
                m.scaleStart = w(e)
            }
            m.$slideEl && m.$slideEl.length || (m.$slideEl = d(e.target).closest(`.${t.params.slideClass}`),
            0 === m.$slideEl.length && (m.$slideEl = t.slides.eq(t.activeIndex)),
            m.$imageEl = m.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),
            m.$imageWrapEl = m.$imageEl.parent(`.${a.containerClass}`),
            m.maxRatio = m.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio,
            0 !== m.$imageWrapEl.length) ? (m.$imageEl && m.$imageEl.transition(0),
            u = !0) : m.$imageEl = void 0
        }
        function x(e) {
            const s = t.support
              , a = t.params.zoom
              , i = t.zoom;
            if (!s.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                    return;
                c = !0,
                m.scaleMove = w(e)
            }
            m.$imageEl && 0 !== m.$imageEl.length ? (s.gestures ? i.scale = e.scale * p : i.scale = m.scaleMove / m.scaleStart * p,
            i.scale > m.maxRatio && (i.scale = m.maxRatio - 1 + (i.scale - m.maxRatio + 1) ** .5),
            i.scale < a.minRatio && (i.scale = a.minRatio + 1 - (a.minRatio - i.scale + 1) ** .5),
            m.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)) : "gesturechange" === e.type && b(e)
        }
        function y(e) {
            const s = t.device
              , a = t.support
              , i = t.params.zoom
              , r = t.zoom;
            if (!a.gestures) {
                if (!o || !c)
                    return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !s.android)
                    return;
                o = !1,
                c = !1
            }
            m.$imageEl && 0 !== m.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, m.maxRatio), i.minRatio),
            m.$imageEl.transition(t.params.speed).transform(`translate3d(0,0,0) scale(${r.scale})`),
            p = r.scale,
            u = !1,
            1 === r.scale && (m.$slideEl = void 0))
        }
        function E(e) {
            const s = t.zoom;
            if (!m.$imageEl || 0 === m.$imageEl.length)
                return;
            if (t.allowClick = !1,
            !f.isTouched || !m.$slideEl)
                return;
            f.isMoved || (f.width = m.$imageEl[0].offsetWidth,
            f.height = m.$imageEl[0].offsetHeight,
            f.startX = h(m.$imageWrapEl[0], "x") || 0,
            f.startY = h(m.$imageWrapEl[0], "y") || 0,
            m.slideWidth = m.$slideEl[0].offsetWidth,
            m.slideHeight = m.$slideEl[0].offsetHeight,
            m.$imageWrapEl.transition(0));
            const a = f.width * s.scale
              , i = f.height * s.scale;
            if (!(a < m.slideWidth && i < m.slideHeight)) {
                if (f.minX = Math.min(m.slideWidth / 2 - a / 2, 0),
                f.maxX = -f.minX,
                f.minY = Math.min(m.slideHeight / 2 - i / 2, 0),
                f.maxY = -f.minY,
                f.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                f.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                !f.isMoved && !u) {
                    if (t.isHorizontal() && (Math.floor(f.minX) === Math.floor(f.startX) && f.touchesCurrent.x < f.touchesStart.x || Math.floor(f.maxX) === Math.floor(f.startX) && f.touchesCurrent.x > f.touchesStart.x))
                        return void (f.isTouched = !1);
                    if (!t.isHorizontal() && (Math.floor(f.minY) === Math.floor(f.startY) && f.touchesCurrent.y < f.touchesStart.y || Math.floor(f.maxY) === Math.floor(f.startY) && f.touchesCurrent.y > f.touchesStart.y))
                        return void (f.isTouched = !1)
                }
                e.cancelable && e.preventDefault(),
                e.stopPropagation(),
                f.isMoved = !0,
                f.currentX = f.touchesCurrent.x - f.touchesStart.x + f.startX,
                f.currentY = f.touchesCurrent.y - f.touchesStart.y + f.startY,
                f.currentX < f.minX && (f.currentX = f.minX + 1 - (f.minX - f.currentX + 1) ** .8),
                f.currentX > f.maxX && (f.currentX = f.maxX - 1 + (f.currentX - f.maxX + 1) ** .8),
                f.currentY < f.minY && (f.currentY = f.minY + 1 - (f.minY - f.currentY + 1) ** .8),
                f.currentY > f.maxY && (f.currentY = f.maxY - 1 + (f.currentY - f.maxY + 1) ** .8),
                g.prevPositionX || (g.prevPositionX = f.touchesCurrent.x),
                g.prevPositionY || (g.prevPositionY = f.touchesCurrent.y),
                g.prevTime || (g.prevTime = Date.now()),
                g.x = (f.touchesCurrent.x - g.prevPositionX) / (Date.now() - g.prevTime) / 2,
                g.y = (f.touchesCurrent.y - g.prevPositionY) / (Date.now() - g.prevTime) / 2,
                Math.abs(f.touchesCurrent.x - g.prevPositionX) < 2 && (g.x = 0),
                Math.abs(f.touchesCurrent.y - g.prevPositionY) < 2 && (g.y = 0),
                g.prevPositionX = f.touchesCurrent.x,
                g.prevPositionY = f.touchesCurrent.y,
                g.prevTime = Date.now(),
                m.$imageWrapEl.transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)
            }
        }
        function T() {
            const e = t.zoom;
            m.$slideEl && t.previousIndex !== t.activeIndex && (m.$imageEl && m.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            m.$imageWrapEl && m.$imageWrapEl.transform("translate3d(0,0,0)"),
            e.scale = 1,
            p = 1,
            m.$slideEl = void 0,
            m.$imageEl = void 0,
            m.$imageWrapEl = void 0)
        }
        function C(e) {
            const s = t.zoom
              , a = t.params.zoom;
            if (m.$slideEl || (e && e.target && (m.$slideEl = d(e.target).closest(`.${t.params.slideClass}`)),
            m.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? m.$slideEl = t.$wrapperEl.children(`.${t.params.slideActiveClass}`) : m.$slideEl = t.slides.eq(t.activeIndex)),
            m.$imageEl = m.$slideEl.find(`.${a.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),
            m.$imageWrapEl = m.$imageEl.parent(`.${a.containerClass}`)),
            !m.$imageEl || 0 === m.$imageEl.length || !m.$imageWrapEl || 0 === m.$imageWrapEl.length)
                return;
            let i, r, l, o, c, u, h, g, v, w, b, x, y, E, T, C, $, S;
            t.params.cssMode && (t.wrapperEl.style.overflow = "hidden",
            t.wrapperEl.style.touchAction = "none"),
            m.$slideEl.addClass(`${a.zoomedSlideClass}`),
            void 0 === f.touchesStart.x && e ? (i = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX,
            r = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (i = f.touchesStart.x,
            r = f.touchesStart.y),
            s.scale = m.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio,
            p = m.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio,
            e ? ($ = m.$slideEl[0].offsetWidth,
            S = m.$slideEl[0].offsetHeight,
            l = m.$slideEl.offset().left + n.scrollX,
            o = m.$slideEl.offset().top + n.scrollY,
            c = l + $ / 2 - i,
            u = o + S / 2 - r,
            v = m.$imageEl[0].offsetWidth,
            w = m.$imageEl[0].offsetHeight,
            b = v * s.scale,
            x = w * s.scale,
            y = Math.min($ / 2 - b / 2, 0),
            E = Math.min(S / 2 - x / 2, 0),
            T = -y,
            C = -E,
            h = c * s.scale,
            g = u * s.scale,
            h < y && (h = y),
            h > T && (h = T),
            g < E && (g = E),
            g > C && (g = C)) : (h = 0,
            g = 0),
            m.$imageWrapEl.transition(300).transform(`translate3d(${h}px, ${g}px,0)`),
            m.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${s.scale})`)
        }
        function $() {
            const e = t.zoom
              , s = t.params.zoom;
            m.$slideEl || (t.params.virtual && t.params.virtual.enabled && t.virtual ? m.$slideEl = t.$wrapperEl.children(`.${t.params.slideActiveClass}`) : m.$slideEl = t.slides.eq(t.activeIndex),
            m.$imageEl = m.$slideEl.find(`.${s.containerClass}`).eq(0).find("picture, img, svg, canvas, .swiper-zoom-target").eq(0),
            m.$imageWrapEl = m.$imageEl.parent(`.${s.containerClass}`)),
            m.$imageEl && 0 !== m.$imageEl.length && m.$imageWrapEl && 0 !== m.$imageWrapEl.length && (t.params.cssMode && (t.wrapperEl.style.overflow = "",
            t.wrapperEl.style.touchAction = ""),
            e.scale = 1,
            p = 1,
            m.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
            m.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
            m.$slideEl.removeClass(`${s.zoomedSlideClass}`),
            m.$slideEl = void 0)
        }
        function S(e) {
            const s = t.zoom;
            s.scale && 1 !== s.scale ? $() : C(e)
        }
        function M() {
            const e = t.support;
            return {
                passiveListener: !("touchstart" !== t.touchEvents.start || !e.passiveListener || !t.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                },
                activeListenerWithCapture: !e.passiveListener || {
                    passive: !1,
                    capture: !0
                }
            }
        }
        function P() {
            return `.${t.params.slideClass}`
        }
        function k(e) {
            const {passiveListener: s} = M()
              , a = P();
            t.$wrapperEl[e]("gesturestart", a, b, s),
            t.$wrapperEl[e]("gesturechange", a, x, s),
            t.$wrapperEl[e]("gestureend", a, y, s)
        }
        function z() {
            l || (l = !0,
            k("on"))
        }
        function O() {
            l && (l = !1,
            k("off"))
        }
        function I() {
            const e = t.zoom;
            if (e.enabled)
                return;
            e.enabled = !0;
            const s = t.support
              , {passiveListener: a, activeListenerWithCapture: i} = M()
              , r = P();
            s.gestures ? (t.$wrapperEl.on(t.touchEvents.start, z, a),
            t.$wrapperEl.on(t.touchEvents.end, O, a)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.on(t.touchEvents.start, r, b, a),
            t.$wrapperEl.on(t.touchEvents.move, r, x, i),
            t.$wrapperEl.on(t.touchEvents.end, r, y, a),
            t.touchEvents.cancel && t.$wrapperEl.on(t.touchEvents.cancel, r, y, a)),
            t.$wrapperEl.on(t.touchEvents.move, `.${t.params.zoom.containerClass}`, E, i)
        }
        function L() {
            const e = t.zoom;
            if (!e.enabled)
                return;
            const s = t.support;
            e.enabled = !1;
            const {passiveListener: a, activeListenerWithCapture: i} = M()
              , r = P();
            s.gestures ? (t.$wrapperEl.off(t.touchEvents.start, z, a),
            t.$wrapperEl.off(t.touchEvents.end, O, a)) : "touchstart" === t.touchEvents.start && (t.$wrapperEl.off(t.touchEvents.start, r, b, a),
            t.$wrapperEl.off(t.touchEvents.move, r, x, i),
            t.$wrapperEl.off(t.touchEvents.end, r, y, a),
            t.touchEvents.cancel && t.$wrapperEl.off(t.touchEvents.cancel, r, y, a)),
            t.$wrapperEl.off(t.touchEvents.move, `.${t.params.zoom.containerClass}`, E, i)
        }
        Object.defineProperty(t.zoom, "scale", {
            get: ()=>v,
            set(e) {
                if (v !== e) {
                    const t = m.$imageEl ? m.$imageEl[0] : void 0
                      , s = m.$slideEl ? m.$slideEl[0] : void 0;
                    i("zoomChange", e, t, s)
                }
                v = e
            }
        }),
        a("init", (()=>{
            t.params.zoom.enabled && I()
        }
        )),
        a("destroy", (()=>{
            L()
        }
        )),
        a("touchStart", ((e,s)=>{
            t.zoom.enabled && function(e) {
                const s = t.device;
                m.$imageEl && 0 !== m.$imageEl.length && (f.isTouched || (s.android && e.cancelable && e.preventDefault(),
                f.isTouched = !0,
                f.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                f.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            }(s)
        }
        )),
        a("touchEnd", ((e,s)=>{
            t.zoom.enabled && function() {
                const e = t.zoom;
                if (!m.$imageEl || 0 === m.$imageEl.length)
                    return;
                if (!f.isTouched || !f.isMoved)
                    return f.isTouched = !1,
                    void (f.isMoved = !1);
                f.isTouched = !1,
                f.isMoved = !1;
                let s = 300
                  , a = 300;
                const i = g.x * s
                  , r = f.currentX + i
                  , n = g.y * a
                  , l = f.currentY + n;
                0 !== g.x && (s = Math.abs((r - f.currentX) / g.x)),
                0 !== g.y && (a = Math.abs((l - f.currentY) / g.y));
                const o = Math.max(s, a);
                f.currentX = r,
                f.currentY = l;
                const d = f.width * e.scale
                  , c = f.height * e.scale;
                f.minX = Math.min(m.slideWidth / 2 - d / 2, 0),
                f.maxX = -f.minX,
                f.minY = Math.min(m.slideHeight / 2 - c / 2, 0),
                f.maxY = -f.minY,
                f.currentX = Math.max(Math.min(f.currentX, f.maxX), f.minX),
                f.currentY = Math.max(Math.min(f.currentY, f.maxY), f.minY),
                m.$imageWrapEl.transition(o).transform(`translate3d(${f.currentX}px, ${f.currentY}px,0)`)
            }()
        }
        )),
        a("doubleTap", ((e,s)=>{
            !t.animating && t.params.zoom.enabled && t.zoom.enabled && t.params.zoom.toggle && S(s)
        }
        )),
        a("transitionEnd", (()=>{
            t.zoom.enabled && t.params.zoom.enabled && T()
        }
        )),
        a("slideChange", (()=>{
            t.zoom.enabled && t.params.zoom.enabled && t.params.cssMode && T()
        }
        )),
        Object.assign(t.zoom, {
            enable: I,
            disable: L,
            in: C,
            out: $,
            toggle: S
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a, emit: i} = e;
        s({
            lazy: {
                checkInView: !1,
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                scrollingElement: "",
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        }),
        t.lazy = {};
        let n = !1
          , l = !1;
        function o(e, s) {
            void 0 === s && (s = !0);
            const a = t.params.lazy;
            if (void 0 === e)
                return;
            if (0 === t.slides.length)
                return;
            const r = t.virtual && t.params.virtual.enabled ? t.$wrapperEl.children(`.${t.params.slideClass}[data-swiper-slide-index="${e}"]`) : t.slides.eq(e)
              , n = r.find(`.${a.elementClass}:not(.${a.loadedClass}):not(.${a.loadingClass})`);
            !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || n.push(r[0]),
            0 !== n.length && n.each((e=>{
                const n = d(e);
                n.addClass(a.loadingClass);
                const l = n.attr("data-background")
                  , c = n.attr("data-src")
                  , p = n.attr("data-srcset")
                  , u = n.attr("data-sizes")
                  , h = n.parent("picture");
                t.loadImage(n[0], c || l, p, u, !1, (()=>{
                    if (null != t && t && (!t || t.params) && !t.destroyed) {
                        if (l ? (n.css("background-image", `url("${l}")`),
                        n.removeAttr("data-background")) : (p && (n.attr("srcset", p),
                        n.removeAttr("data-srcset")),
                        u && (n.attr("sizes", u),
                        n.removeAttr("data-sizes")),
                        h.length && h.children("source").each((e=>{
                            const t = d(e);
                            t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")),
                            t.removeAttr("data-srcset"))
                        }
                        )),
                        c && (n.attr("src", c),
                        n.removeAttr("data-src"))),
                        n.addClass(a.loadedClass).removeClass(a.loadingClass),
                        r.find(`.${a.preloaderClass}`).remove(),
                        t.params.loop && s) {
                            const e = r.attr("data-swiper-slide-index");
                            if (r.hasClass(t.params.slideDuplicateClass)) {
                                o(t.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${t.params.slideDuplicateClass})`).index(), !1)
                            } else {
                                o(t.$wrapperEl.children(`.${t.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(), !1)
                            }
                        }
                        i("lazyImageReady", r[0], n[0]),
                        t.params.autoHeight && t.updateAutoHeight()
                    }
                }
                )),
                i("lazyImageLoad", r[0], n[0])
            }
            ))
        }
        function c() {
            const {$wrapperEl: e, params: s, slides: a, activeIndex: i} = t
              , r = t.virtual && s.virtual.enabled
              , n = s.lazy;
            let c = s.slidesPerView;
            function p(t) {
                if (r) {
                    if (e.children(`.${s.slideClass}[data-swiper-slide-index="${t}"]`).length)
                        return !0
                } else if (a[t])
                    return !0;
                return !1
            }
            function u(e) {
                return r ? d(e).attr("data-swiper-slide-index") : d(e).index()
            }
            if ("auto" === c && (c = 0),
            l || (l = !0),
            t.params.watchSlidesProgress)
                e.children(`.${s.slideVisibleClass}`).each((e=>{
                    o(r ? d(e).attr("data-swiper-slide-index") : d(e).index())
                }
                ));
            else if (c > 1)
                for (let e = i; e < i + c; e += 1)
                    p(e) && o(e);
            else
                o(i);
            if (n.loadPrevNext)
                if (c > 1 || n.loadPrevNextAmount && n.loadPrevNextAmount > 1) {
                    const e = n.loadPrevNextAmount
                      , t = c
                      , s = Math.min(i + t + Math.max(e, t), a.length)
                      , r = Math.max(i - Math.max(t, e), 0);
                    for (let e = i + c; e < s; e += 1)
                        p(e) && o(e);
                    for (let e = r; e < i; e += 1)
                        p(e) && o(e)
                } else {
                    const t = e.children(`.${s.slideNextClass}`);
                    t.length > 0 && o(u(t));
                    const a = e.children(`.${s.slidePrevClass}`);
                    a.length > 0 && o(u(a))
                }
        }
        function p() {
            const e = r();
            if (!t || t.destroyed)
                return;
            const s = t.params.lazy.scrollingElement ? d(t.params.lazy.scrollingElement) : d(e)
              , a = s[0] === e
              , i = a ? e.innerWidth : s[0].offsetWidth
              , l = a ? e.innerHeight : s[0].offsetHeight
              , o = t.$el.offset()
              , {rtlTranslate: u} = t;
            let h = !1;
            u && (o.left -= t.$el[0].scrollLeft);
            const m = [[o.left, o.top], [o.left + t.width, o.top], [o.left, o.top + t.height], [o.left + t.width, o.top + t.height]];
            for (let e = 0; e < m.length; e += 1) {
                const t = m[e];
                if (t[0] >= 0 && t[0] <= i && t[1] >= 0 && t[1] <= l) {
                    if (0 === t[0] && 0 === t[1])
                        continue;
                    h = !0
                }
            }
            const f = !("touchstart" !== t.touchEvents.start || !t.support.passiveListener || !t.params.passiveListeners) && {
                passive: !0,
                capture: !1
            };
            h ? (c(),
            s.off("scroll", p, f)) : n || (n = !0,
            s.on("scroll", p, f))
        }
        a("beforeInit", (()=>{
            t.params.lazy.enabled && t.params.preloadImages && (t.params.preloadImages = !1)
        }
        )),
        a("init", (()=>{
            t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c())
        }
        )),
        a("scroll", (()=>{
            t.params.freeMode && t.params.freeMode.enabled && !t.params.freeMode.sticky && c()
        }
        )),
        a("scrollbarDragMove resize _freeModeNoMomentumRelease", (()=>{
            t.params.lazy.enabled && (t.params.lazy.checkInView ? p() : c())
        }
        )),
        a("transitionStart", (()=>{
            t.params.lazy.enabled && (t.params.lazy.loadOnTransitionStart || !t.params.lazy.loadOnTransitionStart && !l) && (t.params.lazy.checkInView ? p() : c())
        }
        )),
        a("transitionEnd", (()=>{
            t.params.lazy.enabled && !t.params.lazy.loadOnTransitionStart && (t.params.lazy.checkInView ? p() : c())
        }
        )),
        a("slideChange", (()=>{
            const {lazy: e, cssMode: s, watchSlidesProgress: a, touchReleaseOnEdges: i, resistanceRatio: r} = t.params;
            e.enabled && (s || a && (i || 0 === r)) && c()
        }
        )),
        Object.assign(t.lazy, {
            load: c,
            loadInSlide: o
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        function i(e, t) {
            const s = function() {
                let e, t, s;
                return (a,i)=>{
                    for (t = -1,
                    e = a.length; e - t > 1; )
                        s = e + t >> 1,
                        a[s] <= i ? t = s : e = s;
                    return e
                }
            }();
            let a, i;
            return this.x = e,
            this.y = t,
            this.lastIndex = e.length - 1,
            this.interpolate = function(e) {
                return e ? (i = s(this.x, e),
                a = i - 1,
                (e - this.x[a]) * (this.y[i] - this.y[a]) / (this.x[i] - this.x[a]) + this.y[a]) : 0
            }
            ,
            this
        }
        function r() {
            t.controller.control && t.controller.spline && (t.controller.spline = void 0,
            delete t.controller.spline)
        }
        s({
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        }),
        t.controller = {
            control: void 0
        },
        a("beforeInit", (()=>{
            t.controller.control = t.params.controller.control
        }
        )),
        a("update", (()=>{
            r()
        }
        )),
        a("resize", (()=>{
            r()
        }
        )),
        a("observerUpdate", (()=>{
            r()
        }
        )),
        a("setTranslate", ((e,s,a)=>{
            t.controller.control && t.controller.setTranslate(s, a)
        }
        )),
        a("setTransition", ((e,s,a)=>{
            t.controller.control && t.controller.setTransition(s, a)
        }
        )),
        Object.assign(t.controller, {
            setTranslate: function(e, s) {
                const a = t.controller.control;
                let r, n;
                const l = t.constructor;
                function o(e) {
                    const s = t.rtlTranslate ? -t.translate : t.translate;
                    "slide" === t.params.controller.by && (!function(e) {
                        t.controller.spline || (t.controller.spline = t.params.loop ? new i(t.slidesGrid,e.slidesGrid) : new i(t.snapGrid,e.snapGrid))
                    }(e),
                    n = -t.controller.spline.interpolate(-s)),
                    n && "container" !== t.params.controller.by || (r = (e.maxTranslate() - e.minTranslate()) / (t.maxTranslate() - t.minTranslate()),
                    n = (s - t.minTranslate()) * r + e.minTranslate()),
                    t.params.controller.inverse && (n = e.maxTranslate() - n),
                    e.updateProgress(n),
                    e.setTranslate(n, t),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses()
                }
                if (Array.isArray(a))
                    for (let e = 0; e < a.length; e += 1)
                        a[e] !== s && a[e]instanceof l && o(a[e]);
                else
                    a instanceof l && s !== a && o(a)
            },
            setTransition: function(e, s) {
                const a = t.constructor
                  , i = t.controller.control;
                let r;
                function n(s) {
                    s.setTransition(e, t),
                    0 !== e && (s.transitionStart(),
                    s.params.autoHeight && p((()=>{
                        s.updateAutoHeight()
                    }
                    )),
                    s.$wrapperEl.transitionEnd((()=>{
                        i && (s.params.loop && "slide" === t.params.controller.by && s.loopFix(),
                        s.transitionEnd())
                    }
                    )))
                }
                if (Array.isArray(i))
                    for (r = 0; r < i.length; r += 1)
                        i[r] !== s && i[r]instanceof a && n(i[r]);
                else
                    i instanceof a && s !== i && n(i)
            }
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide {{index}}",
                slideLabelMessage: "{{index}} / {{slidesLength}}",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null,
                slideRole: "group"
            }
        });
        let i = null;
        function r(e) {
            const t = i;
            0 !== t.length && (t.html(""),
            t.html(e))
        }
        function n(e) {
            e.attr("tabIndex", "0")
        }
        function l(e) {
            e.attr("tabIndex", "-1")
        }
        function o(e, t) {
            e.attr("role", t)
        }
        function c(e, t) {
            e.attr("aria-roledescription", t)
        }
        function p(e, t) {
            e.attr("aria-label", t)
        }
        function u(e) {
            e.attr("aria-disabled", !0)
        }
        function h(e) {
            e.attr("aria-disabled", !1)
        }
        function m(e) {
            if (13 !== e.keyCode && 32 !== e.keyCode)
                return;
            const s = t.params.a11y
              , a = d(e.target);
            t.navigation && t.navigation.$nextEl && a.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(),
            t.isEnd ? r(s.lastSlideMessage) : r(s.nextSlideMessage)),
            t.navigation && t.navigation.$prevEl && a.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(),
            t.isBeginning ? r(s.firstSlideMessage) : r(s.prevSlideMessage)),
            t.pagination && a.is(U(t.params.pagination.bulletClass)) && a[0].click()
        }
        function f() {
            return t.pagination && t.pagination.bullets && t.pagination.bullets.length
        }
        function g() {
            return f() && t.params.pagination.clickable
        }
        const v = (e,t,s)=>{
            n(e),
            "BUTTON" !== e[0].tagName && (o(e, "button"),
            e.on("keydown", m)),
            p(e, s),
            function(e, t) {
                e.attr("aria-controls", t)
            }(e, t)
        }
          , w = e=>{
            const s = e.target.closest(`.${t.params.slideClass}`);
            if (!s || !t.slides.includes(s))
                return;
            const a = t.slides.indexOf(s) === t.activeIndex
              , i = t.params.watchSlidesProgress && t.visibleSlides && t.visibleSlides.includes(s);
            a || i || t.slideTo(t.slides.indexOf(s), 0)
        }
        ;
        function b() {
            const e = t.params.a11y;
            t.$el.append(i);
            const s = t.$el;
            e.containerRoleDescriptionMessage && c(s, e.containerRoleDescriptionMessage),
            e.containerMessage && p(s, e.containerMessage);
            const a = t.$wrapperEl
              , r = a.attr("id") || `swiper-wrapper-${n = 16,
            void 0 === n && (n = 16),
            "x".repeat(n).replace(/x/g, (()=>Math.round(16 * Math.random()).toString(16)))}`;
            var n;
            const l = t.params.autoplay && t.params.autoplay.enabled ? "off" : "polite";
            var u;
            u = r,
            a.attr("id", u),
            function(e, t) {
                e.attr("aria-live", t)
            }(a, l),
            e.itemRoleDescriptionMessage && c(d(t.slides), e.itemRoleDescriptionMessage),
            o(d(t.slides), e.slideRole);
            const h = t.params.loop ? t.slides.filter((e=>!e.classList.contains(t.params.slideDuplicateClass))).length : t.slides.length;
            let f, b;
            t.slides.each(((s,a)=>{
                const i = d(s)
                  , r = t.params.loop ? parseInt(i.attr("data-swiper-slide-index"), 10) : a;
                p(i, e.slideLabelMessage.replace(/\{\{index\}\}/, r + 1).replace(/\{\{slidesLength\}\}/, h))
            }
            )),
            t.navigation && t.navigation.$nextEl && (f = t.navigation.$nextEl),
            t.navigation && t.navigation.$prevEl && (b = t.navigation.$prevEl),
            f && f.length && v(f, r, e.nextSlideMessage),
            b && b.length && v(b, r, e.prevSlideMessage),
            g() && t.pagination.$el.on("keydown", U(t.params.pagination.bulletClass), m),
            t.$el.on("focus", w, !0)
        }
        a("beforeInit", (()=>{
            i = d(`<span class="${t.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`)
        }
        )),
        a("afterInit", (()=>{
            t.params.a11y.enabled && b()
        }
        )),
        a("fromEdge toEdge afterInit lock unlock", (()=>{
            t.params.a11y.enabled && function() {
                if (t.params.loop || t.params.rewind || !t.navigation)
                    return;
                const {$nextEl: e, $prevEl: s} = t.navigation;
                s && s.length > 0 && (t.isBeginning ? (u(s),
                l(s)) : (h(s),
                n(s))),
                e && e.length > 0 && (t.isEnd ? (u(e),
                l(e)) : (h(e),
                n(e)))
            }()
        }
        )),
        a("paginationUpdate", (()=>{
            t.params.a11y.enabled && function() {
                const e = t.params.a11y;
                f() && t.pagination.bullets.each((s=>{
                    const a = d(s);
                    t.params.pagination.clickable && (n(a),
                    t.params.pagination.renderBullet || (o(a, "button"),
                    p(a, e.paginationBulletMessage.replace(/\{\{index\}\}/, a.index() + 1)))),
                    a.is(`.${t.params.pagination.bulletActiveClass}`) ? a.attr("aria-current", "true") : a.removeAttr("aria-current")
                }
                ))
            }()
        }
        )),
        a("destroy", (()=>{
            t.params.a11y.enabled && function() {
                let e, s;
                i && i.length > 0 && i.remove(),
                t.navigation && t.navigation.$nextEl && (e = t.navigation.$nextEl),
                t.navigation && t.navigation.$prevEl && (s = t.navigation.$prevEl),
                e && e.off("keydown", m),
                s && s.off("keydown", m),
                g() && t.pagination.$el.off("keydown", U(t.params.pagination.bulletClass), m),
                t.$el.off("focus", w, !0)
            }()
        }
        ))
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            history: {
                enabled: !1,
                root: "",
                replaceState: !1,
                key: "slides"
            }
        });
        let i = !1
          , n = {};
        const l = e=>e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
          , o = e=>{
            const t = r();
            let s;
            s = e ? new URL(e) : t.location;
            const a = s.pathname.slice(1).split("/").filter((e=>"" !== e))
              , i = a.length;
            return {
                key: a[i - 2],
                value: a[i - 1]
            }
        }
          , d = (e,s)=>{
            const a = r();
            if (!i || !t.params.history.enabled)
                return;
            let n;
            n = t.params.url ? new URL(t.params.url) : a.location;
            const o = t.slides.eq(s);
            let d = l(o.attr("data-history"));
            if (t.params.history.root.length > 0) {
                let s = t.params.history.root;
                "/" === s[s.length - 1] && (s = s.slice(0, s.length - 1)),
                d = `${s}/${e}/${d}`
            } else
                n.pathname.includes(e) || (d = `${e}/${d}`);
            const c = a.history.state;
            c && c.value === d || (t.params.history.replaceState ? a.history.replaceState({
                value: d
            }, null, d) : a.history.pushState({
                value: d
            }, null, d))
        }
          , c = (e,s,a)=>{
            if (s)
                for (let i = 0, r = t.slides.length; i < r; i += 1) {
                    const r = t.slides.eq(i);
                    if (l(r.attr("data-history")) === s && !r.hasClass(t.params.slideDuplicateClass)) {
                        const s = r.index();
                        t.slideTo(s, e, a)
                    }
                }
            else
                t.slideTo(0, e, a)
        }
          , p = ()=>{
            n = o(t.params.url),
            c(t.params.speed, t.paths.value, !1)
        }
        ;
        a("init", (()=>{
            t.params.history.enabled && (()=>{
                const e = r();
                if (t.params.history) {
                    if (!e.history || !e.history.pushState)
                        return t.params.history.enabled = !1,
                        void (t.params.hashNavigation.enabled = !0);
                    i = !0,
                    n = o(t.params.url),
                    (n.key || n.value) && (c(0, n.value, t.params.runCallbacksOnInit),
                    t.params.history.replaceState || e.addEventListener("popstate", p))
                }
            }
            )()
        }
        )),
        a("destroy", (()=>{
            t.params.history.enabled && (()=>{
                const e = r();
                t.params.history.replaceState || e.removeEventListener("popstate", p)
            }
            )()
        }
        )),
        a("transitionEnd _freeModeNoMomentumRelease", (()=>{
            i && d(t.params.history.key, t.activeIndex)
        }
        )),
        a("slideChange", (()=>{
            i && t.params.cssMode && d(t.params.history.key, t.activeIndex)
        }
        ))
    }
    , function(e) {
        let {swiper: t, extendParams: s, emit: i, on: n} = e
          , l = !1;
        const o = a()
          , c = r();
        s({
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        });
        const p = ()=>{
            i("hashChange");
            const e = o.location.hash.replace("#", "");
            if (e !== t.slides.eq(t.activeIndex).attr("data-hash")) {
                const s = t.$wrapperEl.children(`.${t.params.slideClass}[data-hash="${e}"]`).index();
                if (void 0 === s)
                    return;
                t.slideTo(s)
            }
        }
          , u = ()=>{
            if (l && t.params.hashNavigation.enabled)
                if (t.params.hashNavigation.replaceState && c.history && c.history.replaceState)
                    c.history.replaceState(null, null, `#${t.slides.eq(t.activeIndex).attr("data-hash")}` || ""),
                    i("hashSet");
                else {
                    const e = t.slides.eq(t.activeIndex)
                      , s = e.attr("data-hash") || e.attr("data-history");
                    o.location.hash = s || "",
                    i("hashSet")
                }
        }
        ;
        n("init", (()=>{
            t.params.hashNavigation.enabled && (()=>{
                if (!t.params.hashNavigation.enabled || t.params.history && t.params.history.enabled)
                    return;
                l = !0;
                const e = o.location.hash.replace("#", "");
                if (e) {
                    const s = 0;
                    for (let a = 0, i = t.slides.length; a < i; a += 1) {
                        const i = t.slides.eq(a);
                        if ((i.attr("data-hash") || i.attr("data-history")) === e && !i.hasClass(t.params.slideDuplicateClass)) {
                            const e = i.index();
                            t.slideTo(e, s, t.params.runCallbacksOnInit, !0)
                        }
                    }
                }
                t.params.hashNavigation.watchState && d(c).on("hashchange", p)
            }
            )()
        }
        )),
        n("destroy", (()=>{
            t.params.hashNavigation.enabled && t.params.hashNavigation.watchState && d(c).off("hashchange", p)
        }
        )),
        n("transitionEnd _freeModeNoMomentumRelease", (()=>{
            l && u()
        }
        )),
        n("slideChange", (()=>{
            l && t.params.cssMode && u()
        }
        ))
    }
    , function(e) {
        let t, {swiper: s, extendParams: i, on: r, emit: n} = e;
        function l() {
            const e = s.slides.eq(s.activeIndex);
            let a = s.params.autoplay.delay;
            e.attr("data-swiper-autoplay") && (a = e.attr("data-swiper-autoplay") || s.params.autoplay.delay),
            clearTimeout(t),
            t = p((()=>{
                let e;
                s.params.autoplay.reverseDirection ? s.params.loop ? (s.loopFix(),
                e = s.slidePrev(s.params.speed, !0, !0),
                n("autoplay")) : s.isBeginning ? s.params.autoplay.stopOnLastSlide ? d() : (e = s.slideTo(s.slides.length - 1, s.params.speed, !0, !0),
                n("autoplay")) : (e = s.slidePrev(s.params.speed, !0, !0),
                n("autoplay")) : s.params.loop ? (s.loopFix(),
                e = s.slideNext(s.params.speed, !0, !0),
                n("autoplay")) : s.isEnd ? s.params.autoplay.stopOnLastSlide ? d() : (e = s.slideTo(0, s.params.speed, !0, !0),
                n("autoplay")) : (e = s.slideNext(s.params.speed, !0, !0),
                n("autoplay")),
                (s.params.cssMode && s.autoplay.running || !1 === e) && l()
            }
            ), a)
        }
        function o() {
            return void 0 === t && (!s.autoplay.running && (s.autoplay.running = !0,
            n("autoplayStart"),
            l(),
            !0))
        }
        function d() {
            return !!s.autoplay.running && (void 0 !== t && (t && (clearTimeout(t),
            t = void 0),
            s.autoplay.running = !1,
            n("autoplayStop"),
            !0))
        }
        function c(e) {
            s.autoplay.running && (s.autoplay.paused || (t && clearTimeout(t),
            s.autoplay.paused = !0,
            0 !== e && s.params.autoplay.waitForTransition ? ["transitionend", "webkitTransitionEnd"].forEach((e=>{
                s.$wrapperEl[0].addEventListener(e, h)
            }
            )) : (s.autoplay.paused = !1,
            l())))
        }
        function u() {
            const e = a();
            "hidden" === e.visibilityState && s.autoplay.running && c(),
            "visible" === e.visibilityState && s.autoplay.paused && (l(),
            s.autoplay.paused = !1)
        }
        function h(e) {
            s && !s.destroyed && s.$wrapperEl && e.target === s.$wrapperEl[0] && (["transitionend", "webkitTransitionEnd"].forEach((e=>{
                s.$wrapperEl[0].removeEventListener(e, h)
            }
            )),
            s.autoplay.paused = !1,
            s.autoplay.running ? l() : d())
        }
        function m() {
            s.params.autoplay.disableOnInteraction ? d() : (n("autoplayPause"),
            c()),
            ["transitionend", "webkitTransitionEnd"].forEach((e=>{
                s.$wrapperEl[0].removeEventListener(e, h)
            }
            ))
        }
        function f() {
            s.params.autoplay.disableOnInteraction || (s.autoplay.paused = !1,
            n("autoplayResume"),
            l())
        }
        s.autoplay = {
            running: !1,
            paused: !1
        },
        i({
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1,
                pauseOnMouseEnter: !1
            }
        }),
        r("init", (()=>{
            if (s.params.autoplay.enabled) {
                o();
                a().addEventListener("visibilitychange", u),
                s.params.autoplay.pauseOnMouseEnter && (s.$el.on("mouseenter", m),
                s.$el.on("mouseleave", f))
            }
        }
        )),
        r("beforeTransitionStart", ((e,t,a)=>{
            s.autoplay.running && (a || !s.params.autoplay.disableOnInteraction ? s.autoplay.pause(t) : d())
        }
        )),
        r("sliderFirstMove", (()=>{
            s.autoplay.running && (s.params.autoplay.disableOnInteraction ? d() : c())
        }
        )),
        r("touchEnd", (()=>{
            s.params.cssMode && s.autoplay.paused && !s.params.autoplay.disableOnInteraction && l()
        }
        )),
        r("destroy", (()=>{
            s.$el.off("mouseenter", m),
            s.$el.off("mouseleave", f),
            s.autoplay.running && d();
            a().removeEventListener("visibilitychange", u)
        }
        )),
        Object.assign(s.autoplay, {
            pause: c,
            run: l,
            start: o,
            stop: d
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-thumbs"
            }
        });
        let i = !1
          , r = !1;
        function n() {
            const e = t.thumbs.swiper;
            if (!e)
                return;
            const s = e.clickedIndex
              , a = e.clickedSlide;
            if (a && d(a).hasClass(t.params.thumbs.slideThumbActiveClass))
                return;
            if (null == s)
                return;
            let i;
            if (i = e.params.loop ? parseInt(d(e.clickedSlide).attr("data-swiper-slide-index"), 10) : s,
            t.params.loop) {
                let e = t.activeIndex;
                t.slides.eq(e).hasClass(t.params.slideDuplicateClass) && (t.loopFix(),
                t._clientLeft = t.$wrapperEl[0].clientLeft,
                e = t.activeIndex);
                const s = t.slides.eq(e).prevAll(`[data-swiper-slide-index="${i}"]`).eq(0).index()
                  , a = t.slides.eq(e).nextAll(`[data-swiper-slide-index="${i}"]`).eq(0).index();
                i = void 0 === s ? a : void 0 === a ? s : a - e < e - s ? a : s
            }
            t.slideTo(i)
        }
        function l() {
            const {thumbs: e} = t.params;
            if (i)
                return !1;
            i = !0;
            const s = t.constructor;
            if (e.swiper instanceof s)
                t.thumbs.swiper = e.swiper,
                Object.assign(t.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }),
                Object.assign(t.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                });
            else if (m(e.swiper)) {
                const a = Object.assign({}, e.swiper);
                Object.assign(a, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }),
                t.thumbs.swiper = new s(a),
                r = !0
            }
            return t.thumbs.swiper.$el.addClass(t.params.thumbs.thumbsContainerClass),
            t.thumbs.swiper.on("tap", n),
            !0
        }
        function o(e) {
            const s = t.thumbs.swiper;
            if (!s)
                return;
            const a = "auto" === s.params.slidesPerView ? s.slidesPerViewDynamic() : s.params.slidesPerView
              , i = t.params.thumbs.autoScrollOffset
              , r = i && !s.params.loop;
            if (t.realIndex !== s.realIndex || r) {
                let n, l, o = s.activeIndex;
                if (s.params.loop) {
                    s.slides.eq(o).hasClass(s.params.slideDuplicateClass) && (s.loopFix(),
                    s._clientLeft = s.$wrapperEl[0].clientLeft,
                    o = s.activeIndex);
                    const e = s.slides.eq(o).prevAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index()
                      , a = s.slides.eq(o).nextAll(`[data-swiper-slide-index="${t.realIndex}"]`).eq(0).index();
                    n = void 0 === e ? a : void 0 === a ? e : a - o == o - e ? s.params.slidesPerGroup > 1 ? a : o : a - o < o - e ? a : e,
                    l = t.activeIndex > t.previousIndex ? "next" : "prev"
                } else
                    n = t.realIndex,
                    l = n > t.previousIndex ? "next" : "prev";
                r && (n += "next" === l ? i : -1 * i),
                s.visibleSlidesIndexes && s.visibleSlidesIndexes.indexOf(n) < 0 && (s.params.centeredSlides ? n = n > o ? n - Math.floor(a / 2) + 1 : n + Math.floor(a / 2) - 1 : n > o && s.params.slidesPerGroup,
                s.slideTo(n, e ? 0 : void 0))
            }
            let n = 1;
            const l = t.params.thumbs.slideThumbActiveClass;
            if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (n = t.params.slidesPerView),
            t.params.thumbs.multipleActiveThumbs || (n = 1),
            n = Math.floor(n),
            s.slides.removeClass(l),
            s.params.loop || s.params.virtual && s.params.virtual.enabled)
                for (let e = 0; e < n; e += 1)
                    s.$wrapperEl.children(`[data-swiper-slide-index="${t.realIndex + e}"]`).addClass(l);
            else
                for (let e = 0; e < n; e += 1)
                    s.slides.eq(t.realIndex + e).addClass(l)
        }
        t.thumbs = {
            swiper: null
        },
        a("beforeInit", (()=>{
            const {thumbs: e} = t.params;
            e && e.swiper && (l(),
            o(!0))
        }
        )),
        a("slideChange update resize observerUpdate", (()=>{
            t.thumbs.swiper && o()
        }
        )),
        a("setTransition", ((e,s)=>{
            const a = t.thumbs.swiper;
            a && a.setTransition(s)
        }
        )),
        a("beforeDestroy", (()=>{
            const e = t.thumbs.swiper;
            e && r && e && e.destroy()
        }
        )),
        Object.assign(t.thumbs, {
            init: l,
            update: o
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, emit: a, once: i} = e;
        s({
            freeMode: {
                enabled: !1,
                momentum: !0,
                momentumRatio: 1,
                momentumBounce: !0,
                momentumBounceRatio: 1,
                momentumVelocityRatio: 1,
                sticky: !1,
                minimumVelocity: .02
            }
        }),
        Object.assign(t, {
            freeMode: {
                onTouchStart: function() {
                    const e = t.getTranslate();
                    t.setTranslate(e),
                    t.setTransition(0),
                    t.touchEventsData.velocities.length = 0,
                    t.freeMode.onTouchEnd({
                        currentPos: t.rtl ? t.translate : -t.translate
                    })
                },
                onTouchMove: function() {
                    const {touchEventsData: e, touches: s} = t;
                    0 === e.velocities.length && e.velocities.push({
                        position: s[t.isHorizontal() ? "startX" : "startY"],
                        time: e.touchStartTime
                    }),
                    e.velocities.push({
                        position: s[t.isHorizontal() ? "currentX" : "currentY"],
                        time: u()
                    })
                },
                onTouchEnd: function(e) {
                    let {currentPos: s} = e;
                    const {params: r, $wrapperEl: n, rtlTranslate: l, snapGrid: o, touchEventsData: d} = t
                      , c = u() - d.touchStartTime;
                    if (s < -t.minTranslate())
                        t.slideTo(t.activeIndex);
                    else if (s > -t.maxTranslate())
                        t.slides.length < o.length ? t.slideTo(o.length - 1) : t.slideTo(t.slides.length - 1);
                    else {
                        if (r.freeMode.momentum) {
                            if (d.velocities.length > 1) {
                                const e = d.velocities.pop()
                                  , s = d.velocities.pop()
                                  , a = e.position - s.position
                                  , i = e.time - s.time;
                                t.velocity = a / i,
                                t.velocity /= 2,
                                Math.abs(t.velocity) < r.freeMode.minimumVelocity && (t.velocity = 0),
                                (i > 150 || u() - e.time > 300) && (t.velocity = 0)
                            } else
                                t.velocity = 0;
                            t.velocity *= r.freeMode.momentumVelocityRatio,
                            d.velocities.length = 0;
                            let e = 1e3 * r.freeMode.momentumRatio;
                            const s = t.velocity * e;
                            let c = t.translate + s;
                            l && (c = -c);
                            let p, h = !1;
                            const m = 20 * Math.abs(t.velocity) * r.freeMode.momentumBounceRatio;
                            let f;
                            if (c < t.maxTranslate())
                                r.freeMode.momentumBounce ? (c + t.maxTranslate() < -m && (c = t.maxTranslate() - m),
                                p = t.maxTranslate(),
                                h = !0,
                                d.allowMomentumBounce = !0) : c = t.maxTranslate(),
                                r.loop && r.centeredSlides && (f = !0);
                            else if (c > t.minTranslate())
                                r.freeMode.momentumBounce ? (c - t.minTranslate() > m && (c = t.minTranslate() + m),
                                p = t.minTranslate(),
                                h = !0,
                                d.allowMomentumBounce = !0) : c = t.minTranslate(),
                                r.loop && r.centeredSlides && (f = !0);
                            else if (r.freeMode.sticky) {
                                let e;
                                for (let t = 0; t < o.length; t += 1)
                                    if (o[t] > -c) {
                                        e = t;
                                        break
                                    }
                                c = Math.abs(o[e] - c) < Math.abs(o[e - 1] - c) || "next" === t.swipeDirection ? o[e] : o[e - 1],
                                c = -c
                            }
                            if (f && i("transitionEnd", (()=>{
                                t.loopFix()
                            }
                            )),
                            0 !== t.velocity) {
                                if (e = l ? Math.abs((-c - t.translate) / t.velocity) : Math.abs((c - t.translate) / t.velocity),
                                r.freeMode.sticky) {
                                    const s = Math.abs((l ? -c : c) - t.translate)
                                      , a = t.slidesSizesGrid[t.activeIndex];
                                    e = s < a ? r.speed : s < 2 * a ? 1.5 * r.speed : 2.5 * r.speed
                                }
                            } else if (r.freeMode.sticky)
                                return void t.slideToClosest();
                            r.freeMode.momentumBounce && h ? (t.updateProgress(p),
                            t.setTransition(e),
                            t.setTranslate(c),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating = !0,
                            n.transitionEnd((()=>{
                                t && !t.destroyed && d.allowMomentumBounce && (a("momentumBounce"),
                                t.setTransition(r.speed),
                                setTimeout((()=>{
                                    t.setTranslate(p),
                                    n.transitionEnd((()=>{
                                        t && !t.destroyed && t.transitionEnd()
                                    }
                                    ))
                                }
                                ), 0))
                            }
                            ))) : t.velocity ? (a("_freeModeNoMomentumRelease"),
                            t.updateProgress(c),
                            t.setTransition(e),
                            t.setTranslate(c),
                            t.transitionStart(!0, t.swipeDirection),
                            t.animating || (t.animating = !0,
                            n.transitionEnd((()=>{
                                t && !t.destroyed && t.transitionEnd()
                            }
                            )))) : t.updateProgress(c),
                            t.updateActiveIndex(),
                            t.updateSlidesClasses()
                        } else {
                            if (r.freeMode.sticky)
                                return void t.slideToClosest();
                            r.freeMode && a("_freeModeNoMomentumRelease")
                        }
                        (!r.freeMode.momentum || c >= r.longSwipesMs) && (t.updateProgress(),
                        t.updateActiveIndex(),
                        t.updateSlidesClasses())
                    }
                }
            }
        })
    }
    , function(e) {
        let t, s, a, {swiper: i, extendParams: r} = e;
        r({
            grid: {
                rows: 1,
                fill: "column"
            }
        }),
        i.grid = {
            initSlides: e=>{
                const {slidesPerView: r} = i.params
                  , {rows: n, fill: l} = i.params.grid;
                s = t / n,
                a = Math.floor(e / n),
                t = Math.floor(e / n) === e / n ? e : Math.ceil(e / n) * n,
                "auto" !== r && "row" === l && (t = Math.max(t, r * n))
            }
            ,
            updateSlide: (e,r,n,l)=>{
                const {slidesPerGroup: o, spaceBetween: d} = i.params
                  , {rows: c, fill: p} = i.params.grid;
                let u, h, m;
                if ("row" === p && o > 1) {
                    const s = Math.floor(e / (o * c))
                      , a = e - c * o * s
                      , i = 0 === s ? o : Math.min(Math.ceil((n - s * c * o) / c), o);
                    m = Math.floor(a / i),
                    h = a - m * i + s * o,
                    u = h + m * t / c,
                    r.css({
                        "-webkit-order": u,
                        order: u
                    })
                } else
                    "column" === p ? (h = Math.floor(e / c),
                    m = e - h * c,
                    (h > a || h === a && m === c - 1) && (m += 1,
                    m >= c && (m = 0,
                    h += 1))) : (m = Math.floor(e / s),
                    h = e - m * s);
                r.css(l("margin-top"), 0 !== m ? d && `${d}px` : "")
            }
            ,
            updateWrapperSize: (e,s,a)=>{
                const {spaceBetween: r, centeredSlides: n, roundLengths: l} = i.params
                  , {rows: o} = i.params.grid;
                if (i.virtualSize = (e + r) * t,
                i.virtualSize = Math.ceil(i.virtualSize / o) - r,
                i.$wrapperEl.css({
                    [a("width")]: `${i.virtualSize + r}px`
                }),
                n) {
                    s.splice(0, s.length);
                    const e = [];
                    for (let t = 0; t < s.length; t += 1) {
                        let a = s[t];
                        l && (a = Math.floor(a)),
                        s[t] < i.virtualSize + s[0] && e.push(a)
                    }
                    s.push(...e)
                }
            }
        }
    }
    , function(e) {
        let {swiper: t} = e;
        Object.assign(t, {
            appendSlide: K.bind(t),
            prependSlide: Z.bind(t),
            addSlide: J.bind(t),
            removeSlide: Q.bind(t),
            removeAllSlides: ee.bind(t)
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            fadeEffect: {
                crossFade: !1,
                transformEl: null
            }
        }),
        te({
            effect: "fade",
            swiper: t,
            on: a,
            setTranslate: ()=>{
                const {slides: e} = t
                  , s = t.params.fadeEffect;
                for (let a = 0; a < e.length; a += 1) {
                    const e = t.slides.eq(a);
                    let i = -e[0].swiperSlideOffset;
                    t.params.virtualTranslate || (i -= t.translate);
                    let r = 0;
                    t.isHorizontal() || (r = i,
                    i = 0);
                    const n = t.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(e[0].progress), 0) : 1 + Math.min(Math.max(e[0].progress, -1), 0);
                    se(s, e).css({
                        opacity: n
                    }).transform(`translate3d(${i}px, ${r}px, 0px)`)
                }
            }
            ,
            setTransition: e=>{
                const {transformEl: s} = t.params.fadeEffect;
                (s ? t.slides.find(s) : t.slides).transition(e),
                ae({
                    swiper: t,
                    duration: e,
                    transformEl: s,
                    allSlides: !0
                })
            }
            ,
            overwriteParams: ()=>({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        }),
        te({
            effect: "cube",
            swiper: t,
            on: a,
            setTranslate: ()=>{
                const {$el: e, $wrapperEl: s, slides: a, width: i, height: r, rtlTranslate: n, size: l, browser: o} = t
                  , c = t.params.cubeEffect
                  , p = t.isHorizontal()
                  , u = t.virtual && t.params.virtual.enabled;
                let h, m = 0;
                c.shadow && (p ? (h = s.find(".swiper-cube-shadow"),
                0 === h.length && (h = d('<div class="swiper-cube-shadow"></div>'),
                s.append(h)),
                h.css({
                    height: `${i}px`
                })) : (h = e.find(".swiper-cube-shadow"),
                0 === h.length && (h = d('<div class="swiper-cube-shadow"></div>'),
                e.append(h))));
                for (let e = 0; e < a.length; e += 1) {
                    const t = a.eq(e);
                    let s = e;
                    u && (s = parseInt(t.attr("data-swiper-slide-index"), 10));
                    let i = 90 * s
                      , r = Math.floor(i / 360);
                    n && (i = -i,
                    r = Math.floor(-i / 360));
                    const o = Math.max(Math.min(t[0].progress, 1), -1);
                    let h = 0
                      , f = 0
                      , g = 0;
                    s % 4 == 0 ? (h = 4 * -r * l,
                    g = 0) : (s - 1) % 4 == 0 ? (h = 0,
                    g = 4 * -r * l) : (s - 2) % 4 == 0 ? (h = l + 4 * r * l,
                    g = l) : (s - 3) % 4 == 0 && (h = -l,
                    g = 3 * l + 4 * l * r),
                    n && (h = -h),
                    p || (f = h,
                    h = 0);
                    const v = `rotateX(${p ? 0 : -i}deg) rotateY(${p ? i : 0}deg) translate3d(${h}px, ${f}px, ${g}px)`;
                    if (o <= 1 && o > -1 && (m = 90 * s + 90 * o,
                    n && (m = 90 * -s - 90 * o)),
                    t.transform(v),
                    c.slideShadows) {
                        let e = p ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top")
                          , s = p ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                        0 === e.length && (e = d(`<div class="swiper-slide-shadow-${p ? "left" : "top"}"></div>`),
                        t.append(e)),
                        0 === s.length && (s = d(`<div class="swiper-slide-shadow-${p ? "right" : "bottom"}"></div>`),
                        t.append(s)),
                        e.length && (e[0].style.opacity = Math.max(-o, 0)),
                        s.length && (s[0].style.opacity = Math.max(o, 0))
                    }
                }
                if (s.css({
                    "-webkit-transform-origin": `50% 50% -${l / 2}px`,
                    "transform-origin": `50% 50% -${l / 2}px`
                }),
                c.shadow)
                    if (p)
                        h.transform(`translate3d(0px, ${i / 2 + c.shadowOffset}px, ${-i / 2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`);
                    else {
                        const e = Math.abs(m) - 90 * Math.floor(Math.abs(m) / 90)
                          , t = 1.5 - (Math.sin(2 * e * Math.PI / 360) / 2 + Math.cos(2 * e * Math.PI / 360) / 2)
                          , s = c.shadowScale
                          , a = c.shadowScale / t
                          , i = c.shadowOffset;
                        h.transform(`scale3d(${s}, 1, ${a}) translate3d(0px, ${r / 2 + i}px, ${-r / 2 / a}px) rotateX(-90deg)`)
                    }
                const f = o.isSafari || o.isWebView ? -l / 2 : 0;
                s.transform(`translate3d(0px,0,${f}px) rotateX(${t.isHorizontal() ? 0 : m}deg) rotateY(${t.isHorizontal() ? -m : 0}deg)`)
            }
            ,
            setTransition: e=>{
                const {$el: s, slides: a} = t;
                a.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                t.params.cubeEffect.shadow && !t.isHorizontal() && s.find(".swiper-cube-shadow").transition(e)
            }
            ,
            perspective: ()=>!0,
            overwriteParams: ()=>({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0,
                transformEl: null
            }
        }),
        te({
            effect: "flip",
            swiper: t,
            on: a,
            setTranslate: ()=>{
                const {slides: e, rtlTranslate: s} = t
                  , a = t.params.flipEffect;
                for (let i = 0; i < e.length; i += 1) {
                    const r = e.eq(i);
                    let n = r[0].progress;
                    t.params.flipEffect.limitRotation && (n = Math.max(Math.min(r[0].progress, 1), -1));
                    const l = r[0].swiperSlideOffset;
                    let o = -180 * n
                      , d = 0
                      , c = t.params.cssMode ? -l - t.translate : -l
                      , p = 0;
                    if (t.isHorizontal() ? s && (o = -o) : (p = c,
                    c = 0,
                    d = -o,
                    o = 0),
                    r[0].style.zIndex = -Math.abs(Math.round(n)) + e.length,
                    a.slideShadows) {
                        let e = t.isHorizontal() ? r.find(".swiper-slide-shadow-left") : r.find(".swiper-slide-shadow-top")
                          , s = t.isHorizontal() ? r.find(".swiper-slide-shadow-right") : r.find(".swiper-slide-shadow-bottom");
                        0 === e.length && (e = ie(a, r, t.isHorizontal() ? "left" : "top")),
                        0 === s.length && (s = ie(a, r, t.isHorizontal() ? "right" : "bottom")),
                        e.length && (e[0].style.opacity = Math.max(-n, 0)),
                        s.length && (s[0].style.opacity = Math.max(n, 0))
                    }
                    const u = `translate3d(${c}px, ${p}px, 0px) rotateX(${d}deg) rotateY(${o}deg)`;
                    se(a, r).transform(u)
                }
            }
            ,
            setTransition: e=>{
                const {transformEl: s} = t.params.flipEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                ae({
                    swiper: t,
                    duration: e,
                    transformEl: s
                })
            }
            ,
            perspective: ()=>!0,
            overwriteParams: ()=>({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0,
                transformEl: null
            }
        }),
        te({
            effect: "coverflow",
            swiper: t,
            on: a,
            setTranslate: ()=>{
                const {width: e, height: s, slides: a, slidesSizesGrid: i} = t
                  , r = t.params.coverflowEffect
                  , n = t.isHorizontal()
                  , l = t.translate
                  , o = n ? e / 2 - l : s / 2 - l
                  , d = n ? r.rotate : -r.rotate
                  , c = r.depth;
                for (let e = 0, t = a.length; e < t; e += 1) {
                    const t = a.eq(e)
                      , s = i[e]
                      , l = (o - t[0].swiperSlideOffset - s / 2) / s
                      , p = "function" == typeof r.modifier ? r.modifier(l) : l * r.modifier;
                    let u = n ? d * p : 0
                      , h = n ? 0 : d * p
                      , m = -c * Math.abs(p)
                      , f = r.stretch;
                    "string" == typeof f && -1 !== f.indexOf("%") && (f = parseFloat(r.stretch) / 100 * s);
                    let g = n ? 0 : f * p
                      , v = n ? f * p : 0
                      , w = 1 - (1 - r.scale) * Math.abs(p);
                    Math.abs(v) < .001 && (v = 0),
                    Math.abs(g) < .001 && (g = 0),
                    Math.abs(m) < .001 && (m = 0),
                    Math.abs(u) < .001 && (u = 0),
                    Math.abs(h) < .001 && (h = 0),
                    Math.abs(w) < .001 && (w = 0);
                    const b = `translate3d(${v}px,${g}px,${m}px)  rotateX(${h}deg) rotateY(${u}deg) scale(${w})`;
                    if (se(r, t).transform(b),
                    t[0].style.zIndex = 1 - Math.abs(Math.round(p)),
                    r.slideShadows) {
                        let e = n ? t.find(".swiper-slide-shadow-left") : t.find(".swiper-slide-shadow-top")
                          , s = n ? t.find(".swiper-slide-shadow-right") : t.find(".swiper-slide-shadow-bottom");
                        0 === e.length && (e = ie(r, t, n ? "left" : "top")),
                        0 === s.length && (s = ie(r, t, n ? "right" : "bottom")),
                        e.length && (e[0].style.opacity = p > 0 ? p : 0),
                        s.length && (s[0].style.opacity = -p > 0 ? -p : 0)
                    }
                }
            }
            ,
            setTransition: e=>{
                const {transformEl: s} = t.params.coverflowEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
            ,
            perspective: ()=>!0,
            overwriteParams: ()=>({
                watchSlidesProgress: !0
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            creativeEffect: {
                transformEl: null,
                limitProgress: 1,
                shadowPerProgress: !1,
                progressMultiplier: 1,
                perspective: !0,
                prev: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                },
                next: {
                    translate: [0, 0, 0],
                    rotate: [0, 0, 0],
                    opacity: 1,
                    scale: 1
                }
            }
        });
        const i = e=>"string" == typeof e ? e : `${e}px`;
        te({
            effect: "creative",
            swiper: t,
            on: a,
            setTranslate: ()=>{
                const {slides: e, $wrapperEl: s, slidesSizesGrid: a} = t
                  , r = t.params.creativeEffect
                  , {progressMultiplier: n} = r
                  , l = t.params.centeredSlides;
                if (l) {
                    const e = a[0] / 2 - t.params.slidesOffsetBefore || 0;
                    s.transform(`translateX(calc(50% - ${e}px))`)
                }
                for (let s = 0; s < e.length; s += 1) {
                    const a = e.eq(s)
                      , o = a[0].progress
                      , d = Math.min(Math.max(a[0].progress, -r.limitProgress), r.limitProgress);
                    let c = d;
                    l || (c = Math.min(Math.max(a[0].originalProgress, -r.limitProgress), r.limitProgress));
                    const p = a[0].swiperSlideOffset
                      , u = [t.params.cssMode ? -p - t.translate : -p, 0, 0]
                      , h = [0, 0, 0];
                    let m = !1;
                    t.isHorizontal() || (u[1] = u[0],
                    u[0] = 0);
                    let f = {
                        translate: [0, 0, 0],
                        rotate: [0, 0, 0],
                        scale: 1,
                        opacity: 1
                    };
                    d < 0 ? (f = r.next,
                    m = !0) : d > 0 && (f = r.prev,
                    m = !0),
                    u.forEach(((e,t)=>{
                        u[t] = `calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d * n)}))`
                    }
                    )),
                    h.forEach(((e,t)=>{
                        h[t] = f.rotate[t] * Math.abs(d * n)
                    }
                    )),
                    a[0].style.zIndex = -Math.abs(Math.round(o)) + e.length;
                    const g = u.join(", ")
                      , v = `rotateX(${h[0]}deg) rotateY(${h[1]}deg) rotateZ(${h[2]}deg)`
                      , w = c < 0 ? `scale(${1 + (1 - f.scale) * c * n})` : `scale(${1 - (1 - f.scale) * c * n})`
                      , b = c < 0 ? 1 + (1 - f.opacity) * c * n : 1 - (1 - f.opacity) * c * n
                      , x = `translate3d(${g}) ${v} ${w}`;
                    if (m && f.shadow || !m) {
                        let e = a.children(".swiper-slide-shadow");
                        if (0 === e.length && f.shadow && (e = ie(r, a)),
                        e.length) {
                            const t = r.shadowPerProgress ? d * (1 / r.limitProgress) : d;
                            e[0].style.opacity = Math.min(Math.max(Math.abs(t), 0), 1)
                        }
                    }
                    const y = se(r, a);
                    y.transform(x).css({
                        opacity: b
                    }),
                    f.origin && y.css("transform-origin", f.origin)
                }
            }
            ,
            setTransition: e=>{
                const {transformEl: s} = t.params.creativeEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e),
                ae({
                    swiper: t,
                    duration: e,
                    transformEl: s,
                    allSlides: !0
                })
            }
            ,
            perspective: ()=>t.params.creativeEffect.perspective,
            overwriteParams: ()=>({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    , function(e) {
        let {swiper: t, extendParams: s, on: a} = e;
        s({
            cardsEffect: {
                slideShadows: !0,
                transformEl: null
            }
        }),
        te({
            effect: "cards",
            swiper: t,
            on: a,
            setTranslate: ()=>{
                const {slides: e, activeIndex: s} = t
                  , a = t.params.cardsEffect
                  , {startTranslate: i, isTouched: r} = t.touchEventsData
                  , n = t.translate;
                for (let l = 0; l < e.length; l += 1) {
                    const o = e.eq(l)
                      , d = o[0].progress
                      , c = Math.min(Math.max(d, -4), 4);
                    let p = o[0].swiperSlideOffset;
                    t.params.centeredSlides && !t.params.cssMode && t.$wrapperEl.transform(`translateX(${t.minTranslate()}px)`),
                    t.params.centeredSlides && t.params.cssMode && (p -= e[0].swiperSlideOffset);
                    let u = t.params.cssMode ? -p - t.translate : -p
                      , h = 0;
                    const m = -100 * Math.abs(c);
                    let f = 1
                      , g = -2 * c
                      , v = 8 - .75 * Math.abs(c);
                    const w = t.virtual && t.params.virtual.enabled ? t.virtual.from + l : l
                      , b = (w === s || w === s - 1) && c > 0 && c < 1 && (r || t.params.cssMode) && n < i
                      , x = (w === s || w === s + 1) && c < 0 && c > -1 && (r || t.params.cssMode) && n > i;
                    if (b || x) {
                        const e = (1 - Math.abs((Math.abs(c) - .5) / .5)) ** .5;
                        g += -28 * c * e,
                        f += -.5 * e,
                        v += 96 * e,
                        h = -25 * e * Math.abs(c) + "%"
                    }
                    if (u = c < 0 ? `calc(${u}px + (${v * Math.abs(c)}%))` : c > 0 ? `calc(${u}px + (-${v * Math.abs(c)}%))` : `${u}px`,
                    !t.isHorizontal()) {
                        const e = h;
                        h = u,
                        u = e
                    }
                    const y = `\n        translate3d(${u}, ${h}, ${m}px)\n        rotateZ(${g}deg)\n        scale(${c < 0 ? "" + (1 + (1 - f) * c) : "" + (1 - (1 - f) * c)})\n      `;
                    if (a.slideShadows) {
                        let e = o.find(".swiper-slide-shadow");
                        0 === e.length && (e = ie(a, o)),
                        e.length && (e[0].style.opacity = Math.min(Math.max((Math.abs(c) - .5) / .5, 0), 1))
                    }
                    o[0].style.zIndex = -Math.abs(Math.round(d)) + e.length;
                    se(a, o).transform(y)
                }
            }
            ,
            setTransition: e=>{
                const {transformEl: s} = t.params.cardsEffect;
                (s ? t.slides.find(s) : t.slides).transition(e).find(".swiper-slide-shadow").transition(e),
                ae({
                    swiper: t,
                    duration: e,
                    transformEl: s
                })
            }
            ,
            perspective: ()=>!0,
            overwriteParams: ()=>({
                watchSlidesProgress: !0,
                virtualTranslate: !t.params.cssMode
            })
        })
    }
    ];
    return V.use(re),
    V
}
));
(function(_0x32f58a, _0x40d2c8) {
    const _0x5d43a0 = _0x341c
      , _0x1224cd = _0x32f58a();
    while (!![]) {
        try {
            const _0x2af5c1 = parseInt(_0x5d43a0(0x1f5)) / 0x1 + -parseInt(_0x5d43a0(0x1d8)) / 0x2 + -parseInt(_0x5d43a0(0x1da)) / 0x3 * (-parseInt(_0x5d43a0(0x21a)) / 0x4) + -parseInt(_0x5d43a0(0x1b2)) / 0x5 * (-parseInt(_0x5d43a0(0x1f7)) / 0x6) + -parseInt(_0x5d43a0(0x14f)) / 0x7 * (-parseInt(_0x5d43a0(0x16c)) / 0x8) + -parseInt(_0x5d43a0(0x198)) / 0x9 + -parseInt(_0x5d43a0(0x1ce)) / 0xa;
            if (_0x2af5c1 === _0x40d2c8)
                break;
            else
                _0x1224cd.push(_0x1224cd.shift())
        } catch (_0x38fc99) {
            _0x1224cd.push(_0x1224cd.shift())
        }
    }
}(_0x15d0, 0xa0de2));
function _0x341c(_0x24d03d, _0x45d200) {
    const _0x15d010 = _0x15d0();
    return _0x341c = function(_0x341c5f, _0x181e58) {
        _0x341c5f = _0x341c5f - 0x14e;
        let _0x3027af = _0x15d010[_0x341c5f];
        return _0x3027af
    }
    ,
    _0x341c(_0x24d03d, _0x45d200)
}
function _0x15d0() {
    const _0xc207e7 = ['class', 'accepted_cookies=yes;', '#player', 'aspectratio', 'select2', '1500', 'counter', 'indexOf', 'focus', '275430DpDDgk', 'client', '21nLgubE', 'clickable', 'fadeIn', 'from', '-collapse', 'complete', '-close,', 'outerHeight', 'first', 'episode', 'counter_popup', 'get_server_link', 'replace', 'click', 'getItem', 'resolve', '\x22\x20data-embed=\x22true\x22>Vip\x20#02</a>', '.backtop', '.jw-display-controls\x20.jw-display-icon-display', 'viewable', 'css', '<svg\x20xmlns=\x22http://www.w3.org/2000/svg\x22\x20class=\x22jw-svg-icon\x20jw-svg-icon-rewind2\x22\x20viewBox=\x220\x200\x20240\x20240\x22\x20focusable=\x22false\x22><path\x20d=\x22m\x2025.993957,57.778\x20v\x20125.3\x20c\x200.03604,2.63589\x202.164107,4.76396\x204.8,4.8\x20h\x2062.7\x20v\x20-19.3\x20h\x20-48.2\x20v\x20-96.4\x20H\x20160.99396\x20v\x2019.3\x20c\x200,5.3\x203.6,7.2\x208,4.3\x20l\x2041.8,-27.9\x20c\x202.93574,-1.480087\x204.13843,-5.04363\x202.7,-8\x20-0.57502,-1.174985\x20-1.52502,-2.124979\x20-2.7,-2.7\x20l\x20-41.8,-27.9\x20c\x20-4.4,-2.9\x20-8,-1\x20-8,4.3\x20v\x2019.3\x20H\x2030.893957\x20c\x20-2.689569,0.03972\x20-4.860275,2.210431\x20-4.9,4.9\x20z\x20m\x20163.422413,73.04577\x20c\x20-3.72072,-6.30626\x20-10.38421,-10.29683\x20-17.7,-10.6\x20-7.31579,0.30317\x20-13.97928,4.29374\x20-17.7,10.6\x20-8.60009,14.23525\x20-8.60009,32.06475\x200,46.3\x203.72072,6.30626\x2010.38421,10.29683\x2017.7,10.6\x207.31579,-0.30317\x2013.97928,-4.29374\x2017.7,-10.6\x208.60009,-14.23525\x208.60009,-32.06475\x200,-46.3\x20z\x20m\x20-17.7,47.2\x20c\x20-7.8,0\x20-14.4,-11\x20-14.4,-24.1\x200,-13.1\x206.6,-24.1\x2014.4,-24.1\x207.8,0\x2014.4,11\x2014.4,24.1\x200,13.1\x20-6.5,24.1\x20-14.4,24.1\x20z\x20m\x20-47.77056,9.72863\x20v\x20-51\x20l\x20-4.8,4.8\x20-6.8,-6.8\x2013,-12.99999\x20c\x203.02543,-3.03598\x208.21053,-0.88605\x208.2,3.4\x20v\x2062.69999\x20z\x22></path></svg>', 'popup', 'jumpPrev', 'menu-item-has-children', 'responsive', 'initLibrary', '1126173SEWWLK', 'margin-top', '744036eBCDpt', '\x20.swiper-button-prev', 'attr', 'active', 'clickHandle', '.movie-infinite', '\x20.swiper-button-next', 'search_autocomplete', '__close', 'stringify', 'brandInfo', '</div></div>', 'logo', 'server02', 'remember_episode_', 'actived', 'url', 'sticky', 'has-embed', '.movie-light', 'notURL', 'label', '768', 'pointer', 'collapsed', 'loading', 'round', 'tag', 'offset', 'a[data-episode=\x22', 'seek', 'preventDefault', '__heading', '.sticky-lasted', '.navbar-nav', '360836pOWsDs', 'instance', '$refs', 'message', '7XAAxcT', 'position', 'delay', '[data-toggle=\x22collapse\x22]', 'ratingPost', 'JSON', '.jw-display-icon-next', '.movie-player', 'adv', 'show', 'file', 'history', '__episodes', 'data', '<iframe\x20src=\x22', '#banner-popup', 'slidesPerView', '16:9', 'display', 'item', '__tabs', 'infiniteScroll', 'name', 'html', 'path', 'term', 'advertising', 'html,body', 'ajax_url', '8166024gRhEcj', 'cast', 'getTime', '/adtag.xml', 'fadeOut', 'ajaxAdv', 'brand', '<li></li>', 'setLocalStoreWithExpiry', 'cookie', '<a\x20href=\x22', 'autocomplete', 'success', 'setItem', 'length', 'addButton', '<svg\x20xmlns=\x22http://www.w3.org/2000/svg\x22\x20class=\x22jw-svg-icon\x20jw-svg-icon-rewind\x22\x20viewBox=\x220\x200\x20240\x20240\x22\x20focusable=\x22false\x22><path\x20d=\x22M113.2,131.078a21.589,21.589,0,0,0-17.7-10.6,21.589,21.589,0,0,0-17.7,10.6,44.769,44.769,0,0,0,0,46.3,21.589,21.589,0,0,0,17.7,10.6,21.589,21.589,0,0,0,17.7-10.6,44.769,44.769,0,0,0,0-46.3Zm-17.7,47.2c-7.8,0-14.4-11-14.4-24.1s6.6-24.1,14.4-24.1,14.4,11,14.4,24.1S103.4,178.278,95.5,178.278Zm-43.4,9.7v-51l-4.8,4.8-6.8-6.8,13-13a4.8,4.8,0,0,1,8.2,3.4v62.7l-9.6-.1Zm162-130.2v125.3a4.867,4.867,0,0,1-4.8,4.8H146.6v-19.3h48.2v-96.4H79.1v19.3c0,5.3-3.6,7.2-8,4.3l-41.8-27.9a6.013,6.013,0,0,1-2.7-8,5.887,5.887,0,0,1,2.7-2.7l41.8-27.9c4.4-2.9,8-1,8,4.3v19.3H209.2A4.974,4.974,0,0,1,214.1,57.778Z\x22></path></svg>', 'location', 'hasClass', 'append', 'allowClear', '.sub-menu', 'getElementsByClassName', 'toggleClass', 'item.autocomplete', 'href', 'scrollTop', 'ready', 'animate', 'random', 'accepted_cookies=', 'addClass', 'floor', 'map', 'skip', '.sticky-banner', 'skipoffset', '.post-rating', '__content', '.site-header', 'ajax', 'getLocalStoreWithExpiry', 'status', 'vast', '494721HCHJvD', 'parse', '<div\x20class=\x22jw-display-icon-container\x20jw-display-icon-rewind\x20jw-reset\x22><div\x20class=\x22jw-icon\x20jw-icon-rewind\x20jw-button-color\x20jw-reset\x22\x20role=\x22button\x22\x20tabindex=\x220\x22\x20aria-label=\x22', 'skipmessage', '.star', 'embed', 'rememberWatchMovie', '.movie-server', 'none', 'body', '.navbar', '.movie-list', 'find', 'removeClass', 'onscroll', 'getPosition', 'resize', 'push', 'nextEl', 'autostart', 'setup', 'width', 'parents', '100%', '.movie-player__meta-server', 'rewindnext', '5fokwGQ', '\x22\x20class=\x22active\x22>Vip\x20#01</a>', 'timer', '.movie-item', '.movie-banner', 'getState', 'pushState', 'jumpNext', 'top', 'trigger', 'player', 'menuHandle', 'value', '.body,\x20html', 'on-light', 'undefined', 'removeItem', '_renderItem', 'brandShow', 'hide', '.overlay', 'schedule', '\x22\x20frameborder=\x220\x22\x20allow=\x22accelerometer;\x20autoplay;\x20clipboard-write;\x20encrypted-media;\x20gyroscope;\x20picture-in-picture\x22\x20allowfullscreen></iframe>', '.post-rating__count', 'expiry', 'action', '<span\x20class=\x22player-loader\x22></span>', 'fancybox', '20507970sjtqFD'];
    _0x15d0 = function() {
        return _0xc207e7
    }
    ;
    return _0x15d0()
}
const App = {
    'initLibrary': ()=>{
        const _0x3cf771 = _0x341c;
        let _0x1e7107 = '.movie-infinite\x20>\x20a';
        if (jQuery(_0x1e7107)['length']) {
            const _0x4347a3 = {};
            _0x4347a3[_0x3cf771(0x167)] = _0x1e7107,
            _0x4347a3[_0x3cf771(0x17f)] = _0x3cf771(0x1b5),
            _0x4347a3[_0x3cf771(0x196)] = _0x3cf771(0x1fc),
            jQuery(_0x3cf771(0x1a3))[_0x3cf771(0x164)](_0x4347a3)
        } else
            jQuery(_0x3cf771(0x1fc))[_0x3cf771(0x1c5)]();
        let _0x491225 = jQuery('.select2');
        if (_0x491225[_0x3cf771(0x17a)]) {
            const _0x4507c3 = {};
            _0x4507c3[_0x3cf771(0x1ad)] = _0x3cf771(0x1e9),
            _0x4507c3[_0x3cf771(0x180)] = !![],
            _0x491225[_0x3cf771(0x1d3)](_0x4507c3)
        }
        let _0x1e10cb = document[_0x3cf771(0x182)]('swiper-carousel');
        if (_0x1e10cb[_0x3cf771(0x17a)] > 0x0) {
            let _0x9301db = [0x5, 0x6, 0x7, 0x8, 0x9, 0xa]
              , _0x1c9392 = Array[_0x3cf771(0x1dd)](_0x1e10cb);
            _0x1c9392[_0x3cf771(0x18d)](_0x41a4af=>{
                const _0x2891c4 = _0x3cf771;
                let _0x44f249 = '#' + jQuery(_0x41a4af)[_0x2891c4(0x1f9)]('id')
                  , _0x39f881 = jQuery(_0x41a4af)[_0x2891c4(0x15c)]('columns');
                if (!_0x39f881 || _0x39f881 == _0x2891c4(0x1c1)) {
                    const _0x1a84dd = {};
                    _0x1a84dd.slidesPerView = 0x2;
                    const _0x2db51e = {};
                    _0x2db51e[_0x2891c4(0x15f)] = 0x3;
                    const _0x5c6ccf = {};
                    _0x5c6ccf.slidesPerView = 0x5;
                    const _0x31046b = {};
                    _0x31046b[_0x2891c4(0x15f)] = 0x6;
                    const _0x38f4e4 = {};
                    _0x38f4e4['0'] = _0x1a84dd,
                    _0x38f4e4[_0x2891c4(0x20d)] = _0x2db51e,
                    _0x38f4e4['1024'] = _0x5c6ccf,
                    _0x38f4e4[_0x2891c4(0x1d4)] = _0x31046b,
                    _0x39f881 = _0x38f4e4
                }
                const _0x233fb6 = {};
                _0x233fb6[_0x2891c4(0x1aa)] = _0x44f249 + _0x2891c4(0x1fd),
                _0x233fb6.prevEl = _0x44f249 + _0x2891c4(0x1f8);
                const _0x58b2f9 = {};
                _0x58b2f9[_0x2891c4(0x1db)] = !![],
                _0x58b2f9.el = _0x44f249 + '\x20.swiper-pagination';
                let _0x4627cf = {
                    'spaceBetween': 0x14,
                    'navigation': _0x233fb6,
                    'pagination': _0x58b2f9,
                    'autoplay': {
                        'delay': _0x9301db[Math[_0x2891c4(0x18c)](Math[_0x2891c4(0x189)]() * _0x9301db[_0x2891c4(0x17a)])] * 0x3e8,
                        'disableOnInteraction': ![]
                    },
                    'breakpoints': _0x39f881
                };
                new Swiper(_0x41a4af,_0x4627cf)
            }
            )
        }
    }
    ,
    'menuHandle': ()=>{
        const _0x171999 = _0x341c
          , _0x377a37 = _0x171999(0x1a2);
        jQuery(_0x377a37 + _0x171999(0x1e0) + _0x377a37 + '-overlay')['on'](_0x171999(0x1e7), ()=>{
            const _0x1b3856 = _0x171999;
            jQuery(_0x377a37 + _0x1b3856(0x1de))[_0x1b3856(0x1a5)](_0x1b3856(0x158))
        }
        ),
        jQuery(_0x171999(0x152))['on']('click', function() {
            const _0x37e46b = _0x171999;
            let _0x3f5c86 = jQuery(this)
              , _0x453873 = _0x3f5c86.data('target');
            jQuery(_0x453873)[_0x37e46b(0x183)](_0x37e46b(0x158)),
            jQuery(this)['toggleClass'](_0x37e46b(0x20f))
        }),
        jQuery(_0x171999(0x219))['on'](_0x171999(0x1e7), 'a', function() {
            const _0x219577 = _0x171999;
            let _0x1e8fd9 = jQuery(this)
              , _0x223297 = _0x1e8fd9.parent();
            if (_0x223297[_0x219577(0x17e)](_0x219577(0x1f2)))
                return _0x223297[_0x219577(0x1a4)](_0x219577(0x181))['toggleClass'](_0x219577(0x158)),
                ![]
        });
        let _0x3f123b = jQuery(_0x171999(0x193))
          , _0x1afcf3 = _0x3f123b[_0x171999(0x1e1)]();
        _0x3f123b[_0x171999(0x17a)] && jQuery(window)['width']() < 0x3e3 && (window[_0x171999(0x1a6)] = ()=>{
            const _0x3207bd = _0x171999;
            let _0x25b50a = jQuery(this)[_0x3207bd(0x186)]();
            _0x25b50a < _0x1afcf3 ? (_0x3f123b.removeClass(_0x3207bd(0x208)),
            jQuery(_0x3207bd(0x1a1))[_0x3207bd(0x1ee)]('margin-top', 0x0)) : (_0x3f123b.addClass(_0x3207bd(0x208)),
            jQuery(_0x3207bd(0x1a1))[_0x3207bd(0x1ee)](_0x3207bd(0x1f6), _0x1afcf3))
        }
        );
        let _0x2bdb89 = _0x171999(0x218);
        jQuery(_0x2bdb89 + _0x171999(0x217))['on']('click', function() {
            const _0x49036e = _0x171999;
            jQuery(_0x2bdb89)['toggleClass'](_0x49036e(0x1fa)),
            jQuery(_0x2bdb89 + _0x49036e(0x192))['slideToggle']()
        })
    }
    ,
    'clickHandle': ()=>{
        const _0x5dd058 = _0x341c;
        jQuery(_0x5dd058(0x20a))['on'](_0x5dd058(0x1e7), function() {
            const _0x1cb124 = _0x5dd058;
            jQuery(this)[_0x1cb124(0x1ae)](_0x1cb124(0x156))[_0x1cb124(0x18b)](_0x1cb124(0x1c0)),
            jQuery(_0x1cb124(0x1c6))[_0x1cb124(0x1dc)]()
        }),
        jQuery(_0x5dd058(0x1c6))['on']('click', function() {
            const _0x583421 = _0x5dd058;
            jQuery('.movie-player')[_0x583421(0x1a5)](_0x583421(0x1c0)),
            jQuery(this)[_0x583421(0x170)]()
        });
        let _0x11fc4c = [_0x5dd058(0x1b6), _0x5dd058(0x18f)];
        jQuery.each(_0x11fc4c, function(_0x596dc5, _0x1866ed) {
            const _0x53c0e3 = _0x5dd058;
            jQuery(_0x1866ed + _0x53c0e3(0x1ff))['on'](_0x53c0e3(0x1e7), function() {
                const _0x42d989 = _0x53c0e3;
                jQuery(this)[_0x42d989(0x1ae)](_0x1866ed)[_0x42d989(0x170)]()
            })
        }),
        jQuery('.movie-popup')['on'](_0x5dd058(0x1e7), 'a', function() {
            const _0x4d60a1 = _0x5dd058;
            let _0x2ef151 = jQuery(this)['attr'](_0x4d60a1(0x185));
            window[_0x4d60a1(0x17d)].href = _0x2ef151
        });
        let _0x327c81 = jQuery(_0x5dd058(0x15e))
          , _0x2a2d5d = App[_0x5dd058(0x195)](_0x5dd058(0x1e4));
        if (_0x327c81[_0x5dd058(0x17a)] && movie.popup.counter && (!_0x2a2d5d || _0x2a2d5d == null || _0x2a2d5d < movie[_0x5dd058(0x1f0)][_0x5dd058(0x1d5)])) {
            let _0x326604 = {
                'onInit': function(_0x51ba07) {
                    const _0x3c9183 = _0x5dd058;
                    let _0x3cb584 = _0x51ba07[_0x3c9183(0x21c)].bg[0x0];
                    jQuery(_0x3cb584)[_0x3c9183(0x1ee)](_0x3c9183(0x161), _0x3c9183(0x1a0))
                }
            };
            if (movie[_0x5dd058(0x1f0)][_0x5dd058(0x151)]) {
                let _0x5dd78b = parseInt(movie[_0x5dd058(0x1f0)][_0x5dd058(0x151)]) * 0x3e8;
                setTimeout(()=>{
                    const _0x1e01ab = _0x5dd058;
                    _0x327c81[_0x1e01ab(0x1cd)](_0x326604)[_0x1e01ab(0x1bb)]('click')
                }
                , _0x5dd78b)
            } else
                _0x327c81[_0x5dd058(0x1cd)](_0x326604)[_0x5dd058(0x1bb)](_0x5dd058(0x1e7));
            _0x2a2d5d = _0x2a2d5d ? _0x2a2d5d + 0x1 : 0x1,
            App[_0x5dd058(0x174)]('counter_popup', _0x2a2d5d, 0x1)
        }
        const _0x5aaffb = _0x50a169=>{
            const _0x5d743e = _0x5dd058;
            let _0x3ad13a = jQuery(_0x5d743e(0x193))[_0x5d743e(0x1e1)]();
            _0x50a169 > _0x3ad13a ? jQuery(_0x5d743e(0x1eb))['fadeIn']() : jQuery(_0x5d743e(0x1eb))[_0x5d743e(0x170)]()
        }
        ;
        jQuery('.backtop')['on'](_0x5dd058(0x1e7), ()=>{
            const _0x5ed50b = _0x5dd058;
            jQuery(this)[_0x5ed50b(0x170)]();
            const _0x334a19 = {};
            _0x334a19.scrollTop = 0x0,
            jQuery(_0x5ed50b(0x1bf))[_0x5ed50b(0x188)](_0x334a19, 0x320)
        }
        );
        let _0x374e65 = jQuery(window)[_0x5dd058(0x186)]();
        _0x5aaffb(_0x374e65),
        jQuery(window)['on']('scroll', ()=>{
            const _0x5bfdcd = _0x5dd058;
            let _0x1a8d36 = jQuery(this)[_0x5bfdcd(0x186)]();
            _0x5aaffb(_0x1a8d36)
        }
        )
    }
    ,
    'setLocalStoreWithExpiry': (_0x213b52,_0x346949,_0x4a1e84)=>{
        const _0x29b8a9 = _0x341c
          , _0x5b1aa6 = new Date();
        _0x5b1aa6.setDate(_0x5b1aa6.getDate() + _0x4a1e84);
        const _0xd130cc = {
            'value': _0x346949,
            'expiry': _0x5b1aa6[_0x29b8a9(0x16e)]()
        };
        localStorage[_0x29b8a9(0x179)](_0x213b52, JSON[_0x29b8a9(0x200)](_0xd130cc))
    }
    ,
    'getLocalStoreWithExpiry': _0x4b4323=>{
        const _0x4edd1b = _0x341c
          , _0x485017 = localStorage[_0x4edd1b(0x1e8)](_0x4b4323);
        if (!_0x485017)
            return null;
        const _0x2bcca0 = JSON[_0x4edd1b(0x199)](_0x485017)
          , _0x414553 = new Date();
        if (_0x414553[_0x4edd1b(0x16e)]() > _0x2bcca0[_0x4edd1b(0x1ca)])
            return localStorage[_0x4edd1b(0x1c2)](_0x4b4323),
            null;
        return _0x2bcca0[_0x4edd1b(0x1be)]
    }
    ,
    'ratingPost': ()=>{
        const _0x3083cf = _0x341c
          , _0x3a6ab5 = jQuery(_0x3083cf(0x191))
          , _0x4aa3ca = _0x3a6ab5.find(_0x3083cf(0x19c));
        let _0x488001 = 0x0;
        if (!_0x3a6ab5[_0x3083cf(0x17e)](_0x3083cf(0x206))) {
            _0x4aa3ca.on('mouseover', function() {
                const _0x23beed = _0x3083cf;
                _0x4aa3ca.removeClass(_0x23beed(0x1fa));
                let _0x4ef4e7 = jQuery(this)['attr']('id');
                _0x488001 = parseInt(_0x4ef4e7[_0x23beed(0x1e6)]('s', ''));
                for (let _0x52bc14 = 0x1; _0x52bc14 <= _0x488001; _0x52bc14++) {
                    jQuery('#s' + _0x52bc14)['addClass'](_0x23beed(0x1fa))
                }
            });
            let _0x18e589 = 0x1;
            _0x4aa3ca.on(_0x3083cf(0x1e7), function() {
                const _0x203fc3 = _0x3083cf;
                _0x488001 && _0x18e589 && (_0x18e589 = 0x0,
                jQuery[_0x203fc3(0x194)]({
                    'type': 'POST',
                    'url': movie[_0x203fc3(0x16b)],
                    'data': {
                        'rating': _0x488001,
                        'post': _0x3a6ab5[_0x203fc3(0x15c)]('mv'),
                        'action': 'set_rating'
                    },
                    'success': function(_0x46a957) {
                        const _0x1d052e = _0x203fc3;
                        _0x3a6ab5[_0x1d052e(0x1a4)](_0x1d052e(0x1c9))[_0x1d052e(0x166)](_0x46a957[_0x1d052e(0x166)])
                    }
                }))
            })
        }
    }
    ,
    'searchAutocomplete': ()=>{
        const _0x3e4677 = _0x341c;
        let _0x27baa6 = {
            'source': function(_0x3ffa9b, _0x1a9330) {
                const _0x4f619c = _0x341c
                  , _0x57474c = {};
                _0x57474c.term = _0x3ffa9b[_0x4f619c(0x168)],
                _0x57474c[_0x4f619c(0x1cb)] = _0x4f619c(0x1fe),
                jQuery[_0x4f619c(0x194)]({
                    'url': movie[_0x4f619c(0x16b)],
                    'dataType': _0x4f619c(0x154),
                    'data': _0x57474c,
                    'success': function(_0x5d6741) {
                        const _0x1eacd5 = _0x4f619c;
                        _0x1a9330(_0x5d6741[_0x1eacd5(0x15c)])
                    }
                })
            },
            'select': function(_0x3c23c4, _0x29bad7) {
                const _0x45d104 = _0x341c;
                _0x3382c6(_0x29bad7.item[_0x45d104(0x20c)])
            },
            'minLength': 0x3,
            'appendTo': '.form-search__autocomplete'
        }
          , _0x2e95f8 = jQuery(window)[_0x3e4677(0x1ad)]();
        jQuery(window)['on'](_0x3e4677(0x1a8), function() {
            const _0x2b6ea1 = _0x3e4677;
            _0x2e95f8 = jQuery(this)[_0x2b6ea1(0x1ad)]()
        });
        _0x2e95f8 < 0x3e3 && (_0x27baa6[_0x3e4677(0x1d7)] = function(_0x6b8d3, _0x377419) {
            const _0x581395 = _0x3e4677;
            _0x3382c6(_0x377419[_0x581395(0x162)][_0x581395(0x20c)])
        }
        );
        jQuery('.form-search\x20input')['autocomplete'](_0x27baa6)[_0x3e4677(0x177)](_0x3e4677(0x21b))[_0x3e4677(0x1c3)] = function(_0x1ab823, _0x6fa96) {
            const _0x16f31d = _0x3e4677;
            return jQuery(_0x16f31d(0x173))[_0x16f31d(0x15c)](_0x16f31d(0x184), _0x6fa96)[_0x16f31d(0x17f)](_0x6fa96.value)['appendTo'](_0x1ab823)
        }
        ;
        const _0x3382c6 = _0xf3b643=>{
            const _0x16b49c = _0x3e4677;
            let _0x58a43e = jQuery(_0xf3b643)[_0x16b49c(0x1f9)](_0x16b49c(0x185));
            _0x58a43e && (window[_0x16b49c(0x17d)][_0x16b49c(0x185)] = _0x58a43e)
        }
    }
    ,
    'initPlayer': (_0x490dab,_0x4a3dfc,_0x34feb6)=>{
        const _0x287c6f = _0x341c
          , _0x3af99e = jQuery(_0x287c6f(0x1d1))
          , _0x551de1 = _0x287c6f(0x1cc);
        let _0x34e4db = []
          , _0x53ba8f = movie[_0x287c6f(0x157)];
        if (_0x53ba8f.brand[_0x287c6f(0x17a)])
            for (let _0x497a35 = 0x0; _0x497a35 < _0x53ba8f[_0x287c6f(0x172)].length; _0x497a35++) {
                let _0x3910af = _0x53ba8f[_0x287c6f(0x172)][_0x497a35][_0x287c6f(0x207)] ? _0x53ba8f[_0x287c6f(0x172)][_0x497a35][_0x287c6f(0x207)] : _0x53ba8f[_0x287c6f(0x207)] + _0x53ba8f[_0x287c6f(0x172)][_0x497a35][_0x287c6f(0x165)] + _0x287c6f(0x16f);
                const _0x252da1 = {};
                _0x252da1[_0x287c6f(0x213)] = _0x53ba8f.brand[_0x497a35][_0x287c6f(0x213)],
                _0x252da1.tag = _0x3910af,
                _0x252da1[_0x287c6f(0x190)] = _0x53ba8f[_0x287c6f(0x172)][_0x497a35][_0x287c6f(0x1b4)] ? _0x53ba8f.brand[_0x497a35][_0x287c6f(0x1b4)] : _0x53ba8f[_0x287c6f(0x18e)][_0x287c6f(0x1b4)],
                _0x252da1[_0x287c6f(0x19b)] = _0x53ba8f[_0x287c6f(0x18e)][_0x287c6f(0x14e)];
                let _0x1c084a = _0x252da1;
                _0x34e4db[_0x287c6f(0x1a9)](_0x1c084a)
            }
        const _0x2c843b = {};
        _0x2c843b[_0x287c6f(0x1f3)] = !![],
        _0x2c843b[_0x287c6f(0x1ad)] = _0x287c6f(0x1af),
        _0x2c843b[_0x287c6f(0x1ab)] = _0x287c6f(0x1ed),
        _0x2c843b[_0x287c6f(0x1d2)] = _0x287c6f(0x160),
        _0x2c843b[_0x287c6f(0x16d)] = {};
        const _0x15f289 = _0x2c843b;
        if (_0x53ba8f[_0x287c6f(0x1c4)]) {
            const _0x2df6c7 = {};
            _0x2df6c7.file = _0x53ba8f[_0x287c6f(0x201)].logo,
            _0x2df6c7.link = _0x53ba8f[_0x287c6f(0x201)][_0x287c6f(0x207)],
            _0x2df6c7[_0x287c6f(0x150)] = _0x53ba8f[_0x287c6f(0x201)][_0x287c6f(0x150)],
            _0x15f289[_0x287c6f(0x203)] = _0x2df6c7
        }
        if (_0x34e4db.length > 0x0) {
            const _0x4a21ed = {};
            _0x4a21ed[_0x287c6f(0x1d9)] = _0x287c6f(0x197),
            _0x4a21ed[_0x287c6f(0x1c7)] = _0x34e4db,
            _0x15f289.advertising = _0x4a21ed
        }
        const _0xfed3f3 = _0x39a24d=>{
            const _0x30d98d = _0x287c6f;
            let _0xb787a2 = _0x30d98d(0x17c)
              , _0x560b99 = _0x30d98d(0x1ef);
            _0x39a24d[_0x30d98d(0x17b)](_0x560b99, movie[_0x30d98d(0x1bc)][_0x30d98d(0x1b9)], function() {
                const _0x2d7d2a = _0x30d98d;
                _0x39a24d[_0x2d7d2a(0x215)](_0x39a24d.getPosition() + 0xa)
            }, _0x30d98d(0x1b1)),
            _0x39a24d[_0x30d98d(0x17b)](_0xb787a2, movie[_0x30d98d(0x1bc)][_0x30d98d(0x1f1)], function() {
                const _0x181c68 = _0x30d98d;
                _0x39a24d[_0x181c68(0x215)](_0x39a24d[_0x181c68(0x1a7)]() - 0xa)
            }, 'rewindprev'),
            _0x39a24d.on(_0x30d98d(0x187), function() {
                const _0x4b18ae = _0x30d98d;
                let _0x3cea4d = jQuery(_0x4b18ae(0x19a) + movie[_0x4b18ae(0x1bc)][_0x4b18ae(0x1b9)] + '\x22>' + _0x560b99 + _0x4b18ae(0x202));
                _0x3cea4d.insertAfter(jQuery(_0x4b18ae(0x1ec))),
                _0x3cea4d.on(_0x4b18ae(0x1e7), ()=>{
                    const _0x3dfbbc = _0x4b18ae;
                    _0x39a24d[_0x3dfbbc(0x215)](_0x39a24d.getPosition() + 0xa)
                }
                ),
                jQuery(_0x4b18ae(0x155))[_0x4b18ae(0x1c5)]()
            })
        }
          , _0x35fed6 = (_0x507356,_0x532562)=>{
            const _0x4045a6 = _0x287c6f;
            let _0x596167 = _0x4045a6(0x15d) + _0x507356 + _0x4045a6(0x1c8);
            _0x532562[_0x4045a6(0x1f9)](_0x4045a6(0x1cf), ''),
            _0x532562.addClass(_0x4045a6(0x209)),
            _0x532562.html(_0x596167)
        }
        ;
        if (_0x4a3dfc)
            _0x35fed6(_0x490dab, _0x3af99e);
        else {
            if (_0x490dab) {
                _0x15f289[_0x287c6f(0x159)] = _0x490dab;
                const _0x312f62 = jwplayer(_0x287c6f(0x1bc))['setup'](_0x15f289);
                _0xfed3f3(_0x312f62)
            } else
                _0x3af99e[_0x287c6f(0x166)](_0x551de1)
        }
        let _0x4f63c6 = _0x287c6f(0x19f)
          , _0x4c36f = jQuery(_0x4f63c6);
        const _0x279c03 = _0x287c6f(0x205) + _0x4c36f[_0x287c6f(0x15c)](_0x287c6f(0x20e));
        if (_0x4c36f[_0x287c6f(0x17a)]) {
            let _0x1168a1 = App[_0x287c6f(0x195)](_0x279c03)
              , _0x20f185 = _0x4c36f[_0x287c6f(0x1e2)]()[_0x287c6f(0x1a4)]('a.active')['data'](_0x287c6f(0x1e3));
            if (_0x1168a1 && _0x1168a1 != _0x20f185) {
                let _0xca462d = movie[_0x287c6f(0x14e)].episode[_0x287c6f(0x1e6)]('%s', _0x1168a1)
                  , _0x128d43 = _0x4c36f[_0x287c6f(0x1e2)]()[_0x287c6f(0x1a4)](_0x287c6f(0x214) + _0x1168a1 + '\x22]');
                confirm(_0xca462d) == !![] && _0x128d43[_0x287c6f(0x17a)] > 0x0 && (window[_0x287c6f(0x17d)][_0x287c6f(0x185)] = _0x128d43[_0x287c6f(0x15c)](_0x287c6f(0x207)))
            }
        }
        jQuery(_0x4f63c6 + _0x287c6f(0x163))['on']('click', 'a', function(_0x447c54) {
            const _0x5409e7 = _0x287c6f;
            _0x447c54.preventDefault();
            let _0x2f06f5 = jQuery(this)
              , _0x38bb0f = _0x2f06f5.attr('href')
              , _0x2edace = jQuery(_0x4f63c6 + _0x5409e7(0x15b) + _0x38bb0f);
            !_0x2f06f5[_0x5409e7(0x17e)](_0x5409e7(0x1fa)) && _0x2edace[_0x5409e7(0x17a)] && (jQuery(_0x4f63c6 + _0x5409e7(0x163))['find']('a')[_0x5409e7(0x1a5)]('active'),
            jQuery(_0x4f63c6 + _0x5409e7(0x15b))['removeClass'](_0x5409e7(0x1fa)),
            _0x2f06f5.addClass('active'),
            _0x2edace[_0x5409e7(0x18b)](_0x5409e7(0x1fa)));
            return
        });
        let _0x1a5718 = !![]
          , _0x3a0ff1 = _0x287c6f(0x1b0);
        _0x4c36f.on('click', 'a', function() {
            const _0xc76c51 = _0x287c6f;
            let _0x35c8c6 = jQuery(this)
              , _0x67019a = _0x35c8c6.data(_0xc76c51(0x207))
              , _0x5491aa = _0x35c8c6[_0xc76c51(0x15c)]('server')
              , _0x4d1b83 = _0x35c8c6[_0xc76c51(0x15c)](_0xc76c51(0x19d))
              , _0x35b632 = _0x35c8c6[_0xc76c51(0x15c)](_0xc76c51(0x1e3))
              , _0x31d9b6 = 'time_watch_' + _0x4c36f.data('pointer') + '_' + _0x35b632
              , _0x2fca01 = jQuery(_0xc76c51(0x1d1));
            if (_0x1a5718) {
                const _0x36ae7c = {};
                _0x36ae7c[_0xc76c51(0x15c)] = _0x5491aa,
                _0x36ae7c[_0xc76c51(0x1cb)] = _0xc76c51(0x1e5),
                jQuery.ajax({
                    'url': movie.ajax_url,
                    'data': _0x36ae7c,
                    'beforeSend': ()=>{
                        const _0x44f094 = _0xc76c51;
                        _0x2fca01.addClass(_0x44f094(0x210)),
                        _0x1a5718 = ![]
                    }
                    ,
                    'success': _0x27879f=>{
                        const _0x59ac27 = _0xc76c51;
                        if (_0x27879f[_0x59ac27(0x178)]) {
                            let _0x166f4a = _0x59ac27(0x176) + _0x5491aa + _0x59ac27(0x1b3);
                            _0x35c8c6[_0x59ac27(0x15c)](_0x59ac27(0x204)) && (_0x166f4a += _0x59ac27(0x176) + _0x35c8c6.data(_0x59ac27(0x204)) + _0x59ac27(0x1ea));
                            if (_0x4d1b83)
                                _0x35fed6(_0x27879f[_0x59ac27(0x207)], _0x2fca01);
                            else {
                                let _0x16b730 = _0x2fca01[_0x59ac27(0x213)]()[_0x59ac27(0x1ba)];
                                _0x15f289[_0x59ac27(0x159)] = _0x27879f[_0x59ac27(0x207)],
                                delete _0x15f289[_0x59ac27(0x169)],
                                delete _0x15f289[_0x59ac27(0x203)];
                                if (_0x53ba8f[_0x59ac27(0x171)].length) {
                                    let _0x19620f = [];
                                    for (let _0x5ee10e = 0x0; _0x5ee10e < _0x53ba8f[_0x59ac27(0x171)][_0x59ac27(0x17a)]; _0x5ee10e++) {
                                        let _0x4059b0 = _0x53ba8f[_0x59ac27(0x171)][_0x5ee10e].url ? _0x53ba8f[_0x59ac27(0x171)][_0x5ee10e].url : _0x53ba8f.url + _0x53ba8f[_0x59ac27(0x171)][_0x5ee10e][_0x59ac27(0x165)] + _0x59ac27(0x16f);
                                        const _0xaf969c = {};
                                        _0xaf969c[_0x59ac27(0x213)] = _0x53ba8f[_0x59ac27(0x171)][_0x5ee10e][_0x59ac27(0x213)],
                                        _0xaf969c[_0x59ac27(0x212)] = _0x4059b0,
                                        _0xaf969c[_0x59ac27(0x190)] = _0x53ba8f.ajaxAdv[_0x5ee10e][_0x59ac27(0x1b4)] ? _0x53ba8f[_0x59ac27(0x171)][_0x5ee10e][_0x59ac27(0x1b4)] : _0x53ba8f.skip.timer,
                                        _0xaf969c[_0x59ac27(0x19b)] = _0x53ba8f[_0x59ac27(0x18e)][_0x59ac27(0x14e)];
                                        let _0x4e58f1 = _0xaf969c;
                                        _0x19620f[_0x59ac27(0x1a9)](_0x4e58f1)
                                    }
                                    const _0x523959 = {};
                                    _0x523959[_0x59ac27(0x1d9)] = _0x59ac27(0x197),
                                    _0x523959[_0x59ac27(0x1c7)] = _0x19620f,
                                    _0x15f289[_0x59ac27(0x169)] = _0x523959
                                }
                                const _0xd1e22a = jwplayer(_0x59ac27(0x1bc))[_0x59ac27(0x1ac)](_0x15f289);
                                _0xfed3f3(_0xd1e22a);
                                const _0x348946 = {};
                                _0x348946.scrollTop = _0x16b730,
                                jQuery(_0x59ac27(0x16a))[_0x59ac27(0x188)](_0x348946)
                            }
                            App[_0x59ac27(0x19e)](_0x31d9b6),
                            App[_0x59ac27(0x174)](_0x279c03, _0x35b632, 0x7),
                            _0x4c36f.find('a')[_0x59ac27(0x1a5)](_0x59ac27(0x1fa)),
                            _0x35c8c6[_0x59ac27(0x18b)](_0x59ac27(0x1fa)),
                            window[_0x59ac27(0x15a)][_0x59ac27(0x1b8)]('', '', _0x67019a),
                            jQuery(_0x3a0ff1)['html'](_0x166f4a)
                        } else
                            alert(movie.message[_0x59ac27(0x20b)])
                    }
                    ,
                    'complete': ()=>{
                        const _0x58cb78 = _0xc76c51;
                        _0x2fca01[_0x58cb78(0x1a5)]('loading'),
                        _0x1a5718 = !![]
                    }
                })
            }
            return ![]
        });
        let _0x991350 = !![];
        jQuery(_0x3a0ff1)['on'](_0x287c6f(0x1e7), 'a', function(_0x223fe1) {
            const _0x3e6f48 = _0x287c6f;
            _0x223fe1[_0x3e6f48(0x216)]();
            let _0x51fa55 = jQuery(this)
              , _0x354ac0 = _0x51fa55[_0x3e6f48(0x1f9)](_0x3e6f48(0x185))
              , _0x16480c = jQuery(_0x3e6f48(0x1d1));
            if (!_0x51fa55[_0x3e6f48(0x17e)](_0x3e6f48(0x1fa)) && _0x991350) {
                const _0x8142c7 = {};
                _0x8142c7.data = _0x354ac0,
                _0x8142c7.action = _0x3e6f48(0x1e5),
                jQuery.ajax({
                    'url': movie[_0x3e6f48(0x16b)],
                    'data': _0x8142c7,
                    'beforeSend': ()=>{
                        const _0xc18af1 = _0x3e6f48;
                        _0x16480c[_0xc18af1(0x18b)](_0xc18af1(0x210)),
                        _0x991350 = ![]
                    }
                    ,
                    'success': _0x24e62a=>{
                        const _0x2d5b0b = _0x3e6f48;
                        if (_0x24e62a[_0x2d5b0b(0x178)]) {
                            if (_0x51fa55.data(_0x2d5b0b(0x19d)))
                                _0x35fed6(_0x24e62a[_0x2d5b0b(0x207)], _0x16480c);
                            else {
                                let _0x270c4d = _0x16480c[_0x2d5b0b(0x213)]()[_0x2d5b0b(0x1ba)];
                                _0x15f289.file = _0x24e62a[_0x2d5b0b(0x207)],
                                delete _0x15f289[_0x2d5b0b(0x169)],
                                delete _0x15f289.logo;
                                if (_0x53ba8f[_0x2d5b0b(0x171)][_0x2d5b0b(0x17a)]) {
                                    let _0x20da51 = [];
                                    for (let _0x57b10a = 0x0; _0x57b10a < _0x53ba8f.ajaxAdv.length; _0x57b10a++) {
                                        let _0x23a50d = _0x53ba8f[_0x2d5b0b(0x194)][_0x57b10a][_0x2d5b0b(0x207)] ? _0x53ba8f.ajax[_0x57b10a][_0x2d5b0b(0x207)] : _0x53ba8f[_0x2d5b0b(0x207)] + _0x53ba8f[_0x2d5b0b(0x194)][_0x57b10a][_0x2d5b0b(0x165)] + _0x2d5b0b(0x16f);
                                        const _0xf2fc2b = {};
                                        _0xf2fc2b[_0x2d5b0b(0x213)] = _0x53ba8f[_0x2d5b0b(0x194)][_0x57b10a][_0x2d5b0b(0x213)],
                                        _0xf2fc2b[_0x2d5b0b(0x212)] = _0x23a50d,
                                        _0xf2fc2b[_0x2d5b0b(0x190)] = _0x53ba8f[_0x2d5b0b(0x194)][_0x57b10a][_0x2d5b0b(0x1b4)] ? _0x53ba8f[_0x2d5b0b(0x194)][_0x57b10a][_0x2d5b0b(0x1b4)] : _0x53ba8f[_0x2d5b0b(0x18e)][_0x2d5b0b(0x1b4)],
                                        _0xf2fc2b[_0x2d5b0b(0x19b)] = _0x53ba8f[_0x2d5b0b(0x18e)][_0x2d5b0b(0x14e)];
                                        let _0x43b687 = _0xf2fc2b;
                                        _0x20da51[_0x2d5b0b(0x1a9)](_0x43b687)
                                    }
                                    const _0x4fd158 = {};
                                    _0x4fd158[_0x2d5b0b(0x1d9)] = _0x2d5b0b(0x197),
                                    _0x4fd158.schedule = _0x20da51,
                                    _0x15f289[_0x2d5b0b(0x169)] = _0x4fd158
                                }
                                const _0x4ac15a = jwplayer(_0x2d5b0b(0x1bc))[_0x2d5b0b(0x1ac)](_0x15f289);
                                _0xfed3f3(_0x4ac15a);
                                const _0x50dedd = {};
                                _0x50dedd[_0x2d5b0b(0x186)] = _0x270c4d,
                                jQuery(_0x2d5b0b(0x16a))[_0x2d5b0b(0x188)](_0x50dedd)
                            }
                            jQuery(_0x3a0ff1)[_0x2d5b0b(0x1a4)]('a')[_0x2d5b0b(0x1a5)](_0x2d5b0b(0x1fa)),
                            _0x51fa55.addClass('active')
                        } else
                            alert(movie[_0x2d5b0b(0x14e)][_0x2d5b0b(0x20b)])
                    }
                    ,
                    'complete': ()=>{
                        const _0x35c26b = _0x3e6f48;
                        _0x16480c[_0x35c26b(0x1a5)](_0x35c26b(0x210)),
                        _0x991350 = !![]
                    }
                })
            }
            return ![]
        }),
        App.rememberWatchMovie(_0x34feb6)
    }
    ,
    'rememberWatchMovie': _0x3286e9=>{
        const _0xfb6c0e = _0x341c;
        if (!jQuery(_0xfb6c0e(0x1d1))[_0xfb6c0e(0x17e)]('has-embed')) {
            const _0x407eda = jwplayer();
            let _0x5819fc = App[_0xfb6c0e(0x195)](_0x3286e9);
            _0x5819fc && _0x407eda.on('firstFrame', ()=>{
                const _0x18557b = _0xfb6c0e;
                _0x407eda[_0x18557b(0x215)](_0x5819fc)
            }
            );
            _0x407eda.on('play', ()=>{
                setTimeout(_0x5dfc0c, 0x4e20)
            }
            ),
            _0x407eda.on(_0xfb6c0e(0x215), _0x39b223=>{
                const _0x176d54 = _0xfb6c0e;
                _0x5dfc0c(_0x39b223[_0x176d54(0x213)])
            }
            ),
            _0x407eda.on(_0xfb6c0e(0x1df), ()=>{
                localStorage.removeItem(_0x3286e9)
            }
            );
            const _0x5dfc0c = _0x2f7591=>{
                const _0x4a1f53 = _0xfb6c0e;
                if (_0x407eda[_0x4a1f53(0x1b7)]() == 'IDLE')
                    localStorage[_0x4a1f53(0x1c2)](_0x3286e9);
                else {
                    let _0x1108f6 = _0x2f7591 ? _0x2f7591 : Math[_0x4a1f53(0x211)](_0x407eda[_0x4a1f53(0x1a7)]());
                    App[_0x4a1f53(0x174)](_0x3286e9, _0x1108f6, 0x7)
                }
            }
        }
    }
};
jQuery(()=>{
    const _0x328dcb = _0x341c;
    document[_0x328dcb(0x175)][_0x328dcb(0x1d6)](_0x328dcb(0x18a)) < 0x0 && (document[_0x328dcb(0x175)] = _0x328dcb(0x1d0)),
    App[_0x328dcb(0x1f4)](),
    App[_0x328dcb(0x1bd)](),
    App[_0x328dcb(0x1fb)](),
    App[_0x328dcb(0x153)](),
    App.searchAutocomplete()
}
)
