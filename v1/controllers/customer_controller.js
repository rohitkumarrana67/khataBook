const { customerCreateValidator,getCustomerByIdValidator,updateCustomerByIdValidator } = require("../validators/customer_validators");
const errorBuilder = require("../entity_builders/error_builder");
const Service = require("../services/customer_service");

module.exports = {

    createCustomer: (req, res) => {
        customerCreateValidator(req.body).then(data => {
            const CustomerService = new Service(data, req.user);
            return CustomerService.create(data);
        }).then(data => {
            res.status(201).send(data);
        }).catch(error => {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)

            })
        })

    },
    getCustomers: (req, res) => {
        const CustomerService = new Service();
        CustomerService.getCustomers(req.user).then(data => {
            res.status(201).send(data);
        }).catch(error => {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)

            })
        });
    },
    getCustomerById: (req, res) => {
        getCustomerByIdValidator(req.params).then(data => {
            const CustomerService = new Service(data, req.user);
            return CustomerService.getCustomerById(data);
        }).then(data => {
            res.status(201).send(data);
        }).catch(error => {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)

            })
        })
  

    },
    updateCustomerById: (req, res) => {
        updateCustomerByIdValidator(req).then(validated_data => {
            const req_data = {
                params : validated_data[0].value,
                body : validated_data[1].value
            }
            const CustomerService = new Service(req_data,req.user);
            return CustomerService.updateCustomerById();
        })
        .then(data => {
            res.status(201).send(data);
        }).catch(error => {
            errorBuilder(error).then((error) => {
                res.status(error.code).send(error.body)

            })
        })


    },
    deleteCustomerByid: (req, res) => {


    },
    deleteAllCustomer: (req, res) => {

    }

}