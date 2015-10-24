// Compare to mixins and hoc pattern: https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750

window.ProfilePage = window.ReactOO.ReactBase.extend({
    init: function(stores){
        this.stores = stores;
    },

    getReactClassSettings: function () {
        var settings = this._super();
        settings.propTypes = {
            userId: PropTypes.number.isRequired
        };

        return settings;
    },

    getStateFromStores: function(props) {
        return {
            user: UserStore.get(props.userId)
        }
    },

    onReactRender: function (reactInstance) {
        var { user } = reactInstance.state;
        return <div>{user ? user.name : 'Loading'}</div>;
    }
});

window.UserProfilePage = window.ProfilePage.extend({
    init: function(stores) {
        this._super(stores);
    },

    getReactClassSettings: function () {
        var settings = this._super();
        settings.handleStoresChanged = function(){
            return self.onHandleStoresChanged(this);
        };

        return settings;
    },

    onReactGetInitialState: function(reactInstance) {
        return this.getStateFromStores(reactInstance.props);
    },
    
    componentDidMount(reactInstance) {
        this.stores.forEach(store =>
            store.addChangeListener(reactInstance.handleStoresChanged)
        );
        reactInstance.setState(this.getStateFromStores(reactInstance.props));
    },
    
    componentWillUnmount(reactInstance) {
        this.stores.forEach(store =>
            store.removeChangeListener(reactInstance.handleStoresChanged)
        );
    },

    onHandleStoresChanged(reactInstance) {
        if (reactInstance.isMounted()) {
            reactInstance.setState(this.getStateFromStores(reactInstance.props));
        }
    }
});