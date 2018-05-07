var register = {
    helpers: {
        shortAddress: function(address) {
            if (address.length > 36) {
                address = address.substring(0, 35) + '...';
            }
            return address;
        }
    }
};

module.exports = register.helpers; 