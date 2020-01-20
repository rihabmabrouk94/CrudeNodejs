module.exports = {
    validate_number: (val) => {
        return (val < 100);
    },

    validate_number_with_promise: (val) => {
        return new Promise(function (resolve, reject) {
            return resolve((val < 100));
            /* c-a-d on va faire ce traitement
            if (val < 100) {
                return resolve(true);
            } else {
                return resolve(true);
            }
             */
        });
    }
};
