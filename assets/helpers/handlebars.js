var register = {
    helpers: {
        shortAddress: function(address) {
            if (address.length > 36) {
                address = address.substring(0, 35) + '...';
            }
            return address;
        },
        shortDescription: function(desc) {
            if (desc.length > 150) {
                desc = desc.substring(0, 149) + '...';
            }
            return desc;
        }
    }
};

module.exports = register.helpers; 