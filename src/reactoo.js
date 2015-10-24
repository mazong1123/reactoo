/** 
 * @description Simple JavaScript Inheritance
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

    /**
    * Base class for components.
    * For any component, please inherits from this class.
    */
    window.ReactOO.ReactBase = Class.extend({
        /**
        * Initializes an instance of window.ReactOO.ReactBase class.
        */
        init: function () {
            var self = this;
            self.component = self.createReactClass();
        },

        /**
        * Gets the setting object for react class.
        * The return value is a setting object, which will be internally used 
        * as the input parameter of React.createClass();
        * See the document to get in details of the default settings.
        * Override this method if you want to customize the settings.
        * @returns {object} React class settings object.
        */
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

                componentWillMount: function () {
                    return self.onReactComponentWillMount(this);
                },

                componentDidMount: function () {
                    return self.onReactComponentDidMount(this);
                },

                componentWillReceiveProps: function (nextProps) {
                    return self.onReactComponentWillReceiveProps(this, nextProps);
                },

                shouldComponentUpdate: function (nextProps, nextState) {
                    return self.onReactShouldComponentUpdate(this, nextProps, nextState);
                },

                componentWillUpdate: function (nextProps, nextState) {
                    return self.onReactComponentWillUpdate(this, nextProps, nextState);
                },

                componentDidUpdate: function (prevProps, prevState) {
                    return self.onReactComponentDidUpdate(this, prevProps, prevState);
                },

                componentWillUnmount: function () {
                    return self.onReactComponentWillUnmount(this);
                },

                handleSubmit: function (e) {
                    return self.onReactHandleSubmit(this, e);
                },

                handleClick: function (e) {
                    return self.onReactHandleClick(this, e);
                }
            };
        },

        /**
         * Create and returen a React class. Calling React.createClass() internally.
         * @returns {ReactClass} An instance of ReactClass.
         */
        createReactClass: function () {
            var self = this;

            return React.createClass(self.getReactClassSettings());
        },

        /**
         * Get the react display of the component.
         * Override this method to return your component name.
         * @returns {string} The display name of react class.
         */
        getReactDisplayName: function () {
            return 'BaseComponent';
        },

        /**
         * Override this method to provide render logic.
         * @param {type} reactInstance The same as "this" in the react.createClass() method. For example,
         * you can access props via reactInstance.props.
         */
        onReactRender: function (reactInstance) {
        },

        /**
         * Override this method to provide initial state object.
         * @param {reactClass} reactInstance The same as "this" in the react.createClass() method. For example,
         * you can access props via reactInstance.props.
         * @returns {object} initial state object.
         */
        onReactGetInitialState: function (reactInstance) {
            return null;
        },

        /**
         * 
         * @param {type} reactInstance The same as "this" in the react.createClass() method. For example,
         * you can access props via reactInstance.props.
         */
        onReactComponentWillMount: function (reactInstance) {
        },

        /**
         * 
         * @param {type} reactInstance
         */
        onReactComponentDidMount: function (reactInstance) {
        },

        onReactComponentWillReceiveProps: function (reactInstance, nextProps) {
        },

        onReactShouldComponentUpdate: function (reactInstance, nextProps, nextState) {
        },

        onReactComponentWillUpdate: function (reactInstance, nextProps, nextState) {
        },

        onReactComponentDidUpdate: function (reactInstance, prevProps, prevState) {
        },

        onReactComponentWillUnmount: function (reactInstance) {
        },

        onReactHandleSubmit: function (reactInstance, e) {
        },

        onReactHandleClick: function (reactInstance, e) {
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