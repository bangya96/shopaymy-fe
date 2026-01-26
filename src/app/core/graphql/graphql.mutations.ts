import { gql } from 'apollo-angular';

// ============================================
// AUTH MUTATIONS
// ============================================

/**
 * Register a new user
 */
export const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            token
            user {
                id
                name
                email
                createdAt
                updatedAt
            }
        }
    }
`;

/**
 * Login user
 */
export const LOGIN_MUTATION = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            token
            user {
                id
                name
                email
                createdAt
                updatedAt
            }
        }
    }
`;

/**
 * Logout user
 */
export const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout {
            message
        }
    }
`;

// ============================================
// SHOP MUTATIONS
// ============================================

/**
 * Create a new shop
 */
export const CREATE_SHOP_MUTATION = gql`
    mutation CreateShop($input: CreateShopInput!) {
        createShop(input: $input) {
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
 * Update an existing shop
 */
export const UPDATE_SHOP_MUTATION = gql`
    mutation UpdateShop($input: UpdateShopInput!) {
        updateShop(input: $input) {
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
 * Delete a shop
 */
export const DELETE_SHOP_MUTATION = gql`
    mutation DeleteShop($id: Int!) {
        deleteShop(id: $id)
    }
`;

// ============================================
// PAGE MUTATIONS
// ============================================

/**
 * Create a new page
 */
export const CREATE_PAGE_MUTATION = gql`
    mutation CreatePage($input: CreatePageInput!) {
        createPage(input: $input) {
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
            }
        }
    }
`;

/**
 * Update an existing page
 */
export const UPDATE_PAGE_MUTATION = gql`
    mutation UpdatePage($input: UpdatePageInput!) {
        updatePage(input: $input) {
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
 * Delete a page
 */
export const DELETE_PAGE_MUTATION = gql`
    mutation DeletePage($id: Int!) {
        deletePage(id: $id)
    }
`;

// ============================================
// PRODUCT MUTATIONS
// ============================================

/**
 * Create a new product
 */
export const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
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
 * Update an existing product
 */
export const UPDATE_PRODUCT_MUTATION = gql`
    mutation UpdateProduct($input: UpdateProductInput!) {
        updateProduct(input: $input) {
            id
            name
            slug
            description
            price
            currency
            sku
            images
            isActive
            updatedAt
        }
    }
`;

/**
 * Delete a product
 */
export const DELETE_PRODUCT_MUTATION = gql`
    mutation DeleteProduct($id: Int!) {
        deleteProduct(id: $id)
    }
`;

// ============================================
// ORDER FORM MUTATIONS
// ============================================

/**
 * Create a new order form
 */
export const CREATE_ORDER_FORM_MUTATION = gql`
    mutation CreateOrderForm($input: CreateOrderFormInput!) {
        createOrderForm(input: $input) {
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
 * Update an existing order form
 */
export const UPDATE_ORDER_FORM_MUTATION = gql`
    mutation UpdateOrderForm($input: UpdateOrderFormInput!) {
        updateOrderForm(input: $input) {
            id
            name
            fields
            successMessage
            redirectUrl
            isActive
            updatedAt
        }
    }
`;

/**
 * Delete an order form
 */
export const DELETE_ORDER_FORM_MUTATION = gql`
    mutation DeleteOrderForm($id: Int!) {
        deleteOrderForm(id: $id)
    }
`;

// ============================================
// PAYMENT GATEWAY SETTINGS MUTATIONS
// ============================================

/**
 * Save payment gateway settings
 */
export const SAVE_PAYMENT_GATEWAY_SETTINGS_MUTATION = gql`
    mutation SavePaymentGatewaySettings($input: SavePaymentGatewaySettingsInput!) {
        savePaymentGatewaySettings(input: $input) {
            id
            shopId
            gateway
            isActive
            isSandbox
            updatedAt
        }
    }
`;

// ============================================
// SHOP INVITATION MUTATIONS
// ============================================

/**
 * Invite a user to a shop
 */
export const INVITE_TO_SHOP_MUTATION = gql`
    mutation InviteToShop($input: InviteToShopInput!) {
        inviteToShop(input: $input) {
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

/**
 * Accept a shop invitation
 */
export const ACCEPT_INVITATION_MUTATION = gql`
    mutation AcceptInvitation($token: String!) {
        acceptInvitation(token: $token)
    }
`;

/**
 * Cancel a shop invitation
 */
export const CANCEL_INVITATION_MUTATION = gql`
    mutation CancelInvitation($id: Int!) {
        cancelInvitation(id: $id)
    }
`;

