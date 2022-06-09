import Client from "shopify-buy";

const client = Client.buildClient({
    domain: 'najib-nurdin-store.myshopify.com',
    storefrontAccessToken: '94f45866ca8a9e4587b6fd8eda9a8a75'
});

export { client }