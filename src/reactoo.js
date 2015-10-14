(function () {
    'use strict'

    window.ReactOO = {};

    window.ReactOO.ReactBase = Class.extend({
        init: function () {
            var self = this;
            self.component = self.createReactClass();
        },

        createReactClass: function () {
            var self = this;

            return React.createClass({
                displayName: self.getReactDisplayName(),

                render: function () {
                    return self.onReactRender(this);
                },

                getInitialState: function () {
                    return self.onReactGetInitialState(this);
                },

                componentDidMount: function () {
                    return self.onReactComponentDidMount(this);
                }
            });
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