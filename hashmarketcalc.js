var hashmarketcalc = {

    page        : $('.page-header').html().split('>')[2].trim(),

    setup     : function(){
        $('body')
            .append('<div id="dialog-message" title="About This Bookmarklet">\n    <p>\n        <small> \n            Created by Thomas Le @tvle83 on HashTalk.org<br />\n            I hope you find this useful! <br />\n            Contact me on HashTalk.org if you have any questions or suggestions. :) <br />\n            Donations Accepted at: 19SxbN1odamj1THVsqW7BfpiCir1SsrFjP\n        </small>\n    </p>\n</div>')
            .append('<div id="hashmarketcalc-container" style="position:fixed;bottom:10px;right:10px;z-index:1000;background-color: black;height: 500px;">\n    <button onClick="hashmarketcalc.showBTC()" id="hashmarketcalcShowBTC" class="btn-info">Show BTC Prices</button>    \n    <button style="color: #fff; float: right !important;background-color: #d9534f;border-color: #d43f3a;" onClick="hashmarketcalc.about()">About</button>\n    <button style="color: #fff; float: right !important;background-color: #d9534f;border-color: #d43f3a;" onClick="hashmarketcalc.close()">X</button>\n    <br />\n    <form role="form">\n        <div class="form-group">\n            <label for="power" class="col-sm-2">Power (MH/GH):</label>\n            <input type="text" name="perUnit" id="power" class="form-control" value="" title="" required="required" >\n        </div>\n        <div class="form-group">\n           <label for="perUnit" class="col-sm-2">Per Unit:</label>\n           <input type="text" name="perUnit" id="perUnit" class="form-control" value="" title="" required="required" >           \n        </div>\n        <div class="form-group">\n           <label for="sellerFee" class="col-sm-2">Seller Fee:</label>\n           <input type="text" name="perUnit" id="sellerFee" class="form-control" value="" title="" disabled="disabled">           \n        </div>\n        <div class="form-group">\n           <label for="buyerFee" class="col-sm-2">Buyer Fee:</label>\n           <input type="text" name="perUnit" id="buyerFee" class="form-control" value="" title="" disabled="disabled">\n        </div>\n        <div class="form-group">\n           <label for="buyerPay" class="col-sm-2">Buyer Pays:</label>\n           <input type="text" name="perUnit" id="buyerPay" class="form-control" value="" title="" disabled="disabled">           \n        </div>\n        <div class="form-group">\n           <label for="sellerNet" class="col-sm-2">Seller Gets:</label>\n           <input type="text" name="perUnit" id="sellerNet" class="form-control" value="" title="" disabled="disabled">\n        </div>\n    </form>    \n</div>');
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
    }
};

hashmarketcalc.main();

$(document).ready(function(){
    var perUnit = $('#perUnit');
    var power = $('#power');
    var sellerFee = $('#sellerFee');
    var buyerFee= $('#buyerFee');
    var buyerPay = $('#buyerPay');
    var sellerNet = $('#sellerNet');

    perUnit.keyup(function() {
        var total = power * perUnit;
        var sellFee = total * .05;

        sellerFee.val(sellFee);

        var buySubTotal = total + sellFee;

        buyerFee.val(buySubTotal * .05);
        buyerPay.val(buySubTotal + buyFee);

        sellerNet.val(total - sellFee);
    });


});