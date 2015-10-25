# reactoo
Add OO features to react.js including inheritance, overriding and etc.

##Usage

ReactOO provides a base class **window.ReactOO.ReactBase**. Every component class should be inherited from it.
```javascript
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
    
    var button = new window.ButtonClass();
    button.render({ text: 'Button' }, '#normalButton');
```

Note we can override **getButtonProperty** to customize the button in subclass. Subclass example:
```javascript
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
    
    var styledButton = new window.StyledButtonClass();
    styledButton.render({ text: 'Styled Button' }, '#styledButton');

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
    
    var styledButtonWithClickHandler = new window.StyledButtonWithClickHandlerClass();
    styledButtonWithClickHandler.render({ text: 'Styled Button With Click Handler' }, '#styledButtonWithClickHandler');
```

Please find more examples in the /example folder. Thanks.

## Test Support
[BrowserStack](http://www.browserstack.com/) - A great online testing service just makes your life much more easier.
