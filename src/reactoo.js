/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function () {
    var initializing = false, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function () { };

    // Create a new Class that inherits from this class
    Class.extend = function (prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" &&
              typeof _super[name] == "function" && fnTest.test(prop[name]) ?
              (function (name, fn) {
                  return function () {
                      var tmp = this._super;

                      // Add a new ._super() method that is the same method
                      // but on the super-class
                      this._super = _super[name];

                      // The method only need to be bound temporarily, so we
                      // remove it when we're done executing
                      var ret = fn.apply(this, arguments);
                      this._super = tmp;

                      return ret;
                  };
              })(name, prop[name]) :
              prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();

(function () {
    'use strict'

    window.ReactOO = {};

    window.ReactOO.ReactBase = Class.extend({
        init: function () {
            var self = this;
            self.component = self.createReactClass();
        },

        getReactClassSettings: function () {
            var self = this;

            return {
                displayName: self.getReactDisplayName(),

                render: function () {
                    return self.onReactRender(this);
                },

                getInitialState: function () {
                    return self.onReactGetInitialState(this);
                },

                componentDidMount: function () {
                    return self.onReactComponentDidMount(this);
                },

                handleSubmit: function (e) {
                    return self.onReactHandleSubmit(this, e);
                }
            };
        },

        createReactClass: function () {
            var self = this;

            return React.createClass(self.getReactClassSettings());
        },

        getReactDisplayName: function () {
        },

        onReactRender: function (reactInstance) {
        },

        onReactGetInitialState: function (reactInstance) {
            return null;
        },

        onReactComponentDidMount: function (reactInstance) {
        },

        onReactHandleSubmit: function (reactInstance, e) {
        },

        render: function (data, containerSelector) {
            var self = this;
            ReactDOM.render(React.createElement(self.component, data), document.querySelector(containerSelector));
        },

        getReactComponent: function () {
            var self = this;

            return self.component;
        }
    });
})();