// Compare to hoc pattern: https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775

(function () {
    window.MyComponent = window.ReactOO.ReactBase.extend({
        onReactRender: function (reactInstance) {
            var self = this;
            if (!self.data) {
                return React.createElement('div', {}, 'Waiting...');
            }

            return React.createElement('div', {}, self.data);
        }
    });

    window.ComposedComponent = window.MyComponent.extend({
        init: function () {
            this._super();
            this.data = 'Hello';
        }
    });

    var c = new window.ComposedComponent();
    c.render({}, '#content');
})();
