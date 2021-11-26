// ==UserScript==
// @name         Gamersupps Inventory Display
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Shows how much of a product is left
// @author       You
// @include      *//gamersupps.gg/products/*
// @grant        none
// ==/UserScript==

(function() {
    fetch(window.location.origin+"/products/"+window.location.pathname.split('/products/')[1]+"/product.json")
	.then(res => res.json())
	.catch(e => {})
	.then(res => {
		if (res && res.product) {
            var elm = document.querySelector('form[action="/cart/add"]>div>label')||document.querySelector('div>div>label');
			if (elm) {
                var quantitys = [+Math.max(0, res.product.variants[0].inventory_quantity||0)];
                if (res.product.variants.length > 1) {
                    quantitys.length = 0;
                    res.product.variants.forEach(e => {
                        quantitys.push(e.title + " - " +Math.max(0, e.inventory_quantity||0))
                    });
                }
				var span = document.createElement('span');
				span.style.color = "red";
				span.innerText = " "+quantitys.join(' | ');
				elm.insertAdjacentElement('beforeend', span);
			}
		}
	})
})();