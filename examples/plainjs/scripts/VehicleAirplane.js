(function () {
    // Class definitions. ReactOO requires class definition first just like you did in an OO way.

    window.Vehicle = window.ReactOO.ReactBase.extend({
        getReactDisplayName: function () {
            return 'Vehicle';
        },

        onReactRender: function (reactInstance) {
            var self = this;

            var text = self.methodC();

            return React.createElement('div', {}, text);
        },

        methodA: function () {
            console.log('Vehicle method A');
        },

        methodB: function () {
            console.log('Vehicle method B');
        },

        methodC: function () {
            return 'Vehicle method C';
        }
    });

    window.Airplane = window.Vehicle.extend({
        getReactDisplayName: function () {
            return 'Airplane';
        },

        methodC: function () {
            // Call this._super() to execute parent method.
            //this._super();
            return 'Airplane method C';
        }
    });

    var vehicle = new window.Vehicle();
    vehicle.render({}, '#vehicle');

    var airPlane = new window.Airplane();
    airPlane.render({}, '#airPlane');
})();