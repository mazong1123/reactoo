// Compare to hoc pattern: http://browniefed.com/blog/2015/05/02/react/

window.UserPost = window.ReactOO.ReactBase.extend({
    onReactRender: function (reactInstance) {
        var self = this;
        return  (
            <div>
                {self.username} created this.
            </div>
        );
    }
});

window.ActiveUserPost = window.UserPost.extend({
    init: function () {
        this._super();
        this.username = 'Jason';
    }
});