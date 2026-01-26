import { gql } from 'apollo-angular';

// ============================================
// USER QUERIES
// ============================================

/**
 * Get current authenticated user
 */
export const ME_QUERY = gql`
    query Me {
        me {
            id
            name
            email
            emailVerifiedAt
            createdAt
            updatedAt
            shops {
                id
                name
                slug
                logo
            }
        }
    }
`;

// ============================================
// SHOP QUERIES
// ============================================

/**
 * Get all shops for the current user
 */
export const SHOPS_QUERY = gql`
    query Shops {
        shops {
            id
            name
            slug
            description
            logo
            banner
            isActive
            createdAt
            updatedAt
        }
    }
`;

/**
 * Get a single shop by ID
 */
export const SHOP_QUERY = gql`
    query Shop($id: Int!) {
        shop(id: $id) {
            id
            name
            slug
            description
            logo
            banner
            isActive
            createdAt
            updatedAt
            pages {
                id
                title
                slug
                isActive
            }
        }
    }
`;

// ============================================
// PAGE QUERIES
// ============================================

/**
 * Get all pages for a specific shop
 */
export const PAGES_QUERY = gql`
    query Pages($shopId: Int!) {
        pages(shopId: $shopId) {
            id
            title
            slug
            content
            metaTitle
            metaDescription
            isActive
            createdAt
            updatedAt
        }
    }
`;

/**
 * Get a single page by ID
 */
export const PAGE_QUERY = gql`
    query Page($id: Int!) {
        page(id: $id) {
            id
            title
            slug
            content
            metaTitle
            metaDescription
            isActive
            createdAt
            updatedAt
            shop {
                id
                name
                slug
            }
        }
    }
`;

// ============================================
// PRODUCT QUERIES
// ============================================

/**
 * Get all products for a specific shop
 */
export const PRODUCTS_QUERY = gql`
    query Products($shopId: Int!) {
        products(shopId: $shopId) {
            id
            shopId
            name
            slug
            description
            price
            currency
            sku
            images
            isActive
            createdAt
            updatedAt
        }
    }
`;

/**
 * Get a single product by ID
 */
export const PRODUCT_QUERY = gql`
    query Product($id: Int!) {
        product(id: $id) {
            id
            shopId
            name
            slug
            description
            price
            currency
            sku
            images
            isActive
            createdAt
            updatedAt
        }
    }
`;

// ============================================
// ORDER FORM QUERIES
// ============================================

/**
 * Get all order forms for a specific shop
 */
export const ORDER_FORMS_QUERY = gql`
    query OrderForms($shopId: Int!) {
        orderForms(shopId: $shopId) {
            id
            shopId
            pageId
            productId
            name
            fields
            successMessage
            redirectUrl
            isActive
            createdAt
            updatedAt
        }
    }
`;

/**
 * Get a single order form by ID
 */
export const ORDER_FORM_QUERY = gql`
    query OrderForm($id: Int!) {
        orderForm(id: $id) {
            id
            shopId
            pageId
            productId
            name
            fields
            successMessage
            redirectUrl
            isActive
            createdAt
            updatedAt
        }
    }
`;

// ============================================
// ORDER QUERIES
// ============================================

/**
 * Get all orders for a specific shop
 */
export const ORDERS_QUERY = gql`
    query Orders($shopId: Int!) {
        orders(shopId: $shopId) {
            id
            shopId
            orderFormId
            productId
            orderNumber
            customerName
            customerEmail
            customerPhone
            amount
            currency
            status
            paymentGateway
            paymentReference
            paidAt
            createdAt
            updatedAt
        }
    }
`;

/**
 * Get shop order statistics
 */
export const SHOP_ORDER_STATS_QUERY = gql`
    query ShopOrderStats($shopId: Int!) {
        shopOrderStats(shopId: $shopId) {
            totalOrders
            pendingOrders
            paidOrders
            totalRevenue
        }
    }
`;

// ============================================
// PAYMENT GATEWAY SETTINGS QUERIES
// ============================================

/**
 * Get payment gateway settings for a specific shop
 */
export const PAYMENT_GATEWAY_SETTINGS_QUERY = gql`
    query PaymentGatewaySettings($shopId: Int!) {
        paymentGatewaySettings(shopId: $shopId) {
            id
            shopId
            gateway
            isActive
            isSandbox
            createdAt
            updatedAt
        }
    }
`;

// ============================================
// SHOP MEMBER QUERIES
// ============================================

/**
 * Get all members for a specific shop
 */
export const SHOP_MEMBERS_QUERY = gql`
    query ShopMembers($shopId: Int!) {
        shopMembers(shopId: $shopId) {
            userId
            shopId
            role
            createdAt
            user {
                id
                name
                email
            }
        }
    }
`;

/**
 * Get all pending invitations for a specific shop
 */
export const SHOP_INVITATIONS_QUERY = gql`
    query ShopInvitations($shopId: Int!) {
        shopInvitations(shopId: $shopId) {
            id
            shopId
            email
            role
            status
            expiresAt
            createdAt
        }
    }
`;

