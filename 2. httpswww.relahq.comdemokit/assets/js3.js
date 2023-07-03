typeof navigator === "object" &&
  (function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
      ? (module.exports = factory())
      : typeof define === "function" && define.amd
      ? define("Plyr", factory)
      : ((global = global || self), (global.Plyr = factory()));
  })(this, function () {
    "use strict";

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _slicedToArray(arr, i) {
      return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _nonIterableRest()
      );
    }

    function _toConsumableArray(arr) {
      return (
        _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
      );
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
          arr2[i] = arr[i];

        return arr2;
      }
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArray(iter) {
      if (
        Symbol.iterator in Object(iter) ||
        Object.prototype.toString.call(iter) === "[object Arguments]"
      )
        return Array.from(iter);
    }

    function _iterableToArrayLimit(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (
          var _i = arr[Symbol.iterator](), _s;
          !(_n = (_s = _i.next()).done);
          _n = true
        ) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }

    function _nonIterableRest() {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }

    var defaults = {
      addCSS: true,
      // Add CSS to the element to improve usability (required here or in your CSS!)
      thumbWidth: 15,
      // The width of the thumb handle
      watch: true, // Watch for new elements that match a string target
    };

    // Element matches a selector
    function matches(element, selector) {
      function match() {
        return Array.from(document.querySelectorAll(selector)).includes(this);
      }

      var matches = match;
      return matches.call(element, selector);
    }

    // Trigger event
    function trigger(element, type) {
      if (!element || !type) {
        return;
      } // Create and dispatch the event

      var event = new Event(type); // Dispatch the event

      element.dispatchEvent(event);
    }

    // ==========================================================================
    // Type checking utils
    // ==========================================================================
    var getConstructor = function getConstructor(input) {
      return input !== null && typeof input !== "undefined"
        ? input.constructor
        : null;
    };

    var instanceOf = function instanceOf(input, constructor) {
      return Boolean(input && constructor && input instanceof constructor);
    };

    var isNullOrUndefined = function isNullOrUndefined(input) {
      return input === null || typeof input === "undefined";
    };

    var isObject = function isObject(input) {
      return getConstructor(input) === Object;
    };

    var isNumber = function isNumber(input) {
      return getConstructor(input) === Number && !Number.isNaN(input);
    };

    var isString = function isString(input) {
      return getConstructor(input) === String;
    };

    var isBoolean = function isBoolean(input) {
      return getConstructor(input) === Boolean;
    };

    var isFunction = function isFunction(input) {
      return getConstructor(input) === Function;
    };

    var isArray = function isArray(input) {
      return Array.isArray(input);
    };

    var isNodeList = function isNodeList(input) {
      return instanceOf(input, NodeList);
    };

    var isElement = function isElement(input) {
      return instanceOf(input, Element);
    };

    var isEvent = function isEvent(input) {
      return instanceOf(input, Event);
    };

    var isEmpty = function isEmpty(input) {
      return (
        isNullOrUndefined(input) ||
        ((isString(input) || isArray(input) || isNodeList(input)) &&
          !input.length) ||
        (isObject(input) && !Object.keys(input).length)
      );
    };

    var is = {
      nullOrUndefined: isNullOrUndefined,
      object: isObject,
      number: isNumber,
      string: isString,
      boolean: isBoolean,
      function: isFunction,
      array: isArray,
      nodeList: isNodeList,
      element: isElement,
      event: isEvent,
      empty: isEmpty,
    };

    // Get the number of decimal places
    function getDecimalPlaces(value) {
      var match = "".concat(value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

      if (!match) {
        return 0;
      }

      return Math.max(
        0, // Number of digits right of decimal point.
        (match[1] ? match[1].length : 0) - // Adjust for scientific notation.
          (match[2] ? +match[2] : 0)
      );
    } // Round to the nearest step

    function round(number, step) {
      if (step < 1) {
        var places = getDecimalPlaces(step);
        return parseFloat(number.toFixed(places));
      }

      return Math.round(number / step) * step;
    }

    var RangeTouch =
      /*#__PURE__*/
      (function () {
        /**
         * Setup a new instance
         * @param {String|Element} target
         * @param {Object} options
         */
        function RangeTouch(target, options) {
          _classCallCheck(this, RangeTouch);

          if (is.element(target)) {
            // An Element is passed, use it directly
            this.element = target;
          } else if (is.string(target)) {
            // A CSS Selector is passed, fetch it from the DOM
            this.element = document.querySelector(target);
          }

          if (!is.element(this.element) || !is.empty(this.element.rangeTouch)) {
            return;
          }

          this.config = Object.assign({}, defaults, options);
          this.init();
        }

        _createClass(
          RangeTouch,
          [
            {
              key: "init",
              value: function init() {
                // Bail if not a touch enabled device
                if (!RangeTouch.enabled) {
                  return;
                } // Add useful CSS

                if (this.config.addCSS) {
                  // TODO: Restore original values on destroy
                  this.element.style.userSelect = "none";
                  this.element.style.webKitUserSelect = "none";
                  this.element.style.touchAction = "manipulation";
                }

                this.listeners(true);
                this.element.rangeTouch = this;
              },
            },
            {
              key: "destroy",
              value: function destroy() {
                // Bail if not a touch enabled device
                if (!RangeTouch.enabled) {
                  return;
                }

                this.listeners(false);
                this.element.rangeTouch = null;
              },
            },
            {
              key: "listeners",
              value: function listeners(toggle) {
                var _this = this;

                var method = toggle
                  ? "addEventListener"
                  : "removeEventListener"; // Listen for events

                ["touchstart", "touchmove", "touchend"].forEach(function (
                  type
                ) {
                  _this.element[method](
                    type,
                    function (event) {
                      return _this.set(event);
                    },
                    false
                  );
                });
              },
              /**
               * Get the value based on touch position
               * @param {Event} event
               */
            },
            {
              key: "get",
              value: function get(event) {
                if (!RangeTouch.enabled || !is.event(event)) {
                  return null;
                }

                var input = event.target;
                var touch = event.changedTouches[0];
                var min = parseFloat(input.getAttribute("min")) || 0;
                var max = parseFloat(input.getAttribute("max")) || 100;
                var step = parseFloat(input.getAttribute("step")) || 1;
                var delta = max - min; // Calculate percentage

                var percent;
                var clientRect = input.getBoundingClientRect();
                var thumbWidth =
                  ((100 / clientRect.width) * (this.config.thumbWidth / 2)) /
                  100; // Determine left percentage

                percent =
                  (100 / clientRect.width) * (touch.clientX - clientRect.left); // Don't allow outside bounds

                if (percent < 0) {
                  percent = 0;
                } else if (percent > 100) {
                  percent = 100;
                } // Factor in the thumb offset

                if (percent < 50) {
                  percent -= (100 - percent * 2) * thumbWidth;
                } else if (percent > 50) {
                  percent += (percent - 50) * 2 * thumbWidth;
                } // Find the closest step to the mouse position

                return min + round(delta * (percent / 100), step);
              },
              /**
               * Update range value based on position
               * @param {Event} event
               */
            },
            {
              key: "set",
              value: function set(event) {
                if (
                  !RangeTouch.enabled ||
                  !is.event(event) ||
                  event.target.disabled
                ) {
                  return;
                } // Prevent text highlight on iOS

                event.preventDefault(); // Set value

                event.target.value = this.get(event); // Trigger event

                trigger(
                  event.target,
                  event.type === "touchend" ? "change" : "input"
                );
              },
            },
          ],
          [
            {
              key: "setup",

              /**
               * Setup multiple instances
               * @param {String|Element|NodeList|Array} target
               * @param {Object} options
               */
              value: function setup(target) {
                var options =
                  arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {};
                var targets = null;

                if (is.empty(target) || is.string(target)) {
                  targets = Array.from(
                    document.querySelectorAll(
                      is.string(target) ? target : 'input[type="range"]'
                    )
                  );
                } else if (is.element(target)) {
                  targets = [target];
                } else if (is.nodeList(target)) {
                  targets = Array.from(target);
                } else if (is.array(target)) {
                  targets = target.filter(is.element);
                }

                if (is.empty(targets)) {
                  return null;
                }

                var config = Object.assign({}, defaults, options);

                if (is.string(target) && config.watch) {
                  // Create an observer instance
                  var observer = new MutationObserver(function (mutations) {
                    Array.from(mutations).forEach(function (mutation) {
                      Array.from(mutation.addedNodes).forEach(function (node) {
                        if (!is.element(node) || !matches(node, target)) {
                          return;
                        } // eslint-disable-next-line no-unused-vars

                        var range = new RangeTouch(node, config);
                      });
                    });
                  }); // Pass in the target node, as well as the observer options

                  observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                  });
                }

                return targets.map(function (t) {
                  return new RangeTouch(t, options);
                });
              },
            },
            {
              key: "enabled",
              get: function get() {
                return "ontouchstart" in document.documentElement;
              },
            },
          ]
        );

        return RangeTouch;
      })();

    // ==========================================================================
    // Type checking utils
    // ==========================================================================
    var getConstructor$1 = function getConstructor(input) {
      return input !== null && typeof input !== "undefined"
        ? input.constructor
        : null;
    };

    var instanceOf$1 = function instanceOf(input, constructor) {
      return Boolean(input && constructor && input instanceof constructor);
    };

    var isNullOrUndefined$1 = function isNullOrUndefined(input) {
      return input === null || typeof input === "undefined";
    };

    var isObject$1 = function isObject(input) {
      return getConstructor$1(input) === Object;
    };

    var isNumber$1 = function isNumber(input) {
      return getConstructor$1(input) === Number && !Number.isNaN(input);
    };

    var isString$1 = function isString(input) {
      return getConstructor$1(input) === String;
    };

    var isBoolean$1 = function isBoolean(input) {
      return getConstructor$1(input) === Boolean;
    };

    var isFunction$1 = function isFunction(input) {
      return getConstructor$1(input) === Function;
    };

    var isArray$1 = function isArray(input) {
      return Array.isArray(input);
    };

    var isWeakMap = function isWeakMap(input) {
      return instanceOf$1(input, WeakMap);
    };

    var isNodeList$1 = function isNodeList(input) {
      return instanceOf$1(input, NodeList);
    };

    var isElement$1 = function isElement(input) {
      return instanceOf$1(input, Element);
    };

    var isTextNode = function isTextNode(input) {
      return getConstructor$1(input) === Text;
    };

    var isEvent$1 = function isEvent(input) {
      return instanceOf$1(input, Event);
    };

    var isKeyboardEvent = function isKeyboardEvent(input) {
      return instanceOf$1(input, KeyboardEvent);
    };

    var isCue = function isCue(input) {
      return (
        instanceOf$1(input, window.TextTrackCue) ||
        instanceOf$1(input, window.VTTCue)
      );
    };

    var isTrack = function isTrack(input) {
      return (
        instanceOf$1(input, TextTrack) ||
        (!isNullOrUndefined$1(input) && isString$1(input.kind))
      );
    };

    var isPromise = function isPromise(input) {
      return instanceOf$1(input, Promise);
    };

    var isEmpty$1 = function isEmpty(input) {
      return (
        isNullOrUndefined$1(input) ||
        ((isString$1(input) || isArray$1(input) || isNodeList$1(input)) &&
          !input.length) ||
        (isObject$1(input) && !Object.keys(input).length)
      );
    };

    var isUrl = function isUrl(input) {
      // Accept a URL object
      if (instanceOf$1(input, window.URL)) {
        return true;
      } // Must be string from here

      if (!isString$1(input)) {
        return false;
      } // Add the protocol if required

      var string = input;

      if (!input.startsWith("http://") || !input.startsWith("https://")) {
        string = "http://".concat(input);
      }

      try {
        return !isEmpty$1(new URL(string).hostname);
      } catch (e) {
        return false;
      }
    };

    var is$1 = {
      nullOrUndefined: isNullOrUndefined$1,
      object: isObject$1,
      number: isNumber$1,
      string: isString$1,
      boolean: isBoolean$1,
      function: isFunction$1,
      array: isArray$1,
      weakMap: isWeakMap,
      nodeList: isNodeList$1,
      element: isElement$1,
      textNode: isTextNode,
      event: isEvent$1,
      keyboardEvent: isKeyboardEvent,
      cue: isCue,
      track: isTrack,
      promise: isPromise,
      url: isUrl,
      empty: isEmpty$1,
    };

    // ==========================================================================
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    // https://www.youtube.com/watch?v=NPM6172J22g

    var supportsPassiveListeners = (function () {
      // Test via a getter in the options object to see if the passive property is accessed
      var supported = false;

      try {
        var options = Object.defineProperty({}, "passive", {
          get: function get() {
            supported = true;
            return null;
          },
        });
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
      } catch (e) {
        // Do nothing
      }

      return supported;
    })(); // Toggle event listener

    function toggleListener(element, event, callback) {
      var _this = this;

      var toggle =
        arguments.length > 3 && arguments[3] !== undefined
          ? arguments[3]
          : false;
      var passive =
        arguments.length > 4 && arguments[4] !== undefined
          ? arguments[4]
          : true;
      var capture =
        arguments.length > 5 && arguments[5] !== undefined
          ? arguments[5]
          : false;

      // Bail if no element, event, or callback
      if (
        !element ||
        !("addEventListener" in element) ||
        is$1.empty(event) ||
        !is$1.function(callback)
      ) {
        return;
      } // Allow multiple events

      var events = event.split(" "); // Build options
      // Default to just the capture boolean for browsers with no passive listener support

      var options = capture; // If passive events listeners are supported

      if (supportsPassiveListeners) {
        options = {
          // Whether the listener can be passive (i.e. default never prevented)
          passive: passive,
          // Whether the listener is a capturing listener or not
          capture: capture,
        };
      } // If a single node is passed, bind the event listener

      events.forEach(function (type) {
        if (_this && _this.eventListeners && toggle) {
          // Cache event listener
          _this.eventListeners.push({
            element: element,
            type: type,
            callback: callback,
            options: options,
          });
        }

        element[toggle ? "addEventListener" : "removeEventListener"](
          type,
          callback,
          options
        );
      });
    } // Bind event handler

    function on(element) {
      var events =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var passive =
        arguments.length > 3 && arguments[3] !== undefined
          ? arguments[3]
          : true;
      var capture =
        arguments.length > 4 && arguments[4] !== undefined
          ? arguments[4]
          : false;
      toggleListener.call(
        this,
        element,
        events,
        callback,
        true,
        passive,
        capture
      );
    } // Unbind event handler

    function off(element) {
      var events =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var passive =
        arguments.length > 3 && arguments[3] !== undefined
          ? arguments[3]
          : true;
      var capture =
        arguments.length > 4 && arguments[4] !== undefined
          ? arguments[4]
          : false;
      toggleListener.call(
        this,
        element,
        events,
        callback,
        false,
        passive,
        capture
      );
    } // Bind once-only event handler

    function once(element) {
      var _this2 = this;

      var events =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var callback = arguments.length > 2 ? arguments[2] : undefined;
      var passive =
        arguments.length > 3 && arguments[3] !== undefined
          ? arguments[3]
          : true;
      var capture =
        arguments.length > 4 && arguments[4] !== undefined
          ? arguments[4]
          : false;

      var onceCallback = function onceCallback() {
        off(element, events, onceCallback, passive, capture);

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key];
        }

        callback.apply(_this2, args);
      };

      toggleListener.call(
        this,
        element,
        events,
        onceCallback,
        true,
        passive,
        capture
      );
    } // Trigger event

    function triggerEvent(element) {
      var type =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var bubbles =
        arguments.length > 2 && arguments[2] !== undefined
          ? arguments[2]
          : false;
      var detail =
        arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      // Bail if no element
      if (!is$1.element(element) || is$1.empty(type)) {
        return;
      } // Create and dispatch the event

      var event = new CustomEvent(type, {
        bubbles: bubbles,
        detail: Object.assign({}, detail, {
          plyr: this,
        }),
      }); // Dispatch the event

      element.dispatchEvent(event);
    } // Unbind all cached event listeners

    function unbindListeners() {
      if (this && this.eventListeners) {
        this.eventListeners.forEach(function (item) {
          var element = item.element,
            type = item.type,
            callback = item.callback,
            options = item.options;
          element.removeEventListener(type, callback, options);
        });
        this.eventListeners = [];
      }
    } // Run method when / if player is ready

    function ready() {
      var _this3 = this;

      return new Promise(function (resolve) {
        return _this3.ready
          ? setTimeout(resolve, 0)
          : on.call(_this3, _this3.elements.container, "ready", resolve);
      }).then(function () {});
    }

    function cloneDeep(object) {
      return JSON.parse(JSON.stringify(object));
    } // Get a nested value in an object

    function getDeep(object, path) {
      return path.split(".").reduce(function (obj, key) {
        return obj && obj[key];
      }, object);
    } // Deep extend destination object with N more objects

    function extend() {
      var target =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (
        var _len = arguments.length,
          sources = new Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        sources[_key - 1] = arguments[_key];
      }

      if (!sources.length) {
        return target;
      }

      var source = sources.shift();

      if (!is$1.object(source)) {
        return target;
      }

      Object.keys(source).forEach(function (key) {
        if (is$1.object(source[key])) {
          if (!Object.keys(target).includes(key)) {
            Object.assign(target, _defineProperty({}, key, {}));
          }

          extend(target[key], source[key]);
        } else {
          Object.assign(target, _defineProperty({}, key, source[key]));
        }
      });
      return extend.apply(void 0, [target].concat(sources));
    }

    function wrap(elements, wrapper) {
      // Convert `elements` to an array, if necessary.
      var targets = elements.length ? elements : [elements]; // Loops backwards to prevent having to clone the wrapper on the
      // first element (see `child` below).

      Array.from(targets)
        .reverse()
        .forEach(function (element, index) {
          var child = index > 0 ? wrapper.cloneNode(true) : wrapper; // Cache the current parent and sibling.

          var parent = element.parentNode;
          var sibling = element.nextSibling; // Wrap the element (is automatically removed from its current
          // parent).

          child.appendChild(element); // If the element had a sibling, insert the wrapper before
          // the sibling to maintain the HTML structure; otherwise, just
          // append it to the parent.

          if (sibling) {
            parent.insertBefore(child, sibling);
          } else {
            parent.appendChild(child);
          }
        });
    } // Set attributes

    function setAttributes(element, attributes) {
      if (!is$1.element(element) || is$1.empty(attributes)) {
        return;
      } // Assume null and undefined attributes should be left out,
      // Setting them would otherwise convert them to "null" and "undefined"

      Object.entries(attributes)
        .filter(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[1];

          return !is$1.nullOrUndefined(value);
        })
        .forEach(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

          return element.setAttribute(key, value);
        });
    } // Create a DocumentFragment

    function createElement(type, attributes, text) {
      // Create a new <element>
      var element = document.createElement(type); // Set all passed attributes

      if (is$1.object(attributes)) {
        setAttributes(element, attributes);
      } // Add text node

      if (is$1.string(text)) {
        element.innerText = text;
      } // Return built element

      return element;
    } // Inaert an element after another

    function insertAfter(element, target) {
      if (!is$1.element(element) || !is$1.element(target)) {
        return;
      }

      target.parentNode.insertBefore(element, target.nextSibling);
    } // Insert a DocumentFragment

    function insertElement(type, parent, attributes, text) {
      if (!is$1.element(parent)) {
        return;
      }

      parent.appendChild(createElement(type, attributes, text));
    } // Remove element(s)

    function removeElement(element) {
      if (is$1.nodeList(element) || is$1.array(element)) {
        Array.from(element).forEach(removeElement);
        return;
      }

      if (!is$1.element(element) || !is$1.element(element.parentNode)) {
        return;
      }

      element.parentNode.removeChild(element);
    } // Remove all child elements

    function emptyElement(element) {
      if (!is$1.element(element)) {
        return;
      }

      var length = element.childNodes.length;

      while (length > 0) {
        element.removeChild(element.lastChild);
        length -= 1;
      }
    } // Replace element

    function replaceElement(newChild, oldChild) {
      if (
        !is$1.element(oldChild) ||
        !is$1.element(oldChild.parentNode) ||
        !is$1.element(newChild)
      ) {
        return null;
      }

      oldChild.parentNode.replaceChild(newChild, oldChild);
      return newChild;
    } // Get an attribute object from a string selector

    function getAttributesFromSelector(sel, existingAttributes) {
      // For example:
      // '.test' to { class: 'test' }
      // '#test' to { id: 'test' }
      // '[data-test="test"]' to { 'data-test': 'test' }
      if (!is$1.string(sel) || is$1.empty(sel)) {
        return {};
      }

      var attributes = {};
      var existing = extend({}, existingAttributes);
      sel.split(",").forEach(function (s) {
        // Remove whitespace
        var selector = s.trim();
        var className = selector.replace(".", "");
        var stripped = selector.replace(/[[\]]/g, ""); // Get the parts and value

        var parts = stripped.split("=");

        var _parts = _slicedToArray(parts, 1),
          key = _parts[0];

        var value = parts.length > 1 ? parts[1].replace(/["']/g, "") : ""; // Get the first character

        var start = selector.charAt(0);

        switch (start) {
          case ".":
            // Add to existing classname
            if (is$1.string(existing.class)) {
              attributes.class = ""
                .concat(existing.class, " ")
                .concat(className);
            } else {
              attributes.class = className;
            }

            break;

          case "#":
            // ID selector
            attributes.id = selector.replace("#", "");
            break;

          case "[":
            // Attribute selector
            attributes[key] = value;
            break;

          default:
            break;
        }
      });
      return extend(existing, attributes);
    } // Toggle hidden

    function toggleHidden(element, hidden) {
      if (!is$1.element(element)) {
        return;
      }

      var hide = hidden;

      if (!is$1.boolean(hide)) {
        hide = !element.hidden;
      }

      if (hide) {
        element.setAttribute("hidden", "");
      } else {
        element.removeAttribute("hidden");
      }
    } // Mirror Element.classList.toggle, with IE compatibility for "force" argument

    function toggleClass(element, className, force) {
      if (is$1.nodeList(element)) {
        return Array.from(element).map(function (e) {
          return toggleClass(e, className, force);
        });
      }

      if (is$1.element(element)) {
        var method = "toggle";

        if (typeof force !== "undefined") {
          method = force ? "add" : "remove";
        }

        element.classList[method](className);
        return element.classList.contains(className);
      }

      return false;
    } // Has class name

    function hasClass(element, className) {
      return is$1.element(element) && element.classList.contains(className);
    } // Element matches selector

    function matches$1(element, selector) {
      function match() {
        return Array.from(document.querySelectorAll(selector)).includes(this);
      }

      var matches = match;
      return matches.call(element, selector);
    } // Find all elements

    function getElements(selector) {
      return this.elements.container.querySelectorAll(selector);
    } // Find a single element

    function getElement(selector) {
      return this.elements.container.querySelector(selector);
    } // Trap focus inside container

    function trapFocus() {
      var element =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : null;
      var toggle =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : false;

      if (!is$1.element(element)) {
        return;
      }

      var focusable = getElements.call(
        this,
        "button:not(:disabled), input:not(:disabled), [tabindex]"
      );
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      var trap = function trap(event) {
        // Bail if not tab key or not fullscreen
        if (event.key !== "Tab" || event.keyCode !== 9) {
          return;
        } // Get the current focused element

        var focused = document.activeElement;

        if (focused === last && !event.shiftKey) {
          // Move focus to first element that can be tabbed if Shift isn't used
          first.focus();
          event.preventDefault();
        } else if (focused === first && event.shiftKey) {
          // Move focus to last element that can be tabbed if Shift is used
          last.focus();
          event.preventDefault();
        }
      };

      toggleListener.call(
        this,
        this.elements.container,
        "keydown",
        trap,
        toggle,
        false
      );
    } // Set focus and tab focus class

    function setFocus() {
      var element =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : null;
      var tabFocus =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : false;

      if (!is$1.element(element)) {
        return;
      } // Set regular focus

      element.focus({
        preventScroll: true,
      }); // If we want to mimic keyboard focus via tab

      if (tabFocus) {
        toggleClass(element, this.config.classNames.tabFocus);
      }
    }

    // ==========================================================================
    var transitionEndEvent = (function () {
      var element = document.createElement("span");
      var events = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd otransitionend",
        transition: "transitionend",
      };
      var type = Object.keys(events).find(function (event) {
        return element.style[event] !== undefined;
      });
      return is$1.string(type) ? events[type] : false;
    })(); // Force repaint of element

    function repaint(element) {
      setTimeout(function () {
        try {
          toggleHidden(element, true);
          element.offsetHeight; // eslint-disable-line

          toggleHidden(element, false);
        } catch (e) {
          // Do nothing
        }
      }, 0);
    }

    // ==========================================================================
    // Browser sniffing
    // Unfortunately, due to mixed support, UA sniffing is required
    // ==========================================================================
    var browser = {
      isIE:
        /* @cc_on!@ */
        !!document.documentMode,
      isEdge: window.navigator.userAgent.includes("Edge"),
      isWebkit:
        "WebkitAppearance" in document.documentElement.style &&
        !/Edge/.test(navigator.userAgent),
      isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
      isIos: /(iPad|iPhone|iPod)/gi.test(navigator.platform),
    };

    var defaultCodecs = {
      "audio/ogg": "vorbis",
      "audio/wav": "1",
      "video/webm": "vp8, vorbis",
      "video/mp4": "avc1.42E01E, mp4a.40.2",
      "video/ogg": "theora",
    }; // Check for feature support

    var support = {
      // Basic support
      audio: "canPlayType" in document.createElement("audio"),
      video: "canPlayType" in document.createElement("video"),
      // Check for support
      // Basic functionality vs full UI
      check: function check(type, provider, playsinline) {
        var canPlayInline =
          browser.isIPhone && playsinline && support.playsinline;
        var api = support[type] || provider !== "html5";
        var ui =
          api &&
          support.rangeInput &&
          (type !== "video" || !browser.isIPhone || canPlayInline);
        return {
          api: api,
          ui: ui,
        };
      },
      // Picture-in-picture support
      // Safari & Chrome only currently
      pip: (function () {
        if (browser.isIPhone) {
          return false;
        } // Safari
        // https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls

        if (is$1.function(createElement("video").webkitSetPresentationMode)) {
          return true;
        } // Chrome
        // https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture

        if (
          document.pictureInPictureEnabled &&
          !createElement("video").disablePictureInPicture
        ) {
          return true;
        }

        return false;
      })(),
      // Airplay support
      // Safari only currently
      airplay: is$1.function(window.WebKitPlaybackTargetAvailabilityEvent),
      // Inline playback support
      // https://webkit.org/blog/6784/new-video-policies-for-ios/
      playsinline: "playsInline" in document.createElement("video"),
      // Check for mime type support against a player instance
      // Credits: http://diveintohtml5.info/everything.html
      // Related: http://www.leanbackplayer.com/test/h5mt.html
      mime: function mime(input) {
        if (is$1.empty(input)) {
          return false;
        }

        var _input$split = input.split("/"),
          _input$split2 = _slicedToArray(_input$split, 1),
          mediaType = _input$split2[0];

        var type = input; // Verify we're using HTML5 and there's no media type mismatch

        if (!this.isHTML5 || mediaType !== this.type) {
          return false;
        } // Add codec if required

        if (Object.keys(defaultCodecs).includes(type)) {
          type += '; codecs="'.concat(defaultCodecs[input], '"');
        }

        try {
          return Boolean(
            type && this.media.canPlayType(type).replace(/no/, "")
          );
        } catch (e) {
          return false;
        }
      },
      // Check for textTracks support
      textTracks: "textTracks" in document.createElement("video"),
      // <input type="range"> Sliders
      rangeInput: (function () {
        var range = document.createElement("input");
        range.type = "range";
        return range.type === "range";
      })(),
      // Touch
      // NOTE: Remember a device can be mouse + touch enabled so we check on first touch event
      touch: "ontouchstart" in document.documentElement,
      // Detect transitions support
      transitions: transitionEndEvent !== false,
      // Reduced motion iOS & MacOS setting
      // https://webkit.org/blog/7551/responsive-design-for-motion/
      reducedMotion:
        "matchMedia" in window &&
        window.matchMedia("(prefers-reduced-motion)").matches,
    };

    function validateRatio(input) {
      if (!is$1.array(input) && (!is$1.string(input) || !input.includes(":"))) {
        return false;
      }

      var ratio = is$1.array(input) ? input : input.split(":");
      return ratio.map(Number).every(is$1.number);
    }
    function reduceAspectRatio(ratio) {
      if (!is$1.array(ratio) || !ratio.every(is$1.number)) {
        return null;
      }

      var _ratio = _slicedToArray(ratio, 2),
        width = _ratio[0],
        height = _ratio[1];

      var getDivider = function getDivider(w, h) {
        return h === 0 ? w : getDivider(h, w % h);
      };

      var divider = getDivider(width, height);
      return [width / divider, height / divider];
    }
    function getAspectRatio(input) {
      var parse = function parse(ratio) {
        if (!validateRatio(ratio)) {
          return null;
        }
        return ratio.split(":").map(Number);
      }; // Provided ratio

      var ratio = parse(input); // Get from config
      if (ratio === null) {
        ratio = parse(this.config.ratio);
      } // Get from embed

      if (
        ratio === null &&
        !is$1.empty(this.embed) &&
        is$1.array(this.embed.ratio)
      ) {
        ratio = this.embed.ratio;
      } // Get from HTML5 video

      if (ratio === null && this.isHTML5) {
        var _this$media = this.media,
          videoWidth = _this$media.videoWidth,
          videoHeight = _this$media.videoHeight;
        ratio = reduceAspectRatio([videoWidth, videoHeight]);
      }

      return ratio;
    } // Set aspect ratio for responsive container

    function setAspectRatio(input) {
      if (!this.isVideo) {
        return {};
      }

      var ratio = getAspectRatio.call(this, input);

      var _ref = is$1.array(ratio) ? ratio : [0, 0],
        _ref2 = _slicedToArray(_ref, 2),
        w = _ref2[0],
        h = _ref2[1];

      var padding = (100 / w) * h;
      this.elements.wrapper.style.paddingBottom = "".concat(padding, "%"); // For Vimeo we have an extra <div> to hide the standard controls and UI

      var ar = "none";
      //Mike Land 2.23.22 ML - Added this bcs we need a class for different Aspect Ratios
      if (h > 0) {
        if (w < h) {
          ar = "vert";
          this.elements.container.classList.add("video-ar-vertical");
          this.elements.container.classList.remove("video-ar-square");
          this.elements.container.classList.remove("video-ar-standard");
        }
        if (w == h) {
          ar = "square";
          this.elements.container.classList.add("video-ar-square");
          this.elements.container.classList.remove("video-ar-vertical");
          this.elements.container.classList.remove("video-ar-standard");
        }
        if (w > h) {
          ar = "standard";
          this.elements.container.classList.add("video-ar-standard");
          this.elements.container.classList.remove("video-ar-square");
          this.elements.container.classList.remove("video-ar-vertical");
        }
      }

      if (this.isVimeo && this.supported.ui) {
        var height = 240;
        var offset = (height - padding) / (height / 50);
        this.media.style.transform = "translateY(-".concat(offset, "%)");
      } else if (this.isHTML5) {
        this.elements.wrapper.classList.toggle(
          this.config.classNames.videoFixedRatio,
          ratio !== null
        );
      }

      return {
        padding: padding,
        ratio: ratio,
      };
    }

    // ==========================================================================
    var html5 = {
      getSources: function getSources() {
        var _this = this;

        if (!this.isHTML5) {
          return [];
        }

        var sources = Array.from(this.media.querySelectorAll("source")); // Filter out unsupported sources (if type is specified)

        return sources.filter(function (source) {
          var type = source.getAttribute("type");

          if (is$1.empty(type)) {
            return true;
          }

          return support.mime.call(_this, type);
        });
      },
      // Get quality levels
      getQualityOptions: function getQualityOptions() {
        // Get sizes from <source> elements
        return html5.getSources
          .call(this)
          .map(function (source) {
            return Number(source.getAttribute("size"));
          })
          .filter(Boolean);
      },
      extend: function extend() {
        if (!this.isHTML5) {
          return;
        }

        var player = this; // Set aspect ratio if set

        setAspectRatio.call(player); // Quality

        Object.defineProperty(player.media, "quality", {
          get: function get() {
            // Get sources
            var sources = html5.getSources.call(player);
            var source = sources.find(function (source) {
              return source.getAttribute("src") === player.source;
            }); // Return size, if match is found

            return source && Number(source.getAttribute("size"));
          },
          set: function set(input) {
            // Get sources
            var sources = html5.getSources.call(player); // Get first match for requested size

            var source = sources.find(function (source) {
              return Number(source.getAttribute("size")) === input;
            }); // No matching source found

            if (!source) {
              return;
            } // Get current state

            var _player$media = player.media,
              currentTime = _player$media.currentTime,
              paused = _player$media.paused,
              preload = _player$media.preload,
              readyState = _player$media.readyState; // Set new source

            player.media.src = source.getAttribute("src"); // Prevent loading if preload="none" and the current source isn't loaded (#1044)

            if (preload !== "none" || readyState) {
              // Restore time
              player.once("loadedmetadata", function () {
                player.currentTime = currentTime; // Resume playing

                if (!paused) {
                  player.play();
                }
              }); // Load new source

              player.media.load();
            } // Trigger change event

            triggerEvent.call(player, player.media, "qualitychange", false, {
              quality: input,
            });
          },
        });
      },
      // Cancel current network requests
      // See https://github.com/sampotts/plyr/issues/174
      cancelRequests: function cancelRequests() {
        if (!this.isHTML5) {
          return;
        } // Remove child sources

        removeElement(html5.getSources.call(this)); // Set blank video src attribute
        // This is to prevent a MEDIA_ERR_SRC_NOT_SUPPORTED error
        // Info: http://stackoverflow.com/questions/32231579/how-to-properly-dispose-of-an-html5-video-and-close-socket-or-connection

        this.media.setAttribute("src", this.config.blankVideo); // Load the new empty source
        // This will cancel existing requests
        // See https://github.com/sampotts/plyr/issues/174

        this.media.load(); // Debugging

        this.debug.log("Cancelled network requests");
      },
    };

    // ==========================================================================

    function dedupe(array) {
      if (!is$1.array(array)) {
        return array;
      }

      return array.filter(function (item, index) {
        return array.indexOf(item) === index;
      });
    } // Get the closest value in an array

    function closest(array, value) {
      if (!is$1.array(array) || !array.length) {
        return null;
      }

      return array.reduce(function (prev, curr) {
        return Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev;
      });
    }

    // ==========================================================================

    function generateId(prefix) {
      return "".concat(prefix, "-").concat(Math.floor(Math.random() * 10000));
    } // Format string

    function format(input) {
      for (
        var _len = arguments.length,
          args = new Array(_len > 1 ? _len - 1 : 0),
          _key = 1;
        _key < _len;
        _key++
      ) {
        args[_key - 1] = arguments[_key];
      }

      if (is$1.empty(input)) {
        return input;
      }

      return input.toString().replace(/{(\d+)}/g, function (match, i) {
        return args[i].toString();
      });
    } // Get percentage

    function getPercentage(current, max) {
      if (
        current === 0 ||
        max === 0 ||
        Number.isNaN(current) ||
        Number.isNaN(max)
      ) {
        return 0;
      }

      return ((current / max) * 100).toFixed(2);
    } // Replace all occurances of a string in a string

    function replaceAll() {
      var input =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var find =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var replace =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      return input.replace(
        new RegExp(
          find.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"),
          "g"
        ),
        replace.toString()
      );
    } // Convert to title case

    function toTitleCase() {
      var input =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      return input.toString().replace(/\w\S*/g, function (text) {
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
      });
    } // Convert string to pascalCase

    function toPascalCase() {
      var input =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var string = input.toString(); // Convert kebab case

      string = replaceAll(string, "-", " "); // Convert snake case

      string = replaceAll(string, "_", " "); // Convert to title case

      string = toTitleCase(string); // Convert to pascal case

      return replaceAll(string, " ", "");
    } // Convert string to pascalCase

    function toCamelCase() {
      var input =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var string = input.toString(); // Convert to pascal case

      string = toPascalCase(string); // Convert first character to lowercase

      return string.charAt(0).toLowerCase() + string.slice(1);
    } // Remove HTML from a string

    function stripHTML(source) {
      var fragment = document.createDocumentFragment();
      var element = document.createElement("div");
      fragment.appendChild(element);
      element.innerHTML = source;
      return fragment.firstChild.innerText;
    } // Like outerHTML, but also works for DocumentFragment

    function getHTML(element) {
      var wrapper = document.createElement("div");
      wrapper.appendChild(element);
      return wrapper.innerHTML;
    }

    var resources = {
      pip: "PIP",
      airplay: "AirPlay",
      html5: "HTML5",
      vimeo: "Vimeo",
      youtube: "YouTube",
    };
    var i18n = {
      get: function get() {
        var key =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : "";
        var config =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        if (is$1.empty(key) || is$1.empty(config)) {
          return "";
        }

        var string = getDeep(config.i18n, key);

        if (is$1.empty(string)) {
          if (Object.keys(resources).includes(key)) {
            return resources[key];
          }

          return "";
        }

        var replace = {
          "{seektime}": config.seekTime,
          "{title}": config.title,
        };
        Object.entries(replace).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

          string = replaceAll(string, key, value);
        });
        return string;
      },
    };

    var Storage =
      /*#__PURE__*/
      (function () {
        function Storage(player) {
          _classCallCheck(this, Storage);

          this.enabled = player.config.storage.enabled;
          this.key = player.config.storage.key;
        } // Check for actual support (see if we can use it)

        _createClass(
          Storage,
          [
            {
              key: "get",
              value: function get(key) {
                if (!Storage.supported || !this.enabled) {
                  return null;
                }

                var store = window.localStorage.getItem(this.key);

                if (is$1.empty(store)) {
                  return null;
                }

                var json = JSON.parse(store);
                return is$1.string(key) && key.length ? json[key] : json;
              },
            },
            {
              key: "set",
              value: function set(object) {
                // Bail if we don't have localStorage support or it's disabled
                if (!Storage.supported || !this.enabled) {
                  return;
                } // Can only store objectst

                if (!is$1.object(object)) {
                  return;
                } // Get current storage

                var storage = this.get(); // Default to empty object

                if (is$1.empty(storage)) {
                  storage = {};
                } // Update the working copy of the values

                extend(storage, object); // Update storage

                window.localStorage.setItem(this.key, JSON.stringify(storage));
              },
            },
          ],
          [
            {
              key: "supported",
              get: function get() {
                try {
                  if (!("localStorage" in window)) {
                    return false;
                  }

                  var test = "___test"; // Try to use it (it might be disabled, e.g. user is in private mode)
                  // see: https://github.com/sampotts/plyr/issues/131

                  window.localStorage.setItem(test, test);
                  window.localStorage.removeItem(test);
                  return true;
                } catch (e) {
                  return false;
                }
              },
            },
          ]
        );

        return Storage;
      })();

    // ==========================================================================
    // Fetch wrapper
    // Using XHR to avoid issues with older browsers
    // ==========================================================================
    function fetch(url) {
      var responseType =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : "text";
      return new Promise(function (resolve, reject) {
        try {
          var request = new XMLHttpRequest(); // Check for CORS support

          if (!("withCredentials" in request)) {
            return;
          }

          request.addEventListener("load", function () {
            if (responseType === "text") {
              try {
                resolve(JSON.parse(request.responseText));
              } catch (e) {
                resolve(request.responseText);
              }
            } else {
              resolve(request.response);
            }
          });
          request.addEventListener("error", function () {
            throw new Error(request.status);
          });
          request.open("GET", url, true); // Set the required response type

          request.responseType = responseType;
          request.send();
        } catch (e) {
          reject(e);
        }
      });
    }

    // ==========================================================================

    function loadSprite(url, id) {
      if (!is$1.string(url)) {
        return;
      }

      var prefix = "cache";
      var hasId = is$1.string(id);
      var isCached = false;

      var exists = function exists() {
        return document.getElementById(id) !== null;
      };

      var update = function update(container, data) {
        container.innerHTML = data; // Check again incase of race condition

        if (hasId && exists()) {
          return;
        } // Inject the SVG to the body

        document.body.insertAdjacentElement("afterbegin", container);
      }; // Only load once if ID set

      if (!hasId || !exists()) {
        var useStorage = Storage.supported; // Create container

        var container = document.createElement("div");
        container.setAttribute("hidden", "");

        if (hasId) {
          container.setAttribute("id", id);
        } // Check in cache

        if (useStorage) {
          var cached = window.localStorage.getItem(
            "".concat(prefix, "-").concat(id)
          );
          isCached = cached !== null;

          if (isCached) {
            var data = JSON.parse(cached);
            update(container, data.content);
          }
        } // Get the sprite

        fetch(url)
          .then(function (result) {
            if (is$1.empty(result)) {
              return;
            }

            if (useStorage) {
              window.localStorage.setItem(
                "".concat(prefix, "-").concat(id),
                JSON.stringify({
                  content: result,
                })
              );
            }

            update(container, result);
          })
          .catch(function () {});
      }
    }

    // ==========================================================================

    var getHours = function getHours(value) {
      return Math.trunc((value / 60 / 60) % 60, 10);
    };
    var getMinutes = function getMinutes(value) {
      return Math.trunc((value / 60) % 60, 10);
    };
    var getSeconds = function getSeconds(value) {
      return Math.trunc(value % 60, 10);
    }; // Format time to UI friendly string

    function formatTime() {
      var time =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var displayHours =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : false;
      var inverted =
        arguments.length > 2 && arguments[2] !== undefined
          ? arguments[2]
          : false;

      // Bail if the value isn't a number
      if (!is$1.number(time)) {
        return formatTime(null, displayHours, inverted);
      } // Format time component to add leading zero

      var format = function format(value) {
        return "0".concat(value).slice(-2);
      }; // Breakdown to hours, mins, secs

      var hours = getHours(time);
      var mins = getMinutes(time);
      var secs = getSeconds(time); // Do we need to display hours?

      if (displayHours || hours > 0) {
        hours = "".concat(hours, ":");
      } else {
        hours = "";
      } // Render

      return ""
        .concat(inverted && time > 0 ? "-" : "")
        .concat(hours)
        .concat(format(mins), ":")
        .concat(format(secs));
    }

    var controls = {
      // Get icon URL
      getIconUrl: function getIconUrl() {
        var url = new URL(this.config.iconUrl, window.location);
        var cors =
          url.host !== window.location.host ||
          (browser.isIE && !window.svg4everybody);
        return {
          url: this.config.iconUrl,
          cors: cors,
        };
      },
      // Find the UI controls
      findElements: function findElements() {
        try {
          this.elements.controls = getElement.call(
            this,
            this.config.selectors.controls.wrapper
          ); // Buttons

          this.elements.buttons = {
            play: getElements.call(this, this.config.selectors.buttons.play),
            pause: getElement.call(this, this.config.selectors.buttons.pause),
            restart: getElement.call(
              this,
              this.config.selectors.buttons.restart
            ),
            rewind: getElement.call(this, this.config.selectors.buttons.rewind),
            fastForward: getElement.call(
              this,
              this.config.selectors.buttons.fastForward
            ),
            mute: getElement.call(this, this.config.selectors.buttons.mute),
            pip: getElement.call(this, this.config.selectors.buttons.pip),
            airplay: getElement.call(
              this,
              this.config.selectors.buttons.airplay
            ),
            settings: getElement.call(
              this,
              this.config.selectors.buttons.settings
            ),
            captions: getElement.call(
              this,
              this.config.selectors.buttons.captions
            ),
            fullscreen: getElement.call(
              this,
              this.config.selectors.buttons.fullscreen
            ),
          }; // Progress

          this.elements.progress = getElement.call(
            this,
            this.config.selectors.progress
          ); // Inputs

          this.elements.inputs = {
            seek: getElement.call(this, this.config.selectors.inputs.seek),
            volume: getElement.call(this, this.config.selectors.inputs.volume),
          }; // Display

          this.elements.display = {
            buffer: getElement.call(this, this.config.selectors.display.buffer),
            currentTime: getElement.call(
              this,
              this.config.selectors.display.currentTime
            ),
            duration: getElement.call(
              this,
              this.config.selectors.display.duration
            ),
          }; // Seek tooltip

          if (is$1.element(this.elements.progress)) {
            this.elements.display.seekTooltip =
              this.elements.progress.querySelector(
                ".".concat(this.config.classNames.tooltip)
              );
          }

          return true;
        } catch (error) {
          // Log it
          this.debug.warn(
            "It looks like there is a problem with your custom controls HTML",
            error
          ); // Restore native video controls

          this.toggleNativeControls(true);
          return false;
        }
      },
      // Create <svg> icon
      createIcon: function createIcon(type, attributes) {
        var namespace = "http://www.w3.org/2000/svg";
        var iconUrl = controls.getIconUrl.call(this);
        var iconPath = ""
          .concat(!iconUrl.cors ? iconUrl.url : "", "#")
          .concat(this.config.iconPrefix); // Create <svg>

        var icon = document.createElementNS(namespace, "svg");
        setAttributes(
          icon,
          extend(attributes, {
            role: "presentation",
            focusable: "false",
          })
        ); // Create the <use> to reference sprite

        var use = document.createElementNS(namespace, "use");
        var path = "".concat(iconPath, "-").concat(type); // Set `href` attributes
        // https://github.com/sampotts/plyr/issues/460
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href

        if ("href" in use) {
          use.setAttributeNS("http://www.w3.org/1999/xlink", "href", path);
        } // Always set the older attribute even though it's "deprecated" (it'll be around for ages)

        use.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", path); // Add <use> to <svg>

        icon.appendChild(use);
        return icon;
      },
      // Create hidden text label
      createLabel: function createLabel(key) {
        var attr =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        var text = i18n.get(key, this.config);
        var attributes = Object.assign({}, attr, {
          class: [attr.class, this.config.classNames.hidden]
            .filter(Boolean)
            .join(" "),
        });
        return createElement("span", attributes, text);
      },
      // Create a badge
      createBadge: function createBadge(text) {
        if (is$1.empty(text)) {
          return null;
        }

        var badge = createElement("span", {
          class: this.config.classNames.menu.value,
        });
        badge.appendChild(
          createElement(
            "span",
            {
              class: this.config.classNames.menu.badge,
            },
            text
          )
        );
        return badge;
      },
      // Create a <button>
      createButton: function createButton(buttonType, attr) {
        var _this = this;

        var attributes = extend({}, attr);
        var type = toCamelCase(buttonType);
        var props = {
          element: "button",
          toggle: false,
          label: null,
          icon: null,
          labelPressed: null,
          iconPressed: null,
        };
        ["element", "icon", "label"].forEach(function (key) {
          if (Object.keys(attributes).includes(key)) {
            props[key] = attributes[key];
            delete attributes[key];
          }
        }); // Default to 'button' type to prevent form submission

        if (
          props.element === "button" &&
          !Object.keys(attributes).includes("type")
        ) {
          attributes.type = "button";
        } // Set class name

        if (Object.keys(attributes).includes("class")) {
          if (
            !attributes.class.split(" ").some(function (c) {
              return c === _this.config.classNames.control;
            })
          ) {
            extend(attributes, {
              class: ""
                .concat(attributes.class, " ")
                .concat(this.config.classNames.control),
            });
          }
        } else {
          attributes.class = this.config.classNames.control;
        } // Large play button

        switch (buttonType) {
          case "play":
            props.toggle = true;
            props.label = "play";
            props.labelPressed = "pause";
            props.icon = "play";
            props.iconPressed = "pause";
            break;

          case "mute":
            props.toggle = true;
            props.label = "mute";
            props.labelPressed = "unmute";
            props.icon = "volume";
            props.iconPressed = "muted";
            break;

          case "captions":
            props.toggle = true;
            props.label = "enableCaptions";
            props.labelPressed = "disableCaptions";
            props.icon = "captions-off";
            props.iconPressed = "captions-on";
            break;

          case "fullscreen":
            props.toggle = true;
            props.label = "enterFullscreen";
            props.labelPressed = "exitFullscreen";
            props.icon = "enter-fullscreen";
            props.iconPressed = "exit-fullscreen";
            break;

          case "play-large":
            attributes.class += " ".concat(
              this.config.classNames.control,
              "--overlaid"
            );
            type = "play";
            props.label = "play";
            props.icon = "play";
            break;

          default:
            if (is$1.empty(props.label)) {
              props.label = type;
            }

            if (is$1.empty(props.icon)) {
              props.icon = buttonType;
            }
        }

        var button = createElement(props.element); // Setup toggle icon and labels

        if (props.toggle) {
          // Icon
          button.appendChild(
            controls.createIcon.call(this, props.iconPressed, {
              class: "icon--pressed",
            })
          );
          button.appendChild(
            controls.createIcon.call(this, props.icon, {
              class: "icon--not-pressed",
            })
          ); // Label/Tooltip

          button.appendChild(
            controls.createLabel.call(this, props.labelPressed, {
              class: "label--pressed",
            })
          );
          button.appendChild(
            controls.createLabel.call(this, props.label, {
              class: "label--not-pressed",
            })
          );
        } else {
          button.appendChild(controls.createIcon.call(this, props.icon));
          button.appendChild(controls.createLabel.call(this, props.label));
        } // Merge and set attributes

        extend(
          attributes,
          getAttributesFromSelector(
            this.config.selectors.buttons[type],
            attributes
          )
        );
        setAttributes(button, attributes); // We have multiple play buttons
        if (type === "play") {
          if (!is$1.array(this.elements.buttons[type])) {
            this.elements.buttons[type] = [];
          }

          this.elements.buttons[type].push(button);
        } else {
          this.elements.buttons[type] = button;
        }

        return button;
      },
      // Create an <input type='range'>
      createRange: function createRange(type, attributes) {
        // Seek input
        var input = createElement(
          "input",
          extend(
            getAttributesFromSelector(this.config.selectors.inputs[type]),
            {
              type: "range",
              min: 0,
              max: 100,
              step: 0.01,
              value: 0,
              autocomplete: "off",
              // A11y fixes for https://github.com/sampotts/plyr/issues/905
              role: "slider",
              "aria-label": i18n.get(type, this.config),
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": 0,
            },
            attributes
          )
        );
        this.elements.inputs[type] = input; // Set the fill for webkit now

        controls.updateRangeFill.call(this, input); // Improve support on touch devices

        RangeTouch.setup(input);
        return input;
      },
      // Create a <progress>
      createProgress: function createProgress(type, attributes) {
        var progress = createElement(
          "progress",
          extend(
            getAttributesFromSelector(this.config.selectors.display[type]),
            {
              min: 0,
              max: 100,
              value: 0,
              role: "progressbar",
              "aria-hidden": true,
            },
            attributes
          )
        ); // Create the label inside

        if (type !== "volume") {
          progress.appendChild(createElement("span", null, "0"));
          var suffixKey = {
            played: "played",
            buffer: "buffered",
          }[type];
          var suffix = suffixKey ? i18n.get(suffixKey, this.config) : "";
          progress.innerText = "% ".concat(suffix.toLowerCase());
        }

        this.elements.display[type] = progress;
        return progress;
      },
      // Create time display
      createTime: function createTime(type, attrs) {
        var attributes = getAttributesFromSelector(
          this.config.selectors.display[type],
          attrs
        );
        var container = createElement(
          "div",
          extend(attributes, {
            class: ""
              .concat(attributes.class ? attributes.class : "", " ")
              .concat(this.config.classNames.display.time, " ")
              .trim(),
            "aria-label": i18n.get(type, this.config),
          }),
          "00:00"
        ); // Reference for updates

        this.elements.display[type] = container;
        return container;
      },
      // Bind keyboard shortcuts for a menu item
      // We have to bind to keyup otherwise Firefox triggers a click when a keydown event handler shifts focus
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143
      bindMenuItemShortcuts: function bindMenuItemShortcuts(menuItem, type) {
        var _this2 = this;

        // Navigate through menus via arrow keys and space
        on(
          menuItem,
          "keydown keyup",
          function (event) {
            // We only care about space and ⬆️ ⬇️️ ➡️
            if (![32, 38, 39, 40].includes(event.which)) {
              return;
            } // Prevent play / seek

            event.preventDefault();
            event.stopPropagation(); // We're just here to prevent the keydown bubbling

            if (event.type === "keydown") {
              return;
            }

            var isRadioButton = matches$1(menuItem, '[role="menuitemradio"]'); // Show the respective menu

            if (!isRadioButton && [32, 39].includes(event.which)) {
              controls.showMenuPanel.call(_this2, type, true);
            } else {
              var target;

              if (event.which !== 32) {
                if (
                  event.which === 40 ||
                  (isRadioButton && event.which === 39)
                ) {
                  target = menuItem.nextElementSibling;

                  if (!is$1.element(target)) {
                    target = menuItem.parentNode.firstElementChild;
                  }
                } else {
                  target = menuItem.previousElementSibling;

                  if (!is$1.element(target)) {
                    target = menuItem.parentNode.lastElementChild;
                  }
                }

                setFocus.call(_this2, target, true);
              }
            }
          },
          false
        ); // Enter will fire a `click` event but we still need to manage focus
        // So we bind to keyup which fires after and set focus here

        on(menuItem, "keyup", function (event) {
          if (event.which !== 13) {
            return;
          }

          controls.focusFirstMenuItem.call(_this2, null, true);
        });
      },
      // Create a settings menu item
      createMenuItem: function createMenuItem(_ref) {
        var _this3 = this;

        var value = _ref.value,
          list = _ref.list,
          type = _ref.type,
          title = _ref.title,
          _ref$badge = _ref.badge,
          badge = _ref$badge === void 0 ? null : _ref$badge,
          _ref$checked = _ref.checked,
          checked = _ref$checked === void 0 ? false : _ref$checked;
        var attributes = getAttributesFromSelector(
          this.config.selectors.inputs[type]
        );
        var menuItem = createElement(
          "button",
          extend(attributes, {
            type: "button",
            role: "menuitemradio",
            class: ""
              .concat(this.config.classNames.control, " ")
              .concat(attributes.class ? attributes.class : "")
              .trim(),
            "aria-checked": checked,
            value: value,
          })
        );
        var flex = createElement("span"); // We have to set as HTML incase of special characters

        flex.innerHTML = title;

        if (is$1.element(badge)) {
          flex.appendChild(badge);
        }

        menuItem.appendChild(flex); // Replicate radio button behaviour

        Object.defineProperty(menuItem, "checked", {
          enumerable: true,
          get: function get() {
            return menuItem.getAttribute("aria-checked") === "true";
          },
          set: function set(checked) {
            // Ensure exclusivity
            if (checked) {
              Array.from(menuItem.parentNode.children)
                .filter(function (node) {
                  return matches$1(node, '[role="menuitemradio"]');
                })
                .forEach(function (node) {
                  return node.setAttribute("aria-checked", "false");
                });
            }

            menuItem.setAttribute("aria-checked", checked ? "true" : "false");
          },
        });
        this.listeners.bind(
          menuItem,
          "click keyup",
          function (event) {
            if (is$1.keyboardEvent(event) && event.which !== 32) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();
            menuItem.checked = true;

            switch (type) {
              case "language":
                _this3.currentTrack = Number(value);
                break;

              case "quality":
                _this3.quality = value;
                break;

              case "speed":
                _this3.speed = parseFloat(value);
                break;

              default:
                break;
            }

            controls.showMenuPanel.call(
              _this3,
              "home",
              is$1.keyboardEvent(event)
            );
          },
          type,
          false
        );
        controls.bindMenuItemShortcuts.call(this, menuItem, type);
        list.appendChild(menuItem);
      },
      // Format a time for display
      formatTime: function formatTime$1() {
        var time =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var inverted =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : false;

        // Bail if the value isn't a number
        if (!is$1.number(time)) {
          return time;
        } // Always display hours if duration is over an hour

        var forceHours = getHours(this.duration) > 0;
        return formatTime(time, forceHours, inverted);
      },
      // Update the displayed time
      updateTimeDisplay: function updateTimeDisplay() {
        var target =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : null;
        var time =
          arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var inverted =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : false;

        // Bail if there's no element to display or the value isn't a number
        if (!is$1.element(target) || !is$1.number(time)) {
          return;
        } // eslint-disable-next-line no-param-reassign

        target.innerText = controls.formatTime(time, inverted);
      },
      // Update volume UI and storage
      updateVolume: function updateVolume() {
        if (!this.supported.ui) {
          return;
        } // Update range

        if (is$1.element(this.elements.inputs.volume)) {
          controls.setRange.call(
            this,
            this.elements.inputs.volume,
            this.muted ? 0 : this.volume
          );
        } // Update mute state

        if (is$1.element(this.elements.buttons.mute)) {
          this.elements.buttons.mute.pressed = this.muted || this.volume === 0;
        }
      },
      // Update seek value and lower fill
      setRange: function setRange(target) {
        var value =
          arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (!is$1.element(target)) {
          return;
        } // eslint-disable-next-line

        target.value = value; // Webkit range fill

        controls.updateRangeFill.call(this, target);
      },
      // Update <progress> elements
      updateProgress: function updateProgress(event) {
        var _this4 = this;

        if (!this.supported.ui || !is$1.event(event)) {
          return;
        }

        var value = 0;

        var setProgress = function setProgress(target, input) {
          var value = is$1.number(input) ? input : 0;
          var progress = is$1.element(target)
            ? target
            : _this4.elements.display.buffer; // Update value and label

          if (is$1.element(progress)) {
            progress.value = value; // Update text label inside

            var label = progress.getElementsByTagName("span")[0];

            if (is$1.element(label)) {
              label.childNodes[0].nodeValue = value;
            }
          }
        };

        if (event) {
          switch (event.type) {
            // Video playing
            case "timeupdate":
            case "seeking":
            case "seeked":
              value = getPercentage(this.currentTime, this.duration); // Set seek range value only if it's a 'natural' time event

              if (event.type === "timeupdate") {
                controls.setRange.call(this, this.elements.inputs.seek, value);
              }

              break;
            // Check buffer status

            case "playing":
            case "progress":
              setProgress(this.elements.display.buffer, this.buffered * 100);
              break;

            default:
              break;
          }
        }
      },
      // Webkit polyfill for lower fill range
      updateRangeFill: function updateRangeFill(target) {
        // Get range from event if event passed
        var range = is$1.event(target) ? target.target : target; // Needs to be a valid <input type='range'>

        if (!is$1.element(range) || range.getAttribute("type") !== "range") {
          return;
        } // Set aria values for https://github.com/sampotts/plyr/issues/905

        if (matches$1(range, this.config.selectors.inputs.seek)) {
          range.setAttribute("aria-valuenow", this.currentTime);
          var currentTime = controls.formatTime(this.currentTime);
          var duration = controls.formatTime(this.duration);
          var format = i18n.get("seekLabel", this.config);
          range.setAttribute(
            "aria-valuetext",
            format
              .replace("{currentTime}", currentTime)
              .replace("{duration}", duration)
          );
        } else if (matches$1(range, this.config.selectors.inputs.volume)) {
          var percent = range.value * 100;
          range.setAttribute("aria-valuenow", percent);
          range.setAttribute(
            "aria-valuetext",
            "".concat(percent.toFixed(1), "%")
          );
        } else {
          range.setAttribute("aria-valuenow", range.value);
        } // WebKit only

        if (!browser.isWebkit) {
          return;
        } // Set CSS custom property

        range.style.setProperty(
          "--value",
          "".concat((range.value / range.max) * 100, "%")
        );
      },
      // Update hover tooltip for seeking
      updateSeekTooltip: function updateSeekTooltip(event) {
        var _this5 = this;

        // Bail if setting not true
        if (
          !this.config.tooltips.seek ||
          !is$1.element(this.elements.inputs.seek) ||
          !is$1.element(this.elements.display.seekTooltip) ||
          this.duration === 0
        ) {
          return;
        } // Calculate percentage

        var percent = 0;
        var clientRect = this.elements.progress.getBoundingClientRect();
        var visible = "".concat(this.config.classNames.tooltip, "--visible");

        var toggle = function toggle(_toggle) {
          toggleClass(_this5.elements.display.seekTooltip, visible, _toggle);
        }; // Hide on touch

        if (this.touch) {
          toggle(false);
          return;
        } // Determine percentage, if already visible

        if (is$1.event(event)) {
          percent = (100 / clientRect.width) * (event.pageX - clientRect.left);
        } else if (hasClass(this.elements.display.seekTooltip, visible)) {
          percent = parseFloat(
            this.elements.display.seekTooltip.style.left,
            10
          );
        } else {
          return;
        } // Set bounds

        if (percent < 0) {
          percent = 0;
        } else if (percent > 100) {
          percent = 100;
        } // Display the time a click would seek to

        controls.updateTimeDisplay.call(
          this,
          this.elements.display.seekTooltip,
          (this.duration / 100) * percent
        ); // Set position

        this.elements.display.seekTooltip.style.left = "".concat(percent, "%"); // Show/hide the tooltip
        // If the event is a moues in/out and percentage is inside bounds

        if (
          is$1.event(event) &&
          ["mouseenter", "mouseleave"].includes(event.type)
        ) {
          toggle(event.type === "mouseenter");
        }
      },
      // Handle time change event
      timeUpdate: function timeUpdate(event) {
        // Only invert if only one time element is displayed and used for both duration and currentTime
        var invert =
          !is$1.element(this.elements.display.duration) &&
          this.config.invertTime; // Duration

        controls.updateTimeDisplay.call(
          this,
          this.elements.display.currentTime,
          invert ? this.duration - this.currentTime : this.currentTime,
          invert
        ); // Ignore updates while seeking

        if (event && event.type === "timeupdate" && this.media.seeking) {
          return;
        } // Playing progress

        controls.updateProgress.call(this, event);
      },
      // Show the duration on metadataloaded or durationchange events
      durationUpdate: function durationUpdate() {
        // Bail if no UI or durationchange event triggered after playing/seek when invertTime is false
        if (
          !this.supported.ui ||
          (!this.config.invertTime && this.currentTime)
        ) {
          return;
        } // If duration is the 2**32 (shaka), Infinity (HLS), DASH-IF (Number.MAX_SAFE_INTEGER || Number.MAX_VALUE) indicating live we hide the currentTime and progressbar.
        // https://github.com/video-dev/hls.js/blob/5820d29d3c4c8a46e8b75f1e3afa3e68c1a9a2db/src/controller/buffer-controller.js#L415
        // https://github.com/google/shaka-player/blob/4d889054631f4e1cf0fbd80ddd2b71887c02e232/lib/media/streaming_engine.js#L1062
        // https://github.com/Dash-Industry-Forum/dash.js/blob/69859f51b969645b234666800d4cb596d89c602d/src/dash/models/DashManifestModel.js#L338

        if (this.duration >= Math.pow(2, 32)) {
          toggleHidden(this.elements.display.currentTime, true);
          toggleHidden(this.elements.progress, true);
          return;
        } // Update ARIA values

        if (is$1.element(this.elements.inputs.seek)) {
          this.elements.inputs.seek.setAttribute(
            "aria-valuemax",
            this.duration
          );
        } // If there's a spot to display duration

        var hasDuration = is$1.element(this.elements.display.duration); // If there's only one time display, display duration there

        if (!hasDuration && this.config.displayDuration && this.paused) {
          controls.updateTimeDisplay.call(
            this,
            this.elements.display.currentTime,
            this.duration
          );
        } // If there's a duration element, update content

        if (hasDuration) {
          controls.updateTimeDisplay.call(
            this,
            this.elements.display.duration,
            this.duration
          );
        } // Update the tooltip (if visible)

        controls.updateSeekTooltip.call(this);
      },
      // Hide/show a tab
      toggleMenuButton: function toggleMenuButton(setting, toggle) {
        toggleHidden(this.elements.settings.buttons[setting], !toggle);
      },
      // Update the selected setting
      updateSetting: function updateSetting(setting, container, input) {
        var pane = this.elements.settings.panels[setting];
        var value = null;
        var list = container;

        if (setting === "captions") {
          value = this.currentTrack;
        } else {
          value = !is$1.empty(input) ? input : this[setting]; // Get default

          if (is$1.empty(value)) {
            value = this.config[setting].default;
          } // Unsupported value

          if (
            !is$1.empty(this.options[setting]) &&
            !this.options[setting].includes(value)
          ) {
            this.debug.warn(
              "Unsupported value of '".concat(value, "' for ").concat(setting)
            );
            return;
          } // Disabled value

          if (!this.config[setting].options.includes(value)) {
            this.debug.warn(
              "Disabled value of '".concat(value, "' for ").concat(setting)
            );
            return;
          }
        } // Get the list if we need to

        if (!is$1.element(list)) {
          list = pane && pane.querySelector('[role="menu"]');
        } // If there's no list it means it's not been rendered...

        if (!is$1.element(list)) {
          return;
        } // Update the label

        var label = this.elements.settings.buttons[setting].querySelector(
          ".".concat(this.config.classNames.menu.value)
        );
        label.innerHTML = controls.getLabel.call(this, setting, value); // Find the radio option and check it

        var target = list && list.querySelector('[value="'.concat(value, '"]'));

        if (is$1.element(target)) {
          target.checked = true;
        }
      },
      // Translate a value into a nice label
      getLabel: function getLabel(setting, value) {
        switch (setting) {
          case "speed":
            return value === 1
              ? i18n.get("normal", this.config)
              : "".concat(value, "&times;");

          case "quality":
            if (is$1.number(value)) {
              var label = i18n.get("qualityLabel.".concat(value), this.config);

              if (!label.length) {
                return "".concat(value, "p");
              }

              return label;
            }

            return toTitleCase(value);

          case "captions":
            return captions.getLabel.call(this);

          default:
            return null;
        }
      },
      // Set the quality menu
      setQualityMenu: function setQualityMenu(options) {
        var _this6 = this;

        // Menu required
        if (!is$1.element(this.elements.settings.panels.quality)) {
          return;
        }

        var type = "quality";
        var list =
          this.elements.settings.panels.quality.querySelector('[role="menu"]'); // Set options if passed and filter based on uniqueness and config

        if (is$1.array(options)) {
          this.options.quality = dedupe(options).filter(function (quality) {
            return _this6.config.quality.options.includes(quality);
          });
        } // Toggle the pane and tab

        var toggle =
          !is$1.empty(this.options.quality) && this.options.quality.length > 1;
        controls.toggleMenuButton.call(this, type, toggle); // Empty the menu

        emptyElement(list); // Check if we need to toggle the parent

        controls.checkMenu.call(this); // If we're hiding, nothing more to do

        if (!toggle) {
          return;
        } // Get the badge HTML for HD, 4K etc

        var getBadge = function getBadge(quality) {
          var label = i18n.get("qualityBadge.".concat(quality), _this6.config);

          if (!label.length) {
            return null;
          }

          return controls.createBadge.call(_this6, label);
        }; // Sort options by the config and then render options

        this.options.quality
          .sort(function (a, b) {
            var sorting = _this6.config.quality.options;
            return sorting.indexOf(a) > sorting.indexOf(b) ? 1 : -1;
          })
          .forEach(function (quality) {
            controls.createMenuItem.call(_this6, {
              value: quality,
              list: list,
              type: type,
              title: controls.getLabel.call(_this6, "quality", quality),
              badge: getBadge(quality),
            });
          });
        controls.updateSetting.call(this, type, list);
      },
      // Set the looping options

      /* setLoopMenu() {
        // Menu required
        if (!is.element(this.elements.settings.panels.loop)) {
            return;
        }
         const options = ['start', 'end', 'all', 'reset'];
        const list = this.elements.settings.panels.loop.querySelector('[role="menu"]');
         // Show the pane and tab
        toggleHidden(this.elements.settings.buttons.loop, false);
        toggleHidden(this.elements.settings.panels.loop, false);
         // Toggle the pane and tab
        const toggle = !is.empty(this.loop.options);
        controls.toggleMenuButton.call(this, 'loop', toggle);
         // Empty the menu
        emptyElement(list);
         options.forEach(option => {
            const item = createElement('li');
             const button = createElement(
                'button',
                extend(getAttributesFromSelector(this.config.selectors.buttons.loop), {
                    type: 'button',
                    class: this.config.classNames.control,
                    'data-plyr-loop-action': option,
                }),
                i18n.get(option, this.config)
            );
             if (['start', 'end'].includes(option)) {
                const badge = controls.createBadge.call(this, '00:00');
                button.appendChild(badge);
            }
             item.appendChild(button);
            list.appendChild(item);
        });
    }, */
      // Get current selected caption language
      // TODO: rework this to user the getter in the API?
      // Set a list of available captions languages
      setCaptionsMenu: function setCaptionsMenu() {
        var _this7 = this;

        // Menu required
        if (!is$1.element(this.elements.settings.panels.captions)) {
          return;
        } // TODO: Captions or language? Currently it's mixed

        var type = "captions";
        var list =
          this.elements.settings.panels.captions.querySelector('[role="menu"]');
        var tracks = captions.getTracks.call(this);
        var toggle = Boolean(tracks.length); // Toggle the pane and tab

        controls.toggleMenuButton.call(this, type, toggle); // Empty the menu

        emptyElement(list); // Check if we need to toggle the parent

        controls.checkMenu.call(this); // If there's no captions, bail

        if (!toggle) {
          return;
        } // Generate options data

        var options = tracks.map(function (track, value) {
          return {
            value: value,
            checked: _this7.captions.toggled && _this7.currentTrack === value,
            title: captions.getLabel.call(_this7, track),
            badge:
              track.language &&
              controls.createBadge.call(_this7, track.language.toUpperCase()),
            list: list,
            type: "language",
          };
        }); // Add the "Disabled" option to turn off captions

        options.unshift({
          value: -1,
          checked: !this.captions.toggled,
          title: i18n.get("disabled", this.config),
          list: list,
          type: "language",
        }); // Generate options

        options.forEach(controls.createMenuItem.bind(this));
        controls.updateSetting.call(this, type, list);
      },
      // Set a list of available captions languages
      setSpeedMenu: function setSpeedMenu(options) {
        var _this8 = this;

        // Menu required
        if (!is$1.element(this.elements.settings.panels.speed)) {
          return;
        }

        var type = "speed";
        var list =
          this.elements.settings.panels.speed.querySelector('[role="menu"]'); // Set the speed options

        if (is$1.array(options)) {
          this.options.speed = options;
        } else if (this.isHTML5 || this.isVimeo) {
          this.options.speed = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
        } // Set options if passed and filter based on config

        this.options.speed = this.options.speed.filter(function (speed) {
          return _this8.config.speed.options.includes(speed);
        }); // Toggle the pane and tab

        var toggle =
          !is$1.empty(this.options.speed) && this.options.speed.length > 1;
        controls.toggleMenuButton.call(this, type, toggle); // Empty the menu

        emptyElement(list); // Check if we need to toggle the parent

        controls.checkMenu.call(this); // If we're hiding, nothing more to do

        if (!toggle) {
          return;
        } // Create items

        this.options.speed.forEach(function (speed) {
          controls.createMenuItem.call(_this8, {
            value: speed,
            list: list,
            type: type,
            title: controls.getLabel.call(_this8, "speed", speed),
          });
        });
        controls.updateSetting.call(this, type, list);
      },
      // Check if we need to hide/show the settings menu
      checkMenu: function checkMenu() {
        var buttons = this.elements.settings.buttons;
        var visible =
          !is$1.empty(buttons) &&
          Object.values(buttons).some(function (button) {
            return !button.hidden;
          });
        toggleHidden(this.elements.settings.menu, !visible);
      },
      // Focus the first menu item in a given (or visible) menu
      focusFirstMenuItem: function focusFirstMenuItem(pane) {
        var tabFocus =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : false;

        if (this.elements.settings.popup.hidden) {
          return;
        }

        var target = pane;

        if (!is$1.element(target)) {
          target = Object.values(this.elements.settings.panels).find(function (
            pane
          ) {
            return !pane.hidden;
          });
        }

        var firstItem = target.querySelector('[role^="menuitem"]');
        setFocus.call(this, firstItem, tabFocus);
      },
      // Show/hide menu
      toggleMenu: function toggleMenu(input) {
        var popup = this.elements.settings.popup;
        var button = this.elements.buttons.settings; // Menu and button are required

        if (!is$1.element(popup) || !is$1.element(button)) {
          return;
        } // True toggle by default

        var hidden = popup.hidden;
        var show = hidden;

        if (is$1.boolean(input)) {
          show = input;
        } else if (is$1.keyboardEvent(input) && input.which === 27) {
          show = false;
        } else if (is$1.event(input)) {
          // If Plyr is in a shadowDOM, the event target is set to the component, instead of the
          // Element in the shadowDOM. The path, if available, is complete.
          var target = is$1.function(input.composedPath)
            ? input.composedPath()[0]
            : input.target;
          var isMenuItem = popup.contains(target); // If the click was inside the menu or if the click
          // wasn't the button or menu item and we're trying to
          // show the menu (a doc click shouldn't show the menu)

          if (isMenuItem || (!isMenuItem && input.target !== button && show)) {
            return;
          }
        } // Set button attributes

        button.setAttribute("aria-expanded", show); // Show the actual popup

        toggleHidden(popup, !show); // Add class hook

        toggleClass(
          this.elements.container,
          this.config.classNames.menu.open,
          show
        ); // Focus the first item if key interaction

        if (show && is$1.keyboardEvent(input)) {
          controls.focusFirstMenuItem.call(this, null, true);
        } else if (!show && !hidden) {
          // If closing, re-focus the button
          setFocus.call(this, button, is$1.keyboardEvent(input));
        }
      },
      // Get the natural size of a menu panel
      getMenuSize: function getMenuSize(tab) {
        var clone = tab.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.opacity = 0;
        clone.removeAttribute("hidden"); // Append to parent so we get the "real" size

        tab.parentNode.appendChild(clone); // Get the sizes before we remove

        var width = clone.scrollWidth;
        var height = clone.scrollHeight; // Remove from the DOM

        removeElement(clone);
        return {
          width: width,
          height: height,
        };
      },
      // Show a panel in the menu
      showMenuPanel: function showMenuPanel() {
        var _this9 = this;

        var type =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : "";
        var tabFocus =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : false;
        var target = this.elements.container.querySelector(
          "#plyr-settings-".concat(this.id, "-").concat(type)
        ); // Nothing to show, bail

        if (!is$1.element(target)) {
          return;
        } // Hide all other panels

        var container = target.parentNode;
        var current = Array.from(container.children).find(function (node) {
          return !node.hidden;
        }); // If we can do fancy animations, we'll animate the height/width

        if (support.transitions && !support.reducedMotion) {
          // Set the current width as a base
          container.style.width = "".concat(current.scrollWidth, "px");
          container.style.height = "".concat(current.scrollHeight, "px"); // Get potential sizes

          var size = controls.getMenuSize.call(this, target); // Restore auto height/width

          var restore = function restore(event) {
            // We're only bothered about height and width on the container
            if (
              event.target !== container ||
              !["width", "height"].includes(event.propertyName)
            ) {
              return;
            } // Revert back to auto

            container.style.width = "";
            container.style.height = ""; // Only listen once

            off.call(_this9, container, transitionEndEvent, restore);
          }; // Listen for the transition finishing and restore auto height/width

          on.call(this, container, transitionEndEvent, restore); // Set dimensions to target

          container.style.width = "".concat(size.width, "px");
          container.style.height = "".concat(size.height, "px");
        } // Set attributes on current tab

        toggleHidden(current, true); // Set attributes on target

        toggleHidden(target, false); // Focus the first item

        controls.focusFirstMenuItem.call(this, target, tabFocus);
      },
      // Set the download URL
      setDownloadUrl: function setDownloadUrl() {
        var button = this.elements.buttons.download; // Bail if no button

        if (!is$1.element(button)) {
          return;
        } // Set attribute

        button.setAttribute("href", this.download);
      },
      // Build the default HTML
      create: function create(data) {
        var _this10 = this;

        var bindMenuItemShortcuts = controls.bindMenuItemShortcuts,
          createButton = controls.createButton,
          createProgress = controls.createProgress,
          createRange = controls.createRange,
          createTime = controls.createTime,
          setQualityMenu = controls.setQualityMenu,
          setSpeedMenu = controls.setSpeedMenu,
          showMenuPanel = controls.showMenuPanel;
        this.elements.controls = null; // Larger overlaid play button

        if (this.config.controls.includes("play-large")) {
          this.elements.container.appendChild(
            createButton.call(this, "play-large")
          );
        } // Create the container

        var container = createElement(
          "div",
          getAttributesFromSelector(this.config.selectors.controls.wrapper)
        );
        this.elements.controls = container; // Default item attributes

        var defaultAttributes = {
          class: "plyr__controls__item",
        }; // Loop through controls in order

        dedupe(this.config.controls).forEach(function (control) {
          // Restart button
          if (control === "restart") {
            container.appendChild(
              createButton.call(_this10, "restart", defaultAttributes)
            );
          } // Rewind button

          if (control === "rewind") {
            container.appendChild(
              createButton.call(_this10, "rewind", defaultAttributes)
            );
          } // Play/Pause button

          if (control === "play") {
            container.appendChild(
              createButton.call(_this10, "play", defaultAttributes)
            );
          } // Fast forward button

          if (control === "fast-forward") {
            container.appendChild(
              createButton.call(_this10, "fast-forward", defaultAttributes)
            );
          } // Progress

          if (control === "progress") {
            var progressContainer = createElement("div", {
              class: "".concat(
                defaultAttributes.class,
                " plyr__progress__container"
              ),
            });
            var progress = createElement(
              "div",
              getAttributesFromSelector(_this10.config.selectors.progress)
            ); // Seek range slider

            progress.appendChild(
              createRange.call(_this10, "seek", {
                id: "plyr-seek-".concat(data.id),
              })
            ); // Buffer progress

            progress.appendChild(createProgress.call(_this10, "buffer")); // TODO: Add loop display indicator
            // Seek tooltip

            if (_this10.config.tooltips.seek) {
              var tooltip = createElement(
                "span",
                {
                  class: _this10.config.classNames.tooltip,
                },
                "00:00"
              );
              progress.appendChild(tooltip);
              _this10.elements.display.seekTooltip = tooltip;
            }

            _this10.elements.progress = progress;
            progressContainer.appendChild(_this10.elements.progress);
            container.appendChild(progressContainer);
          } // Media current time display

          if (control === "current-time") {
            container.appendChild(
              createTime.call(_this10, "currentTime", defaultAttributes)
            );
          } // Media duration display

          if (control === "duration") {
            container.appendChild(
              createTime.call(_this10, "duration", defaultAttributes)
            );
          } // Volume controls

          if (control === "mute" || control === "volume") {
            var volume = _this10.elements.volume; // Create the volume container if needed

            if (!is$1.element(volume) || !container.contains(volume)) {
              volume = createElement(
                "div",
                extend({}, defaultAttributes, {
                  class: ""
                    .concat(defaultAttributes.class, " plyr__volume")
                    .trim(),
                })
              );
              _this10.elements.volume = volume;
              container.appendChild(volume);
            } // Toggle mute button

            if (control === "mute") {
              volume.appendChild(createButton.call(_this10, "mute"));
            } // Volume range control

            if (control === "volume") {
              // Set the attributes
              var attributes = {
                max: 1,
                step: 0.05,
                value: _this10.config.volume,
              }; // Create the volume range slider

              volume.appendChild(
                createRange.call(
                  _this10,
                  "volume",
                  extend(attributes, {
                    id: "plyr-volume-".concat(data.id),
                  })
                )
              );
            }
          } // Toggle captions button

          if (control === "captions") {
            container.appendChild(
              createButton.call(_this10, "captions", defaultAttributes)
            );
          } // Settings button / menu

          if (control === "settings" && !is$1.empty(_this10.config.settings)) {
            var _control = createElement(
              "div",
              extend({}, defaultAttributes, {
                class: "".concat(defaultAttributes.class, " plyr__menu").trim(),
                hidden: "",
              })
            );

            _control.appendChild(
              createButton.call(_this10, "settings", {
                "aria-haspopup": true,
                "aria-controls": "plyr-settings-".concat(data.id),
                "aria-expanded": false,
              })
            );

            var popup = createElement("div", {
              class: "plyr__menu__container",
              id: "plyr-settings-".concat(data.id),
              hidden: "",
            });
            var inner = createElement("div");
            var home = createElement("div", {
              id: "plyr-settings-".concat(data.id, "-home"),
            }); // Create the menu

            var menu = createElement("div", {
              role: "menu",
            });
            home.appendChild(menu);
            inner.appendChild(home);
            _this10.elements.settings.panels.home = home; // Build the menu items

            _this10.config.settings.forEach(function (type) {
              // TODO: bundle this with the createMenuItem helper and bindings
              var menuItem = createElement(
                "button",
                extend(
                  getAttributesFromSelector(
                    _this10.config.selectors.buttons.settings
                  ),
                  {
                    type: "button",
                    class: ""
                      .concat(_this10.config.classNames.control, " ")
                      .concat(_this10.config.classNames.control, "--forward"),
                    role: "menuitem",
                    "aria-haspopup": true,
                    hidden: "",
                  }
                )
              ); // Bind menu shortcuts for keyboard users

              bindMenuItemShortcuts.call(_this10, menuItem, type); // Show menu on click

              on(menuItem, "click", function () {
                showMenuPanel.call(_this10, type, false);
              });
              var flex = createElement(
                "span",
                null,
                i18n.get(type, _this10.config)
              );
              var value = createElement("span", {
                class: _this10.config.classNames.menu.value,
              }); // Speed contains HTML entities

              value.innerHTML = data[type];
              flex.appendChild(value);
              menuItem.appendChild(flex);
              menu.appendChild(menuItem); // Build the panes

              var pane = createElement("div", {
                id: "plyr-settings-".concat(data.id, "-").concat(type),
                hidden: "",
              }); // Back button

              var backButton = createElement("button", {
                type: "button",
                class: ""
                  .concat(_this10.config.classNames.control, " ")
                  .concat(_this10.config.classNames.control, "--back"),
              }); // Visible label

              backButton.appendChild(
                createElement(
                  "span",
                  {
                    "aria-hidden": true,
                  },
                  i18n.get(type, _this10.config)
                )
              ); // Screen reader label

              backButton.appendChild(
                createElement(
                  "span",
                  {
                    class: _this10.config.classNames.hidden,
                  },
                  i18n.get("menuBack", _this10.config)
                )
              ); // Go back via keyboard

              on(
                pane,
                "keydown",
                function (event) {
                  // We only care about <-
                  if (event.which !== 37) {
                    return;
                  } // Prevent seek

                  event.preventDefault();
                  event.stopPropagation(); // Show the respective menu

                  showMenuPanel.call(_this10, "home", true);
                },
                false
              ); // Go back via button click

              on(backButton, "click", function () {
                showMenuPanel.call(_this10, "home", false);
              }); // Add to pane

              pane.appendChild(backButton); // Menu

              pane.appendChild(
                createElement("div", {
                  role: "menu",
                })
              );
              inner.appendChild(pane);
              _this10.elements.settings.buttons[type] = menuItem;
              _this10.elements.settings.panels[type] = pane;
            });

            popup.appendChild(inner);

            _control.appendChild(popup);

            container.appendChild(_control);
            _this10.elements.settings.popup = popup;
            _this10.elements.settings.menu = _control;
          } // Picture in picture button

          if (control === "pip" && support.pip) {
            container.appendChild(
              createButton.call(_this10, "pip", defaultAttributes)
            );
          } // Airplay button

          if (control === "airplay" && support.airplay) {
            container.appendChild(
              createButton.call(_this10, "airplay", defaultAttributes)
            );
          } // Download button

          if (control === "download") {
            var _attributes = extend({}, defaultAttributes, {
              element: "a",
              href: _this10.download,
              target: "_blank",
            });

            var download = _this10.config.urls.download;

            if (!is$1.url(download) && _this10.isEmbed) {
              extend(_attributes, {
                icon: "logo-".concat(_this10.provider),
                label: _this10.provider,
              });
            }

            container.appendChild(
              createButton.call(_this10, "download", _attributes)
            );
          } // Toggle fullscreen button

          if (control === "fullscreen") {
            container.appendChild(
              createButton.call(_this10, "fullscreen", defaultAttributes)
            );
          }
        }); // Set available quality levels

        if (this.isHTML5) {
          setQualityMenu.call(this, html5.getQualityOptions.call(this));
        }

        setSpeedMenu.call(this);
        return container;
      },
      // Insert controls
      inject: function inject() {
        var _this11 = this;

        // Sprite
        if (this.config.loadSprite) {
          var icon = controls.getIconUrl.call(this); // Only load external sprite using AJAX

          if (icon.cors) {
            loadSprite(icon.url, "sprite-plyr");
          }
        } // Create a unique ID

        this.id = Math.floor(Math.random() * 10000); // Null by default

        var container = null;
        this.elements.controls = null; // Set template properties

        var props = {
          id: this.id,
          seektime: this.config.seekTime,
          title: this.config.title,
        };
        var update = true; // If function, run it and use output

        if (is$1.function(this.config.controls)) {
          this.config.controls = this.config.controls.call(this, props);
        } // Convert falsy controls to empty array (primarily for empty strings)

        if (!this.config.controls) {
          this.config.controls = [];
        }

        if (
          is$1.element(this.config.controls) ||
          is$1.string(this.config.controls)
        ) {
          // HTMLElement or Non-empty string passed as the option
          container = this.config.controls;
        } else {
          // Create controls
          container = controls.create.call(this, {
            id: this.id,
            seektime: this.config.seekTime,
            speed: this.speed,
            quality: this.quality,
            captions: captions.getLabel.call(this), // TODO: Looping
            // loop: 'None',
          });
          update = false;
        } // Replace props with their value

        var replace = function replace(input) {
          var result = input;
          Object.entries(props).forEach(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
              key = _ref3[0],
              value = _ref3[1];

            result = replaceAll(result, "{".concat(key, "}"), value);
          });
          return result;
        }; // Update markup

        if (update) {
          if (is$1.string(this.config.controls)) {
            container = replace(container);
          } else if (is$1.element(container)) {
            container.innerHTML = replace(container.innerHTML);
          }
        } // Controls container

        var target; // Inject to custom location

        if (is$1.string(this.config.selectors.controls.container)) {
          target = document.querySelector(
            this.config.selectors.controls.container
          );
        } // Inject into the container by default

        if (!is$1.element(target)) {
          target = this.elements.container;
        } // Inject controls HTML (needs to be before captions, hence "afterbegin")

        var insertMethod = is$1.element(container)
          ? "insertAdjacentElement"
          : "insertAdjacentHTML";
        target[insertMethod]("afterbegin", container); // Find the elements if need be

        if (!is$1.element(this.elements.controls)) {
          controls.findElements.call(this);
        } // Add pressed property to buttons

        if (!is$1.empty(this.elements.buttons)) {
          var addProperty = function addProperty(button) {
            var className = _this11.config.classNames.controlPressed;
            Object.defineProperty(button, "pressed", {
              enumerable: true,
              get: function get() {
                return hasClass(button, className);
              },
              set: function set() {
                var pressed =
                  arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : false;
                toggleClass(button, className, pressed);
              },
            });
          }; // Toggle classname when pressed property is set

          Object.values(this.elements.buttons)
            .filter(Boolean)
            .forEach(function (button) {
              if (is$1.array(button) || is$1.nodeList(button)) {
                Array.from(button).filter(Boolean).forEach(addProperty);
              } else {
                addProperty(button);
              }
            });
        } // Edge sometimes doesn't finish the paint so force a repaint

        if (browser.isEdge) {
          repaint(target);
        } // Setup tooltips

        if (this.config.tooltips.controls) {
          var _this$config = this.config,
            classNames = _this$config.classNames,
            selectors = _this$config.selectors;
          var selector = ""
            .concat(selectors.controls.wrapper, " ")
            .concat(selectors.labels, " .")
            .concat(classNames.hidden);
          var labels = getElements.call(this, selector);
          Array.from(labels).forEach(function (label) {
            toggleClass(label, _this11.config.classNames.hidden, false);
            toggleClass(label, _this11.config.classNames.tooltip, true);
          });
        }
      },
    };

    /**
     * Parse a string to a URL object
     * @param {String} input - the URL to be parsed
     * @param {Boolean} safe - failsafe parsing
     */

    function parseUrl(input) {
      var safe =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : true;
      var url = input;

      if (safe) {
        var parser = document.createElement("a");
        parser.href = url;
        url = parser.href;
      }

      try {
        return new URL(url);
      } catch (e) {
        return null;
      }
    } // Convert object to URLSearchParams

    function buildUrlParams(input) {
      var params = new URLSearchParams();

      if (is$1.object(input)) {
        Object.entries(input).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

          params.set(key, value);
        });
      }

      return params;
    }

    var captions = {
      // Setup captions
      setup: function setup() {
        // Requires UI support
        if (!this.supported.ui) {
          return;
        } // Only Vimeo and HTML5 video supported at this point

        if (
          !this.isVideo ||
          this.isYouTube ||
          (this.isHTML5 && !support.textTracks)
        ) {
          // Clear menu and hide
          if (
            is$1.array(this.config.controls) &&
            this.config.controls.includes("settings") &&
            this.config.settings.includes("captions")
          ) {
            controls.setCaptionsMenu.call(this);
          }

          return;
        } // Inject the container

        if (!is$1.element(this.elements.captions)) {
          this.elements.captions = createElement(
            "div",
            getAttributesFromSelector(this.config.selectors.captions)
          );
          insertAfter(this.elements.captions, this.elements.wrapper);
        } // Fix IE captions if CORS is used
        // Fetch captions and inject as blobs instead (data URIs not supported!)

        if (browser.isIE && window.URL) {
          var elements = this.media.querySelectorAll("track");
          Array.from(elements).forEach(function (track) {
            var src = track.getAttribute("src");
            var url = parseUrl(src);

            if (
              url !== null &&
              url.hostname !== window.location.href.hostname &&
              ["http:", "https:"].includes(url.protocol)
            ) {
              fetch(src, "blob")
                .then(function (blob) {
                  track.setAttribute("src", window.URL.createObjectURL(blob));
                })
                .catch(function () {
                  removeElement(track);
                });
            }
          });
        } // Get and set initial data
        // The "preferred" options are not realized unless / until the wanted language has a match
        // * languages: Array of user's browser languages.
        // * language:  The language preferred by user settings or config
        // * active:    The state preferred by user settings or config
        // * toggled:   The real captions state

        var browserLanguages = navigator.languages || [
          navigator.language || navigator.userLanguage || "en",
        ];
        var languages = dedupe(
          browserLanguages.map(function (language) {
            return language.split("-")[0];
          })
        );
        var language = (
          this.storage.get("language") ||
          this.config.captions.language ||
          "auto"
        ).toLowerCase(); // Use first browser language when language is 'auto'

        if (language === "auto") {
          var _languages = _slicedToArray(languages, 1);

          language = _languages[0];
        }

        var active = this.storage.get("captions");

        if (!is$1.boolean(active)) {
          active = this.config.captions.active;
        }

        Object.assign(this.captions, {
          toggled: false,
          active: active,
          language: language,
          languages: languages,
        }); // Watch changes to textTracks and update captions menu

        if (this.isHTML5) {
          var trackEvents = this.config.captions.update
            ? "addtrack removetrack"
            : "removetrack";
          on.call(
            this,
            this.media.textTracks,
            trackEvents,
            captions.update.bind(this)
          );
        } // Update available languages in list next tick (the event must not be triggered before the listeners)

        setTimeout(captions.update.bind(this), 0);
      },
      // Update available language options in settings based on tracks
      update: function update() {
        var _this = this;

        var tracks = captions.getTracks.call(this, true); // Get the wanted language

        var _this$captions = this.captions,
          active = _this$captions.active,
          language = _this$captions.language,
          meta = _this$captions.meta,
          currentTrackNode = _this$captions.currentTrackNode;
        var languageExists = Boolean(
          tracks.find(function (track) {
            return track.language === language;
          })
        ); // Handle tracks (add event listener and "pseudo"-default)

        if (this.isHTML5 && this.isVideo) {
          tracks
            .filter(function (track) {
              return !meta.get(track);
            })
            .forEach(function (track) {
              _this.debug.log("Track added", track); // Attempt to store if the original dom element was "default"

              meta.set(track, {
                default: track.mode === "showing",
              }); // Turn off native caption rendering to avoid double captions

              track.mode = "hidden"; // Add event listener for cue changes

              on.call(_this, track, "cuechange", function () {
                return captions.updateCues.call(_this);
              });
            });
        } // Update language first time it matches, or if the previous matching track was removed

        if (
          (languageExists && this.language !== language) ||
          !tracks.includes(currentTrackNode)
        ) {
          captions.setLanguage.call(this, language);
          captions.toggle.call(this, active && languageExists);
        } // Enable or disable captions based on track length

        toggleClass(
          this.elements.container,
          this.config.classNames.captions.enabled,
          !is$1.empty(tracks)
        ); // Update available languages in list

        if (
          (this.config.controls || []).includes("settings") &&
          this.config.settings.includes("captions")
        ) {
          controls.setCaptionsMenu.call(this);
        }
      },
      // Toggle captions display
      // Used internally for the toggleCaptions method, with the passive option forced to false
      toggle: function toggle(input) {
        var passive =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : true;

        // If there's no full support
        if (!this.supported.ui) {
          return;
        }

        var toggled = this.captions.toggled; // Current state

        var activeClass = this.config.classNames.captions.active; // Get the next state
        // If the method is called without parameter, toggle based on current value

        var active = is$1.nullOrUndefined(input) ? !toggled : input; // Update state and trigger event

        if (active !== toggled) {
          // When passive, don't override user preferences
          if (!passive) {
            this.captions.active = active;
            this.storage.set({
              captions: active,
            });
          } // Force language if the call isn't passive and there is no matching language to toggle to

          if (!this.language && active && !passive) {
            var tracks = captions.getTracks.call(this);
            var track = captions.findTrack.call(
              this,
              [this.captions.language].concat(
                _toConsumableArray(this.captions.languages)
              ),
              true
            ); // Override user preferences to avoid switching languages if a matching track is added

            this.captions.language = track.language; // Set caption, but don't store in localStorage as user preference

            captions.set.call(this, tracks.indexOf(track));
            return;
          } // Toggle button if it's enabled

          if (this.elements.buttons.captions) {
            this.elements.buttons.captions.pressed = active;
          } // Add class hook

          toggleClass(this.elements.container, activeClass, active);
          this.captions.toggled = active; // Update settings menu

          controls.updateSetting.call(this, "captions"); // Trigger event (not used internally)

          triggerEvent.call(
            this,
            this.media,
            active ? "captionsenabled" : "captionsdisabled"
          );
        }
      },
      // Set captions by track index
      // Used internally for the currentTrack setter with the passive option forced to false
      set: function set(index) {
        var passive =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : true;
        var tracks = captions.getTracks.call(this); // Disable captions if setting to -1

        if (index === -1) {
          captions.toggle.call(this, false, passive);
          return;
        }

        if (!is$1.number(index)) {
          this.debug.warn("Invalid caption argument", index);
          return;
        }

        if (!(index in tracks)) {
          this.debug.warn("Track not found", index);
          return;
        }

        if (this.captions.currentTrack !== index) {
          this.captions.currentTrack = index;
          var track = tracks[index];

          var _ref = track || {},
            language = _ref.language; // Store reference to node for invalidation on remove

          this.captions.currentTrackNode = track; // Update settings menu

          controls.updateSetting.call(this, "captions"); // When passive, don't override user preferences

          if (!passive) {
            this.captions.language = language;
            this.storage.set({
              language: language,
            });
          } // Handle Vimeo captions

          if (this.isVimeo) {
            this.embed.enableTextTrack(language);
          } // Trigger event

          triggerEvent.call(this, this.media, "languagechange");
        } // Show captions

        captions.toggle.call(this, true, passive);

        if (this.isHTML5 && this.isVideo) {
          // If we change the active track while a cue is already displayed we need to update it
          captions.updateCues.call(this);
        }
      },
      // Set captions by language
      // Used internally for the language setter with the passive option forced to false
      setLanguage: function setLanguage(input) {
        var passive =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : true;

        if (!is$1.string(input)) {
          this.debug.warn("Invalid language argument", input);
          return;
        } // Normalize

        var language = input.toLowerCase();
        this.captions.language = language; // Set currentTrack

        var tracks = captions.getTracks.call(this);
        var track = captions.findTrack.call(this, [language]);
        captions.set.call(this, tracks.indexOf(track), passive);
      },
      // Get current valid caption tracks
      // If update is false it will also ignore tracks without metadata
      // This is used to "freeze" the language options when captions.update is false
      getTracks: function getTracks() {
        var _this2 = this;

        var update =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : false;
        // Handle media or textTracks missing or null
        var tracks = Array.from((this.media || {}).textTracks || []); // For HTML5, use cache instead of current tracks when it exists (if captions.update is false)
        // Filter out removed tracks and tracks that aren't captions/subtitles (for example metadata)

        return tracks
          .filter(function (track) {
            return !_this2.isHTML5 || update || _this2.captions.meta.has(track);
          })
          .filter(function (track) {
            return ["captions", "subtitles"].includes(track.kind);
          });
      },
      // Match tracks based on languages and get the first
      findTrack: function findTrack(languages) {
        var _this3 = this;

        var force =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : false;
        var tracks = captions.getTracks.call(this);

        var sortIsDefault = function sortIsDefault(track) {
          return Number((_this3.captions.meta.get(track) || {}).default);
        };

        var sorted = Array.from(tracks).sort(function (a, b) {
          return sortIsDefault(b) - sortIsDefault(a);
        });
        var track;
        languages.every(function (language) {
          track = sorted.find(function (track) {
            return track.language === language;
          });
          return !track; // Break iteration if there is a match
        }); // If no match is found but is required, get first

        return track || (force ? sorted[0] : undefined);
      },
      // Get the current track
      getCurrentTrack: function getCurrentTrack() {
        return captions.getTracks.call(this)[this.currentTrack];
      },
      // Get UI label for track
      getLabel: function getLabel(track) {
        var currentTrack = track;

        if (
          !is$1.track(currentTrack) &&
          support.textTracks &&
          this.captions.toggled
        ) {
          currentTrack = captions.getCurrentTrack.call(this);
        }

        if (is$1.track(currentTrack)) {
          if (!is$1.empty(currentTrack.label)) {
            return currentTrack.label;
          }

          if (!is$1.empty(currentTrack.language)) {
            return track.language.toUpperCase();
          }

          return i18n.get("enabled", this.config);
        }

        return i18n.get("disabled", this.config);
      },
      // Update captions using current track's active cues
      // Also optional array argument in case there isn't any track (ex: vimeo)
      updateCues: function updateCues(input) {
        // Requires UI
        if (!this.supported.ui) {
          return;
        }

        if (!is$1.element(this.elements.captions)) {
          this.debug.warn("No captions element to render to");
          return;
        } // Only accept array or empty input

        if (!is$1.nullOrUndefined(input) && !Array.isArray(input)) {
          this.debug.warn("updateCues: Invalid input", input);
          return;
        }

        var cues = input; // Get cues from track

        if (!cues) {
          var track = captions.getCurrentTrack.call(this);
          cues = Array.from((track || {}).activeCues || [])
            .map(function (cue) {
              return cue.getCueAsHTML();
            })
            .map(getHTML);
        } // Set new caption text

        var content = cues
          .map(function (cueText) {
            return cueText.trim();
          })
          .join("\n");
        var changed = content !== this.elements.captions.innerHTML;

        if (changed) {
          // Empty the container and create a new child element
          emptyElement(this.elements.captions);
          var caption = createElement(
            "span",
            getAttributesFromSelector(this.config.selectors.caption)
          );
          caption.innerHTML = content;
          this.elements.captions.appendChild(caption); // Trigger event

          triggerEvent.call(this, this.media, "cuechange");
        }
      },
    };

    // ==========================================================================
    // Plyr default config
    // ==========================================================================
    var defaults$1 = {
      // Disable
      enabled: true,
      // Custom media title
      title: "",
      // Logging to console
      debug: false,
      // Auto play (if supported)
      autoplay: false,
      // Only allow one media playing at once (vimeo only)
      autopause: true,
      // Allow inline playback on iOS (this effects YouTube/Vimeo - HTML5 requires the attribute present)
      // TODO: Remove iosNative fullscreen option in favour of this (logic needs work)
      playsinline: true,
      // Default time to skip when rewind/fast forward
      seekTime: 10,
      // Default volume
      volume: 1,
      muted: false,
      // Pass a custom duration
      duration: null,
      // Display the media duration on load in the current time position
      // If you have opted to display both duration and currentTime, this is ignored
      displayDuration: true,
      // Invert the current time to be a countdown
      invertTime: true,
      // Clicking the currentTime inverts it's value to show time left rather than elapsed
      toggleInvert: true,
      // Force an aspect ratio
      // The format must be `'w:h'` (e.g. `'16:9'`)
      ratio: null,
      // Click video container to play/pause
      clickToPlay: true,
      // Auto hide the controls
      hideControls: true,
      // Reset to start when playback ended
      resetOnEnd: false,
      // Disable the standard context menu
      disableContextMenu: true,
      // Sprite (for icons)
      loadSprite: true,
      iconPrefix: "plyr",
      iconUrl: "https://cdn.plyr.io/3.5.4/plyr.svg",
      // Blank video (used to prevent errors on source change)
      blankVideo: "https://cdn.plyr.io/static/blank.mp4",
      // Quality default
      quality: {
        default: 576,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      },
      // Set loops
      loop: {
        active: false, // start: null,
        // end: null,
      },
      // Speed default and options to display
      speed: {
        selected: 1,
        options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      },
      // Keyboard shortcut settings
      keyboard: {
        focused: true,
        global: false,
      },
      // Display tooltips
      tooltips: {
        controls: false,
        seek: true,
      },
      // Captions settings
      captions: {
        active: false,
        language: "auto",
        // Listen to new tracks added after Plyr is initialized.
        // This is needed for streaming captions, but may result in unselectable options
        update: false,
      },
      // Fullscreen settings
      fullscreen: {
        enabled: true,
        // Allow fullscreen?
        fallback: true,
        // Fallback using full viewport/window
        iosNative: false, // Use the native fullscreen in iOS (disables custom controls)
      },
      // Local storage
      storage: {
        enabled: true,
        key: "plyr",
      },
      // Default controls
      controls: [
        "play-large", // 'restart',
        // 'rewind',
        "play", // 'fast-forward',
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay", // 'download',
        "fullscreen",
      ],
      settings: ["captions", "quality", "speed"],
      // Localisation
      i18n: {
        restart: "Restart",
        rewind: "Rewind {seektime}s",
        play: "Play",
        pause: "Pause",
        fastForward: "Forward {seektime}s",
        seek: "Seek",
        seekLabel: "{currentTime} of {duration}",
        played: "Played",
        buffered: "Buffered",
        currentTime: "Current time",
        duration: "Duration",
        volume: "Volume",
        mute: "Mute",
        unmute: "Unmute",
        enableCaptions: "Enable captions",
        disableCaptions: "Disable captions",
        download: "Download",
        enterFullscreen: "Enter fullscreen",
        exitFullscreen: "Exit fullscreen",
        frameTitle: "Player for {title}",
        captions: "Captions",
        settings: "Settings",
        menuBack: "Go back to previous menu",
        speed: "Speed",
        normal: "Normal",
        quality: "Quality",
        loop: "Loop",
        start: "Start",
        end: "End",
        all: "All",
        reset: "Reset",
        disabled: "Disabled",
        enabled: "Enabled",
        advertisement: "Ad",
        qualityBadge: {
          2160: "4K",
          1440: "HD",
          1080: "HD",
          720: "HD",
          576: "SD",
          480: "SD",
        },
      },
      // URLs
      urls: {
        download: null,
        vimeo: {
          sdk: "https://player.vimeo.com/api/player.js",
          iframe: "https://player.vimeo.com/video/{0}?{1}",
          api: "https://vimeo.com/api/v2/video/{0}.json",
        },
        youtube: {
          sdk: "https://www.youtube.com/iframe_api",
          api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}", // 'https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title),fileDetails)&part=snippet',
        },
        googleIMA: {
          sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js",
        },
      },
      // Custom control listeners
      listeners: {
        seek: null,
        play: null,
        pause: null,
        restart: null,
        rewind: null,
        fastForward: null,
        mute: null,
        volume: null,
        captions: null,
        download: null,
        fullscreen: null,
        pip: null,
        airplay: null,
        speed: null,
        quality: null,
        loop: null,
        language: null,
      },
      // Events to watch and bubble
      events: [
        // Events to watch on HTML5 media elements and bubble
        // https://developer.mozilla.org/en/docs/Web/Guide/Events/Media_events
        "ended",
        "progress",
        "stalled",
        "playing",
        "waiting",
        "canplay",
        "canplaythrough",
        "loadstart",
        "loadeddata",
        "loadedmetadata",
        "timeupdate",
        "volumechange",
        "play",
        "pause",
        "error",
        "seeking",
        "seeked",
        "emptied",
        "ratechange",
        "cuechange", // Custom events
        "download",
        "enterfullscreen",
        "exitfullscreen",
        "captionsenabled",
        "captionsdisabled",
        "languagechange",
        "controlshidden",
        "controlsshown",
        "ready", // YouTube
        "statechange", // Quality
        "qualitychange", // Ads
        "adsloaded",
        "adscontentpause",
        "adscontentresume",
        "adstarted",
        "adsmidpoint",
        "adscomplete",
        "adsallcomplete",
        "adsimpression",
        "adsclick",
      ],
      // Selectors
      // Change these to match your template if using custom HTML
      selectors: {
        editable: "input, textarea, select, [contenteditable]",
        container: ".plyr",
        controls: {
          container: null,
          wrapper: ".plyr__controls",
        },
        labels: "[data-plyr]",
        buttons: {
          play: '[data-plyr="play"]',
          pause: '[data-plyr="pause"]',
          restart: '[data-plyr="restart"]',
          rewind: '[data-plyr="rewind"]',
          fastForward: '[data-plyr="fast-forward"]',
          mute: '[data-plyr="mute"]',
          captions: '[data-plyr="captions"]',
          download: '[data-plyr="download"]',
          fullscreen: '[data-plyr="fullscreen"]',
          pip: '[data-plyr="pip"]',
          airplay: '[data-plyr="airplay"]',
          settings: '[data-plyr="settings"]',
          loop: '[data-plyr="loop"]',
        },
        inputs: {
          seek: '[data-plyr="seek"]',
          volume: '[data-plyr="volume"]',
          speed: '[data-plyr="speed"]',
          language: '[data-plyr="language"]',
          quality: '[data-plyr="quality"]',
        },
        display: {
          currentTime: ".plyr__time--current",
          duration: ".plyr__time--duration",
          buffer: ".plyr__progress__buffer",
          loop: ".plyr__progress__loop",
          // Used later
          volume: ".plyr__volume--display",
        },
        progress: ".plyr__progress",
        captions: ".plyr__captions",
        caption: ".plyr__caption",
      },
      // Class hooks added to the player in different states
      classNames: {
        type: "plyr--{0}",
        provider: "plyr--{0}",
        video: "plyr__video-wrapper",
        embed: "plyr__video-embed",
        videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
        embedContainer: "plyr__video-embed__container",
        poster: "plyr__poster",
        posterEnabled: "plyr__poster-enabled",
        ads: "plyr__ads",
        control: "plyr__control",
        controlPressed: "plyr__control--pressed",
        playing: "plyr--playing",
        paused: "plyr--paused",
        stopped: "plyr--stopped",
        loading: "plyr--loading",
        hover: "plyr--hover",
        tooltip: "plyr__tooltip",
        cues: "plyr__cues",
        hidden: "plyr__sr-only",
        hideControls: "plyr--hide-controls",
        isIos: "plyr--is-ios",
        isTouch: "plyr--is-touch",
        uiSupported: "plyr--full-ui",
        noTransition: "plyr--no-transition",
        display: {
          time: "plyr__time",
        },
        menu: {
          value: "plyr__menu__value",
          badge: "plyr__badge",
          open: "plyr--menu-open",
        },
        captions: {
          enabled: "plyr--captions-enabled",
          active: "plyr--captions-active",
        },
        fullscreen: {
          enabled: "plyr--fullscreen-enabled",
          fallback: "plyr--fullscreen-fallback",
        },
        pip: {
          supported: "plyr--pip-supported",
          active: "plyr--pip-active",
        },
        airplay: {
          supported: "plyr--airplay-supported",
          active: "plyr--airplay-active",
        },
        tabFocus: "plyr__tab-focus",
        previewThumbnails: {
          // Tooltip thumbs
          thumbContainer: "plyr__preview-thumb",
          thumbContainerShown: "plyr__preview-thumb--is-shown",
          imageContainer: "plyr__preview-thumb__image-container",
          timeContainer: "plyr__preview-thumb__time-container",
          // Scrubbing
          scrubbingContainer: "plyr__preview-scrubbing",
          scrubbingContainerShown: "plyr__preview-scrubbing--is-shown",
        },
      },
      // Embed attributes
      attributes: {
        embed: {
          provider: "data-plyr-provider",
          id: "data-plyr-embed-id",
        },
      },
      // Advertisements plugin
      // Register for an account here: http://vi.ai/publisher-video-monetization/?aid=plyrio
      ads: {
        enabled: false,
        publisherId: "",
        tagUrl: "",
      },
      // Preview Thumbnails plugin
      previewThumbnails: {
        enabled: false,
        src: "",
      },
      // Vimeo plugin
      vimeo: {
        byline: false,
        portrait: false,
        title: false,
        speed: true,
        transparent: false,
      },
      // YouTube plugin
      youtube: {
        noCookie: false,
        // Whether to use an alternative version of YouTube without cookies
        rel: 0,
        // No related vids
        showinfo: 0,
        // Hide info
        iv_load_policy: 3,
        // Hide annotations
        modestbranding: 1, // Hide logos as much as possible (they still show one in the corner when paused)
      },
    };

    // ==========================================================================
    // Plyr states
    // ==========================================================================
    var pip = {
      active: "picture-in-picture",
      inactive: "inline",
    };

    // ==========================================================================
    // Plyr supported types and providers
    // ==========================================================================
    var providers = {
      html5: "html5",
      youtube: "youtube",
      vimeo: "vimeo",
    };
    var types = {
      audio: "audio",
      video: "video",
    };
    /**
     * Get provider by URL
     * @param {String} url
     */

    function getProviderByUrl(url) {
      // YouTube
      if (
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(
          url
        )
      ) {
        return providers.youtube;
      } // Vimeo

      if (/^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(url)) {
        return providers.vimeo;
      }

      return null;
    }

    // ==========================================================================
    // Console wrapper
    // ==========================================================================
    var noop = function noop() {};

    var Console =
      /*#__PURE__*/
      (function () {
        function Console() {
          var enabled =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : false;

          _classCallCheck(this, Console);

          this.enabled = window.console && enabled;

          if (this.enabled) {
            this.log("Debugging enabled");
          }
        }

        _createClass(Console, [
          {
            key: "log",
            get: function get() {
              // eslint-disable-next-line no-console
              return this.enabled
                ? Function.prototype.bind.call(console.log, console)
                : noop;
            },
          },
          {
            key: "warn",
            get: function get() {
              // eslint-disable-next-line no-console
              return this.enabled
                ? Function.prototype.bind.call(console.warn, console)
                : noop;
            },
          },
          {
            key: "error",
            get: function get() {
              // eslint-disable-next-line no-console
              return this.enabled
                ? Function.prototype.bind.call(console.error, console)
                : noop;
            },
          },
        ]);

        return Console;
      })();

    function onChange() {
      if (!this.enabled) {
        return;
      } // Update toggle button

      var button = this.player.elements.buttons.fullscreen;

      if (is$1.element(button)) {
        button.pressed = this.active;
      } // Trigger an event

      // ML 3.8.2022 Add fullscreen class to fucking wrapper so we can hit it
      // on iOS which doesn't support the :fullscreen attribute
      if (this.active) {
        this.target.classList.add("is-fullscreen");
      } else {
        this.target.classList.remove("is-fullscreen");
      }

      triggerEvent.call(
        this.player,
        this.target,
        this.active ? "enterfullscreen" : "exitfullscreen",
        true
      ); // Trap focus in container

      if (!browser.isIos) {
        trapFocus.call(this.player, this.target, this.active);
      }
    }

    function toggleFallback() {
      var _this = this;

      var toggle =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : false;

      // Store or restore scroll position
      if (toggle) {
        this.scrollPosition = {
          x: window.scrollX || 0,
          y: window.scrollY || 0,
        };
      } else {
        window.scrollTo(this.scrollPosition.x, this.scrollPosition.y);
      } // Toggle scroll

      document.body.style.overflow = toggle ? "hidden" : ""; // Toggle class hook

      toggleClass(
        this.target,
        this.player.config.classNames.fullscreen.fallback,
        toggle
      ); // Force full viewport on iPhone X+

      if (browser.isIos) {
        var viewport = document.head.querySelector('meta[name="viewport"]');
        var property = "viewport-fit=cover"; // Inject the viewport meta if required

        if (!viewport) {
          viewport = document.createElement("meta");
          viewport.setAttribute("name", "viewport");
        } // Check if the property already exists

        var hasProperty =
          is$1.string(viewport.content) && viewport.content.includes(property);

        if (toggle) {
          this.cleanupViewport = !hasProperty;

          if (!hasProperty) {
            viewport.content += ",".concat(property);
          }
        } else if (this.cleanupViewport) {
          viewport.content = viewport.content
            .split(",")
            .filter(function (part) {
              return part.trim() !== property;
            })
            .join(",");
        } // Force a repaint as sometimes Safari doesn't want to fill the screen

        setTimeout(function () {
          return repaint(_this.target);
        }, 100);
      } // Toggle button and fire events

      onChange.call(this);
    }

    var Fullscreen =
      /*#__PURE__*/
      (function () {
        function Fullscreen(player) {
          var _this2 = this;

          _classCallCheck(this, Fullscreen);

          // Keep reference to parent
          this.player = player; // Get prefix

          this.prefix = Fullscreen.prefix;
          this.property = Fullscreen.property; // Scroll position

          this.scrollPosition = {
            x: 0,
            y: 0,
          }; // Force the use of 'full window/browser' rather than fullscreen

          this.forceFallback = player.config.fullscreen.fallback === "force"; // Register event listeners
          // Handle event (incase user presses escape etc)

          on.call(
            this.player,
            document,
            this.prefix === "ms"
              ? "MSFullscreenChange"
              : "".concat(this.prefix, "fullscreenchange"),
            function () {
              // TODO: Filter for target??
              onChange.call(_this2);
            }
          ); // Fullscreen toggle on double click

          on.call(
            this.player,
            this.player.elements.container,
            "dblclick",
            function (event) {
              // Ignore double click in controls
              if (
                is$1.element(_this2.player.elements.controls) &&
                _this2.player.elements.controls.contains(event.target)
              ) {
                return;
              }

              _this2.toggle();
            }
          ); // Update the UI

          this.update();
        } // Determine if native supported

        _createClass(
          Fullscreen,
          [
            {
              key: "update",
              // Update UI
              value: function update() {
                if (this.enabled) {
                  var mode;

                  if (this.forceFallback) {
                    mode = "Fallback (forced)";
                  } else if (Fullscreen.native) {
                    mode = "Native";
                  } else {
                    mode = "Fallback";
                  }

                  this.player.debug.log("".concat(mode, " fullscreen enabled"));
                } else {
                  this.player.debug.log(
                    "Fullscreen not supported and fallback disabled"
                  );
                } // Add styling hook to show button

                toggleClass(
                  this.player.elements.container,
                  this.player.config.classNames.fullscreen.enabled,
                  this.enabled
                );
              }, // Make an element fullscreen
            },
            {
              key: "enter",
              value: function enter() {
                if (!this.enabled) {
                  return;
                } // iOS native fullscreen doesn't need the request step

                if (browser.isIos && this.player.config.fullscreen.iosNative) {
                  this.target.webkitEnterFullscreen();
                } else if (!Fullscreen.native || this.forceFallback) {
                  toggleFallback.call(this, true);
                } else if (!this.prefix) {
                  this.target.requestFullscreen();
                } else if (!is$1.empty(this.prefix)) {
                  this.target[
                    "".concat(this.prefix, "Request").concat(this.property)
                  ]();
                }
              }, // Bail from fullscreen
            },
            {
              key: "exit",
              value: function exit() {
                if (!this.enabled) {
                  return;
                } // iOS native fullscreen

                if (browser.isIos && this.player.config.fullscreen.iosNative) {
                  this.target.webkitExitFullscreen();
                  this.player.play();
                } else if (!Fullscreen.native || this.forceFallback) {
                  toggleFallback.call(this, false);
                } else if (!this.prefix) {
                  (document.cancelFullScreen || document.exitFullscreen).call(
                    document
                  );
                } else if (!is$1.empty(this.prefix)) {
                  var action = this.prefix === "moz" ? "Cancel" : "Exit";
                  document[
                    "".concat(this.prefix).concat(action).concat(this.property)
                  ]();
                }
              }, // Toggle state
            },
            {
              key: "toggle",
              value: function toggle() {
                if (!this.active) {
                  this.enter();
                } else {
                  this.exit();
                }
              },
            },
            {
              key: "usingNative",
              // If we're actually using native
              get: function get() {
                return Fullscreen.native && !this.forceFallback;
              }, // Get the prefix for handlers
            },
            {
              key: "enabled",
              // Determine if fullscreen is enabled
              get: function get() {
                return (
                  (Fullscreen.native ||
                    this.player.config.fullscreen.fallback) &&
                  this.player.config.fullscreen.enabled &&
                  this.player.supported.ui &&
                  this.player.isVideo
                );
              }, // Get active state
            },
            {
              key: "active",
              get: function get() {
                if (!this.enabled) {
                  return false;
                } // Fallback using classname

                if (!Fullscreen.native || this.forceFallback) {
                  return hasClass(
                    this.target,
                    this.player.config.classNames.fullscreen.fallback
                  );
                }

                var element = !this.prefix
                  ? document.fullscreenElement
                  : document[
                      "".concat(this.prefix).concat(this.property, "Element")
                    ];
                return element === this.target;
              }, // Get target element
            },
            {
              key: "target",
              get: function get() {
                return browser.isIos && this.player.config.fullscreen.iosNative
                  ? this.player.media
                  : this.player.elements.container;
              },
            },
          ],
          [
            {
              key: "native",
              get: function get() {
                return !!(
                  document.fullscreenEnabled ||
                  document.webkitFullscreenEnabled ||
                  document.mozFullScreenEnabled ||
                  document.msFullscreenEnabled
                );
              },
            },
            {
              key: "prefix",
              get: function get() {
                // No prefix
                if (is$1.function(document.exitFullscreen)) {
                  return "";
                } // Check for fullscreen support by vendor prefix

                var value = "";
                var prefixes = ["webkit", "moz", "ms"];
                prefixes.some(function (pre) {
                  if (
                    is$1.function(document["".concat(pre, "ExitFullscreen")]) ||
                    is$1.function(document["".concat(pre, "CancelFullScreen")])
                  ) {
                    value = pre;
                    return true;
                  }

                  return false;
                });
                return value;
              },
            },
            {
              key: "property",
              get: function get() {
                return this.prefix === "moz" ? "FullScreen" : "Fullscreen";
              },
            },
          ]
        );

        return Fullscreen;
      })();

    // ==========================================================================
    // Load image avoiding xhr/fetch CORS issues
    // Server status can't be obtained this way unfortunately, so this uses "naturalWidth" to determine if the image has loaded
    // By default it checks if it is at least 1px, but you can add a second argument to change this
    // ==========================================================================
    function loadImage(src) {
      var minWidth =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return new Promise(function (resolve, reject) {
        var image = new Image();

        var handler = function handler() {
          delete image.onload;
          delete image.onerror;
          (image.naturalWidth >= minWidth ? resolve : reject)(image);
        };

        Object.assign(image, {
          onload: handler,
          onerror: handler,
          src: src,
        });
      });
    }

    // ==========================================================================
    var ui = {
      addStyleHook: function addStyleHook() {
        toggleClass(
          this.elements.container,
          this.config.selectors.container.replace(".", ""),
          true
        );
        toggleClass(
          this.elements.container,
          this.config.classNames.uiSupported,
          this.supported.ui
        );
      },
      // Toggle native HTML5 media controls
      toggleNativeControls: function toggleNativeControls() {
        var toggle =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : false;

        if (toggle && this.isHTML5) {
          this.media.setAttribute("controls", "");
        } else {
          this.media.removeAttribute("controls");
        }
      },
      // Setup the UI
      build: function build() {
        var _this = this;

        // Re-attach media element listeners
        // TODO: Use event bubbling?
        this.listeners.media(); // Don't setup interface if no support

        if (!this.supported.ui) {
          this.debug.warn(
            "Basic support only for "
              .concat(this.provider, " ")
              .concat(this.type)
          ); // Restore native controls

          ui.toggleNativeControls.call(this, true); // Bail

          return;
        } // Inject custom controls if not present

        if (!is$1.element(this.elements.controls)) {
          // Inject custom controls
          controls.inject.call(this); // Re-attach control listeners

          this.listeners.controls();
        } // Remove native controls

        ui.toggleNativeControls.call(this); // Setup captions for HTML5

        if (this.isHTML5) {
          captions.setup.call(this);
        } // Reset volume

        this.volume = null; // Reset mute state

        this.muted = null; // Reset loop state

        this.loop = null; // Reset quality setting

        this.quality = null; // Reset speed

        this.speed = null; // Reset volume display

        controls.updateVolume.call(this); // Reset time display

        controls.timeUpdate.call(this); // Update the UI

        ui.checkPlaying.call(this); // Check for picture-in-picture support

        toggleClass(
          this.elements.container,
          this.config.classNames.pip.supported,
          support.pip && this.isHTML5 && this.isVideo
        ); // Check for airplay support

        toggleClass(
          this.elements.container,
          this.config.classNames.airplay.supported,
          support.airplay && this.isHTML5
        ); // Add iOS class

        toggleClass(
          this.elements.container,
          this.config.classNames.isIos,
          browser.isIos
        ); // Add touch class

        toggleClass(
          this.elements.container,
          this.config.classNames.isTouch,
          this.touch
        ); // Ready for API calls

        this.ready = true; // Ready event at end of execution stack

        setTimeout(function () {
          triggerEvent.call(_this, _this.media, "ready");
        }, 0); // Set the title

        ui.setTitle.call(this); // Assure the poster image is set, if the property was added before the element was created

        if (this.poster) {
          ui.setPoster.call(this, this.poster, false).catch(function () {});
        } // Manually set the duration if user has overridden it.
        // The event listeners for it doesn't get called if preload is disabled (#701)

        if (this.config.duration) {
          controls.durationUpdate.call(this);
        }
      },
      // Setup aria attribute for play and iframe title
      setTitle: function setTitle() {
        // Find the current text
        var label = i18n.get("play", this.config); // If there's a media title set, use that for the label

        if (is$1.string(this.config.title) && !is$1.empty(this.config.title)) {
          label += ", ".concat(this.config.title);
        } // If there's a play button, set label

        Array.from(this.elements.buttons.play || []).forEach(function (button) {
          button.setAttribute("aria-label", label);
        }); // Set iframe title
        // https://github.com/sampotts/plyr/issues/124

        if (this.isEmbed) {
          var iframe = getElement.call(this, "iframe");

          if (!is$1.element(iframe)) {
            return;
          } // Default to media type

          var title = !is$1.empty(this.config.title)
            ? this.config.title
            : "video";
          var format = i18n.get("frameTitle", this.config);
          iframe.setAttribute("title", format.replace("{title}", title));
        }
      },
      // Toggle poster
      togglePoster: function togglePoster(enable) {
        toggleClass(
          this.elements.container,
          this.config.classNames.posterEnabled,
          enable
        );
      },
      // Set the poster image (async)
      // Used internally for the poster setter, with the passive option forced to false
      setPoster: function setPoster(poster) {
        var _this2 = this;

        var passive =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : true;

        // Don't override if call is passive
        if (passive && this.poster) {
          return Promise.reject(new Error("Poster already set"));
        } // Set property synchronously to respect the call order

        this.media.setAttribute("poster", poster); // Wait until ui is ready

        return ready
          .call(this) // Load image
          .then(function () {
            return loadImage(poster);
          })
          .catch(function (err) {
            // Hide poster on error unless it's been set by another call
            if (poster === _this2.poster) {
              ui.togglePoster.call(_this2, false);
            } // Rethrow

            throw err;
          })
          .then(function () {
            // Prevent race conditions
            if (poster !== _this2.poster) {
              throw new Error("setPoster cancelled by later call to setPoster");
            }
          })
          .then(function () {
            Object.assign(_this2.elements.poster.style, {
              backgroundImage: "url('".concat(poster, "')"),
              // Reset backgroundSize as well (since it can be set to "cover" for padded thumbnails for youtube)
              backgroundSize: "",
            });
            ui.togglePoster.call(_this2, true);
            return poster;
          });
      },
      // Check playing state
      checkPlaying: function checkPlaying(event) {
        var _this3 = this;

        // Class hooks
        toggleClass(
          this.elements.container,
          this.config.classNames.playing,
          this.playing
        );
        toggleClass(
          this.elements.container,
          this.config.classNames.paused,
          this.paused
        );
        toggleClass(
          this.elements.container,
          this.config.classNames.stopped,
          this.stopped
        ); // Set state

        Array.from(this.elements.buttons.play || []).forEach(function (target) {
          target.pressed = _this3.playing;
        }); // Only update controls on non timeupdate events

        if (is$1.event(event) && event.type === "timeupdate") {
          return;
        } // Toggle controls

        ui.toggleControls.call(this);
      },
      // Check if media is loading
      checkLoading: function checkLoading(event) {
        var _this4 = this;

        this.loading = ["stalled", "waiting"].includes(event.type); // Clear timer

        clearTimeout(this.timers.loading); // Timer to prevent flicker when seeking

        this.timers.loading = setTimeout(
          function () {
            // Update progress bar loading class state
            toggleClass(
              _this4.elements.container,
              _this4.config.classNames.loading,
              _this4.loading
            ); // Update controls visibility

            ui.toggleControls.call(_this4);
          },
          this.loading ? 250 : 0
        );
      },
      // Toggle controls based on state and `force` argument
      toggleControls: function toggleControls(force) {
        var controls = this.elements.controls;

        if (controls && this.config.hideControls) {
          // Don't hide controls if a touch-device user recently seeked. (Must be limited to touch devices, or it occasionally prevents desktop controls from hiding.)
          var recentTouchSeek =
            this.touch && this.lastSeekTime + 2000 > Date.now(); // Show controls if force, loading, paused, button interaction, or recent seek, otherwise hide

          this.toggleControls(
            Boolean(
              force ||
                this.loading ||
                this.paused ||
                controls.pressed ||
                controls.hover ||
                recentTouchSeek
            )
          );
        }
      },
    };

    var Listeners =
      /*#__PURE__*/
      (function () {
        function Listeners(player) {
          _classCallCheck(this, Listeners);

          this.player = player;
          this.lastKey = null;
          this.focusTimer = null;
          this.lastKeyDown = null;
          this.handleKey = this.handleKey.bind(this);
          this.toggleMenu = this.toggleMenu.bind(this);
          this.setTabFocus = this.setTabFocus.bind(this);
          this.firstTouch = this.firstTouch.bind(this);
        } // Handle key presses

        _createClass(Listeners, [
          {
            key: "handleKey",
            value: function handleKey(event) {
              var player = this.player;
              var elements = player.elements;
              var code = event.keyCode ? event.keyCode : event.which;
              var pressed = event.type === "keydown";
              var repeat = pressed && code === this.lastKey; // Bail if a modifier key is set

              if (
                event.altKey ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey
              ) {
                return;
              } // If the event is bubbled from the media element
              // Firefox doesn't get the keycode for whatever reason

              if (!is$1.number(code)) {
                return;
              } // Seek by the number keys

              var seekByKey = function seekByKey() {
                // Divide the max duration into 10th's and times by the number value
                player.currentTime = (player.duration / 10) * (code - 48);
              }; // Handle the key on keydown
              // Reset on keyup

              if (pressed) {
                // Check focused element
                // and if the focused element is not editable (e.g. text input)
                // and any that accept key input http://webaim.org/techniques/keyboard/
                var focused = document.activeElement;

                if (is$1.element(focused)) {
                  var editable = player.config.selectors.editable;
                  var seek = elements.inputs.seek;

                  if (focused !== seek && matches$1(focused, editable)) {
                    return;
                  }

                  if (
                    event.which === 32 &&
                    matches$1(focused, 'button, [role^="menuitem"]')
                  ) {
                    return;
                  }
                } // Which keycodes should we prevent default

                var preventDefault = [
                  32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67,
                  70, 73, 75, 76, 77, 79,
                ]; // If the code is found prevent default (e.g. prevent scrolling for arrows)

                if (preventDefault.includes(code)) {
                  event.preventDefault();
                  event.stopPropagation();
                }

                switch (code) {
                  case 48:
                  case 49:
                  case 50:
                  case 51:
                  case 52:
                  case 53:
                  case 54:
                  case 55:
                  case 56:
                  case 57:
                    // 0-9
                    if (!repeat) {
                      seekByKey();
                    }

                    break;

                  case 32:
                  case 75:
                    // Space and K key
                    if (!repeat) {
                      player.togglePlay();
                    }

                    break;

                  case 38:
                    // Arrow up
                    player.increaseVolume(0.1);
                    break;

                  case 40:
                    // Arrow down
                    player.decreaseVolume(0.1);
                    break;

                  case 77:
                    // M key
                    if (!repeat) {
                      player.muted = !player.muted;
                    }

                    break;

                  case 39:
                    // Arrow forward
                    player.forward();
                    break;

                  case 37:
                    // Arrow back
                    player.rewind();
                    break;

                  case 70:
                    // F key
                    player.fullscreen.toggle();
                    break;

                  case 67:
                    // C key
                    if (!repeat) {
                      player.toggleCaptions();
                    }

                    break;

                  case 76:
                    // L key
                    player.loop = !player.loop;
                    break;

                  /* case 73:
            this.setLoop('start');
            break;
            case 76:
            this.setLoop();
            break;
            case 79:
            this.setLoop('end');
            break; */

                  default:
                    break;
                } // Escape is handle natively when in full screen
                // So we only need to worry about non native

                if (
                  code === 27 &&
                  !player.fullscreen.usingNative &&
                  player.fullscreen.active
                ) {
                  player.fullscreen.toggle();
                } // Store last code for next cycle

                this.lastKey = code;
              } else {
                this.lastKey = null;
              }
            }, // Toggle menu
          },
          {
            key: "toggleMenu",
            value: function toggleMenu(event) {
              controls.toggleMenu.call(this.player, event);
            }, // Device is touch enabled
          },
          {
            key: "firstTouch",
            value: function firstTouch() {
              var player = this.player;
              var elements = player.elements;
              player.touch = true; // Add touch class

              toggleClass(
                elements.container,
                player.config.classNames.isTouch,
                true
              );
            },
          },
          {
            key: "setTabFocus",
            value: function setTabFocus(event) {
              var player = this.player;
              var elements = player.elements;
              clearTimeout(this.focusTimer); // Ignore any key other than tab

              if (event.type === "keydown" && event.which !== 9) {
                return;
              } // Store reference to event timeStamp

              if (event.type === "keydown") {
                this.lastKeyDown = event.timeStamp;
              } // Remove current classes

              var removeCurrent = function removeCurrent() {
                var className = player.config.classNames.tabFocus;
                var current = getElements.call(player, ".".concat(className));
                toggleClass(current, className, false);
              }; // Determine if a key was pressed to trigger this event

              var wasKeyDown = event.timeStamp - this.lastKeyDown <= 20; // Ignore focus events if a key was pressed prior

              if (event.type === "focus" && !wasKeyDown) {
                return;
              } // Remove all current

              removeCurrent(); // Delay the adding of classname until the focus has changed
              // This event fires before the focusin event

              this.focusTimer = setTimeout(function () {
                var focused = document.activeElement; // Ignore if current focus element isn't inside the player

                if (!elements.container.contains(focused)) {
                  return;
                }

                toggleClass(
                  document.activeElement,
                  player.config.classNames.tabFocus,
                  true
                );
              }, 10);
            }, // Global window & document listeners
          },
          {
            key: "global",
            value: function global() {
              var toggle =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : true;
              var player = this.player; // Keyboard shortcuts

              if (player.config.keyboard.global) {
                toggleListener.call(
                  player,
                  window,
                  "keydown keyup",
                  this.handleKey,
                  toggle,
                  false
                );
              } // Click anywhere closes menu

              toggleListener.call(
                player,
                document.body,
                "click",
                this.toggleMenu,
                toggle
              ); // Detect touch by events

              once.call(player, document.body, "touchstart", this.firstTouch); // Tab focus detection

              toggleListener.call(
                player,
                document.body,
                "keydown focus blur",
                this.setTabFocus,
                toggle,
                false,
                true
              );
            }, // Container listeners
          },
          {
            key: "container",
            value: function container() {
              var player = this.player;
              var config = player.config,
                elements = player.elements,
                timers = player.timers; // Keyboard shortcuts

              if (!config.keyboard.global && config.keyboard.focused) {
                on.call(
                  player,
                  elements.container,
                  "keydown keyup",
                  this.handleKey,
                  false
                );
              } // Toggle controls on mouse events and entering fullscreen

              on.call(
                player,
                elements.container,
                "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen",
                function (event) {
                  var controls = elements.controls; // Remove button states for fullscreen

                  if (controls && event.type === "enterfullscreen") {
                    controls.pressed = false;
                    controls.hover = false;
                  } // Show, then hide after a timeout unless another control event occurs

                  var show = ["touchstart", "touchmove", "mousemove"].includes(
                    event.type
                  );
                  var delay = 0;

                  if (show) {
                    ui.toggleControls.call(player, true); // Use longer timeout for touch devices

                    delay = player.touch ? 3000 : 2000;
                  } // Clear timer

                  clearTimeout(timers.controls); // Set new timer to prevent flicker when seeking

                  timers.controls = setTimeout(function () {
                    return ui.toggleControls.call(player, false);
                  }, delay);
                }
              ); // Force edge to repaint on exit fullscreen
              // TODO: Fix weird bug where Edge doesn't re-draw when exiting fullscreen

              /* if (browser.isEdge) {
            on.call(player, elements.container, 'exitfullscreen', () => {
                setTimeout(() => repaint(elements.container), 100);
            });
        } */
              // Set a gutter for Vimeo

              var setGutter = function setGutter(ratio, padding, toggle) {
                if (!player.isVimeo) {
                  return;
                }

                var target = player.elements.wrapper.firstChild;

                var _ratio = _slicedToArray(ratio, 2),
                  y = _ratio[1];

                var _getAspectRatio$call = getAspectRatio.call(player),
                  _getAspectRatio$call2 = _slicedToArray(
                    _getAspectRatio$call,
                    2
                  ),
                  videoX = _getAspectRatio$call2[0],
                  videoY = _getAspectRatio$call2[1];

                target.style.maxWidth = toggle
                  ? "".concat((y / videoY) * videoX, "px")
                  : null;
                target.style.margin = toggle ? "0 auto" : null;
              }; // Resize on fullscreen change

              var setPlayerSize = function setPlayerSize(measure) {
                // If we don't need to measure the viewport
                if (!measure) {
                  return setAspectRatio.call(player);
                }

                var rect = elements.container.getBoundingClientRect();
                var width = rect.width,
                  height = rect.height;
                return setAspectRatio.call(
                  player,
                  "".concat(width, ":").concat(height)
                );
              };

              var resized = function resized() {
                window.clearTimeout(timers.resized);
                timers.resized = window.setTimeout(setPlayerSize, 50);
              };

              on.call(
                player,
                elements.container,
                "enterfullscreen exitfullscreen",
                function (event) {
                  var _player$fullscreen = player.fullscreen,
                    target = _player$fullscreen.target,
                    usingNative = _player$fullscreen.usingNative; // Ignore for iOS native

                  if (!player.isEmbed || target !== elements.container) {
                    return;
                  }

                  var isEnter = event.type === "enterfullscreen"; // Set the player size when entering fullscreen to viewport size

                  var _setPlayerSize = setPlayerSize(isEnter),
                    padding = _setPlayerSize.padding,
                    ratio = _setPlayerSize.ratio; // Set Vimeo gutter

                  setGutter(ratio, padding, isEnter); // If not using native fullscreen, we need to check for resizes of viewport

                  if (!usingNative) {
                    if (isEnter) {
                      on.call(player, window, "resize", resized);
                    } else {
                      off.call(player, window, "resize", resized);
                    }
                  }
                }
              );
            }, // Listen for media events
          },
          {
            key: "media",
            value: function media() {
              var _this = this;

              var player = this.player;
              var elements = player.elements; // Time change on media

              on.call(
                player,
                player.media,
                "timeupdate seeking seeked",
                function (event) {
                  return controls.timeUpdate.call(player, event);
                }
              ); // Display duration

              on.call(
                player,
                player.media,
                "durationchange loadeddata loadedmetadata",
                function (event) {
                  return controls.durationUpdate.call(player, event);
                }
              ); // Check for audio tracks on load
              // We can't use `loadedmetadata` as it doesn't seem to have audio tracks at that point

              on.call(player, player.media, "canplay loadeddata", function () {
                toggleHidden(elements.volume, !player.hasAudio);
                toggleHidden(elements.buttons.mute, !player.hasAudio);
              }); // Handle the media finishing

              on.call(player, player.media, "ended", function () {
                // Show poster on end
                if (
                  player.isHTML5 &&
                  player.isVideo &&
                  player.config.resetOnEnd
                ) {
                  // Restart
                  player.restart();
                }
              }); // Check for buffer progress

              on.call(
                player,
                player.media,
                "progress playing seeking seeked",
                function (event) {
                  return controls.updateProgress.call(player, event);
                }
              ); // Handle volume changes

              on.call(player, player.media, "volumechange", function (event) {
                return controls.updateVolume.call(player, event);
              }); // Handle play/pause

              on.call(
                player,
                player.media,
                "playing play pause ended emptied timeupdate",
                function (event) {
                  return ui.checkPlaying.call(player, event);
                }
              ); // Loading state

              on.call(
                player,
                player.media,
                "waiting canplay seeked playing",
                function (event) {
                  return ui.checkLoading.call(player, event);
                }
              ); // Click video

              if (
                player.supported.ui &&
                player.config.clickToPlay &&
                !player.isAudio
              ) {
                // Re-fetch the wrapper
                var wrapper = getElement.call(
                  player,
                  ".".concat(player.config.classNames.video)
                ); // Bail if there's no wrapper (this should never happen)

                if (!is$1.element(wrapper)) {
                  return;
                } // On click play, pause or restart

                on.call(player, elements.container, "click", function (event) {
                  var targets = [elements.container, wrapper]; // Ignore if click if not container or in video wrapper

                  if (
                    !targets.includes(event.target) &&
                    !wrapper.contains(event.target)
                  ) {
                    return;
                  } // Touch devices will just show controls (if hidden)

                  if (player.touch && player.config.hideControls) {
                    return;
                  }

                  if (player.ended) {
                    _this.proxy(event, player.restart, "restart");

                    _this.proxy(event, player.play, "play");
                  } else {
                    _this.proxy(event, player.togglePlay, "play");
                  }
                });
              } // Disable right click

              if (player.supported.ui && player.config.disableContextMenu) {
                on.call(
                  player,
                  elements.wrapper,
                  "contextmenu",
                  function (event) {
                    event.preventDefault();
                  },
                  false
                );
              } // Volume change

              on.call(player, player.media, "volumechange", function () {
                // Save to storage
                player.storage.set({
                  volume: player.volume,
                  muted: player.muted,
                });
              }); // Speed change

              on.call(player, player.media, "ratechange", function () {
                // Update UI
                controls.updateSetting.call(player, "speed"); // Save to storage

                player.storage.set({
                  speed: player.speed,
                });
              }); // Quality change

              on.call(player, player.media, "qualitychange", function (event) {
                // Update UI
                controls.updateSetting.call(
                  player,
                  "quality",
                  null,
                  event.detail.quality
                );
              }); // Update download link when ready and if quality changes

              on.call(player, player.media, "ready qualitychange", function () {
                controls.setDownloadUrl.call(player);
              }); // Proxy events to container
              // Bubble up key events for Edge

              var proxyEvents = player.config.events
                .concat(["keyup", "keydown"])
                .join(" ");
              on.call(player, player.media, proxyEvents, function (event) {
                var _event$detail = event.detail,
                  detail = _event$detail === void 0 ? {} : _event$detail; // Get error details from media

                if (event.type === "error") {
                  detail = player.media.error;
                }

                triggerEvent.call(
                  player,
                  elements.container,
                  event.type,
                  true,
                  detail
                );
              });
            }, // Run default and custom handlers
          },
          {
            key: "proxy",
            value: function proxy(event, defaultHandler, customHandlerKey) {
              var player = this.player;
              var customHandler = player.config.listeners[customHandlerKey];
              var hasCustomHandler = is$1.function(customHandler);
              var returned = true; // Execute custom handler

              if (hasCustomHandler) {
                returned = customHandler.call(player, event);
              } // Only call default handler if not prevented in custom handler

              if (returned && is$1.function(defaultHandler)) {
                defaultHandler.call(player, event);
              }
            }, // Trigger custom and default handlers
          },
          {
            key: "bind",
            value: function bind(
              element,
              type,
              defaultHandler,
              customHandlerKey
            ) {
              var _this2 = this;

              var passive =
                arguments.length > 4 && arguments[4] !== undefined
                  ? arguments[4]
                  : true;
              var player = this.player;
              var customHandler = player.config.listeners[customHandlerKey];
              var hasCustomHandler = is$1.function(customHandler);
              on.call(
                player,
                element,
                type,
                function (event) {
                  return _this2.proxy(event, defaultHandler, customHandlerKey);
                },
                passive && !hasCustomHandler
              );
            }, // Listen for control events
          },
          {
            key: "controls",
            value: function controls$1() {
              var _this3 = this;

              var player = this.player;
              var elements = player.elements; // IE doesn't support input event, so we fallback to change

              var inputEvent = browser.isIE ? "change" : "input"; // Play/pause toggle

              if (elements.buttons.play) {
                Array.from(elements.buttons.play).forEach(function (button) {
                  _this3.bind(button, "click", player.togglePlay, "play");
                });
              } // Pause

              this.bind(
                elements.buttons.restart,
                "click",
                player.restart,
                "restart"
              ); // Rewind

              this.bind(
                elements.buttons.rewind,
                "click",
                player.rewind,
                "rewind"
              ); // Rewind

              this.bind(
                elements.buttons.fastForward,
                "click",
                player.forward,
                "fastForward"
              ); // Mute toggle

              this.bind(
                elements.buttons.mute,
                "click",
                function () {
                  player.muted = !player.muted;
                },
                "mute"
              ); // Captions toggle

              this.bind(elements.buttons.captions, "click", function () {
                return player.toggleCaptions();
              }); // Download

              this.bind(
                elements.buttons.download,
                "click",
                function () {
                  triggerEvent.call(player, player.media, "download");
                },
                "download"
              ); // Fullscreen toggle

              this.bind(
                elements.buttons.fullscreen,
                "click",
                function () {
                  player.fullscreen.toggle();
                },
                "fullscreen"
              ); // Picture-in-Picture

              this.bind(
                elements.buttons.pip,
                "click",
                function () {
                  player.pip = "toggle";
                },
                "pip"
              ); // Airplay

              this.bind(
                elements.buttons.airplay,
                "click",
                player.airplay,
                "airplay"
              ); // Settings menu - click toggle

              this.bind(elements.buttons.settings, "click", function (event) {
                // Prevent the document click listener closing the menu
                event.stopPropagation();

                controls.toggleMenu.call(player, event);
              }); // Settings menu - keyboard toggle
              // We have to bind to keyup otherwise Firefox triggers a click when a keydown event handler shifts focus
              // https://bugzilla.mozilla.org/show_bug.cgi?id=1220143

              this.bind(
                elements.buttons.settings,
                "keyup",
                function (event) {
                  var code = event.which; // We only care about space and return

                  if (![13, 32].includes(code)) {
                    return;
                  } // Because return triggers a click anyway, all we need to do is set focus

                  if (code === 13) {
                    controls.focusFirstMenuItem.call(player, null, true);

                    return;
                  } // Prevent scroll

                  event.preventDefault(); // Prevent playing video (Firefox)

                  event.stopPropagation(); // Toggle menu

                  controls.toggleMenu.call(player, event);
                },
                null,
                false // Can't be passive as we're preventing default
              ); // Escape closes menu

              this.bind(elements.settings.menu, "keydown", function (event) {
                if (event.which === 27) {
                  controls.toggleMenu.call(player, event);
                }
              }); // Set range input alternative "value", which matches the tooltip time (#954)

              this.bind(
                elements.inputs.seek,
                "mousedown mousemove",
                function (event) {
                  var rect = elements.progress.getBoundingClientRect();
                  var percent = (100 / rect.width) * (event.pageX - rect.left);
                  event.currentTarget.setAttribute("seek-value", percent);
                }
              ); // Pause while seeking

              this.bind(
                elements.inputs.seek,
                "mousedown mouseup keydown keyup touchstart touchend",
                function (event) {
                  var seek = event.currentTarget;
                  var code = event.keyCode ? event.keyCode : event.which;
                  var attribute = "play-on-seeked";

                  if (is$1.keyboardEvent(event) && code !== 39 && code !== 37) {
                    return;
                  } // Record seek time so we can prevent hiding controls for a few seconds after seek

                  player.lastSeekTime = Date.now(); // Was playing before?

                  var play = seek.hasAttribute(attribute); // Done seeking

                  var done = ["mouseup", "touchend", "keyup"].includes(
                    event.type
                  ); // If we're done seeking and it was playing, resume playback

                  if (play && done) {
                    seek.removeAttribute(attribute);
                    player.play();
                  } else if (!done && player.playing) {
                    seek.setAttribute(attribute, "");
                    player.pause();
                  }
                }
              ); // Fix range inputs on iOS
              // Super weird iOS bug where after you interact with an <input type="range">,
              // it takes over further interactions on the page. This is a hack

              if (browser.isIos) {
                var inputs = getElements.call(player, 'input[type="range"]');
                Array.from(inputs).forEach(function (input) {
                  return _this3.bind(input, inputEvent, function (event) {
                    return repaint(event.target);
                  });
                });
              } // Seek

              this.bind(
                elements.inputs.seek,
                inputEvent,
                function (event) {
                  var seek = event.currentTarget; // If it exists, use seek-value instead of "value" for consistency with tooltip time (#954)

                  var seekTo = seek.getAttribute("seek-value");

                  if (is$1.empty(seekTo)) {
                    seekTo = seek.value;
                  }

                  seek.removeAttribute("seek-value");
                  player.currentTime = (seekTo / seek.max) * player.duration;
                },
                "seek"
              ); // Seek tooltip

              this.bind(
                elements.progress,
                "mouseenter mouseleave mousemove",
                function (event) {
                  return controls.updateSeekTooltip.call(player, event);
                }
              ); // Preview thumbnails plugin
              // TODO: Really need to work on some sort of plug-in wide event bus or pub-sub for this

              this.bind(
                elements.progress,
                "mousemove touchmove",
                function (event) {
                  var previewThumbnails = player.previewThumbnails;

                  if (previewThumbnails && previewThumbnails.loaded) {
                    previewThumbnails.startMove(event);
                  }
                }
              ); // Hide thumbnail preview - on mouse click, mouse leave, and video play/seek. All four are required, e.g., for buffering

              this.bind(elements.progress, "mouseleave click", function () {
                var previewThumbnails = player.previewThumbnails;

                if (previewThumbnails && previewThumbnails.loaded) {
                  previewThumbnails.endMove(false, true);
                }
              }); // Show scrubbing preview

              this.bind(
                elements.progress,
                "mousedown touchstart",
                function (event) {
                  var previewThumbnails = player.previewThumbnails;

                  if (previewThumbnails && previewThumbnails.loaded) {
                    previewThumbnails.startScrubbing(event);
                  }
                }
              );
              this.bind(
                elements.progress,
                "mouseup touchend",
                function (event) {
                  var previewThumbnails = player.previewThumbnails;

                  if (previewThumbnails && previewThumbnails.loaded) {
                    previewThumbnails.endScrubbing(event);
                  }
                }
              ); // Polyfill for lower fill in <input type="range"> for webkit

              if (browser.isWebkit) {
                Array.from(
                  getElements.call(player, 'input[type="range"]')
                ).forEach(function (element) {
                  _this3.bind(element, "input", function (event) {
                    return controls.updateRangeFill.call(player, event.target);
                  });
                });
              } // Current time invert
              // Only if one time element is used for both currentTime and duration

              if (
                player.config.toggleInvert &&
                !is$1.element(elements.display.duration)
              ) {
                this.bind(elements.display.currentTime, "click", function () {
                  // Do nothing if we're at the start
                  if (player.currentTime === 0) {
                    return;
                  }

                  player.config.invertTime = !player.config.invertTime;

                  controls.timeUpdate.call(player);
                });
              } // Volume

              this.bind(
                elements.inputs.volume,
                inputEvent,
                function (event) {
                  player.volume = event.target.value;
                },
                "volume"
              ); // Update controls.hover state (used for ui.toggleControls to avoid hiding when interacting)

              this.bind(
                elements.controls,
                "mouseenter mouseleave",
                function (event) {
                  elements.controls.hover =
                    !player.touch && event.type === "mouseenter";
                }
              ); // Update controls.pressed state (used for ui.toggleControls to avoid hiding when interacting)

              this.bind(
                elements.controls,
                "mousedown mouseup touchstart touchend touchcancel",
                function (event) {
                  elements.controls.pressed = [
                    "mousedown",
                    "touchstart",
                  ].includes(event.type);
                }
              ); // Show controls when they receive focus (e.g., when using keyboard tab key)

              this.bind(elements.controls, "focusin", function () {
                var config = player.config,
                  elements = player.elements,
                  timers = player.timers; // Skip transition to prevent focus from scrolling the parent element

                toggleClass(
                  elements.controls,
                  config.classNames.noTransition,
                  true
                ); // Toggle

                ui.toggleControls.call(player, true); // Restore transition

                setTimeout(function () {
                  toggleClass(
                    elements.controls,
                    config.classNames.noTransition,
                    false
                  );
                }, 0); // Delay a little more for mouse users

                var delay = _this3.touch ? 3000 : 4000; // Clear timer

                clearTimeout(timers.controls); // Hide again after delay

                timers.controls = setTimeout(function () {
                  return ui.toggleControls.call(player, false);
                }, delay);
              }); // Mouse wheel for volume

              this.bind(
                elements.inputs.volume,
                "wheel",
                function (event) {
                  // Detect "natural" scroll - suppored on OS X Safari only
                  // Other browsers on OS X will be inverted until support improves
                  var inverted = event.webkitDirectionInvertedFromDevice; // Get delta from event. Invert if `inverted` is true

                  var _map = [event.deltaX, -event.deltaY].map(function (
                      value
                    ) {
                      return inverted ? -value : value;
                    }),
                    _map2 = _slicedToArray(_map, 2),
                    x = _map2[0],
                    y = _map2[1]; // Using the biggest delta, normalize to 1 or -1 (or 0 if no delta)

                  var direction = Math.sign(Math.abs(x) > Math.abs(y) ? x : y); // Change the volume by 2%

                  player.increaseVolume(direction / 50); // Don't break page scrolling at max and min

                  var volume = player.media.volume;

                  if (
                    (direction === 1 && volume < 1) ||
                    (direction === -1 && volume > 0)
                  ) {
                    event.preventDefault();
                  }
                },
                "volume",
                false
              );
            },
          },
        ]);

        return Listeners;
      })();

    var commonjsGlobal =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof window !== "undefined"
        ? window
        : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
        ? self
        : {};

    function createCommonjsModule(fn, module) {
      return (
        (module = { exports: {} }), fn(module, module.exports), module.exports
      );
    }

    var loadjs_umd = createCommonjsModule(function (module, exports) {
      (function (root, factory) {
        {
          module.exports = factory();
        }
      })(commonjsGlobal, function () {
        /**
         * Global dependencies.
         * @global {Object} document - DOM
         */
        var devnull = function devnull() {},
          bundleIdCache = {},
          bundleResultCache = {},
          bundleCallbackQueue = {};
        /**
         * Subscribe to bundle load event.
         * @param {string[]} bundleIds - Bundle ids
         * @param {Function} callbackFn - The callback function
         */

        function subscribe(bundleIds, callbackFn) {
          // listify
          bundleIds = bundleIds.push ? bundleIds : [bundleIds];
          var depsNotFound = [],
            i = bundleIds.length,
            numWaiting = i,
            fn,
            bundleId,
            r,
            q; // define callback function

          fn = function fn(bundleId, pathsNotFound) {
            if (pathsNotFound.length) depsNotFound.push(bundleId);
            numWaiting--;
            if (!numWaiting) callbackFn(depsNotFound);
          }; // register callback

          while (i--) {
            bundleId = bundleIds[i]; // execute callback if in result cache

            r = bundleResultCache[bundleId];

            if (r) {
              fn(bundleId, r);
              continue;
            } // add to callback queue

            q = bundleCallbackQueue[bundleId] =
              bundleCallbackQueue[bundleId] || [];
            q.push(fn);
          }
        }
        /**
         * Publish bundle load event.
         * @param {string} bundleId - Bundle id
         * @param {string[]} pathsNotFound - List of files not found
         */

        function publish(bundleId, pathsNotFound) {
          // exit if id isn't defined
          if (!bundleId) return;
          var q = bundleCallbackQueue[bundleId]; // cache result

          bundleResultCache[bundleId] = pathsNotFound; // exit if queue is empty

          if (!q) return; // empty callback queue

          while (q.length) {
            q[0](bundleId, pathsNotFound);
            q.splice(0, 1);
          }
        }
        /**
         * Execute callbacks.
         * @param {Object or Function} args - The callback args
         * @param {string[]} depsNotFound - List of dependencies not found
         */

        function executeCallbacks(args, depsNotFound) {
          // accept function as argument
          if (args.call)
            args = {
              success: args,
            }; // success and error callbacks

          if (depsNotFound.length) (args.error || devnull)(depsNotFound);
          else (args.success || devnull)(args);
        }
        /**
         * Load individual file.
         * @param {string} path - The file path
         * @param {Function} callbackFn - The callback function
         */

        function loadFile(path, callbackFn, args, numTries) {
          var doc = document,
            async = args.async,
            maxTries = (args.numRetries || 0) + 1,
            beforeCallbackFn = args.before || devnull,
            pathStripped = path.replace(/^(css|img)!/, ""),
            isLegacyIECss,
            e;
          numTries = numTries || 0;

          if (/(^css!|\.css$)/.test(path)) {
            // css
            e = doc.createElement("link");
            e.rel = "stylesheet";
            e.href = pathStripped; // tag IE9+

            isLegacyIECss = "hideFocus" in e; // use preload in IE Edge (to detect load errors)

            if (isLegacyIECss && e.relList) {
              isLegacyIECss = 0;
              e.rel = "preload";
              e.as = "style";
            }
          } else if (/(^img!|\.(png|gif|jpg|svg)$)/.test(path)) {
            // image
            e = doc.createElement("img");
            e.src = pathStripped;
          } else {
            // javascript
            e = doc.createElement("script");
            e.src = path;
            e.async = async === undefined ? true : async;
          }

          e.onload =
            e.onerror =
            e.onbeforeload =
              function (ev) {
                var result = ev.type[0]; // treat empty stylesheets as failures to get around lack of onerror
                // support in IE9-11

                if (isLegacyIECss) {
                  try {
                    if (!e.sheet.cssText.length) result = "e";
                  } catch (x) {
                    // sheets objects created from load errors don't allow access to
                    // `cssText` (unless error is Code:18 SecurityError)
                    if (x.code != 18) result = "e";
                  }
                } // handle retries in case of load failure

                if (result == "e") {
                  // increment counter
                  numTries += 1; // exit function and try again

                  if (numTries < maxTries) {
                    return loadFile(path, callbackFn, args, numTries);
                  }
                } else if (e.rel == "preload" && e.as == "style") {
                  // activate preloaded stylesheets
                  return (e.rel = "stylesheet"); // jshint ignore:line
                } // execute callback

                callbackFn(path, result, ev.defaultPrevented);
              }; // add to document (unless callback returns `false`)

          if (beforeCallbackFn(path, e) !== false) doc.head.appendChild(e);
        }
        /**
         * Load multiple files.
         * @param {string[]} paths - The file paths
         * @param {Function} callbackFn - The callback function
         */

        function loadFiles(paths, callbackFn, args) {
          // listify paths
          paths = paths.push ? paths : [paths];
          var numWaiting = paths.length,
            x = numWaiting,
            pathsNotFound = [],
            fn,
            i; // define callback function

          fn = function fn(path, result, defaultPrevented) {
            // handle error
            if (result == "e") pathsNotFound.push(path); // handle beforeload event. If defaultPrevented then that means the load
            // will be blocked (ex. Ghostery/ABP on Safari)

            if (result == "b") {
              if (defaultPrevented) pathsNotFound.push(path);
              else return;
            }

            numWaiting--;
            if (!numWaiting) callbackFn(pathsNotFound);
          }; // load scripts

          for (i = 0; i < x; i++) {
            loadFile(paths[i], fn, args);
          }
        }
        /**
         * Initiate script load and register bundle.
         * @param {(string|string[])} paths - The file paths
         * @param {(string|Function|Object)} [arg1] - The (1) bundleId or (2) success
         *   callback or (3) object literal with success/error arguments, numRetries,
         *   etc.
         * @param {(Function|Object)} [arg2] - The (1) success callback or (2) object
         *   literal with success/error arguments, numRetries, etc.
         */

        function loadjs(paths, arg1, arg2) {
          var bundleId, args; // bundleId (if string)

          if (arg1 && arg1.trim) bundleId = arg1; // args (default is {})

          args = (bundleId ? arg2 : arg1) || {}; // throw error if bundle is already defined

          if (bundleId) {
            if (bundleId in bundleIdCache) {
              throw "LoadJS";
            } else {
              bundleIdCache[bundleId] = true;
            }
          }

          function loadFn(resolve, reject) {
            loadFiles(
              paths,
              function (pathsNotFound) {
                // execute callbacks
                executeCallbacks(args, pathsNotFound); // resolve Promise

                if (resolve) {
                  executeCallbacks(
                    {
                      success: resolve,
                      error: reject,
                    },
                    pathsNotFound
                  );
                } // publish bundle load event

                publish(bundleId, pathsNotFound);
              },
              args
            );
          }

          if (args.returnPromise) return new Promise(loadFn);
          else loadFn();
        }
        /**
         * Execute callbacks when dependencies have been satisfied.
         * @param {(string|string[])} deps - List of bundle ids
         * @param {Object} args - success/error arguments
         */

        loadjs.ready = function ready(deps, args) {
          // subscribe to bundle load event
          subscribe(deps, function (depsNotFound) {
            // execute callbacks
            executeCallbacks(args, depsNotFound);
          });
          return loadjs;
        };
        /**
         * Manually satisfy bundle dependencies.
         * @param {string} bundleId - The bundle id
         */

        loadjs.done = function done(bundleId) {
          publish(bundleId, []);
        };
        /**
         * Reset loadjs dependencies statuses
         */

        loadjs.reset = function reset() {
          bundleIdCache = {};
          bundleResultCache = {};
          bundleCallbackQueue = {};
        };
        /**
         * Determine if bundle has already been defined
         * @param String} bundleId - The bundle id
         */

        loadjs.isDefined = function isDefined(bundleId) {
          return bundleId in bundleIdCache;
        }; // export

        return loadjs;
      });
    });

    // ==========================================================================
    function loadScript(url) {
      return new Promise(function (resolve, reject) {
        loadjs_umd(url, {
          success: resolve,
          error: reject,
        });
      });
    }

    function parseId(url) {
      if (is$1.empty(url)) {
        return null;
      }

      if (is$1.number(Number(url))) {
        return url;
      }

      var regex = /^.*(vimeo.com\/|video\/)(\d+).*/;
      return url.match(regex) ? RegExp.$2 : url;
    } // Set playback state and trigger change (only on actual change)

    function assurePlaybackState(play) {
      if (play && !this.embed.hasPlayed) {
        this.embed.hasPlayed = true;
      }

      if (this.media.paused === play) {
        this.media.paused = !play;
        triggerEvent.call(this, this.media, play ? "play" : "pause");
      }
    }

    var vimeo = {
      setup: function setup() {
        var _this = this;

        // Add embed class for responsive
        toggleClass(this.elements.wrapper, this.config.classNames.embed, true); // Set intial ratio

        setAspectRatio.call(this); // Load the SDK if not already

        if (!is$1.object(window.Vimeo)) {
          loadScript(this.config.urls.vimeo.sdk)
            .then(function () {
              vimeo.ready.call(_this);
            })
            .catch(function (error) {
              _this.debug.warn("Vimeo SDK (player.js) failed to load", error);
            });
        } else {
          vimeo.ready.call(this);
        }
      },
      // API Ready
      ready: function ready() {
        var _this2 = this;

        var player = this;
        var config = player.config.vimeo; // Get Vimeo params for the iframe

        var params = buildUrlParams(
          extend(
            {},
            {
              loop: player.config.loop.active,
              autoplay: player.autoplay,
              muted: player.muted,
              gesture: "media",
              playsinline: !this.config.fullscreen.iosNative,
            },
            config
          )
        ); // Get the source URL or ID

        var source = player.media.getAttribute("src"); // Get from <div> if needed

        if (is$1.empty(source)) {
          source = player.media.getAttribute(player.config.attributes.embed.id);
        }

        var id = parseId(source); // Build an iframe

        var iframe = createElement("iframe");
        var src = format(player.config.urls.vimeo.iframe, id, params);
        iframe.setAttribute("src", src);
        iframe.setAttribute("allowfullscreen", "");
        iframe.setAttribute("allowtransparency", "");
        iframe.setAttribute("allow", "autoplay"); // Get poster, if already set

        var poster = player.poster; // Inject the package

        var wrapper = createElement("div", {
          poster: poster,
          class: player.config.classNames.embedContainer,
        });
        wrapper.appendChild(iframe);
        player.media = replaceElement(wrapper, player.media); // Get poster image

        fetch(format(player.config.urls.vimeo.api, id), "json").then(function (
          response
        ) {
          if (is$1.empty(response)) {
            return;
          } // Get the URL for thumbnail

          var url = new URL(response[0].thumbnail_large); // Get original image

          url.pathname = "".concat(url.pathname.split("_")[0], ".jpg"); // Set and show poster

          ui.setPoster.call(player, url.href).catch(function () {});
        }); // Setup instance
        // https://github.com/vimeo/player.js

        player.embed = new window.Vimeo.Player(iframe, {
          autopause: player.config.autopause,
          muted: player.muted,
        });
        player.media.paused = true;
        player.media.currentTime = 0; // Disable native text track rendering

        if (player.supported.ui) {
          player.embed.disableTextTrack();
        } // Create a faux HTML5 API using the Vimeo API

        player.media.play = function () {
          assurePlaybackState.call(player, true);
          return player.embed.play();
        };

        player.media.pause = function () {
          assurePlaybackState.call(player, false);
          return player.embed.pause();
        };

        player.media.stop = function () {
          player.pause();
          player.currentTime = 0;
        }; // Seeking

        var currentTime = player.media.currentTime;
        Object.defineProperty(player.media, "currentTime", {
          get: function get() {
            return currentTime;
          },
          set: function set(time) {
            // Vimeo will automatically play on seek if the video hasn't been played before
            // Get current paused state and volume etc
            var embed = player.embed,
              media = player.media,
              paused = player.paused,
              volume = player.volume;
            var restorePause = paused && !embed.hasPlayed; // Set seeking state and trigger event

            media.seeking = true;
            triggerEvent.call(player, media, "seeking"); // If paused, mute until seek is complete

            Promise.resolve(restorePause && embed.setVolume(0)) // Seek
              .then(function () {
                return embed.setCurrentTime(time);
              }) // Restore paused
              .then(function () {
                return restorePause && embed.pause();
              }) // Restore volume
              .then(function () {
                return restorePause && embed.setVolume(volume);
              })
              .catch(function () {
                // Do nothing
              });
          },
        }); // Playback speed

        var speed = player.config.speed.selected;
        Object.defineProperty(player.media, "playbackRate", {
          get: function get() {
            return speed;
          },
          set: function set(input) {
            player.embed
              .setPlaybackRate(input)
              .then(function () {
                speed = input;
                triggerEvent.call(player, player.media, "ratechange");
              })
              .catch(function (error) {
                // Hide menu item (and menu if empty)
                if (error.name === "Error") {
                  controls.setSpeedMenu.call(player, []);
                }
              });
          },
        }); // Volume

        var volume = player.config.volume;
        Object.defineProperty(player.media, "volume", {
          get: function get() {
            return volume;
          },
          set: function set(input) {
            player.embed.setVolume(input).then(function () {
              volume = input;
              triggerEvent.call(player, player.media, "volumechange");
            });
          },
        }); // Muted

        var muted = player.config.muted;
        Object.defineProperty(player.media, "muted", {
          get: function get() {
            return muted;
          },
          set: function set(input) {
            var toggle = is$1.boolean(input) ? input : false;
            player.embed
              .setVolume(toggle ? 0 : player.config.volume)
              .then(function () {
                muted = toggle;
                triggerEvent.call(player, player.media, "volumechange");
              });
          },
        }); // Loop

        var loop = player.config.loop;
        Object.defineProperty(player.media, "loop", {
          get: function get() {
            return loop;
          },
          set: function set(input) {
            var toggle = is$1.boolean(input)
              ? input
              : player.config.loop.active;
            player.embed.setLoop(toggle).then(function () {
              loop = toggle;
            });
          },
        }); // Source

        var currentSrc;
        player.embed
          .getVideoUrl()
          .then(function (value) {
            currentSrc = value;
            controls.setDownloadUrl.call(player);
          })
          .catch(function (error) {
            _this2.debug.warn(error);
          });
        Object.defineProperty(player.media, "currentSrc", {
          get: function get() {
            return currentSrc;
          },
        }); // Ended

        Object.defineProperty(player.media, "ended", {
          get: function get() {
            return player.currentTime === player.duration;
          },
        }); // Set aspect ratio based on video size

        Promise.all([
          player.embed.getVideoWidth(),
          player.embed.getVideoHeight(),
        ]).then(function (dimensions) {
          var _dimensions = _slicedToArray(dimensions, 2),
            width = _dimensions[0],
            height = _dimensions[1];

          player.embed.ratio = [width, height];
          setAspectRatio.call(_this2);
        }); // Set autopause

        player.embed
          .setAutopause(player.config.autopause)
          .then(function (state) {
            player.config.autopause = state;
          }); // Get title

        player.embed.getVideoTitle().then(function (title) {
          player.config.title = title;
          ui.setTitle.call(_this2);
        }); // Get current time

        player.embed.getCurrentTime().then(function (value) {
          currentTime = value;
          triggerEvent.call(player, player.media, "timeupdate");
        }); // Get duration

        player.embed.getDuration().then(function (value) {
          player.media.duration = value;
          triggerEvent.call(player, player.media, "durationchange");
        }); // Get captions

        player.embed.getTextTracks().then(function (tracks) {
          player.media.textTracks = tracks;
          captions.setup.call(player);
        });
        player.embed.on("cuechange", function (_ref) {
          var _ref$cues = _ref.cues,
            cues = _ref$cues === void 0 ? [] : _ref$cues;
          var strippedCues = cues.map(function (cue) {
            return stripHTML(cue.text);
          });
          captions.updateCues.call(player, strippedCues);
        });
        player.embed.on("loaded", function () {
          // Assure state and events are updated on autoplay
          player.embed.getPaused().then(function (paused) {
            assurePlaybackState.call(player, !paused);

            if (!paused) {
              triggerEvent.call(player, player.media, "playing");
            }
          });

          if (is$1.element(player.embed.element) && player.supported.ui) {
            var frame = player.embed.element; // Fix keyboard focus issues
            // https://github.com/sampotts/plyr/issues/317

            frame.setAttribute("tabindex", -1);
          }
        });
        player.embed.on("play", function () {
          assurePlaybackState.call(player, true);
          triggerEvent.call(player, player.media, "playing");
        });
        player.embed.on("pause", function () {
          assurePlaybackState.call(player, false);
        });
        player.embed.on("timeupdate", function (data) {
          player.media.seeking = false;
          currentTime = data.seconds;
          triggerEvent.call(player, player.media, "timeupdate");
        });
        player.embed.on("progress", function (data) {
          player.media.buffered = data.percent;
          triggerEvent.call(player, player.media, "progress"); // Check all loaded

          if (parseInt(data.percent, 10) === 1) {
            triggerEvent.call(player, player.media, "canplaythrough");
          } // Get duration as if we do it before load, it gives an incorrect value
          // https://github.com/sampotts/plyr/issues/891

          player.embed.getDuration().then(function (value) {
            if (value !== player.media.duration) {
              player.media.duration = value;
              triggerEvent.call(player, player.media, "durationchange");
            }
          });
        });
        player.embed.on("seeked", function () {
          player.media.seeking = false;
          triggerEvent.call(player, player.media, "seeked");
        });
        player.embed.on("ended", function () {
          player.media.paused = true;
          triggerEvent.call(player, player.media, "ended");
        });
        player.embed.on("error", function (detail) {
          player.media.error = detail;
          triggerEvent.call(player, player.media, "error");
        }); // Rebuild UI

        setTimeout(function () {
          return ui.build.call(player);
        }, 0);
      },
    };

    // ==========================================================================

    function parseId$1(url) {
      if (is$1.empty(url)) {
        return null;
      }

      var regex =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      return url.match(regex) ? RegExp.$2 : url;
    } // Set playback state and trigger change (only on actual change)

    function assurePlaybackState$1(play) {
      if (play && !this.embed.hasPlayed) {
        this.embed.hasPlayed = true;
      }

      if (this.media.paused === play) {
        this.media.paused = !play;
        triggerEvent.call(this, this.media, play ? "play" : "pause");
      }
    }

    function getHost(config) {
      if (config.noCookie) {
        return "https://www.youtube-nocookie.com";
      }

      if (window.location.protocol === "http:") {
        return "http://www.youtube.com";
      } // Use YouTube's default

      return undefined;
    }

    var youtube = {
      setup: function setup() {
        var _this = this;

        // Add embed class for responsive
        toggleClass(this.elements.wrapper, this.config.classNames.embed, true); // Setup API

        if (is$1.object(window.YT) && is$1.function(window.YT.Player)) {
          youtube.ready.call(this);
        } else {
          // Load the API
          loadScript(this.config.urls.youtube.sdk).catch(function (error) {
            _this.debug.warn("YouTube API failed to load", error);
          }); // Setup callback for the API
          // YouTube has it's own system of course...

          window.onYouTubeReadyCallbacks = window.onYouTubeReadyCallbacks || []; // Add to queue

          window.onYouTubeReadyCallbacks.push(function () {
            youtube.ready.call(_this);
          }); // Set callback to process queue

          window.onYouTubeIframeAPIReady = function () {
            window.onYouTubeReadyCallbacks.forEach(function (callback) {
              callback();
            });
          };
        }
      },
      // Get the media title
      getTitle: function getTitle(videoId) {
        var _this2 = this;

        var url = format(this.config.urls.youtube.api, videoId);
        fetch(url)
          .then(function (data) {
            if (is$1.object(data)) {
              var title = data.title,
                height = data.height,
                width = data.width; // Set title

              _this2.config.title = title;
              ui.setTitle.call(_this2); // Set aspect ratio

              _this2.embed.ratio = [width, height];
            }

            setAspectRatio.call(_this2);
          })
          .catch(function () {
            // Set aspect ratio
            setAspectRatio.call(_this2);
          });
      },
      // API ready
      ready: function ready() {
        var player = this; // Ignore already setup (race condition)

        var currentId = player.media.getAttribute("id");

        if (!is$1.empty(currentId) && currentId.startsWith("youtube-")) {
          return;
        } // Get the source URL or ID

        var source = player.media.getAttribute("src"); // Get from <div> if needed

        if (is$1.empty(source)) {
          source = player.media.getAttribute(this.config.attributes.embed.id);
        } // Replace the <iframe> with a <div> due to YouTube API issues

        var videoId = parseId$1(source);
        var id = generateId(player.provider); // Get poster, if already set

        var poster = player.poster; // Replace media element

        var container = createElement("div", {
          id: id,
          poster: poster,
        });
        player.media = replaceElement(container, player.media); // Id to poster wrapper

        var posterSrc = function posterSrc(format) {
          return "https://i.ytimg.com/vi/"
            .concat(videoId, "/")
            .concat(format, "default.jpg");
        }; // Check thumbnail images in order of quality, but reject fallback thumbnails (120px wide)

        loadImage(posterSrc("maxres"), 121) // Higest quality and unpadded
          .catch(function () {
            return loadImage(posterSrc("sd"), 121);
          }) // 480p padded 4:3
          .catch(function () {
            return loadImage(posterSrc("hq"));
          }) // 360p padded 4:3. Always exists
          .then(function (image) {
            return ui.setPoster.call(player, image.src);
          })
          .then(function (posterSrc) {
            // If the image is padded, use background-size "cover" instead (like youtube does too with their posters)
            if (!posterSrc.includes("maxres")) {
              player.elements.poster.style.backgroundSize = "cover";
            }
          })
          .catch(function () {});
        var config = player.config.youtube; // Setup instance
        // https://developers.google.com/youtube/iframe_api_reference

        player.embed = new window.YT.Player(id, {
          videoId: videoId,
          host: getHost(config),
          playerVars: extend(
            {},
            {
              autoplay: player.config.autoplay ? 1 : 0,
              // Autoplay
              hl: player.config.hl,
              // iframe interface language
              controls: player.supported.ui ? 0 : 1,
              // Only show controls if not fully supported
              disablekb: 1,
              // Disable keyboard as we handle it
              playsinline: !player.config.fullscreen.iosNative ? 1 : 0,
              // Allow iOS inline playback
              // Captions are flaky on YouTube
              cc_load_policy: player.captions.active ? 1 : 0,
              cc_lang_pref: player.config.captions.language,
              // Tracking for stats
              widget_referrer: window ? window.location.href : null,
            },
            config
          ),
          events: {
            onError: function onError(event) {
              // YouTube may fire onError twice, so only handle it once
              if (!player.media.error) {
                var code = event.data; // Messages copied from https://developers.google.com/youtube/iframe_api_reference#onError

                var message =
                  {
                    2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
                    5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
                    100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
                    101: "The owner of the requested video does not allow it to be played in embedded players.",
                    150: "The owner of the requested video does not allow it to be played in embedded players.",
                  }[code] || "An unknown error occured";
                player.media.error = {
                  code: code,
                  message: message,
                };
                triggerEvent.call(player, player.media, "error");
              }
            },
            onPlaybackRateChange: function onPlaybackRateChange(event) {
              // Get the instance
              var instance = event.target; // Get current speed

              player.media.playbackRate = instance.getPlaybackRate();
              triggerEvent.call(player, player.media, "ratechange");
            },
            onReady: function onReady(event) {
              // Bail if onReady has already been called. See issue #1108
              if (is$1.function(player.media.play)) {
                return;
              } // Get the instance

              var instance = event.target; // Get the title

              youtube.getTitle.call(player, videoId); // Create a faux HTML5 API using the YouTube API

              player.media.play = function () {
                assurePlaybackState$1.call(player, true);
                instance.playVideo();
              };

              player.media.pause = function () {
                assurePlaybackState$1.call(player, false);
                instance.pauseVideo();
              };

              player.media.stop = function () {
                instance.stopVideo();
              };

              player.media.duration = instance.getDuration();
              player.media.paused = true; // Seeking

              player.media.currentTime = 0;
              Object.defineProperty(player.media, "currentTime", {
                get: function get() {
                  return Number(instance.getCurrentTime());
                },
                set: function set(time) {
                  // If paused and never played, mute audio preventively (YouTube starts playing on seek if the video hasn't been played yet).
                  if (player.paused && !player.embed.hasPlayed) {
                    player.embed.mute();
                  } // Set seeking state and trigger event

                  player.media.seeking = true;
                  triggerEvent.call(player, player.media, "seeking"); // Seek after events sent

                  instance.seekTo(time);
                },
              }); // Playback speed

              Object.defineProperty(player.media, "playbackRate", {
                get: function get() {
                  return instance.getPlaybackRate();
                },
                set: function set(input) {
                  instance.setPlaybackRate(input);
                },
              }); // Volume

              var volume = player.config.volume;
              Object.defineProperty(player.media, "volume", {
                get: function get() {
                  return volume;
                },
                set: function set(input) {
                  volume = input;
                  instance.setVolume(volume * 100);
                  triggerEvent.call(player, player.media, "volumechange");
                },
              }); // Muted

              var muted = player.config.muted;
              Object.defineProperty(player.media, "muted", {
                get: function get() {
                  return muted;
                },
                set: function set(input) {
                  var toggle = is$1.boolean(input) ? input : muted;
                  muted = toggle;
                  instance[toggle ? "mute" : "unMute"]();
                  triggerEvent.call(player, player.media, "volumechange");
                },
              }); // Source

              Object.defineProperty(player.media, "currentSrc", {
                get: function get() {
                  return instance.getVideoUrl();
                },
              }); // Ended

              Object.defineProperty(player.media, "ended", {
                get: function get() {
                  return player.currentTime === player.duration;
                },
              }); // Get available speeds

              player.options.speed = instance.getAvailablePlaybackRates(); // Set the tabindex to avoid focus entering iframe

              if (player.supported.ui) {
                player.media.setAttribute("tabindex", -1);
              }

              triggerEvent.call(player, player.media, "timeupdate");
              triggerEvent.call(player, player.media, "durationchange"); // Reset timer

              clearInterval(player.timers.buffering); // Setup buffering

              player.timers.buffering = setInterval(function () {
                // Get loaded % from YouTube
                player.media.buffered = instance.getVideoLoadedFraction(); // Trigger progress only when we actually buffer something

                if (
                  player.media.lastBuffered === null ||
                  player.media.lastBuffered < player.media.buffered
                ) {
                  triggerEvent.call(player, player.media, "progress");
                } // Set last buffer point

                player.media.lastBuffered = player.media.buffered; // Bail if we're at 100%

                if (player.media.buffered === 1) {
                  clearInterval(player.timers.buffering); // Trigger event

                  triggerEvent.call(player, player.media, "canplaythrough");
                }
              }, 200); // Rebuild UI

              setTimeout(function () {
                return ui.build.call(player);
              }, 50);
            },
            onStateChange: function onStateChange(event) {
              // Get the instance
              var instance = event.target; // Reset timer

              clearInterval(player.timers.playing);
              var seeked = player.media.seeking && [1, 2].includes(event.data);

              if (seeked) {
                // Unset seeking and fire seeked event
                player.media.seeking = false;
                triggerEvent.call(player, player.media, "seeked");
              } // Handle events
              // -1   Unstarted
              // 0    Ended
              // 1    Playing
              // 2    Paused
              // 3    Buffering
              // 5    Video cued

              switch (event.data) {
                case -1:
                  // Update scrubber
                  triggerEvent.call(player, player.media, "timeupdate"); // Get loaded % from YouTube

                  player.media.buffered = instance.getVideoLoadedFraction();
                  triggerEvent.call(player, player.media, "progress");
                  break;

                case 0:
                  assurePlaybackState$1.call(player, false); // YouTube doesn't support loop for a single video, so mimick it.

                  if (player.media.loop) {
                    // YouTube needs a call to `stopVideo` before playing again
                    instance.stopVideo();
                    instance.playVideo();
                  } else {
                    triggerEvent.call(player, player.media, "ended");
                  }

                  break;

                case 1:
                  // Restore paused state (YouTube starts playing on seek if the video hasn't been played yet)
                  if (
                    !player.config.autoplay &&
                    player.media.paused &&
                    !player.embed.hasPlayed
                  ) {
                    player.media.pause();
                  } else {
                    assurePlaybackState$1.call(player, true);
                    triggerEvent.call(player, player.media, "playing"); // Poll to get playback progress

                    player.timers.playing = setInterval(function () {
                      triggerEvent.call(player, player.media, "timeupdate");
                    }, 50); // Check duration again due to YouTube bug
                    // https://github.com/sampotts/plyr/issues/374
                    // https://code.google.com/p/gdata-issues/issues/detail?id=8690

                    if (player.media.duration !== instance.getDuration()) {
                      player.media.duration = instance.getDuration();
                      triggerEvent.call(player, player.media, "durationchange");
                    }
                  }

                  break;

                case 2:
                  // Restore audio (YouTube starts playing on seek if the video hasn't been played yet)
                  if (!player.muted) {
                    player.embed.unMute();
                  }

                  assurePlaybackState$1.call(player, false);
                  break;

                default:
                  break;
              }

              triggerEvent.call(
                player,
                player.elements.container,
                "statechange",
                false,
                {
                  code: event.data,
                }
              );
            },
          },
        });
      },
    };

    // ==========================================================================
    var media = {
      // Setup media
      setup: function setup() {
        // If there's no media, bail
        if (!this.media) {
          this.debug.warn("No media element found!");
          return;
        } // Add type class

        toggleClass(
          this.elements.container,
          this.config.classNames.type.replace("{0}", this.type),
          true
        ); // Add provider class

        toggleClass(
          this.elements.container,
          this.config.classNames.provider.replace("{0}", this.provider),
          true
        ); // Add video class for embeds
        // This will require changes if audio embeds are added

        if (this.isEmbed) {
          toggleClass(
            this.elements.container,
            this.config.classNames.type.replace("{0}", "video"),
            true
          );
        } // Inject the player wrapper

        if (this.isVideo) {
          // Create the wrapper div
          this.elements.wrapper = createElement("div", {
            class: this.config.classNames.video,
          }); // Wrap the video in a container

          wrap(this.media, this.elements.wrapper); // Faux poster container

          this.elements.poster = createElement("div", {
            class: this.config.classNames.poster,
          });
          this.elements.wrapper.appendChild(this.elements.poster);
        }

        if (this.isHTML5) {
          html5.extend.call(this);
        } else if (this.isYouTube) {
          youtube.setup.call(this);
        } else if (this.isVimeo) {
          vimeo.setup.call(this);
        }
      },
    };

    var destroy = function destroy(instance) {
      // Destroy our adsManager
      if (instance.manager) {
        instance.manager.destroy();
      } // Destroy our adsManager

      if (instance.elements.displayContainer) {
        instance.elements.displayContainer.destroy();
      }

      instance.elements.container.remove();
    };

    var Ads =
      /*#__PURE__*/
      (function () {
        /**
         * Ads constructor.
         * @param {Object} player
         * @return {Ads}
         */
        function Ads(player) {
          var _this = this;

          _classCallCheck(this, Ads);

          this.player = player;
          this.config = player.config.ads;
          this.playing = false;
          this.initialized = false;
          this.elements = {
            container: null,
            displayContainer: null,
          };
          this.manager = null;
          this.loader = null;
          this.cuePoints = null;
          this.events = {};
          this.safetyTimer = null;
          this.countdownTimer = null; // Setup a promise to resolve when the IMA manager is ready

          this.managerPromise = new Promise(function (resolve, reject) {
            // The ad is loaded and ready
            _this.on("loaded", resolve); // Ads failed

            _this.on("error", reject);
          });
          this.load();
        }

        _createClass(Ads, [
          {
            key: "load",

            /**
             * Load the IMA SDK
             */
            value: function load() {
              var _this2 = this;

              if (!this.enabled) {
                return;
              } // Check if the Google IMA3 SDK is loaded or load it ourselves

              if (
                !is$1.object(window.google) ||
                !is$1.object(window.google.ima)
              ) {
                loadScript(this.player.config.urls.googleIMA.sdk)
                  .then(function () {
                    _this2.ready();
                  })
                  .catch(function () {
                    // Script failed to load or is blocked
                    _this2.trigger(
                      "error",
                      new Error("Google IMA SDK failed to load")
                    );
                  });
              } else {
                this.ready();
              }
            },
            /**
             * Get the ads instance ready
             */
          },
          {
            key: "ready",
            value: function ready() {
              var _this3 = this;

              // Double check we're enabled
              if (!this.enabled) {
                destroy(this);
              } // Start ticking our safety timer. If the whole advertisement
              // thing doesn't resolve within our set time; we bail

              this.startSafetyTimer(12000, "ready()"); // Clear the safety timer

              this.managerPromise.then(function () {
                _this3.clearSafetyTimer("onAdsManagerLoaded()");
              }); // Set listeners on the Plyr instance

              this.listeners(); // Setup the IMA SDK

              this.setupIMA();
            }, // Build the tag URL
          },
          {
            key: "setupIMA",

            /**
             * In order for the SDK to display ads for our video, we need to tell it where to put them,
             * so here we define our ad container. This div is set up to render on top of the video player.
             * Using the code below, we tell the SDK to render ads within that div. We also provide a
             * handle to the content video player - the SDK will poll the current time of our player to
             * properly place mid-rolls. After we create the ad display container, we initialize it. On
             * mobile devices, this initialization is done as the result of a user action.
             */
            value: function setupIMA() {
              // Create the container for our advertisements
              this.elements.container = createElement("div", {
                class: this.player.config.classNames.ads,
              });
              this.player.elements.container.appendChild(
                this.elements.container
              ); // So we can run VPAID2

              google.ima.settings.setVpaidMode(
                google.ima.ImaSdkSettings.VpaidMode.ENABLED
              ); // Set language

              google.ima.settings.setLocale(this.player.config.ads.language); // Set playback for iOS10+

              google.ima.settings.setDisableCustomPlaybackForIOS10Plus(
                this.player.config.playsinline
              ); // We assume the adContainer is the video container of the plyr element that will house the ads

              this.elements.displayContainer =
                new google.ima.AdDisplayContainer(
                  this.elements.container,
                  this.player.media
                ); // Request video ads to be pre-loaded

              this.requestAds();
            },
            /**
             * Request advertisements
             */
          },
          {
            key: "requestAds",
            value: function requestAds() {
              var _this4 = this;

              var container = this.player.elements.container;

              try {
                // Create ads loader
                this.loader = new google.ima.AdsLoader(
                  this.elements.displayContainer
                ); // Listen and respond to ads loaded and error events

                this.loader.addEventListener(
                  google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
                  function (event) {
                    return _this4.onAdsManagerLoaded(event);
                  },
                  false
                );
                this.loader.addEventListener(
                  google.ima.AdErrorEvent.Type.AD_ERROR,
                  function (error) {
                    return _this4.onAdError(error);
                  },
                  false
                ); // Request video ads

                var request = new google.ima.AdsRequest();
                request.adTagUrl = this.tagUrl; // Specify the linear and nonlinear slot sizes. This helps the SDK
                // to select the correct creative if multiple are returned

                request.linearAdSlotWidth = container.offsetWidth;
                request.linearAdSlotHeight = container.offsetHeight;
                request.nonLinearAdSlotWidth = container.offsetWidth;
                request.nonLinearAdSlotHeight = container.offsetHeight; // We only overlay ads as we only support video.

                request.forceNonLinearFullSlot = false; // Mute based on current state

                request.setAdWillPlayMuted(!this.player.muted);
                this.loader.requestAds(request);
              } catch (e) {
                this.onAdError(e);
              }
            },
            /**
             * Update the ad countdown
             * @param {Boolean} start
             */
          },
          {
            key: "pollCountdown",
            value: function pollCountdown() {
              var _this5 = this;

              var start =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : false;

              if (!start) {
                clearInterval(this.countdownTimer);
                this.elements.container.removeAttribute("data-badge-text");
                return;
              }

              var update = function update() {
                var time = formatTime(
                  Math.max(_this5.manager.getRemainingTime(), 0)
                );
                var label = ""
                  .concat(
                    i18n.get("advertisement", _this5.player.config),
                    " - "
                  )
                  .concat(time);

                _this5.elements.container.setAttribute(
                  "data-badge-text",
                  label
                );
              };

              this.countdownTimer = setInterval(update, 100);
            },
            /**
             * This method is called whenever the ads are ready inside the AdDisplayContainer
             * @param {Event} adsManagerLoadedEvent
             */
          },
          {
            key: "onAdsManagerLoaded",
            value: function onAdsManagerLoaded(event) {
              var _this6 = this;

              // Load could occur after a source change (race condition)
              if (!this.enabled) {
                return;
              } // Get the ads manager

              var settings = new google.ima.AdsRenderingSettings(); // Tell the SDK to save and restore content video state on our behalf

              settings.restoreCustomPlaybackStateOnAdBreakComplete = true;
              settings.enablePreloading = true; // The SDK is polling currentTime on the contentPlayback. And needs a duration
              // so it can determine when to start the mid- and post-roll

              this.manager = event.getAdsManager(this.player, settings); // Get the cue points for any mid-rolls by filtering out the pre- and post-roll

              this.cuePoints = this.manager.getCuePoints(); // Add listeners to the required events
              // Advertisement error events

              this.manager.addEventListener(
                google.ima.AdErrorEvent.Type.AD_ERROR,
                function (error) {
                  return _this6.onAdError(error);
                }
              ); // Advertisement regular events

              Object.keys(google.ima.AdEvent.Type).forEach(function (type) {
                _this6.manager.addEventListener(
                  google.ima.AdEvent.Type[type],
                  function (event) {
                    return _this6.onAdEvent(event);
                  }
                );
              }); // Resolve our adsManager

              this.trigger("loaded");
            },
          },
          {
            key: "addCuePoints",
            value: function addCuePoints() {
              var _this7 = this;

              // Add advertisement cue's within the time line if available
              if (!is$1.empty(this.cuePoints)) {
                this.cuePoints.forEach(function (cuePoint) {
                  if (
                    cuePoint !== 0 &&
                    cuePoint !== -1 &&
                    cuePoint < _this7.player.duration
                  ) {
                    var seekElement = _this7.player.elements.progress;

                    if (is$1.element(seekElement)) {
                      var cuePercentage =
                        (100 / _this7.player.duration) * cuePoint;
                      var cue = createElement("span", {
                        class: _this7.player.config.classNames.cues,
                      });
                      cue.style.left = "".concat(cuePercentage.toString(), "%");
                      seekElement.appendChild(cue);
                    }
                  }
                });
              }
            },
            /**
             * This is where all the event handling takes place. Retrieve the ad from the event. Some
             * events (e.g. ALL_ADS_COMPLETED) don't have the ad object associated
             * https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdEvent.Type
             * @param {Event} event
             */
          },
          {
            key: "onAdEvent",
            value: function onAdEvent(event) {
              var _this8 = this;

              var container = this.player.elements.container; // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
              // don't have ad object associated

              var ad = event.getAd();
              var adData = event.getAdData(); // Proxy event

              var dispatchEvent = function dispatchEvent(type) {
                var event = "ads".concat(type.replace(/_/g, "").toLowerCase());
                triggerEvent.call(_this8.player, _this8.player.media, event);
              }; // Bubble the event

              dispatchEvent(event.type);

              switch (event.type) {
                case google.ima.AdEvent.Type.LOADED:
                  // This is the first event sent for an ad - it is possible to determine whether the
                  // ad is a video ad or an overlay
                  this.trigger("loaded"); // Start countdown

                  this.pollCountdown(true);

                  if (!ad.isLinear()) {
                    // Position AdDisplayContainer correctly for overlay
                    ad.width = container.offsetWidth;
                    ad.height = container.offsetHeight;
                  } // console.info('Ad type: ' + event.getAd().getAdPodInfo().getPodIndex());
                  // console.info('Ad time: ' + event.getAd().getAdPodInfo().getTimeOffset());

                  break;

                case google.ima.AdEvent.Type.STARTED:
                  // Set volume to match player
                  this.manager.setVolume(this.player.volume);
                  break;

                case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
                  // All ads for the current videos are done. We can now request new advertisements
                  // in case the video is re-played
                  // TODO: Example for what happens when a next video in a playlist would be loaded.
                  // So here we load a new video when all ads are done.
                  // Then we load new ads within a new adsManager. When the video
                  // Is started - after - the ads are loaded, then we get ads.
                  // You can also easily test cancelling and reloading by running
                  // player.ads.cancel() and player.ads.play from the console I guess.
                  // this.player.source = {
                  //     type: 'video',
                  //     title: 'View From A Blue Moon',
                  //     sources: [{
                  //         src:
                  // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.mp4', type:
                  // 'video/mp4', }], poster:
                  // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg', tracks:
                  // [ { kind: 'captions', label: 'English', srclang: 'en', src:
                  // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
                  // default: true, }, { kind: 'captions', label: 'French', srclang: 'fr', src:
                  // 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt', }, ],
                  // };
                  // TODO: So there is still this thing where a video should only be allowed to start
                  // playing when the IMA SDK is ready or has failed
                  this.loadAds();
                  break;

                case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
                  // This event indicates the ad has started - the video player can adjust the UI,
                  // for example display a pause button and remaining time. Fired when content should
                  // be paused. This usually happens right before an ad is about to cover the content
                  this.pauseContent();
                  break;

                case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
                  // This event indicates the ad has finished - the video player can perform
                  // appropriate UI actions, such as removing the timer for remaining time detection.
                  // Fired when content should be resumed. This usually happens when an ad finishes
                  // or collapses
                  this.pollCountdown();
                  this.resumeContent();
                  break;

                case google.ima.AdEvent.Type.LOG:
                  if (adData.adError) {
                    this.player.debug.warn(
                      "Non-fatal ad error: ".concat(adData.adError.getMessage())
                    );
                  }

                  break;

                default:
                  break;
              }
            },
            /**
             * Any ad error handling comes through here
             * @param {Event} event
             */
          },
          {
            key: "onAdError",
            value: function onAdError(event) {
              this.cancel();
              this.player.debug.warn("Ads error", event);
            },
            /**
             * Setup hooks for Plyr and window events. This ensures
             * the mid- and post-roll launch at the correct time. And
             * resize the advertisement when the player resizes
             */
          },
          {
            key: "listeners",
            value: function listeners() {
              var _this9 = this;

              var container = this.player.elements.container;
              var time;
              this.player.on("canplay", function () {
                _this9.addCuePoints();
              });
              this.player.on("ended", function () {
                _this9.loader.contentComplete();
              });
              this.player.on("timeupdate", function () {
                time = _this9.player.currentTime;
              });
              this.player.on("seeked", function () {
                var seekedTime = _this9.player.currentTime;

                if (is$1.empty(_this9.cuePoints)) {
                  return;
                }

                _this9.cuePoints.forEach(function (cuePoint, index) {
                  if (time < cuePoint && cuePoint < seekedTime) {
                    _this9.manager.discardAdBreak();

                    _this9.cuePoints.splice(index, 1);
                  }
                });
              }); // Listen to the resizing of the window. And resize ad accordingly
              // TODO: eventually implement ResizeObserver

              window.addEventListener("resize", function () {
                if (_this9.manager) {
                  _this9.manager.resize(
                    container.offsetWidth,
                    container.offsetHeight,
                    google.ima.ViewMode.NORMAL
                  );
                }
              });
            },
            /**
             * Initialize the adsManager and start playing advertisements
             */
          },
          {
            key: "play",
            value: function play() {
              var _this10 = this;

              var container = this.player.elements.container;

              if (!this.managerPromise) {
                this.resumeContent();
              } // Play the requested advertisement whenever the adsManager is ready

              this.managerPromise
                .then(function () {
                  // Set volume to match player
                  _this10.manager.setVolume(_this10.player.volume); // Initialize the container. Must be done via a user action on mobile devices

                  _this10.elements.displayContainer.initialize();

                  try {
                    if (!_this10.initialized) {
                      // Initialize the ads manager. Ad rules playlist will start at this time
                      _this10.manager.init(
                        container.offsetWidth,
                        container.offsetHeight,
                        google.ima.ViewMode.NORMAL
                      ); // Call play to start showing the ad. Single video and overlay ads will
                      // start at this time; the call will be ignored for ad rules

                      _this10.manager.start();
                    }

                    _this10.initialized = true;
                  } catch (adError) {
                    // An error may be thrown if there was a problem with the
                    // VAST response
                    _this10.onAdError(adError);
                  }
                })
                .catch(function () {});
            },
            /**
             * Resume our video
             */
          },
          {
            key: "resumeContent",
            value: function resumeContent() {
              // Hide the advertisement container
              this.elements.container.style.zIndex = ""; // Ad is stopped

              this.playing = false; // Play video

              this.player.media.play();
            },
            /**
             * Pause our video
             */
          },
          {
            key: "pauseContent",
            value: function pauseContent() {
              // Show the advertisement container
              this.elements.container.style.zIndex = 3; // Ad is playing

              this.playing = true; // Pause our video.

              this.player.media.pause();
            },
            /**
             * Destroy the adsManager so we can grab new ads after this. If we don't then we're not
             * allowed to call new ads based on google policies, as they interpret this as an accidental
             * video requests. https://developers.google.com/interactive-
             * media-ads/docs/sdks/android/faq#8
             */
          },
          {
            key: "cancel",
            value: function cancel() {
              // Pause our video
              if (this.initialized) {
                this.resumeContent();
              } // Tell our instance that we're done for now

              this.trigger("error"); // Re-create our adsManager

              this.loadAds();
            },
            /**
             * Re-create our adsManager
             */
          },
          {
            key: "loadAds",
            value: function loadAds() {
              var _this11 = this;

              // Tell our adsManager to go bye bye
              this.managerPromise
                .then(function () {
                  // Destroy our adsManager
                  if (_this11.manager) {
                    _this11.manager.destroy();
                  } // Re-set our adsManager promises

                  _this11.managerPromise = new Promise(function (resolve) {
                    _this11.on("loaded", resolve);

                    _this11.player.debug.log(_this11.manager);
                  }); // Now request some new advertisements

                  _this11.requestAds();
                })
                .catch(function () {});
            },
            /**
             * Handles callbacks after an ad event was invoked
             * @param {String} event - Event type
             */
          },
          {
            key: "trigger",
            value: function trigger(event) {
              var _this12 = this;

              for (
                var _len = arguments.length,
                  args = new Array(_len > 1 ? _len - 1 : 0),
                  _key = 1;
                _key < _len;
                _key++
              ) {
                args[_key - 1] = arguments[_key];
              }

              var handlers = this.events[event];

              if (is$1.array(handlers)) {
                handlers.forEach(function (handler) {
                  if (is$1.function(handler)) {
                    handler.apply(_this12, args);
                  }
                });
              }
            },
            /**
             * Add event listeners
             * @param {String} event - Event type
             * @param {Function} callback - Callback for when event occurs
             * @return {Ads}
             */
          },
          {
            key: "on",
            value: function on(event, callback) {
              if (!is$1.array(this.events[event])) {
                this.events[event] = [];
              }

              this.events[event].push(callback);
              return this;
            },
            /**
             * Setup a safety timer for when the ad network doesn't respond for whatever reason.
             * The advertisement has 12 seconds to get its things together. We stop this timer when the
             * advertisement is playing, or when a user action is required to start, then we clear the
             * timer on ad ready
             * @param {Number} time
             * @param {String} from
             */
          },
          {
            key: "startSafetyTimer",
            value: function startSafetyTimer(time, from) {
              var _this13 = this;

              this.player.debug.log("Safety timer invoked from: ".concat(from));
              this.safetyTimer = setTimeout(function () {
                _this13.cancel();

                _this13.clearSafetyTimer("startSafetyTimer()");
              }, time);
            },
            /**
             * Clear our safety timer(s)
             * @param {String} from
             */
          },
          {
            key: "clearSafetyTimer",
            value: function clearSafetyTimer(from) {
              if (!is$1.nullOrUndefined(this.safetyTimer)) {
                this.player.debug.log(
                  "Safety timer cleared from: ".concat(from)
                );
                clearTimeout(this.safetyTimer);
                this.safetyTimer = null;
              }
            },
          },
          {
            key: "enabled",
            get: function get() {
              var config = this.config;
              return (
                this.player.isHTML5 &&
                this.player.isVideo &&
                config.enabled &&
                (!is$1.empty(config.publisherId) || is$1.url(config.tagUrl))
              );
            },
          },
          {
            key: "tagUrl",
            get: function get() {
              var config = this.config;

              if (is$1.url(config.tagUrl)) {
                return config.tagUrl;
              }

              var params = {
                AV_PUBLISHERID: "58c25bb0073ef448b1087ad6",
                AV_CHANNELID: "5a0458dc28a06145e4519d21",
                AV_URL: window.location.hostname,
                cb: Date.now(),
                AV_WIDTH: 640,
                AV_HEIGHT: 480,
                AV_CDIM2: this.publisherId,
              };
              var base = "https://go.aniview.com/api/adserver6/vast/";
              return "".concat(base, "?").concat(buildUrlParams(params));
            },
          },
        ]);

        return Ads;
      })();

    var parseVtt = function parseVtt(vttDataString) {
      var processedList = [];
      var frames = vttDataString.split(/\r\n\r\n|\n\n|\r\r/);
      frames.forEach(function (frame) {
        var result = {};
        var lines = frame.split(/\r\n|\n|\r/);
        lines.forEach(function (line) {
          if (!is$1.number(result.startTime)) {
            // The line with start and end times on it is the first line of interest
            var matchTimes = line.match(
              /([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/
            ); // Note that this currently ignores caption formatting directives that are optionally on the end of this line - fine for non-captions VTT

            if (matchTimes) {
              result.startTime =
                Number(matchTimes[1] || 0) * 60 * 60 +
                Number(matchTimes[2]) * 60 +
                Number(matchTimes[3]) +
                Number("0.".concat(matchTimes[4]));
              result.endTime =
                Number(matchTimes[6] || 0) * 60 * 60 +
                Number(matchTimes[7]) * 60 +
                Number(matchTimes[8]) +
                Number("0.".concat(matchTimes[9]));
            }
          } else if (!is$1.empty(line.trim()) && is$1.empty(result.text)) {
            // If we already have the startTime, then we're definitely up to the text line(s)
            var lineSplit = line.trim().split("#xywh=");

            var _lineSplit = _slicedToArray(lineSplit, 1);

            result.text = _lineSplit[0];

            // If there's content in lineSplit[1], then we have sprites. If not, then it's just one frame per image
            if (lineSplit[1]) {
              var _lineSplit$1$split = lineSplit[1].split(",");

              var _lineSplit$1$split2 = _slicedToArray(_lineSplit$1$split, 4);

              result.x = _lineSplit$1$split2[0];
              result.y = _lineSplit$1$split2[1];
              result.w = _lineSplit$1$split2[2];
              result.h = _lineSplit$1$split2[3];
            }
          }
        });

        if (result.text) {
          processedList.push(result);
        }
      });
      return processedList;
    };
    /**
     * Preview thumbnails for seek hover and scrubbing
     * Seeking: Hover over the seek bar (desktop only): shows a small preview container above the seek bar
     * Scrubbing: Click and drag the seek bar (desktop and mobile): shows the preview image over the entire video, as if the video is scrubbing at very high speed
     *
     * Notes:
     * - Thumbs are set via JS settings on Plyr init, not HTML5 'track' property. Using the track property would be a bit gross, because it doesn't support custom 'kinds'. kind=metadata might be used for something else, and we want to allow multiple thumbnails tracks. Tracks must have a unique combination of 'kind' and 'label'. We would have to do something like kind=metadata,label=thumbnails1 / kind=metadata,label=thumbnails2. Square peg, round hole
     * - VTT info: the image URL is relative to the VTT, not the current document. But if the url starts with a slash, it will naturally be relative to the current domain. https://support.jwplayer.com/articles/how-to-add-preview-thumbnails
     * - This implementation uses multiple separate img elements. Other implementations use background-image on one element. This would be nice and simple, but Firefox and Safari have flickering issues with replacing backgrounds of larger images. It seems that YouTube perhaps only avoids this because they don't have the option for high-res previews (even the fullscreen ones, when mousedown/seeking). Images appear over the top of each other, and previous ones are discarded once the new ones have been rendered
     */

    var PreviewThumbnails =
      /*#__PURE__*/
      (function () {
        /**
         * PreviewThumbnails constructor.
         * @param {Plyr} player
         * @return {PreviewThumbnails}
         */
        function PreviewThumbnails(player) {
          _classCallCheck(this, PreviewThumbnails);

          this.player = player;
          this.thumbnails = [];
          this.loaded = false;
          this.lastMouseMoveTime = Date.now();
          this.mouseDown = false;
          this.loadedImages = [];
          this.elements = {
            thumb: {},
            scrubbing: {},
          };
          this.load();
        }

        _createClass(PreviewThumbnails, [
          {
            key: "load",
            value: function load() {
              var _this = this;

              // Togglethe regular seek tooltip
              if (this.player.elements.display.seekTooltip) {
                this.player.elements.display.seekTooltip.hidden = this.enabled;
              }

              if (!this.enabled) {
                return;
              }

              this.getThumbnails().then(function () {
                // Render DOM elements
                _this.render(); // Check to see if thumb container size was specified manually in CSS

                _this.determineContainerAutoSizing();

                _this.loaded = true;
              });
            }, // Download VTT files and parse them
          },
          {
            key: "getThumbnails",
            value: function getThumbnails() {
              var _this2 = this;

              return new Promise(function (resolve) {
                var src = _this2.player.config.previewThumbnails.src;

                if (is$1.empty(src)) {
                  throw new Error(
                    "Missing previewThumbnails.src config attribute"
                  );
                } // If string, convert into single-element list

                var urls = is$1.string(src) ? [src] : src; // Loop through each src URL. Download and process the VTT file, storing the resulting data in this.thumbnails

                var promises = urls.map(function (u) {
                  return _this2.getThumbnail(u);
                });
                Promise.all(promises).then(function () {
                  // Sort smallest to biggest (e.g., [120p, 480p, 1080p])
                  _this2.thumbnails.sort(function (x, y) {
                    return x.height - y.height;
                  });

                  _this2.player.debug.log(
                    "Preview thumbnails",
                    _this2.thumbnails
                  );

                  resolve();
                });
              });
            }, // Process individual VTT file
          },
          {
            key: "getThumbnail",
            value: function getThumbnail(url) {
              var _this3 = this;

              return new Promise(function (resolve) {
                fetch(url).then(function (response) {
                  var thumbnail = {
                    frames: parseVtt(response),
                    height: null,
                    urlPrefix: "",
                  }; // If the URLs don't start with '/', then we need to set their relative path to be the location of the VTT file
                  // If the URLs do start with '/', then they obviously don't need a prefix, so it will remain blank
                  // If the thumbnail URLs start with with none of '/', 'http://' or 'https://', then we need to set their relative path to be the location of the VTT file

                  if (
                    !thumbnail.frames[0].text.startsWith("/") &&
                    !thumbnail.frames[0].text.startsWith("http://") &&
                    !thumbnail.frames[0].text.startsWith("https://")
                  ) {
                    thumbnail.urlPrefix = url.substring(
                      0,
                      url.lastIndexOf("/") + 1
                    );
                  } // Download the first frame, so that we can determine/set the height of this thumbnailsDef

                  var tempImage = new Image();

                  tempImage.onload = function () {
                    thumbnail.height = tempImage.naturalHeight;
                    thumbnail.width = tempImage.naturalWidth;

                    _this3.thumbnails.push(thumbnail);

                    resolve();
                  };

                  tempImage.src =
                    thumbnail.urlPrefix + thumbnail.frames[0].text;
                });
              });
            },
          },
          {
            key: "startMove",
            value: function startMove(event) {
              if (!this.loaded) {
                return;
              }

              if (
                !is$1.event(event) ||
                !["touchmove", "mousemove"].includes(event.type)
              ) {
                return;
              } // Wait until media has a duration

              if (!this.player.media.duration) {
                return;
              }

              if (event.type === "touchmove") {
                // Calculate seek hover position as approx video seconds
                this.seekTime =
                  this.player.media.duration *
                  (this.player.elements.inputs.seek.value / 100);
              } else {
                // Calculate seek hover position as approx video seconds
                var clientRect =
                  this.player.elements.progress.getBoundingClientRect();
                var percentage =
                  (100 / clientRect.width) * (event.pageX - clientRect.left);
                this.seekTime = this.player.media.duration * (percentage / 100);

                if (this.seekTime < 0) {
                  // The mousemove fires for 10+px out to the left
                  this.seekTime = 0;
                }

                if (this.seekTime > this.player.media.duration - 1) {
                  // Took 1 second off the duration for safety, because different players can disagree on the real duration of a video
                  this.seekTime = this.player.media.duration - 1;
                }

                this.mousePosX = event.pageX; // Set time text inside image container

                this.elements.thumb.time.innerText = formatTime(this.seekTime);
              } // Download and show image

              this.showImageAtCurrentTime();
            },
          },
          {
            key: "endMove",
            value: function endMove() {
              this.toggleThumbContainer(false, true);
            },
          },
          {
            key: "startScrubbing",
            value: function startScrubbing(event) {
              // Only act on left mouse button (0), or touch device (event.button is false)
              if (event.button === false || event.button === 0) {
                this.mouseDown = true; // Wait until media has a duration

                if (this.player.media.duration) {
                  this.toggleScrubbingContainer(true);
                  this.toggleThumbContainer(false, true); // Download and show image

                  this.showImageAtCurrentTime();
                }
              }
            },
          },
          {
            key: "endScrubbing",
            value: function endScrubbing() {
              var _this4 = this;

              this.mouseDown = false; // Hide scrubbing preview. But wait until the video has successfully seeked before hiding the scrubbing preview

              if (
                Math.ceil(this.lastTime) ===
                Math.ceil(this.player.media.currentTime)
              ) {
                // The video was already seeked/loaded at the chosen time - hide immediately
                this.toggleScrubbingContainer(false);
              } else {
                // The video hasn't seeked yet. Wait for that
                once.call(
                  this.player,
                  this.player.media,
                  "timeupdate",
                  function () {
                    // Re-check mousedown - we might have already started scrubbing again
                    if (!_this4.mouseDown) {
                      _this4.toggleScrubbingContainer(false);
                    }
                  }
                );
              }
            },
            /**
             * Setup hooks for Plyr and window events
             */
          },
          {
            key: "listeners",
            value: function listeners() {
              var _this5 = this;

              // Hide thumbnail preview - on mouse click, mouse leave (in listeners.js for now), and video play/seek. All four are required, e.g., for buffering
              this.player.on("play", function () {
                _this5.toggleThumbContainer(false, true);
              });
              this.player.on("seeked", function () {
                _this5.toggleThumbContainer(false);
              });
              this.player.on("timeupdate", function () {
                _this5.lastTime = _this5.player.media.currentTime;
              });
            },
            /**
             * Create HTML elements for image containers
             */
          },
          {
            key: "render",
            value: function render() {
              // Create HTML element: plyr__preview-thumbnail-container
              this.elements.thumb.container = createElement("div", {
                class:
                  this.player.config.classNames.previewThumbnails
                    .thumbContainer,
              }); // Wrapper for the image for styling

              this.elements.thumb.imageContainer = createElement("div", {
                class:
                  this.player.config.classNames.previewThumbnails
                    .imageContainer,
              });
              this.elements.thumb.container.appendChild(
                this.elements.thumb.imageContainer
              ); // Create HTML element, parent+span: time text (e.g., 01:32:00)

              var timeContainer = createElement("div", {
                class:
                  this.player.config.classNames.previewThumbnails.timeContainer,
              });
              this.elements.thumb.time = createElement("span", {}, "00:00");
              timeContainer.appendChild(this.elements.thumb.time);
              this.elements.thumb.container.appendChild(timeContainer); // Inject the whole thumb

              if (is$1.element(this.player.elements.progress)) {
                this.player.elements.progress.appendChild(
                  this.elements.thumb.container
                );
              } // Create HTML element: plyr__preview-scrubbing-container

              this.elements.scrubbing.container = createElement("div", {
                class:
                  this.player.config.classNames.previewThumbnails
                    .scrubbingContainer,
              });
              this.player.elements.wrapper.appendChild(
                this.elements.scrubbing.container
              );
            },
          },
          {
            key: "showImageAtCurrentTime",
            value: function showImageAtCurrentTime() {
              var _this6 = this;

              if (this.mouseDown) {
                this.setScrubbingContainerSize();
              } else {
                this.setThumbContainerSizeAndPos();
              } // Find the desired thumbnail index
              // TODO: Handle a video longer than the thumbs where thumbNum is null

              var thumbNum = this.thumbnails[0].frames.findIndex(function (
                frame
              ) {
                return (
                  _this6.seekTime >= frame.startTime &&
                  _this6.seekTime <= frame.endTime
                );
              });
              var hasThumb = thumbNum >= 0;
              var qualityIndex = 0; // Show the thumb container if we're not scrubbing

              if (!this.mouseDown) {
                this.toggleThumbContainer(hasThumb);
              } // No matching thumb found

              if (!hasThumb) {
                return;
              } // Check to see if we've already downloaded higher quality versions of this image

              this.thumbnails.forEach(function (thumbnail, index) {
                if (
                  _this6.loadedImages.includes(thumbnail.frames[thumbNum].text)
                ) {
                  qualityIndex = index;
                }
              }); // Only proceed if either thumbnum or thumbfilename has changed

              if (thumbNum !== this.showingThumb) {
                this.showingThumb = thumbNum;
                this.loadImage(qualityIndex);
              }
            }, // Show the image that's currently specified in this.showingThumb
          },
          {
            key: "loadImage",
            value: function loadImage() {
              var _this7 = this;

              var qualityIndex =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : 0;
              var thumbNum = this.showingThumb;
              var thumbnail = this.thumbnails[qualityIndex];
              var urlPrefix = thumbnail.urlPrefix;
              var frame = thumbnail.frames[thumbNum];
              var thumbFilename = thumbnail.frames[thumbNum].text;
              var thumbUrl = urlPrefix + thumbFilename;

              if (
                !this.currentImageElement ||
                this.currentImageElement.dataset.filename !== thumbFilename
              ) {
                // If we're already loading a previous image, remove its onload handler - we don't want it to load after this one
                // Only do this if not using sprites. Without sprites we really want to show as many images as possible, as a best-effort
                if (this.loadingImage && this.usingSprites) {
                  this.loadingImage.onload = null;
                } // We're building and adding a new image. In other implementations of similar functionality (YouTube), background image
                // is instead used. But this causes issues with larger images in Firefox and Safari - switching between background
                // images causes a flicker. Putting a new image over the top does not

                var previewImage = new Image();
                previewImage.src = thumbUrl;
                previewImage.dataset.index = thumbNum;
                previewImage.dataset.filename = thumbFilename;
                this.showingThumbFilename = thumbFilename;
                this.player.debug.log("Loading image: ".concat(thumbUrl)); // For some reason, passing the named function directly causes it to execute immediately. So I've wrapped it in an anonymous function...

                previewImage.onload = function () {
                  return _this7.showImage(
                    previewImage,
                    frame,
                    qualityIndex,
                    thumbNum,
                    thumbFilename,
                    true
                  );
                };

                this.loadingImage = previewImage;
                this.removeOldImages(previewImage);
              } else {
                // Update the existing image
                this.showImage(
                  this.currentImageElement,
                  frame,
                  qualityIndex,
                  thumbNum,
                  thumbFilename,
                  false
                );
                this.currentImageElement.dataset.index = thumbNum;
                this.removeOldImages(this.currentImageElement);
              }
            },
          },
          {
            key: "showImage",
            value: function showImage(
              previewImage,
              frame,
              qualityIndex,
              thumbNum,
              thumbFilename
            ) {
              var newImage =
                arguments.length > 5 && arguments[5] !== undefined
                  ? arguments[5]
                  : true;
              this.player.debug.log(
                "Showing thumb: "
                  .concat(thumbFilename, ". num: ")
                  .concat(thumbNum, ". qual: ")
                  .concat(qualityIndex, ". newimg: ")
                  .concat(newImage)
              );
              this.setImageSizeAndOffset(previewImage, frame);

              if (newImage) {
                this.currentImageContainer.appendChild(previewImage);
                this.currentImageElement = previewImage;

                if (!this.loadedImages.includes(thumbFilename)) {
                  this.loadedImages.push(thumbFilename);
                }
              } // Preload images before and after the current one
              // Show higher quality of the same frame
              // Each step here has a short time delay, and only continues if still hovering/seeking the same spot. This is to protect slow connections from overloading

              this.preloadNearby(thumbNum, true)
                .then(this.preloadNearby(thumbNum, false))
                .then(
                  this.getHigherQuality(
                    qualityIndex,
                    previewImage,
                    frame,
                    thumbFilename
                  )
                );
            }, // Remove all preview images that aren't the designated current image
          },
          {
            key: "removeOldImages",
            value: function removeOldImages(currentImage) {
              var _this8 = this;

              // Get a list of all images, convert it from a DOM list to an array
              Array.from(this.currentImageContainer.children).forEach(function (
                image
              ) {
                if (image.tagName.toLowerCase() !== "img") {
                  return;
                }

                var removeDelay = _this8.usingSprites ? 500 : 1000;

                if (
                  image.dataset.index !== currentImage.dataset.index &&
                  !image.dataset.deleting
                ) {
                  // Wait 200ms, as the new image can take some time to show on certain browsers (even though it was downloaded before showing). This will prevent flicker, and show some generosity towards slower clients
                  // First set attribute 'deleting' to prevent multi-handling of this on repeat firing of this function
                  image.dataset.deleting = true; // This has to be set before the timeout - to prevent issues switching between hover and scrub

                  var currentImageContainer = _this8.currentImageContainer;
                  setTimeout(function () {
                    currentImageContainer.removeChild(image);

                    _this8.player.debug.log(
                      "Removing thumb: ".concat(image.dataset.filename)
                    );
                  }, removeDelay);
                }
              });
            }, // Preload images before and after the current one. Only if the user is still hovering/seeking the same frame
            // This will only preload the lowest quality
          },
          {
            key: "preloadNearby",
            value: function preloadNearby(thumbNum) {
              var _this9 = this;

              var forward =
                arguments.length > 1 && arguments[1] !== undefined
                  ? arguments[1]
                  : true;
              return new Promise(function (resolve) {
                setTimeout(function () {
                  var oldThumbFilename =
                    _this9.thumbnails[0].frames[thumbNum].text;

                  if (_this9.showingThumbFilename === oldThumbFilename) {
                    // Find the nearest thumbs with different filenames. Sometimes it'll be the next index, but in the case of sprites, it might be 100+ away
                    var thumbnailsClone;

                    if (forward) {
                      thumbnailsClone =
                        _this9.thumbnails[0].frames.slice(thumbNum);
                    } else {
                      thumbnailsClone = _this9.thumbnails[0].frames
                        .slice(0, thumbNum)
                        .reverse();
                    }

                    var foundOne = false;
                    thumbnailsClone.forEach(function (frame) {
                      var newThumbFilename = frame.text;

                      if (newThumbFilename !== oldThumbFilename) {
                        // Found one with a different filename. Make sure it hasn't already been loaded on this page visit
                        if (!_this9.loadedImages.includes(newThumbFilename)) {
                          foundOne = true;

                          _this9.player.debug.log(
                            "Preloading thumb filename: ".concat(
                              newThumbFilename
                            )
                          );

                          var urlPrefix = _this9.thumbnails[0].urlPrefix;
                          var thumbURL = urlPrefix + newThumbFilename;
                          var previewImage = new Image();
                          previewImage.src = thumbURL;

                          previewImage.onload = function () {
                            _this9.player.debug.log(
                              "Preloaded thumb filename: ".concat(
                                newThumbFilename
                              )
                            );

                            if (!_this9.loadedImages.includes(newThumbFilename))
                              _this9.loadedImages.push(newThumbFilename); // We don't resolve until the thumb is loaded

                            resolve();
                          };
                        }
                      }
                    }); // If there are none to preload then we want to resolve immediately

                    if (!foundOne) {
                      resolve();
                    }
                  }
                }, 300);
              });
            }, // If user has been hovering current image for half a second, look for a higher quality one
          },
          {
            key: "getHigherQuality",
            value: function getHigherQuality(
              currentQualityIndex,
              previewImage,
              frame,
              thumbFilename
            ) {
              var _this10 = this;

              if (currentQualityIndex < this.thumbnails.length - 1) {
                // Only use the higher quality version if it's going to look any better - if the current thumb is of a lower pixel density than the thumbnail container
                var previewImageHeight = previewImage.naturalHeight;

                if (this.usingSprites) {
                  previewImageHeight = frame.h;
                }

                if (previewImageHeight < this.thumbContainerHeight) {
                  // Recurse back to the loadImage function - show a higher quality one, but only if the viewer is on this frame for a while
                  setTimeout(function () {
                    // Make sure the mouse hasn't already moved on and started hovering at another image
                    if (_this10.showingThumbFilename === thumbFilename) {
                      _this10.player.debug.log(
                        "Showing higher quality thumb for: ".concat(
                          thumbFilename
                        )
                      );

                      _this10.loadImage(currentQualityIndex + 1);
                    }
                  }, 300);
                }
              }
            },
          },
          {
            key: "toggleThumbContainer",
            value: function toggleThumbContainer() {
              var toggle =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : false;
              var clearShowing =
                arguments.length > 1 && arguments[1] !== undefined
                  ? arguments[1]
                  : false;
              var className =
                this.player.config.classNames.previewThumbnails
                  .thumbContainerShown;
              this.elements.thumb.container.classList.toggle(className, toggle);

              if (!toggle && clearShowing) {
                this.showingThumb = null;
                this.showingThumbFilename = null;
              }
            },
          },
          {
            key: "toggleScrubbingContainer",
            value: function toggleScrubbingContainer() {
              var toggle =
                arguments.length > 0 && arguments[0] !== undefined
                  ? arguments[0]
                  : false;
              var className =
                this.player.config.classNames.previewThumbnails
                  .scrubbingContainerShown;
              this.elements.scrubbing.container.classList.toggle(
                className,
                toggle
              );

              if (!toggle) {
                this.showingThumb = null;
                this.showingThumbFilename = null;
              }
            },
          },
          {
            key: "determineContainerAutoSizing",
            value: function determineContainerAutoSizing() {
              if (this.elements.thumb.imageContainer.clientHeight > 20) {
                // This will prevent auto sizing in this.setThumbContainerSizeAndPos()
                this.sizeSpecifiedInCSS = true;
              }
            }, // Set the size to be about a quarter of the size of video. Unless option dynamicSize === false, in which case it needs to be set in CSS
          },
          {
            key: "setThumbContainerSizeAndPos",
            value: function setThumbContainerSizeAndPos() {
              if (!this.sizeSpecifiedInCSS) {
                var thumbWidth = Math.floor(
                  this.thumbContainerHeight * this.thumbAspectRatio
                );
                this.elements.thumb.imageContainer.style.height = "".concat(
                  this.thumbContainerHeight,
                  "px"
                );
                this.elements.thumb.imageContainer.style.width = "".concat(
                  thumbWidth,
                  "px"
                );
              }

              this.setThumbContainerPos();
            },
          },
          {
            key: "setThumbContainerPos",
            value: function setThumbContainerPos() {
              var seekbarRect =
                this.player.elements.progress.getBoundingClientRect();
              var plyrRect =
                this.player.elements.container.getBoundingClientRect();
              var container = this.elements.thumb.container; // Find the lowest and highest desired left-position, so we don't slide out the side of the video container

              var minVal = plyrRect.left - seekbarRect.left + 10;
              var maxVal =
                plyrRect.right - seekbarRect.left - container.clientWidth - 10; // Set preview container position to: mousepos, minus seekbar.left, minus half of previewContainer.clientWidth

              var previewPos =
                this.mousePosX - seekbarRect.left - container.clientWidth / 2;

              if (previewPos < minVal) {
                previewPos = minVal;
              }

              if (previewPos > maxVal) {
                previewPos = maxVal;
              }

              container.style.left = "".concat(previewPos, "px");
            }, // Can't use 100% width, in case the video is a different aspect ratio to the video container
          },
          {
            key: "setScrubbingContainerSize",
            value: function setScrubbingContainerSize() {
              this.elements.scrubbing.container.style.width = "".concat(
                this.player.media.clientWidth,
                "px"
              ); // Can't use media.clientHeight - html5 video goes big and does black bars above and below

              this.elements.scrubbing.container.style.height = "".concat(
                this.player.media.clientWidth / this.thumbAspectRatio,
                "px"
              );
            }, // Sprites need to be offset to the correct location
          },
          {
            key: "setImageSizeAndOffset",
            value: function setImageSizeAndOffset(previewImage, frame) {
              if (!this.usingSprites) {
                return;
              } // Find difference between height and preview container height

              var multiplier = this.thumbContainerHeight / frame.h;
              previewImage.style.height = "".concat(
                Math.floor(previewImage.naturalHeight * multiplier),
                "px"
              );
              previewImage.style.width = "".concat(
                Math.floor(previewImage.naturalWidth * multiplier),
                "px"
              );
              previewImage.style.left = "-".concat(frame.x * multiplier, "px");
              previewImage.style.top = "-".concat(frame.y * multiplier, "px");
            },
          },
          {
            key: "enabled",
            get: function get() {
              return (
                this.player.isHTML5 &&
                this.player.isVideo &&
                this.player.config.previewThumbnails.enabled
              );
            },
          },
          {
            key: "currentImageContainer",
            get: function get() {
              if (this.mouseDown) {
                return this.elements.scrubbing.container;
              }

              return this.elements.thumb.imageContainer;
            },
          },
          {
            key: "usingSprites",
            get: function get() {
              return Object.keys(this.thumbnails[0].frames[0]).includes("w");
            },
          },
          {
            key: "thumbAspectRatio",
            get: function get() {
              if (this.usingSprites) {
                return (
                  this.thumbnails[0].frames[0].w /
                  this.thumbnails[0].frames[0].h
                );
              }

              return this.thumbnails[0].width / this.thumbnails[0].height;
            },
          },
          {
            key: "thumbContainerHeight",
            get: function get() {
              if (this.mouseDown) {
                // Can't use media.clientHeight - HTML5 video goes big and does black bars above and below
                return Math.floor(
                  this.player.media.clientWidth / this.thumbAspectRatio
                );
              }

              return Math.floor(
                this.player.media.clientWidth / this.thumbAspectRatio / 4
              );
            },
          },
          {
            key: "currentImageElement",
            get: function get() {
              if (this.mouseDown) {
                return this.currentScrubbingImageElement;
              }

              return this.currentThumbnailImageElement;
            },
            set: function set(element) {
              if (this.mouseDown) {
                this.currentScrubbingImageElement = element;
              } else {
                this.currentThumbnailImageElement = element;
              }
            },
          },
        ]);

        return PreviewThumbnails;
      })();

    var source = {
      // Add elements to HTML5 media (source, tracks, etc)
      insertElements: function insertElements(type, attributes) {
        var _this = this;

        if (is$1.string(attributes)) {
          insertElement(type, this.media, {
            src: attributes,
          });
        } else if (is$1.array(attributes)) {
          attributes.forEach(function (attribute) {
            insertElement(type, _this.media, attribute);
          });
        }
      },
      // Update source
      // Sources are not checked for support so be careful
      change: function change(input) {
        var _this2 = this;

        if (!getDeep(input, "sources.length")) {
          this.debug.warn("Invalid source format");
          return;
        } // Cancel current network requests

        html5.cancelRequests.call(this); // Destroy instance and re-setup

        this.destroy.call(
          this,
          function () {
            // Reset quality options
            _this2.options.quality = []; // Remove elements

            removeElement(_this2.media);
            _this2.media = null; // Reset class name

            if (is$1.element(_this2.elements.container)) {
              _this2.elements.container.removeAttribute("class");
            } // Set the type and provider

            var sources = input.sources,
              type = input.type;

            var _sources = _slicedToArray(sources, 1),
              _sources$ = _sources[0],
              _sources$$provider = _sources$.provider,
              provider =
                _sources$$provider === void 0
                  ? providers.html5
                  : _sources$$provider,
              src = _sources$.src;

            var tagName = provider === "html5" ? type : "div";
            var attributes =
              provider === "html5"
                ? {}
                : {
                    src: src,
                  };
            Object.assign(_this2, {
              provider: provider,
              type: type,
              // Check for support
              supported: support.check(
                type,
                provider,
                _this2.config.playsinline
              ),
              // Create new element
              media: createElement(tagName, attributes),
            }); // Inject the new element

            _this2.elements.container.appendChild(_this2.media); // Autoplay the new source?

            if (is$1.boolean(input.autoplay)) {
              _this2.config.autoplay = input.autoplay;
            } // Set attributes for audio and video

            if (_this2.isHTML5) {
              if (_this2.config.crossorigin) {
                _this2.media.setAttribute("crossorigin", "");
              }

              if (_this2.config.autoplay) {
                _this2.media.setAttribute("autoplay", "");
              }

              if (!is$1.empty(input.poster)) {
                _this2.poster = input.poster;
              }

              if (_this2.config.loop.active) {
                _this2.media.setAttribute("loop", "");
              }

              if (_this2.config.muted) {
                _this2.media.setAttribute("muted", "");
              }

              if (_this2.config.playsinline) {
                _this2.media.setAttribute("playsinline", "");
              }
            } // Restore class hook

            ui.addStyleHook.call(_this2); // Set new sources for html5

            if (_this2.isHTML5) {
              source.insertElements.call(_this2, "source", sources);
            } // Set video title

            _this2.config.title = input.title; // Set up from scratch

            media.setup.call(_this2); // HTML5 stuff

            if (_this2.isHTML5) {
              // Setup captions
              if (Object.keys(input).includes("tracks")) {
                source.insertElements.call(_this2, "track", input.tracks);
              }
            } // If HTML5 or embed but not fully supported, setupInterface and call ready now

            if (_this2.isHTML5 || (_this2.isEmbed && !_this2.supported.ui)) {
              // Setup interface
              ui.build.call(_this2);
            } // Load HTML5 sources

            if (_this2.isHTML5) {
              _this2.media.load();
            } // Reload thumbnails

            if (_this2.previewThumbnails) {
              _this2.previewThumbnails.load();
            } // Update the fullscreen support

            _this2.fullscreen.update();
          },
          true
        );
      },
    };

    /**
     * Returns a number whose value is limited to the given range.
     *
     * Example: limit the output of this computation to between 0 and 255
     * (x * 255).clamp(0, 255)
     *
     * @param {Number} input
     * @param {Number} min The lower boundary of the output range
     * @param {Number} max The upper boundary of the output range
     * @returns A number in the range [min, max]
     * @type Number
     */
    function clamp() {
      var input =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var min =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var max =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;
      return Math.min(Math.max(input, min), max);
    }

    // TODO: Use a WeakMap for private globals
    // const globals = new WeakMap();
    // Plyr instance

    var Plyr =
      /*#__PURE__*/
      (function () {
        function Plyr(target, options) {
          var _this = this;

          _classCallCheck(this, Plyr);

          this.timers = {}; // State

          this.ready = false;
          this.loading = false;
          this.failed = false; // Touch device

          this.touch = support.touch; // Set the media element

          this.media = target; // String selector passed

          if (is$1.string(this.media)) {
            this.media = document.querySelectorAll(this.media);
          } // jQuery, NodeList or Array passed, use first element

          if (
            (window.jQuery && this.media instanceof jQuery) ||
            is$1.nodeList(this.media) ||
            is$1.array(this.media)
          ) {
            // eslint-disable-next-line
            this.media = this.media[0];
          } // Set config

          this.config = extend(
            {},
            defaults$1,
            Plyr.defaults,
            options || {},
            (function () {
              try {
                return JSON.parse(_this.media.getAttribute("data-plyr-config"));
              } catch (e) {
                return {};
              }
            })()
          ); // Elements cache

          this.elements = {
            container: null,
            captions: null,
            buttons: {},
            display: {},
            progress: {},
            inputs: {},
            settings: {
              popup: null,
              menu: null,
              panels: {},
              buttons: {},
            },
          }; // Captions

          this.captions = {
            active: null,
            currentTrack: -1,
            meta: new WeakMap(),
          }; // Fullscreen

          this.fullscreen = {
            active: false,
          }; // Options

          this.options = {
            speed: [],
            quality: [],
          }; // Debugging
          // TODO: move to globals

          this.debug = new Console(this.config.debug); // Log config options and support

          this.debug.log("Config", this.config);
          this.debug.log("Support", support); // We need an element to setup

          if (is$1.nullOrUndefined(this.media) || !is$1.element(this.media)) {
            this.debug.error("Setup failed: no suitable element passed");
            return;
          } // Bail if the element is initialized

          if (this.media.plyr) {
            this.debug.warn("Target already setup");
            return;
          } // Bail if not enabled

          if (!this.config.enabled) {
            this.debug.error("Setup failed: disabled by config");
            return;
          } // Bail if disabled or no basic support
          // You may want to disable certain UAs etc

          if (!support.check().api) {
            this.debug.error("Setup failed: no support");
            return;
          } // Cache original element state for .destroy()

          var clone = this.media.cloneNode(true);
          clone.autoplay = false;
          this.elements.original = clone; // Set media type based on tag or data attribute
          // Supported: video, audio, vimeo, youtube

          var type = this.media.tagName.toLowerCase(); // Embed properties

          var iframe = null;
          var url = null; // Different setup based on type

          switch (type) {
            case "div":
              // Find the frame
              iframe = this.media.querySelector("iframe"); // <iframe> type

              if (is$1.element(iframe)) {
                // Detect provider
                url = parseUrl(iframe.getAttribute("src"));
                this.provider = getProviderByUrl(url.toString()); // Rework elements

                this.elements.container = this.media;
                this.media = iframe; // Reset classname

                this.elements.container.className = ""; // Get attributes from URL and set config

                if (url.search.length) {
                  var truthy = ["1", "true"];

                  if (truthy.includes(url.searchParams.get("autoplay"))) {
                    this.config.autoplay = true;
                  }

                  if (truthy.includes(url.searchParams.get("loop"))) {
                    this.config.loop.active = true;
                  } // TODO: replace fullscreen.iosNative with this playsinline config option
                  // YouTube requires the playsinline in the URL

                  if (this.isYouTube) {
                    this.config.playsinline = truthy.includes(
                      url.searchParams.get("playsinline")
                    );
                    this.config.youtube.hl = url.searchParams.get("hl"); // TODO: Should this be setting language?
                  } else {
                    this.config.playsinline = true;
                  }
                }
              } else {
                // <div> with attributes
                this.provider = this.media.getAttribute(
                  this.config.attributes.embed.provider
                ); // Remove attribute

                this.media.removeAttribute(
                  this.config.attributes.embed.provider
                );
              } // Unsupported or missing provider

              if (
                is$1.empty(this.provider) ||
                !Object.keys(providers).includes(this.provider)
              ) {
                this.debug.error("Setup failed: Invalid provider");
                return;
              } // Audio will come later for external providers

              this.type = types.video;
              break;

            case "video":
            case "audio":
              this.type = type;
              this.provider = providers.html5; // Get config from attributes

              if (this.media.hasAttribute("crossorigin")) {
                this.config.crossorigin = true;
              }

              if (this.media.hasAttribute("autoplay")) {
                this.config.autoplay = true;
              }

              if (
                this.media.hasAttribute("playsinline") ||
                this.media.hasAttribute("webkit-playsinline")
              ) {
                this.config.playsinline = true;
              }

              if (this.media.hasAttribute("muted")) {
                this.config.muted = true;
              }

              if (this.media.hasAttribute("loop")) {
                this.config.loop.active = true;
              }

              break;

            default:
              this.debug.error("Setup failed: unsupported type");
              return;
          } // Check for support again but with type

          this.supported = support.check(
            this.type,
            this.provider,
            this.config.playsinline
          ); // If no support for even API, bail

          if (!this.supported.api) {
            this.debug.error("Setup failed: no support");
            return;
          }

          this.eventListeners = []; // Create listeners

          this.listeners = new Listeners(this); // Setup local storage for user settings

          this.storage = new Storage(this); // Store reference

          this.media.plyr = this; // Wrap media

          if (!is$1.element(this.elements.container)) {
            this.elements.container = createElement("div", {
              tabindex: 0,
            });
            wrap(this.media, this.elements.container);
          } // Add style hook

          ui.addStyleHook.call(this); // Setup media

          media.setup.call(this); // Listen for events if debugging

          if (this.config.debug) {
            on.call(
              this,
              this.elements.container,
              this.config.events.join(" "),
              function (event) {
                _this.debug.log("event: ".concat(event.type));
              }
            );
          } // Setup interface
          // If embed but not fully supported, build interface now to avoid flash of controls

          if (this.isHTML5 || (this.isEmbed && !this.supported.ui)) {
            ui.build.call(this);
          } // Container listeners

          this.listeners.container(); // Global listeners

          this.listeners.global(); // Setup fullscreen

          this.fullscreen = new Fullscreen(this); // Setup ads if provided

          if (this.config.ads.enabled) {
            this.ads = new Ads(this);
          } // Autoplay if required

          if (this.isHTML5 && this.config.autoplay) {
            setTimeout(function () {
              return _this.play();
            }, 10);
          } // Seek time will be recorded (in listeners.js) so we can prevent hiding controls for a few seconds after seek

          this.lastSeekTime = 0; // Setup preview thumbnails if enabled

          if (this.config.previewThumbnails.enabled) {
            this.previewThumbnails = new PreviewThumbnails(this);
          }
        } // ---------------------------------------
        // API
        // ---------------------------------------

        /**
         * Types and provider helpers
         */

        _createClass(
          Plyr,
          [
            {
              key: "play",

              /**
               * Play the media, or play the advertisement (if they are not blocked)
               */
              value: function play() {
                var _this2 = this;

                if (!is$1.function(this.media.play)) {
                  return null;
                } // Intecept play with ads

                if (this.ads && this.ads.enabled) {
                  this.ads.managerPromise
                    .then(function () {
                      return _this2.ads.play();
                    })
                    .catch(function () {
                      return _this2.media.play();
                    });
                } // Return the promise (for HTML5)

                return this.media.play();
              },
              /**
               * Pause the media
               */
            },
            {
              key: "pause",
              value: function pause() {
                if (!this.playing || !is$1.function(this.media.pause)) {
                  return;
                }

                this.media.pause();
              },
              /**
               * Get playing state
               */
            },
            {
              key: "togglePlay",

              /**
               * Toggle playback based on current status
               * @param {Boolean} input
               */
              value: function togglePlay(input) {
                // Toggle based on current state if nothing passed
                var toggle = is$1.boolean(input) ? input : !this.playing;

                if (toggle) {
                  this.play();
                } else {
                  this.pause();
                }
              },
              /**
               * Stop playback
               */
            },
            {
              key: "stop",
              value: function stop() {
                if (this.isHTML5) {
                  this.pause();
                  this.restart();
                } else if (is$1.function(this.media.stop)) {
                  this.media.stop();
                }
              },
              /**
               * Restart playback
               */
            },
            {
              key: "restart",
              value: function restart() {
                this.currentTime = 0;
              },
              /**
               * Rewind
               * @param {Number} seekTime - how far to rewind in seconds. Defaults to the config.seekTime
               */
            },
            {
              key: "rewind",
              value: function rewind(seekTime) {
                this.currentTime =
                  this.currentTime -
                  (is$1.number(seekTime) ? seekTime : this.config.seekTime);
              },
              /**
               * Fast forward
               * @param {Number} seekTime - how far to fast forward in seconds. Defaults to the config.seekTime
               */
            },
            {
              key: "forward",
              value: function forward(seekTime) {
                this.currentTime =
                  this.currentTime +
                  (is$1.number(seekTime) ? seekTime : this.config.seekTime);
              },
              /**
               * Seek to a time
               * @param {Number} input - where to seek to in seconds. Defaults to 0 (the start)
               */
            },
            {
              key: "increaseVolume",

              /**
               * Increase volume
               * @param {Boolean} step - How much to decrease by (between 0 and 1)
               */
              value: function increaseVolume(step) {
                var volume = this.media.muted ? 0 : this.volume;
                this.volume = volume + (is$1.number(step) ? step : 0);
              },
              /**
               * Decrease volume
               * @param {Boolean} step - How much to decrease by (between 0 and 1)
               */
            },
            {
              key: "decreaseVolume",
              value: function decreaseVolume(step) {
                this.increaseVolume(-step);
              },
              /**
               * Set muted state
               * @param {Boolean} mute
               */
            },
            {
              key: "toggleCaptions",

              /**
               * Toggle captions
               * @param {Boolean} input - Whether to enable captions
               */
              value: function toggleCaptions(input) {
                captions.toggle.call(this, input, false);
              },
              /**
               * Set the caption track by index
               * @param {Number} - Caption index
               */
            },
            {
              key: "airplay",

              /**
               * Trigger the airplay dialog
               * TODO: update player with state, support, enabled
               */
              value: function airplay() {
                // Show dialog if supported
                if (support.airplay) {
                  this.media.webkitShowPlaybackTargetPicker();
                }
              },
              /**
               * Toggle the player controls
               * @param {Boolean} [toggle] - Whether to show the controls
               */
            },
            {
              key: "toggleControls",
              value: function toggleControls(toggle) {
                // Don't toggle if missing UI support or if it's audio
                if (this.supported.ui && !this.isAudio) {
                  // Get state before change
                  var isHidden = hasClass(
                    this.elements.container,
                    this.config.classNames.hideControls
                  ); // Negate the argument if not undefined since adding the class to hides the controls

                  var force =
                    typeof toggle === "undefined" ? undefined : !toggle; // Apply and get updated state

                  var hiding = toggleClass(
                    this.elements.container,
                    this.config.classNames.hideControls,
                    force
                  ); // Close menu

                  if (
                    hiding &&
                    this.config.controls.includes("settings") &&
                    !is$1.empty(this.config.settings)
                  ) {
                    controls.toggleMenu.call(this, false);
                  } // Trigger event on change

                  if (hiding !== isHidden) {
                    var eventName = hiding ? "controlshidden" : "controlsshown";
                    triggerEvent.call(this, this.media, eventName);
                  }

                  return !hiding;
                }

                return false;
              },
              /**
               * Add event listeners
               * @param {String} event - Event type
               * @param {Function} callback - Callback for when event occurs
               */
            },
            {
              key: "on",
              value: function on$1(event, callback) {
                on.call(this, this.elements.container, event, callback);
              },
              /**
               * Add event listeners once
               * @param {String} event - Event type
               * @param {Function} callback - Callback for when event occurs
               */
            },
            {
              key: "once",
              value: function once$1(event, callback) {
                once.call(this, this.elements.container, event, callback);
              },
              /**
               * Remove event listeners
               * @param {String} event - Event type
               * @param {Function} callback - Callback for when event occurs
               */
            },
            {
              key: "off",
              value: function off$1(event, callback) {
                off(this.elements.container, event, callback);
              },
              /**
               * Destroy an instance
               * Event listeners are removed when elements are removed
               * http://stackoverflow.com/questions/12528049/if-a-dom-element-is-removed-are-its-listeners-also-removed-from-memory
               * @param {Function} callback - Callback for when destroy is complete
               * @param {Boolean} soft - Whether it's a soft destroy (for source changes etc)
               */
            },
            {
              key: "destroy",
              value: function destroy(callback) {
                var _this3 = this;

                var soft =
                  arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : false;

                if (!this.ready) {
                  return;
                }

                var done = function done() {
                  // Reset overflow (incase destroyed while in fullscreen)
                  document.body.style.overflow = ""; // GC for embed

                  _this3.embed = null; // If it's a soft destroy, make minimal changes

                  if (soft) {
                    if (Object.keys(_this3.elements).length) {
                      // Remove elements
                      removeElement(_this3.elements.buttons.play);
                      removeElement(_this3.elements.captions);
                      removeElement(_this3.elements.controls);
                      removeElement(_this3.elements.wrapper); // Clear for GC

                      _this3.elements.buttons.play = null;
                      _this3.elements.captions = null;
                      _this3.elements.controls = null;
                      _this3.elements.wrapper = null;
                    } // Callback

                    if (is$1.function(callback)) {
                      callback();
                    }
                  } else {
                    // Unbind listeners
                    unbindListeners.call(_this3); // Replace the container with the original element provided

                    replaceElement(
                      _this3.elements.original,
                      _this3.elements.container
                    ); // Event

                    triggerEvent.call(
                      _this3,
                      _this3.elements.original,
                      "destroyed",
                      true
                    ); // Callback

                    if (is$1.function(callback)) {
                      callback.call(_this3.elements.original);
                    } // Reset state

                    _this3.ready = false; // Clear for garbage collection

                    setTimeout(function () {
                      _this3.elements = null;
                      _this3.media = null;
                    }, 200);
                  }
                }; // Stop playback

                this.stop(); // Clear timeouts

                clearTimeout(this.timers.loading);
                clearTimeout(this.timers.controls);
                clearTimeout(this.timers.resized); // Provider specific stuff

                if (this.isHTML5) {
                  // Restore native video controls
                  ui.toggleNativeControls.call(this, true); // Clean up

                  done();
                } else if (this.isYouTube) {
                  // Clear timers
                  clearInterval(this.timers.buffering);
                  clearInterval(this.timers.playing); // Destroy YouTube API

                  if (
                    this.embed !== null &&
                    is$1.function(this.embed.destroy)
                  ) {
                    this.embed.destroy();
                  } // Clean up

                  done();
                } else if (this.isVimeo) {
                  // Destroy Vimeo API
                  // then clean up (wait, to prevent postmessage errors)
                  if (this.embed !== null) {
                    this.embed.unload().then(done);
                  } // Vimeo does not always return

                  setTimeout(done, 200);
                }
              },
              /**
               * Check for support for a mime type (HTML5 only)
               * @param {String} type - Mime type
               */
            },
            {
              key: "supports",
              value: function supports(type) {
                return support.mime.call(this, type);
              },
              /**
               * Check for support
               * @param {String} type - Player type (audio/video)
               * @param {String} provider - Provider (html5/youtube/vimeo)
               * @param {Boolean} inline - Where player has `playsinline` sttribute
               */
            },
            {
              key: "isHTML5",
              get: function get() {
                return Boolean(this.provider === providers.html5);
              },
            },
            {
              key: "isEmbed",
              get: function get() {
                return Boolean(this.isYouTube || this.isVimeo);
              },
            },
            {
              key: "isYouTube",
              get: function get() {
                return Boolean(this.provider === providers.youtube);
              },
            },
            {
              key: "isVimeo",
              get: function get() {
                return Boolean(this.provider === providers.vimeo);
              },
            },
            {
              key: "isVideo",
              get: function get() {
                return Boolean(this.type === types.video);
              },
            },
            {
              key: "isAudio",
              get: function get() {
                return Boolean(this.type === types.audio);
              },
            },
            {
              key: "playing",
              get: function get() {
                return Boolean(this.ready && !this.paused && !this.ended);
              },
              /**
               * Get paused state
               */
            },
            {
              key: "paused",
              get: function get() {
                return Boolean(this.media.paused);
              },
              /**
               * Get stopped state
               */
            },
            {
              key: "stopped",
              get: function get() {
                return Boolean(this.paused && this.currentTime === 0);
              },
              /**
               * Get ended state
               */
            },
            {
              key: "ended",
              get: function get() {
                return Boolean(this.media.ended);
              },
            },
            {
              key: "currentTime",
              set: function set(input) {
                // Bail if media duration isn't available yet
                if (!this.duration) {
                  return;
                } // Validate input

                var inputIsValid = is$1.number(input) && input > 0; // Set

                this.media.currentTime = inputIsValid
                  ? Math.min(input, this.duration)
                  : 0; // Logging

                this.debug.log(
                  "Seeking to ".concat(this.currentTime, " seconds")
                );
              },
              /**
               * Get current time
               */
              get: function get() {
                return Number(this.media.currentTime);
              },
              /**
               * Get buffered
               */
            },
            {
              key: "buffered",
              get: function get() {
                var buffered = this.media.buffered; // YouTube / Vimeo return a float between 0-1

                if (is$1.number(buffered)) {
                  return buffered;
                } // HTML5
                // TODO: Handle buffered chunks of the media
                // (i.e. seek to another section buffers only that section)

                if (buffered && buffered.length && this.duration > 0) {
                  return buffered.end(0) / this.duration;
                }

                return 0;
              },
              /**
               * Get seeking status
               */
            },
            {
              key: "seeking",
              get: function get() {
                return Boolean(this.media.seeking);
              },
              /**
               * Get the duration of the current media
               */
            },
            {
              key: "duration",
              get: function get() {
                // Faux duration set via config
                var fauxDuration = parseFloat(this.config.duration); // Media duration can be NaN or Infinity before the media has loaded

                var realDuration = (this.media || {}).duration;
                var duration =
                  !is$1.number(realDuration) || realDuration === Infinity
                    ? 0
                    : realDuration; // If config duration is funky, use regular duration

                return fauxDuration || duration;
              },
              /**
               * Set the player volume
               * @param {Number} value - must be between 0 and 1. Defaults to the value from local storage and config.volume if not set in storage
               */
            },
            {
              key: "volume",
              set: function set(value) {
                var volume = value;
                var max = 1;
                var min = 0;

                if (is$1.string(volume)) {
                  volume = Number(volume);
                } // Load volume from storage if no value specified

                if (!is$1.number(volume)) {
                  volume = this.storage.get("volume");
                } // Use config if all else fails

                if (!is$1.number(volume)) {
                  volume = this.config.volume;
                } // Maximum is volumeMax

                if (volume > max) {
                  volume = max;
                } // Minimum is volumeMin

                if (volume < min) {
                  volume = min;
                } // Update config

                this.config.volume = volume; // Set the player volume

                this.media.volume = volume; // If muted, and we're increasing volume manually, reset muted state

                if (!is$1.empty(value) && this.muted && volume > 0) {
                  this.muted = false;
                }
              },
              /**
               * Get the current player volume
               */
              get: function get() {
                return Number(this.media.volume);
              },
            },
            {
              key: "muted",
              set: function set(mute) {
                var toggle = mute; // Load muted state from storage

                if (!is$1.boolean(toggle)) {
                  toggle = this.storage.get("muted");
                } // Use config if all else fails

                if (!is$1.boolean(toggle)) {
                  toggle = this.config.muted;
                } // Update config

                this.config.muted = toggle; // Set mute on the player

                this.media.muted = toggle;
              },
              /**
               * Get current muted state
               */
              get: function get() {
                return Boolean(this.media.muted);
              },
              /**
               * Check if the media has audio
               */
            },
            {
              key: "hasAudio",
              get: function get() {
                // Assume yes for all non HTML5 (as we can't tell...)
                if (!this.isHTML5) {
                  return true;
                }

                if (this.isAudio) {
                  return true;
                } // Get audio tracks

                return (
                  Boolean(this.media.mozHasAudio) ||
                  Boolean(this.media.webkitAudioDecodedByteCount) ||
                  Boolean(
                    this.media.audioTracks && this.media.audioTracks.length
                  )
                );
              },
              /**
               * Set playback speed
               * @param {Number} speed - the speed of playback (0.5-2.0)
               */
            },
            {
              key: "speed",
              set: function set(input) {
                var _this4 = this;

                var speed = null;

                if (is$1.number(input)) {
                  speed = input;
                }

                if (!is$1.number(speed)) {
                  speed = this.storage.get("speed");
                }

                if (!is$1.number(speed)) {
                  speed = this.config.speed.selected;
                } // Clamp to min/max

                var min = this.minimumSpeed,
                  max = this.maximumSpeed;
                speed = clamp(speed, min, max); // Update config

                this.config.speed.selected = speed; // Set media speed

                setTimeout(function () {
                  _this4.media.playbackRate = speed;
                }, 0);
              },
              /**
               * Get current playback speed
               */
              get: function get() {
                return Number(this.media.playbackRate);
              },
              /**
               * Get the minimum allowed speed
               */
            },
            {
              key: "minimumSpeed",
              get: function get() {
                if (this.isYouTube) {
                  // https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
                  return Math.min.apply(
                    Math,
                    _toConsumableArray(this.options.speed)
                  );
                }

                if (this.isVimeo) {
                  // https://github.com/vimeo/player.js/#setplaybackrateplaybackrate-number-promisenumber-rangeerrorerror
                  return 0.5;
                } // https://stackoverflow.com/a/32320020/1191319

                return 0.0625;
              },
              /**
               * Get the maximum allowed speed
               */
            },
            {
              key: "maximumSpeed",
              get: function get() {
                if (this.isYouTube) {
                  // https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
                  return Math.max.apply(
                    Math,
                    _toConsumableArray(this.options.speed)
                  );
                }

                if (this.isVimeo) {
                  // https://github.com/vimeo/player.js/#setplaybackrateplaybackrate-number-promisenumber-rangeerrorerror
                  return 2;
                } // https://stackoverflow.com/a/32320020/1191319

                return 16;
              },
              /**
               * Set playback quality
               * Currently HTML5 & YouTube only
               * @param {Number} input - Quality level
               */
            },
            {
              key: "quality",
              set: function set(input) {
                var config = this.config.quality;
                var options = this.options.quality;

                if (!options.length) {
                  return;
                }

                var quality = [
                  !is$1.empty(input) && Number(input),
                  this.storage.get("quality"),
                  config.selected,
                  config.default,
                ].find(is$1.number);
                var updateStorage = true;

                if (!options.includes(quality)) {
                  var value = closest(options, quality);
                  this.debug.warn(
                    "Unsupported quality option: "
                      .concat(quality, ", using ")
                      .concat(value, " instead")
                  );
                  quality = value; // Don't update storage if quality is not supported

                  updateStorage = false;
                } // Update config

                config.selected = quality; // Set quality

                this.media.quality = quality; // Save to storage

                if (updateStorage) {
                  this.storage.set({
                    quality: quality,
                  });
                }
              },
              /**
               * Get current quality level
               */
              get: function get() {
                return this.media.quality;
              },
              /**
               * Toggle loop
               * TODO: Finish fancy new logic. Set the indicator on load as user may pass loop as config
               * @param {Boolean} input - Whether to loop or not
               */
            },
            {
              key: "loop",
              set: function set(input) {
                var toggle = is$1.boolean(input)
                  ? input
                  : this.config.loop.active;
                this.config.loop.active = toggle;
                this.media.loop = toggle; // Set default to be a true toggle

                /* const type = ['start', 'end', 'all', 'none', 'toggle'].includes(input) ? input : 'toggle';
         switch (type) {
            case 'start':
                if (this.config.loop.end && this.config.loop.end <= this.currentTime) {
                    this.config.loop.end = null;
                }
                this.config.loop.start = this.currentTime;
                // this.config.loop.indicator.start = this.elements.display.played.value;
                break;
             case 'end':
                if (this.config.loop.start >= this.currentTime) {
                    return this;
                }
                this.config.loop.end = this.currentTime;
                // this.config.loop.indicator.end = this.elements.display.played.value;
                break;
             case 'all':
                this.config.loop.start = 0;
                this.config.loop.end = this.duration - 2;
                this.config.loop.indicator.start = 0;
                this.config.loop.indicator.end = 100;
                break;
             case 'toggle':
                if (this.config.loop.active) {
                    this.config.loop.start = 0;
                    this.config.loop.end = null;
                } else {
                    this.config.loop.start = 0;
                    this.config.loop.end = this.duration - 2;
                }
                break;
             default:
                this.config.loop.start = 0;
                this.config.loop.end = null;
                break;
        } */
              },
              /**
               * Get current loop state
               */
              get: function get() {
                return Boolean(this.media.loop);
              },
              /**
               * Set new media source
               * @param {Object} input - The new source object (see docs)
               */
            },
            {
              key: "source",
              set: function set(input) {
                source.change.call(this, input);
              },
              /**
               * Get current source
               */
              get: function get() {
                return this.media.currentSrc;
              },
              /**
               * Get a download URL (either source or custom)
               */
            },
            {
              key: "download",
              get: function get() {
                var download = this.config.urls.download;
                return is$1.url(download) ? download : this.source;
              },
              /**
               * Set the download URL
               */
              set: function set(input) {
                if (!is$1.url(input)) {
                  return;
                }

                this.config.urls.download = input;
                controls.setDownloadUrl.call(this);
              },
              /**
               * Set the poster image for a video
               * @param {String} input - the URL for the new poster image
               */
            },
            {
              key: "poster",
              set: function set(input) {
                if (!this.isVideo) {
                  this.debug.warn("Poster can only be set for video");
                  return;
                }

                ui.setPoster.call(this, input, false).catch(function () {});
              },
              /**
               * Get the current poster image
               */
              get: function get() {
                if (!this.isVideo) {
                  return null;
                }

                return this.media.getAttribute("poster");
              },
              /**
               * Get the current aspect ratio in use
               */
            },
            {
              key: "ratio",
              get: function get() {
                if (!this.isVideo) {
                  return null;
                }

                var ratio = reduceAspectRatio(getAspectRatio.call(this));
                return is$1.array(ratio) ? ratio.join(":") : ratio;
              },
              /**
               * Set video aspect ratio
               */
              set: function set(input) {
                if (!this.isVideo) {
                  this.debug.warn("Aspect ratio can only be set for video");
                  return;
                }

                if (!is$1.string(input) || !validateRatio(input)) {
                  this.debug.error(
                    "Invalid aspect ratio specified (".concat(input, ")")
                  );
                  return;
                }

                this.config.ratio = input;
                setAspectRatio.call(this);
              },
              /**
               * Set the autoplay state
               * @param {Boolean} input - Whether to autoplay or not
               */
            },
            {
              key: "autoplay",
              set: function set(input) {
                var toggle = is$1.boolean(input) ? input : this.config.autoplay;
                this.config.autoplay = toggle;
              },
              /**
               * Get the current autoplay state
               */
              get: function get() {
                return Boolean(this.config.autoplay);
              },
            },
            {
              key: "currentTrack",
              set: function set(input) {
                captions.set.call(this, input, false);
              },
              /**
               * Get the current caption track index (-1 if disabled)
               */
              get: function get() {
                var _this$captions = this.captions,
                  toggled = _this$captions.toggled,
                  currentTrack = _this$captions.currentTrack;
                return toggled ? currentTrack : -1;
              },
              /**
               * Set the wanted language for captions
               * Since tracks can be added later it won't update the actual caption track until there is a matching track
               * @param {String} - Two character ISO language code (e.g. EN, FR, PT, etc)
               */
            },
            {
              key: "language",
              set: function set(input) {
                captions.setLanguage.call(this, input, false);
              },
              /**
               * Get the current track's language
               */
              get: function get() {
                return (captions.getCurrentTrack.call(this) || {}).language;
              },
              /**
               * Toggle picture-in-picture playback on WebKit/MacOS
               * TODO: update player with state, support, enabled
               * TODO: detect outside changes
               */
            },
            {
              key: "pip",
              set: function set(input) {
                // Bail if no support
                if (!support.pip) {
                  return;
                } // Toggle based on current state if not passed

                var toggle = is$1.boolean(input) ? input : !this.pip; // Toggle based on current state
                // Safari

                if (is$1.function(this.media.webkitSetPresentationMode)) {
                  this.media.webkitSetPresentationMode(
                    toggle ? pip.active : pip.inactive
                  );
                } // Chrome

                if (is$1.function(this.media.requestPictureInPicture)) {
                  if (!this.pip && toggle) {
                    this.media.requestPictureInPicture();
                  } else if (this.pip && !toggle) {
                    document.exitPictureInPicture();
                  }
                }
              },
              /**
               * Get the current picture-in-picture state
               */
              get: function get() {
                if (!support.pip) {
                  return null;
                } // Safari

                if (!is$1.empty(this.media.webkitPresentationMode)) {
                  return this.media.webkitPresentationMode === pip.active;
                } // Chrome

                return this.media === document.pictureInPictureElement;
              },
            },
          ],
          [
            {
              key: "supported",
              value: function supported(type, provider, inline) {
                return support.check(type, provider, inline);
              },
              /**
               * Load an SVG sprite into the page
               * @param {String} url - URL for the SVG sprite
               * @param {String} [id] - Unique ID
               */
            },
            {
              key: "loadSprite",
              value: function loadSprite$1(url, id) {
                return loadSprite(url, id);
              },
              /**
               * Setup multiple instances
               * @param {*} selector
               * @param {Object} options
               */
            },
            {
              key: "setup",
              value: function setup(selector) {
                var options =
                  arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : {};
                var targets = null;

                if (is$1.string(selector)) {
                  targets = Array.from(document.querySelectorAll(selector));
                } else if (is$1.nodeList(selector)) {
                  targets = Array.from(selector);
                } else if (is$1.array(selector)) {
                  targets = selector.filter(is$1.element);
                }

                if (is$1.empty(targets)) {
                  return null;
                }

                return targets.map(function (t) {
                  return new Plyr(t, options);
                });
              },
            },
          ]
        );

        return Plyr;
      })();

    Plyr.defaults = cloneDeep(defaults$1);

    return Plyr;
  }); /*})'"*/ /*})'"*/
(function ($, Drupal) {
  Drupal.behaviors.RelaVideoPlyr = {
    attach: function (context, settings) {
      var audio = $("audio")[0];
      var musicPaused;

      $("#video-plyr", context).once("video-plyr", function () {
        Drupal.settings.relaVideoPlayer.videoSource;

        var vidPoster = $(this).attr("data-poster");
        var privacyKey = $(this).attr("data-vimeo-privacy-key");
        var player = new Plyr("#video-plyr", {
          autoplay: true,
          quality: 1080,
          resetOnEnd: true,
          vimeo: {
            h: privacyKey,
          },
        });

        setTimeout(() => {
          player.poster = vidPoster;
        }, 200);
        // Bind event listener
        player.on("ended", function () {
          player.restart();
          player.stop();
        });
        player.on("ready", (event) => {
          if (player.isYouTube == true) {
            //player.ratio = '16:9';
          }
        });

        player.on("pause", (event) => {
          if (!musicPaused) {
            $("#bars .play").click();
          }
        });

        player.on("playing", (event) => {
          musicPaused = audio.paused;
          if (!musicPaused) {
            $("#bars").click();
          }
        });
      }); // end body
    }, //end attach
  };

  Drupal.behaviors.RelaVideoPlyrGallery = {
    attach: function (context, settings) {
      var audio = $("audio")[0];
      var musicPaused;
      var player = {};
      $("#plyr-gallery").once("video-plyr", function () {
        var vidPoster = $(this).attr("data-poster");

        var vimeoPrivacyKey = $(this).attr("data-vimeo-privacy-key");
        player = new Plyr("#plyr-gallery", {
          autoplay: false,
          quality: 1080,
          resetOnEnd: true,
          // fixes CORS issue on non ssl rela domains.
          iconUrl: "/sites/all/libraries/plyr/plyr.svg",
          vimeo: {
            h: vimeoPrivacyKey,
          },
        });
        setTimeout(() => {
          player.poster = vidPoster;
        }, 500);

        player.on("ready", (event) => {
          if (player.isYouTube == true) {
            //player.ratio = '16:9';
          }
        });

        player.on("pause", (event) => {
          if (!musicPaused) {
            $("#bars .play").click();
          }
        });

        player.on("playing", (event) => {
          musicPaused = audio.paused;
          if (!musicPaused) {
            $("#bars").click();
          }
        });

        player.on("ended", function () {
          player.restart();
          player.stop();
        });

        window.player = player;
        $(".plyr-gallery-item", context).click(function () {
          $(".plyr-gallery-item").removeClass("active-vid");
          $(this).addClass("active-vid");
          var videoID = $(this).attr("data-video-id");
          var videoService = $(this).attr("data-video-service");
          //ML 9-16-21: Privacy key is a new thing required to play private videos
          var privacyKey = $(this).attr("data-vimeo-privacy-key");

          player.source = {
            type: "video",
            title: "title",
            autoplay: true,
            resetOnEnd: true,
            sources: [
              {
                src: videoID,
                provider: videoService,
              },
            ],
          };

          if (videoService == "vimeo") {
            player.config.vimeo = {
              h: privacyKey,
            };
          }
        });

        $(".showcase-tab").on("click", function () {
          player.pause();
        });
      });
    }, // end attach
  };
})(jQuery, Drupal); /*})'"*/ /*})'"*/
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {
  /**
   * Attaches the AJAX behavior to exposed filter forms and key views links.
   */
  Drupal.behaviors.ViewsAjaxView = {};
  Drupal.behaviors.ViewsAjaxView.attach = function () {
    if (
      Drupal.settings &&
      Drupal.settings.views &&
      Drupal.settings.views.ajaxViews
    ) {
      $.each(Drupal.settings.views.ajaxViews, function (i, settings) {
        Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
      });
    }
  };

  Drupal.views = {};
  Drupal.views.instances = {};

  /**
   * JavaScript object for a certain view.
   */
  Drupal.views.ajaxView = function (settings) {
    var selector = ".view-dom-id-" + settings.view_dom_id;
    this.$view = $(selector);

    // If view is not present return to prevent errors.
    if (!this.$view.length) {
      return;
    }

    // Retrieve the path to use for views' ajax.
    var ajax_path = Drupal.settings.views.ajax_path;

    // If there are multiple views this might've ended up showing up multiple
    // times.
    if (ajax_path.constructor.toString().indexOf("Array") != -1) {
      ajax_path = ajax_path[0];
    }

    // Check if there are any GET parameters to send to views.
    var queryString = window.location.search || "";
    if (queryString !== "") {
      // Remove the question mark and Drupal path component if any.
      var queryString = queryString
        .slice(1)
        .replace(/q=[^&]+&?|&?render=[^&]+/, "");
      if (queryString !== "") {
        // If there is a '?' in ajax_path, clean url are on and & should be
        // used to add parameters.
        queryString = (/\?/.test(ajax_path) ? "&" : "?") + queryString;
      }
    }

    this.element_settings = {
      url: ajax_path + queryString,
      submit: settings,
      setClick: true,
      event: "click",
      selector: selector,
      progress: {
        type: "throbber",
      },
    };

    this.settings = settings;

    // Add the ajax to exposed forms.
    this.$exposed_form = $(
      "#views-exposed-form-" + settings.view_dom_id.replace(/_/g, "-")
    );
    this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

    // Store Drupal.ajax objects here for all pager links.
    this.links = [];

    // Add the ajax to pagers.
    this.$view.once(jQuery.proxy(this.attachPagerAjax, this));

    // Add a trigger to update this view specifically. In order to trigger a
    // refresh use the following code.
    //
    // @code
    // jQuery('.view-name').trigger('RefreshView');
    // @endcode
    // Add a trigger to update this view specifically.
    var self_settings = this.element_settings;
    self_settings.event = "RefreshView";
    var self = this;
    this.$view.once("refresh", function () {
      self.refreshViewAjax = new Drupal.ajax(
        self.selector,
        self.$view,
        self_settings
      );
    });
  };

  Drupal.views.ajaxView.prototype.attachExposedFormAjax = function () {
    var button = $(
      "input[type=submit], button[type=submit], input[type=image]",
      this.$exposed_form
    );
    button = button[0];

    // Call the autocomplete submit before doing AJAX.
    $(button).click(function () {
      if (Drupal.autocompleteSubmit) {
        Drupal.autocompleteSubmit();
      }
    });

    this.exposedFormAjax = new Drupal.ajax(
      $(button).attr("id"),
      button,
      this.element_settings
    );
  };

  /**
   * Attach the ajax behavior to each link.
   */
  Drupal.views.ajaxView.prototype.attachPagerAjax = function () {
    this.$view
      .find(
        "ul.pager > li > a, ol.pager > li > a, th.views-field a, .attachment .views-summary a"
      )
      .each(jQuery.proxy(this.attachPagerLinkAjax, this));
  };

  /**
   * Attach the ajax behavior to a single link.
   */
  Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function (id, link) {
    var $link = $(link);
    var viewData = {};
    var href = $link.attr("href");
    // Don't attach to pagers inside nested views.
    if (
      $link.closest(".view")[0] !== this.$view[0] &&
      $link.closest(".view").parent().hasClass("attachment") === false
    ) {
      return;
    }

    // Provide a default page if none has been set. This must be done
    // prior to merging with settings to avoid accidentally using the
    // page landed on instead of page 1.
    if (typeof viewData.page === "undefined") {
      viewData.page = 0;
    }

    // Construct an object using the settings defaults and then overriding
    // with data specific to the link.
    $.extend(
      viewData,
      this.settings,
      Drupal.Views.parseQueryString(href),
      // Extract argument data from the URL.
      Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
    );

    // For anchor tags, these will go to the target of the anchor rather
    // than the usual location.
    $.extend(
      viewData,
      Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
    );

    // Construct an object using the element settings defaults,
    // then overriding submit with viewData.
    var pager_settings = $.extend({}, this.element_settings);
    pager_settings.submit = viewData;
    this.pagerAjax = new Drupal.ajax(false, $link, pager_settings);
    this.links.push(this.pagerAjax);
  };

  Drupal.ajax.prototype.commands.viewsScrollTop = function (
    ajax,
    response,
    status
  ) {
    // Scroll to the top of the view. This will allow users
    // to browse newly loaded content after e.g. clicking a pager
    // link.
    var offset = $(response.selector).offset();
    // We can't guarantee that the scrollable object should be
    // the body, as the view could be embedded in something
    // more complex such as a modal popup. Recurse up the DOM
    // and scroll the first element that has a non-zero top.
    var scrollTarget = response.selector;
    while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
      scrollTarget = $(scrollTarget).parent();
    }
    // Only scroll upward.
    if (offset.top - 10 < $(scrollTarget).scrollTop()) {
      $(scrollTarget).animate({ scrollTop: offset.top - 10 }, 500);
    }
  };
})(jQuery); /*})'"*/ /*})'"*/
// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/maps/google_maps_api_v3_16.js
// ==/ClosureCompiler==

/**
 * @name CSS3 InfoBubble with tabs for Google Maps API V3
 * @version 0.8
 * @author Luke Mahe
 * @fileoverview
 * This library is a CSS Infobubble with tabs. It uses css3 rounded corners and
 * drop shadows and animations. It also allows tabs
 */

/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A CSS3 InfoBubble v0.8
 * @param {Object.<string, *>=} opt_options Optional properties to set.
 * @extends {google.maps.OverlayView}
 * @constructor
 */
function InfoBubble(opt_options) {
  this.extend(InfoBubble, google.maps.OverlayView);
  this.tabs_ = [];
  this.activeTab_ = null;
  this.baseZIndex_ = 100;
  this.isOpen_ = false;

  var options = opt_options || {};

  if (options["backgroundColor"] == undefined) {
    options["backgroundColor"] = this.BACKGROUND_COLOR_;
  }

  if (options["borderColor"] == undefined) {
    options["borderColor"] = this.BORDER_COLOR_;
  }

  if (options["borderRadius"] == undefined) {
    options["borderRadius"] = this.BORDER_RADIUS_;
  }

  if (options["borderWidth"] == undefined) {
    options["borderWidth"] = this.BORDER_WIDTH_;
  }

  if (options["padding"] == undefined) {
    options["padding"] = this.PADDING_;
  }

  if (options["arrowPosition"] == undefined) {
    options["arrowPosition"] = this.ARROW_POSITION_;
  }

  if (options["disableAutoPan"] == undefined) {
    options["disableAutoPan"] = false;
  }

  if (options["disableAnimation"] == undefined) {
    options["disableAnimation"] = false;
  }

  if (options["minWidth"] == undefined) {
    options["minWidth"] = this.MIN_WIDTH_;
  }

  if (options["shadowStyle"] == undefined) {
    options["shadowStyle"] = this.SHADOW_STYLE_;
  }

  if (options["arrowSize"] == undefined) {
    options["arrowSize"] = this.ARROW_SIZE_;
  }

  if (options["arrowStyle"] == undefined) {
    options["arrowStyle"] = this.ARROW_STYLE_;
  }

  if (options["closeSrc"] == undefined) {
    options["closeSrc"] = this.CLOSE_SRC_;
  }

  this.buildDom_();
  this.setValues(options);
}
window["InfoBubble"] = InfoBubble;

/**
 * Default arrow size
 * @const
 * @private
 */
InfoBubble.prototype.ARROW_SIZE_ = 15;

/**
 * Default arrow style
 * @const
 * @private
 */
InfoBubble.prototype.ARROW_STYLE_ = 0;

/**
 * Default shadow style
 * @const
 * @private
 */
InfoBubble.prototype.SHADOW_STYLE_ = 1;

/**
 * Default min width
 * @const
 * @private
 */
InfoBubble.prototype.MIN_WIDTH_ = 50;

/**
 * Default arrow position
 * @const
 * @private
 */
InfoBubble.prototype.ARROW_POSITION_ = 50;

/**
 * Default padding
 * @const
 * @private
 */
InfoBubble.prototype.PADDING_ = 10;

/**
 * Default border width
 * @const
 * @private
 */
InfoBubble.prototype.BORDER_WIDTH_ = 1;

/**
 * Default border color
 * @const
 * @private
 */
InfoBubble.prototype.BORDER_COLOR_ = "#ccc";

/**
 * Default border radius
 * @const
 * @private
 */
InfoBubble.prototype.BORDER_RADIUS_ = 10;

/**
 * Default background color
 * @const
 * @private
 */
InfoBubble.prototype.BACKGROUND_COLOR_ = "#fff";

/**
 * Default close image source
 * @const
 * @private
 */
InfoBubble.prototype.CLOSE_SRC_ =
  "https://maps.gstatic.com/intl/en_us/mapfiles/iw_close.gif";

/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
InfoBubble.prototype.extend = function (obj1, obj2) {
  return function (object) {
    for (var property in object.prototype) {
      this.prototype[property] = object.prototype[property];
    }
    return this;
  }.apply(obj1, [obj2]);
};

/**
 * Builds the InfoBubble dom
 * @private
 */
InfoBubble.prototype.buildDom_ = function () {
  var bubble = (this.bubble_ = document.createElement("DIV"));
  bubble.style["position"] = "absolute";
  bubble.style["zIndex"] = this.baseZIndex_;

  var tabsContainer = (this.tabsContainer_ = document.createElement("DIV"));
  tabsContainer.style["position"] = "relative";

  // Close button
  var close = (this.close_ = document.createElement("IMG"));
  close.style["position"] = "absolute";
  close.style["border"] = 0;
  close.style["zIndex"] = this.baseZIndex_ + 1;
  close.style["cursor"] = "pointer";
  close.src = this.get("closeSrc");

  var that = this;
  google.maps.event.addDomListener(close, "click", function () {
    that.close();
    google.maps.event.trigger(that, "closeclick");
  });

  // Content area
  var contentContainer = (this.contentContainer_ =
    document.createElement("DIV"));
  contentContainer.style["overflowX"] = "auto";
  contentContainer.style["overflowY"] = "auto";
  contentContainer.style["cursor"] = "default";
  contentContainer.style["clear"] = "both";
  contentContainer.style["position"] = "relative";

  var content = (this.content_ = document.createElement("DIV"));
  contentContainer.appendChild(content);

  // Arrow
  var arrow = (this.arrow_ = document.createElement("DIV"));
  arrow.style["position"] = "relative";

  var arrowOuter = (this.arrowOuter_ = document.createElement("DIV"));
  var arrowInner = (this.arrowInner_ = document.createElement("DIV"));

  var arrowSize = this.getArrowSize_();

  arrowOuter.style["position"] = arrowInner.style["position"] = "absolute";
  arrowOuter.style["left"] = arrowInner.style["left"] = "50%";
  arrowOuter.style["height"] = arrowInner.style["height"] = "0";
  arrowOuter.style["width"] = arrowInner.style["width"] = "0";
  arrowOuter.style["marginLeft"] = this.px(-arrowSize);
  arrowOuter.style["borderWidth"] = this.px(arrowSize);
  arrowOuter.style["borderBottomWidth"] = 0;

  // Shadow
  var bubbleShadow = (this.bubbleShadow_ = document.createElement("DIV"));
  bubbleShadow.style["position"] = "absolute";

  // Hide the InfoBubble by default
  bubble.style["display"] = bubbleShadow.style["display"] = "none";

  bubble.appendChild(this.tabsContainer_);
  bubble.appendChild(close);
  bubble.appendChild(contentContainer);
  arrow.appendChild(arrowOuter);
  arrow.appendChild(arrowInner);
  bubble.appendChild(arrow);

  var stylesheet = document.createElement("style");
  stylesheet.setAttribute("type", "text/css");

  /**
   * The animation for the infobubble
   * @type {string}
   */
  this.animationName_ = "_ibani_" + Math.round(Math.random() * 10000);

  var css =
    "." +
    this.animationName_ +
    "{-webkit-animation-name:" +
    this.animationName_ +
    ";-webkit-animation-duration:0.5s;" +
    "-webkit-animation-iteration-count:1;}" +
    "@-webkit-keyframes " +
    this.animationName_ +
    " {from {" +
    "-webkit-transform: scale(0)}50% {-webkit-transform: scale(1.2)}90% " +
    "{-webkit-transform: scale(0.95)}to {-webkit-transform: scale(1)}}";

  stylesheet.textContent = css;
  document.getElementsByTagName("head")[0].appendChild(stylesheet);
};

/**
 * Sets the background class name
 *
 * @param {string} className The class name to set.
 */
InfoBubble.prototype.setBackgroundClassName = function (className) {
  this.set("backgroundClassName", className);
};
InfoBubble.prototype["setBackgroundClassName"] =
  InfoBubble.prototype.setBackgroundClassName;

/**
 * changed MVC callback
 */
InfoBubble.prototype.backgroundClassName_changed = function () {
  this.content_.className = this.get("backgroundClassName");
};
InfoBubble.prototype["backgroundClassName_changed"] =
  InfoBubble.prototype.backgroundClassName_changed;

/**
 * Sets the class of the tab
 *
 * @param {string} className the class name to set.
 */
InfoBubble.prototype.setTabClassName = function (className) {
  this.set("tabClassName", className);
};
InfoBubble.prototype["setTabClassName"] = InfoBubble.prototype.setTabClassName;

/**
 * tabClassName changed MVC callback
 */
InfoBubble.prototype.tabClassName_changed = function () {
  this.updateTabStyles_();
};
InfoBubble.prototype["tabClassName_changed"] =
  InfoBubble.prototype.tabClassName_changed;

/**
 * Gets the style of the arrow
 *
 * @private
 * @return {number} The style of the arrow.
 */
InfoBubble.prototype.getArrowStyle_ = function () {
  return parseInt(this.get("arrowStyle"), 10) || 0;
};

/**
 * Sets the style of the arrow
 *
 * @param {number} style The style of the arrow.
 */
InfoBubble.prototype.setArrowStyle = function (style) {
  this.set("arrowStyle", style);
};
InfoBubble.prototype["setArrowStyle"] = InfoBubble.prototype.setArrowStyle;

/**
 * Arrow style changed MVC callback
 */
InfoBubble.prototype.arrowStyle_changed = function () {
  this.arrowSize_changed();
};
InfoBubble.prototype["arrowStyle_changed"] =
  InfoBubble.prototype.arrowStyle_changed;

/**
 * Gets the size of the arrow
 *
 * @private
 * @return {number} The size of the arrow.
 */
InfoBubble.prototype.getArrowSize_ = function () {
  return parseInt(this.get("arrowSize"), 10) || 0;
};

/**
 * Sets the size of the arrow
 *
 * @param {number} size The size of the arrow.
 */
InfoBubble.prototype.setArrowSize = function (size) {
  this.set("arrowSize", size);
};
InfoBubble.prototype["setArrowSize"] = InfoBubble.prototype.setArrowSize;

/**
 * Arrow size changed MVC callback
 */
InfoBubble.prototype.arrowSize_changed = function () {
  this.borderWidth_changed();
};
InfoBubble.prototype["arrowSize_changed"] =
  InfoBubble.prototype.arrowSize_changed;

/**
 * Set the position of the InfoBubble arrow
 *
 * @param {number} pos The position to set.
 */
InfoBubble.prototype.setArrowPosition = function (pos) {
  this.set("arrowPosition", pos);
};
InfoBubble.prototype["setArrowPosition"] =
  InfoBubble.prototype.setArrowPosition;

/**
 * Get the position of the InfoBubble arrow
 *
 * @private
 * @return {number} The position..
 */
InfoBubble.prototype.getArrowPosition_ = function () {
  return parseInt(this.get("arrowPosition"), 10) || 0;
};

/**
 * arrowPosition changed MVC callback
 */
InfoBubble.prototype.arrowPosition_changed = function () {
  var pos = this.getArrowPosition_();
  this.arrowOuter_.style["left"] = this.arrowInner_.style["left"] = pos + "%";

  this.redraw_();
};
InfoBubble.prototype["arrowPosition_changed"] =
  InfoBubble.prototype.arrowPosition_changed;

/**
 * Set the zIndex of the InfoBubble
 *
 * @param {number} zIndex The zIndex to set.
 */
InfoBubble.prototype.setZIndex = function (zIndex) {
  this.set("zIndex", zIndex);
};
InfoBubble.prototype["setZIndex"] = InfoBubble.prototype.setZIndex;

/**
 * Get the zIndex of the InfoBubble
 *
 * @return {number} The zIndex to set.
 */
InfoBubble.prototype.getZIndex = function () {
  return parseInt(this.get("zIndex"), 10) || this.baseZIndex_;
};

/**
 * zIndex changed MVC callback
 */
InfoBubble.prototype.zIndex_changed = function () {
  var zIndex = this.getZIndex();

  this.bubble_.style["zIndex"] = this.baseZIndex_ = zIndex;
  this.close_.style["zIndex"] = zIndex + 1;
};
InfoBubble.prototype["zIndex_changed"] = InfoBubble.prototype.zIndex_changed;

/**
 * Set the style of the shadow
 *
 * @param {number} shadowStyle The style of the shadow.
 */
InfoBubble.prototype.setShadowStyle = function (shadowStyle) {
  this.set("shadowStyle", shadowStyle);
};
InfoBubble.prototype["setShadowStyle"] = InfoBubble.prototype.setShadowStyle;

/**
 * Get the style of the shadow
 *
 * @private
 * @return {number} The style of the shadow.
 */
InfoBubble.prototype.getShadowStyle_ = function () {
  return parseInt(this.get("shadowStyle"), 10) || 0;
};

/**
 * shadowStyle changed MVC callback
 */
InfoBubble.prototype.shadowStyle_changed = function () {
  var shadowStyle = this.getShadowStyle_();

  var display = "";
  var shadow = "";
  var backgroundColor = "";
  switch (shadowStyle) {
    case 0:
      display = "none";
      break;
    case 1:
      shadow = "40px 15px 10px rgba(33,33,33,0.3)";
      backgroundColor = "transparent";
      break;
    case 2:
      shadow = "0 0 2px rgba(33,33,33,0.3)";
      backgroundColor = "rgba(33,33,33,0.35)";
      break;
  }
  this.bubbleShadow_.style["boxShadow"] =
    this.bubbleShadow_.style["webkitBoxShadow"] =
    this.bubbleShadow_.style["MozBoxShadow"] =
      shadow;
  this.bubbleShadow_.style["backgroundColor"] = backgroundColor;
  if (this.isOpen_) {
    this.bubbleShadow_.style["display"] = display;
    this.draw();
  }
};
InfoBubble.prototype["shadowStyle_changed"] =
  InfoBubble.prototype.shadowStyle_changed;

/**
 * Show the close button
 */
InfoBubble.prototype.showCloseButton = function () {
  this.set("hideCloseButton", false);
};
InfoBubble.prototype["showCloseButton"] = InfoBubble.prototype.showCloseButton;

/**
 * Hide the close button
 */
InfoBubble.prototype.hideCloseButton = function () {
  this.set("hideCloseButton", true);
};
InfoBubble.prototype["hideCloseButton"] = InfoBubble.prototype.hideCloseButton;

/**
 * hideCloseButton changed MVC callback
 */
InfoBubble.prototype.hideCloseButton_changed = function () {
  this.close_.style["display"] = this.get("hideCloseButton") ? "none" : "";
};
InfoBubble.prototype["hideCloseButton_changed"] =
  InfoBubble.prototype.hideCloseButton_changed;

/**
 * Set the background color
 *
 * @param {string} color The color to set.
 */
InfoBubble.prototype.setBackgroundColor = function (color) {
  if (color) {
    this.set("backgroundColor", color);
  }
};
InfoBubble.prototype["setBackgroundColor"] =
  InfoBubble.prototype.setBackgroundColor;

/**
 * backgroundColor changed MVC callback
 */
InfoBubble.prototype.backgroundColor_changed = function () {
  var backgroundColor = this.get("backgroundColor");
  this.contentContainer_.style["backgroundColor"] = backgroundColor;

  this.arrowInner_.style["borderColor"] =
    backgroundColor + " transparent transparent";
  this.updateTabStyles_();
};
InfoBubble.prototype["backgroundColor_changed"] =
  InfoBubble.prototype.backgroundColor_changed;

/**
 * Set the border color
 *
 * @param {string} color The border color.
 */
InfoBubble.prototype.setBorderColor = function (color) {
  if (color) {
    this.set("borderColor", color);
  }
};
InfoBubble.prototype["setBorderColor"] = InfoBubble.prototype.setBorderColor;

/**
 * borderColor changed MVC callback
 */
InfoBubble.prototype.borderColor_changed = function () {
  var borderColor = this.get("borderColor");

  var contentContainer = this.contentContainer_;
  var arrowOuter = this.arrowOuter_;
  contentContainer.style["borderColor"] = borderColor;

  arrowOuter.style["borderColor"] = borderColor + " transparent transparent";

  contentContainer.style["borderStyle"] =
    arrowOuter.style["borderStyle"] =
    this.arrowInner_.style["borderStyle"] =
      "solid";

  this.updateTabStyles_();
};
InfoBubble.prototype["borderColor_changed"] =
  InfoBubble.prototype.borderColor_changed;

/**
 * Set the radius of the border
 *
 * @param {number} radius The radius of the border.
 */
InfoBubble.prototype.setBorderRadius = function (radius) {
  this.set("borderRadius", radius);
};
InfoBubble.prototype["setBorderRadius"] = InfoBubble.prototype.setBorderRadius;

/**
 * Get the radius of the border
 *
 * @private
 * @return {number} The radius of the border.
 */
InfoBubble.prototype.getBorderRadius_ = function () {
  return parseInt(this.get("borderRadius"), 10) || 0;
};

/**
 * borderRadius changed MVC callback
 */
InfoBubble.prototype.borderRadius_changed = function () {
  var borderRadius = this.getBorderRadius_();
  var borderWidth = this.getBorderWidth_();

  this.contentContainer_.style["borderRadius"] =
    this.contentContainer_.style["MozBorderRadius"] =
    this.contentContainer_.style["webkitBorderRadius"] =
    this.bubbleShadow_.style["borderRadius"] =
    this.bubbleShadow_.style["MozBorderRadius"] =
    this.bubbleShadow_.style["webkitBorderRadius"] =
      this.px(borderRadius);

  this.tabsContainer_.style["paddingLeft"] = this.tabsContainer_.style[
    "paddingRight"
  ] = this.px(borderRadius + borderWidth);

  this.redraw_();
};
InfoBubble.prototype["borderRadius_changed"] =
  InfoBubble.prototype.borderRadius_changed;

/**
 * Get the width of the border
 *
 * @private
 * @return {number} width The width of the border.
 */
InfoBubble.prototype.getBorderWidth_ = function () {
  return parseInt(this.get("borderWidth"), 10) || 0;
};

/**
 * Set the width of the border
 *
 * @param {number} width The width of the border.
 */
InfoBubble.prototype.setBorderWidth = function (width) {
  this.set("borderWidth", width);
};
InfoBubble.prototype["setBorderWidth"] = InfoBubble.prototype.setBorderWidth;

/**
 * borderWidth change MVC callback
 */
InfoBubble.prototype.borderWidth_changed = function () {
  var borderWidth = this.getBorderWidth_();

  this.contentContainer_.style["borderWidth"] = this.px(borderWidth);
  this.tabsContainer_.style["top"] = this.px(borderWidth);

  this.updateArrowStyle_();
  this.updateTabStyles_();
  this.borderRadius_changed();
  this.redraw_();
};
InfoBubble.prototype["borderWidth_changed"] =
  InfoBubble.prototype.borderWidth_changed;

/**
 * Update the arrow style
 * @private
 */
InfoBubble.prototype.updateArrowStyle_ = function () {
  var borderWidth = this.getBorderWidth_();
  var arrowSize = this.getArrowSize_();
  var arrowStyle = this.getArrowStyle_();
  var arrowOuterSizePx = this.px(arrowSize);
  var arrowInnerSizePx = this.px(Math.max(0, arrowSize - borderWidth));

  var outer = this.arrowOuter_;
  var inner = this.arrowInner_;

  this.arrow_.style["marginTop"] = this.px(-borderWidth);
  outer.style["borderTopWidth"] = arrowOuterSizePx;
  inner.style["borderTopWidth"] = arrowInnerSizePx;

  // Full arrow or arrow pointing to the left
  if (arrowStyle == 0 || arrowStyle == 1) {
    outer.style["borderLeftWidth"] = arrowOuterSizePx;
    inner.style["borderLeftWidth"] = arrowInnerSizePx;
  } else {
    outer.style["borderLeftWidth"] = inner.style["borderLeftWidth"] = 0;
  }

  // Full arrow or arrow pointing to the right
  if (arrowStyle == 0 || arrowStyle == 2) {
    outer.style["borderRightWidth"] = arrowOuterSizePx;
    inner.style["borderRightWidth"] = arrowInnerSizePx;
  } else {
    outer.style["borderRightWidth"] = inner.style["borderRightWidth"] = 0;
  }

  if (arrowStyle < 2) {
    outer.style["marginLeft"] = this.px(-arrowSize);
    inner.style["marginLeft"] = this.px(-(arrowSize - borderWidth));
  } else {
    outer.style["marginLeft"] = inner.style["marginLeft"] = 0;
  }

  // If there is no border then don't show thw outer arrow
  if (borderWidth == 0) {
    outer.style["display"] = "none";
  } else {
    outer.style["display"] = "";
  }
};

/**
 * Set the padding of the InfoBubble
 *
 * @param {number} padding The padding to apply.
 */
InfoBubble.prototype.setPadding = function (padding) {
  this.set("padding", padding);
};
InfoBubble.prototype["setPadding"] = InfoBubble.prototype.setPadding;

/**
 * Set the close image url
 *
 * @param {string} src The url of the image used as a close icon
 */
InfoBubble.prototype.setCloseSrc = function (src) {
  if (src && this.close_) {
    this.close_.src = src;
  }
};
InfoBubble.prototype["setCloseSrc"] = InfoBubble.prototype.setCloseSrc;

/**
 * Set the padding of the InfoBubble
 *
 * @private
 * @return {number} padding The padding to apply.
 */
InfoBubble.prototype.getPadding_ = function () {
  return parseInt(this.get("padding"), 10) || 0;
};

/**
 * padding changed MVC callback
 */
InfoBubble.prototype.padding_changed = function () {
  var padding = this.getPadding_();
  this.contentContainer_.style["padding"] = this.px(padding);
  this.updateTabStyles_();

  this.redraw_();
};
InfoBubble.prototype["padding_changed"] = InfoBubble.prototype.padding_changed;

/**
 * Add px extention to the number
 *
 * @param {number} num The number to wrap.
 * @return {string|number} A wrapped number.
 */
InfoBubble.prototype.px = function (num) {
  if (num) {
    // 0 doesn't need to be wrapped
    return num + "px";
  }
  return num;
};

/**
 * Add events to stop propagation
 * @private
 */
InfoBubble.prototype.addEvents_ = function () {
  // We want to cancel all the events so they do not go to the map
  var events = [
    "mousedown",
    "mousemove",
    "mouseover",
    "mouseout",
    "mouseup",
    "mousewheel",
    "DOMMouseScroll",
    "touchstart",
    "touchend",
    "touchmove",
    "dblclick",
    "contextmenu",
    "click",
  ];

  var bubble = this.bubble_;
  this.listeners_ = [];
  for (var i = 0, event; (event = events[i]); i++) {
    this.listeners_.push(
      google.maps.event.addDomListener(bubble, event, function (e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
          e.stopPropagation();
        }
      })
    );
  }
};

/**
 * On Adding the InfoBubble to a map
 * Implementing the OverlayView interface
 */
InfoBubble.prototype.onAdd = function () {
  if (!this.bubble_) {
    this.buildDom_();
  }

  this.addEvents_();

  var panes = this.getPanes();
  if (panes) {
    panes.floatPane.appendChild(this.bubble_);
    panes.floatShadow.appendChild(this.bubbleShadow_);
  }

  /* once the infoBubble has been added to the DOM, fire 'domready' event */
  google.maps.event.trigger(this, "domready");
};
InfoBubble.prototype["onAdd"] = InfoBubble.prototype.onAdd;

/**
 * Draw the InfoBubble
 * Implementing the OverlayView interface
 */
InfoBubble.prototype.draw = function () {
  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  var latLng = /** @type {google.maps.LatLng} */ (this.get("position"));

  if (!latLng) {
    this.close();
    return;
  }

  var tabHeight = 0;

  if (this.activeTab_) {
    tabHeight = this.activeTab_.offsetHeight;
  }

  var anchorHeight = this.getAnchorHeight_();
  var arrowSize = this.getArrowSize_();
  var arrowPosition = this.getArrowPosition_();

  arrowPosition = arrowPosition / 100;

  var pos = projection.fromLatLngToDivPixel(latLng);
  var width = this.contentContainer_.offsetWidth;
  var height = this.bubble_.offsetHeight;

  if (!width) {
    return;
  }

  // Adjust for the height of the info bubble
  var top = pos.y - (height + arrowSize);

  if (anchorHeight) {
    // If there is an anchor then include the height
    top -= anchorHeight;
  }

  var left = pos.x - width * arrowPosition;

  this.bubble_.style["top"] = this.px(top);
  this.bubble_.style["left"] = this.px(left);

  var shadowStyle = parseInt(this.get("shadowStyle"), 10);

  switch (shadowStyle) {
    case 1:
      // Shadow is behind
      this.bubbleShadow_.style["top"] = this.px(top + tabHeight - 1);
      this.bubbleShadow_.style["left"] = this.px(left);
      this.bubbleShadow_.style["width"] = this.px(width);
      this.bubbleShadow_.style["height"] = this.px(
        this.contentContainer_.offsetHeight - arrowSize
      );
      break;
    case 2:
      // Shadow is below
      width = width * 0.8;
      if (anchorHeight) {
        this.bubbleShadow_.style["top"] = this.px(pos.y);
      } else {
        this.bubbleShadow_.style["top"] = this.px(pos.y + arrowSize);
      }
      this.bubbleShadow_.style["left"] = this.px(pos.x - width * arrowPosition);

      this.bubbleShadow_.style["width"] = this.px(width);
      this.bubbleShadow_.style["height"] = this.px(2);
      break;
  }
};
InfoBubble.prototype["draw"] = InfoBubble.prototype.draw;

/**
 * Removing the InfoBubble from a map
 */
InfoBubble.prototype.onRemove = function () {
  if (this.bubble_ && this.bubble_.parentNode) {
    this.bubble_.parentNode.removeChild(this.bubble_);
  }
  if (this.bubbleShadow_ && this.bubbleShadow_.parentNode) {
    this.bubbleShadow_.parentNode.removeChild(this.bubbleShadow_);
  }

  for (var i = 0, listener; (listener = this.listeners_[i]); i++) {
    google.maps.event.removeListener(listener);
  }
};
InfoBubble.prototype["onRemove"] = InfoBubble.prototype.onRemove;

/**
 * Is the InfoBubble open
 *
 * @return {boolean} If the InfoBubble is open.
 */
InfoBubble.prototype.isOpen = function () {
  return this.isOpen_;
};
InfoBubble.prototype["isOpen"] = InfoBubble.prototype.isOpen;

/**
 * Close the InfoBubble
 */
InfoBubble.prototype.close = function () {
  if (this.bubble_) {
    this.bubble_.style["display"] = "none";
    // Remove the animation so we next time it opens it will animate again
    this.bubble_.className = this.bubble_.className.replace(
      this.animationName_,
      ""
    );
  }

  if (this.bubbleShadow_) {
    this.bubbleShadow_.style["display"] = "none";
    this.bubbleShadow_.className = this.bubbleShadow_.className.replace(
      this.animationName_,
      ""
    );
  }
  this.isOpen_ = false;
};
InfoBubble.prototype["close"] = InfoBubble.prototype.close;

/**
 * Open the InfoBubble (asynchronous).
 *
 * @param {google.maps.Map=} opt_map Optional map to open on.
 * @param {google.maps.MVCObject=} opt_anchor Optional anchor to position at.
 */
InfoBubble.prototype.open = function (opt_map, opt_anchor) {
  var that = this;
  window.setTimeout(function () {
    that.open_(opt_map, opt_anchor);
  }, 0);
};

/**
 * Open the InfoBubble
 * @private
 * @param {google.maps.Map=} opt_map Optional map to open on.
 * @param {google.maps.MVCObject=} opt_anchor Optional anchor to position at.
 */
InfoBubble.prototype.open_ = function (opt_map, opt_anchor) {
  this.updateContent_();

  if (opt_map) {
    this.setMap(opt_map);
  }

  if (opt_anchor) {
    this.set("anchor", opt_anchor);
    this.bindTo("anchorPoint", opt_anchor);
    this.bindTo("position", opt_anchor);
  }

  // Show the bubble and the show
  this.bubble_.style["display"] = this.bubbleShadow_.style["display"] = "";
  var animation = !this.get("disableAnimation");

  if (animation) {
    // Add the animation
    this.bubble_.className += " " + this.animationName_;
    this.bubbleShadow_.className += " " + this.animationName_;
  }

  this.redraw_();
  this.isOpen_ = true;

  var pan = !this.get("disableAutoPan");
  if (pan) {
    var that = this;
    window.setTimeout(function () {
      // Pan into view, done in a time out to make it feel nicer :)
      that.panToView();
    }, 200);
  }
};
InfoBubble.prototype["open"] = InfoBubble.prototype.open;

/**
 * Set the position of the InfoBubble
 *
 * @param {google.maps.LatLng} position The position to set.
 */
InfoBubble.prototype.setPosition = function (position) {
  if (position) {
    this.set("position", position);
  }
};
InfoBubble.prototype["setPosition"] = InfoBubble.prototype.setPosition;

/**
 * Returns the position of the InfoBubble
 *
 * @return {google.maps.LatLng} the position.
 */
InfoBubble.prototype.getPosition = function () {
  return /** @type {google.maps.LatLng} */ (this.get("position"));
};
InfoBubble.prototype["getPosition"] = InfoBubble.prototype.getPosition;

/**
 * position changed MVC callback
 */
InfoBubble.prototype.position_changed = function () {
  this.draw();
};
InfoBubble.prototype["position_changed"] =
  InfoBubble.prototype.position_changed;

/**
 * Pan the InfoBubble into view
 */
InfoBubble.prototype.panToView = function () {
  var projection = this.getProjection();

  if (!projection) {
    // The map projection is not ready yet so do nothing
    return;
  }

  if (!this.bubble_) {
    // No Bubble yet so do nothing
    return;
  }

  var anchorHeight = this.getAnchorHeight_();
  var height = this.bubble_.offsetHeight + anchorHeight;
  var map = this.get("map");
  var mapDiv = map.getDiv();
  var mapHeight = mapDiv.offsetHeight;

  var latLng = this.getPosition();
  var centerPos = projection.fromLatLngToContainerPixel(map.getCenter());
  var pos = projection.fromLatLngToContainerPixel(latLng);

  // Find out how much space at the top is free
  var spaceTop = centerPos.y - height;

  // Fine out how much space at the bottom is free
  var spaceBottom = mapHeight - centerPos.y;

  var needsTop = spaceTop < 0;
  var deltaY = 0;

  if (needsTop) {
    spaceTop *= -1;
    deltaY = (spaceTop + spaceBottom) / 2;
  }

  pos.y -= deltaY;
  latLng = projection.fromContainerPixelToLatLng(pos);

  if (map.getCenter() != latLng) {
    map.panTo(latLng);
  }
};
InfoBubble.prototype["panToView"] = InfoBubble.prototype.panToView;

/**
 * Converts a HTML string to a document fragment.
 *
 * @param {string} htmlString The HTML string to convert.
 * @return {Node} A HTML document fragment.
 * @private
 */
InfoBubble.prototype.htmlToDocumentFragment_ = function (htmlString) {
  htmlString = htmlString.replace(/^\s*([\S\s]*)\b\s*$/, "$1");
  var tempDiv = document.createElement("DIV");
  tempDiv.innerHTML = htmlString;
  if (tempDiv.childNodes.length == 1) {
    return /** @type {!Node} */ (tempDiv.removeChild(tempDiv.firstChild));
  } else {
    var fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    return fragment;
  }
};

/**
 * Removes all children from the node.
 *
 * @param {Node} node The node to remove all children from.
 * @private
 */
InfoBubble.prototype.removeChildren_ = function (node) {
  if (!node) {
    return;
  }

  var child;
  while ((child = node.firstChild)) {
    node.removeChild(child);
  }
};

/**
 * Sets the content of the infobubble.
 *
 * @param {string|Node} content The content to set.
 */
InfoBubble.prototype.setContent = function (content) {
  this.set("content", content);
};
InfoBubble.prototype["setContent"] = InfoBubble.prototype.setContent;

/**
 * Get the content of the infobubble.
 *
 * @return {string|Node} The marker content.
 */
InfoBubble.prototype.getContent = function () {
  return /** @type {Node|string} */ (this.get("content"));
};
InfoBubble.prototype["getContent"] = InfoBubble.prototype.getContent;

/**
 * Sets the marker content and adds loading events to images
 */
InfoBubble.prototype.updateContent_ = function () {
  if (!this.content_) {
    // The Content area doesnt exist.
    return;
  }

  this.removeChildren_(this.content_);
  var content = this.getContent();
  if (content) {
    if (typeof content == "string") {
      content = this.htmlToDocumentFragment_(content);
    }
    this.content_.appendChild(content);

    var that = this;
    var images = this.content_.getElementsByTagName("IMG");
    for (var i = 0, image; (image = images[i]); i++) {
      // Because we don't know the size of an image till it loads, add a
      // listener to the image load so the marker can resize and reposition
      // itself to be the correct height.
      google.maps.event.addDomListener(image, "load", function () {
        that.imageLoaded_();
      });
    }
  }
  this.redraw_();
};

/**
 * Image loaded
 * @private
 */
InfoBubble.prototype.imageLoaded_ = function () {
  var pan = !this.get("disableAutoPan");
  this.redraw_();
  if (pan && (this.tabs_.length == 0 || this.activeTab_.index == 0)) {
    this.panToView();
  }
};

/**
 * Updates the styles of the tabs
 * @private
 */
InfoBubble.prototype.updateTabStyles_ = function () {
  if (this.tabs_ && this.tabs_.length) {
    for (var i = 0, tab; (tab = this.tabs_[i]); i++) {
      this.setTabStyle_(tab.tab);
    }
    this.activeTab_.style["zIndex"] = this.baseZIndex_;
    var borderWidth = this.getBorderWidth_();
    var padding = this.getPadding_() / 2;
    this.activeTab_.style["borderBottomWidth"] = 0;
    this.activeTab_.style["paddingBottom"] = this.px(padding + borderWidth);
  }
};

/**
 * Sets the style of a tab
 * @private
 * @param {Element} tab The tab to style.
 */
InfoBubble.prototype.setTabStyle_ = function (tab) {
  var backgroundColor = this.get("backgroundColor");
  var borderColor = this.get("borderColor");
  var borderRadius = this.getBorderRadius_();
  var borderWidth = this.getBorderWidth_();
  var padding = this.getPadding_();

  var marginRight = this.px(-Math.max(padding, borderRadius));
  var borderRadiusPx = this.px(borderRadius);

  var index = this.baseZIndex_;
  if (tab.index) {
    index -= tab.index;
  }

  // The styles for the tab
  var styles = {
    cssFloat: "left",
    position: "relative",
    cursor: "pointer",
    backgroundColor: backgroundColor,
    border: this.px(borderWidth) + " solid " + borderColor,
    padding: this.px(padding / 2) + " " + this.px(padding),
    marginRight: marginRight,
    whiteSpace: "nowrap",
    borderRadiusTopLeft: borderRadiusPx,
    MozBorderRadiusTopleft: borderRadiusPx,
    webkitBorderTopLeftRadius: borderRadiusPx,
    borderRadiusTopRight: borderRadiusPx,
    MozBorderRadiusTopright: borderRadiusPx,
    webkitBorderTopRightRadius: borderRadiusPx,
    zIndex: index,
    display: "inline",
  };

  for (var style in styles) {
    tab.style[style] = styles[style];
  }

  var className = this.get("tabClassName");
  if (className != undefined) {
    tab.className += " " + className;
  }
};

/**
 * Add user actions to a tab
 * @private
 * @param {Object} tab The tab to add the actions to.
 */
InfoBubble.prototype.addTabActions_ = function (tab) {
  var that = this;
  tab.listener_ = google.maps.event.addDomListener(tab, "click", function () {
    that.setTabActive_(this);
  });
};

/**
 * Set a tab at a index to be active
 *
 * @param {number} index The index of the tab.
 */
InfoBubble.prototype.setTabActive = function (index) {
  var tab = this.tabs_[index - 1];

  if (tab) {
    this.setTabActive_(tab.tab);
  }
};
InfoBubble.prototype["setTabActive"] = InfoBubble.prototype.setTabActive;

/**
 * Set a tab to be active
 * @private
 * @param {Object} tab The tab to set active.
 */
InfoBubble.prototype.setTabActive_ = function (tab) {
  if (!tab) {
    this.setContent("");
    this.updateContent_();
    return;
  }

  var padding = this.getPadding_() / 2;
  var borderWidth = this.getBorderWidth_();

  if (this.activeTab_) {
    var activeTab = this.activeTab_;
    activeTab.style["zIndex"] = this.baseZIndex_ - activeTab.index;
    activeTab.style["paddingBottom"] = this.px(padding);
    activeTab.style["borderBottomWidth"] = this.px(borderWidth);
  }

  tab.style["zIndex"] = this.baseZIndex_;
  tab.style["borderBottomWidth"] = 0;
  tab.style["marginBottomWidth"] = "-10px";
  tab.style["paddingBottom"] = this.px(padding + borderWidth);

  this.setContent(this.tabs_[tab.index].content);
  this.updateContent_();

  this.activeTab_ = tab;

  this.redraw_();
};

/**
 * Set the max width of the InfoBubble
 *
 * @param {number} width The max width.
 */
InfoBubble.prototype.setMaxWidth = function (width) {
  this.set("maxWidth", width);
};
InfoBubble.prototype["setMaxWidth"] = InfoBubble.prototype.setMaxWidth;

/**
 * maxWidth changed MVC callback
 */
InfoBubble.prototype.maxWidth_changed = function () {
  this.redraw_();
};
InfoBubble.prototype["maxWidth_changed"] =
  InfoBubble.prototype.maxWidth_changed;

/**
 * Set the max height of the InfoBubble
 *
 * @param {number} height The max height.
 */
InfoBubble.prototype.setMaxHeight = function (height) {
  this.set("maxHeight", height);
};
InfoBubble.prototype["setMaxHeight"] = InfoBubble.prototype.setMaxHeight;

/**
 * maxHeight changed MVC callback
 */
InfoBubble.prototype.maxHeight_changed = function () {
  this.redraw_();
};
InfoBubble.prototype["maxHeight_changed"] =
  InfoBubble.prototype.maxHeight_changed;

/**
 * Set the min width of the InfoBubble
 *
 * @param {number} width The min width.
 */
InfoBubble.prototype.setMinWidth = function (width) {
  this.set("minWidth", width);
};
InfoBubble.prototype["setMinWidth"] = InfoBubble.prototype.setMinWidth;

/**
 * minWidth changed MVC callback
 */
InfoBubble.prototype.minWidth_changed = function () {
  this.redraw_();
};
InfoBubble.prototype["minWidth_changed"] =
  InfoBubble.prototype.minWidth_changed;

/**
 * Set the min height of the InfoBubble
 *
 * @param {number} height The min height.
 */
InfoBubble.prototype.setMinHeight = function (height) {
  this.set("minHeight", height);
};
InfoBubble.prototype["setMinHeight"] = InfoBubble.prototype.setMinHeight;

/**
 * minHeight changed MVC callback
 */
InfoBubble.prototype.minHeight_changed = function () {
  this.redraw_();
};
InfoBubble.prototype["minHeight_changed"] =
  InfoBubble.prototype.minHeight_changed;

/**
 * Add a tab
 *
 * @param {string} label The label of the tab.
 * @param {string|Element} content The content of the tab.
 */
InfoBubble.prototype.addTab = function (label, content) {
  var tab = document.createElement("DIV");
  tab.innerHTML = label;

  this.setTabStyle_(tab);
  this.addTabActions_(tab);

  this.tabsContainer_.appendChild(tab);

  this.tabs_.push({
    label: label,
    content: content,
    tab: tab,
  });

  tab.index = this.tabs_.length - 1;
  tab.style["zIndex"] = this.baseZIndex_ - tab.index;

  if (!this.activeTab_) {
    this.setTabActive_(tab);
  }

  tab.className = tab.className + " " + this.animationName_;

  this.redraw_();
};
InfoBubble.prototype["addTab"] = InfoBubble.prototype.addTab;

/**
 * Update a tab at a speicifc index
 *
 * @param {number} index The index of the tab.
 * @param {?string} opt_label The label to change to.
 * @param {?string} opt_content The content to update to.
 */
InfoBubble.prototype.updateTab = function (index, opt_label, opt_content) {
  if (!this.tabs_.length || index < 0 || index >= this.tabs_.length) {
    return;
  }

  var tab = this.tabs_[index];
  if (opt_label != undefined) {
    tab.tab.innerHTML = tab.label = opt_label;
  }

  if (opt_content != undefined) {
    tab.content = opt_content;
  }

  if (this.activeTab_ == tab.tab) {
    this.setContent(tab.content);
    this.updateContent_();
  }
  this.redraw_();
};
InfoBubble.prototype["updateTab"] = InfoBubble.prototype.updateTab;

/**
 * Remove a tab at a specific index
 *
 * @param {number} index The index of the tab to remove.
 */
InfoBubble.prototype.removeTab = function (index) {
  if (!this.tabs_.length || index < 0 || index >= this.tabs_.length) {
    return;
  }

  var tab = this.tabs_[index];
  tab.tab.parentNode.removeChild(tab.tab);

  google.maps.event.removeListener(tab.tab.listener_);

  this.tabs_.splice(index, 1);

  delete tab;

  for (var i = 0, t; (t = this.tabs_[i]); i++) {
    t.tab.index = i;
  }

  if (tab.tab == this.activeTab_) {
    // Removing the current active tab
    if (this.tabs_[index]) {
      // Show the tab to the right
      this.activeTab_ = this.tabs_[index].tab;
    } else if (this.tabs_[index - 1]) {
      // Show a tab to the left
      this.activeTab_ = this.tabs_[index - 1].tab;
    } else {
      // No tabs left to sho
      this.activeTab_ = undefined;
    }

    this.setTabActive_(this.activeTab_);
  }

  this.redraw_();
};
InfoBubble.prototype["removeTab"] = InfoBubble.prototype.removeTab;

/**
 * Get the size of an element
 * @private
 * @param {Node|string} element The element to size.
 * @param {number=} opt_maxWidth Optional max width of the element.
 * @param {number=} opt_maxHeight Optional max height of the element.
 * @return {google.maps.Size} The size of the element.
 */
InfoBubble.prototype.getElementSize_ = function (
  element,
  opt_maxWidth,
  opt_maxHeight
) {
  var sizer = document.createElement("DIV");
  sizer.style["display"] = "inline";
  sizer.style["position"] = "absolute";
  sizer.style["visibility"] = "hidden";

  if (typeof element == "string") {
    sizer.innerHTML = element;
  } else {
    sizer.appendChild(element.cloneNode(true));
  }

  document.body.appendChild(sizer);
  var size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);

  // If the width is bigger than the max width then set the width and size again
  if (opt_maxWidth && size.width > opt_maxWidth) {
    sizer.style["width"] = this.px(opt_maxWidth);
    size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);
  }

  // If the height is bigger than the max height then set the height and size
  // again
  if (opt_maxHeight && size.height > opt_maxHeight) {
    sizer.style["height"] = this.px(opt_maxHeight);
    size = new google.maps.Size(sizer.offsetWidth, sizer.offsetHeight);
  }

  document.body.removeChild(sizer);
  delete sizer;
  return size;
};

/**
 * Redraw the InfoBubble
 * @private
 */
InfoBubble.prototype.redraw_ = function () {
  this.figureOutSize_();
  this.positionCloseButton_();
  this.draw();
};

/**
 * Figure out the optimum size of the InfoBubble
 * @private
 */
InfoBubble.prototype.figureOutSize_ = function () {
  var map = this.get("map");

  if (!map) {
    return;
  }

  var padding = this.getPadding_();
  var borderWidth = this.getBorderWidth_();
  var borderRadius = this.getBorderRadius_();
  var arrowSize = this.getArrowSize_();

  var mapDiv = map.getDiv();
  var gutter = arrowSize * 2;
  var mapWidth = mapDiv.offsetWidth - gutter;
  var mapHeight = mapDiv.offsetHeight - gutter - this.getAnchorHeight_();
  var tabHeight = 0;
  var width = /** @type {number} */ (this.get("minWidth") || 0);
  var height = /** @type {number} */ (this.get("minHeight") || 0);
  var maxWidth = /** @type {number} */ (this.get("maxWidth") || 0);
  var maxHeight = /** @type {number} */ (this.get("maxHeight") || 0);

  maxWidth = Math.min(mapWidth, maxWidth);
  maxHeight = Math.min(mapHeight, maxHeight);

  var tabWidth = 0;
  if (this.tabs_.length) {
    // If there are tabs then you need to check the size of each tab's content
    for (var i = 0, tab; (tab = this.tabs_[i]); i++) {
      var tabSize = this.getElementSize_(tab.tab, maxWidth, maxHeight);
      var contentSize = this.getElementSize_(tab.content, maxWidth, maxHeight);

      if (width < tabSize.width) {
        width = tabSize.width;
      }

      // Add up all the tab widths because they might end up being wider than
      // the content
      tabWidth += tabSize.width;

      if (height < tabSize.height) {
        height = tabSize.height;
      }

      if (tabSize.height > tabHeight) {
        tabHeight = tabSize.height;
      }

      if (width < contentSize.width) {
        width = contentSize.width;
      }

      if (height < contentSize.height) {
        height = contentSize.height;
      }
    }
  } else {
    var content = /** @type {string|Node} */ (this.get("content"));
    if (typeof content == "string") {
      content = this.htmlToDocumentFragment_(content);
    }
    if (content) {
      var contentSize = this.getElementSize_(content, maxWidth, maxHeight);

      if (width < contentSize.width) {
        width = contentSize.width;
      }

      if (height < contentSize.height) {
        height = contentSize.height;
      }
    }
  }

  if (maxWidth) {
    width = Math.min(width, maxWidth);
  }

  if (maxHeight) {
    height = Math.min(height, maxHeight);
  }

  width = Math.max(width, tabWidth);

  if (width == tabWidth) {
    width = width + 2 * padding;
  }

  arrowSize = arrowSize * 2;
  width = Math.max(width, arrowSize);

  // Maybe add this as a option so they can go bigger than the map if the user
  // wants
  if (width > mapWidth) {
    width = mapWidth;
  }

  if (height > mapHeight) {
    height = mapHeight - tabHeight;
  }

  if (this.tabsContainer_) {
    this.tabHeight_ = tabHeight;
    this.tabsContainer_.style["width"] = this.px(tabWidth);
  }

  this.contentContainer_.style["width"] = this.px(width);
  this.contentContainer_.style["height"] = this.px(height);
};

/**
 *  Get the height of the anchor
 *
 *  This function is a hack for now and doesn't really work that good, need to
 *  wait for pixelBounds to be correctly exposed.
 *  @private
 *  @return {number} The height of the anchor.
 */
InfoBubble.prototype.getAnchorHeight_ = function () {
  var anchor = this.get("anchor");
  if (anchor) {
    var anchorPoint = /** @type google.maps.Point */ (this.get("anchorPoint"));

    if (anchorPoint) {
      return -1 * anchorPoint.y;
    }
  }
  return 0;
};

InfoBubble.prototype.anchorPoint_changed = function () {
  this.draw();
};
InfoBubble.prototype["anchorPoint_changed"] =
  InfoBubble.prototype.anchorPoint_changed;

/**
 * Position the close button in the right spot.
 * @private
 */
InfoBubble.prototype.positionCloseButton_ = function () {
  var br = this.getBorderRadius_();
  var bw = this.getBorderWidth_();

  var right = 2;
  var top = 2;

  if (this.tabs_.length && this.tabHeight_) {
    top += this.tabHeight_;
  }

  top += bw;
  right += bw;

  var c = this.contentContainer_;
  if (c && c.clientHeight < c.scrollHeight) {
    // If there are scrollbars then move the cross in so it is not over
    // scrollbar
    right += 15;
  }

  this.close_.style["right"] = this.px(right);
  this.close_.style["top"] = this.px(top);
}; /*})'"*/ /*})'"*/
/**
 * @file
 * Initiates map(s) for the Styled Google Map module.
 *
 * A single or multiple Styled Google Maps will be initiated.
 * Drupal behaviors are used to make sure ajax called map(s) are correctly loaded.
 */

(function ($) {
  $.fn.isInViewport = function (y) {
    var y = y || 1;
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var elementHeight = $(this).height();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    var deltaTop = Math.min(1, (elementBottom - viewportTop) / elementHeight);
    var deltaBottom = Math.min(
      1,
      (viewportBottom - elementTop) / elementHeight
    );
    return deltaTop * deltaBottom >= y;
  };

  Drupal.behaviors.styled_google_map = {
    attach: function (context, settings) {
      var maps = settings.styled_google_map;
      var markers = [];
      for (i in maps) {
        var current_map = settings["id" + maps[i]];
        var map_id = current_map.id;

        $(window).on("resize scroll", function () {
          if (
            $("#" + map_id).isInViewport(0.5) &&
            !$("#" + map_id).hasClass("processed")
          ) {
            console.log("mld");
            loadMap();
          }
        });

        function loadMap() {
          if ($("#" + map_id).length) {
            var map_locations = current_map.locations;
            var map_settings = current_map.settings;
            var bounds = new google.maps.LatLngBounds();
            var map_types = {
              ROADMAP: google.maps.MapTypeId.ROADMAP,
              SATELLITE: google.maps.MapTypeId.SATELLITE,
              HYBRID: google.maps.MapTypeId.HYBRID,
              TERRAIN: google.maps.MapTypeId.TERRAIN,
            };
            var map_style =
              map_settings.style.style != "" ? map_settings.style.style : "[]";

            map_settings.draggable =
              $(window).width() > 480
                ? map_settings.draggable
                : map_settings.mobile_draggable;

            var init_map = {
              zoom: parseInt(map_settings.zoom.default),
              mapTypeId: map_types[map_settings.style.maptype],
              disableDefaultUI: !map_settings.ui,
              maxZoom: parseInt(map_settings.zoom.max),
              minZoom: parseInt(map_settings.zoom.min),
              styles: JSON.parse(map_style),
              mapTypeControl: map_settings.maptypecontrol,
              scaleControl: map_settings.scalecontrol,
              rotateControl: map_settings.rotatecontrol,
              streetViewControl: map_settings.streetviewcontrol,
              zoomControl: map_settings.zoomcontrol,
              //scrollwheel: map_settings.scrollwheel,
              draggable: map_settings.draggable,
              gestureHandling: "cooperative",
            };
            var map = new google.maps.Map(
              document.getElementById(map_id),
              init_map
            );

            $("#" + map_id).addClass("processed");

            var infoBubble = new InfoBubble({
              shadowStyle: parseInt(map_settings.popup.shadow_style),
              padding: parseInt(map_settings.popup.padding),
              borderRadius: parseInt(map_settings.popup.border_radius),
              borderWidth: parseInt(map_settings.popup.border_width),
              borderColor: map_settings.popup.border_color,
              backgroundColor: map_settings.popup.background_color,
              minWidth: map_settings.popup.min_width,
              maxWidth: map_settings.popup.max_width,
              maxHeight: map_settings.popup.min_height,
              minHeight: map_settings.popup.max_height,
              arrowStyle: parseInt(map_settings.popup.arrow_style),
              arrowSize: parseInt(map_settings.popup.arrow_size),
              arrowPosition: parseInt(map_settings.popup.arrow_position),
              disableAutoPan: map_settings.popup.disable_autopan,
              disableAnimation: parseInt(map_settings.popup.disable_animation),
              hideCloseButton: parseInt(map_settings.popup.hide_close_button),
              backgroundClassName: map_settings.popup.classes.background,
            });
            // Set extra custom classes for easy styling.
            infoBubble.bubble_.className = "sgmpopup sgmpopup-" + this.category;
            // infoBubble.close_.src = map_settings.style.active_pin;
            infoBubble.contentContainer_.className =
              map_settings.popup.classes.container;
            infoBubble.arrow_.className = map_settings.popup.classes.arrow;
            infoBubble.arrowOuter_.className =
              map_settings.popup.classes.arrow_outer;
            infoBubble.arrowInner_.className =
              map_settings.popup.classes.arrow_inner;
            if (map_settings.style.cluster_pin) {
              var clusterStyles = [
                {
                  textColor: "white",
                  url: map_settings.style.cluster_pin,
                  height: 73,
                  width: 73,
                  textSize: 17,
                },
                {
                  textColor: "white",
                  url: map_settings.style.cluster_pin,
                  height: 73,
                  width: 73,
                  textSize: 17,
                },
                {
                  textColor: "white",
                  url: map_settings.style.cluster_pin,
                  height: 73,
                  width: 73,
                  textSize: 17,
                },
              ];
              var mcOptions = {
                gridSize: 60,
                styles: clusterStyles,
                minimumClusterSize: 2,
              };
            }
            for (j in map_locations) {
              var relaCustomIcon = map_locations[j].pin;
              if (map_locations[j].pinAttributes !== undefined) {
                var h = map_locations[j].pinAttributes["pinHeight"];
                var w = map_locations[j].pinAttributes["pinWidth"];
                relaCustomIcon = {
                  url: map_locations[j].pin, // url
                  scaledSize: new google.maps.Size(w, h), // scaled size
                  // origin: new google.maps.Point(0,0), // origin
                  // anchor: new google.maps.Point(0, 0) // anchor
                };
              }

              var marker = new google.maps.Marker({
                position: new google.maps.LatLng(
                  map_locations[j].lat,
                  map_locations[j].lon
                ),
                map: map,
                html: map_locations[j].popup,
                icon: relaCustomIcon,
                original_icon: map_locations[j].pin,
                active_icon: !map_locations[j].pin_active
                  ? map_locations[j].pin
                  : map_locations[j].pin_active,
                category: map_locations[j].category,
                nid: map_locations[j].nid, // ML Added dis.
              });

              markers.push(marker);
              if (map_locations[j].popup) {
                google.maps.event.addListener(
                  marker,
                  "click",
                  (function (map) {
                    return function () {
                      infoBubble.setContent(this.html);
                      for (var i = 0; i < markers.length; i++) {
                        markers[i].setIcon(markers[i].original_icon);
                      }
                      this.setIcon(this.active_icon);
                      infoBubble.open(map, this);
                    };
                  })(map)
                );
              }
              bounds.extend(marker.getPosition());
            }

            if (map_settings.style.cluster_pin) {
              var markerCluster = new MarkerClusterer(map, markers, mcOptions);
            }
          }
          if (map_settings !== undefined) {
            if (
              map_settings.map_center &&
              map_settings.map_center.center_coordinates.lat
            ) {
              var map_center = new google.maps.LatLng(
                map_settings.map_center.center_coordinates.lat,
                map_settings.map_center.center_coordinates.lon
              );
              bounds.extend(map_center);
              map.setCenter(map_center);
            } else {
              map.setCenter(bounds.getCenter());
              if (map_locations.length > 1) {
                map.fitBounds(bounds);
              }
            }
          }
        }
        // Add the map to the data attr to easily access from other function.
        $("#" + map_id).data("map", map);
        $("#" + map_id).data("markers", markers);
        // Prevents piling up generated map ids.
        settings.styled_google_map = [];
      }
    },
  };
  if (Drupal.ajax !== undefined) {
    // Fixes ajax view filters with refreshed settings
    // MIKE 10.24.17 - What the fuck this breaks our form ajax.
    // Drupal.ajax.prototype.commands.settings = function (ajax, response, status) {
    //   if (ajax.element_settings.event == 'RefreshView') {
    //    // ajax.settings = response.settings;
    //   }
    // };
  }
})(jQuery); /*})'"*/ /*})'"*/
/**
 * @file
 * Adds draggable functionality to the html list display of the view.
 */

(function ($) {
  Drupal.behaviors.draggableViews = {
    attach: function (context, settings) {
      $(Drupal.settings.draggableviews_row_class).each(function (
        index,
        row_class
      ) {
        if (Drupal.settings.draggableviews_multilist != 0) {
          return;
        }

        $(
          ".views-form ." + row_class + ":not(.draggableviews-processed)",
          context
        )
          // Add class for theming.
          .addClass("draggableviews-processed")
          // Add sortable effect.
          .sortable({
            update: function (event, ui) {
              $(".draggableviews-weight").each(function (i, Val) {
                $(this).val(i);
              });

              if (!Drupal.settings.draggableviews_hide_confirmation) {
                if (!$(this).hasClass("draggableviews-changed")) {
                  // If view is not ajaxified.
                  if (!Drupal.settings.draggableviews_ajax) {
                    $(
                      '<div class="draggableviews-changed-warning messages warning">' +
                        Drupal.t(
                          "Changes made in this list will not be saved until the form is submitted."
                        ) +
                        "</div>"
                    )
                      .insertBefore($(this).parents("form div.item-list"))
                      .hide()
                      .fadeIn("slow");
                    $(this).addClass("draggableviews-changed");
                  } else {
                    // If view ajaxified.
                    if ($(".draggableviews-changed-notice").length) {
                      $(".draggableviews-changed-notice")
                        .fadeIn("slow")
                        .delay(3000)
                        .fadeOut("slow");
                    } else {
                      $(
                        '<div class="draggableviews-changed-notice messages warning">' +
                          Drupal.t("Order of this view has been changed.") +
                          "</div>"
                      )
                        .insertBefore($(this).parents("form div.item-list"))
                        .hide()
                        .fadeIn("slow")
                        .delay(3000)
                        .fadeOut("slow");
                      $(this).addClass("draggableviews-changed");
                    }
                  }
                }
              }
              // If Ajax enabled, we should submit the form.
              if (Drupal.settings.draggableviews_ajax) {
                $(this)
                  .parent()
                  .parent()
                  .find('.form-actions [id^="edit-submit"]')
                  .trigger("mousedown");
              }
            },
            containment: "parent",
            cursor: "move",
            tolerance: "pointer",
          });
        if (Drupal.settings.draggableviews_ajax) {
          $(".views-form ." + row_class)
            .parent()
            .parent()
            .find('.form-actions [id^="edit-submit"]')
            .hide();
        }
      });
    },
  };
})(jQuery); /*})'"*/ /*})'"*/
(function ($) {
  /**
   * Drupal FieldGroup object.
   */
  Drupal.FieldGroup = Drupal.FieldGroup || {};
  Drupal.FieldGroup.Effects = Drupal.FieldGroup.Effects || {};
  Drupal.FieldGroup.groupWithfocus = null;

  Drupal.FieldGroup.setGroupWithfocus = function (element) {
    element.css({ display: "block" });
    Drupal.FieldGroup.groupWithfocus = element;
  };

  /**
   * Implements Drupal.FieldGroup.processHook().
   */
  Drupal.FieldGroup.Effects.processFieldset = {
    execute: function (context, settings, type) {
      if (type == "form") {
        // Add required fields mark to any fieldsets containing required fields
        $("fieldset.fieldset", context).once(
          "fieldgroup-effects",
          function (i) {
            if (
              $(this).is(".required-fields") &&
              $(this).find(".form-required").length > 0
            ) {
              $("legend span.fieldset-legend", $(this))
                .eq(0)
                .append(" ")
                .append($(".form-required").eq(0).clone());
            }
            if ($(".error", $(this)).length) {
              $("legend span.fieldset-legend", $(this)).eq(0).addClass("error");
              Drupal.FieldGroup.setGroupWithfocus($(this));
            }
          }
        );
      }
    },
  };

  /**
   * Implements Drupal.FieldGroup.processHook().
   */
  Drupal.FieldGroup.Effects.processAccordion = {
    execute: function (context, settings, type) {
      $("div.field-group-accordion-wrapper", context).once(
        "fieldgroup-effects",
        function () {
          var wrapper = $(this);

          // Get the index to set active.
          var active_index = false;
          wrapper.find(".accordion-item").each(function (i) {
            if ($(this).hasClass("field-group-accordion-active")) {
              active_index = i;
            }
          });

          wrapper.accordion({
            heightStyle: "content",
            active: active_index,
            collapsible: true,
            changestart: function (event, ui) {
              if ($(this).hasClass("effect-none")) {
                ui.options.animated = false;
              } else {
                ui.options.animated = "slide";
              }
            },
          });

          if (type == "form") {
            var $firstErrorItem = false;

            // Add required fields mark to any element containing required fields
            wrapper.find("div.field-group-accordion-item").each(function (i) {
              if (
                $(this).is(".required-fields") &&
                $(this).find(".form-required").length > 0
              ) {
                $("h3.ui-accordion-header a")
                  .eq(i)
                  .append(" ")
                  .append($(".form-required").eq(0).clone());
              }
              if ($(".error", $(this)).length) {
                // Save first error item, for focussing it.
                if (!$firstErrorItem) {
                  $firstErrorItem = $(this).parent().accordion("activate", i);
                }
                $("h3.ui-accordion-header").eq(i).addClass("error");
              }
            });

            // Save first error item, for focussing it.
            if (!$firstErrorItem) {
              $(".ui-accordion-content-active", $firstErrorItem).css({
                height: "auto",
                width: "auto",
                display: "block",
              });
            }
          }
        }
      );
    },
  };

  /**
   * Implements Drupal.FieldGroup.processHook().
   */
  Drupal.FieldGroup.Effects.processHtabs = {
    execute: function (context, settings, type) {
      if (type == "form") {
        // Add required fields mark to any element containing required fields
        $("fieldset.horizontal-tabs-pane", context).once(
          "fieldgroup-effects",
          function (i) {
            if (
              $(this).is(".required-fields") &&
              $(this).find(".form-required").length > 0
            ) {
              $(this)
                .data("horizontalTab")
                .link.find("strong:first")
                .after($(".form-required").eq(0).clone())
                .after(" ");
            }
            if ($(".error", $(this)).length) {
              $(this).data("horizontalTab").link.parent().addClass("error");
              Drupal.FieldGroup.setGroupWithfocus($(this));
              $(this).data("horizontalTab").focus();
            }
          }
        );
      }
    },
  };

  /**
   * Implements Drupal.FieldGroup.processHook().
   */
  Drupal.FieldGroup.Effects.processTabs = {
    execute: function (context, settings, type) {
      if (type == "form") {
        var errorFocussed = false;

        // Add required fields mark to any fieldsets containing required fields
        $("fieldset.vertical-tabs-pane", context).once(
          "fieldgroup-effects",
          function (i) {
            if (
              $(this).is(".required-fields") &&
              $(this).find(".form-required").length > 0
            ) {
              $(this)
                .data("verticalTab")
                .link.find("strong:first")
                .after($(".form-required").eq(0).clone())
                .after(" ");
            }
            if ($(".error", $(this)).length) {
              $(this).data("verticalTab").link.parent().addClass("error");
              // Focus the first tab with error.
              if (!errorFocussed) {
                Drupal.FieldGroup.setGroupWithfocus($(this));
                $(this).data("verticalTab").focus();
                errorFocussed = true;
              }
            }
          }
        );
      }
    },
  };

  /**
   * Implements Drupal.FieldGroup.processHook().
   *
   * TODO clean this up meaning check if this is really
   *      necessary.
   */
  Drupal.FieldGroup.Effects.processDiv = {
    execute: function (context, settings, type) {
      $("div.collapsible", context).once("fieldgroup-effects", function () {
        var $wrapper = $(this);

        // Turn the legend into a clickable link, but retain span.field-group-format-toggler
        // for CSS positioning.

        var $toggler = $("span.field-group-format-toggler:first", $wrapper);
        var $link = $('<a class="field-group-format-title" href="#"></a>');
        $link.prepend($toggler.contents());

        // Add required field markers if needed
        if (
          $(this).is(".required-fields") &&
          $(this).find(".form-required").length > 0
        ) {
          $link.append(" ").append($(".form-required").eq(0).clone());
        }

        $link.appendTo($toggler);

        // .wrapInner() does not retain bound events.
        $link.click(function () {
          var wrapper = $wrapper.get(0);
          // Don't animate multiple times.
          if (!wrapper.animating) {
            wrapper.animating = true;
            var speed = $wrapper.hasClass("speed-fast") ? 300 : 1000;
            if (
              $wrapper.hasClass("effect-none") &&
              $wrapper.hasClass("speed-none")
            ) {
              $("> .field-group-format-wrapper", wrapper).toggle();
            } else if ($wrapper.hasClass("effect-blind")) {
              $("> .field-group-format-wrapper", wrapper).toggle(
                "blind",
                {},
                speed
              );
            } else {
              $("> .field-group-format-wrapper", wrapper).toggle(speed);
            }
            wrapper.animating = false;
          }
          $wrapper.toggleClass("collapsed");
          return false;
        });
      });
    },
  };

  /**
   * Behaviors.
   */
  Drupal.behaviors.fieldGroup = {
    attach: function (context, settings) {
      settings.field_group =
        settings.field_group || Drupal.settings.field_group;
      if (settings.field_group == undefined) {
        return;
      }

      // Execute all of them.
      $.each(Drupal.FieldGroup.Effects, function (func) {
        // We check for a wrapper function in Drupal.field_group as
        // alternative for dynamic string function calls.
        var type = func.toLowerCase().replace("process", "");
        if (
          settings.field_group[type] != undefined &&
          $.isFunction(this.execute)
        ) {
          this.execute(context, settings, settings.field_group[type]);
        }
      });

      // Fixes css for fieldgroups under vertical tabs.
      $(".fieldset-wrapper .fieldset > legend").css({ display: "block" });
      $(".vertical-tabs fieldset.fieldset").addClass("default-fallback");

      // Add a new ID to each fieldset.
      $(".group-wrapper .horizontal-tabs-panes > fieldset", context).once(
        "group-wrapper-panes-processed",
        function () {
          // Tats bad, but we have to keep the actual id to prevent layouts to break.
          var fieldgroupID = "field_group-" + $(this).attr("id");
          $(this).attr("id", fieldgroupID);
        }
      );
      // Set the hash in url to remember last userselection.
      $(".group-wrapper ul li").once("group-wrapper-ul-processed", function () {
        var fieldGroupNavigationListIndex = $(this).index();
        $(this)
          .children("a")
          .click(function () {
            var fieldset = $(".group-wrapper fieldset").get(
              fieldGroupNavigationListIndex
            );
            // Grab the first id, holding the wanted hashurl.
            var hashUrl = $(fieldset)
              .attr("id")
              .replace(/^field_group-/, "")
              .split(" ")[0];
            window.location.hash = hashUrl;
          });
      });
    },
  };
})(jQuery); /*})'"*/ /*})'"*/
/**
 * Owl carousel
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
(function ($, window, document, undefined) {
  var drag, state, e;

  /**
   * Template for status information about drag and touch events.
   * @private
   */
  drag = {
    start: 0,
    startX: 0,
    startY: 0,
    current: 0,
    currentX: 0,
    currentY: 0,
    offsetX: 0,
    offsetY: 0,
    distance: null,
    startTime: 0,
    endTime: 0,
    updatedX: 0,
    targetEl: null,
  };

  /**
   * Template for some status informations.
   * @private
   */
  state = {
    isTouch: false,
    isScrolling: false,
    isSwiping: false,
    direction: false,
    inMotion: false,
  };

  /**
   * Event functions references.
   * @private
   */
  e = {
    _onDragStart: null,
    _onDragMove: null,
    _onDragEnd: null,
    _transitionEnd: null,
    _resizer: null,
    _responsiveCall: null,
    _goToLoop: null,
    _checkVisibile: null,
  };

  /**
   * Creates a carousel.
   * @class The Owl Carousel.
   * @public
   * @param {HTMLElement|jQuery} element - The element to create the carousel for.
   * @param {Object} [options] - The options
   */
  function Owl(element, options) {
    /**
     * Current settings for the carousel.
     * @public
     */
    this.settings = null;

    /**
     * Current options set by the caller including defaults.
     * @public
     */
    this.options = $.extend({}, Owl.Defaults, options);

    /**
     * Plugin element.
     * @public
     */
    this.$element = $(element);

    /**
     * Caches informations about drag and touch events.
     */
    this.drag = $.extend({}, drag);

    /**
     * Caches some status informations.
     * @protected
     */
    this.state = $.extend({}, state);

    /**
     * @protected
     * @todo Must be documented
     */
    this.e = $.extend({}, e);

    /**
     * References to the running plugins of this carousel.
     * @protected
     */
    this._plugins = {};

    /**
     *    Currently suppressed events to prevent them from beeing retriggered.
     * @protected
     */
    this._supress = {};

    /**
     * Absolute current position.
     * @protected
     */
    this._current = null;

    /**
     * Animation speed in milliseconds.
     * @protected
     */
    this._speed = null;

    /**
     * Coordinates of all items in pixel.
     * @todo The name of this member is missleading.
     * @protected
     */
    this._coordinates = [];

    /**
     * Current breakpoint.
     * @todo Real media queries would be nice.
     * @protected
     */
    this._breakpoint = null;

    /**
     * Current width of the plugin element.
     */
    this._width = null;

    /**
     * All real items.
     * @protected
     */
    this._items = [];

    /**
     * All cloned items.
     * @protected
     */
    this._clones = [];

    /**
     * Merge values of all items.
     * @todo Maybe this could be part of a plugin.
     * @protected
     */
    this._mergers = [];

    /**
     * Invalidated parts within the update process.
     * @protected
     */
    this._invalidated = {};

    /**
     * Ordered list of workers for the update process.
     * @protected
     */
    this._pipe = [];

    $.each(
      Owl.Plugins,
      $.proxy(function (key, plugin) {
        this._plugins[key[0].toLowerCase() + key.slice(1)] = new plugin(this);
      }, this)
    );

    $.each(
      Owl.Pipe,
      $.proxy(function (priority, worker) {
        this._pipe.push({
          filter: worker.filter,
          run: $.proxy(worker.run, this),
        });
      }, this)
    );

    this.setup();
    this.initialize();
  }

  /**
   * Default options for the carousel.
   * @public
   */
  Owl.Defaults = {
    items: 3,
    loop: false,
    center: false,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    freeDrag: false,

    margin: 0,
    stagePadding: 0,

    merge: false,
    mergeFit: true,
    autoWidth: false,

    startPosition: 0,
    rtl: false,

    smartSpeed: 250,
    fluidSpeed: false,
    dragEndSpeed: false,

    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,
    responsiveClass: false,

    fallbackEasing: "swing",

    info: false,

    nestedItemSelector: false,
    itemElement: "div",
    stageElement: "div",

    // Classes and Names
    themeClass: "owl-theme",
    baseClass: "owl-carousel",
    itemClass: "owl-item",
    centerClass: "center",
    activeClass: "active",
  };

  /**
   * Enumeration for width.
   * @public
   * @readonly
   * @enum {String}
   */
  Owl.Width = {
    Default: "default",
    Inner: "inner",
    Outer: "outer",
  };

  /**
   * Contains all registered plugins.
   * @public
   */
  Owl.Plugins = {};

  /**
   * Update pipe.
   */
  Owl.Pipe = [
    {
      filter: ["width", "items", "settings"],
      run: function (cache) {
        cache.current =
          this._items && this._items[this.relative(this._current)];
      },
    },
    {
      filter: ["items", "settings"],
      run: function () {
        var cached = this._clones,
          clones = this.$stage.children(".cloned");

        if (
          clones.length !== cached.length ||
          (!this.settings.loop && cached.length > 0)
        ) {
          this.$stage.children(".cloned").remove();
          this._clones = [];
        }
      },
    },
    {
      filter: ["items", "settings"],
      run: function () {
        var i,
          n,
          clones = this._clones,
          items = this._items,
          delta = this.settings.loop
            ? clones.length - Math.max(this.settings.items * 2, 4)
            : 0;

        for (i = 0, n = Math.abs(delta / 2); i < n; i++) {
          if (delta > 0) {
            this.$stage
              .children()
              .eq(items.length + clones.length - 1)
              .remove();
            clones.pop();
            this.$stage.children().eq(0).remove();
            clones.pop();
          } else {
            clones.push(clones.length / 2);
            this.$stage.append(
              items[clones[clones.length - 1]].clone().addClass("cloned")
            );
            clones.push(items.length - 1 - (clones.length - 1) / 2);
            this.$stage.prepend(
              items[clones[clones.length - 1]].clone().addClass("cloned")
            );
          }
        }
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function () {
        var rtl = this.settings.rtl ? 1 : -1,
          width = (this.width() / this.settings.items).toFixed(3),
          coordinate = 0,
          merge,
          i,
          n;

        this._coordinates = [];
        for (i = 0, n = this._clones.length + this._items.length; i < n; i++) {
          merge = this._mergers[this.relative(i)];
          merge =
            (this.settings.mergeFit && Math.min(merge, this.settings.items)) ||
            merge;
          coordinate +=
            (this.settings.autoWidth
              ? this._items[this.relative(i)].width() + this.settings.margin
              : width * merge) * rtl;

          this._coordinates.push(coordinate);
        }
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function () {
        var i,
          n,
          width = (this.width() / this.settings.items).toFixed(3),
          css = {
            width:
              Math.abs(this._coordinates[this._coordinates.length - 1]) +
              this.settings.stagePadding * 2,
            "padding-left": this.settings.stagePadding || "",
            "padding-right": this.settings.stagePadding || "",
          };

        this.$stage.css(css);

        css = {
          width: this.settings.autoWidth
            ? "auto"
            : width - this.settings.margin,
        };
        css[this.settings.rtl ? "margin-left" : "margin-right"] =
          this.settings.margin;

        if (
          !this.settings.autoWidth &&
          $.grep(this._mergers, function (v) {
            return v > 1;
          }).length > 0
        ) {
          for (i = 0, n = this._coordinates.length; i < n; i++) {
            css.width =
              Math.abs(this._coordinates[i]) -
              Math.abs(this._coordinates[i - 1] || 0) -
              this.settings.margin;
            this.$stage.children().eq(i).css(css);
          }
        } else {
          this.$stage.children().css(css);
        }
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function (cache) {
        cache.current &&
          this.reset(this.$stage.children().index(cache.current));
      },
    },
    {
      filter: ["position"],
      run: function () {
        this.animate(this.coordinates(this._current));
      },
    },
    {
      filter: ["width", "position", "items", "settings"],
      run: function () {
        var rtl = this.settings.rtl ? 1 : -1,
          padding = this.settings.stagePadding * 2,
          begin = this.coordinates(this.current()) + padding,
          end = begin + this.width() * rtl,
          inner,
          outer,
          matches = [],
          i,
          n;

        for (i = 0, n = this._coordinates.length; i < n; i++) {
          inner = this._coordinates[i - 1] || 0;
          outer = Math.abs(this._coordinates[i]) + padding * rtl;

          if (
            (this.op(inner, "<=", begin) && this.op(inner, ">", end)) ||
            (this.op(outer, "<", begin) && this.op(outer, ">", end))
          ) {
            matches.push(i);
          }
        }

        this.$stage
          .children("." + this.settings.activeClass)
          .removeClass(this.settings.activeClass);
        this.$stage
          .children(":eq(" + matches.join("), :eq(") + ")")
          .addClass(this.settings.activeClass);

        if (this.settings.center) {
          this.$stage
            .children("." + this.settings.centerClass)
            .removeClass(this.settings.centerClass);
          this.$stage
            .children()
            .eq(this.current())
            .addClass(this.settings.centerClass);
        }
      },
    },
  ];

  /**
   * Initializes the carousel.
   * @protected
   */
  Owl.prototype.initialize = function () {
    this.trigger("initialize");

    this.$element
      .addClass(this.settings.baseClass)
      .addClass(this.settings.themeClass)
      .toggleClass("owl-rtl", this.settings.rtl);

    // check support
    this.browserSupport();

    if (this.settings.autoWidth && this.state.imagesLoaded !== true) {
      var imgs, nestedSelector, width;
      imgs = this.$element.find("img");
      nestedSelector = this.settings.nestedItemSelector
        ? "." + this.settings.nestedItemSelector
        : undefined;
      width = this.$element.children(nestedSelector).width();

      if (imgs.length && width <= 0) {
        this.preloadAutoWidthImages(imgs);
        return false;
      }
    }

    this.$element.addClass("owl-loading");

    // create stage
    this.$stage = $(
      "<" + this.settings.stageElement + ' class="owl-stage"/>'
    ).wrap('<div class="owl-stage-outer">');

    // append stage
    this.$element.append(this.$stage.parent());

    // append content
    this.replace(this.$element.children().not(this.$stage.parent()));

    // set view width
    this._width = this.$element.width();

    // update view
    this.refresh();

    this.$element.removeClass("owl-loading").addClass("owl-loaded");

    // attach generic events
    this.eventsCall();

    // attach generic events
    this.internalEvents();

    // attach custom control events
    this.addTriggerableEvents();

    this.trigger("initialized");
  };

  /**
   * Setups the current settings.
   * @todo Remove responsive classes. Why should adaptive designs be brought into IE8?
   * @todo Support for media queries by using `matchMedia` would be nice.
   * @public
   */
  Owl.prototype.setup = function () {
    var viewport = this.viewport(),
      overwrites = this.options.responsive,
      match = -1,
      settings = null;

    if (!overwrites) {
      settings = $.extend({}, this.options);
    } else {
      $.each(overwrites, function (breakpoint) {
        if (breakpoint <= viewport && breakpoint > match) {
          match = Number(breakpoint);
        }
      });

      settings = $.extend({}, this.options, overwrites[match]);
      delete settings.responsive;

      // responsive class
      if (settings.responsiveClass) {
        this.$element
          .attr("class", function (i, c) {
            return c.replace(/\b owl-responsive-\S+/g, "");
          })
          .addClass("owl-responsive-" + match);
      }
    }

    if (this.settings === null || this._breakpoint !== match) {
      this.trigger("change", {
        property: {
          name: "settings",
          value: settings,
        },
      });
      this._breakpoint = match;
      this.settings = settings;
      this.invalidate("settings");
      this.trigger("changed", {
        property: {
          name: "settings",
          value: this.settings,
        },
      });
    }
  };

  /**
   * Updates option logic if necessery.
   * @protected
   */
  Owl.prototype.optionsLogic = function () {
    // Toggle Center class
    this.$element.toggleClass("owl-center", this.settings.center);

    // if items number is less than in body
    if (this.settings.loop && this._items.length < this.settings.items) {
      this.settings.loop = false;
    }

    if (this.settings.autoWidth) {
      this.settings.stagePadding = false;
      this.settings.merge = false;
    }
  };

  /**
   * Prepares an item before add.
   * @todo Rename event parameter `content` to `item`.
   * @protected
   * @returns {jQuery|HTMLElement} - The item container.
   */
  Owl.prototype.prepare = function (item) {
    var event = this.trigger("prepare", {
      content: item,
    });

    if (!event.data) {
      event.data = $("<" + this.settings.itemElement + "/>")
        .addClass(this.settings.itemClass)
        .append(item);
    }

    this.trigger("prepared", {
      content: event.data,
    });

    return event.data;
  };

  /**
   * Updates the view.
   * @public
   */
  Owl.prototype.update = function () {
    var i = 0,
      n = this._pipe.length,
      filter = $.proxy(function (p) {
        return this[p];
      }, this._invalidated),
      cache = {};

    while (i < n) {
      if (
        this._invalidated.all ||
        $.grep(this._pipe[i].filter, filter).length > 0
      ) {
        this._pipe[i].run(cache);
      }
      i++;
    }

    this._invalidated = {};
  };

  /**
   * Gets the width of the view.
   * @public
   * @param {Owl.Width} [dimension=Owl.Width.Default] - The dimension to return.
   * @returns {Number} - The width of the view in pixel.
   */
  Owl.prototype.width = function (dimension) {
    dimension = dimension || Owl.Width.Default;
    switch (dimension) {
      case Owl.Width.Inner:
      case Owl.Width.Outer:
        return this._width;
      default:
        return (
          this._width - this.settings.stagePadding * 2 + this.settings.margin
        );
    }
  };

  /**
   * Refreshes the carousel primarily for adaptive purposes.
   * @public
   */
  Owl.prototype.refresh = function () {
    if (this._items.length === 0) {
      return false;
    }

    var start = new Date().getTime();

    this.trigger("refresh");

    this.setup();

    this.optionsLogic();

    // hide and show methods helps here to set a proper widths,
    // this prevents scrollbar to be calculated in stage width
    this.$stage.addClass("owl-refresh");

    this.update();

    this.$stage.removeClass("owl-refresh");

    this.state.orientation = window.orientation;

    this.watchVisibility();

    this.trigger("refreshed");
  };

  /**
   * Save internal event references and add event based functions.
   * @protected
   */
  Owl.prototype.eventsCall = function () {
    // Save events references
    this.e._onDragStart = $.proxy(function (e) {
      this.onDragStart(e);
    }, this);
    this.e._onDragMove = $.proxy(function (e) {
      this.onDragMove(e);
    }, this);
    this.e._onDragEnd = $.proxy(function (e) {
      this.onDragEnd(e);
    }, this);
    this.e._onResize = $.proxy(function (e) {
      this.onResize(e);
    }, this);
    this.e._transitionEnd = $.proxy(function (e) {
      this.transitionEnd(e);
    }, this);
    this.e._preventClick = $.proxy(function (e) {
      this.preventClick(e);
    }, this);
  };

  /**
   * Checks window `resize` event.
   * @protected
   */
  Owl.prototype.onThrottledResize = function () {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(
      this.e._onResize,
      this.settings.responsiveRefreshRate
    );
  };

  /**
   * Checks window `resize` event.
   * @protected
   */
  Owl.prototype.onResize = function () {
    if (!this._items.length) {
      return false;
    }

    if (this._width === this.$element.width()) {
      return false;
    }

    if (this.trigger("resize").isDefaultPrevented()) {
      return false;
    }

    this._width = this.$element.width();

    this.invalidate("width");

    this.refresh();

    this.trigger("resized");
  };

  /**
   * Checks for touch/mouse drag event type and add run event handlers.
   * @protected
   */
  Owl.prototype.eventsRouter = function (event) {
    var type = event.type;

    if (type === "mousedown" || type === "touchstart") {
      this.onDragStart(event);
    } else if (type === "mousemove" || type === "touchmove") {
      this.onDragMove(event);
    } else if (type === "mouseup" || type === "touchend") {
      this.onDragEnd(event);
    } else if (type === "touchcancel") {
      this.onDragEnd(event);
    }
  };

  /**
   * Checks for touch/mouse drag options and add necessery event handlers.
   * @protected
   */
  Owl.prototype.internalEvents = function () {
    var isTouch = isTouchSupport(),
      isTouchIE = isTouchSupportIE();

    if (this.settings.mouseDrag) {
      this.$stage.on(
        "mousedown",
        $.proxy(function (event) {
          this.eventsRouter(event);
        }, this)
      );
      this.$stage.on("dragstart", function () {
        return false;
      });
      this.$stage.get(0).onselectstart = function () {
        return false;
      };
    } else {
      this.$element.addClass("owl-text-select-on");
    }

    if (this.settings.touchDrag && !isTouchIE) {
      this.$stage.on(
        "touchstart touchcancel",
        $.proxy(function (event) {
          this.eventsRouter(event);
        }, this)
      );
    }

    // catch transitionEnd event
    if (this.transitionEndVendor) {
      this.on(
        this.$stage.get(0),
        this.transitionEndVendor,
        this.e._transitionEnd,
        false
      );
    }

    // responsive
    if (this.settings.responsive !== false) {
      this.on(window, "resize", $.proxy(this.onThrottledResize, this));
    }
  };

  /**
   * Handles touchstart/mousedown event.
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragStart = function (event) {
    var ev, isTouchEvent, pageX, pageY, animatedPos;

    ev = event.originalEvent || event || window.event;

    // prevent right click
    if (ev.which === 3 || this.state.isTouch) {
      return false;
    }

    if (ev.type === "mousedown") {
      this.$stage.addClass("owl-grab");
    }

    this.trigger("drag");
    this.drag.startTime = new Date().getTime();
    this.speed(0);
    this.state.isTouch = true;
    this.state.isScrolling = false;
    this.state.isSwiping = false;
    this.drag.distance = 0;

    pageX = getTouches(ev).x;
    pageY = getTouches(ev).y;

    // get stage position left
    this.drag.offsetX = this.$stage.position().left;
    this.drag.offsetY = this.$stage.position().top;

    if (this.settings.rtl) {
      this.drag.offsetX =
        this.$stage.position().left +
        this.$stage.width() -
        this.width() +
        this.settings.margin;
    }

    // catch position // ie to fix
    if (this.state.inMotion && this.support3d) {
      animatedPos = this.getTransformProperty();
      this.drag.offsetX = animatedPos;
      this.animate(animatedPos);
      this.state.inMotion = true;
    } else if (this.state.inMotion && !this.support3d) {
      this.state.inMotion = false;
      return false;
    }

    this.drag.startX = pageX - this.drag.offsetX;
    this.drag.startY = pageY - this.drag.offsetY;

    this.drag.start = pageX - this.drag.startX;
    this.drag.targetEl = ev.target || ev.srcElement;
    this.drag.updatedX = this.drag.start;

    // to do/check
    // prevent links and images dragging;
    if (
      this.drag.targetEl.tagName === "IMG" ||
      this.drag.targetEl.tagName === "A"
    ) {
      this.drag.targetEl.draggable = false;
    }

    $(document).on(
      "mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",
      $.proxy(function (event) {
        this.eventsRouter(event);
      }, this)
    );
  };

  /**
   * Handles the touchmove/mousemove events.
   * @todo Simplify
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.onDragMove = function (event) {
    var ev, isTouchEvent, pageX, pageY, minValue, maxValue, pull;

    if (!this.state.isTouch) {
      return;
    }

    if (this.state.isScrolling) {
      return;
    }

    ev = event.originalEvent || event || window.event;

    pageX = getTouches(ev).x;
    pageY = getTouches(ev).y;

    // Drag Direction
    this.drag.currentX = pageX - this.drag.startX;
    this.drag.currentY = pageY - this.drag.startY;
    this.drag.distance = this.drag.currentX - this.drag.offsetX;

    // Check move direction
    if (this.drag.distance < 0) {
      this.state.direction = this.settings.rtl ? "right" : "left";
    } else if (this.drag.distance > 0) {
      this.state.direction = this.settings.rtl ? "left" : "right";
    }
    // Loop
    if (this.settings.loop) {
      if (
        this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) &&
        this.state.direction === "right"
      ) {
        this.drag.currentX -=
          (this.settings.center && this.coordinates(0)) -
          this.coordinates(this._items.length);
      } else if (
        this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) &&
        this.state.direction === "left"
      ) {
        this.drag.currentX +=
          (this.settings.center && this.coordinates(0)) -
          this.coordinates(this._items.length);
      }
    } else {
      // pull
      minValue = this.settings.rtl
        ? this.coordinates(this.maximum())
        : this.coordinates(this.minimum());
      maxValue = this.settings.rtl
        ? this.coordinates(this.minimum())
        : this.coordinates(this.maximum());
      pull = this.settings.pullDrag ? this.drag.distance / 5 : 0;
      this.drag.currentX = Math.max(
        Math.min(this.drag.currentX, minValue + pull),
        maxValue + pull
      );
    }

    // Lock browser if swiping horizontal

    if (this.drag.distance > 8 || this.drag.distance < -8) {
      if (ev.preventDefault !== undefined) {
        ev.preventDefault();
      } else {
        ev.returnValue = false;
      }
      this.state.isSwiping = true;
    }

    this.drag.updatedX = this.drag.currentX;

    // Lock Owl if scrolling
    if (
      (this.drag.currentY > 16 || this.drag.currentY < -16) &&
      this.state.isSwiping === false
    ) {
      this.state.isScrolling = true;
      this.drag.updatedX = this.drag.start;
    }

    this.animate(this.drag.updatedX);
  };

  /**
   * Handles the touchend/mouseup events.
   * @protected
   */
  Owl.prototype.onDragEnd = function (event) {
    var compareTimes, distanceAbs, closest;

    if (!this.state.isTouch) {
      return;
    }

    if (event.type === "mouseup") {
      this.$stage.removeClass("owl-grab");
    }

    this.trigger("dragged");

    // prevent links and images dragging;
    this.drag.targetEl.removeAttribute("draggable");

    // remove drag event listeners

    this.state.isTouch = false;
    this.state.isScrolling = false;
    this.state.isSwiping = false;

    // to check
    if (this.drag.distance === 0 && this.state.inMotion !== true) {
      this.state.inMotion = false;
      return false;
    }

    // prevent clicks while scrolling

    this.drag.endTime = new Date().getTime();
    compareTimes = this.drag.endTime - this.drag.startTime;
    distanceAbs = Math.abs(this.drag.distance);

    // to test
    if (distanceAbs > 3 || compareTimes > 300) {
      this.removeClick(this.drag.targetEl);
    }

    closest = this.closest(this.drag.updatedX);

    this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
    this.current(closest);
    this.invalidate("position");
    this.update();

    // if pullDrag is off then fire transitionEnd event manually when stick
    // to border
    if (
      !this.settings.pullDrag &&
      this.drag.updatedX === this.coordinates(closest)
    ) {
      this.transitionEnd();
    }

    this.drag.distance = 0;

    $(document).off(".owl.dragEvents");
  };

  /**
   * Attaches `preventClick` to disable link while swipping.
   * @protected
   * @param {HTMLElement} [target] - The target of the `click` event.
   */
  Owl.prototype.removeClick = function (target) {
    this.drag.targetEl = target;
    $(target).on("click.preventClick", this.e._preventClick);
    // to make sure click is removed:
    window.setTimeout(function () {
      $(target).off("click.preventClick");
    }, 300);
  };

  /**
   * Suppresses click event.
   * @protected
   * @param {Event} ev - The event arguments.
   */
  Owl.prototype.preventClick = function (ev) {
    if (ev.preventDefault) {
      ev.preventDefault();
    } else {
      ev.returnValue = false;
    }
    if (ev.stopPropagation) {
      ev.stopPropagation();
    }
    $(ev.target).off("click.preventClick");
  };

  /**
   * Catches stage position while animate (only CSS3).
   * @protected
   * @returns
   */
  Owl.prototype.getTransformProperty = function () {
    var transform, matrix3d;

    transform = window
      .getComputedStyle(this.$stage.get(0), null)
      .getPropertyValue(this.vendorName + "transform");
    // var transform = this.$stage.css(this.vendorName + 'transform')
    transform = transform.replace(/matrix(3d)?\(|\)/g, "").split(",");
    matrix3d = transform.length === 16;

    return matrix3d !== true ? transform[4] : transform[12];
  };

  /**
   * Gets absolute position of the closest item for a coordinate.
   * @todo Setting `freeDrag` makes `closest` not reusable. See #165.
   * @protected
   * @param {Number} coordinate - The coordinate in pixel.
   * @return {Number} - The absolute position of the closest item.
   */
  Owl.prototype.closest = function (coordinate) {
    var position = -1,
      pull = 30,
      width = this.width(),
      coordinates = this.coordinates();

    if (!this.settings.freeDrag) {
      // check closest item
      $.each(
        coordinates,
        $.proxy(function (index, value) {
          if (coordinate > value - pull && coordinate < value + pull) {
            position = index;
          } else if (
            this.op(coordinate, "<", value) &&
            this.op(coordinate, ">", coordinates[index + 1] || value - width)
          ) {
            position = this.state.direction === "left" ? index + 1 : index;
          }
          return position === -1;
        }, this)
      );
    }

    if (!this.settings.loop) {
      // non loop boundries
      if (this.op(coordinate, ">", coordinates[this.minimum()])) {
        position = coordinate = this.minimum();
      } else if (this.op(coordinate, "<", coordinates[this.maximum()])) {
        position = coordinate = this.maximum();
      }
    }

    return position;
  };

  /**
   * Animates the stage.
   * @public
   * @param {Number} coordinate - The coordinate in pixels.
   */
  Owl.prototype.animate = function (coordinate) {
    this.trigger("translate");
    this.state.inMotion = this.speed() > 0;

    if (this.support3d) {
      this.$stage.css({
        transform: "translate3d(" + coordinate + "px" + ",0px, 0px)",
        transition: this.speed() / 1000 + "s",
      });
    } else if (this.state.isTouch) {
      this.$stage.css({
        left: coordinate + "px",
      });
    } else {
      this.$stage.animate(
        {
          left: coordinate,
        },
        this.speed() / 1000,
        this.settings.fallbackEasing,
        $.proxy(function () {
          if (this.state.inMotion) {
            this.transitionEnd();
          }
        }, this)
      );
    }
  };

  /**
   * Sets the absolute position of the current item.
   * @public
   * @param {Number} [position] - The new absolute position or nothing to leave it unchanged.
   * @returns {Number} - The absolute position of the current item.
   */
  Owl.prototype.current = function (position) {
    if (position === undefined) {
      return this._current;
    }

    if (this._items.length === 0) {
      return undefined;
    }

    position = this.normalize(position);

    if (this._current !== position) {
      var event = this.trigger("change", {
        property: {
          name: "position",
          value: position,
        },
      });

      if (event.data !== undefined) {
        position = this.normalize(event.data);
      }

      this._current = position;

      this.invalidate("position");

      this.trigger("changed", {
        property: {
          name: "position",
          value: this._current,
        },
      });
    }

    return this._current;
  };

  /**
   * Invalidates the given part of the update routine.
   * @param {String} part - The part to invalidate.
   */
  Owl.prototype.invalidate = function (part) {
    this._invalidated[part] = true;
  };

  /**
   * Resets the absolute position of the current item.
   * @public
   * @param {Number} position - The absolute position of the new item.
   */
  Owl.prototype.reset = function (position) {
    position = this.normalize(position);

    if (position === undefined) {
      return;
    }

    this._speed = 0;
    this._current = position;

    this.suppress(["translate", "translated"]);

    this.animate(this.coordinates(position));

    this.release(["translate", "translated"]);
  };

  /**
   * Normalizes an absolute or a relative position for an item.
   * @public
   * @param {Number} position - The absolute or relative position to normalize.
   * @param {Boolean} [relative=false] - Whether the given position is relative or not.
   * @returns {Number} - The normalized position.
   */
  Owl.prototype.normalize = function (position, relative) {
    var n = relative
      ? this._items.length
      : this._items.length + this._clones.length;

    if (!$.isNumeric(position) || n < 1) {
      return undefined;
    }

    if (this._clones.length) {
      position = ((position % n) + n) % n;
    } else {
      position = Math.max(
        this.minimum(relative),
        Math.min(this.maximum(relative), position)
      );
    }

    return position;
  };

  /**
   * Converts an absolute position for an item into a relative position.
   * @public
   * @param {Number} position - The absolute position to convert.
   * @returns {Number} - The converted position.
   */
  Owl.prototype.relative = function (position) {
    position = this.normalize(position);
    position = position - this._clones.length / 2;
    return this.normalize(position, true);
  };

  /**
   * Gets the maximum position for an item.
   * @public
   * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
   * @returns {Number}
   */
  Owl.prototype.maximum = function (relative) {
    var maximum,
      width,
      i = 0,
      coordinate,
      settings = this.settings;

    if (relative) {
      return this._items.length - 1;
    }

    if (!settings.loop && settings.center) {
      maximum = this._items.length - 1;
    } else if (!settings.loop && !settings.center) {
      maximum = this._items.length - settings.items;
    } else if (settings.loop || settings.center) {
      maximum = this._items.length + settings.items;
    } else if (settings.autoWidth || settings.merge) {
      revert = settings.rtl ? 1 : -1;
      width = this.$stage.width() - this.$element.width();
      while ((coordinate = this.coordinates(i))) {
        if (coordinate * revert >= width) {
          break;
        }
        maximum = ++i;
      }
    } else {
      throw "Can not detect maximum absolute position.";
    }

    return maximum;
  };

  /**
   * Gets the minimum position for an item.
   * @public
   * @param {Boolean} [relative=false] - Whether to return an absolute position or a relative position.
   * @returns {Number}
   */
  Owl.prototype.minimum = function (relative) {
    if (relative) {
      return 0;
    }

    return this._clones.length / 2;
  };

  /**
   * Gets an item at the specified relative position.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
   */
  Owl.prototype.items = function (position) {
    if (position === undefined) {
      return this._items.slice();
    }

    position = this.normalize(position, true);
    return this._items[position];
  };

  /**
   * Gets an item at the specified relative position.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @return {jQuery|Array.<jQuery>} - The item at the given position or all items if no position was given.
   */
  Owl.prototype.mergers = function (position) {
    if (position === undefined) {
      return this._mergers.slice();
    }

    position = this.normalize(position, true);
    return this._mergers[position];
  };

  /**
   * Gets the absolute positions of clones for an item.
   * @public
   * @param {Number} [position] - The relative position of the item.
   * @returns {Array.<Number>} - The absolute positions of clones for the item or all if no position was given.
   */
  Owl.prototype.clones = function (position) {
    var odd = this._clones.length / 2,
      even = odd + this._items.length,
      map = function (index) {
        return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;
      };

    if (position === undefined) {
      return $.map(this._clones, function (v, i) {
        return map(i);
      });
    }

    return $.map(this._clones, function (v, i) {
      return v === position ? map(i) : null;
    });
  };

  /**
   * Sets the current animation speed.
   * @public
   * @param {Number} [speed] - The animation speed in milliseconds or nothing to leave it unchanged.
   * @returns {Number} - The current animation speed in milliseconds.
   */
  Owl.prototype.speed = function (speed) {
    if (speed !== undefined) {
      this._speed = speed;
    }

    return this._speed;
  };

  /**
   * Gets the coordinate of an item.
   * @todo The name of this method is missleanding.
   * @public
   * @param {Number} position - The absolute position of the item within `minimum()` and `maximum()`.
   * @returns {Number|Array.<Number>} - The coordinate of the item in pixel or all coordinates.
   */
  Owl.prototype.coordinates = function (position) {
    var coordinate = null;

    if (position === undefined) {
      return $.map(
        this._coordinates,
        $.proxy(function (coordinate, index) {
          return this.coordinates(index);
        }, this)
      );
    }

    if (this.settings.center) {
      coordinate = this._coordinates[position];
      coordinate +=
        ((this.width() - coordinate + (this._coordinates[position - 1] || 0)) /
          2) *
        (this.settings.rtl ? -1 : 1);
    } else {
      coordinate = this._coordinates[position - 1] || 0;
    }

    return coordinate;
  };

  /**
   * Calculates the speed for a translation.
   * @protected
   * @param {Number} from - The absolute position of the start item.
   * @param {Number} to - The absolute position of the target item.
   * @param {Number} [factor=undefined] - The time factor in milliseconds.
   * @returns {Number} - The time in milliseconds for the translation.
   */
  Owl.prototype.duration = function (from, to, factor) {
    return (
      Math.min(Math.max(Math.abs(to - from), 1), 6) *
      Math.abs(factor || this.settings.smartSpeed)
    );
  };

  /**
   * Slides to the specified item.
   * @public
   * @param {Number} position - The position of the item.
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.to = function (position, speed) {
    if (this.settings.loop) {
      var distance = position - this.relative(this.current()),
        revert = this.current(),
        before = this.current(),
        after = this.current() + distance,
        direction = before - after < 0 ? true : false,
        items = this._clones.length + this._items.length;

      if (after < this.settings.items && direction === false) {
        revert = before + this._items.length;
        this.reset(revert);
      } else if (after >= items - this.settings.items && direction === true) {
        revert = before - this._items.length;
        this.reset(revert);
      }
      window.clearTimeout(this.e._goToLoop);
      this.e._goToLoop = window.setTimeout(
        $.proxy(function () {
          this.speed(this.duration(this.current(), revert + distance, speed));
          this.current(revert + distance);
          this.update();
        }, this),
        30
      );
    } else {
      this.speed(this.duration(this.current(), position, speed));
      this.current(position);
      this.update();
    }
  };

  /**
   * Slides to the next item.
   * @public
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.next = function (speed) {
    speed = speed || false;
    this.to(this.relative(this.current()) + 1, speed);
  };

  /**
   * Slides to the previous item.
   * @public
   * @param {Number} [speed] - The time in milliseconds for the transition.
   */
  Owl.prototype.prev = function (speed) {
    speed = speed || false;
    this.to(this.relative(this.current()) - 1, speed);
  };

  /**
   * Handles the end of an animation.
   * @protected
   * @param {Event} event - The event arguments.
   */
  Owl.prototype.transitionEnd = function (event) {
    // if css2 animation then event object is undefined
    if (event !== undefined) {
      event.stopPropagation();

      // Catch only owl-stage transitionEnd event
      if (
        (event.target || event.srcElement || event.originalTarget) !==
        this.$stage.get(0)
      ) {
        return false;
      }
    }

    this.state.inMotion = false;
    this.trigger("translated");
  };

  /**
   * Gets viewport width.
   * @protected
   * @return {Number} - The width in pixel.
   */
  Owl.prototype.viewport = function () {
    var width;
    if (this.options.responsiveBaseElement !== window) {
      width = $(this.options.responsiveBaseElement).width();
    } else if (window.innerWidth) {
      width = window.innerWidth;
    } else if (
      document.documentElement &&
      document.documentElement.clientWidth
    ) {
      width = document.documentElement.clientWidth;
    } else {
      throw "Can not detect viewport width.";
    }
    return width;
  };

  /**
   * Replaces the current content.
   * @public
   * @param {HTMLElement|jQuery|String} content - The new content.
   */
  Owl.prototype.replace = function (content) {
    this.$stage.empty();
    this._items = [];

    if (content) {
      content = content instanceof jQuery ? content : $(content);
    }

    if (this.settings.nestedItemSelector) {
      content = content.find("." + this.settings.nestedItemSelector);
    }

    content
      .filter(function () {
        return this.nodeType === 1;
      })
      .each(
        $.proxy(function (index, item) {
          item = this.prepare(item);
          this.$stage.append(item);
          this._items.push(item);
          this._mergers.push(
            item
              .find("[data-merge]")
              .andSelf("[data-merge]")
              .attr("data-merge") * 1 || 1
          );
        }, this)
      );

    this.reset(
      $.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0
    );

    this.invalidate("items");
  };

  /**
   * Adds an item.
   * @todo Use `item` instead of `content` for the event arguments.
   * @public
   * @param {HTMLElement|jQuery|String} content - The item content to add.
   * @param {Number} [position] - The relative position at which to insert the item otherwise the item will be added to the end.
   */
  Owl.prototype.add = function (content, position) {
    position =
      position === undefined
        ? this._items.length
        : this.normalize(position, true);

    this.trigger("add", {
      content: content,
      position: position,
    });

    if (this._items.length === 0 || position === this._items.length) {
      this.$stage.append(content);
      this._items.push(content);
      this._mergers.push(
        content
          .find("[data-merge]")
          .andSelf("[data-merge]")
          .attr("data-merge") * 1 || 1
      );
    } else {
      this._items[position].before(content);
      this._items.splice(position, 0, content);
      this._mergers.splice(
        position,
        0,
        content
          .find("[data-merge]")
          .andSelf("[data-merge]")
          .attr("data-merge") * 1 || 1
      );
    }

    this.invalidate("items");

    this.trigger("added", {
      content: content,
      position: position,
    });
  };

  /**
   * Removes an item by its position.
   * @todo Use `item` instead of `content` for the event arguments.
   * @public
   * @param {Number} position - The relative position of the item to remove.
   */
  Owl.prototype.remove = function (position) {
    position = this.normalize(position, true);

    if (position === undefined) {
      return;
    }

    this.trigger("remove", {
      content: this._items[position],
      position: position,
    });

    this._items[position].remove();
    this._items.splice(position, 1);
    this._mergers.splice(position, 1);

    this.invalidate("items");

    this.trigger("removed", {
      content: null,
      position: position,
    });
  };

  /**
   * Adds triggerable events.
   * @protected
   */
  Owl.prototype.addTriggerableEvents = function () {
    var handler = $.proxy(function (callback, event) {
      return $.proxy(function (e) {
        if (e.relatedTarget !== this) {
          this.suppress([event]);
          callback.apply(this, [].slice.call(arguments, 1));
          this.release([event]);
        }
      }, this);
    }, this);

    $.each(
      {
        next: this.next,
        prev: this.prev,
        to: this.to,
        destroy: this.destroy,
        refresh: this.refresh,
        replace: this.replace,
        add: this.add,
        remove: this.remove,
      },
      $.proxy(function (event, callback) {
        this.$element.on(
          event + ".owl.carousel",
          handler(callback, event + ".owl.carousel")
        );
      }, this)
    );
  };

  /**
   * Watches the visibility of the carousel element.
   * @protected
   */
  Owl.prototype.watchVisibility = function () {
    // test on zepto
    if (!isElVisible(this.$element.get(0))) {
      this.$element.addClass("owl-hidden");
      window.clearInterval(this.e._checkVisibile);
      this.e._checkVisibile = window.setInterval(
        $.proxy(checkVisible, this),
        500
      );
    }

    function isElVisible(el) {
      return el.offsetWidth > 0 && el.offsetHeight > 0;
    }

    function checkVisible() {
      if (isElVisible(this.$element.get(0))) {
        this.$element.removeClass("owl-hidden");
        this.refresh();
        window.clearInterval(this.e._checkVisibile);
      }
    }
  };

  /**
   * Preloads images with auto width.
   * @protected
   * @todo Still to test
   */
  Owl.prototype.preloadAutoWidthImages = function (imgs) {
    var loaded, that, $el, img;

    loaded = 0;
    that = this;
    imgs.each(function (i, el) {
      $el = $(el);
      img = new Image();

      img.onload = function () {
        loaded++;
        $el.attr("src", img.src);
        $el.css("opacity", 1);
        if (loaded >= imgs.length) {
          that.state.imagesLoaded = true;
          that.initialize();
        }
      };

      img.src =
        $el.attr("src") || $el.attr("data-src") || $el.attr("data-src-retina");
    });
  };

  /**
   * Destroys the carousel.
   * @public
   */
  Owl.prototype.destroy = function () {
    if (this.$element.hasClass(this.settings.themeClass)) {
      this.$element.removeClass(this.settings.themeClass);
    }

    if (this.settings.responsive !== false) {
      $(window).off("resize.owl.carousel");
    }

    if (this.transitionEndVendor) {
      this.off(
        this.$stage.get(0),
        this.transitionEndVendor,
        this.e._transitionEnd
      );
    }

    for (var i in this._plugins) {
      this._plugins[i].destroy();
    }

    if (this.settings.mouseDrag || this.settings.touchDrag) {
      this.$stage.off("mousedown touchstart touchcancel");
      $(document).off(".owl.dragEvents");
      this.$stage.get(0).onselectstart = function () {};
      this.$stage.off("dragstart", function () {
        return false;
      });
    }

    // remove event handlers in the ".owl.carousel" namespace
    this.$element.off(".owl");

    this.$stage.children(".cloned").remove();
    this.e = null;
    this.$element.removeData("owlCarousel");

    this.$stage.children().contents().unwrap();
    this.$stage.children().unwrap();
    this.$stage.unwrap();
  };

  /**
   * Operators to calculate right-to-left and left-to-right.
   * @protected
   * @param {Number} [a] - The left side operand.
   * @param {String} [o] - The operator.
   * @param {Number} [b] - The right side operand.
   */
  Owl.prototype.op = function (a, o, b) {
    var rtl = this.settings.rtl;
    switch (o) {
      case "<":
        return rtl ? a > b : a < b;
      case ">":
        return rtl ? a < b : a > b;
      case ">=":
        return rtl ? a <= b : a >= b;
      case "<=":
        return rtl ? a >= b : a <= b;
      default:
        break;
    }
  };

  /**
   * Attaches to an internal event.
   * @protected
   * @param {HTMLElement} element - The event source.
   * @param {String} event - The event name.
   * @param {Function} listener - The event handler to attach.
   * @param {Boolean} capture - Wether the event should be handled at the capturing phase or not.
   */
  Owl.prototype.on = function (element, event, listener, capture) {
    if (element.addEventListener) {
      element.addEventListener(event, listener, capture);
    } else if (element.attachEvent) {
      element.attachEvent("on" + event, listener);
    }
  };

  /**
   * Detaches from an internal event.
   * @protected
   * @param {HTMLElement} element - The event source.
   * @param {String} event - The event name.
   * @param {Function} listener - The attached event handler to detach.
   * @param {Boolean} capture - Wether the attached event handler was registered as a capturing listener or not.
   */
  Owl.prototype.off = function (element, event, listener, capture) {
    if (element.removeEventListener) {
      element.removeEventListener(event, listener, capture);
    } else if (element.detachEvent) {
      element.detachEvent("on" + event, listener);
    }
  };

  /**
   * Triggers an public event.
   * @protected
   * @param {String} name - The event name.
   * @param {*} [data=null] - The event data.
   * @param {String} [namespace=.owl.carousel] - The event namespace.
   * @returns {Event} - The event arguments.
   */
  Owl.prototype.trigger = function (name, data, namespace) {
    var status = {
        item: {
          count: this._items.length,
          index: this.current(),
        },
      },
      handler = $.camelCase(
        $.grep(["on", name, namespace], function (v) {
          return v;
        })
          .join("-")
          .toLowerCase()
      ),
      event = $.Event(
        [name, "owl", namespace || "carousel"].join(".").toLowerCase(),
        $.extend(
          {
            relatedTarget: this,
          },
          status,
          data
        )
      );

    if (!this._supress[name]) {
      $.each(this._plugins, function (name, plugin) {
        if (plugin.onTrigger) {
          plugin.onTrigger(event);
        }
      });

      this.$element.trigger(event);

      if (this.settings && typeof this.settings[handler] === "function") {
        this.settings[handler].apply(this, event);
      }
    }

    return event;
  };

  /**
   * Suppresses events.
   * @protected
   * @param {Array.<String>} events - The events to suppress.
   */
  Owl.prototype.suppress = function (events) {
    $.each(
      events,
      $.proxy(function (index, event) {
        this._supress[event] = true;
      }, this)
    );
  };

  /**
   * Releases suppressed events.
   * @protected
   * @param {Array.<String>} events - The events to release.
   */
  Owl.prototype.release = function (events) {
    $.each(
      events,
      $.proxy(function (index, event) {
        delete this._supress[event];
      }, this)
    );
  };

  /**
   * Checks the availability of some browser features.
   * @protected
   */
  Owl.prototype.browserSupport = function () {
    this.support3d = isPerspective();

    if (this.support3d) {
      this.transformVendor = isTransform();

      // take transitionend event name by detecting transition
      var endVendors = [
        "transitionend",
        "webkitTransitionEnd",
        "transitionend",
        "oTransitionEnd",
      ];
      this.transitionEndVendor = endVendors[isTransition()];

      // take vendor name from transform name
      this.vendorName = this.transformVendor.replace(/Transform/i, "");
      this.vendorName =
        this.vendorName !== "" ? "-" + this.vendorName.toLowerCase() + "-" : "";
    }

    this.state.orientation = window.orientation;
  };

  /**
   * Get touch/drag coordinats.
   * @private
   * @param {event} - mousedown/touchstart event
   * @returns {object} - Contains X and Y of current mouse/touch position
   */

  function getTouches(event) {
    if (event.touches !== undefined) {
      return {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY,
      };
    }

    if (event.touches === undefined) {
      if (event.pageX !== undefined) {
        return {
          x: event.pageX,
          y: event.pageY,
        };
      }

      if (event.pageX === undefined) {
        return {
          x: event.clientX,
          y: event.clientY,
        };
      }
    }
  }

  /**
   * Checks for CSS support.
   * @private
   * @param {Array} array - The CSS properties to check for.
   * @returns {Array} - Contains the supported CSS property name and its index or `false`.
   */
  function isStyleSupported(array) {
    var p,
      s,
      fake = document.createElement("div"),
      list = array;
    for (p in list) {
      s = list[p];
      if (typeof fake.style[s] !== "undefined") {
        fake = null;
        return [s, p];
      }
    }
    return [false];
  }

  /**
   * Checks for CSS transition support.
   * @private
   * @todo Realy bad design
   * @returns {Number}
   */
  function isTransition() {
    return isStyleSupported([
      "transition",
      "WebkitTransition",
      "MozTransition",
      "OTransition",
    ])[1];
  }

  /**
   * Checks for CSS transform support.
   * @private
   * @returns {String} The supported property name or false.
   */
  function isTransform() {
    return isStyleSupported([
      "transform",
      "WebkitTransform",
      "MozTransform",
      "OTransform",
      "msTransform",
    ])[0];
  }

  /**
   * Checks for CSS perspective support.
   * @private
   * @returns {String} The supported property name or false.
   */
  function isPerspective() {
    return isStyleSupported([
      "perspective",
      "webkitPerspective",
      "MozPerspective",
      "OPerspective",
      "MsPerspective",
    ])[0];
  }

  /**
   * Checks wether touch is supported or not.
   * @private
   * @returns {Boolean}
   */
  function isTouchSupport() {
    return "ontouchstart" in window || !!navigator.msMaxTouchPoints;
  }

  /**
   * Checks wether touch is supported or not for IE.
   * @private
   * @returns {Boolean}
   */
  function isTouchSupportIE() {
    return window.navigator.msPointerEnabled;
  }

  /**
   * The jQuery Plugin for the Owl Carousel
   * @public
   */
  $.fn.owlCarousel = function (options) {
    return this.each(function () {
      if (!$(this).data("owlCarousel")) {
        $(this).data("owlCarousel", new Owl(this, options));
      }
    });
  };

  /**
   * The constructor for the jQuery Plugin
   * @public
   */
  $.fn.owlCarousel.Constructor = Owl;
})(window.Zepto || window.jQuery, window, document);

/**
 * Lazy Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  /**
   * Creates the lazy plugin.
   * @class The Lazy Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Lazy = function (carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Already loaded items.
     * @protected
     * @type {Array.<jQuery>}
     */
    //this._loaded = [];

    /**
     * Event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      "initialized.owl.carousel change.owl.carousel": $.proxy(function (e) {
        if (!e.namespace) {
          return;
        }

        if (!this._core.settings || !this._core.settings.lazyLoad) {
          return;
        }

        if (
          (e.property && e.property.name == "position") ||
          e.type == "initialized"
        ) {
          var settings = this._core.settings,
            n =
              (settings.center && Math.ceil(settings.items / 2)) ||
              settings.items,
            i = (settings.center && n * -1) || 0,
            position =
              ((e.property && e.property.value) || this._core.current()) + i,
            clones = this._core.clones().length,
            load = $.proxy(function (i, v) {
              this.load(v);
            }, this);

          while (i++ < n) {
            this.load(clones / 2 + this._core.relative(position));
            clones &&
              $.each(this._core.clones(this._core.relative(position++)), load);
          }
        }
      }, this),
    };

    // set the default options
    this._core.options = $.extend({}, Lazy.Defaults, this._core.options);

    // register event handler
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  Lazy.Defaults = {
    lazyLoad: false,
  };

  /**
   * Loads all resources of an item at the specified position.
   * @param {Number} position - The absolute position of the item.
   * @protected
   */
  Lazy.prototype.load = function (position) {
    var $item = this._core.$stage.children().eq(position),
      $elements = $item && $item.find(".owl-lazy");

    // if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
    //   return;
    // }

    $elements.each(
      $.proxy(function (index, element) {
        var $element = $(element),
          image,
          url =
            (window.devicePixelRatio > 1 && $element.attr("data-src-retina")) ||
            $element.attr("data-src");

        this._core.trigger(
          "load",
          {
            element: $element,
            url: url,
          },
          "lazy"
        );

        if ($element.is("img")) {
          $element
            .one(
              "load.owl.lazy",
              $.proxy(function () {
                $element.css("opacity", 1);
                this._core.trigger(
                  "loaded",
                  {
                    element: $element,
                    url: url,
                  },
                  "lazy"
                );
              }, this)
            )
            .attr("src", url);
        } else {
          image = new Image();
          image.onload = $.proxy(function () {
            $element.css({
              "background-image": "url(" + url + ")",
              opacity: "1",
            });
            this._core.trigger(
              "loaded",
              {
                element: $element,
                url: url,
              },
              "lazy"
            );
          }, this);
          image.src = url;
        }
      }, this)
    );

    //this._loaded.push($item.get(0));
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Lazy.prototype.destroy = function () {
    var handler, property;

    for (handler in this.handlers) {
      this._core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != "function" && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;
})(window.Zepto || window.jQuery, window, document);

/**
 * AutoHeight Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  /**
   * Creates the auto height plugin.
   * @class The Auto Height Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var AutoHeight = function (carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      "initialized.owl.carousel": $.proxy(function () {
        if (this._core.settings.autoHeight) {
          this.update();
        }
      }, this),
      "changed.owl.carousel": $.proxy(function (e) {
        if (this._core.settings.autoHeight && e.property.name == "position") {
          this.update();
        }
      }, this),
      "loaded.owl.lazy": $.proxy(function (e) {
        if (
          this._core.settings.autoHeight &&
          e.element.closest("." + this._core.settings.itemClass) ===
            this._core.$stage.children().eq(this._core.current())
        ) {
          this.update();
        }
      }, this),
    };

    // set default options
    this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   */
  AutoHeight.Defaults = {
    autoHeight: false,
    autoHeightClass: "owl-height",
  };

  /**
   * Updates the view.
   */
  AutoHeight.prototype.update = function () {
    this._core.$stage
      .parent()
      .height(this._core.$stage.children().eq(this._core.current()).height())
      .addClass(this._core.settings.autoHeightClass);
  };

  AutoHeight.prototype.destroy = function () {
    var handler, property;

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != "function" && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;
})(window.Zepto || window.jQuery, window, document);

/**
 * Video Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  /**
   * Creates the video plugin.
   * @class The Video Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Video = function (carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Cache all video URLs.
     * @protected
     * @type {Object}
     */
    this._videos = {};

    /**
     * Current playing item.
     * @protected
     * @type {jQuery}
     */
    this._playing = null;

    /**
     * Whether this is in fullscreen or not.
     * @protected
     * @type {Boolean}
     */
    this._fullscreen = false;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      "resize.owl.carousel": $.proxy(function (e) {
        if (this._core.settings.video && !this.isInFullScreen()) {
          e.preventDefault();
        }
      }, this),
      "refresh.owl.carousel changed.owl.carousel": $.proxy(function (e) {
        if (this._playing) {
          this.stop();
        }
      }, this),
      "prepared.owl.carousel": $.proxy(function (e) {
        var $element = $(e.content).find(".owl-video");
        if ($element.length) {
          $element.css("display", "none");
          this.fetch($element, $(e.content));
        }
      }, this),
    };

    // set default options
    this._core.options = $.extend({}, Video.Defaults, this._core.options);

    // register event handlers
    this._core.$element.on(this._handlers);

    this._core.$element.on(
      "click.owl.video",
      ".owl-video-play-icon",
      $.proxy(function (e) {
        this.play(e);
      }, this)
    );
  };

  /**
   * Default options.
   * @public
   */
  Video.Defaults = {
    video: false,
    videoHeight: false,
    videoWidth: false,
  };

  /**
   * Gets the video ID and the type (YouTube/Vimeo only).
   * @protected
   * @param {jQuery} target - The target containing the video data.
   * @param {jQuery} item - The item containing the video.
   */
  Video.prototype.fetch = function (target, item) {
    var type = target.attr("data-vimeo-id") ? "vimeo" : "youtube",
      id = target.attr("data-vimeo-id") || target.attr("data-youtube-id"),
      width = target.attr("data-width") || this._core.settings.videoWidth,
      height = target.attr("data-height") || this._core.settings.videoHeight,
      url = target.attr("href");

    if (url) {
      id = url.match(
        /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
      );

      if (id[3].indexOf("youtu") > -1) {
        type = "youtube";
      } else if (id[3].indexOf("vimeo") > -1) {
        type = "vimeo";
      } else {
        throw new Error("Video URL not supported.");
      }
      id = id[6];
    } else {
      throw new Error("Missing video URL.");
    }

    this._videos[url] = {
      type: type,
      id: id,
      width: width,
      height: height,
    };

    item.attr("data-video", url);

    this.thumbnail(target, this._videos[url]);
  };

  /**
   * Creates video thumbnail.
   * @protected
   * @param {jQuery} target - The target containing the video data.
   * @param {Object} info - The video info object.
   * @see `fetch`
   */
  Video.prototype.thumbnail = function (target, video) {
    var tnLink,
      icon,
      path,
      dimensions =
        video.width && video.height
          ? 'style="width:' + video.width + "px;height:" + video.height + 'px;"'
          : "",
      customTn = target.find("img"),
      srcType = "src",
      lazyClass = "",
      settings = this._core.settings,
      create = function (path) {
        icon = '<div class="owl-video-play-icon"></div>';

        if (settings.lazyLoad) {
          tnLink =
            '<div class="owl-video-tn ' +
            lazyClass +
            '" ' +
            srcType +
            '="' +
            path +
            '"></div>';
        } else {
          tnLink =
            '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
            path +
            ')"></div>';
        }
        target.after(tnLink);
        target.after(icon);
      };

    // wrap video content into owl-video-wrapper div
    target.wrap('<div class="owl-video-wrapper"' + dimensions + "></div>");

    if (this._core.settings.lazyLoad) {
      srcType = "data-src";
      lazyClass = "owl-lazy";
    }

    // custom thumbnail
    if (customTn.length) {
      create(customTn.attr(srcType));
      customTn.remove();
      return false;
    }

    if (video.type === "youtube") {
      path = "http://img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
      create(path);
    } else if (video.type === "vimeo") {
      $.ajax({
        type: "GET",
        url: "http://vimeo.com/api/v2/video/" + video.id + ".json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function (data) {
          path = data[0].thumbnail_large;
          create(path);
        },
      });
    }
  };

  /**
   * Stops the current video.
   * @public
   */
  Video.prototype.stop = function () {
    this._core.trigger("stop", null, "video");
    this._playing.find(".owl-video-frame").remove();
    this._playing.removeClass("owl-video-playing");
    this._playing = null;
  };

  /**
   * Starts the current video.
   * @public
   * @param {Event} ev - The event arguments.
   */
  Video.prototype.play = function (ev) {
    this._core.trigger("play", null, "video");

    if (this._playing) {
      this.stop();
    }

    var target = $(ev.target || ev.srcElement),
      item = target.closest("." + this._core.settings.itemClass),
      video = this._videos[item.attr("data-video")],
      width = video.width || "100%",
      height = video.height || this._core.$stage.height(),
      html,
      wrap;

    if (video.type === "youtube") {
      html =
        '<iframe width="' +
        width +
        '" height="' +
        height +
        '" src="http://www.youtube.com/embed/' +
        video.id +
        "?autoplay=1&v=" +
        video.id +
        '" frameborder="0" allowfullscreen></iframe>';
    } else if (video.type === "vimeo") {
      html =
        '<iframe src="http://player.vimeo.com/video/' +
        video.id +
        '?autoplay=1" width="' +
        width +
        '" height="' +
        height +
        '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    }

    item.addClass("owl-video-playing");
    this._playing = item;

    wrap = $(
      '<div style="height:' +
        height +
        "px; width:" +
        width +
        'px" class="owl-video-frame">' +
        html +
        "</div>"
    );
    target.after(wrap);
  };

  /**
   * Checks whether an video is currently in full screen mode or not.
   * @todo Bad style because looks like a readonly method but changes members.
   * @protected
   * @returns {Boolean}
   */
  Video.prototype.isInFullScreen = function () {
    // if Vimeo Fullscreen mode
    var element =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement;

    if (element && $(element).parent().hasClass("owl-video-frame")) {
      this._core.speed(0);
      this._fullscreen = true;
    }

    if (element && this._fullscreen && this._playing) {
      return false;
    }

    // comming back from fullscreen
    if (this._fullscreen) {
      this._fullscreen = false;
      return false;
    }

    // check full screen mode and window orientation
    if (this._playing) {
      if (this._core.state.orientation !== window.orientation) {
        this._core.state.orientation = window.orientation;
        return false;
      }
    }

    return true;
  };

  /**
   * Destroys the plugin.
   */
  Video.prototype.destroy = function () {
    var handler, property;

    this._core.$element.off("click.owl.video");

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != "function" && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Video = Video;
})(window.Zepto || window.jQuery, window, document);

/**
 * Animate Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  /**
   * Creates the animate plugin.
   * @class The Navigation Plugin
   * @param {Owl} scope - The Owl Carousel
   */
  var Animate = function (scope) {
    this.core = scope;
    this.core.options = $.extend({}, Animate.Defaults, this.core.options);
    this.swapping = true;
    this.previous = undefined;
    this.next = undefined;

    this.handlers = {
      "change.owl.carousel": $.proxy(function (e) {
        if (e.property.name == "position") {
          this.previous = this.core.current();
          this.next = e.property.value;
        }
      }, this),
      "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": $.proxy(
        function (e) {
          this.swapping = e.type == "translated";
        },
        this
      ),
      "translate.owl.carousel": $.proxy(function (e) {
        if (
          this.swapping &&
          (this.core.options.animateOut || this.core.options.animateIn)
        ) {
          this.swap();
        }
      }, this),
    };

    this.core.$element.on(this.handlers);
  };

  /**
   * Default options.
   * @public
   */
  Animate.Defaults = {
    animateOut: false,
    animateIn: false,
  };

  /**
   * Toggles the animation classes whenever an translations starts.
   * @protected
   * @returns {Boolean|undefined}
   */
  Animate.prototype.swap = function () {
    if (this.core.settings.items !== 1 || !this.core.support3d) {
      return;
    }

    this.core.speed(0);

    var left,
      clear = $.proxy(this.clear, this),
      previous = this.core.$stage.children().eq(this.previous),
      next = this.core.$stage.children().eq(this.next),
      incoming = this.core.settings.animateIn,
      outgoing = this.core.settings.animateOut;

    if (this.core.current() === this.previous) {
      return;
    }

    if (outgoing) {
      left =
        this.core.coordinates(this.previous) - this.core.coordinates(this.next);
      previous
        .css({
          left: left + "px",
        })
        .addClass("animated owl-animated-out")
        .addClass(outgoing)
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          clear
        );
    }

    if (incoming) {
      next
        .addClass("animated owl-animated-in")
        .addClass(incoming)
        .one(
          "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
          clear
        );
    }
  };

  Animate.prototype.clear = function (e) {
    $(e.target)
      .css({
        left: "",
      })
      .removeClass("animated owl-animated-out owl-animated-in")
      .removeClass(this.core.settings.animateIn)
      .removeClass(this.core.settings.animateOut);
    this.core.transitionEnd();
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Animate.prototype.destroy = function () {
    var handler, property;

    for (handler in this.handlers) {
      this.core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != "function" && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Animate = Animate;
})(window.Zepto || window.jQuery, window, document);

/**
 * Autoplay Plugin
 * @version 2.0.0
 * @author Bartosz Wojciechowski
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  /**
   * Creates the autoplay plugin.
   * @class The Autoplay Plugin
   * @param {Owl} scope - The Owl Carousel
   */
  var Autoplay = function (scope) {
    this.core = scope;
    this.core.options = $.extend({}, Autoplay.Defaults, this.core.options);

    this.handlers = {
      "translated.owl.carousel refreshed.owl.carousel": $.proxy(function () {
        this.autoplay();
      }, this),
      "play.owl.autoplay": $.proxy(function (e, t, s) {
        this.play(t, s);
      }, this),
      "stop.owl.autoplay": $.proxy(function () {
        this.stop();
      }, this),
      "mouseover.owl.autoplay": $.proxy(function () {
        if (this.core.settings.autoplayHoverPause) {
          this.pause();
        }
      }, this),
      "mouseleave.owl.autoplay": $.proxy(function () {
        if (this.core.settings.autoplayHoverPause) {
          this.autoplay();
        }
      }, this),
    };

    this.core.$element.on(this.handlers);
  };

  /**
   * Default options.
   * @public
   */
  Autoplay.Defaults = {
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    autoplaySpeed: false,
  };

  /**
   * @protected
   * @todo Must be documented.
   */
  Autoplay.prototype.autoplay = function () {
    if (this.core.settings.autoplay && !this.core.state.videoPlay) {
      window.clearInterval(this.interval);

      this.interval = window.setInterval(
        $.proxy(function () {
          this.play();
        }, this),
        this.core.settings.autoplayTimeout
      );
    } else {
      window.clearInterval(this.interval);
    }
  };

  /**
   * Starts the autoplay.
   * @public
   * @param {Number} [timeout] - ...
   * @param {Number} [speed] - ...
   * @returns {Boolean|undefined} - ...
   * @todo Must be documented.
   */
  Autoplay.prototype.play = function (timeout, speed) {
    // if tab is inactive - doesnt work in <IE10
    if (document.hidden === true) {
      return;
    }

    if (
      this.core.state.isTouch ||
      this.core.state.isScrolling ||
      this.core.state.isSwiping ||
      this.core.state.inMotion
    ) {
      return;
    }

    if (this.core.settings.autoplay === false) {
      window.clearInterval(this.interval);
      return;
    }

    this.core.next(this.core.settings.autoplaySpeed);
  };

  /**
   * Stops the autoplay.
   * @public
   */
  Autoplay.prototype.stop = function () {
    window.clearInterval(this.interval);
  };

  /**
   * Pauses the autoplay.
   * @public
   */
  Autoplay.prototype.pause = function () {
    window.clearInterval(this.interval);
  };

  /**
   * Destroys the plugin.
   */
  Autoplay.prototype.destroy = function () {
    var handler, property;

    window.clearInterval(this.interval);

    for (handler in this.handlers) {
      this.core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != "function" && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.autoplay = Autoplay;
})(window.Zepto || window.jQuery, window, document);

/**
 * Navigation Plugin
 * @version 2.0.0
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  "use strict";

  /**
   * Creates the navigation plugin.
   * @class The Navigation Plugin
   * @param {Owl} carousel - The Owl Carousel.
   */
  var Navigation = function (carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Indicates whether the plugin is initialized or not.
     * @protected
     * @type {Boolean}
     */
    this._initialized = false;

    /**
     * The current paging indexes.
     * @protected
     * @type {Array}
     */
    this._pages = [];

    /**
     * All DOM elements of the user interface.
     * @protected
     * @type {Object}
     */
    this._controls = {};

    /**
     * Markup for an indicator.
     * @protected
     * @type {Array.<String>}
     */
    this._templates = [];

    /**
     * The carousel element.
     * @type {jQuery}
     */
    this.$element = this._core.$element;

    /**
     * Overridden methods of the carousel.
     * @protected
     * @type {Object}
     */
    this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to,
    };

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      "prepared.owl.carousel": $.proxy(function (e) {
        if (this._core.settings.dotsData) {
          this._templates.push(
            $(e.content)
              .find("[data-dot]")
              .andSelf("[data-dot]")
              .attr("data-dot")
          );
        }
      }, this),
      "add.owl.carousel": $.proxy(function (e) {
        if (this._core.settings.dotsData) {
          this._templates.splice(
            e.position,
            0,
            $(e.content)
              .find("[data-dot]")
              .andSelf("[data-dot]")
              .attr("data-dot")
          );
        }
      }, this),
      "remove.owl.carousel prepared.owl.carousel": $.proxy(function (e) {
        if (this._core.settings.dotsData) {
          this._templates.splice(e.position, 1);
        }
      }, this),
      "change.owl.carousel": $.proxy(function (e) {
        if (e.property.name == "position") {
          if (
            !this._core.state.revert &&
            !this._core.settings.loop &&
            this._core.settings.navRewind
          ) {
            var current = this._core.current(),
              maximum = this._core.maximum(),
              minimum = this._core.minimum();
            e.data =
              e.property.value > maximum
                ? current >= maximum
                  ? minimum
                  : maximum
                : e.property.value < minimum
                ? maximum
                : e.property.value;
          }
        }
      }, this),
      "changed.owl.carousel": $.proxy(function (e) {
        if (e.property.name == "position") {
          this.draw();
        }
      }, this),
      "refreshed.owl.carousel": $.proxy(function () {
        if (!this._initialized) {
          this.initialize();
          this._initialized = true;
        }
        this._core.trigger("refresh", null, "navigation");
        this.update();
        this.draw();
        this._core.trigger("refreshed", null, "navigation");
      }, this),
    };

    // set default options
    this._core.options = $.extend({}, Navigation.Defaults, this._core.options);

    // register event handlers
    this.$element.on(this._handlers);
  };

  /**
   * Default options.
   * @public
   * @todo Rename `slideBy` to `navBy`
   */
  Navigation.Defaults = {
    nav: false,
    navRewind: true,
    navText: ["prev", "next"],
    navSpeed: false,
    navElement: "div",
    navContainer: false,
    navContainerClass: "owl-nav",
    navClass: ["owl-prev", "owl-next"],
    slideBy: 1,
    dotClass: "owl-dot",
    dotsClass: "owl-dots",
    dots: true,
    dotsEach: false,
    dotData: false,
    dotsSpeed: false,
    dotsContainer: false,
    controlsClass: "owl-controls",
  };

  /**
   * Initializes the layout of the plugin and extends the carousel.
   * @protected
   */
  Navigation.prototype.initialize = function () {
    var $container,
      override,
      options = this._core.settings;

    // create the indicator template
    if (!options.dotsData) {
      this._templates = [
        $("<div>")
          .addClass(options.dotClass)
          .append($("<span>"))
          .prop("outerHTML"),
      ];
    }

    // create controls container if needed
    if (!options.navContainer || !options.dotsContainer) {
      this._controls.$container = $("<div>")
        .addClass(options.controlsClass)
        .appendTo(this.$element);
    }

    // create DOM structure for absolute navigation
    this._controls.$indicators = options.dotsContainer
      ? $(options.dotsContainer)
      : $("<div>")
          .hide()
          .addClass(options.dotsClass)
          .appendTo(this._controls.$container);

    this._controls.$indicators.on(
      "click",
      "div",
      $.proxy(function (e) {
        var index = $(e.target).parent().is(this._controls.$indicators)
          ? $(e.target).index()
          : $(e.target).parent().index();

        e.preventDefault();

        this.to(index, options.dotsSpeed);
      }, this)
    );

    // create DOM structure for relative navigation
    $container = options.navContainer
      ? $(options.navContainer)
      : $("<div>")
          .addClass(options.navContainerClass)
          .prependTo(this._controls.$container);

    this._controls.$next = $("<" + options.navElement + ">");
    this._controls.$previous = this._controls.$next.clone();

    this._controls.$previous
      .addClass(options.navClass[0])
      .html(options.navText[0])
      .hide()
      .prependTo($container)
      .on(
        "click",
        $.proxy(function (e) {
          this.prev(options.navSpeed);
        }, this)
      );
    this._controls.$next
      .addClass(options.navClass[1])
      .html(options.navText[1])
      .hide()
      .appendTo($container)
      .on(
        "click",
        $.proxy(function (e) {
          this.next(options.navSpeed);
        }, this)
      );

    // override public methods of the carousel
    for (override in this._overrides) {
      this._core[override] = $.proxy(this[override], this);
    }
  };

  /**
   * Destroys the plugin.
   * @protected
   */
  Navigation.prototype.destroy = function () {
    var handler, control, property, override;

    for (handler in this._handlers) {
      this.$element.off(handler, this._handlers[handler]);
    }
    for (control in this._controls) {
      this._controls[control].remove();
    }
    for (override in this.overides) {
      this._core[override] = this._overrides[override];
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != "function" && (this[property] = null);
    }
  };

  /**
   * Updates the internal state.
   * @protected
   */
  Navigation.prototype.update = function () {
    var i,
      j,
      k,
      options = this._core.settings,
      lower = this._core.clones().length / 2,
      upper = lower + this._core.items().length,
      size =
        options.center || options.autoWidth || options.dotData
          ? 1
          : options.dotsEach || options.items;

    if (options.slideBy !== "page") {
      options.slideBy = Math.min(options.slideBy, options.items);
    }

    if (options.dots || options.slideBy == "page") {
      this._pages = [];

      for (i = lower, j = 0, k = 0; i < upper; i++) {
        if (j >= size || j === 0) {
          this._pages.push({
            start: i - lower,
            end: i - lower + size - 1,
          });
          (j = 0), ++k;
        }
        j += this._core.mergers(this._core.relative(i));
      }
    }
  };

  /**
   * Draws the user interface.
   * @todo The option `dotData` wont work.
   * @protected
   */
  Navigation.prototype.draw = function () {
    var difference,
      i,
      html = "",
      options = this._core.settings,
      $items = this._core.$stage.children(),
      index = this._core.relative(this._core.current());

    if (options.nav && !options.loop && !options.navRewind) {
      this._controls.$previous.toggleClass("disabled", index <= 0);
      this._controls.$next.toggleClass(
        "disabled",
        index >= this._core.maximum()
      );
    }

    this._controls.$previous.toggle(options.nav);
    this._controls.$next.toggle(options.nav);

    if (options.dots) {
      difference =
        this._pages.length - this._controls.$indicators.children().length;
      if (options.dotData && difference !== 0) {
        for (i = 0; i < this._controls.$indicators.children().length; i++) {
          html += this._templates[this._core.relative(i)];
        }
        this._controls.$indicators.html(html);
      } else if (difference > 0) {
        html = new Array(difference + 1).join(this._templates[0]);
        this._controls.$indicators.append(html);
      } else if (difference < 0) {
        this._controls.$indicators.children().slice(difference).remove();
      }

      this._controls.$indicators.find(".active").removeClass("active");
      this._controls.$indicators
        .children()
        .eq($.inArray(this.current(), this._pages))
        .addClass("active");
    }

    this._controls.$indicators.toggle(options.dots);
  };

  /**
   * Extends event data.
   * @protected
   * @param {Event} event - The event object which gets thrown.
   */
  Navigation.prototype.onTrigger = function (event) {
    var settings = this._core.settings;

    event.page = {
      index: $.inArray(this.current(), this._pages),
      count: this._pages.length,
      size:
        settings &&
        (settings.center || settings.autoWidth || settings.dotData
          ? 1
          : settings.dotsEach || settings.items),
    };
  };

  /**
   * Gets the current page position of the carousel.
   * @protected
   * @returns {Number}
   */
  Navigation.prototype.current = function () {
    var index = this._core.relative(this._core.current());
    return $.grep(this._pages, function (o) {
      return o.start <= index && o.end >= index;
    }).pop();
  };

  /**
   * Gets the current succesor/predecessor position.
   * @protected
   * @returns {Number}
   */
  Navigation.prototype.getPosition = function (successor) {
    var position,
      length,
      options = this._core.settings;

    if (options.slideBy == "page") {
      position = $.inArray(this.current(), this._pages);
      length = this._pages.length;
      successor ? ++position : --position;
      position = this._pages[((position % length) + length) % length].start;
    } else {
      position = this._core.relative(this._core.current());
      length = this._core.items().length;
      successor ? (position += options.slideBy) : (position -= options.slideBy);
    }
    return position;
  };

  /**
   * Slides to the next item or page.
   * @public
   * @param {Number} [speed=false] - The time in milliseconds for the transition.
   */
  Navigation.prototype.next = function (speed) {
    $.proxy(this._overrides.to, this._core)(this.getPosition(true), speed);
  };

  /**
   * Slides to the previous item or page.
   * @public
   * @param {Number} [speed=false] - The time in milliseconds for the transition.
   */
  Navigation.prototype.prev = function (speed) {
    $.proxy(this._overrides.to, this._core)(this.getPosition(false), speed);
  };

  /**
   * Slides to the specified item or page.
   * @public
   * @param {Number} position - The position of the item or page.
   * @param {Number} [speed] - The time in milliseconds for the transition.
   * @param {Boolean} [standard=false] - Whether to use the standard behaviour or not.
   */
  Navigation.prototype.to = function (position, speed, standard) {
    var length;

    if (!standard) {
      length = this._pages.length;
      $.proxy(this._overrides.to, this._core)(
        this._pages[((position % length) + length) % length].start,
        speed
      );
    } else {
      $.proxy(this._overrides.to, this._core)(position, speed);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Navigation = Navigation;
})(window.Zepto || window.jQuery, window, document);

/**
 * Hash Plugin
 * @version 2.0.0
 * @author Artus Kolanowski
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  "use strict";

  /**
   * Creates the hash plugin.
   * @class The Hash Plugin
   * @param {Owl} carousel - The Owl Carousel
   */
  var Hash = function (carousel) {
    /**
     * Reference to the core.
     * @protected
     * @type {Owl}
     */
    this._core = carousel;

    /**
     * Hash table for the hashes.
     * @protected
     * @type {Object}
     */
    this._hashes = {};

    /**
     * The carousel element.
     * @type {jQuery}
     */
    this.$element = this._core.$element;

    /**
     * All event handlers.
     * @protected
     * @type {Object}
     */
    this._handlers = {
      "initialized.owl.carousel": $.proxy(function () {
        if (this._core.settings.startPosition == "URLHash") {
          $(window).trigger("hashchange.owl.navigation");
        }
      }, this),
      "prepared.owl.carousel": $.proxy(function (e) {
        var hash = $(e.content)
          .find("[data-hash]")
          .andSelf("[data-hash]")
          .attr("data-hash");
        this._hashes[hash] = e.content;
      }, this),
    };

    // set default options
    this._core.options = $.extend({}, Hash.Defaults, this._core.options);

    // register the event handlers
    this.$element.on(this._handlers);

    // register event listener for hash navigation
    $(window).on(
      "hashchange.owl.navigation",
      $.proxy(function () {
        var hash = window.location.hash.substring(1),
          items = this._core.$stage.children(),
          position =
            (this._hashes[hash] && items.index(this._hashes[hash])) || 0;

        if (!hash) {
          return false;
        }

        this._core.to(position, false, true);
      }, this)
    );
  };

  /**
   * Default options.
   * @public
   */
  Hash.Defaults = {
    URLhashListener: false,
  };

  /**
   * Destroys the plugin.
   * @public
   */
  Hash.prototype.destroy = function () {
    var handler, property;

    $(window).off("hashchange.owl.navigation");

    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != "function" && (this[property] = null);
    }
  };

  $.fn.owlCarousel.Constructor.Plugins.Hash = Hash;
})(window.Zepto || window.jQuery, window, document); /*})'"*/ /*})'"*/
(function ($) {
  Drupal.behaviors.owlCarousel = {
    attach: function (context, settings) {
      var owl = $(
        "#widget_pager_bottom_property_gallery-block_m",
        context
      ).owlCarousel({
        items: 7,
        loop: false,
        //nav: true,
        navText: [
          '<span class="fa fa-chevron-left"></span>',
          '<span class="fa fa-chevron-right"></span>',
        ],
        pagination: false,
        margin: 10,
        //autoWidth:true,
        responsive: {
          // breakpoint from 0 up
          0: {
            items: 3,
            center: true,
          },
          // breakpoint from 480 up
          480: {
            items: 3,
          },
          // breakpoint from 768 up
          768: {
            items: 7,
          },
          970: {
            items: 7,
          },
        },
      });
    },
  };
})(jQuery); /*})'"*/ /*})'"*/
(function ($, Drupal, undefined) {
  Drupal.behaviors.MainPropertyOwl = {
    attach: function (context, settings) {
      var mainOwlBig = $(".property-main-owl:first .view-content:first"),
        mainOwlThumb = $(".property-gallery--small .view-content"),
        flag = false,
        duration = 300,
        relaLazyDict = {};

      var owlFullBg = $(mainOwlBig, context)
        .on("initialized.owl.carousel changed.owl.carousel", function (e) {
          if (!e.namespace) return;
          var carousel = e.relatedTarget;
          $("#owl-page").text(
            carousel.relative(carousel.current()) +
              1 +
              " of " +
              carousel.items().length
          );
        })
        .owlCarousel({
          items: 1,
          margin: 0,
          nav: true,
          navText: [
            '<div class="pe-7s-angle-left"></div>',
            '<div class="pe-7s-angle-right"></div>',
          ],
          responsive: {
            0: {
              smartSpeed: 250,
            },
            768: {
              smartSpeed: 750,
            },
          },
        })
        .on("changed.owl.carousel", function (e) {
          relaLazyUnload(e);
          relaLazyLoad(e);
          if (!flag) {
            flag = true;
            mainOwlThumb.trigger("to.owl.carousel", [
              e.item.index,
              duration,
              true,
            ]);
            flag = false;
          }
        });

      var owlThumbs = $(mainOwlThumb, context)
        .owlCarousel({
          items: 7,
          margin: 10,
          smartSpeed: 750,
        })
        .on("click", ".owl-item", function () {
          mainOwlBig.trigger("to.owl.carousel", [
            $(this).index(),
            duration,
            true,
          ]);
        })
        .on("changed.owl.carousel", function (e) {
          if (!flag) {
            flag = true;
            mainOwlBig.trigger("to.owl.carousel", [
              e.item.index,
              duration,
              true,
            ]);
            flag = false;
          }
        });

      $(
        'div[data="block-views-property-gallery-block-main-owl"]',
        context
      ).click(function () {
        var stageWidth = $(
          "#block-views-property-gallery-block-main-owl"
        ).width();

        var carouselMain = $(mainOwlBig).data("owlCarousel");
        carouselMain._width = stageWidth;
        carouselMain.invalidate("width");
        carouselMain.refresh();

        var carouselThumbs = $(mainOwlThumb).data("owlCarousel");
        carouselThumbs._width = stageWidth;
        carouselThumbs.invalidate("width");
        carouselThumbs.refresh();

        relaLazyInit(carouselMain);
      });

      $('a[data="block-views-property-gallery-block-main-owl"]', context).click(
        function () {
          var stageWidth = $(
            "#block-views-property-gallery-block-main-owl"
          ).width();

          var carouselMain = $(mainOwlBig).data("owlCarousel");
          carouselMain._width = stageWidth;
          carouselMain.invalidate("width");
          carouselMain.refresh();

          var carouselThumbs = $(mainOwlThumb).data("owlCarousel");
          carouselThumbs._width = stageWidth;
          carouselThumbs.invalidate("width");
          carouselThumbs.refresh();

          relaLazyInit(carouselMain);
        }
      );

      /**
       * Loads the first two images in the carousel on init
       */
      function relaLazyInit(e) {
        for (i = 0; i < 2; i++) {
          var owlItem = e._items[i];
          var owlImage = $(owlItem).find("img.owl-lazy");
          $(owlImage).attr("src", $(owlImage).attr("data-src"));
          $(owlImage).css("opacity", "1");
          relaLazyArrayPush(owlImage, i);
        }
      }

      /**
       * Unloads an image to save on physical memory
       */
      function relaLazyUnload(e) {
        if (e.item.index >= 2) {
          var nums = [-2, 2];
          for (i in nums) {
            var preIndex = e.item.index + nums[i];
            var owlItem = e.relatedTarget._items[preIndex];
            var owlImage = $(owlItem).find("img.owl-lazy");
            if ($(owlImage).attr("src")) {
              $(owlImage).removeAttr("src");
              relaLazyIncinerator(preIndex, e.item.index);
            }
          }
        }
      }

      /**
       * loads the image when it is one away
       */
      function relaLazyLoad(e) {
        if (e.item.index >= 1) {
          for (i = -1; i < 2; i++) {
            var owlItem = e.relatedTarget._items[e.item.index + i];
            var owlImage = $(owlItem).find("img.owl-lazy");
            if (!$(owlImage).attr("src")) {
              $(owlImage).attr("src", $(owlImage).attr("data-src"));
              $(owlImage).css("opacity", "1");
              relaLazyArrayPush(owlImage, e.item.index + i);
            }
          }
        }
      }

      /**
       * Moves the image element into an dictionary with its index being the key for
       * incineration later
       */
      function relaLazyArrayPush(el, indexKey) {
        relaLazyDict[indexKey] = el;
      }

      /**
       * incinerates any loaded photos out of range of carousel
       */
      function relaLazyIncinerator(indexKey, currentIndex) {
        delete relaLazyDict[indexKey];
        //the +1 is because it kept returning one less than there actually was
        var dictLength = Object.keys(relaLazyDict).length + 1;
        if (dictLength > 3) {
          for (i in relaLazyDict) {
            if (i > currentIndex + 1 || i < currentIndex - 1) {
              delete relaLazyDict[i];
            }
          }
        }
      }
    },
  };

  Drupal.behaviors.OwlinPage = {
    attach: function (context, settings) {
      if ($(".view-display-id-embed_owl_main").length > 0) {
        var owl = $(
          ".view-display-id-embed_owl_main .view-content",
          context
        ).owlCarousel({
          loop: false,
          items: 3,
          nav: true,
          margin: 20,
          navText: [
            '<span class="icon icon-arrow-67"></span>',
            '<span class="icon icon-arrow-68"></span>',
          ],
          pagination: false,
          video: true,
          responsive: {
            // breakpoint from 0 up
            0: {
              items: 1,
              margin: 20,

              center: true,
            },
            // breakpoint from 480 up
            480: {
              items: 2,
            },

            // breakpoint from 768 up
            768: {
              items: 3,
            },
          },
        });
      }
    },
  };

  Drupal.behaviors.OwlThemesSlider = {
    attach: function (context, settings) {
      var owlFullBg = $(
        ".owl-themes-slider .view-content",
        context
      ).owlCarousel({
        loop: true,
        items: 1,
        margin: 0,
        pagination: false,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 750,
        autoplayHoverPause: true,
      });
    },
  };

  Drupal.behaviors.RelazTestimonial = {
    attach: function (context, settings) {
      if ($("#aa-testimonials .view-content").length > 0) {
        var showNav = false;
        var target = "#aa-testimonials .view-content";
        if ($(target + " .views-row").length > 1) {
          showNav = true;
        }
        var owlOpenHouse = $(target, context).owlCarousel({
          items: 1,
          autoplay: true,
          smartSpeed: 1100,
          nav: showNav,
          loop: showNav,
          navText: [
            '<span class="icon icon-arrow-67"></span>',
            '<span class="icon icon-arrow-68"></span>',
          ],
          responsive: {
            // breakpoint from 0 up
            0: {
              nav: false,
            },
            // breakpoint from 480 up
            768: {
              nav: true,
            },
          },
        });
      }
    },
  };

  Drupal.behaviors.RelazOpenHouz = {
    attach: function (context, settings) {
      if ($(".open-house-slider .view-content").length > 0) {
        var showNav = false;
        var target = ".open-house-slider .view-content";
        if ($(target + " .views-row").length > 1) {
          showNav = true;
        }
        var owlOpenHouse = $(target, context).owlCarousel({
          items: 1,
          autoplay: true,
          smartSpeed: 750,
          nav: showNav,
          loop: showNav,
          navText: [
            '<span class="icon icon-arrow-67"></span>',
            '<span class="icon icon-arrow-68"></span>',
          ],
        });
      }
    },
  };

  Drupal.behaviors.RelazVOpenHouz = {
    attach: function (context, settings) {
      if ($(".voh-slider .view-content").length > 0) {
        var showNav = false;
        var target = ".voh-slider .view-content";
        if ($(target + " .views-row").length > 1) {
          showNav = true;
        }
        var owlOpenHouse = $(target, context).owlCarousel({
          items: 1,
          autoplay: true,
          smartSpeed: 750,
          nav: showNav,
          loop: showNav,
          navText: [
            '<span class="icon icon-arrow-67"></span>',
            '<span class="icon icon-arrow-68"></span>',
          ],
        });
      }
    },
  };
  Drupal.behaviors.RelazSwiperFullBG = {
    attach: function (context, settings) {
      var owlFullBg = $(".owl-fullbg .view-content", context).owlCarousel({
        loop: false,
        items: 1,
        // nav:true,
        margin: 0,
        //navText: ['<span class="icon icon-arrow-67"></span>', '<span class="icon icon-arrow-68"></span>' ],
        pagination: false,
      });

      var owlThumbs = $(".owl-thumbs .view-content", context).owlCarousel({
        loop: false,
        //items: 8,
        nav: true,
        margin: 10,
        stagePadding: 20,
        navText: [
          '<span class="icon icon-arrow-67"></span>',
          '<span class="icon icon-arrow-68"></span>',
        ],
        pagination: false,
        //autoWidth:true,
        responsiveClass: true,
        responsive: {
          // breakpoint from 0 up
          0: {
            items: 1,
            //stagePadding: 0,
            //autoWidth:true,
            loop: true,
            nav: false,
            center: true,
            touchDrag: true,
            mouseDrag: true,
          },
          // breakpoint from 480 up
          480: {
            items: 1,

            nav: true,
            //center:true,
            //stagePadding: 0,
            touchDrag: true,
            mouseDrag: true,
          },
          // breakpoint from 768 up
          768: {
            items: 6,
            //stagePadding:0,
            //touchDrag: false,
            // mouseDrag: false
          },
          // breakpoint from 768 up
          1200: {
            items: 8,
            // stagePadding:0,
            //touchDrag: false,
            //mouseDrag: false
          },
        },
      });

      $(".owl-thumbs").on("click", ".owl-item", function () {
        owlFullBg.trigger("to.owl.carousel", [$(this).index(), 500]);
        owlThumbs.trigger("next.owl.carousel", [500]);
      });

      var playerID =
        ".view-display-id-owl_embed_fullbg .views-field-field-property-video-url .field-content";

      function vimeoRescale() {
        var w = $(window).width() + 0,
          h = $(window).height() + 0;

        if (w / h > 16 / 9) {
          $(playerID)
            .width(w)
            .height((w / 16) * 9);
          $(playerID).css({
            left: "0px",
          });
        } else {
          $(playerID)
            .width((h / 9) * 16)
            .height(h);
          $(playerID).css({
            left: -($(playerID).outerWidth() - w) / 2,
          });
        }
      } // End viemo rescale
      $(window).on("load resize", function () {
        vimeoRescale();
      });
    },
  };

  Drupal.behaviors.EmbeddableSingleOwlCarousel = {
    attach: function (context, settings) {
      if ($(".property-plain-owl").length > 0) {
        $(".property-plain-owl .view-content").owlCarousel({
          items: 1,
          nav: true,
          navText: [
            '<div class="pe-7s-angle-left"></div>',
            '<div class="pe-7s-angle-right"></div>',
          ],
          lazyLoad: true,
          autoplay: true,
          autoplayHoverPause: true,
        });
      }
    },
  };

  Drupal.behaviors.EmbeddableCarousel = {
    attach: function (context, settings) {
      if ($(".embed-owl-carousel").length > 0) {
        $(".embed-owl-carousel .view-content").owlCarousel({
          items: 1,
          nav: true,
          navText: [
            '<div class="pe-7s-angle-left"></div>',
            '<div class="pe-7s-angle-right"></div>',
          ],
        });
      }
    },
  };

  Drupal.behaviors.logoCarousel = {
    attach: function (context, settings) {
      if ($(".view-display-id-pane_customer_logos").length > 0) {
        $(".view-display-id-pane_customer_logos .view-content ul").owlCarousel({
          items: 3,
          nav: false,
          autoplay: true,
          loop: true,
        });
      }
    },
  };

  Drupal.behaviors.floorplanGallery = {
    attach: function (context, settings) {
      if ($(".aview-display-id-embed_floorplan_gallery").length > 0) {
        $(".view-display-id-embed_floorplan_gallery .view-content").owlCarousel(
          {
            items: 2,

            nav: false,
            autoplay: false,
            autoWidth: true,
            loop: false,
            center: true,
            responsive: {
              // breakpoint from 0 up
              0: {
                items: 1,
                //stagePadding: 0,
                //autoWidth:true,
                loop: true,
                nav: false,
                center: true,
                touchDrag: true,
                mouseDrag: true,
              },

              // breakpoint from 768 up
              768: {
                items: 2,
              },
            },
          }
        );
      }
    },
  };

  Drupal.behaviors.PropertyPSPWthumbs = {
    attach: function (context, settings) {
      if ($("#pspw-gallery-thumbs").length > 0) {
        $("#pspw-gallery-thumbs .inner").owlCarousel({
          items: 8,
          nav: true,
          navText: [
            '<div class="icon-arrow-left"></div>',
            '<div class="icon-arrow-right"></div>',
          ],
          autoplay: false,
          loop: false,
          margin: 10,

          responsive: {
            0: {
              items: 4,
            },

            768: {
              items: 6,
            },
            1199: {
              items: 8,
            },
          },
        });
      }
    },
  };
})(jQuery, Drupal); /*})'"*/ /*})'"*/
/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery)
  throw new Error("Bootstrap's JavaScript requires jQuery");
+(function (a) {
  "use strict";
  var b = a.fn.jquery.split(" ")[0].split(".");
  if ((b[0] < 2 && b[1] < 9) || (1 == b[0] && 9 == b[1] && b[2] < 1))
    throw new Error(
      "Bootstrap's JavaScript requires jQuery version 1.9.1 or higher"
    );
})(jQuery),
  +(function (a) {
    "use strict";
    function b() {
      var a = document.createElement("bootstrap"),
        b = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        };
      for (var c in b) if (void 0 !== a.style[c]) return { end: b[c] };
      return !1;
    }
    (a.fn.emulateTransitionEnd = function (b) {
      var c = !1,
        d = this;
      a(this).one("bsTransitionEnd", function () {
        c = !0;
      });
      var e = function () {
        c || a(d).trigger(a.support.transition.end);
      };
      return setTimeout(e, b), this;
    }),
      a(function () {
        (a.support.transition = b()),
          a.support.transition &&
            (a.event.special.bsTransitionEnd = {
              bindType: a.support.transition.end,
              delegateType: a.support.transition.end,
              handle: function (b) {
                return a(b.target).is(this)
                  ? b.handleObj.handler.apply(this, arguments)
                  : void 0;
              },
            });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var c = a(this),
          e = c.data("bs.alert");
        e || c.data("bs.alert", (e = new d(this))),
          "string" == typeof b && e[b].call(c);
      });
    }
    var c = '[data-dismiss="alert"]',
      d = function (b) {
        a(b).on("click", c, this.close);
      };
    (d.VERSION = "3.3.4"),
      (d.TRANSITION_DURATION = 150),
      (d.prototype.close = function (b) {
        function c() {
          g.detach().trigger("closed.bs.alert").remove();
        }
        var e = a(this),
          f = e.attr("data-target");
        f || ((f = e.attr("href")), (f = f && f.replace(/.*(?=#[^\s]*$)/, "")));
        var g = a(f);
        b && b.preventDefault(),
          g.length || (g = e.closest(".alert")),
          g.trigger((b = a.Event("close.bs.alert"))),
          b.isDefaultPrevented() ||
            (g.removeClass("in"),
            a.support.transition && g.hasClass("fade")
              ? g
                  .one("bsTransitionEnd", c)
                  .emulateTransitionEnd(d.TRANSITION_DURATION)
              : c());
      });
    var e = a.fn.alert;
    (a.fn.alert = b),
      (a.fn.alert.Constructor = d),
      (a.fn.alert.noConflict = function () {
        return (a.fn.alert = e), this;
      }),
      a(document).on("click.bs.alert.data-api", c, d.prototype.close);
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.button"),
          f = "object" == typeof b && b;
        e || d.data("bs.button", (e = new c(this, f))),
          "toggle" == b ? e.toggle() : b && e.setState(b);
      });
    }
    var c = function (b, d) {
      (this.$element = a(b)),
        (this.options = a.extend({}, c.DEFAULTS, d)),
        (this.isLoading = !1);
    };
    (c.VERSION = "3.3.4"),
      (c.DEFAULTS = { loadingText: "loading..." }),
      (c.prototype.setState = function (b) {
        var c = "disabled",
          d = this.$element,
          e = d.is("input") ? "val" : "html",
          f = d.data();
        (b += "Text"),
          null == f.resetText && d.data("resetText", d[e]()),
          setTimeout(
            a.proxy(function () {
              d[e](null == f[b] ? this.options[b] : f[b]),
                "loadingText" == b
                  ? ((this.isLoading = !0), d.addClass(c).attr(c, c))
                  : this.isLoading &&
                    ((this.isLoading = !1), d.removeClass(c).removeAttr(c));
            }, this),
            0
          );
      }),
      (c.prototype.toggle = function () {
        var a = !0,
          b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
          var c = this.$element.find("input");
          "radio" == c.prop("type") &&
            (c.prop("checked") && this.$element.hasClass("active")
              ? (a = !1)
              : b.find(".active").removeClass("active")),
            a &&
              c
                .prop("checked", !this.$element.hasClass("active"))
                .trigger("change");
        } else
          this.$element.attr("aria-pressed", !this.$element.hasClass("active"));
        a && this.$element.toggleClass("active");
      });
    var d = a.fn.button;
    (a.fn.button = b),
      (a.fn.button.Constructor = c),
      (a.fn.button.noConflict = function () {
        return (a.fn.button = d), this;
      }),
      a(document)
        .on(
          "click.bs.button.data-api",
          '[data-toggle^="button"]',
          function (c) {
            var d = a(c.target);
            d.hasClass("btn") || (d = d.closest(".btn")),
              b.call(d, "toggle"),
              c.preventDefault();
          }
        )
        .on(
          "focus.bs.button.data-api blur.bs.button.data-api",
          '[data-toggle^="button"]',
          function (b) {
            a(b.target)
              .closest(".btn")
              .toggleClass("focus", /^focus(in)?$/.test(b.type));
          }
        );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.carousel"),
          f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
          g = "string" == typeof b ? b : f.slide;
        e || d.data("bs.carousel", (e = new c(this, f))),
          "number" == typeof b
            ? e.to(b)
            : g
            ? e[g]()
            : f.interval && e.pause().cycle();
      });
    }
    var c = function (b, c) {
      (this.$element = a(b)),
        (this.$indicators = this.$element.find(".carousel-indicators")),
        (this.options = c),
        (this.paused = null),
        (this.sliding = null),
        (this.interval = null),
        (this.$active = null),
        (this.$items = null),
        this.options.keyboard &&
          this.$element.on("keydown.bs.carousel", a.proxy(this.keydown, this)),
        "hover" == this.options.pause &&
          !("ontouchstart" in document.documentElement) &&
          this.$element
            .on("mouseenter.bs.carousel", a.proxy(this.pause, this))
            .on("mouseleave.bs.carousel", a.proxy(this.cycle, this));
    };
    (c.VERSION = "3.3.4"),
      (c.TRANSITION_DURATION = 600),
      (c.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }),
      (c.prototype.keydown = function (a) {
        if (!/input|textarea/i.test(a.target.tagName)) {
          switch (a.which) {
            case 37:
              this.prev();
              break;
            case 39:
              this.next();
              break;
            default:
              return;
          }
          a.preventDefault();
        }
      }),
      (c.prototype.cycle = function (b) {
        return (
          b || (this.paused = !1),
          this.interval && clearInterval(this.interval),
          this.options.interval &&
            !this.paused &&
            (this.interval = setInterval(
              a.proxy(this.next, this),
              this.options.interval
            )),
          this
        );
      }),
      (c.prototype.getItemIndex = function (a) {
        return (
          (this.$items = a.parent().children(".item")),
          this.$items.index(a || this.$active)
        );
      }),
      (c.prototype.getItemForDirection = function (a, b) {
        var c = this.getItemIndex(b),
          d =
            ("prev" == a && 0 === c) ||
            ("next" == a && c == this.$items.length - 1);
        if (d && !this.options.wrap) return b;
        var e = "prev" == a ? -1 : 1,
          f = (c + e) % this.$items.length;
        return this.$items.eq(f);
      }),
      (c.prototype.to = function (a) {
        var b = this,
          c = this.getItemIndex(
            (this.$active = this.$element.find(".item.active"))
          );
        return a > this.$items.length - 1 || 0 > a
          ? void 0
          : this.sliding
          ? this.$element.one("slid.bs.carousel", function () {
              b.to(a);
            })
          : c == a
          ? this.pause().cycle()
          : this.slide(a > c ? "next" : "prev", this.$items.eq(a));
      }),
      (c.prototype.pause = function (b) {
        return (
          b || (this.paused = !0),
          this.$element.find(".next, .prev").length &&
            a.support.transition &&
            (this.$element.trigger(a.support.transition.end), this.cycle(!0)),
          (this.interval = clearInterval(this.interval)),
          this
        );
      }),
      (c.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next");
      }),
      (c.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev");
      }),
      (c.prototype.slide = function (b, d) {
        var e = this.$element.find(".item.active"),
          f = d || this.getItemForDirection(b, e),
          g = this.interval,
          h = "next" == b ? "left" : "right",
          i = this;
        if (f.hasClass("active")) return (this.sliding = !1);
        var j = f[0],
          k = a.Event("slide.bs.carousel", { relatedTarget: j, direction: h });
        if ((this.$element.trigger(k), !k.isDefaultPrevented())) {
          if (
            ((this.sliding = !0), g && this.pause(), this.$indicators.length)
          ) {
            this.$indicators.find(".active").removeClass("active");
            var l = a(this.$indicators.children()[this.getItemIndex(f)]);
            l && l.addClass("active");
          }
          var m = a.Event("slid.bs.carousel", {
            relatedTarget: j,
            direction: h,
          });
          return (
            a.support.transition && this.$element.hasClass("slide")
              ? (f.addClass(b),
                f[0].offsetWidth,
                e.addClass(h),
                f.addClass(h),
                e
                  .one("bsTransitionEnd", function () {
                    f.removeClass([b, h].join(" ")).addClass("active"),
                      e.removeClass(["active", h].join(" ")),
                      (i.sliding = !1),
                      setTimeout(function () {
                        i.$element.trigger(m);
                      }, 0);
                  })
                  .emulateTransitionEnd(c.TRANSITION_DURATION))
              : (e.removeClass("active"),
                f.addClass("active"),
                (this.sliding = !1),
                this.$element.trigger(m)),
            g && this.cycle(),
            this
          );
        }
      });
    var d = a.fn.carousel;
    (a.fn.carousel = b),
      (a.fn.carousel.Constructor = c),
      (a.fn.carousel.noConflict = function () {
        return (a.fn.carousel = d), this;
      });
    var e = function (c) {
      var d,
        e = a(this),
        f = a(
          e.attr("data-target") ||
            ((d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""))
        );
      if (f.hasClass("carousel")) {
        var g = a.extend({}, f.data(), e.data()),
          h = e.attr("data-slide-to");
        h && (g.interval = !1),
          b.call(f, g),
          h && f.data("bs.carousel").to(h),
          c.preventDefault();
      }
    };
    a(document)
      .on("click.bs.carousel.data-api", "[data-slide]", e)
      .on("click.bs.carousel.data-api", "[data-slide-to]", e),
      a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
          var c = a(this);
          b.call(c, c.data());
        });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      var c,
        d =
          b.attr("data-target") ||
          ((c = b.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""));
      return a(d);
    }
    function c(b) {
      return this.each(function () {
        var c = a(this),
          e = c.data("bs.collapse"),
          f = a.extend({}, d.DEFAULTS, c.data(), "object" == typeof b && b);
        !e && f.toggle && /show|hide/.test(b) && (f.toggle = !1),
          e || c.data("bs.collapse", (e = new d(this, f))),
          "string" == typeof b && e[b]();
      });
    }
    var d = function (b, c) {
      (this.$element = a(b)),
        (this.options = a.extend({}, d.DEFAULTS, c)),
        (this.$trigger = a(
          '[data-toggle="collapse"][href="#' +
            b.id +
            '"],[data-toggle="collapse"][data-target="#' +
            b.id +
            '"]'
        )),
        (this.transitioning = null),
        this.options.parent
          ? (this.$parent = this.getParent())
          : this.addAriaAndCollapsedClass(this.$element, this.$trigger),
        this.options.toggle && this.toggle();
    };
    (d.VERSION = "3.3.4"),
      (d.TRANSITION_DURATION = 350),
      (d.DEFAULTS = { toggle: !0 }),
      (d.prototype.dimension = function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
      }),
      (d.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
          var b,
            e =
              this.$parent &&
              this.$parent.children(".panel").children(".in, .collapsing");
          if (
            !(
              e &&
              e.length &&
              ((b = e.data("bs.collapse")), b && b.transitioning)
            )
          ) {
            var f = a.Event("show.bs.collapse");
            if ((this.$element.trigger(f), !f.isDefaultPrevented())) {
              e &&
                e.length &&
                (c.call(e, "hide"), b || e.data("bs.collapse", null));
              var g = this.dimension();
              this.$element
                .removeClass("collapse")
                .addClass("collapsing")
                [g](0)
                .attr("aria-expanded", !0),
                this.$trigger
                  .removeClass("collapsed")
                  .attr("aria-expanded", !0),
                (this.transitioning = 1);
              var h = function () {
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse in")
                  [g](""),
                  (this.transitioning = 0),
                  this.$element.trigger("shown.bs.collapse");
              };
              if (!a.support.transition) return h.call(this);
              var i = a.camelCase(["scroll", g].join("-"));
              this.$element
                .one("bsTransitionEnd", a.proxy(h, this))
                .emulateTransitionEnd(d.TRANSITION_DURATION)
                [g](this.$element[0][i]);
            }
          }
        }
      }),
      (d.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
          var b = a.Event("hide.bs.collapse");
          if ((this.$element.trigger(b), !b.isDefaultPrevented())) {
            var c = this.dimension();
            this.$element[c](this.$element[c]())[0].offsetHeight,
              this.$element
                .addClass("collapsing")
                .removeClass("collapse in")
                .attr("aria-expanded", !1),
              this.$trigger.addClass("collapsed").attr("aria-expanded", !1),
              (this.transitioning = 1);
            var e = function () {
              (this.transitioning = 0),
                this.$element
                  .removeClass("collapsing")
                  .addClass("collapse")
                  .trigger("hidden.bs.collapse");
            };
            return a.support.transition
              ? void this.$element[c](0)
                  .one("bsTransitionEnd", a.proxy(e, this))
                  .emulateTransitionEnd(d.TRANSITION_DURATION)
              : e.call(this);
          }
        }
      }),
      (d.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
      }),
      (d.prototype.getParent = function () {
        return a(this.options.parent)
          .find(
            '[data-toggle="collapse"][data-parent="' +
              this.options.parent +
              '"]'
          )
          .each(
            a.proxy(function (c, d) {
              var e = a(d);
              this.addAriaAndCollapsedClass(b(e), e);
            }, this)
          )
          .end();
      }),
      (d.prototype.addAriaAndCollapsedClass = function (a, b) {
        var c = a.hasClass("in");
        a.attr("aria-expanded", c),
          b.toggleClass("collapsed", !c).attr("aria-expanded", c);
      });
    var e = a.fn.collapse;
    (a.fn.collapse = c),
      (a.fn.collapse.Constructor = d),
      (a.fn.collapse.noConflict = function () {
        return (a.fn.collapse = e), this;
      }),
      a(document).on(
        "click.bs.collapse.data-api",
        '[data-toggle="collapse"]',
        function (d) {
          var e = a(this);
          e.attr("data-target") || d.preventDefault();
          var f = b(e),
            g = f.data("bs.collapse"),
            h = g ? "toggle" : e.data();
          c.call(f, h);
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      (b && 3 === b.which) ||
        (a(e).remove(),
        a(f).each(function () {
          var d = a(this),
            e = c(d),
            f = { relatedTarget: this };
          e.hasClass("open") &&
            (e.trigger((b = a.Event("hide.bs.dropdown", f))),
            b.isDefaultPrevented() ||
              (d.attr("aria-expanded", "false"),
              e.removeClass("open").trigger("hidden.bs.dropdown", f)));
        }));
    }
    function c(b) {
      var c = b.attr("data-target");
      c ||
        ((c = b.attr("href")),
        (c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, "")));
      var d = c && a(c);
      return d && d.length ? d : b.parent();
    }
    function d(b) {
      return this.each(function () {
        var c = a(this),
          d = c.data("bs.dropdown");
        d || c.data("bs.dropdown", (d = new g(this))),
          "string" == typeof b && d[b].call(c);
      });
    }
    var e = ".dropdown-backdrop",
      f = '[data-toggle="dropdown"]',
      g = function (b) {
        a(b).on("click.bs.dropdown", this.toggle);
      };
    (g.VERSION = "3.3.4"),
      (g.prototype.toggle = function (d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
          var f = c(e),
            g = f.hasClass("open");
          if ((b(), !g)) {
            "ontouchstart" in document.documentElement &&
              !f.closest(".navbar-nav").length &&
              a('<div class="dropdown-backdrop"/>')
                .insertAfter(a(this))
                .on("click", b);
            var h = { relatedTarget: this };
            if (
              (f.trigger((d = a.Event("show.bs.dropdown", h))),
              d.isDefaultPrevented())
            )
              return;
            e.trigger("focus").attr("aria-expanded", "true"),
              f.toggleClass("open").trigger("shown.bs.dropdown", h);
          }
          return !1;
        }
      }),
      (g.prototype.keydown = function (b) {
        if (
          /(38|40|27|32)/.test(b.which) &&
          !/input|textarea/i.test(b.target.tagName)
        ) {
          var d = a(this);
          if (
            (b.preventDefault(),
            b.stopPropagation(),
            !d.is(".disabled, :disabled"))
          ) {
            var e = c(d),
              g = e.hasClass("open");
            if ((!g && 27 != b.which) || (g && 27 == b.which))
              return (
                27 == b.which && e.find(f).trigger("focus"), d.trigger("click")
              );
            var h = " li:not(.disabled):visible a",
              i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
            if (i.length) {
              var j = i.index(b.target);
              38 == b.which && j > 0 && j--,
                40 == b.which && j < i.length - 1 && j++,
                ~j || (j = 0),
                i.eq(j).trigger("focus");
            }
          }
        }
      });
    var h = a.fn.dropdown;
    (a.fn.dropdown = d),
      (a.fn.dropdown.Constructor = g),
      (a.fn.dropdown.noConflict = function () {
        return (a.fn.dropdown = h), this;
      }),
      a(document)
        .on("click.bs.dropdown.data-api", b)
        .on("click.bs.dropdown.data-api", ".dropdown form", function (a) {
          a.stopPropagation();
        })
        .on("click.bs.dropdown.data-api", f, g.prototype.toggle)
        .on("keydown.bs.dropdown.data-api", f, g.prototype.keydown)
        .on(
          "keydown.bs.dropdown.data-api",
          '[role="menu"]',
          g.prototype.keydown
        )
        .on(
          "keydown.bs.dropdown.data-api",
          '[role="listbox"]',
          g.prototype.keydown
        );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b, d) {
      return this.each(function () {
        var e = a(this),
          f = e.data("bs.modal"),
          g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
        f || e.data("bs.modal", (f = new c(this, g))),
          "string" == typeof b ? f[b](d) : g.show && f.show(d);
      });
    }
    var c = function (b, c) {
      (this.options = c),
        (this.$body = a(document.body)),
        (this.$element = a(b)),
        (this.$dialog = this.$element.find(".modal-dialog")),
        (this.$backdrop = null),
        (this.isShown = null),
        (this.originalBodyPad = null),
        (this.scrollbarWidth = 0),
        (this.ignoreBackdropClick = !1),
        this.options.remote &&
          this.$element.find(".modal-content").load(
            this.options.remote,
            a.proxy(function () {
              this.$element.trigger("loaded.bs.modal");
            }, this)
          );
    };
    (c.VERSION = "3.3.4"),
      (c.TRANSITION_DURATION = 300),
      (c.BACKDROP_TRANSITION_DURATION = 150),
      (c.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }),
      (c.prototype.toggle = function (a) {
        return this.isShown ? this.hide() : this.show(a);
      }),
      (c.prototype.show = function (b) {
        var d = this,
          e = a.Event("show.bs.modal", { relatedTarget: b });
        this.$element.trigger(e),
          this.isShown ||
            e.isDefaultPrevented() ||
            ((this.isShown = !0),
            this.checkScrollbar(),
            this.setScrollbar(),
            this.$body.addClass("modal-open"),
            this.escape(),
            this.resize(),
            this.$element.on(
              "click.dismiss.bs.modal",
              '[data-dismiss="modal"]',
              a.proxy(this.hide, this)
            ),
            this.$dialog.on("mousedown.dismiss.bs.modal", function () {
              d.$element.one("mouseup.dismiss.bs.modal", function (b) {
                a(b.target).is(d.$element) && (d.ignoreBackdropClick = !0);
              });
            }),
            this.backdrop(function () {
              var e = a.support.transition && d.$element.hasClass("fade");
              d.$element.parent().length || d.$element.appendTo(d.$body),
                d.$element.show().scrollTop(0),
                d.adjustDialog(),
                e && d.$element[0].offsetWidth,
                d.$element.addClass("in").attr("aria-hidden", !1),
                d.enforceFocus();
              var f = a.Event("shown.bs.modal", { relatedTarget: b });
              e
                ? d.$dialog
                    .one("bsTransitionEnd", function () {
                      d.$element.trigger("focus").trigger(f);
                    })
                    .emulateTransitionEnd(c.TRANSITION_DURATION)
                : d.$element.trigger("focus").trigger(f);
            }));
      }),
      (c.prototype.hide = function (b) {
        b && b.preventDefault(),
          (b = a.Event("hide.bs.modal")),
          this.$element.trigger(b),
          this.isShown &&
            !b.isDefaultPrevented() &&
            ((this.isShown = !1),
            this.escape(),
            this.resize(),
            a(document).off("focusin.bs.modal"),
            this.$element
              .removeClass("in")
              .attr("aria-hidden", !0)
              .off("click.dismiss.bs.modal")
              .off("mouseup.dismiss.bs.modal"),
            this.$dialog.off("mousedown.dismiss.bs.modal"),
            a.support.transition && this.$element.hasClass("fade")
              ? this.$element
                  .one("bsTransitionEnd", a.proxy(this.hideModal, this))
                  .emulateTransitionEnd(c.TRANSITION_DURATION)
              : this.hideModal());
      }),
      (c.prototype.enforceFocus = function () {
        a(document)
          .off("focusin.bs.modal")
          .on(
            "focusin.bs.modal",
            a.proxy(function (a) {
              this.$element[0] === a.target ||
                this.$element.has(a.target).length ||
                this.$element.trigger("focus");
            }, this)
          );
      }),
      (c.prototype.escape = function () {
        this.isShown && this.options.keyboard
          ? this.$element.on(
              "keydown.dismiss.bs.modal",
              a.proxy(function (a) {
                27 == a.which && this.hide();
              }, this)
            )
          : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
      }),
      (c.prototype.resize = function () {
        this.isShown
          ? a(window).on("resize.bs.modal", a.proxy(this.handleUpdate, this))
          : a(window).off("resize.bs.modal");
      }),
      (c.prototype.hideModal = function () {
        var a = this;
        this.$element.hide(),
          this.backdrop(function () {
            a.$body.removeClass("modal-open"),
              a.resetAdjustments(),
              a.resetScrollbar(),
              a.$element.trigger("hidden.bs.modal");
          });
      }),
      (c.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), (this.$backdrop = null);
      }),
      (c.prototype.backdrop = function (b) {
        var d = this,
          e = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
          var f = a.support.transition && e;
          if (
            ((this.$backdrop = a(
              '<div class="modal-backdrop ' + e + '" />'
            ).appendTo(this.$body)),
            this.$element.on(
              "click.dismiss.bs.modal",
              a.proxy(function (a) {
                return this.ignoreBackdropClick
                  ? void (this.ignoreBackdropClick = !1)
                  : void (
                      a.target === a.currentTarget &&
                      ("static" == this.options.backdrop
                        ? this.$element[0].focus()
                        : this.hide())
                    );
              }, this)
            ),
            f && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !b)
          )
            return;
          f
            ? this.$backdrop
                .one("bsTransitionEnd", b)
                .emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION)
            : b();
        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass("in");
          var g = function () {
            d.removeBackdrop(), b && b();
          };
          a.support.transition && this.$element.hasClass("fade")
            ? this.$backdrop
                .one("bsTransitionEnd", g)
                .emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION)
            : g();
        } else b && b();
      }),
      (c.prototype.handleUpdate = function () {
        this.adjustDialog();
      }),
      (c.prototype.adjustDialog = function () {
        var a =
          this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
          paddingLeft: !this.bodyIsOverflowing && a ? this.scrollbarWidth : "",
          paddingRight: this.bodyIsOverflowing && !a ? this.scrollbarWidth : "",
        });
      }),
      (c.prototype.resetAdjustments = function () {
        this.$element.css({ paddingLeft: "", paddingRight: "" });
      }),
      (c.prototype.checkScrollbar = function () {
        var a = window.innerWidth;
        if (!a) {
          var b = document.documentElement.getBoundingClientRect();
          a = b.right - Math.abs(b.left);
        }
        (this.bodyIsOverflowing = document.body.clientWidth < a),
          (this.scrollbarWidth = this.measureScrollbar());
      }),
      (c.prototype.setScrollbar = function () {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        (this.originalBodyPad = document.body.style.paddingRight || ""),
          this.bodyIsOverflowing &&
            this.$body.css("padding-right", a + this.scrollbarWidth);
      }),
      (c.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad);
      }),
      (c.prototype.measureScrollbar = function () {
        var a = document.createElement("div");
        (a.className = "modal-scrollbar-measure"), this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b;
      });
    var d = a.fn.modal;
    (a.fn.modal = b),
      (a.fn.modal.Constructor = c),
      (a.fn.modal.noConflict = function () {
        return (a.fn.modal = d), this;
      }),
      a(document).on(
        "click.bs.modal.data-api",
        '[data-toggle="modal"]',
        function (c) {
          var d = a(this),
            e = d.attr("href"),
            f = a(
              d.attr("data-target") || (e && e.replace(/.*(?=#[^\s]+$)/, ""))
            ),
            g = f.data("bs.modal")
              ? "toggle"
              : a.extend({ remote: !/#/.test(e) && e }, f.data(), d.data());
          d.is("a") && c.preventDefault(),
            f.one("show.bs.modal", function (a) {
              a.isDefaultPrevented() ||
                f.one("hidden.bs.modal", function () {
                  d.is(":visible") && d.trigger("focus");
                });
            }),
            b.call(f, g, this);
        }
      );
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.tooltip"),
          f = "object" == typeof b && b;
        (e || !/destroy|hide/.test(b)) &&
          (e || d.data("bs.tooltip", (e = new c(this, f))),
          "string" == typeof b && e[b]());
      });
    }
    var c = function (a, b) {
      (this.type = null),
        (this.options = null),
        (this.enabled = null),
        (this.timeout = null),
        (this.hoverState = null),
        (this.$element = null),
        this.init("tooltip", a, b);
    };
    (c.VERSION = "3.3.4"),
      (c.TRANSITION_DURATION = 150),
      (c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template:
          '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: { selector: "body", padding: 0 },
      }),
      (c.prototype.init = function (b, c, d) {
        if (
          ((this.enabled = !0),
          (this.type = b),
          (this.$element = a(c)),
          (this.options = this.getOptions(d)),
          (this.$viewport =
            this.options.viewport &&
            a(this.options.viewport.selector || this.options.viewport)),
          this.$element[0] instanceof document.constructor &&
            !this.options.selector)
        )
          throw new Error(
            "`selector` option must be specified when initializing " +
              this.type +
              " on the window.document object!"
          );
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
          var g = e[f];
          if ("click" == g)
            this.$element.on(
              "click." + this.type,
              this.options.selector,
              a.proxy(this.toggle, this)
            );
          else if ("manual" != g) {
            var h = "hover" == g ? "mouseenter" : "focusin",
              i = "hover" == g ? "mouseleave" : "focusout";
            this.$element.on(
              h + "." + this.type,
              this.options.selector,
              a.proxy(this.enter, this)
            ),
              this.$element.on(
                i + "." + this.type,
                this.options.selector,
                a.proxy(this.leave, this)
              );
          }
        }
        this.options.selector
          ? (this._options = a.extend({}, this.options, {
              trigger: "manual",
              selector: "",
            }))
          : this.fixTitle();
      }),
      (c.prototype.getDefaults = function () {
        return c.DEFAULTS;
      }),
      (c.prototype.getOptions = function (b) {
        return (
          (b = a.extend({}, this.getDefaults(), this.$element.data(), b)),
          b.delay &&
            "number" == typeof b.delay &&
            (b.delay = { show: b.delay, hide: b.delay }),
          b
        );
      }),
      (c.prototype.getDelegateOptions = function () {
        var b = {},
          c = this.getDefaults();
        return (
          this._options &&
            a.each(this._options, function (a, d) {
              c[a] != d && (b[a] = d);
            }),
          b
        );
      }),
      (c.prototype.enter = function (b) {
        var c =
          b instanceof this.constructor
            ? b
            : a(b.currentTarget).data("bs." + this.type);
        return c && c.$tip && c.$tip.is(":visible")
          ? void (c.hoverState = "in")
          : (c ||
              ((c = new this.constructor(
                b.currentTarget,
                this.getDelegateOptions()
              )),
              a(b.currentTarget).data("bs." + this.type, c)),
            clearTimeout(c.timeout),
            (c.hoverState = "in"),
            c.options.delay && c.options.delay.show
              ? void (c.timeout = setTimeout(function () {
                  "in" == c.hoverState && c.show();
                }, c.options.delay.show))
              : c.show());
      }),
      (c.prototype.leave = function (b) {
        var c =
          b instanceof this.constructor
            ? b
            : a(b.currentTarget).data("bs." + this.type);
        return (
          c ||
            ((c = new this.constructor(
              b.currentTarget,
              this.getDelegateOptions()
            )),
            a(b.currentTarget).data("bs." + this.type, c)),
          clearTimeout(c.timeout),
          (c.hoverState = "out"),
          c.options.delay && c.options.delay.hide
            ? void (c.timeout = setTimeout(function () {
                "out" == c.hoverState && c.hide();
              }, c.options.delay.hide))
            : c.hide()
        );
      }),
      (c.prototype.show = function () {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
          this.$element.trigger(b);
          var d = a.contains(
            this.$element[0].ownerDocument.documentElement,
            this.$element[0]
          );
          if (b.isDefaultPrevented() || !d) return;
          var e = this,
            f = this.tip(),
            g = this.getUID(this.type);
          this.setContent(),
            f.attr("id", g),
            this.$element.attr("aria-describedby", g),
            this.options.animation && f.addClass("fade");
          var h =
              "function" == typeof this.options.placement
                ? this.options.placement.call(this, f[0], this.$element[0])
                : this.options.placement,
            i = /\s?auto?\s?/i,
            j = i.test(h);
          j && (h = h.replace(i, "") || "top"),
            f
              .detach()
              .css({ top: 0, left: 0, display: "block" })
              .addClass(h)
              .data("bs." + this.type, this),
            this.options.container
              ? f.appendTo(this.options.container)
              : f.insertAfter(this.$element);
          var k = this.getPosition(),
            l = f[0].offsetWidth,
            m = f[0].offsetHeight;
          if (j) {
            var n = h,
              o = this.options.container
                ? a(this.options.container)
                : this.$element.parent(),
              p = this.getPosition(o);
            (h =
              "bottom" == h && k.bottom + m > p.bottom
                ? "top"
                : "top" == h && k.top - m < p.top
                ? "bottom"
                : "right" == h && k.right + l > p.width
                ? "left"
                : "left" == h && k.left - l < p.left
                ? "right"
                : h),
              f.removeClass(n).addClass(h);
          }
          var q = this.getCalculatedOffset(h, k, l, m);
          this.applyPlacement(q, h);
          var r = function () {
            var a = e.hoverState;
            e.$element.trigger("shown.bs." + e.type),
              (e.hoverState = null),
              "out" == a && e.leave(e);
          };
          a.support.transition && this.$tip.hasClass("fade")
            ? f
                .one("bsTransitionEnd", r)
                .emulateTransitionEnd(c.TRANSITION_DURATION)
            : r();
        }
      }),
      (c.prototype.applyPlacement = function (b, c) {
        var d = this.tip(),
          e = d[0].offsetWidth,
          f = d[0].offsetHeight,
          g = parseInt(d.css("margin-top"), 10),
          h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0),
          isNaN(h) && (h = 0),
          (b.top = b.top + g),
          (b.left = b.left + h),
          a.offset.setOffset(
            d[0],
            a.extend(
              {
                using: function (a) {
                  d.css({ top: Math.round(a.top), left: Math.round(a.left) });
                },
              },
              b
            ),
            0
          ),
          d.addClass("in");
        var i = d[0].offsetWidth,
          j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? (b.left += k.left) : (b.top += k.top);
        var l = /top|bottom/.test(c),
          m = l ? 2 * k.left - e + i : 2 * k.top - f + j,
          n = l ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(m, d[0][n], l);
      }),
      (c.prototype.replaceArrow = function (a, b, c) {
        this.arrow()
          .css(c ? "left" : "top", 50 * (1 - a / b) + "%")
          .css(c ? "top" : "left", "");
      }),
      (c.prototype.setContent = function () {
        var a = this.tip(),
          b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b),
          a.removeClass("fade in top bottom left right");
      }),
      (c.prototype.hide = function (b) {
        function d() {
          "in" != e.hoverState && f.detach(),
            e.$element
              .removeAttr("aria-describedby")
              .trigger("hidden.bs." + e.type),
            b && b();
        }
        var e = this,
          f = a(this.$tip),
          g = a.Event("hide.bs." + this.type);
        return (
          this.$element.trigger(g),
          g.isDefaultPrevented()
            ? void 0
            : (f.removeClass("in"),
              a.support.transition && f.hasClass("fade")
                ? f
                    .one("bsTransitionEnd", d)
                    .emulateTransitionEnd(c.TRANSITION_DURATION)
                : d(),
              (this.hoverState = null),
              this)
        );
      }),
      (c.prototype.fixTitle = function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) &&
          a
            .attr("data-original-title", a.attr("title") || "")
            .attr("title", "");
      }),
      (c.prototype.hasContent = function () {
        return this.getTitle();
      }),
      (c.prototype.getPosition = function (b) {
        b = b || this.$element;
        var c = b[0],
          d = "BODY" == c.tagName,
          e = c.getBoundingClientRect();
        null == e.width &&
          (e = a.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top,
          }));
        var f = d ? { top: 0, left: 0 } : b.offset(),
          g = {
            scroll: d
              ? document.documentElement.scrollTop || document.body.scrollTop
              : b.scrollTop(),
          },
          h = d
            ? { width: a(window).width(), height: a(window).height() }
            : null;
        return a.extend({}, e, g, h, f);
      }),
      (c.prototype.getCalculatedOffset = function (a, b, c, d) {
        return "bottom" == a
          ? { top: b.top + b.height, left: b.left + b.width / 2 - c / 2 }
          : "top" == a
          ? { top: b.top - d, left: b.left + b.width / 2 - c / 2 }
          : "left" == a
          ? { top: b.top + b.height / 2 - d / 2, left: b.left - c }
          : { top: b.top + b.height / 2 - d / 2, left: b.left + b.width };
      }),
      (c.prototype.getViewportAdjustedDelta = function (a, b, c, d) {
        var e = { top: 0, left: 0 };
        if (!this.$viewport) return e;
        var f = (this.options.viewport && this.options.viewport.padding) || 0,
          g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
          var h = b.top - f - g.scroll,
            i = b.top + f - g.scroll + d;
          h < g.top
            ? (e.top = g.top - h)
            : i > g.top + g.height && (e.top = g.top + g.height - i);
        } else {
          var j = b.left - f,
            k = b.left + f + c;
          j < g.left
            ? (e.left = g.left - j)
            : k > g.width && (e.left = g.left + g.width - k);
        }
        return e;
      }),
      (c.prototype.getTitle = function () {
        var a,
          b = this.$element,
          c = this.options;
        return (a =
          b.attr("data-original-title") ||
          ("function" == typeof c.title ? c.title.call(b[0]) : c.title));
      }),
      (c.prototype.getUID = function (a) {
        do a += ~~(1e6 * Math.random());
        while (document.getElementById(a));
        return a;
      }),
      (c.prototype.tip = function () {
        return (this.$tip = this.$tip || a(this.options.template));
      }),
      (c.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
      }),
      (c.prototype.enable = function () {
        this.enabled = !0;
      }),
      (c.prototype.disable = function () {
        this.enabled = !1;
      }),
      (c.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled;
      }),
      (c.prototype.toggle = function (b) {
        var c = this;
        b &&
          ((c = a(b.currentTarget).data("bs." + this.type)),
          c ||
            ((c = new this.constructor(
              b.currentTarget,
              this.getDelegateOptions()
            )),
            a(b.currentTarget).data("bs." + this.type, c))),
          c.tip().hasClass("in") ? c.leave(c) : c.enter(c);
      }),
      (c.prototype.destroy = function () {
        var a = this;
        clearTimeout(this.timeout),
          this.hide(function () {
            a.$element.off("." + a.type).removeData("bs." + a.type);
          });
      });
    var d = a.fn.tooltip;
    (a.fn.tooltip = b),
      (a.fn.tooltip.Constructor = c),
      (a.fn.tooltip.noConflict = function () {
        return (a.fn.tooltip = d), this;
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.popover"),
          f = "object" == typeof b && b;
        (e || !/destroy|hide/.test(b)) &&
          (e || d.data("bs.popover", (e = new c(this, f))),
          "string" == typeof b && e[b]());
      });
    }
    var c = function (a, b) {
      this.init("popover", a, b);
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    (c.VERSION = "3.3.4"),
      (c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      })),
      (c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype)),
      (c.prototype.constructor = c),
      (c.prototype.getDefaults = function () {
        return c.DEFAULTS;
      }),
      (c.prototype.setContent = function () {
        var a = this.tip(),
          b = this.getTitle(),
          c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b),
          a
            .find(".popover-content")
            .children()
            .detach()
            .end()
            [
              this.options.html
                ? "string" == typeof c
                  ? "html"
                  : "append"
                : "text"
            ](c),
          a.removeClass("fade top bottom left right in"),
          a.find(".popover-title").html() || a.find(".popover-title").hide();
      }),
      (c.prototype.hasContent = function () {
        return this.getTitle() || this.getContent();
      }),
      (c.prototype.getContent = function () {
        var a = this.$element,
          b = this.options;
        return (
          a.attr("data-content") ||
          ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
        );
      }),
      (c.prototype.arrow = function () {
        return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
      });
    var d = a.fn.popover;
    (a.fn.popover = b),
      (a.fn.popover.Constructor = c),
      (a.fn.popover.noConflict = function () {
        return (a.fn.popover = d), this;
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(c, d) {
      (this.$body = a(document.body)),
        (this.$scrollElement = a(a(c).is(document.body) ? window : c)),
        (this.options = a.extend({}, b.DEFAULTS, d)),
        (this.selector = (this.options.target || "") + " .nav li > a"),
        (this.offsets = []),
        (this.targets = []),
        (this.activeTarget = null),
        (this.scrollHeight = 0),
        this.$scrollElement.on(
          "scroll.bs.scrollspy",
          a.proxy(this.process, this)
        ),
        this.refresh(),
        this.process();
    }
    function c(c) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.scrollspy"),
          f = "object" == typeof c && c;
        e || d.data("bs.scrollspy", (e = new b(this, f))),
          "string" == typeof c && e[c]();
      });
    }
    (b.VERSION = "3.3.4"),
      (b.DEFAULTS = { offset: 10 }),
      (b.prototype.getScrollHeight = function () {
        return (
          this.$scrollElement[0].scrollHeight ||
          Math.max(
            this.$body[0].scrollHeight,
            document.documentElement.scrollHeight
          )
        );
      }),
      (b.prototype.refresh = function () {
        var b = this,
          c = "offset",
          d = 0;
        (this.offsets = []),
          (this.targets = []),
          (this.scrollHeight = this.getScrollHeight()),
          a.isWindow(this.$scrollElement[0]) ||
            ((c = "position"), (d = this.$scrollElement.scrollTop())),
          this.$body
            .find(this.selector)
            .map(function () {
              var b = a(this),
                e = b.data("target") || b.attr("href"),
                f = /^#./.test(e) && a(e);
              return (
                (f && f.length && f.is(":visible") && [[f[c]().top + d, e]]) ||
                null
              );
            })
            .sort(function (a, b) {
              return a[0] - b[0];
            })
            .each(function () {
              b.offsets.push(this[0]), b.targets.push(this[1]);
            });
      }),
      (b.prototype.process = function () {
        var a,
          b = this.$scrollElement.scrollTop() + this.options.offset,
          c = this.getScrollHeight(),
          d = this.options.offset + c - this.$scrollElement.height(),
          e = this.offsets,
          f = this.targets,
          g = this.activeTarget;
        if ((this.scrollHeight != c && this.refresh(), b >= d))
          return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b < e[0]) return (this.activeTarget = null), this.clear();
        for (a = e.length; a--; )
          g != f[a] &&
            b >= e[a] &&
            (void 0 === e[a + 1] || b < e[a + 1]) &&
            this.activate(f[a]);
      }),
      (b.prototype.activate = function (b) {
        (this.activeTarget = b), this.clear();
        var c =
            this.selector +
            '[data-target="' +
            b +
            '"],' +
            this.selector +
            '[href="' +
            b +
            '"]',
          d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length &&
          (d = d.closest("li.dropdown").addClass("active")),
          d.trigger("activate.bs.scrollspy");
      }),
      (b.prototype.clear = function () {
        a(this.selector)
          .parentsUntil(this.options.target, ".active")
          .removeClass("active");
      });
    var d = a.fn.scrollspy;
    (a.fn.scrollspy = c),
      (a.fn.scrollspy.Constructor = b),
      (a.fn.scrollspy.noConflict = function () {
        return (a.fn.scrollspy = d), this;
      }),
      a(window).on("load.bs.scrollspy.data-api", function () {
        a('[data-spy="scroll"]').each(function () {
          var b = a(this);
          c.call(b, b.data());
        });
      });
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.tab");
        e || d.data("bs.tab", (e = new c(this))),
          "string" == typeof b && e[b]();
      });
    }
    var c = function (b) {
      this.element = a(b);
    };
    (c.VERSION = "3.3.4"),
      (c.TRANSITION_DURATION = 150),
      (c.prototype.show = function () {
        var b = this.element,
          c = b.closest("ul:not(.dropdown-menu)"),
          d = b.data("target");
        if (
          (d ||
            ((d = b.attr("href")), (d = d && d.replace(/.*(?=#[^\s]*$)/, ""))),
          !b.parent("li").hasClass("active"))
        ) {
          var e = c.find(".active:last a"),
            f = a.Event("hide.bs.tab", { relatedTarget: b[0] }),
            g = a.Event("show.bs.tab", { relatedTarget: e[0] });
          if (
            (e.trigger(f),
            b.trigger(g),
            !g.isDefaultPrevented() && !f.isDefaultPrevented())
          ) {
            var h = a(d);
            this.activate(b.closest("li"), c),
              this.activate(h, h.parent(), function () {
                e.trigger({ type: "hidden.bs.tab", relatedTarget: b[0] }),
                  b.trigger({ type: "shown.bs.tab", relatedTarget: e[0] });
              });
          }
        }
      }),
      (c.prototype.activate = function (b, d, e) {
        function f() {
          g
            .removeClass("active")
            .find("> .dropdown-menu > .active")
            .removeClass("active")
            .end()
            .find('[data-toggle="tab"]')
            .attr("aria-expanded", !1),
            b
              .addClass("active")
              .find('[data-toggle="tab"]')
              .attr("aria-expanded", !0),
            h ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"),
            b.parent(".dropdown-menu").length &&
              b
                .closest("li.dropdown")
                .addClass("active")
                .end()
                .find('[data-toggle="tab"]')
                .attr("aria-expanded", !0),
            e && e();
        }
        var g = d.find("> .active"),
          h =
            e &&
            a.support.transition &&
            ((g.length && g.hasClass("fade")) || !!d.find("> .fade").length);
        g.length && h
          ? g
              .one("bsTransitionEnd", f)
              .emulateTransitionEnd(c.TRANSITION_DURATION)
          : f(),
          g.removeClass("in");
      });
    var d = a.fn.tab;
    (a.fn.tab = b),
      (a.fn.tab.Constructor = c),
      (a.fn.tab.noConflict = function () {
        return (a.fn.tab = d), this;
      });
    var e = function (c) {
      c.preventDefault(), b.call(a(this), "show");
    };
    a(document)
      .on("click.bs.tab.data-api", '[data-toggle="tab"]', e)
      .on("click.bs.tab.data-api", '[data-toggle="pill"]', e);
  })(jQuery),
  +(function (a) {
    "use strict";
    function b(b) {
      return this.each(function () {
        var d = a(this),
          e = d.data("bs.affix"),
          f = "object" == typeof b && b;
        e || d.data("bs.affix", (e = new c(this, f))),
          "string" == typeof b && e[b]();
      });
    }
    var c = function (b, d) {
      (this.options = a.extend({}, c.DEFAULTS, d)),
        (this.$target = a(this.options.target)
          .on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this))
          .on(
            "click.bs.affix.data-api",
            a.proxy(this.checkPositionWithEventLoop, this)
          )),
        (this.$element = a(b)),
        (this.affixed = null),
        (this.unpin = null),
        (this.pinnedOffset = null),
        this.checkPosition();
    };
    (c.VERSION = "3.3.4"),
      (c.RESET = "affix affix-top affix-bottom"),
      (c.DEFAULTS = { offset: 0, target: window }),
      (c.prototype.getState = function (a, b, c, d) {
        var e = this.$target.scrollTop(),
          f = this.$element.offset(),
          g = this.$target.height();
        if (null != c && "top" == this.affixed) return c > e ? "top" : !1;
        if ("bottom" == this.affixed)
          return null != c
            ? e + this.unpin <= f.top
              ? !1
              : "bottom"
            : a - d >= e + g
            ? !1
            : "bottom";
        var h = null == this.affixed,
          i = h ? e : f.top,
          j = h ? g : b;
        return null != c && c >= e
          ? "top"
          : null != d && i + j >= a - d
          ? "bottom"
          : !1;
      }),
      (c.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
          b = this.$element.offset();
        return (this.pinnedOffset = b.top - a);
      }),
      (c.prototype.checkPositionWithEventLoop = function () {
        setTimeout(a.proxy(this.checkPosition, this), 1);
      }),
      (c.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
          var b = this.$element.height(),
            d = this.options.offset,
            e = d.top,
            f = d.bottom,
            g = a(document.body).height();
          "object" != typeof d && (f = e = d),
            "function" == typeof e && (e = d.top(this.$element)),
            "function" == typeof f && (f = d.bottom(this.$element));
          var h = this.getState(g, b, e, f);
          if (this.affixed != h) {
            null != this.unpin && this.$element.css("top", "");
            var i = "affix" + (h ? "-" + h : ""),
              j = a.Event(i + ".bs.affix");
            if ((this.$element.trigger(j), j.isDefaultPrevented())) return;
            (this.affixed = h),
              (this.unpin = "bottom" == h ? this.getPinnedOffset() : null),
              this.$element
                .removeClass(c.RESET)
                .addClass(i)
                .trigger(i.replace("affix", "affixed") + ".bs.affix");
          }
          "bottom" == h && this.$element.offset({ top: g - b - f });
        }
      });
    var d = a.fn.affix;
    (a.fn.affix = b),
      (a.fn.affix.Constructor = c),
      (a.fn.affix.noConflict = function () {
        return (a.fn.affix = d), this;
      }),
      a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
          var c = a(this),
            d = c.data();
          (d.offset = d.offset || {}),
            null != d.offsetBottom && (d.offset.bottom = d.offsetBottom),
            null != d.offsetTop && (d.offset.top = d.offsetTop),
            b.call(c, d);
        });
      });
  })(jQuery); /*})'"*/ /*})'"*/
/*!
 * hoverIntent v1.8.0 // 2014.06.29 // jQuery v1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
(function ($) {
  $.fn.hoverIntent = function (handlerIn, handlerOut, selector) {
    var cfg = { interval: 100, sensitivity: 6, timeout: 0 };
    if (typeof handlerIn === "object") {
      cfg = $.extend(cfg, handlerIn);
    } else {
      if ($.isFunction(handlerOut)) {
        cfg = $.extend(cfg, {
          over: handlerIn,
          out: handlerOut,
          selector: selector,
        });
      } else {
        cfg = $.extend(cfg, {
          over: handlerIn,
          out: handlerIn,
          selector: handlerOut,
        });
      }
    }
    var cX, cY, pX, pY;
    var track = function (ev) {
      cX = ev.pageX;
      cY = ev.pageY;
    };
    var compare = function (ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      if (
        Math.sqrt((pX - cX) * (pX - cX) + (pY - cY) * (pY - cY)) <
        cfg.sensitivity
      ) {
        $(ob).off("mousemove.hoverIntent", track);
        ob.hoverIntent_s = true;
        return cfg.over.apply(ob, [ev]);
      } else {
        pX = cX;
        pY = cY;
        ob.hoverIntent_t = setTimeout(function () {
          compare(ev, ob);
        }, cfg.interval);
      }
    };
    var delay = function (ev, ob) {
      ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      ob.hoverIntent_s = false;
      return cfg.out.apply(ob, [ev]);
    };
    var handleHover = function (e) {
      var ev = $.extend({}, e);
      var ob = this;
      if (ob.hoverIntent_t) {
        ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
      }
      if (e.type === "mouseenter") {
        pX = ev.pageX;
        pY = ev.pageY;
        $(ob).on("mousemove.hoverIntent", track);
        if (!ob.hoverIntent_s) {
          ob.hoverIntent_t = setTimeout(function () {
            compare(ev, ob);
          }, cfg.interval);
        }
      } else {
        $(ob).off("mousemove.hoverIntent", track);
        if (ob.hoverIntent_s) {
          ob.hoverIntent_t = setTimeout(function () {
            delay(ev, ob);
          }, cfg.timeout);
        }
      }
    };
    return this.on(
      {
        "mouseenter.hoverIntent": handleHover,
        "mouseleave.hoverIntent": handleHover,
      },
      cfg.selector
    );
  };
})(jQuery); /*})'"*/ /*})'"*/
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webp-setclasses !*/
!(function (e, n, A) {
  function o(e, n) {
    return typeof e === n;
  }
  function t() {
    var e, n, A, t, a, i, l;
    for (var f in r)
      if (r.hasOwnProperty(f)) {
        if (
          ((e = []),
          (n = r[f]),
          n.name &&
            (e.push(n.name.toLowerCase()),
            n.options && n.options.aliases && n.options.aliases.length))
        )
          for (A = 0; A < n.options.aliases.length; A++)
            e.push(n.options.aliases[A].toLowerCase());
        for (t = o(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++)
          (i = e[a]),
            (l = i.split(".")),
            1 === l.length
              ? (Modernizr[l[0]] = t)
              : (!Modernizr[l[0]] ||
                  Modernizr[l[0]] instanceof Boolean ||
                  (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])),
                (Modernizr[l[0]][l[1]] = t)),
            s.push((t ? "" : "no-") + l.join("-"));
      }
  }
  function a(e) {
    var n = u.className,
      A = Modernizr._config.classPrefix || "";
    if ((c && (n = n.baseVal), Modernizr._config.enableJSClass)) {
      var o = new RegExp("(^|\\s)" + A + "no-js(\\s|$)");
      n = n.replace(o, "$1" + A + "js$2");
    }
    Modernizr._config.enableClasses &&
      ((n += " " + A + e.join(" " + A)),
      c ? (u.className.baseVal = n) : (u.className = n));
  }
  function i(e, n) {
    if ("object" == typeof e) for (var A in e) f(e, A) && i(A, e[A]);
    else {
      e = e.toLowerCase();
      var o = e.split("."),
        t = Modernizr[o[0]];
      if ((2 == o.length && (t = t[o[1]]), "undefined" != typeof t))
        return Modernizr;
      (n = "function" == typeof n ? n() : n),
        1 == o.length
          ? (Modernizr[o[0]] = n)
          : (!Modernizr[o[0]] ||
              Modernizr[o[0]] instanceof Boolean ||
              (Modernizr[o[0]] = new Boolean(Modernizr[o[0]])),
            (Modernizr[o[0]][o[1]] = n)),
        a([(n && 0 != n ? "" : "no-") + o.join("-")]),
        Modernizr._trigger(e, n);
    }
    return Modernizr;
  }
  var s = [],
    r = [],
    l = {
      _version: "3.6.0",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0,
      },
      _q: [],
      on: function (e, n) {
        var A = this;
        setTimeout(function () {
          n(A[e]);
        }, 0);
      },
      addTest: function (e, n, A) {
        r.push({ name: e, fn: n, options: A });
      },
      addAsyncTest: function (e) {
        r.push({ name: null, fn: e });
      },
    },
    Modernizr = function () {};
  (Modernizr.prototype = l), (Modernizr = new Modernizr());
  var f,
    u = n.documentElement,
    c = "svg" === u.nodeName.toLowerCase();
  !(function () {
    var e = {}.hasOwnProperty;
    f =
      o(e, "undefined") || o(e.call, "undefined")
        ? function (e, n) {
            return n in e && o(e.constructor.prototype[n], "undefined");
          }
        : function (n, A) {
            return e.call(n, A);
          };
  })(),
    (l._l = {}),
    (l.on = function (e, n) {
      this._l[e] || (this._l[e] = []),
        this._l[e].push(n),
        Modernizr.hasOwnProperty(e) &&
          setTimeout(function () {
            Modernizr._trigger(e, Modernizr[e]);
          }, 0);
    }),
    (l._trigger = function (e, n) {
      if (this._l[e]) {
        var A = this._l[e];
        setTimeout(function () {
          var e, o;
          for (e = 0; e < A.length; e++) (o = A[e])(n);
        }, 0),
          delete this._l[e];
      }
    }),
    Modernizr._q.push(function () {
      l.addTest = i;
    }),
    Modernizr.addAsyncTest(function () {
      function e(e, n, A) {
        function o(n) {
          var o = n && "load" === n.type ? 1 == t.width : !1,
            a = "webp" === e;
          i(e, a && o ? new Boolean(o) : o), A && A(n);
        }
        var t = new Image();
        (t.onerror = o), (t.onload = o), (t.src = n);
      }
      var n = [
          {
            uri: "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=",
            name: "webp",
          },
          {
            uri: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==",
            name: "webp.alpha",
          },
          {
            uri: "data:image/webp;base64,UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
            name: "webp.animation",
          },
          {
            uri: "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=",
            name: "webp.lossless",
          },
        ],
        A = n.shift();
      e(A.name, A.uri, function (A) {
        if (A && "load" === A.type)
          for (var o = 0; o < n.length; o++) e(n[o].name, n[o].uri);
      });
    }),
    t(),
    a(s),
    delete l.addTest,
    delete l.addAsyncTest;
  for (var p = 0; p < Modernizr._q.length; p++) Modernizr._q[p]();
  e.Modernizr = Modernizr;
})(window, document);

jQuery(window).bind("load resize scroll", function (e) {
  var $ = jQuery;
  var y = jQuery(window).scrollTop();

  jQuery(".parallax-move-up")
    .filter(function () {
      return (
        jQuery(this).offset().top < y + jQuery(window).height() &&
        jQuery(this).offset().top + jQuery(this).height() > y
      );
    })
    .css("background-position", "50% " + parseInt(-y / 20) + "px");
  //console.log($(window).height());
  var windowHeight = $(window).height();
  var footerHeight = $("footer").height();
  $("#property-list-scroll").height(windowHeight - footerHeight);
});

jQuery.fn.isInViewport = function (y) {
  var y = y || 1;
  var elementTop = jQuery(this).offset().top;
  var elementBottom = elementTop + jQuery(this).outerHeight();
  var elementHeight = jQuery(this).height();
  var viewportTop = jQuery(window).scrollTop();
  var viewportBottom = viewportTop + jQuery(window).height();
  var deltaTop = Math.min(1, (elementBottom - viewportTop) / elementHeight);
  var deltaBottom = Math.min(1, (viewportBottom - elementTop) / elementHeight);
  return deltaTop * deltaBottom >= y;
};
// https://github.com/daneden/animate.css
jQuery.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    jQuery(this)
      .removeClass("animated-processed")
      .addClass("animated " + animationName)
      .one(animationEnd, function () {
        jQuery(this).removeClass("animated " + animationName);
        if (typeof callback === "function") callback();
      });
  },
});
// Open social share popup.
jQuery.fn.extend({
  openSocialShare: function (url, name, options) {
    var newWin = window.open(url, name, options);
    if (!newWin || newWin.closed || typeof newWin.closed == "undefined") {
      jQuery("#social-block-alert").slideDown().delay(2000).slideUp();
    }
  },
});

jQuery.fn.extend({
  makeCloseLink: function (nid) {
    var selector = ".lead-summary-" + nid + " a";
    var newLink = '<a href="#" class="summary-link opened">Close</a>';
    jQuery(selector).replaceWith(newLink);
  },
});

jQuery.fn.extend({
  openModal: function () {
    if (jQuery(".overlay-open").length == 0) {
      jQuery("#ajax-content-overlay").fadeIn();
      jQuery(".overlay-content").html('<div class="loader"></div>');
      jQuery("body").addClass("overlay-open");
    }
  },
});

jQuery.fn.extend({
  closeModal: function () {
    if (jQuery(".overlay-open").length > 0) {
      jQuery("#ajax-content-overlay").fadeOut();
      jQuery(".right-overlay-close").click();
      jQuery(".overlay-content").html('<div class="loader"></div>');
      jQuery("body").removeClass("overlay-open");
    }
  },
});

jQuery.fn.extend({
  openRightOverlay: function () {
    if (jQuery(".right-overlay-open").length == 0) {
      jQuery("#right-edit-overlay").addClass("right-overlay-open");
      jQuery("#right-edit-overlay").after('<div class="right-underlay"></div>');
      jQuery("#right-edit-overlay .overlay-inner").html(
        '<i class="loader loader-grey"></i>'
      );
      jQuery("#right-edit-overlay").animate(
        {
          right: 0,
        },
        500,
        "easeOutCubic"
      );
      jQuery("body").addClass("right-overlay-open");
      var scroll = false;
      if (jQuery("#right-edit-overlay").hasClass("scroll-top")) {
        scroll = true;
      }
      if (scroll) {
        jQuery("html, body").animate(
          {
            scrollTop: 0,
          },
          "normal"
        );
      }
    }
  },
});

jQuery.fn.extend({
  closeRightOverlay: function () {
    if (jQuery(".right-overlay-open").length > 0) {
      jQuery("#right-edit-overlay").removeClass("right-overlay-open");
      jQuery(".right-underlay").remove();
      jQuery("#right-edit-overlay").animate(
        {
          right: "-100%",
        },
        500,
        "easeOutCubic",
        function () {
          jQuery("#right-edit-overlay .overlay-title").text("Loading...");
          jQuery("#right-edit-overlay .overlay-inner").html(
            '<i class="loader loader-grey"></i>'
          );
        }
      );
      jQuery("body").removeClass("right-overlay-open");
    }
  },
});

(function ($, Drupal, undefined) {
  window.getUrlParameter = function (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split("&"),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split("=");

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  window.relaAjaxPost = function (url, params) {
    // Only allow this for relajax/ urls.
    if (url.indexOf("/relajax/nojs/global/") === 0) {
      var id = "relaAjaxLink-wrapper";
      $wrapper = $("<div></div>", { id: id });

      var element_settings = {
        url: url,
        event: "click",
        submit: params,
      };

      Drupal.ajax[id] = new Drupal.ajax(id, $wrapper[0], element_settings);
      $wrapper.click();
    }
  };

  // Add Drupal ajax link.
  window.relaAjaxLink = function (url) {
    // Only allow this for relajax/ urls.
    if (url.indexOf("/relajax/") == 0) {
      var id = "relaAjaxLink-wrapper";
      $wrapper = $("<div></div>", { id: id });

      var element_settings = {
        url: url,
        event: "click",
      };

      Drupal.ajax[id] = new Drupal.ajax(id, $wrapper[0], element_settings);
      $wrapper.click();
    }
  };

  window.getTextColor = function ($element) {
    var bgColor = $element.css("background-color");
    var count = 0;

    while (!bgColor || bgColor == "rgba(0, 0, 0, 0)") {
      count += 1;
      $element = $element.parent();
      if ($element.is("body") || count >= 100) {
        bgColor = "rgba(255, 255, 255)";
      } else {
        bgColor = $element.css("background-color");
      }
    }

    var bkg = bgColor.replace(/[^0-9,\.]/g, "").split(",");
    var a = 1 - (0.299 * bkg[0] + 0.587 * bkg[1] + 0.114 * bkg[2]) / 255;
    if (a < 0.25) {
      return "#000";
    } else {
      return "#FFF";
    }
  };

  window.isDefined = function (something) {
    return typeof something !== "undefined";
  };

  $(document).ready(function () {
    // AJAX reload the sort images for bulk upload background process.
    if (Drupal.settings.relaPhotos) {
      $(".view-id-property_images .empty-text").css({
        opacity: "0",
      });
      var bid = Drupal.settings.relaPhotos.imageProcessing.bid;
      var nid = Drupal.settings.relaPhotos.imageProcessing.nid;
      var query = "?timestamp=" + $.now() + "&bid=" + bid;

      var photosPercentageInterval = setInterval(function () {
        photosGetPercentage();
      }, 2000);

      var photosViewInterval = setInterval(function () {
        //photosReloadView();

        relaAjaxLink(
          "/relajax/photos/nojs/reload-sort-view-placeholder/" + nid
        );
      }, 5000);

      var photosGetPercentage = function () {
        $.ajax({
          url: "/batch_percentage.php" + query,
          complete: function (data) {
            // Update the percentage.
            $("#image-processing-" + nid + " .image-processing-status").text(
              data.responseText
            );
            $.cookie(bid, data.responseText, {
              path: "/",
            });

            if (data.responseText == "Done") {
              $.cookie(bid, null, {
                path: "/",
              });
              clearInterval(photosPercentageInterval);
              $.ajax({
                url: "/relajax/photos/nojs/processing-complete/" + nid,
                complete: function (data) {
                  clearInterval(photosViewInterval);
                  // photosReloadView();

                  relaAjaxLink("/relajax/photos/nojs/reload-sort-view/" + nid);
                  setTimeout(function () {
                    $(".image-processing-wrapper").remove();
                  }, 4000);
                },
              });
            }
          },
        });
      };

      var photosReloadView = function () {
        if ($(".reload-image-sort-view").length) {
          $(".reload-image-sort-view").trigger("click");
        }
      };
    }

    // Something else.
    $(".promo-activation .pane-title").click(function () {
      var parent = $(this).parent();
      if (parent.hasClass("expanded")) {
        $(this).parent().removeClass("expanded");
        $(this).next().slideUp("slow");
      } else {
        $(this).parent().addClass("expanded");
        $(this).next().slideDown("slow");
      }
    });
  });

  // Custom AJAX callback to send GA event.
  Drupal.ajax.prototype.commands.sendGAEventAJAX = function (
    ajax,
    response,
    status
  ) {
    var category = response.data.category || "Category";
    var action = response.data.action || "Action";
    var label = response.data.label || 0;
    var value = response.data.value || 0;

    sendGAEvent(category, action, label, value);
  };

  // This is literally copied from ajax.js line 501 to define
  // Drupal.ajax.prototype.commands. We're doing this so we don't wrap replaced
  // content in a stupid div.
  Drupal.ajax.prototype.commands.relaInsert = function (
    ajax,
    response,
    status
  ) {
    var wrapper = response.selector ? $(response.selector) : $(ajax.wrapper);
    var method = response.method || ajax.method;
    var effect = ajax.getEffect(response);

    var new_content_wrapped = $("<div></div>").html(response.data);
    var new_content = new_content_wrapped.contents();

    switch (method) {
      case "html":
      case "replaceWith":
      case "replaceAll":
      case "empty":
      case "remove":
        var settings = response.settings || ajax.settings || Drupal.settings;
        Drupal.detachBehaviors(wrapper, settings);
    }

    wrapper[method](new_content);

    if (effect.showEffect != "show") {
      new_content.hide();
    }

    if ($(".ajax-new-content", new_content).length > 0) {
      $(".ajax-new-content", new_content).hide();
      new_content.show();
      $(".ajax-new-content", new_content)[effect.showEffect](effect.showSpeed);
    } else if (effect.showEffect != "show") {
      new_content[effect.showEffect](effect.showSpeed);
    }

    if (new_content.parents("html").length > 0) {
      var settings = response.settings || ajax.settings || Drupal.settings;
      Drupal.attachBehaviors(new_content, settings);
    }
  };

  Drupal.behaviors.propertyGalleryProtect = {
    attach: function (context, settings) {
      $(".pswp__item").on("contextmenu", "img", function (e) {
        return false;
      });
    },
  };

  // Send GA on checkout
  Drupal.behaviors.relaAnalytics = {
    attach: function (context, settings) {
      // Check for UTMs.
      var utmSource = getUrlParameter("utm_source") || "";
      if (utmSource.length) {
        var utms = {
          utm_source: utmSource,
          utm_medium: getUrlParameter("utm_medium") || "",
          utm_campaign: getUrlParameter("utm_campaign") || "",
          utm_term: getUrlParameter("utm_term") || "",
          utm_content: getUrlParameter("utm_content") || "",
        };

        $.cookie("rela_utms", JSON.stringify(utms), {
          expires: 30,
          path: "/",
        });
      }

      function sendGAEvent(category, action, label, value) {
        if (typeof ga !== "undefined") {
          if (label === undefined) {
            label = 0;
          }

          if (value === undefined) {
            value = 0;
          }
          // console.log(category, 'sendtoGA');
          ga("send", {
            hitType: "event",
            eventCategory: category,
            eventAction: action,
            eventLabel: label,
            eventValue: value,
          });
        }
      }

      if (!$.isEmptyObject(Drupal.settings.relaAnalytics)) {
        $.each(Drupal.settings.relaAnalytics, function (k, analytics) {
          //console.log(analytics, 'analyt');
          delete Drupal.settings.relaAnalytics[k];
          sendGAEvent(
            analytics.category,
            analytics.action,
            analytics.label,
            analytics.value
          );
        });
      }
    },
  };

  Drupal.behaviors.bef_bootstrap_fix = {
    attach: function (context, settings) {
      var views_exposed_form = jQuery(".views-exposed-form", context);

      views_exposed_form.hide();
      views_exposed_form
        .find(".form-control")
        .not(".form-text, .form-select")
        .removeClass("form-control");
      views_exposed_form.show();
    },
  };

  Drupal.behaviors.RelazGeneral = {
    attach: function (context, settings) {
      $(".forgot-pass-login-link").click(function () {
        $(".login-form-wrapper").removeClass("hidden");
        $(".pass-reset-form-wrapper").addClass("hidden");
      });

      $(".forgot-pass-link").click(function () {
        $(".login-form-wrapper").addClass("hidden");
        $(".pass-reset-form-wrapper").removeClass("hidden");
      });

      // Checks if user loads page via backbutton history and reloads it.
      if (performance.navigation.type == 2) {
        location.reload(true);
      }
      // Automatically change text color.
      if ($(".auto-text-color", context).length) {
        $(".auto-text-color").each(function () {
          $(this).removeClass("auto-text-color");
          $(this).css("color", getTextColor($(this)));
        });
      }

      if ($(".auto-border-color", context).length) {
        $(".auto-border-color").each(function () {
          $(this).removeClass("auto-border-color");
          var bkg = $(this)
            .css("background-color")
            .replace(/[^0-9,\.]/g, "")
            .split(",");
          var a = 1 - (0.299 * bkg[0] + 0.587 * bkg[1] + 0.114 * bkg[2]) / 255;
          if (a < 0.5) {
            $(this).css("border-color", "#000");
          } else {
            $(this).css("border-color", "#FFF");
          }
        });
      }

      // Show/hide currency in property details form.
      if ($(".change-currency").length) {
        $(".change-currency").unbind("click");
        $(".change-currency").click(function () {
          var parent = $(this).closest(".group-pricing");
          $(parent).toggleClass("us-based");
        });
      }

      // Disable submit on click.
      $(".submit-disable").on("click", function () {
        $(this).addClass("disabled");
      });

      if ($(".submit-disable").is(":disabled")) {
        $(this).addClass("disabled");
      }

      // Doing this to re-enable the button after the user changes any details
      // for their card in the form so they re-submit.
      $(".commerce_payment input, .commerce_payment select").change(
        function () {
          $(".submit-disable").removeClass("disabled");
          $(".payment-errors").html("");
        }
      );

      $(".commerce_payment input").keyup(function () {
        $(".submit-disable").removeClass("disabled");
        $(".payment-errors").html("");
      });

      // Disable submit on mousedown.
      $(".submit-disable-md").on("mousedown", function () {
        $(this).addClass("disabled");
      });

      if ($(".submit-disable-md").is(":disabled")) {
        $(this).addClass("disabled");
      }

      // Auto click links.
      if ($(".auto-download").length) {
        $(".auto-download", context).each(function () {
          $this = $(this);
          var url = $this.attr("data-url") || "";
          if (url.length) {
            var delay = $this.attr("data-delay") || 0;
            setTimeout(function () {
              $this.removeClass("auto-download").hide();
              window.location.href =
                "/relajax/nojs/general/auto-download?url=" + url;
            }, delay);
          }
        });
      }

      // if ($('a.auto-click').length) {
      $("a.auto-click").once(function () {
        var $this = $(this);
        var delay = $this.attr("data-delay") || 0;
        if (delay == "in-viewport") {
          if (
            $this.isInViewport(0.5) &&
            !$($this).hasClass("click-processed")
          ) {
            $this.click().removeClass("auto-click").hide();
            $this.click().addClass("click-processed");
          }

          $(window).scroll(function () {
            if (
              $this.isInViewport(0.5) &&
              !$($this).hasClass("click-processed")
            ) {
              $this.click().removeClass("auto-click").hide();
              $this.click().addClass("click-processed");
            }
          });
        } else {
          setTimeout(function () {
            $this.click().removeClass("auto-click").hide();
          }, delay);
        }
      });
      // }

      $("a.auto-redirect", context).each(function () {
        var $this = $(this);
        var delay = $this.attr("data-delay") || 0;
        var countdown = $this.attr("data-countdown") || 0;

        if (countdown && delay > 0) {
          var countdownTime = delay / 1000;
          $this.before(
            '<div class="ar-countdown">You will be redirected in <span class="ar-countdown-time">' +
              countdownTime +
              "</span> seconds.</div>"
          );
          var countdownInt = setInterval(function () {
            var currentCountdown = parseInt(
              $(".ar-countdown .ar-countdown-time").text()
            );
            if (currentCountdown == 1) {
              clearInterval(countdownInt);
            }
            $(".ar-countdown .ar-countdown-time").text(currentCountdown - 1);
          }, 1000);
        }

        setTimeout(function () {
          window.location.replace($this.attr("href"));
        }, delay);
      });

      $(".right-overlay-trigger", context).click(function () {
        if (!$("#right-edit-overlay").hasClass("right-overlay-open")) {
          $("#right-edit-overlay").addClass("right-overlay-open");
          $("#right-edit-overlay").after('<div class="right-underlay"></div>');
          $("#right-edit-overlay .overlay-inner").html(
            '<i class="loader loader-grey"></i>'
          );
          $("#right-edit-overlay").animate(
            {
              right: 0,
            },
            500,
            "easeOutCubic"
          );

          var scroll = false;
          if (jQuery("#right-edit-overlay").hasClass("scroll-top")) {
            scroll = true;
          }
          if (scroll) {
            jQuery("html, body").animate(
              {
                scrollTop: 0,
              },
              "normal"
            );
          }
        }

        return false;
      });

      $(".right-overlay-close", context).click(function () {
        $("#right-edit-overlay").removeAttr("class");
        $(".right-underlay").remove();
        $("#right-edit-overlay").animate(
          {
            right: "-100%",
          },
          500,
          "easeOutCubic",
          function () {
            $("#right-edit-overlay .overlay-title").text("Loading...");
            $("#right-edit-overlay .overlay-inner").html(
              '<i class="loader loader-grey"></i>'
            );
          }
        );
        $("body").removeClass("right-overlay-open");
        //$('.right-overlay-close').trigger('closeRightOverlay');
      });
      // Close modal on escape key.
      if ($("body.overlay-open").length) {
        $(document).keyup(function (e) {
          if ($(".rela-modal.locked").length == 0) {
            if (e.keyCode == 27) {
              $.fn.closeModal();
            }
          }
        });
      }

      // Also hide overlay close if locked.
      $(".overlay-close").show();
      if ($(".rela-modal.locked").length) {
        $(".overlay-header .overlay-close").hide();
      }

      // Add slideDown animation to Bootstrap dropdown when expanding.
      $(".dropdown").on("show.bs.dropdown", function () {
        $(this).find(".dropdown-menu").first().stop(true, true).slideDown();
      });

      // Add slideUp animation to Bootstrap dropdown when collapsing.
      $(".dropdown").on("hide.bs.dropdown", function () {
        $(this).find(".dropdown-menu").first().stop(true, true).slideUp();
      });

      // Villa real estate phone format.
      $(".auth-20886 .field-name-field-user-phone").text(function (_, text) {
        return text.replace(/\(|\)/g, "").replace(/-/g, " ");
      });

      // Reattach behaviors.
      $.fn.reattachBehaviors = function (selector) {
        Drupal.attachBehaviors(selector);
      };

      // Hide CC on share email for WL.
      $("#rela-property-email-share .form-type-checkbox input").change(
        function () {
          var checkedAgents = $(
            "#rela-property-email-share .form-type-checkbox input:checked"
          );
          var mail = $(this).val();
          if (this.checked) {
            $("#rela-property-email-share .cc-wrapper").slideDown();
            $(
              '#rela-property-email-share div[data-mail="' + mail + '"]'
            ).slideDown();
          } else {
            $(
              '#rela-property-email-share div[data-mail="' + mail + '"]'
            ).slideUp();
            if (checkedAgents.length == 0) {
              $("#rela-property-email-share .cc-wrapper").slideUp();
            } else {
              $("#rela-property-email-share .cc-wrapper").slideDown();
            }
          }
        }
      );

      // Check DNS.
      if ($(".dns-check", context).length) {
        // Setup domain.
        if ($("td[data-domain-order]", context).length) {
          $(".dns-check", context).html(
            '<div class="dns-check-result"><span class="fa fa-refresh fa-spin"></span> ' +
              Drupal.t("Processing") +
              "</div>"
          );
        }
        // Check DNS Settings.
        else {
          $(".dns-check", context).each(function (k, v) {
            $this = $(this);
            if ($this.next(".dns-instructions-table").length > 0) {
              return;
            }

            $this.addClass("dns-check-" + k);

            var aRecord = $this.attr("data-arecord") || "";
            var cname = $this.attr("data-cname") || "";
            var srv = $this.attr("data-srv") || "";
            $this.html(
              '<div class="dns-check-result"><span class="fa fa-refresh fa-spin"></span></div>'
            );
            $.ajax({
              method: "POST",
              url: "/relajax/nojs/domains/dns-check",
              data: {
                aRecord: aRecord,
                cname: cname,
                srv: srv,
              },
            }).done(function (data) {
              var status = data.status;
              var error = data.error;

              $this = $(".dns-check-" + k);

              var cls = status.replace(/\s+/g, "").toLowerCase();
              $this.html(
                '<div class="dns-check-result"><span class="fa fa-circle domain-status-' +
                  cls +
                  '"></span> ' +
                  status +
                  "</div>"
              );

              if (status.indexOf("Action Required") >= 0) {
                $("body").addClass("show-dns-instructions");
                $this.addClass("dns-invalid");

                var showInstructions = $this.attr("data-show-errors") || false;
                if (showInstructions && error.length > 0) {
                  $this.after(error);
                }
              } else {
                $("body").removeClass("show-dns-instructions");
                if (status == "OK") {
                  $this.removeClass("dns-invalid");
                  $this.html(
                    '<div class="dns-check-result"><span class="fa fa-check ico-green"></span> OK</div>'
                  );
                  if ($(".dns-check.wl-domain").length) {
                    $.post("/relajax/white-label/nojs/set-valid-wl-domain", {
                      cname: cname,
                    });
                  }
                }
              }
            });
          });
        }
      }

      // Disable buttons on PLUpload submit.
      $("#rela-property-bulk-media-upload-upload-form", context).once(
        "plupload-form",
        function () {
          if (0 < $(this).find(".plupload-element").length) {
            $(this).submit(function (e) {
              $("button").prop("disabled", true);
            });
          }
        }
      );

      // Video upload stuff.
      $(window).on("beforeunload", function () {
        var ytInProgress = $.cookie["ytInProgress"];
        if (ytInProgress) {
          return Drupal.t(
            "Warning: Your video is still uploading. Leaving this page will cancel the upload."
          );
        }
      });

      // Height for property header
      $(".property-header").height($(".group-property-details-right").height());

      var topOffset =
        $(".group-property-details-right").outerHeight() +
        $(".property-details-title").outerHeight();
      $(".details-group-wrap").css("margin-top", -topOffset);

      $(".no-brochure", context).click(function () {
        $(".no-brochure-message").slideDown("normal");
        return false;
      });

      if ($(".phone-format").length && !$("body").hasClass("user-21906")) {
        $(".phone-format input").mask("(999) 999-9999");
      }

      if ($("#property-edit-messages").hasClass("showing")) {
        setTimeout(function () {
          // $('#property-edit-messages').fadeOut(500, function(){
          //   $(this).removeClass('showing');
          // });
          $("#property-edit-messages").animate(
            {
              top: -10 + "px",
            },
            200,
            function () {
              //Animation complete
              $(this).hide();
              $(this).css("top", "90px");
            }
          );
        }, 2000);
      }

      $(".overlay-trigger", context).click(function () {
        var style = $(this).data("style");

        if (style !== undefined) {
          $(".overlay-content").attr("class", "overlay-content");
          $(".overlay-content").addClass(style);
        } else {
          $(".overlay-content").attr("class", "overlay-content");
        }
        $("#ajax-content-overlay").fadeIn();

        $(".overlay-content").show();
        $("#overlay-content-static").hide();
        $(".overlay-content").html('<div class="loader"></div>');
        $("body").addClass("overlay-open");

        if ($(this).attr("data-youtube-id")) {
          var videoID = $(this).attr("data-youtube-id");
          var embedURL =
            "https://www.youtube.com/embed/" +
            videoID +
            "?autoplay=1&modestbranding=1&rel=0&showInfo=0&vq=hd720";
          var videoIframe =
            '<div id="property-video-modal" class="aspect-ratio-content">';
          videoIframe +=
            '<iframe width="100%" height="100%" src="' +
            embedURL +
            '" frameborder="0" allowfullscreen></iframe></div>';
          $(".overlay-content")
            .addClass("overlay-sixteen-nine")
            .html(videoIframe);
        }
      });

      $(".overlay-close", context).click(function () {
        $("#ajax-content-overlay").fadeOut();
        $(".overlay-content").html("");
        $(".overlay-content").attr("class", "overlay-content");
        $("body").removeClass("overlay-open");
        $("#overlay-content-static").hide();
        setTimeout(function () {
          $("#ajax-content-overlay").removeClass();
        }, 500);
        return false;
      });

      // Doing all leadop cookie checks in the front end and not in backend.
      $("#lead-pop-check", context).click(function () {
        if ($("body").hasClass("ppss-required")) {
          return false;
        }
        var pid = $(this).data("pid");
        var type = $(this).data("type");
        var lpid = getUrlParameter("lpid");
        var setLPcookie = false;
        var mls = getUrlParameter("mls");
        var utmMedium = getUrlParameter("utm_medium");

        var path = $(location).attr("href");
        path = path.split("/");
        if (
          mls === true ||
          path[3] === "mls" ||
          path[3] === "pv" ||
          utmMedium === "property_fb_ad"
        ) {
          setLPcookie = true;
          if (type == "click for price") {
            var price = $(".click-for-price").data("price");
            if (price !== null) {
              $(".price-field").html(price);
            }

            return;
          }
        }

        // Check url param and hash in settinsg and set cookie if match.
        if (settings.relaPIDhash !== undefined) {
          if (lpid !== undefined) {
            if (lpid == settings.relaPIDhash) {
              setLPcookie = true;
            }
          }
        }
        // If cookie doesnt exists and set flag is true, then set.
        if ($.cookie("rela_leadpop") === null) {
          if (setLPcookie == true) {
            var dis = [];
            dis.push(pid);
            $.cookie("rela_leadpop", JSON.stringify(dis), {
              expires: 14,
              path: "/",
            });
            // click this check link again and it should run through.
            $("#lead-pop-check").click();
          } else {
            // if no cookie, and not ready to set, then click the link.
            $(".lead-pop-link-auto").click();
            setExitPop();
          }
        }
        // If we have the cookie, check if correct one, if not, then click
        else {
          //have cookie
          var cooky = $.parseJSON($.cookie("rela_leadpop"));
          if (typeof pid !== "string") {
            // if the shit is set from php it's not a string so check and covert
            // so we can check the inarray correctly.
            pid = pid.toString();
          }
          if ($.inArray(pid, cooky) !== -1) {
            // Cookie validates against property, so show price.
            if (type == "click for price") {
              var price = $(".click-for-price").data("price");
              $(".price-field").html(price);
            }
          } else if (setLPcookie == true) {
            cooky.push(pid);
            $.cookie("rela_leadpop", JSON.stringify(cooky), {
              expires: 14,
              path: "/",
            });
          } else {
            // click the leadpop link, but not price or the exit intent
            $(".lead-pop-link-auto").click();
            setExitPop();
          }
        }
      });

      $(".lead-pop-link", context).click(function () {
        var mls = getUrlParameter("mls");
        var $this = $(this);
        var delay = $(this).attr("data-delay") || 0;
        var style = $(this).data("style");

        if ($("body").hasClass("ppss-required")) {
          return false;
        }

        if (mls !== true) {
          setTimeout(function () {
            if (style !== undefined) {
              $(".overlay-content").attr("class", "overlay-content");
              $("#ajax-content-overlay").addClass(style);
            } else {
              $(".overlay-content").attr("class", "overlay-content");
            }
            $("#ajax-content-overlay").show();

            $("#overlay-content-static").show();
            $("body").addClass("overlay-open");
            if ($this.attr("data-static-content")) {
              var target = $this.attr("data-static-content");
              $("#" + target)
                .show()
                .detach()
                .appendTo("#overlay-content-static");
            }
          }, delay);
          return false;
        }
      });

      function setExitPop() {
        $(".lead-pop-exit", context).each(function () {
          $(function () {
            ddexitpop.init({
              contentsource: ["id", "ph"],
              fxclass: "random",
              displayfreq: "always",
              onddexitpop: function ($popup) {
                $(".lead-pop-exit").click();
              },
            });
          });
        });
      }
      // $('.overlay-trigger-static', context).click(function() {
      //   $('#overlay-content-static').show();
      //   $('#ajax-content-overlay').fadeIn('fast');
      //   $('.overlay-content').hide();

      //   var target = $(this).attr('data');
      //   var style = $(this).data('style');
      //   $('.static-content').hide();
      //   $(target + '.static-content').show();
      //   if (style !== undefined) {
      //     $('#overlay-content-static').removeClass();
      //     $('#overlay-content-static').addClass(style);
      //   } else {
      //     $('#overlay-content-static').removeClass();
      //   }
      //   $('#' + target).addClass('static-content');
      //   $('#' + target).detach().appendTo('#ajax-content-overlay #overlay-content-static');
      //   $('#' + target).show();
      //   return false;
      // });

      // Property image delete confirm open/close
      $(".prop-image-delete", context)
        .unbind()
        .click(function () {
          var wrapper = $(this)
            .parent()
            .find(".prop-image-delete-confirm-wrapper");
          $(".prop-image-delete-confirm-wrapper").not(wrapper).slideUp();
          $(".prop-image-download-select-wrapper").slideUp();
          wrapper.slideToggle();
        });

      $(".prop-image-delete-cancel", context).click(function () {
        $(this).parent().slideUp();
      });

      // Property image download.
      $(".prop-image-download", context)
        .unbind()
        .click(function () {
          var wrapper = $(this)
            .parent()
            .find(".prop-image-download-select-wrapper");
          $(".prop-image-download-select-wrapper").not(wrapper).slideUp();
          $(".prop-image-delete-confirm-wrapper").slideUp();
          wrapper.slideToggle();
        });

      // Send An Invite form.

      // Modal email link
      // $('.overlay-content .send-invite-email', context).click(function() {
      //   $('.overlay-content #send-invite-links').addClass('hidden');
      //   $('.overlay-content #rela-referrals-send-email-invite').removeClass('hidden');
      // });

      $(".overlay-content .send-invite-back, .overlay-close", context).click(
        function () {
          $(".overlay-content #send-invite-links").removeClass("hidden");
          $(".overlay-content #rela-referrals-send-email-invite").addClass(
            "hidden"
          );
          $(".alert-block").remove();
        }
      );

      $(".status-switch", context).click(function () {
        if ($(this).hasClass("open")) {
          $(".switch-link").slideUp();
          $(this).removeClass("open");
          $(".switch-icon").removeClass("fa-rotate-180");
        } else {
          $(".switch-link").slideDown();
          $(this).addClass("open");
          $(".switch-icon").addClass("fa-rotate-180");
        }
      });

      $("#dashboard-left-nav", context).hoverIntent({
        over: expandMenu,
        out: collapseMenu,
        // selector: 'div'
      });

      function expandMenu() {
        $("#dashboard-left-nav").addClass("expanded");
      }

      function collapseMenu() {
        $("#dashboard-left-nav").removeClass("expanded");
        $("#dashboard-left-nav .dropup").removeClass("open");
      }

      $.fn.fakeSaveTriggered = function () {
        $(".fake-save").clearQueue();
        var btnText = "Save";
        //console.log(btnText);
        $(".fake-save").html(
          btnText + ' <span class="fa fa-refresh fa-spin"></span>'
        );
        setTimeout(function () {
          $(".fake-save").html('Saved <span class="fa fa-check"></span>');
        }, 1000);
        setTimeout(function () {
          if ($(".fake-save").hasClass("no-text")) {
            btnText = "";
          }
          $(".fake-save").text(btnText);
        }, 3000);

        $("#property-edit-messages .pane-content").html("Property Saved!");
        $("#property-edit-messages")
          .delay(500)
          .addClass("animated")
          .removeClass("slideOutUp")
          .addClass("slideInDown")
          .show();
        setTimeout(function () {
          $("#property-edit-messages")
            .removeClass("slideInDown")
            .addClass("slideOutUp");
        }, 2000);

        var pid = $(this).attr("data-pid") || 0;
        if (pid > 0) {
          $.post("/relajax/nojs/property/" + pid + "/clearcache");
        }
      };

      $(".fake-save-disabled", context).click(function () {
        $(this)
          .html('Save <span class="fa fa-refresh fa-spin"></span>')
          .fakeSaveTriggered();
      });

      $(".fake-save-enabled", context).click(function () {
        $(this).html('Save <span class="fa fa-refresh fa-spin"></span>');

        var $formBtn = $(".form-actions .form-submit");

        if ($formBtn.length) {
          $(".form-actions .form-submit").click();
          $(".form-actions .form-submit").mousedown();
        } else {
          $(this).fakeSaveTriggered();
        }

        return false;
      });

      if ($.isFunction($.fn.perfectScrollbar)) {
        $("#property-list-scroll").perfectScrollbar();
        $(
          ".property-template-focal .field-name-field-property-description .field-item"
        ).perfectScrollbar({
          //wheelPropagation: true
        });
      }

      $(".flag-admin-message-mark-as-read a").each(function () {
        if ($(this).hasClass("unflag-action")) {
          $(this).parent().parent().parent().addClass("message-read");
          $(this).parent().parent().parent().removeClass("message-unread");
        } else {
          $(this).parent().parent().parent().addClass("message-unread");
          $(this).parent().parent().parent().removeClass("message-read");
        }
      });

      $(".animate-bg-x").animate(
        {
          "background-position-x": "100%",
        },
        10000,
        "linear",
        function () {
          $(this).animate(
            {
              "background-position-x": "0%",
            },
            100000,
            "linear"
          );
        }
      );

      $(".exit-cta").on("click", function () {
        $("#exit_intent_lead_node_form_wrapper").animateCss(
          "fadeInUp",
          function () {
            $("#exit_intent_lead_node_form_wrapper").addClass("active");
          }
        );
      });
    }, // End Attach Behaves
  }; //End Function

  Drupal.behaviors.relaFlyerDownload = {
    attach: function (context, settings) {
      if ($(".prompt-claim").length) {
        $("body").once("prompt-claim", function () {
          setTimeout(function () {
            $(".prompt-claim").trigger("click");
          }, 5000);
        });
      }
    },
  };

  Drupal.behaviors.liveImageStyleRefresh = {
    attach: function (context, settings) {
      if (settings.relaDemo !== undefined) {
        $(".live-image-refresh img").once("image-refresh", function () {
          var imagePath = $(this).attr("src");
          $(this).attr("src", imagePath + "?" + settings.relaDemo.refreshStyle);
        });
      }
    },
  };

  /**
   * Default text for textfields.
   * @type {Object}
   */
  Drupal.behaviors.defaultFormText = {
    attach: function (context, settings) {
      var inputs = $(".clear-text:not(.processed)");

      // Store the orginal values
      inputs
        .each(function () {
          $this = $(this);
          $this.data("default", $this.val());
        })
        .addClass("processed grey-text");

      inputs
        .focus(function () {
          $this = $(this);
          if ($this.val() == $this.data("default")) {
            $this.val("");
            $this.removeClass("grey-text");
          }
        })
        .blur(function () {
          $this = $(this);
          if ($this.val() == "") {
            $this.val($this.data("default"));
            $this.addClass("grey-text");
          }
        });

      // Add a pseudo checkbox.
      var checkIcon =
        '<img width="13" height="13" src="/sites/all/themes/relaz/images/svg/checkmark_white.svg">';
      $(".pseudo-checkbox").each(function () {
        $realCheckbox = $(this);
        if ($realCheckbox.next(".pseudo-checkbox-input").length == 0) {
          $pseudoCheckbox = $(
            '<div class="pseudo-checkbox-input"><span class="pseudo-checkbox-check">' +
              checkIcon +
              "</span></div>"
          );
          $pseudoCheckbox.attr("style", $realCheckbox.attr("style"));
          $pseudoCheckbox.css("color", getTextColor($realCheckbox));

          if ($realCheckbox.attr("checked") == "checked") {
            $pseudoCheckbox.addClass("checked");
          } else {
            $pseudoCheckbox.removeClass("checked");
          }
          $realCheckbox.after($pseudoCheckbox);
        }
      });

      $(".pseudo-checkbox-input")
        .once()
        .click(function () {
          $(this).prev(".pseudo-checkbox").click();
        });

      $(".pseudo-checkbox")
        .once()
        .click(function () {
          $(this).next(".pseudo-checkbox-input").toggleClass("checked");
        });
    }, // End Attach Behaves
  }; //End Function

  /**
   * Waypoints
   */
  Drupal.behaviors.Waypoints = {
    attach: function (context, settings) {
      // Add this class to a div in the template to trigger the waypoint.
      var waypointTrigger = $(".waypoint-trigger");
      var waypointOffset = 0;
      if ($(waypointTrigger).attr("waypoint-offset")) {
        waypointOffset = $(waypointTrigger).attr("waypoint-offset");
      }
      var waypoints = $(waypointTrigger, context).waypoint(
        function (direction) {
          if (direction == "down") {
            $("#sticky-menu").addClass("stuck");
            $("body").addClass("scrolled");
          }
        },
        {
          offset: waypointOffset,
        }
      );

      var waypointOffsetUp = 100;
      if ($(waypointTrigger).attr("waypoint-offset-up")) {
        waypointOffsetUp = $(waypointTrigger).attr("waypoint-offset-up");
      }
      $(waypointTrigger, context).waypoint(
        function (direction) {
          if (direction == "up") {
            $("#sticky-menu").removeClass("stuck");
            $("body").removeClass("scrolled");
          }
        },
        {
          offset: waypointOffsetUp,
        }
      );

      var waySpy = $(".spy-nav", context).waypoint(
        function (direction) {
          if (direction == "down") {
            var spyID = this.element.id;
            $(".region-content .active-spy").removeClass("active-spy");
            $('a[href="#' + spyID + '"]').addClass("active-spy");
          }
        },
        {
          offset: "25%",
        }
      );

      var waySpy = $(".spy-nav", context).waypoint(
        function (direction) {
          if (direction == "up") {
            var spyID = this.element.id;
            $(".region-content .active-spy").removeClass("active-spy");
            $('a[href="#' + spyID + '"]').addClass("active-spy");
          }
        },
        {
          offset: "-25%",
        }
      );

      var navHeight = $("#navbar").outerHeight(true);
      var wizardWaypoints = $("#wizard-steps-pane", context).waypoint(
        function (direction) {
          if (direction == "down") {
            var offset1 = $("#wizard-steps-pane").outerHeight(true);
            $("#wizard-steps-pane").addClass("affix");
            var marginTop =
              $("#wizard-steps-pane").outerHeight(true) +
              $("#wizard-top-submit-pane").outerHeight(true);
            $("#wizard-top-submit-pane")
              .addClass("affix")
              .css("top", offset1 - 15);
            $("body").css("margin-top", marginTop);
            $("body").addClass("wizard-scrolled");
          }
        },
        {
          offset: 0,
        }
      );

      $("#wizard-steps-pane", context).waypoint(
        function (direction) {
          if (direction == "up") {
            $("#wizard-steps-pane").removeClass("affix");
            $("#wizard-top-submit-pane").removeClass("affix");
            $("body").css("margin-top", 0);
            $("body").removeClass("wizard-scrolled");
          }
        },
        {
          offset: 0,
        }
      );

      $("#navbar.navbar-fixed-top", context).affix({
        offset: {
          top: 80,
          //bottom: -80
        },
      });

      // $('#wizard-steps-pane', context).affix({
      //   offset: {
      //     top: function() {

      //       return (this.top = $('#navbar').outerHeight(true))
      //     }
      //   }
      // });

      // $('#wizard-top-submit-pane', context).affix({
      //   offset: {
      //     top: function() {
      //       var topPos = $('#wizard-steps-pane').outerHeight(true);
      //       $('#wizard-top-submit-pane').css("top", topPos);
      //       $('body').addClass("wizard-scrolled");
      //       console.log(topPos);
      //       return (this.top = $('#navbar').outerHeight(true))
      //     }
      //   }
      // });

      //}// End check waypoint function
    }, // End Attach Behaves
  }; //End Function

  Drupal.behaviors.LinkScroll = {
    attach: function (context, settings) {
      $(".sticky-link a", context).click(function () {
        var sectionId = $(this).attr("href");
        var menuHeight = $("#navbar").height();
        var scrollOffset = 0;

        if ($(this).attr("data-scroll-to")) {
          sectionId = $(this).attr("data-scroll-to");
        }

        if ($(this).attr("data-scroll-offset")) {
          scrollOffset = $(this).attr("data-scroll-offset");
        }
        if ($(sectionId).attr("data-scroll-offset")) {
          scrollOffset = $(sectionId).attr("data-scroll-offset");
        }
        if ($(sectionId).length) {
          $(".sticky-link a.active").removeClass("active");
          $(this).addClass("active");
          $("html, body").animate(
            {
              scrollTop: $(sectionId).offset().top - menuHeight - scrollOffset,
            },
            1000
          );
        }
        if ($(".navbar-collapse").hasClass("in")) {
          $(".navbar-collapse").removeClass("in");
        }
        return false;
      });
    },
  }; // End Function

  /**
   * Custom tabs for the dashboard. This can be used globally as well.
   */
  Drupal.behaviors.TabContent = {
    attach: function (context, settings) {
      if ($(".tabs-wrapper", context).not(".static").length > 0) {
        $(".tabs-wrapper")
          .not(".static")
          .each(function () {
            var tabsWrapper = $(this);
            var tabsContentWrapper = $(tabsWrapper).next(
              ".tab-content-wrapper"
            );

            $(tabsWrapper)
              .find(".tab a")
              .click(function () {
                $(tabsWrapper).find(".active-tab").removeClass("active-tab");
                $(tabsWrapper)
                  .find(".active-tab-parent")
                  .removeClass("active-tab-parent");
                $(this).addClass("active-tab");
                $(this).parent().addClass("active-tab-parent");
                $(tabsContentWrapper)
                  .children(".tab-content-active")
                  .removeClass("tab-content-active")
                  .hide();
                var tabContentHref = $(this).attr("href").split("#");
                var tabContentID = "#" + tabContentHref[1];
                //#tab-x-content
                $(tabContentID).fadeIn().addClass("tab-content-active");
                var resizeEvent = new Event("resize");

                window.dispatchEvent(resizeEvent);
                return false;
              });

            var firstTab = $(tabsWrapper).find(".tab:first a");
            var firstTabID = firstTab.attr("href");

            // This fixes ajax reloads from grabbing the first tab again.
            $(tabsWrapper)
              .find(".tab a")
              .each(function () {
                if ($(this).hasClass("active-tab")) {
                  firstTab = $(this);
                }
              });

            // You can set the active tab via php if you send in drupal settings.
            // Helpful for form submits and shit.
            if (Drupal.settings.relaTabs !== undefined) {
              firstTabID = Drupal.settings.relaTabs.activeTab;
              firstTab = $(tabsWrapper).find(
                '.tab a[href="' + firstTabID + '"]'
              );
              firstTab.click();
              Drupal.settings.relaTabs = undefined;
            }

            // if ?active_tab=xxxx is a query in the url.
            var active_tab_query = getUrlParameter("active_tab") || "";
            if (active_tab_query) {
              $("body").once("active_tab_in_url", function () {
                // get rid of the param so a reload doesnt fire it again.
                // This will also remove it from history so they can go back to the
                // original tab @see https://stackoverflow.com/a/22753103

                var newURL = location.href.split("?")[0];
                window.history.replaceState("object", document.title, newURL);
                firstTabID = "#" + active_tab_query;
                firstTab = $(tabsWrapper).find(
                  '.tab a[href="' + firstTabID + '"]'
                );
              });
            }

            $(firstTab, context).parent().addClass("active-tab-parent");
            $(firstTab, context).addClass("active-tab");
            $(tabsContentWrapper).children(".tab-content").hide();
            // Make sure this isn't a link
            if (firstTabID[0] != "/") {
              $(firstTabID, context).addClass("tab-content-active");
            }
          });
      }

      // WL Onboard Sidebar.
      if (Drupal.settings.wlOnboardStatus !== undefined) {
        if ($("#wl-show-onboard-link").length) {
          setTimeout(function () {
            $("#wl-show-onboard-link", context).click();
          }, 1000);
        }
      }
    }, // End Attach Behaves
  }; //End Function

  Drupal.behaviors.TogglePricing = {
    attach: function (context, settings) {
      $(".toggle-yearly", context).click(function () {
        $(".price-toggle-wrapper").removeClass("prices-show-monthly");
        $(".price-toggle-wrapper").addClass("prices-show-yearly");
        return false;
      });

      $(".toggle-monthly", context).click(function () {
        $(".price-toggle-wrapper").removeClass("prices-show-yearly");
        $(".price-toggle-wrapper").addClass("prices-show-monthly");
        return false;
      });

      $(".price-toggle a", context).click(function () {
        $(".price-toggle-wrapper .active-toggle").removeClass("active-toggle");
        $(".price-toggle-wrapper .active-toggle-parent").removeClass(
          "active-toggle-parent"
        );
        $(this).addClass("active-toggle");
        $(this).parent().addClass("active-toggle-parent");
        return false;
      });

      $(".product-frequency-switch a").click(function () {
        $(".product-frequency-switch a.active").removeClass("active");
        $(this).addClass("active");
        var activeFreq = $(this).attr("data-toggle-group");
        $(".show").removeClass("show");
        $("." + activeFreq).addClass("show");
        return false;
      });

      // Pricing quick pick.
      $(".product-frequency-switch a.active").each(function () {
        var activeFreq = $(this).attr("data-toggle-group");
        $("." + activeFreq).addClass("show");
      });
    },
  };

  Drupal.behaviors.ToggleGroups = {
    attach: function (context, settings) {
      $(".toggle-trigger").unbind("click");
      $(".toggle-trigger").click(function () {
        if ($(this).hasClass("toggle-on")) {
          // Remove everything with toggle-on class.
          $(".toggle-on").removeClass("toggle-on");
        } else {
          // Remove everything with toggle-on class.
          $(".toggle-on").removeClass("toggle-on");

          // Toggle class toggle-on for this trigger.
          $(this).toggleClass("toggle-on");

          // Add toggle-on class to extra element.
          if ($(this).attr("data-target").length) {
            var target = $(this).attr("data-target");
            $(target).addClass("toggle-on");
          }
        }
      });

      $(".toggle-first", context).find(".toggler:first").addClass("active");

      $(".toggler", context).click(function () {
        var showToggle = $(this).attr("id") + "-toggled";
        if ($(this).hasClass("toggler-single")) {
          $(this).removeClass("active");
        } else {
          $(".toggler.active").removeClass("active");
        }

        $(".toggled.toggled-active").removeClass("toggled-active");
        $(this).addClass("active");

        $("#" + showToggle + ".toggled").addClass("toggled-active");
      });
    },
  };

  Drupal.behaviors.DropdownToggle = {
    attach: function (context, settings) {
      $(".dropdown-link-wrapper .dropdown-link-title-wrapper", context).on(
        "click",
        function () {
          if ($(this).parent().hasClass("collapsed")) {
            $("body")
              .find(".dropdown-link-wrapper.open .dropdown-link-title-wrapper")
              .each(function () {
                dropdown_close($(this));
              });
            dropdown_open($(this));
          } else {
            dropdown_close($(this));
          }
        }
      );

      function dropdown_open(drop_item) {
        // $(drop_item).parent().find('.dropdown-link-content-wrapper').slideDown();
        $(drop_item).parent().removeClass("collapsed");
        $(drop_item).parent().addClass("open");
        $(drop_item).find(".fa-chevron-down").addClass("fa-rotate-180");
      }

      function dropdown_close(drop_item) {
        // $(drop_item).parent().find('.dropdown-link-content-wrapper').slideUp('fast');
        $(drop_item).parent().removeClass("open");
        $(drop_item).parent().addClass("collapsed");
        $(drop_item).find(".fa-chevron-down").removeClass("fa-rotate-180");
      }

      // Show-hide toggler.
      $(".show-hide-toggle-trigger").click(function (e) {
        e.stopImmediatePropagation();
        if ($(this).hasClass("showing")) {
          $(this).next(".show-hide-toggle-content").slideUp();
        } else {
          $(this).next(".show-hide-toggle-content").slideDown();
        }

        $(this).toggleClass("showing");
        $(this).parent().toggleClass("showing");
      });
    },
  };

  Drupal.behaviors.LiveSearch = {
    attach: function (context, settings) {
      $("#property-search", context).keyup(function () {
        var filter = $(this).val();
        $(".search-icon-default").hide();
        $(".property-list-row").each(function () {
          if ($(this).text().search(new RegExp(filter, "i")) < 0) {
            $(this).fadeOut();
          } else {
            $(this).show();
          }
        });
      });

      $(".search-icon-clear", context).click(function () {
        $("#property-search").val("");
        $(".search-icon-default").show();
        $(".property-list-row").each(function () {
          $(this).show();
        });
      });

      $(".prefill-btn", context).click(function () {
        var prefillText = $(this).data("prefill-text");

        // If the button option is already clicked then clear the filter.
        if ($("#property-search").val() == prefillText) {
          $("#property-search").val("");
          $(".search-icon-default").show();
          $(".property-list-row").each(function () {
            $(this).show();
          });
        } else {
          $("#property-search").val(prefillText);
          $(".search-icon-default").hide();
          $(".property-list-row").each(function () {
            if ($(this).text().search(new RegExp(prefillText, "i")) < 0) {
              $(this).fadeOut();
            } else {
              $(this).show();
            }
          });
        }
      });
    },
  };

  Drupal.behaviors.Leadfilter = {
    attach: function (context, settings) {
      var noResults = function () {
        if (
          $(
            ".view-display-id-block_property_leads .view-content",
            context
          ).children(":visible").length == 0
        ) {
          $(".view-display-id-block_property_leads .view-footer").show();
        } else {
          $(".view-display-id-block_property_leads .view-footer").hide();
        }
      };

      $("[id^='edit-ratings-']", context).change(function () {
        var countChecked = $("[id^='edit-ratings-']").filter(":checked").length;

        if (countChecked == 0) {
          $(".views-row-lead").show();
          noResults();
        } else {
          $(".views-row-lead").hide();
          $("[id^='edit-ratings-']:checked", context).each(function () {
            var filterVal = $(this).attr("value");
            console.log(filterVal);
            $(".rating-" + filterVal).show();
          });
          noResults();
        }
      });
    },
  };

  Drupal.behaviors.LeadToggle = {
    attach: function (context, settings) {
      $(".lead-toggle", context).click(function () {
        var leadID = $(this).attr("id") + "-content";
        var rowID = $(this).attr("id") + "-row";

        if ($("." + leadID).hasClass("lead-toggle-content-open")) {
          $("." + leadID).slideUp(function () {
            $("." + leadID).removeClass("lead-toggle-content-open");
            $("." + leadID).addClass("lead-toggle-content-closed");
            $("." + rowID).removeClass("views-row-lead-open");
          });
        }

        if ($("." + leadID).hasClass("lead-toggle-content-closed")) {
          $("." + rowID).addClass("views-row-lead-open");
          $("." + leadID).slideDown(function () {
            $("." + leadID).removeClass("lead-toggle-content-closed");
            $("." + leadID).addClass("lead-toggle-content-open");
          });
        }
      });
    },
  };

  Drupal.behaviors.RelazProviders = {
    attach: function (context, settings) {
      $(".field-name-field-agency-whitelabel-domain input").keyup(function () {
        $(".edit-wl-domain").text($(this).val());
      });

      $(".whitelabel-modal-trigger", context).click(function () {
        $("#whitelabel-modal").fadeIn("slow");
        $("body").addClass("overlay-open");
      });

      $(".whitelabel-modal-close", context).click(function () {
        $("#whitelabel-modal").fadeOut("slow");
        $("#whitelabel-modal").html("");
        $("body").removeClass("overlay-open");
      });
    },
  };

  Drupal.behaviors.RelazPhotoProcessing = {
    attach: function (context, settings) {
      $(".status-check-link", context).each(function () {
        var $this = $(this);
        var delay = $this.data("delay");
        var count = $this.data("count");

        // Click this once to get it going, then the delay will
        // click on the interval up to the count limit.
        $this.click();
        $progressBar = $(".progress-bar");
        if (!$progressBar.length) {
          var noBarInterval = setInterval(function () {
            if (count > 0) {
              $this.click();
              //console.log(count);
            } else {
              clearInterval(noBarInterval);
              //console.log('done');
            }

            count--;
          }, delay);
        } else {
          //return
          var progress = parseInt($progressBar.prop("style")["width"]);
          var increase = 100 / count + 3;
          var interval = setInterval(function () {
            if (!$progressBar.length) {
              clearInterval(interval);
            }

            if (count > 0) {
              $this.click();
              //console.log(count);
            } else {
              clearInterval(interval);
              //console.log('done');
            }
            count--;
          }, delay);
        }
      });
    },
  };

  Drupal.behaviors.EditableAutoSave = {
    attach: function (context, settings) {
      // $('.property-photo-manage-grid .editablefield-item').blur(function(){
      //   var id = $(this + 'textarea').attr('id');
      //   var idParts = id.split("-");
      //   //edit-field-property-image-description-1-field-property-image-description-und-0-value
      //   $('#edit-field-property-image-description-' + idParts[5] + '-actions-submit').click();
      //   console.log(idParts[5]);
      // });
    },
  };

  // Drupal.behaviors.RelaYoutubeModal = {
  //   attach: function(context, settings) {
  //     var uploadingCookie = $.cookie('ytInProgress', true);
  //     if (uploadingCookie == true) {
  //       console.log('hhhhaie')
  //     }
  //   }
  // }

  Drupal.behaviors.AutoFileUpload = {
    attach: function (context, settings) {
      $("form").delegate("input.form-file", "change", function () {
        var target = $(this).next('button[type="submit"]');
        target.mousedown();
      });
    },
  };

  Drupal.behaviors.radioActive = {
    attach: function (context, settings) {
      $(".form-type-radio input", context).each(function () {
        if ($(this).is(":checked")) {
          $(this).parent().addClass("radio-active");
        }
      });

      $(".form-type-radio input", context).click(function () {
        $(this)
          .closest(".form-radios")
          .find(".form-type-radio.radio-active")
          .removeClass("radio-active");
        $(this).parent().addClass("radio-active");
      });
    },
  };

  Drupal.behaviors.scheduleBooking = {
    attach: function (context, settings) {
      $.each(
        $("#rela_property_book_showing_form-wrapper .alert-messages-wrapper"),
        function () {
          $(".initial-wrapper").removeClass("active");
          $(".finish-wrapper").addClass("active");
        }
      );

      $("#rela_property_book_showing_form-wrapper .btn-showing-next").unbind(
        "click"
      );
      $("#rela_property_book_showing_form-wrapper .btn-showing-next").click(
        function () {
          $initWrapper = $(this).closest(".initial-wrapper");
          $finishWrapper = $initWrapper.next(".finish-wrapper");

          $inputs = $initWrapper.find(".radio-active");
          if ($inputs.length == 3) {
            var displayDate = $.datepicker.formatDate(
              "DD, MM d, yy",
              new Date(
                $(".form-item-appointment-date .radio-active input").val()
              )
            );
            $(this).datepicker("destroy");

            $("#rela_property_book_showing_form-wrapper .date-info").remove();
            var dateInfo =
              '<div class="date-info text-center">' +
              '<div class="date-type text-capitalize">' +
              $(".form-item-appointment-type .radio-active label").text() +
              "</div>" +
              '<div class="date-date h4">' +
              displayDate +
              "</div>" +
              '<div class="date-time h5">' +
              $(".form-item-preferred-time .radio-active label").text() +
              "</div>" +
              "</div>";
            $finishWrapper.remove(".date-info");
            $finishWrapper.prepend(dateInfo);

            $initWrapper.removeClass("active");
            $finishWrapper.addClass("active");
            $(".book-showing-back").show();
          } else {
            $("#booking-request-error").text(
              "Please choose an Appointment Type, Date, and Preferred Time"
            );
          }
        }
      );

      $(".book-showing-back").unbind("click");
      $(".book-showing-back").click(function () {
        $("#booking-request-error").text("");
        $(this).hide();
        $(".finish-wrapper").removeClass("active");
        $(".initial-wrapper").addClass("active");
        $("#rela_property_book_showing_form-wrapper .btn-showing-next").show();
      });
    },
  };

  Drupal.behaviors.Owlz = {
    attach: function (context, settings) {
      $(".form-item-appointment-date .form-radios").owlCarousel({
        items: 3,
        nav: true,
        navText: [
          '<div class="fa fa-angle-left"></div>',
          '<div class="fa fa-angle-right"></div>',
        ],
        // nestedItemSelector: 'form-type-radio',
      });

      if ($(".view-owl-pricing-table").length > 0) {
        var owl = $(
          ".view-owl-pricing-table .view-content",
          context
        ).owlCarousel({
          loop: false,

          navText: [
            '<span class="fa fa-chevron-left"></span>',
            '<span class="fa fa-chevron-right"></span>',
          ],
          pagination: false,

          responsive: {
            // breakpoint from 0 up
            0: {
              items: 1,
              stagePadding: 0,
              loop: true,
              nav: true,
              center: true,
              touchDrag: true,
              mouseDrag: true,
            },
            // breakpoint from 480 up
            480: {
              items: 1,
              loop: true,
              nav: true,
              center: true,
              stagePadding: 0,
              touchDrag: true,
              mouseDrag: true,
            },
            // breakpoint from 768 up
            768: {
              items: 3,
              stagePadding: 0,
              //touchDrag: false,
              mouseDrag: false,
            },
          },
        });
      }
    },
  };

  Drupal.behaviors.OwlzPropertyGallery = {
    attach: function (context, settings) {
      if ($(".property-gallery--owl-full").length > 0) {
        var owl = $(
          ".property-gallery--owl-full .view-content",
          context
        ).owlCarousel({
          loop: false,
          items: 1,
          nav: true,
          margin: 0,
          navText: [
            '<span class="icon icon-arrow-67"></span>',
            '<span class="icon icon-arrow-68"></span>',
          ],
          pagination: false,
          video: true,
        });
      }
    },
  };

  Drupal.behaviors.OwlzVideoGallery = {
    attach: function (context, settings) {
      if ($(".video-gallery-tabbed").length > 0) {
        var owl = $(".video-gallery-tabbed .view-content", context).owlCarousel(
          {
            // loop: true,
            items: 1,
            thumbs: true,
            // thumbsPrerendered: true,
            thumbContainerClass: "owl-thumbs",
            thumbItemClass: "owl-thumb-item",
          }
        );
      }
    },
  };

  Drupal.behaviors.DashmenuToggle = {
    attach: function (context, settings) {
      // $('.dashmenu-toggle').sidr({
      //   name: 'sidr-left',
      //   source: '#dashboard-left-nav'
      // });

      $(".dashmenu-toggle", context).click(function () {
        if ($("body").hasClass("sidemenu-open")) {
          $("body").removeClass("sidemenu-open");
        } else {
          $("body").addClass("sidemenu-open");
        }
      });

      if (typeof breaky !== "undefined") {
        breaky.at("md", function () {
          $("body").removeClass("sidemenu-open");
        });

        breaky.above("md", function () {
          $("body").addClass("sidemenu-open");
        });

        breaky.at("xs", function () {
          $("body").removeClass("sidemenu-open");
        });
      }

      // var open = false;
      // var duration = 400;

      // // if(settings.DashmenuToggle === undefined){
      // //   // Do nothing.
      // //   console.log('pong');
      // // }
      // // else {
      // //   // this is reset when a user taps a property link from the sidebar menu.
      // //   // rela_property_manage_load_property();
      // //   open = settings.DashmenuToggle.sideBarOpen;

      // // }

      //   $('.pane-dashboard-main-content', context).click(function(){
      //     if ($('body').hasClass('fuck')) {
      //       if(open == true){
      //        closeMenu();
      //       }
      //     }

      //   });

      //   $('.dashmenu-toggle', context).click(function(){
      //     if ($('body').hasClass('fuck')) {
      //      if (open == false ) {
      //         openMenu();
      //       }
      //     }

      //   });

      // breaky.below("xs", function(){
      //   closeMenu();
      //   $('body').addClass('fuck');
      // });
      // breaky.at("sm", function(e){
      //   $('body').removeClass('fuck');
      //   openMenu();

      // });

      // function openMenu() {
      //   $('#dashboard-left-nav').animate({"left": "0px"}, 100, function(){open = true });
      //   $('#dashboard-left-submenu').animate({"left": "0px"}, duration, function(){/*Animation complete */  });
      // }

      // function closeMenu() {
      //   $('#dashboard-left-nav').animate({"left": "-255px"}, 100, function(){open = false  });
      //   $('#dashboard-left-submenu').animate({"left": "-300px"}, duration, function(){ /*Animation complete */ });
      // }
    },
  };

  Drupal.behaviors.LogoResizer = {
    attach: function (context, settings) {
      //var logo = $('.field-name-field-property-logo-reference img');
      // $(logo).resizable({
      //   maxHeight: 195,
      //   maxWidth: 350,
      //   minHeight:50,
      //   minWidth: 50,
      //   aspectRatio: true,
      //   stop: function(event, ui) {
      //     console.log(ui.size.height);
      //     console.log(ui.size.width);
      //   }
      // });
      // $(logo).draggable({
      //   containment: ".field-name-field-property-logo-reference",
      //   stop: function( event, ui ) {
      //      console.log(ui.position.left);
      //      console.log(ui.position.top);
      //   }
      // });
    },
  };

  Drupal.behaviors.FlyerLogoResizer = {
    attach: function (context, settings) {
      $(".flyer-scale-wrapper", context).each(function () {
        setTimeout(function () {
          $("body").addClass("flyer-scale-wrapper-loaded");
        }, 700);
      });

      var nid = "";
      var pid = "";
      var coordsHWTL = [];
      var logoImg = $(".demo-logo img");
      var container = $(".logo-wrapper");

      var maxImgW = 395;
      var maxImgH = 130;
      var zoomScale = 1;
      var containerArray = [];

      function getLogoBounds() {
        maxImgH = $(".logo-wrapper").css("height");
        maxImgW = $(".logo-wrapper").css("width");
      }

      function getZoomScale() {
        var obj = $(".flyer-scale-wrapper-loaded .flyer-scale-wrapper");
        var transformMatrix =
          obj.css("-webkit-transform") ||
          obj.css("-moz-transform") ||
          obj.css("-ms-transform") ||
          obj.css("-o-transform") ||
          obj.css("transform");
        var matrix = transformMatrix.replace(/[^0-9\-.,]/g, "").split(",");
        if (matrix[0] == matrix[3] && matrix[0] != 0) {
          zoomScale = matrix[0];
        }
      }

      // Ajax call after resize or drag has stopped to save coords into database
      // order of xy === hw, xy === tl
      function saveCoords(x, y, type) {
        x = x || 0;
        y = y || 0;
        if (type === "hw") {
          coordsHWTL[0] = Math.floor(x);
          coordsHWTL[1] = Math.floor(y);
        }
        if (type === "tl") {
          coordsHWTL[2] = Math.floor(x);
          coordsHWTL[3] = Math.floor(y);
        }
        var url = "/relajax/nojs/marketing/logo-pos/" + pid + "/" + nid;
        $.ajax({
          url: url,
          type: "POST",
          data: {
            coords: coordsHWTL,
          },
        });
      }

      // Options for the resizable initialization includes autosave
      var resizeOpt = {
        containment: ".logo-wrapper",
        grid: [2, 1],
        maxHeight: maxImgH,
        maxWidth: maxImgW,
        minHeight: 25,
        minWidth: 25,
        aspectRatio: true,
        stop: function (event, ui) {
          $h = ui.size.height;
          $w = ui.size.width;
          if (zoomScale != 1) {
            $h *= zoomScale;
            $w *= zoomScale;
          }
          if (typeof saveTime !== "undefined") {
            clearTimeout(saveTime);
          }
          saveTime = setTimeout(saveCoords($h, $w, "hw"), 2000);
        },
        resize: function (event, ui) {
          if (zoomScale != 1) {
            var changeWidth = ui.size.width - ui.originalSize.width;
            var newWidth = (ui.originalSize.width + changeWidth) / zoomScale;

            var changeHeight = ui.size.height - ui.originalSize.height;
            var newHeight = (ui.originalSize.height + changeHeight) / zoomScale;

            ui.size.width = newWidth;
            ui.size.height = newHeight;
          }
        },
      };

      // Options for the draggable initialization
      var dragOpt = {
        containment: ".logo-wrapper",
        stop: function (event, ui) {
          $t = ui.position.top / zoomScale;
          $l = ui.position.left / zoomScale;
          if ($t < 0) {
            $t = 0;
          }
          if ($l < 0) {
            $l = 0;
          }
          if (zoomScale != 1) {
            $t *= zoomScale;
            $l *= zoomScale;
          }
          if (typeof saveTime !== "undefined") {
            clearTimeout(saveTime);
          }
          saveTime = setTimeout(saveCoords($t, $l, "tl"), 2000);
        },
        drag: function (event, ui) {
          if (zoomScale != 1) {
            var contWidth = container.width(),
              contHeight = container.height();
            ui.position.left = Math.max(
              0,
              Math.min(
                ui.position.left / zoomScale,
                contWidth - ui.helper.width()
              )
            );
            ui.position.top = Math.max(
              0,
              Math.min(
                ui.position.top / zoomScale,
                contHeight - ui.helper.height()
              )
            );
          }
        },
      };

      $("#image-adjust", context).click(function () {
        if (!$("body").hasClass("image-editor")) {
          $("body").toggleClass("image-editor");
        }

        getLogoBounds();
        getZoomScale();

        nid = $(this).attr("data-nid");
        pid = $(this).attr("data-pid");

        // Initializes Resizable and Draggable in one go
        $(logoImg)
          .resizable(resizeOpt)
          .parent(".ui-wrapper")
          .draggable(dragOpt);

        // Saves coords to array after converting them into integers
        var coordsDict = $(".demo-logo .ui-wrapper").css([
          "height",
          "width",
          "top",
          "left",
        ]);
        coordsHWTL = Object.keys(coordsDict).map(function (key) {
          return parseInt(coordsDict[key]);
        });
      });

      $("#image-save", context).click(function () {
        $(logoImg)
          .resizable("destroy")
          .parent(".ui-wrapper")
          .draggable("destroy");
        $("body").toggleClass("image-editor");
      });

      $.fn.resetForAjax = function () {
        if ($("body").hasClass("image-editor")) {
          $(logoImg)
            .resizable("destroy")
            .parent(".ui-wrapper")
            .draggable("destroy");
          $("body").toggleClass("image-editor");
        }
      };
    },
  };

  Drupal.behaviors.contactCardForm = {
    attach: function (context, settings) {
      $(".field-name-field-user-headshot .droppable-browse-button").text(
        "Add Photo"
      );
    },
  };

  Drupal.behaviors.screenWidth = {
    attach: function (context, settings) {
      if (typeof breaky !== "undefined") {
        breaky.at("xs", function () {
          removeWidthClasses();
          $("body").addClass("screen-width-xs").trigger("screenXs");
        });

        breaky.at("sm", function () {
          removeWidthClasses();
          $("body").addClass("screen-width-sm").trigger("screenSm");
        });

        breaky.at("md", function () {
          removeWidthClasses();
          $("body").addClass("screen-width-md").trigger("screenMd");
        });
        breaky.at("lg", function () {
          removeWidthClasses();
          $("body").addClass("screen-width-lg").trigger("screenLG");
        });
      }

      function removeWidthClasses() {
        $("body").removeClass(function (index, css) {
          return (css.match(/(^|\s)screen-width-\S+/g) || []).join(" ");
        });
      }
    },
  };

  Drupal.behaviors.relaPhotosGrid = {
    attach: function (context, settings) {
      // Re-number images.
      $(".draggableviews-grid-property_images-sort_block").unbind("sortstop");
      $(".draggableviews-grid-property_images-sort_block").on(
        "sortstop",
        function (e, ui) {
          $this = $(this);
          if ($this.find(".views-row .views-field-counter")) {
            var count = 0;
            $this.find(".views-row").each(function () {
              count += 1;
              $(this).find(".views-field-counter .field-content").text(count);
            });
          }
        }
      );

      // Favoriting images.
      $(".views-field-field-image-favorite a").unbind("click");
      $(".views-field-field-image-favorite a").on("click", function (e) {
        e.preventDefault();

        var enabled = $(this).hasClass("favorite-1");
        if (enabled) {
          $(this).removeClass("favorite-1").addClass("favorite-0");
        } else {
          $(this).removeClass("favorite-0").addClass("favorite-1");
        }

        $.post($(this).attr("href"));
      });
    },
  };

  Drupal.behaviors.relaClipboard = {
    attach: function (context, settings) {
      $(".clip-btn", context).each(function () {
        $(this).tooltip({
          trigger: "click",
          placement: "right",
        });

        var clipboard = new Clipboard(this);

        clipboard.on("success", function (e) {
          $(e.trigger)
            .attr("data-original-title", "Copied!")
            .tooltip("show")
            .attr("disabled", "disabled");

          setTimeout(function () {
            $(e.trigger).tooltip("hide").removeAttr("disabled");
          }, 3000);
        });

        clipboard.on("error", function (e) {
          $(e.trigger).attr("data-original-title", "Error!").tooltip("show");
          setTimeout(function () {
            $(e.trigger).tooltip("hide").removeAttr("disabled");
          }, 5000);
        });
      });
    },
  };

  // Drupal.behaviors.resizeVideo = {
  //   attach: function(context, settings) {
  //     $('body.property-template-focal', context).once('video-embed', function(){
  //     var playerID = '.player iframe';
  //     var wrapper = '#photos';
  //     function vRescale(){
  //       var w = $(wrapper).width()+200,
  //           h = $(wrapper).height()+200;

  //       if (w/h > 16/9){
  //         $(playerID).width(w).height(w/16*9);
  //         $(playerID).css({'left': '0px'});
  //       }
  //       else {
  //         $(playerID).width(h/9*16).height(h);
  //         $(playerID).css({'left': -($(playerID).outerWidth()-w)/2});
  //       }
  //     } // End viemo rescale
  //     $(window).on('load resize', function(){

  //       vRescale();
  //     });
  //   }); // End once
  //   }
  // }

  Drupal.behaviors.MTOptionToolbarDraggable = {
    attach: function (context, settings) {
      if ($(".mt-option-select-wrapper").length > 0) {
        $(".mt-option-select-wrapper").owlCarousel({
          autoWidth: true,
          items: 1,
          nav: true,
          navText: [
            '<div class="pe-7s-angle-left"></div>',
            '<div class="pe-7s-angle-right"></div>',
          ],
        });
      }
    },
  };

  Drupal.behaviors.relaVtourShow = {
    attach: function (context, settings) {
      if ($(".vtour-overlay-trigger").length > 0) {
        $(".vtour-overlay-trigger").click(function () {
          $(this).addClass("vtour-open");
          $vtour = $(this).find("iframe");
          var src = $vtour.attr("src");
          if (~src.indexOf("matterport.com")) {
            $vtour.attr("src", src + "&play=1");
          }
        });
      }
    },
  };

  Drupal.behaviors.propertyContentOverlay = {
    attach: function (context, settings) {
      var content = false;

      $(".property-overlay-link a", context)
        .not(".property-overlay-link-photos a")
        .click(function () {
          $("body").removeClass("show-photos-full-bg");
          if (content && content == $(this).attr("href")) {
            return false;
          }
          content = $(this).attr("href");
          if ($("#property-overlay").hasClass("overlay-in")) {
            $("#property-overlay").animate(
              {
                top: "100%",
              },
              300,
              function () {
                $("#property-overlay").css({
                  top: "0",
                });
                animateIn(content, false);
              }
            );
            setTimeout(function () {
              //animateIn(content, false);
            }, 1000);
            return false;
          } else {
            animateIn(content, true);
            return false;
          }
        });

      $(".property-overlay-close", context).click(function () {
        $("#property-overlay").animateCss("fadeOutDown");
        $("#property-details").animate(
          {
            left: 0 + "px",
          },
          500,
          function () {
            //Animation complete
            $("#property-overlay").removeClass("overlay-in");
          }
        );

        $("#property-price-mobile").animate(
          {
            left: 0 + "px",
          },
          800
        );
        content = false;
        return false;
      });

      function animateIn(content, init) {
        $(".property-overlay-content").removeClass("active");
        $(content).addClass("active");
        $("#property-overlay").animateCss("fadeInUp");
        if (init) {
          $("#property-details").animate(
            {
              left: -480 + "px",
            },
            200,
            function () {
              //Animation complete
            }
          );
          $("#property-price-mobile").animate(
            {
              left: -480 + "px",
            },
            500
          );
        }

        $("#property-overlay").addClass("overlay-in");
      }

      $(".show-photos-full-bg a", context).click(function () {
        $("body").toggleClass("show-photos-full-bg");
        $("#property-details").animate(
          {
            left: -480 + "px",
          },
          300
        );
        $("#property-price-mobile").animate(
          {
            left: -480 + "px",
          },
          500
        );
        $("#property-overlay").animateCss("fadeOutDown");
        $("#property-overlay").removeClass("overlay-in");
        content = false;
        return false;
      });
    },
  };

  Drupal.behaviors.additionalSeats = {
    attach: function (context, settings) {
      function showSelectedProduct() {
        $("#purchase-seats-form .additional-seats-product", context).addClass(
          "hidden"
        );

        var currentId = $("#purchase-seats-form .form-select", context).val();
        $("#purchase-seats-form .product-" + currentId).removeClass("hidden");
      }

      if ($("#purchase-seats-form", context).length) {
        showSelectedProduct();
        $("#purchase-seats-form .form-select", context).change(function () {
          showSelectedProduct();
        });
      }
    },
  };

  Drupal.behaviors.relaCalculateDays = {
    attach: function (context, settings) {
      // Calculate the days between 2 date fields.
      if ($(".calculate-date-trigger", context).length) {
        relaCalculateDaysBetweenDates();
        $(".calculate-date-trigger input", context).change(function () {
          relaCalculateDaysBetweenDates();
        });
      }

      function relaCalculateDaysBetweenDates() {
        var wrappers = $(
          ".calculate-date-trigger .form-type-date-popup",
          context
        );
        var startDate = new Date(wrappers.first().find("input:first").val());
        var endDate = new Date(wrappers.last().find("input:first").val());

        var diff = new Date(endDate - startDate);
        var days = Math.floor(diff / 1000 / 60 / 60 / 24);
        days += 1;

        if ($(".calculate-date-value", context).length) {
          var multiplier = $(".calculate-date-multiplier", context).text() || 1;
          days = days * multiplier;
          if (days < 0) {
            days = 0;
          }
          $(".calculate-date-value", context).text(days);
        }

        return days;
      }
    },
  };

  Drupal.behaviors.relaAutocomplete = {
    attach: function (context, settings) {
      if ($(".rela-autocomplete").length) {
        var path = "/" + $(".rela-autocomplete").attr("rela_autocomplete_path");
        $(".rela-autocomplete input").keyup(function () {
          var string = $(this).val();
          $.get(path + "/" + string, function (data) {
            if (data.length) {
            }
          });
        });
      }
    },
  };

  Drupal.behaviors.lazyVideo = {
    attach: function (context, settings) {
      $("video.lazy source", context).each(function () {
        var sourceFile = $(this).attr("data-src");
        $(this).attr("src", sourceFile);
        var video = this.parentElement;
        video.load();
        video.play();
      });

      $("video.hover-lazy", context)
        .once()
        .click(function () {
          var $playing = $("video.hover-lazy.active");
          if ($playing.length > 0) {
            $playing.get(0).pause();
            $playing.removeClass("active");
          }

          var sourceFile = $(this).find("source").attr("data-src");

          $(this).find("source").attr("src", sourceFile);
          if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            console.log("fua");
            var exampleVideo = $(this);
            exampleVideo.load();
            exampleVideo.get(0).play();
          }
        });
    },
  };

  Drupal.behaviors.relaLazyImage = {
    attach: function (context, settings) {
      $("img.rela-lazy", context).each(function () {
        if (!$(this).hasClass("img-processed")) {
          var target = $(this);
          $("<img/>")
            .attr("src", $(this).data("src"))
            .on("load", function () {
              $(this).remove(); // prevent memory leaks as @benweet suggested
              target
                .attr("src", target.data("src"))
                .addClass("img-processed")
                .removeClass("rela-lazy");
            });
        }
      });

      $(".lazy-bg", context).each(function () {
        if (!$(this).hasClass("img-processed")) {
          var target = $(this);
          target
            .css("background-image", "url(" + target.data("src") + ")")
            .addClass("img-processed");
        }
      });
    },
  };

  Drupal.behaviors.videoTabs = {
    attach: function (context, settings) {
      $(".video-tabs .tab", context).click(function () {
        var sourceFile = $(this).attr("data-src");
        $("video").attr("src", sourceFile);
        var video = "#video-tab_video";
        $(".video-tabs .tab.active").removeClass("active");
        $(this).addClass("active");
        // video.load();
        // video.play();
      });
    },
  };

  Drupal.behaviors.relaAgentDiscounts = {
    attach: function (context, settings) {
      // var discounts = Drupal.settings.relaAgentDiscounts || '';
      // if (discounts.data !== undefined) {
      //   var arr = $(discounts.data)[0];
      //   $('.form-item-quantity input').change(function() {
      //     var quantity = parseInt($(this).val());
      //     $.each(arr, function(percent, value) {
      //       if (quantity >= value.min && quantity <= value.max) {
      //         console.log(percent);
      //         return false;
      //       }
      //     })
      //   })
      // }
    },
  };

  Drupal.behaviors.relaSliders = {
    attach: function (context, settings) {
      if ($("#thumb-size-slider").length) {
        var current =
          parseInt($(".view-property-images .views-row").css("width")) - 100;

        $("#thumb-size-slider").slider({
          min: 0,
          max: 200,
          step: 50,
          values: [current],
          slide: function (e, ui) {
            var rows = $(".view-property-images .views-row");
            $(rows).css("width", 100 + ui.value + "px");
            $(rows).css("height", "auto");

            if (ui.value < 50) {
              $(rows).addClass("row-sm");
            } else {
              $(rows).removeClass("row-sm");
            }
          },
          change: function (e, ui) {
            var rows = $(".view-property-images .views-row");
            $(rows).css(
              "height",
              $(".view-property-images .views-row-first").css("height")
            );
          },
        });
      }

      // Remove the stupid Click to Edit text on property image editable fields.
      if ($(".views-field-field-property-image-description").length) {
        $(".views-field-field-property-image-description")
          .find(".editablefield-edit")
          .html("");

        // Blur textareas.
        $(".page-property-edit-photos", context).on("mousedown", function (e) {
          if (!$(e.target).hasClass("form-textarea")) {
            $("textarea:focus").blur();
          }
        });
      }

      $(".views-field-field-property-image-description textarea", context).on(
        "focus",
        function () {
          var nid = $(this).closest(".views-row").attr("data-nid");
          localStorage.setItem(nid, $(this).val());
        }
      );

      $(".views-field-field-property-image-description textarea", context)
        .once()
        .on("blur", function () {
          $viewsRow = $(this).closest(".views-row");
          var nid = $viewsRow.attr("data-nid");
          var orig = localStorage.getItem(nid);
          if ($(this).val() != orig) {
            $viewsRow.find(".form-submit").click();
          }
        });
    },
  };

  Drupal.behaviors.closeDiv = {
    attach: function (context, settings) {
      $(".close-div").click(function () {
        var divID = $(this).attr("data-close-div");
        $(divID).animateCss("slideOutUp", function () {
          $(divID).addClass("hidden");
        });
        return false;
      });
    },
  };

  Drupal.behaviors.getParamAjaxCallbacks = {
    attach: function (context, settings) {
      // Show order confirmation modal. Doing this because the users are bouncing
      // from order.wldomain.com to sites.wldomain.com, and our normal overlay
      // messages (session based) don't crossover.
      //
      var WLOrderConfirm = getUrlParameter("wl_order_confirm") || "";
      if (WLOrderConfirm) {
        $("body").once("openOrderConfirmation", function () {
          // get rid of the param so a reload doesnt fire it again.
          // This will also remove it from history so they can go back to the
          // original tab @see https://stackoverflow.com/a/22753103

          var newURL = location.href.split("?")[0];
          window.history.replaceState("object", document.title, newURL);
          relaAjaxLink(
            "/relajax/wl-commerce/nojs/order-success-modal/" + WLOrderConfirm
          );
        });
      }
    },
  };

  Drupal.behaviors.relaHotspots = {
    attach: function (context, settings) {
      $(document).mousedown(function (e) {
        if ($("body").hasClass("page-property-edit-floorplans")) {
          var container = $(
            "#mini-panel-property_edit_docs_floorplans .view-header.current-active"
          );

          if ($(e.target).hasClass("hotspot")) {
            return;
          }
          if ($(e.target).parent().hasClass("hotspot")) {
            return;
          }

          // If the target of the click isn't the container nor a descendant of
          // the container.
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass("current-active");
            $(".view-display-id-hotspots .view-content").removeClass(
              "disabled"
            );
            $(".hotspot.active").removeClass("active");
          }
        }
      });
      // This is for dragging existing hotspots on floorplan
      var spotDraggableOptions = function () {
        return {
          containment: ".hotspot-map",
          start: function (e, ui) {
            var id = $(this).attr("data-nid");
            $(
              ".hotspot-map-wrapper .active, .view-display-id-hotspots .active"
            ).removeClass("active");
            $(this).addClass("active");
            setActive(this);
          },

          stop: function (e, ui) {
            var id = ui.helper.attr("data-nid");

            var left = parseInt($(this).css("left"));
            var top = parseInt($(this).css("top"));

            var mapWidth = parseInt($(".hotspot-map").width());
            var mapHeight = parseInt($(".hotspot-map").height());

            var newLeft = (left / mapWidth) * 100;
            var newTop = (top / mapHeight) * 100;

            $(this).css("left", newLeft + "%");
            $(this).css("top", newTop + "%");

            var floorplanId = $(this)
              .closest(".floorplan-hotspot")
              .attr("data-nid");
            $.post("/relajax/nojs/docs/" + floorplanId + "/save-hotspot", {
              image: id,
              left: newLeft,
              top: newTop,
            });
          },
        };
      };

      /// Set active class on hotspot click.
      $(window).scroll(function () {
        $(".hotspot-photos-wrapper").fadeOut();
        $(".hotspot-viewer .hotspot.active").removeClass("active");
      });
      $(".hotspot-viewer", context).on("click", function (event) {
        // don't close if clicking a spot
        if (
          $(event.target).hasClass("hotspot") ||
          $(event.target).parent().hasClass("hotspot")
        ) {
          return false;
        }
        $(".hotspot-photos-wrapper").fadeOut();
        $(".hotspot-viewer .hotspot.active").removeClass("active");
      });
      $(".hotspot-viewer .hotspot", context).hover(function () {
        var hotspot = $(this);

        if ($(this).hasClass("active")) {
          return;
        }
        $(".hotspot-photos-wrapper").fadeIn();
        setActive(hotspot);
        var uri = $(hotspot).attr("data-uri");
        //$('.current-image').attr('src', uri);
        $(".current-image").attr("src", uri);

        var layout = $(hotspot).attr("data-layout");
        $(".current-image")
          .removeClass("portrait")
          .removeClass("landscape")
          .addClass(layout);
        $(".hotspot-photos-wrapper")
          .removeClass("portrait")
          .removeClass("landscape")
          .addClass(layout);

        setHotspotDescription(hotspot);

        // return false;
      });

      $(".hotspot-editor .hotspot", context).hover(function () {
        var hotspot = $(this);
        if ($(this).hasClass("active")) {
          return;
        }
        setActive(hotspot);
      });
      // Remove active class on any click.
      $(".hotspot-map-wrapper, #dashboard-left-nav").click(function (e) {
        if (!$(e.target).hasClass("hotspot")) {
          // $('.hotspot-map-wrapper .active, .view-display-id-hotspots .active').removeClass('active');
        }
      });

      // Remove active class on close click.
      $(".hotspot-close").click(function () {
        $(
          ".hotspot-map-wrapper .active, .view-display-id-hotspots .active"
        ).removeClass("active");
      });

      // Set draggable.
      if ($(".hotspot.draggable").length) {
        $(".hotspot.draggable").draggable(spotDraggableOptions());

        // Colorpicker.
        $(".field-name-field-doc-hotspot-color .color_picker").on(
          "change",
          function () {
            var spotColor = $(this).css("background-color");
            var lastComma = spotColor.lastIndexOf(")");
            var opacityColor = spotColor.slice(0, lastComma) + ", 0.4)";
            $(
              ".floorplan-hotspot .hotspot-map-wrapper .hotspot-container .hotspot-map .circle"
            ).css("background-color", opacityColor);
            $(
              ".floorplan-hotspot .hotspot-map-wrapper .hotspot-container .hotspot-map .circle"
            ).css("border-color", spotColor);
            $(
              ".floorplan-hotspot .hotspot-map-wrapper .hotspot-container .hotspot-map .ringer"
            ).css("border-color", spotColor);
          }
        );
      }

      // This is for dragging images on to the floorplan
      if (Drupal.settings.relaHotspots !== undefined) {
        if (Drupal.settings.relaHotspots.floorplanDrag) {
          $(".view-display-id-property_image_select img").draggable({
            helper: "clone",
            appendTo: ".hotspot-map",
            stop: function (e, ui) {
              var id = ui.helper.attr("data-nid");

              var left = parseInt(ui.helper.css("left"));
              var top = parseInt(ui.helper.css("top"));

              var mapWidth = parseInt($(".hotspot-map").width());
              var mapHeight = parseInt($(".hotspot-map").height());

              var newLeft = (left / mapWidth) * 100;
              var newTop = (top / mapHeight) * 100;

              // If outside of bounds then put ti back.
              if (newLeft < 0) {
                newLeft = 5;
              }
              if (newLeft > 100) {
                newLeft = 95;
              }
              if (newTop < 0) {
                newTop = 5;
              }
              if (newTop > 100) {
                newTop = 95;
              }

              var spot = $("<div></div>")
                .addClass("hotspot draggable")
                .css({
                  left: newLeft + "%",
                  top: newTop + "%",
                  position: "absolute",
                });

              $(spot).attr(
                "data-image-description",
                ui.helper.attr("data-image-description")
              );
              $(spot).attr("data-layout", ui.helper.attr("data-layout"));
              $(spot).attr("data-nid", ui.helper.attr("data-nid"));
              $(spot).attr("data-uri", ui.helper.attr("data-uri"));
              $(spot).addClass("new");

              var inner = $("<span></span>").addClass("circle").css({
                border: "2px solid rgb(230, 0, 255)",
                backgroundColor: "rgba(230, 0, 255)",
              });
              $(spot).append(inner);

              // initialize da drag.
              //$(spot).draggable(spotDraggableOptions());

              $(".hotspot-map").append(spot);

              var floorplanId = $(".floorplan-hotspot").attr("data-nid");
              $.post("/relajax/nojs/docs/" + floorplanId + "/save-hotspot", {
                image: id,
                left: newLeft,
                top: newTop,
                add: true,
              }).done(function (data) {
                $("#floorplan-reload").click();
                $(".view-display-id-property_image_select img.image-nid-" + id)
                  .parent()
                  .addClass("used");
              });
            },
          });
        }
      }

      function setActive(hotspot) {
        $(".view-display-id-hotspots .view-content").addClass("disabled");
        $(".view-display-id-hotspots .view-header").addClass("current-active");
        var id = $(hotspot).attr("data-nid");
        $(
          ".hotspot-map-wrapper .active, .view-display-id-hotspots .active"
        ).removeClass("active");
        $(hotspot).addClass("active");
        //$('.views-row-' + id).addClass('active');
        var activeClone = $(".views-row-" + id + ":not(.cloned)")
          .clone("true")
          .addClass("cloned");
        $(".cloned").removeClass(".views-row-" + id);
        $("#hotspot-current").html(activeClone);
      }

      function setHotspotDescription(hotspot) {
        var description = $(hotspot).attr("data-image-description");
        if (description.length > 0) {
          $(".hotspot-photos-wrapper .img-description").removeClass("hidden");
          $(".hotspot-photos-wrapper .img-description").html(description);
        } else {
          $(".hotspot-photos-wrapper .img-description").addClass("hidden");
        }
      }
    },
  };
  Drupal.behaviors.btnToggleTarget = {
    attach: function (context, settings) {
      $(".btn-toggle-target", context).click(function () {
        var targetText = $(this).attr("data-target-text");
        var target = $(this).attr("data-target");
        var targetClass = $(this).attr("data-target-class");

        if ($(this).text() == targetText) {
          if ($(this).attr("data-target-original-text")) {
            $(this).html($(this).attr("data-target-original-text"));
          } else {
            $(this).html(
              '<i class="icon icon-arrow-left m-r-1 valign-sub"></i>Back'
            );
          }
        } else {
          if ($(this).attr("data-target-original-text")) {
            $(this).attr("data-target-original-text", $(this).text());
          }
          $(this).html(targetText);
        }

        $(target).toggleClass(targetClass);
      });
    },
  };

  Drupal.behaviors.socialSharePop = {
    attach: function (context, settings) {
      $(".social-share-link").click(function () {
        var url = $(this).attr("href");
        window.open(url, "Share", "width=640,height=320");
        return false;
      });
    },
  };

  Drupal.behaviors.matterportDemo = {
    attach: function (context, settings) {
      $(
        "#rela-matterport-add-demo-property-form input.matterport-id-input"
      ).blur(function () {
        var city = $(this).data("city");
        var state = $(this).data("state");
        var zip = $(this).data("zip");
        var street = $(this).data("street");

        $("input.thoroughfare").val(street);
        $("input.locality").val(city);
        $("select.state").val(state);
        $("input.postal-code").val(zip);
      });
    },
  };

  Drupal.behaviors.wlOrderForm = {
    attach: function (context, settings) {
      if ($(".page-booking-edit").length) {
        if ($(".wl-client-order-steps").length) {
          $(".wl-client-order-form-wrapper").affix({
            offset: {
              top:
                $(".wl-client-order-steps").offset().top +
                $(".wl-client-order-steps").outerHeight(true),
            },
          });
        }
      }

      $(".address-autocomplete input.address-autocomplete-field").focus(
        function () {
          $(this).attr("autocomplete", "nogo");
        }
      );

      $("#calendar-select-wrapper .cal-select-day", context).on(
        "mousedown",
        function () {
          var $el = $(".selected-day-display");
          if ($el.is(":visible")) {
            var goto = $el.offset().top - 145;
            $("html, body").animate(
              {
                scrollTop: goto,
              },
              1000
            );
          }
        }
      );

      // $('.address-autocomplete input.address-autocomplete-field', context).each(function() {
      //   if (!$(this).hasClass('pac-target-input')) {
      //     console.log('hit');
      //     window.initAddressAutocomplete();
      //   }
      // });
    },
  }; // End wlOrderForm.

  Drupal.behaviors.googlePlaces = {
    attach: function (context, settings) {
      if (Drupal.settings.relaGooglePlaces !== undefined) {
        setTimeout(function () {
          $(".address-autocomplete input.address-autocomplete-field").once(
            function () {
              initAddressAutocomplete();
            }
          );
        }, 100);
      }
    },
  };

  Drupal.behaviors.primaryNav = {
    attach: function (context, settings) {
      //https://stackoverflow.com/a/7385673
      $(document).mouseup(function (e) {
        var container = $("#primary-front-nav");
        if ($(".primary-link.active").length > 0) {
          // if the target of the click isn't the container nor a descendant of the container
          if (!container.is(e.target) && container.has(e.target).length === 0) {
            $(".primary-link.active").removeClass("active");
          }
        }
      });

      $(".primary-link .drop-link").click(function (e) {
        if ($(this).parent().hasClass("active")) {
          $(this).parent().removeClass("active");
          $("#primary-front-nav").removeClass("affix");
        } else {
          $(".primary-link.active").removeClass("active");
          $(this).parent().addClass("active");
          $("#primary-front-nav").addClass("affix");
        }
        e.preventDefault();
      });
    },
  };

  window.initAddressAutocomplete = function () {
    $(".pac-container").remove();

    var $field = $(".address-autocomplete input.address-autocomplete-field");
    // var id = $field.attr('id');
    var element = $field[0];

    var currentCountry =
      $(".address-autocomplete .commerce-stripe-country :selected").val() ||
      false;
    var options = {
      types: ["geocode"],
    };

    if (currentCountry) {
      options.componentRestrictions = { country: currentCountry.toLowerCase() };
    }
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    autocomplete = new google.maps.places.Autocomplete(element, options);

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    autocomplete.setFields(["address_component"]);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    autocomplete.addListener("place_changed", fillInAddressAutocomplete);

    // setTimeout(function() {
    //   $field.attr('autocomplete', 'nogo');
    // }, 2000);
  };

  window.fillInAddressAutocomplete = function () {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    $(".address-autocomplete input").val("");

    var componentForm = {
      street_number: {
        type: "short_name",
        drupalField: "thoroughfare",
      },
      route: {
        type: "long_name",
        drupalField: "thoroughfare",
      },
      locality: {
        type: "long_name",
        drupalField: "locality",
      },
      administrative_area_level_1: {
        type: "short_name",
        drupalField: "state",
      },
      country: {
        type: "short_name",
        drupalField: "country",
      },
      postal_code: {
        type: "short_name",
        drupalField: "postal-code",
      },
    };

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    var addy = {};
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (typeof componentForm[addressType] !== "undefined") {
        var formType = componentForm[addressType];

        if ($(".address-autocomplete ." + formType.drupalField).length) {
          var val = place.address_components[i][formType.type];
          if (addressType == "route") {
            val =
              $(".address-autocomplete ." + formType.drupalField).val() +
              " " +
              val;
          }
          $(".address-autocomplete ." + formType.drupalField).val(val);
          addy[formType.drupalField] = val;
        }
      }
    }

    var storeID = 0;
    if (Drupal.settings.relaWLCommerce !== undefined) {
      if (Drupal.settings.relaWLCommerce.wlStoreID) {
        storeID = Drupal.settings.relaWLCommerce.wlStoreID;
      }
    }
    $.post("/relajax/nojs/global/g-address", {
      place: addy,
      storeID: storeID,
    }).done(function (data) {
      if (data !== 0) {
        console.log(data);
        $(".field-name-field-wl-order-price-based-range select").val(
          data.range
        );
        $(".field-name-field-property-square-feet input").val(data.sqft);
      }
    });
  };

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  window.geolocateAddressAutocomplete = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  };

  Drupal.behaviors.frontNav = {
    attach: function (context, settings) {
      $("#primary-front-nav .outside-menu-toggle").click(function () {
        $("#nav-menu-toggle").toggleClass("open");
        $("#nav-links").toggleClass("open");
      });
    },
  };

  Drupal.behaviors.relaWLOFakeSubmit = {
    attach: function (context, settings) {
      $(".sudo-submit").on("click", function (event) {
        var formID = $(this).attr("data-form-id");
        var submitName = $(this).attr("data-submit-name");
        // console.log(formID);
        // console.log(submitName);
        // console.log(formID + ' .form-submit[name="' + submitName + '"]');
        $(formID + ' .form-submit[name="' + submitName + '"').mousedown();
      });
    },
  };

  Drupal.behaviors.colorPickerFancy = {
    attach: function (context, settings) {
      //form-colorpicker
      $(".color-picker-fancy input.form-colorpicker", context).change(
        function () {
          var colorVal = $(this).val();
          var target = $(this).attr("name");

          $("#target-" + target + ".color-preview svg").attr(
            "fill",
            "#" + colorVal
          );
          $("#target-" + target + ".color-preview .color-value").text(
            "#" + colorVal
          );
        }
      );
    },
  };

  Drupal.behaviors.formDropdown = {
    attach: function (context, settings) {
      $(document).on("click", ".dropdown-form .dropdown-menu", function (e) {
        e.stopPropagation();
        //$('.date-filters .btn-group').stopPropagation();
      });
      $(document).on("click", ".ui-datepicker-header", function (e) {
        e.stopPropagation();
      });
    },
  };
})(jQuery, Drupal); /*})'"*/ /*})'"*/
(function ($, Drupal, undefined) {
  Drupal.behaviors.RelazPropertySideMenu = {
    attach: function (context, settings) {
      $(".sidemenu-toggle", context).click(function () {
        var identifier = "#" + $(this).attr("data-menu-id");
        $(identifier).toggleClass("side-menu-open");
      });

      $(".side-menu-over a", context).click(function () {
        $(".side-menu-open").removeClass("side-menu-open");
      });

      $(".side-menu-under", context).click(function () {
        $(".side-menu-open").removeClass("side-menu-open");
      });

      $("body", context).on("screenMd", function () {
        $(".side-menu-open").removeClass("side-menu-open");
      });
    },
  };

  Drupal.behaviors.RelazPropertyOutsideMenu = {
    attach: function (context, settings) {
      $(".outside-menu-toggle", context).click(function () {
        if ($("body").hasClass("outside-menu-open")) {
          $("body").removeClass("outside-menu-open");
          var menuData = $(this).attr("menu-data");
          setTimeout(function () {
            $("#outside-menu").removeClass("outside-menu-" + menuData);
          }, 1500);
        } else {
          $("#outside-menu .menu-content-item").hide();
          $("body").addClass("outside-menu-open");
          var menuData = $(this).attr("menu-data");
          $("#outside-menu").addClass("outside-menu-" + menuData);
          $(".menu-content-item" + ".menu-content-" + menuData).show();
        }
      });

      $("#property-nav-links li a", context).click(function () {
        $("body.outside-menu-open").removeClass("outside-menu-open");
      });
      // $('#outside-menu a:not(.auto-click)', context).click(function() {
      //   $('body').toggleClass('outside-menu-open');
      // })
    },
  };

  Drupal.behaviors.RelazMainMobileMenu = {
    attach: function (context, settings) {
      $(".close-nav", context).click(function () {
        $("#nav-mobile").removeClass("mobile-nav-open");
      });

      $("#nav-mobile .menu a", context).click(function () {
        $("#nav-mobile").removeClass("mobile-nav-open");
      });

      $(".open-nav", context).click(function () {
        $("#nav-mobile").addClass("mobile-nav-open");
      });
    },
  };
})(jQuery, Drupal); /*})'"*/ /*})'"*/
(function ($) {
  /**
   * Override Views prototype function so it can recognize Bootstrap AJAX pagers.
   * Attach the ajax behavior to each link.
   */
  Drupal.views.ajaxView.prototype.attachPagerAjax = function () {
    this.$view
      .find(
        "ul.pager > li > a, th.views-field a, .attachment .views-summary a, ul.pagination li a"
      )
      .each(jQuery.proxy(this.attachPagerLinkAjax, this));
  };
})(jQuery); /*})'"*/ /*})'"*/
/**
 * @file
 *
 * Overrides for ctools modal.
 *
 */

(function ($) {
  /**
   * Override CTools modal show function so it can recognize the Bootstrap modal classes correctly
   */
  Drupal.CTools.Modal.show = function (choice) {
    var opts = {};

    if (choice && typeof choice == "string" && Drupal.settings[choice]) {
      // This notation guarantees we are actually copying it.
      $.extend(true, opts, Drupal.settings[choice]);
    } else if (choice) {
      $.extend(true, opts, choice);
    }

    var defaults = {
      modalTheme: "CToolsModalDialog",
      throbberTheme: "CToolsModalThrobber",
      animation: "show",
      animationSpeed: "fast",
      modalSize: {
        type: "scale",
        width: 0.8,
        height: 0.8,
        addWidth: 0,
        addHeight: 0,
        // How much to remove from the inner content to make space for the
        // theming.
        contentRight: 25,
        contentBottom: 45,
      },
      modalOptions: {
        opacity: 0.55,
        background: "#fff",
      },
    };

    var settings = {};
    $.extend(true, settings, defaults, Drupal.settings.CToolsModal, opts);

    if (
      Drupal.CTools.Modal.currentSettings &&
      Drupal.CTools.Modal.currentSettings != settings
    ) {
      Drupal.CTools.Modal.modal.remove();
      Drupal.CTools.Modal.modal = null;
    }

    Drupal.CTools.Modal.currentSettings = settings;

    var resize = function (e) {
      // When creating the modal, it actually exists only in a theoretical
      // place that is not in the DOM. But once the modal exists, it is in the
      // DOM so the context must be set appropriately.
      var context = e ? document : Drupal.CTools.Modal.modal;

      if (Drupal.CTools.Modal.currentSettings.modalSize.type == "scale") {
        var width =
          $(window).width() *
          Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height =
          $(window).height() *
          Drupal.CTools.Modal.currentSettings.modalSize.height;
      } else {
        var width = Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = Drupal.CTools.Modal.currentSettings.modalSize.height;
      }

      // Use the additionol pixels for creating the width and height.
      $("div.ctools-modal-dialog", context).css({
        width:
          width + Drupal.CTools.Modal.currentSettings.modalSize.addWidth + "px",
        height:
          height +
          Drupal.CTools.Modal.currentSettings.modalSize.addHeight +
          "px",
      });
      $("div.ctools-modal-dialog .modal-body", context).css({
        width:
          width -
          Drupal.CTools.Modal.currentSettings.modalSize.contentRight +
          "px",
        height:
          height -
          Drupal.CTools.Modal.currentSettings.modalSize.contentBottom +
          "px",
      });
    };

    if (!Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.modal = $(Drupal.theme(settings.modalTheme));
      if (settings.modalSize.type == "scale") {
        $(window).bind("resize", resize);
      }
    }

    resize();

    $(".modal-title", Drupal.CTools.Modal.modal).html(
      Drupal.CTools.Modal.currentSettings.loadingText
    );
    Drupal.CTools.Modal.modalContent(
      Drupal.CTools.Modal.modal,
      settings.modalOptions,
      settings.animation,
      settings.animationSpeed
    );
    $("#modalContent .modal-body").html(Drupal.theme(settings.throbberTheme));
  };

  /**
   * Provide the HTML to create the modal dialog in the Bootstrap style.
   */
  Drupal.theme.prototype.CToolsModalDialog = function () {
    var html = "";
    html += '  <div id="ctools-modal">';
    html += '    <div class="ctools-modal-dialog">';
    html += '      <div class="modal-content">';
    html += '        <div class="modal-header">';
    html +=
      '          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    html += '          <h4 id="modal-title" class="modal-title">&nbsp;</h4>';
    html += "        </div>";
    html += '        <div id="modal-content" class="modal-body">';
    html += "        </div>";
    html += "      </div>";
    html += "    </div>";
    html += "  </div>";

    return html;
  };

  /**
   * Provide the HTML to create a nice looking loading progress bar.
   */
  Drupal.theme.prototype.CToolsModalThrobber = function () {
    var html = "";
    html +=
      '  <div class="loading-spinner" style="width: 200px; margin: -20px 0 0 -100px; position: absolute; top: 45%; left: 50%">';
    html += '    <div class="progress progress-striped active">';
    html += '      <div class="progress-bar" style="width: 100%;"></div>';
    html += "    </div>";
    html += "  </div>";

    return html;
  };
})(jQuery); /*})'"*/ /*})'"*/
(function ($) {
  /**
   * Override Drupal's AJAX prototype beforeSend function so it can append the
   * throbber inside the pager links.
   */
  Drupal.ajax.prototype.beforeSend = function (xmlhttprequest, options) {
    // For forms without file inputs, the jQuery Form plugin serializes the form
    // values, and then calls jQuery's $.ajax() function, which invokes this
    // handler. In this circumstance, options.extraData is never used. For forms
    // with file inputs, the jQuery Form plugin uses the browser's normal form
    // submission mechanism, but captures the response in a hidden IFRAME. In this
    // circumstance, it calls this handler first, and then appends hidden fields
    // to the form to submit the values in options.extraData. There is no simple
    // way to know which submission mechanism will be used, so we add to extraData
    // regardless, and allow it to be ignored in the former case.
    if (this.form) {
      options.extraData = options.extraData || {};

      // Let the server know when the IFRAME submission mechanism is used. The
      // server can use this information to wrap the JSON response in a TEXTAREA,
      // as per http://jquery.malsup.com/form/#file-upload.
      options.extraData.ajax_iframe_upload = "1";

      // The triggering element is about to be disabled (see below), but if it
      // contains a value (e.g., a checkbox, textfield, select, etc.), ensure that
      // value is included in the submission. As per above, submissions that use
      // $.ajax() are already serialized prior to the element being disabled, so
      // this is only needed for IFRAME submissions.
      var v = $.fieldValue(this.element);
      if (v !== null) {
        options.extraData[this.element.name] = v;
      }
    }

    // Disable the element that received the change to prevent user interface
    // interaction while the Ajax request is in progress. ajax.ajaxing prevents
    // the element from triggering a new request, but does not prevent the user
    // from changing its value.
    $(this.element).addClass("progress-disabled").attr("disabled", true);

    // Insert progressbar or throbber.
    if (this.progress.type == "bar") {
      var progressBar = new Drupal.progressBar(
        "ajax-progress-" + this.element.id,
        eval(this.progress.update_callback),
        this.progress.method,
        eval(this.progress.error_callback)
      );
      if (this.progress.message) {
        progressBar.setProgress(-1, this.progress.message);
      }
      if (this.progress.url) {
        progressBar.startMonitoring(
          this.progress.url,
          this.progress.interval || 1500
        );
      }
      this.progress.element = $(progressBar.element).addClass(
        "ajax-progress ajax-progress-bar"
      );
      this.progress.object = progressBar;
      $(this.element).after(this.progress.element);
    } else if (this.progress.type == "throbber") {
      this.progress.element = $(
        '<div class="ajax-progress ajax-progress-throbber"><i class="glyphicon glyphicon-refresh glyphicon-spin"></i></div>'
      );
      // If element is an input type, append after.
      if ($(this.element).is("input")) {
        if (this.progress.message) {
          $(".throbber", this.progress.element).after(
            '<div class="message">' + this.progress.message + "</div>"
          );
        }
        $(this.element).after(this.progress.element);
      }
      // Otherwise inject it inside the element.
      else {
        if (this.progress.message) {
          $(".throbber", this.progress.element).append(
            '<div class="message">' + this.progress.message + "</div>"
          );
        }
        $(this.element).append(this.progress.element);
      }
    }
  };
})(jQuery); /*})'"*/ /*})'"*/
