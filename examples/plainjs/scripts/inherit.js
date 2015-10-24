(function () {
    // Class definitions. ReactOO requires class definition first just like you did in an OO way.

    window.ButtonClass = window.ReactOO.ReactBase.extend({
        getReactDisplayName: function () {
            return 'Button';
        },

        onReactRender: function (reactInstance) {
            var self = this;

            var text = reactInstance.props.text;

            return React.createElement('button', self.getButtonProperty(reactInstance), text);
        },

        getButtonProperty: function (reactInstance) {
            return {};
        }
    });

    window.StyledButtonClass = window.ButtonClass.extend({
        getReactDisplayName: function () {
            return 'StyledButton';
        },

        getButtonProperty: function (reactInstance) {
            var self = this;
            var property = self._super();

            property.className = 'nice-button';

            return property;
        }
    });

    window.StyledButtonWithClickHandlerClass = window.StyledButtonClass.extend({
        getReactDisplayName: function () {
            return 'StyledButtonWithClickHandler';
        },

        getButtonProperty: function (reactInstance) {
            var self = this;
            var property = self._super();

            property.onClick = reactInstance.handleClick;

            return property;
        },

        onReactHandleClick: function (reactInstance, e) {
            e.preventDefault();

            alert('Clicked!');
        }
    });

    var button = new window.ButtonClass();
    button.render({ text: 'Button' }, '#normalButton');

    var styledButton = new window.StyledButtonClass();
    styledButton.render({ text: 'Styled Button' }, '#styledButton');

    var styledButtonWithClickHandler = new window.StyledButtonWithClickHandlerClass();
    styledButtonWithClickHandler.render({ text: 'Styled Button With Click Handler' }, '#styledButtonWithClickHandler');
})();