(function () {
    // Class definitions. ReactOO requires class definition first just like you did in an OO way.

    window.CommentClass = window.ReactOO.ReactBase.extend({
        getReactDisplayName: function () {
            return 'Comment';
        },

        getReactClassSettings: function () {
            var self = this;
            var reactClassSettings = self._super();

            // Add rawMarkup property in this subclass. This is the inheritance benifit.
            reactClassSettings.rawMarkup = function () {
                var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
                return { __html: rawMarkup };
            };

            return reactClassSettings;
        },

        onReactRender: function (reactInstance) {
            var author = reactInstance.props.author;

            return React.createElement("div",
                {
                    className: "comment"
                },
                React.createElement("h2",
                {
                    className: "commentAuthor"
                }, author),
                React.createElement("span",
                {
                    dangerouslySetInnerHTML: reactInstance.rawMarkup()
                }));
        }
    });

    window.CommentListClass = window.ReactOO.ReactBase.extend({
        init: function () {
            var self = this;
            self._super();

            // Comment list contains comment component. Just initialize a CommentClass instance.
            self.comment = new window.CommentClass();
        },

        getReactDisplayName: function () {
            return "CommentList";
        },

        onReactRender: function (reactInstance) {
            var self = this;

            var commentNodes = reactInstance.props.data.map(function (commentData, index) {
                return (
                  // `key` is a React-specific concept and is not mandatory for the
                  // purpose of this tutorial. if you're curious, see more here:
                  // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
                  React.createElement(
                    self.comment.getReactComponent(), // We call getReactComponent() of the CommentClass instance which created in the constructor to get the underlying react component.
                    {
                        author: commentData.author,
                        key: index
                    },
                    commentData.text
                  )
                );
            });
            return React.createElement(
              "div",
              {
                  className: "commentList"
              },
              commentNodes
            );
        }
    });

    window.CommentFormClass = window.ReactOO.ReactBase.extend({
        getReactDisplayName: function () {
            return 'CommentForm';
        },

        onReactHandleSubmit: function (reactInstance, e) {
            e.preventDefault();

            var author = reactInstance.refs.author.value.trim();
            var text = reactInstance.refs.text.value.trim();
            if (!text || !author) {
                return;
            }
            reactInstance.props.onCommentSubmit(
                {
                    author: author,
                    text: text
                });
            reactInstance.refs.author.value = '';
            reactInstance.refs.text.value = '';
        },

        onReactRender: function (reactInstance) {
            return React.createElement('form',
                {
                    className: 'commentForm',
                    onSubmit: reactInstance.handleSubmit
                },
                React.createElement('input',
                {
                    type: 'text',
                    placeholder: 'Your name',
                    ref: 'author'
                }),
                React.createElement('input',
                {
                    type: 'text',
                    placeholder: 'Say something...',
                    ref: 'text'
                }),
                React.createElement('input',
                {
                    type: 'submit',
                    value: 'Post'
                }));
        }
    });

    window.CommentBoxClass = window.ReactOO.ReactBase.extend({
        init: function () {
            var self = this;
            self._super();

            self.commentList = new window.CommentListClass();
            self.commentForm = new window.CommentFormClass();
        },

        getReactDisplayName: function () {
            return 'CommentBox';
        },

        getReactClassSettings: function () {
            var self = this;
            var reactClassSettings = self._super();

            // Add loadCommentsFromServer property in this subclass. This is the inheritance benifit.
            reactClassSettings.loadCommentsFromServer = function () {
                $.ajax({
                    url: this.props.url,
                    dataType: 'json',
                    cache: false,
                    success: (function (data) {
                        this.setState({ data: data });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }).bind(this)
                });
            };

            reactClassSettings.handleCommentSubmit = function (comment) {
                var comments = this.state.data;
                var newComments = comments.concat([comment]);
                this.setState({ data: newComments });
                $.ajax({
                    url: this.props.url,
                    dataType: 'json',
                    type: 'POST',
                    data: comment,
                    success: (function (data) {
                        this.setState({ data: data });
                    }).bind(this),
                    error: (function (xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }).bind(this)
                });
            };

            return reactClassSettings;
        },

        onReactGetInitialState: function (reactInstance) {
            return {
                data: []
            };
        },

        onReactComponentDidMount: function (reactInstance) {
            reactInstance.loadCommentsFromServer();
            setInterval(reactInstance.loadCommentsFromServer, reactInstance.props.pollInterval);
        },

        onReactRender: function (reactInstance) {
            var self = this;

            return React.createElement(
                'div',
                {
                    className: 'commentBox'
                }, React.createElement('h1', null, 'Comments'),
                React.createElement(self.commentList.getReactComponent(),
                {
                    data: reactInstance.state.data
                }),
                React.createElement(self.commentForm.getReactComponent(),
                {
                    onCommentSubmit: reactInstance.handleCommentSubmit
                }));
        }
    });

    // Now let's initialize an instance of CommentBoxClass.
    var commentBox = new window.CommentBoxClass();
    commentBox.render({
        url: "api/comments.json",
        pollInterval: 2000
    }, '#content');
})();