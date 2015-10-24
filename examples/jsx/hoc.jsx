// Compare to hoc pattern: https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775

window.MyComponent = window.ReactOO.ReactBase.extend({
    onReactRender: function (reactInstance) {
        var self = this;
        if (!self.data) {
            return <div>Waiting...</div>;
        }

        return <div>{self.data}</div>;
    }
});

window.ComposedComponent = window.MyComponent.extend({
    init: function () {
        this._super();
        this.data = 'Hello';
    }
});