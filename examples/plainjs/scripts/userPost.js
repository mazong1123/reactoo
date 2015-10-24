// Compare to hoc pattern: http://browniefed.com/blog/2015/05/02/react/

(function () {
    window.UserPost = window.ReactOO.ReactBase.extend({
        onReactRender: function (reactInstance) {
            return React.createElement('div', {}, this.username + ' created this');
        }
    });

    window.ActiveUserPost = window.UserPost.extend({
        init: function () {
            this._super();
            this.username = 'Jason';
        }
    });

    var c = new window.ActiveUserPost();
    c.render({}, '#content');
})();
