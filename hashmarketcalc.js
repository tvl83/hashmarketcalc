var hashmarketcalc = {

    page        : $('.page-header').html().split('>')[2].trim(),
    minimized   : false,

    setup     : function(){
        $('body')
            .append('<div id="dialog-message" title="About This Bookmarklet">\n    <p>\n        <small> \n            Created by Thomas Le @tvle83 on HashTalk.org<br />\n            I hope you find this useful! <br />\n            Contact me on HashTalk.org if you have any questions or suggestions. :) <br />\n            Donations Accepted at: 1EJzxjGVc7ZXTTm6ZGgGz99JV92UK5ubyQ\n        </small>\n    </p>\n</div>')
            .append('<div id="hashmarketcalc-container" style="padding:3px;position:fixed;bottom:10px;right:10px;z-index:1000;background-color: black;height: 370px; width:250px">\n    <button onClick="hashmarketcalc.showBTC()" id="hashmarketcalcShowBTC" class="btn-info">Show BTC Prices</button>    \n    <button style="color: #fff; float: right !important;background-color: #d9534f;border-color: #d43f3a;" onClick="hashmarketcalc.about()">About</button>\n    <button style="color: #fff; float: right !important;background-color: #d9534f;border-color: #d43f3a;" onClick="hashmarketcalc.minimize()">_</button>\n    <button style="color: #fff; float: right !important;background-color: #d9534f;border-color: #d43f3a;" onClick="hashmarketcalc.close()">X</button>\n    <br />\n    <form role="form">\n        <div class="form-group">\n            <label for="power" class="col-sm-12">Power (MH/GH):</label>\n            <input type="text" name="power" id="power" class="form-control" value="" title="" required="required" >\n        </div>\n        <div class="form-group">\n           <label for="perUnit" class="col-sm-12">Per Unit:</label>\n           <input type="text" name="perUnit" id="perUnit" class="form-control" value="" title="" required="required" >           \n        </div>\n        <div class="form-group">\n            <label for="total" class="col-sm-12">Total: (use this amount in the popup)</label>\n            <input type="text" name="total" id="total" class="form-control" value="" title="" disabled="disabled">\n        </div>\n        <p>\n            Seller Fee: <span id="sellerFee"></span>\n            <br/>\n            Seller Gets:<span id="sellerNet"></span>\n            <br/>\n            Buyer Fee: <span id="buyerFee"></span>\n            <br/>\n            Buyer Pays: <span id="buyerPay"></span>\n        </p>\n        </div>\n    </form>    \n</div>');
        hashmarketcalc.loadjQueryUI();
    },

    main        : function(){
        hashmarketcalc.setup();
    },

    about       : function(){
        $( "#dialog-message" ).dialog({
            modal: true,
            buttons: {
                Ok: function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    },

    showBTC     : function(){

        if(hashmarketcalc.page === 'Hash Market') {
            var bitcoin = parseFloat($('.balance-value').html().replace(',', ""));
            var dollars = parseFloat($('.balanceUSD-value').html().split('<') [0].replace(',', ""));

            var btcValue = (dollars / bitcoin).toString();
            btcValue = btcValue.substring(0, 6);

            var priceColumn = $('td:nth-child(3)');
            var unitPriceColumn = $('td:nth-child(4)');

            var priceTemp, unitTemp = 0.0;

            for(var i = 0; i< 100; i++){
                priceTemp = priceColumn[i].innerText.replace('$', '');
                priceTemp = priceTemp / btcValue;

                unitTemp = unitPriceColumn[i].innerText / btcValue;

                priceColumn[i].innerText = priceColumn[i].innerText + " ( BTC: " + priceTemp.toFixed(8) + " ) ";
                unitPriceColumn[i].innerText = unitPriceColumn[i].innerText + " ( BTC: " + unitTemp.toFixed(8) + " ) ";
            }
        }
    },
    /*
        This function adds jquery and jquery-ui and the associated CSS file to let me use the modal popup.
     */
    loadjQueryUI: function () {
        var src1 = "//code.jquery.com/jquery-1.10.2.js";
        $('<script>').attr('src', src1).appendTo('body');

        var src = "//code.jquery.com/ui/1.11.2/jquery-ui.js";
        $('<script>').attr('src', src).appendTo('body');

        var css = "//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css";
        $('<link>').attr('rel', 'stylesheet').attr('href',css).appendTo('body');
    },

    close       : function(){
        $('#dialog-message').remove();
        $('#hashmarketcalc-container').remove();
    },

    /*
        this function squishes the window down to 20px to hide it away and then shows it again when maximized.
     */
    minimize    : function(){
        if(!hashmarketcalc.minimized) {
            $('#hashmarketcalc-container').css('height','20px');
            hashmarketcalc.minimized = true;
        }
        else if(hashmarketcalc.minimized) {
            $('#hashmarketcalc-container').css('height','370px');
            hashmarketcalc.minimized = false;
        }
    }
};

hashmarketcalc.main();

$(document).ready(function(){
    var perUnit = $('#perUnit');
    var power = $('#power');
    var txtTotal = $('#total');
    var sellerFee = $('#sellerFee');
    var buyerFee= $('#buyerFee');
    var buyerPay = $('#buyerPay');
    var sellerNet = $('#sellerNet');

    perUnit.keyup(function() {
        calculate();
    });

    power.keyup(function(){
        calculate();
    });

    function calculate(){
        var afterFeeTotal = (parseFloat(power.val()) * perUnit.val()).toFixed(2);

        var total = afterFeeTotal / 1.05;

        txtTotal.val(total.toFixed(2));

        var fee = total * .05;

        buyerFee.text(fee.toFixed(2));
        sellerFee.text(fee.toFixed(2));

        sellerNet.text((total - fee).toFixed(2));
        buyerPay.text((total + fee).toFixed(2));

//
//        var sellFee = total * .05;
//
//        txtTotal.val(total);
//        sellerFee.text(sellFee.toFixed(2));
//
//        var buyFee = total * .05;
//        var buyTotal = parseFloat(buyFee) + parseFloat(total);
//
//        buyerFee.text(buyFee.toFixed(2));
//
//        buyerPay.text(buyTotal);
//
//        sellerNet.text((total - sellFee).toFixed(2));
    }
});