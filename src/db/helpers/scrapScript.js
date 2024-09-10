const products = [];

const productElements = document.querySelectorAll(
    '[data-testid="master-product-card"]'
);

productElements.forEach((productElement, i) => {
    if (productElement) {
        const productName = productElement
            .querySelector('[data-testid="lblHomeProductNameRecom"]')
            ?.textContent.trim();

        const productPrice = productElement
            .querySelector('[data-testid="lblHomeProductPriceRecom"]')
            ?.textContent.trim();

        const originalPrice = productElement
            .querySelector('[data-testid="lblProductSlashPrice"]')
            ?.textContent.trim();

        const discount = productElement
            .querySelector('[data-testid="lblProductDiscount"]')
            ?.textContent.trim();

        const imageUrl = productElement.querySelector(
            '[data-testid="imgHomeProductRecom"]'
        )?.src;

        const shopInfo = productElement.querySelector(
            '[data-testid="shopWrapper"]'
        );
        const shopLocation = shopInfo
            ?.querySelector('[data-testid="lblHomeProductLocRecom"]')
            ?.textContent.trim();
        const shopName = shopInfo
            ?.querySelector('[data-testid="linkShopName"]')
            ?.textContent.trim();

        const rating = productElement
            .querySelector(".prd_rating-average-text")
            ?.textContent.trim();

        const soldItems = productElement
            .querySelector(".prd_label-integrity")
            ?.textContent.trim();
        products.push({
            name: productName,
            imgUrl: imageUrl,
            price: productPrice,
            Rating: rating,
        });

        console.log("Product Name:", productName);
        console.log("Price:", productPrice);
        console.log("Original Price:", originalPrice);
        console.log("Discount:", discount);
        console.log("Image URL:", imageUrl);
        console.log("Shop Location:", shopLocation);
        console.log("Shop Name:", shopName);
        console.log("Rating:", rating);
        console.log("Sold Items:", soldItems);
    } else {
        console.log("Product element not found.");
    }
});
console.log(products);
