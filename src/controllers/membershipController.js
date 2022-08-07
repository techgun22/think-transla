const Membership = require("../models/membership.model");
const { lookup } = require('geoip-lite');
const countryToCurrency = require( 'country-to-currency' );
const CC = require('currency-converter-lt')
const getSymbolFromCurrency = require('currency-symbol-map')


exports.addMembership = (req, res) => {
    const { name, description, monthlyCost, numberOfClients } = req.body;
  
    const membership = new Membership(
        name.trim(),
        description.trim(),
        monthlyCost,
        numberOfClients
    );
    

    Membership.createMembership(membership, (err, data) => {
      if (err) {
        res.status(500).send({
          status: "error",
          message: err.message,
        });
      } else {
        res.status(201).send({
            status: "success",
            message: "Membership added successfully",
          });
      }
    });
  };

  exports.getMembership = (req, res) => {
    const { ID } = req.body;
   
    Membership.getMembershipById(ID, (err, data) => {
      res.status(201).send({
                status: "success",
                data: data,
              });
    });
  }

  exports.getMemberships = async(req, res) => {
    Membership.getMemberships(async(err, data) => {
        const ip = '49.37.200.152';
        let currencyConverter = new CC({from:"USD", to:countryToCurrency[ lookup(ip)["country"]] , amount:100, isDecimalComma:false});
        var converted=await currencyConverter.convert();
        var multiple=converted/100;
        var array = [];
        data.map((membership)=>{
          var updated=membership;
          updated['monthlyCost']=getSymbolFromCurrency(countryToCurrency[ lookup(ip)["country"]])+Math.ceil(membership['monthlyCost']*multiple / 10) * 10;
         array.push(updated);
        });
        res.status(201).send({
                  status: "success",
                  data: array
              });
      });
  }